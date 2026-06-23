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
  const { as: Tag = SPACER_DEFAULTS.as, ...rest } = props;

  const { props: baseProps } = useBaseCompose({
    ...rest,
    class: ["spacer", props.class],
  });

  return { Tag, props: baseProps };
}