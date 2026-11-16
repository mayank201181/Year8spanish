// Procedural skill drills for the present tense (topic "presente").
// Every Spanish verb form in an answer comes from the tested conjugator in
// lib/spanish/verbs.ts. The small "regular pattern" helpers below are only used
// to build predictable WRONG answers (traps), never accepted answers.
import type { Drill, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import {
  conjugate,
  acceptedForms,
  englishGloss,
  presentTable,
  verbInfo,
  verbsWithTag,
  PERSONS,
  SUBJECT_PRONOUNS,
  VERBS,
  type Person,
  type VerbInfo,
} from "../spanish/verbs.ts";
import { vocab } from "../vocab/presente.ts";

const TOPIC = "presente";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

/** Same normalisation as the answer checker, so trap guards match marking. */
function norm(s: string): string {
  return s
    .normalize("NFC")
    .toLowerCase()
    .replace(/['‘’`´]/g, "")
    .replace(/[¿?¡!.,;:"“”()…–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function bare(s: string): string {
  return norm(s).normalize("NFD").replace(/[̀-ͯ]/g, "").normalize("NFC");
}

/**
 * Build 1–2 traps, dropping any that equal an accepted answer or differ from
 * one only by accents (the checker already nudges "check your accents").
 */
function makeTraps(accept: string[], list: Array<[string | string[], string]>): Trap[] {
  const ok = new Set(accept.map(bare));
  const seen = new Set<string>();
  const out: Trap[] = [];
  for (const [ans, feedback] of list) {
    const arr = (Array.isArray(ans) ? ans : [ans]).filter((a) => a && !ok.has(bare(a)));
    if (!arr.length) continue;
    const key = bare(arr[0]);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ spec: { type: "text", accept: arr }, feedback });
    if (out.length === 2) break;
  }
  return out;
}

const uniq = (xs: string[]) => [...new Set(xs)];
const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);

const PRES = (inf: string, p: Person) => conjugate(inf, "present", p);

/** How a person is named in prompts. */
const P_NAME: Record<Person, string> = {
  yo: "yo",
  tú: "tú",
  él: "él / ella",
  nosotros: "nosotros",
  vosotros: "vosotros",
  ellos: "ellos / ellas",
};
const P_EN: Record<Person, string> = {
  yo: "I",
  tú: "you (one friend)",
  él: "he / she",
  nosotros: "we",
  vosotros: "you all (friends, in Spain)",
  ellos: "they",
};

const IDX: Record<Person, number> = { yo: 0, tú: 1, él: 2, nosotros: 3, vosotros: 4, ellos: 5 };
const ENDINGS: Record<"ar" | "er" | "ir", readonly string[]> = {
  ar: ["o", "as", "a", "amos", "áis", "an"],
  er: ["o", "es", "e", "emos", "éis", "en"],
  ir: ["o", "es", "e", "imos", "ís", "en"],
};
const PRONOUN: Record<Person, string> = { yo: "me", tú: "te", él: "se", nosotros: "nos", vosotros: "os", ellos: "se" };

const inBoot = (p: Person) => p !== "nosotros" && p !== "vosotros";

function info(inf: string): VerbInfo {
  const v = verbInfo(inf);
  if (!v) throw new Error(`Unknown verb ${inf}`);
  return v;
}
function baseInf(inf: string): string {
  return info(inf).reflexive ? inf.slice(0, -2) : inf;
}
function stemOf(inf: string): string {
  return baseInf(inf).slice(0, -2);
}
function endingOf(inf: string, p: Person): string {
  return ENDINGS[info(inf).group][IDX[p]];
}
/** The verb form without its reflexive pronoun. */
function verbOnly(form: string): string {
  const parts = form.split(" ");
  return parts[parts.length - 1];
}

type StemType = "e-ie" | "o-ue" | "u-ue" | "e-i";
function stemType(inf: string): StemType | undefined {
  const t = info(inf).tags.find((x) => x.startsWith("stem-"));
  return t ? (t.slice(5) as StemType) : undefined;
}
const STEM_LABEL: Record<StemType, string> = { "e-ie": "e → ie", "o-ue": "o → ue", "u-ue": "u → ue", "e-i": "e → i" };
const aStem = (t: StemType) => (t === "u-ue" ? "a" : "an") + " " + STEM_LABEL[t];
const BOOT: Record<StemType, [string, string]> = { "e-ie": ["e", "ie"], "o-ue": ["o", "ue"], "u-ue": ["u", "ue"], "e-i": ["e", "i"] };

function replaceLast(s: string, from: string, to: string): string {
  const i = s.lastIndexOf(from);
  return i < 0 ? s : s.slice(0, i) + to + s.slice(i + from.length);
}
/** TRAP helper: the stem changed (or not) the wrong way. */
function changedStem(inf: string): string {
  const t = stemType(inf);
  return t ? replaceLast(stemOf(inf), ...BOOT[t]) : stemOf(inf);
}
/** TRAP helper: plain stem + regular ending (what you'd write if you forgot it was irregular / a boot verb). */
function regularPattern(inf: string, p: Person): string {
  const f = stemOf(inf) + endingOf(inf, p);
  return info(inf).reflexive ? `${PRONOUN[p]} ${f}` : f;
}
/** TRAP helper: stem change applied in every person (wrong for nosotros / vosotros). */
function bootEverywhere(inf: string, p: Person): string {
  const f = changedStem(inf) + endingOf(inf, p);
  return info(inf).reflexive ? `${PRONOUN[p]} ${f}` : f;
}

function pickPerson(rng: Rng, tier: 1 | 2 | 3): Person {
  return tier === 1 ? rng.pick(PERSONS.filter((p) => p !== "vosotros")) : rng.pick(PERSONS);
}

// Subjects for sentence frames, by person (lower case; capitalised at sentence start).
const SUBJECTS: Record<Person, readonly string[]> = {
  yo: ["yo"],
  tú: ["tú"],
  él: ["mi hermano", "mi hermana", "Lucía", "Diego", "mi madre", "Arjun"],
  nosotros: ["mi amiga y yo", "Pablo y yo", "nosotros"],
  vosotros: ["vosotros", "vosotras"],
  ellos: ["mis padres", "mis primos", "Carmen y Javier", "mis amigos"],
};

interface Frame {
  inf: string;
  pre?: string;
  mid?: string;
  post: string;
}
function frameSentence(f: Frame, subj: string): string {
  const parts = [f.pre, subj, f.mid, `___ (${f.inf})`, f.post].filter(Boolean).join(" ");
  return cap(parts) + ".";
}

// ---------------------------------------------------------------------------
// Verb pools
// ---------------------------------------------------------------------------

const REG_CORE = [
  "hablar", "escuchar", "ayudar", "limpiar", "cocinar", "estudiar", "trabajar", "ordenar",
  "comer", "beber", "aprender", "correr", "comprender", "leer",
  "vivir", "escribir", "compartir", "abrir", "subir", "recibir",
];
const NOT_REGULAR_PRESENT = ["irregular", "yo-go", "accent-i", "spelling-ger", "spelling-gu"];
const REG_ALL = VERBS.filter(
  (v) => !v.reflexive && !v.tags.some((t) => t.startsWith("stem-") || NOT_REGULAR_PRESENT.includes(t)),
).map((v) => v.inf);

const BOOT_CORE = ["querer", "preferir", "empezar", "pensar", "poder", "volver", "dormir", "jugar", "pedir"];
const BOOT_EXCLUDE = ["tener", "venir", "decir", "seguir"]; // irregular yo forms
const BOOT_ALL = ["stem-e-ie", "stem-o-ue", "stem-u-ue", "stem-e-i"]
  .flatMap((t) => verbsWithTag(t))
  .filter((v) => !v.reflexive && !BOOT_EXCLUDE.includes(v.inf))
  .map((v) => v.inf);
const BOOT_REFLEXIVE = ["despertarse", "acostarse", "vestirse", "divertirse"];

const REFLEXIVE_REG = ["levantarse", "ducharse", "lavarse", "bañarse", "peinarse", "llamarse", "quedarse"];

const IRREG_T1 = ["ser", "estar", "tener", "ir", "hacer"];
const IRREG_T2 = [...IRREG_T1, "ver", "dar"];
const IRREG_T3 = [...IRREG_T2, "salir", "poner", "venir", "decir"];

// Short English meaning for prompts: "to eat".
const MEANING: Record<string, string> = {
  ser: "to be — what something is like",
  estar: "to be — where it is, how it is now",
  navegar: "to surf the internet",
  poner: "to put",
};
const meaning = (inf: string) => MEANING[inf] ?? info(inf).en.split(/, (?![^()]*\))/)[0];

// ---------------------------------------------------------------------------
// 1. Regular verbs
// ---------------------------------------------------------------------------

const REG_FRAMES: Frame[] = [
  { inf: "hablar", post: "inglés y español" },
  { inf: "escuchar", post: "música en el móvil" },
  { inf: "ayudar", post: "en casa los fines de semana" },
  { inf: "limpiar", post: "la cocina los sábados" },
  { inf: "cocinar", post: "paella de verduras los domingos" },
  { inf: "estudiar", post: "en la biblioteca" },
  { inf: "trabajar", post: "en el centro" },
  { inf: "comer", post: "en casa a las dos" },
  { inf: "beber", post: "mucha agua" },
  { inf: "leer", pre: "por la noche", post: "en la cama" },
  { inf: "aprender", post: "mucho en clase" },
  { inf: "correr", post: "en el parque" },
  { inf: "vivir", post: "cerca de la estación de MRT" },
  { inf: "escribir", post: "mensajes en el móvil" },
  { inf: "abrir", post: "la ventana" },
  { inf: "ordenar", post: "el salón" },
];

function regularTraps(inf: string, p: Person, accept: string[]): Trap[] {
  const g = info(inf).group;
  const stem = stemOf(inf);
  let wrongGroup: "ar" | "er" | "ir";
  if (g === "ar") wrongGroup = "er";
  else if (g === "er") wrongGroup = p === "nosotros" || p === "vosotros" ? "ir" : "ar";
  else wrongGroup = p === "nosotros" || p === "vosotros" ? "er" : "ar";
  const wrong = stem + ENDINGS[wrongGroup][IDX[p]];
  return makeTraps(accept, [
    [wrong, `That's an *-${wrongGroup}* ending, but *${inf}* is an *-${g}* verb. Use the *-${g}* ending for *${P_NAME[p]}*: *-${endingOf(inf, p)}*.`],
    [inf, "That's still the infinitive. Chop off the last two letters and add the ending for the person."],
  ]);
}

const regularForms: Drill = {
  id: `${TOPIC}.regular-forms`,
  topicId: TOPIC,
  title: "Regular -ar, -er, -ir verbs: stem + ending",
  level: 1,
  guideRef: "regular-verbs",
  generate(rng, tier) {
    const useFrame = tier === 3 && rng.bool(0.6);
    const p = pickPerson(rng, tier);
    const frame = useFrame ? rng.pick(REG_FRAMES) : undefined;
    const inf = frame ? frame.inf : rng.pick(tier === 1 ? REG_CORE : REG_ALL);
    const form = PRES(inf, p);
    const accept = acceptedForms(inf, "present", p);
    const g = info(inf).group;
    const subj = rng.pick(SUBJECTS[p]);
    const prompt = frame
      ? `Fill the gap with the present tense of the verb in brackets:\n\n*${frameSentence(frame, subj)}*`
      : `Write the *${P_NAME[p]}* form of *${inf}* (${meaning(inf)}) in the present tense.`;
    return {
      prompt,
      answer: { type: "text", accept },
      solution: [
        frame ? `The subject is *${subj}* → the *${P_NAME[p]}* form.` : `*${inf}* is a regular *-${g}* verb.`,
        `Chop off *-${g}* → stem *${stemOf(inf)}-*.`,
        `The *${P_NAME[p]}* ending for *-${g}* verbs is *-${endingOf(inf, p)}*.`,
        `*${stemOf(inf)}-* + *-${endingOf(inf, p)}* → **${form}**`,
      ],
      hint: `Find the stem (drop *-${g}*), then add the *-${g}* ending that matches *${P_NAME[p]}*.`,
      traps: regularTraps(inf, p, accept),
    };
  },
};

// ---------------------------------------------------------------------------
// 2. Ending detective: which person?
// ---------------------------------------------------------------------------

const PERSON_ANSWERS: Record<Person, string[]> = {
  yo: ["yo"],
  tú: ["tú"],
  él: ["él", "ella", "usted", "él/ella", "él o ella", "ella/él"],
  nosotros: ["nosotros", "nosotras"],
  vosotros: ["vosotros", "vosotras"],
  ellos: ["ellos", "ellas", "ustedes", "ellos/ellas", "ellos o ellas"],
};
const PERSON_TRAP: Record<Person, [string, string]> = {
  yo: ["él", "The ending *-o* (or *-oy*, as in *soy, voy*) belongs to *yo*: 'I'."],
  tú: ["vosotros", "Just *-s* on the end (no *-is*) is *tú*: one friend. *Vosotros* forms end in *-áis, -éis, -ís* (or *-is*)."],
  él: ["ellos", "There's no *-n* on the end, so it's just one person: *él / ella*."],
  nosotros: ["ellos", "*-mos* always means 'we': *nosotros*."],
  vosotros: ["tú", "The *-is* ending (*-áis, -éis, -ís*) is the 'you all' form: *vosotros*. *Tú* ends in just *-s*."],
  ellos: ["él", "The *-n* on the end makes it plural: *ellos / ellas*."],
};

const endingDetective: Drill = {
  id: `${TOPIC}.ending-detective`,
  topicId: TOPIC,
  title: "Read the ending: who is doing the action?",
  level: 1,
  guideRef: "regular-verbs",
  generate(rng, tier) {
    const pool =
      tier === 1 ? REG_CORE : tier === 2 ? [...REG_ALL, ...BOOT_CORE, ...IRREG_T2] : [...REG_ALL, ...BOOT_ALL, ...IRREG_T3, ...REFLEXIVE_REG, ...BOOT_REFLEXIVE];
    let inf = pool[0];
    let p: Person = "yo";
    for (let i = 0; i < 30; i++) {
      inf = rng.pick(pool);
      p = rng.pick(PERSONS);
      const table = presentTable(inf);
      const form = table[p];
      if (PERSONS.filter((q) => table[q] === form).length === 1) break;
    }
    const form = PRES(inf, p);
    const accept = PERSON_ANSWERS[p];
    const v = verbOnly(form);
    const end = endingOf(inf, p);
    const regularEnding = v.endsWith(end);
    const steps = [
      regularEnding
        ? `Look at the ending: *${v.slice(0, v.length - end.length)}-* + *-${end}*. *-${end}* is the *${P_NAME[p]}* ending for *-${info(inf).group}* verbs.`
        : `*${v}* is an irregular form of *${baseInf(inf)}* — learn it with its table: ${PERSONS.map((q) => `*${PRES(inf, q)}*`).join(", ")}.`,
    ];
    if (info(inf).reflexive) steps.push(`The pronoun *${PRONOUN[p]}* matches *${P_NAME[p]}* too.`);
    steps.push(`*${form}* = '${englishGloss(inf, "present", p)}' → **${p === "él" ? "él / ella" : p === "ellos" ? "ellos / ellas" : p}**`);
    return {
      prompt: `Who is doing the action in *${form}* (from *${inf}*, ${meaning(inf)})? Type the subject pronoun: *yo, tú, él, ella, nosotros, vosotros, ellos* or *ellas*.`,
      answer: { type: "text", accept },
      solution: steps,
      hint: "Ignore the stem and look only at the last letters: *-o* = I, *-s* = you, *-mos* = we, *-is* = you all, *-n* = they.",
      traps: makeTraps(accept, [PERSON_TRAP[p]]),
    };
  },
};

// ---------------------------------------------------------------------------
// 3. Key irregular verbs
// ---------------------------------------------------------------------------

function irregularTrapFeedback(inf: string, p: Person): string {
  if (info(inf).tags.includes("yo-go") && p === "yo") return `*${inf}* is a '-go' verb: the *yo* form ends in *-go* → *${PRES(inf, p)}*.`;
  if (stemType(inf) && inBoot(p)) return `*${inf}* is a boot verb (${STEM_LABEL[stemType(inf)!]}), so the stem changes for *${P_NAME[p]}* → *${PRES(inf, p)}*.`;
  return `*${inf}* doesn't follow the regular pattern here — the form is *${PRES(inf, p)}*.`;
}
const REG_TRAP_VERBS = ["tener", "hacer", "ver", "dar", "estar", "salir", "poner", "venir", "decir"];

const keyIrregulars: Drill = {
  id: `${TOPIC}.key-irregulars`,
  topicId: TOPIC,
  title: "Key irregular verbs: ser, estar, tener, ir, hacer, ver, dar",
  level: 1,
  guideRef: "key-irregulars",
  generate(rng, tier) {
    const inf = rng.pick(tier === 1 ? IRREG_T1 : tier === 2 ? IRREG_T2 : IRREG_T3);
    const p = pickPerson(rng, tier);
    const form = PRES(inf, p);
    const accept = acceptedForms(inf, "present", p);
    const table = PERSONS.map((q) => PRES(inf, q)).join(", ");
    const list: Array<[string, string]> = [];
    if (REG_TRAP_VERBS.includes(inf)) list.push([regularPattern(inf, p), irregularTrapFeedback(inf, p)]);
    if (inf === "ser" && p !== "él") list.push([PRES("ser", "él"), `*es* is the *él / ella* form. For *${P_NAME[p]}* you need *${form}*.`]);
    if (inf === "ir" && p !== "yo") list.push(["voy", `*voy* is only 'I go'. For *${P_NAME[p]}* you need *${form}*.`]);
    list.push([inf, "That's the infinitive. You need the form that matches the person."]);
    return {
      prompt: `Write the *${P_NAME[p]}* form of *${inf}* (${meaning(inf)}) in the present tense.`,
      answer: { type: "text", accept },
      solution: [
        info(inf).tags.includes("yo-go") && !stemType(inf)
          ? `Only the *yo* form of *${inf}* is irregular (*${PRES(inf, "yo")}*); the rest follow the regular *-${info(inf).group}* pattern: ${table}.`
          : info(inf).tags.includes("yo-go")
            ? `*${inf}* has an irregular *yo* form (*${PRES(inf, "yo")}*) and is a boot verb (${STEM_LABEL[stemType(inf)!]}) in the other boot persons: ${table}.`
            : `*${inf}* is irregular, so learn the whole pattern: ${table}.`,
        `Count down to *${P_NAME[p]}* (yo, tú, él, nosotros, vosotros, ellos).`,
        `→ **${form}**`,
      ],
      hint: `Say the six forms of *${inf}* aloud in order: yo, tú, él, nosotros, vosotros, ellos.`,
      traps: makeTraps(accept, list),
    };
  },
};

// ---------------------------------------------------------------------------
// 4. Yo-go verbs in sentences
// ---------------------------------------------------------------------------

const YO_GO_FRAMES: Frame[] = [
  { inf: "hacer", post: "los deberes después del colegio" },
  { inf: "hacer", post: "natación los sábados" },
  { inf: "hacer", post: "la cama por la mañana" },
  { inf: "poner", post: "la mesa antes de cenar" },
  { inf: "poner", post: "la ropa en el armario" },
  { inf: "salir", post: "de casa a las ocho" },
  { inf: "salir", post: "con amigos los viernes" },
  { inf: "tener", post: "clase de español los lunes" },
  { inf: "tener", post: "un perro y dos gatos" },
  { inf: "venir", post: "al colegio en autobús" },
  { inf: "venir", post: "a la fiesta" },
  { inf: "decir", mid: "siempre", post: "la verdad" },
  { inf: "decir", mid: "nunca", post: "mentiras" },
];

const yoGoVerbs: Drill = {
  id: `${TOPIC}.yo-go-verbs`,
  topicId: TOPIC,
  title: "Yo-go verbs in sentences: hago, pongo, salgo, tengo, vengo, digo",
  level: 2,
  guideRef: "key-irregulars",
  generate(rng, tier) {
    const f = rng.pick(YO_GO_FRAMES);
    const p: Person = tier === 1 ? "yo" : tier === 2 ? (rng.bool(0.5) ? "yo" : pickPerson(rng, 2)) : rng.pick(PERSONS);
    const showYoAtEnd = p === "yo" && rng.bool(0.5);
    const subj = showYoAtEnd ? "" : rng.pick(SUBJECTS[p]);
    const sentence = frameSentence(f, subj) + (showYoAtEnd ? " (yo)" : "");
    const form = PRES(f.inf, p);
    const accept = acceptedForms(f.inf, "present", p);
    const yoForm = PRES(f.inf, "yo");
    const list: Array<[string, string]> = [];
    if (p === "yo") list.push([regularPattern(f.inf, "yo"), `*${f.inf}* is a '-go' verb: only the *yo* form is special → *${yoForm}*.`]);
    else {
      list.push([yoForm, `*${yoForm}* is only the *yo* form. The '-go' disappears for the other persons: *${P_NAME[p]}* → *${form}*.`]);
      if (stemType(f.inf) && inBoot(p)) list.push([regularPattern(f.inf, p), `*${f.inf}* is also a boot verb (${STEM_LABEL[stemType(f.inf)!]}) → *${form}*.`]);
    }
    return {
      prompt: `Fill the gap with the present tense of the verb in brackets:\n\n*${sentence}*`,
      answer: { type: "text", accept },
      solution: [
        `Who? ${subj ? `*${subj}*` : "*yo*"} → the *${P_NAME[p]}* form.`,
        p === "yo"
          ? `*${f.inf}* is a '-go' verb: the *yo* form ends in *-go* → **${form}**.`
          : `The '-go' is for *yo* only (*${yoForm}*). For *${P_NAME[p]}*: **${form}**.`,
      ],
      hint: p === "yo" ? "This is one of the verbs whose *yo* form ends in *-go*." : "The special '-go' ending belongs to *yo* only — check who the subject is.",
      traps: makeTraps(accept, list),
    };
  },
};

// ---------------------------------------------------------------------------
// 5. Stem-changing (boot) verbs
// ---------------------------------------------------------------------------

const BOOT_FRAMES: Frame[] = [
  { inf: "querer", post: "ir al cine" },
  { inf: "preferir", post: "la natación al fútbol" },
  { inf: "empezar", post: "a estudiar a las cinco" },
  { inf: "pensar", post: "que el pueblo es bonito" },
  { inf: "poder", mid: "no", post: "salir hoy" },
  { inf: "volver", post: "a casa en autobús" },
  { inf: "dormir", post: "ocho horas" },
  { inf: "jugar", pre: "los sábados", post: "al bádminton" },
  { inf: "pedir", pre: "en la cafetería", post: "un zumo de naranja" },
  { inf: "almorzar", post: "a la una" },
  { inf: "fregar", pre: "después de cenar", post: "los platos" },
  { inf: "merendar", pre: "a las cinco", post: "fruta" },
];

function bootSolution(inf: string, p: Person): string[] {
  const t = stemType(inf)!;
  const form = PRES(inf, p);
  const v = verbOnly(form);
  return [
    `*${baseInf(inf)}* is ${aStem(t)} boot verb.`,
    inBoot(p)
      ? `*${P_NAME[p]}* is inside the boot → the stem *${stemOf(inf)}-* becomes *${changedStem(inf)}-*.`
      : `*${P_NAME[p]}* is outside the boot → the stem stays *${stemOf(inf)}-*.`,
    `Add the regular *-${info(inf).group}* ending *-${endingOf(inf, p)}*${v !== form ? ` (with the pronoun *${PRONOUN[p]}*)` : ""} → **${form}**`,
  ];
}
function bootTraps(inf: string, p: Person, accept: string[]): Trap[] {
  const t = stemType(inf)!;
  return makeTraps(accept, [
    inBoot(p)
      ? [regularPattern(inf, p), `*${P_NAME[p]}* is inside the boot, so the stem changes (${STEM_LABEL[t]}) → *${PRES(inf, p)}*.`]
      : [bootEverywhere(inf, p), `*${P_NAME[p]}* is outside the boot: *nosotros* and *vosotros* keep the infinitive's stem → *${PRES(inf, p)}*.`],
    [inf, "That's the infinitive. You need the form that matches the person."],
  ]);
}

const stemChangers: Drill = {
  id: `${TOPIC}.stem-changers`,
  topicId: TOPIC,
  title: "Stem-changing verbs: e→ie, o→ue, u→ue, e→i",
  level: 2,
  guideRef: "stem-changing-verbs",
  generate(rng, tier) {
    const useFrame = tier === 3 && rng.bool(0.6);
    const frame = useFrame ? rng.pick(BOOT_FRAMES) : undefined;
    const inf = frame ? frame.inf : rng.pick(tier === 1 ? BOOT_CORE : BOOT_ALL);
    const p: Person = tier === 1 ? (rng.bool(0.7) ? rng.pick(["yo", "tú", "él", "ellos"] as const) : "nosotros") : rng.pick(PERSONS);
    const accept = acceptedForms(inf, "present", p);
    const t = stemType(inf)!;
    const subj = rng.pick(SUBJECTS[p]);
    const prompt = frame
      ? `Fill the gap with the present tense of the verb in brackets:\n\n*${frameSentence(frame, subj)}*`
      : tier === 1
        ? `*${inf}* (${meaning(inf)}) is ${aStem(t)} boot verb. Write the *${P_NAME[p]}* form in the present tense.`
        : `Write the *${P_NAME[p]}* form of *${inf}* (${meaning(inf)}) in the present tense. Watch out: it's a boot verb.`;
    return {
      prompt,
      answer: { type: "text", accept },
      solution: frame ? [`The subject is *${subj}* → *${P_NAME[p]}*.`, ...bootSolution(inf, p)] : bootSolution(inf, p),
      hint: `Is *${P_NAME[p]}* inside the boot (yo, tú, él, ellos) or outside it (nosotros, vosotros)?`,
      traps: bootTraps(inf, p, accept),
    };
  },
};

// ---------------------------------------------------------------------------
// 6. Inside or outside the boot?
// ---------------------------------------------------------------------------

const bootSpotter: Drill = {
  id: `${TOPIC}.inside-the-boot`,
  topicId: TOPIC,
  title: "Inside or outside the boot? Spot and fix the stem",
  level: 2,
  guideRef: "stem-changing-verbs",
  generate(rng, tier) {
    const pool = tier === 1 ? BOOT_CORE : tier === 2 ? BOOT_ALL : [...BOOT_ALL, ...BOOT_REFLEXIVE];
    const inf = rng.pick(pool);
    const p = rng.pick(PERSONS);
    const t = stemType(inf)!;
    const form = PRES(inf, p);
    const inside = inBoot(p);
    if (tier === 1) {
      const where = inside ? "inside" : "outside";
      const other = inside ? "outside" : "inside";
      const accept = [where, `${where} the boot`];
      return {
        prompt: `*${inf}* (${meaning(inf)}) is ${aStem(t)} boot verb. Is the *${P_NAME[p]}* form **inside** the boot (the stem changes) or **outside** it (the stem stays the same)? Type *inside* or *outside*.`,
        answer: { type: "text", accept },
        solution: [
          "The boot = *yo, tú, él / ella, ellos / ellas*. Outside = *nosotros, vosotros*.",
          `*${P_NAME[p]}* → **${where}** the boot.`,
          inside ? `So the stem changes: *${form}*.` : `So the stem stays as in the infinitive: *${form}*.`,
        ],
        hint: "Picture the table: yo, tú, él down the left; nosotros, vosotros, ellos down the right. The boot is the left column plus ellos.",
        traps: makeTraps(accept, [
          [[other, `${other} the boot`], inside ? `Only *nosotros* and *vosotros* sit outside the boot. *${P_NAME[p]}* is inside, so the stem changes: *${form}*.` : `*nosotros* and *vosotros* are outside the boot, so the stem doesn't change: *${form}*.`],
        ]),
      };
    }
    const wrong = inside ? regularPattern(inf, p) : bootEverywhere(inf, p);
    const accept = acceptedForms(inf, "present", p);
    return {
      prompt: `A classmate wrote *${wrong}* for the *${P_NAME[p]}* form of *${inf}* (${meaning(inf)}). It's wrong! Is *${P_NAME[p]}* inside or outside the boot? Write the correct form.`,
      answer: { type: "text", accept },
      solution: [
        `*${baseInf(inf)}* is ${aStem(t)} boot verb.`,
        inside
          ? `*${P_NAME[p]}* is **inside** the boot, so the stem must change: *${stemOf(inf)}-* → *${changedStem(inf)}-*. Your classmate forgot.`
          : `*${P_NAME[p]}* is **outside** the boot, so the stem must NOT change: keep *${stemOf(inf)}-*. Your classmate changed it.`,
        `→ **${form}**`,
      ],
      hint: "The boot = yo, tú, él, ellos. Only nosotros and vosotros keep the infinitive's stem.",
      traps: makeTraps(accept, [[wrong, "That's the classmate's form copied out — fix the stem first."]]),
    };
  },
};

// ---------------------------------------------------------------------------
// 7. Reflexive verbs
// ---------------------------------------------------------------------------

const REFL_FRAMES: Frame[] = [
  { inf: "levantarse", pre: "los lunes", post: "a las siete" },
  { inf: "ducharse", post: "por la mañana" },
  { inf: "acostarse", post: "a las diez y media" },
  { inf: "despertarse", post: "temprano" },
  { inf: "vestirse", post: "muy rápido" },
  { inf: "divertirse", pre: "en la fiesta", post: "mucho" },
  { inf: "lavarse", post: "los dientes después de comer" },
  { inf: "quedarse", pre: "los domingos", post: "en casa" },
];

const reflexives: Drill = {
  id: `${TOPIC}.reflexive-verbs`,
  topicId: TOPIC,
  title: "Reflexive verbs: pronoun + verb (me levanto, nos acostamos)",
  level: 2,
  guideRef: "reflexive-verbs",
  generate(rng, tier) {
    const useFrame = tier === 3 && rng.bool(0.6);
    const frame = useFrame ? rng.pick(REFL_FRAMES) : undefined;
    const inf = frame ? frame.inf : rng.pick(tier === 1 ? REFLEXIVE_REG : [...REFLEXIVE_REG, ...BOOT_REFLEXIVE]);
    const p = pickPerson(rng, tier);
    const form = PRES(inf, p);
    const v = verbOnly(form);
    const accept = acceptedForms(inf, "present", p);
    const subj = rng.pick(SUBJECTS[p]);
    const wrongPron = p === "yo" ? "se" : "me";
    const list: Array<[string, string]> = [
      [v, `Don't forget the reflexive pronoun: *${PRONOUN[p]} ${v}*. Reflexive = the action bounces back to the subject.`],
      [`${wrongPron} ${v}`, `The pronoun must match the person: *${P_NAME[p]}* → *${PRONOUN[p]}*.`],
    ];
    if (stemType(inf) && inBoot(p)) list.unshift([regularPattern(inf, p), `*${inf}* is a boot verb too (${STEM_LABEL[stemType(inf)!]}) → *${form}*.`]);
    const steps = [
      frame ? `The subject is *${subj}* → *${P_NAME[p]}* → pronoun *${PRONOUN[p]}*.` : `*${inf}* is reflexive: drop *-se* and put the matching pronoun in front. *${P_NAME[p]}* → *${PRONOUN[p]}*.`,
      stemType(inf)
        ? `*${baseInf(inf)}* is ${aStem(stemType(inf)!)} boot verb; *${P_NAME[p]}* is ${inBoot(p) ? "inside" : "outside"} the boot → *${v}*.`
        : `Conjugate *${baseInf(inf)}* like a regular *-${info(inf).group}* verb → *${v}*.`,
      `Pronoun + verb → **${form}**`,
    ];
    return {
      prompt: frame
        ? `Fill the gap with the present tense of the reflexive verb in brackets (include the pronoun):\n\n*${frameSentence(frame, subj)}*`
        : `Write the *${P_NAME[p]}* form of *${inf}* (${meaning(inf)}) in the present tense. Include the reflexive pronoun.`,
      answer: { type: "text", accept },
      solution: steps,
      hint: "me, te, se, nos, os, se — the pronoun goes in front of the verb and matches the person.",
      traps: makeTraps(accept, list),
    };
  },
};

// ---------------------------------------------------------------------------
// 8. Ser vs estar
// ---------------------------------------------------------------------------

type Kind = "person" | "home" | "room" | "town" | "place";
interface SeSubj {
  es: string;
  p: Person;
  g: "m" | "f";
  pl: boolean;
  kind: Kind;
}
const SE_SUBJECTS: SeSubj[] = [
  { es: "yo", p: "yo", g: "m", pl: false, kind: "person" },
  { es: "yo", p: "yo", g: "f", pl: false, kind: "person" },
  { es: "tú", p: "tú", g: "m", pl: false, kind: "person" },
  { es: "tú", p: "tú", g: "f", pl: false, kind: "person" },
  { es: "mi hermano", p: "él", g: "m", pl: false, kind: "person" },
  { es: "mi abuela", p: "él", g: "f", pl: false, kind: "person" },
  { es: "Diego", p: "él", g: "m", pl: false, kind: "person" },
  { es: "Sofía", p: "él", g: "f", pl: false, kind: "person" },
  { es: "Pablo y yo", p: "nosotros", g: "m", pl: true, kind: "person" },
  { es: "mi amiga y yo", p: "nosotros", g: "f", pl: true, kind: "person" },
  { es: "vosotros", p: "vosotros", g: "m", pl: true, kind: "person" },
  { es: "vosotras", p: "vosotros", g: "f", pl: true, kind: "person" },
  { es: "mis padres", p: "ellos", g: "m", pl: true, kind: "person" },
  { es: "mis primas", p: "ellos", g: "f", pl: true, kind: "person" },
  { es: "mi casa", p: "él", g: "f", pl: false, kind: "home" },
  { es: "mi piso", p: "él", g: "m", pl: false, kind: "home" },
  { es: "mi dormitorio", p: "él", g: "m", pl: false, kind: "room" },
  { es: "la cocina", p: "él", g: "f", pl: false, kind: "room" },
  { es: "Sevilla", p: "él", g: "f", pl: false, kind: "town" },
  { es: "Málaga", p: "él", g: "f", pl: false, kind: "town" },
  { es: "mi pueblo", p: "él", g: "m", pl: false, kind: "town" },
  { es: "las tiendas", p: "ellos", g: "f", pl: true, kind: "place" },
  { es: "el parque", p: "él", g: "m", pl: false, kind: "place" },
  { es: "la biblioteca", p: "él", g: "f", pl: false, kind: "place" },
];

interface SeComp {
  /** m sg, f sg, m pl, f pl */
  forms: [string, string, string, string];
  verb: "ser" | "estar";
  kinds: Kind[];
  reason: string;
  /** People: a temporary state (used with "hoy" in two-gap sentences). */
  state?: boolean;
}
const inv = (s: string): [string, string, string, string] => [s, s, s, s];
const adjO = (stem: string, pre = ""): [string, string, string, string] => [`${pre}${stem}o`, `${pre}${stem}a`, `${pre}${stem}os`, `${pre}${stem}as`];
const adjE = (w: string, pre = ""): [string, string, string, string] => [`${pre}${w}`, `${pre}${w}`, `${pre}${w}s`, `${pre}${w}s`];

const LOC = "location (where it is) → *estar*, even if it never moves";
const STATE = "how someone is right now (a temporary state or mood) → *estar*";
const NOW = "the state something is in right now → *estar*";
const DESC = "what it's like (a description / characteristic) → *ser*";
const PERS = "what someone is like (personality / appearance) → *ser*";
const SE_COMPS: SeComp[] = [
  { forms: inv("en el centro"), verb: "estar", kinds: ["person", "home", "place"], reason: LOC },
  { forms: inv("cerca de la playa"), verb: "estar", kinds: ["person", "home", "place"], reason: LOC },
  { forms: inv("en el sur de España"), verb: "estar", kinds: ["town"], reason: LOC },
  { forms: inv("en Andalucía"), verb: "estar", kinds: ["town"], reason: LOC },
  { forms: inv("al lado del salón"), verb: "estar", kinds: ["room"], reason: LOC },
  { forms: inv("en casa"), verb: "estar", kinds: ["person"], reason: LOC },
  { forms: adjO("cansad"), verb: "estar", kinds: ["person"], reason: STATE, state: true },
  { forms: adjO("content"), verb: "estar", kinds: ["person"], reason: STATE, state: true },
  { forms: adjO("enferm"), verb: "estar", kinds: ["person"], reason: STATE, state: true },
  { forms: adjO("nervios"), verb: "estar", kinds: ["person"], reason: STATE, state: true },
  { forms: adjO("suci"), verb: "estar", kinds: ["home", "room"], reason: NOW },
  { forms: adjO("ordenad"), verb: "estar", kinds: ["home", "room"], reason: NOW },
  { forms: adjE("grande", "muy "), verb: "ser", kinds: ["home", "room", "town", "place"], reason: DESC },
  { forms: adjO("pequeñ"), verb: "ser", kinds: ["home", "room", "place"], reason: DESC },
  { forms: adjO("modern"), verb: "ser", kinds: ["home", "room", "place"], reason: DESC },
  { forms: adjO("bonit"), verb: "ser", kinds: ["home", "room", "town", "place"], reason: DESC },
  { forms: adjO("antigu"), verb: "ser", kinds: ["home", "town", "place"], reason: DESC },
  { forms: adjO("simpátic"), verb: "ser", kinds: ["person"], reason: PERS },
  { forms: adjO("alt"), verb: "ser", kinds: ["person"], reason: PERS },
  { forms: adjE("inteligente"), verb: "ser", kinds: ["person"], reason: PERS },
  { forms: adjO("divertid"), verb: "ser", kinds: ["person"], reason: PERS },
  { forms: inv("de Singapur"), verb: "ser", kinds: ["person"], reason: "origin (where someone is from) → *ser*" },
  { forms: inv("de Sevilla"), verb: "ser", kinds: ["person"], reason: "origin (where someone is from) → *ser*" },
  { forms: ["español", "española", "españoles", "españolas"], verb: "ser", kinds: ["person"], reason: "nationality → *ser*" },
];
const compText = (c: SeComp, s: SeSubj) => c.forms[(s.pl ? 2 : 0) + (s.g === "f" ? 1 : 0)];
const otherVerb = (v: "ser" | "estar") => (v === "ser" ? "estar" : "ser");

const HOURS = ["dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];
const DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

const serEstar: Drill = {
  id: `${TOPIC}.ser-or-estar`,
  topicId: TOPIC,
  title: "Ser or estar? Choose and conjugate",
  level: 2,
  guideRef: "ser-vs-estar",
  generate(rng, tier) {
    const intro = "Fill the gap with the correct present-tense form of *ser* or *estar*:";
    // Time / days: always ser.
    if (tier !== 3 && rng.bool(0.15)) {
      const kind = rng.int(0, 2);
      const p: Person = kind === 1 ? "ellos" : "él";
      const sentence = kind === 0 ? "___ la una." : kind === 1 ? `___ las ${rng.pick(HOURS)}.` : `Hoy ___ ${rng.pick(DAYS)}.`;
      const form = PRES("ser", p);
      const accept = [form];
      return {
        prompt: `${intro}\n\n*${sentence}*`,
        answer: { type: "text", accept },
        solution: [
          "Telling the time and giving the day → always *ser*.",
          kind === 1 ? "*las …* is plural (several hours) → *son*." : kind === 0 ? "*la una* is singular (one o'clock) → *es*." : "One day → *es*.",
          `→ **${form}**`,
        ],
        hint: "Is this about where something is, or about the time?",
        traps: makeTraps(accept, [
          [PRES("estar", p), "Time and days use *ser*, not *estar*: *es la una, son las dos, hoy es lunes*."],
          [kind === 1 ? "es" : "son", kind === 1 ? "*las …* means more than one hour → plural *son*." : "*la una* (and a single day) is singular → *es*."],
        ]),
      };
    }
    if (tier === 3) {
      const s = rng.pick(SE_SUBJECTS);
      const serC = rng.pick(SE_COMPS.filter((c) => c.verb === "ser" && c.kinds.includes(s.kind)));
      const estC = rng.pick(SE_COMPS.filter((c) => c.verb === "estar" && c.kinds.includes(s.kind) && (s.kind !== "person" || c.state)));
      const serF = PRES("ser", s.p);
      const estF = PRES("estar", s.p);
      const serFirst = s.kind === "person" || rng.bool(0.6);
      const sentence = serFirst
        ? `${cap(s.es)} ___ ${compText(serC, s)}, pero ${s.kind === "person" ? "hoy " : ""}___ ${compText(estC, s)}.`
        : `${cap(s.es)} ___ ${compText(estC, s)} y ___ ${compText(serC, s)}.`;
      const ans = serFirst ? `${serF} ${estF}` : `${estF} ${serF}`;
      const swapped = serFirst ? `${estF} ${serF}` : `${serF} ${estF}`;
      const accept = [ans];
      return {
        prompt: `${intro} two gaps, so type both verbs in order (e.g. *es, está*).\n\n*${sentence}*`,
        answer: { type: "text", accept },
        solution: [
          `*${compText(serC, s)}*: ${serC.reason} → *${serF}*.`,
          `*${compText(estC, s)}*: ${estC.reason} → *${estF}*.`,
          `The subject is *${s.es}* (*${P_NAME[s.p]}*) → **${serFirst ? `${serF} … ${estF}` : `${estF} … ${serF}`}**`,
        ],
        hint: "Ask for each gap: is it WHAT it's like (ser) or WHERE / HOW it is right now (estar)?",
        traps: makeTraps(accept, [[swapped, "You've swapped them. Description / identity → *ser*; location and how something is right now → *estar*."]]),
      };
    }
    const pool = SE_SUBJECTS.filter((x) => tier !== 1 || x.p === "él" || x.p === "ellos" || x.p === "yo");
    const s = rng.pick(pool);
    const c = rng.pick(SE_COMPS.filter((x) => x.kinds.includes(s.kind)));
    const form = PRES(c.verb, s.p);
    const wrong = PRES(otherVerb(c.verb), s.p);
    const accept = acceptedForms(c.verb, "present", s.p);
    return {
      prompt: `${intro}\n\n*${cap(s.es)} ___ ${compText(c, s)}.*`,
      answer: { type: "text", accept },
      solution: [
        `*${compText(c, s)}* = ${c.reason}.`,
        `The subject is *${s.es}* → the *${P_NAME[s.p]}* form of *${c.verb}*.`,
        `→ **${form}**`,
      ],
      hint: "Ask: is it WHAT someone / something is like (ser), or WHERE it is / HOW it is right now (estar)?",
      traps: makeTraps(accept, [
        [wrong, c.verb === "estar" ? `*${wrong}* is *ser*. But ${c.reason.replace(" → *estar*", "")} needs *estar* → *${form}*.` : `*${wrong}* is *estar*. But ${c.reason.replace(" → *ser*", "")} needs *ser* → *${form}*.`],
      ]),
    };
  },
};

// ---------------------------------------------------------------------------
// 9. Negatives
// ---------------------------------------------------------------------------

const NUNCA_ITEMS: Array<{ inf: string; comp: string }> = [
  { inf: "jugar", comp: "al tenis" },
  { inf: "ver", comp: "la tele" },
  { inf: "hacer", comp: "los deberes" },
  { inf: "escuchar", comp: "música clásica" },
  { inf: "limpiar", comp: "la cocina" },
  { inf: "comer", comp: "fruta" },
  { inf: "beber", comp: "café" },
  { inf: "levantarse", comp: "temprano" },
  { inf: "ducharse", comp: "por la mañana" },
  { inf: "salir", comp: "los domingos" },
  { inf: "leer", comp: "en la cama" },
  { inf: "ir", comp: "al cine" },
  { inf: "ordenar", comp: "el salón" },
];
const NADA_ITEMS: Array<{ inf: string; base: string; s3: string }> = [
  { inf: "hacer", base: "do", s3: "do" },
  { inf: "comer", base: "eat", s3: "eat" },
  { inf: "beber", base: "drink", s3: "drink" },
  { inf: "comprar", base: "buy", s3: "buy" },
  { inf: "leer", base: "read", s3: "read" },
  { inf: "escribir", base: "write", s3: "write" },
  { inf: "decir", base: "say", s3: "say" },
  { inf: "estudiar", base: "study", s3: "study" },
  { inf: "cocinar", base: "cook", s3: "cook" },
  { inf: "pedir", base: "order", s3: "order" },
];
const NADIE_ITEMS: Array<{ inf: string; comp: string; en: string }> = [
  { inf: "lavar", comp: "el coche", en: "washes the car" },
  { inf: "poner", comp: "la mesa", en: "lays the table" },
  { inf: "limpiar", comp: "el baño", en: "cleans the bathroom" },
  { inf: "hablar", comp: "francés", en: "speaks French" },
  { inf: "tocar", comp: "el piano", en: "plays the piano" },
  { inf: "fregar", comp: "los platos", en: "washes the dishes" },
  { inf: "sacar", comp: "la basura", en: "takes out the rubbish" },
  { inf: "regar", comp: "las plantas", en: "waters the plants" },
];

function withPronouns(p: Person, variants: string[], only?: string[]): string[] {
  const prons = only ?? [...SUBJECT_PRONOUNS[p]];
  return uniq([...variants, ...variants.flatMap((v) => prons.map((pr) => `${pr} ${v}`))]);
}

const negatives: Drill = {
  id: `${TOPIC}.negatives`,
  topicId: TOPIC,
  title: "Negatives: no… nunca, no… nada, nadie",
  level: 2,
  guideRef: "negatives-and-questions",
  generate(rng, tier) {
    const type = tier === 1 ? "nunca" : rng.pick(["nunca", "nada", "nadie"] as const);
    if (type === "nunca") {
      const it = rng.pick(NUNCA_ITEMS);
      const p: Person = tier === 1 ? rng.pick(["yo", "tú", "él"] as const) : rng.pick(PERSONS);
      const f = PRES(it.inf, p);
      const accept = withPronouns(p, [`nunca ${f} ${it.comp}`, `no ${f} nunca ${it.comp}`, `no ${f} ${it.comp} nunca`]);
      return {
        prompt: `Make this sentence negative using *nunca* (never):\n\n*${cap(f)} ${it.comp}.*`,
        answer: { type: "text", accept },
        solution: [
          `*Nunca* first → it does the job alone: *Nunca ${f} ${it.comp}.*`,
          `Or the sandwich: *no* before the verb${info(it.inf).reflexive ? " (and before the pronoun)" : ""}, *nunca* after it: *No ${f} nunca ${it.comp}.*`,
          `→ **Nunca ${f} ${it.comp}.**`,
        ],
        hint: "Two patterns: *Nunca* + verb, or *no* + verb + *nunca*.",
        traps: makeTraps(accept, [
          [`${f} nunca ${it.comp}`, `When *nunca* comes after the verb you also need *no* in front: *No ${f} nunca…* (or put *nunca* first).`],
          [`no ${f} ${it.comp}`, "That only says 'not'. Add *nunca* for 'never'."],
        ]),
      };
    }
    if (type === "nada") {
      const it = rng.pick(NADA_ITEMS);
      const p = rng.pick(PERSONS);
      const he = rng.bool(0.5);
      const subjEn: Record<Person, string> = {
        yo: "I don't",
        tú: "You don't",
        él: he ? "He doesn't" : "She doesn't",
        nosotros: "We don't",
        vosotros: "You don't",
        ellos: "They don't",
      };
      const cue = p === "tú" ? " (*tú*)" : p === "vosotros" ? " (*vosotros*, you all)" : "";
      const f = PRES(it.inf, p);
      const prons = p === "él" ? [he ? "él" : "ella"] : undefined;
      const accept = withPronouns(p, [`no ${f} nada`], prons);
      return {
        prompt: `Write in Spanish, using *no… nada*: "${subjEn[p]} ${it.base} anything."${cue}`,
        answer: { type: "text", accept },
        solution: [
          `'to ${it.base}' = *${it.inf}* → *${P_NAME[p]}* form *${f}*.`,
          "'not… anything' = the sandwich *no* + verb + *nada*.",
          `→ **No ${f} nada.**`,
        ],
        hint: "Spanish uses a double negative here: *no* before the verb AND *nada* after it.",
        traps: makeTraps(accept, [
          [[`${f} nada`, ...(prons ?? SUBJECT_PRONOUNS[p]).map((pr) => `${pr} ${f} nada`)], `You need *no* before the verb as well: *No ${f} nada.* The double negative is correct in Spanish.`],
        ]),
      };
    }
    const it = rng.pick(NADIE_ITEMS);
    const place = rng.bool(0.5);
    const f = PRES(it.inf, "él");
    const base = [`nadie ${f} ${it.comp}`, `no ${f} nadie ${it.comp}`, `no ${f} ${it.comp} nadie`];
    const accept = place ? uniq([...base.map((b) => `${b} en mi casa`), ...base.map((b) => `en mi casa ${b}`)]) : base;
    return {
      prompt: `Write in Spanish, using *nadie*: "Nobody ${it.en}${place ? " in my house" : ""}."`,
      answer: { type: "text", accept },
      solution: [
        `*Nadie* (nobody) is one person → the *él / ella* form: *${it.inf}* → *${f}*.`,
        "*Nadie* before the verb works alone — no *no* needed.",
        `→ **Nadie ${f} ${it.comp}${place ? " en mi casa" : ""}.**`,
      ],
      hint: "Start with *Nadie* + the *él / ella* form of the verb.",
      traps: makeTraps(accept, [
        [[`nadie no ${f} ${it.comp}`, `nadie no ${f} ${it.comp} en mi casa`, `en mi casa nadie no ${f} ${it.comp}`], "When *nadie* comes before the verb, drop *no*: *Nadie " + f + "…*"],
        [[`nadie ${PRES(it.inf, "ellos")} ${it.comp}`], "*Nadie* is singular: use the *él / ella* form."],
      ]),
    };
  },
};

// ---------------------------------------------------------------------------
// 10. Question words
// ---------------------------------------------------------------------------

interface QCtx {
  qp: Person;
  ap: Person;
  subj: string;
  enDo: string;
  enS: string;
  enBe: string;
  cue: string;
  house: string;
  enHouse: string;
}
const Q_CTX: QCtx[] = [
  { qp: "tú", ap: "yo", subj: "", enDo: "do", enS: "you", enBe: "are", cue: " (*tú*)", house: "tu casa", enHouse: "your house" },
  { qp: "vosotros", ap: "nosotros", subj: "", enDo: "do", enS: "you", enBe: "are", cue: " (*vosotros*, you all)", house: "vuestra casa", enHouse: "your house" },
  { qp: "él", ap: "él", subj: "tu hermana", enDo: "does", enS: "your sister", enBe: "is", cue: "", house: "la casa de tu hermana", enHouse: "your sister's house" },
  { qp: "él", ap: "él", subj: "tu amigo Diego", enDo: "does", enS: "your friend Diego", enBe: "is", cue: "", house: "la casa de tu amigo Diego", enHouse: "your friend Diego's house" },
];
interface QItem {
  word: string;
  alts?: string[];
  gap: string;
  reply: string;
  en: string;
  full: string[];
  traps: Array<[string, string]>;
}
const POSS: Record<Person, string> = { yo: "mis", tú: "tus", él: "sus", nosotros: "nuestros", vosotros: "vuestros", ellos: "sus" };

function qFull(ctx: QCtx, prefix: string, verb: string, rest = ""): string[] {
  const tail = rest ? ` ${rest}` : "";
  if (ctx.subj) return [`${prefix} ${verb} ${ctx.subj}${tail}`];
  return [`${prefix} ${verb}${tail}`, ...SUBJECT_PRONOUNS[ctx.qp].map((pr) => `${prefix} ${verb} ${pr}${tail}`)];
}

const Q_TEMPLATES: Array<(ctx: QCtx, rng: Rng) => QItem> = [
  (c, rng) => {
    const v = PRES("vivir", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "dónde",
      gap: `¿___ ${v}${sa}?`,
      reply: `${cap(PRES("vivir", c.ap))} en ${rng.pick(["Singapur", "Madrid", "un piso en el centro", "una casa cerca de la playa"])}.`,
      en: `Where ${c.enDo} ${c.enS} live?`,
      full: qFull(c, "dónde", v),
      traps: [["adónde", "*¿Adónde?* is 'where to?' (with movement, like *ir*). For where someone lives, use *¿Dónde?*"]],
    };
  },
  (c, rng) => {
    const v = PRES("hacer", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    const [inf, rest] = rng.pick([["jugar", "al baloncesto"], ["ver", "la tele"], ["ir", "al parque"], ["hacer", "natación"]] as const);
    return {
      word: "qué",
      gap: `¿___ ${v}${sa} los sábados?`,
      reply: `${cap(PRES(inf, c.ap))} ${rest}.`,
      en: `What ${c.enDo} ${c.enS} do on Saturdays?`,
      full: qFull(c, "qué", v, "los sábados"),
      traps: [["que", "Question words always carry an accent: *¿Qué…?*"]],
    };
  },
  (c, rng) => {
    const v = PRES("jugar", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "cuándo",
      gap: `¿___ ${v}${sa} al fútbol?`,
      reply: rng.pick(["Los martes y los jueves.", "Los fines de semana.", "Después del colegio."]),
      en: `When ${c.enDo} ${c.enS} play football?`,
      full: qFull(c, "cuándo", v, "al fútbol"),
      traps: [["dónde", "The answer is a day or time, not a place — so the question is 'when?'"]],
    };
  },
  (c, rng) => {
    const v = PRES("levantarse", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "a qué hora",
      alts: ["cuándo"],
      gap: `¿___ ${v}${sa}?`,
      reply: `${cap(PRES("levantarse", c.ap))} a las ${rng.pick(["seis", "siete", "ocho"])}.`,
      en: `What time ${c.enDo} ${c.enS} get up?`,
      full: qFull(c, "a qué hora", v),
      traps: [["qué hora", "'At what time?' needs the *a*: *¿A qué hora…?*"]],
    };
  },
  (c) => {
    const v = PRES("salir", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "con quién",
      gap: `¿___ ${v}${sa} los sábados?`,
      reply: `${cap(PRES("salir", c.ap))} con ${POSS[c.ap]} amigos.`,
      en: `Who ${c.enDo} ${c.enS} go out with on Saturdays?`,
      full: qFull(c, "con quién", v, "los sábados"),
      traps: [["quién", "Who *with*? In Spanish the preposition goes in front: *¿Con quién…?*"]],
    };
  },
  (c) => {
    const v = PRES("estudiar", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "por qué",
      gap: `¿___ ${v}${sa} español?`,
      reply: "Porque es muy útil.",
      en: `Why ${c.enDo} ${c.enS} study Spanish?`,
      full: qFull(c, "por qué", v, "español"),
      traps: [["porque", "*porque* (one word, no accent) means 'because' — it's the answer. The question 'why?' is *¿Por qué?* (two words, accent)."]],
    };
  },
  (c) => {
    const v = PRES("tener", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "cuántos",
      gap: `¿___ hermanos ${v}${sa}?`,
      reply: `${cap(PRES("tener", c.ap))} dos hermanos.`,
      en: `How many brothers and sisters ${c.enDo} ${c.enS} have?`,
      full: qFull(c, "cuántos hermanos", v),
      traps: [
        ["cuántas", "*¿Cuántos?* agrees with the noun: *hermanos* is masculine plural → *cuántos*."],
        ["cuánto", "'How many' with a plural noun → *cuántos* (plural)."],
      ],
    };
  },
  (c) => {
    const v = PRES("dormir", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "cuántas",
      gap: `¿___ horas ${v}${sa}?`,
      reply: `${cap(PRES("dormir", c.ap))} ocho horas.`,
      en: `How many hours ${c.enDo} ${c.enS} sleep?`,
      full: qFull(c, "cuántas horas", v),
      traps: [["cuántos", "*¿Cuántos?* agrees with the noun: *horas* is feminine plural → *cuántas*."]],
    };
  },
  (c, rng) => {
    const es = PRES("ser", "él");
    return {
      word: "cómo",
      gap: `¿___ ${es} ${c.house}?`,
      reply: `${cap(es)} ${rng.pick(["grande y moderna", "pequeña pero bonita", "muy antigua"])}.`,
      en: `What is ${c.enHouse} like?`,
      full: [`cómo ${es} ${c.house}`],
      traps: [["qué", "The answer describes the house, so ask 'what is it like?' = *¿Cómo es…?*"]],
    };
  },
  (c, rng) => {
    const v = PRES("ser", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "de dónde",
      gap: `¿___ ${v}${sa}?`,
      reply: `${cap(PRES("ser", c.ap))} de ${rng.pick(["Singapur", "Málaga", "Valencia"])}.`,
      en: `Where ${c.enBe} ${c.enS} from?`,
      full: qFull(c, "de dónde", v),
      traps: [["dónde", "'Where FROM?' — *ser de* = to be from, so the *de* goes in front: *¿De dónde…?*"]],
    };
  },
  (c, rng) => {
    const v = PRES("ir", c.qp);
    const sa = c.subj ? ` ${c.subj}` : "";
    return {
      word: "adónde",
      alts: ["a dónde"],
      gap: `¿___ ${v}${sa}?`,
      reply: `${cap(PRES("ir", c.ap))} ${rng.pick(["al parque", "a la playa", "al centro comercial"])}.`,
      en: `Where ${c.enBe} ${c.enS} going?`,
      full: uniq([...qFull(c, "adónde", v), ...qFull(c, "a dónde", v)]),
      traps: [["dónde", "With *ir* (movement) Spanish asks 'where TO?': *¿Adónde…?*"]],
    };
  },
  (c) => {
    const v = PRES("poner", "él");
    const where = c.house === "tu casa" ? "tu casa" : c.house === "vuestra casa" ? "vuestra casa" : c.house.replace(/^la casa/, "casa");
    const enWhere = c.enHouse;
    return {
      word: "quién",
      gap: `¿___ ${v} la mesa en ${where}?`,
      reply: "Mi hermano.",
      en: `Who lays the table in ${enWhere}?`,
      full: [`quién ${v} la mesa en ${where}`, `en ${where} quién ${v} la mesa`],
      traps: [["quiénes", "The verb *pone* is singular, so the question word is singular: *¿Quién?*"]],
    };
  },
];

const VOCAB_QW = vocab
  .filter((g) => g.title === "Question words" || g.title === "Negatives")
  .flatMap((g) => g.items);
const VOCAB_ALTS: Record<string, string[]> = {
  cuánto: ["cuánta"],
  cuántos: ["cuántas"],
  quién: ["quiénes"],
  cuál: ["cuáles"],
  adónde: ["a dónde"],
};

const questionWords: Drill = {
  id: `${TOPIC}.question-words`,
  topicId: TOPIC,
  title: "Question words: ¿qué?, ¿dónde?, ¿cuándo?, ¿por qué?…",
  level: 2,
  guideRef: "negatives-and-questions",
  generate(rng, tier) {
    if (tier === 1 && rng.bool(0.5)) {
      const item = rng.pick(VOCAB_QW);
      const es = item.es.replace(/[¿?]/g, "").trim();
      const accept = uniq([es, ...(VOCAB_ALTS[es] ?? [])]);
      return {
        prompt: `How do you say "${item.en}" in Spanish?`,
        answer: { type: "text", accept },
        solution: [`"${item.en}" = **${item.es}**${item.note ? ` (${item.note})` : ""}`],
        hint: es.includes("é") || es.includes("ó") || es.includes("á") || es.includes("í") ? "Question words always carry an accent." : "Think of a sentence where you'd use it.",
        traps: makeTraps(accept, es === "porque" ? [["por qué", "*¿Por qué?* (two words, accent) is 'why?'. 'Because' is *porque*."]] : es === "por qué" ? [["porque", "*porque* is 'because'. 'Why?' is two words with an accent: *¿Por qué?*"]] : []),
      };
    }
    const ctx = tier === 1 ? Q_CTX[0] : rng.pick(Q_CTX);
    const item = rng.pick(Q_TEMPLATES)(ctx, rng);
    if (tier === 3) {
      const accept = uniq(item.full);
      return {
        prompt: `Write this question in Spanish: "${item.en}"${ctx.cue}`,
        answer: { type: "text", accept },
        solution: [
          `Question word: *¿${cap(item.word)}…?*`,
          `Then the verb in the right form${ctx.subj ? `, with the subject *${ctx.subj}* after it` : ""}.`,
          `→ **¿${cap(accept[0])}?**`,
        ],
        hint: "Question word (with its accent) first, then the verb. A preposition (*con, de, a*) goes in front of the question word.",
        traps: makeTraps(accept, item.traps.map(([w, fb]) => [item.full[0].replace(item.word, w), fb] as [string, string])),
      };
    }
    const accept = uniq([item.word, ...(item.alts ?? [])]);
    return {
      prompt: `Complete the question with the right question word (accents count!):\n\n*${item.gap}* — *${item.reply}*`,
      answer: { type: "text", accept },
      solution: [
        `Look at the answer: *${item.reply}*`,
        `So the question is "${item.en}" → **${item.word}**`,
      ],
      hint: "Read the reply first: is it a place, a time, a person, a reason, a number…?",
      traps: makeTraps(accept, item.traps),
    };
  },
};

// ---------------------------------------------------------------------------
// 11. English → Spanish verb form
// ---------------------------------------------------------------------------

const GLOSS_T1 = [
  "hablar", "escuchar", "bailar", "cantar", "nadar", "cocinar", "limpiar", "ayudar", "estudiar", "trabajar",
  "comprar", "viajar", "desayunar", "cenar", "comer", "beber", "aprender", "correr", "leer",
  "vivir", "escribir", "compartir", "abrir", "recibir",
];
const GLOSS_T2 = [
  ...GLOSS_T1,
  "tener", "hacer", "ir", "salir", "venir", "ver", "dar", "poner", "decir",
  "dormir", "querer", "poder", "jugar", "pedir", "volver", "preferir", "empezar", "pensar",
];
const GLOSS_T3 = [...GLOSS_T2, "levantarse", "ducharse", "acostarse", "despertarse", "vestirse", "divertirse"];
/** Other verbs that translate the same English just as well. */
const GLOSS_ALSO: Record<string, string> = { ver: "mirar", jugar: "tocar" };

const englishToSpanish: Drill = {
  id: `${TOPIC}.english-to-spanish`,
  topicId: TOPIC,
  title: "English → Spanish: write the verb form",
  level: 2,
  guideRef: "regular-verbs",
  generate(rng, tier) {
    const inf = rng.pick(tier === 1 ? GLOSS_T1 : tier === 2 ? GLOSS_T2 : GLOSS_T3);
    const p = pickPerson(rng, tier);
    const he = rng.bool(0.5) ? "he" : "she";
    const gloss = englishGloss(inf, "present", p).replace(/^he\/she/, he).replace(/his\/her/g, he === "he" ? "his" : "her");
    const cue = p === "tú" ? " (*tú*, one friend)" : p === "vosotros" ? " (*vosotros*)" : "";
    const form = PRES(inf, p);
    const also = GLOSS_ALSO[inf];
    let accept = acceptedForms(inf, "present", p);
    if (p === "él") accept = accept.filter((a) => !/^(él|ella) /.test(a) || a.startsWith(he === "he" ? "él " : "ella "));
    if (also) accept = uniq([...accept, ...acceptedForms(also, "present", p)]);
    const list: Array<[string, string]> = [];
    if ((stemType(inf) && inBoot(p)) || (info(inf).tags.includes("yo-go") && p === "yo")) {
      list.push([regularPattern(inf, p), irregularTrapFeedback(inf, p)]);
    }
    if (info(inf).reflexive) list.push([verbOnly(form), `*${inf}* is reflexive — you need the pronoun: *${form}*.`]);
    list.push([inf, `That's the infinitive ('to ${englishGloss(inf, "present", "yo").replace(/^I /, "")}'). Conjugate it for the person.`]);
    return {
      prompt: `Write this in Spanish as one verb form (present tense): "${gloss}"${cue}`,
      answer: { type: "text", accept },
      solution: [
        `The verb: *${inf}* (${info(inf).en}). The person: *${P_NAME[p]}*.`,
        stemType(inf) && inBoot(p)
          ? `It's a boot verb (${STEM_LABEL[stemType(inf)!]}) and *${P_NAME[p]}* is inside the boot.`
          : info(inf).tags.includes("irregular") || info(inf).tags.includes("yo-go")
            ? `It's irregular: ${PERSONS.map((q) => `*${PRES(inf, q)}*`).join(", ")}.`
            : `Stem *${stemOf(inf)}-* + ending *-${endingOf(inf, p)}*${info(inf).reflexive ? `, with the pronoun *${PRONOUN[p]}* in front` : ""}.`,
        `→ **${form}**${also ? ` (*${PRES(also, p)}* is fine too)` : ""}`,
      ],
      hint: "First find the infinitive, then work out the person from the English subject.",
      traps: makeTraps(accept, list),
    };
  },
};

// ---------------------------------------------------------------------------
// 12. Build a sentence (mixed verbs, word order, time phrases)
// ---------------------------------------------------------------------------

const ACTIVITIES: Array<{ inf: string; es: string; base: string; s3: string; daily?: boolean }> = [
  { inf: "jugar", es: "al tenis", base: "play tennis", s3: "plays tennis" },
  { inf: "hacer", es: "los deberes", base: "do homework", s3: "does homework" },
  { inf: "ver", es: "la tele", base: "watch TV", s3: "watches TV" },
  { inf: "ir", es: "al parque", base: "go to the park", s3: "goes to the park" },
  { inf: "comer", es: "fruta", base: "eat fruit", s3: "eats fruit" },
  { inf: "leer", es: "revistas", base: "read magazines", s3: "reads magazines" },
  { inf: "dormir", es: "ocho horas", base: "sleep for eight hours", s3: "sleeps for eight hours", daily: true },
  { inf: "pedir", es: "churros", base: "order churros", s3: "orders churros" },
  { inf: "estudiar", es: "español", base: "study Spanish", s3: "studies Spanish" },
  { inf: "levantarse", es: "temprano", base: "get up early", s3: "gets up early", daily: true },
  { inf: "salir", es: "con amigos", base: "go out with friends", s3: "goes out with friends" },
  { inf: "escuchar", es: "música", base: "listen to music", s3: "listens to music" },
  { inf: "nadar", es: "en la piscina", base: "swim in the pool", s3: "swims in the pool" },
  { inf: "tener", es: "clase de piano", base: "have a piano lesson", s3: "has a piano lesson" },
];
const TIMES: Array<{ es: string[]; en: string; daily: boolean }> = [
  { es: ["los sábados"], en: "on Saturdays", daily: true },
  { es: ["los lunes"], en: "on Mondays", daily: true },
  { es: ["todos los días"], en: "every day", daily: true },
  { es: ["los fines de semana", "el fin de semana"], en: "at the weekend", daily: true },
  { es: ["por la tarde", "por las tardes"], en: "in the afternoon", daily: false },
  { es: ["después del colegio"], en: "after school", daily: false },
];
const BUILD_SUBJ: Record<Person, Array<{ en: string; es?: string }>> = {
  yo: [{ en: "I" }],
  tú: [{ en: "You" }],
  él: [{ en: "Lucía", es: "Lucía" }, { en: "Diego", es: "Diego" }, { en: "My brother", es: "mi hermano" }, { en: "My sister", es: "mi hermana" }],
  nosotros: [{ en: "We" }],
  vosotros: [{ en: "You" }],
  ellos: [{ en: "My parents", es: "mis padres" }, { en: "My friends", es: "mis amigos" }, { en: "My cousins", es: "mis primos" }],
};

const buildSentence: Drill = {
  id: `${TOPIC}.build-a-sentence`,
  topicId: TOPIC,
  title: "Build a present-tense sentence: subject + verb + time phrase",
  level: 3,
  guideRef: "regular-verbs",
  generate(rng, tier) {
    const act = rng.pick(ACTIVITIES);
    const time = rng.pick(TIMES.filter((t) => !act.daily || t.daily));
    const p = pickPerson(rng, tier);
    const subj = rng.pick(BUILD_SUBJ[p]);
    const neg = tier === 3 && rng.bool(0.5);
    const form = PRES(act.inf, p);
    const vp = `${neg ? "no " : ""}${form} ${act.es}`;
    const third = p === "él";
    const enVerb = neg ? `${third ? "doesn't" : "don't"} ${act.base}` : third ? act.s3 : act.base;
    const cue = p === "tú" ? " (*tú*)" : p === "vosotros" ? " (*vosotros*, you all)" : "";
    const accept: string[] = [];
    for (const t of time.es) {
      if (subj.es) {
        accept.push(`${subj.es} ${vp} ${t}`, `${t} ${subj.es} ${vp}`);
      } else {
        accept.push(`${vp} ${t}`, `${t} ${vp}`);
        for (const pr of SUBJECT_PRONOUNS[p]) accept.push(`${pr} ${vp} ${t}`, `${t} ${pr} ${vp}`);
      }
    }
    const canonical = accept[0];
    const lead = subj.es ? `${subj.es} ` : "";
    const list: Array<[string, string]> = [];
    if (stemType(act.inf) && inBoot(p)) list.push([`${lead}${neg ? "no " : ""}${regularPattern(act.inf, p)} ${act.es} ${time.es[0]}`, irregularTrapFeedback(act.inf, p)]);
    if (info(act.inf).tags.includes("yo-go") && p === "yo") list.push([`${neg ? "no " : ""}${regularPattern(act.inf, p)} ${act.es} ${time.es[0]}`, irregularTrapFeedback(act.inf, p)]);
    if (info(act.inf).reflexive) list.push([`${lead}${neg ? "no " : ""}${verbOnly(form)} ${act.es} ${time.es[0]}`, `*levantarse* is reflexive: keep the pronoun → *${form}*.`]);
    list.push([`${lead}${neg ? "no " : ""}${act.inf.replace(/se$/, "")} ${act.es} ${time.es[0]}`, "The verb is still in the infinitive — conjugate it for the subject."]);
    return {
      prompt: `Translate into Spanish: "${subj.en} ${enVerb} ${time.en}."${cue}`,
      answer: { type: "text", accept: uniq(accept) },
      solution: [
        `Verb: *${act.inf}* (${meaning(act.inf)}); subject → *${P_NAME[p]}* → *${form}*.`,
        `Add the rest: *${act.es}*${neg ? "; *no* goes right before the verb" + (info(act.inf).reflexive ? " and its pronoun" : "") : ""}.`,
        `Time phrase *${time.es[0]}* at the end (or the start).`,
        `→ **${cap(canonical)}.**`,
      ],
      hint: "Build it in chunks: who → verb in the right form → the rest → when.",
      traps: makeTraps(uniq(accept), list),
    };
  },
};

// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  regularForms,
  endingDetective,
  keyIrregulars,
  englishToSpanish,
  yoGoVerbs,
  stemChangers,
  bootSpotter,
  reflexives,
  serEstar,
  negatives,
  questionWords,
  buildSentence,
];
