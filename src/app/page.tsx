import Link from 'next/link';
import type { Metadata } from 'next';
import { ClipboardList, Phone, ScanLine, Sparkles, Stethoscope } from 'lucide-react';
import {
  Accordion,
  Badge,
  Button,
  Card,
  Eyebrow,
  HeroSlider,
  ImageSlot,
  Reveal,
  Section,
  TestimonialCard,
} from '@/components/ds';
import type { HeroSlide } from '@/components/ds';
import { Body, SectionHead, prose } from '@/components/sections/Prose';
import { Marquee } from '@/components/sections/Marquee';
import { SIZE_QUARTER, SIZE_HALF } from '@/lib/image-sizes';
import { site } from '@/content/site';
import { serviceSummaries, processSteps } from '@/content/services';
import { treatments } from '@/content/treatments';
import { transformations } from '@/content/transformations';
import { generalFaq } from '@/content/faq';
import { JsonLd } from '@/components/JsonLd';
import { faqJsonLd } from '@/lib/jsonld';
import { team } from '@/content/team';
import styles from '@/components/sections/Home.module.css';

import konsultacja from '@/assets/photos/konsultacja-dietetyczna-wegrow.webp';
import analizator from '@/assets/photos/analizator-skladu-ciala-jawon-ioi.webp';
import planZywieniowy from '@/assets/photos/indywidualny-plan-zywieniowy.webp';
// The hero crops to roughly 2:1 and the service cards to 4:3, so both only ever
// get landscape frames — a portrait photo loses its subject to the crop.
import glowicaRf from '@/assets/photos/glowica-rf-modelowanie-sylwetki.webp';
import lipolaser from '@/assets/photos/lipolaser-plytki-laserowe-na-udach.webp';
import gabinet from '@/assets/photos/dietetyk-przy-biurku-w-gabinecie.webp';
import magdalenaPortret from '@/assets/photos/magdalena-skolimowska-poradnia-dietetyczna.webp';

export const metadata: Metadata = {
  title: 'Dietetyk Węgrów — poradnia dietetyczna W Dobrej Formie',
  description:
    'Poradnia dietetyczna w Węgrowie. Konsultacje, indywidualne jadłospisy, analiza składu ciała BIA i strefa zabiegowa modelowania sylwetki. Ponad 10 lat doświadczenia.',
  alternates: { canonical: '/' },
};

const slides: HeroSlide[] = [
  {
    eyebrow: 'Poradnia dietetyczna · Węgrów',
    title: 'Zmień sylwetkę. Zmień nawyki na dobre.',
    subtitle:
      'Jadłospis układamy z produktów, które już jesz. Bez list zakazów, bez głodzenia się i bez suplementów.',
    ctaLabel: 'Zapisz się na konsultację',
    ctaHref: '/kontakt',
    image: konsultacja,
    imageAlt:
      'Dietetyk Magdalena Skolimowska wita pacjentkę na konsultacji w poradni W Dobrej Formie w Węgrowie',
    accent: 'green',
  },
  {
    eyebrow: 'Analiza składu ciała',
    title: 'Ponad 30 parametrów Twojego organizmu.',
    subtitle:
      'Badanie BIA na analizatorze Jawon Medical pokazuje, ile naprawdę ważysz tłuszczem, mięśniami i wodą. Bezboleśnie, w kilkanaście minut.',
    ctaLabel: 'Umów badanie',
    ctaHref: '/analiza-skladu-ciala',
    image: analizator,
    imageAlt:
      'Analizator składu ciała Jawon Medical ioi w gabinecie poradni dietetycznej w Węgrowie',
    accent: 'green',
  },
  {
    eyebrow: 'Strefa zabiegowa',
    title: 'Twoje ciało. Twoje zasady. Twój efekt.',
    subtitle:
      'Lipolaser, liposukcja kawitacyjna, fale radiowe RF i kriolipoliza — zabiegi, które modelują sylwetkę tam, gdzie dieta działa najwolniej.',
    ctaLabel: 'Poznaj zabiegi',
    ctaHref: '/modelowanie-sylwetki',
    image: glowicaRf,
    imageAlt:
      'Zabieg modelowania sylwetki głowicą fal radiowych w strefie zabiegowej poradni W Dobrej Formie w Węgrowie',
    accent: 'plum',
  },
];

