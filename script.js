
/* =====================================================
   DIE KLEINE RÄTSELSTUBE – ADVENT 2026
   Neue Rätselversion – Schwierigkeitsgrad ca. 5–10 Min.
   ===================================================== */

const CALENDAR_YEAR = 2026;
const PREVIEW_MODE = new URLSearchParams(location.search).has("preview");

const STORAGE_KEY = "raetselstube-2026-v2";
const DAYS = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23];

const puzzles = [
  {
    day: 1,
    title: "Der mathematische Tresor",
    kind: "input",
    prompt:
      "Im Tresor liegen zwei unbekannte Zahlen: x und y. " +
      "Auf einem Zettel stehen zwei Gleichungen:\n\n" +
      "2x + y = 17\n" +
      "x + 2y = 19\n\n" +
      "Der Code besteht aus x gefolgt von y. Welche zwei Ziffern öffnen den Tresor?",
    visual: "2x + y = 17     |     x + 2y = 19",
    answer: "57",
    fragment: "W",
    hints: [
      "Du hast zwei Gleichungen mit zwei Unbekannten. Versuche, eine Variable zu eliminieren.",
      "Verdopple die zweite Gleichung und ziehe die erste Gleichung davon ab.",
      "Du erhältst 3y = 21. Damit ist y = 7 und x = 5."
    ]
  },

  {
    day: 3,
    title: "Die unmögliche Nachricht",
    kind: "input",
    prompt:
      "Eine Nachricht wurde zweimal verschlüsselt.\n\n" +
      "1. Zuerst wurde jeder Buchstabe durch seinen Gegenbuchstaben im Alphabet ersetzt (A ↔ Z, B ↔ Y usw.).\n" +
      "2. Danach wurde jeder Buchstabe drei Stellen nach rechts verschoben.\n\n" +
      "Entschlüssle die Nachricht und gib das ursprüngliche Wort ein.",
    visual: "X L O K J",
    answer: "FROST",
    fragment: "I",
    hints: [
      "Du musst die Verschlüsselung in umgekehrter Reihenfolge rückgängig machen.",
      "Mache zuerst die Verschiebung rückwärts: Gehe bei jedem Buchstaben drei Stellen zurück.",
      "Danach verwendest du die Gegenbuchstaben im Alphabet. Das Ergebnis ist FROST."
    ]
  },

  {
    day: 5,
    title: "Das Licht der Sterne",
    kind: "circuit",
    prompt:
      "Eine kleine Schaltung steuert das Licht im Fenster.\n\n" +
      "Die Eingänge haben folgende Werte:\n" +
      "A = 1, B = 0, C = 1\n\n" +
      "Die Schaltung arbeitet von links nach rechts:\n\n" +
      "1. Berechne A XOR B.\n" +
      "2. Berechne NICHT C ODER B.\n" +
      "3. Verknüpfe die beiden Ergebnisse mit UND.\n" +
      "4. ODER das Ergebnis mit A UND C.\n\n" +
      "Welchen Wert hat der Ausgang? Gib 0 oder 1 ein.",
    visual: "((A XOR B) UND (NICHT C ODER B)) ODER (A UND C)",
    answer: "1",
    fragment: "N",
    hints: [
      "XOR ist genau dann 1, wenn die beiden Eingänge unterschiedlich sind.",
      "NICHT C ist 0. ODER verknüpft ergibt das mit B ebenfalls 0.",
      "A XOR B = 1. Der erste UND-Teil ist 1 UND 0 = 0. A UND C = 1. Also 0 ODER 1 = 1."
    ]
  },

  {
    day: 7,
    title: "Die zwölf Verdächtigen",
    kind: "choice",
    prompt:
      "Im Postzimmer wurde ein goldener Schlüssel gestohlen. " +
      "Drei Personen kommen infrage: Ada, Ben und Clara.\n\n" +
      "Ada sagt: „Ben war es.“\n" +
      "Ben sagt: „Ada war es nicht.“\n" +
      "Clara sagt: „Ben war es nicht.“\n\n" +
      "Es gilt: Genau eine dieser drei Aussagen ist wahr. " +
      "Wer hat den Schlüssel genommen?",
    choices: ["Ada", "Ben", "Clara"],
    answer: "Ada",
    fragment: "T",
    hints: [
      "Nimm nacheinander jede Person als Täter an und prüfe alle drei Aussagen.",
      "Wenn Ada die Täterin ist, sind Bens und Claras Aussagen unterschiedlich zu bewerten.",
      "Bei Ada als Täterin sind Adas Aussage falsch, Bens Aussage falsch und Claras Aussage wahr."
    ]
  },

  {
    day: 9,
    title: "Das Muster im Kalender",
    kind: "input",
    prompt:
      "Ein alter Kalender enthält eine Zahlenmatrix. " +
      "Die Zahlen wurden nach einer festen Regel eingetragen.\n\n" +
      "Finde die fehlende Zahl in der letzten Zeile.",
    visual:
      "2     3      8\n" +
      "3     4     15\n" +
      "4     5      ?",
    answer: "24",
    fragment: "E",
    hints: [
      "Untersuche, wie die ersten beiden Zahlen einer Zeile zur dritten Zahl führen.",
      "Multipliziere die ersten beiden Zahlen und addiere anschließend die erste Zahl.",
      "4 × 5 + 4 = 24."
    ]
  },

  {
    day: 11,
    title: "Die falschen Wegweiser",
    kind: "choice",
    prompt:
      "Drei Personen stehen vor der verschlossenen Weihnachtskammer. " +
      "Eine von ihnen hat den Schlüssel genommen.\n\n" +
      "Mira sagt: „Noah hat den Schlüssel genommen.“\n" +
      "Noah sagt: „Oskar hat den Schlüssel genommen.“\n" +
      "Oskar sagt: „Noah lügt.“\n\n" +
      "Du weißt: Genau zwei Aussagen sind wahr. " +
      "Wer hat den Schlüssel?",
    choices: ["Mira", "Noah", "Oskar"],
    answer: "Noah",
    fragment: "R",
    hints: [
      "Wenn Noah der Täter ist, ist Miras Aussage wahr.",
      "Prüfe zusätzlich, ob Noahs Aussage dann wahr oder falsch ist.",
      "Bei Noah als Täter sind Miras und Oskars Aussagen wahr, Noahs Aussage ist falsch."
    ]
  },

  {
    day: 13,
    title: "Der verschneite Irrgarten",
    kind: "maze",
    prompt:
      "Finde den Weg durch den verschneiten Irrgarten.\n\n" +
      "Du startest links oben und musst das Ziel rechts unten erreichen. " +
      "Sammle unterwegs alle drei Sterne ein. Dunkle Felder sind Felsen. " +
      "Du darfst nur waagerecht oder senkrecht gehen. " +
      "Du kannst deinen Weg auch zurückverfolgen.\n\n" +
      "Tippe die Felder nacheinander an und prüfe am Ende deine Route.",
    walls: [
      "1,1", "1,2", "1,3",
      "2,1", "3,1", "3,2",
      "3,3", "1,0", "2,3"
    ],
    keys: ["0,4", "4,0", "2,2"],
    start: "0,0",
    goal: "4,4",
    fragment: "S",
    hints: [
      "Ein Stern liegt ganz oben rechts, einer ganz unten links und einer in der Mitte.",
      "Du musst nicht den kürzesten Weg nehmen. Plane eine Route, die alle drei Sterne berührt.",
      "Gehe zuerst über die obere Reihe zum Stern rechts oben. Danach über den rechten Rand nach unten und über die untere Reihe zum Stern links unten. Von dort über die linke Seite und die Mitte zum letzten Stern. Anschließend zum Ziel."
    ]
  },

  {
    day: 15,
    title: "Das Schloss der drei Könige",
    kind: "dial",
    prompt:
      "Ein Zahlenschloss hat drei Ziffern. Die Könige haben drei Hinweise hinterlassen:\n\n" +
      "1. Die Summe aller Ziffern beträgt 16.\n" +
      "2. Die erste Ziffer ist genau eins größer als die mittlere.\n" +
      "3. Die letzte Ziffer ist genau drei größer als die mittlere.\n\n" +
      "Stelle den dreistelligen Code mit den Zahlendrehern ein.",
    answer: "547",
    fragment: "T",
    hints: [
      "Nenne die mittlere Ziffer x. Die anderen beiden lassen sich durch x ausdrücken.",
      "Die drei Ziffern lauten x+1, x und x+3.",
      "Die Summe ist 3x + 4 = 16. Also ist x = 4. Der Code lautet 547."
    ]
  },

  {
    day: 17,
    title: "Die geheime Rezeptur",
    kind: "input",
    prompt:
      "In einem alten Rezeptbuch stehen drei Symbole. Jedes Symbol steht für eine positive ganze Zahl.\n\n" +
      "★ + ★ + ☾ = 18\n" +
      "★ + ☾ + ▲ = 19\n" +
      "☾ − ▲ = 2\n\n" +
      "Finde die Werte für Stern, Mond und Tanne. " +
      "Gib sie in dieser Reihenfolge und ohne Leerzeichen ein.",
    visual: "★ + ★ + ☾ = 18     |     ★ + ☾ + ▲ = 19     |     ☾ − ▲ = 2",
    answer: "586",
    fragment: "E",
    hints: [
      "Die dritte Gleichung verrät dir den Unterschied zwischen Mond und Tanne.",
      "Setze ▲ = ☾ − 2 in die zweite Gleichung ein. Vergleiche dann mit der ersten.",
      "Die Werte sind Stern = 5, Mond = 8 und Tanne = 6."
    ]
  },

  {
    day: 19,
    title: "Der verschwundene Weihnachtsschlüssel",
    kind: "input",
    prompt:
      "Vier Gäste kamen nacheinander in die Weihnachtsstube: Nora, Felix, Greta und Hugo.\n\n" +
      "Aus dem Gästebuch sind nur diese Hinweise übrig:\n\n" +
      "• Felix kam zuletzt.\n" +
      "• Greta kam unmittelbar vor Hugo.\n" +
      "• Nora kam nicht als Erste.\n\n" +
      "In welcher Reihenfolge kamen die vier Gäste? " +
      "Gib die Anfangsbuchstaben ohne Leerzeichen ein.",
    answer: "GHNF",
    fragment: "R",
    hints: [
      "Felix muss an vierter Stelle stehen.",
      "Greta und Hugo bilden ein direkt aufeinanderfolgendes Paar: GH.",
      "Da Nora nicht Erste sein darf und Felix Letzter ist, bleibt nur GHNF."
    ]
  },

  {
    day: 21,
    title: "Die Werkstatt der Uhrmacher",
    kind: "slide",
    prompt:
      "Der Uhrmacher hat die Zahlenplättchen durcheinandergebracht. " +
      "Ordne sie von 1 bis 15. Das leere Feld gehört ganz nach rechts unten.\n\n" +
      "Du kannst immer nur ein Plättchen verschieben, das direkt neben dem leeren Feld liegt.",
    fragment: "N",
    hints: [
      "Beginne mit der obersten Reihe und arbeite dich nach unten vor.",
      "Versuche, zuerst die Zahlen 1 bis 4 und danach 5 bis 8 an ihren Platz zu bringen.",
      "Das leere Feld muss am Ende unten rechts stehen. Du kannst das Puzzle jederzeit neu mischen."
    ]
  },

  {
    day: 23,
    title: "Das letzte Weihnachtsgeheimnis",
    kind: "final",
    prompt:
      "Du hast elf Briefe geöffnet und in jedem einen Buchstaben gefunden. " +
      "Diese Buchstaben ergeben gemeinsam den Namen eines winterlichen Geheimnisses.\n\n" +
      "Ordne die Fragmente in der Reihenfolge der Türchen und gib das Lösungswort ein.",
    answer: "WINTERSTERN",
    hints: [
      "Du brauchst die Buchstaben aus allen elf vorherigen Türchen.",
      "Die Buchstaben ergeben ein zusammengesetztes Wort aus zwei Teilen.",
      "Das Wort beginnt mit WINTER und endet mit STERN."
    ]
  }
];


