# "¡Qué Caos!" S01E01 "Mi Casa Es Tu Caos" (Topic: mi-casa — My Home)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="mi-casa", logline="Pablo arrives from Sevilla with Lola, a parrot who corrects everyone's Spanish. Types of home, where it is, rooms with hay and tiene, and adjectives that agree.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("dad", "Tara. Our Spanish exchange student arrives in five minutes. I have been practising. Listen.", mood="smug", shot="close", prop="tablet")
L("dad", "Welcome-o to our house-o! Our house-o is very big-o!", mood="excited", shot="close")
L("tara", "Dad. That's not Spanish. That's English with an O on the end.", mood="deadpan", shot="close")
L("dad", "Exactly. Spanish is easy. You just add O. Pizza-o. Computer-o. Genius-o.", mood="smug", shot="two", gap=0.4)
sfx("door")
scene("living", [("tara", 260), ("dad", 560), ("pablo", 900)])
L("pablo", "[[¡Hola! Me llamo Pablo.]] Hello! My name is Pablo. I'm from Seville. Thank you for having me!", mood="excited", shot="close")
L("dad", "Pablo-o! Welcome-o to my house-o! It is very big-o!", mood="excited", shot="close")
sfx("squawk")
poof("lola", 1080)
L("lola", "[[Casa.]] It's [[casa]], not house-o. And your flat is not big-o. Big is [[grande]].", mood="annoyed", shot="close")
L("dad", "The bird. The bird is talking.", mood="shock", shot="close")
L("pablo", "This is Lola, my parrot. She corrects everybody's Spanish. Sorry. She cannot stop.", mood="worried", shot="two")
freeze("\"HOUSE-O.\"", 2.4, narrator="Narrator: Dad had been practising for three weeks.")
confess("tara", "TARA RAO · 12 · Secretly Good At Spanish")
L("tara", "My dad has been learning Spanish on an app for three weeks. Yesterday the app sent him a message. It said, are you okay.", mood="deadpan")
L("tara", "Also, we now have a parrot. Nobody asked me about the parrot.", mood="deadpan", gap=0.5)
confess("lola", "LOLA · Parrot · From Seville · Grammar Police")
L("lola", "[[Hola.]] I'm Lola, from Seville. Most parrots repeat what people say. I don't repeat it. I correct it.", mood="smug")
L("lola", "In this flat, that's a full time job.", mood="bored", gap=0.5)

title()

# ---------------- ACT 1: TYPES OF HOME & WHERE IT IS ----------------
scene("living", [("tara", 260), ("pablo", 560), ("lola", 900)])
L("tara", "So, Pablo. [[¿Dónde vives?]] Where do you live?", mood="neutral", shot="close",
  boardClear=True, board="[[¿Dónde vives?]] = Where do you live?")
L("pablo", "[[Vivo en un piso.]] I live in a flat. Like this one, but with more football posters.", mood="happy", shot="close",
  board="[[Vivo en…]] = I live in…")
L("lola", "Types of home. [[Un piso]], a flat. [[Una casa]], a house. [[Una casa adosada]], a house joined to the next one. [[Un chalet]], a detached house. [[Una granja]], a farm. [[Un apartamento]], an apartment.", mood="teach", shot="close",
  board="[[un piso]] · [[una casa]] · [[una granja]]")
L("lola", "Every noun is masculine or feminine. Masculine takes [[un]], feminine takes [[una]]. Ends in O? Usually masculine. Ends in A? Usually feminine. [[Chalet]] is from French, so just learn it.", mood="teach", shot="close",
  board="-o → [[un piso]]   -a → [[una casa]]")
poof("dad", 1120)
L("dad", "Easy. So in Spanish, I live in un casa.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "[[Casa]] ends in A. Feminine. [[Una casa.]] And you live in a flat anyway. [[Un piso.]]", mood="eyeroll", shot="close",
  boardClear=True, board="✘ un casa   ✔ [[una casa]]")

scene("living", [("mum", 260), ("pablo", 560), ("lola", 900)])
L("mum", "Let me try. The verb is [[vivir]], to live. [[Vivo]] is, I live. What's, you live?", mood="thinking", shot="close", boardClear=True,
  board="[[vivir]] = to live")
L("pablo", "[[Vives.]] And he or she lives is [[vive]]. [[¿Vives en una casa o en un piso?]] Do you live in a house or a flat?", mood="teach", shot="close",
  board="[[vivo · vives · vive]] = I · you · he/she")
L("mum", "[[Vivo en un piso.]] And [[Pablo vive en un piso en Sevilla.]] Pablo lives in a flat in Seville.", mood="happy", shot="close",
  board="[[Pablo vive en un piso en Sevilla]] ✔")
L("lola", "Perfect. Five minutes, and she's already better than him.", mood="smug", shot="close")
L("pablo", "[[Mi piso está en el centro de Sevilla.]] My flat is in the centre of Seville.", mood="happy", shot="close", boardClear=True,
  board="[[Mi piso está en el centro]]")
