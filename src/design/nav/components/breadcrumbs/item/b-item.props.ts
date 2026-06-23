import type { HTMLAttributes } from "astro/types";

export interface BreadcrumbItemProps extends HTMLAttributes<"a" | "span"> {
  /** If true, this item represents the current page. Renders as a span if no href is provided. */
  active?: boolean;
  /** URL to navigate to */
  href?: string;
  /** Whether this is the final item in the list (used to suppress the separator) */
  isLast?: boolean;
}
