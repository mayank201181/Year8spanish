// Procedural skill drills for "¿Dónde vives? — Opinions About Where People Live".
// Every verb form comes from the tested conjugator in lib/spanish/verbs.ts.
// gustar / encantar / chiflar are not in the conjugator: only their fixed
// third-person forms (gusta / gustan …) are used, from a tiny lexicon below.
import type { Drill } from "./types.ts";
import type { Trap } from "../types.ts";
import { conjugate, acceptedForms, englishGloss, PERSONS, type Person } from "../spanish/verbs.ts";
import { vocab } from "../vocab/donde-vivo.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";

const TOPIC = "donde-vivo";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

type Gender = "m" | "f";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Lower-case the first letter unless it starts a name (Carmen, Lucía…). */
const lowerFirst = (s: string) => (/^(Mi|Mis|My|Yo|Tú|Nosotros|Vosotros|Voy|Vas|Va|Vamos|Vais|Van|Me|Te|Se|Nos|Os)\b/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const uniq = (xs: string[]) => [...new Set(xs)];
const key = (s: string) => stripAccents(normSpanish(s));

/** Build 0–2 traps, dropping any that match (or differ only by accents from) an accepted answer. */
function mkTraps(accept: string[], list: { wrong: string[]; feedback: string }[]): Trap[] {
  const ok = new Set(accept.map(key));
  return list
    .map((t) => ({ wrong: uniq(t.wrong.filter((w) => w.trim() !== "")), feedback: t.feedback }))
    .filter((t) => t.wrong.length > 0 && !t.wrong.some((w) => ok.has(key(w))))
    .slice(0, 2)
    .map((t) => ({ spec: { type: "text" as const, accept: t.wrong }, feedback: t.feedback }));
}

/** Regular -o adjective → agreeing form. */
function agree(adj: string, g: Gender, pl: boolean): string {
  return adj.slice(0, -1) + (g === "m" ? "o" : "a") + (pl ? "s" : "");
}

const describeGN = (g: Gender, pl: boolean) => `${g === "m" ? "masculine" : "feminine"} ${pl ? "plural" : "singular"}`;

/** "Me gusta…" → also accept "A mí me gusta…"; "No me gusta…" → "A mí no me gusta…". */
function withAmi(s: string): string[] {
  if (/^me /i.test(s)) return [s, "A mí " + s.charAt(0).toLowerCase() + s.slice(1)];
  if (/^no me /i.test(s)) return [s, "A mí " + s.charAt(0).toLowerCase() + s.slice(1)];
  return [s];
}

// gustar-type verbs: only the fixed third-person forms.
type LikeVerb = "gustar" | "encantar" | "chiflar";
const LIKE_FORMS: Record<LikeVerb, { sg: string; pl: string; en: string }> = {
  gustar: { sg: "gusta", pl: "gustan", en: "like" },
  encantar: { sg: "encanta", pl: "encantan", en: "love" },
  chiflar: { sg: "chifla", pl: "chiflan", en: "be crazy about" },
};
const likeForm = (v: LikeVerb, pl: boolean) => (pl ? LIKE_FORMS[v].pl : LIKE_FORMS[v].sg);

// Adjectives for places (all regular -o adjectives from the topic vocab).
interface Adj {
  es: string;
  en: string;
  /** English comparative ("quieter", "more boring"). */
  er: string;
  pos: boolean;
}
const ADJS: Adj[] = [
  { es: "tranquilo", en: "quiet", er: "quieter", pos: true },
  { es: "animado", en: "lively", er: "livelier", pos: true },
  { es: "bonito", en: "pretty", er: "prettier", pos: true },
  { es: "limpio", en: "clean", er: "cleaner", pos: true },
  { es: "seguro", en: "safe", er: "safer", pos: true },
  { es: "moderno", en: "modern", er: "more modern", pos: true },
  { es: "histórico", en: "historic", er: "more historic", pos: true },
  { es: "ruidoso", en: "noisy", er: "noisier", pos: false },
  { es: "aburrido", en: "boring", er: "more boring", pos: false },
  { es: "feo", en: "ugly", er: "uglier", pos: false },
  { es: "sucio", en: "dirty", er: "dirtier", pos: false },
  { es: "peligroso", en: "dangerous", er: "more dangerous", pos: false },
];
const POS_ADJS = ADJS.filter((a) => a.pos);
/** Adjectives where only ser makes sense for a place (with estar they change meaning or sound wrong). */
const SER_ONLY = new Set(["seguro", "moderno", "histórico", "aburrido", "peligroso"]);
const NEG_ADJS = ADJS.filter((a) => !a.pos);

interface Place {
  es: string;
  en: string;
  g: Gender;
  pl: boolean;
}
const PLACES_SG: Place[] = [
  { es: "mi barrio", en: "my neighbourhood", g: "m", pl: false },
  { es: "mi ciudad", en: "my city", g: "f", pl: false },
  { es: "mi pueblo", en: "my village", g: "m", pl: false },
  { es: "mi casa", en: "my house", g: "f", pl: false },
  { es: "la playa", en: "the beach", g: "f", pl: false },
  { es: "el centro", en: "the town centre", g: "m", pl: false },
  { es: "la costa", en: "the coast", g: "f", pl: false },
  { es: "el campo", en: "the countryside", g: "m", pl: false },
  { es: "la ciudad", en: "the city", g: "f", pl: false },
  { es: "el pueblo", en: "the village", g: "m", pl: false },
];
const PLACES_PL: Place[] = [
  { es: "los parques", en: "the parks", g: "m", pl: true },
  { es: "las tiendas", en: "the shops", g: "f", pl: true },
  { es: "las playas", en: "the beaches", g: "f", pl: true },
  { es: "las calles de mi barrio", en: "the streets in my neighbourhood", g: "f", pl: true },
  { es: "los jardines", en: "the gardens", g: "m", pl: true },
  { es: "las afueras", en: "the outskirts", g: "f", pl: true },
];

/** Places that make sensible comparisons with each other. */
const CMP_SG: Place[] = [
  { es: "el centro", en: "the town centre", g: "m", pl: false },
  { es: "la costa", en: "the coast", g: "f", pl: false },
  { es: "el campo", en: "the countryside", g: "m", pl: false },
  { es: "la ciudad", en: "the city", g: "f", pl: false },
  { es: "el pueblo", en: "the village", g: "m", pl: false },
  { es: "mi barrio", en: "my neighbourhood", g: "m", pl: false },
];
const CMP_PL: Place[] = [
  { es: "los pueblos", en: "villages", g: "m", pl: true },
  { es: "las ciudades", en: "cities", g: "f", pl: true },
  { es: "las afueras", en: "the outskirts", g: "f", pl: true },
  { es: "las playas de Málaga", en: "the beaches in Málaga", g: "f", pl: true },
  { es: "los parques de Madrid", en: "the parks in Madrid", g: "m", pl: true },
];

const ser = (pl: boolean) => conjugate("ser", "present", pl ? "ellos" : "él");
const estar = (pl: boolean) => conjugate("estar", "present", pl ? "ellos" : "él");
const tener = (pl: boolean) => conjugate("tener", "present", pl ? "ellos" : "él");

// ---------------------------------------------------------------------------
// Vocab helpers
// ---------------------------------------------------------------------------

interface VItem {
  es: string;
  en: string;
}
const groupItems = (i: number): VItem[] => vocab[i]?.items.map((x) => ({ es: x.es, en: x.en })) ?? [];
const isNoun = (es: string) => /^(el|la|los|las) /.test(es);

function expandEnglish(alt: string): string[] {
  const out = [alt];
  const swaps: [RegExp, string][] = [
    [/\bI'm\b/, "I am"],
    [/\bthere's\b/i, "there is"],
    [/\bit's\b/i, "it is"],
    [/\bdon't\b/, "do not"],
    [/\bI would\b/, "I'd"],
  ];
  for (const [re, rep] of swaps) if (re.test(alt)) out.push(alt.replace(re, rep));
  return out;
}

/** All accepted English answers for a vocab item. */
function englishAccepts(item: VItem): string[] {
  const alts = item.en.split(/,\s*/);
  const out: string[] = [];
  for (const a of alts) {
    for (const v of expandEnglish(a)) {
      out.push(v);
      if (v.startsWith("to ")) out.push(v.slice(3));
      if (isNoun(item.es) && !/^(the|a|an) /.test(v)) out.push("the " + v);
    }
  }
  const extra: Record<string, string[]> = {
    "el campo": ["field", "the country", "country"],
    "el centro comercial": ["shopping mall", "the shopping mall"],
    "el transporte público": ["public transportation"],
    "tranquilo": ["calm"],
    "bonito": ["beautiful", "nice"],
    "seguro": ["sure"],
    "un poco": ["a little"],
    "algún día": ["someday"],
    "dentro de diez años": ["in ten years"],
    "cuando sea mayor": ["when I grow up"],
    "la isla": ["the island"],
    "el piso": ["the apartment", "apartment"],
    "las afueras": ["the suburbs"],
  };
  out.push(...(extra[item.es] ?? []));
  return uniq(out);
}

const ES_EN_TRAPS: Record<string, { wrong: string[]; feedback: string }> = {
  "la costa": { wrong: ["cost", "the cost"], feedback: "False friend! *La costa* is the coast. 'Cost' is a different word (*el precio*)." },
  "el campo": { wrong: ["camp", "the camp"], feedback: "*El campo* is the countryside (or a field). A camp is *un campamento*." },
  "aburrido": { wrong: ["bored"], feedback: "Describing a place with *ser*, *aburrido* means **boring**. 'Bored' is *estar aburrido* — a feeling, not a place." },
  "el pueblo": { wrong: ["people", "the people"], feedback: "*El pueblo* can mean 'a people', but in this topic it's a **village / small town**." },
  "porque": { wrong: ["why"], feedback: "'Why?' is *¿por qué?* — two words with an accent. *Porque* (one word) means **because**." },
};

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.vocab-es-en`,
    topicId: TOPIC,
    title: "Vocabulary: Spanish → English",
    level: 1,
    guideRef: "justifying-opinions",
    generate(rng, tier) {
      const usable = (x: VItem) => !x.es.includes("…") && !x.en.includes("(");
      const pool =
        tier === 1
          ? [...groupItems(0), ...groupItems(1)]
          : tier === 2
            ? [...groupItems(3), ...groupItems(1)]
            : [...groupItems(2), ...groupItems(5), ...groupItems(4)];
      const item = rng.pick(pool.filter(usable));
      const accept = englishAccepts(item);
      const frame = rng.pick([
        `What does *${item.es}* mean in English?`,
        `Translate into English: *${item.es}*`,
        `Give the English for *${item.es}*.`,
      ]);
      const trap = ES_EN_TRAPS[item.es];
      const alts = item.en.split(/,\s*/);
      return {
        prompt: frame,
        answer: { type: "text", accept },
        solution: [
          `*${item.es}* = **${alts[0]}**.`,
          alts.length > 1 ? `Also accepted: ${alts.slice(1).join(", ")}.` : isNoun(item.es) ? `You can write it with or without 'the'.` : `Say it aloud in a sentence to fix it in your memory.`,
        ],
        hint: isNoun(item.es) ? "Look for a cognate first — does it look or sound like an English word?" : "Think of a sentence about your town where you'd use this.",
        traps: trap ? mkTraps(accept, [trap]) : undefined,
      };
    },
  },

  // 2 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.vocab-en-es`,
    topicId: TOPIC,
    title: "Vocabulary: English → Spanish",
    level: 1,
    guideRef: "justifying-opinions",
    generate(rng, tier) {
      const nouns = [...groupItems(0), ...groupItems(1)].filter((x) => isNoun(x.es));
      const adjs = groupItems(3).filter((x) => /o$/.test(x.es) && !x.es.includes(" ") && !["bastante", "demasiado", "muy"].includes(x.es));
      const phraseEs = [
        "porque", "ya que", "cerca de", "lejos de", "hay mucho que hacer", "no hay nada que hacer",
        "en mi opinión", "para mí", "en el futuro", "algún día", "el año que viene", "dentro de diez años",
        "me gustaría", "me encanta", "no me gusta nada", "mejor que", "peor que",
      ];
      const all = vocab.flatMap((g) => g.items);
      const phrases = phraseEs.map((es) => all.find((x) => x.es === es)).filter((x): x is (typeof all)[number] => !!x);
      const kind = tier === 1 ? "noun" : tier === 2 ? rng.pick(["noun", "adj", "adj"] as const) : rng.pick(["noun", "phrase", "phrase"] as const);
      const enShow = (en: string) => en.split(/,\s*/).join(" / ");

      if (kind === "noun") {
        const it = rng.pick(nouns);
        const [art, ...rest] = it.es.split(" ");
        const masc = art === "el" || art === "los";
        const swap: Record<string, string> = { el: "la", la: "el", los: "las", las: "los" };
        const accept = it.es === "el piso" ? [it.es, "el apartamento"] : [it.es];
        return {
          prompt: `Give the Spanish for '${enShow(it.en)}'. Include el/la/los/las.`,
          answer: { type: "text", accept },
          solution: [`'${enShow(it.en)}' = *${rest.join(" ")}*.`, `It is ${masc ? "masculine" : "feminine"}${/^(los|las)$/.test(art) ? " plural" : ""} → **${it.es}**.`],
          hint: "Gender detective: words ending in -o are usually masculine, -a / -ción usually feminine — but learn each article with its noun.",
          traps: it.es === "el mar" ? undefined : mkTraps(accept, [
            { wrong: [`${swap[art]} ${rest.join(" ")}`], feedback: `Check the gender: *${rest.join(" ")}* is ${masc ? "masculine" : "feminine"}, so it's *${art}*.` },
          ]),
        };
      }
      if (kind === "adj") {
        const it = rng.pick(adjs);
        const fem = it.es.slice(0, -1) + "a";
        return {
          prompt: `Give the Spanish adjective for '${enShow(it.en)}' (masculine singular form, as in *mi barrio es…*).`,
          answer: { type: "text", accept: [it.es] },
          solution: [`'${enShow(it.en)}' = **${it.es}**.`, `Feminine: *${fem}* (*mi ciudad es ${fem}*); plural: *${it.es}s* / *${fem}s*.`],
          hint: "Masculine singular adjectives for places usually end in -o.",
          traps: mkTraps([it.es], [{ wrong: [fem], feedback: `That's the feminine form. The masculine form (for *mi barrio*) ends in -o: *${it.es}*.` }]),
        };
      }
      const it = rng.pick(phrases);
      const trapsByEs: Record<string, { wrong: string[]; feedback: string }[]> = {
        porque: [{ wrong: ["por qué", "por que"], feedback: "*¿Por qué?* (two words, accent) means 'why?'. 'Because' is one word, no accent: *porque*." }],
        "no hay nada que hacer": [{ wrong: ["hay nada que hacer"], feedback: "Spanish needs a double negative: *no* before *hay* and *nada* after it." }],
        "mejor que": [{ wrong: ["más bueno que", "mas bueno que"], feedback: "'Better' has its own word: *mejor*. Never *más bueno* for 'better'." }],
        "peor que": [{ wrong: ["más malo que", "mas malo que"], feedback: "'Worse' has its own word: *peor*. Never *más malo* for 'worse'." }],
        "me encanta": [{ wrong: ["me encanta mucho"], feedback: "*Me encanta* is already strong — don't add *mucho*." }],
      };
      const accept = [it.es];
      return {
        prompt: rng.pick([`How do you say '${enShow(it.en)}' in Spanish?`, `Write in Spanish: '${enShow(it.en)}'.`]),
        answer: { type: "text", accept },
        solution: [`'${enShow(it.en)}' = **${it.es}**.`, it.note ? `Note: ${it.note}.` : "Recycle this chunk in your own sentences."],
        hint: "This is a chunk from the topic — think of the sentence you'd use it in.",
        traps: trapsByEs[it.es] ? mkTraps(accept, trapsByEs[it.es]) : undefined,
      };
    },
  },

  // 3 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.gusta-or-gustan`,
    topicId: TOPIC,
    title: "Me gusta or me gustan? (and encanta / chifla)",
    level: 1,
    guideRef: "opinion-phrases",
    generate(rng, tier) {
      const things: { es: string; pl: boolean; why: string }[] = [
        { es: "vivir aquí", pl: false, why: "an activity (infinitive) counts as one thing" },
        { es: "vivir en el campo", pl: false, why: "an activity (infinitive) counts as one thing" },
        { es: "vivir en la costa", pl: false, why: "an activity (infinitive) counts as one thing" },
        { es: "ir a la playa", pl: false, why: "an activity (infinitive) counts as one thing" },
        { es: "mi barrio", pl: false, why: "it is one thing" },
        { es: "el centro", pl: false, why: "it is one thing" },
        { es: "la playa", pl: false, why: "it is one thing" },
        { es: "el transporte público", pl: false, why: "it is one thing" },
        { es: "mi ciudad", pl: false, why: "it is one thing" },
        { es: "los parques", pl: true, why: "they are several things (plural noun)" },
        { es: "las tiendas", pl: true, why: "they are several things (plural noun)" },
        { es: "las playas", pl: true, why: "they are several things (plural noun)" },
        { es: "los jardines", pl: true, why: "they are several things (plural noun)" },
        { es: "las montañas", pl: true, why: "they are several things (plural noun)" },
      ];
      if (tier === 3) {
        things.push(
          { es: "el parque y la playa", pl: true, why: "two separate things joined by *y* make a plural" },
          { es: "el mar y la montaña", pl: true, why: "two separate things joined by *y* make a plural" },
          { es: "vivir y estudiar aquí", pl: false, why: "activities (infinitives) still count as one idea" },
        );
      }
      const verbs: LikeVerb[] = tier === 1 ? ["gustar", "encantar"] : ["gustar", "encantar", "chiflar"];
      const v = rng.pick(verbs);
      const t = rng.pick(things);
      const neg = tier >= 2 && v === "gustar" && rng.bool(0.4);
      const nada = neg && tier === 3 && rng.bool(0.5);
      const form = likeForm(v, t.pl);
      const other = likeForm(v, !t.pl);
      const sentence = `${neg ? "No me" : "Me"} ___${nada ? " nada" : ""} ${t.es}.`;
      const accept = [form, `me ${form}`, ...(neg ? [`no me ${form}`] : [])];
      return {
        prompt: `Fill the gap with the right form of *${v}*:\n\n    ${sentence}`,
        answer: { type: "text", accept },
        solution: [
          `What is liked? *${t.es}* — ${t.why}.`,
          t.pl ? `Plural → add -n: **${form}**.` : `Singular → no -n: **${form}**.`,
          `*${neg ? "No me" : "Me"} ${form}${nada ? " nada" : ""} ${t.es}.*`,
        ],
        hint: "The verb agrees with the thing that is liked, not with you. One thing or several?",
        traps: mkTraps(accept, [
          {
            wrong: [other, `me ${other}`],
            feedback: t.pl
              ? `*${t.es}* is plural, so the verb needs -n: *${form}*.`
              : `*${t.es}* is singular (${t.why}), so no -n: *${form}*.`,
          },
        ]),
      };
    },
  },

  // 4 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.say-an-opinion`,
    topicId: TOPIC,
    title: "Say an opinion: me gusta, me encanta, odio, prefiero…",
    level: 2,
    guideRef: "opinion-phrases",
    generate(rng, tier) {
      type Op =
        | { en: string; kind: "like"; v: LikeVerb; neg?: boolean; mucho?: boolean; nada?: boolean }
        | { en: string; kind: "yo"; inf: "odiar" | "preferir" };
      const ops: Op[] = [
        { en: "I like", kind: "like", v: "gustar" },
        { en: "I love", kind: "like", v: "encantar" },
        { en: "I don't like", kind: "like", v: "gustar", neg: true },
      ];
      if (tier >= 2) ops.push({ en: "I'm crazy about", kind: "like", v: "chiflar" }, { en: "I hate", kind: "yo", inf: "odiar" }, { en: "I prefer", kind: "yo", inf: "preferir" });
      if (tier === 3) ops.push({ en: "I really like", kind: "like", v: "gustar", mucho: true }, { en: "I don't like … at all", kind: "like", v: "gustar", neg: true, nada: true });
      const things: { es: string; en: string; pl: boolean; inf?: boolean }[] = [
        { es: "vivir aquí", en: "living here", pl: false, inf: true },
        { es: "vivir en el campo", en: "living in the countryside", pl: false, inf: true },
        { es: "vivir en la ciudad", en: "living in the city", pl: false, inf: true },
        { es: "la playa", en: "the beach", pl: false },
        { es: "mi barrio", en: "my neighbourhood", pl: false },
        { es: "la costa", en: "the coast", pl: false },
        { es: "el centro", en: "the town centre", pl: false },
      ];
      const negOnly: typeof things = [{ es: "el ruido", en: "the noise", pl: false }, { es: "la contaminación", en: "the pollution", pl: false }];
      if (tier >= 2) things.push(
        { es: "los parques", en: "the parks", pl: true },
        { es: "las tiendas", en: "the shops", pl: true },
        { es: "los jardines", en: "the gardens", pl: true },
        { es: "las playas", en: "the beaches", pl: true },
      );
      const op = rng.pick(ops);
      const isNeg = (op.kind === "like" && op.neg) || (op.kind === "yo" && op.inf === "odiar");
      const t = rng.pick(isNeg ? [...things, ...negOnly] : things);
      let en: string;
      if (op.kind === "like" && op.nada) en = `I don't like ${t.en} at all`;
      else en = `${op.en} ${t.en}`;

      let accept: string[];
      const steps: string[] = [];
      const trapList: { wrong: string[]; feedback: string }[] = [];
      if (op.kind === "like") {
        const f = likeForm(op.v, t.pl);
        const wrong = likeForm(op.v, !t.pl);
        const head = `${op.neg ? "No me" : "Me"} ${f}`;
        const wHead = `${op.neg ? "No me" : "Me"} ${wrong}`;
        let base: string[];
        let wrongS: string;
        if (op.nada) {
          base = [`${head} nada ${t.es}.`];
          wrongS = `${wHead} nada ${t.es}`;
        } else if (op.mucho) {
          base = [`${head} mucho ${t.es}.`, `${head} ${t.es} mucho.`];
          wrongS = `${wHead} mucho ${t.es}`;
        } else {
          base = [`${head} ${t.es}.`];
          wrongS = `${wHead} ${t.es}`;
        }
        accept = uniq(base.flatMap(withAmi));
        steps.push(`'${op.en.replace(" … at all", "")}' → *${op.neg ? "no me" : "me"} ${LIKE_FORMS[op.v].sg}(n)*${op.mucho ? " + *mucho*" : ""}${op.nada ? " + *nada*" : ""}.`);
        steps.push(`*${t.es}* is ${t.inf ? "an activity (one thing)" : t.pl ? "plural" : "singular"} → *${f}*.`);
        trapList.push({ wrong: withAmi(cap(wrongS)), feedback: `The verb agrees with *${t.es}* (${t.pl ? "plural → -n" : "singular → no -n"}): *${f}*.` });
      } else {
        const f = conjugate(op.inf, "present", "yo");
        accept = [`${cap(f)} ${t.es}.`, `Yo ${f} ${t.es}.`];
        steps.push(`'${op.en}' is an ordinary verb: *${op.inf}* → *yo* form **${f}**${op.inf === "preferir" ? " (e→ie)" : ""}.`);
        steps.push(`No *me*, and no -n — *${f}* stays the same whatever follows.`);
        trapList.push({ wrong: [`me ${f} ${t.es}`, `me ${f}n ${t.es}`], feedback: `*${cap(f)}* is a normal *yo* form — it doesn't take *me* like *gustar* does.` });
      }
      steps.push(`**${accept[0]}**`);
      return {
        prompt: `Translate into Spanish: '${en}.'`,
        answer: { type: "text", accept },
        solution: steps,
        hint: op.kind === "like" ? "Gustar-type verbs agree with the thing liked. Is it one thing / an activity, or several things?" : "*Odiar* and *preferir* work like English verbs: you are the subject.",
        traps: mkTraps(accept, trapList),
      };
    },
  },

  // 5 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.adjective-agreement`,
    topicId: TOPIC,
    title: "Justify with porque es / son + an adjective that agrees",
    level: 2,
    guideRef: "justifying-opinions",
    generate(rng, tier) {
      const places = tier === 1 ? PLACES_SG : [...PLACES_SG, ...PLACES_PL, ...PLACES_PL];
      const p = rng.pick(places);
      const frame = rng.int(0, 3);
      const positive = frame === 0 ? true : frame === 1 ? false : rng.bool();
      const a = rng.pick(positive ? POS_ADJS : NEG_ADJS);
      const intens = positive ? rng.pick(["muy ", "bastante ", ""]) : rng.pick(["muy ", "bastante ", "un poco ", "demasiado ", ""]);
      const verb = ser(p.pl);
      const form = agree(a.es, p.g, p.pl);
      const like = likeForm("gustar", p.pl);
      const full = tier === 3;
      const gap = full ? "___" : `${verb} ${intens}___`;
      const after = full ? ` (ser + ${intens}${a.es})` : ` (${a.es})`;
      let sentence: string;
      if (frame === 0) sentence = `Me ${like} ${p.es} porque ${gap}.`;
      else if (frame === 1) sentence = `No me ${like} ${p.es} porque ${gap}.`;
      else if (frame === 2) sentence = `Para mí, ${p.es} ${gap}.`;
      else sentence = `En mi opinión, ${p.es} ${gap}.`;
      const answer = full ? `${verb} ${intens}${form}` : form;
      const accept = [answer];
      const mascSg = full ? `${verb} ${intens}${a.es}` : a.es;
      const wrongGender = full ? `${verb} ${intens}${agree(a.es, p.g === "m" ? "f" : "m", p.pl)}` : agree(a.es, p.g === "m" ? "f" : "m", p.pl);
      return {
        prompt: full
          ? `Fill the gap with the right form of *ser* and the adjective, making it agree:\n\n    ${sentence}${after}`
          : `Fill the gap with the correct form of the adjective:\n\n    ${sentence}${after}`,
        answer: { type: "text", accept },
        solution: [
          `What is being described? *${p.es}* — ${describeGN(p.g, p.pl)}.`,
          ...(full ? [`${p.pl ? "Plural subject → *son*" : "Singular subject → *es*"} (from *ser*).`] : []),
          `*${a.es}* → ${p.g === "m" ? "-o" : "-a"}${p.pl ? " + s" : ""} → **${answer}**.`,
        ],
        hint: "Agreement check: find the noun the adjective describes. Masculine or feminine? One or more?",
        traps: mkTraps(accept, [
          { wrong: [mascSg], feedback: `The adjective must agree with *${p.es}* (${describeGN(p.g, p.pl)}): *${answer}*.` },
          { wrong: wrongGender === mascSg ? [] : [wrongGender], feedback: `Gender detective: *${p.es}* is ${p.g === "m" ? "masculine" : "feminine"}, so the ending is ${p.g === "m" ? "-o" : "-a"}${p.pl ? "s" : ""}.` },
        ]),
      };
    },
  },

  // 6 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.es-hay-tiene-esta`,
    topicId: TOPIC,
    title: "Es, hay, tiene or está?",
    level: 2,
    guideRef: "justifying-opinions",
    generate(rng, tier) {
      const sgSubj: Place[] = [PLACES_SG[0], PLACES_SG[1], PLACES_SG[2], { es: "el pueblo de mis abuelos", en: "", g: "m", pl: false }];
      const plSubj: Place[] = [
        { es: "los parques de mi barrio", en: "", g: "m", pl: true },
        { es: "las playas de Málaga", en: "", g: "f", pl: true },
        { es: "las tiendas de mi barrio", en: "", g: "f", pl: true },
      ];
      const subj = rng.pick(tier === 3 ? [...sgSubj, ...plSubj] : sgSubj);
      const like = likeForm("gustar", subj.pl);
      const kinds = subj.pl ? (["es", "esta"] as const) : (["es", "esta", "hay", "tiene"] as const);
      const kind = rng.pick(kinds);
      const opinionPos = kind === "tiene" ? true : rng.bool(0.6);
      const it = subj.pl ? "they are" : "it is";
      let gapTail: string;
      let answer: string;
      let label: string;
      let why: string;
      const trapList: { wrong: string[]; feedback: string }[] = [];
      if (kind === "es") {
        const a = rng.pick((opinionPos ? POS_ADJS : NEG_ADJS).filter((x) => SER_ONLY.has(x.es) && (!subj.pl || !["moderno", "histórico"].includes(x.es))));
        // (positive: seguro, moderno, histórico · negative: aburrido, peligroso)
        gapTail = `${rng.pick(["muy ", "bastante ", ""])}${agree(a.es, subj.g, subj.pl)}`;
        answer = ser(subj.pl);
        label = it;
        why = `This describes **what it's like** (a characteristic) → *ser*: **${answer}**.`;
        trapList.push({ wrong: [estar(subj.pl)], feedback: `*${estar(subj.pl)}* is for location (or how something is at the moment). To say what a place is **like**, use *ser*: *${answer}*.` });
      } else if (kind === "esta") {
        gapTail = subj.pl
          ? rng.pick(opinionPos ? ["cerca de mi casa", "cerca del centro"] : ["lejos de mi casa", "lejos del centro"])
          : rng.pick(opinionPos ? ["cerca del mar", "cerca de la playa", "en la costa", "en el sur de España", "cerca de mi colegio"] : ["lejos del centro", "lejos de la playa", "lejos del mar", "lejos de mi colegio"]);
        answer = estar(subj.pl);
        label = it;
        why = `This says **where it is** (location) → *estar*: **${answer}**.`;
        trapList.push({ wrong: [ser(subj.pl)], feedback: `*${ser(subj.pl)}* describes what something is like. For **location** use *estar*: *${answer}*.` });
      } else if (kind === "hay") {
        const n = rng.pick(
          opinionPos
            ? [
                { es: "un parque grande", en: "there is" },
                { es: "un polideportivo", en: "there is" },
                { es: "mucho que hacer", en: "there is" },
                { es: "muchas tiendas", en: "there are" },
                { es: "muchos parques", en: "there are" },
                { es: "dos centros comerciales", en: "there are" },
              ]
            : [
                { es: "mucho ruido", en: "there is" },
                { es: "mucha contaminación", en: "there is" },
                { es: "demasiado tráfico", en: "there is" },
                { es: "pocas tiendas", en: "there are" },
              ],
        );
        gapTail = n.es;
        answer = "hay";
        label = n.en;
        why = `'${n.en}' → **hay** — it never changes, singular or plural.`;
        trapList.push({ wrong: n.en === "there are" ? ["son", "hayn"] : ["es"], feedback: `'There is / there are' is always *hay*. *${n.en === "there are" ? "Son" : "Es"}* means '${n.en === "there are" ? "they are" : "it is"}'.` });
      } else {
        gapTail = rng.pick(["un parque grande", "una playa bonita", "un centro comercial", "un polideportivo moderno", "muchas tiendas", "un jardín"]);
        answer = tener(subj.pl);
        label = "it has";
        why = `'it has' → *tener*, *él / ella* form: **${answer}**.`;
        trapList.push({ wrong: ["hay"], feedback: "*Hay* means 'there is'. The bracket says 'it has', so use *tener*: *tiene*." });
        trapList.push({ wrong: ["tengo"], feedback: "*Tengo* is 'I have'. The town has it → *él / ella* form: *tiene*." });
      }
      const opener = opinionPos ? `Me ${like} ${subj.es}` : `No me ${like} ${subj.es}`;
      const accept = [answer];
      return {
        prompt: `Fill the gap with *es*, *son*, *hay*, *tiene*, *está* or *están*:\n\n    ${opener} porque ___ ${gapTail}. (${label})`,
        answer: { type: "text", accept },
        solution: [
          "*Es / son* = what it's like · *hay* = there is / are · *tiene* = it has · *está / están* = where it is.",
          why,
          `*${opener} porque ${answer} ${gapTail}.*`,
        ],
        hint: "Ask: is the reason about what it's like, what there is, what it has, or where it is?",
        traps: mkTraps(accept, trapList),
      };
    },
  },

  // 7 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.le-les-gusta`,
    topicId: TOPIC,
    title: "Other people's opinions: le / les gusta(n)",
    level: 2,
    guideRef: "others-opinions",
    generate(rng, tier) {
      const singles = ["A mi madre", "A mi padre", "A mi hermano", "A mi hermana", "A mi abuela", "A mi amiga Priya", "A mi amigo Javier", "A Lucía", "A Arjun"];
      const plurals = ["A mis padres", "A mis abuelos", "A mis hermanos", "A mis amigos", "A Mei y a Ravi", "A mis tíos"];
      const groups: { who: string; pron: string; desc: string }[] = [
        ...singles.map((who) => ({ who, pron: "le", desc: "one person → *le*" })),
        ...plurals.map((who) => ({ who, pron: "les", desc: "several people → *les*" })),
      ];
      if (tier === 3) groups.push({ who: "A nosotros", pron: "nos", desc: "*nosotros* → *nos*" }, { who: "A vosotros", pron: "os", desc: "*vosotros* → *os*" });
      const g = rng.pick(groups);
      const things: { es: string; pl: boolean }[] = [
        { es: "vivir en el campo", pl: false },
        { es: "vivir aquí", pl: false },
        { es: "la costa", pl: false },
        { es: "el pueblo", pl: false },
        { es: "el centro", pl: false },
        { es: "su barrio", pl: false },
        { es: "los parques", pl: true },
        { es: "las tiendas del centro", pl: true },
        { es: "las playas de Málaga", pl: true },
        { es: "los pueblos de la montaña", pl: true },
      ];
      const t = rng.pick(things);
      const v: LikeVerb = rng.pick(tier === 1 ? (["gustar", "encantar"] as const) : (["gustar", "encantar", "chiflar"] as const));
      const neg = tier >= 2 && v === "gustar" && rng.bool(0.35);
      const f = likeForm(v, t.pl);
      const answer = `${neg ? "no " : ""}${g.pron} ${f}`;
      const otherPron = g.pron === "le" ? "les" : g.pron === "les" ? "le" : "les";
      const accept = [answer];
      return {
        prompt: `Fill the gap with the pronoun and the right form of *${v}*${neg ? " (make it negative)" : ""}:\n\n    ${g.who} ___ ${t.es}.`,
        answer: { type: "text", accept },
        solution: [
          `Who? *${g.who.slice(2)}* — ${g.desc}.`,
          `What? *${t.es}* — ${t.pl ? "plural → *" + f + "*" : "one thing / an activity → *" + f + "*"}.`,
          `${neg ? "*No* goes before the pronoun: " : ""}*${g.who} ${answer} ${t.es}.*`,
        ],
        hint: "Two separate decisions: WHO likes it (le / les) and WHAT is liked (gusta / gustan).",
        traps: mkTraps(accept, [
          { wrong: [`${neg ? "no " : ""}${otherPron} ${f}`, `${neg ? "no " : ""}me ${f}`], feedback: `The pronoun shows who is pleased: ${g.desc}. (*Me* only means 'me'.)` },
          { wrong: [`${neg ? "no " : ""}${g.pron} ${likeForm(v, !t.pl)}`], feedback: `*Gusta / gustan* depends on the thing liked, not the people: *${t.es}* → *${f}*.` },
        ]),
      };
    },
  },

  // 8 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.vivir-pensar-preferir`,
    topicId: TOPIC,
    title: "Present tense: vivir, pensar, preferir (and more)",
    level: 2,
    guideRef: "others-opinions",
    generate(rng, tier) {
      const verbs = tier === 1 ? ["vivir", "pensar", "preferir"] : tier === 2 ? ["vivir", "pensar", "preferir", "odiar"] : ["vivir", "pensar", "preferir", "decir", "odiar"];
      const inf = rng.pick(verbs);
      const persons: readonly Person[] = tier === 1 ? (inf === "vivir" ? PERSONS : (["yo", "él", "ellos"] as const)) : PERSONS;
      const p = rng.pick(persons);
      const SUBJ: Record<Person, string[]> = {
        yo: ["Yo"],
        tú: ["Tú"],
        él: ["Mi hermano", "Mi amiga Sofía", "Mi madre", "Diego", "Ella"],
        nosotros: ["Mi familia y yo", "Nosotros", "Mi hermano y yo"],
        vosotros: ["Vosotros", "Tu hermana y tú"],
        ellos: ["Mis padres", "Mis abuelos", "Lucía y Pablo", "Ellos"],
      };
      const COMP: Record<string, string[]> = {
        vivir: ["en un piso en el centro", "en las afueras", "en un pueblo en la montaña", "cerca de la playa", "en una casa en el campo"],
        pensar: ["que el barrio es muy tranquilo", "que la ciudad es demasiado ruidosa", "que hay mucho que hacer aquí", "que el campo es aburrido"],
        preferir: ["vivir en la costa", "la ciudad", "vivir en el campo", "el centro", "las playas de Valencia"],
        odiar: ["el ruido de la ciudad", "vivir lejos de la playa", "la contaminación"],
        decir: ["que el pueblo es bonito", "que la costa es mejor", "que no hay nada que hacer"],
      };
      const subj = rng.pick(SUBJ[p]);
      const comp = rng.pick(COMP[inf]);
      const form = conjugate(inf, "present", p);
      const accept = acceptedForms(inf, "present", p);
      const boot = p !== "nosotros" && p !== "vosotros";
      const endingsAr = { yo: "o", tú: "as", él: "a", nosotros: "amos", vosotros: "áis", ellos: "an" } as const;
      const endingsIr = { yo: "o", tú: "es", él: "e", nosotros: "imos", vosotros: "ís", ellos: "en" } as const;
      const trapList: { wrong: string[]; feedback: string }[] = [];
      if (inf === "pensar") {
        trapList.push(boot
          ? { wrong: ["pens" + endingsAr[p]], feedback: "*Pensar* is a boot verb (e→ie) — the stem changes for this person: *piens-*." }
          : { wrong: ["piens" + endingsAr[p]], feedback: "No stem change for *nosotros / vosotros* — the stress is on the ending, so the stem stays *pens-*." });
      } else if (inf === "preferir") {
        trapList.push(boot
          ? { wrong: ["prefer" + endingsIr[p]], feedback: "*Preferir* is a boot verb (e→ie) — the stem changes for this person: *prefier-*." }
          : { wrong: ["prefier" + endingsIr[p]], feedback: "No stem change for *nosotros / vosotros* — the stress is on the ending, so the stem stays *prefer-*." });
      } else if (inf === "vivir" && !boot) {
        trapList.push({ wrong: [p === "nosotros" ? "vivemos" : "vivéis"], feedback: "*Vivir* is an -ir verb: *vivimos*, *vivís* (not the -er endings)." });
      } else if (inf === "decir" && boot && p !== "yo") {
        trapList.push({ wrong: ["dec" + endingsIr[p]], feedback: "*Decir* changes e→i in the boot: *dic-*." });
      }
      const qIn = p === "tú" && rng.bool(0.5);
      const sentence = qIn ? `¿Tú ___ ${comp}?` : `${subj} ___ ${comp}.`;
      return {
        prompt: `Fill the gap with the present tense of *${inf}*:\n\n    ${sentence}`,
        answer: { type: "text", accept },
        solution: [
          `Subject: *${qIn ? "tú" : subj}* → ${p === "él" ? "*él / ella*" : p === "ellos" ? "*ellos / ellas*" : `*${p}*`} form.`,
          inf === "pensar" || inf === "preferir" || inf === "decir"
            ? `*${inf}* is a stem-changer (${inf === "decir" ? "e→i, yo *digo*" : "e→ie"})${boot ? " and this person is inside the boot" : ", but *nosotros / vosotros* are outside the boot"}.`
            : `*${inf}* is regular: stem *${inf.slice(0, -2)}-* + ending.`,
          `→ **${form}**`,
        ],
        hint: boot && (inf === "pensar" || inf === "preferir") ? "Is this person inside the 'boot'? If so, the stem's e becomes ie." : "Find the subject first, then choose the ending.",
        traps: mkTraps(accept, trapList),
      };
    },
  },

  // 9 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.comparison-words`,
    topicId: TOPIC,
    title: "Comparison words: más / menos… que, tan… como, mejor / peor",
    level: 2,
    guideRef: "comparing-places",
    generate(rng, tier) {
      const pool = tier === 3 ? [...CMP_SG, ...CMP_PL] : CMP_SG;
      const A = rng.pick(pool);
      const B = rng.pick(pool.filter((x) => x.es !== A.es));
      const types = tier === 1 ? (["mas", "menos", "tan"] as const) : (["mas", "menos", "tan", "mejor", "peor"] as const);
      const ty = rng.pick(types);
      const a = rng.pick(ADJS);
      const verb = ser(A.pl);
      const adj = agree(a.es, A.g, A.pl);
      let sentence: string;
      let answer: string;
      let label: string;
      const trapList: { wrong: string[]; feedback: string }[] = [];
      if (ty === "mas" || ty === "menos") {
        const w = ty === "mas" ? "más" : "menos";
        sentence = `${cap(A.es)} ${verb} ___ ${adj} ___ ${B.es}.`;
        answer = `${w} que`;
        label = ty === "mas" ? `more … than` : `less … than`;
        trapList.push({ wrong: [`${w} como`, `${w} de`], feedback: `After *más / menos* + adjective, use *que* ('than').` });
      } else if (ty === "tan") {
        sentence = `${cap(A.es)} ${verb} ___ ${adj} ___ ${B.es}.`;
        answer = "tan como";
        label = "as … as";
        trapList.push({ wrong: ["tan que", "más como"], feedback: "'As … as' is *tan* + adjective + *como*." });
      } else {
        const good = ty === "mejor";
        const w = good ? (A.pl ? "mejores" : "mejor") : A.pl ? "peores" : "peor";
        sentence = `${cap(A.es)} ${verb} ___ ___ ${B.es}.`;
        answer = `${w} que`;
        label = good ? "better than" : "worse than";
        trapList.push({ wrong: [good ? "más bueno que" : "más malo que", good ? "más buena que" : "más mala que"], feedback: `'${good ? "Better" : "Worse"}' has its own word: *${good ? "mejor" : "peor"}* — never *más ${good ? "bueno" : "malo"}*.` });
        if (A.pl) trapList.push({ wrong: [`${good ? "mejor" : "peor"} que`], feedback: `*${A.es}* is plural, so *${good ? "mejor" : "peor"}* adds -es: *${w}*.` });
        else trapList.push({ wrong: [`${good ? "mejores" : "peores"} que`], feedback: `*${A.es}* is singular: *${good ? "mejor" : "peor"}*.` });
      }
      const [w1, w2] = answer.split(" ");
      const accept = [answer, `${w1} … ${w2}`];
      return {
        prompt: `Fill both gaps (${label}). Type the two words with a space:\n\n    ${sentence}`,
        answer: { type: "text", accept },
        solution: [
          "*más … que* = more … than · *menos … que* = less … than · *tan … como* = as … as · *mejor / peor que* = better / worse than.",
          `'${label}' → **${answer}**.`,
          `*${sentence.replace("___ ", w1 + " ").replace("___", w2)}*`,
        ],
        hint: ty === "tan" ? "Equal comparisons pair *tan* with a different word from *más / menos*." : "What does the bracket say: more, less, equal, better or worse?",
        traps: mkTraps(accept, trapList),
      };
    },
  },

  // 10 ────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.near-future`,
    topicId: TOPIC,
    title: "Future plans: ir a + infinitive (voy a vivir…)",
    level: 2,
    guideRef: "future-home",
    generate(rng, tier) {
      const VERBS_F: Record<string, { es: string; en: string }[]> = {
        vivir: [
          { es: "en un piso moderno", en: "in a modern flat" },
          { es: "en la costa", en: "on the coast" },
          { es: "en el campo", en: "in the countryside" },
          { es: "en un pueblo tranquilo", en: "in a quiet village" },
          { es: "en Barcelona", en: "in Barcelona" },
        ],
        comprar: [
          { es: "una casa con jardín", en: "a house with a garden" },
          { es: "un piso en el centro", en: "a flat in the centre" },
          { es: "una casa grande en el campo", en: "a big house in the countryside" },
        ],
        trabajar: [
          { es: "en Madrid", en: "in Madrid" },
          { es: "en la ciudad", en: "in the city" },
          { es: "en Singapur", en: "in Singapore" },
        ],
        tener: [
          { es: "una casa grande", en: "a big house" },
          { es: "un jardín bonito", en: "a nice garden" },
        ],
      };
      const NOUN_SUBJ: Partial<Record<Person, { es: string; en: string }[]>> = {
        él: [{ es: "Mi hermana", en: "My sister" }, { es: "Mi primo", en: "My cousin" }, { es: "Carmen", en: "Carmen" }],
        ellos: [{ es: "Mis padres", en: "My parents" }, { es: "Mis abuelos", en: "My grandparents" }],
      };

      // Special templates: hay → va a haber; es → va a ser (tier 2+ rewrite).
      if (tier === 2 && rng.bool(0.25)) {
        const useHay = rng.bool();
        if (useHay) {
          const n = rng.pick([
            { es: "muchas tiendas", pl: true },
            { es: "mucha contaminación", pl: false },
            { es: "un polideportivo", pl: false },
            { es: "más parques", pl: true },
          ]);
          const place = rng.pick(["En mi barrio", "En mi ciudad", "En el centro"]);
          const answer = `${place} va a haber ${n.es}.`;
          const accept = [answer];
          return {
            prompt: `Rewrite in the near future (*ir a* + infinitive):\n\n    ${place} hay ${n.es}.`,
            answer: { type: "text", accept },
            solution: ["*Hay* comes from *haber*; its infinitive is *haber*.", "Future: *va* + *a* + *haber* → *va a haber* (always singular, like *hay*).", `**${answer}**`],
            hint: "*Hay* never changes — and neither does its future.",
            traps: mkTraps(accept, [
              { wrong: [`${place} van a haber ${n.es}`], feedback: "*Hay* never goes plural, and nor does *va a haber* — even with *muchas tiendas*." },
              { wrong: [`${place} va a hay ${n.es}`], feedback: "After *va a* you need the infinitive: *haber*." },
            ]),
          };
        }
        const pl = rng.pick(PLACES_SG.slice(0, 3));
        const a = rng.pick(ADJS);
        const adj = agree(a.es, pl.g, pl.pl);
        const intens = rng.pick(["muy ", "más ", ""]);
        const fut = conjugate("ser", "near-future", "él");
        const answer = `${cap(pl.es)} ${fut} ${intens}${adj}.`;
        const accept = [answer];
        return {
          prompt: `Rewrite in the near future (*ir a* + infinitive):\n\n    ${cap(pl.es)} ${ser(false)} ${intens}${adj}.`,
          answer: { type: "text", accept },
          solution: ["*Es* comes from *ser*.", `Future: *${fut}* — *va* (from *ir*) + *a* + infinitive *ser*.`, `**${answer}**`],
          hint: "Use *va a* + the infinitive of the verb.",
          traps: mkTraps(accept, [
            { wrong: [`${cap(pl.es)} va a es ${intens}${adj}`], feedback: "After *va a* the verb stays in the infinitive: *ser*, not *es*." },
            { wrong: [`${cap(pl.es)} va ser ${intens}${adj}`], feedback: "Don't forget the little word *a*: *va a ser*." },
          ]),
        };
      }

      const inf = tier === 1 ? "vivir" : rng.pick(["vivir", "vivir", "comprar", "trabajar", "tener"]);
      const persons: readonly Person[] = tier === 1 ? (["yo", "él", "ellos", "nosotros"] as const) : PERSONS;
      const p = rng.pick(persons);
      const c = rng.pick(VERBS_F[inf]);
      const noun = NOUN_SUBJ[p] ? rng.pick(NOUN_SUBJ[p]!) : undefined;
      const fut = conjugate(inf, "near-future", p);
      const pres = conjugate(inf, "present", p);
      const ir = fut.split(" ")[0];

      if (tier === 3) {
        const time = rng.pick([
          { es: "en el futuro", en: "In the future" },
          { es: "algún día", en: "One day" },
          { es: "el año que viene", en: "Next year" },
          { es: "dentro de diez años", en: "In ten years' time" },
        ]);
        const gl = englishGloss(inf, "near-future", p); // e.g. "they are going to live"
        const m = gl.match(/^(.*?) ((?:am|are|is) .*)$/);
        const glSubj = m ? m[1] : "I";
        const glRest = m ? m[2] : gl;
        const enSubj = noun ? lowerFirst(noun.en) : glSubj === "I" ? "I" : glSubj.replace("you all", "you");
        const en = `${time.en} ${enSubj} ${glRest} ${c.en}.`;
        const cores = noun ? [`${noun.es} ${fut} ${c.es}`] : acceptedForms(inf, "near-future", p).map((f) => `${f} ${c.es}`);
        const accept = uniq(cores.flatMap((core) => [`${cap(time.es)} ${lowerFirst(core)}.`, `${cap(core)} ${time.es}.`]));
        const who = p === "tú" ? " (Use *tú*.)" : p === "vosotros" ? " (Use *vosotros*.)" : "";
        return {
          prompt: `Translate into Spanish: '${en}'${who}`,
          answer: { type: "text", accept },
          solution: [
            `'${time.en}' → *${time.es}* (at the start or the end).`,
            `'going to' → *${ir}* + *a* + infinitive *${inf}*.`,
            `**${accept[0]}**`,
          ],
          hint: "Three pieces: the right form of *ir*, then *a*, then the infinitive — which never changes.",
          traps: mkTraps(accept, [
            { wrong: [`${cap(time.es)} ${noun ? lowerFirst(noun.es) + " " : ""}${ir} a ${pres} ${c.es}`], feedback: `After *${ir} a* keep the infinitive: *${inf}*, not *${pres}*.` },
            { wrong: [`${cap(time.es)} ${noun ? lowerFirst(noun.es) + " " : ""}${ir} ${inf} ${c.es}`], feedback: `Don't forget *a*: *${ir} a ${inf}*.` },
          ]),
        };
      }

      const presentSentence = noun ? `${noun.es} ${pres} ${c.es}.` : `${cap(pres)} ${c.es}.`;
      const accept = noun ? [`${noun.es} ${fut} ${c.es}.`] : acceptedForms(inf, "near-future", p).map((f) => `${cap(f)} ${c.es}.`);
      const pre = noun ? `${noun.es} ` : "";
      return {
        prompt: `Rewrite in the near future (*ir a* + infinitive):\n\n    ${presentSentence}`,
        answer: { type: "text", accept },
        solution: [
          `*${pres}* → infinitive *${inf}*; the person is *${p === "él" ? "él / ella" : p === "ellos" ? "ellos / ellas" : p}*.`,
          `*ir* for that person: *${ir}* → *${ir} a ${inf}*.`,
          `**${accept[0]}**`,
        ],
        hint: "Keep the person in the form of *ir*; the main verb goes back to the infinitive.",
        traps: mkTraps(accept, [
          { wrong: [`${pre}${ir} a ${pres} ${c.es}`], feedback: `After *${ir} a* use the infinitive *${inf}* — don't conjugate it twice.` },
          { wrong: [`${pre}${ir} ${inf} ${c.es}`], feedback: `You need the little word *a*: *${ir} a ${inf}*.` },
        ]),
      };
    },
  },

  // 11 ────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.compare-two-places`,
    topicId: TOPIC,
    title: "Compare two places in a sentence (with agreement)",
    level: 3,
    guideRef: "comparing-places",
    generate(rng, tier) {
      const pool = tier === 3 ? [...CMP_SG, ...CMP_PL] : CMP_SG;
      const A = rng.pick(pool);
      const B = rng.pick(pool.filter((x) => x.es !== A.es));
      const types = tier === 1 ? (["mas", "mas", "menos"] as const) : (["mas", "menos", "tan", "mejor", "peor"] as const);
      const ty = rng.pick(types);
      const a = rng.pick(ADJS);
      const verb = ser(A.pl);
      const enVerb = A.pl ? "are" : "is";
      const adj = agree(a.es, A.g, A.pl);
      let core: string;
      let en: string;
      let rule: string;
      const trapList: { wrong: string[]; feedback: string }[] = [];
      const bEs = (b: Place) => [b.es, ...(b.es === "el centro" ? ["el centro de la ciudad"] : [])];
      if (ty === "mejor" || ty === "peor") {
        const good = ty === "mejor";
        const w = good ? (A.pl ? "mejores" : "mejor") : A.pl ? "peores" : "peor";
        core = `${verb} ${w} que`;
        en = `${cap(A.en)} ${enVerb} ${good ? "better" : "worse"} than ${B.en}.`;
        rule = `'${good ? "better" : "worse"} than' → *${w} que*${A.pl ? " (plural -es)" : ""} — never *más ${good ? "bueno" : "malo"}*.`;
        trapList.push({ wrong: [`${cap(A.es)} ${verb} más ${good ? "bueno" : "malo"} que ${B.es}`, `${cap(A.es)} ${verb} más ${agree(good ? "bueno" : "malo", A.g, A.pl)} que ${B.es}`], feedback: `'${good ? "Better" : "Worse"}' is *${good ? "mejor" : "peor"}*, not *más ${good ? "bueno" : "malo"}*.` });
      } else {
        const w = ty === "mas" ? "más" : ty === "menos" ? "menos" : "tan";
        const link = ty === "tan" ? "como" : "que";
        core = `${verb} ${w} ${adj} ${link}`;
        en = ty === "mas" ? `${cap(A.en)} ${enVerb} ${a.er} than ${B.en}.` : ty === "menos" ? `${cap(A.en)} ${enVerb} less ${a.en} than ${B.en}.` : `${cap(A.en)} ${enVerb} as ${a.en} as ${B.en}.`;
        rule = `${ty === "tan" ? "'as … as' → *tan* + adjective + *como*" : `'${ty === "mas" ? "more" : "less"} … than' → *${w}* + adjective + *que*`}; *${A.es}* is ${describeGN(A.g, A.pl)} → *${adj}*.`;
        if (adj !== a.es) trapList.push({ wrong: [`${cap(A.es)} ${verb} ${w} ${a.es} ${link} ${B.es}`], feedback: `Agreement check: the adjective agrees with *${A.es}* (${describeGN(A.g, A.pl)}) → *${adj}*.` });
        trapList.push({ wrong: [`${cap(A.es)} ${verb} ${w} ${adj} ${ty === "tan" ? "que" : "como"} ${B.es}`], feedback: ty === "tan" ? "*Tan* pairs with *como*: *tan … como*." : "*Más / menos* pair with *que*: *más … que*." });
      }
      const accept = uniq(bEs(B).map((b) => `${cap(A.es)} ${core} ${b}.`));
      return {
        prompt: `Translate into Spanish: '${en}'`,
        answer: { type: "text", accept },
        solution: [`Subject: *${A.es}* → *${verb}*.`, rule, `**${accept[0]}**`],
        hint: "Agreement check: the adjective agrees with the FIRST place — the subject of *es / son*.",
        traps: mkTraps(accept, trapList),
      };
    },
  },

  // 12 ────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.opinion-plus-reason`,
    topicId: TOPIC,
    title: "Extended sentence: opinion + porque + reason",
    level: 3,
    guideRef: "justifying-opinions",
    generate(rng, tier) {
      const places: Place[] = [
        { es: "mi barrio", en: "my neighbourhood", g: "m", pl: false },
        { es: "mi ciudad", en: "my city", g: "f", pl: false },
        { es: "mi pueblo", en: "my village", g: "m", pl: false },
        { es: "el campo", en: "the countryside", g: "m", pl: false },
        { es: "la costa", en: "the coast", g: "f", pl: false },
        { es: "la ciudad", en: "the city", g: "f", pl: false },
      ];
      type Who = { en: string; esPos: (f: string) => string; esNeg: (f: string) => string; ami: boolean; s3: boolean };
      const whos: Who[] = [{ en: "I", esPos: (f) => `Me ${f}`, esNeg: (f) => `No me ${f}`, ami: true, s3: false }];
      if (tier === 3) {
        whos.push(
          { en: "My mother", esPos: (f) => `A mi madre le ${f}`, esNeg: (f) => `A mi madre no le ${f}`, ami: false, s3: true },
          { en: "My parents", esPos: (f) => `A mis padres les ${f}`, esNeg: (f) => `A mis padres no les ${f}`, ami: false, s3: false },
        );
      }
      const who = rng.pick(whos);
      const p = rng.pick(places);
      const positive = rng.bool();
      const v: LikeVerb = positive ? rng.pick(["gustar", "encantar"] as const) : "gustar";
      const f = likeForm(v, false);
      const a = rng.pick(positive ? POS_ADJS : NEG_ADJS);
      const intens = rng.pick([{ es: "muy ", en: "very " }, { es: "bastante ", en: "quite " }, { es: "", en: "" }]);
      const adj = agree(a.es, p.g, p.pl);
      // English opinion phrase
      const enVerb = positive
        ? v === "gustar" ? (who.s3 ? "likes" : "like") : who.s3 ? "loves" : "love"
        : who.s3 ? "doesn't like" : "don't like";
      const head = positive ? who.esPos(f) : who.esNeg(f);
      // Second clause (tier 2+)
      const extras = positive
        ? [
            { es: "y hay mucho que hacer", en: "and there is a lot to do" },
            { es: "y hay muchos parques", en: "and there are lots of parks" },
            { es: "pero no hay nada que hacer", en: "but there is nothing to do" },
            { es: "pero hay mucho ruido", en: "but there is a lot of noise" },
          ]
        : [
            { es: "y no hay nada que hacer", en: "and there is nothing to do" },
            { es: "y hay mucha contaminación", en: "and there is a lot of pollution" },
            { es: "pero hay muchas tiendas", en: "but there are lots of shops" },
          ];
      const extra = tier >= 2 ? rng.pick(extras) : undefined;
      const en = `${who.en} ${enVerb} ${p.en} because it is ${intens.en}${a.en}${extra ? (extra.es.startsWith("pero") ? ", " : " ") + extra.en : ""}.`;
      const tail = (conn: string, adjForm: string) => `${conn} ${ser(false)} ${intens.es}${adjForm}${extra ? (extra.es.startsWith("pero") ? ", " : " ") + extra.es : ""}`;
      const conns = ["porque", "ya que"];
      const bases = conns.map((conn) => `${head} ${p.es} ${tail(conn, adj)}.`);
      if (a.es === "sucio" || a.es === "limpio") bases.push(...conns.map((conn) => `${head} ${p.es} ${tail(conn, adj).replace(/ es /, " está ")}.`));
      const accept = uniq(who.ami ? bases.flatMap(withAmi) : bases);
      const trapList: { wrong: string[]; feedback: string }[] = [];
      if (adj !== a.es) trapList.push({ wrong: [`${head} ${p.es} ${tail("porque", a.es)}`], feedback: `Agreement check: *${p.es}* is feminine → *${adj}*.` });
      if (!who.ami) trapList.push({ wrong: [`${head.replace(/ (le|les) /, " me ")} ${p.es} ${tail("porque", adj)}`], feedback: `*Me* means 'to me'. For ${who.en.toLowerCase()} use *${who.s3 ? "le" : "les"}*.` });
      if (SER_ONLY.has(a.es)) trapList.push({ wrong: [`${head} ${p.es} ${tail("porque", adj).replace(/^porque es/, "porque está")}`], feedback: `To say what a place is **like**, use *es* (from *ser*). *Está* is for location — and *está ${adj}* would change the meaning.` });
      return {
        prompt: `Translate into Spanish: '${en}'`,
        answer: { type: "text", accept },
        solution: [
          `Opinion: *${head} ${p.es}*${who.ami ? "" : ` (${who.s3 ? "one person → *le*" : "several people → *les*"})`}.`,
          `Reason: *porque* (or *ya que*) + *es* + adjective agreeing with *${p.es}* (${describeGN(p.g, p.pl)}) → *${intens.es}${adj}*.`,
          ...(extra ? [`Add the second idea: *${extra.es}* (*hay* = there is / are).`] : []),
          `**${accept[0]}**`,
        ],
        hint: "Build it up in chunks: opinion → place → *porque es* + adjective → extra detail.",
        traps: mkTraps(accept, trapList),
      };
    },
  },
];
