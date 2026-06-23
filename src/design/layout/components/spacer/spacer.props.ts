import type { BaseComponentProps } from "~sh/base.props";
import type { SpacerTag } from "./spacer.tokens";

/**
 * Props for the Spacer component.
 */
export interface SpacerProps extends BaseComponentProps {
  /** The HTML tag to render. Defaults to `div`. */
  as?: SpacerTag;
}