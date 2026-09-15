"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const days = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const labels = ["fast leer", "sehr ruhig", "entspannt", "gut besucht", "volle Stunde"];
const tints = [
  "rgba(255,255,255,0.055)",
  "rgba(255,138,61,0.2)",
  "rgba(255,138,61,0.42)",
  "rgba(255,90,31,0.66)",
  "rgba(255,90,31,0.96)",
];

/** Typische Auslastung, als Erfahrungswerte hinterlegt. */
function level(day: number, hour: number) {
  const weekend = day >= 5;
  if (hour < 5) return hour === 4 ? 1 : 0;
  if (weekend) {
    if (hour < 9) return 1;
    if (hour < 13) return 3;
    if (hour < 20) return 2;
    return 1;
  }
  if (hour < 8) return 2;
  if (hour < 12) return 1;
  if (hour < 17) return 2;
  if (hour < 20) return 4;
  if (hour < 22) return 3;
  return 1;
}

export default function BusyChart() {
  const [cols, setCols] = useState(24);
  const [now, setNow] = useState<{ day: number; hour: number } | null>(null);
  const [hover, setHover] = useState<{ day: number; hour: number } | null>(null);
  const [shown, setShown] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const d = new Date();
    setNow({ day: (d.getDay() + 6) % 7, hour: d.getHours() });

    const pick = () =>
      setCols(window.innerWidth < 640 ? 8 : window.innerWidth < 1024 ? 12 : 24);
    pick();
    window.addEventListener("resize", pick);
    return () => window.removeEventListener("resize", pick);
  }, []);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e.some((x) => x.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = 24 / cols;
  // Bei weniger Spalten fassen wir Stunden zusammen und nehmen den vollsten Wert
  const cell = (day: number, col: number) => {
    let max = 0;
    for (let h = col * step; h < (col + 1) * step; h += 1) max = Math.max(max, level(day, h));
    return max;
  };
  const colHour = (col: number) => Math.round(col * step);
  const activeCol = (h: number) => Math.floor(h / step);

  const active = hover ?? (now ? { day: now.day, hour: now.hour } : null);
  const bestToday = now
    ? Array.from({ length: 24 }, (_, h) => h)
        .filter((h) => h > now.hour)
        .sort((a, b) => level(now.day, a) - level(now.day, b))[0]
    : null;

  return (
    <div ref={boxRef} className="glass sweep rounded-[26px] p-6 sm:p-9">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <span className="eyebrow">Auslastung</span>
          <h3 className="display-md mt-3">Wann ist es leer?</h3>
          <p className="mt-3 max-w-[46ch] text-[15px] text-mute">
            Weil rund um die Uhr geöffnet ist, findest du jeden Tag eine ruhige Stunde.
          </p>
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-faint">leer</span>
          {tints.map((t) => (
            <span key={t} className="h-3.5 w-5 rounded-[4px] sm:w-7" style={{ background: t }} />
          ))}
          <span className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-faint">voll</span>
        </div>
      </div>

      <div
        className="mt-7"
        role="img"
        aria-label="Typische Auslastung nach Wochentag und Uhrzeit. Nachts zwischen 23 und 5 Uhr fast leer, werktags zwischen 9 und 12 Uhr entspannt, werktags zwischen 17 und 20 Uhr am vollsten."
      >
        <div
          className="grid gap-[3px] pl-8 sm:pl-10"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {Array.from({ length: cols }).map((_, c) => (
            <span key={c} className="text-center text-[10px] font-bold text-faint">
              {cols >= 24 ? (c % 3 === 0 ? String(c).padStart(2, "0") : "") : String(colHour(c)).padStart(2, "0")}
            </span>
          ))}
        </div>

        {days.map((d, di) => (
          <div key={d} className="mt-[3px] flex items-center gap-[3px]">
            <span className="w-8 shrink-0 text-[12px] font-bold text-mute sm:w-10">{d}</span>
            <div
              className="grid flex-1 gap-[3px]"
              style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: cols }).map((_, c) => {
                const lv = cell(di, c);
                const isNow = now?.day === di && activeCol(now.hour) === c;
                return (
                  <span
                    key={c}
                    onMouseEnter={() => setHover({ day: di, hour: colHour(c) })}
                    onMouseLeave={() => setHover(null)}
                    className={`busy-cell h-6 rounded-[5px] sm:h-7 ${isNow ? "busy-now" : ""}`}
                    data-shown={shown}
                    style={{
                      background: tints[lv],
                      transitionDelay: `${(di * cols + c) * 5}ms`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex min-h-[30px] flex-wrap items-center gap-2.5 text-[14.5px]">
        {active ? (
          <>
            <span className="rounded-[999px] border border-white/14 bg-white/6 px-3.5 py-1.5 font-bold tabular-nums">
              {days[active.day]} {String(active.hour).padStart(2, "0")}:00
            </span>
            <span className="text-mute">{labels[level(active.day, active.hour)]}</span>
            {hover === null ? <span className="text-faint">gerade jetzt</span> : null}
          </>
        ) : null}
      </div>

      {bestToday !== null ? (
        <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[18px] border border-flame-500/25 bg-flame-500/8 p-4">
          <Icon name="sparkles" size={20} className="shrink-0 text-flame-400" />
          <p className="text-[15px]">
            Heute am ruhigsten ab{" "}
            <strong className="font-black tabular-nums">
              {String(bestToday).padStart(2, "0")}:00 Uhr
            </strong>
            . Als Mitglied kommst du genau dann.
          </p>
        </div>
      ) : null}
    </div>
  );
}
