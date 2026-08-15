import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { NavBar, Footer } from '@/components/ds';
import { JsonLd } from '@/components/JsonLd';
import { organizationJsonLd } from '@/lib/jsonld';
import { site } from '@/content/site';
import { mainNav } from '@/content/navigation';
import '@/styles/tokens.css';
import '@/styles/base.css';

/**
 * The design system is single-family by design — Manrope does all the work
 * through weight (800 display, 700 headings/buttons, 600 labels, 400/500 body).
 * Self-hosted via next/font rather than the export's Google Fonts @import:
 * no third-party request, no layout shift, no RODO question.
 */
const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — poradnia dietetyczna w Węgrowie`,
    template: `%s — ${site.name}`,
  },
  description: site.shortDescription,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    url: site.url,
    title: `${site.name} — poradnia dietetyczna w Węgrowie`,
    description: site.shortDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // The browser chrome colour ships in a <meta> tag, which cannot read a CSS
  // custom property. Keep in sync with --color-cta / --green-700.
  // eslint-disable-next-line no-restricted-syntax -- meta theme-color cannot use var()
  themeColor: '#10730e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main">
          Przejdź do treści
        </a>
        <NavBar links={mainNav} ctaHref="/kontakt" patientZoneUrl={site.patientZoneUrl} />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
