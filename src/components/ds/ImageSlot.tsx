import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import type { CSSProperties } from 'react';
import type { StaticImageData } from 'next/image';
import styles from './ImageSlot.module.css';

export interface ImageSlotProps {
  /**
   * Caption used as the alt text when a photo exists, and as the placeholder
   * label when it does not. Several photos are still owed by the client, so the
   * labelled-gap state is a first-class state, not an error.
   */
  label: string;
  src?: StaticImageData | string;
  /** CSS aspect-ratio, e.g. "4/3" or "3/4". */
  ratio?: string;
  /** Responsive sizes hint for next/image. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ImageSlot({
  label,
  src,
  ratio = '4/3',
  // eslint-disable-next-line no-restricted-syntax -- a next/image sizes hint, not a style value
  sizes = '(min-width: 900px) 50vw, 100vw',
  priority,
  className,
  style,
}: ImageSlotProps) {
  return (
    <div
      className={[styles.frame, className].filter(Boolean).join(' ')}
      style={{ aspectRatio: ratio, ...style }}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.image}
          placeholder={typeof src === 'string' ? undefined : 'blur'}
        />
      ) : (
        <div className={styles.fallback}>
          <ImageIcon className={styles.fallbackIcon} size={22} strokeWidth={1.5} aria-hidden="true" />
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
