import styles from './TestimonialCard.module.css';

export interface TestimonialCardProps {
  name: string;
  quote: string;
  /** Headline result, e.g. "-19 kg". */
  stat?: string;
}

/**
 * Uses <figure>/<blockquote>/<figcaption> rather than the prototype's stack of
 * divs, so the quote and its attribution are actually related in the a11y tree.
 * Polish typographic quotes („ ") are part of the brand voice.
 */
export function TestimonialCard({ name, quote, stat }: TestimonialCardProps) {
  return (
    <figure className={styles.card}>
      {stat && <div className={styles.stat}>{stat}</div>}
      <blockquote className={styles.quote}>„{quote}”</blockquote>
      <figcaption className={styles.author}>— {name}</figcaption>
    </figure>
  );
}
