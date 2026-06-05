# Transition Evidence Matrix

Use this table to record level-to-level quality deltas.

| Transition | Prompt ID | Added Layer | Expected Outcome | Observed Outcome | Validation Result | Confidence |
|---|---|---|---|---|---|---|
| V0 -> V1 | P-form-validation | Instructions | Better scope control, no silent behavior changes, conventions honored | V0 sprawled (unprompted char counter, hints, status, dynamic max date, focus extras) and silently changed the mood default; V1 stayed scoped, explicitly skipped a word-counter to avoid creep, asked before adding a date rule, and added aria/novalidate accessibility. Only 1 small flagged change in V1 (Clear resets date to today). | Both ran node --check + server smoke test (200s); V1 framed validation as expected per instructions | High |
| V1 -> V2 | TBD | Reusable Prompt | More consistent investigation and output format | TBD | TBD | TBD |
| V2 -> V3 | TBD | Focused Agent | Stronger role behavior and tighter changes | TBD | TBD | TBD |
| V3 -> V4 | TBD | Focused Skill | Repeatable triage process and artifacts | TBD | TBD | TBD |
| V4 -> V5 | TBD | MCP | Better external context usage | TBD | TBD | TBD |
| V5 -> V6 | TBD | Hooks | Explicit quality gates before completion | TBD | TBD | TBD |

## Usage Guidance

- Keep the base task the same across all levels.
- Capture evidence immediately after each transition run.
- Prefer adjacent comparisons (Vn -> Vn+1) as primary evidence.
