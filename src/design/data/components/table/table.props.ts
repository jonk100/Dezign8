// design/data/table/table.props.ts
/**
 * @file Prop interface for the Table component.
 * @module design/data/table
 *
 * {@link TableProps} extends {@link DataProps} with props specific to
 * tabular data. All shared data category props (color channels, density,
 * variant, states, modifiers) are inherited — only Table additions live here.
 *___________________________________________________________________________
 *==============================================================================
 * **Full prop inheritance chain:**
 *
 * ```
 * BaseComponentProps    class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * DataProps             color, bg, highlight, variant, size,
 *        ↑              caption, loading, empty,
 *        ↑              striped, bordered,
 *        ↑              interactive, selectable, scrollable
 * TableProps            data, columns, layout,
 *                       stickyHeader, sortable, sort
 * ```
 *____________________________________________________________________________
 *==============================================================================
 * Table has ** two rendering modes: **
 *
 * 1. Data-driven — Table owns the full render:
 * ```astro
 * <Table data={rows} columns={cols} caption="Q3 Sales" />
 * ```
 * 2. Compound — developer controls structure via parts:
 * ```astro
 * <Table caption="Q3 Sales" striped color="primary">
 *   <TableHead slot="head">…</TableHead>
 *   <TableBody slot="body">…</TableBody>
 * </Table>
 * ```
 * - Both modes can be mixed: pass `data` and `columns` for the body rows
 * while using a slot for a custom `<TableFoot>`.
 *____________________________________________________________________________
 *==============================================================================
 * ** Slots ** (not declared here — handled by Table.astro):
 *
 * - `head`    — replaces the generated `<thead>` entirely
 * - `body`    — replaces the generated `<tbody>` entirely
 * - `foot`    — appends or replaces `<tfoot>`
 * - `empty`   — replaces the default empty state UI (overrides `empty` prop)
 * - `loading` — replaces the default skeleton UI (overrides `loading` prop)
 *____________________________________________________________________________
 *==============================================================================
 * *** Intentionally NOT in TableProps: ***
 *
 * - `onSort` — sort state changes are consumer-managed. In Astro SSR, handle
 *   via URL search params + server re-render. For client-side, add a `<script>`
 *   or island. Table only reads `sort` to render indicators, never writes it.
 * - `selectedRows` — selection state is consumer-managed. Table renders
 *   checkboxes when `selectable` is true, but tracks nothing internally.
 *   Wire selection via a client script or Astro island.
 * - `stickyColumn` — deferred. Requires `layout="fixed"` + explicit column
 *   widths + per-column `position: sticky` + `left` offsets. Complex enough
 *   to warrant its own implementation pass. Use `scrollable` in the meantime.
 * - `pagination` — out of scope at the component level. Compose `<Table>`
 *   with a `<Pagination>` component in the nav category.
 * _______________________________________________________________________________
 *===================================================================================
 * @see {@link DataProps}       in `data/data.props.ts`         — parent interface
 * @see {@link ColumnDef}       in `data/table/table.tokens.ts` — column config shape
 * @see {@link TableSort}       in `data/table/table.tokens.ts` — sort state shape
 * @see {@link TABLE_DEFAULTS}  in `data/table/table.tokens.ts` — default values
 * @see {@link useTable}        in `data/table/table.hook.ts`   — runtime resolution
 */

import type { DataProps } from "~/data/data.props";
import type {
  ColumnDef,
  RowData,
  TableLayout,
  TableSort,
} from "./table.tokens";

/**
 * Props for the `<Table>` component.
 *
 * Extends {@link DataProps} which extends {@link BaseComponentProps}.
 * All inherited props are available without redeclaration.
 *
 * @example Minimal data-driven
 * ```astro
 * <Table data={rows} columns={cols} caption="Q3 Sales by Region" />
 * ```
 *
 * @example Full data-driven
 * ```astro
 * <Table
 *   data={rows}
 *   columns={cols}
 *   caption="Q3 Sales by Region"
 *   color="primary"
 *   variant="outlined"
 *   size="comfortable"
 *   striped
 *   sortable
 *   sort={{ key: "revenue", direction: "desc" }}
 *   stickyHeader
 *   scrollable
 *   layout="fixed"
 *   loading={isFetching}
 *   empty="No results match your filters"
 * />
 * ```
 *
 * @example Compound mode
 * ```astro
 * <Table caption="Team members" color="primary" striped interactive>
 *   <TableHead slot="head">
 *     <TableRow>
 *       <TableCell as="th">Name</TableCell>
 *       <TableCell as="th">Role</TableCell>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody slot="body">
 *     {members.map(m => (
 *       <TableRow>
 *         <TableCell>{m.name}</TableCell>
 *         <TableCell>{m.role}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * ```
 */
export interface TableProps extends DataProps {
  // ─── DATA-DRIVEN MODE ──────────────────────────────────────

  /**
   * Row records to render. Each object is one `<tr>`.
   *
   * Values are typed as `unknown` — use `ColumnDef.format()` to
   * transform values before display, or use compound mode for
   * rich cell content (badges, links, nested components).
   *
   * When omitted, Table renders only what is provided via slots
   * (compound mode). Providing both `data` and a `body` slot
   * is valid — the slot takes precedence for that section.
   */
  data?: RowData[];

  /**
   * Column definitions. Controls header labels, alignment, widths,
   * per-column sort, and optional value formatting.
   *
   * Required when `data` is provided. If `columns` is omitted with
   * `data` present, Table falls back to rendering raw Object.keys()
   * of the first row as column headers with no formatting.
   *
   * @see {@link ColumnDef} for the full shape and field docs
   */
  columns?: ColumnDef[];

  // ─── LAYOUT ────────────────────────────────────────────────

  /**
   * CSS `table-layout` algorithm.
   *
   * - `"auto"`  — browser sizes columns from content. Flexible but
   *               slower to paint for large tables. Default.
   * - `"fixed"` — columns sized from first row or explicit `width`
   *               values in `ColumnDef`. Faster, required for
   *               reliable column widths and `scrollable` tables.
   *
   * @default `"auto"` — applied by {@link useTable}
   */
  layout?: TableLayout;

  // ─── BEHAVIOUR ─────────────────────────────────────────────

  /**
   * Pins the `<thead>` to the top of the scroll container.
   *
   * Only meaningful when `scrollable` is also true and a constrained
   * height is set on the component or its parent — without a scroll
   * container, sticky has no effect.
   *
   * Requires `layout="fixed"` for consistent column alignment between
   * the sticky header and the scrolling body.
   *
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Whether columns can be sorted by clicking their header cell.
   *
   * Enables sort indicators on all `<th>` elements whose `ColumnDef`
   * does not explicitly set `sortable: false`. To enable sorting on
   * specific columns only, leave this false and set `sortable: true`
   * per column in `ColumnDef`.
   *
   * Table renders sort indicators but does not manage sort state.
   * Provide `sort` to show the current sort direction, and handle
   * sort changes on the consumer side.
   *
   * @default false
   */
  sortable?: boolean;

  /**
   * Current sort state — which column is sorted and in which direction.
   *
   * Table reads this to render the active sort indicator (▲ / ▼) on
   * the matching column header. Providing `sort` without `sortable`
   * still renders the indicator — useful for server-sorted tables
   * where the UI just needs to reflect the current state.
   *
   * Sort state is always consumer-managed:
   * - SSR: derive from URL search params, pass here, re-render on change
   * - Client: manage with a `<script>` or island, pass as a reactive prop
   *
   * @see {@link TableSort} for the shape: `{ key: string, direction: "asc" | "desc" }`
   */
  sort?: TableSort;
}