const servicePhotos = {
  '/konsultacje': konsultacja,
  '/plany-zywieniowe': planZywieniowy,
  '/analiza-skladu-ciala': analizator,
  '/modelowanie-sylwetki': lipolaser,
} as const;

/**
 * Alt text for the service cards. The card's visible heading already says the
 * service name, so the photo describes what is actually in frame instead of
 * repeating it — a screen reader would otherwise hear the title twice.
 */
const servicePhotoAlts = {
  '/konsultacje': 'Konsultacja dietetyczna w gabinecie w Węgrowie',
  '/plany-zywieniowe': 'Dietetyk układa indywidualny plan żywieniowy dla pacjenta',
  '/analiza-skladu-ciala': 'Analizator składu ciała Jawon Medical ioi',
  '/modelowanie-sylwetki': 'Płytki lipolasera przymocowane do ud podczas zabiegu',
} as const;

const serviceIcons = {
  stethoscope: Stethoscope,
  'clipboard-list': ClipboardList,
  'scan-line': ScanLine,
  sparkles: Sparkles,
} as const;

const stats = [
  { value: '10+', label: 'lat prowadzenia poradni' },
  { value: '30+', label: 'parametrów w badaniu składu ciała' },
  { value: '19', label: 'opisanych metamorfoz Pacjentów' },
  { value: '7', label: 'zabiegów w strefie zabiegowej' },
];

const marqueeItems = [
  'Odchudzanie',
  'Jadłospisy indywidualne',
  'Analiza składu ciała',
  'Insulinooporność',
  'Hashimoto',
  'SIBO',
  'Modelowanie sylwetki',
  'Konsultacje on-line',
];

/** Two headline stories for the home page; the rest live on /metamorfozy. */
const featuredStories = transformations.filter((story) => ['emil', 'olga'].includes(story.slug));