L("lola", "For WHERE something is, use [[está]]. [[Está en el centro]], it's in the centre. [[En las afueras]], in the suburbs. [[En el campo]], in the countryside. [[En la costa]], on the coast. [[En la montaña]], in the mountains.", mood="teach", shot="close",
  board="location → [[está]]")
L("mum", "Tampines is the suburbs. [[Nuestro piso está en las afueras.]] Our flat is in the suburbs.", mood="happy", shot="close",
  board="[[Nuestro piso está en las afueras]] ✔")
L("pablo", "And my grandparents live in a village. [[Mis abuelos viven en un pueblo en Andalucía.]] Very quiet. Just goats.", mood="neutral", shot="close",
  board="[[en un pueblo · en una ciudad]]")

scene("living", [("tara", 260), ("dad", 600), ("lola", 960)])
L("dad", "My turn. Our flat is near the school. Soy en near the school-o.", mood="smug", shot="close", boardClear=True)
sfx("buzzer")
L("lola", "Three mistakes in one sentence. A personal best.", mood="eyeroll", shot="close")
L("tara", "Not [[soy]], Dad. Location is [[está]]. And near is [[cerca de]]. [[Está cerca del colegio.]] It's near the school.", mood="deadpan", shot="close",
  board="✘ soy en   ✔ [[está cerca del colegio]]")
L("lola", "And she did [[del]]! [[De]] plus [[el]] squashes into [[del]]. The opposite, far from, is [[lejos de]]. [[Lejos de la playa]], far from the beach.", mood="excited", shot="close",
  board="[[de + el = del]]   far = [[lejos de]]")

confess("dad", "VIKRAM RAO · Dad · Fluent In Spanish (He Says)")
L("dad", "People say I'm not fluent. But I have watched every Spanish football match since two thousand and ten.", mood="smug")
L("dad", "With the sound off. But still.", mood="sad", gap=0.6)

# ---------------- ACT 2: THE TOUR — ROOMS, HAY AND TIENE ----------------
card("THE GRAND TOUR", "Of a four-room flat. It will not take long.", 2.4)
scene("kitchen", [("mum", 300), ("pablo", 620), ("lola", 960)])
L("pablo", "[[La cocina.]] The kitchen. Then the living room, [[el salón]], and the dining room, [[el comedor]].", mood="happy", shot="close", boardClear=True,
  board="[[la cocina]] · [[el salón]] · [[el comedor]]")
L("lola", "Bedroom, [[el dormitorio]]. Bathroom, [[el cuarto de baño]]. Toilet, [[el aseo]]. Study, [[el despacho]]. And outside, [[el jardín]], [[el garaje]], [[el balcón]] and [[la terraza]].", mood="teach", shot="close",
  board="[[el dormitorio]] · [[el cuarto de baño]]")
L("mum", "How do I say, there are three bedrooms?", mood="thinking", shot="close")
L("lola", "With the most useful word in Spanish. [[Hay.]] There is, or there are. The H is silent. It sounds like eye.", mood="teach", shot="close",
  boardClear=True, board="[[hay]] = there is / there are")
L("mum", "[[En mi piso hay tres dormitorios.]] In my flat there are three bedrooms.", mood="happy", shot="close",
  board="[[Hay tres dormitorios]] ✔")
L("pablo", "Or use [[tiene]], it has. [[Mi piso tiene una terraza.]] My flat has a terrace. We eat dinner there at ten at night.", mood="happy", shot="close",
  board="[[tiene]] = it has")
L("mum", "Ten at night? I'm asleep at ten at night.", mood="shock", shot="close", gap=0.3)

scene("kitchen", [("dad", 300), ("tara", 620), ("lola", 960)])
L("dad", "Let me count the rooms. One-o. Two-o. Three-o.", mood="smug", shot="close", boardClear=True)
L("lola", "Stop. [[Uno, dos, tres, cuatro, cinco.]] And no garden here. With [[no hay]], the [[un]] disappears. [[No hay jardín.]] There isn't a garden.", mood="annoyed", shot="close",
  board="[[No hay jardín]] (no [[un]]!)")
L("tara", "Floors. Ground floor is [[la planta baja]]. First floor, [[la primera planta]]. Upstairs, [[arriba]]. Downstairs, [[abajo]].", mood="neutral", shot="close",
  board="[[la planta baja]] · [[arriba]] · [[abajo]]")
L("lola", "And this flat is on the fourteenth floor. Which explains why I'm dizzy.", mood="bored", shot="close", gap=0.3)

confess("pablo", "PABLO RUIZ · 13 · Exchange Student · From Seville")
L("pablo", "Singapore is amazing. Everything is clean. The trains come every two minutes.", mood="happy")
L("pablo", "But it is thirty two degrees at nine in the morning. In Seville, we call that, August. Here they call it, Tuesday.", mood="worried", gap=0.5)

