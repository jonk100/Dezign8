export function initSheets() {
  document.querySelectorAll<HTMLElement>("[data-sheet-open]").forEach((btn) => {
    if (btn.dataset.sheetBound === "true") return;
    btn.dataset.sheetBound = "true";

    btn.addEventListener("click", () => {
      const targetId = btn.dataset.sheetOpen;
      if (!targetId) return;
      const sheet = document.getElementById(targetId) as HTMLDialogElement | null;
      if (sheet) {
        sheet.showModal();
        sheet.dataset.state = "open";
      }
    });
  });

  document.querySelectorAll<HTMLElement>("[data-sheet-close]").forEach((btn) => {
    if (btn.dataset.sheetBound === "true") return;
    btn.dataset.sheetBound = "true";

    btn.addEventListener("click", () => {
      const targetId = btn.dataset.sheetClose;
      const sheet = targetId 
        ? (document.getElementById(targetId) as HTMLDialogElement | null)
        : (btn.closest("dialog.sheet") as HTMLDialogElement | null);
      
      if (sheet) {
        closeSheet(sheet);
      }
    });
  });

  document.querySelectorAll<HTMLDialogElement>("dialog.sheet").forEach((sheet) => {
    if (sheet.dataset.sheetBound === "true") return;
    sheet.dataset.sheetBound = "true";

    sheet.addEventListener("click", (e) => {
      if (e.target === sheet) {
        closeSheet(sheet);
      }
    });

    sheet.addEventListener("cancel", (e) => {
      e.preventDefault();
      closeSheet(sheet);
    });
  });

  document.querySelectorAll<HTMLElement>("[data-sheet-move]").forEach((btn) => {
    if (btn.dataset.sheetMoveBound === "true") return;
    btn.dataset.sheetMoveBound = "true";

    btn.addEventListener("click", () => {
      const targetId = btn.dataset.sheetMoveTarget;
      const sheet = targetId 
        ? (document.getElementById(targetId) as HTMLDialogElement | null)
        : (btn.closest("dialog.sheet") as HTMLDialogElement | null);

      if (sheet) {
        const side = btn.dataset.sheetMove;
        if (side) sheet.dataset.side = side;
      }
    });
  });
}

function closeSheet(sheet: HTMLDialogElement) {
  sheet.dataset.state = "closed";
  setTimeout(() => {
    if (sheet.dataset.state === "closed") {
      sheet.close();
      sheet.dataset.state = "";
    }
  }, 300);
}
