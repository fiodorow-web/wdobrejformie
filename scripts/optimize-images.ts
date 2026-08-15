/**
 * Converts every source image in the repo to WebP and records its dimensions.
 *
 * Why this is needed even though next/image exists:
 *
 *  1. The four hero photos ship as 1.6–1.9 MB PNGs. next/image would still
 *     re-encode them on request, but the optimiser has to decode ~1.8 MB every
 *     time the cache misses, and git carries 7 MB of PNG forever. Converting the
 *     *source* to WebP keeps the same pixels at a fraction of the size.
 *
 *  2. The 21 images migrated out of WordPress sit in public/ and are referenced
 *     from Markdown as `![alt](/blog/foo.jpg)`, which renders a plain <img> —
 *     no resizing, no format negotiation, no width/height. The dimensions
 *     manifest this script writes lets the MDX renderer put them through
 *     next/image properly.
 *
 * Run: npm run optimize:images
 */

import sharp from 'sharp';
import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const PHOTO_DIR = join(process.cwd(), 'src', 'assets', 'photos');
const BLOG_IMAGE_DIR = join(process.cwd(), 'public', 'blog');
const BLOG_CONTENT_DIR = join(process.cwd(), 'content', 'blog');
const MANIFEST = join(BLOG_CONTENT_DIR, '_images.json');

const CONVERTIBLE = new Set(['.png', '.jpg', '.jpeg']);

/** Nothing on this site is displayed wider than the container plus retina. */
const MAX_WIDTH = 2400;

function formatBytes(bytes: number): string {
  return bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

interface Converted {
  from: string;
  to: string;
  before: number;
  after: number;
  width: number;
  height: number;
}

async function convert(dir: string, file: string, quality: number): Promise<Converted | null> {
  const ext = extname(file).toLowerCase();
  if (!CONVERTIBLE.has(ext)) return null;

  const source = join(dir, file);
  const original = await readFile(source);

  const image = sharp(original);
  const meta = await image.metadata();
  const width = meta.width ?? 0;

  const pipeline = width > MAX_WIDTH ? image.resize({ width: MAX_WIDTH }) : image;
  const output = await pipeline.webp({ quality, effort: 6 }).toBuffer();
  const outMeta = await sharp(output).metadata();

  const target = join(dir, `${file.slice(0, -ext.length)}.webp`);

  // Only keep the WebP if it actually wins — a few tiny PNGs compress worse.
  if (output.length >= original.length) return null;

  await writeFile(target, output);
  await rm(source);

  return {
    from: file,
    to: `${file.slice(0, -ext.length)}.webp`,
    before: original.length,
    after: output.length,
    width: outMeta.width ?? 0,
    height: outMeta.height ?? 0,
  };
}

async function convertDirectory(dir: string, label: string, quality: number) {
  if (!existsSync(dir)) return [];

  const files = await readdir(dir);
  const results: Converted[] = [];

  for (const file of files) {
    const result = await convert(dir, file, quality);
    if (result) results.push(result);
  }

  if (results.length) {
    const before = results.reduce((sum, r) => sum + r.before, 0);
    const after = results.reduce((sum, r) => sum + r.after, 0);
    console.log(
      `${label}: ${results.length} plików, ${formatBytes(before)} → ${formatBytes(after)} ` +
        `(−${Math.round((1 - after / before) * 100)}%)`,
    );
  } else {
    console.log(`${label}: nic do konwersji`);
  }

  return results;
}

/** Points the migrated Markdown at the .webp files we just wrote. */
async function rewriteBlogReferences(converted: Converted[]) {
  if (!converted.length) return;

  const files = (await readdir(BLOG_CONTENT_DIR)).filter((file) => file.endsWith('.mdx'));
  let touched = 0;

  for (const file of files) {
    const path = join(BLOG_CONTENT_DIR, file);
    const original = await readFile(path, 'utf8');
    let updated = original;

    for (const { from, to } of converted) {
      updated = updated.split(`/blog/${from}`).join(`/blog/${to}`);
    }

    if (updated !== original) {
      await writeFile(path, updated);
      touched += 1;
    }
  }

  console.log(`zaktualizowano odwołania w ${touched} wpisach`);
}

/**
 * Dimensions for every image under public/blog, so the MDX renderer can hand
 * next/image a width and height and avoid layout shift.
 */
async function writeManifest() {
  if (!existsSync(BLOG_IMAGE_DIR)) return;

  const files = await readdir(BLOG_IMAGE_DIR);
  const manifest: Record<string, { width: number; height: number }> = {};

  for (const file of files) {
    const meta = await sharp(join(BLOG_IMAGE_DIR, file)).metadata();
    if (meta.width && meta.height) {
      manifest[`/blog/${file}`] = { width: meta.width, height: meta.height };
    }
  }

  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`zapisano wymiary ${Object.keys(manifest).length} obrazów → content/blog/_images.json`);
}

/** Updates the static imports in source files from .png to .webp. */
async function rewritePhotoImports(converted: Converted[]) {
  if (!converted.length) return;

  const roots = [join(process.cwd(), 'src', 'app'), join(process.cwd(), 'src', 'components')];
  const targets: string[] = [];

  async function walk(dir: string) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) targets.push(path);
    }
  }

  for (const root of roots) if (existsSync(root)) await walk(root);

  let touched = 0;
  for (const path of targets) {
    const original = await readFile(path, 'utf8');
    let updated = original;
    for (const { from, to } of converted) {
      updated = updated.split(`/photos/${from}`).join(`/photos/${to}`);
    }
    if (updated !== original) {
      await writeFile(path, updated);
      touched += 1;
    }
  }

  console.log(`zaktualizowano importy zdjęć w ${touched} plikach`);
}

async function main() {
  // Hero photography carries the design, so it gets the higher quality setting.
  const photos = await convertDirectory(PHOTO_DIR, 'zdjęcia źródłowe', 82);
  await rewritePhotoImports(photos);

  const blogImages = await convertDirectory(BLOG_IMAGE_DIR, 'obrazy bloga', 78);
  await rewriteBlogReferences(blogImages);

  await writeManifest();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
