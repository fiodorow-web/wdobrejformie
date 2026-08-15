import styles from './PricingItem.module.css';

export interface PricingItemProps {
  name: string;
  description?: string;
  /** Numeric price, or a string for ranges like "od 140". */
  price: number | string;
  unit?: string;
  /** Highlights the price in the accent colour. */
  featured?: boolean;
  /** Uses the plum accent instead of green — for the treatment line. */
  plum?: boolean;
  /** Small qualifier under the price, e.g. "za 1 zabieg w serii". */
  note?: string;
}

export function PricingItem({
  name,
  description,
  price,
  unit = 'zł',
  featured,
  plum,
  note,
}: PricingItemProps) {
  const priceClasses = [
    styles.price,
    featured && (plum ? styles.featuredPlum : styles.featured),
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.row}>
      <div>
        <div className={styles.name}>{name}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>
      <div className={priceClasses}>
        {price}
        <span className={styles.unit}> {unit}</span>
        {note && <span className={styles.note}>{note}</span>}
      </div>
    </div>
  );
}
