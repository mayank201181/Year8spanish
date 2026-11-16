// Procedural skill drills for topic "mi-dormitorio" (furniture, where things are,
// hay vs está, colours and possessives, describing my room).
import type { Drill, DrillItem, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import { acceptedForms, conjugate, type Person, type Tense } from "../spanish/verbs.ts";
import { normSpanish, stripAccents } from "../answerCheck.ts";

const TOPIC = "mi-dormitorio";

// ---------------------------------------------------------------------------
// Small typed lexicon
// ---------------------------------------------------------------------------

type G = "m" | "f";

interface Noun {
  es: string;
  g: G;
  pl: string;
  en: string[];
  enPl: string[];
  /** Core furniture list taught first. */
  core: boolean;
  /** Plural accent behaviour, for the solution text. */
  accent?: "drop" | "keep";
  /** Has a flat top you can put things on. */
  flat?: boolean;
  /** You can put things under it. */
  under?: boolean;
  /** Things can be "in" it. */
  container?: boolean;
  /** Can be coloured / owned sensibly. */
  thing?: boolean;
}

function N(es: string, g: G, pl: string, en: string[], enPl: string[], opts: Partial<Noun> = {}): Noun {
  return { es, g, pl, en, enPl, core: false, thing: true, ...opts };
}

const NOUNS: Noun[] = [
  N("cama", "f", "camas", ["bed"], ["beds"], { core: true, flat: true, under: true }),
  N("litera", "f", "literas", ["bunk bed", "bunk"], ["bunk beds", "bunks"], { flat: true, under: true }),
  N("armario", "m", "armarios", ["wardrobe", "closet", "cupboard"], ["wardrobes", "closets", "cupboards"], { core: true, container: true, flat: true }),
  N("escritorio", "m", "escritorios", ["desk"], ["desks"], { core: true, flat: true, under: true }),
  N("silla", "f", "sillas", ["chair"], ["chairs"], { core: true, flat: true, under: true }),
  N("estantería", "f", "estanterías", ["bookcase", "shelves", "shelf", "bookshelf", "shelving unit"], ["bookcases", "shelves", "bookshelves", "shelving units"], { core: true, flat: true }),
  N("lámpara", "f", "lámparas", ["lamp"], ["lamps"], { core: true }),
  N("alfombra", "f", "alfombras", ["rug", "carpet", "mat"], ["rugs", "carpets", "mats"], { core: true }),
  N("cómoda", "f", "cómodas", ["chest of drawers"], ["chests of drawers"], { core: true, flat: true }),
  N("mesita de noche", "f", "mesitas de noche", ["bedside table", "nightstand", "night table", "bedside cabinet"], ["bedside tables", "nightstands", "night tables", "bedside cabinets"], { core: true, flat: true }),
  N("mesa", "f", "mesas", ["table"], ["tables"], { core: true, flat: true, under: true }),
  N("sofá", "m", "sofás", ["sofa", "couch", "settee"], ["sofas", "couches", "settees"], { core: true, flat: true }),
  N("espejo", "m", "espejos", ["mirror"], ["mirrors"], { core: true }),
  N("televisión", "f", "televisiones", ["television", "TV", "telly", "television set"], ["televisions", "TVs", "tellies", "television sets"], { core: true, accent: "drop" }),
  N("ordenador", "m", "ordenadores", ["computer", "PC"], ["computers", "PCs"], { core: true }),
  N("cortina", "f", "cortinas", ["curtain"], ["curtains"], { core: true }),
  N("póster", "m", "pósteres", ["poster"], ["posters"], { core: true, accent: "keep" }),
  N("ventana", "f", "ventanas", ["window"], ["windows"], { core: true, thing: false }),
  N("puerta", "f", "puertas", ["door"], ["doors"], { core: true }),
  N("cajón", "m", "cajones", ["drawer"], ["drawers"], { accent: "drop", container: true }),
  N("cojín", "m", "cojines", ["cushion"], ["cushions"], { accent: "drop" }),
  N("almohada", "f", "almohadas", ["pillow"], ["pillows"]),
  N("reloj", "m", "relojes", ["clock", "watch"], ["clocks", "watches"]),
  N("libro", "m", "libros", ["book"], ["books"]),
  N("planta", "f", "plantas", ["plant"], ["plants"]),
  N("móvil", "m", "móviles", ["mobile phone", "mobile", "phone", "cell phone"], ["mobile phones", "mobiles", "phones", "cell phones"], { accent: "keep" }),
  N("portátil", "m", "portátiles", ["laptop", "laptop computer"], ["laptops", "laptop computers"], { accent: "keep" }),
  N("consola", "f", "consolas", ["games console", "console", "game console"], ["games consoles", "consoles", "game consoles"]),
  N("ventilador", "m", "ventiladores", ["fan", "electric fan"], ["fans", "electric fans"]),
  N("pared", "f", "paredes", ["wall"], ["walls"]),
  N("peluche", "m", "peluches", ["soft toy", "cuddly toy", "stuffed toy", "teddy"], ["soft toys", "cuddly toys", "stuffed toys", "teddies"]),
  N("persiana", "f", "persianas", ["blind", "roller blind", "shutter"], ["blinds", "roller blinds", "shutters"]),
];

const byEs = (es: string): Noun => {
  const n = NOUNS.find((x) => x.es === es);
  if (!n) throw new Error(`unknown noun ${es}`);
  return n;
};

const CORE = NOUNS.filter((n) => n.core);
const THINGS = NOUNS.filter((n) => n.thing);

interface Colour {
  en: string;
  ms: string;
  fs: string;
  mp: string;
  fp: string;
  kind: "o" | "e" | "cons" | "fixed";
  /** Also-accepted plural (rosas, naranjas). */
  plAlt?: string;
}

const C = (en: string, ms: string, fs: string, mp: string, fp: string, kind: Colour["kind"], plAlt?: string): Colour => ({ en, ms, fs, mp, fp, kind, plAlt });

const COLOURS: Colour[] = [
  C("red", "rojo", "roja", "rojos", "rojas", "o"),
  C("yellow", "amarillo", "amarilla", "amarillos", "amarillas", "o"),
  C("white", "blanco", "blanca", "blancos", "blancas", "o"),
  C("black", "negro", "negra", "negros", "negras", "o"),
  C("purple", "morado", "morada", "morados", "moradas", "o"),
  C("green", "verde", "verde", "verdes", "verdes", "e"),
  C("blue", "azul", "azul", "azules", "azules", "cons"),
  C("grey", "gris", "gris", "grises", "grises", "cons"),
  C("brown", "marrón", "marrón", "marrones", "marrones", "cons"),
  C("orange", "naranja", "naranja", "naranja", "naranja", "fixed", "naranjas"),
  C("pink", "rosa", "rosa", "rosa", "rosa", "fixed", "rosas"),
];
const O_COLOURS = COLOURS.filter((c) => c.kind === "o");

function colourForm(c: Colour, g: G, pl: boolean): string {
  return pl ? (g === "m" ? c.mp : c.fp) : g === "m" ? c.ms : c.fs;
}
function colourForms(c: Colour, g: G, pl: boolean): string[] {
  const f = colourForm(c, g, pl);
  return pl && c.plAlt ? [f, c.plAlt] : [f];
}
function colourRule(c: Colour, g: G, pl: boolean): string {
  const gn = `${g === "m" ? "masculine" : "feminine"} ${pl ? "plural" : "singular"}`;
  switch (c.kind) {
    case "o":
      return `*${c.ms}* ends in *-o*, so it has four forms (*${c.ms}, ${c.fs}, ${c.mp}, ${c.fp}*); ${gn} → **${colourForm(c, g, pl)}**.`;
    case "e":
      return `*${c.ms}* ends in *-e*, so it doesn't change for gender — only add *-s* for plural; ${gn} → **${colourForm(c, g, pl)}**.`;
    case "cons":
      return c.ms === "marrón"
        ? `*marrón* ends in a consonant: no feminine form; plural adds *-es* and the accent drops (*marrones*); ${gn} → **${colourForm(c, g, pl)}**.`
        : `*${c.ms}* ends in a consonant, so it doesn't change for gender — plural adds *-es*; ${gn} → **${colourForm(c, g, pl)}**.`;
    case "fixed":
      return `*${c.ms}* is really a noun (${c.ms === "rosa" ? "a rose" : "an orange"}), so it usually stays the same: **${c.ms}**${pl ? ` (you'll also see *${c.plAlt}*)` : ""}.`;
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const DEF: Record<G, [string, string]> = { m: ["el", "los"], f: ["la", "las"] };
const INDEF: Record<G, [string, string]> = { m: ["un", "unos"], f: ["una", "unas"] };

function word(n: Noun, pl: boolean): string {
  return pl ? n.pl : n.es;
}
/** Every accepted spelling of the noun itself (televisión ↔ tele). */
function words(n: Noun, pl: boolean): string[] {
  const w = [word(n, pl)];
  if (n.es === "televisión") w.push(pl ? "teles" : "tele");
  return w;
}
function def(n: Noun, pl = false): string {
  return `${DEF[n.g][pl ? 1 : 0]} ${word(n, pl)}`;
}
function defs(n: Noun, pl = false): string[] {
  return words(n, pl).map((w) => `${DEF[n.g][pl ? 1 : 0]} ${w}`);
}
function indef(n: Noun, pl = false): string {
  return `${INDEF[n.g][pl ? 1 : 0]} ${word(n, pl)}`;
}
function indefs(n: Noun, pl = false): string[] {
  return words(n, pl).map((w) => `${INDEF[n.g][pl ? 1 : 0]} ${w}`);
}
const gName = (g: G) => (g === "m" ? "masculine" : "feminine");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const aAn = (w: string) => (/^[aeiou]/i.test(w) ? `an ${w}` : `a ${w}`);

/** Join a preposition ending in "de" to a noun phrase, contracting de + el = del. */
function withDe(prep: string, phrase: string): string {
  if ((prep === "de" || prep.endsWith(" de")) && phrase.startsWith("el ")) {
    return `${prep.slice(0, -2)}del ${phrase.slice(3)}`.trim();
  }
  return `${prep} ${phrase}`;
}

function uniq(xs: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const x of xs) {
    const k = normSpanish(x);
    if (!seen.has(k)) {
      seen.add(k);
      out.push(x);
    }
  }
  return out;
}

/**
 * Build an item: deduplicate accepted answers and drop any trap that would be
 * accepted, or that differs from an accepted answer only by accents.
 */
function item(
  prompt: string,
  accept: string[],
  solution: string[],
  hint: string,
  rawTraps: { wrong: string[]; feedback: string }[] = [],
  diagram?: string,
): DrillItem {
  const acc = uniq(accept);
  const bare = new Set(acc.map((a) => stripAccents(normSpanish(a))));
  const traps: Trap[] = [];
  for (const t of rawTraps) {
    const wrong = uniq(t.wrong).filter((w) => !bare.has(stripAccents(normSpanish(w))));
    if (wrong.length) traps.push({ spec: { type: "text", accept: wrong }, feedback: t.feedback });
  }
  const out: DrillItem = { prompt, answer: { type: "text", accept: acc }, solution, hint };
  if (traps.length) out.traps = traps.slice(0, 2);
  if (diagram) out.diagram = diagram;
  return out;
}

function pluralRule(n: Noun): string {
  if (n.es === "mesita de noche") return "Only the first noun changes: *mesita* → *mesitas*; *de noche* stays the same.";
  const last = n.es.slice(-1);
  if (/[aeiouáéíóú]/.test(last)) return `*${n.es}* ends in a vowel → add *-s*: *${n.pl}*.`;
  const base = `*${n.es}* ends in a consonant → add *-es*: *${n.pl}*.`;
  if (n.accent === "drop") return `${base} The written accent drops, because the stress now falls naturally on the second-to-last syllable.`;
  if (n.accent === "keep") return `${base} The accent stays: the stress is still three syllables from the end.`;
  return base;
}

// English helpers for nouns
function enThe(n: Noun, pl: boolean): string[] {
  const list = pl ? n.enPl : n.en;
  return list.flatMap((w) => [w, `the ${w}`]);
}

// ---------------------------------------------------------------------------
// Picture drill (prepositions) — SVG builder with honest geometry
// ---------------------------------------------------------------------------

type Subj = "pelota" | "pelotas" | "gato";
const SUBJ: Record<Subj, { es: string; en: string; pl: boolean }> = {
  pelota: { es: "la pelota", en: "the ball", pl: false },
  pelotas: { es: "las pelotas", en: "the two balls", pl: true },
  gato: { es: "el gato", en: "the cat", pl: false },
};

function subjSvg(s: Subj, cx: number, by: number): string {
  const st = 'stroke="#1f2937" stroke-width="1.5"';
  if (s === "pelota") return `<circle cx="${cx}" cy="${by - 10}" r="10" fill="#fecaca" ${st}/>`;
  if (s === "pelotas") return `<circle cx="${cx - 10}" cy="${by - 9}" r="9" fill="#fecaca" ${st}/><circle cx="${cx + 10}" cy="${by - 9}" r="9" fill="#fecaca" ${st}/>`;
  return (
    `<path d="M${cx - 12} ${by - 8} Q${cx - 24} ${by - 14} ${cx - 20} ${by - 26}" fill="none" ${st}/>` +
    `<ellipse cx="${cx}" cy="${by - 8}" rx="13" ry="8" fill="#e5e7eb" ${st}/>` +
    `<polygon points="${cx + 5},${by - 22} ${cx + 7},${by - 31} ${cx + 11},${by - 25}" fill="#e5e7eb" ${st}/>` +
    `<polygon points="${cx + 12},${by - 25} ${cx + 16},${by - 31} ${cx + 18},${by - 22}" fill="#e5e7eb" ${st}/>` +
    `<circle cx="${cx + 11}" cy="${by - 18}" r="7" fill="#e5e7eb" ${st}/>`
  );
}

function legged(x1: number, x2: number): string {
  return (
    `<rect x="${x1}" y="92" width="${x2 - x1}" height="8" fill="#fde68a" stroke="#1f2937"/>` +
    `<rect x="${x1 + 4}" y="100" width="6" height="50" fill="#fde68a" stroke="#1f2937"/>` +
    `<rect x="${x2 - 10}" y="100" width="6" height="50" fill="#fde68a" stroke="#1f2937"/>`
  );
}
function solid(x1: number, x2: number): string {
  return `<rect x="${x1}" y="70" width="${x2 - x1}" height="80" rx="3" fill="#c7d2fe" stroke="#1f2937"/>`;
}
function label(x: number, text: string): string {
  return `<text x="${x}" y="176" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">${text}</text>`;
}

type Pos = "encima" | "debajo" | "derecha" | "izquierda" | "delante" | "detras" | "entre";
const POS_EN: Record<Pos, string> = {
  encima: "on top of",
  debajo: "under",
  derecha: "to the right of (as you look at it)",
  izquierda: "to the left of (as you look at it)",
  delante: "in front of",
  detras: "behind",
  entre: "between",
};

function pictureSvg(s: Subj, pos: Pos, a: Noun, b: Noun | null): string {
  const base = `<rect x="0" y="0" width="320" height="182" fill="#ffffff"/><rect x="0" y="150" width="320" height="32" fill="#f1f5f9"/><line x1="0" y1="150" x2="320" y2="150" stroke="#334155" stroke-width="1.5"/>`;
  const who = SUBJ[s].en.replace(/^the /, "");
  let body = "";
  let aria = "";
  if (pos === "entre" && b) {
    body = solid(30, 120) + solid(200, 290) + subjSvg(s, 160, 150) + label(75, def(a)) + label(245, def(b));
    aria = `A picture of ${who} between two pieces of furniture labelled ${def(a)} on the left and ${def(b)} on the right`;
  } else {
    const isLegged = !!a.under;
    let furn = isLegged ? legged(110, 210) : solid(115, 205);
    if (a.es === "cama") furn += `<rect x="110" y="66" width="8" height="26" fill="#fde68a" stroke="#1f2937"/><rect x="122" y="84" width="24" height="8" rx="3" fill="#ffffff" stroke="#1f2937"/>`;
    if (a.es === "silla") furn += `<rect x="202" y="56" width="8" height="36" fill="#fde68a" stroke="#1f2937"/>`;
    const spot: Record<Exclude<Pos, "entre">, [number, number]> = {
      encima: [160, isLegged ? 92 : 70],
      debajo: [160, 150],
      derecha: [244, 150],
      izquierda: [74, 150],
      delante: [160, 162],
      detras: [160, s === "gato" ? 82 : 74],
    };
    const [cx, by] = spot[pos as Exclude<Pos, "entre">];
    const subj = subjSvg(s, cx, by);
    body = (pos === "detras" ? subj + furn : furn + subj) + label(160, def(a));
    aria = `A picture of ${who} ${POS_EN[pos]} a piece of furniture labelled ${def(a)}`;
  }
  return `<svg viewBox="0 0 320 182" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">${base}${body}</svg>`;
}

// ---------------------------------------------------------------------------
// Prepositions for sentence building
// ---------------------------------------------------------------------------

interface Prep {
  en: string;
  es: string[];
  need?: "flat" | "under" | "container";
  tier: 1 | 2 | 3;
}
const PREPS: Prep[] = [
  { en: "on top of", es: ["encima de"], need: "flat", tier: 1 },
  { en: "on", es: ["encima de", "en"], need: "flat", tier: 2 },
  { en: "under", es: ["debajo de"], need: "under", tier: 1 },
  { en: "next to", es: ["al lado de"], tier: 1 },
  { en: "in front of", es: ["delante de"], tier: 2 },
  { en: "behind", es: ["detrás de"], tier: 2 },
  { en: "near", es: ["cerca de"], tier: 2 },
  { en: "far from", es: ["lejos de"], tier: 3 },
  { en: "opposite", es: ["enfrente de"], tier: 3 },
  { en: "in", es: ["en"], need: "container", tier: 2 },
  { en: "to the right of", es: ["a la derecha de"], tier: 3 },
  { en: "to the left of", es: ["a la izquierda de"], tier: 3 },
];
/** Small things that can sit on / under / in furniture. */
const SMALL = ["lámpara", "móvil", "reloj", "libro", "planta", "peluche", "consola", "portátil", "cojín", "almohada"].map(byEs);
const PLACES = ["cama", "armario", "escritorio", "estantería", "cómoda", "mesita de noche", "mesa", "sofá", "ventana", "puerta", "silla", "cajón"].map(byEs);

function placeFits(p: Prep, n: Noun): boolean {
  if (n.es === "cajón" && p.need !== "container") return false;
  if (p.need === "flat") return !!n.flat;
  if (p.need === "under") return !!n.under;
  if (p.need === "container") return !!n.container;
  return true;
}

function pickPrepPlace(rng: Rng, tier: 1 | 2 | 3, avoid?: Noun): { p: Prep; place: Noun } {
  const preps = PREPS.filter((p) => p.tier <= tier);
  for (let i = 0; i < 50; i++) {
    const p = rng.pick(preps);
    const place = rng.pick(PLACES);
    if (place !== avoid && placeFits(p, place)) return { p, place };
  }
  return { p: PREPS[3], place: byEs("cama") };
}

// ---------------------------------------------------------------------------
// Possessives
// ---------------------------------------------------------------------------

interface Owner {
  en: string;
  note?: string;
  forms: Record<G, [string, string]>;
  tier: 1 | 2 | 3;
}
const OWNERS: Owner[] = [
  { en: "my", forms: { m: ["mi", "mis"], f: ["mi", "mis"] }, tier: 1 },
  { en: "your", note: " (*your* = *tú*, one friend)", forms: { m: ["tu", "tus"], f: ["tu", "tus"] }, tier: 1 },
  { en: "his", forms: { m: ["su", "sus"], f: ["su", "sus"] }, tier: 2 },
  { en: "her", forms: { m: ["su", "sus"], f: ["su", "sus"] }, tier: 2 },
  { en: "their", forms: { m: ["su", "sus"], f: ["su", "sus"] }, tier: 2 },
  { en: "our", forms: { m: ["nuestro", "nuestros"], f: ["nuestra", "nuestras"] }, tier: 2 },
  { en: "your", note: " (*your* = *vosotros*, several friends)", forms: { m: ["vuestro", "vuestros"], f: ["vuestra", "vuestras"] }, tier: 3 },
];

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

const FALSE_FRIENDS: Record<string, { wrong: string[]; feedback: string }> = {
  cómoda: { wrong: ["comfortable", "the comfortable"], feedback: "Careful: the adjective *cómodo/cómoda* means comfortable, but the noun *la cómoda* is a chest of drawers." },
  armario: { wrong: ["armchair", "the armchair"], feedback: "An armchair is *un sillón*. *El armario* is a wardrobe — think 'armour' for your clothes." },
  cajón: { wrong: ["box", "the box"], feedback: "A box is *una caja*. *El cajón* is a drawer — the box-shaped part that slides out." },
  escritorio: { wrong: ["writer", "the writer"], feedback: "A writer is *un escritor*. *El escritorio* is the desk where you write (*escribir*)." },
  mesa: { wrong: ["desk", "the desk"], feedback: "A desk is *el escritorio*. *La mesa* is a table." },
  ordenador: { wrong: ["order", "the order", "organiser", "the organiser"], feedback: "*El ordenador* is a computer — it 'puts data in order'." },
};

export const drills: Drill[] = [
  // 1 ---------------------------------------------------------------- es → en
  {
    id: `${TOPIC}.furniture-es-en`,
    topicId: TOPIC,
    title: "Bedroom vocabulary: Spanish → English",
    level: 1,
    guideRef: "furniture",
    generate(rng, tier) {
      const n = rng.pick(tier === 1 ? CORE : NOUNS);
      const mode = tier === 1 ? "def" : tier === 2 ? rng.pick(["def", "indef"] as const) : rng.pick(["defPl", "indefPl", "indef"] as const);
      const pl = mode === "defPl" || mode === "indefPl";
      const es = mode === "def" || mode === "defPl" ? def(n, pl) : indef(n, pl);
      const list = pl ? n.enPl : n.en;
      let accept: string[];
      if (mode === "def" || mode === "defPl") accept = enThe(n, pl);
      else if (mode === "indef") accept = list.flatMap((w) => [aAn(w), w, `one ${w}`]);
      else accept = list.flatMap((w) => [`some ${w}`, w]);
      const shown = mode === "indefPl" ? `some ${list[0]}` : mode === "indef" ? aAn(list[0]) : `the ${list[0]}`;
      accept = [shown, ...accept];
      const tpl = rng.int(0, 2);
      const prompt =
        tpl === 0 ? `Translate into English: *${es}*` : tpl === 1 ? `What does *${es}* mean in English?` : `You see *${es}* in a description of a bedroom. What is it in English?`;
      const ff = FALSE_FRIENDS[n.es];
      return item(
        prompt,
        accept,
        [
          `*${n.es}* is ${gName(n.g)} (*${DEF[n.g][0]} ${n.es}*)${pl ? `; here it's plural: *${n.pl}*` : ""}.`,
          `*${es}* = **${shown}**${list.length > 1 ? ` (also: ${list.slice(1).join(", ")})` : ""}.`,
        ],
        mode.startsWith("indef") ? "*Un/una* = a; *unos/unas* = some." : "Picture the bedroom — which object is it? Look for a cognate.",
        ff ? [ff] : [],
      );
    },
  },
  // 2 ---------------------------------------------------------------- en → es
  {
    id: `${TOPIC}.furniture-en-es`,
    topicId: TOPIC,
    title: "Bedroom vocabulary: English → Spanish with el/la/un/una",
    level: 1,
    guideRef: "furniture",
    generate(rng, tier) {
      const n = rng.pick(tier === 1 ? CORE : NOUNS);
      const mode = tier === 1 ? "def" : tier === 2 ? rng.pick(["def", "indef"] as const) : rng.pick(["defPl", "indefPl"] as const);
      const pl = mode === "defPl" || mode === "indefPl";
      const isDef = mode === "def" || mode === "defPl";
      const enW = (pl ? n.enPl : n.en)[0];
      const enPhrase = isDef ? `the ${enW}` : pl ? `some ${enW}` : aAn(enW);
      const accept = isDef ? defs(n, pl) : indefs(n, pl);
      const which = isDef ? (pl ? "*los/las*" : "*el/la*") : pl ? "*unos/unas*" : "*un/una*";
      const other: G = n.g === "m" ? "f" : "m";
      const wrongArt = (isDef ? DEF : INDEF)[other][pl ? 1 : 0];
      const traps = [
        {
          wrong: words(n, pl).map((w) => `${wrongArt} ${w}`),
          feedback:
            n.es === "sofá"
              ? "*Sofá* ends in *-a* but it's masculine: *el sofá, los sofás*."
              : `Gender detective: *${n.es}* is ${gName(n.g)} — *${DEF[n.g][0]} ${n.es}*.`,
        },
      ];
      if (pl && !/[aeiouáéíóú]$/.test(n.es) && n.es !== "mesita de noche") {
        traps.push({ wrong: [`${(isDef ? DEF : INDEF)[n.g][1]} ${stripAccents(n.es)}s`, `${(isDef ? DEF : INDEF)[n.g][1]} ${n.es}s`], feedback: `*${n.es}* ends in a consonant, so the plural adds *-es*: *${n.pl}*.` });
      }
      return item(
        `Write in Spanish: *${enPhrase}*. Include ${which}.`,
        accept,
        [
          `'${enW}' = *${word(n, pl)}*${pl ? ` (singular *${n.es}*)` : ""}.`,
          `*${n.es}* is ${gName(n.g)}${n.es === "sofá" ? " — the odd one out, even though it ends in *-a*" : ""}.`,
          `→ **${accept[0]}**`,
        ],
        "Gender detective: -o and -or words are usually masculine; -a and -ión words usually feminine.",
        traps,
      );
    },
  },
  // 3 ---------------------------------------------------------------- plurals
  {
    id: `${TOPIC}.plurals`,
    topicId: TOPIC,
    title: "Make it plural: el armario → los armarios",
    level: 1,
    guideRef: "furniture",
    generate(rng, tier) {
      const vowelNouns = NOUNS.filter((n) => /[aeiouáéíóú]$/.test(n.es) && n.es !== "mesita de noche");
      const consNouns = NOUNS.filter((n) => !/[aeiouáéíóú]$/.test(n.es) || n.es === "mesita de noche" || n.es === "sofá");
      if (tier < 3) {
        const n = rng.pick(tier === 1 ? vowelNouns : consNouns);
        const useDef = tier === 1 || rng.bool();
        const sg = useDef ? def(n) : indef(n);
        const accept = useDef ? defs(n, true) : indefs(n, true);
        const art = (useDef ? DEF : INDEF)[n.g][1];
        const traps: { wrong: string[]; feedback: string }[] = [];
        if (n.es === "mesita de noche") traps.push({ wrong: [`${art} mesitas de noches`, `${art} mesita de noches`], feedback: "Only the first noun changes: *mesitas de noche*." });
        else if (!/[aeiouáéíóú]$/.test(n.es)) traps.push({ wrong: [`${art} ${n.es}s`, `${art} ${stripAccents(n.es)}s`], feedback: `*${n.es}* ends in a consonant — add *-es*, not just *-s*.` });
        traps.push({ wrong: [`${useDef ? DEF[n.g][0] : INDEF[n.g][0]} ${n.pl}`], feedback: `The article must be plural too: *${useDef ? DEF[n.g][0] : INDEF[n.g][0]}* → *${art}*.` });
        return item(
          `Make it plural: *${sg}*`,
          accept,
          [`Article: *${useDef ? DEF[n.g][0] : INDEF[n.g][0]}* → *${art}*.`, pluralRule(n), `→ **${accept[0]}**`],
          "Does the noun end in a vowel or a consonant?",
          traps,
        );
      }
      // tier 3: whole phrase with a colour or possessive
      const n = rng.pick(THINGS);
      const c = rng.pick(COLOURS);
      const detKind = rng.pick(["def", "indef", "mi", "nuestro"] as const);
      const det = (pl: boolean): string =>
        detKind === "def" ? DEF[n.g][pl ? 1 : 0] : detKind === "indef" ? INDEF[n.g][pl ? 1 : 0] : detKind === "mi" ? (pl ? "mis" : "mi") : n.g === "m" ? (pl ? "nuestros" : "nuestro") : pl ? "nuestras" : "nuestra";
      const sg = `${det(false)} ${n.es} ${colourForm(c, n.g, false)}`;
      const accept = words(n, true).flatMap((w) => colourForms(c, n.g, true).map((cf) => `${det(true)} ${w} ${cf}`));
      const traps = [];
      if (colourForm(c, n.g, false) !== colourForm(c, n.g, true)) traps.push({ wrong: [`${det(true)} ${n.pl} ${colourForm(c, n.g, false)}`], feedback: "The colour must agree too — make it plural." });
      traps.push({ wrong: [`${det(false)} ${n.pl} ${colourForm(c, n.g, true)}`], feedback: `The little word in front must be plural too: *${det(false)}* → *${det(true)}*.` });
      return item(
        `Make the whole phrase plural: *${sg}*`,
        accept,
        [`*${det(false)}* → *${det(true)}*.`, pluralRule(n), colourRule(c, n.g, true), `→ **${accept[0]}**`],
        "Three words, three changes (unless the colour is one that never changes).",
        traps,
      );
    },
  },
  // 4 ---------------------------------------------------------------- de + el = del
  {
    id: `${TOPIC}.de-el-del`,
    topicId: TOPIC,
    title: "de + el = del: al lado del armario",
    level: 1,
    guideRef: "prepositions-of-place",
    generate(rng, tier) {
      const subjects = ["La lámpara está", "El gato está", "Mis libros están", "La pelota está", "El móvil está", "Mis zapatillas están", "El póster está", "La planta está"];
      if (tier < 3) {
        const preps = tier === 1 ? ["al lado", "encima", "debajo"] : ["al lado", "encima", "debajo", "delante", "detrás", "cerca", "lejos", "enfrente", "a la derecha", "a la izquierda"];
        const prep = rng.pick(preps);
        const places = PLACES.filter((p) => p.es !== "cajón" && (prep === "encima" ? p.flat : prep === "debajo" ? p.under : true));
        const plPlaces = ["cortina", "ventana", "estantería", "libro", "cojín", "silla", "ventilador"].map(byEs);
        const pl = tier === 2 && rng.bool(0.3) && prep !== "encima" && prep !== "debajo";
        const n = rng.pick(pl ? plPlaces : places);
        const ans = pl ? (n.g === "m" ? "de los" : "de las") : n.g === "m" ? "del" : "de la";
        const traps: { wrong: string[]; feedback: string }[] = [];
        if (ans === "del") traps.push({ wrong: ["de el"], feedback: "*De + el* always squeezes into one word: **del**." });
        else traps.push({ wrong: ["del"], feedback: `Only *de + el* contracts. *${word(n, pl)}* is ${gName(n.g)}${pl ? " plural" : ""} → *${ans}*.` });
        if (ans === "de los") traps.push({ wrong: ["de el", "dels"], feedback: "Plural → *de los*. *Del* is only for *el* (one masculine thing)." });
        else if (ans !== "del") traps.push({ wrong: ["de el"], feedback: `*${word(n, pl)}* is ${gName(n.g)}${pl ? " plural" : ""} → *${ans}*.` });
        return item(
          `Fill the gap with *del*, *de la*, *de los* or *de las*: *${rng.pick(subjects)} ${prep} ___ ${word(n, pl)}.*`,
          [ans],
          [
            `*${word(n, pl)}* → *${DEF[n.g][pl ? 1 : 0]} ${word(n, pl)}* (${gName(n.g)} ${pl ? "plural" : "singular"}).`,
            ans === "del" ? "*de + el* → **del**." : `*de + ${DEF[n.g][pl ? 1 : 0]}* never changes → **${ans}**.`,
          ],
          "Gender detective first: el, la, los or las? Then remember only de + el merges.",
          traps,
        );
      }
      // tier 3: write the whole place phrase
      if (rng.bool(0.25)) {
        const [a, b] = rng.shuffle(PLACES.filter((p) => p.es !== "cajón")).slice(0, 2);
        const enA = `the ${a.en[0]}`, enB = `the ${b.en[0]}`;
        const ans = `entre ${def(a)} y ${def(b)}`;
        return item(
          `Write in Spanish: *between ${enA} and ${enB}*`,
          [ans],
          ["'between … and …' = *entre … y …* — no *de* after *entre*.", `*${a.es}* → *${def(a)}*; *${b.es}* → *${def(b)}*.`, `→ **${ans}**`],
          "Does *entre* need *de*?",
          [{ wrong: [`entre de ${def(a)} y ${def(b)}`, `entre ${withDe("de", def(a))} y ${def(b)}`], feedback: "*Entre* is the one place word with no *de*: *entre la cama y el armario*." }],
        );
      }
      const { p, place } = pickPrepPlace(rng, 3);
      const accept = p.es.map((e) => withDe(e, def(place)));
      const unc = p.es.filter((e) => e.endsWith("de")).map((e) => `${e} ${def(place)}`);
      return item(
        `Write in Spanish: *${p.en} the ${place.en[0]}*`,
        accept,
        [
          `'${p.en}' = *${p.es[0]}*.`,
          `'the ${place.en[0]}' = *${def(place)}*.`,
          place.g === "m" && p.es[0].endsWith("de") ? `*de + el* → *del*: **${accept[0]}**` : `No contraction needed: **${accept[0]}**`,
        ],
        "Check the gender of the place: if it's *el*, then *de + el* = *del*.",
        place.g === "m" ? [{ wrong: unc, feedback: "*De + el* always merges into **del**." }] : [{ wrong: p.es.filter((e) => e.endsWith("de")).map((e) => `${e.slice(0, -2)}del ${place.es}`), feedback: `*${place.es}* is feminine → *de la*. Only *de + el* contracts.` }],
      );
    },
  },
  // 5 ---------------------------------------------------------------- picture
  {
    id: `${TOPIC}.where-is-it-picture`,
    topicId: TOPIC,
    title: "Where is it? Describe the picture",
    level: 2,
    guideRef: "prepositions-of-place",
    generate(rng, tier) {
      const LEGGED = ["mesa", "escritorio", "cama", "mesita de noche", "silla"].map(byEs);
      const SOLID = ["armario", "cómoda", "sofá", "estantería"].map(byEs);
      const s = rng.pick(["pelota", "pelotas", "gato"] as const);
      const subj = SUBJ[s];
      const verb = subj.pl ? "están" : "está";
      const usesEntre = tier >= 2 && rng.bool(0.2);
      let pos: Pos;
      let a: Noun;
      let b: Noun | null = null;
      if (usesEntre) {
        [a, b] = rng.shuffle(SOLID).slice(0, 2);
        pos = "entre";
      } else if (tier === 1) {
        a = rng.pick([...LEGGED, ...SOLID]);
        pos = a.under ? rng.pick(["encima", "debajo", "derecha", "izquierda"] as const) : rng.pick(["derecha", "izquierda"] as const);
      } else {
        a = rng.pick([...LEGGED, ...SOLID]);
        pos = a.under ? rng.pick(["encima", "debajo", "derecha", "izquierda"] as const) : rng.pick(["delante", "detras", "derecha", "izquierda"] as const);
      }
      const A = def(a);
      const strictSide = tier === 3 && (pos === "derecha" || pos === "izquierda");
      let phrases: string[];
      const traps: { wrong: string[]; feedback: string }[] = [];
      let rule: string;
      switch (pos) {
        case "encima":
          phrases = [withDe("encima de", A), `en ${A}`];
          rule = "It's sitting on top → *encima de* (or simply *en*).";
          traps.push({ wrong: [withDe("debajo de", A)], feedback: "*Debajo de* = under. Look again: it's on top." });
          break;
        case "debajo":
          phrases = [withDe("debajo de", A)];
          rule = "It's underneath → *debajo de*.";
          traps.push({ wrong: [withDe("encima de", A), `en ${A}`], feedback: "*Encima de* = on top of. Look again: it's underneath." });
          break;
        case "delante":
          phrases = [withDe("delante de", A)];
          rule = "It's nearer to you than the furniture and covers part of it → *delante de* (in front of).";
          traps.push({ wrong: [withDe("detrás de", A)], feedback: "*Detrás de* = behind. Here it hides part of the furniture, so it's in front." });
          break;
        case "detras":
          phrases = [withDe("detrás de", A)];
          rule = "The furniture hides most of it → *detrás de* (behind).";
          traps.push({ wrong: [withDe("delante de", A)], feedback: "*Delante de* = in front of. Here the furniture hides it, so it's behind." });
          break;
        case "entre":
          phrases = [`entre ${A} y ${def(b!)}`, `entre ${def(b!)} y ${A}`];
          rule = "It's in the middle of two things → *entre … y …* (no *de*).";
          traps.push({ wrong: [`entre de ${A} y ${def(b!)}`, `entre ${withDe("de", A)} y ${def(b!)}`], feedback: "*Entre* takes no *de*: *entre la cama y el armario*." });
          break;
        default: {
          const side = pos === "derecha" ? "a la derecha de" : "a la izquierda de";
          const otherSide = pos === "derecha" ? "a la izquierda de" : "a la derecha de";
          phrases = strictSide ? [withDe(side, A)] : [withDe("al lado de", A), withDe(side, A), withDe("cerca de", A)];
          rule = strictSide
            ? `It's on the ${pos === "derecha" ? "right" : "left"} as you look → *${side}*.`
            : `It's beside the furniture → *al lado de* (or more exactly *${side}*).`;
          if (strictSide) traps.push({ wrong: [withDe("al lado de", A), withDe("cerca de", A)], feedback: "True — but the question asks you to say which side: *a la derecha de* or *a la izquierda de*." });
          traps.push({ wrong: [withDe(otherSide, A)], feedback: "Other side! *Derecha* = right, *izquierda* = left (as you look at the picture)." });
        }
      }
      const accept = phrases.flatMap((ph) => [ph, `${verb} ${ph}`, `${subj.es} ${verb} ${ph}`]);
      const bracket = b ? `${A} / ${def(b)}` : A;
      const contr = a.g === "m" && pos !== "entre";
      return item(
        `Look at the picture. Complete the sentence: *${cap(subj.es)} ${verb} ___ (${bracket}).*${strictSide ? " Say which side, as you look at the picture." : ""}`,
        accept,
        [rule, contr ? `*${A}* is masculine → *de + el* = *del*.` : pos === "entre" ? "Keep both articles: *el/la* each time." : `*${A}* → *de ${A}* (no contraction with *la*).`, `→ **${cap(subj.es)} ${verb} ${phrases[0]}.**`],
        "First decide the position word, then check the gender of the furniture (del or de la?).",
        traps,
        pictureSvg(s, pos, a, b),
      );
    },
  },
  // 6 ---------------------------------------------------------------- hay / está / están
  {
    id: `${TOPIC}.hay-or-esta`,
    topicId: TOPIC,
    title: "Hay, está or están?",
    level: 2,
    guideRef: "hay-vs-esta",
    generate(rng, tier) {
      const loc = (avoid?: Noun) => {
        const { p, place } = pickPrepPlace(rng, Math.min(tier, 2) as 1 | 2, avoid);
        return withDe(p.es[0], def(place));
      };
      const n = rng.pick(THINGS.filter((x) => x.es !== "pared"));
      if (tier === 3 && rng.bool(0.6)) {
        const pl = rng.bool();
        const v = pl ? "están" : "está";
        const nums = ["dos", "tres", "cuatro"];
        const first = pl ? `${rng.pick(["unos", "unas", ...nums].filter((x) => !x.startsWith("un") || x === INDEF[n.g][1]))} ${n.pl}` : indef(n);
        const second = pl ? `${cap(DEF[n.g][1])} ${n.pl}` : `${cap(def(n))}`;
        const ans = `hay, ${v}`;
        return item(
          `Fill both gaps with *hay*, *está* or *están*. Write both words, separated by a comma: *En mi dormitorio ___ ${first}. ${second} ___ ${loc(n)}.*`,
          [ans],
          [
            `First gap: introducing something new (*${first.split(" ")[0]}*) → **hay**.`,
            `Second gap: now it's a known thing (*${DEF[n.g][pl ? 1 : 0]}*) and we say where → *estar*; ${pl ? "plural → **están**" : "one thing → **está**"}.`,
          ],
          "New thing with un/una/a number → hay. Known thing (el/la) + where → está/están.",
          [
            { wrong: [`${v}, hay`, `${v}, ${v}`], feedback: "The first sentence introduces something new (with *un/una* or a number) → *hay*." },
            { wrong: ["hay, hay", `hay, ${pl ? "está" : "están"}`], feedback: `Second sentence: a known thing + where it is → *estar*, ${pl ? "plural → *están*" : "one thing → *está*"}.` },
          ],
        );
      }
      const kind = rng.pick(tier === 1 ? (["hay", "esta", "estan"] as const) : (["hay", "hay2", "nohay", "que", "esta", "esta2", "estan", "estan2"] as const));
      let frame = "";
      let ans: "hay" | "está" | "están" = "hay";
      let why = "";
      switch (kind) {
        case "hay":
          frame = rng.bool() ? `En mi dormitorio ___ ${indef(n)}.` : `___ ${indef(n)} ${loc(n)}.`;
          why = `*${INDEF[n.g][0]} ${n.es}* is new information (a/an) → **hay**.`;
          break;
        case "hay2":
          frame = `___ ${rng.pick(["dos", "tres", "cuatro", "muchos", INDEF[n.g][1]])}${""} ${n.pl} en mi habitación.`.replace("muchos", n.g === "m" ? "muchos" : "muchas");
          why = "A number / *muchos* / *unos* introduces things → **hay** (it never changes for plural).";
          break;
        case "nohay":
          frame = `No ___ ${rng.bool() ? n.es : n.pl} en mi dormitorio.`;
          why = "'There isn't / there aren't' → *no* **hay** (usually with no article).";
          break;
        case "que":
          frame = rng.pick(["¿Qué ___ en tu dormitorio?", "¿Qué ___ en la habitación de tu hermano?", "¿Qué ___ debajo de tu cama?", "¿Qué ___ encima de tu escritorio?"]);
          why = "'What is there…?' asks what exists → *¿Qué* **hay**…?";
          break;
        case "esta":
          frame = `${cap(def(n))} ___ ${loc(n)}.`;
          why = `*${def(n)}* is a known thing and the sentence says where → *estar*; one thing → **está**.`;
          ans = "está";
          break;
        case "esta2":
          frame = rng.bool() ? `¿Dónde ___ ${def(n)}?` : `Mi ${n.es} ___ ${loc(n)}.`;
          why = "Where a particular thing is → *estar*; one thing → **está**.";
          ans = "está";
          break;
        case "estan":
          frame = `${cap(def(n, true))} ___ ${loc(n)}.`;
          why = `*${def(n, true)}* are known things and we say where → *estar*; plural → **están**.`;
          ans = "están";
          break;
        case "estan2":
          frame = rng.bool() ? `¿Dónde ___ mis ${n.pl}?` : `Mis ${n.pl} ___ ${loc(n)}.`;
          why = "Where particular things are → *estar*; plural → **están**.";
          ans = "están";
          break;
      }
      const traps: { wrong: string[]; feedback: string }[] =
        ans === "hay"
          ? [
              { wrong: ["está", "están"], feedback: "*Está/están* say where a known thing is. Here you're saying what exists (*un/una*, a number, *no…*, *¿qué…?*) → *hay*." },
              { wrong: ["es", "son"], feedback: "'There is / there are' is always *hay*." },
            ]
          : [
              { wrong: ["hay"], feedback: "With *el/la/los/las* or *mi/mis* you mean a specific thing and say where it is → *estar*, not *hay*." },
              ans === "está"
                ? { wrong: ["están", "es"], feedback: "One thing → *está*. (And location always uses *estar*, never *ser*.)" }
                : { wrong: ["está", "son"], feedback: "More than one thing → *están*. (And location always uses *estar*, never *ser*.)" },
            ];
      return item(
        `Fill the gap with *hay*, *está* or *están*: *${frame}*`,
        [ans],
        [why],
        "Is the sentence saying that something exists, or where a known thing is?",
        traps,
      );
    },
  },
  // 7 ---------------------------------------------------------------- hay sentences
  {
    id: `${TOPIC}.hay-no-hay`,
    topicId: TOPIC,
    title: "Hay / no hay: what's in my room",
    level: 2,
    guideRef: "hay-vs-esta",
    generate(rng, tier) {
      const pool = THINGS.filter((x) => !["pared", "cortina", "persiana"].includes(x.es));
      const n = rng.pick(pool);
      const rooms = ["dormitorio", "habitación"];
      const around = (core: string[]) => core.flatMap((c) => rooms.flatMap((r) => [`${c} en mi ${r}`, `en mi ${r} ${c}`]));
      const kinds = tier === 1 ? (["one", "num", "neg"] as const) : tier === 2 ? (["one", "num", "neg", "negPl", "lots", "some"] as const) : (["two", "on", "lots", "negPl", "num"] as const);
      const kind = rng.pick(kinds);
      const NUMS: [string, string][] = [["two", "dos"], ["three", "tres"], ["four", "cuatro"], ["five", "cinco"], ["six", "seis"]];
      let en = "";
      let accept: string[] = [];
      let steps: string[] = [];
      const traps: { wrong: string[]; feedback: string }[] = [];
      const defTrap = (x: string) => ({ wrong: around([`hay ${x}`]), feedback: "After *hay* use *un/una*, a number or no article — never *el/la/los/las*." });
      const estaTrap = (x: string, v: string) => ({ wrong: around([`${v} ${x}`]), feedback: "Saying that something exists → *hay*. *Está/están* is for where a known thing is." });
      switch (kind) {
        case "one":
          en = `There is ${aAn(n.en[0])} in my bedroom.`;
          accept = around(indefs(n).map((x) => `hay ${x}`));
          steps = ["'There is' = *hay*.", `'${aAn(n.en[0])}' = *${indef(n)}* (${gName(n.g)}).`];
          traps.push(defTrap(def(n)), estaTrap(indef(n), "está"));
          break;
        case "num": {
          const [ne, ns] = rng.pick(tier === 1 ? NUMS.slice(0, 3) : NUMS);
          en = `There are ${ne} ${n.enPl[0]} in my bedroom.`;
          accept = around(words(n, true).map((w) => `hay ${ns} ${w}`));
          steps = ["'There are' = *hay* — the same word as 'there is'.", `'${ne} ${n.enPl[0]}' = *${ns} ${n.pl}*.`];
          traps.push(estaTrap(`${ns} ${n.pl}`, "están"), defTrap(def(n, true)));
          break;
        }
        case "neg":
          en = `There isn't ${aAn(n.en[0])} in my bedroom.`;
          accept = around([...words(n, false).map((w) => `no hay ${w}`), ...indefs(n).map((x) => `no hay ${x}`)]);
          steps = ["'There isn't' = *no hay*.", `After *no hay* you normally drop the article: *no hay ${n.es}* (*no hay ${indef(n)}* is also possible).`];
          traps.push({ wrong: around([`no hay ${def(n)}`]), feedback: "After *no hay* don't use *el/la* — just the noun: *no hay televisión*." });
          traps.push({ wrong: around([`no está ${indef(n)}`, `no está ${n.es}`]), feedback: "'There isn't' → *no hay*. *Estar* is for where a known thing is." });
          break;
        case "negPl":
          en = `There aren't any ${n.enPl[0]} in my bedroom.`;
          accept = around(words(n, true).map((w) => `no hay ${w}`));
          steps = ["'There aren't any' = *no hay* — no article, no word for 'any'.", `→ *no hay ${n.pl}*.`];
          traps.push({ wrong: around([`no hay ${def(n, true)}`, `no hay ${indef(n, true)}`]), feedback: "After *no hay* just use the plural noun, with no article." });
          traps.push({ wrong: around([`no están ${n.pl}`]), feedback: "'There aren't' → *no hay*." });
          break;
        case "lots": {
          const m = n.g === "m" ? "muchos" : "muchas";
          en = `There are lots of ${n.enPl[0]} in my bedroom.`;
          accept = around(words(n, true).map((w) => `hay ${m} ${w}`));
          steps = ["'There are' = *hay*.", `'lots of' = *mucho* agreeing with *${n.pl}* (${gName(n.g)} plural) → *${m}*.`];
          traps.push({ wrong: around([`hay ${n.g === "m" ? "muchas" : "muchos"} ${n.pl}`, `hay mucho ${n.pl}`, `hay mucha ${n.pl}`]), feedback: `*Mucho* agrees like an adjective: ${gName(n.g)} plural → *${m}*.` });
          traps.push(defTrap(def(n, true)));
          break;
        }
        case "some":
          en = `There are some ${n.enPl[0]} in my bedroom.`;
          accept = around([...indefs(n, true), ...words(n, true)].map((x) => `hay ${x}`));
          steps = ["'There are' = *hay*.", `'some' = *${INDEF[n.g][1]}* (or no article at all): *${indef(n, true)}*.`];
          traps.push(defTrap(def(n, true)), estaTrap(indef(n, true), "están"));
          break;
        case "two": {
          const m = rng.pick(pool.filter((x) => x !== n));
          en = `In my bedroom there is ${aAn(n.en[0])} and ${aAn(m.en[0])}.`;
          const cores = indefs(n).flatMap((x) => indefs(m).map((y) => `hay ${x} y ${y}`));
          accept = around(cores);
          steps = ["'there is' = *hay* — just once for the whole list.", `*${indef(n)}* y *${indef(m)}*.`];
          traps.push({ wrong: around(indefs(n).flatMap((x) => indefs(m).map((y) => `hay ${x} y hay ${y}`))).slice(0, 4), feedback: "Fine in speech, but one *hay* covers the whole list: *hay una cama y un armario*." });
          traps.push({ wrong: around([`hay ${def(n)} y ${def(m)}`]), feedback: "After *hay* use *un/una*, not *el/la*." });
          break;
        }
        case "on": {
          const t = rng.pick(SMALL);
          const { p, place } = pickPrepPlace(rng, 2, t);
          const prepPhr = p.es.map((e) => withDe(e, def(place)));
          en = `There is ${aAn(t.en[0])} ${p.en} the ${place.en[0]}.`;
          accept = indefs(t).flatMap((x) => prepPhr.flatMap((pp) => [`hay ${x} ${pp}`, `${pp} hay ${x}`]));
          steps = [`'There is ${aAn(t.en[0])}' = *hay ${indef(t)}*.`, `'${p.en} the ${place.en[0]}' = *${prepPhr[0]}*.`];
          traps.push({ wrong: prepPhr.map((pp) => `${indef(t)} está ${pp}`), feedback: "With *un/una* (new information) use *hay*: *Hay una lámpara encima del escritorio.*" });
          traps.push({ wrong: [`hay ${def(t)} ${prepPhr[0]}`], feedback: "After *hay* use *un/una*, never *el/la*." });
          break;
        }
      }
      const shown = cap(accept[0]) + ".";
      return item(
        `Translate into Spanish: *${en}*`,
        [shown, ...accept],
        [...steps, `→ **${shown}**`],
        "*Hay* never changes: there is = there are = *hay*.",
        traps,
      );
    },
  },
  // 8 ---------------------------------------------------------------- colour agreement
  {
    id: `${TOPIC}.colour-agreement`,
    topicId: TOPIC,
    title: "Colour agreement: rojo, roja, rojos, rojas",
    level: 2,
    guideRef: "colours-and-possessives",
    generate(rng, tier) {
      const n = rng.pick(THINGS.filter((x) => x.es !== "televisión" || tier > 1));
      const c = rng.pick(tier === 1 ? O_COLOURS : COLOURS);
      const pl = rng.bool();
      const forms = colourForms(c, n.g, pl);
      const traps: { wrong: string[]; feedback: string }[] = [];
      const wrongG = colourForm(c, n.g === "m" ? "f" : "m", pl);
      if (!forms.includes(wrongG)) traps.push({ wrong: [wrongG], feedback: `*${word(n, pl)}* is ${gName(n.g)} → the colour must be ${gName(n.g)} too.` });
      const wrongN = colourForm(c, n.g, !pl);
      if (!forms.includes(wrongN)) traps.push({ wrong: [wrongN], feedback: pl ? "More than one thing → the colour is plural too." : "Only one thing → singular colour." });
      if (c.kind === "cons" && pl) traps.unshift({ wrong: [`${stripAccents(c.ms)}s`, `${c.ms}s`], feedback: `*${c.ms}* ends in a consonant → plural adds *-es*: *${c.mp}*.` });
      if (tier === 3 && rng.bool(0.6)) {
        const det = rng.pick(["the", "indef", "my"] as const);
        const esDet = det === "the" ? DEF[n.g][pl ? 1 : 0] : det === "my" ? (pl ? "mis" : "mi") : INDEF[n.g][pl ? 1 : 0];
        const enW = (pl ? n.enPl : n.en)[0];
        const enPhrase = det === "indef" ? (pl ? `some ${c.en} ${enW}` : aAn(`${c.en} ${enW}`)) : `${det} ${c.en} ${enW}`;
        const accept = words(n, pl).flatMap((w) => forms.map((f) => `${esDet} ${w} ${f}`));
        const phTraps = [
          { wrong: forms.map((f) => `${esDet} ${f} ${word(n, pl)}`), feedback: "Colours go after the noun in Spanish: *una cama roja*, not *una roja cama*." },
          ...traps.map((t) => ({ wrong: t.wrong.map((w) => `${esDet} ${word(n, pl)} ${w}`), feedback: t.feedback })),
        ];
        return item(
          `Write in Spanish: *${enPhrase}*`,
          accept,
          [`'${enW}' = *${DEF[n.g][pl ? 1 : 0]} ${word(n, pl)}* (${gName(n.g)}${pl ? " plural" : ""}) → *${esDet} ${word(n, pl)}*.`, "The colour goes after the noun.", colourRule(c, n.g, pl), `→ **${accept[0]}**`],
          "Noun first, then the colour — and make the colour agree.",
          phTraps,
        );
      }
      const style = tier === 1 ? rng.pick(["np", "np"] as const) : rng.pick(["np", "son", "mi"] as const);
      let frame: string;
      if (style === "np") frame = `${rng.bool() ? DEF[n.g][pl ? 1 : 0] : INDEF[n.g][pl ? 1 : 0]} ${word(n, pl)} ___`;
      else if (style === "mi") frame = `Tengo ${indef(n, pl)} ___.`;
      else frame = `${cap(pl ? `mis ${n.pl}` : `mi ${n.es}`)} ${pl ? "son" : "es"} ___.`;
      return item(
        `Write the correct form of *${c.ms}* (${c.en}) to complete: *${frame}*`,
        forms,
        [`*${word(n, pl)}* is ${gName(n.g)} ${pl ? "plural" : "singular"}.`, colourRule(c, n.g, pl)],
        c.kind === "o" ? "Colours ending in -o have four forms: which one matches the noun?" : "Does this colour change for gender? Does it change for plural?",
        traps,
      );
    },
  },
  // 9 ---------------------------------------------------------------- possessives
  {
    id: `${TOPIC}.possessives`,
    topicId: TOPIC,
    title: "Possessives: mi/mis, tu/tus, su/sus, nuestro/a",
    level: 2,
    guideRef: "colours-and-possessives",
    generate(rng, tier) {
      const o = rng.pick(OWNERS.filter((x) => x.tier <= tier));
      const n = rng.pick(THINGS);
      const pl = rng.bool();
      const poss = o.forms[n.g][pl ? 1 : 0];
      const enW = (pl ? n.enPl : n.en)[0];
      const withColour = tier === 3 && rng.bool(0.6);
      const c = rng.pick(COLOURS);
      const cForms = withColour ? colourForms(c, n.g, pl) : [""];
      const accept = words(n, pl).flatMap((w) => cForms.map((cf) => `${poss} ${w}${cf ? " " + cf : ""}`));
      const cf0 = cForms[0] ? " " + cForms[0] : "";
      const wrongNum = o.forms[n.g][pl ? 0 : 1];
      const traps: { wrong: string[]; feedback: string }[] = [
        {
          wrong: [`${wrongNum} ${word(n, pl)}${cf0}`],
          feedback: pl ? `More than one thing owned → plural possessive: *${poss}*.` : `Only one thing owned → singular possessive: *${poss}*.`,
        },
      ];
      if (o.en === "our" || o.note?.includes("vosotros")) {
        const other = o.forms[n.g === "m" ? "f" : "m"][pl ? 1 : 0];
        traps.unshift({ wrong: [`${other} ${word(n, pl)}${cf0}`], feedback: `*${o.forms.m[0]}* agrees with the thing owned: *${word(n, pl)}* is ${gName(n.g)} → *${poss}*.` });
      }
      if (withColour && colourForm(c, n.g, pl) !== c.ms) traps.push({ wrong: [`${poss} ${word(n, pl)} ${c.ms}`], feedback: "Make the colour agree with the noun too." });
      const enPhrase = `${o.en} ${withColour ? c.en + " " : ""}${enW}`;
      return item(
        `Write in Spanish: *${enPhrase}*${o.note ?? ""}`,
        accept,
        [
          `'${enW}' = *${DEF[n.g][pl ? 1 : 0]} ${word(n, pl)}* (${gName(n.g)}${pl ? " plural" : " singular"}).`,
          `'${o.en}' agrees with the thing owned, not the owner → *${poss}*.`,
          ...(withColour ? [colourRule(c, n.g, pl)] : []),
          `→ **${accept[0]}**`,
        ],
        "Possessives agree with the thing owned: one thing or more? (Only nuestro/vuestro show gender.)",
        traps,
      );
    },
  },
  // 10 --------------------------------------------------------------- compartir
  {
    id: `${TOPIC}.compartir`,
    topicId: TOPIC,
    title: "Compartir: who shares a room?",
    level: 2,
    guideRef: "describing-my-room",
    generate(rng, tier) {
      const REL = ["hermano", "hermana", "primo", "prima"];
      const NAMES = ["Lucía", "Pablo", "Carmen", "Javier", "Wei Ling", "Arjun", "Priya", "Marcus", "Sofía", "Diego"];
      const room = () => rng.pick(["mi dormitorio", "mi habitación", "la litera"]);
      const frames: Record<Person, () => string> = {
        yo: () => rng.pick([`___ ${room()} con mi ${rng.pick(REL)}.`, "No ___ mi habitación con nadie.", `En Singapur ___ ${room()} con mi ${rng.pick(REL)}.`]),
        tú: () => rng.pick([`¿___ tu dormitorio con tu ${rng.pick(REL)}?`, "¿Con quién ___ tu habitación?", `${rng.pick(NAMES)}, ¿___ la litera con tu ${rng.pick(REL)}?`]),
        él: () => `${rng.pick(NAMES)} ___ su ${rng.pick(["dormitorio", "habitación"])} con su ${rng.pick(REL)}.`,
        nosotros: () => `Mi ${rng.pick(REL)} y yo ___ ${rng.pick(["un dormitorio", "una habitación", "la litera", "un armario"])}.`,
        vosotros: () => rng.pick([`¿Vosotros ___ ${rng.pick(["el armario", "la litera", "un dormitorio"])}?`, `${rng.pick(NAMES)} y tú ___ una habitación, ¿verdad?`]),
        ellos: () => {
          const [x, y] = rng.shuffle(NAMES);
          return rng.pick([`Mis ${rng.pick(["hermanos", "primos", "hermanas", "primas"])} ___ ${rng.pick(["una habitación", "un dormitorio", "la litera"])}.`, `${x} y ${y} ___ un dormitorio enorme.`]);
        },
      };
      const persons: Person[] = tier === 1 ? ["yo", "él", "nosotros", "ellos"] : ["yo", "tú", "él", "nosotros", "vosotros", "ellos"];
      const person = rng.pick(persons);
      const tense: Tense = tier === 3 ? rng.pick(["preterite", "near-future", "present"] as const) : "present";
      let frame = frames[person]();
      const time =
        tense === "preterite"
          ? rng.pick(["El año pasado", "Ayer", "En las vacaciones"])
          : tense === "near-future"
            ? rng.pick(["El año que viene", "Mañana", "En el futuro"])
            : tier === 3
              ? rng.pick(["Este año", "Ahora", "Normalmente"])
              : "";
      if (time) {
        const q = frame.startsWith("¿") ? "¿" : "";
        const rest = frame.slice(q.length);
        const keepCap = rest.startsWith("_") || NAMES.some((nm) => rest.startsWith(nm)) || rest.startsWith("Singapur");
        frame = `${time}, ${q}${keepCap ? rest : rest.charAt(0).toLowerCase() + rest.slice(1)}`;
      }
      const form = conjugate("compartir", tense, person);
      const accept = acceptedForms("compartir", tense, person);
      const WHO: Record<Person, string> = {
        yo: "the speaker (*yo*)",
        tú: "*tú* (one friend you're talking to)",
        él: "one person → *él/ella*",
        nosotros: "'… y yo' → *nosotros*",
        vosotros: "'… y tú' / *vosotros* → *vosotros*",
        ellos: "two or more people → *ellos/ellas*",
      };
      const traps: { wrong: string[]; feedback: string }[] = [{ wrong: ["compartir"], feedback: "Don't leave the infinitive — conjugate it: who is sharing?" }];
      if (person !== "yo") traps.push({ wrong: [conjugate("compartir", tense, "yo")], feedback: `That's the *yo* form. Check the subject: ${WHO[person]}.` });
      if (tense !== "present") traps.push({ wrong: [conjugate("compartir", "present", person)], feedback: `Use the time phrase: *${time}* needs the ${tense === "preterite" ? "preterite (past)" : "near future (*ir a* + infinitive)"}.` });
      else if (person !== "él") traps.push({ wrong: [conjugate("compartir", tense, "él")], feedback: `That's the *él/ella* form. Check the subject: ${WHO[person]}.` });
      const tenseLabel = tense === "present" ? "present" : tense === "preterite" ? "preterite" : "near future";
      const steps =
        tense === "near-future"
          ? [`*${time}* → near future: *ir* + *a* + infinitive.`, `Subject: ${WHO[person]} → *${form.split(" ")[0]}*.`, `→ **${form}**`]
          : [
              `*compartir* is a regular *-ir* verb: stem *compart-*.`,
              `${tense === "preterite" ? `*${time}* → preterite. ` : ""}Subject: ${WHO[person]} → ending *-${form.slice("compart".length)}*.`,
              `→ **${form}**`,
            ];
      return item(
        tier === 3
          ? `Complete with the correct form of *compartir* (to share) — the time phrase tells you the tense: *${frame}*`
          : `Complete with the correct ${tenseLabel}-tense form of *compartir* (to share): *${frame}*`,
        accept,
        steps,
        tier === 3 ? "Time phrase first (past, present or future?), then the subject." : "Who is sharing? Find the subject, then the -ir ending.",
        traps,
      );
    },
  },
  // 11 --------------------------------------------------------------- where-is-it sentence
  {
    id: `${TOPIC}.where-is-it-sentence`,
    topicId: TOPIC,
    title: "Build a 'where is it' sentence",
    level: 3,
    guideRef: "prepositions-of-place",
    generate(rng, tier) {
      const SUBJ_N = SMALL;
      if (tier === 3 && rng.bool(0.2)) {
        const { p, place } = pickPrepPlace(rng, 2);
        const pp = p.es.map((e) => withDe(e, def(place)));
        const accept = pp.map((x) => `Mi ropa está ${x}.`);
        return item(
          `Translate into Spanish: *My clothes are ${p.en} the ${place.en[0]}.*`,
          accept,
          ["'clothes' = *la ropa* — singular in Spanish!", "So 'my' = *mi* and the verb is *está*.", `'${p.en} the ${place.en[0]}' = *${pp[0]}*.`, `→ **${accept[0]}**`],
          "Is *ropa* singular or plural in Spanish?",
          [
            { wrong: pp.flatMap((x) => [`mis ropas están ${x}`, `mi ropa están ${x}`]), feedback: "*La ropa* is singular in Spanish (like 'clothing'): *mi ropa está…*" },
            { wrong: pp.map((x) => `mi ropa es ${x}`), feedback: "Location always uses *estar*: *está*." },
          ],
        );
      }
      const n = rng.pick(SUBJ_N);
      const pl = tier >= 2 && rng.bool(0.4);
      const { p, place } = pickPrepPlace(rng, tier, n);
      const o = tier === 3 && rng.bool(0.6) ? rng.pick(OWNERS.filter((x) => x.tier <= 2 && x.en !== "your")) : null;
      const subjEs = o ? `${o.forms[n.g][pl ? 1 : 0]} ${word(n, pl)}` : def(n, pl);
      const subjEn = `${o ? o.en : "the"} ${(pl ? n.enPl : n.en)[0]}`;
      const verb = pl ? "están" : "está";
      const pp = p.es.map((e) => withDe(e, def(place)));
      const accept = pp.map((x) => `${cap(subjEs)} ${verb} ${x}.`);
      const traps: { wrong: string[]; feedback: string }[] = [{ wrong: pp.map((x) => `${subjEs} ${pl ? "son" : "es"} ${x}`), feedback: "Location always uses *estar* (*está/están*), never *ser*." }];
      if (place.g === "m" && p.es[0].endsWith("de")) traps.push({ wrong: [`${subjEs} ${verb} ${p.es[0]} ${def(place)}`], feedback: "*De + el* must merge: *del*." });
      else traps.push({ wrong: [`${subjEs} ${pl ? "está" : "están"} ${pp[0]}`], feedback: pl ? "More than one thing → *están*." : "One thing → *está*." });
      return item(
        `Translate into Spanish: *${cap(subjEn)} ${pl ? "are" : "is"} ${p.en} the ${place.en[0]}.*`,
        accept,
        [
          `'${subjEn}' = *${subjEs}* → ${pl ? "plural → *están*" : "one thing → *está*"} (location = *estar*).`,
          `'${p.en}' = *${p.es[0]}*${p.es.length > 1 ? ` (or *${p.es[1]}*)` : ""}; 'the ${place.en[0]}' = *${def(place)}*${place.g === "m" && p.es[0].endsWith("de") ? " → *del*" : ""}.`,
          `→ **${accept[0]}**`,
        ],
        "Thing + está/están + place word + (del / de la / de los / de las) + place.",
        traps,
      );
    },
  },
  // 12 --------------------------------------------------------------- opinion + reason
  {
    id: `${TOPIC}.opinion-reason`,
    topicId: TOPIC,
    title: "Opinion + reason: me encanta mi dormitorio porque es…",
    level: 3,
    guideRef: "describing-my-room",
    generate(rng, tier) {
      const ADJ: { en: string; m: string; f: string; good: boolean }[] = [
        { en: "big", m: "grande", f: "grande", good: true },
        { en: "comfortable", m: "cómodo", f: "cómoda", good: true },
        { en: "bright", m: "luminoso", f: "luminosa", good: true },
        { en: "quiet", m: "tranquilo", f: "tranquila", good: true },
        { en: "pretty", m: "bonito", f: "bonita", good: true },
        { en: "modern", m: "moderno", f: "moderna", good: true },
        { en: "new", m: "nuevo", f: "nueva", good: true },
        { en: "small", m: "pequeño", f: "pequeña", good: false },
        { en: "dark", m: "oscuro", f: "oscura", good: false },
        { en: "old", m: "viejo", f: "vieja", good: false },
        { en: "ugly", m: "feo", f: "fea", good: false },
      ];
      const OPS: { en: string; es: string; tier: number; good: boolean }[] = [
        { en: "I love", es: "me encanta", tier: 1, good: true },
        { en: "I like", es: "me gusta", tier: 1, good: true },
        { en: "I don't like", es: "no me gusta", tier: 1, good: false },
        { en: "I really like", es: "me gusta mucho", tier: 2, good: true },
      ];
      // Tier 3 adds "but I don't like …", so the main opinion is positive there.
      const op = rng.pick(OPS.filter((x) => x.tier <= tier && (tier < 3 || x.good)));
      const [a1, a2] = rng.shuffle(ADJ.filter((a) => a.good === op.good)).slice(0, 2);
      const two = tier >= 2 && rng.bool(0.6);
      const very = tier >= 2 && !two && rng.bool(0.5);
      const enAdj = two ? `${a1.en} and ${a2.en}` : `${very ? "very " : ""}${a1.en}`;
      const esAdj = (g: G) => (two ? `${a1[g]} y ${a2[g]}` : `${very ? "muy " : ""}${a1[g]}`);
      const ROOMS: { w: string; g: G }[] = [
        { w: "dormitorio", g: "m" },
        { w: "habitación", g: "f" },
      ];
      const CONN = ["porque", "ya que"];
      // tier 3 tail: "but I don't like the walls because they are grey"
      const TAIL: [string, boolean][] = [["pared", true], ["cortina", true], ["alfombra", false], ["armario", false], ["cojín", true], ["lámpara", false], ["persiana", true], ["escritorio", false]];
      const tailPick = tier === 3 ? rng.pick(TAIL) : null;
      const tailNoun = tailPick ? byEs(tailPick[0]) : null;
      const tailPl = tailPick ? tailPick[1] : false;
      const tailC = rng.pick(COLOURS);
      const tails = (conn: string): string[] =>
        tailNoun
          ? colourForms(tailC, tailNoun.g, tailPl).map((cf) => `, pero no me ${tailPl ? "gustan" : "gusta"} ${def(tailNoun, tailPl)} ${conn} ${tailPl ? "son" : "es"} ${cf}`)
          : [""];
      const tailEn = tailNoun ? `, but I don't like the ${(tailPl ? tailNoun.enPl : tailNoun.en)[0]} because ${tailPl ? "they are" : "it is"} ${tailC.en}` : "";
      const accept: string[] = [];
      for (const r of ROOMS)
        for (const c1 of CONN)
          for (const c2 of tailNoun ? CONN : ["porque"])
            for (const t of tails(c2)) {
              accept.push(`${op.es} mi ${r.w} ${c1} es ${esAdj(r.g)}${t}`);
              accept.push(`mi ${r.w} ${op.es} ${c1} es ${esAdj(r.g)}${t}`);
            }
      const canonical = `${cap(op.es)} mi dormitorio porque es ${esAdj("m")}${tails("porque")[0]}.`;
      const traps: { wrong: string[]; feedback: string }[] = [];
      const genderSensitive = two ? a1.m !== a1.f || a2.m !== a2.f : a1.m !== a1.f;
      if (genderSensitive) traps.push({ wrong: [`${op.es} mi habitación porque es ${esAdj("m")}${tails("porque")[0]}`], feedback: "*Habitación* is feminine, so the adjective must be feminine too (or use *dormitorio*, which is masculine)." });
      if (tailNoun && tailPl) traps.push({ wrong: [`${op.es} mi dormitorio porque es ${esAdj("m")}${tails("porque")[0].replace("gustan", "gusta")}`], feedback: `*${cap(def(tailNoun, true))}* are plural → *no me gustan*.` });
      traps.push({ wrong: [`${op.es} mi dormitorio porque está ${esAdj("m")}${tails("porque")[0]}`], feedback: "Describing what something is like → *es*, not *está*." });
      return item(
        `Translate into Spanish: *${op.en} my bedroom because it is ${enAdj}${tailEn}.*`,
        [canonical, ...accept],
        [
          `'${op.en}' + one thing = *${op.es}*. 'my bedroom' = *mi dormitorio* (or *mi habitación*).`,
          `'because it is' = *porque es* (or *ya que es*). The adjective agrees: *dormitorio* → *${esAdj("m")}*; *habitación* → *${esAdj("f")}*.`,
          ...(tailNoun ? [`'but I don't like the ${(tailPl ? tailNoun.enPl : tailNoun.en)[0]}' = *pero no me ${tailPl ? "gustan" : "gusta"} ${def(tailNoun, tailPl)}* (${tailPl ? "plural → gustan" : "one thing → gusta"}). ${colourRule(tailC, tailNoun.g, tailPl)}`] : []),
          `→ **${canonical}**`,
        ],
        "Build it up: opinion + mi dormitorio + porque es + adjective (agreeing).",
        traps,
      );
    },
  },
];
