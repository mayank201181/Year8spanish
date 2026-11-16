# "¡Qué Caos!" S01E02 "Hay Fever" (Topic: mi-dormitorio — My Bedroom)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="mi-dormitorio", logline="Dad loses his glasses, and the family turns the storeroom into Pablo's bedroom. Furniture, prepositions of place, hay versus está, colours that agree and possessives.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("dad", "Has anyone seen my glasses? I need them to read my Spanish app.", mood="worried", shot="close")
L("tara", "They're on your head, Dad.", mood="deadpan", shot="close")
L("dad", "Don't help me. I'll ask in Spanish. Dónde es my glasses-o?", mood="smug", shot="close")
sfx("squawk")
poof("lola", 1060)
L("lola", "[[¿Dónde están mis gafas?]] Where are my glasses? And the answer is, [[están encima de tu cabeza.]] They're on top of your head.", mood="eyeroll", shot="close")
L("dad", "Ha! Found them. Where were they?", mood="happy", shot="close")
L("tara", "On your head.", mood="deadpan", shot="close")
freeze("\"DÓNDE ES MY GLASSES-O?\"", 2.4, narrator="Narrator: They were on his head the entire time.")
confess("tara", "TARA RAO · 12 · Has Found Dad's Glasses 400 Times")
L("tara", "Today we are turning the storeroom into a bedroom for Pablo. Dad is in charge of the furniture.", mood="deadpan")
L("tara", "I've already called a carpenter. Just in case.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: FURNITURE ----------------
scene("bedroom", [("tara", 300), ("pablo", 600), ("lola", 920)], caption="THE STOREROOM · Now A Bedroom · Mostly")
L("pablo", "Wow! My own room! [[¡Mi propio dormitorio!]]", mood="excited", shot="close")
L("lola", "Furniture, everybody. [[La cama]], the bed. [[El armario]], the wardrobe. [[El escritorio]], the desk. [[La silla]], the chair.", mood="teach", shot="close",
  boardClear=True, board="[[la cama · el armario · la silla]]")
L("lola", "[[La lámpara]], the lamp. [[La estantería]], the shelves. [[El espejo]], the mirror. [[El ordenador]], the computer. And [[las cortinas]], the curtains.", mood="teach", shot="close",
  board="[[la lámpara · la estantería · el espejo]]")
L("tara", "And the rug is [[la alfombra]], and the little table next to the bed is [[la mesita de noche]]. Bedside table.", mood="neutral", shot="close",
  board="[[la alfombra]] · [[la mesita de noche]]")
L("pablo", "We also say [[la cómoda]], a chest of drawers. And [[el póster]]. That is the most important furniture of all.", mood="happy", shot="close",
  board="[[la cómoda]] · [[el póster]]")
L("lola", "Plurals. Ends in a vowel? Add S. [[Una cama, dos camas.]] Ends in a consonant? Add E S. [[Un ordenador, dos ordenadores.]] [[Un póster, dos pósteres.]]", mood="teach", shot="close",
  boardClear=True, board="vowel + s: [[camas]]   consonant + es: [[ordenadores]]")
L("tara", "So, one lamp, two lamps. [[Una lámpara, dos lámparas.]]", mood="neutral", shot="close", board="[[una lámpara → dos lámparas]] ✔")
L("pablo", "And in my room in Seville, I have three posters. [[Tengo tres pósteres.]] All of them are goalkeepers.", mood="happy", shot="close")
L("tara", "Why goalkeepers?", mood="thinking", shot="two")
L("pablo", "Because nobody else puts up goalkeepers. They are lonely.", mood="sad", shot="close", gap=0.4)

# ---------------- ACT 2: WHERE IS IT? ----------------
scene("bedroom", [("dad", 300), ("pablo", 600), ("lola", 920)])
L("dad", "Right. The furniture is all in. Where's the lamp? I put it somewhere.", mood="thinking", shot="close", boardClear=True)
L("lola", "[[¿Dónde está la lámpara?]] Where is the lamp? Look. [[La lámpara está encima del escritorio.]] The lamp is on the desk.", mood="teach", shot="close",
  board="[[encima de]] = on top of / above")
L("lola", "And the ball? [[El balón está debajo de la cama.]] The ball is under the bed.", mood="teach", shot="close",
  board="[[debajo de]] = under")
L("pablo", "[[La mesita de noche está al lado de la cama.]] The bedside table is next to the bed.", mood="neutral", shot="close",
  board="[[al lado de]] = next to")
L("lola", "[[La silla está delante del escritorio.]] The chair is in front of the desk. And behind is [[detrás de]].", mood="teach", shot="close",
  board="[[delante de]] = in front of   [[detrás de]] = behind")
L("pablo", "And [[la ventana está entre la cama y el escritorio.]] The window is between the bed and the desk.", mood="happy", shot="close",
  board="[[entre … y …]] = between … and …")
L("dad", "I see a pattern. Encima de el desk. Debajo de el bed.", mood="smug", shot="close", boardClear=True)
sfx("buzzer")
L("lola", "Close. But [[de]] and [[el]] always crash together into [[del]]. [[Encima del escritorio.]] [[Al lado del armario.]] Only with [[el]]. [[De la]] stays as it is. [[Debajo de la cama.]]", mood="teach", shot="close",
  board="[[de + el = del]]   but [[de la]] stays")
L("tara", "A few more. [[Enfrente de]], opposite. [[Cerca de]], near. [[Lejos de]], far from. And just [[en]], in or on. [[El espejo está en el armario.]] The mirror is on the wardrobe.", mood="neutral", shot="close",
  board="[[enfrente de · cerca de · lejos de · en]]")
L("dad", "And where is the suitcase?", mood="thinking", shot="close")
L("pablo", "[[La maleta está encima del armario.]] On top of the wardrobe. I put it there so I don't think about going home.", mood="sad", shot="close",
  board="[[La maleta está encima del armario]]")
L("lola", "Oh, darling. Don't. You'll make the parrot cry.", mood="sad", shot="close", gap=0.4)

confess("lola", "LOLA · Parrot · Does Not Do Feelings")
L("lola", "I don't do feelings. I do grammar. Grammar has rules. Feelings don't have rules.", mood="annoyed")
L("lola", "That's why I like Tara. Tara also doesn't do feelings.", mood="smug", gap=0.5)

# ---------------- ACT 3: HAY VS ESTÁ ----------------
card("HAY FEVER", "Two little words. One big headache.", 2.4)
scene("bedroom", [("tara", 300), ("mum", 600), ("lola", 920)])
L("mum", "Here's my question. When do I say [[hay]], and when do I say [[está]]?", mood="thinking", shot="close", boardClear=True)
L("lola", "Best question all week. [[Hay]] says that something EXISTS. There is, there are. It comes with [[un]], [[una]], [[unos]], [[unas]], or a number.", mood="teach", shot="close",
  board="[[hay]] + [[un / una / unos / unas]] / number")
L("lola", "[[En mi dormitorio hay una cama.]] In my bedroom there is a bed. [[Hay dos sillas.]] There are two chairs.", mood="teach", shot="close",
  board="[[Hay una cama.]] [[Hay dos sillas.]]")
L("lola", "But [[está]] says WHERE something is. It comes with [[el]], [[la]], [[los]], [[las]]. [[La cama está al lado de la ventana.]] The bed is next to the window.", mood="teach", shot="close",
  board="[[está / están]] + [[el / la / los / las]]")
L("mum", "And for plural things, [[están]]. [[Los libros están en la estantería.]] The books are on the shelves.", mood="happy", shot="close",
  board="[[Los libros están en la estantería]] ✔")
L("tara", "And the negative. [[No hay]], with no [[un]]. [[No hay televisión.]] There isn't a TV.", mood="deadpan", shot="close",
  boardClear=True, board="[[No hay televisión]] (no [[una]]!)")
L("pablo", "Wait. There is no TV in my room?", mood="shock", shot="close")
L("tara", "[[No hay televisión.]] But [[hay]] a parrot. Who watches you sleep.", mood="deadpan", shot="close")
L("lola", "Only on Tuesdays.", mood="smug", shot="close", gap=0.4)
L("mum", "Let me try a mixed one. [[Hay un ordenador. El ordenador está encima del escritorio.]] There is a computer. The computer is on the desk.", mood="determined", shot="close",
  board="[[Hay un ordenador.]] → [[Está encima del escritorio.]]")
L("lola", "Flawless. First [[hay]] with [[un]]. Then [[está]] with [[el]]. Mum, you are my favourite human this week.", mood="excited", shot="close")

confess("mum", "ANJALI RAO · Mum · Learning Fast · Hunting Bargains Faster")
L("mum", "I bought all the furniture on sale. The bed was forty percent off. The wardrobe was sixty percent off.", mood="smug")
L("mum", "The chair was free. I didn't ask why. Nobody should sit on the chair.", mood="worried", gap=0.5)

# ---------------- ACT 4: COLOURS & POSSESSIVES ----------------
scene("bedroom", [("tara", 300), ("pablo", 600), ("lola", 920)])
L("pablo", "Now I describe my room with colours! [[La silla es roja.]] The chair is red. [[El armario es marrón.]] The wardrobe is brown.", mood="happy", shot="close", boardClear=True,
  board="[[la silla es roja]] · [[el armario es marrón]]")
L("lola", "Colours go after the noun, and they agree, just like other adjectives. [[Rojo, roja, rojos, rojas.]] [[Un póster rojo. Unas cortinas rojas.]]", mood="teach", shot="close",
  board="[[rojo · roja · rojos · rojas]]")
L("tara", "But [[azul]] only has two forms. [[Azul, azules.]] [[Un edredón azul. Dos cojines azules.]]", mood="neutral", shot="close",
  board="[[azul → azules]]")
L("lola", "And two colours never change at all, because they are also things. [[Naranja]], which is an orange, and [[rosa]], which is a rose. [[Unas cortinas naranja.]]", mood="teach", shot="close",
  board="[[naranja]], [[rosa]] never change")
L("pablo", "Then possessives. [[Mi]], my. [[Tu]], your. [[Su]], his or her. With plurals, add S. [[Mi cama, mis pósteres.]] My bed, my posters.", mood="teach", shot="close",
  boardClear=True, board="[[mi / mis · tu / tus · su / sus]]")
L("tara", "And [[nuestro]] means our. It agrees too. [[Nuestro piso, nuestra cocina.]] Our flat, our kitchen.", mood="neutral", shot="close",
  board="[[nuestro piso · nuestra cocina]]")
poof("dad", 1120)
L("dad", "I found more glasses! I'll say it properly. Dónde está mis gafas?", mood="smug", shot="close")
L("lola", "So close. Glasses are plural. [[¿Dónde están mis gafas?]] And they're on your head. Again.", mood="eyeroll", shot="close",
  board="✘ dónde está mis gafas   ✔ [[están]]")
L("dad", "These are a different pair. I'm wearing two pairs now.", mood="happy", shot="close", gap=0.4)

scene("bedroom", [("tara", 300), ("pablo", 640)])
L("tara", "Now put it all together, Pablo. A whole paragraph.", mood="neutral", shot="close", boardClear=True)
L("pablo", "Okay! [[En mi dormitorio hay una cama, un escritorio y un armario.]] In my bedroom there is a bed, a desk and a wardrobe.", mood="happy", shot="close",
  board="[[En mi dormitorio hay…]]")
L("pablo", "[[La lámpara está encima del escritorio.]] The lamp is on the desk. [[Las cortinas son naranja.]] The curtains are orange.", mood="happy", shot="close",
  board="[[está encima del…]] · [[son naranja]]")
L("pablo", "[[Me encanta mi dormitorio porque es cómodo.]] I love my bedroom because it's comfortable.", mood="excited", shot="close",
  board="[[Me encanta… porque es cómodo]]")
L("tara", "And in Seville, you share a room with your brother, right? That's [[comparto mi dormitorio con mi hermano.]] I share my bedroom with my brother.", mood="neutral", shot="close",
  board="[[Comparto mi dormitorio con…]]")
L("pablo", "Yes. [[Comparto mi dormitorio con mi hermano.]] His side is a disaster. My side is also a disaster. But a tidy disaster.", mood="happy", shot="close", gap=0.4)

confess("lola", "LOLA · Recap Parrot · Currently Sitting On The Wardrobe")
L("lola", "Recap. One. Furniture with its little word. [[La cama, el armario, el escritorio.]] Plurals add S or E S.", mood="teach", boardClear=True, board="1. [[la cama · el armario → armarios]]")
L("lola", "Two. Where is it? [[Encima de, debajo de, al lado de, delante de, detrás de.]]", mood="teach", board="2. [[encima de · debajo de · al lado de]]")
L("lola", "Three. [[De]] plus [[el]] becomes [[del]]. [[Encima del escritorio.]]", mood="teach", board="3. [[de + el = del]]")
L("lola", "Four. [[Hay]] means it exists, with [[un]] or [[una]]. [[Está]] or [[están]] says where, with [[el]] or [[la]].", mood="teach", board="4. [[hay un…]]  vs  [[el … está…]]")
L("lola", "Five. Colours agree, except [[naranja]] and [[rosa]]. And [[mi]] becomes [[mis]] in the plural.", mood="smug", board="5. [[roja · azules · mis gafas]]", gap=0.5)

scene("living", [("tara", 260), ("mum", 520), ("dad", 780), ("pablo", 1040)])
L("dad", "I've worked it out. [[Hay]] means there is. So hay fever means there is fever.", mood="smug", shot="close")
L("pablo", "That's not how it works.", mood="worried", shot="close")
L("dad", "[[Hay]] glasses. Where are the glasses? [[Están encima de mi cabeza.]]", mood="happy", shot="close")
L("tara", "Oh no. That was perfect.", mood="shock", shot="close")
L("mum", "Everybody stay calm. Don't make any sudden movements.", mood="worried", shot="close")
sfx("ding")
L("lola", "Remember this day, people. Write it on the wall. Under the poster.", mood="smug", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “The lamp is on the desk.”", "[[La lámpara está encima del escritorio]]", "location → [[está]];  [[de + el = del]]",
  "Question one. Say, the lamp is on the desk.",
  "[[La lámpara está encima del escritorio.]] Location, so [[está]]. And [[de]] plus [[el]] makes [[del]].")
challenge(2, "[[hay]] or [[está]]?  [[En mi dormitorio ___ una cama.]]", "[[hay]]", "[[una]] + thing that exists → [[hay]]",
  "Question two. In my bedroom, blank, a bed. Do you need [[hay]], or [[está]]?",
  "[[Hay.]] [[En mi dormitorio hay una cama.]] It's saying a bed exists, with [[una]]. So, [[hay]].")
challenge(3, "Translate: “the red curtains”", "[[las cortinas rojas]]", "feminine plural → [[rojas]]; colour goes after",
  "Question three. Translate. The red curtains.",
  "[[Las cortinas rojas.]] Feminine plural, so [[rojas]], after the noun. If you put the colour first, go and stand next to Dad.")
end_card()
