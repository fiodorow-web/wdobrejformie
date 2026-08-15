import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { Badge, Button, Card, Reveal, Section } from '@/components/ds';
import { Markdown } from '@/components/sections/Markdown';
import { SectionHead, prose } from '@/components/sections/Prose';
import { formatDate, getAllPosts, getPost, isArchived } from '@/lib/blog';
import { JsonLd } from '@/components/JsonLd';
import { articleJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import styles from '../Blog.module.css';
import homeStyles from '@/components/sections/Home.module.css';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt.slice(0, 160),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt.slice(0, 160),
      publishedTime: post.date,
      modifiedTime: post.updated,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const all = await getAllPosts();
  const related = all.filter((entry) => entry.slug !== post.slug).slice(0, 3);
  const archived = isArchived(post);

  return (
    <>
      <header className={`container ${styles.postHeader}`}>
        <Link href="/blog" className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          Wróć do bloga
        </Link>
        <div className={styles.postMeta} style={{ marginTop: 'var(--space-5)' }}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {archived && <Badge tone="outline">Archiwalny</Badge>}
        </div>
        <h1 className={styles.postTitle}>{post.title}</h1>
      </header>

      <Section tone="surface" tight>
        {archived && (
          <p className={styles.archiveNotice}>
            Ten artykuł powstał {formatDate(post.date)} i nie był od tego czasu aktualizowany.
            Zalecenia żywieniowe się zmieniają — jeśli chcesz mieć pewność, że informacje są
            aktualne w Twoim przypadku, umów się na konsultację.
          </p>
        )}

        <Reveal>
          <Markdown source={post.content} />
        </Reveal>
      </Section>

      <Section tone="alt" aria-labelledby="powiazane">
        <SectionHead eyebrow="Czytaj dalej" title="Inne artykuły" headingId="powiazane" />
        <div className={styles.related}>
          {related.map((entry) => (
            <Link key={entry.slug} href={`/blog/${entry.slug}`} className={styles.card}>
              <div className={styles.meta}>
                <time dateTime={entry.date}>{formatDate(entry.date)}</time>
              </div>
              <h3 className={styles.title}>{entry.title}</h3>
              <span className={styles.more}>Czytaj dalej</span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="surface">
        <Card variant="dark" className={homeStyles.ctaCard}>
          <h2 className={homeStyles.ctaTitle}>Chcesz zastosować to u siebie?</h2>
          <p className={homeStyles.ctaText}>
            Ogólne zasady to jedno, Twój organizm to drugie. Zacznij od badania składu ciała i
            konsultacji — dopasujemy zalecenia do Ciebie.
          </p>
          <div className={prose.actions}>
            <Button href="/kontakt" size="lg">
              Zapisz się na konsultację
            </Button>
          </div>
        </Card>
      </Section>

      <JsonLd data={articleJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Strona główna', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
    </>
  );
}
