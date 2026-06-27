// design/typography/components/visually-hidden/visually-hidden.hook.ts
import type { VisuallyHiddenProps } from "./visually-hidden.props";
import { VISUALLY_HIDDEN_DEFAULTS } from "./visually-hidden.tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useVisuallyHidden(props: VisuallyHiddenProps) {
  const {
    as: Tag = VISUALLY_HIDDEN_DEFAULTS.as,
    class: className,
    style,
    ...base
  } = props;

  const { className: cls, style: stl, attrs, rest } = useBaseCompose(
    {
      className: ["visually-hidden", className],
      style: [style],
    },
    base,
  );

  return {
    Tag,
    props: {
      class: cls,
      style: stl,
      ...attrs,
      ...rest,
    },
  };
}
