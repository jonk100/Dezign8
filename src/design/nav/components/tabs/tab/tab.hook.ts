import type { TabProps } from "./tab.props";

export function useTab(props: TabProps) {
  const { id, active, disabled, href, class: className, ...rest } = props;

  const Tag = href ? "a" : "button";

  return {
    Tag,
    tabProps: {
      id: `tab-${id}`,
      href,
      "aria-controls": `panel-${id}`,
      "role": "tab",
      "aria-selected": active ? "true" : "false",
      "tabindex": active ? 0 : -1,
      "data-active": active ? "true" : undefined,
      disabled,
      class: ["nav__item", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}
