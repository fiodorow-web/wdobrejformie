import type { Metadata } from 'next';
import { Badge, Button, Card, ImageSlot, Reveal, Section } from '@/components/ds';
import { Body, CheckList, PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { SIZE_HALF } from '@/lib/image-sizes';
import { processSteps } from '@/content/services';
import { dietyEliminacyjne, schorzenia } from '@/content/pricing';
import { site } from '@/content/site';
import homeStyles from '@/components/sections/Home.module.css';

import konsultacja from '@/assets/photos/konsultacja-dietetyczna-wegrow.webp';
import centymetr from '@/assets/photos/centymetr-krawiecki-w-dloniach.webp';

export const metadata: Metadata = {
  title: 'Konsultacje dietetyczne — Węgrów i on-line',
  description:
    'Jak wygląda współpraca z dietetykiem: konsultacja wstępna z badaniem składu ciała, jadłospis, wizyty kontrolne i plan stabilizacji. Także przy insulinooporności, Hashimoto i SIBO.',
  alternates: { canonical: '/konsultacje' },
};

export default function ConsultationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Konsultacje"
        title="Współpraca, która dopasowuje się do Twojego dnia"
        lead="Nie dostaniesz listy zakazów ani diety, której nie da się utrzymać. Zaczynamy od rozmowy o tym, jak realnie wygląda Twoje jedzenie — i budujemy plan wokół tego."
      >
        <div className={prose.actions}>
          <Button href="/kontakt" size="lg">
            Zapisz się na konsultację
          </Button>
          <Button href="/cennik#osoby-zdrowe" variant="secondary">
            Zobacz cennik
          </Button>
        </div>
      </PageHeader>

      <Section tone="surface" tight>
        <div className={prose.split}>
          <Reveal variant="left">
            <SectionHead
              eyebrow="Pierwsza wizyta"
              title="Konsultacja wstępna z badaniem składu ciała"
              lead="45–60 minut. Kosztuje 180 zł i obejmuje badanie na analizatorze."
            />
            <Body
              paragraphs={[
                'Podczas pierwszego spotkania wykonujemy badanie składu ciała i przeprowadzamy wywiad żywieniowo-zdrowotny. Rozmawiamy o Twoim stanie zdrowia, nawykach i preferencjach żywieniowych, aktywności fizycznej i trybie życia.',
                'Na tej podstawie oceniamy dotychczasowy sposób odżywiania oraz ustalamy cel i metody dalszej współpracy. Wychodzisz z konkretnym planem na najbliższe tygodnie, a nie z ogólnymi zaleceniami.',
              ]}
            />
          </Reveal>
          <Reveal variant="right" delay={80}>
            <ImageSlot
              label="Konsultacja dietetyczna w Węgrowie — dietetyk Magdalena Skolimowska podczas wywiadu żywieniowego z pacjentką"
              src={konsultacja}
              ratio="4/3"
              sizes={SIZE_HALF}
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="etapy">
        <SectionHead
          eyebrow="Jak pracujemy"
          title="Cztery etapy współpracy"
          headingId="etapy"
        />
        {/* Capped — full-container width turns this close-up into a wall of hands. */}
        <Reveal variant="zoom">
          <ImageSlot
            label="Centymetr krawiecki w dłoniach dietetyka — pomiary obwodów ciała podczas wizyty kontrolnej"
            src={centymetr}
            ratio="3/2"
            sizes={SIZE_HALF}
            className={homeStyles.mediaNarrow}
          />
        </Reveal>
        <ol className={homeStyles.steps}>
          {processSteps.map((step, index) => (
            <li key={step.title} className={homeStyles.step}>
              <Reveal delay={index * 90}>
                <h3 className={homeStyles.stepTitle}>{step.title}</h3>
                <p className={homeStyles.stepText}>{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="surface" aria-labelledby="schorzenia">
        <SectionHead
          eyebrow="Dietoterapia"
          title="Współpraca przy schorzeniach"
          lead="Jadłospis układamy pod konkretne schorzenie lub dietę eliminacyjną. Weź na wizytę aktualne wyniki badań i zapisz nazwy przyjmowanych leków."
          headingId="schorzenia"
        />
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <Reveal variant="left">
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>Schorzenia</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {schorzenia.map((condition) => (
                <Badge key={condition} tone="outline">
                  {condition}
                </Badge>
              ))}
            </div>
          </Reveal>
          <Reveal variant="right" delay={80}>
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>
              Diety eliminacyjne
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {dietyEliminacyjne.map((diet) => (
                <Badge key={diet} tone="accent">
                  {diet}
                </Badge>
              ))}
            </div>
          </Reveal>
        </div>
        <p style={{ marginTop: 'var(--space-8)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', maxWidth: '72ch' }}>
          Jadłospis obejmuje maksymalnie 2 schorzenia lub eliminacje. Przy większej liczbie cenę
          ustalamy indywidualnie podczas konsultacji.
        </p>
      </Section>

      <Section tone="alt" aria-labelledby="online">
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <Reveal variant="left">
            <SectionHead
              eyebrow="Na odległość"
              title="Konsultacje on-line"
              lead="Nie musisz mieszkać w Węgrowie, żeby z nami pracować."
              headingId="online"
            />
            <Body
              paragraphs={[
                'Prowadzimy Pacjentów zdalnie od lat. Jadłospisy i materiały dodatkowe udostępniamy przez panel pacjenta, a między wizytami odpowiadamy na pytania mailowo i SMS-owo.',
              ]}
            />
          </Reveal>
          <Reveal variant="right" delay={80}>
            <Card variant="tint">
              <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)' }}>
                Jak umówić konsultację on-line
              </h3>
              <CheckList
                items={[
                  'Wypełnij formularz kontaktowy.',
                  'W temacie wpisz „on-line”.',
                  'W treści podaj nazwę wybranej usługi.',
                  site.onlineReplyPromise,
                ]}
              />
              <div className={prose.actions}>
                <Button href="/kontakt">Napisz do nas</Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
