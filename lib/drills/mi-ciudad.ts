// Procedural skill drills for "Describing My Town & Extended Writing" (mi-ciudad).
// Every verb form comes from the tested conjugator in lib/spanish/verbs.ts.
import type { Drill, DrillItem, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { conjugate, acceptedForms, englishGloss, verbInfo, SUBJECT_PRONOUNS, PERSONS, type Person, type Tense } from "../spanish/verbs.ts";
import { vocab } from "../vocab/mi-ciudad.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";

const TOPIC = "mi-ciudad";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

const uniq = (xs: string[]): string[] => [...new Set(xs.map((x) => x.trim()).filter(Boolean))];
const cap = (s: string): string => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
/** Join words with single spaces, skipping empty parts. */
const sp = (...parts: string[]): string => parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
/** How the checker sees a string once accents are ignored. */
const loose = (s: string): string => stripAccents(normSpanish(s));

function text(accept: string[]): AnswerSpec {
  return { type: "text", accept: uniq(accept) };
}

/**
 * Build traps, dropping any that the real answer would accept or that differ
 * from an accepted answer only by accents (those get the accent nudge anyway).
 */
function traps(accept: string[], list: Array<[string | string[], string]>): Trap[] {
  const ok = new Set(accept.map(loose));
  const out: Trap[] = [];
  for (const [ans, feedback] of list) {
    const forms = uniq(Array.isArray(ans) ? ans : [ans]).filter((a) => !ok.has(loose(a)));
    forms.forEach((f) => ok.add(loose(f))); // never repeat a trap answer
    if (forms.length) out.push({ spec: { type: "text", accept: forms }, feedback });
    if (out.length === 2) break;
  }
  return out;
}

type G = "m" | "f";

/** Agree a dictionary-form (masculine singular) adjective. */
function agree(adj: string, g: G, pl: boolean): string {
  if (adj.endsWith("o")) return adj.slice(0, -1) + (g === "f" ? "a" : "o") + (pl ? "s" : "");
  if (/[aeiouáéíóú]$/.test(adj)) return adj + (pl ? "s" : "");
  return pl ? adj + "es" : adj; // industrial → industriales
}

/** Does the word start with an "ee" sound (i- / hi- + consonant)? Then y → e. */
const iSound = (w: string): boolean => /^h?[ií](?![aeiouáéíóú])/.test(w);
const andWord = (next: string): "y" | "e" => (iSound(next) ? "e" : "y");
const joinAnd = (a: string, b: string): string => `${a} ${andWord(b)} ${b}`;

function agreementRule(adj: string, form: string): string {
  if (adj.endsWith("o")) return `Adjectives ending in *-o* have four forms (*-o, -a, -os, -as*) → **${form}**.`;
  if (/[aeiouáéíóú]$/.test(adj)) return `Adjectives ending in *-e* don't change for gender; they just add *-s* in the plural → **${form}**.`;
  return `Adjectives ending in a consonant don't change for gender; they add *-es* in the plural → **${form}**.`;
}

const describeNoun = (g: G, pl: boolean): string => `${g === "f" ? "feminine" : "masculine"} ${pl ? "plural" : "singular"}`;

// ---------------------------------------------------------------------------
// Shared data
// ---------------------------------------------------------------------------

interface Adj {
  es: string;
  en: string;
  /** +1 positive, −1 negative, 0 neutral — keeps pairs of adjectives sensible. */
  v: 1 | -1 | 0;
}

const ADJS: Adj[] = [
  { es: "histórico", en: "historic", v: 0 },
  { es: "moderno", en: "modern", v: 0 },
  { es: "industrial", en: "industrial", v: 0 },
  { es: "turístico", en: "touristy", v: 0 },
  { es: "tranquilo", en: "quiet", v: 1 },
  { es: "ruidoso", en: "noisy", v: -1 },
  { es: "sucio", en: "dirty", v: -1 },
  { es: "limpio", en: "clean", v: 1 },
  { es: "animado", en: "lively", v: 1 },
  { es: "grande", en: "big", v: 0 },
  { es: "pequeño", en: "small", v: 0 },
  { es: "bonito", en: "pretty", v: 1 },
  { es: "precioso", en: "beautiful", v: 1 },
  { es: "aburrido", en: "boring", v: -1 },
  { es: "impresionante", en: "impressive", v: 1 },
  { es: "verde", en: "green", v: 1 },
];
const adj = (es: string): Adj => ADJS.find((a) => a.es === es)!;
const CLASHES = new Set(["tranquilo|animado", "animado|tranquilo", "grande|pequeño", "pequeño|grande", "turístico|tranquilo", "tranquilo|turístico"]);

interface Subj {
  es: string;
  en: string;
  /** The noun with its article, for explanations. */
  head: string;
  g: G;
  pl: boolean;
}

const SUBJ_BASIC: Subj[] = [
  { es: "mi ciudad", en: "my city", head: "la ciudad", g: "f", pl: false },
  { es: "mi pueblo", en: "my village", head: "el pueblo", g: "m", pl: false },
  { es: "mi barrio", en: "my neighbourhood", head: "el barrio", g: "m", pl: false },
];
const SUBJ_MORE: Subj[] = [
  { es: "el casco antiguo", en: "the old town", head: "el casco antiguo", g: "m", pl: false },
  { es: "la costa", en: "the coast", head: "la costa", g: "f", pl: false },
  { es: "las ciudades de la costa", en: "the cities on the coast", head: "las ciudades", g: "f", pl: true },
  { es: "los pueblos de las montañas", en: "the villages in the mountains", head: "los pueblos", g: "m", pl: true },
  { es: "los barrios del centro", en: "the neighbourhoods in the centre", head: "los barrios", g: "m", pl: true },
  { es: "las calles de mi barrio", en: "the streets in my neighbourhood", head: "las calles", g: "f", pl: true },
];

// --- time frames ------------------------------------------------------------

type TF = "past" | "present" | "future";
const TF_TENSE: Record<TF, Tense> = { past: "preterite", present: "present", future: "near-future" };
const TF_NAME: Record<TF, string> = { past: "past (preterite)", present: "present", future: "future (*ir a* + infinitive)" };
const TFS: readonly TF[] = ["past", "present", "future"];

const SIGNPOSTS: Record<TF, string[]> = {
  past: ["ayer", "el fin de semana pasado", "el sábado pasado", "el verano pasado", "la semana pasada"],
  present: ["normalmente", "los sábados", "a menudo", "los fines de semana", "todos los veranos"],
  future: ["mañana", "el sábado que viene", "el fin de semana que viene", "el año que viene", "el próximo sábado"],
};

interface Act {
  inf: string;
  rest: string;
  tier: 1 | 2 | 3;
}

const ACTS: Act[] = [
  { inf: "ir", rest: "al parque", tier: 1 },
  { inf: "ir", rest: "a la playa", tier: 1 },
  { inf: "ir", rest: "al centro", tier: 1 },
  { inf: "ir", rest: "al casco antiguo", tier: 1 },
  { inf: "ir", rest: "al mercado", tier: 1 },
  { inf: "ir", rest: "al cine", tier: 1 },
  { inf: "visitar", rest: "el museo", tier: 1 },
  { inf: "visitar", rest: "el castillo", tier: 1 },
  { inf: "visitar", rest: "la catedral", tier: 1 },
  { inf: "visitar", rest: "el casco antiguo", tier: 1 },
  { inf: "comer", rest: "churros", tier: 2 },
  { inf: "comer", rest: "una tortilla de patatas", tier: 2 },
  { inf: "comer", rest: "paella de verduras", tier: 2 },
  { inf: "comprar", rest: "fruta en el mercado", tier: 2 },
  { inf: "comprar", rest: "ropa en el centro", tier: 2 },
  { inf: "comprar", rest: "recuerdos", tier: 2 },
  { inf: "ver", rest: "una película en el cine", tier: 2 },
  { inf: "ver", rest: "un partido de fútbol", tier: 2 },
  { inf: "pasear", rest: "por el parque", tier: 2 },
  { inf: "pasear", rest: "por la playa", tier: 2 },
  { inf: "nadar", rest: "en el mar", tier: 2 },
  { inf: "jugar", rest: "al fútbol en el parque", tier: 3 },
  { inf: "jugar", rest: "al baloncesto con mis amigos", tier: 3 },
  { inf: "hacer", rest: "una visita guiada", tier: 3 },
  { inf: "hacer", rest: "muchas fotos", tier: 3 },
  { inf: "tomar", rest: "el sol en la playa", tier: 3 },
];

const actsFor = (tier: 1 | 2 | 3): Act[] => ACTS.filter((a) => a.tier <= tier);

const NAMED: Partial<Record<Person, string[]>> = {
  él: ["mi hermano", "Lucía", "mi madre", "Diego"],
  nosotros: ["mis amigos y yo", "mi familia y yo"],
  ellos: ["mis padres", "mis amigos", "Carmen y Javier"],
};

interface Who {
  person: Person;
  /** Subject words written in the sentence ("" = dropped pronoun). */
  subj: string;
}

function pickWho(rng: Rng, tier: 1 | 2 | 3): Who {
  const person: Person = tier === 1 ? "yo" : rng.pick(PERSONS);
  const named = NAMED[person];
  if (named && (person !== "nosotros" || rng.bool())) return { person, subj: rng.pick(named) };
  return { person, subj: "" };
}

const personNote = (w: Who): string => (w.subj ? "" : ` (subject: *${w.person}*)`);

// Regular endings — used ONLY to explain a form in the worked solution (the
// answer itself always comes from conjugate()).
const ENDS: Record<"present" | "preterite", Record<"ar" | "er" | "ir", readonly string[]>> = {
  present: { ar: ["o", "as", "a", "amos", "áis", "an"], er: ["o", "es", "e", "emos", "éis", "en"], ir: ["o", "es", "e", "imos", "ís", "en"] },
  preterite: { ar: ["é", "aste", "ó", "amos", "asteis", "aron"], er: ["í", "iste", "ió", "imos", "isteis", "ieron"], ir: ["í", "iste", "ió", "imos", "isteis", "ieron"] },
};

function formNote(inf: string, tense: Tense, p: Person): string {
  const form = conjugate(inf, tense, p);
  if (tense === "near-future") {
    return `*${conjugate("ir", "present", p)}* (the *${p}* form of *ir*) + *a* + the infinitive *${inf}* → **${form}**.`;
  }
  const info = verbInfo(inf)!;
  const stem = inf.slice(0, -2);
  const end = ENDS[tense][info.group][PERSONS.indexOf(p)];
  const name = tense === "present" ? "present" : "preterite";
  if (form === stem + end) return `*${inf}* → stem *${stem}-* + ${name} ending *-${end}* → **${form}**.`;
  if (tense === "preterite" && p === "yo") {
    if (info.tags.includes("spelling-gar")) return `*${inf}* → *${stem}-* + *-é*, but **g → gu** keeps the hard 'g' sound → **${form}**.`;
    if (info.tags.includes("spelling-car")) return `*${inf}* → *${stem}-* + *-é*, but **c → qu** keeps the hard 'k' sound → **${form}**.`;
    if (info.tags.includes("spelling-zar")) return `*${inf}* → *${stem}-* + *-é*, but **z → c** before *e* → **${form}**.`;
  }
  if (tense === "present" && info.tags.some((t) => t.startsWith("stem-"))) {
    return `*${inf}* is a stem-changing (boot) verb in the present → **${form}**.`;
  }
  return `*${inf}* is irregular in the ${name}: **${form}**.`;
}

/** Sentence variants: time phrase at the start or the end, optional subject pronoun. */
function sentenceVariants(time: string, w: Who, clause: string): string[] {
  const out: string[] = [];
  if (w.subj) {
    out.push(sp(time, w.subj, clause), sp(w.subj, clause, time));
  } else {
    out.push(sp(time, clause), sp(clause, time));
    for (const pr of SUBJECT_PRONOUNS[w.person]) out.push(sp(time, pr, clause), sp(pr, clause, time));
  }
  return out;
}

const pretty = (s: string): string => cap(s) + ".";

// ---------------------------------------------------------------------------
// 1. Vocabulary
// ---------------------------------------------------------------------------

interface VItem {
  es: string;
  en: string;
  note?: string;
  kind: "noun" | "adj" | "phrase";
}

const SKIP = new Set(["me gustaría que hubiera", "un millón de habitantes", "no hay nada para los jóvenes"]);
const vocabPool = (groups: number[]): VItem[] =>
  groups.flatMap((gi) =>
    vocab[gi].items
      .filter((it) => !SKIP.has(it.es))
      .map((it) => ({
        es: it.es,
        en: it.en,
        note: it.note,
        kind: /^(el|la|los|las) /.test(it.es) ? ("noun" as const) : vocab[gi].title === "Describing a town" ? ("adj" as const) : ("phrase" as const),
      })),
  );

const EXTRA_EN: Record<string, string[]> = {
  "la ciudad": ["town"],
  "el pueblo": ["small town"],
  "el barrio": ["area", "district", "neighborhood"],
  "el casco antiguo": ["old quarter", "historic quarter", "old part of town", "historic center"],
  "el campo": ["country", "field"],
  "el centro": ["center", "city centre", "city center", "downtown"],
  "el habitante": ["resident"],
  "estar situado": ["to be situated", "to be found"],
  "cerca de": ["close to", "nearby"],
  turístico: ["touristic", "popular with tourists", "tourist"],
  tranquilo: ["calm"],
  animado: ["busy", "bustling"],
  bonito: ["nice", "beautiful", "lovely"],
  precioso: ["gorgeous", "pretty", "stunning"],
  impresionante: ["amazing", "stunning", "impressive"],
  grande: ["large"],
  pequeño: ["little"],
  "la basura": ["litter", "trash", "garbage"],
  "la gente": ["the people"],
  "los jóvenes": ["youngsters", "teenagers", "young people", "the young"],
  "la zona verde": ["green area", "park area"],
  "el turista": ["tourists"],
  "lo bueno es que": ["the good part is that"],
  "lo malo es que": ["the bad part is that"],
};

const OPPOSITE: Record<string, string> = {
  tranquilo: "ruidoso",
  ruidoso: "tranquilo",
  sucio: "limpio",
  limpio: "sucio",
  grande: "pequeño",
  pequeño: "grande",
  "lo bueno es que": "lo malo es que",
  "lo malo es que": "lo bueno es que",
  "lo mejor es que": "lo peor es que",
  "lo peor es que": "lo mejor es que",
  "el norte": "el sur",
  "el sur": "el norte",
  "el este": "el oeste",
  "el oeste": "el este",
};

function enVariants(it: VItem): string[] {
  const out: string[] = [it.en];
  const base = it.en.replace(/\s*\([^)]*\)/g, "").trim();
  for (const part of [base, ...base.split(/,\s*/), ...(EXTRA_EN[it.es] ?? [])]) {
    out.push(part);
    if (part.startsWith("to ")) out.push(part.slice(3));
    if (it.kind === "noun") out.push(`the ${part}`, `a ${part}`, `an ${part}`);
  }
  return uniq(out);
}

function vocabItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const pool = vocabPool(tier === 1 ? [0, 1] : [0, 1, 2]);
  const it = rng.pick(pool);
  const toEnglish = tier === 1 ? true : tier === 2 ? rng.bool() : rng.bool(0.25);
  const noteStep = it.note ? [`Note: ${it.note}.`] : [];
  if (toEnglish) {
    const accept = enVariants(it);
    const opp = OPPOSITE[it.es];
    const oppItem = opp ? pool.find((x) => x.es === opp) ?? vocabPool([0, 1, 2]).find((x) => x.es === opp) : undefined;
    const trapList: Array<[string | string[], string]> = [];
    if (oppItem) trapList.push([enVariants(oppItem), `Careful — that's the opposite (*${oppItem.es}*). Look again at *${it.es}*.`]);
    if (it.es === "el campo") trapList.push([["camp", "the camp", "campsite"], "*El campo* is a false friend: it's the countryside (or a field), not a camp."]);
    const asks = [`What does *${it.es}* mean in English?`, `Translate into English: *${it.es}*`, `Give the English for *${it.es}*.`];
    return {
      prompt: rng.pick(asks),
      answer: text(accept),
      solution: [`*${it.es}* = **${it.en}**.`, ...noteStep],
      hint: it.kind === "adj" ? "Spot the cognate — many town adjectives look like English words." : "Think of the topic: describing a town and its good and bad points.",
      traps: traps(accept, trapList),
    };
  }
  // English → Spanish
  let accept: string[];
  let instruction: string;
  const trapList: Array<[string | string[], string]> = [];
  if (it.kind === "noun") {
    instruction = "Include el/la/los/las.";
    accept = [it.es, ...(it.es === "el turista" ? ["la turista"] : [])];
    trapList.push([it.es.replace(/^(el|la|los|las) /, ""), "Nearly — the task asks for the article too (el/la/los/las). It tells you the gender."]);
    if (it.es === "la ciudad") trapList.push(["el pueblo", "*El pueblo* is a town or village. 'City' is *la ciudad*."]);
    if (it.es === "el pueblo") trapList.push(["la ciudad", "*La ciudad* is a city. A village or small town is *el pueblo*."]);
  } else if (it.kind === "adj") {
    instruction = "Give the masculine singular form (as in *mi pueblo es…*).";
    accept = [it.es];
    const fem = agree(it.es, "f", false);
    if (fem !== it.es) trapList.push([fem, `That's the feminine form (for *la ciudad*). The masculine singular ends in *-o*.`]);
  } else {
    instruction = "";
    accept = [it.es, ...(it.es === "estar situado" ? ["situado", "estar situada"] : []), ...(it.es === "cerca de" ? ["cerca"] : [])];
    const opp = OPPOSITE[it.es];
    if (opp) trapList.push([opp, "Careful — that's the opposite. Check *bueno / malo* and *mejor / peor*."]);
    if (it.es.startsWith("lo ")) trapList.push([it.es.replace(/^lo /, "el "), "*El* + adjective means 'the ___ one'. For 'the ___ thing' use *lo*."]);
  }
  const asks = [`How do you say '${it.en}' in Spanish?`, `Write in Spanish: '${it.en}'.`, `Give the Spanish for '${it.en}'.`];
  return {
    prompt: sp(rng.pick(asks), instruction),
    answer: text(accept),
    solution: [`'${it.en}' = **${it.es}**.`, ...noteStep],
    hint: it.kind === "noun" ? "Gender detective: is it el or la? Most nouns ending in -a are feminine." : "Recycle a chunk from the vocab list for this topic.",
    traps: traps(accept, trapList),
  };
}

