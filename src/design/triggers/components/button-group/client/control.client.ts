// design/triggers/button-group/client/control.client.ts

import { getFocusableButtons, handleKeyboardNavigation } from "./client.utils";

function initControlButtonGroup(group: HTMLElement): void {
  const name = group.getAttribute("data-name");
  let hiddenInput: HTMLInputElement | null = null;
  if (name) {
    hiddenInput = group.querySelector(`input[type="hidden"][name="${name}"]`);
  }

  const buttons = getFocusableButtons(group);
  if (buttons.length === 0) return;

  function selectButton(selectedBtn: HTMLElement, focus = true): void {
    buttons.forEach(btn => {
      const isSelected = btn === selectedBtn;
      btn.setAttribute("aria-checked", isSelected ? "true" : "false");
      btn.setAttribute("data-selected", isSelected ? "true" : "false");
      btn.setAttribute("tabindex", isSelected ? "0" : "-1");
    });

    const value = selectedBtn.getAttribute("value") || selectedBtn.getAttribute("data-value") || "";
    group.setAttribute("data-value", value);

    if (hiddenInput) {
      hiddenInput.value = value;
    }

    if (focus) {
      selectedBtn.focus();
    }

    group.dispatchEvent(
      new CustomEvent("buttongroup:change", {
        detail: { value },
        bubbles: true,
      })
    );
  }

  // Initialize state based on data-value or first child
  const initialValue = group.getAttribute("data-value");
  let initialBtn = buttons.find(
    btn => btn.getAttribute("value") === initialValue || btn.getAttribute("data-value") === initialValue
  );
  if (!initialBtn && buttons[0]) {
    initialBtn = buttons[0];
  }
  if (initialBtn) {
    selectButton(initialBtn, false);
  }

  // Click Handler
  group.addEventListener("click", e => {
    const target = e.target as HTMLElement;
    const btn = target.closest(".button") as HTMLElement;
    if (!btn || !buttons.includes(btn)) return;

    e.preventDefault();
    selectButton(btn);
  });

  // Keydown Handler
  group.addEventListener("keydown", e => {
    const active = document.activeElement as HTMLElement;
    if (!active || !buttons.includes(active)) return;

    const nextBtn = handleKeyboardNavigation(e as KeyboardEvent, buttons, active);
    if (nextBtn) {
      selectButton(nextBtn);
    }
  });
}

function setupControlGroups(): void {
  document.querySelectorAll<HTMLElement>(".button-group--control").forEach(initControlButtonGroup);
}

document.addEventListener("DOMContentLoaded", setupControlGroups);
document.addEventListener("astro:after-swap", setupControlGroups);
