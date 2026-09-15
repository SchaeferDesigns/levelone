"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Liefert den Fortschritt 0 bis 1, waehrend ein hoher Abschnitt am Bildschirm
 * festgehalten wird. Die Messung laeuft ueber requestAnimationFrame, damit das
 * Scrollen fluessig bleibt.
 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(0);
      return;
    }

    let frame = 0;
    let last = -1;

    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      if (span <= 0) return;
      const raw = -rect.top / span;
      const next = Math.min(1, Math.max(0, raw));
      if (Math.abs(next - last) > 0.002) {
        last = next;
        setProgress(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return { ref, progress };
}

/** Meldet, ob der Nutzer ruhige Darstellung bevorzugt. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}
