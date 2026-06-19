# CSS Authoring Rules — Patterns

→ See **css-overview.md** for orientation and **css-compound.md**
for a full list of compound props.

---

## Root selector

Every component's base rule uses both the class and the
`data-visual` attribute. Nothing else at the root.

```css
.button,
[data-visual="button"] {
  /* base styles */
}
```

Avoid nesting beyond two levels. Avoid `!important`. If specificity
is a problem, the selector structure needs fixing, not a `!important` patch.

---

## Variant rules

Each variant is a flat block. All properties the variant controls
live together — no partial overrides scattered across other rules.

```css
/* ALL properties this variant owns, in one block */
.control--solid {
  background-color: var(--control--color-base);
  border: none;
  color: var(--text--on-color);
}

/* Don't split variant properties across separate selectors */
/* unless one of them is state-dependent */
.control--solid:hover:not([data-disabled]) {
  background-color: var(--control--color-vivid);
}
```

→ See **color-css.md** for the full variant rule set and step matrix.

---

## State rules

**Prefer CSS pseudo-classes** for states the browser tracks natively:

```css
.button:hover         { … }
.button:active        { … }
.button:focus-visible { … }
.input:placeholder-shown { … }
```

**Use `data-*` selectors** for states managed by JS:

```css
.card[data-selected="true"]  { … }
.card[data-disabled="true"]  { … }
.card[data-loading="true"]   { … }
.input[data-invalid]         { … }
```

**Use `.component--modifier` classes** for static flags emitted
by the hook (not toggled at runtime):

```css
.button--full-width  { width: 100%; }
.button--icon-only   { padding-inline: var(--control--size); aspect-ratio: 1; }
.h--balance          { text-wrap: balance; }
```

Prefer `data-*` over JS-toggled classes for runtime state.
Hook-emitted classes are static per render; `data-*` attributes
are dynamic — the distinction makes each easier to trace.

---

## Interactive elements

Group the base + hover + active + focus rules together. Keep
transform and color changes in separate declarations so
reduced-motion overrides can target them cleanly.

```css
.card[data-interactive] {
  cursor: pointer;
  transition:
    transform       var(--transition--fast),
    background-color var(--transition--fast),
    box-shadow      var(--transition--base);
}

.card[data-interactive]:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow--md);
}

.card[data-interactive]:active {
  transform: translateY(0) scale(0.99);
}

/* Focus ring uses the component's color role if it has one */
.card[data-interactive]:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px
    color-mix(in oklch, var(--card--color-base) 35%, transparent);
}

/* Reduced motion — pull out transforms, keep color feedback */
@media (prefers-reduced-motion: reduce) {
  .card[data-interactive] {
    transition: background-color var(--transition--fast),
                box-shadow var(--transition--fast);
  }
  .card[data-interactive]:hover  { transform: none; }
  .card[data-interactive]:active { transform: none; }
}
```

---

## Glass surfaces

Glass sets five coupled properties plus a `::before` highlight edge.
Keep them together — they only make sense as a unit.

The glass bg tokens (`--bg--N-glass`) correspond to each layer's
background at reduced opacity. Use the token that matches the
component's layer.

```css
/* Layer 2 glass surface (Paper, Panel) */
.surface--glass {
  background-color: var(--bg--2-glass);
  backdrop-filter: blur(var(--surface--blur));
  -webkit-backdrop-filter: blur(var(--surface--blur));
  border-color: var(--border--subtle);
  box-shadow: var(--glass--shadow);
}

/* Top-edge highlight — always paired with glass */
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

/* Bordered glass */
.surface--glass.surface--bordered {
  border-color: var(--border--default);
}
```

`--surface--blur` is written by the hook from the `blur` prop.
`--glass--shadow` and `--glass--highlight` come from
`tokens-color.css` and switch automatically with `[data-theme]`.

---

## Disabled state

Always write disabled as a compound block. Three properties,
always together, never split.

```css
.control--disabled,
.control[data-disabled] {
  opacity: var(--opacity--disabled);
  pointer-events: none;
  cursor: not-allowed;
}
```

Prefer `data-disabled` for JS-managed state; `.control--disabled`
for server-rendered or static disabled that doesn't toggle.

---

## Loading state

Keep loading separate from disabled — semantically different.
A loading element is busy but not unavailable.

```css
.control[data-loading] {
  pointer-events: none;
  cursor: wait;
}

/* Spinner slot or animation lives in the component, not control.css */
```

---

## Selected / checked state

```css
/* Checkbox */
.checkbox__input:checked {
  background-color: var(--control--color-base);
  border-color: var(--control--color-base);
}

/* Selectable card */
.card[data-selected="true"] {
  border-color: var(--card--color-border);
  background-color: var(--card--color-subtle);
}
```

---

## Inline style vs CSS file

The hook writes inline style; the CSS file reads it via channels.
Never write inline style declarations in CSS files. Never reference
a specific value that should be coming from the hook.

```css
/* WRONG — value that should come from the hook */
.button { font-size: 1rem; }

/* CORRECT — reads the channel the hook writes */
.button { font-size: var(--control--size); }
```