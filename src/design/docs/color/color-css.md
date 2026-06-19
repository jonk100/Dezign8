# Color System — CSS

→ See **color-overview.md** for orientation, **color-roles.md** for step definitions.

---

## How CSS reads color channels

The hook writes 7 channels per color prop. CSS reads whichever
steps a given variant or state needs. No color-mix math, no
palette references — channels only.

```css
/* CORRECT — reads hook-written channel */
.control--solid { background-color: var(--control--color-base); }

/* WRONG — bypasses the hook, hardcoded to one role */
.control--solid { background-color: var(--primary--base); }

/* WRONG — raw palette, completely bypasses semantic layer */
.control--solid { background-color: var(--cyan-16); }
```

---

## Variant rules

Each variant is a flat CSS block. All 5 variant rules together
cover every color role automatically — swap `color="secondary"`
and the same rules apply with different channel values.

```css
/* ─── SOLID ──────────────────────────────────────────────── */

.control--solid {
  background-color: var(--control--color-base);
  border: none;
  color: var(--text--on-color);
}

.control--solid:hover:not([data-disabled]) {
  background-color: var(--control--color-vivid);
}

.control--solid:active:not([data-disabled]) {
  background-color: var(--control--color-deep);
}

/* ─── SOFT ────────────────────────────────────────────────── */

.control--soft {
  background-color: var(--control--color-subtle);
  border: none;
  color: var(--control--color-text);
}

.control--soft:hover:not([data-disabled]) {
  background-color: var(--control--color-muted);
}

.control--soft:active:not([data-disabled]) {
  background-color: var(--control--color-subtle);
  color: var(--control--color-deep);
}

/* ─── OUTLINED ────────────────────────────────────────────── */

.control--outlined {
  background-color: transparent;
  border: var(--border--thin) solid var(--control--color-border);
  color: var(--control--color-text);
}

.control--outlined:hover:not([data-disabled]) {
  background-color: var(--control--color-subtle);
}

.control--outlined:active:not([data-disabled]) {
  border-color: var(--control--color-base);
}

/* ─── GHOST ───────────────────────────────────────────────── */

.control--ghost {
  background-color: transparent;
  border: none;
  color: var(--control--color-text);
}

.control--ghost:hover:not([data-disabled]) {
  background-color: var(--control--color-subtle);
}

.control--ghost:active:not([data-disabled]) {
  background-color: var(--control--color-muted);
}

/* ─── DASHED ──────────────────────────────────────────────── */

.control--dashed {
  background-color: transparent;
  border: var(--border--thin) dashed var(--control--color-border);
  color: var(--control--color-text);
}

.control--dashed:hover:not([data-disabled]) {
  background-color: var(--control--color-subtle);
}
```

---

## Step × variant × state matrix

Which channel each combination reads. Use this when writing a new
variant or debugging unexpected color output.

```
              subtle  muted   base    vivid   deep    border  text
              ──────  ─────   ────    ─────   ────    ──────  ────
solid  rest    ·       ·       bg      ·       ·       ·       *
solid  hover   ·       ·       ·       bg      ·       ·       *
solid  active  ·       ·       ·       ·       bg      ·       *

soft   rest    bg      ·       ·       ·       ·       ·       fg
soft   hover   ·       bg      ·       ·       ·       ·       fg
soft   active  bg      ·       ·       ·       fg      ·       ·

outl.  rest    ·       ·       ·       ·       ·       border  fg
outl.  hover   bg      ·       ·       ·       ·       border  fg
outl.  active  ·       ·       border  ·       ·       ·       fg

ghost  rest    ·       ·       ·       ·       ·       ·       fg
ghost  hover   bg      ·       ·       ·       ·       ·       fg
ghost  active  ·       bg      ·       ·       ·       ·       fg

dashed rest    ·       ·       ·       ·       ·       border  fg
dashed hover   bg      ·       ·       ·       ·       border  fg

* solid text always uses --text--on-color, not a role step
```

---

## Semantic states — no color prop

Some components express state visually without a `color` prop.
Form validation, progress indicators, status badges. These read
role tokens directly — no hook channels involved.

```css
/* Form input — error state */
.input[data-invalid] {
  border-color: var(--danger--border);
}

.input[data-invalid]:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--danger--base) 30%, transparent);
}

/* Inline error message */
.field__error {
  color: var(--danger--text);
}

/* Success state */
.input[data-valid] {
  border-color: var(--success--border);
}

/* Warning banner — no color prop on Banner */
.banner--warning {
  background-color: var(--warning--subtle);
  border-color: var(--warning--border);
  color: var(--warning--text);
}

/* Progress bar — filled portion */
.progress__fill {
  background-color: var(--success--base);
}
```

---

## Focus ring with role color

The global focus ring uses primary color. Interactive components
that have a `color` prop should override the focus ring to match:

```css
/* Global default (global.css) */
:focus-visible {
  box-shadow: var(--focus-ring);  /* defined in tokens-color.css, always primary */
}

/* Role-aware override in control.css */
.control:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px color-mix(
    in oklch,
    var(--control--color-base) 35%,
    transparent
  );
}
```

---

## Selected state

Selection uses the color role if the component has one. If not,
falls back to the primary role tokens directly.

```css
/* Component with color prop — uses its own channels */
.card[data-selected="true"] {
  border-color: var(--card--color-border);
  background-color: var(--card--color-subtle);
}

/* Component without color prop — primary role directly */
.nav-item[data-selected="true"] {
  color: var(--primary--text);
  background-color: var(--primary--subtle);
}
```