/* =====================================================
   ELEMENTE UND ZUSTAND
   ===================================================== */

const $ = selector => document.querySelector(selector);

const calendar = $("#calendar");
const dialog = $("#puzzle-dialog");
const content = $("#puzzle-content");

let active = null;
let selected = [];
let hintLevel = 0;
let mazePath = [];
let dialValues = [0, 0, 0];
let slide = [];

const savedState = loadState();

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
      solved: [],
      fragments: {}
    };
  } catch {
    return { solved: [], fragments: {} };
  }
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
}

function isSolved(day) {
  return savedState.solved.includes(day);
}

function unlocked(day) {
  if (PREVIEW_MODE) return true;

  const now = new Date();

  return now.getFullYear() > CALENDAR_YEAR ||
    (
      now.getFullYear() === CALENDAR_YEAR &&
      now.getMonth() === 11 &&
      now.getDate() >= day
    );
}

function savePuzzle(puzzle) {
  if (!isSolved(puzzle.day)) {
    savedState.solved.push(puzzle.day);
  }

  if (puzzle.fragment) {
    savedState.fragments[puzzle.day] = puzzle.fragment;
  }

  persist();
}


/* =====================================================
   KALENDER
   ===================================================== */

function renderCalendar() {
  calendar.innerHTML = "";

  puzzles.forEach((puzzle, index) => {
    const button = document.createElement("button");
    const open = unlocked(puzzle.day);
    const complete = isSolved(puzzle.day);

    button.className = "door" + (complete ? " is-solved" : "");
    button.disabled = !open;

    button.setAttribute(
      "aria-label",
      `Türchen ${puzzle.day}: ${complete ? "gelöst" : open ? "öffnen" : "verschlossen"}`
    );

    button.innerHTML = `
      <span class="door-mark">${complete ? "✓" : open ? "✳" : "✧"}</span>
      <span class="door-number">${String(puzzle.day).padStart(2, "0")}</span>
      <span class="door-caption">${complete ? "Gelöst" : open ? "Brief öffnen" : "Versiegelt"}</span>
    `;

    button.addEventListener("click", () => openPuzzle(index));
    calendar.appendChild(button);
  });

  const count = savedState.solved.filter(day => DAYS.includes(day)).length;

  $("#progress-label").textContent = `${count} / 12 gelöst`;
  $("#progress-fill").style.width = `${count / 12 * 100}%`;
}


