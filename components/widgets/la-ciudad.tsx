"use client";
// Interactive explorables for "En mi ciudad — Places in Town":
//  1. A town-map direction follower: tap Spanish directions and a walker moves
//     on an SVG street grid. Left/right are always relative to the walker's
//     heading, and the map shows what is on the walker's right and left.
//  2. A "hay" builder: place × quantity → En mi pueblo hay dos parques /
//     no hay cine, with gender/number agreement and plural spelling rules.
// tú commands are the él/ella present form, taken from the tested conjugator.
import { useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Segmented, Stepper, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate } from "@/lib/spanish/verbs";

type G = "m" | "f";
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const DEF: Record<G, string> = { m: "el", f: "la" };

function SpeakButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-sm min-h-10 min-w-10 shrink-0 px-2"
      onClick={() => speakSpanish(text)}
      aria-label={`Listen: ${text}`}
      title="Listen"
    >
      🔊
    </button>
  );
}

/** A piece of a Spanish sentence; `hl` pieces are highlighted to show the pattern. */
interface Seg {
  t: string;
  hl?: "det" | "end" | "neg" | "link";
}
const HL: Record<NonNullable<Seg["hl"]>, string> = {
  det: "text-brand font-extrabold",
  end: "text-good font-black underline decoration-2 underline-offset-4",
  neg: "text-bad font-extrabold",
  link: "text-accent font-extrabold",
};

function SpanishLine({ segs, label, english }: { segs: Seg[]; label: string; english?: string }) {
  const plain = segs.map((s) => s.t).join("");
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="text-xs font-bold uppercase tracking-wide text-ink-2">{label}</div>
      <div className="mt-2 flex items-start gap-3">
        <p lang="es" className="flex-1 text-xl font-semibold leading-snug text-ink sm:text-2xl" aria-live="polite">
          {segs.map((s, i) => (
            <span key={i} className={s.hl ? HL[s.hl] : undefined}>
              {s.t}
            </span>
          ))}
        </p>
        <SpeakButton text={plain} />
      </div>
      {english ? <p className="mt-2 text-sm italic text-ink-2">{english}</p> : null}
    </div>
  );
}

// ===========================================================================
// 1. Town-map direction follower
// ===========================================================================

const COLS = 5; // street intersections across (x = 0..4)
const ROWS = 4; // street intersections down (y = 0..3)
const SP = 84; // px between intersections
const MG = 32; // margin
const W = MG * 2 + SP * (COLS - 1);
const H = MG * 2 + SP * (ROWS - 1);
const px = (x: number) => MG + x * SP;
const py = (y: number) => MG + y * SP;

/** Headings: 0 = up the map, 1 = right (east), 2 = down, 3 = left (west). Screen y grows downwards. */
type Heading = 0 | 1 | 2 | 3;
const DIR: Record<Heading, [number, number]> = { 0: [0, -1], 1: [1, 0], 2: [0, 1], 3: [-1, 0] };
const MAP_DIR: Record<Heading, string> = { 0: "up the map (north)", 1: "to the right of the map (east)", 2: "down the map (south)", 3: "to the left of the map (west)" };
type Side = "derecha" | "izquierda";
/** Turning right is clockwise on the map whatever way you face: up → right → down → left. */
const turn = (h: Heading, s: Side): Heading => ((s === "derecha" ? h + 1 : h + 3) % 4) as Heading;
const inGrid = (x: number, y: number) => x >= 0 && x < COLS && y >= 0 && y < ROWS;

