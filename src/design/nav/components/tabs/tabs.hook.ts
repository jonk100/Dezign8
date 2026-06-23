import { useNav } from "../../nav.hook";
import type { NavProps } from "../../nav.props";
import type { TabsProps } from "./tabs.props";

const TABS_DEFAULTS = {
  variant: "underlined",
  orientation: "horizontal"
} as const;

export function useTabs(props: TabsProps) {
  const { 
    items, 
    fitted,
    variant = TABS_DEFAULTS.variant,
    orientation = TABS_DEFAULTS.orientation,
    ...navProps 
  } = props;

  // Derive the initially active tab if not explicitly set
  const activeId = navProps.activeId || (items && items.length > 0 ? items[0]?.id : undefined);

  // Note: We cast to NavProps here because the rest spread (...navProps) 
  // causes TS to lose the explicit type shape, particularly around activeId.
  // This cast bridges the gap for strict mode compatibility.
  const { navProps: resolvedNavProps, activeId: finalActiveId } = useNav({ variant, orientation, ...navProps, activeId } as NavProps);

  const tabsClass = [
    "tabs",
    resolvedNavProps.class,
    fitted ? "tabs--fitted" : ""
  ].filter(Boolean).join(" ");

  return {
    tabsProps: {
      ...resolvedNavProps,
      class: tabsClass,
      role: "tablist",
      "aria-orientation": navProps.orientation
    },
    items,
    activeId: finalActiveId
  };
}
