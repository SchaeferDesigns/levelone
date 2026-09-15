import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { preis, tarife } from "@/lib/tarife";

export default function TarifCards({ compact = false }: { compact?: boolean }) {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      {tarife.map((t, i) => (
        <Reveal key={t.key} delay={i * 80} className="h-full">
          <div
            className={`glass sweep card card-hover relative flex h-full flex-col ${
              t.highlight ? "ring-1 ring-flame-500/45" : ""
            }`}
          >
            {t.badge ? (
              <span className="absolute -top-3 left-6 rounded-[999px] bg-gradient-to-br from-flame-400 to-flame-500 px-3.5 py-1 text-[12px] font-black text-[#160702]">
                {t.badge}
              </span>
            ) : null}

            <h3 className="text-[13px] font-bold uppercase tracking-[0.16em] text-faint">
              {t.name}
            </h3>
            <p className="mt-3 flex items-baseline gap-1.5">
              <span className="text-[44px] font-black leading-none tracking-tight tabular-nums">
                {preis(t.monat)}
              </span>
              <span className="text-[19px] font-bold text-mute">€</span>
              <span className="text-[14px] text-faint">pro Monat</span>
            </p>

            <ul className="mt-6 flex flex-1 flex-col gap-2.5 text-[15px]">
              {[t.laufzeit, t.kuendigung, t.aufnahme === 0 ? "Keine Aufnahmegebühr" : `Aufnahme ${preis(t.aufnahme)} €`, ...t.extras].map(
                (x) => (
                  <li key={x} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-flame-500/18 text-flame-400">
                      <Icon name="check" size={12} strokeWidth={3} />
                    </span>
                    {x}
                  </li>
                ),
              )}
            </ul>

            <Link
              href={`/mitglied-werden/?tarif=${t.key}`}
              className={`btn mt-7 w-full ${t.highlight ? "btn-primary" : "btn-ghost"}`}
            >
              {t.name} wählen
              <Icon name="arrowRight" size={18} strokeWidth={2.1} />
            </Link>
          </div>
        </Reveal>
      ))}

      {compact ? null : (
        <p className="text-[13px] text-faint lg:col-span-3">
          Alle Beträge sind Beispielwerte für diese Vorschau und werden vor dem Livegang durch die
          echten Konditionen ersetzt.
        </p>
      )}
    </div>
  );
}
