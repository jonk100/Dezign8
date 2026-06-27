import type { OverlaysProps } from "../../overlays.props";
import type { IconProps } from "~/shared/icon.props";

export interface AlertDialogProps extends OverlaysProps, IconProps {
  id:           string;
  title:        string;
  description?: string;
  closeOnEsc?:  boolean;
}
