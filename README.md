# Die kleine Rätselstube – Advent 2026

Ein statischer, mobiloptimierter Adventskalender
mit nostalgischer Weihnachtskarten-Ästhetik und
zwölf interaktiven Knobelrätseln.

## Dateien

- index.html – Seitenstruktur
- style.css – Gestaltung und responsives Layout
- script.js – Rätsel, Interaktionen, Freischaltung und Fortschritt

## Lokal testen

index.html im Browser öffnen.

Mit ?preview=1 an der URL werden alle Türchen
vorzeitig freigeschaltet.

Beispiel:
index.html?preview=1

## GitHub Pages

1. Dateien in ein GitHub-Repository hochladen.
2. Im Repository Settings → Pages öffnen.
3. Deploy from a branch auswählen.
4. Branch main und Ordner /(root) auswählen.
5. Speichern.

Es ist kein Build-Schritt und kein Backend erforderlich.

## Kalenderjahr ändern

In script.js den Wert CALENDAR_YEAR anpassen.

## Rätsel bearbeiten

Alle Rätsel stehen am Anfang von script.js
im Array puzzles.

Unterstützte Rätseltypen:

- input: Texteingabe
- choice: Antwort auswählen
- sum: Zahlen kombinieren
- bits: Binärschalter
- order: Zahlen sortieren
- maze: Weg durch ein Raster finden
- dials: Zahlenschloss einstellen
- slide: 3x3-Schiebepuzzle

## Technische Hinweise

- Türchen werden anhand des lokalen Datums freigeschaltet.
- Gelöste Rätsel werden im localStorage gespeichert.
- Fortschritt bleibt auf demselben Browser und Gerät erhalten.
- Die Datumsprüfung ist clientseitig und nicht manipulationssicher.
- Der Vorschau-Modus ?preview=1 ist zum Testen gedacht.