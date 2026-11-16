// Procedural skill drills for topic "tareas" (Ayudar en casa — Chores).
// Every verb form comes from the tested conjugator in lib/spanish/verbs.ts.
import type { Drill, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import { conjugate, acceptedForms, PERSON_LABEL, SUBJECT_PRONOUNS, type Person } from "../spanish/verbs.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";

const TOPIC = "tareas";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function squash(s: string): string {
  return s.replace(/\s+/g, " ").trim();
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** De-duplicate (by normalised text) and tidy spaces; first entry is capitalised for display. */
function finalize(list: string[], capitalise = true): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of list) {
    const s = squash(raw);
    if (!s) continue;
    const k = normSpanish(s);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(s);
  }
  if (capitalise && out.length) out[0] = cap(out[0]);
  return out;
}

interface RawTrap {
  wrong: string[];
  feedback: string;
}

/** Build 1–2 traps, dropping any wrong string that is accepted (or differs from an accepted answer only by accents). */
function makeTraps(accept: string[], raw: RawTrap[]): Trap[] {
  const ok = new Set(accept.map((a) => stripAccents(normSpanish(a))));
  const out: Trap[] = [];
  for (const r of raw) {
    const wrong = finalize(r.wrong, false).filter((w) => !ok.has(stripAccents(normSpanish(w))));
    if (wrong.length) out.push({ spec: { type: "text", accept: wrong }, feedback: r.feedback });
    if (out.length === 2) break;
  }
  return out;
}

/** English answer variants: "make the bed" → also "to make the bed". */
function enVerbVariants(bases: string[]): string[] {
  const out: string[] = [];
  for (const b of bases) out.push(b, `to ${b}`);
  return out;
}

/** English noun variants: "bathroom" → also "the bathroom". */
function enNounVariants(bases: string[]): string[] {
  const out: string[] = [];
  for (const b of bases) out.push(b, b.startsWith("the ") ? b.slice(4) : `the ${b}`);
  return out;
}

const PRES_END: Record<"ar" | "er" | "ir", readonly string[]> = {
  ar: ["o", "as", "a", "amos", "áis", "an"],
  er: ["o", "es", "e", "emos", "éis", "en"],
  ir: ["o", "es", "e", "imos", "ís", "en"],
};
const IDX: Record<Person, number> = { yo: 0, tú: 1, él: 2, nosotros: 3, vosotros: 4, ellos: 5 };

function groupOf(verb: string): "ar" | "er" | "ir" {
  return verb.slice(-2) as "ar" | "er" | "ir";
}

const BOOT_PERSONS: readonly Person[] = ["yo", "tú", "él", "ellos"];

/** One worked step explaining a present-tense form. */
function presentStep(verb: string, p: Person): string {
  const form = conjugate(verb, "present", p);
  if (verb === "ir") return `*Ir* is irregular: *voy, vas, va, vamos, vais, van* → ${PERSON_LABEL[p]}: **${form}**.`;
  if ((verb === "hacer" || verb === "poner") && p === "yo") return `*${cap(verb)}* is irregular only in the *yo* form → **${form}**.`;
  if (verb === "tener" && p === "yo") return "*Tener* has an irregular *yo* form → **tengo**.";
  const g = groupOf(verb);
  const end = PRES_END[g][IDX[p]];
  const stem = form.slice(0, form.length - end.length);
  const orig = verb.slice(0, -2);
  const boot = stem !== orig ? ` (boot verb: *${orig}-* → *${stem}-*)` : "";
  return `Stem *${stem}-*${boot} + the *-${g}* ending for ${PERSON_LABEL[p]}: *-${end}* → **${form}**.`;
}

/** A plausible wrong present form: the stem change forgotten (boot verbs only). */
function noBootForm(verb: string, p: Person): string | null {
  if (!["regar", "fregar", "tener"].includes(verb) || !BOOT_PERSONS.includes(p)) return null;
  if (verb === "tener" && p === "yo") return "teno";
  return verb.slice(0, -2) + PRES_END[groupOf(verb)][IDX[p]];
}

// ---------------------------------------------------------------------------
// Number words (0–100)
// ---------------------------------------------------------------------------

