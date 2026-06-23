import type { NavbarContentProps } from "./content.props";

export function useNavbarContent(props: NavbarContentProps) {
  const { hideOnMobile = true, class: className, ...rest } = props;

  return {
    contentProps: {
      "data-hide-on-mobile": hideOnMobile ? "true" : undefined,
      class: ["navbar__content", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}
