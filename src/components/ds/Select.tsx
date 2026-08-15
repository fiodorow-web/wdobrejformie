'use client';

import { useId } from 'react';
import type { ComponentProps } from 'react';
import styles from './Field.module.css';

export interface SelectProps extends Omit<ComponentProps<'select'>, 'id' | 'className' | 'children'> {
  label: string;
  options: readonly string[];
  error?: string;
  hint?: string;
}

export function Select({ label, options, error, hint, required, ...props }: SelectProps) {
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
      <select
        {...props}
        id={id}
        required={required}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={[error && errorId, hint && hintId].filter(Boolean).join(' ') || undefined}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <span className={styles.error} id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