/* =====================================================
   RÄTSEL ÖFFNEN
   ===================================================== */

function openPuzzle(index) {
  active = puzzles[index];
  selected = [];
  hintLevel = 0;
  mazePath = [];
  dialValues = [0, 0, 0];

  $("#dialog-date").textContent =
    `BRIEF NR. ${String(active.day).padStart(2, "0")}`;

  $("#puzzle-title").textContent = active.title;
  $("#puzzle-prompt").textContent = active.prompt;

  $("#feedback").textContent = "";
  $("#feedback").className = "feedback";

  $("#hint-text").hidden = true;
  $("#hint-text").textContent = "";

  $("#hint-button").textContent = "Hinweis 1 öffnen";
  $("#hint-button").hidden = false;

  $("#check-answer").hidden = false;
  $("#solved-message").hidden = true;

  renderPuzzle();

  if (isSolved(active.day)) {
    showSolved();
  }

  dialog.showModal();
}


/* =====================================================
   ALLGEMEINE RENDER-HELFER
   ===================================================== */

function addVisual(text) {
  const element = document.createElement("div");
  element.className = "puzzle-visual";
  element.style.whiteSpace = "pre-line";
  element.textContent = text;
  content.appendChild(element);
}

function addInput(placeholder = "Deine Lösung …") {
  const input = document.createElement("input");

  input.id = "answer-input";
  input.className = "answer-input";
  input.placeholder = placeholder;
  input.autocomplete = "off";
  input.setAttribute("aria-label", "Deine Lösung");

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") checkAnswer();
  });

  content.appendChild(input);
  setTimeout(() => input.focus(), 50);
}

