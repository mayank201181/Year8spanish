# "¡Qué Caos!" S01E12 "Voy A Be Famous" (Topic: futuro-inmediato — The Near Future)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="futuro-inmediato", logline="Dad signs up for the void deck talent show and announces he is going to be famous. The verb ir, ir + a + infinitive, reflexive pronouns, future time phrases, predictions and invitations, and present versus future.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("dad", "Tara. On Saturday there is a talent show at the void deck. I have entered. I'm going to be famous.", mood="smug", shot="close", prop="guitar")
L("dad", "And I'll announce it in Spanish. Voy a be famous!", mood="excited", shot="close", prop="guitar")
L("tara", "Dad. That's half a sentence in Spanish and half in English.", mood="deadpan", shot="close")
L("dad", "Yes. The famous half is in English. For my international fans.", mood="smug", shot="two", gap=0.4)
sfx("squawk")
poof("lola", 1060)
L("lola", "[[Voy a ser famoso.]] I'm going to be famous. You need the verb, [[ser]], to be. Not, be.", mood="annoyed", shot="close")
L("dad", "[[Voy a ser famoso.]] See? Famous already. The bird is learning from me.", mood="happy", shot="close")
L("lola", "I am not learning from you. I'm trying to un-learn you.", mood="eyeroll", shot="close")
freeze("\"VOY A BE FAMOUS.\"", 2.4, narrator="Narrator: Dad owns one guitar. He knows two chords.")
confess("tara", "TARA RAO · 12 · Has Heard Both Chords")
L("tara", "Dad has entered the void deck talent show. Last year the winner was a man who whistled with his nose.", mood="deadpan")
L("tara", "Dad thinks that's his biggest competition. I think the nose is going to win again.", mood="deadpan", gap=0.5)
confess("dad", "VIKRAM RAO · Dad · Future Superstar (He Says)")
L("dad", "Every famous singer started somewhere. Mine starts at the void deck, between the letter boxes and the bicycle rack.", mood="determined")
L("dad", "Today the void deck. Tomorrow the world. The day after tomorrow, maybe a small concert in Jurong.", mood="smug", gap=0.5)

title()

# ---------------- ACT 1: THE VERB IR ----------------
scene("living", [("mum", 260), ("pablo", 560), ("lola", 900)])
L("pablo", "I'm going out! I'm going to the park to practise football.", mood="happy", shot="close", prop="ball")
L("mum", "Wait. Let me ask properly. [[¿Adónde vas?]] Where are you going?", mood="thinking", shot="close",
  boardClear=True, board="[[¿Adónde vas?]] = Where are you going?")
L("pablo", "[[Voy al parque.]] I'm going to the park. And then [[voy a la piscina.]] I'm going to the pool.", mood="happy", shot="close",
  board="[[Voy al parque.]] [[Voy a la piscina.]]")
L("lola", "First, the verb [[ir]], to go. It's the most irregular verb of the year. Ready? [[Voy, vas, va, vamos, vais, van.]]", mood="teach", shot="close",
  board="[[ir]]: [[voy · vas · va]]")
L("lola", "I go, you go, he or she goes, we go, you all go, they go. And [[vais]] has no accent. It's one syllable.", mood="teach", shot="close",
  board="[[vamos · vais · van]]")
L("mum", "Why [[al parque]], but [[a la piscina]]?", mood="thinking", shot="close")
L("lola", "Because [[a]] and [[el]] crash together into [[al]]. [[Al parque, al cine, al centro comercial.]] But [[la]] stays as it is. [[A la playa, a la piscina.]]", mood="teach", shot="close",
  boardClear=True, board="[[a + el = al]]   but [[a la]] stays")
L("pablo", "And for home, no little word at all. [[Voy a casa.]] I'm going home. [[Voy a Sevilla.]] I'm going to Seville.", mood="neutral", shot="close",
  board="[[Voy a casa.]] [[Voy a Sevilla.]]")
L("mum", "So [[mi marido va al centro comercial]], my husband goes to the mall. Every single day. To look at guitars.", mood="eyeroll", shot="close",
  board="[[Mi marido va al centro comercial]] ✔")
L("lola", "Perfect. And notice. To ask where someone is GOING, it's [[¿Adónde?]], to where. To ask where someone IS, it's [[¿Dónde estás?]]", mood="teach", shot="close",
  board="[[¿Adónde vas?]] vs [[¿Dónde estás?]]")

