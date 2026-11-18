import type { Metadata } from 'next';
import { Button, Card, Reveal, Section } from '@/components/ds';
import { PageHeader, prose } from '@/components/sections/Prose';
import { massageGroups, massagesFrom } from '@/content/massages';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import styles from './Massages.module.css';
import homeStyles from '@/components/sections/Home.module.css';

/*
 * A static segment, so it wins over /modelowanie-sylwetki/[slug] — massages are
 * a list of six with their own prices, not one treatment with a series.
 */

export const metadata: Metadata = {
  title: `Masaże — wyszczuplające, klasyczne i relaksacyjne, Węgrów, od ${massagesFrom} zł`,
  description:
    'Masaż wyszczuplający, wyszczuplająco-ujędrniający, z boosterem ujędrniającym, klasyczny i relaksacyjny w strefie zabiegowej poradni W Dobrej Formie w Węgrowie.',
  alternates: { canonical: '/modelowanie-sylwetki/masaze' },
};

export default function MassagesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Strefa zabiegowa"
        eyebrowTone="plum"
        title="Masaże"
        lead="Masaże wyszczuplające, ujędrniające, klasyczne i relaksacyjne. Wykonuje je mgr Katarzyna Tyszko — magister fizjoterapii."
      >
        <div className={prose.actions}>
          <Button href="/kontakt" variant="plum" size="lg">
            Umów masaż
          </Button>
          <Button href="/modelowanie-sylwetki" variant="secondary">
            Wszystkie zabiegi
          </Button>
        </div>
      </PageHeader>

      <Section tone="surface" tight>
        <div className={styles.groups}>
          {massageGroups.map((group) => (
            <section key={group.title} className={styles.group} aria-label={group.title}>
              <h2 className={styles.groupTitle}>{group.title}</h2>
              {group.description && <p className={styles.groupText}>{group.description}</p>}
              <div className={styles.grid}>
                {group.items.map((massage, index) => (
                  <Reveal key={massage.name} delay={index * 60}>
                    <Card variant="default" className={styles.card}>
                      <h3 className={styles.name}>{massage.name}</h3>
                      <dl className={styles.meta}>
                        <div>
                          <dt>Czas</dt>
                          <dd>{massage.minutes} minut</dd>
                        </div>
                        <div>
                          <dt>Cena</dt>
                          <dd>{massage.price} zł</dd>
                        </div>
                      </dl>
                      {/* A group-wide description is printed once above, not on every card. */}
                      {!group.description && <p className={styles.text}>{massage.description}</p>}
                    </Card>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className={prose.actions} style={{ marginTop: 'var(--space-10)' }}>
          <Button href="/cennik#modelowanie-sylwetki" variant="secondary">
            Pełny cennik zabiegów
          </Button>
        </div>
      </Section>

      <Section tone="alt">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Umów masaż</h2>
          <p className={homeStyles.ctaText}>
            Napisz, który masaż Cię interesuje — zaproponujemy termin i podpowiemy, czy warto
            połączyć go z zabiegami modelującymi.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" variant="plum" size="lg">
              Zapytaj o termin
            </Button>
          </div>
        </Card>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Strona główna', path: '/' },
          { name: 'Modelowanie sylwetki', path: '/modelowanie-sylwetki' },
          { name: 'Masaże', path: '/modelowanie-sylwetki/masaze' },
        ])}
      />
    </>
  );
}
