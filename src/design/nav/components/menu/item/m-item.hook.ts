import { icons } from "~/shared/icons";
import type { MenuItemProps } from "./m-item.props";

export function useMenuItem(props: MenuItemProps) {
  const { id, href, icon, active, disabled, class: className, ...rest } = props;

  const Tag = href ? "a" : "button";
  const typeAttr = href ? {} : { type: "button" };
  const IconComponent = icon ? icons[icon] : null;

  return {
    Tag,
    IconComponent,
    menuItemProps: {
      id,
      href,
      disabled,
      "aria-current": active && href ? "page" : undefined,
      "aria-selected": active && !href ? "true" : undefined,
      class: ["nav__item", className].filter(Boolean).join(" "),
      ...typeAttr,
      ...rest
    }
  };
}
