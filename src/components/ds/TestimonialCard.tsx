import styles from './TestimonialCard.module.css';

export interface TestimonialCardProps {
  name: string;
  quote: string;
  /** Headline result, e.g. "-19 kg". */
  stat?: string;
  /**
   * False when the text is the poradnia's own description rather than the
   * person's words: it then renders as a plain paragraph, without quote marks
   * and without the attribution dash.
   */
  quoted?: boolean;
}

/**
 * Uses <figure>/<blockquote>/<figcaption> rather than the prototype's stack of
 * divs, so the quote and its attribution are actually related in the a11y tree.
 * Polish typographic quotes („ ") are part of the brand voice.
 */
export function TestimonialCard({ name, quote, stat, quoted = true }: TestimonialCardProps) {
  return (
    <figure className={styles.card}>
      {stat && <div className={styles.stat}>{stat}</div>}
      {quoted ? (
        <blockquote className={styles.quote}>„{quote}”</blockquote>
      ) : (
        <p className={styles.quote}>{quote}</p>
      )}
      <figcaption className={styles.author}>
        {quoted ? '— ' : ''}
        {name}
      </figcaption>
    </figure>
  );
}
