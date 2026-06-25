// modal.client.ts — wires up all <dialog class="modal"> elements on the page

function openModal(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  dialog.showModal();
  window.dispatchEvent(new CustomEvent("modal:open", { detail: { id } }));
}

function closeModal(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  dialog.close();
  window.dispatchEvent(new CustomEvent("modal:close", { detail: { id } }));
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

function initModal(dialog: HTMLDialogElement) {
  const id               = dialog.id;
  const closeOnBackdrop  = dialog.dataset["closeBackdrop"] !== "false";
  const closeOnEsc       = dialog.dataset["closeEsc"]      !== "false";

  // close buttons with data-modal-close="id"
  dialog.querySelectorAll<HTMLElement>(`[data-modal-close="${id}"]`).forEach((btn) => {
    btn.addEventListener("click", () => closeModal(id));
  });

  // backdrop click — <dialog> fires click on the ::backdrop area
  if (closeOnBackdrop) {
    dialog.addEventListener("click", (e) => {
      if (isBackdropClick(dialog, e)) closeModal(id);
    });
  }

  // native Escape key — <dialog> handles this by default; we suppress if needed
  if (!closeOnEsc) {
    dialog.addEventListener("cancel", (e) => e.preventDefault());
  }

  // keep window event in sync when dialog is closed natively (Escape)
  dialog.addEventListener("close", () => {
    window.dispatchEvent(new CustomEvent("modal:close", { detail: { id } }));
  });
}

export function initModals() {
  document.querySelectorAll<HTMLDialogElement>("dialog.modal").forEach(initModal);
}

// Global listener for declarative modal triggers
if (typeof document !== "undefined") {
  document.addEventListener("click", (e) => {
    const trigger = (e.target as Element).closest("[data-modal-open]");
    if (trigger) {
      const id = (trigger as HTMLElement).dataset.modalOpen;
      if (id) openModal(id);
    }
  });
}

// Controller — call from any page script to open/close by id
export const modal = { open: openModal, close: closeModal };
