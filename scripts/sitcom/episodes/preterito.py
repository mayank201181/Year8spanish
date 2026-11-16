# "¡Qué Caos!" S01E13 "Fui Fighters" (Topic: preterito — The Preterite) — SEASON FINALE
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="preterito", logline="Pablo's last week in Singapore. The family makes a memory book while Dad and Uncle Hock form a band called the Fui Fighters. Regular -ar, -er and -ir preterite, accents, spelling changes, irregulars and three time frames.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("dad", "Pablo goes home on Sunday. I'm writing him a goodbye song. In the past tense!", mood="determined", shot="close", prop="guitar")
L("dad", "Listen. Yesterday, I eat-ed the noodles. Ayer, yo como-ed.", mood="smug", shot="close", prop="guitar")
L("tara", "Dad. You can't put E D on a Spanish verb.", mood="deadpan", shot="close")
sfx("squawk")
poof("lola", 1060)
L("lola", "[[Como]] is present. I eat. Yesterday, I ate, is [[comí]]. [[Ayer comí fideos.]] Yesterday I ate noodles.", mood="annoyed", shot="close")
L("dad", "Ayer, comí-ed.", mood="happy", shot="close")
L("lola", "Just [[comí]]. The ending already means, ed. You don't need two.", mood="eyeroll", shot="close")
freeze("\"COMÍ-ED.\"", 2.4, narrator="Narrator: Pablo had five days left. Dad had one song.")
confess("pablo", "PABLO RUIZ · 13 · Exchange Student · Five Days Left")
L("pablo", "Three months ago, I arrived here. A new country, a new family, and a parrot in my suitcase.", mood="worried")
L("pablo", "Now I don't want to go home. Don't tell Lola. She'll correct my feelings.", mood="sad", gap=0.5)
confess("tara", "TARA RAO · 12 · Not Sad · Definitely Not Sad")
L("tara", "Pablo leaves on Sunday. I'm fine. I'm completely fine.", mood="deadpan")
L("tara", "I have something in my eye. It's been there since Tuesday.", mood="sad", gap=0.5)

title()

# ---------------- ACT 1: REGULAR -AR VERBS ----------------
scene("living", [("mum", 260), ("pablo", 560), ("lola", 900)])
L("mum", "I've bought a memory book. We're going to fill it with everything we did. In the past.", mood="happy", shot="close", prop="book")
L("lola", "The preterite. For finished actions. I did, she ate. Start with A R verbs, like [[hablar]].", mood="teach", shot="close",
  boardClear=True, board="preterite = finished action in the past")
L("lola", "Chop off the A R, and add the endings. [[Hablé, hablaste, habló, hablamos, hablasteis, hablaron.]]", mood="teach", shot="close",
  board="[[hablé · hablaste · habló]]")
L("pablo", "I spoke, you spoke, he spoke, and so on. [[El primer día hablé con Lola todo el día.]] The first day, I spoke to Lola all day.", mood="happy", shot="close",
  board="[[hablamos · hablasteis · hablaron]]")
L("mum", "And we visited the Botanic Gardens. [[Visitamos el jardín botánico.]]", mood="happy", shot="close",
  board="[[Visitamos el jardín botánico]] ✔")
L("lola", "Careful. [[Visitamos]] is also the present. We visit. Only the time phrase tells you which.", mood="teach", shot="close",
  board="[[hablamos]] = we speak / we spoke")
poof("dad", 1120)
L("dad", "Write this. Pablo hablo with Lola every day.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Accents matter. [[Hablo]], without an accent, means I speak. Now. [[Habló]], with the accent, means he spoke. Past.", mood="eyeroll", shot="close",
  boardClear=True, board="[[hablo]] = I speak   [[habló]] = he spoke")
L("pablo", "So the accent changes the person AND the time. [[Pablo habló con Lola.]] That's me. In the past.", mood="neutral", shot="close",
  board="[[Pablo habló con Lola]] ✔")
