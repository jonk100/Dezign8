// design/feedback/components/tag/tag.props.ts

import type { FeedbackProps } from "../../feedback.props";

export interface TagProps extends FeedbackProps {
  // Tags currently have no component-specific props beyond the standard FeedbackProps
  // The slot handles the text content.
}
