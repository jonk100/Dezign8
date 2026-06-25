import type { OverlaysProps } from "../../overlays.props";

export interface AlertDialogProps extends OverlaysProps {
  id:           string;
  title:        string;
  description?: string;
  closeOnEsc?:  boolean;
}
