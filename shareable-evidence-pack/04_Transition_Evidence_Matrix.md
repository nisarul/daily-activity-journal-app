# Transition Evidence Matrix

Use this table to record level-to-level quality deltas.

| Transition | Prompt ID | Added Layer | Expected Outcome | Observed Outcome | Validation Result | Confidence |
|---|---|---|---|---|---|---|
| V0 -> V1 | P-form-validation | Instructions | Better scope control, no silent behavior changes, conventions honored | V0 sprawled (unprompted char counter, hints, status, dynamic max date, focus extras) and silently changed the mood default; V1 stayed scoped, explicitly skipped a word-counter, asked before adding a date rule, and added aria/novalidate accessibility (one small flagged change: Clear resets date to today). | Both ran node --check + server smoke test (200s); V1 framed validation as expected per instructions | High |
| V1 -> V2 | P-form-validation | Reusable Prompt | More consistent workflow + standardized output format | V2 followed the reusable prompt's investigate->plan->implement->validate order and returned the exact required output sections unprompted (Summary, Files, Behavior changes, Validation, Out-of-scope skipped). Behavior discipline tightened: date rules were FLAGGED as out-of-scope and NOT implemented (vs V1 which asked-then-added). Only additive feedback (inline errors, success message, post-save focus); no silent changes to accepted inputs. | Lint clean on 3 files + node --check exit 0 + server smoke test 200/200/200 with new markup served; ~69s single turn | High |
| V2 -> V3 | TBD | Focused Agent | Stronger role behavior and tighter changes | TBD | TBD | TBD |
| V3 -> V4 | TBD | Focused Skill | Repeatable triage process and artifacts | TBD | TBD | TBD |
| V4 -> V5 | TBD | MCP | Better external context usage | TBD | TBD | TBD |
| V5 -> V6 | TBD | Hooks | Explicit quality gates before completion | TBD | TBD | TBD |

## Usage Guidance

- Keep the base task the same across all levels.
- Capture evidence immediately after each transition run.
- Prefer adjacent comparisons (Vn -> Vn+1) as primary evidence.
