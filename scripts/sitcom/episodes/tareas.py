# "¡Qué Caos!" S01E07 "Tengo Que What Now?" (Topic: tareas — Chores)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="tareas", logline="Mum puts a chore rota on the fridge and Dad discovers the words tengo que. Chores, obligation with tener que, deber and hay que, frequency, pocket money, opinions and weekend plans.")

# ---------------- COLD OPEN ----------------
scene("kitchen", [("mum", 300), ("tara", 560), ("dad", 840)])
L("mum", "New rule. Pablo is our guest, but everybody helps. Tara has written a chore list. In Spanish.", mood="determined", shot="close", prop="book")
L("tara", "Dad, you're first. [[Tienes que lavar los platos.]]", mood="deadpan", shot="close")
L("dad", "Tengo que what now?", mood="shock", shot="close")
sfx("squawk")
poof("lola", 1080)
L("lola", "[[Tienes que lavar los platos.]] You have to wash the dishes. All of them. Including the curry pot.", mood="smug", shot="close")
L("dad", "No problem. Yo hago the dishes-o tomorrow-o.", mood="smug", shot="close")
L("lola", "Tomorrow. [[Mañana.]] The most dangerous word in Spanish.", mood="eyeroll", shot="close", gap=0.3)
freeze("\"TENGO QUE WHAT NOW?\"", 2.4, narrator="Narrator: The curry pot had been soaking since Thursday.")
confess("mum", "ANJALI RAO · Mum · Chore Rota Enforcer")
L("mum", "In this flat, everybody helps. Tara helps. Pablo helps. Even the parrot helps. She tells us what we're doing wrong.", mood="neutral")
L("mum", "Vikram also helps. He supervises. From the sofa.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: CHORES VOCABULARY ----------------
scene("kitchen", [("mum", 300), ("pablo", 600), ("tara", 880)])
L("pablo", "In Spain, chores are [[las tareas de casa]]. Every morning, [[hago la cama]]. I make the bed.", mood="happy", shot="close",
  boardClear=True, board="[[las tareas de casa]] = chores")
poof("lola", 1100)
L("lola", "Chores are chunks. [[Pongo la mesa]], I set the table. [[Quito la mesa]], I clear the table. [[Lavo los platos]], I wash the dishes. [[Paso la aspiradora]], I vacuum.", mood="teach", shot="close",
  board="[[pongo la mesa · quito la mesa]]")
L("lola", "[[Saco la basura]], I take out the rubbish. [[Plancho]], I iron. [[Cocino]], I cook. [[Ordeno mi cuarto]], I tidy my room. [[Limpio el cuarto de baño]], I clean the bathroom.", mood="teach", shot="close",
  board="[[saco la basura · plancho · cocino]]")
L("mum", "Wait. [[Hago]] and [[pongo]] don't look like their infinitives.", mood="thinking", shot="close")
L("lola", "Well spotted. [[Hacer]] gives [[hago]]. [[Poner]] gives [[pongo]]. Irregular only in the I form. After that, normal. [[Mi hermano hace la cama.]]", mood="teach", shot="close",
  board="[[hacer → hago · poner → pongo]]")
L("tara", "And [[regar]], to water, changes E to I E. [[Riego las plantas.]] I water the plants. That's Dad's job. He waters the plastic one.", mood="deadpan", shot="close",
  board="[[riego las plantas]] (e → ie)")
L("pablo", "In Seville, [[paseo al perro]], I walk the dog. And my dad [[corta el césped]], he cuts the lawn.", mood="happy", shot="close",
  boardClear=True, board="[[paseo al perro · corta el césped]]")
L("lola", "Notice [[al perro]]. A pet or a person gets a little [[a]] in front. Things don't. [[Lavo el coche.]] I wash the car.", mood="teach", shot="close",
  board="[[paseo al perro]] but [[lavo el coche]]")
L("tara", "We live on the fourteenth floor. No dog. No lawn. No car.", mood="deadpan", shot="close")
L("lola", "And thank goodness, no cat.", mood="smug", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Chore Consultant")
L("dad", "I do lots of chores. Mainly, I supervise. Supervising is a chore. It's very tiring.", mood="smug")
L("dad", "Yesterday I supervised for three hours. I needed a nap afterwards.", mood="sad", gap=0.6)

# ---------------- ACT 2: TENGO QUE, DEBO, HAY QUE ----------------
card("TENGO QUE", "Three ways to say: you have no choice", 2.4)
scene("living", [("tara", 260), ("dad", 520), ("pablo", 780), ("lola", 1040)])
L("dad", "Lola, explain this tengo que. Is it a dance?", mood="thinking", shot="close", boardClear=True)
L("lola", "[[Tener que]] plus an infinitive means, to have to. [[Tengo que lavar los platos.]] I have to wash the dishes.", mood="teach", shot="close",
  board="[[tengo que]] + infinitive")
L("pablo", "And [[tener]] is irregular. [[Tengo, tienes, tiene, tenemos, tenéis, tienen.]]", mood="teach", shot="close",
  board="[[tengo · tienes · tiene · tenemos]]")
L("tara", "[[¿Qué tienes que hacer en casa?]] What do you have to do at home? [[Tengo que hacer la cama y sacar la basura.]] One [[tengo que]] covers both.", mood="neutral", shot="close",
  board="[[¿Qué tienes que hacer en casa?]]")
L("dad", "Right. Tengo que lavo los platos.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Infinitive! [[Tengo que lavar.]] Not lavo. And yes, I heard you volunteer.", mood="eyeroll", shot="close",
  board="✘ tengo que lavo   ✔ [[tengo que lavar]]")
L("lola", "Option two. [[Deber]], must or should. [[Debo ayudar más en casa.]] I should help more at home. Option three. [[Hay que]], one has to. A rule for everybody.", mood="teach", shot="close",
  boardClear=True, board="[[debo ayudar · hay que]] + infinitive")

scene("hawker", [("tara", 260), ("pablo", 520), ("uncle", 1000)], caption="UNCLE HOCK'S STALL · Vegetarian Bee Hoon")
L("uncle", "Pablo! After you eat, must return your tray, okay?", mood="happy", shot="close", prop="plate")
L("pablo", "In Spanish, that's [[hay que]]. [[Hay que devolver la bandeja.]] You have to return the tray. [[Hay]] never changes.", mood="teach", shot="close",
  board="[[Hay que devolver la bandeja]]")
poof("lola", 760)
L("lola", "Careful with negatives. [[No tengo que cocinar]] means I don't have to cook. There's no need. But [[no debo]] means I mustn't.", mood="teach", shot="close",
  board="[[no tengo que]] = don't have to")
L("uncle", "Simple. You eat at my stall, [[no tienes que cocinar]]! You don't have to cook!", mood="excited", shot="close", prop="plate",
  board="[[no debo]] = mustn't")
L("tara", "Uncle Hock speaks Spanish now?", mood="shock", shot="close")
L("uncle", "Only the words that sell noodles.", mood="smug", shot="close", gap=0.4)

# ---------------- ACT 3: HOW OFTEN & POCKET MONEY ----------------
card("LA PAGA", "Pocket money negotiations. Bring snacks.", 2.4)
scene("living", [("tara", 260), ("dad", 560), ("lola", 900)])
L("tara", "Dad. If I do chores, I want [[la paga]]. Pocket money.", mood="determined", shot="close", boardClear=True)
L("lola", "First, how often. [[Cada día]], every day. [[Una vez a la semana]], once a week. [[Dos veces a la semana]], twice a week. [[A veces]], sometimes. [[Nunca]], never.", mood="teach", shot="close",
  board="[[cada día · una vez a la semana · nunca]]")
L("tara", "[[Saco la basura cada día.]] And [[nunca plancho]]. I never iron. Or, [[no plancho nunca]]. Both work.", mood="deadpan", shot="close",
  board="[[nunca plancho = no plancho nunca]]")
L("dad", "Fine. I'll give you cien dollars a week. Cien. That's ten, right?", mood="smug", shot="close", prop="phone")
L("tara", "[[¡Vale!]] Deal.", mood="happy", shot="close")
sfx("ding")
L("lola", "[[Cien]] is one hundred. Ten is [[diez]].", mood="smug", shot="close")
L("dad", "One hundred?!", mood="shock", shot="close", prop="phone")
L("lola", "Money numbers. [[Veinte, treinta, cuarenta, cincuenta, sesenta, setenta, ochenta, noventa, cien.]]", mood="teach", shot="close",
  boardClear=True, board="[[veinte · treinta · cincuenta · cien]]")
L("lola", "Twenty one to twenty nine are one word. [[Veinticinco.]] After thirty, use [[y]]. [[Cuarenta y ocho.]] And [[uno]] shortens before a masculine noun. [[Veintiún dólares.]]", mood="teach", shot="close",
  board="[[veinticinco · cuarenta y ocho · veintiún]]")
L("tara", "[[Mis padres me dan cien dólares a la semana.]] My parents give me one hundred dollars a week. [[Con mi dinero compro libros.]] With my money I buy books.", mood="smug", shot="close",
  board="[[Mis padres me dan…]] = they give me")
L("dad", "New deal. Twenty dollars. Veinte. Final offer.", mood="worried", shot="close", prop="phone")
L("tara", "[[Recibo veinte dólares a la semana.]] I get twenty dollars a week. Starting next week. Today I keep the hundred.", mood="deadpan", shot="close",
  board="[[Recibo veinte dólares a la semana]]")
L("lola", "I love this child.", mood="excited", shot="close", gap=0.4)

# ---------------- ACT 4: OPINIONS & THIS WEEKEND ----------------
card("THE GREAT CHORE DEBATE", "Everybody has an opinion. Only one is correct.", 2.4)
scene("kitchen", [("tara", 240), ("mum", 460), ("dad", 680), ("pablo", 900)])
L("mum", "Opinions, everyone. Chores. Go.", mood="determined", shot="close", boardClear=True)
L("pablo", "[[No me importa poner la mesa.]] I don't mind setting the table. [[Me gusta cocinar.]] I like cooking.", mood="happy", shot="close",
  board="[[no me importa · me gusta cocinar]]")
poof("lola", 1100)
L("lola", "With an infinitive, [[gusta]] stays singular. Even with two. [[Me gusta cocinar y planchar.]]", mood="teach", shot="close",
  board="[[me gusta cocinar y planchar]]")
L("tara", "[[Odio limpiar el cuarto de baño.]] I hate cleaning the bathroom. [[Es asqueroso.]] It's disgusting.", mood="deadpan", shot="close",
  board="[[odio limpiar · es asqueroso]]")
L("lola", "Describe chores with [[es]]. [[Es justo]], it's fair. [[Es injusto]], it's unfair. [[Es aburrido]], it's boring. And [[es un rollo]], it's a pain.", mood="teach", shot="close",
  board="[[es justo · es injusto · es un rollo]]")
L("dad", "My opinion. Chores es muy injusta.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "A chore counts as masculine, so [[es injusto]]. And no. [[Es justo.]]", mood="eyeroll", shot="close",
  boardClear=True, board="✘ es injusta   ✔ [[es injusto]]")
L("tara", "Compare who does what. [[Mi padre no hace nada.]] My dad doesn't do anything.", mood="deadpan", shot="close",
  board="[[Mi padre no hace nada]]")
L("mum", "[[Pienso que todos deben ayudar en casa.]] I think everyone should help at home.", mood="determined", shot="close",
  board="[[Pienso que todos deben ayudar]]")
L("dad", "Fine! I'll do chores. Tomorrow-o.", mood="annoyed", shot="close")
L("lola", "Then say it properly. The near future. [[Ir a]] plus an infinitive. [[Mañana voy a lavar los platos.]] Tomorrow I'm going to wash the dishes.", mood="teach", shot="close",
  boardClear=True, board="[[voy a]] + infinitive")
L("pablo", "[[Este fin de semana voy a regar las plantas.]] This weekend I'm going to water the plants. Even the plastic one.", mood="happy", shot="close",
  board="[[Este fin de semana voy a…]]")
L("lola", "Negatives go before [[voy]]. [[No voy a planchar.]] And let the time phrase be your signal. [[Normalmente hago la cama]], present. [[Mañana voy a hacer la cama]], future.", mood="teach", shot="close",
  board="[[normalmente hago · mañana voy a hacer]]", gap=0.3)

confess("lola", "LOLA · Recap Parrot · Has Never Done A Chore")
L("lola", "Recap. One. Chores are chunks. [[Hago la cama. Pongo la mesa. Lavo los platos.]]", mood="teach", boardClear=True, board="1. [[hago la cama · pongo la mesa]]")
L("lola", "Two. [[Tengo que]] plus an infinitive. [[Tengo que sacar la basura.]]", mood="teach", board="2. [[tengo que]] + infinitive")
L("lola", "Three. [[Hay que]] is a rule for everyone. And [[no tengo que]] means, I don't have to.", mood="teach", board="3. [[hay que · no tengo que]]")
L("lola", "Four. How often, and money. [[Una vez a la semana.]] And [[cien]] is one hundred. Sorry, Dad.", mood="teach", board="4. [[una vez a la semana · cien]] = 100")
L("lola", "Five. Opinions and plans. [[Es injusto. Mañana voy a planchar.]] Me? I'm a parrot. I don't have to do anything.", mood="smug", board="5. [[es injusto · voy a planchar]]", gap=0.5)

scene("kitchen", [("tara", 260), ("mum", 520), ("dad", 780), ("pablo", 1040)], caption="THE NEXT DAY · The Curry Pot Is Still There")
L("tara", "Dad. It's tomorrow.", mood="deadpan", shot="close")
L("dad", "I've found a solution. [[Hay que lavar los platos.]] One has to wash the dishes. Not me. One.", mood="smug", shot="close")
sfx("squawk")
L("lola", "He's used [[hay que]] to escape a chore. I hate how proud I am.", mood="shock", shot="wide", offstage=True)
L("mum", "Nice try. [[Vikram, tienes que lavar los platos.]] You. Personally.", mood="determined", shot="close",
  boardClear=True, board="[[Vikram, tienes que lavar los platos]]")
L("dad", "Tengo que what now?", mood="sad", shot="close", prop="broom")
sfx("trombone")
L("pablo", "Don't worry. I'll help. [[Te ayudo.]]", mood="happy", shot="close", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “I have to make the bed.”", "[[Tengo que hacer la cama]]", "[[tener que]] + infinitive → [[hacer]], not [[hago]]",
  "Question one. How do you say, I have to make the bed?",
  "[[Tengo que hacer la cama.]] [[Tengo que]], then the infinitive, [[hacer]]. Not [[hago]].")
challenge(2, "Translate: “I don't have to cook.”", "[[No tengo que cocinar]]", "[[no]] before [[tengo]];  [[no debo]] = mustn't",
  "Question two. Translate. I don't have to cook.",
  "[[No tengo que cocinar.]] There's no need to cook. Which is how Dad feels about everything.")
challenge(3, "Translate: “Tomorrow I'm going to wash the car.”", "[[Mañana voy a lavar el coche]]", "[[ir a]] + infinitive → [[voy a lavar]]",
  "Question three. Translate. Tomorrow I'm going to wash the car.",
  "[[Mañana voy a lavar el coche.]] [[Voy a]], plus the infinitive. And if you're Dad, it stays tomorrow forever.")
end_card()
