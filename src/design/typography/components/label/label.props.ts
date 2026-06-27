// design/typography/label/label.props.ts

/**
 * @file Prop interface for the Label component.
 * @module design/typography/label
 *
 * {@link LabelProps} extends {@link TypographyProps} and narrows two
 * dimensions (size → fixed scale, weight → limited range) while adding
 * the two props unique to a `<label>` element: `for` and `required`.
 *
 * **`for` is not aliased to `htmlFor`:**
 * Astro templates use native HTML attribute names, not React camelCase.
 * The prop is named `for` (valid in TypeScript interface definitions even
 * though `for` is a reserved keyword) and passes through to the rendered
 * `<label for="…">` attribute without aliasing. When destructuring in the
 * hook, use `const { "for": _for, ... }` if needed, or let it flow through
 * `rest` naturally.
 *
 * **`required` is visual-only:**
 * `required` on Label renders a visible `*` indicator beside the label text
 * (as an `aria-hidden` span). It does NOT set `aria-required` — that belongs
 * on the form control (Input, Select, etc.). The indicator is for sighted
 * users; screen readers get requirement information from the control's own
 * ARIA attributes.
 *
 * @see {@link TypographyProps}  in `typography/typography.props.ts` — parent
 * @see {@link LabelSize}        in `typography/label/label.tokens.ts`
 * @see {@link LabelWeight}      in `typography/label/label.tokens.ts`
 * @see {@link LABEL_DEFAULTS}   in `typography/label/label.tokens.ts`
 * @see {@link useLabel}         in `typography/label/label.hook.ts`
 */

import type { TypographyProps } from "../../typography.props";
import type { LabelSize, LabelWeight } from "./label.tokens";

/**
 * Props for the `<Label>` component.
 *
 * @example
 * ```astro
 * <!-- Basic -->
 * <Label for="email">Email address</Label>
 *
 * <!-- Required field indicator -->
 * <Label for="email" required>Email address</Label>
 *
 * <!-- Custom size and weight -->
 * <Label for="search" size="xs" weight="normal" color="secondary">
 *   Search query
 * </Label>
 *
 * <!-- Inside a Field -->
 * <Field id="email">
 *   <Label slot="label" for="email" required>Email</Label>
 *   <Input id="email" name="email" required />
 * </Field>
 * ```
 *
 * @see {@link TypographyProps} — inherited typography dimensions
 * @see {@link useLabel}        — resolves these props at runtime
 */
import type { IconProps } from "~/shared/icon.props";

export interface LabelProps extends TypographyProps, IconProps {
  /**
   * The `id` of the form control this label is associated with.
   *
   * Sets the native `for` attribute on the rendered `<label>` element,
   * creating an accessible association between the label text and its
   * control. Clicking the label focuses the control.
   *
   * @remarks
   * Not required when Label is a child of a `<label>`-wrapping component
   * (Checkbox, Radio), since those components use `<label>` as their root
   * element and the association is implicit. Use `for` when Label is used
   * with Input, Select, or other controls that render a separate element.
   *
   * @example `for="email"` — associates with `<input id="email">`
   */
  for?: string;

  /**
   * Whether to show the required field indicator (`*`) beside the label text.
   *
   * When `true`, renders `<span class="label__required" aria-hidden="true">*</span>`
   * after the label content. The `aria-hidden` attribute hides the asterisk
   * from screen readers — screen readers get required-field information from
   * `aria-required="true"` on the control, not from a visual symbol.
   *
   * @remarks
   * Set `required` on both Label (for the visual indicator) AND on the
   * control (for native browser validation and `aria-required`).
   *
   * @default false
   */
  required?: boolean;

  /**
   * Font size — uses the fixed scale ({@link TEXT_SIZE_FIXED}), not the
   * responsive scale ({@link TEXT_SIZE}) used by Text and Heading.
   *
   * @default `"sm"` — applied by {@link useLabel}
   */
  size?: LabelSize;

  /**
   * Font weight — narrowed from the full typography weight range.
   * `"bold"` and `"black"` are excluded.
   *
   * @default `"medium"` — applied by {@link useLabel}
   */
  weight?: LabelWeight;
}