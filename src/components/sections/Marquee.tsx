import styles from './Marquee.module.css';

/**
 * Slow-scrolling service strip. The list is duplicated so the -50% translate
 * loops seamlessly; the copy is aria-hidden so screen readers hear it once.
 */
export function Marquee({ items }: { items: readonly string[] }) {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.group} aria-hidden={copy === 1 ? 'true' : undefined}>
            {items.map((item) => (
              <span key={item} className={styles.item}>
                <span className={styles.dot} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
