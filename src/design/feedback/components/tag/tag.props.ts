// design/feedback/components/tag/tag.props.ts

import type { FeedbackProps } from "../../feedback.props";

import type { IconProps } from "~/shared/icon.props";

export interface TagProps extends FeedbackProps, IconProps {
  /**
   * Renders a square tag containing only an icon.
   */
  iconOnly?: boolean;
}
