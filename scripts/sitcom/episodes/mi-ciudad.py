# "¡Qué Caos!" S01E10 "Lo Bueno, Lo Malo Y Lo Dad" (Topic: mi-ciudad — Describing My Town)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="mi-ciudad", logline="Señor García runs a 'describe your town' writing competition and Dad enters. Town adjectives that agree, lo bueno and lo malo, connectives and intensifiers, the extended-sentence formula, and three time frames.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)])
L("dad", "Señor García is running a writing competition. Describe your town. I've entered. Listen to this.", mood="smug", shot="close", prop="tablet")
L("dad", "Singapore. Is good. Very good-o. Is hot. The end.", mood="excited", shot="close", prop="tablet")
L("tara", "Five sentences, Dad. Two of them start with, is.", mood="deadpan", shot="close")
sfx("squawk")
poof("lola", 1080)
L("lola", "That's not a paragraph. That's a shopping list.", mood="eyeroll", shot="close")
L("dad", "But I have a brilliant title. [[Lo bueno, lo malo]], and lo Dad. The good, the bad, and the Dad. I'm the cool one.", mood="smug", shot="two")
freeze("\"LO DAD.\"", 2.4, narrator="Narrator: He is not the cool one.")
confess("mum", "ANJALI RAO · Mum · Will Do Anything For A Voucher")
L("mum", "The prize is a fifty dollar voucher for Uncle Hock's stall.", mood="smug")
L("mum", "I have entered. Tara has entered. Pablo has entered. This family is going to war.", mood="determined", gap=0.5)

title()

# ---------------- ACT 1: DESCRIBING A TOWN ----------------
scene("living", [("tara", 260), ("pablo", 560), ("lola", 900)])
L("pablo", "My entry is about Seville. [[Sevilla es una ciudad histórica y muy animada.]] Seville is a historic and very lively city.", mood="happy", shot="close", prop="tablet",
  boardClear=True, board="[[Sevilla es una ciudad histórica]]")
L("lola", "Town words. [[Histórica]], historic. [[Moderna]], modern. [[Turística]], touristy. [[Tranquila]], quiet. [[Ruidosa]], noisy. [[Limpia]], clean. [[Sucia]], dirty. [[Animada]], lively.", mood="teach", shot="close",
  board="[[histórica · moderna · tranquila]]")
L("lola", "[[La ciudad]] is feminine, so the adjective ends in A. But [[el pueblo]], a town, and [[el barrio]], a neighbourhood, are masculine. [[Una ciudad tranquila. Un pueblo tranquilo.]]", mood="teach", shot="close",
  board="[[una ciudad tranquila · un pueblo tranquilo]]")
L("tara", "And adjectives ending in E, or a consonant, don't change. [[Una ciudad grande. Un barrio industrial.]]", mood="deadpan", shot="close",
  board="[[grande · industrial]] don't change")
L("pablo", "Then where it is, and how big. [[Está situada en el sur de España.]] It's in the south of Spain. [[Tiene unos setecientos mil habitantes.]] It has about seven hundred thousand inhabitants.", mood="teach", shot="close",
  boardClear=True, board="[[Está situada en el sur de España]]")
L("lola", "Location, [[está]]. [[Situada]] agrees with [[la ciudad]]. And size is [[tiene]], plus a number, plus [[habitantes]].", mood="teach", shot="close",
  board="[[tiene]] + number + [[habitantes]]")

scene("living", [("mum", 260), ("dad", 560), ("lola", 900)])
L("mum", "My entry. [[Singapur es una ciudad moderna y muy limpia. Tiene casi seis millones de habitantes.]] Singapore is a modern, very clean city. It has almost six million people.", mood="happy", shot="close", boardClear=True,
  board="[[Singapur es una ciudad moderna]]")
L("dad", "And our part. Tampines es una barrio tranquila.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "[[Barrio]] ends in O. Masculine. [[Tampines es un barrio tranquilo.]] Tampines is a quiet neighbourhood.", mood="eyeroll", shot="close",
  board="✘ una barrio   ✔ [[un barrio tranquilo]]")
L("dad", "Quiet? Have you heard the coffee shop downstairs at seven in the morning?", mood="annoyed", shot="close")
L("mum", "Then, [[Tampines es un barrio bastante ruidoso.]] A fairly noisy neighbourhood. Happy?", mood="deadpan", shot="close",
  board="[[un barrio bastante ruidoso]]")

confess("dad", "VIKRAM RAO · Dad · Lifelong Singapore Expert")
L("dad", "I've lived in Singapore my whole life. I know everything about it.", mood="smug")
L("dad", "How many inhabitants? Lots. Next question.", mood="smug", gap=0.6)

# ---------------- ACT 2: LO BUENO, LO MALO & CONNECTIVES ----------------
card("LO BUENO Y LO MALO", "Research trip to Uncle Hock's. Purely academic.", 2.4)
scene("hawker", [("tara", 260), ("pablo", 520), ("dad", 780), ("uncle", 1000)], caption="HOCK'S HAWKER STALL · Research Trip")
L("pablo", "Now, the good and the bad. [[Lo bueno de mi ciudad es que hay muchos parques.]] The good thing about my city is that there are lots of parks.", mood="happy", shot="close", boardClear=True,
  board="[[Lo bueno de mi ciudad es que…]]")
