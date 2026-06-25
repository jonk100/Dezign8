// design/forms/components/switch/switch.props.ts

/**
 * @file Prop types for the Switch component.
 * @module design/forms/switch
 *
 * @see {@link SwitchTokens}  in `switch.tokens.ts`
 * @see {@link useSwitch}     in `switch.hook.ts`
 */

import type { FormProps }    from "~f/forms.props";
import type { LabelPosition } from "./switch.tokens";

export type SwitchProps = FormProps & {
  id?:           string;
  name?:         string;
  value?:        string;
  checked?:      boolean;
  labelPosition?: LabelPosition;
};
