import { useNav } from "../../nav.hook";
import type { NavbarProps } from "./navbar.props";

const NAVBAR_DEFAULTS = {
  size: "md",
  variant: "ghost"
} as const;

export function useNavbar(props: NavbarProps) {
  const { 
    sticky = false,
    glass = true,
    maxWidth = "1280px",
    class: className,
    size = NAVBAR_DEFAULTS.size,
    variant = NAVBAR_DEFAULTS.variant,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps } = useNav({ size, variant, ...navProps });

  const containerStyle = maxWidth ? `max-width: ${maxWidth};` : undefined;

  return {
    maxWidth,
    containerStyle,
    navbarProps: {
      "data-sticky": sticky ? "true" : undefined,
      "data-glass": glass ? "true" : undefined,
      ...resolvedNavProps,
      class: ["navbar", resolvedNavProps.class, className].filter(Boolean).join(" ")
    }
  };
}
