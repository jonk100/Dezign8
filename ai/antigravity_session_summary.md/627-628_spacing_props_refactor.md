# Session Summary: SpacingProps Refactor

## What Was Done
1. **Refactored `SpacingProps`**: Removed `extends SpacingProps` from `BaseComponentProps` (`src/design/shared/base.props.ts`). This ensures components that don't wire spacing to CSS (like Icon, Badge, Button) no longer accept spacing props (`p`, `m`, etc.) in their interfaces, preventing silent failures.
2. **Updated Category Hooks**:
    *   **Removed** spacing destructuring and return values from `useBaseCompose` (`src/design/shared/base.hook.ts`).
    *   **Layout**: `layout.hook.ts` already correctly destructured and wired spacing. Simply removed the unused `spacing` return from its `useBaseCompose` call.
    *   **Assets**: Added `extends SpacingProps` to `AssetProps` and `ImageProps`.
    *   **Feedback**: Removed spacing handling. Padding for feedback components (like Alert and Toast) is driven by size tokens (`ALERT_SIZE_MAP`), not external spacing props.
    *   **Forms/Data**: Removed aspirational spacing handling. Padding is driven by size tokens (`--form--size`).
3. **Cleaned up references**:
    *   Fixed `audio.hook.ts`, `surface.hook.ts`, `trigger.hook.ts`, `typography.hook.ts`, and `label.hook.ts` which were erroneously extracting spacing props they didn't use.
4. **Documentation**: Appended a new section `## Spacing Ownership` to `src/design/docs/architecture.md` to document the category-level opt-in model.
5. **Linting/Typechecking**: Cleaned up unused imports in `index.astro`, `DocsLayout.astro`, and `TableCell.astro` to clear Astro compiler warnings.

## Architectural Changes
Spacing (margin and padding) is **no longer a universal base property**. It is handled through a **category-level opt-in model**.

*   **Universal props (`BaseComponentProps`)** do *not* include spacing.
*   **Size tokens control internal padding** for components like Buttons, Badges, and Inputs to prevent collisions.
*   **Opt-in categories** (Layout, Assets) explicitly extend `SpacingProps` and wire them via `resolveSpacingStyles`.

## New Files
*(None)*

## Updated Files
*   `src/design/shared/base.props.ts`
*   `src/design/shared/base.hook.ts`
*   `src/design/surfaces/surface.hook.ts`
*   `src/design/triggers/trigger.hook.ts`
*   `src/design/typography/typography.hook.ts`
*   `src/design/typography/components/label/label.hook.ts`
*   `src/design/feedback/feedback.hook.ts`
*   `src/design/forms/forms.hook.ts`
*   `src/design/layout/layout.hook.ts`
*   `src/design/data/data.hook.ts`
*   `src/design/feedback/components/alert/alert.hook.ts`
*   `src/design/feedback/components/toast/toast.hook.ts`
*   `src/design/assets/asset.props.ts`
*   `src/design/assets/components/image/image.props.ts`
*   `src/design/assets/components/audio/audio.hook.ts`
*   `src/design/docs/architecture.md`
*   `src/design/data/components/table/parts/TableCell.astro`
*   `src/layouts/docs/DocsLayout.astro`
*   `src/pages/index.astro`
