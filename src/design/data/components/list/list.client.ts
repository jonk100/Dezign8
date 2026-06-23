// design/data/list/list.client.ts

import { persistAndDispatch } from "~/data/data.utils";

/**
 * Client-side selection manager for <List selectable />.
 *
 * READING SELECTION STATE
 * ─────────────────────────────────────────────────────────────────
 * On a button click:
 *   const selected = JSON.parse(list.dataset.selected ?? "[]");
 *
 * Reactively:
 *   list.addEventListener("list:selectionchange", e => {
 *     const { selected, all, none } = e.detail;
 *   });
 *
 * FORM PARTICIPATION
 * ─────────────────────────────────────────────────────────────────
 * Selection checkboxes render as <input name="selected" value="0" />.
 * Submit a form containing the list → POST body has selected=0&selected=2.
 *
 * NOTE: to-do checkboxes (from item.checkState) are not wired here.
 * They are per-item state, not bulk selection state.
 */

function initSelectableList(list: HTMLElement): void {
  list.dataset.selected = "[]";

  list.addEventListener("change", e => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.closest("[data-selection-cb]"))  return;

    const boxes = [
      ...list.querySelectorAll<HTMLInputElement>("[data-selection-cb] input"),
    ];

    const selected = boxes
      .map((cb, i) => cb.checked ? i : -1)
      .filter(i => i !== -1);

    persistAndDispatch(list, selected, boxes.length, "list:selectionchange");
  });
}

document
  .querySelectorAll<HTMLElement>("[data-selectable].list")
  .forEach(initSelectableList);