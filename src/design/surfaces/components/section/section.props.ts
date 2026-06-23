// design/surfaces/components/section/section.props.ts
import type { SurfaceProps } from "../../surface.props";

export type SectionTag = "section" | "div" | "article" | "main" | "header" | "footer";

export interface SectionProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "section"
   */
  as?: SectionTag;
}
