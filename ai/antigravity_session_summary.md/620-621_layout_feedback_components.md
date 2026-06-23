# Agent Decision Log

---

## Layout Components: Missing Padding CSS
**Decision:** Imported `layout.css` globally inside `layout.hook.ts`.

**Rationale:** The `padding`, `margin`, and `gap` properties specified as props on layout components were failing to render because the layout components themselves never imported `layout.css` where the `.layout` class resolves the layout tokens. Since every layout component requires `useLayout()`, adding the import to the hook ensures the CSS is always bundled when any layout component is used, rather than manually importing it in 13+ separate `.astro` files.

---

## Documentation Layout Header Conflict
**Decision:** Renamed `.header` to `.docs-page-header` in `src/layouts/docs/docs-layout.css`.

**Rationale:** The documentation layout used a generic `.header` class. When a user visited the documentation page for the `Header` component, `header.css` from the design system was loaded, causing its `.header` styles to unexpectedly leak into the documentation layout wrapper, breaking the flex alignment. Using a more specific class name prevents collisions with the design system.

---

## Tag and Chip Components
**Decision:** Created `Tag` and `Chip` as distinct components mirroring the scaling system used by `Badge`.

- **Tag:** Non-interactive inline labels using `span`. Defaults to `soft` variant.
- **Chip:** Interactive interactive labels using `button`. Defaults to `outlined` variant, with hover (`brightness(0.95)`) and focus states defined.

**Rationale:** Distinguishing between interactive and non-interactive inline labels at the component level allows consumers to easily reason about semantics (button vs span) without having to manually wire up interactive CSS states on a generic Tag component.

---

## Icon Component Architecture
**Decision:** Implemented `Icon` component to wrap SVGs dynamically from `src/design/shared/icons/index.ts`.

**Rationale:** Astro's ability to import SVGs as components provides an incredibly robust way to render icons without resorting to `set:html` injection. The component uses the `name` prop to lookup the component in the registry. The sizing uses the pre-existing `--icon--size-*` CSS variables defined in `tokens.css` for consistent scaling across the application.

---

## Documentation Updates
**Decision:** Added interactive live previews to `badge.mdx`, `center.mdx`, `container.mdx`, `flex.mdx`, and `grid.mdx`.

**Rationale:** Live component previews dramatically improve documentation usability by showing the actual rendered output instead of just the Astro code block.

---

## Files created or significantly updated this conversation

### New files
```
src/content/docs/layout/center.mdx
src/content/docs/layout/container.mdx
src/content/docs/layout/flex.mdx
src/content/docs/layout/grid.mdx
src/design/feedback/components/tag/tag.tokens.ts
src/design/feedback/components/tag/tag.props.ts
src/design/feedback/components/tag/tag.hook.ts
src/design/feedback/components/tag/tag.css
src/design/feedback/components/tag/Tag.astro
src/design/feedback/components/chip/chip.tokens.ts
src/design/feedback/components/chip/chip.props.ts
src/design/feedback/components/chip/chip.hook.ts
src/design/feedback/components/chip/chip.css
src/design/feedback/components/chip/Chip.astro
src/design/assets/components/icon/icon.tokens.ts
src/design/assets/components/icon/icon.props.ts
src/design/assets/components/icon/icon.hook.ts
src/design/assets/components/icon/icon.css
src/design/assets/components/icon/Icon.astro
ai/antigravity_session_summary.md/620-622_layout_feedback_components.md  ← this file
```

### Updated files
```
src/layouts/docs/docs-layout.css             Renamed .header to .docs-page-header
src/layouts/docs/DocsLayout.astro            Updated class to docs-page-header
src/design/layout/layout.hook.ts             Imported layout.css
src/design/layout/components/header/Header.astro  Removed manual layout.css import
src/content/docs/feedback/badge.mdx          Added live previews
```
