// design/triggers/button-group/utils/keyboard.ts

export const KEYS = {
  ARROW_UP:    "ArrowUp",
  ARROW_DOWN:  "ArrowDown",
  ARROW_LEFT:  "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  HOME:        "Home",
  END:         "End",
  SPACE:       " ",
  ENTER:       "Enter",
} as const;

export function isNavigationKey(key: string): boolean {
  return [
    KEYS.ARROW_UP,
    KEYS.ARROW_DOWN,
    KEYS.ARROW_LEFT,
    KEYS.ARROW_RIGHT,
    KEYS.HOME,
    KEYS.END,
  ].includes(key as any);
}
