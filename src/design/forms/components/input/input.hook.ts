// design/forms/input/input.hook.ts

/**
 * @file Component hook for the Input component.
 * @module design/forms/input
 *
 * {@link useInput} resolves {@link InputProps} into the two attribute
 * objects that `Input.astro` needs: one for the outer wrapper `<div>`
 * (visual container with border, background, and radius) and one for
 * the inner `<input>` element (semantic control with ARIA and native attrs).
 *
 * **Departure from standard `{ Tag, props }` shape:**
 * Most component hooks in this system return `{ Tag, props }` — a single
 * element ready to spread. Input cannot follow this pattern because it
 * renders two elements that need distinct attribute sets:
 *
 * ```
 * <div  class="form input form--outlined …"  ← wrapper: visual chrome
 *       style="--form--size: …"
 *       data-disabled data-invalid>
 *   <slot name="start" />                     ← start slot (icon, prefix)
 *   <input type="text" id="…" name="…"       ← inner control: semantic
 *          aria-invalid="true"
 *          disabled />
 *   <slot name="end" />                       ← end slot (toggle, suffix)
 * </div>
 * ```
 *
 * The hook therefore returns:
 * - `{ Tag, props }` — wrapper `<div>` with form classes, CSS channels,
 *   data attributes, and any unknown HTML passthrough
 * - `{ inputAttrs }` — inner `<input>` with type, value, id, name,
 *   native disabled/required, and ARIA attributes
 *
 * **ARIA responsibility:**
 * `formAttrs` from {@link useForm} includes both `data-*` and `aria-*`
 * attributes. Spreading `formAttrs` onto the wrapper `<div>` means
 * `aria-invalid` / `aria-disabled` appear on a non-form element — this is
 * benign (screen readers ignore them there) but redundant. The ARIA attrs
 * are re-emitted on `inputAttrs` where they actually matter for
 * accessibility. See the `@todo` below for a future cleanup path.
 *
 * **`id` and `name` routing:**
 * `id` and `name` must appear on the `<input>` element, not on the wrapper,
 * because `<label for="…">` matches the id of the actual control. Both are
 * therefore destructured in this hook before calling {@link useForm} so they
 * never end up in `rest`.
 *
 * @see {@link useForm}       in `forms/forms.hook.ts` — category hook delegated to
 * @see {@link InputProps}    in `forms/input/input.props.ts` — input type
 * @see {@link INPUT_DEFAULTS} in `forms/input/input.tokens.ts` — default values
 * @see `forms/input/Input.astro` — consumes this hook's return value
 * @see `forms/input/input.css` — reads `--form--*` channels emitted here
 *
 * @todo Refine {@link useForm} to return `formDataAttrs` and `formAriaAttrs`
 *   separately (instead of a merged `formAttrs`). This would let Input spread
 *   only `formDataAttrs` onto the wrapper and route `formAriaAttrs` cleanly to
 *   `inputAttrs`, eliminating the benign-but-redundant ARIA duplication.
 *   Touch points: `forms.hook.ts` (split return), all component hooks that
 *   currently spread `formAttrs` (each pulls from the right key).
 */

import type { InputProps }                  from "./input.props";
import { INPUT_DEFAULTS }                   from "./input.tokens";
import { useForm }                          from "~/forms/forms.hook";
import { composeClass }                     from "~/shared/base.hook";

