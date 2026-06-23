// design/feedback/components/chip/chip.props.ts

import type { FeedbackProps } from "../../feedback.props";

export interface ChipProps extends FeedbackProps {
  /**
   * Defines the HTML element used for the chip.
   * Defaults to `"button"` to allow for interactivity.
   * @default `"button"`
   */
  as?: any; // To allow arbitrary HTML tags, though usually it's "button" or "a"
}
