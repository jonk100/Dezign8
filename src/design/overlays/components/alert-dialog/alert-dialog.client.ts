// alert-dialog.client.ts — wires up all <dialog class="alert-dialog"> elements on the page

function openAlertDialog(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  dialog.showModal();
  window.dispatchEvent(new CustomEvent("alert-dialog:open", { detail: { id } }));
}

function closeAlertDialog(id: string) {
  const dialog = document.getElementById(id) as HTMLDialogElement | null;
  if (!dialog) return;
  dialog.close();
  window.dispatchEvent(new CustomEvent("alert-dialog:close", { detail: { id } }));
}

function initAlertDialog(dialog: HTMLDialogElement) {
  const id         = dialog.id;
  const closeOnEsc = dialog.dataset["closeEsc"] === "true";

  // buttons with data-alert-dialog-close="id" (cancel / dismiss)
  dialog.querySelectorAll<HTMLElement>(`[data-alert-dialog-close="${id}"]`).forEach((btn) => {
    btn.addEventListener("click", () => closeAlertDialog(id));
  });

  // buttons with data-alert-dialog-confirm="id" close after action
  dialog.querySelectorAll<HTMLElement>(`[data-alert-dialog-confirm="${id}"]`).forEach((btn) => {
    btn.addEventListener("click", () => closeAlertDialog(id));
  });

  // Esc — alertdialog typically requires explicit choice; suppress unless opted in
  if (!closeOnEsc) {
    dialog.addEventListener("cancel", (e) => e.preventDefault());
  }

  // keep window event in sync when dialog is closed natively
  dialog.addEventListener("close", () => {
    window.dispatchEvent(new CustomEvent("alert-dialog:close", { detail: { id } }));
  });
}

export function initAlertDialogs() {
  document.querySelectorAll<HTMLDialogElement>("dialog.alert-dialog").forEach(initAlertDialog);
}

// Controller — call from any page script to open/close by id
export const alertDialog = { open: openAlertDialog, close: closeAlertDialog };
