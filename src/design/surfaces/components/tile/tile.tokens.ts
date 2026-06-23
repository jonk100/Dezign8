// design/surfaces/components/tile/tile.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const TILE_DEFAULTS = {
  layer:   "3"  as SurfaceLayer, // tile/panel tier
  padding: "md" as SurfacePadding,
} as const;
