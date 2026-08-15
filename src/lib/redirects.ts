import type { Redirect } from 'next/dist/lib/load-custom-routes';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 301 map from the old WordPress site.
 *
 * Every source path below was confirmed against the live site's REST API
 * (/wp-json/wp/v2/pages and /posts) on 2026-08-13 — this is not a guess list.
 * WordPress served every URL with a trailing slash; Next is configured with
 * `trailingSlash: false` and normalises the slash away before matching, so the
 * sources here are written without it.
 */
const pageRedirects: Array<{ from: string; to: string }> = [
  // --- Pricing: four old pages collapse into one indexable page with anchors ---
  { from: '/cennik-osoby-zdrowe', to: '/cennik#osoby-zdrowe' },
  { from: '/cennik-osoby-ze-schorzeniami', to: '/cennik#osoby-ze-schorzeniami' },

  // --- Offer ---
  { from: '/oferta-stacjonarna', to: '/oferta' },

  // --- Orphaned pages, never linked from the current nav but still indexed ---
  { from: '/poradnia-dietetyczna', to: '/poznajmy-sie' },
  { from: '/metamorfozy-cd', to: '/metamorfozy' },
  { from: '/odchudzanie-on-line-old', to: '/konsultacje' },

  // --- Blog taxonomy ---
  { from: '/category/artykuly', to: '/blog' },

  // --- Legal ---
  { from: '/cookies', to: '/polityka-prywatnosci' },

  // --- WooCommerce ---
  // The shop sold exactly two gift vouchers. Until the client decides how to
  // handle payments (Stripe vs keeping WordPress on a subdomain), /e-sklep
  // presents both products and routes ordering through the contact form —
  // the same bank-transfer flow the old shop used. Cart and account pages have
  // nothing to carry over, so they land on the shop page itself.
  { from: '/koszyk', to: '/e-sklep' },
  { from: '/koszyk-2', to: '/e-sklep' },
  { from: '/zamowienie', to: '/e-sklep' },
  { from: '/moje-konto', to: '/e-sklep' },
  { from: '/kategoria-produktu/kupon', to: '/e-sklep' },
  { from: '/produkt/kupon-podarunkowy-dietetyczny', to: '/e-sklep#kupon-podarunkowy-dietetyczny' },
  { from: '/produkt/kupon-podarunkowy-na-zabiegi', to: '/e-sklep#kupon-podarunkowy-na-zabiegi' },
];

type BlogManifestEntry = { slug: string; legacyUrl: string };

/**
 * The 28 posts live at the WordPress root (`/{slug}/`), not under `/blog/`.
 * Rather than hand-maintaining 28 lines, the blog migration script writes a
 * manifest and the redirects are derived from it — one source of truth.
 */
function blogRedirects(): Array<{ from: string; to: string }> {
  const manifestPath = join(process.cwd(), 'content', 'blog', '_manifest.json');
  if (!existsSync(manifestPath)) return [];

  const entries = JSON.parse(readFileSync(manifestPath, 'utf8')) as BlogManifestEntry[];
  return entries.map(({ slug }) => ({ from: `/${slug}`, to: `/blog/${slug}` }));
}

export function legacyRedirects(): Redirect[] {
  return [...pageRedirects, ...blogRedirects()].map(({ from, to }) => ({
    source: from,
    destination: to,
    permanent: true,
  }));
}
