// plugins/props.ts

import type { Plugin }                            from "vite";
import { writeFileSync, mkdirSync,
         readdirSync, statSync,
         existsSync, readFileSync }               from "fs";
import { resolve, dirname, relative, sep }        from "path";
import ts                                         from "typescript";

const JSON_OUT     = "src/styles/props.generated.json";
const MAX_TYPE_LEN = 200;

// Rendered collapsed in the docs table (lowest detail level)
const BASE_IFACES = new Set([
  "BaseComponentProps", "SpacingProps", "AriaProps", "IconProps",
]);

export interface PropInfo {
  name:         string;
  type:         string;
  optional:     boolean;
  description:  string;
  default?:     string;
  from:         string;  // declaring interface name
  wired:        boolean; // is this prop consumed by the component's hook(s)?
}

export type PropsMap = Record<string, PropInfo[]>;

// ─── HELPERS ─────────────────────────────────────────────────

/** kebab-case component dir → PascalCase Props name: "alert-dialog" → "AlertDialogProps" */
function toPropsName(componentDir: string): string {
  return componentDir
    .split("-")
    .map(w => w[0]!.toUpperCase() + w.slice(1))
    .join("") + "Props";
}

/** Strip trailing `| undefined` (redundant with `?`) and clamp long unions. */
function cleanType(t: string): string {
  const s = t.replace(/\s*\|\s*undefined$/, "").trim();
  return s.length > MAX_TYPE_LEN ? s.slice(0, MAX_TYPE_LEN) + "…" : s;
}

/**
 * Group rank for table display order:
 *   own component interface (0) → category / mixins (1) → base / shared (2)
 * Explicit sort so we never rely on TypeChecker's merge order.
 */
function groupRank(interfaceName: string, ownName: string): number {
  if (interfaceName === ownName)      return 0;
  if (BASE_IFACES.has(interfaceName)) return 2;
  return 1;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readHook(path: string): string {
  return existsSync(path) ? readFileSync(path, "utf-8") : "";
}

/**
 * Interface-aware wired detection.
 *
 * - AriaProps:          always wired — aria-* attrs propagate via ...rest spread in useBaseCompose
 * - SpacingProps:       wired only if resolveSpacingStyles is explicitly called in the hook chain
 * - BaseComponentProps: wired if useBaseCompose is called (handles class, style, disabled, motion, etc.)
 * - IconProps:          wired if `icon` or `IconProps` appears in any hook text
 * - Own / category:     wired if the prop name appears as a word in the hook text
 */
function isWired(prop: PropInfo, hookTexts: string[]): boolean {
  const combined = hookTexts.join("\n");

  if (prop.from === "AriaProps")           return true;
  if (prop.from === "SpacingProps")        return /resolveSpacingStyles/.test(combined);
  if (prop.from === "BaseComponentProps")  return /useBaseCompose/.test(combined);
  if (prop.from === "IconProps")           return /\bicon\b/.test(combined);

  // Own / category props: check if name appears as a word in any hook
  return new RegExp(`\\b${escapeRegex(prop.name)}\\b`).test(combined);
}

// ─── FILE DISCOVERY ──────────────────────────────────────────

/** Recursively find *.props.ts files that live inside a /components/ directory. */
function findPropsFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...findPropsFiles(full));
    } else if (
      entry.endsWith(".props.ts") &&
      full.includes(`${sep}components${sep}`)
    ) {
      results.push(full);
    }
  }
  return results;
}

// ─── COMPILER OPTIONS ────────────────────────────────────────

function loadCompilerOptions(root: string): ts.CompilerOptions {
  const configPath = ts.findConfigFile(root, ts.sys.fileExists, "tsconfig.json");
  if (!configPath) throw new Error("[dezign8-props] Cannot find tsconfig.json");

  const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile);
  if (error) {
    throw new Error(
      `[dezign8-props] tsconfig read error: ${ts.flattenDiagnosticMessageText(error.messageText, "\n")}`,
    );
  }

  const { options } = ts.parseJsonConfigFileContent(config, ts.sys, dirname(configPath));
  return options;
}

// ─── GENERATE ────────────────────────────────────────────────

