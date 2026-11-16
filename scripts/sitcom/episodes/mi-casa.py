# "¡Qué Caos!" S01E01 "Mi Casa Es Tu Caos" (Topic: mi-casa — My Home)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="mi-casa", logline="Pablo arrives from Sevilla with Lola, a parrot who corrects everyone's Spanish. Types of home, where it is, rooms with hay and tiene, and adjectives that agree.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("dad", "Tara. Our Spanish exchange student arrives in five minutes. I have been practising. Listen to this.", mood="smug", shot="close", prop="tablet")
L("dad", "Welcome-o to our house-o! Our house-o is very big-o!", mood="excited", shot="close")
L("tara", "Dad. That's not Spanish. That's English with an O on the end.", mood="deadpan", shot="close")
L("dad", "Exactly. Spanish is easy. You just add O. Pizza-o. Computer-o. Genius-o.", mood="smug", shot="two", gap=0.4)
sfx("door")
scene("living", [("tara", 260), ("dad", 560), ("pablo", 900)])
L("pablo", "[[¡Hola! Me llamo Pablo.]] Hello! My name is Pablo. I'm from Seville. Thank you for having me!", mood="excited", shot="close")
L("dad", "Pablo-o! Welcome-o to my house-o! It is very big-o!", mood="excited", shot="close")
sfx("squawk")
poof("lola", 1080)
L("lola", "[[Casa.]] It's [[casa]], not house-o. And your flat is not big-o. In Spanish, big is [[grande]].", mood="annoyed", shot="close")
L("dad", "The bird. The bird is talking.", mood="shock", shot="close")
L("pablo", "This is Lola. She is my parrot. She corrects everybody's Spanish. Sorry. She cannot stop.", mood="worried", shot="two")
freeze("\"HOUSE-O.\"", 2.4, narrator="Narrator: Dad had been practising for three weeks.")
confess("tara", "TARA RAO · 12 · Secretly Good At Spanish")
L("tara", "My dad has been learning Spanish on an app for three weeks. Yesterday the app sent him a message. It said, are you okay.", mood="deadpan")
L("tara", "Also, we now have a parrot. Nobody asked me about the parrot.", mood="deadpan", gap=0.5)
confess("lola", "LOLA · Parrot · From Seville · Grammar Police")
L("lola", "[[Hola.]] I'm Lola. I'm from Seville, and I'm a parrot. Most parrots repeat what people say.", mood="smug")
L("lola", "I don't repeat it. I correct it. It's a full time job in this flat.", mood="bored", gap=0.5)

title()

# ---------------- ACT 1: TYPES OF HOME & WHERE IT IS ----------------
scene("living", [("tara", 260), ("pablo", 560), ("lola", 900)])
L("tara", "So, Pablo. [[¿Dónde vives?]] Where do you live?", mood="neutral", shot="close")
L("pablo", "[[Vivo en un piso.]] I live in a flat. Like this one! But smaller, and with more football posters.", mood="happy", shot="close",
  boardClear=True, board="[[¿Dónde vives?]] = Where do you live?")
L("lola", "Write it down, people. [[Vivo en]] means, I live in. Then you add the type of home.", mood="teach", shot="close",
  board="[[Vivo en…]] = I live in…")
L("lola", "[[Un piso]], a flat. [[Una casa]], a house. [[Una casa adosada]], a house joined to the next one. [[Un chalet]], a detached house with a garden. [[Una granja]], a farm. And [[un apartamento]], an apartment.", mood="teach", shot="close",
  board="[[un piso]] · [[una casa]] · [[una granja]]")
L("tara", "Some are [[un]] and some are [[una]]. Is that random?", mood="thinking", shot="close")
L("lola", "Nothing in Spanish is random, darling. Every noun is masculine or feminine. Masculine takes [[un]]. Feminine takes [[una]].", mood="teach", shot="close",
  board="masculine → [[un]]   feminine → [[una]]")
L("lola", "Ends in O? Usually masculine. [[Un piso.]] Ends in A? Usually feminine. [[Una casa.]] And [[chalet]] is borrowed from French, so you just learn it. [[Un chalet.]]", mood="teach", shot="close",
  board="-o → [[un piso]]   -a → [[una casa]]")
poof("dad", 1120)
L("dad", "Easy. So in Spanish, I live in un casa.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "[[Casa]] ends in A. Feminine. [[Una casa.]] And you don't even live in a house. You live in a flat. [[Un piso.]]", mood="eyeroll", shot="close",
  boardClear=True, board="✘ un casa   ✔ [[una casa]]")
L("dad", "Fine. Un piso-o.", mood="annoyed", shot="close")
L("lola", "No O on the end. It already has one. That's where you get the idea, isn't it.", mood="bored", shot="close", gap=0.4)

