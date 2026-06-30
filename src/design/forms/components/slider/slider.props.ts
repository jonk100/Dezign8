import type { FormProps } from "../../forms.props";

export type SliderProps = FormProps & {
  /** The value of the slider */
  value?: number;
  /** The minimum value */
  min?: number;
  /** The maximum value */
  max?: number;
  /** The step interval */
  step?: number;
  /** The ID of the input element */
  id?: string;
  /** Optional slot for leading label */
  class?: string;
  style?: string;
};
