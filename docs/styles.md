# Styles & CSS Authoring Guidelines

This document details how CSS is authored, organized, and applied in this design system. It details our naming conventions, nesting rules, states, animation principles, and the proper way to add styles to the codebase.

---

## Core Styling Conventions

### 1. Pure CSS & Scoped Files
* Every component has a dedicated `*.css` file colocated in its directory.
* **No CSS Imports:** Component stylesheet files must not use `@import` to pull in other component stylesheets.
* **No Raw Color/Spacing Literals:** Avoid hardcoding colors (e.g., `#0070f3`) or spacing/radius values (e.g., `12px`, `8rem`) directly in component stylesheets. Use scoped CSS custom properties instead.

### 2. Nesting Limits
* **Maximum Nesting Depth:** 2 levels.
* Nesting beyond 2 levels makes stylesheets difficult to maintain, increases specificity conflicts, and degrades performance.

```css
/* CORRECT: 1 level of nesting */
.card {
  .card__body {
    padding: var(--card--padding);
  }
}

/* AVOID: 3 levels of nesting */
.card {
  .card__body {
    .card__button {
      background-color: var(--button-bg);
    }
  }
}
```

### 3. Selector Specificity & `!important`
* **Zero `!important` Policy:** Never use `!important` in component stylesheets. Overrides should be managed via selector structure, cascade order, or custom variables.
* **Root Selectors:** The root selector for a component must target the component class or its visual visual identity attribute:
  ```css
  .button,
  [data-visual="button"] {
    /* Base styles */
  }
  ```

---

## Component Modifier Classes vs. JS State

We separate static configuration properties from dynamic, runtime state adjustments to make debugging and testing predictable.

### 1. Component Modifiers (Static Props)
Use BEM modifier classes (e.g., `.block--modifier`) for configurations that are determined during rendering and do not change dynamically at runtime:
* `.button--full-width`
* `.button--icon-only`
* `.button--solid`
* `.image--ratio`

### 2. JS State Attributes (Dynamic States)
Use `data-*` attribute selectors for active, temporary states that are toggled dynamically on the client side using JavaScript:
* `.card[data-selected="true"]`
* `.button[data-loading="true"]`
* `.field[data-disabled]`

---

## Spacing and Custom Property Cascades

We structure custom properties in a cascade so that components can fall back to general settings or inherit specific rules without verbose selectors.

### Padding Cascade Example
```css
.layout {
  padding:              var(--layout--p);
  padding-inline:       var(--layout--px, var(--layout--p));
  padding-block:        var(--layout--py, var(--layout--p));
  padding-block-start:  var(--layout--pt, var(--layout--py, var(--layout--p)));
  padding-block-end:    var(--layout--pb, var(--layout--py, var(--layout--p)));
  padding-inline-start: var(--layout--pl, var(--layout--px, var(--layout--p)));
  padding-inline-end:   var(--layout--pr, var(--layout--px, var(--layout--p)));
}
```
Setting `--layout--p` sets padding on all sides. Setting `--layout--py` overrides only top and bottom, while setting `--layout--pt` overrides only the top padding.

---

## Layout Layer Reference (Elevation System)

The elevation system maps backgrounds, shadows, and borders as a single design token. Components inherit properties based on their layer context:

| Layer | Common Usage | Background | Shadow | Border |
|---|---|---|---|---|
| **Layer 0** | Document base / HTML body | `--bg--0` | `none` | `transparent` |
| **Layer 1** | Primary header, footer, app layouts | `--bg--1` | `none` | `--border--subtle` |
| **Layer 2** | Cards, papers, main panels | `--bg--2` | `--shadow--sm` | `--border--subtle` |
| **Layer 3** | Stacking tiles, nested panels | `--bg--3` | `--shadow--md` | `--border--default` |
| **Layer 4** | Overlays, sheet containers, drawers | `--bg--4` | `--shadow--lg` | `--border--strong` |
| **Layer 5** | Modal dialogs, banners, alert views | `--bg--5` | `--shadow--xl` | `--border--strong` |

---

## Interactive Styles & Accessibility

When writing hover, focus, and press active states, ensure you include transition timings and follow preferences for users who require reduced motion:

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

/* Reduced Motion Guard */
@media (prefers-reduced-motion: reduce) {
  .card[data-interactive] {
    transition: none;
  }
  .card[data-interactive]:hover {
    transform: none;
  }
}
```
