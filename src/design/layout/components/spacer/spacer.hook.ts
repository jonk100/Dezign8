import { useBaseCompose } from "~sh/base.hook";
import type { SpacerProps } from "./spacer.props";
import { SPACER_DEFAULTS } from "./spacer.tokens";

/**
 * A hook that processes props for the Spacer component.
 *
 * @param props The props for the Spacer component.
 * @returns An object with the `Tag` to render and the `props` for the tag.
 */
export function useSpacer(props: SpacerProps) {
  const { as: Tag = SPACER_DEFAULTS.as, class: className, ...rest } = props;

  const { className: cls, style, attrs } = useBaseCompose(
    { className: ["spacer", className] },
    props,
  );

  return {
    Tag,
    props: { class: cls, style: style || undefined, ...attrs, ...rest },
  };
}