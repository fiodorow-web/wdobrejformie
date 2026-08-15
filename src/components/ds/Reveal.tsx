'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import styles from './Reveal.module.css';

/**
 * How the element arrives.
 *
 * `rise` is the house default. The others exist so that a long page does not
 * repeat one gesture a dozen times: media sliding in from the side it sits on,
 * or a card easing up in scale, keeps the scroll from feeling mechanical.
 */
export type RevealVariant = 'rise' | 'fade' | 'zoom' | 'left' | 'right';

export interface RevealProps {
  children: ReactNode;
  /** Stagger in ms, for sibling reveals. */
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  style?: CSSProperties;
}

/**
 * Scroll reveal: fade plus a short movement, once per element.
 *
 * Driven by classList rather than React state on purpose. The server renders the
 * element visible, so the page is fully readable without JavaScript; the effect
 * then hides only what is still below the fold before animating it in. Nothing
 * above the fold is ever armed, so there is no flash of hidden content.
 */
export function Reveal({ children, delay = 0, variant = 'rise', className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /*
     * No reduced-motion bail-out here. The point of that setting is to stop
     * movement — travel, scaling, parallax — not to blank the page out. The
     * stylesheet drops the transform under the media query and leaves the
     * opacity fade, which is the recommended "reduce, don't remove" treatment
     * and reads as an animation without moving anything.
     */
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    /*
     * Hide instantly, reveal with a transition.
     *
     * The element renders visible and is hidden here, so without this it
     * animates *out* over 520ms on page load. Nobody sees that below the fold,
     * but it is real: axe reads those half-transparent nodes as failing colour
     * contrast, and on a long list page that is a hundred violations. Killing
     * the transition for the one frame that applies .armed makes the hide
     * instantaneous; restoring it leaves the reveal itself animated.
     */
    el.style.transition = 'none';
    el.classList.add(styles.armed);
    void el.offsetHeight;
    el.style.transition = '';

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          el.classList.remove(styles.armed);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.12,
        /*
         * The bottom margin is the trigger line: an element reveals once it is
         * 40px inside the viewport.
         *
         * The huge top margin is what stops elements getting stranded. An
         * observer only reports a *change* in intersection, so a jump that
         * skips an element — an anchor link like /cennik#modelowanie-sylwetki,
         * a restored scroll position, or End — takes it from "below the
         * viewport, not intersecting" straight to "above the viewport, not
         * intersecting". No change, no callback, and the element stays at
         * opacity 0 forever. Extending the root upwards means anything that
         * has been scrolled past still counts as intersecting, so those jumps
         * fire the callback and the content appears.
         */
        // eslint-disable-next-line no-restricted-syntax -- IntersectionObserver geometry, not style values
        rootMargin: '9999px 0px -40px 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[styles.reveal, styles[variant], className].filter(Boolean).join(' ')}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </div>
  );
}
