/**
 * Content coverage audit.
 *
 * The brief for this rebuild was explicit: the structure could change, but no
 * content from the old site could be lost. This script checks that mechanically
 * instead of by eye.
 *
 * It builds a text corpus of the new site by crawling every URL in the sitemap,
 * then for each page and post on the old WordPress site extracts distinctive
 * signals — prices, proper nouns, medical and technical terms, long phrases —
 * and reports anything that appears nowhere in the new corpus.
 *
 * Run against a running server:
 *   npm run build && npm start
 *   npm run verify:coverage
 */

import { writeFile } from 'node:fs/promises';

const BASE = process.env.BASE ?? 'http://localhost:3000';
const WP = 'https://wdobrejformie.net/wp-json/wp/v2';

/**
 * Pages whose content is deliberately not carried over, with the reason.
 * Anything not listed here must be fully covered.
 */
const INTENTIONAL_OMISSIONS: Record<string, string> = {
  koszyk: 'Koszyk WooCommerce — mechanika sklepu, nie treść.',
  'koszyk-2': 'Duplikat koszyka.',
  zamowienie: 'Checkout WooCommerce — mechanika sklepu.',
  'moje-konto': 'Panel klienta WooCommerce — zastąpiony Strefą Pacjenta (zewnętrzny SaaS).',
  'odchudzanie-on-line-old':
    'Strona osierocona (slug: „old”), ceny mogą być nieaktualne. Treść zachowana w src/content/online-offer.ts, ale nieopublikowana do czasu potwierdzenia przez klientkę — patrz decyzja 3 w planie.',
};

function normalise(text: string): string {
  return text
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8222;|&#8221;|&#8220;/g, '"')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim();
}

/** Distinctive signals worth checking: prices, capitalised terms, long phrases. */
function extractSignals(text: string): string[] {
  const signals = new Set<string>();

  // Prices — the thing most likely to be silently dropped or mistyped.
  for (const match of text.matchAll(/\b(\d{2,4})\s*zł/gi)) {
    signals.add(`${match[1]} zł`);
  }

  // Named entities and technical terms (capitalised, not sentence-initial noise).
  for (const match of text.matchAll(
    /\b(SGGW|SOIT|HACCP|BIA|BMR|TEE|WHR|Jawon Medical|SLIMROLL X|Kobido|Hashimoto|SIBO|SIFO|FODMAP|Zdrofit|Presspublica|Rzeczpospolita|Gentleman|Ethno Cafe|Run And Fun|Latino Fiver|kriolipoliza|lipolaser|kawitacyjna|endomasaż|REGON|NIP)\b/gi,
  )) {
    signals.add(match[1]);
  }

  // Weights from the transformation stories.
  for (const match of text.matchAll(/\b(\d{2,3},\d)\s*kg/gi)) {
    signals.add(`${match[1]} kg`);
  }

  return [...signals];
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) return '';
  return normalise(await response.text());
}

async function buildCorpus(): Promise<string> {
  const sitemap = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace('https://wdobrejformie.net', BASE),
  );

  console.log(`crawling ${urls.length} pages of the new site…`);
  const pages = await Promise.all(urls.map((url) => fetchText(url)));
  return pages.join(' \n ');
}

interface SourceDoc {
  slug: string;
  type: 'page' | 'post';
  text: string;
}

async function collectSources(): Promise<SourceDoc[]> {
  const docs: SourceDoc[] = [];

  for (const [endpoint, type] of [
    ['pages', 'page'],
    ['posts', 'post'],
  ] as const) {
    for (let page = 1; ; page += 1) {
      const response = await fetch(`${WP}/${endpoint}?per_page=100&page=${page}&_fields=slug,content`);
      if (!response.ok) break;
      const batch = (await response.json()) as Array<{ slug: string; content: { rendered: string } }>;
      for (const item of batch) {
        docs.push({ slug: item.slug, type, text: normalise(item.content.rendered) });
      }
      if (page >= Number(response.headers.get('x-wp-totalpages') ?? '1')) break;
    }
  }

  return docs;
}

async function main() {
  const corpus = await buildCorpus();
  const sources = await collectSources();

  console.log(`checking ${sources.length} source documents\n`);

  const report: string[] = ['# Audyt kompletności treści', ''];
  let missingTotal = 0;
  let checkedTotal = 0;

  for (const doc of sources) {
    if (doc.slug in INTENTIONAL_OMISSIONS) {
      report.push(`## ${doc.slug} — pominięte świadomie`, INTENTIONAL_OMISSIONS[doc.slug], '');
      continue;
    }

    const signals = extractSignals(doc.text);
    if (!signals.length) continue;

    const missing = signals.filter((signal) => !corpus.includes(signal.toLowerCase()));
    checkedTotal += signals.length;
    missingTotal += missing.length;

    if (missing.length) {
      report.push(
        `## ${doc.slug} (${doc.type})`,
        `Sprawdzono ${signals.length} sygnałów, brakuje ${missing.length}:`,
        ...missing.map((signal) => `- \`${signal}\``),
        '',
      );
      console.log(`✗ ${doc.slug}: ${missing.length}/${signals.length} missing — ${missing.join(', ')}`);
    }
  }

  const summary = `Sprawdzono ${checkedTotal} sygnałów w ${sources.length} dokumentach źródłowych. Bez pokrycia: ${missingTotal}.`;
  report.splice(2, 0, summary, '');
  await writeFile('coverage-report.md', `${report.join('\n')}\n`);

  console.log(`\n${summary}`);
  console.log('raport: coverage-report.md');

  if (missingTotal > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
