// ---------------------------------------------------------------------------
// Spanish verb conjugation library for Year 8.
//
// Pure data + functions (no React) so it is safe to import from drills,
// widgets, games, Node scripts and tests.
//
// Engine: regular endings + stem changes (boot verbs) + -car/-gar/-zar
// spelling changes + -ir preterite stem changes, with per-person override
// tables for every irregular form. Reflexive verbs carry their pronoun.
// ---------------------------------------------------------------------------

export type Person = "yo" | "tú" | "él" | "nosotros" | "vosotros" | "ellos";

export const PERSONS: readonly Person[] = ["yo", "tú", "él", "nosotros", "vosotros", "ellos"];

export const PERSON_LABEL: Record<Person, string> = {
  yo: "yo (I)",
  tú: "tú (you)",
  él: "él / ella (he / she)",
  nosotros: "nosotros (we)",
  vosotros: "vosotros (you all)",
  ellos: "ellos / ellas (they)",
};

/** Subject pronouns a learner may type in front of the verb (first = canonical). */
export const SUBJECT_PRONOUNS: Record<Person, readonly string[]> = {
  yo: ["yo"],
  tú: ["tú"],
  él: ["él", "ella", "usted"],
  nosotros: ["nosotros", "nosotras"],
  vosotros: ["vosotros", "vosotras"],
  ellos: ["ellos", "ellas", "ustedes"],
};

export type Tense = "present" | "preterite" | "near-future";

export const TENSES: readonly Tense[] = ["present", "preterite", "near-future"];

export const TENSE_LABEL: Record<Tense, string> = {
  present: "Present (presente)",
  preterite: "Preterite (pretérito indefinido)",
  "near-future": "Near future (ir a + infinitive)",
};

export interface VerbInfo {
  /** Infinitive, including -se for reflexives (e.g. "levantarse"). */
  inf: string;
  /** English meaning, e.g. "to get up". */
  en: string;
  reflexive: boolean;
  group: "ar" | "er" | "ir";
  /**
   * Grammar tags ("regular", "stem-e-ie", "stem-o-ue", "stem-u-ue", "stem-e-i",
   * "irregular", "irregular-preterite", "yo-go", "spelling-car", "spelling-gar",
   * "spelling-zar", "spelling-ger", "spelling-gu", "spelling-y", "accent-i",
   * "reflexive") followed by topic tags ("topic:rutina-diaria", ...).
   */
  tags: string[];
}

// ---------------------------------------------------------------------------
// Internal definitions
// ---------------------------------------------------------------------------

type StemChange = "e-ie" | "o-ue" | "u-ue" | "e-i";
type Forms = Partial<Record<Person, string>>;

interface EnglishForms {
  /** Base form used after "I/you/we/they" and after "going to", e.g. "get up", "brush {poss} hair". */
  base: string;
  /** He/she present form, e.g. "gets up". */
  s3: string;
  /** Simple past, e.g. "got up". */
  past: string;
  /** Form after "going to" when it differs from base (modals): "be able to". */
  future: string;
}

interface VerbDef {
  info: VerbInfo;
  stemChange?: StemChange;
  present: Forms;
  preterite: Forms;
  eng: EnglishForms;
}

interface DefOpts {
  stem?: StemChange;
  /** Topic slugs without the "topic:" prefix. */
  topics?: string[];
  /** Extra grammar tags (e.g. "irregular", "yo-go"). */
  tags?: string[];
  present?: Forms;
  preterite?: Forms;
  /** English he/she present form when the automatic rule is wrong. */
  s3?: string;
  /** English form after "going to" (modals). */
  future?: string;
}

/** Full six-person table from a comma-separated list (yo … ellos). */
function six(list: string): Forms {
  const parts = list.split(",").map((s) => s.trim());
  if (parts.length !== 6) throw new Error(`six(): expected 6 forms, got ${parts.length} in "${list}"`);
  const out: Forms = {};
  PERSONS.forEach((p, i) => {
    out[p] = parts[i];
  });
  return out;
}

