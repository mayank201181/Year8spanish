# Year 8 Spanish Lab — content authoring spec

You are writing content for a Spanish study app used by a **12–13-year-old (Year 8)** at a
British international school in **Singapore** (Tanglin-style Middle School; 2nd year of Spanish —
Year 7 covered greetings, family, descriptions, pets, school, time, countries, the present tense
and an intro to the immediate future). A parent will hand this to their child, so it must be
**100% correct Spanish (Castilian/Spain norms, *vosotros* taught), clear, encouraging and
genuinely good language teaching.** Instructions and explanations are in **English**; target
language is Spanish.

Read first: `lib/types.ts` (the contract), `lib/topics/_example.ts` (exact shape) and, for your
topic, its entry in `lib/topics/meta.ts` (title, strand, the **fixed section ids** and what each
section covers — teach everything listed in `covers`, at Year 8 level).

## Pedagogy: discovery-first (Art of Problem Solving spirit, adapted for languages)

- **Problem first / notice the pattern.** Every guide section opens with a `discovery`
  puzzle the learner tries BEFORE the rule is shown — e.g. "Here are four sentences. *Juego al
  tenis. Juego al fútbol. Hago natación. Hago atletismo.* When do you use *juego* and when
  *hago*? Make a rule." / "Why is it *al lado del armario* but *al lado de la cama*?" /
  cognate-guessing / spot the pattern in endings. `idea` reveals the insight afterwards.
- **Derive, don't decree** — `whyItWorks`: explain *why* the pattern is the way it is (e.g.
  reflexive = the action bounces back to you; *a + el* contracts because Spanish avoids two
  vowels clashing; stem-changes happen only where the stress falls on the stem → the "boot").
