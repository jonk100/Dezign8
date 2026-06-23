// plugins/check-css-vars.ts
//
// Validates CSS variable usage on dev start and on hot save. Self-contained,
// same shape as plugins/tokens.ts. WARNS — never crashes the dev server.
//
// Two faults, scanned across every component CSS file under src/design/:
//
//   UNDEFINED  var(--x) neither declared in tokens.generated.css nor a runtime
//              channel var. Silently renders nothing — the worst kind of bug.
//
//   PRIMITIVE  var(--x) referencing a raw primitive (--slate-*, --blur-*, …)
//              instead of its semantic alias. Rule violation.
//
// Channel vars (--prefix--key, double-dash separator) are emitted inline by
// resolveTokens at runtime — valid even though no static file declares them.

import type { Plugin }                from "vite";
import { readFileSync, readdirSync, existsSync } from "fs";
import { join, relative }            from "path";

const GEN_FILE  = "src/styles/tokens.generated.css";
const SCAN_DIRS = ["src/design"];
const SKIP_DIRS = ["src/design/styles"]; // definition files, not consumers

// Raw primitive prefixes — component CSS must use semantic aliases instead.
// e.g. --blur-3 → --blur--sm | --slate-18 → --text--primary | --ease-out → --ease--out
const RAW_PREFIXES = [
  "--size-", "--slate-", "--cyan-", "--purple-", "--lime-", "--red-",
  "--orange-", "--yellow-", "--green-", "--pink-", "--indigo-", "--amber-",
  "--font-", "--weight-", "--leading-", "--tracking-",
  "--blur-", "--border-", "--z-", "--duration-", "--ease-", "--container-",
];

// Runtime channel: --prefix--key (exactly one double-dash separator).
const CHANNEL = /^--[a-z][a-z-]*--[a-z0-9][\w-]*$/;

const TAG = "[dezign8-css-vars]";

// ─── SCAN ────────────────────────────────────────────────────

const strip = (css: string) => css.replace(/\/\*[\s\S]*?\*\//g, "");

function decls(css: string): Set<string> {
  const s = new Set<string>();
  for (const m of strip(css).matchAll(/(--[\w-]+)\s*:/g)) s.add(m[1]);
  return s;
}

function varRefs(css: string): Set<string> {
  const s = new Set<string>();
  for (const m of strip(css).matchAll(/var\(\s*(--[\w-]+)/g)) s.add(m[1]);
  return s;
}

function* walkCSS(dir: string, skip: Set<string>): Generator<string> {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (!skip.has(p)) yield* walkCSS(p, skip);
    } else if (e.name.endsWith(".css")) {
      yield p;
    }
  }
}

type Findings = {
  undef: Map<string, Set<string>>;
  prim:  Map<string, Set<string>>;
  skipped: boolean;
};

function scan(root: string): Findings {
  const undef = new Map<string, Set<string>>();
  const prim  = new Map<string, Set<string>>();

  const genPath = join(root, GEN_FILE);
  if (!existsSync(genPath)) return { undef, prim, skipped: true };

  const genVars = decls(readFileSync(genPath, "utf8"));
  const isRaw   = (v: string) => !v.includes("--", 2) && RAW_PREFIXES.some(p => v.startsWith(p));
  const rawSet  = new Set([...genVars].filter(isRaw));
  const skip    = new Set(SKIP_DIRS.map(d => join(root, d)));

  const record = (map: Map<string, Set<string>>, file: string, v: string) => {
    if (!map.has(file)) map.set(file, new Set());
    map.get(file)!.add(v);
  };

  for (const d of SCAN_DIRS) {
    const dir = join(root, d);
    if (!existsSync(dir)) continue;
    for (const file of walkCSS(dir, skip)) {
      const rel = relative(root, file);
      for (const v of varRefs(readFileSync(file, "utf8"))) {
        if (CHANNEL.test(v)) continue;                 // ✓ runtime channel
        if (!genVars.has(v)) record(undef, rel, v);    // ✗ undefined
        else if (rawSet.has(v)) record(prim, rel, v);  // ⚠ raw primitive
      }
    }
  }

  return { undef, prim, skipped: false };
}

// ─── REPORT ──────────────────────────────────────────────────

function report({ undef, prim }: Findings): void {
  const R = "\x1b[31m", Y = "\x1b[33m", G = "\x1b[32m", D = "\x1b[2m", X = "\x1b[0m";

  if (!undef.size && !prim.size) {
    console.log(`${TAG} ${G}✓ CSS variables valid${X}`);
    return;
  }

  const lines: string[] = [`\n${TAG}`];
  const section = (label: string, c: string, map: Map<string, Set<string>>) => {
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

  console.warn(lines.join("\n") + "\n");
}

// ─── PLUGIN ──────────────────────────────────────────────────

export function checkCssVarsPlugin(): Plugin {
  let root: string;

  const run = () => {
    const result = scan(root);
    if (!result.skipped) report(result); // skip silently until tokens are generated
  };

  return {
    name: "dezign8-css-vars",
    // run after dezign8-tokens (enforce: "pre") writes tokens.generated.css
    enforce: "post",

    configResolved(config) {
      root = config.root;
    },

    buildStart() {
      run();
    },

    handleHotUpdate({ file }) {
      // Re-validate on any CSS change — component edits, and the generated
      // token file itself (a removed token can orphan a previously-valid ref).
      if (file.endsWith(".css")) run();
    },
  };
}