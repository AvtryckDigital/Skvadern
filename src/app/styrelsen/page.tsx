import { Mail, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBoardMembers } from "@/lib/board";

export const metadata = {
  title: "Styrelsen | Skvaderns Hembygdsförening",
  description:
    "Skvaderns ämbetsmän och styrelse vid Norrlands nation i Uppsala.",
};

export default async function StyrelsenPage() {
  const board = await getBoardMembers();

  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero Header */}
      <section
        className="relative border-b py-20 px-6"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="eyebrow mb-3">Föreningens ledning</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-[#F4ECE1]">
            Styrelsen
          </h1>
          <p className="editorial-text text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-[#CFC4B4]">
            <em>
              Skvaderns ämbetsmän leder föreningens arbete, sammankallar till de
              anrika SkvaderSpelen och förvaltar brödraskapets traditioner vid
              Norrlands nation.
            </em>
          </p>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        {/* Sektionsrubrik */}
        <div
          className="relative mb-10 sm:mb-12 flex flex-wrap items-baseline justify-between gap-4 border-b pb-4 sm:pb-5"
          style={{ borderColor: "var(--border)" }}
        >
          <span
            className="absolute -bottom-px left-0 h-[2px] w-12"
            style={{ backgroundColor: "var(--gold)" }}
            aria-hidden
          />
          <div>
            <p className="eyebrow mb-1.5">Ämbetsmän</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F4ECE1]">
              Styrelsemedlemmar
            </h2>
          </div>
          <span className="font-serif text-xs italic text-[#B0A494]">
            Verksamhetsåret 2025/2026
          </span>
        </div>

        {/* Medlemskort */}
        {board.length === 0 ? (
          <div
            className="oxford-frame rounded-sm border p-12 text-center"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--bg-subtle)",
            }}
          >
            <h3 className="font-display text-2xl font-bold mb-2 text-[#F4ECE1]">
              Styrelsen presenteras inom kort
            </h3>
            <p className="editorial-text text-sm">
              Ämbetsmännen för det nuvarande verksamhetsåret uppdateras inom kort.
            </p>
          </div>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {board.map((m) => (
              <li
                key={m.id}
                className="oxford-frame group relative flex flex-col justify-between overflow-hidden rounded-sm border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--surface)",
                }}
              >
                <div>
                  {/* Porträtt eller klassiskt emblem-kort */}
                  {m.image ? (
                    <div
                      className="mb-5 aspect-[4/5] w-full overflow-hidden rounded-sm border p-1 shadow-inner"
                      style={{
                        borderColor: "rgba(201, 160, 80, 0.25)",
                        backgroundColor: "var(--bg)",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.image}
                        alt={m.name}
                        className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div
                      className="mb-5 aspect-[4/5] w-full overflow-hidden rounded-sm border p-2 flex flex-col items-center justify-center relative transition-colors group-hover:border-[#c5a059]/50"
                      style={{
                        borderColor: "rgba(201, 160, 80, 0.20)",
                        backgroundColor: "var(--bg)",
                      }}
                    >
                      <div className="absolute inset-2 border border-[#c5a059]/10 pointer-events-none" />
                      <div className="w-14 h-14 relative mb-3 opacity-80 group-hover:opacity-100 transition-opacity">
                        <Image
                          src="/images/cropped-Skvader-logo-v2-1.png"
                          alt="Skvaderns emblem"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-center px-4">
                        <span className="font-serif text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[#dfbe76] block mb-1">
                          Skvaderns Herrförening
                        </span>
                        <span className="font-serif text-xs italic text-[#CFC4B4]/70">
                          {m.role}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Rollbeskrivning och mail-ikon */}
                  <div className="flex items-start justify-between gap-3">
                    {m.role_description ? (
                      <span className="font-display text-[0.85rem] font-bold uppercase tracking-[0.18em] text-[#dfbe76]">
                        {m.role_description}
                      </span>
                    ) : (
                      <span />
                    )}
                    {m.email && (
                      <a
                        href={`mailto:${m.email}`}
                        className="text-[#B0A494] transition-colors hover:text-[#dfbe76]"
                        title={`Maila ${m.role}`}
                      >
                        <Mail size={16} aria-hidden />
                      </a>
                    )}
                  </div>

                  {/* Rolltitel */}
                  <h3 className="mt-1.5 font-display text-2xl font-bold text-[#F4ECE1] transition-colors group-hover:text-[#dfbe76]">
                    {m.role}
                  </h3>

                  {/* Medlemmens namn */}
                  <p className="mt-1 font-serif text-[1.05rem] italic text-[#CFC4B4]">
                    {m.name}
                  </p>
                </div>

                {/* Mail-länk i nederkant */}
                {m.email && (
                  <div
                    className="mt-5 border-t pt-3"
                    style={{ borderColor: "rgba(201, 160, 80, 0.20)" }}
                  >
                    <a
                      href={`mailto:${m.email}`}
                      className="font-serif text-xs text-[#B0A494] underline decoration-[#c5a059]/30 underline-offset-4 hover:text-[#dfbe76]"
                    >
                      {m.email}
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Kontaktsektion */}
        <div
          className="mt-16 oxford-frame rounded-sm border p-8 sm:p-10 text-center"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--surface)",
          }}
        >
          <p className="eyebrow mb-2">Frågor eller ärenden</p>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F4ECE1] mb-3">
            Kontakta styrelsen
          </h3>
          <div
            className="w-10 h-px mb-5 mx-auto"
            style={{ backgroundColor: "var(--gold)" }}
          />
          <p className="editorial-text text-sm sm:text-base max-w-xl mx-auto mb-6 text-[#CFC4B4]">
            Vill du komma i kontakt med föreningen, ställa frågor om medlemskap eller är intresserad av ett samarbete? Skicka ett mail till oss så återkommer vi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:patron@skvadern.net"
              className="inline-flex items-center gap-2 border border-[#c5a059] px-6 py-3 text-xs font-medium tracking-[0.12em] text-[#dfbe76] hover:bg-[#c5a059] hover:text-[#12100E] transition-colors"
            >
              <Mail size={16} />
              <span>patron@skvadern.net</span>
            </a>
            <Link
              href="/bli-en-skvader"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase font-medium tracking-[0.12em] transition-colors"
              style={{
                backgroundColor: "var(--gold)",
                color: "var(--bg)",
              }}
            >
              <ShieldCheck size={16} />
              <span>Bli en Skvader</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
