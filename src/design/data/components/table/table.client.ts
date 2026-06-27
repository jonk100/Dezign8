// design/data/table/table.client.ts

import { persistAndDispatch }  from "~/data/data.utils";

/**
 * Client-side selection and sort manager for <Table />.
 *
 * READING SELECTION STATE
 * ─────────────────────────────────────────────────────────────────
 * On a button click:
 *   const selected = JSON.parse(wrapper.dataset.selected ?? "[]");
 *
 * Reactively:
 *   wrapper.addEventListener("table:selectionchange", e => {
 *     const { selected, all, none } = e.detail;
 *   });
 *
 * FORM PARTICIPATION
 * ─────────────────────────────────────────────────────────────────
 * Row checkboxes render as <input name="selected" value="0" />.
 * Submit a form containing the table → POST body has selected=0&selected=2.
 */

// ── Selection ──────────────────────────────────────────────────

function getRowBoxes(table: HTMLTableElement): HTMLInputElement[] {
  return [
    ...table.querySelectorAll<HTMLInputElement>(
      "tbody [data-selection-cb] input",
    ),
  ];
}

function syncSelectAll(
  selectAll: HTMLInputElement,
  boxes:     HTMLInputElement[],
): void {
  const n = boxes.filter(cb => cb.checked).length;
  selectAll.checked       = boxes.length > 0 && n === boxes.length;
  selectAll.indeterminate = n > 0 && n < boxes.length;
}

function buildSelected(boxes: HTMLInputElement[]): number[] {
  return boxes
    .map((cb, i) => {
      if (!cb.checked) return -1;
      const row = cb.closest<HTMLTableRowElement>("tr");
      return row?.dataset.rowIndex !== undefined
        ? Number(row.dataset.rowIndex)
        : i;
    })
    .filter(i => i !== -1);
}

function initSelectableTable(table: HTMLTableElement): void {
  const wrapper   = table.closest<HTMLElement>("[data-selectable]");
  const selectAll = table.querySelector<HTMLInputElement>(
    "thead [data-selection-cb] input",
  );

  if (!wrapper || !selectAll) return;

  wrapper.dataset.selected = "[]";

  selectAll.addEventListener("change", () => {
    const boxes = getRowBoxes(table);
    boxes.forEach(cb => { cb.checked = selectAll.checked; });
    syncSelectAll(selectAll, boxes);
    persistAndDispatch(wrapper, buildSelected(boxes), boxes.length, "table:selectionchange");
  });

  table.querySelector("tbody")?.addEventListener("change", e => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.closest("[data-selection-cb]"))  return;

    const boxes = getRowBoxes(table);
    syncSelectAll(selectAll, boxes);
    persistAndDispatch(wrapper, buildSelected(boxes), boxes.length, "table:selectionchange");
  });
}

document
  .querySelectorAll<HTMLTableElement>("[data-selectable] .table")
  .forEach(initSelectableTable);

// ── Sort ────────────────────────────────────────────────────────

interface SortDetail {
  key:       string;
  direction: "asc" | "desc";
}

function initSortableTable(table: HTMLTableElement): void {
  const wrapper = table.closest<HTMLElement>(".data");
  if (!wrapper) return;

  table.addEventListener("click", e => {
    const btn = (e.target as Element).closest<HTMLButtonElement>(".table__sort-btn");
    if (!btn) return;

    const th = btn.closest<HTMLTableCellElement>("th[data-key]");
    if (!th) return;

    const key       = th.dataset.key!;
    const current   = th.getAttribute("aria-sort");
    const direction: "asc" | "desc" = current === "ascending" ? "desc" : "asc";

    table.querySelectorAll<HTMLElement>("th[data-key]").forEach(h => {
      h.setAttribute("aria-sort", "none");
    });
    th.setAttribute("aria-sort", direction === "asc" ? "ascending" : "descending");

    wrapper.dispatchEvent(
      new CustomEvent<SortDetail>("table:sortchange", {
        bubbles:    true,
        cancelable: false,
        detail: { key, direction },
      }),
    );
  });
}

document
  .querySelectorAll<HTMLTableElement>(".table--sortable")
  .forEach(initSortableTable);