// design/forms/forms.hook.ts

/**
 * @file Category hook for the forms component family.
 * @module design/forms
 *
 * {@link useForm} is the single point of contact with {@link resolveTokens}
 * for all form controls. It converts {@link FormProps} into a "bag of
 * resolved material" — classes, styles, ARIA attrs — that component hooks
 * compose from. No component hook calls `resolveTokens` on `FORM_TOKENS`
 * directly; they all delegate here.
 *
 * **Delegation model:**
 * ```
 *                  useForm(FormProps)
 *                 ╱        |         ╲
 *         useInput   useSelect    useCheckbox   useRadio
 *           ↓              ↓            ↓            ↓
 *       { Tag, props } (ready to spread in *.astro)
 * ```
 *
 * **Return shape:**
 * `useForm` does NOT return `{ Tag, props }`. It returns a bag:
 * ```ts
 * {
 *   formClass: string,           // "form form--outlined form--primary"
 *   formStyle: string,           // "--form--size: …; --form--radius: …; …"
 *   formAttrs: Record<…>,        // aria-disabled, aria-invalid, data-*, etc.
 *   disabled:  boolean,          // component hook adds native `disabled` attr
 *   required:  boolean,          // component hook adds native `required` attr
 *   invalid:   boolean,          // component hook may need for conditional logic
 *   rest:      Record<…>,        // remaining props to forward to the element
 * }
 * ```
 * Component hooks compose `formClass` with their own classes, add native
 * HTML attributes from `disabled` / `required`, pick what they need from
 * `rest`, and return the final `{ Tag, props }`.
 *
 * **ARIA responsibility split:**
 * `useForm` emits the ARIA and data attributes that are safe on ALL form
 * controls regardless of element type:
 * - `aria-disabled` + `data-disabled` ← from `disabled` prop
 * - `aria-required`                   ← from `required` prop
 * - `aria-invalid` + `data-invalid`   ← from `invalid` prop
 *
 * Component hooks add the native `disabled` and `required` HTML attributes
 * because those are only valid on `<input>`, `<select>`, `<textarea>`,
 * not on structural wrapper elements.
 *
 * **Color channel separation:**
 * `resolveTokens` handles the class modifier for `color` (e.g. `form--primary`).
 * `resolveColorChannels` (when implemented) handles the seven CSS channel vars
 * (`--form--color-base`, `--form--color-subtle`, etc.). Both are called here
 * so CSS can read the role's color values via the variant rules in `forms.css`.
 *
 * @see {@link FORM_TOKENS}  in `forms/forms.tokens.ts` — spec being resolved
 * @see {@link FormProps}    in `forms/forms.props.ts`  — input type
 * @see {@link useInput}     in `forms/input/input.hook.ts`    — example delegate
 * @see {@link useSelect}    in `forms/select/select.hook.ts`  — example delegate
 * @see {@link useCheckbox}  in `forms/checkbox/checkbox.hook.ts`
 * @see {@link useRadio}     in `forms/radio/radio.hook.ts`
 * @see `color-typescript.md` — full color channel architecture and
 *   `resolveColorChannels` implementation spec
 * @see `css-compound.md` — compound-prop patterns (size, variant)
 *
 * @todo Implement `resolveColorChannels` in `~/shared/primitives.tokens` per
 *   `color-typescript.md`, then:
 *   1. Add `import { resolveColorChannels } from "~/shared/primitives.tokens"`
 *   2. Uncomment the `resolveColorChannels` call in {@link useForm}
 *   3. Uncomment the `...colorStyle` spread in the style array
 *   No other changes needed — the hook is otherwise structured for it.
 */

import type { FormProps } from "./forms.props";
import { FORM_TOKENS } from "./forms.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

// @todo Import resolveColorChannels once available:
// import { resolveColorChannels } from "~/shared/primitives.tokens";

