---
name: journal-validation
description: Add or extend field validation in the daily journal entry form using this app's established field schema, error-display convention, and localStorage shape. USE WHEN adding validation, error messages, or input feedback to the entry form.
---

# Journal Validation Skill

Packaged, app-specific knowledge for validating the journal entry form
consistently. Use this instead of guessing the form's structure.

## Entry form fields (source of truth)

| Field | Element id | Required | Rules |
|-------|-----------|----------|-------|
| Activity | `#activity` (or main text input) | Yes | Non-empty after trim |
| Date | `#date` | Yes by default | Valid date; not in the future is a product decision — confirm before enforcing |
| Mood | `#mood` | Optional | Defaults to `okay`; do not silently change this default |
| Notes | `#notes` | Optional | Free text; no length cap unless asked |

## localStorage shape

- Entries are stored under the existing key as an array of objects.
- Each entry keeps `{ activity, date, mood, notes }` (plus any existing field).
- Never drop or rename existing fields; additive changes only.

## Error-display convention (match this exactly)

- One error element per field, e.g. `#<field>-error`, with `role="alert"`.
- Set `aria-invalid="true"` on the field and `aria-describedby` to the error id.
- Style errors with the `.field-error` class.
- Clear a field's error on the next `input` event for that field.

## Procedure (app-specific steps only)

Generic workflow, rules, and output format come from
`.github/copilot-instructions.md`, `.github/prompts/safe-frontend-change.prompt.md`,
and the agent. This skill only adds what is specific to this form:

1. Confirm the field ids above against `public/index.html` before editing.
2. For each in-scope field, add the error element, the validate check, and the
   clear-on-input handler using the convention above.
3. On submit failure, move focus to the first invalid field.
4. State explicitly which fields you validated and which you left unchanged.
