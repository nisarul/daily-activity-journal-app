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
const dateError = document.getElementById("date-error");
const notesError = document.getElementById("notes-error");

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

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function setFieldError(field, errorEl, message) {
  errorEl.textContent = message;
  field.classList.add("invalid");
  field.setAttribute("aria-invalid", "true");
}

function clearFieldError(field, errorEl) {
  errorEl.textContent = "";
  field.classList.remove("invalid");
  field.removeAttribute("aria-invalid");
}

function validateForm() {
  let valid = true;

  const dateValue = entryDate.value;
  if (!dateValue) {
    setFieldError(entryDate, dateError, "Please choose a date.");
    valid = false;
  } else if (dateValue > todayISO()) {
    setFieldError(entryDate, dateError, "The date can’t be in the future.");
    valid = false;
  } else {
    clearFieldError(entryDate, dateError);
  }

  if (!entryNotes.value.trim()) {
    setFieldError(entryNotes, notesError, "Please write a few words about your day.");
    valid = false;
  } else {
    clearFieldError(entryNotes, notesError);
  }

  return valid;
}

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    entryForm.querySelector(".invalid")?.focus();
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
  entryNotes.value = "";
  entryMood.value = "okay";
  clearFieldError(entryNotes, notesError);
  clearFieldError(entryDate, dateError);
  render();
});

clearFormButton.addEventListener("click", () => {
  entryDate.value = todayISO();
  entryMood.value = "okay";
  entryNotes.value = "";
  clearFieldError(entryDate, dateError);
  clearFieldError(entryNotes, notesError);
  render();
});

seedSampleButton.addEventListener("click", () => {
  saveEntries(seedSampleEntries());
  render();
});

entryNotes.addEventListener("input", () => {
  clearFieldError(entryNotes, notesError);
  render();
});

entryDate.addEventListener("input", () => clearFieldError(entryDate, dateError));

entryDate.max = todayISO();
entryDate.value = todayISO();
entryMood.value = "okay";
render();
