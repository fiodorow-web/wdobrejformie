import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

export type EyebrowTone = 'dark' | 'light' | 'plum' | 'plum-light';

export interface EyebrowProps {
  children: ReactNode;
  /** dark/light = green line, plum/plum-light = treatment line. */
  tone?: EyebrowTone;
}

const toneClass: Record<EyebrowTone, string | undefined> = {
  dark: undefined,
  light: styles.light,
  plum: styles.plum,
  'plum-light': styles.plumLight,
};

/**
 * Uppercase micro-label above a section heading. Defined inline in the
 * prototype's App.jsx rather than in components/ — promoted to a real primitive
 * here because every screen uses it.
 */
export function Eyebrow({ children, tone = 'dark' }: EyebrowProps) {
  return <div className={[styles.eyebrow, toneClass[tone]].filter(Boolean).join(' ')}>{children}</div>;
}
