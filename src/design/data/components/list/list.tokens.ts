// design/data/list/list.tokens.ts

/**
 * TOKEN SPEC, TYPES, AND DEFAULTS FOR THE LIST COMPONENT
 * ─────────────────────────────────────────────────────────────
 * List adds one token dimension on top of DataProps:
 *
 *   orientation  →  .list--vertical | .list--horizontal  (class-only)
 *
 * All color channels, density, variant, and state tokens are inherited
 * from DataProps and resolved by useData. LIST_TOKENS is only passed
 * to resolveTokens for the orientation dimension.
 *
 * LISTITEM
 * ─────────────────────────────────────────────────────────────
 * The shape of a data-driven list item. Mirrors the use cases:
 *
 *   label + icon          → feature/bullet list
 *   label + checkState    → to-do / checklist
 *   label + href          → link list
 *   label + description   → contact / settings item
 *   label + badge         → notification / count list
 *   label + children      → nested sub-list (recursive)
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import type { CheckState }               from "~/forms/components/checkbox/checkbox.tokens";

export type { CheckState };

// ─── LIST-ONLY SCALES ─────────────────────────────────────────

/**
 * Layout axis for list items.
 * Class-only — drives `flex-direction` in list.css.
 *
 * - `vertical`   — stacked top-to-bottom (default)
 * - `horizontal` — side-by-side; use for tag lists, chip groups
 */
const LIST_ORIENTATION = scale({
  vertical:   null,
  horizontal: null,
});

// ─── TOKEN SPEC ───────────────────────────────────────────────

export const LIST_TOKENS = defineTokens({
  orientation: dimension("orientation", LIST_ORIENTATION, { modifier: true }),
});

// ─── LIST ITEM SHAPE ──────────────────────────────────────────

/**
 * A single item in a data-driven list.
 *
 * All fields except `label` are optional — List renders what is present:
 *   icon        → leading icon (from the project's icon registry)
 *   checkState  → renders a Checkbox; drives the to-do / checklist pattern
 *   href        → wraps the item content in an <a> element
 *   description → second line of text beneath the label
 *   badge       → trailing count or label (right-aligned)
 *   disabled    → mutes the item and prevents interaction
 *   children    → nested sub-list rendered as a child <ul>/<ol>
 *
 * @example
 * ```ts
 * const tasks: ListItem[] = [
 *   { label: "Buy milk",       checkState: "checked"   },
 *   { label: "Write tests",    checkState: "unchecked" },
 *   { label: "Deploy staging", checkState: "unchecked", disabled: true },
 * ];
 *
 * const links: ListItem[] = [
 *   { label: "Documentation", href: "/docs", icon: "book"  },
 *   { label: "GitHub",        href: "https://github.com", icon: "github" },
 * ];
 *
 * const nested: ListItem[] = [
 *   { label: "Frontend", children: [
 *     { label: "React" },
 *     { label: "Astro" },
 *   ]},
 * ];
 * ```
 */
export interface ListItem {
  /** Primary text. Always required. */
  label: string;

  /**
   * Icon name from the project icon registry.
   * Rendered as a leading icon before the label.
   */
  icon?: string;

  /**
   * Check state for to-do / checklist items.
   * When present, the item renders a `<Checkbox>` instead of a bullet.
   * Reuses the forms category's `CheckState` union directly.
   *
   * @see CheckState — `"checked" | "unchecked" | "indeterminate"`
   */
  checkState?: CheckState;

  /**
   * When provided, the item content is wrapped in an `<a>` element.
   * List item becomes a link; `interactive` is implied for that item.
   */
  href?: string;

  /** Secondary line of text beneath the label. */
  description?: string;

  /**
   * Trailing badge — a count or short label aligned to the right edge.
   * Numbers render as-is; strings are truncated if they exceed badge width.
   */
  badge?: string | number;

  /**
   * Mutes the item visually and prevents pointer interaction.
   * Does not affect the item's position or layout.
   */
  disabled?: boolean;

  /**
   * Nested list items rendered as a child `<ul>` (or `<ol>` if the
   * parent List has `ordered`). Supports arbitrary depth.
   */
  children?: ListItem[];
}

// ─── DERIVED TYPES ────────────────────────────────────────────

export type ListOrientation = keyof typeof LIST_ORIENTATION;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const LIST_DEFAULTS = {
  ordered:     false,
  orientation: "vertical" as ListOrientation,
} as const satisfies {
  ordered:     boolean;
  orientation: ListOrientation;
};