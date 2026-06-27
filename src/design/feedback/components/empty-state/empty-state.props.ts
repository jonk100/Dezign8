import type { FeedbackProps } from "../../feedback.props";
import type { IconProps } from "~/shared/icon.props";

export interface EmptyStateProps extends FeedbackProps, IconProps {
  title?: string;
  description?: string;
}
