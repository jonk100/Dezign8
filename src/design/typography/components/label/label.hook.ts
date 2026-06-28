// design/typography/label/label.hook.ts

/**
 * @file Component hook for the Label component.
 * @module design/typography/label
 *
 * {@link useLabel} resolves {@link LabelProps} using Pattern B — it calls
 * `resolveTokens(LABEL_TOKENS, ...)` directly rather than delegating to
 * {@link useTypography}. This is required because {@link LABEL_TOKENS}
 * overrides the `size` dimension to use {@link TEXT_SIZE_FIXED} (fixed scale)
 * instead of the {@link TEXT_SIZE} (responsive scale) that `useTypography`
 * and `TYPOGRAPHY_TOKENS` use.
 *
 * If Label delegated to `useTypography`, the call chain would be:
 * ```
 * useLabel → useTypography → resolveTokens(TYPOGRAPHY_TOKENS, ...)
 *                                                ↑
 *                              uses TEXT_SIZE (responsive --fs--sm)
 *                              NOT TEXT_SIZE_FIXED (fixed --fsf--sm)
 * ```
 *
 * By calling `resolveTokens(LABEL_TOKENS, ...)` directly, the correct
 * fixed-scale value is written to `--typography--size`.
 *
 * **`for` passthrough:**
 * The `for` prop (naming a reserved keyword is valid in TypeScript interfaces
 * and object destructuring) is destructured and re-applied to the element
 * explicitly so TypeScript doesn't complain about it in `rest`. In Astro
 * templates, `for` is the correct attribute name — no `htmlFor` aliasing.
 *
 * **`required` return value:**
 * `required` is returned separately (not in `props`) so `Label.astro` can
 * conditionally render the `aria-hidden` asterisk span without accessing
 * `Astro.props` directly in the template.
 *
 * @see {@link LABEL_TOKENS}   in `typography/label/label.tokens.ts` — spec
 * @see {@link useTypography}  in `typography/typography.hook.ts`     — NOT called
 * @see {@link useBaseCompose} in `shared/base.hook.ts`               — class/style
 * @see `typography/label/Label.astro` — consumes this hook
 */

import type { LabelProps }  from "./label.props";
import { LABEL_TOKENS, LABEL_DEFAULTS } from "./label.tokens";
import { resolveTokens }   from "~/shared/tokens";
import { useBaseCompose }  from "~/shared/base.hook";

/**
 * Resolves {@link LabelProps} into element attributes and a `required` flag.
 *
 * @param props - Full `LabelProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"label"`.
 *
 * **`props`** — Attributes for the `<label>` element:
 * - `class` — `"typography label"` plus token modifier classes
 * - `style` — `"--typography--size: var(--fsf--sm); …"` (fixed-scale channels)
 * - `for`   — the associated control's id (when provided)
 *
 * **`required`** — `true` when the field is required. `Label.astro` uses
 * this to conditionally render the `aria-hidden` asterisk indicator.
 *
 * @example
 * ```astro
 * ---
 * // Label.astro
 * const { Tag, props, required } = useLabel(Astro.props as LabelProps);
 * ---
 * <Tag {...props}>
 *   <slot />
 *   {required && <span class="label__required" aria-hidden="true">*</span>}
 * </Tag>
 * ```
 */
export function useLabel(props: LabelProps) {
  const {
    // Label-specific props
    for: htmlFor,
    required = false,
    icon,
    // Typography token props — with label-specific defaults
    size     = LABEL_DEFAULTS.size,
    weight   = LABEL_DEFAULTS.weight,
    // Remaining typography props (no label-specific defaults)
    color,
    align,
    leading,
    tracking,
    fam,
    transform,
    wrap,
    decoration,
    fontStyle,
    clamp,
    truncate = false,
    // Base props
    class: className,
    v:        _v,
    testId:   _testId,
    bg,
    ...base
  } = props;

  // ── Token resolution ─────────────────────────────────────────────────────
  //
  // LABEL_TOKENS overrides the `size` dimension to use TEXT_SIZE_FIXED.
  // resolveTokens writes --typography--size: var(--fsf--sm) (fixed),
  // not var(--fs--sm) (responsive). Same channel key, different value.
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    LABEL_TOKENS,
    { size, weight, color, align, leading, tracking, fam, transform, wrap, decoration, style: fontStyle },
    "typography",
  );

  const { className: cls, style, attrs, rest: restAttrs } = useBaseCompose(
    {
      className: [
        "typography",
        "label",
        ...tokenClasses,
        clamp    != null && "typography--clamped",
        truncate          && "typography--truncate",
        className,
      ],
      style: [
        ...tokenStyle,
        clamp != null && `--typography--clamp: ${clamp}`,
        bg            && `--typography--bg: ${bg}`,
      ],
    },
    base,
  );

  return {
    Tag: "label" as const,
    props: {
      class: cls,
      style,
      ...attrs,
      ...restAttrs,
      // `for` is explicitly re-applied after rest so it's not shadowed.
      // In Astro (HTML attribute mode), `for` is correct — no `htmlFor`.
      for: htmlFor,
    },
    // Returned separately for Label.astro's conditional asterisk rendering
    required,
  };
}