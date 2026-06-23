import type { StepProps } from "./step.props";

export function useStep(props: StepProps) {
  const { 
    state, 
    label, 
    description, 
    isLast, 
    href, 
    interactive,
    stepNumber,
    class: className, 
    ...rest 
  } = props;

  let Tag: any = "div";
  if (href) Tag = "a";
  else if (interactive) Tag = "button";

  const typeAttr = Tag === "button" ? { type: "button" } : {};

  return {
    Tag,
    isLast,
    label,
    description,
    stepNumber,
    stepProps: {
      href,
      "data-state": state,
      "aria-current": state === "current" ? "step" : undefined,
      class: ["stepper__step-wrapper", className].filter(Boolean).join(" "),
      ...typeAttr,
      ...rest
    }
  };
}
