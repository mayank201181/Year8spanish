"use client";
// Interactive explorables for topic "tareas" (Ayudar en casa — Chores).
import { useId, useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Stepper, Segmented, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, type Person } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function SpeakButton({ text }: { text: string }) {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-sm shrink-0"
      onClick={() => speakSpanish(text, { slow: true })}
      aria-label={`Listen: ${text}`}
    >
      <span aria-hidden>🔊</span> Listen
    </button>
  );
}

// ---------------------------------------------------------------------------
// 1. Chore wheel: person + chore + frame → live sentence
// ---------------------------------------------------------------------------

interface WSubj {
  id: string;
  es: string;
  en: string;
  p: Person;
  /** Subject pronoun: Spanish usually leaves it out. */
  pron: boolean;
}

const SUBJECTS: WSubj[] = [
  { id: "yo", es: "yo", en: "I", p: "yo", pron: true },
  { id: "tu", es: "tú", en: "you", p: "tú", pron: true },
  { id: "hermano", es: "mi hermano", en: "my brother", p: "él", pron: false },
  { id: "madre", es: "mi madre", en: "my mum", p: "él", pron: false },
  { id: "nosotros", es: "nosotros", en: "we", p: "nosotros", pron: true },
  { id: "vosotros", es: "vosotros", en: "you all", p: "vosotros", pron: true },
  { id: "padres", es: "mis padres", en: "my parents", p: "ellos", pron: false },
];

interface WChore {
  verb: string;
  rest: string;
  emoji: string;
  en: string;
  s3: string;
}

const WHEEL: WChore[] = [
  { verb: "hacer", rest: "la cama", emoji: "🛏️", en: "make the bed", s3: "makes the bed" },
  { verb: "poner", rest: "la mesa", emoji: "🍽️", en: "set the table", s3: "sets the table" },
  { verb: "quitar", rest: "la mesa", emoji: "🧺", en: "clear the table", s3: "clears the table" },
  { verb: "fregar", rest: "los platos", emoji: "🧽", en: "wash the dishes", s3: "washes the dishes" },
  { verb: "pasar", rest: "la aspiradora", emoji: "🧹", en: "vacuum", s3: "vacuums" },
  { verb: "sacar", rest: "la basura", emoji: "🗑️", en: "take out the rubbish", s3: "takes out the rubbish" },
  { verb: "cocinar", rest: "", emoji: "🍳", en: "cook", s3: "cooks" },
  { verb: "planchar", rest: "", emoji: "👕", en: "iron", s3: "irons" },
  { verb: "pasear", rest: "al perro", emoji: "🐕", en: "walk the dog", s3: "walks the dog" },
  { verb: "cortar", rest: "el césped", emoji: "🌿", en: "mow the lawn", s3: "mows the lawn" },
  { verb: "regar", rest: "las plantas", emoji: "🪴", en: "water the plants", s3: "waters the plants" },
  { verb: "ir", rest: "de compras", emoji: "🛍️", en: "go shopping", s3: "goes shopping" },
];

type Frame = "tener" | "deber" | "hay" | "ir" | "pres";

const FRAME_OPTIONS: { value: Frame; label: string }[] = [
  { value: "tener", label: "tener que" },
  { value: "deber", label: "deber" },
  { value: "hay", label: "hay que" },
  { value: "ir", label: "voy a…" },
  { value: "pres", label: "present" },
];

type Kind = "time" | "subj" | "ghost" | "neg" | "verb" | "link" | "inf";
interface Part {
  text: string;
  kind: Kind;
}

const KIND_CLASS: Record<Kind, string> = {
  time: "text-ink-2",
  subj: "text-ink",
  ghost: "text-ink-2 opacity-70",
  neg: "text-bad font-extrabold",
  verb: "text-brand font-extrabold underline decoration-2 underline-offset-4",
  link: "text-accent font-extrabold",
  inf: "text-good font-extrabold",
};

