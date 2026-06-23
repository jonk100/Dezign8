/**
 * @file Token spec, constants, and defaults for the Spacer component.
 */

export type SpacerTag = "div" | "span";

export const SPACER_DEFAULTS = {
  as: "div" as SpacerTag,
} as const;