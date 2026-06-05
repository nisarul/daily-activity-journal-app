# MCP Server (V5 layer — demo stub)

This folder adds the V5 architecture layer: a minimal local MCP server that
gives the assistant **reach** beyond the repo files.

## What it is

- `design-standards-server.js` — a dependency-free MCP stdio server exposing
  one tool, `get_design_standards`, which returns this app's documented UI
  standards (colors, spacing, error copy, conventions).
- Wired via `.vscode/mcp.json`.

## Why it exists in the maturity model

Earlier layers improved *how* the assistant works on local files. The MCP
layer demonstrates a different capability: fetching authoritative external
context (here, a design-standards source) instead of inventing values.

## Run shape (not live-demoed)

The server is started by the MCP host using the command in `.vscode/mcp.json`.
The assistant would call `get_design_standards` during a task and apply the
returned values. For this session the V5 run is intentionally not executed;
the layer is provided to show the access shape.

## Quick manual sanity check

```powershell
# Sends initialize + tools/list and prints the responses.
'{"jsonrpc":"2.0","id":1,"method":"initialize"}',
'{"jsonrpc":"2.0","id":2,"method":"tools/list"}' |
  node mcp-server/design-standards-server.js
```
