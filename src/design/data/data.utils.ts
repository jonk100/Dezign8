// design/data/data.client.ts

/**
 * Shared client-side utilities for selectable data components.
 *
 * Imported by table.client.ts, list.client.ts, and any future
 * selectable data component (feed.client.ts, timeline.client.ts, etc.).
 *
 * EVENT CONTRACT
 * ─────────────────────────────────────────────────────────────────
 * Every selectable data component dispatches its own namespaced event:
 *   table:selectionchange
 *   list:selectionchange
 *   feed:selectionchange   (future)
 *
 * All share the same SelectionDetail shape. The element also writes
 * dataset.selected (JSON array) so state is readable without a listener.
 *
 * READING SELECTION WITHOUT A LISTENER
 * ─────────────────────────────────────────────────────────────────
 * const selected = JSON.parse(el.dataset.selected ?? "[]") as number[];
 */

/**
 * Payload for all data component selection events.
 * Dispatched as CustomEvent<SelectionDetail> on the root element.
 */
export interface SelectionDetail {
  /** 0-based indices of currently selected items. */
  selected: number[];
  /** True when every item is selected. */
  all:  boolean;
  /** True when no items are selected. */
  none: boolean;
}

/**
 * Writes the current selection to `element.dataset.selected` and
 * dispatches a namespaced selection event.
 *
 * Call this whenever checked state changes — both client files
 * delegate here so the persist + dispatch logic stays in one place.
 *
 * @param element   - The root selectable element (.data[data-selectable])
 * @param selected  - Current selected indices
 * @param total     - Total number of selectable items (for `all` flag)
 * @param eventName - Component-specific event name ("table:selectionchange" etc.)
 */
export function persistAndDispatch(
  element:   HTMLElement,
  selected:  number[],
  total:     number,
  eventName: string,
): void {
  const detail: SelectionDetail = {
    selected,
    all:  total > 0 && selected.length === total,
    none: selected.length === 0,
  };

  // Always-current — readable without a listener
  element.dataset.selected = JSON.stringify(selected);

  element.dispatchEvent(
    new CustomEvent<SelectionDetail>(eventName, {
      bubbles:    true,
      cancelable: false,
      detail,
    }),
  );
}