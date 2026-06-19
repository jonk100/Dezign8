// design/typography/link/link.tokens.ts

export { TYPOGRAPHY_TOKENS as LINK_TOKENS } from "~ty/typography.tokens";

/**
 * Link scales inherit from typography sizes and variants since links
 * are text-based components.
 */
export type {
  TypeSize       as LinkSize,
  TypeWeight     as LinkWeight,
  TypeColor      as LinkColor,
  TypeFamily     as LinkFamily,
} from "~ty/typography.tokens";

/**
 * Array of valid underline behaviors for Link.
 * Used for runtime validation or mapping over possible variants.
 */
export const LINK_UNDERLINE = ["always", "hover", "never"] as const;

/**
 * Type: `LinkUnderline`
 * Represents the timing and visibility of the text underline.
 * Derived from the `LINK_UNDERLINE` array.
 */
export type LinkUnderline = typeof LINK_UNDERLINE[number];

/**
 * Default fallback values for the Link component properties.
 */
export const LINK_DEFAULTS = {
  /** Links only show underline on hover by default. */
  underline: "hover" as LinkUnderline,
} as const;