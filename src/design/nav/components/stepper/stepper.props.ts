import type { NavProps } from "../../nav.props";

export type StepState = "complete" | "current" | "incomplete";

export interface StepperItemData {
  id: string;
  label: string;
  description?: string;
  state?: StepState;
}

export interface StepperProps extends NavProps {
  /** Array of step data for auto-generation */
  items?: StepperItemData[];
  /** Orientation of the stepper */
  orientation?: "horizontal" | "vertical";
  /** If data-driven, which step index is currently active (0-indexed). Auto-calculates states. */
  currentStepIndex?: number;
}
