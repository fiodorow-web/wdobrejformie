/**
 * Migrates the old WordPress site's content into this repo.
 *
 *  - 28 blog posts  → content/blog/{slug}.mdx
 *  - legal pages    → content/legal/{slug}.mdx
 *  - a manifest     → content/blog/_manifest.json, which next.config.ts turns
 *                     into the 301s (posts move from /{slug}/ to /blog/{slug})
 *
 * Post bodies are clean semantic HTML — WordPress classic editor, no Elementor
 * markup — so the HTML→Markdown conversion is lossless in practice. Images are
 * downloaded to public/blog/ so the new site has no dependency on the old host.
 *
 * Run: npm run migrate:blog
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeRemark from 'rehype-remark';
import remarkStringify from 'remark-stringify';
import remarkGfm from 'remark-gfm';

const API = 'https://wdobrejformie.net/wp-json/wp/v2';
const BLOG_DIR = join(process.cwd(), 'content', 'blog');
const LEGAL_DIR = join(process.cwd(), 'content', 'legal');
const IMAGE_DIR = join(process.cwd(), 'public', 'blog');

/** Pages that carry legal text we must preserve word for word. */
const LEGAL_PAGES = ['regulamin', 'cookies', 'formularz-zywieniowy'];

interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
}

const processor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeRemark)
  // Some posts carry <table> markup; without GFM the serializer throws on it.
  .use(remarkGfm)
  .use(remarkStringify, {
    bullet: '-',
    emphasis: '_',
    strong: '*',
    fences: true,
    rule: '-',
  });

async function htmlToMarkdown(html: string): Promise<string> {
  const file = await processor.process(html);
  return (
    String(file)
      .trim()
      // remark emits bare URLs as Markdown autolinks (<https://…>), which are
      // valid Markdown but invalid MDX — MDX reads the `<` as a JSX tag.
      .replace(/<(https?:\/\/[^>\s]+)>/g, '[$1]($1)')
      // The source HTML contains empty anchors (leftovers from the page
      // builder). They survive as `[](url)`, which renders a focusable link
      // with no accessible name — an axe "link-name" failure.
      .replace(/\[\]\([^)]*\)/g, '')
      // Links pointing back at the old absolute domain must become internal, or
      // the new site will bounce visitors to the site it replaces. Media stays
      // absolute — those files are not migrated.
      .replace(
        /\]\(https?:\/\/(?:www\.)?wdobrejformie\.net(\/(?!wp-content)[^)]*)?\)/g,
        (_match, path) => `](${(path ?? '/').replace(/\/$/, '') || '/'})`,
      )
  );
}

