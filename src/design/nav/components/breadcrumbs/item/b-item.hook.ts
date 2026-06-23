import type { BreadcrumbItemProps } from "./b-item.props";

export function useBreadcrumbItem(props: BreadcrumbItemProps) {
  const { active, href, isLast, class: className, ...rest } = props;

  // Use <a> if href is present, otherwise use <span> (typical for the active/current page)
  const Tag = href ? "a" : "span";

  return {
    Tag,
    isLast,
    itemProps: {
      href,
      "aria-current": active ? "page" : undefined,
      class: ["nav__item", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}
