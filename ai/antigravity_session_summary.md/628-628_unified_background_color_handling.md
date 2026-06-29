# Unified Background Color Handling - Session Summary

We refactored how the background color (`bg`) prop is resolved and applied across the design system. Instead of category-prefixed color role channel variables (like `layout--bg`, `data--bg`, `surface--color`), `bg` is now resolved directly inside the shared `useBaseCompose` hook. This produces a single, universal set of `--bg--*` variables (`--bg--subtle`, `--bg--muted`, `--bg--base`, etc.) which any component category can leverage.

## Key Decisions

1. **Unified Variable Prefix**:
   * Resolved `bg` to the universal `--bg--*` prefix in `useBaseCompose`, mapping the 7 shades of the semantic color system: `--bg--subtle`, `--bg--muted`, `--bg--base`, `--bg--vivid`, `--bg--deep`, `--bg--border`, and `--bg--text`.
2. **Simplified Component Hooks**:
   * Removed manual color channel resolution calls from `layout.hook.ts`, `data.hook.ts`, and `typography.hook.ts`. These hooks now delegate `bg` processing directly to the base hook.
3. **Surface API Consolidation**:
   * Removed the duplicate `color` prop from `SurfaceProps` since it was a copy of the base `bg` prop inherited from `BaseComponentProps`.
   * Updated `useSurface` to consume `bg` and map its background/border overrides directly to the universal `--bg--subtle` and `--bg--border` variables.
4. **Clean CSS Custom Properties**:
   * Replaced category-prefixed variables (`var(--layout--bg)`, `var(--typography--bg)`, `var(--data--bg--*)`, `var(--surface--color--*)`) in CSS files with the new universal `--bg--*` variables.

## New Files
* `src/content/docs/shared/base-component-props.md`

## Updated Files
* `src/design/shared/base.hook.ts`
* `src/design/shared/base.props.ts`
* `src/design/layout/layout.hook.ts`
* `src/design/layout/components/box/box.css`
* `src/design/layout/components/footer/footer.css`
* `src/design/layout/components/header/header.css`
* `src/design/surfaces/surface.props.ts`
* `src/design/surfaces/surface.hook.ts`
* `src/design/surfaces/components/card/card.css`
* `src/design/surfaces/components/tile/tile.css`
* `src/design/typography/typography.hook.ts`
* `src/design/typography/typography.css`
* `src/design/data/data.hook.ts`
* `src/design/data/data.props.ts`
* `src/design/data/data.tokens.ts`
* `src/design/data/data.css`
* `src/design/data/components/feed/feed.css`
* `src/design/data/components/list/List.astro`
* `src/design/data/components/list/list.css`
* `src/design/data/components/table/Table.astro`
* `src/design/data/components/table/table.css`
