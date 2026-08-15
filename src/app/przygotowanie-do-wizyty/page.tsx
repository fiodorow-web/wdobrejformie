import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { Accordion, Button, Card, ImageSlot, Reveal, Section } from '@/components/ds';
import { Body, CheckList, PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { visitPreparation } from '@/content/services';
import { biaContraindications } from '@/content/treatments';
import { visitFaq } from '@/content/faq';
import { JsonLd } from '@/components/JsonLd';
import { faqJsonLd } from '@/lib/jsonld';
import { SIZE_HALF } from '@/lib/image-sizes';
import styles from '../analiza-skladu-ciala/Analysis.module.css';
import homeStyles from '@/components/sections/Home.module.css';

import pomiarBia from '@/assets/photos/analiza-skladu-ciala-pomiar-bia.webp';

export const metadata: Metadata = {
  title: 'Przygotowanie do wizyty i badania składu ciała',
  description:
    'Jak przygotować się do konsultacji i badania BIA: kiedy zjeść, ile wypić wody, czego unikać przed pomiarem. Przeciwwskazania i co zabrać na pierwszą wizytę.',
  alternates: { canonical: '/przygotowanie-do-wizyty' },
};

export default function VisitPreparationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Zanim się spotkamy"
        title="Przygotowanie do wizyty"
        lead="Kilka prostych warunków, dzięki którym pomiar składu ciała wyjdzie wiarygodnie. Nic skomplikowanego — wystarczy zaplanować wizytę z wyprzedzeniem."
      >
        <div className={prose.actions}>
          <Button href="/kontakt" size="lg">
            Umów wizytę
          </Button>
        </div>
      </PageHeader>

      <Section tone="surface" tight>
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <Reveal variant="left">
            <SectionHead
              eyebrow="Przed konsultacją"
              title="Zastanów się nad swoim jedzeniem"
            />
            <Body
              paragraphs={[
                'Przyjrzyj się temu, jak wygląda Twój sposób odżywiania: ilość, rodzaj i częstotliwość spożywanych posiłków oraz napojów w ciągu dnia.',
                'Szczegółowo przeanalizujemy to razem podczas konsultacji wstępnej. Ustalimy też cel, do którego będziemy wspólnie dążyć.',
              ]}
            />
          </Reveal>

          <Reveal variant="right" delay={80}>
            <SectionHead
              eyebrow="Przed badaniem"
              title="Warunki pomiaru"
              lead="Zastosowanie się do nich zapewni prawidłowy wynik analizy metodą bioimpedancji elektrycznej."
            />
            <CheckList items={visitPreparation} />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="analizator">
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <Reveal variant="left">
            <SectionHead
              eyebrow="Sprzęt"
              title="Analizator Jawon Medical"
              headingId="analizator"
            />
            <Body
              paragraphs={[
                'Pomiar składu ciała wykonujemy najwyższej klasy analizatorem firmy Jawon Medical, metodą bioimpedancji elektrycznej (BIA).',
                'Badanie jest bezbolesne. Ze względu na specyfikę aparatury pomiar musi być wykonywany na gołe stopy. Przed badaniem zapytamy Cię o wzrost i wiek.',
              ]}
            />
            <ImageSlot
              label="Pomiar składu ciała metodą bioimpedancji na analizatorze Jawon Medical — pacjentka trzyma uchwyty pomiarowe"
              src={pomiarBia}
              ratio="4/3"
              sizes={SIZE_HALF}
              style={{ marginTop: 'var(--space-8)' }}
            />
          </Reveal>

          <Reveal variant="right" delay={80}>
            <SectionHead eyebrow="Bezpieczeństwo" title="Przeciwwskazania" />
            <Card variant="default" className={styles.warning}>
              <AlertTriangle
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
                className={styles.warningIcon}
              />
              <div>
                <p style={{ marginBottom: 'var(--space-3)', fontWeight: 'var(--fw-semibold)' }}>
                  Badania BIA nie możemy przeprowadzić u:
                </p>
                <ul className={styles.warningList}>
                  {biaContraindications.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="dokumenty">
        <SectionHead
          eyebrow="Na wizytę"
          title="Co warto zabrać"
          lead="Jeśli cierpisz na schorzenia przewlekłe zależne od diety — na przykład cukrzycę, insulinooporność czy podwyższony poziom cholesterolu."
          headingId="dokumenty"
        />
        <CheckList
          items={[
            'Wyniki ostatnich badań.',
            'Zapisane nazwy przyjmowanych leków.',
            'Regulamin współpracy przeczytany przed wizytą — podczas pierwszego spotkania poprosimy o zaakceptowanie go czytelnym podpisem.',
          ]}
        />
        <div className={prose.actions}>
          <Button href="/regulamin" variant="secondary">
            Przeczytaj regulamin
          </Button>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="faq-wizyta">
        <SectionHead eyebrow="Pytania" title="Najczęstsze wątpliwości" headingId="faq-wizyta" />
        <Accordion items={visitFaq} />
      </Section>

      <Section tone="surface">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Wszystko jasne? Umówmy termin</h2>
          <p className={homeStyles.ctaText}>
            Przyjmujemy wyłącznie po wcześniejszym umówieniu — dzięki temu nikt nie czeka w kolejce.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" size="lg">
              Zapisz się na konsultację
            </Button>
          </div>
        </Card>
      </Section>

      <JsonLd data={faqJsonLd(visitFaq)} />
    </>
  );
}
