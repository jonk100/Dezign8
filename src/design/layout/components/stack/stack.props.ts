import type { BaseComponentProps } from "~sh/base.props";
import type { StackGap, StackTag } from "./stack.tokens";
import type { LayoutAlign, LayoutJustify } from "~/layout/layout.tokens";

export interface StackProps extends BaseComponentProps {
  /** HTML tag to render as. @default "div" */
  as?: StackTag;

  /** Spacing between stacked children. @default "md" */
  gap?: StackGap;

  align?: LayoutAlign;

  justify?: LayoutJustify;
}