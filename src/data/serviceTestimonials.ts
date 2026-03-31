/**
 * Testimonials mapped by service slug (EN slug used as key).
 * Each entry has name, rating, text (DE+EN), and Google Maps review link.
 */
export interface ServiceTestimonial {
  name: string;
  rating: number;
  textDE: string;
  textEN: string;
  link: string;
}

export const serviceTestimonials: Record<string, ServiceTestimonial[]> = {
  // Raucherentwöhnung / Stop Smoking
  "stop-smoking": [
    {
      name: "A.B.",
      rating: 5,
      textDE: "Ich habe vor einem Jahr bei David eine Hypnose intensiv Sitzung (glaube es waren so 5h) gemacht, um mit dem Rauchen aufzuhören. Er hat mir geholfen zu verstehen, warum ich aufhören will, und die Gründe, die ich mir eingeredet habe, warum Rauchen für mich gut ist, als Lügen zu enttarnen. Die Sitzung war auch nicht teurer als 3 Monate Rauchen und hat sich somit auch schon bezahlt gemacht. Nach nun mehr einem Jahr rauchfrei möchte ich mich daher noch einmal bei Ihm bedanken und eine Empfehlung an alle aussprechen, die ein Problem/Sucht haben, die Hilfe von Herrn Woods in Anspruch zu nehmen. Danke David.",
      textEN: "A year ago, I had an intensive hypnosis session with David (I think it was about 5 hours) to quit smoking. He helped me understand why I wanted to quit, and exposed the reasons I had told myself that smoking was good for me as lies. The session was also no more expensive than 3 months of smoking, so it has already paid for itself. After now more than a year smoke-free, I would like to thank him once more and recommend to everyone who has a problem or addiction to seek the help of Mr. Woods. Thank you, David.",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSUNXMHIyNHh3RRAB",
    },
    {
      name: "Nicole Gruber",
      rating: 5,
      textDE: "Ich war bereit, mich auf die Hypnose einzulassen, obwohl ich nicht so auf alternative Behandlungsmethoden abfahre. Da man alles mitbekommt, fühlte ich mich schon sehr entspannt, habe mich aber auch manchmal gefragt, ob das wohl klappt. Aber ich konnte es selbst kaum glauben. Ich habe seit dem Tag keine einzige Zigarette mehr geraucht.",
      textEN: "I was ready to try hypnosis, even though I'm not really into alternative treatment methods. Since you're fully aware of everything, I felt very relaxed, but sometimes I wondered if it would work. I couldn't believe it. I haven't smoked a single cigarette since.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VJQ0FnSUMtMi1QU1BnEAE",
    },
    {
      name: "Thorsten Hartmann",
      rating: 5,
      textDE: "Ich war bei der Rauch Entwöhnungs Hypnose und ich kann David mit bestem Gewissen weiter empfehlen. Ich habe mich von der ersten Minute an wohl gefühlt und wurde herzlichst empfangen als würde man sich schon immer kennen. Er weis definitiv was er da macht! Die Hypnose war ein voller Erfolg und ich rauchfrei, bin sehr dankbar für alles!",
      textEN: "I had hypnosis to quit smoking and I can wholeheartedly recommend David. I felt comfortable from the very first minute and received a warm welcome, as if we had always known each other. He definitely knows what he's doing! The hypnosis was a complete success and I am smoke-free — very grateful for everything!",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSUNpcW9yMnF3RRAB",
    },
  ],

  // Abnehmen / Weight Loss
  "weight-loss": [
    {
      name: "FATMA C",
      rating: 5,
      textDE: "Ich habe durch David Woods über 70 Kilo abgenommen. Ich war oft seit Kind rein und raus von Adipositas Kliniken, war auch teilweise auf sogenannten Gesundheit Camps und habe alle möglichen Diäten ausprobiert. Es war immer das gleiche, 30 bis 50 Kilo abgenommen und mehr als vorher wieder drauf. David ging mit mir bis zum Geburt zurück und hat für mich meinen ganzen Essverhalten umgestellt. Ich habe seit über 1 Jahr keinen Jo-Jo Effekt mehr.",
      textEN: "I lost over 70 kg with David Woods. Since childhood I had been in and out of obesity clinics, attended so-called health camps, and tried every possible diet. It was always the same — lose 30 to 50 kg and then gain back even more. David went back with me to my birth and completely restructured my entire eating behaviour. For over a year now I have had no yo-yo effect.",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSUNXMHIyNHh3RRAB",
    },
    {
      name: "Petra Schön",
      rating: 5,
      textDE: "Ich bin total begeistert von den Fachwissen und der Kompetenz von David Woods. Ich habe in 8 Wochen mit seiner Hilfe 12 kg abgenommen. Er hat sich bereits beim Vorgespräch viel Zeit für mich genommen und mir nach der tollen Hypnose wertvolle Tipps zur Ernährung gegeben. Was ich ganz besonders schön finde, ist, dass er sich regelmäßig bei mir meldet und mich fragt, wie es mir geht.",
      textEN: "I am absolutely thrilled by the expertise and competence of David Woods. With his help I lost 12 kg in 8 weeks. He took a lot of time for me already during the initial consultation and gave me valuable nutrition tips after the wonderful hypnosis. What I find especially nice is that he regularly checks in on me and asks how I'm doing.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VJQ0FnSUMtMi1QU1BnEAE",
    },
    {
      name: "Claudia Obergrusberger",
      rating: 5,
      textDE: "War 2013 zum erstenmal bei David zur Hypnose zum Abnehmen. Dank der Hypnose habe ich fast 30 Kilo abgenommen. Dafür schon fünf Sterne ⭐⭐⭐⭐⭐. Danke David das du auch jetzt wieder an meiner Seite stehst mit meinen Problemen. David ist der beste — und ich weiß von was ich rede. Kann David ruhigen Gewissen weiter empfehlen.",
      textEN: "I first went to David for weight loss hypnosis in 2013. Thanks to the hypnosis, I lost almost 30 kg. Five stars for that alone. Thank you, David, for being by my side again now with my current challenges. David is the best — and I know what I'm talking about. I can recommend David with a clear conscience.",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSUNpcW9yMnF3RRAB",
    },
  ],

  // Ängste & Phobien / Anxiety
  "anxiety": [
    {
      name: "Theresa Sophia",
      rating: 5,
      textDE: "Ich hatte seit Jahren mit belastenden Themen aus der Vergangenheit zu kämpfen die ich nicht mehr ändern konnte. Das war meine erste Hypnosesitzung und David hat es geschafft das ich mit diesen Themen endlich abschließen kann und kein schlechtes Gefühl mehr empfinde. Man braucht keine Angst vor Hypnose zu haben — man bekommt alles mit, muss aber willens sein mitzuarbeiten. Für mich war Hypnose eine Wirkungsvolle und lebensveränderte Erfahrung. Klare Empfehlung für alle die Ängste und Blockaden haben.",
      textEN: "For years I had been struggling with distressing issues from my past that I could no longer change. This was my first hypnosis session, and David managed to help me finally close the door on these issues and no longer feel bad about them. There is no need to be afraid of hypnosis — you are fully aware throughout, but you must be willing to engage. For me, hypnosis was a powerful and life-changing experience. A clear recommendation for anyone who has fears and mental blocks.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2podFlrNW5XWGR6VVdKbFNURkZXRzlUTkZkTFdHYxAB",
    },
    {
      name: "Noah Hohlfelder",
      rating: 5,
      textDE: "Vor einigen Wochen hatte ich die Gelegenheit, den Hypnosetherapieservice von David J. Woods auszuprobieren. Ich war überrascht, wie tief und effektiv die Sitzungen waren. David hört aufmerksam zu und stellt die richtigen Fragen, was mir half, meine inneren Blockaden zu erkennen. Die Atmosphäre war jederzeit vertrauensvoll. Dank seiner Unterstützung konnte ich einige Ängste überwinden. Ich kann diese Dienstleistung nur empfehlen!",
      textEN: "A few weeks ago, I had the opportunity to try David J. Woods' hypnotherapy services. I was surprised by how profound and effective the sessions were. David listens attentively and asks the right questions, which helped me recognize my inner blocks. The atmosphere was always trusting. Thanks to his support, I was able to overcome some fears. I highly recommend this service!",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSURmN1BHRTJ3RRAB",
    },
    {
      name: "Anita Senti",
      rating: 5,
      textDE: "Es war meine erste Hypnoseerfahrung, die ich mit David J. Woods erleben konnte. Ich habe mich gezielt für ihn als Profi entschieden aufgrund seiner langjährigen Erfahrung im psychologisch-medizinischen Bereich mit entsprechenden Fachausweisen und habe mich gut begleitet gefühlt, jederzeit sicher und ich konnte wichtige Erkenntnisse für mich mitnehmen. Seine pragmatisch lösungsorientierte Art hat mir geholfen. Insgesamt eine positive Erfahrung, aus der ich gestärkt hervorgegangen bin.",
      textEN: "It was my first hypnosis experience, and I had the pleasure of working with David J. Woods. I specifically chose him as a professional because of his many years of experience in the psychological and medical fields, along with his relevant certifications. I felt well-supported and safe at all times, and I gained valuable insights. His pragmatic, solution-oriented approach was very helpful. Overall, it was a positive experience that left me feeling empowered.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT204dGRISkxaSGxWTjFSWlFYYzFOMVZNTTBSc2JuYxAB",
    },
  ],

  // Stress & Burnout
  "stress-burnout": [
    {
      name: "myitplanet GmbH",
      rating: 5,
      textDE: "David wurde mir von einem Bekannten wärmstens empfohlen. Anfangs war ich dem Ganzen gegenüber etwas skeptisch, habe aber dennoch mehrere Mitarbeiter zu ihm geschickt, um Motivation und mentale Stärke zu fördern. Die Ergebnisse haben mich positiv überrascht. David arbeitet sehr professionell und geht gezielt auf individuelle Themen ein. Bei einigen Mitarbeitern konnten mentale Blockaden gelöst werden, gleichzeitig hat sich der Teamgeist deutlich verbessert.",
      textEN: "David was warmly recommended to me by an acquaintance. Initially I was somewhat sceptical, but I still sent several employees to him to boost their motivation and mental strength. The results positively surprised me. David works very professionally and addresses individual topics in a targeted way. With some employees, mental blocks were resolved, and team spirit improved noticeably.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2xjeGRrTnNlRFZTV0VGNWRHNXVZVnBCY2xCZlJtYxAB",
    },
    {
      name: "D.M.",
      rating: 5,
      textDE: "Ich war auf einem Seminar für Aktiv-Hypnose bei David Woods und bin absolut begeistert! David ist extrem professionell, erklärt komplexe Inhalte verständlich und praxisnah und hat ein unglaubliches Feingefühl im Umgang mit Menschen. Besonders beeindruckt hat mich, wie effektiv er dabei hilft, innere Blockaden zu lösen — bei mir selbst und auch bei anderen Teilnehmern war die Veränderung deutlich spürbar.",
      textEN: "I attended an active hypnosis seminar with David Woods and I am absolutely thrilled! David is extremely professional, explains complex content in an understandable and practical way, and has an incredible sensitivity in dealing with people. I was particularly impressed by how effectively he helps to dissolve inner blocks — both in myself and in other participants, the change was clearly noticeable.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VOYVp3SkRON2V2RFdBEAE",
    },
    {
      name: "Jana Kaprol",
      rating: 5,
      textDE: "David hat mit seiner wunderbar einfühlsamen Art jeden von uns individuell angesprochen.",
      textEN: "David, with his wonderfully empathetic approach, addressed each of us individually.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VJQ0FnSUM1OVB6SVZBEAE",
    },
  ],

  // Depressionen & Traumata / Depression
  "depression": [
    {
      name: "Chantal Ianiro",
      rating: 5,
      textDE: "Ich wünsche jedem Menschen, dass er einmal zu David geht. Nach 40 Minuten hat er mir mein Leben erklärt. Triviale Dinge die man unterbewusst jahrelang verdrängt! Er hat mich aus einer Depression nach der Schwangerschaft geholt und die Dinge die generell für mich sehr schwer waren nachhaltig gelöst. Es ist ein Meisterwerk — was David bewirken kann. Mir fällt nichts mehr schwer, ich kann gut schlafen und ich bin glücklich. Das ist nun drei Monate her. Ganz großes Danke und viel Liebe für diesen tollen Menschen.",
      textEN: "I wish every person could go to David at least once. In 40 minutes, he explained my life to me. Trivial things that one unconsciously suppresses for years! He pulled me out of a postpartum depression and sustainably resolved the things that had been very difficult for me in general. It is a masterpiece — what David can achieve. Nothing feels hard anymore, I can sleep well and I am happy. That was three months ago now. A huge thank you and much love for this wonderful person.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2tsWVkxUm1kMEpzY25sWFNFSjVSa2RRZWtSUVFXYxAB",
    },
    {
      name: "Theresa Sophia",
      rating: 5,
      textDE: "Ich hatte seit Jahren mit belastenden Themen aus der Vergangenheit zu kämpfen die ich nicht mehr ändern konnte. Das war meine erste Hypnosesitzung und David hat es geschafft das ich mit diesen Themen endlich abschließen kann und kein schlechtes Gefühl mehr empfinde. Für mich war Hypnose eine Wirkungsvolle und lebensveränderte Erfahrung.",
      textEN: "For years I had been struggling with distressing issues from my past that I could no longer change. This was my first hypnosis session, and David managed to help me finally close the door on these issues and no longer feel bad about them. For me, hypnosis was a powerful and life-changing experience.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2podFlrNW5XWGR6VVdKbFNURkZXRzlUTkZkTFdHYxAB",
    },
    {
      name: "Noah Hohlfelder",
      rating: 5,
      textDE: "Ich war überrascht, wie tief und effektiv die Sitzungen waren. David hört aufmerksam zu und stellt die richtigen Fragen, was mir half, meine inneren Blockaden zu erkennen. Die Atmosphäre war jederzeit vertrauensvoll. Dank seiner Unterstützung konnte ich einige Ängste überwinden.",
      textEN: "I was surprised by how profound and effective the sessions were. David listens attentively and asks the right questions, which helped me recognize my inner blocks. The atmosphere was always trusting. Thanks to his support, I was able to overcome some fears.",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSURmN1BHRTJ3RRAB",
    },
  ],

  // Adults (general)
  "adults": [
    {
      name: "Anita Senti",
      rating: 5,
      textDE: "Es war meine erste Hypnoseerfahrung, die ich mit David J. Woods erleben konnte. Ich habe mich gezielt für ihn als Profi entschieden aufgrund seiner langjährigen Erfahrung im psychologisch-medizinischen Bereich mit entsprechenden Fachausweisen und habe mich gut begleitet gefühlt, jederzeit sicher und ich konnte wichtige Erkenntnisse für mich mitnehmen. Seine pragmatisch lösungsorientierte Art hat mir geholfen. Insgesamt eine positive Erfahrung, aus der ich gestärkt hervorgegangen bin.",
      textEN: "It was my first hypnosis experience, and I had the pleasure of working with David J. Woods. I specifically chose him as a professional because of his many years of experience in the psychological and medical fields, along with his relevant certifications. I felt well-supported and safe at all times, and I gained valuable insights. His pragmatic, solution-oriented approach was very helpful. Overall, it was a positive experience that left me feeling empowered.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT204dGRISkxaSGxWTjFSWlFYYzFOMVZNTTBSc2JuYxAB",
    },
    {
      name: "Thorsten Hartmann",
      rating: 5,
      textDE: "Ich war bei der Rauch Entwöhnungs Hypnose und ich kann David mit bestem Gewissen weiter empfehlen. Ich habe mich von der ersten Minute an wohl gefühlt und wurde herzlichst empfangen als würde man sich schon immer kennen. Die Hypnose war ein voller Erfolg und ich rauchfrei!",
      textEN: "I had hypnosis to quit smoking and I can wholeheartedly recommend David. I felt comfortable from the very first minute and received a warm welcome, as if we had always known each other. The hypnosis was a complete success and I am smoke-free!",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSUNpcW9yMnF3RRAB",
    },
    {
      name: "D.M.",
      rating: 5,
      textDE: "Ich war auf einem Seminar für Aktiv-Hypnose bei David Woods und bin absolut begeistert! David ist extrem professionell, erklärt komplexe Inhalte verständlich und praxisnah und hat ein unglaubliches Feingefühl im Umgang mit Menschen. Besonders beeindruckt hat mich, wie effektiv er dabei hilft, innere Blockaden zu lösen.",
      textEN: "I attended an active hypnosis seminar with David Woods and I'm absolutely thrilled! David is extremely professional, explains complex topics clearly and practically, and has an incredible sensitivity in dealing with people. I was particularly impressed by how effectively he helps to release inner blocks.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VOYVp3SkRON2V2RFdBEAE",
    },
  ],
};

/**
 * Map service slugEN to testimonial key.
 */
export function getTestimonialsForService(slugEN: string): ServiceTestimonial[] {
  const map: Record<string, string> = {
    "stop-smoking": "stop-smoking",
    "weight-loss": "weight-loss",
    "anxiety-phobias": "anxiety",
    "stress-burnout": "stress-burnout",
    "depression-trauma": "depression",
    "adults": "adults",
  };
  return serviceTestimonials[map[slugEN] || ""] || [];
}
