import type { ReactNode } from 'react';
import styles from './ServiceIconCard.module.css';

export interface ServiceIconCardProps {
  /** A lucide-react icon element. The design system forbids emoji as icons. */
  icon: ReactNode;
  title: string;
  description: string;
  /** Switches the icon tile to the treatment-line accent. */
  plum?: boolean;
  /** Heading level, so the card fits its section's outline. */
  headingLevel?: 2 | 3 | 4;
}

export function ServiceIconCard({
  icon,
  title,
  description,
  plum,
  headingLevel = 3,
}: ServiceIconCardProps) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';

  return (
    <div className={[styles.card, plum && styles.plum].filter(Boolean).join(' ')}>
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
      <Heading className={styles.title}>{title}</Heading>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