function decodeEntities(value: string): string {
  const named: Record<string, string> = {
    '&#8211;': '–',
    '&#8212;': '—',
    '&#8216;': '‘',
    '&#8217;': '’',
    '&#8220;': '„',
    '&#8221;': '”',
    '&#8222;': '„',
    '&#8230;': '…',
    '&nbsp;': ' ',
    '&amp;': '&',
    '&quot;': '"',
    '&lt;': '<',
    '&gt;': '>',
    '&hellip;': '…',
  };

  return value
    .replace(/&#\d+;|&[a-z]+;/gi, (entity) => named[entity] ?? entity)
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .trim();
}

function stripTags(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/** YAML-safe scalar. Keeps Polish quotes and colons from breaking frontmatter. */
function yaml(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

async function fetchAll<T>(endpoint: string): Promise<T[]> {
  const results: T[] = [];
  for (let page = 1; ; page += 1) {
    const response = await fetch(`${API}/${endpoint}&per_page=100&page=${page}`);
    if (response.status === 400) break; // past the last page
    if (!response.ok) throw new Error(`${endpoint} page ${page}: HTTP ${response.status}`);
    const batch = (await response.json()) as T[];
    results.push(...batch);
    const totalPages = Number(response.headers.get('x-wp-totalpages') ?? '1');
    if (page >= totalPages) break;
  }
  return results;
}

async function downloadImage(url: string): Promise<string | null> {
  try {
    const filename = decodeURIComponent(new URL(url).pathname.split('/').pop() ?? '');
    if (!filename) return null;

    const target = join(IMAGE_DIR, filename);
    if (!existsSync(target)) {
      const response = await fetch(url);
      if (!response.ok) return null;
      await writeFile(target, Buffer.from(await response.arrayBuffer()));
    }
    return `/blog/${filename}`;
  } catch {
    return null;
  }
}

/** Rewrites wp-content image URLs to local ones, downloading as it goes. */
async function localiseImages(html: string): Promise<string> {
  const urls = [...html.matchAll(/src="([^"]*wp-content\/uploads\/[^"]+)"/g)].map((m) => m[1]);
  let output = html;

  for (const url of new Set(urls)) {
    const local = await downloadImage(url);
    if (local) output = output.split(url).join(local);
  }

  return output;
}

async function migratePosts() {
  const posts = await fetchAll<WpPost>('posts?_fields=id,slug,date,modified,link,title,excerpt,content,featured_media');
  console.log(`posts: ${posts.length}`);

  const media = new Map<number, string>();
  const mediaIds = [...new Set(posts.map((p) => p.featured_media).filter(Boolean))];
  for (const id of mediaIds) {
    const response = await fetch(`${API}/media/${id}?_fields=source_url`);
    if (!response.ok) continue;
    const { source_url } = (await response.json()) as { source_url: string };
    const local = await downloadImage(source_url);
    if (local) media.set(id, local);
  }
  console.log(`cover images: ${media.size}`);

  const manifest: Array<{ slug: string; legacyUrl: string; date: string }> = [];

  for (const post of posts) {
    const title = decodeEntities(post.title.rendered);
    const excerpt = stripTags(post.excerpt.rendered).replace(/\s*\[…\]$/, '').slice(0, 300);
    const body = await htmlToMarkdown(await localiseImages(post.content.rendered));
    const cover = media.get(post.featured_media);
    const legacyUrl = new URL(post.link).pathname.replace(/\/$/, '');

    const frontmatter = [
      '---',
      `title: ${yaml(title)}`,
      `date: ${yaml(post.date.slice(0, 10))}`,
      `updated: ${yaml(post.modified.slice(0, 10))}`,
      `excerpt: ${yaml(excerpt)}`,
      cover ? `cover: ${yaml(cover)}` : null,
      `legacyUrl: ${yaml(legacyUrl)}`,
      '---',
      '',
    ]
      .filter((line) => line !== null)
      .join('\n');

    await writeFile(join(BLOG_DIR, `${post.slug}.mdx`), `${frontmatter}\n${body}\n`);
    manifest.push({ slug: post.slug, legacyUrl, date: post.date.slice(0, 10) });
  }

  manifest.sort((a, b) => b.date.localeCompare(a.date));
  await writeFile(join(BLOG_DIR, '_manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

  // Second pass: posts used to live at the site root, so cross-links between
  // them point at /{slug}. Those now 301 to /blog/{slug} — correct, but an
  // internal link should never need a redirect. Rewrite them to the final path.
  const slugs = new Set(manifest.map((entry) => entry.slug));
  let rewritten = 0;

  for (const { slug } of manifest) {
    const path = join(BLOG_DIR, `${slug}.mdx`);
    const original = await readFile(path, 'utf8');
    const updated = original.replace(/\]\(\/([a-z0-9-]+)\)/g, (match, target: string) =>
      slugs.has(target) ? `](/blog/${target})` : match,
    );
    if (updated !== original) {
      await writeFile(path, updated);
      rewritten += 1;
    }
  }

  console.log(`wrote ${manifest.length} posts + manifest (${rewritten} with rewritten cross-links)`);
}

async function migrateLegalPages() {
  for (const slug of LEGAL_PAGES) {
    const response = await fetch(`${API}/pages?slug=${slug}&_fields=slug,title,content,modified`);
    if (!response.ok) continue;
    const [page] = (await response.json()) as WpPost[];
    if (!page) {
      console.warn(`legal: ${slug} not found`);
      continue;
    }

    const title = decodeEntities(page.title.rendered);
    const body = await htmlToMarkdown(await localiseImages(page.content.rendered));

    const frontmatter = [
      '---',
      `title: ${yaml(title)}`,
      `updated: ${yaml(page.modified.slice(0, 10))}`,
      '---',
      '',
    ].join('\n');

    await writeFile(join(LEGAL_DIR, `${slug}.mdx`), `${frontmatter}\n${body}\n`);
    console.log(`legal: ${slug} (${body.length} chars)`);
  }
}

async function main() {
  await mkdir(BLOG_DIR, { recursive: true });
  await mkdir(LEGAL_DIR, { recursive: true });
  await mkdir(IMAGE_DIR, { recursive: true });

  await migratePosts();
  await migrateLegalPages();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
