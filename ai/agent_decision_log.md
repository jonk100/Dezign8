# Decision Log =======================
________________________________________
- Document key decisions and changes made
- New entries on top 
- `git add` and `git commit` after each entry
_________________________________________________
=================================================
-----------------------------------------------

## 2026/06/25 to 2026/06/25 - Antigravity session

[Repowise static analysis verifications](./antigravity_session_summary.md/625-625_repowise_static_analysis_verifications.md)

### New files
- `ai/antigravity_session_summary.md/625-625_repowise_static_analysis_verifications.md`

### Updated files
- `ai/agent_decision_log.md`

## 2026/06/25 — TypeScript typecheck: 18 errors fixed

Ran `pnpm astro check` → 18 errors, 0 after fixes. All were pre-existing (not introduced this session).

### Root causes and decisions

- **`FormProps` is a union type** — `FormProps = FormBaseProps & (A | B | C)` distributes to a union. TypeScript disallows `interface X extends <union>`. Fixed `SelectSingleProps`/`SelectMultiProps` from `interface extends SelectBaseProps` → `type = SelectBaseProps & { ... }`. Same pattern will apply to any future internal branching types built on `FormProps`.

- **`export type { X as Y }` does not create a local binding** — `combobox.props.ts` used `export type { SelectOption as ComboboxOption }` then used `ComboboxOption` inside the same file. The re-export syntax is outbound-only. Fixed to `export type ComboboxOption = SelectOption;` which creates both a local alias and an export.

- **`exactOptionalPropertyTypes` + destructured optionals** — Destructuring `href`, `target`, `rel` from props yields `string | undefined`; spreading these into a function call sets the property explicitly to `undefined`, which violates the strict flag. Pattern fix: `...(href !== undefined ? { href } : {})`. Applied in `button.hook.ts` and `Pagination.astro`. Same pattern already existed in `breadcrumbs.ts` / `stepper.ts` — consistent.

- **`ButtonProps` is a discriminated union** — `theme-toggle.hook.ts` destructures from `ThemeToggleProps = ButtonProps` (a union), making `...rest` a union spread. TypeScript can't re-correlate the extracted `iconOnly` with the correct union branch. Fix: cast the composed argument `as ThemeToggleProps`. The cast is safe — the runtime values are structurally correct; only inference fails.

- **`enterStyle?: string` vs `exactOptionalPropertyTypes`** — `getMotionAttrs` returns `{ enterStyle: string | undefined }` but `MotionAttrs.enterStyle` was typed `?: string`. With the strict flag, `undefined` is only valid when the property is absent, not when it's explicitly present. Fixed by adding `| undefined` to the field: `enterStyle?: string | undefined`. This is the idiomatic declaration when a function legitimately returns both "absent" and "explicitly undefined".

- **`noUncheckedIndexedAccess` + array destructure** — `const [name, ...] = str.split("/")` gives `name: string | undefined`. Applied `?? ""` fallback: `(name ?? "").trim()`.

- **Invalid overlay variant defaults** — `DROPDOWN_MENU_DEFAULTS.variant = "elevated"` and `SHEET_DEFAULTS.variant = "solid"` are not in `OverlayVariant = "default" | "centered" | "fullscreen"`. Both changed to `"default"`. The defaults were aspirational — `"elevated"` and `"solid"` variants don't exist in `OVERLAY_TOKENS`; they'd silently do nothing at runtime.

- **`Link.href` made optional** — `Pagination` passes `undefined` for disabled prev/next links (ARIA pattern: `aria-disabled="true"` + `tabindex="-1"`). `LinkProps.href` was required. Changed to optional; HTML `<a>` without `href` is a valid placeholder link.

- **`@floating-ui/dom` installed** — `dropdown-menu.client.ts` imported from it; package was missing from `package.json`. Not a new dependency — it was already in use, just not declared.

### Modified files
```
src/design/feedback/feedback.hook.ts               stray import removed
src/design/forms/components/combobox/combobox.props.ts  re-export → type alias
src/design/forms/components/select/select.props.ts      interface → type alias
src/design/nav/components/pagination/Pagination.astro   conditional spreads
src/design/overlays/components/dropdown-menu/DropdownItem.astro  conditional props + SvgName cast
src/design/overlays/components/dropdown-menu/dropdown-menu.tokens.ts  variant: "default"
src/design/overlays/components/sheet/sheet.tokens.ts    variant: "default"
src/design/shared/motion/motion.types.ts            enterStyle?: string | undefined
src/design/shared/motion/motion.utils.ts            (name ?? "").trim()
src/design/triggers/components/button/button.hook.ts    conditional spreads for href/target/rel
src/design/triggers/components/link/link.props.ts   href optional
src/design/triggers/components/theme-toggle/theme-toggle.hook.ts  as ThemeToggleProps cast
src/layouts/docs/DocsLayout.astro                   prev/next allow | undefined
package.json + pnpm-lock.yaml                       @floating-ui/dom added
```

-----------------------------------------------

## 2026/06/25 - Backlog triage session

### Decision audit: HIGH staleness items (repowise backlog queue)

**`4fe1e0f3` — Add motion prop to all components via BaseComponentProps**  
Verified against code: fully implemented. `motion?: MotionProp` in `BaseComponentProps`, `getMotionAttrs()` wired in `useBaseCompose`, `motion.css` + `mountMotionDismiss()` exist and are imported in Alert/Banner/Toast. No `animation?` prop found in any component (old name fully replaced). Staleness flag is a false positive — re-index will clear it. No code change required.