scene("living", [("mum", 260), ("pablo", 560), ("lola", 900)])
L("mum", "Okay, let me try. The verb is [[vivir]], to live. So [[vivo]] is, I live. What's, you live?", mood="thinking", shot="close", boardClear=True,
  board="[[vivir]] = to live")
L("pablo", "[[Vives.]] You live. And for he or she lives, [[vive]]. [[¿Vives en una casa o en un piso?]] Do you live in a house or in a flat?", mood="teach", shot="close",
  board="[[vivo · vives · vive]] = I · you · he/she")
L("mum", "[[Vivo en un piso.]] And Pablo, [[Pablo vive en un piso en Sevilla.]] Pablo lives in a flat in Seville.", mood="happy", shot="close",
  board="[[Pablo vive en un piso en Sevilla]] ✔")
L("lola", "Perfect. She's been here five minutes and she's already better than him.", mood="smug", shot="close")
L("pablo", "Where is your flat? My flat is in the centre of Seville. [[Mi piso está en el centro de Sevilla.]]", mood="happy", shot="close", boardClear=True,
  board="[[Mi piso está en el centro]]")
L("lola", "Notice the verb. For WHERE something is, use [[está]]. It is, for location. [[Está en el centro]], it's in the centre. [[Está en las afueras]], it's in the suburbs.", mood="teach", shot="close",
  board="location → [[está]]")
L("lola", "Also: [[en el campo]], in the countryside. [[En la costa]], on the coast. [[En la montaña]], in the mountains. [[En un pueblo]], in a village. [[En una ciudad]], in a city.", mood="teach", shot="close",
  board="[[el campo · la costa · la montaña]]")
L("mum", "So our flat. Tampines is the suburbs. [[Nuestro piso está en las afueras.]] Our flat is in the suburbs.", mood="happy", shot="close",
  board="[[Nuestro piso está en las afueras]] ✔")
L("pablo", "And my grandparents live in a village in Andalusia. [[Mis abuelos viven en un pueblo en Andalucía.]] It's very quiet. Too quiet. Just goats.", mood="neutral", shot="close")

scene("living", [("tara", 260), ("dad", 600), ("lola", 960)])
L("dad", "I've got this. Our flat is near the school. Soy en near the school-o.", mood="smug", shot="close", boardClear=True)
sfx("buzzer")
L("lola", "Three mistakes in one sentence. A personal best.", mood="eyeroll", shot="close")
L("tara", "It's not [[soy]], Dad. For location, it's [[está]]. And near is [[cerca de]]. [[Está cerca del colegio.]] It's near the school.", mood="deadpan", shot="close",
  board="✘ soy en   ✔ [[está cerca del colegio]]")
L("lola", "Ooh. And she did [[del]]. [[De]] plus [[el]] squashes into [[del]]. [[Cerca del colegio.]] And the opposite, far from, is [[lejos de]]. [[Lejos de la playa]], far from the beach.", mood="excited", shot="close",
  board="[[de]] + [[el]] = [[del]]   far = [[lejos de]]")
