// design/data/table/table.hook.ts
/**
 * Resolves `TableProps` into two prop objects for the two-element
 * structure Table.astro renders:
 *
 *   <div  {...wrapperProps}>   ← .data root: variants, CSS vars, state attrs
 *     <table {...tableProps}>  ← .table: structure, layout, sort, sticky
 *       …
 *     </table>
 *   </div>
 *
 * WHY A WRAPPER DIV
 * ─────────────────────────────────────────────────────────────────
 * `overflow: auto` on a `<table>` element is ignored by all browsers —
 * the spec does not allow overflow on table elements. Horizontal scroll
 * requires a block container wrapping the table. The wrapper div is that
 * container, and it also carries the `.data` class so category-level CSS
 * (variants, color channels, state attributes) targets the correct element.
 *
 * CSS custom properties set on the wrapper cascade into the table and all
 * its descendants, so `var(--data--color--border)` in thead th still works.
 *
 * RESPONSIBILITY SPLIT
 * ─────────────────────────────────────────────────────────────────
 * useData     — color channels, density, variant, all shared modifiers
 *               (striped, bordered), state attrs (data-loading, data-empty,
 *               data-interactive, data-selectable, data-scrollable),
 *               and base attrs (data-visual, data-testid). Produces
 *               dataClass, dataStyle, dataAttrs, caption, and rest.
 *
 * useTable    — table-specific token (layout), appends .table and
 *               modifier classes (sticky-header, sortable), and
 *               surfaces columns, data, sort, sortable for the template.
 *
 * RETURN SHAPE
 * ─────────────────────────────────────────────────────────────────
 * wrapperProps  Spread onto the outer <div>:
 *               class = "data [modifier classes]"
 *               style = CSS var channels (cascade down to <table>)
 *               data-* = state and visual registry attrs
 *
 * tableProps    Spread onto the inner <table>:
 *               class = "table [table modifier classes]"
 *               rest  = HTML passthrough (id, aria-*, tabindex, …)
 *               Note: id and aria-* belong on the semantic <table>,
 *               not the neutral wrapper div.
 *
 * caption       Render as first child of <table>:
 *               <caption>{caption}</caption>
 *
 * columns       ColumnDef[] | undefined — drives <thead> and cell
 *               alignment, width, sort indicators. Undefined = compound mode.
 *
 * data          RowData[] | undefined — drives <tbody> rows.
 *               Provided without columns = empty <tbody> (intentional).
 *
 * sort          TableSort | undefined — current sort state for indicators.
 * sortable      boolean — resolved with TABLE_DEFAULTS.
 *               Per-column resolution: col.sortable ?? sortable.
 *
 * @example Minimal
 *   useTable({ data: rows, columns: cols, caption: "Q3 Sales" })
 *   // wrapperProps.class: "data"
 *   // tableProps.class:   "table"
 *   // caption:            "Q3 Sales"
 *
 * @example Full
 *   useTable({ color: "primary", variant: "outlined", striped: true,
 *              layout: "fixed", stickyHeader: true, sortable: true,
 *              sort: { key: "revenue", direction: "desc" },
 *              scrollable: true, id: "revenue-table" })
 *   // wrapperProps.class:           "data data--outlined data--striped"
 *   // wrapperProps.style:           "--data--color--base: var(--primary--base); …"
 *   // wrapperProps["data-scrollable"]: "true"
 *   // tableProps.class:             "table table--fixed table--sticky-header table--sortable"
 *   // tableProps.id:                "revenue-table"
 */
import type { TableProps } from "./table.props";
import { TABLE_TOKENS, TABLE_DEFAULTS } from "./table.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";
//``````````````````````````````````````````````````````````````
// ___________________________________________________________
export function useTable(props: TableProps) {
  const {
    data,
    columns,
    layout,
    stickyHeader = TABLE_DEFAULTS.stickyHeader,
    sortable = TABLE_DEFAULTS.sortable,
    sort,
    ...dataProps
  } = props;

  // ── Category resolution ─────────────────────────────────────
  const { dataClass, dataStyle, dataAttrs, caption, rest } = useData(dataProps);

  // ── Table-specific token resolution ─────────────────────────
  // layout is skipped when undefined — CSS fallback var(--table--layout, auto).
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    TABLE_TOKENS,
    { layout },
    "table",
  );

  // ── Compose ─────────────────────────────────────────────────
  const wrapperClass = dataClass; // "data" + data modifier classes

  const tableClass = composeClass(
    "table",
    ...tokenClasses,
    stickyHeader && "table--sticky-header",
    sortable && "table--sortable",
  );

  // CSS vars on the wrapper cascade into the table and all descendants.
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    caption,
    columns,
    data,
    sort,
    sortable,
    wrapperProps: {
      class: wrapperClass,
      style,
      ...dataAttrs, // data-loading, data-scrollable, data-visual, data-testid, etc.
    },
    tableProps: {
      class: tableClass,
      ...rest, // id, aria-*, tabindex, and other HTML passthrough
    },
  };
}
