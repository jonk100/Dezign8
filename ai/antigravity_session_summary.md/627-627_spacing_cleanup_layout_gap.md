# 2026/06/27 — Spacing cleanup + layout gap + useBaseCompose docs

## Summary

Cleaned up duplicate code in `spacing.props.ts`, added missing `gap` prop to `LayoutProps`, uncommented `StackProps` properties, added comprehensive TSDoc to `useBaseCompose`, and fixed two pre-existing eslint errors.

## Key decisions

### spacing.props.ts had two copies of everything
The file contained an old verbose implementation (old `SpacingProps` interface, `SpacingToken` type, `SPACING_PROP_MAP`, `SPACING_TOKEN_MAP`, old `resolveSpacingStyles` with its own dev self-tests) alongside the clean newer versions that use `SpaceValue` + `SPACE` from primitives. Removed all old code. The clean versions (using `SPACE` lookup from primitives.tokens) are the canonical implementation.

### `gap` was missing from `LayoutProps`
`layout.hook.ts` destructured `gap` from props and passed it to `resolveTokens(LAYOUT_TOKENS, { gap, align, justify }, "layout")`, but `LayoutProps` never declared `gap`. Added `gap?: LayoutGap`. This also fixes `ScreenProps` since it `extends LayoutProps`.

### `StackProps` had `as` and `gap` commented out
`stack.hook.ts` was destructuring both properties, but the interface had them commented out. Uncommented and added JSDoc.

### TSDoc for `useBaseCompose`
Added a comprehensive TSDoc comment documenting:
- Parameters and return value tables
- Four usage patterns with real code examples:
  1. Token classes + styles, no extras (Icon, Overlay, Avatar)
  2. Token classes + styles + color channels + spacing (Layout, Feedback, Data, Forms)
  3. `options.attrs` for component-specific data attributes (Data, Feedback)
  4. Category hook → component hook two-level composition (Feedback → Badge/Spinner)
- Example inputs → outputs for each pattern

### Pre-existing eslint fixes
- `Layout.astro`: Suppressed false-positive `astro/no-omitted-end-tags` for `<head>` (parser confused by `<Head>` component inside it)
- `[...slug].astro`: Removed `eslint-disable-next-line` for `@typescript-eslint/no-explicit-any` which wasn't a loaded rule in the Astro parser config

## Open question
`BaseComponentProps` still `extends SpacingProps` on line 8 of `base.props.ts`. User mentioned they wanted it removed (spacing should be per-category, not universal), but ~30 component props inherit from `BaseComponentProps` and `useBaseCompose` still destructures/returns spacing. Deferred to next session.

## Modified files
- `src/design/shared/spacing.props.ts` — removed old duplicate SpacingProps, SpacingToken, resolveSpacingStyles, SPACING_TOKEN_MAP, SPACING_PROP_MAP, dev self-tests
- `src/design/shared/base.hook.ts` — added TSDoc comment above useBaseCompose
- `src/design/layout/layout.props.ts` — added `gap?: LayoutGap`
- `src/design/layout/components/stack/stack.props.ts` — uncommented `as?: StackTag` and `gap?: StackGap`
- `src/layouts/Layout.astro` — eslint suppress for head tag
- `src/pages/docs/[...slug].astro` — removed invalid eslint-disable comment
