import type { SheetProps } from "./sheet.props";
import { SHEET_DEFAULTS } from "./sheet.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useSheet(props: SheetProps) {
  const {
    id,
    title,
    side = SHEET_DEFAULTS.side,
    ...overlayProps 
  } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? SHEET_DEFAULTS.size,
    variant: overlayProps.variant ?? SHEET_DEFAULTS.variant,
    ...overlayProps
  });

  return {
    dialogProps: {
      id,
      class:              composeClass(overlayClass, "sheet"),
      style:              overlayStyle,
      ...overlayAttrs,
      ...rest,
      "aria-labelledby":  title ? `${id}-title` : undefined,
      "data-side":        side,
    },
    title,
    titleId: title ? `${id}-title` : undefined,
  };
}
