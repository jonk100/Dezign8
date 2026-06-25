import type { ModalProps } from "./modal.props";
import { MODAL_DEFAULTS } from "./modal.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useModal(props: ModalProps) {
  const {
    id,
    title,
    closeOnBackdrop = MODAL_DEFAULTS.closeOnBackdrop,
    closeOnEsc      = MODAL_DEFAULTS.closeOnEsc,
    ...overlayProps } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? MODAL_DEFAULTS.size,
    variant: overlayProps.variant ?? MODAL_DEFAULTS.variant,
    ...overlayProps
  });

  return {
    dialogProps: {
      id,
      class:              composeClass(overlayClass, "modal"),
      style:              overlayStyle,
      ...overlayAttrs,
      ...rest,
      "aria-labelledby":  title ? `${id}-title` : undefined,
      "data-close-backdrop": closeOnBackdrop ? "true" : "false",
      "data-close-esc":      closeOnEsc      ? "true" : "false",
    },
    title,
    titleId: title ? `${id}-title` : undefined,
  };
}
