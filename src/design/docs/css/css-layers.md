# CSS Authoring Rules — Layers

→ See **css-overview.md** for orientation.

---

## What a layer is

A layer assigns elevation context. It sets a component's background,
default border strength, default shadow, and z-index range — all at once.

Components don't usually pick their own background color through a
prop. Their layer assigns it. This is what keeps the system visually
consistent: a Card always sits at Layer 3, so it always has `--bg--3`
background and `--shadow--sm` → `--shadow--md` range, regardless of
which category it comes from.

---

## The layer table

```
Layer 0   html, body
          bg:     --bg--0
          text:   --text--primary
          border: none
          shadow: none
          z:      document flow

Layer 1   Screen, Section, Container, AppHeader, Footer, Navbar
          bg:     --bg--1
          border: --border--subtle or none
          shadow: none
          z:      --z--base → --z--sticky

Layer 2   Paper, Panel, Well
          bg:     --bg--2
          border: --border--subtle → --border--default
          shadow: --shadow--xs → --shadow--sm
          z:      --z--base → --z--raised

Layer 3   Card, Tile
          bg:     --bg--3
          border: --border--default
          shadow: --shadow--sm → --shadow--md
          z:      --z--raised

Layer 4   Backdrop, Sheet, Drawer, Dropdown, Popover, Tooltip
          bg:     --bg--4   (or glass variant)
          border: --border--default → --border--strong
          shadow: --shadow--md → --shadow--lg
          z:      --z--dropdown → --z--overlay

Layer 5   Modal, AlertDialog, Banner (overlay), ContextMenu, CommandPalette
          bg:     --bg--3 → --bg--4
          border: --border--strong
          shadow: --shadow--xl
          z:      --z--modal → --z--toast
```

---

## Applying layer styles

Prefer writing the layer background, border, and shadow as the
component's base CSS block — before any variant or state rules.

```css
/* Paper.css — Layer 2 component */
.paper,
[data-visual="paper"] {
  background-color: var(--bg--2);
  border: var(--border--thin) solid var(--border--subtle);
  box-shadow: var(--shadow--xs);
  border-radius: var(--surface--radius);  /* written by hook */
}
```

---

## Shifting within a layer

Prefer shifting elevation feel via `box-shadow` and `border-color`
rather than changing the background layer token. A Card in a
selected state looks more elevated through a stronger shadow,
not through jumping from `--bg--3` to `--bg--4`.

```css
/* Within layer, elevation shift via shadow */
.card[data-selected="true"] {
  box-shadow: var(--shadow--md);
  border-color: var(--card--color-border);
}

/* Avoid — jumping bg layers mid-component */
.card[data-selected="true"] {
  background-color: var(--bg--4);  /* ← breaks layer contract */
}
```

---

## Backdrop

Backdrop is not a layer — it's a scrim that sits between layers.
It has no background layer of its own. It exists to dim whatever
is behind a Modal or CommandPalette.

```css
.backdrop {
  position: fixed;
  inset: 0;
  background-color: var(--overlay--scrim);
  z-index: var(--z--overlay);
  backdrop-filter: blur(var(--blur--xs));
  -webkit-backdrop-filter: blur(var(--blur--xs));
}
```

---

## Banner

Banner has no fixed layer assignment. Its background depends on
context — a page-top announcement bar sits in Layer 1 space, an
overlay error banner sits in Layer 5. Prefer driving the background
through a `variant` or `intent` prop rather than hardcoding a layer
token. See **css-compound.md** for how variants set multiple properties.

---

## Glass surfaces

Glass is a variant on any layer, not a separate layer. A Layer 2
Paper can be glass; a Layer 4 Dropdown can be glass. The glass
tokens (`--bg--N-glass`) correspond to each layer's bg at reduced
opacity. See **css-patterns.md** for glass CSS implementation.