const UNITS = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
const TEENS = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
const TWENTIES = ["veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
const TENS: Record<number, string> = { 3: "treinta", 4: "cuarenta", 5: "cincuenta", 6: "sesenta", 7: "setenta", 8: "ochenta", 9: "noventa" };

/** Spanish words for 0–100. `masc` = before a masculine noun (uno → un, veintiuno → veintiún). */
function numWord(n: number, masc = false): string {
  let w: string;
  if (n === 100) return "cien";
  if (n < 10) w = UNITS[n];
  else if (n < 20) w = TEENS[n - 10];
  else if (n < 30) w = TWENTIES[n - 20];
  else {
    const t = TENS[Math.floor(n / 10)];
    const u = n % 10;
    w = u ? `${t} y ${UNITS[u]}` : t;
  }
  if (masc) {
    if (w === "veintiuno") return "veintiún";
    if (w.endsWith("uno")) return w.slice(0, -3) + "un";
  }
  return w;
}

/** Predictable wrong number words with feedback. */
function numberTraps(n: number, masc: boolean, frame: (w: string) => string): RawTrap[] {
  const right = numWord(n, masc);
  const out: RawTrap[] = [];
  if (masc && n % 10 === 1 && n !== 11) {
    out.push({ wrong: [frame(numWord(n, false))], feedback: `Before a masculine noun (*euros*, *dólares*) *uno* shortens to *un*: **${right}**.` });
  }
  if (!masc && n === 21) {
    out.push({ wrong: [frame("veintiún")], feedback: "On its own, 21 is *veintiuno*. It only shortens to *veintiún* in front of a masculine noun (*veintiún euros*)." });
  }
  if (n > 20 && n < 30) {
    const unit = n === 21 && masc ? "un" : UNITS[n - 20];
    out.push({ wrong: [frame(`veinte y ${unit}`)], feedback: `21–29 are written as **one word**: *${right}*.` });
  }
  if (n > 30 && n < 100 && n % 10 !== 0) {
    const unit = masc && n % 10 === 1 ? "un" : UNITS[n % 10];
    out.push({ wrong: [frame(`${TENS[Math.floor(n / 10)]} ${unit}`)], feedback: `From 31 to 99 you need *y* between the tens and the units: *${right}*.` });
  }
  const tens = Math.floor(n / 10);
  if (tens === 6 || tens === 7) {
    const swapped = right.replace(tens === 6 ? "sesenta" : "setenta", tens === 6 ? "setenta" : "sesenta");
    out.push({ wrong: [frame(swapped)], feedback: "Careful: *sesenta* = 60 (from *seis*), *setenta* = 70 (from *siete*)." });
  }
  if (n === 100) out.push({ wrong: [frame("ciento"), frame("cien y")], feedback: "Exactly 100 is *cien*. *Ciento* only appears from 101 (*ciento uno*)." });
  return out;
}

function numberStep(n: number, masc: boolean): string {
  if (n === 100) return "Exactly 100 = **cien**.";
  if (n < 30 && n > 20) return `21–29 are one word: ${n} = **${numWord(n, masc)}**${[22, 23, 26].includes(n) ? " (watch the accent)" : ""}${masc && n === 21 ? " — *veintiuno* → *veintiún* before a masculine noun" : ""}.`;
  if (n >= 30 && n % 10 !== 0) return `${Math.floor(n / 10) * 10} = *${TENS[Math.floor(n / 10)]}*, then *y*, then ${n % 10} → **${numWord(n, masc)}**${masc && n % 10 === 1 ? " (*uno* → *un* before a masculine noun)" : ""}.`;
  return `${n} = **${numWord(n, masc)}**.`;
}

// ---------------------------------------------------------------------------
// Chores (verb + rest of the phrase)
// ---------------------------------------------------------------------------

interface Chore {
  verb: string;
  rest: string;
  en: string;
  s3: string;
  ing: string;
  enAlt?: string[];
  /** Other ways to say it that the conjugator can handle. */
  alt?: { verb: string; rest: string }[];
  /** Infinitive-only alternatives (verb not in the conjugator). */
  infAlt?: string[];
  core: boolean;
  /** Suitable for earning pocket money. */
  paid?: boolean;
}

const CHORES: Chore[] = [
  { verb: "hacer", rest: "la cama", en: "make the bed", s3: "makes the bed", ing: "making the bed", enAlt: ["make my bed"], core: true },
  { verb: "poner", rest: "la mesa", en: "set the table", s3: "sets the table", ing: "setting the table", enAlt: ["lay the table"], core: true },
  { verb: "quitar", rest: "la mesa", en: "clear the table", s3: "clears the table", ing: "clearing the table", infAlt: ["recoger la mesa"], core: true },
  { verb: "lavar", rest: "los platos", en: "wash the dishes", s3: "washes the dishes", ing: "washing the dishes", enAlt: ["do the washing-up", "do the washing up", "wash up", "do the dishes"], alt: [{ verb: "fregar", rest: "los platos" }], core: true },
  { verb: "pasar", rest: "la aspiradora", en: "vacuum", s3: "vacuums", ing: "vacuuming", enAlt: ["hoover", "do the hoovering", "do the vacuuming"], core: true, paid: true },
  { verb: "sacar", rest: "la basura", en: "take out the rubbish", s3: "takes out the rubbish", ing: "taking out the rubbish", enAlt: ["take the rubbish out", "take out the trash", "take out the bins"], core: true, paid: true },
  { verb: "cocinar", rest: "", en: "cook", s3: "cooks", ing: "cooking", enAlt: ["do the cooking"], core: true, paid: true },
  { verb: "planchar", rest: "", en: "iron", s3: "irons", ing: "ironing", enAlt: ["do the ironing"], core: true, paid: true },
  { verb: "pasear", rest: "al perro", en: "walk the dog", s3: "walks the dog", ing: "walking the dog", enAlt: ["take the dog for a walk"], core: true, paid: true },
  { verb: "limpiar", rest: "el cuarto de baño", en: "clean the bathroom", s3: "cleans the bathroom", ing: "cleaning the bathroom", alt: [{ verb: "limpiar", rest: "el baño" }], core: true, paid: true },
  { verb: "cortar", rest: "el césped", en: "mow the lawn", s3: "mows the lawn", ing: "mowing the lawn", enAlt: ["cut the grass", "cut the lawn", "mow the grass"], core: false, paid: true },
  { verb: "regar", rest: "las plantas", en: "water the plants", s3: "waters the plants", ing: "watering the plants", core: false, paid: true },
  { verb: "ir", rest: "de compras", en: "go shopping", s3: "goes shopping", ing: "going shopping", core: false },
  { verb: "hacer", rest: "la compra", en: "do the food shopping", s3: "does the food shopping", ing: "doing the food shopping", enAlt: ["do the shopping", "do the grocery shopping"], core: false, paid: true },
  { verb: "lavar", rest: "el coche", en: "wash the car", s3: "washes the car", ing: "washing the car", core: false, paid: true },
  { verb: "limpiar", rest: "la cocina", en: "clean the kitchen", s3: "cleans the kitchen", ing: "cleaning the kitchen", core: false, paid: true },
  { verb: "ordenar", rest: "el salón", en: "tidy the living room", s3: "tidies the living room", ing: "tidying the living room", enAlt: ["tidy up the living room", "tidy the lounge"], core: false },
  { verb: "ayudar", rest: "en casa", en: "help at home", s3: "helps at home", ing: "helping at home", enAlt: ["help around the house", "help in the house"], core: false },
];

const CORE_CHORES = CHORES.filter((c) => c.core);
const PAID_CHORES = CHORES.filter((c) => c.paid);
const IRREGULAR_CHORES = CHORES.filter((c) => ["hacer", "poner", "regar", "ir"].includes(c.verb) || c.alt?.some((a) => a.verb === "fregar"));
const REGULAR_CORE = CORE_CHORES.filter((c) => !["hacer", "poner"].includes(c.verb));

function versions(c: Chore): { verb: string; rest: string }[] {
  return [{ verb: c.verb, rest: c.rest }, ...(c.alt ?? [])];
}

function inf(c: Chore): string {
  return squash(`${c.verb} ${c.rest}`);
}

function infAll(c: Chore): string[] {
  return [...versions(c).map((v) => squash(`${v.verb} ${v.rest}`)), ...(c.infAlt ?? [])];
}

/** Present-tense chore phrases for a person (all accepted versions). */
function presAll(c: Chore, p: Person): string[] {
  return versions(c).map((v) => squash(`${conjugate(v.verb, "present", p)} ${v.rest}`));
}

function pres(c: Chore, p: Person): string {
  return squash(`${conjugate(c.verb, "present", p)} ${c.rest}`);
}

function nearFutAll(c: Chore, p: Person): string[] {
  return versions(c).map((v) => squash(`${conjugate(v.verb, "near-future", p)} ${v.rest}`));
}

// ---------------------------------------------------------------------------
// Subjects
// ---------------------------------------------------------------------------

interface Subj {
  es: string;
  en: string;
  p: Person;
  /** A subject pronoun that may be left out in Spanish. */
  pron: boolean;
}

const PRON_SUBJ: Subj[] = [
  { es: "yo", en: "I", p: "yo", pron: true },
  { es: "tú", en: "you (*tú*)", p: "tú", pron: true },
  { es: "él", en: "he", p: "él", pron: true },
  { es: "ella", en: "she", p: "él", pron: true },
  { es: "nosotros", en: "we", p: "nosotros", pron: true },
  { es: "vosotros", en: "you all (*vosotros*)", p: "vosotros", pron: true },
  { es: "ellos", en: "they", p: "ellos", pron: true },
];

const NOUN_SUBJ: Subj[] = [
  { es: "mi hermano", en: "my brother", p: "él", pron: false },
  { es: "mi hermana", en: "my sister", p: "él", pron: false },
  { es: "mi madre", en: "my mum", p: "él", pron: false },
  { es: "mi padre", en: "my dad", p: "él", pron: false },
  { es: "Lucía", en: "Lucía", p: "él", pron: false },
  { es: "Diego", en: "Diego", p: "él", pron: false },
  { es: "mi hermana y yo", en: "my sister and I", p: "nosotros", pron: false },
  { es: "mi padre y yo", en: "my dad and I", p: "nosotros", pron: false },
  { es: "Pablo y tú", en: "Pablo and you", p: "vosotros", pron: false },
  { es: "Sofía y tú", en: "Sofía and you", p: "vosotros", pron: false },
  { es: "mis padres", en: "my parents", p: "ellos", pron: false },
  { es: "mis abuelos", en: "my grandparents", p: "ellos", pron: false },
  { es: "Carmen y Javier", en: "Carmen and Javier", p: "ellos", pron: false },
];

const ALL_SUBJ = [...PRON_SUBJ, ...NOUN_SUBJ];
const NOUN_3RD = NOUN_SUBJ.filter((s) => s.p === "él" || s.p === "ellos");

/** Pronouns a learner may type for this subject (never usted/ustedes). */
function pronounsFor(s: Subj): string[] {
  if (s.es === "él" || s.es === "ella") return [s.es];
  return SUBJECT_PRONOUNS[s.p].filter((x) => x !== "usted" && x !== "ustedes");
}

/** Sentence cores with the subject: pronoun optional, nouns required. */
function withSubj(s: Subj, cores: string[]): string[] {
  const out: string[] = [];
  for (const c of cores) {
    if (s.pron) {
      out.push(c);
      for (const pr of pronounsFor(s)) out.push(`${pr} ${c}`);
    } else out.push(`${s.es} ${c}`);
  }
  return out;
}

/** Put a time/frequency phrase at the start or the end. */
function withTime(sentences: string[], times: string[]): string[] {
  const out: string[] = [];
  for (const t of times) for (const s of sentences) out.push(`${t} ${s}`, `${s} ${t}`);
  return out;
}

/** How the subject appears inside a gap-fill: "(Yo)" or "Mis padres". */
function subjShown(s: Subj, start: boolean): string {
  if (s.pron) return start ? `(${cap(s.es)})` : `(${s.es})`;
  return start ? cap(s.es) : s.es;
}

const isThird = (s: Subj) => s.p === "él";
const enHave = (s: Subj) => (isThird(s) ? "has" : "have");
const enDont = (s: Subj) => (isThird(s) ? "doesn't" : "don't");
const enBeNeg = (s: Subj) => (s.p === "yo" ? "am not" : isThird(s) ? "isn't" : "aren't");
const enPres = (s: Subj, c: Chore) => (isThird(s) ? c.s3 : c.en);

function verbAccept(verb: string, tense: "present" | "near-future", s: Subj): string[] {
  const form = conjugate(verb, tense, s.p);
  return s.pron ? [form, ...pronounsFor(s).map((pr) => `${pr} ${form}`)] : [form];
}

// ---------------------------------------------------------------------------
// Frequency and time phrases
// ---------------------------------------------------------------------------

interface Freq {
  es: string[];
  en: string[];
  /** Adverb that can sit before the verb (English mid position). */
  adv: boolean;
}

const FREQS: Freq[] = [
  { es: ["siempre"], en: ["always"], adv: true },
  { es: ["normalmente"], en: ["normally", "usually"], adv: true },
  { es: ["a menudo"], en: ["often"], adv: true },
  { es: ["a veces"], en: ["sometimes"], adv: true },
  { es: ["nunca"], en: ["never"], adv: true },
  { es: ["de vez en cuando"], en: ["from time to time", "now and then", "occasionally", "every now and then"], adv: false },
  { es: ["cada día", "todos los días"], en: ["every day", "each day"], adv: false },
  { es: ["una vez a la semana", "una vez por semana"], en: ["once a week"], adv: false },
  { es: ["dos veces a la semana", "dos veces por semana"], en: ["twice a week", "two times a week"], adv: false },
  { es: ["tres veces a la semana", "tres veces por semana"], en: ["three times a week"], adv: false },
  { es: ["los fines de semana", "todos los fines de semana"], en: ["at weekends", "at the weekend", "on weekends", "on the weekend"], adv: false },
  { es: ["los sábados", "todos los sábados"], en: ["on Saturdays", "every Saturday"], adv: false },
  { es: ["los domingos", "todos los domingos"], en: ["on Sundays", "every Sunday"], adv: false },
];
const END_FREQS = FREQS.filter((f) => !f.adv);
const NUNCA = FREQS[4];

/** Sentence variants for subject + present core + frequency phrase. */
function freqSentences(s: Subj, cores: string[], f: Freq): string[] {
  const out: string[] = [];
  if (f === NUNCA) {
    out.push(...withSubj(s, cores.map((c) => `nunca ${c}`)));
    out.push(...withSubj(s, cores.map((c) => `no ${c} nunca`)));
    return out;
  }
  out.push(...withTime(withSubj(s, cores), f.es));
  if (f.adv) for (const e of f.es) out.push(...withSubj(s, cores.map((c) => `${e} ${c}`)));
  return out;
}

const FUT_TIMES: { es: string[]; en: string }[] = [
  { es: ["este fin de semana"], en: "this weekend" },
  { es: ["mañana"], en: "tomorrow" },
  { es: ["el sábado"], en: "on Saturday" },
  { es: ["el domingo"], en: "on Sunday" },
  { es: ["esta tarde"], en: "this afternoon" },
  { es: ["la semana que viene", "la próxima semana"], en: "next week" },
  { es: ["pasado mañana"], en: "the day after tomorrow" },
];

const PRES_TIMES = ["normalmente", "cada día", "los sábados", "a veces", "todos los días", "los fines de semana", "siempre", "a menudo"];

// ---------------------------------------------------------------------------
// Vocabulary pairs for es → en
// ---------------------------------------------------------------------------

interface VocabPair {
  es: string;
  en: string[];
  trap?: RawTrap;
}

function choreToPair(c: Chore): VocabPair {
  const pair: VocabPair = { es: inf(c), en: enVerbVariants([c.en, ...(c.enAlt ?? [])]) };
  const t: Record<string, RawTrap> = {
    "poner la mesa": { wrong: enVerbVariants(["clear the table"]), feedback: "*Poner* = to put: you *put* things on the table, so *poner la mesa* = to set the table." },
    "quitar la mesa": { wrong: enVerbVariants(["set the table", "lay the table"]), feedback: "*Quitar* = to remove: *quitar la mesa* = to clear the table. Setting it is *poner la mesa*." },
    "hacer la compra": { wrong: enVerbVariants(["go shopping"]), feedback: "*Ir de compras* is going shopping (clothes, fun). *Hacer la compra* is the food shopping." },
    "ir de compras": { wrong: enVerbVariants(["do the food shopping", "do the shopping"]), feedback: "*Hacer la compra* is the food shopping. *Ir de compras* = to go shopping (clothes, presents, fun)." },
    "pasar la aspiradora": { wrong: enVerbVariants(["pass the vacuum cleaner", "pass the hoover"]), feedback: "Here *pasar* means to run something over a surface — *pasar la aspiradora* = to vacuum / hoover." },
  };
  if (t[pair.es]) pair.trap = t[pair.es];
  return pair;
}

const EXTRA_VERB_PAIRS: VocabPair[] = [
  { es: "ordenar mi cuarto", en: enVerbVariants(["tidy my room", "tidy my bedroom", "tidy up my room"]) },
  { es: "limpiar mi dormitorio", en: enVerbVariants(["clean my bedroom", "clean my room"]) },
  { es: "cuidar a mi hermano", en: enVerbVariants(["look after my brother", "take care of my brother", "babysit my brother"]) },
  { es: "fregar los platos", en: enVerbVariants(["wash the dishes", "wash up", "do the washing-up", "do the washing up", "do the dishes"]) },
];

const NOUN_PAIRS: VocabPair[] = [
  { es: "las tareas de casa", en: enNounVariants(["household chores", "chores", "housework", "house chores", "jobs around the house"]) },
  { es: "la aspiradora", en: enNounVariants(["vacuum cleaner", "hoover", "vacuum"]) },
  { es: "la paga", en: enNounVariants(["pocket money", "allowance"]), trap: { wrong: enNounVariants(["pay"]), feedback: "For a teenager, *la paga* is pocket money (Latin America: *la mesada*)." } },
  { es: "el césped", en: enNounVariants(["lawn", "grass"]) },
  { es: "la basura", en: enNounVariants(["rubbish", "trash", "garbage"]) },
  { es: "el cuarto de baño", en: enNounVariants(["bathroom"]) },
  { es: "el salón", en: enNounVariants(["living room", "lounge", "sitting room"]), trap: { wrong: enNounVariants(["salon"]), feedback: "False friend! *El salón* is the living room, not a hair salon." } },
  { es: "el comedor", en: enNounVariants(["dining room"]) },
  { es: "el dinero", en: enNounVariants(["money"]) },
  { es: "la cocina", en: enNounVariants(["kitchen", "cooking"]) },
];

// ---------------------------------------------------------------------------
// The drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 -----------------------------------------------------------------------
  {
    id: "tareas.chores-es-en",
    topicId: TOPIC,
    title: "Chores vocabulary: Spanish → English",
    level: 1,
    guideRef: "chores-vocab",
    generate(rng: Rng, tier) {
      const pool =
        tier === 1
          ? CORE_CHORES.map(choreToPair)
          : tier === 2
            ? [...CHORES.map(choreToPair), ...EXTRA_VERB_PAIRS]
            : [...CHORES.filter((c) => !c.core).map(choreToPair), ...EXTRA_VERB_PAIRS, ...NOUN_PAIRS];
      const item = rng.pick(pool);
      const frame = rng.pick(["What does *{x}* mean in English?", "Translate into English: *{x}*", "Give the English for *{x}*."]);
      const accept = finalize(item.en);
      const isNoun = /^(el|la|los|las) /.test(item.es) && !item.es.includes(" de compras");
      return {
        prompt: frame.replace("{x}", item.es),
        answer: { type: "text", accept },
        solution: [
          isNoun ? `*${item.es}* is a noun phrase — keep 'the' or leave it out.` : `*${item.es.split(" ")[0]}* is the verb (infinitive); the rest is what you do it to.`,
          `*${item.es}* = **${accept[0]}**.`,
        ],
        hint: isNoun ? "Look for a cognate or think where in the house you'd find it." : "Find the infinitive first (the -ar / -er / -ir word), then add the object.",
        traps: item.trap ? makeTraps(accept, [item.trap]) : undefined,
      };
    },
  },

  // 2 -----------------------------------------------------------------------
  {
    id: "tareas.chores-en-es",
    topicId: TOPIC,
    title: "Chores vocabulary: English → Spanish",
    level: 1,
    guideRef: "chores-vocab",
    generate(rng, tier) {
      const c = rng.pick(tier === 1 ? CORE_CHORES : CHORES);
      if (tier === 1) {
        const frame = rng.pick(['Write in Spanish: "to {x}".', 'How do you say "to {x}" in Spanish?', 'Translate into Spanish (infinitive): "to {x}".']);
        const accept = finalize(infAll(c), false);
        return {
          prompt: frame.replace("{x}", c.en),
          answer: { type: "text", accept },
          solution: [`The verb stays in the infinitive: *${c.verb}*.`, `Add the rest of the chunk → **${accept[0]}**.`],
          hint: "Chores are verb + noun chunks. Which verb goes with this noun?",
          traps: makeTraps(accept, choreTraps(c, null)),
        };
      }
      const s: Subj = tier === 2 ? PRON_SUBJ[0] : rng.pick([PRON_SUBJ[0], ...NOUN_SUBJ]);
      const accept = finalize(withSubj(s, presAll(c, s.p)));
      return {
        prompt: `Translate into Spanish: "${cap(s.en)} ${enPres(s, c)}."`,
        answer: { type: "text", accept },
        solution: [
          `Chunk: *${inf(c)}*.`,
          presentStep(c.verb, s.p),
          `→ **${accept[0]}.**`,
        ],
        hint: s.p === "yo" ? "Start from the infinitive and give it the *yo* ending. Watch out for *hago* and *pongo*." : "Who is doing it? Pick the ending for that person.",
        traps: makeTraps(accept, choreTraps(c, s)),
      };
    },
  },

  // 3 -----------------------------------------------------------------------
  {
    id: "tareas.present-chore-verbs",
    topicId: TOPIC,
    title: "Chore verbs in the present: hago, pongo, friego…",
    level: 2,
    guideRef: "chores-vocab",
    generate(rng, tier) {
      let c: Chore;
      let v: { verb: string; rest: string };
      if (tier === 1) {
        c = rng.pick(REGULAR_CORE);
        v = { verb: c.verb, rest: c.rest };
      } else {
        c = tier === 3 && rng.bool(0.7) ? rng.pick(IRREGULAR_CHORES) : rng.pick(CHORES);
        const vs = versions(c);
        v = vs.length > 1 && rng.bool(0.6) ? vs[1] : vs[0];
      }
      const s = tier === 1 ? rng.pick(PRON_SUBJ) : tier === 2 ? rng.pick(ALL_SUBJ) : rng.pick(NOUN_SUBJ.concat(PRON_SUBJ.slice(0, 1)));
      const tail = rng.pick(["", "cada día", "los sábados", "a veces", "los fines de semana", "dos veces a la semana", "normalmente"]);
      const form = conjugate(v.verb, "present", s.p);
      const accept = finalize(verbAccept(v.verb, "present", s), false);
      const raw: RawTrap[] = [];
      const nb = noBootForm(v.verb, s.p);
      if (nb) raw.push({ wrong: [nb], feedback: `*${cap(v.verb)}* is a boot verb (e→ie): **${form}**. Only *nosotros* and *vosotros* keep *e*.` });
      if ((v.verb === "hacer" || v.verb === "poner") && s.p === "yo") raw.push({ wrong: [v.verb === "hacer" ? "haco" : "pono", conjugate(v.verb, "present", "él")], feedback: `The *yo* form of *${v.verb}* is irregular: **${form}**.` });
      if (s.p !== "yo") raw.push({ wrong: [conjugate(v.verb, "present", "yo")], feedback: `That's the *yo* form. The subject is *${s.es}* — ${PERSON_LABEL[s.p]}.` });
      raw.push({ wrong: [v.verb], feedback: "That's the infinitive — conjugate it to match the subject." });
      return {
        prompt: `Complete with the present tense of *${v.verb}*: *${squash(`${subjShown(s, true)} ___ ${v.rest} ${tail}`)}.*`,
        answer: { type: "text", accept },
        solution: [`Subject *${s.es}* → ${PERSON_LABEL[s.p]}.`, presentStep(v.verb, s.p)],
        hint: v.verb === "ir" ? "*Ir* is completely irregular: *voy, vas, va…*" : "Who is doing the chore? Chop off -ar/-er/-ir and add that person's ending.",
        traps: makeTraps(accept, raw),
      };
    },
  },

  // 4 -----------------------------------------------------------------------
  {
    id: "tareas.tener-que",
    topicId: TOPIC,
    title: "Tener que + infinitive for any person",
    level: 2,
    guideRef: "obligation",
    generate(rng, tier) {
      const c = rng.pick(tier === 1 ? CORE_CHORES : CHORES);
      const s =
        tier === 1
          ? rng.pick(PRON_SUBJ.filter((x) => ["yo", "tú", "él"].includes(x.p)))
          : tier === 2
            ? rng.pick(ALL_SUBJ)
            : rng.pick(NOUN_SUBJ.concat(PRON_SUBJ));
      const neg = tier === 3 && rng.bool(0.4);
      const question = tier === 3 && !neg && rng.bool(0.3);
      const t = conjugate("tener", "present", s.p);
      let prompt: string;
      let accept: string[];
      if (question) {
        // ¿Qué ___ hacer en casa? — question frame with a pronoun subject.
        const qs = rng.pick(PRON_SUBJ.filter((x) => x.es !== "ella" && x.es !== "ellos"));
        const tq = conjugate("tener", "present", qs.p);
        const shown = qs.es === "él" ? "él" : qs.es;
        accept = finalize([`${tq} que`], false);
        prompt = `Complete the question with the right form of *tener que* (subject: *${shown}*): *¿Qué ___ hacer en casa?*`;
        return {
          prompt,
          answer: { type: "text", accept },
          solution: [`Subject *${shown}* → ${PERSON_LABEL[qs.p]}.`, presentStep("tener", qs.p), `Add *que*: *¿Qué **${tq} que** hacer en casa?*`],
          hint: "Two words: the right part of *tener* + *que*.",
          traps: makeTraps(accept, tenerTraps(qs.p)),
        };
      }
      accept = finalize(s.pron ? [`${t} que`, ...pronounsFor(s).map((p) => `${p} ${t} que`)] : [`${t} que`], false);
      const neg_ = neg ? "no " : "";
      prompt = `Complete with the right form of *tener que* (two words): *${subjShown(s, true)} ${neg_}___ ${inf(c)}.*`;
      return {
        prompt,
        answer: { type: "text", accept },
        solution: [
          `Subject *${s.es}* → ${PERSON_LABEL[s.p]}.`,
          s.p === "yo" ? "*Tener* has an irregular *yo* form: **tengo**." : `*Tener* is a boot verb (e→ie in *tienes, tiene, tienen*): **${t}**.`,
          `Add *que* and keep the chore in the infinitive: *${neg_}**${t} que** ${inf(c)}*${neg ? " (*no tener que* = not have to — no need)" : ""}.`,
        ],
        hint: "*Tener* changes, the chore doesn't. Which form of *tener* goes with this subject?",
        traps: makeTraps(accept, tenerTraps(s.p)),
      };
    },
  },

  // 5 -----------------------------------------------------------------------
  {
    id: "tareas.hay-que-deber",
    topicId: TOPIC,
    title: "Deber + infinitive and hay que (general rules)",
    level: 2,
    guideRef: "obligation",
    generate(rng, tier) {
      const c = rng.pick(tier === 1 ? CORE_CHORES : CHORES);
      const kind = tier === 1 ? "deber" : rng.pick(tier === 2 ? ["deber", "rewrite", "deber"] : ["rewrite", "translate", "deber"]);
      if (kind === "deber") {
        const subs: Subj[] = tier === 1 ? PRON_SUBJ : [...ALL_SUBJ, { es: "todos", en: "everyone", p: "ellos", pron: false }];
        const s = rng.pick(subs);
        const form = conjugate("deber", "present", s.p);
        const accept = finalize(verbAccept("deber", "present", s), false);
        return {
          prompt: `Complete with the present tense of *deber* (must / should): *${subjShown(s, true)} ___ ${inf(c)}.*`,
          answer: { type: "text", accept },
          solution: [`*Deber* is a regular *-er* verb: *debo, debes, debe, debemos, debéis, deben*.`, `Subject *${s.es}* → ${PERSON_LABEL[s.p]} → **${form}**.`, `Then straight to the infinitive: *${form} ${inf(c)}*.`],
          hint: "Regular -er endings: -o, -es, -e, -emos, -éis, -en.",
          traps: makeTraps(accept, [
            { wrong: verbAccept("deber", "present", s).map((f) => `${f} que`), feedback: "*Deber* goes straight to the infinitive — no *que*. Only *tener que* and *hay que* have *que*." },
            ...(s.p !== "yo" ? [{ wrong: ["debo"], feedback: `*Debo* is 'I must'. The subject is *${s.es}*.` }] : []),
          ]),
        };
      }
      const right = finalize(infAll(c).map((i) => `hay que ${i}`));
      if (kind === "rewrite") {
        const s = rng.pick(ALL_SUBJ);
        const shown = s.pron ? squash(`${cap(s.es)} ${conjugate("tener", "present", s.p)} que ${inf(c)}`) : `${cap(s.es)} ${conjugate("tener", "present", s.p)} que ${inf(c)}`;
        return {
          prompt: `Rewrite as a general rule (it applies to everyone) using *hay que*: *${shown}.*`,
          answer: { type: "text", accept: right },
          solution: ["*Hay que* + infinitive = 'one has to / you have to' in general.", "Drop the subject and *tener* completely — *hay* never changes.", `→ **${right[0]}.**`],
          hint: "*Hay que* has no subject, so who does the chore doesn't matter any more.",
          traps: makeTraps(right, [
            { wrong: infAll(c).map((i) => `hay ${i}`), feedback: "Don't drop *que*: *hay **que** + infinitive*." },
            { wrong: presAll(c, s.p).map((p) => `hay que ${p}`), feedback: "Keep the chore in the infinitive after *hay que*." },
          ]),
        };
      }
      // translate
      const where = rng.pick([
        { en: "In my house", es: "en mi casa" },
        { en: "At home", es: "en casa" },
        { en: "Every day", es: "cada día" },
        { en: "At weekends", es: "los fines de semana" },
      ]);
      const accept = finalize(withTime(infAll(c).map((i) => `hay que ${i}`), [where.es]));
      return {
        prompt: `Translate into Spanish using *hay que* (a general rule): "${where.en}, you have to ${c.en}."`,
        answer: { type: "text", accept },
        solution: [`'You have to' as a general rule = *hay que* + infinitive.`, `${where.en} = *${where.es}* (start or end).`, `→ **${accept[0]}.**`],
        hint: "General 'you' (meaning everyone) → *hay que*, which never changes.",
        traps: makeTraps(accept, [
          { wrong: withTime(infAll(c).map((i) => `tienes que ${i}`), [where.es]), feedback: "*Tienes que* is 'you (personally) have to'. For a rule for everyone, use *hay que*." },
          { wrong: withTime(infAll(c).map((i) => `hay ${i}`), [where.es]), feedback: "Don't drop *que*: *hay **que** + infinitive*." },
        ]),
      };
    },
  },

  // 6 -----------------------------------------------------------------------
  {
    id: "tareas.frequency",
    topicId: TOPIC,
    title: "How often? Frequency phrases",
    level: 1,
    guideRef: "frequency-and-pocket-money",
    generate(rng, tier) {
      const f = rng.pick(FREQS);
      if (tier === 1) {
        if (rng.bool()) {
          const accept = finalize(f.en, false);
          const raw: RawTrap[] = [];
          if (f.es[0] === "a veces") raw.push({ wrong: ["often"], feedback: "*A menudo* = often; *a veces* = sometimes." });
          if (f.es[0] === "a menudo") raw.push({ wrong: ["sometimes"], feedback: "*A veces* = sometimes; *a menudo* = often." });
          return {
            prompt: `What does *${f.es[0]}* mean in English?`,
            answer: { type: "text", accept },
            solution: [`*${f.es[0]}* = **${accept[0]}**.`],
            hint: "Picture the frequency scale from *nunca* to *siempre*.",
            traps: makeTraps(accept, raw),
          };
        }
        const accept = finalize(f.es, false);
        const raw: RawTrap[] = [];
        if (f.es[0].startsWith("dos") || f.es[0].startsWith("tres")) raw.push({ wrong: [f.es[0].replace("veces", "vez")], feedback: "The plural of *vez* is *veces* (z → c before e)." });
        if (f.es[0] === "una vez a la semana") raw.push({ wrong: ["una vez en la semana", "un vez a la semana"], feedback: "Say *una vez a la semana* (*vez* is feminine; 'a week' = *a la semana*)." });
        return {
          prompt: `How do you say "${f.en[0]}" in Spanish?`,
          answer: { type: "text", accept },
          solution: [`"${f.en[0]}" = **${accept[0]}**.`],
          hint: "It's one of the frequency phrases on the *nunca* → *siempre* scale.",
          traps: makeTraps(accept, raw),
        };
      }
      const c = rng.pick(CHORES.filter((x) => x.verb !== "ir"));
      const s = tier === 2 ? PRON_SUBJ[0] : rng.pick(NOUN_3RD);
      const ff = tier === 3 && rng.bool(0.35) ? NUNCA : f;
      const accept = finalize(freqSentences(s, presAll(c, s.p), ff));
      const enVerb = enPres(s, c);
      const english = ff.adv ? `${cap(s.en)} ${ff.en[0]} ${enVerb}.` : `${cap(s.en)} ${enVerb} ${ff.en[0]}.`;
      const raw: RawTrap[] = [];
      if (ff === NUNCA) {
        raw.push({ wrong: withSubj(s, presAll(c, s.p).map((p) => `nunca no ${p}`)), feedback: "With *nunca* in front of the verb you don't need *no*: *nunca …*." });
        raw.push({ wrong: withSubj(s, presAll(c, s.p).map((p) => `${p} nunca`)), feedback: "If *nunca* goes after the verb, put *no* in front: *no … nunca*." });
      }
      raw.push({ wrong: withTime(withSubj(s, infAll(c)), ff.es), feedback: "Conjugate the verb — the infinitive alone doesn't say who does the chore." });
      return {
        prompt: `Translate into Spanish: "${english}"`,
        answer: { type: "text", accept },
        solution: [
          presentStep(c.verb, s.p),
          ff === NUNCA ? "*Nunca* goes before the verb — or after it with *no* in front: *no … nunca*." : `"${ff.en[0]}" = *${ff.es[0]}*: put it at the start or the end${ff.adv ? " (or just before the verb)" : ""}.`,
          `→ **${accept[0]}.**`,
        ],
        hint: "Build the chore sentence first, then slot the frequency phrase at the start or the end.",
        traps: makeTraps(accept, raw),
      };
    },
  },

  // 7 -----------------------------------------------------------------------
  {
    id: "tareas.pocket-money-numbers",
    topicId: TOPIC,
    title: "Pocket money: numbers 20–100 in words",
    level: 2,
    guideRef: "frequency-and-pocket-money",
    generate(rng, tier) {
      const tricky = [21, 22, 23, 26, 31, 41, 51, 61, 71, 81, 91, 60, 70, 100, 66, 76];
      const pickN = () => (rng.bool(0.45) ? rng.pick(tricky) : rng.int(20, 100));
      const cur = rng.pick([
        { es: "euros", en: "euros" },
        { es: "dólares", en: "dollars" },
      ]);
      if (tier === 1) {
        const n = pickN();
        const w = numWord(n);
        const accept = [w];
        return {
          prompt: rng.pick([`Write the number **${n}** in Spanish words.`, `How do you write ${n} in Spanish? (Use words, not digits.)`]),
          answer: { type: "text", accept },
          solution: [numberStep(n, false)],
          hint: n > 20 && n < 30 ? "21–29 are one word starting *veinti-*." : n === 100 ? "Exactly a hundred has a short form." : "Tens end in *-enta* (except *veinte* and *treinta*); then *y* + the units.",
          traps: makeTraps(accept, numberTraps(n, false, (x) => x)),
        };
      }
      if (tier === 2) {
        const n = pickN();
        const w = `${numWord(n, true)} ${cur.es}`;
        const accept = [w];
        return {
          prompt: `Write the amount in Spanish, with the number in words: **${n} ${cur.en}**`,
          answer: { type: "text", accept },
          solution: [numberStep(n, true), `*${cur.es}* is masculine plural${cur.es === "dólares" ? " (accent on *dó-*)" : ""} → **${w}**.`],
          hint: n % 10 === 1 && n !== 11 ? "Ends in 1 and *euros/dólares* are masculine — what happens to *uno*?" : "Say the tens, then *y*, then the units — and add the currency.",
          traps: makeTraps(accept, numberTraps(n, true, (x) => `${x} ${cur.es}`)),
        };
      }
      const kind = rng.pick(["earn", "month", "translate", "translate"]);
      if (kind === "earn") {
        let p = 5, k = 4;
        for (let i = 0; i < 50; i++) {
          p = rng.int(3, 15);
          k = rng.int(2, 7);
          if (p * k >= 20 && p * k <= 100) break;
        }
        const total = p * k;
        const c = rng.pick(PAID_CHORES);
        const yo = pres(c, "yo");
        const w = `${numWord(total, true)} ${cur.es}`;
        return {
          prompt: `Read: *Gano ${numWord(p, true)} ${cur.es} cada vez que ${yo}. ${cap(yo)} ${numWord(k)} veces a la semana.* How much do you earn a week? Write the amount in Spanish words, with *${cur.es}*.`,
          answer: { type: "text", accept: [w] },
          solution: [`*${numWord(p, true)}* = ${p}, *${numWord(k)} veces a la semana* = ${k} times a week.`, `${p} × ${k} = ${total}.`, numberStep(total, true), `→ **${w}**.`],
          hint: "Find the two numbers in the Spanish, multiply, then turn the answer back into words.",
          traps: makeTraps([w], numberTraps(total, true, (x) => `${x} ${cur.es}`)),
        };
      }
      if (kind === "month") {
        const wk = rng.int(5, 25);
        const total = wk * 4;
        const w = `${numWord(total, true)} ${cur.es}`;
        return {
          prompt: `Read: *Recibo ${numWord(wk, true)} ${cur.es} a la semana.* How much is that in 4 weeks? Write the amount in Spanish words, with *${cur.es}*.`,
          answer: { type: "text", accept: [w] },
          solution: [`*${numWord(wk, true)}* = ${wk}.`, `${wk} × 4 = ${total}.`, numberStep(total, true), `→ **${w}**.`],
          hint: "Work out the number first, then write it in Spanish words.",
          traps: makeTraps([w], numberTraps(total, true, (x) => `${x} ${cur.es}`)),
        };
      }
      const n = pickN();
      const amount = `${numWord(n, true)} ${cur.es}`;
      const frame = rng.pick([
        { en: `My parents give me ${n} ${cur.en} a month.`, es: (a: string) => [`mis padres me dan ${a} al mes`, `mis padres me dan ${a} cada mes`, `cada mes mis padres me dan ${a}`, `al mes mis padres me dan ${a}`], wrongVerb: (a: string) => [`mis padres dan me ${a} al mes`, `mis padres me dan ${a} a la mes`] },
        { en: `I get ${n} ${cur.en} a week.`, es: (a: string) => withSubj(PRON_SUBJ[0], [`recibo ${a} a la semana`, `recibo ${a} cada semana`, `recibo ${a} por semana`]), wrongVerb: (a: string) => [`recibo ${a} a semana`] },
        { en: `My mum gives me ${n} ${cur.en} a week.`, es: (a: string) => [`mi madre me da ${a} a la semana`, `mi madre me da ${a} cada semana`, `mi madre me da ${a} por semana`, `cada semana mi madre me da ${a}`], wrongVerb: (a: string) => [`mi madre me dan ${a} a la semana`] },
        { en: `I earn ${n} ${cur.en} a month.`, es: (a: string) => withSubj(PRON_SUBJ[0], [`gano ${a} al mes`, `gano ${a} cada mes`, `gano ${a} por mes`]), wrongVerb: (a: string) => [`gano ${a} a la mes`] },
      ]);
      const accept = finalize(frame.es(amount));
      return {
        prompt: `Translate into Spanish (write the number in words): "${frame.en}"`,
        answer: { type: "text", accept },
        solution: [numberStep(n, true), `Pocket-money chunk: *me dan / me da* = give(s) me, *a la semana* = a week, *al mes* = a month.`, `→ **${accept[0]}.**`],
        hint: "Build the chunk (who gives / gets, how often), then slot in the number in words.",
        traps: makeTraps(accept, [
          ...numberTraps(n, true, (x) => `${x} ${cur.es}`).map((t) => ({ wrong: frame.es(t.wrong[0]), feedback: t.feedback })),
          { wrong: frame.wrongVerb(amount), feedback: "Check the chunk: *me dan* (they give me), *me da* (she gives me), *a la semana*, *al mes*." },
        ]),
      };
    },
  },

  // 8 -----------------------------------------------------------------------
  {
    id: "tareas.opinions",
    topicId: TOPIC,
    title: "Opinions on chores: odio planchar, es injusto",
    level: 2,
    guideRef: "opinions-on-chores",
    generate(rng, tier) {
      const kind = tier === 1 ? "meaning" : tier === 2 ? rng.pick(["verb", "adj", "verb"]) : rng.pick(["adj", "compare", "two", "verb"]);
      if (kind === "meaning") {
        const ops: VocabPair[] = [
          { es: "es justo", en: ["it's fair", "it is fair"] },
          { es: "es injusto", en: ["it's unfair", "it is unfair", "it's not fair", "it isn't fair"] },
          { es: "es un rollo", en: ["it's a pain", "it is a pain", "it's a drag", "it is a drag", "it's boring", "it is boring"] },
          { es: "es aburrido", en: ["it's boring", "it is boring"] },
          { es: "es útil", en: ["it's useful", "it is useful"] },
          { es: "es asqueroso", en: ["it's disgusting", "it is disgusting", "it's gross", "it is gross"] },
          { es: "no me importa", en: ["I don't mind", "I do not mind", "I don't care", "it doesn't matter to me"], trap: { wrong: ["it's not important", "it is not important"], feedback: "*No me importa* = I don't mind (literally 'it doesn't matter to me')." } },
          { es: "me da igual", en: ["I don't mind", "I do not mind", "it's all the same to me", "I don't care"] },
          { es: "pienso que", en: ["I think that", "I think"] },
          { es: "creo que", en: ["I think that", "I think", "I believe that", "I believe"] },
          { es: "odio planchar", en: ["I hate ironing", "I hate to iron", "I hate doing the ironing"] },
          { es: "mi hermano no hace nada", en: ["my brother doesn't do anything", "my brother does nothing", "my brother does not do anything"], trap: { wrong: ["my brother doesn't do nothing"], feedback: "Spanish needs the double negative *no … nada*, but English uses just one: 'doesn't do anything' / 'does nothing'." } },
          { es: "mi hermana hace más que yo", en: ["my sister does more than me", "my sister does more than I do", "my sister does more than I"] },
          { es: "es fácil", en: ["it's easy", "it is easy"] },
          { es: "es importante", en: ["it's important", "it is important"] },
        ];
        const o = rng.pick(ops);
        const accept = finalize(o.en);
        return {
          prompt: rng.pick([`What does *${o.es}* mean in English?`, `Translate into English: *${o.es}*`]),
          answer: { type: "text", accept },
          solution: [`*${o.es}* = **${accept[0]}**.`],
          hint: "Look for cognates (*injusto*, *útil*, *importante*) and familiar chunks.",
          traps: o.trap ? makeTraps(accept, [o.trap]) : undefined,
        };
      }
      const c = rng.pick(CHORES);
      if (kind === "verb") {
        const op = rng.pick([
          { es: ["odio", "yo odio"], en: "I hate" },
          { es: ["no me importa"], en: "I don't mind" },
          { es: ["me gusta", "a mí me gusta"], en: "I like" },
          { es: ["me encanta", "a mí me encanta"], en: "I love" },
          { es: ["no me gusta", "a mí no me gusta"], en: "I don't like" },
          { es: ["prefiero", "yo prefiero"], en: "I prefer" },
          { es: ["no me gusta nada", "a mí no me gusta nada"], en: "I don't like … at all —" },
        ]);
        const atAll = op.en.includes("at all");
        const english = atAll ? `I don't like ${c.ing} at all.` : `${op.en} ${c.ing}.`;
        const accept = finalize(atAll ? infAll(c).flatMap((i) => [`no me gusta nada ${i}`, `a mí no me gusta nada ${i}`, `no me gusta ${i} nada`]) : op.es.flatMap((o) => infAll(c).map((i) => `${o} ${i}`)));
        const gerund = c.verb === "ir" ? null : c.verb.slice(0, -2) + (groupOf(c.verb) === "ar" ? "ando" : "iendo");
        const raw: RawTrap[] = [];
        if (gerund) raw.push({ wrong: op.es.map((o) => squash(`${o} ${gerund} ${c.rest}`)), feedback: `Spanish uses the **infinitive** where English uses '-ing': *${op.es[0]} ${inf(c)}*.` });
        raw.push({ wrong: op.es.map((o) => `${o} ${pres(c, "yo")}`), feedback: `After an opinion verb, keep the chore in the infinitive: *${inf(c)}*.` });
        if (op.es[0].includes("gusta")) raw.push({ wrong: op.es.map((o) => `${o.replace("gusta", "gustan")} ${inf(c)}`), feedback: "With an infinitive, *gusta* stays singular." });
        return {
          prompt: `Translate into Spanish: "${atAll ? english : english}"`,
          answer: { type: "text", accept },
          solution: [`"${atAll ? "I don't like … at all" : op.en}" = *${op.es[0]}${atAll ? " … nada" : ""}*.`, `'${c.ing}' → infinitive *${inf(c)}*.`, `→ **${accept[0]}.**`],
          hint: "English '-ing' after a verb of liking/hating = Spanish infinitive.",
          traps: makeTraps(accept, raw),
        };
      }
      if (kind === "adj") {
        const adj = rng.pick([
          { es: "aburrido", fem: "aburrida", en: "boring" },
          { es: "justo", fem: "justa", en: "fair" },
          { es: "injusto", fem: "injusta", en: "unfair" },
          { es: "asqueroso", fem: "asquerosa", en: "disgusting" },
          { es: "útil", fem: null, en: "useful" },
          { es: "importante", fem: null, en: "important" },
          { es: "un rollo", fem: null, en: "a pain" },
          { es: "divertido", fem: "divertida", en: "fun" },
        ]);
        const thinkFrame = tier === 3 && rng.bool(0.4);
        const base = infAll(c).map((i) => `${i} es ${adj.es}`);
        const accept = finalize(thinkFrame ? base.flatMap((b) => [`pienso que ${b}`, `creo que ${b}`, `yo pienso que ${b}`, `yo creo que ${b}`]) : base);
        const english = thinkFrame ? `I think that ${c.ing} is ${adj.en}.` : `${cap(c.ing)} is ${adj.en}.`;
        const raw: RawTrap[] = [];
        if (adj.fem) raw.push({ wrong: infAll(c).flatMap((i) => [`${i} es ${adj.fem}`, `pienso que ${i} es ${adj.fem}`, `creo que ${i} es ${adj.fem}`]), feedback: `The subject is the activity (an infinitive), which counts as masculine singular: *${adj.es}*.` });
        raw.push({ wrong: infAll(c).flatMap((i) => [`${i} está ${adj.es}`, `pienso que ${i} está ${adj.es}`, `creo que ${i} está ${adj.es}`]), feedback: "Use *es* (ser) to say what an activity is like." });
        return {
          prompt: `Translate into Spanish: "${english}"`,
          answer: { type: "text", accept },
          solution: [`'${c.ing}' (the activity) = the infinitive *${inf(c)}*.`, `'is ${adj.en}' = *es ${adj.es}*${adj.fem ? " (masculine — an infinitive is masculine)" : ""}.`, `→ **${accept[0]}.**`],
          hint: "An English '-ing' activity as the subject becomes a Spanish infinitive.",
          traps: makeTraps(accept, raw),
        };
      }
      if (kind === "two") {
        const others = CHORES.filter((x) => inf(x) !== inf(c) && x.verb !== c.verb);
        const c2 = rng.pick(others);
        const op = rng.pick([
          { es: ["me gusta", "a mí me gusta"], en: "I like" },
          { es: ["me encanta", "a mí me encanta"], en: "I love" },
          { es: ["no me importa"], en: "I don't mind" },
        ]);
        const accept = finalize(op.es.flatMap((o) => infAll(c).flatMap((a) => infAll(c2).map((b) => `${o} ${a} y ${b}`))));
        return {
          prompt: `Translate into Spanish: "${op.en} ${c.ing} and ${c2.ing}."`,
          answer: { type: "text", accept },
          solution: [`Both activities become infinitives: *${inf(c)}*, *${inf(c2)}*.`, op.es[0].includes("gusta") || op.es[0].includes("encanta") ? "Infinitives count as singular, so the verb stays singular even with two of them." : "*No me importa* + infinitive(s).", `→ **${accept[0]}.**`],
          hint: "Two infinitives joined by *y* — does the opinion verb change?",
          traps: makeTraps(accept, [
            { wrong: op.es.flatMap((o) => infAll(c).flatMap((a) => infAll(c2).map((b) => `${o.replace("gusta", "gustan").replace("encanta", "encantan")} ${a} y ${b}`))), feedback: "With infinitives, *gusta / encanta* stay singular — even with two activities." },
            { wrong: op.es.map((o) => `${o} ${pres(c, "yo")} y ${pres(c2, "yo")}`), feedback: "Keep both chores in the infinitive after the opinion verb." },
          ]),
        };
      }
      // compare
      const s = rng.pick(NOUN_3RD);
      const hace = conjugate("hacer", "present", s.p);
      const kindC = rng.pick(["more", "less", "nothing", "nobody"]);
      if (kindC === "nobody") {
        const accept = finalize(presAll(c, "él").map((p) => `nadie ${p}`));
        return {
          prompt: `Translate into Spanish: "Nobody ${c.s3}."`,
          answer: { type: "text", accept },
          solution: ["'Nobody' = *nadie*, followed by the *él* form of the verb.", presentStep(c.verb, "él"), `→ **${accept[0]}.**`],
          hint: "*Nadie* is singular — which ending does it take?",
          traps: makeTraps(accept, [
            { wrong: presAll(c, "él").map((p) => `nadie no ${p}`), feedback: "*Nadie* in front of the verb works on its own — no *no*." },
            { wrong: presAll(c, "ellos").map((p) => `nadie ${p}`), feedback: "*Nadie* takes the singular (*él*) form of the verb." },
          ]),
        };
      }
      if (kindC === "nothing") {
        const accept = finalize([`${s.es} no ${hace} nada`]);
        return {
          prompt: `Translate into Spanish: "${cap(s.en)} ${enDont(s)} do anything."`,
          answer: { type: "text", accept },
          solution: [`'do' = *hacer* → ${PERSON_LABEL[s.p]}: *${hace}*.`, "Spanish uses a double negative: *no* + verb + *nada*.", `→ **${accept[0]}.**`],
          hint: "*No … nada* — Spanish needs both negatives.",
          traps: makeTraps(accept, [
            { wrong: [`${s.es} ${hace} nada`], feedback: "With *nada* after the verb, put *no* in front: *no hace nada*." },
            { wrong: [`${s.es} no ${hace} algo`, `${s.es} no ${hace} nothing`], feedback: "'Not … anything' = *no … nada*." },
          ]),
        };
      }
      const more = kindC === "more";
      const accept = finalize([`${s.es} ${hace} ${more ? "más" : "menos"} que yo`]);
      return {
        prompt: `Translate into Spanish: "${cap(s.en)} ${isThird(s) ? "does" : "do"} ${more ? "more" : "less"} than me."`,
        answer: { type: "text", accept },
        solution: [`'do' = *hacer* → *${hace}*.`, `${more ? "more than" : "less than"} = *${more ? "más" : "menos"} que*, and after *que* Spanish uses *yo* (not *mí*).`, `→ **${accept[0]}.**`],
        hint: "After *más que / menos que*, use the subject pronoun.",
        traps: makeTraps(accept, [
          { wrong: [`${s.es} ${hace} ${more ? "más" : "menos"} que mí`, `${s.es} ${hace} ${more ? "más" : "menos"} que me`], feedback: "After *más que / menos que* use *yo*: *más que yo*." },
          { wrong: [`${s.es} ${hace} ${more ? "más" : "menos"} de yo`], feedback: "'Than' in comparisons = *que*." },
        ]),
      };
    },
  },

  // 9 -----------------------------------------------------------------------
  {
    id: "tareas.near-future-chores",
    topicId: TOPIC,
    title: "This weekend: voy a + chore (near future)",
    level: 2,
    guideRef: "chores-this-weekend",
    generate(rng, tier) {
      const c = rng.pick(tier === 1 ? CORE_CHORES : CHORES);
      const t = rng.pick(FUT_TIMES);
      const kind = tier === 1 ? "gap" : tier === 2 ? rng.pick(["gap", "rewrite"]) : rng.pick(["neg", "neg", "rewrite"]);
      const s = tier === 1 ? rng.pick(PRON_SUBJ) : rng.pick(ALL_SUBJ);
      const ir = conjugate("ir", "present", s.p);
      // Wrong verb parts (without the rest of the chunk), framed per template.
      const commonTraps = (frame: (verbPart: string) => string[]): RawTrap[] => [
        { wrong: frame(`${ir} ${c.verb}`), feedback: `Don't forget the little *a*: *${ir} **a** ${c.verb}*.` },
        { wrong: frame(`${ir} a ${conjugate(c.verb, "present", s.p)}`), feedback: "After *ir a* the chore stays in the **infinitive**." },
        { wrong: frame(conjugate(c.verb, "present", s.p)), feedback: `That's the present tense. *${cap(t.es[0])}* is about a plan → *ir a* + infinitive.` },
      ];
      if (kind === "gap") {
        const accept = finalize(verbAccept(c.verb, "near-future", s), false);
        return {
          prompt: `Complete with *ir a* + the infinitive of *${c.verb}*: *${cap(t.es[0])} ${subjShown(s, false)} ___${c.rest ? " " + c.rest : ""}.*`,
          answer: { type: "text", accept },
          solution: [`*Ir* for ${PERSON_LABEL[s.p]}: *${ir}*.`, `Add *a* + the infinitive *${c.verb}* → **${conjugate(c.verb, "near-future", s.p)}**.`],
          hint: "Three parts: the right form of *ir*, then *a*, then the infinitive.",
          traps: makeTraps(accept, commonTraps((vp) => (s.pron ? [vp, ...pronounsFor(s).map((pr) => `${pr} ${vp}`)] : [vp]))),
        };
      }
      if (kind === "rewrite") {
        const from = rng.pick(["normalmente", "los sábados", "cada día", "a veces"]);
        const shownPresent = s.pron ? pres(c, s.p) : `${s.es} ${pres(c, s.p)}`;
        const accept = finalize(withSubj(s, nearFutAll(c, s.p)).map((x) => `${t.es[0]} ${x}`));
        return {
          prompt: `Rewrite in the near future, starting with *${cap(t.es[0])}*: *${cap(from)} ${s.pron ? `(${s.es}) ` : ""}${shownPresent}.*`,
          answer: { type: "text", accept },
          solution: [`Swap *${from}* for *${t.es[0]}* — a plan, so use *ir a* + infinitive.`, `*${pres(c, s.p)}* → *${conjugate(c.verb, "near-future", s.p)}${c.rest ? " " + c.rest : ""}*.`, `→ **${accept[0]}.**`],
          hint: "Keep the person, change the verb to *ir (conjugated) + a + infinitive*.",
          traps: makeTraps(accept, commonTraps((vp) => withSubj(s, [squash(`${vp} ${c.rest}`)]).map((x) => `${t.es[0]} ${x}`))),
        };
      }
      // negative translation
      const english = `${cap(t.en)}, ${s.en} ${s.p === "yo" ? "am not" : enBeNeg(s)} going to ${c.en}.`;
      const negCores = nearFutAll(c, s.p).map((x) => `no ${x}`);
      const accept = finalize(withTime(withSubj(s, negCores), t.es));
      return {
        prompt: `Translate into Spanish: "${english.replace(/^(.)/, (m) => m.toUpperCase())}"`,
        answer: { type: "text", accept },
        solution: [`*Ir* for ${PERSON_LABEL[s.p]}: *${ir}*; then *a* + infinitive *${c.verb}*.`, `*No* goes in front of the part of *ir*: *no ${ir} a ${c.verb}*.`, `${cap(t.en)} = *${t.es[0]}* (start or end) → **${accept[0]}.**`],
        hint: "Where does *no* go — before *ir* or before the infinitive?",
        traps: makeTraps(accept, [
          { wrong: withTime(withSubj(s, [squash(`${ir} a no ${c.verb} ${c.rest}`)]), t.es), feedback: `*No* goes before the part of *ir*: *no ${ir} a …*.` },
          { wrong: withTime(withSubj(s, [squash(`no ${ir} ${c.verb} ${c.rest}`)]), t.es), feedback: `Don't forget the little *a*: *no ${ir} **a** ${c.verb}*.` },
        ]),
      };
    },
  },

  // 10 ----------------------------------------------------------------------
  {
    id: "tareas.present-or-future",
    topicId: TOPIC,
    title: "Normalmente vs mañana: present or near future?",
    level: 3,
    guideRef: "chores-this-weekend",
    generate(rng, tier) {
      const c = rng.pick(tier === 1 ? CORE_CHORES : CHORES);
      const s = tier === 1 ? rng.pick(PRON_SUBJ) : rng.pick(ALL_SUBJ);
      const future = rng.bool();
      const time = future ? rng.pick(FUT_TIMES).es[0] : rng.pick(PRES_TIMES);
      const neg = tier === 3 && rng.bool(0.4) && time !== "siempre";
      const tense = future ? "near-future" : "present";
      const right = conjugate(c.verb, tense, s.p);
      const other = conjugate(c.verb, future ? "present" : "near-future", s.p);
      const accept = finalize(verbAccept(c.verb, tense, s), false);
      return {
        prompt: `Look at the time phrase, then write the right form of *${c.verb}* — present or *ir a* + infinitive: *${cap(time)} ${subjShown(s, false)}${neg ? " no" : ""} ___${c.rest ? " " + c.rest : ""}.*`,
        answer: { type: "text", accept },
        solution: [
          future ? `*${time}* points to a plan → near future (*ir a* + infinitive).` : `*${time}* describes a habit → present tense.`,
          future ? `*Ir* for ${PERSON_LABEL[s.p]} + *a* + *${c.verb}* → **${right}**.` : presentStep(c.verb, s.p),
          neg ? `*No* stays in front of the conjugated verb: *no ${right}*.` : `→ **${right}**.`,
        ],
        hint: "Is the time phrase about what usually happens, or about a plan?",
        traps: makeTraps(accept, [
          { wrong: [other, ...(s.pron ? pronounsFor(s).map((p) => `${p} ${other}`) : [])], feedback: future ? `*${cap(time)}* is in the future — use *ir a* + infinitive, not the present.` : `*${cap(time)}* describes a habit — use the present tense, not *ir a*.` },
          { wrong: [c.verb], feedback: "Conjugate it — the infinitive alone doesn't say who does the chore." },
        ]),
      };
    },
  },

  // 11 ----------------------------------------------------------------------
  {
    id: "tareas.obligation-sentences",
    topicId: TOPIC,
    title: "Build it up: who has to do what, and how often",
    level: 3,
    guideRef: "obligation",
    generate(rng, tier) {
      const c = rng.pick(tier === 1 ? CORE_CHORES : CHORES);
      const s = tier === 1 ? rng.pick(PRON_SUBJ.filter((x) => x.p !== "vosotros")) : rng.pick(ALL_SUBJ);
      const t = conjugate("tener", "present", s.p);
      const f = tier === 1 ? null : rng.pick(END_FREQS);
      const neg = tier === 3 && rng.bool(0.35);
      const two = tier === 3 && !neg && rng.bool(0.5);
      const c2 = two ? rng.pick(CHORES.filter((x) => x.verb !== c.verb)) : null;
      const neg_ = neg ? "no " : "";
      const objects = c2 ? infAll(c).flatMap((a) => infAll(c2).map((b) => `${a} y ${b}`)) : infAll(c);
      const cores = objects.map((o) => `${neg_}${t} que ${o}`);
      const sentences = withSubj(s, cores);
      const accept = finalize(f ? withTime(sentences, f.es) : sentences);
      const enObj = c2 ? `${c.en} and ${c2.en}` : c.en;
      const enVerb = neg ? `${enDont(s)} have to` : `${enHave(s)} to`;
      const english = `${cap(s.en)} ${enVerb} ${enObj}${f ? " " + f.en[0] : ""}.`;
      const wrongWith = (coreList: string[]) => {
        const sub = withSubj(s, coreList);
        return f ? withTime(sub, f.es) : sub;
      };
      const raw: RawTrap[] = [];
      if (neg) raw.push({ wrong: wrongWith(objects.map((o) => `no ${conjugate("deber", "present", s.p)} ${o}`)), feedback: "*No deber* = mustn't / shouldn't. 'Don't have to' (there's no need) is *no tener que*." });
      raw.push({ wrong: wrongWith(objects.map((o) => `${neg_}${t} ${o}`)), feedback: "Don't forget *que*: *tener **que** + infinitive*." });
      raw.push({ wrong: wrongWith([`${neg_}${t} que ${pres(c, s.p)}${c2 ? " y " + pres(c2, s.p) : ""}`]), feedback: "After *tener que* the chore stays in the infinitive." });
      const noBoot = noBootForm("tener", s.p);
      if (noBoot) raw.push({ wrong: wrongWith(objects.map((o) => `${neg_}${noBoot} que ${o}`)), feedback: `*Tener* changes e→ie in the boot: **${t}**.` });
      return {
        prompt: `Translate into Spanish: "${english}"`,
        answer: { type: "text", accept },
        solution: [
          `'${neg ? "don't have to" : "have to"}' = *${neg_}tener que* + infinitive → *${neg_}${t} que*.`,
          c2 ? `Two chores share one *${t} que*: *${inf(c)} y ${inf(c2)}*.` : `Chore (infinitive): *${inf(c)}*.`,
          f ? `"${f.en[0]}" = *${f.es[0]}* (start or end) → **${accept[0]}.**` : `→ **${accept[0]}.**`,
        ],
        hint: "Build it in layers: who → *tener que* → chore (infinitive) → how often.",
        traps: makeTraps(accept, raw),
      };
    },
  },
];

