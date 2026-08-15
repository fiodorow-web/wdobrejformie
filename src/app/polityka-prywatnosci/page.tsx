import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Card, Section } from '@/components/ds';
import { Markdown } from '@/components/sections/Markdown';
import { Body, PageHeader, SectionHead, prose } from '@/components/sections/Prose';
import { getLegalPage } from '@/lib/blog';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Polityka prywatności i cookies',
  description:
    'Kto jest administratorem Twoich danych, w jakim celu je przetwarzamy, jak długo je przechowujemy i jakie masz prawa. Informacja o plikach cookies.',
  alternates: { canonical: '/polityka-prywatnosci' },
};

/**
 * The old site had a cookies page but no RODO clause, while its contact form
 * asked for consent — a real compliance gap. The cookies text below is the
 * migrated original; the data-controller section is assembled from the
 * practice's own registration details.
 *
 * TODO(klientka): przekazać do weryfikacji prawnej przed publikacją. Do
 * potwierdzenia: okresy retencji oraz podstawa prawna przetwarzania danych
 * o zdrowiu (art. 9 ust. 2 lit. h RODO).
 */
export default async function PrivacyPage() {
  const cookies = await getLegalPage('cookies');
  if (!cookies) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Dokumenty"
        title="Polityka prywatności"
        lead="Kto przetwarza Twoje dane, po co, jak długo i co możesz z tym zrobić."
      />

      <Section tone="surface" tight aria-labelledby="administrator">
        <SectionHead
          eyebrow="Administrator"
          title="Kto przetwarza Twoje dane"
          headingId="administrator"
        />
        <Card variant="tint" className={prose.body} style={{ maxWidth: '72ch' }}>
          <p>
            <strong>{site.legalEntity.name}</strong>
            <br />
            {site.legalEntity.street}, {site.legalEntity.city}
            <br />
            NIP {site.nip} · REGON {site.regon}
          </p>
          <p>
            Gabinet: {site.address.city}, {site.address.street}
            <br />
            E-mail: <a href={`mailto:${site.email}`}>{site.email}</a>
            <br />
            Telefon: <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
          </p>
        </Card>
      </Section>

      <Section tone="alt" aria-labelledby="zasady">
        <SectionHead eyebrow="Zasady" title="Jak przetwarzamy dane" headingId="zasady" />
        <div className={prose.body}>
          <h3>W jakim celu</h3>
          <Body
            paragraphs={[
              'Dane z formularza kontaktowego przetwarzamy wyłącznie po to, żeby odpowiedzieć na Twoją wiadomość — na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO).',
              'Dane Pacjentów korzystających z konsultacji przetwarzamy w celu wykonania umowy o świadczenie usług dietetycznych (art. 6 ust. 1 lit. b RODO). Dane o stanie zdrowia, niezbędne do opracowania jadłospisu, przetwarzamy na podstawie Twojej wyraźnej zgody.',
            ]}
          />

          <h3>Jak długo</h3>
          <Body
            paragraphs={[
              'Korespondencję z formularza przechowujemy przez czas potrzebny do udzielenia odpowiedzi i obsługi ewentualnej dalszej rozmowy.',
              'Dokumentację współpracy z Pacjentem przechowujemy przez okres wymagany przepisami oraz przez czas potrzebny do ustalenia lub dochodzenia roszczeń.',
            ]}
          />

          <h3>Komu przekazujemy dane</h3>
          <Body
            paragraphs={[
              'Korzystamy z zewnętrznych dostawców, którzy przetwarzają dane w naszym imieniu: hostingu strony, usługi wysyłki poczty obsługującej formularz kontaktowy, ochrony antyspamowej oraz panelu pacjenta, w którym udostępniamy jadłospisy. Nie sprzedajemy danych i nie przekazujemy ich w celach marketingowych.',
            ]}
          />

          <h3>Twoje prawa</h3>
          <ul>
            <li>dostępu do swoich danych i otrzymania ich kopii,</li>
            <li>sprostowania danych,</li>
            <li>usunięcia danych,</li>
            <li>ograniczenia przetwarzania,</li>
            <li>przenoszenia danych,</li>
            <li>wniesienia sprzeciwu wobec przetwarzania,</li>
            <li>cofnięcia zgody w dowolnym momencie — bez wpływu na zgodność z prawem przetwarzania sprzed cofnięcia,</li>
            <li>
              wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193
              Warszawa.
            </li>
          </ul>
          <p>
            W każdej z tych spraw napisz na <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="cookies">
        <SectionHead eyebrow="Cookies" title="Pliki cookies" headingId="cookies" />
        <Markdown source={cookies.content} />
      </Section>
    </>
  );
}
