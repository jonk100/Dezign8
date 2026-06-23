import type { TypographyProps } from "../../typography.props";
import type { CaptionTag } from "./caption.tokens";

/**
 * Props for the Caption component.
 *
 * Extends {@link TypographyProps} with caption-specific options for
 * structure and placement.
 *
 * @see {@link useCaption} in `caption.hook.ts`
 */
export interface CaptionProps extends TypographyProps {
  /** The HTML tag to render. Defaults to `figcaption`. */
  as?: CaptionTag;
  /** An optional lead-in label, e.g., "Figure 1". */
  label?: string;
  /** An optional credit/attribution line. For rich content, use the `credit` slot. */
  credit?: string;
  /** If true, renders the caption as an overlay on a positioned parent. */
  overlay?: boolean;
  /** If true, adds a decorative left border accent. */
  rule?: boolean;
}