import type { CSSProperties } from 'react';
import styles from './StatBadge.module.css';

export interface StatBadgeProps {
  value: string;
  label: string;
  plum?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function StatBadge({ value, label, plum, className, style }: StatBadgeProps) {
  return (
    <div
      className={[styles.stat, plum && styles.plum, className].filter(Boolean).join(' ')}
      style={style}
    >
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
