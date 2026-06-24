import type { BaseComponentProps } from "~/shared/base.props";
import type { DrawerPlacement, DrawerSize } from "./drawer.tokens";

export interface DrawerProps extends BaseComponentProps {
  id:               string;
  title?:           string;
  placement?:       DrawerPlacement;
  size?:            DrawerSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?:      boolean;
}
