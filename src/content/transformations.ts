/**
 * Patient transformations shown on /metamorfozy (and two of them on the home page).
 *
 * Maintained BY HAND. The stories, results and before/after photos come from the
 * poradnia's own social-media posts, supplied by the client in 2026. They replace
 * the nineteen stories scripts/extract-transformations.ts pulled from the old
 * WordPress site — do not re-run that script, it would bring the old ones back.
 *
 * The descriptions are the poradnia's words, not patient quotes, so they render
 * as plain paragraphs. Emoji and the bullet lists of results were taken out of
 * the post text: the results live in `results` and render as a table instead.
 *
 * Most posts give no first name; those stories are headed "Pacjentka"/"Pacjent".
 */

import type { StaticImageData } from 'next/image';

import pacjentkaBrzuch from '@/assets/photos/metamorfoza-pacjentka-brzuch.webp';
import ilonaBok from '@/assets/photos/metamorfoza-ilona-bok.webp';
import ilonaPrzod from '@/assets/photos/metamorfoza-ilona-przod.webp';
import pawelPrzod from '@/assets/photos/metamorfoza-pawel-przod.webp';
import pawelBok from '@/assets/photos/metamorfoza-pawel-bok.webp';
import hannaPrzod from '@/assets/photos/metamorfoza-hanna-przod.webp';
import hannaBok from '@/assets/photos/metamorfoza-hanna-bok.webp';
import maciejPrzod from '@/assets/photos/metamorfoza-maciej-przod.webp';
import maciejBok from '@/assets/photos/metamorfoza-maciej-bok.webp';
import elaBok from '@/assets/photos/metamorfoza-ela-bok.webp';
import elaPrzod from '@/assets/photos/metamorfoza-ela-przod.webp';
import agnieszkaBok from '@/assets/photos/metamorfoza-agnieszka-bok.webp';
import agnieszkaPrzod from '@/assets/photos/metamorfoza-agnieszka-przod.webp';
import barbaraBok from '@/assets/photos/metamorfoza-barbara-bok.webp';
import barbaraPrzod from '@/assets/photos/metamorfoza-barbara-przod.webp';
import pacjentkaDietaBok from '@/assets/photos/metamorfoza-pacjentka-dieta-bok.webp';
import pacjentkaDietaPrzod from '@/assets/photos/metamorfoza-pacjentka-dieta-przod.webp';
import pacjentkaZabiegiBrzuch from '@/assets/photos/metamorfoza-pacjentka-zabiegi-brzuch.webp';
// Older stories (11–20), from earlier posts.
import marzenaPrzod from '@/assets/photos/metamorfoza-marzena-przod.webp';
import marzenaBok from '@/assets/photos/metamorfoza-marzena-bok.webp';
import andrzejBok from '@/assets/photos/metamorfoza-andrzej-bok.webp';
import andrzejPrzod from '@/assets/photos/metamorfoza-andrzej-przod.webp';
import dorotaBok from '@/assets/photos/metamorfoza-dorota-bok.webp';
import dorotaPrzod from '@/assets/photos/metamorfoza-dorota-przod.webp';
import anetaPrzod from '@/assets/photos/metamorfoza-aneta-przod.webp';
import anetaBok from '@/assets/photos/metamorfoza-aneta-bok.webp';
import pacjentRozstepyBok from '@/assets/photos/metamorfoza-pacjent-rozstepy-bok.webp';
import pacjentRozstepyBok2 from '@/assets/photos/metamorfoza-pacjent-rozstepy-bok-2.webp';
import martynaBok from '@/assets/photos/metamorfoza-martyna-bok.webp';
import martynaPrzod from '@/assets/photos/metamorfoza-martyna-przod.webp';
import joannaBok from '@/assets/photos/metamorfoza-joanna-bok.webp';
import joannaPrzod from '@/assets/photos/metamorfoza-joanna-przod.webp';
import robertBok from '@/assets/photos/metamorfoza-robert-bok.webp';
import martaBok from '@/assets/photos/metamorfoza-marta-bok.webp';
import martaPrzod from '@/assets/photos/metamorfoza-marta-przod.webp';
import pacjentkaKriolipolizaBrzuch from '@/assets/photos/metamorfoza-pacjentka-kriolipoliza-brzuch.webp';

export interface TransformationPhoto {
  src: StaticImageData;
  /** What the frame shows. */
  alt: string;
}

