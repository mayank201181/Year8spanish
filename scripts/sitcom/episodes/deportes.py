# "¡Qué Caos!" S01E05 "Own Goal, Olé" (Topic: deportes — Sport)
# Format and helpers: see common.py; check with lint_episode.py.

EP = dict(topic="deportes", logline="Dad claims he was a futsal legend, then scores from the halfway line, into his own goal. Sports and their genders, jugar a versus hacer, how often, opinions that agree, and inviting a friend.")

# ---------------- COLD OPEN ----------------
scene("park", [("dad", 300), ("pablo", 700)], caption="THE FUTSAL COURT · Under The Block")
L("dad", "Pablo. In my youth, I was a legend. Futsal. Tampines. Nineteen ninety-four.", mood="smug", shot="close", prop="ball")
L("pablo", "Great! [[¿Juegas al fútbol?]] Do you play football?", mood="excited", shot="close")
L("dad", "Sí! Yo juego fútbol. Every day-o!", mood="smug", shot="close")
sfx("squawk")
poof("lola", 1040)
L("lola", "[[Juego al fútbol.]] [[Jugar]] needs [[a]]. And [[a]] plus [[el]] squashes into [[al]].", mood="annoyed", shot="close")
L("dad", "Details. Watch the legend. Pablo, pass!", mood="determined", shot="two")
sfx("whistle")
sfx("trombone", gap=0.3)
L("pablo", "[[¡Gol en propia puerta!]] An own goal!", mood="shock", shot="close")
L("lola", "Into his own goal. From the halfway line. Honestly, that's quite hard to do.", mood="bored", shot="close", gap=0.3)
freeze("\"OWN GOAL, OLÉ!\"", 2.4, narrator="Narrator: The legend of Tampines, nineteen ninety-four.")
confess("tara", "TARA RAO · 12 · Reluctant Referee")
L("tara", "My dad says he was a futsal legend. I found the team photo. He's holding the water bottles.", mood="deadpan")
L("tara", "I'm not sporty either. [[No soy nada deportista.]] I'm not sporty at all. I learnt that one specially.", mood="deadpan", gap=0.5)

title()

# ---------------- ACT 1: SPORTS & GENDERS ----------------
scene("park", [("tara", 260), ("pablo", 560), ("lola", 900)])
L("pablo", "First, the sports. Learn each one with its little word. [[El fútbol, el baloncesto, el tenis, el voleibol, el hockey, el bádminton.]]", mood="happy", shot="close",
  boardClear=True, board="[[el fútbol · el baloncesto · el tenis]]")
L("lola", "Sports borrowed from English are masculine. Because [[el deporte]], sport, is masculine. [[El tenis. El hockey.]]", mood="teach", shot="close",
  board="[[el deporte]] → [[el tenis · el hockey]]")
L("tara", "And the endings tell you. I S M O is always masculine. [[El atletismo]], athletics. [[El ciclismo]], cycling.", mood="neutral", shot="close",
  board="-ismo → [[el atletismo · el ciclismo]]")
L("lola", "C I Ó N is always feminine. [[La natación]], swimming. [[La equitación]], horse riding. With an accent on the O, every time.", mood="teach", shot="close",
  board="-ción → [[la natación · la equitación]]")
L("pablo", "And [[la vela]], sailing. [[La gimnasia]], gymnastics. [[El patinaje]], skating. [[El esquí]], skiing. And [[el yoga]], even though it ends in A.", mood="happy", shot="close",
  boardClear=True, board="[[la vela · la gimnasia · el yoga]]")
L("tara", "Skiing. In Singapore. Sure.", mood="deadpan", shot="close")
L("pablo", "In Spain we have mountains with snow! The Sierra Nevada. Not far from Seville.", mood="excited", shot="close")
L("tara", "In Singapore, the snow is indoors. Like everything else.", mood="deadpan", shot="close", gap=0.4)

# ---------------- ACT 2: JUGAR, HACER, PRACTICAR ----------------
card("THREE VERBS", "Play, do, practise. Guess who mixes them up.", 2.4)
scene("park", [("dad", 260), ("pablo", 560), ("lola", 900)])
L("lola", "Verb one. [[Jugar]], to play, for games with a ball or an opponent. Always with [[a]]. [[Juego al tenis.]] [[Juego al baloncesto.]]", mood="teach", shot="close",
  boardClear=True, board="[[jugar a]] + [[el]] → [[juego al tenis]]")
L("pablo", "And it's a boot verb. U changes to U E. [[Juego, juegas, juega, jugamos, jugáis, juegan.]] No change for we, and you all.", mood="teach", shot="close",
  board="[[juego · juegas · juega · jugamos]]")
L("lola", "Verb two. [[Hacer]], to do, for activities. Usually no article. [[Hago natación. Hago atletismo. Hago yoga.]]", mood="teach", shot="close",
  board="[[hago natación · hago yoga]]")
L("pablo", "Only the I form is strange. [[Hago, haces, hace, hacemos.]]", mood="neutral", shot="close",
  board="[[hago · haces · hace · hacemos]]")
