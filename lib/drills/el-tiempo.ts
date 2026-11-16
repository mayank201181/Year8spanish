// Procedural skill drills for topic "el-tiempo" (the weather).
import type { Drill, DrillItem } from "./types.ts";
import type { Trap } from "../types.ts";
import { conjugate, acceptedForms, type Person } from "../spanish/verbs.ts";
import { vocab } from "../vocab/el-tiempo.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";

const T = "el-tiempo";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const uniq = (xs: string[]) => [...new Set(xs)];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Capitalised sentence with a full stop (for the displayed model answer). */
const sent = (s: string) => cap(s.trim()) + ".";
const key = (s: string) => stripAccents(normSpanish(s));

/** English variants: "it's" ↔ "it is", "there's" ↔ "there is". */
function enVariants(phrases: string[]): string[] {
  const out: string[] = [];
  for (const p of phrases) {
    out.push(p);
    out.push(p.replace(/\bit's\b/g, "it is").replace(/\bthere's\b/g, "there is"));
  }
  return uniq(out);
}

/**
 * Build a drill item. Traps that would be accepted (or that differ from an
 * accepted answer only by accents) are dropped; at most two are kept.
 */
function mk(prompt: string, accept: string[], solution: string[], hint: string, trapList: Array<[string, string]> = []): DrillItem {
  const acc = uniq(accept);
  const keys = new Set(acc.map(key));
  const traps: Trap[] = [];
  const seen = new Set<string>();
  for (const [t, feedback] of trapList) {
    const k = key(t);
    if (!k || keys.has(k) || seen.has(k)) continue;
    seen.add(k);
    traps.push({ spec: { type: "text", accept: [t] }, feedback });
    if (traps.length >= 2) break;
  }
  return { prompt, answer: { type: "text", accept: acc }, solution, hint, ...(traps.length ? { traps } : {}) };
}

// ---------------------------------------------------------------------------
// Weather lexicon. hacer / estar / ir forms come from the tested conjugator;
// llover, nevar, tronar and haber are impersonal weather verbs that are not in
// the conjugator, so their single (3rd-person) forms are listed here.
// ---------------------------------------------------------------------------

type Family = "hacer" | "estar" | "haber" | "llover" | "nevar" | "tronar";
type WxTense = "present" | "preterite" | "future";

const VA = conjugate("ir", "present", "él"); // va

const IMPERSONAL: Record<"haber" | "llover" | "nevar" | "tronar", { present: string; preterite: string }> = {
  llover: { present: "llueve", preterite: "llovió" },
  nevar: { present: "nieva", preterite: "nevó" },
  tronar: { present: "truena", preterite: "tronó" },
  haber: { present: "hay", preterite: "hubo" },
};

function verbForm(fam: Family, tense: WxTense): string {
  if (fam === "hacer" || fam === "estar") {
    return tense === "future" ? conjugate(fam, "near-future", "él") : conjugate(fam, tense, "él");
  }
  return tense === "future" ? `${VA} a ${fam}` : IMPERSONAL[fam][tense];
}

interface Wx {
  key: string;
  /** Weather symbol ("" = no symbol). */
  sym: string;
  fam: Family;
  /** Words after the verb: "calor", "nublado", "niebla", "" for llueve. */
  tail: string;
  /** Stronger version: "mucho calor", "muy nublado", "mucha niebla", "mucho". */
  strongTail?: string;
  /** Why the strong form uses mucho / mucha / muy. */
  strongWhy?: string;
  /** Progressive alternative in the present: "está lloviendo". */
  alt?: string;
  altStrong?: string;
  en: string[];
  enStrong?: string[];
  enPast: string[];
  enFut: string[];
  /** Predictable wrong present phrases. */
  traps: Array<[string, string]>;
  strongTraps?: Array<[string, string]>;
}

const WX: Wx[] = [
  {
    key: "sol", sym: "☀️", fam: "hacer", tail: "sol", strongTail: "mucho sol",
    strongWhy: "*Sol* is a noun ('sun'), so 'very' is *mucho*, not *muy*.",
    en: ["it's sunny"], enStrong: ["it's very sunny", "it's really sunny"],
    enPast: ["it was sunny"], enFut: ["it's going to be sunny", "it will be sunny"],
    traps: [["está sol", "Sun is weather you feel: use *hace sol*."], ["es sol", "Sun is weather you feel: use *hace sol*."]],
    strongTraps: [["hace muy sol", "*Sol* is a noun, so 'very' is *mucho*: *hace mucho sol*."]],
  },
  {
    key: "calor", sym: "🥵", fam: "hacer", tail: "calor", strongTail: "mucho calor",
    strongWhy: "*Calor* is a noun ('heat'), so 'very' is *mucho*, not *muy*.",
    en: ["it's hot", "it's warm"], enStrong: ["it's very hot", "it's really hot"],
    enPast: ["it was hot", "it was warm"], enFut: ["it's going to be hot", "it will be hot"],
    traps: [["tengo calor", "*Tengo calor* means *I* feel hot. For the weather, use *hace calor*."], ["está calor", "Heat is weather you feel: use *hace calor*."]],
    strongTraps: [["hace muy calor", "*Calor* is a noun ('heat'), so 'very' is *mucho*: *hace mucho calor*."]],
  },
  {
    key: "frio", sym: "🥶", fam: "hacer", tail: "frío", strongTail: "mucho frío",
    strongWhy: "*Frío* here is a noun ('cold'), so 'very' is *mucho*, not *muy*.",
    en: ["it's cold"], enStrong: ["it's very cold", "it's really cold"],
    enPast: ["it was cold"], enFut: ["it's going to be cold", "it will be cold"],
    traps: [["tengo frío", "*Tengo frío* means *I* feel cold. For the weather, use *hace frío*."], ["es frío", "Cold is weather you feel: use *hace frío*."]],
    strongTraps: [["hace muy frío", "*Frío* is a noun here, so 'very' is *mucho*: *hace mucho frío*."]],
  },
  {
    key: "viento", sym: "💨", fam: "hacer", tail: "viento", strongTail: "mucho viento",
    strongWhy: "*Viento* is a noun ('wind'), so 'very' is *mucho*, not *muy*.",
    en: ["it's windy"], enStrong: ["it's very windy", "it's really windy"],
    enPast: ["it was windy"], enFut: ["it's going to be windy", "it will be windy"],
    traps: [["está viento", "Wind is weather you feel: use *hace viento*."], ["es viento", "Wind is weather you feel: use *hace viento*."]],
    strongTraps: [["hace muy viento", "*Viento* is a noun, so 'very' is *mucho*: *hace mucho viento*."]],
  },
  {
    key: "fresco", sym: "🍃", fam: "hacer", tail: "fresco",
    en: ["it's cool", "it's chilly"], enPast: ["it was cool", "it was chilly"],
    enFut: ["it's going to be cool", "it's going to be chilly", "it will be cool", "it will be chilly"],
    traps: [["es fresco", "For cool weather use *hace fresco*."]],
  },
  {
    key: "buen", sym: "🌤️", fam: "hacer", tail: "buen tiempo", strongTail: "muy buen tiempo",
    strongWhy: "*Buen* is an adjective, so 'very' is *muy*: *muy buen tiempo*.",
    en: ["the weather is nice", "the weather is good", "it's nice weather", "it's good weather", "it's nice"],
    enStrong: ["the weather is very nice", "the weather is very good", "it's very nice weather", "it's very good weather"],
    enPast: ["the weather was nice", "the weather was good", "it was nice weather", "it was good weather", "it was nice"],
    enFut: ["the weather is going to be nice", "the weather is going to be good", "it's going to be nice", "it's going to be nice weather", "the weather will be nice", "the weather will be good"],
    traps: [["hace bueno tiempo", "*Bueno* shortens to *buen* before a masculine singular noun: *buen tiempo*."], ["es buen tiempo", "Weather conditions use *hace*: *hace buen tiempo*."]],
    strongTraps: [["hace mucho buen tiempo", "*Buen* is an adjective, so 'very' is *muy*: *hace muy buen tiempo*."]],
  },
  {
    key: "mal", sym: "🌦️", fam: "hacer", tail: "mal tiempo", strongTail: "muy mal tiempo",
    strongWhy: "*Mal* is an adjective, so 'very' is *muy*: *muy mal tiempo*.",
    en: ["the weather is bad", "it's bad weather"], enStrong: ["the weather is very bad", "it's very bad weather"],
    enPast: ["the weather was bad", "it was bad weather"], enFut: ["the weather is going to be bad", "it's going to be bad weather", "the weather will be bad"],
    traps: [["hace malo tiempo", "*Malo* shortens to *mal* before a masculine singular noun: *mal tiempo*."], ["es mal tiempo", "Weather conditions use *hace*: *hace mal tiempo*."]],
    strongTraps: [["hace mucho mal tiempo", "*Mal* is an adjective, so 'very' is *muy*: *hace muy mal tiempo*."]],
  },
  {
    key: "lluvia", sym: "🌧️", fam: "llover", tail: "", strongTail: "mucho", alt: "está lloviendo", altStrong: "está lloviendo mucho",
    strongWhy: "After a verb, 'a lot' is *mucho* — and it never changes.",
    en: ["it's raining", "it rains"], enStrong: ["it's raining a lot", "it rains a lot", "it's raining heavily"],
    enPast: ["it rained", "it was raining"], enFut: ["it's going to rain", "it will rain"],
    traps: [["hace lluvia", "Rain has its own verb, *llover*: 'it rains' is just *llueve*."], ["llove", "*Llover* is an o→ue verb: *llueve*."]],
    strongTraps: [["llueve muy", "*Muy* can't stand alone after a verb: 'a lot' is *mucho* — *llueve mucho*."]],
  },
  {
    key: "nieve", sym: "❄️", fam: "nevar", tail: "", strongTail: "mucho", alt: "está nevando", altStrong: "está nevando mucho",
    strongWhy: "After a verb, 'a lot' is *mucho* — and it never changes.",
    en: ["it's snowing", "it snows"], enStrong: ["it's snowing a lot", "it snows a lot", "it's snowing heavily"],
    enPast: ["it snowed", "it was snowing"], enFut: ["it's going to snow", "it will snow"],
    traps: [["hace nieve", "Snow has its own verb, *nevar*: 'it snows' is just *nieva*."], ["neva", "*Nevar* is an e→ie verb: *nieva*."]],
    strongTraps: [["nieva muy", "*Muy* can't stand alone after a verb: 'a lot' is *mucho* — *nieva mucho*."]],
  },
  {
    key: "nubes", sym: "☁️", fam: "estar", tail: "nublado", strongTail: "muy nublado",
    strongWhy: "*Nublado* is an adjective, so 'very' is *muy*.",
    en: ["it's cloudy"], enStrong: ["it's very cloudy", "it's really cloudy"],
    enPast: ["it was cloudy"], enFut: ["it's going to be cloudy", "it will be cloudy"],
    traps: [["hace nublado", "*Nublado* is an adjective describing the sky, so it goes with *está*: *está nublado*."], ["es nublado", "How the sky looks right now uses *estar*: *está nublado*."]],
    strongTraps: [["está mucho nublado", "*Nublado* is an adjective, so 'very' is *muy*: *está muy nublado*."]],
  },
  {
    key: "despejado", sym: "", fam: "estar", tail: "despejado",
    en: ["it's clear", "the sky is clear"], enPast: ["it was clear", "the sky was clear"],
    enFut: ["it's going to be clear", "the sky is going to be clear", "it will be clear"],
    traps: [["hace despejado", "*Despejado* is an adjective describing the sky: *está despejado*."]],
  },
  {
    key: "tormenta", sym: "⛈️", fam: "haber", tail: "tormenta",
    en: ["there's a storm", "it's stormy"], enPast: ["there was a storm", "it was stormy"],
    enFut: ["there's going to be a storm", "it's going to be stormy", "there will be a storm", "it will be stormy"],
    traps: [["está tormenta", "A storm is something that is there: *hay tormenta*."], ["es tormenta", "A storm is something that is there: *hay tormenta*."]],
  },
  {
    key: "niebla", sym: "🌫️", fam: "haber", tail: "niebla", strongTail: "mucha niebla",
    strongWhy: "*La niebla* is feminine, so *mucho* agrees: *mucha niebla*.",
    en: ["it's foggy", "there's fog"], enStrong: ["it's very foggy", "it's really foggy", "there's a lot of fog"],
    enPast: ["it was foggy", "there was fog"], enFut: ["it's going to be foggy", "there's going to be fog", "it will be foggy"],
    traps: [["está niebla", "Fog is something that is there: *hay niebla*."], ["es niebla", "Fog is something that is there: *hay niebla*."]],
    strongTraps: [["hay mucho niebla", "*La niebla* is feminine, so *mucho* agrees: *hay mucha niebla*."]],
  },
  {
    key: "truena", sym: "🌩️", fam: "tronar", tail: "",
    en: ["it's thundering", "it thunders"], enPast: ["it thundered"], enFut: ["it's going to thunder", "it will thunder"],
    traps: [["trona", "*Tronar* is an o→ue verb: *truena*."]],
  },
];

