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
- Style errors with the `.field-error` class. Do not use `alert()`.
- Clear a field's error on the next `input` event for that field.

## Procedure

1. Read `public/index.html` and `public/app.js` to confirm current field ids
   and the existing validation function (if any).
2. For each field in scope, add: the error element, the validate check, and
   the clear-on-input handler — following the convention above.
3. Move focus to the first invalid field on submit failure.
4. Preserve defaults and existing entries. Flag any default/behavior change.
5. Validate: `node --check public/app.js` + a server smoke test.

## Output

Follow the repo prompt's required output sections. Note explicitly which
fields you validated and which you intentionally left unchanged.