function englishS3(base: string): string {
  const [head, ...rest] = base.split(" ");
  const tail = rest.length ? " " + rest.join(" ") : "";
  const special: Record<string, string> = { have: "has", be: "is", can: "can", must: "must" };
  let s: string;
  if (special[head]) s = special[head];
  else if (/(s|sh|ch|x|z|o)$/.test(head)) s = head + "es";
  else if (/[^aeiou]y$/.test(head)) s = head.slice(0, -1) + "ies";
  else s = head + "s";
  return s + tail;
}

function splitInf(inf: string): { base: string; reflexive: boolean; group: "ar" | "er" | "ir"; stem: string } {
  const reflexive = inf.endsWith("se") && /(ar|er|ir)se$/.test(inf);
  const base = reflexive ? inf.slice(0, -2) : inf;
  const ending = base.slice(-2);
  if (ending !== "ar" && ending !== "er" && ending !== "ir") throw new Error(`Not an infinitive: ${inf}`);
  return { base, reflexive, group: ending, stem: base.slice(0, -2) };
}

/**
 * d(infinitive, English meaning, "base|past", options)
 * The English gloss is "base|past", e.g. "get up|got up".
 */
function d(inf: string, en: string, gloss: string, o: DefOpts = {}): VerbDef {
  const { reflexive, group, stem } = splitInf(inf);
  const [base, past] = gloss.split("|");
  if (!base || !past) throw new Error(`Bad gloss for ${inf}: "${gloss}"`);

  const tags: string[] = [];
  if (o.stem) tags.push(`stem-${o.stem}`);
  if (group === "ar") {
    if (stem.endsWith("c")) tags.push("spelling-car");
    else if (stem.endsWith("g")) tags.push("spelling-gar");
    else if (stem.endsWith("z")) tags.push("spelling-zar");
  }
  for (const t of o.tags ?? []) if (!tags.includes(t)) tags.push(t);
  if (tags.length === 0 && !o.present && !o.preterite) tags.unshift("regular");
  if (reflexive) tags.push("reflexive");
  for (const t of o.topics ?? []) tags.push(`topic:${t}`);

  return {
    info: { inf, en, reflexive, group, tags },
    stemChange: o.stem,
    present: o.present ?? {},
    preterite: o.preterite ?? {},
    eng: { base, s3: o.s3 ?? englishS3(base), past, future: o.future ?? base },
  };
}

// ---------------------------------------------------------------------------
// The verb list
// ---------------------------------------------------------------------------

