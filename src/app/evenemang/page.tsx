import Image from "next/image";

export default function Evenemang() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Hero */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/patron_evenemang.jpg"
          alt="Evenemang"
          fill
          className="object-cover object-[50%_60%]" //justera första % för horisontell, andra % för vertikal
          priority
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-5xl font-bold text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Evenemang
          </h1>
        </div>
      </section>

      {/* Vår verksamhet */}
      <section className="py-16 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
            Vår verksamhet
          </p>
          <p
            className="text-lg leading-relaxed"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Kärnan i Skvaderns verksamhet är de beryktade Skvaderspelen. Där får bröderna,
            efter en ljuvlig måltid tillagad av Br. Barkborre och Br. Pinnpojke, slipa på sin
            retoriska förmåga inför Patron. Förutom Spelen avnjuter även herrföreningarna
            sällskapet av nationens damföreningar på diverse samsittningar. De bröder som
            arbetat hårt för föreningen, och kanhända framförallt under Skvaderdam, har även
            möjlighet att få följa med på föreningens beryktade kulturresa.
          </p>
        </div>
      </section>

      {/* Skvaderspelet */}
      <section id="skvaderspel" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--gold)" }}>
            Årsåterkommande
          </p>
          <h2
            className="text-4xl font-bold mb-3"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Vad innebär SkvaderSpel?
          </h2>
          <div className="w-10 h-px mb-6" style={{ backgroundColor: "var(--gold)" }} />
          <p
            className="text-base leading-relaxed mb-12 max-w-2xl"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Ett SkvaderSpel består av tre faser varav det börjar med en middag. Bröderna
            förbereder sig inför kommande debatter medan matkordinatorerna presenterar rätterna
            och sjunger &ldquo;Var Skvader&rdquo; när maten bärs in.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: "I",
                title: "Middagen",
                desc: "Kvällen inleds med en middag tillagad av föreningens egna bröder. Gemensam sång hörs när rätterna bärs in, och bröderna förbereder sig inför kommande debatter.",
              },
              {
                num: "II",
                title: "Förhandlingarna",
                desc: 'När faten roddats undan och podiet utsmyckats tar Spelets nästa fas vid. Formella debatter hålls inför Patron — talarna tilltalat "Patron, bröder, bröder Skvadrar, ärade gäster". Patron kan tilldela störande bröder böter, och kniviga frågor kan remitteras till utskott som arbetat oförtruet vidare i 75 år utan att nå en slutsats.',
              },
              {
                num: "III",
                title: "Avslutning",
                desc: "Under slutfasen, då Patron förklarar Spelet avslutat, umgås bröderna med varandra och med gäster från närstående föreningar. De flitigaste bröderna kan bli inbjudna till det årliga Skvaderdam.",
              },
            ].map((phase) => (
              <div
                key={phase.num}
                className="p-6 border"
                style={{ borderColor: "var(--border)", borderTop: "2px solid var(--gold)" }}
              >
                <div
                  className="text-4xl font-bold mb-3 opacity-20"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {phase.num}
                </div>
                <h3
                  className="text-lg font-semibold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {phase.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Samsittningar */}
      <section id="samsittningar" className="py-20 px-6 border-t" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-64 overflow-hidden">
            <Image
              src="/images/samsittning-rymden-ypsilon-e1695761490430.jpg"
              alt="Samsittning"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--gold)" }}>
              Socialt
            </p>
            <h2
              className="text-3xl font-bold mb-3"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Samsittningar
            </h2>
            <div className="w-10 h-px mb-5" style={{ backgroundColor: "var(--gold)" }} />
            <p className="leading-relaxed text-sm mb-3" style={{ color: "var(--text-mid)" }}>
              En Skvader trivs bäst i gott sällskap. Med utsökt mat och dryck avnjuter vi
              ofta kvällstimmarna tillsammans med de andra sociala föreningarna på nationen.
            </p>
            <p className="leading-relaxed text-sm" style={{ color: "var(--text-mid)" }}>
              Dessa tillställningar speglar föreningens övertygelse om att gott
              kamratskap inte stannar vid föreningens egna bröder.
            </p>
          </div>
        </div>
      </section>

      {/* Öfvriga tillställningar */}
      <section id="ofvriga" className="py-20 px-6 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: "var(--gold)" }}>
              Med mera
            </p>
            <h2
              className="text-3xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Öfvriga tillställningar
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
            {[
              { icon: "🗺️", title: "Kulturresa", desc: "De bröder som arbetat hårt för föreningen, och kanhända framförallt under Skvaderdam, har möjlighet att få följa med på föreningens beryktade kulturresa." },
              { icon: "🎙️", title: "Öfvriga aktiviteter", desc: "En skvader är ett mångfacetterat djur som gillar att ägna sig åt alla typer av stimulerande aktiviteter." },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 border"
                style={{ borderColor: "var(--border)" }}
              >
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-mid)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
