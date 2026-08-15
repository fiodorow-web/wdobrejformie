/**
 * Checks that every URL the old WordPress site serves has a home on the new one.
 *
 * The old URL list is pulled live from its REST API rather than hand-maintained,
 * so nothing can quietly fall off the list. Each one must answer 200 or 301/308
 * to a destination that itself answers 200 — no 404s, no redirect chains.
 *
 * Run against a running server:
 *   npm run build && npm start
 *   npm run verify:redirects            # defaults to http://localhost:3000
 *   BASE=https://preview.vercel.app npm run verify:redirects
 */

const BASE = process.env.BASE ?? 'http://localhost:3000';
const WP = 'https://wdobrejformie.net/wp-json/wp/v2';

/** Old paths with no counterpart on the new site. Empty — everything is mapped. */
const KNOWN_GAPS = new Set<string>();

interface Row {
  path: string;
  source: string;
}

async function collectOldPaths(): Promise<Row[]> {
  const rows: Row[] = [];

  for (const [type, source] of [
    ['pages', 'page'],
    ['posts', 'post'],
  ] as const) {
    for (let page = 1; ; page += 1) {
      const response = await fetch(`${WP}/${type}?per_page=100&page=${page}&_fields=link`);
      if (!response.ok) break;
      const batch = (await response.json()) as Array<{ link: string }>;
      for (const { link } of batch) {
        rows.push({ path: new URL(link).pathname.replace(/\/$/, '') || '/', source });
      }
      if (page >= Number(response.headers.get('x-wp-totalpages') ?? '1')) break;
    }
  }

  // Taxonomy and WooCommerce paths that are not pages or posts.
  for (const path of [
    '/category/artykuly',
    '/koszyk',
    '/zamowienie',
    '/moje-konto',
    '/kategoria-produktu/kupon',
    '/produkt/kupon-podarunkowy-dietetyczny',
    '/produkt/kupon-podarunkowy-na-zabiegi',
  ]) {
    rows.push({ path, source: 'manual' });
  }

  return rows;
}

async function head(path: string): Promise<{ status: number; location: string | null }> {
  const response = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  return { status: response.status, location: response.headers.get('location') };
}

async function main() {
  const rows = await collectOldPaths();
  console.log(`checking ${rows.length} legacy URLs against ${BASE}\n`);

  const failures: string[] = [];
  const chains: string[] = [];

  for (const { path } of rows) {
    if ([...KNOWN_GAPS].some((gap) => path.startsWith(gap))) continue;

    const first = await head(path);

    if (first.status === 200) continue;

    if (first.status !== 301 && first.status !== 308) {
      failures.push(`${path} → ${first.status}`);
      continue;
    }

    const target = new URL(first.location ?? '', BASE);
    const second = await head(`${target.pathname}${target.hash}`);

    if (second.status === 200) continue;
    if (second.status === 301 || second.status === 308) {
      chains.push(`${path} → ${target.pathname} → ${second.location}`);
      continue;
    }
    failures.push(`${path} → ${target.pathname} → ${second.status}`);
  }

  if (failures.length) {
    console.error(`✗ ${failures.length} broken:\n${failures.map((f) => `  ${f}`).join('\n')}`);
  }
  if (chains.length) {
    console.error(`✗ ${chains.length} redirect chains:\n${chains.map((c) => `  ${c}`).join('\n')}`);
  }
  if (!failures.length && !chains.length) {
    console.log('✓ every legacy URL resolves in one hop');
    return;
  }

  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