/**
 * Resolves {@link InputProps} into attributes for the wrapper element
 * and the inner `<input>` element.
 *
 * @param props - Full `InputProps` for this `<Input>` instance.
 *
 * @returns An object with three members:
 *
 * **`Tag`** — Always `"div"`. The visual container. Spread `props` onto it.
 *
 * **`props`** — Attributes for the wrapper `<div>`:
 * - `class` — `"form input form--outlined form--primary …"` (token modifiers)
 * - `style` — `"--form--size: …; --form--radius: …; --form--color-base: …;"`
 * - `data-disabled`, `data-invalid` — CSS state hooks
 * - `aria-*` — ARIA passthrough from formAttrs (benign on wrapper; see hook docs)
 * - Unknown HTML attrs from consumer (forwarded via `rest`)
 *
 * **`inputAttrs`** — Attributes for the inner `<input>`:
 * - `id`, `name`, `type`, `value`, `placeholder`
 * - `readOnly`, `minLength`, `maxLength`, `pattern`, `autoComplete`
 * - `disabled`, `required` — native HTML attributes
 * - `aria-disabled`, `aria-required`, `aria-invalid` — ARIA attributes
 *
 * @example
 * ```astro
 * ---
 * // Input.astro
 * import type { InputProps } from "./input.props";
 * import { useInput } from "./input.hook";
 * import "./input.css";
 * import "../forms.css";
 *
 * const { Tag, props, inputAttrs } = useInput(Astro.props as InputProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("start") && (
 *     <div class="input__start"><slot name="start" /></div>
 *   )}
 *   <input class="input__control" {...inputAttrs} />
 *   {Astro.slots.has("end") && (
 *     <div class="input__end"><slot name="end" /></div>
 *   )}
 * </Tag>
 * ```
 *
 * @see {@link useForm} — handles token resolution and shared ARIA attrs
 */
export function useInput(props: InputProps) {
  // ── Destructure Input-specific props ─────────────────────────────────────
  //
  // `id` and `name` are pulled here (before useForm) so they are routed
  // to inputAttrs rather than landing in rest → wrapperProps.
  //
  // `name` is declared on FormProps; `id` is declared on InputProps.
  // Destructuring them here removes them from the object passed to useForm.
  const {
    id,
    name,
    type          = INPUT_DEFAULTS.type,
    value,
    placeholder,
    readonly,
    minLength,
    maxLength,
    pattern,
    autocomplete,
    ...formProps
  } = props;

  // ── Delegate shared resolution to useForm ────────────────────────────────
  //
  // useForm resolves: size, variant, color, radius → CSS channels + classes
  //                   disabled, required, invalid  → formAttrs (data-* + aria-*)
  //                   fullWidth                    → form--full-width class
  //
  // `id` and `name` are not in formProps (destructured above), so they will
  // not appear in `rest`. All other unknown consumer props flow through rest.
  const {
    formClass, formStyle, formAttrs,
    disabled, required, invalid,
    rest,
  // FormProps cast is safe: InputProps extends FormProps; we only removed
  // optional props that InputProps added or re-declared.
  } = useForm(formProps as Parameters<typeof useForm>[0]);

  // ── Assemble wrapper props ────────────────────────────────────────────────
  //
  // The wrapper <div> is the visual container. It receives:
  // - Form token classes and inline CSS channel vars
  // - data-* attributes for CSS state rules (.input[data-disabled] etc.)
  // - aria-* from formAttrs (benign duplication — see @todo in file header)
  // - Any remaining unknown HTML attrs from the consumer via rest
  const wrapperProps = {
    class: composeClass(formClass, "input"),
    style: formStyle,
    ...formAttrs,
    ...rest,
  };

  // ── Assemble inner input attrs ────────────────────────────────────────────
  //
  // The <input> element receives all semantic, functional, and ARIA attrs.
  // Native `disabled` and `required` are added here (not in useForm) because
  // they are element-specific — only valid on native form elements.
  //
  // `undefined` values are intentionally used instead of omission because
  // Astro/JSX spreads skip undefined attribute values automatically.
  // This avoids the exactOptionalPropertyTypes conditional-spreading issue.
  const inputAttrs = {
    id,
    name,
    type,
    value:        value       ?? undefined,
    placeholder:  placeholder ?? undefined,
    readOnly:     readonly    || undefined,
    minLength:    minLength,
    maxLength:    maxLength,
    pattern:      pattern,
    autoComplete: autocomplete,
    // Native HTML attributes — element-specific, added here not in useForm
    disabled:     disabled    || undefined,
    required:     required    || undefined,
    // ARIA attributes on the actual control (semantically correct location)
    "aria-disabled": disabled ? "true" as const : undefined,
    "aria-required": required ? "true" as const : undefined,
    "aria-invalid":  invalid  ? "true" as const : undefined,
  };

  return {
    Tag: "div" as const,
    props:      wrapperProps,
    inputAttrs: inputAttrs,
  };
}