// ---------------------------------------------------------------------------
// Trap builders used above (hoisted function declarations)
// ---------------------------------------------------------------------------

/** Chore-specific traps for en→es (s = null → infinitive answer). */
function choreTraps(c: Chore, s: Subj | null): RawTrap[] {
  const p: Person | null = s ? s.p : null;
  const phrase = (verb: string, rest: string) => {
    const core = p ? squash(`${conjugate(verb, "present", p)} ${rest}`) : squash(`${verb} ${rest}`);
    return s ? withSubj(s, [core]) : [core];
  };
  const out: RawTrap[] = [];
  const key = inf(c);
  if (key === "poner la mesa") out.push({ wrong: phrase("hacer", "la mesa"), feedback: "'Set the table' is *poner la mesa* — literally 'put the table'." });
  if (key === "quitar la mesa") out.push({ wrong: phrase("poner", "la mesa"), feedback: "*Poner la mesa* is setting it; clearing it is *quitar la mesa*." });
  if (key === "pasear al perro") out.push({ wrong: phrase("pasear", "el perro"), feedback: "A pet gets the personal *a*: *a + el* = **al** perro." });
  if (key === "hacer la compra") out.push({ wrong: phrase("ir", "de compras"), feedback: "*Ir de compras* is shopping for fun; the food shopping is *hacer la compra*." });
  if (key === "ir de compras") out.push({ wrong: phrase("hacer", "la compra"), feedback: "*Hacer la compra* is the food shopping; 'go shopping' is *ir de compras*." });
  if (key === "hacer la cama") out.push({ wrong: phrase("poner", "la cama"), feedback: "You *make* a bed with *hacer*: *hacer la cama*." });
  if (p === "yo" && (c.verb === "hacer" || c.verb === "poner")) {
    const bad = squash(`${c.verb === "hacer" ? "haco" : "pono"} ${c.rest}`);
    out.push({ wrong: s ? withSubj(s, [bad]) : [bad], feedback: `*${cap(c.verb)}* is irregular in the *yo* form: **${conjugate(c.verb, "present", "yo")}**.` });
  }
  if (p) {
    const nb = noBootForm(c.verb, p);
    if (nb) out.push({ wrong: withSubj(s as Subj, [squash(`${nb} ${c.rest}`)]), feedback: `*${cap(c.verb)}* is a boot verb (e→ie): **${conjugate(c.verb, "present", p)}**.` });
    out.push({ wrong: withSubj(s as Subj, infAll(c)), feedback: "That's the infinitive — conjugate the verb to match the subject." });
  }
  return out;
}

/** Traps for a gap answer "<tener> que". */
function tenerTraps(p: Person): RawTrap[] {
  const t = conjugate("tener", "present", p);
  const out: RawTrap[] = [{ wrong: [t], feedback: `Two words needed: *${t} **que***.` }];
  const nb = noBootForm("tener", p);
  if (nb) out.push({ wrong: [`${nb} que`], feedback: p === "yo" ? "*Tener* has an irregular *yo* form: **tengo que**." : `*Tener* changes e→ie in the boot: **${t} que**.` });
  if (p !== "yo") out.push({ wrong: ["tengo que"], feedback: "*Tengo* is 'I have'. Check the subject." });
  out.push({ wrong: ["tener que"], feedback: "Conjugate *tener* to match the subject." });
  return out;
}
