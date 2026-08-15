import type { Metadata } from 'next';
import { Button, Card, Reveal, Section } from '@/components/ds';
import { PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { promotions } from '@/content/promotions';
import styles from './Promotions.module.css';
import homeStyles from '@/components/sections/Home.module.css';

export const metadata: Metadata = {
  title: 'Promocje — rabaty na pakiety i serie zabiegów',
  description:
    'Odchudzanie w parach, siódme badanie składu ciała gratis, stały rabat 10% na kolejny pakiet, 50% za polecenie oraz rabaty na serie zabiegów w strefie zabiegowej.',
  alternates: { canonical: '/promocje' },
};

export default function PromotionsPage() {
  const groups = [
    { line: 'dietetyka' as const, heading: 'Dietetyka', id: 'dietetyka' },
    { line: 'zabiegi' as const, heading: 'Strefa zabiegowa', id: 'zabiegi' },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Promocje"
        title="Aktualne promocje w gabinecie"
        lead="Rabaty naliczamy na miejscu — nie musisz o nich pamiętać ani podawać żadnego kodu. Wystarczy, że spełnisz warunek."
      />

      {groups.map((group, index) => {
        const items = promotions.filter((promo) => promo.line === group.line);
        const isPlum = group.line === 'zabiegi';

        return (
          <Section
            key={group.id}
            id={group.id}
            tone={index % 2 === 0 ? 'surface' : 'alt'}
            aria-labelledby={`${group.id}-heading`}
          >
            <SectionHead
              eyebrow={isPlum ? 'Zabiegi' : 'Konsultacje i jadłospisy'}
              eyebrowTone={isPlum ? 'plum' : 'dark'}
              title={group.heading}
              headingId={`${group.id}-heading`}
            />
            <div className={prose.grid2}>
              {items.map((promo, promoIndex) => (
                <Reveal key={promo.title} variant="zoom" delay={promoIndex * 90}>
                <Card variant={isPlum ? 'plum-tint' : 'tint'} className={styles.card}>
                  <h3 className={styles.title}>{promo.title}</h3>
                  <p className={isPlum ? styles.summaryPlum : styles.summary}>{promo.summary}</p>
                  <ul className={styles.list}>
                    {promo.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  {promo.footnote && <p className={styles.footnote}>{promo.footnote}</p>}
                </Card>
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}

      <Section tone="surface">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Nie wiesz, która promocja Cię obejmuje?</h2>
          <p className={homeStyles.ctaText}>
            Napisz albo zapytaj podczas wizyty — policzymy najkorzystniejszy wariant. Promocje nie
            łączą się ze sobą, więc zawsze wybieramy tę, która wychodzi taniej dla Ciebie.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" size="lg">
              Zapytaj o promocję
            </Button>
            <Button href="/cennik" variant="secondary" onDark>
              Zobacz cennik
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
