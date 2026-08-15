import Link from 'next/link';
import type { Metadata } from 'next';
import { ClipboardList, ScanLine, Sparkles, Stethoscope } from 'lucide-react';
import { Button, Card, ImageSlot, Reveal, Section } from '@/components/ds';
import { PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { SIZE_THIRD } from '@/lib/image-sizes';
import { serviceSummaries } from '@/content/services';
import { treatments } from '@/content/treatments';
import styles from '@/components/sections/Home.module.css';

import konsultacja from '@/assets/photos/konsultacja-dietetyczna-wegrow.webp';
import jadlospis from '@/assets/photos/ukladanie-jadlospisu-w-poradni.webp';
import pomiarBia from '@/assets/photos/analiza-skladu-ciala-pomiar-bia.webp';

export const metadata: Metadata = {
  title: 'Oferta — dietetyka i modelowanie sylwetki',
  description:
    'Konsultacje dietetyczne, indywidualne plany żywieniowe, analiza składu ciała BIA i strefa zabiegowa. Poradnia W Dobrej Formie w Węgrowie.',
  alternates: { canonical: '/oferta' },
};

const icons = {
  stethoscope: Stethoscope,
  'clipboard-list': ClipboardList,
  'scan-line': ScanLine,
  sparkles: Sparkles,
} as const;

/**
 * Only the dietetyka line renders cards here, so this map covers those three
 * pages. Each entry carries its own alt text: the card heading already states
 * the service name, so the photo describes what is in frame instead.
 */
const photos = {
  '/konsultacje': {
    src: konsultacja,
    alt: 'Dietetyk wita pacjentkę na konsultacji w poradni w Węgrowie',
  },
  '/plany-zywieniowe': {
    src: jadlospis,
    alt: 'Układanie indywidualnego jadłospisu w programie dietetycznym',
  },
  '/analiza-skladu-ciala': {
    src: pomiarBia,
    alt: 'Pomiar składu ciała metodą bioimpedancji na analizatorze Jawon Medical',
  },
} as const;

export default function OfferPage() {
  const dietetyka = serviceSummaries.filter((service) => service.line === 'dietetyka');

  return (
    <>
      <PageHeader
        eyebrow="Oferta"
        title="Dwie drogi, jeden cel"
        lead="Dietetyka pracuje nad tym, co jesz i jak się czujesz. Strefa zabiegowa modeluje sylwetkę tam, gdzie sama dieta działa najwolniej. Możesz korzystać z jednej albo z obu."
      />

      <Section tone="surface" tight aria-labelledby="dietetyka">
        <SectionHead
          eyebrow="Linia dietetyczna"
          title="Dietetyka"
          lead="Prowadzi mgr inż. Magdalena Skolimowska. Konsultacje stacjonarne w Węgrowie oraz on-line."
          headingId="dietetyka"
        />
        <div className={prose.grid3}>
          {dietetyka.map((service, index) => {
            const Icon = icons[service.icon];
            const photo = photos[service.href as keyof typeof photos];
            return (
              <Reveal key={service.href} delay={index * 60}>
                <Link href={service.href} className={`${styles.serviceCard} zoom-frame`}>
                  <ImageSlot
                    label={photo?.alt ?? service.title}
                    src={photo?.src}
                    ratio="4/3"
                    sizes={SIZE_THIRD}
                  />
                  <div className={styles.serviceBody}>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" color="var(--color-cta)" />
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceText}>{service.description}</p>
                    <span className={styles.servicePrice}>{service.priceFrom}</span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className={prose.actions}>
          <Button href="/cennik#osoby-zdrowe" variant="secondary">
            Cennik dietetyki
          </Button>
        </div>
      </Section>

      <Section tone="dark" aria-labelledby="zabiegi">
        <SectionHead
          eyebrow="Linia zabiegowa"
          eyebrowTone="plum-light"
          title="Strefa zabiegowa"
          lead="Prowadzi mgr Katarzyna Tyszko, magister fizjoterapii. Siedem zabiegów na ciało i twarz — pojedynczo lub w seriach."
          onDark
          headingId="zabiegi"
        />
        <div className={styles.treatmentGrid}>
          {treatments.map((treatment, index) => (
            <Reveal key={treatment.slug} delay={index * 60}>
              <Link
                href={`/modelowanie-sylwetki/${treatment.slug}`}
                className={styles.treatmentCard}
              >
                <span className={styles.treatmentName}>{treatment.name}</span>
                <span className={styles.treatmentTagline}>{treatment.tagline}</span>
                <span className={styles.treatmentPrice}>od {treatment.priceFrom} zł</span>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className={prose.actions}>
          <Button href="/modelowanie-sylwetki" variant="plum">
            Więcej o strefie zabiegowej
          </Button>
          <Button href="/cennik#modelowanie-sylwetki" variant="secondary" onDark>
            Cennik zabiegów
          </Button>
        </div>
      </Section>

      <Section tone="alt">
        <Card variant="dark" className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Nie wiesz, od czego zacząć?</h2>
          <p className={styles.ctaText}>
            Najczęściej od badania składu ciała — pokazuje, ile ważysz tłuszczem, mięśniami i wodą,
            i podpowiada, czy pracować dietą, zabiegami, czy jednym i drugim.
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