# ---------------- ACT 3: DESCRIBING THE HOME ----------------
card("THAT EVENING", "Lola has found the best perch in the flat", 2.2)
scene("living", [("tara", 260), ("pablo", 560), ("dad", 840)])
poof("lola", 1080)
L("lola", "What's the flat LIKE? Use [[es]]. [[Mi piso es grande]], big. [[Pequeño]], small. [[Moderno]], modern. [[Antiguo]], old. [[Cómodo]], comfortable. [[Bonito]], pretty. [[Feo]], ugly. [[Luminoso]], bright.", mood="teach", shot="close", boardClear=True,
  board="[[es]] + [[grande · pequeño · cómodo]]")
L("dad", "We have a big-o kitchen. Una grande cocina.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Two problems. The adjective goes AFTER the noun. And it agrees. [[Una cocina grande.]]", mood="eyeroll", shot="close",
  boardClear=True, board="✘ una grande cocina   ✔ [[una cocina grande]]")
L("tara", "[[Grande]] stays the same. But [[pequeño]] changes. [[Un salón pequeño. Una cocina pequeña.]]", mood="thinking", shot="close",
  board="[[un salón pequeño]] · [[una cocina pequeña]]")
L("lola", "O changes to A for feminine. Add S for plural. [[Dos dormitorios pequeños.]]", mood="teach", shot="close",
  board="[[dos dormitorios pequeños]]")
L("pablo", "To make it stronger: [[muy]], very. [[Bastante]], quite. [[Un poco]], a bit. [[Demasiado]], too. [[Mi dormitorio es un poco pequeño.]] My bedroom is a bit small.", mood="happy", shot="close",
  board="[[muy · bastante · un poco · demasiado]]")
L("tara", "Colours too. [[La cocina es amarilla.]] The kitchen is yellow. [[El salón es azul.]] The living room is blue.", mood="neutral", shot="close", boardClear=True,
  board="[[la cocina es amarilla]]")
L("pablo", "And dream homes! [[Me gustaría vivir en un chalet en la costa.]] I would like to live in a house on the coast. With a football pitch.", mood="excited", shot="close",
  board="[[Me gustaría vivir en…]] = I'd like to live in…")
L("tara", "[[Mi casa ideal tiene una biblioteca enorme.]] My ideal home has an enormous library. With a lock.", mood="deadpan", shot="close",
  board="[[Mi casa ideal tiene…]] = my ideal home has…")
L("dad", "Me gustaría vivir in a castle-o.", mood="smug", shot="close")
L("lola", "[[Un castillo.]] And no.", mood="bored", shot="close", gap=0.4)

confess("lola", "LOLA · Recap Parrot · Will Repeat Herself Exactly Once")
L("lola", "Recap. One. [[Vivo en un piso]], I live in a flat. Masculine nouns take [[un]], feminine take [[una]].", mood="teach", boardClear=True, board="1. [[Vivo en un piso / una casa]]")
L("lola", "Two. Location uses [[está]]. [[Está en las afueras.]]", mood="teach", board="2. [[Está en las afueras]] (location)")
L("lola", "Three. [[Hay]], there is or there are. [[Hay tres dormitorios.]]", mood="teach", board="3. [[Hay tres dormitorios]]")
L("lola", "Four. Adjectives go after the noun, and agree. [[Una cocina pequeña.]] Now somebody give me a grape.", mood="smug", board="4. [[una cocina pequeña]] (after + agree)", gap=0.5)

scene("living", [("tara", 260), ("mum", 520), ("dad", 780), ("pablo", 1040)])
L("dad", "Pablo. I've learnt the most famous phrase in Spanish. [[Mi casa es su casa.]]", mood="smug", shot="close")
L("pablo", "Wow! That's perfect!", mood="excited", shot="close")
sfx("squawk")
L("lola", "Nearly. [[Su]] is polite, for grown-ups. For a friend, it's [[tu]]. [[Mi casa es tu casa.]] My home is your home.", mood="teach", shot="wide", offstage=True,
  boardClear=True, board="[[Mi casa es tu casa]] = My home is your home")
L("dad", "[[Mi casa es tu casa]], Pablo!", mood="happy", shot="close")
L("pablo", "Thank you! And with Lola here, [[mi casa es tu caos]]. My home is your chaos.", mood="happy", shot="close")
L("tara", "Most accurate thing anyone has ever said in this flat.", mood="deadpan", shot="close", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “I live in a flat” in Spanish.", "[[Vivo en un piso]]", "vivir → [[vivo]];  piso is masculine → [[un]]",
  "Question one. How do you say, I live in a flat, in Spanish?",
  "[[Vivo en un piso.]] [[Piso]] ends in O, so it takes [[un]].")
challenge(2, "[[un]] or [[una]]?  ___ [[granja]] (a farm)", "[[una granja]]", "[[granja]] ends in -a → feminine → [[una]]",
  "Question two. Farm is [[granja]]. Does it take [[un]], or [[una]]?",
  "[[Una granja.]] It ends in A, so it's feminine. If you said [[un]], I'm telling Dad you agree with him.")
challenge(3, "Translate: “The kitchen is small.”", "[[La cocina es pequeña]]", "[[cocina]] is feminine → [[pequeña]]",
  "Question three. Translate. The kitchen is small.",
  "[[La cocina es pequeña.]] [[Cocina]] is feminine, so [[pequeña]], with an A. Like a civilised person.")
end_card()
