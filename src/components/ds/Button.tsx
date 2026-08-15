import Link from 'next/link';
import type { ComponentProps, CSSProperties, ReactNode } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'plum';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children: ReactNode;
  /** primary = solid CTA (green-700), secondary = outlined, ghost = text-only, plum = treatment line. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Render as a link instead of a button. Internal hrefs route through next/link. */
  href?: string;
  disabled?: boolean;
  /** Inverts the secondary variant for use on dark surfaces. */
  onDark?: boolean;
  type?: ComponentProps<'button'>['type'];
  className?: string;
  style?: CSSProperties;
}

function classNames(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  disabled,
  onDark,
  type = 'button',
  className,
  style,
}: ButtonProps) {
  const classes = classNames(
    styles.button,
    styles[size],
    styles[variant],
    onDark && styles.onDark,
    className,
  );

  if (href) {
    const isInternal = href.startsWith('/') || href.startsWith('#');

    // A disabled link is not a thing in HTML; expose it to AT and drop the href.
    if (disabled) {
      return (
        <span className={classes} style={style} aria-disabled="true">
          {children}
        </span>
      );
    }

    if (isInternal) {
      return (
        <Link href={href} className={classes} style={style}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} style={style} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} style={style} disabled={disabled}>
      {children}
    </button>
  );
}
