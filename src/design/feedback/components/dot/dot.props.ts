// design/feedback/components/dot/dot.props.ts
import type { FeedbackProps } from "../../feedback.props";

export interface DotProps extends FeedbackProps {
  // Dot has no new behavioral props beyond what FeedbackProps provides,
  // but maps specifically to size, variant, color, pulse, and placement.
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Dot: true;
  }
}
