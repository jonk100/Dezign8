// design/typography/heading/heading.props.ts
import type { TypographyProps } from "../typography.props";
import type { HeadingLevel, HeadingWeight } from "./heading.tokens";

export interface HeadingProps extends TypographyProps {
  /**
   * Semantic heading level — controls the rendered element (h1–h6).
   * Choose based on document structure, not visual size.
   * Use the `size` prop to control appearance independently.
   * @default 2
   */
  level?:  HeadingLevel;

  /** Narrowed to semibold, bold, or black. @default inherited from CSS */
  weight?: HeadingWeight;

  // clamp, truncate, fontStyle intentionally not re-declared here
}