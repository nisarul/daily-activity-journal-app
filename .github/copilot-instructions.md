# Copilot Instructions — Daily Activity Journal

This is a small vanilla web app: a Node static server (`server.js`) serving
`public/index.html`, `public/styles.css`, and `public/app.js`. Journal entries
are stored in the browser via `localStorage`.

## Scope discipline

- Do only what the request asks. Do not add extra features that were not requested.
- If a change would alter existing behavior, do NOT do it silently. Call it out
  and ask before changing default behavior.
- Keep edits minimal and focused on the relevant files.

## Tech constraints

- Vanilla HTML, CSS, and JavaScript only.
- Do not add dependencies, frameworks, build tools, or test tooling.
- Do not modify `server.js` unless the task is explicitly about the server.
- Match the existing code style and structure in `public/`.

## User-facing quality

- When adding validation, show clear inline feedback near the relevant field.
- Do not use `alert()` for validation messages.
- Preserve existing defaults and existing entries unless explicitly told otherwise.

## Validation before done

- State exactly what you changed and which files.
- Run a quick check (for example `node --check public/app.js`) and report the result.
- Note any behavior changes explicitly in your summary.
