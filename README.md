# Year 8 Spanish Lab

A complete Year 8 Spanish study app built from the school's Year 8 Spanish scheme (Term 1 home &
routine, Term 2 free time, Term 3 town & weather, plus the present, immediate future and preterite).

**Live (preview):** https://year8-spanish-git-claude-relaxed-51b70e-mayank-rawat-s-projects.vercel.app

## What's inside

- **13 topics** — discovery-first lessons with conjugation tables, diagrams, worked examples and "your turn" checks.
- **Vocab tab** — ~1,000 words and phrases with Spanish audio (🔊, 🐢 slow), flip cards and listen-and-type tests.
- **Question bank** — per topic: quick quiz, 3 MCQ papers, 3 practice papers and an 8-question challenge set
  (~1,400 questions, every topic independently audited); reading passages, translations, extended writing.
- **Accent-aware marking** with an on-screen accent keypad (á é í ó ú ñ ü ¿ ¡).
- **Verb drills** — unlimited procedurally generated practice from a tested conjugator (97 verbs).
- **Explore** — two interactive widgets per topic (clock ↔ Spanish time, town-map directions, gustar machine, verb machine…).
- **Watch** — *¡Qué Caos!*, a 13-episode animated bilingual sitcom (one ~8-minute episode per topic, with pause challenges).
- **Big Exam** (4 cross-topic papers), fluency sprint (verbs + vocab), Daily 5, spaced review, skills map,
  certificates, grammar sheet, Profe Lola AI tutor (needs `ANTHROPIC_API_KEY`), family accounts + parent dashboard
  (needs Vercel Blob), PWA.

## Develop

```bash
npm install
npm run dev
npm test && npm run validate && npm run lint && npm run build
```

| Variable | Purpose |
| --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob — family accounts and cloud progress (guest mode without it) |
| `AUTH_SECRET` | Signs session cookies |
| `ANTHROPIC_API_KEY` | Profe Lola AI tutor (optional) |
