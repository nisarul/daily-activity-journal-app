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
const notesError = document.getElementById("notes-error");
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

function setFieldError(field, errorEl, message) {
  field.setAttribute("aria-invalid", "true");
  errorEl.textContent = message;
}

function clearFieldError(field, errorEl) {
  field.removeAttribute("aria-invalid");
  errorEl.textContent = "";
}

function validateEntry() {
  if (!entryNotes.value.trim()) {
    setFieldError(entryNotes, notesError, "Please write what you did today before saving.");
    return entryNotes;
  }

  clearFieldError(entryNotes, notesError);
  return null;
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

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const invalidField = validateEntry();
  if (invalidField) {
    formStatus.textContent = "";
    invalidField.focus();
    return;
  }

  const entries = loadEntries();
  entries.unshift({
    id: crypto.randomUUID(),
    date: entryDate.value || new Date().toISOString().slice(0, 10),
    mood: entryMood.value,
    notes: entryNotes.value.trim()
  });

  saveEntries(entries);
  entryNotes.value = "";
  entryMood.value = "okay";
  clearFieldError(entryNotes, notesError);
  formStatus.textContent = "Entry saved.";
  render();
  entryNotes.focus();
});

clearFormButton.addEventListener("click", () => {
  entryDate.value = "";
  entryMood.value = "okay";
  entryNotes.value = "";
  clearFieldError(entryNotes, notesError);
  formStatus.textContent = "";
  render();
});

seedSampleButton.addEventListener("click", () => {
  saveEntries(seedSampleEntries());
  render();
});

entryNotes.addEventListener("input", () => {
  if (entryNotes.value.trim()) {
    clearFieldError(entryNotes, notesError);
  }
  if (formStatus.textContent) {
    formStatus.textContent = "";
  }
  render();
});
entryDate.value = new Date().toISOString().slice(0, 10);
entryMood.value = "okay";
render();
