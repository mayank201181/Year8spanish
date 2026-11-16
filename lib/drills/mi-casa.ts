// Procedural skill drills for "Mi casa — My Home".
// Every verb form (vivo, está, están, es, son, tiene) comes from the tested
// conjugator in lib/spanish/verbs.ts. Only "hay" (from haber, not in the
// conjugator) is a fixed form — it never changes.
// Nouns and adjectives live in small typed lexicons below (gender + plural),
// so articles and agreement are computed, never hand-typed per item.
import type { Drill, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import { conjugate, acceptedForms, PERSONS, PERSON_LABEL, type Person } from "../spanish/verbs.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";

const TOPIC = "mi-casa";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

type G = "m" | "f";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const uniq = (xs: string[]) => [...new Set(xs)];
const key = (s: string) => stripAccents(normSpanish(s));
const text = (accept: string[]) => ({ type: "text" as const, accept: uniq(accept) });

/** 0–2 traps, dropping any that match (or differ only by accents from) an accepted answer. */
function mkTraps(accept: string[], list: { wrong: string[]; feedback: string }[]): Trap[] {
  const ok = new Set(accept.map(key));
  return list
    .map((t) => ({ wrong: uniq(t.wrong.filter((w) => w.trim() !== "" && !ok.has(key(w)))), feedback: t.feedback }))
    .filter((t) => t.wrong.length > 0)
    .slice(0, 2)
    .map((t) => ({ spec: { type: "text" as const, accept: t.wrong }, feedback: t.feedback }));
}

/** English indefinite article: "a flat", "an old house". */
const aAn = (w: string) => (/^[aeiou]/i.test(w) ? "an " : "a ") + w;

interface Noun {
  sg: string;
  pl: string;
  g: G;
}
const N = (sg: string, g: G, pl: string): Noun => ({ sg, g, pl });

const defArt = (g: G, pl: boolean) => (g === "m" ? (pl ? "los" : "el") : pl ? "las" : "la");
const indefArt = (g: G) => (g === "m" ? "un" : "una");
/** el salón / los salones */
const def = (n: Noun, pl = false) => `${defArt(n.g, pl)} ${pl ? n.pl : n.sg}`;
/** un salón / una cocina */
const indef = (n: Noun) => `${indefArt(n.g)} ${n.sg}`;
/** de + article, contracting de + el → del. */
const deArt = (g: G, pl: boolean) => (g === "m" && !pl ? "del" : `de ${defArt(g, pl)}`);
const gn = (g: G, pl: boolean) => `${g === "m" ? "masculine" : "feminine"} ${pl ? "plural" : "singular"}`;

// Verb forms from the conjugator.
const V = (inf: string, p: Person) => conjugate(inf, "present", p);
const ESTA = V("estar", "él");
const ESTAN = V("estar", "ellos");
const ES = V("ser", "él");
const SON = V("ser", "ellos");
const TIENE = V("tener", "él");
const estar = (pl: boolean) => (pl ? ESTAN : ESTA);
const ser = (pl: boolean) => (pl ? SON : ES);
const HAY = "hay"; // haber: fixed form, never changes

const NUM_ES = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"];
const NUM_EN = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
/** Number word before a noun: 1 → un/una. */
const numEs = (n: number, g: G) => (n === 1 ? indefArt(g) : NUM_ES[n]);

/** Why a noun has its gender (for solutions and trap feedback). */
function genderReason(n: Noun): string {
  const w = n.sg.split(" ")[0];
  if (/ción$/.test(w)) return `*${w}* ends in *-ción*, and nouns ending in *-ción* are always feminine`;
  if (/dad$/.test(w)) return `*${w}* ends in *-dad*, and nouns ending in *-dad* are feminine`;
  if (w.endsWith("o")) return `*${w}* ends in *-o*, so it is masculine`;
  if (w.endsWith("a")) return `*${w}* ends in *-a*, so it is feminine`;
  return `*${w}* doesn't end in *-o* or *-a* — it is ${n.g === "m" ? "masculine" : "feminine"} and has to be learnt with its article`;
}
const regularEnding = (n: Noun) => {
  const w = n.sg.split(" ")[0];
  return (w.endsWith("o") && n.g === "m") || (w.endsWith("a") && n.g === "f");
};

// ---------------------------------------------------------------------------
// Lexicons
// ---------------------------------------------------------------------------

interface Home {
  /** Canonical form first; alternatives that are equally correct after it. */
  forms: Noun[];
  en: string;
  /** "in" or "on" (on a farm). */
  prep: "in" | "on";
  farm?: boolean;
}
const HOMES: Home[] = [
  { forms: [N("piso", "m", "pisos"), N("apartamento", "m", "apartamentos")], en: "flat", prep: "in" },
  { forms: [N("casa", "f", "casas")], en: "house", prep: "in" },
  { forms: [N("casa adosada", "f", "casas adosadas")], en: "terraced house", prep: "in" },
  { forms: [N("chalet", "m", "chalets"), N("chalé", "m", "chalés")], en: "detached house", prep: "in" },
  { forms: [N("granja", "f", "granjas")], en: "farm", prep: "on", farm: true },
  { forms: [N("apartamento", "m", "apartamentos"), N("piso", "m", "pisos")], en: "apartment", prep: "in" },
];

interface Loc {
  es: string;
  en: string;
  /** Can take "de + city" after it (en el centro de Madrid). */
  ofCity?: boolean;
  farmOk?: boolean;
}
const LOCS: Loc[] = [
  { es: "en el centro", en: "in the centre", ofCity: true },
  { es: "en las afueras", en: "on the outskirts", ofCity: true, farmOk: true },
  { es: "en el campo", en: "in the countryside", farmOk: true },
  { es: "en la costa", en: "on the coast", farmOk: true },
  { es: "en la montaña", en: "in the mountains", farmOk: true },
  { es: "en un pueblo", en: "in a village" },
  { es: "en una ciudad", en: "in a city" },
];
const CITIES: { es: string; en: string }[] = [
  { es: "Madrid", en: "Madrid" },
  { es: "Sevilla", en: "Seville" },
  { es: "Valencia", en: "Valencia" },
  { es: "Málaga", en: "Málaga" },
  { es: "Granada", en: "Granada" },
  { es: "Barcelona", en: "Barcelona" },
];

interface Room {
  forms: Noun[];
  en: string;
  enPl: string;
  /** Other acceptable English meanings. */
  enAlt?: string[];
  where: "down" | "up" | "out";
  /** Realistic maximum for "hay + number". */
  max: number;
  /** Can be missing: "no hay jardín". */
  canLack?: boolean;
}
const ROOMS: Room[] = [
  { forms: [N("cocina", "f", "cocinas")], en: "kitchen", enPl: "kitchens", where: "down", max: 2 },
  { forms: [N("salón", "m", "salones"), N("sala de estar", "f", "salas de estar")], en: "living room", enPl: "living rooms", enAlt: ["lounge", "sitting room"], where: "down", max: 2 },
  { forms: [N("comedor", "m", "comedores")], en: "dining room", enPl: "dining rooms", where: "down", max: 1, canLack: true },
  { forms: [N("dormitorio", "m", "dormitorios"), N("habitación", "f", "habitaciones")], en: "bedroom", enPl: "bedrooms", where: "up", max: 6 },
  { forms: [N("cuarto de baño", "m", "cuartos de baño"), N("baño", "m", "baños")], en: "bathroom", enPl: "bathrooms", where: "up", max: 4 },
  { forms: [N("aseo", "m", "aseos")], en: "toilet", enPl: "toilets", enAlt: ["wc", "cloakroom"], where: "down", max: 2, canLack: true },
  { forms: [N("despacho", "m", "despachos")], en: "study", enPl: "studies", enAlt: ["office", "home office"], where: "up", max: 2, canLack: true },
  { forms: [N("jardín", "m", "jardines")], en: "garden", enPl: "gardens", where: "out", max: 2, canLack: true },
  { forms: [N("garaje", "m", "garajes")], en: "garage", enPl: "garages", where: "down", max: 2, canLack: true },
  { forms: [N("balcón", "m", "balcones")], en: "balcony", enPl: "balconies", where: "up", max: 3, canLack: true },
  { forms: [N("terraza", "f", "terrazas")], en: "terrace", enPl: "terraces", enAlt: ["large balcony"], where: "up", max: 2, canLack: true },
];
const DREAM_ROOMS: Room[] = [
  { forms: [N("piscina", "f", "piscinas")], en: "swimming pool", enPl: "swimming pools", enAlt: ["pool"], where: "out", max: 3, canLack: true },
  { forms: [N("gimnasio", "m", "gimnasios")], en: "gym", enPl: "gyms", enAlt: ["gymnasium"], where: "down", max: 2, canLack: true },
  { forms: [N("sala de juegos", "f", "salas de juegos")], en: "games room", enPl: "games rooms", enAlt: ["game room"], where: "down", max: 2, canLack: true },
  { forms: [N("biblioteca", "f", "bibliotecas")], en: "library", enPl: "libraries", where: "up", max: 1, canLack: true },
  { forms: [N("ascensor", "m", "ascensores")], en: "lift", enPl: "lifts", enAlt: ["elevator"], where: "down", max: 2, canLack: true },
  { forms: [N("azotea", "f", "azoteas")], en: "roof terrace", enPl: "roof terraces", enAlt: ["flat roof terrace", "rooftop terrace", "rooftop"], where: "up", max: 1, canLack: true },
];
const roomByEn = (en: string) => ROOMS.find((r) => r.en === en)!;

// Adjectives ----------------------------------------------------------------

type Kind = "home" | "room" | "out" | "wall";
interface AdjForms {
  ms: string;
  fs: string;
  mp: string;
  fp: string;
}
interface Adj {
  /** Canonical forms first, then accepted synonyms. */
  forms: AdjForms[];
  en: string;
  kinds: Kind[];
  /** Adjectives in the same group contradict each other (grande / pequeño). */
  group: string;
  /** Natural after "un poco" / "demasiado" (slightly negative). */
  neg?: boolean;
}
const A4 = (ms: string): AdjForms => ({ ms, fs: ms.slice(0, -1) + "a", mp: ms + "s", fp: ms.slice(0, -1) + "as" });
const A2 = (s: string, p: string): AdjForms => ({ ms: s, fs: s, mp: p, fp: p });
const ADJS: Adj[] = [
  { forms: [A2("grande", "grandes")], en: "big", kinds: ["home", "room", "out"], group: "size", neg: true },
  { forms: [A4("pequeño")], en: "small", kinds: ["home", "room", "out"], group: "size", neg: true },
  { forms: [A2("enorme", "enormes")], en: "huge", kinds: ["home", "room", "out"], group: "size" },
  { forms: [A4("moderno")], en: "modern", kinds: ["home", "room"], group: "age" },
  { forms: [A4("antiguo"), A4("viejo")], en: "old", kinds: ["home", "room"], group: "age", neg: true },
  { forms: [A4("cómodo")], en: "comfortable", kinds: ["home", "room"], group: "comfort" },
  { forms: [A4("bonito")], en: "pretty", kinds: ["home", "room", "out", "wall"], group: "looks" },
  { forms: [A4("feo")], en: "ugly", kinds: ["home", "room", "out", "wall"], group: "looks", neg: true },
  { forms: [A4("luminoso")], en: "bright", kinds: ["home", "room"], group: "light" },
  { forms: [A4("oscuro")], en: "dark", kinds: ["home", "room"], group: "light", neg: true },
  { forms: [A4("tranquilo")], en: "quiet", kinds: ["home", "out"], group: "noise" },
  { forms: [A4("blanco")], en: "white", kinds: ["home", "room", "wall"], group: "colour" },
  { forms: [A4("amarillo")], en: "yellow", kinds: ["room", "wall"], group: "colour" },
  { forms: [A4("rojo")], en: "red", kinds: ["room", "wall"], group: "colour" },
  { forms: [A2("verde", "verdes")], en: "green", kinds: ["room", "wall"], group: "colour" },
  { forms: [A2("azul", "azules")], en: "blue", kinds: ["room", "wall"], group: "colour" },
  { forms: [A2("gris", "grises")], en: "grey", kinds: ["room", "wall"], group: "colour" },
];
const agreeF = (f: AdjForms, g: G, pl: boolean) => (g === "m" ? (pl ? f.mp : f.ms) : pl ? f.fp : f.fs);
const agree = (a: Adj, g: G, pl: boolean) => agreeF(a.forms[0], g, pl);
/** Every accepted spelling of the adjective agreeing with g/pl. */
const agreeAll = (a: Adj, g: G, pl: boolean) => uniq(a.forms.map((f) => agreeF(f, g, pl)));
const twoForm = (a: Adj) => a.forms[0].ms === a.forms[0].fs;

/** A describable thing: English, its Spanish alternatives (each with own gender) and kind. */
interface Thing {
  en: string;
  enPl: string;
  forms: Noun[];
  kind: Kind;
}
const THINGS: Thing[] = [
  { en: "flat", enPl: "flats", forms: HOMES[0].forms, kind: "home" },
  { en: "house", enPl: "houses", forms: HOMES[1].forms, kind: "home" },
  { en: "detached house", enPl: "detached houses", forms: HOMES[3].forms, kind: "home" },
  { en: "farm", enPl: "farms", forms: HOMES[4].forms, kind: "home" },
  { en: "kitchen", enPl: "kitchens", forms: roomByEn("kitchen").forms, kind: "room" },
  { en: "living room", enPl: "living rooms", forms: roomByEn("living room").forms, kind: "room" },
  { en: "bedroom", enPl: "bedrooms", forms: roomByEn("bedroom").forms, kind: "room" },
  { en: "bathroom", enPl: "bathrooms", forms: roomByEn("bathroom").forms, kind: "room" },
  { en: "dining room", enPl: "dining rooms", forms: roomByEn("dining room").forms, kind: "room" },
  { en: "study", enPl: "studies", forms: roomByEn("study").forms, kind: "room" },
  { en: "garden", enPl: "gardens", forms: roomByEn("garden").forms, kind: "out" },
  { en: "terrace", enPl: "terraces", forms: roomByEn("terrace").forms, kind: "out" },
  { en: "wall", enPl: "walls", forms: [N("pared", "f", "paredes")], kind: "wall" },
];
const adjsFor = (k: Kind) => ADJS.filter((a) => a.kinds.includes(k));

/** "My house" style subjects with possessive (mi / nuestra) or "of" phrases. */
interface Subj {
  en: string;
  /** Spanish alternatives, each with gender. */
  forms: { es: string; g: G }[];
  pl: boolean;
  kind: Kind;
  farm?: boolean;
  floor?: Room["where"];
}
const HOUSE_SUBJ: Subj[] = [
  { en: "My house", forms: [{ es: "mi casa", g: "f" }], pl: false, kind: "home" },
  { en: "My flat", forms: [{ es: "mi piso", g: "m" }, { es: "mi apartamento", g: "m" }], pl: false, kind: "home" },
  { en: "Our house", forms: [{ es: "nuestra casa", g: "f" }], pl: false, kind: "home" },
  { en: "Our flat", forms: [{ es: "nuestro piso", g: "m" }, { es: "nuestro apartamento", g: "m" }], pl: false, kind: "home" },
  { en: "My grandparents' farm", forms: [{ es: "la granja de mis abuelos", g: "f" }], pl: false, kind: "home", farm: true },
  { en: "Lucía's flat", forms: [{ es: "el piso de Lucía", g: "m" }, { es: "el apartamento de Lucía", g: "m" }], pl: false, kind: "home" },
  { en: "Diego's detached house", forms: [{ es: "el chalet de Diego", g: "m" }, { es: "el chalé de Diego", g: "m" }], pl: false, kind: "home" },
  { en: "My cousins' house", forms: [{ es: "la casa de mis primos", g: "f" }], pl: false, kind: "home" },
];
/** "The kitchen" style subjects from the rooms list (singular or plural). */
function roomSubj(r: Room, pl: boolean, possessive = false): Subj {
  const det = (n: Noun) => (possessive ? `${pl ? "mis" : "mi"} ${pl ? n.pl : n.sg}` : def(n, pl));
  return {
    en: (possessive ? "My " : "The ") + (pl ? r.enPl : r.en),
    forms: r.forms.map((n) => ({ es: det(n), g: n.g })),
    pl,
    kind: r.where === "out" ? "out" : "room",
    floor: r.where,
  };
}

// Subjects for vivir ---------------------------------------------------------

interface Who {
  /** English subject, e.g. "My grandmother". */
  en: string;
  /** Spanish subject noun phrase (null → pronoun optional). */
  es: string | null;
  p: Person;
}
const WHO: Who[] = [
  { en: "I", es: null, p: "yo" },
  { en: "My grandmother", es: "mi abuela", p: "él" },
  { en: "Pablo", es: "Pablo", p: "él" },
  { en: "My cousin Sofía", es: "mi prima Sofía", p: "él" },
  { en: "Arjun", es: "Arjun", p: "él" },
  { en: "You (one friend)", es: null, p: "tú" },
  { en: "We", es: null, p: "nosotros" },
  { en: "You (several friends)", es: null, p: "vosotros" },
  { en: "My parents", es: "mis padres", p: "ellos" },
  { en: "Javier and Mei", es: "Javier y Mei", p: "ellos" },
];
const enLive = (w: Who) => (w.p === "él" ? "lives" : "live");
/** Every accepted "subject + vive" start for this person. */
function vivirStarts(w: Who): string[] {
  if (w.es) return [`${w.es} ${V("vivir", w.p)}`];
  return acceptedForms("vivir", "present", w.p);
}
/** -ar / -er endings on viv- — the classic slip for a regular -ir verb. */
const WRONG_ENDINGS: Record<Person, { ar: string; er: string }> = {
  yo: { ar: "vivo", er: "vivo" },
  tú: { ar: "vivas", er: "vives" },
  él: { ar: "viva", er: "vive" },
  nosotros: { ar: "vivamos", er: "vivemos" },
  vosotros: { ar: "viváis", er: "vivéis" },
  ellos: { ar: "vivan", er: "viven" },
};

const cross = (as: string[], bs: string[], join = " ") => as.flatMap((a) => bs.map((b) => `${a}${join}${b}`));

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

// 1. Gender detective -------------------------------------------------------

interface GItem {
  n: Noun;
  en: string;
  /** All acceptable "un/una + noun" answers for the English. */
  enAnswers: Noun[];
  kind: "home" | "place" | "room";
}
const G_ITEMS: GItem[] = [
  ...HOMES.filter((h) => h.en !== "apartment").map((h) => ({ n: h.forms[0], en: h.en, enAnswers: h.forms, kind: "home" as const })),
  { n: N("apartamento", "m", "apartamentos"), en: "apartment", enAnswers: HOMES[5].forms, kind: "home" },
  { n: N("urbanización", "f", "urbanizaciones"), en: "condo-style housing complex", enAnswers: [N("urbanización", "f", "urbanizaciones")], kind: "home" },
  { n: N("pueblo", "m", "pueblos"), en: "village", enAnswers: [N("pueblo", "m", "pueblos")], kind: "place" },
  { n: N("ciudad", "f", "ciudades"), en: "city", enAnswers: [N("ciudad", "f", "ciudades")], kind: "place" },
  ...ROOMS.flatMap((r) => r.forms.map((n) => ({ n, en: r.en, enAnswers: r.forms, kind: "room" as const }))).filter((x) => x.n.sg !== "baño"),
];
const G_REGULAR = G_ITEMS.filter((x) => regularEnding(x.n));
const G_TRICKY = G_ITEMS.filter((x) => !regularEnding(x.n));

const genderDetective: Drill = {
  id: `${TOPIC}.gender-un-una`,
  topicId: TOPIC,
  title: "Gender detective: un or una?",
  level: 1,
  guideRef: "types-of-home",
  generate(rng, tier) {
    const pool = tier === 1 ? G_REGULAR : tier === 2 ? G_ITEMS : G_TRICKY;
    const it = rng.pick(pool);
    const art = indefArt(it.n.g);
    const other = indefArt(it.n.g === "m" ? "f" : "m");
    const mode = rng.int(0, 2);
    let prompt: string;
    let accept: string[];
    let wrong: string[];
    if (mode === 0) {
      const frames =
        it.kind === "home"
          ? ["Vivo en ___ X.", "Mi primo vive en ___ X.", "¿Vives en ___ X?"]
          : it.kind === "place"
            ? ["Mi abuela vive en ___ X.", "Mi casa está en ___ X."]
            : ["En mi casa hay ___ X.", "Mi casa tiene ___ X."];
      const frame = rng.pick(frames);
      prompt = `Gender detective: complete with *un* or *una*.\n\n*${frame.replace("X", it.n.sg)}*`;
      accept = [art, frame.replace("___", art).replace("X", it.n.sg)];
      wrong = [other, frame.replace("___", other).replace("X", it.n.sg)];
    } else if (mode === 1) {
      prompt = `Write '${aAn(it.en)}' in Spanish, with *un* or *una*.`;
      accept = it.enAnswers.map(indef);
      wrong = it.enAnswers.map((n) => `${indefArt(n.g === "m" ? "f" : "m")} ${n.sg}`);
    } else {
      prompt = `Gender detective: is *${it.n.sg}* (${it.en}) masculine or feminine? Write it with *un* or *una*.`;
      accept = [indef(it.n)];
      wrong = [`${other} ${it.n.sg}`];
    }
    return {
      prompt,
      answer: text(accept),
      solution: [`${cap(genderReason(it.n))}.`, `Masculine → *un*, feminine → *una*.`, `**${indef(it.n)}**`],
      hint: "Look at the last letter of the noun — and remember that a few nouns just have to be learnt with their article.",
      traps: mkTraps(accept, [{ wrong, feedback: `Check the gender: ${genderReason(it.n)} → *${art}*.` }]),
    };
  },
};

// 2. Rooms es → en -----------------------------------------------------------

const enAccepts = (r: Room, pl: boolean, extra: string[] = []) => {
  const words = [pl ? r.enPl : r.en, ...(pl ? [] : r.enAlt ?? []), ...extra];
  return uniq(words.flatMap((w) => [w, `the ${w}`, ...(pl ? [] : [aAn(w)])]));
};

const roomsEsEn: Drill = {
  id: `${TOPIC}.rooms-es-en`,
  topicId: TOPIC,
  title: "Rooms: Spanish → English",
  level: 1,
  guideRef: "rooms",
  generate(rng, tier) {
    const pool = tier === 3 ? [...ROOMS, ...DREAM_ROOMS] : ROOMS;
    const r = rng.pick(pool);
    const n = rng.pick(r.forms);
    const pl = tier >= 2 && rng.bool(tier === 3 ? 0.5 : 0.3);
    const es = def(n, pl);
    const extra = !pl && n.sg === "habitación" ? ["room"] : [];
    const accept = enAccepts(r, pl, extra);
    const mode = rng.int(0, 2);
    const prompt =
      mode === 0
        ? `What does *${es}* mean in English?`
        : mode === 1
          ? `Translate into English: *${es}*`
          : `Wei Ling is showing you round her flat. She opens a door and says: *${n.g === "m" ? (pl ? "Estos son" : "Este es") : pl ? "Estas son" : "Esta es"} ${es}.* Which room${pl ? "s are they" : " is it"}? Answer in English.`;
    const wrongs: { wrong: string[]; feedback: string }[] = [];
    if (n.sg === "salón") wrongs.push({ wrong: ["salon", "the salon"], feedback: "False friend! *El salón* is the living room, not a hair salon." });
    if (n.sg === "aseo") wrongs.push({ wrong: ["bathroom", "the bathroom"], feedback: "Close — but *el aseo* is just a small room with a toilet and basin. A bathroom is *el cuarto de baño*." });
    if (n.sg === "biblioteca") wrongs.push({ wrong: ["bookshop", "the bookshop", "bookstore"], feedback: "False friend: a bookshop is *la librería*. *La biblioteca* is a library." });
    if (n.sg === "cocina") wrongs.push({ wrong: ["cooker", "the cooker"], feedback: "*Cocina* can mean cooker, but here it's a room: the kitchen." });
    if (n.sg === "comedor") wrongs.push({ wrong: ["kitchen", "the kitchen"], feedback: "*Comedor* comes from *comer* (to eat) — it's the room where you eat: the dining room." });
    if (n.sg === "despacho") wrongs.push({ wrong: ["dispatch", "the dispatch"], feedback: "Not a cognate here: *el despacho* is a study / home office." });
    return {
      prompt,
      answer: text(accept),
      solution: [`*${es}* = **${accept[1] ?? accept[0]}**.`, pl ? `It's plural (*${defArt(n.g, true)}*), so the English is plural too.` : `Learn it with its article: *${def(n)}*.`],
      hint: n.sg === "comedor" ? "Think of *comer* (to eat)." : "Say it aloud — many room words look or sound like English words.",
      traps: mkTraps(accept, wrongs),
    };
  },
};

// 3. Rooms en → es -----------------------------------------------------------

const roomsEnEs: Drill = {
  id: `${TOPIC}.rooms-en-es`,
  topicId: TOPIC,
  title: "Rooms: English → Spanish with el/la",
  level: 1,
  guideRef: "rooms",
  generate(rng, tier) {
    const pool = tier === 3 ? [...ROOMS, ...DREAM_ROOMS] : ROOMS;
    const r = rng.pick(pool);
    const pl = tier >= 2 && rng.bool(tier === 3 ? 0.5 : 0.35);
    const accept = r.forms.map((n) => def(n, pl));
    const enWord = pl ? r.enPl : r.en;
    const art = pl ? "los/las" : "el/la";
    const mode = rng.int(0, 2);
    const prompt =
      mode === 0
        ? `Write *the ${enWord}* in Spanish. Include ${art}.`
        : mode === 1
          ? `Label the floor plan in Spanish: *the ${enWord}*. Include ${art}.`
          : `Your exchange partner asks where something is. How do you say *the ${enWord}* in Spanish? Include ${art}.`;
    const n0 = r.forms[0];
    const wrongs: { wrong: string[]; feedback: string }[] = [
      { wrong: r.forms.map((n) => `${defArt(n.g === "m" ? "f" : "m", pl)} ${pl ? n.pl : n.sg}`), feedback: `Check the gender: ${genderReason(n0)}.` },
    ];
    if (pl) {
      wrongs.unshift({
        wrong: r.forms.map((n) => `${defArt(n.g, true)} ${n.sg}s`),
        feedback: "Check the plural: add *-s* after a vowel but *-es* after a consonant (*salón → salones*, *jardín → jardines*).",
      });
    } else {
      wrongs.push({ wrong: r.forms.map((n) => n.sg), feedback: `Include the article: *${def(n0)}*.` });
    }
    return {
      prompt,
      answer: text(accept),
      solution: [
        `*the ${enWord}* → *${pl ? n0.pl : n0.sg}*${r.forms.length > 1 ? ` (or *${pl ? r.forms[1].pl : r.forms[1].sg}*)` : ""}.`,
        `${cap(genderReason(n0))} → *${defArt(n0.g, pl)}*.`,
        `**${accept[0]}**`,
      ],
      hint: pl ? "Plural articles: *los* (masculine), *las* (feminine). Then make the noun plural." : "Is the noun masculine (*el*) or feminine (*la*)?",
      traps: mkTraps(accept, wrongs),
    };
  },
};

// 4. vivo en + home type ------------------------------------------------------

const vivoEn: Drill = {
  id: `${TOPIC}.vivo-en-home`,
  topicId: TOPIC,
  title: "Vivo en… + type of home",
  level: 1,
  guideRef: "types-of-home",
  generate(rng, tier) {
    const whoPool = tier === 1 ? WHO.filter((w) => w.p === "yo" || w.p === "él") : WHO;
    const w = rng.pick(whoPool);
    let home = rng.pick(HOMES);
    // Optional location (tier 2 sometimes, tier 3 always) or the "flat in a condo" chunk.
    let condo = false;
    let loc: Loc | null = null;
    if (tier === 3 && rng.bool(0.25)) {
      condo = true;
      home = HOMES[0];
    } else if (tier === 3 || (tier === 2 && rng.bool(0.4))) {
      loc = rng.pick(LOCS.filter((l) => !home.farm || l.farmOk));
    }
    const homeEs = home.forms.map((n) => `en ${indef(n)}${condo ? " en una urbanización" : ""}${loc ? ` ${loc.es}` : ""}`);
    const accept = cross(vivirStarts(w), homeEs);
    const enHome = `${home.prep} ${aAn(home.en)}${condo ? " in a condo (a housing complex with a shared pool)" : ""}${loc ? ` ${loc.en}` : ""}`;
    const enSentence = `${w.en} ${enLive(w)} ${enHome}`;
    const prompt = rng.bool() ? `Translate into Spanish: '${enSentence}.'` : `Say it in Spanish: '${enSentence}.'`;
    const verb = V("vivir", w.p);
    const n0 = home.forms[0];
    const start = cap(w.es ? `${w.es} ${verb}` : verb);
    const canonical = `${start} ${homeEs[0]}.`;
    const wrongs = [
      { wrong: home.forms.map((n) => `${w.es ? w.es + " " : ""}${verb} en ${indefArt(n.g === "m" ? "f" : "m")} ${n.sg}${condo ? " en una urbanización" : ""}${loc ? ` ${loc.es}` : ""}`), feedback: `Gender detective: ${genderReason(n0)} → *${indefArt(n0.g)}*.` },
      { wrong: home.forms.map((n) => `${w.es ? w.es + " " : ""}${verb} ${indef(n)}${condo ? " en una urbanización" : ""}${loc ? ` ${loc.es}` : ""}`), feedback: "You live *in* it — keep *en*: *vivo en…*" },
    ];
    accept[0] = canonical;
    return {
      prompt,
      answer: text(accept),
      solution: [
        `${w.en} → *vivir* in the ${PERSON_LABEL[w.p]} form: *${verb}*.`,
        `'${home.prep} ${aAn(home.en)}' → *en ${indef(n0)}* (${genderReason(n0)}).`,
        ...(condo ? ["A condo is *una urbanización* in Spain: homes sharing a pool and gardens."] : []),
        ...(loc ? [`'${loc.en}' → *${loc.es}*.`] : []),
        `**${canonical}**`,
      ],
      hint: w.p === "yo" ? "'I live' is one word in Spanish. Then *en* + *un* or *una*." : "Who lives there? Pick the right form of *vivir*, then *en* + *un/una*.",
      traps: mkTraps(accept, wrongs),
    };
  },
};

// 5. Location: está en… -------------------------------------------------------

const locationPhrase: Drill = {
  id: `${TOPIC}.location-esta-en`,
  topicId: TOPIC,
  title: "Where it is: está en el centro / en las afueras…",
  level: 1,
  guideRef: "location",
  generate(rng, tier) {
    const loc = rng.pick(LOCS);
    if (tier === 1 && rng.bool(0.3)) {
      // Phrase only.
      const accept = [loc.es];
      const wrongs = [
        { wrong: [loc.es.replace(/^en /, "")], feedback: "Don't forget *en* (in / on) at the start." },
        ...(loc.es === "en las afueras" ? [{ wrong: ["en la afuera", "en el afuera"], feedback: "*Las afueras* is always plural and feminine: *en las afueras*." }] : []),
      ];
      return {
        prompt: rng.bool() ? `Write '${loc.en}' in Spanish.` : `How do you say '${loc.en}' in Spanish?`,
        answer: text(accept),
        solution: [`'${loc.en}' → **${loc.es}**.`, "Spanish uses *en* for both 'in' and 'on'."],
        hint: "Start with *en*, then the article and the place.",
        traps: mkTraps(accept, wrongs),
      };
    }
    const subjPool = HOUSE_SUBJ.filter((s) => (tier === 1 ? s.en.startsWith("My") : true));
    const s = rng.pick(subjPool.filter((x) => !x.farm || loc.farmOk));
    const city = tier === 3 && loc.ofCity && rng.bool(0.7) ? rng.pick(CITIES) : null;
    const where = `${loc.es}${city ? ` de ${city.es}` : ""}`;
    const enWhere = `${loc.en}${city ? ` of ${city.en}` : ""}`;
    const accept = s.forms.map((f) => `${f.es} ${ESTA} ${where}`);
    accept[0] = `${cap(accept[0])}.`;
    const wrongs = [
      { wrong: s.forms.map((f) => `${f.es} ${ES} ${where}`), feedback: "Location uses *estar*: *está*, not *es* (*es* is for describing what it's like)." },
      ...(loc.es === "en las afueras" ? [{ wrong: s.forms.map((f) => `${f.es} ${ESTA} en la afuera${city ? ` de ${city.es}` : ""}`), feedback: "*Las afueras* is always plural: *en las afueras*." }] : []),
      { wrong: s.forms.map((f) => `${f.es} ${ESTA} ${where.replace(/^en /, "")}`), feedback: "Keep *en* before the place: *está en…*" },
    ];
    return {
      prompt: `Translate into Spanish: '${s.en} is ${enWhere}.'`,
      answer: text(accept),
      solution: [
        `It says **where** it is → *estar*: *${ESTA}*.`,
        `'${loc.en}' → *${loc.es}*${city ? `; 'of ${city.en}' → *de ${city.es}* (a name has no article, so no *del*)` : ""}.`,
        `**${accept[0]}**`,
      ],
      hint: "Location or description? Location always takes *está*.",
      traps: mkTraps(accept, wrongs),
    };
  },
};

// 6. vivir: present tense, any person ----------------------------------------

const VIVIR_FRAMES: Record<Person, string[]> = {
  yo: ["Yo ___ en Singapur.", "Yo ___ en un piso con mi familia."],
  tú: ["¿Tú ___ en una casa o en un piso?", "¿Dónde ___ tú?"],
  él: ["Mi abuela ___ en una granja.", "Pablo ___ en las afueras de Sevilla.", "Mi profesora ___ cerca del colegio."],
  nosotros: ["Mi familia y yo ___ en un piso.", "Nosotros ___ en la costa."],
  vosotros: ["Vosotros ___ cerca de la playa, ¿verdad?", "¿Dónde ___ vosotros?"],
  ellos: ["Mis primos ___ en un pueblo.", "Lucía y Diego ___ en Madrid."],
};
const VIVIR_Q: { p: Person; ask: Person; q: string; en: string; extra: string[] }[] = [
  { p: "yo", ask: "tú", q: "¿Dónde ___?", en: "I live", extra: [] },
  { p: "nosotros", ask: "vosotros", q: "¿Dónde ___?", en: "We live", extra: [] },
  { p: "él", ask: "él", q: "¿Dónde ___ tu abuela?", en: "She lives", extra: ["mi abuela"] },
  { p: "ellos", ask: "ellos", q: "¿Dónde ___ tus primos?", en: "They live", extra: ["mis primos"] },
];

const vivirConj: Drill = {
  id: `${TOPIC}.vivir-present`,
  topicId: TOPIC,
  title: "vivir: present tense for any person",
  level: 2,
  guideRef: "types-of-home",
  generate(rng, tier) {
    const mode = tier === 3 ? rng.pick([1, 2, 2]) : rng.int(0, 1);
    if (mode === 2) {
      const q = rng.pick(VIVIR_Q);
      const home = rng.pick(HOMES);
      const loc = rng.pick(LOCS.filter((l) => !home.farm || l.farmOk));
      const form = V("vivir", q.p);
      const tail = home.forms.map((n) => `en ${indef(n)} ${loc.es}`);
      const starts = uniq([...acceptedForms("vivir", "present", q.p), ...q.extra.map((e) => `${e} ${form}`)]);
      const accept = cross(starts, tail);
      accept[0] = `${cap(form)} ${tail[0]}.`;
      const wrong = WRONG_ENDINGS[q.p];
      return {
        prompt: `Answer the question in Spanish: *${q.q.replace("___", V("vivir", q.ask))}* — '${q.en} ${home.prep} ${aAn(home.en)} ${loc.en}.'`,
        answer: text(accept),
        solution: [
          `The question uses *${V("vivir", q.ask)}*; the answer is about ${q.en.split(" ")[0].toLowerCase() === "i" ? "you" : q.en.split(" ")[0].toLowerCase()} → ${PERSON_LABEL[q.p]}.`,
          `*viv-* + the -ir ending → *${form}*.`,
          `**${accept[0]}**`,
        ],
        hint: "Switch the person: a question with *vives* gets an answer with *vivo*; *vivís* gets *vivimos*.",
        traps: mkTraps(accept, [
          { wrong: tail.map((t) => `${V("vivir", q.ask)} ${t}`), feedback: `You copied the verb from the question. Answering about ${q.en.split(" ")[0]}, use *${form}*.` },
          { wrong: [wrong.er, wrong.ar].map((x) => `${x} ${tail[0]}`), feedback: "*vivir* is an *-ir* verb: *vivimos, vivís* — not the *-er* or *-ar* endings." },
        ]),
      };
    }
    const persons = tier === 1 ? (["yo", "tú", "él", "nosotros", "ellos"] as Person[]) : PERSONS;
    const p = rng.pick(persons);
    const form = V("vivir", p);
    const wrong = WRONG_ENDINGS[p];
    const wrongs = [
      { wrong: [wrong.er], feedback: `*vivir* is an *-ir* verb: the ${PERSON_LABEL[p]} ending is *-${form.slice(3)}*, not the *-er* ending.` },
      { wrong: [wrong.ar], feedback: "Those are *-ar* endings. *vivir* is an *-ir* verb: *vivo, vives, vive, vivimos, vivís, viven*." },
      { wrong: ["vivir"], feedback: "That's the infinitive. Take off *-ir* and add the ending for the person." },
    ];
    if (mode === 0) {
      const accept = acceptedForms("vivir", "present", p);
      return {
        prompt: rng.bool() ? `Write the present tense of *vivir* (to live) for **${PERSON_LABEL[p]}**.` : `Conjugate *vivir* in the present tense: **${PERSON_LABEL[p]}**.`,
        answer: text(accept),
        solution: ["*vivir* is a regular *-ir* verb → stem *viv-*.", `${PERSON_LABEL[p]} ending: *-${form.slice(3)}*.`, `**${form}**`],
        hint: "Stem *viv-*, then the *-ir* ending: -o, -es, -e, -imos, -ís, -en.",
        traps: mkTraps(accept, wrongs),
      };
    }
    const frame = rng.pick(VIVIR_FRAMES[p]);
    const accept = [form, frame.replace("___", form)];
    return {
      prompt: `Fill the gap with the correct form of *vivir*:\n\n*${frame}*`,
      answer: text(accept),
      solution: [`Who lives? → ${PERSON_LABEL[p]}.`, `*viv-* + *-${form.slice(3)}* → **${form}**.`, `*${frame.replace("___", form)}*`],
      hint: "Find the subject first. *Mi familia y yo* = we; *mis primos* = they.",
      traps: mkTraps(accept, wrongs),
    };
  },
};

// 7. cerca de / lejos de: de + el = del --------------------------------------

interface Near {
  n: Noun;
  pl: boolean;
  en: string;
}
const NEAR: Near[] = [
  { n: N("mar", "m", "mares"), pl: false, en: "the sea" },
  { n: N("centro", "m", "centros"), pl: false, en: "the centre" },
  { n: N("colegio", "m", "colegios"), pl: false, en: "the school" },
  { n: N("parque", "m", "parques"), pl: false, en: "the park" },
  { n: N("pueblo", "m", "pueblos"), pl: false, en: "the village" },
  { n: N("playa", "f", "playas"), pl: false, en: "the beach" },
  { n: N("ciudad", "f", "ciudades"), pl: false, en: "the city" },
  { n: N("costa", "f", "costas"), pl: false, en: "the coast" },
  { n: N("estación de metro", "f", "estaciones de metro"), pl: false, en: "the metro station" },
  { n: N("tienda", "f", "tiendas"), pl: true, en: "the shops" },
  { n: N("montaña", "f", "montañas"), pl: true, en: "the mountains" },
];
const nearPhrase = (x: Near, cerca: boolean) => `${cerca ? "cerca" : "lejos"} ${deArt(x.n.g, x.pl)} ${x.pl ? x.n.pl : x.n.sg}`;

const cercaLejos: Drill = {
  id: `${TOPIC}.cerca-lejos-del`,
  topicId: TOPIC,
  title: "cerca de / lejos de: de + el = del",
  level: 2,
  guideRef: "location",
  generate(rng, tier) {
    const modes = tier === 1 ? [0, 1] : tier === 2 ? [0, 1, 2] : [2, 3];
    const mode = rng.pick(modes);
    const x = rng.pick(NEAR);
    const cerca = rng.bool();
    const word = x.pl ? x.n.pl : x.n.sg;
    const art = defArt(x.n.g, x.pl);
    const contracts = x.n.g === "m" && !x.pl;
    const rule = contracts ? `*de + el* → *del*` : `*de ${art}* never contracts — only *el* does`;
    const wrongFor = (phrase: string) =>
      contracts
        ? [{ wrong: [phrase.replace(" del ", " de el ")], feedback: "*de + el* always shortens to *del*: *cerca del…, lejos del…*" }]
        : [{ wrong: [phrase.replace(` de ${art} `, " del ")], feedback: `*${word}* is ${gn(x.n.g, x.pl)} (*${art}*), and only *el* contracts. Keep *de ${art}*.` }];
    if (mode === 0) {
      const gap = deArt(x.n.g, x.pl);
      const full = nearPhrase(x, cerca);
      const accept = [gap, full];
      return {
        prompt: `Fill the gap with *del*, *de la*, *de los* or *de las*:\n\n*Mi casa está ${cerca ? "cerca" : "lejos"} ___ ${word}.* (${art} ${word})`,
        answer: text(accept),
        solution: [`*${word}* takes *${art}*.`, `${cap(rule)}.`, `**${full}**`],
        hint: "Which article does the noun take? Only *de + el* joins up.",
        traps: mkTraps(accept, contracts ? [{ wrong: ["de el"], feedback: "*de + el* always shortens to *del*." }] : [{ wrong: ["del"], feedback: `Only *el* contracts. *${word}* takes *${art}* → *de ${art}*.` }]),
      };
    }
    if (mode === 1) {
      const full = nearPhrase(x, cerca);
      const accept = [full];
      return {
        prompt: `Write in Spanish: '${cerca ? "near" : "far from"} ${x.en}'.`,
        answer: text(accept),
        solution: [`'${cerca ? "near" : "far from"}' → *${cerca ? "cerca de" : "lejos de"}*.`, `${x.en} → *${art} ${word}*; ${rule}.`, `**${full}**`],
        hint: "*cerca de* / *lejos de* + the article. Does *de* meet *el*?",
        traps: mkTraps(accept, wrongFor(full)),
      };
    }
    if (mode === 2) {
      const s = rng.pick(HOUSE_SUBJ.filter((h) => !h.farm));
      const full = nearPhrase(x, cerca);
      const accept = s.forms.map((f) => `${f.es} ${ESTA} ${full}`);
      accept[0] = `${cap(accept[0])}.`;
      return {
        prompt: `Translate into Spanish: '${s.en} is ${cerca ? "near" : "far from"} ${x.en}.'`,
        answer: text(accept),
        solution: [`Location → *${ESTA}*.`, `'${cerca ? "near" : "far from"} ${x.en}' → *${full}* (${rule}).`, `**${accept[0]}**`],
        hint: "Location → *está*. Then *cerca de* / *lejos de* + article — watch for *del*.",
        traps: mkTraps(accept, [...wrongFor(accept[0]), { wrong: s.forms.map((f) => `${f.es} ${ES} ${full}`), feedback: "Location uses *está*, not *es*." }]),
      };
    }
    // mode 3: two places, cerca … pero lejos …
    const y = rng.pick(NEAR.filter((z) => z !== x && z.n.g !== x.n.g));
    const a = nearPhrase(x, true);
    const b = nearPhrase(y, false);
    const accept = acceptedForms("vivir", "present", "yo").map((v) => `${v} ${a} pero ${b}`);
    accept[0] = `${cap(accept[0])}.`;
    const wrongA = x.n.g === "m" && !x.pl ? a.replace(" del ", " de el ") : a.replace(/ de (la|las|los) /, " del ");
    const wrongB = y.n.g === "m" && !y.pl ? b.replace(" del ", " de el ") : b.replace(/ de (la|las|los) /, " del ");
    return {
      prompt: `Translate into Spanish: 'I live near ${x.en} but far from ${y.en}.'`,
      answer: text(accept),
      solution: [
        `'I live' → *vivo*; 'but' → *pero*.`,
        `'near ${x.en}' → *${a}*.`,
        `'far from ${y.en}' → *${b}*.`,
        `**${accept[0]}**`,
      ],
      hint: "Check each place: does *de* meet a masculine singular *el*? Only then write *del*.",
      traps: mkTraps(accept, [{ wrong: [`vivo ${wrongA} pero ${wrongB}`, `vivo ${wrongA} pero ${b}`, `vivo ${a} pero ${wrongB}`], feedback: "Only *de + el* contracts to *del*; *de la / de los / de las* stay as two words." }]),
    };
  },
};

// 8. hay / tiene + number + rooms -------------------------------------------

const homeSubjForHay = () => [
  { en: "house", forms: ["casa"] },
  { en: "flat", forms: ["piso", "apartamento"] },
];

function hayAccepts(homes: string[], np: string[], neg: boolean): string[] {
  const no = neg ? "no " : "";
  return homes.flatMap((h) => np.flatMap((x) => [`en mi ${h} ${no}${HAY} ${x}`, `${no}${HAY} ${x} en mi ${h}`, `mi ${h} ${no}${TIENE} ${x}`]));
}

const hayRooms: Drill = {
  id: `${TOPIC}.hay-number-rooms`,
  topicId: TOPIC,
  title: "hay / tiene + number + rooms",
  level: 2,
  guideRef: "rooms",
  generate(rng, tier) {
    const mode = tier === 1 ? 0 : tier === 2 ? rng.pick([0, 0, 1]) : rng.pick([2, 2, 3]);
    const h = rng.pick(homeSubjForHay());
    if (mode === 0 || mode === 2) {
      const dream = mode === 2;
      const r = dream
        ? rng.pick([roomByEn("bedroom"), roomByEn("bathroom"), roomByEn("living room"), ...DREAM_ROOMS.filter((d) => d.max > 1)])
        : tier === 1
          ? rng.pick([roomByEn("bedroom"), roomByEn("bathroom"), roomByEn("kitchen"), roomByEn("living room")])
          : rng.pick(ROOMS);
      const n = dream ? rng.int(5, 20) : rng.int(1, tier === 1 ? Math.min(r.max, 4) : r.max);
      const np = r.forms.map((f) => `${numEs(n, f.g)} ${n === 1 ? f.sg : f.pl}`);
      const enRoom = n === 1 ? r.en : r.enPl;
      let accept: string[];
      let prompt: string;
      if (dream) {
        accept = np.flatMap((x) => [`mi casa ideal ${TIENE} ${x}`, `en mi casa ideal ${HAY} ${x}`, `${HAY} ${x} en mi casa ideal`]);
        accept[0] = `${cap(accept[0])}.`;
        prompt = `Dream big! Translate into Spanish: 'My ideal home has ${NUM_EN[n]} ${enRoom}.' Write the number as a word.`;
      } else {
        const useHas = rng.bool();
        accept = hayAccepts(h.forms, np, false);
        if (useHas) accept.unshift(`${cap(`mi ${h.forms[0]} ${TIENE} ${np[0]}`)}.`);
        else accept[0] = `${cap(accept[0])}.`;
        prompt = useHas
          ? `Translate into Spanish: 'My ${h.en} has ${NUM_EN[n]} ${enRoom}.' Write the number as a word.`
          : `Translate into Spanish: 'In my ${h.en} there ${n === 1 ? "is" : "are"} ${NUM_EN[n]} ${enRoom}.' Write the number as a word.`;
      }
      const f0 = r.forms[0];
      const wrongs: { wrong: string[]; feedback: string }[] = [];
      if (n === 1) wrongs.push({ wrong: accept.map((a) => a.replace(new RegExp(`\\b${indefArt(f0.g)} `), "uno ")), feedback: `Before a noun, 'one' is *un* (masculine) or *una* (feminine) — never *uno*.` });
      else wrongs.push({ wrong: accept.slice(0, 3).map((a) => a.replace(f0.pl, f0.sg)), feedback: `More than one → make the noun plural: *${f0.pl}*.` });
      wrongs.push({ wrong: accept.slice(0, 3).map((a) => a.replace(NUM_ES[n], String(n)).replace(new RegExp(`\\b${indefArt(f0.g)} `), "1 ")), feedback: "Right idea — now write the number as a Spanish word." });
      return {
        prompt,
        answer: text(accept),
        solution: [
          `'there is / there are' → *hay* (it never changes); 'has' → *${TIENE}*.`,
          `${NUM_EN[n]} → *${numEs(n, f0.g)}*${n === 1 ? ` (${f0.g === "m" ? "masculine" : "feminine"} noun)` : ""}; ${n === 1 ? `*${f0.sg}*` : `plural *${f0.pl}*`}.`,
          `**${accept[0]}**`,
        ],
        hint: n === 1 ? "'One' before a noun agrees: *un* or *una*." : "Number + plural noun. Plurals: *-s* after a vowel, *-es* after a consonant.",
        traps: mkTraps(accept, wrongs),
      };
    }
    // mode 1 / 3: no hay (… pero …)
    const lack = rng.pick([...ROOMS, ...(tier === 3 ? DREAM_ROOMS : [])].filter((r) => r.canLack));
    const lackNP = lack.forms.map((f) => f.sg);
    if (mode === 1) {
      const accept = hayAccepts(h.forms, lackNP, true);
      accept[0] = `${cap(accept[0])}.`;
      const prompt = rng.bool()
        ? `Translate into Spanish: 'In my ${h.en} there isn't ${aAn(lack.en)}.'`
        : `Translate into Spanish: 'My ${h.en} doesn't have ${aAn(lack.en)}.'`;
      return {
        prompt,
        answer: text(accept),
        solution: ["'there isn't' → *no hay*; 'doesn't have' → *no tiene*.", `After *no hay* / *no tiene*, drop *un/una*: *no hay ${lack.forms[0].sg}*.`, `**${accept[0]}**`],
        hint: "Put *no* in front of *hay* — and leave out *un/una*.",
        traps: mkTraps(accept, [
          { wrong: hayAccepts(h.forms, lack.forms.map(indef), true), feedback: `Nearly — after *no hay* / *no tiene*, drop the *${indefArt(lack.forms[0].g)}*: *no hay ${lack.forms[0].sg}*.` },
          { wrong: hayAccepts(h.forms, lackNP, false), feedback: "That says there IS one. Add *no* before *hay* / *tiene*." },
        ]),
      };
    }
    const r = rng.pick(ROOMS.filter((x) => x !== lack && x.max > 1));
    const n = rng.int(2, r.max);
    const np = r.forms.map((f) => `${NUM_ES[n]} ${f.pl}`);
    const accept = h.forms.flatMap((home) =>
      np.flatMap((x) =>
        lackNP.flatMap((l) => [
          `en mi ${home} ${HAY} ${x} pero no ${HAY} ${l}`,
          `${HAY} ${x} en mi ${home} pero no ${HAY} ${l}`,
          `mi ${home} ${TIENE} ${x} pero no ${TIENE} ${l}`,
        ]),
      ),
    );
    accept[0] = `${cap(accept[0])}.`;
    return {
      prompt: `Translate into Spanish: 'In my ${h.en} there are ${NUM_EN[n]} ${r.enPl}, but there isn't ${aAn(lack.en)}.' Write the number as a word.`,
      answer: text(accept),
      solution: [`'there are' → *hay* + *${NUM_ES[n]} ${r.forms[0].pl}*.`, `'but' → *pero*; 'there isn't' → *no hay* with no *un/una*.`, `**${accept[0]}**`],
      hint: "Two halves joined by *pero*. The second half needs *no hay* — and no article.",
      traps: mkTraps(accept, [
        { wrong: [`en mi ${h.forms[0]} hay ${np[0]} pero no hay ${indef(lack.forms[0])}`], feedback: `After *no hay*, drop *${indefArt(lack.forms[0].g)}*: *no hay ${lack.forms[0].sg}*.` },
        { wrong: [`en mi ${h.forms[0]} hay ${NUM_ES[n]} ${r.forms[0].sg} pero no hay ${lack.forms[0].sg}`], feedback: `More than one → plural noun: *${r.forms[0].pl}*.` },
      ]),
    };
  },
};

// 9. Floors: planta baja / primera planta / arriba / abajo -------------------

interface Floor {
  es: string;
  en: string;
  level: "down" | "up";
}
const FLOORS: Floor[] = [
  { es: "en la planta baja", en: "on the ground floor", level: "down" },
  { es: "abajo", en: "downstairs", level: "down" },
  { es: "en la primera planta", en: "on the first floor", level: "up" },
  { es: "arriba", en: "upstairs", level: "up" },
];
const INDOOR = ROOMS.filter((r) => r.where !== "out");

/** "El salón está abajo" and "Abajo está el salón". */
function whereAccepts(subj: string[], pl: boolean, f: Floor): string[] {
  const v = estar(pl);
  return subj.flatMap((s) => [`${s} ${v} ${f.es}`, `${f.es} ${v} ${s}`]);
}

const floors: Drill = {
  id: `${TOPIC}.floors`,
  topicId: TOPIC,
  title: "Floors: en la planta baja, en la primera planta, arriba, abajo",
  level: 2,
  guideRef: "rooms",
  generate(rng, tier) {
    const mode = tier === 1 ? rng.pick([0, 1, 1]) : tier === 2 ? rng.pick([1, 2, 3]) : rng.pick([3, 4, 4]);
    if (mode === 0) {
      const f = rng.pick(FLOORS);
      const toEs = rng.bool();
      if (toEs) {
        const accept = [f.es];
        return {
          prompt: `Write '${f.en}' in Spanish.`,
          answer: text(accept),
          solution: [`'${f.en}' → **${f.es}**.`, f.level === "down" ? "*baja* = low: the low floor." : "*primera* = first: the first floor above the ground."],
          hint: "*planta* = floor; *baja* = low; *primera* = first. *arriba* / *abajo* need no article.",
          traps: mkTraps(accept, [{ wrong: ["en la planta primera", "en el primer piso"], feedback: "The course phrase is *en la primera planta* — the number comes first." }]),
        };
      }
      const accept = uniq([f.en, f.en.replace(/^on /, "")]);
      return {
        prompt: `What does *${f.es}* mean in English?`,
        answer: text(accept),
        solution: [`*${f.es}* = **${f.en}**.`],
        hint: "*baja* = low, *primera* = first, *arriba* = up, *abajo* = down.",
        traps: mkTraps(accept, f.es === "en la primera planta" ? [{ wrong: ["on the ground floor", "ground floor"], feedback: "*primera* = first: the floor above the ground floor." }] : []),
      };
    }
    if (mode === 1 || mode === 2) {
      const pl = mode === 2;
      const r = rng.pick(pl ? INDOOR.filter((x) => x.max > 1) : INDOOR);
      const f = rng.pick(FLOORS.filter((x) => x.level === r.where));
      const subj = r.forms.map((n) => def(n, pl));
      const accept = whereAccepts(subj, pl, f);
      accept[0] = `${cap(accept[0])}.`;
      const wrongs = [
        { wrong: subj.map((s) => `${s} ${ser(pl)} ${f.es}`), feedback: `Where something is → *estar*: *${estar(pl)}*, not *${ser(pl)}*.` },
        pl
          ? { wrong: subj.map((s) => `${s} ${ESTA} ${f.es}`), feedback: `Plural subject → *${ESTAN}* (they are).` }
          : { wrong: subj.map((s) => `${s} ${ESTAN} ${f.es}`), feedback: `One room → *${ESTA}*.` },
      ];
      return {
        prompt: `Translate into Spanish: 'The ${pl ? r.enPl : r.en} ${pl ? "are" : "is"} ${f.en}.'`,
        answer: text(accept),
        solution: [
          `'the ${pl ? r.enPl : r.en}' → *${subj[0]}*.`,
          `Location → *estar*: *${estar(pl)}*${pl ? " (plural)" : ""}.`,
          `'${f.en}' → *${f.es}*.`,
          `**${accept[0]}**`,
        ],
        hint: pl ? "More than one room → *están*." : "A particular room + where it is → *está*.",
        traps: mkTraps(accept, wrongs),
      };
    }
    if (mode === 3) {
      // hay + number + floor
      const lvl = rng.pick<"down" | "up">(["down", "up"]);
      const r = rng.pick(INDOOR.filter((x) => x.where === lvl));
      const f = rng.pick(FLOORS.filter((x) => x.level === lvl));
      const n = rng.int(1, r.max);
      const np = r.forms.map((g) => `${numEs(n, g.g)} ${n === 1 ? g.sg : g.pl}`);
      const accept = np.flatMap((x) => [`${f.es} ${HAY} ${x}`, `${HAY} ${x} ${f.es}`]);
      accept[0] = `${cap(accept[0])}.`;
      const enF = f.en.replace(/^on t/, "On t").replace(/^upstairs/, "Upstairs").replace(/^downstairs/, "Downstairs");
      const r0 = r.forms[0];
      return {
        prompt: `Translate into Spanish: '${enF} there ${n === 1 ? "is" : "are"} ${n === 1 ? aAn(r.en) : `${NUM_EN[n]} ${r.enPl}`}.'${n > 1 ? " Write the number as a word." : ""}`,
        answer: text(accept),
        solution: [`'${f.en}' → *${f.es}*.`, `'there ${n === 1 ? "is" : "are"}' → *hay* (it never changes).`, `**${accept[0]}**`],
        hint: "Listing what exists → *hay* + *un/una* or a number. *hay* never changes.",
        traps: mkTraps(accept, [
          { wrong: np.map((x) => `${f.es} ${n === 1 ? ESTA : ESTAN} ${x}`), feedback: "Saying what exists (with *un/una* or a number) → *hay*, not *está/están*." },
          { wrong: n === 1 ? [] : [`${f.es} hay ${NUM_ES[n]} ${r0.sg}`], feedback: `More than one → plural: *${r0.pl}*.` },
        ]),
      };
    }
    // mode 4: two clauses — one room downstairs, one (plural) upstairs
    const down = rng.pick(INDOOR.filter((x) => x.where === "down"));
    const up = rng.pick(INDOOR.filter((x) => x.where === "up" && x.max > 1));
    const fd = rng.pick(FLOORS.filter((x) => x.level === "down"));
    const fu = rng.pick(FLOORS.filter((x) => x.level === "up"));
    const a = whereAccepts(down.forms.map((n) => def(n)), false, fd);
    const b = whereAccepts(up.forms.map((n) => def(n, true)), true, fu);
    const accept = cross(a, b, " y ");
    accept[0] = `${cap(accept[0])}.`;
    return {
      prompt: `Translate into Spanish: 'The ${down.en} is ${fd.en} and the ${up.enPl} are ${fu.en}.'`,
      answer: text(accept),
      solution: [
        `One room → *${ESTA}*: *${a[0]}*.`,
        `Several rooms → *${ESTAN}*: *${b[0]}*.`,
        `Join with *y*: **${accept[0]}**`,
      ],
      hint: "Two clauses: singular room → *está*, plural rooms → *están*.",
      traps: mkTraps(accept, [
        { wrong: [`${a[0]} y ${def(up.forms[0], true)} ${ESTA} ${fu.es}`], feedback: `The ${up.enPl} are plural → *${ESTAN}*.` },
        { wrong: [`${def(down.forms[0])} ${ES} ${fd.es} y ${def(up.forms[0], true)} ${SON} ${fu.es}`], feedback: "Location → *estar* (*está / están*), not *ser*." },
      ]),
    };
  },
};

// 10. Adjective agreement & position ----------------------------------------

function pickAdj(rng: Rng, k: Kind, exclude: Adj[] = [], filter: (a: Adj) => boolean = () => true): Adj {
  const groups = new Set(exclude.map((e) => e.group));
  const pool = adjsFor(k).filter((a) => !groups.has(a.group) && filter(a));
  return rng.pick(pool);
}

const NUM_SMALL = [2, 3, 4];

const adjAgreement: Drill = {
  id: `${TOPIC}.adjective-agreement`,
  topicId: TOPIC,
  title: "Adjective agreement and position (after the noun)",
  level: 2,
  guideRef: "describing-home",
  generate(rng, tier) {
    const mode = tier === 1 ? rng.pick([0, 1]) : tier === 2 ? rng.pick([0, 1, 1, 2]) : rng.pick([1, 2, 3]);
    const t = rng.pick(THINGS);
    const n0 = t.forms[0];
    const pl = tier === 1 ? false : tier === 3 ? rng.bool(0.6) : rng.bool(0.4);
    if (mode === 0) {
      const a = pickAdj(rng, t.kind, [], tier === 1 ? (x) => !twoForm(x) : () => true);
      const sub = def(n0, pl);
      const form = agree(a, n0.g, pl);
      const accept = [...agreeAll(a, n0.g, pl), `${sub} ${ser(pl)} ${form}`];
      const base = a.forms[0].ms;
      return {
        prompt: `Make the adjective agree:\n\n*${cap(sub)} ${ser(pl)} ___.* (${base} = ${a.en})`,
        answer: text(accept),
        solution: [
          `*${sub}* is ${gn(n0.g, pl)}.`,
          twoForm(a) ? `*${base}* has the same form for masculine and feminine; plural ${pl ? `adds *-${form.slice(base.length)}*` : "would add -s/-es"}.` : `*${base}* is an *-o* adjective with four forms: ${a.forms[0].ms}, ${a.forms[0].fs}, ${a.forms[0].mp}, ${a.forms[0].fp}.`,
          `**${form}**`,
        ],
        hint: "Is the noun masculine or feminine? Singular or plural?",
        traps: mkTraps(accept, [
          { wrong: [base], feedback: `*${sub}* is ${gn(n0.g, pl)}, so the adjective must change: *${form}*.` },
          { wrong: [agree(a, n0.g === "m" ? "f" : "m", pl)], feedback: `Check the gender: ${genderReason(n0)}.` },
        ]),
      };
    }
    if (mode === 1) {
      const a = pickAdj(rng, t.kind, [], tier === 1 ? (x) => !twoForm(x) : () => true);
      const num = pl ? rng.pick(NUM_SMALL) : 1;
      const accept = t.forms.flatMap((n) => agreeAll(a, n.g, pl).map((adj) => `${pl ? NUM_ES[num] : indefArt(n.g)} ${pl ? n.pl : n.sg} ${adj}`));
      const en = pl ? `${NUM_EN[num]} ${a.en} ${t.enPl}` : aAn(`${a.en} ${t.en}`);
      const form = agree(a, n0.g, pl);
      const det = pl ? NUM_ES[num] : indefArt(n0.g);
      return {
        prompt: `Translate into Spanish: '${en}'.`,
        answer: text(accept),
        solution: [
          `Noun first: *${det} ${pl ? n0.pl : n0.sg}* (${gn(n0.g, pl)}).`,
          `Then the adjective, agreeing: *${a.forms[0].ms}* → *${form}*.`,
          `**${accept[0]}**`,
        ],
        hint: "Spanish names the thing first, then describes it. Make the adjective match.",
        traps: mkTraps(accept, [
          { wrong: t.forms.map((n) => `${pl ? NUM_ES[num] : indefArt(n.g)} ${agree(a, n.g, pl)} ${pl ? n.pl : n.sg}`), feedback: `English word order! In Spanish the adjective goes **after** the noun: *${accept[0]}*.` },
          { wrong: t.forms.map((n) => `${pl ? NUM_ES[num] : indefArt(n.g)} ${pl ? n.pl : n.sg} ${a.forms[0].ms}`), feedback: `The adjective must agree with a ${gn(n0.g, pl)} noun: *${form}*.` },
        ]),
      };
    }
    if (mode === 2) {
      // The X(s) is/are ADJ.
      const a = pickAdj(rng, t.kind);
      const pl2 = tier === 3 ? true : pl;
      const accept = t.forms.flatMap((n) => agreeAll(a, n.g, pl2).map((adj) => `${def(n, pl2)} ${ser(pl2)} ${adj}`));
      accept[0] = `${cap(accept[0])}.`;
      const form = agree(a, n0.g, pl2);
      return {
        prompt: `Translate into Spanish: 'The ${pl2 ? t.enPl : t.en} ${pl2 ? "are" : "is"} ${a.en}.'`,
        answer: text(accept),
        solution: [`*${def(n0, pl2)}* is ${gn(n0.g, pl2)} → *${ser(pl2)}*.`, `*${a.forms[0].ms}* → *${form}*.`, `**${accept[0]}**`],
        hint: pl2 ? "Plural noun → *son* and a plural adjective." : "One thing → *es*; make the adjective match its gender.",
        traps: mkTraps(accept, [
          { wrong: t.forms.map((n) => `${def(n, pl2)} ${ser(pl2)} ${agree(a, n.g, false)}`), feedback: `The adjective must be plural too: *${form}*.` },
          { wrong: t.forms.map((n) => `${def(n, pl2)} ${ser(!pl2)} ${agree(a, n.g, pl2)}`), feedback: pl2 ? "More than one → *son*, not *es*." : "One thing → *es*." },
        ]),
      };
    }
    // mode 3: two adjectives after the noun
    const a1 = pickAdj(rng, t.kind);
    const a2 = pickAdj(rng, t.kind, [a1]);
    const num = pl ? rng.pick(NUM_SMALL) : 1;
    const accept = t.forms.flatMap((n) => {
      const det = pl ? NUM_ES[num] : indefArt(n.g);
      const noun = pl ? n.pl : n.sg;
      return cross(agreeAll(a1, n.g, pl), agreeAll(a2, n.g, pl), " y ").flatMap((pair) => {
        const [x, y] = pair.split(" y ");
        return [`${det} ${noun} ${x} y ${y}`, `${det} ${noun} ${y} y ${x}`];
      });
    });
    const en = pl ? `${NUM_EN[num]} ${a1.en}, ${a2.en} ${t.enPl}` : aAn(`${a1.en}, ${a2.en} ${t.en}`);
    const f1 = agree(a1, n0.g, pl);
    const f2 = agree(a2, n0.g, pl);
    return {
      prompt: `Build it up! Translate into Spanish: '${en}'. (Join the two adjectives with *y*.)`,
      answer: text(accept),
      solution: [
        `Noun first: *${pl ? NUM_ES[num] : indefArt(n0.g)} ${pl ? n0.pl : n0.sg}* (${gn(n0.g, pl)}).`,
        `Both adjectives go after it and both agree: *${f1}* y *${f2}*.`,
        `**${accept[0]}**`,
      ],
      hint: "Noun → adjective *y* adjective. Check both endings.",
      traps: mkTraps(accept, [
        { wrong: [`${pl ? NUM_ES[num] : indefArt(n0.g)} ${f1} ${pl ? n0.pl : n0.sg} ${f2}`, `${pl ? NUM_ES[num] : indefArt(n0.g)} ${f1} y ${f2} ${pl ? n0.pl : n0.sg}`], feedback: "In Spanish the adjectives go **after** the noun." },
        { wrong: [`${pl ? NUM_ES[num] : indefArt(n0.g)} ${pl ? n0.pl : n0.sg} ${a1.forms[0].ms} y ${a2.forms[0].ms}`], feedback: `Both adjectives must agree with a ${gn(n0.g, pl)} noun: *${f1}*, *${f2}*.` },
      ]),
    };
  },
};

// 11. Intensifiers --------------------------------------------------------------

interface Int {
  es: string;
  en: string;
  /** Only with slightly negative adjectives (un poco pequeño, demasiado oscuro). */
  negOnly?: boolean;
}
const INTS: Int[] = [
  { es: "muy", en: "very" },
  { es: "bastante", en: "quite" },
  { es: "un poco", en: "a bit", negOnly: true },
  { es: "demasiado", en: "too", negOnly: true },
];
/** Natural intensifier + adjective pairings (no colours; "too ugly" is odd). */
const okWith = (i: Int, a: Adj) => a.group !== "colour" && (!i.negOnly || (!!a.neg && !(i.es === "demasiado" && a.group === "looks")));
const INT_SUBJ: Subj[] = [
  HOUSE_SUBJ[0],
  HOUSE_SUBJ[1],
  { en: "My bedroom", forms: [{ es: "mi dormitorio", g: "m" }, { es: "mi habitación", g: "f" }], pl: false, kind: "room" },
  roomSubj(roomByEn("kitchen"), false),
  roomSubj(roomByEn("living room"), false),
  roomSubj(roomByEn("bathroom"), false),
  roomSubj(roomByEn("garden"), false),
  roomSubj(roomByEn("bedroom"), true),
  { en: "The walls", forms: [{ es: "las paredes", g: "f" }], pl: true, kind: "wall" },
];
/** Wrongly "agreeing" intensifier (demasiada, bastantes) — or null. */
function badInt(i: Int, g: G, pl: boolean): string | null {
  if (i.es === "demasiado") return g === "m" ? (pl ? "demasiados" : null) : pl ? "demasiadas" : "demasiada";
  if (i.es === "bastante") return pl ? "bastantes" : null;
  if (i.es === "muy") return g === "f" && !pl ? "muya" : null;
  return null;
}

const intensifiers: Drill = {
  id: `${TOPIC}.intensifiers`,
  topicId: TOPIC,
  title: "Intensifiers: muy, bastante, un poco, demasiado",
  level: 2,
  guideRef: "describing-home",
  generate(rng, tier) {
    const mode = tier === 1 ? 0 : tier === 2 ? rng.pick([0, 1]) : rng.pick([1, 2, 2]);
    // Mode 2 needs a positive and a negative adjective: walls only have bonito/feo + colours.
    const pool = INT_SUBJ.filter((s) => (tier === 1 ? !s.pl : true) && (mode !== 2 || s.kind !== "wall"));
    const s = rng.pick(pool);
    const g0 = s.forms[0].g;
    const i1 = rng.pick(INTS.filter((i) => adjsFor(s.kind).some((a) => okWith(i, a))));
    const a1 = pickAdj(rng, s.kind, [], (a) => okWith(i1, a));
    const sv = ser(s.pl);
    if (mode === 0) {
      const sub = s.forms[0].es;
      const phrase = `${i1.es} ${agree(a1, g0, s.pl)}`;
      const accept = [...agreeAll(a1, g0, s.pl).map((x) => `${i1.es} ${x}`), `${sub} ${sv} ${phrase}`];
      const bad = badInt(i1, g0, s.pl);
      return {
        prompt: `Complete the sentence in Spanish:\n\n*${cap(sub)} ${sv} ___ ___.* (${i1.en} + ${a1.en})`,
        answer: text(accept),
        solution: [`'${i1.en}' → *${i1.es}* — intensifiers never change.`, `*${sub}* is ${gn(g0, s.pl)} → *${agree(a1, g0, s.pl)}*.`, `**${phrase}**`],
        hint: "The intensifier stays the same; only the adjective agrees.",
        traps: mkTraps(accept, [
          ...(bad ? [{ wrong: [`${bad} ${agree(a1, g0, s.pl)}`], feedback: `*${i1.es}* never changes — only the adjective agrees.` }] : []),
          { wrong: [`${i1.es} ${a1.forms[0].ms}`, `${agree(a1, g0, s.pl)} ${i1.es}`], feedback: `Intensifier first, then the adjective agreeing with *${sub}*: *${phrase}*.` },
        ]),
      };
    }
    if (mode === 1) {
      const accept = s.forms.flatMap((f) => agreeAll(a1, f.g, s.pl).map((x) => `${f.es} ${sv} ${i1.es} ${x}`));
      accept[0] = `${cap(accept[0])}.`;
      const bad = badInt(i1, g0, s.pl);
      return {
        prompt: `Translate into Spanish: '${s.en} ${s.pl ? "are" : "is"} ${i1.en} ${a1.en}.'`,
        answer: text(accept),
        solution: [
          `Describing → *${sv}*.`,
          `'${i1.en}' → *${i1.es}* (never changes).`,
          `*${s.forms[0].es}* is ${gn(g0, s.pl)} → *${agree(a1, g0, s.pl)}*.`,
          `**${accept[0]}**`,
        ],
        hint: "Describing → *es/son*. Intensifier + adjective; only the adjective agrees.",
        traps: mkTraps(accept, [
          ...(bad ? [{ wrong: s.forms.map((f) => `${f.es} ${sv} ${bad} ${agree(a1, f.g, s.pl)}`), feedback: `*${i1.es}* is an intensifier — it never changes its ending.` }] : []),
          { wrong: s.forms.map((f) => `${f.es} ${estar(s.pl)} ${i1.es} ${agree(a1, f.g, s.pl)}`), feedback: `Describing what something is like → *${sv}*, not *${estar(s.pl)}*.` },
          { wrong: s.forms.map((f) => `${f.es} ${sv} ${i1.es} ${a1.forms[0].ms}`), feedback: `Make the adjective agree: *${agree(a1, g0, s.pl)}*.` },
        ]),
      };
    }
    // mode 2: X is very ADJ1 but a bit ADJ2
    const iA = i1.negOnly ? rng.pick(INTS.filter((x) => !x.negOnly)) : i1;
    const i2 = rng.pick(INTS.filter((x) => x.negOnly));
    const aB = pickAdj(rng, s.kind, [], (a) => okWith(i2, a));
    const aA = pickAdj(rng, s.kind, [aB], (a) => !a.neg && a.group !== "colour");
    const accept = s.forms.flatMap((f) =>
      cross(agreeAll(aA, f.g, s.pl), agreeAll(aB, f.g, s.pl), "|").map((pair) => {
        const [x, y] = pair.split("|");
        return `${f.es} ${sv} ${iA.es} ${x} pero ${i2.es} ${y}`;
      }),
    );
    accept[0] = `${cap(accept[0])}.`;
    return {
      prompt: `Build it up! Translate into Spanish: '${s.en} ${s.pl ? "are" : "is"} ${iA.en} ${aA.en} but ${i2.en} ${aB.en}.'`,
      answer: text(accept),
      solution: [
        `Describing → *${sv}*; 'but' → *pero*.`,
        `'${iA.en} ${aA.en}' → *${iA.es} ${agree(aA, g0, s.pl)}*; '${i2.en} ${aB.en}' → *${i2.es} ${agree(aB, g0, s.pl)}*.`,
        `**${accept[0]}**`,
      ],
      hint: "Both adjectives agree with the subject; both intensifiers stay the same.",
      traps: mkTraps(accept, [
        { wrong: s.forms.map((f) => `${f.es} ${sv} ${iA.es} ${aA.forms[0].ms} pero ${i2.es} ${aB.forms[0].ms}`), feedback: `Both adjectives agree with ${gn(g0, s.pl)} *${s.forms[0].es}*.` },
        ...(badInt(i2, g0, s.pl) ? [{ wrong: s.forms.map((f) => `${f.es} ${sv} ${iA.es} ${agree(aA, f.g, s.pl)} pero ${badInt(i2, f.g, s.pl) ?? i2.es} ${agree(aB, f.g, s.pl)}`), feedback: `*${i2.es}* never changes its ending.` }] : []),
      ]),
    };
  },
};

// 12. es or está? Description vs location -------------------------------------

const serEstar: Drill = {
  id: `${TOPIC}.es-or-esta`,
  topicId: TOPIC,
  title: "es or está? Description vs location",
  level: 3,
  guideRef: "location",
  generate(rng, tier) {
    const mode = tier === 3 ? rng.pick([1, 2, 2]) : tier === 2 ? rng.pick([0, 0, 1]) : 0;
    // Subjects: homes (location = place) or rooms (location = floor).
    const roomSide = rng.bool(0.4);
    const pl = tier >= 2 && roomSide && rng.bool(0.4);
    const subj: Subj = roomSide ? roomSubj(rng.pick(INDOOR.filter((r) => !pl || r.max > 1)), pl) : rng.pick(HOUSE_SUBJ);
    const g0 = subj.forms[0].g;
    const locs = roomSide
      ? FLOORS.filter((f) => f.level === subj.floor).map((f) => ({ es: f.es, en: f.en }))
      : LOCS.filter((l) => !subj.farm || l.farmOk).map((l) => ({ es: l.es, en: l.en }));
    const loc = rng.pick(locs);
    const adj = pickAdj(rng, subj.kind, [], (a) => a.group !== "colour");
    if (mode === 0) {
      const isLoc = rng.bool();
      const sub = subj.forms[0].es;
      const tail = isLoc ? loc.es : agree(adj, g0, pl);
      const right = isLoc ? estar(pl) : ser(pl);
      const accept = [right, `${sub} ${right} ${tail}`];
      return {
        prompt: `Complete with the right form of *ser* or *estar* (*es / son / está / están*):\n\n*${cap(sub)} ___ ${tail}.*`,
        answer: text(accept),
        solution: [isLoc ? `*${tail}* says **where** → *estar*.` : `*${tail}* says **what it's like** → *ser*.`, `${pl ? "Plural subject" : "One subject"} → **${right}**.`],
        hint: "Is it saying where it is, or what it's like?",
        traps: mkTraps(accept, [
          { wrong: [isLoc ? ser(pl) : estar(pl)], feedback: isLoc ? "Location always uses *estar*: *está / están*." : "Describing what something is like → *ser*: *es / son*." },
          { wrong: [isLoc ? estar(!pl) : ser(!pl)], feedback: pl ? "The subject is plural → use the plural form." : "The subject is singular → use the singular form." },
        ]),
      };
    }
    if (mode === 1) {
      const isLoc = rng.bool();
      const v = isLoc ? estar(pl) : ser(pl);
      const accept = subj.forms.flatMap((f) => (isLoc ? [`${f.es} ${v} ${loc.es}`] : agreeAll(adj, f.g, pl).map((x) => `${f.es} ${v} ${x}`)));
      accept[0] = `${cap(accept[0])}.`;
      const wv = isLoc ? ser(pl) : estar(pl);
      return {
        prompt: `Translate into Spanish: '${subj.en} ${pl ? "are" : "is"} ${isLoc ? loc.en : adj.en}.'`,
        answer: text(accept),
        solution: [isLoc ? `Where it is → *estar*: *${v}*.` : `What it's like → *ser*: *${v}* (and *${agree(adj, g0, pl)}* agrees).`, `**${accept[0]}**`],
        hint: "Location → *está/están*. Description → *es/son*.",
        traps: mkTraps(accept, [
          { wrong: subj.forms.map((f) => `${f.es} ${wv} ${isLoc ? loc.es : agree(adj, f.g, pl)}`), feedback: isLoc ? "Location → *estar*, never *ser*." : "Description → *ser*." },
        ]),
      };
    }
    // mode 2: both in one sentence, either order
    const locFirst = rng.bool();
    const iv = rng.pick(INTS.filter((i) => !i.negOnly));
    const withInt = rng.bool(0.5);
    const adjEn = `${withInt ? iv.en + " " : ""}${adj.en}`;
    const accept = subj.forms.flatMap((f) =>
      agreeAll(adj, f.g, pl).map((x) => {
        const d = `${ser(pl)} ${withInt ? iv.es + " " : ""}${x}`;
        const l = `${estar(pl)} ${loc.es}`;
        return locFirst ? `${f.es} ${l} y ${d}` : `${f.es} ${d} y ${l}`;
      }),
    );
    accept[0] = `${cap(accept[0])}.`;
    const it = pl ? "they are" : "it is";
    const en = locFirst ? `${subj.en} ${pl ? "are" : "is"} ${loc.en} and ${it} ${adjEn}.` : `${subj.en} ${pl ? "are" : "is"} ${adjEn} and ${it} ${loc.en}.`;
    const swapped = subj.forms.map((f) => {
      const d = `${estar(pl)} ${withInt ? iv.es + " " : ""}${agree(adj, f.g, pl)}`;
      const l = `${ser(pl)} ${loc.es}`;
      return locFirst ? `${f.es} ${l} y ${d}` : `${f.es} ${d} y ${l}`;
    });
    const allEs = subj.forms.map((f) => {
      const d = `${ser(pl)} ${withInt ? iv.es + " " : ""}${agree(adj, f.g, pl)}`;
      const l = `${ser(pl)} ${loc.es}`;
      return locFirst ? `${f.es} ${l} y ${d}` : `${f.es} ${d} y ${l}`;
    });
    return {
      prompt: `Translate into Spanish: '${en}' (No need to repeat 'it' — Spanish drops it.)`,
      answer: text(accept),
      solution: [
        `'${loc.en}' is location → *${estar(pl)} ${loc.es}*.`,
        `'${adjEn}' is description → *${ser(pl)} ${withInt ? iv.es + " " : ""}${agree(adj, g0, pl)}*.`,
        `**${accept[0]}**`,
      ],
      hint: "Two different 'is': one says where, one says what it's like.",
      traps: mkTraps(accept, [
        { wrong: swapped, feedback: "Swapped! Location → *estar*; description → *ser*." },
        { wrong: allEs, feedback: `Location needs *${estar(pl)}*, even in the same sentence as *${ser(pl)}*.` },
      ]),
    };
  },
};

export const drills: Drill[] = [
  genderDetective,
  vivoEn,
  locationPhrase,
  roomsEsEn,
  roomsEnEs,
  vivirConj,
  cercaLejos,
  hayRooms,
  floors,
  adjAgreement,
  intensifiers,
  serEstar,
];
