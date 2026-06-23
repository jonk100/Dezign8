import type { BaseComponentProps } from "~sh/base.props";
import type { StackGap, StackTag } from "./stack.tokens";
import type { LayoutAlign, LayoutJustify } from "~/layout/layout.tokens";

export interface StackProps extends BaseComponentProps {
  as?: StackTag;

  gap?: StackGap;

  align?: LayoutAlign;

  justify?: LayoutJustify;
}