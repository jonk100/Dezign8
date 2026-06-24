// popover.client.ts — JS positioning for [popover="auto"] panels

const GAP = 6; // px gap between trigger and panel

function positionPanel(anchor: Element, panel: HTMLElement, placement: string): void {
  const rect = anchor.getBoundingClientRect();
  const pw   = panel.offsetWidth;
  const ph   = panel.offsetHeight;

  let top: number;
  let left: number;

  if (placement.startsWith("top")) {
    top = rect.top - ph - GAP;
  } else {
    // bottom (default)
    top = rect.bottom + GAP;
  }

  if (placement.endsWith("start")) {
    left = rect.left;
  } else if (placement.endsWith("end")) {
    left = rect.right - pw;
  } else {
    left = rect.left + rect.width / 2 - pw / 2;
  }

  // clamp to viewport
  const margin = 8;
  left = Math.max(margin, Math.min(left, window.innerWidth  - pw  - margin));
  top  = Math.max(margin, Math.min(top,  window.innerHeight - ph - margin));

  panel.style.left = `${left}px`;
  panel.style.top  = `${top}px`;
}

function initPopover(host: HTMLElement): void {
  const panel   = host.querySelector<HTMLElement>("[popover]");
  const trigger = host.querySelector<HTMLElement>("[data-popover-trigger]");
  if (!panel || !trigger) return;

  // Wire popovertarget to the first interactive element in the trigger slot
  const btn = trigger.querySelector<HTMLElement>("button, a, [role='button'], input, select");
  if (btn && !btn.hasAttribute("popovertarget")) {
    btn.setAttribute("popovertarget", panel.id);
  }

  const placement = host.dataset.placement ?? "bottom";

  panel.addEventListener("toggle", (e) => {
    if ((e as ToggleEvent).newState === "open") {
      positionPanel(trigger, panel, placement);
    }
  });
}

export function initPopovers(): void {
  document.querySelectorAll<HTMLElement>("[data-popover-host]").forEach(initPopover);
}

if (typeof document !== "undefined") {
  initPopovers();
  document.addEventListener("astro:after-swap", initPopovers);
}

export const popover = {
  close: (id: string) => {
    const panel = document.getElementById(id) as HTMLElement & { hidePopover?: () => void } | null;
    panel?.hidePopover?.();
  },
};
