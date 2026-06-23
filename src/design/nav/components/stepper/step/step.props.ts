import type { HTMLAttributes } from "astro/types";
import type { StepState } from "../stepper.props";

export interface StepProps extends HTMLAttributes<"div" | "a" | "button"> {
  /** The state of the step */
  state: StepState;
  /** Primary label */
  label?: string;
  /** Optional secondary description */
  description?: string;
  /** Indicates if this is the last step (hides the connecting line) */
  isLast?: boolean;
  /** URL to navigate to, if the step is a link */
  href?: string;
  /** If true and no href is provided, renders as a button. Otherwise a div. */
  interactive?: boolean;
  /** The step number or icon to display inside the indicator circle */
  stepNumber?: number | string;
}