scene("living", [("tara", 260), ("dad", 600), ("lola", 960)])
L("dad", "My turn. Tomorrow, I go to a el mall. To buy a famous hat.", mood="smug", shot="close", boardClear=True)
sfx("buzzer")
L("tara", "[[A]] plus [[el]] is [[al]], Dad. [[Voy al centro comercial.]] And you don't need a famous hat.", mood="deadpan", shot="close",
  board="✘ a el   ✔ [[al centro comercial]]")
L("dad", "Every famous person has a famous hat.", mood="determined", shot="close")
L("lola", "Every famous person has talent. Let's start with that.", mood="bored", shot="close", gap=0.4)

# ---------------- ACT 2: IR + A + INFINITIVE ----------------
card("THE PLAN", "Four days until the talent show. Dad has a plan.", 2.4)
scene("living", [("tara", 260), ("pablo", 520), ("dad", 780)])
poof("lola", 1060)
L("lola", "Now the magic trick. Take [[voy]], add [[a]], add an infinitive, and you're talking about the future. [[Voy a cantar.]] I'm going to sing.", mood="teach", shot="close",
  boardClear=True, board="[[ir]] + [[a]] + infinitive")
L("lola", "Think of a train. The engine is [[ir]], and it changes for each person. The [[a]] in the middle never changes. And the infinitive at the back never changes.", mood="teach", shot="close",
  board="[[voy a cantar]] = I'm going to sing")
L("tara", "So, [[vas a cantar]], you're going to sing. [[Va a cantar]], he's going to sing. Only the engine changes.", mood="neutral", shot="close",
  board="[[vas a cantar · va a cantar]]")
L("pablo", "[[Mi padre va a tocar la guitarra.]] My dad is going to play the guitar. Not my dad. Your dad. I mean, Tara's dad.", mood="happy", shot="close",
  board="[[va a tocar la guitarra]]")
L("dad", "Exactly. On Saturday, voy a canto. Voy a toco la guitarra.", mood="smug", shot="close", prop="guitar")
sfx("buzzer")
L("lola", "The back of the train never changes. Always the infinitive. [[Voy a cantar. Voy a tocar la guitarra.]] Not, voy a canto.", mood="eyeroll", shot="close",
  boardClear=True, board="✘ voy a canto   ✔ [[voy a cantar]]")
L("pablo", "And for we: [[vamos a ver el concurso.]] We're going to watch the show. All of us. In the front row.", mood="excited", shot="close",
  board="[[Vamos a ver el concurso]]")
L("tara", "Negative is easy. Put [[no]] before the engine. [[No voy a cantar.]] I'm not going to sing. Ever.", mood="deadpan", shot="close",
  board="[[No voy a cantar.]] (no before ir)")
L("lola", "And the question everybody asks on a Friday. [[¿Qué vas a hacer?]] What are you going to do? Answer with the real verb. [[Voy a nadar. Voy a leer.]]", mood="teach", shot="close",
  board="[[¿Qué vas a hacer?]] → [[Voy a leer]]")
L("pablo", "And you can even say, I'm going to go. [[Voy a ir a la playa.]] Two little [[a]] words. One for the action, one for the place.", mood="happy", shot="close",
  boardClear=True, board="[[Voy a ir a la playa]] ✔")

scene("bedroom", [("pablo", 300), ("dad", 640), ("lola", 960)], caption="FRIDAY NIGHT · One Day To Go")
L("dad", "Tomorrow I must get up early, for my warm up. How do I say it?", mood="thinking", shot="close", boardClear=True)
L("lola", "Reflexive verb, [[levantarse]], to get up. The little [[me]] has two correct places. Before the engine: [[Mañana me voy a levantar temprano.]]", mood="teach", shot="close",
  board="[[Me voy a levantar temprano.]]")
L("lola", "Or glued to the end of the infinitive: [[Mañana voy a levantarme temprano.]] Same meaning. Pick one.", mood="teach", shot="close",
  board="= [[Voy a levantarme temprano.]]")
L("pablo", "And it matches the person. [[Te vas a duchar]], you're going to have a shower. [[Se va a duchar]], he's going to have a shower.", mood="neutral", shot="close",
  board="[[me · te · se]] + [[voy · vas · va]]")
