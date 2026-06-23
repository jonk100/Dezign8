// design/surfaces/components/paper/paper.hook.ts

import type { PaperProps }                   from "./paper.props";
import { PAPER_TOKENS, PAPER_DEFAULTS }      from "./paper.tokens";
import { useSurface }                        from "../../surface.hook";
import { resolveTokens }                     from "~/shared/tokens";
import { composeClass, composeStyle }        from "~/shared/base.hook";

export function usePaper(props: PaperProps) {
  const {
    as: Tag   = PAPER_DEFAULTS.as,
    layer      = PAPER_DEFAULTS.layer,
    stack      = PAPER_DEFAULTS.stack,
    gap        = PAPER_DEFAULTS.gap,
    fullWidth  = PAPER_DEFAULTS.fullWidth,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    ...surfaceProps,
  });

  // gap is paper-scoped and only emitted when stack=true
  const { style: gapStyle } = resolveTokens(
    PAPER_TOKENS,
    { gap: stack ? gap : undefined },
    "surface",
  );

  return {
    Tag,
    props: {
      class: composeClass(
        surfaceClass,
        "paper",
        stack     && "paper--stack",
        fullWidth && "paper--full-width",
      ),
      style: composeStyle(surfaceStyle, ...gapStyle),
      ...surfaceAttrs,
      ...rest,
    },
  };
}
