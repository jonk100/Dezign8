# Decision Log =======================
________________________________________
- Document key decisions and changes made
- New entries on top 
- `git add` and `git commit` after each entry
_________________________________________________
=================================================

-----------------------------------------------

## 2026/06/23 - Separator fix, Alert, Banner, chip/tag docs, Icon fix

### Decisions
- **Separator modifier mismatch**: `modifier: true` emits flat classes (`separator--solid`) but CSS expected namespaced classes (`separator--variant-solid`). Fixed by switching to `modifier: "variant"` and `modifier: "strength"`. Removed dead `labelPosition` prop entirely.
- **Separator color channel**: dashed + solid both now read `--separator--color: var(--border--{strength})` written by hook, instead of `border-color: inherit` (which pulled from parent text color).
- **Spacer hook broken API**: `useBaseCompose` was called with `class` key and destructured `{ props }` which the fn never returns. Fixed to use `{ className }` and destructure `{ className, style, attrs }`.
- **Alert/Banner as block feedback**: Both extend `FeedbackProps` but Omit `size`/`pulse`/`placement` — alerts and banners don't scale like pill indicators. `feedback.css` layout overridden (`display`, `width`, `white-space`) in each component's CSS.
- **Alert ARIA role baked in**: `role="alert"` for `color="danger"|"warning"`, `role="status"` for all others. Not left to consumers.
- **Banner `aria-label` extraction**: Destructured `aria-label` before `useFeedback` to avoid TypeScript `{}` inference from `rest["aria-label"]` lookup.
- **Dismiss is pure HTML**: No `client.ts`. Dismiss button renders; consumer wires the one-line click handler. Avoids View Transitions re-init complexity.
- **Icon hook wrong API**: `resolveTokens` was destructured as `{ class, style, attributes }` (old API). Correct return is `{ style, classes }`. `useBaseCompose` was called with raw `rest` instead of `{ className, style }` options. Size modifier classes (`icon--md` etc.) were never emitting.

### New/updated files
```
src/design/layout/components/separator/separator.tokens.ts   modifier fix
src/design/layout/components/separator/separator.props.ts    removed labelPosition
src/design/layout/components/separator/separator.hook.ts     rewrite; --separator--color channel
src/design/layout/components/separator/separator.css         reads channel; dashed fix
src/design/layout/components/spacer/spacer.hook.ts           useBaseCompose API fix
src/design/feedback/components/alert/*                       new (5 files)
src/design/feedback/components/banner/*                      new (5 files)
src/content/docs/feedback/chip.mdx                           new
src/content/docs/feedback/tag.mdx                            new
src/content/docs/feedback/alert.mdx                          new
src/content/docs/feedback/banner.mdx                         new
src/design/assets/components/icon/icon.hook.ts               resolveTokens + useBaseCompose API fix
```

-----------------------------------------------

## 2026/06/23 - Typecheck pass: 29 errors fixed

Ran `pnpm astro check` and resolved all 29 type errors across the codebase.

### Decisions
- **`Record<string, unknown>` cast on spreads**: Badge, Tile, TabPanel, Step, Tabs all spread hook-returned props onto Astro elements. With `exactOptionalPropertyTypes: true`, the union/widened types from `HTMLAttributes<union>` can't satisfy the strict element types. Cast to `Record<string, unknown>` at the spread site rather than rewriting the return types — the runtime values are correct, only the TS inference is too wide.
- **`imgLoading` instead of `loading` on ImageProps**: `BaseComponentProps.loading` is `boolean` (skeleton state). `ImageProps` needed `"lazy" | "eager"` for the HTML `loading` attribute. Renamed to `imgLoading` in props/hook to avoid the interface conflict; hook maps it back to `loading` on the `<img>` element.
- **`OverlayAnimation` type defined locally**: The type was referenced but never imported or declared. Defined as a local string union (`"fade" | "slide-up" | "slide-down" | "scale"`) in `overlay.props.ts` alongside the missing `BaseComponentProps` import. Kept narrow — can be extracted to `overlay.tokens.ts` if an Overlays category is built out.
- **Conditional spreads for exactOptional**: Breadcrumbs, Tabs, Stepper pass optional props (href, disabled, description) from data arrays. Instead of always passing `prop={value | undefined}`, switched to `{...(value !== undefined ? { prop: value } : {})}` to satisfy strict optional semantics.
- **Missing surface index files**: `surfaces/components/{card,paper,tile}/index.ts` didn't exist but were re-exported from the category barrel. Created minimal index files exporting props + tokens only (no `.astro` components — those aren't type-importable via barrel).
- **`SyntheticEvent` in asset.props.ts**: React type referenced without React. Replaced with native `Event`.
- **`as const` on role strings**: `role: "tablist"` / `role: "tabpanel"` typed as `string` in hook return objects. Added `as const` so Astro sees the literal `AriaRole` type.