const W = (k: string): Wx => {
  const w = WX.find((x) => x.key === k);
  if (!w) throw new Error(`unknown weather ${k}`);
  return w;
};

/** Weather phrase in a tense: "hace calor", "llovió mucho", "va a estar nublado". */
function wx(w: Wx, tense: WxTense, strong = false): string {
  const v = verbForm(w.fam, tense);
  const t = strong && w.strongTail ? w.strongTail : w.tail;
  return t ? `${v} ${t}` : v;
}

/** Every accepted present-tense phrase (canonical first). */
function wxPresentAll(w: Wx, strong = false): string[] {
  const out = [wx(w, "present", strong)];
  const alt = strong ? w.altStrong : w.alt;
  if (alt) out.push(alt);
  return out;
}

/** Same trap phrases, in another tense frame is not needed: present traps only. */
function presentTraps(w: Wx, strong: boolean): Array<[string, string]> {
  return strong && w.strongTraps ? [...w.strongTraps, ...w.traps] : w.traps;
}

const INF: Record<Family, string> = { hacer: "hacer", estar: "estar", haber: "haber", llover: "llover", nevar: "nevar", tronar: "tronar" };

function familyExplain(w: Wx): string {
  switch (w.fam) {
    case "hacer":
      return `Weather you feel uses *hace* + noun: *hace ${w.tail}*.`;
    case "estar":
      return `How the sky looks is an adjective, so it goes with *está*: *está ${w.tail}*.`;
    case "haber":
      return `Something that is there uses *hay* + noun: *hay ${w.tail}*.`;
    case "llover":
      return "Rain has its own verb: *llover* (o→ue) → *llueve*.";
    case "nevar":
      return "Snow has its own verb: *nevar* (e→ie) → *nieva*.";
    case "tronar":
      return "Thunder has its own verb: *tronar* (o→ue) → *truena*.";
  }
}

function pastExplain(fam: Family): string {
  switch (fam) {
    case "hacer":
      return `*Hacer* is irregular in the preterite: *hace* → *${verbForm("hacer", "preterite")}* (no accent).`;
    case "estar":
      return `*Estar* is irregular in the preterite: *está* → *${verbForm("estar", "preterite")}* (no accent).`;
    case "haber":
      return "*Haber* is irregular in the preterite: *hay* → *hubo* (no accent).";
    case "llover":
      return "*Llover* is regular in the preterite: *llov-* + *-ió* → *llovió* (no stem change, accent on the ó).";
    case "nevar":
      return "*Nevar* is regular in the preterite: *nev-* + *-ó* → *nevó* (no stem change, accent on the ó).";
    case "tronar":
      return "*Tronar* is regular in the preterite: *tron-* + *-ó* → *tronó* (no stem change, accent on the ó).";
  }
}

/** Wrong preterite forms learners produce, as [wrong verb, feedback]. */
function pastVerbTraps(fam: Family): Array<[string, string]> {
  const pres = verbForm(fam, "present");
  const presFb = `*${pres}* is the present. For the past, use the preterite: *${verbForm(fam, "preterite")}*.`;
  switch (fam) {
    case "hacer":
      return [["hació", "*Hacer* is irregular in the preterite: *hizo*."], [pres, presFb]];
    case "estar":
      return [["estó", "*Estar* is irregular in the preterite: *estuvo*."], [pres, presFb]];
    case "haber":
      return [["habió", "*Haber* is irregular in the preterite: *hubo*."], [pres, presFb]];
    case "llover":
      return [["lluevió", "No stem change in the preterite: the stress moves to the ending, so it's *llovió*."], [pres, presFb]];
    case "nevar":
      return [["nievó", "No stem change in the preterite: the stress moves to the ending, so it's *nevó*."], [pres, presFb]];
    case "tronar":
      return [["truenó", "No stem change in the preterite: the stress moves to the ending, so it's *tronó*."], [pres, presFb]];
  }
}

/** Pairs for two-part weather. The second item is never in the hacer family (avoids "y hizo" → "e hizo"). */
const PAIRS: Array<[string, string]> = [
  ["calor", "tormenta"], ["frio", "nieve"], ["frio", "lluvia"], ["viento", "lluvia"], ["viento", "nubes"],
  ["frio", "niebla"], ["fresco", "nubes"], ["mal", "lluvia"], ["calor", "nubes"], ["nubes", "lluvia"],
  ["tormenta", "lluvia"], ["viento", "nieve"], ["calor", "lluvia"], ["frio", "nubes"], ["niebla", "nubes"],
];

