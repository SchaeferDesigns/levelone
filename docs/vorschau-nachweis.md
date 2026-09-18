# Vorschau-Build: ausgeführte Prüfungen

18.09.2026, Windows, Node 22.20.0, Next.js 16.3.5. Remote vorab per Fast-forward von `8a10f4a` auf `1806beb` aktualisiert. Die vorhandene Änderung an `package-lock.json` blieb unberührt.

## Vorschau aus Git Bash

`npm run build:vorschau` ohne vorangestellte Umgebungsvariablen: Exitcode 0. Tatsächlicher Schluss der Ausgabe:

```text
Route OK: out/agb/index.html
Route OK: out/datenschutz/index.html
Route OK: out/faq/index.html
Route OK: out/impressum/index.html
Route OK: out/kontakt/index.html
Route OK: out/kurse/index.html
Route OK: out/mitglied-werden/index.html
Route OK: out/mitgliedschaft/index.html
Route OK: out/index.html
Route OK: out/probetraining/index.html
Route OK: out/studio/index.html
Route OK: out/training/index.html
Route OK: out/wellness/index.html
Route OK: out/widerruf/index.html
Exportprüfung OK: 129 Dateien, 14 Routen, Basispfad /demo/levelone/
Gebaut: Vorschau mit Basispfad /demo/levelone/ -> out/
```

## HTML- und CSS-Pfade

Ausgeführt: `bash scripts/check-export.sh`. Darin stehen die verlangten grep-Befehle:

```bash
grep -rhoE '(src|href)="/[^"]*"' out --include=*.html | sort -u
grep -rhoE 'url\([^)]*\)' out --include=*.html --include=*.css | sort -u
```

Tatsächliche Ausgabe inklusive Abweichungsfilter und Dateiprüfung:

```text
HTML src/href:
href="/demo/levelone/"
href="/demo/levelone/_next/static/chunks/1t6dlp-nqmjx8.css"
href="/demo/levelone/_next/static/chunks/310vm2bl3xxpt.js"
href="/demo/levelone/agb/"
href="/demo/levelone/datenschutz/"
href="/demo/levelone/faq/"
href="/demo/levelone/icon.svg?icon.376ucp6xcuxno.svg"
href="/demo/levelone/impressum/"
href="/demo/levelone/kontakt/"
href="/demo/levelone/kurse/"
href="/demo/levelone/mitglied-werden/"
href="/demo/levelone/mitglied-werden/?tarif=classic"
href="/demo/levelone/mitglied-werden/?tarif=duo"
href="/demo/levelone/mitglied-werden/?tarif=flex"
href="/demo/levelone/mitgliedschaft/"
href="/demo/levelone/probetraining/"
href="/demo/levelone/studio/"
href="/demo/levelone/training/"
href="/demo/levelone/wellness/"
href="/demo/levelone/widerruf/"
src="/demo/levelone/_next/static/chunks/0cz1d0mv5g_q7.js"
src="/demo/levelone/_next/static/chunks/0th6ki6mtodaq.js"
src="/demo/levelone/_next/static/chunks/19mx3mg6lkumu.js"
src="/demo/levelone/_next/static/chunks/1x5x2_fj5wmk2.js"
src="/demo/levelone/_next/static/chunks/27t_qfc-3_lzs.js"
src="/demo/levelone/_next/static/chunks/2ql7m-kkmvha7.js"
src="/demo/levelone/_next/static/chunks/30hr8h02raaj8.js"
src="/demo/levelone/_next/static/chunks/310vm2bl3xxpt.js"
src="/demo/levelone/_next/static/chunks/372j82sslx8qt.js"
src="/demo/levelone/_next/static/chunks/3buft3tgmuidp.js"
src="/demo/levelone/_next/static/chunks/3ott3l4h9g80t.js"
src="/demo/levelone/_next/static/chunks/43a07lpralf68.js"
src="/demo/levelone/_next/static/chunks/turbopack-2-q8qqfji1g4y.js"
Abweichungen src/href:
CSS url() in HTML/CSS:
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ff8a3d' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9.5 6 6 6-6'/%3E%3C/svg%3E")
url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)
Absolute CSS-Pfade:
Verbotene Exportdateien:
out/index.html:
vorhanden
```

## Erzwungener Fehlbau

Vorübergehend `public/__guard-test.css` mit `.broken { background: url("/absichtlich-falsch.png"); }` angelegt, dann `npm run build:vorschau` ausgeführt. Ausgabe:

```text
Exportprüfung FEHLGESCHLAGEN (1):
__guard-test.css: Pfad außerhalb /demo/levelone/: /absichtlich-falsch.png
```

```text
ERZWUNGENER FEHLBAU: Exitcode 1
```

Die Testdatei wurde im `finally`-Block entfernt und danach erfolgreich neu gebaut.

## Statischer Server

`npm run probe:vorschau` kopiert `out/` nach `probe/demo/levelone/` und bedient ausschließlich Dateien unter `probe/`, ohne SPA-Fallback. Im Browser direkt aufgerufen und jeweils neu geladen:

```text
http://127.0.0.1:4173/demo/levelone/
heading: TRAINIEREN WANN DU WILLST
console: []

http://127.0.0.1:4173/demo/levelone/kontakt
heading: SCHREIB UNS ODER KOMM VORBEI
console: []
```

Zusätzlich ohne zwischengespeicherten Redirect mit `kontakt?direkt=1` geprüft. HTTP-Protokollauszug:

