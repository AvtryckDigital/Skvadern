"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/evenemang", label: "Evenemang" },
  { href: "/historia", label: "Historia" },
  { href: "/bilder", label: "Bilder" },
  { href: "/kalender", label: "Kalender" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b" style={{ borderColor: "var(--border)" }}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-11 h-11 relative flex-shrink-0">
            <Image
              src="/images/cropped-Skvader-logo-v2-1.png"
              alt="Skvaderns logotyp"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div
              className="text-base font-semibold tracking-wide leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-dark)" }}
            >
              Skvaderns Hembygdsförening
            </div>
            <div
              className="text-xs tracking-widest uppercase leading-tight"
              style={{ color: "var(--gold)", fontSize: "0.6rem" }}
            >
              Norrlands nation · Uppsala
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs tracking-widest uppercase transition-colors duration-200 pb-px"
                style={{
                  color: active ? "var(--text-dark)" : "var(--text-light)",
                  borderBottom: active ? "1px solid var(--text-dark)" : "1px solid transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/bli-en-skvader"
            className="text-xs tracking-widest uppercase px-4 py-2 font-medium transition-all duration-200"
            style={{
              backgroundColor: pathname === "/bli-en-skvader" ? "var(--gold-light)" : "var(--gold)",
              color: "var(--bg)",
            }}
          >
            Bli en Skvader
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Öppna meny"
          style={{ color: "var(--text-dark)" }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 border-t" style={{ borderColor: "var(--border)" }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-xs tracking-widest uppercase border-b"
              style={{
                color: pathname === link.href ? "var(--text-dark)" : "var(--text-light)",
                borderColor: "var(--border)",
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/bli-en-skvader"
            onClick={() => setMenuOpen(false)}
            className="block mt-3 py-3 px-4 text-xs tracking-widest uppercase text-center font-medium"
            style={{
              backgroundColor: "var(--gold)",
              color: "var(--bg)",
            }}
          >
            Bli en Skvader
          </Link>
        </div>
      )}
    </header>
  );
}