// ---------------------------------------------------------------------------
// 2. Adjective agreement
// ---------------------------------------------------------------------------

function agreementItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const subjects = tier === 1 ? SUBJ_BASIC : [...SUBJ_BASIC, ...SUBJ_MORE];
  const s = rng.pick(subjects);
  const ser = s.pl ? "son" : "es";
  const gender = `*${s.head}* is ${describeNoun(s.g, s.pl)}.`;

  // "está situado/a en…" frame (tier 2–3, singular town words only)
  if (tier >= 2 && !s.pl && s.es.startsWith("mi ") && rng.bool(0.2)) {
    const where = rng.pick(["en el norte", "en el sur", "en la costa", "en las montañas", "cerca del centro"]);
    const form = agree("situado", s.g, false);
    const sentence = `${cap(s.es)} está ___ ${where}.`;
    const accept = [form, `${s.es} está ${form} ${where}`];
    return {
      prompt: `Complete with the correct form of *situado* (located): *${sentence}*`,
      answer: text(accept),
      solution: [gender, `*Situado* agrees like any *-o* adjective → **${form}**.`, `${cap(s.es)} está ${form} ${where}.`],
      hint: "*Situado* is an adjective, so it agrees with the town word. Is that noun el or la?",
      traps: traps(accept, [[form === "situado" ? "situada" : "situado", "Check the gender of the noun — *situado* must match it."]]),
    };
  }

  if (tier === 3) {
    // Two adjectives, both agreeing, joined with y / e.
    let a1 = rng.pick(ADJS);
    let a2 = rng.pick(ADJS);
    for (let i = 0; i < 40 && (a1 === a2 || a1.v * a2.v < 0 || CLASHES.has(`${a1.es}|${a2.es}`)); i++) {
      a1 = rng.pick(ADJS);
      a2 = rng.pick(ADJS);
    }
    const f1 = agree(a1.es, s.g, s.pl);
    const f2 = agree(a2.es, s.g, s.pl);
    const phrase = joinAnd(f1, f2);
    const accept = [phrase, `${s.es} ${ser} ${phrase}`];
    const wrongJoin = `${f1} ${andWord(f2) === "e" ? "y" : "e"} ${f2}`;
    return {
      prompt: `Complete with BOTH adjectives in the correct form, joined with *y* (or *e*): *${cap(s.es)} ${ser} ___.* (${a1.es}, ${a2.es})`,
      answer: text(accept),
      solution: [
        gender,
        `*${a1.es}* → **${f1}**; *${a2.es}* → **${f2}**.`,
        andWord(f2) === "e" ? `*${f2}* starts with an 'ee' sound (i- / hi-), so *y* becomes **e**.` : "The second adjective doesn't start with an 'ee' sound, so keep **y**.",
        `**${phrase}**`,
      ],
      hint: "Agreement check: find the gender and number of the noun first, then fix both endings.",
      traps: traps(accept, [
        [joinAnd(a1.es, a2.es), `Those are the dictionary forms. Both adjectives must agree with *${s.head}* (${describeNoun(s.g, s.pl)}).`],
        [wrongJoin, andWord(f2) === "e" ? "Good agreement — but *y* becomes *e* before an 'ee' sound (i- / hi-)." : "Use *e* only before an 'ee' sound (i- / hi-). Here keep *y*."],
      ]),
    };
  }

  const pool = tier === 1 ? ADJS.filter((a) => a.es.endsWith("o") || rng.bool(0.25)) : ADJS;
  const a = rng.pick(pool);
  const form = agree(a.es, s.g, s.pl);
  const accept = [form, `${s.es} ${ser} ${form}`];
  const trapList: Array<[string | string[], string]> = [];
  if (form !== a.es) trapList.push([a.es, `That's the dictionary (masculine singular) form. *${s.head}* is ${describeNoun(s.g, s.pl)}.`]);
  const otherNum = agree(a.es, s.g, !s.pl);
  if (otherNum !== form) trapList.push([otherNum, s.pl ? "The noun is plural — add the plural ending." : "The noun is singular — no plural ending."]);
  const otherG = agree(a.es, s.g === "f" ? "m" : "f", s.pl);
  if (otherG !== form) trapList.push([otherG, `Check the gender: *${s.head}* is ${s.g === "f" ? "feminine" : "masculine"}.`]);
  return {
    prompt: `Complete with the correct form of the adjective in brackets: *${cap(s.es)} ${ser} ___.* (${a.es})`,
    answer: text(accept),
    solution: [gender, agreementRule(a.es, form), `${cap(s.es)} ${ser} ${form}.`],
    hint: "Gender detective: *la ciudad* is feminine; *el pueblo* and *el barrio* are masculine. Singular or plural?",
    traps: traps(accept, trapList),
  };
}

// ---------------------------------------------------------------------------
// 3. Lo bueno / lo malo / lo mejor / lo peor es que…
// ---------------------------------------------------------------------------

interface Opener {
  es: string;
  en: string;
  pos: boolean;
  swap: string;
}
const OPENERS: Opener[] = [
  { es: "lo bueno", en: "the good thing", pos: true, swap: "lo malo" },
  { es: "lo mejor", en: "the best thing", pos: true, swap: "lo peor" },
  { es: "lo malo", en: "the bad thing", pos: false, swap: "lo bueno" },
  { es: "lo peor", en: "the worst thing", pos: false, swap: "lo mejor" },
];

interface Clause {
  es: string;
  en: string;
  pos: boolean;
}
const CLAUSES: Clause[] = [
  { es: "hay muchos parques", en: "there are lots of parks", pos: true },
  { es: "hay muchas zonas verdes", en: "there are lots of green spaces", pos: true },
  { es: "el casco antiguo es precioso", en: "the old town is beautiful", pos: true },
  { es: "hay una playa preciosa", en: "there is a beautiful beach", pos: true },
  { es: "hay un mercado muy animado", en: "there is a very lively market", pos: true },
  { es: "hay muchas tiendas", en: "there are lots of shops", pos: true },
  { es: "hay demasiado tráfico", en: "there is too much traffic", pos: false },
  { es: "hay mucha contaminación", en: "there is a lot of pollution", pos: false },
  { es: "hay demasiada basura", en: "there is too much rubbish", pos: false },
  { es: "no hay nada para los jóvenes", en: "there is nothing for young people", pos: false },
  { es: "hay demasiados turistas", en: "there are too many tourists", pos: false },
  { es: "hay demasiado ruido", en: "there is too much noise", pos: false },
];

const ABOUT: { en: string; es: string[] }[] = [
  { en: "my city", es: ["mi ciudad"] },
  { en: "my village", es: ["mi pueblo"] },
  { en: "my neighbourhood", es: ["mi barrio"] },
  { en: "my town", es: ["mi ciudad", "mi pueblo"] },
  { en: "living in a city", es: ["vivir en una ciudad", "vivir en la ciudad"] },
];

const elVersion = (s: string): string => s.replace(/\blo (bueno|malo|mejor|peor)\b/g, "el $1");
const EL_FEEDBACK = "*El bueno / el peor* would mean 'the good one / the worst one' (a person or object). For 'the ___ thing', use *lo*.";

function loBuenoItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const op = rng.pick(OPENERS);
  const cl = rng.pick(CLAUSES.filter((c) => c.pos === op.pos));
  const opEnCap = cap(op.en);

  if (tier === 1) {
    const chunk = `${op.es} es que`;
    const accept = [chunk, `${chunk} ${cl.es}`];
    return {
      prompt: `Write the Spanish for '${opEnCap} is that…' to complete the sentence: *___ ${cl.es}.*`,
      answer: text(accept),
      solution: [`'${opEnCap}' = *lo* + adjective → *${op.es}*.`, "'is that' = *es que* (a full sentence with its own verb follows).", `**${cap(chunk)}** ${cl.es}.`],
      hint: "Spanish uses a special little word (not *el*) + adjective to mean 'the ___ thing'.",
      traps: traps(accept, [
        [elVersion(chunk), EL_FEEDBACK],
        [`${op.swap} es que`, `Check the meaning: *bueno* = good, *malo* = bad, *mejor* = best, *peor* = worst.`],
      ]),
    };
  }

  if (tier === 3 && rng.bool()) {
    // Two-sided: "The good thing is that…, but the bad thing is that…"
    const pair = rng.pick([
      [OPENERS[0], OPENERS[2]],
      [OPENERS[1], OPENERS[3]],
    ] as const);
    const c1 = rng.pick(CLAUSES.filter((c) => c.pos));
    const c2 = rng.pick(CLAUSES.filter((c) => !c.pos));
    const es = `${pair[0].es} es que ${c1.es} pero ${pair[1].es} es que ${c2.es}`;
    const accept = [pretty(es).replace(" pero lo ", ", pero lo "), es];
    return {
      prompt: `Translate into Spanish: '${cap(pair[0].en)} is that ${c1.en}, but ${pair[1].en} is that ${c2.en}.'`,
      answer: text(accept),
      solution: [
        `'${cap(pair[0].en)} is that' = *${pair[0].es} es que*; 'but ${pair[1].en} is that' = *pero ${pair[1].es} es que*.`,
        `Then two full sentences: *${c1.es}* and *${c2.es}* (watch *mucho / demasiado* agreement).`,
        `**${accept[0]}**`,
      ],
      hint: "Build it in two halves around *pero*: *lo* + adjective + *es que* + a sentence, twice.",
      traps: traps(accept, [[elVersion(es), EL_FEEDBACK]]),
    };
  }

  const about = tier === 3 ? rng.pick(ABOUT) : null;
  const heads = about ? about.es.map((a) => `${op.es} de ${a} es que`) : [`${op.es} es que`];
  const accept = [pretty(`${heads[0]} ${cl.es}`), ...heads.map((h) => `${h} ${cl.es}`)];
  const enHead = about ? `${opEnCap} about ${about.en} is that` : `${opEnCap} is that`;
  return {
    prompt: `Translate into Spanish: '${enHead} ${cl.en}.'`,
    answer: text(accept),
    solution: [
      `'${opEnCap}' = *${op.es}*${about ? `; 'about ${about.en}' = *de ${about.es[0]}*` : ""}.`,
      `'is that' = *es que*, then the sentence: *${cl.es}*.`,
      `**${accept[0]}**`,
    ],
    hint: "Use *lo* + adjective + *es que*, then a full sentence (often with *hay*).",
    traps: traps(accept, [
      [elVersion(heads[0]) + " " + cl.es, EL_FEEDBACK],
      [heads[0].replace(op.es, op.swap) + " " + cl.es, "Check the meaning: *bueno* = good, *malo* = bad, *mejor* = best, *peor* = worst."],
    ]),
  };
}

