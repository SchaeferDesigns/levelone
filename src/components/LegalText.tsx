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
 * Liest den vorformatierten Rechtstext beim Bauen aus
 * /public/rechtstexte/<file>.html und gibt ihn unverändert aus.
 * Die Datei enthält fertiges HTML, eine Nachformatierung findet nicht statt.
 * Der Text steht dadurch im ausgelieferten HTML, ist ohne JavaScript lesbar
 * und für Suchmaschinen sichtbar. Solange die Datei leer ist, erscheint ein
 * Hinweis statt Platzhaltertext.
 */
function readLegalHtml(file: string) {
  try {
    const full = path.join(process.cwd(), "public", "rechtstexte", `${file}.html`);
    return fs.readFileSync(full, "utf8").trim();
  } catch {
    return "";
  }
}

export default function LegalText({ file, title }: Props) {
  const html = readLegalHtml(file);

  if (!html) {
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
      <div className="legal-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
