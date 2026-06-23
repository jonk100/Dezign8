// design/surfaces/surface.props.ts

import type { BaseComponentProps }                        from "~/shared/base.props";
import type { SurfaceLayer, SurfacePadding,
              SurfaceRadius, ColorRole }                  from "./surface.tokens";

export type SurfaceVariant = "plain" | "outlined" | "soft" | "elevated" | "glass";

/**
 * Props shared by all surface category components.
 * Card, Paper, Frame, Panel, Section, Tile, Well all extend this.
 */
export interface SurfaceProps extends BaseComponentProps {
  /**
   * High-level visual style. Maps to underlying layer/outlined/glass primitives.
   */
  variant?: SurfaceVariant;
  /**
   * Elevation layer. Sets background, shadow, and border as a unit.
   * Each component has a sensible default; override to shift a surface
   * up or down the elevation stack.
   *
   *   "0"    Page-level regions — no lift, no border
   *   "1"    Slight raise — subtle background, xs shadow
   *   "2"    Paper — distinct from page, sm shadow
   *   "3"    Card — clear bounded object, md shadow
   *   "4"    Overlays — tooltip, popover, drawer; z-index: overlay
   *   "5"    Modals — dialog, lightbox; z-index: modal
   *   inset  Sunken — well, depressed input bg; inset shadow
   */
  layer?: SurfaceLayer;

  /**
   * Adds an explicit border, overriding the layer's default border.
   * Use when the surface needs stronger visual separation regardless
   * of elevation. Combines with the layer's background and shadow.
   * @default false
   */
  outlined?: boolean;

  /**
   * Frosted-glass treatment. Overrides the layer background with a
   * semi-transparent fill and applies backdrop-filter blur.
   * Best at layers 4–5 where a backdrop exists behind the surface.
   * @default false
   */
  glass?: boolean;

  /**
   * Blur radius for the glass treatment.
   * Raw CSS value — not a token. Only meaningful when glass=true.
   * @default "12px"
   */
  blur?: string;

  /**
   * Explicit shadow override. Overrides the layer's default shadow.
   * Accepts any CSS shadow value or "none" to strip elevation.
   * Raw CSS value — not a token dimension.
   * @example shadow="none"
   * @example shadow="var(--shadow--xl)"
   */
  shadow?: string;

  /**
   * Inner padding applied uniformly.
   * @default "md"
   */
  padding?: SurfacePadding;

  /**
   * Border radius.
   * @default "md"
   */
  radius?: SurfaceRadius;

  /**
   * Color role. Drives --surface--color--* channels.
   * Used for tinted status surfaces, accent borders, color-keyed cards.
   */
  color?: ColorRole;
}
