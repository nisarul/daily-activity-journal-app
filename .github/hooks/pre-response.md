# Pre-response hook

Runs before the assistant begins a task.

## Action

Remind the assistant of the completion gate:

> This repo enforces a validation gate (`npm run validate`). Plan your change so
> it will pass: keep `public/app.js` syntactically valid and keep the server
> serving `/`, `/app.js`, and `/styles.css` with HTTP 200.

This is a lightweight nudge; the binding enforcement happens in the
post-response hook.
