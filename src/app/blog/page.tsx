import Link from 'next/link';
import type { Metadata } from 'next';
import { Badge, Reveal, Section } from '@/components/ds';
import { PageHeader } from '@/components/sections/Prose';
import { formatDate, getAllPosts, isArchived } from '@/lib/blog';
import styles from './Blog.module.css';

export const metadata: Metadata = {
  title: 'Blog — dietetyka i modelowanie sylwetki',
  description:
    'Artykuły poradni W Dobrej Formie: zdrowe odżywianie, odchudzanie, dietoterapia schorzeń oraz zabiegi modelowania sylwetki.',
  alternates: { canonical: '/blog' },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Wiedza z gabinetu"
        lead={`${posts.length} artykułów o odżywianiu, odchudzaniu i zabiegach modelowania sylwetki — pisanych przez dietetyka, nie przez copywritera.`}
      />

      <Section tone="surface" tight>
        <ul className={styles.list}>
          {posts.map((post, index) => (
            <li key={post.slug}>
              {/* Capped stagger — the list runs to 28 posts. */}
              <Reveal delay={Math.min(index, 6) * 70}>
                <Link href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.meta}>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  {isArchived(post) && <Badge tone="outline">Archiwalny</Badge>}
                </div>
                <h2 className={styles.title}>{post.title}</h2>
                {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
                  <span className={styles.more}>Czytaj dalej</span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
