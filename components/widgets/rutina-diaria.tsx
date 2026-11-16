"use client";
// Explorables for "Mi rutina diaria": an honest analogue clock ↔ Spanish time,
// and a reflexive routine sentence builder with stem / pronoun highlighting.
import { useMemo, useState, useSyncExternalStore, type PointerEvent as ReactPointerEvent } from "react";
import { WidgetFrame, Segmented, Stepper, Readout, type WidgetDef } from "./kit";
import { renderInline } from "../Rich";
import { speakSpanish, speechAvailable } from "@/lib/speech";
import { conjugate, verbInfo, PERSONS, type Person } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const noop = () => () => {};
function useSpeech(): boolean {
  return useSyncExternalStore(noop, speechAvailable, () => false);
}

function SpeakButton({ text }: { text: string }) {
  const ok = useSpeech();
  if (!ok) return null;
  return (
    <button type="button" className="btn btn-secondary btn-sm min-h-10 min-w-10 px-2" onClick={() => speakSpanish(text)} aria-label={`Hear “${text}”`} title="Hear it">
      🔊
    </button>
  );
}

const HOUR_WORD = ["", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];
const MIN_WORD: Record<number, string> = { 5: "cinco", 10: "diez", 15: "cuarto", 20: "veinte", 25: "veinticinco", 30: "media" };

function h12(H: number): number {
  return H % 12 === 0 ? 12 : H % 12;
}

function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

interface TimeParts {
  /** The hour actually named in Spanish (the next hour after half past). */
  named: number;
  link: "" | "y" | "menos";
  minWord: string;
  /** "la una" / "las siete" */
  hourNoun: string;
  /** "las siete y media" */
  phrase: string;
}

function timeParts(h: number, m: number): TimeParts {
  const named = m > 30 ? (h === 12 ? 1 : h + 1) : h;
  const link = m === 0 ? "" : m <= 30 ? "y" : "menos";
  const minWord = m === 0 ? "" : MIN_WORD[m <= 30 ? m : 60 - m];
  const hourNoun = named === 1 ? "la una" : `las ${HOUR_WORD[named]}`;
  return { named, link, minWord, hourNoun, phrase: [hourNoun, link, minWord].filter(Boolean).join(" ") };
}

/** Part of the day for a 24-hour hour (Spain: tarde runs until about 8–9 p.m.). */
function partOfDay(H: number, m: number): string {
  if (H === 0 && m === 0) return "de la noche";
  if (H < 6) return "de la madrugada";
  if (H < 12) return "de la mañana";
  if (H === 12 && m === 0) return "del mediodía";
  if (H < 21) return "de la tarde";
  return "de la noche";
}

// ---------------------------------------------------------------------------
// Widget 1: honest analogue clock ↔ Spanish
// ---------------------------------------------------------------------------

const CX = 110;
const CY = 110;
const R = 96;

function polar(deg: number, r: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [+(CX + r * Math.sin(a)).toFixed(2), +(CY - r * Math.cos(a)).toFixed(2)];
}

