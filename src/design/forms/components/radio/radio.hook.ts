// design/forms/radio/radio.hook.ts

/**
 * @file Component hook for the Radio component.
 * @module design/forms/radio
 *
 * {@link useRadio} resolves {@link RadioProps} into the attribute objects
 * that `Radio.astro` needs. Mirrors {@link useCheckbox} exactly except:
 * - No `indeterminate` prop (radio buttons have no indeterminate state)
 * - The returned `inputAttrs.type` is `"radio"`
 *
 * @see {@link useCheckbox} in `forms/checkbox/checkbox.hook.ts` — parallel hook
 * @see {@link useForm}     in `forms/forms.hook.ts`             — delegated to
 * @see {@link RadioProps}  in `forms/radio/radio.props.ts`      — input type
 * @see {@link RADIO_DEFAULTS} in `forms/radio/radio.tokens.ts`
 * @see `forms/radio/Radio.astro` — consumes this hook's return value
 * @see `forms/radio/radio.css`   — circular indicator styles, layout modifiers
 */

import type { RadioProps }  from "./radio.props";
import { RADIO_DEFAULTS }   from "./radio.tokens";
import { useForm }          from "~f/forms.hook";
import { composeClass }     from "~/shared/base.hook";

/**
 * Resolves {@link RadioProps} into wrapper and input attribute objects.
 *
 * @param props - Full `RadioProps` for this `<Radio>` instance.
 *
 * @returns
 *
 * **`Tag`** — Always `"label"`. Clicking anywhere in the component selects
 * the radio, including the label text, without needing `for`/`id` wiring.
 *
 * **`props`** — Attributes for the `<label>` wrapper (same shape as Checkbox).
 *
 * **`inputAttrs`** — Attributes for the inner `<input type="radio">`.
 * No `data-indeterminate` — radio buttons do not have an indeterminate state.
 *
 * @example
 * ```astro
 * ---
 * // Radio.astro
 * const { Tag, props, inputAttrs } = useRadio(Astro.props as RadioProps);
 * ---
 * <Tag {...props}>
 *   <input class="radio__control" {...inputAttrs} />
 *   <span class="radio__indicator" aria-hidden="true"></span>
 *   {Astro.slots.has("default") && (
 *     <span class="radio__label"><slot /></span>
 *   )}
 * </Tag>
 * ```
 *
 * @see {@link useForm} — handles token resolution and shared ARIA attrs
 */
export function useRadio(props: RadioProps) {
  const {
    id,
    name,
    value,
    checked,
    labelPosition = RADIO_DEFAULTS.labelPosition,
    ...formProps
  } = props;

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        variant: "ghost",  // default: no wrapper border (traditional radio look)
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  const wrapperProps = {
    class: composeClass(
      formClass,
      "radio",
      `radio--${labelPosition}`,
    ),
    style: formStyle,
    ...formAttrs,
    ...rest,
  };

  const inputAttrs = {
    type:            "radio" as const,
    id,
    name,
    value,
    checked:         checked  || undefined,
    disabled:        disabled || undefined,
    required:        required || undefined,
    "aria-disabled": disabled ? "true" as const : undefined,
    "aria-required": required ? "true" as const : undefined,
    "aria-invalid":  invalid  ? "true" as const : undefined,
  };

  return {
    Tag: "label" as const,
    props:      wrapperProps,
    inputAttrs,
  };
}