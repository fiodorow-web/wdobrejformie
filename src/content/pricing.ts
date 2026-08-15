/**
 * Price list.
 *
 * Every figure is transcribed from the live site's own pages, captured
 * 2026-08-13 (research/pdf_text.json: cennik-zdrowe.pdf, cennik-schorzenia.pdf,
 * modelowanie-sylwetki.pdf). The design-system prototype only carried a 6-item
 * sample of the treatment list — this is the complete set.
 *
 * When a price changes, change it here: /cennik, the seven treatment pages and
 * the Offer JSON-LD all read from this module.
 */

export interface PriceRow {
  name: string;
  description?: string;
  price: number | string;
  unit?: string;
  /** Highlights the row as the usual starting point. */
  featured?: boolean;
  note?: string;
}

export interface PricePackage {
  name: string;
  price: string;
  summary: string;
  includes: string[];
}

export interface PriceGroup {
  id: string;
  label: string;
  heading: string;
  intro: string;
  /** Which service line — drives the green/plum accent. */
  line: 'dietetyka' | 'zabiegi';
  items: PriceRow[];
  packages?: PricePackage[];
  /** Series pricing, used by the treatment group. */
  series?: Array<{ name: string; rows: PriceRow[] }>;
  footnotes: string[];
}

const paymentNote = 'Płatności w gabinecie gotówką, przelewem lub BLIKiem.';

export const osobyZdrowe: PriceGroup = {
  id: 'osoby-zdrowe',
  label: 'Osoby zdrowe',
  heading: 'Odchudzanie osób zdrowych',
  intro:
    'Podstawowa ścieżka współpracy: badanie składu ciała, konsultacja wstępna, a potem jadłospis dopasowany do Twoich preferencji i trybu życia.',
  line: 'dietetyka',
  items: [
    {
      name: 'Badanie składu ciała',
      description:
        'Metoda bioimpedancji elektrycznej (BIA) na profesjonalnym analizatorze. Wymaga przygotowania — zasady znajdziesz w zakładce Przygotowanie do wizyty.',
      price: 50,
    },
    {
      name: 'Konsultacja wstępna z badaniem składu ciała',
      description:
        'Badanie składu ciała i wywiad żywieniowo-zdrowotny. Ustalamy cel i metody dalszej współpracy. Wizyta trwa 45–60 minut.',
      price: 180,
      featured: true,
    },
    {
      name: 'Konsultacja kontrolna z badaniem składu ciała',
      description:
        'Wizyta motywująco-edukacyjna z ponownym badaniem. Omawiamy bieżące trudności i wspólnie modyfikujemy jadłospis. 30 minut.',
      price: 120,
    },
    {
      name: 'Jadłospis spersonalizowany',
      description:
        '7-dniowy jadłospis z gramaturą, przepisami, listą zakupów na cały tydzień i planem na lodówkę. Do zastosowania 2–3-krotnie, do czasu konsultacji kontrolnej.',
      price: 160,
    },
    {
      name: 'Plan stabilizacji i zalecenia',
      description:
        'Indywidualny plan na 3–4 tygodnie po zakończonym odchudzaniu, z przykładowymi posiłkami i Zaleceniami Zdrowego Żywienia.',
      price: 100,
    },
  ],
  packages: [
    {
      name: 'Pakiet podstawowy',
      price: '460 zł',
      summary: '6 tygodni indywidualnej opieki.',
      includes: [
        '2 konsultacje z badaniem składu ciała co 2–3 tygodnie',
        '2 jadłospisy personalizowane',
        'nielimitowane konsultacje on-line',
      ],
    },
    {
      name: '3 miesiące odchudzania',
      price: 'po 330 zł / miesiąc',
      summary: '12 tygodni indywidualnej opieki dietetycznej.',
      includes: [
        'regularne konsultacje z badaniem składu ciała co 2–3 tygodnie',
        'jadłospisy na cały okres współpracy',
        'plan stabilizacji wagi po zakończonym odchudzaniu',
        'nielimitowane konsultacje on-line',
      ],
    },
  ],
  footnotes: [
    'Pakiet możesz wybrać w trakcie pierwszej wizyty kontrolnej — nie musisz decydować się od razu.',
    paymentNote,
  ],
};

