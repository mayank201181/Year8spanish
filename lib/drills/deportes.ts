// Procedural skill drills for topic "deportes" (Los deportes — Sport).
import type { Drill } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { conjugate, acceptedForms, verbInfo, PERSONS, type Person } from "../spanish/verbs.ts";
import { vocab } from "../vocab/deportes.ts";

const TOPIC = "deportes";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function join(...parts: string[]): string {
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}
function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/** Capitalised sentence with a full stop. */
function sentence(...parts: string[]): string {
  return cap(join(...parts)) + ".";
}
function uniq(items: string[]): string[] {
  return [...new Set(items.map((s) => join(s)))].filter(Boolean);
}
/** Every way of filling the slots in order (empty strings drop out). */
function combos(...slots: string[][]): string[] {
  let out = [""];
  for (const slot of slots) {
    const next: string[] = [];
    for (const a of out) for (const b of slot) next.push(join(a, b));
    out = next;
  }
  return uniq(out);
}
/** Loose comparison key: no accents, no punctuation, no case. */
function loose(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[¿?¡!.,;:"“”()…–—-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function text(accept: string[], display?: string): AnswerSpec {
  const a = uniq(accept);
  return display ? { type: "text", accept: a, display } : { type: "text", accept: a };
}
/** Build at most two traps, dropping any string that is accepted (or accepted apart from accents). */
function traps(accept: string[], list: Array<{ accept: string[]; feedback: string }>): Trap[] {
  const ok = new Set(accept.map(loose));
  const out: Trap[] = [];
  for (const t of list) {
    const a = uniq(t.accept).filter((x) => !ok.has(loose(x)));
    if (a.length) out.push({ spec: { type: "text", accept: a }, feedback: t.feedback });
    if (out.length === 2) break;
  }
  return out;
}

const PSHORT: Record<Person, string> = {
  yo: "yo",
  tú: "tú",
  él: "él / ella",
  nosotros: "nosotros",
  vosotros: "vosotros",
  ellos: "ellos / ellas",
};

// ---------------------------------------------------------------------------
// Subjects
// ---------------------------------------------------------------------------

interface Subj {
  p: Person;
  es: string;
  en: string;
  /** A subject pronoun: optional in answers. */
  drop: boolean;
  alts?: string[];
  /** Extra English note for "you". */
  note?: string;
}

const PRON: Subj[] = [
  { p: "yo", es: "yo", en: "I", drop: true },
  { p: "tú", es: "tú", en: "you", drop: true, note: " (Use *tú*.)" },
  { p: "él", es: "él", en: "he", drop: true },
  { p: "él", es: "ella", en: "she", drop: true },
  { p: "nosotros", es: "nosotros", en: "we", drop: true, alts: ["nosotras"] },
  { p: "vosotros", es: "vosotros", en: "you", drop: true, alts: ["vosotras"], note: " (Use *vosotros* — 'you all'.)" },
  { p: "ellos", es: "ellos", en: "they", drop: true, alts: ["ellas"] },
];

const NOUN_SUBJ: Subj[] = [
  { p: "él", es: "mi hermano", en: "my brother", drop: false },
  { p: "él", es: "mi hermana", en: "my sister", drop: false },
  { p: "él", es: "Lucía", en: "Lucía", drop: false },
  { p: "él", es: "Arjun", en: "Arjun", drop: false },
  { p: "ellos", es: "mis amigos", en: "my friends", drop: false, alts: ["mis amigas"] },
  { p: "ellos", es: "mis padres", en: "my parents", drop: false },
  { p: "ellos", es: "Pablo y Mei", en: "Pablo and Mei", drop: false },
  { p: "nosotros", es: "mi hermano y yo", en: "my brother and I", drop: false },
];

/** Spanish subject strings a learner may type (empty = pronoun left out). */
function subjForms(s: Subj): string[] {
  const base = [s.es, ...(s.alts ?? [])];
  return s.drop ? ["", ...base] : base;
}
/** Subject shown in a Spanish sentence: pronouns yo/tú/nosotros/vosotros are dropped (the verb shows the person). */
function shownSubj(s: Subj): string {
  return s.drop && s.p !== "él" && s.p !== "ellos" ? "" : s.es;
}

// ---------------------------------------------------------------------------
// Sports lexicon
// ---------------------------------------------------------------------------

type Art = "el" | "la" | "los" | "las";

interface Sport {
  noun: string;
  art: Art;
  en: string;
  verb: "jugar" | "hacer";
  /** English base phrase: "play football", "go swimming", "do yoga". */
  enDo: string;
  /** The sport's own verb, if it has one: nadar, esquiar, montar en bici… */
  own?: { inf: string; rest: string };
}

const BALL: Sport[] = [
  { noun: "fútbol", art: "el", en: "football", verb: "jugar", enDo: "play football" },
  { noun: "baloncesto", art: "el", en: "basketball", verb: "jugar", enDo: "play basketball" },
  { noun: "tenis", art: "el", en: "tennis", verb: "jugar", enDo: "play tennis" },
  { noun: "voleibol", art: "el", en: "volleyball", verb: "jugar", enDo: "play volleyball" },
  { noun: "hockey", art: "el", en: "hockey", verb: "jugar", enDo: "play hockey" },
  { noun: "bádminton", art: "el", en: "badminton", verb: "jugar", enDo: "play badminton" },
  { noun: "rugby", art: "el", en: "rugby", verb: "jugar", enDo: "play rugby" },
  { noun: "golf", art: "el", en: "golf", verb: "jugar", enDo: "play golf" },
  { noun: "pádel", art: "el", en: "padel", verb: "jugar", enDo: "play padel" },
];

/** Games that show a + la / a los / a las (no contraction). */
const GAMES: Sport[] = [
  { noun: "pelota", art: "la", en: "ball", verb: "jugar", enDo: "play ball" },
  { noun: "bolos", art: "los", en: "bowling", verb: "jugar", enDo: "go bowling" },
  { noun: "cartas", art: "las", en: "cards", verb: "jugar", enDo: "play cards" },
  { noun: "ajedrez", art: "el", en: "chess", verb: "jugar", enDo: "play chess" },
  { noun: "videojuegos", art: "los", en: "video games", verb: "jugar", enDo: "play video games" },
];

const ACTIVITIES: Sport[] = [
  { noun: "natación", art: "la", en: "swimming", verb: "hacer", enDo: "go swimming", own: { inf: "nadar", rest: "" } },
  { noun: "atletismo", art: "el", en: "athletics", verb: "hacer", enDo: "do athletics" },
  { noun: "ciclismo", art: "el", en: "cycling", verb: "hacer", enDo: "go cycling", own: { inf: "montar", rest: "en bici" } },
  { noun: "equitación", art: "la", en: "horse riding", verb: "hacer", enDo: "go horse riding", own: { inf: "montar", rest: "a caballo" } },
  { noun: "vela", art: "la", en: "sailing", verb: "hacer", enDo: "go sailing" },
  { noun: "esquí", art: "el", en: "skiing", verb: "hacer", enDo: "go skiing", own: { inf: "esquiar", rest: "" } },
  { noun: "patinaje", art: "el", en: "skating", verb: "hacer", enDo: "go skating" },
  { noun: "gimnasia", art: "la", en: "gymnastics", verb: "hacer", enDo: "do gymnastics" },
  { noun: "kárate", art: "el", en: "karate", verb: "hacer", enDo: "do karate" },
  { noun: "yoga", art: "el", en: "yoga", verb: "hacer", enDo: "do yoga" },
];

const SPORTS: Sport[] = [...BALL, ...ACTIVITIES];

/** jugar + a + article, with a + el = al. */
function withA(sp: Sport): string {
  return sp.art === "el" ? `al ${sp.noun}` : `a ${sp.art} ${sp.noun}`;
}

interface VO {
  v: string;
  o: string;
}

/** Verb + object options, canonical first (jugar a… / hacer…), then the sport's own verb. */
function vos(sp: Sport, p: Person, tense: "present" | "near-future", own = true): VO[] {
  const main: VO = sp.verb === "jugar" ? { v: conjugate("jugar", tense, p), o: withA(sp) } : { v: conjugate("hacer", tense, p), o: sp.noun };
  const out = [main];
  if (own && sp.own) out.push({ v: conjugate(sp.own.inf, tense, p), o: sp.own.rest });
  return out;
}

function enVerb(base: string, s3: boolean): string {
  if (!s3) return base;
  const [head, ...rest] = base.split(" ");
  const m: Record<string, string> = { play: "plays", go: "goes", do: "does" };
  return join(m[head] ?? head + "s", ...rest);
}

function whyVerb(sp: Sport): string {
  return sp.verb === "jugar"
    ? `*${cap(sp.noun)}* is a game you play against someone → *jugar a*${sp.art === "el" ? "; *a + el* squashes to **al**" : `; *a + ${sp.art}* doesn't contract`}: *${withA(sp)}*.`
    : `*${cap(sp.noun)}* is an activity, not a game → *hacer*, usually with no article: *${sp.noun}*.`;
}

/** Hand-written WRONG forms (traps only — never used as answers). */
const WRONG: Record<string, Record<Person, string>> = {
  jugar: { yo: "jugo", tú: "jugas", él: "juga", nosotros: "juegamos", vosotros: "juegáis", ellos: "jugan" },
  querer: { yo: "quero", tú: "queres", él: "quere", nosotros: "quieremos", vosotros: "quieréis", ellos: "queren" },
  poder: { yo: "podo", tú: "podes", él: "pode", nosotros: "puedemos", vosotros: "puedéis", ellos: "poden" },
  tener: { yo: "tieno", tú: "tenes", él: "tene", nosotros: "tienemos", vosotros: "tienéis", ellos: "tenen" },
};

const BOOT_IN: Record<Person, boolean> = { yo: true, tú: true, él: true, nosotros: false, vosotros: false, ellos: true };

function bootFeedback(inf: string, p: Person): string {
  const change = verbInfo(inf)?.tags.find((t) => t.startsWith("stem-"))?.replace("stem-", "").replace("-", "→") ?? "";
  return BOOT_IN[p]
    ? `*${cap(inf)}* is a boot verb (${change}) and *${PSHORT[p]}* is inside the boot — the stem changes: **${conjugate(inf, "present", p)}**.`
    : `*${cap(PSHORT[p])}* is outside the boot, so the stem does NOT change: **${conjugate(inf, "present", p)}**.`;
}

// ---------------------------------------------------------------------------
// Present-tense worked steps
// ---------------------------------------------------------------------------

const ENDS: Record<"ar" | "er" | "ir", readonly string[]> = {
  ar: ["o", "as", "a", "amos", "áis", "an"],
  er: ["o", "es", "e", "emos", "éis", "en"],
  ir: ["o", "es", "e", "imos", "ís", "en"],
};

function presentSteps(inf: string, p: Person): string[] {
  const form = conjugate(inf, "present", p);
  const group = inf.slice(-2) as "ar" | "er" | "ir";
  const stem = inf.slice(0, -2);
  const end = ENDS[group][PERSONS.indexOf(p)];
  const real = form.endsWith(end) ? form.slice(0, form.length - end.length) : form;
  const steps = [`Infinitive *${inf}* → stem *${stem}-*.`];
  if (real !== stem) {
    if (inf === "hacer") steps.push("*Hacer* is irregular in the *yo* form only: the stem becomes *hag-*.");
    else if (inf === "esquiar") steps.push(`In the boot forms *esquiar* puts an accent on the *í* to keep the stress there: *${real}-*.`);
    else steps.push(`*${cap(inf)}* is a boot verb and *${PSHORT[p]}* is inside the boot: *${stem}-* → *${real}-*.`);
  } else if (verbInfo(inf)?.tags.some((t) => t.startsWith("stem-"))) {
    steps.push(`*${cap(PSHORT[p])}* is outside the boot, so the stem keeps its vowel: *${stem}-*.`);
  }
  steps.push(`Add the *${PSHORT[p]}* ending for *-${group}* verbs (*-${end}*) → **${form}**.`);
  return steps;
}

// ---------------------------------------------------------------------------
// Vocabulary pools
// ---------------------------------------------------------------------------

type VItem = { es: string; en: string; note?: string };

function group(...titles: string[]): VItem[] {
  return vocab
    .filter((g) => titles.includes(g.title))
    .flatMap((g) => g.items)
    .filter((i) => !/[\/+¿?]|\.$/.test(i.es));
}

const EN_EXTRA: Record<string, string[]> = {
  "el fútbol": ["soccer"],
  "el pádel": ["padel tennis", "paddle tennis", "paddle"],
  "el ciclismo": ["biking", "bike riding"],
  "la equitación": ["riding", "horseriding"],
  "el atletismo": ["track and field"],
  "el esquí": ["ski"],
  "el polideportivo": ["sports center", "sport centre", "leisure centre", "leisure center", "sports hall"],
  "la piscina": ["pool"],
  "el campo de fútbol": ["football field", "football ground", "soccer field", "soccer pitch"],
  "la pista de tenis": ["tennis courts"],
  "aburrido": ["bored"],
  "divertido": ["enjoyable", "entertaining"],
  "difícil": ["hard"],
  "agotador": ["tiring", "exhausting"],
  "a menudo": ["frequently"],
  "a veces": ["at times"],
  "de vez en cuando": ["occasionally", "every now and then", "now and again", "once in a while"],
  "casi nunca": ["almost never", "rarely", "seldom"],
  "todos los días": ["everyday", "each day", "daily"],
  "una vez a la semana": ["one time a week", "once per week"],
  "dos veces a la semana": ["two times a week", "twice per week"],
  "los fines de semana": ["on weekends", "at the weekend", "on the weekend", "weekends", "at weekend"],
  "los lunes": ["mondays", "every monday"],
  "mi deporte preferido": ["my favorite sport", "my preferred sport"],
  "me encanta": ["i love it", "i really like"],
  "odio": ["i hate it"],
};

const ES_EN_TRAPS: Record<string, { accept: string[]; feedback: string }> = {
  "el partido": { accept: ["party", "the party", "a party"], feedback: "False friend! In sport *el partido* is a **match** or game. A party is *una fiesta*." },
  "la vela": { accept: ["candle", "the candle", "a candle"], feedback: "*Vela* can mean candle — but as a sport it's **sailing** (a *vela* is also the sail)." },
  "el campo de fútbol": { accept: ["football camp", "the football camp"], feedback: "*Campo* here is a field or **pitch**, not a camp." },
  "sano": { accept: ["sane"], feedback: "False friend! *Sano* means **healthy**. 'Sane' is *cuerdo*." },
  "emocionante": { accept: ["emotional", "emotive"], feedback: "Close, but *emocionante* means **exciting**. 'Emotional' is *emocional*." },
  "la pista de tenis": { accept: ["tennis track", "the tennis track"], feedback: "A *pista* is a track for running, but for tennis it's a **court**." },
};

function enAlts(item: VItem): string[] {
  const base = item.en
    .replace(/\([^)]*\)/g, "")
    .split(/,|\//)
    .map((s) => s.trim())
    .filter(Boolean);
  const all = [...base, ...(EN_EXTRA[item.es] ?? [])];
  const isNoun = /^(el|la|los|las) /.test(item.es);
  return uniq(isNoun ? [...all, ...all.map((a) => "the " + a)] : all);
}

function genderNote(noun: string, art: string): string {
  if (/ción$/.test(noun)) return "Words ending in *-ción* are feminine.";
  if (/ismo$/.test(noun)) return "Words ending in *-ismo* are masculine.";
  if (noun === "yoga") return "*Yoga* ends in *-a* but is masculine — a classic trap.";
  if (noun === "esquí" || noun === "patinaje") return "Words ending in *-aje* and most ending in a stressed vowel are masculine.";
  return `*${cap(noun)}* is ${art === "el" || art === "los" ? "masculine" : "feminine"} — learn every noun with its article.`;
}

// ---------------------------------------------------------------------------
// Frequency lexicon
// ---------------------------------------------------------------------------

interface Freq {
  es: string;
  en: string;
  /** short = before verb / after verb / end; long = start or end; neg = needs no… if after the verb. */
  kind: "short" | "long" | "neg";
  alts?: string[];
}

const FREQ_T1: Freq[] = [
  { es: "siempre", en: "always", kind: "short" },
  { es: "a menudo", en: "often", kind: "short" },
  { es: "a veces", en: "sometimes", kind: "short" },
  { es: "todos los días", en: "every day", kind: "long", alts: ["cada día"] },
  { es: "los fines de semana", en: "at weekends", kind: "long" },
];
const FREQ_T2: Freq[] = [
  ...FREQ_T1,
  { es: "de vez en cuando", en: "from time to time", kind: "long" },
  { es: "una vez a la semana", en: "once a week", kind: "long" },
  { es: "dos veces a la semana", en: "twice a week", kind: "long" },
  { es: "los sábados", en: "on Saturdays", kind: "long" },
  { es: "los lunes", en: "on Mondays", kind: "long" },
  { es: "nunca", en: "never", kind: "neg" },
];
const FREQ_T3: Freq[] = [...FREQ_T2, { es: "casi nunca", en: "hardly ever", kind: "neg" }, { es: "los domingos", en: "on Sundays", kind: "long" }];

/** Every accepted word order for subject + frequency + verb + object. */
function freqVariants(S: string[], vo: VO[], f: Freq): string[] {
  const F = [f.es, ...(f.alts ?? [])];
  const out: string[] = [];
  for (const { v, o } of vo) {
    if (f.kind === "short") {
      out.push(...combos(F, S, [v], [o]), ...combos(S, F, [v], [o]), ...combos(S, [v], F, [o]), ...combos(S, [v], [o], F));
    } else if (f.kind === "long") {
      out.push(...combos(F, S, [v], [o]), ...combos(S, [v], [o], F), ...combos(S, F, [v], [o]));
    } else {
      out.push(...combos(S, F, [v], [o]), ...combos(S, ["no"], [v], F, [o]), ...combos(S, ["no"], [v], [o], F));
    }
  }
  return uniq(out);
}

// ---------------------------------------------------------------------------
// Opinion lexicon
// ---------------------------------------------------------------------------

interface Adj {
  en: string;
  /** masc sing, fem sing, masc pl, fem pl */
  f: [string, string, string, string];
}
const ADJS: Adj[] = [
  { en: "fun", f: ["divertido", "divertida", "divertidos", "divertidas"] },
  { en: "boring", f: ["aburrido", "aburrida", "aburridos", "aburridas"] },
  { en: "dangerous", f: ["peligroso", "peligrosa", "peligrosos", "peligrosas"] },
  { en: "healthy", f: ["sano", "sana", "sanos", "sanas"] },
  { en: "exhausting", f: ["agotador", "agotadora", "agotadores", "agotadoras"] },
  { en: "exciting", f: ["emocionante", "emocionante", "emocionantes", "emocionantes"] },
  { en: "relaxing", f: ["relajante", "relajante", "relajantes", "relajantes"] },
  { en: "difficult", f: ["difícil", "difícil", "difíciles", "difíciles"] },
  { en: "easy", f: ["fácil", "fácil", "fáciles", "fáciles"] },
];

interface Thing {
  es: string;
  g: "m" | "f";
  pl: boolean;
  why: string;
}
const SING_SPORTS: Thing[] = [
  ...SPORTS.filter((s) => s.art === "el" || s.art === "la").map((s): Thing => ({
    es: `${s.art} ${s.noun}`,
    g: s.art === "el" ? "m" : "f",
    pl: false,
    why: `*${s.art} ${s.noun}* is ${s.art === "el" ? "masculine" : "feminine"} singular.`,
  })),
];
const INF_THINGS: Thing[] = [
  { es: "hacer gimnasia", g: "m", pl: false, why: "The subject is the activity *hacer gimnasia* (an infinitive), which counts as masculine singular — not *gimnasia* on its own." },
  { es: "jugar al rugby", g: "m", pl: false, why: "An infinitive (*jugar al rugby*) as the subject counts as masculine singular." },
  { es: "nadar", g: "m", pl: false, why: "An infinitive (*nadar*) as the subject counts as masculine singular." },
  { es: "montar a caballo", g: "m", pl: false, why: "An infinitive (*montar a caballo*) as the subject counts as masculine singular." },
  { es: "hacer natación", g: "m", pl: false, why: "The subject is the activity *hacer natación* (an infinitive) — masculine singular, even though *natación* is feminine." },
];
const PLURAL_THINGS: Thing[] = [
  { es: "los deportes de equipo", g: "m", pl: true, why: "*Los deportes* is masculine plural." },
  { es: "los deportes acuáticos", g: "m", pl: true, why: "*Los deportes* is masculine plural." },
  { es: "las clases de yoga", g: "f", pl: true, why: "*Las clases* is feminine plural (the adjective describes the classes, not yoga)." },
  { es: "las carreras", g: "f", pl: true, why: "*Las carreras* (races) is feminine plural." },
];
const MIXED_THINGS: Thing[] = [
  { es: "el tenis y el pádel", g: "m", pl: true, why: "Two masculine nouns → masculine plural." },
  { es: "la natación y la vela", g: "f", pl: true, why: "Two feminine nouns → feminine plural." },
  { es: "la gimnasia y el kárate", g: "m", pl: true, why: "A mixed group (one feminine + one masculine) takes the **masculine** plural." },
  { es: "la equitación y el ciclismo", g: "m", pl: true, why: "A mixed group (one feminine + one masculine) takes the **masculine** plural." },
];

function adjForm(a: Adj, t: Thing): string {
  return a.f[(t.pl ? 2 : 0) + (t.g === "f" ? 1 : 0)];
}

// ---------------------------------------------------------------------------
// Plans
// ---------------------------------------------------------------------------

const TIMES = ["el sábado que viene", "mañana", "este fin de semana", "la semana que viene", "esta tarde", "el domingo", "mañana por la mañana"];

interface Time {
  en: string;
  es: string[];
}
const FUT_TIMES: Time[] = [
  { en: "next Saturday", es: ["el sábado que viene", "el próximo sábado"] },
  { en: "this weekend", es: ["este fin de semana"] },
  { en: "tomorrow", es: ["mañana"] },
  { en: "next week", es: ["la semana que viene", "la próxima semana"] },
  { en: "this afternoon", es: ["esta tarde"] },
  { en: "on Sunday", es: ["el domingo"] },
];

// ---------------------------------------------------------------------------
// The drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ------------------------------------------------------------------------
  {
    id: "deportes.vocab-es-en",
    topicId: TOPIC,
    title: "Sports vocabulary: Spanish → English",
    level: 1,
    guideRef: "sports-vocab",
    generate(rng, tier) {
      const pool =
        tier === 1
          ? group("Sports")
          : tier === 2
            ? group("Sports", "Places and people", "How often?")
            : group("Sports", "Places and people", "How often?", "Opinions");
      const item = rng.pick(pool);
      const accept = enAlts(item);
      const prompt = rng.pick([
        `What does *${item.es}* mean in English?`,
        `Translate into English: *${item.es}*`,
        `Give the English for *${item.es}*.`,
      ]);
      const trapList = ES_EN_TRAPS[item.es] ? [ES_EN_TRAPS[item.es]] : [];
      return {
        prompt,
        answer: text(accept),
        solution: [
          `*${item.es}* = **${accept[0]}**.`,
          item.note ? `Note: ${item.note}.` : "Say it aloud and look for a cognate — many sports words are close to English.",
        ],
        hint: "Spot the cognate: say the Spanish word aloud — does it sound like an English word?",
        traps: traps(accept, trapList),
      };
    },
  },

  // 2 ------------------------------------------------------------------------
  {
    id: "deportes.vocab-en-es",
    topicId: TOPIC,
    title: "Sports vocabulary: English → Spanish (with el / la)",
    level: 1,
    guideRef: "sports-vocab",
    generate(rng, tier) {
      const pool = tier === 1 ? group("Sports") : group("Sports", "Places and people");
      const item = rng.pick(pool);
      const [art, ...rest] = item.es.split(" ");
      const noun = rest.join(" ");
      const en = enAlts(item)[0];
      const prompt = rng.pick([
        `Write the Spanish for '**${en}**'. Include *el* or *la*.`,
        `How do you say '**${en}**' in Spanish? Include the article (*el* or *la*).`,
        `Spanish, please: '**${en}**'. Include *el/la/los/las*.`,
      ]);
      const other = art === "el" ? "la" : art === "la" ? "el" : art === "los" ? "las" : "los";
      const accept = [item.es];
      return {
        prompt,
        answer: text(accept),
        solution: [`'${en}' = *${noun}*.`, genderNote(noun.split(" ")[0], art), `→ **${item.es}**`],
        hint: "Gender detective: think of the ending (-ción → la, -ismo → el) — and watch out for yoga!",
        traps: traps(accept, [
          { accept: [`${other} ${noun}`], feedback: `Wrong article. ${genderNote(noun.split(" ")[0], art)} → **${item.es}**.` },
          { accept: [noun], feedback: `Include the article — learn it as **${item.es}**.` },
        ]),
      };
    },
  },

  // 3 ------------------------------------------------------------------------
  {
    id: "deportes.present-jugar-hacer",
    topicId: TOPIC,
    title: "Jugar, hacer, practicar: present tense",
    level: 1,
    guideRef: "jugar-hacer-practicar",
    generate(rng, tier) {
      const verbs =
        tier === 1
          ? ["jugar", "hacer", "practicar"]
          : tier === 2
            ? ["jugar", "jugar", "hacer", "hacer", "practicar", "nadar", "correr", "entrenar", "ganar", "montar"]
            : ["jugar", "hacer", "practicar", "nadar", "correr", "entrenar", "ganar", "esquiar", "esquiar"];
      const inf = rng.pick(verbs);
      const useFrame = tier >= 2 && rng.bool(0.5);
      const info = verbInfo(inf);
      let prompt: string;
      let accept: string[];
      let p: Person;
      if (useFrame) {
        const s = rng.pick([...PRON, ...NOUN_SUBJ]);
        p = s.p;
        const tail: Record<string, string[]> = {
          jugar: BALL.map(withA),
          hacer: ACTIVITIES.filter((a) => a.verb === "hacer").map((a) => a.noun),
          practicar: ["el tenis", "la natación", "muchos deportes", "el pádel"],
          nadar: ["en la piscina", "en el mar", "los sábados"],
          correr: ["en el parque", "todas las mañanas", "con mi perro"],
          entrenar: ["con el equipo", "dos veces a la semana", "en el polideportivo"],
          ganar: ["el partido", "siempre", "a menudo"],
          montar: ["en bici", "a caballo"],
          esquiar: ["en Sierra Nevada", "en los Pirineos", "en invierno"],
        };
        const rest = rng.pick(tail[inf]);
        prompt = `Fill the gap with the present tense of *${inf}*: *${cap(join(s.es, "___", rest))}.*`;
        accept = [conjugate(inf, "present", p)];
      } else {
        p = rng.pick(tier === 1 ? PERSONS : PERSONS);
        prompt = rng.pick([
          `Write the *${PSHORT[p]}* form of *${inf}* (${info?.en ?? ""}) in the present tense.`,
          `Present tense: conjugate *${inf}* for *${PSHORT[p]}*.`,
        ]);
        accept = acceptedForms(inf, "present", p);
      }
      const trapList: Array<{ accept: string[]; feedback: string }> = [];
      if (WRONG[inf]) trapList.push({ accept: [WRONG[inf][p]], feedback: bootFeedback(inf, p) });
      if (inf === "hacer" && p === "yo") trapList.push({ accept: ["haco", "hazo", "yo haco", "yo hazo"], feedback: "*Hacer* is irregular in the *yo* form: **hago** (like *tengo, pongo, salgo*)." });
      return {
        prompt,
        answer: text(accept),
        solution: presentSteps(inf, p),
        hint: inf === "jugar" ? "Is the person inside the boot (yo, tú, él, ellos)? Then u → ue." : inf === "hacer" ? "Only the yo form of hacer is irregular." : "Find the stem, then add the ending for this person.",
        traps: traps(accept, trapList),
      };
    },
  },

  // 4 ------------------------------------------------------------------------
  {
    id: "deportes.jugar-al",
    topicId: TOPIC,
    title: "Jugar a + el = al (a la, a los, a las)",
    level: 1,
    guideRef: "jugar-hacer-practicar",
    generate(rng, tier) {
      const subjects = tier === 1 ? [PRON[0], PRON[1], PRON[2], PRON[3], NOUN_SUBJ[0], NOUN_SUBJ[2]] : [...PRON, ...NOUN_SUBJ];
      const s = rng.pick(subjects);
      const sp = tier === 1 ? rng.pick(BALL) : rng.bool(tier === 2 ? 0.35 : 0.5) ? rng.pick(GAMES) : rng.pick(BALL);
      const tail = tier === 3 ? rng.pick(["los sábados", "en el polideportivo", "todos los días", "en el colegio", "con sus primos"]) : "";
      const v = conjugate("jugar", "present", s.p);
      const ans = `${v} ${sp.art === "el" ? "al" : `a ${sp.art}`}`;
      const accept = [ans];
      const prompt = `Fill the gap with the present tense of *jugar* + *al / a la / a los / a las*: *${cap(join(s.es, "___", sp.noun, tail))}.*`;
      const contractionTrap =
        sp.art === "el"
          ? { accept: [`${v} a el`, `${v} el`], feedback: `*a + el* always squashes into **al**: **${ans}**.` }
          : { accept: [`${v} al`], feedback: `*Al* is only *a + el*. *${cap(sp.noun)}* takes *${sp.art}*, so no squash: **${ans}**.` };
      const second = BOOT_IN[s.p] || rng.bool()
        ? { accept: [v, `${v} ${sp.art}`], feedback: `*Jugar* always needs *a* before the game: **${ans}** (not *${v} ${sp.noun}*).` }
        : { accept: [`${WRONG.jugar[s.p]} ${ans.split(" ").slice(1).join(" ")}`], feedback: bootFeedback("jugar", s.p) };
      return {
        prompt,
        answer: text(accept),
        solution: [
          `Subject *${s.es}* → *${PSHORT[s.p]}* form of *jugar*: **${v}** ${BOOT_IN[s.p] ? "(inside the boot: u → ue)" : "(outside the boot: no stem change)"}.`,
          `*Jugar* is followed by *a*; *${sp.noun}* takes *${sp.art}*.`,
          sp.art === "el" ? `*a + el* → **al** → **${ans}**.` : `*a + ${sp.art}* doesn't contract → **${ans}**.`,
        ],
        hint: "Two jobs: conjugate jugar (boot verb?) and then decide: is it a + el (→ al) or a + la / los / las?",
        traps: traps(accept, [contractionTrap, second]),
      };
    },
  },

  // 5 ------------------------------------------------------------------------
  {
    id: "deportes.jugar-or-hacer",
    topicId: TOPIC,
    title: "Jugar a or hacer? Say who does which sport",
    level: 2,
    guideRef: "jugar-hacer-practicar",
    generate(rng, tier) {
      const subjects = tier === 1 ? [PRON[0], PRON[2], PRON[3], NOUN_SUBJ[1], NOUN_SUBJ[2]] : tier === 2 ? [...PRON, ...NOUN_SUBJ.slice(0, 5)] : [...PRON, ...NOUN_SUBJ];
      const s = rng.pick(subjects);
      const sp = rng.pick(SPORTS);
      const S = subjForms(s);
      const jugar = conjugate("jugar", "present", s.p);
      const hacer = conjugate("hacer", "present", s.p);
      const right = sp.verb === "jugar" ? `${jugar} ${withA(sp)}` : `${hacer} ${sp.noun}`;
      const accept = combos(S, [right]);
      const doWord = s.p === "él" ? "does" : "do";
      const prompt =
        `Write a sentence in Spanish saying that **${s.en}** ${doWord} this sport: *${sp.art} ${sp.noun}*. Use *jugar a* or *hacer* — whichever fits — in the present tense.` +
        (s.note ?? "");
      const trapList =
        sp.verb === "jugar"
          ? [
              { accept: combos(S, [hacer], [sp.noun, `${sp.art} ${sp.noun}`]), feedback: `${whyVerb(sp)} → **${cap(join(s.drop ? "" : s.es, right))}**.` },
              { accept: combos(S, [jugar], [sp.noun, `${sp.art} ${sp.noun}`]), feedback: `Don't forget the *a*: *jugar a* + *el* = **al** → *${right}*.` },
            ]
          : [{ accept: combos(S, [jugar], [withA(sp), sp.noun]), feedback: `${whyVerb(sp)} → **${cap(join(s.drop ? "" : s.es, right))}**.` }];
      return {
        prompt,
        answer: text(accept, sentence(s.drop ? "" : s.es, right)),
        solution: [
          whyVerb(sp),
          `Subject *${s.en}* → *${PSHORT[s.p]}* form: *${sp.verb === "jugar" ? jugar : hacer}*${sp.verb === "jugar" && BOOT_IN[s.p] ? " (u → ue in the boot)" : ""}${sp.verb === "hacer" && s.p === "yo" ? " (irregular yo form)" : ""}.`,
          `→ **${sentence(s.drop ? "" : s.es, right)}**`,
        ],
        hint: "Is it a game you play against someone (ball, racket, shuttlecock)? → jugar a. An activity? → hacer.",
        traps: traps(accept, trapList),
      };
    },
  },

  // 6 ------------------------------------------------------------------------
  {
    id: "deportes.frequency-sentences",
    topicId: TOPIC,
    title: "How often? Build a sentence with a frequency expression",
    level: 2,
    guideRef: "frequency",
    generate(rng, tier) {
      const s = tier === 1 ? PRON[0] : tier === 2 ? rng.pick(PRON) : rng.pick([...PRON, ...NOUN_SUBJ]);
      const sp = rng.pick(SPORTS);
      const f = rng.pick(tier === 1 ? FREQ_T1 : tier === 2 ? FREQ_T2 : FREQ_T3);
      const S = subjForms(s);
      const vo = vos(sp, s.p, "present");
      const accept = freqVariants(S, vo, f);
      const s3 = s.p === "él";
      const enV = enVerb(sp.enDo, s3);
      const enSentence = f.kind === "long" ? `${cap(s.en)} ${enV} ${f.en}.` : `${cap(s.en)} ${f.en} ${enV}.`;
      const main = vo[0];
      const canonical = f.kind === "neg" ? sentence(s.drop ? "" : s.es, f.es, main.v, main.o) : sentence(f.kind === "short" || f.kind === "long" ? f.es : "", s.drop ? "" : s.es, main.v, main.o);
      const alt = f.kind === "neg" ? sentence(s.drop ? "" : s.es, "no", main.v, f.es, main.o) : sentence(s.drop ? "" : s.es, main.v, main.o, f.es);
      const trapList: Array<{ accept: string[]; feedback: string }> = [];
      if (f.kind === "neg") {
        trapList.push({ accept: combos(S, [main.v], [f.es], [main.o]), feedback: `When *${f.es}* comes after the verb you need *no* in front: *no + verb + ${f.es}*. Or put *${f.es}* first: *${canonical}*` });
      }
      if (sp.verb === "jugar") {
        trapList.push({ accept: f.kind === "neg" ? combos(S, [f.es], [main.v], [sp.noun]) : combos([f.es], S, [main.v], [sp.noun]), feedback: `*Jugar* needs *a*, and *a + el* = *al*: *${main.v} ${main.o}*.` });
      }
      return {
        prompt: `Translate into Spanish: '**${enSentence}**'${s.note ?? ""}`,
        answer: text(accept, canonical),
        solution: [
          `Subject → *${PSHORT[s.p]}* form. ${whyVerb(sp)}`,
          `Core sentence: *${sentence(s.drop ? "" : s.es, main.v, main.o)}*${vo[1] ? ` (or with the sport's own verb: *${join(vo[1].v, vo[1].o)}*)` : ""}`,
          f.kind === "neg"
            ? `'${cap(f.en)}' = *${f.es}*. Before the verb it works alone; after the verb you need *no* in front.`
            : f.kind === "short"
              ? `'${cap(f.en)}' = *${f.es}*: a short word — put it before the verb, straight after it, or at the end.`
              : `'${cap(f.en)}' = *${f.es}*: a longer time phrase — put it at the start or the end.`,
          `→ **${canonical}** (or *${alt}*)`,
        ],
        hint: f.kind === "neg" ? "If nunca comes after the verb, the verb needs no in front of it." : "Build the core sentence first (subject + verb + sport), then slot in the time phrase.",
        traps: traps(accept, trapList),
      };
    },
  },

  // 7 ------------------------------------------------------------------------
  {
    id: "deportes.nunca-word-order",
    topicId: TOPIC,
    title: "Nunca: before the verb, or no… nunca",
    level: 2,
    guideRef: "frequency",
    generate(rng, tier) {
      const s = rng.pick(tier === 1 ? [PRON[0], PRON[2], PRON[3], NOUN_SUBJ[0], NOUN_SUBJ[4]] : [...PRON, ...NOUN_SUBJ]);
      const sp = rng.pick(SPORTS);
      const S = subjForms(s);
      const main = vos(sp, s.p, "present", false)[0];
      const shown = shownSubj(s);
      const before = combos(S, ["nunca"], [main.v], [main.o]);
      const after = [...combos(S, ["no"], [main.v], ["nunca"], [main.o]), ...combos(S, ["no"], [main.v], [main.o], ["nunca"])];
      const missingNo = { accept: combos(S, [main.v], ["nunca"], [main.o]), feedback: "When *nunca* comes after the verb, Spanish needs a negative sandwich: *no + verb + nunca*." };
      const doubled = { accept: [...combos(S, ["no nunca"], [main.v], [main.o]), ...combos(S, ["nunca no"], [main.v], [main.o])], feedback: "With *nunca* before the verb, *nunca* does the job alone — no extra *no*." };
      if (tier === 3 && rng.bool(0.5)) {
        // From English: both patterns accepted, own verbs too.
        const vo = vos(sp, s.p, "present");
        const accept = freqVariants(S, vo, { es: "nunca", en: "never", kind: "neg" });
        const enS = `${cap(s.en)} never ${enVerb(sp.enDo, false)}.`;
        return {
          prompt: `Translate into Spanish: '**${enS}**'${s.note ?? ""}`,
          answer: text(accept, sentence(shown || (s.drop ? "" : s.es), "nunca", main.v, main.o)),
          solution: [
            `${whyVerb(sp)} → *${join(main.v, main.o)}*.`,
            "Two correct patterns: *nunca + verb*, or *no + verb + nunca*.",
            `→ **${sentence(s.drop ? "" : s.es, "nunca", main.v, main.o)}** or **${sentence(s.drop ? "" : s.es, "no", main.v, "nunca", main.o)}**`,
          ],
          hint: "Never after the verb? Then the verb needs no in front of it.",
          traps: traps(accept, [missingNo]),
        };
      }
      const pos: "before" | "after" = rng.bool() ? "before" : "after";
      const oldF = tier >= 2 && rng.bool(0.5) ? rng.pick(["a menudo", "siempre", "a veces", "todos los días"]) : "";
      const original = oldF ? sentence(oldF, shown, main.v, main.o) : sentence(shown, main.v, main.o);
      const instruction = oldF
        ? `Change *${oldF}* to *nunca* (never), putting *nunca* **${pos} the verb**:`
        : `Make this sentence mean 'never' with *nunca* **${pos} the verb**:`;
      const accept = pos === "before" ? before : after;
      return {
        prompt: `${instruction} *${original}*`,
        answer: text(accept, pos === "before" ? sentence(shown, "nunca", main.v, main.o) : sentence(shown, "no", main.v, "nunca", main.o)),
        solution: [
          oldF ? `Take out *${oldF}*: *${sentence(shown, main.v, main.o)}*` : `Verb: *${main.v}*.`,
          pos === "before" ? "*Nunca* before the verb works on its own." : "*Nunca* after the verb needs *no* in front of the verb: *no + verb + nunca*.",
          `→ **${pos === "before" ? sentence(shown, "nunca", main.v, main.o) : sentence(shown, "no", main.v, "nunca", main.o)}**`,
        ],
        hint: pos === "before" ? "Nunca goes straight in front of the verb — nothing else needed." : "Make a negative sandwich: no + verb + nunca.",
        traps: traps(accept, [pos === "after" ? missingNo : doubled]),
      };
    },
  },

  // 8 ------------------------------------------------------------------------
  {
    id: "deportes.gusta-gustan",
    topicId: TOPIC,
    title: "Me gusta or me gustan?",
    level: 2,
    guideRef: "sports-opinions",
    generate(rng, tier) {
      const pres = [
        { pre: "Me", q: false },
        { pre: "No me", q: false },
        { pre: "¿Te", q: true },
        { pre: "A mi hermano le", q: false },
        { pre: "A Lucía no le", q: false },
        { pre: "Nos", q: false },
        { pre: "¿Os", q: true },
        { pre: "A mis padres les", q: false },
        { pre: "¿A tu hermana le", q: true },
      ];
      const pr = rng.pick(tier === 1 ? pres.slice(0, 3) : pres);
      const verb = tier === 1 ? "gustar" : rng.bool(tier === 2 ? 0.3 : 0.45) ? "encantar" : "gustar";
      type Kind = "one" | "inf" | "infs" | "plural";
      const things: Array<{ es: string; kind: Kind }> = [
        ...SING_SPORTS.map((t) => ({ es: t.es, kind: "one" as Kind })),
        ...["jugar al tenis", "hacer gimnasia", "nadar", "montar en bici", "hacer vela", "correr", "jugar al voleibol", "esquiar"].map((es) => ({ es, kind: "inf" as Kind })),
        ...["los deportes de equipo", "los deportes acuáticos", "los deportes de invierno", "los partidos de fútbol"].map((es) => ({ es, kind: "plural" as Kind })),
      ];
      if (tier === 3) {
        things.push(
          ...["nadar y correr", "jugar al fútbol y hacer atletismo"].map((es) => ({ es, kind: "infs" as Kind })),
          ...["el tenis y el pádel", "la vela y el esquí"].map((es) => ({ es, kind: "plural" as Kind })),
        );
      }
      const th = rng.pick(things);
      const sg = verb === "gustar" ? "gusta" : "encanta";
      const pl = verb === "gustar" ? "gustan" : "encantan";
      const right = th.kind === "plural" ? pl : sg;
      const wrong = th.kind === "plural" ? sg : pl;
      const why =
        th.kind === "one"
          ? `What is liked is one thing: *${th.es}* → singular **${sg}**.`
          : th.kind === "inf"
            ? `What is liked is an activity (infinitive *${th.es.split(" ")[0]}*) → singular **${sg}**.`
            : th.kind === "infs"
              ? `Even two activities (infinitives) take the singular → **${sg}**.`
              : `What is liked is plural: *${th.es}* → **${pl}**.`;
      const line = `${pr.pre} ___ ${th.es}${pr.q ? "?" : "."}`;
      const accept = [right];
      return {
        prompt: `Fill the gap with *${sg}* or *${pl}*: *${line}*`,
        answer: text(accept),
        solution: [
          `*${cap(verb)}* agrees with the thing that is liked, not with the person: '${verb === "gustar" ? "is pleasing" : "delights"} to me'.`,
          why,
          `→ *${line.replace("___", `**${right}**`)}*`,
        ],
        hint: "Ask: WHAT is liked? One thing or an activity → singular. Plural things → plural.",
        traps: traps(accept, [
          {
            accept: [wrong],
            feedback:
              th.kind === "plural"
                ? `*${cap(th.es)}* is plural, so the verb is plural: **${pl}**.`
                : `The verb agrees with what is liked (${th.kind === "one" ? "one thing" : "an activity"}), not the person → **${sg}**.`,
          },
        ]),
      };
    },
  },

  // 9 ------------------------------------------------------------------------
  {
    id: "deportes.opinion-adjectives",
    topicId: TOPIC,
    title: "Opinion adjectives: make them agree",
    level: 2,
    guideRef: "sports-opinions",
    generate(rng, tier) {
      const pool: Thing[] =
        tier === 1 ? SING_SPORTS : tier === 2 ? [...SING_SPORTS, ...INF_THINGS, ...PLURAL_THINGS] : [...SING_SPORTS, ...INF_THINGS, ...PLURAL_THINGS, ...MIXED_THINGS, ...MIXED_THINGS];
      const th = rng.pick(pool);
      const a = rng.pick(ADJS);
      const right = adjForm(a, th);
      const ser = th.pl ? "son" : "es";
      const isInf = !/^(el|la|los|las) /.test(th.es);
      const frames = [`${cap(th.es)} ${ser} ___.`, `${cap(th.es)} ${ser} muy ___.`];
      if (!isInf) {
        frames.push(`Me ${th.pl ? "gustan" : "gusta"} ${th.es} porque ${ser} ___.`, `Odio ${th.es} porque ${ser} bastante ___.`);
      }
      if (tier >= 2 && isInf) frames.push(`Para mí, ${th.es} ${ser} un poco ___.`);
      const line = rng.pick(frames);
      const accept = [right];
      const ms = a.f[0];
      const invariable = a.f[0] === a.f[1];
      const trapList: Array<{ accept: string[]; feedback: string }> = [];
      if (invariable && th.g === "f") {
        const bogus = ms.replace(/e$/, "a").replace(/l$/, "la");
        trapList.push({ accept: [bogus, bogus + "s"], feedback: `Adjectives ending in *-e* or a consonant (like *${ms}*) don't change for gender → **${right}**.` });
      }
      const oppGender = a.f[(th.pl ? 2 : 0) + (th.g === "f" ? 0 : 1)];
      trapList.push({ accept: [oppGender], feedback: `${th.why} → **${right}**.` });
      trapList.push({ accept: [ms], feedback: `Make it agree: ${th.why} → **${right}**.` });
      return {
        prompt: `Complete with the correct form of *${ms}* (${a.en}): *${line}*`,
        answer: text(accept),
        solution: [
          th.why,
          invariable
            ? `*${cap(ms)}* has the same form for masculine and feminine; plural adds *-${ms.endsWith("e") ? "s" : "es"}*.`
            : ms.endsWith("o")
              ? "*-o* adjectives: *-o / -a / -os / -as*."
              : "*Agotador* adds *-a* for feminine and *-es / -as* for plural.",
          `→ **${right}**`,
        ],
        hint: "Agreement check: find the noun the adjective describes — masculine or feminine? singular or plural?",
        traps: traps(accept, trapList),
      };
    },
  },

  // 10 -----------------------------------------------------------------------
  {
    id: "deportes.near-future-plans",
    topicId: TOPIC,
    title: "Sport plans: ir a + infinitive",
    level: 2,
    guideRef: "sport-plans",
    generate(rng, tier) {
      const s = rng.pick(tier === 1 ? PRON : [...PRON, ...NOUN_SUBJ]);
      const sp = rng.pick(SPORTS);
      const neg = tier === 3 && rng.bool(0.4);
      const time = tier >= 2 ? rng.pick(TIMES) : "";
      const pres = vos(sp, s.p, "present", false)[0];
      const fut = vos(sp, s.p, "near-future", false)[0];
      const shown = shownSubj(s);
      const S = subjForms(s);
      const N = [neg ? "no" : ""];
      const original = sentence(shown, N[0], pres.v, pres.o);
      const build = (v: string) => (time ? [...combos([time], S, N, [v], [fut.o]), ...combos(S, N, [v], [fut.o], [time]), ...combos(S, [time], N, [v], [fut.o])] : combos(S, N, [v], [fut.o]));
      const accept = build(fut.v);
      const ir = conjugate("ir", "present", s.p);
      const inf = sp.verb;
      const prompt = time
        ? `Turn this routine into a plan for *${time}* using *ir a* + infinitive: *${original}*`
        : `Rewrite as a plan (going to…) using *ir a* + infinitive: *${original}*`;
      const display = sentence(time, shown, N[0], fut.v, fut.o);
      return {
        prompt,
        answer: text(accept, display),
        solution: [
          `Subject → *${PSHORT[s.p]}*: *ir* → **${ir}**.`,
          `Add *a* + the infinitive (*${inf}*); keep the rest${sp.verb === "jugar" ? " — still *" + withA(sp) + "*" : ""}.`,
          neg ? "*No* goes in front of *ir*." : time ? `Put *${time}* at the start or the end.` : "Only *ir* changes for the person.",
          `→ **${display}**`,
        ],
        hint: "Only ir changes for the person; the sport verb stays as an infinitive after a.",
        traps: traps(accept, [
          { accept: build(`${ir} a ${pres.v}`), feedback: `After *ir a* the verb stays in the infinitive: *${ir} a ${inf}*, not *${ir} a ${pres.v}*.` },
          { accept: build(`${ir} ${inf}`), feedback: `You need the little glue word *a*: *${ir} **a** ${inf}*.` },
        ]),
      };
    },
  },

  // 11 -----------------------------------------------------------------------
  {
    id: "deportes.invitations",
    topicId: TOPIC,
    title: "Invitations: querer, poder (and tener que)",
    level: 2,
    guideRef: "sport-plans",
    generate(rng, tier) {
      const acts = ["jugar al tenis", "hacer yoga", "jugar al pádel", "hacer natación", "ir a la piscina", "montar en bici", "jugar al baloncesto", "hacer equitación", "ir al polideportivo"];
      const when = ["el sábado", "mañana", "esta tarde", "el domingo por la mañana", "este fin de semana"];
      const reasons = ["estudiar", "hacer los deberes", "ayudar en casa", "ir al médico"];
      const act = rng.pick(acts);
      const w = rng.pick(when);
      const frame = rng.int(0, tier === 3 ? 3 : 2);
      let verb: "querer" | "poder" | "tener";
      let p: Person;
      let line: string;
      if (frame === 0) {
        // Question to a friend / friends.
        verb = rng.bool() ? "querer" : "poder";
        p = tier === 1 ? "tú" : rng.pick<Person>(["tú", "vosotros"]);
        line = `¿___ (${verb}, ${p}) ${act} ${w}${p === "tú" || p === "vosotros" ? " conmigo" : ""}?`;
      } else if (frame === 1) {
        // Statement with a subject.
        verb = rng.bool() ? "querer" : "poder";
        const s = rng.pick(tier === 1 ? [PRON[0], NOUN_SUBJ[1], NOUN_SUBJ[4]] : [...PRON, ...NOUN_SUBJ]);
        p = s.p;
        const neg = verb === "poder" && rng.bool();
        line = `${cap(join(s.es, neg ? "no" : "", "___"))} (${verb}) ${act} ${w}.`;
      } else if (frame === 2) {
        // Saying no.
        verb = "poder";
        p = tier === 1 ? "yo" : rng.pick<Person>(["yo", "nosotros"]);
        line = `Lo siento, no ___ (poder, ${p}). ${p === "yo" ? "Tengo" : "Tenemos"} que ${rng.pick(reasons)}.`;
      } else {
        // tener que in a refusal.
        verb = "tener";
        const s = rng.pick([...PRON, ...NOUN_SUBJ]);
        p = s.p;
        line = `${cap(join(s.es, "no", conjugate("poder", "present", p)))} ${act} ${w} porque ___ (tener) que ${rng.pick(reasons)}.`;
      }
      const form = conjugate(verb, "present", p);
      const accept = [form];
      return {
        prompt: `Fill the gap with the present tense of the verb in brackets: *${line}*`,
        answer: text(accept),
        solution: [...presentSteps(verb, p), `→ *${line.replace(/___ \([^)]*\)/, `**${form}**`)}*`],
        hint:
          verb === "tener"
            ? "Tener is a boot verb (e→ie) with an irregular yo form (tengo)."
            : `${cap(verb)} is a boot verb (${verb === "querer" ? "e→ie" : "o→ue"}). Is the person inside the boot?`,
        traps: traps(accept, [{ accept: [WRONG[verb][p]], feedback: bootFeedback(verb, p) }]),
      };
    },
  },

  // 12 -----------------------------------------------------------------------
  {
    id: "deportes.routine-vs-plan",
    topicId: TOPIC,
    title: "Routine vs plan: present and near future in one sentence",
    level: 3,
    guideRef: "sport-plans",
    generate(rng, tier) {
      const s = tier === 1 ? PRON[0] : tier === 2 ? rng.pick([PRON[0], PRON[4]]) : rng.pick([PRON[0], PRON[4], NOUN_SUBJ[0], NOUN_SUBJ[1], NOUN_SUBJ[2], PRON[3]]);
      const sp1 = rng.pick(SPORTS);
      let sp2 = rng.pick(SPORTS);
      for (let i = 0; i < 10 && sp2 === sp1; i++) sp2 = rng.pick(SPORTS);
      const t = rng.pick(FUT_TIMES);
      const normEn = rng.pick(["Normally", "Usually"]);
      const S = subjForms(s);
      const S2 = [""];
      const N = ["normalmente", "generalmente", "por lo general"];
      const vo1 = vos(sp1, s.p, "present");
      const vo2 = vos(sp2, s.p, "near-future");
      const clause1: string[] = [];
      for (const { v, o } of vo1) clause1.push(...combos(N, S, [v], [o]), ...combos(S, [v], [o], N), ...combos(S, N, [v], [o]));
      const clause2: string[] = [];
      for (const { v, o } of vo2) clause2.push(...combos(t.es, S2, [v], [o]), ...combos(S2, [v], [o], t.es));
      const accept = combos(clause1, ["pero"], clause2);
      const s3 = s.p === "él";
      const beEn = s.p === "yo" ? "I'm" : s.p === "nosotros" ? "we're" : `${s.en} is`;
      const he = s.drop ? beEn : s.es === "mi hermano" || s.es === "Arjun" ? "he's" : "she's";
      const enClean = `${normEn} ${s.en} ${enVerb(sp1.enDo, s3)}, but ${t.en} ${he} going to ${sp2.enDo}.`;
      const m1 = vo1[0];
      const m2 = vo2[0];
      const display = `${cap(join("normalmente", s.drop ? "" : s.es, m1.v, m1.o))}, pero ${join(t.es[0], m2.v, m2.o)}.`;
      const wrongFut = join(conjugate("ir", "present", s.p), "a", conjugate(sp2.verb, "present", s.p), sp2.verb === "jugar" ? withA(sp2) : sp2.noun);
      return {
        prompt: `Translate into Spanish: '**${enClean}**'${s.note ?? ""}`,
        answer: text(accept, display),
        solution: [
          `Routine → present tense: *${join(s.drop ? "" : s.es, m1.v, m1.o)}* (${sp1.verb === "jugar" ? "a game → *jugar a*" : "an activity → *hacer*"}).`,
          `Plan → *ir a* + infinitive: *${join(m2.v, m2.o)}* (${sp2.verb === "jugar" ? "*jugar a*" : "*hacer*"}).`,
          `'${normEn}' = *normalmente*; '${t.en}' = *${t.es[0]}*; 'but' = *pero*.`,
          `→ **${display}**`,
        ],
        hint: "Two time frames: a habit (present) + a one-off plan (ir a + infinitive). Build each half, then join with pero.",
        traps: traps(accept, [
          { accept: combos([join("normalmente", s.drop ? "" : s.es, m1.v, m1.o)], ["pero"], [t.es[0]], [wrongFut]), feedback: "After *ir a* the sport verb stays in the infinitive (*jugar / hacer*)." },
        ]),
      };
    },
  },
];
