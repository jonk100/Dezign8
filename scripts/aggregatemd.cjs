const fs = require('fs');
const path = require('path');

// Configuration: Set your input and output directories here
const inputDir = path.join(__dirname, '../uploads'); 
const outputDir = path.join(__dirname, '../uploads');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Map logical categories to their respective output filenames
const outputFiles = {
  props: 'props-files.md',
  hooks: 'hook-files.md',
  tokens: 'tokens-files.md',
  css: 'css-files.md',
  astro: 'astro-files.md',
  misc: 'misc-files.md'
};

// Initialize output files with a clean slate
Object.values(outputFiles).forEach(fileName => {
  fs.writeFileSync(path.join(outputDir, fileName), `# Aggregated ${fileName.split('-')[0].toUpperCase()} Files\n\n`);
});

// Read all markdown files in the target directory
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.md'));

console.log(`Found ${files.length} markdown files. Processing...`);

for (const file of files) {
  const content = fs.readFileSync(path.join(inputDir, file), 'utf-8');
  
  // Split the document by "## " headers, preserving the header itself
  const sections = content.split(/(?=^##\s+)/m);

  for (const section of sections) {
    const trimmedSection = section.trim();
    if (!trimmedSection.startsWith('## ')) continue;
    
    // Ignore the Table of Contents block
    if (trimmedSection.toLowerCase().includes('## table of contents')) continue;

    // Extract the header line to determine the file type
    const headerLine = trimmedSection.split('\n')[0].toLowerCase();

    // Determine the category based on the filename in the header
    let category = 'misc';
    if (headerLine.includes('.props.ts')) {
      category = 'props';
    } else if (headerLine.includes('.hook.ts')) {
      category = 'hooks';
    } else if (headerLine.includes('.tokens.ts')) {
      category = 'tokens';
    } else if (headerLine.includes('.css')) {
      category = 'css';
    } else if (headerLine.includes('.astro')) {
      category = 'astro';
    }

    // Append the section to the appropriate file
    const targetFile = path.join(outputDir, outputFiles[category]);
    fs.appendFileSync(targetFile, trimmedSection + '\n\n---\n\n');
  }
}

console.log('✅ Extraction complete! Check the output directory.');