-----------------------------------------------

## 2026/06/23 - Alert and Banner components

Built Alert and Banner as block-level feedback components from empty stubs.

### Decisions
- **No cross-category imports**: dismiss buttons use bare `<button class="alert__dismiss">` + inline SVG instead of importing `<Button>` from triggers. Consistent with DS idiom; avoids circular dep risk.
- **Alert ARIA role is dynamic**: `role="alert"` for `color="danger"|"warning"` (assertive), `role="status"` for all others (polite). This is baked into the hook, not left to consumers.
- **Banner ARIA**: `role="region"` + `aria-label` (defaults to "Page notification"). Consumers should override `aria-label` when purpose is specific.
- **Layout override**: `feedback.css` is designed for inline-flex pill indicators. Both components override `display`, `width`, `white-space`, `padding` in their own CSS to become block message boxes while still inheriting variant + color channel rules.
- **No size token for alert/banner**: Omitted `size` from FeedbackProps (Omit'd from base). Alerts and banners don't scale like badges/chips. No size CSS rules.
- **`radius: "md"` for alert, `"none"` for banner**: Alert is contained, so slight rounding fits. Banner is edge-to-edge, so no radius.
- **Dismiss is pure HTML**: No client.ts file added. The dismiss button is rendered; wiring up click-to-hide is the consumer's responsibility (one line of JS). This was intentional to avoid View Transitions re-init complexity.
- **Banner `aria-label` extraction**: Destructured `aria-label` from props before passing to `useFeedback` to avoid TypeScript `{}` type inference issue from `rest["aria-label"]` lookup.

### New files
```
src/design/feedback/components/alert/alert.tokens.ts
src/design/feedback/components/alert/alert.props.ts
src/design/feedback/components/alert/alert.hook.ts
src/design/feedback/components/alert/alert.css
src/design/feedback/components/alert/Alert.astro
src/design/feedback/components/banner/banner.tokens.ts
src/design/feedback/components/banner/banner.props.ts
src/design/feedback/components/banner/banner.hook.ts
src/design/feedback/components/banner/banner.css
src/design/feedback/components/banner/Banner.astro
```

-----------------------------------------------

## 2026/06/22 to 2026/06/22 - Antigravity session

See:
- [Session Summary](./antigravity_session_summary.md/622-622_update_branding_logos.md)

### New files
```
ai/antigravity_session_summary.md/622-622_update_branding_logos.md
```

### Updated files
```
src/layouts/Head.astro                  Updated favicon and OG image to new blue transparent icon
src/layouts/docs/DocsLayout.astro       Updated navigation logo to icon-blue-transparent.png
src/pages/index.astro                   Updated main landing page logo to horizontal-blue.png, removed redundant h1
```

-----------------------------------------------

## 2026/06/22 - Claude chat

See: [Session Summary](./claude_session_summary.md/622_css_registry_update.md)

### Updated files
```
design/shared/primitives.definitions.ts   vivid/deep for semantic roles; tertiary;
                                           NEUTRAL_ROLE const; HIGH_CONTRAST_TOKENS;
                                           PRINT_TOKENS; TokenBlock mediaQuery field;
                                           NEUTRAL_ROLE spread into :root block
plugins/tokens.ts                          buildCSS handles mediaQuery wrapping
design/shared/base.hook.ts                stale vivid/deep comment removed
```

-----------------------------------------------

## 2026/06/20 to 2026/06/21 - Antigravity session

See:

- [Session Summary](./antigravity_session_summary.md/620-621_layout_feedback_components.md)

### New files
```
src/content/docs/layout/center.mdx
src/content/docs/layout/container.mdx
src/content/docs/layout/flex.mdx
src/content/docs/layout/grid.mdx
src/design/feedback/components/tag/tag.tokens.ts
src/design/feedback/components/tag/tag.props.ts
src/design/feedback/components/tag/tag.hook.ts
src/design/feedback/components/tag/tag.css
src/design/feedback/components/tag/Tag.astro
src/design/feedback/components/chip/chip.tokens.ts
src/design/feedback/components/chip/chip.props.ts
src/design/feedback/components/chip/chip.hook.ts
src/design/feedback/components/chip/chip.css
src/design/feedback/components/chip/Chip.astro
src/design/assets/components/icon/icon.tokens.ts
src/design/assets/components/icon/icon.props.ts
src/design/assets/components/icon/icon.hook.ts
src/design/assets/components/icon/icon.css
src/design/assets/components/icon/Icon.astro
ai/antigravity_session_summary.md/620-621_layout_feedback_components.md
```

### Updated files
```
src/layouts/docs/docs-layout.css             Renamed .header to .docs-page-header
src/layouts/docs/DocsLayout.astro            Updated class to docs-page-header
src/design/layout/layout.hook.ts             Imported layout.css
src/design/layout/components/header/Header.astro  Removed manual layout.css import
src/content/docs/feedback/badge.mdx          Added live previews
```

-----------------------------------------------

## 2026/06/20 to 2026/06/22 - Claude project chat

See:

- [Session Summary](./claude_session_summary.md/620-622_data_and_cssregistry.md)

### New files
```
design/data/data.tokens.ts
design/data/data.props.ts
design/data/data.hook.ts
design/data/data.css
design/data/data.utils.ts
design/data/table/table.tokens.ts
design/data/table/table.props.ts
design/data/table/table.hook.ts
design/data/table/table.css
design/data/table/Table.astro
design/data/table/table.client.ts
design/data/table/parts/table-parts.props.ts
design/data/table/parts/TableHead.astro
design/data/table/parts/TableBody.astro
design/data/table/parts/TableFoot.astro
design/data/table/parts/TableRow.astro
design/data/table/parts/TableCell.astro
design/data/list/list.tokens.ts
design/data/list/list.props.ts
design/data/list/list.hook.ts
design/data/list/list.css
design/data/list/List.astro
design/data/list/list.client.ts
design/shared/components/skeleton/skeleton.tokens.ts
design/shared/components/skeleton/skeleton.props.ts
design/shared/components/skeleton/skeleton.hook.ts
design/shared/components/skeleton/skeleton.css
design/shared/components/skeleton/Skeleton.astro
design/shared/primitives.definitions.ts
plugins/tokens.ts
docs/data-category.mdx
docs/table.mdx
ai/agent_decision_log.md  ← this file
```

### Updated files
```
design/shared/base.props.ts     bg narrowed to ColorRole; loading added
design/shared/base.hook.ts      resolveColorRole added; data-loading in useBaseCompose
design/data/data.props.ts       loading removed (inherited from base)
design/data/data.hook.ts        style consumed; manual data-loading removed
design/data/table/table.hook.ts wrapper div pattern
design/data/table/Table.astro   sort buttons; selectable name/value; isSelectable fix
design/data/table/table.client.ts  dataset.selected; correct selectors; sort handler
design/data/list/List.astro     selection vs to-do checkbox distinction
design/data/list/list.client.ts dataset.selected persistence
```

-----------------------------------------------

## 2026/06/20 - Antigravity session

See:

- [Session Summary](./antigravity_session_summary.md/620-622_nav_components_and_docs.md)

### New files
```
src/design/nav/nav.tokens.ts
src/design/nav/nav.props.ts
src/design/nav/nav.hook.ts
src/design/nav/nav.css
src/design/nav/components/menu/*
src/design/nav/components/pagination/*
src/design/nav/components/tabs/*
src/design/nav/components/breadcrumbs/*
src/design/nav/components/stepper/*
src/design/nav/components/navbar/*
src/content/docs/nav/menu.mdx
src/content/docs/nav/pagination.mdx
src/content/docs/nav/tabs.mdx
src/content/docs/nav/breadcrumbs.mdx
src/content/docs/nav/stepper.mdx
src/content/docs/nav/navbar.mdx
ai/antigravity_session_summary.md/620-622_nav_components_and_docs.md
```

### Updated files
```
src/layouts/docs/DocsLayout.astro                    Added ThemeToggle and Breadcrumbs
src/layouts/docs/docs-layout.css                     Styling updates
src/design/feedback/components/spinner/spinner.*     Added color="inherit" support
src/content/docs/feedback/*.mdx                      Wrapped live previews
src/content/docs/forms/*.mdx                         Wrapped live previews
```

------------------------------------------------

2026/06/17 - 15:00:00 - Antigravity

Added Feature XYZ
  - Reason for adding it
  - Problems solved
  - Tradeoffs made
  - Alternatives considered
  - Files affected: 
    - [filepath1]
    - [filepath2]

-----------------------------------------------------

2026/06/17 - 11:00:00 - Claude

Refactored Code ABC
  - Reason for refactoring
  - Problems solved
  - Alternatives considered
  - Files affected: 
    - [filepath1]
    - [filepath2]

----------------------------------------------------

2026/06/17 - 09:00:00 - Bob

Removed Feature 123
  - Reason for removing it
  - Problems solved
  - Tradeoffs made
  - Alternatives considered
  - Files affected: 
    - [filepath1]
    - [filepath2]

---------------------------------------------------