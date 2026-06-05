#!/usr/bin/env node
/*
 * V6 validation gate (demo).
 *
 * Runs the project's quality checks and exits non-zero if any fail. This is
 * the gate the V6 hooks enforce before a task may be declared "done":
 *
 *   1. Syntax check  : node --check public/app.js
 *   2. Smoke test    : start server.js, GET a few routes, assert HTTP 200
 *
 * Dependency-free so it runs with plain `node scripts/validate.mjs`.
 */

import { execFileSync, spawn } from 'node:child_process';
import { setTimeout as wait } from 'node:timers/promises';

const PORT = 3777;
let failures = 0;

function ok(msg) {
  console.log('PASS  ' + msg);
}
function fail(msg) {
  console.error('FAIL  ' + msg);
  failures += 1;
}

// 1. Syntax check
try {
  execFileSync(process.execPath, ['--check', 'public/app.js'], { stdio: 'pipe' });
  ok('node --check public/app.js');
} catch (err) {
  fail('node --check public/app.js\n' + (err.stderr ? err.stderr.toString() : err.message));
}

// 2. Smoke test
const server = spawn(process.execPath, ['server.js'], {
  env: { ...process.env, PORT: String(PORT) },
  stdio: 'ignore'
});

try {
  await wait(700);
  const routes = ['/', '/app.js', '/styles.css'];
  for (const route of routes) {
    const res = await fetch(`http://localhost:${PORT}${route}`);
    if (res.status === 200) {
      ok(`GET ${route} -> 200`);
    } else {
      fail(`GET ${route} -> ${res.status}`);
    }
  }
} catch (err) {
  fail('smoke test: ' + err.message);
} finally {
  server.kill();
}

if (failures > 0) {
  console.error(`\nGATE FAILED: ${failures} check(s) failed. Task is NOT done.`);
  process.exit(1);
}
console.log('\nGATE PASSED: all checks green.');
