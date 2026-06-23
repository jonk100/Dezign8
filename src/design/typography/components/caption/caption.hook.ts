/**
 * A hook that processes props for the Caption component and returns
 * attributes for rendering.
 *
 * @param props - The props for the Caption component.
 * @returns An object with the `Tag` to render, the `props` for the tag,
 *          and the resolved `label` and `credit` strings.
 */
import { useTypography } from "../../typography.hook";
import type { CaptionProps } from "./caption.props";
import { CAPTION_DEFAULTS } from "./caption.tokens";
import { composeClass } from "~/shared/base.hook";

export function useCaption(props: CaptionProps) {
  const {
    as = CAPTION_DEFAULTS.as,
    label,
    credit,
    overlay = CAPTION_DEFAULTS.overlay,
    rule = CAPTION_DEFAULTS.rule,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    ...typographyProps,
    // Pre-compose caption-specific classes before passing to useTypography
    class: composeClass(
      "caption",
      overlay && "caption--overlay",
      rule && "caption--rule",
      typographyProps.class,
    ),
  });

  return {
    Tag: as,
    props: typographyAttributes,
    label,
    credit,
  };
}