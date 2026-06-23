// design/surfaces/components/panel/panel.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const PANEL_DEFAULTS = {
  layer:   "3"  as SurfaceLayer, // tile/panel tier
  padding: "md" as SurfacePadding,
} as const;
