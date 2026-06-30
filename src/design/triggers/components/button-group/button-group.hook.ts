// design/triggers/button-group/button-group.hook.ts

import type { ButtonGroupProps } from "./button-group.props";
import { BUTTON_GROUP_DEFAULTS } from "./button-group.tokens";
import { useBaseCompose } from "~/shared/base.hook";

import { useSemanticButtonGroup } from "./hooks/semantic.hook";
import { useControlButtonGroup } from "./hooks/control.hook";
import { useToggleButtonGroup } from "./hooks/toggle.hook";
import { useToolbarButtonGroup } from "./hooks/toolbar.hook";
import { useSplitButtonGroup } from "./hooks/split.hook";

export function useButtonGroup(props: ButtonGroupProps) {
  const {
    for: forType,
    grouped = forType !== "cluster",
    orientation = BUTTON_GROUP_DEFAULTS.orientation,
    size,
    variant,
    color,
    radius,
    grid,
    class: className,
    style: customStyle,
    ...base
  } = props;

  // Resolve sub-hook configuration based on "for" type
  let subHookResult: { classes: string[]; attrs: Record<string, unknown> };
  switch (forType) {
    case "control":
      subHookResult = useControlButtonGroup(props as any);
      break;
    case "toggle":
      subHookResult = useToggleButtonGroup(props as any);
      break;
    case "toolbar":
      subHookResult = useToolbarButtonGroup(props as any);
      break;
    case "split":
      subHookResult = useSplitButtonGroup(props as any);
      break;
    case "cluster":
    case "semantic":
    default:
      subHookResult = useSemanticButtonGroup(props as any);
      break;
  }

  // Compose all container layout and token classes
  const groupClasses = [
    "button-group",
    `button-group--${orientation}`,
    grouped && "button-group--grouped",
    size && `button-group--size-${size}`,
    color && `button-group--color-${color}`,
    radius && `button-group--radius-${radius}`,
    variant && `button-group--variant-${variant}`,
    grid && `button-group--grid-${grid}`,
    ...subHookResult.classes,
  ];

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        ...groupClasses,
        className,
      ],
      style: [
        customStyle,
      ],
      attrs: {
        ...subHookResult.attrs,
      },
    },
    base
  );

  return {
    Tag: "div" as const,
    props: {
      class: cls,
      style: style || undefined,
      ...attrs,
      ...rest,
    },
  };
}
