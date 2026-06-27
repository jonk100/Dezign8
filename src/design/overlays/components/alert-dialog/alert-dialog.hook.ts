import type { AlertDialogProps } from "./alert-dialog.props";
import { ALERT_DIALOG_DEFAULTS } from "./alert-dialog.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useAlertDialog(props: AlertDialogProps) {
  const {
    id,
    title,
    description,
    closeOnEsc = ALERT_DIALOG_DEFAULTS.closeOnEsc,
    icon,
    ...overlayProps } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? ALERT_DIALOG_DEFAULTS.size,
    variant: overlayProps.variant ?? ALERT_DIALOG_DEFAULTS.variant,
    ...overlayProps
  });

  return {
    dialogProps: {
      id,
      class:               composeClass(overlayClass, "alert-dialog"),
      style:               overlayStyle,
      ...overlayAttrs,
      ...rest,
      role:                "alertdialog" as const,
      "aria-modal":        "true" as const,
      "aria-labelledby":   `${id}-title`,
      "aria-describedby":  description ? `${id}-desc` : undefined,
      "data-close-esc":    closeOnEsc ? "true" : "false",
    },
    title,
    titleId:       `${id}-title`,
    description,
    descriptionId: description ? `${id}-desc` : undefined,
  };
}
