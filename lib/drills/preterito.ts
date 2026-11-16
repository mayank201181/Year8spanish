// Procedural skill drills for the preterite (el pretérito).
// Every verb form comes from the tested conjugator in lib/spanish/verbs.ts.
import type { Drill, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import {
  conjugate,
  acceptedForms,
  englishGloss,
  verbInfo,
  verbsWithTag,
  PERSONS,
  SUBJECT_PRONOUNS,
  type Person,
  type Tense,
} from "../spanish/verbs.ts";

type Tier = 1 | 2 | 3;
type Group = "ar" | "er" | "ir";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

/** Same normalisation as the answer checker (case, spaces, punctuation). */
function norm(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/['‘’`´]/g, "")
    .replace(/[¿?¡!.,;:"“”()…–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Normalised and accent-free: two answers that match here differ only by accents. */
function bare(s: string): string {
  return norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "").normalize("NFC");
}

function uniq(list: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const s of list) {
    const k = norm(s);
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(s.trim().replace(/\s+/g, " "));
  }
  return out;
}

/** Build traps, dropping any wrong answer that is accepted or differs from one only by accents. */
function mkTraps(accept: string[], raw: Array<[string[], string]>): Trap[] {
  const acc = new Set(accept.map(bare));
  const out: Trap[] = [];
  for (const [list, feedback] of raw) {
    const l = uniq(list.filter((x) => x && !acc.has(bare(x))));
    if (l.length) out.push({ spec: { type: "text", accept: l }, feedback });
    if (out.length === 2) break;
  }
  return out;
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function join(...parts: string[]): string {
  return parts.filter((p) => p && p.trim()).join(" ").replace(/\s+/g, " ").trim();
}

/** "y" becomes "e" before a word starting with an i sound (hice → e hice). */
function and(next: string): string {
  return /^h?[ií](?![aeiouáéíóú])/i.test(next) ? "e" : "y";
}

const GROUP_OF = (inf: string): Group => verbInfo(inf)!.group;
const IS_REFL = (inf: string): boolean => verbInfo(inf)!.reflexive;
const MEANING_OVERRIDE: Record<string, string> = {
  estar: "to be — location, feelings",
  dar: "to give; *dar un paseo* = to go for a walk",
};
/** English meaning without nested brackets (it is shown inside brackets). */
const MEANING = (inf: string): string => MEANING_OVERRIDE[inf] ?? verbInfo(inf)!.en.replace(/\s*\(([^)]*)\)/g, " $1");

/** Person label for explanations: él → él / ella. */
const PD = (p: Person): string => (p === "él" ? "él / ella" : p === "ellos" ? "ellos / ellas" : p);

/** Regular stem: hablar → habl, levantarse → levant. */
function regStem(inf: string): string {
  const base = IS_REFL(inf) ? inf.slice(0, -2) : inf;
  return base.slice(0, -2);
}

const PRET_END: Record<Group, Record<Person, string>> = {
  ar: { yo: "é", tú: "aste", él: "ó", nosotros: "amos", vosotros: "asteis", ellos: "aron" },
  er: { yo: "í", tú: "iste", él: "ió", nosotros: "imos", vosotros: "isteis", ellos: "ieron" },
  ir: { yo: "í", tú: "iste", él: "ió", nosotros: "imos", vosotros: "isteis", ellos: "ieron" },
};

const pret = (inf: string, p: Person) => conjugate(inf, "preterite", p);
const pres = (inf: string, p: Person) => conjugate(inf, "present", p);

/** Accepted verb forms WITHOUT a subject pronoun (canonical first). */
function bareForms(inf: string, tense: Tense, p: Person): string[] {
  return acceptedForms(inf, tense, p).filter((f) => !SUBJECT_PRONOUNS[p].some((s) => f.startsWith(s + " ")));
}

/** Split off a reflexive pronoun: "me levanté" → ["me", "levanté"]. */
function splitPron(form: string, inf: string): [string, string] {
  if (!IS_REFL(inf)) return ["", form];
  const i = form.indexOf(" ");
  return [form.slice(0, i), form.slice(i + 1)];
}

/** A pronoun to show for a person (él → él or ella …). */
function showPronoun(rng: Rng, p: Person): string {
  switch (p) {
    case "él":
      return rng.pick(["él", "ella"]);
    case "nosotros":
      return rng.pick(["nosotros", "nosotras"]);
    case "ellos":
      return rng.pick(["ellos", "ellas"]);
    default:
      return p;
  }
}

function personsFor(tier: Tier): readonly Person[] {
  return tier === 1 ? ["yo", "él", "ellos"] : PERSONS;
}

// ---------------------------------------------------------------------------
// Subjects for whole sentences
// ---------------------------------------------------------------------------

interface Subject {
  /** What the sentence shows ("" when the pronoun is dropped). */
  show: string;
  /** Subject strings an answer may start with. */
  accept: string[];
  /** Label for a gap-fill frame, e.g. "(yo)" or "Mi hermano". */
  label: string;
}

const NAMED: Partial<Record<Person, string[]>> = {
  él: ["mi hermano", "mi hermana", "Lucía", "Pablo", "mi amiga Aisha", "Arjun", "mi padre"],
  nosotros: ["mi familia y yo", "Wei Ling y yo"],
  vosotros: ["Javier y tú"],
  ellos: ["mis padres", "mis amigos", "Diego y Sofía", "mis primos", "Priya y Hana"],
};

function pickSubject(rng: Rng, p: Person): Subject {
  const names = NAMED[p];
  const useName = p === "él" || p === "ellos" ? rng.bool(0.8) : !!names && rng.bool(0.3);
  if (useName && names) {
    const n = rng.pick(names);
    return { show: n, accept: [n], label: cap(n) };
  }
  const pron = showPronoun(rng, p);
  if (p === "él" || p === "ellos") return { show: pron, accept: [pron], label: cap(pron) };
  return { show: "", accept: ["", ...SUBJECT_PRONOUNS[p]], label: `(${pron})` };
}

/** Every accepted sentence: optional time phrase at the start or the end. */
function sentences(time: string, subjects: string[], cores: string[], timeEnd = true): string[] {
  const out: string[] = [];
  for (const s of subjects) {
    for (const c of cores) {
      const core = join(s, c);
      if (!time) out.push(core);
      else {
        out.push(join(time, core));
        if (timeEnd) out.push(join(core, time));
      }
    }
  }
  return uniq(out.map((x) => x.toLowerCase()));
}

// ---------------------------------------------------------------------------
// Activities: verb + complement that work in every person and time frame
// ---------------------------------------------------------------------------

interface Act {
  inf: string;
  es: string;
  /** Other acceptable Spanish complements. */
  alt?: string[];
  /** English past predicate; {was} becomes was / were. */
  en: string;
  tier: Tier;
  /** false = English is ambiguous, don't use for English → Spanish. */
  enes?: boolean;
}

const ACTS: Act[] = [
  { inf: "hablar", es: "por teléfono", en: "talked on the phone", tier: 1 },
  { inf: "escuchar", es: "música", en: "listened to music", tier: 1 },
  { inf: "bailar", es: "salsa", en: "danced salsa", tier: 1 },
  { inf: "nadar", es: "en el mar", en: "swam in the sea", tier: 1 },
  { inf: "cocinar", es: "la cena", en: "cooked dinner", tier: 1 },
  { inf: "visitar", es: "el museo", en: "visited the museum", tier: 1 },
  { inf: "comprar", es: "una camiseta", en: "bought a T-shirt", tier: 1 },
  { inf: "estudiar", es: "para el examen", en: "studied for the exam", tier: 1 },
  { inf: "comer", es: "churros", en: "ate churros", tier: 1 },
  { inf: "beber", es: "zumo de naranja", en: "drank orange juice", tier: 1 },
  { inf: "escribir", es: "un correo", alt: ["un email", "un correo electrónico"], en: "wrote an email", tier: 1 },
  { inf: "ir", es: "al cine", en: "went to the cinema", tier: 1 },
  { inf: "ir", es: "a la playa", en: "went to the beach", tier: 1 },
  { inf: "hacer", es: "deporte", en: "did sport", tier: 1 },
  { inf: "ver", es: "una película", alt: ["una peli"], en: "watched a film", tier: 1 },
  { inf: "jugar", es: "al fútbol", en: "played football", tier: 2 },
  { inf: "tocar", es: "la guitarra", en: "played the guitar", tier: 2 },
  { inf: "sacar", es: "fotos", en: "took photos", tier: 2 },
  { inf: "llegar", es: "tarde", en: "arrived late", tier: 2 },
  { inf: "pagar", es: "la cuenta", en: "paid the bill", tier: 2 },
  { inf: "empezar", es: "un libro nuevo", en: "started a new book", tier: 2 },
  { inf: "cruzar", es: "la calle", en: "crossed the road", tier: 2 },
  { inf: "practicar", es: "yoga", en: "practised yoga", tier: 2 },
  { inf: "tener", es: "un examen", en: "had an exam", tier: 2 },
  { inf: "estar", es: "en casa", en: "{was} at home", tier: 2 },
  { inf: "dar", es: "un paseo", en: "went for a walk", tier: 2, enes: false },
  { inf: "salir", es: "con unos amigos", en: "went out with some friends", tier: 2 },
  { inf: "volver", es: "a casa", en: "went back home", tier: 2 },
  { inf: "tomar", es: "el MRT", en: "took the MRT", tier: 2 },
  { inf: "hacer", es: "un pastel", en: "made a cake", tier: 2 },
  { inf: "correr", es: "en el parque", en: "ran in the park", tier: 2 },
  { inf: "ver", es: "la tele", alt: ["la televisión"], en: "watched TV", tier: 2 },
  { inf: "levantarse", es: "temprano", en: "got up early", tier: 3 },
  { inf: "quedarse", es: "en casa", en: "stayed at home", tier: 3 },
  { inf: "almorzar", es: "en el comedor", en: "had lunch in the canteen", tier: 3, enes: false },
  { inf: "leer", es: "un libro", en: "read a book", tier: 3, enes: false },
  { inf: "fregar", es: "los platos", en: "washed up", tier: 3, enes: false },
  { inf: "navegar", es: "por internet", en: "surfed the internet", tier: 3 },
  { inf: "recibir", es: "un regalo", en: "received a present", tier: 3 },
  { inf: "aprender", es: "mucho", en: "learnt a lot", tier: 3 },
  { inf: "ayudar", es: "en casa", en: "helped at home", tier: 3 },
  { inf: "viajar", es: "a Madrid", en: "travelled to Madrid", tier: 3 },
  { inf: "regar", es: "las plantas", en: "watered the plants", tier: 3 },
];

function actsFor(tier: Tier, filter: (a: Act) => boolean = () => true): Act[] {
  return ACTS.filter((a) => a.tier <= tier && filter(a));
}

const comps = (a: Act): string[] => [a.es, ...(a.alt ?? [])];

// ---------------------------------------------------------------------------
// Explanations
// ---------------------------------------------------------------------------

/** Verbs whose englishGloss reads naturally with their activity (not dar un paseo, sacar fotos, hacer deporte). */
const GLOSS_OK = new Set(ACTS.map((a) => a.inf).filter((i) => !["dar", "sacar", "hacer", "tomar", "practicar"].includes(i)));

const SPELLING_INFS = new Set([
  ...verbsWithTag("spelling-car").map((v) => v.inf),
  ...verbsWithTag("spelling-gar").map((v) => v.inf),
  ...verbsWithTag("spelling-zar").map((v) => v.inf),
]);
const IRREGULAR_INFS = new Set(["ir", "ser", "hacer", "tener", "estar", "dar", "ver", "leer"]);

/** 2–3 short worked steps explaining how a preterite form is built. */
function pretSteps(inf: string, p: Person): string[] {
  const form = pret(inf, p);
  const pron = splitPron(form, inf)[0];
  const g = GROUP_OF(inf);
  const stem = regStem(inf);
  const reflex = pron ? ` Reflexive, so *${pron}* goes in front.` : "";
  switch (inf) {
    case "ir":
    case "ser":
      return [`*${inf}* is irregular: *fui, fuiste, fue, fuimos, fuisteis, fueron* (the same for *ir* and *ser*, no accents).`, `*${PD(p)}* → **${form}**.`];
    case "hacer":
      return [`*hacer* has the irregular stem *hic-* (*hiz-* before *o*): *hice, hiciste, hizo, hicimos, hicisteis, hicieron*.`, `No accents on irregular stems. *${PD(p)}* → **${form}**.`];
    case "tener":
      return [`*tener* has the irregular stem *tuv-* + *-e, -iste, -o, -imos, -isteis, -ieron*.`, `No accents. *${PD(p)}* → **${form}**.`];
    case "estar":
      return [`*estar* has the irregular stem *estuv-* + *-e, -iste, -o, -imos, -isteis, -ieron*.`, `No accents. *${PD(p)}* → **${form}**.`];
    case "dar":
      return [`*dar* takes *-er/-ir* endings with no accents: *di, diste, dio, dimos, disteis, dieron*.`, `*${PD(p)}* → **${form}**.`];
    case "ver":
      return [`*ver* → stem *v-* + *-er* endings, but one-syllable forms need no accent: *vi, viste, vio, vimos, visteis, vieron*.`, `*${PD(p)}* → **${form}**.`];
    case "leer":
      return p === "él" || p === "ellos"
        ? [`*leer* → stem *le-* + *-ió / -ieron*.`, `An unstressed *i* between two vowels becomes *y*: *leió* → **${form}**.`]
        : [`*leer* → stem *le-* + *-${PRET_END.er[p]}*; the accent keeps the vowels separate.`, `*${PD(p)}* → **${form}**.`];
  }
  const end = PRET_END[g][p];
  const steps = [`*${inf}* → stem *${stem}-* (${g === "ar" ? "-ar" : "-er/-ir"} verb).${reflex}`];
  if (SPELLING_INFS.has(inf) && p === "yo") {
    const last = stem.slice(-1);
    const why =
      last === "c"
        ? "*c → qu* before *é* keeps the hard 'k' sound"
        : last === "g"
          ? "*g → gu* before *é* keeps the hard 'g' sound"
          : "*z → c* before *é* (Spanish writes *ce*, not *ze*)";
    steps.push(`*yo* ending *-é*: *${stem}é* would change the sound, so ${why}.`);
  } else {
    steps.push(`*${PD(p)}* ending: *-${end}*.`);
  }
  const pres3 = verbInfo(inf)!.tags.some((t) => t.startsWith("stem-"));
  steps.push(`→ **${form}**${pres3 && g !== "ir" ? " (no stem change in the preterite)" : ""}.`);
  return steps;
}

/** The "boot" mistake: present-tense stem change carried into the preterite (juegué, empiecé, piensó). */
function bootTrap(inf: string, p: Person): string {
  const bootStem = splitPron(pres(inf, "yo"), inf)[1].slice(0, -1); // juego → jueg
  const [pron, word] = splitPron(pret(inf, p), inf);
  const stem = regStem(inf);
  // jugué / jugó keep the regular stem; empecé / almorcé change its last letter (z → c).
  const wrong = word.startsWith(stem) ? bootStem + word.slice(stem.length) : bootStem.slice(0, -1) + word.slice(stem.length - 1);
  return join(pron, wrong);
}

const BOOT_INFS = new Set(["jugar", "empezar", "almorzar", "regar", "fregar", "pensar", "despertarse", "acostarse", "merendar", "volver"]);

// ---------------------------------------------------------------------------
// Verb pools
// ---------------------------------------------------------------------------

const AR_T1 = ["hablar", "escuchar", "bailar", "cantar", "nadar", "cocinar", "visitar", "comprar", "estudiar", "viajar", "trabajar", "lavar", "ayudar", "cenar", "mirar"];
const AR_T2 = [...AR_T1, "desayunar", "limpiar", "ordenar", "montar", "descansar", "terminar", "ganar", "preparar", "tomar", "dibujar", "levantarse", "ducharse", "quedarse"];
const AR_T3 = [...AR_T2, "pensar", "despertarse", "acostarse", "merendar"];

const ERIR_T1 = ["comer", "beber", "escribir", "vivir", "aprender", "correr", "salir", "abrir"];
const ERIR_T2 = [...ERIR_T1, "comprender", "barrer", "recibir", "subir", "compartir", "volver", "ver"];

const SPELL_T1 = ["jugar", "tocar", "empezar", "llegar", "sacar", "practicar", "pagar", "cruzar"];
const SPELL_ALL = [...SPELLING_INFS];

const IRREG_T1 = ["ir", "hacer", "tener", "ver"];
const IRREG_ALL = ["ir", "ser", "hacer", "tener", "estar", "dar", "ver"];

// Frames for gap-fill items: verb → complement.
const FRAME: Record<string, string> = {
  jugar: "al fútbol",
  tocar: "la guitarra",
  sacar: "la basura",
  practicar: "yoga",
  llegar: "tarde al colegio",
  pagar: "la cuenta",
  navegar: "por internet",
  regar: "las plantas",
  fregar: "los platos",
  empezar: "los deberes",
  cruzar: "la calle",
  almorzar: "en un hawker centre",
  leer: "una novela",
  ir: "al cine",
  hacer: "los deberes",
  tener: "un examen de ciencias",
  estar: "en Málaga",
  dar: "un paseo por el parque",
  ver: "una película",
};

const PAST_STARTS = ["Ayer", "Anoche", "El sábado pasado", "La semana pasada", "Hace dos días", "El verano pasado", "Anteayer"];

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ------------------------------------------------------------------------
  {
    id: "preterito.regular-ar",
    topicId: "preterito",
    title: "Regular -ar verbs in the preterite",
    level: 1,
    guideRef: "regular-ar-preterite",
    generate(rng, tier) {
      const inf = rng.pick(tier === 1 ? AR_T1 : tier === 2 ? AR_T2 : AR_T3);
      const p = rng.pick(personsFor(tier));
      const accept = acceptedForms(inf, "preterite", p);
      const pron = splitPron(accept[0], inf)[0];
      const stem = regStem(inf);
      const raw: Array<[string[], string]> = [];
      if (BOOT_INFS.has(inf) && p !== "nosotros" && p !== "vosotros") {
        raw.push([[bootTrap(inf, p)], "No boot in the preterite for -ar verbs — keep the stem from the infinitive."]);
      }
      if (p === "tú") raw.push([[join(pron, stem + "astes")], "The *tú* form of the preterite has no final *s*: *-aste*."]);
      raw.push([[pres(inf, p)], "That's the present tense. The preterite *-ar* endings are *-é, -aste, -ó, -amos, -asteis, -aron*."]);
      if (p === "yo") raw.push([[join(pron, stem + "í")], "*-í* is the *-er/-ir* ending. *-ar* verbs take *-é* for *yo*."]);
      const shown = showPronoun(rng, p);
      const t = rng.int(0, 2);
      const prompt =
        t === 0
          ? `Write the preterite of *${inf}* (${MEANING(inf)}) for **${shown}**.`
          : t === 1
            ? `Past tense: how do you say that **${shown}** did this? *${inf}* (${MEANING(inf)}).`
            : `Conjugate *${inf}* in the preterite (pretérito indefinido) for **${shown}**.`;
      return {
        prompt,
        answer: { type: "text", accept },
        solution: pretSteps(inf, p),
        hint: p === "nosotros" ? "The *nosotros* preterite of *-ar* verbs looks just like the present." : "Take off *-ar*, then add the preterite ending for this person: *-é, -aste, -ó, -amos, -asteis, -aron*.",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 2 ------------------------------------------------------------------------
  {
    id: "preterito.regular-er-ir",
    topicId: "preterito",
    title: "Regular -er and -ir verbs in the preterite",
    level: 1,
    guideRef: "regular-er-ir-preterite",
    generate(rng, tier) {
      const inf = rng.pick(tier === 1 ? ERIR_T1 : tier === 2 ? ERIR_T2 : [...ERIR_T2, "ver", "ver"]);
      const p = rng.pick(personsFor(tier));
      const accept = acceptedForms(inf, "preterite", p);
      const stem = regStem(inf);
      const raw: Array<[string[], string]> = [];
      raw.push([[pres(inf, p)], "That's the present tense. The preterite *-er/-ir* endings are *-í, -iste, -ió, -imos, -isteis, -ieron*."]);
      if (inf !== "ver" && (p === "yo" || p === "él")) {
        raw.push([[stem + PRET_END.ar[p]], "That's an *-ar* ending. *-er* and *-ir* verbs share *-í, -iste, -ió, -imos, -isteis, -ieron*."]);
      }
      if (p === "tú") raw.push([[stem + "istes"], "The *tú* form of the preterite has no final *s*: *-iste*."]);
      if (p === "ellos") raw.push([[stem + "ieran", stem + "eron"], "The *ellos* ending is *-ieron*."]);
      const shown = showPronoun(rng, p);
      const t = rng.int(0, 1);
      const prompt =
        t === 0
          ? `Write the preterite of *${inf}* (${MEANING(inf)}) for **${shown}**.`
          : `Past tense: *${inf}* (${MEANING(inf)}), **${shown}**.`;
      return {
        prompt,
        answer: { type: "text", accept },
        solution: pretSteps(inf, p),
        hint: inf === "ver" ? "*ver* is tiny: stem *v-* + the *-er* endings, and one-syllable forms lose the accent." : "*-er* and *-ir* verbs share one set of endings: *-í, -iste, -ió, -imos, -isteis, -ieron*.",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 3 ------------------------------------------------------------------------
  {
    id: "preterito.time-phrases",
    topicId: "preterito",
    title: "Past time phrases (Spanish ↔ English)",
    level: 1,
    guideRef: "past-time-phrases",
    generate(rng, tier) {
      const FIXED: Array<[string, string[]]> = [
        ["ayer", ["yesterday"]],
        ["anteayer", ["the day before yesterday", "day before yesterday"]],
        ["anoche", ["last night"]],
        ["el fin de semana pasado", ["last weekend"]],
        ["la semana pasada", ["last week"]],
        ["el mes pasado", ["last month"]],
        ["el año pasado", ["last year"]],
        ["el verano pasado", ["last summer"]],
        ["el otro día", ["the other day"]],
        ["ayer por la mañana", ["yesterday morning"]],
        ["ayer por la tarde", ["yesterday afternoon", "yesterday evening"]],
      ];
      const DAYS: Array<[string, string]> = [
        ["lunes", "Monday"], ["martes", "Tuesday"], ["miércoles", "Wednesday"], ["jueves", "Thursday"],
        ["viernes", "Friday"], ["sábado", "Saturday"], ["domingo", "Sunday"],
      ];
      const NUMS: Array<[string, string, number]> = [
        ["dos", "two", 2], ["tres", "three", 3], ["cuatro", "four", 4], ["cinco", "five", 5], ["seis", "six", 6], ["diez", "ten", 10],
      ];
      const UNITS: Array<[string, string, string, string]> = [
        ["día", "días", "day", "days"], ["semana", "semanas", "week", "weeks"], ["mes", "meses", "month", "months"], ["año", "años", "year", "years"],
      ];
      const ONE: Record<string, string> = { día: "un día", semana: "una semana", mes: "un mes", año: "un año" };

      let es: string, en: string[];
      const kind = tier === 1 ? 0 : rng.int(0, tier === 2 ? 2 : 3);
      const extraTraps: Array<[string[], string]> = [];
      if (kind === 0 || (kind === 3 && rng.bool())) {
        [es, en] = rng.pick(FIXED);
      } else if (kind === 1) {
        const [d, e] = rng.pick(DAYS);
        es = `el ${d} pasado`;
        en = [`last ${e}`];
        extraTraps.push([[`la ${d} pasada`], "Days of the week are masculine: *el lunes*, so *pasado* stays masculine."]);
      } else {
        const [u1, uN, e1, eN] = rng.pick(UNITS);
        if (rng.bool(0.25)) {
          es = `hace ${ONE[u1]}`;
          en = [`a ${e1} ago`, `one ${e1} ago`, `1 ${e1} ago`];
          extraTraps.push([[`${ONE[u1]} hace`], "Spanish puts *hace* first: *hace* + time = ago."]);
        } else {
          const [nEs, nEn, n] = rng.pick(NUMS);
          es = `hace ${nEs} ${uN}`;
          en = [`${nEn} ${eN} ago`, `${n} ${eN} ago`];
          extraTraps.push([[`${nEs} ${uN} hace`], "Spanish puts *hace* first: *hace* + time = ago."]);
        }
      }
      const toEnglish = rng.bool();
      if (toEnglish) {
        const accept = en;
        const traps = mkTraps(accept, [
          [es.includes("pasad") ? [en[0].replace("last", "next")] : [], "*pasado / pasada* means 'last' (the one that has passed), not 'next'."],
          [es.startsWith("hace") ? [en[0].replace(" ago", " later"), "in " + en[0].replace(" ago", "")] : [], "*hace* + time looks back into the past: it means 'ago'."],
          [es === "anoche" ? ["tonight"] : [], "*anoche* is last night; tonight is *esta noche*."],
          [es.includes("mañana") ? ["yesterday tomorrow", "tomorrow"] : [], "*por la mañana* = in the morning. *Mañana* alone means tomorrow."],
        ]);
        return {
          prompt: `What does *${es}* mean in English?`,
          answer: { type: "text", accept },
          solution: [
            es.startsWith("hace")
              ? `*hace* + a length of time = '… ago' (Spanish puts *hace* first).`
              : es.includes("pasad")
                ? `*pasado / pasada* = 'last' (literally 'passed').`
                : `Learn it as a chunk: *${es}*.`,
            `*${es}* = **${en[0]}**.`,
          ],
          hint: "Past time phrases tell you the preterite is coming. Think: when did it happen?",
          traps,
        };
      }
      const accept = [es];
      const raw: Array<[string[], string]> = [...extraTraps];
      if (es.includes("pasada")) raw.push([[es.replace("pasada", "pasado")], "*semana* is feminine, so *pasado* must agree: *pasada*."]);
      else if (es.includes("pasado") && !es.startsWith("el fin")) raw.push([[es.replace("pasado", "pasada")], `*${es.split(" ")[1]}* is masculine, so it stays *pasado*.`]);
      if (es === "el fin de semana pasado") raw.push([["el fin de semana pasada"], "*pasado* agrees with *el fin* (masculine), so it stays *pasado*."]);
      if (es === "ayer por la mañana") raw.push([["ayer mañana"], "Add *por la*: *ayer por la mañana*. (*Mañana* on its own means tomorrow.)"]);
      if (es === "anoche") raw.push([["esta noche"], "*esta noche* means tonight. Last night is *anoche*."]);
      return {
        prompt: `Write in Spanish: *${cap(en[0])}*.`,
        answer: { type: "text", accept },
        solution: [
          es.startsWith("hace")
            ? `'ago' → *hace* goes **in front of** the time: *hace* + ${es.slice(5)}.`
            : es.includes("pasad")
              ? `'last' → *pasado*, which agrees with the noun and goes after it.`
              : `Learn it as a chunk.`,
          `**${es}**`,
        ],
        hint: es.startsWith("hace") ? "Spanish uses *hace* + time for 'ago' — but where does *hace* go?" : es.includes("pasad") ? "'last' = *pasado*: check whether the noun is masculine or feminine." : "This one is a single fixed phrase.",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 4 ------------------------------------------------------------------------
  {
    id: "preterito.opinions",
    topicId: "preterito",
    title: "Opinions about the past: fue genial, lo pasé bomba",
    level: 1,
    guideRef: "past-time-phrases",
    generate(rng, tier) {
      const FUE = pret("ser", "él");
      const ES_EN: Array<[string, string[]]> = [
        [`${FUE} genial`, ["it was great", "it was brilliant", "it was fantastic"]],
        [`${FUE} increíble`, ["it was amazing", "it was incredible", "it was unbelievable"]],
        [`${FUE} divertido`, ["it was fun", "it was funny", "it was entertaining"]],
        [`${FUE} aburrido`, ["it was boring"]],
        [`${FUE} un rollo`, ["it was a drag", "it was boring", "it was a pain", "it was dull"]],
        [`${FUE} un desastre`, ["it was a disaster"]],
        [`${FUE} emocionante`, ["it was exciting"]],
        ["lo pasé bomba", ["i had a brilliant time", "i had a great time", "i had an amazing time", "i had a fantastic time", "i had a blast", "i had a really good time"]],
        ["lo pasé bien", ["i had a good time", "i had a nice time"]],
        ["lo pasé fatal", ["i had an awful time", "i had a terrible time", "i had a horrible time", "i had a really bad time"]],
        ["lo pasé mal", ["i had a bad time"]],
        ["me gustó", ["i liked it"]],
        ["me encantó", ["i loved it"]],
        ["no me gustó nada", ["i didn't like it at all", "i did not like it at all"]],
      ];
      const EN_ES: Array<[string, string[], string[], string]> = [
        ["It was great.", [`${FUE} genial`, `${FUE} estupendo`, `${FUE} fenomenal`], ["es genial"], "*es* is the present. For a past event: *fue*."],
        ["It was boring.", [`${FUE} aburrido`, `${FUE} un rollo`], ["es aburrido"], "*es* is the present. For a past event: *fue*."],
        ["It was fun.", [`${FUE} divertido`], ["es divertido", "fui divertido"], "Use *fue* (it was) — *es* is the present and *fui* means 'I was'."],
        ["It was a disaster.", [`${FUE} un desastre`], ["es un desastre"], "*es* is the present. For a past event: *fue*."],
        ["It was amazing.", [`${FUE} increíble`, `${FUE} alucinante`], ["es increíble", "fui increíble"], "Use *fue* (it was) — *es* is the present and *fui* means 'I was'."],
        ["I had a brilliant time.", ["lo pasé bomba", "lo pasé genial", "lo pasé fenomenal"], ["lo paso bomba", "tuve un tiempo genial"], "Use the past chunk *lo pasé* + *bomba / genial*. (*lo paso* is the present, and Spanish doesn't say *tuve un tiempo*.)"],
        ["I had a good time.", ["lo pasé bien"], ["lo paso bien", "tuve un buen tiempo"], "Use the past chunk *lo pasé bien*. (*lo paso* is the present — and *buen tiempo* means good weather!)"],
        ["I had an awful time.", ["lo pasé fatal"], ["lo paso fatal"], "*lo paso* is the present. Past: *lo pasé*."],
        ["I liked it.", ["me gustó"], ["me gusta", "me gusto"], "*me gusta* is the present. In the past: *me gustó*."],
        ["I loved it.", ["me encantó"], ["me encanta"], "*me encanta* is the present. In the past: *me encantó*."],
        ["I didn't like it at all.", ["no me gustó nada"], ["no me gusta nada"], "*no me gusta nada* is the present. In the past: *no me gustó nada*."],
      ];
      const mode = tier === 1 ? rng.int(0, 1) : tier === 2 ? rng.int(0, 3) : rng.pick([0, 1, 2, 2, 3, 3]);
      if (mode === 0) {
        const [es, en] = rng.pick(ES_EN);
        return {
          prompt: `What does *${cap(es)}* mean in English?`,
          answer: { type: "text", accept: en },
          solution: [
            es.startsWith("lo pas") ? "*lo pasé* + adverb = 'I had a … time' (literally 'I spent it …')." : es.startsWith(FUE) ? "*fue* = 'it was' (preterite of *ser*)." : "*gustó / encantó* = past of *gusta / encanta*.",
            `*${cap(es)}* = **${cap(en[0])}**.`,
          ],
          hint: "Spot the past-tense verb: *fue* (it was), *pasé* (I spent), *gustó* (it pleased).",
          traps: mkTraps(en, [
            [es.startsWith(FUE) ? [en[0].replace("it was", "it is")] : es.includes("gustó") || es.includes("encantó") ? [en[0].replace("liked", "like").replace("loved", "love").replace("didn't", "don't")] : [], "Check the tense: this opinion is in the past."],
          ]),
        };
      }
      if (mode === 1) {
        const [en, accept, wrong, fb] = rng.pick(EN_ES);
        return {
          prompt: `Give your opinion about a past event in Spanish: *${en}*`,
          answer: { type: "text", accept },
          solution: [
            accept[0].startsWith("lo pas") ? "Chunk: *lo pasé* + *bomba / bien / fatal* = 'I had a … time'." : accept[0].startsWith(FUE) ? "'it was' about a past event → *fue* (from *ser*)." : "Past of *me gusta / me encanta* → *-ó*.",
            `**${cap(accept[0])}.**`,
          ],
          hint: "Past opinions use *fue*, *lo pasé* or *me gustó / me encantó*.",
          traps: mkTraps(accept, [[wrong, fb]]),
        };
      }
      if (mode === 2) {
        // lo pasé → other persons (pasar via the conjugator)
        const HOW: Array<[string, string[]]> = [
          ["a brilliant time", ["bomba", "genial", "fenomenal"]],
          ["a good time", ["bien"]],
          ["an awful time", ["fatal"]],
          ["a bad time", ["mal"]],
        ];
        const WHO: Array<[string, Person, string[]]> = [
          ["We", "nosotros", ["", "nosotros", "nosotras"]],
          ["My parents", "ellos", ["mis padres"]],
          ["My friends", "ellos", ["mis amigos"]],
          ["They", "ellos", ["", "ellos", "ellas"]],
          ["My sister", "él", ["mi hermana"]],
          ["Pablo", "él", ["pablo"]],
          ["You (tú)", "tú", ["", "tú"]],
          ["You all (vosotros)", "vosotros", ["", "vosotros", "vosotras"]],
        ];
        const [howEn, adv] = rng.pick(HOW);
        const [whoEn, p, subj] = rng.pick(WHO);
        const v = pret("pasar", p);
        const accept = sentences("", subj, adv.map((a) => `lo ${v} ${a}`));
        return {
          prompt: `Write in Spanish: *${whoEn} had ${howEn}.* (Use *lo pasé* … but change it to match the person.)`,
          answer: { type: "text", accept },
          solution: [
            `The chunk is *pasarlo* + adverb; only *pasar* changes.`,
            `*pasar*, ${PD(p)} → *${v}*.`,
            `**${cap(accept[0])}.**`,
          ],
          hint: "Keep *lo* and the adverb; change *pasé* to the right preterite ending.",
          traps: mkTraps(accept, [
            [subj.map((s) => join(s, `lo pasé ${adv[0]}`)), "*pasé* is only for *yo*. Change the ending to match who had the time."],
            [subj.map((s) => join(s, `lo ${pres("pasar", p)} ${adv[0]}`)), "That's the present tense. Use the preterite of *pasar*."],
          ]),
        };
      }
      // mode 3: me gustó / me gustaron, me encantó / me encantaron
      const THINGS: Array<[string, boolean, string]> = [
        ["el concierto", false, "the concert"],
        ["la película", false, "the film"],
        ["el museo", false, "the museum"],
        ["la excursión", false, "the trip"],
        ["la paella de verduras", false, "the vegetable paella"],
        ["el partido", false, "the match"],
        ["los churros", true, "the churros"],
        ["las patatas bravas", true, "the patatas bravas"],
        ["los fuegos artificiales", true, "the fireworks"],
        ["las montañas rusas", true, "the roller coasters"],
        ["los museos de Madrid", true, "the museums in Madrid"],
        ["las playas de Málaga", true, "the beaches in Málaga"],
      ];
      const [thing, plural, thingEn] = rng.pick(THINGS);
      const verb = rng.pick(["gustar", "encantar"]);
      const neg = verb === "gustar" && rng.bool(0.25);
      const stem = verb.slice(0, -2);
      const form = plural ? `${stem}aron` : `${stem}ó`;
      const other = plural ? `${stem}ó` : `${stem}aron`;
      const lead = neg ? "No me" : "Me";
      const accept = [form, `${lead.toLowerCase()} ${form} ${thing}`];
      return {
        prompt: `Complete with the preterite of *${verb}*: *${lead} ___ ${thing}.* (${neg ? "I didn't like" : verb === "gustar" ? "I liked" : "I loved"} ${thingEn}.)`,
        answer: { type: "text", accept },
        solution: [
          `With *${verb}* the verb agrees with the thing liked: *${thing}* is ${plural ? "plural" : "singular"}.`,
          `${plural ? "Plural" : "Singular"} past → *-${plural ? "aron" : "ó"}*: **${form}**.`,
        ],
        hint: "Who or what is doing the pleasing? Count it: one thing or more than one?",
        traps: mkTraps(accept, [
          [[other, `${lead.toLowerCase()} ${other} ${thing}`], plural ? `*${thing}* is plural, so the verb is plural too: *-aron*.` : `*${thing}* is one thing, so the verb is singular: *-ó*.`],
          [[plural ? `${stem}an` : `${stem}a`], "That's the present tense. You need the past: *-ó / -aron*."],
        ]),
      };
    },
  },

  // 5 ------------------------------------------------------------------------
  {
    id: "preterito.accent-meaning",
    topicId: "preterito",
    title: "Accents change meaning: hablo vs habló",
    level: 2,
    guideRef: "regular-ar-preterite",
    generate(rng, tier) {
      const PAIRS: Array<[string, string[], string[], string[]]> = [
        // inf, English base(s), past(s), -ing(s)
        ["cocinar", ["cook"], ["cooked"], ["cooking"]],
        ["bailar", ["dance"], ["danced"], ["dancing"]],
        ["nadar", ["swim"], ["swam"], ["swimming"]],
        ["cantar", ["sing"], ["sang"], ["singing"]],
        ["trabajar", ["work"], ["worked"], ["working"]],
        ["estudiar", ["study"], ["studied"], ["studying"]],
        ["lavar", ["wash"], ["washed"], ["washing"]],
        ["ayudar", ["help"], ["helped"], ["helping"]],
        ["viajar", ["travel"], ["travelled", "traveled"], ["travelling", "traveling"]],
        ["comprar", ["buy"], ["bought"], ["buying"]],
        ["visitar", ["visit"], ["visited"], ["visiting"]],
        ["descansar", ["rest"], ["rested"], ["resting"]],
        ["ganar", ["win"], ["won"], ["winning"]],
        ["terminar", ["finish"], ["finished"], ["finishing"]],
        ["hablar", ["speak", "talk"], ["spoke", "talked"], ["speaking", "talking"]],
        ["entrenar", ["train"], ["trained"], ["training"]],
        ["dibujar", ["draw"], ["drew"], ["drawing"]],
      ];
      const pool = tier === 1 ? PAIRS.slice(0, 10) : PAIRS;
      const [inf, base, past, ing] = rng.pick(pool);
      const yoPres = pres(inf, "yo");
      const elPast = pret(inf, "él");
      const isPast = rng.bool();
      const mode = tier === 1 ? 0 : rng.int(0, 1);
      const enIPres = [...base.map((b) => `i ${b}`), ...ing.map((g) => `i am ${g}`), ...ing.map((g) => `i'm ${g}`)];
      const enHePast = past.flatMap((x) => [`he ${x}`, `she ${x}`, `he/she ${x}`, `he or she ${x}`, `she/he ${x}`]);
      const enIPast = past.map((x) => `i ${x}`);
      const enHePres = base.flatMap((b) => {
        const s = b === "study" ? "studies" : b === "wash" ? "washes" : b === "finish" ? "finishes" : b + "s";
        return [`he ${s}`, `she ${s}`, `he/she ${s}`];
      });
      if (mode === 0) {
        const form = isPast ? elPast : yoPres;
        const accept = isPast ? enHePast : enIPres;
        const sentenceBits = rng.pick(["", "", "A text message just says:", "Your exchange partner writes:"]);
        return {
          prompt: `${sentenceBits ? sentenceBits + " " : ""}*${cap(form)}.* Who is it, and is it past or present? Write the English (for example *I walk* or *he/she walked*).`,
          answer: { type: "text", accept },
          solution: isPast
            ? [`*${form}* ends in a **stressed *-ó*** (written accent) → preterite *él / ella* ending.`, `So it is **${accept[0]}** (or she). Compare *${yoPres}* = I ${base[0]}.`]
            : [`*${form}* ends in an **unstressed *-o*** (no accent) → present *yo* ending.`, `So it is **I ${base[0]}**. Compare *${elPast}* = he/she ${past[0]}.`],
          hint: "Look at the last letter: is there an accent on the *o*? Where does the stress fall when you say it?",
          traps: mkTraps(accept, isPast
            ? [[[...enIPres], `No accent = *${yoPres}* (I ${base[0]}). With the accent, *${elPast}* is he/she in the past.`], [[...enIPast], `'I ${past[0]}' would be *${pret(inf, "yo")}*. The *-ó* ending is he/she.`]]
            : [[[...enHePast], `With an accent, *${elPast}* would be he/she ${past[0]}. No accent = I, present.`], [[...enIPast], `'I ${past[0]}' would be *${pret(inf, "yo")}*. *${yoPres}* is the present.`]]),
        };
      }
      // mode 1: English → Spanish, accent decides the meaning
      const who = rng.pick(isPast ? ["he", "she"] : ["I"]);
      const en = isPast ? `${who} ${past[0]}` : `I ${base[0]}`;
      const accept = isPast ? [elPast, `${who === "he" ? "él" : "ella"} ${elPast}`] : [yoPres, `yo ${yoPres}`];
      return {
        prompt: `Write in Spanish — one word is enough, and mind the accent: *${en}*.`,
        answer: { type: "text", accept },
        solution: isPast
          ? [`'${en}' = past, *él / ella* → *-ar* ending *-ó* with an accent.`, `*${inf}* → **${elPast}** (without the accent, *${yoPres}* means 'I ${base[0]}').`]
          : [`'I ${base[0]}' = present, *yo* → ending *-o*, no accent.`, `*${inf}* → **${yoPres}** (with an accent, *${elPast}* means 'he/she ${past[0]}').`],
        hint: "Present *yo* ends in *-o*; preterite *él / ella* ends in *-ó*. Only the accent tells them apart.",
        traps: mkTraps(accept, isPast
          ? [[[pret(inf, "yo")], `*${pret(inf, "yo")}* means 'I ${past[0]}'. For he/she: *-ó*.`], [[pres(inf, "él")], `*${pres(inf, "él")}* is the present ('${who} ${enHePres[0].split(" ")[1]}').`]]
          : [[[pret(inf, "yo")], `*${pret(inf, "yo")}* is the past ('I ${past[0]}'). Present *yo* ends in *-o*.`]]),
      };
    },
  },

  // 6 ------------------------------------------------------------------------
  {
    id: "preterito.spelling-yo",
    topicId: "preterito",
    title: "Spelling-change verbs: jugué, toqué, empecé",
    level: 2,
    guideRef: "spelling-changes",
    generate(rng, tier) {
      let inf: string;
      let p: Person;
      if (tier === 1) {
        inf = rng.pick(SPELL_T1);
        p = "yo";
      } else if (tier === 2) {
        inf = rng.pick(SPELL_ALL);
        p = rng.bool(0.7) ? "yo" : rng.pick(PERSONS);
      } else {
        inf = rng.bool(0.25) ? "leer" : rng.pick(SPELL_ALL);
        p = inf === "leer" ? rng.pick(["él", "ellos", "ellos", "yo"] as const) : rng.bool(0.5) ? "yo" : rng.pick(PERSONS);
      }
      const form = pret(inf, p);
      const subj = pickSubject(rng, p);
      const time = rng.pick(PAST_STARTS);
      const comp = FRAME[inf];
      const frame = `${time} ${subj.show ? subj.show + " " : subj.label + " "}___ ${comp}.`;
      const accept = uniq([
        ...bareForms(inf, "preterite", p),
        ...(subj.show ? [] : acceptedForms(inf, "preterite", p)),
        ...sentences(time.toLowerCase(), subj.accept, [`${form} ${comp}`], false),
      ]);
      const stem = regStem(inf);
      const raw: Array<[string[], string]> = [];
      if (inf === "leer") {
        raw.push([[p === "ellos" ? "leieron" : p === "él" ? "leió" : "leyé"], p === "yo" ? "Only *él* and *ellos* get the *y*. *yo*: *leí*." : "An *i* between two vowels turns into *y*: *leyó, leyeron*."]);
      } else if (p === "yo") {
        const naive = stem + "é";
        const last = stem.slice(-1);
        raw.push([[naive], last === "g" ? `*${naive}* would sound like 'heh' (as in *gente*). Add a *u* to keep the hard g: *${form}*.` : last === "c" ? `*${naive}* would sound like *ce* in *cena*. Change *c* to *qu* to keep the 'k' sound: *${form}*.` : `Spanish doesn't write *ze*. Change *z* to *c* before *e*: *${form}*.`]);
        if (BOOT_INFS.has(inf)) raw.push([[bootTrap(inf, p)], "No boot in the preterite — the stem stays as in the infinitive."]);
      } else {
        raw.push([[pret(inf, "yo")], `*${pret(inf, "yo")}* is the *yo* form. The spelling change only happens before *é*.`]);
        if (BOOT_INFS.has(inf) && p !== "nosotros" && p !== "vosotros") raw.push([[bootTrap(inf, p)], "No boot in the preterite for *-ar* verbs — keep the infinitive stem."]);
      }
      return {
        prompt: `Complete with the preterite of *${inf}* (${MEANING(inf)}):\n\n*${frame}*`,
        answer: { type: "text", accept },
        solution: [
          ...pretSteps(inf, p),
          `*${time} ${subj.show ? subj.show + " " : ""}${form} ${comp}.*`,
        ].slice(-4),
        hint: p === "yo" && inf !== "leer" ? "Say the *yo* form aloud: does the consonant before *-é* keep its sound?" : inf === "leer" ? "Watch out for an *i* squeezed between two vowels." : "Is this the *yo* form? If not, does the spelling still need to change?",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 7 ------------------------------------------------------------------------
  {
    id: "preterito.irregulars",
    topicId: "preterito",
    title: "Irregular preterites: fui, hice, tuve, estuve, di, vi",
    level: 2,
    guideRef: "irregular-preterites",
    generate(rng, tier) {
      const inf = rng.pick(tier === 1 ? IRREG_T1 : IRREG_ALL);
      const p = tier === 1 ? rng.pick(["yo", "él"] as const) : rng.pick(PERSONS);
      const form = pret(inf, p);
      const g = GROUP_OF(inf);
      const raw: Array<[string[], string]> = [];
      if (p === "yo") raw.push([[pret(inf, "él")], `*${pret(inf, "él")}* is he/she/it. For 'I' you need *${form}*.`]);
      if (p === "él") raw.push([[pret(inf, "yo")], `*${pret(inf, "yo")}* means 'I …'. For he/she: *${form}*.`]);
      if (inf !== "ir" && inf !== "ser") {
        const regular = regStem(inf) + PRET_END[g][p];
        raw.push([[regular], `*${inf}* is irregular in the preterite — the regular pattern gives *${regular}*, which isn't a word.`]);
      }
      if (inf === "hacer" && p === "él") raw.push([["hico"], "*c* becomes *z* before *o* to keep the sound: *hizo*."]);
      raw.push([[pres(inf, p)], "That's the present tense."]);
      const useFrame = tier === 3 || (inf !== "ser" && rng.bool(0.5));
      let prompt: string;
      let accept: string[];
      if (useFrame && inf !== "ser") {
        const subj = pickSubject(rng, p);
        const time = rng.pick(PAST_STARTS);
        const comp = FRAME[inf];
        accept = uniq([
          ...bareForms(inf, "preterite", p),
          ...(subj.show ? [] : acceptedForms(inf, "preterite", p)),
          ...sentences(time.toLowerCase(), subj.accept, [`${form} ${comp}`], false),
        ]);
        prompt = `Complete with the preterite of *${inf}* (${MEANING(inf)}):\n\n*${time} ${subj.show ? subj.show : subj.label} ___ ${comp}.*`;
      } else {
        accept = acceptedForms(inf, "preterite", p);
        prompt = `Write the preterite of *${inf}* (${MEANING(inf)}) for **${showPronoun(rng, p)}**.`;
      }
      return {
        prompt,
        answer: { type: "text", accept },
        solution: pretSteps(inf, p),
        hint: inf === "ir" || inf === "ser" ? "*ir* and *ser* share one set of preterite forms, starting *fu-*." : "Irregular preterites have a special stem and no accents.",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 8 ------------------------------------------------------------------------
  {
    id: "preterito.identify-tense",
    topicId: "preterito",
    title: "Past, present or future? Spot the time frame",
    level: 2,
    guideRef: "three-tenses",
    generate(rng, tier) {
      const PAST = ["past", "preterite", "the past", "past tense", "the preterite", "pasado", "pretérito", "el pretérito", "el pasado", "pretérito indefinido"];
      const PRESENT = ["present", "the present", "present tense", "presente", "el presente"];
      const FUTURE = ["future", "near future", "the future", "the near future", "immediate future", "futuro", "futuro inmediato", "el futuro", "ir a"];
      const TIME: Record<Tense, string[]> = {
        preterite: ["Ayer", "El sábado pasado", "Anoche", "La semana pasada"],
        present: ["Normalmente", "Hoy", "Los sábados", "A veces"],
        "near-future": ["Mañana", "El sábado que viene", "La semana que viene", "Esta tarde"],
      };
      const tense = rng.pick(["preterite", "present", "near-future"] as const);
      const pool = tier === 1 ? actsFor(1) : tier === 2 ? actsFor(2) : actsFor(3, (a) => IRREGULAR_INFS.has(a.inf) || GROUP_OF(a.inf) === "ar");
      const act = rng.pick(pool);
      let p = rng.pick(PERSONS);
      for (let i = 0; i < 10 && pres(act.inf, p) === pret(act.inf, p); i++) p = rng.pick(PERSONS);
      if (pres(act.inf, p) === pret(act.inf, p)) p = "él";
      const subj = pickSubject(rng, p);
      const form = conjugate(act.inf, tense, p);
      const time = tier === 1 ? rng.pick(TIME[tense]) : "";
      const sentence = cap(join(time, subj.show, form, act.es)) + ".";
      const accept = tense === "preterite" ? PAST : tense === "present" ? PRESENT : FUTURE;
      const label = tense === "preterite" ? "past (preterite)" : tense === "present" ? "present" : "near future";
      const clue =
        tense === "near-future"
          ? `*${form}* = a form of *ir* + *a* + infinitive → near future.`
          : tense === "preterite"
            ? IRREGULAR_INFS.has(act.inf)
              ? `*${form}* is an irregular preterite form of *${act.inf}*.`
              : `*${splitPron(form, act.inf)[1]}* has a preterite ending (*-é, -aste, -ó …* / *-í, -iste, -ió …*).`
            : `*${form}* is the present tense of *${act.inf}*${act.inf === "ir" ? " — no infinitive after *a*, so it's not the future" : ""}.`;
      const wrongFb = (t: string) =>
        t === "present"
          ? tense === "near-future"
            ? `*${form.split(" ")[0]}* alone would be present, but it is followed by *a* + an infinitive → near future.`
            : `*${form}* does not have a present-tense ending. Look again at the end of the verb.`
          : t === "past"
            ? `There is no preterite ending (*-é, -ó, -í, -ió …*) or irregular past form in *${form}*.`
            : "The near future needs a form of *ir* + *a* + an infinitive.";
      const raw: Array<[string[], string]> = (["past", "present", "future"] as const)
        .filter((t) => !accept.includes(t))
        .map((t) => [t === "past" ? PAST.slice(0, 5) : t === "present" ? PRESENT : FUTURE.slice(0, 5), wrongFb(t)] as [string[], string]);
      return {
        prompt: `Is this sentence in the **past**, the **present** or the **near future**? Type *past*, *present* or *future*.\n\n*${sentence}*`,
        answer: { type: "text", accept, display: label },
        solution: [clue, GLOSS_OK.has(act.inf) ? `It means '${englishGloss(act.inf, tense, p)} …' → **${label}**.` : `So the sentence is in the **${label}**.`],
        hint: time ? "The time phrase is a clue — but check that the verb agrees with it." : "Find the verb. Look at its ending, and check for *ir* + *a* + infinitive.",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 9 ------------------------------------------------------------------------
  {
    id: "preterito.english-to-spanish",
    topicId: "preterito",
    title: "Translate into Spanish: 'she went', 'we did'",
    level: 2,
    guideRef: "irregular-preterites",
    generate(rng, tier) {
      const WHO: Array<[string, Person, string[]]> = [
        ["I", "yo", ["", "yo"]],
        ["He", "él", ["", "él"]],
        ["She", "él", ["", "ella"]],
        ["We", "nosotros", ["", "nosotros", "nosotras"]],
        ["They", "ellos", ["", "ellos", "ellas"]],
        ["You (tú)", "tú", ["", "tú"]],
        ["You all (vosotros)", "vosotros", ["", "vosotros", "vosotras"]],
      ];
      const TIMES: Array<[string, string]> = [
        ["yesterday", "ayer"], ["last night", "anoche"], ["last weekend", "el fin de semana pasado"],
        ["last week", "la semana pasada"], ["two days ago", "hace dos días"], ["last summer", "el verano pasado"],
      ];
      const who = rng.pick(tier === 1 ? WHO.slice(0, 3) : tier === 2 ? WHO.slice(0, 6) : WHO);
      const [whoEn, p, subj] = who;
      const act = rng.pick(actsFor(tier, (a) => a.enes !== false));
      const was = p === "yo" || p === "él" ? "was" : "were";
      const enPred = act.en.replace("{was}", was);
      const timeOn = tier === 3 || (tier === 2 && rng.bool(0.4));
      const [tEn, tEs] = timeOn ? rng.pick(TIMES) : ["", ""];
      const startTime = rng.bool();
      const en = timeOn
        ? startTime
          ? `${cap(tEn)} ${whoEn.startsWith("I") ? "I" : whoEn.charAt(0).toLowerCase() + whoEn.slice(1)} ${enPred}.`
          : `${whoEn} ${enPred} ${tEn}.`
        : `${whoEn} ${enPred}.`;
      const form = pret(act.inf, p);
      const cores = comps(act).map((c) => `${form} ${c}`);
      const accept = sentences(tEs, subj, cores);
      const canonical = cap(join(tEs, subj[0] ? subj[0] : "", form, act.es)) + ".";
      const raw: Array<[string[], string]> = [];
      raw.push([sentences(tEs, subj.slice(0, 1), [`${pres(act.inf, p)} ${act.es}`]), "That's the present tense. The English is in the past, so use the preterite."]);
      if (p === "yo") raw.push([sentences(tEs, [""], [`${pret(act.inf, "él")} ${act.es}`]), `*${pret(act.inf, "él")}* means he/she. For 'I': *${form}*.`]);
      if (p === "él") raw.push([sentences(tEs, [""], [`${pret(act.inf, "yo")} ${act.es}`]), `*${pret(act.inf, "yo")}* means 'I'. For he/she: *${form}*.`]);
      return {
        prompt: `Translate into Spanish: *${en}*`,
        answer: { type: "text", accept, display: canonical },
        solution: [
          `'${enPred.split(" ")[0]}' → *${act.inf}* in the preterite, ${PD(p)} → *${form}*.`,
          ...(tEs ? [`'${tEn}' → *${tEs}* (start or end of the sentence).`] : []),
          `**${canonical}**`,
        ],
        hint: "Find the infinitive, then the person: which preterite ending (or irregular form) do you need?",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 10 -----------------------------------------------------------------------
  {
    id: "preterito.change-person",
    topicId: "preterito",
    title: "Change the person: jugué → mi hermano jugó",
    level: 3,
    guideRef: "spelling-changes",
    generate(rng, tier) {
      const pool = actsFor(tier === 1 ? 2 : 3, (a) =>
        tier === 1 ? !IRREGULAR_INFS.has(a.inf) : tier === 2 ? !IS_REFL(a.inf) : true,
      );
      const act = rng.pick(pool);
      const from: Person = tier === 3 ? rng.pick(PERSONS) : "yo";
      let to = rng.pick(PERSONS);
      for (let i = 0; i < 10 && (to === from || pret(act.inf, to) === pret(act.inf, from)); i++) to = rng.pick(PERSONS);
      if (to === from) to = from === "yo" ? "él" : "yo";
      const time = rng.pick(PAST_STARTS);
      const fromForm = pret(act.inf, from);
      const toForm = pret(act.inf, to);
      const subj = pickSubject(rng, to);
      const fromSubj = from === "yo" ? "" : pickSubject(rng, from).show;
      const original = cap(join(time, fromSubj, fromForm, act.es)) + ".";
      const newSubjLabel = subj.show ? `*${subj.show}*` : `**${to}** (you can leave out the pronoun)`;
      const accept = sentences(time.toLowerCase(), subj.accept, [`${toForm} ${act.es}`]);
      const raw: Array<[string[], string]> = [];
      raw.push([sentences(time.toLowerCase(), subj.accept.slice(0, 1), [`${fromForm} ${act.es}`]), "You changed the subject but not the verb. The ending must match the new person."]);
      if (from === "yo" && SPELLING_INFS.has(act.inf)) {
        const yoStem = splitPron(fromForm, act.inf)[1].slice(0, -1);
        const wrong = yoStem + PRET_END.ar[to];
        raw.push([sentences(time.toLowerCase(), subj.accept.slice(0, 1), [`${wrong} ${act.es}`]), `The spelling change (*${yoStem}-*) is only for *yo*, before *é*. For other persons go back to the infinitive stem.`]);
      }
      return {
        prompt: `Rewrite the sentence with the new subject ${newSubjLabel}. Write the whole sentence.\n\n*${original}*`,
        answer: { type: "text", accept, display: cap(accept[0]) + "." },
        solution: [
          `*${fromForm}* comes from *${act.inf}*.`,
          ...pretSteps(act.inf, to).slice(-2),
          `**${cap(join(time, subj.show, toForm, act.es))}.**`,
        ],
        hint: "Go back to the infinitive first, then add the ending for the new person.",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 11 -----------------------------------------------------------------------
  {
    id: "preterito.present-to-preterite",
    topicId: "preterito",
    title: "Present → preterite: rewrite a sentence in the past",
    level: 3,
    guideRef: "three-tenses",
    generate(rng, tier) {
      const NOW = ["Normalmente", "Hoy", "Los sábados", "Cada día", "A veces"];
      const pool = actsFor(tier);
      const act = rng.pick(pool);
      let act2: Act | undefined;
      if (tier === 3 && rng.bool(0.6)) {
        const others = pool.filter((a) => a.inf !== act.inf);
        act2 = rng.pick(others);
      }
      const same = (q: Person) => pres(act.inf, q) === pret(act.inf, q) || (!!act2 && pres(act2.inf, q) === pret(act2.inf, q));
      let p: Person = tier === 1 ? rng.pick(["yo", "él", "ellos"] as const) : rng.pick(PERSONS);
      for (let i = 0; i < 10 && same(p); i++) p = rng.pick(PERSONS);
      if (same(p)) p = "yo";
      const subj = pickSubject(rng, p);
      const now = rng.pick(NOW);
      let past = rng.pick(PAST_STARTS);
      if (now === "Los sábados") past = "El sábado pasado";
      const presCore = act2
        ? `${pres(act.inf, p)} ${act.es} ${and(pres(act2.inf, p))} ${pres(act2.inf, p)} ${act2.es}`
        : `${pres(act.inf, p)} ${act.es}`;
      const pretCore = act2
        ? `${pret(act.inf, p)} ${act.es} ${and(pret(act2.inf, p))} ${pret(act2.inf, p)} ${act2.es}`
        : `${pret(act.inf, p)} ${act.es}`;
      const original = cap(join(now, subj.show, presCore)) + ".";
      const accept = sentences(past.toLowerCase(), subj.accept, [pretCore]);
      const raw: Array<[string[], string]> = [
        [sentences(past.toLowerCase(), subj.accept.slice(0, 1), [presCore]), "You changed the time phrase but not the verb. The verb must go into the preterite too."],
      ];
      if (act2) {
        raw.push([sentences(past.toLowerCase(), subj.accept.slice(0, 1), [`${pret(act.inf, p)} ${act.es} ${and(pres(act2.inf, p))} ${pres(act2.inf, p)} ${act2.es}`]), "Both verbs need to change — the second one is still in the present."]);
      }
      return {
        prompt: `Rewrite in the preterite, starting with *${past}*:\n\n*${original}*`,
        answer: { type: "text", accept, display: cap(accept[0]) + "." },
        solution: [
          `*${pres(act.inf, p)}* → infinitive *${act.inf}* → preterite ${PD(p)}: *${pret(act.inf, p)}*.`,
          ...(act2 ? [`*${pres(act2.inf, p)}* → *${act2.inf}* → *${pret(act2.inf, p)}*.`] : []),
          `Swap *${now}* for *${past}*.`,
          `**${cap(join(past, subj.show, pretCore))}.**`,
        ],
        hint: "Find each verb, work out its infinitive and person, then use the preterite ending (or irregular form).",
        traps: mkTraps(accept, raw),
      };
    },
  },

  // 12 -----------------------------------------------------------------------
  {
    id: "preterito.three-time-frames",
    topicId: "preterito",
    title: "Ayer, hoy, mañana: pick the right tense",
    level: 3,
    guideRef: "three-tenses",
    generate(rng, tier) {
      const TIME: Record<Tense, string[]> = {
        preterite: ["Ayer", "Anoche", "El sábado pasado", "La semana pasada", "Hace dos días"],
        present: ["Normalmente", "Hoy", "Los sábados", "Cada día", "A veces"],
        "near-future": ["Mañana", "El sábado que viene", "La semana que viene", "El año que viene"],
      };
      const tense = rng.pick(["preterite", "present", "near-future", "preterite"] as const);
      const act = rng.pick(actsFor(tier));
      const p = tier === 1 ? rng.pick(["yo", "él", "ellos"] as const) : rng.pick(PERSONS);
      const subj = pickSubject(rng, p);
      const time = rng.pick(TIME[tense]);
      const forms = bareForms(act.inf, tense, p);
      const accept = uniq([
        ...forms,
        ...(subj.show ? [] : acceptedForms(act.inf, tense, p)),
        ...sentences(time.toLowerCase(), subj.accept, forms.map((f) => `${f} ${act.es}`), false),
      ]);
      const name = tense === "preterite" ? "preterite" : tense === "present" ? "present" : "near future";
      const raw: Array<[string[], string]> = (["preterite", "present", "near-future"] as const)
        .filter((t) => t !== tense)
        .map((t) => [
          [conjugate(act.inf, t, p)],
          `That's the ${t === "preterite" ? "preterite (past)" : t === "present" ? "present" : "near future"} — but *${time}* tells you to use the ${name}.`,
        ] as [string[], string]);
      return {
        prompt: `Complete with the right form of *${act.inf}* (${MEANING(act.inf)}). Let the time phrase choose the tense.\n\n*${time} ${subj.show ? subj.show : subj.label} ___ ${act.es}.*`,
        answer: { type: "text", accept },
        solution: [
          `*${time}* → ${name === "preterite" ? "past → preterite" : name === "present" ? "now / usually → present" : "future → *ir* + *a* + infinitive"}.`,
          tense === "near-future" ? `*ir* for ${PD(p)}: *${conjugate("ir", "present", p)}* + *a* + *${act.inf}*.` : `*${act.inf}*, ${PD(p)} → *${forms[0]}*.`,
          `**${cap(join(time, subj.show, forms[0], act.es))}.**`,
        ],
        hint: "Past, present or future? Decide from the time phrase first, then find the right ending.",
        traps: mkTraps(accept, raw),
      };
    },
  },
];
