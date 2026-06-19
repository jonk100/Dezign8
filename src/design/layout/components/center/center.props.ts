import type { LayoutProps } from "../../layout.props";
import type { CenterDirection } from "./center.tokens";

export interface CenterProps extends LayoutProps {
  /** 
   * Axis along which to center the content.
   * @default "both"
   */
  direction?: CenterDirection;
}