L("mum", "Only two forms have accents. I, and he or she. [[Compré un álbum.]] I bought an album. [[Mamá compró un álbum.]] Mum bought an album.", mood="happy", shot="close",
  board="[[compré · compró]] (accents!)")
L("lola", "And no S on the end of the you form. [[Hablaste.]] Not hablastes.", mood="annoyed", shot="close", gap=0.4)

# ---------------- ACT 2: -ER AND -IR VERBS ----------------
card("UNCLE HOCK'S STALL", "Lunch. Vegetarian. Strong opinions.", 2.4)
scene("hawker", [("tara", 260), ("pablo", 560), ("uncle", 1000)])
L("uncle", "Pablo! [[¿Qué comiste ayer?]] What did you eat yesterday?", mood="happy", shot="close")
L("pablo", "[[Ayer comí fideos con verduras.]] Yesterday I ate noodles with vegetables. And [[bebí un zumo de mango.]] I drank a mango juice.", mood="happy", shot="close", prop="plate",
  boardClear=True, board="[[comí]] = I ate   [[bebí]] = I drank")
poof("lola", 800)
L("lola", "E R and I R verbs share one set of endings. [[Comí, comiste, comió, comimos, comisteis, comieron.]]", mood="teach", shot="close",
  board="[[comí · comiste · comió]]")
L("tara", "Same for I R. [[Salí]], I went out. [[Escribí]], I wrote. [[Ayer salí con Pablo y escribí una postal.]] Yesterday I went out with Pablo and wrote a postcard.", mood="neutral", shot="close",
  board="[[salí · escribí · salió · escribió]]")
L("uncle", "And, [[el tío Hock comió demasiado.]] Uncle Hock ate too much. That's me.", mood="smug", shot="close",
  board="[[comió]] = he ate")
L("lola", "Accents only on I, and he or she. [[Comí, comió.]] But [[ver]], to see, has none. [[Vi]], I saw. [[Vio]], he saw.", mood="teach", shot="close",
  boardClear=True, board="[[ver]]: [[vi · vio]] (no accents!)")
L("pablo", "[[Vi el río y los rascacielos.]] I saw the river and the skyscrapers. And every afternoon, [[llovió]]. It rained.", mood="happy", shot="close",
  board="[[llovió]] = it rained")
L("uncle", "In Singapore, [[siempre llueve]]. It always rains. I don't need the past for rain.", mood="smug", shot="close", gap=0.4)

confess("uncle", "UNCLE HOCK · Hawker · Vegetarian Noodles Since Nineteen Ninety")
L("uncle", "Pablo came to my stall every day. Every day, he said, [[¡qué rico!]] How tasty! Vikram just says, same as usual.", mood="sad", gap=0.5)

# ---------------- ACT 3: SPELLING CHANGES ----------------
scene("park", [("tara", 260), ("pablo", 560), ("dad", 860)], caption="THE FUTSAL COURT · One Last Match")
L("pablo", "My last match! [[El sábado pasado jugué al fútbol aquí.]] Last Saturday I played football here.", mood="excited", shot="close", prop="ball", boardClear=True)
L("dad", "Me too. Yo jugo al fútbol.", mood="smug", shot="close")
L("tara", "Dad. [[Jugo]] means juice. You just said, I juice football.", mood="deadpan", shot="close")
poof("lola", 1080)
L("lola", "Past tense. [[Jugué.]] With a U. Without the U, the G before an E would go soft, like in [[gente]]. The U keeps it hard.", mood="teach", shot="close",
  board="[[jugar]] → [[jugué]] (g → gu)")
L("lola", "Three groups change, only in the I form. C A R becomes Q U É. [[Toqué la guitarra.]] I played the guitar.", mood="teach", shot="close",
  board="-car → [[-qué]]: [[toqué · saqué]]")
L("tara", "G A R becomes G U É. [[Llegué]], I arrived. [[Pagué]], I paid. And Z A R becomes C É. [[Empecé]], I started.", mood="neutral", shot="close",
  board="-gar → [[-gué]]   -zar → [[-cé]]: [[empecé]]")
