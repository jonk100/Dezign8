import type { BaseComponentProps } from "~/shared/base.props";
import type { IconProps } from "~/shared/icon.props";

export interface ListItemProps extends BaseComponentProps, IconProps {
  /** Visual check state for a to-do/checklist pattern */
  checkState?: "checked" | "unchecked" | "indeterminate";
  
  /** URL to navigate to, turning the item into a link */
  href?: string;
  
  /** Secondary description text */
  description?: string;
  
  /** Optional badge text or count */
  badge?: string | number;
  
  /** Mutes the item visually */
  disabled?: boolean;
}
