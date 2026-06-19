// design/layout/box/box.props.ts

import type { LayoutProps } from "~l/layout.props";
import type { BoxTag, BoxRadius } from "./box.tokens";

/**
 * Interface: `BoxProps`
 * 
 * Box is the fundamental layout primitive.
 * 
 * SPACING PROPS CHAIN:
 * `BoxProps` extends `LayoutProps`, which in turn extends `SpacingProps`.
 * This means every Box accepts a complete suite of spacing shorthand attributes
 * like `p` (padding), `px` (padding-x), `mt` (margin-top), etc., alongside
 * flex/grid controls like `gap`, `align`, and `justify`.
 */
export interface BoxProps extends LayoutProps {
  /** 
   * The semantic HTML element to render the box as.
   * Useful for accessibility and document outlining (e.g. 'section', 'article').
   * @default 'div' 
   */
  as?:     BoxTag;
  
  /** 
   * Visual border radius. 
   * Taps into the `RADIUS_DIM` token scale.
   */
  radius?: BoxRadius;
}