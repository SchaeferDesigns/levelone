"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Icon from "./Icon";
import { inSicht, navHoehe } from "@/lib/scroll";

const monate = [
  "Januar", "Februar", "März", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Dezember",
];
const wochentage = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

function toIso(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const t = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${t}`;
}

function fromIso(s: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return Number.isNaN(dt.getTime()) ? null : dt;
}

function lang(s: string) {
  const d = fromIso(s);
  if (!d) return "";
  return `${String(d.getDate()).padStart(2, "0")}. ${monate[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Eigener Datumswähler im Stil der Seite.
 * Im Modus "geburt" lassen sich Monat und Jahr direkt auswählen, damit man
 * sich nicht durch Jahrzehnte klicken muss.
 */
export default function DateField({
  label,
  value,
  onChange,
  min,
  max,
  mode = "datum",
  error,
  hint,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  min?: string;
  max?: string;
  mode?: "datum" | "geburt";
  error?: string;
  hint?: string;
  id?: string;
}) {
  const uid = useId();
  const feldId = id ?? `${uid}-feld`;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const popRef = useRef<HTMLDivElement | null>(null);
  const [oben, setOben] = useState(false);

  const gewaehlt = fromIso(value);
  const heute = useMemo(() => new Date(), []);
  const [blick, setBlick] = useState(() => gewaehlt ?? (mode === "geburt" ? new Date(1995, 0, 1) : heute));

  useEffect(() => {
    if (gewaehlt) setBlick(gewaehlt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Nach unten ist nicht immer Platz. Auf dem Telefon landete der Kalender
  // sonst komplett unterhalb des Bildschirms.
  function richtung(hoehe: number) {
    const t = triggerRef.current?.getBoundingClientRect();
    if (!t) return false;
    const platzUnten = window.innerHeight - t.bottom - 16;
    const platzOben = t.top - navHoehe() - 16;
    return platzUnten < hoehe && platzOben > platzUnten;
  }

  function umschalten() {
    setOpen((v) => {
      if (!v) setOben(richtung(mode === "geburt" ? 400 : 372));
      return !v;
    });
  }

  useEffect(() => {
    if (!open) return;
    const pop = popRef.current;
    if (!pop) return;
    setOben(richtung(pop.offsetHeight));
    const id = window.setTimeout(() => inSicht(popRef.current), 30);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const aus = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const taste = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", aus);
    document.addEventListener("keydown", taste);
    return () => {
      document.removeEventListener("mousedown", aus);
      document.removeEventListener("keydown", taste);
    };
  }, [open]);

  const minD = min ? fromIso(min) : null;
  const maxD = max ? fromIso(max) : null;

  const jahre = useMemo(() => {
    const bis = maxD ? maxD.getFullYear() : heute.getFullYear() + 3;
    const von = minD ? minD.getFullYear() : bis - 90;
    const out: number[] = [];
    for (let j = bis; j >= von; j -= 1) out.push(j);
    return out;
  }, [minD, maxD, heute]);

  // Raster aufbauen, Woche beginnt am Montag
  const tage = useMemo(() => {
    const jahr = blick.getFullYear();
    const monat = blick.getMonth();
    const erster = new Date(jahr, monat, 1);
    const versatz = (erster.getDay() + 6) % 7;
    const anzahl = new Date(jahr, monat + 1, 0).getDate();
    const felder: (Date | null)[] = Array.from({ length: versatz }, () => null);
    for (let t = 1; t <= anzahl; t += 1) felder.push(new Date(jahr, monat, t));
    while (felder.length % 7 !== 0) felder.push(null);
    return felder;
  }, [blick]);

  const gesperrt = (d: Date) => (minD && d < minD) || (maxD && d > maxD);

  function springe(delta: number) {
    setBlick((b) => new Date(b.getFullYear(), b.getMonth() + delta, 1));
  }

  return (
    <div ref={wrapRef} className="relative">
      <label className="field-label" htmlFor={feldId}>
        {label}
      </label>
      <button
        ref={triggerRef}
        id={feldId}
        type="button"
        onClick={umschalten}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${uid}-err` : hint ? `${uid}-hint` : undefined}
        className="field-input flex items-center justify-between gap-3 text-left"
      >
        <span className={value ? "" : "text-faint"}>{value ? lang(value) : "Datum wählen"}</span>
        <Icon name="calendar" size={19} className="shrink-0 text-flame-400" />
      </button>

      {error ? (
        <span className="field-error" id={`${uid}-err`}>
          {error}
        </span>
      ) : hint ? (
        <span className="mt-1.5 block text-[13px] text-faint" id={`${uid}-hint`}>
          {hint}
        </span>
      ) : null}

      {open ? (
        <div
          ref={popRef}
          role="dialog"
          aria-label={`${label} wählen`}
          className={`cal absolute left-0 z-40 w-[310px] max-w-[min(310px,calc(100vw-40px))] rounded-[20px] p-4 ${
            oben ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => springe(-1)}
              aria-label="Vorheriger Monat"
              className="cal-nav"
            >
              <Icon name="chevronDown" size={17} className="rotate-90" />
            </button>

            {mode === "geburt" ? (
              <div className="flex flex-1 gap-2">
                <select
                  aria-label="Monat"
                  className="cal-select"
                  value={blick.getMonth()}
                  onChange={(e) => setBlick(new Date(blick.getFullYear(), Number(e.target.value), 1))}
                >
                  {monate.map((m, i) => (
                    <option key={m} value={i}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  aria-label="Jahr"
                  className="cal-select w-[92px]"
                  value={blick.getFullYear()}
                  onChange={(e) => setBlick(new Date(Number(e.target.value), blick.getMonth(), 1))}
                >
                  {jahre.map((j) => (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="flex-1 text-center text-[15px] font-bold" aria-live="polite">
                {monate[blick.getMonth()]} {blick.getFullYear()}
              </p>
            )}

            <button
              type="button"
              onClick={() => springe(1)}
              aria-label="Nächster Monat"
              className="cal-nav"
            >
              <Icon name="chevronDown" size={17} className="-rotate-90" />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-7 gap-1">
            {wochentage.map((w) => (
              <span key={w} className="py-1 text-center text-[11px] font-bold uppercase text-faint">
                {w}
              </span>
            ))}
            {tage.map((d, i) => {
              if (!d) return <span key={`l-${i}`} />;
              const iso = toIso(d);
              const ist = gewaehlt && toIso(gewaehlt) === iso;
              const jetzt = toIso(heute) === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={Boolean(gesperrt(d))}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                    triggerRef.current?.focus();
                  }}
                  aria-label={lang(iso)}
                  aria-current={ist ? "date" : undefined}
                  className={`cal-day ${ist ? "cal-day-on" : ""} ${jetzt && !ist ? "cal-day-heute" : ""}`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex justify-between border-t border-white/10 pt-3">
            <button
              type="button"
              className="text-[13.5px] font-bold text-flame-400"
              onClick={() => {
                const z = maxD && heute > maxD ? maxD : heute;
                setBlick(z);
                if (!gesperrt(z)) {
                  onChange(toIso(z));
                  setOpen(false);
                  triggerRef.current?.focus();
                }
              }}
            >
              Heute
            </button>
            <button
              type="button"
              className="text-[13.5px] font-bold text-mute"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
            >
              Schließen
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