/** "veintiún grados", "un grado", "treinta y tres grados" (n ≥ 0). */
const UNITS = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
  "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve",
  "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve",
];
const TENS: Record<number, string> = { 3: "treinta", 4: "cuarenta" };
function numEs(n: number): string {
  if (n < 30) return UNITS[n];
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${TENS[t]} y ${UNITS[u]}` : TENS[t];
}
function grados(n: number): string {
  if (n === 1) return "un grado";
  let w = numEs(n);
  if (n === 21) w = "veintiún";
  else if (n > 30 && n % 10 === 1) w = w.replace(/uno$/, "un");
  return `${w} grados`;
}
/** All accepted ways to say a temperature (negatives: bajo cero / menos). */
function tempAll(n: number): string[] {
  if (n >= 0) return [grados(n)];
  const g = grados(-n);
  return [`${g} bajo cero`, `menos ${g}`];
}
function tempTraps(n: number): Array<[string, string]> {
  const a = Math.abs(n);
  const out: Array<[string, string]> = [];
  const suffix = n < 0 ? " bajo cero" : "";
  if (a === 1) out.push([`uno grados${suffix}`, "One degree is singular and *uno* shortens before a masculine noun: *un grado*."]);
  if (a === 21) out.push([`veintiuno grados${suffix}`, "Before a masculine noun like *grados*, *veintiuno* shortens to *veintiún* (with an accent)."]);
  if (a > 30 && a % 10 === 1) out.push([`${numEs(a)} grados${suffix}`, `Before a masculine noun like *grados*, *uno* shortens to *un*: *${grados(a)}*.`]);
  if (a >= 16 && a <= 19) out.push([`diez y ${UNITS[a - 10]} grados${suffix}`, `16–19 are written as one word: *${UNITS[a]}*.`]);
  if (a >= 22 && a <= 29) out.push([`veinte y ${UNITS[a - 20]} grados${suffix}`, `21–29 are written as one word: *${UNITS[a]}*.`]);
  return out;
}

// Regions and cities.
const REGIONS_MAIN = [
  { es: "norte", en: "north" }, { es: "sur", en: "south" }, { es: "este", en: "east" },
  { es: "oeste", en: "west" }, { es: "centro", en: "centre" },
] as const;
const REGIONS_MIX = [
  { es: "noreste", en: "north-east" }, { es: "noroeste", en: "north-west" },
  { es: "sureste", en: "south-east" }, { es: "suroeste", en: "south-west" },
] as const;
const CITIES = [
  { city: "Bilbao", r: "norte", en: "north" }, { city: "Santander", r: "norte", en: "north" }, { city: "Oviedo", r: "norte", en: "north" },
  { city: "Santiago de Compostela", r: "noroeste", en: "north-west" }, { city: "A Coruña", r: "noroeste", en: "north-west" },
  { city: "Barcelona", r: "noreste", en: "north-east" }, { city: "Zaragoza", r: "noreste", en: "north-east" },
  { city: "Madrid", r: "centro", en: "centre" }, { city: "Toledo", r: "centro", en: "centre" },
  { city: "Valencia", r: "este", en: "east" }, { city: "Castellón", r: "este", en: "east" },
  { city: "Alicante", r: "sureste", en: "south-east" }, { city: "Murcia", r: "sureste", en: "south-east" },
  { city: "Sevilla", r: "sur", en: "south" }, { city: "Málaga", r: "sur", en: "south" }, { city: "Granada", r: "sur", en: "south" },
  { city: "Huelva", r: "suroeste", en: "south-west" }, { city: "Badajoz", r: "oeste", en: "west" }, { city: "Cáceres", r: "oeste", en: "west" },
] as const;

/** Sensible temperature range for each weather on a map. */
const TEMP_RANGE: Record<string, [number, number]> = {
  sol: [18, 35], calor: [28, 41], frio: [2, 9], viento: [12, 24], lluvia: [10, 21],
  nieve: [0, 3], nubes: [12, 22], tormenta: [20, 31], niebla: [5, 14],
};

// Seasons and months straight from the topic vocab.
const SM = vocab.find((g) => g.title === "Seasons and months")?.items ?? [];
const SEASONS = SM.filter((i) => /^(la|el) /.test(i.es) && i.es !== "la estación");
const MONTHS = SM.filter((i) => !/^(la|el) /.test(i.es));
const MONTH_CONFUSE: Record<string, string> = { junio: "julio", julio: "junio", marzo: "mayo", mayo: "marzo" };
const SEASON_OF: Record<string, string> = {
  enero: "el invierno", febrero: "el invierno", abril: "la primavera", mayo: "la primavera",
  julio: "el verano", agosto: "el verano", octubre: "el otoño", noviembre: "el otoño",
};
const OPPOSITE: Record<string, string> = { "el invierno": "el verano", "el verano": "el invierno", "la primavera": "el otoño", "el otoño": "la primavera" };
const bareNoun = (es: string) => es.replace(/^(el|la) /, "");

// Activities for cuando / si sentences.
interface Act { inf: string; rest: string; en: [string, string]; wx: string[] }
const ACTS: Act[] = [
  { inf: "ver", rest: "la tele", en: ["watch TV", "watches TV"], wx: ["lluvia", "frio", "mal"] },
  { inf: "ir", rest: "a la playa", en: ["go to the beach", "goes to the beach"], wx: ["sol", "calor", "buen"] },
  { inf: "nadar", rest: "en la piscina", en: ["swim in the pool", "swims in the pool"], wx: ["sol", "calor"] },
  { inf: "jugar", rest: "al fútbol", en: ["play football", "plays football"], wx: ["sol", "buen", "fresco"] },
  { inf: "leer", rest: "un libro", en: ["read a book", "reads a book"], wx: ["lluvia", "frio", "mal", "viento"] },
  { inf: "quedarse", rest: "en casa", en: ["stay at home", "stays at home"], wx: ["lluvia", "frio", "mal", "viento"] },
  { inf: "dar", rest: "un paseo", en: ["go for a walk", "goes for a walk"], wx: ["sol", "buen", "fresco"] },
  { inf: "montar", rest: "en bici", en: ["ride a bike", "rides a bike"], wx: ["sol", "buen"] },
  { inf: "esquiar", rest: "en la montaña", en: ["ski in the mountains", "skis in the mountains"], wx: ["nieve", "frio"] },
  { inf: "ir", rest: "al centro comercial", en: ["go to the shopping centre", "goes to the shopping centre"], wx: ["lluvia", "calor", "mal"] },
  { inf: "jugar", rest: "a los videojuegos", en: ["play video games", "plays video games"], wx: ["lluvia", "frio", "mal"] },
];
const WHEN_EN: Record<string, string> = { lluvia: "it rains", nieve: "it snows" };
const NAMES = ["Lucía", "Pablo", "Diego", "Wei Ling", "Arjun", "Sofía", "Mei", "Javier", "Priya", "Marcus"];
const PRON_RE = /^(yo|tú|él|ella|usted|nosotros|nosotras|vosotros|vosotras|ellos|ellas|ustedes) /;
const bareForms = (inf: string, tense: "present" | "near-future", p: Person) =>
  acceptedForms(inf, tense, p).filter((f) => !PRON_RE.test(f));

// Time phrases.
interface TimeP { es: string; en: string; tense: WxTense }
const TIMES: TimeP[] = [
  { es: "ayer", en: "yesterday", tense: "preterite" },
  { es: "hoy", en: "today", tense: "present" },
  { es: "mañana", en: "tomorrow", tense: "future" },
  { es: "el fin de semana pasado", en: "last weekend", tense: "preterite" },
  { es: "el fin de semana que viene", en: "next weekend", tense: "future" },
];
const PLACES = ["en el norte", "en el sur", "en Madrid", "en Sevilla", "en Bilbao", "en Singapur", "en la costa", "en los Pirineos"];

const TENSE_NAME: Record<WxTense, string> = { preterite: "the preterite (past)", present: "the present", future: "the immediate future (*va a* + infinitive)" };

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ------------------------------------------------------------------------
  {
    id: "el-tiempo.weather-from-symbol",
    topicId: T,
    title: "Weather expressions: from symbol to Spanish",
    level: 1,
    guideRef: "weather-expressions",
    generate(rng, tier) {
      const pool = WX.filter((w) => w.sym && (tier >= 2 || w.key !== "truena"));
      if (tier === 3 && rng.bool(0.6)) {
        const [ka, kb] = rng.pick(PAIRS);
        const a = W(ka), b = W(kb);
        const strong = !!a.strongTail && rng.bool(0.4);
        const as = wxPresentAll(a, strong), bs = wxPresentAll(b);
        const acc: string[] = [];
        for (const x of as) for (const y of bs) acc.push(`${x} y ${y}`, `${y} y ${x}`);
        acc[0] = sent(acc[0]);
        const enA = strong ? a.enStrong![0] : a.en[0];
        const symA = strong ? a.sym + a.sym : a.sym;
        return mk(
          `Write the weather in Spanish, joining the two parts with *y*: ${symA} + ${b.sym} — ${enA} and ${b.en[0]}.`,
          acc,
          [strong ? a.strongWhy! : familyExplain(a), familyExplain(b), `Join them with *y*: **${acc[0]}**`],
          "Do each symbol on its own first — which family is it: *hace*, *está*, *hay* or a weather verb?",
          presentTraps(a, strong).map(([t, fb]) => [`${t} y ${bs[0]}`, fb] as [string, string]),
        );
      }
      const strong = tier >= 2 && rng.bool(0.55);
      const w = rng.pick(strong ? pool.filter((x) => x.strongTail) : pool);
      const acc = wxPresentAll(w, strong);
      const sym = strong ? w.sym + w.sym : w.sym;
      const en = strong ? w.enStrong![0] : w.en[0];
      const frame = rng.int(0, 2);
      const prompt =
        frame === 0 ? `Look at the symbol and write the weather in Spanish: ${sym} — ${en}.`
        : frame === 1 ? `Your exchange partner asks *¿Qué tiempo hace?* Answer in Spanish for ${sym} (${en}).`
        : `Weather report: ${sym} ${en}. How do you say it in Spanish?`;
      const sol = [familyExplain(w)];
      if (strong) sol.push(w.strongWhy!);
      sol.push(`**${cap(acc[0])}.**${acc[1] ? ` (Also: *${acc[1]}*.)` : ""}`);
      return mk(
        prompt,
        acc,
        sol,
        strong ? "Is the weather word a noun (use *mucho/mucha*) or an adjective (use *muy*)?" : "Four families: *hace* + noun, a weather verb, *está* + adjective, *hay* + noun. Which fits?",
        presentTraps(w, strong),
      );
    },
  },

  // 2 ------------------------------------------------------------------------
  {
    id: "el-tiempo.weather-to-english",
    topicId: T,
    title: "Understand weather expressions (Spanish → English)",
    level: 1,
    guideRef: "weather-expressions",
    generate(rng, tier) {
      const r = rng.next();
      const mode: "present" | "strong" | "past" | "future" =
        tier === 1 ? "present" : tier === 2 ? (r < 0.5 ? "strong" : "present") : r < 0.4 ? "past" : r < 0.8 ? "future" : "strong";
      const pool = mode === "strong" ? WX.filter((w) => w.strongTail && w.enStrong) : WX;
      const w = rng.pick(pool);
      let es: string, en: string[], sol: string[], trapList: Array<[string, string]> = [];
      if (mode === "past") {
        es = wx(w, "preterite");
        en = w.enPast;
        sol = [pastExplain(w.fam), `Past → English: **${en[0]}**.`];
        trapList = [[w.en[0], `*${cap(es)}* is the preterite, so it's about the past: '${en[0]}'.`]];
      } else if (mode === "future") {
        es = wx(w, "future");
        en = w.enFut;
        sol = [`*${VA} a* + infinitive (*${INF[w.fam]}*) means 'is going to'.`, `So: **${en[0]}**.`];
        trapList = [[w.en[0], `*${VA} a* + infinitive is about the future: '${en[0]}'.`]];
      } else if (mode === "strong") {
        es = wx(w, "present", true);
        en = w.enStrong!;
        sol = [familyExplain(w), w.strongWhy!, `So: **${en[0]}**.`];
        trapList = [[w.en[0], `Don't drop the *${w.strongTail!.split(" ")[0]}* — it makes the weather stronger: '${en[0]}'.`]];
      } else {
        const all = wxPresentAll(w);
        es = all.length > 1 && rng.bool(0.3) ? all[1] : all[0];
        en = w.en;
        sol = [familyExplain(w), `So: **${en[0]}**.`];
        if (w.key === "fresco") trapList = [["it's fresh", "*Fresco* about the weather means cool or chilly, not fresh."]];
        if (w.key === "buen" || w.key === "mal") trapList = [[w.key === "buen" ? "it's good time" : "it's bad time", "Here *tiempo* means weather, not time."]];
      }
      const frame = rng.int(0, 2);
      const prompt =
        frame === 0 ? `What does *${cap(es)}* mean in English?`
        : frame === 1 ? `Translate into English: *${cap(es)}.*`
        : `A Spanish weather app says *${cap(es)}.* What does it mean in English?`;
      return mk(
        prompt,
        enVariants(en),
        sol,
        mode === "past" || mode === "future" ? "Look at the verb first: present, preterite (past) or *va a* + infinitive (future)?" : "Think of the four families: *hace* + noun, a weather verb, *está* + adjective, *hay* + noun.",
        trapList,
      );
    },
  },

  // 3 ------------------------------------------------------------------------
  {
    id: "el-tiempo.seasons-and-months",
    topicId: T,
    title: "Seasons and months (Spanish ↔ English)",
    level: 1,
    guideRef: "seasons-and-months",
    generate(rng, tier) {
      const modes = tier === 1 ? ["s2e", "e2s"] : tier === 2 ? ["s2e", "e2s", "in", "next"] : ["season-of", "in", "next", "e2s"];
      const mode = rng.pick(modes);
      const useSeason = rng.bool(0.35);
      if (mode === "season-of") {
        const m = rng.pick(Object.keys(SEASON_OF));
        const s = SEASON_OF[m];
        const sEn = SEASONS.find((x) => x.es === s)!.en;
        return mk(
          `In Spain, which season is *${m}* in? Write the season in Spanish, with *el* or *la*.`,
          [s],
          [`*${cap(m)}* = ${MONTHS.find((x) => x.es === m)!.en}.`, `In Spain (northern hemisphere) that's ${sEn}: **${s}**.`],
          "Translate the month first, then think about the weather in Spain that month.",
          [[OPPOSITE[s], `That's the season in ${m} south of the equator (Argentina, Chile, Australia). Spain is in the north, so it's *${s}*.`]],
        );
      }
      if (mode === "next") {
        const i = rng.int(0, 11);
        const back = tier === 3 && rng.bool(0.5);
        const target = MONTHS[back ? (i + 11) % 12 : (i + 1) % 12];
        return mk(
          `Which month comes ${back ? "before" : "after"} *${MONTHS[i].es}*? Write it in Spanish.`,
          [target.es, ...(target.es === "septiembre" ? ["setiembre"] : [])],
          [`*${cap(MONTHS[i].es)}* = ${MONTHS[i].en}.`, `The month ${back ? "before" : "after"} is ${target.en}: **${target.es}** (small letter).`],
          "Say the months in order aloud: enero, febrero, marzo…",
        );
      }
      if (useSeason) {
        const s = rng.pick(SEASONS);
        const noun = bareNoun(s.es);
        const fem = s.es.startsWith("la ");
        const wrongArt = `${fem ? "el" : "la"} ${noun}`;
        const genderFb = `*${cap(noun)}* is ${fem ? "feminine" : "masculine"}: *${s.es}*.`;
        if (mode === "s2e") {
          const en = [s.en, `the ${s.en}`, ...(s.en === "autumn" ? ["fall", "the fall"] : [])];
          return mk(`What does *${s.es}* mean in English?`, en, [`*${cap(s.es)}* = **${s.en}**.`, "Seasons are written with a small letter in Spanish."], "Think of the weather in each season in Spain.");
        }
        if (mode === "e2s") {
          return mk(`Write the Spanish for **${s.en}**. Include *el* or *la*.`, [s.es], [`${cap(s.en)} = *${noun}*, which is ${fem ? "feminine" : "masculine"}.`, `**${s.es}**`], "Learn each season with its article.", [[wrongArt, genderFb]]);
        }
        return mk(
          `Write in Spanish: **in ${s.en}**.`,
          [`en ${noun}`, `en ${s.es}`],
          [`'In' + season = *en* + season (the article is optional).`, `**en ${noun}** (or *en ${s.es}*)`],
          "Use *en*, just like 'in'.",
          [[`en ${wrongArt}`, genderFb]],
        );
      }
      const m = rng.pick(MONTHS);
      const conf = MONTH_CONFUSE[m.es];
      const confEn = conf ? MONTHS.find((x) => x.es === conf)!.en : "";
      const alt = m.es === "septiembre" ? ["setiembre"] : [];
      if (mode === "s2e") {
        return mk(
          `What does *${m.es}* mean in English?`,
          [m.en],
          [`*${cap(m.es)}* = **${m.en}**.`, "Months are lowercase in Spanish but capitalised in English."],
          "Many months are cognates — say it aloud.",
          conf ? [[confEn, `Careful: *${conf}* is ${confEn}; *${m.es}* is ${m.en}.`]] : [],
        );
      }
      if (mode === "e2s") {
        return mk(
          `How do you say **${m.en}** in Spanish?`,
          [m.es, ...alt],
          [`${m.en} = **${m.es}**.`, "Months are written with a small letter in Spanish."],
          "Many months are cognates — think of how it sounds in English.",
          conf ? [[conf, `Careful: *${conf}* is ${confEn}. ${m.en} is *${m.es}*.`]] : [],
        );
      }
      return mk(
        `Write in Spanish: **in ${m.en}**.`,
        [`en ${m.es}`, ...alt.map((a) => `en ${a}`)],
        [`'In' + month = *en* + month (no article).`, `**en ${m.es}** (small letter).`],
        "Use *en*, just like 'in'.",
        conf ? [[`en ${conf}`, `Careful: *${conf}* is ${confEn}. ${m.en} is *${m.es}*.`]] : [],
      );
    },
  },

  // 4 ------------------------------------------------------------------------
  {
    id: "el-tiempo.mucho-or-muy",
    topicId: T,
    title: "Mucho, mucha or muy? Stronger weather",
    level: 2,
    guideRef: "weather-expressions",
    generate(rng, tier) {
      interface Gap { s: string; a: string; why: string; wrong: string; wrongFb: string; t: 1 | 2 }
      const nounWhy = (n: string) => `*${n}* is a noun, so 'very' is *mucho* ('a lot of').`;
      const adjWhy = (a: string) => `*${a}* is an adjective, so use *muy* ('very').`;
      const G: Gap[] = [
        { s: "En Sevilla, en agosto hace ___ calor.", a: "mucho", why: nounWhy("Calor"), wrong: "muy", wrongFb: "*Calor* is a noun, so it's *mucho calor* — never *muy calor*.", t: 1 },
        { s: "Hoy hace ___ calor y voy a la playa.", a: "mucho", why: nounWhy("Calor"), wrong: "muy", wrongFb: "*Calor* is a noun, so it's *mucho calor* — never *muy calor*.", t: 1 },
        { s: "En Singapur hace ___ calor todo el año.", a: "mucho", why: nounWhy("Calor"), wrong: "muy", wrongFb: "*Calor* is a noun, so it's *mucho calor* — never *muy calor*.", t: 1 },
        { s: "En los Pirineos hace ___ frío en invierno.", a: "mucho", why: nounWhy("Frío"), wrong: "muy", wrongFb: "In *hace frío*, *frío* is a noun, so it's *mucho frío*.", t: 1 },
        { s: "Hoy hace ___ frío, así que me quedo en casa.", a: "mucho", why: nounWhy("Frío"), wrong: "muy", wrongFb: "In *hace frío*, *frío* is a noun, so it's *mucho frío*.", t: 1 },
        { s: "En la costa hace ___ viento esta tarde.", a: "mucho", why: nounWhy("Viento"), wrong: "muy", wrongFb: "*Viento* is a noun, so it's *mucho viento*.", t: 1 },
        { s: "Hoy hace ___ sol en Málaga.", a: "mucho", why: nounWhy("Sol"), wrong: "muy", wrongFb: "*Sol* is a noun, so it's *mucho sol*.", t: 1 },
        { s: "Hoy está ___ nublado en Bilbao.", a: "muy", why: adjWhy("Nublado"), wrong: "mucho", wrongFb: "*Nublado* is an adjective, so it takes *muy*: *muy nublado*.", t: 1 },
        { s: "El cielo está ___ nublado esta mañana.", a: "muy", why: adjWhy("Nublado"), wrong: "mucho", wrongFb: "*Nublado* is an adjective, so it takes *muy*: *muy nublado*.", t: 1 },
        { s: "En primavera hace ___ buen tiempo en Valencia.", a: "muy", why: adjWhy("Buen"), wrong: "mucho", wrongFb: "*Buen* is an adjective, so it takes *muy*: *muy buen tiempo*.", t: 1 },
        { s: "En mayo hace ___ buen tiempo en Madrid.", a: "muy", why: adjWhy("Buen"), wrong: "mucho", wrongFb: "*Buen* is an adjective, so it takes *muy*: *muy buen tiempo*.", t: 1 },
        { s: "Hoy hace ___ mal tiempo en el norte.", a: "muy", why: adjWhy("Mal"), wrong: "mucho", wrongFb: "*Mal* is an adjective, so it takes *muy*: *muy mal tiempo*.", t: 1 },
        { s: "En Singapur hay ___ humedad.", a: "mucha", why: "*La humedad* is feminine, so *mucho* agrees: *mucha*.", wrong: "mucho", wrongFb: "*Humedad* is feminine (*la humedad*), so *mucho* must agree: *mucha*.", t: 2 },
        { s: "Esta mañana hay ___ niebla en Madrid.", a: "mucha", why: "*La niebla* is feminine, so *mucho* agrees: *mucha*.", wrong: "mucho", wrongFb: "*Niebla* is feminine (*la niebla*), so *mucho* must agree: *mucha*.", t: 2 },
        { s: "Hay ___ niebla en la montaña.", a: "mucha", why: "*La niebla* is feminine, so *mucho* agrees: *mucha*.", wrong: "mucho", wrongFb: "*Niebla* is feminine (*la niebla*), so *mucho* must agree: *mucha*.", t: 2 },
        { s: "Hoy hay ___ nubes en el cielo.", a: "muchas", why: "*Las nubes* is feminine plural, so *mucho* agrees: *muchas*.", wrong: "mucho", wrongFb: "*Nubes* is feminine plural (*las nubes*), so *mucho* must agree: *muchas*.", t: 2 },
        { s: "En el norte hay ___ nubes hoy.", a: "muchas", why: "*Las nubes* is feminine plural, so *mucho* agrees: *muchas*.", wrong: "mucho", wrongFb: "*Nubes* is feminine plural (*las nubes*), so *mucho* must agree: *muchas*.", t: 2 },
        { s: "En Singapur llueve ___ en diciembre.", a: "mucho", why: "After a verb, 'a lot' is *mucho*, and it never changes.", wrong: "muy", wrongFb: "*Muy* can't stand alone after a verb: 'it rains a lot' is *llueve mucho*.", t: 2 },
        { s: "En el norte de España llueve ___.", a: "mucho", why: "After a verb, 'a lot' is *mucho*, and it never changes.", wrong: "muy", wrongFb: "*Muy* can't stand alone after a verb: 'it rains a lot' is *llueve mucho*.", t: 2 },
        { s: "En los Pirineos nieva ___ en enero.", a: "mucho", why: "After a verb, 'a lot' is *mucho*, and it never changes.", wrong: "muy", wrongFb: "*Muy* can't stand alone after a verb: 'it snows a lot' is *nieva mucho*.", t: 2 },
      ];
      const DOUBLE: Array<{ s: string; a: [string, string]; why: [string, string] }> = [
        { s: "Hoy hace ___ calor, pero está ___ nublado.", a: ["mucho", "muy"], why: [nounWhy("Calor"), adjWhy("Nublado")] },
        { s: "En el norte hay ___ niebla y hace ___ frío.", a: ["mucha", "mucho"], why: ["*La niebla* is feminine: *mucha*.", nounWhy("Frío")] },
        { s: "En invierno nieva ___ y hace ___ mal tiempo.", a: ["mucho", "muy"], why: ["After a verb, 'a lot' is *mucho*.", adjWhy("Mal")] },
        { s: "Hoy hay ___ nubes y llueve ___.", a: ["muchas", "mucho"], why: ["*Las nubes* is feminine plural: *muchas*.", "After a verb, 'a lot' is *mucho*."] },
        { s: "En Singapur hace ___ calor y hay ___ humedad.", a: ["mucho", "mucha"], why: [nounWhy("Calor"), "*La humedad* is feminine: *mucha*."] },
        { s: "Está ___ nublado y hace ___ viento.", a: ["muy", "mucho"], why: [adjWhy("Nublado"), nounWhy("Viento")] },
        { s: "En la montaña hace ___ frío y hay ___ niebla.", a: ["mucho", "mucha"], why: [nounWhy("Frío"), "*La niebla* is feminine: *mucha*."] },
        { s: "En verano hace ___ buen tiempo y hace ___ sol.", a: ["muy", "mucho"], why: [adjWhy("Buen"), nounWhy("Sol")] },
      ];
      if (tier === 3 && rng.bool(0.6)) {
        const d = rng.pick(DOUBLE);
        const filled = d.s.replace("___", d.a[0]).replace("___", d.a[1]);
        const swap = d.a[0] === "muy" ? "mucho" : "muy";
        return mk(
          `Fill both gaps with *mucho, mucha, muchas* or *muy*. Write the two words in order, separated by a comma: *${d.s}*`,
          [`${d.a[0]}, ${d.a[1]}`],
          [`Gap 1: ${d.why[0]}`, `Gap 2: ${d.why[1]}`, `**${filled}**`],
          "For each gap ask: is the next word a noun (*mucho/mucha/muchas*), an adjective (*muy*), or is there a verb before it (*mucho*)?",
          [[`${swap}, ${d.a[1]}`, d.a[0] === "muy" ? `Gap 1: ${d.why[0]}` : `Gap 1: ${d.why[0]} Never *muy* here.`]],
        );
      }
      const g = rng.pick(G.filter((x) => x.t <= tier));
      const intro = rng.bool() ? "Fill the gap with *mucho, mucha, muchas* or *muy*:" : "Which word completes the sentence — *mucho, mucha, muchas* or *muy*?";
      return mk(
        `${intro} *${g.s}*`,
        [g.a],
        [g.why, `**${g.a}**: *${g.s.replace("___", g.a)}*`],
        "Look at the word after the gap: is it a noun (and which gender?), an adjective, or is the gap after a verb?",
        [[g.wrong, g.wrongFb]],
      );
    },
  },

  // 5 ------------------------------------------------------------------------
  {
    id: "el-tiempo.climate-sentences",
    topicId: T,
    title: "Climate: en verano hace calor",
    level: 2,
    guideRef: "seasons-and-months",
    generate(rng, tier) {
      const SEASON_WX: Record<string, string[]> = {
        "el invierno": ["frio", "nieve", "viento"],
        "la primavera": ["buen", "lluvia", "fresco"],
        "el verano": ["calor", "sol", "buen"],
        "el otoño": ["viento", "lluvia", "fresco", "mal"],
      };
      const MONTH_WX: Record<string, string[]> = {
        enero: ["frio", "nieve"], febrero: ["frio", "viento"], marzo: ["viento", "lluvia"], abril: ["lluvia", "buen"],
        mayo: ["buen", "sol"], junio: ["calor", "sol"], julio: ["calor", "sol"], agosto: ["calor", "sol"],
        octubre: ["lluvia", "viento"], noviembre: ["lluvia", "frio"], diciembre: ["frio", "nieve"],
      };
      const SEASON_CONFUSE: Record<string, string> = { "el invierno": "verano", "el verano": "invierno", "la primavera": "otoño", "el otoño": "primavera" };
      const r = rng.next();
      const mode = tier === 1 ? "season" : tier === 2 ? (r < 0.4 ? "season" : r < 0.75 ? "month" : "sg") : r < 0.5 ? "two" : r < 0.75 ? "month" : "sg";

      if (mode === "sg") {
        const opts = [
          { en: "In Singapore it's always hot.", acc: ["en Singapur siempre hace calor", "siempre hace calor en Singapur", "en Singapur hace calor siempre"], sol: "*siempre* (always) goes before the verb: *siempre hace calor*." },
          { en: "In Singapore it rains a lot.", acc: ["en Singapur llueve mucho", "llueve mucho en Singapur"], sol: "*llover* → *llueve*; 'a lot' after a verb = *mucho*." },
          { en: "In Singapore it never snows.", acc: ["en Singapur nunca nieva", "nunca nieva en Singapur", "en Singapur no nieva nunca", "no nieva nunca en Singapur"], sol: "*nunca* goes before the verb (*nunca nieva*), or use *no … nunca* round it." },
          { en: "In Singapore it's always very hot.", acc: ["en Singapur siempre hace mucho calor", "siempre hace mucho calor en Singapur", "en Singapur hace mucho calor siempre"], sol: "*siempre* before the verb; 'very hot' = *mucho calor*." },
          { en: "In Singapore it rains a lot in December.", acc: ["en Singapur llueve mucho en diciembre", "en diciembre llueve mucho en Singapur", "llueve mucho en Singapur en diciembre", "llueve mucho en diciembre en Singapur", "en Singapur en diciembre llueve mucho", "en diciembre en Singapur llueve mucho"], sol: "*llueve mucho*; 'in December' = *en diciembre* (small letter)." },
          { en: "In Singapore there are no seasons, but it rains a lot.", acc: ["en Singapur no hay estaciones pero llueve mucho", "no hay estaciones en Singapur pero llueve mucho"], sol: "'There are no seasons' = *no hay estaciones* (no article after *no hay*)." },
        ];
        const o = rng.pick(opts);
        const acc = [sent(o.acc[0]), ...o.acc.slice(1)];
        return mk(
          `Write in Spanish: **${o.en}**`,
          acc,
          [o.sol, `**${acc[0]}**`],
          "Start with *En Singapur* — then the weather expression.",
          o.acc[0].includes("mucho calor") ? [[o.acc[0].replace("mucho calor", "muy calor"), "*Calor* is a noun, so 'very' is *mucho*: *mucho calor*."]] : [],
        );
      }

      if (mode === "month") {
        const m = rng.pick(Object.keys(MONTH_WX));
        const w = W(rng.pick(MONTH_WX[m]));
        const strong = tier === 3 && !!w.strongTail && rng.bool(0.4);
        const mEn = MONTHS.find((x) => x.es === m)!.en;
        const wEn = strong ? w.enStrong![0] : (w.key === "lluvia" || w.key === "nieve") ? w.en[1] : w.en[0];
        const ws = wxPresentAll(w, strong);
        const acc: string[] = [];
        for (const p of ws) acc.push(`en ${m} ${p}`, `${p} en ${m}`);
        acc[0] = sent(acc[0]);
        const conf = MONTH_CONFUSE[m];
        return mk(
          `Describe the usual weather in Spain. Write in Spanish: **In ${mEn} ${wEn}.**`,
          acc,
          [`'In ${mEn}' = *en ${m}* — small letter, no article.`, strong ? `${familyExplain(w)} ${w.strongWhy}` : familyExplain(w), `**${acc[0]}**`],
          "Time phrase first (*en* + month), then the weather expression.",
          [
            ...(conf ? [[`en ${conf} ${ws[0]}`, `Careful: *${conf}* is ${MONTHS.find((x) => x.es === conf)!.en}. ${mEn} is *${m}*.`] as [string, string]] : []),
            ...presentTraps(w, strong).map(([t, fb]) => [`en ${m} ${t}`, fb] as [string, string]),
          ],
        );
      }

      const s = rng.pick(SEASONS);
      const noun = bareNoun(s.es);
      const SE = [`en ${noun}`, `en ${s.es}`];
      if (mode === "two") {
        const ks = rng.shuffle(SEASON_WX[s.es]).slice(0, 2);
        const a = W(ks[0]), b = W(ks[1]);
        const as = wxPresentAll(a), bs = wxPresentAll(b);
        const acc: string[] = [];
        for (const t of SE) for (const x of as) for (const y of bs) acc.push(`${t} ${x} y ${y}`, `${x} y ${y} ${t}`, `${t} ${y} y ${x}`, `${y} y ${x} ${t}`);
        acc[0] = sent(acc[0]);
        const whenEn = (w: Wx) => (w.key === "lluvia" || w.key === "nieve" ? w.en[1] : w.en[0]);
        return mk(
          `Write in Spanish: **In ${s.en} ${whenEn(a)} and ${whenEn(b)}.**`,
          acc,
          [`'In ${s.en}' = *en ${noun}* (or *en ${s.es}*).`, `${familyExplain(a)} ${familyExplain(b)}`, `**${acc[0]}**`],
          "Season first (*en* + season), then the two weather expressions joined with *y*.",
          [[`en ${SEASON_CONFUSE[s.es]} ${as[0]} y ${bs[0]}`, `Check the season: *${SEASON_CONFUSE[s.es]}* isn't ${s.en}. ${cap(s.en)} is *${noun}*.`]],
        );
      }
      const w = W(rng.pick(SEASON_WX[s.es]));
      const ws = wxPresentAll(w);
      const acc: string[] = [];
      for (const t of SE) for (const p of ws) acc.push(`${t} ${p}`, `${p} ${t}`);
      acc[0] = sent(acc[0]);
      const wEn = w.key === "lluvia" || w.key === "nieve" ? w.en[1] : w.en[0];
      return mk(
        `${rng.bool() ? "Write in Spanish" : "Describe the climate in Spain. Write in Spanish"}: **In ${s.en} ${wEn}.**`,
        acc,
        [`'In ${s.en}' = *en ${noun}* (small letter; *en ${s.es}* is fine too).`, familyExplain(w), `**${acc[0]}**`],
        "Season first (*en* + season), then the weather expression.",
        [
          [`en ${SEASON_CONFUSE[s.es]} ${ws[0]}`, `Check the season: *${SEASON_CONFUSE[s.es]}* isn't ${s.en}. ${cap(s.en)} is *${noun}*.`],
          ...w.traps.map(([t, fb]) => [`en ${noun} ${t}`, fb] as [string, string]),
        ],
      );
    },
  },

  // 6 ------------------------------------------------------------------------
  {
    id: "el-tiempo.temperatures",
    topicId: T,
    title: "Temperatures in words: veintiún grados",
    level: 2,
    guideRef: "weather-map",
    generate(rng, tier) {
      let n: number;
      if (tier === 1) n = rng.int(0, 20);
      else if (tier === 2) n = rng.bool(0.25) ? rng.pick([21, 31]) : rng.int(14, 40);
      else n = rng.bool(0.35) ? -rng.int(1, 10) : rng.bool(0.3) ? rng.pick([21, 31, 41]) : rng.int(16, 45);
      const temps = tempAll(n);
      const r = rng.next();
      const mode = tier === 1 ? (r < 0.6 ? "words" : "hace") : tier === 2 ? (r < 0.4 ? "words" : r < 0.7 ? "hace" : "max") : r < 0.35 ? "words" : r < 0.6 ? "hace" : "max";
      const numStep =
        n < 0 ? `Below zero: *${temps[0]}* (or *${temps[1]}*).`
        : Math.abs(n) % 10 === 1 && n > 20 ? `${n} = *${numEs(n)}*, but before a masculine noun *uno* shortens: *${grados(n)}*.`
        : n === 1 ? "1 degree is singular: *un grado*."
        : `${n} = *${numEs(n)}* → *${grados(n)}*.`;
      const tt = tempTraps(n);
      if (mode === "words") {
        return mk(
          `Write this temperature in Spanish words: **${n} °C**. (Write it as *… grados*.)`,
          temps,
          [numStep, `**${temps[0]}**`],
          n < 0 ? "Say the number, then *grados bajo cero* — or start with *menos*." : "Say the number first, then *grados*. Watch numbers ending in 1.",
          [...tt, [`${n} grados`, "Write the number in words, not digits."]],
        );
      }
      if (mode === "hace") {
        const acc = temps.flatMap((t) => [`hace ${t}`, `estamos a ${t}`]);
        acc[0] = sent(acc[0]);
        return mk(
          `Write in Spanish: **It's ${n} degrees.** (${n} °C — write the number in words.)`,
          acc,
          ["Temperature uses *hace* (or *estamos a*): *hace* + number + *grados*.", numStep, `**${acc[0]}**`],
          "Which verb do you use for weather you feel? Then write the number in words.",
          [...tt.map(([t, fb]) => [`hace ${t}`, fb] as [string, string]), [`es ${temps[0]}`, "For the temperature use *hace*: *hace … grados*."]],
        );
      }
      const max = n >= 15 || (n >= 0 && rng.bool(0.5));
      const word = max ? "máxima" : "mínima";
      const acc = temps.flatMap((t) => [`la temperatura ${word} es de ${t}`, `la temperatura ${word} es ${t}`, `la ${word} es de ${t}`]);
      acc[0] = sent(acc[0]);
      return mk(
        `Write in Spanish: **The ${max ? "maximum" : "minimum"} temperature is ${n} degrees.** (Write the number in words.)`,
        acc,
        [`'The ${max ? "maximum" : "minimum"} temperature' = *la temperatura ${word}* (the adjective comes after the noun).`, numStep, `**${acc[0]}**`],
        `Frame: *La temperatura ${word} es de* + number + *grados*.`,
        [
          ...tt.map(([t, fb]) => [`la temperatura ${word} es de ${t}`, fb] as [string, string]),
          [`la ${word} temperatura es de ${temps[0]}`, `In Spanish the adjective goes after the noun: *la temperatura ${word}*.`],
        ],
      );
    },
  },

  // 7 ------------------------------------------------------------------------
  {
    id: "el-tiempo.weather-map",
    topicId: T,
    title: "The weather map: en el norte llueve",
    level: 2,
    guideRef: "weather-map",
    generate(rng, tier) {
      if (tier === 3 && rng.bool(0.4)) {
        const c = rng.pick(CITIES);
        const acc = [sent(`${c.city} está en el ${c.r} de España`), `${c.city} está en el ${c.r}`];
        return mk(
          `Write in Spanish: **${c.city} is in the ${c.en} of Spain.**`,
          acc,
          ["Location (where something is) uses *estar*: *está*.", `'In the ${c.en}' = *en el ${c.r}* (all directions are masculine).`, `**${acc[0]}**`],
          "Ser or estar? Think about what the verb is describing.",
          [
            [`${c.city} es en el ${c.r} de España`, "Location uses *estar*, not *ser*: *está en el …*."],
            [`${c.city} está en la ${c.r} de España`, `Compass points are masculine: *en el ${c.r}*.`],
          ],
        );
      }
      const regions = tier === 1 ? REGIONS_MAIN : [...REGIONS_MAIN, ...REGIONS_MIX];
      const reg = rng.pick(regions);
      const keys = Object.keys(TEMP_RANGE);
      const w = W(rng.pick(keys));
      const Rs = [`en el ${reg.es}`, `en el ${reg.es} de España`];
      const Ws = wxPresentAll(w);
      const withTemp = tier >= 2;
      const acc: string[] = [];
      let n = 0;
      if (withTemp) {
        const [lo, hi] = TEMP_RANGE[w.key];
        n = rng.int(lo, hi);
        const Tt = `hace ${grados(n)}`;
        for (const R of Rs) for (const X of Ws) acc.push(`${R} ${X} y ${Tt}`, `${X} y ${Tt} ${R}`, `${X} ${R} y ${Tt}`, `${R} ${Tt} y ${X}`);
      } else {
        for (const R of Rs) for (const X of Ws) acc.push(`${R} ${X}`, `${X} ${R}`);
      }
      acc[0] = sent(acc[0]);
      const tail = withTemp ? ` y hace ${grados(n)}` : "";
      const frame = rng.int(0, 1);
      const what = withTemp ? `${w.sym} ${w.en[0]}, ${n} °C` : `${w.sym} ${w.en[0]}`;
      const prompt = frame === 0
        ? `Write a forecast sentence in Spanish for **the ${reg.en} of Spain**: ${what}.${withTemp ? " Give the temperature with *hace … grados*." : ""}`
        : `On the weather map, **the ${reg.en}** shows ${what}. Write the forecast in Spanish.${withTemp ? " Use *hace … grados* for the temperature." : ""}`;
      const sol = [`'In the ${reg.en}' = *en el ${reg.es}* (compass points are masculine).`, familyExplain(w)];
      if (withTemp) sol.push(`${n} → *${grados(n)}*: add *y hace ${grados(n)}*.`);
      sol.push(`**${acc[0]}**`);
      const trapList: Array<[string, string]> = [[`en ${reg.es} ${Ws[0]}${tail}`, `Include the article: *en el ${reg.es}*.`]];
      for (const [t, fb] of w.traps) trapList.push([`en el ${reg.es} ${t}${tail}`, fb]);
      if (withTemp) for (const [t, fb] of tempTraps(n)) trapList.unshift([`en el ${reg.es} ${Ws[0]} y hace ${t}`, fb]);
      return mk(
        prompt,
        acc,
        sol,
        "Frame: *En el* + region + weather" + (withTemp ? " + *y hace* + number + *grados*." : "."),
        trapList,
      );
    },
  },

  // 8 ------------------------------------------------------------------------
  {
    id: "el-tiempo.cuando-si-activities",
    topicId: T,
    title: "Cuando llueve… / Si hace sol… (weather + activity)",
    level: 2,
    guideRef: "weather-and-activities",
    generate(rng, tier) {
      const isSi = tier === 3 && rng.bool(0.65);
      const act = rng.pick(ACTS);
      const w = W(rng.pick(act.wx));
      const who = tier === 1 ? 0 : rng.int(0, 2); // 0 = yo, 1 = nosotros, 2 = a named person
      const p: Person = who === 0 ? "yo" : who === 1 ? "nosotros" : "él";
      const name = who === 2 ? rng.pick(NAMES) : "";
      const tense = isSi ? "near-future" : "present";
      const verbs = who === 2 ? bareForms(act.inf, tense, p).map((f) => `${name} ${f}`) : acceptedForms(act.inf, tense, p);
      const V = verbs.map((v) => `${v} ${act.rest}`);
      const conj = isSi ? "si" : "cuando";
      const Ws = isSi ? [wx(w, "present")] : wxPresentAll(w);
      const acc: string[] = [];
      for (const X of Ws) for (const v of V) acc.push(`${conj} ${X}, ${v}`, `${v} ${conj} ${X}`);
      acc[0] = sent(acc[0]);
      const subjEn = who === 0 ? "I" : who === 1 ? "we" : name;
      const wEn = WHEN_EN[w.key] ?? w.en[0];
      const verbEn = isSi
        ? `${who === 0 ? "I'm" : who === 1 ? "we're" : `${name} is`} going to ${act.en[0]}`
        : `${subjEn} ${who === 2 ? act.en[1] : act.en[0]}`;
      const canon = conjugate(act.inf, tense, p);
      const prompt = `Write in Spanish: **${isSi ? "If" : "When"} ${wEn}, ${verbEn}.**`;
      const sol = [
        `'${isSi ? "If" : "When"} ${wEn}' = *${conj} ${Ws[0]}* (present tense).`,
        isSi
          ? `'${subjEn} ${who === 2 ? "is" : who === 0 ? "am" : "are"} going to' = *${canon.split(" a ")[0]} a* + infinitive → *${canon}*.`
          : `The activity is a habit, so it's in the present too: *${act.inf}* → *${canon}* (${p === "él" ? "él / ella" : p}).`,
        `**${acc[0]}**`,
      ];
      const otherP: Person = p === "yo" ? (isSi ? "él" : "nosotros") : "yo";
      const wrongV = `${who === 2 ? name + " " : ""}${conjugate(act.inf, tense, otherP)} ${act.rest}`;
      const trapList: Array<[string, string]> = [];
      for (const [t, fb] of w.traps) trapList.push([`${conj} ${t}, ${V[0]}`, fb]);
      trapList.splice(1, 0, [
        `${conj} ${Ws[0]}, ${wrongV}`,
        `Check the subject: '${subjEn}' needs the ${p === "él" ? "él / ella" : p} form — *${canon}*.`,
      ]);
      if (!isSi && who === 0) trapList.unshift([`cuando ${Ws[0]}, ${act.inf} ${act.rest}`, `Conjugate the activity verb: 'I' → *${canon}*, not the infinitive *${act.inf}*.`]);
      return mk(
        prompt,
        acc,
        sol,
        isSi ? "*Si* + present weather, then *ir a* + infinitive for the plan." : "*Cuando* + present weather, then the activity in the present.",
        trapList,
      );
    },
  },

  // 9 ------------------------------------------------------------------------
  {
    id: "el-tiempo.forecast-va-a",
    topicId: T,
    title: "Forecasts: mañana va a llover",
    level: 2,
    guideRef: "weather-and-activities",
    generate(rng, tier) {
      const pool = WX.filter((w) => w.key !== "truena" && w.key !== "despejado");
      const place = tier >= 2 && rng.bool(0.6) ? rng.pick(PLACES) : "";
      const P = place ? ` ${place}` : "";
      let pres: string, futs: string[], explain: string[], badVan: string, badConj: string;
      if (tier === 3 && rng.bool(0.6)) {
        const [ka, kb] = rng.pick(PAIRS);
        const a = W(ka), b = W(kb);
        const strong = !!a.strongTail && rng.bool(0.4);
        const fa = wx(a, "future", strong), fb = wx(b, "future");
        const fbBare = fb.replace(`${VA} a `, "");
        pres = `${wx(a, "present", strong)} y ${wx(b, "present")}`;
        futs = [`${fa} y ${fb}`, `${fa} y ${fbBare}`];
        explain = [`*${wx(a, "present", strong)}* → *${fa}* and *${wx(b, "present")}* → *${fb}*.`];
        badVan = `${fa.replace(`${VA} a`, "van a")} y ${fb}`;
        badConj = `${VA} a ${wx(a, "present", strong)} y ${fb}`;
      } else {
        const w = rng.pick(pool);
        const strong = tier >= 2 && !!w.strongTail && rng.bool(0.4);
        const f = wx(w, "future", strong);
        pres = wx(w, "present", strong);
        futs = [f];
        explain = [`*${pres.split(" ")[0]}* comes from *${INF[w.fam]}*, so: *${f}*.`];
        badVan = f.replace(`${VA} a`, "van a");
        badConj = `${VA} a ${pres}`;
      }
      const acc: string[] = [];
      for (const f of futs) {
        acc.push(`mañana${P} ${f}`);
        if (place) acc.push(`mañana ${f} ${place}`);
      }
      acc[0] = sent(acc[0]);
      return mk(
        `${rng.bool() ? "Turn today's weather into tomorrow's forecast." : "You're the forecaster: say what tomorrow will bring."} Start with *Mañana* and use *va a* + infinitive: *Hoy${P} ${pres}.*`,
        acc,
        ["*Hoy* → *Mañana*: a forecast uses *va a* + infinitive.", ...explain, `**${acc[0]}**`],
        "Find the infinitive of each weather verb (*hace* → *hacer*, *llueve* → *llover*, *hay* → *haber*…).",
        [
          [`mañana${P} ${badVan}`, "Weather has no real subject, so it's always *va* ('it is going to') — never *van*."],
          [`mañana${P} ${badConj}`, "After *va a* the verb goes back to its infinitive: *hacer, llover, nevar, estar, haber*."],
        ],
      );
    },
  },

  // 10 -----------------------------------------------------------------------
  {
    id: "el-tiempo.past-weather",
    topicId: T,
    title: "Past weather: hizo, llovió, nevó, estuvo, hubo",
    level: 2,
    guideRef: "past-weather",
    generate(rng, tier) {
      const r = rng.next();
      const mode = tier === 1 ? "phrase" : tier === 2 ? (r < 0.65 ? "gap" : "phrase") : r < 0.6 ? "translate" : "gap";
      if (mode === "gap") {
        const GAPS: Array<{ s: string; fam: Family }> = [
          { s: "Ayer ___ mucho calor en Sevilla.", fam: "hacer" },
          { s: "El fin de semana pasado ___ frío en Madrid.", fam: "hacer" },
          { s: "Anoche ___ mucho viento en la costa.", fam: "hacer" },
          { s: "El verano pasado ___ muy buen tiempo en Valencia.", fam: "hacer" },
          { s: "Ayer ___ sol todo el día.", fam: "hacer" },
          { s: "Ayer ___ mucho en Bilbao.", fam: "llover" },
          { s: "El domingo ___ por la tarde.", fam: "llover" },
          { s: "Anoche ___ en Singapur.", fam: "llover" },
          { s: "El invierno pasado ___ mucho en los Pirineos.", fam: "nevar" },
          { s: "Ayer ___ en la Sierra Nevada.", fam: "nevar" },
          { s: "Ayer ___ nublado todo el día.", fam: "estar" },
          { s: "El sábado ___ muy nublado en el norte.", fam: "estar" },
          { s: "Anoche ___ tormenta en Singapur.", fam: "haber" },
          { s: "Ayer por la mañana ___ niebla en Madrid.", fam: "haber" },
          { s: "El fin de semana pasado ___ una tormenta enorme.", fam: "haber" },
          { s: "Anoche ___ mucho. ¡Qué tormenta!", fam: "tronar" },
        ];
        const g = rng.pick(GAPS);
        const ans = verbForm(g.fam, "preterite");
        const intro = rng.bool() ? "Complete with the preterite of the verb in brackets:" : "Fill the gap with the past (preterite) form:";
        return mk(
          `${intro} *${g.s}* (${INF[g.fam]})`,
          [ans],
          [`The time phrase points to the past → preterite, *él / ella* form.`, pastExplain(g.fam), `**${ans}**: *${g.s.replace("___", ans)}*`],
          "Is the verb regular (*-ó / -ió* with an accent) or one of the irregular ones (*hizo, estuvo, hubo*)?",
          pastVerbTraps(g.fam),
        );
      }
      const pool = WX.filter((w) => w.key !== "despejado" && (tier >= 2 || w.key !== "truena"));
      const w = rng.pick(pool);
      const verbTraps = pastVerbTraps(w.fam);
      if (mode === "phrase") {
        const pres = wx(w, "present");
        const past = wx(w, "preterite");
        const tailStr = w.tail ? ` ${w.tail}` : "";
        const prompt = rng.bool()
          ? `Write the past (preterite) of *${pres}* — e.g. for yesterday's weather.`
          : `Today: *${cap(pres)}.* Yesterday it was the same. Write the weather for yesterday (just the weather expression, preterite).`;
        return mk(
          prompt,
          [past],
          [pastExplain(w.fam), `**${past}**`],
          "Only the verb changes — the weather word stays the same.",
          verbTraps.map(([v, fb]) => [`${v}${tailStr}`, fb] as [string, string]),
        );
      }
      const TP = [
        { es: "ayer", en: "Yesterday" }, { es: "anoche", en: "Last night" }, { es: "el fin de semana pasado", en: "Last weekend" },
        { es: "el sábado pasado", en: "Last Saturday" }, { es: "el verano pasado", en: "Last summer" },
      ];
      const tp = rng.pick(TP.filter((t) => !(t.es === "anoche" && (w.key === "sol" || w.key === "buen")) && !(t.es === "el verano pasado" && (w.key === "nieve" || w.key === "frio"))));
      const strong = !!w.strongTail && rng.bool(0.45);
      const past = wx(w, "preterite", strong);
      const acc = [sent(`${tp.es} ${past}`), `${past} ${tp.es}`];
      const enShown = !strong ? w.enPast[0]
        : w.fam === "llover" || w.fam === "nevar" ? `${w.enPast[0]} a lot`
        : w.enStrong![0].replace(/^it's /, "it was ").replace(/^the weather is /, "the weather was ");
      const tailStr = (strong ? w.strongTail : w.tail) ? ` ${strong ? w.strongTail : w.tail}` : "";
      return mk(
        `Write in Spanish: **${tp.en} ${enShown}.**`,
        acc,
        [`*${cap(tp.es)}* → preterite.`, pastExplain(w.fam), ...(strong ? [w.strongWhy!] : []), `**${acc[0]}**`],
        "Time phrase first, then the weather in the preterite.",
        verbTraps.map(([v, fb]) => [`${tp.es} ${v}${tailStr}`, fb] as [string, string]),
      );
    },
  },

  // 11 -----------------------------------------------------------------------
  {
    id: "el-tiempo.time-switch",
    topicId: T,
    title: "Switch time frames: ayer / hoy / mañana",
    level: 3,
    guideRef: "past-weather",
    generate(rng, tier) {
      const times = tier === 1 ? TIMES.slice(0, 3) : TIMES;
      const src = rng.pick(times);
      const tgt = rng.pick(times.filter((t) => t.tense !== src.tense));
      const place = tier >= 2 && rng.bool(0.55) ? rng.pick(PLACES) : "";
      const P = place ? ` ${place}` : "";
      const pool = WX.filter((w) => w.key !== "truena" && w.key !== "despejado");

      // clauses: [weather, strong]
      let clauses: Array<[Wx, boolean]>;
      if (tier === 3 && rng.bool(0.6)) {
        const [ka, kb] = rng.pick(PAIRS);
        const a = W(ka);
        clauses = [[a, !!a.strongTail && rng.bool(0.35)], [W(kb), false]];
      } else {
        const w = rng.pick(pool);
        clauses = [[w, tier >= 2 && !!w.strongTail && rng.bool(0.35)]];
      }
      const form = (t: WxTense) => clauses.map(([w, s]) => wx(w, t, s)).join(" y ");
      const srcSentence = `${cap(src.es)}${P} ${form(src.tense)}.`;
      const tgtForms = [form(tgt.tense)];
      if (tgt.tense === "future" && clauses.length === 2) tgtForms.push(`${wx(clauses[0][0], "future", clauses[0][1])} y ${wx(clauses[1][0], "future").replace(`${VA} a `, "")}`);
      if (tgt.tense === "present") {
        const alts = clauses.map(([w, s]) => wxPresentAll(w, s));
        if (alts.length === 1) tgtForms.push(...alts[0].slice(1));
        else for (const x of alts[0]) for (const y of alts[1]) tgtForms.push(`${x} y ${y}`);
      }
      const acc: string[] = [];
      for (const f of uniq(tgtForms)) {
        acc.push(`${tgt.es}${P} ${f}`);
        if (place) acc.push(`${tgt.es} ${f} ${place}`);
        else acc.push(`${f} ${tgt.es}`);
      }
      acc[0] = sent(acc[0]);
      const steps = clauses.map(([w, s]) => `*${wx(w, src.tense, s)}* → *${wx(w, tgt.tense, s)}*`).join("; ");
      const wrongTense: WxTense = tgt.tense === "present" ? src.tense : tgt.tense === "future" ? "present" : "present";
      const trapList: Array<[string, string]> = [
        [`${tgt.es}${P} ${form(wrongTense)}`, `*${cap(tgt.es)}* signals ${TENSE_NAME[tgt.tense]} — change the verb${clauses.length > 1 ? "s" : ""} too.`],
      ];
      if (tgt.tense === "future") trapList.push([`${tgt.es}${P} ${form("future").replace(new RegExp(`\\b${VA} a\\b`, "g"), "van a")}`, "Weather is always *va* ('it is going to') — never *van*."]);
      if (tgt.tense === "preterite") {
        const [w0, s0] = clauses[0];
        const [badV, fb] = pastVerbTraps(w0.fam)[0];
        const t0 = s0 && w0.strongTail ? w0.strongTail : w0.tail;
        const rest = clauses.length > 1 ? ` y ${wx(clauses[1][0], "preterite")}` : "";
        trapList.push([`${tgt.es}${P} ${badV}${t0 ? " " + t0 : ""}${rest}`, fb]);
      }
      return mk(
        `Rewrite this sentence so it's about **${tgt.en}**. Start with *${cap(tgt.es)}* and change the verb${clauses.length > 1 ? "s" : ""}: *${srcSentence}*`,
        acc,
        [`*${cap(tgt.es)}* → ${TENSE_NAME[tgt.tense]}.`, steps + ".", `**${acc[0]}**`],
        "The time phrase is your signpost: past → *hizo / llovió / estuvo / hubo*; today → *hace / llueve*; future → *va a* + infinitive.",
        trapList,
      );
    },
  },
];

