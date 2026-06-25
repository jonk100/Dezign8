import type { OverlaysProps } from "../../overlays.props";

export interface ModalProps extends OverlaysProps {
  id:               string;
  title?:           string;
  closeOnBackdrop?: boolean;
  closeOnEsc?:      boolean;
}
