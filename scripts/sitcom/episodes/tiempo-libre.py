# "¡Qué Caos!" S01E06 "Teleadicto" (Topic: tiempo-libre — Free Time)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="tiempo-libre", logline="Dad discovers Spanish soap operas and will not leave the sofa. Free-time activities, tocar versus jugar, gusta and gustan, the sentence train, TV opinions, and making plans.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("tara", "Dad. It's Saturday. You've been on the sofa since breakfast.", mood="deadpan", shot="close")
L("dad", "I'm learning Spanish. From a Spanish soap opera. Somebody's twin brother has come back, and everybody is crying. Including me.", mood="sad", shot="close", prop="tablet")
sfx("door")
scene("living", [("tara", 260), ("dad", 560), ("pablo", 900)])
L("pablo", "[[¡Hola!]] Who wants to play football at the void deck?", mood="excited", shot="close", prop="ball")
L("dad", "No thank you, Pablo. In my free time, I play the guitar. Yo juego la guitarra.", mood="smug", shot="close", prop="guitar")
sfx("squawk")
poof("lola", 1080)
L("lola", "[[Toco la guitarra.]] For instruments, use [[tocar]], which really means to touch. [[Jugar]] is for games. And you don't play that guitar. You hold it like a cricket bat.", mood="eyeroll", shot="close")
freeze("\"JUEGO LA GUITARRA.\"", 2.4, narrator="Narrator: The guitar has not been tuned since the day he bought it.")
confess("tara", "TARA RAO · 12 · Has Hidden The Remote Twice")
L("tara", "Dad has watched forty episodes in five days. He doesn't understand a word. Yesterday he shouted, don't trust him, Carmen.", mood="deadpan", gap=0.5)
confess("lola", "LOLA · Parrot · Hobbies Include Correcting You")
L("lola", "In Spanish, someone who can't stop watching TV is a [[teleadicto]]. I'm not saying who. But he's in pyjamas, at four in the afternoon.", mood="smug", gap=0.5)

title()

# ---------------- ACT 1: FREE-TIME ACTIVITIES ----------------
scene("park", [("tara", 300), ("pablo", 600), ("lola", 920)], caption="THE VOID DECK · A Dad-Free Zone")
L("pablo", "So, Tara. [[¿Qué haces en tu tiempo libre?]] What do you do in your free time?", mood="happy", shot="close", prop="ball",
  boardClear=True, board="[[¿Qué haces en tu tiempo libre?]]")
L("tara", "[[Leo.]] I read. [[Escucho música.]] I listen to music. And [[dibujo]], I draw. Mostly my dad, asleep on the sofa.", mood="deadpan", shot="close",
  board="[[leo · escucho música · dibujo]]")
L("lola", "Learn hobbies as chunks. [[Ver la tele]], to watch TV. [[Ir de compras]], to go shopping. [[Salir con mis amigos]], to go out with my friends. [[Bailar]], to dance.", mood="teach", shot="close",
  board="[[ver la tele · ir de compras · bailar]]")
L("pablo", "Instruments use [[tocar]]. [[Toco el piano.]] Games use [[jugar a]]. [[Juego a los videojuegos.]] I play video games.", mood="teach", shot="close",
  boardClear=True, board="[[toco el piano]] · [[juego a los videojuegos]]")
L("tara", "So never [[jugar]] with a guitar. Unless you're my dad.", mood="deadpan", shot="close",
  board="✘ juego la guitarra   ✔ [[toco la guitarra]]")
L("lola", "Most I forms are regular. [[Escucho, bailo, canto.]] But the common ones are irregular. [[Voy]], I go. [[Veo]], I watch. [[Salgo]], I go out. [[Hago]], I do.", mood="teach", shot="close",
  board="[[voy · veo · salgo · juego · hago]]")
L("pablo", "And going to a place needs a little word. [[Voy al cine]], I go to the cinema. But [[voy de compras]], I go shopping, has none.", mood="happy", shot="close", gap=0.3,
  board="[[voy al cine]] · [[voy de compras]]")

