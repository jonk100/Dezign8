// design/surfaces/components/frame/frame.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const FRAME_DEFAULTS = {
  layer:   "0"    as SurfaceLayer, // default to no lift, just bounds
  padding: "none" as SurfacePadding, // default to no padding to fit media exactly
} as const;
