// design/forms/forms.tokens.ts

/**
 * @file Category token spec for the forms component family.
 * @module design/forms
 *
 * This file is the single source of truth for which token dimensions the
 * `forms` category exposes and what values each accepts. It follows the
 * same shape as every other category tokens file: assemble from primitives,
 * export the spec and derived types. No defaults, no runtime logic.
 *
 * **What this file owns:**
 * - {@link FORM_SIZE} — local spatial size scale (control height tiers)
 * - {@link FORM_VARIANT} — local variant scale (visual treatment names)
 * - {@link FORM_TOKENS} — the assembled category spec
 * - {@link FormSize}, {@link FormVariant}, {@link FormColor}, {@link FormRadius}
 *   — derived union types consumed by {@link FormProps} and component props
 *
 * **What this file does NOT own:**
 * - Defaults — those live inline in {@link useForm} (category hook)
 *   and in each component's `*_DEFAULTS` constant (component tokens file)
 * - Component-specific dimensions — those live in each component's
 *   `*.tokens.ts` via {@link composeTokens}
 * - CSS values — token values reference CSS vars; CSS vars are defined
 *   in `vars.css` / `tokens.css`
 *
 * **Architecture position:**
 * ```
 * primitives.tokens.ts      SPACE, RADIUS_DIM, COLOR_DIM …
 *        ↑
 * forms/forms.tokens.ts     FORM_TOKENS   ← this file
 *        ↑
 * forms/input/input.tokens.ts    re-export or composeTokens
 * forms/select/select.tokens.ts  re-export or composeTokens
 * …
 * ```
 *
 * @see {@link useForm} in `forms/forms.hook.ts` — resolves this spec
 * @see {@link FormProps} in `forms/forms.props.ts` — typed prop surface
 * @see {@link LAYOUT_TOKENS} in `layout/layout.tokens.ts` — structural equivalent
 * @see `color-typescript.md` — color channel architecture (COLOR_DIM behavior)
 * @see `css-compound.md` — compound-prop patterns used by size and variant
 *
 * @todo Add `boxed` to {@link FORM_VARIANT} when ready. Value is `null`,
 *   CSS-only addition in `forms.css` and each component's CSS. No TS changes.
 *
 * @todo Verify {@link COLOR_ROLE} in `primitives.tokens.ts` uses `null`
 *   values for all roles (per `color-typescript.md`). The current file has
 *   CSS-var values which causes {@link resolveTokens} to emit both a class
 *   modifier AND a `--form--color` CSS custom property. The correct behavior
 *   is class-modifier only. See `primitives.tokens.ADDITIONS.ts` for the fix.
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM, COLOR_DIM }          from "~/shared/primitives.tokens";

// ─── SCALES (local to forms) ─────────────────────────────────────────────────
//
// These are NOT promoted to `primitives.tokens.ts` because they are specific
// to the forms category. If another category needs the same values in the
// future, promote them to primitives then (YAGNI).

/**
 * Spatial size scale for form controls.
 *
 * Represents the **overall height tier** of a control — not a font size.
 * The CSS reads `var(--form--size)` and derives `font-size`, `padding-block`,
 * `padding-inline`, and `min-height` proportionally via compound-size rules
 * in `forms.css`.
 *
 * @remarks
 * This scale is intentionally separate from the control/trigger size scale
 * (`--control--size`). Form controls and action controls share visual rhythm
 * but resolve to different CSS variable families. If they converge, promote
 * to `primitives.tokens.ts` and share the dimension.
 *
 * Define the actual pixel/rem values for each step in `vars.css`:
 * ```css
 * --form--sm: 2rem;    
 * --form--md: 2.5rem;  
 * --form--lg: 3rem;    
 * --form--xl: 3.5rem;  
 * ```
 *
 * @see `forms.css` — compound CSS rules that consume `--form--size`
 * @see `css-compound.md` → Size section for the compound-prop pattern
 * @see {@link FormSize} — the derived union type
 */
const FORM_SIZE = scale({
  sm: "var(--form--sm)",
  md: "var(--form--md)",
  lg: "var(--form--lg)",
  xl: "var(--form--xl)",
});

/**
 * Visual treatment variants for form controls.
 *
 * All values are `null` — this dimension emits a **class modifier only**
 * (e.g. `form--outlined`). No CSS custom property is written for variant.
 * All visual rules per variant live in `forms.css`.
 *
 * @remarks
 * **Naming convention:** These names match the control/trigger category exactly
 * (`outlined`, `soft`, `solid`, `ghost`, `dashed`) so that variant intent is
 * system-wide consistent. The _visual expression_ differs per category:
 *
 * | Variant    | Form expression                                               |
 * |------------|---------------------------------------------------------------|
 * | `outlined` | Transparent bg. Colored border on focus. Label sits outside.  |
 * | `soft`     | Muted fill bg (similar to Material "filled"). Light border.   |
 * | `solid`    | Color-role–filled bg. High visual weight. Label outside.      |
 * | `ghost`    | No border. No background. Minimal chrome.                     |
 * | `dashed`   | Dashed border. Transparent background.                        |
 *
 * @see `forms.css` — CSS rules implementing each variant
 * @see `color-css.md` — which color-step channels each variant reads
 * @see {@link FormVariant} — the derived union type
 *
 * @todo `boxed` — sharp radius + heavier border weight. Add `boxed: null`
 *   here and corresponding CSS rules in `forms.css`. No TS ripple.
 */
