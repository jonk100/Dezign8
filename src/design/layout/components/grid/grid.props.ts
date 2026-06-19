import type { LayoutProps } from "../../layout.props";
import type { GridColumns, GridTag } from "./grid.tokens";

export interface GridProps extends LayoutProps {
  /** Number of grid columns. */
  columns?: GridColumns;
  
  /** HTML tag to render as. @default "div" */
  as?: GridTag;
}
