"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { site } from "@/lib/site";

/** Dauerhafte Aktionsleiste am unteren Rand, nur auf kleinen Displays. */
export default function MobileActionBar() {
  const pathname = usePathname();
  const onTrial = pathname.startsWith("/probetraining");

  return (
    <nav
      aria-label="Schnellzugriff"
      className="fixed inset-x-0 bottom-0 z-40 md:hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] bg-gradient-to-t from-ink-950 via-ink-950/85 to-transparent"
      />
      <div
        className="glass-strong relative mx-3 flex items-center gap-2 rounded-[999px] p-2"
        style={{ marginBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
      >
        <a
          href={`tel:${site.contact.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-[999px] border border-white/18 bg-white/8 px-4 py-3 text-[15px] font-bold"
        >
          <Icon name="phone" size={17} />
          Anrufen
        </a>
        {onTrial ? (
          <a
            href="#anfrage"
            className="flex flex-1 items-center justify-center gap-2 rounded-[999px] bg-gradient-to-br from-flame-400 to-flame-500 px-4 py-3 text-[15px] font-extrabold text-[#160702]"
          >
            Zum Formular
            <Icon name="arrowRight" size={17} strokeWidth={2.2} />
          </a>
        ) : (
          <Link
            href="/probetraining/"
            className="flex flex-1 items-center justify-center gap-2 rounded-[999px] bg-gradient-to-br from-flame-400 to-flame-500 px-4 py-3 text-[15px] font-extrabold text-[#160702]"
          >
            Probetraining
            <Icon name="arrowRight" size={17} strokeWidth={2.2} />
          </Link>
        )}
      </div>
    </nav>
  );
}
