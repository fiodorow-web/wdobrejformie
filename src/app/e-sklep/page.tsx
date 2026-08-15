import type { Metadata } from 'next';
import { Gift } from 'lucide-react';
import { Button, Card, ImageSlot, Reveal, Section } from '@/components/ds';
import { CheckList, PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { vouchers, voucherTerms } from '@/content/vouchers';
import { site } from '@/content/site';
import { SIZE_HALF } from '@/lib/image-sizes';
import styles from './Shop.module.css';
import homeStyles from '@/components/sections/Home.module.css';

import planer from '@/assets/photos/planer-i-centymetr-plan-odchudzania.webp';

export const metadata: Metadata = {
  title: 'Kupony podarunkowe — 270 zł',
  description:
    'Kupon podarunkowy dietetyczny i kupon na zabiegi modelowania sylwetki, po 270 zł. Konsultacja z badaniem składu ciała oraz indywidualny 7-dniowy jadłospis.',
  alternates: { canonical: '/e-sklep' },
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kupony podarunkowe"
        title="Podaruj bliskim zdrowie"
        lead="Szukasz wyjątkowego prezentu? Najtrudniej zrobić pierwszy krok — a Ty możesz komuś w tym pomóc."
      />

      <Section tone="surface" tight>
        <div className={prose.grid2}>
          {vouchers.map((voucher, index) => (
            <Reveal key={voucher.slug} variant="zoom" delay={index * 90}>
              <Card
                id={voucher.slug}
                variant={voucher.line === 'zabiegi' ? 'plum-tint' : 'tint'}
                className={styles.card}
              >
                <Gift
                  size={28}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={voucher.line === 'zabiegi' ? styles.iconPlum : styles.icon}
                />
                <h2 className={styles.name}>{voucher.name}</h2>
                <p className={voucher.line === 'zabiegi' ? styles.pricePlum : styles.price}>
                  {voucher.price} zł
                </p>
                <p className={styles.summary}>{voucher.summary}</p>

                <dl className={styles.includes}>
                  {voucher.includes.map((item) => (
                    <div key={item.title}>
                      <dt>{item.title}</dt>
                      <dd>{item.description}</dd>
                    </div>
                  ))}
                </dl>

                <div className={prose.actions}>
                  <Button
                    href="/kontakt"
                    variant={voucher.line === 'zabiegi' ? 'plum' : 'primary'}
                  >
                    Zamów kupon
                  </Button>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="zasady">
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <Reveal variant="left">
            <SectionHead eyebrow="Zasady" title="Jak działa kupon" headingId="zasady" />
            <CheckList items={voucherTerms} />
            <ImageSlot
              label="Planer i centymetr krawiecki — kupon na współpracę z dietetykiem w poradni W Dobrej Formie"
              src={planer}
              ratio="4/3"
              sizes={SIZE_HALF}
              style={{ marginTop: 'var(--space-8)' }}
            />
          </Reveal>

          <Reveal variant="right" delay={80}>
            <SectionHead eyebrow="Zamówienie" title="Jak kupić" />
            <CheckList
              items={[
                'Napisz do nas przez formularz kontaktowy — podaj, który kupon Cię interesuje.',
                'Odeślemy numer zamówienia i dane do przelewu.',
                'Wpłatę wykonaj na konto podane niżej, wpisując numer zamówienia w tytule.',
                'Kupon wysyłamy po zaksięgowaniu wpłaty.',
              ]}
            />
            <Card variant="default" className={styles.account}>
              <span className={styles.accountLabel}>Numer konta</span>
              <span className={styles.accountNumber}>{site.bankAccount}</span>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Masz pytanie o kupon?</h2>
          <p className={homeStyles.ctaText}>
            Napisz albo zadzwoń — podpowiemy, który kupon lepiej pasuje do osoby, którą chcesz nim
            obdarować.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" size="lg">
              Napisz do nas
            </Button>
            <Button href={`tel:${site.phoneHref}`} variant="secondary" onDark>
              {site.phone}
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
