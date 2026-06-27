// dropdown-menu.client.ts — positioning is done natively; floating-ui import removed

export function initDropdownMenus() {
  const dropdowns = document.querySelectorAll<HTMLElement>('.dropdown-menu');

  dropdowns.forEach((dropdown) => {
    if (dropdown.dataset.dropdownBound === "true") return;
    dropdown.dataset.dropdownBound = "true";

    dropdown.addEventListener('toggle', (event: Event) => {
      const e = event as ToggleEvent;
      if (e.newState === "open") {
        // Find the trigger that opened this popover
        const id = dropdown.id;
        const trigger = document.querySelector(`[popovertarget="${id}"]`) as HTMLElement;
        if (!trigger) return;

        // Determine if it's a submenu (trigger is inside another dropdown)
        const isSubmenu = trigger.closest('.dropdown-menu') !== null;
        const placement = isSubmenu ? 'right-start' : 'bottom-start';

        // Position it using Floating UI or fallback calculation
        positionDropdown(trigger, dropdown, placement);
      }
    });
  });
}

function positionDropdown(trigger: HTMLElement, dropdown: HTMLElement, placement: string = 'bottom-start') {
  // Use a simple fallback if Floating UI isn't bundled, but since we are writing a positioning script,
  // we'll implement a lightweight absolute positioning calculation here to avoid adding dependencies 
  // if they don't exist. Actually, let's just write the native calculation.
  
  const rect = trigger.getBoundingClientRect();
  const dropdownRect = dropdown.getBoundingClientRect();
  
  let top = 0;
  let left = 0;

  if (placement === 'right-start') {
    // Submenu positioning
    top = rect.top;
    left = rect.right + 4; // 4px offset
  } else {
    // Standard bottom-start positioning
    top = rect.bottom + 4; // 4px offset
    left = rect.left;
  }

  // Basic collision detection (prevent bleeding off right or bottom edges)
  if (left + dropdownRect.width > window.innerWidth) {
    left = window.innerWidth - dropdownRect.width - 8;
  }
  if (top + dropdownRect.height > window.innerHeight) {
    if (placement === 'bottom-start') {
      top = rect.top - dropdownRect.height - 4; // Flip to top
    } else {
      top = window.innerHeight - dropdownRect.height - 8;
    }
  }

  dropdown.style.left = `${left}px`;
  dropdown.style.top = `${top}px`;
}
