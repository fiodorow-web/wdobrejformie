/**
 * FAQ entries. Answers are plain strings so the same data can feed both the
 * Accordion component and the FAQPage JSON-LD without duplication.
 */

export interface FaqEntry {
  q: string;
  a: string;
}

/** Shown on the home page. */
export const generalFaq: FaqEntry[] = [
  {
    q: 'Czy dostanę listę zakazanych produktów?',
    a: 'Nie. Jadłospis układamy z produktów, które już jesz i które kupisz w każdym sklepie. Dieta ma się dopasować do Ciebie, a nie odwrotnie — dlatego pytamy o preferencje smakowe, tryb pracy i to, ile czasu realnie masz na gotowanie.',
  },
  {
    q: 'Ile trwa współpraca?',
    a: 'To zależy od celu. Pakiet podstawowy obejmuje 6 tygodni, pakiet trzymiesięczny — 12 tygodni. Konsultacje kontrolne odbywają się co 2–3 tygodnie, a po osiągnięciu celu przechodzimy do planu stabilizacji wagi.',
  },
  {
    q: 'Czy muszę kupić od razu cały pakiet?',
    a: 'Nie. Zaczynasz od konsultacji wstępnej z badaniem składu ciała, a decyzję o pakiecie możesz podjąć dopiero podczas pierwszej wizyty kontrolnej.',
  },
  {
    q: 'Czy w jadłospisach są suplementy?',
    a: 'Nie stosujemy żadnych suplementów diety. Plan opiera się wyłącznie na zwykłym jedzeniu.',
  },
  {
    q: 'Czy pracujecie z osobami ze schorzeniami?',
    a: 'Tak. Przygotowujemy jadłospisy między innymi przy insulinooporności, cukrzycy typu II, Hashimoto, niedoczynności i nadczynności tarczycy, SIBO, nadciśnieniu i dnie moczanowej, a także diety eliminacyjne. Weź na wizytę aktualne wyniki badań i nazwy przyjmowanych leków.',
  },
  {
    q: 'Czy mogę skorzystać z konsultacji on-line?',
    a: 'Tak. Wypełnij formularz kontaktowy, w temacie wpisz „on-line”, a w treści nazwę wybranego produktu. Odpowiadamy w ciągu 24 godzin.',
  },
  {
    q: 'Jak dostanę swój jadłospis?',
    a: 'Plany żywieniowe i materiały dodatkowe udostępniamy przez panel pacjenta. Masz do nich dostęp przez cały okres współpracy i również po jej zakończeniu.',
  },
];

/** Shown on /przygotowanie-do-wizyty and /analiza-skladu-ciala. */
export const visitFaq: FaqEntry[] = [
  {
    q: 'Jak przygotować się do badania składu ciała?',
    a: 'Zjedz posiłek 2–3 godziny wcześniej, wypij 2 szklanki wody na 2 godziny przed badaniem, a na 4 godziny przed pomiarem odstaw kawę i mocną herbatę. Nie pij alkoholu przez dobę przed wizytą i przyjdź 3–4 godziny po kąpieli, saunie lub treningu.',
  },
  {
    q: 'Czy badanie jest bolesne?',
    a: 'Nie. Pomiar metodą bioimpedancji elektrycznej (BIA) jest nieinwazyjny i bezbolesny. Ze względu na specyfikę aparatury wykonujemy go na gołe stopy, dlatego zadbaj o czystość dłoni i stóp.',
  },
  {
    q: 'Kto nie może wykonać badania BIA?',
    a: 'Badania nie wykonujemy u kobiet w ciąży, osób z defibrylatorem serca, dzieci poniżej 5. roku życia oraz osób chorych na epilepsję.',
  },
  {
    q: 'Co zabrać na pierwszą wizytę?',
    a: 'Jeśli chorujesz przewlekle na schorzenie zależne od diety — na przykład cukrzycę, insulinooporność czy podwyższony cholesterol — przynieś wyniki ostatnich badań i zapisz nazwy przyjmowanych leków. Przyda się też chwila zastanowienia nad tym, jak wygląda Twój obecny sposób odżywiania.',
  },
  {
    q: 'Co dokładnie mierzy analizator?',
    a: 'Ponad 30 parametrów, między innymi masę tkanki tłuszczowej i mięśniowej, zawartość wody, BMI, podstawową przemianę materii (BMR), poziom tłuszczu trzewnego, wskaźnik talia–biodro (WHR) oraz wiek metaboliczny. Wyniki analizujemy razem podczas konsultacji.',
  },
];

/** Shown on /modelowanie-sylwetki. */
export const treatmentFaq: FaqEntry[] = [
  {
    q: 'Ile zabiegów potrzeba, żeby zobaczyć efekt?',
    a: 'To zależy od zabiegu. Przy lipolaserze zalecamy minimum 8 zabiegów dwa razy w tygodniu, przy liposukcji kawitacyjnej minimum 6 raz w tygodniu, przy falach radiowych 6–8 zabiegów. Kriolipolizę wykonujemy nie częściej niż raz na 4–6 tygodni.',
  },
  {
    q: 'Czy zabiegi są bolesne?',
    a: 'Nie. Lipolaser i liposukcja kawitacyjna są całkowicie bezbolesne, przy falach radiowych odczuwasz przyjemne ciepło, a przy kriolipolizie chroni Cię membrana zabezpieczająca, dzięki której nie odczuwasz chłodu.',
  },
  {
    q: 'Czy seria jest tańsza niż pojedyncze zabiegi?',
    a: 'Tak, i to znacząco. Lipolaser w serii od 8 zabiegów kosztuje 80 zł zamiast 140 zł, a liposukcja kawitacyjna i fale radiowe schodzą do 100 zł za zabieg. Pełne stawki znajdziesz w cenniku.',
  },
  {
    q: 'Czy mogę połączyć zabiegi z dietą?',
    a: 'Tak — i to najczęstszy scenariusz. Zabiegi modelują sylwetkę miejscowo, dieta pracuje nad całością. Podczas konsultacji podpowiemy, od czego zacząć w Twoim przypadku.',
  },
];
