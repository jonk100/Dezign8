// design/forms/search/search.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Search component.
 * @module design/forms/search
 *
 * Search introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec and re-exports it under a component alias.
 *
 * @remarks
 * **Search vs Input:**
 * Search is not a wrapper around Input — sibling components cannot import
 * from each other. Both call {@link useForm} directly and follow the same
 * wrapper/control split pattern. The differences are:
 * - Default `type` is `"search"`
 * - A clear button is built into the component (JS-driven, auto-hides)
 * - A `loading` prop shows a spinner in the trailing position
 * - Escape key clears the input (handled by the component script)
 *
 * All structural and visual token logic is identical to Input.
 *
 * **`loading` is not a token dimension.**
 * It emits a class modifier (`search--loading`) and a `data-loading`
 * attribute directly in {@link useSearch}, same as `disabled`/`invalid`.
 * CSS drives the spinner visibility; no CSS custom property is needed.
 *
 * @see {@link FORM_TOKENS}   in `forms/forms.tokens.ts`
 * @see {@link SearchProps}   in `forms/search/search.props.ts`
 * @see {@link useSearch}     in `forms/search/search.hook.ts`
 *
 * @todo Add `shortcut?: string` prop (e.g. `"/"` or `"⌘K"`) as a display-only
 *   badge in the end position. A pure display concern — no token dimension needed,
 *   just a conditional render in `Search.astro` when the prop is set.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Search token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as SEARCH_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type SearchSize    = FormSize;
/** @see {@link FormVariant} */
export type SearchVariant = FormVariant;
/** @see {@link FormColor} */
export type SearchColor   = FormColor;
/** @see {@link FormRadius} */
export type SearchRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Search component.
 *
 * `fullWidth` defaults to `true` for Search — a search input almost always
 * spans the full width of its container. Override with `fullWidth={false}`
 * for inline or constrained-width contexts.
 *
 * @see {@link useSearch} in `forms/search/search.hook.ts`
 */
export const SEARCH_DEFAULTS = {
  fullWidth: true,
  loading:   false,
} as const;
