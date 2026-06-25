export { OVERLAY_TOKENS } from "../../overlays.tokens";
export type { OverlaySize, OverlayVariant, OverlayRadius } from "../../overlays.tokens";

export const MODAL_DEFAULTS = {
  size:            "md"      as const,
  variant:         "default" as const,
  closeOnBackdrop: true,
  closeOnEsc:      true,
} as const;
