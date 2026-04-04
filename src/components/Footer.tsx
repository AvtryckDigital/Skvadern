import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t mt-auto" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-subtle)" }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logotyp */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 relative flex-shrink-0">
                <Image
                  src="/images/cropped-Skvader-logo-v2-1.png"
                  alt="Skvaderns logotyp"
                  fill
                  className="object-contain"
                />
              </div>
              <span
                style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-dark)" }}
                className="text-base font-semibold"
              >
                Skvaderns Herrförening
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-light)" }}>
              En sällskaplig studentförening vid Norrlands nation i Uppsala,
              grundad 1950.
            </p>
          </div>

          {/* Snabblänkar */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-dark)" }}>
              Snabblänkar
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { href: "/", label: "Hem" },
                { href: "/evenemang", label: "Evenemang" },
                { href: "/historia", label: "Historia" },
                { href: "/bilder", label: "Bilder" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors duration-200 hover:text-black"
                    style={{ color: "var(--text-light)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--text-dark)" }}>
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "var(--text-light)" }}>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <span>Norrlands nation, Uppsala</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <a href="mailto:patron@skvadern.net" className="hover:text-black transition-colors">
                  patron@skvadern.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 text-center text-xs"
          style={{ borderTop: "1px solid var(--border)", color: "var(--text-light)" }}
        >
          © {new Date().getFullYear()} Skvaderns Herrförening. Grundad 1950.
        </div>
      </div>
    </footer>
  );
}
