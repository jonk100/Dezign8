import { useNav } from "../../nav.hook";
import type { BreadcrumbsProps } from "./breadcrumbs.props";

const BREADCRUMBS_DEFAULTS = {
  size: "md",
  variant: "ghost"
} as const;

export function useBreadcrumbs(props: BreadcrumbsProps) {
  const { 
    items, 
    separatorIcon,
    separatorText = "/",
    size = BREADCRUMBS_DEFAULTS.size,
    variant = BREADCRUMBS_DEFAULTS.variant,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps } = useNav({ size, variant, ...navProps });

  return {
    breadcrumbsProps: {
      "aria-label": "Breadcrumb",
      ...resolvedNavProps,
      class: ["breadcrumbs", resolvedNavProps.class].filter(Boolean).join(" ")
    },
    items,
    separatorIcon,
    separatorText
  };
}
