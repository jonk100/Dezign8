# Agent Decision Log

---

## Data category structure
**Decision:** Core set only — Table, List, Feed, Stat, Metric. Rest deferred.

**Deferred:** bar-chart, line-chart, pie-chart, sparkline, description-list,
key-value-list, timeline. See `data/_roadmap.md` for full list and reasons.

**Rationale:** The `data=` prop is the organizing principle — components belong
here if their primary job is rendering a collection of records. Charts need a
charting library decision first. Description-list and key-value-list are covered
by List for now.

---

## Table: dual-mode support
**Decision:** Table supports both data-driven and compound (parts) modes.

- `<Table data={rows} columns={cols} />` — common case, Table renders internally
- `<TableHead>`, `<TableBody>`, `<TableFoot>`, `<TableRow>`, `<TableCell>` — parts
  live in `table/parts/`, no tokens of their own, inherit `.table` CSS context

**Rationale:** Table extension felt silly but compound table parts do not —
they're needed for custom layouts and complex data scenarios.

---

## Items are sub-components, not standalone
**Decision:** Event, KeyValue, ResultItem are parts of their parent list
components, not top-level data category entries.

- `feed/parts/FeedItem.astro`
- `timeline/parts/TimelineEvent.astro`
- `key-value-list/parts/KeyValueRow.astro`

**Rationale:** These components don't take a `data=` array — they receive a
single record. They're item templates the list renders for each record, not
independently useful components. Stat and Metric are the exception: they're
standalone (dashboard use case, not inside a list parent).

---

## Bento removed from data category
**Decision:** BentoGrid and BentoCell removed from catalog entirely for now.

- BentoGrid → layout category (CSS Grid variant) if needed later
- BentoCell → surfaces category (card variant) if needed later

**Rationale:** Neither takes a meaningful `data=` prop. Grid + Card covers the
use case. YAGNI.

---

## DataProps structure
**Decision:** 13 shared props at the data category level.

Color channels: `color`, `bg`, `highlight` — all `ColorRole`
Container: `variant` (plain | outlined | soft | elevated), `size` (compact | comfortable | spacious)
Metadata: `caption`
State: `loading`, `empty` (boolean | string)
Visual: `striped`, `bordered`
Behavior: `interactive`, `selectable`, `scrollable`

**Rationale:** Unlike forms/triggers where the shared mechanism is a CSS class
with one size channel, data components share color role channels. The `color`
prop means borders on Table, separators on List, text accent on Stat — same
prop, different CSS application per component. That's what justifies category-
level shared props despite the heterogeneous component set.

---

## COLOR_ROLE updates
**Decision:** Added `tertiary`, kept `info` as alias, removed nothing.

```ts
export const COLOR_ROLE = scale({
  primary:   null,
  secondary: null,
  tertiary:  null,  // added — was going to be "info" but tertiary was already planned
  accent:    null,
  success:   null,
  danger:    null,
  warning:   null,
  info:      null,  // kept as alias — --info--* CSS vars untouched
  neutral:   null,
});
```

**Pending:** All roles should eventually have the full shade family:
subtle, muted, base, vivid, deep, border, text. Currently success/danger/warning
are missing vivid and deep. These are not "semantic" roles — they're just colors
(green, red, yellow) and need hover/pressed states same as primary.

---

## resolveColorRole utility
**Decision:** Added to `shared/base.hook.ts`.

Exposes the full shade family as CSS custom property channels. Component CSS
picks whichever shade is semantically correct — the hook doesn't hardcode a shade.

```ts
resolveColorRole("primary", "data--color")
// → --data--color--subtle: var(--primary--subtle)
// → --data--color--muted:  var(--primary--muted)
// → --data--color--base:   var(--primary--base)
// → --data--color--vivid:  var(--primary--vivid)
// → --data--color--deep:   var(--primary--deep)
// → --data--color--border: var(--primary--border)
// → --data--color--text:   var(--primary--text)
```

Roles without vivid/deep defined (info, success, danger, warning currently)
produce empty var() references — CSS ignores them safely.

---

## bg in BaseComponentProps narrowed to ColorRole
**Decision:** `bg?: string` → `bg?: ColorRole` in `base.props.ts`.

**Rationale:** Raw string allowed `bg="primary"` which produced `--layout--bg: primary`
— invalid CSS, silently ignored. ColorRole enforces design system values.
Arbitrary backgrounds should use the `class` prop or inline styles.

**Hooks updated:** layout, typography, heading — all now use `resolveColorRole`
instead of string interpolation.

---

## animation in BaseComponentProps — ponytail comment
**Decision:** Left as `string` for now with a ponytail comment.

```ts
// ponytail: string for now; narrow to Animation scale when Motion category is built
animation?: string;
```

**Rationale:** No animation scale defined yet. Motion category is deferred.
Narrowing without a defined scale would be premature.

---

## data.tokens.ts — color/bg/highlight resolved outside resolveTokens
**Decision:** color, bg, highlight are in DATA_TOKENS for type derivation only.
Their COLOR_ROLE values are null so resolveTokens skips them. useData calls
resolveColorRole directly for these three.

variant and size are resolved normally via resolveTokens.

---

## Single-source token registry — Vite plugin

**Decision:** `primitives.definitions.ts` is the single source of truth for all
token values. `plugins/tokens.ts` generates `src/styles/tokens.generated.css`
from it at dev start and on hot save. The four hand-written CSS files
(`vars.css`, `color-vars.css`, `tokens.css`, `tokens-color.css`) are replaced
by the generated file.

