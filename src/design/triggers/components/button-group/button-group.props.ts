// design/triggers/button-group/button-group.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { TriggerSize, TriggerVariant, TriggerColor, TriggerRadius } from "../../trigger.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    ButtonGroup: true;
  }
}

export type ButtonGroupFor = "semantic" | "control" | "toolbar" | "split" | "toggle" | "cluster";
export type ButtonGroupOrientation = "horizontal" | "vertical";
export type ButtonGroupGridPreset = "22" | "33" | "44" | "222" | "131" | "141" | "212";

export interface ButtonGroupPropsBase extends BaseComponentProps {
  /** Defines the type/behavior of the button group. */
  for: ButtonGroupFor;
  /** Whether the buttons should visually join together. @default true (false if for="cluster") */
  grouped?: boolean;
  /** Orientation of the layout. @default "horizontal" */
  orientation?: ButtonGroupOrientation;
  /** Size step overriding all child buttons. */
  size?: TriggerSize;
  /** Visual variant overriding all child buttons. */
  variant?: TriggerVariant;
  /** Color role overriding all child buttons. */
  color?: TriggerColor;
  /** Border radius overriding all child buttons. */
  radius?: TriggerRadius;
  /** Static grid layout preset. */
  grid?: ButtonGroupGridPreset;
}

export interface SemanticButtonGroupProps extends ButtonGroupPropsBase {
  for: "semantic" | "cluster";
}

export interface ControlButtonGroupProps extends ButtonGroupPropsBase {
  for: "control";
  /** Currently selected value (matching value/data-value of a child button). */
  value?: string;
  /** Hidden input field name for form participation. */
  name?: string;
}

export interface ToggleButtonGroupProps extends BaseComponentProps, Omit<ButtonGroupPropsBase, "for"> {
  for: "toggle";
  /** Currently selected values. */
  values?: string[];
  /** Hidden input fields name for form participation. */
  name?: string;
}

export interface ToolbarButtonGroupProps extends ButtonGroupPropsBase {
  for: "toolbar";
  /** Accessibility label for the toolbar role. */
  "aria-label"?: string;
}

export interface SplitButtonGroupProps extends ButtonGroupPropsBase {
  for: "split";
}

export type ButtonGroupProps =
  | SemanticButtonGroupProps
  | ControlButtonGroupProps
  | ToggleButtonGroupProps
  | ToolbarButtonGroupProps
  | SplitButtonGroupProps;