confess("dad", "VIKRAM RAO · Dad · Professional Sofa Tester")
L("dad", "People say I watch too much television. Not true. I watch exactly the right amount of television.", mood="smug")
L("dad", "The right amount is all of it.", mood="happy", gap=0.6)

# ---------------- ACT 2: GUSTA, GUSTAN & FRIENDS ----------------
card("ME GUSTA, ME GUSTAN", "The verb that works backwards", 2.4)
scene("living", [("tara", 260), ("dad", 520), ("pablo", 780), ("lola", 1040)])
L("dad", "I know how to say I like. Yo gusto la tele. Yo gusto los videojuegos.", mood="smug", shot="close", prop="tablet", boardClear=True)
sfx("buzzer")
L("lola", "[[Yo gusto]] means, I am pleasing. Right now, that's not true. [[Gustar]] means to please. [[Me gusta la tele]] really says, the TV pleases me.", mood="eyeroll", shot="close",
  board="✘ yo gusto la tele   ✔ [[me gusta la tele]]")
L("tara", "So the verb agrees with the thing you like. One thing, or an activity, takes [[gusta]]. [[Me gusta bailar.]] More than one thing takes [[gustan]]. [[Me gustan los videojuegos.]]", mood="neutral", shot="close",
  board="[[gusta]] + 1 thing · [[gustan]] + plural")
L("lola", "And keep the article. [[Me gusta la música]], never, me gusta música.", mood="teach", shot="close",
  board="[[Me gusta la música]] (keep [[la]])")
L("tara", "For other people, change the little word. [[Te gusta]], you like. [[Le gusta]], he or she likes. And [[a mi padre le gustan las telenovelas.]] My dad likes soap operas.", mood="deadpan", shot="close",
  board="[[me · te · le · nos · os · les]]")
L("dad", "Like? I love them. Me encanta mucho the telenovelas.", mood="excited", shot="close", prop="tablet")
L("lola", "[[Me encantan las telenovelas.]] Plural, so add the N. And [[encantar]] is already strong, so no [[mucho]]. Same family: [[me aburre]], it bores me.", mood="teach", shot="close",
  boardClear=True, board="[[encantar · chiflar · interesar · aburrir]]")
L("pablo", "And [[preferir]] is a normal verb. [[Prefiero salir con mis amigos.]] I prefer to go out with my friends. [[¿Y tú? ¿Qué prefieres?]]", mood="happy", shot="close", prop="ball",
  board="[[prefiero · prefieres · prefiere]]")
L("dad", "[[Prefiero la tele.]]", mood="smug", shot="close", prop="tablet")
L("lola", "Correct. Tragic, but correct.", mood="bored", shot="close", gap=0.4)

confess("pablo", "PABLO RUIZ · 13 · Would Like To Go Outside, Please")
L("pablo", "In Seville, after school, [[salgo con mis amigos]]. Here, it's thirty three degrees. So we play football inside the mall. Security does not like this.", mood="worried", gap=0.5)

# ---------------- ACT 3: THE SENTENCE TRAIN, TV & MUSIC ----------------
card("THE SENTENCE TRAIN", "When, what, where, who with, and why", 2.4)
scene("classroom", [("teacher", 300), ("tara", 620), ("pablo", 900)])
L("teacher", "Today, no short answers. [[Juego al fútbol]] is a very small, sad sentence. We build a train. When, what, where, who with, and opinion.", mood="teach", shot="close",
  boardClear=True, board="when + what + where + who + opinion")
L("tara", "When. [[Después del colegio]], after school. [[Los fines de semana]], at weekends. [[Los sábados]] means every Saturday.", mood="neutral", shot="close",
  board="[[los sábados]] = every Saturday")
L("pablo", "Where. [[En casa]], at home, with no little word. [[En el centro comercial]], in the shopping centre.", mood="happy", shot="close",
  board="[[en casa · en el centro comercial]]")
