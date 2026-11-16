# "¡Qué Caos!" S01E08 "Muy Calor" (Topic: el-tiempo — The Weather)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="el-tiempo", logline="Dad melts on the walk to the MRT and declares it muy calor. Weather with hace, verbs, está and hay, mucho versus muy, seasons and climate, the weather map of Spain, cuando and si, the near future and yesterday's weather.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("pablo", 620)])
L("tara", "Dad decided to walk to the MRT today. Instead of taking the bus.", mood="deadpan", shot="close")
L("pablo", "Is that dangerous?", mood="worried", shot="close")
L("tara", "In Singapore? At noon? Yes.", mood="deadpan", shot="two")
sfx("door")
scene("living", [("tara", 260), ("pablo", 520), ("dad", 820)])
L("dad", "Five minutes. Five minutes, and I am melting. Muy calor! Muy, muy calor!", mood="shock", shot="close")
sfx("squawk")
poof("lola", 1080)
L("lola", "[[Calor]] is a noun. It means heat. You can't say, very heat. [[Hace mucho calor.]] It's very hot. Literally, it makes a lot of heat.", mood="annoyed", shot="close")
L("dad", "And I am very hot too. Estoy calor.", mood="sad", shot="close")
L("tara", "For a person, it's [[tengo calor]]. I feel hot. Literally, I have heat.", mood="deadpan", shot="close")
L("dad", "I have heat. That's the most Singapore sentence ever.", mood="happy", shot="close", gap=0.3)
freeze("\"MUY CALOR!\"", 2.4, narrator="Narrator: It was the coolest day of the month.")
confess("pablo", "PABLO RUIZ · 13 · Misses Winter")
L("pablo", "In Seville, in summer, it's forty degrees. But it's dry. Here, it's thirty two, and the air is soup.", mood="worried")
L("pablo", "I asked Tara when winter starts. She said, when you walk into the shopping mall.", mood="sad", gap=0.5)
confess("lola", "LOLA · Parrot · Built For Seville, Not For Humidity")
L("lola", "Today, the weather. Rule one. Muy calor is not Spanish. It's a cry for help.", mood="smug", gap=0.5)

title()

# ---------------- ACT 1: WEATHER EXPRESSIONS ----------------
scene("living", [("tara", 260), ("mum", 520), ("pablo", 780), ("lola", 1040)])
L("mum", "Let's start properly. How do I ask, what's the weather like?", mood="thinking", shot="close", boardClear=True)
L("lola", "[[¿Qué tiempo hace?]] What's the weather like? Most answers use [[hace]]. [[Hace calor]], it's hot. [[Hace frío]], it's cold. [[Hace sol]], it's sunny. [[Hace viento]], it's windy.", mood="teach", shot="close",
  board="[[¿Qué tiempo hace?]] → [[hace calor]]")
L("pablo", "[[Hace buen tiempo]], the weather is nice. [[Hace mal tiempo]], the weather is bad. And [[hace fresco]], it's cool. Here, that only happens inside the fridge.", mood="happy", shot="close",
  board="[[hace buen tiempo · hace mal tiempo]]")
sfx("whoosh")
L("tara", "Oh look. Four o'clock. Right on time.", mood="deadpan", shot="close", prop="umbrella")
L("tara", "Some weather has its own verb. [[Llueve]], it's raining. [[Truena]], it's thundering. [[Nieva]], it's snowing. Which, in Singapore, is a fantasy.", mood="deadpan", shot="close", prop="umbrella",
  board="[[llueve · truena · nieva]]")
L("lola", "The sky uses [[está]]. [[Está nublado]], it's cloudy. [[Está despejado]], it's clear. And some take [[hay]]. [[Hay tormenta]], there's a storm. [[Hay niebla]], it's foggy.", mood="teach", shot="close",
  board="[[está nublado · hay tormenta]]")
