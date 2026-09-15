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
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div
        className="glass-strong mx-3 mb-3 flex items-center gap-2 rounded-[999px] p-2"
        style={{ marginBottom: "calc(12px + env(safe-area-inset-bottom, 0px))" }}
      >
        <a
          href={`tel:${site.contact.phone}`}
          className="flex flex-1 items-center justify-center gap-2 rounded-[999px] border border-white/14 bg-white/5 px-4 py-3 text-[15px] font-bold"
        >
          <Icon name="phone" size={17} />
          Anrufen
        </a>
        <Link
          href={onTrial ? "/kontakt/" : "/probetraining/"}
          className="flex flex-1 items-center justify-center gap-2 rounded-[999px] bg-gradient-to-br from-flame-400 to-flame-500 px-4 py-3 text-[15px] font-extrabold text-ink-950"
        >
          {onTrial ? "Kontakt" : "Probetraining"}
          <Icon name="arrowRight" size={17} strokeWidth={2.2} />
        </Link>
      </div>
    </div>
  );
}
