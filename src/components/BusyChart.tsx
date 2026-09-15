"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

/** Typische Auslastung, als Erfahrungswerte hinterlegt. */
function level(day: number, hour: number) {
  const weekend = day >= 5;
  if (hour < 5) return hour === 4 ? 1 : 0;
  if (weekend) {
    if (hour < 9) return 1;
    if (hour < 13) return 3;
    if (hour < 17) return 2;
    if (hour < 20) return 2;
    return 1;
  }
  if (hour < 8) return 2;
  if (hour < 12) return 1;
  if (hour < 14) return 2;
  if (hour < 17) return 2;
  if (hour < 20) return 4;
  if (hour < 22) return 3;
  return 1;
}

const labels = ["fast leer", "sehr ruhig", "entspannt", "gut besucht", "volle Stunde"];
const tints = [
  "rgba(255,255,255,0.05)",
  "rgba(255,138,61,0.18)",
  "rgba(255,138,61,0.38)",
  "rgba(255,90,31,0.62)",
  "rgba(255,90,31,0.95)",
];

export default function BusyChart() {
  const [now, setNow] = useState<{ day: number; hour: number } | null>(null);
  const [hover, setHover] = useState<{ day: number; hour: number } | null>(null);

  useEffect(() => {
    const d = new Date();
    // Montag als erster Tag
    setNow({ day: (d.getDay() + 6) % 7, hour: d.getHours() });
  }, []);

  const active = hover ?? now;

  return (
    <div className="glass sweep rounded-[26px] p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="eyebrow">Auslastung</span>
          <h3 className="display-md mt-3">Wann ist es leer?</h3>
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-faint">leer</span>
          {tints.map((t) => (
            <span key={t} className="h-3.5 w-6 rounded-[4px]" style={{ background: t }} />
          ))}
          <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-faint">voll</span>
        </div>
      </div>

      <div
        className="mt-6 overflow-x-auto rounded-[12px]"
        tabIndex={0}
        role="img"
        aria-label="Typische Auslastung nach Wochentag und Uhrzeit. Nachts zwischen 23 und 5 Uhr fast leer, werktags zwischen 9 und 12 Uhr entspannt, werktags zwischen 17 und 20 Uhr am vollsten."
      >
        <div className="min-w-[620px]">
          <div className="flex gap-[3px] pl-9">
            {Array.from({ length: 24 }).map((_, h) => (
              <span
                key={h}
                className="flex-1 text-center text-[10px] font-bold text-faint"
                style={{ opacity: h % 3 === 0 ? 1 : 0 }}
              >
                {String(h).padStart(2, "0")}
              </span>
            ))}
          </div>

          {days.map((d, di) => (
            <div key={d} className="mt-[3px] flex items-center gap-[3px]">
              <span className="w-9 shrink-0 text-[12px] font-bold text-mute">{d}</span>
              {Array.from({ length: 24 }).map((_, h) => {
                const lv = level(di, h);
                const isNow = now?.day === di && now?.hour === h;
                return (
                  <span
                    key={h}
                    onMouseEnter={() => setHover({ day: di, hour: h })}
                    onMouseLeave={() => setHover(null)}
                    className={`h-6 flex-1 rounded-[4px] transition-transform duration-200 hover:scale-[1.35] ${
                      isNow ? "ring-2 ring-chalk ring-offset-2 ring-offset-transparent" : ""
                    }`}
                    style={{ background: tints[lv] }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex min-h-[26px] flex-wrap items-center gap-2.5 text-[14.5px]">
        {active ? (
          <>
            <span className="rounded-[999px] border border-white/14 bg-white/6 px-3 py-1.5 font-bold">
              {days[active.day]} {String(active.hour).padStart(2, "0")}:00
            </span>
            <span className="text-mute">{labels[level(active.day, active.hour)]}</span>
            {hover === null && now ? (
              <span className="text-faint">(gerade jetzt)</span>
            ) : null}
          </>
        ) : null}
      </div>

      <ul className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { icon: "flame" as const, t: "Fast leer", d: "Nachts zwischen 23 und 5 Uhr" },
          { icon: "sun" as const, t: "Entspannt", d: "Werktags zwischen 9 und 12 Uhr" },
          { icon: "users" as const, t: "Am vollsten", d: "Werktags zwischen 17 und 20 Uhr" },
        ].map((x) => (
          <li key={x.t} className="flex items-start gap-3 rounded-[16px] border border-white/10 bg-white/4 p-4">
            <Icon name={x.icon} size={19} className="mt-0.5 shrink-0 text-flame-400" />
            <span>
              <span className="block text-[15px] font-bold">{x.t}</span>
              <span className="block text-[14px] text-mute">{x.d}</span>
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[13px] text-faint">
        Erfahrungswerte aus dem Studioalltag. Weil rund um die Uhr geöffnet ist, verteilen sich die
        Mitglieder deutlich stärker als in Studios mit festen Zeiten.
      </p>
    </div>
  );
}
