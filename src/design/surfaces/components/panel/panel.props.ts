// design/surfaces/components/panel/panel.props.ts
import type { SurfaceProps } from "../../surface.props";

export type PanelTag = "div" | "aside" | "section" | "details";

export interface PanelProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: PanelTag;
}
