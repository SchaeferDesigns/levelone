"use client";

import { useEffect, useState } from "react";

/** Dünner Fortschrittsbalken am oberen Rand. */
export default function ScrollProgress() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const span = doc.scrollHeight - window.innerHeight;
      setValue(span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 0);
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

  return (
    <div
      className="scroll-progress"
      aria-hidden="true"
      style={{ transform: `scaleX(${value})` }}
    />
  );
}
