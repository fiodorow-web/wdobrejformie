import type { Metadata } from 'next';
import { Button, Card, ImageSlot, Reveal, Section } from '@/components/ds';
import { Body, CheckList, PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { mealPlanAdvantages, mealPlanChoices } from '@/content/services';
import { site } from '@/content/site';
import { SIZE_HALF } from '@/lib/image-sizes';
import homeStyles from '@/components/sections/Home.module.css';

import planZywieniowy from '@/assets/photos/indywidualny-plan-zywieniowy.webp';
import jadlospis from '@/assets/photos/ukladanie-jadlospisu-w-poradni.webp';

export const metadata: Metadata = {
  title: 'Plany żywieniowe — indywidualne jadłospisy od 160 zł',
  description:
    '7-dniowy jadłospis z gramaturą, przepisami i listą zakupów na cały tydzień. Bez suplementów, wyłącznie z produktów dostępnych w każdym sklepie. Poradnia W Dobrej Formie, Węgrów.',
  alternates: { canonical: '/plany-zywieniowe' },
};

export default function MealPlansPage() {
  return (
    <>
      <PageHeader
        eyebrow="Plany żywieniowe"
        title="Jadłospis, który da się utrzymać"
        lead="Układamy go z produktów, które już jesz i które kupisz w każdym sklepie. Bez suplementów, bez ważenia wszystkiego na wadze i bez potraw, na które nie masz czasu."
      >
        <div className={prose.actions}>
          <Button href="/kontakt" size="lg">
            Zamów jadłospis
          </Button>
          <Button href="/cennik#osoby-zdrowe" variant="secondary">
            Zobacz ceny
          </Button>
        </div>
      </PageHeader>

      <Section tone="surface" tight>
        <div className={prose.split}>
          <Reveal variant="left">
            <SectionHead
              eyebrow="Jak pracujemy"
              title="Plan powstaje z wywiadu, nie z szablonu"
            />
            <Body
              paragraphs={[
                'Plany żywieniowe opracowujemy w oparciu o wywiad żywieniowo-zdrowotny przeprowadzany podczas pierwszej konsultacji. Uwzględniamy dotychczasowe nawyki i preferencje smakowe.',
                'Na spotkaniu mówisz nam o trybie pracy, miejscu spożywania posiłków, możliwościach czasowych i umiejętnościach kulinarnych. Dążymy do tego, żeby stopniowo wdrażać zasady zdrowego żywienia przy jednoczesnym zachowaniu Twoich dotychczasowych przyzwyczajeń.',
              ]}
            />
          </Reveal>
          <Reveal variant="right" delay={80}>
            <ImageSlot
              label="Indywidualny plan żywieniowy przygotowywany przez dietetyka w poradni W Dobrej Formie"
              src={planZywieniowy}
              ratio="4/3"
              sizes={SIZE_HALF}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="decyzje">
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <Reveal variant="left">
            <SectionHead
              eyebrow="Twoje decyzje"
              title="O czym decydujesz razem z dietetykiem"
              headingId="decyzje"
            />
            <CheckList items={mealPlanChoices} />
          </Reveal>
          <Reveal variant="right" delay={80}>
            <SectionHead eyebrow="Zalety" title="Co wyróżnia nasze jadłospisy" />
            <CheckList items={mealPlanAdvantages} />
            <ImageSlot
              label="Dietetyk układa 7-dniowy jadłospis w programie żywieniowym w poradni w Węgrowie"
              src={jadlospis}
              ratio="3/2"
              sizes={SIZE_HALF}
              style={{ marginTop: 'var(--space-8)' }}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="zawartosc">
        <SectionHead
          eyebrow="Co dostajesz"
          title="Zawartość planu"
          headingId="zawartosc"
        />
        <div className={prose.grid2}>
          <Reveal variant="zoom">
            <Card variant="tint">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>
              Plan żywieniowy
            </h3>
            <CheckList
              items={[
                'Opracowany na 7 dni, z możliwością powtarzania.',
                'Uwzględnia dania i produkty, które lubisz i chętnie jesz.',
                'Nie zawiera produktów, których nie lubisz ani tych, których nie powinieneś jeść przy zgłoszonym schorzeniu.',
                'Modyfikowany po każdej konsultacji kontrolnej, wraz ze zmieniającymi się potrzebami.',
              ]}
            />
            </Card>
          </Reveal>
          <Reveal variant="zoom" delay={90}>
            <Card variant="tint">
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>
              Lista zakupów
            </h3>
            <CheckList
              items={[
                'Podana na cały tydzień.',
                'Wyszczególnia produkty w gramach.',
                'Pozwala kupić większość produktów jednorazowo.',
                'Nie musisz tracić czasu na codzienne zakupy.',
              ]}
            />
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="dostep">
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <div>
            <SectionHead
              eyebrow="Dostęp"
              title="Wszystko w panelu pacjenta"
              lead="Plany żywieniowe i materiały dodatkowe udostępniamy drogą internetową. Masz do nich dostęp przez cały okres współpracy — i również po jej zakończeniu."
              headingId="dostep"
            />
            <div className={prose.actions}>
              <Button href={site.patientZoneUrl}>Przejdź do Strefy Pacjenta</Button>
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow="Wsparcie"
              title="Nie zostajesz sam z planem"
              lead="Wszelkie wątpliwości i pytania dotyczące diety możesz zgłaszać mailowo lub SMS-owo przez cały okres współpracy. Dla Pacjentów prowadzimy też zamkniętą grupę na Facebooku — do wymiany opinii i wzajemnego motywowania się."
            />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Zacznij od konsultacji wstępnej</h2>
          <p className={homeStyles.ctaText}>
            Jadłospis powstaje na podstawie wywiadu i badania składu ciała — dlatego zawsze
            zaczynamy od spotkania. Trwa 45–60 minut i kosztuje 180 zł.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" size="lg">
              Zapisz się na konsultację
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
