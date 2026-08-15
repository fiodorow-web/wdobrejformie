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
    'Dziewiętnaście historii Pacjentów poradni W Dobrej Formie — od −5,5 do −32 kilogramów. Wagi początkowe i końcowe, czas współpracy i relacje własnymi słowami.',
  alternates: { canonical: '/metamorfozy' },
};

export default function TransformationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Metamorfozy"
        title="Historie, które napisali sami Pacjenci"
        lead="Każda z nich zaczęła się od jednego pomiaru na analizatorze. Dane pochodzą z momentu rozpoczęcia współpracy."
      />

      <Section tone="surface" tight>
        <ol className={styles.list}>
          {transformations.map((story, index) => (
            <li key={story.slug} id={story.slug} className={styles.item}>
              <Reveal delay={index % 2 === 0 ? 0 : 80}>
                <Card variant="default" className={styles.card}>
                  <div className={styles.frame}>
                    <ImageSlot
                      label={
                        story.photoAlt
                          ? `${story.photoAlt} — metamorfoza ${story.name}, −${story.lossLabel} kg`
                          : `Metamorfoza: ${story.name}, −${story.lossLabel} kg`
                      }
                      src={story.photo}
                      /*
                       * Before/after pairs are collages — cropping them to a
                       * fixed frame slices the "po" panel off the side, which
                       * is the half that matters. Each photo keeps its own
                       * shape; only the empty placeholder falls back to 4/5.
                       */
                      ratio={
                        story.photo
                          ? `${story.photo.width}/${story.photo.height}`
                          : '4/5'
                      }
                      sizes={SIZE_PORTRAIT}
                    />
                    <StatBadge
                      value={`−${story.lossLabel} kg`}
                      label={story.duration}
                      className={styles.badge}
                    />
                  </div>

                  <div className={styles.content}>
                    <h2 className={styles.name}>{story.name}</h2>

                    <dl className={styles.stats}>
                      {story.startWeight && (
                        <div className={styles.statRow}>
                          <dt>Waga początkowa</dt>
                          <dd>{story.startWeight}</dd>
                        </div>
                      )}
                      {story.endWeight && (
                        <div className={styles.statRow}>
                          <dt>Waga końcowa</dt>
                          <dd>{story.endWeight}</dd>
                        </div>
                      )}
                      {story.fatBurned && (
                        <div className={styles.statRow}>
                          <dt>Spalony tłuszcz</dt>
                          <dd>{story.fatBurned}</dd>
                        </div>
                      )}
                      <div className={styles.statRow}>
                        <dt>Wiek</dt>
                        <dd>{story.age}</dd>
                      </div>
                      <div className={styles.statRow}>
                        <dt>Czas współpracy</dt>
                        <dd>{story.duration}</dd>
                      </div>
                    </dl>

                    <blockquote className={styles.quote}>
                      {story.quote.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </blockquote>
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
