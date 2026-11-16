// Procedural skill drills for "Mi rutina diaria — Daily Routine".
// Every verb form comes from the tested conjugator in lib/spanish/verbs.ts.
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { conjugate, acceptedForms, englishGloss, PERSONS, PERSON_LABEL, SUBJECT_PRONOUNS, verbInfo, type Person } from "../spanish/verbs.ts";
import { vocab } from "../vocab/rutina-diaria.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";

const TOPIC = "rutina-diaria";

// ---------------------------------------------------------------------------
// General helpers
// ---------------------------------------------------------------------------

function uniq(xs: string[]): string[] {
  return [...new Set(xs.map((x) => x.replace(/\s+/g, " ").trim()).filter(Boolean))];
}

function textSpec(accept: string[]): AnswerSpec {
  return { type: "text", accept: uniq(accept) };
}

/** A trap that can never collide with an accepted answer (not even by accents only). */
function trap(wrong: string[], accept: string[], feedback: string): Trap[] {
  const ok = new Set(accept.map((a) => stripAccents(normSpanish(a))));
  const w = uniq(wrong).filter((x) => !ok.has(stripAccents(normSpanish(x))));
  return w.length ? [{ spec: { type: "text", accept: w }, feedback }] : [];
}

/** Every combination of the slot options, joined with spaces. */
function product(slots: string[][]): string[] {
  let out = [""];
  for (const slot of slots) {
    const next: string[] = [];
    for (const a of out) for (const b of slot) next.push(`${a} ${b}`);
    out = next;
  }
  return uniq(out);
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

const PRON: Record<Person, string> = { yo: "me", tú: "te", él: "se", nosotros: "nos", vosotros: "os", ellos: "se" };
const IDX: Record<Person, number> = { yo: 0, tú: 1, él: 2, nosotros: 3, vosotros: 4, ellos: 5 };
const ENDINGS: Record<"ar" | "er" | "ir", readonly string[]> = {
  ar: ["o", "as", "a", "amos", "áis", "an"],
  er: ["o", "es", "e", "emos", "éis", "en"],
  ir: ["o", "es", "e", "imos", "ís", "en"],
};
const POSS_PL: Record<Person, string> = { yo: "mis", tú: "tus", él: "sus", nosotros: "nuestros", vosotros: "vuestros", ellos: "sus" };
const POSS_SG: Record<Person, string> = { yo: "mi", tú: "tu", él: "su", nosotros: "nuestro", vosotros: "vuestro", ellos: "su" };
const BOOT = (p: Person) => p !== "nosotros" && p !== "vosotros";

/** Fill {pl} / {sg} possessive slots for a person. */
function poss(s: string, p: Person): string {
  return s.replace(/\{pl\}/g, POSS_PL[p]).replace(/\{sg\}/g, POSS_SG[p]);
}

/** Strip the reflexive pronoun from a conjugated form ("me levanto" → "levanto"). */
function bare(form: string): string {
  return form.replace(/^(me|te|se|nos|os) /, "");
}

function baseInf(inf: string): string {
  return /(ar|er|ir)se$/.test(inf) ? inf.slice(0, -2) : inf;
}

function groupOf(inf: string): "ar" | "er" | "ir" {
  return baseInf(inf).slice(-2) as "ar" | "er" | "ir";
}

/** "e→ie" etc. for a stem-changing verb, or "" if none. */
function stemChange(inf: string): string {
  const tag = verbInfo(inf)?.tags.find((t) => /^stem-/.test(t));
  return tag ? tag.slice(5).replace("-", "→") : "";
}

/**
 * Present-tense form. `compose` builds a reflexive from a non-reflexive base
 * verb (dormir → me duermo, poner → me pongo): pronoun + conjugator form.
 */
function present(inf: string, p: Person, compose = false): string {
  const form = conjugate(inf, "present", p);
  return compose ? `${PRON[p]} ${form}` : form;
}

/** Reflexive infinitive with the pronoun attached for a person: acostarse → acostarme. */
function reflexiveInf(inf: string, p: Person): string {
  return verbInfo(inf)?.reflexive ? baseInf(inf) + PRON[p] : inf;
}

// ---------------------------------------------------------------------------
// Time helpers
// ---------------------------------------------------------------------------

const HOUR_WORD = ["", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];
const MIN_WORDS: Record<number, string[]> = {
  5: ["cinco"],
  10: ["diez"],
  15: ["cuarto", "quince"],
  20: ["veinte"],
  25: ["veinticinco"],
  30: ["media", "treinta"],
};
const DIGITAL_WORD: Record<number, string> = {
  35: "treinta y cinco",
  40: "cuarenta",
  45: "cuarenta y cinco",
  50: "cincuenta",
  55: "cincuenta y cinco",
};
const MINUTES_5 = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const MINUTES_15 = [0, 15, 30, 45];

function hourNoun(h: number): string {
  return h === 1 ? "la una" : `las ${HOUR_WORD[h]}`;
}

function nextHour(h: number): number {
  return h === 12 ? 1 : h + 1;
}

function prevHour(h: number): number {
  return h === 1 ? 12 : h - 1;
}

/** Clock phrases without es/son or a: canonical first ("las siete y media"). */
function clockPhrases(h: number, m: number): string[] {
  if (m === 0) return [hourNoun(h), `${hourNoun(h)} en punto`];
  if (m <= 30) return MIN_WORDS[m].map((w) => `${hourNoun(h)} y ${w}`);
  const n = nextHour(h);
  return [...MIN_WORDS[60 - m].map((w) => `${hourNoun(n)} menos ${w}`), `${hourNoun(h)} ${DIGITAL_WORD[m]}`];
}

function esSon(phrase: string): string {
  return (phrase.startsWith("la una") ? "es " : "son ") + phrase;
}

/** Parts of the day for a 24-hour hour, canonical first. */
function partsOfDay(H: number): string[] {
  if (H >= 6 && H < 12) return ["de la mañana"];
  if (H === 12) return ["de la tarde", "del mediodía"];
  if (H >= 13 && H < 20) return ["de la tarde"];
  if (H === 20) return ["de la tarde", "de la noche"];
  if (H === 21) return ["de la noche", "de la tarde"];
  if (H >= 22) return ["de la noche"];
  return ["de la madrugada"];
}

function h12(H: number): number {
  return H % 12 === 0 ? 12 : H % 12;
}

function ampm(H: number, m: number): string {
  return `${h12(H)}:${pad2(m)} ${H < 12 ? "a.m." : "p.m."}`;
}

/** Honest analogue clock: hour hand moves between the hours as the minutes pass. */
function clockSvg(h: number, m: number): string {
  const cx = 100;
  const cy = 100;
  const pt = (deg: number, r: number) => {
    const a = (deg * Math.PI) / 180;
    return [(cx + r * Math.sin(a)).toFixed(1), (cy - r * Math.cos(a)).toFixed(1)];
  };
  let s = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Analogue clock showing ${h}:${pad2(m)}">`;
  s += `<rect x="0" y="0" width="200" height="200" fill="#ffffff"/>`;
  s += `<circle cx="100" cy="100" r="86" fill="#bae6fd" stroke="#1f2937" stroke-width="3"/>`;
  for (let i = 0; i < 60; i++) {
    const major = i % 5 === 0;
    const [x1, y1] = pt(i * 6, 84);
    const [x2, y2] = pt(i * 6, major ? 73 : 79);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#334155" stroke-width="${major ? 2.5 : 1}"/>`;
  }
  for (let n = 1; n <= 12; n++) {
    const [x, y] = pt(n * 30, 61);
    s += `<text x="${x}" y="${(Number(y) + 5).toFixed(1)}" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937">${n}</text>`;
  }
  const [hx, hy] = pt(((h % 12) + m / 60) * 30, 42);
  const [mx, my] = pt(m * 6, 70);
  s += `<line x1="100" y1="100" x2="${mx}" y2="${my}" stroke="#334155" stroke-width="3.5" stroke-linecap="round"/>`;
  s += `<line x1="100" y1="100" x2="${hx}" y2="${hy}" stroke="#1f2937" stroke-width="7" stroke-linecap="round"/>`;
  s += `<circle cx="100" cy="100" r="5" fill="#1f2937"/>`;
  s += `</svg>`;
  return s;
}

/** Digit strings a learner might type for a clock time (7:05, 07:05, 705, 0705). */
function digitForms(H: number, m: number): string[] {
  const mm = pad2(m);
  return [`${H}:${mm}`, `${pad2(H)}:${mm}`, `${H}${mm}`, `${pad2(H)}${mm}`];
}

function timeSolution(h: number, m: number): string[] {
  const steps: string[] = [];
  if (m === 0) steps.push("On the hour: just name the hour (add *en punto* for 'exactly' if you like).");
  else if (m <= 30) steps.push(`${m} minutes past → *y ${MIN_WORDS[m][0]}*.`);
  else steps.push(`${m} minutes is past the half hour, so count back from the **next** hour (${nextHour(h)}): ${60 - m} minutes to go → *menos ${MIN_WORDS[60 - m][0]}*.`);
  const named = m > 30 ? nextHour(h) : h;
  steps.push(named === 1 ? "The hour named is *una* — singular → *Es la una…*" : `The hour named is *${HOUR_WORD[named]}* — plural → *Son las ${HOUR_WORD[named]}…*`);
  return steps;
}

// ---------------------------------------------------------------------------
// Shared lexicon
// ---------------------------------------------------------------------------

/** People for gap-fills, with the person they take. */
const SUBJECTS: Record<Person, string[]> = {
  yo: ["Yo"],
  tú: ["Tú"],
  él: ["Mi hermano", "Mi madre", "Lucía", "Mi padre", "Javier", "Mi hermana"],
  nosotros: ["Mi hermana y yo", "Nosotros", "Mis amigos y yo"],
  vosotros: ["Vosotros", "Tú y Diego"],
  ellos: ["Mis padres", "Mis primos", "Aisha y Ravi", "Mis hermanas"],
};

/** Daily-routine chunks: Spanish verb + complement, with English (base / he-she). */
interface Chunk {
  inf: string;
  comp: string;
  /** Alternative complements also accepted ({pl}/{sg} = possessive). */
  alts?: string[];
  compose?: boolean;
  en: string;
  en3: string;
  /** -ing form for antes de / después de prompts. */
  ing: string;
}

const CH: Record<string, Chunk> = {
  despertarse: { inf: "despertarse", comp: "", en: "wake up", en3: "wakes up", ing: "waking up" },
  levantarse: { inf: "levantarse", comp: "", en: "get up", en3: "gets up", ing: "getting up" },
  ducharse: { inf: "ducharse", comp: "", en: "have a shower", en3: "has a shower", ing: "having a shower" },
  dientes: { inf: "lavarse", comp: "los dientes", en: "brush {my} teeth", en3: "brushes {his} teeth", ing: "brushing {my} teeth" },
  cara: { inf: "lavarse", comp: "la cara", en: "wash {my} face", en3: "washes {his} face", ing: "washing {my} face" },
  vestirse: { inf: "vestirse", comp: "", en: "get dressed", en3: "gets dressed", ing: "getting dressed" },
  peinarse: { inf: "peinarse", comp: "", en: "do {my} hair", en3: "does {his} hair", ing: "doing {my} hair" },
  desayunar: { inf: "desayunar", comp: "", en: "have breakfast", en3: "has breakfast", ing: "having breakfast" },
  salir: { inf: "salir", comp: "de casa", en: "leave home", en3: "leaves home", ing: "leaving home" },
  bus: { inf: "coger", comp: "el autobús", en: "catch the bus", en3: "catches the bus", ing: "catching the bus" },
  irBus: { inf: "ir", comp: "al colegio en autobús", en: "go to school by bus", en3: "goes to school by bus", ing: "going to school" },
  llegar: { inf: "llegar", comp: "al colegio", en: "arrive at school", en3: "arrives at school", ing: "arriving at school" },
  volver: { inf: "volver", comp: "a casa", en: "go back home", en3: "goes back home", ing: "getting home" },
  merendar: { inf: "merendar", comp: "", en: "have a snack", en3: "has a snack", ing: "having a snack" },
  deberes: { inf: "hacer", comp: "los deberes", alts: ["{pl} deberes"], en: "do {my} homework", en3: "does {his} homework", ing: "doing {my} homework" },
  cenar: { inf: "cenar", comp: "", en: "have dinner", en3: "has dinner", ing: "having dinner" },
  tele: { inf: "ver", comp: "la tele", alts: ["la televisión"], en: "watch TV", en3: "watches TV", ing: "watching TV" },
  leer: { inf: "leer", comp: "", en: "read", en3: "reads", ing: "reading" },
  movil: { inf: "jugar", comp: "con el móvil", alts: ["con {sg} móvil"], en: "play on {my} phone", en3: "plays on {his} phone", ing: "playing on {my} phone" },
  chatear: { inf: "chatear", comp: "con {pl} amigos", en: "chat with {my} friends", en3: "chats with {his} friends", ing: "chatting with {my} friends" },
  acostarse: { inf: "acostarse", comp: "", en: "go to bed", en3: "goes to bed", ing: "going to bed" },
};

function chunkComps(c: Chunk, p: Person): string[] {
  return [...new Set([c.comp, ...(c.alts ?? [])].map((x) => poss(x, p)))];
}

/** Conjugated chunk options for a person, canonical first: "me lavo los dientes". */
function chunkForms(c: Chunk, p: Person): string[] {
  const v = present(c.inf, p, c.compose);
  return chunkComps(c, p).map((comp) => `${v} ${comp}`.trim());
}

/** Infinitive chunk options for a person (pronoun attached): "lavarme los dientes". */
function chunkInfs(c: Chunk, p: Person): string[] {
  const v = reflexiveInf(c.inf, p);
  return chunkComps(c, p).map((comp) => `${v} ${comp}`.trim());
}

function enPoss(s: string, his: "his" | "her" | "my"): string {
  return s.replace(/\{my\}/g, his === "my" ? "my" : his).replace(/\{his\}/g, his === "my" ? "my" : his);
}

// ---------------------------------------------------------------------------
// Vocab helpers
// ---------------------------------------------------------------------------

interface VItem {
  es: string;
  en: string;
  group: string;
}
const ALL_VOCAB: VItem[] = vocab.flatMap((g) => g.items.map((i) => ({ es: i.es, en: i.en, group: g.title })));

/** Extra English meanings worth accepting for es→en. */
const EN_EXTRA: Record<string, string[]> = {
  "bañarse": ["to bathe", "bathe", "to have a swim", "to swim"],
  "peinarse": ["to brush your hair", "brush your hair", "to brush my hair", "to do my hair", "to comb my hair"],
  "lavarse los dientes": ["to clean your teeth", "to brush my teeth"],
  "lavarse la cara": ["to wash my face", "to wash one's face"],
  "vestirse": ["to dress", "to get dressed"],
  "maquillarse": ["to put on makeup", "to put makeup on", "to do your make-up", "to do your makeup"],
  "luego": ["later", "afterwards"],
  "después": ["after", "later", "then", "after that"],
  "entonces": ["so"],
  "finalmente": ["in the end", "at last"],
  "por último": ["finally", "last"],
  "por la tarde": ["in the evening", "in the afternoon"],
  "de la tarde": ["in the evening", "pm", "p m", "in the afternoon"],
  "de la mañana": ["am", "a m"],
  "de la noche": ["pm", "p m", "in the evening", "at night"],
  "en metro": ["by metro", "by mrt", "by tube", "by subway", "on the metro", "on the mrt"],
  "en bici": ["by bicycle", "by bike", "on a bike"],
  "en coche": ["in the car"],
  "en autobús": ["on the bus"],
  "en tren": ["on the train"],
  "a pie": ["walking"],
  "el colegio": ["the school"],
  "el instituto": ["high school", "secondary school"],
  "la comida": ["lunch", "food", "the meal", "meal"],
  "la cena": ["supper", "the evening meal"],
  "la merienda": ["snack", "an afternoon snack", "a snack"],
  "ir al colegio": ["go to school"],
  "volver a casa": ["to get home", "to come home", "to come back home", "to go home"],
  "ver la tele": ["to watch television", "to watch the tv"],
  "jugar con el móvil": ["to play on my phone", "to play on the phone", "to play with your phone", "to play on your mobile"],
  "chatear con mis amigos": ["to chat with friends", "to chat to my friends"],
  "coger el autobús": ["to take the bus", "to get the bus"],
  "salir de casa": ["to leave the house", "to leave home"],
  "hacer los deberes": ["to do my homework", "to do your homework", "to do the homework"],
  "Son las dos.": ["it is 2 o clock", "its 2 o clock", "it's 2:00", "two o'clock"],
  "Es la una.": ["it is 1 o clock", "its 1 o clock", "one o'clock"],
  "el mediodía": ["12 noon", "lunchtime"],
  "durante la semana": ["on weekdays", "during the weekdays"],
  "los fines de semana": ["on weekends", "on the weekend", "at the weekend"],
  "mientras que": ["while", "whereas"],
  "el uniforme": ["uniform", "the uniform"],
  "el despertador": ["the alarm clock", "alarm"],
};

/** All the English answers we accept for a vocab item. */
function englishAccepts(item: VItem): string[] {
  const out: string[] = [];
  const full = item.en.replace(/\s*\([^)]*\)/g, "").trim();
  out.push(item.en, full);
  const alts: string[] = [];
  for (const part of full.split(/[;,]/)) for (const alt of part.split(" / ")) if (alt.trim()) alts.push(alt.trim());
  // "to comb / do your hair": give the second option the first option's "to".
  const first = alts[0] ?? "";
  for (const a of alts) {
    out.push(a);
    if (first.startsWith("to ") && !a.startsWith("to ")) out.push(`to ${a}`);
    if (first.startsWith("in the ") && !a.startsWith("in ")) out.push(`in the ${a}`);
    if (first.startsWith("by ") && !a.startsWith("by ")) out.push(`by ${a}`);
  }
  out.push(...(EN_EXTRA[item.es] ?? []));
  const more: string[] = [];
  for (const a of out) {
    if (a.startsWith("to ")) more.push(a.slice(3));
    if (/^(the|a|an) /.test(a)) more.push(a.replace(/^(the|a|an) /, ""));
    if (/\byour\b/.test(a)) more.push(a.replace(/\byour\b/g, "my"), a.replace(/\byour\b/g, "one's"));
    if (/\bit's\b/i.test(a)) more.push(a.replace(/\bit's\b/i, "it is"));
    if (/o'clock/.test(a)) more.push(a.replace(/o'clock/, "o clock"));
  }
  return uniq([...out, ...more]);
}

