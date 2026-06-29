# Common Architecture & Implementation Patterns

This document covers the reusable design and coding patterns used across the design system codebase.

---

## 1. The Delegation / Composition Pattern

Many leaf-node components share layout, spacing, or trigger behaviors. Rather than replicating resolution logic, leaf components delegate concerns to shared Category Hooks.

### Pattern: `useBox` delegating to `useLayout`
```typescript
// box.hook.ts
import { useLayout } from "~/layout/layout.hook";

export function useBox(props: BoxProps) {
  const { as: Tag = "div", radius, ...layoutProps } = props;

  // 1. Delegate layout and spacing to the category hook
  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);

  // 2. Resolve component-specific tokens
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(BOX_TOKENS, { radius }, "box");

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "box", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
```
* **Benefit:** Reduces code duplication, keeps spacing cascades consistent, and allows a single point of updates for structural layout logic.

---

## 2. Event Delegation for Client-Side Scripts (`*.client.ts`)

Since components are rendered server-side first (SSR) without a framework event system, dynamic client-side interactions use vanilla JavaScript. We utilize **event delegation** at the document level to manage interactivity.

### Pattern: Document-Level Listeners
```typescript
// modal.client.ts
function initModals() {
  document.addEventListener("click", (event) => {
    const trigger = (event.target as HTMLElement).closest("[data-modal-trigger]");
    if (!trigger) return;

    const modalId = trigger.getAttribute("data-modal-trigger");
    const modal = document.getElementById(modalId ?? "");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  });
}

// Wire up on load and view transition swap
document.addEventListener("DOMContentLoaded", initModals);
document.addEventListener("astro:after-swap", initModals);
```
* **Benefit:** Eliminates the need to bind individual event listeners to every instance in the DOM, keeping memory usage low and making components highly resilient to DOM updates.

---

## 3. Strict Optional Property Spread

When compiling with strict TypeScript settings (`exactOptionalPropertyTypes: true`), passing a property explicitly set to `undefined` causes type check errors. We use conditional spreads to insert optional properties only when they are defined.

### Pattern: Conditional Spreads
```typescript
// button.hook.ts
const linkAttrs = {
  // If target is undefined, it is not added to the object at all
  ...(target !== undefined ? { target } : {}),
  ...(rel !== undefined ? { rel } : {}),
};
```
* **Benefit:** Safe compilation and cleaner output HTML, preventing attributes like `target="undefined"` from rendering.

---

## 4. Automatic Spacing Resolution

Spacing props are handled in one place by `useBaseCompose`. Leaf components simply forward their `base` props, and the spacing variables are generated and output in `style`.

### Pattern: Auto-Prefixing Spacing
```typescript
// useBaseCompose automatically determines the prefix from the first class name token
const { className, style, attrs, rest } = useBaseCompose(
  {
    className: ["image", ...tokenClasses, className],
    style: [...tokenStyle],
  },
  base // Spacing props exist inside base, gets extracted and mapped to --image--* styles
);
```
* **Benefit:** Components do not need to write boilerplate spacing code. Spacing props never leak to the DOM as attributes, and are scope-prefixed automatically.
