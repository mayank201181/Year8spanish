// Procedural skill drills for "En mi ciudad — Places in Town" (la-ciudad).
import type { Drill } from "./types.ts";
import type { Trap } from "../types.ts";
import { conjugate, acceptedForms, type Person } from "../spanish/verbs.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";

const TOPIC = "la-ciudad";

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function uniq(xs: string[]): string[] {
  return [...new Set(xs)];
}

/** Capitalise the first letter (after an opening ¿ or ¡). */
function cap(s: string): string {
  const i = /^[¿¡]/.test(s) ? 1 : 0;
  return s.slice(0, i) + s.charAt(i).toUpperCase() + s.slice(i + 1);
}

/** Statement with a capital and full stop (the checker ignores both). */
function sent(s: string): string {
  return cap(s) + ".";
}

/** Question with ¿…? (the checker ignores both). */
function ask(s: string): string {
  return "¿" + cap(s) + "?";
}

const key = (s: string) => stripAccents(normSpanish(s));

/**
 * Build traps that can never be accepted as correct (or differ from a correct
 * answer only by accents — those already get the "check your accents" nudge).
 */
function makeTraps(accept: string[], list: { wrong: string[]; feedback: string }[]): Trap[] {
  const ok = new Set(accept.map(key));
  const out: Trap[] = [];
  for (const t of list) {
    const wrong = uniq(t.wrong).filter((w) => !ok.has(key(w)));
    if (wrong.length) out.push({ spec: { type: "text", accept: wrong }, feedback: t.feedback });
  }
  return out.slice(0, 2);
}

// ---------------------------------------------------------------------------
// Places lexicon
// ---------------------------------------------------------------------------

type G = "m" | "f";
type Rule = "vowel" | "consonant" | "two" | "de";

interface Place {
  /** Noun phrase without its article. */
  n: string;
  g: G;
  /** Plural noun phrase without article. */
  pl: string;
  /** English singular (canonical first). */
  en: string[];
  /** English plural (canonical first). */
  enPl: string[];
  rule: Rule;
  /** Tier-1 (most common) place. */
  core?: boolean;
  /** A town normally has only one (no plurals / numbers in sentences). */
  unique?: boolean;
  /** Other correct Spanish for the same place (no article). */
  alt?: string[];
}

const P = (n: string, g: G, pl: string, en: string[], enPl: string[], rule: Rule, extra: Partial<Place> = {}): Place => ({ n, g, pl, en, enPl, rule, ...extra });

const PLACES: Place[] = [
  P("ayuntamiento", "m", "ayuntamientos", ["town hall", "city hall"], ["town halls", "city halls"], "vowel", { core: true, unique: true }),
  P("biblioteca", "f", "bibliotecas", ["library"], ["libraries"], "vowel", { core: true }),
  P("polideportivo", "m", "polideportivos", ["sports centre", "sports center", "leisure centre"], ["sports centres", "sports centers", "leisure centres"], "vowel", { core: true }),
  P("piscina", "f", "piscinas", ["swimming pool", "pool"], ["swimming pools", "pools"], "vowel", { core: true }),
  P("centro comercial", "m", "centros comerciales", ["shopping centre", "shopping center", "shopping mall", "mall"], ["shopping centres", "shopping centers", "shopping malls", "malls"], "two", { core: true }),
  P("mercado", "m", "mercados", ["market"], ["markets"], "vowel", { core: true }),
  P("iglesia", "f", "iglesias", ["church"], ["churches"], "vowel", { core: true }),
  P("catedral", "f", "catedrales", ["cathedral"], ["cathedrals"], "consonant"),
  P("museo", "m", "museos", ["museum"], ["museums"], "vowel", { core: true }),
  P("parque", "m", "parques", ["park"], ["parks"], "vowel", { core: true }),
  P("estación de tren", "f", "estaciones de tren", ["train station", "railway station"], ["train stations", "railway stations"], "de", { alt: ["estación de trenes"] }),
  P("estación de autobuses", "f", "estaciones de autobuses", ["bus station"], ["bus stations"], "de"),
  P("estación de metro", "f", "estaciones de metro", ["metro station", "MRT station", "underground station", "tube station", "subway station"], ["metro stations", "MRT stations", "underground stations", "tube stations", "subway stations"], "de"),
  P("cine", "m", "cines", ["cinema", "movie theatre", "movie theater"], ["cinemas", "movie theatres", "movie theaters"], "vowel", { core: true }),
  P("castillo", "m", "castillos", ["castle"], ["castles"], "vowel", { core: true }),
  P("playa", "f", "playas", ["beach"], ["beaches"], "vowel", { core: true }),
  P("plaza mayor", "f", "plazas mayores", ["main square", "town square"], ["main squares", "town squares"], "two", { unique: true }),
  P("hospital", "m", "hospitales", ["hospital"], ["hospitals"], "consonant", { core: true }),
  P("banco", "m", "bancos", ["bank"], ["banks"], "vowel", { core: true }),
  P("tienda", "f", "tiendas", ["shop", "store"], ["shops", "stores"], "vowel", { core: true }),
  P("restaurante", "m", "restaurantes", ["restaurant"], ["restaurants"], "vowel", { core: true }),
  P("estadio", "m", "estadios", ["stadium"], ["stadiums", "stadia"], "vowel"),
  P("teatro", "m", "teatros", ["theatre", "theater"], ["theatres", "theaters"], "vowel"),
  P("librería", "f", "librerías", ["bookshop", "bookstore"], ["bookshops", "bookstores"], "vowel"),
  P("farmacia", "f", "farmacias", ["chemist's", "chemist", "pharmacy"], ["chemist's", "chemists", "pharmacies"], "vowel"),
];

const CORE = PLACES.filter((p) => p.core);
const byName = (n: string): Place => {
  const p = PLACES.find((x) => x.n === n);
  if (!p) throw new Error(`unknown place ${n}`);
  return p;
};

const DEF: Record<G, string> = { m: "el", f: "la" };
const INDEF: Record<G, string> = { m: "un", f: "una" };
const DEF_PL: Record<G, string> = { m: "los", f: "las" };
const INDEF_PL: Record<G, string> = { m: "unos", f: "unas" };
const MUCHOS: Record<G, string> = { m: "muchos", f: "muchas" };
const VARIOS: Record<G, string> = { m: "varios", f: "varias" };
const NINGUN: Record<G, string> = { m: "ningún", f: "ninguna" };
const other = (g: G): G => (g === "m" ? "f" : "m");
const genderWord = (g: G) => (g === "m" ? "masculine" : "feminine");

const the = (p: Place) => `${DEF[p.g]} ${p.n}`;
/** a + el = al; a + la stays. */
const toThe = (p: Place) => (p.g === "m" ? `al ${p.n}` : `a la ${p.n}`);
/** de + el = del; de + la stays. */
const ofThe = (p: Place) => (p.g === "m" ? `del ${p.n}` : `de la ${p.n}`);

const RULE_TEXT: Record<Rule, string> = {
  vowel: "it ends in a vowel, so just add *-s*",
  consonant: "it ends in a consonant, so add *-es*",
  two: "noun + adjective: **both** words go plural",
  de: "place + *de* + label: only the first noun goes plural (*estación* → *estaciones*, the written accent disappears)",
};

/** Frames for "in my town / village / neighbourhood". */
const FRAMES: { en: string; es: string[] }[] = [
  { en: "In my town", es: ["en mi ciudad", "en mi pueblo"] },
  { en: "In my village", es: ["en mi pueblo"] },
  { en: "In my neighbourhood", es: ["en mi barrio"] },
];

// ---------------------------------------------------------------------------
// Directions lexicon (tú commands = the él/ella present form, from the conjugator)
// ---------------------------------------------------------------------------

type Side = "derecha" | "izquierda";
const SIDE_EN: Record<Side, string> = { derecha: "right", izquierda: "left" };
const flip = (s: Side): Side => (s === "derecha" ? "izquierda" : "derecha");

const SIGUE = conjugate("seguir", "present", "él");
const GIRA = conjugate("girar", "present", "él");
const TOMA = conjugate("tomar", "present", "él");
const COGE = conjugate("coger", "present", "él");
const CRUZA = conjugate("cruzar", "present", "él");
const SUBE = conjugate("subir", "present", "él");
const BAJA = conjugate("bajar", "present", "él");
const TUERCE = "tuerce"; // torcer (o→ue) is not in the conjugator: fixed chunk from the guide
const PUEDE = conjugate("poder", "present", "él");

