/**
 * The seven treatments in the strefa zabiegowa, one entry per page.
 *
 * On the current site all of this lives on a single scrolling page where seven
 * treatments, their series pricing and their contraindications compete for the
 * same attention. Splitting them gives each one a page people can actually find
 * — "kriolipoliza Węgrów" is a real search, "modelowanie sylwetki" mostly isn't.
 *
 * Descriptions are rewritten from the source page (per the brand's "never 1:1"
 * rule); durations, prices and recommended course lengths are transcribed exactly.
 */

import type { StaticImageData } from 'next/image';

import lipolaserPlytki from '@/assets/photos/lipolaser-plytki-laserowe-na-udach.webp';
import kawitacjaBrzuch from '@/assets/photos/zabieg-modelowania-sylwetki-brzucha.webp';
import glowicaRf from '@/assets/photos/glowica-rf-modelowanie-sylwetki.webp';
import strefaZabiegowa from '@/assets/photos/strefa-zabiegowa-lezanka-i-urzadzenie.webp';
import glowicaRolkowa from '@/assets/photos/glowica-endosferyczna-led-czerwone.webp';

export interface Treatment {
  slug: string;
  name: string;
  /** One-line summary for cards and meta descriptions. */
  tagline: string;
  /**
   * Photo from the gabinet, shown at the top of the treatment's own page.
   * Kobido and oczyszczanie wodorowe are not photographed yet — ImageSlot
   * renders a labelled gap for those.
   */
  photo?: StaticImageData;
  /**
   * Alt text for `photo`. Describes what is in frame rather than repeating the
   * treatment name, which the page's H1 already carries.
   */
  photoAlt?: string;
  /**
   * Basename of a silent clip in /public/video showing this treatment being
   * performed. Where one exists it replaces the still — footage of the actual
   * applicator working answers "what will they do to me" better than a photo.
   */
  video?: string;
  /** Describes the footage. Required whenever `video` is set. */
  videoLabel?: string;
  durationLabel: string;
  /** Entry price of a single visit, in PLN ("od X zł" on the lists for treatments without priceText). */
  priceFrom: number;
  /** Single-visit price as shown in the treatment page's price box. */
  singlePrice: string;
  /**
   * Lowest price of one treatment bought in a series, in PLN — the honest "od"
   * figure (the client's rule), used in the page title Google shows.
   */
  seriesFrom: number;
  /**
   * Single-visit price as the client words it, shown in place of "od X zł"
   * wherever the treatment's price appears. Treatments without one keep "od".
   * The \u200b after the slash lets a narrow card break the line there.
   */
  priceText?: string;
  priceNote?: string;
  /** Paragraphs of body copy. */
  body: string[];
  /** What the treatment addresses — used as a bullet list. */
  benefits: string[];
  /** Recommended course, quoted from the source. */
  course: string;
  /** Series pricing headline, e.g. "od 80 zł za zabieg w serii". */
  seriesHighlight?: string;
  /** Slugs of blog posts that discuss this treatment. Populated after migration. */
  relatedPosts: string[];
}

