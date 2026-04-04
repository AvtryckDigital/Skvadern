import Image from "next/image";

export default function Historia() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/SuM-foto021826-1.jpg"
          alt="Rudolf Granberg med skvaderdjuret. Foto: Norrlandsbild/Ragge Ellefsson, Sundsvalls museum"
          fill
          className="object-cover object-[50%_67%]"
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-5xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Historia
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
            Om föreningen
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Hembygdsföreningen Skvadern
          </h2>
          <div className="w-10 h-px mb-6" style={{ backgroundColor: "var(--gold)" }} />
          <p
            className="leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Med inspiration från broder Bengt-Olov Horn kommer här ett försök att på ett så
            korrekt sätt som möjligt återge Skvaderns ursprung och historia.
          </p>
          <p
            className="leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Det vi alla vet är att Skvadern bildades hösten 1950 i KFUM-huset vid Fyrisån.
            Försök gjordes dock redan året innan då det bildades en interimsstyrelse, men det
            försöket misslyckades. Däremot får vi uttrycka vår stora glädje till initiativtagaren
            Kjell Sundberg och lokalhållaren Kurt &ldquo;Knubben&rdquo; Johansson för vår existens.
          </p>
        </div>
      </section>

      {/* Skvadersymbolen */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
              Symbolen
            </p>
            <h2
              className="text-3xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Skvaderdjuret
            </h2>
            <div className="w-10 h-px mb-5" style={{ backgroundColor: "var(--gold)" }} />
            <p
              className="leading-relaxed mb-4"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
            >
              Utan större tvekan är Skvadern, skapad av konservator Rudolf Granberg, den symbol
              som starkast förknippas med Medelpad. Dess härkomst går att spåra ända till antikens
              dagar i Petronii verk <em>Satyricon</em> där två studenter blev bjudna på middag av
              en rik uppkomling i samhället. Där bjöds de på diverse rätter men en av dem var en
              hare försedd med vingar, för att efterlikna Pegasus.
            </p>
            <p
              className="leading-relaxed"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
            >
              Vissa vill göra gällande att detta låg till grund för Granberg då han skapade
              Skvadern. Andra vill göra gällande att det är en jakthistoria från slutet av 1800-talet,
              där jägarna skröt för varandra om vem som skjutit det märkligaste djuret, som inspirerat
              skapelsen Skvadern.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-56 h-56">
              <Image
                src="/images/skvader.jpg"
                alt="Skvaderdjuret"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* De tidiga åren */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
            Tidigt 1950-tal
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            De tidiga åren
          </h2>
          <div className="w-10 h-px mb-6" style={{ backgroundColor: "var(--gold)" }} />
          <p
            className="leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Under de tidiga åren genomförde Skvadern en konstutställning som vid sidan av
            Sundsvalls Tidning och Uppsala Nya Tidning gav eko i de rikstäckande tidningarna och
            satte Skvadern på Sverigekartan. Skvadern, under ledning av Skyddspatron Knubben,
            samlade storstilade konstverk från Medelpad och under de sju dagar den genomfördes
            besöktes utställningen av inte mindre än 800 personer. Det fick enligt Knubben anses
            som ett gott resultat även om det varit svårt att driva in pengar till kulturspridandet.
            Ett uttryck som uttalades var att det var &ldquo;som att predika i öknen&rdquo;. I och med
            detta visade det sig att den unga föreningen skulle överleva de första svåra åren och
            leva kvar länge inom Norrlands nation.
          </p>
          <p
            className="leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Skvaderns verksamhet kan delas upp i två delar: dels yttre manifestationer liknande
            de ovan som alla kan bevista, dels privata sammankomster som är till för bröderna i
            föreningen. Det intressanta är att brädgården är äldre än vad Spelen är i hänseende
            till namn.
          </p>
          <p
            className="leading-relaxed"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Andra kulturella evenemang som genomförts i Skvaderns regi är en visafton med
            Visans vänner från Sundsvall och en konsert med världsberömda operasångerskan
            Hjördis Schymberg (från Alnö).
          </p>
        </div>
      </section>

      {/* Skvaderns verksamhet */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
            Organisation
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Skvaderns verksamhet
          </h2>
          <div className="w-10 h-px mb-6" style={{ backgroundColor: "var(--gold)" }} />
          <p
            className="leading-relaxed mb-4"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Fram till 1957 benämndes styrelsen just styrelsen och hade de traditionella
            styrelseposterna ordförande, sekreterare etc. Visserligen finns det alternativa
            namn på styrelseposterna redan på det första protokollet från 15 december 1950
            men dopet, som inspirerades av sågverkstiden, skedde alltså först sju år senare.
          </p>
          <p
            className="leading-relaxed"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Namnet Skvaderspel uppkom 1962 efter en tävling bland bröderna, innan dess
            kallades det för skvadermöte. På senare år har det även tagits beslut att Spel
            alltid ska skrivas med stort S för att markera vikten av dess innebörd.
          </p>
        </div>
      </section>

      {/* Tidslinje */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
              Kronologi
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Föreningens historia
            </h2>
          </div>

          <div className="space-y-0">
            {[
              {
                year: "1949",
                title: "Det misslyckade försöket",
                text: "Ett första försök att bilda föreningen gjordes men strandade. En interimsstyrelse bildades men misslyckades. Tanken levde dock kvar bland de studenter vid Norrlands nation som sökte ett hem för sin hembygdskärlek.",
              },
              {
                year: "1950",
                title: "Grundandet",
                text: 'Hösten 1950 grundades Skvaderns Hembygdsförening i KFUM-lokalen vid Fyrisån. Initiativet togs av Kjell Sundberg och platsen ordnades av Kurt "Knubben" Johansson. Föreningens ändamål fastslogs: att befordra gott kamratskap och främja intresset för hembygden.',
              },
              {
                year: "Tidigt 1950-tal",
                title: "Konstutställningar",
                text: "Den unga föreningen arrangerade stora konstutställningar med regionala verk. En utställning lockade omkring 800 besökare under sju dagar och fick uppmärksamhet i rikstäckande press.",
              },
              {
                year: "1950-tal",
                title: "Sång & kultur",
                text: "Föreningen arrangerade folkvisaftnar och konserter. Bland gästerna märktes den berömda operasångerskan Hjördis Schymberg från Alnö.",
              },
              {
                year: "1957",
                title: "Nya titlar",
                text: "Sju år efter grundandet antogs officiellt alternativa titlar hämtade ur sågverksterminologin — en hyllning till Medelpads industrihistoria.",
              },
              {
                year: "1962",
                title: "Skvaderspelet",
                text: 'Föreningens centrala sammankomst fick sitt slutgiltiga namn efter en intern tävling. Benämningen "Skvaderspel" ersatte det äldre "skvadermöte". Ordet "Spel" skrivs numera med stort S för att markera vikten av dess innebörd.',
              },
              {
                year: "2025",
                title: "75-årsjubileum",
                text: "Föreningen firade sitt 75-årsjubileum med ett storslaget jubileumsskvaderspel. Generationer av bröder samlades för att hedra en tradition som levat vidare i mer än tre fjärdedels sekel.",
              },
            ].map((item, i, arr) => (
              <div key={item.year} className="flex gap-8">
                <div className="flex flex-col items-center w-20 flex-shrink-0 pt-1">
                  <span
                    className="text-xs font-semibold text-right w-full"
                    style={{ color: "var(--gold)" }}
                  >
                    {item.year}
                  </span>
                  <div className="mt-2 w-px flex-1 min-h-[2rem]" style={{ backgroundColor: i < arr.length - 1 ? "var(--border)" : "transparent" }} />
                </div>
                <div className="pb-10">
                  <div className="w-2 h-2 rounded-full mt-1.5 mb-3" style={{ backgroundColor: "var(--gold)", marginLeft: "-1.25rem" }} />
                  <h3
                    className="text-lg font-semibold mb-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jubileum */}
      <section className="py-16 px-6 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
            2025
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            75 år av tradition
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
            År 2025 firade Skvaderns Herrförening sitt 75-årsjubileum. Generationer
            av bröder har mötts kring middagsbordet och förhandlingsbordet — och
            traditionen lever vidare.
          </p>
        </div>
      </section>
    </div>
  );
}