const DEFS: VerbDef[] = [
  // ----- regular -ar -----
  d("hablar", "to speak, to talk", "talk|talked", { topics: ["tiempo-libre"] }),
  d("escuchar", "to listen (to)", "listen|listened", { topics: ["tiempo-libre"] }),
  d("bailar", "to dance", "dance|danced", { topics: ["tiempo-libre"] }),
  d("cantar", "to sing", "sing|sang", { topics: ["tiempo-libre"] }),
  d("nadar", "to swim", "swim|swam", { topics: ["deportes", "tiempo-libre"] }),
  d("cocinar", "to cook", "cook|cooked", { topics: ["tareas", "tiempo-libre"] }),
  d("limpiar", "to clean", "clean|cleaned", { topics: ["tareas", "mi-casa"] }),
  d("lavar", "to wash", "wash|washed", { topics: ["tareas"] }),
  d("ayudar", "to help", "help|helped", { topics: ["tareas", "mi-casa"] }),
  d("ordenar", "to tidy", "tidy|tidied", { topics: ["tareas", "mi-dormitorio"] }),
  d("pasear", "to go for a walk, to walk (the dog)", "go for a walk|went for a walk", { topics: ["tareas", "tiempo-libre", "la-ciudad"] }),
  d("planchar", "to iron", "iron|ironed", { topics: ["tareas"] }),
  d("sacar", "to take out", "take out|took out", { topics: ["tareas"] }),
  d("tocar", "to play (an instrument), to touch", "play|played", { topics: ["tiempo-libre"] }),
  d("visitar", "to visit", "visit|visited", { topics: ["la-ciudad", "mi-ciudad", "tiempo-libre"] }),
  d("comprar", "to buy", "buy|bought", { topics: ["la-ciudad", "mi-ciudad"] }),
  d("mirar", "to look at, to watch", "look at|looked at", { topics: ["tiempo-libre"] }),
  d("trabajar", "to work", "work|worked", { topics: ["donde-vivo"] }),
  d("estudiar", "to study", "study|studied", { topics: ["rutina-diaria"] }),
  d("viajar", "to travel", "travel|travelled", { topics: ["tiempo-libre"] }),
  d("desayunar", "to have breakfast", "have breakfast|had breakfast", { topics: ["rutina-diaria"] }),
  d("cenar", "to have dinner", "have dinner|had dinner", { topics: ["rutina-diaria"] }),
  d("llegar", "to arrive", "arrive|arrived", { topics: ["rutina-diaria", "la-ciudad"] }),
  d("pagar", "to pay (for)", "pay|paid", { topics: ["la-ciudad"] }),
  d("practicar", "to practise", "practise|practised", { topics: ["deportes"] }),
  d("montar", "to ride", "ride|rode", { topics: ["deportes", "tiempo-libre"] }),
  d("navegar", "to surf (the internet), to sail", "surf the internet|surfed the internet", { topics: ["tiempo-libre"] }),
  d("chatear", "to chat (online)", "chat online|chatted online", { topics: ["tiempo-libre"] }),
  d("cortar", "to cut", "cut|cut", { topics: ["tareas"] }),
  d("preparar", "to prepare", "prepare|prepared", { topics: ["tareas", "rutina-diaria"] }),
  d("tomar", "to take, to have (food / drink)", "take|took", { topics: ["la-ciudad", "rutina-diaria"] }),
  d("ganar", "to win, to earn", "win|won", { topics: ["deportes"] }),
  d("descansar", "to rest", "rest|rested", { topics: ["tiempo-libre", "rutina-diaria"] }),
  d("odiar", "to hate", "hate|hated", { topics: ["tiempo-libre"] }),
  d("usar", "to use", "use|used", { topics: ["tiempo-libre"] }),
  d("terminar", "to finish", "finish|finished", { topics: ["rutina-diaria"] }),
  d("cruzar", "to cross", "cross|crossed", { topics: ["la-ciudad"] }),
  d("entrenar", "to train", "train|trained", { topics: ["deportes"] }),
  d("pasar", "to spend (time), to pass", "spend time|spent time", { topics: ["tiempo-libre"] }),
  d("quitar", "to remove, to clear (the table)", "clear|cleared", { topics: ["tareas"] }),
  d("dibujar", "to draw", "draw|drew", { topics: ["tiempo-libre"] }),
  d("girar", "to turn", "turn|turned", { topics: ["la-ciudad"] }),
  d("bajar", "to go down", "go down|went down", { topics: ["la-ciudad"] }),
  d("esquiar", "to ski", "ski|skied", {
    topics: ["deportes"],
    tags: ["accent-i"],
    present: six("esquío, esquías, esquía, esquiamos, esquiáis, esquían"),
  }),
  d("andar", "to walk", "walk|walked", {
    topics: ["la-ciudad"],
    tags: ["irregular-preterite"],
    preterite: six("anduve, anduviste, anduvo, anduvimos, anduvisteis, anduvieron"),
  }),

  // ----- stem-changing -ar -----
  d("regar", "to water", "water|watered", { stem: "e-ie", topics: ["tareas"] }),
  d("fregar", "to wash up, to scrub", "wash up|washed up", { stem: "e-ie", topics: ["tareas"] }),
  d("merendar", "to have an afternoon snack", "have an afternoon snack|had an afternoon snack", { stem: "e-ie", topics: ["rutina-diaria"] }),
  d("empezar", "to start, to begin", "start|started", { stem: "e-ie", topics: ["rutina-diaria"] }),
  d("pensar", "to think", "think|thought", { stem: "e-ie" }),
  d("jugar", "to play (a sport / game)", "play|played", { stem: "u-ue", topics: ["deportes", "tiempo-libre"] }),
  d("almorzar", "to have lunch", "have lunch|had lunch", { stem: "o-ue", topics: ["rutina-diaria"] }),

  // ----- reflexive -ar -----
  d("despertarse", "to wake up", "wake up|woke up", { stem: "e-ie", topics: ["rutina-diaria"] }),
  d("acostarse", "to go to bed", "go to bed|went to bed", { stem: "o-ue", topics: ["rutina-diaria"] }),
  d("levantarse", "to get up", "get up|got up", { topics: ["rutina-diaria"] }),
  d("ducharse", "to have a shower", "have a shower|had a shower", { topics: ["rutina-diaria"] }),
  d("bañarse", "to have a bath, to bathe", "have a bath|had a bath", { topics: ["rutina-diaria"] }),
  d("lavarse", "to get washed, to wash (oneself)", "get washed|got washed", { topics: ["rutina-diaria"] }),
  d("peinarse", "to brush / comb your hair", "brush {poss} hair|brushed {poss} hair", { topics: ["rutina-diaria"] }),
  d("maquillarse", "to put on make-up", "put on make-up|put on make-up", { topics: ["rutina-diaria"] }),
  d("quedarse", "to stay", "stay|stayed", { topics: ["tiempo-libre", "rutina-diaria"] }),
  d("llamarse", "to be called", "be called|was called", { topics: ["donde-vivo"] }),

  // ----- -er -----
  d("comer", "to eat", "eat|ate", { topics: ["rutina-diaria"] }),
  d("beber", "to drink", "drink|drank", { topics: ["rutina-diaria"] }),
  d("aprender", "to learn", "learn|learned", { topics: ["rutina-diaria"] }),
  d("correr", "to run", "run|ran", { topics: ["deportes"] }),
  d("comprender", "to understand", "understand|understood"),
  d("deber", "must, to have to", "must|had to", { future: "have to" }),
  d("barrer", "to sweep", "sweep|swept", { topics: ["tareas"] }),
  d("coger", "to catch, to take (a bus)", "catch|caught", {
    topics: ["la-ciudad"],
    tags: ["spelling-ger"],
    present: { yo: "cojo" },
  }),
  d("leer", "to read", "read|read", {
    topics: ["tiempo-libre"],
    tags: ["spelling-y"],
    preterite: six("leí, leíste, leyó, leímos, leísteis, leyeron"),
  }),
  d("ver", "to see, to watch", "watch|watched", {
    topics: ["tiempo-libre"],
    tags: ["irregular"],
    present: six("veo, ves, ve, vemos, veis, ven"),
    preterite: six("vi, viste, vio, vimos, visteis, vieron"),
  }),
  d("hacer", "to do, to make", "do|did", {
    topics: ["tareas", "deportes", "tiempo-libre", "el-tiempo"],
    tags: ["irregular", "yo-go"],
    present: { yo: "hago" },
    preterite: six("hice, hiciste, hizo, hicimos, hicisteis, hicieron"),
  }),
  d("tener", "to have", "have|had", {
    stem: "e-ie",
    topics: ["mi-casa", "mi-dormitorio", "donde-vivo"],
    tags: ["irregular", "yo-go"],
    present: { yo: "tengo" },
    preterite: six("tuve, tuviste, tuvo, tuvimos, tuvisteis, tuvieron"),
  }),
  d("poner", "to put, to lay (the table)", "put|put", {
    topics: ["tareas", "mi-dormitorio"],
    tags: ["irregular", "yo-go"],
    present: { yo: "pongo" },
    preterite: six("puse, pusiste, puso, pusimos, pusisteis, pusieron"),
  }),
  d("querer", "to want", "want|wanted", {
    stem: "e-ie",
    topics: ["tiempo-libre"],
    tags: ["irregular"],
    preterite: six("quise, quisiste, quiso, quisimos, quisisteis, quisieron"),
  }),
  d("poder", "to be able to, can", "can|could", {
    stem: "o-ue",
    future: "be able to",
    tags: ["irregular"],
    preterite: six("pude, pudiste, pudo, pudimos, pudisteis, pudieron"),
  }),
  d("volver", "to return, to go back", "go back|went back", { stem: "o-ue", topics: ["rutina-diaria"] }),
  d("ser", "to be", "be|was", {
    topics: ["mi-casa", "mi-dormitorio", "donde-vivo", "la-ciudad"],
    tags: ["irregular"],
    present: six("soy, eres, es, somos, sois, son"),
    preterite: six("fui, fuiste, fue, fuimos, fuisteis, fueron"),
  }),

  // ----- -ir -----
  d("vivir", "to live", "live|lived", { topics: ["donde-vivo", "mi-casa"] }),
  d("escribir", "to write", "write|wrote", { topics: ["tiempo-libre"] }),
  d("abrir", "to open", "open|opened", { topics: ["la-ciudad"] }),
  d("compartir", "to share", "share|shared", { topics: ["mi-dormitorio", "mi-casa"] }),
  d("recibir", "to receive", "receive|received"),
  d("subir", "to go up, to climb", "go up|went up", { topics: ["la-ciudad"] }),
  d("salir", "to go out, to leave", "go out|went out", {
    topics: ["tiempo-libre", "rutina-diaria"],
    tags: ["yo-go"],
    present: { yo: "salgo" },
  }),
  d("ir", "to go", "go|went", {
    topics: ["la-ciudad", "mi-ciudad", "tiempo-libre", "rutina-diaria"],
    tags: ["irregular"],
    present: six("voy, vas, va, vamos, vais, van"),
    preterite: six("fui, fuiste, fue, fuimos, fuisteis, fueron"),
  }),
  d("venir", "to come", "come|came", {
    stem: "e-ie",
    topics: ["la-ciudad"],
    tags: ["irregular", "yo-go"],
    present: { yo: "vengo" },
    preterite: six("vine, viniste, vino, vinimos, vinisteis, vinieron"),
  }),
  d("dormir", "to sleep", "sleep|slept", { stem: "o-ue", topics: ["rutina-diaria"] }),
  d("preferir", "to prefer", "prefer|preferred", { stem: "e-ie", topics: ["tiempo-libre"] }),
  d("pedir", "to ask for, to order", "order|ordered", { stem: "e-i", topics: ["la-ciudad"] }),
  d("seguir", "to follow, to carry on", "follow|followed", {
    stem: "e-i",
    topics: ["la-ciudad"],
    tags: ["spelling-gu"],
    present: { yo: "sigo" },
  }),
  d("vestirse", "to get dressed", "get dressed|got dressed", { stem: "e-i", topics: ["rutina-diaria"] }),
  d("divertirse", "to have fun, to enjoy yourself", "have fun|had fun", { stem: "e-ie", topics: ["tiempo-libre"] }),

  // ----- others -----
  d("estar", "to be (location, feelings)", "be|was", {
    topics: ["mi-casa", "mi-dormitorio", "la-ciudad", "el-tiempo", "donde-vivo"],
    tags: ["irregular"],
    present: six("estoy, estás, está, estamos, estáis, están"),
    preterite: six("estuve, estuviste, estuvo, estuvimos, estuvisteis, estuvieron"),
  }),
  d("dar", "to give", "give|gave", {
    topics: ["tiempo-libre"],
    tags: ["irregular"],
    present: six("doy, das, da, damos, dais, dan"),
    preterite: six("di, diste, dio, dimos, disteis, dieron"),
  }),
  d("decir", "to say, to tell", "say|said", {
    stem: "e-i",
    tags: ["irregular", "yo-go"],
    present: { yo: "digo" },
    preterite: six("dije, dijiste, dijo, dijimos, dijisteis, dijeron"),
  }),
];

