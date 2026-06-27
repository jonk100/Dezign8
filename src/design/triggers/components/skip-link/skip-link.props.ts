// design/triggers/components/skip-link/skip-link.props.ts
import type { TriggerProps } from "../../trigger.props";

export interface SkipLinkProps extends TriggerProps {
  /**
   * The ID of the target element to focus when clicked (e.g. "main" or "#main").
   * @default "main"
   */
  target?: string;
  
  /**
   * Text label to display.
   * @default "Skip to content"
   */
  label?: string;
}
