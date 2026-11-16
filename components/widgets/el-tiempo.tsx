"use client";
import { useId, useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Slider, Stepper, Segmented, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, acceptedForms, PERSONS, type Person } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared weather lexicon. hacer / estar / ir come from the tested conjugator;
// llover, nevar and haber are impersonal weather verbs (one form per tense)
// that are not in the conjugator, so their forms are listed here.
// ---------------------------------------------------------------------------

type Fam = "hacer" | "estar" | "haber" | "llover" | "nevar";
type WKey = "sol" | "calor" | "frio" | "viento" | "lluvia" | "nieve" | "nubes" | "tormenta" | "niebla";
type WTense = "preterite" | "present" | "near-future";

interface WxDef {
  key: WKey;
  emoji: string;
  en: string;
  fam: Fam;
  /** Words after the verb ("" for llueve / nieva). */
  tail: string;
  /** Stronger version with mucho / mucha / muy. */
  strongTail?: string;
  /** Why that word (mucho / mucha / muy). */
  strongWhy?: ReactNode;
  /** Usual temperature when this symbol is first placed. */
  t0: number;
}

const WEATHER: WxDef[] = [
  { key: "sol", emoji: "☀️", en: "sunny", fam: "hacer", tail: "sol", strongTail: "mucho sol", strongWhy: <><em>sol</em> is a noun, so &lsquo;very&rsquo; is <em>mucho</em>.</>, t0: 25 },
  { key: "calor", emoji: "🥵", en: "hot", fam: "hacer", tail: "calor", strongTail: "mucho calor", strongWhy: <><em>calor</em> is a noun (&lsquo;heat&rsquo;), so it&rsquo;s <em>mucho calor</em> — never <em>muy calor</em>.</>, t0: 34 },
  { key: "frio", emoji: "🥶", en: "cold", fam: "hacer", tail: "frío", strongTail: "mucho frío", strongWhy: <><em>frío</em> is a noun here, so it&rsquo;s <em>mucho frío</em>.</>, t0: 4 },
  { key: "viento", emoji: "💨", en: "windy", fam: "hacer", tail: "viento", strongTail: "mucho viento", strongWhy: <><em>viento</em> is a noun, so it&rsquo;s <em>mucho viento</em>.</>, t0: 18 },
  { key: "lluvia", emoji: "🌧️", en: "rain", fam: "llover", tail: "", strongTail: "mucho", strongWhy: <>After a verb, &lsquo;a lot&rsquo; is <em>mucho</em> — it never changes.</>, t0: 15 },
  { key: "nieve", emoji: "❄️", en: "snow", fam: "nevar", tail: "", strongTail: "mucho", strongWhy: <>After a verb, &lsquo;a lot&rsquo; is <em>mucho</em> — it never changes.</>, t0: 0 },
  { key: "nubes", emoji: "☁️", en: "cloudy", fam: "estar", tail: "nublado", strongTail: "muy nublado", strongWhy: <><em>nublado</em> is an adjective, so &lsquo;very&rsquo; is <em>muy</em>.</>, t0: 18 },
  { key: "tormenta", emoji: "⛈️", en: "storm", fam: "haber", tail: "tormenta", t0: 26 },
  { key: "niebla", emoji: "🌫️", en: "fog", fam: "haber", tail: "niebla", strongTail: "mucha niebla", strongWhy: <><em>la niebla</em> is feminine, so <em>mucho</em> agrees: <em>mucha niebla</em>.</>, t0: 9 },
];
const WX = (k: WKey) => WEATHER.find((w) => w.key === k) ?? WEATHER[0];

const VA = conjugate("ir", "present", "él"); // "va"
const IMPERSONAL: Record<"haber" | "llover" | "nevar", { present: string; preterite: string }> = {
  llover: { present: "llueve", preterite: "llovió" },
  nevar: { present: "nieva", preterite: "nevó" },
  haber: { present: "hay", preterite: "hubo" },
};

function weatherVerb(fam: Fam, tense: WTense): string {
  if (fam === "hacer" || fam === "estar") return conjugate(fam, tense, "él");
  return tense === "near-future" ? `${VA} a ${fam}` : IMPERSONAL[fam][tense];
}

