// Procedural skill drills for "El tiempo libre — Free Time".
// Every verb form comes from the tested conjugator in lib/spanish/verbs.ts.
import type { Drill, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import { conjugate, acceptedForms, PERSONS, PERSON_LABEL, verbInfo, SUBJECT_PRONOUNS, type Person } from "../spanish/verbs.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";
import { vocab } from "../vocab/tiempo-libre.ts";

const TOPIC = "tiempo-libre";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const IDX: Record<Person, number> = { yo: 0, tú: 1, él: 2, nosotros: 3, vosotros: 4, ellos: 5 };
const ENDS: Record<"ar" | "er" | "ir", readonly string[]> = {
  ar: ["o", "as", "a", "amos", "áis", "an"],
  er: ["o", "es", "e", "emos", "éis", "en"],
  ir: ["o", "es", "e", "imos", "ís", "en"],
};

function split(inf: string): { stem: string; group: "ar" | "er" | "ir" } {
  const base = inf.replace(/(ar|er|ir)se$/, "$1");
  return { stem: base.slice(0, -2), group: base.slice(-2) as "ar" | "er" | "ir" };
}

/** What a learner gets by treating the verb as fully regular (salo, vo, quero). */
function regularGuess(inf: string, p: Person): string {
  const { stem, group } = split(inf);
  return stem + ENDS[group][IDX[p]];
}

function stemChange(inf: string): [string, string] | null {
  const tags = verbInfo(inf)?.tags ?? [];
  if (tags.includes("stem-e-ie")) return ["e", "ie"];
  if (tags.includes("stem-o-ue")) return ["o", "ue"];
  if (tags.includes("stem-u-ue")) return ["u", "ue"];
  if (tags.includes("stem-e-i")) return ["e", "i"];
  return null;
}

/** The stem change applied outside the boot too (juegamos, quieremos, puedemos). */
function bootEverywhere(inf: string, p: Person): string | null {
  const sc = stemChange(inf);
  if (!sc) return null;
  const { stem, group } = split(inf);
  const i = stem.lastIndexOf(sc[0]);
  if (i < 0) return null;
  return stem.slice(0, i) + sc[1] + stem.slice(i + sc[0].length) + ENDS[group][IDX[p]];
}

const key = (s: string) => stripAccents(normSpanish(s));

/** Up to two traps, never equal to (or an accent-only variant of) an accepted answer. */
function safeTraps(accept: string[], cands: Array<[string | null | undefined, string]>): Trap[] {
  const acc = new Set(accept.map(key));
  const seen = new Set<string>();
  const out: Trap[] = [];
  for (const [wrong, feedback] of cands) {
    if (!wrong) continue;
    const k = key(wrong);
    if (!k || acc.has(k) || seen.has(k)) continue;
    seen.add(k);
    out.push({ spec: { type: "text", accept: [wrong] }, feedback });
    if (out.length >= 2) break;
  }
  return out;
}

const uniq = (xs: string[]) => [...new Set(xs.map((x) => x.replace(/\s+/g, " ").trim()))].filter(Boolean);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const join = (...parts: string[]) => parts.filter(Boolean).join(" ");
/** Every combination of one item from each list. */
function product(lists: string[][]): string[][] {
  return lists.reduce<string[][]>((acc, list) => acc.flatMap((a) => list.map((x) => [...a, x])), [[]]);
}
/** Add "to …" / bare-verb variants of an English infinitive phrase. */
function enInf(list: string[]): string[] {
  return uniq(list.flatMap((e) => [`to ${e}`, e]));
}
/** Lower-case a sentence-initial subject when it moves mid-sentence (keeps names). */
function lowerSubj(s: string): string {
  return /^(Mi|Mis|Tú|Yo|Nosotros|Vosotros)(?=\s|$)/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
}
/** A verb form with an optional subject pronoun in front. */
function withSubject(p: Person, core: string): string[] {
  return [core, ...SUBJECT_PRONOUNS[p].map((s) => `${s} ${core}`)];
}

// Subjects (for gap-fill sentences)
const SUBJ: Record<Person, readonly string[]> = {
  yo: ["Yo"],
  tú: ["Tú"],
  él: ["Mi hermano", "Mi hermana", "Lucía", "Pablo", "Mi madre", "Mi padre", "Arjun", "Mei"],
  nosotros: ["Nosotros", "Mi hermano y yo", "Mis amigos y yo", "Wei Ling y yo"],
  vosotros: ["Vosotros", "Tú y tu primo", "Tú y Zara"],
  ellos: ["Mis amigos", "Mis padres", "Diego y Sofía", "Mis primas", "Ravi y Hana"],
};

const EN_SUBJ: Record<Person, string[]> = {
  yo: ["I"],
  tú: ["you"],
  él: ["he", "she"],
  nosotros: ["we"],
  vosotros: ["you all"],
  ellos: ["they"],
};

// ---------------------------------------------------------------------------
// Free-time activities (verb + complement)
// ---------------------------------------------------------------------------

interface Act {
  inf: string;
  rest: string;
  /** English base forms (no "to"): first is canonical. */
  en: string[];
  /** He/she form of en[0]. */
  en3: string;
  /** Extra accepted Spanish complements / whole alternatives. */
  restAlt?: string[];
  alt?: { inf: string; rest: string }[];
  tier: 1 | 2;
  /** Only sensible for yo (possessive inside the complement). */
  yoOnly?: boolean;
  /** Wrong complement or wrong verb, with feedback. */
  trapRest?: [string, string];
  trapVerb?: [string, string];
  /** Predictable wrong English. */
  trapEn?: [string, string];
}

const INSTRUMENT_TRAP: [string, string] = ["jugar", "Instruments take *tocar*, never *jugar*: *toco la guitarra*. *Jugar* is for games and sports."];

const ACTS: Act[] = [
  { inf: "ver", rest: "la tele", restAlt: ["la televisión"], en: ["watch TV", "watch television", "watch the TV"], en3: "watches TV", tier: 1 },
  { inf: "escuchar", rest: "música", en: ["listen to music"], en3: "listens to music", tier: 1, trapRest: ["a música", "*Escuchar* already means 'to listen **to**' — no extra *a*: *escucho música*."] },
  { inf: "leer", rest: "", en: ["read"], en3: "reads", tier: 1 },
  { inf: "salir", rest: "con mis amigos", restAlt: ["con mis amigas"], en: ["go out with my friends"], en3: "goes out with his friends", tier: 1, yoOnly: true, trapEn: ["leave with my friends", "Close — but with friends, *salir* means 'to go out'."] },
  { inf: "ir", rest: "al cine", en: ["go to the cinema", "go to the movies", "go to the cinemas"], en3: "goes to the cinema", tier: 1, trapRest: ["a el cine", "*a + el* always shrinks to *al*: *voy al cine*."] },
  { inf: "ir", rest: "de compras", en: ["go shopping"], en3: "goes shopping", tier: 1, trapRest: ["a las compras", "'To go shopping' is the fixed chunk *ir de compras* (no article)."] },
  { inf: "jugar", rest: "a los videojuegos", en: ["play video games", "play videogames", "play computer games"], en3: "plays video games", tier: 1, trapRest: ["los videojuegos", "*Jugar* needs *a* before the game: *jugar **a** los videojuegos*."] },
  { inf: "tocar", rest: "la guitarra", en: ["play the guitar", "play guitar"], en3: "plays the guitar", tier: 1, trapVerb: INSTRUMENT_TRAP, trapEn: ["touch the guitar", "*Tocar* does mean 'to touch' — but with an instrument it means 'to play'."] },
  { inf: "tocar", rest: "el piano", en: ["play the piano", "play piano"], en3: "plays the piano", tier: 1, trapVerb: INSTRUMENT_TRAP, trapEn: ["touch the piano", "*Tocar* does mean 'to touch' — but with an instrument it means 'to play'."] },
  { inf: "tocar", rest: "la batería", en: ["play the drums", "play drums", "play the drum kit"], en3: "plays the drums", tier: 2, trapVerb: INSTRUMENT_TRAP, trapEn: ["play the battery", "False friend! *La batería* is also a battery, but with *tocar* it is the **drum kit**."] },
  { inf: "bailar", rest: "", en: ["dance"], en3: "dances", tier: 1 },
  { inf: "cantar", rest: "", en: ["sing"], en3: "sings", tier: 1 },
  { inf: "cantar", rest: "en un coro", en: ["sing in a choir"], en3: "sings in a choir", tier: 2 },
  { inf: "dibujar", rest: "", en: ["draw"], en3: "draws", tier: 1 },
  { inf: "navegar", rest: "por internet", restAlt: ["en internet"], en: ["surf the internet", "surf the net", "browse the internet", "surf the web"], en3: "surfs the internet", tier: 1, trapEn: ["sail the internet", "*Navegar* means 'to sail', but online it is 'to surf'."] },
  { inf: "chatear", rest: "", en: ["chat online", "chat"], en3: "chats online", tier: 1 },
  { inf: "sacar", rest: "fotos", alt: [{ inf: "hacer", rest: "fotos" }], en: ["take photos", "take pictures", "take photographs"], en3: "takes photos", tier: 1, trapEn: ["take out photos", "*Sacar* can mean 'to take out', but *sacar fotos* is 'to take photos'."] },
  { inf: "cocinar", rest: "", en: ["cook"], en3: "cooks", tier: 1 },
  { inf: "montar", rest: "en bici", restAlt: ["en bicicleta"], en: ["ride a bike", "ride my bike", "ride a bicycle", "go cycling", "cycle", "ride bikes"], en3: "rides a bike", tier: 1, trapRest: ["la bici", "With *montar* you say *montar **en** bici*."] },
  { inf: "escribir", rest: "un blog", en: ["write a blog"], en3: "writes a blog", tier: 2 },
];

/** Spanish options for an activity: canonical first. */
function actForms(a: Act): { inf: string; rest: string }[] {
  return [{ inf: a.inf, rest: a.rest }, ...(a.restAlt ?? []).map((r) => ({ inf: a.inf, rest: r })), ...(a.alt ?? [])];
}

// ---------------------------------------------------------------------------
// Vocab-derived pools (tier 3 of the recall drill)
// ---------------------------------------------------------------------------

function enVariants(en: string): string[] {
  const out: string[] = [];
  for (const part of en.split(/,\s*/)) {
    const base = part.replace(/\s*\([^)]*\)/g, "").trim();
    if (!base) continue;
    out.push(base);
    if (/\(/.test(part)) out.push(part.replace(/[()]/g, "").trim());
    if (base.startsWith("to ")) out.push(base.slice(3));
    if (base.startsWith("the ")) out.push(base.slice(4));
    if (/films?\b/.test(base)) out.push(base.replace(/films?\b/, (m) => (m === "films" ? "movies" : "movie")));
    if (base === "programme") out.push("program", "show", "TV programme");
    if (/^Sorry/.test(base)) out.push(base.replace(/^Sorry/, "I'm sorry"));
    if (/can't/.test(base)) out.push(base.replace(/can't/, "cannot"));
    if (/^Yes, OK/.test(base)) out.push("Yes, okay", "OK", "Yes, fine");
  }
  return uniq(out);
}

