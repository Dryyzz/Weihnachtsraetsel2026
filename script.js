// ========================================
// DIE KLEINE RÄTSELSTUBE
// Adventskalender 2026
// ========================================

const CALENDAR_YEAR = 2026;
const PREVIEW_MODE = new URLSearchParams(location.search).has("preview");

const puzzles = [

  {
    day: 1,
    title: "Die Folge im Schnee",
    type: "input",
    prompt: "Eine Zahlenreihe wurde in den Schnee geschrieben. Welche Zahl fehlt am Ende?",
    visual: "3 · 8 · 15 · 24 · 35 · ?",
    answer: "48",
    hint: "Betrachte nicht nur die Zahlen, sondern die Abstände zwischen ihnen."
  },

  {
    day: 3,
    title: "Drei aus sieben",
    type: "sum",
    prompt: "Wähle genau drei verschiedene Zahlen. Ihre Summe soll 24 ergeben.",
    choices: [2, 4, 6, 7, 9, 11, 13],
    answer: [2, 9, 13],
    hint: "Sortiere die Zahlen gedanklich und prüfe, welche Kombination genau 24 ergibt."
  },

  {
    day: 5,
    title: "Der verschlüsselte Gruß",
    type: "input",
    prompt: "Ein alter Brief wurde mit einer Caesar-Verschiebung um drei Stellen verschlüsselt. Jeder Buchstabe wurde im Alphabet drei Plätze nach rechts verschoben. Entschlüssle das Wort.",
    visual: "I U R V W",
    answer: "FROST",
    hint: "Gehe beim Entschlüsseln drei Buchstaben zurück. I wird zu F."
  },

  {
    day: 7,
    title: "Das binäre Fenster",
    type: "bits",
    prompt: "Stelle die Dezimalzahl 173 mit den acht Schaltern dar. Die Stellenwerte stehen über den Schaltern. Schalte die passenden Werte ein.",
    visual: "128 · 64 · 32 · 16 · 8 · 4 · 2 · 1",
    weights: [128, 64, 32, 16, 8, 4, 2, 1],
    answer: "10101101",
    hint: "Zerlege 173 in Zweierpotenzen: 128 + 32 + 8 + 4 + 1."
  },

  {
    day: 9,
    title: "Die Ordnung der Dinge",
    type: "order",
    prompt: "Der Bibliothekar hat fünf Seitenzahlen durcheinandergebracht. Ordne sie aufsteigend, indem du die Karten mit den Pfeilen verschiebst.",
    items: [34, 13, 21, 8, 5],
    answer: [5, 8, 13, 21, 34],
    hint: "Es sind aufeinanderfolgende Zahlen der Fibonacci-Folge."
  },

  {
    day: 11,
    title: "Die drei Schachteln",
    type: "choice",
    prompt: "In genau einer von drei Schachteln liegt ein Schlüssel. Auf den Schachteln stehen Hinweise: Gold: „Der Schlüssel liegt nicht hier.“ Silber: „Der Schlüssel liegt in der Goldschachtel.“ Holz: „Der Schlüssel liegt nicht in der Silberschachtel.“ Genau einer der drei Hinweise ist wahr. In welcher Schachtel liegt der Schlüssel?",
    choices: ["Gold", "Silber", "Holz", "Das lässt sich nicht bestimmen"],
    answer: "Silber",
    hint: "Teste die drei möglichen Fundorte. Nur bei einer Schachtel ist genau ein Hinweis wahr."
  },

  {
    day: 13,
    title: "Der Weg durch den Tannenwald",
    type: "maze",
    prompt: "Führe den kleinen Stern vom Start (S) zum Ziel (Z). Tippe die Felder in der richtigen Reihenfolge an. Diagonale Schritte sind nicht erlaubt; dunkle Felder sind verschneite Felsen.",
    answer: "0,1|0,2|1,2|2,2|2,3|3,3|4,3|4,4",
    hint: "Der Weg führt zunächst nach rechts, dann hinunter durch die freie mittlere Passage.",
    walls: [
      "1,0", "1,1", "3,0", "3,1",
      "3,2", "1,3", "2,4", "3,4"
    ]
  },

  {
    day: 15,
    title: "Die drei Zahlensiegel",
    type: "dials",
    prompt: "Drei Zahlensiegel öffnen die Schatulle. Stelle die Ziffern so ein, dass alle Bedingungen erfüllt sind: Die Summe ist 12, die mittlere Ziffer ist doppelt so groß wie die erste, und die letzte ist um 2 größer als die erste.",
    answer: "246",
    hint: "Nenne die erste Ziffer x. Dann lauten die drei Ziffern x, 2x und x+2."
  },

  {
    day: 17,
    title: "Stern, Mond und Tanne",
    type: "input",
    prompt: "Jedes Symbol steht für eine positive ganze Zahl. Es gilt: Stern + Stern + Mond = 19 und Mond minus Tanne = 2. Außerdem ist Stern = 6. Welchen Wert hat die Tanne?",
    visual: "★ + ★ + ☾ = 19   |   ☾ − ▲ = 2",
    answer: "5",
    hint: "Bestimme zuerst den Mondwert. Ziehe davon anschließend 2 ab."
  },

  {
    day: 19,
    title: "Der Fall der verschwundenen Praline",
    type: "choice",
    prompt: "Eine Person hat die Praline genommen. Genau eine der folgenden Aussagen ist wahr. Alex: „Es war Bea.“ Bea: „Ich war es nicht.“ Cora: „Alex war es nicht.“ Wer war es?",
    choices: ["Alex", "Bea", "Cora", "Nicht eindeutig"],
    answer: "Alex",
    hint: "Teste jeden möglichen Täter. Bei Alex als Täter ist nur Beas Aussage wahr."
  },

  {
    day: 21,
    title: "Das kleine Schiebewerk",
    type: "slide",
    prompt: "Bringe die Zahlen in die Reihenfolge 1 bis 8. Tippe eine Kachel neben dem leeren Feld an, um sie hineinzuschieben.",
    answer: "1,2,3,4,5,6,7,8,0",
    initial: [1, 2, 3, 4, 0, 6, 7, 5, 8],
    hint: "Arbeite zeilenweise: erst die obere Reihe, dann die mittlere. Das leere Feld muss am Ende rechts unten stehen."
  },

  {
    day: 23,
    title: "Das letzte Siegel",
    type: "input",
    prompt: "Das Finale vereint drei Zahlen aus dem Weihnachtsbrief: die Anzahl der Türchen, die Anzahl der Tage zwischen dem ersten und letzten Türchen und die Anzahl der Monate im Jahr. Addiere diese drei Zahlen.",
    visual: "12 + 22 + 12 = ?",
    answer: "46",
    hint: "Es gibt 12 Rätseltürchen. Vom 1. bis zum 23. sind es 22 Tage Abstand. Ein Jahr hat 12 Monate."
  }

];


