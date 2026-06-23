// design/surfaces/components/section/section.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const SECTION_DEFAULTS = {
  layer:   "0"    as SurfaceLayer,
  padding: "none" as SurfacePadding, // Sections often span edge-to-edge
} as const;
