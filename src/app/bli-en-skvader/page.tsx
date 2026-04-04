export default function BliEnSkvader() {
  return (
    <div style={{ backgroundColor: "var(--bg)" }}>
      {/* Header */}
      <section className="py-20 px-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "var(--gold)" }}>
            Välkommen in
          </p>
          <h1
            className="text-5xl font-bold mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bli en Skvader
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            <em>
              Är du student på Uppsala Universitet och bär 
              Medelpads färger i hjärtat? Då kan du vara en av oss.
            </em>
          </p>
        </div>
      </section>

      {/* Info */}
      <section className="py-16 px-6 border-b" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
            Vem kan bli Skvader?
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kriterier för medlemskap
          </h2>
          <div className="w-10 h-px mb-8" style={{ backgroundColor: "var(--gold)" }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                num: "I",
                title: "Student vid Uppsala Universitet",
                desc: "Föreningen är knuten till Norrlands Nation i Uppsala. Du bör även vara inskriven som student vid Norrlands nation.",
              },
              {
                num: "II",
                title: "Anknytning till Medelpad",
                desc: "Antingen härstammar du från Medelpad, eller så kan du färgerna i Medelpads flagga — inga geografiska inskränkningar gäller.",
              },
              {
                num: "III",
                title: "Vilja att bidra",
                desc: "En Skvader engagerar sig i föreningen och i dess bröder. Vi söker dig som värdesätter kamratskap, vältalighet och elegans.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="p-6 border"
                style={{ borderColor: "var(--border)", borderTop: "2px solid var(--gold)" }}
              >
                <div
                  className="text-4xl font-bold mb-3 opacity-20"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.num}
                </div>
                <h3
                  className="text-base font-semibold mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-mid)" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-sm leading-relaxed"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-mid)" }}
          >
            Nya Skvadrar antas formellt vid ett SkvaderSpel. Om du är intresserad så kan du skicka ett meddelande i formuläret nedan.  <br />Broder Nitare
            återkommer till dig med mer information.
          </p>
        </div>
      </section>

      {/* Contact form */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: "var(--gold)" }}>
            Intresseanmälan
          </p>
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Skriv till oss
          </h2>
          <div className="w-10 h-px mb-8" style={{ backgroundColor: "var(--gold)" }} />

          <form
            name="bli-skvader"
            method="POST"
            data-netlify="true"
            className="flex flex-col gap-5"
          >
            <input type="hidden" name="form-name" value="bli-skvader" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="namn"
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-light)" }}
                >
                  Namn
                </label>
                <input
                  id="namn"
                  name="namn"
                  type="text"
                  required
                  placeholder="Ditt fullständiga namn"
                  className="px-4 py-3 text-sm border bg-transparent outline-none focus:border-[var(--gold)] placeholder-[var(--text-light)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-dark)",
                    backgroundColor: "var(--bg-subtle)",
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="epost"
                  className="text-xs uppercase tracking-widest"
                  style={{ color: "var(--text-light)" }}
                >
                  E-post
                </label>
                <input
                  id="epost"
                  name="epost"
                  type="email"
                  required
                  placeholder="din@epost.se"
                  className="px-4 py-3 text-sm border bg-transparent outline-none focus:border-[var(--gold)] placeholder-[var(--text-light)]"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--text-dark)",
                    backgroundColor: "var(--bg-subtle)",
                  }}
                />
              </div>
            </div>

     

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="meddelande"
                className="text-xs uppercase tracking-widest"
                style={{ color: "var(--text-light)" }}
              >
                Meddelande
              </label>
              <textarea
                id="meddelande"
                name="meddelande"
                rows={5}
                required
                placeholder="Är du intresserad av föreningen? Vill du närvara på ett spel eller en samsittning? Undrar du över något?"
                className="px-4 py-3 text-sm border bg-transparent outline-none resize-none focus:border-[var(--gold)] placeholder-[var(--text-light)]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-dark)",
                  backgroundColor: "var(--bg-subtle)",
                }}
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: "var(--gold)",
                  color: "var(--bg)",
                }}
              >
                Skicka meddelande
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
