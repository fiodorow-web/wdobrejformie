import type { CSSProperties, ReactNode } from 'react';
import styles from './Badge.module.css';

/**
 * Tones are taken from the component source and _adherence.oxlintrc.json, not
 * from Badge.prompt.md — that doc is stale and omits the two plum tones.
 */
export type BadgeTone = 'accent' | 'dark' | 'outline' | 'plum' | 'plum-tint' | 'gold';

export interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
  style?: CSSProperties;
}

const toneClass: Record<BadgeTone, string> = {
  accent: styles.accent,
  dark: styles.dark,
  outline: styles.outline,
  plum: styles.plum,
  'plum-tint': styles.plumTint,
  gold: styles.gold,
};

export function Badge({ children, tone = 'accent', className, style }: BadgeProps) {
  return (
    <span className={[styles.badge, toneClass[tone], className].filter(Boolean).join(' ')} style={style}>
      {children}
    </span>
  );
}
