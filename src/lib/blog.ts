import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';

const BLOG_DIR = join(process.cwd(), 'content', 'blog');
const LEGAL_DIR = join(process.cwd(), 'content', 'legal');

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  updated: string;
  excerpt: string;
  cover?: string;
  /** Path this post lived at on the old WordPress site. */
  legacyUrl: string;
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * Posts older than this are flagged in the UI. Thirteen of the migrated posts
 * date from 2015–2017; showing their age is more honest than quietly serving
 * decade-old nutrition advice as current.
 */
const ARCHIVE_BEFORE = '2020-01-01';

export function isArchived(post: PostMeta): boolean {
  return post.date < ARCHIVE_BEFORE;
}

function parse(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  return {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? ''),
    updated: String(data.updated ?? data.date ?? ''),
    excerpt: String(data.excerpt ?? ''),
    cover: data.cover ? String(data.cover) : undefined,
    legacyUrl: String(data.legacyUrl ?? `/${slug}`),
    content,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const files = await readdir(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '');
        return parse(slug, await readFile(join(BLOG_DIR, file), 'utf8'));
      }),
  );

  // Drop the body — the index only needs metadata, and 28 full articles is a
  // lot of payload to carry through a listing page.
  return posts
    .map((post): PostMeta => {
      const { content, ...meta } = post;
      void content;
      return meta;
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    return parse(slug, await readFile(join(BLOG_DIR, `${slug}.mdx`), 'utf8'));
  } catch {
    return null;
  }
}

export async function getLegalPage(slug: string): Promise<Post | null> {
  try {
    return parse(slug, await readFile(join(LEGAL_DIR, `${slug}.mdx`), 'utf8'));
  } catch {
    return null;
  }
}

/** Human-readable Polish date, e.g. "17 listopada 2025". */
export function formatDate(iso: string): string {
  if (!iso) return '';
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}
