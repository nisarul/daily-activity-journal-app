# Post-response hook

Runs after the assistant makes edits, before the task may be declared done.

## Action

Run the validation gate:

```
npm run validate
```

## Rule

- If the gate exits non-zero, the task is **not** complete. The assistant must
  fix the failing checks and re-run the gate.
- Only after the gate passes (`GATE PASSED: all checks green.`) may the task be
  reported as done.

This converts the earlier "please validate" guidance into an enforced gate.
