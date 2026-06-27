import type { NavProps } from "../../nav.props";
import type { SvgName } from "~/shared/icons";

export interface BreadcrumbItemData {
  /** Unique ID */
  id: string;
  /** Visible label text */
  label: string;
  /** URL to navigate to. If omitted, renders as text (usually for the current page) */
  href?: string;
  /** Whether this is the active/current page */
  active?: boolean;
  /** Optional icon to display next to the label */
  icon?: SvgName;
}

export interface BreadcrumbsProps extends NavProps {
  /** Array of items to automatically generate breadcrumbs */
  items?: BreadcrumbItemData[];
  /** Optional icon to use as a separator instead of standard text */
  separatorIcon?: SvgName;
  /** Text to use as separator. Defaults to '/' */
  separatorText?: string;
}