L("dad", "How do you know all this?", mood="shock", shot="two")
L("tara", "I'm in Year eight, Dad. We did it in September.", mood="deadpan", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Fluent In Spanish (He Says)")
L("dad", "People say I'm not fluent. But I have watched every Spanish football match since two thousand and ten.", mood="smug")
L("dad", "With the sound off. But still.", mood="sad", gap=0.6)

# ---------------- ACT 2: THE TOUR — ROOMS, HAY AND TIENE ----------------
card("THE GRAND TOUR", "Of a four-room flat. It will not take long.", 2.4)
scene("kitchen", [("mum", 300), ("pablo", 620), ("lola", 960)])
L("mum", "Welcome to the kitchen! In Spanish?", mood="excited", shot="close", boardClear=True)
L("pablo", "[[La cocina.]] The kitchen. And through there is the living room, [[el salón]], and the dining room, [[el comedor]].", mood="happy", shot="close",
  board="[[la cocina]] · [[el salón]] · [[el comedor]]")
L("lola", "Then the bedrooms, [[los dormitorios]]. The bathroom, [[el cuarto de baño]]. And a little toilet, [[el aseo]]. A study is [[el despacho]].", mood="teach", shot="close",
  board="[[el dormitorio]] · [[el cuarto de baño]]")
L("lola", "Outside, if you're lucky, [[el jardín]], the garden. [[El garaje]], the garage. [[El balcón]], the balcony, and [[la terraza]], the terrace.", mood="teach", shot="close",
  board="[[el jardín]] · [[el balcón]] · [[la terraza]]")
L("mum", "How do I say, there are three bedrooms?", mood="thinking", shot="close")
L("lola", "With the most useful word in Spanish. [[Hay.]] It means, there is, or, there are. Spelt H A Y, but the H is silent. It sounds like eye.", mood="teach", shot="close",
  boardClear=True, board="[[hay]] = there is / there are")
L("mum", "[[En mi piso hay tres dormitorios.]] In my flat there are three bedrooms.", mood="happy", shot="close",
  board="[[Hay tres dormitorios]] ✔")
L("pablo", "And you can also use [[tiene]], it has. [[Mi piso tiene una terraza.]] My flat has a terrace. We eat dinner there at ten at night.", mood="happy", shot="close",
  board="[[tiene]] = it has")
L("mum", "Ten at night? I'm asleep at ten at night.", mood="shock", shot="close")
L("pablo", "In Seville, at ten at night, my grandmother is starting to cook.", mood="neutral", shot="close", gap=0.4)

scene("kitchen", [("dad", 300), ("pablo", 620), ("lola", 960)])
poof("tara", 820)
L("dad", "Let me count the rooms in Spanish. One-o. Two-o. Three-o.", mood="smug", shot="close", boardClear=True)
L("lola", "Stop. Please. [[Uno, dos, tres, cuatro, cinco.]] One to five. Our flat has [[cinco habitaciones]], five rooms, if you count the bathroom.", mood="annoyed", shot="close",
  board="[[uno, dos, tres, cuatro, cinco]]")
L("tara", "But no garden. How do I say, there isn't a garden?", mood="thinking", shot="close")
L("lola", "Put [[no]] in front. And with [[no hay]], the [[un]] disappears. [[No hay jardín.]] There isn't a garden. [[No hay garaje.]] There isn't a garage.", mood="teach", shot="close",
  board="[[No hay jardín]] (no [[un]]!)")
L("pablo", "In my building in Seville, the kitchen is downstairs and the bedrooms are upstairs. [[La cocina está abajo]], [[los dormitorios están arriba]].", mood="neutral", shot="close",
  board="[[arriba]] = upstairs   [[abajo]] = downstairs")
L("lola", "And floors. The ground floor is [[la planta baja]]. The first floor is [[la primera planta]]. This flat is on the fourteenth floor, which explains why I'm dizzy.", mood="bored", shot="close",
  board="[[la planta baja]] · [[la primera planta]]")

confess("pablo", "PABLO RUIZ · 13 · Exchange Student · From Seville")
L("pablo", "Singapore is amazing. Everything is clean. The trains come every two minutes. Everybody is very polite.", mood="happy")
L("pablo", "But it is thirty two degrees at nine in the morning. In Seville, we call that, August. Here they call it, Tuesday.", mood="worried", gap=0.5)

# ---------------- ACT 3: DESCRIBING THE HOME ----------------
card("THAT EVENING", "Lola has found the best perch in the flat", 2.2)
scene("living", [("tara", 260), ("pablo", 560), ("dad", 840)])
poof("lola", 1080)
L("lola", "Now, describing. What's the flat LIKE? For that, we use [[es]]. [[Mi piso es grande]], my flat is big. [[Es pequeño]], it's small. [[Es moderno]], it's modern. [[Es antiguo]], it's old.", mood="teach", shot="close", boardClear=True,
  board="what it's like → [[es]] + adjective")
L("lola", "More: [[cómodo]], comfortable. [[Bonito]], pretty. [[Feo]], ugly. [[Luminoso]], bright and full of light.", mood="teach", shot="close",
  board="[[cómodo · bonito · feo · luminoso]]")
L("dad", "We have a big-o kitchen. Una grande cocina.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Two problems. In Spanish, the adjective goes AFTER the noun. And the adjective has to agree. Kitchen is feminine, so it's [[una cocina grande]].", mood="eyeroll", shot="close",
  boardClear=True, board="✘ una grande cocina   ✔ [[una cocina grande]]")
L("tara", "So [[grande]] stays the same. But [[pequeño]] changes. [[Un salón pequeño.]] [[Una cocina pequeña.]] A small living room, a small kitchen.", mood="thinking", shot="close",
  board="[[un salón pequeño]] · [[una cocina pequeña]]")
L("lola", "Correct. Adjectives ending in O change to A for feminine. Add S for plural. [[Dos dormitorios pequeños.]] Two small bedrooms. Adjectives ending in E, like [[grande]], just add S. [[Dos dormitorios grandes.]]", mood="teach", shot="close",
  board="[[dormitorios pequeños]] · [[grandes]]")
L("pablo", "And to make it stronger, you use [[muy]], very. [[Bastante]], quite. [[Un poco]], a bit. And [[demasiado]], too. [[Mi dormitorio es un poco pequeño.]] My bedroom is a bit small.", mood="happy", shot="close",
  board="[[muy · bastante · un poco · demasiado]]")
L("dad", "Your bedroom is our storeroom. It is not a bit small. It is demasiado small.", mood="worried", shot="two")
L("lola", "Ooh. Look at him. Half Spanish, half English, but the [[demasiado]] was correct. I'm almost proud.", mood="smug", shot="close")
L("tara", "Colours work the same way. [[La cocina es amarilla]], the kitchen is yellow. [[El dormitorio es azul]], the bedroom is blue. [[Amarillo]] changes, [[azul]] doesn't.", mood="neutral", shot="close", boardClear=True,
  board="[[la cocina es amarilla]] · [[es azul]]")
L("pablo", "And one more. If you could live anywhere, you say, [[Me gustaría vivir en…]] I would like to live in. [[Me gustaría vivir en un chalet en la costa.]] A house on the coast. Near the beach. With a football pitch.", mood="excited", shot="close",
  board="[[Me gustaría vivir en…]] = I'd like to live in…")
L("tara", "[[Mi casa ideal tiene una biblioteca enorme.]] My ideal home has an enormous library. And a lock. On the door.", mood="deadpan", shot="close",
  board="[[Mi casa ideal tiene…]] = my ideal home has…")
L("dad", "Me gustaría vivir in a castle-o.", mood="smug", shot="close")
L("lola", "[[Un castillo.]] And no. The bird says no.", mood="bored", shot="close", gap=0.5)

confess("lola", "LOLA · Recap Parrot · Will Repeat Herself Exactly Once")
L("lola", "Recap, my darlings. One. [[Vivo en un piso]], I live in a flat. [[Vivo en una casa]], I live in a house.", mood="teach", boardClear=True, board="1. [[Vivo en un piso / una casa]]")
L("lola", "Two. Masculine nouns take [[un]], feminine nouns take [[una]]. Learn every noun with its little word.", mood="teach", board="2. masc → [[un]]   fem → [[una]]")
L("lola", "Three. Location uses [[está]]. [[Está en las afueras]], it's in the suburbs. [[Cerca de]], near. [[Lejos de]], far.", mood="teach", board="3. [[Está en las afueras]] (location)")
L("lola", "Four. [[Hay]] means there is or there are. [[Hay tres dormitorios.]] And [[tiene]] means it has.", mood="teach", board="4. [[Hay tres dormitorios]]")
L("lola", "Five. Adjectives go after the noun, and they agree. [[Una cocina pequeña.]] Now please, somebody give me a grape.", mood="smug", board="5. [[una cocina pequeña]] (after + agree)", gap=0.5)

scene("living", [("tara", 260), ("mum", 520), ("dad", 780), ("pablo", 1040)])
L("dad", "Pablo. I've learnt the most famous phrase in Spanish. Ready? [[Mi casa es su casa.]]", mood="smug", shot="close")
L("pablo", "Wow! That's perfect!", mood="excited", shot="close")
sfx("squawk")
L("lola", "Nearly. [[Su]] is polite, for grown-ups you don't know. For a friend, it's [[tu]]. [[Mi casa es tu casa.]] My home is your home.", mood="teach", shot="wide", offstage=True,
  boardClear=True, board="[[Mi casa es tu casa]] = My home is your home")
L("dad", "[[Mi casa es tu casa]], Pablo!", mood="happy", shot="close")
L("pablo", "Thank you! And with Lola living here, [[mi casa es tu caos]]. My home is your chaos.", mood="happy", shot="close")
L("tara", "That's the most accurate thing anyone has ever said in this flat.", mood="deadpan", shot="close", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “I live in a flat” in Spanish.", "[[Vivo en un piso]]", "vivir → [[vivo]];  piso is masculine → [[un]]",
  "Question one. How do you say, I live in a flat, in Spanish?",
  "[[Vivo en un piso.]] [[Piso]] ends in O, so it's masculine, so it takes [[un]].")
challenge(2, "[[un]] or [[una]]?  ___ [[granja]] (a farm)", "[[una granja]]", "[[granja]] ends in -a → feminine → [[una]]",
  "Question two. Farm is [[granja]]. Does it take [[un]], or [[una]]?",
  "[[Una granja.]] It ends in A, so it's feminine. If you said [[un]], I'm telling Dad you agree with him.")
challenge(3, "Translate: “The kitchen is small.”", "[[La cocina es pequeña]]", "[[cocina]] is feminine → [[pequeña]]",
  "Question three. Translate. The kitchen is small.",
  "[[La cocina es pequeña.]] [[Cocina]] is feminine, so [[pequeño]] becomes [[pequeña]]. With an A. Like a civilised person.")
end_card()
