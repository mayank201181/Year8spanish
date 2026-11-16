"use client";
import { useState, type ReactNode } from "react";
import { WidgetFrame, Stepper, type WidgetDef } from "./kit";
import { conjugate, PERSONS, type Person } from "@/lib/spanish/verbs";
import { speakSpanish } from "@/lib/speech";

// ---------------------------------------------------------------------------
// Shared bits
// ---------------------------------------------------------------------------

type Tone = "pron" | "verb" | "neg" | "inf" | "plain";
interface Seg {
  t: string;
  tone?: Tone;
}

const TONE_CLASS: Record<Tone, string> = {
  pron: "rounded-md bg-brand-soft px-1 text-brand",
  verb: "rounded-md bg-accent-soft px-1 text-ink underline decoration-accent decoration-2 underline-offset-4",
  neg: "rounded-md bg-bad-soft px-1 text-bad",
  inf: "rounded-md bg-good-soft px-1 text-good",
  plain: "",
};

const plainText = (segs: Seg[]) => segs.map((s) => s.t).join("");

function SpanishLine({ segs, className = "" }: { segs: Seg[]; className?: string }) {
  return (
    <span lang="es" className={className}>
      {segs.map((s, i) => (
        <span key={i} className={s.tone ? TONE_CLASS[s.tone] : ""}>
          {s.t}
        </span>
      ))}
    </span>
  );
}

function SpeakButton({ text, label = "Listen in Spanish" }: { text: string; label?: string }) {
  return (
    <button type="button" className="btn btn-secondary btn-sm shrink-0" onClick={() => speakSpanish(text)} aria-label={label} title={label}>
      <span aria-hidden>🔊</span>
    </button>
  );
}

