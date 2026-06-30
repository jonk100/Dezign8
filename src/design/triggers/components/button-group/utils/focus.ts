// design/triggers/button-group/utils/focus.ts

export function focusElement(element: HTMLElement | null): boolean {
  if (element) {
    element.focus();
    return true;
  }
  return false;
}
