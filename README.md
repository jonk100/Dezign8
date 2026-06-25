# dezign8

A native-first Astro component library. No framework, no virtual DOM. Components are pure HTML + scoped CSS custom properties.

## Philosophy

- **No 3rd Parties**: This is an Astro, Typescript & pure CSS design system.
- **No unnecessary abstractions**: No new dependencies unless unavoidable.
- **Prefer deletion over addition**: Prefer boring over clever.

## Architecture

This library is built around a native-first approach (`src/design/`). Components are strictly constructed using pure HTML and scoped CSS custom properties. 

### Component Structure

Every component generally follows this 5-file shape:

- `<component>.tokens.ts` — Token spec, defaults, and constant lists
- `<component>.props.ts` — Types only (no runtime values)
- `<component>.hook.ts` — Translates props into tags and CSS properties
- `<component>.css` — Reads CSS channels written by the hook
- `<Component>.astro` — Imports, calls the hook, and renders

The shape is sometimes extended to include `<component>.client.ts` (client-side scripts), `<component>.utils.ts` (helper functions, excessive boilerplate), and/or similar naming patterns.

## Commands

All commands are run from the root of the project using `pnpm` or `just`:

```bash
pnpm dev          # Start the dev server (opens in browser)
pnpm build        # Build for production
pnpm astro check  # Run TypeScript checks
pnpm lint         # Lint the codebase
just check        # Run typecheck + lint together
just watch        # Watch .ts/.astro files and re-run check on change
just lint-fix     # Auto-fix lint issues
just clean        # Remove dist and node_modules directories
just reset        # Wipe node_modules + lockfile and reinstall

```

## Documentation

Component documentation is written in MDX files loaded via Astro Content Collections in `src/content/docs/`.
