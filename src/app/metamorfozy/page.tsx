import type { Metadata } from 'next';
import { Button, Card, ImageSlot, Reveal, Section, StatBadge } from '@/components/ds';
import { PageHeader, prose } from '@/components/sections/Prose';
import { SIZE_PORTRAIT } from '@/lib/image-sizes';
import { transformations } from '@/content/transformations';
import styles from './Transformations.module.css';
import homeStyles from '@/components/sections/Home.module.css';

export const metadata: Metadata = {
  title: 'Metamorfozy Pacjentów',
  description:
    'Dziesięć metamorfoz Pacjentów poradni W Dobrej Formie — od −9,5 do −29 kilogramów. Zdjęcia przed i po, wyniki pomiarów składu ciała i czas współpracy.',
  alternates: { canonical: '/metamorfozy' },
};

export default function TransformationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Metamorfozy"
        title="Efekty naszych Pacjentów"
        lead="Zdjęcia przed i po oraz wyniki pomiarów — po diecie, zabiegach modelowania sylwetki albo połączeniu obu."
      />

      <Section tone="surface" tight>
        <ol className={styles.list}>
          {transformations.map((story, index) => (
            <li key={story.slug} id={story.slug} className={styles.item}>
              <Reveal delay={index % 2 === 0 ? 0 : 80}>
                <Card variant="default" className={styles.card}>
                  <div className={styles.media}>
                    {story.photos.map((photo) => (
                      <ImageSlot
                        key={photo.src.src}
                        label={photo.alt}
                        src={photo.src}
                        /*
                         * Before/after pairs are collages — cropping them to a
                         * fixed frame slices the "po" panel off the side, which
                         * is the half that matters. Each photo keeps its own shape.
                         */
                        ratio={`${photo.src.width}/${photo.src.height}`}
                        sizes={SIZE_PORTRAIT}
                      />
                    ))}
                    {/*
                     * Below the photos, not over them: the new collages print
                     * "Przed" / "Po" along their bottom edge, where the badge
                     * used to sit.
                     */}
                    <StatBadge value={story.headline} label={story.headlineNote} />
                  </div>

                  <div className={styles.content}>
                    <h2 className={styles.name}>{story.name}</h2>

                    <dl className={styles.stats}>
                      {story.results.map((result) => (
                        <div key={result.label} className={styles.statRow}>
                          <dt>{result.label}</dt>
                          <dd>{result.value}</dd>
                        </div>
                      ))}
                      {story.duration && (
                        <div className={styles.statRow}>
                          <dt>Czas współpracy</dt>
                          <dd>{story.duration}</dd>
                        </div>
                      )}
                    </dl>

                    <div className={styles.description}>
                      {story.description.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className={styles.copyright}>
          Zamieszczone zdjęcia są własnością poradni dietetycznej W Dobrej Formie. Publikowanie,
          kopiowanie, przetwarzanie oraz wykorzystanie ich bez wiedzy i zgody poradni jest zabronione
          i stanowi naruszenie art. 115–123 ustawy o prawie autorskim i prawach pokrewnych.
        </p>
      </Section>

      <Section tone="alt">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Twoja historia może być następna</h2>
          <p className={homeStyles.ctaText}>
            Zacznij od badania składu ciała i szczerej rozmowy o tym, jak wygląda Twój dzień.
            Resztę zaplanujemy razem.
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
