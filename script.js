// Adventskalender-Konfiguration: Für ein anderes Jahr nur diese Zahl ändern.
const CALENDAR_YEAR = 2026;
const PREVIEW_MODE = new URLSearchParams(location.search).has("preview");

const puzzles = [
  { day:1, title:"Die geheimnisvolle Folge", type:"input", prompt:"Welche Zahl kommt als Nächstes? Jede Zahl entsteht aus der vorherigen – finde das Muster.", visual:"2 · 6 · 12 · 20 · 30 · ?", answer:"42", hint:"Die Abstände werden immer um 2 größer: +4, +6, +8, +10 …" },
  { day:3, title:"Drei Zahlen, eine Summe", type:"sum", prompt:"Wähle genau drei verschiedene Zahlen, deren Summe 18 ergibt.", choices:[2,4,5,6,7,9,11], answer:[2,5,11], hint:"Eine mögliche Kombination ist 2 + 5 + 11." },
  { day:5, title:"Der kleine Zahlencode", type:"input", prompt:"Ich bin eine dreistellige Zahl. Meine Zehnerstelle ist doppelt so groß wie meine Einerstelle. Meine Hunderterstelle ist um 1 kleiner als meine Zehnerstelle. Die Quersumme ist 9. Wer bin ich?", answer:"342", hint:"Schreibe die Ziffern als H-Z-E. Die Einerstelle ist 2." },
  { day:7, title:"Licht an, Licht aus", type:"bits", prompt:"Stelle mit den fünf Schaltern die Zahl 19 dar. Jeder Schalter zählt von links nach rechts 16, 8, 4, 2 oder 1, wenn er eingeschaltet ist.", answer:"10011", hint:"19 = 16 + 2 + 1. Schalte also diese drei Stellen ein." },
  { day:9, title:"Muster-Detektiv", type:"choice", prompt:"Welches Symbol setzt die Reihe sinnvoll fort? Denke an die Anzahl der Ecken.", visual:"△   □   ⬟   ?", choices:["○  Kreis","⬡  Sechseck","☆  Stern","◇  Raute"], answer:"⬡  Sechseck", hint:"Die Anzahl der Ecken steigt jeweils um eins: 3, 4, 5 …" },
  { day:11, title:"Die richtige Reihenfolge", type:"order", prompt:"Sortiere die Zahlen von klein nach groß. Tippe auf die Pfeile, um die Karten zu verschieben.", items:[8,3,13,5,1], answer:[1,3,5,8,13], hint:"Beginne mit der kleinsten Zahl. Die Reihe wächst jeweils um 2, 2, 3 und 5." },
  { day:13, title:"Das Zahlenlabyrinth", type:"choice", prompt:"Du darfst nur Zahlen wählen, die größer als die vorherige sind. Welche Route führt von 2 zur 11?", visual:"Start: 2  →  ?", choices:["2 → 4 → 7 → 11","2 → 8 → 6 → 11","2 → 5 → 3 → 11","2 → 9 → 7 → 11"], answer:"2 → 4 → 7 → 11", hint:"Prüfe bei jedem Schritt, ob die nächste Zahl wirklich größer ist." },
  { day:15, title:"Eine Gleichung kippt", type:"input", prompt:"Setze Klammern so, dass die Rechnung stimmt. Welchen Wert hat x?", visual:"8 + 4 × 2 = x", answer:"16", hint:"Punktrechnung geht vor Strichrechnung." },
  { day:17, title:"Die geheimen Symbole", type:"input", prompt:"Jedes Symbol steht für eine Zahl. Es gilt: ★ + ★ = 10 und ★ + ☾ = 13. Wie viel ist ☾?", visual:"★ + ☾ = ?", answer:"8", hint:"Ein Stern ist 5 wert. Was musst du zu 5 addieren, um 13 zu erhalten?" },
  { day:19, title:"Wer hat den Keks genommen?", type:"choice", prompt:"Anna sagt: „Ben war es.“ Ben sagt: „Clara war es.“ Clara sagt: „Ben lügt.“ Genau eine Aussage ist wahr. Wer hat den Keks genommen?", choices:["Anna","Ben","Clara","Das lässt sich nicht bestimmen"], answer:"Anna", hint:"Teste jede Person als Täter und zähle, wie viele Aussagen dann wahr wären." },
  { day:21, title:"Die fehlende Zahl", type:"input", prompt:"Finde die Zahl, die das Muster vervollständigt.", visual:"1 · 1 · 2 · 3 · 5 · 8 · ?", answer:"13", hint:"Jede Zahl ist die Summe der beiden vorherigen." },
  { day:23, title:"Das Weihnachtsfinale", type:"input", prompt:"Zum Abschluss: Eine Schneeflocke hat 6 Arme. An jedem Arm sitzen 2 Sterne, und in der Mitte funkeln 3 weitere. Wie viele Sterne sind es insgesamt?", answer:"15", hint:"Sechs Arme mit je zwei Sternen – plus die drei in der Mitte." }
];