L("mum", "So, very hot is [[hace mucho calor]], because [[calor]] is a noun.", mood="happy", shot="close",
  boardClear=True, board="✘ muy calor   ✔ [[hace mucho calor]]")
L("lola", "Exactly. Nouns take [[mucho]]. [[Hace mucho frío. Hace mucho viento.]] But [[muy]] goes with adjectives. [[Está muy nublado.]]", mood="teach", shot="close",
  board="[[mucho calor]] · [[muy nublado]]")
L("pablo", "And after a weather verb, [[mucho]] means a lot. [[Llueve mucho.]] It rains a lot. Here, every day at four o'clock.", mood="happy", shot="close", gap=0.3,
  board="[[llueve mucho]] = it rains a lot")

confess("dad", "VIKRAM RAO · Dad · Weather Enthusiast")
L("dad", "Every morning, I check the weather app. It always says the same thing. Thirty two degrees. Chance of thunderstorms.", mood="neutral", prop="phone")
L("dad", "I check it anyway. In case one day it says snow.", mood="sad", prop="phone", gap=0.6)

# ---------------- ACT 2: SEASONS, MONTHS & CLIMATE ----------------
card("FOUR SEASONS", "In Singapore: hot, and hot and wet.", 2.4)
scene("bedroom", [("tara", 300), ("pablo", 600), ("lola", 920)])
L("pablo", "In Spain we have four seasons. [[La primavera]], spring. [[El verano]], summer. [[El otoño]], autumn. [[El invierno]], winter.", mood="happy", shot="close",
  boardClear=True, board="[[primavera · verano · otoño · invierno]]")
L("lola", "In summer is just [[en verano]]. [[En verano hace calor. En invierno hace frío.]]", mood="teach", shot="close",
  board="[[En verano hace calor]]")
L("tara", "The months. [[Enero, febrero, marzo, abril, mayo, junio, julio, agosto, septiembre, octubre, noviembre, diciembre.]] And no capital letters.", mood="neutral", shot="close",
  board="[[enero, febrero…]] (no capitals!)")
L("pablo", "[[En Sevilla hace mucho calor en julio y agosto. Casi nunca nieva.]] In Seville it's very hot in July and August. It hardly ever snows.", mood="happy", shot="close",
  board="[[casi nunca nieva]] = hardly ever snows")
L("lola", "The usual weather of a place is [[el clima]], the climate. [[El tiempo]] is the weather right now. For climate, add [[siempre]], always, or [[normalmente]], normally.", mood="teach", shot="close",
  board="[[el clima]] vs [[el tiempo]]")
L("tara", "So. [[En Singapur siempre hace calor y llueve mucho, sobre todo en diciembre.]] In Singapore it's always hot and it rains a lot, especially in December.", mood="deadpan", shot="close",
  boardClear=True, board="[[En Singapur siempre hace calor]]")
L("pablo", "So when is winter here?", mood="worried", shot="close")
L("tara", "[[No hay cuatro estaciones.]] There aren't four seasons. Winter is the shopping mall. The air con is set to eighteen.", mood="deadpan", shot="close",
  board="[[No hay cuatro estaciones]]")
L("lola", "I'm a parrot from Seville. Eighteen degrees is my natural enemy.", mood="annoyed", shot="close", gap=0.4)

# ---------------- ACT 3: THE WEATHER MAP ----------------
card("EL MAPA DEL TIEMPO", "Señor García has a map. And a pointer.", 2.4)
scene("classroom", [("teacher", 300), ("tara", 620), ("pablo", 900)])
L("teacher", "Today, the weather map of Spain. First, directions. [[El norte, el sur, el este, el oeste, el centro.]]", mood="teach", shot="close", prop="map",
  boardClear=True, board="[[norte · sur · este · oeste · centro]]")
L("tara", "So west is [[oeste]]. On a Spanish compass, W is O.", mood="thinking", shot="close",
  board="W = O ([[oeste]])")
