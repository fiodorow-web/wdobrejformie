/**
 * Current promotions, transcribed from /promocje/ and the treatment page.
 *
 * The treatment-series offers live on /modelowanie-sylwetki/ on the old site
 * and the dietetics ones on /promocje/ — both belong on one page.
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
  {
    title: 'Zakup serii zabiegów',
    line: 'zabiegi',
    summary: 'Seria kupiona w dniu pierwszego zabiegu daje dodatkowy zabieg albo rabat.',
    details: [
      'Jedna seria dowolnych zabiegów — 1 inny niż wykupiony zabieg GRATIS.',
      'Dwie serie zabiegów — 25% rabatu na tańszą z nich.',
      'Przy płatności za serię z góry: profesjonalny krem wzmacniający efekt zabiegów albo butelka motywacyjna za darmo.',
    ],
    footnote: 'Powyższe promocje nie łączą się ze sobą.',
  },
  {
    title: 'Zakup pojedynczych zabiegów',
    line: 'zabiegi',
    summary: '50% rabatu na tańszy zabieg.',
    details: [
      'Jeśli w dniu pierwszego zrealizowanego zabiegu zdecydujesz się na 2 kolejne zabiegi, otrzymasz 50% rabatu na tańszy z nich.',
    ],
  },
];
