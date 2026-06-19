# CSS Authoring Rules

Rules for writing CSS inside category and component directories.
Where the word **prefer** is used, a deliberate exception is acceptable —
but it should be a decision, not an accident.

---

## Where values come from

Component CSS reads `--{category}--{key}` channels written inline
by the hook. It never reaches past them into the token layer directly.

```
vars.css          --size-03          raw scale
tokens.css        --radius--md       semantic name, picks from scale
hook writes       --control--radius  channel, resolves to semantic token
component CSS     var(--control--radius)   ← only this
```

**Prefer** referencing channels (`--control--radius`) over token names
(`--radius--md`) in component CSS. If a component reads a token name
directly it bypasses the hook, meaning the value can't be overridden
per-instance.

One-off values that have no hook channel (glass highlight edge, pseudo
content geometry, hardcoded `0`, `100%`, `currentColor`) are the
exception — write them as literals or with `--local--*` if they're
truly instance-specific.

**Never** reference raw scale values (`--size-03`, `--bg--2`, `--cyan-14`)
in component CSS. If you're reaching for a raw value, it means either
a channel is missing from the hook or a token is missing from tokens.css.

---

## What sets multiple properties at once

These are the "compound" props — one developer decision, multiple CSS
properties changing. Know these before building a component; they're the
most common source of missing rules or conflicting overrides.

### Layer (elevation)

The single biggest multi-property trigger. A component's layer
determines its background, inherited text color, default border
strength, and default shadow — all at once. Components don't usually
choose their own background; their layer assigns it.

See the **Layer system** section below.

### Variant

Variant controls visual treatment — how an accent color is applied.
A single `variant` prop changes background, border, and text color
simultaneously. The color role provides the hue; the variant provides
the application pattern.

| Variant | Background | Border | Text |
|---|---|---|---|
| solid | `--{role}--base` | none | `--text--on-color` |
| soft | `--{role}--subtle` | none | `--{role}--text` |
| outlined | transparent | `--{role}--border` | `--{role}--text` |
| ghost | transparent | none | `--{role}--text` |
| dashed | transparent | `--{role}--border` (dashed) | `--{role}--text` |

### Color role

When `color="primary"` is set, it doesn't change one property — it
sets the hue that feeds into all variant rules above. The hook writes
`--control--color-base`, `--control--color-subtle`, etc. so variant
CSS can reference the right step without knowing which role was picked.

Prefer writing variant CSS against `--{category}--color-{step}` channels
rather than hardcoding which palette (`--cyan-15`, `--primary--base`) to use.

### Size

On interactive controls (Button, Input, Chip, etc.), `size` typically
sets all of these together: `font-size`, `padding-block`, `padding-inline`,
`min-height`, and `gap`. Prefer writing those five in the same rule block
so they're obviously coupled.

### State

States that set multiple properties:

- `disabled` → `opacity`, `pointer-events`, `cursor`
- `selected` → `background-color`, `border-color`, (sometimes) `color`
- `loading` → `pointer-events`, `cursor`, animation on spinner slot
- `interactive` → `cursor`, `transition`, `:hover` transform, `:active` scale
- `glass` (variant) → `background`, `backdrop-filter`, `border-color`,
  `box-shadow`, and a `::before` highlight edge — five properties, all coupled

When a state changes more than two properties, group the rules under
a single selector comment so the coupling is visible.

---

## The layer system

Layers assign elevation context. Each layer maps to a background token,
a border strength, and a shadow scale. Text color is inherited from
the nearest layer ancestor unless overridden.

Components are assigned to a layer by their nature, not by a prop
(though `variant` can shift between adjacent layers).

```
Layer 0  html, body
         bg: --bg--0
         text: --text--primary

Layer 1  Screen, Section, Container, AppHeader, Footer, Navbar
         bg: --bg--1
         border: --border--subtle (or none)
         shadow: none
         z: document flow

Layer 2  Paper, Panel, Well
         bg: --bg--2
         border: --border--subtle → --border--default
         shadow: --shadow--xs → --shadow--sm
         z: --z--base → --z--raised

Layer 3  Card, Tile
         bg: --bg--3
         border: --border--default
         shadow: --shadow--sm → --shadow--md
         z: --z--raised

Layer 4  Backdrop, Sheet, Drawer, Dropdown, Popover, Tooltip
         bg: --bg--4 (or glass variant)
         border: --border--default → --border--strong
         shadow: --shadow--md → --shadow--lg
         z: --z--dropdown → --z--overlay

Layer 5  Modal, AlertDialog, Banner, ContextMenu, CommandPalette
         bg: --bg--3 → --bg--4
         border: --border--strong
         shadow: --shadow--xl
         z: --z--modal → --z--toast
```

