import type { NavProps } from "../../nav.props";

export interface PaginationProps extends Omit<NavProps, "activeId"> {
  /** The current active page number (1-indexed). */
  currentPage: number;
  
  /** The total number of pages available. */
  totalPages: number;
  
  /** Number of sibling pages to show on each side of the current page. @default 1 */
  siblingCount?: number;
  
  /** Whether to show the previous/next arrow controls. @default true */
  showControls?: boolean;
  
  /** Base URL path to build pagination links. e.g. "/blog/page/" -> "/blog/page/2" */
  baseUrl?: string;
  
  /** Optional override for generating URLs based on page number. Takes precedence over baseUrl. */
  getPageUrl?: (page: number) => string;
}
