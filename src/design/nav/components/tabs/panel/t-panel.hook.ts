import type { TabPanelProps } from "./t-panel.props";

export function useTabPanel(props: TabPanelProps) {
  const { id, active, class: className, ...rest } = props;

  return {
    tabPanelProps: {
      role: "tabpanel" as const,
      id: `panel-${id}`,
      "data-panel-for": id,
      "aria-labelledby": `tab-${id}`,
      "data-active": active ? "true" : undefined,
      class: ["tab-panel", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}
