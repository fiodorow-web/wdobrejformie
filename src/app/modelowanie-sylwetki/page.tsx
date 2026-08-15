import Link from 'next/link';
import type { Metadata } from 'next';
import { Accordion, Button, Card, ImageSlot, Reveal, Section, Video } from '@/components/ds';
import { Body, PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { treatments } from '@/content/treatments';
import { promotions } from '@/content/promotions';
import { treatmentFaq } from '@/content/faq';
import { JsonLd } from '@/components/JsonLd';
import { faqJsonLd } from '@/lib/jsonld';
import { team } from '@/content/team';
import { SIZE_HALF, SIZE_THIRD } from '@/lib/image-sizes';
import styles from '@/components/sections/Home.module.css';
import pageStyles from './Treatments.module.css';

import urzadzenie from '@/assets/photos/urzadzenie-slimroll-x-strefa-zabiegowa.webp';
import endomasaz from '@/assets/photos/endomasaz-slimroll-x-zabieg.webp';
import zielonyLed from '@/assets/photos/zabieg-ujedrniajacy-zielone-led.webp';
import endermologiaNogi from '@/assets/photos/zabieg-endermologii-na-nogi.webp';
import plytkiLipolaser from '@/assets/photos/lipolaser-plytki-diodowe.webp';
import zabiegUda from '@/assets/photos/zabieg-modelowania-ud.webp';

/**
 * Gallery of the actual gabinet. Stock photography of anonymous treatment rooms
 * is what every competitor in the area uses; these are the real equipment and
 * the real room, which is the whole point of showing them.
 */
const gallery = [
  { src: urzadzenie, alt: 'Urządzenie do modelowania sylwetki SLIMROLL X w gabinecie zabiegowym w Węgrowie' },
  { src: endomasaz, alt: 'Zabieg endomasażu rollerowego głowicą z podświetleniem LED' },
  { src: zielonyLed, alt: 'Zabieg ujędrniający głowicą z zielonym światłem LED na brzuchu' },
  { src: endermologiaNogi, alt: 'Zabieg endermologii na nogi wykonywany głowicą rollerową' },
  { src: plytkiLipolaser, alt: 'Płytki diodowe lipolasera z czerwonym światłem laserowym' },
  { src: zabiegUda, alt: 'Zabieg modelowania ud głowicą zabiegową w strefie zabiegowej' },
];

export const metadata: Metadata = {
  title: 'Modelowanie sylwetki — strefa zabiegowa w Węgrowie',
  description:
    'Lipolaser, liposukcja kawitacyjna, fale radiowe RF, kriolipoliza, endomasaż SLIMROLL X, masaż Kobido i oczyszczanie wodorowe. Ceny od 140 zł, serie taniej.',
  alternates: { canonical: '/modelowanie-sylwetki' },
};

export default function TreatmentsHubPage() {
  const katarzyna = team.find((member) => member.line === 'zabiegi');
  const treatmentPromos = promotions.filter((promo) => promo.line === 'zabiegi');

  return (
    <>
      <PageHeader
        eyebrow="Strefa zabiegowa"
        eyebrowTone="plum"
        title="Twoje ciało. Twoje zasady. Twój efekt."
        lead="Siedem zabiegów, które modelują sylwetkę i poprawiają kondycję skóry tam, gdzie sama dieta działa najwolniej. Wszystkie bezinwazyjne, bez rekonwalescencji."
      >
        <div className={prose.actions}>
          <Button href="/kontakt" variant="plum" size="lg">
            Umów zabieg
          </Button>
          <Button href="/cennik#modelowanie-sylwetki" variant="secondary">
            Cennik i serie
          </Button>
        </div>
      </PageHeader>

      <Section tone="surface" tight aria-labelledby="zabiegi">
        <SectionHead
          eyebrow="Zabiegi"
          eyebrowTone="plum"
          title="Wybierz zabieg"
          lead="Każdy zabieg ma swoją stronę z opisem, czasem trwania, zalecaną serią i ceną."
          headingId="zabiegi"
        />
        <div className={pageStyles.grid}>
          {treatments.map((treatment, index) => (
            <Reveal key={treatment.slug} delay={index * 50}>
              <Link href={`/modelowanie-sylwetki/${treatment.slug}`} className={pageStyles.card}>
                <h3 className={pageStyles.cardTitle}>{treatment.name}</h3>
                <p className={pageStyles.cardText}>{treatment.tagline}</p>
                <dl className={pageStyles.cardMeta}>
                  <div>
                    <dt>Czas</dt>
                    <dd>{treatment.durationLabel}</dd>
                  </div>
                  <div>
                    <dt>Cena</dt>
                    <dd>od {treatment.priceFrom} zł</dd>
                  </div>
                </dl>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {katarzyna && (
        <Section tone="plum-tint" aria-labelledby="specjalistka">
          <div className={prose.split}>
            <Reveal variant="left">
              <SectionHead
                eyebrow="Prowadzi"
                eyebrowTone="plum"
                title={katarzyna.name}
                headingId="specjalistka"
              />
              <Body paragraphs={[...katarzyna.intro, ...katarzyna.bio]} />
              <div className={prose.actions}>
                <Button href="/poznajmy-sie" variant="secondary">
                  Poznaj zespół
                </Button>
              </div>
            </Reveal>
            <Reveal variant="right" delay={80}>
              <ImageSlot
                label={katarzyna.photoAlt ?? `Portret: ${katarzyna.name}`}
                src={katarzyna.photo}
                ratio="3/4"
                sizes={SIZE_HALF}
              />
            </Reveal>
          </div>
        </Section>
      )}

      <Section tone="dark" aria-labelledby="promocje-zabiegi">
        <SectionHead
          eyebrow="Promocje"
          eyebrowTone="plum-light"
          title="Seria zawsze wychodzi taniej"
          onDark
          headingId="promocje-zabiegi"
        />
        <div className={prose.grid2}>
          {treatmentPromos.map((promo, index) => (
            <Reveal key={promo.title} variant="zoom" delay={index * 90} className={pageStyles.promo}>
              <h3 className={pageStyles.promoTitle}>{promo.title}</h3>
              <p className={pageStyles.promoSummary}>{promo.summary}</p>
              <ul className={pageStyles.promoList}>
                {promo.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              {promo.footnote && <p className={pageStyles.promoFootnote}>{promo.footnote}</p>}
            </Reveal>
          ))}
        </div>
        <div className={prose.actions}>
          <Button href="/promocje" variant="plum">
            Wszystkie promocje
          </Button>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="galeria">
        <SectionHead
          eyebrow="Galeria"
          eyebrowTone="plum"
          title="Nasz gabinet i sprzęt"
          lead="Zdjęcia z naszej strefy zabiegowej w Węgrowie — te urządzenia i to wnętrze zastaniesz na wizycie."
          headingId="galeria"
        />
        <div className={prose.grid3}>
          {gallery.map((photo, index) => (
            <Reveal key={photo.alt} delay={index * 50}>
              <ImageSlot label={photo.alt} src={photo.src} ratio="4/5" sizes={SIZE_THIRD} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="film">
        <SectionHead
          eyebrow="Zobacz, jak pracujemy"
          eyebrowTone="plum"
          title="Zabieg od środka"
          lead="Krótkie nagrania z gabinetu — bez montażu, bez lektora. Tak wygląda zabieg u nas."
          headingId="film"
        />
        <div className={prose.grid3}>
          <Reveal variant="zoom">
            <Video
              src="strefa-zabiegowa-glowica"
              label="Mgr Katarzyna Tyszko prezentuje głowicę rollerową do endomasażu w strefie zabiegowej"
            />
          </Reveal>
          <Reveal variant="zoom" delay={90}>
            <Video
              src="endomasaz-glowica-rolkowa"
              label="Głowica rollerowa z podświetleniem LED w trakcie zabiegu modelowania sylwetki"
            />
          </Reveal>
          <Reveal variant="zoom" delay={180}>
            <Video
              src="zabieg-laserowy-nogi"
              label="Aplikatory laserowe z zielonym światłem przymocowane do nóg pacjentki podczas zabiegu"
            />
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="faq-zabiegi">
        <SectionHead
          eyebrow="Pytania"
          eyebrowTone="plum"
          title="Zanim umówisz zabieg"
          headingId="faq-zabiegi"
        />
        <Accordion items={treatmentFaq} />
      </Section>

      <Section tone="surface">
        <Card variant="dark" className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Nie wiesz, który zabieg wybrać?</h2>
          <p className={styles.ctaText}>
            Napisz, na czym Ci zależy — podpowiemy, który zabieg zadziała najlepiej i ile sesji
            realnie będzie potrzebnych.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" variant="plum" size="lg">
              Zapytaj o zabieg
            </Button>
          </div>
        </Card>
      </Section>

      <JsonLd data={faqJsonLd(treatmentFaq)} />
    </>
  );
}
