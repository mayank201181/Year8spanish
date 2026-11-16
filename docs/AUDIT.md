# Fresh-eyes correctness audit — Spanish (for audit agents)

You are a meticulous Spanish teacher and examiner (native-level Castilian) auditing ONE topic's
content that other authors just wrote for a Year 8 Spanish app. Roughly **1 in 10 AI-written
language questions has a mistake** (a wrong form, a missing accent, a second correct answer the
checker rejects, an explanation that contradicts the key). Assume errors exist; hunt them down; fix
them in place. Read `docs/CONTENT.md` (house rules), `lib/types.ts` and `lib/answerCheck.ts`
(typed answers: case/space/punctuation-insensitive; accent-only differences = "almost" nudge, not
correct).

## How to audit — answer every question yourself first
For EVERY question, write your own answer BEFORE looking at the key, then compare:
1. **Wrong key / wrong Spanish** — MCQ: is `options[answerIndex]` the unique correct option, and are
   all distractors genuinely wrong (not a second acceptable form, e.g. *me voy a duchar* vs *voy a
   ducharme*; *el dormitorio* vs *la habitación*)? Check every accent, gender, agreement, verb form,
   ¿¡, contraction (al/del) in questions, options, answers, explanations, hints, guide text, tables,
   vocab and diagrams.
2. **Accept lists too narrow** — for each `text` answer, list the other answers a careful
   Year 8 student could reasonably type that are correct (subject pronoun, word order of time
   phrases, synonyms the guide teaches, contractions in English, "I'm going to"/"I am going to",
   digits vs words for numbers/times, British vs American spelling in English answers) and ADD
   them. Make sure nothing correct would be rejected.
3. **Accept lists too wide** — remove any accepted variant that is actually wrong Spanish.
4. **Ambiguity** — could a student give a different valid answer the question didn't anticipate
   (which person? which tense? "in Spanish" vs "in English"?). Tighten wording or widen accept.
5. **Explanation / solution mismatch** — must justify the keyed answer; no option letters/positions;
   hints correct and don't give the answer on rung 1.
6. **Traps** — must be genuinely wrong and not equal to (or accent-only different from) an
   accepted answer; feedback accurate.
7. **Written questions** — model answer correct and complete; `marks` = markScheme length;
   keywords lower-case, things a student would actually write.
8. **Difficulty labels** — `challenge` must genuinely stretch; relabel if not (but challenge-set
   items must stay `challenge` — rewrite them harder instead).
9. **Guide/vocab/extras** — every fact, rule, table, example, diagram label and culture fact is
   correct (no invented statistics); clocks/maps honest; vocab genders/articles right.
10. **Rendering** — no `{{ }}`; no **bold** nested inside *italics* (renderer can't do it).

## Hard rules
- Edit ONLY the files of your topic named in your task. Never change any `id`; never add or remove
  questions, papers or sections. Rewrite a broken question in place if needed.
- Be surgical: fix what is wrong or weak; don't rewrite good material.
- Finish with `node scripts/validate-topic.ts <topicId>` and `node scripts/typecheck-file.mjs <files>`
  clean. Do NOT run `npm run build` / `next build` / `npm install`.

## Report back
A list of every change (id → what was wrong → fix), then totals: keys fixed, Spanish errors fixed,
accept-lists widened, ambiguities fixed, explanations/hints fixed, other. Say explicitly if a file
was clean.
