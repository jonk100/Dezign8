// design/typography/typography.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type {
  TypeSize, TypeWeight, TypeColor, TypeAlign,
  TypeLeading, TypeTracking, TypeFamily, TypeTransform,
  TypeWrap, TypeDecoration, TypeStyle,
} from "./typography.tokens";

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
  /** font-style. Named fontStyle to avoid shadowing the HTML style attribute. */
  fontStyle?:  TypeStyle;
  /** Multi-line clamp — limits text to N lines with ellipsis. */
  clamp?:      number;
  /** Single-line truncation with ellipsis. */
  truncate?:   boolean;
}