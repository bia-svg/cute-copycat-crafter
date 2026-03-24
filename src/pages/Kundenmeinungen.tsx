import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carmen G.",
    location: "Kempten",
    rating: 5,
    topic: "Spinnenphobie",
    topicEN: "Spider Phobia",
    textDE: "Wollte euch mal mitteilen, dass die Hypnose mit den Spinnen geklappt hat. Neulich war eine Spinne an der Wand hinter dem Sofa. Normalerweise wäre ich vom Sofa bis zur Tür gespickt, diesmal hab ich das Tier nur mal genauer betrachtet und dann mit meinem Finger angestupst. Da flüchtete die Spinne hinters Sofa, was ich ganz in Ordnung fand.",
    textEN: "Just wanted to let you know that the hypnosis for spiders worked. Recently there was a spider on the wall behind the sofa. Normally I would have jumped from the sofa to the door, but this time I just looked at the creature more closely and then nudged it with my finger. The spider fled behind the sofa, which I found perfectly fine.",
  },
  {
    name: "Gregor S.",
    location: "Luzern",
    rating: 5,
    topic: "Flugangst",
    topicEN: "Fear of Flying",
    textDE: "Ich war vor ungefähr 2 Jahren bei Ihnen, nachdem ich auf Ihrer Internet-Seite gesehen hatte, dass Sie auch das Thema Flugangst angehen. Es ist ja schon eine wahnsinnige Einschränkung, wenn man bei Bedarf oder Lust auf Urlaub nicht einfach in den Flieger steigen kann. Mir ging es ja früher genau so.",
    textEN: "I visited you about 2 years ago after seeing on your website that you also address fear of flying. It's an incredible limitation when you can't simply board a plane for a holiday. That's exactly how it used to be for me.",
  },
  {
    name: "Dr. Diana H.",
    location: "Erding",
    rating: 5,
    topic: "Persönliche Krise",
    topicEN: "Personal Crisis",
    textDE: "Ich möchte mich hiermit noch einmal ganz herzlich bei dir für die eindrucksvollen Seminare und die gelungene Hypnosesitzung bedanken. Ich fühle mich so vollkommen befreit und zufrieden, dass ich es nur schwer in Worte fassen kann. Endlich bin ich wieder der Mensch, der ich sein möchte.",
    textEN: "I want to sincerely thank you once again for the impressive seminars and the successful hypnosis session. I feel so completely liberated and content that I can hardly put it into words. Finally, I am the person I want to be again.",
  },
  {
    name: "Dagmar W.",
    location: "Zürich",
    rating: 5,
    topic: "Emotionale Blockade",
    topicEN: "Emotional Blockage",
    textDE: "Die Sitzung – vor allem heute – hat mich komplett berührt, fast fertiggemacht und ich muss gestehen, das ist mir in so einer Form noch nie passiert. Du hast heute etwas geschafft, was ich nie für möglich gehalten habe.",
    textEN: "The session — especially today — completely moved me, almost overwhelmed me, and I must admit, this has never happened to me before in this way. You achieved something today that I never thought possible.",
  },
  {
    name: "Kathi D.",
    location: "Rapperswil-Jona",
    rating: 5,
    topic: "Panikattacken / Burnout",
    topicEN: "Panic Attacks / Burnout",
    textDE: "Nach einer Reihe persönlicher Schicksalsschläge war ich völlig ausgebrannt und litt mehrere Wochen unter Panikattacken, die meinen Alltag massiv einschränkten. Eine Bekannte riet mir zur Hypnose bei David Woods. Im Folgenden möchte ich die herausragende Arbeit von Herrn Woods erläutern.",
    textEN: "After a series of personal setbacks, I was completely burned out and suffered from panic attacks for weeks that severely restricted my daily life. A friend recommended hypnosis with David Woods. I'd like to highlight the outstanding work of Mr. Woods.",
  },
  {
    name: "Michael H.",
    location: "Zürich",
    rating: 5,
    topic: "Muskelschmerzen",
    topicEN: "Muscle Pain",
    textDE: "Ich war wegen meiner unangenehmen Muskelschmerzen am ganzen Körper zu Ihnen gekommen, nachdem ich alle Wege der Schulmedizin ohne zufriedenstellendes Ergebnis hinter mir hatte. Jetzt habe ich erstmals seit vielen Jahren lange schmerzfreie Phasen und genieße mein Leben wieder stärker.",
    textEN: "I came to you because of my unpleasant muscle pain all over my body, after exhausting all conventional medical options without satisfactory results. Now, for the first time in many years, I have long pain-free phases and enjoy my life much more.",
  },
  {
    name: "Gundula S.",
    location: "München",
    rating: 5,
    topic: "Versagensangst",
    topicEN: "Fear of Failure",
    textDE: "Nach einer langen Zeit der Unsicherheit und Zweifel hatte ich wegen meiner ständigen Versagensangst Hypnose versucht. Prüfungen jeder Art, Vorstellungsgespräche, aber auch der Alltag mit den Kollegen im Büro – alles war für mich eine Qual, weil ich mich ständig zu schlecht vorbereitet fühlte.",
    textEN: "After a long period of insecurity and doubt, I tried hypnosis for my constant fear of failure. Exams, job interviews, and even daily interactions with colleagues at the office — everything was agonizing because I always felt underprepared.",
  },
  {
    name: "Peter S.",
    location: "Zürich",
    rating: 5,
    topic: "Höhenangst",
    topicEN: "Fear of Heights",
    textDE: "Sie erinnern sich bestimmt an mich und mein Problem als Polizist mit Höhenangst. Nachdem ich bei Ärzten und auch Psychologen Hilfe gesucht hatte und weder Medikamente noch tief schürfende Gespräche geholfen hatten, kam ich zu Ihnen mit meiner ganzen Hoffnung auf eine Lösung.",
    textEN: "You surely remember me and my problem as a police officer with a fear of heights. After seeking help from doctors and psychologists — with neither medication nor deep conversations helping — I came to you with all my hope for a solution.",
  },
  {
    name: "Teja M.",
    location: "Thun",
    rating: 5,
    topic: "Raucherentwöhnung",
    topicEN: "Smoking Cessation",
    textDE: "Wollte mich kurz melden, habe bei dir eine Raucherhypnose gehabt, und ich rauche seit dem nicht mehr, habe keine Zigarette mehr angerührt. Liebe Grüsse und nochmals vielen, vielen Dank.",
    textEN: "Just wanted to check in briefly — I had a smoking hypnosis session with you, and I haven't smoked since. Haven't touched a single cigarette. Best regards and thank you so, so much.",
  },
  {
    name: "Robert E.",
    location: "Zürich",
    rating: 5,
    topic: "Platzangst",
    topicEN: "Claustrophobia",
    textDE: "Was über viele Jahre meinen Ärzten und verschiedenen Psychologen nicht gelang, haben Sie geschafft! Das Problem meiner Platzangst habe ich seit Ihrer Hypnose im vergangenen Jahr im Griff. Im Rückblick kann ich sagen, gut dass ich mich für Ihre Hypnose entschieden habe.",
    textEN: "What my doctors and various psychologists failed to achieve over many years, you accomplished! I've had my claustrophobia under control since your hypnosis session last year. Looking back, I can say I'm glad I chose your hypnosis.",
  },
  {
    name: "Karin B.",
    location: "Zürich",
    rating: 5,
    topic: "Abnehmen & Depression",
    topicEN: "Weight Loss & Depression",
    textDE: "Ich möchte mich bei Ihnen nochmal herzlich bedanken für die Sitzungen. Mittlerweile habe ich glatt 9 Kilo abgenommen – ja, Sie lesen richtig. Ich hätte das niemals für möglich gehalten. Und das in einem Monat! Auch nehme ich meine Antidepressiva nicht mehr. Mir geht es so gut wie lange nicht mehr.",
    textEN: "I want to sincerely thank you again for the sessions. I've already lost a full 9 kilos — yes, you read that right. I never would have thought it possible. And all in one month! I've also stopped taking my antidepressants. I feel better than I have in a long time.",
  },
  {
    name: "Martin W.",
    location: "Erding",
    rating: 5,
    topic: "Raucherentwöhnung",
    topicEN: "Smoking Cessation",
    textDE: "Mit dem Rauchen aufzuhören habe ich schon oft versucht. Meine Frau hat mich dann überzeugt, zur Hypnose zu gehen. Ich halte eigentlich gar nichts von solchen Sachen, bin aber trotzdem hingegangen. Was soll ich sagen? Ich hatte kein Verlangen mehr nach Zigaretten.",
    textEN: "I'd tried to quit smoking many times. My wife then convinced me to try hypnosis. I normally don't believe in things like that, but I went anyway. What can I say? I had no more craving for cigarettes.",
  },
  {
    name: "Hans-Dieter H.",
    location: "Zürich",
    rating: 5,
    topic: "Phobien (Aufzug/Flug/Zug)",
    topicEN: "Phobias (Elevator/Flying/Train)",
    textDE: "Vom 24.–30.9. war ich in London. Die Fahrten in den Zügen, die Flüge und sogar wenn ich jedes Mal in den kleinen Aufzug im Hotel musste, hatte ich ABSOLUT keine Angst. Amazing! Thanks for your excellent job.",
    textEN: "From Sept. 24–30, I was in London. The train rides, the flights, and even every time I had to take the small elevator in the hotel — I had ABSOLUTELY no fear. Amazing! Thanks for your excellent job.",
  },
  {
    name: "Michael B.",
    location: "Tübingen",
    rating: 5,
    topic: "Depression",
    topicEN: "Depression",
    textDE: "Normalerweise bin ich eher ein Skeptiker gegenüber alternativen Heilmethoden. Ehrlich gesagt, glaubte ich nicht an eine Wirkung oder gar Heilung. Heute bin ich eines Besseren belehrt! Mein Psychotherapeut und Psychiater sind fassungslos und kennen mich nicht wieder. Klingt verrückt, aber ist wahr!",
    textEN: "Normally I'm rather skeptical about alternative healing methods. To be honest, I didn't believe in any effect or even healing. Today I've been proven wrong! My psychotherapist and psychiatrist are stunned and don't recognize me anymore. Sounds crazy, but it's true!",
  },
  {
    name: "Birgit W.",
    location: "Kreuzlingen",
    rating: 5,
    topic: "Spritzenphobie (Kind)",
    topicEN: "Needle Phobia (Child)",
    textDE: "Du hast ein großes Wunder bei unserem Sohn Joshua vollbracht. Er hatte seit seinem dritten Lebensjahr eine Spritzenphobie. Sogar den Fernseher mussten wir ausschalten, wenn etwas dergleichen zu sehen war. Er stand vor einer großen Zahn-OP, aber kein Arzt wollte ihn operieren.",
    textEN: "You performed a great miracle with our son Joshua. He had a needle phobia since he was three years old. We even had to turn off the TV whenever anything like that was shown. He was facing a major dental surgery, but no doctor was willing to operate on him.",
  },
  {
    name: "Ralf K.",
    location: "Luzern",
    rating: 5,
    topic: "Abnehmen",
    topicEN: "Weight Loss",
    textDE: "Ich war bei dir, weil ich 115 Kilo wog und endlich abnehmen wollte. Du hast mir beim Vorgespräch genau erklärt, welche Ernährungsumstellung und Sportart zu mir passt, und danach in die Hypnosesitzung eingebaut!",
    textEN: "I came to you because I weighed 115 kilos and finally wanted to lose weight. During the initial consultation, you explained exactly which dietary changes and sports would suit me, and then incorporated them into the hypnosis session!",
  },
];

