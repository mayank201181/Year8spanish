"use client";
// Interactive explorables for "¿Dónde vives?": an opinion-o-meter (opinion
// strength × who × what × reason) and a comparison builder (más / menos /
// tan / mejor / peor with adjective agreement). Verb forms come from the
// tested conjugator; gustar-type forms (gusta / gustan) are fixed chunks.
import { useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Slider, Segmented, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, type Person } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared lexicon
// ---------------------------------------------------------------------------

type Gender = "m" | "f";

interface Adj {
  id: string;
  /** Masculine singular. All regular -o adjectives. */
  es: string;
  en: string;
  /** English comparative: quieter, more boring. */
  er: string;
}

const ADJS: Adj[] = [
  { id: "tranquilo", es: "tranquilo", en: "quiet", er: "quieter" },
  { id: "ruidoso", es: "ruidoso", en: "noisy", er: "noisier" },
  { id: "animado", es: "animado", en: "lively", er: "livelier" },
  { id: "aburrido", es: "aburrido", en: "boring", er: "more boring" },
  { id: "bonito", es: "bonito", en: "pretty", er: "prettier" },
  { id: "feo", es: "feo", en: "ugly", er: "uglier" },
  { id: "limpio", es: "limpio", en: "clean", er: "cleaner" },
  { id: "sucio", es: "sucio", en: "dirty", er: "dirtier" },
  { id: "seguro", es: "seguro", en: "safe", er: "safer" },
  { id: "peligroso", es: "peligroso", en: "dangerous", er: "more dangerous" },
];

const ending = (g: Gender, pl: boolean) => (g === "m" ? "o" : "a") + (pl ? "s" : "");
const gnLabel = (g: Gender, pl: boolean) => `${g === "m" ? "masculine" : "feminine"} ${pl ? "plural" : "singular"}`;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const ser = (pl: boolean) => conjugate("ser", "present", pl ? "ellos" : "él");
const estar = (pl: boolean) => conjugate("estar", "present", pl ? "ellos" : "él");

/** A piece of a Spanish sentence; `hl` pieces are highlighted to show the pattern. */
interface Seg {
  t: string;
  hl?: "verb" | "end" | "pron" | "adj" | "link";
}

const HL_CLASS: Record<NonNullable<Seg["hl"]>, string> = {
  verb: "text-brand font-extrabold",
  end: "text-good font-black underline decoration-2 underline-offset-4",
  pron: "text-accent font-extrabold",
  adj: "text-brand font-extrabold",
  link: "text-ink font-extrabold underline decoration-dotted underline-offset-4",
};

function SpanishLine({ segs, label }: { segs: Seg[]; label: string }) {
  const plain = segs.map((s) => s.t).join("");
  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="text-xs font-bold uppercase tracking-wide text-ink-2">{label}</div>
      <div className="mt-2 flex items-start gap-3">
        <p lang="es" className="flex-1 text-xl font-semibold leading-snug text-ink sm:text-2xl" aria-live="polite">
          {segs.map((s, i) => (
            <span key={i} className={s.hl ? HL_CLASS[s.hl] : undefined}>
              {s.t}
            </span>
          ))}
        </p>
        <button
          type="button"
          className="btn btn-secondary btn-sm min-h-10 min-w-10 shrink-0"
          onClick={() => speakSpanish(plain)}
          aria-label={`Listen: ${plain}`}
          title="Listen"
        >
          🔊
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-semibold text-ink-2">{label}</div>
      {children}
    </div>
  );
}

