import type { FormProps } from "../../forms.props";

export type RangeSliderProps = FormProps & {
  /** The value of the slider as a tuple `[start, end]` */
  value?: [number, number];
  /** The minimum value */
  min?: number;
  /** The maximum value */
  max?: number;
  /** The step interval */
  step?: number;
  /** The ID of the primary element */
  id?: string;
  /** Optional slot for leading label */
  class?: string;
  style?: string;
};