function ClockFace({ t, onSetMinute, label }: { t: number; onSetMinute: (m: number) => void; label: string }) {
  const H = Math.floor(t / 60);
  const m = t % 60;
  const hourDeg = ((H % 12) + m / 60) * 30;
  const minDeg = m * 6;
  const [hx, hy] = polar(hourDeg, 50);
  const [mx, my] = polar(minDeg, 80);
  const onPointer = (e: ReactPointerEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 220 - CX;
    const y = ((e.clientY - rect.top) / rect.height) * 220 - CY;
    if (x * x + y * y < 20 * 20) return;
    let deg = (Math.atan2(x, -y) * 180) / Math.PI;
    if (deg < 0) deg += 360;
    onSetMinute((Math.round(deg / 30) * 5) % 60);
  };
  return (
    <svg viewBox="0 0 220 220" className="mx-auto h-auto w-full max-w-[280px] cursor-pointer touch-none select-none" role="img" aria-label={label} onPointerDown={onPointer}>
      {/* Right half = "y" (past), left half = "menos" (to the next hour). */}
      <path d={`M ${CX} ${CY - R} A ${R} ${R} 0 0 1 ${CX} ${CY + R} Z`} className="fill-good-soft" />
      <path d={`M ${CX} ${CY + R} A ${R} ${R} 0 0 1 ${CX} ${CY - R} Z`} className="fill-accent-soft" />
      <circle cx={CX} cy={CY} r={R} className="fill-none stroke-ink" strokeWidth={3} />
      <line x1={CX} y1={CY - R} x2={CX} y2={CY + R} className="stroke-line" strokeWidth={1.5} strokeDasharray="4 4" />
      <text x={CX + 52} y={CY + 44} textAnchor="middle" fontSize={13} fontWeight={800} className="fill-good">
        y …
      </text>
      <text x={CX - 52} y={CY + 44} textAnchor="middle" fontSize={13} fontWeight={800} className="fill-accent">
        menos …
      </text>
      {Array.from({ length: 60 }, (_, i) => {
        const major = i % 5 === 0;
        const [x1, y1] = polar(i * 6, R - 2);
        const [x2, y2] = polar(i * 6, major ? R - 12 : R - 6);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-ink-2" strokeWidth={major ? 2.5 : 1} />;
      })}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const [x, y] = polar(n * 30, R - 26);
        return (
          <text key={n} x={x} y={y + 5} textAnchor="middle" fontSize={15} fontWeight={800} className="fill-ink">
            {n}
          </text>
        );
      })}
      <line x1={CX} y1={CY} x2={mx} y2={my} className="stroke-brand" strokeWidth={4} strokeLinecap="round" />
      <line x1={CX} y1={CY} x2={hx} y2={hy} className="stroke-ink" strokeWidth={8} strokeLinecap="round" />
      <circle cx={CX} cy={CY} r={6} className="fill-ink" />
    </svg>
  );
}

type ClockMode = "explore" | "quiz";
type Question = "que" | "aque";

function SpanishTime({ parts, verb, showDay, H, m }: { parts: TimeParts; verb: string; showDay: boolean; H: number; m: number }) {
  const [art, ...hourRest] = parts.hourNoun.split(" ");
  return (
    <span lang="es" className="text-xl font-extrabold leading-snug sm:text-2xl">
      <span className="text-ink">{verb} </span>
      <span className="text-ink">{art} </span>
      <span className="rounded bg-brand-soft px-1 text-brand">{hourRest.join(" ")}</span>
      {parts.link ? (
        <>
          {" "}
          <span className={parts.link === "y" ? "text-good" : "text-accent"}>{parts.link}</span> <span className={parts.link === "y" ? "text-good" : "text-accent"}>{parts.minWord}</span>
        </>
      ) : null}
      {showDay ? <span className="text-ink-2"> {partOfDay(H, m)}</span> : null}
      <span className="text-ink">.</span>
    </span>
  );
}

