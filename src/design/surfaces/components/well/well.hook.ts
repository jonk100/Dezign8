// design/surfaces/components/well/well.hook.ts
import type { WellProps }       from "./well.props";
import { WELL_DEFAULTS }        from "./well.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass }         from "~/shared/base.hook";

export function useWell(props: WellProps) {
  const {
    as: Tag = "div",
    layer   = WELL_DEFAULTS.layer,
    padding = WELL_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
  });

  return {
    Tag,
    props: {
      class: composeClass(surfaceClass, "well"),
      style: surfaceStyle,
      ...surfaceAttrs,
      ...rest,
    },
  };
}