const BY_INF = new Map<string, VerbDef>();
for (const def of DEFS) {
  if (BY_INF.has(def.info.inf)) throw new Error(`Duplicate verb: ${def.info.inf}`);
  BY_INF.set(def.info.inf, def);
}

export const VERBS: readonly VerbInfo[] = DEFS.map((def) => def.info);

export function verbInfo(inf: string): VerbInfo | undefined {
  return BY_INF.get(inf.trim().toLowerCase())?.info;
}

/** All verbs carrying a tag, e.g. verbsWithTag("stem-o-ue") or verbsWithTag("topic:tareas"). */
export function verbsWithTag(tag: string): VerbInfo[] {
  return VERBS.filter((v) => v.tags.includes(tag));
}

function getDef(inf: string): VerbDef {
  const def = BY_INF.get(inf.trim().toLowerCase());
  if (!def) throw new Error(`Unknown verb: "${inf}"`);
  return def;
}

// ---------------------------------------------------------------------------
// Spanish engine
// ---------------------------------------------------------------------------

const IDX: Record<Person, number> = { yo: 0, tú: 1, él: 2, nosotros: 3, vosotros: 4, ellos: 5 };

const ENDINGS: Record<"present" | "preterite", Record<"ar" | "er" | "ir", readonly string[]>> = {
  present: {
    ar: ["o", "as", "a", "amos", "áis", "an"],
    er: ["o", "es", "e", "emos", "éis", "en"],
    ir: ["o", "es", "e", "imos", "ís", "en"],
  },
  preterite: {
    ar: ["é", "aste", "ó", "amos", "asteis", "aron"],
    er: ["í", "iste", "ió", "imos", "isteis", "ieron"],
    ir: ["í", "iste", "ió", "imos", "isteis", "ieron"],
  },
};