// ---------------------------------------------------------------------------
// 4. Connectives: meaning (es ↔ en)
// ---------------------------------------------------------------------------

interface Conn {
  es: string;
  en: string[];
  /** Spanish answers accepted when translating the English word. */
  esAccept: string[];
  core: boolean;
  ex: [string, string, string][]; // [Spanish sentence, English sentence, English word in it]
  trapEn?: [string[], string];
  trapEs?: [string[], string];
}

const CONNS: Conn[] = [
  {
    es: "y",
    en: ["and"],
    esAccept: ["y"],
    core: true,
    ex: [
      ["Mi ciudad es moderna y limpia.", "My city is modern and clean.", "and"],
      ["En mi barrio hay un parque y un mercado.", "In my neighbourhood there's a park and a market.", "and"],
    ],
  },
  {
    es: "pero",
    en: ["but"],
    esAccept: ["pero"],
    core: true,
    ex: [
      ["Mi pueblo es bonito pero un poco aburrido.", "My village is pretty but a bit boring.", "but"],
      ["Me gusta el centro pero hay mucho tráfico.", "I like the centre but there's a lot of traffic.", "but"],
    ],
  },
  {
    es: "también",
    en: ["also", "too", "as well"],
    esAccept: ["también"],
    core: true,
    ex: [
      ["Hay un parque y también hay un museo.", "There's a park and there's also a museum.", "also"],
      ["Mi barrio es tranquilo. También es muy verde.", "My neighbourhood is quiet. It's also very green.", "also"],
    ],
  },
  {
    es: "además",
    en: ["what's more", "in addition", "furthermore", "moreover", "besides", "also", "additionally"],
    esAccept: ["además"],
    core: true,
    ex: [
      ["Mi ciudad es limpia; además, hay muchas zonas verdes.", "My city is clean; what's more, there are lots of green spaces.", "what's more"],
      ["El casco antiguo es precioso; además, hay un mercado muy animado.", "The old town is beautiful; in addition, there's a very lively market.", "in addition"],
    ],
  },
  {
    es: "sin embargo",
    en: ["however", "nevertheless", "nonetheless"],
    esAccept: ["sin embargo"],
    core: true,
    ex: [
      ["Mi barrio es bonito; sin embargo, es ruidoso.", "My neighbourhood is pretty; however, it's noisy.", "however"],
      ["Hay muchas tiendas; sin embargo, no hay nada para los jóvenes.", "There are lots of shops; however, there's nothing for young people.", "however"],
    ],
    trapEs: [["pero"], "*Pero* = but. 'However', linking two sentences, is *sin embargo*."],
  },
  {
    es: "aunque",
    en: ["although", "even though", "though"],
    esAccept: ["aunque"],
    core: true,
    ex: [
      ["Me gusta mi ciudad aunque hay demasiado tráfico.", "I like my city although there's too much traffic.", "although"],
      ["Mi pueblo es tranquilo aunque es turístico.", "My village is quiet although it's touristy.", "although"],
    ],
    trapEn: [["also"], "Careful: *también* = also. *Aunque* introduces a contrast: 'although'."],
    trapEs: [["pero"], "*Pero* = but. 'Although' is *aunque*."],
  },
  {
    es: "porque",
    en: ["because", "since", "as"],
    esAccept: ["porque", "ya que"],
    core: true,
    ex: [
      ["Me encanta mi pueblo porque es muy tranquilo.", "I love my village because it's very quiet.", "because"],
      ["No me gusta el centro porque es demasiado ruidoso.", "I don't like the centre because it's too noisy.", "because"],
    ],
    trapEn: [["why"], "*¿Por qué?* (two words, accent) means 'why?'. *Porque* (one word) means 'because'."],
    trapEs: [["por qué"], "*¿Por qué?* (two words, accent) means 'why?'. 'Because' is one word: *porque*."],
  },
  {
    es: "ya que",
    en: ["since", "as", "because", "seeing as", "given that"],
    esAccept: ["ya que", "porque"],
    core: false,
    ex: [
      ["Prefiero el campo ya que es muy tranquilo.", "I prefer the countryside since it's very quiet.", "since"],
      ["Voy en metro ya que hay mucho tráfico.", "I go by metro as there's a lot of traffic.", "as"],
    ],
  },
  {
    es: "por eso",
    en: ["so", "that's why", "that is why", "therefore", "for that reason", "for this reason", "which is why"],
    esAccept: ["por eso", "así que"],
    core: true,
    ex: [
      ["Hay mucho tráfico; por eso voy en metro.", "There's a lot of traffic; that's why I go by metro.", "that's why"],
      ["Mi barrio es aburrido; por eso voy al centro.", "My neighbourhood is boring; that's why I go into town.", "that's why"],
    ],
    trapEn: [["because"], "*Porque* = because (points back to a cause). *Por eso* points forward to a result: 'that's why / so'."],
    trapEs: [["porque"], "*Porque* = because. 'That's why / so' points to a result: *por eso*."],
  },
  {
    es: "así que",
    en: ["so", "therefore"],
    esAccept: ["así que", "por eso"],
    core: false,
    ex: [
      ["Mi barrio es aburrido, así que voy al centro.", "My neighbourhood is boring, so I go into town.", "so"],
      ["Hay demasiada gente, así que no voy a la playa.", "There are too many people, so I don't go to the beach.", "so"],
    ],
  },
  {
    es: "en mi opinión",
    en: ["in my opinion", "in my view", "I think"],
    esAccept: ["en mi opinión"],
    core: false,
    ex: [
      ["En mi opinión, mi ciudad es preciosa.", "In my opinion, my city is beautiful.", "In my opinion"],
      ["En mi opinión, el centro es demasiado ruidoso.", "In my opinion, the centre is too noisy.", "In my opinion"],
    ],
  },
];

function connMeaningItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const c = rng.pick(tier === 1 ? CONNS.filter((x) => x.core) : CONNS);
  const [esS, enS, enWord] = rng.pick(c.ex);
  const toEnglish = tier === 1 ? true : tier === 2 ? rng.bool() : rng.bool(0.3);
  if (toEnglish) {
    const accept = [c.en[0], ...c.en];
    return {
      prompt: `What does *${c.es}* mean in this sentence? Answer in English. *${esS}*`,
      answer: text(accept),
      solution: [`*${c.es}* = **${c.en.slice(0, 2).join("** / **")}**.`, `The whole sentence: '${enS}'`],
      hint: "Use context: does the second part add, contrast, give a reason or give a result?",
      traps: c.trapEn ? traps(accept, [c.trapEn]) : [],
    };
  }
  const accept = c.esAccept;
  return {
    prompt: `Which Spanish connective translates **${enWord}** in this sentence? '${enS}'`,
    answer: text(accept),
    solution: [`'${enWord}' = **${c.es}**.`, `In Spanish: *${esS}*`],
    hint: "Decide the connective's job first: adding, contrasting, reason or result?",
    traps: c.trapEs ? traps(accept, [c.trapEs]) : [],
  };
}

// ---------------------------------------------------------------------------
// 5. Choosing the right connective
// ---------------------------------------------------------------------------

type Rel = "porque" | "aunque" | "por eso" | "sin embargo" | "además";
const REL_JOB: Record<Rel, string> = {
  porque: "the second part gives the **reason** for the first",
  aunque: "the second part **contrasts** with the first, inside one sentence",
  "por eso": "the second part is the **result** of the first",
  "sin embargo": "the second part **contrasts** with the first",
  además: "the second part **adds** another point in the same direction",
};
const REL_ACCEPT: Record<Rel, string[]> = {
  porque: ["porque", "ya que"],
  aunque: ["aunque"],
  "por eso": ["por eso", "así que"],
  "sin embargo": ["sin embargo"],
  además: ["además"],
};

