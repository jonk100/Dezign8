// design/layout/components/footer/footer.tokens.ts

/**
 * Footer Token Spec
 *
 * Footer re-exports the full layout spec unchanged. Like Header, it introduces
 * no new token dimensions — its opinionated defaults are expressed as default
 * values in FOOTER_DEFAULTS (applied by the hook) and CSS fallbacks in
 * footer.css (for purely visual concerns like background and border).
 *
 * The footer is intentionally minimal: it is a semantic landmark and a visual
 * container, nothing more. Any richer layout (multi-column link grids, etc.)
 * is composed with Box children inside the footer's slots, not via footer props.
 */

import { LAYOUT_TOKENS } from "~l/layout.tokens";
import type { Space } from "~sh/primitives.tokens";

export { LAYOUT_TOKENS as FOOTER_TOKENS };

export type {
  LayoutGap     as FooterGap,
  LayoutAlign   as FooterAlign,
  LayoutJustify as FooterJustify,
} from "~l/layout.tokens";

/**
 * Opinionated prop defaults applied by `useFooter` when the consumer omits a
 * value. All are overridable by passing the prop explicitly.
 *
 * @property px      - Horizontal padding. Matches HEADER_DEFAULTS.px so that
 *                     footer and header content align on the same column edge.
 * @property align   - Cross-axis alignment. Centers children vertically in the
 *                     row (relevant when footer is used as a single-row bar).
 * @property justify - Main-axis alignment. `between` mirrors the header default,
 *                     appropriate for copyright-left / links-right layouts.
 */
export const FOOTER_DEFAULTS = {
  px:      "lg"      as Space,
  align:   "center"  as const,
  justify: "between" as const,
} as const;