/** Conditions the personalised menu is prepared for, quoted from the source page. */
export const schorzenia = [
  'podwyższony poziom cukru',
  'stan przedcukrzycowy',
  'insulinooporność',
  'cukrzyca typu II',
  'nadciśnienie tętnicze',
  'SIBO (zaparcia, wzdęcia)',
  'niedoczynność tarczycy',
  'Hashimoto',
  'nadczynność tarczycy',
  'dna moczanowa',
  'niedożywienie',
] as const;

export const dietyEliminacyjne = [
  'bezglutenowa',
  'bez laktozy',
  'wegetariańska',
  'bez warzyw/owoców',
  'praca zmianowa',
  'wcześniejsze odchudzanie',
] as const;

export const osobyZeSchorzeniami: PriceGroup = {
  id: 'osoby-ze-schorzeniami',
  label: 'Osoby ze schorzeniami',
  heading: 'Oferta dla osób ze schorzeniami',
  intro:
    'Ta sama ścieżka, ale wywiad i jadłospis uwzględniają Twoje schorzenie lub dietę eliminacyjną. Weź ze sobą aktualne wyniki badań.',
  line: 'dietetyka',
  items: [
    {
      name: 'Badanie składu ciała',
      description:
        'Metoda bioimpedancji elektrycznej (BIA) na profesjonalnym analizatorze. Wymaga przygotowania.',
      price: 50,
    },
    {
      name: 'Konsultacja wstępna z badaniem składu ciała',
      description:
        'Badanie i wywiad żywieniowo-zdrowotny prowadzony pod kątem schorzenia. Wizyta trwa 45–60 minut.',
      price: 180,
      featured: true,
    },
    {
      name: 'Dodatkowe materiały edukacyjne z wizyty',
      description: 'Wskazówki żywieniowe z konsultacji, do dokupienia opcjonalnie.',
      price: 50,
    },
    {
      name: 'Konsultacja kontrolna z badaniem składu ciała',
      description:
        'Wizyta motywująco-edukacyjna z ponownym badaniem i dopasowaniem jadłospisu. 30 minut.',
      price: 120,
    },
    {
      name: 'Jadłospis spersonalizowany',
      description:
        '7-dniowy jadłospis pod konkretne schorzenie lub dietę eliminacyjną, z listą zakupów i dokładnymi wyliczeniami. Maksymalnie 2 schorzenia lub eliminacje.',
      price: 200,
    },
    {
      name: 'Plan stabilizacji i zalecenia',
      description:
        'Indywidualny plan na 3–4 tygodnie po zakończonym odchudzaniu, z przykładowymi posiłkami.',
      price: 100,
    },
  ],
  packages: [
    {
      name: 'Pakiet podstawowy',
      price: '540 zł',
      summary: '6 tygodni indywidualnej opieki dietetycznej — 4 usługi.',
      includes: [
        '2 konsultacje z badaniem składu ciała co 2–3 tygodnie',
        '2 jadłospisy personalizowane',
        'nielimitowane konsultacje on-line',
      ],
    },
    {
      name: '3 miesiące odchudzania',
      price: 'po 400 zł / miesiąc',
      summary: '12 tygodni indywidualnej opieki dietetycznej.',
      includes: [
        'regularne konsultacje z badaniem składu ciała co 2–3 tygodnie',
        'jadłospisy na cały okres współpracy',
        'plan stabilizacji wagi po zakończonym odchudzaniu',
        'nielimitowane konsultacje on-line',
      ],
    },
  ],
  footnotes: [
    'Przy więcej niż 2 schorzeniach lub eliminacjach cena jadłospisu jest wyższa i ustalamy ją indywidualnie podczas konsultacji.',
    'Pakiet możesz wybrać w trakcie pierwszej wizyty kontrolnej.',
    paymentNote,
  ],
};