L("teacher", "Correct. They're all masculine. [[En el norte de España]], in the north of Spain. [[El noreste]], the north east. [[El suroeste]], the south west.", mood="teach", shot="close", prop="map",
  board="[[en el norte de España · el noreste]]")
L("pablo", "Cities use [[está]]. [[Bilbao está en el norte. Madrid está en el centro. Valencia está en el este. Sevilla está en el sur.]] The best part.", mood="happy", shot="close",
  board="[[Sevilla está en el sur]]")
L("teacher", "Temperatures. [[La temperatura máxima es de treinta grados.]] The highest temperature is thirty degrees. Or simply, [[hace treinta grados]].", mood="teach", shot="close", prop="map",
  board="[[La temperatura máxima es de 30 grados]]")
L("tara", "And twenty one shortens before [[grados]]. [[Veintiún grados.]] Below zero is [[bajo cero]].", mood="neutral", shot="close",
  boardClear=True, board="[[veintiún grados · dos grados bajo cero]]")
poof("lola", 1100)
L("lola", "Now a forecast. Pablo. The south. Go.", mood="smug", shot="close")
L("pablo", "[[En el sur hace sol y hace mucho calor. En Sevilla hace cuarenta grados.]] In the south it's sunny and very hot. In Seville it's forty degrees.", mood="excited", shot="close",
  board="[[En el sur hace sol…]]")
L("teacher", "[[¡Perfecto!]] And Bilbao?", mood="happy", shot="close", prop="map")
L("pablo", "[[En el norte llueve.]] In the north it rains. Sorry, Bilbao. It always rains.", mood="worried", shot="close",
  board="[[En el norte llueve]]", gap=0.3)

# ---------------- ACT 4: CUANDO, SI, FUTURE & PAST ----------------
card("THE SIX O'CLOCK FORECAST", "With your weatherman, Vikram Rao", 2.4)
scene("living", [("tara", 240), ("mum", 460), ("dad", 680), ("pablo", 900)])
L("dad", "Good evening. I'm Vikram, your weatherman. Tomorrow, in the north-o, hace rain-o.", mood="smug", shot="close", prop="map", boardClear=True)
sfx("buzzer")
poof("lola", 1100)
L("lola", "Rain is a verb. [[Llueve.]] And tomorrow is the future. [[Mañana va a llover.]] Tomorrow it's going to rain.", mood="eyeroll", shot="close",
  board="[[Mañana va a llover]]")
L("lola", "[[Va a]] plus the infinitive. [[Va a hacer sol. Va a hacer calor.]] Always [[va]], never [[van]].", mood="teach", shot="close",
  board="[[va a hacer sol · va a llover]]")
L("mum", "Habits use [[cuando]], when. [[Cuando llueve, veo la tele en casa.]] When it rains, I watch TV at home.", mood="happy", shot="close",
  board="[[Cuando llueve, veo la tele]]")
L("pablo", "[[Cuando hace sol, voy a la playa.]] When it's sunny, I go to the beach.", mood="happy", shot="close",
  board="[[Cuando hace sol, voy a la playa]]")
L("tara", "And plans use [[si]], if. [[Si hace buen tiempo, voy a montar en bici.]] If the weather's nice, I'm going to ride my bike. [[Si llueve, voy a leer.]]", mood="neutral", shot="close",
  boardClear=True, board="[[Si hace buen tiempo, voy a…]]")
L("dad", "And yesterday? Yesterday was muy calor.", mood="smug", shot="close")
L("lola", "Past tense. [[Hace]] becomes [[hizo]]. [[Ayer hizo mucho calor.]] Yesterday it was very hot.", mood="teach", shot="close",
  board="[[hace → hizo]]")
L("tara", "[[Llueve]] becomes [[llovió]]. [[Nieva]] becomes [[nevó]]. Those have accents. [[Está nublado]] becomes [[estuvo nublado]]. [[Hay tormenta]] becomes [[hubo tormenta]]. No accents.", mood="neutral", shot="close",
  board="[[llovió · nevó · estuvo · hubo]]")
