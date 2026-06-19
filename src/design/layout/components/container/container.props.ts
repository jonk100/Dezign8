import type { LayoutProps } from "../../layout.props";
import type { ContainerMaxWidth, ContainerTag } from "./container.tokens";

export interface ContainerProps extends LayoutProps {
  /** 
   * Maximum width of the container.
   * @default "lg"
   */
  maxWidth?: ContainerMaxWidth;
  
  /** HTML tag to render as. @default "div" */
  as?: ContainerTag;
}
