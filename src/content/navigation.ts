export interface NavLink {
  label: string;
  href: string;
  /** Short line shown under the label in the desktop dropdown. */
  description?: string;
  children?: NavLink[];
  /** Opens in a new tab — used for the third-party patient panel. */
  external?: boolean;
}

/**
 * Main navigation.
 *
 * Mirrors the two service lines the design system encodes in colour: green for
 * dietetyka, plum for the treatment zone. The current WordPress menu splits the
 * same content across "Poradnia", "Oferta" and "Cennik" in a way that puts
 * Modelowanie sylwetki under two different parents at once.
 */
export const mainNav: NavLink[] = [
  {
    label: 'Oferta',
    href: '/oferta',
    children: [
      {
        label: 'Konsultacje dietetyczne',
        href: '/konsultacje',
        description: 'Współpraca krok po kroku, także przy schorzeniach',
      },
      {
        label: 'Plany żywieniowe',
        href: '/plany-zywieniowe',
        description: 'Indywidualne jadłospisy z listą zakupów',
      },
      {
        label: 'Analiza składu ciała',
        href: '/analiza-skladu-ciala',
        description: 'Badanie BIA — ponad 30 parametrów',
      },
      {
        label: 'Modelowanie sylwetki',
        href: '/modelowanie-sylwetki',
        description: 'Strefa zabiegowa: lipolaser, kawitacja, RF, kriolipoliza',
      },
      {
        label: 'Przygotowanie do wizyty',
        href: '/przygotowanie-do-wizyty',
        description: 'Jak przygotować się do badania',
      },
    ],
  },
  { label: 'Cennik', href: '/cennik' },
  { label: 'Metamorfozy', href: '/metamorfozy' },
  { label: 'Poznajmy się', href: '/poznajmy-sie' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontakt', href: '/kontakt' },
];

export const footerNav: Array<{ heading: string; links: NavLink[] }> = [
  {
    heading: 'Dietetyka',
    links: [
      { label: 'Konsultacje dietetyczne', href: '/konsultacje' },
      { label: 'Plany żywieniowe', href: '/plany-zywieniowe' },
      { label: 'Analiza składu ciała', href: '/analiza-skladu-ciala' },
      { label: 'Przygotowanie do wizyty', href: '/przygotowanie-do-wizyty' },
    ],
  },
  {
    heading: 'Strefa zabiegowa',
    links: [
      { label: 'Modelowanie sylwetki', href: '/modelowanie-sylwetki' },
      { label: 'Cennik zabiegów', href: '/cennik#modelowanie-sylwetki' },
      { label: 'Promocje', href: '/promocje' },
    ],
  },
  {
    heading: 'Poradnia',
    links: [
      { label: 'Poznajmy się', href: '/poznajmy-sie' },
      { label: 'Metamorfozy', href: '/metamorfozy' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
  },
];

export const legalNav: NavLink[] = [
  { label: 'Regulamin', href: '/regulamin' },
  { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
  { label: 'Formularz żywieniowy', href: '/formularz-zywieniowy' },
];
