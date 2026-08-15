import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Reveal, Section } from '@/components/ds';
import { Markdown } from '@/components/sections/Markdown';
import { PageHeader } from '@/components/sections/Prose';
import { getLegalPage } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Formularz żywieniowy Pacjenta',
  description:
    'Formularz żywieniowy do wypełnienia przed konsultacją wstępną w poradni dietetycznej W Dobrej Formie.',
  alternates: { canonical: '/formularz-zywieniowy' },
};

export default async function NutritionFormPage() {
  const page = await getLegalPage('formularz-zywieniowy');
  if (!page) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Przed wizytą"
        title={page.title}
        lead="Wypełnij formularz przed konsultacją wstępną — dzięki temu wykorzystamy całe spotkanie na rozmowę, a nie na uzupełnianie danych."
      />
      <Section tone="surface" tight>
        <Reveal>
          <Markdown source={page.content} />
        </Reveal>
      </Section>
    </>
  );
}
