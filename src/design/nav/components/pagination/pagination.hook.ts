import { useNav } from "../../nav.hook";
import type { NavProps } from "../../nav.props";
import type { PaginationProps } from "./pagination.props";

const PAGINATION_DEFAULTS = {
  variant: "ghost",
  orientation: "horizontal",
  siblingCount: 1,
  showControls: true
} as const;

export function usePagination(props: PaginationProps) {
  const { 
    currentPage,
    totalPages,
    siblingCount = PAGINATION_DEFAULTS.siblingCount,
    showControls = PAGINATION_DEFAULTS.showControls,
    baseUrl,
    getPageUrl,
    variant = PAGINATION_DEFAULTS.variant,
    orientation = PAGINATION_DEFAULTS.orientation,
    ...navProps 
  } = props;
  
  const activeId = String(currentPage);

  // Note: We cast to NavProps here because PaginationProps omits 'activeId',
  // which causes TS to lose the explicit type shape during the rest spread.
  // This satisfies strict mode without needing a generic useNav signature.
  const { navProps: resolvedNavProps } = useNav({ variant, orientation, ...navProps, activeId } as NavProps);

  const paginationClass = [
    "pagination",
    resolvedNavProps.class
  ].filter(Boolean).join(" ");

  // Generate URL for a given page number
  const generateUrl = (page: number) => {
    if (getPageUrl) return getPageUrl(page);
    if (baseUrl) return `${baseUrl.replace(/\/$/, '')}/${page}`;
    return `#page-${page}`; // fallback for purely visual dev
  };

  // Compute pagination range with ellipses
  const generateRange = () => {
    // Total pages we want to show without ellipses is siblingCount * 2 + 3 (first, last, current)
    const totalPageNumbers = siblingCount + 5; 
    
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 2;
    
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // No left ellipsis, right ellipsis
    if (!showLeftEllipsis && showRightEllipsis) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    // Left ellipsis, no right ellipsis
    if (showLeftEllipsis && !showRightEllipsis) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [firstPageIndex, '...', ...rightRange];
    }

    // Both ellipses
    if (showLeftEllipsis && showRightEllipsis) {
      let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  };

  return {
    paginationProps: {
      ...resolvedNavProps,
      class: paginationClass
    },
    pages: generateRange(),
    currentPage,
    totalPages,
    showControls,
    generateUrl
  };
}
