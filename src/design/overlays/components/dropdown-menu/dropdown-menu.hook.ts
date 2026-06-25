import type { DropdownMenuProps } from "./dropdown-menu.props";
import { DROPDOWN_MENU_DEFAULTS } from "./dropdown-menu.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useDropdownMenu(props: DropdownMenuProps) {
  const {
    id,
    ...overlayProps 
  } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? DROPDOWN_MENU_DEFAULTS.size,
    variant: overlayProps.variant ?? DROPDOWN_MENU_DEFAULTS.variant,
    radius:  overlayProps.radius ?? DROPDOWN_MENU_DEFAULTS.radius,
    ...overlayProps
  });

  return {
    popoverProps: {
      id,
      popover: "auto",
      class:   composeClass(overlayClass, "dropdown-menu"),
      style:   overlayStyle,
      ...overlayAttrs,
      ...rest,
    }
  };
}
