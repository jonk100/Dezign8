import { useNav } from "../../nav.hook";
import type { StepperProps } from "./stepper.props";

const STEPPER_DEFAULTS = {
  size: "md",
  variant: "soft"
} as const;

export function useStepper(props: StepperProps) {
  const { 
    items, 
    orientation = "horizontal",
    currentStepIndex = 0,
    size = STEPPER_DEFAULTS.size,
    variant = STEPPER_DEFAULTS.variant,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps } = useNav({ size, variant, ...navProps });

  return {
    stepperProps: {
      "aria-label": "Progress",
      "data-orientation": orientation,
      ...resolvedNavProps,
      class: ["stepper", resolvedNavProps.class].filter(Boolean).join(" ")
    },
    items,
    orientation,
    currentStepIndex
  };
}
