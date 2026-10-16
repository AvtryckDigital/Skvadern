"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  Images,
  BookOpen,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { logout } from "@/app/login/actions";

const NAV_ITEMS = [
  {
    href: "/admin/evenemang",
    aliases: ["/admin"],
    label: "Evenemang",
    icon: CalendarDays,
  },
  {
    href: "/admin/bilder",
    aliases: [],
    label: "Galleri",
    icon: Images,
  },
  {
    href: "/admin/sangbok",
    aliases: [],
    label: "Sångbok",
    icon: BookOpen,
  },
  {
    href: "/admin/styrelsen",
    aliases: [],
    label: "Styrelsen",
    icon: Users,
  },
];

export default function AdminNav({ email }: { email: string }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (item: (typeof NAV_ITEMS)[0]) => {
    if (pathname === item.href) return true;
    if (item.aliases.includes(pathname)) return true;
    if (pathname.startsWith(item.href + "/")) return true;
    return false;
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        {/* Logo / Brand header */}
        <div
          className="p-6 border-b flex items-center gap-3.5"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="w-10 h-10 relative flex-shrink-0">
            <Image
              src="/images/cropped-Skvader-logo-v2-1.png"
              alt="Skvaderns logotyp"
              fill
              className="object-contain"
            />
          </div>
          <div>
            <div
              className="text-base font-semibold leading-tight tracking-wide"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "var(--text-dark)",
              }}
            >
              Skvadern
            </div>
            <div
              className="text-[0.65rem] font-semibold tracking-[0.25em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              Adminpanel
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="px-3 py-6">
          <p
            className="px-3 text-[0.68rem] font-semibold uppercase tracking-[0.2em] mb-2.5"
            style={{ color: "var(--text-light)" }}
          >
            Innehåll
          </p>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-sm font-medium transition-all duration-150"
                    style={{
                      backgroundColor: active
                        ? "rgba(201, 160, 80, 0.12)"
                        : "transparent",
                      color: active ? "var(--gold)" : "var(--text-mid)",
                      borderLeft: active
                        ? "3px solid var(--gold)"
                        : "3px solid transparent",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{
                        color: active ? "var(--gold)" : "var(--text-light)",
                      }}
                      aria-hidden
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Footer / Account section */}
      <div
        className="p-4 border-t space-y-2 text-xs"
        style={{ borderColor: "var(--border)" }}
      >
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2.5 px-3 py-2 rounded-sm transition-colors hover:bg-white/5"
          style={{ color: "var(--text-mid)" }}
        >
          <ExternalLink size={15} style={{ color: "var(--gold)" }} />
          <span>Visa hemsidan</span>
        </Link>

        {email && (
          <div
            className="px-3 py-1.5 truncate"
            style={{ color: "var(--text-light)" }}
            title={email}
          >
            Inloggad: {email}
          </div>
        )}

        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-sm transition-colors hover:bg-white/5 text-left"
            style={{ color: "var(--text-mid)" }}
          >
            <LogOut size={15} style={{ color: "#f87171" }} />
            <span>Logga ut</span>
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top header */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b lg:hidden"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-subtle)",
        }}
      >
        <Link href="/admin/evenemang" className="flex items-center gap-2.5">
          <div className="w-8 h-8 relative flex-shrink-0">
            <Image
              src="/images/cropped-Skvader-logo-v2-1.png"
              alt="Skvaderns logotyp"
              fill
              className="object-contain"
            />
          </div>
          <span
            className="font-bold text-lg"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--text-dark)",
            }}
          >
            Skvadern <span style={{ color: "var(--gold)", fontSize: "0.8rem", textTransform: "uppercase" }}>Admin</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          className="p-1.5"
          style={{ color: "var(--text-dark)" }}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          className="fixed inset-x-0 bottom-0 top-[65px] z-30 border-b overflow-y-auto lg:hidden"
          style={{
            backgroundColor: "var(--bg)",
          }}
        >
          {navContent}
        </div>
      )}

      {/* Desktop vertical sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r lg:flex"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-subtle)",
        }}
      >
        {navContent}
      </aside>
    </>
  );
}
