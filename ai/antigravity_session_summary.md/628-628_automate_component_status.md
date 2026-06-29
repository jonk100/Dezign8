# Automate Component Status & Verification Checklist Generation

## Key Decisions
- Created a TypeScript script `scripts/generate-component-status.ts` to automatically analyze and report component status.
- Designed a custom static analysis parser that extracts declared props from `<component>.props.ts` files, strips comments, and verifies that they are actually referenced in either `<component>.hook.ts` or `<Component>.astro` files.
- The script differentiates between component-specific props and base props (e.g. from `BaseComponentProps` or `TypographyProps`), automatically considering base props implemented if the hook has a rest parameter forwarding them.
- Avoided false positives by stripping `declare module` blocks before parsing prop properties, ensuring typings like `VisualRegistry` do not trigger prop implementation issues.
- Outputs two markdown files in the design documentation directory:
  1. `src/design/docs/component-status.md` (overview report with status totals and component breakdown).
  2. `src/design/docs/verification-checklist.md` (detailed manual verification checklist showing files present/missing and prop verification details).

## New Files
- `scripts/generate-component-status.ts`
- `src/design/docs/component-status.md` (generated)
- `src/design/docs/verification-checklist.md` (generated)

## Updated Files
- `package.json`
- `justfile`
