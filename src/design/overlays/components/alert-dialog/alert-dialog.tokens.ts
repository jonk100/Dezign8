export { OVERLAY_TOKENS } from "../../overlays.tokens";
export type { OverlaySize, OverlayVariant, OverlayRadius } from "../../overlays.tokens";

export const ALERT_DIALOG_DEFAULTS = {
  size:      "sm"       as const,
  variant:   "centered" as const,
  // AlertDialog requires an explicit button choice — no backdrop dismiss, no Esc by default
  closeOnEsc: false,
} as const;
