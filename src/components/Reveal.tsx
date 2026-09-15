"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Inhalte oberhalb der Falz sofort zeigen, ohne auf den Observer zu warten */
  immediate?: boolean;
};

/**
 * Blendet Inhalte beim Scrollen weich ein.
 * Respektiert prefers-reduced-motion ueber die CSS-Regeln in globals.css.
 */
export default function Reveal({ children, delay = 0, as, className = "", id, immediate = false }: Props) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [immediate]);

  return (
    <Tag
      id={id}
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-shown={shown ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