export const modelowanieSylwetki: PriceGroup = {
  id: 'modelowanie-sylwetki',
  label: 'Modelowanie sylwetki',
  heading: 'Strefa zabiegowa',
  intro:
    'Zabiegi wykonujemy pojedynczo lub w seriach — seria zawsze wychodzi taniej. Ceny dotyczą jednej partii ciała lub jednego przyłożenia głowicy.',
  line: 'zabiegi',
  items: [
    { name: 'Lipolaser', description: 'Sesja 30 minut.', price: 140, featured: true },
    {
      name: 'Liposukcja kawitacyjna — uda, brzuch z boczkami lub plecy',
      description: '1 partia, 30 minut.',
      price: 240,
    },
    {
      name: 'Liposukcja kawitacyjna — ramiona lub łydki',
      description: '1 partia, 30 minut.',
      price: 150,
    },
    {
      name: 'Fale radiowe RF — uda, brzuch z boczkami lub plecy',
      description: '1 partia, 30 minut.',
      price: 240,
    },
    { name: 'Fale radiowe RF — ramiona lub łydki', description: '1 partia, 30 minut.', price: 150 },
    {
      name: 'Fale radiowe RF — twarz i podbródek',
      description: 'Z ampułką liftingującą.',
      price: 180,
    },
    {
      name: 'Fale radiowe RF — twarz, szyja i dekolt',
      description: 'Z ampułką liftingującą.',
      price: 180,
    },
    {
      name: 'Kriolipoliza',
      description: '1 przyłożenie głowicy, 30 minut.',
      price: 240,
    },
    { name: 'Endomasaż SLIMROLL X', description: 'Sesja 50 minut.', price: 280 },
    { name: 'Masaż Kobido', description: 'Sesja 45–60 minut.', price: 199 },
    { name: 'Oczyszczanie wodorowe', description: 'Sesja 60 minut.', price: 220 },
  ],
  series: [
    {
      name: 'Lipolaser',
      rows: [{ name: 'Seria 8 zabiegów i więcej', price: 80, note: 'za 1 zabieg' }],
    },
    {
      name: 'Liposukcja kawitacyjna',
      rows: [
        { name: 'Seria 4–5 zabiegów', price: 140, note: 'za 1 zabieg' },
        { name: 'Seria 6–7 zabiegów', price: 120, note: 'za 1 zabieg' },
        { name: 'Seria 8 zabiegów i więcej', price: 100, note: 'za 1 zabieg' },
      ],
    },
    {
      name: 'Fale radiowe RF',
      rows: [
        { name: 'Seria 4–5 zabiegów', price: 140, note: 'za 1 zabieg' },
        { name: 'Seria 6–7 zabiegów', price: 120, note: 'za 1 zabieg' },
        { name: 'Seria 8 zabiegów i więcej', price: 100, note: 'za 1 zabieg' },
      ],
    },
    {
      name: 'Kriolipoliza',
      rows: [
        {
          name: 'Seria 3 zabiegów',
          description: '3 przyłożenia głowicy po 30 minut.',
          price: 480,
          note: 'za serię',
        },
        { name: 'Seria 6 zabiegów', price: 900, note: 'za serię' },
      ],
    },
    {
      name: 'Endomasaż SLIMROLL X',
      rows: [
        { name: 'Pakiet 5 zabiegów', price: 1250, note: 'kombinezon gratis' },
        { name: 'Pakiet 10 zabiegów', price: 2400, note: 'kombinezon gratis' },
        { name: 'Pakiet 15 zabiegów', price: 3000, note: 'kombinezon gratis' },
      ],
    },
    {
      name: 'Masaż Kobido',
      rows: [{ name: 'Seria 3 zabiegów', price: 160, note: 'za 1 zabieg' }],
    },
    {
      name: 'Oczyszczanie wodorowe',
      rows: [{ name: 'Seria 3 zabiegów', price: 180, note: 'za 1 zabieg' }],
    },
  ],
  footnotes: [
    'Płatności za pojedyncze zabiegi realizowane są w całości w dniu zabiegu. Płatności za serie mogą być rozłożone na raty.',
    'Przy płatności za serię z góry otrzymujesz za darmo profesjonalny krem wzmacniający efekt zabiegów albo butelkę motywacyjną.',
    paymentNote,
  ],
};

export const priceGroups: PriceGroup[] = [osobyZdrowe, osobyZeSchorzeniami, modelowanieSylwetki];