// ========================================
// GRUNDLEGENDE FUNKTIONEN
// ========================================

const $ = s => document.querySelector(s);

const calendar = $("#calendar");
const dialog = $("#puzzle-dialog");
const content = $("#puzzle-content");

let active = null;
let selected = [];
let bits = [];
let order = [];
let mazePath = [];
let slide = [];

const storageKey = "raetselstube-" + CALENDAR_YEAR;


function solved() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}


function unlocked(day) {
  if (PREVIEW_MODE) return true;

  const d = new Date();

  return d.getFullYear() > CALENDAR_YEAR ||
    (
      d.getFullYear() === CALENDAR_YEAR &&
      d.getMonth() === 11 &&
      d.getDate() >= day
    );
}


function save(day) {
  const a = solved();

  if (!a.includes(day)) {
    a.push(day);
  }

  localStorage.setItem(storageKey, JSON.stringify(a));
}


// ========================================
// KALENDER DARSTELLEN
// ========================================

function renderCalendar() {

  calendar.innerHTML = "";

  const done = solved();

  puzzles.forEach((p, i) => {

    const b = document.createElement("button");
    const open = unlocked(p.day);
    const complete = done.includes(p.day);

    b.className = "door" + (complete ? " is-solved" : "");
    b.disabled = !open;

    b.setAttribute(
      "aria-label",
      `Türchen ${p.day}: ${
        complete ? "gelöst" : open ? "öffnen" : "noch verschlossen"
      }`
    );

    b.innerHTML = `
      <span class="door-mark">${complete ? "✓" : open ? "✳" : "✧"}</span>
      <span class="door-number">${String(p.day).padStart(2, "0")}</span>
      <span class="door-caption">${
        complete ? "Gelöst" : open ? "Brief öffnen" : "Versiegelt"
      }</span>
    `;

    b.addEventListener("click", () => openPuzzle(i));

    calendar.appendChild(b);

  });

  $("#progress-label").textContent = `${done.length} / 12 gelöst`;

  $("#progress-fill").style.width =
    `${done.length / 12 * 100}%`;
}


