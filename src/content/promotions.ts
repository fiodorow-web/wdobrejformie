/**
 * Current promotions, transcribed from /promocje/ and the treatment page.
 *
 * The treatment-series offers live on /modelowanie-sylwetki/ on the old site
 * and the dietetics ones on /promocje/ — both belong on one page.
 *
 * The two treatment-series offers (an extra treatment or 25% off a second
 * series; 50% off the cheaper single treatment) were removed in 2026-11 — the
 * client confirmed they no longer run. Only the series price itself stays, and
 * that lives in the price list.
 */

export interface Promotion {
  title: string;
  line: 'dietetyka' | 'zabiegi';
  summary: string;
  details: string[];
  footnote?: string;
}

export const promotions: Promotion[] = [
  {
    title: 'Odchudzanie w parach',
    line: 'dietetyka',
    summary: 'Kiedy zmieniacie nawyki razem, jest łatwiej — i taniej.',
    details: [
      'Konsultacja wstępna 20 zł taniej dla każdej z dwóch osób.',
      '20% zniżki na każdy z dwóch pakietów, jeśli macie zbliżone preferencje i możemy przygotować jeden jadłospis w dwóch wersjach kalorycznych.',
      '20% zniżki na tańszy pakiet, jeśli potrzebne są dwa różne jadłospisy z elementami wspólnymi.',
      '20% taniej na wszystkie wspólne konsultacje.',
    ],
  },
  {
    title: 'Siódme badanie składu ciała gratis',
    line: 'dietetyka',
    summary: 'Jedna analiza kosztuje 50 zł. Siódmy pomiar otrzymujesz od nas za darmo.',
    details: [
      'Zbieramy Twoje pomiary — siódmy jest bezpłatny.',
      'Bezpłatny pomiar otrzymasz również w zamian za napisanie opinii o poradni.',
    ],
  },
  {
    title: 'Im dłużej, tym taniej',
    line: 'dietetyka',
    summary: 'Stały rabat 10% na każdy kolejny pakiet.',
    details: ['Rabat naliczamy automatycznie przy każdym kolejnym wykupionym pakiecie.'],
    footnote: 'Promocja nie łączy się z innymi.',
  },
  {
    title: 'Poleć nas znajomym',
    line: 'dietetyka',
    summary: '50% rabatu na dowolny zabieg na twarz lub ciało.',
    details: [
      'Rabat otrzymujesz, gdy poleconą przez Ciebie osobę zobaczymy w gabinecie.',
      'Do wykorzystania na dowolny zabieg w strefie zabiegowej.',
    ],
  },
];