/** Tap-to-choose buttons (≥ 40 px touch targets). */
function Choice<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: ReactNode }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-2">{label}</div>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-1.5">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={String(o.value)}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(o.value)}
              className={`min-h-10 rounded-xl border px-3 py-1.5 text-sm font-bold transition ${
                on ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink-2 hover:text-ink"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// 1. The gustar machine
// ---------------------------------------------------------------------------

interface Who {
  key: string;
  label: string;
  /** a-phrase for emphasis / naming. */
  a: string;
  pron: "me" | "te" | "le" | "nos" | "os" | "les";
  en: string;
  obj: string;
  s3: boolean;
  /** A named person/people: the a-phrase is required. */
  named: boolean;
}

const WHO: Who[] = [
  { key: "yo", label: "yo", a: "A mí", pron: "me", en: "I", obj: "me", s3: false, named: false },
  { key: "tu", label: "tú", a: "A ti", pron: "te", en: "you", obj: "you", s3: false, named: false },
  { key: "madre", label: "mi madre", a: "A mi madre", pron: "le", en: "my mum", obj: "my mum", s3: true, named: true },
  { key: "pablo", label: "Pablo", a: "A Pablo", pron: "le", en: "Pablo", obj: "Pablo", s3: true, named: true },
  { key: "nos", label: "nosotros", a: "A nosotros", pron: "nos", en: "we", obj: "us", s3: false, named: false },
  { key: "vos", label: "vosotros", a: "A vosotros", pron: "os", en: "you all", obj: "you all", s3: false, named: false },
  { key: "amigos", label: "mis amigos", a: "A mis amigos", pron: "les", en: "my friends", obj: "my friends", s3: false, named: true },
  { key: "padres", label: "mis padres", a: "A mis padres", pron: "les", en: "my parents", obj: "my parents", s3: false, named: true },
];

const PRONOUN_ROWS: { pron: Who["pron"]; a: string }[] = [
  { pron: "me", a: "a mí" },
  { pron: "te", a: "a ti" },
  { pron: "le", a: "a él / a ella" },
  { pron: "nos", a: "a nosotros" },
  { pron: "os", a: "a vosotros" },
  { pron: "les", a: "a ellos / a ellas" },
];

type Kind = "sing" | "plur" | "inf";
interface Thing {
  es: string;
  en: string;
  /** English verb agreement when the thing is the English subject (bore / bores). */
  enPl: boolean;
}
const THINGS: Record<Kind, Thing[]> = {
  sing: [
    { es: "la música", en: "music", enPl: false },
    { es: "el cine", en: "the cinema", enPl: false },
    { es: "la tele", en: "TV", enPl: false },
    { es: "el rap", en: "rap", enPl: false },
    { es: "la música clásica", en: "classical music", enPl: false },
  ],
  plur: [
    { es: "los videojuegos", en: "video games", enPl: true },
    { es: "las comedias", en: "comedies", enPl: true },
    { es: "los documentales", en: "documentaries", enPl: true },
    { es: "los dibujos animados", en: "cartoons", enPl: true },
    { es: "las películas de terror", en: "horror films", enPl: true },
    { es: "las noticias", en: "the news", enPl: false },
  ],
  inf: [
    { es: "leer", en: "reading", enPl: false },
    { es: "bailar", en: "dancing", enPl: false },
    { es: "cocinar", en: "cooking", enPl: false },
    { es: "ir de compras", en: "going shopping", enPl: false },
    { es: "tocar la guitarra", en: "playing the guitar", enPl: false },
    { es: "bailar y cantar", en: "dancing and singing", enPl: true },
  ],
};
const KIND_LABEL: Record<Kind, string> = { sing: "one thing", plur: "plural things", inf: "an activity" };

type GVerb = "gustar" | "encantar" | "interesar" | "aburrir";
const GV: Record<GVerb, { one: string; many: string; en: string }> = {
  gustar: { one: "gusta", many: "gustan", en: "like" },
  encantar: { one: "encanta", many: "encantan", en: "love" },
  interesar: { one: "interesa", many: "interesan", en: "be interested in" },
  aburrir: { one: "aburre", many: "aburren", en: "be bored by" },
};

function englishFor(who: Who, verb: GVerb, thing: Thing, neg: boolean): string {
  const S = cap(who.en);
  const be = who.key === "yo" ? "am" : who.s3 ? "is" : "are";
  switch (verb) {
    case "gustar":
      return neg ? `${S} ${who.s3 ? "doesn't" : "don't"} like ${thing.en}.` : `${S} ${who.s3 ? "likes" : "like"} ${thing.en}.`;
    case "encantar":
      return neg ? `${S} ${who.s3 ? "doesn't" : "don't"} love ${thing.en}.` : `${S} ${who.s3 ? "loves" : "love"} ${thing.en}.`;
    case "interesar":
      return `${S} ${be}${neg ? " not" : ""} interested in ${thing.en}.`;
    case "aburrir":
      return `${cap(thing.en)} ${neg ? (thing.enPl ? "don't bore" : "doesn't bore") : thing.enPl ? "bore" : "bores"} ${who.obj}.`;
  }
}

function GustarMachine() {
  const [whoKey, setWhoKey] = useState("amigos");
  const [kind, setKind] = useState<Kind>("plur");
  const [thingIdx, setThingIdx] = useState(0);
  const [verb, setVerb] = useState<GVerb>("gustar");
  const [neg, setNeg] = useState(false);
  const [emph, setEmph] = useState(true);
  const [predict, setPredict] = useState(false);
  const [revealed, setRevealed] = useState(false);

  /** Any change hides the answer again in predict mode. */
  const touch = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setRevealed(false);
  };

  const who = WHO.find((w) => w.key === whoKey) ?? WHO[0];
  const things = THINGS[kind];
  const thing = things[Math.min(thingIdx, things.length - 1)];
  const plural = kind === "plur";
  const form = plural ? GV[verb].many : GV[verb].one;
  const showA = who.named || emph;
  const hidden = predict && !revealed;

  const segs: Seg[] = [];
  if (showA) segs.push({ t: `${who.a} ` });
  if (neg) segs.push({ t: showA ? "no" : "No", tone: "neg" }, { t: " " });
  const pronText = !showA && !neg ? cap(who.pron) : who.pron;
  segs.push({ t: hidden ? "¿?" : pronText, tone: "pron" }, { t: " " }, { t: hidden ? "¿?" : form, tone: "verb" }, { t: ` ${thing.es}.` });
  const spoken = `${showA ? who.a + " " : ""}${neg ? "no " : ""}${who.pron} ${form} ${thing.es}.`;
  const english = englishFor(who, verb, thing, neg);

  const es = (t: string) => <span lang="es">{t}</span>;
  const reason =
    kind === "plur" ? (
      <>
        <em>{es(thing.es)}</em> is plural, so the verb takes <strong>-n</strong>: {es(form)}.
      </>
    ) : kind === "inf" ? (
      <>
        <em>{es(thing.es)}</em> is an activity (an infinitive). Activities always count as singular{thing.es.includes(" y ") ? " — even two of them" : ""}:{" "}
        {es(form)}.
      </>
    ) : (
      <>
        <em>{es(thing.es)}</em> is one thing, so the verb is singular: {es(form)}.
      </>
    );

  return (
    <WidgetFrame
      title="The gustar machine"
      tryThis={[
        "Predict first: switch on **Predict**, then build *A mis padres ___ las noticias*. Which pronoun and which form? Reveal to check.",
        "Keep the person, swap *la película*-style singulars for plurals. Which word changes — the pronoun or the verb?",
        "Choose *bailar y cantar*. Two activities… so why is it still *gusta*?",
        "Pick *aburrir* and compare the English: who is the subject in English? Who is it in Spanish?",
      ]}
      caption={
        <div className="space-y-1.5">
          <p>
            <strong>Who is pleased?</strong> <span lang="es">{who.a}</span> →{" "}
            <span lang="es" className={TONE_CLASS.pron}>
              {hidden ? "?" : who.pron}
            </span>
            . The pronoun changes with the <em>person</em>.
          </p>
          <p>
            <strong>What pleases?</strong> {hidden ? "Reveal to see the rule for this sentence." : reason} The verb agrees with the <em>thing</em>,
            never with the person — that&apos;s why &ldquo;I like&rdquo; is never <em lang="es">me gusto</em>.
          </p>
          {who.named ? (
            <p>
              When you name the person you need <span lang="es">a</span> (<span lang="es">{who.a}</span>) — and the pronoun stays too, even
              though it seems to repeat them.
            </p>
          ) : (
            <p>
              <span lang="es">{who.a}</span> is optional — it just adds emphasis or contrast (&ldquo;<em>I</em> like…, but…&rdquo;).
            </p>
          )}
          {neg ? (
            <p>
              <span lang="es">No</span> goes in front of the pronoun{hidden ? "" : <>: <span lang="es">no {who.pron} {form}</span></>}.
            </p>
          ) : null}
        </div>
      }
    >
      <div className="space-y-3">
        <Choice
          label="Who likes it?"
          options={WHO.map((w) => ({ value: w.key, label: <span lang="es">{w.label}</span> }))}
          value={whoKey}
          onChange={touch(setWhoKey)}
        />
        <Choice
          label="What kind of thing?"
          options={(Object.keys(KIND_LABEL) as Kind[]).map((k) => ({ value: k, label: KIND_LABEL[k] }))}
          value={kind}
          onChange={touch((k: Kind) => {
            setKind(k);
            setThingIdx(0);
          })}
        />
        <Choice
          label="The thing"
          options={things.map((t, i) => ({ value: i, label: <span lang="es">{t.es}</span> }))}
          value={Math.min(thingIdx, things.length - 1)}
          onChange={touch(setThingIdx)}
        />
        <Choice
          label="Verb"
          options={(Object.keys(GV) as GVerb[]).map((v) => ({ value: v, label: <span lang="es">{v}</span> }))}
          value={verb}
          onChange={touch(setVerb)}
        />
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-ink-2">
          <label className="flex min-h-10 items-center gap-2">
            <input type="checkbox" checked={neg} onChange={(e) => touch(setNeg)(e.target.checked)} /> Negative (<span lang="es">no</span>)
          </label>
          <label className={`flex min-h-10 items-center gap-2 ${who.named ? "opacity-50" : ""}`}>
            <input type="checkbox" checked={showA} disabled={who.named} onChange={(e) => touch(setEmph)(e.target.checked)} /> Show the{" "}
            <span lang="es">a…</span> phrase
          </label>
          <label className="flex min-h-10 items-center gap-2">
            <input
              type="checkbox"
              checked={predict}
              onChange={(e) => {
                setPredict(e.target.checked);
                setRevealed(false);
              }}
            />{" "}
            Predict first
          </label>
        </div>

        <div className="rounded-2xl border border-line bg-surface p-3" aria-live="polite">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xl font-extrabold leading-relaxed text-ink sm:text-2xl">
              <SpanishLine segs={segs} />
            </p>
            {hidden ? (
              <button type="button" className="btn btn-primary btn-sm" onClick={() => setRevealed(true)}>
                Reveal
              </button>
            ) : (
              <SpeakButton text={spoken} label="Listen to the sentence" />
            )}
          </div>
          <p className="mt-1 text-sm text-ink-2">{hidden ? "Which pronoun? gusta or gustan? Say it, then reveal." : english}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-2">Pronoun ← who</div>
            <div className="grid grid-cols-2 gap-1 text-sm" lang="es">
              {PRONOUN_ROWS.map((r) => {
                const on = !hidden && r.pron === who.pron;
                return (
                  <div
                    key={r.pron}
                    className={`flex items-center justify-between rounded-lg border px-2 py-1 ${on ? "border-brand bg-brand-soft text-brand" : "border-line text-ink-2"}`}
                  >
                    <span className="text-xs">{r.a}</span>
                    <span className="font-extrabold">{r.pron}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-2">Verb ← the thing</div>
            <div className="grid grid-cols-2 gap-1 text-sm">
              {[
                { f: GV[verb].one, note: "one thing / activity", on: !plural },
                { f: GV[verb].many, note: "plural things", on: plural },
              ].map((c) => (
                <div
                  key={c.f}
                  className={`rounded-lg border px-2 py-2 text-center ${!hidden && c.on ? "border-accent bg-accent-soft text-ink" : "border-line text-ink-2"}`}
                >
                  <div lang="es" className="text-lg font-extrabold">
                    {c.f}
                  </div>
                  <div className="text-xs">{c.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

// ---------------------------------------------------------------------------
// 2. Plans & invitations dialogue builder
// ---------------------------------------------------------------------------

interface Activity {
  inf: string;
  rest: string;
  en: string;
  ing: string;
}
const ACTIVITIES: Activity[] = [
  { inf: "ir", rest: "al cine", en: "go to the cinema", ing: "going to the cinema" },
  { inf: "jugar", rest: "al tenis", en: "play tennis", ing: "playing tennis" },
  { inf: "ir", rest: "de compras", en: "go shopping", ing: "going shopping" },
  { inf: "ver", rest: "una película en mi casa", en: "watch a film at my house", ing: "watching a film at my house" },
  { inf: "ir", rest: "a la bolera", en: "go to the bowling alley", ing: "going to the bowling alley" },
  { inf: "montar", rest: "en bici en el parque", en: "ride bikes in the park", ing: "riding bikes in the park" },
  { inf: "ir", rest: "a la playa", en: "go to the beach", ing: "going to the beach" },
];

const DAYS: { es: string; en: string }[] = [
  { es: "el sábado", en: "on Saturday" },
  { es: "el domingo", en: "on Sunday" },
  { es: "mañana", en: "tomorrow" },
  { es: "esta tarde", en: "this afternoon" },
  { es: "el viernes por la noche", en: "on Friday night" },
];

interface Reason {
  key: string;
  label: string;
  /** Infinitive phrase after tener que (yo / nosotros versions), or null for the money excuse. */
  yo: string | null;
  we: string | null;
  enYo: string;
  enWe: string;
}
const REASONS: Reason[] = [
  { key: "deberes", label: "homework", yo: "hacer los deberes", we: "hacer los deberes", enYo: "I have to do my homework", enWe: "we have to do our homework" },
  { key: "estudiar", label: "an exam", yo: "estudiar para un examen", we: "estudiar para un examen", enYo: "I have to study for an exam", enWe: "we have to study for an exam" },
  { key: "casa", label: "help at home", yo: "ayudar en casa", we: "ayudar en casa", enYo: "I have to help at home", enWe: "we have to help at home" },
  { key: "abuelos", label: "grandparents", yo: "visitar a mis abuelos", we: "visitar a nuestros abuelos", enYo: "I have to visit my grandparents", enWe: "we have to visit our grandparents" },
  { key: "perro", label: "the dog", yo: "pasear al perro", we: "pasear al perro", enYo: "I have to walk the dog", enWe: "we have to walk the dog" },
  { key: "dinero", label: "no money", yo: null, we: null, enYo: "I don't have any money", enWe: "we don't have any money" },
];

const PLACES: { es: string; en: string }[] = [
  { es: "delante del cine", en: "in front of the cinema" },
  { es: "en la plaza", en: "in the square" },
  { es: "en mi casa", en: "at my house" },
  { es: "en la estación de MRT", en: "at the MRT station" },
  { es: "delante del centro comercial", en: "in front of the shopping centre" },
  { es: "en la entrada del parque", en: "at the park entrance" },
];

const YES: { es: string; en: string }[] = [
  { es: "Sí, vale.", en: "Yes, OK." },
  { es: "¡Qué buena idea!", en: "What a good idea!" },
  { es: "¡Claro!", en: "Of course!" },
];

const HOURS = ["una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];
const HOURS_EN = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];

function timeEs(h: number, half: boolean): string {
  return `${h === 1 ? "a la" : "a las"} ${HOURS[h - 1]}${half ? " y media" : ""}`;
}
function timeEn(h: number, half: boolean): string {
  return half ? `at half past ${HOURS_EN[h - 1]}` : `at ${HOURS_EN[h - 1]} o'clock`;
}