**`5534a144` — Adding the plugins to generate tokens**  
Verified: the "generated file completely unused" consequence in the decision is outdated. `primitives.tokens.generated.ts` is now imported and fully re-exported by `primitives.tokens.ts` (the facade). Components import from the facade, which uses the generated scales. The "two changes per token" problem is resolved for scale tokens — edit `definitions/scales.ts`, regeneration is automatic. `primitives.tokens.ts` still holds hand-authored domain logic (`resolveColorChannels`, dimension mappings) that can't be generated, so the facade is load-bearing, not temporary. Staleness flag is a false positive. No code change required.

### Code fixes applied

- `src/design/typography/typography.hook.ts`: Fixed `style` prop collision — consumer's inline `style` was falling into `...rest` and overriding token-derived CSS channel declarations. Extracted as `consumerStyle` and merged into the composed style array (applied last, so it wins conflicts intentionally).

### Repowise decision queue: 13 of 15 queued decisions confirmed active

- **Confirmed**: CSS nesting constraints, async CSS scan, native Drawer/Popover, native-first architecture, no React, no test framework, 5-file component structure, strict import direction, colocate typography scales, decouple data from nav props, re-export SelectOption, standardize audio variant vocabulary, BEM for typography — all verified accurate.
- **Skipped (DB lock)**: `9a98af12` (audio variant vocab) and `76142953` (BEM typography) — repowise MCP server held SQLite locked; both are accurate and should be confirmed in the next session via `repowise decision confirm <id>`.

-----------------------------------------------

## 2026/06/25 to 2026/06/25 - Antigravity session

See:
- [Session Summary](./antigravity_session_summary.md/625-625_repowise_combobox_id_decision_verification.md)

### New files
- `ai/antigravity_session_summary.md/625-625_repowise_combobox_id_decision_verification.md`

### Updated files
- `ai/agent_decision_log.md`

-----------------------------------------------

## 2026/06/24 to 2026/06/24 - Antigravity session

See:
- [Session Summary](./antigravity_session_summary.md/624-624_async_io_css_vars_plugin.md)

### New files
- `ai/antigravity_session_summary.md/624-624_async_io_css_vars_plugin.md`

### Updated files
- `plugins/check-css-vars.ts`


## 2026/06/24 — Token generation single source of truth

### Decision
`primitives.tokens.ts` now re-exports all scales from the generated file (`export * from "./primitives.tokens.generated"`) and retains only what can't be generated: shared dimensions (carry modifier/scope metadata), `COLOR_STEPS`, and `resolveColorChannels`.

### What changed
- `definitions/scales.ts` — added `TEXT_SIZE_FIXED` and four semantic `TEXT_COLOR` entries (`success`, `danger`, `warning`, `info`) that existed only in the hand-authored file
- `primitives.tokens.generated.ts` — updated to match; regenerated automatically on `pnpm dev` / `pnpm build`
- `primitives.tokens.ts` — stripped from 398 lines to ~115; all scale declarations replaced with `export * from "./primitives.tokens.generated"`

### Result
Adding a token now requires one change in `definitions/scales.ts`. It flows to the generated TS file on hot save and is available to all components through the re-export. The two-sources-of-truth problem is resolved.

### Modified files
```
src/design/shared/definitions/scales.ts              — TEXT_SIZE_FIXED + TEXT_COLOR semantic entries
src/design/shared/primitives.tokens.generated.ts     — updated to match scales.ts
src/design/shared/primitives.tokens.ts               — re-exports generated; domain logic only
```

-----------------------------------------------

## 2026/06/24 - Implement Textarea, Switch, RadioGroup

