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

On interactive controls, `size` typically affects multiple spatial
properties at once — font size, padding, and minimum height being the
common ones. Exactly which properties change and how many channels are
written depends on the component.

A Button might fan size out into three component-scoped channels:

```
size="sm" → --button--fs:      var(--label--sm)
            --button--padding: var(--space-in--xs)
            --button--height:  var(--size-06)
```

A simpler component might handle it through a single channel or a
modifier class. The point is that size rarely maps one-to-one with
a single CSS property — know which properties it's driving before
writing the CSS.

→ See **patterns.md** for an example implementation using a lookup table.

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