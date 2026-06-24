// drawer.client.ts — wires up all <dialog class="drawer"> elements on the page

function openDrawer(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  dialog.showModal();
  window.dispatchEvent(new CustomEvent("drawer:open", { detail: { id } }));
}

function closeDrawer(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  dialog.close();
  window.dispatchEvent(new CustomEvent("drawer:close", { detail: { id } }));
}

function isBackdropClick(dialog: HTMLDialogElement, event: MouseEvent): boolean {
  const rect = dialog.getBoundingClientRect();
  return (
    event.clientX < rect.left  ||
    event.clientX > rect.right ||
    event.clientY < rect.top   ||
    event.clientY > rect.bottom
  );
}

function initDrawer(dialog: HTMLDialogElement) {
  const id              = dialog.id;
  const closeOnBackdrop = dialog.dataset["closeBackdrop"] !== "false";
  const closeOnEsc      = dialog.dataset["closeEsc"]      !== "false";

  dialog.querySelectorAll<HTMLElement>(`[data-drawer-close="${id}"]`).forEach((btn) => {
    btn.addEventListener("click", () => closeDrawer(id));
  });

  if (closeOnBackdrop) {
    dialog.addEventListener("click", (e) => {
      if (isBackdropClick(dialog, e)) closeDrawer(id);
    });
  }

  if (!closeOnEsc) {
    dialog.addEventListener("cancel", (e) => e.preventDefault());
  }

  dialog.addEventListener("close", () => {
    window.dispatchEvent(new CustomEvent("drawer:close", { detail: { id } }));
  });
}

export function initDrawers() {
  document.querySelectorAll<HTMLDialogElement>("dialog.drawer").forEach(initDrawer);
}

if (typeof document !== "undefined") {
  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element).closest("[data-drawer-open]");
    if (trigger) {
      const id = (trigger as HTMLElement).dataset.drawerOpen;
      if (id) openDrawer(id);
    }
  });
}

export const drawer = { open: openDrawer, close: closeDrawer };
