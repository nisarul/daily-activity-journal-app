# Hooks (V6 layer — demo)

This folder adds the V6 architecture layer: **quality gates** that wrap the
assistant's work, so validation is enforced rather than relying on goodwill.

## What it enforces

The gate is the runnable script `scripts/validate.mjs` (also `npm run validate`):

1. `node --check public/app.js` — syntax must pass.
2. Server smoke test — `server.js` must serve `/`, `/app.js`, `/styles.css`
   with HTTP 200.

If any check fails, the gate exits non-zero and the task is **not** done.

## Hook points

- `pre-response.md` — reminder injected before the assistant starts work.
- `post-response.md` — runs the validation gate after edits; blocks completion
  on failure.

## Why it exists in the maturity model

Earlier layers shaped *how* the assistant works and *what* it knows. The hooks
layer makes quality **non-negotiable**: a broken change cannot be reported as
complete because the gate fails first.

## Status

Not live-demoed in this session. The gate script is real and runnable; the
hook definitions describe how it is enforced.

## Manual run

```powershell
npm run validate
```
