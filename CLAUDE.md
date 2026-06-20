# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Philosophy

Follow the **Lazy Senior Developer** principles in `AGENTS.MD`. Key rules:
- Never use React. This is an Astro + pure CSS design system.
- No abstractions unless explicitly requested. No new dependencies unless unavoidable.
- Prefer deletion over addition. Prefer boring over clever.
- Mark intentional simplifications: `// ponytail: simplified implementation; may not scale beyond X, upgrade path: Y`
- Document key decisions in `/ai/agent_decision_log.md` (newest entry at top, then `git add` + `git commit`).

Always consult `src/design/docs/` before making structural or design decisions.

---

## Commands

```bash
pnpm dev          # dev server (opens browser)
pnpm build        # production build
pnpm astro check  # TypeScript check
pnpm lint         # lint
just check        # typecheck + lint together
just watch        # watch .ts/.astro files and re-run check on change
just lint-fix     # auto-fix lint issues
just clean        # rm -rf dist node_modules
just reset        # wipe node_modules + lockfile and reinstall
```

No test framework — for non-trivial logic, add one minimal self-check or assert-style demo inline.

---

## Architecture

This is a **native-first Astro component library** (`src/design/`). No framework, no virtual DOM. Components are pure HTML + scoped CSS custom properties.

### Component file shape (every component, no exceptions)

```
src/design/<category>/components/<component>/
  <component>.tokens.ts   — token spec + defaults + constant lists
  <component>.props.ts    — types only, no runtime values
  <component>.hook.ts     — translates props → { Tag, props }
  <component>.css         — reads CSS channels written by hook
  <Component>.astro       — 3 lines: import, call hook, render
  index.ts                — barrel export
```

The `.astro` file is always:
```astro
---
import type { FooProps } from "./foo.props";
import { useFoo } from "./foo.hook";
import "./foo.css";
const { Tag, props } = useFoo(Astro.props as FooProps);
---
<Tag {...props}><slot /></Tag>
```

No logic in `.astro` files beyond named slot presence guards.

### Token pipeline

```
shared/tokens.ts            engine (scale, dimension, defineTokens, resolveTokens)
shared/primitives.tokens.ts shared value scales (SPACE, TEXT_SIZE, etc.)
<category>.tokens.ts        assembles spec from primitives; no defaults
<component>.tokens.ts       holds defaults + narrows/extends/re-exports category tokens
<component>.props.ts        derives scale types from token spec (never hand-write unions)
<component>.hook.ts         calls resolveTokens → writes CSS channels inline
<component>.css             reads --{category}--{key} channels only
```

### CSS channels

Hook writes `--{prefix}--{key}` as inline styles; CSS reads them. Never reference raw scale values (`--size-03`) or token names (`--radius--md`) in component CSS — only channels (`--control--radius`). Theme switching lives entirely in `tokens.css` via `[data-theme]`; components reference `--token-*` only.

### Import direction (hard constraint — violating creates circular deps)

```
vars.css / tokens.css
  ↑
shared/primitives.tokens.ts
  ↑
<category>.tokens.ts → <category>.props.ts → <category>.hook.ts → <category>.css
  ↑
<component>.tokens.ts → <component>.props.ts → <component>.hook.ts → <component>.css
  ↑
<Component>.astro
```

- `shared/` imports nothing from any category or component.
- Categories don't import from sibling categories.
- Components don't import from sibling components.
- `.css` files import nothing — they only read CSS custom properties.

### Path aliases (tsconfig.paths.json)

| Alias | Resolves to |
|---|---|
| `~/*` | `src/design/*` |
| `~sh/*` | `src/design/shared/*` |
| `~st/*` | `src/design/styles/*` |
| `~l/*` | `src/design/layout/*` |
| `~ty/*` | `src/design/typography/*` |
| `~tr/*` | `src/design/triggers/*` |
| `~a/*` | `src/design/assets/*` |

### CSS conventions

- Modifier classes for static hook-emitted booleans: `.button--full-width`
- `data-*` attributes for runtime JS-toggled state: `[data-selected="true"]`
- Native pseudo-classes for browser-tracked state: `:hover`, `:focus-visible`
- Group all properties a variant controls in one block (no partial overrides split across rules)
- Nesting max 2 levels. No `!important`. Root selector is `.{component}` or `[data-visual="{component}"]`

### Docs content (`src/content/docs/`)

MDX files are the component documentation, loaded via Astro Content Collections. Frontmatter schema is in `src/content.config.ts`. Required fields: `title`, `description`. Optional: `category` (enum), `status` (draft/experimental/stable/deprecated).

### Component build priority

See `src/design/docs/checklist.md` for the 5-tier priority order (Tier 1 = ubiquitous web elements first, Tier 5 = niche). Tier 1–2 components not yet checked off are the highest priority to build.
