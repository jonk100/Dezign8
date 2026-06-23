// design/forms/search/search.props.ts

/**
 * @file Prop interface for the Search component.
 * @module design/forms/search
 *
 * {@link SearchProps} extends {@link FormProps} with search-specific props.
 * Structurally mirrors {@link InputProps} but with different defaults and
 * the `loading` prop.
 *
 * @see {@link FormProps}       in `forms/forms.props.ts`           — parent
 * @see {@link SEARCH_DEFAULTS} in `forms/search/search.tokens.ts`
 * @see {@link useSearch}       in `forms/search/search.hook.ts`
 */

import type { FormProps } from "~f/forms.props";

/**
 * Props for the `<Search>` component.
 *
 * @example
 * ```astro
 * <!-- Basic full-width search -->
 * <Search name="q" placeholder="Search…" />
 *
 * <!-- With initial value -->
 * <Search name="q" value={searchQuery} placeholder="Search products…" />
 *
 * <!-- Async loading state -->
 * <Search name="q" loading={isSearching} placeholder="Search…" />
 *
 * <!-- Inline / constrained width -->
 * <Search name="q" fullWidth={false} size="sm" placeholder="Filter…" />
 *
 * <!-- With leading icon in start slot -->
 * <Search name="q" placeholder="Search…">
 *   <Icon slot="start" name="search" />
 * </Search>
 * ```
 */
export interface SearchProps extends FormProps {
  /**
   * The `id` placed on the inner `<input type="search">`.
   * Required for `<label for="…">` association and `aria-describedby` wiring.
   */
  id?: string;

  /**
   * Current search value. Sets the initial displayed text in the input.
   *
   * In static SSR, this pre-fills the field. The clear button will be
   * visible initially when a non-empty value is provided.
   */
  value?: string;

  /**
   * Placeholder text shown when the field is empty.
   * Conventionally: `"Search…"` or `"Search {noun}…"`.
   *
   * @remarks
   * Placeholder is not a substitute for a visible label. For a standalone
   * search field with no visible label, add a visually-hidden `<Label>`
   * or `aria-label` attribute.
   */
  placeholder?: string;

  /**
   * Whether the search is currently loading / processing results.
   *
   * When `true`:
   * - Adds the `search--loading` class modifier
   * - Adds `data-loading` attribute (for CSS spinner)
   * - Suppresses the clear button while loading is active
   *
   * @default false
   */
  loading?: boolean;

  /**
   * Makes the search input read-only (focusable but not editable).
   * Rarely needed for search; included for parity with Input.
   */
  readonly?: boolean;

  /**
   * Maximum number of characters the search value may contain.
   * Forwarded as the native `maxlength` attribute.
   */
  maxLength?: number;

  /**
   * Autocomplete hint for the browser's autofill system.
   * Common values: `"off"`, `"on"`, `"search"`.
   *
   * @remarks
   * Search inputs typically set `autocomplete="off"` to prevent browsers
   * from showing stale search history in the autocomplete dropdown, which
   * can conflict with the application's own suggestion UI.
   */
  autocomplete?: string;
}
