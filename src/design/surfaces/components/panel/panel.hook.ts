// design/surfaces/components/panel/panel.hook.ts
import type { PanelProps }      from "./panel.props";
import { PANEL_DEFAULTS }       from "./panel.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass }         from "~/shared/base.hook";

export function usePanel(props: PanelProps) {
  const {
    as: Tag = "div",
    layer   = PANEL_DEFAULTS.layer,
    padding = PANEL_DEFAULTS.padding,
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
      class: composeClass(surfaceClass, "panel"),
      style: surfaceStyle,
      ...surfaceAttrs,
      ...rest,
    },
  };
}
