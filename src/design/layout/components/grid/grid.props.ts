import type { LayoutProps } from "../../layout.props";
import type { GridColumns, GridFit, GridTag } from "./grid.tokens";

export interface GridProps extends LayoutProps {
  /** Number of grid columns. */
  columns?: GridColumns;
  fit?: GridFit;
  /** HTML tag to render as. @default "div" */
  as?: GridTag;
}