function buildParts(frame: Frame, s: WSubj, c: WChore, neg: boolean): Part[] {
  const parts: Part[] = [];
  const subj = (): void => {
    if (s.pron) parts.push({ text: `(${s.es})`, kind: "ghost" });
    else parts.push({ text: s.es, kind: "subj" });
  };
  const no = (): void => {
    if (neg) parts.push({ text: "no", kind: "neg" });
  };
  const infinitive = `${c.verb}${c.rest ? " " + c.rest : ""}`;
  switch (frame) {
    case "tener":
      subj();
      no();
      parts.push({ text: conjugate("tener", "present", s.p), kind: "verb" }, { text: "que", kind: "link" }, { text: infinitive, kind: "inf" });
      break;
    case "deber":
      subj();
      no();
      parts.push({ text: conjugate("deber", "present", s.p), kind: "verb" }, { text: infinitive, kind: "inf" });
      break;
    case "hay":
      parts.push({ text: "en casa", kind: "time" });
      no();
      parts.push({ text: "hay", kind: "verb" }, { text: "que", kind: "link" }, { text: infinitive, kind: "inf" });
      break;
    case "ir":
      parts.push({ text: "este fin de semana", kind: "time" });
      subj();
      no();
      parts.push({ text: conjugate("ir", "present", s.p), kind: "verb" }, { text: "a", kind: "link" }, { text: infinitive, kind: "inf" });
      break;
    case "pres":
      parts.push({ text: "normalmente", kind: "time" });
      subj();
      no();
      parts.push({ text: conjugate(c.verb, "present", s.p), kind: "verb" });
      if (c.rest) parts.push({ text: c.rest, kind: "subj" });
      break;
  }
  return parts;
}

/** The sentence as spoken / written: subject pronouns dropped, first letter capitalised. */
function sentenceOf(parts: Part[]): string {
  return cap(parts.filter((p) => p.kind !== "ghost").map((p) => p.text).join(" ")) + ".";
}

function englishOf(frame: Frame, s: WSubj, c: WChore, neg: boolean): string {
  const third = s.p === "él";
  const S = cap(s.en);
  switch (frame) {
    case "tener":
      return `${S} ${neg ? (third ? "doesn't have to" : "don't have to") : third ? "has to" : "have to"} ${c.en}.`;
    case "deber":
      return `${S} ${neg ? "mustn't / shouldn't" : "must / should"} ${c.en}.`;
    case "hay":
      return `At home, ${neg ? "you don't have to" : "you have to"} ${c.en} (a rule for everyone).`;
    case "ir": {
      const be = s.p === "yo" ? "am" : third ? "is" : "are";
      return `This weekend, ${s.en} ${be} ${neg ? "not " : ""}going to ${c.en}.`;
    }
    case "pres":
      return `Normally, ${s.en} ${neg ? (third ? "doesn't " : "don't ") + c.en : third ? c.s3 : c.en}.`;
  }
}

const SEG = 360 / WHEEL.length;
const SEG_FILLS = ["fill-brand-soft", "fill-accent-soft", "fill-good-soft", "fill-info-soft"];

function polar(deg: number, r: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [150 + r * Math.sin(a), 150 - r * Math.cos(a)];
}

