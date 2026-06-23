# CSS Authoring Rules — Compound Properties

→ See **css-overview.md** for orientation.

A compound prop is one developer decision that changes multiple
CSS properties at once. Know these before writing a component —
they're the most common source of missing rules or accidental
property conflicts.

---

## The compound props

### Layer

The biggest one. Assigns background, border, shadow, and z-index
range all at once. See **css-layers.md** for the full table.

```
layer → background-color + border-color + box-shadow + z-index
```

### Variant

Controls visual treatment — how a color role is applied.
Changes background, border, and text color simultaneously.
The color role provides the hue; the variant provides the pattern.

```
variant → background-color + border + color
```

See **color-css.md** for the full variant × step matrix.

### Color role

Sets the hue that feeds into all variant rules. Writes 7 channels
at once into the component's namespace.

```
color → --{cat}--color-subtle
        --{cat}--color-muted
        --{cat}--color-base
        --{cat}--color-vivid
        --{cat}--color-deep
        --{cat}--color-border
        --{cat}--color-text
```

### Size

On interactive controls (Button, Input, Chip, Select, etc.), size
sets the full spatial scale of the component in one shot.

```
size → font-size + padding-block + padding-inline + min-height + gap
```

**Two approaches:**

**Approach 1: Modifier classes per size tier** (Button, most controls)
```css
.control--sm {
  font-size:       var(--control--size);
  padding-block:   calc(var(--control--size) * 0.15);
  padding-inline:  calc(var(--control--size) * 0.4);
  min-height:      calc(var(--control--size) * 0.8);
  gap:             calc(var(--control--size) * 0.3);
}

.control--md {
  font-size:       var(--control--size);
  padding-block:   calc(var(--control--size) * 0.2);
  padding-inline:  calc(var(--control--size) * 0.5);
  min-height:      calc(var(--control--size) * 1);
  gap:             calc(var(--control--size) * 0.4);
}
```

Advantage: full per-tier control, stable across size tiers.
Use when each size tier needs custom proportions.

**Approach 2: Proportional `calc()` from a single channel** (Input, Select, forms)
```css
.form {
  /* --form--size is the base unit (2rem, 2.5rem, etc.) */
  min-block-size: var(--form--size);
  font-size:      calc(var(--form--size) * 0.35);
  padding-block:  calc(var(--form--size) * 0.15);
  padding-inline: calc(var(--form--size) * 0.4);
  gap:            calc(var(--form--size) * 0.3);
}
```

Advantage: proportional consistency across size tiers, simpler token spec
(one value instead of per-size-tier). Use when proportions should scale
with the size uniformly.

### Disabled

Three properties, always together.

```
disabled → opacity + pointer-events + cursor
```

```css
.control--disabled,
.control[data-disabled] {
  opacity: var(--opacity--disabled);
  pointer-events: none;
  cursor: not-allowed;
}
```

### Selected

Typically changes background and border. Sometimes text.
Always use `data-selected` for JS-managed selection.

```
selected → background-color + border-color (+ color sometimes)
```

### Loading

Cursor, pointer-events, and a visual indicator (usually a spinner
slot or shimmer). Prefer keeping it separate from disabled — a
loading element isn't disabled, it's busy.

```
loading → pointer-events + cursor + (spinner/animation)
```

### Interactive flag

Applied when a non-native element (a Card, a Tile) is made
keyboard-operable. Sets the full interaction contract.

```
interactive → cursor + transition + :hover transform + :active scale
```

```css
.card[data-interactive] {
  cursor: pointer;
  transition:
    transform var(--transition--fast),
    background-color var(--transition--fast),
    box-shadow var(--transition--base);
}
```

### Glass variant

The most compound single variant — five coupled properties plus
a pseudo-element. See **css-patterns.md** for full implementation.

```
glass → background + backdrop-filter + border-color + box-shadow + ::before
```

---

## When to group rules

When a prop or state changes more than two properties, keep all
of them in the same selector block with a comment marking the coupling.
Split rules are hard to audit and easy to get out of sync.

```css
/* ─── SIZE: md ───────────────────────────────────────────── */
/* All spatial properties change together. Edit as a unit.   */
.control--md {
  font-size:       var(--control--size);
  padding-block:   var(--control--size);
  padding-inline:  calc(var(--control--size) * 2);
  min-height:      calc(var(--control--size) * 3);
  gap:             calc(var(--control--size) * 0.5);
}
```

---

## What is NOT compound

These props map one-to-one and don't need special grouping:

| Prop | CSS property |
|---|---|
| `radius` | `border-radius` |
| `fullWidth` | `width: 100%` |
| `stack` | `flex-direction: column` |
| `balance` | `text-wrap: balance` |
| `italic` | `font-style: italic` |
| `truncate` | `overflow + text-overflow + white-space` (3 props but always identical) |
| `family` | `font-family` |
| `leading` | `line-height` |
| `tracking` | `letter-spacing` |