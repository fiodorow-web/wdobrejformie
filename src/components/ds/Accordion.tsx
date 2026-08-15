'use client';

import { useId, useState } from 'react';
import type { ReactNode } from 'react';
import styles from './Accordion.module.css';

export interface AccordionItem {
  /** Question / trigger label. */
  q: string;
  /** Answer. Accepts nodes so an answer can carry a list or a link. */
  a: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  /** Index open on first render; pass -1 to start fully collapsed. */
  defaultOpen?: number;
  /** Heading level the triggers should sit at, for a correct document outline. */
  headingLevel?: 2 | 3 | 4;
}

export function Accordion({ items, defaultOpen = 0, headingLevel = 3 }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();
  const Heading = `h${headingLevel}` as 'h2' | 'h3' | 'h4';

  return (
    <ul className={styles.list}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <li key={item.q} className={styles.item}>
            <Heading className={styles.heading}>
              <button
                type="button"
                id={triggerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                {item.q}
                <span className={`${styles.glyph} ${isOpen ? styles.glyphOpen : ''}`} aria-hidden="true">
                  +
                </span>
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={styles.panel}
              hidden={!isOpen}
            >
              {item.a}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
