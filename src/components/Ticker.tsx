import Icon from "./Icon";

/**
 * Laufband mit den wichtigsten Stichworten.
 * Die Inhalte stehen doppelt im Markup, damit der Lauf nahtlos wirkt.
 * Die zweite Hälfte ist für Hilfsmittel ausgeblendet.
 */
export default function Ticker({
  items,
  speed = 38,
}: {
  items: string[];
  speed?: number;
}) {
  const row = (hidden: boolean) => (
    <span className="ticker__item" aria-hidden={hidden ? "true" : undefined}>
      {items.map((t) => (
        <span key={t} className="inline-flex items-center gap-6">
          {t}
          <span className="ticker__dot" aria-hidden="true" />
        </span>
      ))}
    </span>
  );

  return (
    <div className="ticker" style={{ "--ticker-speed": `${speed}s` } as React.CSSProperties}>
      <div className="ticker__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Kleine Variante mit Icon, für Hinweiszeilen. */
export function TickerNote({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-faint">
      <Icon name="info" size={15} />
      {text}
    </span>
  );
}