function weatherPhrase(w: WxDef, tense: WTense, strong: boolean): { verb: string; tail: string; full: string } {
  const verb = weatherVerb(w.fam, tense);
  const tail = strong && w.strongTail ? w.strongTail : w.tail;
  return { verb, tail, full: tail ? `${verb} ${tail}` : verb };
}

// Temperatures in words: "veintiún grados", "un grado", "dos grados bajo cero".
const UNITS = [
  "cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
  "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve",
  "veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve",
];
const TENS: Record<number, string> = { 3: "treinta", 4: "cuarenta" };
function numEs(n: number): string {
  if (n < 30) return UNITS[n];
  const t = Math.floor(n / 10), u = n % 10;
  return u ? `${TENS[t]} y ${UNITS[u]}` : TENS[t];
}
function grados(n: number): string {
  const a = Math.abs(n);
  let words: string;
  if (a === 1) words = "un grado";
  else if (a === 21) words = "veintiún grados";
  else if (a > 30 && a % 10 === 1) words = `${numEs(a).replace(/uno$/, "un")} grados`;
  else words = `${numEs(a)} grados`;
  return n < 0 ? `${words} bajo cero` : words;
}

function SpeakButton({ text, label = "Listen in Spanish" }: { text: string; label?: string }) {
  return (
    <button
      type="button"
      className="kbd shrink-0"
      style={{ minWidth: 40, minHeight: 40 }}
      onClick={() => speakSpanish(text, { slow: true })}
      aria-label={`${label}: ${text}`}
      title={label}
    >
      🔊
    </button>
  );
}

function WeatherPicker({ value, onChange, label }: { value: WKey | null; onChange: (k: WKey) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="grid grid-cols-5 gap-1.5 sm:grid-cols-9">
      {WEATHER.map((w) => {
        const on = w.key === value;
        return (
          <button
            key={w.key}
            type="button"
            role="radio"
            aria-checked={on}
            aria-label={w.en}
            onClick={() => onChange(w.key)}
            className={`flex min-h-12 flex-col items-center justify-center rounded-xl border px-1 py-1 transition ${on ? "border-brand bg-brand-soft" : "border-line bg-surface hover:bg-surface-2"}`}
          >
            <span className="text-xl leading-none" aria-hidden>{w.emoji}</span>
            <span className={`mt-0.5 text-[10px] font-bold leading-none ${on ? "text-brand" : "text-ink-2"}`}>{w.en}</span>
          </button>
        );
      })}
    </div>
  );
}

