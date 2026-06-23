#!/usr/bin/env node
// ai/check-css-vars.mjs
//
// Validates CSS variable usage across component CSS in src/design/.
// Scan logic lives in plugins/css-vars.core.mjs (shared with the Vite plugin
// plugins/check-css-vars.ts) — this file is just the CLI wrapper.
//
//   UNDEFINED  var(--x) not in tokens.generated.css and not a runtime channel.
//   PRIMITIVE  var(--x) referencing a raw primitive instead of its alias.
//
// Usage:  node ai/check-css-vars.mjs
// Exit:   0 = clean, 1 = issues found

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import {
  scanCssVars,
  hasFindings,
  formatFindings,
} from "../plugins/css-vars.core.mjs";

const root   = join(dirname(fileURLToPath(import.meta.url)), "..");
const result = scanCssVars(root);

if (result.skipped) {
  console.error(
    "tokens.generated.css not found — start the dev server or build first.",
  );
  process.exit(1);
}

if (hasFindings(result)) {
  console.error("\n" + formatFindings(result, { color: true }) + "\n");
  process.exit(1);
}

console.log("\x1b[32m✓ All CSS var() references are valid\x1b[0m");
