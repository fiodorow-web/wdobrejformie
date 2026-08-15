import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Button, Card, ImageSlot, Reveal, Section, Video } from '@/components/ds';
import { Body, CheckList, PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { getTreatment, treatments } from '@/content/treatments';
import { getAllPosts } from '@/lib/blog';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/jsonld';
import { site } from '@/content/site';
import { SIZE_HALF } from '@/lib/image-sizes';
import styles from '../Treatments.module.css';
import homeStyles from '@/components/sections/Home.module.css';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return treatments.map((treatment) => ({ slug: treatment.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) return {};

  return {
    title: `${treatment.name} — Węgrów, od ${treatment.priceFrom} zł`,
    description: `${treatment.tagline} ${treatment.course} Poradnia W Dobrej Formie, Węgrów.`,
    alternates: { canonical: `/modelowanie-sylwetki/${treatment.slug}` },
  };
}

export default async function TreatmentPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const treatment = getTreatment(slug);
  if (!treatment) notFound();

  const others = treatments.filter((entry) => entry.slug !== treatment.slug).slice(0, 3);

  // Resolve related-post slugs to real titles so the cluster links read as
  // articles rather than as URL fragments.
  const posts = await getAllPosts();
  const relatedPosts = treatment.relatedPosts
    .map((postSlug) => posts.find((post) => post.slug === postSlug))
    .filter((post) => post !== undefined);

  return (
    <>
      <PageHeader
        eyebrow="Strefa zabiegowa"
        eyebrowTone="plum"
        title={treatment.name}
        lead={treatment.tagline}
      >
        <div className={prose.actions}>
          <Button href="/kontakt" variant="plum" size="lg">
            Umów zabieg
          </Button>
          <Button href="/modelowanie-sylwetki" variant="secondary">
            Wszystkie zabiegi
          </Button>
        </div>
      </PageHeader>

      <Section tone="surface" tight>
        <div className={styles.detailLayout}>
          <div>
            {/*
              Footage beats a still for a treatment nobody has had before, so
              where a clip exists it leads; the photo covers the rest.
            */}
            {treatment.video && treatment.videoLabel ? (
              <Video
                src={treatment.video}
                label={treatment.videoLabel}
                ratio="4/3"
                style={{ marginBottom: 'var(--space-10)' }}
              />
            ) : treatment.photo ? (
              <ImageSlot
                label={treatment.photoAlt ?? treatment.name}
                src={treatment.photo}
                /*
                 * Studio frames are landscape, gabinet phone shots are portrait.
                 * A single ratio would centre-crop the portraits down to half
                 * their height and cut the subject out, so each photo keeps a
                 * frame close to its own shape.
                 */
                ratio={treatment.photo.width >= treatment.photo.height ? '3/2' : '1/1'}
                sizes={SIZE_HALF}
                style={{ marginBottom: 'var(--space-10)' }}
              />
            ) : null}

            <Body paragraphs={treatment.body} />

            <h2 className={prose.h2} style={{ marginTop: 'var(--space-10)', fontSize: 'var(--text-xl)' }}>
              Co daje ten zabieg
            </h2>
            <CheckList items={treatment.benefits} plum />

            {relatedPosts.length > 0 && (
              <>
                <h2
                  className={prose.h2}
                  style={{ marginTop: 'var(--space-10)', fontSize: 'var(--text-xl)' }}
                >
                  Więcej na blogu
                </h2>
                <div className={styles.related}>
                  {relatedPosts.map((post) => (
                    <Link key={post.slug} href={`/blog/${post.slug}`} className={styles.relatedLink}>
                      {post.title}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>

          <Reveal variant="right" delay={80}>
            <Card variant="plum-tint" className={styles.factCard}>
            <dl className={styles.factList}>
              <div className={styles.factRow}>
                <dt>Czas trwania</dt>
                <dd>{treatment.durationLabel}</dd>
              </div>
              <div className={styles.factRow}>
                <dt>Cena</dt>
                <dd className={styles.price}>od {treatment.priceFrom} zł</dd>
              </div>
              {treatment.seriesHighlight && (
                <div className={styles.factRow}>
                  <dt>W serii</dt>
                  <dd>{treatment.seriesHighlight}</dd>
                </div>
              )}
            </dl>

            {treatment.priceNote && <p className={styles.priceNote}>{treatment.priceNote}</p>}

            <p className={styles.course}>
              <strong>Zalecana seria:</strong> {treatment.course}
            </p>

            <div className={prose.actions}>
              <Button href="/cennik#modelowanie-sylwetki" variant="secondary">
                Pełny cennik
              </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      <Section tone="alt" aria-labelledby="inne">
        <SectionHead
          eyebrow="Zobacz też"
          eyebrowTone="plum"
          title="Pozostałe zabiegi"
          headingId="inne"
        />
        <div className={styles.otherGrid}>
          {others.map((other, index) => (
            <Reveal key={other.slug} delay={index * 70}>
            <Link
              href={`/modelowanie-sylwetki/${other.slug}`}
              className={styles.card}
            >
              <h3 className={styles.cardTitle}>{other.name}</h3>
              <p className={styles.cardText}>{other.tagline}</p>
              <dl className={styles.cardMeta}>
                <div>
                  <dt>Cena</dt>
                  <dd>od {other.priceFrom} zł</dd>
                </div>
              </dl>
            </Link>
            </Reveal>
          ))}
        </div>
        <div className={prose.actions}>
          <Link
            href="/modelowanie-sylwetki"
            className={styles.relatedLink}
            style={{ borderColor: 'transparent', paddingInline: 0 }}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Wróć do strefy zabiegowej
          </Link>
        </div>
      </Section>

      <Section tone="surface">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Umów {treatment.name.toLowerCase()}</h2>
          <p className={homeStyles.ctaText}>
            Napisz, na czym Ci zależy — dobierzemy liczbę zabiegów i podpowiemy, czy warto połączyć
            je z konsultacją dietetyczną.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" variant="plum" size="lg">
              Zapytaj o termin
            </Button>
          </div>
        </Card>
      </Section>

      <JsonLd
        data={serviceJsonLd({
          name: treatment.name,
          description: treatment.tagline,
          url: `${site.url}/modelowanie-sylwetki/${treatment.slug}`,
          price: treatment.priceFrom,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Strona główna', path: '/' },
          { name: 'Modelowanie sylwetki', path: '/modelowanie-sylwetki' },
          { name: treatment.name, path: `/modelowanie-sylwetki/${treatment.slug}` },
        ])}
      />
    </>
  );
}
