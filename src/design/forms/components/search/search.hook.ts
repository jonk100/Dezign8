// design/forms/search/search.hook.ts

/**
 * @file Component hook for the Search component.
 * @module design/forms/search
 *
 * {@link useSearch} mirrors the {@link useInput} pattern — it delegates shared
 * token/ARIA resolution to {@link useForm} and returns two attribute objects
 * for the wrapper `<div>` and the inner `<input type="search">`.
 *
 * **Differences from Input:**
 * - Default `type` is `"search"` (not configurable — this is Search)
 * - `loading` prop adds `search--loading` class + `data-loading` attribute
 * - `data-search` attribute on wrapper enables the client-side JS controller
 *   (clear button, Escape-to-clear) defined in `Search.astro`
 *
 * **No cross-component import:**
 * Search cannot import from Input (sibling components must not import from
 * each other per the architecture rules). Both resolve through {@link useForm}.
 * The duplicate logic between Input and Search hooks is intentional and minimal.
 *
 * @see {@link useForm}       in `forms/forms.hook.ts`            — delegated to
 * @see {@link SearchProps}   in `forms/search/search.props.ts`   — input type
 * @see {@link SEARCH_DEFAULTS} in `forms/search/search.tokens.ts`
 * @see `forms/search/Search.astro` — consumes this hook's return value
 */

import type { SearchProps } from "./search.props";
import { SEARCH_DEFAULTS }  from "./search.tokens";
import { useForm }          from "~f/forms.hook";
import { composeClass }     from "~/shared/base.hook";

/**
 * Resolves {@link SearchProps} into wrapper and input attribute objects.
 *
 * @param props - Full `SearchProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`. Wrapper owns the visual chrome.
 *
 * **`props`** — Attributes for the outer `<div>`:
 * - `class` — form classes + `"search"` + loading modifier
 * - `style` — CSS channel declarations
 * - `data-search` — enables the JS controller in `Search.astro`
 * - `data-loading` — present when `loading={true}` (CSS spinner hook)
 *
 * **`inputAttrs`** — Attributes for the inner `<input type="search">`:
 * - `type` — always `"search"`
 * - `id`, `name`, `value`, `placeholder`, `maxLength`, `autoComplete`
 * - `readOnly`, `disabled`, `required` — native HTML attributes
 * - `aria-*` — ARIA attributes
 *
 * @example
 * ```astro
 * ---
 * const { Tag, props, inputAttrs } = useSearch(Astro.props as SearchProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("start") && <div class="search__start"><slot name="start" /></div>}
 *   <input class="search__control" {...inputAttrs} />
 *   <button class="search__clear" type="button" aria-label="Clear search" hidden>×</button>
 *   {Astro.slots.has("end") && <div class="search__end"><slot name="end" /></div>}
 * </Tag>
 * ```
 */
export function useSearch(props: SearchProps) {
  const {
    id,
    name,
    value,
    placeholder,
    loading      = SEARCH_DEFAULTS.loading,
    readonly,
    maxLength,
    autocomplete,
    ...formProps
  } = props;

  // Apply search-specific default: fullWidth = true
  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        fullWidth: SEARCH_DEFAULTS.fullWidth,
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  const wrapperProps = {
    class: composeClass(
      formClass,
      "search",
      loading && "search--loading",
    ),
    style:          formStyle,
    ...formAttrs,
    // JS controller anchor — the Search.astro script queries [data-search]
    "data-search":  "",
    // Present when loading — CSS shows spinner, hides clear button
    ...(loading && { "data-loading": "" }),
    ...rest,
  };

  const inputAttrs = {
    type:            "search" as const,
    id,
    name,
    value:           value        ?? undefined,
    placeholder:     placeholder  ?? undefined,
    readOnly:        readonly     || undefined,
    maxLength,
    autoComplete:    autocomplete ?? "off", // prevent browser history dropdown
    disabled:        disabled     || undefined,
    required:        required     || undefined,
    "aria-disabled": disabled     ? "true" as const : undefined,
    "aria-required": required     ? "true" as const : undefined,
    "aria-invalid":  invalid      ? "true" as const : undefined,
  };

  return {
    Tag: "div" as const,
    props:      wrapperProps,
    inputAttrs,
  };
}
