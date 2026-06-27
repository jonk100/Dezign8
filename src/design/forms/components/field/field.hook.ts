// design/forms/field/field.hook.ts

/**
 * @file Component hook for the Field component.
 * @module design/forms/field
 *
 * {@link useField} is intentionally minimal. Field is a structural wrapper
 * with no token resolution — it has no dimensions to resolve, no CSS channels
 * to write, and no color system to wire. Its hook applies state modifier
 * classes and data attributes, then returns the wrapper props and the `id`
 * for the Astro template to use when generating hint/error element IDs.
 *
 * @remarks
 * **Why this hook exists at all:**
 * Even for a trivial component, the hook provides a consistent interface for
 * the Astro template and keeps the class/attribute logic out of the template.
 * It also handles `testId` → `data-testid` via {@link useBaseCompose}.
 *
 * **`id` in the return value:**
 * `id` is returned separately (alongside `{ Tag, props }`) so `Field.astro`
 * can generate `id="{id}-hint"`, `id="{id}-error"`, `id="{id}-success"` on
 * its own rendered slot wrappers. The `id` is NOT in `props` — it does not
 * go on the outer `<div>` wrapper, since the IDs that matter are on the
 * inner elements, and putting the bare `id` on the wrapper could cause
 * `<label for="email">` to associate with the Field div rather than the
 * control inside it.
 *
 * @see {@link FieldProps} in `forms/field/field.props.ts` — input type
 * @see `forms/field/Field.astro`                           — consumes this hook
 * @see `forms/field/field.css`                             — reads field modifier classes
 */

import type { FieldProps } from "./field.props";
import { useBaseCompose }  from "~/shared/base.hook";

/**
 * Resolves {@link FieldProps} into wrapper props for the Field container.
 *
 * @param props - Full `FieldProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`. Field is a generic structural container.
 *
 * **`id`** — The raw `id` prop value (or `undefined`). Used by `Field.astro`
 * to generate `id="{id}-hint"`, `id="{id}-error"`, `id="{id}-success"` on
 * slot wrapper elements. NOT spread onto the outer wrapper div.
 *
 * **`props`** — Attributes for the outer `<div>` wrapper:
 * - `class` — `"field"` plus state modifiers (`field--invalid`, `field--required`)
 * - `data-invalid`  — present when `invalid={true}` (CSS hook)
 * - `data-required` — present when `required={true}` (CSS hook)
 * - `data-testid`   — from `testId` prop via {@link useBaseCompose}
 *
 * @example
 * ```astro
 * ---
 * // Field.astro
 * const { Tag, id, props } = useField(Astro.props as FieldProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("label") && <div class="field__label"><slot name="label" /></div>}
 *   <div class="field__control"><slot /></div>
 *   {Astro.slots.has("hint") && (
 *     <p class="field__hint" id={id ? `${id}-hint` : undefined}>
 *       <slot name="hint" />
 *     </p>
 *   )}
 * </Tag>
 * ```
 */
export function useField(props: FieldProps) {
  const {
    id,
    invalid  = false,
    required = false,
    icon,
    class: className,
    ...rest
  } = props;

  // ── Data attributes for CSS state rules ──────────────────────────────────
  const stateAttrs: Record<string, string> = {};
  if (invalid)  stateAttrs["data-invalid"]  = "";
  if (required) stateAttrs["data-required"] = "";

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "field",
        invalid  && "field--invalid",
        required && "field--required",
        className,
      ],
      style: [],
    },
    props,
  );

  return {
    Tag: "div" as const,
    // id is returned separately — it goes on hint/error elements, not the wrapper
    id,
    icon,
    props: {
      class: cls,
      style: style || undefined,
      ...attrs,
      ...stateAttrs,
      ...rest,
    },
  };
}