L("dad", "Easy. Me voy a ducharme.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "You put it in both places! Before OR after. Never both. You don't wear two hats.", mood="annoyed", shot="close",
  board="✘ me voy a ducharme   ✔ one place only")
L("dad", "A famous person might wear two hats.", mood="thinking", shot="close")
L("pablo", "Then a famous person is going to have very bad Spanish.", mood="worried", shot="close", gap=0.4)

confess("pablo", "PABLO RUIZ · 13 · Exchange Student · Front Row")
L("pablo", "In Seville, [[mañana]] means tomorrow. But when my uncle says, [[voy a arreglar el coche mañana]], it means next year.", mood="happy")
L("pablo", "Mister Rao says he's going to practise his song [[mañana]]. He has said it for four days.", mood="worried", gap=0.5)

# ---------------- ACT 3: TIME PHRASES, PREDICTIONS, PRESENT VS FUTURE ----------------
scene("park", [("mum", 260), ("tara", 520), ("pablo", 780), ("lola", 1040)], caption="THE VOID DECK · Rehearsal")
L("mum", "Okay. Timetable. When is everything happening? I need time phrases.", mood="determined", shot="close", prop="clock", boardClear=True)
L("lola", "[[Mañana]], tomorrow. [[Pasado mañana]], the day after tomorrow. [[Esta tarde]], this afternoon. [[Esta noche]], tonight.", mood="teach", shot="close",
  board="[[mañana · pasado mañana]]")
L("tara", "[[Este fin de semana]], this weekend. [[El sábado que viene]], next Saturday. [[La semana que viene]], or [[la próxima semana]], next week.", mood="neutral", shot="close",
  board="[[este fin de semana]] · [[que viene]]")
L("pablo", "And big dreams: [[el año que viene]], next year. [[En el futuro]], in the future. [[En el futuro voy a ser futbolista.]] In the future I'm going to be a footballer.", mood="excited", shot="close",
  board="[[el año que viene]] · [[en el futuro]]")
L("mum", "Got it. [[Esta tarde vamos a ensayar. Mañana por la mañana vamos a ir al concurso.]] This afternoon we rehearse. Tomorrow morning, the show.", mood="happy", shot="close",
  boardClear=True, board="[[mañana por la mañana]] = tomorrow morning")
L("lola", "Predictions too. Look at those clouds. [[Va a llover.]] It's going to rain. Every afternoon in Singapore, at four o'clock, [[va a llover]].", mood="teach", shot="close", prop="umbrella",
  board="[[Va a llover.]] = It's going to rain.")
L("tara", "And opinions about the future. [[Va a ser genial]], it's going to be great. Or [[va a ser un desastre]], it's going to be a disaster.", mood="deadpan", shot="close",
  board="[[Va a ser genial / un desastre]]")
L("pablo", "Wait, I'll invite my friend from school. [[¿Quieres venir al concurso?]] Do you want to come to the show?", mood="happy", shot="close", prop="phone",
  boardClear=True, board="[[¿Quieres venir?]] = Do you want to come?")
L("lola", "And the replies. Yes: [[¡Sí, claro!]] or [[¡Qué buena idea!]] No: [[Lo siento, no puedo.]] Sorry, I can't.", mood="teach", shot="close",
  board="[[¡Sí, claro!]] · [[Lo siento, no puedo]]")
L("pablo", "He says, [[lo siento, no puedo, porque voy a visitar a mis abuelos.]] Sorry, I can't, because I'm going to visit my grandparents.", mood="sad", shot="close",
  board="[[No puedo porque voy a…]]")
L("tara", "Clever. The grandparents excuse. I'm going to use that.", mood="smug", shot="close", gap=0.4)

scene("park", [("tara", 260), ("dad", 560), ("lola", 900)])
L("dad", "Last question. How do you know if a sentence is now, or the future?", mood="thinking", shot="close", boardClear=True)
L("lola", "Finally, a good question. [[Los sábados juego al fútbol.]] On Saturdays I play football. Every Saturday, a habit. Present tense.", mood="teach", shot="close",
  board="[[los sábados]] = every Saturday → present")
L("tara", "But [[este sábado voy a jugar al fútbol.]] This Saturday I'm going to play. One Saturday, still to come. Future.", mood="neutral", shot="close",
  board="[[este sábado]] + [[voy a jugar]] → future")