function segmentPath(i: number): string {
  const [x0, y0] = polar(i * SEG - SEG / 2, 130);
  const [x1, y1] = polar(i * SEG + SEG / 2, 130);
  return `M150 150 L${x0.toFixed(2)} ${y0.toFixed(2)} A130 130 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
}

function ChoreWheel() {
  const [subjId, setSubjId] = useState("hermano");
  const [choreIdx, setChoreIdx] = useState(5);
  const [frame, setFrame] = useState<Frame>("tener");
  const [neg, setNeg] = useState(false);
  const [rot, setRot] = useState(-5 * SEG);

  const s = SUBJECTS.find((x) => x.id === subjId) ?? SUBJECTS[0];
  const c = WHEEL[choreIdx];
  const parts = useMemo(() => buildParts(frame, s, c, neg), [frame, s, c, neg]);
  const sentence = sentenceOf(parts);
  const english = englishOf(frame, s, c, neg);
  const firstReal = parts.findIndex((p) => p.kind !== "ghost");

  const choose = (i: number) => {
    const base = -i * SEG;
    const k = Math.round((rot - base) / 360);
    setRot(base + 360 * k);
    setChoreIdx(i);
  };
  const spin = () => {
    // Randomness only inside the event handler, never during render.
    const i = Math.floor(Math.random() * WHEEL.length);
    const subj = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
    const base = -i * SEG;
    const k = Math.ceil((rot + 720 - base) / 360);
    setRot(base + 360 * k);
    setChoreIdx(i);
    if (frame !== "hay") setSubjId(subj.id);
  };

  const tenerForm = conjugate("tener", "present", s.p);
  const outsideBoot = s.p === "nosotros" || s.p === "vosotros";
  const presForm = conjugate(c.verb, "present", s.p);

  let caption: ReactNode = null;
  if (frame === "tener") {
    caption = (
      <>
        <p>
          Only <b className="text-brand">tener</b> changes to match the person: <i lang="es">tengo, tienes, tiene, tenemos, tenéis, tienen</i>.{" "}
          {s.p === "yo"
            ? <>The <i>yo</i> form is irregular: <b lang="es">tengo</b>.</>
            : outsideBoot
              ? <><i>Nosotros / vosotros</i> sit outside the boot, so no e→ie: <b lang="es">{tenerForm}</b>.</>
              : <>Inside the boot, e→ie: <b lang="es">{tenerForm}</b>.</>}{" "}
          <b className="text-accent">que</b> and the <b className="text-good">infinitive</b> never change.
        </p>
        {neg ? <p className="mt-2"><i lang="es">No tener que</i> = <b>don&apos;t have to</b> (there&apos;s no need) — it does <b>not</b> mean &quot;mustn&apos;t&quot;.</p> : null}
      </>
    );
  } else if (frame === "deber") {
    caption = (
      <p>
        <i lang="es">Deber</i> is a regular <i>-er</i> verb (<i lang="es">debo, debes, debe, debemos, debéis, deben</i>) and goes <b>straight</b> to the infinitive — no <i>que</i>.
        {neg ? <> <i lang="es">No deber</i> = mustn&apos;t / shouldn&apos;t: a real &quot;don&apos;t do it&quot;.</> : <> It sounds like a duty or advice: &quot;must / should&quot;.</>}
      </p>
    );
  } else if (frame === "hay") {
    caption = (
      <p>
        <i lang="es">Hay que</i> has <b>no subject</b>, so the person picker doesn&apos;t matter — <i lang="es">hay</i> never changes. Use it for general rules: &quot;you (everyone) have to…&quot;.
        {neg ? <> <i lang="es">No hay que</i> = there&apos;s no need to.</> : null}
      </p>
    );
  } else if (frame === "ir") {
    caption = (
      <p>
        Near future = <b className="text-brand">ir</b> (<i lang="es">voy, vas, va, vamos, vais, van</i>) + <b className="text-accent">a</b> + <b className="text-good">infinitive</b>. The chore never takes an ending here.
        {neg ? <> <i>No</i> goes in front of the part of <i>ir</i>: <i lang="es">no {conjugate("ir", "present", s.p)} a…</i></> : null}
      </p>
    );
  } else {
    const note =
      c.verb === "ir"
        ? <><i lang="es">Ir</i> is fully irregular: <i lang="es">voy, vas, va, vamos, vais, van</i>.</>
        : (c.verb === "hacer" || c.verb === "poner") && s.p === "yo"
          ? <><i lang="es">{c.verb}</i> is irregular only in the <i>yo</i> form: <b lang="es">{presForm}</b>.</>
          : (c.verb === "regar" || c.verb === "fregar") && !outsideBoot
            ? <><i lang="es">{c.verb}</i> is a boot verb, e→ie: <b lang="es">{presForm}</b>.</>
            : <>Chop off <i>-{c.verb.slice(-2)}</i> and add the ending for this person: <b lang="es">{presForm}</b>.</>;
    caption = (
      <p>
        Now the <b className="text-brand">chore verb itself</b> is conjugated — there&apos;s no helper verb. {note}
      </p>
    );
  }

  return (
    <WidgetFrame
      title="Chore wheel: who has to do what?"
      tryThis={[
        "Pick *mis padres* and *tener que*, then switch to *mi hermano*. Which word changes — and which words never do?",
        "Before you tap *vosotros*, predict the form of *tener*. Is it inside the boot?",
        "Switch to *hay que*. Why does changing the person make no difference?",
        "Turn on *no* with *tener que*, then with *deber*. Which one means \"mustn't\"?",
      ]}
      caption={caption}
    >
      <div className="grid gap-4 md:grid-cols-[minmax(0,260px)_1fr] md:items-start">
        <div className="mx-auto w-full max-w-[260px]">
          <svg viewBox="0 0 300 300" className="h-auto w-full" role="img" aria-label={`Chore wheel pointing at ${c.verb} ${c.rest}`.trim()}>
            <g
              className="transition-transform duration-700 ease-out motion-reduce:transition-none"
              style={{ transform: `rotate(${rot}deg)`, transformOrigin: "150px 150px" }}
            >
              {WHEEL.map((w, i) => {
                const [ex, ey] = polar(i * SEG, 98);
                return (
                  <g key={w.verb + w.rest}>
                    <path d={segmentPath(i)} className={`${i === choreIdx ? "fill-brand" : SEG_FILLS[i % SEG_FILLS.length]} stroke-surface`} strokeWidth={2} />
                    <text x={ex} y={ey} fontSize={24} textAnchor="middle" dominantBaseline="central">
                      {w.emoji}
                    </text>
                  </g>
                );
              })}
            </g>
            <circle cx={150} cy={150} r={38} className="fill-surface stroke-line" strokeWidth={2} />
            <text x={150} y={150} fontSize={13} fontWeight={700} textAnchor="middle" dominantBaseline="central" className="fill-ink">
              ¡A trabajar!
            </text>
            <polygon points="138,2 162,2 150,26" className="fill-ink" />
          </svg>
          <button type="button" className="btn btn-primary mt-2 w-full" onClick={spin}>
            <span aria-hidden>🎡</span> Spin the wheel
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-2">Who?</div>
            <div className={frame === "hay" ? "pointer-events-none opacity-40" : ""} aria-disabled={frame === "hay"}>
              <Segmented label="Who does the chore" options={SUBJECTS.map((x) => ({ value: x.id, label: <span lang="es">{x.es}</span> }))} value={subjId} onChange={setSubjId} />
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-2">Which chore?</div>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Chore">
              {WHEEL.map((w, i) => (
                <button
                  key={w.verb + w.rest}
                  type="button"
                  role="radio"
                  aria-checked={i === choreIdx}
                  onClick={() => choose(i)}
                  className={`min-h-10 rounded-lg border px-2.5 text-sm font-semibold transition ${i === choreIdx ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink-2 hover:text-ink"}`}
                >
                  <span aria-hidden>{w.emoji}</span> <span lang="es">{`${w.verb} ${w.rest}`.trim()}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <div>
              <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-2">Frame</div>
              <Segmented label="Sentence frame" options={FRAME_OPTIONS} value={frame} onChange={setFrame} />
            </div>
            <button
              type="button"
              aria-pressed={neg}
              onClick={() => setNeg((v) => !v)}
              className={`min-h-10 rounded-xl border px-3 text-sm font-bold transition ${neg ? "border-bad bg-bad-soft text-bad" : "border-line bg-surface text-ink-2 hover:text-ink"}`}
            >
              {neg ? "✕ no (negative)" : "＋ add no"}
            </button>
          </div>

          <div className="rounded-xl border border-line bg-surface p-3">
            <div className="flex items-start justify-between gap-3">
              <p lang="es" className="text-xl leading-relaxed" aria-live="polite">
                {parts.map((p, i) => (
                  <span key={i} className={KIND_CLASS[p.kind]}>
                    {i === firstReal ? cap(p.text) : p.text}
                    {i < parts.length - 1 ? " " : ""}
                  </span>
                ))}
                <span>.</span>
              </p>
              <SpeakButton text={sentence} />
            </div>
            <p className="mt-1 text-sm text-ink-2">{english}</p>
            {s.pron && frame !== "hay" ? (
              <p className="mt-1 text-xs text-ink-2">
                <span lang="es">({s.es})</span> is optional — the verb ending already tells you who.
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// 2. Pocket-money calculator: price per chore × times a week → total in words
// ---------------------------------------------------------------------------

const UNITS = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
const TEENS = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
const TWENTIES = ["veinte", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete", "veintiocho", "veintinueve"];
const TENS = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
const HUNDREDS = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos", "ochocientos", "novecientos"];

interface Tok {
  w: string;
  n: string;
}

/** Number 0–999 as word tokens (with the value each token stands for). */
function numTokens(n: number, masc: boolean): Tok[] {
  if (n === 0) return [{ w: "cero", n: "0" }];
  if (n === 100) return [{ w: "cien", n: "100" }];
  const toks: Tok[] = [];
  const h = Math.floor(n / 100);
  const r = n % 100;
  if (h) toks.push({ w: HUNDREDS[h], n: String(h * 100) });
  if (r) {
    if (r < 10) toks.push({ w: UNITS[r], n: String(r) });
    else if (r < 20) toks.push({ w: TEENS[r - 10], n: String(r) });
    else if (r < 30) toks.push({ w: TWENTIES[r - 20], n: String(r) });
    else {
      toks.push({ w: TENS[Math.floor(r / 10)], n: String(Math.floor(r / 10) * 10) });
      if (r % 10) toks.push({ w: "y", n: "+" }, { w: UNITS[r % 10], n: String(r % 10) });
    }
  }
  if (masc) {
    const last = toks[toks.length - 1];
    if (last.w === "veintiuno") last.w = "veintiún";
    else if (last.w === "uno") last.w = "un";
  }
  return toks;
}

function numWord(n: number, masc = false): string {
  return numTokens(n, masc).map((t) => t.w).join(" ");
}

type Currency = "euros" | "dólares";
const CUR: Record<Currency, { sing: string; plural: string; sym: (n: number) => string; en: string }> = {
  euros: { sing: "euro", plural: "euros", sym: (n) => `€${n}`, en: "euros" },
  dólares: { sing: "dólar", plural: "dólares", sym: (n) => `$${n}`, en: "dollars" },
};

function amount(n: number, cur: Currency): string {
  if (n === 1) return `un ${CUR[cur].sing}`;
  return `${numWord(n, true)} ${CUR[cur].plural}`;
}

interface MChore {
  verb: string;
  rest: string;
  emoji: string;
  en: string;
}

const MONEY_CHORES: MChore[] = [
  { verb: "lavar", rest: "el coche", emoji: "🚗", en: "wash the car" },
  { verb: "pasear", rest: "al perro", emoji: "🐕", en: "walk the dog" },
  { verb: "cortar", rest: "el césped", emoji: "🌿", en: "mow the lawn" },
  { verb: "pasar", rest: "la aspiradora", emoji: "🧹", en: "vacuum" },
  { verb: "planchar", rest: "", emoji: "👕", en: "iron" },
  { verb: "regar", rest: "las plantas", emoji: "🪴", en: "water the plants" },
  { verb: "hacer", rest: "la compra", emoji: "🛒", en: "do the food shopping" },
  { verb: "cocinar", rest: "", emoji: "🍳", en: "cook" },
  { verb: "sacar", rest: "la basura", emoji: "🗑️", en: "take out the rubbish" },
  { verb: "limpiar", rest: "el cuarto de baño", emoji: "🛁", en: "clean the bathroom" },
];

function yoChore(c: MChore): string {
  return `${conjugate(c.verb, "present", "yo")}${c.rest ? " " + c.rest : ""}`;
}

function howOften(k: number): string {
  if (k === 1) return "una vez a la semana";
  if (k === 7) return "cada día";
  return `${numWord(k)} veces a la semana`;
}

interface Row {
  chore: number;
  price: number;
  times: number;
}

function ChoreRow({ row, cur, onChange, index }: { row: Row; cur: Currency; onChange: (r: Row) => void; index: number }) {
  const id = useId();
  const c = MONEY_CHORES[row.chore];
  const line =
    row.times === 0
      ? `Nunca ${yoChore(c)}.`
      : row.price === 0
        ? `${cap(yoChore(c))} ${howOften(row.times)}, pero no gano nada.`
        : `${cap(yoChore(c))} ${howOften(row.times)} y gano ${amount(row.price, cur)} cada vez.`;
  return (
    <div className="rounded-xl border border-line bg-surface p-3">
      <div className="flex flex-wrap items-center gap-2">
        <label htmlFor={id} className="text-sm font-semibold text-ink-2">
          Chore {index + 1}
        </label>
        <select
          id={id}
          value={row.chore}
          onChange={(e) => onChange({ ...row, chore: Number(e.target.value) })}
          className="min-h-10 flex-1 rounded-lg border border-line bg-surface-2 px-2 text-sm font-semibold text-ink"
        >
          {MONEY_CHORES.map((m, i) => (
            <option key={m.verb + m.rest} value={i} lang="es">
              {m.emoji} {`${m.verb} ${m.rest}`.trim()}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        <Stepper label={<span>Pay each time</span>} value={row.price} min={0} max={10} onChange={(v) => onChange({ ...row, price: v })} format={(v) => CUR[cur].sym(v)} />
        <Stepper label={<span>Times a week</span>} value={row.times} min={0} max={7} onChange={(v) => onChange({ ...row, times: v })} format={(v) => `×${v}`} />
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <p lang="es" className="text-sm text-ink">
          {line}{" "}
          <span className="tabular-nums text-ink-2" lang="en">
            ({row.times} × {CUR[cur].sym(row.price)} = {CUR[cur].sym(row.price * row.times)})
          </span>
        </p>
        <button type="button" className="kbd shrink-0" aria-label={`Listen: ${line}`} onClick={() => speakSpanish(line, { slow: true })}>
          🔊
        </button>
      </div>
    </div>
  );
}

function ruleNotes(n: number): ReactNode[] {
  const notes: ReactNode[] = [];
  const r = n % 100;
  if (n === 0) notes.push(<>Nothing earned: <i lang="es">no gano nada</i> — Spanish needs both <i>no</i> and <i>nada</i>.</>);
  if (n === 100) notes.push(<>Exactly 100 is <b lang="es">cien</b>. Add one more and it becomes <i lang="es">ciento uno</i>.</>);
  if (n > 100 && n < 200) notes.push(<>101–199 start with <b lang="es">ciento</b> (never <i>cien y…</i>): <i lang="es">{numWord(n, true)}</i>.</>);
  if (n >= 200) notes.push(<>Hundreds: <i lang="es">doscientos, trescientos…</i> — watch the odd ones: <b lang="es">quinientos</b> (500), <b lang="es">setecientos</b> (700), <b lang="es">novecientos</b> (900).</>);
  if (r >= 16 && r <= 19) notes.push(<>16–19 are one word: <i lang="es">dieci-</i> + unit (<i lang="es">{TEENS[r - 10]}</i>).</>);
  if (r >= 21 && r <= 29) notes.push(<>21–29 are <b>one word</b>: <i lang="es">veinti-</i> + unit.</>);
  if ([22, 23, 26].includes(r)) notes.push(<>Accent alert: <b lang="es">{TWENTIES[r - 20]}</b>.</>);
  if (r > 30 && r % 10 !== 0) notes.push(<>31–99: tens + <b lang="es">y</b> + units, three words.</>);
  if (r % 10 === 1 && r !== 11 && n !== 1) notes.push(<>Ends in 1 before a masculine noun, so <i lang="es">uno</i> → <b lang="es">un</b>{r === 21 ? <> (<i lang="es">veintiuno</i> → <b lang="es">veintiún</b>, with an accent)</> : null}.</>);
  if (Math.floor(r / 10) === 6 || Math.floor(r / 10) === 7) notes.push(<>Don&apos;t mix them up: <i lang="es">sesenta</i> = 60 (<i lang="es">seis</i>), <i lang="es">setenta</i> = 70 (<i lang="es">siete</i>).</>);
  if (notes.length === 0) notes.push(<>Round tens end in <i lang="es">-enta</i> (except <i lang="es">veinte</i> and <i lang="es">treinta</i>).</>);
  return notes;
}

function PocketMoney() {
  const [cur, setCur] = useState<Currency>("euros");
  const [period, setPeriod] = useState<"semana" | "mes">("semana");
  const [rows, setRows] = useState<Row[]>([
    { chore: 0, price: 5, times: 1 },
    { chore: 1, price: 2, times: 5 },
    { chore: 5, price: 1, times: 3 },
  ]);
  const weekly = rows.reduce((sum, r) => sum + r.price * r.times, 0);
  const total = period === "semana" ? weekly : weekly * 4;
  const periodEs = period === "semana" ? "a la semana" : "al mes";
  const sentence = total === 0 ? "No gano nada." : `En total gano ${amount(total, cur)} ${periodEs}.`;
  const english = total === 0 ? "I don't earn anything." : `In total I earn ${total} ${total === 1 ? CUR[cur].en.slice(0, -1) : CUR[cur].en} ${period === "semana" ? "a week" : "a month"}.`;
  const toks = numTokens(total, true);
  const max = 3 * 10 * 7;
  const notes = ruleNotes(total);

  return (
    <WidgetFrame
      title="Pocket-money calculator: ¿cuánto gano?"
      tryThis={[
        "Make your weekly total exactly **21**. What happens to *veintiuno* in front of *euros*?",
        "Hit exactly **100**, then add one more. What does *cien* turn into?",
        "Find a total with an accent: 22, 23 or 26.",
        "Switch to *al mes* and read the total out loud before you look at the digits.",
      ]}
      caption={
        <ul className="space-y-1">
          {notes.map((n, i) => (
            <li key={i} className="flex gap-2">
              <span aria-hidden>•</span>
              <span>{n}</span>
            </li>
          ))}
          <li className="flex gap-2">
            <span aria-hidden>•</span>
            <span>
              <i lang="es">Euros</i> and <i lang="es">dólares</i> are masculine. <i lang="es">Una vez</i>, <i lang="es">dos veces</i> (z → c in the plural); <i lang="es">cada vez</i> = each time.
            </span>
          </li>
        </ul>
      }
    >
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <Segmented label="Currency" options={[{ value: "euros", label: "€ euros" }, { value: "dólares", label: "$ dólares" }]} value={cur} onChange={(v) => setCur(v as Currency)} />
          <Segmented label="Period" options={[{ value: "semana", label: "a la semana" }, { value: "mes", label: "al mes (×4)" }]} value={period} onChange={(v) => setPeriod(v as "semana" | "mes")} />
        </div>

        <div className="grid gap-2 lg:grid-cols-3">
          {rows.map((r, i) => (
            <ChoreRow key={i} index={i} row={r} cur={cur} onChange={(nr) => setRows((old) => old.map((x, j) => (j === i ? nr : x)))} />
          ))}
        </div>

        <div className="grid gap-2 sm:grid-cols-[auto_1fr] sm:items-stretch">
          <Readout label={period === "semana" ? "Total a week" : "Total a month"} value={CUR[cur].sym(total)} tone="good" />
          <div className="rounded-xl border border-line bg-surface px-3 py-2">
            <div className="flex items-start justify-between gap-3">
              <p lang="es" className="text-lg font-extrabold text-ink" aria-live="polite">
                {sentence}
              </p>
              <SpeakButton text={sentence} />
            </div>
            <p className="text-sm text-ink-2">{english}</p>
          </div>
        </div>

        <div aria-label={`${total} in Spanish words, piece by piece`} role="group">
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-2">The number, piece by piece</div>
          <div className="flex flex-wrap items-end gap-1.5">
            {toks.map((t, i) => (
              <div key={i} className={`rounded-lg border px-2.5 py-1 text-center ${t.w === "y" ? "border-accent bg-accent-soft" : "border-brand bg-brand-soft"}`}>
                <div lang="es" className={`text-base font-extrabold ${t.w === "y" ? "text-accent" : "text-brand"}`}>
                  {t.w}
                </div>
                <div className="text-xs tabular-nums text-ink-2">{t.n}</div>
              </div>
            ))}
            <div className="rounded-lg border border-line bg-surface px-2.5 py-1 text-center">
              <div lang="es" className="text-base font-extrabold text-ink">
                {total === 1 ? CUR[cur].sing : CUR[cur].plural}
              </div>
              <div className="text-xs text-ink-2">masc.</div>
            </div>
          </div>
        </div>

        <svg viewBox="0 0 300 24" className="h-auto w-full" role="img" aria-label={`Weekly earnings bar: ${weekly} out of a possible ${max}`}>
          <rect x={0} y={4} width={300} height={16} rx={8} className="fill-surface-2 stroke-line" strokeWidth={1} />
          {rows.map((r, i) => {
            const w = (r.price * r.times * 300) / max;
            const x = rows.slice(0, i).reduce((a, q) => a + (q.price * q.times * 300) / max, 0);
            return <rect key={i} x={x} y={4} width={w} height={16} className={["fill-brand", "fill-good", "fill-accent"][i]} />;
          })}
        </svg>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "tareas-chore-wheel",
    title: "Chore wheel: tengo que, debo, hay que, voy a",
    blurb: "Spin or pick a person, a chore and a frame — watch which part of the sentence changes and which stays an infinitive.",
    Component: ChoreWheel,
  },
  {
    id: "tareas-pocket-money",
    title: "Pocket-money calculator",
    blurb: "Set your pay per chore and how often you do it — the total appears as a Spanish sentence with the number in words.",
    Component: PocketMoney,
  },
];