function addChoices(choices) {
  const list = document.createElement("div");
  list.className = "choice-list";

  choices.forEach(choice => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.textContent = choice;

    button.addEventListener("click", () => {
      selected = [choice];

      list.querySelectorAll("button").forEach(item => {
        item.classList.toggle("selected", item === button);
      });
    });

    list.appendChild(button);
  });

  content.appendChild(list);
}


/* =====================================================
   RÄTSEL RENDERN
   ===================================================== */

function renderPuzzle() {
  content.innerHTML = "";

  if (active.visual) {
    addVisual(active.visual);
  }

  if (active.kind === "input") {
    addInput();
  }

  if (active.kind === "choice") {
    addChoices(active.choices);
  }

  if (active.kind === "circuit") {
    addVisual("A = 1     B = 0     C = 1");
    addInput("Ausgang: 0 oder 1");
  }

  if (active.kind === "maze") {
    drawMaze();
  }

  if (active.kind === "dial") {
    drawDials();
  }

  if (active.kind === "slide") {
    createSlidePuzzle();
  }

  if (active.kind === "final") {
    drawFragments();
    addInput("Geheimes Lösungswort …");
  }
}


/* =====================================================
   ZAHLENLABYRINTH MIT STERNEN
   ===================================================== */

function drawMaze() {
  const grid = document.createElement("div");
  grid.className = "maze-grid";

  const walls = active.walls;
  const keys = active.keys;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const id = `${row},${col}`;
      const button = document.createElement("button");

      button.className = "maze-cell";

      if (id === active.start) {
        button.textContent = "S";
        button.classList.add("start");
      } else if (id === active.goal) {
        button.textContent = "Z";
        button.classList.add("goal");
      } else if (walls.includes(id)) {
        button.textContent = "×";
        button.classList.add("wall");
      } else if (keys.includes(id)) {
        button.textContent = "★";
        button.classList.add("key-cell");
      } else {
        button.textContent = "";
      }

      if (mazePath.includes(id)) {
        button.classList.add("path");
      }

      button.disabled =
        walls.includes(id) ||
        id === active.start;

      button.addEventListener("click", () => {
        const last = mazePath.length
          ? mazePath[mazePath.length - 1]
          : active.start;

        const [lastRow, lastCol] = last.split(",").map(Number);

        if (Math.abs(row - lastRow) + Math.abs(col - lastCol) !== 1) {
          setFeedback("Du kannst nur ein benachbartes Feld betreten.");
          return;
        }

        // Ein Schritt zurück ist erlaubt.
        if (mazePath.length >= 2 && id === mazePath[mazePath.length - 2]) {
          mazePath.pop();
        } else {
          mazePath.push(id);
        }

        drawMaze();

        if (id === active.goal) {
          setFeedback("Du hast das Ziel erreicht. Prüfe jetzt deine Route.");
        }
      });

      grid.appendChild(button);
    }
  }

  content.appendChild(grid);

  const found = active.keys.filter(key =>
    mazePath.includes(key)
  ).length;

  const status = document.createElement("p");
  status.className = "maze-status";
  status.textContent = `Sterne gesammelt: ${found} / 3`;
  content.appendChild(status);

  const reset = document.createElement("button");
  reset.className = "hint-button";
  reset.textContent = "Weg zurücksetzen";

  reset.addEventListener("click", () => {
    mazePath = [];
    setFeedback("");
    drawMaze();
  });

  content.appendChild(reset);
}


