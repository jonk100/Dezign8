// design/triggers/button-group/client/toggle.client.ts

import { getFocusableButtons, handleKeyboardNavigation } from "./client.utils";

function initToggleButtonGroup(group: HTMLElement): void {
  const name = group.getAttribute("data-name");
  const buttons = getFocusableButtons(group);
  if (buttons.length === 0) return;

  function updateInputs(): void {
    if (!name) return;

    // Remove old hidden inputs
    group.querySelectorAll(`input[type="hidden"][name="${name}"]`).forEach(el => el.remove());

    // Create new hidden inputs for selected values
    buttons.forEach(btn => {
      if (btn.getAttribute("data-selected") === "true") {
        const val = btn.getAttribute("value") || btn.getAttribute("data-value") || "";
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = val;
        group.appendChild(input);
      }
    });
  }

  function toggleButton(btn: HTMLElement): void {
    const isSelected = btn.getAttribute("data-selected") === "true";
    btn.setAttribute("data-selected", isSelected ? "false" : "true");
    btn.setAttribute("aria-pressed", isSelected ? "false" : "true");

    updateInputs();

    const selectedValues = buttons
      .filter(b => b.getAttribute("data-selected") === "true")
      .map(b => b.getAttribute("value") || b.getAttribute("data-value") || "");

    group.dispatchEvent(
      new CustomEvent("buttongroup:change", {
        detail: { values: selectedValues },
        bubbles: true,
      })
    );
  }

  // Initialize focus states and tabindex
  buttons.forEach((btn, i) => {
    btn.setAttribute("tabindex", i === 0 ? "0" : "-1");
    
    // Set initial aria-pressed if data-selected is set
    const isSelected = btn.getAttribute("data-selected") === "true";
    btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
  });

  updateInputs();

  // Click Handler
  group.addEventListener("click", e => {
    const target = e.target as HTMLElement;
    const btn = target.closest(".button") as HTMLElement;
    if (!btn || !buttons.includes(btn)) return;

    e.preventDefault();
    toggleButton(btn);
  });

  // Keyboard navigation (move focus only, space/enter triggers click naturally)
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

function setupToggleGroups(): void {
  document.querySelectorAll<HTMLElement>(".button-group--toggle").forEach(initToggleButtonGroup);
}

document.addEventListener("DOMContentLoaded", setupToggleGroups);
document.addEventListener("astro:after-swap", setupToggleGroups);
