import type { Metadata } from 'next';
import { Badge, Button, Card, ImageSlot, Reveal, Section } from '@/components/ds';
import { Body, PageHeader, prose } from '@/components/sections/Prose';
import { team } from '@/content/team';
import { SIZE_HALF } from '@/lib/image-sizes';
import styles from './Team.module.css';

export const metadata: Metadata = {
  title: 'Poznajmy się — Magdalena Skolimowska i Katarzyna Tyszko',
  description:
    'Poradnię prowadzi mgr inż. Magdalena Skolimowska — dietetyk z praktyką od 2010 roku, absolwentka SGGW, specjalista SOIT. Strefę zabiegową prowadzi mgr Katarzyna Tyszko, magister fizjoterapii.',
  alternates: { canonical: '/poznajmy-sie' },
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Poznajmy się"
        title="Dwie specjalistki, jedno podejście"
        lead="Bez oceniania i bez list zakazów. Pracujemy z tym, jak wygląda Twoje życie — a nie z tym, jak powinno wyglądać w teorii."
      />

      {team.map((member, index) => (
        <Section
          key={member.slug}
          tone={index % 2 === 0 ? 'surface' : 'alt'}
          id={member.slug}
          aria-labelledby={`${member.slug}-heading`}
        >
          <div className={styles.intro}>
            <Reveal variant="left" className={styles.portrait}>
              <ImageSlot
                label={member.photoAlt ?? `Portret: ${member.name}`}
                src={member.photo}
                ratio="3/4"
                sizes={SIZE_HALF}
              />
            </Reveal>

            <Reveal variant="right" delay={80}>
              <p className={member.line === 'zabiegi' ? styles.rolePlum : styles.role}>
                {member.role}
              </p>
              <h2 className={styles.name} id={`${member.slug}-heading`}>
                {member.name}
              </h2>
              <Body paragraphs={member.intro} />

              <div className={styles.badges}>
                {member.badges.map((badge) => (
                  <Badge key={badge} tone={member.line === 'zabiegi' ? 'plum-tint' : 'outline'}>
                    {badge}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </div>

          <div className={styles.detail}>
            <Body paragraphs={member.bio} />

            {member.education && (
              <Reveal className={styles.block}>
                <h3 className={styles.blockTitle}>Wykształcenie</h3>
                <ul className={styles.list}>
                  {member.education.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </Reveal>
            )}

            {member.experience && (
              <Reveal className={styles.block} delay={60}>
                <h3 className={styles.blockTitle}>Doświadczenie zawodowe</h3>
                <ul className={styles.list}>
                  {member.experience.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </Reveal>
            )}

            {member.achievements && (
              <Reveal className={styles.block} delay={120}>
                <h3 className={styles.blockTitle}>Szkolenia i osiągnięcia</h3>
                <ul className={styles.list}>
                  {member.achievements.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </Reveal>
            )}

            {member.credo && (
              <Card
                variant={member.line === 'zabiegi' ? 'plum-tint' : 'tint'}
                className={styles.credo}
              >
                <blockquote className={styles.credoQuote}>
                  {member.credo.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </blockquote>
                <p className={styles.credoAuthor}>— {member.name}</p>
              </Card>
            )}
          </div>
        </Section>
      ))}

      <Section tone="surface" tight>
        <div className={prose.actions}>
          <Button href="/kontakt" size="lg">
            Zapisz się na konsultację
          </Button>
          <Button href="/oferta" variant="secondary">
            Zobacz ofertę
          </Button>
        </div>
      </Section>
    </>
  );
}
