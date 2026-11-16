"use client";
// Interactive explorables for topic "deportes": the jugar a / hacer sorter
// (with the a + el = al contraction) and the frequency ladder (nunca placement).
import { useId, useMemo, useState } from "react";
import { WidgetFrame, Segmented, Slider, Readout, type WidgetDef } from "./kit";
import { speakSpanish } from "@/lib/speech";
import { conjugate, PERSON_LABEL, type Person } from "@/lib/spanish/verbs";

// ---------------------------------------------------------------------------
// Shared lexicon
// ---------------------------------------------------------------------------

type Art = "el" | "la" | "los" | "las";
type Kind = "jugar" | "hacer";

interface WSport {
  id: string;
  noun: string;
  art: Art;
  emoji: string;
  en: string;
  kind: Kind;
  /** English base phrase: "play tennis", "go swimming", "do yoga". */
  enDo: string;
}

const SPORTS: WSport[] = [
  { id: "futbol", noun: "fútbol", art: "el", emoji: "⚽", en: "football", kind: "jugar", enDo: "play football" },
  { id: "baloncesto", noun: "baloncesto", art: "el", emoji: "🏀", en: "basketball", kind: "jugar", enDo: "play basketball" },
  { id: "tenis", noun: "tenis", art: "el", emoji: "🎾", en: "tennis", kind: "jugar", enDo: "play tennis" },
  { id: "voleibol", noun: "voleibol", art: "el", emoji: "🏐", en: "volleyball", kind: "jugar", enDo: "play volleyball" },
  { id: "hockey", noun: "hockey", art: "el", emoji: "🏑", en: "hockey", kind: "jugar", enDo: "play hockey" },
  { id: "badminton", noun: "bádminton", art: "el", emoji: "🏸", en: "badminton", kind: "jugar", enDo: "play badminton" },
  { id: "rugby", noun: "rugby", art: "el", emoji: "🏉", en: "rugby", kind: "jugar", enDo: "play rugby" },
  { id: "golf", noun: "golf", art: "el", emoji: "⛳", en: "golf", kind: "jugar", enDo: "play golf" },
  { id: "padel", noun: "pádel", art: "el", emoji: "🏓", en: "padel", kind: "jugar", enDo: "play padel" },
  { id: "ajedrez", noun: "ajedrez", art: "el", emoji: "♟️", en: "chess", kind: "jugar", enDo: "play chess" },
  { id: "pelota", noun: "pelota", art: "la", emoji: "🔴", en: "ball", kind: "jugar", enDo: "play ball" },
  { id: "bolos", noun: "bolos", art: "los", emoji: "🎳", en: "bowling", kind: "jugar", enDo: "go bowling" },
  { id: "cartas", noun: "cartas", art: "las", emoji: "🃏", en: "cards", kind: "jugar", enDo: "play cards" },
  { id: "natacion", noun: "natación", art: "la", emoji: "🏊", en: "swimming", kind: "hacer", enDo: "go swimming" },
  { id: "atletismo", noun: "atletismo", art: "el", emoji: "🏃", en: "athletics", kind: "hacer", enDo: "do athletics" },
  { id: "ciclismo", noun: "ciclismo", art: "el", emoji: "🚴", en: "cycling", kind: "hacer", enDo: "go cycling" },
  { id: "equitacion", noun: "equitación", art: "la", emoji: "🏇", en: "horse riding", kind: "hacer", enDo: "go horse riding" },
  { id: "vela", noun: "vela", art: "la", emoji: "⛵", en: "sailing", kind: "hacer", enDo: "go sailing" },
  { id: "esqui", noun: "esquí", art: "el", emoji: "⛷️", en: "skiing", kind: "hacer", enDo: "go skiing" },
  { id: "patinaje", noun: "patinaje", art: "el", emoji: "⛸️", en: "skating", kind: "hacer", enDo: "go skating" },
  { id: "gimnasia", noun: "gimnasia", art: "la", emoji: "🤸", en: "gymnastics", kind: "hacer", enDo: "do gymnastics" },
  { id: "karate", noun: "kárate", art: "el", emoji: "🥋", en: "karate", kind: "hacer", enDo: "do karate" },
  { id: "yoga", noun: "yoga", art: "el", emoji: "🧘", en: "yoga", kind: "hacer", enDo: "do yoga" },
];

