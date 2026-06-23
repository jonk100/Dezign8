// design/typography/components/prose/prose.hook.ts
import type { ProseProps }      from "./prose.props";
import { PROSE_DEFAULTS }       from "./prose.tokens";
import { useTypography }        from "../../typography.hook";
import { composeClass }         from "~/shared/base.hook";

export function useProse(props: ProseProps) {
  const {
    as: Tag = "article",
    size    = PROSE_DEFAULTS.size,
    weight  = PROSE_DEFAULTS.weight,
    color   = PROSE_DEFAULTS.color,
    leading = PROSE_DEFAULTS.leading,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    size,
    weight,
    color,
    leading,
    ...typographyProps,
  });

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "prose"),
    },
  };
}