L("pablo", "So, three time frames. [[Ayer llovió. Hoy hace sol. Mañana va a hacer calor.]] Yesterday it rained. Today it's sunny. Tomorrow it's going to be hot.", mood="happy", shot="close",
  board="[[ayer llovió · hoy hace sol · mañana va a…]]")
L("lola", "The time phrase is your signpost. [[Ayer]], past. [[Hoy]], present. [[Mañana]], future.", mood="teach", shot="close", gap=0.3)

confess("lola", "LOLA · Recap Parrot · Currently Sitting In Front Of The Fan")
L("lola", "Recap. One. [[¿Qué tiempo hace?]] [[Hace calor. Hace sol. Llueve. Está nublado.]]", mood="teach", boardClear=True, board="1. [[hace calor · llueve · está nublado]]")
L("lola", "Two. [[Calor]] is a noun. So, [[hace mucho calor]]. Never muy calor.", mood="teach", board="2. [[hace mucho calor]] (not muy!)")
L("lola", "Three. [[En verano. En el norte de España.]] And no capitals on months.", mood="teach", board="3. [[en verano · en el norte · julio]]")
L("lola", "Four. [[Cuando llueve, veo la tele.]] And the future, [[mañana va a llover]].", mood="teach", board="4. [[cuando llueve… · va a llover]]")
L("lola", "Five. The past. [[Ayer hizo calor. Ayer llovió.]] Now somebody move the fan closer.", mood="smug", board="5. [[ayer hizo calor · llovió]]", gap=0.5)

scene("park", [("tara", 260), ("mum", 520), ("dad", 780), ("pablo", 1040)], caption="THE VOID DECK · Three Fifty-Nine p.m.")
L("pablo", "Vikram. Give us a Singapore forecast. In Spanish.", mood="happy", shot="close")
L("dad", "[[Ayer hizo mucho calor. Hoy hace mucho calor. Mañana va a hacer mucho calor.]]", mood="smug", shot="close")
L("tara", "That's perfect. And the most accurate forecast in history.", mood="shock", shot="close")
L("mum", "No muy! He said [[mucho]]!", mood="excited", shot="close")
L("dad", "I'm a professional now. And yes, [[tengo calor]].", mood="happy", shot="close")
sfx("whoosh")
L("tara", "Four o'clock.", mood="deadpan", shot="close", prop="umbrella")
L("lola", "[[¡Llueve! ¡Hay tormenta!]] Everybody under the void deck!", mood="shock", shot="wide", offstage=True)
L("dad", "Muy wet!", mood="happy", shot="close")
sfx("trombone")
L("lola", "So close.", mood="bored", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “It's very hot.” in Spanish.", "[[Hace mucho calor]]", "[[calor]] is a noun → [[mucho]], not [[muy]]",
  "Question one. How do you say, it's very hot?",
  "[[Hace mucho calor.]] [[Calor]] is a noun, so it takes [[mucho]]. If you said muy, go and stand next to Dad. He's under the fan.")
challenge(2, "Translate: “Tomorrow it's going to rain.”", "[[Mañana va a llover]]", "[[va a]] + infinitive [[llover]]",
  "Question two. Translate. Tomorrow it's going to rain.",
  "[[Mañana va a llover.]] [[Va a]], plus the infinitive, [[llover]]. In Singapore, you'll be right every time.")
challenge(3, "Translate: “Yesterday it was sunny.”", "[[Ayer hizo sol]]", "past: [[hace]] → [[hizo]] (no accent)",
  "Question three. Translate. Yesterday it was sunny.",
  "[[Ayer hizo sol.]] [[Hace]] becomes [[hizo]] in the past. No accent. Unlike Dad, who has a very strong accent.")
end_card()
