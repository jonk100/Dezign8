// design/assets/image/image.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { SpacingProps }       from "~/shared/spacing.props";
import type { ImageRadius, ImageRatio, ImageFit } from "./image.tokens";

export interface ImageProps extends BaseComponentProps, SpacingProps {
  /** Image source URL. */
  src:       string;
  /** Alt text. Pass empty string for decorative images. */
  alt:       string;
  /** Aspect ratio preset. */
  ratio?:    ImageRatio;
  /** object-fit behaviour. @default 'cover' */
  fit?:      ImageFit;
  /** Native loading strategy. @default 'lazy' */
  imgLoading?:  "lazy" | "eager";
  /** Border radius. */
  radius?:   ImageRadius;
  /** Intrinsic width. */
  width?:    number | string;
  /** Intrinsic height. 
   * accepts a number or a string with a unit (e.g., "100px").
   */
  height?:   number | string;
}