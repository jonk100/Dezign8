// design/typography/components/prose/prose.props.ts
import type { TypographyProps } from "../../typography.props";

export type ProseTag = "div" | "article" | "main" | "section";

export interface ProseProps extends TypographyProps {
  /**
   * HTML element to render.
   * @default "article"
   */
  as?: ProseTag;
}
