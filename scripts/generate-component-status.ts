import fs from 'fs';
import path from 'path';

// Define directories
const DESIGN_DIR = path.resolve('src/design');
const DOCS_DIR = path.resolve('src/content/docs');
const OUTPUT_STATUS_FILE = path.resolve('src/design/docs/component-status.md');
const OUTPUT_CHECKLIST_FILE = path.resolve('src/design/docs/verification-checklist.md');

// Known base/inherited props in the design system
const BASE_PROPS = new Set([
  // BaseComponentProps
  'class', 'style', 'id', 'bg', 'disabled', 'motion', 'mDistance', 'action', 'target', 'loading', 'testId', 'v',
  // TypographyProps
  'size', 'weight', 'color', 'align', 'leading', 'tracking', 'fam', 'transform', 'wrap', 'decoration', 'fontStyle', 'clamp', 'truncate',
  // IconProps
  'icon',
  // TriggerProps
  'variant', 'radius', 'type', 'href', 'target', 'rel'
]);

// Interface for component status details
interface ComponentInfo {
  name: string;
  category: string;
  existsInFs: boolean;
  hasTokens: boolean;
  hasProps: boolean;
  hasHook: boolean;
  hasCss: boolean;
  hasAstro: boolean;
  astroFileName?: string;
  hasMdx: boolean;
  mdxStatus?: string;
  declaredProps: string[];
  missingProps: string[];
  calculatedStatus: 'Done' | 'Draft' | 'Planned';
  missingReasons: string[];
}

// Simple frontmatter parser (no external dependency)
function parseFrontmatter(content: string): { title?: string; status?: string; category?: string } {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result: Record<string, string> = {};
  const lines = yaml.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim().replace(/^['"]|['"]$/g, ''); // strip quotes
      result[key] = value;
    }
  }
  return result;
}

// Helper to get category directories under src/design
function getCategories(): string[] {
  if (!fs.existsSync(DESIGN_DIR)) return [];
  return fs.readdirSync(DESIGN_DIR).filter(item => {
    const itemPath = path.join(DESIGN_DIR, item);
    if (!fs.statSync(itemPath).isDirectory()) return false;
    // We only consider directories that have a "components" subdirectory
    return fs.existsSync(path.join(itemPath, 'components'));
  });
}

// Helper to find all MDX files in src/content/docs recursively
function getMdxFiles(dir: string, baseDir = dir): { relativePath: string; fullPath: string }[] {
  let results: { relativePath: string; fullPath: string }[] = [];
  if (!fs.existsSync(dir)) return [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getMdxFiles(fullPath, baseDir));
    } else if (file.endsWith('.mdx') || file.endsWith('.md')) {
      const relativePath = path.relative(baseDir, fullPath);
      results.push({ relativePath, fullPath });
    }
  }
  return results;
}

