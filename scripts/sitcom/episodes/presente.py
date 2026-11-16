# "¡Qué Caos!" S01E11 "Present Tense, Family Tense" (Topic: presente — The Present Tense)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="presente", logline="Dad declares Spanish-only breakfasts and puts an O on everybody, so Lola runs Verb Boot Camp. Regular endings, key irregulars, ser versus estar, boot verbs and reflexive verbs.")

# ---------------- COLD OPEN ----------------
scene("kitchen", [("tara", 300), ("dad", 760)])
L("dad", "Family meeting! From today, breakfast is Spanish only. I'll start. Yo hablo. Tú hablo. Ella hablo. Everybody hablo!", mood="excited", shot="close")
L("tara", "Dad. You've put an O on everyone again.", mood="deadpan", shot="close")
L("dad", "The O worked for house-o.", mood="smug", shot="two")
sfx("squawk")
poof("lola", 1080)
L("lola", "It did not work for house-o. The ending changes for every person. [[Hablo, hablas, habla.]] I speak, you speak, she speaks.", mood="annoyed", shot="close")
L("dad", "Three words for one word? That's very inefficient.", mood="thinking", shot="close")
L("tara", "It's seven fifteen. Nobody has brushed their teeth. And we're arguing about verbs.", mood="deadpan", shot="close", gap=0.4)
freeze("\"EVERYBODY HABLO.\"", 2.4, narrator="Narrator: Breakfast was getting tense. Present tense.")
confess("tara", "TARA RAO · 12 · Present. Unfortunately.")
L("tara", "Dad says this family needs to communicate better. In Spanish. At seven in the morning.", mood="deadpan")
L("tara", "So Lola has made a timetable. It's called Verb Boot Camp. There's a picture of a boot on it.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: REGULAR VERBS ----------------
scene("kitchen", [("tara", 260), ("pablo", 560), ("mum", 860)], caption="VERB BOOT CAMP · Lesson One")
poof("lola", 1080)
L("lola", "Lesson one. Regular verbs. Take the infinitive, [[hablar]], to speak. Chop off the ending. What's left is the stem. Then add the new ending.", mood="teach", shot="close",
  boardClear=True, board="[[hablar]] → habl + o = [[hablo]]")
L("pablo", "A, R verbs. [[Hablo, hablas, habla, hablamos, habláis, hablan.]] I speak, you speak, he or she speaks, we speak, you all speak, they speak.", mood="teach", shot="close",
  board="-ar: [[-o -as -a -amos -áis -an]]")
L("tara", "E, R verbs. [[Comer]], to eat. [[Como, comes, come, comemos, coméis, comen.]]", mood="neutral", shot="close",
  board="-er: [[-o -es -e -emos -éis -en]]")
L("mum", "And I, R verbs. [[Vivir]], to live. [[Vivo, vives, vive, vivimos, vivís, viven.]] Same as E, R, except for we and you all.", mood="thinking", shot="close",
  board="-ir: [[-o -es -e -imos -ís -en]]")
L("lola", "Every regular you all form has an accent. [[Habláis, coméis, vivís.]] And the I form never does.", mood="teach", shot="close",
  board="[[vosotros]]: [[habláis · coméis · vivís]]")
L("pablo", "And we usually drop the I, the you, the he. The ending already tells you who. [[Hablo español.]] I speak Spanish.", mood="happy", shot="close")

scene("kitchen", [("tara", 260), ("mum", 560), ("dad", 860)], caption="VERB BOOT CAMP · Lesson One · Dad Joins")
L("dad", "I've got it. Ellos come. They eat.", mood="smug", shot="close", boardClear=True)
sfx("buzzer")
L("tara", "[[Come]] is, he eats. They eat is [[comen]]. Add an N for they. [[Ellos comen.]]", mood="deadpan", shot="close",
  board="[[come]] he/she → [[comen]] they")
L("mum", "My turn. [[Escucho música, leo un libro y escribo un correo.]] I listen to music, I read a book, and I write an email.", mood="happy", shot="close",
  board="[[escucho · leo · escribo]]")
sfx("squawk")
L("lola", "One of each. A, R. E, R. I, R. Mum, you are a machine.", mood="excited", shot="wide", offstage=True)
L("mum", "[[Ayudo en casa y limpio la cocina.]] I help at home and I clean the kitchen. Every day. Alone.", mood="annoyed", shot="close",
  board="[[ayudo · limpio]]")
L("dad", "I feel like that last bit was for me.", mood="worried", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Communicates By Pointing")
L("dad", "I don't need verb endings. In business, I just point at things. Pointing is the international language.", mood="smug")
L("dad", "Except in Spain. In Spain, they point back.", mood="sad", gap=0.6)

# ---------------- ACT 2: IRREGULARS & SER VS ESTAR ----------------
card("LESSON TWO", "The rule breakers.", 2.2)
scene("living", [("tara", 260), ("pablo", 560), ("dad", 860)], caption="VERB BOOT CAMP · Lesson Two")
poof("lola", 1080)
L("lola", "Lesson two. Rule breakers. Four verbs end in O, Y. [[Soy]], I am. [[Estoy]], I am. [[Voy]], I go. [[Doy]], I give.", mood="teach", shot="close",
  boardClear=True, board="[[soy · estoy · voy · doy]]")
L("tara", "Then the G, O verbs. [[Hago]], I do. [[Salgo]], I go out. [[Pongo]], I put. Only the I form is strange. [[Haces, sales, pones]] are normal.", mood="neutral", shot="close",
  board="[[hago · salgo · pongo]]")
L("pablo", "[[Tengo]] and [[vengo]] are G, O verbs too. And then E changes to I, E. [[Tengo, tienes, tiene.]] I have, you have, he has.", mood="teach", shot="close",
  board="[[tengo · tienes · tiene]]")
L("tara", "And [[ver]], to see, is just [[veo]], I see. The rest is regular. [[Ves, ve, vemos.]]", mood="neutral", shot="close",
  board="[[veo · ves · ve · vemos]]")
L("dad", "Then my age. Soy cuarenta y cinco.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Age uses [[tener]]. [[Tengo cuarenta y cinco años.]] You aren't forty five. You have forty five years. Like birthday candles.", mood="eyeroll", shot="close",
  board="✘ soy 45   ✔ [[tengo 45 años]]")

scene("living", [("mum", 260), ("pablo", 560), ("dad", 860)], caption="VERB BOOT CAMP · Ser Or Estar?")
poof("lola", 1080)
L("mum", "Here's what confuses me. [[Ser]] and [[estar]]. Both mean, to be.", mood="thinking", shot="close", boardClear=True)
L("lola", "[[Ser]] is what something is like. Description, identity, where you're from, and the time. [[Mi piso es grande. Es la una.]] My flat is big. It's one o'clock.", mood="teach", shot="close",
  board="[[ser]]: description · origin · time")
L("lola", "[[Estar]] is location, and how you feel right now. [[Estoy en la cocina.]] I'm in the kitchen. [[Estoy cansada.]] I'm tired.", mood="teach", shot="close",
  board="[[estar]]: location · how you feel now")
L("pablo", "So, [[soy de Sevilla, pero estoy en Singapur.]] I'm from Seville, but I'm in Singapore.", mood="happy", shot="close",
  board="[[Soy de Sevilla, pero estoy en Singapur]]")
L("dad", "Easy. Watch. [[Soy aburrido.]] I'm bored.", mood="smug", shot="close")
L("mum", "Darling. You just said, I'm boring.", mood="deadpan", shot="close")
L("lola", "[[Es aburrido]], he's boring. That's what he's like. [[Está aburrido]], he's bored. Right now. Dad, you want [[estoy aburrido]].", mood="teach", shot="close",
  board="[[es aburrido]] boring · [[está aburrido]] bored")
L("dad", "[[Estoy aburrido.]] I'm bored. But I'm not boring.", mood="happy", shot="close")
L("mum", "No, love. You're many things. Boring isn't one of them.", mood="happy", shot="close", gap=0.4)

# ---------------- ACT 3: BOOT VERBS ----------------
card("LESSON THREE", "The boot. Lola drew it herself. With her foot.", 2.4)
scene("park", [("tara", 260), ("pablo", 560), ("dad", 860)], caption="VERB BOOT CAMP · The Futsal Court")
poof("lola", 1080)
L("lola", "Boot verbs. Write the six forms in two columns. Draw a line round I, you, he and they. It looks like a boot.", mood="teach", shot="close", prop="ball",
  boardClear=True, board="BOOT = yo · tú · él · ellos")
L("lola", "Inside the boot, the stem changes. We and you all are outside the boot. They stay normal. The endings are the usual ones.", mood="teach", shot="close",
  board="[[nosotros · vosotros]] = no change")
L("pablo", "[[Poder]], to be able. O becomes U, E. [[Puedo, puedes, puede, podemos, podéis, pueden.]] Also [[vuelvo]], I go back, [[duermo]], I sleep, and [[cuesta]], it costs.", mood="teach", shot="close",
  board="o → ue: [[puedo · duermo · podemos]]")
L("tara", "E becomes I, E. [[Querer]], to want. [[Quiero, quieres, quiere, queremos.]] Same with [[prefiero]], [[empiezo]] and [[pienso]].", mood="neutral", shot="close",
  board="e → ie: [[quiero · prefiero · pienso]]")
L("pablo", "And [[jugar]] is special. U becomes U, E. [[Juego al fútbol.]] I play football. But [[jugamos]] stays normal.", mood="happy", shot="close", prop="ball",
  board="u → ue: [[juego · jugamos]]")
L("dad", "Nosotros puedemos jugar! We can play!", mood="excited", shot="close", prop="ball")
sfx("buzzer")
L("lola", "[[Podemos.]] We is outside the boot. The boot is a very exclusive club. [[Nosotros]] is not on the list.", mood="eyeroll", shot="close", boardClear=True,
  board="✘ puedemos   ✔ [[podemos]]")
L("tara", "Last one. E becomes I. [[Pedir]], to ask for. [[Pido]], I ask for. And [[vestirse]], to get dressed. [[Me visto.]]", mood="neutral", shot="close",
  board="e → i: [[pido · me visto]]")

confess("pablo", "PABLO RUIZ · 13 · Exchange Student · Misses His Abuela")
L("pablo", "My grandmother says boot verbs are easy. She also says I need a coat when it's twenty five degrees.", mood="happy")
L("pablo", "She has never been wrong about boot verbs. About coats, always.", mood="worried", gap=0.5)

# ---------------- ACT 4: REFLEXIVE VERBS ----------------
card("LESSON FOUR", "Reflexive verbs. You do them to yourself.", 2.2)
scene("bedroom", [("tara", 260), ("pablo", 560), ("mum", 860)], caption="VERB BOOT CAMP · Lesson Four")
poof("lola", 1080)
L("lola", "Reflexive verbs. You do the action to yourself. [[Levantarse]], to get up. The [[se]] on the end tells you it's reflexive.", mood="teach", shot="close",
  boardClear=True, board="[[levantarse]] = to get (yourself) up")
L("lola", "The pronoun moves in front. [[Me levanto, te levantas, se levanta, nos levantamos, os levantáis, se levantan.]]", mood="teach", shot="close",
  board="[[me · te · se · nos · os · se]]")
L("tara", "[[Me levanto a las siete. Me ducho y me visto.]] I get up at seven. I shower, and I get dressed.", mood="deadpan", shot="close",
  board="[[Me levanto a las siete]]")
L("mum", "And [[no]] goes before the pronoun. [[Los domingos no me levanto.]] On Sundays I don't get up. That's my dream.", mood="happy", shot="close",
  board="[[no me levanto]]")
L("pablo", "With [[voy a]], stick it on the end. [[Voy a levantarme.]] I'm going to get up. Or [[me voy a levantar.]] Both are correct.", mood="teach", shot="close",
  board="[[voy a levantarme]] = [[me voy a levantar]]")
L("lola", "And the difference. [[Lavo el coche.]] I wash the car. [[Me lavo.]] I wash myself. For body parts, use [[los]], not [[mis]]. [[Me lavo los dientes.]] I brush my teeth.", mood="teach", shot="close",
  boardClear=True, board="[[me lavo los dientes]] (not [[mis]]!)")
L("dad", "I'm up! Every morning, I levanto me.", mood="smug", shot="wide", offstage=True)
sfx("buzzer")
L("tara", "The pronoun goes before the verb, Dad. [[Me levanto.]] And it's nine o'clock.", mood="deadpan", shot="close", gap=0.4)

confess("lola", "LOLA · Recap Parrot · Boot Camp Sergeant")
L("lola", "Recap. One. Stem plus ending. [[Hablo, comes, vivimos.]] Drop the I and you.", mood="teach", boardClear=True, board="1. [[hablo · comes · vivimos]]")
L("lola", "Two. Rule breakers. [[Soy, estoy, voy, doy. Hago, salgo, pongo, tengo.]] And age uses [[tener]].", mood="teach", board="2. [[soy · voy · hago · tengo]]")
L("lola", "Three. [[Ser]] is what it's like. [[Estar]] is where it is, and how you feel.", mood="teach", board="3. [[es grande]] · [[está en Sevilla]]")
L("lola", "Four. Boot verbs change inside the boot. [[Puedo, quiero, juego.]] But [[podemos]].", mood="teach", board="4. [[puedo · quiero · juego · podemos]]")
L("lola", "Five. Reflexive pronoun in front. [[Me levanto.]] Now leave me alone. [[Me voy a dormir.]] I'm going to sleep.", mood="smug", board="5. [[me levanto · me visto]]", gap=0.5)

scene("kitchen", [("tara", 260), ("mum", 520), ("dad", 780), ("pablo", 1040)], caption="THE NEXT MORNING")
L("dad", "Family meeting. I've practised. [[Somos una familia. Estamos juntos. Y hablamos español.]] We are a family. We are together. And we speak Spanish.", mood="determined", shot="close", boardClear=True)
L("tara", "Wait. That was perfect. [[Somos]] for who we are. [[Estamos]] for where we are. And [[hablamos]] with A, M, O, S.", mood="shock", shot="close")
L("mum", "Who are you, and what have you done with my husband?", mood="shock", shot="close")
L("dad", "I have no idea what I said. But I meant every word.", mood="happy", shot="close")
L("pablo", "[[¡Olé!]] Breakfast is not tense any more.", mood="excited", shot="close")
L("lola", "It is. Present tense. It's the only tense this family has.", mood="smug", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "[[comer]] → “we eat”", "[[comemos]]", "-er verb: stem [[com]] + [[-emos]]",
  "Question one. The verb is [[comer]], to eat. How do you say, we eat?",
  "[[Comemos.]] Take off the ending, then add the we ending for E, R verbs.")
challenge(2, "[[es]] or [[está]]?  [[Pablo ___ en Singapur.]]", "[[está]]", "location → [[estar]]",
  "Question two. Pablo, blank, in Singapore. Do you need [[es]], or [[está]]?",
  "[[Está.]] [[Pablo está en Singapur.]] Location always takes [[estar]]. Even when you're from Seville.")
challenge(3, "Boot verb [[poder]] → “we can”", "[[podemos]]", "[[nosotros]] is outside the boot → no stem change",
  "Question three. [[Poder]], to be able. How do you say, we can?",
  "[[Podemos.]] Not puedemos. We is outside the boot, so the stem doesn't change.")
end_card()
