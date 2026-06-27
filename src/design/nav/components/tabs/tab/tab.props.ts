import type { HTMLAttributes } from "astro/types";
import type { IconProps } from "~/shared/icon.props";

export interface TabProps extends HTMLAttributes<"button" | "a">, IconProps {
  /** The unique ID of the tab, must match the TabPanel it controls */
  id: string;
  /** Whether the tab is currently active (mostly for uncontrolled setups) */
  active?: boolean;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** URL to navigate to, turning the tab into a link */
  href?: string;
}