/** Spanish alternatives also accepted for en→es. */
const ES_EXTRA: Record<string, string[]> = {
  "lavarse los dientes": ["cepillarse los dientes"],
  "a pie": ["andando", "caminando"],
  "coger el autobús": ["tomar el autobús", "coger el bus"],
  "ver la tele": ["ver la televisión"],
  "chatear con mis amigos": ["chatear con los amigos"],
  "en bici": ["en bicicleta"],
  "el mediodía": ["mediodía"],
  "después": ["luego"],
  "finalmente": ["por último", "al final"],
  "por último": ["finalmente"],
  "Son las dos.": ["Son las dos en punto."],
  "Es la una.": ["Es la una en punto."],
  "el colegio": ["el cole"],
};

const ARTICLE = /^(el|la|los|las) /;

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

function pickPerson(rng: Rng, tier: 1 | 2 | 3, easy: Person[] = ["yo", "él"]): Person {
  return tier === 1 ? rng.pick(easy) : rng.pick(PERSONS);
}

/** English meaning without bracketed notes: "to play (a sport / game)" → "to play". */
function enShort(inf: string): string {
  return (verbInfo(inf)?.en ?? "").replace(/\s*\([^)]*\)/g, "");
}

function personTag(p: Person): string {
  return `*${PERSON_LABEL[p]}*`;
}