/**
 * Resolves {@link FormProps} into the resolved classes, inline styles,
 * and ARIA/data attributes that all form control component hooks build from.
 *
 * @param props - A {@link FormProps} value, or any interface that extends it
 *   (e.g. `InputProps`, `SelectProps`). Extra component-specific props are
 *   not consumed here — they stay in `rest` for the component hook.
 *
 * @returns
 * An object with the following shape:
 *
 * | key         | type     | description                                        |
 * |-------------|----------|----------------------------------------------------|
 * | `formClass` | `string` | Resolved class string. Compose with component class.|
 * | `formStyle` | `string` | Resolved inline style string (CSS channel vars).   |
 * | `formAttrs` | `object` | Safe ARIA + data attributes. Spread onto element.  |
 * | `disabled`  | `boolean`| Add native `disabled` attr on `<input>`/`<select>` |
 * | `required`  | `boolean`| Add native `required` attr on `<input>`/`<select>` |
 * | `invalid`   | `boolean`| Use in component hook if conditional logic needed. |
 * | `rest`      | `object` | Remaining un-consumed props. Forward to element.   |
 *
 * @example
 * ```ts
 * // Typical usage in a component hook (e.g. useInput):
 * import { useForm } from "../forms.hook";
 * import { composeClass, composeStyle } from "~/shared/base.hook";
 *
 * export function useInput(props: InputProps) {
 *   const {
 *     type = INPUT_DEFAULTS.type,
 *     value,
 *     placeholder,
 *     readonly,
 *     ...formProps
 *   } = props;
 *
 *   const {
 *     formClass, formStyle, formAttrs,
 *     disabled, required, rest,
 *   } = useForm(formProps);
 *
 *   return {
 *     Tag: "input" as const,
 *     props: {
 *       class:    composeClass(formClass, "input"),
 *       style:    formStyle,
 *       ...formAttrs,
 *       ...rest,
 *       type,
 *       value,
 *       placeholder,
 *       readOnly:  readonly || undefined,
 *       disabled:  disabled  || undefined,  // native HTML attr
 *       required:  required  || undefined,  // native HTML attr
 *     },
 *   };
 * }
 * ```
 *
 * @see {@link FORM_TOKENS}  — the spec being resolved here
 * @see {@link FormProps}    — the full input type
 * @see `forms.css`          — the CSS file reading the channels this writes
 */
export function useForm(props: FormProps) {
  const {
    size = "md",
    variant = "outlined",
    color = "primary",
    radius = "md",
    disabled = false,
    required = false,
    invalid = false,
    fullWidth = false,
    class: className,
    v: _v,
    testId: _testId,
    bg,
    ...base
  } = props;

  // ── Token resolution ─────────────────────────────────────────────────────
  //
  // Emits:
  //   --form--size: var(--form--md)        ← size channel
  //   --form--radius: var(--radius-md)     ← radius channel
  //   form--outlined                       ← variant modifier class
  //   form--primary                        ← color modifier class
  //
  // Note: color's null values in COLOR_ROLE mean no CSS var is emitted
  // for color by resolveTokens — only the class modifier. Color CSS vars
  // are written by resolveColorChannels below.
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FORM_TOKENS,
    { size, variant, color, radius },
    "form",
  );

  // ── Color channel resolution ─────────────────────────────────────────────
  //
  // resolveColorChannels writes the seven semantic color channels that
  // forms.css reads per variant + state:
  //   --form--color-subtle   background for soft/outlined rest states
  //   --form--color-muted    background for hover on soft variants
  //   --form--color-base     fill for solid variant; border on active
  //   --form--color-vivid    hover on solid variant
  //   --form--color-deep     active/pressed state
  //   --form--color-border   border color for outlined/dashed variants
  //   --form--color-text     foreground text on neutral backgrounds
  //
  // @todo Uncomment once resolveColorChannels is exported from primitives:
  // const colorStyle = resolveColorChannels(color, "form");
  //
  // @see color-typescript.md for full implementation spec
  const colorStyle: string[] = []; // ponytail: stub — replace with resolveColorChannels(color, "form")

  // ── ARIA + data attribute construction ───────────────────────────────────
  //
  // Using a mutable object + conditional assignment rather than conditional
  // spreading to stay clean with exactOptionalPropertyTypes: true.
  // These attributes are safe across ALL form control element types.
  //
  // Not included here — added by component hooks because element-specific:
  //   disabled={true}   only valid on <input>, <select>, <button>, <textarea>
  //   required={true}   only valid on <input>, <select>, <textarea>
  const ariaAttrs: Record<string, string> = {};
  if (required) { ariaAttrs["aria-required"] = "true"; }
  if (invalid) { ariaAttrs["aria-invalid"] = "true"; ariaAttrs["data-invalid"] = ""; }

  // ── Class + style composition ─────────────────────────────────────────────
  const { className: cls, style, attrs, rest: restAttrs, spacing } = useBaseCompose(
    {
      className: [
        "form",
        ...tokenClasses,                          // form--outlined, form--primary
        disabled && "form--disabled",            // CSS: pointer-events, opacity
        invalid && "form--invalid",             // CSS: error-state ring/border
        fullWidth && "form--full-width",          // CSS: width: 100%
        className,
      ],
      style: [
        ...tokenStyle,                            // --form--size, --form--radius
        ...colorStyle,                            // --form--color-base, etc. (@TODO)
        bg && `--local--bg: ${bg}`,               // escape-hatch background
      ],
      disabled,
    },
    base,
  );

  return {
    formClass: cls,
    formStyle: style,
    formAttrs: {
      ...attrs,
      ...ariaAttrs,
    },
    // Returned separately so component hooks can add native HTML attrs:
    //   disabled={disabled || undefined}  → prevents native "disabled" on wrappers
    //   required={required || undefined}  → prevents native "required" on wrappers
    disabled,
    required,
    invalid,
    rest: restAttrs,
    spacing,
  };
}