const calendar = document.querySelector("#calendar");
const dialog = document.querySelector("#puzzle-dialog");
const content = document.querySelector("#puzzle-content");
const feedback = document.querySelector("#feedback");
const checkButton = document.querySelector("#check-answer");
const hintButton = document.querySelector("#hint-button");
const hintText = document.querySelector("#hint-text");
const solvedMessage = document.querySelector("#solved-message");
let activePuzzle = null;
let selected = [];
let bits = [false,false,false,false,false];
let order = [];

function isUnlocked(day) {
  if (PREVIEW_MODE) return true;
  const now = new Date();
  return now.getFullYear() > CALENDAR_YEAR ||
    (now.getFullYear() === CALENDAR_YEAR && now.getMonth() === 11 && now.getDate() >= day);
}
function solvedDays() {
  try { return JSON.parse(localStorage.getItem("advent-solved-" + CALENDAR_YEAR) || "[]"); }
  catch { return []; }
}
function saveSolved(day) {
  const days = solvedDays();
  if (!days.includes(day)) days.push(day);
  localStorage.setItem("advent-solved-" + CALENDAR_YEAR, JSON.stringify(days));
}
function renderCalendar() {
  const solved = solvedDays();
  calendar.innerHTML = "";
  puzzles.forEach((p, index) => {
    const unlocked = isUnlocked(p.day);
    const done = solved.includes(p.day);
    const button = document.createElement("button");
    button.className = "door" + (done ? " is-solved" : "");
    button.disabled = !unlocked;
    button.setAttribute("aria-label", `Türchen ${p.day}${done ? ", gelöst" : unlocked ? ", öffnen" : ", noch geschlossen"}`);
    button.innerHTML = `<span class="door-symbol">${done ? "✓" : unlocked ? "✳" : "✧"}</span><span class="door-number">${String(p.day).padStart(2,"0")}</span><span class="door-caption">${done ? "Gelöst" : unlocked ? "Öffnen" : "Bald"}</span>`;
    button.addEventListener("click", () => openPuzzle(index));
    calendar.appendChild(button);
  });
  document.querySelector("#progress-label").textContent = `${solved.length} von 12 gelöst`;
  document.querySelector("#progress-fill").style.width = `${Math.min(100, solved.length / 12 * 100)}%`;
}
function openPuzzle(index) {
  activePuzzle = puzzles[index];
  selected = []; bits = [false,false,false,false,false]; order = [...(activePuzzle.items || [])];
  document.querySelector("#dialog-date").textContent = `TÜRCHEN ${String(activePuzzle.day).padStart(2,"0")}`;
  document.querySelector("#puzzle-title").textContent = activePuzzle.title;
  document.querySelector("#puzzle-prompt").textContent = activePuzzle.prompt;
  feedback.textContent = ""; feedback.className = "feedback";
  hintText.hidden = true; hintText.textContent = activePuzzle.hint;
  hintButton.hidden = false; checkButton.hidden = false; solvedMessage.hidden = true;
  renderPuzzle();
  const done = solvedDays().includes(activePuzzle.day);
  if (done) markSolvedUI();
  dialog.showModal();
}
function renderPuzzle() {
  content.innerHTML = "";
  if (activePuzzle.visual) {
    const visual = document.createElement("div");
    visual.className = "puzzle-visual";
    visual.style.cssText = "font:600 1.2rem 'Playfair Display',serif;letter-spacing:.08em;background:#f2ecdf;border-radius:12px;padding:14px;margin-bottom:14px";
    visual.textContent = activePuzzle.visual;
    content.appendChild(visual);
  }
  if (activePuzzle.type === "input") {
    const input = document.createElement("input");
    input.id = "answer-input"; input.className = "answer-input"; input.placeholder = "Deine Antwort …";
    input.autocomplete = "off"; input.inputMode = "numeric"; input.setAttribute("aria-label","Deine Antwort");
    input.addEventListener("keydown", e => { if (e.key === "Enter") checkAnswer(); });
    content.appendChild(input);
    setTimeout(() => input.focus(), 50);
  }
  if (activePuzzle.type === "sum" || activePuzzle.type === "choice") {
    const list = document.createElement("div"); list.className = "choice-list";
    activePuzzle.choices.forEach(choice => {
      const b = document.createElement("button"); b.className = "choice-button"; b.textContent = choice;
      b.addEventListener("click", () => {
        if (activePuzzle.type === "choice") {
          selected = [choice]; list.querySelectorAll("button").forEach(x => x.classList.toggle("selected", x === b));
        } else {
          if (selected.includes(choice)) selected = selected.filter(x => x !== choice);
          else if (selected.length < 3) selected.push(choice);
          b.classList.toggle("selected", selected.includes(choice));
        }
      });
      list.appendChild(b);
    });
    content.appendChild(list);
    if (activePuzzle.type === "sum") {
      const count = document.createElement("p"); count.id = "selection-count"; count.style.cssText = "font-size:.75rem;color:#8b7869";
      count.textContent = "0 von 3 Zahlen ausgewählt"; content.appendChild(count);
      list.addEventListener("click", () => count.textContent = `${selected.length} von 3 Zahlen ausgewählt`);
    }
  }
  if (activePuzzle.type === "bits") {
    const row = document.createElement("div"); row.className = "bit-row";
    [16,8,4,2,1].forEach((value,i) => {
      const b = document.createElement("button"); b.className = "bit-button"; b.innerHTML = `<small>${value}</small>0`;
      b.setAttribute("aria-pressed","false");
      b.addEventListener("click", () => { bits[i] = !bits[i]; b.classList.toggle("on",bits[i]); b.innerHTML = `<small>${value}</small>${bits[i] ? 1 : 0}`; b.setAttribute("aria-pressed",String(bits[i])); });
      row.appendChild(b);
    });
    content.appendChild(row);
  }
  if (activePuzzle.type === "order") {
    const list = document.createElement("div"); list.className = "order-list"; list.id = "order-list";
    drawOrder(list); content.appendChild(list);
  }
}
function drawOrder(list) {
  list.innerHTML = "";
  order.forEach((value,i) => {
    const row = document.createElement("div"); row.className = "order-item";
    const num = document.createElement("strong"); num.textContent = value; row.appendChild(num);
    const controls = document.createElement("div"); controls.className = "move-controls";
    [-1,1].forEach(delta => {
      const b = document.createElement("button"); b.className = "move-button"; b.textContent = delta < 0 ? "↑" : "↓";
      b.setAttribute("aria-label",delta < 0 ? "Nach oben" : "Nach unten");
      b.disabled = i + delta < 0 || i + delta >= order.length;
      b.addEventListener("click", () => { [order[i],order[i+delta]] = [order[i+delta],order[i]]; drawOrder(list); });
      controls.appendChild(b);
    });
    row.appendChild(controls); list.appendChild(row);
  });
}
function checkAnswer() {
  if (!activePuzzle || solvedDays().includes(activePuzzle.day)) return;
  let correct = false;
  if (activePuzzle.type === "input") {
    const input = document.querySelector("#answer-input");
    correct = input.value.trim().toLowerCase().replace(/\s/g,"") === String(activePuzzle.answer).toLowerCase().replace(/\s/g,"");
  } else if (activePuzzle.type === "choice") correct = selected[0] === activePuzzle.answer;
  else if (activePuzzle.type === "sum") correct = selected.length === 3 && [...selected].sort((a,b)=>a-b).join(",") === [...activePuzzle.answer].sort((a,b)=>a-b).join(",");
  else if (activePuzzle.type === "bits") correct = bits.map(Boolean).map(x=>x?"1":"0").join("") === activePuzzle.answer;
  else if (activePuzzle.type === "order") correct = order.join(",") === activePuzzle.answer.join(",");
  if (correct) {
    saveSolved(activePuzzle.day); feedback.textContent = "Das ist richtig!"; feedback.className = "feedback good";
    markSolvedUI(); renderCalendar();
  } else {
    feedback.textContent = "Noch nicht ganz. Probier es weiter – du schaffst das!";
    feedback.className = "feedback";
  }
}
function markSolvedUI() {
  solvedMessage.hidden = false; checkButton.hidden = true; hintButton.hidden = true;
  content.querySelectorAll("button,input").forEach(el => el.disabled = true);
}
checkButton.addEventListener("click", checkAnswer);
hintButton.addEventListener("click", () => { hintText.hidden = !hintText.hidden; });
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
renderCalendar();
if (PREVIEW_MODE) console.info("Vorschau aktiv: ?preview=1 zeigt alle Türchen vorab.");
