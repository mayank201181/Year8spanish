# "¡Qué Caos!" S01E03 "Me Levanto, Me Lamento" (Topic: rutina-diaria — Daily Routine)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="rutina-diaria", logline="Singapore school starts at half past seven, and Pablo is used to Seville hours. Reflexive verbs, telling the time, sequencers, the evening routine, boot verbs and other people's routines.")

# ---------------- COLD OPEN ----------------
scene("living", [("tara", 300), ("dad", 760)], caption="FIVE FIFTY-EIGHT A.M. · Still Dark")
L("dad", "Tara. From today, I do my morning routine in Spanish. Pablo will be so impressed.", mood="smug", shot="close", prop="clock")
L("tara", "Dad, it's six in the morning. Pablo is asleep. I'm also asleep.", mood="deadpan", shot="close")
L("dad", "Watch and learn. Levanto! Shower-o! Breakfast-o! Bus-o!", mood="excited", shot="two", gap=0.3)
sfx("squawk")
poof("lola", 1060)
L("lola", "[[Levanto]] on its own means, I lift. Lift what? Without [[me]], you're not getting up. You're lifting something.", mood="annoyed", shot="close")
L("dad", "I'm lifting myself. Out of bed. It's very heavy.", mood="smug", shot="close")
L("lola", "Then say it properly. [[Me levanto.]] I get up. That little [[me]] means, myself.", mood="eyeroll", shot="close")
L("tara", "[[Vuelvo a la cama.]] I'm going back to bed.", mood="deadpan", shot="close", gap=0.3)
freeze("\"SHOWER-O!\"", 2.4, narrator="Narrator: The sun would not come up for another hour.")
confess("tara", "TARA RAO · 12 · Not A Morning Person")
L("tara", "In Singapore, school starts at half past seven. So I get up at six. In the dark. Like a vampire with homework.", mood="deadpan", gap=0.5)
confess("pablo", "PABLO RUIZ · 13 · Used To Sleep Until Half Past Seven")
L("pablo", "In Seville, six in the morning is not a real time. It's a rumour. Here, my alarm goes off at six. And Lola sings with it.", mood="sad", gap=0.5)

title()

# ---------------- ACT 1: REFLEXIVE VERBS ----------------
scene("bedroom", [("pablo", 300), ("tara", 620), ("lola", 940)], caption="SIX A.M. · Pablo's Room")
L("pablo", "[[Me despierto.]] I wake up. [[Pero no me levanto.]] But I'm not getting up. Five more minutes.", mood="sad", shot="close",
  boardClear=True, board="[[me despierto]] = I wake up")
L("lola", "Up! These are reflexive verbs. You do the action to yourself. [[Me levanto]], I get up. [[Me ducho]], I have a shower.", mood="teach", shot="close",
  board="[[me levanto]] · [[me ducho]]")
L("lola", "[[Me lavo la cara]], I wash my face. [[Me lavo los dientes]], I brush my teeth. [[Me visto]], I get dressed. [[Me peino]], I do my hair. And at night, [[me acuesto]], I go to bed.", mood="teach", shot="close",
  board="[[me lavo los dientes]] · [[me visto]]")
L("tara", "In the dictionary they end in S E. [[Levantarse]], to get up. Drop the S E, and put a little word in front. [[Me]] for I, [[te]] for you, [[se]] for he or she.", mood="neutral", shot="close",
  boardClear=True, board="[[levantarse]] → [[me levanto]]")
L("lola", "The whole verb, please. [[Me levanto, te levantas, se levanta, nos levantamos, os levantáis, se levantan.]]", mood="teach", shot="close",
  board="[[me · te · se · nos · os · se]]")
L("pablo", "And [[no]] goes in front of everything. [[No me levanto.]] I am not getting up.", mood="smug", shot="close",
  board="[[No me levanto]] ✔")
L("lola", "Oh, you are. [[¡Arriba!]] Up!", mood="annoyed", shot="close")
sfx("flap")
L("pablo", "Okay! Okay! [[¡Me levanto!]]", mood="shock", shot="close", gap=0.3)

