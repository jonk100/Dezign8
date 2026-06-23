import type { BaseComponentProps } from "~sh/base.props";
import type {
  SeparatorLabelPosition,
  SeparatorOrientation,
  SeparatorStrength,
  SeparatorVariant,
} from "./separator.tokens";

/**
 * Props for the Separator component.
 */
export interface SeparatorProps extends BaseComponentProps {
  /** The orientation of the separator. Defaults to `horizontal`. */
  orientation?: SeparatorOrientation;

  /** The visual style of the line. Defaults to `solid`. */
  variant?: SeparatorVariant;

  /** The color intensity of the line, mapping to border tokens. Defaults to `default`. */
  strength?: SeparatorStrength;

  /** The position of the label within the separator. Defaults to `center`. */
  labelPosition?: SeparatorLabelPosition;
}