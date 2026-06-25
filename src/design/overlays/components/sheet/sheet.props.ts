import type { OverlaysProps } from "../../overlays.props";

export type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetProps extends OverlaysProps {
  id: string;
  side?: SheetSide;
  title?: string;
}
