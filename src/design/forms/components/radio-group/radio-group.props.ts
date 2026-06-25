// design/forms/components/radio-group/radio-group.props.ts

/**
 * @file Prop types for the RadioGroup component.
 * @module design/forms/radio-group
 *
 * @see {@link RadioGroupTokens}  in `radio-group.tokens.ts`
 * @see {@link useRadioGroup}     in `radio-group.hook.ts`
 */

import type { RadioGroupLayout } from "./radio-group.tokens";

export type RadioGroupProps = {
  /** Shared name for all child Radio inputs. Propagated via Web Component. */
  name?:   string;
  /** Text for the `<legend>` element. Screen readers announce this as the group label. */
  legend?: string;
  /** Stack children vertically (default) or horizontally. */
  layout?: RadioGroupLayout;
  class?:  string;
  style?:  string;
};