function StrongToggle({ on, disabled, onChange }: { on: boolean; disabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      aria-pressed={on && !disabled}
      disabled={disabled}
      onClick={() => onChange(!on)}
      className={`min-h-10 rounded-xl border px-3 text-sm font-bold transition disabled:opacity-50 ${on && !disabled ? "border-accent bg-accent-soft text-ink" : "border-line bg-surface text-ink-2"}`}
    >
      {on && !disabled ? "✓ " : ""}Stronger: <span lang="es">mucho / mucha / muy</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Widget 1: weather map of Spain
// ---------------------------------------------------------------------------

type Region = "noroeste" | "norte" | "noreste" | "oeste" | "centro" | "este" | "suroeste" | "sur" | "sureste";

interface RegionDef { id: Region; en: string; city: string; x: number; y: number; w: number; h: number; cx: number; cy: number }

// Simplified outline of mainland Spain (same as the guide's weather map), split into 9 compass regions.
const SPAIN =
  "78,18 110,22 143,27 175,26 202,29 230,37 261,34 268,38 290,46 324,57 350,62 372,64 400,64 426,66 430,70 420,82 405,95 393,104 364,114 351,129 340,140 322,155 312,173 322,190 331,200 318,206 309,213 304,226 302,239 285,255 265,268 254,272 230,270 210,272 183,272 165,282 145,298 130,288 123,279 110,268 95,262 87,255 84,226 100,197 90,168 103,147 106,118 126,96 110,85 62,82 40,87 39,71 30,60 26,50 40,40 55,33 65,24";

const REGIONS: RegionDef[] = [
  { id: "noroeste", en: "north-west", city: "Santiago de Compostela", x: 0, y: 0, w: 150, h: 105, cx: 88, cy: 58 },
  { id: "norte", en: "north", city: "Bilbao", x: 150, y: 0, w: 140, h: 105, cx: 220, cy: 64 },
  { id: "noreste", en: "north-east", city: "Barcelona", x: 290, y: 0, w: 170, h: 105, cx: 352, cy: 80 },
  { id: "oeste", en: "west", city: "Badajoz", x: 0, y: 105, w: 150, h: 95, cx: 126, cy: 150 },
  { id: "centro", en: "centre", city: "Madrid", x: 150, y: 105, w: 125, h: 95, cx: 212, cy: 150 },
  { id: "este", en: "east", city: "Valencia", x: 275, y: 105, w: 185, h: 95, cx: 304, cy: 146 },
  { id: "suroeste", en: "south-west", city: "Huelva", x: 0, y: 200, w: 150, h: 110, cx: 118, cy: 238 },
  { id: "sur", en: "south", city: "Málaga", x: 150, y: 200, w: 105, h: 110, cx: 204, cy: 238 },
  { id: "sureste", en: "south-east", city: "Murcia", x: 255, y: 200, w: 205, h: 110, cx: 282, cy: 224 },
];

interface Cell { w: WKey; t: number; strong: boolean }
type MapState = Record<Region, Cell | null>;

const INITIAL_MAP: MapState = {
  noroeste: null,
  norte: { w: "lluvia", t: 16, strong: false },
  noreste: { w: "nubes", t: 20, strong: false },
  oeste: null,
  centro: { w: "sol", t: 24, strong: false },
  este: { w: "viento", t: 22, strong: false },
  suroeste: null,
  sur: { w: "sol", t: 33, strong: false },
  sureste: null,
};

function forecastSentence(r: Region, c: Cell): string {
  return `En el ${r} ${weatherPhrase(WX(c.w), "present", c.strong).full} y hace ${grados(c.t)}.`;
}

function familyNote(w: WxDef): ReactNode {
  switch (w.fam) {
    case "hacer":
      return <>Weather you <strong>feel</strong> uses <em>hace</em> + noun: <em>hace {w.tail}</em>.</>;
    case "estar":
      return <>How the sky <strong>looks</strong> is an adjective, so it uses <em>está</em>: <em>está {w.tail}</em>.</>;
    case "haber":
      return <>Something that <strong>is there</strong> uses <em>hay</em> + noun: <em>hay {w.tail}</em>.</>;
    case "llover":
      return <>Rain has its own verb: <em>llover</em> (o→ue) → <em>llueve</em>.</>;
    case "nevar":
      return <>Snow has its own verb: <em>nevar</em> (e→ie) → <em>nieva</em>.</>;
  }
}

function tempNote(t: number): ReactNode {
  const a = Math.abs(t);
  if (t < 0) return <>Below zero: <em>{grados(t)}</em> (you can also say <em>menos {grados(a)}</em>).</>;
  if (a === 1) return <>One degree is singular: <em>un grado</em> (<em>uno</em> shortens to <em>un</em>).</>;
  if (a === 21 || (a > 30 && a % 10 === 1)) return <>{t} is <em>{numEs(a)}</em>, but before a masculine noun <em>uno</em> shortens: <em>{grados(t)}</em>.</>;
  if ([16, 22, 23, 26].includes(a)) return <>{t} = <em>{numEs(a)}</em> — one word, with an accent.</>;
  return <>{t} = <em>{numEs(a)}</em> → <em>{grados(t)}</em>.</>;
}

function sanityNote(c: Cell): string | null {
  if (c.w === "nieve" && c.t > 4) return `Snow at ${c.t} °C? Real snow needs it to be around 0 °C — try lowering the temperature.`;
  if (c.w === "calor" && c.t < 22) return `Hace calor at ${c.t} °C? For a Spanish forecaster that's not hot — try 30 °C or more.`;
  if (c.w === "frio" && c.t > 15) return `Hace frío at ${c.t} °C? That's mild — try something below 10 °C.`;
  return null;
}

function WeatherSymbol({ c, cx, cy }: { c: Cell; cx: number; cy: number }) {
  const w = WX(c.w);
  return (
    <g pointerEvents="none">
      <text x={cx} y={cy + 2} fontSize={c.strong ? 24 : 20} textAnchor="middle">{w.emoji}</text>
      <text x={cx} y={cy + 18} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-ink">{c.t}°</text>
    </g>
  );
}

function SpainMap() {
  const [data, setData] = useState<MapState>(INITIAL_MAP);
  const [sel, setSel] = useState<Region>("norte");
  const clipId = "spain-clip-" + useId().replace(/[^a-zA-Z0-9_-]/g, "");

  const cell = data[sel];
  const reg = REGIONS.find((r) => r.id === sel) ?? REGIONS[0];
  const w = cell ? WX(cell.w) : null;

  const update = (patch: Partial<Cell>) =>
    setData((d) => {
      const prev = d[sel];
      const base: Cell = prev ?? { w: patch.w ?? "sol", t: WX(patch.w ?? "sol").t0, strong: false };
      const next: Cell = { ...base, ...patch };
      if (!WX(next.w).strongTail) next.strong = false;
      return { ...d, [sel]: next };
    });

  const sentence = cell ? forecastSentence(sel, cell) : "";
  const all = useMemo(
    () => REGIONS.flatMap((r) => (data[r.id] ? [forecastSentence(r.id, data[r.id] as Cell)] : [])),
    [data],
  );

  const ariaMap =
    "Weather map of Spain split into nine regions. " +
    REGIONS.map((r) => {
      const c = data[r.id];
      return c ? `${r.en}: ${WX(c.w).en}, ${c.t} degrees` : `${r.en}: empty`;
    }).join("; ") +
    `. Selected: ${reg.en}.`;

  const parts = cell && w ? weatherPhrase(w, "present", cell.strong) : null;
  const warn = cell ? sanityNote(cell) : null;

  return (
    <WidgetFrame
      title="El pronóstico del tiempo: build a weather map"
      tryThis={[
        "Make the forecast *En el sur hace mucho calor y hace treinta y tres grados* — then press 🔊.",
        "Set the north-east to 21 °C. Predict first: *veintiuno grados* or *veintiún grados*?",
        "Put 🌫️ fog in the north-west and switch on *stronger*. Why *mucha* and not *mucho*?",
        "Fill all nine regions and read the whole forecast aloud like a TV presenter.",
      ]}
      caption={
        cell && w ? (
          <div className="space-y-1.5">
            <p>
              <strong lang="es">En el {sel}</strong> — compass points are masculine, so it&rsquo;s <em>en el</em> {sel}, never <em>en la</em>. (<span lang="es">{reg.city} está en el {sel}.</span>)
            </p>
            <p>
              {familyNote(w)} {cell.strong && w.strongWhy ? w.strongWhy : null}
            </p>
            <p>Temperature: <em>y hace</em> + number + <em>grados</em>. {tempNote(cell.t)}</p>
            {warn ? <p className="font-semibold text-bad">⚠️ {warn}</p> : null}
          </div>
        ) : (
          <p>
            <em>El {sel}</em> ({reg.en}) is empty. Pick a weather symbol to add it to the map — the frame is always{" "}
            <strong>En el + region + weather + y hace … grados</strong>.
          </p>
        )
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <svg viewBox="0 0 460 310" className="h-auto w-full" role="img" aria-label={ariaMap}>
            <defs>
              <clipPath id={clipId}>
                <polygon points={SPAIN} />
              </clipPath>
            </defs>
            <rect x={0} y={0} width={460} height={310} className="fill-info-soft" />
            <text x={60} y={190} fontSize={10} textAnchor="middle" className="fill-ink-2">PORTUGAL</text>
            <text x={350} y={32} fontSize={10} textAnchor="middle" className="fill-ink-2">FRANCIA</text>
            <ellipse cx={425} cy={168} rx={15} ry={9} className="fill-surface stroke-ink-2" strokeWidth={1} />
            <ellipse cx={456} cy={156} rx={8} ry={4} className="fill-surface stroke-ink-2" strokeWidth={1} />
            <ellipse cx={373} cy={192} rx={7} ry={5} className="fill-surface stroke-ink-2" strokeWidth={1} />
            <g clipPath={`url(#${clipId})`}>
              {REGIONS.map((r) => {
                const isSel = r.id === sel;
                const has = !!data[r.id];
                return (
                  <rect
                    key={r.id}
                    x={r.x}
                    y={r.y}
                    width={r.w}
                    height={r.h}
                    onClick={() => setSel(r.id)}
                    className={`cursor-pointer stroke-ink-2 ${isSel ? "fill-brand-soft" : has ? "fill-good-soft" : "fill-surface"}`}
                    strokeWidth={0.8}
                    strokeDasharray="4 3"
                  />
                );
              })}
            </g>
            <polygon points={SPAIN} fill="none" className="stroke-ink" strokeWidth={1.5} strokeLinejoin="round" pointerEvents="none" />
            {REGIONS.map((r) => {
              const c = data[r.id];
              return c ? (
                <WeatherSymbol key={r.id} c={c} cx={r.cx} cy={r.cy} />
              ) : (
                <text key={r.id} x={r.cx} y={r.cy + 4} fontSize={10} textAnchor="middle" className="fill-ink-2" pointerEvents="none">{r.id}</text>
              );
            })}
            {/* Compass: W is O for oeste */}
            <g pointerEvents="none">
              <path d="M410 240v40M390 260h40" className="stroke-ink-2" strokeWidth={1.5} />
              <path d="M410 236l-4 8h8z" className="fill-ink" />
              <g fontSize={11} fontWeight={800} textAnchor="middle" className="fill-ink">
                <text x={410} y={232}>N</text>
                <text x={410} y={294}>S</text>
                <text x={440} y={264}>E</text>
                <text x={380} y={264}>O</text>
              </g>
            </g>
          </svg>
          <p className="mt-1 text-xs text-ink-2">Tap a region on the map or use the compass buttons. On a Spanish compass W is <strong>O</strong> (<em>oeste</em>).</p>
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-1 text-sm font-semibold text-ink-2">Region</div>
            <div role="radiogroup" aria-label="Choose a region of Spain" className="grid grid-cols-3 gap-1.5">
              {REGIONS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={r.id === sel}
                  aria-label={`el ${r.id} (${r.en})`}
                  onClick={() => setSel(r.id)}
                  className={`min-h-10 rounded-lg border px-1 text-xs font-bold transition ${r.id === sel ? "border-brand bg-brand-soft text-brand" : data[r.id] ? "border-line bg-good-soft text-ink" : "border-line bg-surface text-ink-2"}`}
                  lang="es"
                >
                  {r.id}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm font-semibold text-ink-2">Weather in <span lang="es">el {sel}</span></div>
            <WeatherPicker value={cell?.w ?? null} onChange={(k) => update({ w: k, ...(cell ? {} : { t: WX(k).t0 }) })} label={`Weather symbol for the ${reg.en}`} />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StrongToggle on={!!cell?.strong} disabled={!cell || !w?.strongTail} onChange={(v) => update({ strong: v })} />
            <button
              type="button"
              disabled={!cell}
              onClick={() => setData((d) => ({ ...d, [sel]: null }))}
              className="min-h-10 rounded-xl border border-line bg-surface px-3 text-sm font-bold text-ink-2 disabled:opacity-50"
            >
              Clear region
            </button>
          </div>
          {cell ? (
            <Stepper label="Temperature" value={cell.t} min={-5} max={42} onChange={(v) => update({ t: v })} format={(v) => `${v} °C`} />
          ) : null}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-surface p-3">
        <div className="text-xs font-bold uppercase tracking-wide text-ink-2">Forecast for the {reg.en}</div>
        {cell && parts ? (
          <div className="mt-1 flex items-start justify-between gap-3">
            <p lang="es" className="text-lg font-bold leading-snug text-ink" aria-live="polite">
              En el <span className="text-brand">{sel}</span> <span className="underline decoration-accent decoration-2 underline-offset-4">{parts.full}</span> y hace{" "}
              <span className="text-brand">{grados(cell.t)}</span>.
            </p>
            <SpeakButton text={sentence} />
          </div>
        ) : (
          <p className="mt-1 text-sm text-ink-2">Pick a symbol to write the forecast.</p>
        )}
        {cell ? (
          <p className="mt-1 text-sm text-ink-2">
            Or: <span lang="es"><em>En el {sel} la temperatura {cell.t >= 15 ? "máxima" : "mínima"} es de {grados(cell.t)}.</em></span>
          </p>
        ) : null}
      </div>

      {all.length > 1 ? (
        <div className="mt-3 rounded-xl border border-line bg-surface-2 p-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs font-bold uppercase tracking-wide text-ink-2">The whole map ({all.length} regions)</div>
            <SpeakButton text={all.join(" ")} label="Read the whole forecast" />
          </div>
          <ul lang="es" className="mt-1 space-y-0.5 text-sm text-ink">
            {all.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// Widget 2: time machine (ayer / hoy / mañana)
// ---------------------------------------------------------------------------

const TIMES: { es: string; en: string; tense: WTense }[] = [
  { es: "El fin de semana pasado", en: "last weekend", tense: "preterite" },
  { es: "Ayer", en: "yesterday", tense: "preterite" },
  { es: "Hoy", en: "today", tense: "present" },
  { es: "Mañana", en: "tomorrow", tense: "near-future" },
  { es: "El fin de semana que viene", en: "next weekend", tense: "near-future" },
];

interface Activity { id: string; inf: string; rest: string; en: string }
const ACTIVITIES: Activity[] = [
  { id: "playa", inf: "ir", rest: "a la playa", en: "go to the beach" },
  { id: "casa", inf: "quedarse", rest: "en casa", en: "stay at home" },
  { id: "peli", inf: "ver", rest: "una película", en: "watch a film" },
  { id: "paseo", inf: "dar", rest: "un paseo", en: "go for a walk" },
  { id: "futbol", inf: "jugar", rest: "al fútbol", en: "play football" },
  { id: "nadar", inf: "nadar", rest: "en el mar", en: "swim in the sea" },
  { id: "esquiar", inf: "esquiar", rest: "en la montaña", en: "ski in the mountains" },
  { id: "leer", inf: "leer", rest: "un libro", en: "read a book" },
  { id: "centro", inf: "ir", rest: "al centro comercial", en: "go to the shopping centre" },
];

const PERSON_SHORT: Record<Person, string> = { yo: "yo", tú: "tú", él: "él / ella", nosotros: "nosotros", vosotros: "vosotros", ellos: "ellos / ellas" };

const TENSE_ROWS: { tense: WTense; label: string }[] = [
  { tense: "preterite", label: "pasado" },
  { tense: "present", label: "presente" },
  { tense: "near-future", label: "futuro" },
];

function weatherChangeNote(w: WxDef, tense: WTense): ReactNode {
  const pres = weatherVerb(w.fam, "present");
  if (tense === "present") return familyNote(w);
  if (tense === "near-future") {
    return (
      <>
        Future: <em>{VA} a</em> + infinitive. <em>{pres}</em> goes back to its infinitive <em>{w.fam}</em> → <em>{weatherVerb(w.fam, "near-future")}</em>. Weather is always <em>va</em> (&lsquo;it is going to&rsquo;), never <em>van</em>.
      </>
    );
  }
  const past = weatherVerb(w.fam, "preterite");
  switch (w.fam) {
    case "hacer":
    case "estar":
    case "haber":
      return <>Past: <em>{pres}</em> → <strong><em>{past}</em></strong>. <em>{w.fam}</em> is irregular in the preterite, and the stress falls on the stem, so there is <strong>no accent</strong>.</>;
    case "llover":
    case "nevar":
      return <>Past: <em>{pres}</em> → <strong><em>{past}</em></strong>. <em>{w.fam}</em> is regular: the stressed ending <em>-ó / -ió</em> needs an <strong>accent</strong>, and the stem change ({w.fam === "llover" ? "ue" : "ie"}) disappears.</>;
  }
}

const ACT_PAST_NOTE: Record<string, (p: Person) => ReactNode> = {
  ir: () => <><em>ir</em> is irregular in the preterite: <em>fui, fuiste, fue, fuimos, fuisteis, fueron</em>.</>,
  dar: () => <><em>dar</em> takes <em>-er/-ir</em> endings with no accents: <em>di, diste, dio…</em></>,
  ver: () => <><em>ver</em>: <em>vi, viste, vio…</em> — no accents on <em>vi</em> or <em>vio</em>.</>,
  jugar: (p) => (p === "yo" ? <><em>yo jugué</em>: g → gu keeps the hard &lsquo;g&rsquo; sound before <em>é</em>.</> : null),
  leer: (p) => (p === "él" || p === "ellos" ? <><em>leyó / leyeron</em>: the i becomes y between two vowels.</> : null),
};

function TimeMachine() {
  const [idx, setIdx] = useState(2);
  const [wk, setWk] = useState<WKey>("sol");
  const [strong, setStrong] = useState(false);
  const [person, setPerson] = useState<Person>("yo");
  const [actId, setActId] = useState("playa");
  const selectId = useId();

  const time = TIMES[idx];
  const w = WX(wk);
  const act = ACTIVITIES.find((a) => a.id === actId) ?? ACTIVITIES[0];
  const isStrong = strong && !!w.strongTail;

  const row = (tense: WTense) => {
    const wp = weatherPhrase(w, tense, isStrong);
    const verb = conjugate(act.inf, tense, person);
    return { wp, verb, act: `${verb} ${act.rest}` };
  };
  const cur = row(time.tense);
  const sentence = `${time.es} ${cur.wp.full}, así que ${cur.act}.`;
  const altVerb =
    time.tense === "near-future" && act.inf.endsWith("se") ? acceptedForms(act.inf, "near-future", person)[1] : null;

  const actNote: ReactNode =
    time.tense === "preterite" ? (
      <>
        The activity goes into the preterite too: <em>{act.inf}</em> → <strong><em>{cur.verb}</em></strong>. {ACT_PAST_NOTE[act.inf]?.(person) ?? null}
      </>
    ) : time.tense === "present" ? (
      <>The activity is in the present: <em>{act.inf}</em> → <strong><em>{cur.verb}</em></strong> ({PERSON_SHORT[person]}).</>
    ) : (
      <>
        For people, <em>ir</em> changes with the person: <strong><em>{cur.verb}</em></strong>
        {altVerb ? <> (or <em>{altVerb}</em> — the pronoun can go before <em>ir</em> or on the end of the infinitive)</> : null}.
      </>
    );

  // Timeline geometry
  const xs = [40, 115, 200, 285, 360];
  const ariaLine = `Timeline: ${time.es} (${time.en}), ${time.tense === "preterite" ? "preterite" : time.tense === "present" ? "present" : "immediate future"}. Weather: ${w.en}.`;

  return (
    <WidgetFrame
      title="Time machine: hizo → hace → va a hacer"
      tryThis={[
        "Pick 🌧️ and predict the past of *llueve* before you slide to *Ayer*. Where does the accent go?",
        "Pick ☁️ and slide through all five times. Which verb is hiding inside *estuvo*?",
        "Choose *nosotros* + *quedarse en casa* and slide to *Mañana*: find two correct places for *nos*.",
        "Switch on *stronger* with 🌫️: does *mucha niebla* change when the verb changes tense?",
      ]}
      caption={
        <div className="space-y-1.5">
          <p>
            <strong lang="es">{time.es}</strong> is a {time.tense === "preterite" ? "past" : time.tense === "present" ? "present" : "future"} signpost, so both verbs go into the{" "}
            <strong>{time.tense === "preterite" ? "preterite" : time.tense === "present" ? "present" : "immediate future"}</strong>.
          </p>
          <p>{weatherChangeNote(w, time.tense)} {isStrong && w.strongWhy ? <>The intensifier stays the same in every tense — {w.strongWhy}</> : null}</p>
          <p>{actNote}</p>
        </div>
      }
    >
      <Slider
        label="When?"
        value={idx}
        min={0}
        max={4}
        onChange={setIdx}
        format={(v) => <span lang="es">{TIMES[v].es}</span>}
      />

      <svg viewBox="0 0 400 74" className="mt-2 h-auto w-full" role="img" aria-label={ariaLine}>
        <rect x={10} y={30} width={142} height={10} rx={5} className="fill-info-soft" />
        <rect x={160} y={30} width={80} height={10} rx={5} className="fill-accent-soft" />
        <rect x={248} y={30} width={142} height={10} rx={5} className="fill-brand-soft" />
        <g fontSize={11} fontWeight={700} textAnchor="middle" className="fill-ink-2">
          <text x={81} y={62}>pretérito</text>
          <text x={200} y={62}>presente</text>
          <text x={319} y={62}>futuro inmediato</text>
        </g>
        {xs.map((x, i) => (
          <circle
            key={x}
            cx={x}
            cy={35}
            r={i === idx ? 9 : 5}
            className={i === idx ? "fill-brand stroke-surface" : "fill-surface stroke-ink-2"}
            strokeWidth={2}
            onClick={() => setIdx(i)}
            style={{ cursor: "pointer" }}
          />
        ))}
        <text x={xs[idx]} y={20} fontSize={18} textAnchor="middle" pointerEvents="none">{w.emoji}</text>
      </svg>

      <div className="mt-3 space-y-3">
        <div>
          <div className="mb-1 text-sm font-semibold text-ink-2">Weather</div>
          <WeatherPicker value={wk} onChange={setWk} label="Weather symbol" />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StrongToggle on={strong} disabled={!w.strongTail} onChange={setStrong} />
          <div className="flex items-center gap-2">
            <label htmlFor={selectId} className="text-sm font-semibold text-ink-2">Activity</label>
            <select
              id={selectId}
              value={actId}
              onChange={(e) => setActId(e.target.value)}
              className="min-h-10 rounded-xl border border-line bg-surface px-2 text-sm text-ink"
            >
              {ACTIVITIES.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.inf} {a.rest} ({a.en})
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <div className="mb-1 text-sm font-semibold text-ink-2">Who?</div>
          <Segmented<Person>
            label="Person for the activity"
            value={person}
            onChange={setPerson}
            options={PERSONS.map((p) => ({ value: p, label: <span lang="es">{PERSON_SHORT[p]}</span> }))}
          />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-surface p-3">
        <div className="text-xs font-bold uppercase tracking-wide text-ink-2">Your sentence ({time.en})</div>
        <div className="mt-1 flex items-start justify-between gap-3">
          <p lang="es" className="text-lg font-bold leading-snug text-ink" aria-live="polite">
            {time.es} <span className="text-brand">{cur.wp.verb}</span>
            {cur.wp.tail ? ` ${cur.wp.tail}` : ""}, así que <span className="text-brand">{cur.verb}</span> {act.rest}.
          </p>
          <SpeakButton text={sentence} />
        </div>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[300px] border-separate border-spacing-y-1 text-sm">
          <caption className="sr-only">The same sentence in the past, present and future</caption>
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-ink-2">
              <th scope="col" className="px-2">tiempo</th>
              <th scope="col" className="px-2">weather</th>
              <th scope="col" className="px-2">activity</th>
            </tr>
          </thead>
          <tbody lang="es">
            {TENSE_ROWS.map((r) => {
              const x = row(r.tense);
              const on = r.tense === time.tense;
              return (
                <tr key={r.tense} className={on ? "bg-brand-soft font-bold text-ink" : "text-ink-2"}>
                  <th scope="row" className="rounded-l-lg px-2 py-1.5 text-left font-semibold">{r.label}</th>
                  <td className="px-2 py-1.5">{x.wp.full}</td>
                  <td className="rounded-r-lg px-2 py-1.5">{x.act}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "el-tiempo-weather-map",
    title: "Weather map of Spain",
    blurb: "Tap a region, choose a symbol and a temperature, and watch the forecast write itself: En el norte llueve y hace quince grados.",
    Component: SpainMap,
  },
  {
    id: "el-tiempo-time-machine",
    title: "Weather time machine",
    blurb: "Slide from last weekend to next weekend and watch the weather and your plans re-conjugate: hizo sol → hace sol → va a hacer sol.",
    Component: TimeMachine,
  },
];