const VOCAB_POOL: { es: string; en: string[] }[] = vocab
  .filter((g) => ["Who with, where and when", "TV, films and music", "Opinions", "Making plans"].includes(g.title))
  .flatMap((g) => g.items)
  .filter((it) => !it.es.includes("/") && !it.en.includes("/"))
  .map((it) => ({ es: it.es, en: enVariants(it.en) }));

// ---------------------------------------------------------------------------
// Who / where / when phrases
// ---------------------------------------------------------------------------

type Cat = "who" | "where" | "when";
interface Phrase {
  en: string;
  es: string[];
  cat: Cat;
  tier: 1 | 2;
  trap?: [string, string];
}

const SAT_TRAP = "*El sábado* means this one Saturday. For a habit (every Saturday) Spanish uses the plural: *los sábados*.";
const PHRASES: Phrase[] = [
  { en: "with my brother", es: ["con mi hermano"], cat: "who", tier: 1 },
  { en: "with my sister", es: ["con mi hermana"], cat: "who", tier: 1 },
  { en: "with my friends", es: ["con mis amigos", "con mis amigas"], cat: "who", tier: 1, trap: ["con mi amigos", "*Amigos* is plural, so *my* must be plural too: *mis amigos*."] },
  { en: "with my parents", es: ["con mis padres"], cat: "who", tier: 1 },
  { en: "with my family", es: ["con mi familia"], cat: "who", tier: 2 },
  { en: "with me", es: ["conmigo"], cat: "who", tier: 1, trap: ["con mí", "*Con + mí* fuses into one word: **conmigo**."] },
  { en: "with you (one friend)", es: ["contigo"], cat: "who", tier: 2, trap: ["con ti", "*Con + ti* fuses into one word: **contigo**."] },
  { en: "alone (Lucía is speaking)", es: ["sola"], cat: "who", tier: 2, trap: ["solo", "*Solo / sola* agrees with the speaker — Lucía is a girl, so **sola**."] },
  { en: "alone (Pablo is speaking)", es: ["solo"], cat: "who", tier: 2, trap: ["sola", "*Solo / sola* agrees with the speaker — Pablo is a boy, so **solo**."] },
  { en: "at home", es: ["en casa"], cat: "where", tier: 1, trap: ["en la casa", "'At home' is simply *en casa* — no article."] },
  { en: "in the park", es: ["en el parque"], cat: "where", tier: 1 },
  { en: "at the shopping centre", es: ["en el centro comercial"], cat: "where", tier: 1 },
  { en: "in my bedroom", es: ["en mi dormitorio", "en mi habitación", "en mi cuarto"], cat: "where", tier: 2 },
  { en: "at the bowling alley", es: ["en la bolera"], cat: "where", tier: 2 },
  { en: "on the beach", es: ["en la playa"], cat: "where", tier: 2 },
  { en: "after school", es: ["después del colegio", "después de clase", "después del instituto"], cat: "when", tier: 1, trap: ["después de el colegio", "*de + el* always shrinks to *del*: *después **del** colegio*."] },
  { en: "in the afternoon", es: ["por la tarde"], cat: "when", tier: 1, trap: ["en la tarde", "In Spain, parts of the day take *por*: *por la tarde*."] },
  { en: "in the morning", es: ["por la mañana"], cat: "when", tier: 2, trap: ["en la mañana", "In Spain, parts of the day take *por*: *por la mañana*."] },
  { en: "at night", es: ["por la noche"], cat: "when", tier: 2, trap: ["en la noche", "In Spain, parts of the day take *por*: *por la noche*."] },
  { en: "on Saturdays", es: ["los sábados"], cat: "when", tier: 1, trap: ["el sábado", SAT_TRAP] },
  { en: "on Sundays", es: ["los domingos"], cat: "when", tier: 1, trap: ["el domingo", "*El domingo* is this one Sunday. Every Sunday = *los domingos*."] },
  { en: "on Fridays", es: ["los viernes"], cat: "when", tier: 2, trap: ["el viernes", "*El viernes* is this one Friday. Every Friday = *los viernes*."] },
  { en: "on Saturday (this Saturday, once)", es: ["el sábado"], cat: "when", tier: 2, trap: ["los sábados", "*Los sábados* means every Saturday. For just this one, use *el sábado*."] },
  { en: "at weekends", es: ["los fines de semana", "el fin de semana"], cat: "when", tier: 1 },
  { en: "every day", es: ["todos los días", "cada día"], cat: "when", tier: 1, trap: ["todo los días", "*Días* is masculine plural, so *todos los días*."] },
  { en: "sometimes", es: ["a veces"], cat: "when", tier: 1 },
  { en: "never", es: ["nunca"], cat: "when", tier: 1 },
  { en: "always", es: ["siempre"], cat: "when", tier: 2 },
  { en: "often", es: ["a menudo"], cat: "when", tier: 2 },
  { en: "once a week", es: ["una vez a la semana", "una vez por semana"], cat: "when", tier: 1 },
  { en: "twice a week", es: ["dos veces a la semana", "dos veces por semana"], cat: "when", tier: 2, trap: ["dos vez a la semana", "The plural of *vez* is *veces* (z → c before e)."] },
];

// ---------------------------------------------------------------------------
// Gustar family
// ---------------------------------------------------------------------------

interface Who {
  es: string;
  /** Alternative a-phrases (a nosotras…). */
  esAlt?: string[];
  pron: string;
  en: string;
  obj: string;
  person: Person;
  named: boolean;
}
const WHO: Who[] = [
  { es: "A mí", pron: "me", en: "I", obj: "me", person: "yo", named: false },
  { es: "A ti", pron: "te", en: "you", obj: "you", person: "tú", named: false },
  { es: "A mi hermano", pron: "le", en: "my brother", obj: "my brother", person: "él", named: true },
  { es: "A mi hermana", pron: "le", en: "my sister", obj: "my sister", person: "él", named: true },
  { es: "A Lucía", pron: "le", en: "Lucía", obj: "Lucía", person: "él", named: true },
  { es: "A mi padre", pron: "le", en: "my dad", obj: "my dad", person: "él", named: true },
  { es: "A nosotros", esAlt: ["A nosotras"], pron: "nos", en: "we", obj: "us", person: "nosotros", named: false },
  { es: "A mi hermano y a mí", pron: "nos", en: "my brother and I", obj: "my brother and me", person: "nosotros", named: true },
  { es: "A vosotros", esAlt: ["A vosotras"], pron: "os", en: "you all", obj: "you all", person: "vosotros", named: false },
  { es: "A mis amigos", pron: "les", en: "my friends", obj: "my friends", person: "ellos", named: true },
  { es: "A mis padres", pron: "les", en: "my parents", obj: "my parents", person: "ellos", named: true },
  { es: "A Diego y a Sofía", pron: "les", en: "Diego and Sofía", obj: "Diego and Sofía", person: "ellos", named: true },
];

