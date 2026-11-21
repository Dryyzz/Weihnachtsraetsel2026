# Ein rätselhafter Advent

Ein responsiver, statischer Adventskalender mit zwölf interaktiven Rätseln für GitHub Pages.

## Lokal ansehen

`index.html` im Browser öffnen. Für die Vorschau aller Türchen vor dem jeweiligen Datum `?preview=1` an die URL hängen, z. B. `index.html?preview=1`.

## Auf GitHub Pages veröffentlichen

1. Dieses Projekt in ein GitHub-Repository hochladen.
2. Im Repository **Settings → Pages** öffnen.
3. Unter **Build and deployment** als Quelle **Deploy from a branch** auswählen.
4. Branch `main` und Ordner `/ (root)` auswählen und speichern.
5. Nach dem Deployment ist die Seite unter der angezeigten GitHub-Pages-Adresse erreichbar.

Es ist kein Build-Schritt und kein Backend nötig.

## Jahr ändern

In `script.js` ganz oben `CALENDAR_YEAR` anpassen. Standardmäßig ist 2026 eingetragen.

## Rätsel anpassen

Die Rätsel stehen gesammelt im Array `puzzles` in `script.js`. Unterstützte Typen:

- `input`: freie Texteingabe
- `choice`: eine Antwort aus mehreren Optionen
- `sum`: genau drei Zahlen auswählen
- `bits`: fünf Binär-Schalter
- `order`: Zahlen mit Pfeilen sortieren

Jedes Rätsel hat `day`, `title`, `type`, `prompt`, `answer` und `hint`. Je nach Typ kommen `visual`, `choices` oder `items` dazu.

## Fortschritt und Türchen

Die Freischaltung richtet sich nach dem lokalen Datum des Geräts und dem eingestellten Kalenderjahr. Der Lösungsstand wird im `localStorage` des Browsers gespeichert. Das bedeutet: Der Fortschritt ist geräte- und browserbezogen und wird nicht zwischen verschiedenen Geräten synchronisiert.

Hinweis: Bei einem rein statischen GitHub-Pages-Projekt kann die Datumsprüfung nur im Browser erfolgen. Sie ist für einen privaten, spielerischen Kalender gedacht, nicht als manipulationssichere Zugangskontrolle. Die Vorschau `?preview=1` ist nur zum Testen gedacht.
