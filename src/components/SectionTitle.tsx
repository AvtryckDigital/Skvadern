import Link from "next/link";
import type { ReactNode } from "react";

export default function SectionTitle({
  eyebrow,
  title,
  href,
  link,
  action,
  className = "",
  id,
}: {
  eyebrow?: string;
  title: string;
  href?: string;
  link?: string;
  action?: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      className={`relative mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b pb-4 sm:mb-10 sm:pb-5 ${className}`}
      style={{ borderColor: "var(--border)" }}
    >
      <span
        className="absolute -bottom-px left-0 h-[2px] w-12"
        style={{ backgroundColor: "var(--gold)" }}
        aria-hidden
      />
      <div>
        {eyebrow && (
          <p
            className="text-xs uppercase tracking-[0.25em] mb-1.5 font-semibold"
            style={{ color: "var(--gold)" }}
          >
            {eyebrow}
          </p>
        )}
        <h2
          id={id}
          className="text-3xl sm:text-4xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif", color: "var(--text-dark)" }}
        >
          {title}
        </h2>
      </div>
      {action ? (
        action
      ) : href && link ? (
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] transition-colors"
          style={{ color: "var(--gold)" }}
        >
          <span>{link}</span>
          <span
            className="transition-transform group-hover:translate-x-1"
            aria-hidden
          >
            →
          </span>
        </Link>
      ) : null}
    </div>
  );
}