**Prefer** assigning a component to one layer and keeping it there.
When a component needs to feel more or less elevated (a Card in a
selected state, a Paper used as a sticky bar), prefer shifting via
`box-shadow` and `border-color` rather than changing the background
layer token.

---

## Writing variant CSS

Variant rules respond to modifier classes emitted by the hook
(`surface--glass`, `control--solid`, etc.). Each modifier sets the
full set of properties it owns — no partial overrides split across
other rules.

```css
/* All properties a variant controls, together in one block */
.control--solid {
  background-color: var(--control--color-base);
  border: none;
  color: var(--text--on-color);
}

.control--outlined {
  background-color: transparent;
  border: var(--border--thin) solid var(--control--color-border);
  color: var(--control--color-text);
}

.control--soft {
  background-color: var(--control--color-subtle);
  border: none;
  color: var(--control--color-text);
}
```

Avoid splitting variant properties across separate selectors unless
one of them is state-dependent (e.g. hover changes only `background`
within the solid variant — that belongs in a compound selector, not
a separate block).

---

## Writing state CSS

Prefer CSS pseudo-classes for states the browser tracks natively:

```css
.button:hover   { … }
.button:active  { … }
.button:focus-visible { … }
```

Use `data-*` attribute selectors for states managed by JS:

```css
.card[data-selected="true"]  { … }
.card[data-disabled="true"]  { … }
.card[data-loading="true"]   { … }
```

Use `.component--modifier` classes for persistent boolean flags
emitted by the hook (not toggled at runtime):

```css
.button--full-width  { width: 100%; }
.button--icon-only   { padding-inline: var(--control--size); aspect-ratio: 1; }
```

**Prefer** `data-*` over added/removed classes for runtime state.
Classes from the hook are static per render; JS-toggled `data-*`
attributes are dynamic — the distinction makes each easier to trace.

---

## Writing interactive CSS

Group the base state, hover, active, and focus rules together for any
interactive component. Keep transform and color changes separate so
reduced-motion overrides are easy to write:

```css
.card[data-interactive] {
  cursor: pointer;
  transition:
    transform var(--transition--fast),
    background-color var(--transition--fast),
    box-shadow var(--transition--base);
}

.card[data-interactive]:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow--md);
}

.card[data-interactive]:active {
  transform: translateY(0) scale(0.99);
}

@media (prefers-reduced-motion: reduce) {
  .card[data-interactive] { transition: none; }
  .card[data-interactive]:hover { transform: none; }
}
```

---

## Glass surfaces

Glass is the most compound variant — it sets five coupled properties.
Keep them together and always include the `::before` highlight edge:

```css
.surface--glass {
  background: var(--bg--2-glass);
  backdrop-filter: blur(var(--surface--blur));
  -webkit-backdrop-filter: blur(var(--surface--blur));
  border-color: var(--border--subtle);
  box-shadow: var(--glass--shadow);
}

.surface--glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    var(--glass--highlight) 0%,
    transparent 14%
  );
}
```

`--surface--blur` is written by the hook from the component's `blur`
prop. The glass colors (`--bg--2-glass`, `--glass--shadow`,
`--glass--highlight`) come from tokens-color.css and respond to
`[data-theme]` automatically.

---

## Selector rules

- Prefer class selectors (`.button`, `.card--selected`)
- Prefer `data-*` attribute selectors for JS-driven state
- Avoid nesting beyond two levels
- Avoid `!important` — if specificity is a problem, the selector
  structure needs fixing
- Never use inline style in CSS files — inline styles are the hook's job
- The component's root selector should be `.{component}` or
  `[data-visual="{component}"]`, both present, no other root

```css
/* Correct */
.button,
[data-visual="button"] { … }

/* Avoid — implicit coupling to DOM structure */
.card > div > p { … }
```

---

## Summary: what to reach for

| Need | Reach for |
|---|---|
| Elevation / bg / shadow | Layer token via `--bg--N`, `--shadow--*` |
| Accent color | `--{role}--{step}` from tokens-color.css via hook channel |
| Spacing | `--space-in--*` (interior) or `--space-out--*` (exterior) |
| Text size (body/display) | `--fs--*` via hook channel |
| Text size (UI labels) | `--label--*` via hook channel |
| Border radius | `--radius--*` via hook channel |
| Animation | `--transition--*`, `--duration--*`, `--ease--*` |
| Z-index | `--z--*` named layer |
| Interactive state | pseudo-class or `data-*` attribute selector |
| Boolean modifier | `.component--modifier` class from hook |
| Variant (multi-property) | `.component--{variant}` class from hook |