function generate(root: string): void {
  const srcDesign  = resolve(root, "src/design");
  const propsFiles = findPropsFiles(srcDesign);

  if (!propsFiles.length) {
    console.warn("[dezign8-props] No component props files found");
    return;
  }

  const options = loadCompilerOptions(root);
  const program = ts.createProgram({ rootNames: propsFiles, options });
  const checker = program.getTypeChecker();
  const result: PropsMap = {};

  for (const filePath of propsFiles) {
    // Only handle standard depth: category/components/component/component.props.ts
    const rel   = relative(srcDesign, filePath);
    const parts = rel.split(sep);
    if (parts.length !== 4) continue;

    const [category, , componentDir] = parts as [string, string, string, string];
    const entryId = `${category}/${componentDir}`;
    const ownName = toPropsName(componentDir);

    // Load hook text for wired detection
    const componentHook = resolve(srcDesign, category, "components", componentDir, `${componentDir}.hook.ts`);
    const categoryHook  = resolve(srcDesign, category, `${category}.hook.ts`);
    const hookTexts     = [readHook(componentHook), readHook(categoryHook)];

    const sourceFile = program.getSourceFile(filePath);
    if (!sourceFile) continue;

    // Locate the primary exported Props interface
    let mainIface: ts.InterfaceDeclaration | undefined;
    ts.forEachChild(sourceFile, node => {
      if (!ts.isInterfaceDeclaration(node)) return;
      if (!node.modifiers?.some(m => m.kind === ts.SyntaxKind.ExportKeyword)) return;
      if (node.name.text === ownName)                       { mainIface = node; }
      else if (!mainIface && node.heritageClauses?.length)  { mainIface = node; }
    });
    if (!mainIface) continue;

    // Fully-resolved property list (merges all extends chains)
    const type = checker.getTypeAtLocation(mainIface);
    const raw: PropInfo[] = [];

    for (const symbol of type.getProperties()) {
      const decls = symbol.getDeclarations();
      if (!decls?.length) continue;
      const decl = decls[0]!;

      // Skip index signatures like [key: `data-${string}`]: string
      if (ts.isIndexSignatureDeclaration(decl)) continue;

      const parent = decl.parent;
      const from   = ts.isInterfaceDeclaration(parent) ? parent.name.text : "unknown";

      const propType    = checker.getTypeOfSymbolAtLocation(symbol, decl);
      const typeStr     = cleanType(checker.typeToString(propType));
      const optional    = !!(symbol.flags & ts.SymbolFlags.Optional);
      const description = ts.displayPartsToString(symbol.getDocumentationComment(checker)).trim();

      const defaultTag = symbol.getJsDocTags(checker).find(t => t.name === "default");
      const defaultVal = defaultTag?.text
        ? ts.displayPartsToString(defaultTag.text).trim()
        : undefined;

      const info: PropInfo = {
        name: symbol.name,
        type: typeStr,
        optional,
        description,
        from,
        wired: false, // filled in below
        ...(defaultVal ? { default: defaultVal } : {}),
      };
      info.wired = isWired(info, hookTexts);

      raw.push(info);
    }

    // Sort: own interface → category/mixin → base/shared (stable within each group)
    raw.sort((a, b) => groupRank(a.from, ownName) - groupRank(b.from, ownName));
    result[entryId] = raw;
  }

  const jsonOut = resolve(root, JSON_OUT);
  mkdirSync(dirname(jsonOut), { recursive: true });
  writeFileSync(jsonOut, JSON.stringify(result, null, 2), "utf-8");
  console.log(`[dezign8-props] ${JSON_OUT} — ${Object.keys(result).length} components`);
}

// ─── PLUGIN ──────────────────────────────────────────────────

export function propsPlugin(): Plugin {
  let root: string;

  return {
    name:    "dezign8-props",
    enforce: "pre",

    configResolved(config) {
      root = config.root;
      // Generate here so the JSON exists before any import is resolved
      // (covers both `astro dev` and `astro build`)
      generate(root);
    },

    handleHotUpdate({ file }) {
      const inDesign = file.includes(`${sep}src${sep}design${sep}`);
      if (inDesign && (file.endsWith(".props.ts") || file.endsWith(".hook.ts"))) {
        generate(root);
      }
    },
  };
}