function ClockWidget() {
  const [t, setT] = useState(7 * 60 + 30);
  const [mode, setMode] = useState<ClockMode>("explore");
  const [question, setQuestion] = useState<Question>("que");
  const [showDay, setShowDay] = useState(false);
  const [target, setTarget] = useState(8 * 60 + 40);
  const [checked, setChecked] = useState<"" | "right" | "wrong">("");

  const H = Math.floor(t / 60);
  const m = t % 60;
  const h = h12(H);
  const parts = timeParts(h, m);
  const verb = question === "que" ? (parts.named === 1 ? "Es" : "Son") : "A";
  const sentence = `${verb} ${parts.phrase}${showDay ? ` ${partOfDay(H, m)}` : ""}.`;

  const tParts = timeParts(h12(Math.floor(target / 60)), target % 60);
  const targetSentence = `${tParts.named === 1 ? "Es" : "Son"} ${tParts.phrase}.`;

  const move = (delta: number) => {
    setT((x) => (((x + delta) % 1440) + 1440) % 1440);
    setChecked("");
  };
  const setMinute = (mm: number) => {
    setT((x) => Math.floor(x / 60) * 60 + mm);
    setChecked("");
  };
  const newTarget = () => {
    // Randomness only inside an event handler, never during render.
    let next = target;
    while (next % 720 === target % 720) next = Math.floor(Math.random() * 144) * 5;
    setTarget(next);
    setChecked("");
  };
  const check = () => setChecked(t % 720 === target % 720 ? "right" : "wrong");

  let caption: string;
  if (mode === "quiz") {
    const tm = target % 60;
    if (checked === "right") {
      caption = `Spot on. The minute hand is on ${tm === 0 ? 12 : tm / 5} and the hour hand sits ${tm === 0 ? "exactly on" : tm < 30 ? "a little past" : tm === 30 ? "halfway past" : "most of the way to"} the hour — an honest clock never jumps.`;
    } else if (checked === "wrong") {
      caption =
        tParts.link === "menos"
          ? `Not yet. *Menos* counts **back**: *${tParts.hourNoun} menos ${tParts.minWord}* is ${60 - tm} minutes **before** ${tParts.named}, so the minute hand belongs in the orange *menos* half.`
          : `Not yet. Find the hour named (*${tParts.hourNoun}*) first, then put the minute hand ${tParts.link === "y" ? `${tm} minutes past it, in the green *y* half` : "on 12"}.`;
    } else {
      caption = "Read the Spanish, then set the clock with the buttons or by tapping the face. Remember: after *y media* Spanish names the **next** hour.";
    }
  } else if (m === 0) {
    caption = `On the hour: just the hour, no minutes (add *en punto* for 'exactly'). ${parts.named === 1 ? "*Una* is singular, so it's *Es la una*." : `${parts.named} is plural, so it's *Son las ${HOUR_WORD[parts.named]}*.`}`;
  } else if (m <= 30) {
    caption = `The minute hand is in the green half, so Spanish adds minutes **past** the hour with *y*: ${m} minutes → *y ${parts.minWord}*. The hour hand has crept ${m === 30 ? "exactly halfway" : "a little way"} towards ${h === 12 ? 1 : h + 1}. ${parts.named === 1 ? "*La una* is singular → *Es la una*." : "Plural hour → *Son las*."}`;
  } else {
    caption = `Past half, the minute hand is in the orange half, so Spanish counts **back** from the **next** hour: ${60 - m} minutes to ${parts.named} → *${parts.hourNoun} menos ${parts.minWord}*. The hour hand is nearly on ${parts.named} — that's why Spanish names ${parts.named}, not ${h}.${parts.named === 1 ? ` *Una* is singular, so even ${h}:${pad2(m)} is *Es la una menos…*` : ""}`;
  }
  if (mode === "explore" && question === "aque") {
    caption += ` With *¿A qué hora…?* (at what time?) drop *es / son* and use *a ${parts.named === 1 ? "la" : "las"}*: *Me levanto a ${parts.phrase}.*`;
  }

  const label = `Analogue clock showing ${h}:${pad2(m)}. Hour hand ${m === 0 ? "on" : "between"} ${h}${m === 0 ? "" : ` and ${h === 12 ? 1 : h + 1}`}, minute hand on ${m === 0 ? 12 : m / 5}.`;

  return (
    <WidgetFrame
      title="El reloj: ¿Qué hora es?"
      tryThis={[
        "Set **8:35**. Predict the Spanish first — which hour does it name, and why?",
        "Go from **12:30** to **12:35**. Why does *Son las* suddenly become *Es la*?",
        "Switch to *¿A qué hora…?* — what replaces *es / son*?",
        "In *Spanish → clock*, can you get three in a row without using the digital readout?",
      ]}
      caption={<span>{renderInline(caption)}</span>}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Segmented<ClockMode>
            label="Mode"
            options={[
              { value: "explore", label: "Clock → Spanish" },
              { value: "quiz", label: "Spanish → clock" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v);
              setChecked("");
            }}
          />
          {mode === "explore" ? (
            <Segmented<Question>
              label="Question"
              options={[
                { value: "que", label: "¿Qué hora es?" },
                { value: "aque", label: "¿A qué hora…?" },
              ]}
              value={question}
              onChange={setQuestion}
            />
          ) : null}
        </div>

        {mode === "quiz" ? (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface p-3">
            <span className="text-sm font-bold text-ink-2">Set the clock to:</span>
            <span lang="es" className="text-xl font-extrabold text-brand">
              {targetSentence}
            </span>
            <SpeakButton text={targetSentence} />
          </div>
        ) : null}

        <div className="grid items-center gap-4 sm:grid-cols-2">
          <ClockFace t={t} onSetMinute={setMinute} label={label} />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => move(-60)} aria-label="One hour back">
                − 1 h
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => move(60)} aria-label="One hour forward">
                + 1 h
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => move(-5)} aria-label="Five minutes back">
                − 5 min
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => move(5)} aria-label="Five minutes forward">
                + 5 min
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => move(-15)} aria-label="Fifteen minutes back">
                − 15 min
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => move(15)} aria-label="Fifteen minutes forward">
                + 15 min
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Readout label="12-hour" value={mode === "quiz" && checked !== "right" ? "?" : `${h}:${pad2(m)} ${H < 12 ? "a.m." : "p.m."}`} tone="ink" />
              <Readout label="24-hour" value={mode === "quiz" && checked !== "right" ? "?" : `${pad2(H)}:${pad2(m)}`} tone="ink" />
            </div>
            {mode === "explore" ? (
              <label className="flex min-h-10 cursor-pointer items-center gap-2 text-sm font-semibold text-ink-2">
                <input type="checkbox" className="h-5 w-5" checked={showDay} onChange={(e) => setShowDay(e.target.checked)} />
                Add the part of the day (<span lang="es">de la mañana / tarde / noche</span>)
              </label>
            ) : (
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn btn-primary btn-sm" onClick={check}>
                  Check
                </button>
                <button type="button" className="btn btn-secondary btn-sm" onClick={newTarget}>
                  New time
                </button>
                {checked ? (
                  <span role="status" className={`self-center text-sm font-extrabold ${checked === "right" ? "text-good" : "text-bad"}`}>
                    {checked === "right" ? "¡Correcto!" : "Not quite — try again"}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {mode === "explore" ? (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface p-3" aria-live="polite">
            <SpanishTime parts={parts} verb={verb} showDay={showDay} H={H} m={m} />
            <SpeakButton text={sentence} />
          </div>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// Widget 2: reflexive routine builder
// ---------------------------------------------------------------------------

interface RoutineVerb {
  key: string;
  /** Verb in the conjugator. */
  inf: string;
  /** Name shown to the learner (dormirse, ponerse…). */
  name: string;
  /** Build a reflexive from a non-reflexive base (poner → me pongo). */
  compose?: boolean;
  comp: string;
  /** English with {s} = verb form slot handled by en / en3, {p} = possessive. */
  en: string;
  en3: string;
}

const ROUTINE: RoutineVerb[] = [
  { key: "despertarse", inf: "despertarse", name: "despertarse", comp: "", en: "wake up", en3: "wakes up" },
  { key: "levantarse", inf: "levantarse", name: "levantarse", comp: "", en: "get up", en3: "gets up" },
  { key: "ducharse", inf: "ducharse", name: "ducharse", comp: "", en: "have a shower", en3: "has a shower" },
  { key: "dientes", inf: "lavarse", name: "lavarse los dientes", comp: "los dientes", en: "brush {p} teeth", en3: "brushes {p} teeth" },
  { key: "vestirse", inf: "vestirse", name: "vestirse", comp: "", en: "get dressed", en3: "gets dressed" },
  { key: "uniforme", inf: "poner", name: "ponerse el uniforme", compose: true, comp: "el uniforme", en: "put on {p} uniform", en3: "puts on {p} uniform" },
  { key: "salir", inf: "salir", name: "salir de casa", comp: "de casa", en: "leave home", en3: "leaves home" },
  { key: "ir", inf: "ir", name: "ir al colegio", comp: "al colegio", en: "go to school", en3: "goes to school" },
  { key: "volver", inf: "volver", name: "volver a casa", comp: "a casa", en: "go back home", en3: "goes back home" },
  { key: "deberes", inf: "hacer", name: "hacer los deberes", comp: "los deberes", en: "do {p} homework", en3: "does {p} homework" },
  { key: "acostarse", inf: "acostarse", name: "acostarse", comp: "", en: "go to bed", en3: "goes to bed" },
  { key: "dormirse", inf: "dormir", name: "dormirse", compose: true, comp: "", en: "fall asleep", en3: "falls asleep" },
];

const PRON: Record<Person, string> = { yo: "me", tú: "te", él: "se", nosotros: "nos", vosotros: "os", ellos: "se" };
const IDX: Record<Person, number> = { yo: 0, tú: 1, él: 2, nosotros: 3, vosotros: 4, ellos: 5 };
const ENDINGS: Record<"ar" | "er" | "ir", readonly string[]> = {
  ar: ["o", "as", "a", "amos", "áis", "an"],
  er: ["o", "es", "e", "emos", "éis", "en"],
  ir: ["o", "es", "e", "imos", "ís", "en"],
};
const SUBJECT_ES: Record<Person, string> = { yo: "Yo", tú: "Tú", él: "Mi hermana", nosotros: "Nosotros", vosotros: "Vosotros", ellos: "Mis padres" };
const SUBJECT_EN: Record<Person, [string, string]> = {
  yo: ["I", "my"],
  tú: ["You", "your"],
  él: ["My sister", "her"],
  nosotros: ["We", "our"],
  vosotros: ["You all", "your"],
  ellos: ["My parents", "their"],
};
const PERSON_SHORT: Record<Person, string> = { yo: "yo", tú: "tú", él: "él / ella", nosotros: "nosotros", vosotros: "vosotros", ellos: "ellos / ellas" };
const SEQUENCERS = ["", "Primero", "Luego", "Después", "Finalmente"] as const;
type Seq = (typeof SEQUENCERS)[number];

interface FormParts {
  pronoun: string;
  /** Pieces of the verb: plain stem, the changed vowel(s), rest of stem, ending; or the whole irregular form. */
  before: string;
  changed: string;
  after: string;
  ending: string;
  irregular: boolean;
  form: string;
}

function baseOf(v: RoutineVerb): string {
  return v.compose ? v.inf : v.inf.replace(/se$/, "");
}

function formParts(v: RoutineVerb, p: Person): FormParts {
  const info = verbInfo(v.inf);
  const reflexive = v.compose || !!info?.reflexive;
  const raw = conjugate(v.inf, "present", p);
  const verbOnly = info?.reflexive ? raw.replace(/^\S+ /, "") : raw;
  const pronoun = reflexive ? PRON[p] : "";
  const form = pronoun ? `${pronoun} ${verbOnly}` : verbOnly;
  const base = baseOf(v);
  const group = base.slice(-2) as "ar" | "er" | "ir";
  const regStem = base.slice(0, -2);
  const ending = ENDINGS[group][IDX[p]];
  const tags = info?.tags ?? [];
  const yoIrregular = p === "yo" && tags.includes("yo-go");
  if (v.inf === "ir" || yoIrregular || !verbOnly.endsWith(ending)) {
    return { pronoun, before: verbOnly, changed: "", after: "", ending: "", irregular: true, form };
  }
  const stem = verbOnly.slice(0, verbOnly.length - ending.length);
  const tag = tags.find((x) => x.startsWith("stem-"));
  if (tag && stem !== regStem) {
    const [from, to] = tag.slice(5).split("-");
    const at = regStem.lastIndexOf(from);
    return { pronoun, before: stem.slice(0, at), changed: stem.slice(at, at + to.length), after: stem.slice(at + to.length), ending, irregular: false, form };
  }
  return { pronoun, before: stem, changed: "", after: "", ending, irregular: false, form };
}

function stemNote(v: RoutineVerb): string {
  const tag = verbInfo(v.inf)?.tags.find((x) => x.startsWith("stem-"));
  return tag ? tag.slice(5).replace("-", "→") : "";
}

function timePhraseFor(q: number): { es: string; en: string; H: number } {
  const H = Math.floor(q / 4);
  const m = (q % 4) * 15;
  const parts = timeParts(h12(H), m);
  const prep = parts.named === 1 ? "a la" : "a las";
  const es = `${prep} ${parts.phrase.replace(/^las? /, "")} ${partOfDay(H, m)}`;
  return { es, en: `at ${h12(H)}:${pad2(m)} ${H < 12 ? "a.m." : "p.m."}`, H };
}

function VerbPieces({ fp }: { fp: FormParts }) {
  return (
    <>
      {fp.pronoun ? <span className="rounded bg-brand-soft px-1 text-brand">{fp.pronoun}</span> : null}
      {fp.pronoun ? " " : null}
      {fp.irregular ? (
        <span className="rounded bg-bad-soft px-1 text-bad">{fp.before}</span>
      ) : (
        <span>
          {fp.before}
          {fp.changed ? <span className="rounded bg-accent-soft px-0.5 text-accent underline decoration-2 underline-offset-4">{fp.changed}</span> : null}
          {fp.after}
          <span className="text-good">{fp.ending}</span>
        </span>
      )}
    </>
  );
}

function RoutineBuilder() {
  const [person, setPerson] = useState<Person>("yo");
  const [verbKey, setVerbKey] = useState("despertarse");
  const [q, setQ] = useState(7 * 4 + 2);
  const [showSubject, setShowSubject] = useState(false);
  const [seq, setSeq] = useState<Seq>("");

  const v = ROUTINE.find((x) => x.key === verbKey) ?? ROUTINE[0];
  const fp = useMemo(() => formParts(v, person), [v, person]);
  const table = useMemo(() => Object.fromEntries(PERSONS.map((p) => [p, formParts(v, p)])) as Record<Person, FormParts>, [v]);
  const time = timePhraseFor(q);
  const change = stemNote(v);
  const reflexive = !!fp.pronoun;
  const yoGo = verbInfo(v.inf)?.tags.includes("yo-go") ?? false;

  const capFirst = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
  const lowerFirst = (x: string) => x.charAt(0).toLowerCase() + x.slice(1);
  // Spanish: [Sequencer,] [subject] verb [complement] time.
  const subjEs = showSubject ? SUBJECT_ES[person] : "";
  const leadShown = seq ? `${seq},${subjEs ? ` ${lowerFirst(subjEs)}` : ""}` : subjEs;
  const restEs = [v.comp, time.es].filter(Boolean).join(" ");
  const sentence = capFirst(`${[leadShown, fp.form, restEs].filter(Boolean).join(" ")}.`);
  const verbFirst = !leadShown;

  // English gloss.
  const [enSubjFull, enPoss] = SUBJECT_EN[person];
  const enSubj = !showSubject && person === "él" ? "She" : !showSubject && person === "ellos" ? "They" : enSubjFull;
  const enVerb = (person === "él" ? v.en3 : v.en).replace("{p}", enPoss);
  const SEQ_EN: Record<Seq, string> = { "": "", Primero: "First", Luego: "Then", Después: "Afterwards", Finalmente: "Finally" };
  const english = seq ? `${SEQ_EN[seq]}, ${enSubj === "I" ? "I" : lowerFirst(enSubj)} ${enVerb} ${time.en}.` : `${enSubj} ${enVerb} ${time.en}.`;

  let caption: string;
  if (fp.irregular) {
    caption =
      v.inf === "ir"
        ? "*Ir* is completely irregular — *voy, vas, va, vamos, vais, van* — so the whole form is learnt by heart (red)."
        : `*${v.name}* has an irregular **yo** form ending in *-go* (red): *${fp.form}*. Every other person follows the normal pattern — switch to *tú* and see.`;
  } else if (change) {
    caption = `*${v.name}* is a boot verb (${change}). ${
      fp.changed
        ? `*${PERSON_SHORT[person]}* is inside the boot: the stress falls on the stem, so its vowel changes (orange).`
        : `*${PERSON_SHORT[person]}* is outside the boot: the stress falls on the ending, so the stem stays *${baseOf(v).slice(0, -2)}-*.`
    }${reflexive ? ` The pronoun *${fp.pronoun}* (blue) always matches the person.` : ""}`;
  } else if (reflexive) {
    caption = `Reflexive = the action bounces back to the person doing it. The pronoun *${fp.pronoun}* (blue) matches *${PERSON_SHORT[person]}*, and so does the ending *-${fp.ending}* (green) — two clues pointing at the same person.`;
  } else {
    caption = `*${v.name}* isn't reflexive, so there's no pronoun — just stem + ending *-${fp.ending}* (green).${yoGo ? " Try *yo*: its form is irregular." : ""}`;
  }
  caption += ` Time: *${time.es}* — *a la* for one o'clock, *a las* for every other hour.`;

  return (
    <WidgetFrame
      title="Constructor de rutina: me levanto, se levanta…"
      tryThis={[
        "Pick *acostarse* and predict the *nosotros* form before you tap it. Does o→ue happen?",
        "Find the three verbs whose *yo* form is irregular but whose *tú* form is regular.",
        "Switch *yo* → *ellos*: which two coloured parts of the verb change?",
        "Set the time to **12:45** and listen — why does it say *a la una*?",
      ]}
      caption={<span>{renderInline(caption)}</span>}
    >
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="text-sm font-semibold text-ink-2">Who?</div>
          <Segmented<Person> label="Person" options={PERSONS.map((p) => ({ value: p, label: PERSON_SHORT[p] }))} value={person} onChange={setPerson} />
        </div>

        <div className="space-y-1">
          <div id="rd-verb-label" className="text-sm font-semibold text-ink-2">
            Which part of the routine?
          </div>
          <div role="radiogroup" aria-labelledby="rd-verb-label" className="flex flex-wrap gap-1.5">
            {ROUTINE.map((r) => (
              <button
                key={r.key}
                type="button"
                role="radio"
                aria-checked={r.key === verbKey}
                lang="es"
                onClick={() => setVerbKey(r.key)}
                className={`min-h-10 rounded-lg border px-2.5 text-sm font-bold transition ${r.key === verbKey ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink-2 hover:text-ink"}`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Stepper label="Time" value={q} min={20} max={95} onChange={setQ} format={(x) => `${pad2(Math.floor(x / 4))}:${pad2((x % 4) * 15)}`} />
          <div className="space-y-1">
            <div className="text-sm font-semibold text-ink-2">Sequencer</div>
            <Segmented<Seq> label="Sequencer" options={SEQUENCERS.map((s) => ({ value: s, label: s || "none" }))} value={seq} onChange={setSeq} />
          </div>
        </div>
        <label className="flex min-h-10 cursor-pointer items-center gap-2 text-sm font-semibold text-ink-2">
          <input type="checkbox" className="h-5 w-5" checked={showSubject} onChange={(e) => setShowSubject(e.target.checked)} />
          Show a subject (<span lang="es">yo, mi hermana, mis padres…</span>) — optional in Spanish
        </label>

        <div className="rounded-xl border border-line bg-surface p-3" aria-live="polite">
          <div className="flex flex-wrap items-center gap-2">
            <p lang="es" className="text-xl font-extrabold leading-snug text-ink sm:text-2xl">
              {leadShown ? <span className="text-ink-2">{leadShown} </span> : null}
              {verbFirst ? <VerbPieces fp={{ ...fp, pronoun: fp.pronoun ? capFirst(fp.pronoun) : "", before: fp.pronoun ? fp.before : capFirst(fp.before) }} /> : <VerbPieces fp={fp} />}
              {restEs ? <span> {restEs}</span> : null}.
            </p>
            <SpeakButton text={sentence} />
          </div>
          <p className="mt-1 text-sm text-ink-2">{english}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-xs font-bold">
            <span className="rounded bg-brand-soft px-1.5 py-0.5 text-brand">pronoun</span>
            <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent">stem change</span>
            <span className="rounded px-1.5 py-0.5 text-good">ending</span>
            <span className="rounded bg-bad-soft px-1.5 py-0.5 text-bad">irregular</span>
          </div>
        </div>

        <div>
          <div className="mb-1 text-sm font-semibold text-ink-2">
            The whole verb {change ? <>— shaded cells are the “boot” ({change})</> : null}
          </div>
          <div className="grid grid-cols-2 gap-1.5" lang="es">
            {(["yo", "nosotros", "tú", "vosotros", "él", "ellos"] as Person[]).map((p) => {
              const inBoot = !!change && p !== "nosotros" && p !== "vosotros";
              const sel = p === person;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPerson(p)}
                  aria-pressed={sel}
                  aria-label={`${PERSON_SHORT[p]}: ${table[p].form}${inBoot ? " (inside the boot)" : ""}`}
                  className={`min-h-10 rounded-lg border px-2 py-1.5 text-left text-sm ${sel ? "border-brand ring-2 ring-brand" : "border-line"} ${inBoot ? "bg-accent-soft" : "bg-surface"}`}
                >
                  <span className="block text-xs font-bold text-ink-2">{PERSON_SHORT[p]}</span>
                  <span className="font-extrabold text-ink">
                    <VerbPieces fp={table[p]} />
                  </span>
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
    id: "rutina-diaria-clock",
    title: "El reloj — clock ↔ Spanish time",
    blurb: "Move an honest analogue clock and watch the Spanish time change — or read the Spanish and set the clock.",
    Component: ClockWidget,
  },
  {
    id: "rutina-diaria-routine-builder",
    title: "Constructor de rutina — reflexive routine builder",
    blurb: "Choose who, which routine verb and what time; see the pronoun, stem change and ending light up.",
    Component: RoutineBuilder,
  },
];
