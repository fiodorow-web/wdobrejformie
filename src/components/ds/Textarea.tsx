'use client';

import { useId } from 'react';
import type { ComponentProps } from 'react';
import styles from './Field.module.css';

export interface TextareaProps extends Omit<ComponentProps<'textarea'>, 'id' | 'className'> {
  label: string;
  error?: string;
  hint?: string;
}

/**
 * Not part of the design-system export — the prototype's contact screen dropped
 * a raw <textarea> inline. Added here so the message field matches Input.
 */
export function Textarea({ label, error, hint, required, rows = 5, ...props }: TextareaProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {' *'}
          </span>
        )}
      </label>
      {hint && (
        <span className={styles.hint} id={hintId}>
          {hint}
        </span>
      )}
      <textarea
        {...props}
        id={id}
        rows={rows}
        required={required}
        className={`${styles.control} ${styles.textarea}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={[error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined}
      />
      {error && (
        <span className={styles.error} id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