interface MapPlace {
  n: string;
  g: G;
  emoji: string;
  /** Label split over two lines to fit a block. */
  lines: [string, string?];
}
/** BLOCKS[by][bx]: the building filling the block between intersections (bx, by) and (bx+1, by+1). */
const BLOCKS: MapPlace[][] = [
  [
    { n: "biblioteca", g: "f", emoji: "📚", lines: ["la", "biblioteca"] },
    { n: "museo", g: "m", emoji: "🖼️", lines: ["el", "museo"] },
    { n: "cine", g: "m", emoji: "🎬", lines: ["el", "cine"] },
    { n: "estación de tren", g: "f", emoji: "🚆", lines: ["la estación", "de tren"] },
  ],
  [
    { n: "banco", g: "m", emoji: "🏦", lines: ["el", "banco"] },
    { n: "ayuntamiento", g: "m", emoji: "🏛️", lines: ["el", "ayuntamiento"] },
    { n: "iglesia", g: "f", emoji: "⛪", lines: ["la", "iglesia"] },
    { n: "piscina", g: "f", emoji: "🏊", lines: ["la", "piscina"] },
  ],
  [
    { n: "parque", g: "m", emoji: "🌳", lines: ["el", "parque"] },
    { n: "mercado", g: "m", emoji: "🧺", lines: ["el", "mercado"] },
    { n: "farmacia", g: "f", emoji: "💊", lines: ["la", "farmacia"] },
    { n: "centro comercial", g: "m", emoji: "🛍️", lines: ["el centro", "comercial"] },
  ],
];
const ALL_PLACES = BLOCKS.flat();
const the = (p: MapPlace) => `${DEF[p.g]} ${p.n}`;
const toThe = (p: MapPlace) => (p.g === "m" ? `al ${p.n}` : `a la ${p.n}`);

const SIGUE = conjugate("seguir", "present", "él");
const GIRA = conjugate("girar", "present", "él");
const TOMA = conjugate("tomar", "present", "él");
const TUERCE = "tuerce"; // torcer: fixed chunk (same meaning as gira)
const ORD = ["primera", "segunda", "tercera"] as const;
const ORD_EN = ["first", "second", "third"];

type Action = { k: "recto" } | { k: "gira"; side: Side } | { k: "toma"; n: 1 | 2 | 3; side: Side };

const actionEs = (a: Action): string =>
  a.k === "recto" ? `${SIGUE} todo recto` : a.k === "gira" ? `${GIRA} a la ${a.side}` : `${TOMA} la ${ORD[a.n - 1]} calle a la ${a.side}`;

interface Walk {
  x: number;
  y: number;
  h: Heading;
  /** Intersections visited, in order (for the trail). */
  path: [number, number][];
  steps: Action[];
  /** Heading before the last instruction (for the caption). */
  prevH: Heading;
}
const START: Walk = { x: 2, y: 3, h: 0, path: [[2, 3]], steps: [], prevH: 0 };

function apply(w: Walk, a: Action): { walk: Walk } | { error: string } {
  if (a.k === "recto") {
    const [dx, dy] = DIR[w.h];
    const nx = w.x + dx, ny = w.y + dy;
    if (!inGrid(nx, ny)) return { error: "Estás al final de la calle — you can't go straight on here. Try turning." };
    return { walk: { x: nx, y: ny, h: w.h, path: [...w.path, [nx, ny]], steps: [...w.steps, a], prevH: w.h } };
  }
  const nh = turn(w.h, a.side);
  const [tx, ty] = DIR[nh];
  if (a.k === "gira") {
    const nx = w.x + tx, ny = w.y + ty;
    if (!inGrid(nx, ny)) return { error: `No hay calle a la ${a.side} aquí — there's no street on your ${a.side === "derecha" ? "right" : "left"} at this corner.` };
    return { walk: { x: nx, y: ny, h: nh, path: [...w.path, [nx, ny]], steps: [...w.steps, a], prevH: w.h } };
  }
  // toma la N.ª calle: walk on, counting the side streets on that side, then turn into the Nth.
  const [dx, dy] = DIR[w.h];
  let cx = w.x, cy = w.y, count = 0;
  const path = [...w.path];
  for (;;) {
    cx += dx;
    cy += dy;
    if (!inGrid(cx, cy)) return { error: `No hay ${ORD[a.n - 1]} calle a la ${a.side} — the street ends first. Count the side streets again.` };
    path.push([cx, cy]);
    if (inGrid(cx + tx, cy + ty)) count++;
    if (count === a.n) break;
  }
  const nx = cx + tx, ny = cy + ty;
  path.push([nx, ny]);
  return { walk: { x: nx, y: ny, h: nh, path, steps: [...w.steps, a], prevH: w.h } };
}

/** The buildings on the walker's right and left along the street just walked. */
function sides(w: Walk): { right?: MapPlace; left?: MapPlace; rightPos?: [number, number]; leftPos?: [number, number] } {
  if (w.path.length < 2) return {};
  const [dx, dy] = DIR[w.h];
  const mx = w.x - dx / 2, my = w.y - dy / 2; // middle of the last block walked
  const block = (s: Side): [number, number] | undefined => {
    const [sx, sy] = DIR[turn(w.h, s)];
    const bx = Math.round(mx + sx / 2 - 0.5), by = Math.round(my + sy / 2 - 0.5);
    return bx >= 0 && bx < COLS - 1 && by >= 0 && by < ROWS - 1 ? [bx, by] : undefined;
  };
  const rp = block("derecha"), lp = block("izquierda");
  return { right: rp && BLOCKS[rp[1]][rp[0]], left: lp && BLOCKS[lp[1]][lp[0]], rightPos: rp, leftPos: lp };
}

