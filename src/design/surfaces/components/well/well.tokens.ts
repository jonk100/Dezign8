// design/surfaces/components/well/well.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const WELL_DEFAULTS = {
  layer:   "inset" as SurfaceLayer,
  padding: "md"    as SurfacePadding,
} as const;