L("dad", "Got it. Hago football! Juego swimming!", mood="smug", shot="close")
sfx("buzzer")
L("lola", "Both wrong. Ball game, so [[juego al fútbol.]] Activity, so [[hago natación.]] You swapped them perfectly.", mood="eyeroll", shot="close",
  boardClear=True, board="✘ hago fútbol  ✔ [[juego al fútbol]]")
L("pablo", "Some sports have their own verb. [[Nado]], I swim. [[Corro]], I run. [[Monto en bici]], I ride a bike.", mood="happy", shot="close",
  board="[[nado · corro · monto en bici]]")
L("lola", "Verb three. [[Practicar]] works with every sport. It's the safe one. [[¿Qué deportes practicas?]] What sports do you do?", mood="teach", shot="close",
  board="[[¿Qué deportes practicas?]]")
L("pablo", "And if the answer is nothing? [[No practico ningún deporte.]] I don't do any sport.", mood="neutral", shot="close")
L("dad", "Practico... the goals. Lots of goals.", mood="smug", shot="close")
L("pablo", "Into which goal?", mood="worried", shot="close")
L("dad", "That's not important.", mood="annoyed", shot="close", gap=0.4)

confess("dad", "VIKRAM RAO · Dad · Futsal Legend (Disputed)")
L("dad", "That was not an own goal. That was a tactical goal. For the other team. To build their confidence.", mood="smug")
L("dad", "I'm a very generous player. Eleven own goals in one season. Nobody has more confidence than my opponents.", mood="happy", gap=0.6)

# ---------------- ACT 3: HOW OFTEN & OPINIONS ----------------
card("HOW OFTEN?", "Never is also an answer", 2.2)
scene("living", [("mum", 260), ("tara", 520), ("pablo", 780), ("lola", 1040)])
L("mum", "Lola, how do I say how often I do something?", mood="thinking", shot="close", boardClear=True)
L("lola", "[[Siempre]], always. [[A menudo]], often. [[A veces]], sometimes. [[De vez en cuando]], now and then. [[Nunca]], never.", mood="teach", shot="close",
  board="[[siempre · a menudo · a veces · nunca]]")
L("pablo", "[[Juego al fútbol todos los días.]] I play football every day. And [[los sábados]], on Saturdays, I play with my cousins. No word for on. Just [[los sábados.]]", mood="happy", shot="close",
  board="[[todos los días · los sábados]]")
L("mum", "[[Hago yoga dos veces a la semana.]] I do yoga twice a week. [[Una vez]], once. [[Dos veces]], twice.", mood="happy", shot="close",
  board="[[una vez · dos veces a la semana]]")
L("pablo", "Word order. Short words like [[a menudo]] go before the verb. Longer phrases go at the start, or the end. [[Los fines de semana hago natación.]] At weekends I go swimming.", mood="teach", shot="close",
  board="[[Los fines de semana hago…]]")
L("tara", "[[Nunca hago deporte.]] I never do sport. Or, [[no hago nunca deporte.]] If [[nunca]] comes after the verb, put [[no]] in front.", mood="deadpan", shot="close",
  board="[[Nunca hago… · No hago nunca…]]")
L("lola", "Correct. Twice. And still allergic to exercise.", mood="smug", shot="close", gap=0.3)
L("lola", "Now opinions. One thing, [[gusta]]. [[Me gusta el tenis.]] Plural, [[gustan]]. [[Me gustan los deportes de equipo.]] And with a verb, [[gusta]]. [[Me gusta nadar.]]", mood="teach", shot="close",
  boardClear=True, board="[[me gusta nadar · me gustan los deportes]]")
L("pablo", "And give a reason! [[Mi deporte preferido es el fútbol porque es emocionante.]] My favourite sport is football, because it's exciting.", mood="excited", shot="close",
  board="[[Mi deporte preferido es…]]")
L("lola", "Adjectives. [[Emocionante]], exciting. [[Divertido]], fun. [[Aburrido]], boring. [[Sano]], healthy. [[Relajante]], relaxing. [[Peligroso]], dangerous. [[Agotador]], exhausting.", mood="teach", shot="close",
  board="[[divertido · sano · agotador]]")
L("mum", "And they agree. [[La natación es agotadora.]] Swimming is exhausting. Feminine, so [[agotadora]].", mood="determined", shot="close",
  board="[[la natación es agotadora]]")
L("tara", "But [[el yoga es relajante]]. [[Relajante]] ends in E, so it never changes for feminine. Nor do [[fácil]] and [[difícil]].", mood="neutral", shot="close",
  board="[[relajante · fácil]] don't change")
L("mum", "And turn it up with [[muy]], very, or [[bastante]], quite. [[El fútbol es bastante peligroso.]] Football is quite dangerous. For some people more than others.", mood="smug", shot="close", gap=0.4)

