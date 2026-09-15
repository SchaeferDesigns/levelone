# Level One Göggingen, Website

Single Page Application mit echten Unterseiten (Routing ohne Hash) für das Fitnessstudio
Level One Göggingen.

## Technik

| Baustein | Auswahl |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 und eigenes Design System in `src/app/globals.css` |
| Ausgabe | Statischer Export (`output: "export"`), läuft auf jedem Webspace |
| Animation | IntersectionObserver und CSS, keine zusätzliche Bibliothek |
| Icons | eigene Inline-SVG-Bibliothek in `src/components/Icon.tsx` |

## Befehle

```bash
npm install        # Abhängigkeiten installieren
npm run dev        # Entwicklungsserver auf http://localhost:3000
npm run build      # statische Website nach ./out bauen
npm run typecheck  # Typen prüfen
```

Nach `npm run build` liegt die fertige Website im Ordner `out`. Dieser Ordner wird
unverändert auf den Webspace geladen.

## Seitenstruktur

```
/                  Startseite
/training/         Trainingsbereiche und Zusatzangebote
/kurse/            Kursformate und Ablauf
/wellness/         Sauna, Solarium und Regeneration
/mitgliedschaft/   Leistungen, Ablauf und Fragen
/studio/           Über das Studio, Ausstattung, Öffnungszeiten
/probetraining/    Conversion-Seite mit Formular
/kontakt/          Kontaktdaten, Formular, Karte
/faq/              Häufige Fragen
/impressum/ /datenschutz/ /agb/ /widerruf/   Rechtstexte
```

## Stammdaten pflegen

Alle Kontaktdaten, Öffnungszeiten, Navigationspunkte und Social-Media-Links stehen zentral in
`src/lib/site.ts`. Eine Änderung dort wirkt sich auf alle Seiten, den Footer, die Meta-Daten
und die strukturierten Daten aus.

## Rechtstexte

Die Rechtstexte liegen als Textdateien unter `public/rechtstexte`:

```
public/rechtstexte/impressum.txt
public/rechtstexte/datenschutz.txt
public/rechtstexte/agb.txt
public/rechtstexte/widerruf.txt
```

Solange eine Datei leer ist, zeigt die zugehörige Seite den Hinweis, dass der Text in Kürze
folgt. Sobald Text in der Datei steht, wird genau dieser Text ausgegeben.

Die Texte werden beim Bauen eingelesen und stehen dadurch direkt im ausgelieferten HTML. Das
ist für Pflichtangaben wichtig, weil der Text so auch ohne JavaScript lesbar und für
Suchmaschinen sichtbar ist. Nach einer Änderung an einer Textdatei muss deshalb einmal
`npm run build` laufen und der Ordner `out` neu hochgeladen werden.

## Formulare

Das Kontakt- und Probetrainingsformular arbeitet in zwei Betriebsarten:

1. Ohne Konfiguration öffnet sich das E-Mail-Programm der Besucher mit fertig ausgefüllter
   Nachricht an die hinterlegte Adresse.
2. Ist die Umgebungsvariable `NEXT_PUBLIC_FORM_ENDPOINT` gesetzt, sendet das Formular die
   Daten per POST als JSON an diese Adresse.

Beispiel `.env.local`:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://www.levelonegoeggingen.de/formular.php
```

## Datenschutz

* Es werden keine Schriften, Skripte oder Bilder von fremden Servern geladen.
* Die Karte auf Start- und Kontaktseite lädt erst nach aktiver Zustimmung (Zwei-Klick-Lösung).
* Die Zustimmung lässt sich auf der Datenschutzseite jederzeit widerrufen.
* Es wird kein Tracking und keine Analyse eingesetzt.

## Bilder

Die Bildflächen sind als gestaltete Platzhalter umgesetzt (`MediaFrame`). Sobald echte Fotos
vorliegen, werden sie unter `public/media` abgelegt und die Komponente durch ein `Image`
Element ersetzt. Das Vorschaubild für soziale Netzwerke liegt unter `public/og.png`.
