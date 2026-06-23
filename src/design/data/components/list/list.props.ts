// design/data/list/list.props.ts

import type { DataProps }                        from "~/data/data.props";
import type { ListItem, ListOrientation }        from "./list.tokens";

/**
 * Props for the `<List>` component.
 *
 * Extends {@link DataProps} which extends {@link BaseComponentProps}.
 * All inherited data category props are available without redeclaration:
 * color, bg, highlight, variant, size, caption, loading, empty,
 * striped, bordered, interactive, selectable, scrollable.
 *
 * **Two rendering modes:**
 *
 * Data-driven — List owns all rendering:
 * ```astro
 * <List data={items} caption="Tasks" />
 * ```
 *
 * Compound — consumer controls item structure via the `items` slot:
 * ```astro
 * <List caption="Tasks">
 *   <li slot="items" class="list__item">Custom item</li>
 * </List>
 * ```
 *
 * **What is intentionally NOT in ListProps:**
 * - Per-item event handlers — selection is managed externally via
 *   `list:selectionchange` on the root element (same pattern as Table)
 * - `bullet` style — controlled via CSS on the consumer side or via
 *   the `class` prop; too many edge cases to enumerate as a prop
 *
 * @see {@link DataProps}      in `data/data.props.ts`        — parent interface
 * @see {@link ListItem}       in `data/list/list.tokens.ts`  — item shape
 * @see {@link LIST_DEFAULTS}  in `data/list/list.tokens.ts`  — default values
 * @see {@link useList}        in `data/list/list.hook.ts`    — runtime resolution
 */
export interface ListProps extends DataProps {

  // ─── DATA-DRIVEN MODE ──────────────────────────────────────

  /**
   * Items to render. Each object is one `<li>`.
   *
   * Provide `checkState` on items for a checklist/to-do pattern.
   * Provide `children` on items for nested sub-lists.
   * Provide `href` on items for a link list.
   *
   * When omitted, List renders only what is provided via the `items` slot
   * (compound mode).
   *
   * @see {@link ListItem} for the full item shape
   */
  data?: ListItem[];

  // ─── LAYOUT ────────────────────────────────────────────────

  /**
   * Renders as `<ol>` (ordered / numbered) instead of `<ul>`.
   *
   * Applies to the root list and all nested child lists.
   * List markers are browser-default for `<ol>` — override in CSS
   * via `list-style-type` on `.list` if custom numbering is needed.
   *
   * @default false
   */
  ordered?: boolean;

  /**
   * Layout axis for list items.
   *
   * - `"vertical"`   — stacked (default). Standard list behaviour.
   * - `"horizontal"` — side-by-side. Use for tag groups, chip lists,
   *                    inline option sets. Adds `flex-wrap: wrap` so
   *                    items reflow when the container is narrow.
   *
   * Adds modifier class `.list--vertical` or `.list--horizontal`.
   *
   * @default `"vertical"` — applied by {@link useList}
   */
  orientation?: ListOrientation;
}