scene("bedroom", [("dad", 300), ("pablo", 620), ("lola", 940)])
L("dad", "Good morning, everyone! I have already done my teeth. Me lavo mis dientes!", mood="smug", shot="close", boardClear=True)
sfx("buzzer")
L("lola", "Nearly. No [[mis]] with body parts. The [[me]] already tells us whose teeth they are. [[Me lavo los dientes.]] Unless you brush other people's teeth.", mood="eyeroll", shot="close",
  board="✘ mis dientes  ✔ [[me lavo los dientes]]", gap=0.3)

scene("kitchen", [("mum", 300), ("tara", 620), ("lola", 940)])
L("mum", "Let me try the plural. We all get up at six. [[Nos levantamos a las seis.]]", mood="determined", shot="close", boardClear=True,
  board="[[Nos levantamos a las seis]] ✔")
L("lola", "Perfect. [[Nos]] for we. And [[a las seis]], at six.", mood="happy", shot="close", gap=0.3)

# ---------------- ACT 2: TELLING THE TIME & THE MORNING ----------------
card("CLOCK WATCHING", "In a flat where every clock is five minutes fast", 2.4)
scene("kitchen", [("dad", 300), ("mum", 620), ("lola", 940)])
L("mum", "Lola, how do I ask the time?", mood="thinking", shot="close", prop="clock", boardClear=True)
L("lola", "[[¿Qué hora es?]] What time is it? One o'clock is singular. [[Es la una.]] Every other hour is plural. [[Son las dos. Son las seis.]]", mood="teach", shot="close",
  board="[[Es la una]] · [[Son las dos]]")
L("dad", "Easy. Es las seis.", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Six is more than one, so it's plural. [[Son las seis.]] Only one o'clock gets [[es]].", mood="eyeroll", shot="close",
  board="✘ es las seis  ✔ [[son las seis]]")
L("lola", "Minutes past the hour, add [[y]]. [[Son las seis y cinco]], five past six. [[Y cuarto]], quarter past. [[Y media]], half past.", mood="teach", shot="close",
  boardClear=True, board="[[y cuarto]] = :15 · [[y media]] = :30")
L("mum", "And after half past?", mood="thinking", shot="close")
L("lola", "Count back from the next hour with [[menos]]. Minus. [[Son las siete menos cuarto.]] Quarter to seven. [[Son las siete menos veinte.]] Twenty to seven.", mood="teach", shot="close",
  board="[[las siete menos cuarto]] = 6:45")
L("dad", "I get up at quarter past five. A las cinco y quarter.", mood="smug", shot="close")
L("lola", "[[Cuarto.]] [[A las cinco y cuarto.]] And nobody gets up at quarter past five.", mood="annoyed", shot="close", gap=0.3)

scene("kitchen", [("tara", 300), ("pablo", 620), ("lola", 940)])
L("tara", "Two questions. [[¿Qué hora es?]] asks the time now. Answer with [[son las]]. But [[¿A qué hora?]] means, at what time. Answer with [[a las]].", mood="neutral", shot="close",
  boardClear=True, board="[[¿A qué hora…?]] → [[a las…]]")
L("pablo", "[[¿A qué hora te levantas?]] At what time do you get up?", mood="happy", shot="close")
L("tara", "[[Me levanto a las seis de la mañana.]] I get up at six in the morning. Afternoon is [[de la tarde]]. Night is [[de la noche]].", mood="deadpan", shot="close",
  board="[[de la mañana · de la tarde · de la noche]]")
L("lola", "Now your morning, Pablo, in order. Use sequencers. [[Primero]], first. [[Luego]], then. [[Después]], afterwards. [[Más tarde]], later. [[Finalmente]], finally.", mood="teach", shot="close",
  boardClear=True, board="[[primero · luego · después · finalmente]]")
L("pablo", "[[Primero me levanto y me ducho. Luego me visto.]] First I get up and have a shower. Then I get dressed.", mood="happy", shot="close",
  board="[[Primero me levanto… Luego me visto]]")