const CHOICES: { rel: Rel; a: string; b: string; en: string }[] = [
  { rel: "porque", a: "Me encanta mi barrio", b: "es muy tranquilo", en: "I love my neighbourhood because it's very quiet." },
  { rel: "porque", a: "No me gusta vivir aquí", b: "no hay nada para los jóvenes", en: "I don't like living here because there's nothing for young people." },
  { rel: "porque", a: "Prefiero ir en metro", b: "hay demasiado tráfico", en: "I prefer to go by metro because there's too much traffic." },
  { rel: "porque", a: "Me gusta mucho el casco antiguo", b: "es precioso", en: "I really like the old town because it's beautiful." },
  { rel: "porque", a: "Mucha gente visita mi ciudad", b: "es muy histórica", en: "Lots of people visit my city because it's very historic." },
  { rel: "aunque", a: "Me gusta mi ciudad", b: "hay demasiado tráfico", en: "I like my city although there's too much traffic." },
  { rel: "aunque", a: "Mi pueblo es bonito", b: "es un poco aburrido", en: "My village is pretty although it's a bit boring." },
  { rel: "aunque", a: "Me encanta vivir en el centro", b: "es bastante ruidoso", en: "I love living in the centre although it's quite noisy." },
  { rel: "aunque", a: "Mi barrio es muy limpio", b: "no hay nada para los jóvenes", en: "My neighbourhood is very clean although there's nothing for young people." },
  { rel: "aunque", a: "No me gusta mucho mi pueblo", b: "es muy bonito", en: "I don't really like my village although it's very pretty." },
  { rel: "por eso", a: "Hay mucho tráfico", b: "prefiero ir en metro", en: "There's a lot of traffic, so I prefer to go by metro." },
  { rel: "por eso", a: "Mi barrio es muy aburrido", b: "voy al centro los fines de semana", en: "My neighbourhood is very boring, so I go into town at weekends." },
  { rel: "por eso", a: "Me encanta la naturaleza", b: "voy al campo los sábados", en: "I love nature, so I go to the countryside on Saturdays." },
  { rel: "por eso", a: "Mi ciudad está en la costa", b: "voy a la playa a menudo", en: "My city is on the coast, so I often go to the beach." },
  { rel: "por eso", a: "No hay nada para los jóvenes en mi pueblo", b: "voy al centro con mis amigos", en: "There's nothing for young people in my village, so I go into town with my friends." },
  { rel: "sin embargo", a: "Mi pueblo es muy bonito", b: "es un poco aburrido", en: "My village is very pretty; however, it's a bit boring." },
  { rel: "sin embargo", a: "Hay muchas zonas verdes", b: "hay demasiada basura", en: "There are lots of green spaces; however, there's too much rubbish." },
  { rel: "sin embargo", a: "Mi ciudad es moderna", b: "el casco antiguo es muy histórico", en: "My city is modern; however, the old town is very historic." },
  { rel: "sin embargo", a: "Me gusta vivir en el campo", b: "no hay nada para los jóvenes", en: "I like living in the countryside; however, there's nothing for young people." },
  { rel: "sin embargo", a: "Mi barrio es muy tranquilo", b: "está lejos del centro", en: "My neighbourhood is very quiet; however, it's far from the centre." },
  { rel: "además", a: "Mi ciudad es muy limpia", b: "hay muchas zonas verdes", en: "My city is very clean; what's more, there are lots of green spaces." },
  { rel: "además", a: "El casco antiguo es precioso", b: "hay un mercado muy animado", en: "The old town is beautiful; what's more, there's a very lively market." },
  { rel: "además", a: "Mi barrio es tranquilo", b: "está cerca de la playa", en: "My neighbourhood is quiet; what's more, it's near the beach." },
  { rel: "además", a: "Hay demasiada basura", b: "no hay nada para los jóvenes", en: "There's too much rubbish; what's more, there's nothing for young people." },
  { rel: "además", a: "Mi pueblo es muy bonito", b: "la gente es muy simpática", en: "My village is very pretty; what's more, the people are very friendly." },
];

const RIVAL: Record<Rel, Rel> = { porque: "aunque", aunque: "porque", "por eso": "sin embargo", "sin embargo": "además", además: "sin embargo" };
const WRONG_FEEDBACK: Record<Rel, Partial<Record<Rel, string>>> = {
  porque: { aunque: "*Aunque* (although) shows a contrast — but here the second part explains WHY. You need a reason word." },
  aunque: { porque: "*Porque* gives a reason — but here the second part goes against the first. You need a contrast." },
  "por eso": {
    porque: "*Porque* points back to a cause. Here the second part is the RESULT of the first.",
    "sin embargo": "*Sin embargo* shows a contrast — but here the second part follows on as a result.",
  },
  "sin embargo": { además: "*Además* adds a similar point — but here the second part goes against the first." },
  además: { "sin embargo": "*Sin embargo* shows a contrast — but here both points pull in the same direction." },
};

function gapSentence(rel: Rel, a: string, b: string, fill: string): string {
  if (rel === "porque" || rel === "aunque") return `${a} ${fill} ${b}.`;
  if (rel === "por eso") return `${a}; ${fill} ${b}.`;
  return `${a}; ${fill}, ${b}.`;
}

function chooseConnItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const ch = rng.pick(CHOICES);
  const rival = RIVAL[ch.rel];
  let bank: string[];
  if (tier === 1) bank = rng.shuffle([ch.rel, rival]);
  else if (tier === 2) bank = rng.shuffle(["porque", "por eso", "sin embargo", "además", "aunque"]);
  else bank = rng.shuffle(["porque", "por eso", "sin embargo", "además", "aunque", "pero", "también", "ya que", "así que"]);
  const accept = REL_ACCEPT[ch.rel];
  const trapList: Array<[string | string[], string]> = [];
  for (const [wrong, fb] of Object.entries(WRONG_FEEDBACK[ch.rel]) as [Rel, string][]) trapList.push([wrong, fb]);
  const bankText = bank.map((b) => `*${b}*`).join(", ");
  return {
    prompt: `Fill the gap with the connective that makes sense. Choose from ${bankText}. *${gapSentence(ch.rel, ch.a, ch.b, "___")}*`,
    answer: text(accept),
    solution: [
      `Ask how the two halves are linked: ${REL_JOB[ch.rel]}.`,
      `That's **${ch.rel}**: *${gapSentence(ch.rel, ch.a, ch.b, ch.rel)}*`,
      `'${ch.en}'`,
    ],
    hint: "Translate each half in your head. Does the second half explain, contrast, add, or follow as a result?",
    traps: traps(accept, trapList),
  };
}

// ---------------------------------------------------------------------------
// 6. Intensifiers: demasiado / mucho agree before nouns, never before adjectives
// ---------------------------------------------------------------------------

interface INoun {
  es: string;
  g: G;
  pl: boolean;
  en: string;
  neg: boolean;
}
const INOUNS: INoun[] = [
  { es: "tráfico", g: "m", pl: false, en: "traffic", neg: true },
  { es: "ruido", g: "m", pl: false, en: "noise", neg: true },
  { es: "contaminación", g: "f", pl: false, en: "pollution", neg: true },
  { es: "basura", g: "f", pl: false, en: "rubbish", neg: true },
  { es: "gente", g: "f", pl: false, en: "people", neg: true },
  { es: "turistas", g: "m", pl: true, en: "tourists", neg: true },
  { es: "coches", g: "m", pl: true, en: "cars", neg: true },
  { es: "tiendas", g: "f", pl: true, en: "shops", neg: false },
  { es: "parques", g: "m", pl: true, en: "parks", neg: false },
  { es: "zonas verdes", g: "f", pl: true, en: "green spaces", neg: false },
];

interface ISubj {
  es: string;
  en: string;
  g: G;
  pl: boolean;
}
const ISUBJS: ISubj[] = [
  { es: "mi ciudad", en: "my city", g: "f", pl: false },
  { es: "mi pueblo", en: "my village", g: "m", pl: false },
  { es: "el centro", en: "the centre", g: "m", pl: false },
  { es: "las calles", en: "the streets", g: "f", pl: true },
  { es: "los edificios", en: "the buildings", g: "m", pl: true },
  { es: "las playas", en: "the beaches", g: "f", pl: true },
];
const NEG_ADJS = ["ruidoso", "sucio", "turístico", "tranquilo", "moderno"];
const ANY_ADJS = ["ruidoso", "sucio", "turístico", "tranquilo", "moderno", "limpio", "bonito", "animado", "histórico", "pequeño"];

/** English for a noun phrase with an intensifier: "too much traffic", "too many people", "lots of parks". */
function enQuant(n: INoun, word: "demasiado" | "mucho"): string {
  const countable = n.pl || n.es === "gente";
  if (word === "demasiado") return `${countable ? "too many" : "too much"} ${n.en}`;
  return `${countable ? "lots of" : "a lot of"} ${n.en}`;
}
const thereIs = (n: INoun): string => (n.pl || n.es === "gente" ? "There are" : "There is");

function intensifierItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const word: "demasiado" | "mucho" = tier === 1 ? "demasiado" : rng.bool(0.6) ? "demasiado" : "mucho";

  if (tier === 3 && rng.bool(0.6)) {
    // Full sentence: noun phrase + adjective phrase.
    const n = rng.pick(INOUNS.filter((x) => (word === "demasiado" ? x.neg : true)));
    const s = rng.pick(ISUBJS);
    const a = rng.pick(word === "demasiado" ? NEG_ADJS.slice(0, 3) : ANY_ADJS);
    const qN = agree(word, n.g, n.pl);
    const qA = word === "demasiado" ? "demasiado" : "muy";
    const verb = s.pl ? "son" : "es";
    const es = `hay ${qN} ${n.es} y ${s.es} ${verb} ${qA} ${agree(a, s.g, s.pl)}`;
    const enAdj = adj(a).en;
    const en = `${thereIs(n)} ${enQuant(n, word)} and ${s.en} ${s.pl ? "are" : "is"} ${word === "demasiado" ? "too" : "very"} ${enAdj}.`;
    const accept = [pretty(es), es];
    const trapList: Array<[string | string[], string]> = [];
    if (qN !== word) trapList.push([es.replace(`hay ${qN} `, `hay ${word} `), `Before a noun, *${word}* agrees: *${n.es}* is ${describeNoun(n.g, n.pl)} → *${qN}*.`]);
    if (word === "demasiado" && (s.g === "f" || s.pl)) {
      trapList.push([es.replace(` ${verb} demasiado `, ` ${verb} ${agree("demasiado", s.g, s.pl)} `), "Before an adjective, *demasiado* means 'too' and never changes — only the adjective agrees."]);
    }
    if (word === "mucho") trapList.push([es.replace(`hay ${qN} `, "hay muy "), "*Muy* only goes before adjectives. Before a noun use *mucho / mucha / muchos / muchas*."]);
    return {
      prompt: `Translate into Spanish: '${en}'`,
      answer: text(accept),
      solution: [
        `Before the noun: *${n.es}* is ${describeNoun(n.g, n.pl)} → **${qN} ${n.es}**.`,
        `Before the adjective: *${qA}* never changes; the adjective agrees with *${s.es}* → **${qA} ${agree(a, s.g, s.pl)}**.`,
        `**${pretty(es)}**`,
      ],
      hint: "Two different jobs: before a noun the intensifier agrees; before an adjective it is fixed.",
      traps: traps(accept, trapList),
    };
  }

  const beforeNoun = tier === 1 ? true : rng.bool(0.55);
  if (beforeNoun) {
    const n = rng.pick(INOUNS.filter((x) => (word === "demasiado" ? x.neg : true)));
    const form = agree(word, n.g, n.pl);
    const frame = rng.pick(
      n.neg
        ? ["En mi ciudad hay ___ NOUN.", "Lo malo es que hay ___ NOUN.", "En el centro hay ___ NOUN.", "En verano hay ___ NOUN."]
        : ["En mi ciudad hay ___ NOUN.", "Lo bueno es que hay ___ NOUN.", "En mi barrio hay ___ NOUN."],
    );
    const sentence = frame.replace("NOUN", n.es);
    const full = sentence.replace("___", form).replace(/\.$/, "");
    const accept = [form, full];
    const instr = word === "demasiado" ? "Complete with the correct form of *demasiado* (too much / too many):" : "Complete with *mucho* or *muy* in the correct form:";
    const trapList: Array<[string | string[], string]> = [];
    if (word === "mucho") trapList.push(["muy", "*Muy* only goes before adjectives. Before a noun you need *mucho* — and it agrees."]);
    if (form !== word) trapList.push([word, `Before a noun, *${word}* agrees like an adjective: *${n.es}* is ${describeNoun(n.g, n.pl)}.`]);
    if (n.es === "gente") trapList.push([agree(word, "f", true), "*La gente* is singular in Spanish (even though 'people' is plural in English)."]);
    return {
      prompt: `${instr} *${sentence}*`,
      answer: text(accept),
      solution: [
        `The gap is before a **noun**, *${n.es}*, so the intensifier agrees with it.`,
        `*${n.es}* is ${describeNoun(n.g, n.pl)}${n.es === "gente" ? " (*la gente* — singular, unlike English 'people')" : ""} → **${form}**.`,
      ],
      hint: "Is the next word a noun or an adjective? Before a noun, the intensifier agrees.",
      traps: traps(accept, trapList),
    };
  }

  // Before an adjective: invariable (demasiado / muy).
  const s = rng.pick(ISUBJS);
  const a = rng.pick(word === "demasiado" ? NEG_ADJS : ANY_ADJS);
  const af = agree(a, s.g, s.pl);
  const verb = s.pl ? "son" : "es";
  const target = word === "demasiado" ? "demasiado" : "muy";
  const sentence = `${cap(s.es)} ${verb} ___ ${af}.`;
  const accept = [target, `${s.es} ${verb} ${target} ${af}`];
  const instr = word === "demasiado" ? "Complete with the correct form of *demasiado* (too):" : "Complete with *mucho* or *muy* in the correct form:";
  const trapList: Array<[string | string[], string]> = [];
  const agreed = agree(word, s.g, s.pl);
  if (word === "demasiado" && agreed !== "demasiado") trapList.push([agreed, "Before an adjective, *demasiado* means 'too' and never changes. Only the adjective agrees."]);
  if (word === "mucho") trapList.push([[agreed, "mucho"], "*Mucho* goes before nouns. Before an adjective, 'very' is *muy* — and it never changes."]);
  return {
    prompt: `${instr} *${sentence}*`,
    answer: text(accept),
    solution: [
      `The gap is before an **adjective**, *${af}*.`,
      word === "demasiado"
        ? "Before an adjective, *demasiado* is an adverb ('too') — it never changes → **demasiado**."
        : "Before an adjective, 'very' is **muy** — fixed, never *mucho*.",
    ],
    hint: "Is the next word a noun or an adjective? Adverbs before adjectives never agree.",
    traps: traps(accept, trapList),
  };
}

// ---------------------------------------------------------------------------
// 7. y → e before i- / hi-
// ---------------------------------------------------------------------------

const FIRST_NOUNS = ["museos", "parques", "tiendas", "playas", "cines", "mercados", "restaurantes"];
const SECOND_NOUNS = ["iglesias", "institutos", "islas", "hoteles", "jardines", "zonas verdes", "bibliotecas"];

interface YSubj {
  es: string;
  en: string;
  g: G;
  pl: boolean;
}
const YSUBJS: YSubj[] = [
  { es: "mi ciudad", en: "My city", g: "f", pl: false },
  { es: "mi pueblo", en: "My village", g: "m", pl: false },
  { es: "mi barrio", en: "My neighbourhood", g: "m", pl: false },
  { es: "el casco antiguo", en: "The old town", g: "m", pl: false },
  { es: "las calles", en: "The streets", g: "f", pl: true },
  { es: "los pueblos de la costa", en: "The villages on the coast", g: "m", pl: true },
];
const I_ADJS = ADJS.filter((a) => iSound(a.es));
const NON_I_ADJS = ADJS.filter((a) => !iSound(a.es));
const TRANSLATABLE = ADJS.filter((a) => !["bonito", "precioso"].includes(a.es));

function pickAdjPair(rng: Rng, pool: Adj[], wantI: boolean): [Adj, Adj] {
  for (let i = 0; i < 60; i++) {
    const a = rng.pick(pool);
    const b = rng.pick(wantI ? pool.filter((x) => iSound(x.es)) : pool.filter((x) => !iSound(x.es)));
    if (a !== b && a.v * b.v >= 0 && !CLASHES.has(`${a.es}|${b.es}`)) return [a, b];
  }
  return wantI ? [adj("moderno"), adj("histórico")] : [adj("limpio"), adj("tranquilo")];
}

function yeItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const wantI = rng.bool(0.55);
  const yFeedback = "Use *e* only when the next word starts with an 'ee' sound (i- / hi-). Otherwise keep *y*.";
  const eFeedback = "The next word starts with an 'ee' sound (i- / hi-), so *y* changes to *e* — otherwise you'd hear two 'ee' sounds run together.";

  if (tier === 1) {
    if (rng.bool(0.4)) {
      const n1 = rng.pick(FIRST_NOUNS);
      const n2 = rng.pick(SECOND_NOUNS.filter((n) => iSound(n) === wantI));
      const w = andWord(n2);
      const accept = [w, `en mi ciudad hay ${n1} ${w} ${n2}`];
      return {
        prompt: `Type *y* or *e* to fill the gap: *En mi ciudad hay ${n1} ___ ${n2}.*`,
        answer: text(accept),
        solution: [
          `Look at the word after the gap: *${n2}*.`,
          w === "e" ? `It starts with an 'ee' sound (*${n2.slice(0, 2)}-*), so **e**.` : n2.startsWith("h") ? "The *h* is silent and the next sound is not 'ee', so keep **y**." : "It doesn't start with an 'ee' sound, so keep **y**.",
        ],
        hint: "Say the next word aloud. Does it start with an 'ee' sound?",
        traps: traps(accept, [[w === "e" ? "y" : "e", w === "e" ? eFeedback : yFeedback]]),
      };
    }
    const s = rng.pick(YSUBJS.slice(0, 3));
    const [a, b] = pickAdjPair(rng, ADJS, wantI);
    const fa = agree(a.es, s.g, s.pl);
    const fb = agree(b.es, s.g, s.pl);
    const w = andWord(fb);
    const accept = [w, `${s.es} es ${fa} ${w} ${fb}`];
    return {
      prompt: `Type *y* or *e* to fill the gap: *${cap(s.es)} es ${fa} ___ ${fb}.*`,
      answer: text(accept),
      solution: [`Look at the word after the gap: *${fb}*.`, w === "e" ? `It starts with an 'ee' sound (*${fb.slice(0, 2)}-*), so **e**.` : "It doesn't start with an 'ee' sound, so keep **y**."],
      hint: "Say the next word aloud. Does it start with an 'ee' sound?",
      traps: traps(accept, [[w === "e" ? "y" : "e", w === "e" ? eFeedback : yFeedback]]),
    };
  }

  const s = rng.pick(YSUBJS);
  const verb = s.pl ? "son" : "es";
  const [a, b] = pickAdjPair(rng, tier === 3 ? TRANSLATABLE : ADJS, wantI);
  const fa = agree(a.es, s.g, s.pl);
  const fb = agree(b.es, s.g, s.pl);
  const w = andWord(fb);
  const phrase = `${fa} ${w} ${fb}`;
  const wrong = `${fa} ${w === "e" ? "y" : "e"} ${fb}`;
  const steps = [
    `*${s.es}* is ${describeNoun(s.g, s.pl)} → *${fa}*, *${fb}*.`,
    w === "e" ? `*${fb}* starts with an 'ee' sound, so *y* → **e**.` : `*${fb}* doesn't start with an 'ee' sound, so keep **y**.`,
  ];

  if (tier === 2) {
    const accept = [phrase, `${s.es} ${verb} ${phrase}`];
    return {
      prompt: `Write both adjectives in the correct form, in this order, joined with *y* or *e*: *${cap(s.es)} ${verb} ___.* (${a.es}, ${b.es})`,
      answer: text(accept),
      solution: [...steps, `**${phrase}**`],
      hint: "Two checks: agreement first, then listen to the start of the second adjective.",
      traps: traps(accept, [
        [wrong, w === "e" ? eFeedback : yFeedback],
        [joinAnd(a.es, b.es), `The adjectives must agree with *${s.es}* (${describeNoun(s.g, s.pl)}).`],
      ]),
    };
  }

  const es = `${s.es} ${verb} ${phrase}`;
  const accept = [pretty(es), es];
  return {
    prompt: `Translate into Spanish: '${s.en} ${s.pl ? "are" : "is"} ${a.en} and ${b.en}.'`,
    answer: text(accept),
    solution: [...steps, `**${pretty(es)}**`],
    hint: "Agreement check on both adjectives — then decide between *y* and *e*.",
    traps: traps(accept, [
      [`${s.es} ${verb} ${wrong}`, w === "e" ? eFeedback : yFeedback],
      [`${s.es} ${verb} ${joinAnd(a.es, b.es)}`, `The adjectives must agree with *${s.es}* (${describeNoun(s.g, s.pl)}).`],
    ]),
  };
}

// ---------------------------------------------------------------------------
// 8. Spot the time frame
// ---------------------------------------------------------------------------

const TF_ACCEPT: Record<TF, string[]> = {
  past: ["past", "the past", "past tense", "preterite", "the preterite", "pasado", "el pasado"],
  present: ["present", "the present", "present tense", "presente", "el presente"],
  future: ["future", "the future", "near future", "the near future", "immediate future", "future tense", "futuro", "el futuro"],
};

function spotItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const tf = rng.pick(TFS);
  const tense = TF_TENSE[tf];
  const act = rng.pick(actsFor(tier));
  const who = pickWho(rng, tier);
  const form = conjugate(act.inf, tense, who.person);
  // Is the verb form alone enough to tell the time frame?
  const distinctive = TFS.filter((t) => t !== tf).every((t) => conjugate(act.inf, TF_TENSE[t], who.person) !== form);
  const time = rng.pick(SIGNPOSTS[tf]);
  const mode0 = tier === 1 ? "start" : tier === 2 ? (rng.bool(0.7) ? "start" : "end") : rng.pick(["start", "end", "none"] as const);
  const mode = mode0 === "end" && time === "normalmente" ? "start" : mode0;
  const useTime = mode !== "none" || !distinctive;
  const clause = sp(who.subj, form, act.rest);
  const sentence = !useTime ? pretty(clause) : mode === "end" ? pretty(sp(clause, time)) : pretty(sp(time, clause));
  const accept = TF_ACCEPT[tf];
  const gloss = englishGloss(act.inf, tense, who.person);
  const trapList: Array<[string | string[], string]> = [];
  if (tf === "future") trapList.push([TF_ACCEPT.present, `*${conjugate("ir", "present", who.person)}* on its own is present, but *${conjugate("ir", "present", who.person)} a* + infinitive means 'going to' — the near future.`]);
  if (tf === "past") trapList.push([TF_ACCEPT.present, `*${form}* is a preterite form ('${gloss}')${useTime ? `, and *${time}* is a past signpost` : ""}.`]);
  if (tf === "present") trapList.push([TF_ACCEPT.past, `*${form}* is a present-tense form ('${gloss}')${useTime ? `, and *${time}* signals something that happens regularly` : ""}.`]);
  return {
    prompt: `Is this sentence about the past, the present or the future? Type past, present or future. *${sentence}*`,
    answer: { type: "text", accept: uniq(accept), display: tf },
    solution: [
      useTime ? `Signpost: *${time}* → ${tf}.` : "No time phrase — so the verb ending has to tell you.",
      `Verb: *${form}* = '${gloss}' (${TF_NAME[tf]}).`,
      `**${tf}**`,
    ],
    hint: useTime ? "Use the time phrase: it's a signpost for the tense." : "Find the verb and look at its ending — or spot *ir a* + infinitive.",
    traps: traps(accept, trapList),
  };
}

// ---------------------------------------------------------------------------
// 9. Match the verb to the signpost (gap-fill)
// ---------------------------------------------------------------------------

function gapTenseItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const tf = rng.pick(TFS);
  const tense = TF_TENSE[tf];
  const act = rng.pick(actsFor(tier));
  const who = pickWho(rng, tier);
  const time = rng.pick(SIGNPOSTS[tf]);
  const form = conjugate(act.inf, tense, who.person);
  const accept = who.subj ? [form] : acceptedForms(act.inf, tense, who.person);
  const sentence = pretty(sp(time, who.subj, "___", act.rest));
  const trapList: Array<[string | string[], string]> = [];
  if (tf !== "present") {
    trapList.push([
      conjugate(act.inf, "present", who.person),
      tf === "past" ? `That's the present. *${time}* is a past signpost — use the preterite.` : `That's the present. With the future signpost *${time}*, use *ir a* + infinitive here.`,
    ]);
  } else {
    trapList.push([conjugate(act.inf, "preterite", who.person), `That's the preterite (past). *${time}* is a present signpost — something that happens regularly.`]);
  }
  if (who.person !== "yo") trapList.push([conjugate(act.inf, tense, "yo"), `That's the *yo* form. Check the subject: *${who.subj || who.person}*.`]);
  return {
    prompt: `Complete with the correct form of *${act.inf}* to match the time phrase (for the future, use *ir a* + infinitive): *${sentence}*${personNote(who)}`,
    answer: text(accept),
    solution: [
      `Signpost *${time}* → ${TF_NAME[tf]}.`,
      `Subject: *${who.subj || who.person}* → *${who.person}* form.`,
      formNote(act.inf, tense, who.person),
    ],
    hint: "Read the time phrase first: past, present or future? Then check who is doing it.",
    traps: traps(accept, trapList),
  };
}

// ---------------------------------------------------------------------------
// 10. Move a sentence between time frames
// ---------------------------------------------------------------------------

const OPINIONS = ["genial", "muy divertido", "increíble", "un poco aburrido"];

function convertItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const from = tier === 1 ? "present" : rng.pick(TFS);
  const to = rng.pick(TFS.filter((t) => t !== from));
  const fromT = TF_TENSE[from];
  const toT = TF_TENSE[to];
  const who = pickWho(rng, tier);
  const p = who.person;
  const pool = tier === 1 ? ACTS.filter((a) => a.inf === "ir" || a.inf === "visitar") : actsFor(tier);
  const act = rng.pick(pool);
  const fromTime = rng.pick(SIGNPOSTS[from]);
  const toTime = rng.pick(SIGNPOSTS[to]);

  // Clause builders for a given tense.
  const extra = tier === 3 ? (rng.bool() ? "verb" : "opinion") : "none";
  const second = extra === "verb" ? rng.pick(ACTS.filter((a) => a.inf !== act.inf && a.inf !== "ir" && !a.rest.includes("con mis amigos"))) : null;
  const opinion = extra === "opinion" ? rng.pick(OPINIONS) : "";
  const clauses = (t: Tense): string[] => {
    const first = `${conjugate(act.inf, t, p)} ${act.rest}`;
    if (second) {
      const out = [`${first} y ${conjugate(second.inf, t, p)} ${second.rest}`];
      if (t === "near-future") out.push(`${first} y ${second.inf} ${second.rest}`);
      return out;
    }
    if (opinion) return [`${first} y ${conjugate("ser", t, "él")} ${opinion}`];
    return [first];
  };

  const source = pretty(sp(fromTime, who.subj, clauses(fromT)[0]));
  const target = clauses(toT);
  const accept = [pretty(sp(toTime, who.subj, target[0])), ...target.flatMap((c) => sentenceVariants(toTime, who, c))];
  const unchanged = sp(toTime, who.subj, clauses(fromT)[0]);
  const trapList: Array<[string | string[], string]> = [
    [unchanged, `You changed the time phrase but not the verb. *${cap(toTime)}* needs the ${TF_NAME[to]}.`],
  ];
  const otherP: Person = p === "yo" ? "él" : "yo";
  trapList.push([
    sp(toTime, who.subj, `${conjugate(act.inf, toT, otherP)} ${act.rest}`) + (target[0].slice(`${conjugate(act.inf, toT, p)} ${act.rest}`.length)),
    p === "yo" ? "That's the *él / ella* form. The subject here is *yo*." : `That's the *yo* form. The subject is *${who.subj || p}*.`,
  ]);
  const toNote = to === "future" ? " (use *ir a* + infinitive)" : "";
  const sameForm = conjugate(act.inf, fromT, p) === conjugate(act.inf, toT, p);
  return {
    prompt: `Rewrite this sentence in the ${to}${toNote}, starting with *${cap(toTime)}*: *${source}*${personNote(who)}`,
    answer: text(accept),
    solution: [
      `New signpost *${toTime}* → ${TF_NAME[to]}.`,
      formNote(act.inf, toT, p) + (sameForm ? " (The *nosotros* form is the same in the present and preterite of -ar / -ir verbs — the time phrase does the work.)" : ""),
      second ? formNote(second.inf, toT, p) : opinion ? `The opinion moves too: *es → fue → va a ser* → *${conjugate("ser", toT, "él")} ${opinion}*.` : "Everything else (the place, the detail) stays the same.",
      `**${accept[0]}**`,
    ],
    hint: "Swap the signpost, then change every verb to match it. Keep the subject the same.",
    traps: traps(accept, trapList),
  };
}

