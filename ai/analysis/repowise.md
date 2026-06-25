How Components Consume Tokens

There are four distinct mechanisms, layered from most general to most specific.

---
1. resolveTokens — the primary engine (src/design/shared/tokens.ts)

The standard path for all category and component hooks.

Data flow:
primitives.tokens.ts         authors scales (value → CSS var ref maps)
  ↓
<category>.tokens.ts         assembles a TokenSpec with defineTokens / composeTokens
  ↓
<component>.tokens.ts        re-exports or narrows with pickValues
  ↓
<hook>.ts                    calls resolveTokens(spec, selectedProps, prefix)
  ↓
component CSS                reads --{prefix}--{key} channels

What resolveTokens produces per dimension:

┌──────────────────────────────────────────┬──────────────────────────────────────────────────────────────┐
│                Condition                 │                            Output                            │
├──────────────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ dim.key set + resolved value is non-null │ Writes --{scope}--{key}: {value} into the style[] array      │
├──────────────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ dim.modifier: true                       │ Writes {scope}--{propValue} into the classes[] array         │
├──────────────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ dim.modifier: "foo"                      │ Writes {scope}--foo-{propValue} into classes[]               │
├──────────────────────────────────────────┼──────────────────────────────────────────────────────────────┤
│ Value is null in the scale               │ Class only — no CSS var emitted (class-only variant pattern) │
└──────────────────────────────────────────┴──────────────────────────────────────────────────────────────┘

scope defaults to the prefix argument but can be overridden per-dimension (cross-scope tokens).

---
2. resolveColorChannels — color role expansion (src/design/shared/primitives.tokens.ts)

A separate, specialized resolver for color that doesn't go through resolveTokens. Used when a component accepts a color prop that maps to a full palette role.

// nav.hook.ts — called alongside resolveTokens
const colorStyle = resolveColorChannels(color, "nav");
// emits: --nav--color-50: ..., --nav--color-100: ..., ..., --nav--color-900: ...

It expands an entire COLOR_STEPS object into individual channel declarations — so CSS can reference --nav--color-{step} at any shade without the hook knowing which steps are used.

---
3. Component-specific manual resolvers — hardcoded value maps

For dimensions where the CSS values aren't expressible as simple var references (e.g. multi-property size bundles), components write their own resolver:

// button.tokens.ts
export function resolveButtonSize(size: ButtonSize): string[] {
  const { p, pi, fs, h } = BUTTON_SIZE_MAP[size];
  return [
    `--button--p: ${p}`,
    `--button--pi: ${pi}`,
    `--button--fs: ${fs}`,
    `--button--h: ${h}`,
  ];
}

Returns string[] directly — merged into the style array by the hook, same as resolveTokens output.

---
4. Inline style strings in hooks — ad hoc channels

For one-off values not expressible via a spec (e.g. a dynamic clamp count), hooks write channel strings directly:

// typography.hook.ts
style: [
  ...tokenStyle,
  clamp != null && `--typography--clamp: ${clamp}`,
  ...(bg ? resolveColorRole(bg, "layout--bg") : []),
]

---
Assembly: useBaseCompose (src/design/shared/base.hook.ts)

All four outputs funnel into useBaseCompose, which merges everything into the final HTML attributes:

useBaseCompose({
  className: ["typography", ...tokenClasses, maybeModifier],
  style:     [...tokenStyle, inlineChannel],
  attrs:     { "data-visual": v, "aria-disabled": ..., ... },
}, base)

- composeClass(...parts) → joins class tokens into a class="" string
- composeStyle(...parts) → joins style tokens with "; " into a style="" string
- attrs carries data-visual, data-testid, data-loading, data-disabled, data-motion, etc.
- rest is passed-through HTML attributes (everything not consumed as a design prop)
- spacing is extracted and returned separately for the hook to pass down

---
Token Spec Construction (tokens.ts)

