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
export type SearchProps = FormProps & {
  id?: string;
  value?: string;
  placeholder?: string;
  loading?: boolean;
  readonly?: boolean;
  maxLength?: number;
  autocomplete?: string;
};
