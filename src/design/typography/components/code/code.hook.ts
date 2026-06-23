// design/typography/components/code/code.hook.ts
import type { CodeProps, PreProps } from "./code.props";
import { CODE_DEFAULTS, PRE_DEFAULTS } from "./code.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass }  from "~/shared/base.hook";

export function useCode(props: CodeProps) {
  const {
    as: Tag = "code",
    fam     = CODE_DEFAULTS.fam,
    block   = false,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    fam,
    ...typographyProps,
  });

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "code", block ? "code--block" : "code--inline"),
    },
  };
}

export function usePre(props: PreProps) {
  const {
    as: Tag = "pre",
    fam     = PRE_DEFAULTS.fam,
    size    = PRE_DEFAULTS.size,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    fam,
    size,
    ...typographyProps,
  });

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "pre"),
    },
  };
}