```text
200 /demo/levelone/kontakt/
200 /demo/levelone/kontakt/__next._tree.txt?_rsc=qFKXEyWoJkiCjT2o
200 /demo/levelone/
200 /demo/levelone/
200 /demo/levelone/
200 /demo/levelone/kontakt/
200 /demo/levelone/kontakt/__next._tree.txt?_rsc=5CB68i4pnAekjehf
200 /demo/levelone/kontakt/
200 /demo/levelone/
200 /demo/levelone/kontakt/
200 /demo/levelone/kontakt/
200 /demo/levelone/
200 /demo/levelone/kontakt/
200 /demo/levelone/kontakt/__next._tree.txt?_rsc=Y3YEkhtBJt4BLSFY
200 /demo/levelone/kontakt/__next.kontakt.__PAGE__.txt?_rsc=ZONerrjesbtb3H_f
301 /demo/levelone/kontakt?direkt=1 -> /demo/levelone/kontakt/
200 /demo/levelone/kontakt/?direkt=1
200 /demo/levelone/
200 /demo/levelone/kontakt/?direkt=1
200 /demo/levelone/kontakt/
200 /demo/levelone/
200 /demo/levelone/kontakt/
200 /demo/levelone/kontakt/__next._tree.txt?_rsc=Y3YEkhtBJt4BLSFY
200 /demo/levelone/kontakt/__next.kontakt.__PAGE__.txt?_rsc=ZONerrjesbtb3H_f
```

```text
HTTP 200: 179
HTTP 404: 0
```

Der erste Durchlauf zeigte im HTTP-Protokoll fehlende Windows-Prefetch-Dateien. Nach Ergänzung der flachen Dateinamen wurde der komplette Browserdurchlauf wiederholt. Auch Client-Navigation nach Training funktioniert. Erfolgreiche Anfrage:

```text
200 /demo/levelone/training/__next.training.__PAGE__.txt?_rsc=QiVZUiFb--6Rb6CF
```

## Mobiles Menü

Browserprüfung bei 390 × 600 Pixeln (kein physisches iPhone). Gemessene DOM-Werte:

```text
Vor Öffnen: scrollY=600, mainTop=-600
Hintergrund-Scrollversuch bei offenem Menü: scrollY=0, bodyTop=-600px, mainTop=-600
Menüinhalt scrollbar: scrollTop=162, clientHeight=486, scrollHeight=648
Nach Escape: scrollY=600, bodyPosition=""
Nach Menülink Training: scrollY=0, bodyPosition="", console=[]
Nach Desktop-Breakpoint: bodyPosition="", rootOverflow=""
```

## Wurzelbau

`npm run build` ohne Umgebungswerte: Exitcode 0. Schluss der tatsächlichen Ausgabe:

```text
Route OK: out/widerruf/index.html
Exportprüfung OK: 135 Dateien, 14 Routen, Basispfad /
Gebaut: Wurzelbau / -> out/
```

Zusätzliche Dateiprüfung nach einem Wurzelbau:

```text
Wurzel-src/href:
href="/_next/static/chunks/1t6dlp-nqmjx8.css"
href="/_next/static/chunks/310vm2bl3xxpt.js"
src="/_next/static/chunks/19mx3mg6lkumu.js"
src="/_next/static/chunks/27t_qfc-3_lzs.js"
src="/_next/static/chunks/344n2zhqbh4pn.js"
sitemap.xml: true robots.txt: true
Vorschaupfad vorhanden: false
Canonical: <link rel="canonical" href="https://www.levelonegoeggingen.de/"/>
```

Danach erneut `npm run build:vorschau` ausgeführt: Das bereitliegende `out/` enthält die Vorschau. `npm run typecheck` und `npm run verify:vorschau` endeten ebenfalls mit Exitcode 0.

## Exportgrenzen

```text
HTML-Dateien: 17
HTML ohne noindex: []
Größte Datei: _next/static/chunks/27t_qfc-3_lzs.js, 229156 Byte
Dateien >24 MB: []
OG: https://schaeferdesigns.de/demo/levelone/og.png
```

## Ergänzung: Trainingsflächen auf dem Handy

Der Kartenbereich nutzt bis 767 px einen nativen horizontalen Scrollbereich.
Vertikales Scrollen addiert nur die seitliche Bewegung seit der letzten Messung;
manuelles Wischen wird dadurch nicht auf den alten Animationsstand zurückgesetzt.
Die nächste Karte bleibt angeschnitten, und ein kurzer Hinweis erklärt beide Gesten.
Bei geringer Bildschirmhöhe wächst der Bereich mit seinem Inhalt und kann nach
oben auslaufen, statt Überschrift, Karten oder Links abzuschneiden.

Geprüft im Browser bei 390 × 844 und 390 × 667 sowie auf dem Desktop bei 1280 × 900.
Native horizontale Scrollaktionen wurden automatisiert; kein physisches Handy getestet.
Messwerte aus dem finalen Export:

```text
Mobil vor horizontalem Scrollen: scrollLeft=35, scrollY=4330
Mobil nach horizontalem Scrollen: scrollLeft=335, scrollY=4330
Mobil nach vertikalem Weitergehen: scrollLeft=519, scrollY=4499
Desktop vorher: translateX=-37.6215px, scrollY=2591, scrollLeft=0
Desktop nach vertikalem Scrollen: translateX=-440.955px, scrollY=2951, scrollLeft=0
Browserkonsole: []
```

Auch Vorwärts- und Rückwärtsbewegung sowie der Wechsel zwischen den Bildschirmbreiten
wurden geprüft. Der Vorschau-Build einschließlich TypeScript- und Exportprüfung lief durch:

```text
Exportprüfung OK: 129 Dateien, 14 Routen, Basispfad /demo/levelone/
Gebaut: Vorschau mit Basispfad /demo/levelone/ -> out/
```