L("teacher", "Who with. [[Con mis amigos.]] Alone is [[solo]] for a boy, [[sola]] for a girl. With me is [[conmigo]].", mood="teach", shot="close",
  board="[[con mis amigos · solo / sola · conmigo]]")
poof("lola", 1100)
L("lola", "I'll take it from here, Professor. Tara, the whole train.", mood="smug", shot="close", boardClear=True)
L("tara", "[[Los domingos voy de compras en el centro comercial con mi madre porque es divertido.]] On Sundays I go shopping in the mall with my mum because it's fun. That last part is a lie.", mood="deadpan", shot="close",
  board="[[Los domingos voy de compras…]]")
L("lola", "Five carriages! Glue on more with [[pero]], but, and [[también]], also.", mood="excited", shot="close", gap=0.3,
  board="[[y · pero · también · además · porque]]")

scene("living", [("tara", 260), ("dad", 520), ("mum", 780), ("lola", 1040)])
L("mum", "Vikram. What do you watch? In Spanish, please.", mood="determined", shot="close", boardClear=True)
L("dad", "Everything. The news-o. The cartoons-o. The game show-o.", mood="smug", shot="close", prop="tablet")
L("lola", "[[Las noticias]], the news. [[Los dibujos animados]], cartoons. [[Los documentales]], documentaries. [[Los concursos]], game shows. And [[las telenovelas]], soap operas.", mood="teach", shot="close",
  board="[[las noticias · los dibujos animados]]")
L("lola", "Opinions agree, too. [[Las noticias son aburridas.]] The news is boring. Feminine plural, so A S. And plural takes [[son]], not [[es]].", mood="teach", shot="close",
  board="[[Las noticias son aburridas]]")
L("mum", "[[Me encantan los documentales porque son interesantes.]] I love documentaries because they're interesting.", mood="happy", shot="close",
  board="[[Me encantan los documentales]]")
L("dad", "My turn. Mi programa favorita es the soap opera.", mood="smug", shot="close", prop="tablet")
sfx("buzzer")
L("lola", "Trap! [[Programa]] ends in A, but it's masculine. [[El programa.]] So, [[mi programa favorito]]. With an O.", mood="teach", shot="close",
  boardClear=True, board="✘ programa favorita   ✔ [[programa favorito]]")

# ---------------- ACT 4: MAKING PLANS ----------------
card("THE INTERVENTION", "Operation: Get Dad Off The Sofa", 2.4)
scene("living", [("tara", 240), ("mum", 460), ("dad", 680), ("pablo", 900)])
L("pablo", "The plan. We invite Dad out, in Spanish. [[¿Quieres ir al cine?]] Do you want to go to the cinema?", mood="determined", shot="close",
  boardClear=True, board="[[¿Quieres ir al cine?]]")
poof("lola", 1100)
L("lola", "[[Querer]] plus an infinitive. It's a boot verb. [[Quiero, quieres, quiere.]] But [[queremos]] stays outside the boot.", mood="teach", shot="close",
  board="[[quiero · quieres · quiere · queremos]]")
L("tara", "Saying yes. [[Sí, vale.]] Yes, okay. [[¡Qué buena idea!]] What a good idea!", mood="neutral", shot="close",
  board="[[Sí, vale · ¡Qué buena idea!]]")
L("mum", "Saying no. [[Lo siento, no puedo porque tengo que trabajar.]] Sorry, I can't, because I have to work. [[Poder]] is a boot verb too.", mood="neutral", shot="close",
  board="[[No puedo porque tengo que…]]")
L("pablo", "Then fix the details. [[¿Dónde quedamos?]] Where shall we meet? [[¿A qué hora?]] What time? [[A las siete.]] At seven.", mood="happy", shot="close",
  boardClear=True, board="[[¿Dónde quedamos? · ¿A qué hora?]]")
L("mum", "And the plan, with [[ir a]] plus an infinitive. [[El sábado vamos a ir al cine.]] On Saturday we're going to go to the cinema.", mood="happy", shot="close",
  board="[[El sábado vamos a ir al cine]]")
