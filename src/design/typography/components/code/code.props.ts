// design/typography/components/code/code.props.ts
import type { TypographyProps } from "../../typography.props";

export type CodeTag = "code" | "span" | "kbd";
export type PreTag = "pre" | "div";

export interface CodeProps extends TypographyProps {
  as?: CodeTag;
  /** Whether this is a standalone code block or inline code. */
  block?: boolean;
}

export interface PreProps extends TypographyProps {
  as?: PreTag;
}