L("lola", "[[Lo]], plus an adjective, means, the something thing. [[Lo bueno]], the good thing. [[Lo malo]], the bad thing. [[Lo mejor]], the best. [[Lo peor]], the worst.", mood="teach", shot="wide", offstage=True,
  board="[[lo bueno · lo malo · lo mejor · lo peor]]")
L("uncle", "Easy one. [[Lo mejor de Singapur es la comida.]] The best thing about Singapore is the food.", mood="happy", shot="close", prop="plate",
  board="[[Lo mejor de Singapur es la comida]]")
L("pablo", "And, [[lo peor de Sevilla es que en verano hace demasiado calor.]] The worst thing about Seville is that in summer it's too hot.", mood="worried", shot="close")
L("dad", "Lo malo of Singapore is muy tráfico.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Never [[muy]] with a noun. With a noun, use [[mucho]] or [[demasiado]], and they agree. [[Mucho tráfico. Mucha contaminación. Demasiados coches.]]", mood="annoyed", shot="wide", offstage=True,
  boardClear=True, board="✘ muy tráfico   ✔ [[mucho tráfico]]")
L("tara", "My favourite. [[No hay nada para los jóvenes.]] There's nothing for young people. Two negatives. In Spanish, that's correct.", mood="deadpan", shot="close",
  board="[[No hay nada para los jóvenes]]")
L("pablo", "And a wish, as one chunk. [[Me gustaría que hubiera una playa.]] I wish there was a beach. Don't change it. Just learn it.", mood="teach", shot="close",
  board="[[Me gustaría que hubiera…]] (chunk)")

scene("hawker", [("tara", 260), ("mum", 520), ("dad", 780), ("uncle", 1000)], caption="HOCK'S HAWKER STALL · Glue Time")
L("lola", "Now the glue that joins ideas. [[Y]], and. [[Pero]], but. [[También]], also. [[Además]], what's more. [[Sin embargo]], however.", mood="teach", shot="wide", offstage=True, boardClear=True,
  board="[[y · pero · también · además · sin embargo]]")
L("lola", "Reason. [[Porque]] and [[ya que]], because. Result. [[Por eso]] and [[así que]], so. And contrast, [[aunque]], although.", mood="teach", shot="wide", offstage=True,
  board="[[porque · ya que · por eso · aunque]]")
L("uncle", "[[Me gusta mi barrio aunque es un poco ruidoso.]] I like my neighbourhood, although it's a bit noisy.", mood="happy", shot="close")
L("dad", "That's because you shout, next, all day.", mood="deadpan", shot="close")
L("uncle", "That's not noise. That's business.", mood="smug", shot="close")
L("mum", "[[Hace mucho calor, así que voy al centro comercial.]] It's very hot, so I go to the shopping centre. For the air conditioning.", mood="smug", shot="close",
  board="[[…, así que voy al centro comercial]]")
L("tara", "Intensifiers go before adjectives, and never change. [[Muy, bastante, demasiado, un poco, tan, realmente.]] [[Una ciudad realmente bonita.]]", mood="neutral", shot="close",
  board="[[muy · bastante · tan · realmente]]")
L("lola", "And a trick. Before a word starting with an I sound, [[y]] becomes [[e]]. [[Moderna e histórica.]]", mood="smug", shot="wide", offstage=True,
  board="[[y]] → [[e]]: [[moderna e histórica]]")

confess("pablo", "PABLO RUIZ · 13 · Exchange Student · Homesick (A Bit)")
L("pablo", "Lo bueno of Singapore is that everything works. Lo malo is that nobody eats dinner at ten at night.", mood="happy")
L("pablo", "I go to Uncle Hock at ten. He says, you're very early for breakfast.", mood="worried", gap=0.5)

# ---------------- ACT 3: EXTENDED SENTENCES & THREE TIME FRAMES ----------------
card("THE NIGHT BEFORE THE DEADLINE", "Tara has a formula. Of course she does.", 2.4)
scene("bedroom", [("tara", 260), ("pablo", 560), ("mum", 860)])
poof("lola", 1080)
L("tara", "To win, you need extended sentences. There's a formula. Time phrase, verb, detail, opinion, reason, then a contrast.", mood="deadpan", shot="close", boardClear=True,
  board="time + verb + detail + opinion + reason")
L("lola", "Start tiny. [[Voy al parque.]] I go to the park.", mood="teach", shot="close",
  board="[[Voy al parque.]]")
L("tara", "Time phrase and detail. [[Los sábados voy al parque con mis amigos.]] On Saturdays I go to the park with my friends.", mood="neutral", shot="close",
  board="[[Los sábados voy al parque con mis amigos]]")
L("pablo", "Opinion and reason. [[Los sábados voy al parque con mis amigos porque es muy divertido.]] Because it's really fun.", mood="happy", shot="close",
  board="+ [[porque es muy divertido]]")
