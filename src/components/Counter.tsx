"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Zahl, die beim Sichtbarwerden einmal hochläuft.
 * Bei ruhiger Darstellung erscheint sofort der Endwert.
 */
export default function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1400,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(to);
      return;
    }

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            frame = requestAnimationFrame(step);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className="counter">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
