// design/triggers/button-group/client/client.utils.ts

/**
 * Shared client utilities for ButtonGroup interactivity.
 */

export function getFocusableButtons(group: HTMLElement): HTMLElement[] {
  return Array.from(group.querySelectorAll<HTMLElement>(".button:not([data-disabled]):not([disabled])"));
}

export function handleKeyboardNavigation(
  event: KeyboardEvent,
  buttons: HTMLElement[],
  activeElement: HTMLElement,
): HTMLElement | null {
  const currentIndex = buttons.indexOf(activeElement);
  if (currentIndex === -1) return null;

  let targetIndex = -1;
  const len = buttons.length;

  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown":
      targetIndex = (currentIndex + 1) % len;
      break;
    case "ArrowLeft":
    case "ArrowUp":
      targetIndex = (currentIndex - 1 + len) % len;
      break;
    case "Home":
      targetIndex = 0;
      break;
    case "End":
      targetIndex = len - 1;
      break;
    default:
      return null;
  }

  event.preventDefault();
  return buttons[targetIndex] ?? null;
}
