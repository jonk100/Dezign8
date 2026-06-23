// design/surfaces/components/frame/frame.hook.ts
import type { FrameProps }      from "./frame.props";
import { FRAME_DEFAULTS }       from "./frame.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass,
         composeStyle }         from "~/shared/base.hook";

export function useFrame(props: FrameProps) {
  const {
    as: Tag = "div",
    ratio,
    clip    = true,
    layer   = FRAME_DEFAULTS.layer,
    padding = FRAME_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
  });

  const ratioStyle = ratio ? `--frame--ratio: ${ratio}` : null;

  return {
    Tag,
    props: {
      class: composeClass(surfaceClass, "frame", clip && "frame--clipped"),
      style: composeStyle(surfaceStyle, ratioStyle),
      ...surfaceAttrs,
      ...rest,
    },
  };
}