/** usted commands (recognition only — fixed chunks from the guide). */
const USTED: Record<string, string> = { [SIGUE]: "siga", [GIRA]: "gire", [TUERCE]: "tuerza", [TOMA]: "tome", [COGE]: "coja", [CRUZA]: "cruce", [SUBE]: "suba", [BAJA]: "baje" };

const ORD_F = ["primera", "segunda", "tercera", "cuarta", "quinta"];
const ORD_M = ["primer", "segundo", "tercer", "cuarto", "quinto"];
const ORD_M_LONG = ["primero", "segundo", "tercero", "cuarto", "quinto"];
const ORD_EN = [["first", "1st"], ["second", "2nd"], ["third", "3rd"], ["fourth", "4th"], ["fifth", "5th"]];

const STRAIGHT_EN = ["go straight on", "go straight ahead", "go straight", "carry straight on", "keep going straight", "keep straight on", "continue straight on", "straight on", "straight ahead"];
const turnEn = (s: Side) => [`turn ${SIDE_EN[s]}`, `turn to the ${SIDE_EN[s]}`];
const takeEn = (i: number, s: Side) =>
  ORD_EN[i].flatMap((o) => [
    `take the ${o} street on the ${SIDE_EN[s]}`,
    `take the ${o} road on the ${SIDE_EN[s]}`,
    `take the ${o} street to the ${SIDE_EN[s]}`,
    `take the ${o} road to the ${SIDE_EN[s]}`,
    `take the ${o} ${SIDE_EN[s]}`,
  ]);

/** One direction instruction: Spanish tú form(s), usted form, English accepts. */
interface Step {
  tu: string[];
  ud: string;
  en: string[];
  /** English with left/right swapped (for the trap), if the step has a side. */
  swapEn?: string[];
  /** Spanish tú with left/right swapped. */
  swapTu?: string;
  /** What the step is, for the solution. */
  note: string;
}

const turnStep = (verb: string, s: Side): Step => ({
  tu: [`${verb} a la ${s}`],
  ud: `${USTED[verb]} a la ${s}`,
  en: turnEn(s),
  swapEn: turnEn(flip(s)),
  swapTu: `${verb} a la ${flip(s)}`,
  note: `*${verb}* = turn; *a la ${s}* = ${SIDE_EN[s]}`,
});
const takeStep = (i: number, s: Side): Step => ({
  tu: [`${TOMA} la ${ORD_F[i]} calle a la ${s}`, `${COGE} la ${ORD_F[i]} calle a la ${s}`],
  ud: `${USTED[TOMA]} la ${ORD_F[i]} calle a la ${s}`,
  en: takeEn(i, s),
  swapEn: takeEn(i, flip(s)),
  swapTu: `${TOMA} la ${ORD_F[i]} calle a la ${flip(s)}`,
  note: `*${TOMA}* = take; *la ${ORD_F[i]} calle* = the ${ORD_EN[i][0]} street (feminine, like *calle*); *a la ${s}* = on the ${SIDE_EN[s]}`,
});
const STRAIGHT: Step = { tu: [`${SIGUE} todo recto`, `${SIGUE} recto`], ud: "siga todo recto", en: STRAIGHT_EN, note: `*${SIGUE} todo recto* = go straight on` };
const CROSS_SQ: Step = { tu: [`${CRUZA} la plaza`], ud: "cruce la plaza", en: ["cross the square", "cross the plaza", "go across the square"], note: `*${CRUZA}* = cross; *la plaza* = the square` };
const CROSS_BR: Step = { tu: [`${CRUZA} el puente`], ud: "cruce el puente", en: ["cross the bridge", "go over the bridge", "go across the bridge"], note: `*${CRUZA}* = cross; *el puente* = the bridge` };
const UP: Step = { tu: [`${SUBE} la calle`], ud: "suba la calle", en: ["go up the street", "go up the road", "walk up the street", "walk up the road"], note: `*${SUBE}* (subir) = go up` };
const DOWN: Step = { tu: [`${BAJA} la calle`], ud: "baje la calle", en: ["go down the street", "go down the road", "walk down the street", "walk down the road"], note: `*${BAJA}* (bajar) = go down` };

function turnSteps(): Step[] {
  const out: Step[] = [];
  for (const s of ["derecha", "izquierda"] as Side[]) out.push(turnStep(GIRA, s), turnStep(TUERCE, s));
  return out;
}
function takeSteps(maxOrd: number): Step[] {
  const out: Step[] = [];
  for (let i = 0; i < maxOrd; i++) for (const s of ["derecha", "izquierda"] as Side[]) out.push(takeStep(i, s));
  return out;
}

/** Combine two steps: "A y B" / "A and (then) B". */
function joinSteps(a: Step, b: Step): Step {
  const en: string[] = [];
  for (const x of a.en) for (const y of b.en) en.push(`${x} and ${y}`, `${x} then ${y}`, `${x} and then ${y}`);
  const tu: string[] = [];
  for (const x of a.tu) for (const y of b.tu) tu.push(`${x} y ${y}`);
  return {
    tu,
    ud: `${a.ud} y ${b.ud}`,
    en,
    swapEn: a.swapEn || b.swapEn ? [`${(a.swapEn ?? a.en)[0]} and ${(b.swapEn ?? b.en)[0]}`] : undefined,
    swapTu: a.swapTu || b.swapTu ? `${a.swapTu ?? a.tu[0]} y ${b.swapTu ?? b.tu[0]}` : undefined,
    note: `${a.note}; ${b.note}`,
  };
}

// ---------------------------------------------------------------------------
// Activities for se puede
// ---------------------------------------------------------------------------