interface Thing {
  es: string;
  esAlt?: string[];
  en: string;
  kind: "sing" | "plur" | "inf";
  /** English treats it as plural (for "bore" vs "bores"). */
  enPl: boolean;
}
const THINGS: Thing[] = [
  { es: "la música", en: "music", kind: "sing", enPl: false },
  { es: "el cine", en: "the cinema", kind: "sing", enPl: false },
  { es: "la tele", esAlt: ["la televisión"], en: "TV", kind: "sing", enPl: false },
  { es: "el rap", en: "rap", kind: "sing", enPl: false },
  { es: "la música clásica", en: "classical music", kind: "sing", enPl: false },
  { es: "la ciencia ficción", en: "science fiction", kind: "sing", enPl: false },
  { es: "los videojuegos", en: "video games", kind: "plur", enPl: true },
  { es: "las comedias", en: "comedies", kind: "plur", enPl: true },
  { es: "los documentales", en: "documentaries", kind: "plur", enPl: true },
  { es: "los concursos", en: "game shows", kind: "plur", enPl: true },
  { es: "las noticias", en: "the news", kind: "plur", enPl: false },
  { es: "los dibujos animados", en: "cartoons", kind: "plur", enPl: true },
  { es: "las películas de terror", en: "horror films", kind: "plur", enPl: true },
  { es: "las películas románticas", en: "romantic films", kind: "plur", enPl: true },
  { es: "las telenovelas", en: "soap operas", kind: "plur", enPl: true },
  { es: "leer", en: "reading", kind: "inf", enPl: false },
  { es: "bailar", en: "dancing", kind: "inf", enPl: false },
  { es: "dibujar", en: "drawing", kind: "inf", enPl: false },
  { es: "cocinar", en: "cooking", kind: "inf", enPl: false },
  { es: "ir de compras", en: "going shopping", kind: "inf", enPl: false },
  { es: "tocar la guitarra", en: "playing the guitar", kind: "inf", enPl: false },
  { es: "sacar fotos", en: "taking photos", kind: "inf", enPl: false },
  { es: "bailar y cantar", en: "dancing and singing", kind: "inf", enPl: true },
];

type GVerb = "gustar" | "encantar" | "interesar" | "aburrir" | "chiflar";
const GFORMS: Record<GVerb, [string, string]> = {
  gustar: ["gusta", "gustan"],
  encantar: ["encanta", "encantan"],
  interesar: ["interesa", "interesan"],
  aburrir: ["aburre", "aburren"],
  chiflar: ["chifla", "chiflan"],
};
const GMEAN: Record<GVerb, string> = {
  gustar: "to like — literally, to please",
  encantar: "to love",
  interesar: "to interest",
  aburrir: "to bore",
  chiflar: "to be crazy about",
};
const gForm = (v: GVerb, t: Thing) => GFORMS[v][t.kind === "plur" ? 1 : 0];
const gOther = (v: GVerb, t: Thing) => GFORMS[v][t.kind === "plur" ? 0 : 1];
const PERSON_GUSTAR_TRAP = "*Gustar* doesn't agree with the person — it agrees with the thing liked (*gusta* / *gustan*). The person is shown by the pronoun.";

function whyNumber(t: Thing, form: string): string {
  if (t.kind === "plur") return `*${t.es}* is plural → **${form}**.`;
  if (t.kind === "inf") return `*${t.es}* is an activity (infinitive) → singular **${form}**, even if there are two verbs.`;
  return `*${t.es}* is one thing (singular) → **${form}**.`;
}

// ---------------------------------------------------------------------------
// TV / films / music + adjectives
// ---------------------------------------------------------------------------

interface Noun {
  es: string;
  en: string;
  g: "m" | "f";
  pl: boolean;
}
const NOUNS: Noun[] = [
  { es: "el programa", en: "the programme", g: "m", pl: false },
  { es: "la serie", en: "the series", g: "f", pl: false },
  { es: "las series", en: "series", g: "f", pl: true },
  { es: "los dibujos animados", en: "cartoons", g: "m", pl: true },
  { es: "la comedia", en: "the comedy", g: "f", pl: false },
  { es: "las comedias", en: "comedies", g: "f", pl: true },
  { es: "el documental", en: "the documentary", g: "m", pl: false },
  { es: "los documentales", en: "documentaries", g: "m", pl: true },
  { es: "el concurso", en: "the game show", g: "m", pl: false },
  { es: "los concursos", en: "game shows", g: "m", pl: true },
  { es: "las noticias", en: "the news", g: "f", pl: true },
  { es: "las telenovelas", en: "soap operas", g: "f", pl: true },
  { es: "la música pop", en: "pop music", g: "f", pl: false },
  { es: "la música clásica", en: "classical music", g: "f", pl: false },
  { es: "el rap", en: "rap", g: "m", pl: false },
  { es: "las películas de terror", en: "horror films", g: "f", pl: true },
  { es: "las películas de acción", en: "action films", g: "f", pl: true },
  { es: "la película de ciencia ficción", en: "the science-fiction film", g: "f", pl: false },
  { es: "los videojuegos", en: "video games", g: "m", pl: true },
];
interface Adj {
  m: string;
  en: string;
  e: boolean;
  pos: boolean;
}
const ADJS: Adj[] = [
  { m: "divertido", en: "fun", e: false, pos: true },
  { m: "aburrido", en: "boring", e: false, pos: false },
  { m: "gracioso", en: "funny", e: false, pos: true },
  { m: "tonto", en: "silly", e: false, pos: false },
  { m: "emocionante", en: "exciting", e: true, pos: true },
  { m: "interesante", en: "interesting", e: true, pos: true },
  { m: "relajante", en: "relaxing", e: true, pos: true },
];
function agree(a: Adj, g: "m" | "f", pl: boolean): string {
  if (a.e) return a.m + (pl ? "s" : "");
  return a.m.slice(0, -1) + (g === "m" ? "o" : "a") + (pl ? "s" : "");
}

// ---------------------------------------------------------------------------
// Boot verbs + plans
// ---------------------------------------------------------------------------

interface InfPhrase {
  es: string;
  esAlt?: string[];
  en: string;
}
const WANT_CAN: InfPhrase[] = [
  { es: "ir al cine", en: "go to the cinema" },
  { es: "salir esta noche", en: "go out tonight" },
  { es: "ver una película", esAlt: ["ver una peli"], en: "watch a film" },
  { es: "jugar a los videojuegos", en: "play video games" },
  { es: "ir de compras", en: "go shopping" },
  { es: "ir a la bolera", en: "go to the bowling alley" },
  { es: "tocar la batería", en: "play the drums" },
  { es: "montar en bici", esAlt: ["montar en bicicleta"], en: "ride a bike" },
  { es: "salir el sábado", en: "go out on Saturday" },
  { es: "ir a la playa", en: "go to the beach" },
];
const PREFER: InfPhrase[] = [
  { es: "leer", en: "read" },
  { es: "ver series", en: "watch series" },
  { es: "escuchar música", en: "listen to music" },
  { es: "jugar a los videojuegos", en: "play video games" },
  { es: "ir al cine", en: "go to the cinema" },
  { es: "bailar", en: "dance" },
  { es: "ver la tele", esAlt: ["ver la televisión"], en: "watch TV" },
  { es: "dibujar", en: "draw" },
  { es: "sacar fotos", esAlt: ["hacer fotos"], en: "take photos" },
];

