import type { ListItemProps } from "./list-item.props";
import { useBaseCompose } from "~/shared/base.hook";

export function useListItem(props: ListItemProps) {
  const {
    checkState,
    href,
    description,
    badge,
    disabled = false,
    icon,
    class: className,
    ...rest
  } = props;

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "list__item",
        disabled && "list__item--disabled",
        className,
      ],
      style: [],
    },
    props
  );

  return {
    Tag: "li" as const,
    checkState,
    href,
    description,
    badge,
    disabled,
    icon,
    props: {
      class: cls,
      style: style || undefined,
      ...attrs,
      ...rest,
    },
  };
}
