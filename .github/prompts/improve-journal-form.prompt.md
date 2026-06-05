---
mode: agent
description: Improve the journal entry form and add user-facing validation, with a consistent investigate-plan-validate workflow.
---

# Improve Journal Entry Form

Use this prompt to improve the daily journal entry form and add validation.
Follow the workflow and produce the required output sections every time.

## Task

Make the journal entry form better and add validation so users get clear
feedback when something is wrong.

## Workflow (do in order)

1. Investigate: read `public/index.html`, `public/app.js`, and
   `public/styles.css` before editing. Identify the current fields, defaults,
   and existing behavior.
2. Plan: list the specific, in-scope changes you will make. If any change
   would alter existing behavior or default values, flag it and ask before
   proceeding.
3. Implement: make minimal, focused edits in `public/` only. Vanilla
   HTML/CSS/JS, no dependencies, no `server.js` changes.
4. Validate: run `node --check public/app.js` and a quick server smoke test.

## Required output (always include these sections)

- Summary of changes (one line per change)
- Files touched (with rough +/- size)
- Behavior changes (explicitly list any, or state "none")
- Validation result (commands run and outcomes)
- Out-of-scope items deliberately skipped

## Constraints

- Keep defaults and existing entries intact unless explicitly told otherwise.
- Show inline validation feedback near the field; do not use `alert()`.
- Add basic accessibility (labels, `aria-*`, focus handling) where relevant.