function Select<T extends string>({ label, value, onChange, options }: { label: string; value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-semibold text-ink-2">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="block min-h-10 w-full rounded-lg border border-line bg-surface px-2 text-base text-ink"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const Es = ({ children }: { children: ReactNode }) => (
  <em lang="es" className="font-semibold not-italic text-brand">
    {children}
  </em>
);

// ---------------------------------------------------------------------------
// Widget 1: Opinion-o-meter
// ---------------------------------------------------------------------------

const LEVELS = [
  { es: "odio", en: "hate" },
  { es: "no me gusta nada", en: "don't like … at all" },
  { es: "no me gusta", en: "don't like" },
  { es: "me gusta", en: "like" },
  { es: "me gusta mucho", en: "really like" },
  { es: "me encanta", en: "love" },
  { es: "me chifla", en: "am crazy about" },
] as const;

type Who = "yo" | "madre" | "padres";
const WHO: Record<Who, { person: Person; aPhrase: string; pron: string; subj: string; enSubj: string; s3: boolean }> = {
  yo: { person: "yo", aPhrase: "", pron: "me", subj: "", enSubj: "I", s3: false },
  madre: { person: "él", aPhrase: "A mi madre ", pron: "le", subj: "Mi madre", enSubj: "My mother", s3: true },
  padres: { person: "ellos", aPhrase: "A mis padres ", pron: "les", subj: "Mis padres", enSubj: "My parents", s3: false },
};

interface Thing {
  id: string;
  es: string;
  en: string;
  /** Is the liked thing plural (→ gustan)? */
  pl: boolean;
  inf: boolean;
  /** The place the reason describes (for agreement). */
  place: string;
  g: Gender;
  placePl: boolean;
}
const THINGS: Thing[] = [
  { id: "vivir-campo", es: "vivir en el campo", en: "living in the countryside", pl: false, inf: true, place: "el campo", g: "m", placePl: false },
  { id: "vivir-ciudad", es: "vivir en la ciudad", en: "living in the city", pl: false, inf: true, place: "la ciudad", g: "f", placePl: false },
  { id: "barrio", es: "mi barrio", en: "my neighbourhood", pl: false, inf: false, place: "mi barrio", g: "m", placePl: false },
  { id: "ciudad", es: "mi ciudad", en: "my city", pl: false, inf: false, place: "mi ciudad", g: "f", placePl: false },
  { id: "costa", es: "la costa", en: "the coast", pl: false, inf: false, place: "la costa", g: "f", placePl: false },
  { id: "parques", es: "los parques de mi barrio", en: "the parks in my neighbourhood", pl: true, inf: false, place: "los parques", g: "m", placePl: true },
  { id: "playas", es: "las playas de Málaga", en: "the beaches in Málaga", pl: true, inf: false, place: "las playas", g: "f", placePl: true },
  { id: "afueras", es: "las afueras", en: "the outskirts", pl: true, inf: false, place: "las afueras", g: "f", placePl: true },
];

type ReasonId = "es" | "hay-mucho" | "no-hay" | "ruido" | "cerca" | "lejos";
const REASONS: { value: ReasonId; label: string }[] = [
  { value: "es", label: "es / son + adjective" },
  { value: "hay-mucho", label: "hay mucho que hacer" },
  { value: "no-hay", label: "no hay nada que hacer" },
  { value: "ruido", label: "hay mucho ruido" },
  { value: "cerca", label: "está(n) cerca del mar" },
  { value: "lejos", label: "está(n) lejos del centro" },
];

const INTENS = [
  { value: "none", es: "", en: "" },
  { value: "muy", es: "muy ", en: "very " },
  { value: "bastante", es: "bastante ", en: "quite " },
  { value: "un poco", es: "un poco ", en: "a bit " },
  { value: "demasiado", es: "demasiado ", en: "too " },
] as const;
type IntensId = (typeof INTENS)[number]["value"];

/** Gauge colour per opinion level (theme tokens). */
const LEVEL_STROKE = ["stroke-bad", "stroke-bad", "stroke-warn", "stroke-accent", "stroke-good", "stroke-good", "stroke-brand"];

function Gauge({ level }: { level: number }) {
  const cx = 160;
  const cy = 130;
  const r = 100;
  const n = LEVELS.length;
  const pt = (deg: number, rad = r) => {
    const a = (deg * Math.PI) / 180;
    return [cx + rad * Math.cos(a), cy - rad * Math.sin(a)] as const;
  };
  const gap = 2;
  const step = 180 / n;
  const mid = 180 - (level + 0.5) * step;
  const [nx, ny] = pt(mid, r - 22);
  return (
    <svg viewBox="0 0 320 150" className="mx-auto h-auto w-full max-w-sm" role="img" aria-label={`Opinion meter pointing at ${LEVELS[level].es} (${LEVELS[level].en}), level ${level + 1} of ${n}`}>
      {LEVELS.map((_, i) => {
        const a0 = 180 - i * step - gap / 2;
        const a1 = 180 - (i + 1) * step + gap / 2;
        const [x0, y0] = pt(a0);
        const [x1, y1] = pt(a1);
        return (
          <path
            key={i}
            d={`M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`}
            className={LEVEL_STROKE[i]}
            fill="none"
            strokeWidth={i === level ? 22 : 16}
            strokeLinecap="butt"
            opacity={i === level ? 1 : 0.3}
          />
        );
      })}
      <line x1={cx} y1={cy} x2={nx.toFixed(1)} y2={ny.toFixed(1)} className="stroke-ink" strokeWidth={4} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={8} className="fill-ink" />
      <text x={pt(180, r)[0]} y={cy + 16} textAnchor="middle" fontSize={12} className="fill-ink-2">
        odio
      </text>
      <text x={pt(0, r)[0]} y={cy + 16} textAnchor="middle" fontSize={12} className="fill-ink-2">
        me chifla
      </text>
    </svg>
  );
}

function OpinionOMeter() {
  const [level, setLevel] = useState(5);
  const [who, setWho] = useState<Who>("yo");
  const [thingId, setThingId] = useState("parques");
  const [reason, setReason] = useState<ReasonId>("es");
  const [adjId, setAdjId] = useState("bonito");
  const [intens, setIntens] = useState<IntensId>("muy");
  const [conn, setConn] = useState<"porque" | "ya que">("porque");

  const thing = THINGS.find((t) => t.id === thingId) ?? THINGS[0];
  const adj = ADJS.find((a) => a.id === adjId) ?? ADJS[0];
  const w = WHO[who];
  const it = INTENS.find((x) => x.value === intens) ?? INTENS[0];

  const built = useMemo(() => {
    const segs: Seg[] = [];
    const notes: ReactNode[] = [];
    let enOpinion: string;

    if (level === 0) {
      const odio = conjugate("odiar", "present", w.person);
      if (who === "yo") segs.push({ t: cap(odio), hl: "verb" });
      else segs.push({ t: `${w.subj} ` }, { t: odio, hl: "verb" });
      segs.push({ t: ` ${thing.es}` });
      enOpinion = `${w.enSubj} ${w.s3 ? "hates" : "hate"} ${thing.en}`;
      notes.push(
        <li key="odio">
          <Es>{odio}</Es> comes from <Es>odiar</Es>, an ordinary verb: {who === "yo" ? "you are" : `${w.enSubj.toLowerCase()} ${w.s3 ? "is" : "are"}`} the subject, so there is no <Es>me / le / les</Es> and it never agrees with <Es>{thing.es}</Es>.
        </li>,
      );
    } else {
      const neg = level <= 2;
      const nada = level === 1;
      const mucho = level === 4;
      const stem = level === 5 ? "encanta" : level === 6 ? "chifla" : "gusta";
      const start = w.aPhrase ? w.aPhrase + (neg ? "no " : "") : neg ? "No " : "";
      if (start) segs.push({ t: start });
      const pronText = start ? w.pron : cap(w.pron);
      segs.push({ t: pronText, hl: "pron" }, { t: " " }, { t: stem, hl: "verb" });
      if (thing.pl) segs.push({ t: "n", hl: "end" });
      if (nada) segs.push({ t: " nada" });
      if (mucho) segs.push({ t: " mucho" });
      segs.push({ t: ` ${thing.es}` });
      const enV = LEVELS[level].en;
      const enVerb = w.s3
        ? enV.replace("don't", "doesn't").replace(/^like/, "likes").replace("really like", "really likes").replace(/^love/, "loves").replace("am crazy", "is crazy")
        : who === "padres"
          ? enV.replace("am crazy", "are crazy")
          : enV;
      enOpinion = nada ? `${w.enSubj} ${enVerb.replace(" … at all", "")} ${thing.en} at all` : `${w.enSubj} ${enVerb} ${thing.en}`;
      notes.push(
        <li key="who">
          Who is pleased? {who === "yo" ? "You" : w.enSubj.replace("My", "your")} → <Es>{w.pron}</Es>
          {who !== "yo" ? (
            <>
              {" "}(Spanish also names the person: <Es>{w.aPhrase.trim().toLowerCase()}</Es>)
            </>
          ) : null}
          .
        </li>,
        <li key="what">
          What pleases? <Es>{thing.es}</Es> — {thing.inf ? "an activity, which counts as one thing" : thing.pl ? "plural" : "one thing"} → <Es>{stem + (thing.pl ? "n" : "")}</Es>. The verb agrees with the thing, never with the person.
        </li>,
      );
      if (neg) notes.push(<li key="neg"><Es>No</Es> goes in front of <Es>{w.pron}</Es>{nada ? <>; <Es>nada</Es> after the verb makes it 'not at all'</> : null}.</li>);
    }

    // Reason
    const p = thing.placePl;
    segs.push({ t: " " }, { t: conn, hl: "link" }, { t: " " });
    let enReason: string;
    if (reason === "es") {
      const v = ser(p);
      const stem = adj.es.slice(0, -1);
      segs.push({ t: `${v} ${it.es}` }, { t: stem, hl: "adj" }, { t: ending(thing.g, p), hl: "end" });
      enReason = `${p ? "they are" : "it is"} ${it.en}${adj.en}`;
      notes.push(
        <li key="adj">
          The adjective describes <Es>{thing.place}</Es> ({gnLabel(thing.g, p)}) → <Es>{stem + ending(thing.g, p)}</Es>, with <Es>{v}</Es> because {p ? "there are several of them" : "it is one place"}.
        </li>,
      );
    } else if (reason === "cerca" || reason === "lejos") {
      const v = estar(p);
      segs.push({ t: `${v} ${reason === "cerca" ? "cerca del mar" : "lejos del centro"}` });
      enReason = `${p ? "they are" : "it is"} ${reason === "cerca" ? "near the sea" : "far from the centre"}`;
      notes.push(<li key="esta">Location uses <Es>estar</Es>: <Es>{v}</Es>, never <Es>{ser(p)}</Es>. (<Es>de + el = del</Es>.)</li>);
    } else {
      const map = { "hay-mucho": ["hay mucho que hacer", "there's a lot to do"], "no-hay": ["no hay nada que hacer", "there's nothing to do"], ruido: ["hay mucho ruido", "there's a lot of noise"] } as const;
      const [es, en] = map[reason];
      segs.push({ t: es });
      enReason = en;
      notes.push(<li key="hay"><Es>Hay</Es> (there is / there are) never changes — singular or plural.</li>);
    }
    segs.push({ t: "." });
    const en = `${enOpinion} ${conn === "porque" ? "because" : "since"} ${enReason}.`;
    return { segs, notes, en };
  }, [level, who, thing, reason, adj, it, conn, w]);

  const mismatch =
    (level <= 2 && (reason === "hay-mucho" || (reason === "es" && ["tranquilo", "animado", "bonito", "limpio", "seguro"].includes(adj.id)))) ||
    (level >= 3 && (reason === "no-hay" || reason === "ruido" || (reason === "es" && ["ruidoso", "aburrido", "feo", "sucio", "peligroso"].includes(adj.id))));

  return (
    <WidgetFrame
      title="Opinion-o-meter"
      tryThis={[
        "Slide to *me chifla* with *los parques de mi barrio*. Which letter appears on the verb, and why?",
        "Switch *Who?* to *mis padres*. Which little word changes — and does *gusta / gustan* change too?",
        "Pick *la costa* with *es + adjective* and *tranquilo*. Predict the ending before you look.",
        "Slide right down to *odio*. Why do *me / le / les* disappear?",
      ]}
      caption={
        <div className="space-y-2">
          <ul className="list-disc space-y-1 pl-5">{built.notes}</ul>
          {mismatch ? <p className="text-warn">Hmm — the grammar is fine, but the reason doesn't match the opinion. Change the reason or the slider (or, in your own writing, add a contrast with <Es>pero</Es>).</p> : null}
        </div>
      }
    >
      <div className="space-y-4">
        <Gauge level={level} />
        <Slider
          label="How strongly?"
          value={level}
          min={0}
          max={LEVELS.length - 1}
          onChange={setLevel}
          format={(v) => (
            <span lang="es" className="text-brand">
              {LEVELS[v].es}
            </span>
          )}
        />
        <Field label="Who?">
          <Segmented<Who>
            label="Who has the opinion?"
            value={who}
            onChange={setWho}
            options={[
              { value: "yo", label: <span lang="es">yo</span> },
              { value: "madre", label: <span lang="es">mi madre</span> },
              { value: "padres", label: <span lang="es">mis padres</span> },
            ]}
          />
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Select label="About what?" value={thingId} onChange={setThingId} options={THINGS.map((t) => ({ value: t.id, label: t.es }))} />
          <Select<ReasonId> label="Reason" value={reason} onChange={setReason} options={REASONS} />
          {reason === "es" ? (
            <>
              <Select label="Adjective" value={adjId} onChange={setAdjId} options={ADJS.map((a) => ({ value: a.id, label: `${a.es} (${a.en})` }))} />
              <Select<IntensId> label="Intensifier" value={intens} onChange={setIntens} options={INTENS.map((x) => ({ value: x.value, label: x.es.trim() || "— none —" }))} />
            </>
          ) : null}
        </div>
        <Field label="Connective">
          <Segmented<"porque" | "ya que">
            label="Connective"
            value={conn}
            onChange={setConn}
            options={[
              { value: "porque", label: <span lang="es">porque</span> },
              { value: "ya que", label: <span lang="es">ya que</span> },
            ]}
          />
        </Field>
        <SpanishLine segs={built.segs} label="Your sentence" />
        <p className="text-sm text-ink-2">
          <span className="font-bold">English:</span> {built.en}
        </p>
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// Widget 2: Comparison builder
// ---------------------------------------------------------------------------

interface Place {
  id: string;
  es: string;
  en: string;
  g: Gender;
  pl: boolean;
}
const PLACES: Place[] = [
  { id: "ciudad", es: "la ciudad", en: "the city", g: "f", pl: false },
  { id: "pueblo", es: "el pueblo", en: "the village", g: "m", pl: false },
  { id: "campo", es: "el campo", en: "the countryside", g: "m", pl: false },
  { id: "costa", es: "la costa", en: "the coast", g: "f", pl: false },
  { id: "barrio", es: "mi barrio", en: "my neighbourhood", g: "m", pl: false },
  { id: "afueras", es: "las afueras", en: "the outskirts", g: "f", pl: true },
  { id: "pueblos", es: "los pueblos", en: "villages", g: "m", pl: true },
  { id: "ciudades", es: "las ciudades", en: "cities", g: "f", pl: true },
];

type Mode = "mas" | "menos" | "tan" | "mejor" | "peor";
const FLIP: Record<Mode, Mode> = { mas: "menos", menos: "mas", tan: "tan", mejor: "peor", peor: "mejor" };

function Bars({ a, b, mode, adj }: { a: Place; b: Place; mode: Mode; adj: Adj }) {
  const H = { hi: 100, lo: 50, eq: 75 };
  const [ha, hb] = mode === "mas" || mode === "mejor" ? [H.hi, H.lo] : mode === "menos" || mode === "peor" ? [H.lo, H.hi] : [H.eq, H.eq];
  const base = 140;
  const label = (p: Place, tall: boolean) => {
    if (mode === "mejor" || mode === "peor") return tall ? (p.pl ? "mejores" : "mejor") : p.pl ? "peores" : "peor";
    return adj.es.slice(0, -1) + ending(p.g, p.pl);
  };
  const desc =
    mode === "tan"
      ? `Two equal bars: ${a.es} and ${b.es} are equally ${adj.en}`
      : mode === "mejor" || mode === "peor"
        ? `${a.es} is ${mode === "mejor" ? "better" : "worse"} than ${b.es}`
        : `${a.es} has a ${mode === "mas" ? "taller" : "shorter"} bar than ${b.es}: ${mode === "mas" ? "more" : "less"} ${adj.en}`;
  return (
    <svg viewBox="0 0 320 175" className="mx-auto h-auto w-full max-w-sm" role="img" aria-label={`Bar comparison. ${desc}.`}>
      <line x1={20} y1={base} x2={300} y2={base} className="stroke-line" strokeWidth={2} />
      {[
        { p: a, h: ha, x: 60, cls: "fill-brand" },
        { p: b, h: hb, x: 190, cls: "fill-accent" },
      ].map(({ p, h, x, cls }) => (
        <g key={p.id + x}>
          <rect x={x} y={base - h} width={70} height={h} rx={8} className={cls} />
          <text x={x + 35} y={base - h - 8} textAnchor="middle" fontSize={13} fontWeight={700} className="fill-ink">
            {label(p, h === H.hi)}
          </text>
          <text x={x + 35} y={base + 18} textAnchor="middle" fontSize={12} className="fill-ink-2">
            {p.es}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ComparisonBuilder() {
  const [aId, setAId] = useState("ciudad");
  const [bId, setBId] = useState("pueblo");
  const [mode, setMode] = useState<Mode>("mas");
  const [adjId, setAdjId] = useState("ruidoso");

  const A = PLACES.find((p) => p.id === aId) ?? PLACES[0];
  const B = PLACES.find((p) => p.id === bId) ?? PLACES[1];
  const adj = ADJS.find((x) => x.id === adjId) ?? ADJS[0];

  const pickA = (id: string) => {
    if (id === bId) setBId(aId);
    setAId(id);
  };
  const pickB = (id: string) => {
    if (id === aId) setAId(bId);
    setBId(id);
  };
  const swap = () => {
    setAId(bId);
    setBId(aId);
    setMode(FLIP[mode]);
  };

  const built = useMemo(() => {
    const v = ser(A.pl);
    const segs: Seg[] = [{ t: `${cap(A.es)} ${v} ` }];
    let en: string;
    let rule: ReactNode;
    const enV = A.pl ? "are" : "is";
    if (mode === "mejor" || mode === "peor") {
      const word = mode === "mejor" ? "mejor" : "peor";
      segs.push({ t: word, hl: "link" });
      if (A.pl) segs.push({ t: "es", hl: "end" });
      segs.push({ t: " " }, { t: "que", hl: "link" }, { t: ` ${B.es}.` });
      en = `${cap(A.en)} ${enV} ${mode === "mejor" ? "better" : "worse"} than ${B.en}.`;
      rule = (
        <>
          'Better' and 'worse' have their own words: <Es>mejor</Es> / <Es>peor</Es> — never <Es>más bueno</Es> / <Es>más malo</Es>. They have no feminine form, only a plural in <Es>-es</Es>
          {A.pl ? (
            <>
              : <Es>{A.es}</Es> is plural → <Es>{word}es</Es>
            </>
          ) : null}
          .
        </>
      );
    } else {
      const w = mode === "mas" ? "más" : mode === "menos" ? "menos" : "tan";
      const link = mode === "tan" ? "como" : "que";
      segs.push({ t: w, hl: "link" }, { t: " " }, { t: adj.es.slice(0, -1), hl: "adj" }, { t: ending(A.g, A.pl), hl: "end" }, { t: " " }, { t: link, hl: "link" }, { t: ` ${B.es}.` });
      en =
        mode === "mas"
          ? `${cap(A.en)} ${enV} ${adj.er} than ${B.en}.`
          : mode === "menos"
            ? `${cap(A.en)} ${enV} less ${adj.en} than ${B.en}.`
            : `${cap(A.en)} ${enV} as ${adj.en} as ${B.en}.`;
      rule = (
        <>
          <Es>{w}</Es> + adjective + <Es>{link}</Es>. The adjective agrees with the <strong>first</strong> place, <Es>{A.es}</Es> ({gnLabel(A.g, A.pl)}) → <Es>{adj.es.slice(0, -1) + ending(A.g, A.pl)}</Es> — it doesn't care that <Es>{B.es}</Es> comes after <Es>{link}</Es>.
        </>
      );
    }
    return { segs, en, rule };
  }, [A, B, mode, adj]);

  const adjForm = mode === "mejor" || mode === "peor" ? (mode === "mejor" ? "mejor" : "peor") + (A.pl ? "es" : "") : adj.es.slice(0, -1) + ending(A.g, A.pl);

  return (
    <WidgetFrame
      title="Comparison builder"
      tryThis={[
        "Build 'The coast is prettier than the city'. Predict the ending of *bonito* before you look.",
        "Press ⇄ Swap: the meaning stays the same, but two words change. Which ones, and why?",
        "Choose *mejor* and make *las afueras* the first place. Why *mejores* — and why never *mejoras*?",
        "With *tan … como*, put *los pueblos* first, then *las ciudades* first. Which place does the adjective follow?",
      ]}
      caption={
        <div className="space-y-1">
          <p>{built.rule}</p>
          <p>
            See-saw: <Es>más … que</Es> and <Es>menos … que</Es> describe the same fact from opposite ends — that's why ⇄ Swap flips one into the other.
          </p>
        </div>
      }
    >
      <div className="space-y-4">
        <Bars a={A} b={B} mode={mode} adj={adj} />
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-2">
          <Select label="First place (subject)" value={aId} onChange={pickA} options={PLACES.map((p) => ({ value: p.id, label: p.es }))} />
          <button type="button" className="btn btn-secondary btn-sm min-h-10" onClick={swap} aria-label="Swap the two places and flip the comparison so the meaning stays the same">
            ⇄ Swap
          </button>
          <Select label="Second place" value={bId} onChange={pickB} options={PLACES.map((p) => ({ value: p.id, label: p.es }))} />
        </div>
        <Field label="Comparison">
          <Segmented<Mode>
            label="Type of comparison"
            value={mode}
            onChange={setMode}
            options={[
              { value: "mas", label: <span lang="es">más … que</span> },
              { value: "menos", label: <span lang="es">menos … que</span> },
              { value: "tan", label: <span lang="es">tan … como</span> },
              { value: "mejor", label: <span lang="es">mejor</span> },
              { value: "peor", label: <span lang="es">peor</span> },
            ]}
          />
        </Field>
        {mode === "mejor" || mode === "peor" ? null : (
          <Select label="Adjective" value={adjId} onChange={setAdjId} options={ADJS.map((a) => ({ value: a.id, label: `${a.es} (${a.en})` }))} />
        )}
        <div className="grid grid-cols-3 gap-2">
          <Readout label="Subject" value={<span lang="es">{A.es}</span>} tone="ink" />
          <Readout label="Gender · number" value={`${A.g === "m" ? "masc." : "fem."} ${A.pl ? "pl." : "sg."}`} tone="ink" />
          <Readout label="Form" value={<span lang="es">{adjForm}</span>} tone="good" />
        </div>
        <SpanishLine segs={built.segs} label="Your comparison" />
        <p className="text-sm text-ink-2">
          <span className="font-bold">English:</span> {built.en}
        </p>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "donde-vivo-opinion-o-meter",
    title: "Opinion-o-meter",
    blurb: "Slide from odio to me chifla, choose who thinks it, what about and why — and watch gusta/gustan, le/les and the adjective ending react.",
    Component: OpinionOMeter,
  },
  {
    id: "donde-vivo-comparison-builder",
    title: "Comparison builder",
    blurb: "Compare two places with más / menos … que, tan … como, mejor and peor — the adjective re-agrees with whichever place comes first.",
    Component: ComparisonBuilder,
  },
];