### Components built
- **Textarea** (Tier 2, #21) — wrapper+control pattern (same as Input). Single `<textarea class="textarea__control">` inside `<div class="form textarea …">`. `resize` prop emits `--textarea--resize` CSS var directly rather than via `resolveTokens` since `useForm` already handles all other FORM_TOKENS dimensions.
- **Switch** (Tier 4, #50) — label-wrapper pattern (same as Checkbox). Hidden `<input type="checkbox" role="switch">` + CSS track+thumb with `calc()`-proportional sizing from `--form--size`. Thumb travel = `0.54 × --form--size`.
- **RadioGroup** (Tier 3, #35) — `dezign8-radio-group` Web Component wrapping `<fieldset>` + `<legend>`. `connectedCallback` propagates `data-name` → `name` attribute on all child `input[type="radio"]`. Pattern mirrors Navbar web component.

### Key decisions
- Textarea uses wrapper div (not bare `<textarea>`) to avoid `display: flex` override complexity from `.form` base class — consistent with Input.
- RadioGroup uses web component (option b from advisor) rather than pure SSR fieldset, because the `@todo` in radio.tokens.ts explicitly calls for name/value ownership. JS-dependent; documented in JSDoc.
- Switch skips ahead of InputGroup/ButtonGroup (Tier 3) — simpler, self-contained, and avoids the Tier 3 items that depend on other components being finalized first.

### Checklist updated
- `[x]` Textarea #21, Navbar #23 (already implemented), RadioGroup #35, Switch #50

---

## 2026/06/24 to 2026/06/24 - Antigravity session

See:
- [Session Summary](./antigravity_session_summary.md/0624-0624_icons_and_input_fixes.md)

### New files
- `src/design/shared/icons/tabs.svg`
- `src/design/shared/icons/stepper.svg`
- `src/design/shared/icons/pagination.svg`
- `src/design/shared/icons/navbar.svg`
- `src/design/shared/icons/breadcrumbs.svg`
- `src/design/shared/icons/header.svg`
- `src/design/shared/icons/footer.svg`
- `src/design/shared/icons/heading.svg`
- `src/design/shared/icons/label.svg`
- `src/design/shared/icons/quote.svg`
- `src/design/shared/icons/field.svg`
- `src/design/shared/icons/flex.svg`

### Updated files
- `src/design/shared/icons/index.ts`
- `src/design/forms/components/input/input.css`
- `src/design/forms/components/select/select.css`
- `src/design/forms/components/search/search.css`
- `src/design/forms/components/combobox/combobox.css`
- `src/content/docs/layout/footer.mdx`
- `src/content/docs/layout/header.mdx`
- `src/content/docs/layout/flex.mdx`
- `src/content/docs/nav/breadcrumbs.mdx`
- `src/content/docs/nav/navbar.mdx`
- `src/content/docs/nav/pagination.mdx`
- `src/content/docs/nav/stepper.mdx`
- `src/content/docs/nav/tabs.mdx`
- `src/content/docs/typography/heading.mdx`
- `src/content/docs/typography/label.mdx`
- `src/content/docs/typography/quote.mdx`
- `src/content/docs/forms/field.mdx`

-----------------------------------------------

## 2026/06/24 — Icon fill bug + DocsLayout header refinements

### Decisions

- **Remove `fill: currentColor` from icon.css** — CSS `fill` overrides SVG presentation attributes (`fill="none"`), so stroke-based icons were rendering as solid filled shapes. Fix: remove both `fill: currentColor` on `.icon` and `fill: inherit` on `.icon svg`. SVG `fill="none"` attribute now controls fill directly; icons that need fill specify it on individual path elements.

- **DocsLayout badge row moved below the heading** — badges (`category`, `status`, `version`) now appear between the title/icon row and the description, not above the title. Better visual hierarchy: title first, metadata context second, description third.

- **Breadcrumbs moved below the page header** — previously above the `docs-container` with large padding. Now positioned immediately after `</header>` inside `docs-container`, vastly reducing wasted whitespace.

- **No raw values in inline styles** — user instruction: always use design token CSS vars (e.g. `var(--space-in--md)`) rather than hardcoded values like `1.5rem` or `1rem 0` in `style=""` attributes.

### Modified files
```
src/design/assets/components/icon/icon.css   — removed fill: currentColor and fill: inherit
src/layouts/docs/DocsLayout.astro            — icon size sm→xl, badges below title, breadcrumbs inside container
```

---

## 2026/06/24 — Drawer + Popover components

### Decisions

- **Drawer uses native `<dialog showModal()`>** — same as Modal. Gets focus trapping, backdrop, and Escape handling for free. Placement modifier classes (`drawer--placement-end/start/top/bottom`) handle edge positioning via CSS margins; size modifier classes set `--drawer--cross-size` which placement classes consume for width (side drawers) or height (sheet drawers).

- **`--drawer--cross-size` indirection** — Size classes set this CSS var; placement classes consume it. This avoids needing 4×4 combined selectors. Full-size override comes after placement classes in the CSS so its `border-radius: 0; border: none` wins at equal specificity.

- **Popover uses HTML Popover API (`popover="auto"`)** — non-modal, top-layer, light-dismiss, no backdrop. JS (`toggle` event handler) positions the panel via `getBoundingClientRect()` before first paint. `inset: auto; margin: 0` on the panel overrides UA defaults so `top`/`left` actually drive placement. The trigger slot's first interactive child receives `popovertarget` automatically on init.

- **Popover placement as `modifier: true`** — emits `popover--bottom-start` etc. (no infix). Hyphenated scale keys work fine with `resolveTokens`; `String("bottom-start")` is just `"bottom-start"`.

- **`@starting-style` + `opacity: 0` for both components** — matches the existing modal pattern. Drawer uses placement-specific `@starting-style` transforms (translateX/Y) for directional slide-in. Popover uses `scale(0.97) translateY(-4px)`.

### New files
```
src/design/overlays/components/drawer/drawer.tokens.ts
src/design/overlays/components/drawer/drawer.props.ts
src/design/overlays/components/drawer/drawer.hook.ts
src/design/overlays/components/drawer/drawer.css
src/design/overlays/components/drawer/Drawer.astro
src/design/overlays/components/drawer/drawer.client.ts
src/design/overlays/components/popover/popover.tokens.ts
src/design/overlays/components/popover/popover.props.ts
src/design/overlays/components/popover/popover.hook.ts
src/design/overlays/components/popover/popover.css
src/design/overlays/components/popover/Popover.astro
src/design/overlays/components/popover/popover.client.ts
src/content/docs/overlays/drawer.mdx
src/content/docs/overlays/popover.mdx
```

---

## 2026/06/24 — Alert padding + centralized aria state

### Decisions

- **Alert padding via `resolveSpacingStyles`** — First feedback component to adopt the standard spacing pattern. `alert.hook.ts` now sets `--alert--padding` (size default from `ALERT_SIZE_MAP`) and calls `resolveSpacingStyles(spacing, "alert")` for user overrides. Removed the manual `sp()` helper and the four individual `--alert--pt/pr/pb/pl` vars. CSS updated to use the full cascade chain: `var(--alert--pt, var(--alert--py, var(--alert--p, var(--alert--padding))))`.

- **`aria-disabled` + `aria-busy` centralized in `useBaseCompose`** — Added `disabled?: boolean` to `BaseComponentProps` and `BaseComposeOptions`. `useBaseCompose` now emits `aria-disabled="true"` + `data-disabled=""` when disabled, and `aria-busy="true"` alongside `data-loading="true"` when loading. Hooks pass computed disabled/loading via `BaseComposeOptions` rather than setting aria attrs manually. Resolved duplication across trigger, forms, card, tile, and 5 form component hooks.

- **`BaseComposeOptions.disabled` overrides `base.disabled`** — Resolution order is `options.disabled ?? base.disabled`. Hooks with computed disabled states (card: `!isLink && disabled`, tile: same) pass the computed value via options. Simple components can let the raw prop flow through `base` without explicit options.

### Modified files
```
src/design/shared/base.props.ts                        — added `disabled?: boolean`
src/design/shared/base.hook.ts                         — emits aria-disabled, data-disabled, aria-busy; added disabled+loading to BaseComposeOptions
src/design/triggers/trigger.hook.ts                    — pass disabled+loading in options; move isLink/isDisabled before useBaseCompose; drop manual aria attrs
src/design/forms/forms.hook.ts                         — pass disabled in options; remove manual aria-disabled + data-disabled from ariaAttrs
src/design/surfaces/components/card/card.hook.ts       — pass disabled: isDisabled to useSurface; remove manual aria-disabled
src/design/surfaces/components/tile/tile.hook.ts       — same
src/design/forms/components/checkbox/checkbox.hook.ts  — removed redundant aria-disabled from inputAttrs
src/design/forms/components/input/input.hook.ts        — same
src/design/forms/components/select/select.hook.ts      — same
src/design/forms/components/radio/radio.hook.ts        — same
src/design/forms/components/search/search.hook.ts      — same
src/design/forms/components/combobox/combobox.hook.ts  — same
src/design/feedback/components/alert/alert.hook.ts     — resolveSpacingStyles + --alert--padding/font-size
src/design/feedback/components/alert/alert.css         — cascade chain padding vars
```

-----------------------------------------------
-----------------------------------------------

*

-----------------------------------------------
-----------------------------------------------

*

-----------------------------------------------
-----------------------------------------------

*

-----------------------------------------------
-----------------------------------------------

*

-----------------------------------------------
-----------------------------------------------

*

-----------------------------------------------
-----------------------------------------------

*

-----------------------------------------------

## 2026/06/23 to 2026/06/24 - Antigravity session

See:
- [Session Summary](./antigravity_session_summary.md/623-624_composition_and_prose_refinements.md)

### New files
- `README.md`
- `ai/analysis/ComponentCompositionOpps.md`
- `ai/antigravity_session_summary.md/623-624_composition_and_prose_refinements.md`

### Updated files
- `CLAUDE.md`
- `src/design/feedback/components/alert/Alert.astro`
- `src/design/feedback/components/banner/Banner.astro`
- `src/design/overlays/components/modal/Modal.astro`
- `src/design/overlays/components/alert-dialog/AlertDialog.astro`
- `src/design/data/components/list/List.astro`
- `src/design/nav/components/pagination/Pagination.astro`
- `src/design/typography/components/prose/prose.css`
- `src/design/typography/typography.css`
- `src/design/typography/components/prose/prose.hook.ts`
- `src/pages/docs/[...slug].astro`
- `src/pages/docs/[category].astro`

-----------------------------------------------

## 2026/06/24 — Motion system

**Decision:** Added `~/shared/motion/` with four files. Replaced `animation?: string` in `base.props.ts` with `m?: MotionProp`. Integrated into `useBaseCompose` so all components get motion for free.

**Architecture:**
- `getMotionAttrs(m)` parses the prop and returns:
  - `enterStyle` — inline `animation:` value applied on mount by `useBaseCompose`
  - `exitAttrs` — `data-m-exit` + `data-m-exit-dur` for JS-triggered exits
- `useBaseCompose` now merges `enterStyle` into the style string and spreads `exitAttrs` + `data-motion=""` into attrs
- `mountMotionDismiss()` installs a single document-level delegated click handler; any `[data-dismiss]` inside `[data-m-exit]` plays the exit animation before hiding

**Syntax:**
```
m="enter:slideUp/200/0"                                  single enter
m="enter:slideUp/200/0 exit:fadeOut/200/0"              enter + exit
m="enter:slideUp/200/0 exit:shakeOut/150/0,slideLeft/200/50"  compound exit
m="idle:shakeInfinite/800"                               infinite loop
```
- Space separates phases; `/` separates `name/duration/delay`; `,` chains compound animations in one phase

**Keyframes (motion.css):** 46 keyframes across 8 families: slide, fade, stretch, spin, shake, blink, bounce, appear/disappear. Phases: `enter`, `exit`, `idle`. `@media (prefers-reduced-motion: reduce)` suppresses all via `[data-motion]` selector.

**Breaking change:** `animation?: string` removed from `BaseComponentProps`. Any component using `animation="something"` needs migration to `m`.

**Pending:**
- Import `motion.css` in `src/design/styles/global.css`
- Add `data-dismiss` attribute to Alert's close button, then import `mountMotionDismiss` in `Alert.astro`'s `<script>` block
- Audit remaining category hooks that destructured `animation` and swap to `m` (feedback.hook, forms.hook, etc.)
- `m` currently leaks into `rest` in hooks that don't explicitly destructure it → DOM gets `m="..."` attribute, harmless but worth a cleanup pass

## Files created or significantly updated this conversation

### New files
- `src/design/shared/motion/motion.types.ts` — MotionPhase, EnterName, ExitName, IdleName, ParsedAnim, ParsedPhase, MotionAttrs, MotionProp
- `src/design/shared/motion/motion.utils.ts` — parseMotion (internal), getMotionAttrs (public)
- `src/design/shared/motion/motion.css` — 46 @keyframes across 8 animation families
- `src/design/shared/motion/motion.dismiss.ts` — mountMotionDismiss(), event-delegated dismiss handler

### Updated files
- `src/design/shared/base.props.ts` — replaced `animation?: string` (ponytail) with `m?: MotionProp`; added JSDoc with syntax examples
- `src/design/shared/base.hook.ts` — `useBaseCompose` now calls `getMotionAttrs(base.m)` and merges `enterStyle` into style, `exitAttrs` + `data-motion` into attrs
- `src/design/triggers/trigger.hook.ts` — swap `animation` → `m` in destructuring; remove `animate-${animation}` from className

-----------------------------------------------

## 2026/06/24 - SpacingProps centralized on BaseComponentProps; Alert size+padding channels

### Decisions
- **SpacingProps moved to BaseComponentProps** — all 14 p/m shorthand props now live on `BaseComponentProps` (via extends). `FeedbackProps` previously double-extended them; redundant extends removed.
- **`useBaseCompose` owns spacing-strip** — destructures all 14 spacing keys from `base` so they never appear as DOM attributes in `rest`. Returns them in a `spacing` object so component hooks can consume them without re-destructuring from their own `props`.
- **`useFeedback` now passes `...base` (not `props`) to `useBaseCompose`** — uses the returned `rest` and threads `spacing` back to callers. Removed the manual `v: _v, testId: _testId` discard — `useBaseCompose` handles them.
- **Latent leak in other category hooks** — triggers, typography, forms, overlay hooks still do their own `...rest` destructure and would leak spacing props to the DOM if a user passes them. Deferred; fix each hook when it's touched.
- **Alert size+padding via SIZE_MAP + channels** — `ALERT_SIZE_MAP` in `alert.tokens.ts` maps `xs–xl → { fontSize, p }`. Hook resolves explicit spacing props (pt/pr/pb/pl/px/py/p) against the size default and writes four individual `--alert--pt/pr/pb/pl` channels. CSS reads `padding: var(--alert--pt) var(--alert--pr) var(--alert--pb) var(--alert--pl)`. One computed value per channel at runtime; size already resolved.
- **`as AlertSize` cast in alert.hook.ts** — TypeScript widens `size` to `unknown` when destructuring from a type with `[key: string]: unknown` index signature, even when the specific prop type is declared. Two explicit casts applied to satisfy the type checker.
- **`z--tooltip` added to primitives.definitions.ts** — tooltip.css was referencing `var(--z--tooltip)` which didn't exist. Added at `var(--z-400)` (same level as modal).

### Modified files
```
src/design/shared/base.props.ts         — extends SpacingProps
src/design/shared/base.hook.ts          — strip spacing, return { rest, spacing }
src/design/feedback/feedback.props.ts   — removed redundant SpacingProps extends
src/design/feedback/feedback.hook.ts    — pass ...base, use returned rest/spacing
src/design/feedback/components/alert/alert.props.ts   — removed "size" from Omit
src/design/feedback/components/alert/alert.tokens.ts  — added ALERT_SIZE_MAP
src/design/feedback/components/alert/alert.hook.ts    — size+padding channel emit
src/design/feedback/components/alert/alert.css        — individual --alert--pt/pr/pb/pl
src/design/shared/primitives.definitions.ts           — z--tooltip: var(--z-400)
```

-----------------------------------------------

## 2026/06/23 - Modal + AlertDialog components

### Decisions
- **Modal was already complete** (from crashed session) — tokens, props, hook, Astro, css, modal.client.ts all built; 0 typecheck errors confirmed.
- **AlertDialog: Esc suppressed by default** — `closeOnEsc` defaults to `false`. A true alertdialog requires explicit button choice; native dialog fires `cancel` on Esc, suppressed via `e.preventDefault()`. Opt-in via `closeOnEsc={true}`.
- **AlertDialog: no close button** — unlike Modal, the header has no X button. Shared `overlays.css` already had no `.alert-dialog__close-btn` rule, confirming this intent.
- **AlertDialog: no backdrop dismiss** — omitted `closeOnBackdrop` prop entirely. Users must choose an action button.
- **`description` prop vs default slot** — `description` renders a `<p id="${id}-desc">` wired to `aria-describedby`. If no `description`, the default `<slot />` renders in `__body` for custom content. Actions always go in the named `actions` slot.
- **`data-alert-dialog-close` + `data-alert-dialog-confirm`** — both attributes close the dialog on click; confirm is a semantic alias for UI that needs to distinguish cancel from confirm in action buttons.
- **`alert-dialog.client.ts` added as 6th file** — mirrors `modal.client.ts`; no cross-sibling import per hard constraint.

### New files
```
src/design/overlays/components/alert-dialog/alert-dialog.tokens.ts
src/design/overlays/components/alert-dialog/alert-dialog.props.ts
src/design/overlays/components/alert-dialog/alert-dialog.hook.ts
src/design/overlays/components/alert-dialog/AlertDialog.astro
src/design/overlays/components/alert-dialog/alert-dialog.css
src/design/overlays/components/alert-dialog/alert-dialog.client.ts
```

-----------------------------------------------

## 2026/06/23 - Avatar + FilePreview components

### Decisions
- **Avatar: self-contained, no Image sibling import** — renders `<img>` directly in the Astro template. Three modes (image → initials → icon silhouette) resolved in the hook; the template branches on what `useAvatar` returns. No sibling imports per hard constraint.
- **Status dot via CSS `::after` on `.avatar--has-status`** — avoids an extra DOM element; positioned absolute bottom-right, scales relative to `--avatar--size`. Color set by BEM modifier classes (`.avatar--online`, etc.) emitted by `resolveTokens` with `modifier: true`.
- **Initials capped to 2 chars in hook, not CSS** — `initials.slice(0, 2).toUpperCase()` in `useAvatar`. CSS truncation would still allow the text to wrap; JS is simpler and deterministic.
- **FilePreview: `layout` prop drives card vs strip** — `card` = vertical tile, `strip` = horizontal row. Single component, two CSS shapes via modifier class. No separate `FilePreviewStrip` component needed.
- **File type color via extension map in tokens** — `FILE_TYPE_MAP` in `file-preview.tokens.ts` maps extension → `{ label, color }`. Color is a static BEM modifier class applied in the hook; CSS reads it. Unknown extensions fall back to neutral `"FILE"` label.
- **`removable` + `onRemove` as inline JS string** — Astro is SSG-first; no framework event system. `onRemove` is a plain `onclick` attribute string. Callers can swap in a real handler via client-side event delegation if needed. Dismiss button opacity-animates on hover for low visual noise.

-----------------------------------------------

## 2026/06/23 - Audio component

### Decisions
- **Build on `<audio>` element, not AudioBufferSourceNode**: `HTMLMediaElement.preservesPitch` defaults `true` — pitch correction on rate change is already native. `AudioBufferSourceNode` would throw that away and require a hand-rolled phase vocoder. Element-based approach: standard props (`src`, `preload`, `loop`, `muted`, `volume`, `playbackRate`, events) map directly to native attributes; play/pause/seek/duration are free.
- **`preservePitch` prop flips native `preservesPitch`**: Exposed as `preservePitch` (default `true`). Setting `false` gives the chipmunk effect. Re-applied on every rate change since some browsers reset it.
- **Lazy AudioContext — only in user-gesture handler**: Web Audio autoplay policy blocks `AudioContext` creation outside a gesture. `ensureCtx()` is called inside the play-button click handler and deferred until first interaction.
- **Web Audio graph built once per player**: Graph is built lazily on first play. `redactSegments` censor beep uses a `GainNode` (mute main) + `OscillatorNode` (1000 Hz sine) + dedicated `beepGain`. `intercomMode` inserts a 3.4 kHz low-pass `BiquadFilterNode` + `WaveShaperNode` (soft-clip distortion, amount=30).
- **`astro:after-swap` re-init**: `initAllPlayers()` called on page load and on `astro:after-swap` to survive View Transitions client-side navigation.
- **`data-*` attributes carry config to script**: `redactSegments`, `intercomMode`, `preservePitch`, `volume`, `playbackRate` are serialised to `data-*` attrs by the hook so the Astro script can read them per-container without prop threading.
- **No waveform variant built**: Deferred — it's a separate visual component, not a behavior flag.
- **`makeDistortionCurve` uses `ArrayBuffer` constructor**: `new Float32Array(n)` returns `Float32Array<ArrayBufferLike>` which TypeScript rejects for `WaveShaperNode.curve`. Fixed by `new Float32Array(new ArrayBuffer(n * 4))`.

---

## 2026/06/23 - Separator fix, Alert, Banner, chip/tag docs, Icon fix

### Decisions
- **Separator modifier mismatch**: `modifier: true` emits flat classes (`separator--solid`) but CSS expected namespaced classes (`separator--variant-solid`). Fixed by switching to `modifier: "variant"` and `modifier: "strength"`. Removed dead `labelPosition` prop entirely.
- **Separator color channel**: dashed + solid both now read `--separator--color: var(--border--{strength})` written by hook, instead of `border-color: inherit` (which pulled from parent text color).
- **Spacer hook broken API**: `useBaseCompose` was called with `class` key and destructured `{ props }` which the fn never returns. Fixed to use `{ className }` and destructure `{ className, style, attrs }`.
- **Alert/Banner as block feedback**: Both extend `FeedbackProps` but Omit `size`/`pulse`/`placement` — alerts and banners don't scale like pill indicators. `feedback.css` layout overridden (`display`, `width`, `white-space`) in each component's CSS.
- **Alert ARIA role baked in**: `role="alert"` for `color="danger"|"warning"`, `role="status"` for all others. Not left to consumers.
- **Banner `aria-label` extraction**: Destructured `aria-label` before `useFeedback` to avoid TypeScript `{}` inference from `rest["aria-label"]` lookup.
- **Dismiss is pure HTML**: No `client.ts`. Dismiss button renders; consumer wires the one-line click handler. Avoids View Transitions re-init complexity.
- **Icon hook wrong API**: `resolveTokens` was destructured as `{ class, style, attributes }` (old API). Correct return is `{ style, classes }`. `useBaseCompose` was called with raw `rest` instead of `{ className, style }` options. Size modifier classes (`icon--md` etc.) were never emitting.

### New/updated files
```
src/design/layout/components/separator/separator.tokens.ts   modifier fix
src/design/layout/components/separator/separator.props.ts    removed labelPosition
src/design/layout/components/separator/separator.hook.ts     rewrite; --separator--color channel
src/design/layout/components/separator/separator.css         reads channel; dashed fix
src/design/layout/components/spacer/spacer.hook.ts           useBaseCompose API fix
src/design/feedback/components/alert/*                       new (5 files)
src/design/feedback/components/banner/*                      new (5 files)
src/content/docs/feedback/chip.mdx                           new
src/content/docs/feedback/tag.mdx                            new
src/content/docs/feedback/alert.mdx                          new
src/content/docs/feedback/banner.mdx                         new
src/design/assets/components/icon/icon.hook.ts               resolveTokens + useBaseCompose API fix
```

-----------------------------------------------

## 2026/06/23 - Typecheck pass: 29 errors fixed

Ran `pnpm astro check` and resolved all 29 type errors across the codebase.

### Decisions
- **`Record<string, unknown>` cast on spreads**: Badge, Tile, TabPanel, Step, Tabs all spread hook-returned props onto Astro elements. With `exactOptionalPropertyTypes: true`, the union/widened types from `HTMLAttributes<union>` can't satisfy the strict element types. Cast to `Record<string, unknown>` at the spread site rather than rewriting the return types — the runtime values are correct, only the TS inference is too wide.
- **`imgLoading` instead of `loading` on ImageProps**: `BaseComponentProps.loading` is `boolean` (skeleton state). `ImageProps` needed `"lazy" | "eager"` for the HTML `loading` attribute. Renamed to `imgLoading` in props/hook to avoid the interface conflict; hook maps it back to `loading` on the `<img>` element.
- **`OverlayAnimation` type defined locally**: The type was referenced but never imported or declared. Defined as a local string union (`"fade" | "slide-up" | "slide-down" | "scale"`) in `overlay.props.ts` alongside the missing `BaseComponentProps` import. Kept narrow — can be extracted to `overlay.tokens.ts` if an Overlays category is built out.
- **Conditional spreads for exactOptional**: Breadcrumbs, Tabs, Stepper pass optional props (href, disabled, description) from data arrays. Instead of always passing `prop={value | undefined}`, switched to `{...(value !== undefined ? { prop: value } : {})}` to satisfy strict optional semantics.
- **Missing surface index files**: `surfaces/components/{card,paper,tile}/index.ts` didn't exist but were re-exported from the category barrel. Created minimal index files exporting props + tokens only (no `.astro` components — those aren't type-importable via barrel).
- **`SyntheticEvent` in asset.props.ts**: React type referenced without React. Replaced with native `Event`.
- **`as const` on role strings**: `role: "tablist"` / `role: "tabpanel"` typed as `string` in hook return objects. Added `as const` so Astro sees the literal `AriaRole` type.

-----------------------------------------------

## 2026/06/23 - Alert and Banner components

Built Alert and Banner as block-level feedback components from empty stubs.

### Decisions
- **No cross-category imports**: dismiss buttons use bare `<button class="alert__dismiss">` + inline SVG instead of importing `<Button>` from triggers. Consistent with DS idiom; avoids circular dep risk.
- **Alert ARIA role is dynamic**: `role="alert"` for `color="danger"|"warning"` (assertive), `role="status"` for all others (polite). This is baked into the hook, not left to consumers.
- **Banner ARIA**: `role="region"` + `aria-label` (defaults to "Page notification"). Consumers should override `aria-label` when purpose is specific.
- **Layout override**: `feedback.css` is designed for inline-flex pill indicators. Both components override `display`, `width`, `white-space`, `padding` in their own CSS to become block message boxes while still inheriting variant + color channel rules.
- **No size token for alert/banner**: Omitted `size` from FeedbackProps (Omit'd from base). Alerts and banners don't scale like badges/chips. No size CSS rules.
- **`radius: "md"` for alert, `"none"` for banner**: Alert is contained, so slight rounding fits. Banner is edge-to-edge, so no radius.
- **Dismiss is pure HTML**: No client.ts file added. The dismiss button is rendered; wiring up click-to-hide is the consumer's responsibility (one line of JS). This was intentional to avoid View Transitions re-init complexity.
- **Banner `aria-label` extraction**: Destructured `aria-label` from props before passing to `useFeedback` to avoid TypeScript `{}` type inference issue from `rest["aria-label"]` lookup.

### New files
```
src/design/feedback/components/alert/alert.tokens.ts
src/design/feedback/components/alert/alert.props.ts
src/design/feedback/components/alert/alert.hook.ts
src/design/feedback/components/alert/alert.css
src/design/feedback/components/alert/Alert.astro
src/design/feedback/components/banner/banner.tokens.ts
src/design/feedback/components/banner/banner.props.ts
src/design/feedback/components/banner/banner.hook.ts
src/design/feedback/components/banner/banner.css
src/design/feedback/components/banner/Banner.astro
```

-----------------------------------------------

## 2026/06/22 to 2026/06/22 - Antigravity session

See:
- [Session Summary](./antigravity_session_summary.md/622-622_update_branding_logos.md)

### New files
```
ai/antigravity_session_summary.md/622-622_update_branding_logos.md
```

### Updated files
```
src/layouts/Head.astro                  Updated favicon and OG image to new blue transparent icon
src/layouts/docs/DocsLayout.astro       Updated navigation logo to icon-blue-transparent.png
src/pages/index.astro                   Updated main landing page logo to horizontal-blue.png, removed redundant h1
```

-----------------------------------------------

## 2026/06/22 - Claude chat

See: [Session Summary](./claude_session_summary.md/622_css_registry_update.md)

### Updated files
```
design/shared/primitives.definitions.ts   vivid/deep for semantic roles; tertiary;
                                           NEUTRAL_ROLE const; HIGH_CONTRAST_TOKENS;
                                           PRINT_TOKENS; TokenBlock mediaQuery field;
                                           NEUTRAL_ROLE spread into :root block
plugins/tokens.ts                          buildCSS handles mediaQuery wrapping
design/shared/base.hook.ts                stale vivid/deep comment removed
```

-----------------------------------------------

## 2026/06/20 to 2026/06/21 - Antigravity session

See:

- [Session Summary](./antigravity_session_summary.md/620-621_layout_feedback_components.md)

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
ai/antigravity_session_summary.md/620-621_layout_feedback_components.md
```

### Updated files
```
src/layouts/docs/docs-layout.css             Renamed .header to .docs-page-header
src/layouts/docs/DocsLayout.astro            Updated class to docs-page-header
src/design/layout/layout.hook.ts             Imported layout.css
src/design/layout/components/header/Header.astro  Removed manual layout.css import
src/content/docs/feedback/badge.mdx          Added live previews
```

-----------------------------------------------

## 2026/06/20 to 2026/06/22 - Claude project chat

See:

- [Session Summary](./claude_session_summary.md/620-622_data_and_cssregistry.md)

### New files
```
design/data/data.tokens.ts
design/data/data.props.ts
design/data/data.hook.ts
design/data/data.css
design/data/data.utils.ts
design/data/table/table.tokens.ts
design/data/table/table.props.ts
design/data/table/table.hook.ts
design/data/table/table.css
design/data/table/Table.astro
design/data/table/table.client.ts
design/data/table/parts/table-parts.props.ts
design/data/table/parts/TableHead.astro
design/data/table/parts/TableBody.astro
design/data/table/parts/TableFoot.astro
design/data/table/parts/TableRow.astro
design/data/table/parts/TableCell.astro
design/data/list/list.tokens.ts
design/data/list/list.props.ts
design/data/list/list.hook.ts
design/data/list/list.css
design/data/list/List.astro
design/data/list/list.client.ts
design/shared/components/skeleton/skeleton.tokens.ts
design/shared/components/skeleton/skeleton.props.ts
design/shared/components/skeleton/skeleton.hook.ts
design/shared/components/skeleton/skeleton.css
design/shared/components/skeleton/Skeleton.astro
design/shared/primitives.definitions.ts
plugins/tokens.ts
docs/data-category.mdx
docs/table.mdx
ai/agent_decision_log.md  ← this file
```

### Updated files
```
design/shared/base.props.ts     bg narrowed to ColorRole; loading added
design/shared/base.hook.ts      resolveColorRole added; data-loading in useBaseCompose
design/data/data.props.ts       loading removed (inherited from base)
design/data/data.hook.ts        style consumed; manual data-loading removed
design/data/table/table.hook.ts wrapper div pattern
design/data/table/Table.astro   sort buttons; selectable name/value; isSelectable fix
design/data/table/table.client.ts  dataset.selected; correct selectors; sort handler
design/data/list/List.astro     selection vs to-do checkbox distinction
design/data/list/list.client.ts dataset.selected persistence
```

-----------------------------------------------

## 2026/06/20 - Antigravity session

See:

- [Session Summary](./antigravity_session_summary.md/620-622_nav_components_and_docs.md)

### New files
```
src/design/nav/nav.tokens.ts
src/design/nav/nav.props.ts
src/design/nav/nav.hook.ts
src/design/nav/nav.css
src/design/nav/components/menu/*
src/design/nav/components/pagination/*
src/design/nav/components/tabs/*
src/design/nav/components/breadcrumbs/*
src/design/nav/components/stepper/*
src/design/nav/components/navbar/*
src/content/docs/nav/menu.mdx
src/content/docs/nav/pagination.mdx
src/content/docs/nav/tabs.mdx
src/content/docs/nav/breadcrumbs.mdx
src/content/docs/nav/stepper.mdx
src/content/docs/nav/navbar.mdx
ai/antigravity_session_summary.md/620-622_nav_components_and_docs.md
```

### Updated files
```
src/layouts/docs/DocsLayout.astro                    Added ThemeToggle and Breadcrumbs
src/layouts/docs/docs-layout.css                     Styling updates
src/design/feedback/components/spinner/spinner.*     Added color="inherit" support
src/content/docs/feedback/*.mdx                      Wrapped live previews
src/content/docs/forms/*.mdx                         Wrapped live previews
```

------------------------------------------------

2026/06/17 - 15:00:00 - Antigravity

Added Feature XYZ
  - Reason for adding it
  - Problems solved
  - Tradeoffs made
  - Alternatives considered
  - Files affected: 
    - [filepath1]
    - [filepath2]

-----------------------------------------------------

2026/06/17 - 11:00:00 - Claude

Refactored Code ABC
  - Reason for refactoring
  - Problems solved
  - Alternatives considered
  - Files affected: 
    - [filepath1]
    - [filepath2]

----------------------------------------------------

2026/06/17 - 09:00:00 - Bob

Removed Feature 123
  - Reason for removing it
  - Problems solved
  - Tradeoffs made
  - Alternatives considered
  - Files affected: 
    - [filepath1]
    - [filepath2]

---------------------------------------------------