# spacing_props_hook_integration - Session Summary

## Date Range
2026/06/28 to 2026/06/29

## Decisions & Changes
Centralized the extraction and resolution of all 14 shorthand spacing properties (`p`, `mx`, etc.) directly inside `useBaseCompose` in `base.hook.ts`. This ensures spacing props do not leak into the DOM as HTML attributes (since they are now stripped from `rest` in `useBaseCompose`) and significantly simplifies component-level hooks by removing manual `resolveSpacingStyles` calls.
To support scoped custom properties automatically, `useBaseCompose` now derives the CSS variable prefix from the first string token in the `className` option (e.g., `"layout"`, `"image"`), but also supports an explicit `prefix` override in `BaseComposeOptions`.
`BaseComponentProps` was updated to extend `SpacingProps` so all components globally support spacing props.
`layout.hook.ts` and `image.hook.ts` were simplified to delegate spacing resolution to `useBaseCompose`.

## Files Created/Updated
### Updated files
* `src/design/shared/base.props.ts`
* `src/design/shared/base.hook.ts`
* `src/design/layout/layout.hook.ts`
* `src/design/assets/components/image/image.hook.ts`
