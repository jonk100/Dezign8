// design/surfaces/components/card/card.props.ts

import type { SurfaceProps } from "../../surface.props";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Card: true;
  }
}

export type CardTag = "div" | "article" | "section" | "li";

export interface CardProps extends SurfaceProps {
  /** HTML element to render as. @default "div" */
  as?: CardTag;

  /**
   * Renders the card as an <a> and treats the whole surface as a link.
   * Mutually exclusive with interactive/selectable.
   */
  href?: string;

  /** Anchor target. Only used with href. */
  target?: "_self" | "_blank" | "_parent" | "_top";

  /** Anchor rel. Defaults to "noopener noreferrer" when target="_blank". */
  rel?: string;

  /**
   * Adds hover/focus styles and pointer cursor.
   * Use when the card has a client-side action but is not a link.
   * @default false
   */
  interactive?: boolean;

  /**
   * Makes the card a toggle — adds role="button" and aria-pressed.
   * Implies interactive behavior.
   * @default false
   */
  selectable?: boolean;

  /**
   * Pressed/selected state. Only meaningful when selectable=true.
   * @default false
   */
  selected?: boolean;

  /**
   * Disables interaction. Sets aria-disabled, tabindex=-1, and pointer-events: none.
   * @default false
   */
  disabled?: boolean;
}
