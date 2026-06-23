// design/surfaces/components/well/well.props.ts
import type { SurfaceProps } from "../../surface.props";

export type WellTag = "div" | "article" | "section" | "aside" | "span";

export interface WellProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: WellTag;
}
