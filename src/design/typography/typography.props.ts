// design/typography/typography.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type {
  TypeSize, TypeWeight, TypeColor, TypeAlign,
  TypeLeading, TypeTracking, TypeFamily, TypeTransform,
  TypeWrap, TypeDecoration, TypeStyle,
} from "./typography.tokens";

/**
 * TypographyProps
 * 
 * Defines the foundational typography attributes for text elements.
 * 
 * @prop size - The font scale mapping to design tokens.
 * @prop weight - Font weight (e.g., bold, semibold, regular).
 * @prop color - Semantic text color.
 * @prop align - Text alignment (left, center, right, justify).
 * @prop leading - Line height.
 * @prop tracking - Letter spacing.
 * @prop fam - Font family (e.g., sans, serif, mono).
 * @prop transform - Text transformation (uppercase, lowercase, capitalize).
 * @prop wrap - Text wrapping behavior.
 * @prop decoration - Text decoration (underline, line-through).
 * @prop fontStyle - font-style. Named fontStyle to avoid shadowing the HTML style attribute.
 * @prop clamp - Multi-line clamp — limits text to N lines with ellipsis.
 * @prop truncate - Single-line truncation with ellipsis.
 */
export interface TypographyProps extends BaseComponentProps {
  size?:       TypeSize;
  weight?:     TypeWeight;
  color?:      TypeColor;
  align?:      TypeAlign;
  leading?:    TypeLeading;
  tracking?:   TypeTracking;
  fam?:        TypeFamily;
  transform?:  TypeTransform;
  wrap?:       TypeWrap;
  decoration?: TypeDecoration;
  fontStyle?:  TypeStyle;
  clamp?:      number;
  truncate?:   boolean;
}