const REFLEXIVE_PRONOUN: Record<Person, string> = { yo: "me", tú: "te", él: "se", nosotros: "nos", vosotros: "os", ellos: "se" };

/** Replace the last occurrence of `from` in `stem` with `to`. */
function replaceLast(stem: string, from: string, to: string): string {
  const i = stem.lastIndexOf(from);
  if (i < 0) return stem;
  return stem.slice(0, i) + to + stem.slice(i + from.length);
}

const BOOT: Record<StemChange, [string, string]> = {
  "e-ie": ["e", "ie"],
  "o-ue": ["o", "ue"],
  "u-ue": ["u", "ue"],
  "e-i": ["e", "i"],
};

/** Simple-tense verb form without any reflexive pronoun. */
function simpleForm(def: VerbDef, tense: "present" | "preterite", person: Person): string {
  const override = def[tense][person];
  if (override) return override;
  const { group, stem: rawStem } = splitInf(def.info.inf);
  const ending = ENDINGS[tense][group][IDX[person]];
  let stem = rawStem;
  const boot = person !== "nosotros" && person !== "vosotros";

  if (tense === "present") {
    if (def.stemChange && boot) stem = replaceLast(stem, ...BOOT[def.stemChange]);
  } else {
    // -ir stem-changers: e→i / o→u in the third persons of the preterite.
    if (def.stemChange && group === "ir" && (person === "él" || person === "ellos")) {
      stem = def.stemChange === "o-ue" ? replaceLast(stem, "o", "u") : replaceLast(stem, "e", "i");
    }
    // -car / -gar / -zar spelling changes in the yo preterite.
    if (group === "ar" && person === "yo") {
      if (stem.endsWith("c")) stem = stem.slice(0, -1) + "qu";
      else if (stem.endsWith("g")) stem = stem.slice(0, -1) + "gu";
      else if (stem.endsWith("z")) stem = stem.slice(0, -1) + "c";
    }
  }
  return stem + ending;
}

