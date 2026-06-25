import type { OverlaysProps } from "../../overlays.props";

export interface DropdownMenuProps extends OverlaysProps {
  id: string;
}

export interface DropdownItemProps {
  href?: string;
  icon?: string;
  popovertarget?: string;
  disabled?: boolean;
}
