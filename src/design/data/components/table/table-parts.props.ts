// design/data/table/parts/table-parts.props.ts

/**
 * Prop types for Table compound-mode parts.
 *
 * Parts are thin semantic wrappers — no tokens, no hooks, no CSS of
 * their own. They render the correct HTML element and inherit all
 * visual behaviour from the `.table` context set by the parent `<Table>`.
 *
 * All parts extend BaseComponentProps, which provides `class`, `style`,
 * `id`, `bg`, `animation`, `testId`, `v`, and HTML passthrough via
 * the index signature.
 */

import type { BaseComponentProps } from "~/shared/base.props";
import type { TableAlign } from "./table.tokens";

// ─── HEAD / BODY / FOOT ───────────────────────────────────────
// No additional props — just HTML passthrough.

export type TableHeadProps = BaseComponentProps;
export type TableBodyProps = BaseComponentProps;
export type TableFootProps = BaseComponentProps;

// ─── ROW ──────────────────────────────────────────────────────

export interface TableRowProps extends BaseComponentProps {
  /**
   * Marks this row as highlighted.
   * Renders `data-highlighted=""` on the `<tr>`.
   * table.css applies `--data--highlight--*` channels to highlighted rows.
   */
  highlighted?: boolean;
}

// ─── CELL ─────────────────────────────────────────────────────

/** The HTML element a TableCell renders as. */
export type TableCellTag = "td" | "th";

export interface TableCellProps extends BaseComponentProps {
  /**
   * The HTML element to render.
   * Use `"th"` for header cells inside `<TableHead>`.
   * @default "td"
   */
  as?: TableCellTag;

  /**
   * Text alignment for this cell.
   * Applied as `data-align` — table.css maps it to `text-align`.
   * Use `"end"` for numeric columns.
   */
  align?: TableAlign;

  /**
   * Explicit column width. Applied as an inline `width` style.
   * Only meaningful on `<th>` elements with `layout="fixed"` on the parent Table.
   * Accepts any CSS length: `"200px"` | `"20ch"` | `"15%"` | `"auto"`.
   */
  width?: string;

  /**
   * Number of columns this cell spans.
   * Maps to the native `colspan` HTML attribute.
   */
  colspan?: number;

  /**
   * Number of rows this cell spans.
   * Maps to the native `rowspan` HTML attribute.
   */
  rowspan?: number;

  /**
   * Defines the cells a `<th>` is a header for.
   * Only meaningful when `as="th"`. Provide this for accessibility.
   *
   * - `"col"`      — header for cells in the same column (most common for thead)
   * - `"row"`      — header for cells in the same row (use for row headers)
   * - `"colgroup"` — header for a group of columns
   * - `"rowgroup"` — header for a group of rows
   */
  scope?: "col" | "row" | "colgroup" | "rowgroup";
}
