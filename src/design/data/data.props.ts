// design/data/data.props.ts

/**
 * Shared prop interface for all data category components.
 *
 * Components: Table, List, Feed, Stat, Metric (and future extensions).
 *
 * PROP GROUPS
 * ─────────────────────────────────────────────────────────────────
 * Color channels  color, bg, highlight
 *                 Set CSS custom property channels; component CSS
 *                 maps each channel to whichever property makes sense:
 *                   Table     → cell borders
 *                   List/Feed → item separators
 *                   Stat      → value text accent
 *                   etc.
 *
 * Container       variant, size
 *                 Visual treatment and density of the component shell.
 *
 * Metadata        caption
 *                 Maps to <caption> in Table, aria-label in charts,
 *                 a heading element in lists. Always present semantically.
 *
 * State           loading, empty
 *                 Data-availability states. loading shows skeleton UI;
 *                 empty shows a no-data message when the data source
 *                 returns zero items.
 *
 * Visual          striped, bordered
 *                 Alternating-row tint and explicit grid lines.
 *                 Not all components support both — unused props are
 *                 silently ignored by the component hook.
 *
 * Behavior        interactive, selectable, scrollable
 *                 Row/item interactivity modes. Components wire these
 *                 to ARIA attributes and CSS data-attributes as needed.
 *
 * INHERITANCE
 * ─────────────────────────────────────────────────────────────────
 * DataProps extends BaseComponentProps, which provides:
 *   class, v (visual registry), testId, animation, and HTML passthrough.
 *
 * Component props extend DataProps and add component-specific concerns:
 *   TableProps  → columns, data, stickyHeader, …
 *   ListProps   → data, ordered, …
 *   StatProps   → value, label, trend, format, …
 */

import type { BaseComponentProps } from "~/shared/base.props";
import type { ColorRole, DataVariant, DataSize } from "./data.tokens";

export interface DataProps extends BaseComponentProps {

  // ─── COLOR CHANNELS ──────────────────────────────────────────
  // All three accept a semantic color role. Component CSS reads the
  // emitted CSS custom property and applies it to the right element.

  /**
   * Primary accent color role.
   *
   * Maps to `--data--color` on the component root.
   * - Table:      cell / header border color
   * - List / Feed: item separator color
   * - Timeline:   connector line + node color
   * - Stat/Metric: value text accent
   */
  color?: ColorRole;

  /**
   * Background color role.
   *
   * Maps to `--data--bg`. Applied as a tint (typically via color-mix()
   * at ~10–15% opacity) so it reads as a subtle wash, not a solid fill.
   * Override with `variant="soft"` for a more intentional filled look.
   */
  bg?: ColorRole;

  /**
   * Highlight color role.
   *
   * Maps to `--data--highlight`. Applied to a specific sub-element
   * per component: highlighted/pinned rows in Table and List, the
   * current event in Timeline/Feed, the emphasis figure in Stat/Metric.
   * Has no effect on components with no highlight concept.
   */
  highlight?: ColorRole;

  // ─── CONTAINER ───────────────────────────────────────────────

  /**
   * Container decoration type.
   *
   * Adds a modifier class (`.data--outlined`, `.data--soft`, etc.).
   * CSS for each variant is defined in data.css and inherited by all
   * data components via the shared `.data` root class.
   *
   * - `plain`    — no border, no background (default)
   * - `outlined` — border around the component container
   * - `soft`     — subtle tinted background fill
   * - `elevated` — box shadow; use for card-like standalone contexts
   */
  variant?: DataVariant;

  /**
   * Row/item density.
   *
   * Sets `--data--size` on the component root. Component CSS reads this
   * channel and derives row height, cell padding, and item gap via calc().
   *
   * - `compact`     — tight rows; use in dense dashboards or data grids
   * - `comfortable` — default spacing; works in most contexts
   * - `spacious`    — generous padding; use for readability-focused layouts
   */
  size?: DataSize;

  // ─── ACCESSIBLE METADATA ─────────────────────────────────────

  /**
   * Accessible label or caption for the data structure.
   *
   * How this is rendered depends on the component:
   * - `Table`  → renders a `<caption>` element (native table semantics)
   * - Charts   → applied as `aria-label` on the `<figure>` root
   * - List / Feed → rendered as a visually-styled heading or `aria-label`
   *
   * Always provide a caption when the data component is not preceded by
   * a visible heading that describes it — screen readers use this to
   * announce what the table/list/chart represents.
   */
  caption?: string;

  // ─── STATE ───────────────────────────────────────────────────

  /**
   * `loading` is inherited from BaseComponentProps and handled universally
   * by useBaseCompose → data-loading="true". Each data component's Astro
   * template switches to skeleton output when loading is true.
   *
   * @see BaseComponentProps.loading
   */

  /**
   * Empty-state configuration.
   *
   * - `true`   → render the component's default empty-state UI
   * - `string` → render that string as the empty-state message
   * - omitted  → no explicit empty state; component renders as-is
   *
   * Use this when you know the data source is empty (zero items)
   * and want a structured "no data" indicator rather than blank space.
   * For rich custom empty states (illustrations, CTAs), use the
   * component's `empty` slot instead.
   */
  empty?: boolean | string;

  // ─── VISUAL MODIFIERS ────────────────────────────────────────

  /**
   * Alternating row/item background tint.
   *
   * Adds `.data--striped` on the root; CSS applies `--data--bg` at low
   * opacity to every even row/item. Improves scannability in dense lists.
   *
   * Supported by: Table, List, Feed.
   * Ignored by: Stat, Metric (no row concept).
   */
  striped?: boolean;

  /**
   * Explicit borders between rows/items (beyond the container outline).
   *
   * Adds `.data--bordered` on the root. In Table this means cell borders;
   * in List/Feed it means a divider line between items.
   *
   * Supported by: Table, List, Feed.
   * Ignored by: Stat, Metric.
   */
  bordered?: boolean;

  // ─── BEHAVIOR ────────────────────────────────────────────────

  /**
   * Whether rows/items respond to hover and pointer interaction.
   *
   * Adds `data-interactive="true"` and drives hover styles in CSS.
   * Does NOT make items keyboard-navigable on its own — pair with
   * `role` and `tabindex` management in the component when full
   * keyboard support is needed.
   *
   * Supported by: Table (rows), List (items), Feed (items).
   * Ignored by: Stat, Metric.
   */
  interactive?: boolean;

  /**
   * Whether items can be selected (checkbox / highlight pattern).
   *
   * Adds `data-selectable="true"` on the root. Component hooks wire
   * this to checkbox rendering, ARIA selection attributes, and
   * `.data--selected` modifier classes on individual rows/items.
   *
   * Selection state management (which items are selected) is the
   * consumer's responsibility via client-side scripting or framework
   * state — this prop only enables the visual and structural scaffolding.
   *
   * Supported by: Table, List.
   * Ignored by: Feed, Stat, Metric.
   */
  selectable?: boolean;

  /**
   * Whether the component container scrolls when content overflows.
   *
   * Adds `data-scrollable="true"`. Component CSS applies the
   * appropriate overflow axis:
   * - Table → `overflow-x: auto` (horizontal scroll for wide columns)
   * - List / Feed → `overflow-y: auto` (vertical scroll for long lists)
   *
   * Always set an explicit height or max-height on the component
   * (via `class` or inline style) when using `scrollable`, otherwise
   * the container will expand to fit all content and overflow-auto
   * has no effect.
   */
  scrollable?: boolean;
}