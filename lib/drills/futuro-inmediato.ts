// Procedural skill drills for the topic "futuro-inmediato" (ir + a + infinitive).
// Every verb form comes from the tested conjugator in lib/spanish/verbs.ts.
import type { Drill, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import { conjugate, acceptedForms, englishGloss, SUBJECT_PRONOUNS, type Person } from "../spanish/verbs.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";
import { vocab } from "../vocab/futuro-inmediato.ts";

const T = "futuro-inmediato";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const uniq = (xs: string[]): string[] => [...new Set(xs)];
const cap = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const key = (s: string): string => stripAccents(normSpanish(s));

/** A trap that never matches (even accent-insensitively) any accepted answer. */
function traps(accept: string[], list: { wrong: string[]; feedback: string }[]): Trap[] {
  const ok = new Set(accept.map(key));
  const out: Trap[] = [];
  for (const t of list) {
    const wrong = uniq(t.wrong).filter((w) => w && !ok.has(key(w)));
    if (wrong.length) out.push({ spec: { type: "text", accept: wrong }, feedback: t.feedback });
  }
  return out.slice(0, 2);
}

/** A sentence for display: capital letter + full stop (or keep ¿…?). */
function sentence(s: string): string {
  const t = cap(s.trim());
  return /[?!.]$/.test(t) ? t : `${t}.`;
}

/** Near-future forms of a verb WITHOUT a subject pronoun (both pronoun positions for reflexives). */
function nf(inf: string, p: Person): string[] {
  const subj = SUBJECT_PRONOUNS[p];
  return acceptedForms(inf, "near-future", p).filter((f) => !subj.some((s) => f.startsWith(`${s} `)));
}

/** Present form (reflexives include the pronoun: "me levanto"). */
const pres = (inf: string, p: Person) => conjugate(inf, "present", p);
const irP = (p: Person) => conjugate("ir", "present", p);

// ---------------------------------------------------------------------------
// Subjects
// ---------------------------------------------------------------------------

interface Subj {
  p: Person;
  /** Spanish subject noun phrase, or null for a dropped pronoun. */
  es: string | null;
  /** English subject. */
  en: string;
  /** Label used in prompts ("*nosotros* (we)"). */
  label: string;
}

const PRONOUN_SUBJ: Record<Person, Subj> = {
  yo: { p: "yo", es: null, en: "I", label: "*yo* (I)" },
  tú: { p: "tú", es: null, en: "you", label: "*tú* (you)" },
  él: { p: "él", es: null, en: "he", label: "*él / ella* (he / she)" },
  nosotros: { p: "nosotros", es: null, en: "we", label: "*nosotros* (we)" },
  vosotros: { p: "vosotros", es: null, en: "you all", label: "*vosotros* (you, plural)" },
  ellos: { p: "ellos", es: null, en: "they", label: "*ellos / ellas* (they)" },
};

const NAMED_SUBJ: Subj[] = [
  { p: "él", es: "Lucía", en: "Lucía", label: "*Lucía*" },
  { p: "él", es: "Pablo", en: "Pablo", label: "*Pablo*" },
  { p: "él", es: "mi hermano", en: "my brother", label: "*mi hermano*" },
  { p: "él", es: "mi hermana", en: "my sister", label: "*mi hermana*" },
  { p: "él", es: "Arjun", en: "Arjun", label: "*Arjun*" },
  { p: "él", es: "mi madre", en: "my mum", label: "*mi madre*" },
  { p: "ellos", es: "mis padres", en: "my parents", label: "*mis padres*" },
  { p: "ellos", es: "Wei Ling y Arjun", en: "Wei Ling and Arjun", label: "*Wei Ling y Arjun*" },
  { p: "ellos", es: "mis primos", en: "my cousins", label: "*mis primos*" },
  { p: "ellos", es: "Sofía y Diego", en: "Sofía and Diego", label: "*Sofía y Diego*" },
  { p: "nosotros", es: "mi amiga y yo", en: "my friend and I", label: "*mi amiga y yo*" },
  { p: "nosotros", es: "Hana y yo", en: "Hana and I", label: "*Hana y yo*" },
  { p: "vosotros", es: "tú y tu hermano", en: "you and your brother", label: "*tú y tu hermano*" },
];

/** Subject variants in front of a verb form: dropped pronoun ± pronoun, or the named subject. */
function withSubj(s: Subj, forms: string[]): string[] {
  if (s.es) return forms.map((f) => `${s.es} ${f}`);
  return uniq([...forms, ...SUBJECT_PRONOUNS[s.p].flatMap((pr) => forms.map((f) => `${pr} ${f}`))]);
}

/** Canonical Spanish for subject + verb (named subject shown, pronoun dropped). */
const subjCanon = (s: Subj, form: string) => (s.es ? `${s.es} ${form}` : form);

function pickSubj(rng: Rng, tier: 1 | 2 | 3, opts: { pronouns?: Person[]; named?: boolean } = {}): Subj {
  const pronouns = opts.pronouns ?? (tier === 1 ? (["yo", "tú", "nosotros"] as Person[]) : (["yo", "tú", "nosotros", "vosotros"] as Person[]));
  const pool: Subj[] = pronouns.map((p) => PRONOUN_SUBJ[p]);
  if (opts.named ?? tier >= 2) pool.push(...NAMED_SUBJ);
  return rng.pick(pool);
}

// ---------------------------------------------------------------------------
// Activities (verb + complement) — vegetarian, Year 8 vocabulary
// ---------------------------------------------------------------------------

interface Act {
  inf: string;
  /** Spanish complement after the verb ("" if none). */
  es: string;
  /** English complement after the verb ("" if none). */
  en: string;
}

const ACTS: Act[] = [
  { inf: "jugar", es: "al tenis", en: "tennis" },
  { inf: "jugar", es: "al fútbol", en: "football" },
  { inf: "jugar", es: "al baloncesto", en: "basketball" },
  { inf: "ver", es: "una película", en: "a film" },
  { inf: "ver", es: "la tele", en: "TV" },
  { inf: "nadar", es: "en la piscina", en: "in the pool" },
  { inf: "comer", es: "churros", en: "churros" },
  { inf: "cocinar", es: "una paella de verduras", en: "a vegetable paella" },
  { inf: "visitar", es: "el museo", en: "the museum" },
  { inf: "leer", es: "un libro", en: "a book" },
  { inf: "estudiar", es: "en la biblioteca", en: "in the library" },
  { inf: "hacer", es: "los deberes", en: "homework" },
  { inf: "escuchar", es: "música", en: "to music" },
  { inf: "ir", es: "al parque", en: "to the park" },
  { inf: "ir", es: "a la playa", en: "to the beach" },
  { inf: "ir", es: "de compras", en: "shopping" },
  { inf: "descansar", es: "en casa", en: "at home" },
  { inf: "montar", es: "en bici", en: "a bike" },
];

const REFL_ACTS: Act[] = [
  { inf: "levantarse", es: "temprano", en: "early" },
  { inf: "levantarse", es: "tarde", en: "late" },
  { inf: "acostarse", es: "a las once", en: "at eleven" },
  { inf: "acostarse", es: "tarde", en: "late" },
  { inf: "ducharse", es: "después del partido", en: "after the match" },
  { inf: "quedarse", es: "en casa", en: "at home" },
  { inf: "despertarse", es: "a las siete", en: "at seven" },
  { inf: "divertirse", es: "mucho", en: "a lot" },
  { inf: "vestirse", es: "rápido", en: "quickly" },
];

const join = (...parts: string[]) => parts.filter(Boolean).join(" ");

// ---------------------------------------------------------------------------
// Places for ir a + place
// ---------------------------------------------------------------------------

interface Place {
  /** Noun with its article, or a bare noun (casa / a city). */
  noun: string;
  art: "el" | "la" | "los" | "las" | "";
  en: string;
}

const PLACES: Place[] = [
  { noun: "parque", art: "el", en: "the park" },
  { noun: "cine", art: "el", en: "the cinema" },
  { noun: "polideportivo", art: "el", en: "the sports centre" },
  { noun: "centro comercial", art: "el", en: "the shopping centre" },
  { noun: "mercado", art: "el", en: "the market" },
  { noun: "museo", art: "el", en: "the museum" },
  { noun: "instituto", art: "el", en: "school" },
  { noun: "playa", art: "la", en: "the beach" },
  { noun: "piscina", art: "la", en: "the pool" },
  { noun: "biblioteca", art: "la", en: "the library" },
  { noun: "estación", art: "la", en: "the station" },
  { noun: "montaña", art: "la", en: "the mountains" },
  { noun: "tiendas", art: "las", en: "the shops" },
  { noun: "grandes almacenes", art: "los", en: "the department store" },
];

const BARE_PLACES: Place[] = [
  { noun: "casa", art: "", en: "home" },
  { noun: "Sevilla", art: "", en: "Seville" },
  { noun: "Madrid", art: "", en: "Madrid" },
  { noun: "Málaga", art: "", en: "Málaga" },
];

/** "al parque", "a la playa", "a los…", "a las…", "a casa". */
function toPlace(pl: Place): string {
  if (pl.art === "el") return `al ${pl.noun}`;
  if (pl.art === "") return `a ${pl.noun}`;
  return `a ${pl.art} ${pl.noun}`;
}
const withArt = (pl: Place) => (pl.art ? `${pl.art} ${pl.noun}` : pl.noun);

// ---------------------------------------------------------------------------
// Time phrases (from the topic vocab file, with accepted English variants)
// ---------------------------------------------------------------------------

const EN_FOR: Record<string, string[]> = {
  "mañana": ["tomorrow"],
  "mañana por la mañana": ["tomorrow morning"],
  "mañana por la tarde": ["tomorrow afternoon", "tomorrow evening"],
  "pasado mañana": ["the day after tomorrow", "day after tomorrow"],
  "esta tarde": ["this afternoon", "this evening"],
  "esta noche": ["tonight"],
  "este fin de semana": ["this weekend"],
  "el sábado que viene": ["next Saturday"],
  "el próximo sábado": ["next Saturday"],
  "la semana que viene": ["next week"],
  "la próxima semana": ["next week"],
  "el mes que viene": ["next month"],
  "el año que viene": ["next year"],
  "el verano que viene": ["next summer"],
  "dentro de dos días": ["in two days' time", "in two days", "in 2 days", "in 2 days' time"],
  "luego": ["later", "then", "afterwards", "later on"],
  "más tarde": ["later", "later on"],
  "en el futuro": ["in the future"],
  "en las vacaciones": ["in the holidays", "during the holidays", "in the vacation", "during the vacation", "in the vacations"],
};

interface TimePhrase {
  es: string;
  en: string[];
}

const VOCAB_TIME: TimePhrase[] = (vocab.find((g) => g.title === "Future time phrases")?.items ?? []).map((it) => ({
  es: it.es,
  en: EN_FOR[it.es] ?? it.en.split(" / ").map((s) => s.trim()),
}));

const EXTRA_TIME: TimePhrase[] = [
  { es: "el próximo año", en: ["next year"] },
  { es: "el próximo mes", en: ["next month"] },
  { es: "el próximo verano", en: ["next summer"] },
];

const DAYS: { es: string; en: string }[] = [
  { es: "lunes", en: "Monday" },
  { es: "martes", en: "Tuesday" },
  { es: "miércoles", en: "Wednesday" },
  { es: "jueves", en: "Thursday" },
  { es: "viernes", en: "Friday" },
  { es: "sábado", en: "Saturday" },
  { es: "domingo", en: "Sunday" },
];

const DAY_TIME: TimePhrase[] = DAYS.flatMap((d) => [
  { es: `el ${d.es} que viene`, en: [`next ${d.en}`] },
  { es: `el próximo ${d.es}`, en: [`next ${d.en}`] },
  { es: `este ${d.es}`, en: [`this ${d.en}`, `on ${d.en}`] },
  { es: `el ${d.es}`, en: [`on ${d.en}`, `this ${d.en}`] },
]);

const ALL_TIME: TimePhrase[] = [...VOCAB_TIME, ...EXTRA_TIME, ...DAY_TIME];

/** Spanish phrases that translate a given English phrase. */
function esFor(en: string): string[] {
  const k = en.toLowerCase();
  return uniq(ALL_TIME.filter((t) => t.en.some((e) => e.toLowerCase() === k)).map((t) => t.es));
}

/** Time phrases for building sentences (all clearly future). */
const SENT_TIME: TimePhrase[] = [
  { es: "mañana", en: ["tomorrow"] },
  { es: "esta tarde", en: ["this afternoon"] },
  { es: "esta noche", en: ["tonight"] },
  { es: "este fin de semana", en: ["this weekend"] },
  { es: "pasado mañana", en: ["the day after tomorrow"] },
  { es: "el sábado que viene", en: ["next Saturday"] },
  { es: "la semana que viene", en: ["next week"] },
  { es: "el año que viene", en: ["next year"] },
];

/** Spanish synonyms for the same time phrase in a translation answer. */
function timeSyn(es: string): string[] {
  const en = ALL_TIME.find((t) => t.es === es)?.en[0];
  return en ? uniq([es, ...esFor(en)]) : [es];
}

const HABIT = ["normalmente", "los sábados", "los domingos", "todos los días", "a veces", "los viernes"];
const PLAN = ["este sábado", "mañana", "esta tarde", "esta noche", "este fin de semana", "el domingo que viene", "pasado mañana"];

// ---------------------------------------------------------------------------
// English helpers
// ---------------------------------------------------------------------------

const EN_BE: Record<Person, string> = { yo: "am", tú: "are", él: "is", nosotros: "are", vosotros: "are", ellos: "are" };

/** "we are going to swim" with a chosen English subject. */
function enFuture(inf: string, s: Subj, comp = ""): string {
  const g = englishGloss(inf, "near-future", s.p); // e.g. "he/she is going to swim"
  const verb = g.slice(g.indexOf(` ${EN_BE[s.p]} going to `) + 1);
  return join(s.en, verb, comp);
}

// ---------------------------------------------------------------------------
// The drills
// ---------------------------------------------------------------------------

const IR_CONFUSE: Record<Person, { wrong: string; why: string }> = {
  yo: { wrong: "va", why: "*va* is the *él / ella* form. For *yo* it's the odd one: *voy* (like *soy, estoy*)." },
  tú: { wrong: "va", why: "*va* is for *él / ella*. *Tú* forms end in *-s*: *vas*." },
  él: { wrong: "van", why: "*van* is plural (they). One person → *va*." },
  nosotros: { wrong: "van", why: "*van* means 'they go'. 'We' always ends in *-mos*: *vamos*." },
  vosotros: { wrong: "vamos", why: "*vamos* is 'we'. *Vosotros* forms end in *-is*: *vais*." },
  ellos: { wrong: "va", why: "The subject is plural, so the verb must be plural too: *van*." },
};

export const drills: Drill[] = [
  // 1 ---------------------------------------------------------------------
  {
    id: `${T}.ir-present`,
    topicId: T,
    title: "The verb ir: present tense (voy, vas, va…)",
    level: 1,
    guideRef: "ir-present",
    generate(rng, tier) {
      if (rng.bool(tier === 1 ? 0.4 : 0.25)) {
        const p = rng.pick(["yo", "tú", "él", "nosotros", "vosotros", "ellos"] as Person[]);
        const s = PRONOUN_SUBJ[p];
        const form = irP(p);
        const accept = acceptedForms("ir", "present", p);
        return {
          prompt: `Write the present tense of *ir* (to go) for ${s.label}.`,
          answer: { type: "text", accept },
          solution: [
            "*Ir* is completely irregular — the forms don't look like the infinitive.",
            "*voy, vas, va, vamos, vais, van*",
            `${s.label} → **${form}**`,
          ],
          hint: "Start from *yo voy* and add the usual endings' letters: *-s* for *tú*, *-mos* for *nosotros*, *-is* for *vosotros*, *-n* for *ellos*.",
          traps: traps(accept, [
            { wrong: [IR_CONFUSE[p].wrong], feedback: IR_CONFUSE[p].why },
            { wrong: ["ir"], feedback: "*ir* is the infinitive ('to go'). Change it to match the person." },
          ]),
        };
      }
      // Gap-fill: the subject (a pronoun or a name) is in the frame.
      const s = pickSubj(rng, tier, { pronouns: ["yo", "tú", "él", "nosotros", "vosotros", "ellos"] });
      const subjEs = s.es ?? rng.pick(SUBJECT_PRONOUNS[s.p].filter((x) => x !== "usted" && x !== "ustedes"));
      const pl = rng.pick(tier === 3 ? [...PLACES, ...BARE_PLACES] : PLACES);
      const time = tier === 3 ? rng.pick(["Los sábados", "Normalmente", "Hoy", "Ahora", "Todos los días"]) : "";
      const form = irP(s.p);
      const frame = sentence(join(time, time ? subjEs : cap(subjEs), "___", toPlace(pl)));
      const accept = [form];
      return {
        prompt: `Fill the gap with the present tense of *ir*:\n\n    ${frame}`,
        answer: { type: "text", accept },
        solution: [
          `Who is going? *${subjEs}* → the *${s.p}* form.`,
          `*ir*: voy, vas, va, vamos, vais, van → **${form}**.`,
          `${sentence(join(time, time ? subjEs : cap(subjEs), form, toPlace(pl)))}`,
        ],
        hint: s.es && s.es.includes(" y ") ? "Two people joined by *y* make a plural subject — and if one of them is *yo*, it's 'we'." : "Find the subject first, then pick the matching form of *ir*.",
        traps: traps(accept, [
          { wrong: [IR_CONFUSE[s.p].wrong], feedback: IR_CONFUSE[s.p].why },
          { wrong: ["ir"], feedback: "The gap needs a conjugated form, not the infinitive *ir*." },
        ]),
      };
    },
  },

  // 2 ---------------------------------------------------------------------
  {
    id: `${T}.ir-a-place`,
    topicId: T,
    title: "Ir a + place: al, a la, a los, a las",
    level: 1,
    guideRef: "ir-present",
    generate(rng, tier) {
      const s = pickSubj(rng, tier, { pronouns: tier === 1 ? ["yo", "tú", "nosotros"] : ["yo", "tú", "nosotros", "vosotros"] });
      const pool = tier === 1 ? PLACES.filter((p) => p.art === "el" || p.art === "la") : tier === 2 ? PLACES : [...PLACES, ...BARE_PLACES];
      const pl = rng.pick(pool);
      const form = irP(s.p);
      const core = `${form} ${toPlace(pl)}`;
      const accept = uniq([core, ...withSubj(s, [core])]);
      const placeHint = pl.art === "" ? `*${pl.noun}*` : `*${withArt(pl)}*`;
      const english = tier === 3;
      const enVerb = s.p === "yo" ? "am going" : s.p === "él" ? "is going" : "are going";
      const shown = s.es ?? rng.pick(SUBJECT_PRONOUNS[s.p].filter((x) => x !== "usted" && x !== "ustedes"));
      const useNote = s.es && s.es.toLowerCase() !== s.en.toLowerCase() ? ` (Use *${s.es}*.)` : s.p === "tú" ? " (*tú*)" : s.p === "vosotros" ? " (*vosotros*)" : "";
      const prompt = english
        ? `Write in Spanish: '${cap(s.en)} ${enVerb} to ${pl.en}.'${useNote} Place: ${placeHint}.`
        : `Complete the sentence with the right form of *ir* + *a / al / a la / a los / a las* and the place ${placeHint}:\n\n    ${cap(shown)} ___.`;
      const why =
        pl.art === "el"
          ? `*${pl.noun}* is masculine (*el*), and *a + el* always squashes into **al**.`
          : pl.art === "la"
            ? `*${pl.noun}* is feminine (*la*): *a la* never contracts.`
            : pl.art === ""
              ? pl.noun === "casa"
                ? "Going home is simply *a casa* — no article."
                : "Towns and cities take no article: *a* + the name."
              : `Plural article *${pl.art}*: *a ${pl.art}* never contracts.`;
      const wrong: { wrong: string[]; feedback: string }[] = [];
      if (pl.art === "el") wrong.push({ wrong: withSubj(s, [`${form} a el ${pl.noun}`]), feedback: "*a + el* must contract to *al*: Spanish never writes *a el*." });
      if (pl.art === "la") wrong.push({ wrong: withSubj(s, [`${form} al ${pl.noun}`, `${form} al la ${pl.noun}`]), feedback: `*al* is only for masculine nouns (*a + el*). *${pl.noun}* is feminine → *a la ${pl.noun}*.` });
      if (pl.art === "los") wrong.push({ wrong: withSubj(s, [`${form} al ${pl.noun}`, `${form} al los ${pl.noun}`]), feedback: "Only *a + el* contracts. With *los* you write *a los*." });
      if (pl.art === "las") wrong.push({ wrong: withSubj(s, [`${form} al ${pl.noun}`, `${form} a la ${pl.noun}`]), feedback: `*${pl.noun}* is feminine plural → *a las ${pl.noun}*.` });
      if (pl.noun === "casa") wrong.push({ wrong: withSubj(s, [`${form} a la casa`]), feedback: "*a la casa* means 'to the house'. 'Home' is just *a casa*." });
      wrong.push({ wrong: withSubj(s, [`${form} ${withArt(pl)}`]), feedback: "Don't forget *a* ('to') after *ir* — you go *to* a place." });
      return {
        prompt,
        answer: { type: "text", accept, display: sentence(subjCanon(s, core)) },
        solution: [
          `Who? ${s.es ? `*${s.es}*` : s.label} → *${form}*.`,
          why,
          `**${sentence(subjCanon(s, core))}**`,
        ],
        hint: pl.art === "" ? "Is there an article in front of this place at all?" : "Check the gender of the place: masculine *el* or feminine *la*? Only one of them joins up with *a*.",
        traps: traps(accept, wrong),
      };
    },
  },

  // 3 ---------------------------------------------------------------------
  {
    id: `${T}.build-near-future`,
    topicId: T,
    title: "Build the near future: ir + a + infinitive",
    level: 1,
    guideRef: "forming-the-near-future",
    generate(rng, tier) {
      const verbs1 = ["nadar", "jugar", "bailar", "cantar", "cocinar", "estudiar", "descansar", "viajar", "comer", "beber", "escribir", "vivir"];
      const verbs2 = [...verbs1, "hacer", "salir", "ver", "ir", "leer", "volver", "dormir", "tener", "poner"];
      const inf = rng.pick(tier === 1 ? verbs1 : verbs2);
      const persons: Person[] = tier === 1 ? ["yo", "tú", "él", "nosotros"] : ["yo", "tú", "él", "nosotros", "vosotros", "ellos"];
      const p = rng.pick(persons);
      const s = PRONOUN_SUBJ[p];
      const accept = acceptedForms(inf, "near-future", p);
      const ans = conjugate(inf, "near-future", p);
      const presentForm = pres(inf, p);
      const prompt =
        tier === 3
          ? `Write in Spanish: '${cap(enFuture(inf, s.p === "él" ? { ...s, en: rng.pick(["he", "she"]) } : s))}'. Use *${inf}*.${p === "tú" ? " (*tú*)" : p === "vosotros" ? " (*vosotros*)" : ""}`
          : `Put *${inf}* into the near future (*ir a* + infinitive) for ${s.label}.`;
      return {
        prompt,
        answer: { type: "text", accept },
        solution: [
          `Engine: *ir* for ${s.label} → *${irP(p)}*.`,
          "Coupling: *a* (never changes).",
          `Wagon: the infinitive *${inf}* (never changes) → **${ans}**.`,
        ],
        hint: "Only *ir* changes for the person. The second verb stays exactly as it is in the dictionary.",
        traps: traps(accept, [
          { wrong: [`${irP(p)} a ${presentForm}`], feedback: `Don't conjugate the second verb: after *a* it stays as the infinitive *${inf}*.` },
          { wrong: [`${irP(p)} ${inf}`], feedback: "You've lost the coupling: *ir* **a** + infinitive. No *a*, no train." },
        ]),
      };
    },
  },

  // 4 ---------------------------------------------------------------------
  {
    id: `${T}.time-phrases`,
    topicId: T,
    title: "Future time phrases: Spanish ↔ English",
    level: 1,
    guideRef: "future-time-phrases",
    generate(rng, tier) {
      const pool = tier === 1 ? VOCAB_TIME.filter((t) => !t.es.includes("dentro")) : tier === 2 ? [...VOCAB_TIME, ...EXTRA_TIME] : [...VOCAB_TIME, ...EXTRA_TIME, ...DAY_TIME];
      const t = rng.pick(pool);
      const toEnglish = rng.bool();
      if (toEnglish) {
        const accept = t.en.map((e) => e.toLowerCase());
        const wrong: { wrong: string[]; feedback: string }[] = [];
        if (t.es === "mañana") wrong.push({ wrong: ["morning", "the morning", "in the morning"], feedback: "*la mañana* (with *la*) is 'the morning'. *Mañana* on its own is 'tomorrow'." });
        if (t.es === "pasado mañana") wrong.push({ wrong: ["yesterday", "the day before yesterday", "past tomorrow"], feedback: "*Pasado mañana* is still in the future: once tomorrow has passed → 'the day after tomorrow'." });
        if (t.es.includes("que viene")) wrong.push({ wrong: [t.en[0].replace("next", "last"), t.en[0].replace("next ", "this ")], feedback: "*Que viene* = 'that is coming' → **next**." });
        if (t.es.includes("próxim")) wrong.push({ wrong: [t.en[0].replace("next", "last")], feedback: "*Próximo / próxima* = 'nearest, next' — it points forward." });
        if (t.es === "esta noche") wrong.push({ wrong: ["last night"], feedback: "*Esta* = this → 'tonight'. ('Last night' is *anoche*.)" });
        return {
          prompt: `Translate the time phrase into English: *${t.es}*`,
          answer: { type: "text", accept, display: t.en[0] },
          solution: [`*${t.es}* = **${t.en[0]}**${t.en.length > 1 ? ` (also: ${t.en.slice(1).join(", ")})` : ""}.`],
          hint: t.es.includes("que viene") ? "*Viene* is from *venir* (to come): the … that is coming." : "Break it into words you know: *este / esta* = this, *mañana* = tomorrow…",
          traps: traps(accept, wrong),
        };
      }
      const en = t.en[0];
      const accept = esFor(en);
      const wrong: { wrong: string[]; feedback: string }[] = [];
      if (en.startsWith("next ")) {
        const noun = accept.find((a) => a.includes("que viene"))?.replace(" que viene", "") ?? "";
        const fem = noun.startsWith("la ");
        const bare = noun.replace(/^(el|la) /, "");
        if (noun) {
          wrong.push({ wrong: [fem ? `la próximo ${bare}` : `el próxima ${bare}`], feedback: `*Próximo* must agree: ${fem ? `*la próxima ${bare}*` : `*el próximo ${bare}*`}.` });
          wrong.push({ wrong: [`${noun} pasado`, `${noun} pasada`, `${fem ? "la próxima" : "el próximo"} ${bare} que viene`], feedback: "*Pasado/pasada* means 'last'. And use *próximo* **or** *que viene*, not both." });
        }
      }
      if (en === "tomorrow") wrong.push({ wrong: ["la mañana"], feedback: "*la mañana* = 'the morning'. 'Tomorrow' has no article: *mañana*." });
      if (en === "tonight") wrong.push({ wrong: ["esta mañana", "este noche"], feedback: "'Tonight' = this night → *esta noche* (*noche* is feminine)." });
      if (en === "this weekend") wrong.push({ wrong: ["esta fin de semana"], feedback: "*Fin* is masculine (*el fin de semana*), so *este*." });
      const agree = accept.length > 1 && accept.some((a) => a.includes("próxim")) ? `\n\n(Two ways: *… que viene* or *próximo / próxima …* — either is accepted.)` : "";
      return {
        prompt: `Write the time phrase in Spanish: '${en}'.`,
        answer: { type: "text", accept, display: accept.join(" / ") },
        solution: [`'${en}' = **${accept.join("** or **")}**.${agree}`],
        hint: en.startsWith("next") ? "'Next' = *que viene* after the noun, or *próximo/próxima* before it." : "Think of the topic's time phrases: *esta…, este…, mañana…*",
        traps: traps(accept, wrong),
      };
    },
  },

  // 5 ---------------------------------------------------------------------
  {
    id: `${T}.reflexive-near-future`,
    topicId: T,
    title: "Reflexive verbs in the near future (two positions)",
    level: 2,
    guideRef: "forming-the-near-future",
    generate(rng, tier) {
      const verbs = tier === 1 ? ["levantarse", "ducharse", "quedarse", "bañarse", "lavarse"] : ["levantarse", "ducharse", "quedarse", "acostarse", "despertarse", "vestirse", "divertirse", "bañarse", "lavarse", "peinarse"];
      const inf = rng.pick(verbs);
      const base = inf.slice(0, -2);
      const pron: Record<Person, string> = { yo: "me", tú: "te", él: "se", nosotros: "nos", vosotros: "os", ellos: "se" };
      if (tier === 3) {
        const a = REFL_ACTS.filter((x) => x.inf === inf)[0] ?? { inf, es: "", en: "" };
        const s = pickSubj(rng, tier);
        const time = rng.pick(["Mañana", "Esta noche", "El sábado que viene", "Este fin de semana", "Pasado mañana"]);
        const forms = nf(inf, s.p);
        const accept = uniq(forms.flatMap((f) => [join(s.es ?? "", f, a.es)]).concat(s.es ? [] : withSubj(s, forms).map((f) => join(f, a.es))));
        const fullAccept = uniq([...accept, ...accept.map((x) => `${time.toLowerCase()} ${x}`)]);
        const frame = sentence(join(time, s.es ?? "", `___ (${inf})`, a.es));
        return {
          prompt: `Fill the gap with the near future of the verb in brackets (either pronoun position):\n\n    ${frame}${s.es ? "" : `\n\n(The subject is ${s.label}.)`}`,
          answer: { type: "text", accept: uniq([...forms, ...fullAccept]), display: forms.join(" / ") },
          solution: [
            `Subject ${s.es ? `*${s.es}*` : s.label} → *ir*: *${irP(s.p)}*; pronoun: *${pron[s.p]}*.`,
            `Pronoun on the end of the infinitive: *${forms[0]}*.`,
            `Or in front of *ir*: *${forms[1]}*. Both are correct.`,
          ],
          hint: "Two jobs: choose the right part of *ir*, and change *-se* to the pronoun that matches the subject.",
          traps: traps(forms, [
            { wrong: [`${irP(s.p)} a ${inf}`], feedback: `*-se* must change to match the subject: *${pron[s.p]}*.` },
            { wrong: [`${irP(s.p)} a ${base}`], feedback: `You've dropped the reflexive pronoun — add *${pron[s.p]}*.` },
          ]),
        };
      }
      const p = rng.pick(tier === 1 ? (["yo", "tú", "nosotros"] as Person[]) : (["yo", "tú", "él", "nosotros", "vosotros", "ellos"] as Person[]));
      const s = PRONOUN_SUBJ[p];
      const accept = acceptedForms(inf, "near-future", p);
      const forms = nf(inf, p);
      return {
        prompt: `Write the near future of *${inf}* for ${s.label}. (Either position of the pronoun is fine.)`,
        answer: { type: "text", accept, display: forms.join(" / ") },
        solution: [
          `*${inf}* is reflexive: *-se* becomes *${pron[p]}* for ${s.label}.`,
          `*ir* → *${irP(p)}* + *a* + *${base}*.`,
          `Glue the pronoun on the end — **${forms[0]}** — or put it before *ir* — **${forms[1]}**.`,
        ],
        hint: "The pronoun must match the person: *me, te, se, nos, os, se*.",
        traps: traps(accept, [
          { wrong: [`${irP(p)} a ${inf}`], feedback: `Change *-se* to the pronoun for ${s.label}: *${pron[p]}*.` },
          { wrong: [`${irP(p)} a ${base}`, `${pron[p]} ${irP(p)} a ${base}${pron[p]}`], feedback: `Use the pronoun exactly once: *${forms[0]}* or *${forms[1]}*.` },
        ]),
      };
    },
  },

  // 6 ---------------------------------------------------------------------
  {
    id: `${T}.negative`,
    topicId: T,
    title: "Negative near future: no voy a…",
    level: 2,
    guideRef: "forming-the-near-future",
    generate(rng, tier) {
      const a = rng.pick(tier === 3 ? [...ACTS, ...REFL_ACTS, ...REFL_ACTS] : ACTS);
      const s = pickSubj(rng, tier, { pronouns: tier === 1 ? ["yo", "tú", "nosotros"] : ["yo", "tú", "nosotros", "vosotros"] });
      const forms = nf(a.inf, s.p);
      const shownForm = rng.pick(forms);
      const positive = sentence(join(s.es ?? "", shownForm, a.es));
      const positives = s.es ? forms.map((f) => join(s.es!, f, a.es)) : withSubj(s, forms).map((f) => join(f, a.es));
      const negForms = forms.map((f) => `no ${f}`);
      const accept = s.es ? negForms.map((f) => join(s.es!, f, a.es)) : withSubj(s, negForms).map((f) => join(f, a.es));
      const canon = sentence(join(s.es ?? "", negForms[0], a.es));
      const refl = forms.length > 1;
      return {
        prompt: `Make this sentence negative (keep everything else the same):\n\n    ${positive}`,
        answer: { type: "text", accept, display: refl ? `${canon} / ${sentence(join(s.es ?? "", negForms[1], a.es))}` : canon },
        solution: [
          "Put *no* straight in front of the part of *ir*.",
          refl ? `With a reflexive, *no* goes before the whole block: *no ${forms[1]}* — or *no ${forms[0]}*.` : "Everything else stays the same.",
          `**${canon}**`,
        ],
        hint: "Where does *no* go in Spanish — before or after the verb that changes?",
        traps: traps(accept, [
          {
            wrong: [join(s.es ?? "", `${irP(s.p)} no a ${forms[0].split(" a ").slice(1).join(" a ")}`, a.es), join(s.es ?? "", `${irP(s.p)} a no ${forms[0].split(" a ").slice(1).join(" a ")}`, a.es)],
            feedback: `*No* goes before the part of *ir*: *no ${irP(s.p)} a…*`,
          },
          { wrong: positives, feedback: "That's still the positive sentence — add *no* in front of the part of *ir*." },
        ]),
      };
    },
  },

  // 7 ---------------------------------------------------------------------
  {
    id: `${T}.translate-to-spanish`,
    topicId: T,
    title: "Translate: 'We are going to swim tomorrow'",
    level: 2,
    guideRef: "forming-the-near-future",
    generate(rng, tier) {
      const simple: Act[] = [
        { inf: "nadar", es: "", en: "" },
        { inf: "bailar", es: "", en: "" },
        { inf: "descansar", es: "", en: "" },
        { inf: "viajar", es: "", en: "" },
        { inf: "estudiar", es: "", en: "" },
        { inf: "cocinar", es: "", en: "" },
        { inf: "cantar", es: "", en: "" },
        { inf: "correr", es: "", en: "" },
        { inf: "leer", es: "", en: "" },
        { inf: "salir", es: "", en: "" },
      ];
      const withObj: Act[] = [
        { inf: "jugar", es: "al fútbol", en: "football" },
        { inf: "jugar", es: "al tenis", en: "tennis" },
        { inf: "ver", es: "una película", en: "a film" },
        { inf: "ir", es: "a la playa", en: "to the beach" },
        { inf: "ir", es: "al cine", en: "to the cinema" },
        { inf: "comer", es: "churros", en: "churros" },
        { inf: "visitar", es: "el museo", en: "the museum" },
      ];
      const refl: Act[] = [
        { inf: "levantarse", es: "", en: "" },
        { inf: "acostarse", es: "", en: "" },
        { inf: "ducharse", es: "", en: "" },
        { inf: "divertirse", es: "", en: "" },
        { inf: "quedarse", es: "en casa", en: "at home" },
      ];
      const a = rng.pick(tier === 1 ? simple : tier === 2 ? [...simple, ...withObj] : [...withObj, ...refl]);
      const p = rng.pick(["yo", "tú", "él", "nosotros", "vosotros", "ellos"] as Person[]);
      const enSubj = p === "él" ? rng.pick(["he", "she"]) : PRONOUN_SUBJ[p].en;
      const esSubj: string[] = p === "él" ? [enSubj === "he" ? "él" : "ella"] : p === "ellos" ? ["ellos", "ellas"] : [...SUBJECT_PRONOUNS[p]];
      const s: Subj = { ...PRONOUN_SUBJ[p], en: enSubj };
      const time = tier === 1 ? null : rng.pick(SENT_TIME);
      const forms = nf(a.inf, p).map((f) => join(f, a.es));
      const cores = uniq([...forms, ...esSubj.flatMap((pr) => forms.map((f) => `${pr} ${f}`))]);
      const times = time ? timeSyn(time.es) : [""];
      const accept = time ? uniq(times.flatMap((t) => cores.flatMap((c) => [`${t} ${c}`, `${c} ${t}`]))) : cores;
      const english = cap(join(enFuture(a.inf, s, a.en), time ? time.en[0] : "")) + ".";
      const youNote = p === "tú" ? " ('you' = *tú*)" : p === "vosotros" ? " ('you all' = *vosotros*)" : "";
      const isRefl = a.inf.endsWith("se");
      const presentWrong = join(conjugate(a.inf, "present", p), a.es);
      const wrongCores = [
        isRefl ? `${irP(p)} a ${join(a.inf.slice(0, -2), a.es)}` : `${irP(p)} a ${presentWrong}`,
        forms[0].replace(`${irP(p)} a `, `${irP(p)} `),
      ];
      const wrongs = time ? wrongCores.flatMap((w) => [`${time.es} ${w}`, `${w} ${time.es}`]) : wrongCores;
      const canon = time ? sentence(`${time.es} ${forms[0]}`) : sentence(forms[0]);
      return {
        prompt: `Translate into Spanish${youNote}: '${english}'`,
        answer: { type: "text", accept, display: canon },
        solution: [
          `'${cap(enSubj)} ${EN_BE[p]} going to' → *${irP(p)} a*.`,
          `Infinitive: *${a.inf}*${a.inf.endsWith("se") ? " — reflexive, so the pronoun matches the subject (glued on or before *ir*)" : ""}${a.es ? ` + *${a.es}*` : ""}.`,
          time ? `Time phrase *${time.es}* at the start or the end → **${canon}**` : `**${canon}**`,
        ],
        hint: "Build the train: the right part of *ir* + *a* + infinitive. The subject pronoun is optional.",
        traps: traps(accept, [
          {
            wrong: [wrongs[0], ...(time ? [wrongs[1]] : [])],
            feedback: isRefl
              ? `*${a.inf}* is reflexive: keep the pronoun, matching the subject — *${forms[0]}*.`
              : `After *a* the verb stays in the infinitive: *${a.inf}*, not *${conjugate(a.inf, "present", p)}*.`,
          },
          { wrong: time ? wrongs.slice(2) : [wrongs[1]], feedback: "You need the little word *a* between *ir* and the infinitive." },
        ]),
      };
    },
  },

  // 8 ---------------------------------------------------------------------
  {
    id: `${T}.que-vas-a-hacer`,
    topicId: T,
    title: "Questions and answers: ¿Qué vas a hacer…?",
    level: 2,
    guideRef: "forming-the-near-future",
    generate(rng, tier) {
      const time = rng.pick(SENT_TIME);
      const ask = rng.bool(tier === 1 ? 0.3 : 0.5);
      if (ask) {
        // Build the question.
        const who = rng.pick([
          { p: "tú" as Person, ask: "Ask your friend Pablo (*tú*) what he is going to do", subj: "" },
          { p: "tú" as Person, ask: "Ask your friend Sofía (*tú*) what she is going to do", subj: "" },
          { p: "vosotros" as Person, ask: "Ask two friends (*vosotros*) what they are going to do", subj: "" },
          { p: "él" as Person, ask: "Ask a friend what his or her brother (*tu hermano*) is going to do", subj: "tu hermano" },
          { p: "ellos" as Person, ask: "Ask a friend what his or her parents (*tus padres*) are going to do", subj: "tus padres" },
          { p: "él" as Person, ask: "Ask what Lucía is going to do", subj: "Lucía" },
        ]);
        const q = `qué ${irP(who.p)} a hacer`;
        const accept = who.subj
          ? [`${q} ${who.subj} ${time.es}`, `${q} ${time.es} ${who.subj}`, `${time.es} qué ${irP(who.p)} a hacer ${who.subj}`]
          : uniq([`${q} ${time.es}`, `${time.es} ${q}`, ...SUBJECT_PRONOUNS[who.p].filter((x) => !["usted", "ustedes"].includes(x)).flatMap((pr) => [`${q} ${pr} ${time.es}`, `${pr} ${q} ${time.es}`])]);
        const display = `¿${cap(accept[0])}?`;
        return {
          prompt: `${who.ask} ${time.en[0]}. Write the question in Spanish.`,
          answer: { type: "text", accept, display },
          solution: [
            "'What' = *¿Qué…?*; 'to do' = *hacer*.",
            `Person: ${who.subj ? `*${who.subj}*` : `*${who.p}*`} → *${irP(who.p)}*.`,
            `**${display}**`,
          ],
          hint: "Start with *¿Qué…?*, then the train: part of *ir* + *a* + *hacer*.",
          traps: traps(accept, [
            { wrong: [`qué ${irP(who.p)} hacer ${who.subj ? who.subj + " " : ""}${time.es}`, `qué ${irP(who.p)} hacer ${time.es}`], feedback: `Missing *a*: *¿Qué ${irP(who.p)}* **a** *hacer?*` },
            { wrong: [`qué ${irP("yo")} a hacer ${time.es}`, `qué ${irP("nosotros")} a hacer ${time.es}`], feedback: "That asks about yourself. Use the form of *ir* for the person you're asking about." },
          ]),
        };
      }
      // Answer the question.
      const qp = rng.pick(tier === 1 ? (["tú"] as Person[]) : (["tú", "vosotros", "tú"] as Person[]));
      const ap: Person = qp === "tú" ? "yo" : "nosotros";
      const a = rng.pick(tier === 3 ? [...ACTS, ...REFL_ACTS.filter((r) => r.inf === "quedarse" || r.inf === "levantarse")] : ACTS);
      const forms = nf(a.inf, ap).map((f) => join(f, a.es));
      const cores = withSubj(PRONOUN_SUBJ[ap], forms);
      const accept = uniq([...cores, ...cores.flatMap((c) => [`${time.es} ${c}`, `${c} ${time.es}`])]);
      const enAct = englishGloss(a.inf, "near-future", ap).replace(/^(I|we) (am|are) going to /, "") + (a.en ? ` ${a.en}` : "");
      const canon = sentence(`${time.es} ${forms[0]}`);
      return {
        prompt: `Your Spanish friend asks: *¿Qué ${irP(qp)} a hacer ${time.es}?*\n\nAnswer that ${ap === "yo" ? "you are" : "you (all) are"} going to ${enAct}. Write a full Spanish sentence.`,
        answer: { type: "text", accept, display: canon },
        solution: [
          `*¿Qué ${irP(qp)} a hacer?* asks about ${qp === "tú" ? "you" : "you all"} → answer with *${irP(ap)}* (${ap}).`,
          `Replace *hacer* with the real activity: *${a.inf}${a.es ? ` ${a.es}` : ""}*.`,
          `**${canon}**`,
        ],
        hint: `The question uses *${irP(qp)}* — what is the matching form when YOU answer?`,
        traps: traps(accept, [
          { wrong: [`${irP(ap)} a hacer ${join(a.inf, a.es)}`, `${time.es} ${irP(ap)} a hacer ${join(a.inf, a.es)}`], feedback: `Swap *hacer* for the activity: *${forms[0]}*, not *${irP(ap)} a hacer ${a.inf}…*` },
          { wrong: [join(nf(a.inf, qp)[0], a.es), `${time.es} ${join(nf(a.inf, qp)[0], a.es)}`], feedback: `*${irP(qp)}* is the form in the question. Answering about ${ap === "yo" ? "yourself" : "your group"} → *${irP(ap)}*.` },
        ]),
      };
    },
  },

  // 9 ---------------------------------------------------------------------
  {
    id: `${T}.predictions`,
    topicId: T,
    title: "Predictions: va a llover, va a ser divertido",
    level: 2,
    guideRef: "plans-and-predictions",
    generate(rng, tier) {
      const weather = rng.bool(tier === 1 ? 0.6 : 0.4);
      if (weather) {
        const W = [
          { es: "llover", en: "it's going to rain", wrong: ["va a llueve"], fb: "After *va a* keep the infinitive: *llover*." },
          { es: "nevar", en: "it's going to snow", wrong: ["va a nieva"], fb: "After *va a* keep the infinitive: *nevar*." },
          { es: "hacer calor", en: "it's going to be hot", wrong: ["va a ser calor", "va a estar calor"], fb: "Weather with *calor / frío / sol / viento* uses *hacer*: *va a hacer calor*." },
          { es: "hacer frío", en: "it's going to be cold", wrong: ["va a ser frío", "va a estar frío"], fb: "Weather uses *hacer*: *va a hacer frío*." },
          { es: "hacer sol", en: "it's going to be sunny", wrong: ["va a ser sol", "va a estar sol"], fb: "Sunny = *hace sol* → *va a hacer sol*." },
          { es: "hacer viento", en: "it's going to be windy", wrong: ["va a ser viento"], fb: "Windy = *hace viento* → *va a hacer viento*." },
          { es: "hacer buen tiempo", en: "the weather is going to be nice", wrong: ["va a ser buen tiempo"], fb: "The weather phrase is *hace buen tiempo* → *va a hacer buen tiempo*." },
          { es: "hacer mal tiempo", en: "the weather is going to be bad", wrong: ["va a ser mal tiempo"], fb: "The weather phrase is *hace mal tiempo* → *va a hacer mal tiempo*." },
          { es: "haber una tormenta", en: "there's going to be a storm", wrong: ["va a hay una tormenta", "va a ser una tormenta"], fb: "*hay* comes from *haber*: 'there's going to be' = *va a haber*." },
        ];
        const w = rng.pick(tier === 1 ? W.slice(0, 5) : W);
        const time = rng.pick(["Mañana", "Esta tarde", "Esta noche", "Este fin de semana", "Pasado mañana", "En Madrid mañana"]);
        const core = `va a ${w.es}`;
        const accept = [core, `${time.toLowerCase()} ${core}`];
        return {
          prompt: `Complete the weather prediction ('${w.en}'):\n\n    ${time} ___.`,
          answer: { type: "text", accept, display: core },
          solution: [
            "Weather has no subject in Spanish ('it' disappears) → *va*.",
            `*va* + *a* + *${w.es}*.`,
            `**${time} ${core}.**`,
          ],
          hint: w.es.startsWith("hacer") ? "Which verb does Spanish use for most weather: *ser*, *estar* or *hacer*?" : "It's the *él / ella* form of *ir* + *a* + the infinitive.",
          traps: traps(accept, [
            { wrong: w.wrong, feedback: w.fb },
            { wrong: [`van a ${w.es}`], feedback: "Weather is 'it' → singular *va*." },
          ]),
        };
      }
      const NOUNS = [
        { es: "la fiesta", en: "The party", g: "f", pl: false },
        { es: "el concierto", en: "The concert", g: "m", pl: false },
        { es: "la excursión", en: "The trip", g: "f", pl: false },
        { es: "el partido", en: "The match", g: "m", pl: false },
        { es: "la película", en: "The film", g: "f", pl: false },
        { es: "el viaje", en: "The journey", g: "m", pl: false },
        { es: "las vacaciones", en: "The holidays", g: "f", pl: true },
        { es: "los exámenes", en: "The exams", g: "m", pl: true },
        { es: "las clases", en: "The lessons", g: "f", pl: true },
      ] as const;
      const ADJ = [
        { m: "divertido", en: "fun" },
        { m: "aburrido", en: "boring" },
        { m: "emocionante", en: "exciting" },
        { m: "genial", en: "great" },
        { m: "interesante", en: "interesting" },
        { m: "fantástico", en: "fantastic" },
        { m: "difícil", en: "difficult" },
      ];
      const n = rng.pick(tier === 1 ? NOUNS.filter((x) => !x.pl) : NOUNS);
      const adj = rng.pick(ADJ);
      const agree = (g: "m" | "f", pl: boolean) => {
        let a = adj.m;
        if (a.endsWith("o") && g === "f") a = a.slice(0, -1) + "a";
        if (pl) a = /[aeo]$/.test(a) ? a + "s" : a === "difícil" ? "difíciles" : a + "es";
        return a;
      };
      const form = agree(n.g, n.pl);
      const verb = n.pl ? "van" : "va";
      const core = `${verb} a ser ${form}`;
      const accept = [core, `${n.es} ${core}`];
      const englishVerb = n.pl ? "are" : "is";
      const why = adj.m.endsWith("o")
        ? `*${adj.m}* agrees: ${n.g === "f" ? "feminine" : "masculine"}${n.pl ? " plural" : ""} → *${form}*.`
        : `*${adj.m}* has one form for masculine and feminine${n.pl ? `; plural → *${form}*` : ""}.`;
      return {
        prompt: `Complete the prediction ('${n.en} ${englishVerb} going to be ${adj.en}'), making the adjective agree:\n\n    ${cap(n.es)} ___ (${adj.m}).`,
        answer: { type: "text", accept, display: core },
        solution: [
          `*${cap(n.es)}* is ${n.pl ? "plural" : "singular"} → *${verb} a ser*.`,
          why,
          `**${cap(n.es)} ${core}.**`,
        ],
        hint: `Check two things: singular or plural (*va / van*), and the gender of *${n.es}*.`,
        traps: traps(accept, [
          { wrong: [`${verb} a ser ${adj.m}`, `${n.pl ? "va" : "van"} a ser ${form}`, `va a ser ${agree(n.g, false)}`], feedback: `Agreement check: *${n.es}* is ${n.g === "f" ? "feminine" : "masculine"} ${n.pl ? "plural" : "singular"} → *${core}*.` },
          { wrong: [`${verb} a estar ${form}`, `${verb} a es ${form}`], feedback: "Describing what an event will be like → *ser*: *va a ser…*" },
        ]),
      };
    },
  },

  // 10 --------------------------------------------------------------------
  {
    id: `${T}.spot-time-frame`,
    topicId: T,
    title: "Present or near future? Spot the time frame",
    level: 2,
    guideRef: "present-vs-future",
    generate(rng, tier) {
      const PRESENT = ["present", "the present", "present tense", "the present tense", "presente", "el presente"];
      const FUTURE = ["future", "near future", "the future", "the near future", "future tense", "immediate future", "the immediate future", "futuro", "futuro inmediato", "el futuro"];
      const kinds = tier === 1 ? ["habit", "plan"] : tier === 2 ? ["habit", "plan", "place"] : ["habit", "plan", "place", "bare-future", "bare-place"];
      const kind = rng.pick(kinds);
      const s = pickSubj(rng, tier, { pronouns: ["yo", "nosotros", "tú"], named: tier >= 2 });
      let text: string;
      let isFuture: boolean;
      let reason: string;
      if (kind === "habit") {
        const a = rng.pick([...ACTS.filter((x) => x.inf !== "ir"), ...(tier >= 2 ? REFL_ACTS : [])]);
        const h = rng.pick(HABIT);
        text = sentence(join(h, s.es ?? "", pres(a.inf, s.p), a.es));
        isFuture = false;
        reason = `*${h}* signals a habit, and *${pres(a.inf, s.p)}* is a present-tense form.`;
      } else if (kind === "plan" || kind === "bare-future") {
        const a = rng.pick([...ACTS, ...(tier >= 2 ? REFL_ACTS : [])]);
        const t = kind === "plan" ? rng.pick(PLAN) : "";
        const f = rng.pick(nf(a.inf, s.p));
        text = sentence(join(t, s.es ?? "", f, a.es));
        isFuture = true;
        reason = `*${f}* is *ir* + *a* + infinitive${t ? `, and *${t}* points to the future` : ""}.`;
      } else {
        const pl = rng.pick(PLACES);
        const h = kind === "place" ? rng.pick(HABIT) : "";
        text = sentence(join(h, s.es ?? "", irP(s.p), toPlace(pl)));
        isFuture = false;
        reason = `After *${irP(s.p)} ${toPlace(pl).split(" ")[0]}* comes a **place** (*${withArt(pl)}*), not an infinitive — so this is just *ir* in the present ('go / am going to ${pl.en}').`;
      }
      const accept = isFuture ? FUTURE : PRESENT;
      return {
        prompt: `Is this sentence in the **present** tense or the **near future**? Type *present* or *future*.\n\n    ${text}`,
        answer: { type: "text", accept, display: isFuture ? "future" : "present" },
        solution: [
          "Check the verb: is it *ir* + *a* + **infinitive**? Then check any time phrase.",
          reason,
          `→ **${isFuture ? "near future" : "present"}**`,
        ],
        hint: "Look at what comes after *a*: an infinitive (future) or a place (present)? And is there a habit phrase like *normalmente*?",
        traps: traps(accept, [
          {
            wrong: isFuture ? PRESENT : FUTURE,
            feedback: isFuture
              ? "Look again: the part of *ir* is followed by *a* + an infinitive — that's the near-future train."
              : kind === "habit"
                ? "The habit phrase and the single present-tense verb show this is what usually happens."
                : "*ir* + *a* + a **place** is the present ('I go / I'm going to…'). The future needs *ir a* + **infinitive**.",
          },
        ]),
      };
    },
  },

  // 11 --------------------------------------------------------------------
  {
    id: `${T}.present-to-future`,
    topicId: T,
    title: "Change a habit (present) into a plan (near future)",
    level: 3,
    guideRef: "present-vs-future",
    generate(rng, tier) {
      const pool = tier === 1 ? ACTS.filter((a) => a.inf !== "ir") : tier === 2 ? ACTS : [...ACTS, ...REFL_ACTS, ...REFL_ACTS];
      const a = rng.pick(pool);
      const s = pickSubj(rng, tier, { pronouns: tier === 1 ? ["yo", "nosotros"] : ["yo", "tú", "nosotros", "vosotros"] });
      const h = rng.pick(HABIT);
      const plan = rng.pick(PLAN);
      const present = pres(a.inf, s.p);
      const given = sentence(join(cap(h), s.es ?? "", present, a.es));
      const forms = nf(a.inf, s.p).map((f) => join(f, a.es));
      const body = s.es ? forms.map((f) => `${s.es} ${f}`) : withSubj(s, forms);
      const accept = body.map((b) => `${plan} ${b}`);
      const canon = sentence(`${plan} ${subjCanon(s, forms[0])}`);
      const isIr = a.inf === "ir";
      return {
        prompt: `Change this habit into a one-off plan. Start with *${cap(plan)}* and use *ir a* + infinitive:\n\n    ${given}`,
        answer: { type: "text", accept, display: forms.length > 1 && a.inf !== "ir" ? `${canon} / ${sentence(`${plan} ${subjCanon(s, forms[1])}`)}` : canon },
        solution: [
          `Find the infinitive: *${present}* → *${a.inf}*.${isIr ? " (Yes — *ir* itself! You go to go.)" : ""}`,
          `Same person, so *ir* → *${irP(s.p)}*; swap *${h}* for *${plan}*.`,
          `**${canon}**${forms.length > 1 && !isIr ? ` (or *${forms[1]}*)` : ""}`,
        ],
        hint: isIr ? "The verb here is *ir* itself — the near future of 'go' is *voy a ir…*" : "Turn the conjugated verb back into its infinitive, then build *ir* + *a* + infinitive.",
        traps: traps(accept, [
          {
            wrong: [`${plan} ${subjCanon(s, join(present, a.es))}`],
            feedback: isIr
              ? `*${present} ${a.es}* is still the present (*ir* + place). The plan needs *${irP(s.p)} a ir ${a.es}*.`
              : "That's possible Spanish, but the task asks for the near future: *ir a* + infinitive.",
          },
          { wrong: [`${plan} ${subjCanon(s, join(irP(s.p), "a", present, a.es))}`], feedback: `Keep the second verb as an infinitive: *${a.inf}*, not *${present}*.` },
        ]),
      };
    },
  },
];