// Helper to parse declared properties from .props.ts file
function getDeclaredProps(filePath: string): string[] {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Strip comments and declare module blocks
  const cleanContent = content
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .replace(/declare module\s+['"][^'"]+['"]\s*\{[\s\S]*?\}/g, '');

  const props: string[] = [];
  // Find all curlies { ... } at the root or within types
  const blockRegex = /\{([\s\S]*?)\}/g;
  let match;
  while ((match = blockRegex.exec(cleanContent)) !== null) {
    const body = match[1];
    const propRegex = /^\s*([a-zA-Z0-9_]+|"[^"]+"|'[^']+')\s*\??\s*:/gm;
    let propMatch;
    while ((propMatch = propRegex.exec(body)) !== null) {
      const prop = propMatch[1].replace(/^['"]|['"]$/g, '');
      if (!props.includes(prop) && prop !== 'extends') {
        props.push(prop);
      }
    }
  }
  return props;
}

// Helper to check which declared properties are implemented
function verifyPropsImplementation(
  declaredProps: string[],
  hookPath: string,
  astroPath: string
): { implemented: string[]; missing: string[] } {
  let hookContent = '';
  if (fs.existsSync(hookPath)) {
    hookContent = fs.readFileSync(hookPath, 'utf8');
  }

  let astroContent = '';
  if (fs.existsSync(astroPath)) {
    astroContent = fs.readFileSync(astroPath, 'utf8');
  }

  // Strip comments from hook and astro content to avoid matching commented-out prop references
  const cleanHook = hookContent
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '');
  
  const cleanAstro = astroContent
    .replace(/<!--[\s\S]*?-->/g, '') // HTML comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // JS multi-line comments
    .replace(/\/\/.*$/gm, ''); // JS single-line comments

  // Check if hook collects remaining props using a rest parameter (e.g. ...baseProps)
  const hasRest = /\.\.\.[a-zA-Z0-9_]+/g.test(cleanHook) || /Astro\.props/g.test(cleanAstro);

  const implemented: string[] = [];
  const missing: string[] = [];

  for (const prop of declaredProps) {
    const wordRegex = new RegExp(`\\b${prop}\\b`);
    const isUsedInHook = wordRegex.test(cleanHook);
    const isUsedInAstro = wordRegex.test(cleanAstro);

    if (isUsedInHook || isUsedInAstro) {
      implemented.push(prop);
    } else {
      // Base props or ARIA/data attributes are considered implemented if they are forwarded via rest
      const isBaseOrAria = BASE_PROPS.has(prop) || prop.startsWith('aria-') || prop.startsWith('data-');
      if (isBaseOrAria && hasRest) {
        implemented.push(prop);
      } else {
        missing.push(prop);
      }
    }
  }

  return { implemented, missing };
}

function generate() {
  console.log('🔄 Scanning component status and prop verification...');
  const componentsMap = new Map<string, ComponentInfo>();

  // 1. Scan filesystem for implemented components
  const categories = getCategories();
  for (const cat of categories) {
    const compDir = path.join(DESIGN_DIR, cat, 'components');
    if (!fs.existsSync(compDir)) continue;
    const comps = fs.readdirSync(compDir).filter(item => {
      return fs.statSync(path.join(compDir, item)).isDirectory();
    });

    for (const comp of comps) {
      const dirPath = path.join(compDir, comp);
      const files = fs.readdirSync(dirPath);

      const hasTokens = files.includes(`${comp}.tokens.ts`);
      const hasProps = files.includes(`${comp}.props.ts`);
      const hasHook = files.includes(`${comp}.hook.ts`);
      const hasCss = files.includes(`${comp}.css`);
      
      const astroFile = files.find(f => f.endsWith('.astro'));
      const hasAstro = !!astroFile;

      const propsFilePath = path.join(dirPath, `${comp}.props.ts`);
      const hookFilePath = path.join(dirPath, `${comp}.hook.ts`);
      const astroFilePath = astroFile ? path.join(dirPath, astroFile) : '';

      // Extract declared props and check implementation
      const declaredProps = hasProps ? getDeclaredProps(propsFilePath) : [];
      const { missing: missingProps } = hasProps
        ? verifyPropsImplementation(declaredProps, hookFilePath, astroFilePath)
        : { implemented: [], missing: [] };

      const key = `${cat}/${comp}`;
      componentsMap.set(key, {
        name: comp,
        category: cat,
        existsInFs: true,
        hasTokens,
        hasProps,
        hasHook,
        hasCss,
        hasAstro,
        astroFileName: astroFile,
        hasMdx: false,
        declaredProps,
        missingProps,
        calculatedStatus: 'Draft',
        missingReasons: [],
      });
    }
  }

  // 2. Scan content/docs for documented components (supplementing filesystem)
  const mdxFiles = getMdxFiles(DOCS_DIR);
  for (const mdx of mdxFiles) {
    // Exclude category overview docs (e.g. typography/typography.mdx)
    const parts = mdx.relativePath.split(path.sep);
    if (parts.length < 2) continue;
    const cat = parts[0];
    const fileName = parts[parts.length - 1];
    const compName = fileName.replace(/\.mdx?$/, '');
    
    if (cat === compName) {
      // It's a category overview doc, skip it
      continue;
    }

    const key = `${cat}/${compName}`;
    const fileContent = fs.readFileSync(mdx.fullPath, 'utf8');
    const frontmatter = parseFrontmatter(fileContent);
    const mdxStatus = frontmatter.status || 'draft';

    const existing = componentsMap.get(key);
    if (existing) {
      existing.hasMdx = true;
      existing.mdxStatus = mdxStatus;
    } else {
      // Component is planned (documented but no code directory)
      componentsMap.set(key, {
        name: compName,
        category: cat,
        existsInFs: false,
        hasTokens: false,
        hasProps: false,
        hasHook: false,
        hasCss: false,
        hasAstro: false,
        hasMdx: true,
        mdxStatus,
        declaredProps: [],
        missingProps: [],
        calculatedStatus: 'Planned',
        missingReasons: ['Directory not created in src/design'],
      });
    }
  }

  // 3. Calculate status and reasons
  const allComponents = Array.from(componentsMap.values());
  for (const comp of allComponents) {
    if (!comp.existsInFs) {
      comp.calculatedStatus = 'Planned';
      continue;
    }

    // Check 5-file shape, prop verification, and status
    const missing: string[] = [];
    if (!comp.hasTokens) missing.push(`missing ${comp.name}.tokens.ts`);
    if (!comp.hasProps) missing.push(`missing ${comp.name}.props.ts`);
    if (!comp.hasHook) missing.push(`missing ${comp.name}.hook.ts`);
    if (!comp.hasCss) missing.push(`missing ${comp.name}.css`);
    if (!comp.hasAstro) missing.push(`missing .astro file`);
    if (comp.missingProps.length > 0) {
      missing.push(`unimplemented props: ${comp.missingProps.map(p => `'${p}'`).join(', ')}`);
    }
    if (!comp.hasMdx) {
      missing.push(`missing documentation mdx file`);
    } else if (comp.mdxStatus !== 'stable') {
      missing.push(`doc status is '${comp.mdxStatus}' (requires 'stable')`);
    }

    comp.missingReasons = missing;

    if (missing.length === 0) {
      comp.calculatedStatus = 'Done';
    } else {
      comp.calculatedStatus = 'Draft';
    }
  }

  // Group by category for outputting
  const categoriesList = Array.from(new Set(allComponents.map(c => c.category))).sort();

  // 4. Generate component-status.md
  let statusMd = `# Component Status

This file is automatically generated by \`npm run status:components\`.
Do not edit this file directly.

## Totals
`;

  const doneCount = allComponents.filter(c => c.calculatedStatus === 'Done').length;
  const draftCount = allComponents.filter(c => c.calculatedStatus === 'Draft').length;
  const plannedCount = allComponents.filter(c => c.calculatedStatus === 'Planned').length;
  const totalCount = allComponents.length;

  statusMd += `- **Total Components**: ${totalCount}\n`;
  statusMd += `- **Done** (5-file shape + complete props + stable doc): ${doneCount}\n`;
  statusMd += `- **Draft** (incomplete shape, missing props, or experimental/no doc): ${draftCount}\n`;
  statusMd += `- **Planned** (documented but not yet implemented): ${plannedCount}\n\n`;

  statusMd += `## Status Breakdown

| Category | Component | Status | Verification Summary / Issues |
|---|---|---|---|
`;

  // Sort components by category, then by name
  const sortedComponents = [...allComponents].sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.name.localeCompare(b.name);
  });

  for (const comp of sortedComponents) {
    let statusLabel = '';
    if (comp.calculatedStatus === 'Done') {
      statusLabel = '🟢 **Done**';
    } else if (comp.calculatedStatus === 'Draft') {
      statusLabel = '🟡 **Draft**';
    } else {
      statusLabel = '⚪ *Planned*';
    }
    const reasonText = comp.missingReasons.length > 0 ? comp.missingReasons.join('; ') : 'Fully complete & implemented';
    statusMd += `| ${comp.category} | \`${comp.name}\` | ${statusLabel} | ${reasonText} |\n`;
  }

  fs.writeFileSync(OUTPUT_STATUS_FILE, statusMd);
  console.log(`✅ Generated status report: ${path.relative(process.cwd(), OUTPUT_STATUS_FILE)}`);

  // 5. Generate verification-checklist.md
  let checklistMd = `# Component Verification Checklist

This file is automatically generated by \`npm run status:components\`.
Use it to verify the status of components manually and check what files/prop implementations are missing.

`;

  for (const cat of categoriesList) {
    checklistMd += `## ${cat.charAt(0).toUpperCase() + cat.slice(1)}\n\n`;
    const catComps = sortedComponents.filter(c => c.category === cat);
    for (const comp of catComps) {
      checklistMd += `### \`${comp.name}\`\n`;
      checklistMd += `- Status: ${comp.calculatedStatus === 'Done' ? '🟢 **Done**' : comp.calculatedStatus === 'Draft' ? '🟡 **Draft**' : '⚪ *Planned*'}\n`;
      
      if (!comp.existsInFs) {
        checklistMd += `- [ ] Directory created under \`src/design/${cat}/components/${comp.name}\`\n`;
        checklistMd += `- [ ] \`${comp.name}.tokens.ts\`\n`;
        checklistMd += `- [ ] \`${comp.name}.props.ts\`\n`;
        checklistMd += `- [ ] \`${comp.name}.hook.ts\`\n`;
        checklistMd += `- [ ] \`${comp.name}.css\`\n`;
        checklistMd += `- [ ] \`.astro\` component\n`;
        checklistMd += `- [x] Documentation file exists\n`;
        checklistMd += `- [ ] Documentation status is 'stable' (Current: \`${comp.mdxStatus}\`)\n`;
      } else {
        checklistMd += `- [x] Directory exists\n`;
        checklistMd += `- [${comp.hasTokens ? 'x' : ' '}] \`${comp.name}.tokens.ts\`\n`;
        checklistMd += `- [${comp.hasProps ? 'x' : ' '}] \`${comp.name}.props.ts\`\n`;
        checklistMd += `- [${comp.hasHook ? 'x' : ' '}] \`${comp.name}.hook.ts\`\n`;
        checklistMd += `- [${comp.hasCss ? 'x' : ' '}] \`${comp.name}.css\`\n`;
        checklistMd += `- [${comp.hasAstro ? 'x' : ' '}] \`.astro\` component (${comp.astroFileName || 'missing'})\n`;
        checklistMd += `- [${comp.hasMdx ? 'x' : ' '}] Documentation file exists\n`;
        checklistMd += `- [${comp.mdxStatus === 'stable' ? 'x' : ' '}] Documentation status is 'stable' (Current: \`${comp.mdxStatus || 'none'}\`)\n`;
        
        if (comp.hasProps) {
          checklistMd += `- Prop Verification:\n`;
          if (comp.declaredProps.length === 0) {
            checklistMd += `  - No custom props declared in \`${comp.name}.props.ts\`.\n`;
          } else {
            for (const prop of comp.declaredProps) {
              const isMissing = comp.missingProps.includes(prop);
              checklistMd += `  - [${isMissing ? ' ' : 'x'}] \`${prop}\` ${isMissing ? '**[MISSING IN HOOK/ASTRO]**' : 'is implemented'}\n`;
            }
          }
        }
      }
      checklistMd += '\n';
    }
    checklistMd += '\n';
  }

  fs.writeFileSync(OUTPUT_CHECKLIST_FILE, checklistMd);
  console.log(`✅ Generated verification checklist: ${path.relative(process.cwd(), OUTPUT_CHECKLIST_FILE)}`);

  // Console output summary
  console.log('\n======================================');
  console.log('       Component Status Summary       ');
  console.log('======================================');
  console.log(` Done (Stable & Complete):  ${doneCount}`);
  console.log(` Draft (Incomplete/Exp):    ${draftCount}`);
  console.log(` Planned (Doc only):        ${plannedCount}`);
  console.log(` Total:                     ${totalCount}`);
  console.log('======================================\n');
}

generate();
