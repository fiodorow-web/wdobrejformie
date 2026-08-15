import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Reveal, Section } from '@/components/ds';
import { Markdown } from '@/components/sections/Markdown';
import { PageHeader } from '@/components/sections/Prose';
import { formatDate, getLegalPage } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Regulamin świadczenia usług',
  description:
    'Regulamin świadczenia usług poradni dietetycznej W Dobrej Formie — warunki korzystania z konsultacji, jadłospisów i zabiegów.',
  alternates: { canonical: '/regulamin' },
  robots: { index: true, follow: true },
};

export default async function TermsPage() {
  const page = await getLegalPage('regulamin');
  if (!page) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Dokumenty"
        title={page.title}
        lead={`Ostatnia aktualizacja: ${formatDate(page.updated)}. Podczas pierwszej wizyty poprosimy Cię o zaakceptowanie regulaminu czytelnym podpisem.`}
      />
      <Section tone="surface" tight>
        <Reveal>
          <Markdown source={page.content} />
        </Reveal>
      </Section>
    </>
  );
}