function withPronoun(def: VerbDef, person: Person, form: string): string {
  return def.info.reflexive ? `${REFLEXIVE_PRONOUN[person]} ${form}` : form;
}

const IR_PRESENT = six("voy, vas, va, vamos, vais, van");

/**
 * Canonical conjugated form. Reflexives include the pronoun
 * ("me levanto"); the near future attaches it to the infinitive
 * ("voy a levantarme").
 */
export function conjugate(inf: string, tense: Tense, person: Person): string {
  const def = getDef(inf);
  if (tense === "near-future") {
    const base = splitInf(def.info.inf).base;
    const infinitive = def.info.reflexive ? base + REFLEXIVE_PRONOUN[person] : base;
    return `${IR_PRESENT[person]} a ${infinitive}`;
  }
  return withPronoun(def, person, simpleForm(def, tense, person));
}

/**
 * Every acceptable typed answer, canonical first: alternative pronoun
 * placement for the reflexive near future ("me voy a levantar") and
 * versions with an optional subject pronoun ("yo juego", "ella juega").
 */
export function acceptedForms(inf: string, tense: Tense, person: Person): string[] {
  const def = getDef(inf);
  const forms = [conjugate(inf, tense, person)];
  if (tense === "near-future" && def.info.reflexive) {
    forms.push(`${REFLEXIVE_PRONOUN[person]} ${IR_PRESENT[person]} a ${splitInf(def.info.inf).base}`);
  }
  const out = [...forms];
  for (const subject of SUBJECT_PRONOUNS[person]) for (const f of forms) out.push(`${subject} ${f}`);
  return [...new Set(out)];
}

