/**
 * LayoutProps
 * 
 * Defines the structural box model and flex/grid behaviors.
 * 
 * @prop justify - Aligns items along the main axis.
 * @prop align - Aligns items along the cross axis.
 * @prop gap - Uniform spacing between children, syncing with theme tokens.
 */
// design/layout/layout.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { SpacingProps } from "~/shared/spacing.props";
import type { LayoutGap, LayoutAlign, LayoutJustify } from "./layout.tokens";

export interface LayoutProps extends BaseComponentProps, SpacingProps {
  /**
   * Uniform spacing between child elements via `gap` (flex/grid).
   * Maps to `--layout--gap` CSS variable.
   */
  gap?:     LayoutGap;

  /** 
   * Controls `align-items` for flex/grid containers.
   * Defines how items are aligned along the cross axis.
   */
  align?:   LayoutAlign;
  
  /** 
   * Controls `justify-content` for flex/grid containers.
   * Defines how items are aligned along the main axis.
   */
  justify?: LayoutJustify;
}