interface Act {
  place: string;
  inf: string;
  rest: string;
  en: string[];
  alt?: string[];
}
const ACTS: Act[] = [
  { place: "piscina", inf: "nadar", rest: "", en: ["swim", "go swimming"] },
  { place: "centro comercial", inf: "ir", rest: "de compras", en: ["go shopping"] },
  { place: "polideportivo", inf: "hacer", rest: "deporte", en: ["do sport", "do sports", "play sport"], alt: ["practicar deporte"] },
  { place: "polideportivo", inf: "jugar", rest: "al baloncesto", en: ["play basketball"] },
  { place: "cine", inf: "ver", rest: "una película", en: ["watch a film", "see a film", "watch a movie"] },
  { place: "parque", inf: "pasear", rest: "", en: ["go for a walk"], alt: ["dar un paseo"] },
  { place: "parque", inf: "montar", rest: "en bici", en: ["ride a bike", "go cycling"], alt: ["montar en bicicleta"] },
  { place: "playa", inf: "tomar", rest: "el sol", en: ["sunbathe"] },
  { place: "biblioteca", inf: "leer", rest: "", en: ["read"] },
  { place: "biblioteca", inf: "estudiar", rest: "", en: ["study"] },
  { place: "museo", inf: "aprender", rest: "historia", en: ["learn history"], alt: ["aprender sobre la historia"] },
  { place: "estadio", inf: "ver", rest: "un partido de fútbol", en: ["watch a football match", "see a football match"] },
  { place: "mercado", inf: "comprar", rest: "fruta", en: ["buy fruit"] },
  { place: "banco", inf: "sacar", rest: "dinero", en: ["take out money", "withdraw money"] },
  { place: "teatro", inf: "ver", rest: "una obra de teatro", en: ["see a play", "watch a play"] },
  { place: "restaurante", inf: "comer", rest: "una paella de verduras", en: ["eat a vegetable paella"], alt: ["comer paella de verduras"] },
];
const NEG_ACTS: Act[] = [
  { place: "biblioteca", inf: "comer", rest: "", en: ["eat"] },
  { place: "museo", inf: "sacar", rest: "fotos", en: ["take photos"] },
  { place: "teatro", inf: "sacar", rest: "fotos", en: ["take photos"] },
  { place: "cine", inf: "usar", rest: "el móvil", en: ["use your mobile"], alt: ["usar el teléfono móvil"] },
  { place: "biblioteca", inf: "hablar", rest: "por teléfono", en: ["talk on the phone"] },
  { place: "piscina", inf: "correr", rest: "", en: ["run"] },
  { place: "hospital", inf: "hacer", rest: "ruido", en: ["make noise"] },
];
const actEs = (a: Act) => uniq([`${a.inf}${a.rest ? " " + a.rest : ""}`, ...(a.alt ?? [])]);
const actWrong = (a: Act) => `${conjugate(a.inf, "present", "él")}${a.rest ? " " + a.rest : ""}`;

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.places-es-en`,
    topicId: TOPIC,
    title: "Places in town: Spanish → English",
    level: 1,
    guideRef: "places-in-town",
    generate(rng, tier) {
      const p = rng.pick(tier === 1 ? CORE : PLACES);
      const plural = tier === 3 && !p.unique && rng.bool(0.4);
      const es = plural ? `${DEF_PL[p.g]} ${p.pl}` : the(p);
      let ens = plural ? p.enPl : p.en;
      if (p.n === "banco") ens = plural ? [...ens, "benches"] : [...ens, "bench"];
      const accept = uniq(ens.flatMap((e) => (plural ? [e, `the ${e}`, `some ${e}`] : [e, `the ${e}`, `a ${e}`])));
      const prompt = rng.pick([
        `What does *${es}* mean in English?`,
        `Translate into English: *${es}*`,
        `You see a sign for *${es}* in a Spanish town. What is it in English?`,
      ]);
      const trapList: { wrong: string[]; feedback: string }[] = [];
      if (p.n === "biblioteca") trapList.push({ wrong: ["bookshop", "the bookshop", "bookstore", "the bookstore", "libraries"].filter((w) => !plural || w !== "libraries"), feedback: "Careful: a bookshop is *la librería*. *La biblioteca* (think 'bibliography') is where you borrow books." });
      if (p.n === "librería") trapList.push({ wrong: ["library", "the library", "libraries", "the libraries"], feedback: "False friend! *La librería* is a bookshop (you buy books). The library is *la biblioteca*." });
      const extra =
        p.n === "librería" ? " — a false friend: it is NOT 'library'" : p.n === "banco" ? " (it can also mean 'bench')" : p.n === "catedral" ? " (feminine even though it ends in *-al*)" : "";
      return {
        prompt,
        answer: { type: "text", accept },
        solution: [
          `*${es}*: the article *${es.split(" ")[0]}* shows it is ${genderWord(p.g)}${plural ? " plural" : ""}.`,
          `*${es}* = **the ${ens[0]}**${extra}.`,
        ],
        hint: p.rule === "de" || p.rule === "two" ? "Translate the first noun — that's the real place; the rest is a label." : "Say it aloud — many places are cognates (they sound like the English word).",
        traps: makeTraps(accept, trapList),
      };
    },
  },

  // 2 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.places-en-es`,
    topicId: TOPIC,
    title: "Places in town: English → Spanish (with el/la)",
    level: 1,
    guideRef: "places-in-town",
    generate(rng, tier) {
      const p = rng.pick(tier === 1 ? CORE : PLACES);
      const mode = tier === 3 ? rng.pick(p.unique ? ["def", "indef"] : ["def", "indef", "pl"]) : "def";
      const nouns = uniq([p.n, ...(p.alt ?? [])]);
      let accept: string[];
      let prompt: string;
      let wrongArt: string[];
      let rightArt: string;
      if (mode === "def") {
        accept = nouns.map((n) => `${DEF[p.g]} ${n}`);
        wrongArt = [`${DEF[other(p.g)]} ${p.n}`];
        rightArt = DEF[p.g];
        prompt = rng.pick([`Write "the ${p.en[0]}" in Spanish. Include *el* or *la*.`, `How do you say "the ${p.en[0]}" in Spanish? Include *el* or *la*.`]);
      } else if (mode === "indef") {
        accept = nouns.map((n) => `${INDEF[p.g]} ${n}`);
        wrongArt = [`${INDEF[other(p.g)]} ${p.n}`];
        rightArt = INDEF[p.g];
        prompt = `Write "a ${p.en[0]}" in Spanish. Include *un* or *una*.`;
      } else {
        accept = [`${DEF_PL[p.g]} ${p.pl}`];
        wrongArt = [`${DEF_PL[other(p.g)]} ${p.pl}`];
        rightArt = DEF_PL[p.g];
        prompt = `Write "the ${p.enPl[0]}" in Spanish. Include *los* or *las*.`;
      }
      const trapList = [
        {
          wrong: wrongArt,
          feedback:
            p.n === "catedral"
              ? `Gender detective: *catedral* is feminine even though it ends in *-al* — so *${rightArt}*.`
              : p.rule === "de"
                ? `The real place is *estación* — every *-ción* word is feminine, so *${rightArt}* (the label after *de* doesn't change that).`
                : `Gender check: *${p.n}* is ${genderWord(p.g)} (*${the(p)}*), so it takes *${rightArt}*.`,
        },
      ];
      if (p.n === "biblioteca") trapList.push({ wrong: ["la librería", "una librería", "las librerías"], feedback: "False friend! *La librería* is a bookshop. The library is *la biblioteca*." });
      return {
        prompt,
        answer: { type: "text", accept },
        solution: [`"${mode === "pl" ? p.enPl[0] : p.en[0]}" = *${mode === "pl" ? p.pl : p.n}*.`, `*${p.n}* is ${genderWord(p.g)} (*${the(p)}*), so: **${accept[0]}**.`],
        hint: "Gender detective: -o words are usually *el*, -a and -ción words are *la*; for -e or a consonant you just have to know it.",
        traps: makeTraps(accept, trapList),
      };
    },
  },

  // 3 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.hay-un-una`,
    topicId: TOPIC,
    title: "Hay un / una / unos / unas… (there is / there are)",
    level: 1,
    guideRef: "hay-un-una",
    generate(rng, tier) {
      const modes = tier === 1 ? (["a", "num"] as const) : (["a", "num", "some", "lots", "several"] as const);
      const mode = rng.pick(modes);
      // Only one per town (unique) or odd in large numbers (stations, cathedrals, stadiums): singular frames only.
      const rare = (p: Place) => p.unique || (mode !== "a" && mode !== "num" && (p.rule === "de" || ["catedral", "estadio"].includes(p.n)));
      const pool = (tier === 1 ? CORE : PLACES).filter((p) => mode === "a" || !rare(p));
      const p = rng.pick(pool);
      const NUMS = [["dos", "2", "two"], ["tres", "3", "three"], ["cuatro", "4", "four"], ["cinco", "5", "five"]];
      const num = rng.pick(NUMS);
      let cores: string[];
      let en: string;
      let wrong: string[] = [];
      let fb = "";
      let step: string;
      switch (mode) {
        case "a":
          cores = [`${INDEF[p.g]} ${p.n}`];
          en = `there is a ${p.en[0]}`;
          wrong = [`hay ${INDEF[other(p.g)]} ${p.n}`];
          fb = `*${p.n}* is ${genderWord(p.g)}, so it's *${INDEF[p.g]}*.`;
          step = `'a' + ${genderWord(p.g)} noun → *${INDEF[p.g]}*.`;
          break;
        case "num":
          cores = [`${num[0]} ${p.pl}`, `${num[1]} ${p.pl}`];
          en = `there are ${num[2]} ${p.enPl[0]}`;
          wrong = p.pl !== p.n ? [`hay ${num[0]} ${p.n}`, `hay ${num[1]} ${p.n}`] : [];
          fb = `More than one, so the place goes plural: *${p.pl}*.`;
          step = `Number + plural noun: *${num[0]} ${p.pl}* (${RULE_TEXT[p.rule]}).`;
          break;
        case "some":
          cores = [`${INDEF_PL[p.g]} ${p.pl}`];
          en = `there are some ${p.enPl[0]}`;
          wrong = [`hay ${INDEF_PL[other(p.g)]} ${p.pl}`];
          fb = `*${p.n}* is ${genderWord(p.g)}, so 'some' is *${INDEF_PL[p.g]}*.`;
          step = `'some' + ${genderWord(p.g)} plural → *${INDEF_PL[p.g]}*.`;
          break;
        case "lots":
          cores = [`${MUCHOS[p.g]} ${p.pl}`];
          en = `there are lots of ${p.enPl[0]}`;
          wrong = [`hay ${MUCHOS[other(p.g)]} ${p.pl}`, `hay mucho ${p.pl}`, `hay muy ${p.pl}`];
          fb = `*Mucho* agrees with the noun: ${genderWord(p.g)} plural → *${MUCHOS[p.g]}*. (*Muy* = very, never before a noun.)`;
          step = `'lots of' agrees: ${genderWord(p.g)} plural → *${MUCHOS[p.g]}*.`;
          break;
        default:
          cores = [`${VARIOS[p.g]} ${p.pl}`];
          en = `there are several ${p.enPl[0]}`;
          wrong = [`hay ${VARIOS[other(p.g)]} ${p.pl}`];
          fb = `*Varios* agrees: ${genderWord(p.g)} plural → *${VARIOS[p.g]}*.`;
          step = `'several' agrees: ${genderWord(p.g)} plural → *${VARIOS[p.g]}*.`;
      }
      let accept = cores.map((c) => `hay ${c}`);
      let english = cap(en);
      if (tier === 3 && rng.bool(0.6)) {
        const fr = rng.pick(FRAMES);
        english = `${fr.en}, ${en}`;
        accept = fr.es.flatMap((f) => cores.flatMap((c) => [`${f} hay ${c}`, `hay ${c} ${f}`]));
        wrong = wrong.flatMap((w) => fr.es.map((f) => `${f} ${w}`));
      }
      accept = accept.map(sent);
      const trapList = [{ wrong, feedback: fb }];
      if (mode === "a") trapList.push({ wrong: [`hay ${the(p)}`], feedback: "*Hay* introduces something new, so it takes *un/una*, never *el/la*. (For a known place use *está*: *El banco está en la plaza*.)" });
      return {
        prompt: `Translate into Spanish: "${english}."`,
        answer: { type: "text", accept },
        solution: ["'There is / there are' = *hay* — it never changes.", step, `**${accept[0]}**`],
        hint: "Find the gender first (el or la?), then decide: one, some, lots or a number?",
        traps: makeTraps(accept, trapList),
      };
    },
  },

  // 4 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.directions-meaning`,
    topicId: TOPIC,
    title: "Understanding directions (tú and usted)",
    level: 1,
    guideRef: "directions",
    generate(rng, tier) {
      let step: Step;
      let usted = false;
      if (tier === 3) {
        const a = rng.pick([STRAIGHT, CROSS_SQ, CROSS_BR, UP, DOWN]);
        const b = rng.pick([...turnSteps(), ...takeSteps(5)]);
        step = joinSteps(a, b);
        usted = rng.bool(0.3);
      } else {
        const pool = [STRAIGHT, CROSS_SQ, CROSS_BR, UP, DOWN, ...turnSteps(), ...takeSteps(tier === 1 ? 3 : 5)];
        step = rng.pick(pool);
        usted = tier === 2 && rng.bool(0.4);
      }
      const es = usted ? step.ud : step.tu[0];
      const prompt = rng.pick([`What does *${cap(es)}.* mean in English?`, `A Spaniard tells you: *${cap(es)}.* What should you do? Answer in English.`]);
      const accept = step.en;
      return {
        prompt,
        answer: { type: "text", accept },
        solution: [
          ...(usted ? [`This is the polite *usted* form (to an adult you don't know); a friend would hear *${step.tu[0]}*.`] : []),
          `${step.note[0].toUpperCase()}${step.note.slice(1)}.`,
          `**${cap(accept[0])}.**`,
        ],
        hint: "*Derecha* = right, *izquierda* = left; *calle* = street. Translate piece by piece.",
        traps: step.swapEn ? makeTraps(accept, [{ wrong: step.swapEn, feedback: "Left and right are swapped: *derecha* = right, *izquierda* = left." }]) : undefined,
      };
    },
  },

  // 5 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.place-plurals`,
    topicId: TOPIC,
    title: "Plurals of places (los parques, las estaciones…)",
    level: 2,
    guideRef: "hay-un-una",
    generate(rng, tier) {
      const pool = tier === 1 ? PLACES.filter((p) => p.rule === "vowel") : tier === 2 ? PLACES.filter((p) => !p.unique) : PLACES;
      const p = rng.pick(pool);
      const mode = tier === 3 ? rng.pick(["def", "indef", "hay"]) : rng.pick(["def", "indef"]);
      // Predictable wrong plurals (bare, without article).
      const naive: { w: string; fb: string }[] = [];
      if (p.rule === "consonant") naive.push({ w: `${p.n}s`, fb: `*${p.n}* ends in a consonant, so add *-es*: *${p.pl}*.` });
      if (p.rule === "two") {
        const [a, b] = p.pl.split(" ");
        const [sa, sb] = p.n.split(" ");
        naive.push({ w: `${a} ${sb}`, fb: `The adjective agrees too: **both** words go plural — *${p.pl}*.` });
        naive.push({ w: `${sa} ${b}`, fb: `The noun goes plural as well: *${p.pl}*.` });
      }
      if (p.rule === "de") {
        const label = p.n.split(" de ")[1];
        naive.push({ w: `estacions de ${label}`, fb: "*-ión* words add *-es*: *estaciones* (and the written accent disappears)." });
        if (label === "tren" || label === "metro") naive.push({ w: `estaciones de ${label === "tren" ? "trenes" : "metros"}`, fb: `Only the real place (*estación*) goes plural; the label after *de* stays as it is: *${p.pl}*.` });
      }
      let accept: string[];
      let prompt: string;
      let wrong: string[];
      if (mode === "def") {
        accept = [`${DEF_PL[p.g]} ${p.pl}`];
        wrong = naive.map((x) => `${DEF_PL[p.g]} ${x.w}`);
        prompt = rng.pick([`Make it plural (change the article too): *${the(p)}*`, `One → more than one. Write the plural of *${the(p)}*, with its article.`]);
      } else if (mode === "indef") {
        accept = [`${INDEF_PL[p.g]} ${p.pl}`];
        wrong = naive.map((x) => `${INDEF_PL[p.g]} ${x.w}`);
        prompt = `Make it plural (change the article too): *${INDEF[p.g]} ${p.n}*`;
      } else {
        accept = [p.pl];
        wrong = naive.map((x) => x.w);
        prompt = `Write the missing plural of *${the(p)}* (no article needed): *En mi ciudad hay dos ___.*`;
      }
      const artStep =
        mode === "def" ? `*${DEF[p.g]}* → *${DEF_PL[p.g]}*.` : mode === "indef" ? `*${INDEF[p.g]}* → *${INDEF_PL[p.g]}*.` : "After a number there's no article.";
      return {
        prompt,
        answer: { type: "text", accept },
        solution: [`*${p.n}*: ${RULE_TEXT[p.rule]} → *${p.pl}*.`, artStep, `**${accept[0]}**`],
        hint: "Look at the last letter: vowel → add -s; consonant → add -es. In a two-word place, which word is the real noun?",
        traps: makeTraps(accept, [
          ...naive.map((x, i) => ({ wrong: [wrong[i]], feedback: x.fb })),
          mode === "def"
            ? { wrong: [`${DEF[p.g]} ${p.pl}`, `${DEF_PL[other(p.g)]} ${p.pl}`], feedback: `Change the article too, keeping the gender: *${DEF[p.g]}* → *${DEF_PL[p.g]}*.` }
            : mode === "indef"
              ? { wrong: [`${INDEF[p.g]} ${p.pl}`, `${INDEF_PL[other(p.g)]} ${p.pl}`, `${DEF_PL[p.g]} ${p.pl}`], feedback: `'A' in the plural is 'some': *${INDEF[p.g]}* → *${INDEF_PL[p.g]}*.` }
              : { wrong: [`${DEF_PL[p.g]} ${p.pl}`], feedback: "After a number you don't need an article: *dos " + p.pl + "*." },
        ]),
      };
    },
  },

  // 6 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.no-hay`,
    topicId: TOPIC,
    title: "No hay… (there isn't / there aren't — no article)",
    level: 2,
    guideRef: "hay-un-una",
    generate(rng, tier) {
      const SG = ["cine", "piscina", "playa", "museo", "estadio", "teatro", "castillo", "polideportivo", "biblioteca", "hospital", "centro comercial", "mercado", "catedral", "estación de tren", "estación de metro", "farmacia", "librería", "iglesia"].map(byName);
      const PL = ["tienda", "restaurante", "parque", "museo", "cine", "banco"].map(byName);
      const plural = tier < 3 && rng.bool(0.3);
      const p = plural ? rng.pick(PL) : rng.pick(SG);
      const noun = plural ? p.pl : p.n;
      const cores = [`no hay ${noun}`, `no hay ${NINGUN[p.g]} ${p.n}`];
      let english = plural ? `There aren't any ${p.enPl[0]}` : `There isn't a ${p.en[0]}`;
      const wrongCore = plural ? `no hay ${INDEF_PL[p.g]} ${p.pl}` : `no hay ${INDEF[p.g]} ${p.n}`;
      let accept = cores;
      let wrong = [wrongCore];
      let hayNo = [`hay no ${noun}`];
      let extraStep = "";
      if (tier === 3) {
        // Contrast: There isn't a X, but there is a Y.
        const q = rng.pick(SG.filter((x) => x !== p));
        english = `There isn't a ${p.en[0]}, but there is a ${q.en[0]}`;
        const yes = `pero hay ${INDEF[q.g]} ${q.n}`;
        accept = cores.map((c) => `${c} ${yes}`);
        wrong = [`${wrongCore} ${yes}`];
        hayNo = [`hay no ${noun} ${yes}`];
        extraStep = `Then the contrast: *pero hay ${INDEF[q.g]} ${q.n}* — after plain *hay* the article comes back.`;
        if (rng.bool(0.5)) {
          const fr = rng.pick(FRAMES);
          english = `${fr.en}, there isn't a ${p.en[0]}, but there is a ${q.en[0]}`;
          accept = fr.es.flatMap((f) => accept.map((a) => `${f} ${a}`));
          wrong = fr.es.flatMap((f) => wrong.map((w) => `${f} ${w}`));
          hayNo = fr.es.flatMap((f) => hayNo.map((w) => `${f} ${w}`));
        }
      } else if (tier === 2 && rng.bool(0.5)) {
        const fr = rng.pick(FRAMES);
        english = `${fr.en}, ${english.charAt(0).toLowerCase()}${english.slice(1)}`;
        accept = fr.es.flatMap((f) => cores.flatMap((c) => [`${f} ${c}`, `${c} ${f}`]));
        wrong = fr.es.flatMap((f) => [`${f} ${wrongCore}`, `${wrongCore} ${f}`]);
        hayNo = fr.es.flatMap((f) => [`${f} hay no ${noun}`]);
      }
      accept = accept.map(sent);
      return {
        prompt: `Translate into Spanish: "${english}."`,
        answer: { type: "text", accept },
        solution: [
          "*No* goes in front of *hay*: *no hay*.",
          `After *no hay* drop the article: *no hay ${noun}* (or, stronger: *no hay ${NINGUN[p.g]} ${p.n}*).`,
          ...(extraStep ? [extraStep] : []),
          `**${accept[0]}**`,
        ],
        hint: "In a negative, Spanish says 'there isn't cinema' — no un/una.",
        traps: makeTraps(accept, [
          { wrong, feedback: "Drop the article after *no hay*: *no hay cine*, *no hay tiendas* — you're denying the whole category exists." },
          { wrong: hayNo, feedback: "*No* goes **before** the verb: *no hay*." },
        ]),
      };
    },
  },

  // 7 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.asking-the-way`,
    topicId: TOPIC,
    title: "Asking the way: ¿Dónde está…? / ¿Por dónde se va al / a la…?",
    level: 2,
    guideRef: "directions",
    generate(rng, tier) {
      const pool = PLACES.filter((p) => p.n !== "estación de metro");
      const p = rng.pick(tier === 1 ? CORE : pool);
      const art = DEF[p.g];
      const aWrong = `a ${art} ${p.n}`;
      if (tier === 1) {
        const frame = rng.pick(["va", "donde", "voy", "vamos"]);
        const gap = frame === "donde" ? art : p.g === "m" ? "al" : "a la";
        const sentence =
          frame === "va" ? `¿Por dónde se va ___ ${p.n}?` : frame === "donde" ? `¿Dónde está ___ ${p.n}?` : frame === "voy" ? `Voy ___ ${p.n} con mi madre.` : `El sábado vamos ___ ${p.n}.`;
        const trapList: { wrong: string[]; feedback: string }[] = [];
        if (frame === "donde") trapList.push({ wrong: [p.g === "m" ? "al" : "a la"], feedback: "No movement here — *está* just says where it is. You only need the article: *el* or *la*." });
        else {
          if (p.g === "m") trapList.push({ wrong: ["a el"], feedback: "*a + el* always squashes into **al**: *al " + p.n + "*." });
          trapList.push({ wrong: [p.g === "m" ? "a la" : "al"], feedback: `*${p.n}* is ${genderWord(p.g)} (*${the(p)}*), so it's *${gap}*.` });
          trapList.push({ wrong: [art], feedback: "You're going *to* the place, so you need *a*: " + (p.g === "m" ? "*a + el = al*." : "*a la*.") });
        }
        return {
          prompt: `Fill the gap with *el*, *la*, *al* or *a la*: *${sentence}*`,
          answer: { type: "text", accept: [gap] },
          solution: [
            `*${p.n}* is ${genderWord(p.g)}: *${the(p)}*.`,
            frame === "donde" ? "*Está* = is (located) — no 'to', so just the article." : `Going *to* a place needs *a*${p.g === "m" ? ": *a + el = al*" : ": *a + la* doesn't contract"}.`,
            `**${gap}**`,
          ],
          hint: "Is there movement towards the place (to)? Then you need *a*. Is the place el or la?",
          traps: makeTraps([gap], trapList),
        };
      }
      const kind = rng.pick(tier === 3 ? ["polite", "polite", "go"] : ["how", "where", "go"]);
      let accept: string[];
      let english: string;
      let steps: string[];
      let trapList: { wrong: string[]; feedback: string }[];
      if (kind === "how" || kind === "polite") {
        const core = [`por dónde se va ${toThe(p)}`, `cómo se va ${toThe(p)}`];
        if (kind === "how") {
          english = `How do I get to the ${p.en[0]}?`;
          accept = core.map(ask);
          trapList = [{ wrong: [`por dónde se va ${aWrong}`], feedback: "*a + el* must contract to *al*." }];
          if (p.g === "f") trapList = [{ wrong: [`por dónde se va al ${p.n}`], feedback: `*${p.n}* is feminine — *a la ${p.n}*. Only *a + el* contracts.` }];
        } else {
          const adult = rng.bool();
          const pol = adult ? ["perdone", "disculpe"] : ["perdona", "disculpa"];
          english = `Excuse me (to ${adult ? "an adult you don't know" : "a teenager"}), how do I get to the ${p.en[0]}?`;
          accept = pol.flatMap((x) => core.map((c) => `${cap(x)}, ¿${c}?`));
          trapList = [
            { wrong: [`${adult ? "perdona" : "perdone"} por dónde se va ${toThe(p)}`], feedback: adult ? "To an adult you don't know, use the polite *usted* form: *perdone*." : "To a young person use the *tú* form: *perdona*." },
            { wrong: pol.map((x) => `${x} por dónde se va ${aWrong}`), feedback: "Contract it: *a + el = al*." },
          ];
        }
        steps = [`'How do I get to…?' = *¿Por dónde se va…?* (literally 'which way does one go').`, `*a* + *${the(p)}* → *${toThe(p)}*.`, `**${accept[0]}**`];
      } else if (kind === "where") {
        const pl = rng.bool(0.3) && !p.unique;
        if (pl) {
          english = `Where are the ${p.enPl[0]}?`;
          accept = [ask(`dónde están ${DEF_PL[p.g]} ${p.pl}`)];
          trapList = [{ wrong: [`dónde está ${DEF_PL[p.g]} ${p.pl}`], feedback: "Plural places → plural verb: *están*." }, { wrong: [`dónde son ${DEF_PL[p.g]} ${p.pl}`], feedback: "Location always uses *estar*: *¿Dónde están…?*" }];
          steps = ["Location → *estar*; plural → *están*.", `**${accept[0]}**`];
        } else {
          english = `Where is the ${p.en[0]}?`;
          accept = [ask(`dónde está ${the(p)}`)];
          trapList = [{ wrong: [`dónde es ${the(p)}`], feedback: "Location always uses *estar*: *¿Dónde está…?*" }, { wrong: [`dónde está ${DEF[other(p.g)]} ${p.n}`], feedback: `*${p.n}* is ${genderWord(p.g)}: *${the(p)}*.` }];
          steps = ["Location → *estar*: *está*.", `*${p.n}* is ${genderWord(p.g)} → *${the(p)}*.`, `**${accept[0]}**`];
        }
      } else {
        const who = rng.pick([
          { p: "yo" as Person, en: "I'm going" },
          { p: "nosotros" as Person, en: "We're going" },
          { p: "ellos" as Person, en: "They're going" },
          { p: "él" as Person, en: "My sister is going", subj: "mi hermana" },
          { p: "él" as Person, en: "My brother is going", subj: "mi hermano" },
        ]);
        const forms = who.subj ? [`${who.subj} ${conjugate("ir", "present", "él")}`] : acceptedForms("ir", "present", who.p);
        const when = rng.pick([{ en: "", es: "" }, { en: " on Saturday", es: "el sábado" }, { en: " today", es: "hoy" }]);
        english = `${who.en} to the ${p.en[0]}${when.en}.`;
        accept = forms.flatMap((f) => (when.es ? [`${f} ${toThe(p)} ${when.es}`, `${when.es} ${f} ${toThe(p)}`] : [`${f} ${toThe(p)}`])).map(sent);
        const f0 = forms[0];
        trapList = [
          { wrong: [`${f0} ${aWrong}${when.es ? " " + when.es : ""}`], feedback: "*a + el* must contract to *al*." },
          { wrong: [`${f0} ${the(p)}${when.es ? " " + when.es : ""}`], feedback: `Going *to* a place needs *a*: *${f0} ${toThe(p)}*.` },
        ];
        if (p.g === "f") trapList[0] = { wrong: [`${f0} al ${p.n}${when.es ? " " + when.es : ""}`], feedback: `*${p.n}* is feminine — *a la*. Only *a + el* contracts.` };
        steps = [`*ir* (to go) → *${conjugate("ir", "present", who.p)}*.`, `to the → *a* + *${the(p)}* = *${toThe(p)}*.`, `**${accept[0]}**`];
      }
      return {
        prompt: `Write in Spanish: "${english}"`,
        answer: { type: "text", accept },
        solution: steps,
        hint: "Movement to a place = *a*; *a + el* = *al*. Location = *está*.",
        traps: makeTraps(accept, trapList),
      };
    },
  },

  // 8 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.giving-directions`,
    topicId: TOPIC,
    title: "Giving directions (tú): sigue, gira, toma la… calle",
    level: 2,
    guideRef: "directions",
    generate(rng, tier) {
      const HASTA = [
        { es: "la plaza", en: "the square" },
        { es: "el puente", en: "the bridge" },
        { es: "el semáforo", en: "the traffic lights" },
        { es: "el final de la calle", en: "the end of the street" },
        { es: "la iglesia", en: "the church" },
        { es: "el cine", en: "the cinema" },
      ];
      let step: Step;
      let hastaMasc = "";
      if (tier === 3) {
        const a = rng.pick([STRAIGHT, CROSS_SQ, CROSS_BR, UP, DOWN]);
        const b = rng.pick([...turnSteps().filter((s) => s.tu[0].startsWith(GIRA)), ...takeSteps(5)]);
        step = joinSteps(a, b);
      } else {
        const r = rng.next();
        if (tier === 2 && r < 0.25) {
          const h = rng.pick(HASTA);
          step = {
            tu: [`${SIGUE} todo recto hasta ${h.es}`, `${SIGUE} recto hasta ${h.es}`],
            ud: `siga todo recto hasta ${h.es}`,
            en: [`Go straight on as far as ${h.en}`],
            note: `*${SIGUE} todo recto* = go straight on; *hasta* = as far as — and *hasta* never takes *a*`,
          };
          if (h.es.startsWith("el ")) hastaMasc = `${SIGUE} todo recto hasta al ${h.es.slice(3)}`;
        } else {
          const pool = [STRAIGHT, CROSS_SQ, CROSS_BR, UP, DOWN, ...turnSteps().filter((s) => s.tu[0].startsWith(GIRA)), ...takeSteps(tier === 1 ? 3 : 5)];
          step = rng.pick(pool);
        }
      }
      // Accept gira / tuerce for every turn.
      const withTuerce = (xs: string[]) => uniq(xs.flatMap((x) => [x, x.replace(new RegExp(`\\b${GIRA} a la`, "g"), `${TUERCE} a la`)]));
      const accept = withTuerce(step.tu).map(sent);
      const english = cap(step.en[0]);
      const trapList: { wrong: string[]; feedback: string }[] = [];
      if (step.swapTu) trapList.push({ wrong: [step.swapTu], feedback: "Left and right are swapped: right = *derecha*, left = *izquierda*." });
      const ordMatch = step.tu[0].match(/la (primera|segunda|tercera|cuarta|quinta) calle/);
      if (ordMatch) {
        const i = ORD_F.indexOf(ordMatch[1]);
        trapList.push({ wrong: [step.tu[0].replace(`la ${ORD_F[i]} calle`, `la ${ORD_M_LONG[i]} calle`)], feedback: `*Calle* is feminine, so the ordinal agrees: *la ${ORD_F[i]} calle*.` });
      }
      if (hastaMasc) trapList.push({ wrong: [hastaMasc], feedback: "*Hasta* already means 'as far as' — no *a* after it: *hasta el…*" });
      trapList.push({ wrong: [step.ud], feedback: "That's the polite *usted* form (for an adult stranger). To a friend use *tú*: the command looks like the *él/ella* present tense." });
      return {
        prompt: rng.pick([`Tell a friend the way in Spanish (use *tú*): "${english}."`, `Your friend Pablo asks you the way. Say in Spanish (*tú* form): "${english}."`]),
        answer: { type: "text", accept },
        solution: [`${step.note.charAt(0).toUpperCase()}${step.note.slice(1)}.`, "The *tú* command looks just like the *él/ella* present: *sigue, gira, toma, cruza*.", `**${accept[0]}**`],
        hint: "Right = *derecha*, left = *izquierda*; *calle* is feminine, so 'second' = *segunda*.",
        traps: makeTraps(accept, trapList),
      };
    },
  },

  // 9 ─────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.ordinals`,
    topicId: TOPIC,
    title: "Ordinals that agree: la primera calle, el primer semáforo",
    level: 2,
    guideRef: "directions",
    generate(rng, tier) {
      const FR = [
        { g: "f" as G, gap: (s: Side) => `Toma la ___ calle a la ${s}.`, en: (o: string, s: Side) => `Take the ${o} street on the ${SIDE_EN[s]}.`, noun: "calle" },
        { g: "f" as G, gap: (s: Side) => `${cap(GIRA)} a la ${s} en la ___ esquina.`, en: (o: string, s: Side) => `Turn ${SIDE_EN[s]} at the ${o} corner.`, noun: "esquina" },
        { g: "f" as G, gap: () => `${cap(SIGUE)} todo recto hasta la ___ plaza.`, en: (o: string) => `Go straight on as far as the ${o} square.`, noun: "plaza" },
        { g: "m" as G, gap: (s: Side) => `${cap(GIRA)} a la ${s} en el ___ semáforo.`, en: (o: string, s: Side) => `Turn ${SIDE_EN[s]} at the ${o} traffic lights.`, noun: "semáforo" },
        { g: "m" as G, gap: () => `${cap(CRUZA)} el ___ puente.`, en: (o: string) => `Cross the ${o} bridge.`, noun: "puente" },
      ];
      const frames = tier === 1 ? FR.filter((f) => f.g === "f") : FR;
      const fr = rng.pick(frames);
      const maxOrd = tier === 1 ? 3 : tier === 2 ? 4 : 5;
      // Bias towards 1st and 3rd for masculine nouns (the tricky short forms).
      const i = fr.g === "m" && rng.bool(0.5) ? rng.pick([0, 2]) : rng.int(0, maxOrd - 1);
      const s = rng.pick(["derecha", "izquierda"] as Side[]);
      const ord = fr.g === "m" ? ORD_M[i] : ORD_F[i];
      const enOrd = ORD_EN[i][0];
      const trapList: { wrong: string[]; feedback: string }[] = [];
      const fullTranslate = tier === 3 && fr.g === "m" && rng.bool(0.5);
      if (fullTranslate) {
        const accept = (
          fr.noun === "semáforo"
            ? [GIRA, TUERCE].flatMap((v) => [`${v} a la ${s} en el ${ord} semáforo`, `en el ${ord} semáforo ${v} a la ${s}`])
            : [`${CRUZA} el ${ord} puente`]
        ).map(sent);
        const base = fr.noun === "semáforo" ? `${GIRA} a la ${s} en el ` : `${CRUZA} el `;
        trapList.push({ wrong: [`${base}${ORD_M_LONG[i]} ${fr.noun}`], feedback: `Before a masculine singular noun *primero* → *primer* and *tercero* → *tercer*.` });
        trapList.push({ wrong: [`${base}${ORD_F[i]} ${fr.noun}`], feedback: `*${fr.noun}* is masculine (*el ${fr.noun}*), so the ordinal is masculine: *${ord}*.` });
        return {
          prompt: `Tell a friend in Spanish (use *tú*): "${fr.en(enOrd, s)}"`,
          answer: { type: "text", accept },
          solution: [
            `*${fr.noun}* is masculine: *el ${fr.noun}*${fr.noun === "semáforo" ? " (one *semáforo* = a set of traffic lights)" : ""}.`,
            `${enOrd} + masculine singular noun → *${ord}*${i === 0 || i === 2 ? ` (the *-o* of *${ORD_M_LONG[i]}* drops)` : ""}.`,
            `**${accept[0]}**`,
          ],
          hint: "Is the noun el or la? *Primero* and *tercero* shorten right before a masculine singular noun.",
          traps: makeTraps(accept, trapList),
        };
      }
      const gap = fr.gap(s);
      if (fr.g === "m") {
        trapList.push({ wrong: [ORD_F[i]], feedback: `*${fr.noun}* is masculine (*el ${fr.noun}*), so: *${ord}*.` });
        if (ORD_M_LONG[i] !== ord) trapList.push({ wrong: [ORD_M_LONG[i]], feedback: `Right gender — but right before a masculine singular noun *${ORD_M_LONG[i]}* drops its *-o*: *el ${ord} ${fr.noun}*.` });
      } else {
        trapList.push({ wrong: [ORD_M_LONG[i]], feedback: `*${fr.noun}* is feminine (*la ${fr.noun}*), so the ordinal ends in *-a*: *${ord}*.` });
        if (ORD_M[i] !== ORD_M_LONG[i]) trapList.push({ wrong: [ORD_M[i]], feedback: `The short form *${ORD_M[i]}* is only for masculine nouns. With *la ${fr.noun}*: *${ord}*.` });
      }
      return {
        prompt: rng.pick([
          `Fill the gap with the Spanish for **${enOrd}** (make it agree): *${gap}*`,
          `"${fr.en(enOrd, s)}" — complete the Spanish: *${gap}*`,
        ]),
        answer: { type: "text", accept: [ord] },
        solution: [
          `*${fr.noun}* is ${genderWord(fr.g)}: *${DEF[fr.g]} ${fr.noun}*.`,
          fr.g === "m" && (i === 0 || i === 2) ? `${enOrd} = *${ORD_M_LONG[i]}*, which shortens to *${ord}* right before a masculine singular noun.` : `${enOrd} + ${genderWord(fr.g)} noun → *${ord}*.`,
          `**${ord}**`,
        ],
        hint: "Ordinals are adjectives — check whether the noun is el or la.",
        traps: makeTraps([ord], trapList),
      };
    },
  },

  // 10 ────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.location-phrases`,
    topicId: TOPIC,
    title: "Where is it? al lado del…, enfrente de la…",
    level: 2,
    guideRef: "location-and-distance",
    generate(rng, tier) {
      const PREPS = [
        { stem: "al lado", en: "next to" },
        { stem: "enfrente", en: "opposite" },
        { stem: "cerca", en: "near" },
        { stem: "lejos", en: "far from" },
        { stem: "delante", en: "in front of" },
        { stem: "detrás", en: "behind" },
      ];
      const pool = PLACES.filter((p) => p.n !== "estación de metro");
      const subj = rng.pick(tier === 1 ? CORE : pool);
      const obj = rng.pick((tier === 1 ? CORE : pool).filter((p) => p !== subj));
      const prep = rng.pick(PREPS);
      const prepForms = (o: Place) => {
        const base = [`${prep.stem} ${ofThe(o)}`];
        if (prep.stem === "enfrente") base.push(`en frente ${ofThe(o)}`, `frente ${toThe(o)}`);
        return base;
      };
      if (tier === 1) {
        const gap = obj.g === "m" ? "del" : "de la";
        const sentence = `${cap(the(subj))} está ${prep.stem} ___ ${obj.n}.`;
        const trapList = obj.g === "m"
          ? [{ wrong: ["de el"], feedback: "*de + el* always squashes into **del**." }, { wrong: ["de la"], feedback: `*${obj.n}* is masculine (*${the(obj)}*): *de + el = del*.` }]
          : [{ wrong: ["del"], feedback: `*${obj.n}* is feminine (*${the(obj)}*). Only *de + el* contracts, so: *de la*.` }];
        return {
          prompt: `Fill the gap with *del* or *de la* ("${prep.en} the ${obj.en[0]}"): *${sentence}*`,
          answer: { type: "text", accept: [gap] },
          solution: [`*${prep.stem} de* = ${prep.en}.`, `*${obj.n}* is ${genderWord(obj.g)}: *de* + *${DEF[obj.g]}* → *${gap}*.`, `**${gap}**`],
          hint: "Is the place el or la? *de + el* becomes *del*; *de la* never changes.",
          traps: makeTraps([gap], trapList),
        };
      }
      let english: string;
      let accept: string[];
      const trapList: { wrong: string[]; feedback: string }[] = [];
      let steps: string[];
      const pluralSubj = tier === 3 && rng.bool(0.4);
      if (tier === 3 && !pluralSubj && rng.bool(0.4)) {
        // entre … y …
        const third = rng.pick(pool.filter((p) => p !== subj && p !== obj));
        english = `The ${subj.en[0]} is between the ${obj.en[0]} and the ${third.en[0]}.`;
        accept = [sent(`${the(subj)} está entre ${the(obj)} y ${the(third)}`)];
        trapList.push({ wrong: [`${the(subj)} es entre ${the(obj)} y ${the(third)}`], feedback: "Location always uses *estar*: *está*." });
        trapList.push({ wrong: [`${the(subj)} está entre ${ofThe(obj)} y ${ofThe(third)}`], feedback: "*Entre* never takes *de*: *entre el… y la…*" });
        steps = ["Location → *está*.", "*entre … y …* = between … and … (no *de*).", `**${accept[0]}**`];
      } else {
        const S = pluralSubj ? rng.pick(["tienda", "restaurante", "banco", "parque"].map(byName).filter((p) => p !== obj)) : subj;
        const sEs = pluralSubj ? `${DEF_PL[S.g]} ${S.pl}` : the(S);
        const verb = pluralSubj ? "están" : "está";
        english = `${cap(pluralSubj ? `the ${S.enPl[0]} are` : `the ${S.en[0]} is`)} ${prep.en} the ${obj.en[0]}.`;
        accept = prepForms(obj).map((pf) => sent(`${sEs} ${verb} ${pf}`));
        if (obj.g === "m") trapList.push({ wrong: [`${sEs} ${verb} ${prep.stem} de el ${obj.n}`], feedback: "*de + el* must contract to *del*." });
        trapList.push(
          pluralSubj
            ? { wrong: [`${sEs} está ${prep.stem} ${ofThe(obj)}`], feedback: `The subject is plural (*${sEs}*), so the verb is *están*.` }
            : { wrong: [`${sEs} es ${prep.stem} ${ofThe(obj)}`], feedback: "Location always uses *estar*, never *ser*: *está*." },
        );
        steps = [
          `Location → *estar*: *${verb}*.`,
          `${prep.en} = *${prep.stem} de*; *de* + *${the(obj)}* → *${ofThe(obj)}*.`,
          `**${accept[0]}**`,
        ];
      }
      return {
        prompt: `Translate into Spanish: "${english}"`,
        answer: { type: "text", accept },
        solution: steps,
        hint: "Where something is → *está/están*. Then watch for *de + el = del*.",
        traps: makeTraps(accept, trapList),
      };
    },
  },

  // 11 ────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.how-far`,
    topicId: TOPIC,
    title: "How far? Está cerca / lejos / a cinco minutos a pie",
    level: 2,
    guideRef: "location-and-distance",
    generate(rng, tier) {
      const NUM = [
        ["cinco", "5", "five"],
        ["diez", "10", "ten"],
        ["quince", "15", "fifteen"],
        ["veinte", "20", "twenty"],
        ["veinticinco", "25", "twenty-five"],
        ["treinta", "30", "thirty"],
      ];
      const MODES = [
        { en: "on foot", es: ["a pie", "andando"] },
        { en: "by car", es: ["en coche"] },
        { en: "by bus", es: ["en autobús"] },
        { en: "by metro", es: ["en metro"] },
        { en: "by train", es: ["en tren"] },
        { en: "by bike", es: ["en bici", "en bicicleta"] },
      ];
      const n = rng.pick(NUM);
      const m = rng.pick(MODES);
      const p = rng.pick(PLACES.filter((x) => x.rule !== "de"));
      const dist = (pre: string) => [n[0], n[1]].flatMap((num) => m.es.map((mo) => `${pre}a ${num} minutos ${mo}`));
      const kind = tier === 1 ? rng.pick(["it", "it", "near"]) : tier === 2 ? rng.pick(["place", "place", "near"]) : rng.pick(["notfar", "question"]);
      let english: string;
      let accept: string[];
      const trapList: { wrong: string[]; feedback: string }[] = [];
      let steps: string[];
      const distTraps = (pre: string) => {
        trapList.push({ wrong: [`${pre}${n[0]} minutos ${m.es[0]}`], feedback: "Put *a* before the distance: *está a cinco minutos* = it's five minutes away." });
        if (m.en === "on foot") trapList.push({ wrong: [`${pre}a ${n[0]} minutos en pie`], feedback: "On foot = *a pie* (or *andando*); *en* is for vehicles: *en coche, en autobús*." });
        else trapList.push({ wrong: [`${pre}a ${n[0]} minutos ${m.es[0].replace(/^en /, "a ")}`], feedback: "Vehicles take *en*: *en coche, en autobús, en metro*. Only walking is *a pie*." });
      };
      if (kind === "near") {
        const far = rng.bool();
        const very = rng.bool();
        const subjEn = tier === 2 ? `The ${p.en[0]} is` : "It's";
        english = `${subjEn} ${very ? "very " : ""}${far ? "far" : "near"}.`;
        const pre = tier === 2 ? `${the(p)} ` : "";
        const word = far ? "lejos" : "cerca";
        accept = [sent(`${pre}está ${very ? "muy " : ""}${word}`)];
        trapList.push({ wrong: [`${pre}está ${very ? "muy " : ""}${word} de`], feedback: `With nothing after it, *${word}* drops the *de*: *está ${word}*.` });
        trapList.push({ wrong: [`${pre}es ${very ? "muy " : ""}${word}`], feedback: "Location and distance use *estar*: *está*." });
        steps = ["Location/distance → *está*.", `${far ? "far" : "near"} = *${word}* (no *de* when nothing follows).`, `**${accept[0]}**`];
      } else if (kind === "it") {
        english = `It's ${n[2]} minutes away ${m.en}.`;
        accept = dist("está ").map(sent);
        distTraps("está ");
        trapList.push({ wrong: [`es a ${n[0]} minutos ${m.es[0]}`], feedback: "Distance uses *estar*: *está a…*" });
        steps = ["'It's … away' = *está a* + distance.", `${m.en} = *${m.es[0]}*.`, `**${accept[0]}**`];
      } else if (kind === "place") {
        english = `The ${p.en[0]} is ${n[2]} minutes away ${m.en}.`;
        accept = dist(`${the(p)} está `).map(sent);
        distTraps(`${the(p)} está `);
        steps = [`*${the(p)}* + *está a* + distance.`, `${m.en} = *${m.es[0]}*.`, `**${accept[0]}**`];
      } else if (kind === "notfar") {
        english = `The ${p.en[0]} isn't far: it's ${n[2]} minutes away ${m.en}.`;
        accept = dist(`${the(p)} no está lejos está `).map(sent);
        distTraps(`${the(p)} no está lejos está `);
        steps = ["*no* before the verb: *no está lejos*.", `Then the distance: *está a ${n[0]} minutos ${m.es[0]}*.`, `**${accept[0]}**`];
      } else {
        english = `Is the ${p.en[0]} far? — No, it's ${n[2]} minutes away ${m.en}.`;
        const qs = [`¿Está lejos ${the(p)}?`, `¿${cap(the(p))} está lejos?`];
        accept = qs.flatMap((q) => dist("está ").map((d) => `${q} No, ${d}.`));
        trapList.push({ wrong: [`¿Es lejos ${the(p)}? No, es a ${n[0]} minutos ${m.es[0]}`], feedback: "Location and distance use *estar*: *¿Está lejos…? No, está a…*" });
        trapList.push({ wrong: [`¿Está lejos ${the(p)}? No, está ${n[0]} minutos ${m.es[0]}`], feedback: "Put *a* before the distance: *está a cinco minutos*." });
        steps = [`*¿Está lejos ${the(p)}?* — a question can keep statement word order; just add ¿…?`, `*No, está a ${n[0]} minutos ${m.es[0]}.*`];
      }
      return {
        prompt: `Translate into Spanish: "${english}"`,
        answer: { type: "text", accept },
        solution: steps,
        hint: "Distance uses *estar* + *a*: *está a diez minutos*. Walking = *a pie*; vehicles = *en*.",
        traps: makeTraps(accept, trapList),
      };
    },
  },

  // 12 ────────────────────────────────────────────────────────────────────
  {
    id: `${TOPIC}.se-puede`,
    topicId: TOPIC,
    title: "Se puede + infinitive: what you can do in town",
    level: 3,
    guideRef: "what-you-can-do",
    generate(rng, tier) {
      if (tier === 1) {
        const a = rng.pick(ACTS);
        const p = byName(a.place);
        const accept = actEs(a);
        return {
          prompt: rng.pick([
            `Complete with the Spanish for "${a.en[0]}": *En ${the(p)} se puede ___.*`,
            `What can you do there? Fill the gap ("${a.en[0]}"): *En ${the(p)} se puede ___.*`,
          ]),
          answer: { type: "text", accept },
          solution: ["*Se puede* + **infinitive** (the two-verb rule: only the first verb changes).", `"${a.en[0]}" = *${accept[0]}*.`, `**En ${the(p)} se puede ${accept[0]}.**`],
          hint: "After *se puede* the next verb stays as the infinitive (-ar, -er, -ir).",
          traps: makeTraps(accept, [{ wrong: [actWrong(a)], feedback: `After *se puede* keep the infinitive: *${a.inf}*, not *${conjugate(a.inf, "present", "él")}*.` }]),
        };
      }
      const kind = tier === 2 ? "plain" : rng.pick(["donde", "donde", "neg"]);
      if (kind === "neg") {
        const a = rng.pick(NEG_ACTS);
        const p = byName(a.place);
        const accept = actEs(a).flatMap((x) => [`no se puede ${x} en ${the(p)}`, `en ${the(p)} no se puede ${x}`]).map(sent);
        return {
          prompt: `Write the sign in Spanish using *se puede*: "You can't ${a.en[0]} in the ${p.en[0]}."`,
          answer: { type: "text", accept },
          solution: ["'You can't' (in general) = *no se puede*.", `+ infinitive: *${actEs(a)[0]}*; + place: *en ${the(p)}*.`, `**${accept[0]}**`],
          hint: "*No* goes right at the front: *no se puede* + infinitive.",
          traps: makeTraps(accept, [
            { wrong: [`se no puede ${actEs(a)[0]} en ${the(p)}`, `en ${the(p)} se no puede ${actEs(a)[0]}`], feedback: "*No* goes before *se*: *no se puede*." },
            { wrong: [`no se puede ${actWrong(a)} en ${the(p)}`, `en ${the(p)} no se puede ${actWrong(a)}`], feedback: `Keep the infinitive after *se puede*: *${a.inf}*.` },
          ]),
        };
      }
      const a = rng.pick(ACTS);
      const p = byName(a.place);
      const es = actEs(a);
      if (kind === "plain") {
        const accept = es.flatMap((x) => [`en ${the(p)} se puede ${x}`, `se puede ${x} en ${the(p)}`]).map(sent);
        return {
          prompt: rng.pick([`Translate using *se puede*: "In the ${p.en[0]} you can ${a.en[0]}."`, `Say what you can do there, using *se puede*: "In the ${p.en[0]} you can ${a.en[0]}."`]),
          answer: { type: "text", accept },
          solution: [`'you can' (anyone can) = *se ${PUEDE}*.`, `+ infinitive: *${es[0]}*.`, `**${accept[0]}**`],
          hint: "General 'you can' = *se puede*; then an infinitive.",
          traps: makeTraps(accept, [
            { wrong: [`en ${the(p)} se puede ${actWrong(a)}`, `se puede ${actWrong(a)} en ${the(p)}`], feedback: `After *se puede* keep the infinitive: *${a.inf}*.` },
            { wrong: [`en ${the(p)} puedes ${es[0]}`, `puedes ${es[0]} en ${the(p)}`], feedback: "*Puedes* is fine Spanish for 'you personally can' — but this task asks for the general *se puede*." },
          ]),
        };
      }
      const fr = rng.pick(FRAMES);
      const accept = fr.es.flatMap((f) => es.map((x) => `${f} hay ${INDEF[p.g]} ${p.n} donde se puede ${x}`)).map(sent);
      return {
        prompt: `Translate: "${fr.en} there is a ${p.en[0]} where you can ${a.en[0]}."`,
        answer: { type: "text", accept },
        solution: [`*${fr.es[0]} hay ${INDEF[p.g]} ${p.n}* (there is a…).`, "Join with *donde* (no accent — it isn't a question).", `*donde se puede ${es[0]}*.`, `**${accept[0]}**`],
        hint: "Build it up: *hay* + un/una + place, then *donde se puede* + infinitive.",
        traps: makeTraps(accept, [
          { wrong: [`${fr.es[0]} hay ${INDEF[p.g]} ${p.n} se puede ${es[0]}`], feedback: "Join the two ideas with *donde* (where): *…donde se puede…*" },
          { wrong: [`${fr.es[0]} hay ${INDEF[p.g]} ${p.n} donde se puede ${actWrong(a)}`], feedback: `Keep the infinitive after *se puede*: *${a.inf}*.` },
        ]),
      };
    },
  },
];

