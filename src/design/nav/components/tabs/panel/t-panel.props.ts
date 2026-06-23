import type { HTMLAttributes } from "astro/types";

export interface TabPanelProps extends HTMLAttributes<"div"> {
  /** The unique ID of the panel, must match the Tab it is controlled by */
  id: string;
  /** Whether the panel is currently visible */
  active?: boolean;
}
