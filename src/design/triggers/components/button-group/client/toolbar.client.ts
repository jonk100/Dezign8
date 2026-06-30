// design/triggers/button-group/client/toolbar.client.ts

import { getFocusableButtons, handleKeyboardNavigation } from "./client.utils";

function initToolbarButtonGroup(group: HTMLElement): void {
  const buttons = getFocusableButtons(group);
  if (buttons.length === 0) return;

  // Initialize focus states and tabindex
  buttons.forEach((btn, i) => {
    btn.setAttribute("tabindex", i === 0 ? "0" : "-1");
  });

  // Keyboard navigation
  group.addEventListener("keydown", e => {
    const active = document.activeElement as HTMLElement;
    if (!active || !buttons.includes(active)) return;

    const nextBtn = handleKeyboardNavigation(e as KeyboardEvent, buttons, active);
    if (nextBtn) {
      buttons.forEach(btn => {
        btn.setAttribute("tabindex", btn === nextBtn ? "0" : "-1");
      });
      nextBtn.focus();
    }
  });
}

function setupToolbarGroups(): void {
  document.querySelectorAll<HTMLElement>(".button-group--toolbar").forEach(initToolbarButtonGroup);
}

document.addEventListener("DOMContentLoaded", setupToolbarGroups);
document.addEventListener("astro:after-swap", setupToolbarGroups);
