# General Coding & Design System Rules

This document outlines flexible guidelines for authoring components, hooks, styles, and templates in this repository. These guidelines are designed to maintain code quality while remaining open to iteration and creative exceptions.

---

## 1. Directory & File Organization

* **Structure Consistency:** Keep new components aligned with the 5+ file convention:
  `tokens.ts` → `props.ts` → `hook.ts` → `css` → `Astro`.
* **Colocation:** Keep all styles, client scripts, test tokens, and templates colocated inside the component's folder.
* **Barrels:** Expose public interfaces and components through an `index.ts` barrel file inside the component folder for clean imports.

---

## 2. HTML Semantics & Platform Features

* **Native First:** Always prefer native browser elements and platform features over custom JavaScript implementations:
  * Use `<dialog>` for modals and drawers.
  * Use the native Popover API (`popover="auto"`) for tooltips and popovers.
  * Use `<input type="checkbox" role="switch">` for toggle switches.
  * Use `<details>` and `<summary>` for accordions and disclosure cards.
* **Tag Customization:** Provide an `as` or `Tag` prop where appropriate to let consumers override the underlying HTML tag (e.g., rendering a Card as an `article`, `div`, or `section`).

---

## 3. Styling & Custom Properties

* **Respect Scoping:** Only style elements owned by the component. Avoid writing CSS that reaches into sibling components or overrides global page layouts.
* **Cascade Fallbacks:** When declaring custom properties, always provide sensible fallback values:
  ```css
  padding: var(--component--padding, var(--space-in--md));
  ```
* **No Raw Hex/Pixel Codes:** Connect color and spacing styles to design system tokens rather than absolute colors or raw pixel margins.

---

## 4. TypeScript & Typing Guidelines

* **Derive Types:** Avoid duplicate definitions. Derive prop type unions directly from token keys:
  ```typescript
  export type ComponentSize = keyof typeof COMPONENT_TOKENS.size.values;
  ```
* **Strict Options:** Respect strict optional property checking. Use conditional spreads when building parameter objects:
  ```typescript
  const options = {
    ...(href !== undefined ? { href } : {})
  };
  ```

---

## 5. Client Behavior & Hydration

* **SSR-First:** All templates must be server-side renderable. Do not write template files that depend on browser-only objects (like `window` or `document`) during the initial compile.
* **Vanilla Hydration:** Keep scripts lightweight. Rely on client-side event delegation rather than mounting multiple event listeners directly to elements.
* **reduced-motion Support:** Ensure all animations and transforms respect user motion preferences via the `@media (prefers-reduced-motion: reduce)` media query.