/* =====================================================
   ZAHLENSCHLOSS
   ===================================================== */

function drawDials() {
  const row = document.createElement("div");
  row.className = "dial-row";

  dialValues.forEach((value, index) => {
    const box = document.createElement("div");
    box.className = "dial";

    const up = document.createElement("button");
    up.textContent = "▲";
    up.setAttribute("aria-label", "Ziffer erhöhen");

    const number = document.createElement("strong");
    number.textContent = value;

    const down = document.createElement("button");
    down.textContent = "▼";
    down.setAttribute("aria-label", "Ziffer verringern");

    up.addEventListener("click", () => {
      dialValues[index] = (dialValues[index] + 1) % 10;
      number.textContent = dialValues[index];
      row.dataset.value = dialValues.join("");
    });

    down.addEventListener("click", () => {
      dialValues[index] = (dialValues[index] + 9) % 10;
      number.textContent = dialValues[index];
      row.dataset.value = dialValues.join("");
    });

    box.append(up, number, down);
    row.appendChild(box);
  });

  row.dataset.value = dialValues.join("");
  content.appendChild(row);
}


/* =====================================================
   SCHIEBEPUZZLE
   ===================================================== */

function createSlidePuzzle() {
  slide = Array.from({ length: 16 }, (_, i) => i + 1);
  slide[15] = 0;

  // Das Puzzle wird durch legale Züge gemischt.
  // Dadurch bleibt es immer lösbar.
  let previousBlank = -1;
  let blank = 15;

  for (let move = 0; move < 32; move++) {
    const row = Math.floor(blank / 4);
    const col = blank % 4;

    const candidates = [
      row > 0 ? blank - 4 : -1,
      row < 3 ? blank + 4 : -1,
      col > 0 ? blank - 1 : -1,
      col < 3 ? blank + 1 : -1
    ].filter(index => index >= 0 && index !== previousBlank);

    const next = candidates[(move * 7 + 3) % candidates.length];

    [slide[blank], slide[next]] = [slide[next], slide[blank]];

    previousBlank = blank;
    blank = next;
  }

  drawSlide();
}

