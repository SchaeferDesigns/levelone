import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import Icon from "./Icon";
import { site } from "@/lib/site";

type Props = {
  /** Dateiname ohne Endung in /public/rechtstexte */
  file: string;
  title: string;
};

/**
 * Liest den Rechtstext beim Bauen aus /public/rechtstexte/<file>.txt.
 * Der Text landet dadurch direkt im ausgelieferten HTML, ist ohne JavaScript
 * lesbar und wird von Suchmaschinen gefunden. Solange die Datei leer ist,
 * erscheint ein sachlicher Hinweis statt Platzhaltertext.
 */
function readLegalText(file: string) {
  try {
    const full = path.join(process.cwd(), "public", "rechtstexte", `${file}.txt`);
    return fs.readFileSync(full, "utf8").trim();
  } catch {
    return "";
  }
}

export default function LegalText({ file, title }: Props) {
  const text = readLegalText(file);

  if (!text) {
    return (
      <div className="glass card">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/14 bg-white/6 text-flame-400">
          <Icon name="document" size={24} />
        </span>
        <h2 className="display-md mt-6">{title} folgt in Kürze</h2>
        <p className="lead mt-4 max-w-[60ch]">
          Der vollständige Text wird derzeit erstellt und in Kürze an dieser Stelle veröffentlicht.
          Bis dahin erreichst du uns jederzeit persönlich.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a className="btn btn-primary" href={`tel:${site.contact.phone}`}>
            <Icon name="phone" size={18} />
            {site.contact.phoneDisplay}
          </a>
          <Link className="btn btn-ghost" href="/kontakt/">
            Zum Kontakt
            <Icon name="arrowRight" size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass card">
      <div className="whitespace-pre-wrap text-[15.5px] leading-relaxed text-mute">{text}</div>
    </div>
  );
}