const FORM_VARIANT = scale({
  outlined: null,
  soft:     null,
  solid:    null,
  ghost:    null,
  dashed:   null,
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

/**
 * Shared token spec for all form controls in the `forms` category.
 *
 * Consumed by {@link useForm} via `resolveTokens(FORM_TOKENS, picks, "form")`.
 *
 * **Channel / output map:**
 *
 * | prop      | `resolveTokens` output          | CSS reads in `forms.css`        |
 * |-----------|---------------------------------|---------------------------------|
 * | `size`    | `--form--size: var(--form--md)` | `font-size`, `padding`, etc.    |
 * | `variant` | class `form--outlined`          | `.form--outlined { … }`         |
 * | `color`   | class `form--primary`           | Color channels from `useForm`   |
 * | `radius`  | `--form--radius: var(…)`        | `border-radius`                 |
 *
 * @remarks
 * `color` uses {@link COLOR_DIM} which has modifier-only null values.
 * `resolveTokens` emits only the class modifier. The seven color-step
 * CSS channels (`--form--color-base`, `--form--color-subtle`, etc.) are
 * written separately by `resolveColorChannels(color, "form")` in
 * {@link useForm}. This separation keeps single responsibility:
 * - {@link resolveTokens} → class
 * - `resolveColorChannels` → CSS vars
 *
 * **Extending this spec in a component:**
 * ```ts
 * // forms/textarea/textarea.tokens.ts
 * import { composeTokens, dimension, scale } from "~/shared/tokens";
 * import { FORM_TOKENS } from "../forms.tokens";
 *
 * const RESIZE = scale({ none: "none", vertical: "vertical", both: "both" });
 *
 * export const TEXTAREA_TOKENS = composeTokens(FORM_TOKENS, {
 *   // scope: "textarea" because only textarea.css reads --textarea--resize
 *   resize: dimension("resize", RESIZE, { scope: "textarea" }),
 * });
 * export type TextareaResize = keyof typeof TEXTAREA_TOKENS.resize.values;
 * ```
 *
 * **Re-exporting unchanged (most components):**
 * ```ts
 * // forms/input/input.tokens.ts
 * export { FORM_TOKENS as INPUT_TOKENS } from "../forms.tokens";
 * export type { FormSize as InputSize, FormVariant as InputVariant } from "../forms.tokens";
 * ```
 *
 * @see {@link FormProps}  in `forms/forms.props.ts`  — prop surface
 * @see {@link useForm}    in `forms/forms.hook.ts`   — resolves this spec
 * @see {@link FORM_SIZE}    — the spatial size scale
 * @see {@link FORM_VARIANT} — the variant scale
 */
export const FORM_TOKENS = defineTokens({
  size:    dimension("size",    FORM_SIZE),
  variant: dimension("variant", FORM_VARIANT, { modifier: true }),
  color:   COLOR_DIM,
  radius:  RADIUS_DIM,
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────
// Always derive from the spec — never hand-write unions.
// Adding a value to FORM_SIZE/FORM_VARIANT automatically updates these types.

/**
 * Valid values for the `size` prop on any form control.
 *
 * Derived from {@link FORM_TOKENS} — never hand-written.
 * Adding a step to {@link FORM_SIZE} automatically extends this union.
 *
 * @default `"md"` — applied by {@link useForm} when prop is omitted
 */
export type FormSize = keyof typeof FORM_TOKENS.size.values;

/**
 * Valid values for the `variant` prop on any form control.
 *
 * Derived from {@link FORM_TOKENS} — never hand-written.
 *
 * @default `"outlined"` — applied by {@link useForm} when prop is omitted
 * @see {@link FORM_VARIANT} for a description of each value's visual behavior
 */
export type FormVariant = keyof typeof FORM_TOKENS.variant.values;

/**
 * Valid color roles for form controls.
 *
 * Derived from {@link COLOR_DIM} via {@link FORM_TOKENS} — never hand-written.
 * Adding a role to `COLOR_ROLE` in `primitives.tokens.ts` automatically
 * extends this union.
 *
 * @default `"primary"` — applied by {@link useForm} when prop is omitted
 * @see `color-overview.md` for a description of each role
 * @see `color-typescript.md` for how `resolveColorChannels` uses this
 */
export type FormColor = keyof typeof FORM_TOKENS.color.values;

/**
 * Valid border-radius values for form controls.
 *
 * Derived from {@link RADIUS_DIM} via {@link FORM_TOKENS} — never hand-written.
 * Adding a step to `RADIUS` in `primitives.tokens.ts` automatically extends
 * this union.
 *
 * @default `"md"` — applied by {@link useForm} when prop is omitted
 */
export type FormRadius = keyof typeof FORM_TOKENS.radius.values;
