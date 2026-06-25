#!/usr/bin/env node
// ai/check-css-vars.mjs
//
// Validates CSS variable usage across component CSS in src/design/.
//
//   UNDEFINED  var(--x) not in tokens.generated.css and not a runtime channel.
//   PRIMITIVE  var(--x) referencing a raw primitive instead of its alias.
//
// Usage:  node ai/check-css-vars.mjs
// Exit:   0 = clean, 1 = issues found

import { readFileSync, readdirSync, existsSync } from "fs";
import { dirname, join, relative }               from "path";
import { fileURLToPath }                          from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const GEN_FILE  = "src/styles/tokens.generated.css";
const SCAN_DIRS = ["src/design"];
const SKIP_DIRS = ["src/design/styles"];

const RAW_PREFIXES = [
  "--size-", "--slate-", "--cyan-", "--purple-", "--lime-", "--red-",
  "--orange-", "--yellow-", "--green-", "--pink-", "--indigo-", "--amber-",
  "--font-", "--weight-", "--leading-", "--tracking-",
  "--blur-", "--border-", "--z-", "--duration-", "--ease-", "--container-",
];

const CHANNEL = /^--[a-z][a-z-]*--[a-z0-9][\w-]*$/;

const strip = (css) => css.replace(/\/\*[\s\S]*?\*\//g, "");

function decls(css) {
  const s = new Set();
  for (const m of strip(css).matchAll(/(--[\w-]+)\s*:/g)) s.add(m[1]);
  return s;
}

function varRefs(css) {
  const s = new Set();
  for (const m of strip(css).matchAll(/var\(\s*(--[\w-]+)/g)) s.add(m[1]);
  return s;
}

function* walkCSS(dir, skip) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (!skip.has(p)) yield* walkCSS(p, skip);
    } else if (e.name.endsWith(".css")) {
      yield p;
    }
  }
}

function scan(root) {
  const undef = new Map();
  const prim  = new Map();

  const genPath = join(root, GEN_FILE);
  if (!existsSync(genPath)) return { undef, prim, skipped: true };

  const genVars = decls(readFileSync(genPath, "utf8"));
  const isRaw   = (v) => !v.includes("--", 2) && RAW_PREFIXES.some(p => v.startsWith(p));
  const rawSet  = new Set([...genVars].filter(isRaw));
  const skip    = new Set(SKIP_DIRS.map(d => join(root, d)));

  const record = (map, file, v) => {
    if (!map.has(file)) map.set(file, new Set());
    map.get(file).add(v);
  };

  for (const d of SCAN_DIRS) {
    const dir = join(root, d);
    if (!existsSync(dir)) continue;
    for (const file of walkCSS(dir, skip)) {
      const rel = relative(root, file);
      for (const v of varRefs(readFileSync(file, "utf8"))) {
        if (CHANNEL.test(v)) continue;
        if (!genVars.has(v)) record(undef, rel, v);
        else if (rawSet.has(v)) record(prim, rel, v);
      }
    }
  }

  return { undef, prim, skipped: false };
}

const result = scan(root);

if (result.skipped) {
  console.error(
    "tokens.generated.css not found — start the dev server or build first.",
  );
  process.exit(1);
}

const R = "\x1b[31m", Y = "\x1b[33m", G = "\x1b[32m", D = "\x1b[2m", X = "\x1b[0m";
const { undef, prim } = result;

if (!undef.size && !prim.size) {
  console.log(`${G}✓ All CSS var() references are valid${X}`);
  process.exit(0);
}

const lines = [];
const section = (label, c, map) => {
  if (!map.size) return;
  const total = [...map.values()].reduce((n, s) => n + s.size, 0);
  lines.push(`${c}${label} (${total}):${X}`);
  for (const [file, vars] of map) {
    lines.push(`  ${file}`);
    for (const v of vars) lines.push(`    ${D}${v}${X}`);
  }
};

section("❌ Undefined CSS variables", R, undef);
section(
  "⚠️  Raw primitives used directly — use semantic aliases " +
    "(--blur--sm, --ease--out, --shadow--xs, --text--primary, …)",
  Y, prim,
);

console.error("\n" + lines.join("\n") + "\n");
process.exit(1);
