// design/typography/components/visually-hidden/visually-hidden.props.ts
import type { BaseComponentProps } from "~/shared/base.props";

export type VisuallyHiddenTag = "span" | "div";

export interface VisuallyHiddenProps extends BaseComponentProps {
  /**
   * HTML element to render as.
   * @default "span"
   */
  as?: VisuallyHiddenTag;
}
