#!/usr/bin/env node
/*
 * Minimal MCP stdio server (demo stub) — "design-standards".
 *
 * Purpose: demonstrate the ACCESS SHAPE of an MCP server for the maturity
 * demo. It exposes one tool, `get_design_standards`, that returns this app's
 * documented UI standards so the assistant can fetch real values instead of
 * inventing them.
 *
 * This is intentionally dependency-free (hand-rolled JSON-RPC over stdio) so it
 * runs with plain `node` and no install step. It is a stub, not a production
 * server.
 */

'use strict';

const STANDARDS = {
  colors: {
    error: '#b00020',
    focusOutline: '#1a73e8',
    successText: '#0b7a35'
  },
  spacing: {
    fieldGap: '12px',
    errorMarginTop: '4px'
  },
  errorCopy: {
    activityRequired: 'Activity is required.',
    dateInvalid: 'Enter a valid date.',
    notesTooLong: 'Notes are too long.'
  },
  conventions: {
    errorElementId: '#<field>-error',
    errorRole: 'alert',
    errorClass: '.field-error',
    ariaInvalid: 'true',
    clearOn: 'input'
  }
};

function send(message) {
  process.stdout.write(JSON.stringify(message) + '\n');
}

function handle(request) {
  const { id, method, params } = request;

  if (method === 'initialize') {
    return send({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: { tools: {} },
        serverInfo: { name: 'design-standards', version: '0.1.0' }
      }
    });
  }

  if (method === 'tools/list') {
    return send({
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          {
            name: 'get_design_standards',
            description:
              "Return this app's documented UI design standards (colors, spacing, error copy, conventions).",
            inputSchema: { type: 'object', properties: {} }
          }
        ]
      }
    });
  }

  if (method === 'tools/call' && params && params.name === 'get_design_standards') {
    return send({
      jsonrpc: '2.0',
      id,
      result: {
        content: [{ type: 'text', text: JSON.stringify(STANDARDS, null, 2) }]
      }
    });
  }

  if (id !== undefined) {
    send({
      jsonrpc: '2.0',
      id,
      error: { code: -32601, message: 'Method not found: ' + method }
    });
  }
}

let buffer = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  buffer += chunk;
  let newlineIndex;
  while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
    const line = buffer.slice(0, newlineIndex).trim();
    buffer = buffer.slice(newlineIndex + 1);
    if (!line) continue;
    try {
      handle(JSON.parse(line));
    } catch (err) {
      // Ignore malformed lines in this demo stub.
    }
  }
});
