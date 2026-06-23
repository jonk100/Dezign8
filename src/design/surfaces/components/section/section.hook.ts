// design/surfaces/components/section/section.hook.ts
import type { SectionProps }    from "./section.props";
import { SECTION_DEFAULTS }     from "./section.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass }         from "~/shared/base.hook";

export function useSection(props: SectionProps) {
  const {
    as: Tag = "section",
    layer   = SECTION_DEFAULTS.layer,
    padding = SECTION_DEFAULTS.padding,
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
      class: composeClass(surfaceClass, "section"),
      style: surfaceStyle,
      ...surfaceAttrs,
      ...rest,
    },
  };
}
