// design/surfaces/components/paper/paper.props.ts

import type { SurfaceProps } from "../../surface.props";
import type { PaperGap }     from "./paper.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Paper: true;
  }
}

export type PaperTag = "div" | "section" | "article" | "aside" | "main" | "li";

export interface PaperProps extends SurfaceProps {
  /** HTML element to render as. @default "div" */
  as?: PaperTag;

  /**
   * Stack children vertically using flexbox.
   * Enables gap between children; does nothing otherwise.
   * @default false
   */
  stack?: boolean;

  /**
   * Gap between stacked children. Only meaningful when stack=true.
   * @default "md"
   */
  gap?: PaperGap;

  /**
   * Expand to fill container width.
   * @default false
   */
  fullWidth?: boolean;
}
