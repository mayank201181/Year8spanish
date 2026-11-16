# Interactive widgets ("explorables") spec — Spanish

Each topic gets **2 genuinely useful interactive explorables** in its Explore tab: the learner
changes inputs (selectors, steppers, toggles, drag/tap) and watches Spanish respond live, with a
caption explaining the pattern — plus "Try this" challenges (predict, then test). Think
"build-a-sentence machine", not a toy. Write `components/widgets/<topicId>.tsx`:

    "use client";
    import { useState, useMemo } from "react";
    import { WidgetFrame, Slider, Stepper, Segmented, Readout, type WidgetDef } from "./kit";
    import { speakSpanish } from "@/lib/speech";            // 🔊 buttons (Web Speech, es-ES)
    import { conjugate, PERSONS, PERSON_LABEL } from "@/lib/spanish/verbs";  // tested conjugator
    function SentenceBuilder() { … }
    export const widgets: WidgetDef[] = [ { id, title, blurb, Component }, … ];

Ideas per topic (pick 2 that teach the topic's core pattern best, or better ones):
- mi-casa: build-a-home (pick home type + location + rooms → live sentence *Vivo en un piso en el
  centro. Tiene tres dormitorios…* with agreement of adjectives); floor-plan labeller.
- mi-dormitorio: drag/tap furniture into an SVG room and read *La lámpara está encima de la mesa*;
  colour + noun agreement mixer (rojo/roja/rojos/rojas).
- rutina-diaria: clock → *Son las siete y media* (both directions, honest analogue clock SVG);
  reflexive routine builder (person selector → *se levanta / nos levantamos*).
- donde-vivo: opinion-o-meter (slider odio→me encanta + reason + connective); comparison builder (más/menos/tan … que/como with agreement).
- deportes: jugar-a vs hacer sorter + al/a la contraction; frequency ladder sentence builder.
- tiempo-libre: gustar machine (who likes → me/te/le/nos/os/les + gusta/gustan agreement); plans/invitation dialogue builder.
- tareas: chore wheel with tener que + infinitive for each person; pocket-money calculator in Spanish words.
- el-tiempo: weather map of Spain (tap regions/symbols → *En el norte llueve*); tense switch (ayer hizo / hoy hace / mañana va a hacer).
- la-ciudad: town-map direction follower (sigue todo recto, gira a la izquierda… moves a marker on an SVG grid); hay un/una/unos/unas builder.
- mi-ciudad: extended-sentence upgrader (add time phrase, opinion, reason, connective, intensifier — sentence grows live with a "level" meter); three-time-frame paragraph builder.
- presente: verb machine (infinitive × person → form, highlighting stem/ending, boot shading for stem-changers); ser vs estar sorter.
- futuro-inmediato: ir + a + infinitive train (person + verb + time phrase → sentence, reflexive position toggle).
- preterito: tense time-machine (ayer/hoy/mañana slider re-conjugates a sentence); preterite ending builder with spelling-change spotlight (jugué, toqué, empecé).

Rules:
- Read `components/widgets/kit.tsx` and `app/globals.css` (tokens). Client component, React 19,
  TypeScript strict, **no new dependencies**, no network, no `Math.random` during render.
- Tailwind + theme tokens only (`bg-surface`, `text-ink`, `text-ink-2`, `border-line`, `text-brand`,
  `bg-brand-soft`, `text-good`, `bg-good-soft`, `text-bad`, `text-accent`, …). SVG with
  `className="fill-… stroke-…"`, viewBox, `w-full h-auto`. Works at 360 px; touch targets ≥ 40 px.
- **Spanish must be exactly right** — use `conjugate()` for verb forms; handle gender/number
  agreement explicitly with a small typed lexicon (es, gender, plural) inside the widget.
- Show Spanish with `lang="es"` and offer a 🔊 button (speakSpanish) on the generated sentence.
- Each WidgetFrame: 2–4 `tryThis` prompts and a live `caption` explaining the pattern in plain English.
- Accessible: label every control; SVGs get `role="img"` + an `aria-label` describing the state.

Check: `node scripts/typecheck-file.mjs components/widgets/<topicId>.tsx` must pass. Do NOT run
`npm run build`, `next build` or `npm install`. Edit only your file(s).
