# Level Edit Locations (Canonical)

This file is the canonical map of where edits happen at each maturity level.

## Core Rule

For each level jump, change only that level's architecture layer, then update evidence artifacts.

## Always-Update Evidence Locations (Every Level)

- `DEMO_PROGRESS.md`
- `shareable-evidence-pack/02_Level_Status.md`
- `shareable-evidence-pack/04_Transition_Evidence_Matrix.md`
- `shareable-evidence-pack/05_Transition_Capture_Template.md` (copy and fill per transition)

## Level-by-Level Edit Map

### V0 (Baseline)

Primary locations:

- `server.js`
- `public/index.html`
- `public/styles.css`
- `public/app.js`
- `README.md`
- `V0_BAD_PROMPT.md`

Notes:

- No AI architecture files under `.github` or `.vscode`.

### V1 (Instructions Layer Only)

Primary locations:

- `.github/copilot-instructions.md`

Expected evidence updates:

- `DEMO_PROGRESS.md`
- `shareable-evidence-pack/02_Level_Status.md`
- `shareable-evidence-pack/04_Transition_Evidence_Matrix.md`

Guardrail:

- Do not add prompt, agent, skill, MCP, or hook files in this level.

### V2 (Reusable Prompt Layer Only)

Primary locations:

- `.github/prompts/investigate-journal-quality.prompt.md`

Expected evidence updates:

- `DEMO_PROGRESS.md`
- `shareable-evidence-pack/02_Level_Status.md`
- `shareable-evidence-pack/04_Transition_Evidence_Matrix.md`

Guardrail:

- Do not add agent, skill, MCP, or hook files in this level.

### V3 (Focused Agent Layer Only)

Primary locations:

- `.github/agents/journal-quality-investigator.agent.md`

Expected evidence updates:

- `DEMO_PROGRESS.md`
- `shareable-evidence-pack/02_Level_Status.md`
- `shareable-evidence-pack/04_Transition_Evidence_Matrix.md`

Guardrail:

- Do not add skill, MCP, or hook files in this level.

### V4 (Focused Skill Layer Only)

Primary locations:

- `.github/skills/investigate-journal-ui-quality/SKILL.md`

Expected evidence updates:

- `DEMO_PROGRESS.md`
- `shareable-evidence-pack/02_Level_Status.md`
- `shareable-evidence-pack/04_Transition_Evidence_Matrix.md`

Guardrail:

- Do not add MCP or hook files in this level.

### V5 (MCP Layer Only)

Primary locations:

- `.vscode/mcp.json`
- Optional stub helper docs used by MCP demo path:
  - `docs/mcp-stub-reference.md`

Expected evidence updates:

- `DEMO_PROGRESS.md`
- `shareable-evidence-pack/02_Level_Status.md`
- `shareable-evidence-pack/04_Transition_Evidence_Matrix.md`

Guardrail:

- Do not add hook files in this level.

### V6 (Hooks/Validation Layer Only)

Primary locations:

- `.github/hooks/pre-response.md`
- `.github/hooks/post-response.md`
- Optional runnable gate script:
  - `scripts/validate-demo.ps1`

Expected evidence updates:

- `DEMO_PROGRESS.md`
- `shareable-evidence-pack/02_Level_Status.md`
- `shareable-evidence-pack/04_Transition_Evidence_Matrix.md`

Guardrail:

- Keep hook logic lightweight and demo-safe.

## Branch and Tag Targets by Level

- V0: `demo/v0`, `v0-demo`
- V1: `demo/v1`, `v1-demo`
- V2: `demo/v2`, `v2-demo`
- V3: `demo/v3`, `v3-demo`
- V4: `demo/v4`, `v4-demo`
- V5: `demo/v5`, `v5-demo`
- V6: `demo/v6`, `v6-demo`
