import type { LayoutProps } from "../../layout.props";
import type { InlineTag } from "./inline.tokens";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */


export interface InlineProps extends LayoutProps {
  /** HTML tag to render as. @default "span" */
  as?: InlineTag;
}
