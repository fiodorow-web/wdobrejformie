'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { StaticImageData } from 'next/image';
import { Pause, Play } from 'lucide-react';
import { Button } from './Button';
import styles from './HeroSlider.module.css';

export interface HeroSlide {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: StaticImageData;
  /** Alt text for the photo. Purely decorative slides can pass ''. */
  imageAlt?: string;
  /**
   * What the crop must keep, as an `object-position` pair.
   *
   * The hero fills the screen at whatever shape the window is, so something
   * always gets trimmed, and the default centre crop is a coin toss over
   * whether it is the part that mattered. Each half of the pair does its work
   * in a different window shape: the X half decides the phone crop, where a
   * portrait screen shows barely 40% of a landscape frame's width, and the Y
   * half decides the desktop crop, where a wide window trims top and bottom.
   * Keep Y low on any frame with a face in it — that takes the trim off the
   * floor rather than off someone's head.
   */
  focal?: string;
  /** green = dietetyka, plum = strefa zabiegowa. */
  accent?: 'green' | 'plum';
}

export interface HeroSliderProps {
  slides: HeroSlide[];
  /**
   * Autoplay dwell time in ms.
   *
   * 5s by client decision. Worth knowing when tuning it: the staggered copy
   * finishes arriving at ~1.2s, so a 5s dwell leaves under 4s to read a
   * subtitle of ~20 Polish words — brisk. Anyone who needs longer can stop it
   * with the pause button, and the rails show what is coming.
   */
  interval?: number;
}

export function HeroSlider({ slides, interval = 5000 }: HeroSliderProps) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const count = slides.length;

  // Hover/focus covers mouse and keyboard; the explicit button is what gives
  // touch visitors a way to stop it, which WCAG 2.2.2 requires and hovering
  // cannot provide.
  const paused = hovered || userPaused;

  useEffect(() => {
    /*
     * Reduced motion does not stop the slides — under that setting the
     * stylesheet turns the transition into a plain crossfade with no Ken
     * Burns and no sliding text, and a crossfade has no motion vector to
     * trigger anything. What WCAG 2.2.2 actually asks for is a way to stop
     * auto-updating content, which is the pause button below.
     */
    if (count < 2 || paused) return;
    timer.current = setTimeout(() => setIndex((current) => (current + 1) % count), interval);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paused, count, interval]);

  const goTo = (next: number) => {
    if (timer.current) clearTimeout(timer.current);
    setIndex(((next % count) + count) % count);
  };

  return (
    <section
      className={styles.hero}
      aria-roledescription="carousel"
      aria-label="Wyróżnione usługi"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
      // Drives the Ken Burns push, so the image travels for exactly as long as
      // the slide is up instead of being cut off part-way.
      style={{ ['--slide-duration' as string]: `${interval}ms` }}
    >
      {slides.map((slide, i) => {
        const active = i === index;
        return (
          <div
            key={slide.title}
            className={`${styles.slide} ${active ? styles.slideActive : ''}`}
            role="group"
            aria-roledescription="slajd"
            aria-label={`${i + 1} z ${count}`}
            aria-hidden={!active}
            inert={!active}
          >
            {slide.image && (
              <div className={styles.photo}>
                <Image
                  src={slide.image}
                  alt={slide.imageAlt ?? ''}
                  fill
                  sizes="100vw"
                  /*
                   * `priority` is deprecated as of Next 16; the docs point at
                   * loading/fetchPriority as the clearer pair. Only the first
                   * slide is the LCP candidate — the rest have five seconds
                   * before anyone sees them.
                   */
                  loading={i === 0 ? 'eager' : 'lazy'}
                  fetchPriority={i === 0 ? 'high' : undefined}
                  placeholder="blur"
                  quality={82}
                  className={styles.image}
                  style={{ ['--focal' as string]: slide.focal }}
                />
              </div>
            )}
            <div className={styles.scrim} />
            <div className={styles.content}>
              <div className={`container ${styles.copy}`}>
                {slide.eyebrow && (
                  <span
                    className={`${styles.eyebrow} ${slide.accent === 'plum' ? styles.eyebrowPlum : ''}`}
                  >
                    {slide.eyebrow}
                  </span>
                )}
                {/*
                  Slide titles are H2s, not H1s. A carousel has as many titles
                  as slides, and a page may only have one H1 — the page's own
                  H1 is rendered (visually hidden) by the page above the slider.
                */}
                <h2 className={styles.title}>{slide.title}</h2>
                {slide.subtitle && <p className={styles.subtitle}>{slide.subtitle}</p>}
                {slide.ctaLabel && slide.ctaHref && (
                  <Button
                    href={slide.ctaHref}
                    size="lg"
                    variant={slide.accent === 'plum' ? 'plum' : 'primary'}
                  >
                    {slide.ctaLabel}
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {count > 1 && (
        <div className={styles.rails}>
          <div className={`container ${styles.railsInner}`}>
            {slides.map((slide, i) => (
              <button
                key={slide.title}
                type="button"
                className={`${styles.rail} ${i === index ? styles.railActive : ''}`}
                aria-label={`Slajd ${i + 1}: ${slide.title}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => goTo(i)}
              >
                {i === index && (
                  <span
                    key={`${index}-${paused}`}
                    className={`${styles.railFill} ${paused ? styles.railFillPaused : ''}`}
                    style={{ ['--rail-duration' as string]: `${interval}ms` }}
                  />
                )}
              </button>
            ))}
            <button
              type="button"
              className={styles.playPause}
              onClick={() => setUserPaused((value) => !value)}
              aria-label={
                userPaused
                  ? 'Wznów automatyczne przewijanie slajdów'
                  : 'Zatrzymaj automatyczne przewijanie slajdów'
              }
            >
              {userPaused ? (
                <Play size={13} strokeWidth={2} fill="currentColor" aria-hidden="true" />
              ) : (
                <Pause size={13} strokeWidth={2} fill="currentColor" aria-hidden="true" />
              )}
            </button>

            <span className={styles.counter}>
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
