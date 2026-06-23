// design/data/data.tokens.ts

/**
 * Token spec for the data category.
 *
 * Components: Table, List, Feed, Stat, Metric (and future extensions).
 *
 * TOKEN DIMENSIONS
 * ─────────────────────────────────────────────────────────────────
 * prop       channel             consumed by
 * ─────────────────────────────────────────────────────────────────
 * color    → --data--color      borders, separators, or text accents
 *                               (varies per component)
 * bg       → --data--bg         container / row background tint
 * highlight→ --data--highlight  highlighted rows, pinned items,
 *                               current event, emphasis value
 * variant  → .data--{variant}  container decoration (class-only)
 * size     → --data--size      row/item density; CSS derives padding
 *            + .data--{size}   and height proportionally from it
 *
 * Boolean props (striped, bordered, loading, etc.) are not token
 * dimensions — they live in DataProps and the hook applies them as
 * data-attributes or conditional classes directly.
 *
 * COLOR CHANNEL STRATEGY
 * ─────────────────────────────────────────────────────────────────
 * color / bg / highlight all use COLOR_ROLE values
 * (e.g. "var(--token-color-primary)"). Component CSS then derives
 * tints via color-mix() for backgrounds and uses the role directly
 * for borders and text. This is the same pattern as --form--color-*.
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { COLOR_ROLE } from "~/shared/primitives.tokens";

// ─── DATA-ONLY SCALES ─────────────────────────────────────────
// Defined here, not in primitives — data-category concerns only.

/**
 * Container decoration variants. Class-only: null values mean
 * resolveTokens emits no CSS variable, only the modifier class.
 * CSS selects on .data--outlined, .data--soft, etc.
 */
const DATA_VARIANT = scale({
  plain:    null,  // no decoration
  outlined: null,  // border around container
  soft:     null,  // subtle background fill
  elevated: null,  // box shadow
});

/**
 * Row/item density.
 * References the global space scale so density is proportional to
 * the project's spacing system. Component CSS reads --data--size
 * and derives cell padding / row height via calc().
 */
const DATA_DENSITY = scale({
  compact:     "var(--space-in--xs)",
  comfortable: "var(--space-in--sm)",
  spacious:    "var(--space-in--md)",
});

// ─── CATEGORY SPEC ────────────────────────────────────────────

export const DATA_TOKENS = defineTokens({
  color:     { key: "color",     values: COLOR_ROLE },
  bg:        { key: "bg",        values: COLOR_ROLE },
  highlight: { key: "highlight", values: COLOR_ROLE },
  variant:   dimension("variant", DATA_VARIANT, { modifier: true }),
  size:      dimension("size",    DATA_DENSITY, { modifier: true }),
});

// ─── DERIVED TYPES ────────────────────────────────────────────

export type DataVariant = keyof typeof DATA_VARIANT;
export type DataSize    = keyof typeof DATA_DENSITY;

// ColorRole is re-exported from primitives for use in DataProps
// without making consumers reach into primitives directly.
export type { ColorRole } from "~/shared/primitives.tokens";