L("lola", "And the trap. [[Voy al cine]] is present. I'm going to the cinema. After the [[a]] there's a place. [[Voy a ir al cine]] is future. After the [[a]] there's a verb.", mood="teach", shot="close",
  board="[[voy al cine]] vs [[voy a ir al cine]]")
L("dad", "So my sentence. [[Voy a ser famoso.]] Engine, [[voy]]. Little [[a]]. Infinitive, [[ser]]. Future.", mood="determined", shot="close")
L("lola", "Correct. The grammar is perfect. The prediction is wrong. But the grammar is perfect.", mood="smug", shot="close", gap=0.4)

confess("lola", "LOLA · Recap Parrot · Is Going To Be Smug")
L("lola", "Recap. One. The verb [[ir]]. [[Voy, vas, va, vamos, vais, van.]] And [[a]] plus [[el]] is [[al]].", mood="teach", boardClear=True, board="1. [[voy · vas · va · vamos · vais · van]]")
L("lola", "Two. The future train. [[Ir]], plus [[a]], plus infinitive. [[Voy a cantar.]] Only the engine changes.", mood="teach", board="2. [[voy a cantar]] (ir + a + infinitive)")
L("lola", "Three. Reflexive pronoun before, or after. Never both. [[Me voy a levantar]], or [[voy a levantarme]].", mood="teach", board="3. [[me voy a levantar = voy a levantarme]]")
L("lola", "Four. Time phrases. [[Mañana, esta noche, el sábado que viene, la semana que viene.]]", mood="teach", board="4. [[mañana · el sábado que viene]]")
L("lola", "Five. [[Los sábados]] is a habit, present. [[Este sábado]] with [[voy a]] is the future. Now somebody get me a ticket. Front row.", mood="smug", board="5. [[los sábados]] vs [[este sábado]]", gap=0.5)

# ---------------- CLOSING GAG: THE TALENT SHOW ----------------
card("SATURDAY", "The void deck. Fourteen plastic chairs. One dream.", 2.4)
scene("park", [("tara", 220), ("mum", 440), ("dad", 660), ("pablo", 880)])
L("dad", "This is it. [[Voy a cantar una canción en español.]] I'm going to sing a song in Spanish.", mood="determined", shot="close", prop="guitar")
L("mum", "That sentence was perfect. He might actually do it.", mood="shock", shot="close")
L("tara", "[[Va a llover.]] I'm just saying. Look at the sky.", mood="deadpan", shot="close")
sfx("whistle")
L("dad", "Ladies and gentlemen of block two hundred and seven!", mood="excited", shot="wide", prop="guitar")
sfx("squawk")
poof("lola", 1080)
L("lola", "[[¡Buenas tardes, Singapur!]] Tonight I'm going to correct everybody's grammar. Live!", mood="excited", shot="close")
sfx("flamenco")
L("pablo", "The audience loves her! [[¡Lola va a ser famosa!]] Lola is going to be famous!", mood="excited", shot="close")
L("lola", "[[Famosa]], with an A. I'm a girl parrot. The adjective agrees, even in the future.", mood="smug", shot="close",
  boardClear=True, board="[[Voy a ser famosa]] (she → -a)")
L("dad", "That's okay. [[El año que viene voy a ser famoso.]] Next year.", mood="sad", shot="close")
L("tara", "Dad. That was perfect Spanish. That's the most famous thing you've ever done.", mood="happy", shot="close", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “We are going to watch a film.”", "[[Vamos a ver una película]]", "we → [[vamos]] + [[a]] + infinitive [[ver]]",
  "Question one. How do you say, we are going to watch a film?",
  "[[Vamos a ver una película.]] The engine is [[vamos]], then [[a]], then the infinitive, [[ver]].")
challenge(2, "Translate: “She is going to have a shower.” ([[ducharse]])", "[[Se va a duchar]]", "or [[va a ducharse]] — one place, never both",
  "Question two. Translate. She is going to have a shower. The verb is [[ducharse]].",
  "[[Se va a duchar.]] Or, [[va a ducharse.]] One place for the [[se]]. If you used both, Dad says thank you.")
challenge(3, "Translate: “It's going to rain this afternoon.”", "[[Esta tarde va a llover]]", "prediction → [[va a]] + [[llover]]",
  "Question three. Translate. It's going to rain this afternoon.",
  "[[Esta tarde va a llover.]] A prediction, so [[va a llover]]. And in Singapore, it's always true.")
end_card()
