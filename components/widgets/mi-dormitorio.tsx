"use client";
import { useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Segmented, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";

type G = "m" | "f";

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Join a place word ending in "de" to a noun phrase, contracting de + el = del. */
function withDe(prep: string, phrase: string): string {
  if ((prep === "de" || prep.endsWith(" de")) && phrase.startsWith("el ")) return `${prep.slice(0, -2)}del ${phrase.slice(3)}`.trim();
  return `${prep} ${phrase}`;
}

/** Spanish list: "a", "a y b", "a, b y c". */
function joinY(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;
}

function SpeakButton({ text, label = "Listen" }: { text: string; label?: string }) {
  return (
    <button type="button" className="btn btn-secondary btn-sm shrink-0" onClick={() => speakSpanish(text)} aria-label={`${label}: ${text}`}>
      <span aria-hidden>🔊</span>
      <span className="sr-only">{label}</span>
    </button>
  );
}

// ===========================================================================
// 1. Tap-to-place bedroom
// ===========================================================================

type FurnId = "armario" | "cama" | "mesita" | "escritorio" | "ventana";
const FURN: Record<FurnId, { es: string; en: string; g: G }> = {
  armario: { es: "el armario", en: "the wardrobe", g: "m" },
  cama: { es: "la cama", en: "the bed", g: "f" },
  mesita: { es: "la mesita de noche", en: "the bedside table", g: "f" },
  escritorio: { es: "el escritorio", en: "the desk", g: "m" },
  ventana: { es: "la ventana", en: "the window", g: "f" },
};

interface Desc {
  prep: "encima de" | "debajo de" | "delante de" | "al lado de" | "entre" | "en";
  a: FurnId;
  b?: FurnId;
}
const PREP_EN: Record<Desc["prep"], string> = {
  "encima de": "on top of",
  "debajo de": "under",
  "delante de": "in front of",
  "al lado de": "next to",
  entre: "between",
  en: "on",
};

function descEs(d: Desc): string {
  if (d.prep === "entre") return `entre ${FURN[d.a].es} y ${FURN[d.b!].es}`;
  return withDe(d.prep, FURN[d.a].es);
}
function descEn(d: Desc): string {
  if (d.prep === "entre") return `between ${FURN[d.a].en} and ${FURN[d.b!].en}`;
  return `${PREP_EN[d.prep]} ${FURN[d.a].en}`;
}

type SpotId =
  | "encima-armario"
  | "delante-armario"
  | "entre-armario-cama"
  | "encima-cama"
  | "debajo-cama"
  | "delante-cama"
  | "encima-mesita"
  | "encima-escritorio"
  | "debajo-escritorio"
  | "delante-escritorio";

/** x, y = where the object rests (bottom-centre). All geometry matches the drawing below. */
const SPOTS: { id: SpotId; x: number; y: number; descs: Desc[] }[] = [
  { id: "encima-armario", x: 56, y: 90, descs: [{ prep: "encima de", a: "armario" }] },
  { id: "delante-armario", x: 56, y: 302, descs: [{ prep: "delante de", a: "armario" }] },
  { id: "entre-armario-cama", x: 124, y: 250, descs: [{ prep: "entre", a: "armario", b: "cama" }, { prep: "al lado de", a: "armario" }, { prep: "al lado de", a: "cama" }] },
  { id: "encima-cama", x: 240, y: 196, descs: [{ prep: "encima de", a: "cama" }, { prep: "en", a: "cama" }] },
  { id: "debajo-cama", x: 224, y: 250, descs: [{ prep: "debajo de", a: "cama" }] },
  { id: "delante-cama", x: 224, y: 302, descs: [{ prep: "delante de", a: "cama" }] },
  { id: "encima-mesita", x: 318, y: 206, descs: [{ prep: "encima de", a: "mesita" }, { prep: "en", a: "mesita" }, { prep: "al lado de", a: "cama" }] },
  { id: "encima-escritorio", x: 404, y: 186, descs: [{ prep: "encima de", a: "escritorio" }, { prep: "en", a: "escritorio" }, { prep: "debajo de", a: "ventana" }] },
  { id: "debajo-escritorio", x: 410, y: 250, descs: [{ prep: "debajo de", a: "escritorio" }] },
  { id: "delante-escritorio", x: 410, y: 302, descs: [{ prep: "delante de", a: "escritorio" }] },
];
const spotById = (id: SpotId) => SPOTS.find((s) => s.id === id)!;

type ObjId = "lampara" | "gato" | "libros" | "zapatillas" | "movil" | "planta";
const OBJS: { id: ObjId; def: string; indef: string; en: string; pl: boolean; g: G }[] = [
  { id: "lampara", def: "la lámpara", indef: "una lámpara", en: "the lamp", pl: false, g: "f" },
  { id: "gato", def: "el gato", indef: "un gato", en: "the cat", pl: false, g: "m" },
  { id: "libros", def: "los libros", indef: "unos libros", en: "the books", pl: true, g: "m" },
  { id: "zapatillas", def: "las zapatillas", indef: "unas zapatillas", en: "the trainers", pl: true, g: "f" },
  { id: "movil", def: "el móvil", indef: "un móvil", en: "the mobile phone", pl: false, g: "m" },
  { id: "planta", def: "la planta", indef: "una planta", en: "the plant", pl: false, g: "f" },
];
const objById = (id: ObjId) => OBJS.find((o) => o.id === id)!;

/** Each object is at most 26 px tall so it fits under the bed (28 px clearance). */
function ObjShape({ id, x, y }: { id: ObjId; x: number; y: number }) {
  const s = "stroke-ink";
  switch (id) {
    case "lampara":
      return (
        <g>
          <rect x={x - 7} y={y - 3} width={14} height={3} className={`fill-ink-2 ${s}`} />
          <line x1={x} y1={y - 3} x2={x} y2={y - 14} className={s} strokeWidth={2} />
          <polygon points={`${x - 10},${y - 13} ${x + 10},${y - 13} ${x + 5},${y - 24} ${x - 5},${y - 24}`} className={`fill-accent ${s}`} />
        </g>
      );
    case "gato":
      return (
        <g>
          <path d={`M${x - 12} ${y - 8} Q${x - 22} ${y - 12} ${x - 19} ${y - 22}`} fill="none" className={s} strokeWidth={1.5} />
          <ellipse cx={x} cy={y - 7} rx={12} ry={7} className={`fill-warn-soft ${s}`} />
          <polygon points={`${x + 5},${y - 19} ${x + 7},${y - 26} ${x + 10},${y - 21}`} className={`fill-warn-soft ${s}`} />
          <polygon points={`${x + 12},${y - 21} ${x + 15},${y - 26} ${x + 17},${y - 19}`} className={`fill-warn-soft ${s}`} />
          <circle cx={x + 11} cy={y - 15} r={6} className={`fill-warn-soft ${s}`} />
        </g>
      );
    case "libros":
      return (
        <g>
          <rect x={x - 14} y={y - 5} width={28} height={5} className={`fill-brand-soft ${s}`} />
          <rect x={x - 11} y={y - 10} width={23} height={5} className={`fill-good-soft ${s}`} />
          <rect x={x - 13} y={y - 15} width={25} height={5} className={`fill-bad-soft ${s}`} />
        </g>
      );
    case "zapatillas":
      return (
        <g>
          {[x - 16, x + 1].map((sx) => (
            <path key={sx} d={`M${sx} ${y} L${sx} ${y - 7} Q${sx + 3} ${y - 11} ${sx + 7} ${y - 9} L${sx + 15} ${y - 4} L${sx + 15} ${y} Z`} className={`fill-info-soft ${s}`} />
          ))}
        </g>
      );
    case "movil":
      return (
        <g>
          <rect x={x - 5} y={y - 17} width={10} height={17} rx={2} className={`fill-ink ${s}`} />
          <rect x={x - 3} y={y - 15} width={6} height={11} className="fill-info-soft" />
        </g>
      );
    case "planta":
      return (
        <g>
          <ellipse cx={x - 5} cy={y - 16} rx={3} ry={7} transform={`rotate(-25 ${x - 5} ${y - 16})`} className={`fill-good ${s}`} />
          <ellipse cx={x + 5} cy={y - 16} rx={3} ry={7} transform={`rotate(25 ${x + 5} ${y - 16})`} className={`fill-good ${s}`} />
          <ellipse cx={x} cy={y - 18} rx={3} ry={7} className={`fill-good ${s}`} />
          <polygon points={`${x - 7},${y} ${x + 7},${y} ${x + 9},${y - 10} ${x - 9},${y - 10}`} className={`fill-accent-soft ${s}`} />
        </g>
      );
  }
}

function RoomFurniture() {
  const s = "stroke-ink";
  return (
    <g>
      {/* wall + floor */}
      <rect x={0} y={0} width={480} height={250} className="fill-surface-2" />
      <rect x={0} y={250} width={480} height={60} className="fill-brand-soft" />
      <line x1={0} y1={250} x2={480} y2={250} className={s} strokeWidth={1.5} />
      {/* window above the desk */}
      <rect x={365} y={40} width={90} height={90} className={`fill-info-soft ${s}`} strokeWidth={2} />
      <line x1={410} y1={40} x2={410} y2={130} className={s} />
      <line x1={365} y1={85} x2={455} y2={85} className={s} />
      <text x={410} y={30} fontSize={12} textAnchor="middle" className="fill-ink-2" lang="es">la ventana</text>
      {/* wardrobe */}
      <rect x={16} y={90} width={80} height={160} rx={3} className={`fill-accent-soft ${s}`} strokeWidth={1.5} />
      <line x1={56} y1={96} x2={56} y2={244} className={s} />
      <circle cx={50} cy={170} r={2.5} className="fill-ink" />
      <circle cx={62} cy={170} r={2.5} className="fill-ink" />
      {/* bed: headboard, mattress, frame, legs */}
      <rect x={150} y={160} width={10} height={90} className={`fill-warn-soft ${s}`} />
      <rect x={160} y={196} width={130} height={14} rx={3} className={`fill-surface ${s}`} />
      <rect x={164} y={186} width={30} height={10} rx={4} className={`fill-surface ${s}`} />
      <rect x={160} y={210} width={130} height={12} className={`fill-warn-soft ${s}`} />
      <rect x={282} y={222} width={6} height={28} className={`fill-warn-soft ${s}`} />
      {/* bedside table */}
      <rect x={296} y={206} width={44} height={26} className={`fill-good-soft ${s}`} />
      <line x1={300} y1={219} x2={336} y2={219} className={s} />
      <rect x={299} y={232} width={5} height={18} className={`fill-good-soft ${s}`} />
      <rect x={332} y={232} width={5} height={18} className={`fill-good-soft ${s}`} />
      {/* desk */}
      <rect x={352} y={186} width={116} height={8} className={`fill-warn-soft ${s}`} />
      <rect x={356} y={194} width={6} height={56} className={`fill-warn-soft ${s}`} />
      <rect x={458} y={194} width={6} height={56} className={`fill-warn-soft ${s}`} />
      {/* labels on the floor, in front of each piece */}
      <g fontSize={11} textAnchor="middle" className="fill-ink-2" lang="es">
        <text x={56} y={265}>el armario</text>
        <text x={260} y={265}>la cama</text>
        <text x={318} y={265}>la mesita</text>
        <text x={318} y={276}>de noche</text>
        <text x={440} y={265}>el escritorio</text>
      </g>
    </g>
  );
}

function RoomPlacer() {
  const [pos, setPos] = useState<Partial<Record<ObjId, SpotId>>>({ lampara: "encima-mesita" });
  const [order, setOrder] = useState<ObjId[]>(["lampara"]);
  const [sel, setSel] = useState<ObjId>("gato");

  const place = (spot: SpotId) => {
    setPos((prev) => {
      const next = { ...prev };
      const occupant = (Object.keys(next) as ObjId[]).find((k) => next[k] === spot && k !== sel);
      const from = next[sel];
      if (occupant) {
        if (from) next[occupant] = from;
        else delete next[occupant];
      }
      next[sel] = spot;
      return next;
    });
    setOrder((prev) => (prev.includes(sel) ? prev : [...prev, sel]));
  };

  const reset = () => {
    setPos({});
    setOrder([]);
  };

  const placed = order.filter((id) => pos[id]);
  const sentenceFor = (id: ObjId, d: Desc) => {
    const o = objById(id);
    return `${cap(o.def)} ${o.pl ? "están" : "está"} ${descEs(d)}.`;
  };
  const selObj = objById(sel);
  const selSpot = pos[sel] ? spotById(pos[sel]!) : null;
  const main = selSpot ? sentenceFor(sel, selSpot.descs[0]) : "";
  const alsoTrue = selSpot ? selSpot.descs.slice(1).map((d) => sentenceFor(sel, d)) : [];
  const hay = placed.length ? `En mi dormitorio hay ${joinY(placed.map((id) => objById(id).indef))}.` : "";
  const paragraph = [hay, ...placed.map((id) => sentenceFor(id, spotById(pos[id]!).descs[0]))].filter(Boolean).join(" ");

  const aria = placed.length
    ? `A bedroom with a wardrobe, a bed, a bedside table, a desk and a window. ${placed.map((id) => `${cap(objById(id).en)} ${objById(id).pl ? "are" : "is"} ${descEn(spotById(pos[id]!).descs[0])}.`).join(" ")}`
    : "A bedroom with a wardrobe, a bed, a bedside table, a desk and a window. Nothing has been placed yet.";

  let caption: ReactNode;
  if (!selSpot) {
    caption = (
      <p>
        Pick an object, then tap a dashed circle in the room (or choose a place from the list). You&apos;ll get the Spanish for where it is — and every placed object joins your paragraph.
      </p>
    );
  } else {
    const d = selSpot.descs[0];
    const f = FURN[d.a];
    let rule: ReactNode;
    if (d.prep === "entre") rule = <> <em>Entre … y …</em> is the one place phrase with <strong>no</strong> <em>de</em>.</>;
    else if (d.prep === "en") rule = <> <em>En</em> = in / on, with no <em>de</em>.</>;
    else if (f.g === "m")
      rule = (
        <>
          {" "}
          <em>{d.prep}</em> + <em>{f.es}</em> → <strong lang="es">{withDe(d.prep, f.es)}</strong>: <em>de + el</em> always squeezes into <em>del</em>.
        </>
      );
    else
      rule = (
        <>
          {" "}
          <em>{f.es}</em> is feminine, so it stays <strong lang="es">de {f.es}</strong> — only <em>de + el</em> merges.
        </>
      );
    caption = (
      <p>
        <em lang="es">{cap(selObj.def)}</em> {selObj.pl ? "is plural (more than one thing)" : "is one thing"}, so the verb is{" "}
        <strong lang="es">{selObj.pl ? "están" : "está"}</strong> — location always uses <em>estar</em>.{rule} The first sentence uses{" "}
        <em>hay</em> + <em>un/una/unos/unas</em> to say what exists; after that each thing is known, so it takes <em>el/la/los/las</em> + <em>está/están</em>.
      </p>
    );
  }

  return (
    <WidgetFrame
      title="Place it in the bedroom"
      tryThis={[
        "Make a sentence that needs *del*. Which pieces of furniture are masculine?",
        "Before you place *las zapatillas* under the bed, predict the verb. Then test it.",
        "Find a spot that can be described in three different ways.",
        "Place four things, then read your paragraph aloud. Why does the first sentence use *hay*?",
      ]}
      caption={caption}
    >
      <div className="space-y-3">
        <div role="radiogroup" aria-label="Object to place" className="flex flex-wrap gap-2">
          {OBJS.map((o) => (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={sel === o.id}
              onClick={() => setSel(o.id)}
              className={`flex min-h-[44px] items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-bold transition ${
                sel === o.id ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink-2 hover:text-ink"
              }`}
            >
              <svg viewBox="-20 -30 40 34" className="h-6 w-7" aria-hidden>
                <ObjShape id={o.id} x={0} y={0} />
              </svg>
              <span lang="es">{o.def}</span>
              {pos[o.id] ? <span className="text-good" aria-label="placed">✓</span> : null}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 480 310" className="h-auto w-full touch-manipulation rounded-xl border border-line" role="img" aria-label={aria}>
          <RoomFurniture />
          {placed.map((id) => {
            const sp = spotById(pos[id]!);
            return (
              <g key={id} pointerEvents="none">
                <ObjShape id={id} x={sp.x} y={sp.y} />
                {id === sel ? <circle cx={sp.x} cy={sp.y - 13} r={18} fill="none" className="stroke-brand" strokeWidth={2} /> : null}
              </g>
            );
          })}
          {SPOTS.map((sp) => {
            if (pos[sel] === sp.id) return null;
            return (
              <g key={sp.id} aria-hidden onClick={() => place(sp.id)} className="group cursor-pointer">
                <circle cx={sp.x} cy={sp.y - 13} r={26} fill="transparent" />
                <circle cx={sp.x} cy={sp.y - 13} r={17} fill="transparent" className="stroke-brand opacity-70 group-hover:opacity-100" strokeWidth={1.5} strokeDasharray="4 3" />
              </g>
            );
          })}
        </svg>

        <label className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-2">
          Or choose where to put <span lang="es">{selObj.def}</span>:
          <select className="input !w-auto !py-2" value={pos[sel] ?? ""} onChange={(e) => e.target.value && place(e.target.value as SpotId)}>
            <option value="">— pick a place —</option>
            {SPOTS.map((sp) => (
              <option key={sp.id} value={sp.id}>
                {descEn(sp.descs[0])}
              </option>
            ))}
          </select>
        </label>

        <div className="rounded-xl border border-line bg-surface p-3">
          {selSpot ? (
            <>
              <div className="flex items-start justify-between gap-2">
                <p className="text-lg font-extrabold text-ink" lang="es">
                  {main}
                </p>
                <SpeakButton text={main} />
              </div>
              {alsoTrue.length ? (
                <div className="mt-2 text-sm text-ink-2">
                  <span className="font-bold">Also true: </span>
                  {alsoTrue.map((t) => (
                    <span key={t} lang="es" className="chip mr-1 mt-1">
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className="text-ink-2">
              <span lang="es" className="font-bold">¿Dónde {selObj.pl ? "están" : "está"} {selObj.def}?</span> Tap a dashed circle to place it.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Readout label="Verb" value={<span lang="es">{selObj.pl ? "están" : "está"}</span>} />
          <Readout
            label="de + el → del?"
            tone={selSpot && selSpot.descs[0].prep !== "entre" && selSpot.descs[0].prep !== "en" && FURN[selSpot.descs[0].a].g === "m" ? "good" : "ink"}
            value={
              selSpot && selSpot.descs[0].prep !== "entre" && selSpot.descs[0].prep !== "en"
                ? FURN[selSpot.descs[0].a].g === "m"
                  ? "yes: del"
                  : "no: de la"
                : "—"
            }
          />
        </div>

        {placed.length ? (
          <div className="rounded-xl bg-brand-soft p-3">
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-2">Mi dormitorio — your paragraph</span>
              <div className="flex gap-2">
                <SpeakButton text={paragraph} label="Read my room" />
                <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
                  Clear room
                </button>
              </div>
            </div>
            <p lang="es" className="leading-relaxed text-ink">
              {paragraph}
            </p>
          </div>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

// ===========================================================================
// 2. Colour + noun agreement mixer
// ===========================================================================

interface MixNoun {
  es: string;
  pl: string;
  g: G;
  en: string;
  enPl: string;
}
const MIX_NOUNS: MixNoun[] = [
  { es: "cama", pl: "camas", g: "f", en: "bed", enPl: "beds" },
  { es: "armario", pl: "armarios", g: "m", en: "wardrobe", enPl: "wardrobes" },
  { es: "lámpara", pl: "lámparas", g: "f", en: "lamp", enPl: "lamps" },
  { es: "cojín", pl: "cojines", g: "m", en: "cushion", enPl: "cushions" },
  { es: "cortina", pl: "cortinas", g: "f", en: "curtain", enPl: "curtains" },
  { es: "póster", pl: "pósteres", g: "m", en: "poster", enPl: "posters" },
  { es: "silla", pl: "sillas", g: "f", en: "chair", enPl: "chairs" },
  { es: "sofá", pl: "sofás", g: "m", en: "sofa", enPl: "sofas" },
  { es: "alfombra", pl: "alfombras", g: "f", en: "rug", enPl: "rugs" },
  { es: "escritorio", pl: "escritorios", g: "m", en: "desk", enPl: "desks" },
  { es: "pared", pl: "paredes", g: "f", en: "wall", enPl: "walls" },
  { es: "ordenador", pl: "ordenadores", g: "m", en: "computer", enPl: "computers" },
];

interface MixColour {
  ms: string;
  fs: string;
  mp: string;
  fp: string;
  en: string;
  hex: string;
  kind: "o" | "e" | "cons" | "fixed";
  alt?: string;
}
const MIX_COLOURS: MixColour[] = [
  { ms: "rojo", fs: "roja", mp: "rojos", fp: "rojas", en: "red", hex: "#ef4444", kind: "o" },
  { ms: "amarillo", fs: "amarilla", mp: "amarillos", fp: "amarillas", en: "yellow", hex: "#facc15", kind: "o" },
  { ms: "blanco", fs: "blanca", mp: "blancos", fp: "blancas", en: "white", hex: "#ffffff", kind: "o" },
  { ms: "negro", fs: "negra", mp: "negros", fp: "negras", en: "black", hex: "#1f2937", kind: "o" },
  { ms: "morado", fs: "morada", mp: "morados", fp: "moradas", en: "purple", hex: "#8b5cf6", kind: "o" },
  { ms: "verde", fs: "verde", mp: "verdes", fp: "verdes", en: "green", hex: "#22c55e", kind: "e" },
  { ms: "azul", fs: "azul", mp: "azules", fp: "azules", en: "blue", hex: "#3b82f6", kind: "cons" },
  { ms: "gris", fs: "gris", mp: "grises", fp: "grises", en: "grey", hex: "#9ca3af", kind: "cons" },
  { ms: "marrón", fs: "marrón", mp: "marrones", fp: "marrones", en: "brown", hex: "#92400e", kind: "cons" },
  { ms: "naranja", fs: "naranja", mp: "naranja", fp: "naranja", en: "orange", hex: "#f97316", kind: "fixed", alt: "naranjas" },
  { ms: "rosa", fs: "rosa", mp: "rosa", fp: "rosa", en: "pink", hex: "#f472b6", kind: "fixed", alt: "rosas" },
];

type Det = "def" | "indef" | "mi" | "nuestro";
const DET_FORMS: Record<Det, Record<G, [string, string]>> = {
  def: { m: ["el", "los"], f: ["la", "las"] },
  indef: { m: ["un", "unos"], f: ["una", "unas"] },
  mi: { m: ["mi", "mis"], f: ["mi", "mis"] },
  nuestro: { m: ["nuestro", "nuestros"], f: ["nuestra", "nuestras"] },
};

function cForm(c: MixColour, g: G, pl: boolean): string {
  return pl ? (g === "m" ? c.mp : c.fp) : g === "m" ? c.ms : c.fs;
}
/** Split a colour form into stem + the ending that agreement added. */
function splitForm(c: MixColour, g: G, pl: boolean): [string, string] {
  const f = cForm(c, g, pl);
  if (c.kind === "o") return [c.ms.slice(0, -1), f.slice(c.ms.length - 1)];
  if (c.kind === "e") return [c.ms, f.slice(c.ms.length)];
  if (c.kind === "cons" && pl) return [f.slice(0, -2), "es"];
  return [f, ""];
}

function NounIcon({ n, x, y, fill }: { n: MixNoun; x: number; y: number; fill: string }) {
  const st = { fill };
  const s = "stroke-ink";
  switch (n.es) {
    case "cama":
      return (
        <g>
          <rect x={x - 30} y={y - 34} width={6} height={34} className={s} style={st} />
          <rect x={x - 24} y={y - 18} width={54} height={10} className={s} style={st} />
          <rect x={x - 22} y={y - 24} width={14} height={6} rx={2} className={`fill-surface ${s}`} />
          <rect x={x + 24} y={y - 8} width={4} height={8} className={s} style={st} />
        </g>
      );
    case "armario":
    case "escritorio":
      return n.es === "armario" ? (
        <g>
          <rect x={x - 18} y={y - 56} width={36} height={56} rx={2} className={s} style={st} />
          <line x1={x} y1={y - 54} x2={x} y2={y - 2} className={s} />
        </g>
      ) : (
        <g>
          <rect x={x - 28} y={y - 30} width={56} height={6} className={s} style={st} />
          <rect x={x - 26} y={y - 24} width={5} height={24} className={s} style={st} />
          <rect x={x + 21} y={y - 24} width={5} height={24} className={s} style={st} />
        </g>
      );
    case "lámpara":
      return (
        <g>
          <rect x={x - 9} y={y - 4} width={18} height={4} className={`fill-ink-2 ${s}`} />
          <line x1={x} y1={y - 4} x2={x} y2={y - 26} className={s} strokeWidth={2} />
          <polygon points={`${x - 16},${y - 24} ${x + 16},${y - 24} ${x + 9},${y - 42} ${x - 9},${y - 42}`} className={s} style={st} />
        </g>
      );
    case "cojín":
      return <rect x={x - 18} y={y - 30} width={36} height={30} rx={10} className={s} style={st} />;
    case "cortina":
      return (
        <g>
          <line x1={x - 18} y1={y - 56} x2={x + 18} y2={y - 56} className={s} strokeWidth={2} />
          <path d={`M${x - 16} ${y - 56} L${x + 14} ${y - 56} Q${x + 4} ${y - 28} ${x + 14} ${y} L${x - 16} ${y} Z`} className={s} style={st} />
        </g>
      );
    case "póster":
      return (
        <g>
          <rect x={x - 16} y={y - 50} width={32} height={42} className={s} style={st} />
          <circle cx={x} cy={y - 34} r={7} className={`fill-surface ${s}`} />
        </g>
      );
    case "silla":
      return (
        <g>
          <rect x={x + 10} y={y - 50} width={6} height={26} className={s} style={st} />
          <rect x={x - 16} y={y - 26} width={32} height={5} className={s} style={st} />
          <rect x={x - 15} y={y - 21} width={4} height={21} className={s} style={st} />
          <rect x={x + 11} y={y - 21} width={4} height={21} className={s} style={st} />
        </g>
      );
    case "sofá":
      return (
        <g>
          <rect x={x - 30} y={y - 34} width={60} height={16} rx={4} className={s} style={st} />
          <rect x={x - 32} y={y - 22} width={64} height={16} rx={4} className={s} style={st} />
          <rect x={x - 28} y={y - 6} width={4} height={6} className="fill-ink" />
          <rect x={x + 24} y={y - 6} width={4} height={6} className="fill-ink" />
        </g>
      );
    case "alfombra":
      return <rect x={x - 30} y={y - 10} width={60} height={10} rx={3} className={s} style={st} />;
    case "pared":
      return (
        <g>
          <rect x={x - 26} y={y - 56} width={52} height={56} className={s} style={st} />
          <line x1={x - 26} y1={y - 28} x2={x + 26} y2={y - 28} className="stroke-ink-2" strokeDasharray="3 3" />
        </g>
      );
    case "ordenador":
      return (
        <g>
          <rect x={x - 22} y={y - 44} width={44} height={30} rx={2} className={s} style={st} />
          <rect x={x - 17} y={y - 39} width={34} height={20} className="fill-info-soft" />
          <rect x={x - 4} y={y - 14} width={8} height={10} className={s} style={st} />
          <rect x={x - 14} y={y - 4} width={28} height={4} className={s} style={st} />
        </g>
      );
    default:
      return <rect x={x - 20} y={y - 30} width={40} height={30} className={s} style={st} />;
  }
}

function ColourMixer() {
  const [nounIdx, setNounIdx] = useState(0);
  const [pl, setPl] = useState(false);
  const [det, setDet] = useState<Det>("indef");
  const [colIdx, setColIdx] = useState(0);
  const [predict, setPredict] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const n = MIX_NOUNS[nounIdx];
  const c = MIX_COLOURS[colIdx];
  const hide = predict && !revealed;
  const touch = () => setRevealed(false);

  const form = cForm(c, n.g, pl);
  const [stem, ending] = splitForm(c, n.g, pl);
  const d = DET_FORMS[det][n.g][pl ? 1 : 0];
  const noun = pl ? n.pl : n.es;
  const phrase = `${d} ${noun} ${form}`;
  const sentence = useMemo(() => {
    if (det === "indef") return `Tengo ${phrase}.`;
    return `${cap(d)} ${noun} ${pl ? "son" : "es"} ${form}.`;
  }, [det, phrase, d, noun, pl, form]);

  // Partner noun of the other gender for the four-endings grid.
  const partner = MIX_NOUNS.find((x) => x.g !== n.g && (n.g === "m" ? x.es === "cama" : x.es === "armario"))!;
  const mNoun = n.g === "m" ? n : partner;
  const fNoun = n.g === "f" ? n : partner;
  const cells: { g: G; pl: boolean; label: string; noun: MixNoun }[] = [
    { g: "m", pl: false, label: "masc. singular", noun: mNoun },
    { g: "f", pl: false, label: "fem. singular", noun: fNoun },
    { g: "m", pl: true, label: "masc. plural", noun: mNoun },
    { g: "f", pl: true, label: "fem. plural", noun: fNoun },
  ];
  const distinct = new Set([c.ms, c.fs, c.mp, c.fp]).size;

  const count = pl ? 3 : 1;
  const xs = pl ? [70, 160, 250] : [160];
  const aria = `${pl ? "Three" : "One"} ${c.en} ${pl ? n.enPl : n.en}`;

  let rule: ReactNode;
  if (c.kind === "o")
    rule = (
      <>
        <em>{c.ms}</em> ends in <strong>-o</strong>, so it has <strong>four</strong> forms: -o, -a, -os, -as.
      </>
    );
  else if (c.kind === "e")
    rule = (
      <>
        <em>{c.ms}</em> ends in <strong>-e</strong>: no separate feminine, so just <strong>two</strong> forms — add <em>-s</em> for plural.
      </>
    );
  else if (c.kind === "cons")
    rule = (
      <>
        <em>{c.ms}</em> ends in a <strong>consonant</strong>: two forms, plural adds <em>-es</em>
        {c.ms === "marrón" ? <> — and the accent drops: <em>marrones</em></> : null}.
      </>
    );
  else
    rule = (
      <>
        <em>{c.ms}</em> is named after a thing ({c.ms === "rosa" ? "a rose" : "an orange"}), so it usually <strong>never changes</strong>:{" "}
        <em lang="es">unas cortinas {c.ms}</em>. You&apos;ll also hear <em>{c.alt}</em>; <em lang="es">de color {c.ms}</em> is always safe.
      </>
    );

  return (
    <WidgetFrame
      title="Colour agreement mixer"
      tryThis={[
        "Turn on *Predict first*. Choose *las paredes* + *azul* — say the colour before you reveal it.",
        "Find a colour where all four boxes in the grid look the same. Why doesn't it change?",
        "Switch between *mi* and *nuestro* with a feminine noun. Which one changes and which one doesn't?",
        "*Marrón* has an accent. Make it plural — what happens to the accent?",
      ]}
      caption={
        <p>
          <em lang="es">{cap(n.es)}</em> is {n.g === "m" ? "masculine" : "feminine"}
          {pl ? " plural" : " singular"}, and colours go <strong>after</strong> the noun and copy its gender and number. {rule}{" "}
          {det === "mi" ? (
            <>
              <em>Mi/mis</em> only shows number (one thing or more), never gender.
            </>
          ) : det === "nuestro" ? (
            <>
              <em>Nuestro</em> agrees with the thing owned: <em>{d}</em>.
            </>
          ) : null}
        </p>
      }
    >
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-ink-2">
            Noun
            <select
              className="input !w-auto !py-2"
              value={nounIdx}
              onChange={(e) => {
                setNounIdx(Number(e.target.value));
                touch();
              }}
            >
              {MIX_NOUNS.map((x, i) => (
                <option key={x.es} value={i} lang="es">
                  {(x.g === "m" ? "el " : "la ") + x.es} ({x.en})
                </option>
              ))}
            </select>
          </label>
          <Segmented
            label="How many"
            value={pl ? "pl" : "sg"}
            onChange={(v) => {
              setPl(v === "pl");
              touch();
            }}
            options={[
              { value: "sg", label: "one" },
              { value: "pl", label: "more than one" },
            ]}
          />
        </div>
        <Segmented
          label="Word in front"
          value={det}
          onChange={(v) => {
            setDet(v);
            touch();
          }}
          options={[
            { value: "indef", label: <span lang="es">un / una</span> },
            { value: "def", label: <span lang="es">el / la</span> },
            { value: "mi", label: <span lang="es">mi</span> },
            { value: "nuestro", label: <span lang="es">nuestro</span> },
          ]}
        />
        <div role="radiogroup" aria-label="Colour" className="flex flex-wrap gap-2">
          {MIX_COLOURS.map((x, i) => (
            <button
              key={x.ms}
              type="button"
              role="radio"
              aria-checked={i === colIdx}
              aria-label={`${x.ms} (${x.en})`}
              title={`${x.ms} (${x.en})`}
              onClick={() => {
                setColIdx(i);
                touch();
              }}
              className={`h-11 w-11 rounded-full border-2 transition ${i === colIdx ? "border-brand ring-2 ring-brand ring-offset-2" : "border-line"}`}
              style={{ background: x.hex }}
            />
          ))}
        </div>

        <svg viewBox="0 0 320 90" className="h-auto w-full rounded-xl border border-line bg-surface-2" role="img" aria-label={aria}>
          <line x1={0} y1={80} x2={320} y2={80} className="stroke-line" />
          {xs.slice(0, count).map((x) => (
            <NounIcon key={x} n={n} x={x} y={80} fill={c.hex} />
          ))}
        </svg>

        <div className="rounded-xl border border-line bg-surface p-3">
          <div className="flex items-start justify-between gap-2">
            <p className="text-2xl font-extrabold text-ink" lang="es">
              {d} {noun}{" "}
              {hide ? (
                <span className="rounded bg-surface-2 px-2 text-ink-2">___ ({c.ms})</span>
              ) : (
                <span>
                  {stem}
                  {ending ? <span className="rounded bg-good-soft px-0.5 text-good">{ending}</span> : null}
                </span>
              )}
            </p>
            {!hide ? <SpeakButton text={phrase} /> : null}
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-ink-2" lang="es">
              {hide ? "…" : sentence}
            </p>
            {!hide ? <SpeakButton text={sentence} label="Listen to the sentence" /> : null}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <label className="flex min-h-[40px] items-center gap-2 text-sm font-semibold text-ink-2">
              <input
                type="checkbox"
                checked={predict}
                onChange={(e) => {
                  setPredict(e.target.checked);
                  setRevealed(false);
                }}
              />
              Predict first (hide the colour)
            </label>
            {hide ? (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setRevealed(true)}>
                Reveal
              </button>
            ) : null}
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-xs font-bold uppercase tracking-wide text-ink-2">
            <span>All four endings</span>
            <span>
              {distinct} different form{distinct === 1 ? "" : "s"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {cells.map((cell) => {
              const active = cell.g === n.g && cell.pl === pl;
              const [st, en] = splitForm(c, cell.g, cell.pl);
              const art = DET_FORMS.def[cell.g][cell.pl ? 1 : 0];
              const hideCell = hide && active;
              return (
                <button
                  key={cell.label}
                  type="button"
                  onClick={() => {
                    setNounIdx(MIX_NOUNS.indexOf(cell.noun));
                    setPl(cell.pl);
                    touch();
                  }}
                  aria-pressed={active}
                  className={`min-h-[44px] rounded-xl border p-2 text-left transition ${active ? "border-brand bg-brand-soft" : "border-line bg-surface hover:bg-surface-2"}`}
                >
                  <div className="text-[11px] font-bold uppercase tracking-wide text-ink-2">{cell.label}</div>
                  <div className="font-bold text-ink" lang="es">
                    {art} {cell.pl ? cell.noun.pl : cell.noun.es}{" "}
                    {hideCell ? (
                      "___"
                    ) : (
                      <>
                        {st}
                        {en ? <span className="text-good">{en}</span> : null}
                      </>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "mi-dormitorio-place-it",
    title: "Place it in the bedroom",
    blurb: "Tap furniture spots to place objects and watch the Spanish build: hay, está/están, encima de, debajo del…",
    Component: RoomPlacer,
  },
  {
    id: "mi-dormitorio-colour-mixer",
    title: "Colour agreement mixer",
    blurb: "Mix a noun, a number and a colour — see which ending the colour needs, and all four forms side by side.",
    Component: ColourMixer,
  },
];