function drawSlide() {
  const grid = document.createElement("div");
  grid.className = "maze-grid slide-grid";
  grid.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";

  slide.forEach((number, index) => {
    const button = document.createElement("button");
    button.className = "maze-cell slide-cell";
    button.textContent = number || "·";

    if (!number) {
      button.classList.add("goal");
    }

    button.addEventListener("click", () => {
      const blank = slide.indexOf(0);

      const distance =
        Math.abs(Math.floor(index / 4) - Math.floor(blank / 4)) +
        Math.abs(index % 4 - blank % 4);

      if (distance !== 1) return;

      [slide[index], slide[blank]] = [slide[blank], slide[index]];

      drawSlide();
    });

    grid.appendChild(button);
  });

  content.innerHTML = "";
  content.appendChild(grid);

  const reset = document.createElement("button");
  reset.className = "hint-button";
  reset.textContent = "Neu mischen";

  reset.addEventListener("click", createSlidePuzzle);
  content.appendChild(reset);
}


/* =====================================================
   FINALE: GESAMMELTE FRAGMENTE
   ===================================================== */

function drawFragments() {
  const box = document.createElement("div");
  box.className = "fragment-box";

  const collected = DAYS
    .filter(day => day !== 23 && savedState.fragments[day])
    .map(day => savedState.fragments[day]);

  const missing = DAYS.filter(day =>
    day !== 23 && !savedState.fragments[day]
  );

  const heading = document.createElement("strong");
  heading.textContent = "Deine gesammelten Buchstaben";
  box.appendChild(heading);

  const letters = document.createElement("div");
  letters.className = "fragment-letters";
  letters.textContent = collected.length
    ? collected.join(" · ")
    : "Noch keine Fragmente gesammelt";

  box.appendChild(letters);

  const status = document.createElement("p");
  status.textContent = missing.length
    ? `Es fehlen noch ${missing.length} Fragmente.`
    : "Alle elf Fragmente sind beisammen.";

  box.appendChild(status);
  content.appendChild(box);
}


