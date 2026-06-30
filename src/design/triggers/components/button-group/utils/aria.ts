// design/triggers/button-group/utils/aria.ts

export function setAriaChecked(element: HTMLElement, checked: boolean): void {
  element.setAttribute("aria-checked", checked ? "true" : "false");
}

export function setAriaPressed(element: HTMLElement, pressed: boolean): void {
  element.setAttribute("aria-pressed", pressed ? "true" : "false");
}
