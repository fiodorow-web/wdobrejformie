'use client';

import { useId } from 'react';
import type { ComponentProps } from 'react';
import styles from './Field.module.css';

export interface InputProps extends Omit<ComponentProps<'input'>, 'id' | 'className'> {
  label: string;
  /** Validation message. Present = field renders in its error state. */
  error?: string;
  /** Helper text shown under the label. */
  hint?: string;
}

export function Input({ label, error, hint, required, ...props }: InputProps) {
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
      <input
        {...props}
        id={id}
        required={required}
        className={styles.control}
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
