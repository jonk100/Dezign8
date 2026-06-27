import type { NavProps } from "../../nav.props";
import type { SvgName } from "~/shared/icons";

export interface TabData {
  /** Unique ID for the tab, must match the TabPanel it controls */
  id: string;
  /** Text label for the tab */
  label: string;
  /** If true, tab is not selectable */
  disabled?: boolean;
  /** URL to navigate to, turning the tab into a link */
  href?: string;
  /** Whether the tab is currently active (mostly for uncontrolled setups) */
  active?: boolean;
  /** Leading icon for the tab */
  icon?: SvgName;
}

export interface TabsProps extends NavProps {
  /** Array of tab data. Optional if using the slot pattern manually. */
  items?: TabData[];
  
  /** If true, the tabs will flex to evenly fill the available width. */
  fitted?: boolean;
}
