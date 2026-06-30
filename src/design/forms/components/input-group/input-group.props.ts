import type { BaseComponentProps } from "~/shared/base.props";
import type { InputGroupSpacing } from "./input-group.tokens";
import type { FlexProps } from "~/layout/components/flex/flex.props";

export type InputGroupOrientation = "horizontal" | "vertical";

export interface InputGroupProps extends BaseComponentProps, Omit<FlexProps, "gap" | "direction"> {
  /** Orientation of the layout. @default "horizontal" */
  orientation?: InputGroupOrientation;

  /** Whether the fields should visually join together. @default true */
  connected?: boolean;

  /** Spacing between fields (only applies when connected is false). @default "sm" */
  spacing?: InputGroupSpacing;
}