export const treatments: Treatment[] = [
  {
    slug: 'lipolaser',
    name: 'Lipolaser',
    tagline: 'Bezbolesne modelowanie sylwetki światłem lasera.',
    photo: lipolaserPlytki,
    photoAlt: 'Płytki lipolasera przymocowane pasami do ud pacjentki podczas zabiegu',
    video: 'lipolaser-zabieg',
    videoLabel: 'Płytki lipolasera przymocowane pasami do brzucha pacjentki w trakcie zabiegu',
    durationLabel: '30 minut',
    priceFrom: 140,
    singlePrice: '140 zł',
    seriesFrom: 80,
    priceText: '140 zł/\u200bpojedynczy zabieg (w\u00a0serii taniej)',
    seriesHighlight: 'od 80 zł za zabieg w serii od 8 zabiegów',
    body: [
      'Lipolaser pozwala w szybki, kontrolowany i całkowicie bezbolesny sposób zredukować lokalne nagromadzenie tkanki tłuszczowej i wymodelować sylwetkę.',
      'Jedna sesja zabiegowa trwa 30 minut. Zabieg nie wymaga rekonwalescencji — wracasz do zwykłych zajęć od razu po wyjściu z gabinetu.',
    ],
    benefits: [
      'redukcja lokalnych nagromadzeń tkanki tłuszczowej',
      'modelowanie obrysu sylwetki',
      'zabieg bezbolesny, bez rekonwalescencji',
    ],
    course: 'Zalecamy serię minimum 8 zabiegów, 2 razy w tygodniu — nie częściej niż co drugi dzień.',
    relatedPosts: [],
  },
  {
    slug: 'liposukcja-kawitacyjna',
    name: 'Liposukcja kawitacyjna',
    tagline: 'Ultradźwięki rozbijające komórki tłuszczowe — bez skalpela.',
    photo: kawitacjaBrzuch,
    photoAlt:
      'Mgr Katarzyna Tyszko prowadzi zabieg na brzuchu pacjentki głowicą zabiegową w gabinecie w Węgrowie',
    durationLabel: '30 minut / 1 partia',
    priceFrom: 150,
    singlePrice: '150–240 zł',
    seriesFrom: 100,
    priceText: '240 zł/\u200bpojedynczy zabieg (w\u00a0serii taniej)',
    priceNote: '150 zł za ramiona lub łydki, 240 zł za uda, brzuch z boczkami albo plecy',
    seriesHighlight: 'od 100 zł za zabieg w serii od 8 zabiegów',
    body: [
      'Zabieg redukuje ilość tkanki tłuszczowej i poprawia kondycję skóry dzięki działaniu ultradźwięków o wysokiej częstotliwości.',
      'Ultradźwięki rozbijają komórki tłuszczowe bezinwazyjnie i bezboleśnie — bez nacięć, bez znieczulenia i bez przestoju w codziennych zajęciach.',
    ],
    benefits: [
      'redukcja tkanki tłuszczowej na wybranej partii',
      'poprawa kondycji i gładkości skóry',
      'zabieg bezinwazyjny i bezbolesny',
    ],
    course: 'Zalecamy serię minimum 6 zabiegów, raz w tygodniu.',
    relatedPosts: [
      'liposukcja-kawitacyjna-a-odchudzanie',
      'liposukcja-kawitacyjna-na-cellulit-i-tkanke-tluszczowa',
      'jak-przygotowac-sie-do-liposukcji-kawitacyjnej-i-co-robic-po-zabiegu',
    ],
  },
  {
    slug: 'fale-radiowe-rf',
    name: 'Fale radiowe RF',
    tagline: 'Ujędrnienie zwiotczałej skóry i redukcja cellulitu.',
    photo: glowicaRf,
    photoAlt: 'Wielobiegunowa głowica fal radiowych RF prowadzona po skórze podczas zabiegu',
    durationLabel: '30 minut / 1 partia',
    priceFrom: 150,
    singlePrice: '150–240 zł',
    seriesFrom: 100,
    priceText: 'od 150 do 240 zł/\u200bpojedynczy zabieg (w\u00a0serii taniej)',
    priceNote:
      '150 zł za ramiona lub łydki, 240 zł za uda, brzuch z boczkami albo plecy, 180 zł za partie twarzy z ampułką liftingującą',
    seriesHighlight: 'od 100 zł za zabieg w serii od 8 zabiegów',
    body: [
      'Zabieg regenerujący i poprawiający kondycję skóry. Ujędrnia skórę zwiotczałą i rozciągniętą oraz przyspiesza redukcję cellulitu.',
      'Wykonujemy go specjalną głowicą emitującą fale radiowe wraz z polem magnetycznym. W trakcie zabiegu odczuwasz przyjemne ciepło.',
      'Fale radiowe stosujemy zarówno na ciało, jak i na twarz, szyję i dekolt — w wersji na twarz zabieg kończymy ampułką liftingującą.',
    ],
    benefits: [
      'ujędrnienie zwiotczałej i rozciągniętej skóry',
      'przyspieszenie redukcji cellulitu',
      'stymulacja produkcji kolagenu',
      'wersja na ciało oraz na twarz, szyję i dekolt',
    ],
    course: 'Zalecamy serię minimum 6–8 zabiegów, 1–2 razy w tygodniu.',
    relatedPosts: [
      'fala-radiowa-sekret-jedrnego-ciala-i-wygladzonej-skory',
    ],
  },
  {
    slug: 'kriolipoliza',
    name: 'Kriolipoliza',
    tagline: 'Kontrolowane wymrażanie komórek tłuszczowych.',
    photo: strefaZabiegowa,
    photoAlt:
      'Stanowisko zabiegowe w strefie modelowania sylwetki poradni W Dobrej Formie w Węgrowie',
    video: 'kriolipoliza-zabieg',
    videoLabel:
      'Dwie głowice kriolipolizy z wyświetlaczami przymocowane do brzucha pacjentki w trakcie zabiegu',
    durationLabel: '30 minut / 1 przyłożenie głowicy',
    priceFrom: 300,
    singlePrice: '300 zł',
    // 900 zł for a series of 4.
    seriesFrom: 225,
    priceText: '300 zł/\u200bpojedynczy zabieg (w\u00a0serii taniej)',
    // No-break space keeps each price with its zł when the box wraps.
    seriesHighlight: '500\u00a0zł za 2 zabiegi, 700\u00a0zł za 3 zabiegi, 900\u00a0zł za 4 zabiegi',
    body: [
      'Kriolipoliza redukuje tkankę tłuszczową przez zamrażanie niechcianych komórek tłuszczowych, co prowadzi do ich rozpadu (lipolizy).',
      'Do dyspozycji mamy dwie silikonowe głowice różnej wielkości, dzięki czemu dobieramy zabieg do konkretnej partii ciała. Podczas zabiegu nie odczuwasz chłodu — chroni Cię membrana zabezpieczająca.',
    ],
    benefits: [
      'trwała redukcja komórek tłuszczowych w wybranym miejscu',
      'dwie głowice dopasowane do różnych partii ciała',
      'komfort zabiegu dzięki membranie zabezpieczającej',
    ],
    course: 'Zabieg wykonujemy nie częściej niż raz na 4–6 tygodni, w zależności od potrzeb.',
    relatedPosts: [
      'kriolipoliza',
    ],
  },
  {
    slug: 'endomasaz-slimroll-x',
    name: 'Endomasaż SLIMROLL X',
    tagline: 'Endermologia, masaż rollerowy i fala radiowa w jednym zabiegu.',
    photo: glowicaRolkowa,
    photoAlt:
      'Głowica rolkowa endomasażu SLIMROLL X z podświetleniem LED w trakcie zabiegu na udzie',
    video: 'endomasaz-glowica-rolkowa',
    videoLabel: 'Głowica rollerowa endomasażu z podświetleniem LED w trakcie pracy',
    durationLabel: '50 minut',
    priceFrom: 280,
    singlePrice: '280 zł',
    // 3000 zł for a package of 15.
    seriesFrom: 200,
    priceText: '280 zł/\u200bpojedynczy zabieg (w\u00a0serii taniej)',
    seriesHighlight: 'pakiety od 1250 zł, kombinezon gratis',
    body: [
      'SLIMROLL X to innowacyjne połączenie endermologii, masażu rollerowego i fali radiowej.',
      'Zabieg zmniejsza ilość tkanki tłuszczowej (aktywuje rozpad adipocytów), redukuje cellulit, poprawia jędrność i elastyczność skóry, przyspiesza metabolizm oraz detoksykację organizmu i pobudza układ limfatyczny. Efekty zauważysz już po pierwszym zabiegu.',
    ],
    benefits: [
      'redukcja tkanki tłuszczowej i cellulitu',
      'poprawa jędrności i elastyczności skóry',
      'pobudzenie układu limfatycznego',
      'przyspieszenie metabolizmu i detoksykacji',
    ],
    course: 'Zalecamy serię minimum 6 zabiegów, w odstępach co 3–5 dni.',
    relatedPosts: [
      'zadbaj-o-swoja-sylwetke-z-nowoczesnymi-bezbolesnymi-zabiegami-modelowania',
    ],
  },
  {
    slug: 'masaz-kobido',
    name: 'Masaż Kobido',
    tagline: 'Niechirurgiczny lifting twarzy.',
    durationLabel: '45–60 minut',
    priceFrom: 200,
    singlePrice: '200 zł',
    seriesFrom: 170,
    priceText: '200 zł/\u200bpojedynczy zabieg (w\u00a0serii taniej)',
    priceNote: 'Z ampułką anti-age 240 zł.',
    seriesHighlight: '170 zł za zabieg w serii 3 zabiegów',
    body: [
      'Rytuał Kobido, nazywany „niechirurgicznym liftingiem twarzy”, łączy różne techniki masażu wykonywane w obrębie twarzy, szyi, dekoltu i karku.',
      'Regularne sesje wyraźnie poprawiają wygląd skóry, zwiększają jej elastyczność i redukują oznaki starzenia.',
    ],
    benefits: [
      'wyraźna poprawa wyglądu i napięcia skóry twarzy',
      'zwiększenie elastyczności skóry',
      'redukcja oznak starzenia',
    ],
    course: 'Najlepsze efekty daje seria 3 zabiegów.',
    relatedPosts: [],
  },
  {
    slug: 'oczyszczanie-wodorowe',
    name: 'Oczyszczanie wodorowe',
    tagline: 'Głębokie oczyszczenie skóry cząsteczkami wodoru.',
    durationLabel: '60 minut',
    priceFrom: 220,
    singlePrice: '220 zł',
    seriesFrom: 180,
    priceText: '220 zł/\u200bpojedynczy zabieg (w\u00a0serii taniej)',
    priceNote: 'Z ampułką liftingującą 260 zł.',
    seriesHighlight: '180 zł za zabieg w serii 3 zabiegów',
    body: [
      'W trakcie zabiegu specjalna głowica wprowadza w skórę mikroskopijne cząsteczki wodoru. Skóra zostaje dokładnie oczyszczona z zanieczyszczeń, nadmiaru sebum i martwego naskórka.',
      'Zabieg niweluje drobne zmarszczki, poprawia napięcie skóry i daje efekt delikatnego liftingu.',
    ],
    benefits: [
      'dokładne oczyszczenie z zanieczyszczeń i sebum',
      'niwelowanie drobnych zmarszczek',
      'poprawa napięcia skóry i efekt liftingu',
    ],
    course: 'Najlepsze efekty daje seria 3 zabiegów.',
    relatedPosts: [
      'oczyszczanie-wodorowe-naturalny-sposob-na-zdrowa-i-promienna-skore',
    ],
  },
];

/** The price line for a treatment: the client's wording, or "od X zł". */
export function treatmentPrice(treatment: Treatment): string {
  return treatment.priceText ?? `od ${treatment.priceFrom} zł`;
}

export function getTreatment(slug: string): Treatment | undefined {
  return treatments.find((treatment) => treatment.slug === slug);
}

/**
 * Contraindications for the BIA body-composition scan, quoted from the source
 * page. Medical content — carried over verbatim, never paraphrased.
 */
export const biaContraindications = [
  'kobiety w ciąży',
  'osoby z defibrylatorem serca',
  'dzieci poniżej 5. roku życia',
  'osoby chore na epilepsję',
] as const;
