/**
 * The illustrated exercise guide. Pure data — no JSX here. Illustrations
 * live in src/components/exercises (keyed by exercise id) and are rendered
 * by src/views/Exercises.tsx.
 */

export type ExerciseSection = 'ranni' | 'pridane' | 'mikro';

export const SECTION_LABELS: Record<ExerciseSection, string> = {
  ranni: 'Ranní blok',
  pridane: 'Přidané ke bloku',
  mikro: 'Mikro-návyky',
};

export type Exercise = {
  id: string;
  /** Czech name. */
  nameCz: string;
  /** English original, shown in parens when it's the commonly-known name. */
  nameEn?: string;
  section: ExerciseSection;
  /** "Jak na to" — 3-5 numbered steps in plain Czech. */
  steps: string[];
  /** "Na co si dát pozor" — 2-3 common mistakes. */
  mistakes: string[];
  /** "Kolikrát" — the dose. */
  dose: string;
  /** English query for a YouTube search-results link. */
  videoQuery: string;
};

export const EXERCISES: Exercise[] = [
  {
    id: 'shoulder-dislocates',
    nameCz: 'Protahování ramen s tyčí',
    nameEn: 'shoulder dislocates',
    section: 'ranni',
    dose: '10× pomalu',
    steps: [
      'Uchop tyč nebo gumu širokým úchopem (šířeji než ramena).',
      'Napjaté paže drž před tělem, dlaně dolů.',
      'Pomalu veď tyč obloukem nad hlavu.',
      'Pokračuj obloukem za záda, lokty stále napnuté.',
      'Stejnou cestou se vrať zpět do výchozí polohy.',
    ],
    mistakes: [
      'Pokrčené lokty místo napnutých paží.',
      'Příliš úzký úchop – zvětši rozestup rukou, pokud to bolí v ramenou.',
      'Trhavý pohyb; dělej to pomalu a plynule.',
    ],
    videoQuery: 'shoulder dislocates stretch band exercise',
  },
  {
    id: 'thoracic-extension',
    nameCz: 'Hrudní extenze přes židli',
    nameEn: 'thoracic extensions',
    section: 'ranni',
    dose: '10×',
    steps: [
      'Sedni si na zem, opři horní záda o sedák židle nebo válec.',
      'Ruce polož za hlavu nebo zkřížené na hrudi.',
      'Boky nech na místě, nezvedej je od země.',
      'Pomalu se prohni v hrudní páteři přes opěradlo dozadu.',
      'Vrať se zpět nahoru a opakuj.',
    ],
    mistakes: [
      'Prohýbání v bedrech místo hrudníku – boky musí zůstat na místě.',
      'Zadržovaný dech; dýchej plynule.',
    ],
    videoQuery: 'thoracic extension over chair exercise',
  },
  {
    id: 'prone-arm-raises',
    nameCz: 'Zvedání paží vleže na břiše',
    nameEn: 'prone arm raises',
    section: 'ranni',
    dose: '10×',
    steps: [
      'Lehni si na břicho, čelo polož na podložku.',
      'Paže rozpaž do tvaru písmene „Y“.',
      'Zvedni paže pár centimetrů nad zem, dlaně vzhůru.',
      'Na chvíli podrž a pomalu polož zpět.',
      'Postupně přidej lehkou tyč nebo gumu pro odpor.',
    ],
    mistakes: [
      'Zvedání hlavy nebo hrudníku místo paží – čelo zůstává na zemi.',
      'Zvedání příliš vysoko a švihem.',
    ],
    videoQuery: 'prone Y raise shoulder exercise',
  },
  {
    id: 'wrist-rocks',
    nameCz: 'Zápěstí: houpání + zvedání dlaní',
    nameEn: 'wrist rocks & palm lifts',
    section: 'ranni',
    dose: '1 min',
    steps: [
      'Polož dlaně na podložku prsty směrem k tobě.',
      'Pomalu se houpej vpřed a vzad, zápěstí se protahuje.',
      'Otoč dlaně a opakuj houpání prsty od těla.',
      'Nakonec polož dlaně na stůl a zvedej je od podložky, prsty zůstávají dole.',
    ],
    mistakes: [
      'Houpání příliš prudce – bolest je signál, zpomal.',
      'Zapomenutá druhá ruka; protáhni obě strany stejně.',
    ],
    videoQuery: 'wrist mobility rocks and palm lifts',
  },
  {
    id: 'wall-hold-belly',
    nameCz: 'Stoj u zdi břichem',
    nameEn: 'belly-to-wall hold',
    section: 'ranni',
    dose: '3×20 s → cíl 60 s',
    steps: [
      'Polož ruce na zem asi 15 cm od zdi, na šířku ramen.',
      'Jednou nohou se odraz a druhou dojdi nahoru po zdi.',
      'Postupně vyšlapávej nohama po zdi, dokud tělo nebude svislé.',
      'Tlač rukama do země a břichem miř ke zdi.',
      'Vydrž v poloze, pak se stejnou cestou vrať dolů.',
    ],
    mistakes: [
      'Prohnutá bedra – zpevni břicho a hýždě.',
      'Ruce moc blízko nebo moc daleko od zdi – najdi stabilní vzdálenost.',
      'Zadržovaný dech; dýchej i ve výdrži.',
    ],
    videoQuery: 'belly to wall handstand hold tutorial',
  },
  {
    id: 'glute-bridge',
    nameCz: 'Most z leže',
    nameEn: 'glute bridge',
    section: 'pridane',
    dose: '15×',
    steps: [
      'Lehni si na záda, chodidla na zemi pod koleny.',
      'Paže polož podél těla dlaněmi dolů.',
      'Zapoj hýždě a zvedni boky od země do rovné linie kolena–boky–ramena.',
      'Na vrcholu na chvíli zpevni hýždě.',
      'Pomalu boky spusť zpět a opakuj.',
    ],
    mistakes: [
      'Zaklánění v bedrech – zvedej boky silou hýždí, ne prohnutím zad.',
      'Chodidla moc daleko od těla – patu drž pod koleny.',
    ],
    videoQuery: 'glute bridge exercise proper form',
  },
  {
    id: 'hollow-hold',
    nameCz: 'Hollow hold',
    section: 'pridane',
    dose: '3×15 s → cíl 2×30 s',
    steps: [
      'Lehni si na záda, paže natáhni nad hlavu.',
      'Bedra pevně přitiskni k zemi po celou dobu cviku.',
      'Zvedni ramena a nohy jen nízko nad zem.',
      'Zpevni břicho jako prkno do tvaru mírného „banánu“.',
      'Vydrž a plynule dýchej.',
    ],
    mistakes: [
      'Odlepená bedra od země – to je nejčastější chyba, raději nohy nech výš.',
      'Zvednutí nohou příliš vysoko, což povolí bedra.',
    ],
    videoQuery: 'hollow body hold tutorial',
  },
  {
    id: 'chin-tucks',
    nameCz: 'Zasouvání brady',
    nameEn: 'chin tucks',
    section: 'pridane',
    dose: '8×',
    steps: [
      'Seď nebo stůj vzpřímeně, hleď rovně dopředu.',
      'Zasuň bradu vodorovně dozadu, jako bys dělal „dvojitou bradu“.',
      'Krk zůstává rovný, hlava se nezaklání ani neklopí dolů.',
      'Na chvíli podrž.',
      'Pomalu se vrať do výchozí polohy.',
    ],
    mistakes: [
      'Záklon hlavy nahoru místo vodorovného posunu dozadu.',
      'Přehnaný pohyb; stačí malý, kontrolovaný posun.',
    ],
    videoQuery: 'chin tucks exercise posture',
  },
  {
    id: 'wall-angels',
    nameCz: 'Andělé u zdi',
    nameEn: 'wall angels',
    section: 'mikro',
    dose: '10× pomalu',
    steps: [
      'Opři se zády, hlavou a hýžděmi o zeď.',
      'Paže dej do tvaru „W“ s lokty a zápěstími u zdi.',
      'Pomalu posouvej paže nahoru do tvaru „Y“.',
      'Zápěstí a lokty se snaž udržet co nejblíže zdi.',
      'Vrať se zpět do „W“ a opakuj.',
    ],
    mistakes: [
      'Odlepení dolní části zad od zdi – prohýbání bederní páteře.',
      'Odlepení loktů nebo zápěstí od zdi během pohybu.',
    ],
    videoQuery: 'wall angels exercise proper form',
  },
  {
    id: 'doorway-pec-stretch',
    nameCz: 'Protažení prsních svalů ve dveřích',
    nameEn: 'doorway pec stretch',
    section: 'mikro',
    dose: '30 s',
    steps: [
      'Postav se do dveří, předloktí polož na zárubeň v úrovni ramen.',
      'Loket ohni do pravého úhlu.',
      'Udělej krok vpřed skrz dveře, dokud neucítíš tah na hrudi.',
      'Zůstaň v mírném předklonu trupu, ramena uvolněná.',
      'Vydrž a poté vystřídej druhou stranu.',
    ],
    mistakes: [
      'Zvednutá ramena k uším – drž je uvolněná dole.',
      'Krok příliš velký, který bolí – tah má být příjemný, ne bolest.',
    ],
    videoQuery: 'doorway pec stretch chest stretch',
  },
];

/** YouTube search-results URL for a given query. Search links don't rot like video IDs. */
export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
