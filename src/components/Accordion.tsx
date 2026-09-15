"use client";

import { useId, useState } from "react";
import Icon from "./Icon";

export type QA = { q: string; a: React.ReactNode };

export default function Accordion({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="glass overflow-hidden rounded-[20px]">
            <h3>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left text-[16.5px] font-bold"
                aria-expanded={isOpen}
                aria-controls={`${uid}-panel-${i}`}
                id={`${uid}-btn-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {item.q}
                <Icon
                  name="chevronDown"
                  size={20}
                  strokeWidth={2.2}
                  className={`shrink-0 text-flame-400 transition-transform duration-400 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={`${uid}-panel-${i}`}
              role="region"
              aria-labelledby={`${uid}-btn-${i}`}
              data-open={isOpen}
              className="acc-panel"
            >
              <div className="acc-inner">
                <div
                  className="px-6 pb-6 text-[15.5px] leading-relaxed text-mute"
                  inert={!isOpen}
                >
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
