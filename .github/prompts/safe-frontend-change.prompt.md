---
mode: agent
description: Make a safe, scoped front-end change to this app using a consistent investigate-plan-implement-validate workflow.
---

# Safe Front-End Change

Use this prompt for ANY front-end change in this app (new feature, bug fix,
UI tweak, validation, refactor). Supply the specific task when you invoke it.

## Task

${input:task:Describe the change to make (e.g. "add validation to the entry form")}

## Workflow (do in order)

1. Investigate: read the relevant files under `public/` before editing.
   Identify current structure, defaults, and existing behavior.
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

- Keep defaults and existing data intact unless the task explicitly says otherwise.
- Show inline user feedback near the relevant element; do not use `alert()`.
- Add basic accessibility (labels, `aria-*`, focus handling) where relevant.
