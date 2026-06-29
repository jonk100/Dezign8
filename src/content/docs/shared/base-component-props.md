---
title: Base Component Props
description: Shared properties available on all components in the design system.
---

# Base Component Props

These props are defined in src/design/shared/base.props.ts. They can be consumed by any component.

## Base Props Summary (`useBaseCompose`)

Base component props shared by all components. The following props are handled by the `useBaseCompose` hook in `base.hook.ts`:

* **`class`**: mapped to class string via `composeClass` in `./base.hook.ts`
* **`style`**: mapped to style string via `composeStyle` in `./base.hook.ts`
* **`disabled`**: emits `aria-disabled` + `data-disabled`
* **`loading`**: emits `aria-busy` + `data-loading`
* **`motion`** and **`mDistance`**: generate motion inline styles and attributes
* **`action`**: emits `data-action`
* **`target`**: emits `data-target`
* **`v`**: emits `data-visual`
* **Spacing Props**: shorthand properties for padding and margins (see [Spacing Props](./spacing-props.md))
* **ARIA Props**: accessibility properties for screen readers and assistive tech (see [ARIA Props](./aria-props.md))

---

## Detailed Prop Documentation

### Custom Data Attributes (`data-*`)
**Syntax:** `[key: \`data-${string}\`]: string | number | boolean | undefined;`

Allows you to pass arbitrary custom data attributes to the component's root HTML element. This is useful for passing test identifiers (e.g., `data-testid`), managing internal state hooks for CSS styling (e.g., `data-active`), or attaching custom data payloads to the DOM node.

### `motion`
`motion` drives enter, exit, and idle animations on any component.

**Syntax:** `{phase}:{name}[/{duration}[/{delay}]][,…][ …]`

**Examples:**
```jsx
motion="enter:slideUp/200/0"
motion="enter:slideUp/200/0 exit:fadeOut/200/0"
motion="enter:slideUp/200/0 exit:shakeOut/150/0,slideLeft/200/50"
motion="idle:shakeInfinite/800"

```

*See also:*

* `motion.types.ts` — full animation name registry
* `motion.css` — keyframes

### `mDistance`

`mDistance` sets the travel distance for motion animations like slide, bounce.

* Accepts a specific CSS value (e.g., `100px`, `50vw`) or a multiplier (e.g., `x2`, `x3`) of the default prop distance.

**Examples:**

```jsx
<Alert motion="" mDistance="x2" />
<Button motion="" mDistance="100px" />
<Image motion="" mDistance="x0.5" />

```

### `action` & `target`

* `action` triggers a declarative action (defined in `./actions`) based on something like a click (e.g., `'replay-motion'`, `'toggle-theme'`).
* `target` targets the action to a specific element (e.g., `'#my-id'`, `'closest .container'`).

**Example:**

```jsx
<Button action="copy-code" target="closest .pre-wrapper">Copy</Button>

```

### `loading`

Indicates if the component is in a loading state.

* Emits `data-loading="true"` on the root element via `useBaseCompose`.
* Each component implements its own loading UI — typically falling back to a `<Skeleton />`.
* Components like `Badge`, `Button`, and `Avatar` can render a skeleton shape matching their own dimensions.