// ========================================
// RÄTSEL ÖFFNEN
// ========================================

function openPuzzle(i) {

  active = puzzles[i];

  selected = [];
  bits = Array(active.type === "bits" ? 8 : 0).fill(false);
  order = [...(active.items || [])];
  mazePath = [];
  slide = [...(active.initial || [])];

  $("#dialog-date").textContent =
    `BRIEF NR. ${String(active.day).padStart(2, "0")}`;

  $("#puzzle-title").textContent = active.title;
  $("#puzzle-prompt").textContent = active.prompt;

  $("#feedback").textContent = "";
  $("#feedback").className = "feedback";

  $("#hint-text").hidden = true;
  $("#hint-text").textContent = active.hint;

  $("#hint-button").hidden = false;
  $("#check-answer").hidden = false;
  $("#solved-message").hidden = true;

  renderPuzzle();

  if (solved().includes(active.day)) {
    showSolved();
  }

  dialog.showModal();
}


// ========================================
// RÄTSEL ELEMENTE
// ========================================

function visual(text) {

  const v = document.createElement("div");

  v.className = "puzzle-visual";
  v.textContent = text;

  content.appendChild(v);
}


// ========================================
// RÄTSEL RENDERN
// ========================================

function renderPuzzle() {

  content.innerHTML = "";

  if (active.visual) {
    visual(active.visual);
  }


  // FREIE TEXTEINGABE

  if (active.type === "input") {

    const x = document.createElement("input");

    x.id = "answer-input";
    x.className = "answer-input";
    x.placeholder = "Deine Lösung …";
    x.autocomplete = "off";
    x.setAttribute("aria-label", "Deine Lösung");

    x.addEventListener("keydown", e => {
      if (e.key === "Enter") check();
    });

    content.appendChild(x);

    setTimeout(() => x.focus(), 40);
  }


  // AUSWAHLRÄTSEL

  if (active.type === "choice") {

    const list = document.createElement("div");
    list.className = "choice-list";

    active.choices.forEach(c => {

      const b = document.createElement("button");

      b.className = "choice-button";
      b.textContent = c;

      b.onclick = () => {

        selected = [c];

        list.querySelectorAll("button").forEach(x => {
          x.classList.toggle("selected", x === b);
        });

      };

      list.appendChild(b);

    });

    content.appendChild(list);
  }


  // ZAHLENKOMBINATION

  if (active.type === "sum") {

    const list = document.createElement("div");
    list.className = "choice-list";

    active.choices.forEach(c => {

      const b = document.createElement("button");

      b.className = "choice-button";
      b.textContent = c;

      b.onclick = () => {

        if (selected.includes(c)) {

          selected = selected.filter(x => x !== c);

        } else if (selected.length < 3) {

          selected.push(c);

        }

        b.classList.toggle("selected", selected.includes(c));

        $("#selection-count").textContent =
          `${selected.length} / 3 ausgewählt`;

      };

      list.appendChild(b);

    });

    content.appendChild(list);

    const n = document.createElement("p");

    n.id = "selection-count";
    n.style.cssText = "font-size:.72rem;color:#887665";
    n.textContent = "0 / 3 ausgewählt";

    content.appendChild(n);
  }


  // BINÄRSCHALTER

  if (active.type === "bits") {

    const row = document.createElement("div");
    row.className = "bit-row";

    active.weights.forEach((w, i) => {

      const b = document.createElement("button");

      b.className = "bit-button";
      b.innerHTML = `<small>${w}</small>0`;

      b.onclick = () => {

        bits[i] = !bits[i];

        b.classList.toggle("on", bits[i]);

        b.innerHTML = `
          <small>${w}</small>
          ${bits[i] ? 1 : 0}
        `;

      };

      row.appendChild(b);

    });

    content.appendChild(row);
  }


  // SORTIERRÄTSEL

  if (active.type === "order") {

    const list = document.createElement("div");

    list.className = "order-list";

    content.appendChild(list);

    drawOrder(list);
  }


  // LABYRINTH

  if (active.type === "maze") {
    drawMaze();
  }


  // ZAHLENSCHLOSS

  if (active.type === "dials") {
    drawDials();
  }


  // SCHIEBEPuzzle

  if (active.type === "slide") {
    drawSlide();
  }

}


