import { useNav } from "../../nav.hook";
import type { MenuProps } from "./menu.props";

const MENU_DEFAULTS = {
  variant: "soft",
  orientation: "vertical",
  indentChildren: true
} as const;

export function useMenu(props: MenuProps) {
  const { 
    items, 
    indentChildren = MENU_DEFAULTS.indentChildren,
    variant = MENU_DEFAULTS.variant,
    orientation = MENU_DEFAULTS.orientation,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps, activeId } = useNav({ variant, orientation, ...navProps });

  const menuClass = [
    "menu",
    resolvedNavProps.class,
    indentChildren ? "menu--indent" : ""
  ].filter(Boolean).join(" ");

  return {
    menuProps: {
      ...resolvedNavProps,
      class: menuClass
    },
    items,
    activeId
  };
}
