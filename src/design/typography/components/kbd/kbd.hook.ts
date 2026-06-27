// design/typography/components/kbd/kbd.hook.ts
import type { KbdProps } from "./kbd.props";
import { KBD_DEFAULTS } from "./kbd.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

export function useKbd(props: KbdProps) {
  const {
    size = KBD_DEFAULTS.size,
    fam  = KBD_DEFAULTS.fam,
    icon,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({ size, fam, ...typographyProps });

  return {
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "kbd"),
    },
  };
}
