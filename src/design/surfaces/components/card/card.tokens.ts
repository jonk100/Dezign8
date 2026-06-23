// design/surfaces/components/card/card.tokens.ts

/**
 * Card re-exports the full surface spec unchanged.
 * Card's unique features (href, interactive, selectable, selected, disabled)
 * are behavioral props — not token dimensions — so no composeTokens needed.
 */
export { SURFACE_TOKENS as CARD_TOKENS } from "../../surface.tokens";
export type {
  SurfaceLayer   as CardLayer,
  SurfacePadding as CardPadding,
  SurfaceRadius  as CardRadius,
  ColorRole      as CardColor,
} from "../../surface.tokens";

import type { CardTag } from "./card.props";
import type { SurfaceLayer } from "../../surface.tokens";

export const CARD_DEFAULTS = {
  as:          "div"  as CardTag,
  layer:       "2"    as SurfaceLayer,  // card tier
  outlined:    true,                    // cards default to outlined; layer-3 border + explicit override
  padding:     "md"   as const,
  radius:      "md"   as const,
  interactive: false,
  selectable:  false,
  selected:    false,
  disabled:    false,
} as const;