**Structure of definitions file — three TOKEN_BLOCKS:**
1. `:root` — raw primitive scales (size, color palette, misc) + semantic
   non-color tokens (space, radius, typography, motion, z-index, etc.)
2. `:root, [data-theme="light"]` — light theme semantic color tokens
3. `[data-theme="dark"]` — dark theme semantic color tokens

**Why `vm.runInContext` with `var`:**
- `import()` intercepted by Vite's module runner → fails
- `transformWithEsbuild` from vite → esbuild not in scope at plugin runtime
- `new Function()` → `const` declarations are block-scoped and invisible
  after execution; Vite swallows the resulting error silently
- `vm.runInContext` with `var` → `var` declarations become properties on the
  context object, readable as `context.TOKEN_BLOCKS` after the script runs

**TypeScript stripping in `stripTS`:**
Handles the four TS constructs used in the definitions file only:
  - `as const` → removed
  - `satisfies Type` → removed (regex uses `[^\n]+` not `[^;,\n=]+` to
    correctly handle generics like `Record<string, string>` with commas)
  - `: TypeAnnotation` before `=` → removed
  - `export interface` blocks → removed
  - `export const` / `const` → `var`

**Gitignore:** `src/styles/tokens.generated.css` — build artifact.

**Migration path:** port values from the four CSS files into the appropriate
layer objects in `primitives.definitions.ts`, swap the four `@import` lines
in `global.css` for one `@import "tokens.generated.css"`, delete the originals.

---

## List component

**Decision:** `ListItem` shape is list-specific, not a shared base type.
Sub-families (Timeline, Feed, KeyValueList) define their own item shapes.
The shared contract is CSS class naming convention (`.{component}__item`,
`.{component}__item--disabled`, `.{component}__item--highlighted`) and the
`--data--color--*` / `--data--bg--*` channel system — not a TypeScript base type.

**`CheckState` reused from forms category** — `ListItem.checkState` imports
`CheckState` directly from `~/forms/checkbox/checkbox.tokens`. Cross-category
import, documented as intentional.

**Two checkbox patterns in List — distinct:**
- `selectable` prop → selection checkboxes for ALL items, `data-selection-cb`,
  `name="selected"`, `value={i}`. Bulk operation pattern.
- `item.checkState` → to-do/completion checkbox per item. Independent of
  selectable. No `data-selection-cb`.

**`orientation` token dimension** — `vertical` | `horizontal`. Class-only.
Horizontal orientation adds `flex-wrap: wrap` for chip/tag groups.

---

## Selection state — built-in persistence

**Decision:** Selection state is owned by the component, not the consumer.

Two mechanisms work together:
1. `element.dataset.selected` — JSON array of selected indices, written after
   every change. Readable anytime without a listener:
   `JSON.parse(el.dataset.selected ?? "[]")`
2. `{table|list}:selectionchange` event — dispatched on the root element with
   `{ selected, all, none }` for reactive consumers.

**Native form participation** — selection checkboxes render with
`name="selected"` and `value={index}`. Form submission includes
`selected=0&selected=2` with no JS required.

**Initialised on mount** — `dataset.selected = "[]"` is set immediately so
the value is always readable, even before any interaction.

---

## data.utils.ts

**Decision:** Shared selection utilities extracted to `data/data.utils.ts`.
Named `.utils` not `.client` because it exports pure functions and types with
no side effects on import. Client files import from it.

Exports:
- `SelectionDetail` interface — shared event payload type
- `persistAndDispatch(element, selected, total, eventName)` — writes
  `dataset.selected` and dispatches the namespaced custom event

`table.client.ts` and `list.client.ts` import from it. Future selectable
data components (Feed, Timeline) will do the same.

---

## Checkbox in Table and List

**Decision:** Table and List use `<Checkbox>` for selection checkboxes instead
of bare `<input type="checkbox">`. Consistent indicator styling, indeterminate
handling, and a single CSS file to maintain.

Identified by `data-selection-cb` attribute. Client JS queries
`[data-selection-cb] input` to find the native input inside the Checkbox.

---

## Skeleton — moved to shared/components/skeleton/

**Decision:** Skeleton is a shared primitive, not a data or feedback component.
Lives at `design/shared/components/skeleton/` alongside other cross-category
primitives. `shared/components/` established as the home for components used
internally by multiple categories.

`Icon` is the next likely candidate for `shared/components/`.

**Skeleton variants:** text, heading, avatar, button, image, block.
`lines` prop on text variant renders a multi-line block with last line at 65%
width — realistic paragraph placeholder pattern.

**Animation:** shimmer (gradient sweep) is the single standard.
Table's existing shimmer stays. List's pulse animation to be replaced with
`<Skeleton>` on the cleanup pass.

---

## `loading` moved to BaseComponentProps

**Decision:** `loading?: boolean` moved from `DataProps` to `BaseComponentProps`.
Every component in the system can now accept a `loading` prop.

**`useBaseCompose` emits `data-loading="true"` universally** — CSS anywhere
can target `[data-loading]` without extra wiring in each hook.

**Category hooks still destructure `loading`** to prevent it leaking onto the
DOM as the HTML attribute `loading="true"`. They no longer manually emit
`data-loading` — `useBaseCompose` handles it.

**Component-owned loading model:**
- Data components (`loading` + skeleton rows/items): just works
- Other components (Badge, Avatar, Button): implement their own skeleton shape
- Consumer can propagate `loading` down to child components:
  `<TableCell><Badge loading={isLoading} /></TableCell>`
- `loading` slot available on data components for custom override (rare)

`empty` stays in `DataProps` — empty state is data-component-specific.
A Button doesn't have an empty state.

---

## Files created or significantly updated this conversation

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