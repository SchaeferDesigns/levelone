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
npm run build:vorschau # Vorschau für /demo/levelone/ nach ./out bauen und prüfen
npm run verify:vorschau # vorhandenen Vorschau-Export erneut prüfen
npm run probe:vorschau # nach probe/demo/levelone kopieren und lokal auf Port 4173 testen
npm run typecheck  # Typen prüfen
```

Nach `npm run build` liegt die fertige Website im Ordner `out`. Dieser Ordner wird
unverändert auf den Webspace geladen.

## Vorschau unter schaeferdesigns.de/demo/levelone/

`npm run build:vorschau` setzt Basispfad und Vorschaumodus intern in Node.
Keine Umgebungsvariablen vor den Befehl schreiben: So kann Git Bash den
Basispfad unter Windows nicht in einen Dateisystempfad umwandeln.

Der fertige Export liegt in `out/index.html` und `out/<route>/index.html`.
Alle 14 bestehenden Routen, einschließlich der älteren Angebotsseiten, bleiben
als echte Dateien erhalten. Es gibt keine zusätzlichen Router-Aliase im Quellbestand.
Der statische Host braucht nur Verzeichnisindizes, keinen SPA-Fallback.
`/kontakt` darf nach `/kontakt/` weiterleiten; dort liegt die eigene `index.html`.

Die Vorschau enthält `noindex` auf allen HTML-Seiten, keine Canonicals und keine
`sitemap.xml`, `robots.txt` oder `.htaccess`. Öffentliche Rechtstext-Quelldateien
werden aus diesem Export entfernt; ihre Inhalte sind bereits in den Rechtsseiten
eingebettet. OG-Bilder, strukturierte Daten und öffentliche Assets nutzen denselben
Basispfad wie Links und Next.js-Dateien.

Der Build prüft HTML-Attribute, Metadaten, CSS-URLs, Ressourcenliterale in JavaScript,
referenzierte Dateien, alle Seitenrouten, die Dateigrößen (maximal 24.000.000 Byte)
und verbotene Exportdateien. Bei Abweichungen listet er die Fundstellen und beendet
sich mit Exitcode 1. Interne Routen-Props von `next/link` sind keine ausgelieferten
URLs: Next.js ergänzt ihren Basispfad beim Rendern; geprüft werden die tatsächlichen
HTML-Links. Neue dynamische Routen erfordern eine explizite Ergänzung der Routenprüfung.
Der Abschluss ergänzt außerdem die flachen Prefetch-Dateinamen, die Next.js 16.3
unter Windows irrtümlich als Unterordner exportiert. Dadurch funktionieren auch
Client-Navigation und Prefetching auf einem gewöhnlichen statischen Host ohne 404.

`npm run build` bleibt `next build`, `npm run dev` bleibt unverändert. Der ergänzte
`postbuild`-Schritt prüft den Export und nennt den Bautyp in der letzten Ausgabezeile.
Ohne Umgebungswerte entsteht weiterhin der Wurzelbau mit Sitemap und Live-Metadaten.
Die Vorschauwerte werden nicht in die Shell oder in eine `.env`-Datei zurückgeschrieben.

Zum Übertragen in das Cloudflare-Pages-Projekt (PowerShell, Zielpfad anpassen):

```powershell
npm run build:vorschau
robocopy .\out C:\Pfad\zur\Pages-Seite\public\demo\levelone /MIR
```

`/MIR` gleicht ausschließlich diesen Ziel-Unterordner ab, einschließlich veralteter
Dateien. Robocopy-Exitcodes 0–7 bedeuten Erfolg, ab 8 liegt ein Fehler vor.
Danach das übergeordnete Pages-Projekt wie gewohnt veröffentlichen. Nur `out/`
übertragen, nicht `.next/`; `.next/` enthält die internen Build-Dateien.

Lokaler Test: `npm run probe:vorschau`, dann
`http://127.0.0.1:4173/demo/levelone/` und
`http://127.0.0.1:4173/demo/levelone/kontakt` direkt öffnen und neu laden.
Der Testserver protokolliert jede Anfrage und hat ausdrücklich keinen SPA-Fallback.
Die ausgeführten Prüfungen stehen in [docs/vorschau-nachweis.md](docs/vorschau-nachweis.md).

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
public/rechtstexte/impressum.html
public/rechtstexte/datenschutz.html
public/rechtstexte/agb.html
public/rechtstexte/widerruf.html
```

Die Dateien enthalten fertig formatiertes HTML, zum Beispiel aus einem
Rechtstext-Generator. Es findet keine Nachformatierung statt, der Inhalt wird
unverändert ausgegeben und über die Klasse `legal-content` typografisch gestaltet.

Solange eine Datei leer ist, zeigt die zugehörige Seite den Hinweis, dass der Text in Kürze
folgt. Sobald Text in der Datei steht, wird genau dieser Text ausgegeben.

Die Dateien werden beim Bauen eingelesen und stehen dadurch direkt im ausgelieferten HTML. Das
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

## Tarife und Onlineabschluss

Die Tarife stehen in `src/lib/tarife.ts`. Eine Änderung dort wirkt auf der
Startseite, auf der Mitgliedschaftsseite und im Abschluss.

Die Beträge sind derzeit **Beispielwerte für die Vorschau**. Unter den
Tarifkarten steht ein entsprechender Hinweis, der in `TarifCards.tsx` in einer
Zeile entfernt werden kann, sobald die echten Konditionen eingetragen sind.

Die Seite `/mitglied-werden/` zeigt den vollständigen Abschluss in fünf
Schritten. Der Ablauf ist bedienbar, sendet aber nichts und schließt keinen
Vertrag. Bankdaten werden bewusst nicht abgefragt. Für den scharfen Betrieb
kommt an dieser Stelle die Anbindung an die Studioverwaltung oder an einen
Zahlungsdienstleister dazu.

## Bildsequenz am Scrollen

Der Abschnitt "So sieht es bei uns aus" auf der Startseite spielt eine Bildfolge
ab, die an das Scrollen gekoppelt ist. Solange keine Bilder vorliegen, zeigt der
Abschnitt drei gestaltete Karten mit demselben Inhalt. Es geht also nichts kaputt,
wenn die Sequenz fehlt.

So wird sie eingebunden:

1. Einzelbilder nach `public/sequenz` legen, fortlaufend nummeriert:
   `frame-0001.webp`, `frame-0002.webp`, und so weiter.
2. Die Datei `public/sequenz/manifest.json` anlegen. Eine Vorlage liegt als
   `BEISPIEL-manifest.json` daneben.
3. Einmal `npm run build` laufen lassen.

Empfehlung für die Bilder:

| Angabe | Wert |
| --- | --- |
| Anzahl | 90 bis 150 Bilder, mehr bringt kaum sichtbaren Gewinn |
| Format | WebP, Qualität etwa 70 |
| Größe | 1600 mal 900 Pixel, quer |
| Dateigröße | höchstens 45 KB pro Bild, sonst wird die Sequenz zu schwer |
| Inhalt | eine durchgehende Bewegung, etwa eine Kamerafahrt durch das Studio |

Beispiel zum Umwandeln eines Videos in Einzelbilder:

```bash
ffmpeg -i studio.mp4 -vf "fps=24,scale=1600:-2" -q:v 80 public/sequenz/frame-%04d.webp
```

Auf Mobilgeräten, bei aktivem Datensparmodus und bei ruhiger Darstellung wird
statt der Sequenz nur das erste Bild gezeigt. Die Bilder werden erst geladen,
wenn der Abschnitt in die Nähe des Bildschirms kommt.

## Bilder

Die Bildflächen sind als gestaltete Platzhalter umgesetzt (`MediaFrame`). Sobald echte Fotos
vorliegen, werden sie unter `public/media` abgelegt und die Komponente durch ein `Image`
Element ersetzt. Das Vorschaubild für soziale Netzwerke liegt unter `public/og.png`.

## Veröffentlichung über GitHub Pages

Bei jedem Push auf `main` baut die Aktion in `.github/workflows/deploy.yml` die
Website und veröffentlicht den Ordner `out` auf GitHub Pages.

Einmalig nötig: In den Repository-Einstellungen unter Pages als Quelle
`GitHub Actions` auswählen.

Optionale Repository-Variablen unter Settings, Secrets and variables, Actions,
Reiter Variables:

| Variable | Zweck |
| --- | --- |
| `SITE_URL` | Adresse für Canonical, Sitemap und Vorschaubild. Standard ist `https://www.levelonegoeggingen.de` |
| `FORM_ENDPOINT` | Adresse, an die das Kontaktformular sendet. Ohne Eintrag greift der E-Mail-Fallback |

Der Basispfad wird automatisch gesetzt. Läuft die Seite unter der
Projektadresse `schaeferdesigns.github.io/levelone`, ergänzt die Aktion den
Unterordner. Bei eigener Domain bleibt der Pfad leer.

Für die eigene Domain zusätzlich eine Datei `public/CNAME` mit dem Domainnamen
anlegen und die DNS-Einträge beim Anbieter auf GitHub Pages zeigen lassen.
