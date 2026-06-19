// design/triggers/button/button.props.ts

import type { TriggerProps } from "../../trigger.props";
import type { ButtonType, ButtonTarget } from "./button.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Button: true;
  }
}

export interface ButtonProps extends TriggerProps {
  /** HTML button type. @default 'button' */
  type?:      ButtonType;
  /** Renders as <a> when set. */
  href?:      string;
  /** Anchor target. Only used with href. */
  target?:    ButtonTarget;
  /** Anchor rel. Auto-set to 'noopener noreferrer' when target='_blank'. */
  rel?:       string;
  /** Square icon-only button — removes inline padding, forces aspect-ratio 1. @default false */
  iconOnly?:  boolean;
  /** Expands to fill container width. @default false */
  fullWidth?: boolean;
}