// ========================================
// ZAHLEN SORTIEREN
// ========================================

function drawOrder(list) {

  list.innerHTML = "";

  order.forEach((n, i) => {

    const row = document.createElement("div");
    row.className = "order-item";

    const t = document.createElement("strong");
    t.textContent = n;

    row.appendChild(t);

    const c = document.createElement("div");
    c.className = "move-controls";

    [-1, 1].forEach(d => {

      const b = document.createElement("button");

      b.className = "move-button";
      b.textContent = d < 0 ? "↑" : "↓";

      b.disabled = i + d < 0 || i + d >= order.length;

      b.onclick = () => {

        [order[i], order[i + d]] =
          [order[i + d], order[i]];

        drawOrder(list);

      };

      c.appendChild(b);

    });

    row.appendChild(c);
    list.appendChild(row);

  });

}


// ========================================
// ZAHLENLABYRINTH
// ========================================

function drawMaze() {

  const grid = document.createElement("div");

  grid.className = "maze-grid";

  const walls = active.walls;

  for (let r = 0; r < 5; r++) {

    for (let c = 0; c < 5; c++) {

      const id = `${r},${c}`;

      const b = document.createElement("button");

      b.className = "maze-cell";

      b.textContent =
        id === "0,0" ? "S" :
        id === "4,4" ? "Z" :
        walls.includes(id) ? "×" : "";

      if (walls.includes(id)) {
        b.classList.add("wall");
      }

      if (id === "0,0") {
        b.classList.add("start");
      }

      if (id === "4,4") {
        b.classList.add("goal");
      }

      if (mazePath.includes(id)) {
        b.classList.add("path");
      }

      b.disabled = walls.includes(id) || id === "0,0";

      b.onclick = () => {

        const last = mazePath.length
          ? mazePath[mazePath.length - 1]
          : "0,0";

        const [lr, lc] = last.split(",").map(Number);

        if (Math.abs(r - lr) + Math.abs(c - lc) !== 1) {

          $("#feedback").textContent =
            "Nur ein Schritt nach oben, unten, links oder rechts.";

          return;
        }

        mazePath.push(id);

        drawMaze();

        if (id === "4,4") {
          $("#feedback").textContent =
            "Am Ziel angekommen – prüfe deine Route!";
        }

      };

      grid.appendChild(b);

    }

  }

  content.appendChild(grid);

  const reset = document.createElement("button");

  reset.className = "hint-button";
  reset.textContent = "Weg zurücksetzen";

  reset.onclick = () => {

    mazePath = [];

    $("#feedback").textContent = "";

    drawMaze();

  };

  content.appendChild(reset);

}


// ========================================
// ZAHLENSCHLOSS
// ========================================

