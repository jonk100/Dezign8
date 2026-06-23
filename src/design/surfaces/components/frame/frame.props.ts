// design/surfaces/components/frame/frame.props.ts
import type { SurfaceProps } from "../../surface.props";

export type FrameTag = "div" | "figure" | "picture" | "span";

export interface FrameProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: FrameTag;

  /**
   * Aspect ratio of the frame.
   * Can be a fraction (e.g., "16/9", "4/3") or a single number (e.g., "1").
   * @default "auto"
   */
  ratio?: string;

  /**
   * Prevents content from overflowing the frame boundaries.
   * Useful when rounding corners of media content.
   * @default true
   */
  clip?: boolean;
}
