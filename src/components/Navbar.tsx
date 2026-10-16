"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Hem" },
  { href: "/evenemang", label: "Evenemang" },
  { href: "/historia", label: "Historia" },
  { href: "/styrelsen", label: "Styrelsen" },
  { href: "/galleri", label: "Galleri" },
  { href: "/kalender", label: "Kalendarium" },
  { href: "/sangbok", label: "Sångbok" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

const linkBase =
  "relative block px-3 py-2 text-[0.85rem] font-medium tracking-[0.08em] uppercase transition-colors whitespace-nowrap";

function ActiveBar() {
  return (
    <span
      className="absolute inset-x-3 -bottom-[14px] h-[2px] bg-[#c5a059]"
      aria-hidden
    />
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMobile = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#c5a059]/25">
      {/* Blur på eget lager så backdrop-filter inte låser den fasta mobilmenyn */}
      <div
        className="absolute inset-x-0 top-0 -bottom-px -z-10 bg-[#12100E]/95 backdrop-blur supports-[backdrop-filter]:bg-[#12100E]/90"
        aria-hidden
      />
      <div className="mx-auto flex h-[4.75rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand / Logo + Text */}
        <Link
          href="/"
          onClick={closeMobile}
          className="group flex items-center gap-3 shrink-0 min-w-0"
          aria-label="Skvaderns Hembygdsförening, till startsidan"
        >
          <div className="w-10 h-10 relative shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/images/cropped-Skvader-logo-v2-1.png"
              alt="Skvaderns logotyp"
              fill
              className="object-contain"
            />
          </div>
          <div className="min-w-0">
            <span className="block font-display text-[1.05rem] min-[390px]:text-[1.65rem] sm:text-[1.35rem] lg:text-[1.95rem] font-semibold leading-tight tracking-wide text-[#fbf8f2] whitespace-nowrap">
              Skvadern
            </span>
            <span className="block font-serif text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.2em] sm:tracking-[0.22em] text-[#dfbe76] leading-none mt-1 whitespace-nowrap">
              Norrlands nation
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav aria-label="Huvudmeny" className="hidden lg:flex items-center gap-1 shrink-0">
          <ul className="flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`${linkBase} ${
                      active
                        ? "text-[#dfbe76]"
                        : "text-[#d6cdbd] hover:text-[#f8edd6]"
                    }`}
                  >
                    {item.label}
                    {active && <ActiveBar />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/bli-en-skvader"
            className="ml-3 shrink-0 inline-flex items-center justify-center px-4 py-2 text-[0.82rem] font-medium uppercase tracking-[0.08em] whitespace-nowrap transition-colors duration-200"
            style={{
              backgroundColor:
                pathname === "/bli-en-skvader"
                  ? "var(--gold-light)"
                  : "var(--gold)",
              color: "var(--bg)",
            }}
          >
            Bli en Skvader
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="-mr-2 rounded-md p-2 text-[#e2d8c6] hover:text-[#dfbe76] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobilmeny"
          aria-label={menuOpen ? "Stäng menyn" : "Öppna menyn"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav
          id="mobilmeny"
          aria-label="Huvudmeny"
          className="fixed inset-x-0 bottom-0 top-[4.75rem] overflow-y-auto border-t border-[#c5a059]/20 bg-[#12100E] px-4 pb-10 pt-4 lg:hidden"
        >
          <ul className="mx-auto max-w-md divide-y divide-[#c5a059]/15">
            {navLinks.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="py-1.5">
                  <Link
                    href={item.href}
                    onClick={closeMobile}
                    className={`block px-3 py-2.5 text-[0.85rem] font-medium uppercase tracking-[0.08em] transition-colors ${
                      active
                        ? "text-[#dfbe76] font-semibold"
                        : "text-[#d6cdbd] hover:text-[#f8edd6]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-4">
              <Link
                href="/bli-en-skvader"
                onClick={closeMobile}
                className="block w-full py-3 px-4 text-center text-[0.82rem] font-medium uppercase tracking-[0.08em] transition-colors"
                style={{
                  backgroundColor:
                    pathname === "/bli-en-skvader"
                      ? "var(--gold-light)"
                      : "var(--gold)",
                  color: "var(--bg)",
                }}
              >
                Bli en Skvader
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
