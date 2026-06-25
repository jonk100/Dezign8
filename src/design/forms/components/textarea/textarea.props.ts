// design/forms/components/textarea/textarea.props.ts

/**
 * @file Prop types for the Textarea component.
 * @module design/forms/textarea
 *
 * @see {@link TextareaTokens}  in `textarea.tokens.ts`
 * @see {@link useTextarea}     in `textarea.hook.ts`
 */

import type { FormProps }      from "~f/forms.props";
import type { TextareaResize } from "./textarea.tokens";

export type TextareaProps = FormProps & {
  id?:           string;
  value?:        string;
  placeholder?:  string;
  readonly?:     boolean;
  rows?:         number;
  minLength?:    number;
  maxLength?:    number;
  resize?:       TextareaResize;
  autocomplete?: string;
  wrap?:         "soft" | "hard" | "off";
};
