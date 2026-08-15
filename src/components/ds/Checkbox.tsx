'use client';

import { useId } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import styles from './Field.module.css';

export interface CheckboxProps extends Omit<ComponentProps<'input'>, 'id' | 'className' | 'type'> {
  /** Accepts nodes so a consent label can carry a link to the privacy policy. */
  label: ReactNode;
  error?: string;
}

export function Checkbox({ label, error, required, ...props }: CheckboxProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <div className={styles.checkboxField}>
        <input
          {...props}
          type="checkbox"
          id={id}
          required={required}
          className={styles.checkbox}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
        />
        <label className={styles.checkboxLabel} htmlFor={id}>
          {label}
        </label>
      </div>
      {error && (
        <span className={`${styles.error} ${styles.checkboxError}`} id={errorId}>
          {error}
        </span>
      )}
    </div>
  );
}
