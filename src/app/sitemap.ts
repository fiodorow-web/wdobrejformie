import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { treatments } from '@/content/treatments';
import { getAllPosts } from '@/lib/blog';

/** Static routes with their relative importance. */
const staticRoutes: Array<{ path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '/', priority: 1, changeFrequency: 'monthly' },
  { path: '/oferta', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/cennik', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/modelowanie-sylwetki', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/konsultacje', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/plany-zywieniowe', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/analiza-skladu-ciala', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/metamorfozy', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/poznajmy-sie', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/przygotowanie-do-wizyty', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/promocje', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/kontakt', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/blog', priority: 0.6, changeFrequency: 'weekly' },
  { path: '/formularz-zywieniowy', priority: 0.4, changeFrequency: 'yearly' },
  { path: '/regulamin', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/polityka-prywatnosci', priority: 0.2, changeFrequency: 'yearly' },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const posts = await getAllPosts();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...treatments.map((treatment) => ({
      url: `${site.url}/modelowanie-sylwetki/${treatment.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updated || post.date),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ];
}
