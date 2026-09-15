"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

type Plate = { kg: number; w: number; h: number; color: string; label: string };

const PLATES: Plate[] = [
  { kg: 20, w: 30, h: 200, color: "#ff5a1f", label: "20" },
  { kg: 15, w: 26, h: 172, color: "#ff8a3d", label: "15" },
  { kg: 10, w: 22, h: 146, color: "#ffb35c", label: "10" },
  { kg: 5, w: 18, h: 116, color: "#c3ccd8", label: "5" },
  { kg: 2.5, w: 14, h: 92, color: "#8d97a5", label: "2,5" },
  { kg: 1.25, w: 11, h: 74, color: "#5d6775", label: "1,25" },
];

const BAR_KG = 20;
const MAX_PER_SIDE = 6;

const marks = [
  { kg: 40, text: "Typischer Start beim Kreuzheben" },
  { kg: 60, text: "Nach ein paar Monaten oft in Reichweite" },
  { kg: 100, text: "Ein Ziel, das viele bei uns erreichen" },
];

/**
 * Kleines Werkzeug zum Ausprobieren: Scheiben auf die Stange legen und sehen,
 * was zusammenkommt. Antippen legt auf, Ziehen geht auch, ein Klick auf eine
 * Scheibe auf der Stange nimmt sie wieder herunter.
 */