export function conjugationTable(inf: string, tense: Tense): Record<Person, string> {
  getDef(inf); // throw early on unknown verbs
  const out = {} as Record<Person, string>;
  for (const p of PERSONS) out[p] = conjugate(inf, tense, p);
  return out;
}

export function presentTable(inf: string): Record<Person, string> {
  return conjugationTable(inf, "present");
}

export function preteriteTable(inf: string): Record<Person, string> {
  return conjugationTable(inf, "preterite");
}

export function nearFutureTable(inf: string): Record<Person, string> {
  return conjugationTable(inf, "near-future");
}

// ---------------------------------------------------------------------------
// English glosses
// ---------------------------------------------------------------------------

const EN_SUBJECT: Record<Person, string> = { yo: "I", tú: "you", él: "he/she", nosotros: "we", vosotros: "you all", ellos: "they" };
const EN_POSS: Record<Person, string> = { yo: "my", tú: "your", él: "his/her", nosotros: "our", vosotros: "your", ellos: "their" };
const EN_BE_PRESENT: Record<Person, string> = { yo: "am", tú: "are", él: "is", nosotros: "are", vosotros: "are", ellos: "are" };
const EN_BE_PAST: Record<Person, string> = { yo: "was", tú: "were", él: "was", nosotros: "were", vosotros: "were", ellos: "were" };

/** Natural English for a form: "I get up", "he/she played", "we are going to swim". */
export function englishGloss(inf: string, tense: Tense, person: Person): string {
  const { eng } = getDef(inf);
  const subject = EN_SUBJECT[person];
  const isBe = eng.base === "be" || eng.base.startsWith("be ");
  const rest = isBe ? eng.base.slice(2) : ""; // e.g. " called"
  let verb: string;
  if (tense === "near-future") {
    verb = `${EN_BE_PRESENT[person]} going to ${eng.future}`;
  } else if (tense === "present") {
    verb = isBe ? EN_BE_PRESENT[person] + rest : person === "él" ? eng.s3 : eng.base;
  } else {
    verb = isBe ? EN_BE_PAST[person] + rest : eng.past;
  }
  return `${subject} ${verb.replace(/\{poss\}/g, EN_POSS[person])}`;
}