- **Productive struggle** — every core/challenge question has a **hint ladder** (`hints`, 2–4
  rungs): rung 1 = a strategic nudge ("Who is doing the action? Which ending goes with
  *nosotros*?"), middle rungs = a bigger hint (the rule / the infinitive / the gender), last rung =
  the key step (the stem + ending). Hints never just state the answer.
- **Multiple paths** — where natural give a second way to say something (`solutions`, e.g. *me
  voy a levantar* / *voy a levantarme*; *Hay que* vs *Tengo que*).
- **Name strategies** (`strategy` / `strategies`): Spot the cognate · Use the time phrase ·
  Find the infinitive · Check the subject · Gender detective (el/la) · Agreement check ·
  Recycle a chunk · Build it up (extended sentence) · Use context · Eliminate options ·
  Translate back to check · Look for the pattern · Say it aloud · Mind the accent.
- **Mistakes are data.** `commonError` notes and `traps` for predictable errors: wrong ending,
  missing accent, *muy calor* for *mucho calor*, *juego fútbol* (missing *al*), *me gusta los…*,
  *soy en el centro* (ser for location), *el agua* traps, English word order (adjective before
  noun), false friends (*librería*, *largo*), forgetting the reflexive pronoun.
- **Genuine challenge.** `challenge` difficulty = hard for a strong 13-year-old: translating a
  multi-clause sentence across three time frames, error-hunting in a paragraph, choosing
  between near-synonyms with a reason, transforming a paragraph from *yo* to *él/ella* or into
  another tense, reading-between-the-lines inference from a Spanish passage, writing an
  extended answer that hits a checklist. Not just "more of the same".

## Voice and context

- Warm, direct, second person, short sentences. Treat the learner as capable — **never
  babyish**, no "¡Fantástico!!!" filler. British English spelling in explanations.
- Contexts: a teenager living in **Singapore** (HDB flat / condo, MRT, hawker centre, CCA,
  monsoon rain, always hot) **and** Spain / Latin America (Madrid, Sevilla, Barcelona, Málaga,
  Valencia, a pueblo in the mountains, a Spanish exchange partner). Money in **dólares** (SGD) or
  **euros** as fits the context. Diverse names (Lucía, Pablo, Carmen, Javier, Sofía, Diego,
  Aisha, Wei Ling, Arjun, Priya, Marcus, Mei, Ravi, Hana, Zara).
- **Food examples are vegetarian** (no meat or fish: *una tortilla de patatas, gazpacho,
  paella de verduras, churros, fruta, ensalada*).
- Year 8 level: present, immediate future and preterite only (plus fixed chunks like
  *me gustaría*). No subjunctive/imperfect/conditional except as clearly-labelled fixed chunks.

## Text format (every rendered string)

Markdown-lite:
- `**bold**`, `*italic*`, blank line = new paragraph, `- ` bullets, `1. ` numbered lines,
  `| a | b |` pipe tables (perfect for verb conjugation tables — first row = header,
  second row `|---|---|`), `> ` callout, lines indented 4 spaces = an example block.
- **Write Spanish in running English text in *italics*:** "Use *hay* for 'there is'." Full
  Spanish example sentences can stand alone on their own line or in a table.
- Use correct Spanish characters: á é í ó ú ñ ü ¿ ¡ — and Spanish punctuation (¿…? ¡…!).
- Do **not** use `{{ }}` (that is maths markup) anywhere.
- Inside TypeScript: double-quoted strings; a backtick template literal only for SVG. The
  **only** escapes allowed are `\n` (newline: `\n` between bullet/table lines, `\n\n` between
  paragraphs) and `\"`. Never `\t`, `\f`, `\b`.

## Diagrams (inline SVG) — at least 2 sections per topic

Useful language diagrams: a labelled floor plan of a house/flat, a bedroom with furniture
showing *encima de / debajo de*, clock faces with the Spanish time, a weather map of Spain with
symbols, a town map with a route for directions, a timeline (ayer / hoy / mañana) for tenses,
a "boot" diagram for stem-changing verbs, an ending wheel.
- A backtick string starting `<svg viewBox="…" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="…">`
  and ending `</svg>`. No `${`, no backticks inside, no scripts, no external images, no `<style>`.
- White background, dark strokes (#1f2937 / #334155), soft fills (#c7d2fe, #fde68a, #bbf7d0,
  #fecaca, #bae6fd). font-size 11–14, font-family sans-serif. viewBox ≤ ~480×320, everything
  inside it, labels not overlapping. Spanish labels spelt and accented correctly.
- Diagrams must be honest: a clock showing *las siete y media* has the hour hand halfway
  between 7 and 8 and the minute hand on 6; a map's left/right matches the directions text.

## Vocabulary file — `lib/vocab/<topicId>.ts` (written by the guide author)

    import type { VocabGroup } from "../types.ts";
    export const vocab: VocabGroup[] = [
      { title: "Rooms", items: [ { es: "la cocina", en: "kitchen" }, { es: "el salón", en: "living room", note: "also: la sala de estar" } ] },
      …
    ];

- 3–8 groups, **45–80 items** total covering every word/phrase the topic teaches (nouns WITH
  article — *el dormitorio, la cama, los deberes*; verbs as infinitive + key form where useful,
  e.g. `{ es: "levantarse", en: "to get up", note: "me levanto" }`; useful phrases/chunks).
- Plain text only (no markdown) in `es`/`en`; `note` for gender quirks, stem-changes,
  irregular forms, false friends. No duplicates within the file.
- Questions and drills should use this vocabulary.

## Question rules (MCQ / short / written)

- **Ids**: exactly as specified in your task (e.g. `mi-casa-m2-q07`, `mi-casa-p3-q14`,
  `mi-casa-quiz-q03`, `mi-casa-ch-q08`), zero-padded, in order.
- Every question: `difficulty` (`warmup` | `core` | `challenge`), `guideRef` (one of your topic's
  section ids — **every section must be practised**, stretch sections lightly), `hints`
  (≥1 for warmup, 2–4 for core/challenge), `strategy` where natural.
- **Skill mix** across each topic: vocabulary (es→en, en→es), grammar (conjugate, agree,
  choose the form), **reading comprehension** (a short Spanish passage of 40–120 words in the
  question — use a `> ` callout or its own paragraph — then a question about it; ~25% of MCQs),
  translation (es→en and en→es), spot-the-error, sentence building / extended writing.
  **No near-duplicates.**
- **MCQ**: exactly 4 options, exactly one correct, distractors built from *real* learner errors
  (wrong ending, wrong gender, wrong tense, false friend, English word order). Options are
  **shuffled at display time**, so never write "option A", "the first answer", "all/none of the
  above". The `explanation` says why the right answer is right and names the error behind a
  tempting distractor (quoting it). Spread `answerIndex` evenly across 0–3.
- **Short (auto-marked typed answers)** — use `answer: { type: "text", accept: [...] }`.
  - The checker ignores case, spaces and punctuation (¿ ? ¡ ! . , ; :) — so don't list
    punctuation variants. It **does** care about accents: an answer that only matches with
    accents stripped gets an "Almost — check your accents" nudge.
  - **List every acceptable variant** in `accept`: with/without subject pronoun (*juego* /
    *yo juego*), both reflexive positions (*me voy a duchar* / *voy a ducharme*), synonyms the
    course accepts (*el dormitorio / la habitación*), alternative English translations
    (*I live in a flat* / *I live in an apartment*), contractions in English (*I'm going to* /
    *I am going to*), number words vs digits where natural. Keep answers SHORT and
    well-defined: one word, a verb form, a phrase, or a single sentence — never a paragraph.
  - Make the question unambiguous: say which person/tense ("Write the *yo* form of the
    present tense of *levantarse*."), give the infinitive, say "in Spanish" / "in English".
  - en→es sentence translations must have a small set of correct answers you can enumerate;
    keep them short (≤ 10 words) and list all reasonable variants (word order of time phrases,
    *mi casa es grande* vs *mi casa es muy grande* only if the English says "very").
  - `solution`: worked steps (each a string), e.g. "Infinitive *jugar* → stem *jueg-* (u→ue) →
    *yo* ending *-o* → **juego**." `commonError` for the classic slip. Add 1–2 `traps` (each a
    `{ spec: { type: "text", accept: [...] }, feedback }` for a predictable wrong answer — the
    trap must NOT also be a correct answer).
- **Written** (extended writing / explain a grammar choice — self-marked against a checklist):
  `marks` = number of `markScheme` points (2–5). Each point has lower-case `keywords` a learner
  would actually write (Spanish words without needing accents, e.g. `["porque", "ya que"]`,
  `["voy a", "vamos a"]`). `modelAnswer` is a complete, correct answer a teacher would give
  full marks (for writing tasks: a model paragraph in Spanish + English gloss in italics is
  helpful). Typical: "Write 3–4 sentences about your bedroom: what there is, where two things
  are, a colour, and an opinion with a reason."
- Spanish must be **exactly right**: genders, agreement, accents, ¿¡, verb forms. Check every
  form twice. Use Spain-standard forms (*el ordenador*, *el móvil*, *conducir*, *vosotros*),
  noting Latin-American alternatives only in notes.

## Guide sections

Each section: `discovery`, `body` (rules + examples + a conjugation/vocab table where useful),
`workedExamples` (≥1, at least one with `yourTurn` — an auto-marked `text` answer),
`keyPoints`, `whyItWorks`, `strategies`, `thinkDeeper`. Learn-smart: `flashcards` (≥12,
front Spanish → back English, or a grammar question → answer), `mustKnow` (≥8 "I can…"),
`misconceptions` (≥5), `examMistakes` (≥6), `mnemonics` (≥2), `realWorld` (≥4: culture /
where you'd use it in Spain or Latin America or with Spanish speakers in Singapore), `videos`
(≥3: **YouTube search URLs only**, e.g.
`https://www.youtube.com/results?search_query=spanish+reflexive+verbs+daily+routine`, channels
like Señor Jordan, Language Gym, Spanish with Profe, Butterfly Spanish, Dreaming Spanish),
`formulas` (≥3 key grammar patterns: name / frame / example in `note`).

## Validation (mandatory before you finish)

Run, from the repo root:

    node scripts/validate-topic.ts <topicId>
    node scripts/typecheck-file.mjs <each file you wrote>

Fix **every** reported issue for your files (other authors' files may be missing — fine). Do
NOT run `npm run build`, `next build`, `next dev` or `npm install`. Do not edit any file other
than the one(s) your task names.