function drawDials() {

  const row = document.createElement("div");

  row.className = "dial-row";

  [0, 0, 0].forEach((v, i) => {

    const box = document.createElement("div");

    box.className = "dial";

    const up = document.createElement("button");
    up.textContent = "▲";

    const num = document.createElement("strong");
    num.textContent = v;

    const down = document.createElement("button");
    down.textContent = "▼";

    up.onclick = () => {

      v = (v + 1) % 10;
      num.textContent = v;

      row.dataset.value =
        [...row.querySelectorAll("strong")]
          .map(x => x.textContent).join("");

    };

    down.onclick = () => {

      v = (v + 9) % 10;
      num.textContent = v;

      row.dataset.value =
        [...row.querySelectorAll("strong")]
          .map(x => x.textContent).join("");

    };

    box.append(up, num, down);

    row.appendChild(box);

  });

  row.dataset.value = "000";

  content.appendChild(row);

}


// ========================================
// SCHIEBEPUZZLE
// ========================================

function drawSlide() {

  const grid = document.createElement("div");

  grid.className = "maze-grid";
  grid.style.gridTemplateColumns = "repeat(3,1fr)";

  slide.forEach((n, i) => {

    const b = document.createElement("button");

    b.className = "maze-cell";
    b.textContent = n || "·";

    if (!n) {
      b.classList.add("goal");
    }

    b.onclick = () => {

      const z = slide.indexOf(0);

      const distance =
        Math.abs(Math.floor(i / 3) - Math.floor(z / 3)) +
        Math.abs(i % 3 - z % 3);

      if (distance !== 1) return;

      [slide[i], slide[z]] = [slide[z], slide[i]];

      drawSlide();

    };

    grid.appendChild(b);

  });

  content.appendChild(grid);

}


// ========================================
// LÖSUNGEN PRÜFEN
// ========================================

function check() {

  if (!active || solved().includes(active.day)) return;

  let ok = false;


  if (active.type === "input") {

    ok =
      $("#answer-input").value
        .trim()
        .toUpperCase()
        .replace(/\s/g, "") === active.answer;

  }


  if (active.type === "choice") {
    ok = selected[0] === active.answer;
  }


  if (active.type === "sum") {

    ok =
      selected.length === 3 &&
      selected.reduce((a, b) => a + b, 0) === 24;

  }


  if (active.type === "bits") {

    ok =
      bits.map(x => x ? "1" : "0").join("") === active.answer;

  }


  if (active.type === "order") {

    ok = order.join(",") === active.answer.join(",");

  }


  if (active.type === "maze") {

    ok = mazePath.join("|") === active.answer;

  }


  if (active.type === "dials") {

    ok =
      content.querySelector(".dial-row").dataset.value === active.answer;

  }


  if (active.type === "slide") {

    ok = slide.join(",") === active.answer;

  }


  if (ok) {

    save(active.day);

    $("#feedback").textContent = "Das ist die richtige Lösung.";
    $("#feedback").className = "feedback good";

    showSolved();

    renderCalendar();

  } else {

    $("#feedback").textContent =
      "Noch nicht ganz. Prüfe deine Überlegung und versuche es erneut.";

  }

}


// ========================================
// ERFOLG UND BEDIENUNG
// ========================================

function showSolved() {

  $("#solved-message").hidden = false;

  $("#check-answer").hidden = true;
  $("#hint-button").hidden = true;

  content.querySelectorAll("button,input").forEach(x => {
    x.disabled = true;
  });

}


$("#check-answer").addEventListener("click", check);

$("#hint-button").addEventListener("click", () => {
  $("#hint-text").hidden = !$("#hint-text").hidden;
});

$("#close-dialog").addEventListener("click", () => {
  dialog.close();
});

dialog.addEventListener("click", e => {
  if (e.target === dialog) dialog.close();
});


// Kalender initialisieren

renderCalendar();

if (PREVIEW_MODE) {
  console.info("Vorschau aktiv: ?preview=1 zeigt alle Türchen vorab.");
}