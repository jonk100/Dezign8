// design/typography/label/label.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Label component.
 * @module design/typography/label
 *
 * Label uses `composeTokens` to extend {@link TYPOGRAPHY_TOKENS} with two
 * overrides: a fixed (non-responsive) size scale and a narrowed weight range.
 *
 * **Why a fixed size scale:**
 * Typography components like Text and Heading use {@link TEXT_SIZE} —
 * a responsive scale where values may use `clamp()` to grow with the
 * viewport. Labels sit inside form fields and must NOT reflow; a label
 * that grows with the viewport would break tightly composed field layouts.
 * {@link TEXT_SIZE_FIXED} uses `--fsf--*` variables whose values are
 * absolute (px or rem without clamp) and are defined independently of
 * the responsive type scale.
 *
 * **Why `resolveTokens` must be called directly:**
 * Unlike Heading (which delegates to `useTypography`), Label cannot delegate
 * and achieve the fixed scale. `useTypography` calls
 * `resolveTokens(TYPOGRAPHY_TOKENS, ...)`, which would write
 * `var(--fs--sm)` (responsive) for `size="sm"`. Label needs
 * `var(--fsf--sm)` (fixed). Calling `resolveTokens(LABEL_TOKENS, ...)`
 * directly in `useLabel` writes the correct fixed value.
 *
 * This is Pattern B from the architecture: extended/modified tokens require
 * calling `resolveTokens` directly rather than delegating to the category hook.
 *
 * @see {@link TYPOGRAPHY_TOKENS} in `typography/typography.tokens.ts` — base spec
 * @see {@link TEXT_SIZE_FIXED}   in `shared/primitives.tokens.ts`     — fixed scale
 * @see {@link useLabel}          in `typography/label/label.hook.ts`  — resolves directly
 * @see {@link LabelProps}        in `typography/label/label.props.ts`
 *
 * @todo If the responsive Text component ever needs an `inline` variant that
 *   behaves like a label (fixed size, tight spacing), consider whether
 *   TEXT_SIZE_FIXED belongs in the component or should be promoted to a
 *   shared Label-like base. For now: YAGNI.
 */

import { composeTokens, dimension, pickValues } from "~/shared/tokens";
import { TYPOGRAPHY_TOKENS }                    from "../../typography.tokens";
import { TEXT_SIZE_FIXED, WEIGHT_DIM }          from "~/shared/primitives.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Label token spec.
 *
 * Extends {@link TYPOGRAPHY_TOKENS} with two overrides:
 *
 * **`size`** — replaced with a narrowed slice of {@link TEXT_SIZE_FIXED}.
 * Labels rarely need sizes above `xl`; the full `2xl`–`4xl` range of the
 * fixed scale is excluded.
 *
 * **`weight`** — narrowed to `normal | medium | semibold`.
 * Labels should never be `bold` (too heavy for a field label); `black` is
 * also excluded. Medium or semibold are the typical label weights.
 *
 * All other dimensions (color, align, leading, tracking, fam, transform, etc.)
 * are inherited from {@link TYPOGRAPHY_TOKENS} unchanged.
 *
 * @remarks
 * The `size` override uses `dimension("size", TEXT_SIZE_FIXED)` with the same
 * channel key `"size"`, so `resolveTokens` still writes `--typography--size`.
 * The difference is that the resolved VALUE comes from `--fsf--*` (fixed)
 * rather than `--fs--*` (responsive). `typography.css` reads the channel the
 * same way regardless of which scale provided the value.
 */
export const LABEL_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
  size: pickValues(
    dimension("size", TEXT_SIZE_FIXED),
    ["2xs", "xs", "sm", "md", "lg", "xl"] as const,
  ),
  weight: pickValues(WEIGHT_DIM, ["normal", "medium", "semibold"] as const),
});

// ─── DERIVED TYPES ────────────────────────────────────────────────────────────

/**
 * Valid font-size values for Label — a fixed-scale subset.
 * Derived from {@link LABEL_TOKENS} — never hand-written.
 * @default `"sm"` — applied by {@link useLabel}
 */
export type LabelSize = keyof typeof LABEL_TOKENS.size.values;

/**
 * Valid font-weight values for Label — narrower than the full typography spec.
 * Derived from {@link LABEL_TOKENS} — never hand-written.
 * `"bold"` and `"black"` are intentionally excluded (too heavy for labels).
 * @default `"medium"` — applied by {@link useLabel}
 */
export type LabelWeight = keyof typeof LABEL_TOKENS.weight.values;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Label component.
 *
 * `"sm"` at the fixed scale maps to `--fsf--sm` — a compact, readable size
 * appropriate for field labels in most form contexts.
 *
 * @see {@link useLabel} in `typography/label/label.hook.ts`
 */
export const LABEL_DEFAULTS = {
  size:   "sm"     as LabelSize,
  weight: "medium" as LabelWeight,
} as const;