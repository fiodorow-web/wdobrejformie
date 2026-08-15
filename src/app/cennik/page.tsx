import type { Metadata } from 'next';
import { Button, Card, Reveal, Section } from '@/components/ds';
import { PageHeader, prose } from '@/components/sections/Prose';
import { PricingTabs } from '@/components/sections/PricingTabs';
import { priceGroups } from '@/content/pricing';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, priceListJsonLd } from '@/lib/jsonld';
import styles from '@/components/sections/Home.module.css';

export const metadata: Metadata = {
  title: 'Cennik — konsultacje, jadłospisy i zabiegi',
  description:
    'Pełny cennik poradni W Dobrej Formie w Węgrowie: badanie składu ciała 50 zł, konsultacja wstępna 180 zł, jadłospisy od 160 zł oraz zabiegi modelowania sylwetki od 140 zł.',
  alternates: { canonical: '/cennik' },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Cennik"
        title="Przejrzyste ceny, bez zaskoczeń"
        lead="Wszystkie usługi w jednym miejscu — dietetyka i strefa zabiegowa. Pakiety i serie zawsze wychodzą taniej niż pojedyncze wizyty."
      />

      <Section tone="surface" tight>
        <Reveal>
          <PricingTabs groups={priceGroups} />
        </Reveal>
      </Section>

      <Section tone="alt">
        <Reveal variant="zoom">
          <Card variant="dark" className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Nie wiesz, co wybrać?</h2>
          <p className={styles.ctaText}>
            Napisz, jaki masz cel — podpowiemy, od której usługi zacząć i ile realnie potrwa
            współpraca. Decyzję o pakiecie podejmujesz dopiero na pierwszej wizycie kontrolnej.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" size="lg">
              Zapytaj o plan
            </Button>
            </div>
          </Card>
        </Reveal>
      </Section>

      <JsonLd data={priceListJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Strona główna', path: '/' },
          { name: 'Cennik', path: '/cennik' },
        ])}
      />
    </>
  );
}
