const entryForm = document.getElementById("entry-form");
const entryDate = document.getElementById("entry-date");
const entryMood = document.getElementById("entry-mood");
const entryNotes = document.getElementById("entry-notes");
const clearFormButton = document.getElementById("clear-form");
const seedSampleButton = document.getElementById("seed-sample");
const entriesContainer = document.getElementById("entries");
const entryCount = document.getElementById("entry-count");
const wordCount = document.getElementById("word-count");
const lastMood = document.getElementById("last-mood");
const lastDate = document.getElementById("last-date");
const dateError = document.getElementById("entry-date-error");
const moodError = document.getElementById("entry-mood-error");
const notesError = document.getElementById("entry-notes-error");
const notesCounter = document.getElementById("entry-notes-counter");
const formStatus = document.getElementById("form-status");

const storageKey = "daily-activity-journal-entries";

function loadEntries() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries) {
  localStorage.setItem(storageKey, JSON.stringify(entries));
}

function countWords(text) {
  const normalized = text.replace(/\s+/g, " ").trim();
  return normalized ? normalized.split(" ").length : 0;
}

function seedSampleEntries() {
  return [
    {
      id: crypto.randomUUID(),
      date: new Date().toISOString().slice(0, 10),
      mood: "busy",
      notes: "Morning standup, docs cleanup, and a noisy batch of email." 
    },
    {
      id: crypto.randomUUID(),
      date: new Date(Date.now() - 86400000).toISOString().slice(0, 10),
      mood: "focused",
      notes: "Worked through the bug report and finished a small fix."
    }
  ];
}

function render() {
  const entries = loadEntries().sort((a, b) => b.date.localeCompare(a.date));

  entryCount.textContent = String(entries.length);
  lastMood.textContent = entries[0]?.mood ?? "none";
  lastDate.textContent = entries[0]?.date ?? "-";
  wordCount.textContent = String(countWords(entryNotes.value));

  if (entries.length === 0) {
    entriesContainer.innerHTML = '<div class="empty-state">No journal entries yet.</div>';
    return;
  }

  entriesContainer.innerHTML = entries
    .map(
      (entry) => `
        <article class="entry-card">
          <header>
            <strong>${entry.date}</strong>
            <span>${entry.mood}</span>
          </header>
          <p>${entry.notes.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        </article>
      `
    )
    .join("");
}

const MOODS = ["tired", "okay", "focused", "busy", "grumpy"];
const NOTES_MIN = 3;
const NOTES_MAX = 2000;

const fields = {
  date: { input: entryDate, error: dateError },
  mood: { input: entryMood, error: moodError },
  notes: { input: entryNotes, error: notesError }
};

const touched = new Set();
let statusTimer;

function localToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isRealDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  return (
    parsed.getFullYear() === year &&
    parsed.getMonth() === month - 1 &&
    parsed.getDate() === day
  );
}

function validateDate() {
  const value = entryDate.value;
  if (!value) return "Please choose a date.";
  if (!isRealDate(value)) return "Please enter a valid date.";
  if (value > localToday()) return "The date can't be in the future.";
  return "";
}

function validateMood() {
  const value = entryMood.value;
  if (!value) return "Please pick a mood.";
  if (!MOODS.includes(value)) return "Please pick a mood from the list.";
  return "";
}

function validateNotes() {
  const trimmed = entryNotes.value.trim();
  if (!trimmed) return "Please describe what you did today.";
  if (trimmed.length < NOTES_MIN) {
    return `Add a little more detail (at least ${NOTES_MIN} characters).`;
  }
  if (entryNotes.value.length > NOTES_MAX) {
    return `Please keep it under ${NOTES_MAX} characters.`;
  }
  return "";
}

const validators = {
  date: validateDate,
  mood: validateMood,
  notes: validateNotes
};

function setFieldError(name, message) {
  const { input, error } = fields[name];
  if (message) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    error.textContent = message;
  } else {
    input.classList.remove("is-invalid");
    input.removeAttribute("aria-invalid");
    error.textContent = "";
  }
}

function runValidation(name) {
  const message = validators[name]();
  setFieldError(name, message);
  return message === "";
}

function validateForm() {
  let firstInvalid = null;
  ["date", "mood", "notes"].forEach((name) => {
    touched.add(name);
    if (!runValidation(name) && !firstInvalid) {
      firstInvalid = fields[name].input;
    }
  });
  return firstInvalid;
}

function clearAllErrors() {
  Object.keys(fields).forEach((name) => setFieldError(name, ""));
}

function updateCounter() {
  const length = entryNotes.value.length;
  notesCounter.textContent = `${length} / ${NOTES_MAX}`;
  notesCounter.classList.toggle("over-limit", length > NOTES_MAX);
}

function clearStatus() {
  clearTimeout(statusTimer);
  formStatus.textContent = "";
  formStatus.className = "form-status";
}

function showStatus(message, type) {
  clearTimeout(statusTimer);
  formStatus.className = `form-status ${type}`;
  formStatus.textContent = "";
  requestAnimationFrame(() => {
    formStatus.textContent = message;
  });
  if (type === "success") {
    statusTimer = setTimeout(clearStatus, 5000);
  }
}

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstInvalid = validateForm();
  if (firstInvalid) {
    firstInvalid.focus();
    showStatus("Please fix the highlighted fields.", "error");
    return;
  }

  const entries = loadEntries();
  entries.unshift({
    id: crypto.randomUUID(),
    date: entryDate.value,
    mood: entryMood.value,
    notes: entryNotes.value.trim()
  });

  saveEntries(entries);

  entryDate.value = localToday();
  entryMood.value = "";
  entryNotes.value = "";
  touched.clear();
  clearAllErrors();
  updateCounter();
  showStatus("Entry saved.", "success");
  render();
});

clearFormButton.addEventListener("click", () => {
  entryDate.value = localToday();
  entryMood.value = "";
  entryNotes.value = "";
  touched.clear();
  clearAllErrors();
  updateCounter();
  clearStatus();
  render();
});

seedSampleButton.addEventListener("click", () => {
  saveEntries(seedSampleEntries());
  showStatus("Sample entries loaded.", "success");
  render();
});

Object.keys(fields).forEach((name) => {
  const { input } = fields[name];
  const liveEvent = input.tagName === "SELECT" ? "change" : "input";

  input.addEventListener("blur", () => {
    touched.add(name);
    runValidation(name);
  });

  input.addEventListener(liveEvent, () => {
    if (name === "notes") {
      updateCounter();
      render();
    }
    if (touched.has(name)) {
      runValidation(name);
    }
  });
});

entryDate.max = localToday();
entryDate.value = localToday();
entryMood.value = "";
updateCounter();
render();
