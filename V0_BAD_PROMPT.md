# V0 Supposed Prompt (Large + Bad)

This is the intentionally broad, low-quality one-shot prompt we assume was used to generate V0.

## Prompt Text

Build me a complete daily activity web app quickly in one go. Make it run on localhost and have everything needed so I can use it right away. I want a journal type website where I can write what I did every day, keep track of my mood, save entries, and see some useful stats. Please include all files and wire everything together end to end with server, html, css, and js and make sure it just works without asking me questions.

Also make the UI look interesting and do not spend too much time on details; just make something visible and functional. Put buttons for actions like save, clear, and other things that feel useful. Add some summary details and recent activity output and maybe sample data load as well. Use local storage so it keeps entries. Do not overthink architecture, just produce code that runs.

I do not care too much about clean patterns right now. Skip deep refactoring and avoid spending time on tests or strict validation unless really necessary. If something is ambiguous pick a sensible default and move on. Keep everything simple and direct and avoid too many files but still include what is needed to run. Give me a rough but working version and prioritize speed over correctness and polish.

## Why this is considered bad for V0

- Overly broad scope in one shot
- No explicit constraints on quality or boundaries
- No requirement for minimal diff strategy
- No structured investigation workflow
- No consistent acceptance criteria
- Encourages speed over correctness

## Intended role in demo

Use this as the baseline prompt artifact for V0 when explaining why output quality is inconsistent before repository AI architecture is introduced.
