import type { HTMLAttributes } from "astro/types";
import type { IconProps } from "~/shared/icon.props";

export interface MenuItemProps extends HTMLAttributes<"a" | "button">, IconProps {
  /** Optional ID for the item */
  id?: string | undefined;
  /** If provided, renders as an `<a>` tag, otherwise a `<button>` */
  href?: string | undefined;
  /** Whether the item is currently active/selected */
  active?: boolean | undefined;
  /** Whether the item is disabled */
  disabled?: boolean | undefined;
}