# ---------------- ACT 4: PLANS & INVITATIONS ----------------
scene("park", [("tara", 260), ("pablo", 560), ("dad", 840)])
poof("lola", 1080)
L("pablo", "Tara! [[¿Quieres jugar al bádminton el sábado que viene?]] Do you want to play badminton next Saturday?", mood="happy", shot="close",
  boardClear=True, board="[[¿Quieres jugar al…?]]")
L("tara", "[[Lo siento, no puedo.]] Sorry, I can't. [[Tengo que estudiar.]] I have to study.", mood="deadpan", shot="close",
  board="[[Lo siento, no puedo]]")
L("pablo", "On a Saturday? Study what?", mood="thinking", shot="close")
L("tara", "How to avoid badminton.", mood="deadpan", shot="close")
L("tara", "And for the record, [[el sábado que viene voy a leer.]] Next Saturday, I'm going to read.", mood="deadpan", shot="close")
L("dad", "I'll play! Sí, okay-o!", mood="excited", shot="close")
L("lola", "[[¡Sí, vale!]] Yes, okay! Or [[¡claro!]] Of course!", mood="teach", shot="close",
  board="[[¡Sí, vale! · ¡Claro!]]")
L("pablo", "[[¿A qué hora quedamos?]] What time shall we meet? [[Quedamos a las diez.]] Let's meet at ten.", mood="happy", shot="close",
  board="[[¿A qué hora quedamos?]]")
L("lola", "And the plan uses the near future. [[Ir]], plus [[a]], plus the infinitive. Keep the [[al]]! [[Vamos a jugar al bádminton.]] We're going to play badminton.", mood="teach", shot="close",
  boardClear=True, board="[[vamos a jugar al bádminton]]")
L("dad", "And after, I'm going to play football. Voy a play football!", mood="smug", shot="close")
L("lola", "[[Voy a jugar al fútbol.]] Or, for everybody's safety, [[no voy a jugar al fútbol.]] The [[no]] goes before [[voy]].", mood="eyeroll", shot="close",
  board="[[no voy a jugar al fútbol]]", gap=0.4)

confess("lola", "LOLA · Recap Parrot · Has Never Scored An Own Goal")
L("lola", "Recap. One. Learn each sport with its article. [[El ciclismo, la natación, el fútbol.]]", mood="teach", boardClear=True, board="1. [[el ciclismo · la natación]]")
L("lola", "Two. [[Jugar a]] for games. [[Juego al tenis.]] [[Hacer]] for activities. [[Hago natación.]]", mood="teach", board="2. [[juego al tenis · hago natación]]")
L("lola", "Three. How often. [[A veces, nunca, dos veces a la semana.]]", mood="teach", board="3. [[a veces · nunca · dos veces a la semana]]")
L("lola", "Four. Opinions agree. [[La natación es agotadora.]]", mood="teach", board="4. [[la natación es agotadora]]")
L("lola", "Five. Invitations. [[¿Quieres jugar al bádminton?]] And my answer is always, [[¡claro!]]", mood="smug", board="5. [[¿Quieres jugar al…? · ¡Claro!]]", gap=0.5)

card("THE SATURDAY THAT CAME", "Badminton. Supposedly.", 2.2)
scene("park", [("tara", 260), ("mum", 520), ("dad", 780), ("pablo", 1040)])
L("dad", "Change of plan. Badminton is boring. Football! Stand back, everyone.", mood="determined", shot="close", prop="ball")
sfx("whistle")
sfx("trombone", gap=0.3)
L("pablo", "[[¡Otra vez!]] Again! [[¡Gol en propia puerta!]]", mood="shock", shot="close")
L("dad", "[[Nunca más.]] Never again.", mood="sad", shot="close")
L("tara", "Dad. That was perfect Spanish.", mood="shock", shot="close")
sfx("flamenco")
L("lola", "Perfect Spanish. Perfect decision. [[¡Olé!]]", mood="excited", shot="wide", offstage=True, gap=0.8)

# ---------------- PAUSE CHALLENGE ----------------
card("PAUSE CHALLENGE", "Lola gives you five seconds. Then she gets smug.", 3.0)
challenge(1, "[[juego]] or [[hago]]?  ___ [[natación]]", "[[Hago natación]]", "an activity, not a ball game → [[hacer]]",
  "Question one. Swimming. Do you say [[juego]], or [[hago]]?",
  "[[Hago natación.]] Swimming is an activity, not a ball game. So, [[hacer]].")
challenge(2, "Say “I play tennis on Saturdays.”", "[[Juego al tenis los sábados]]", "[[a + el = al]];  on Saturdays → [[los sábados]]",
  "Question two. Say, I play tennis on Saturdays.",
  "[[Juego al tenis los sábados.]] [[A]] plus [[el]] makes [[al]]. And no word for on. Just [[los sábados.]]")
challenge(3, "Translate: “Swimming is exhausting.”", "[[La natación es agotadora]]", "[[natación]] is feminine → [[agotadora]]",
  "Question three. Translate. Swimming is exhausting.",
  "[[La natación es agotadora.]] [[Natación]] is feminine, so [[agotadora]]. Almost as exhausting as watching Dad play football.")
end_card()