/** Fixed mixed order for "predict first" mode (no randomness during render). */
const PREDICT_ORDER = ["tenis", "natacion", "bolos", "yoga", "futbol", "equitacion", "cartas", "atletismo", "hockey", "vela", "badminton", "karate", "pelota", "ciclismo", "golf", "gimnasia", "rugby", "esqui", "baloncesto", "patinaje", "voleibol", "ajedrez", "padel"];

interface Subject {
  id: string;
  label: string;
  p: Person;
  es: string;
  en: string;
  /** Pronoun usually left out in Spanish (the ending shows the person). */
  optional: boolean;
}

const SUBJECTS: Subject[] = [
  { id: "yo", label: "yo", p: "yo", es: "yo", en: "I", optional: true },
  { id: "tú", label: "tú", p: "tú", es: "tú", en: "you", optional: true },
  { id: "él", label: "él", p: "él", es: "él", en: "he", optional: false },
  { id: "ella", label: "ella", p: "él", es: "ella", en: "she", optional: false },
  { id: "nosotros", label: "nosotros", p: "nosotros", es: "nosotros", en: "we", optional: true },
  { id: "vosotros", label: "vosotros", p: "vosotros", es: "vosotros", en: "you all", optional: true },
  { id: "ellos", label: "ellos", p: "ellos", es: "ellos", en: "they", optional: false },
];

const sportById = (id: string) => SPORTS.find((s) => s.id === id) ?? SPORTS[0];
const subjById = (id: string) => SUBJECTS.find((s) => s.id === id) ?? SUBJECTS[0];
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function enVerb(base: string, s3: boolean): string {
  if (!s3) return base;
  const [head, ...rest] = base.split(" ");
  const m: Record<string, string> = { play: "plays", go: "goes", do: "does" };
  return [m[head] ?? head + "s", ...rest].join(" ");
}

// ---------------------------------------------------------------------------
// Highlighted sentence tokens
// ---------------------------------------------------------------------------

type Tone = "plain" | "verb" | "hl" | "glue" | "neg" | "muted" | "freq";
interface Part {
  t: string;
  tone?: Tone;
}
type Token = Part[];

const TONE: Record<Tone, string> = {
  plain: "",
  verb: "font-extrabold text-brand",
  hl: "rounded bg-accent-soft px-0.5 font-extrabold text-accent underline decoration-2 underline-offset-4",
  glue: "rounded bg-good-soft px-1 font-extrabold text-good",
  neg: "rounded bg-bad-soft px-1 font-extrabold text-bad",
  muted: "text-ink-2",
  freq: "rounded bg-brand-soft px-1 font-extrabold text-brand",
};

function tokensToText(tokens: Token[]): string {
  const s = tokens.map((tk) => tk.map((p) => p.t).join("")).join(" ");
  return cap(s) + ".";
}

function Sentence({ tokens }: { tokens: Token[] }) {
  return (
    <span lang="es">
      {tokens.map((tk, i) => (
        <span key={i}>
          {i > 0 ? " " : ""}
          {tk.map((p, j) => (
            <span key={j} className={TONE[p.tone ?? "plain"]}>
              {i === 0 && j === 0 ? cap(p.t) : p.t}
            </span>
          ))}
        </span>
      ))}
      .
    </span>
  );
}

/** Present-tense verb with the stem change (jueg-) or irregular yo (hag-) picked out. */
function presentVerb(inf: Kind, p: Person): Token {
  const form = conjugate(inf, "present", p);
  if (inf === "jugar") {
    const i = form.indexOf("ue");
    if (i >= 0) return [{ t: form.slice(0, i), tone: "verb" }, { t: "ue", tone: "hl" }, { t: form.slice(i + 2), tone: "verb" }];
  }
  if (inf === "hacer" && p === "yo") return [{ t: "ha", tone: "verb" }, { t: "g", tone: "hl" }, { t: form.slice(3), tone: "verb" }];
  return [{ t: form, tone: "verb" }];
}

function objectTokens(sp: WSport): Token[] {
  if (sp.kind === "hacer") return [[{ t: sp.noun }]];
  if (sp.art === "el") return [[{ t: "al", tone: "glue" }], [{ t: sp.noun }]];
  return [[{ t: "a", tone: "glue" }], [{ t: sp.art }], [{ t: sp.noun }]];
}

