"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
import { navHoehe } from "@/lib/scroll";

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
  const [platz, setPlatz] = useState<{ top: number; left: number } | null>(null);
  const [hoch, setHoch] = useState(false);
  const [imBaum, setImBaum] = useState(false);

  useEffect(() => setImBaum(true), []);

  const gewaehlt = fromIso(value);
  const heute = useMemo(() => new Date(), []);
  const [blick, setBlick] = useState(() => gewaehlt ?? (mode === "geburt" ? new Date(1995, 0, 1) : heute));

  useEffect(() => {
    if (gewaehlt) setBlick(gewaehlt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  /*
   * Das Aufklappfeld haengt am Seitenkoerper, nicht im Formular. Die
   * Schrittanimation setzt eine Transformation auf einen Vorfahren, und die
   * erzeugt einen Stapelkontext, aus dem ein z-index nicht herauskommt. Im
   * Formular malten Zusammenfassung und Fusszeile deshalb ueber den Kalender.
   * Am Koerper haengend wird er fest zum Fenster gesetzt und jedes Mal neu
   * ausgerichtet, wenn sich etwas bewegt.
   */
  const AUSSEN = 12;

  function ausrichten() {
    const t = triggerRef.current?.getBoundingClientRect();
    if (!t) return;
    const pop = popRef.current;
    const breite = pop?.offsetWidth ?? 310;
    const hoehe = pop?.offsetHeight ?? (mode === "geburt" ? 400 : 372);

    const platzUnten = window.innerHeight - t.bottom - AUSSEN;
    const platzOben = t.top - navHoehe() - AUSSEN;
    const nachOben = platzUnten < hoehe && platzOben > platzUnten;
    setHoch(nachOben);

    let top = nachOben ? t.top - hoehe - 8 : t.bottom + 8;
    // Passt es in keine Richtung ganz, wird es in das Fenster geschoben
    const untersteKante = window.innerHeight - hoehe - AUSSEN;
    top = Math.min(Math.max(top, navHoehe() + AUSSEN), Math.max(navHoehe() + AUSSEN, untersteKante));

    let left = t.left;
    left = Math.min(left, window.innerWidth - breite - AUSSEN);
    left = Math.max(AUSSEN, left);

    setPlatz({ top: Math.round(top), left: Math.round(left) });
  }

  function umschalten() {
    if (!open) ausrichten();
    setOpen((v) => !v);
  }

  useEffect(() => {
    if (!open) return;
    ausrichten();
    let frame = 0;
    const neu = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        ausrichten();
      });
    };
    window.addEventListener("scroll", neu, { passive: true, capture: true });
    window.addEventListener("resize", neu);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", neu, { capture: true } as EventListenerOptions);
      window.removeEventListener("resize", neu);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /*
   * Am Koerper haengend folgt das Feld nicht mehr der Tabreihenfolge des
   * Formulars. Deshalb wandert der Fokus beim Oeffnen hinein und bleibt dort,
   * bis geschlossen wird.
   */
  useEffect(() => {
    if (!open) return;
    const pop = popRef.current;
    if (!pop) return;
    const erreichbare = () =>
      Array.from(pop.querySelectorAll<HTMLElement>("button:not([disabled]), select")).filter(
        (el) => el.offsetParent !== null,
      );
    const gewaehlteTaste =
      pop.querySelector<HTMLElement>(".cal-day-on") ??
      pop.querySelector<HTMLElement>(".cal-day-heute") ??
      erreichbare()[0];
    gewaehlteTaste?.focus({ preventScroll: true });

    const fangen = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const liste = erreichbare();
      if (!liste.length) return;
      const erster = liste[0];
      const letzter = liste[liste.length - 1];
      const aktiv = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (aktiv === erster || !pop.contains(aktiv))) {
        e.preventDefault();
        letzter.focus();
      } else if (!e.shiftKey && aktiv === letzter) {
        e.preventDefault();
        erster.focus();
      }
    };
    document.addEventListener("keydown", fangen);
    return () => document.removeEventListener("keydown", fangen);
  }, [open, blick]);

  useEffect(() => {
    if (!open) return;
    const aus = (e: MouseEvent) => {
      const ziel = e.target as Node;
      if (wrapRef.current?.contains(ziel) || popRef.current?.contains(ziel)) return;
      setOpen(false);
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

      {open && imBaum
        ? createPortal(
        <div
          ref={popRef}
          role="dialog"
          aria-label={`${label} wählen`}
          data-hoch={hoch}
          style={{ top: platz?.top ?? -9999, left: platz?.left ?? -9999 }}
          className="cal fixed z-[120] w-[310px] max-w-[calc(100vw-24px)] rounded-[20px] p-4"
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
        </div>,
            document.body,
          )
        : null}
    </div>
  );
}