L("mum", "And the contrast. [[Aunque a veces hay demasiada gente.]] Although sometimes there are too many people.", mood="happy", shot="close",
  board="+ [[aunque a veces hay demasiada gente]]")
L("lola", "Three words became eighteen. That's not a sentence. That's a glow up.", mood="excited", shot="close", gap=0.3)

scene("bedroom", [("tara", 260), ("pablo", 560), ("mum", 860)])
poof("lola", 1080)
L("lola", "Top marks need three time frames. Past, present and future. Time phrases are your signposts.", mood="teach", shot="close", boardClear=True,
  board="past · present · future")
L("pablo", "Past. [[El fin de semana pasado fui a Chinatown con mi familia. Comí fideos con verduras.]] Last weekend I went to Chinatown with my family. I ate vegetable noodles.", mood="happy", shot="close",
  board="past: [[fui · visité · comí]]")
L("lola", "[[Fui]], I went. [[Visité]], I visited. [[Comí]], I ate. Regular ones need an accent on the end.", mood="teach", shot="close")
L("mum", "Present. [[Normalmente voy al mercado los domingos.]] Normally I go to the market on Sundays.", mood="smug", shot="close",
  board="present: [[normalmente voy…]]")
L("tara", "Future. [[El sábado que viene voy a visitar los Jardines de la Bahía.]] Next Saturday I'm going to visit Gardens by the Bay. [[Voy a]], plus the infinitive.", mood="neutral", shot="close",
  board="future: [[voy a]] + infinitive")
L("lola", "Then put an opinion in each tense. [[Fue genial.]] It was great. [[Es genial.]] It's great. [[Va a ser genial.]] It's going to be great.", mood="teach", shot="close",
  board="[[fue · es · va a ser genial]]")

confess("lola", "LOLA · Recap Parrot · Competition Judge (Self-Appointed)")
L("lola", "Recap. One. Adjectives agree with the town. [[Una ciudad moderna. Un pueblo tranquilo.]]", mood="teach", boardClear=True, board="1. [[una ciudad moderna · un pueblo tranquilo]]")
L("lola", "Two. [[Lo bueno es que hay muchos parques. Lo peor es que hay mucho tráfico.]]", mood="teach", board="2. [[lo bueno · lo peor es que…]]")
L("lola", "Three. Glue it. [[Porque, además, sin embargo, aunque, así que.]]", mood="teach", board="3. [[porque · además · aunque]]")
L("lola", "Four. Time, verb, detail, opinion, reason, contrast.", mood="teach", board="4. time + verb + detail + opinion…")
L("lola", "Five. Three time frames. [[Fui, voy, voy a ir.]] Past, present, future. Nobody say muy tráfico near me ever again.", mood="smug", board="5. [[fui · voy · voy a ir]]", gap=0.5)

scene("living", [("mum", 260), ("dad", 520), ("pablo", 780), ("teacher", 1040)], caption="THE RESULTS")
L("teacher", "The winner of the competition is Pablo! [[¡Enhorabuena!]] Congratulations!", mood="happy", shot="close", boardClear=True)
L("pablo", "[[¡Gracias!]] I'll share the voucher. Noodles for everybody.", mood="excited", shot="close")
L("teacher", "And a special prize, for the most connectives in one sentence. Mister Rao.", mood="thinking", shot="close")
L("dad", "Singapore good y pero también además sin embargo por eso hot.", mood="smug", shot="close")
L("teacher", "Six connectives. Zero verbs. A record.", mood="deadpan", shot="close")
L("dad", "Wait. Let me try one more. [[Lo mejor de mi ciudad es mi familia.]]", mood="happy", shot="close")
L("mum", "Oh. That's actually lovely.", mood="happy", shot="close")
L("lola", "Correct. And sweet. Lo bueno, lo malo, and lo Dad.", mood="smug", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "[[pueblo]] is masculine. Say “a quiet town”.", "[[un pueblo tranquilo]]", "[[el pueblo]] → masculine → [[tranquilo]]",
  "Question one. [[Pueblo]] is masculine. How do you say, a quiet town?",
  "[[Un pueblo tranquilo.]] Masculine, so [[tranquilo]], with an O.")
challenge(2, "[[muy]] or [[mucho]]?  “lots of traffic”", "[[mucho tráfico]]", "never [[muy]] + noun → [[mucho]] (agrees)",
  "Question two. Lots of traffic. Is it [[muy]], or [[mucho]]?",
  "[[Mucho tráfico.]] [[Muy]] never goes with a noun. With a noun, use [[mucho]], and make it agree.")
challenge(3, "Past, present or future?  [[El sábado que viene voy a visitar el museo.]]", "future", "[[el sábado que viene]] + [[voy a]] + infinitive",
  "Question three. Past, present, or future? [[El sábado que viene voy a visitar el museo.]]",
  "Future. [[El sábado que viene]] means next Saturday. And [[voy a visitar]] means, I'm going to visit.")
end_card()
