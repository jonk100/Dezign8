import type { BaseComponentProps } from "~/shared/base.props";
import type { TooltipPlacement, TooltipRadius } from "./tooltip.tokens";

export interface TooltipProps extends BaseComponentProps {
  content:    string;
  placement?: TooltipPlacement;
  radius?:    TooltipRadius;
}