export interface TransformationResult {
  label: string;
  value: string;
}

export interface Transformation {
  slug: string;
  /** First name when the post gives one, otherwise "Pacjentka" / "Pacjent". */
  name: string;
  /** Headline result on the photo badge, e.g. "−10,5 kg". */
  headline: string;
  /** Small print under the headline — usually the duration. */
  headlineNote?: string;
  /** How long the cooperation took; omitted where the post does not say. */
  duration?: string;
  results: TransformationResult[];
  /** The poradnia's description, one entry per paragraph. */
  description: string[];
  /** One or two sentences for the home-page card. */
  teaser?: string;
  photos: TransformationPhoto[];
}

export const transformations: Transformation[] = [
  {
    slug: 'pacjentka-dieta-i-zabiegi',
    name: 'Pacjentka',
    headline: '−10,5 kg',
    headlineNote: '4 miesiące',
    duration: '4 miesiące',
    results: [
      { label: 'Masa ciała', value: '−10,5 kg' },
      { label: 'Tkanka tłuszczowa', value: '−7,5 kg' },
      { label: 'Tłuszcz trzewny', value: '−21 cm²' },
      { label: 'Obwód', value: '−8,8 cm' },
      { label: 'Wiek metaboliczny', value: '−1 rok' },
    ],
    description: [
      'Płaski brzuch, zarysowane mięśnie i wyraźnie wcięta talia. To efekt połączenia współpracy dietetycznej z zabiegami modelującymi sylwetkę.',
      'Dieta daje podstawy, a zabiegi pomagają tam, gdzie ciało potrzebuje dodatkowego wsparcia. Bez cudów – za to z realnymi efektami.',
    ],
    photos: [
      {
        src: pacjentkaBrzuch,
        alt: 'Brzuch pacjentki przed i po — ujęcie z boku i z przodu',
      },
    ],
  },
  {
    slug: 'ilona',
    name: 'Ilona',
    headline: '−11 kg',
    headlineNote: '6 miesięcy',
    duration: '6 miesięcy',
    results: [
      { label: 'Masa ciała', value: 'ponad −11 kg' },
      { label: 'Tkanka tłuszczowa', value: '−8 kg' },
      { label: 'Tłuszcz trzewny', value: '−39 cm² (−4 poziomy)' },
      { label: 'Pas', value: '−5 cm' },
      { label: 'Wiek metaboliczny', value: '−2 lata' },
    ],
    description: [
      'Właśnie do takich efektów prowadzi systematyczna, sześciomiesięczna współpraca! Przedstawiamy metamorfozę Pani Ilony.',
    ],
    photos: [
      { src: ilonaBok, alt: 'Pani Ilona przed i po — sylwetka z boku' },
      { src: ilonaPrzod, alt: 'Pani Ilona przed i po — sylwetka z przodu' },
    ],
  },
  {
    slug: 'pawel',
    name: 'Paweł',
    headline: '−29 kg',
    headlineNote: '4 miesiące',
    duration: '4 miesiące',
    results: [
      { label: 'Masa ciała', value: '−29 kg' },
      { label: 'Tkanka tłuszczowa', value: '−13 kg' },
      { label: 'Tłuszcz trzewny', value: '−59 cm²' },
      { label: 'Obwód brzucha', value: 'prawie −16 cm' },
      { label: 'Rozmiar odzieży', value: '−4 rozmiary' },
      { label: 'Wiek metaboliczny', value: '−4 lata' },
    ],
    description: [
      'Błyskawiczna metamorfoza Pana Pawła.',
      'To nie żadna „magiczna metoda”, a konkretna decyzja i codzienna praca nad sobą. Regularne posiłki, więcej ruchu, a mniej podjadania. Brzmi zwyczajnie – i takie właśnie jest! Bo o to właśnie chodzi – żeby było to do zrobienia na co dzień.',
      'Tym bardziej należą się ogromne gratulacje, bo Pan Paweł zmierzył się z tym wyzwaniem mimo poważnych wyzwań zdrowotnych – rzadkiej choroby, w której trzeba uważać na skład diety, a także dwóch przebytych już zawałów serca i zwiększonego ryzyka zakrzepicy.',
      'Serdecznie gratuluję konsekwencji w działaniu i odniesionego sukcesu. Ogromne brawa także dla wspierającej żony – razem można więcej!',
    ],
    teaser:
      'To nie żadna „magiczna metoda”, a konkretna decyzja i codzienna praca nad sobą. Regularne posiłki, więcej ruchu, a mniej podjadania.',
    photos: [
      { src: pawelPrzod, alt: 'Pan Paweł przed i po — sylwetka z przodu' },
      { src: pawelBok, alt: 'Pan Paweł przed i po — przed z przodu, po z boku' },
    ],
  },
  {
    slug: 'hanna',
    name: 'Hanna',
    headline: '−15,5 kg',
    headlineNote: '9 miesięcy',
    duration: '9 miesięcy',
    results: [
      { label: 'Masa ciała', value: '−15,5 kg' },
      { label: 'Tkanka tłuszczowa', value: 'ok. −7,2 kg' },
      { label: 'Tłuszcz trzewny', value: '−72 cm²' },
      { label: 'Talia', value: '−10 cm' },
    ],
    description: [
      'Odchudzanie dla zdrowia.',
      'Historia Pani Hanny pokazuje, że czasami najważniejszą motywacją do zmiany nie jest wygląd, ale troska o własne zdrowie.',
      'Pani Hanna zmaga się z kilkoma schorzeniami, które dodatkowo utrudniają redukcję masy ciała. Kiedy lekarz zaproponował farmakologiczne leczenie otyłości, zdecydowała się najpierw spróbować innej drogi – pracy nad nawykami żywieniowymi i stopniowej zmiany codziennych przyzwyczajeń.',
      'Za nami 9 miesięcy wspólnej pracy. Nie zawsze było łatwo, ale dzięki regularności, zaangażowaniu i konsekwencji Pani Hanny udało się osiągnąć piękne efekty.',
      'W trakcie tego procesu Pani Hanna korzystała również z zabiegów modelowania sylwetki, które stanowiły dodatkowe wsparcie.',
      'Najbardziej cieszy nas jednak nie sama liczba kilogramów, ale fakt, że za tą zmianą stoi świadoma decyzja, by zadbać o siebie i swoje zdrowie.',
      'Pani Hanno, ogromnie gratulujemy wytrwałości! Dziękujemy za zaufanie i możliwość towarzyszenia Pani w tej drodze.',
      'Bo czasami największą wygraną jest nie to, ile kilogramów uda się zgubić, ale ile dobrego możemy zrobić dla własnego zdrowia.',
      'Jeśli również chcesz zadbać o siebie, ale nie wiesz, od czego zacząć – zapraszamy do nas. Poszukamy rozwiązania dopasowanego do Twoich potrzeb i możliwości.',
    ],
    teaser:
      'Historia Pani Hanny pokazuje, że czasami najważniejszą motywacją do zmiany nie jest wygląd, ale troska o własne zdrowie.',
    photos: [
      { src: hannaPrzod, alt: 'Pani Hanna przed i po — sylwetka z przodu' },
      { src: hannaBok, alt: 'Pani Hanna przed i po — sylwetka z boku' },
    ],
  },
  {
    slug: 'maciej',
    name: 'Maciej',
    headline: '−28,5 kg',
    headlineNote: '5 miesięcy',
    duration: '5 miesięcy',
    results: [
      { label: 'Masa ciała', value: '−28,5 kg' },
      { label: 'Tkanka tłuszczowa', value: '−17,5 kg' },
      { label: 'Tłuszcz trzewny', value: '−41 cm² (−3 poziomy)' },
      { label: 'Talia', value: '−24 cm' },
      { label: 'Rozmiar odzieży', value: '−6 rozmiarów' },
    ],
    description: [
      'Nasz pacjent początkowo próbował schudnąć samodzielnie – w miesiąc udało mu się zrzucić 3 kg. Chcąc osiągnąć jeszcze lepsze efekty, zdecydował się na współpracę z dietetykiem. Jak widać, była to świetna decyzja!',
    ],
    photos: [
      { src: maciejPrzod, alt: 'Pan Maciej przed i po — sylwetka z przodu' },
      { src: maciejBok, alt: 'Pan Maciej przed i po — sylwetka z boku' },
    ],
  },
  {
    slug: 'ela',
    name: 'Ela',
    headline: '−12 kg',
    headlineNote: '6 miesięcy',
    duration: '6 miesięcy',
    results: [
      { label: 'Masa ciała', value: '−12 kg' },
      { label: 'Tkanka tłuszczowa', value: 'ponad −7,5 kg' },
      { label: 'Tłuszcz trzewny', value: '−82 cm²' },
      { label: 'Talia', value: '−9 cm' },
      { label: 'Rozmiar odzieży', value: '−2 rozmiary' },
      { label: 'Wiek metaboliczny', value: '−4 lata' },
    ],
    description: [
      '6 miesięcy pracy i ogromna zmiana – nie tylko w sylwetce!',
      'Ale najbardziej cieszą nas efekty, których nie widać na zdjęciu – obniżenie ciśnienia tętniczego i poprawa parametrów zdrowotnych. Efektem tego jest zmniejszenie dawek przyjmowanych leków o połowę, oczywiście po konsultacji z lekarzem.',
      'To właśnie dlatego w naszej poradni patrzymy na proces odchudzania szerzej. Nie chodzi wyłącznie o kilogramy, centymetry czy wygląd sylwetki. Celem jest poprawa zdrowia, samopoczucia i jakości życia.',
      'To nie jest dieta na chwilę. To inwestycja w zdrowie na lata.',
    ],
    photos: [
      { src: elaBok, alt: 'Pani Ela przed i po — sylwetka z boku' },
      { src: elaPrzod, alt: 'Pani Ela przed i po — sylwetka z przodu' },
    ],
  },
  {
    slug: 'agnieszka',
    name: 'Agnieszka',
    headline: '−15 kg',
    results: [
      { label: 'Masa ciała', value: '−15 kg' },
      { label: 'Tkanka tłuszczowa', value: '−10 kg' },
      { label: 'Tłuszcz trzewny', value: '−51 cm² (−3 poziomy)' },
      { label: 'Obwód', value: '−11,5 cm' },
      { label: 'Rozmiar odzieży', value: '−3 rozmiary' },
      { label: 'Wiek metaboliczny', value: '−3 lata' },
    ],
    description: [
      'Pani Agnieszka pokazała, że odpowiednio dobrana dieta może przynieść bardzo dobre rezultaty również przy siedzącym trybie pracy.',
      'Tym razem, ze wskazań lekarskich, postawiłyśmy na dietę niskowęglowodanową – inne podejście niż zazwyczaj, ale dopasowane do indywidualnych potrzeb. Niższe otłuszczenie trzewne to także mniejsze ryzyko chorób dietozależnych.',
      'To nie tylko zmiana sylwetki, ale przede wszystkim lepsze parametry organizmu i poprawa samopoczucia.',
      'Pani Agnieszko, ogromne gratulacje! To piękny efekt Pani wytrwałości i codziennych małych kroków.',
    ],
    photos: [
      { src: agnieszkaBok, alt: 'Pani Agnieszka przed i po — sylwetka z boku' },
      { src: agnieszkaPrzod, alt: 'Pani Agnieszka przed i po — sylwetka z przodu' },
    ],
  },
  {
    slug: 'barbara',
    name: 'Barbara',
    headline: '−11 kg',
    headlineNote: '5 miesięcy',
    duration: '5 miesięcy',
    results: [
      { label: 'Masa ciała', value: '−11 kg' },
      { label: 'Tkanka tłuszczowa', value: 'ok. −9 kg' },
      { label: 'Tłuszcz trzewny', value: '−90 cm²' },
      { label: 'Talia', value: '−10,5 cm' },
      { label: 'Wiek metaboliczny', value: '−4 lata' },
    ],
    description: [
      'Chcemy pokazać Wam piękną przemianę Pani Barbary. To efekt 5 miesięcy wspólnej pracy, konsekwencji i dobrze dobranego planu.',
      'Połączenie opieki dietetycznej z zabiegami modelowania sylwetki pozwoliło osiągnąć naprawdę świetne rezultaty.',
      'Dieta pomogła zmniejszyć masę ciała i poprawić parametry organizmu, a kriolipoliza i liposukcja kawitacyjna były dodatkowym wsparciem w wymodelowaniu bardziej opornych partii sylwetki.',
      'I co najważniejsze – to jeszcze nie koniec. Obecnie pracujemy nad dalszym wysmukleniem brzucha i redukcją fałdek, żeby jeszcze piękniej podkreślić osiągnięty efekt.',
      'Pani Barbaro, ogromne gratulacje! Za wytrwałość, zaangażowanie i piękną pracę nad sobą.',
    ],
    photos: [
      {
        src: barbaraBok,
        alt: 'Pani Barbara przed, w trakcie i po — sylwetka z boku',
      },
      {
        src: barbaraPrzod,
        alt: 'Pani Barbara przed, w trakcie i po — sylwetka z przodu',
      },
    ],
  },
  {
    slug: 'pacjentka-dieta',
    name: 'Pacjentka',
    headline: '−9,5 kg',
    headlineNote: '5 miesięcy',
    duration: '5 miesięcy',
    results: [
      { label: 'Masa ciała', value: '−9,5 kg' },
      { label: 'Tkanka tłuszczowa', value: 'ok. −7,2 kg' },
      { label: 'Tłuszcz trzewny', value: '−44 cm²' },
      { label: 'Talia', value: '−8,5 cm' },
      { label: 'Wiek metaboliczny', value: '−4 lata' },
    ],
    description: [
      'Trwała zmiana to efekt konsekwencji i mądrze ułożonego planu. Przedstawiamy rezultat, jaki udało się osiągnąć wyłącznie dzięki indywidualnie dobranej diecie i stałej współpracy z dietetykiem!',
      'To doskonały dowód na to, jak wielką moc ma prawidłowo zbilansowany jadłospis i dopasowane nawyki żywieniowe. Odpowiednio skomponowana dieta nie tylko redukuje kilogramy, ale przede wszystkim poprawia zdrowie, dając więcej energii i lepsze samopoczucie każdego dnia.',
    ],
    photos: [
      { src: pacjentkaDietaBok, alt: 'Pacjentka przed i po — sylwetka z boku' },
      { src: pacjentkaDietaPrzod, alt: 'Pacjentka przed i po — sylwetka z przodu' },
    ],
  },
  {
    slug: 'pacjentka-zabiegi',
    name: 'Pacjentka',
    headline: '−15 cm',
    headlineNote: 'pod pępkiem',
    results: [
      { label: 'Nad pępkiem', value: '−10 cm' },
      { label: 'Talia', value: '−8 cm' },
      { label: 'Pod pępkiem', value: '−15 cm' },
      { label: 'Skóra', value: 'ujędrniona, mniej rozstępów' },
    ],
    description: [
      'Kolejna piękna metamorfoza w naszej Strefie Modelowania Sylwetki.',
      'Połączenie nowoczesnych zabiegów, regularności i współpracy z dietetykiem dało efekty, które naprawdę cieszą!',
      'Wykonane zostały: seria zabiegów lipolasera – redukcja tkanki tłuszczowej, oraz seria liposukcji kawitacyjnej – modelowanie sylwetki, poprawa wyglądu skóry i wyraźna redukcja rozstępów.',
      'To pokazuje, jak dużo daje kompleksowe podejście — działanie zarówno od zewnątrz, jak i od środka.',
    ],
    photos: [
      {
        src: pacjentkaZabiegiBrzuch,
        alt: 'Brzuch pacjentki przed i po zabiegach — ujęcie z przodu i z boku',
      },
    ],
  },

  /* ---- Older stories (11–20) ---- */
  {
    slug: 'marzena',
    name: 'Marzena',
    headline: '−15,4 kg',
    headlineNote: '5 miesięcy',
    duration: '5 miesięcy',
    results: [
      { label: 'Masa ciała', value: '−15,4 kg' },
      { label: 'Tkanka tłuszczowa', value: '−9,5 kg' },
      { label: 'Tłuszcz trzewny', value: '−39 cm²' },
      { label: 'Obwód brzucha', value: '−11 cm' },
      { label: 'Rozmiar odzieży', value: '−3 rozmiary' },
      { label: 'Wiek metaboliczny', value: '−3 lata' },
    ],
    description: [
      '„Chciałam schudnąć 10 kg… schudłam ponad 15.”',
      'Pani Marzena trafiła do mojego gabinetu po wielu samodzielnych próbach odchudzania. Ograniczała pieczywo, rezygnowała z ziemniaków, jadła coraz mniej, a efekty nie były zadowalające.',
      'W wakacje zaczęłyśmy współpracę z celem: –10 kg.',
      'Po drodze pojawił się ogromny stres i pobyt dziecka w szpitalu — sytuacje, które często kończą dietę. Mimo to Pani Marzena nie zrezygnowała. Działałyśmy elastycznie, bez zakazów i bez głodówek.',
      'Lepsze samopoczucie i większa pewność siebie. Cel został nie tylko osiągnięty — został przekroczony.',
    ],
    photos: [
      { src: marzenaPrzod, alt: 'Pani Marzena przed i po — sylwetka z przodu' },
      { src: marzenaBok, alt: 'Pani Marzena przed i po — sylwetka z boku' },
    ],
  },
  {
    slug: 'andrzej',
    name: 'Andrzej',
    headline: '−34 kg',
    headlineNote: 'marzec–listopad',
    duration: 'od marca do listopada',
    results: [
      { label: 'Masa ciała', value: 'ze 119 kg do 84,8 kg' },
      { label: 'Tkanka tłuszczowa', value: '−20 kg' },
      { label: 'Tłuszcz trzewny', value: '−155 cm²' },
      { label: 'Wiek metaboliczny na początku', value: '+10 lat' },
      { label: 'Wiek metaboliczny po stabilizacji', value: '−7 lat' },
    ],
    description: [
      'Metamorfoza Roku 2025.',
      'Pan Andrzej zrobił coś naprawdę imponującego. Od marca do listopada przeszedł ogromną przemianę.',
      'Co ważne – to wszystko mimo bardzo trudnych warunków: praca w ochronie, nocne zmiany, nieregularny tryb życia, praca mocno ograniczająca aktywność fizyczną.',
      'To najlepszy dowód, że nawet przy niesprzyjających okolicznościach da się osiągnąć świetne efekty, jeśli jest konsekwencja, plan i cierpliwość.',
      'Brawo Panie Andrzeju – ogromna inspiracja na 2026 rok!',
    ],
    photos: [
      { src: andrzejBok, alt: 'Pan Andrzej przed, w trakcie i po — sylwetka z boku' },
      { src: andrzejPrzod, alt: 'Pan Andrzej przed, w trakcie i po — sylwetka z przodu' },
    ],
  },
  {
    slug: 'dorota',
    name: 'Dorota',
    headline: '−15 kg',
    headlineNote: 'niecałe 5 miesięcy',
    duration: 'niecałe 5 miesięcy',
    results: [
      { label: 'Masa ciała', value: '−15 kg' },
      { label: 'Tkanka tłuszczowa', value: '−11 kg' },
      { label: 'Tłuszcz trzewny', value: '−85 cm² (−3 poziomy)' },
      { label: 'Obwód', value: 'ponad −10 cm' },
      { label: 'Wiek metaboliczny', value: '−4 lata' },
    ],
    description: [
      'Pani Dorota na początku sama nie wierzyła, że może schudnąć, jednak zaufała nam i dzielnie wdrażała kolejne zalecenia żywieniowe. Drogę do sukcesu utrudniały jej schorzenia takie jak cukrzyca i nadciśnienie, ale nie powstrzymało jej to przed osiągnięciem fantastycznego efektu. Gratulujemy!',
    ],
    photos: [
      { src: dorotaBok, alt: 'Pani Dorota przed i po — sylwetka z boku' },
      { src: dorotaPrzod, alt: 'Pani Dorota przed i po — sylwetka z przodu' },
    ],
  },
  {
    slug: 'aneta',
    name: 'Aneta',
    headline: '−6,5 kg',
    headlineNote: '4 miesiące',
    duration: '4 miesiące',
    results: [
      { label: 'Masa ciała', value: '−6,5 kg' },
      { label: 'Tkanka tłuszczowa', value: 'ponad −5 kg' },
      { label: 'Tłuszcz trzewny', value: '−23 cm² (−4 poziomy)' },
      { label: 'Typ otłuszczenia', value: 'teraz podskórny' },
      { label: 'Obwód', value: 'ponad −7 cm' },
      { label: 'Wiek metaboliczny', value: '2 lata poniżej rzeczywistego' },
    ],
    description: [
      // The post says −6,5 kg in its list and 6,4 kg here; the list figure is used throughout.
      'Czasem trudno jest zrzucić kilka kilogramów, będąc w górnej granicy normy wagowej. Właśnie taka delikatna redukcja była celem naszej Pacjentki. Pani Aneta zgłosiła się do poradni, aby poczuć się lepiej we własnym ciele. Współpraca przyniosła tylko i aż 6,5 kg spadku masy ciała.',
      'Dzięki temu ilość tkanki tłuszczowej w tym momencie nie przekracza już normy, a wiek metaboliczny Pacjentki jest o 2 lata niższy względem wieku rzeczywistego. Gratulacje!',
    ],
    photos: [
      { src: anetaPrzod, alt: 'Pani Aneta przed i po — sylwetka z przodu' },
      { src: anetaBok, alt: 'Pani Aneta przed i po — sylwetka z boku' },
    ],
  },
  {
    slug: 'pacjent-rozstepy',
    name: 'Pacjent',
    headline: 'Mniej rozstępów',
    headlineNote: 'liposukcja kawitacyjna',
    results: [
      { label: 'Zabiegi', value: 'seria liposukcji kawitacyjnej' },
      { label: 'Skóra', value: 'ujędrniona' },
      { label: 'Rozstępy', value: 'płytsze, jaśniejsze, mniej widoczne' },
      { label: 'Brzuch i boki', value: 'lepsza struktura skóry' },
    ],
    description: [
      'Metamorfoza rozstępów.',
      'Po serii zabiegów liposukcji kawitacyjnej, oprócz wyszczuplenia sylwetki, u pacjenta zauważalne jest wyraźne zmniejszenie rozstępów, które były efektem wcześniejszych wahań wagi i napięcia skóry.',
      'W naszej strefie zabiegowej dbamy o potrzeby zarówno kobiet, jak i mężczyzn – każdy zasługuje na profesjonalną pielęgnację i świetne samopoczucie.',
    ],
    photos: [
      {
        src: pacjentRozstepyBok,
        alt: 'Brzuch pacjenta z boku przed i po serii liposukcji kawitacyjnej — rozstępy',
      },
      {
        src: pacjentRozstepyBok2,
        alt: 'Brzuch i bok pacjenta przed i po serii liposukcji kawitacyjnej — drugie ujęcie',
      },
    ],
  },
  {
    slug: 'martyna',
    name: 'Martyna',
    headline: 'prawie −14 kg',
    headlineNote: '4 miesiące',
    duration: '4 miesiące',
    results: [
      { label: 'Masa ciała', value: 'prawie −14 kg' },
      { label: 'Tkanka tłuszczowa', value: 'ok. −9 kg' },
      { label: 'Tłuszcz trzewny', value: '−41 cm² (−4 poziomy)' },
      { label: 'Talia', value: '−7 cm' },
      { label: 'Rozmiar odzieży', value: '−2 rozmiary' },
      { label: 'Wiek metaboliczny', value: '−2 lata' },
      { label: 'Wyniki badań', value: 'niższe TSH i insulina' },
    ],
    description: [
      'Pani Martyna na co dzień zmaga się z insulinoopornością i niedoczynnością tarczycy. Dodatkowo pracuje na dwie zmiany i codziennie dojeżdża do pracy do innego miasta, co zdecydowanie utrudnia proces odchudzania. Mimo tych wyzwań nasza Pacjentka udowodniła, że determinacja i konsekwencja przynoszą efekty! Dzięki wytrwałości osiągnęła imponujące rezultaty – w 4 miesiące, w tym w okresie świątecznym i noworocznym.',
      'Wielkie gratulacje!',
      'Teraz czas na kolejny krok – modelowanie sylwetki i podkreślenie uzyskanych efektów dzięki zabiegom! Wspólnie zadbamy o jędrne ciało i pewność siebie, by zdążyć jeszcze przed wakacjami!',
      'Ty też możesz osiągnąć swój cel – skontaktuj się z nami już dziś!',
    ],
    photos: [
      { src: martynaBok, alt: 'Pani Martyna przed i po — sylwetka z boku' },
      { src: martynaPrzod, alt: 'Pani Martyna przed i po — sylwetka z przodu' },
    ],
  },
  {
    slug: 'joanna',
    name: 'Joanna',
    headline: '−10 kg',
    headlineNote: '6 miesięcy',
    duration: '6 miesięcy',
    results: [
      { label: 'Masa ciała', value: '−10 kg' },
      { label: 'Tkanka tłuszczowa', value: '−6 kg' },
      { label: 'Tłuszcz trzewny', value: '−25 cm²' },
      { label: 'Grubość warstwy tłuszczu', value: '−3 poziomy' },
    ],
    description: [
      'Nasza dwunastoletnia Pacjentka pokazała, że nigdy nie jest za wcześnie na wprowadzenie zdrowych nawyków żywieniowych.',
      'Joasia może być wzorem dla wszystkich młodszych pacjentów i nie tylko!',
    ],
    photos: [
      {
        src: joannaBok,
        alt: 'Joanna przed i po — przed na analizatorze składu ciała, sylwetka z boku',
      },
      {
        src: joannaPrzod,
        alt: 'Joanna przed i po — przed tyłem na analizatorze, po z przodu',
      },
    ],
  },
  {
    slug: 'robert',
    name: 'Robert',
    headline: '−14 kg',
    results: [
      { label: 'Masa ciała', value: '−14 kg' },
      { label: 'Tkanka tłuszczowa', value: 'prawie −8 kg' },
      { label: 'Tłuszcz trzewny', value: '−44 cm²' },
      { label: 'Grubość warstwy tłuszczu', value: '−2 poziomy' },
      { label: 'Pas', value: '−10 cm' },
      { label: 'Rozmiar odzieży', value: 'ponad −2 rozmiary' },
      { label: 'Wiek metaboliczny', value: '−2 lata' },
    ],
    description: [
      'Po miesiącach pełnych wzlotów i upadków mamy to!',
      'Do dwóch razy sztuka! Okres wakacyjny nie sprzyjał odchudzaniu i trzymaniu się zaleceń, jednak Pan Robert nie poddał się i ponownie zmotywował się po wakacjach do działania. Cel został osiągnięty, w dwóch etapach. Brawo!',
      'Wszystkich, którzy chcieliby osiągnąć takie rezultaty, zapraszamy do kontaktu.',
    ],
    photos: [
      {
        src: robertBok,
        alt: 'Pan Robert przed i po — przed na analizatorze składu ciała, sylwetka z boku',
      },
    ],
  },
  {
    slug: 'marta',
    name: 'Marta',
    headline: '−10,4 kg',
    headlineNote: '3 miesiące',
    duration: '3 miesiące',
    results: [
      { label: 'Masa ciała', value: '−10,4 kg' },
      { label: 'Tkanka tłuszczowa', value: '−7,7 kg' },
      { label: 'Tłuszcz trzewny', value: '−72 cm²' },
      { label: 'Pas', value: '−9 cm' },
      { label: 'Rozmiar odzieży', value: '−2 rozmiary' },
      { label: 'Wiek metaboliczny', value: '−3 lata' },
    ],
    description: [
      'Pani Marta to kolejna Pacjentka, która udowodniła, że w każdym wieku można schudnąć i zawalczyć o swoje zdrowie. Ograniczenia są tylko w głowie!',
      'Mniejsze otłuszczenie trzewne to także dużo niższe ryzyko rozwoju schorzeń dietozależnych.',
      'Ciekawostka: teraz, po odchudzaniu, Pacjentka wchodzi po schodach do naszej poradni bez zadyszki.',
      'Gratulujemy!',
    ],
    photos: [
      { src: martaBok, alt: 'Pani Marta przed i po — sylwetka z boku' },
      { src: martaPrzod, alt: 'Pani Marta przed i po — sylwetka z przodu' },
    ],
  },
  {
    slug: 'pacjentka-kriolipoliza',
    name: 'Pacjentka',
    headline: '4 zabiegi',
    headlineNote: 'kriolipoliza',
    results: [
      { label: 'Zabiegi', value: '4 × kriolipoliza' },
      { label: 'Czas wizyty', value: '60 min' },
    ],
    description: [
      'Uporczywy brzuszek? Wystające boczki?',
      'Mamy na to radę! Kriolipoliza to rewolucyjna metoda modelowania sylwetki poprzez „wymrażanie” tkanki tłuszczowej. Prezentujemy Państwu efekt tylko 4 zabiegów — 4 wizyty trwające po 60 min w naszej Strefie Modelowania Sylwetki.',
      'Jeżeli Tobie również marzy się płaski i jędrny brzuch, skontaktuj się z nami i umów się na wizytę.',
      'Zapraszamy!',
    ],
    photos: [
      {
        src: pacjentkaKriolipolizaBrzuch,
        alt: 'Brzuch pacjentki z boku — przed i po 4 zabiegach kriolipolizy',
      },
    ],
  },
];

export function getTransformation(slug: string): Transformation | undefined {
  return transformations.find((story) => story.slug === slug);
}
