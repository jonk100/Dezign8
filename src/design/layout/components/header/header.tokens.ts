// design/layout/components/header/header.tokens.ts

/**
 * Header Token Spec
 *
 * Header re-exports the full layout spec (gap, align, justify) unchanged.
 * It adds no new token dimensions — the header's opinionated defaults live
 * in HEADER_DEFAULTS as default values on existing LayoutProps, not as new
 * token dimensions.
 *
 * Visual defaults (background, min-height, bottom border) are expressed as
 * CSS fallback values in header.css so that the CSS file is the single source
 * of truth for "looks good out of the box" styling.
 */

import { LAYOUT_TOKENS } from "~l/layout.tokens";
import type { Space } from "~sh/primitives.tokens";

export { LAYOUT_TOKENS as HEADER_TOKENS };

export type {
  LayoutGap     as HeaderGap,
  LayoutAlign   as HeaderAlign,
  LayoutJustify as HeaderJustify,
} from "~l/layout.tokens";

/**
 * Opinionated prop defaults applied by `useHeader` when the consumer does not
 * explicitly set a value. Every key maps to an existing LayoutProp / SpacingProp.
 *
 * Overriding any of these is fully supported — pass the prop explicitly to the
 * `<Header>` component and the default is discarded.
 *
 * @property px      - Horizontal padding. Keeps content off the viewport edge.
 * @property align   - Cross-axis alignment. Centers children vertically.
 * @property justify - Main-axis alignment. Pushes start/end slots to opposite edges,
 *                     which is the correct default for logo-left / actions-right layouts.
 */
export const HEADER_DEFAULTS = {
  px:      "lg"      as Space,
  align:   "center"  as const,
  justify: "between" as const,
} as const;
