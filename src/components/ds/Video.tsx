'use client';

import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import styles from './Video.module.css';

export interface VideoProps {
  /**
   * Basename under /public/video, without extension. The component expects
   * `<src>.webm`, `<src>.mp4` and `<src>-poster.webp` to exist there.
   */
  src: string;
  /**
   * Describes the footage for screen readers and for anyone whose connection
   * drops the file. These clips carry information (which device, on which body
   * part), so they are content — not decoration.
   */
  label: string;
  /**
   * CSS aspect-ratio. The gabinet clips are all filmed vertically. Pass null to
   * leave the shape to `className` (e.g. a different ratio per breakpoint).
   */
  ratio?: string | null;
  /**
   * "cover" fills the frame and crops; "contain" shows the whole clip and fills
   * the space beside it with a blurred copy of its poster — for an upright clip
   * in a wider frame, where cropping would cut away most of the picture.
   */
  fit?: 'cover' | 'contain';
  className?: string;
  style?: CSSProperties;
}

/** Load the sources once the frame is within this much of the viewport. */
/* eslint-disable-next-line no-restricted-syntax -- an IntersectionObserver margin, not a style value */
const ROOT_MARGIN = '200px';

/**
 * Silent looping clip from the gabinet.
 *
 * Autoplay only happens muted — every browser blocks it otherwise — and it is
 * suppressed entirely under prefers-reduced-motion, where the visitor gets a
 * normal video with controls instead. That matches how HeroSlider treats its
 * own animation, and WCAG 2.2.2 asks for it: motion that starts by itself and
 * runs longer than five seconds has to be stoppable.
 *
 * The <source> elements are withheld until the frame nears the viewport, so a
 * 1 MB clip on a page nobody scrolls to is never fetched.
 */
export function Video({ src, label, ratio = '9/16', fit = 'cover', className, style }: VideoProps) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  // A ref callback rather than an effect: it runs when the node actually
  // mounts, and may legitimately set state on the way.
  const observe = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;

    // No IntersectionObserver (old Safari, test environments) — just load it.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: ROOT_MARGIN },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const autoplay = !reducedMotion;

  return (
    <div
      ref={observe}
      className={[styles.frame, fit === 'contain' && styles.contain, className]
        .filter(Boolean)
        .join(' ')}
      style={{ ...(ratio ? { aspectRatio: ratio } : null), ...style }}
    >
      {fit === 'contain' && (
        // Decorative fill beside the clip; the poster is already a small webp.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={`/video/${src}-poster.webp`} alt="" aria-hidden="true" className={styles.backdrop} />
      )}
      <video
        className={styles.video}
        poster={`/video/${src}-poster.webp`}
        aria-label={label}
        muted={autoplay}
        autoPlay={autoplay}
        loop={autoplay}
        controls={!autoplay}
        playsInline
        preload="none"
      >
        {visible && (
          <>
            <source src={`/video/${src}.webm`} type="video/webm" />
            <source src={`/video/${src}.mp4`} type="video/mp4" />
          </>
        )}
        {label}
      </video>
    </div>
  );
}
