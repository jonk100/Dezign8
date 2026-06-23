import type { NavProps } from "../../nav.props";
import type { SvgName }  from "~/shared/icons";

/**
 * Data structure for a single menu item when using the data-driven approach.
 */
export interface MenuItemData {
  /** Unique identifier, used for active state matching */
  id: string;
  /** Text to display */
  label: string;
  /** If provided, renders as an `<a>` tag */
  href?: string;
  /** Optional icon to render before the label */
  icon?: SvgName;
  /** If true, the item is not interactive */
  disabled?: boolean;
  /** Nested children (rendered if indentChildren is true) */
  children?: MenuItemData[];
}

export interface MenuProps extends NavProps {
  /**
   * Data-driven array of menu items.
   * If omitted, you must provide `<MenuItem>` components as children.
   */
  items?: MenuItemData[];

  /**
   * If true, nested items (children) are indented.
   * @default true
   */
  indentChildren?: boolean;
}
