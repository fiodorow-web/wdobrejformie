import type { Metadata } from 'next';
import { Clock, LogIn, Mail, MapPin, Phone } from 'lucide-react';
import { Card, ImageSlot, Reveal, Section } from '@/components/ds';
import { PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { ContactForm } from '@/components/sections/ContactForm';
import { site } from '@/content/site';
import { SIZE_HALF } from '@/lib/image-sizes';
import styles from './Contact.module.css';

import gabinet from '@/assets/photos/gabinet-dietetyczny-wegrow.webp';

export const metadata: Metadata = {
  title: 'Kontakt — Węgrów, ul. Staszica 4',
  description:
    'Poradnia dietetyczna W Dobrej Formie, Węgrów, ul. Staszica 4, I piętro. Telefon +48 516 462 624, poniedziałek–piątek 8:00–18:00. Konsultacje stacjonarne i on-line.',
  alternates: { canonical: '/kontakt' },
};

const mapsQuery = encodeURIComponent(
  `${site.legalName}, ${site.address.street}, ${site.address.city}`,
);

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Kontakt"
        title="Napisz albo zadzwoń"
        lead="Odpowiadamy na wiadomości najszybciej, jak to możliwe. Jeśli chcesz skorzystać z oferty on-line, wybierz temat „on-line” — odezwiemy się w ciągu 24 godzin."
      />

      <Section tone="surface" tight>
        <div className={styles.layout}>
          <div className={styles.aside}>
            <Card variant="tint">
              <h2 className={styles.asideTitle}>Poradnia</h2>
              <ul className={styles.details}>
                <li>
                  <MapPin size={20} strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    {site.address.city}, {site.address.street}
                  </span>
                </li>
                <li>
                  <Phone size={20} strokeWidth={1.5} aria-hidden="true" />
                  <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
                </li>
                <li>
                  <Mail size={20} strokeWidth={1.5} aria-hidden="true" />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <Clock size={20} strokeWidth={1.5} aria-hidden="true" />
                  <span>{site.openingHours.label}</span>
                </li>
                <li>
                  <LogIn size={20} strokeWidth={1.5} aria-hidden="true" />
                  <a href={site.patientZoneUrl} target="_blank" rel="noopener noreferrer">
                    Strefa Pacjenta
                  </a>
                </li>
              </ul>

              <dl className={styles.company}>
                <div>
                  <dt>NIP</dt>
                  <dd>{site.nip}</dd>
                </div>
                <div>
                  <dt>Numer konta</dt>
                  <dd>{site.bankAccount}</dd>
                </div>
              </dl>
            </Card>

            <div className={styles.map}>
              <iframe
                title={`Mapa dojazdu — ${site.legalName}`}
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          <Card variant="elevated" className={styles.formCard}>
            <SectionHead title="Formularz kontaktowy" />
            <ContactForm />
          </Card>
        </div>
      </Section>

      <Section tone="alt" tight>
        <div className={prose.split} style={{ alignItems: 'start' }}>
          <Reveal variant="left">
            <h2 className={prose.h2}>Jak do nas trafić</h2>
            <p className={prose.lead}>
              Gabinet mieści się na I piętrze przy ul. Staszica 4 w Węgrowie. Przyjmujemy wyłącznie
              po wcześniejszym umówieniu — dzięki temu nikt nie czeka w kolejce.
            </p>

            <h2 className={prose.h2} style={{ marginTop: 'var(--space-10)' }}>
              Konsultacje on-line
            </h2>
            <p className={prose.lead}>
              Wypełnij formularz, w temacie wybierz „on-line”, a w treści podaj nazwę wybranej
              usługi. {site.onlineReplyPromise}
            </p>
          </Reveal>
          {/* Shows people the room they are walking into before they arrive. */}
          <Reveal variant="right" delay={80}>
            <ImageSlot
              label="Gabinet poradni dietetycznej W Dobrej Formie przy ul. Staszica 4 w Węgrowie — biurko konsultacyjne i analizator składu ciała"
              src={gabinet}
              ratio="4/5"
              sizes={SIZE_HALF}
            />
          </Reveal>
        </div>
      </Section>
    </>
  );
}