export default function PlateLab() {
  const [loaded, setLoaded] = useState<number[]>([20, 10]);
  const [drag, setDrag] = useState<{ kg: number; x: number; y: number } | null>(null);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const total = BAR_KG + loaded.reduce((a, b) => a + b, 0) * 2;
  const reached = marks.filter((m) => total >= m.kg).pop();

  const add = useCallback((kg: number) => {
    setLoaded((prev) => {
      if (prev.length >= MAX_PER_SIDE) return prev;
      return [...prev, kg].sort((a, b) => b - a);
    });
  }, []);

  const removeAt = useCallback((i: number) => {
    setLoaded((prev) => prev.filter((_, n) => n !== i));
  }, []);

  /* Ziehen mit Maus oder Finger */
  useEffect(() => {
    if (!drag) return;
    const move = (e: PointerEvent) => setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY } : d));
    const up = (e: PointerEvent) => {
      const zone = dropRef.current?.getBoundingClientRect();
      if (
        zone &&
        e.clientX >= zone.left &&
        e.clientX <= zone.right &&
        e.clientY >= zone.top &&
        e.clientY <= zone.bottom
      ) {
        add(drag.kg);
      }
      setDrag(null);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [drag, add]);

  // Aufbau der Scheiben von der Stangenmitte nach aussen
  let offset = 0;
  const placed = loaded.map((kg, i) => {
    const spec = PLATES.find((p) => p.kg === kg) ?? PLATES[0];
    const x = offset;
    offset += spec.w + 3;
    return { i, kg, spec, x };
  });

  const full = loaded.length >= MAX_PER_SIDE;

  return (
    <div className="glass-strong sweep rounded-[28px] p-6 sm:p-9">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow">Zum Ausprobieren</span>
          <h3 className="display-md mt-3">Leg auf, was du schaffst</h3>
        </div>
        <div className="text-right">
          <p className="text-[clamp(2.4rem,6vw,3.6rem)] font-black leading-none tracking-tight tabular-nums flame-text">
            {total.toLocaleString("de-DE")} kg
          </p>
          <p className="mt-1 text-[12.5px] font-bold uppercase tracking-[0.14em] text-faint">
            Stange plus Scheiben
          </p>
        </div>
      </div>

      {/* Stange */}
      <div
        ref={dropRef}
        className={`relative mt-6 rounded-[20px] border border-dashed p-2 transition-colors duration-300 ${
          drag ? "border-flame-400/70 bg-flame-500/8" : "border-white/12"
        }`}
      >
        <svg viewBox="0 0 1000 260" className="w-full" role="img" aria-label={`Langhantel mit ${total} Kilogramm`}>
          <rect x="120" y="120" width="760" height="20" rx="10" fill="rgba(244,247,251,0.85)" />
          <rect x="300" y="112" width="8" height="36" rx="4" fill="rgba(5,7,10,0.45)" />
          <rect x="692" y="112" width="8" height="36" rx="4" fill="rgba(5,7,10,0.45)" />

          {placed.map(({ i, spec, x }) => (
            <g key={`${i}-${spec.kg}`}>
              {/* linke Seite */}
              <rect
                x={296 - x - spec.w}
                y={130 - spec.h / 2}
                width={spec.w}
                height={spec.h}
                rx={Math.min(10, spec.w / 2.4)}
                fill={spec.color}
                className="plate-in"
              />
              {/* rechte Seite */}
              <rect
                x={704 + x}
                y={130 - spec.h / 2}
                width={spec.w}
                height={spec.h}
                rx={Math.min(10, spec.w / 2.4)}
                fill={spec.color}
                className="plate-in"
              />
            </g>
          ))}
        </svg>

        {/* Scheiben zum Herunternehmen */}
        {loaded.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2 px-2 pb-2">
            <span className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-faint">
              Je Seite
            </span>
            {loaded.map((kg, i) => (
              <button
                key={`${kg}-${i}`}
                type="button"
                onClick={() => removeAt(i)}
                className="inline-flex items-center gap-1.5 rounded-[999px] border border-white/14 bg-white/6 px-3 py-1.5 text-[13px] font-bold transition-colors hover:border-flame-400/60 hover:bg-flame-500/12"
                aria-label={`${String(kg).replace(".", ",")} Kilogramm herunternehmen`}
              >
                {String(kg).replace(".", ",")} kg
                <Icon name="close" size={12} strokeWidth={2.6} />
              </button>
            ))}
          </div>
        ) : (
          <p className="px-2 pb-3 text-[13.5px] text-faint">
            Die Stange ist leer und wiegt {BAR_KG} kg.
          </p>
        )}
      </div>

      {/* Scheiben zum Auflegen */}
      <div className="mt-6">
        <p className="text-[12.5px] font-bold uppercase tracking-[0.14em] text-faint">
          Antippen oder auf die Stange ziehen
        </p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {PLATES.map((p) => (
            <button
              key={p.kg}
              type="button"
              disabled={full}
              onClick={() => add(p.kg)}
              onPointerDown={(e) => {
                if (full) return;
                setDrag({ kg: p.kg, x: e.clientX, y: e.clientY });
              }}
              className="group flex touch-none items-center gap-2.5 rounded-[999px] border border-white/14 bg-white/5 px-4 py-2.5 text-[14px] font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span
                className="h-5 w-2.5 rounded-full"
                style={{ background: p.color }}
                aria-hidden="true"
              />
              {p.label} kg
            </button>
          ))}
          <button
            type="button"
            onClick={() => setLoaded([])}
            className="rounded-[999px] border border-white/14 px-4 py-2.5 text-[14px] font-bold text-mute transition-colors hover:text-chalk"
          >
            Zurücksetzen
          </button>
        </div>
        {full ? (
          <p className="mt-3 text-[13.5px] text-faint">
            Sechs Scheiben je Seite, mehr passt auf die Stange nicht.
          </p>
        ) : null}
      </div>

      {/* Einordnung */}
      <div className="mt-7 rounded-[18px] border border-white/10 bg-white/4 p-5">
        <div className="flex items-start gap-3.5">
          <Icon name="info" size={20} className="mt-0.5 shrink-0 text-flame-400" />
          <p className="text-[15px] leading-relaxed text-mute" aria-live="polite">
            {reached
              ? `${reached.kg} kg erreicht. ${reached.text}. Wir zeigen dir die Technik, bevor es schwer wird.`
              : "Die leere Stange wiegt 20 kg. Genau damit fängt bei uns fast jeder an."}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/probetraining/" className="btn btn-primary">
            Technik im Probetraining lernen
            <Icon name="arrowRight" size={18} strokeWidth={2.1} />
          </Link>
          <Link href="/training/" className="btn btn-ghost">
            Freihantelbereich
          </Link>
        </div>
      </div>

      {/* Schwebende Scheibe beim Ziehen */}
      {drag ? (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed z-[60] -translate-x-1/2 -translate-y-1/2 rounded-[999px] border border-white/25 bg-ink-900/90 px-4 py-2 text-[14px] font-black shadow-2xl"
          style={{ left: drag.x, top: drag.y }}
        >
          {String(drag.kg).replace(".", ",")} kg
        </div>
      ) : null}
    </div>
  );
}
