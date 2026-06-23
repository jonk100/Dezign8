import type { HTMLAttributes } from "astro/types";

export interface NavbarContentProps extends HTMLAttributes<"div"> {
  /** If true, this content block will be hidden on mobile screens and moved into the hamburger menu */
  hideOnMobile?: boolean;
}
