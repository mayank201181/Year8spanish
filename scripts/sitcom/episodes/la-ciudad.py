# "¡Qué Caos!" S01E09 "Todo Recto To Nowhere" (Topic: la-ciudad — Places In Town)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="la-ciudad", logline="Pablo must reach the library using only Spanish directions, and Dad insists on navigating. Places in town, hay, asking the way, left and right, location and distance, and se puede.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("dad", "Family outing! Pablo has homework on directions. So today, I am the navigator.", mood="smug", shot="close", prop="map")
L("tara", "Dad. You got lost in the car park last week. Our car park.", mood="deadpan", shot="close")
L("dad", "That was before I learnt the most important Spanish direction. [[Todo recto.]] It means, totally correct. Like me.", mood="smug", shot="two", prop="map")
sfx("squawk")
poof("lola", 1080)
L("lola", "[[Todo recto]] means straight on. It does not mean totally correct. And neither are you.", mood="annoyed", shot="close")
L("dad", "Then why does the sat nav keep saying it to me?", mood="thinking", shot="close")
L("tara", "Because it's the only instruction you follow. You drove straight past our exit. Three times.", mood="deadpan", shot="close", gap=0.4)
freeze("\"TOTALLY CORRECT-O.\"", 2.4, narrator="Narrator: The sat nav has asked to be reassigned.")
confess("tara", "TARA RAO · 12 · Knows Where The Exit Is")
L("tara", "Pablo's mission. Get to the library using only Spanish directions.", mood="deadpan")
L("tara", "Dad is coming too. So I've packed snacks, water, and a torch.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: PLACES IN TOWN & HAY ----------------
scene("classroom", [("teacher", 300), ("pablo", 600), ("tara", 900)], caption="SEÑOR GARCÍA'S CLASSROOM · Mission Briefing")
L("teacher", "[[¡Buenos días!]] Places in town. Some look like English. [[El museo, el hospital, el teatro, el estadio.]]", mood="happy", shot="close",
  boardClear=True, board="[[el museo · el hospital · el teatro]]")
L("teacher", "Now the ones to learn. [[El ayuntamiento]], the town hall. [[La biblioteca]], the library. [[El polideportivo]], the sports centre. [[La piscina]], the swimming pool.", mood="teach", shot="close",
  board="[[el ayuntamiento · la biblioteca]]")
L("pablo", "And [[el centro comercial]], the shopping centre. [[El mercado]], the market. [[La estación de tren]], the train station. [[La plaza mayor]], the main square.", mood="happy", shot="close",
  board="[[el centro comercial · la plaza mayor]]")
L("teacher", "Learn each place with [[el]] or [[la]]. Ends in O, usually masculine. Ends in A, usually feminine. And words like [[estación]] are always feminine.", mood="teach", shot="close",
  board="-o [[el]] · -a [[la]] · [[-ción]] → [[la]]")
sfx("squawk")
poof("lola", 1100)
L("lola", "And one trap. [[La librería]] is NOT the library. It's the bookshop. The library is [[la biblioteca]].", mood="teach", shot="close",
  board="[[la librería]] = bookshop!")

scene("classroom", [("teacher", 260), ("dad", 560), ("pablo", 840)], caption="SEÑOR GARCÍA'S CLASSROOM · Parent Helper")
L("dad", "I'm the parent helper. Singapore has many malls. Hay muchos malls-o.", mood="smug", shot="close", boardClear=True)
sfx("buzzer")
L("teacher", "Nearly. [[Hay muchos centros comerciales.]] There are lots of shopping centres. [[Hay]] never changes. There is, or there are.", mood="teach", shot="close",
  board="[[Hay muchos centros comerciales]]")
L("teacher", "The word after it changes. [[Hay un museo. Hay una piscina. Hay unos parques. Hay muchas tiendas.]]", mood="teach", shot="close",
  board="[[hay un · una · unos · muchas]]")
L("pablo", "In Seville, [[hay una catedral enorme.]] There's an enormous cathedral. And orange trees everywhere.", mood="happy", shot="close")
L("teacher", "Negative. With [[no hay]], the [[un]] disappears. [[En mi barrio no hay castillo.]] In my neighbourhood there isn't a castle.", mood="teach", shot="close",
  board="[[No hay castillo]] (no [[un]]!)")
L("dad", "There's no castle in Tampines? I'm writing to the council.", mood="shock", shot="close")
L("pablo", "And to ask, [[¿Hay un banco por aquí?]] Is there a bank round here? Answer, [[sí, hay uno.]] Yes, there's one.", mood="neutral", shot="close",
  board="[[¿Hay un banco por aquí?]] [[Sí, hay uno.]]")

confess("dad", "VIKRAM RAO · Dad · Navigator · Self-Appointed")
L("dad", "I have a perfect sense of direction.", mood="smug")
L("dad", "Right now, for example, I'm in a little room, talking to a camera. Nailed it.", mood="happy", gap=0.6)

# ---------------- ACT 2: ASKING THE WAY & DIRECTIONS ----------------
card("THE MISSION", "Destination: the library. Navigator: Dad. Hope: low.", 2.4)
scene("park", [("tara", 260), ("pablo", 560), ("dad", 860)], caption="THE VOID DECK · Mission Start")
poof("lola", 1100)
L("pablo", "[[Perdone, ¿por dónde se va a la biblioteca?]] Excuse me, how do I get to the library?", mood="happy", shot="close", boardClear=True,
  board="[[¿Por dónde se va a la…?]]")
L("lola", "[[Perdone]] for a grown-up stranger. [[Perdona]] for a friend. Masculine place? [[A]] plus [[el]] squash into [[al]]. [[¿Por dónde se va al museo?]]", mood="teach", shot="close",
  board="[[a + el = al]] → [[al museo]]")
L("pablo", "Now the answers. [[Sigue todo recto.]] Go straight on. [[Gira a la derecha.]] Turn right. [[Gira a la izquierda.]] Turn left.", mood="teach", shot="close",
  board="[[sigue todo recto]] = straight on")
L("tara", "[[Toma la primera calle.]] Take the first street. [[La segunda]], the second. [[La tercera]], the third. [[Calle]] is feminine, so they end in A.", mood="neutral", shot="close",
  board="[[la primera · segunda · tercera calle]]")
L("lola", "[[Cruza la plaza.]] Cross the square. [[Al final de la calle]], at the end of the street. And [[hasta]] means, as far as.", mood="teach", shot="close",
  board="[[cruza la plaza]] · [[hasta]] = as far as")

scene("park", [("tara", 260), ("pablo", 560), ("dad", 860)], caption="THE VOID DECK · Three Minutes Later")
L("dad", "Give me the first instruction, and stand back.", mood="determined", shot="close", prop="map", boardClear=True)
L("pablo", "[[Sigue todo recto hasta el parque y gira a la izquierda.]] Go straight on as far as the park, and turn left.", mood="happy", shot="close",
  board="[[gira a la izquierda]] = turn left")
L("dad", "Left. Easy.", mood="smug", shot="close", prop="map")
sfx("whoosh")
L("tara", "Dad. You turned right. That's the bin centre.", mood="deadpan", shot="close")
L("dad", "I turned left on the map!", mood="shock", shot="close", prop="map")
L("lola", "Your map is upside down. Left and right always mean the walker's left and right. YOUR left.", mood="eyeroll", shot="wide", offstage=True,
  board="left / right = the WALKER'S left / right")
L("tara", "Hold up both hands. The hand that makes a proper letter L is your left. [[Izquierda.]]", mood="deadpan", shot="close")
L("dad", "Oh. It's this one. It's been this one my whole life.", mood="shock", shot="close", gap=0.4)

scene("park", [("mum", 260), ("pablo", 560), ("dad", 860)], caption="THE VOID DECK · Take Two")
poof("lola", 1100)
L("mum", "Do strangers say [[sigue]] to me too?", mood="thinking", shot="close", boardClear=True)
L("lola", "No. To a grown-up, they're polite. That's [[usted]]. [[Sigue]] becomes [[siga]]. [[Toma]] becomes [[tome]]. [[Gira]] becomes [[gire]].", mood="teach", shot="close",
  board="tú [[sigue · toma]] → usted [[siga · tome]]")
L("mum", "So, [[siga todo recto y tome la segunda calle a la derecha.]] Go straight on and take the second street on the right.", mood="happy", shot="close",
  board="[[Siga todo recto y tome…]] ✔")
L("pablo", "Perfect! And, [[gira a la derecha en el primer semáforo.]] Turn right at the first traffic lights. Before a masculine noun, [[primero]] loses its O.", mood="teach", shot="close",
  board="[[el primer semáforo]] · [[la primera calle]]")
L("dad", "My turn. Sigue todo recto, then derecha-o, then hasta la vista, baby.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "[[Hasta]] means as far as. [[Hasta la vista]] means see you later. Nobody is going as far as the view.", mood="eyeroll", shot="close", gap=0.4)

confess("pablo", "PABLO RUIZ · 13 · Exchange Student · From Seville")
L("pablo", "In Seville, ask for directions and you get five different routes. All of them go past a café.", mood="happy")
L("pablo", "You never reach the place. But it's a very nice afternoon.", mood="happy", gap=0.5)

# ---------------- ACT 3: WHERE IS IT? DISTANCE & SE PUEDE ----------------
card("FORTY MINUTES LATER", "Still no library. Plenty of Dad.", 2.4)
scene("hawker", [("tara", 260), ("pablo", 520), ("dad", 780), ("uncle", 1000)], caption="HOCK'S HAWKER STALL · Definitely Not The Library")
L("uncle", "Lost, ah? [[La biblioteca está muy cerca. Está a cinco minutos a pie.]]", mood="happy", shot="close", boardClear=True,
  board="[[Está a cinco minutos a pie]]")
L("tara", "Location uses [[está]], never [[es]]. And distance needs [[a]]. [[A cinco minutos a pie.]] [[A diez minutos en autobús.]]", mood="deadpan", shot="close",
  board="[[a diez minutos en autobús]]")
L("uncle", "[[La biblioteca está enfrente del centro comercial.]] Opposite the shopping centre. My stall is [[en la esquina, entre el banco y la frutería.]] On the corner, between the bank and the fruit shop.", mood="teach", shot="close",
  board="[[enfrente del centro comercial]]")
sfx("squawk")
L("lola", "[[Del]], because [[de]] plus [[el]] makes [[del]]. And [[entre]], between, needs no [[de]] at all.", mood="excited", shot="wide", offstage=True,
  board="[[de + el = del]] · [[entre … y …]]")
L("dad", "So the library is near the bank. Está cerca de el banco.", mood="thinking", shot="close")
sfx("buzzer")
L("tara", "[[Cerca del banco.]] With [[la]], nothing happens. [[Cerca de la iglesia.]]", mood="deadpan", shot="close", gap=0.3)

scene("hawker", [("mum", 260), ("pablo", 520), ("dad", 780), ("uncle", 1000)], caption="HOCK'S HAWKER STALL · Snack Break")
L("pablo", "What can you do in town? [[Se puede]], plus the infinitive. [[Aquí se puede comer muy bien.]] Here you can eat really well.", mood="happy", shot="close", boardClear=True,
  board="[[se puede]] + infinitive")
L("uncle", "Correct! Try my vegetable noodles. [[Fideos con verduras.]]", mood="happy", shot="close", prop="plate")
L("mum", "[[En mi ciudad se puede ir de compras y se puede nadar.]] In my town you can go shopping and you can swim.", mood="happy", shot="close",
  board="[[se puede nadar · ir de compras]]")
L("dad", "In the library, se puede eating.", mood="smug", shot="close", prop="plate")
sfx("buzzer")
L("lola", "After [[se puede]], the infinitive. [[Comer]], not eating. And in the library, [[no se puede comer.]] You can't eat. Put the noodles down.", mood="annoyed", shot="wide", offstage=True,
  board="[[no se puede comer]]")
L("mum", "[[En Tampines hay un polideportivo donde se puede nadar.]] There's a sports centre where you can swim.", mood="determined", shot="close",
  board="[[Hay un… donde se puede…]]")

confess("lola", "LOLA · Recap Parrot · Knows The Way. Always.")
L("lola", "Recap. One. Learn places with [[el]] or [[la]]. [[La biblioteca]] is the library.", mood="teach", boardClear=True, board="1. [[el polideportivo · la biblioteca]]")
L("lola", "Two. [[Hay]] never changes. [[Hay un parque. No hay castillo.]]", mood="teach", board="2. [[Hay un parque · No hay castillo]]")
L("lola", "Three. [[Sigue todo recto, gira a la derecha, toma la primera calle.]] Your left, not the map's.", mood="teach", board="3. [[sigue todo recto · gira a la…]]")
L("lola", "Four. Location uses [[está]]. [[Está a cinco minutos a pie.]]", mood="teach", board="4. [[Está a cinco minutos a pie]]")
L("lola", "Five. [[Se puede]], plus the infinitive. [[Se puede nadar.]] Now somebody carry me.", mood="smug", board="5. [[se puede]] + infinitive", gap=0.5)

scene("hawker", [("tara", 260), ("pablo", 520), ("dad", 780), ("uncle", 1000)], caption="HOCK'S HAWKER STALL · Final Approach")
L("dad", "I've got it now. Follow me. [[Gira a la derecha. Gira a la derecha. Gira a la derecha. Gira a la derecha.]]", mood="determined", shot="close", boardClear=True)
sfx("whoosh")
L("tara", "Dad. Right, right, right, right. That's a square. We're back where we started.", mood="deadpan", shot="close")
L("uncle", "[[¡Hola otra vez!]] Hello again!", mood="happy", shot="close")
L("lola", "Perfect Spanish. Totally useless. [[Todo recto]] to nowhere.", mood="eyeroll", shot="wide", offstage=True)
L("pablo", "Dad. [[Todo recto.]] The library is just there. Opposite the shopping centre.", mood="happy", shot="close")
L("dad", "Straight on. Totally correct. Like I said this morning.", mood="smug", shot="close", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Tell a friend: “Turn left.”", "[[Gira a la izquierda]]", "tú command [[gira]] (or [[tuerce]]);  left = [[izquierda]]",
  "Question one. Tell a friend, turn left.",
  "[[Gira a la izquierda.]] Left is [[izquierda]]. Not sure which hand? Make the letter L.")
challenge(2, "[[al]] or [[a la]]?  [[¿Por dónde se va ___ museo?]]", "[[al museo]]", "[[museo]] is masculine → [[a + el = al]]",
  "Question two. You want the museum, [[el museo]]. Do you need [[al]], or [[a la]]?",
  "[[Al.]] [[¿Por dónde se va al museo?]] [[A]] plus [[el]] always squash into [[al]].")
challenge(3, "Translate: “In my town you can swim.”", "[[En mi ciudad se puede nadar]]", "[[se puede]] + infinitive ([[nadar]])",
  "Question three. Translate. In my town, you can swim.",
  "[[En mi ciudad se puede nadar.]] [[Se puede]], plus the infinitive. Not swimming-o. Looking at you, Dad.")
end_card()
