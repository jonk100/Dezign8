import type { DataProps } from "~/data/data.props";

export interface FeedItem {
  id?: string | number;
  /** The primary title/content of the feed event. */
  title: string;
  /** Date or time associated with the event. */
  timestamp?: string | Date;
  /** Longer description or body text. */
  description?: string;
  /** Optional icon or avatar to display on the timeline node. */
  icon?: any; // any node/string for Astro
  /** Link URL for the item. */
  href?: string;
}

export interface FeedProps extends DataProps {
  /** The events to display in the feed. */
  data?: FeedItem[];
  /** Layout orientation. */
  orientation?: "vertical" | "horizontal";
  /** Whether items are grouped visually. */
  grouped?: boolean;
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Feed: true;
  }
}
