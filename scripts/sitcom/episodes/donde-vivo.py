# "¡Qué Caos!" S01E04 "Más O Menos" (Topic: donde-vivo — Opinions About Where People Live)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="donde-vivo", logline="Pablo's class in Seville wants a video: do you like living in Singapore? Opinions with me gusta and me gustan, reasons with porque, what other people think, comparisons with más and menos, and where we're going to live.")

# ---------------- COLD OPEN ----------------
scene("hawker", [("dad", 260), ("pablo", 520), ("uncle", 1000)], caption="HAWKER CENTRE · Tampines · Lunchtime")
L("pablo", "My class in Seville wants a video. The question is, [[¿te gusta vivir en Singapur?]] Do you like living in Singapore?", mood="happy", shot="close", prop="phone")
L("dad", "Give me that. I'll answer. Hola, Seville! Me gusto Singapore very much-o!", mood="excited", shot="close")
sfx("squawk")
poof("lola", 760)
L("lola", "[[Me gusto]] means, I like myself.", mood="eyeroll", shot="close")
L("dad", "Well. That's also true.", mood="smug", shot="close")
L("lola", "You mean, [[me gusta vivir en Singapur.]] I like living in Singapore.", mood="teach", shot="close")
L("pablo", "Uncle Hock, [[¿te gusta vivir aquí?]] Do you like living here?", mood="happy", shot="two")
L("uncle", "Since nineteen eighty-seven I'm at this stall. Do I like it? My Spanish answer is, [[más o menos.]]", mood="smug", shot="close")
L("pablo", "More or less! You speak Spanish!", mood="excited", shot="close")
L("uncle", "Three words. That's my limit.", mood="neutral", shot="close")
L("dad", "Más o menos. Brilliant. I'm going to use that for everything.", mood="smug", shot="close", gap=0.3)
freeze("\"ME GUSTO!\"", 2.4, narrator="Narrator: He did use it for everything.")
confess("tara", "TARA RAO · 12 · Opinions: Strictly Private")
L("tara", "Pablo asked me if I like living in Tampines. I said, it's fine.", mood="deadpan")
L("tara", "He said, that's not an opinion, that's a shrug. In Spain you need an opinion. About everything. Loudly.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: OPINIONS ----------------
scene("living", [("tara", 260), ("pablo", 560), ("lola", 900)])
L("pablo", "So, Tara. [[¿Te gusta vivir en Tampines?]]", mood="happy", shot="close", boardClear=True,
  board="[[¿Te gusta vivir…?]] = Do you like living…?")
L("tara", "It's fine.", mood="deadpan", shot="close")
L("lola", "That's a shrug. Here's a scale. [[Me encanta]], I love. [[Me gusta]], I like. [[No me gusta]], I don't like. [[No me gusta nada]], I don't like it at all. [[Odio]], I hate.", mood="teach", shot="close",
  board="[[me encanta > me gusta > no me gusta]]")
L("pablo", "And right at the top, [[me chifla]]. I'm crazy about it. Very Spanish. [[¡Me chifla Sevilla!]]", mood="excited", shot="close",
  board="[[me chifla]] = I'm crazy about")
L("tara", "Fine. [[Me gusta vivir aquí.]] I like living here. After [[me gusta]] you can put a verb, like [[vivir]].", mood="deadpan", shot="close",
  board="[[me gusta]] + [[vivir]] ✔")
L("lola", "Or a noun. One thing, [[gusta]]. [[Me gusta mi barrio.]] I like my neighbourhood. More than one thing, [[gustan]]. [[Me gustan los parques.]] I like the parks.", mood="teach", shot="close",
  boardClear=True, board="[[me gusta mi barrio · me gustan los parques]]")
L("lola", "[[Gustar]] really means, to please. The parks please me.", mood="teach", shot="close")
poof("dad", 1100)
L("dad", "Easy. Me gusta the noodles. All the noodles.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Noodles are plural. [[Me gustan los fideos.]] Plural thing, plural verb.", mood="eyeroll", shot="close",
  board="✘ me gusta los fideos  ✔ [[me gustan]]", gap=0.3)

scene("living", [("mum", 260), ("tara", 560), ("lola", 900)])
L("mum", "What about [[odio]] and [[prefiero]]? I hate, and I prefer.", mood="thinking", shot="close", boardClear=True)
L("lola", "Normal verbs. No [[gusta]] business. [[Odio el ruido.]] I hate noise. [[Prefiero vivir en la costa.]] I prefer living on the coast.", mood="teach", shot="close",
  board="[[odio el ruido · prefiero la costa]]")
L("tara", "To sound clever, start with [[pienso que]], I think that. [[Creo que]], I believe that. [[En mi opinión]], in my opinion. [[Para mí]], for me.", mood="neutral", shot="close",
  board="[[pienso que · creo que · para mí]]")
L("lola", "Unlike English, you can never drop the [[que]]. [[Pienso que es bonito.]]", mood="teach", shot="close",
  board="[[Pienso que es bonito]] (keep [[que]]!)")
L("mum", "[[Para mí, mi barrio es ideal.]] For me, my neighbourhood is ideal.", mood="happy", shot="close",
  board="[[Para mí, mi barrio es ideal]] ✔", gap=0.3)

# ---------------- ACT 2: REASONS & OTHER PEOPLE ----------------
card("THE VOID DECK", "Where opinions go to be justified", 2.4)
scene("park", [("tara", 260), ("pablo", 560), ("lola", 900)])
L("lola", "An opinion alone is thin. Give a reason. [[Porque]], because. Or [[ya que]], since. Then one of four little verbs.", mood="teach", shot="close",
  boardClear=True, board="[[porque · ya que]] = because · since")
L("lola", "[[Es]], for what it's like. [[Hay]], for what there is. [[Tiene]], for what it has. [[Está]], for where it is.", mood="teach", shot="close",
  board="[[es · hay · tiene · está]]")
L("pablo", "[[Me encanta Sevilla porque es muy bonita y hay mucho que hacer.]] I love Seville because it's very pretty and there's lots to do.", mood="excited", shot="close",
  board="[[hay mucho que hacer]] = lots to do")
L("tara", "[[Me gusta mi barrio porque es tranquilo y tiene muchos parques.]] I like my neighbourhood because it's quiet and it has lots of parks.", mood="neutral", shot="close",
  board="[[porque es tranquilo y tiene…]]")
L("lola", "Place adjectives come in pairs. [[Tranquilo]], quiet. [[Ruidoso]], noisy. [[Animado]], lively. [[Aburrido]], boring. [[Limpio]], clean. [[Sucio]], dirty. [[Seguro]], safe. [[Peligroso]], dangerous.", mood="teach", shot="close",
  boardClear=True, board="[[tranquilo ↔ ruidoso · limpio ↔ sucio]]")
poof("dad", 1100)
L("dad", "I know this one. Singapore is very clean. Muy limpio-o!", mood="smug", shot="close")
L("lola", "[[Limpio]] already ends in O. And adjectives agree. City is feminine, so [[mi ciudad es muy limpia.]]", mood="eyeroll", shot="close",
  board="[[mi ciudad es muy limpia]]")
L("tara", "The opposite chunk is [[no hay nada que hacer.]] There's nothing to do. You need [[no]] and [[nada]].", mood="deadpan", shot="close",
  board="[[No hay nada que hacer]]", gap=0.3)

scene("living", [("mum", 260), ("dad", 520), ("pablo", 780), ("lola", 1040)])
L("pablo", "Now other people. My mum loves Seville. [[A mi madre le encanta Sevilla.]]", mood="happy", shot="close", boardClear=True,
  board="[[A mi madre le encanta Sevilla]]")
L("lola", "Swap [[me]] for [[le]]. One person, [[le]]. Several people, [[les]]. [[A mis padres les gusta el campo.]] My parents like the countryside.", mood="teach", shot="close",
  board="one → [[le]]  ·  several → [[les]]")
L("mum", "So two questions. Who likes it? And what? [[A mi hija le gustan los parques.]] My daughter likes the parks.", mood="thinking", shot="close",
  board="[[A mi hija le gustan los parques]]")
L("dad", "My turn. A Tara le gusta Dad.", mood="smug", shot="close")
L("lola", "Grammar, correct. Facts, unconfirmed.", mood="bored", shot="close")
L("mum", "And to report what people say. [[Mi hermano piensa que mi barrio es aburrido.]] My brother thinks my neighbourhood is boring.", mood="neutral", shot="close",
  board="[[piensa que · dice que]]")
L("dad", "And my wife says I'm a genius.", mood="smug", shot="close")
L("mum", "[[Mi marido dice que es un genio.]] My husband says he's a genius. Reported. Not agreed.", mood="deadpan", shot="close",
  board="[[Mi marido dice que…]]", gap=0.4)

confess("pablo", "PABLO RUIZ · 13 · Homesick, More Or Less")
L("pablo", "Do I miss Seville? [[Más o menos.]] I miss my grandmother's cooking.", mood="sad")
L("pablo", "But Uncle Hock now gives me extra noodles. He says, for the boy from Seville. So now I miss Seville a bit less.", mood="happy", gap=0.5)

# ---------------- ACT 3: COMPARING & THE FUTURE ----------------
card("SEVILLA VS SINGAPUR", "The referee is a parrot. She is not neutral.", 2.4)
scene("living", [("tara", 260), ("pablo", 560), ("lola", 900)])
L("lola", "Comparing. [[Más]], plus adjective, plus [[que]]. More than. [[Menos]], plus adjective, plus [[que]]. Less than. [[Tan]], plus adjective, plus [[como]]. As, as.", mood="teach", shot="close",
  boardClear=True, board="[[más… que · menos… que · tan… como]]")
L("pablo", "[[La ciudad de Sevilla es más antigua que Singapur.]] The city of Seville is older than Singapore.", mood="smug", shot="close",
  board="[[Sevilla es más antigua que…]]")
L("tara", "[[Pero el metro de Singapur es mejor que el metro de Sevilla.]] But Singapore's metro is better than Seville's.", mood="deadpan", shot="close")
L("pablo", "Seville has one metro line. I can't argue.", mood="sad", shot="close")
L("lola", "Better and worse have their own words. [[Mejor]] and [[peor]]. Never, more good.", mood="teach", shot="close",
  board="[[mejor que]] · [[peor que]]")
L("pablo", "And less. [[El pueblo de mis abuelos es menos ruidoso que Sevilla.]] My grandparents' village is less noisy than Seville. Just goats.", mood="happy", shot="close",
  board="[[es menos ruidoso que…]]")
L("lola", "The adjective agrees with the first thing. [[La ciudad es más ruidosa que el pueblo.]] [[Ruidosa]], because [[ciudad]] is feminine.", mood="teach", shot="close",
  boardClear=True, board="[[la ciudad es más ruidosa que…]]")
L("tara", "[[La costa es tan bonita como la montaña.]] The coast is as pretty as the mountains. And with nouns: [[en Singapur hay más centros comerciales que en Sevilla.]] More shopping malls.", mood="neutral", shot="close",
  board="[[tan bonita como · hay más… que…]]")
poof("dad", 1100)
L("dad", "Easy one. Singapore is more hot than Seville. Más hot!", mood="smug", shot="close")
L("pablo", "Actually, no. [[En agosto, en Sevilla hace más calor que en Singapur.]] In August, it's hotter in Seville. Forty-five degrees. Even the pigeons stay inside.", mood="excited", shot="close",
  board="[[hace más calor que…]]")
L("dad", "Más o menos.", mood="smug", shot="close", gap=0.3)

scene("living", [("tara", 260), ("mum", 520), ("pablo", 780), ("lola", 1040)])
L("mum", "Last thing. The future. Where are you going to live?", mood="thinking", shot="close", boardClear=True)
L("lola", "[[Ir]], plus [[a]], plus the infinitive. [[Voy a vivir]], I'm going to live. [[Vas a vivir]], you're going to live. [[Va a ser]], it's going to be.", mood="teach", shot="close",
  board="[[voy a + vivir / comprar / ser]]")
L("pablo", "[[En el futuro voy a vivir en la costa porque va a ser más tranquilo.]] In the future I'm going to live on the coast, because it's going to be quieter.", mood="happy", shot="close",
  board="[[En el futuro voy a vivir en…]]")
L("tara", "[[Voy a comprar una casa en el campo con una biblioteca.]] I'm going to buy a house in the countryside, with a library. And no visitors.", mood="deadpan", shot="close",
  board="[[voy a comprar una casa…]]")
L("mum", "And there is going to be, is [[va a haber]]. [[Va a haber más parques.]] There are going to be more parks.", mood="happy", shot="close",
  board="[[va a haber]] = there's going to be", gap=0.4)

confess("lola", "LOLA · Recap Parrot · Strong Opinions · All Of Them Correct")
L("lola", "Recap. One. [[Me gusta]], with one thing or a verb. [[Me gustan]], with plural things.", mood="teach", boardClear=True, board="1. [[me gusta vivir · me gustan los parques]]")
L("lola", "Two. Give a reason. [[Porque es, porque hay, porque tiene.]]", mood="teach", board="2. [[porque es / hay / tiene / está]]")
L("lola", "Three. Other people take [[le]] or [[les]]. [[A mi madre le gusta el campo.]]", mood="teach", board="3. [[a mi madre le gusta…]]")
L("lola", "Four. Compare. [[Más ruidosa que. Tan bonita como.]] And [[mejor]], never more good.", mood="teach", board="4. [[más… que · tan… como · mejor]]")
L("lola", "Five. [[Voy a vivir en la costa.]] Is my recap good? Not [[más o menos.]] Perfect.", mood="smug", board="5. [[voy a vivir en…]]", gap=0.5)

scene("hawker", [("tara", 260), ("dad", 520), ("pablo", 760), ("uncle", 1000)], caption="HAWKER CENTRE · The Video, Take Two")
L("pablo", "Video for my class, take two. Mr Rao, [[¿hablas español?]] Do you speak Spanish?", mood="happy", shot="close", prop="phone")
L("dad", "[[Más o menos.]]", mood="smug", shot="close")
L("tara", "Menos.", mood="deadpan", shot="close")
sfx("squawk")
L("lola", "[[Mucho menos.]] Much less.", mood="smug", shot="wide", offstage=True)
L("uncle", "Same as me. Three words.", mood="happy", shot="close")
L("dad", "Exactly. Three words. Fluent.", mood="excited", shot="close", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "[[gusta]] or [[gustan]]?  [[Me ___ los parques.]]", "[[Me gustan los parques]]", "plural noun → [[gustan]]",
  "Question one. I like the parks. Is it [[gusta]], or [[gustan]]?",
  "[[Me gustan los parques.]] Parks are plural, so the verb is plural. The parks please me.")
challenge(2, "Say “My mum likes the countryside.”", "[[A mi madre le gusta el campo]]", "one person → [[le]];  one thing → [[gusta]]",
  "Question two. How do you say, my mum likes the countryside?",
  "[[A mi madre le gusta el campo.]] One person, so [[le]]. One thing, so [[gusta]].")
challenge(3, "Translate: “The countryside is better than the city.”", "[[El campo es mejor que la ciudad]]", "better → [[mejor]] (never más bueno)",
  "Question three. Translate. The countryside is better than the city.",
  "[[El campo es mejor que la ciudad.]] Better is [[mejor]]. Not more good. And definitely not, more or less.")
end_card()
