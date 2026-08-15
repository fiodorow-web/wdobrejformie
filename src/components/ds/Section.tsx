import type { ReactNode } from 'react';
import styles from './Section.module.css';

export type SectionTone = 'surface' | 'alt' | 'tint' | 'plum-tint' | 'dark';

export interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  /** Reduced vertical rhythm, for stacked sub-sections. */
  tight?: boolean;
  /** Anchor target, e.g. "osoby-zdrowe". */
  id?: string;
  'aria-labelledby'?: string;
  className?: string;
}

const toneClass: Record<SectionTone, string> = {
  surface: styles.surface,
  alt: styles.alt,
  tint: styles.tint,
  'plum-tint': styles.plumTint,
  dark: styles.dark,
};

export function Section({
  children,
  tone = 'surface',
  tight,
  id,
  className,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={[styles.section, toneClass[tone], tight && styles.tight, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      <div className="container">{children}</div>
    </section>
  );
}