/* =====================================================
   ANTWORTEN PRÜFEN
   ===================================================== */

function normalized(value) {
  return String(value)
    .trim()
    .toUpperCase()
    .replace(/\s/g, "")
    .replace(/[–—-]/g, "");
}

function checkAnswer() {
  if (!active || isSolved(active.day)) return;

  let correct = false;

  if (active.kind === "input" || active.kind === "circuit") {
    const input = $("#answer-input");
    correct = normalized(input.value) === normalized(active.answer);
  }

  if (active.kind === "choice") {
    correct = selected[0] === active.answer;
  }

  if (active.kind === "dial") {
    correct = dialValues.join("") === active.answer;
  }

  if (active.kind === "maze") {
    const visited = new Set(mazePath);
    const allKeysFound = active.keys.every(key => visited.has(key));
    const reachedGoal = mazePath.includes(active.goal);

    correct = allKeysFound && reachedGoal;
  }

  if (active.kind === "slide") {
    correct = slide.every((number, index) => number === (index === 15 ? 0 : index + 1));
  }

  if (active.kind === "final") {
    const allFragmentsCollected = DAYS
      .filter(day => day !== 23)
      .every(day => savedState.fragments[day]);

    if (!allFragmentsCollected) {
      setFeedback("Dir fehlen noch Fragmente aus früheren Türchen.");
      return;
    }

    correct =
      normalized($("#answer-input").value) === normalized(active.answer);
  }

  if (correct) {
    savePuzzle(active);
    setFeedback("Richtig! Du hast das Geheimnis gelüftet.", true);
    showSolved();
    renderCalendar();
  } else {
    setFeedback("Noch nicht ganz. Prüfe deine Überlegung und versuche es erneut.");
  }
}


/* =====================================================
   HINWEISE
   ===================================================== */

function showNextHint() {
  if (!active || isSolved(active.day)) return;

  const hints = active.hints || [];

  if (hintLevel >= hints.length) {
    setFeedback("Du hast bereits alle drei Hinweise geöffnet.");
    return;
  }

  $("#hint-text").hidden = false;
  $("#hint-text").textContent = `Hinweis ${hintLevel + 1}: ${hints[hintLevel]}`;

  hintLevel++;

  $("#hint-button").textContent =
    hintLevel >= hints.length
      ? "Alle Hinweise geöffnet"
      : `Hinweis ${hintLevel + 1} öffnen`;
}


/* =====================================================
   FEEDBACK UND ERFOLG
   ===================================================== */

function setFeedback(message, good = false) {
  const feedback = $("#feedback");
  feedback.textContent = message;
  feedback.className = good ? "feedback good" : "feedback";
}

function showSolved() {
  $("#solved-message").hidden = false;

  if (active.fragment) {
    $("#solved-message").textContent =
      `✦ Gelöst! Dein Buchstabe für das Finale: ${active.fragment} ✦`;
  } else {
    $("#solved-message").textContent =
      "✦ Das Weihnachtsgeheimnis ist gelüftet! ✦";
  }

  $("#check-answer").hidden = true;
  $("#hint-button").hidden = true;

  content.querySelectorAll("button, input").forEach(element => {
    element.disabled = true;
  });
}


/* =====================================================
   BEDIENUNG
   ===================================================== */

$("#check-answer").addEventListener("click", checkAnswer);
$("#hint-button").addEventListener("click", showNextHint);

$("#close-dialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", event => {
  if (event.target === dialog) {
    dialog.close();
  }
});


/* =====================================================
   START
   ===================================================== */

renderCalendar();

if (PREVIEW_MODE) {
  console.info("Vorschau aktiv: ?preview=1");
}
