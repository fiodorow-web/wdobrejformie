/**
 * Responsive `sizes` hints for next/image.
 *
 * These describe layout breakpoints to the image pipeline — they are not style
 * values, so the design-system token rule does not apply. Centralising them
 * here keeps the single lint exception in one place and stops the same media
 * query being retyped in every page.
 */

/* eslint-disable no-restricted-syntax -- next/image sizes hints, not style values */

/** Full-bleed media, e.g. the hero. */
export const SIZE_FULL = '100vw';

/** Two-column split at ≥900px. */
export const SIZE_HALF = '(min-width: 900px) 50vw, 100vw';

/** Three-up card grid at ≥960px. */
export const SIZE_THIRD = '(min-width: 960px) 33vw, 100vw';

/** Four-up card grid at ≥960px. */
export const SIZE_QUARTER = '(min-width: 960px) 25vw, 100vw';

/** Fixed-width media column in the transformations list. */
export const SIZE_PORTRAIT = '(min-width: 900px) 320px, 100vw';

/** Images inside article prose — the column is capped at 72ch (~680px). */
export const SIZE_ARTICLE = '(min-width: 720px) 680px, 100vw';
