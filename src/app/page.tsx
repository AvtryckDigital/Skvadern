import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CalendarDays, BookOpen, Camera } from "lucide-react";

export default function Home() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/66502f05-f886-4548-a40f-17a9bfeb415d-1.jpg"
          alt="Skvaderns Hembygdsförening"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 relative">
              <Image
                src="/images/cropped-Skvader-logo-v2-1.png"
                alt="Skvaderns logotyp"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.15em] mb-4 font-medium" style={{ color: "#C9A050", fontSize: 14 }}>
            Obesfvärad elegance sedan 1950
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Skvaderns<br />
            <em className="font-normal">herrförening</em>
          </h1>
         
        </div>
      </section>

      {/* Våra evenemang */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
              Vad vi gör
            </p>
            <h2
              className="text-4xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Våra evenemang
            </h2>
            <p
              className="text-lg leading-relaxed max-w-2xl mx-auto mb-12"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
            >
              <em>Vältalig, välklädd, ödmjuk &mdash; hur spenderar en Skvader sin tid på nationen?</em>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: "/images/skvaderspel.jpg",
                title: "SkvaderSpel",
                desc: "Essensen av en Skvaders engagemang. En praktfull bankett följd utav ett teatralt möte och oral kraftmätning mellan bröderna.",
                href: "/evenemang",
              },
              {
                img: "/images/samsittning-rymden-ypsilon-e1695761490430.jpg",
                title: "Samsittningar",
                desc: "En Skvader trivs bäst i gott sällskap. Med utsökt mat och dryck avnjuter vi ofta kvällstimmarna tillsammans med de andra sociala föreningarna på nationen.",
                href: "/evenemang#samsittningar",
              },
              {
                img: "/images/119641543_368949447606126_586421981276314901_n.jpg",
                title: "Öfvriga tillställningar",
                desc: "En skvader är ett mångfacetterat djur som gillar att ägna sig åt alla typer av stimulerande aktiviteter.",
                href: "/evenemang#ofvriga",
              },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group bg-white border transition-shadow duration-200 hover:shadow-md overflow-hidden block"
                style={{ borderColor: "var(--border)", borderTop: "2px solid var(--gold)" }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="p-8">
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                    {item.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vår historia */}
      <section className="py-24 px-6 border-y" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
          <Image
            src="/images/SuM-foto021826-1.jpg"
            alt="Rudolf Granberg med skvaderdjuret. Foto: Norrlandsbild/Ragge Ellefsson, Sundsvalls museum"
            width={1188}
            height={1240}
            className="w-full h-80 object-cover object-center"
          />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
              Bakgrund
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-dark)" }}
            >
              Vår historia
            </h2>
            <div className="w-12 h-px mb-8" style={{ backgroundColor: "var(--gold)" }} />
            <p
              className="text-base leading-relaxed mb-5"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
            >
              Det är 40-tal och vi befinner oss i Uppsala på Norrlands Nation. Under en längre tid
              hade det funnits en önskan om att Norrlands Nations medelpadingar skulle kunna träffas
              och umgås i en egen förening. Som ett resultat av denna önskan grundades föreningen
              Skvadern år 1950. Syftet var att &ldquo;…under formen av ett slutet sällskap befordra
              ett gott kamratskap och främja intresset för hembygden&rdquo;. Sedan dess hade det
              kunnat hända mycket, men föreningens syfte står starkt kvar.
            </p>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
            >
              Skvadern är en förening öppen för alla studenter vid Norrlands Nation med anknytning
              till Medelpad, vare sig det är i form av härstamning eller om det är så att man kan
              färgerna i Medelpads flagga. Den Skvadrianska gemenskapen praktiserar inga geografiska
              inskränkningar.
            </p>
            <Link
              href="/historia"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm uppercase tracking-widest font-medium border transition-all duration-200 hover:gap-3"
              style={{ borderColor: "var(--text-dark)", color: "var(--text-dark)" }}
            >
              Läs mer <ChevronRight size={16} />
            </Link>
          </div>
        </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
              Bröder berättar
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hör deras berättelse
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Patron är otroligt god, han kommer alltid inneha mitt fulla stöd.",
                name: "Broder bas",
                img: "/images/ladda-ned.jpg",
              },
              {
                quote: "Patron har upplyst mig, och jag har aldrig mått bättre.",
                name: "Broder prickare",
                img: "/images/Skarmbild-2025-11-19-165440.jpg",
              },
              {
                quote: "Jag försöker så gott jag kan, jag tackar Patron för hans tålamod.",
                name: "Broder nitare",
                img: "/images/c60d50f8-9762-427e-b5ac-a92b17076746.jpg",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-8 bg-white border"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 rounded-full object-cover object-top flex-shrink-0"
                  />
                  <p className="text-sm font-medium tracking-wide" style={{ color: "var(--text-dark)" }}>
                    {item.name}
                  </p>
                </div>
                <div
                  className="text-3xl mb-3 leading-none"
                  style={{ color: "var(--gold)", fontFamily: "'Playfair Display', serif" }}
                >
                  &ldquo;
                </div>
                <p
                  className="text-base leading-relaxed italic"
                  style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
                >
                  {item.quote}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Länksektion */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--bg)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { href: "/evenemang", icon: <CalendarDays size={24} />, title: "Evenemang", desc: "Aktiviteter och tillställningar" },
              { href: "/historia", icon: <BookOpen size={24} />, title: "Om oss", desc: "Föreningens anor sedan 1950" },
              { href: "/bilder", icon: <Camera size={24} />, title: "Bilder", desc: "Foton från minnesvärda stunder" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 p-6 border hover:border-black transition-colors duration-200"
                style={{ borderColor: "var(--border)" }}
              >
                <div style={{ color: "var(--gold)" }}>{item.icon}</div>
                <div>
                  <div className="font-semibold text-sm mb-0.5">{item.title}</div>
                  <div className="text-xs" style={{ color: "var(--text-light)" }}>{item.desc}</div>
                </div>
                <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
