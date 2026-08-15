import { Play } from 'lucide-react';
import type { CSSProperties } from 'react';
import styles from './VideoSlot.module.css';

export interface VideoSlotProps {
  label: string;
  ratio?: string;
  /** Plum marks treatment footage; green is the default dietetics tone. */
  plum?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Marks where treatment films will go. Deliberately NOT interactive — there is
 * nothing to play yet, and a fake play button that does nothing is worse than an
 * honest placeholder. Swap for a real <video poster> once the client sends files.
 */
export function VideoSlot({ label, ratio = '16/9', plum, className, style }: VideoSlotProps) {
  return (
    <div
      className={[styles.frame, plum && styles.plum, className].filter(Boolean).join(' ')}
      style={{ aspectRatio: ratio, ...style }}
    >
      <div className={styles.inner}>
        <div className={styles.play} aria-hidden="true">
          <Play size={22} strokeWidth={1.5} fill="currentColor" />
        </div>
        <p className={styles.label}>{label}</p>
      </div>
    </div>
  );
}
