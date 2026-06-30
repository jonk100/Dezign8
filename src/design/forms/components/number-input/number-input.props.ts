// design/forms/number-input/number-input.props.ts

import type { FormProps } from "~/forms/forms.props";

export type NumberInputProps = FormProps & {
  id?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
  readonly?: boolean;
  controls?: boolean;
};
