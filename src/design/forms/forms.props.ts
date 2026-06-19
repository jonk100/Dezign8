/**
 * FormProps
 * 
 * Standardizes inputs, validations, and form state management.
 * 
 * @prop name - The HTML name attribute for form submission.
 * @prop value - The controlled value of the input.
 * @prop defaultValue - The uncontrolled initial value.
 * @prop onChange - Callback fired when the value changes.
 * @prop onBlur - Callback fired when the element loses focus.
 * @prop size - Visual scale of the input field.
 * @prop disabled - Prevents interaction and visually disables the input.
 * @prop readOnly - Makes the input immutable but still focusable and submittable.
 * @prop required - Marks the field as mandatory for submission.
 * @prop invalid - Triggers the error visual state (e.g., red borders).
 * @prop valid - Triggers the success visual state (e.g., green borders).
 * @prop placeholder - Hint text displayed when empty.
 * @prop errorText - Error message text. THOUGHT: Building this directly into the base input saves developers from having to wrap every simple input in a bulky `<Field>` component.
 * @prop helperText - Supplementary guidance text rendered below the input.
 */
// export interface FormProps<T> extends BaseComponentProps {
//   name:         string;
//   value?:       T;
//   defaultValue?: T;
//   onChange?:    (value: T) => void;
//   onBlur?:      (e: FocusEvent) => void;
//   size?:        FormElementSize;
//   disabled?:    boolean;
//   readOnly?:    boolean;
//   required?:    boolean;
//   invalid?:     boolean;
//   valid?:       boolean;
//   placeholder?: string;
//   errorText?:   string;
//   helperText?:  string;
// }