export default function Kundenmeinungen() {
  const { language, country } = useLanguage();
  const isEN = language === "en";

  return (
    <>
      <section className="bg-white border-b border-border">
        <div className="container-main py-8 lg:py-12">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                {isEN ? "Client Testimonials" : "Kundenmeinungen"}
              </h1>
              <a href="https://share.google/9hUU4WXKePPhY8VWE" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground mt-1 hover:text-cta transition-colors inline-block">
                {isEN ? "5.0 / 5 on Google · 255 Reviews" : "5.0 / 5 bei Google · 255 Bewertungen"}
              </a>
            </div>
            <a href="https://share.google/9hUU4WXKePPhY8VWE" target="_blank" rel="noopener noreferrer" className="flex gap-0.5 hover:opacity-80 transition-opacity">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-border p-5 bg-secondary">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground bg-background px-2 py-0.5 rounded">
                    {isEN ? t.topicEN : t.topic}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed mb-3">
                  „{isEN ? t.textEN : t.textDE}"
                </p>
                <p className="text-xs font-semibold text-primary">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="https://share.google/9hUU4WXKePPhY8VWE" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-primary text-primary">
                {isEN ? "Read All Google Reviews" : "Alle Google-Bewertungen lesen"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-muted-foreground text-white">
        <div className="container-main py-10 text-center">
          <h2 className="text-2xl font-bold mb-3">
            {isEN ? "Ready for Your Own Success Story?" : "Bereit für Ihre eigene Erfolgsgeschichte?"}
          </h2>
          <Link to={`/${language}/${country}/erstgespraech`}>
            <Button className="bg-cta hover:bg-cta/90 text-cta-foreground font-semibold px-8 py-3 text-base">
              {isEN ? "Free Discovery Call" : "Kostenloses Erstgespräch"}
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
