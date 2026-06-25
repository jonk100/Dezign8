import type { BaseComponentProps } from "~/shared/base.props";
import type { OverlaySize, OverlayVariant, OverlayRadius } from "./overlays.tokens";

export interface OverlaysProps extends BaseComponentProps {
  size?:    OverlaySize;
  variant?: OverlayVariant;
  radius?:  OverlayRadius;
}