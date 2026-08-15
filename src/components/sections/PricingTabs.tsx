'use client';

import { useCallback, useRef, useState, useSyncExternalStore } from 'react';
import { Check } from 'lucide-react';
import { Badge, Card, PricingItem } from '@/components/ds';
import type { PriceGroup } from '@/content/pricing';
import { dietyEliminacyjne, schorzenia } from '@/content/pricing';
import styles from './PricingTabs.module.css';

/**
 * Reads the URL fragment as an external store. Deep links like
 * /cennik#modelowanie-sylwetki (used by the nav and the footer) must open the
 * right tab, and the server snapshot keeps hydration stable.
 */
function useHash(): string {
  const subscribe = useCallback((onChange: () => void) => {
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => '',
  );
}

/**
 * Tabs are a filter over content that is *already* in the server HTML — every
 * panel is rendered, and only hidden. That keeps all three price lists
 * indexable (they are the page's whole SEO value) and keeps the deep links
 * /cennik#osoby-zdrowe etc. working without JavaScript.
 */
export function PricingTabs({ groups }: { groups: PriceGroup[] }) {
  const hash = useHash();
  const [selected, setSelected] = useState<string | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // An explicit click wins; otherwise follow the fragment; otherwise first tab.
  const fromHash = groups.find((group) => group.id === hash)?.id;
  const active = selected ?? fromHash ?? groups[0].id;

  const select = (id: string) => {
    setSelected(id);
    // Keep the URL shareable without the scroll jump a hash assignment causes.
    window.history.replaceState(null, '', `#${id}`);
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (index + delta + groups.length) % groups.length;
    select(groups[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <>
      <div className={styles.tabs} role="tablist" aria-label="Grupy cenowe">
        {groups.map((group, index) => {
          const isActive = active === group.id;
          const activeClass = group.line === 'zabiegi' ? styles.tabActivePlum : styles.tabActive;

          return (
            <button
              key={group.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              // The fragment target lives on the tab, so /cennik#osoby-zdrowe both
              // scrolls here and selects the panel.
              id={group.id}
              aria-selected={isActive}
              aria-controls={`panel-${group.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tab} ${isActive ? activeClass : ''}`}
              onClick={() => select(group.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {group.label}
            </button>
          );
        })}
      </div>

      {groups.map((group) => {
        const isPlum = group.line === 'zabiegi';

        return (
          <div
            key={group.id}
            id={`panel-${group.id}`}
            role="tabpanel"
            aria-labelledby={group.id}
            className={styles.panel}
            hidden={active !== group.id}
          >
            <h2 className={styles.subhead} style={{ marginTop: 0 }}>
              {group.heading}
            </h2>
            <p className={styles.groupIntro}>{group.intro}</p>

            <Card variant="elevated" className={`${styles.list} ${isPlum ? styles.listPlum : ''}`}>
              <div className={styles.listInner}>
                {group.items.map((item) => (
                  <PricingItem key={item.name} {...item} plum={isPlum} />
                ))}
              </div>
            </Card>

            {group.packages && (
              <>
                <h3 className={styles.subhead}>Pakiety</h3>
                <div className={styles.packages}>
                  {group.packages.map((pack) => (
                    <Card key={pack.name} variant="tint">
                      <h4 className={styles.packageName}>{pack.name}</h4>
                      <p className={styles.packagePrice}>{pack.price}</p>
                      <p className={styles.packageSummary}>{pack.summary}</p>
                      <ul className={styles.packageList}>
                        {pack.includes.map((entry) => (
                          <li key={entry}>
                            <Check size={16} strokeWidth={2} aria-hidden="true" />
                            <span>{entry}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
                </div>
              </>
            )}

            {group.series && (
              <>
                <h3 className={styles.subhead}>Serie i pakiety zabiegów</h3>
                <div className={styles.series}>
                  {group.series.map((series) => (
                    <Card key={series.name} variant="default" className={styles.seriesGroup}>
                      <h4 className={styles.seriesName}>{series.name}</h4>
                      {series.rows.map((row) => (
                        <PricingItem key={row.name} {...row} plum />
                      ))}
                    </Card>
                  ))}
                </div>
              </>
            )}

            {group.id === 'osoby-ze-schorzeniami' && (
              <div className={styles.conditions}>
                <h3 className={styles.subhead}>Schorzenia, pod które układamy jadłospis</h3>
                <div className={styles.chips}>
                  {schorzenia.map((condition) => (
                    <Badge key={condition} tone="outline">
                      {condition}
                    </Badge>
                  ))}
                </div>
                <h3 className={styles.subhead}>Diety eliminacyjne</h3>
                <div className={styles.chips}>
                  {dietyEliminacyjne.map((diet) => (
                    <Badge key={diet} tone="accent">
                      {diet}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <ul className={styles.footnotes}>
              {group.footnotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </>
  );
}