const HOURS = ["una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];
const HOURS_EN = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

// ---------------------------------------------------------------------------
// The drills
// ---------------------------------------------------------------------------

function pickPerson(rng: Rng, tier: 1 | 2 | 3): Person {
  return tier === 1 ? rng.pick<Person>(["yo", "tú", "él", "nosotros", "ellos"]) : rng.pick(PERSONS);
}

export const drills: Drill[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.activities-es-en`,
    topicId: TOPIC,
    title: "Free-time vocabulary: Spanish → English",
    level: 1,
    guideRef: "activities",
    generate(rng, tier) {
      if (tier === 3 && rng.bool(0.7)) {
        const it = rng.pick(VOCAB_POOL);
        const accept = it.en;
        return {
          prompt: rng.pick([
            `What does *${it.es}* mean in English?`,
            `Translate into English: *${it.es}*`,
            `Give the English for *${it.es}*.`,
          ]),
          answer: { type: "text", accept },
          solution: [`*${it.es}* = **${accept[0]}**.`, "Say it in a sentence to fix it in your memory."],
          hint: "Look for a cognate or a word you already know inside the phrase.",
        };
      }
      const pool = ACTS.filter((a) => (tier === 1 ? a.tier === 1 : true));
      const a = rng.pick(pool);
      const yoForm = tier >= 2 && rng.bool(tier === 2 ? 0.6 : 0.5);
      const es = yoForm ? join(conjugate(a.inf, "present", "yo"), a.rest) : join(a.inf, a.rest);
      const accept = yoForm ? uniq(a.en.map((e) => `I ${e}`)) : enInf(a.en);
      const trapEn = a.trapEn ? (yoForm ? `I ${a.trapEn[0]}` : `to ${a.trapEn[0]}`) : null;
      return {
        prompt: rng.pick([
          `Translate into English: *${es}*`,
          `What does *${es}* mean in English?`,
          `Give the English for *${es}*${yoForm ? "" : " (an infinitive phrase: 'to …')"}.`,
        ]),
        answer: { type: "text", accept },
        solution: yoForm
          ? [`*${conjugate(a.inf, "present", "yo")}* is the *yo* form of *${a.inf}* — 'I …'.`, `*${es}* = **${accept[0]}**.`]
          : [`*${a.inf}* is an infinitive — in English 'to …'.`, `*${es}* = **${accept[0]}**.`],
        hint: yoForm ? "An -o ending (or *voy*) usually means 'I'. Then translate the chunk." : "Spot the cognate: many free-time verbs look like English words.",
        traps: trapEn ? safeTraps(accept, [[trapEn, a.trapEn![1]]]) : undefined,
      };
    },
  },

  // 2 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.activities-en-es`,
    topicId: TOPIC,
    title: "Free-time activities: English → Spanish",
    level: 1,
    guideRef: "activities",
    generate(rng, tier) {
      const pool = ACTS.filter((a) => (tier === 1 ? a.tier === 1 : true)).filter((a) => (tier === 3 ? !a.yoOnly : true));
      const a = rng.pick(pool);
      const forms = actForms(a);
      // tier 1: infinitive; tier 2: yo (mostly); tier 3: any person
      const mode: "inf" | Person = tier === 1 ? "inf" : tier === 2 ? (rng.bool(0.75) ? "yo" : "inf") : pickPerson(rng, 2);
      let prompt: string;
      let accept: string[];
      let solution: string[];
      let traps: Trap[] = [];
      if (mode === "inf") {
        accept = uniq(forms.map((f) => join(f.inf, f.rest)));
        prompt = rng.pick([
          `How do you say 'to ${a.en[0]}' in Spanish? Give the infinitive phrase.`,
          `Write in Spanish (infinitive): 'to ${a.en[0]}'.`,
        ]);
        solution = [`The verb is *${a.inf}*${a.rest ? `, followed by *${a.rest}*` : ""}.`, `**${accept[0]}**`];
        traps = safeTraps(accept, [
          a.trapVerb ? [join(a.trapVerb[0], a.rest), a.trapVerb[1]] : null,
          a.trapVerb ? [join(a.trapVerb[0], "a", a.rest).replace(" a el ", " al "), a.trapVerb[1]] : null,
          a.trapRest ? [join(a.inf, a.trapRest[0]), a.trapRest[1]] : null,
        ].filter((x): x is [string, string] => !!x));
      } else {
        const p = mode;
        const enSubj = rng.pick(EN_SUBJ[p]);
        const enVerb = p === "él" ? a.en3 : a.en[0];
        accept = uniq(forms.flatMap((f) => acceptedForms(f.inf, "present", p).map((v) => join(v, f.rest))));
        const form = conjugate(a.inf, "present", p);
        prompt = `Translate into Spanish${p === "yo" ? "" : ` (use the **${p}** form)`}: '${cap(enSubj)} ${enVerb}.'`;
        solution = [
          `Infinitive: *${a.inf}*. Person: ${PERSON_LABEL[p]}.`,
          `${a.inf} → **${form}**${regularGuess(a.inf, p) !== form ? " (watch out — not the regular pattern)" : ""}.`,
          `**${cap(join(form, a.rest))}.**`,
        ];
        const reg = regularGuess(a.inf, p);
        traps = safeTraps(accept, [
          a.trapVerb ? [join(conjugate(a.trapVerb[0], "present", p), a.rest), a.trapVerb[1]] : [null, ""],
          a.trapRest ? [join(form, a.trapRest[0]), a.trapRest[1]] : [null, ""],
          a.inf !== "ir" ? [join(reg, a.rest), `*${a.inf}* isn't regular here: it's *${form}*.`] : [null, ""],
          [bootEverywhere(a.inf, p) ? join(bootEverywhere(a.inf, p)!, a.rest) : null, "*Nosotros* and *vosotros* are outside the boot — no stem change."],
        ]);
      }
      return {
        prompt,
        answer: { type: "text", accept },
        solution,
        hint: mode === "inf" ? "Find the verb first, then the little words that go with it (*al*, *a los*, *de*, *por*…)." : "Find the infinitive, then the ending for the person. Is it one of the irregulars (*voy, veo, salgo, juego*)?",
        traps: traps.length ? traps : undefined,
      };
    },
  },

  // 3 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.when-where-who`,
    topicId: TOPIC,
    title: "Who with, where and when: key phrases",
    level: 1,
    guideRef: "describing-activities",
    generate(rng, tier) {
      if (tier === 3 && rng.bool(0.6)) {
        // Two chunks together — both orders accepted.
        const cats = rng.shuffle<Cat>(["who", "where", "when"]).slice(0, 2);
        const ADVERBS = ["sometimes", "never", "always", "often"];
        const [p1, p2] = cats.map((c) => rng.pick(PHRASES.filter((ph) => ph.cat === c && !ph.en.includes("(") && !ADVERBS.includes(ph.en))));
        // Natural English order: where → who → when.
        const rank: Record<Cat, number> = { where: 0, who: 1, when: 2 };
        const enOrder = [p1, p2].sort((x, y) => rank[x.cat] - rank[y.cat]);
        const accept = uniq(product([p1.es, p2.es]).flatMap(([a, b]) => [`${a} ${b}`, `${b} ${a}`]));
        const traps = safeTraps(accept, [p1, p2].filter((p) => p.trap).map((p) => [accept[0].replace(p.es[0], p.trap![0]), p.trap![1]] as [string, string]));
        return {
          prompt: `Translate into Spanish: '${enOrder[0].en} ${enOrder[1].en}'`,
          answer: { type: "text", accept },
          solution: [`'${p1.en}' = *${p1.es[0]}*`, `'${p2.en}' = *${p2.es[0]}*`, `Together: **${accept[0]}** (the two chunks can swap places).`],
          hint: "Translate each chunk separately, then put them side by side.",
          traps: traps.length ? traps : undefined,
        };
      }
      const pool = PHRASES.filter((p) => (tier === 1 ? p.tier === 1 : true));
      const ph = rng.pick(pool);
      const label = ph.cat === "who" ? "¿Con quién?" : ph.cat === "where" ? "¿Dónde?" : "¿Cuándo?";
      return {
        prompt: rng.pick([
          `Translate into Spanish: '${ph.en}'`,
          `*${label}* How do you say '${ph.en}' in Spanish?`,
          `Write the Spanish chunk for '${ph.en}'.`,
        ]),
        answer: { type: "text", accept: ph.es },
        solution: [`'${ph.en}' → **${ph.es[0]}**.`, ...(ph.es.length > 1 ? [`Also fine: *${ph.es.slice(1).join("*, *")}*.`] : [])],
        hint: ph.cat === "when" ? "Habits often use a plural (*los sábados*); parts of the day use *por*." : ph.cat === "who" ? "Who with? Start with *con* — but watch the special forms for 'me' and 'you'." : "Where? Start with *en*. Does it need an article?",
        traps: ph.trap ? safeTraps(ph.es, [ph.trap]) : undefined,
      };
    },
  },

  // 4 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.present-activities`,
    topicId: TOPIC,
    title: "Present tense of free-time verbs (salgo, veo, juego, toco)",
    level: 2,
    guideRef: "activities",
    generate(rng, tier) {
      const regularPool = ACTS.filter((a) => ["escuchar", "leer", "bailar", "cantar", "dibujar", "navegar", "chatear", "cocinar", "montar", "tocar", "sacar", "escribir"].includes(a.inf));
      const irregularPool = ACTS.filter((a) => ["salir", "ver", "jugar", "ir"].includes(a.inf));
      const pool = tier === 1 ? regularPool : rng.bool(0.6) ? irregularPool : regularPool;
      const a = rng.pick(pool);
      // salir con mis amigos has a possessive: use a time phrase instead for other people.
      const rest = a.inf === "salir" ? rng.pick(["los sábados", "por la tarde", "los fines de semana", "con sus amigos"]) : a.rest;
      const restFor = (p: Person) => (rest === "con sus amigos" ? { yo: "con mis amigos", tú: "con tus amigos", él: "con sus amigos", nosotros: "con nuestros amigos", vosotros: "con vuestros amigos", ellos: "con sus amigos" }[p] : rest);

      if (tier === 3) {
        // Transformation: same sentence, new person.
        const from = rng.pick(PERSONS);
        const to = rng.pick(PERSONS.filter((p) => p !== from));
        const src = cap(join(conjugate(a.inf, "present", from), restFor(from)));
        const form = conjugate(a.inf, "present", to);
        const accept = uniq(acceptedForms(a.inf, "present", to).map((v) => join(v, restFor(to))));
        return {
          prompt: `Rewrite the sentence for **${PERSON_LABEL[to]}**: *${src}.*`,
          answer: { type: "text", accept },
          solution: [
            `*${conjugate(a.inf, "present", from)}* comes from *${a.inf}*.`,
            `${PERSON_LABEL[to]} → **${form}**.`,
            `**${cap(join(form, restFor(to)))}.**`,
          ],
          hint: "Find the infinitive first, then put on the new ending. Watch the irregular *yo* forms and the boot.",
          traps: safeTraps(accept, [
            [a.inf === "ir" ? null : join(regularGuess(a.inf, to), restFor(to)), `*${a.inf}* doesn't follow the regular pattern here: **${form}**.`],
            [bootEverywhere(a.inf, to) ? join(bootEverywhere(a.inf, to)!, restFor(to)) : null, "*Nosotros* and *vosotros* are outside the boot — no stem change."],
            [join(conjugate(a.inf, "present", from), restFor(to)), "You kept the old ending — change it for the new person."],
          ]),
        };
      }

      const p = pickPerson(rng, tier);
      const subj = rng.pick(SUBJ[p]);
      const form = conjugate(a.inf, "present", p);
      const accept = [form];
      const q = p === "tú" || p === "vosotros";
      const sentence = `${q ? "¿" : ""}${subj} ___ (${a.inf})${restFor(p) ? " " + restFor(p) : ""}${q ? "?" : "."}`;
      const reg = regularGuess(a.inf, p);
      return {
        prompt: `Complete with the present tense of the verb in brackets:\n\n*${sentence}*`,
        answer: { type: "text", accept },
        solution: [
          `*${subj}* → ${PERSON_LABEL[p]}.`,
          a.inf === "ir" || reg !== form
            ? `*${a.inf}* is irregular / stem-changing here → **${form}**.`
            : `Stem *${split(a.inf).stem}-* + ending *-${ENDS[split(a.inf).group][IDX[p]]}* → **${form}**.`,
        ],
        hint: "Who is the subject? Pick the ending for that person — and check whether the verb is one of the irregulars.",
        traps: safeTraps(accept, [
          a.inf !== "ir" ? [reg, `*${a.inf}* isn't regular here: it's **${form}**.`] : [null, ""],
          [bootEverywhere(a.inf, p), "*Nosotros* and *vosotros* are outside the boot — no stem change."],
          [a.inf, "That's the infinitive — change the ending to match the subject."],
          p !== "yo" ? [conjugate(a.inf, "present", "yo"), `That's the *yo* form — the subject here is *${subj}*.`] : [null, ""],
        ]),
      };
    },
  },

  // 5 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.gustar-pronoun-agreement`,
    topicId: TOPIC,
    title: "Gustar & co: right pronoun, gusta or gustan",
    level: 2,
    guideRef: "gustar-and-preferences",
    generate(rng, tier) {
      const who = tier === 1 ? rng.pick(WHO.filter((w) => ["me", "te", "le"].includes(w.pron))) : rng.pick(WHO);
      const verb: GVerb = tier === 1 ? "gustar" : tier === 2 ? rng.pick<GVerb>(["gustar", "gustar", "encantar"]) : rng.pick<GVerb>(["gustar", "encantar", "interesar", "aburrir", "chiflar"]);
      const thing = rng.pick(THINGS);
      const neg = tier === 3 && verb === "gustar" && rng.bool(0.4);
      const form = gForm(verb, thing);
      const ans = `${neg ? "no " : ""}${who.pron} ${form}`;
      const q = who.person === "tú" || who.person === "vosotros";
      const sentence = `${q ? "¿" : ""}${who.es} ___ ${thing.es}${neg ? " nada" : ""}${q ? "?" : "."}`;
      const accept = [ans];
      const wrongPron: Record<string, string> = { le: "les", les: "le", me: "mi", nos: "nosotros", te: "ti", os: "vos" };
      return {
        prompt: `Complete with the right pronoun + the right form of *${verb}* (${GMEAN[verb]})${neg ? ", making it **negative**" : ""}:\n\n*${sentence}*`,
        answer: { type: "text", accept },
        solution: [
          `Who is pleased? *${who.es}* → pronoun **${who.pron}**.`,
          whyNumber(thing, form),
          `${neg ? "*No* goes in front of the pronoun. " : ""}**${q ? "¿" : ""}${join(who.es, neg ? "no" : "", who.pron, form, thing.es, neg ? "nada" : "")}${q ? "?" : "."}**`,
        ],
        hint: "Two questions: WHO is pleased (→ me/te/le/nos/os/les)? and is the THING liked one thing/an activity or plural (→ -a or -an)?",
        traps: safeTraps(accept, [
          [`${neg ? "no " : ""}${who.pron} ${gOther(verb, thing)}`, `Check the thing liked: ${whyNumber(thing, form)}`],
          [`${neg ? "no " : ""}${who.pron} ${regularGuess(verb, who.person)}`, PERSON_GUSTAR_TRAP],
          [`${neg ? "no " : ""}${wrongPron[who.pron]} ${form}`, `Wrong pronoun: *${who.es}* → **${who.pron}**.`],
          neg ? [`${who.pron} no ${form}`, "*No* goes **before** the pronoun: *no me gusta*."] : [null, ""],
        ]),
      };
    },
  },

  // 6 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.tv-opinions-agreement`,
    topicId: TOPIC,
    title: "TV, films and music: opinions that agree",
    level: 2,
    guideRef: "tv-and-music",
    generate(rng, tier) {
      const n = rng.pick(NOUNS);
      const esSon = n.pl ? "son" : "es";
      const template = tier === 1 ? "A" : tier === 2 ? rng.pick(["A", "B", "C"]) : rng.pick(["D", "D", "B", "C"]);
      const adjPool = tier === 1 ? ADJS.filter((a) => !a.e) : template === "B" ? ADJS.filter((a) => a.pos) : template === "C" ? ADJS.filter((a) => !a.pos) : ADJS;
      const a = rng.pick(adjPool);
      const form = agree(a, n.g, n.pl);
      let sentence: string;
      let accept: string[];
      if (template === "A") sentence = `${cap(n.es)} ${esSon} ___.`;
      else if (template === "B") sentence = `Me ${n.pl ? "encantan" : "encanta"} ${n.es} porque ${esSon} ___.`;
      else if (template === "C") sentence = `No me ${n.pl ? "gustan" : "gusta"} ${n.es} porque ${esSon} ___.`;
      else sentence = `${cap(n.es)} ___ ___.`;
      if (template === "D") accept = [`${esSon} ${form}`];
      else accept = [form];
      const genderWord = n.g === "m" ? "masculine" : "feminine";
      const descr = `*${n.es}* (${n.en}) is ${genderWord} ${n.pl ? "plural" : "singular"}`;
      const wrongG = a.e ? null : agree(a, n.g === "m" ? "f" : "m", n.pl);
      const wrongN = agree(a, n.g, !n.pl);
      const pre = template === "D" ? `${esSon} ` : "";
      return {
        prompt:
          template === "D"
            ? `Complete with *es* or *son* and the right form of *${a.m}* (${a.en}):\n\n*${sentence}*`
            : `Complete with the right form of *${a.m}* (${a.en}):\n\n*${sentence}*`,
        answer: { type: "text", accept },
        solution: [
          `${descr}.`,
          a.e ? `*${a.m}* ends in *-e*: it only changes for plural → **${form}**.` : `*${a.m}* → ${genderWord} ${n.pl ? "plural" : "singular"} → **${form}**.`,
          ...(template === "D" ? [`${n.pl ? "Plural" : "Singular"} subject → **${esSon}**: **${cap(n.es)} ${esSon} ${form}.**`] : []),
        ],
        hint: n.es === "el programa" ? "Gender detective: look at the article, not the last letter." : "Gender detective: check the article (el/la/los/las), then make the adjective match.",
        traps: safeTraps(accept, [
          wrongG ? [pre + wrongG, n.es === "el programa" ? "*El programa* is masculine even though it ends in *-a*." : `Check the gender: ${descr}.`] : [null, ""],
          a.e && n.g === "f" ? [pre + a.m.slice(0, -1) + "a" + (n.pl ? "s" : ""), `Adjectives ending in *-e* are the same for masculine and feminine: **${form}**.`] : [null, ""],
          [pre + wrongN, `Check the number: ${descr}.`],
          template === "D" ? [`${n.pl ? "es" : "son"} ${form}`, `${n.pl ? "Plural" : "Singular"} subject → *${esSon}*.`] : [null, ""],
        ]),
      };
    },
  },

  // 7 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.boot-verbs-querer-poder-preferir`,
    topicId: TOPIC,
    title: "Boot verbs: querer, poder, preferir + infinitive",
    level: 2,
    guideRef: "making-plans",
    generate(rng, tier) {
      const inf = rng.pick(["querer", "poder", "preferir"]);
      const ph = rng.pick(inf === "preferir" ? PREFER : WANT_CAN);
      const p = tier === 1 ? rng.pick<Person>(["yo", "tú", "él", "ellos"]) : rng.pick(PERSONS);
      const form = conjugate(inf, "present", p);
      const sc = stemChange(inf)!;
      const inBoot = p !== "nosotros" && p !== "vosotros";
      const steps = [
        `*${inf}* is a boot verb (${sc[0]} → ${sc[1]}).`,
        inBoot ? `${PERSON_LABEL[p]} is inside the boot → stem changes → **${form}**.` : `${PERSON_LABEL[p]} is outside the boot → no change → **${form}**.`,
      ];
      const commonTraps: Array<[string | null, string]> = [
        [regularGuess(inf, p), `*${inf}* is a boot verb: inside the boot the stem changes ${sc[0]} → ${sc[1]}: **${form}**.`],
        [bootEverywhere(inf, p), "*Nosotros* and *vosotros* are outside the boot — no stem change."],
      ];
      if (tier < 3) {
        const subj = rng.pick(SUBJ[p]);
        const q = p === "tú" || p === "vosotros";
        const sentence = `${q ? "¿" : ""}${subj} ___ (${inf}) ${ph.es}${q ? "?" : "."}`;
        const accept = [form];
        return {
          prompt: `Complete with the present tense of the verb in brackets:\n\n*${sentence}*`,
          answer: { type: "text", accept },
          solution: [...steps, `The second verb stays in the infinitive: *${form} ${ph.es}*.`],
          hint: "Is the person inside the boot (yo, tú, él, ellos) or outside it (nosotros, vosotros)?",
          traps: safeTraps(accept, commonTraps.map(([w, f]) => [w, f] as [string | null, string])),
        };
      }
      // Tier 3: translation, sometimes negative.
      const neg = inf === "poder" && rng.bool(0.5);
      const enSubj = rng.pick(EN_SUBJ[p]);
      const s3 = p === "él";
      const enVerb =
        inf === "poder" ? (neg ? "can't" : "can") : inf === "querer" ? (s3 ? "wants to" : "want to") : s3 ? "prefers to" : "prefer to";
      const phrases = [ph.es, ...(ph.esAlt ?? [])];
      const accept = uniq(phrases.flatMap((x) => withSubject(p, `${neg ? "no " : ""}${form} ${x}`)));
      return {
        prompt: `Translate into Spanish (use the **${p}** form): '${cap(enSubj)} ${enVerb} ${ph.en}.'`,
        answer: { type: "text", accept },
        solution: [...steps, `${neg ? "*No* goes before the verb; " : ""}infinitive after it: **${cap(`${neg ? "no " : ""}${form} ${ph.es}`)}.**`],
        hint: "Conjugate the first verb (boot check!) and keep the second verb as an infinitive.",
        traps: safeTraps(accept, [
          ...commonTraps.map(([w, f]) => [w ? `${neg ? "no " : ""}${w} ${ph.es}` : null, f] as [string | null, string]),
          [`${neg ? "no " : ""}${form} a ${ph.es}`, `*${inf}* is followed directly by the infinitive — no *a*.`],
        ]),
      };
    },
  },

  // 8 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.near-future-plans`,
    topicId: TOPIC,
    title: "Plans with ir a + infinitive",
    level: 2,
    guideRef: "making-plans",
    generate(rng, tier) {
      const PLANS: { inf: string; rest: string; tier: 1 | 2 }[] = [
        { inf: "ver", rest: "una película", tier: 1 },
        { inf: "jugar", rest: "a los videojuegos", tier: 1 },
        { inf: "ir", rest: "al cine", tier: 1 },
        { inf: "ir", rest: "de compras", tier: 1 },
        { inf: "tocar", rest: "la guitarra", tier: 1 },
        { inf: "escuchar", rest: "música", tier: 1 },
        { inf: "bailar", rest: "en la fiesta", tier: 1 },
        { inf: "cocinar", rest: "una paella de verduras", tier: 1 },
        { inf: "montar", rest: "en bici", tier: 1 },
        { inf: "sacar", rest: "fotos", tier: 1 },
        { inf: "salir", rest: "", tier: 1 },
        { inf: "quedarse", rest: "en casa", tier: 2 },
        { inf: "visitar", rest: "el museo", tier: 2 },
        { inf: "divertirse", rest: "mucho", tier: 2 },
      ];
      const plan = rng.pick(PLANS.filter((x) => (tier === 1 ? x.tier === 1 : true)));
      const nfForms = (p: Person) => acceptedForms(plan.inf, "near-future", p).filter((f) => !SUBJECT_PRONOUNS[p].some((s) => f.startsWith(s + " ")));
      const reflexive = verbInfo(plan.inf)?.reflexive ?? false;
      const base = plan.inf.replace(/se$/, "");

      if (tier === 3) {
        const pairs: [string, string][] = [
          ["Los sábados", "El sábado"],
          ["Los domingos", "El domingo"],
          ["Los fines de semana", "Este fin de semana"],
          ["Normalmente", "Mañana"],
          ["Por las tardes", "Esta tarde"],
        ];
        const [habit, once] = rng.pick(pairs);
        const p = rng.pick(PERSONS.filter((x) => x !== "tú"));
        const dropped = p === "yo" || p === "nosotros";
        const subj = dropped ? "" : lowerSubj(rng.pick(SUBJ[p].filter((s) => s !== "Yo")));
        const pres = conjugate(plan.inf, "present", p);
        const src = `${habit} ${join(subj, pres, plan.rest)}.`;
        const subjVariants = dropped ? ["", ...SUBJECT_PRONOUNS[p]] : [subj];
        const accept = uniq(
          nfForms(p).flatMap((nf) =>
            subjVariants.flatMap((s) => [join(once, s, nf, plan.rest), join(cap(s) || "", nf, plan.rest, once.toLowerCase())]),
          ),
        );
        const nf0 = conjugate(plan.inf, "near-future", p);
        accept.unshift(`${join(once, subj, nf0, plan.rest)}.`);
        const accepted = uniq(accept);
        const irForm = conjugate("ir", "present", p);
        return {
          prompt: `This is a habit: *${src}*\n\nTurn it into a one-off plan: start with *${once}* and use *ir a* + infinitive.`,
          answer: { type: "text", accept: accepted },
          solution: [
            `*${habit}* (a habit, present tense) → *${once}* (one time, a plan).`,
            `*ir* for ${PERSON_LABEL[p]} = *${irForm}*, then *a* + infinitive *${plan.inf}*${reflexive ? " (the pronoun goes on the end, or before *ir*)" : ""}.`,
            `**${accepted[0]}**`,
          ],
          hint: "Keep the person, swap the verb for *ir* (voy, vas, va…) + *a* + the infinitive.",
          traps: safeTraps(accepted, [
            [join(once, subj, `${irForm} ${reflexive ? conjugate(plan.inf, "near-future", p).split(" a ")[1] : base}`, plan.rest), "Don't forget the *a*: *ir **a** + infinitive*."],
            [join(once, subj, pres, plan.rest), "You kept the present tense — a plan needs *ir a* + infinitive."],
          ]),
        };
      }

      const p = pickPerson(rng, tier);
      const subj = rng.pick(SUBJ[p]);
      const time = rng.pick(["El sábado", "Mañana", "Esta tarde", "Este fin de semana", "Esta noche", "El domingo", "El viernes por la tarde"]);
      const q = p === "tú" || p === "vosotros";
      const sentence = `${q ? "¿" : ""}${time} ${lowerSubj(subj)} ___ (${plan.inf})${plan.rest ? " " + plan.rest : ""}${q ? "?" : "."}`;
      const accept = nfForms(p);
      const irForm = conjugate("ir", "present", p);
      return {
        prompt: `Complete with *ir a* + infinitive (a plan):\n\n*${sentence}*`,
        answer: { type: "text", accept },
        solution: [
          `*ir* for ${PERSON_LABEL[p]} → *${irForm}*.`,
          `Then *a* + the infinitive${reflexive ? " (reflexive pronoun on the end, or before *ir*)" : ""} → **${accept[0]}**.`,
        ],
        hint: "Plan = *ir* (voy, vas, va, vamos, vais, van) + *a* + infinitive. Only *ir* changes.",
        traps: safeTraps(accept, [
          [`${irForm} ${reflexive ? conjugate(plan.inf, "near-future", p).split(" a ")[1] : base}`, "Don't forget the *a*: *ir **a** + infinitive*."],
          reflexive ? [null, ""] : [`${irForm} a ${conjugate(plan.inf, "present", p)}`, "After *ir a* the second verb stays in the infinitive."],
          [conjugate(plan.inf, "present", p), "That's the present tense — a plan needs *ir a* + infinitive."],
        ]),
      };
    },
  },

  // 9 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.invitations-replies`,
    topicId: TOPIC,
    title: "Invitations and replies: ¿Quieres…? No puedo porque…",
    level: 2,
    guideRef: "making-plans",
    generate(rng, tier) {
      const INV: InfPhrase[] = [...WANT_CAN.filter((x) => !x.es.includes("sábado") && !x.es.includes("esta noche")), { es: "salir", en: "go out" }, { es: "jugar al tenis", en: "play tennis" }, { es: "ir al parque", en: "go to the park" }];
      const REASONS: { es: string; esAlt?: string[]; en: string; we?: string; weEn?: string }[] = [
        { es: "hacer los deberes", esAlt: ["hacer mis deberes"], en: "do my homework", we: "hacer los deberes", weEn: "do our homework" },
        { es: "estudiar", en: "study", we: "estudiar", weEn: "study" },
        { es: "ayudar en casa", en: "help at home", we: "ayudar en casa", weEn: "help at home" },
        { es: "visitar a mis abuelos", en: "visit my grandparents", we: "visitar a nuestros abuelos", weEn: "visit our grandparents" },
        { es: "ordenar mi dormitorio", esAlt: ["ordenar mi habitación", "ordenar mi cuarto"], en: "tidy my bedroom" },
        { es: "pasear al perro", esAlt: ["pasear a mi perro"], en: "walk the dog", we: "pasear al perro", weEn: "walk the dog" },
        { es: "ir al dentista", en: "go to the dentist" },
      ];
      const DAYS: [string, string][] = [
        ["el sábado", "on Saturday"],
        ["el domingo", "on Sunday"],
        ["mañana", "tomorrow"],
        ["esta tarde", "this afternoon"],
        ["el viernes", "on Friday"],
      ];
      const PLACES: { es: string; en: string; trap?: string }[] = [
        { es: "delante del cine", en: "in front of the cinema", trap: "delante de el cine" },
        { es: "en la plaza", en: "in the square" },
        { es: "en mi casa", en: "at my house" },
        { es: "en la estación de MRT", en: "at the MRT station" },
        { es: "delante del centro comercial", en: "in front of the shopping centre", trap: "delante de el centro comercial" },
        { es: "en la entrada del parque", en: "at the park entrance", trap: "en la entrada de el parque" },
      ];
      const FIXED: { es: string[]; en: string }[] = [
        { es: ["Sí, vale."], en: "Yes, OK." },
        { es: ["¡Qué buena idea!"], en: "What a good idea!" },
        { es: ["Lo siento, no puedo."], en: "Sorry, I can't." },
        { es: ["¿Dónde quedamos?", "¿Dónde nos vemos?", "¿Dónde nos encontramos?"], en: "Where shall we meet?" },
        { es: ["¿A qué hora quedamos?", "¿A qué hora nos vemos?"], en: "What time shall we meet?" },
        { es: ["Sí, vale. ¿A qué hora quedamos?", "Sí, vale. ¿A qué hora nos vemos?"], en: "Yes, OK. What time shall we meet?" },
        { es: ["¡Qué buena idea! ¿Dónde quedamos?", "¡Qué buena idea! ¿Dónde nos vemos?"], en: "What a good idea! Where shall we meet?" },
      ];

      const kinds = tier === 1 ? ["invite", "invite", "fixed"] : tier === 2 ? ["invite-day", "refuse", "refuse", "fixed"] : ["refuse-we", "refuse-day", "meet", "meet", "invite-day"];
      const kind = rng.pick(kinds);

      if (kind === "fixed") {
        const f = rng.pick(FIXED);
        return {
          prompt: `Translate into Spanish: '${f.en}'`,
          answer: { type: "text", accept: f.es },
          solution: [`**${f.es[0]}**`, "A fixed chunk — learn it whole, with its ¿…? or ¡…!"],
          hint: "This is one of the stock phrases for making plans. *Quedar* = to arrange to meet.",
          traps: safeTraps(f.es, [
            f.es[0].includes("puedo") ? ["Lo siento, no podo.", "*Poder* is a boot verb: *puedo*."] : [null, ""],
            f.es[0].startsWith("Sí") ? [f.es[0].replace("Sí", "Si"), "*Sí* (yes) needs its accent — *si* without it means 'if'."] : [null, ""],
          ]),
        };
      }

      if (kind === "invite" || kind === "invite-day") {
        const act = rng.pick(INV);
        const plural = tier >= 2 && rng.bool(0.35);
        const qv = plural ? "queréis" : conjugate("querer", "present", "tú");
        const day = kind === "invite-day" ? rng.pick(DAYS) : null;
        const acts = [act.es, ...(act.esAlt ?? [])];
        const pron = plural ? ["", "vosotros", "vosotras"] : ["", "tú"];
        const accept = uniq(
          acts.flatMap((x) =>
            pron.flatMap((s) => (day ? [join(s, qv, x, day[0]), join(cap(day[0]), s, qv, x)] : [join(s, qv, x)])),
          ),
        ).map((x, i) => (i === 0 ? `¿${cap(x)}?` : x));
        return {
          prompt: `Invite ${plural ? "two friends (use *vosotros*)" : "a friend (use *tú*)"}. Translate: 'Do you ${plural ? "(all) " : ""}want to ${act.en}${day ? " " + day[1] : ""}?'`,
          answer: { type: "text", accept },
          solution: [
            `*querer* (e → ie) for ${plural ? "vosotros → outside the boot → *queréis*" : "tú → inside the boot → *quieres*"}.`,
            `+ infinitive: **${accept[0]}**`,
          ],
          hint: "*Querer* + infinitive. Is the person inside the boot or outside it?",
          traps: safeTraps(accept, [
            [`${qv} a ${act.es}${day ? " " + day[0] : ""}`, "*Querer* is followed straight by the infinitive — no *a*."],
            [`${plural ? "quieréis" : "queres"} ${act.es}${day ? " " + day[0] : ""}`, plural ? "*Vosotros* is outside the boot — *queréis*, no stem change." : "*Querer* is a boot verb: *tú quieres*."],
          ]),
        };
      }

      if (kind === "refuse" || kind === "refuse-day" || kind === "refuse-we") {
        const we = kind === "refuse-we";
        const r = rng.pick(we ? REASONS.filter((x) => x.we) : REASONS);
        const money = !we && rng.bool(0.15);
        const day = kind === "refuse-day" ? rng.pick(DAYS) : null;
        const pv = we ? "podemos" : "puedo";
        const tv = we ? "tenemos" : "tengo";
        const reasonEs = we ? [r.we!] : [r.es, ...(r.esAlt ?? [])];
        const becauseEs = money ? [`no ${tv} dinero`] : reasonEs.map((x) => `${tv} que ${x}`);
        const becauseEn = money ? "I don't have any money" : we ? `we have to ${r.weEn}` : `I have to ${r.en}`;
        const heads = day ? [`lo siento, ${day[0]} no ${pv}`, `lo siento, no ${pv} ${day[0]}`] : [`lo siento, no ${pv}`];
        const accept = uniq(product([heads, becauseEs]).map(([h, b]) => `${h} porque ${b}`));
        accept[0] = cap(accept[0]) + ".";
        return {
          prompt: `Turn down the invitation. Translate into Spanish: 'Sorry, ${we ? "we" : "I"} can't${day ? " " + day[1] : ""} because ${becauseEn}.'`,
          answer: { type: "text", accept },
          solution: [
            `'${we ? "We" : "I"} can't' = *no ${pv}* (${we ? "nosotros is outside the boot" : "poder: o → ue"}).`,
            money ? `'I don't have any money' = *no tengo dinero*.` : `'${we ? "We have" : "I have"} to…' = *${tv} que* + infinitive.`,
            `**${accept[0]}**`,
          ],
          hint: "Lo siento + *no puedo/podemos* + *porque* + *tener que* + infinitive.",
          traps: safeTraps(accept, [
            money ? [null, ""] : [accept[0].replace(`${tv} que`, tv), "*Tener que* + infinitive — don't drop the *que*."],
            [accept[0].replace(pv, we ? "puedemos" : "podo"), we ? "*Nosotros* is outside the boot: *podemos*." : "*Poder* is a boot verb: *puedo*."],
          ]),
        };
      }

      // meet: place + time
      const place = rng.pick(PLACES);
      const h = rng.int(1, 10);
      const half = rng.bool(0.4);
      const hourEs = `${h === 1 ? "a la" : "a las"} ${HOURS[h - 1]}${half ? " y media" : ""}`;
      const hourEn = half ? `half past ${HOURS_EN[h - 1]}` : HOURS_EN[h - 1];
      const accept = [`Quedamos ${place.es} ${hourEs}.`, `quedamos ${hourEs} ${place.es}`, `${hourEs} quedamos ${place.es}`];
      return {
        prompt: `Fix the details. Translate into Spanish: 'Let's meet ${place.en} at ${hourEn}.'`,
        answer: { type: "text", accept },
        solution: [`'Let's meet' = *quedamos*.`, `'${place.en}' = *${place.es}*; 'at ${hourEn}' = *${hourEs}*.`, `**${accept[0]}**`],
        hint: "*Quedamos* + place + time. Hours: *a la una*, but *a las dos, a las tres…*",
        traps: safeTraps(accept, [
          place.trap ? [`quedamos ${place.trap} ${hourEs}`, "*de + el* always shrinks to *del*."] : [null, ""],
          [`quedamos ${place.es} ${h === 1 ? "a las" : "a la"} ${HOURS[h - 1]}${half ? " y media" : ""}`, h === 1 ? "One o'clock is singular: *a la una*." : "Hours above one are plural: *a las dos, a las tres…*"],
        ]),
      };
    },
  },

  // 10 ────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.gustar-translate`,
    topicId: TOPIC,
    title: "Translate likes and dislikes (gustar, encantar, interesar, aburrir)",
    level: 3,
    guideRef: "gustar-and-preferences",
    generate(rng, tier) {
      const whoPool = tier === 1 ? WHO.filter((w) => w.pron === "me") : WHO;
      const who = rng.pick(whoPool);
      const verbs: GVerb[] = tier === 1 ? ["gustar"] : tier === 2 ? ["gustar", "encantar"] : ["gustar", "encantar", "interesar", "aburrir"];
      let verb = rng.pick(verbs);
      const q = who.person === "tú" || who.person === "vosotros";
      if (q && verb === "aburrir") verb = "gustar";
      const neg = !q && verb === "gustar" && (tier === 3 ? rng.bool(0.4) : tier === 1 ? rng.bool(0.3) : false);
      const notAtAll = neg && tier === 3;
      const thing = rng.pick(THINGS);
      const form = gForm(verb, thing);

      // English
      const s3 = who.person === "él";
      const be = who.person === "yo" ? "am" : s3 ? "is" : "are";
      let en: string;
      const subj = cap(who.en);
      if (verb === "aburrir") {
        en = `${cap(thing.en)} ${thing.enPl ? "bore" : "bores"} ${who.obj}.`;
      } else if (q) {
        const youWho = who.person === "vosotros" ? "you all" : "you";
        en = verb === "interesar" ? `Are ${youWho} interested in ${thing.en}?` : `Do ${youWho} ${verb === "gustar" ? "like" : "love"} ${thing.en}?`;
      } else if (verb === "interesar") {
        en = `${subj} ${be} interested in ${thing.en}.`;
      } else if (neg) {
        en = `${subj} ${s3 ? "doesn't" : "don't"} like ${thing.en}${notAtAll ? " at all" : ""}.`;
      } else {
        const v = verb === "gustar" ? "like" : "love";
        en = `${subj} ${s3 ? v + "s" : v} ${thing.en}.`;
      }

      // Spanish
      const things = [thing.es, ...(thing.esAlt ?? [])];
      const aPhrases = [who.es, ...(who.esAlt ?? [])];
      const negW = neg ? "no " : "";
      const nada = notAtAll ? " nada" : "";
      const accept: string[] = [];
      for (const t of things) {
        const core = `${negW}${who.pron} ${form}${nada} ${t}`;
        if (!who.named) accept.push(core);
        for (const a of aPhrases) {
          accept.push(`${a} ${core}`);
          if (who.named) accept.push(`${core} ${a.charAt(0).toLowerCase()}${a.slice(1)}`);
        }
      }
      const canon = who.named ? `${who.es} ${negW}${who.pron} ${form}${nada} ${thing.es}` : `${negW}${who.pron} ${form}${nada} ${thing.es}`;
      const display = q ? `¿${cap(canon)}?` : `${cap(canon)}.`;
      const acc = uniq([display, ...accept]);
      const bare = thing.kind === "inf" ? null : thing.es.replace(/^(el|la|los|las) /, "");
      return {
        prompt: `Translate into Spanish: '${en}'`,
        answer: { type: "text", accept: acc },
        solution: [
          `Use *${verb}*: the person becomes the pronoun → *${who.pron}*${who.named ? `, and name them with *${who.es.replace(/^A /, "a ")}*` : ""}.`,
          whyNumber(thing, form),
          `**${display}**`,
        ],
        hint: "Turn it round: 'X pleases me' → pronoun + verb agreeing with the thing liked. Keep the article (*la música*).",
        traps: safeTraps(acc, [
          [display.replace(new RegExp(`\\b${form}\\b`), gOther(verb, thing)), `Check the thing: ${whyNumber(thing, form)}`],
          who.named ? [display.replace(/^A /, ""), `When you name the person, start with *a*: *${who.es}…*`] : [null, ""],
          bare ? [display.replace(thing.es, bare), `Spanish keeps the article with a general noun: *${thing.es}*.`] : [null, ""],
          [`${negW}${who.pron} ${regularGuess(verb, who.person)}${nada} ${thing.es}`, PERSON_GUSTAR_TRAP],
        ]),
      };
    },
  },

  // 11 ────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.sentence-builder`,
    topicId: TOPIC,
    title: "Build a longer sentence: when + activity + where + who with",
    level: 3,
    guideRef: "describing-activities",
    generate(rng, tier) {
      const PLACE: Record<string, { es: string[]; en: string }> = {
        casa: { es: ["en casa"], en: "at home" },
        dorm: { es: ["en mi dormitorio", "en mi habitación"], en: "in my bedroom" },
        parque: { es: ["en el parque"], en: "in the park" },
        cc: { es: ["en el centro comercial"], en: "at the shopping centre" },
        playa: { es: ["en la playa"], en: "on the beach" },
      };
      const ACT8: { es: string[]; en: string; places: string[]; trap?: [string, string] }[] = [
        { es: ["juego a los videojuegos"], en: "play video games", places: ["casa", "dorm"], trap: ["juego los videojuegos", "*Jugar* needs *a* before the game: *juego **a** los videojuegos*."] },
        { es: ["veo la tele", "veo la televisión"], en: "watch TV", places: ["casa", "dorm"] },
        { es: ["veo series"], en: "watch series", places: ["casa", "dorm"] },
        { es: ["escucho música"], en: "listen to music", places: ["casa", "dorm", "parque", "playa"], trap: ["escucho a música", "*Escuchar* already includes 'to' — no extra *a*."] },
        { es: ["leo"], en: "read", places: ["casa", "dorm", "parque", "playa"] },
        { es: ["toco la guitarra"], en: "play the guitar", places: ["casa", "dorm", "parque"], trap: ["juego la guitarra", "Instruments take *tocar*: *toco la guitarra*."] },
        { es: ["monto en bici", "monto en bicicleta"], en: "ride my bike", places: ["parque"] },
        { es: ["saco fotos", "hago fotos"], en: "take photos", places: ["parque", "playa"] },
        { es: ["voy de compras"], en: "go shopping", places: ["cc"] },
        { es: ["bailo"], en: "dance", places: ["casa"] },
        { es: ["cocino"], en: "cook", places: ["casa"] },
        { es: ["dibujo"], en: "draw", places: ["casa", "parque"] },
      ];
      const COMP: { es: string[]; en: string }[] = [
        { es: ["con mi hermano"], en: "with my brother" },
        { es: ["con mi hermana"], en: "with my sister" },
        { es: ["con mis amigos", "con mis amigas"], en: "with my friends" },
        { es: ["con mi madre"], en: "with my mum" },
        { es: ["con mi padre"], en: "with my dad" },
        { es: ["con mi familia"], en: "with my family" },
      ];
      const TIME: { es: string[]; en: string; trap?: [string, string] }[] = [
        { es: ["los sábados"], en: "On Saturdays", trap: ["el sábado", SAT_TRAP] },
        { es: ["los domingos"], en: "On Sundays", trap: ["el domingo", "Every Sunday = *los domingos* (plural); *el domingo* is just this Sunday."] },
        { es: ["los fines de semana", "el fin de semana"], en: "At weekends" },
        { es: ["después del colegio", "después de clase"], en: "After school", trap: ["después de el colegio", "*de + el* always shrinks to *del*."] },
        { es: ["por la tarde"], en: "In the afternoon" },
        { es: ["todos los días", "cada día"], en: "Every day" },
        { es: ["a veces"], en: "Sometimes" },
      ];
      const OPIN: { es: string; en: string }[] = [
        { es: "porque es divertido", en: "because it's fun" },
        { es: "porque es relajante", en: "because it's relaxing" },
        { es: "porque es guay", en: "because it's cool" },
      ];

      const act = rng.pick(ACT8);
      const time = rng.pick(TIME);
      const usePlace = tier === 3 || (tier === 2 && rng.bool(0.5));
      const useComp = tier === 3 || (tier === 2 && !usePlace);
      const place = usePlace ? PLACE[rng.pick(act.places)] : null;
      const comp = useComp ? rng.pick(COMP) : null;
      const opin = tier === 3 && rng.bool(0.6) ? rng.pick(OPIN) : null;

      const en = `${time.en} I ${act.en}${place ? " " + place.en : ""}${comp ? " " + comp.en : ""}${opin ? " " + opin.en : ""}.`;

      const accept: string[] = [];
      const mids: string[][] = [];
      for (const pl of place ? place.es : [""])
        for (const c of comp ? comp.es : [""]) {
          mids.push([pl, c].filter(Boolean));
          if (pl && c) mids.push([c, pl]);
        }
      for (const t of time.es)
        for (const a of act.es)
          for (const m of mids)
            for (const yo of ["", "yo"]) {
              const tail = opin ? opin.es : "";
              accept.push(join(t, yo, a, ...m, tail));
              accept.push(join(yo, a, ...m, t, tail));
            }
      const canon = cap(join(time.es[0], act.es[0], place ? place.es[0] : "", comp ? comp.es[0] : "", opin ? opin.es : "")) + ".";
      const acc = uniq([canon, ...accept]);
      const lc = canon.charAt(0).toLowerCase() + canon.slice(1);
      return {
        prompt: `Translate into Spanish: '${en}'`,
        answer: { type: "text", accept: acc },
        solution: [
          `When: *${time.es[0]}*. Activity (yo): *${act.es[0]}*.`,
          ...(place || comp ? [`${place ? `Where: *${place.es[0]}*. ` : ""}${comp ? `Who with: *${comp.es[0]}*.` : ""}`] : []),
          `Build it up — when + what + where + who${opin ? " + opinion" : ""}: **${canon}**`,
        ],
        hint: "Translate chunk by chunk: when → what (yo form) → where → who with" + (opin ? " → *porque es…*" : "") + ".",
        traps: safeTraps(acc, [
          time.trap ? [lc.replace(time.es[0], time.trap[0]), time.trap[1]] : [null, ""],
          act.trap ? [lc.replace(act.es[0], act.trap[0]), act.trap[1]] : [null, ""],
        ]),
      };
    },
  },
];
