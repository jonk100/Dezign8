# Design System Audit & Roadmap

## Section 1 - Consistency Audit

### 1. Duplicate Component Logic
- **Trigger/Button mapping**: The logic to determine if a component should render as a `<button>` or `<a>` tag (checking the presence of an `href` prop) is duplicated across components that act as triggers (e.g., `Button`, `Link`, `ThemeToggle`).
- **State derivations**: Multiple hooks manually compute `aria-disabled` and `aria-busy` based on `loading` or `disabled` props instead of deferring to a single centralized `useTrigger` base hook that handles all accessible states.

### 2. Shared Prop Patterns
- Components like `<Select>` or `<Table>` implement their own props for internal components (e.g., `SelectOption`, `TableHeadProps`). Many of these extend a generic `FormProps` or `BaseComponentProps` but add duplicated logic for standard attributes like `className`, `id`, and `style`.
- Component variations (e.g. single select vs multi select) use discriminated unions. While type-safe, some components do this differently, leading to inconsistent developer experiences.

### 3. Opportunities for Common Type Definitions
- Instead of component-specific variants like `AudioVariant`, `TriggerVariant`, `DataVariant`, we should create a unified `SystemVariant` or `ActionVariant` type (e.g., `"primary" | "secondary" | "ghost" | "danger" | "warning" | "success"`).
- Global HTML attribute extensions: Rather than redefining `id`, `class`, and `style` on every component, a global `PolymorphicProps<T>` or `SystemComponentProps` should be established.

### 4. Inconsistent Variant Naming
- Across the `src/design` directory, components name their variant enums inconsistently. Some use the component name (`AlertVariant`, `ButtonVariant`), while others use logical domain names.
- The actual values for these variants differ—some components use `"solid" | "outline"` while others use `"primary" | "ghost"`.

### 5. Inconsistent Size Naming
- Sizes are completely decentralized: `AudioSize`, `AvatarSize`, `FilePreviewSize`, `TriggerSize`, etc.
- While some use `"sm" | "md" | "lg"`, others introduce `"xs"` or `"xl"`. Unifying this into a single `ThemeSize` type would enforce uniformity.

### 6. Design Token Violations
- **Hardcoded CSS Values**: The CSS audit revealed dozens of hardcoded instances of values like `.5rem`, `.25rem`, and `.75rem`. These should be replaced by spacing tokens like `var(--space-2)` or `var(--space-in--sm)`.
- **Raw Colors**: Instances of `background-color: transparent` and `border: none` exist outside of reset stylesheets, which might bypass theme definitions.
- **Raw Animation Values**: `transform: scale(0.99)` and `transition: .2s` are repeated frequently instead of relying on tokenized motion/animation curves.

### 7. Accessibility Issues
- **Disabled Links**: Links rendered with the `Button` styles receive `aria-disabled="true"` when disabled, but natively `<a>` tags remain focusable and interactable. They need `tabindex="-1"` and `pointer-events: none` to be truly disabled.
- **Icon Only Triggers**: Triggers like the `ThemeToggle` support an `iconOnly` prop, but it's not strictly typing the requirement for an `aria-label` or visually hidden text when `iconOnly` is true.

---

## Section 2 - Scoped Roadmap

### 1. Immediate Fixes (< 1 hour)
**Impact:** High | **Risk:** Low
- **Fix disabled link accessibility:** Update `useTrigger`/`button.hook.ts` to attach `tabindex="-1"` and `pointer-events: none` to `<a>` elements when `disabled` or `loading`.
- **Remove hardcoded colors:** Replace immediate instances of generic colors with appropriate semantic color tokens in `skeleton.css` and surface components.

### 2. Short-term Improvements (< 1 day)
**Impact:** Medium | **Risk:** Low
- **CSS Tokenization:** Run a global replace for raw spacing values (`.5rem`, `.25rem`) to use `var(--space-*)` tokens.
- **Enforce Aria Labels:** Update the base `TriggerProps` type to require `aria-label` if `iconOnly` is present (using conditional TypeScript typing).

### 3. Medium-term Refactors (< 1 week)
**Impact:** High | **Risk:** Medium
- **Unify Sizes & Variants:** Consolidate `ComponentSize` and `ComponentVariant` types into `src/design/shared/tokens.ts`. Refactor all components to consume these shared types instead of declaring their own `AudioSize`, `TriggerSize`, etc.
- **Centralize Trigger Logic:** Move all tag mapping (`button` vs `a`), disabled computing, and loading state computations out of specific components entirely and into the `useTrigger` hook.

### 4. Long-term Architectural Improvements
**Impact:** High | **Risk:** High
- **Polymorphic Base Component:** Architect a true polymorphic base (e.g., `<Box as="div">`) that accepts all standardized design system tokens natively via props (`p="4"`, `mt="2"`, `bg="primary"`).
- **CSS Migration to Layers:** Ensure all component styles use `@layer components` to allow utility classes (if later introduced) to override them predictably without specificity battles.

---

## Section 3: Accessibility

### Missing Labels
- Components with `iconOnly` states (like close buttons in modals, theme toggles, and icon buttons in toolbars) currently lack strict enforcement for accessible names.
- Form controls sometimes rely solely on `placeholder` text without an associated visually hidden `<label>` or `aria-label`.

### Keyboard Navigation Issues
- Custom interactive surfaces (like `DropdownMenu`, `Select` with `multiple={true}`, and `TreeView`) require rigorous testing for keyboard roving tabindex patterns.
- Modals/Drawers need to ensure focus trapping is implemented and that focus is returned to the original trigger upon closing.

### Aria Opportunities
- `aria-busy` is implemented in `Button`, but should be extended to `Panel` or `Section` elements when data is loading inside them asynchronously.
- Components mapping `disabled` should utilize `aria-disabled="true"` for semantic understanding even when pointer events are stripped.

### Heading Hierarchy Problems
- `Card`, `Panel`, and `Section` components often hardcode `<h2>` or `<h3>` tags instead of calculating heading levels based on their depth in the DOM, potentially leading to disjointed document outlines.

---

## 4. CSS Review

### Duplicated Selectors
- Dozens of components redefine basic Flexbox centering (`display: flex; align-items: center; justify-content: center;`).
- Components like `Header`, `Footer`, and `Nav` redefine standard responsive bounds instead of reusing a common `.container` or `.wrapper` token class.

### Repeated Declarations
- `outline: none;` (often missing a corresponding `:focus-visible` ring).
- `box-sizing: border-box;`.
- `transition: ...` without falling back to a reduced motion media query.

### Utility Classes That Should Be Tokens
- Spacing classes (`.p-4`, `.mt-2` style classes) and layout helpers (`.flex-center`) should be derived directly from a core tokens stylesheet to prevent component drift.

### Styles That Could Be Moved Into Shared Utilities
- **Focus Rings**: The logic for interactive element focus rings should be centralized into a mixin or a single global `.focus-ring` utility class rather than redefined inside `button.css`, `select.css`, and `tab.css`.
- **Skeleton Loaders**: The animation keyframes for skeletons (currently inside `skeleton.css`) should be elevated to a global animation token so any element can receive a loading state skeleton gracefully.