L("pablo", "Ready. Vikram. [[¿Quieres ir al cine el sábado?]]", mood="excited", shot="close")
L("dad", "No puedo. I have to watch-o the tele-o.", mood="smug", shot="close", prop="tablet")
L("lola", "[[No puedo porque tengo que ver la tele.]] The saddest correct sentence I've ever heard.", mood="eyeroll", shot="close",
  board="[[No puedo porque tengo que ver la tele]]")
L("tara", "Dad. The cinema is showing the soap opera movie. On a giant screen.", mood="deadpan", shot="close")
L("dad", "[[¡Qué buena idea! ¿Dónde quedamos?]]", mood="excited", shot="close")
L("mum", "Totally fluent. As long as there's a twin brother involved.", mood="shock", shot="close", gap=0.4)

confess("lola", "LOLA · Recap Parrot · My Programme Is On")
L("lola", "Recap. One. Hobbies are chunks. [[Voy al cine. Veo la tele. Salgo con mis amigos.]]", mood="teach", boardClear=True, board="1. [[voy · veo · salgo · juego · hago]]")
L("lola", "Two. [[Toco la guitarra]] for instruments. [[Juego a los videojuegos]] for games.", mood="teach", board="2. [[toco la guitarra · juego a…]]")
L("lola", "Three. [[Me gusta]] with one thing or an activity. [[Me gustan]] with plural things.", mood="teach", board="3. [[me gusta leer · me gustan las series]]")
L("lola", "Four. Build the train. When, what, where, who with, and why.", mood="teach", board="4. when · what · where · who · why")
L("lola", "Five. [[¿Quieres ir al cine?]] [[No puedo porque tengo que estudiar.]] Now go away. My programme is on.", mood="smug", board="5. [[¿Quieres…? · No puedo porque…]]", gap=0.5)

scene("mall", [("tara", 260), ("mum", 520), ("dad", 780), ("pablo", 1040)], caption="SATURDAY NIGHT · Outside The Cinema")
L("pablo", "So, Vikram? [[¿Te gusta la película?]]", mood="happy", shot="close")
L("dad", "It's wonderful. The twin brother has a twin brother.", mood="excited", shot="close")
L("tara", "So he's a triplet.", mood="deadpan", shot="close")
L("mum", "Admit it, Vikram. [[Eres un teleadicto.]] You're a TV addict.", mood="smug", shot="close")
L("dad", "I've changed. Voy a watch-o the soap opera on my phone-o.", mood="happy", shot="close", prop="phone")
sfx("squawk")
L("lola", "[[Voy a ver la telenovela en el móvil.]] Correct Spanish. Same problem.", mood="eyeroll", shot="wide", offstage=True,
  boardClear=True, board="[[Voy a ver la telenovela en el móvil]]")
L("tara", "Episode forty three. He's already crying.", mood="deadpan", shot="close", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “I play the guitar” in Spanish.", "[[Toco la guitarra]]", "instrument → [[tocar]], not [[jugar]]",
  "Question one. How do you say, I play the guitar?",
  "[[Toco la guitarra.]] Instruments use [[tocar]]. If you said [[juego]], you and Dad can start a band.")
challenge(2, "[[gusta]] or [[gustan]]?  [[Me ___ los videojuegos.]]", "[[Me gustan los videojuegos]]", "[[los videojuegos]] is plural → [[gustan]]",
  "Question two. I like video games. Is it [[me gusta]], or [[me gustan]]?",
  "[[Me gustan los videojuegos.]] Video games are plural. So, [[gustan]].")
challenge(3, "Translate: “Do you want to go to the cinema?”", "[[¿Quieres ir al cine?]]", "[[querer]] → [[quieres]] + infinitive;  [[a + el = al]]",
  "Question three. Translate. Do you want to go to the cinema?",
  "[[¿Quieres ir al cine?]] And the answer is, [[¡Qué buena idea!]] Unless you're Dad.")
end_card()
