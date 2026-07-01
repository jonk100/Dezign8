import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Resolve the directory where this file lives
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The design directory is one level up from .config
const designDir = path.resolve(__dirname, '..');
// The src directory is one level up from design
const srcDir = path.resolve(designDir, '..');

// More specific aliases must come before "~" and "@": Vite's object-form
// resolve.alias matches in insertion order and takes the first prefix match,
// not the most specific one, so a catch-all listed first would shadow these.
//
// Replacement values below need a trailing slash to match the trailing
// slash on their keys: Vite's alias resolver splices out the matched key
// (slash included) and appends the replacement, so a replacement without
// a trailing slash produces a squished path (e.g. "componentslink/Link.astro").
const withTrailingSlash = (p: string) => p.endsWith(path.sep) ? p : p + path.sep;

export const designAliases = {
  "~/assets_/": withTrailingSlash(path.resolve(designDir, "assets/components/")),
  "~/data_/": withTrailingSlash(path.resolve(designDir, "data/components/")),
  "~/feedback_/": withTrailingSlash(path.resolve(designDir, "feedback/components/")),
  "~/forms_/": withTrailingSlash(path.resolve(designDir, "forms/components/")),
  "~/layout_/": withTrailingSlash(path.resolve(designDir, "layout/components/")),
  "~/nav_/": withTrailingSlash(path.resolve(designDir, "nav/components/")),
  "~/overlays_/": withTrailingSlash(path.resolve(designDir, "overlays/components/")),
  "~/shared_/": withTrailingSlash(path.resolve(designDir, "shared/components/")),
  "~/surfaces_/": withTrailingSlash(path.resolve(designDir, "surfaces/components/")),
  "~/triggers_/": withTrailingSlash(path.resolve(designDir, "triggers/components/")),
  "~/typography_/": withTrailingSlash(path.resolve(designDir, "typography/components/")),
  "~": designDir,
  "@": srcDir,
};
