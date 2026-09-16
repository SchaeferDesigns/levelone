"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const schluessel = (pfad: string) => `pos:${pfad}`;

function merke(pfad: string, wert: number) {
  try {
    sessionStorage.setItem(schluessel(pfad), String(wert));
  } catch {
    /* privater Modus, dann eben ohne */
  }
}

function hole(pfad: string) {
  try {
    const roh = sessionStorage.getItem(schluessel(pfad));
    const wert = roh === null ? Number.NaN : Number(roh);
    return Number.isFinite(wert) ? wert : null;
  } catch {
    return null;
  }
}

function springe(ziel: number) {
  const wurzel = document.documentElement;
  const vorher = wurzel.style.scrollBehavior;
  wurzel.style.scrollBehavior = "auto";
  window.scrollTo(0, ziel);
  wurzel.style.scrollBehavior = vorher;
}

/**
 * Jeder Seitenwechsel beginnt oben. Nur Zurück und Vorwärts des Browsers
 * kehren an die gemerkte Stelle zurück, ein Anker im Ziel hat Vorrang.
 *
 * Die Wiederherstellung des Browsers greift hier zu früh, weil die Seite beim
 * Einhängen noch kürzer ist als vorher. Deshalb merken wir die Stelle selbst
 * und stellen sie nach, bis die Seite ihre Höhe erreicht hat.
 */
export default function ScrollTop() {
  const pfad = usePathname();
  const verlauf = useRef(false);
  const erster = useRef(true);
  const aktuell = useRef(pfad);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";

    const merken = () => {
      verlauf.current = true;
    };
    let frame = 0;
    const beimScrollen = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        merke(aktuell.current, window.scrollY);
      });
    };
    window.addEventListener("popstate", merken);
    window.addEventListener("scroll", beimScrollen, { passive: true });
    return () => {
      window.removeEventListener("popstate", merken);
      window.removeEventListener("scroll", beimScrollen);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    aktuell.current = pfad;

    if (erster.current) {
      erster.current = false;
      return;
    }

    const zurueck = verlauf.current;
    verlauf.current = false;

    if (window.location.hash) return;

    if (!zurueck) {
      springe(0);
      return;
    }

    const ziel = hole(pfad);
    if (ziel === null || ziel <= 0) {
      springe(0);
      return;
    }

    // Die Seite wächst nach dem Einhängen noch, deshalb mehrfach nachsetzen
    let versuche = 0;
    let frame = 0;
    const nachsetzen = () => {
      versuche += 1;
      const hoehe = document.documentElement.scrollHeight - window.innerHeight;
      springe(Math.min(ziel, Math.max(0, hoehe)));
      if (Math.abs(window.scrollY - ziel) > 2 && versuche < 12) {
        frame = window.requestAnimationFrame(nachsetzen);
      }
    };
    nachsetzen();
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pfad]);

  return null;
}
