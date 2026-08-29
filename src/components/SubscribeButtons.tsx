"use client";

import { useEffect, useState } from "react";
import { CalendarPlus, Smartphone } from "lucide-react";

export function SubscribeButtons() {
  const [domain, setDomain] = useState("");

  useEffect(() => {
    setDomain(window.location.host);
  }, []);

  if (!domain) return null;

  const webcalUrl = `webcal://${domain}/api/calendar`;
  const googleCalUrl = `https://calendar.google.com/calendar/render?cid=${encodeURIComponent(webcalUrl)}`;

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <a
        href={webcalUrl}
        className="flex items-center justify-center gap-2 px-6 py-3 border text-sm uppercase tracking-widest hover:bg-[var(--gold)] hover:text-white transition-colors"
        style={{ borderColor: "var(--gold)", color: "var(--gold)", backgroundColor: "transparent" }}
      >
        <Smartphone size={18} />
        iPhone / Apple
      </a>
      <a
        href={googleCalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-3 border text-sm uppercase tracking-widest hover:bg-[var(--gold)] hover:text-white transition-colors"
        style={{ borderColor: "var(--gold)", color: "var(--gold)", backgroundColor: "transparent" }}
      >
        <CalendarPlus size={18} />
        Android / Google
      </a>
    </div>
  );
}
