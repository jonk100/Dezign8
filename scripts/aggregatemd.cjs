const fs = require('fs');
const path = require('path');

// Root of your design system
const ROOT = path.join(__dirname, '../src');

// Output directory
const OUTPUT = path.join(__dirname, '../uploads');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT)) {
  fs.mkdirSync(OUTPUT, { recursive: true });
}

// Buckets by file type
const buckets = {
  props: [],
  hooks: [],
  tokens: [],
  css: [],
  astro: [],
  misc: []
};

// File type detection
function detectCategory(file) {
  if (file.endsWith('.props.ts')) return 'props';
  if (file.endsWith('.hook.ts')) return 'hooks';
  if (file.endsWith('.tokens.ts')) return 'tokens';
  if (file.endsWith('.css')) return 'css';
  if (file.endsWith('.astro')) return 'astro';
  return 'misc';
}

// Walk directory tree recursively
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    // Only process TS, CSS, ASTRO files
    if (!/\.(ts|css|astro)$/.test(entry.name)) continue;

    const category = detectCategory(entry.name);
    const content = fs.readFileSync(fullPath, 'utf-8');

    buckets[category].push({
      name: entry.name,
      fullPath,
      content,
      depth: fullPath.split(path.sep).length
    });
  }
}

// Start walking
walk(ROOT);

// Sort by tree depth, then alphabetically
function sortBucket(items) {
  return items.sort((a, b) => {
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.fullPath.localeCompare(b.fullPath);
  });
}

// Write markdown files
function writeBucket(name, items) {
  const fileName = `${name}-files.md`;
  const outPath = path.join(OUTPUT, fileName);

  let md = `# Aggregated ${name.toUpperCase()} Files\n\n`;

  const sorted = sortBucket(items);

  for (const item of sorted) {
    md += `## ${item.name}\n\n`;
    md += `**Full path:** \`${item.fullPath}\`\n\n`;
    md += '```ts\n';
    md += item.content.trim() + '\n';
    md += '```\n\n---\n\n';
  }

  fs.writeFileSync(outPath, md);
}

Object.entries(buckets).forEach(([name, items]) => {
  writeBucket(name, items);
});

console.log('✅ Directory-walk extraction complete (sorted by tree depth)!');

