import type { BaseComponentProps } from "~/shared/base.props";
import type { PopoverPlacement, PopoverRadius } from "./popover.tokens";

export interface PopoverProps extends BaseComponentProps {
  id:          string;
  placement?:  PopoverPlacement;
  radius?:     PopoverRadius;
}
