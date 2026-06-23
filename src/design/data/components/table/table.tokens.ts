// design/data/table/table.tokens.ts

/**
 * TABLE TOKEN SPEC
 * ─────────────────────────────────────────────────────────────────────────────
 * Table adds one token dimension on top of what DataProps/useData already covers:
 *
 *   layout  → --table-layout   CSS table-layout property (auto | fixed)
 *             + modifier class (.table--auto | .table--fixed)
 *
 * All color channels, density, variant, and state tokens are inherited from
 * the data category and resolved by useData. TABLE_TOKENS is only passed to
 * resolveTokens for table-specific dimensions.
 *
 * DATA-DRIVEN MODE TYPES
 * ─────────────────────────────────────────────────────────────────────────────
 * ColumnDef    Column configuration for <Table data={rows} columns={cols} />
 * RowData      A single row record — open Record shape
 * TableSort    Current sort state { key, direction }
 * TableAlign   Column text alignment (start | center | end)
 *
 * For rich cell content (badges, actions, nested components) use compound
 * mode instead: <TableBody><TableRow><TableCell>...</TableCell></TableRow></TableBody>
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";

// ─── TABLE-ONLY SCALES ────────────────────────────────────────

/**
 * CSS table-layout algorithm.
 *
 *   auto   Browser sizes columns from content — flexible but slower to render.
 *          Good for variable content where you want columns to self-size.
 *
 *   fixed  Columns sized from first row / explicit widths — faster to render.
 *          Required for sticky columns and reliable column widths.
 *          Use when column count and widths are known ahead of time.
 */
const TABLE_LAYOUT_SCALE = scale({
  auto:  "auto",
  fixed: "fixed",
});

/**
 * Column text alignment. Applied per column via ColumnDef.align.
 * Not a component-level token dimension — used within ColumnDef only.
 */
const TABLE_ALIGN_SCALE = scale({
  start:  null,
  center: null,
  end:    null,
});

// ─── TOKEN SPEC ───────────────────────────────────────────────

export const TABLE_TOKENS = defineTokens({
  /**
   * CSS table-layout algorithm.
   * Sets --table-layout channel + modifier class (.table--auto | .table--fixed).
   */
  layout: dimension("layout", TABLE_LAYOUT_SCALE, { modifier: true }),
});

// ─── DATA-DRIVEN MODE TYPES ───────────────────────────────────

/** A single row record. Values are unknown — format() in ColumnDef handles display. */
export type RowData = Record<string, unknown>;

/**
 * Column definition for data-driven mode.
 *
 * @example
 * const columns: ColumnDef[] = [
 *   { key: "name",   heading: "Name",   width: "200px" },
 *   { key: "status", heading: "Status", align: "center" },
 *   { key: "amount", heading: "Amount", align: "end",
 *     format: (v) => `$${Number(v).toFixed(2)}` },
 * ]
 */
export interface ColumnDef {
  /** Property key on the row record. Must match a key in RowData. */
  key: string;

  /** Text shown in the column header (<th>). */
  heading: string;

  /**
   * Text alignment for all cells in this column.
   * Defaults to "start". Use "end" for numeric columns.
   */
  align?: TableAlign;

  /**
   * Explicit CSS column width.
   * Any valid CSS length: "200px" | "20ch" | "15%" | "auto"
   * Requires layout="fixed" on the Table to be respected reliably.
   */
  width?: string;

  /**
   * Whether this column is sortable. Overrides the table-level sortable prop.
   * Set false to disable sorting on a specific column when sortable is true globally.
   */
  sortable?: boolean;

  /**
   * String transformation applied to the cell value before rendering.
   * For rich content (badges, icons, nested components) use compound mode instead.
   *
   * @param value - The raw value from the row record at this column's key
   * @param row   - The full row record, for multi-field formatting
   * @returns     - The string to render in the cell
   */
  format?: (value: unknown, row: RowData) => string;
}

/**
 * Current sort state. Consumers manage this externally and pass it back
 * to Table — Table only renders the visual sort indicators.
 *
 * @example
 * let sort: TableSort = { key: "name", direction: "asc" };
 */
export interface TableSort {
  key:       string;
  direction: "asc" | "desc";
}

// ─── DERIVED TYPES ────────────────────────────────────────────

export type TableLayout = keyof typeof TABLE_LAYOUT_SCALE;
export type TableAlign  = keyof typeof TABLE_ALIGN_SCALE;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const TABLE_DEFAULTS = {
  layout:       "auto",
  stickyHeader: false,
  sortable:     false,
} as const satisfies {
  layout:       TableLayout;
  stickyHeader: boolean;
  sortable:     boolean;
};