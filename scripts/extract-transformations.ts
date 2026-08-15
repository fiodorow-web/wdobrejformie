/**
 * One-off extractor: pulls the patient transformation stories out of the old
 * WordPress site and writes src/content/transformations.ts.
 *
 * There are 15 stories across two pages (/metamorfozy/ and the orphaned
 * /metamorfozy-cd/, which is not linked from the current navigation). The
 * design-system prototype only carried four, so hand-transcribing was never an
 * option — quotes run to several hundred words each.
 *
 * Run: npx tsx scripts/extract-transformations.ts
 */

import { writeFileSync } from 'node:fs';

const API = 'https://wdobrejformie.net/wp-json/wp/v2/pages';
const PAGES = ['metamorfozy', 'metamorfozy-cd'];

interface Story {
  name: string;
  lossKg: number;
  startWeight?: string;
  endWeight?: string;
  fatBurned?: string;
  age: string;
  duration: string;
  /** The testimonial, one entry per paragraph. */
  quote: string[];
}

function htmlToText(html: string): string {
  return html
    .replace(/<\/(p|div|li|h\d|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '\n')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8222;/g, '„')
    .replace(/&#8221;|&#8220;/g, '”')
    .replace(/&#8230;/g, '…')
    .replace(/&#8217;|&#8216;/g, '’')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/[ \t]+/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .join('\n');
}

function parseStories(text: string): Story[] {
  const lines = text.split('\n');
  const stories: Story[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const success = /^Sukces:\s*[–-]\s*(\d+(?:,\d+)?)\s*kilogram/.exec(lines[i]);
    if (!success) continue;

    // The person's name is the line immediately above the "Sukces:" line.
    const name = lines[i - 1]?.trim();
    if (!name || name.split(' ').length > 2) continue;

    const story: Story = {
      name,
      lossKg: Number(success[1].replace(',', '.')),
      age: '',
      duration: '',
      quote: [],
    };

    // Stats and the quote follow, before the next person's "Sukces:" line.
    // Testimonials run to several paragraphs and only the first opens with „,
    // so once a quote starts we keep collecting until the closing ” or the
    // "więcej" expander that ends the block.
    let inQuote = false;

    for (let j = i + 1; j < lines.length; j += 1) {
      const line = lines[j];
      if (/^Sukces:/.test(line)) break;

      if (inQuote) {
        if (line === 'więcej') break;
        story.quote.push(line.replace(/[”"]$/, '').trim());
        if (/[”"]$/.test(line)) break;
        continue;
      }

      const start = /^waga początkowa:\s*(.+)$/i.exec(line);
      const end = /^waga końcowa:\s*(.+)$/i.exec(line);
      const fat = /^spalony tłuszcz:\s*(.+?)!?$/i.exec(line);
      const age = /^wiek:\s*(.+)$/i.exec(line);
      const duration = /^czas odchudzania:\s*(.+)$/i.exec(line);

      if (start) story.startWeight = start[1].replace(/kg$/, ' kg').replace(/\s+/g, ' ').trim();
      else if (end) story.endWeight = end[1].replace(/kg$/, ' kg').replace(/\s+/g, ' ').trim();
      else if (fat) story.fatBurned = fat[1].trim();
      else if (age) story.age = age[1].trim();
      else if (duration) story.duration = duration[1].trim();
      else if (line.startsWith('„')) {
        inQuote = true;
        story.quote.push(line.replace(/^„/, '').replace(/[”"]$/, '').trim());
        if (/[”"]$/.test(line)) break;
      }
    }

    // The source contains stray "?" characters where emoji failed to encode.
    // A space on both sides distinguishes them from real question marks, which
    // always sit flush against the preceding word.
    story.quote = story.quote
      .map((p) => p.replace(/ \? /g, ' ').replace(/ \?$/, '').replace(/\s{2,}/g, ' ').trim())
      .filter(Boolean);

    if (story.age && story.duration) stories.push(story);
  }

  return stories;
}

function toSlug(name: string): string {
  const map: Record<string, string> = { ą: 'a', ć: 'c', ę: 'e', ł: 'l', ń: 'n', ó: 'o', ś: 's', ź: 'z', ż: 'z' };
  return name
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (c) => map[c])
    .replace(/[^a-z0-9]+/g, '-');
}

async function main() {
  const all: Story[] = [];

  for (const slug of PAGES) {
    const response = await fetch(`${API}?slug=${slug}&_fields=content`);
    if (!response.ok) throw new Error(`${slug}: HTTP ${response.status}`);
    const [page] = (await response.json()) as Array<{ content: { rendered: string } }>;
    if (!page) throw new Error(`${slug}: page not found`);

    const stories = parseStories(htmlToText(page.content.rendered));
    console.log(`${slug}: ${stories.length} stories`);
    all.push(...stories);
  }

  // Two patients share a first name, so slugs need disambiguating.
  const slugCounts = new Map<string, number>();
  const slugs = all.map((story) => {
    const base = toSlug(story.name);
    const seen = (slugCounts.get(base) ?? 0) + 1;
    slugCounts.set(base, seen);
    return seen === 1 ? base : `${base}-${seen}`;
  });

  const body = all
    .map((story, index) => {
      const fields = [
        `    slug: ${JSON.stringify(slugs[index])},`,
        `    name: ${JSON.stringify(story.name)},`,
        `    lossKg: ${story.lossKg},`,
        `    lossLabel: ${JSON.stringify(String(story.lossKg).replace('.', ','))},`,
        story.startWeight ? `    startWeight: ${JSON.stringify(story.startWeight)},` : null,
        story.endWeight ? `    endWeight: ${JSON.stringify(story.endWeight)},` : null,
        story.fatBurned ? `    fatBurned: ${JSON.stringify(story.fatBurned)},` : null,
        `    age: ${JSON.stringify(story.age)},`,
        `    duration: ${JSON.stringify(story.duration)},`,
        `    quote: [\n${story.quote.map((p) => `      ${JSON.stringify(p)},`).join('\n')}\n    ],`,
      ].filter(Boolean);
      return `  {\n${fields.join('\n')}\n  },`;
    })
    .join('\n');

  const file = `/**
 * Patient transformation stories.
 *
 * GENERATED by scripts/extract-transformations.ts from the current site's
 * /metamorfozy/ and /metamorfozy-cd/ pages. Re-run the script rather than
 * editing figures by hand; free prose (intro copy) lives in the page component.
 *
 * Note: /metamorfozy-cd/ is orphaned on the old site — nothing links to it — so
 * eleven of these fifteen stories are currently invisible to visitors.
 *
 * Photos are NOT included. The source page asserts copyright over them and we
 * still need written patient consent before republishing any before/after pair.
 */

export interface Transformation {
  slug: string;
  name: string;
  /** Kilograms lost. */
  lossKg: number;
  /** Same figure formatted for Polish display, e.g. "15,5". */
  lossLabel: string;
  startWeight?: string;
  endWeight?: string;
  /** Used where the source reports burned fat instead of a start/end weight. */
  fatBurned?: string;
  age: string;
  duration: string;
  /** The testimonial, one entry per paragraph. */
  quote: string[];
}

export const transformations: Transformation[] = [
${body}
];

export function getTransformation(slug: string): Transformation | undefined {
  return transformations.find((story) => story.slug === slug);
}
`;

  writeFileSync('src/content/transformations.ts', file);
  console.log(`\nwrote src/content/transformations.ts — ${all.length} stories`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
