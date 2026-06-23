import type { NavbarBrandProps } from "./brand.props";

export function useNavbarBrand(props: NavbarBrandProps) {
  const { class: className, ...rest } = props;

  return {
    brandProps: {
      class: ["navbar__brand", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}