const ALL_ACTIONS: Action[] = [
  ...([1, 2, 3] as const).flatMap((n) => (["derecha", "izquierda"] as Side[]).map((side): Action => ({ k: "toma", n, side }))),
  { k: "gira", side: "derecha" },
  { k: "gira", side: "izquierda" },
  { k: "recto" },
];

/** Shortest list of instructions from the start that leaves the target on the walker's right or left. */
function findRoute(target: MapPlace): Action[] | null {
  const seen = new Set<string>([`${START.x},${START.y},${START.h}`]);
  let frontier: Walk[] = [START];
  for (let depth = 0; depth < 6; depth++) {
    const next: Walk[] = [];
    for (const w of frontier) {
      for (const a of ALL_ACTIONS) {
        const r = apply(w, a);
        if ("error" in r) continue;
        const s = sides(r.walk);
        if (s.right === target || s.left === target) return r.walk.steps;
        const k = `${r.walk.x},${r.walk.y},${r.walk.h}`;
        if (!seen.has(k)) {
          seen.add(k);
          next.push(r.walk);
        }
      }
    }
    frontier = next;
  }
  return null;
}

function joinEs(parts: string[]): string {
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} y ${parts[parts.length - 1]}`;
}

function arrivalSentence(s: ReturnType<typeof sides>): string {
  const bits: string[] = [];
  if (s.right) bits.push(`${the(s.right)} está a la derecha`);
  if (s.left) bits.push(`${the(s.left)} está a la izquierda`);
  return bits.length ? cap(bits.join(" y ")) + "." : "";
}

function TownMap() {
  const [walk, setWalk] = useState<Walk>(START);
  const [error, setError] = useState<string | null>(null);
  const [ord, setOrd] = useState<1 | 2 | 3>(1);
  const [targetIdx, setTargetIdx] = useState(0);
  const [shown, setShown] = useState<Action[] | null>(null);
  const target = ALL_PLACES[targetIdx];

  const s = sides(walk);
  const arrived = s.right === target || s.left === target;
  const route = useMemo(() => findRoute(target), [target]);

  const doAction = (a: Action) => {
    const r = apply(walk, a);
    if ("error" in r) setError(r.error);
    else {
      setError(null);
      setShown(null);
      setWalk(r.walk);
    }
  };
  const reset = () => {
    setWalk(START);
    setError(null);
    setShown(null);
  };
  const showRoute = () => {
    if (!route) return;
    let w = START;
    for (const a of route) {
      const r = apply(w, a);
      if ("error" in r) break;
      w = r.walk;
    }
    setWalk(w);
    setError(null);
    setShown(route);
  };

  const directions = walk.steps.length ? cap(joinEs(walk.steps.map(actionEs))) + "." : "";
  const arrival = arrivalSentence(s);
  const spoken = [directions, arrival].filter(Boolean).join(" ");
  const last = walk.steps[walk.steps.length - 1];

  const blockFill = (bx: number, by: number) => {
    if (s.rightPos && s.rightPos[0] === bx && s.rightPos[1] === by) return "fill-brand-soft stroke-brand";
    if (s.leftPos && s.leftPos[0] === bx && s.leftPos[1] === by) return "fill-accent-soft stroke-accent";
    return "fill-surface stroke-line";
  };

  // Walker's own right / left markers.
  const [rx, ry] = DIR[turn(walk.h, "derecha")];
  const [lx, ly] = DIR[turn(walk.h, "izquierda")];
  const ariaMap = `Town map. The walker is facing ${MAP_DIR[walk.h]}.${s.right ? ` On their right: ${the(s.right)}.` : ""}${s.left ? ` On their left: ${the(s.left)}.` : ""} Target: ${the(target)}${arrived ? " — reached." : "."}`;

  let caption: ReactNode;
  if (!last) {
    caption = (
      <>
        You start at the red dot, walking <b>up</b> the map. Tap an instruction. <i lang="es">{cap(GIRA)} a la derecha</i> turns at the corner where you are;{" "}
        <i lang="es">{TOMA} la primera calle a la derecha</i> walks on to the <b>next</b> street on your right. (<i lang="es">{cap(TUERCE)} a la izquierda</i> means the same as <i lang="es">{GIRA} a la izquierda</i>.)
      </>
    );
  } else if (last.k === "recto") {
    caption = (
      <>
        <i lang="es">{cap(SIGUE)} todo recto</i> keeps your direction: you&apos;re still walking {MAP_DIR[walk.h]}. Look at the coloured blocks: the <span className="font-bold text-brand">blue</span> one is on <b>your</b> right, the{" "}
        <span className="font-bold text-accent">amber</span> one on your left.
      </>
    );
  } else {
    caption = (
      <>
        You were walking {MAP_DIR[walk.prevH]}, so <i lang="es">a la {last.side}</i> sent you {MAP_DIR[walk.h]}.{" "}
        {walk.prevH === 2
          ? "Facing down the map, your right is the screen's LEFT — right and left belong to the walker, never to the map."
          : walk.prevH === 0
            ? "Facing up the map, your right and the screen's right happen to match. Walk down the map and try again!"
            : "Right and left belong to the walker, not to the screen: turn the map in your head so you face the way you walk."}
        {last.k === "toma" ? (
          <>
            {" "}It was side street number {last.n} on your {last.side === "derecha" ? "right" : "left"} — <i lang="es">la {ORD[last.n - 1]} calle</i> ({ORD_EN[last.n - 1]}): the ordinal ends in <i>-a</i> to agree with <i lang="es">la calle</i>.
          </>
        ) : null}
      </>
    );
  }

  return (
    <WidgetFrame
      title="Town map: follow the directions"
      tryThis={[
        "From the start, reach *la biblioteca* using only two instructions.",
        "Walk down the map, then tap *gira a la derecha*. Which way does the walker go on the screen — and why?",
        "What's the difference between *gira a la izquierda* and *toma la primera calle a la izquierda*? Test both from the same corner.",
        "Pick a destination, say the route aloud in Spanish, then press *¿Por dónde se va…?* to check.",
      ]}
      caption={caption}
    >
      <div className="space-y-3">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={ariaMap}>
          <rect x={0} y={0} width={W} height={H} rx={14} className="fill-surface-2" />
          {/* Blocks (buildings) */}
          {BLOCKS.map((row, by) =>
            row.map((p, bx) => {
              const x0 = px(bx) + 9, y0 = py(by) + 9, sz = SP - 18;
              const isTarget = p === target;
              return (
                <g key={`${bx}-${by}`}>
                  <rect x={x0} y={y0} width={sz} height={sz} rx={8} className={blockFill(bx, by)} strokeWidth={1.5} />
                  {isTarget ? <rect x={x0 - 3} y={y0 - 3} width={sz + 6} height={sz + 6} rx={10} className="fill-none stroke-good" strokeWidth={3} strokeDasharray="6 4" /> : null}
                  <text x={x0 + sz / 2} y={y0 + 28} textAnchor="middle" fontSize={22}>
                    {p.emoji}
                  </text>
                  <text x={x0 + sz / 2} y={y0 + 46} textAnchor="middle" fontSize={10} fontWeight={700} className="fill-ink">
                    {p.lines[0]}
                  </text>
                  {p.lines[1] ? (
                    <text x={x0 + sz / 2} y={y0 + 58} textAnchor="middle" fontSize={p.lines[1].length > 10 ? 9 : 10} fontWeight={700} className="fill-ink">
                      {p.lines[1]}
                    </text>
                  ) : null}
                </g>
              );
            }),
          )}
          {/* Trail */}
          {walk.path.length > 1 ? (
            <polyline
              points={walk.path.map(([x, y]) => `${px(x)},${py(y)}`).join(" ")}
              className="fill-none stroke-brand"
              strokeWidth={4}
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeDasharray="2 7"
            />
          ) : null}
          {/* Start */}
          <circle cx={px(START.x)} cy={py(START.y)} r={7} className="fill-bad" />
          {/* Walker with its own right / left */}
          <g transform={`translate(${px(walk.x)} ${py(walk.y)})`}>
            <text x={rx * 22} y={ry * 22 + 4} textAnchor="middle" fontSize={11} fontWeight={800} className="fill-brand">
              der.
            </text>
            <text x={lx * 22} y={ly * 22 + 4} textAnchor="middle" fontSize={11} fontWeight={800} className="fill-accent">
              izq.
            </text>
            <g transform={`rotate(${walk.h * 90})`}>
              <circle r={12} className="fill-brand" />
              <polygon points="0,-8 6,5 0,2 -6,5" className="fill-surface" />
            </g>
          </g>
        </svg>

        {/* Controls */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => doAction({ k: "recto" })}>
              ⬆️ <span lang="es">{cap(SIGUE)} todo recto</span>
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => doAction({ k: "gira", side: "izquierda" })}>
              ↰ <span lang="es">{cap(GIRA)} a la izquierda</span>
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => doAction({ k: "gira", side: "derecha" })}>
              ↱ <span lang="es">{cap(GIRA)} a la derecha</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Segmented
              label="Which street"
              value={String(ord) as "1" | "2" | "3"}
              onChange={(v) => setOrd(Number(v) as 1 | 2 | 3)}
              options={ORD.map((o, i) => ({ value: String(i + 1) as "1" | "2" | "3", label: <span lang="es">{o}</span> }))}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => doAction({ k: "toma", n: ord, side: "izquierda" })}>
              <span lang="es">{cap(TOMA)} la {ORD[ord - 1]} calle a la izquierda</span>
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => doAction({ k: "toma", n: ord, side: "derecha" })}>
              <span lang="es">{cap(TOMA)} la {ORD[ord - 1]} calle a la derecha</span>
            </button>
          </div>
          <div className="flex flex-wrap items-end gap-2">
            <label className="block min-w-[10rem] flex-1 space-y-1">
              <span className="text-sm font-semibold text-ink-2">Destination (destino)</span>
              <select
                value={targetIdx}
                onChange={(e) => {
                  setTargetIdx(Number(e.target.value));
                  setShown(null);
                }}
                className="block min-h-10 w-full rounded-lg border border-line bg-surface px-2 text-base text-ink"
              >
                {ALL_PLACES.map((p, i) => (
                  <option key={p.n} value={i} lang="es">
                    {p.emoji} {the(p)}
                  </option>
                ))}
              </select>
            </label>
            <button type="button" className="btn btn-primary btn-sm" onClick={showRoute} disabled={!route}>
              <span lang="es">¿Por dónde se va {toThe(target)}?</span>
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
              ↺ Start again
            </button>
          </div>
        </div>

        {error ? (
          <p className="rounded-xl bg-bad-soft p-3 text-sm font-semibold text-bad" role="status">
            {error}
          </p>
        ) : null}

        <div className="grid grid-cols-2 gap-2">
          <Readout label="On your right" value={<span lang="es" className="text-base">{s.right ? `${s.right.emoji} ${the(s.right)}` : "—"}</span>} />
          <Readout label="On your left" value={<span lang="es" className="text-base">{s.left ? `${s.left.emoji} ${the(s.left)}` : "—"}</span>} tone="ink" />
        </div>

        {walk.steps.length ? (
          <div className="rounded-2xl border border-line bg-surface p-4">
            <div className="text-xs font-bold uppercase tracking-wide text-ink-2">{shown ? "The answer" : "Your route in Spanish"}</div>
            <div className="mt-2 flex items-start gap-3">
              <div lang="es" className="flex-1 space-y-1 text-lg font-semibold leading-snug text-ink" aria-live="polite">
                {shown ? <p className="text-ink-2">—Perdona, ¿por dónde se va {toThe(target)}?</p> : null}
                <p>
                  {shown ? "—" : ""}
                  {directions} <span className="text-brand">{arrival}</span>
                </p>
              </div>
              <SpeakButton text={spoken} />
            </div>
            {arrived ? (
              <p className="mt-2 font-bold text-good" role="status">
                ¡Has llegado! You&apos;ve reached {the(target)} — it&apos;s on your {s.right === target ? "right (a la derecha)" : "left (a la izquierda)"}.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

// ===========================================================================
// 2. "Hay" builder
// ===========================================================================

type Rule = "vowel" | "consonant" | "two" | "de";
interface HayPlace {
  id: string;
  n: string;
  g: G;
  /** Plural split so the ending can be highlighted. */
  plSegs: Seg[];
  en: string;
  enPl: string;
  emoji: string;
  rule: Rule;
  /** After "no hay", the natural form: no hay cine / no hay tiendas. */
  none: "sg" | "pl";
  /** Activity for "donde se puede…" (infinitive phrase + English). */
  act?: { es: string; en: string };
}
const end = (t: string): Seg => ({ t, hl: "end" });
const HAY_PLACES: HayPlace[] = [
  { id: "parque", n: "parque", g: "m", plSegs: [{ t: "parque" }, end("s")], en: "park", enPl: "parks", emoji: "🌳", rule: "vowel", none: "sg", act: { es: "pasear", en: "go for a walk" } },
  { id: "tienda", n: "tienda", g: "f", plSegs: [{ t: "tienda" }, end("s")], en: "shop", enPl: "shops", emoji: "🛍️", rule: "vowel", none: "pl", act: { es: "ir de compras", en: "go shopping" } },
  { id: "restaurante", n: "restaurante", g: "m", plSegs: [{ t: "restaurante" }, end("s")], en: "restaurant", enPl: "restaurants", emoji: "🍽️", rule: "vowel", none: "pl", act: { es: "comer paella de verduras", en: "eat vegetable paella" } },
  { id: "cine", n: "cine", g: "m", plSegs: [{ t: "cine" }, end("s")], en: "cinema", enPl: "cinemas", emoji: "🎬", rule: "vowel", none: "sg", act: { es: "ver una película", en: "watch a film" } },
  { id: "piscina", n: "piscina", g: "f", plSegs: [{ t: "piscina" }, end("s")], en: "swimming pool", enPl: "swimming pools", emoji: "🏊", rule: "vowel", none: "sg", act: { es: "nadar", en: "swim" } },
  { id: "playa", n: "playa", g: "f", plSegs: [{ t: "playa" }, end("s")], en: "beach", enPl: "beaches", emoji: "🏖️", rule: "vowel", none: "sg", act: { es: "tomar el sol", en: "sunbathe" } },
  { id: "museo", n: "museo", g: "m", plSegs: [{ t: "museo" }, end("s")], en: "museum", enPl: "museums", emoji: "🖼️", rule: "vowel", none: "sg", act: { es: "aprender historia", en: "learn history" } },
  { id: "biblioteca", n: "biblioteca", g: "f", plSegs: [{ t: "biblioteca" }, end("s")], en: "library", enPl: "libraries", emoji: "📚", rule: "vowel", none: "sg", act: { es: "leer", en: "read" } },
  { id: "polideportivo", n: "polideportivo", g: "m", plSegs: [{ t: "polideportivo" }, end("s")], en: "sports centre", enPl: "sports centres", emoji: "🏀", rule: "vowel", none: "sg", act: { es: "hacer deporte", en: "do sport" } },
  { id: "hospital", n: "hospital", g: "m", plSegs: [{ t: "hospital" }, end("es")], en: "hospital", enPl: "hospitals", emoji: "🏥", rule: "consonant", none: "sg" },
  { id: "catedral", n: "catedral", g: "f", plSegs: [{ t: "catedral" }, end("es")], en: "cathedral", enPl: "cathedrals", emoji: "⛪", rule: "consonant", none: "sg" },
  { id: "centro", n: "centro comercial", g: "m", plSegs: [{ t: "centro" }, end("s"), { t: " comercial" }, end("es")], en: "shopping centre", enPl: "shopping centres", emoji: "🏬", rule: "two", none: "sg", act: { es: "ir de compras", en: "go shopping" } },
  { id: "estacion", n: "estación de tren", g: "f", plSegs: [{ t: "estacion" }, end("es"), { t: " de tren" }], en: "train station", enPl: "train stations", emoji: "🚆", rule: "de", none: "sg", act: { es: "tomar el tren", en: "catch the train" } },
];

const RULE_EN: Record<Rule, string> = {
  vowel: "ends in a vowel → add -s",
  consonant: "ends in a consonant → add -es",
  two: "noun + adjective → both go plural",
  de: "-ión → -iones (accent disappears); the label after 'de' stays singular",
};

type Qty = "none" | "one" | "num" | "some" | "lots" | "several" | "ningun";
const NUM_ES = ["", "", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez"];
const NUM_EN = ["", "", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const DET: Record<"one" | "some" | "lots" | "several" | "ningun", Record<G, string>> = {
  one: { m: "un", f: "una" },
  some: { m: "unos", f: "unas" },
  lots: { m: "muchos", f: "muchas" },
  several: { m: "varios", f: "varias" },
  ningun: { m: "ningún", f: "ninguna" },
};
const FRAMES = [
  { es: "En mi pueblo", en: "In my village" },
  { es: "En mi ciudad", en: "In my town" },
  { es: "En mi barrio", en: "In my neighbourhood" },
];
const PUEDE = conjugate("poder", "present", "él");

function HayBuilder() {
  const [placeId, setPlaceId] = useState("parque");
  const [qty, setQty] = useState<Qty>("num");
  const [num, setNum] = useState(2);
  const [frameIdx, setFrameIdx] = useState(0);
  const [donde, setDonde] = useState(false);
  const p = HAY_PLACES.find((x) => x.id === placeId) ?? HAY_PLACES[0];
  const frame = FRAMES[frameIdx];
  const plural = qty === "num" || qty === "some" || qty === "lots" || qty === "several" || (qty === "none" && p.none === "pl");
  const neg = qty === "none" || qty === "ningun";
  const nounSegs: Seg[] = plural ? p.plSegs : [{ t: p.n }];
  const plainPl = p.plSegs.map((s) => s.t).join("");

  const segs: Seg[] = [{ t: `${frame.es} ` }];
  if (neg) segs.push({ t: "no hay", hl: "neg" }, { t: " " });
  else segs.push({ t: "hay " });
  if (qty === "num") segs.push({ t: NUM_ES[num], hl: "det" }, { t: " " });
  else if (qty !== "none") segs.push({ t: DET[qty][p.g], hl: "det" }, { t: " " });
  segs.push(...nounSegs);
  const canDonde = !!p.act;
  if (donde && p.act) {
    if (neg) segs.push({ t: ", " }, { t: "así que", hl: "link" }, { t: ` no se ${PUEDE} ${p.act.es}` });
    else segs.push({ t: " " }, { t: "donde", hl: "link" }, { t: ` se ${PUEDE} ${p.act.es}` });
  }
  segs.push({ t: "." });

  const enNoun = plural ? p.enPl : p.en;
  const enCore =
    qty === "none"
      ? plural
        ? `there aren't any ${enNoun}`
        : `there isn't a ${enNoun}`
      : qty === "ningun"
        ? `there isn't a single ${p.en}`
        : qty === "one"
          ? `there is a ${p.en}`
          : qty === "num"
            ? `there are ${NUM_EN[num]} ${enNoun}`
            : qty === "some"
              ? `there are some ${enNoun}`
              : qty === "lots"
                ? `there are lots of ${enNoun}`
                : `there are several ${enNoun}`;
  const enExtra = donde && p.act ? (neg ? `, so you can't ${p.act.en}` : ` where you can ${p.act.en}`) : "";
  const english = `${frame.en} ${enCore}${enExtra}.`;

  const qtyOptions: { value: Qty; label: ReactNode }[] = [
    { value: "none", label: <span lang="es">no hay</span> },
    { value: "one", label: <span lang="es">{DET.one[p.g]}</span> },
    { value: "num", label: <span lang="es">dos, tres…</span> },
    { value: "some", label: <span lang="es">{DET.some[p.g]}</span> },
    { value: "lots", label: <span lang="es">{DET.lots[p.g]}</span> },
    { value: "several", label: <span lang="es">{DET.several[p.g]}</span> },
    { value: "ningun", label: <span lang="es">{DET.ningun[p.g]} ★</span> },
  ];

  const genderWord = p.g === "m" ? "masculine" : "feminine";
  let caption: ReactNode;
  if (qty === "none") {
    caption = (
      <>
        After <i lang="es">no hay</i> the article disappears: <i lang="es">no hay {plural ? plainPl : p.n}</i>, never <i lang="es">no hay {plural ? DET.some[p.g] : DET.one[p.g]}…</i> — you&apos;re saying the whole category doesn&apos;t exist.{" "}
        {plural ? `With places a town usually has several of (shops, restaurants) English says "there aren't any", and Spanish uses the plural.` : `With a one-off place, Spanish uses the bare singular: there isn't a ${p.en}.`}
      </>
    );
  } else if (qty === "ningun") {
    caption = (
      <>
        Stretch: <i lang="es">{DET.ningun[p.g]}</i> = &apos;not a single&apos;. It agrees in gender ({genderWord}: <i lang="es">{DEF[p.g]} {p.n}</i>) but is <b>always singular</b> — and you still need <i lang="es">no</i> before <i lang="es">hay</i>.
        {p.g === "m" ? " Before a masculine noun ninguno shortens to ningún (with an accent), just like uno → un." : ""}
      </>
    );
  } else if (qty === "one") {
    caption = (
      <>
        <i lang="es">Hay</i> never changes. &apos;A&apos; agrees with the place: <i lang="es">{DEF[p.g]} {p.n}</i> is {genderWord}, so <i lang="es">{DET.one[p.g]} {p.n}</i>. Use <i lang="es">hay</i> + un/una for something new — never <i lang="es">hay {DEF[p.g]} {p.n}</i>.
      </>
    );
  } else {
    caption = (
      <>
        More than one → the place goes plural: <i lang="es">{plainPl}</i> ({RULE_EN[p.rule]}).{" "}
        {qty === "num"
          ? "Numbers from dos upwards don't change for gender."
          : `The quantity word agrees too: ${genderWord} plural → ${DET[qty][p.g]}.`}{" "}
        <i lang="es">Hay</i> itself stays the same whether there&apos;s one or ten.
      </>
    );
  }

  return (
    <WidgetFrame
      title="Hay builder: what's in your town?"
      tryThis={[
        "Make 'There are lots of shops'. Now switch to *el parque*: what happens to *muchas*?",
        "Choose *la estación de tren* and a number: which word goes plural — and what happens to the accent?",
        "Switch to *no hay*. Where did *un/una* go? Then try the ★ option: singular or plural?",
        "Turn on *donde se puede…* and build an examiner-style sentence, then a negative one with *así que*.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-ink-2">Place</span>
            <select value={placeId} onChange={(e) => setPlaceId(e.target.value)} className="block min-h-10 w-full rounded-lg border border-line bg-surface px-2 text-base text-ink">
              {HAY_PLACES.map((x) => (
                <option key={x.id} value={x.id} lang="es">
                  {x.emoji} {DEF[x.g]} {x.n}
                </option>
              ))}
            </select>
          </label>
          <div className="space-y-1">
            <div className="text-sm font-semibold text-ink-2">Where</div>
            <Segmented
              label="Where"
              value={String(frameIdx) as "0" | "1" | "2"}
              onChange={(v) => setFrameIdx(Number(v))}
              options={FRAMES.map((f, i) => ({ value: String(i) as "0" | "1" | "2", label: <span lang="es">{f.es.replace("En ", "")}</span> }))}
            />
          </div>
        </div>
        <div className="space-y-1">
          <div className="text-sm font-semibold text-ink-2">How many?</div>
          <Segmented label="How many" value={qty} onChange={setQty} options={qtyOptions} />
        </div>
        {qty === "num" ? <Stepper label="Number" value={num} min={2} max={10} onChange={setNum} format={(v) => <span lang="es">{NUM_ES[v]}</span>} /> : null}
        <label className={`flex min-h-10 items-center gap-2 text-sm font-semibold ${canDonde ? "text-ink" : "text-ink-2"}`}>
          <input type="checkbox" className="h-5 w-5" checked={donde && canDonde} disabled={!canDonde} onChange={(e) => setDonde(e.target.checked)} />
          <span>
            Add <i lang="es">donde se puede…</i> / <i lang="es">así que no se puede…</i>
            {canDonde ? "" : " (no activity for this place)"}
          </span>
        </label>

        <SpanishLine segs={segs} label="Your sentence" english={english} />

        <div className="grid grid-cols-2 gap-2">
          <Readout label="Gender" value={<span lang="es" className="text-base">{genderWord} · {DEF[p.g]} {p.n}</span>} />
          <Readout label="Plural" value={<span lang="es" className="text-base">{p.g === "m" ? "los" : "las"} {plainPl}</span>} tone="good" />
        </div>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "la-ciudad-town-map",
    title: "Town map: follow the directions",
    blurb: "Tap Spanish directions and watch the walker move. Right and left are the walker's — not the screen's.",
    Component: TownMap,
  },
  {
    id: "la-ciudad-hay-builder",
    title: "Hay builder: what's in your town?",
    blurb: "Pick a place and a quantity and watch hay un / una / unos / muchas / no hay agree, with plurals spelt out.",
    Component: HayBuilder,
  },
];
