'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, LogIn, Menu, X } from 'lucide-react';
import { Button } from './Button';
import type { NavLink } from '@/content/navigation';
import styles from './NavBar.module.css';

export interface NavBarProps {
  links: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  patientZoneUrl?: string;
}

export function NavBar({
  links,
  ctaLabel = 'Zapisz się',
  ctaHref = '/kontakt',
  patientZoneUrl,
}: NavBarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openPanelGroup, setOpenPanelGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const baseId = useId();

  // Any navigation closes everything — otherwise the panel survives the route
  // change. Adjusted during render (React's documented pattern for resetting
  // state when a value changes) rather than in an effect, so there is no extra
  // pass where the old menu is still open.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
    setOpenPanelGroup(null);
  }

  // Escape closes whatever is open; a click outside closes the desktop dropdown.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      setOpenMenu(null);
      setMobileOpen(false);
    }

    function onPointerDown(event: PointerEvent) {
      if (navRef.current?.contains(event.target as Node)) return;
      setOpenMenu(null);
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, []);

  // Lock body scroll behind the mobile panel.
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Nawigacja główna">
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="W Dobrej Formie — strona główna">
          <Image
            src="/logo/logo-full-transparent.png"
            alt="W Dobrej Formie"
            width={420}
            height={212}
            className={styles.logoImage}
            priority
          />
        </Link>

        <ul className={styles.links}>
          {links.map((link) => {
            const menuId = `${baseId}-${link.href}`;
            const hasChildren = Boolean(link.children?.length);
            const expanded = openMenu === link.href;

            if (!hasChildren) {
              return (
                <li key={link.href} className={styles.linkItem}>
                  <Link
                    href={link.href}
                    className={`${styles.link} ${isCurrent(link.href) ? styles.linkActive : ''}`}
                    aria-current={isCurrent(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }

            return (
              <li
                key={link.href}
                className={styles.linkItem}
                onMouseEnter={() => setOpenMenu(link.href)}
                onMouseLeave={() => setOpenMenu((current) => (current === link.href ? null : current))}
              >
                <button
                  type="button"
                  className={`${styles.disclosure} ${isCurrent(link.href) ? styles.linkActive : ''}`}
                  aria-expanded={expanded}
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(expanded ? null : link.href)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowDown') {
                      event.preventDefault();
                      setOpenMenu(link.href);
                    }
                  }}
                >
                  {link.label}
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                    className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
                  />
                </button>
                <ul id={menuId} className={styles.menu} hidden={!expanded}>
                  {link.children?.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href} className={styles.menuLink}>
                        <span className={styles.menuLabel}>{child.label}</span>
                        {child.description && (
                          <span className={styles.menuDescription}>{child.description}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>

        <div className={styles.actions}>
          {patientZoneUrl && (
            <a
              href={patientZoneUrl}
              className={styles.patientZone}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LogIn size={16} strokeWidth={1.5} aria-hidden="true" />
              Strefa Pacjenta
            </a>
          )}
          <Button href={ctaHref} size="sm">
            {ctaLabel}
          </Button>
        </div>

        <button
          type="button"
          className={styles.toggle}
          aria-expanded={mobileOpen}
          aria-controls={`${baseId}-panel`}
          aria-label={mobileOpen ? 'Zamknij menu' : 'Otwórz menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </div>

      <div id={`${baseId}-panel`} className={styles.panel} hidden={!mobileOpen}>
        <div className="container">
          <ul className={styles.panelList}>
            {links.map((link) => {
              const hasChildren = Boolean(link.children?.length);
              const groupId = `${baseId}-group-${link.href}`;
              const expanded = openPanelGroup === link.href;

              if (!hasChildren) {
                return (
                  <li key={link.href}>
                    <Link href={link.href} className={styles.panelLink}>
                      {link.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <button
                    type="button"
                    className={styles.panelDisclosure}
                    aria-expanded={expanded}
                    aria-controls={groupId}
                    onClick={() => setOpenPanelGroup(expanded ? null : link.href)}
                  >
                    {link.label}
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={`${styles.chevron} ${expanded ? styles.chevronOpen : ''}`}
                    />
                  </button>
                  <ul id={groupId} className={styles.panelSubList} hidden={!expanded}>
                    <li>
                      <Link href={link.href} className={styles.panelSubLink}>
                        Przegląd oferty
                      </Link>
                    </li>
                    {link.children?.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} className={styles.panelSubLink}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          <div className={styles.panelActions}>
            <Button href={ctaHref}>{ctaLabel}</Button>
            {patientZoneUrl && (
              <a
                href={patientZoneUrl}
                className={styles.patientZone}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LogIn size={16} strokeWidth={1.5} aria-hidden="true" />
                Strefa Pacjenta
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
