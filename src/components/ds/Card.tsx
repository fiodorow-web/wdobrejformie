import type { CSSProperties, ElementType, ReactNode } from 'react';
import styles from './Card.module.css';

export type CardVariant = 'default' | 'elevated' | 'tint' | 'plum-tint' | 'dark';

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  /** Render as <article>, <li>, … when the surrounding markup calls for it. */
  as?: ElementType;
  /** Anchor target, so a card can be deep-linked. */
  id?: string;
  className?: string;
  style?: CSSProperties;
}

const variantClass: Record<CardVariant, string> = {
  default: styles.default,
  elevated: styles.elevated,
  tint: styles.tint,
  'plum-tint': styles.plumTint,
  dark: styles.dark,
};

export function Card({
  children,
  variant = 'default',
  as: Tag = 'div',
  id,
  className,
  style,
}: CardProps) {
  return (
    <Tag
      id={id}
      className={[styles.card, variantClass[variant], className].filter(Boolean).join(' ')}
      style={style}
    >
      {children}
    </Tag>
  );
}