export default function HomePage() {
  const magdalena = team[0];

  return (
    <>
      {/*
        The page's single H1. The hero's rotating titles are H2s — three slides
        cannot each claim to be the page heading — so the real one is stated
        here for screen readers and search engines.
      */}
      <h1 className="visually-hidden">
        W Dobrej Formie — poradnia dietetyczna i strefa zabiegowa w Węgrowie
      </h1>

      <HeroSlider slides={slides} />

      <Section tone="surface">
        <div className={prose.split}>
          <Reveal variant="left">
            <Eyebrow>Poznaj poradnię</Eyebrow>
            <h2 className={prose.h2}>
              Dieta ma się dopasować do Ciebie, a nie odwrotnie
            </h2>
            <Body
              paragraphs={[
                'W Dobrej Formie to poradnia dietetyczna w Węgrowie, którą od ponad dziesięciu lat prowadzi mgr inż. Magdalena Skolimowska. Przyjmujemy stacjonarnie i on-line.',
                'Zaczynamy od badania składu ciała i szczerej rozmowy o tym, jak wygląda Twój dzień — ile masz czasu na gotowanie, gdzie jesz obiad, czego nie zniesiesz na talerzu. Dopiero z tego powstaje jadłospis.',
              ]}
            />
            {/*
              No per-stat Reveal here: this block already sits inside the
              column's own reveal, and nesting them makes the two transforms
              compose into a diagonal drift.
            */}
            <div className={styles.stats}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.stat}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal variant="right" delay={80}>
            <ImageSlot
              label="Mgr inż. Magdalena Skolimowska w gabinecie poradni dietetycznej W Dobrej Formie w Węgrowie"
              src={gabinet}
              ratio="4/3"
            />
          </Reveal>
        </div>
      </Section>

      <Marquee items={marqueeItems} />

      <Section tone="alt" aria-labelledby="uslugi">
        <SectionHead
          eyebrow="Oferta"
          title="Cztery drogi do formy"
          lead="Dietetyka i strefa zabiegowa działają osobno albo razem — podczas konsultacji podpowiemy, od czego zacząć."
          headingId="uslugi"
        />
        <div className={prose.grid4}>
          {serviceSummaries.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            const photo = servicePhotos[service.href as keyof typeof servicePhotos];
            const photoAlt = servicePhotoAlts[service.href as keyof typeof servicePhotoAlts];
            const isPlum = service.line === 'zabiegi';

            return (
              <Reveal key={service.href} delay={index * 60}>
                <Link href={service.href} className={`${styles.serviceCard} zoom-frame`}>
                  <ImageSlot
                    label={photoAlt ?? service.title}
                    src={photo}
                    ratio="4/3"
                    sizes={SIZE_QUARTER}
                  />
                  <div className={styles.serviceBody}>
                    <Icon size={22} strokeWidth={1.5} aria-hidden="true" color={isPlum ? 'var(--color-accent-2)' : 'var(--color-cta)'} />
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <p className={styles.serviceText}>{service.description}</p>
                    <span className={`${styles.servicePrice} ${isPlum ? styles.servicePricePlum : ''}`}>
                      {service.priceFrom}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="wspolpraca">
        <SectionHead
          eyebrow="Jak pracujemy"
          title="Współpraca krok po kroku"
          lead="Od pierwszego badania do stabilizacji wagi. Bez niespodzianek i bez zobowiązań na starcie."
          headingId="wspolpraca"
        />
        <ol className={styles.steps}>
          {processSteps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <Reveal delay={index * 90}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="dark" aria-labelledby="zabiegi">
        <SectionHead
          eyebrow="Strefa zabiegowa"
          eyebrowTone="plum-light"
          title="Tam, gdzie dieta potrzebuje wsparcia"
          lead="Siedem zabiegów prowadzonych przez mgr Katarzynę Tyszko, magistra fizjoterapii. Seria zawsze wychodzi taniej niż pojedyncze wizyty."
          onDark
          headingId="zabiegi"
        />
        <div className={styles.treatmentGrid}>
          {treatments.slice(0, 4).map((treatment, index) => (
            <Reveal key={treatment.slug} delay={index * 70}>
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
            Wszystkie zabiegi
          </Button>
          <Button href="/cennik#modelowanie-sylwetki" variant="secondary" onDark>
            Cennik zabiegów
          </Button>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="dietetyk">
        <div className={prose.split}>
          <Reveal variant="left">
            <ImageSlot
              label="Mgr inż. Magdalena Skolimowska — dietetyk prowadzący poradnię W Dobrej Formie w Węgrowie"
              src={magdalenaPortret}
              ratio="3/4"
              sizes={SIZE_HALF}
            />
          </Reveal>
          <Reveal variant="right" delay={80}>
            <Eyebrow>Poznajmy się</Eyebrow>
            <h2 className={prose.h2} id="dietetyk">
              {magdalena.name}
            </h2>
            <Body paragraphs={magdalena.intro} />
            <div className={prose.actions} style={{ marginTop: 'var(--space-6)' }}>
              {magdalena.badges.map((badge) => (
                <Badge key={badge} tone="outline">
                  {badge}
                </Badge>
              ))}
            </div>
            <div className={prose.actions}>
              <Button href="/poznajmy-sie" variant="secondary">
                Poznaj zespół
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="metamorfozy">
        <SectionHead
          eyebrow="Metamorfozy"
          title="Efekty, które opisali sami Pacjenci"
          lead="Dziewiętnaście historii — od pierwszego ważenia do wagi, przy której udało się zostać."
          headingId="metamorfozy"
        />
        <div className={prose.grid2}>
          {featuredStories.map((story, index) => (
            <Reveal key={story.slug} variant="zoom" delay={index * 90}>
            <TestimonialCard
              name={`${story.name}, ${story.age}`}
              stat={`−${story.lossLabel} kg w ${story.duration}`}
              quote={story.quote[story.quote.length - 1] ?? story.quote[0]}
            />
            </Reveal>
          ))}
        </div>
        <div className={prose.actions}>
          <Button href="/metamorfozy" variant="secondary">
            Zobacz wszystkie metamorfozy
          </Button>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="faq">
        <SectionHead eyebrow="Pytania" title="Zanim się umówisz" headingId="faq" />
        <Accordion items={generalFaq} />
      </Section>

      <Section tone="surface">
        <Card variant="dark" className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Pierwszy krok to badanie składu ciała</h2>
          <p className={styles.ctaText}>
            Kosztuje 50 zł i trwa kilkanaście minut. Zobaczysz, ile naprawdę ważysz tłuszczem,
            mięśniami i wodą — i od czego warto zacząć.
          </p>
          <div className={styles.ctaActions}>
            <Button href="/kontakt" size="lg">
              Zapisz się na konsultację
            </Button>
            <a className={styles.phone} href={`tel:${site.phoneHref}`}>
              <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
              {site.phone}
            </a>
          </div>
        </Card>
      </Section>

      <JsonLd data={faqJsonLd(generalFaq)} />
    </>
  );
}