L("pablo", "[[Después desayuno tostadas.]] Afterwards I have toast for breakfast. With kaya. The best thing in Singapore.", mood="excited", shot="close",
  board="[[desayuno]] = I have breakfast")
L("tara", "[[Más tarde salgo de casa y voy al colegio en autobús.]] Later I leave home and go to school by bus.", mood="neutral", shot="close",
  board="[[salgo de casa · voy al colegio]]")
L("lola", "Transport. [[En autobús]], by bus. [[En metro]], by MRT. [[En coche]], by car. But on foot is [[a pie]]. Your feet are not a vehicle.", mood="teach", shot="close",
  board="[[en autobús · en metro · a pie]]")
L("pablo", "[[Finalmente llego al colegio a las siete y veinte.]] Finally, I get to school at twenty past seven.", mood="sad", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Up Since Five · Achieved Nothing")
L("dad", "I get up at quarter past five, to watch the sunrise. It's very peaceful.", mood="smug")
L("dad", "The sun comes up at seven. So I sit in the dark for two hours. With my Spanish app.", mood="sad", gap=0.6)

# ---------------- ACT 3: EVENING, BOOT VERBS & OTHER PEOPLE ----------------
card("THAT EVENING", "Everyone is tired. Lola is not.", 2.2)
scene("living", [("tara", 260), ("pablo", 560), ("mum", 840)])
poof("lola", 1080)
L("pablo", "[[Vuelvo a casa]], I go back home. [[Meriendo]], I have a snack. [[Hago los deberes]], I do my homework. [[Ceno]], I have dinner.", mood="happy", shot="close",
  boardClear=True, board="[[vuelvo a casa · meriendo · ceno]]")
L("tara", "[[Veo la tele]], I watch TV. [[Leo]], I read. [[Juego con el móvil]], I play on my phone. Then [[me acuesto]].", mood="deadpan", shot="close",
  board="[[veo la tele · leo · me acuesto]]")
L("lola", "Some verbs change inside when the stress lands on them. Boot verbs. [[Despertarse]] becomes [[me despierto]]. E to I E. [[Acostarse]] becomes [[me acuesto]]. O to U E.", mood="teach", shot="close",
  boardClear=True, board="e→ie [[me despierto]] · o→ue [[me acuesto]]")
L("lola", "[[Volver]] becomes [[vuelvo]]. And [[vestirse]] becomes [[me visto]]. E to I. But with [[nosotros]], no change. [[Nos acostamos.]] The stress moves to the end.", mood="teach", shot="close",
  board="e→i [[me visto]] · but [[nos acostamos]]")
L("mum", "And some verbs are only strange for I. [[Salgo, hago, pongo, voy.]] I leave, I do, I put, I go.", mood="happy", shot="close",
  board="[[salgo · hago · pongo · voy]]")
L("pablo", "[[Después de]], after, plus the infinitive. [[Después de cenar, veo la tele.]] After having dinner, I watch TV.", mood="teach", shot="close",
  board="[[después de]] + infinitive", gap=0.3)

scene("living", [("dad", 260), ("tara", 520), ("pablo", 780), ("lola", 1040)])
L("dad", "My turn. After I eat dinner, I watch TV. Después de ceno, veo la tele.", mood="smug", shot="close", boardClear=True)
sfx("buzzer")
L("lola", "[[Ceno]] means, I have dinner. After [[después de]], you need the infinitive. [[Después de cenar.]]", mood="eyeroll", shot="close",
  board="✘ después de ceno  ✔ [[después de cenar]]")
L("lola", "And with a reflexive verb, the [[me]] sticks on the end. [[Antes de acostarme, leo.]] Before going to bed, I read.", mood="teach", shot="close",
  board="[[antes de acostarme]] = before bed")
L("tara", "Now other people. Swap [[me]] for [[se]]. [[Mi padre se levanta a las cinco y cuarto.]] My dad gets up at quarter past five. Nobody knows why.", mood="deadpan", shot="close",
  boardClear=True, board="[[mi padre se levanta]]")
L("dad", "For the sunrise!", mood="excited", shot="close")
L("pablo", "And to compare, use [[pero]]. [[Yo me levanto a las seis, pero Tara se levanta a las seis y media.]] I get up at six, but Tara gets up at half past six.", mood="neutral", shot="close",
  board="[[yo me levanto… pero Tara se levanta…]]")
L("pablo", "And [[los fines de semana]], at weekends, everybody wins. [[Me levanto a las diez.]] I get up at ten.", mood="excited", shot="close",
  board="[[los fines de semana]] = at weekends")
L("lola", "And Tara, your parents go to bed at ten. [[Tus padres se acuestan a las diez.]] Plural, so [[se acuestan]].", mood="teach", shot="close",
  board="[[tus padres se acuestan]]", gap=0.4)

confess("lola", "LOLA · Recap Parrot · Has Never Used An Alarm")
L("lola", "Recap. One. Reflexive verbs carry a little pronoun. [[Me levanto, te levantas, se levanta.]]", mood="teach", boardClear=True, board="1. [[me levanto · te levantas · se levanta]]")
L("lola", "Two. Body parts take [[los]] or [[la]], never my. [[Me lavo los dientes.]]", mood="teach", board="2. [[me lavo los dientes]] (not mis!)")
L("lola", "Three. [[Es la una]], but [[son las dos]]. And [[a las]] for at. [[A las siete y media.]]", mood="teach", board="3. [[es la una · son las dos · a las…]]")
L("lola", "Four. Sequencers. [[Primero, luego, después, finalmente.]]", mood="teach", board="4. [[primero · luego · después]]")
L("lola", "Five. Boot verbs and strange I forms. [[Me acuesto, salgo, hago, voy.]] And now, I go to bed. [[Me acuesto.]]", mood="smug", board="5. [[me acuesto · salgo · hago · voy]]", gap=0.5)

card("THE NEXT MORNING", "Six a.m. Again.", 2.2)
scene("living", [("tara", 260), ("mum", 520), ("pablo", 780)])
sfx("tick")
L("mum", "[[Son las seis y media.]] Half past six. Where is your father?", mood="worried", shot="close")
poof("dad", 1040)
L("dad", "[[Me despierto. Me levanto.]]", mood="sad", shot="close")
L("dad", "[[Me lamento.]]", mood="sad", shot="close", gap=0.3)
L("tara", "Dad. That was correct.", mood="shock", shot="close")
L("pablo", "[[Me lamento]], I complain. A real reflexive verb! [[Me levanto, me lamento.]] I get up, I complain.", mood="excited", shot="close",
  boardClear=True, board="[[Me levanto, me lamento]]")
L("lola", "The national anthem of every Monday morning.", mood="smug", shot="wide", offstage=True)
L("tara", "[[Vuelvo a la cama.]]", mood="deadpan", shot="close", gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "Say “I get up at seven” in Spanish.", "[[Me levanto a las siete]]", "[[levantarse]] → [[me levanto]];  at → [[a las]]",
  "Question one. How do you say, I get up at seven, in Spanish?",
  "[[Me levanto a las siete.]] Don't forget [[me]]. Without it, you're just lifting something.")
challenge(2, "It's 8:45.  [[¿Qué hora es?]]", "[[Son las nueve menos cuarto]]", "past half → next hour + [[menos cuarto]]",
  "Question two. It's eight forty-five. [[¿Qué hora es?]]",
  "[[Son las nueve menos cuarto.]] After half past, jump to the next hour and count back. Nine, minus a quarter.")
challenge(3, "Translate: “My parents go to bed at ten.”", "[[Mis padres se acuestan a las diez]]", "they → [[se]];  o→ue → [[se acuestan]]",
  "Question three. Translate. My parents go to bed at ten.",
  "[[Mis padres se acuestan a las diez.]] They, so [[se]]. And the O turns into U E. If you forgot that, you can watch the sunrise with Dad.")
end_card()