function ListenButton({ text }: { text: string }) {
  return (
    <button type="button" className="btn btn-secondary btn-sm shrink-0" onClick={() => speakSpanish(text)} aria-label={`Listen: ${text}`}>
      🔊 <span className="sr-only sm:not-sr-only">Listen</span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Widget 1: jugar a vs hacer sorter
// ---------------------------------------------------------------------------

function JugarHacerSorter() {
  const [sportId, setSportId] = useState("tenis");
  const [subjId, setSubjId] = useState("yo");
  const [tense, setTense] = useState<"present" | "near-future">("present");
  const [mode, setMode] = useState<"explore" | "predict">("explore");
  const [guess, setGuess] = useState<Kind | null>(null);
  const [score, setScore] = useState({ right: 0, total: 0, streak: 0 });

  const sport = sportById(sportId);
  const subj = subjById(subjId);
  const revealed = mode === "explore" || guess !== null;

  const built = useMemo(() => {
    const tokens: Token[] = [];
    if (!subj.optional) tokens.push([{ t: subj.es }]);
    if (tense === "present") tokens.push(presentVerb(sport.kind, subj.p));
    else tokens.push([{ t: conjugate("ir", "present", subj.p), tone: "verb" }], [{ t: "a", tone: "glue" }], [{ t: sport.kind }]);
    tokens.push(...objectTokens(sport));
    const s3 = subj.p === "él";
    const be = subj.p === "yo" ? "am" : s3 ? "is" : "are";
    const english = tense === "present" ? `${cap(subj.en)} ${enVerb(sport.enDo, s3)}.` : `${cap(subj.en)} ${be} going to ${sport.enDo}.`;
    return { tokens, text: tokensToText(tokens), english };
  }, [sport, subj, tense]);

  function choose(id: string) {
    setSportId(id);
    setGuess(null);
  }
  function makeGuess(g: Kind) {
    if (guess) return;
    setGuess(g);
    const ok = g === sport.kind;
    setScore((s) => ({ right: s.right + (ok ? 1 : 0), total: s.total + 1, streak: ok ? s.streak + 1 : 0 }));
  }

  const form = conjugate(sport.kind, "present", subj.p);
  const inBoot = subj.p !== "nosotros" && subj.p !== "vosotros";
  const contraction =
    sport.kind === "hacer" ? "none — hacer + activity" : sport.art === "el" ? "a + el → al" : `a + ${sport.art} → a ${sport.art}`;

  const chip = (sp: WSport) => {
    const on = sp.id === sportId;
    return (
      <button
        key={sp.id}
        type="button"
        aria-pressed={on}
        onClick={() => choose(sp.id)}
        className={`btn btn-sm ${on ? "btn-primary" : "btn-secondary"}`}
      >
        <span aria-hidden>{sp.emoji}</span>
        <span lang="es">
          {sp.art} {sp.noun}
        </span>
      </button>
    );
  };

  const caption = !revealed ? (
    <p>
      Predict first: is <em lang="es">{sport.art} {sport.noun}</em> ({sport.en}) a game you <strong>play</strong> (<em lang="es">jugar a</em>) or an
      activity you <strong>do</strong> (<em lang="es">hacer</em>)? Tap your choice to see the sentence.
    </p>
  ) : (
    <div className="space-y-2">
      {sport.kind === "jugar" ? (
        <p>
          <em lang="es">{cap(sport.noun)}</em> is a game you play, so the verb is <strong lang="es">jugar a</strong>.{" "}
          {sport.art === "el" ? (
            <>
              <em lang="es">A</em> meets <em lang="es">el</em> and they squash into <strong lang="es">al</strong> (Spanish avoids the clash <em lang="es">a el</em>).
            </>
          ) : (
            <>
              <em lang="es">{cap(sport.noun)}</em> takes <em lang="es">{sport.art}</em>, and only <em lang="es">a + el</em> contracts — so it stays{" "}
              <strong lang="es">a {sport.art}</strong>.
            </>
          )}
        </p>
      ) : (
        <p>
          <em lang="es">{cap(sport.noun)}</em> is an activity, not a game you play against someone, so the verb is <strong lang="es">hacer</strong> —
          with no <em lang="es">a</em> and usually no article.
        </p>
      )}
      {tense === "present" ? (
        sport.kind === "jugar" ? (
          <p>
            <em lang="es">Jugar</em> is a boot verb (u → ue). <em lang="es">{cap(PERSON_LABEL[subj.p])}</em> is {inBoot ? "inside" : "outside"} the boot,
            so it's <strong lang="es">{form}</strong>{inBoot ? " — see the highlighted ue" : " — no ue here"}.
          </p>
        ) : (
          <p>
            <em lang="es">Hacer</em> is regular except <em lang="es">yo</em>: <strong lang="es">hago</strong>. For <em lang="es">{PERSON_LABEL[subj.p]}</em> it's{" "}
            <strong lang="es">{form}</strong>.
          </p>
        )
      ) : (
        <p>
          In a plan only <em lang="es">ir</em> changes (<strong lang="es">{conjugate("ir", "present", subj.p)}</strong>); <em lang="es">{sport.kind}</em>{" "}
          stays in the infinitive — and everything after it ({sport.kind === "jugar" ? <em lang="es">{sport.art === "el" ? "al" : `a ${sport.art}`}</em> : "no article"}) stays the same.
        </p>
      )}
    </div>
  );

  return (
    <WidgetFrame
      title="Jugar a or hacer? The sport sorter"
      tryThis={[
        "Pick *el tenis* and switch from *yo* to *nosotros*: does the *ue* survive?",
        "Find three games where *a* does **not** squash into *al*. What do they have in common?",
        "Turn on *Predict first* and sort every sport — can you get a streak of 10?",
        "Switch to *Plan (voy a…)*: which verb changes with the person now?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Segmented
            label="Mode"
            value={mode}
            onChange={(m) => {
              setMode(m);
              setGuess(null);
            }}
            options={[
              { value: "explore", label: "Explore" },
              { value: "predict", label: "Predict first" },
            ]}
          />
          <Segmented
            label="Tense"
            value={tense}
            onChange={setTense}
            options={[
              { value: "present", label: "Present (juego)" },
              { value: "near-future", label: "Plan (voy a…)" },
            ]}
          />
        </div>

        <div>
          <div className="mb-1 text-sm font-semibold text-ink-2">
            Who?
          </div>
          <Segmented label="Who does the sport?" value={subjId} onChange={setSubjId} options={SUBJECTS.map((s) => ({ value: s.id, label: s.label }))} />
        </div>

        {mode === "explore" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {(["jugar", "hacer"] as const).map((k) => (
              <div key={k} className="rounded-xl border border-line bg-surface-2 p-3">
                <div className="mb-2 text-sm font-extrabold text-ink" lang="es">
                  {k === "jugar" ? "jugar a… (games)" : "hacer… (activities)"}
                </div>
                <div className="flex flex-wrap gap-2" role="group" aria-label={k === "jugar" ? "Games with jugar a" : "Activities with hacer"}>
                  {SPORTS.filter((s) => s.kind === k).map(chip)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Sports, mixed up">
              {PREDICT_ORDER.map((id) => chip(sportById(id)))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-ink-2">
                <span lang="es">{sport.art} {sport.noun}</span> goes with…
              </span>
              {(["jugar", "hacer"] as const).map((g) => {
                const state = guess === null ? "" : g === sport.kind ? "btn-good" : guess === g ? "btn-secondary line-through" : "btn-secondary";
                return (
                  <button key={g} type="button" disabled={guess !== null} onClick={() => makeGuess(g)} className={`btn btn-sm ${state || "btn-secondary"}`} lang="es">
                    {g === "jugar" ? "jugar a" : "hacer"}
                  </button>
                );
              })}
              {guess !== null ? (
                <span className={`text-sm font-bold ${guess === sport.kind ? "text-good" : "text-bad"}`} role="status">
                  {guess === sport.kind ? "✓ Right!" : `✗ It's ${sport.kind === "jugar" ? "jugar a" : "hacer"}.`}
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-2">
              <Readout label="Score" value={`${score.right} / ${score.total}`} tone="ink" />
              <Readout label="Streak" value={score.streak} tone={score.streak >= 5 ? "good" : "brand"} />
            </div>
          </div>
        )}

        <div className="rounded-xl border border-line bg-surface p-3" aria-live="polite">
          {revealed ? (
            <>
              <div className="flex items-start justify-between gap-3">
                <p className="text-xl font-bold leading-relaxed text-ink sm:text-2xl">
                  <Sentence tokens={built.tokens} />
                </p>
                <ListenButton text={built.text} />
              </div>
              <p className="mt-1 text-sm text-ink-2">
                {built.english}
                {subj.optional ? (
                  <>
                    {" "}
                    · You can add <em lang="es">{subj.es}</em>, but the verb ending already tells you who.
                  </>
                ) : null}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-ink-2">?</p>
          )}
        </div>

        {revealed ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Readout label="Verb" value={<span lang="es">{sport.kind === "jugar" ? "jugar a" : "hacer"}</span>} />
            <Readout label="Person" value={<span lang="es">{PERSON_LABEL[subj.p]}</span>} tone="ink" />
            <Readout label="a + article" value={<span lang="es">{contraction}</span>} tone={sport.kind === "jugar" && sport.art === "el" ? "good" : "ink"} />
          </div>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// Widget 2: frequency ladder
// ---------------------------------------------------------------------------

interface Rung {
  es: string;
  en: string;
  neg: boolean;
  /** Where the English adverb sits. */
  enEnd: boolean;
}

const LADDER: Rung[] = [
  { es: "nunca", en: "never", neg: true, enEnd: false },
  { es: "casi nunca", en: "hardly ever", neg: true, enEnd: false },
  { es: "de vez en cuando", en: "from time to time", neg: false, enEnd: true },
  { es: "a veces", en: "sometimes", neg: false, enEnd: false },
  { es: "a menudo", en: "often", neg: false, enEnd: false },
  { es: "siempre", en: "always", neg: false, enEnd: false },
];

type Pos = "before" | "after" | "end";

function FrequencyLadder() {
  const [idx, setIdx] = useState(0);
  const [subjId, setSubjId] = useState("yo");
  const [sportId, setSportId] = useState("tenis");
  const [pos, setPos] = useState<Pos>("after");
  const selectId = useId();

  const rung = LADDER[idx];
  const subj = subjById(subjId);
  const sport = sportById(sportId);

  const built = useMemo(() => {
    const S: Token[] = subj.optional ? [] : [[{ t: subj.es }]];
    const V: Token = presentVerb(sport.kind, subj.p);
    const O = objectTokens(sport);
    const F: Token = [{ t: rung.es, tone: "freq" }];
    const NO: Token = [{ t: "no", tone: "neg" }];
    let tokens: Token[];
    if (pos === "before") tokens = [...S, F, V, ...O];
    else if (pos === "after") tokens = rung.neg ? [...S, NO, V, F, ...O] : [...S, V, F, ...O];
    else tokens = rung.neg ? [...S, NO, V, ...O, F] : [...S, V, ...O, F];
    const wrong: Token[] | null = rung.neg && pos !== "before" ? (pos === "after" ? [...S, V, F, ...O] : [...S, V, ...O, F]) : null;
    const s3 = subj.p === "él";
    const verbEn = enVerb(sport.enDo, s3);
    const english = rung.enEnd ? `${cap(subj.en)} ${verbEn} ${rung.en}.` : `${cap(subj.en)} ${rung.en} ${verbEn}.`;
    return { tokens, text: tokensToText(tokens), wrong, wrongText: wrong ? tokensToText(wrong) : "", english };
  }, [rung, subj, sport, pos]);

  // SVG ladder geometry: rung 0 (nunca) at the bottom, rung 5 (siempre) at the top.
  const rungY = (i: number) => 228 - i * 40;

  const caption = rung.neg ? (
    pos === "before" ? (
      <p>
        <strong lang="es">{cap(rung.es)}</strong> before the verb works <strong>on its own</strong> — no extra <em lang="es">no</em>. Now move it{" "}
        <em>after the verb</em> and watch what Spanish has to add.
      </p>
    ) : (
      <p>
        <strong lang="es">{cap(rung.es)}</strong> after the verb needs <strong lang="es">no</strong> in front of the verb: a negative sandwich{" "}
        <em lang="es">no + verb + {rung.es}</em>. Spanish is happy with a double negative — <em lang="es">{built.wrongText}</em> on its own is wrong.
      </p>
    )
  ) : (
    <p>
      <strong lang="es">{cap(rung.es)}</strong> ({rung.en}) is positive, so no <em lang="es">no</em> is ever needed.{" "}
      {rung.es === "de vez en cuando"
        ? "Longer phrases like this sound most natural at the start or the very end."
        : "Short words like this can go before the verb, straight after it, or at the very end."}{" "}
      The verb itself never changes — only the person does.
    </p>
  );

  return (
    <WidgetFrame
      title="The frequency ladder: from nunca to siempre"
      tryThis={[
        "Slide down to *nunca* and choose **after the verb** — what extra word appears, and why?",
        "Find the two rungs that need *no* when they come after the verb.",
        "Build '*She often goes swimming*', then press 🔊 and say it with the voice.",
        "Put *a menudo* in all three positions — does the verb change at all?",
      ]}
      caption={caption}
    >
      <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
        <svg
          viewBox="0 0 240 256"
          className="mx-auto h-auto w-full max-w-[240px]"
          role="img"
          aria-label={`Frequency ladder from nunca (never) at the bottom to siempre (always) at the top. Selected rung: ${rung.es} (${rung.en}).`}
        >
          <line x1={24} y1={10} x2={24} y2={248} className="stroke-ink-2" strokeWidth={4} strokeLinecap="round" />
          <line x1={64} y1={10} x2={64} y2={248} className="stroke-ink-2" strokeWidth={4} strokeLinecap="round" />
          {LADDER.map((r, i) => {
            const y = rungY(i);
            const on = i === idx;
            return (
              <g key={r.es}>
                <rect x={22} y={y - 5} width={44} height={10} rx={3} className={on ? "fill-brand" : "fill-line"} />
                {r.neg ? <circle cx={44} cy={y} r={3} className="fill-bad" /> : null}
                <text x={76} y={y + 2} fontSize={14} fontWeight={on ? 800 : 600} className={on ? "fill-brand" : "fill-ink"}>
                  {r.es}
                </text>
                <text x={76} y={y + 17} fontSize={11} className="fill-ink-2">
                  {r.en}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="space-y-4">
          <Slider label="How often?" value={idx} min={0} max={LADDER.length - 1} onChange={setIdx} format={(v) => <span lang="es">{LADDER[v].es}</span>} />

          <div>
            <div className="mb-1 text-sm font-semibold text-ink-2">Where does it go?</div>
            <Segmented
              label="Position of the frequency expression"
              value={pos}
              onChange={setPos}
              options={[
                { value: "before", label: "Before the verb" },
                { value: "after", label: "After the verb" },
                { value: "end", label: "At the end" },
              ]}
            />
          </div>

          <div>
            <div className="mb-1 text-sm font-semibold text-ink-2">Who?</div>
            <Segmented label="Who does the sport?" value={subjId} onChange={setSubjId} options={SUBJECTS.map((s) => ({ value: s.id, label: s.label }))} />
          </div>

          <div className="space-y-1">
            <label htmlFor={selectId} className="text-sm font-semibold text-ink-2">
              Sport
            </label>
            <select id={selectId} className="input" value={sportId} onChange={(e) => setSportId(e.target.value)}>
              <optgroup label="jugar a…">
                {SPORTS.filter((s) => s.kind === "jugar").map((s) => (
                  <option key={s.id} value={s.id} lang="es">
                    {s.emoji} {s.art} {s.noun}
                  </option>
                ))}
              </optgroup>
              <optgroup label="hacer…">
                {SPORTS.filter((s) => s.kind === "hacer").map((s) => (
                  <option key={s.id} value={s.id} lang="es">
                    {s.emoji} {s.art} {s.noun}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-2 rounded-xl border border-line bg-surface p-3" aria-live="polite">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xl font-bold leading-relaxed text-ink sm:text-2xl">
            <Sentence tokens={built.tokens} />
          </p>
          <ListenButton text={built.text} />
        </div>
        <p className="text-sm text-ink-2">{built.english}</p>
        {built.wrong ? (
          <p className="text-sm">
            <span className="font-bold text-bad" aria-hidden>
              ✗{" "}
            </span>
            <span className="sr-only">Wrong: </span>
            <span lang="es" className="text-bad line-through">
              {built.wrongText}
            </span>{" "}
            <span className="text-ink-2">— missing the <em lang="es">no</em>.</span>
          </p>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------

export const widgets: WidgetDef[] = [
  {
    id: "deportes-jugar-hacer-sorter",
    title: "Jugar a or hacer? The sport sorter",
    blurb: "Pick a sport and a person: the machine chooses jugar a or hacer, conjugates it and shows when a + el squashes into al.",
    Component: JugarHacerSorter,
  },
  {
    id: "deportes-frequency-ladder",
    title: "The frequency ladder",
    blurb: "Climb from nunca to siempre and move the frequency word around the sentence — watch when Spanish needs an extra no.",
    Component: FrequencyLadder,
  },
];
