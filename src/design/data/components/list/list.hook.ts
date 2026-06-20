import type { ListProps } from "./list.props";

// list/list.hook.ts
export function useList<T>(props: ListProps<T>) {
  const {
    items,
    renderItem,
    gap = "md",
    itemPadding = "md",
    as = "ul",
    class: className,
    ...rest
  } = props;

  return {
    Tag: as,
    itemClass: "list__item",
    itemGap: gap,
    items,
    renderItem,
    rest,
  };
}