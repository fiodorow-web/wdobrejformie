import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { Accordion, Button, Card, ImageSlot, Reveal, Section } from '@/components/ds';
import { Body, CheckList, PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { biaParameters } from '@/content/services';
import { biaContraindications } from '@/content/treatments';
import { visitFaq } from '@/content/faq';
import { SIZE_HALF } from '@/lib/image-sizes';
import styles from './Analysis.module.css';
import homeStyles from '@/components/sections/Home.module.css';

import analizator from '@/assets/photos/analizator-skladu-ciala-jawon-ioi.webp';

export const metadata: Metadata = {
  title: 'Analiza składu ciała (BIA) — Węgrów, 50 zł',
  description:
    'Badanie składu ciała metodą bioimpedancji elektrycznej na analizatorze Jawon Medical. Ponad 30 parametrów: tkanka tłuszczowa, mięśnie, woda, BMR, tłuszcz trzewny, wiek metaboliczny.',
  alternates: { canonical: '/analiza-skladu-ciala' },
};

export default function BodyAnalysisPage() {
  return (
    <>
      <PageHeader
        eyebrow="Analiza składu ciała"
        title="Ponad 30 parametrów Twojego organizmu"
        lead="Waga łazienkowa pokazuje jedną liczbę. Analizator pokazuje, z czego ta liczba się składa — ile w niej tłuszczu, mięśni i wody."
      >
        <div className={prose.actions}>
          <Button href="/kontakt" size="lg">
            Umów badanie — 50 zł
          </Button>
          <Button href="/przygotowanie-do-wizyty" variant="secondary">
            Jak się przygotować
          </Button>
        </div>
      </PageHeader>

      <Section tone="surface" tight>
        <div className={prose.split}>
          <Reveal variant="left">
            <SectionHead eyebrow="Metoda" title="Bioimpedancja elektryczna (BIA)" />
            <Body
              paragraphs={[
                'Badanie składu ciała to bardzo pomocny element w ocenie przebiegu odchudzania, stanu odżywienia i zdrowia, a także budowy tkanki mięśniowej.',
                'Wykonujemy je metodą pomiaru i analizy impedancji bioelektrycznej poszczególnych tkanek organizmu (BIA — Body Impedance Analysis) na analizatorze firmy Jawon Medical. Badanie jest nieinwazyjne i bezpieczne, a wyniki wiarygodne i precyzyjne.',
                'Pomiar jest bezbolesny i trwa kilkanaście minut. Ze względu na specyfikę aparatury wykonujemy go na gołe stopy — zapytamy Cię też o wzrost i wiek.',
              ]}
            />
          </Reveal>
          <Reveal variant="right" delay={80}>
            <ImageSlot
              label="Analizator składu ciała Jawon Medical ioi, na którym wykonujemy badanie BIA w poradni w Węgrowie"
              src={analizator}
              ratio="4/3"
              sizes={SIZE_HALF}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="parametry">
        <SectionHead
          eyebrow="Wyniki"
          title="Co dokładnie mierzymy"
          lead="Pełny raport omawiamy razem podczas konsultacji — tłumaczymy, co która liczba oznacza w Twoim przypadku."
          headingId="parametry"
        />
        <ul className={styles.parameters}>
          {biaParameters.map((parameter, index) => (
            <li key={parameter}>
              {/* Capped stagger — 30+ parameters at 40ms each would run for over a second. */}
              <Reveal delay={Math.min(index, 8) * 40}>{parameter}</Reveal>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" aria-labelledby="przeciwwskazania">
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <Reveal variant="left">
            <SectionHead
              eyebrow="Bezpieczeństwo"
              title="Przeciwwskazania"
              lead="Badania BIA nie wykonujemy u osób z poniższych grup."
              headingId="przeciwwskazania"
            />
            <Card variant="default" className={styles.warning}>
              <AlertTriangle
                size={22}
                strokeWidth={1.5}
                aria-hidden="true"
                className={styles.warningIcon}
              />
              <ul className={styles.warningList}>
                {biaContraindications.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </Card>
          </Reveal>

          <Reveal variant="right" delay={80}>
            <SectionHead
              eyebrow="Przed wizytą"
              title="Co zabrać ze sobą"
              lead="Kilka rzeczy, które sprawią, że pierwsza wizyta będzie konkretniejsza."
            />
            <CheckList
              items={[
                'Wyniki ostatnich badań, jeśli chorujesz przewlekle na schorzenie zależne od diety.',
                'Zapisane nazwy przyjmowanych leków.',
                'Lekki ubiór — pomiar wykonujemy na dłoniach i stopach.',
                'Chwilę zastanowienia nad tym, jak wygląda Twój obecny sposób odżywiania.',
              ]}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="faq-badanie">
        <SectionHead eyebrow="Pytania" title="O badaniu" headingId="faq-badanie" />
        <Accordion items={visitFaq} />
      </Section>

      <Section tone="surface">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Pierwszy krok to jeden pomiar</h2>
          <p className={homeStyles.ctaText}>
            Badanie kosztuje 50 zł. W pakiecie z konsultacją wstępną (180 zł) omawiamy wyniki od
            razu i wychodzisz z planem na najbliższe tygodnie.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" size="lg">
              Umów badanie
            </Button>
          </div>
        </Card>
      </Section>

    </>
  );
}
