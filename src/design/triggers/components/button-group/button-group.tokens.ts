// design/triggers/button-group/button-group.tokens.ts

export { TRIGGER_TOKENS as BUTTON_GROUP_TOKENS } from "../../trigger.tokens";
export type { TriggerVariant as ButtonGroupVariant, TriggerColor as ButtonGroupColor, TriggerRadius as ButtonGroupRadius }
  from "../../trigger.tokens";

export const BUTTON_GROUP_DEFAULTS = {
  orientation: "horizontal" as const,
  grouped:     true,
} as const;
