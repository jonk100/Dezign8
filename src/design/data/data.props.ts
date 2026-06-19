/**
 * DataProps
 * 
 * Handles structured array mapping, sorting, and empty/loading states gracefully.
 * 
 * @prop data - The array of structured objects to render.
 * @prop keyExtractor - THOUGHT: A function extracting a unique ID from the data. This bypasses React's "missing key" warnings natively without forcing developers to map it manually inside the component.
 * @prop isLoading - Triggers the data component's loading state.
 * @prop loadingElement - Custom UI (like a skeleton table) to render when `isLoading` is true.
 * @prop isEmpty - THOUGHT: Overrides the internal `data.length === 0` check. Essential for complex tables where the data array might be temporarily empty due to a filter, but you want to show a "No results found" UI instead of the default "Table is empty" UI.
 * @prop emptyElement - Custom UI to render when data is empty.
 * @prop onSort - Callback fired when a column/header is clicked for sorting.
 * @prop selectable - Enables row/item selection checkboxes.
 * @prop onSelect - Callback returning an array of selected item keys.
 * @prop maxHeight - Constrains the component height and enables internal overflow scrolling.
 */
export interface DataProps<T> extends BaseComponentProps {
  data:             T[];
  keyExtractor:     (item: T) => string | number;
  isLoading?:       boolean;
  loadingElement?:  HTMLAttributes;
  isEmpty?:         boolean;
  emptyElement?:    HTMLAttributes;
  onSort?:          (key: keyof T, direction: "asc" | "desc") => void;
  selectable?:      boolean;
  onSelect?:        (selectedKeys: string[]) => void;
  maxHeight?:       string;
}
