import type { HTMLAttributes } from "astro/types";
import type { SvgName }        from "~/shared/icons";

export interface MenuItemProps extends HTMLAttributes<"a" | "button"> {
  /** Optional ID for the item */
  id?: string | undefined;
  /** If provided, renders as an `<a>` tag, otherwise a `<button>` */
  href?: string | undefined;
  /** Optional icon to render before the label */
  icon?: SvgName | undefined;
  /** Whether the item is currently active/selected */
  active?: boolean | undefined;
  /** Whether the item is disabled */
  disabled?: boolean | undefined;
}