┌────────────────────────────┬────────────────────────────────────────────────────────────────────────────┐
│          Function          │                                  Purpose                                   │
├────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ scale(values)              │ Identity — authors a ScaleValues map (prop value → CSS var ref or null)    │
├────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ dimension(key, values,     │ Binds a scale to a CSS channel key; opts add modifier and scope            │
│ opts)                      │                                                                            │
├────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ defineTokens(spec)         │ Identity for type inference — names a TokenSpec                            │
├────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ composeTokens(base, ext)   │ Spreads two specs together (category base + component overrides)           │
├────────────────────────────┼────────────────────────────────────────────────────────────────────────────┤
│ pickValues(dim, keys)      │ Narrows a dimension to a subset of valid values (component restricts       │
│                            │ category's full range)                                                     │
└────────────────────────────┴────────────────────────────────────────────────────────────────────────────┘
│ pickValues(dim, keys)      │ Narrows a dimension to a subset of valid values (component restricts       │
│                            │ category's full range)                                                     │
└────────────────────────────┴────────────────────────────────────────────────────────────────────────────┘

---
Summary: The Two Output Channels

Every token dimension produces output in one or both of two channels that CSS reads:

┌───────────────────┬──────────────────────────────────────────┬─────────────────────────────────────────┐
│      Channel      │                Mechanism                 │            CSS reads it via             │
├───────────────────┼──────────────────────────────────────────┼─────────────────────────────────────────┤
│ CSS custom        │ style="--prefix--key: value" on the      │ var(--prefix--key) in the stylesheet    │
│ property          │ element                                  │                                         │
├───────────────────┼──────────────────────────────────────────┼─────────────────────────────────────────┤
│ Modifier class    │ class="prefix--variant" on the element   │ .prefix--variant { ... } in the         │
│                   │                                          │ stylesheet                              │
└───────────────────┴──────────────────────────────────────────┴─────────────────────────────────────────┘

The same dimension can write both (e.g. a size that sets a var and adds a class for structural layout differences).

✻ Churned for 1m 1s

---

## Mechanism Examples

### 1. resolveTokens — 5 examples

The standard call is `resolveTokens(SPEC, selectedProps, "prefix")`. It returns `{ style, classes }` which the hook merges into `useBaseCompose`.

| File | Call | What it does |
|------|------|--------------|
| [icon.hook.ts:15](src/design/assets/components/icon/icon.hook.ts#L15) | `resolveTokens(ICON_TOKENS, { size }, "icon")` | Simplest form — one prop maps to `--icon--size` CSS var |
| [grid.hook.ts:16](src/design/layout/components/grid/grid.hook.ts#L16) | `resolveTokens(GRID_TOKENS, { columns }, "grid")` | `columns` prop drives `--grid--columns` for the CSS `grid-template-columns` rule |
| [spinner.hook.ts:50](src/design/feedback/components/spinner/spinner.hook.ts#L50) | `resolveTokens(SPINNER_TOKENS, { speed, direction }, "spinner")` | Classes only — both dimensions use `modifier: true`, so no CSS vars are emitted; output is `.spinner--slow`, `.spinner--counterclockwise`, etc. |
| [list.hook.ts:49](src/design/data/components/list/list.hook.ts#L49) | `resolveTokens(LIST_TOKENS, { orientation }, "list")` | `orientation` produces a modifier class (`.list--horizontal`) used for flex direction in CSS |
| [nav.hook.ts:48](src/design/nav/nav.hook.ts#L48) | `resolveTokens(NAV_TOKENS, { size, variant, color, radius }, "nav")` | Multi-prop category call — resolves four dimensions at once; `color` dimension writes a CSS var while `variant` writes a modifier class |

---

### 2. resolveColorChannels — 5 examples

Called alongside `resolveTokens`. Takes a color role name and a CSS prefix, and expands an entire palette (all `COLOR_STEPS`) into individual `--prefix--color-{step}` channel declarations.

| File | Call | Scope |
|------|------|-------|
| [nav.hook.ts:48](src/design/nav/nav.hook.ts#L48) | `resolveColorChannels(color, "nav")` | Writes `--nav--color-50` … `--nav--color-900` so nav CSS can use any shade |
| [trigger.hook.ts:37](src/design/triggers/trigger.hook.ts#L37) | `resolveColorChannels(color, "trigger")` | Same pattern for all trigger-category components (Button, Link, etc.) |
| [audio.hook.ts:38](src/design/assets/components/audio/audio.hook.ts#L38) | `resolveColorChannels(color, "audio")` | Asset component — shows the pattern extends beyond layout/nav |
| [feedback.hook.ts:123](src/design/feedback/feedback.hook.ts#L123) | `resolveColorChannels(color, "feedback")` | Category-level hook; Alert, Toast, and Badge all flow through this |
| [surface.hook.ts:85](src/design/surfaces/surface.hook.ts#L85) | `resolveColorRole(color, "surface--color")` | Variant of the pattern — emits named semantic channels (`--surface--color--subtle`, `--surface--color--border`, etc.) rather than numeric steps; used when CSS needs role names not raw shades |

---

### 3. Component-specific manual resolvers — 5 examples

Used when a dimension bundles multiple CSS properties that can't map cleanly to a single CSS var ref. Each returns `string[]` that is spread directly into the style array.

| File | Resolver | What it emits |
|------|----------|---------------|
| [button.tokens.ts:26](src/design/triggers/components/button/button.tokens.ts#L26) | `resolveButtonSize(size)` | Looks up `BUTTON_SIZE_MAP[size]` and returns 4 vars: `--button--p`, `--button--pi`, `--button--fs`, `--button--h` — all must change together |
| [alert.hook.ts:24](src/design/feedback/components/alert/alert.hook.ts#L24) | `ALERT_SIZE_MAP[size]` lookup | Inline map → emits `--alert--font-size` + `--alert--padding` as two string entries |
| [toast.hook.ts:25](src/design/feedback/components/toast/toast.hook.ts#L25) | `TOAST_SIZE_MAP[size]` lookup | Same pattern as Alert — font-size and padding bundled, fed into the style array |
| [spacing.props.ts:46](src/design/shared/spacing.props.ts#L46) | `resolveSpacingStyles(props, prefix)` | Iterates 14 shorthand keys (`p`, `m`, `pt`, `mx`, …) and emits `--{prefix}--{key}: {value}` for each that is set; used by layout.hook, alert.hook, toast.hook |
| [progress.hook.ts](src/design/feedback/components/progress/progress.hook.ts) | `RING_CIRCUMFERENCE` constant | Geometric resolver — computes SVG ring stroke math (`2π × RING_RADIUS`) and produces `strokeDasharray` / `strokeDashoffset` attrs rather than CSS vars; same idea (hardcoded value map) applied to SVG attributes instead of style |

---

### 4. Inline style strings — 5 examples

One-off CSS channel declarations written directly into the `style: [...]` array for values that don't belong in a spec — dynamic runtime values, escape hatches, or cross-scope references.

| File | Inline string | Why not a spec |
|------|---------------|----------------|
| [typography.hook.ts:75](src/design/typography/typography.hook.ts#L75) | `` clamp != null && `--typography--clamp: ${clamp}` `` | `clamp` is a dynamic integer from props — no finite scale to define |
| [separator.hook.ts:43](src/design/layout/components/separator/separator.hook.ts#L43) | `` `--separator--color: var(--border--${strength})` `` | Cross-scope token reference — the value is itself a `var()` pointing into the border token namespace |
| [feedback.hook.ts:141](src/design/feedback/feedback.hook.ts#L141) | `` bg && `--local--bg: ${bg}` `` | Escape-hatch background; `--local--` prefix signals it's intentionally outside the component's own token scope |
| [textarea.hook.ts:51](src/design/forms/components/textarea/textarea.hook.ts#L51) | `` `--textarea--resize: ${resize}` `` | Avoids calling `resolveTokens` twice — `TEXTAREA_TOKENS` is a superset of `FORM_TOKENS`, so `useForm` handles the rest; `resize` is appended as a single extra var |
| [surface.hook.ts:109](src/design/surfaces/surface.hook.ts#L109) | `colorBgOverride`, `colorBorderOverride`, `shadowOverride`, `blurVar` | Computed conditionally from color + variant logic; the values depend on multiple props interacting, so they can't be expressed as static scale entries |