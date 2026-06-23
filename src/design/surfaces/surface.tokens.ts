// design/surfaces/surface.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { SPACE, RADIUS_DIM, COLOR_ROLE }  from "~/shared/primitives.tokens";

// ─── LAYER SCALE ──────────────────────────────────────────────
//
// Each layer is a complete visual unit: background + shadow + border.
// CSS sets all three via --surface--bg, --surface--shadow, --surface--border
// inside each .surface--layer-* class.
//
// Layer assignments by component:
//   0         Section, Container — page canvas, no lift
//   1         Frame, Paper — slight raise from page
//   2         Card — distinct bounded object
//   3         Tile, Panel — prominent surfaces
//   4         Tooltip, ContextMenu, Popover — lightweight overlays (z--overlay)
//   5         Sheet, DropdownMenu, Drawer — panel overlays (z--modal)
//   6         Modal, AlertDialog, Lightbox — top-level blocking (z--top)
//   inset     Well — sunken below the current context
//
// z-index is applied automatically at layers 4–6.
// Layers 0–3 are in normal stacking context.

const SURFACE_LAYER = scale({
  "0":    null,
  "1":    null,
  "2":    null,
  "3":    null,
  "4":    null,
  "5":    null,
  "6":    null,
  inset:  null,
});

// ─── CATEGORY SPEC ────────────────────────────────────────────

export const SURFACE_TOKENS = defineTokens({
  /**
   * Elevation layer. Class-only — CSS sets --surface--bg / --shadow / --border
   * inside each .surface--layer-* rule. See surface.css.
   */
  layer: dimension("layer", SURFACE_LAYER, { modifier: "layer" }),

  /**
   * Inner padding. Written as --surface--padding.
   */
  padding: dimension("padding", SPACE),

  /**
   * Border radius. Shared RADIUS_DIM — emits --surface--radius.
   */
  radius: RADIUS_DIM,

  /**
   * Color role. Drives --surface--color--* channels via resolveColorRole.
   * Values are null — resolved separately by useSurface, not by resolveTokens.
   */
  color: { key: "color", values: COLOR_ROLE },
});

// ─── DERIVED TYPES ────────────────────────────────────────────

export type SurfaceLayer  = keyof typeof SURFACE_LAYER;
export type SurfacePadding = keyof typeof SPACE;
export type SurfaceRadius  = keyof typeof RADIUS_DIM.values;

export type { ColorRole } from "~/shared/primitives.tokens";
