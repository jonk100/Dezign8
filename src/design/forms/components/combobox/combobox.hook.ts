// design/forms/combobox/combobox.hook.ts

/**
 * @file Component hook for the Combobox component.
 * @module design/forms/combobox
 *
 * {@link useCombobox} prepares the three attribute objects and computed data
 * that `Combobox.astro` needs to render the full combobox structure:
 *
 * ```
 * <div class="form combobox …" data-combobox>      ← wrapper
 *   <input type="text" role="combobox" … />         ← visible filter input
 *   <input type="hidden" name="…" value="…" />      ← form submission input
 *   <ul role="listbox" id="{listboxId}">             ← custom dropdown
 *     <li role="option" id="{listboxId}-{i}">…</li>
 *   </ul>
 * </div>
 * ```
 *
 * **Two-input pattern:**
 * The text input handles display and filtering; the hidden input handles form
 * submission. Their values differ: text input shows the selected option's
 * `label`, hidden input holds the `value`. The JS controller keeps both in sync.
 *
 * **`listboxId` generation:**
 * If an `id` prop is provided, the listbox gets `id="{id}-listbox"` for a
 * stable, predictable ID. Without an `id` prop, a random suffix is generated
 * server-side via `crypto.randomUUID()`. This ensures the `aria-controls`
 * reference is always valid while avoiding a hard `id` requirement.
 *
 * **`displayValue`:**
 * The initial text shown in the filter input. On SSR, this is the matching
 * option's `label` when `value` is set, or an empty string. The JS controller
 * updates it as the user selects options.
 *
 * @see {@link useForm}          in `forms/forms.hook.ts`
 * @see {@link ComboboxProps}    in `forms/combobox/combobox.props.ts`
 * @see {@link COMBOBOX_DEFAULTS} in `forms/combobox/combobox.tokens.ts`
 * @see `forms/combobox/Combobox.astro` — renders the full structure
 */

import type { ComboboxProps, ComboboxOption } from "./combobox.props";
import { COMBOBOX_DEFAULTS }                  from "./combobox.tokens";
import { useForm }                            from "~f/forms.hook";
import { composeClass }                       from "~/shared/base.hook";

/**
 * Resolves {@link ComboboxProps} into the full set of attributes and data
 * needed by `Combobox.astro`.
 *
 * @param props - Full `ComboboxProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`.
 *
 * **`props`** — Wrapper `<div>` attributes (form classes, CSS channels, data attrs).
 *
 * **`inputAttrs`** — Visible text `<input>` attributes:
 * - `role="combobox"`, `aria-expanded="false"` (initial), `aria-autocomplete="list"`
 * - `aria-controls="{listboxId}"` — links input to the listbox
 * - `autocomplete="off"` — suppresses browser autocomplete
 *
 * **`hiddenAttrs`** — Hidden `<input type="hidden">` attributes:
 * - `name` — the form field name (goes here, not on the text input)
 * - `value` — the selected option's value (empty string when unselected)
 *
 * **`listboxAttrs`** — `<ul>` listbox attributes:
 * - `id="{listboxId}"`, `role="listbox"`, `hidden` (initial state)
 *
 * **`options`** — The raw options array for `Combobox.astro` to map over,
 * with `selected: boolean` and `id` string added per option.
 *
 * **`displayValue`** — Initial text for the filter input. The selected
 * option's `label` when `value` is set; `""` otherwise.
 *
 * **`listboxId`** — The generated listbox element ID. Exposed so
 * `Combobox.astro` can assign it to the `<ul>` directly.
 *
 * @example
 * ```astro
 * ---
 * const { Tag, props, inputAttrs, hiddenAttrs, listboxAttrs, options, listboxId }
 *   = useCombobox(Astro.props as ComboboxProps);
 * ---
 * <Tag {...props}>
 *   <input class="combobox__control" {...inputAttrs} />
 *   <input {...hiddenAttrs} />
 *   <ul class="combobox__listbox" {...listboxAttrs}>
 *     {options.map(opt => (
 *       <li class="combobox__option" role="option"
 *           id={`${listboxId}-${opt.value}`}
 *           data-value={opt.value}
 *           aria-selected={opt.selected ? "true" : "false"}
 *           aria-disabled={opt.disabled ? "true" : undefined}>
 *         {opt.label}
 *       </li>
 *     ))}
 *   </ul>
 * </Tag>
 * ```
 */
export function useCombobox(props: ComboboxProps) {
  const {
    id,
    name,
    value,
    options,
    placeholder,
    caseSensitive = false,
    ...formProps
  } = props;

  // ── Generate stable listbox ID ───────────────────────────────────────────
  //
  // Predictable when id is provided; random suffix when not.
  // crypto.randomUUID() is available in Node 15+ (Astro requires Node 18+).
  const listboxId = id
    ? `${id}-listbox`
    : `combobox-${crypto.randomUUID().slice(0, 8)}-listbox`;

  // ── Delegate to useForm ──────────────────────────────────────────────────
  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        fullWidth: COMBOBOX_DEFAULTS.fullWidth,
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  // ── Resolve initial display value ────────────────────────────────────────
  //
  // The text input shows the label of the selected option, not its value.
  const selectedOption = value
    ? options.find(o => o.value === value)
    : undefined;
  const displayValue = selectedOption?.label ?? "";

  // ── Resolve options with selection state ────────────────────────────────
  const resolvedOptions = options.map(opt => ({
    ...opt,
    selected: opt.value === value,
  }));

  // ── Wrapper attrs ────────────────────────────────────────────────────────
  const wrapperProps = {
    class: composeClass(formClass, "combobox"),
    style: formStyle,
    ...formAttrs,
    "data-combobox": "",
    ...(caseSensitive && { "data-case-sensitive": "" }),
    ...rest,
  };

  // ── Visible text input ───────────────────────────────────────────────────
  //
  // No `name` — the hidden input submits the value.
  // `autocomplete="off"` prevents browser history overlapping the listbox.
  const inputAttrs = {
    type:                    "text" as const,
    id,
    value:                   displayValue || undefined,
    placeholder:             placeholder  ?? undefined,
    role:                    "combobox"   as const,
    "aria-expanded":         "false"      as const,  // JS updates this on open/close
    "aria-autocomplete":     "list"       as const,
    "aria-controls":         listboxId,
    "aria-activedescendant": "",          // JS updates on keyboard navigation
    autoComplete:            "off",
    disabled:                disabled     || undefined,
    required:                required     || undefined,
    "aria-required":         required     ? "true" as const : undefined,
    "aria-invalid":          invalid      ? "true" as const : undefined,
  };

  // ── Hidden submission input ──────────────────────────────────────────────
  //
  // Carries the actual option `value` for form submission.
  // The text input is display-only and has no `name`.
  const hiddenAttrs = {
    type:  "hidden" as const,
    name,
    value: value ?? "",
  };

  // ── Listbox attrs ────────────────────────────────────────────────────────
  const listboxAttrs = {
    id:       listboxId,
    role:     "listbox" as const,
    hidden:   true,                      // JS removes `hidden` on open
  };

  return {
    Tag: "div" as const,
    props:           wrapperProps,
    inputAttrs,
    hiddenAttrs,
    listboxAttrs,
    options:         resolvedOptions,
    listboxId,       // also exposed for option id generation in Combobox.astro
    displayValue,
  };
}