export const drills: Drill[] = [
  // ------------------------------------------------------------------ L1
  {
    id: `${TOPIC}.vocab-es-en`,
    topicId: TOPIC,
    title: "Routine vocabulary: Spanish → English",
    level: 1,
    guideRef: "morning-routine",
    generate(rng, tier) {
      const pool =
        tier === 1
          ? ALL_VOCAB.filter((v) => /Reflexive|Other daily|Getting/.test(v.group))
          : tier === 2
            ? ALL_VOCAB.filter((v) => !/Telling/.test(v.group))
            : ALL_VOCAB;
      const item = rng.pick(pool);
      const accept = englishAccepts(item);
      const prompt = rng.pick([
        `What does *${item.es}* mean in English?`,
        `Translate into English: *${item.es}*`,
        `Give the English for *${item.es}*.`,
      ]);
      const falseFriends: Record<string, [string[], string]> = {
        "el colegio": [["college", "the college"], "False friend: *el colegio* is school (for any age) — not a college or university."],
        "el instituto": [["institute", "the institute"], "*El instituto* is the usual word for a secondary school in Spain — not an 'institute'."],
        "tarde": [["afternoon", "the afternoon", "evening"], "*La tarde* is the afternoon, but *tarde* on its own (an adverb) means **late**."],
        "la comida": [["dinner", "the dinner"], "*La comida* is lunch — the main meal of the day in Spain (and also 'food'). Dinner is *la cena*."],
        "la cena": [["lunch"], "*La cena* is dinner, the evening meal. Lunch is *la comida*."],
        "más tarde": [["more late", "afternoon"], "*Más tarde* = later."],
      };
      const ff = falseFriends[item.es];
      return {
        prompt,
        answer: textSpec(accept),
        solution: [`*${item.es}* = **${item.en}**.`, `(Topic group: ${item.group}.)`],
        hint: /se$|se /.test(item.es.split(" ")[0] ?? "") ? "The *-se* on the end shows it's a reflexive verb — something you do to yourself." : "Look for a cognate or a word you already know inside the phrase.",
        traps: ff ? trap(ff[0], accept, ff[1]) : [],
      };
    },
  },
  {
    id: `${TOPIC}.vocab-en-es`,
    topicId: TOPIC,
    title: "Routine vocabulary: English → Spanish",
    level: 1,
    guideRef: "evening-routine",
    generate(rng, tier) {
      const pool =
        tier === 1
          ? ALL_VOCAB.filter((v) => /Reflexive|Other daily/.test(v.group))
          : tier === 2
            ? ALL_VOCAB.filter((v) => !/Telling/.test(v.group))
            : ALL_VOCAB;
      const item = rng.pick(pool);
      // Several Spanish items can share one English prompt: accept them all.
      const same = ALL_VOCAB.filter((v) => v.en === item.en).map((v) => v.es);
      const accept = uniq([...same, ...same.flatMap((s) => ES_EXTRA[s] ?? [])]);
      const needsArticle = ARTICLE.test(item.es);
      const firstWord = item.es.split(" ")[0] ?? "";
      const reflexive = /(ar|er|ir)se$/.test(firstWord);
      const traps: Trap[] = [];
      if (needsArticle) traps.push(...trap([item.es.replace(ARTICLE, "")], accept, `Nearly — include the article: *${item.es}*. Learn every noun with its *el / la*.`));
      if (reflexive) traps.push(...trap([item.es.replace(firstWord, firstWord.slice(0, -2))], accept, `This one is reflexive — you do it to yourself — so the infinitive ends in *-se*: *${item.es}*.`));
      return {
        prompt: `Write in Spanish: "${item.en}".${needsArticle ? " Include *el/la/los/las*." : reflexive ? " Give the infinitive." : ""}`,
        answer: textSpec(accept),
        solution: [`"${item.en}" = **${item.es}**.`, needsArticle ? "Nouns are learnt with their article — the article tells you the gender." : reflexive ? "Reflexive infinitives end in *-se*; conjugated, the *se* becomes *me / te / se / nos / os / se*." : `(Topic group: ${item.group}.)`],
        hint: needsArticle ? "Remember the article: is it masculine (el) or feminine (la)?" : reflexive ? "Is it something you do to yourself? Then it ends in -se." : "Think of the topic group this phrase belongs to.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.reflexive-present`,
    topicId: TOPIC,
    title: "Reflexive verbs: present tense (me levanto, se ducha…)",
    level: 1,
    guideRef: "reflexive-verbs",
    generate(rng, tier) {
      const regular = ["levantarse", "ducharse", "lavarse", "peinarse", "bañarse", "maquillarse"];
      const verbs = tier === 1 ? regular : [...regular, "despertarse", "acostarse", "vestirse"];
      const inf = rng.pick(verbs);
      const p = rng.pick(PERSONS);
      const form = conjugate(inf, "present", p);
      const verbOnly = bare(form);
      const ending = ENDINGS[groupOf(inf)][IDX[p]];
      const stem = verbOnly.slice(0, verbOnly.length - ending.length);
      const change = stemChange(inf);
      let prompt: string;
      let accept: string[];
      if (tier === 3) {
        const comps: Record<string, string[]> = {
          levantarse: ["a las siete", "temprano", "tarde los sábados"],
          ducharse: ["por la mañana", "después de desayunar", "por la noche"],
          lavarse: ["los dientes después de desayunar", "la cara por la mañana", "las manos antes de comer"],
          peinarse: ["delante del espejo", "antes de salir de casa"],
          bañarse: ["en el mar en verano", "los domingos"],
          maquillarse: ["en el cuarto de baño", "antes de salir"],
          despertarse: ["a las seis y media", "muy temprano"],
          acostarse: ["a las diez y media", "tarde los fines de semana"],
          vestirse: ["en el dormitorio", "muy rápido"],
        };
        const subj = rng.pick(SUBJECTS[p]);
        prompt = `Fill the gap with the present tense of *${inf}*: *${subj} ___ ${rng.pick(comps[inf])}.*`;
        accept = [form];
      } else {
        prompt = rng.pick([
          `Write the ${personTag(p)} form of *${inf}* (${enShort(inf)}) in the present tense.`,
          `Conjugate *${inf}* (${enShort(inf)}) for ${personTag(p)} — present tense, pronoun included.`,
          `Say "${englishGloss(inf, "present", p)}" in Spanish, using *${inf}*.`,
        ]);
        accept = acceptedForms(inf, "present", p);
      }
      const traps = [
        ...trap([verbOnly, ...SUBJECT_PRONOUNS[p].map((s) => `${s} ${verbOnly}`)], accept, `Right verb ending — but a reflexive verb needs its pronoun in front: *${form}*.`),
        ...(p === "él" || p === "ellos" ? [] : trap([`se ${verbOnly}`], accept, `*Se* is only for él/ella and ellos/ellas. For ${p} the pronoun is *${PRON[p]}*: *${form}*.`)),
      ];
      return {
        prompt,
        answer: textSpec(accept),
        solution: [
          `Pronoun for ${p}: *${PRON[p]}* (it goes in front of the verb).`,
          `*${inf}* → drop *-se* → *${baseInf(inf)}* → stem *${stem}-*${change && BOOT(p) ? ` (${change} stem change: ${p} is inside the boot)` : change ? ` (no stem change: ${p} is outside the boot)` : ""}.`,
          `${p} ending for an -${groupOf(inf)} verb: *-${ending}* → **${form}**.`,
        ],
        hint: `Two jobs: the right pronoun (me/te/se/nos/os/se) AND the right ending for ${p}.`,
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.clock-to-spanish`,
    topicId: TOPIC,
    title: "Telling the time: clock → Spanish (Es la una / Son las…)",
    level: 1,
    guideRef: "telling-the-time",
    generate(rng, tier) {
      if (tier === 3) {
        const H = rng.pick([7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
        const m = rng.pick(MINUTES_5);
        const h = h12(H);
        const phrases = clockPhrases(h, m);
        const pods = partsOfDay(H);
        const accept: string[] = [];
        for (const pod of pods) for (const ph of phrases) accept.push(`${esSon(ph)} ${pod}`, `${ph} ${pod}`);
        accept[0] = `${cap(esSon(phrases[0]))} ${pods[0]}`;
        return {
          prompt: `A timetable at a station in Madrid says **${pad2(H)}:${pad2(m)}**. Say this time in everyday Spanish (12-hour style) as an answer to *¿Qué hora es?*, adding *de la mañana*, *de la tarde* or *de la noche*.`,
          answer: textSpec(accept),
          solution: [
            `${pad2(H)}:${pad2(m)} is ${h}:${pad2(m)} ${H < 12 ? "in the morning" : H < 20 ? "in the afternoon / early evening" : "in the evening / at night"} → *${pods[0]}*${pods.length > 1 ? ` (or *${pods[1]}*)` : ""}.`,
            ...timeSolution(h, m),
            `**${cap(esSon(phrases[0]))} ${pods[0]}.**`,
          ],
          hint: "First turn the 24-hour time into a 12-hour time, then say it with y / menos, then add the part of the day.",
          traps: [
            ...trap([esSon(phrases[0]), phrases[0]], accept, `Good time — now add the part of the day: *${pods[0]}*.`),
            ...(m > 30 ? trap([`${esSon(hourNoun(h))} menos ${MIN_WORDS[60 - m][0]} ${pods[0]}`], accept, `Careful: *menos* counts back, so that means ${prevHour(h)}:${pad2(m)}. After half past, name the **next** hour.`) : []),
          ],
        };
      }
      const h = rng.int(1, 12);
      const m = rng.pick(tier === 1 ? MINUTES_15 : MINUTES_5);
      const phrases = clockPhrases(h, m);
      const accept = [cap(esSon(phrases[0])), ...phrases.map(esSon), ...phrases];
      if (h === 12 && m === 0) accept.push("es mediodía", "es medianoche", "es el mediodía");
      const named = m > 30 ? nextHour(h) : h;
      const canon = phrases[0];
      const traps: Trap[] = [];
      if (named === 1) traps.push(...trap([`son ${canon}`, `son las una${canon.slice(6)}`, `es las una${canon.slice(6)}`], accept, "*Una* is singular, so it's *Es la una…* — never *son las una*."));
      else traps.push(...trap([`es ${canon}`], accept, `Every hour except one is plural: *Son ${canon}*.`));
      if (m > 30) traps.push(...trap([esSon(`${hourNoun(h)} menos ${MIN_WORDS[60 - m][0]}`), `${hourNoun(h)} menos ${MIN_WORDS[60 - m][0]}`], accept, `Careful: *menos* counts back, so that would mean ${prevHour(h)}:${pad2(m)}. After half past, name the **next** hour (${nextHour(h)}).`));
      return {
        prompt: rng.pick([
          `Look at the clock (**${h}:${pad2(m)}**). Answer *¿Qué hora es?* in Spanish.`,
          `*¿Qué hora es?* The clock shows **${h}:${pad2(m)}**. Write the time in Spanish.`,
          `Write the time on the clock in Spanish, starting with *Es* or *Son* (**${h}:${pad2(m)}**).`,
        ]),
        answer: textSpec(accept),
        solution: [...timeSolution(h, m), `**${cap(esSon(canon))}.**`],
        hint: m > 30 ? "The minute hand is on the left half of the clock — count back from the next hour with menos." : "Is the hour one (singular) or more (plural)?",
        traps,
        diagram: clockSvg(h, m),
      };
    },
  },
  {
    id: `${TOPIC}.spanish-to-clock`,
    topicId: TOPIC,
    title: "Telling the time: Spanish → digits",
    level: 1,
    guideRef: "telling-the-time",
    generate(rng, tier) {
      if (tier === 3) {
        const H = rng.pick([7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
        const m = rng.pick(MINUTES_5);
        const h = h12(H);
        const phrase = clockPhrases(h, m)[0];
        const pod = partsOfDay(H)[0];
        const accept = digitForms(H, m);
        return {
          prompt: `Write this time in the 24-hour clock (like a timetable, e.g. 19:30): *${cap(esSon(phrase))} ${pod}.*`,
          answer: textSpec(accept),
          solution: [
            m > 30 ? `*${phrase}* = ${60 - m} minutes before ${nextHour(h)} → ${h}:${pad2(m)}.` : `*${phrase}* = ${h}:${pad2(m)}.`,
            H >= 12 ? `*${pod}* = p.m., so add 12 to the hour: ${h} + 12 = ${H}.` : `*${pod}* = a.m., so the hour stays ${H}.`,
            `**${pad2(H)}:${pad2(m)}**`,
          ],
          hint: "Work out the 12-hour time first, then decide: a.m. or p.m.?",
          traps: [
            ...(H >= 13 ? trap(digitForms(h, m), accept, `That's the 12-hour time. *${pod}* means p.m., so add 12: ${H}:${pad2(m)}.`) : []),
            ...(m > 30 ? trap(digitForms(H + 1, 60 - m), accept, `*Menos* means 'minus': ${60 - m} minutes **before** ${nextHour(h)}, not after.`) : []),
          ],
        };
      }
      const h = rng.int(1, 12);
      const m = rng.pick(tier === 1 ? MINUTES_15 : MINUTES_5);
      const phrase = clockPhrases(h, m)[0];
      const H2 = (h + 12) % 24;
      const accept = [...digitForms(h, m), ...digitForms(H2, m)];
      const named = m > 30 ? nextHour(h) : h;
      return {
        prompt: rng.pick([
          `Write this time in digits (e.g. 7:30): *${cap(esSon(phrase))}.*`,
          `Your Spanish exchange partner says: *${cap(esSon(phrase))}.* What time is it? Write it in digits (e.g. 7:30).`,
          `*¿Qué hora es?* — *${cap(esSon(phrase))}.* Write the time in digits (e.g. 7:30).`,
        ]),
        answer: textSpec(accept),
        solution: [
          `The hour named is *${HOUR_WORD[named]}* (${named}).`,
          m === 0 ? "No minutes are added → on the hour." : m <= 30 ? `*y ${MIN_WORDS[m][0]}* = ${m} minutes **past** ${named}.` : `*menos ${MIN_WORDS[60 - m][0]}* = ${60 - m} minutes **before** ${named}, so the clock still shows ${h}.`,
          `**${h}:${pad2(m)}**`,
        ],
        hint: phrase.includes("menos") ? "Menos = minus: take the minutes away from the hour named." : "Y = and: add the minutes to the hour named.",
        traps: m > 30 ? trap([...digitForms(named, 60 - m), ...digitForms(named, m)], accept, `*Menos* counts back: ${60 - m} minutes **before** ${named} is ${h}:${pad2(m)}.`) : m === 30 ? trap(digitForms(h, 50), accept, "*Y media* is half past — 30 minutes.") : [],
      };
    },
  },
  // ------------------------------------------------------------------ L2
  {
    id: `${TOPIC}.a-que-hora`,
    topicId: TOPIC,
    title: "Answering ¿A qué hora…? with a la / a las",
    level: 2,
    guideRef: "telling-the-time",
    generate(rng, tier) {
      const acts: { c: Chunk; from: number; to: number }[] = [
        { c: CH.levantarse, from: 360, to: 510 },
        { c: CH.despertarse, from: 360, to: 480 },
        { c: CH.ducharse, from: 375, to: 480 },
        { c: CH.desayunar, from: 390, to: 510 },
        { c: CH.salir, from: 420, to: 495 },
        { c: CH.llegar, from: 450, to: 525 },
        { c: { inf: "comer", comp: "", en: "have lunch", en3: "has lunch", ing: "having lunch" }, from: 780, to: 870 },
        { c: CH.volver, from: 900, to: 1050 },
        { c: CH.merendar, from: 990, to: 1080 },
        { c: CH.cenar, from: 1170, to: 1290 },
        { c: CH.acostarse, from: 1260, to: 1380 },
      ];
      const act = rng.pick(acts);
      const step = tier === 1 ? 15 : 5;
      const options: number[] = [];
      for (let t = Math.ceil(act.from / step) * step; t <= act.to; t += step) options.push(t);
      const t = rng.pick(options);
      const H = Math.floor(t / 60);
      const m = t % 60;
      const phrases = clockPhrases(h12(H), m).filter((x) => !x.endsWith("en punto"));
      // Who is asked about → who answers.
      type Ask = { q: Person; a: Person; tail: string; subj: string[]; canonSubj: string };
      const asks: Ask[] = [{ q: "tú", a: "yo", tail: "", subj: ["", "yo"], canonSubj: "" }];
      if (tier === 3) {
        const sib = rng.pick([
          ["tu hermano", "mi hermano", "él"],
          ["tu hermana", "mi hermana", "ella"],
        ]);
        asks.push(
          { q: "vosotros", a: "nosotros", tail: "", subj: ["", "nosotros", "nosotras"], canonSubj: "" },
          { q: "él", a: "él", tail: ` ${sib[0]}`, subj: ["", sib[1], sib[2]], canonSubj: sib[1] },
          { q: "ellos", a: "ellos", tail: " tus padres", subj: ["", "mis padres", "ellos"], canonSubj: "mis padres" },
        );
      }
      const ask = rng.pick(asks);
      const qVerb = chunkForms(act.c, ask.q)[0];
      const verbs = chunkForms(act.c, ask.a);
      const pods = ["", ...partsOfDay(H)];
      const accept: string[] = [];
      const canon = cap(`${ask.canonSubj} ${verbs[0]} a ${phrases[0]}`.trim());
      accept.push(canon);
      for (const v of verbs)
        for (const ph of phrases)
          for (const pod of pods)
            for (const s of ask.subj) {
              accept.push(`${s} ${v} a ${ph} ${pod}`, `a ${ph} ${pod} ${s} ${v}`);
            }
      const traps: Trap[] = [
        ...trap([esSon(phrases[0]), `${verbs[0]} ${esSon(phrases[0])}`], accept, `*Son las… / Es la…* answers *¿Qué hora es?* For *¿A qué hora…?* (at what time?) use *a las / a la*: ${canon}.`),
      ];
      if (phrases[0].startsWith("la una")) traps.push(...trap([`${verbs[0]} a las una${phrases[0].slice(6)}`], accept, "*Una* is singular: *a la una*, never *a las una*."));
      if (ask.q !== ask.a) traps.push(...trap([`${qVerb} a ${phrases[0]}`], accept, `The question asks about *${ask.q}*; answer about ${ask.a === "yo" ? "yourself" : "us"}: *${verbs[0]}*.`));
      const ansLabel = ask.a === "yo" ? "yourself (*yo*)" : ask.a === "nosotros" ? "us (*nosotros*)" : `them (${PERSON_LABEL[ask.a]})`;
      return {
        prompt: `Answer in a full Spanish sentence, using the time given: *¿A qué hora ${qVerb}${ask.tail}?* (**${ampm(H, m)}**)`,
        answer: textSpec(accept),
        solution: [
          `*${qVerb}* is the ${ask.q} form → answer about ${ansLabel}: *${verbs[0]}*.`,
          "*¿A qué hora…?* asks 'at what time?', so use *a la / a las* — not *es / son*.",
          `${h12(H)}:${pad2(m)} → *${phrases[0]}* (you can add *${partsOfDay(H)[0]}*).`,
          `**${canon}.**`,
        ],
        hint: "Echo the verb from the question (changing the person), then 'a las' + the time.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.sequencers`,
    topicId: TOPIC,
    title: "Sequencing your morning: primero, luego, finalmente",
    level: 2,
    guideRef: "morning-routine",
    generate(rng, tier) {
      const morning = [CH.despertarse, CH.levantarse, CH.ducharse, CH.vestirse, CH.peinarse, CH.desayunar, CH.dientes, CH.salir, CH.bus, CH.llegar];
      const evening = [CH.volver, CH.merendar, CH.deberes, CH.cenar, CH.tele, CH.leer, CH.acostarse];
      const list = tier === 1 ? morning : rng.bool() ? morning : evening;
      const n = tier === 1 ? 2 : 3;
      const idx = rng
        .shuffle(list.map((_, i) => i))
        .slice(0, n)
        .sort((a, b) => a - b);
      const chunks = idx.map((i) => list[i]);
      const seqMid = rng.pick([
        { en: "then", es: ["luego", "después", "entonces"] },
        { en: "after that", es: ["después", "luego", "después de eso"] },
        { en: "later", es: ["más tarde", "luego"] },
      ]);
      const seqEnd = { en: "finally", es: ["finalmente", "por último", "al final"] };
      // Tier 3: put a clock time on the first action.
      let time: string[] = [""];
      let timeEn = "";
      if (tier === 3) {
        const H = list === morning ? rng.pick([6, 7, 8]) : rng.pick([16, 17, 18]);
        const m = rng.pick([0, 15, 30]);
        time = clockPhrases(h12(H), m)
          .filter((x) => !x.endsWith("en punto"))
          .map((x) => `a ${x}`);
        timeEn = ` at ${h12(H)}:${pad2(m)}`;
      }
      const forms = chunks.map((c) => chunkForms(c, "yo"));
      const slots: string[][] = [["primero"], ["", "yo"], forms[0], time, ["", "y"], seqMid.es, forms[1]];
      if (n === 3) slots.push(["", "y"], seqEnd.es, forms[2]);
      const accept = product(slots);
      const canonParts = [`Primero ${forms[0][0]}${time[0] ? " " + time[0] : ""}, ${seqMid.es[0]} ${forms[1][0]}`];
      if (n === 3) canonParts.push(` y ${seqEnd.es[0]} ${forms[2][0]}`);
      const canon = canonParts.join("");
      accept.unshift(canon);
      const en = chunks.map((c) => enPoss(c.en, "my"));
      const english = n === 2 ? `First I ${en[0]}${timeEn}, ${seqMid.en} I ${en[1]}.` : `First I ${en[0]}${timeEn}, ${seqMid.en} I ${en[1]} and ${seqEnd.en} I ${en[2]}.`;
      // Trap: reflexive pronouns dropped.
      const dropped = canon.replace(/\b(me) (?=\w)/g, "");
      const traps = /\bme /.test(canon) ? trap([dropped], accept, "Reflexive verbs keep their pronoun: *me levanto, me ducho, me visto*…") : [];
      return {
        prompt: `Translate into Spanish: "${english}"`,
        answer: textSpec(accept),
        solution: [
          `Sequencers: first = *primero*, ${seqMid.en} = *${seqMid.es[0]}*${n === 3 ? ", finally = *finalmente* (or *por último*)" : ""}.`,
          `Verbs in the *yo* form: ${forms.map((f) => `*${f[0]}*`).join(", ")}${chunks.some((c) => verbInfo(c.inf)?.reflexive) ? " — reflexives keep *me*" : ""}.`,
          `**${canon}.**`,
        ],
        hint: "Sequencer first, then the yo form of the verb. Reflexive verbs need *me*.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.evening-gap-fill`,
    topicId: TOPIC,
    title: "Afternoon & evening routine: fill the gap",
    level: 2,
    guideRef: "evening-routine",
    generate(rng, tier) {
      const frames: { c: Chunk; ends: string[] }[] = [
        { c: CH.volver, ends: ["a las cuatro", "después del colegio", "en autobús"] },
        { c: CH.merendar, ends: ["fruta y un yogur", "a las cinco", "un bocadillo de queso"] },
        { c: CH.deberes, ends: ["después de merendar", "antes de cenar", "por la tarde"] },
        { c: CH.cenar, ends: ["a las nueve", "con la familia", "pasta con verduras"] },
        { c: CH.tele, ends: ["después de cenar", "por la noche", "los fines de semana"] },
        { c: { ...CH.leer, comp: "un libro" }, ends: ["antes de dormir", "en la cama", "por la noche"] },
        { c: CH.movil, ends: ["por la noche", "después de cenar"] },
        { c: CH.chatear, ends: ["por la noche", "después de hacer los deberes"] },
        { c: CH.ducharse, ends: ["por la noche", "antes de cenar"] },
        { c: CH.acostarse, ends: ["a las diez y media", "tarde los fines de semana", "a las once"] },
      ];
      const easy = ["cenar", "leer", "chatear", "ver", "ducharse", "hacer"];
      const pool = tier === 1 ? frames.filter((f) => easy.includes(f.c.inf)) : tier === 2 ? frames : frames.filter((f) => !["cenar", "chatear", "leer"].includes(f.c.inf));
      const f = rng.pick(pool);
      const p = tier === 1 ? rng.pick<Person>(["yo", "él"]) : tier === 3 ? rng.pick<Person>(["tú", "nosotros", "vosotros", "ellos", "él"]) : rng.pick(PERSONS);
      const subj = rng.pick(SUBJECTS[p]);
      const form = present(f.c.inf, p, f.c.compose);
      const comp = chunkComps(f.c, p)[0];
      const sentence = `${subj} ___ ${comp} ${rng.pick(f.ends)}`.replace(/\s+/g, " ");
      const accept = [form];
      const info = verbInfo(f.c.inf)!;
      const change = stemChange(f.c.inf);
      const traps = [
        ...trap([f.c.inf, baseInf(f.c.inf)], accept, `Conjugate the verb — the subject is *${subj}* (${p}).`),
        ...(p !== "yo" ? trap([present(f.c.inf, "yo", f.c.compose)], accept, `That's the *yo* form. The subject *${subj}* needs the ${p} form.`) : []),
        ...(p === "ellos" ? trap([present(f.c.inf, "él", f.c.compose)], accept, `*${subj}* is plural (they), so the verb needs the *ellos* ending.`) : []),
      ];
      return {
        prompt: `Complete with the present tense of *${f.c.inf}* (${enShort(f.c.inf)}): *${sentence}.*`,
        answer: textSpec(accept),
        solution: [
          `*${subj}* = ${PERSON_LABEL[p]}.`,
          change ? `*${f.c.inf}* is a stem-changer (${change})${BOOT(p) ? ` and ${p} is inside the boot, so the stem changes` : `, but ${p} is outside the boot, so no change`}.` : info.tags.includes("yo-go") || info.tags.includes("irregular") ? `*${f.c.inf}* has an irregular yo form (${present(f.c.inf, "yo", f.c.compose)}); the other persons follow the pattern.` : `*${f.c.inf}* is regular: stem + ${p} ending.`,
          `**${form}**`,
        ],
        hint: "Who is the subject? Match the ending (and the reflexive pronoun, if there is one) to that person.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.stem-changers-irregular-yo`,
    topicId: TOPIC,
    title: "Stem-changing verbs & irregular yo forms (me despierto, vuelvo, salgo, hago)",
    level: 2,
    guideRef: "stem-changes-and-irregular-yo",
    generate(rng, tier) {
      const verbs: { inf: string; compose?: boolean; name: string; en: string; frame: string }[] = [
        { inf: "despertarse", name: "despertarse", en: "to wake up", frame: "a las siete" },
        { inf: "acostarse", name: "acostarse", en: "to go to bed", frame: "a las once" },
        { inf: "vestirse", name: "vestirse", en: "to get dressed", frame: "después de ducharme" },
        { inf: "empezar", name: "empezar", en: "to start", frame: "los deberes a las seis" },
        { inf: "volver", name: "volver", en: "to go back", frame: "a casa en autobús" },
        { inf: "dormir", name: "dormir", en: "to sleep", frame: "ocho horas" },
        { inf: "merendar", name: "merendar", en: "to have an afternoon snack", frame: "fruta a las cinco" },
        { inf: "jugar", name: "jugar", en: "to play", frame: "con el móvil por la noche" },
        { inf: "dormir", compose: true, name: "dormirse", en: "to fall asleep", frame: "enseguida" },
        { inf: "salir", name: "salir", en: "to leave, to go out", frame: "de casa a las ocho" },
        { inf: "hacer", name: "hacer", en: "to do, to make", frame: "los deberes después de merendar" },
        { inf: "poner", compose: true, name: "ponerse", en: "to put on (clothes)", frame: "el uniforme por la mañana" },
        { inf: "ir", name: "ir", en: "to go", frame: "al colegio a pie" },
      ];
      const v = rng.pick(verbs);
      const p: Person = tier === 1 ? "yo" : rng.pick(PERSONS);
      const form = present(v.inf, p, v.compose);
      const reflexive = v.compose || !!verbInfo(v.inf)?.reflexive;
      const pr = reflexive ? `${PRON[p]} ` : "";
      const verbOnly = bare(form);
      const group = groupOf(v.inf);
      const ending = ENDINGS[group][IDX[p]];
      const regStem = baseInf(v.inf).slice(0, -2);
      const changedStem = bare(present(v.inf, "yo", v.compose)).slice(0, -1);
      const change = stemChange(v.inf);
      const tags = verbInfo(v.inf)?.tags ?? [];
      const yoGo = tags.includes("yo-go");
      // vestirse → "después de ducharme" must agree with the person.
      const frame = v.frame.replace("ducharme", reflexiveInf("ducharse", p));
      let prompt: string;
      let accept: string[];
      if (tier === 3) {
        const subj = rng.pick(SUBJECTS[p]);
        prompt = `Fill the gap with the present tense of *${v.name}* (${v.en}): *${subj} ___ ${frame}.*`;
        accept = [form];
      } else {
        prompt = rng.pick([
          `Write the ${personTag(p)} form of *${v.name}* (${v.en}) in the present tense.`,
          `Present tense: how do you say *${v.name}* (${v.en}) for ${personTag(p)}?`,
        ]);
        accept = [form, ...SUBJECT_PRONOUNS[p].map((s) => `${s} ${form}`)];
      }
      const traps: Trap[] = [];
      if (change && BOOT(p) && !(yoGo && p === "yo")) {
        traps.push(...trap([`${pr}${regStem}${ending}`], accept, `*${v.name}* is a boot verb (${change}): inside the boot (yo, tú, él, ellos) the stem changes → *${form}*.`));
      }
      if (change && !BOOT(p)) {
        traps.push(...trap([`${pr}${changedStem}${ending}`], accept, `Nosotros and vosotros are outside the boot — the stem does NOT change: *${form}*.`));
      }
      if (yoGo && p === "yo") {
        traps.push(...trap([`${pr}${regStem}o`], accept, `*${v.inf}* has an irregular *yo* form ending in *-go*: *${form}*.`));
      }
      if (v.inf === "ir" && p === "yo") traps.push(...trap(["io", "yo io"], accept, "*Ir* is completely irregular: *voy, vas, va, vamos, vais, van*."));
      const steps: string[] = [];
      if (v.inf === "ir") steps.push("*Ir* is fully irregular: *voy, vas, va, vamos, vais, van*.");
      else if (yoGo && p === "yo") steps.push(`*${v.inf}* belongs to the 'yo-go' group: the *yo* form is irregular → *${verbOnly}*.`);
      else {
        steps.push(`*${v.name}* → stem *${regStem}-*${change ? ` (${change} boot verb)` : ""}.`);
        if (change) steps.push(BOOT(p) ? `${p} is inside the boot → stem changes to *${changedStem}-*.` : `${p} is outside the boot → stem stays *${regStem}-*.`);
        steps.push(`${p} ending for -${group}: *-${ending}*${reflexive ? `, pronoun *${PRON[p]}*` : ""}.`);
      }
      steps.push(`**${form}**`);
      return {
        prompt,
        answer: textSpec(accept),
        solution: steps,
        hint: change ? "Is this person inside the boot (yo, tú, él, ellos) or outside (nosotros, vosotros)?" : "Check: is the yo form one of the irregular ones (salgo, hago, pongo, voy)?",
        traps,
      };
    },
  },
  // ------------------------------------------------------------------ L3
  {
    id: `${TOPIC}.antes-despues`,
    topicId: TOPIC,
    title: "Antes de / después de + infinitive",
    level: 3,
    guideRef: "evening-routine",
    generate(rng, tier) {
      const mains = [CH.deberes, CH.tele, CH.leer, CH.movil, CH.cenar, CH.merendar, CH.ducharse, CH.dientes, CH.chatear];
      const befores = tier === 1 ? [CH.cenar, CH.merendar, CH.deberes, CH.volver, CH.tele] : [CH.cenar, CH.merendar, CH.deberes, CH.volver, CH.tele, CH.acostarse, CH.ducharse, CH.dientes];
      const b = rng.pick(befores);
      const a = rng.pick(mains.filter((x) => x !== b));
      const prep = rng.pick([
        { en: "before", es: "antes de" },
        { en: "after", es: "después de" },
      ]);
      let p: Person = "yo";
      let subj: string[] = ["", "yo"];
      let canonSubj = "";
      let enSubj = "I";
      let who: "my" | "his" | "her" = "my";
      if (tier === 3) {
        const s = rng.pick([
          { es: "mi hermano", en: "My brother", g: "his" as const },
          { es: "mi hermana", en: "My sister", g: "her" as const },
          { es: "Carmen", en: "Carmen", g: "her" as const },
          { es: "Javier", en: "Javier", g: "his" as const },
        ]);
        p = "él";
        subj = [s.es];
        canonSubj = s.es;
        enSubj = s.en;
        who = s.g;
      }
      const aForms = chunkForms(a, p);
      const bInfs = chunkInfs(b, p);
      const accept: string[] = [];
      const canonMain = `${canonSubj} ${aForms[0]}`.trim();
      const canon = cap(`${canonMain} ${prep.es} ${bInfs[0]}`);
      accept.push(canon);
      for (const s of subj) {
        accept.push(...product([[s], aForms, [prep.es], bInfs]));
        accept.push(...product([[prep.es], bInfs, [s], aForms]));
      }
      const aEn = p === "yo" ? enPoss(a.en, "my") : enPoss(a.en3, who);
      const bEn = enPoss(b.ing, who);
      const english = rng.bool() ? `${enSubj} ${aEn} ${prep.en} ${bEn}.` : `${cap(prep.en)} ${bEn}, ${p === "yo" ? "I" : enSubj.replace(/^My/, "my")} ${aEn}.`;
      const conjB = chunkForms(b, p)[0];
      const traps = [...trap([`${canonMain} ${prep.es} ${conjB}`, `${prep.es} ${conjB} ${canonMain}`], accept, `After *${prep.es}* use the **infinitive**, not a conjugated verb: *${prep.es} ${bInfs[0]}*.`)];
      if (verbInfo(b.inf)?.reflexive) {
        const wrongInf = p === "yo" ? `${baseInf(b.inf)}se` : `${baseInf(b.inf)}me`;
        const wrongB = `${wrongInf} ${b.comp}`.trim();
        traps.push(...trap([`${canonMain} ${prep.es} ${wrongB}`, `${prep.es} ${wrongB} ${canonMain}`], accept, `The pronoun on the end of the infinitive matches the person: ${p === "yo" ? "I → *-me*" : "he / she → *-se*"} → *${bInfs[0]}*.`));
      }
      return {
        prompt: `Translate into Spanish: "${english}"`,
        answer: textSpec(accept),
        solution: [
          `${prep.en} + -ing = *${prep.es}* + **infinitive**: *${prep.es} ${bInfs[0]}*${verbInfo(b.inf)?.reflexive ? ` (the reflexive pronoun is stuck onto the infinitive and matches the person: *${PRON[p]}*)` : ""}.`,
          `Main verb in the ${p} form: *${aForms[0]}*.`,
          `**${canon}.** (You can also put the *${prep.es}* phrase first.)`,
        ],
        hint: `English uses an -ing word after '${prep.en}', but Spanish uses the infinitive after *${prep.es}*.`,
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.third-person-routine`,
    topicId: TOPIC,
    title: "Someone else's routine: yo → él / ellos",
    level: 3,
    guideRef: "someone-elses-routine",
    generate(rng, tier) {
      // Keep both actions in the same part of the day so the sentence makes sense.
      const pool = rng.bool(0.6)
        ? [CH.despertarse, CH.levantarse, CH.ducharse, CH.vestirse, CH.dientes, CH.desayunar, CH.salir, CH.irBus, CH.llegar]
        : [CH.volver, CH.deberes, CH.cenar, CH.tele, CH.acostarse];
      const n = tier === 1 ? 1 : 2;
      // Two actions close together in the day (next or next-but-one in the routine).
      const first = rng.int(0, pool.length - 2);
      const idx = n === 1 ? [first] : [first, Math.min(first + rng.int(1, 2), pool.length - 1)];
      const chunks = idx.map((i) => pool[i]);
      const plural = tier === 3 || (tier === 2 && rng.bool(0.3));
      const target: Person = plural ? "ellos" : "él";
      const subj = plural ? rng.pick(["Mis hermanos", "Mis primas", "Pablo y Carmen", "Mis hermanas"]) : rng.pick(["Mi hermano", "Mi hermana", "Mi madre", "Diego", "Wei Ling"]);
      // A clock time on the first action (o'clock / quarter / half).
      const hoursFor = new Map<Chunk, number[]>([
        [CH.volver, [15, 16, 17]],
        [CH.deberes, [16, 17, 18]],
        [CH.cenar, [20, 21]],
        [CH.tele, [19, 20, 21]],
        [CH.acostarse, [21, 22]],
      ]);
      const H = rng.pick(hoursFor.get(chunks[0]) ?? [6, 7, 8]);
      const m = rng.pick([0, 15, 30, 45]);
      const timePh = clockPhrases(h12(H), m).filter((x) => !x.endsWith("en punto"));
      const timeOpts = timePh.map((x) => `a ${x}`);
      const yoSentence = cap(`${chunkForms(chunks[0], "yo")[0]} ${timeOpts[0]}${n === 2 ? ` y ${chunkForms(chunks[1], "yo")[0]}` : ""}`);
      const tForms = chunks.map((c) => chunkForms(c, target));
      const slots: string[][] = [[subj], tForms[0], timeOpts];
      if (n === 2) slots.push(["y"], tForms[1]);
      const accept = product(slots);
      const canon = `${subj} ${tForms[0][0]} ${timeOpts[0]}${n === 2 ? ` y ${tForms[1][0]}` : ""}`;
      accept.unshift(canon);
      const yoForms = chunks.map((c) => chunkForms(c, "yo")[0]);
      const traps = [
        ...trap([`${subj} ${yoSentence.charAt(0).toLowerCase()}${yoSentence.slice(1)}`], accept, `You need to change the verbs too: *${subj}* is ${plural ? "they (ellos)" : "he / she (él / ella)"}, so the endings${chunks.some((c) => verbInfo(c.inf)?.reflexive) ? " and the pronoun *me → se*" : ""} change.`),
      ];
      if (chunks.some((c) => verbInfo(c.inf)?.reflexive)) {
        const keptMe = `${subj} ${tForms[0][0].replace(/^se /, "me ")} ${timeOpts[0]}${n === 2 ? ` y ${tForms[1][0].replace(/^se /, "me ")}` : ""}`;
        traps.push(...trap([keptMe], accept, "The reflexive pronoun must match the person: for él / ella / ellos it's *se*, not *me*."));
      }
      if (plural) {
        const sing = chunks.map((c) => chunkForms(c, "él")[0]);
        traps.push(...trap([`${subj} ${sing[0]} ${timeOpts[0]}${n === 2 ? ` y ${sing[1]}` : ""}`], accept, `*${subj}* is plural (they), so use the *ellos* endings (-an / -en).`));
      }
      const changes = chunks.map((c, i) => `*${yoForms[i]}* → *${tForms[i][0]}*`).join(", ");
      return {
        prompt: `Rewrite this sentence about *${subj.toLowerCase().startsWith("mi") ? subj.toLowerCase() : subj}*, starting with *${subj}…*: *${yoSentence}.*`,
        answer: textSpec(accept),
        solution: [
          `*${subj}* = ${PERSON_LABEL[target]}, so every verb changes to the ${target} form${chunks.some((c) => verbInfo(c.inf)?.reflexive) ? " and *me* becomes *se*" : ""}.`,
          `${changes}.`,
          "The time phrase stays the same.",
          `**${canon}.**`,
        ],
        hint: `Change every verb: yo → ${target}. Reflexive *me* → *se*; irregular yo forms (salgo, hago, voy) go back to the normal pattern.`,
        traps,
      };
    },
  },
];