interface Line {
  who: "Lucía" | "You";
  segs: Seg[];
  en: string;
}

function PlansBuilder() {
  const [group, setGroup] = useState<"tú" | "vosotros">("tú");
  const [style, setStyle] = useState<"querer" | "apetecer">("querer");
  const [actIdx, setActIdx] = useState(0);
  const [dayIdx, setDayIdx] = useState(0);
  const [reply, setReply] = useState<"yes" | "no">("no");
  const [yesIdx, setYesIdx] = useState(0);
  const [reasonKey, setReasonKey] = useState("deberes");
  const [placeIdx, setPlaceIdx] = useState(0);
  const [hour, setHour] = useState(5);
  const [half, setHalf] = useState(true);

  const act = ACTIVITIES[actIdx];
  const day = DAYS[dayIdx];
  const reason = REASONS.find((r) => r.key === reasonKey) ?? REASONS[0];
  const place = PLACES[placeIdx];
  const yes = YES[yesIdx];

  // Who is asked, who answers (the reply comes from yo or from nosotros).
  const invited: Person = group;
  const replier: Person = group === "tú" ? "yo" : "nosotros";
  const many = group === "vosotros";

  const quiere = conjugate("querer", "present", invited); // quieres / queréis
  const puede = conjugate("poder", "present", replier); // puedo / podemos
  const tiene = conjugate("tener", "present", replier); // tengo / tenemos
  const plan = conjugate(act.inf, "near-future", "nosotros"); // vamos a ir…
  const [planIr, planInf] = plan.split(" a ");
  const infPhrase = `${act.inf} ${act.rest}`;

  const lines: Line[] = [];
  // 1. Invitation
  if (style === "querer") {
    lines.push({
      who: "Lucía",
      segs: [{ t: "¡Hola! ¿" }, { t: cap(quiere), tone: "verb" }, { t: " " }, { t: act.inf, tone: "inf" }, { t: ` ${act.rest} ${day.es}?` }],
      en: `Hi! Do you${many ? " two" : ""} want to ${act.en} ${day.en}?`,
    });
  } else {
    lines.push({
      who: "Lucía",
      segs: [{ t: "¡Hola! ¿" }, { t: many ? "Os" : "Te", tone: "pron" }, { t: " " }, { t: "apetece", tone: "verb" }, { t: " " }, { t: act.inf, tone: "inf" }, { t: ` ${act.rest} ${day.es}?` }],
      en: `Hi! Do you${many ? " two" : ""} fancy ${act.ing} ${day.en}?`,
    });
  }
  // 2. Reply
  if (reply === "yes") {
    lines.push({ who: "You", segs: [{ t: `${yes.es} ¿Dónde quedamos?` }], en: `${yes.en} Where shall we meet?` });
    lines.push({ who: "Lucía", segs: [{ t: "Quedamos", tone: "verb" }, { t: ` ${place.es}.` }], en: `Let's meet ${place.en}.` });
    lines.push({ who: "You", segs: [{ t: "Vale. ¿A qué hora?" }], en: "OK. What time?" });
    lines.push({ who: "Lucía", segs: [{ t: `${cap(timeEs(hour, half))}. ¡Hasta ${day.es === "mañana" ? "mañana" : "luego"}!` }], en: `${cap(timeEn(hour, half))}. See you ${day.es === "mañana" ? "tomorrow" : "later"}!` });
  } else {
    const because: Seg[] = reason.yo
      ? [{ t: tiene, tone: "verb" }, { t: " que " }, { t: (many ? reason.we : reason.yo)!.split(" ")[0], tone: "inf" }, { t: " " + (many ? reason.we : reason.yo)!.split(" ").slice(1).join(" ") }]
      : [{ t: "no ", tone: "neg" }, { t: tiene, tone: "verb" }, { t: " dinero" }];
    lines.push({
      who: "You",
      segs: [{ t: "Lo siento, " }, { t: "no", tone: "neg" }, { t: " " }, { t: puede, tone: "verb" }, { t: " porque " }, ...because, { t: "." }],
      en: `Sorry, ${many ? "we" : "I"} can't because ${many ? reason.enWe : reason.enYo}.`,
    });
    lines.push({ who: "Lucía", segs: [{ t: "¡Qué pena! Otro día, entonces." }], en: "What a shame! Another day, then." });
  }

  const summarySegs: Seg[] = [
    { t: `${cap(day.es)} ` },
    { t: planIr, tone: "verb" },
    { t: " a " },
    { t: planInf, tone: "inf" },
    { t: ` ${act.rest}. Quedamos ${place.es} ${timeEs(hour, half)}.` },
  ];
  const summaryEn = `${cap(day.en)} we're going to ${act.en}. We're meeting ${place.en} ${timeEn(hour, half)}.`;

  // Boot spotlight: which persons are in use for each verb.
  const spotlight: { inf: string; person: Person }[] = [
    { inf: "querer", person: invited },
    { inf: "poder", person: replier },
    { inf: "tener", person: replier },
  ];
  const inBoot = (p: Person) => p !== "nosotros" && p !== "vosotros";

  return (
    <WidgetFrame
      title="¿Quieres salir? Invitation builder"
      tryThis={[
        "Invite **two** friends instead of one. Which three verbs change, and how? (Look at the boot table.)",
        "Say no, then switch the excuse to *no money*. What happens to *tener que*?",
        "Say yes and set the time to one o'clock. Why *a la una* but *a las dos*?",
        "Switch *¿Quieres…?* to *¿Te apetece…?* — which verb is it like?",
      ]}
      caption={
        <div className="space-y-1.5">
          <p>
            <strong>Inviting:</strong> <span lang="es">{quiere}</span> comes from <span lang="es">querer</span> (e → ie).{" "}
            {inBoot(invited) ? (
              <>
                <span lang="es">Tú</span> is inside the boot, so the stem changes.
              </>
            ) : (
              <>
                <span lang="es">Vosotros</span> is outside the boot, so the stem stays <span lang="es">quer-</span>.
              </>
            )}{" "}
            After it comes an <strong>infinitive</strong>: <span lang="es">{quiere} {infPhrase}</span>.
          </p>
          {reply === "no" ? (
            <p>
              <strong>Saying no:</strong> <span lang="es">no {puede}</span> (poder, o → ue
              {inBoot(replier) ? ", inside the boot" : " — nosotros is outside the boot, so no change"}) +{" "}
              {reason.yo ? (
                <>
                  <span lang="es">porque {tiene} que</span> + infinitive.
                </>
              ) : (
                <>
                  <span lang="es">porque no {tiene} dinero</span> — here <span lang="es">tener</span> just means &lsquo;to have&rsquo;, so no{" "}
                  <span lang="es">que</span>.
                </>
              )}
            </p>
          ) : (
            <p>
              <strong>Fixing the details:</strong> <span lang="es">quedar</span> = to arrange to meet. Hours: <span lang="es">a la una</span>{" "}
              (one hour, singular) but <span lang="es">a las dos, a las tres…</span>
            </p>
          )}
          <p>
            <strong>The plan:</strong> <span lang="es">{planIr} a</span> + infinitive is the immediate future — only{" "}
            <span lang="es">ir</span> changes.
          </p>
        </div>
      }
    >
      <div className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <Choice
            label="Lucía invites…"
            options={[
              { value: "tú" as const, label: "one friend (tú)" },
              { value: "vosotros" as const, label: "two friends (vosotros)" },
            ]}
            value={group}
            onChange={setGroup}
          />
          <Choice
            label="How she asks"
            options={[
              { value: "querer" as const, label: <span lang="es">¿{many ? "Queréis" : "Quieres"}…?</span> },
              { value: "apetecer" as const, label: <span lang="es">¿{many ? "Os" : "Te"} apetece…?</span> },
            ]}
            value={style}
            onChange={setStyle}
          />
        </div>
        <Choice label="Activity" options={ACTIVITIES.map((a, i) => ({ value: i, label: <span lang="es">{`${a.inf} ${a.rest}`}</span> }))} value={actIdx} onChange={setActIdx} />
        <Choice label="When" options={DAYS.map((d, i) => ({ value: i, label: <span lang="es">{d.es}</span> }))} value={dayIdx} onChange={setDayIdx} />
        <Choice
          label="Reply"
          options={[
            { value: "yes" as const, label: "Accept ✅" },
            { value: "no" as const, label: "Decline ❌" },
          ]}
          value={reply}
          onChange={setReply}
        />
        {reply === "yes" ? (
          <div className="space-y-3 rounded-xl border border-line p-3">
            <Choice label="Say yes" options={YES.map((y, i) => ({ value: i, label: <span lang="es">{y.es}</span> }))} value={yesIdx} onChange={setYesIdx} />
            <Choice label="Where?" options={PLACES.map((p, i) => ({ value: i, label: <span lang="es">{p.es}</span> }))} value={placeIdx} onChange={setPlaceIdx} />
            <div className="grid gap-3 sm:grid-cols-2">
              <Stepper label="Hour" value={hour} min={1} max={12} onChange={setHour} />
              <Choice
                label="Minutes"
                options={[
                  { value: "0", label: "o'clock" },
                  { value: "30", label: <span lang="es">y media</span> },
                ]}
                value={half ? "30" : "0"}
                onChange={(v) => setHalf(v === "30")}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-line p-3">
            <Choice label="Your excuse" options={REASONS.map((r) => ({ value: r.key, label: r.label }))} value={reasonKey} onChange={setReasonKey} />
          </div>
        )}

        <ol className="space-y-2" aria-label="The conversation">
          {lines.map((l, i) => {
            const mine = l.who === "You";
            const speaker = mine ? (many ? "You two" : "You") : "Lucía";
            return (
              <li key={i} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[92%] rounded-2xl border px-3 py-2 ${mine ? "border-brand bg-brand-soft" : "border-line bg-surface-2"}`}>
                  <div className="text-xs font-bold uppercase tracking-wide text-ink-2">{speaker}</div>
                  <div className="flex items-start gap-2">
                    <p className="text-base font-bold leading-relaxed text-ink">
                      <SpanishLine segs={l.segs} />
                    </p>
                    <SpeakButton text={plainText(l.segs)} label={`Listen: ${speaker}`} />
                  </div>
                  <p className="text-sm text-ink-2">{l.en}</p>
                </div>
              </li>
            );
          })}
        </ol>

        {reply === "yes" ? (
          <div className="rounded-xl border-2 border-good bg-good-soft p-3" aria-live="polite">
            <div className="text-xs font-bold uppercase tracking-wide text-good">The plan (ir a + infinitive)</div>
            <div className="flex items-start justify-between gap-2">
              <p className="text-lg font-extrabold text-ink">
                <SpanishLine segs={summarySegs} />
              </p>
              <SpeakButton text={plainText(summarySegs)} label="Listen to the plan" />
            </div>
            <p className="text-sm text-ink-2">{summaryEn}</p>
          </div>
        ) : null}

        <div>
          <div className="mb-1 text-xs font-bold uppercase tracking-wide text-ink-2">Boot spotlight (shaded = inside the boot, stem changes)</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[300px] border-collapse text-sm" lang="es">
              <thead>
                <tr className="text-left text-ink-2">
                  <th className="py-1 pr-2 font-bold" scope="col">
                    <span className="sr-only">person</span>
                  </th>
                  {spotlight.map((s) => (
                    <th key={s.inf} className="py-1 pr-2 font-bold" scope="col">
                      {s.inf}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PERSONS.map((p) => (
                  <tr key={p}>
                    <th scope="row" className="py-0.5 pr-2 text-left font-semibold text-ink-2">
                      {p === "él" ? "él / ella" : p === "ellos" ? "ellos / ellas" : p}
                    </th>
                    {spotlight.map((s) => {
                      const active = s.person === p;
                      return (
                        <td key={s.inf} className="py-0.5 pr-1">
                          <span
                            className={`inline-block min-w-[6.5ch] rounded-md px-1.5 py-0.5 ${inBoot(p) ? "bg-accent-soft" : ""} ${
                              active ? "font-extrabold text-brand ring-2 ring-brand" : "text-ink"
                            }`}
                          >
                            {conjugate(s.inf, "present", p)}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "gustar-machine",
    title: "The gustar machine",
    blurb: "Pick who likes it and what they like — watch the pronoun (me/te/le/nos/os/les) and gusta/gustan change.",
    Component: GustarMachine,
  },
  {
    id: "invitation-builder",
    title: "¿Quieres salir? Invitation builder",
    blurb: "Build an invitation, accept or decline with a reason, and fix where and when to meet — with the boot verbs highlighted.",
    Component: PlansBuilder,
  },
];