L("pablo", "But only the I form. [[Tara jugó muy bien.]] Tara played very well. No change. And [[leer]] becomes [[leyó]], with a Y. [[Tara leyó mi diario.]]", mood="happy", shot="close",
  board="[[jugó · empezó]] (normal)   [[leyó]]")
L("tara", "I was checking your Spanish. Your Spanish was fine. Your poems were not.", mood="deadpan", shot="close", gap=0.4)

# ---------------- ACT 4: IRREGULARS & FUI FIGHTERS ----------------
card("BAND PRACTICE", "Dad has formed a band. Nobody asked him to.", 2.4)
scene("living", [("dad", 260), ("uncle", 520), ("tara", 780), ("lola", 1040)])
L("dad", "Uncle Hock and I have a band. We are the Fui Fighters.", mood="excited", shot="close", prop="guitar", boardClear=True)
L("lola", "[[Fui]] is irregular. And it's two verbs at once. From [[ir]], it means I went. From [[ser]], it means I was. [[Fui, fuiste, fue, fuimos, fuisteis, fueron.]]", mood="teach", shot="close",
  board="[[ir / ser]]: [[fui · fuiste · fue]]")
L("tara", "[[Fui a la playa]], I went to the beach. A place, so it's going. [[Fue genial]], it was great. An opinion, so it's being.", mood="neutral", shot="close",
  board="[[fui a la playa]] · [[fue genial]]")
L("uncle", "So our band is called, the I Went Fighters. Or the I Was Fighters.", mood="thinking", shot="close")
L("lola", "Both very accurate.", mood="smug", shot="close")
L("lola", "More irregulars. [[Hacer]] goes [[hice, hiciste, hizo]]. [[Tener]] goes [[tuve]]. [[Estar]] goes [[estuve]]. And [[dar]] goes [[di]]. And none of them has an accent.", mood="teach", shot="close",
  boardClear=True, board="[[hice · hizo · tuve · estuve · di]]")
L("tara", "[[Ayer hice los deberes.]] Yesterday I did my homework. [[Tuve un examen.]] I had a test.", mood="deadpan", shot="close",
  board="[[hice]] = I did   [[tuve]] = I had")
L("dad", "And the weather! Last week, muy calor!", mood="excited", shot="close", prop="guitar")
sfx("buzzer")
L("lola", "Not again. Present: [[hace calor]]. Past: [[hizo calor]]. [[La semana pasada hizo mucho calor.]] Last week it was very hot.", mood="eyeroll", shot="close",
  board="[[hace calor]] → [[hizo calor]]")

scene("living", [("mum", 260), ("pablo", 560), ("lola", 900)])
L("mum", "Time phrases, for the memory book. [[Ayer]], yesterday. [[Anoche]], last night. [[Anteayer]], the day before yesterday.", mood="teach", shot="close", prop="book", boardClear=True,
  board="[[ayer · anoche · anteayer]]")
L("lola", "[[La semana pasada]], last week. [[El año pasado]], last year. And ago is [[hace]], at the front. [[Hace tres meses]], three months ago.", mood="teach", shot="close",
  board="[[hace tres meses]] = three months ago")
L("pablo", "Then the story. [[Primero]], first. [[Luego]], then. [[Al final]], in the end. And an opinion. [[Lo pasé bomba.]] I had a great time.", mood="happy", shot="close",
  board="[[primero · luego · al final]]")
L("lola", "Now, three time frames. The verb tells you when. Pablo, go.", mood="determined", shot="close",
  boardClear=True, board="past · present · future")
L("pablo", "[[Hace tres meses llegué a Singapur.]] Three months ago I arrived in Singapore. Past.", mood="neutral", shot="close",
  board="[[Hace tres meses llegué…]] (past)")
