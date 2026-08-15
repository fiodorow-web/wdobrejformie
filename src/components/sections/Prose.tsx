import { Check } from 'lucide-react';
import type { ReactNode } from 'react';
import { Eyebrow, Reveal } from '@/components/ds';
import type { EyebrowTone } from '@/components/ds';
import styles from './Prose.module.css';

/**
 * Every section on the site opens with one of these, so the reveal lives here
 * rather than being re-wrapped at each of the ~40 call sites. Reveal no-ops
 * above the fold and under prefers-reduced-motion, so the section heads that
 * are already on screen when the page loads stay put.
 */
export function SectionHead({
  eyebrow,
  eyebrowTone,
  title,
  lead,
  onDark,
  headingId,
}: {
  eyebrow?: string;
  eyebrowTone?: EyebrowTone;
  title: string;
  lead?: string;
  onDark?: boolean;
  headingId?: string;
}) {
  return (
    <Reveal>
      <div className={`${styles.sectionHead} ${onDark ? styles.onDark : ''}`}>
        {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
        <h2 className={styles.h2} id={headingId}>
          {title}
        </h2>
        {lead && <p className={styles.lead}>{lead}</p>}
      </div>
    </Reveal>
  );
}

export function PageHeader({
  eyebrow,
  eyebrowTone,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  eyebrowTone?: EyebrowTone;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className={`container ${styles.pageHeader}`}>
      {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
      <h1 className={styles.pageTitle}>{title}</h1>
      {lead && <p className={styles.pageLead}>{lead}</p>}
      {children}
    </header>
  );
}

export function Body({ paragraphs }: { paragraphs: readonly string[] }) {
  return (
    <div className={styles.body}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  );
}

export function CheckList({ items, plum }: { items: readonly string[]; plum?: boolean }) {
  return (
    <ul className={`${styles.checkList} ${plum ? styles.plumList : ''}`}>
      {items.map((item) => (
        <li key={item}>
          <Check size={18} strokeWidth={2} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export const prose = styles;