// ---------------------------------------------------------------------------
// 11. Build an extended sentence
// ---------------------------------------------------------------------------

interface Place {
  to: string;
  noun: string;
  en: string;
  g: G;
  adjs: string[];
}
const PLACES: Place[] = [
  { to: "al parque", noun: "el parque", en: "the park", g: "m", adjs: ["tranquilo", "bonito", "verde", "grande"] },
  { to: "a la playa", noun: "la playa", en: "the beach", g: "f", adjs: ["tranquilo", "limpio", "bonito"] },
  { to: "al centro", noun: "el centro", en: "the town centre", g: "m", adjs: ["animado", "bonito", "moderno"] },
  { to: "al casco antiguo", noun: "el casco antiguo", en: "the old town", g: "m", adjs: ["histórico", "animado", "bonito"] },
  { to: "al mercado", noun: "el mercado", en: "the market", g: "m", adjs: ["animado", "grande"] },
  { to: "a la piscina", noun: "la piscina", en: "the swimming pool", g: "f", adjs: ["limpio", "grande", "moderno"] },
];
const EXT_TIMES: [string, string][] = [
  ["los sábados", "On Saturdays I go"],
  ["normalmente", "Normally I go"],
  ["a menudo", "I often go"],
  ["los fines de semana", "At weekends I go"],
];
const COMPANY: [string[], string][] = [
  [["con mis amigos", "con mis amigas"], "with my friends"],
  [["con mi familia"], "with my family"],
  [["con mi hermano"], "with my brother"],
  [["con mi hermana"], "with my sister"],
];
const INTENS: [string, string][] = [
  ["muy", "very"],
  ["bastante", "quite"],
];

function extendedItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const pl = rng.pick(PLACES);
  const [tEs, tEn] = rng.pick(EXT_TIMES);
  const [cEs, cEn] = rng.pick(COMPANY);
  const withReason = tier >= 2;
  const withMore = tier === 3;
  const a = rng.pick(pl.adjs);
  const [iEs, iEn] = rng.pick(INTENS);
  const af = agree(a, pl.g, false);
  const opinion = withMore ? rng.pick([["y me encanta", "and I love it"], ["y me gusta mucho", "and I like it a lot"]] as const) : null;
  // Contrasts that don't contradict the reason (no "quiet … although it's noisy").
  const contrasts: [string, string, string[]][] = [
    ["aunque hay demasiada gente", "although there are too many people", ["tranquilo"]],
    ["aunque hay demasiados turistas", "although there are too many tourists", ["tranquilo"]],
    [`aunque es un poco ${agree("ruidoso", pl.g, false)}`, "although it's a bit noisy", ["tranquilo"]],
    ["aunque hay demasiada basura", "although there's too much rubbish", ["limpio", "bonito"]],
    [`aunque es un poco ${agree("pequeño", pl.g, false)}`, "although it's a bit small", ["grande"]],
    ["aunque está un poco lejos", "although it's a bit far away", []],
  ];
  const contrast = withMore ? rng.pick(contrasts.filter((c) => !c[2].includes(a))) : null;

  const tails = (because: string): string =>
    sp(opinion ? opinion[0] : "", withReason ? `${because} es ${iEs} ${af}` : "", contrast ? contrast[0] : "");
  const accept: string[] = [];
  const canon = pretty(sp(tEs, "voy", pl.to, cEs[0], tails("porque"))).replace(" aunque ", ", aunque ");
  accept.push(canon);
  for (const comp of cEs)
    for (const because of ["porque", "ya que"])
      for (const yo of ["", "yo"]) {
        const tail = tails(because);
        accept.push(sp(tEs, yo, "voy", pl.to, comp, tail), sp(yo, "voy", pl.to, comp, tEs, tail), sp(yo, "voy", pl.to, tEs, comp, tail));
      }

  const en = [
    `${tEn} to ${pl.en} ${cEn}`,
    opinion ? ` ${opinion[1]}` : "",
    withReason ? ` because it's ${iEn} ${adj(a).en}` : "",
    contrast ? `, ${contrast[1]}` : "",
    ".",
  ].join("");

  const trapList: Array<[string | string[], string]> = [];
  if (pl.to.startsWith("al ")) trapList.push([canon.replace(" al ", " a el "), "*A + el* always contracts to *al*: *voy al…*"]);
  if (withReason && pl.g === "f" && agree(a, "m", false) !== af) {
    trapList.push([canon.replace(` ${af}`, ` ${agree(a, "m", false)}`), `The adjective describes *${pl.noun}* (feminine) — make it agree.`]);
  }
  return {
    prompt: `Build the extended sentence in Spanish: '${en}'`,
    answer: text(accept),
    solution: [
      `When? *${tEs}* · Verb + where: *voy ${pl.to}*${pl.to.startsWith("al") ? " (a + el = al)" : ""} · With whom? *${cEs[0]}*.`,
      ...(withReason ? [`Why? *porque es ${iEs} ${af}* — *${af}* agrees with *${pl.noun}*; *${iEs}* never changes.`] : []),
      ...(withMore ? [`Opinion *${opinion![0]}* before the reason; contrast at the end: *${contrast![0]}*.`] : []),
      `**${canon}**`,
    ],
    hint: "Build it block by block: When? → verb + place → with whom?" + (withReason ? " → why?" : "") + (withMore ? " → but?" : ""),
    traps: traps(accept, trapList),
  };
}

// ---------------------------------------------------------------------------
// The drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  {
    id: `${TOPIC}.vocab`,
    topicId: TOPIC,
    title: "Town vocabulary: Spanish ↔ English",
    level: 1,
    guideRef: "town-adjectives",
    generate: vocabItem,
  },
  {
    id: `${TOPIC}.adjective-agreement`,
    topicId: TOPIC,
    title: "Town adjectives: agreement with la ciudad / el pueblo / mi barrio",
    level: 1,
    guideRef: "town-adjectives",
    generate: agreementItem,
  },
  {
    id: `${TOPIC}.connective-meanings`,
    topicId: TOPIC,
    title: "Connectives: what they mean (Spanish ↔ English)",
    level: 1,
    guideRef: "connectives-and-intensifiers",
    generate: connMeaningItem,
  },
  {
    id: `${TOPIC}.spot-time-frame`,
    topicId: TOPIC,
    title: "Spot the time frame: past, present or future?",
    level: 1,
    guideRef: "three-time-frames",
    generate: spotItem,
  },
  {
    id: `${TOPIC}.lo-bueno-lo-malo`,
    topicId: TOPIC,
    title: "Lo bueno / lo malo / lo mejor / lo peor es que…",
    level: 2,
    guideRef: "pros-and-cons",
    generate: loBuenoItem,
  },
  {
    id: `${TOPIC}.choose-connective`,
    topicId: TOPIC,
    title: "Choose the right connective: porque, por eso, sin embargo, además, aunque",
    level: 2,
    guideRef: "connectives-and-intensifiers",
    generate: chooseConnItem,
  },
  {
    id: `${TOPIC}.intensifiers`,
    topicId: TOPIC,
    title: "Intensifiers: demasiado / mucho before nouns vs adjectives",
    level: 2,
    guideRef: "connectives-and-intensifiers",
    generate: intensifierItem,
  },
  {
    id: `${TOPIC}.y-to-e`,
    topicId: TOPIC,
    title: "y becomes e before i- / hi-",
    level: 2,
    guideRef: "connectives-and-intensifiers",
    generate: yeItem,
  },
  {
    id: `${TOPIC}.verb-matches-signpost`,
    topicId: TOPIC,
    title: "Match the verb to the time phrase (preterite / present / ir a)",
    level: 2,
    guideRef: "three-time-frames",
    generate: gapTenseItem,
  },
  {
    id: `${TOPIC}.build-extended-sentence`,
    topicId: TOPIC,
    title: "Build an extended sentence block by block",
    level: 3,
    guideRef: "extended-sentences",
    generate: extendedItem,
  },
  {
    id: `${TOPIC}.change-time-frame`,
    topicId: TOPIC,
    title: "Move a sentence between past, present and future",
    level: 3,
    guideRef: "three-time-frames",
    generate: convertItem,
  },
];