L("pablo", "[[Hoy vivo con la familia Rao.]] Today I live with the Rao family. Present.", mood="happy", shot="close",
  board="[[Hoy vivo con…]] (present)")
L("pablo", "And [[el domingo voy a volver a Sevilla.]] On Sunday I'm going to go back to Seville. Future.", mood="sad", shot="close", gap=0.5,
  board="[[El domingo voy a volver…]] (future)")

confess("lola", "LOLA · Recap Parrot · Season Finale · Not Crying")
L("lola", "Recap. One. A R verbs. [[Hablé, hablaste, habló.]] [[Hablo]] is I speak. [[Habló]] is he spoke. The accent matters.", mood="teach", boardClear=True, board="1. [[hablé · habló]]  ≠  [[hablo]]")
L("lola", "Two. E R and I R verbs. [[Comí, comiste, comió.]] [[Salí, saliste, salió.]]", mood="teach", board="2. [[comí · comiste · comió]]")
L("lola", "Three. Spelling changes, only for I. [[Jugué, toqué, empecé.]]", mood="teach", board="3. [[jugué · toqué · empecé]]")
L("lola", "Four. Irregulars, no accents. [[Fui, fue, hice, tuve, estuve.]]", mood="teach", board="4. [[fui · fue · hice · tuve]]")
L("lola", "Five. Three time frames. [[Ayer jugué, hoy juego, mañana voy a jugar.]] And I am not crying. Parrots don't cry.", mood="sad", board="5. [[jugué · juego · voy a jugar]]", gap=0.5)

# ---------------- CLOSING: THE GOODBYE ----------------
card("SUNDAY", "The last morning.", 2.2)
scene("living", [("tara", 220), ("mum", 440), ("dad", 660), ("pablo", 880)])
L("dad", "Pablo. The Fui Fighters have one song. Ready?", mood="determined", shot="close", prop="guitar")
sfx("flamenco")
L("dad", "[[Llegaste con un loro. Viviste con nosotros. Fue genial.]] You arrived with a parrot. You lived with us. It was great.", mood="happy", shot="close", prop="guitar")
L("tara", "Dad. That was three perfect verbs in a row.", mood="shock", shot="close")
L("pablo", "Thank you. All of you. [[Mi casa fue tu casa.]] My home was your home. And [[lo pasé bomba.]]", mood="happy", shot="close")
L("tara", "[[Te voy a echar de menos.]] I'm going to miss you. That's all. Don't make it weird.", mood="deadpan", shot="close")
L("pablo", "Wait. Where is Lola?", mood="worried", shot="two")
sfx("squawk")
poof("lola", 1080)
L("lola", "I've decided. I'm staying. [[Me quedo.]] Present tense. Somebody has to look after Dad's Spanish.", mood="smug", shot="close")
L("dad", "[[¡Muchas gracias, Lola!]]", mood="excited", shot="close")
L("lola", "Perfect. This is going to be a very long season two.", mood="happy", shot="wide", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “Yesterday I played football.”", "[[Ayer jugué al fútbol]]", "-gar → [[-gué]] in the yo form only",
  "Question one. How do you say, yesterday I played football?",
  "[[Ayer jugué al fútbol.]] With a U, to keep the G hard. Not juice.")
challenge(2, "[[hablo]] or [[habló]]?  [[Pablo ___ con Lola ayer.]]", "[[habló]]", "he + past → [[-ó]] with an accent",
  "Question two. Pablo, blank, with Lola yesterday. Is it [[hablo]], or [[habló]]?",
  "[[Pablo habló con Lola ayer.]] He spoke, in the past, so the accent goes on the end.")
challenge(3, "Translate: “I went to the beach. It was great.”", "[[Fui a la playa. Fue genial]]", "[[fui]] = I went (ir) · [[fue]] = it was (ser)",
  "Question three. Translate. I went to the beach. It was great.",
  "[[Fui a la playa. Fue genial.]] Two meanings, just like the band. Thanks for watching, everybody!")
end_card()
