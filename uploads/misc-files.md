# Aggregated MISC Files

## alert-dialog.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.client.ts`


!!!ts
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

!!!

---

## audio.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.client.ts`


!!!ts
// design/assets/audio/audio.client.ts

import { formatTime, buildAudioGraph } from "./audio.utils";
import type { AudioGraph } from "./audio.utils";

interface PlayerState {
  graph:    AudioGraph | null;
  muted:    boolean;
  redactSegs: [number, number][];
}

function updateSeekFill(seekEl: HTMLInputElement, pct: number) {
  seekEl.value = String(pct);
  seekEl.style.background =
    `linear-gradient(to right, var(--audio--color-base) ${pct}%, var(--border--subtle) ${pct}%)`;
}

function checkRedact(state: PlayerState, currentTime: number) {
  const { graph, redactSegs } = state;
  if (!graph) return;

  const inSeg = redactSegs.some(([s, e]) => currentTime >= s && currentTime <= e);

  if (inSeg && !state.muted) {
    graph.gainNode.gain.value = 0;
    graph.beepGain.gain.value = 0.4;
    state.muted = true;
  } else if (!inSeg && state.muted) {
    graph.gainNode.gain.value = 1;
    graph.beepGain.gain.value = 0;
    state.muted = false;
  }
}

function initPlayer(container: HTMLElement) {
  const audio    = container.querySelector<HTMLAudioElement>(".audio__native");
  const playBtn  = container.querySelector<HTMLButtonElement>("[data-audio-play]");
  const iconPlay  = container.querySelector<SVGElement>(".audio__icon-play");
  const iconPause = container.querySelector<SVGElement>(".audio__icon-pause");
  const seekEl   = container.querySelector<HTMLInputElement>("[data-audio-seek]");
  const timeEl   = container.querySelector<HTMLElement>("[data-audio-time]");
  const volEl    = container.querySelector<HTMLInputElement>("[data-audio-volume]");
  const rateEl   = container.querySelector<HTMLSelectElement>("[data-audio-rate]");

  if (!audio || !playBtn || !seekEl || !timeEl || !volEl || !rateEl) return;

  const initVolume    = parseFloat(container.dataset["volume"]        ?? "1");
  const initRate      = parseFloat(container.dataset["playbackRate"]  ?? "1");
  const preservePitch = container.dataset["preservePitch"] !== "false";
  const isIntercom    = container.dataset["intercom"] === "true";
  const redactRaw     = container.dataset["redact"];

  audio.volume       = initVolume;
  audio.playbackRate = initRate;
  // ponytail: simplified implementation; preservesPitch is non-standard but
  // widely supported. Upgrade path: use webkit prefix or cast as needed.
  (audio as any).preservesPitch = preservePitch;

  volEl.value  = String(initVolume);
  rateEl.value = String(initRate);

  const state: PlayerState = {
    graph:      null,
    muted:      false,
    redactSegs: redactRaw ? (JSON.parse(redactRaw) as [number, number][]) : [],
  };

  function ensureGraph() {
    if (!state.graph) {
      state.graph = buildAudioGraph(audio!, isIntercom);
    }
    if (state.graph.ctx.state === "suspended") {
      state.graph.ctx.resume();
    }
  }

  // ── Play / pause ─────────────────────────────────────────────────

  playBtn.addEventListener("click", () => {
    ensureGraph();
    audio!.paused ? audio!.play() : audio!.pause();
  });

  audio.addEventListener("play", () => {
    iconPlay!.style.display  = "none";
    iconPause!.style.display = "";
    playBtn.setAttribute("aria-label", "Pause");
  });

  audio.addEventListener("pause", () => {
    iconPlay!.style.display  = "";
    iconPause!.style.display = "none";
    playBtn.setAttribute("aria-label", "Play");
  });

  audio.addEventListener("ended", () => {
    iconPlay!.style.display  = "";
    iconPause!.style.display = "none";
    playBtn.setAttribute("aria-label", "Play");
  });

  // ── Progress ─────────────────────────────────────────────────────

  audio.addEventListener("timeupdate", () => {
    const pct = audio!.duration ? (audio!.currentTime / audio!.duration) * 100 : 0;
    updateSeekFill(seekEl!, pct);
    timeEl!.textContent = `${formatTime(audio!.currentTime)} / ${formatTime(audio!.duration)}`;
    if (state.redactSegs.length) checkRedact(state, audio!.currentTime);
  });

  audio.addEventListener("loadedmetadata", () => {
    timeEl!.textContent = `0:00 / ${formatTime(audio!.duration)}`;
  });

  // ── Seek ──────────────────────────────────────────────────────────

  seekEl.addEventListener("input", () => {
    if (audio!.duration) {
      audio!.currentTime = (parseFloat(seekEl.value) / 100) * audio!.duration;
    }
  });

  // ── Volume ────────────────────────────────────────────────────────

  volEl.addEventListener("input", () => {
    audio!.volume = parseFloat(volEl.value);
  });

  // ── Playback rate ─────────────────────────────────────────────────

  rateEl.addEventListener("change", () => {
    audio!.playbackRate = parseFloat(rateEl.value);
    // Re-apply in case browser resets preservesPitch on rate change.
    (audio as any).preservesPitch = preservePitch;
  });
}

export function initAllPlayers() {
  document.querySelectorAll<HTMLElement>(".audio").forEach(initPlayer);
}

!!!

---

## audio.utils.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.utils.ts`


!!!ts
// design/assets/audio/audio.utils.ts
// Pure helpers — no DOM dependencies.

export function formatTime(sec: number): string {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function makeDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
  const n   = 256;
  const buf = new ArrayBuffer(n * 4);
  const curve = new Float32Array(buf);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

export interface AudioGraph {
  ctx:      AudioContext;
  source:   MediaElementAudioSourceNode;
  gainNode: GainNode;
  beepGain: GainNode;
  beepOsc:  OscillatorNode;
  lowPass:  BiquadFilterNode | null;
  distort:  WaveShaperNode   | null;
}

/** Build Web Audio graph from a native <audio> element. Caller must ensure
 *  this is invoked inside a user-gesture handler (AudioContext autoplay policy). */
export function buildAudioGraph(
  audio:      HTMLAudioElement,
  isIntercom: boolean,
): AudioGraph {
  const ctx    = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  const gain   = ctx.createGain();
  gain.gain.value = 1;

  let chain: AudioNode = source;
  let lowPass: BiquadFilterNode | null = null;
  let distort: WaveShaperNode   | null = null;

  if (isIntercom) {
    lowPass = ctx.createBiquadFilter();
    lowPass.type = "lowpass";
    lowPass.frequency.value = 3400; // telephone band

    distort = ctx.createWaveShaper();
    distort.curve      = makeDistortionCurve(30);
    distort.oversample = "2x";

    chain.connect(lowPass);
    lowPass.connect(distort);
    chain = distort;
  }

  // Beep oscillator — parked at gain 0; enabled during redacted segments.
  const beepGain = ctx.createGain();
  beepGain.gain.value = 0;

  const beepOsc = ctx.createOscillator();
  beepOsc.type = "sine";
  beepOsc.frequency.value = 1000;
  beepOsc.connect(beepGain);
  beepGain.connect(ctx.destination);
  beepOsc.start();

  chain.connect(gain);
  gain.connect(ctx.destination);

  return { ctx, source, gainNode: gain, beepGain, beepOsc, lowPass, distort };
}

!!!

---

## dezign8.code-workspace


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/dezign8.code-workspace`


!!!
{
	"folders": [
		{
			"path": "../../../../.."
		}
	],
	"settings": {}
}
!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/index.ts`


!!!ts

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/index.ts`


!!!ts
// export { default as Caption } from "./Caption.astro";

// export * from "./caption.props";
// export * from "./caption.tokens";
// export * from "./caption.hook";
!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/index.ts`


!!!ts
export * from "./card.props";
export * from "./card.tokens";

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/index.ts`


!!!ts
export { default as Center } from "./Center.astro";
export * from "./center.props";
export * from "./center.tokens";
export * from "./center.hook";

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/index.ts`


!!!ts
// design/typography/components/code/index.ts
export { default as Code } from "./Code.astro";
export { default as Pre }  from "./Pre.astro";
export * from "./code.props";
export * from "./code.tokens";
export * from "./code.hook";

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/index.ts`


!!!ts
export { default as Container } from "./Container.astro";
export * from "./container.props";
export * from "./container.tokens";
export * from "./container.hook";

!!!

---

## drawer.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.client.ts`


!!!ts
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

!!!

---

## dropdown-menu.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.client.ts`


!!!ts
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

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/index.ts`


!!!ts
export { default as Flex } from "./Flex.astro";
export * from "./flex.props";
export * from "./flex.tokens";
export * from "./flex.hook";

!!!

---

## frame.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.ts`


!!!ts

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/index.ts`


!!!ts
// design/surfaces/components/frame/index.ts
export { default as Frame } from "./Frame.astro";
export * from "./frame.props";
export * from "./frame.tokens";
export * from "./frame.hook";

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/index.ts`


!!!ts
export { default as Grid } from "./Grid.astro";
export * from "./grid.props";
export * from "./grid.tokens";
export * from "./grid.hook";

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/index.ts`


!!!ts
export { default as Inline } from "./Inline.astro";
export * from "./inline.props";
export * from "./inline.tokens";
export * from "./inline.hook";

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/index.ts`


!!!ts
export { default as Label } from "./Label.astro";
export * from "./label.hook";
export * from "./label.props";
export * from "./label.tokens";
!!!

---

## list.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/list.client.ts`


!!!ts
// design/data/list/list.client.ts

import { persistAndDispatch } from "~/data/data.utils";

/**
 * Client-side selection manager for <List selectable />.
 *
 * READING SELECTION STATE
 * ─────────────────────────────────────────────────────────────────
 * On a button click:
 *   const selected = JSON.parse(list.dataset.selected ?? "[]");
 *
 * Reactively:
 *   list.addEventListener("list:selectionchange", e => {
 *     const { selected, all, none } = e.detail;
 *   });
 *
 * FORM PARTICIPATION
 * ─────────────────────────────────────────────────────────────────
 * Selection checkboxes render as <input name="selected" value="0" />.
 * Submit a form containing the list → POST body has selected=0&selected=2.
 *
 * NOTE: to-do checkboxes (from item.checkState) are not wired here.
 * They are per-item state, not bulk selection state.
 */

function initSelectableList(list: HTMLElement): void {
  list.dataset.selected = "[]";

  list.addEventListener("change", e => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.closest("[data-selection-cb]"))  return;

    const boxes = [
      ...list.querySelectorAll<HTMLInputElement>("[data-selection-cb] input"),
    ];

    const selected = boxes
      .map((cb, i) => cb.checked ? i : -1)
      .filter(i => i !== -1);

    persistAndDispatch(list, selected, boxes.length, "list:selectionchange");
  });
}

document
  .querySelectorAll<HTMLElement>("[data-selectable].list")
  .forEach(initSelectableList);
!!!

---

## alert-dialog.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.client.ts`


!!!ts
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

!!!

---

---

## audio.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.client.ts`


!!!ts
// design/assets/audio/audio.client.ts

import { formatTime, buildAudioGraph } from "./audio.utils";
import type { AudioGraph } from "./audio.utils";

interface PlayerState {
  graph:    AudioGraph | null;
  muted:    boolean;
  redactSegs: [number, number][];
}

function updateSeekFill(seekEl: HTMLInputElement, pct: number) {
  seekEl.value = String(pct);
  seekEl.style.background =
    `linear-gradient(to right, var(--audio--color-base) ${pct}%, var(--border--subtle) ${pct}%)`;
}

function checkRedact(state: PlayerState, currentTime: number) {
  const { graph, redactSegs } = state;
  if (!graph) return;

  const inSeg = redactSegs.some(([s, e]) => currentTime >= s && currentTime <= e);

  if (inSeg && !state.muted) {
    graph.gainNode.gain.value = 0;
    graph.beepGain.gain.value = 0.4;
    state.muted = true;
  } else if (!inSeg && state.muted) {
    graph.gainNode.gain.value = 1;
    graph.beepGain.gain.value = 0;
    state.muted = false;
  }
}

function initPlayer(container: HTMLElement) {
  const audio    = container.querySelector<HTMLAudioElement>(".audio__native");
  const playBtn  = container.querySelector<HTMLButtonElement>("[data-audio-play]");
  const iconPlay  = container.querySelector<SVGElement>(".audio__icon-play");
  const iconPause = container.querySelector<SVGElement>(".audio__icon-pause");
  const seekEl   = container.querySelector<HTMLInputElement>("[data-audio-seek]");
  const timeEl   = container.querySelector<HTMLElement>("[data-audio-time]");
  const volEl    = container.querySelector<HTMLInputElement>("[data-audio-volume]");
  const rateEl   = container.querySelector<HTMLSelectElement>("[data-audio-rate]");

  if (!audio || !playBtn || !seekEl || !timeEl || !volEl || !rateEl) return;

  const initVolume    = parseFloat(container.dataset["volume"]        ?? "1");
  const initRate      = parseFloat(container.dataset["playbackRate"]  ?? "1");
  const preservePitch = container.dataset["preservePitch"] !== "false";
  const isIntercom    = container.dataset["intercom"] === "true";
  const redactRaw     = container.dataset["redact"];

  audio.volume       = initVolume;
  audio.playbackRate = initRate;
  // ponytail: simplified implementation; preservesPitch is non-standard but
  // widely supported. Upgrade path: use webkit prefix or cast as needed.
  (audio as any).preservesPitch = preservePitch;

  volEl.value  = String(initVolume);
  rateEl.value = String(initRate);

  const state: PlayerState = {
    graph:      null,
    muted:      false,
    redactSegs: redactRaw ? (JSON.parse(redactRaw) as [number, number][]) : [],
  };

  function ensureGraph() {
    if (!state.graph) {
      state.graph = buildAudioGraph(audio!, isIntercom);
    }
    if (state.graph.ctx.state === "suspended") {
      state.graph.ctx.resume();
    }
  }

  // ── Play / pause ─────────────────────────────────────────────────

  playBtn.addEventListener("click", () => {
    ensureGraph();
    audio!.paused ? audio!.play() : audio!.pause();
  });

  audio.addEventListener("play", () => {
    iconPlay!.style.display  = "none";
    iconPause!.style.display = "";
    playBtn.setAttribute("aria-label", "Pause");
  });

  audio.addEventListener("pause", () => {
    iconPlay!.style.display  = "";
    iconPause!.style.display = "none";
    playBtn.setAttribute("aria-label", "Play");
  });

  audio.addEventListener("ended", () => {
    iconPlay!.style.display  = "";
    iconPause!.style.display = "none";
    playBtn.setAttribute("aria-label", "Play");
  });

  // ── Progress ─────────────────────────────────────────────────────

  audio.addEventListener("timeupdate", () => {
    const pct = audio!.duration ? (audio!.currentTime / audio!.duration) * 100 : 0;
    updateSeekFill(seekEl!, pct);
    timeEl!.textContent = `${formatTime(audio!.currentTime)} / ${formatTime(audio!.duration)}`;
    if (state.redactSegs.length) checkRedact(state, audio!.currentTime);
  });

  audio.addEventListener("loadedmetadata", () => {
    timeEl!.textContent = `0:00 / ${formatTime(audio!.duration)}`;
  });

  // ── Seek ──────────────────────────────────────────────────────────

  seekEl.addEventListener("input", () => {
    if (audio!.duration) {
      audio!.currentTime = (parseFloat(seekEl.value) / 100) * audio!.duration;
    }
  });

  // ── Volume ────────────────────────────────────────────────────────

  volEl.addEventListener("input", () => {
    audio!.volume = parseFloat(volEl.value);
  });

  // ── Playback rate ─────────────────────────────────────────────────

  rateEl.addEventListener("change", () => {
    audio!.playbackRate = parseFloat(rateEl.value);
    // Re-apply in case browser resets preservesPitch on rate change.
    (audio as any).preservesPitch = preservePitch;
  });
}

export function initAllPlayers() {
  document.querySelectorAll<HTMLElement>(".audio").forEach(initPlayer);
}

!!!

---

---

## audio.utils.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.utils.ts`


!!!ts
// design/assets/audio/audio.utils.ts
// Pure helpers — no DOM dependencies.

export function formatTime(sec: number): string {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function makeDistortionCurve(amount: number): Float32Array<ArrayBuffer> {
  const n   = 256;
  const buf = new ArrayBuffer(n * 4);
  const curve = new Float32Array(buf);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

export interface AudioGraph {
  ctx:      AudioContext;
  source:   MediaElementAudioSourceNode;
  gainNode: GainNode;
  beepGain: GainNode;
  beepOsc:  OscillatorNode;
  lowPass:  BiquadFilterNode | null;
  distort:  WaveShaperNode   | null;
}

/** Build Web Audio graph from a native <audio> element. Caller must ensure
 *  this is invoked inside a user-gesture handler (AudioContext autoplay policy). */
export function buildAudioGraph(
  audio:      HTMLAudioElement,
  isIntercom: boolean,
): AudioGraph {
  const ctx    = new AudioContext();
  const source = ctx.createMediaElementSource(audio);
  const gain   = ctx.createGain();
  gain.gain.value = 1;

  let chain: AudioNode = source;
  let lowPass: BiquadFilterNode | null = null;
  let distort: WaveShaperNode   | null = null;

  if (isIntercom) {
    lowPass = ctx.createBiquadFilter();
    lowPass.type = "lowpass";
    lowPass.frequency.value = 3400; // telephone band

    distort = ctx.createWaveShaper();
    distort.curve      = makeDistortionCurve(30);
    distort.oversample = "2x";

    chain.connect(lowPass);
    lowPass.connect(distort);
    chain = distort;
  }

  // Beep oscillator — parked at gain 0; enabled during redacted segments.
  const beepGain = ctx.createGain();
  beepGain.gain.value = 0;

  const beepOsc = ctx.createOscillator();
  beepOsc.type = "sine";
  beepOsc.frequency.value = 1000;
  beepOsc.connect(beepGain);
  beepGain.connect(ctx.destination);
  beepOsc.start();

  chain.connect(gain);
  gain.connect(ctx.destination);

  return { ctx, source, gainNode: gain, beepGain, beepOsc, lowPass, distort };
}

!!!

---

---

## dezign8.code-workspace


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/dezign8.code-workspace`


!!!
{
	"folders": [
		{
			"path": "../../../../.."
		}
	],
	"settings": {}
}
!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/index.ts`


!!!ts

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/index.ts`


!!!ts
// export { default as Caption } from "./Caption.astro";

// export * from "./caption.props";
// export * from "./caption.tokens";
// export * from "./caption.hook";
!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/index.ts`


!!!ts
export * from "./card.props";
export * from "./card.tokens";

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/index.ts`


!!!ts
export { default as Center } from "./Center.astro";
export * from "./center.props";
export * from "./center.tokens";
export * from "./center.hook";

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/index.ts`


!!!ts
// design/typography/components/code/index.ts
export { default as Code } from "./Code.astro";
export { default as Pre }  from "./Pre.astro";
export * from "./code.props";
export * from "./code.tokens";
export * from "./code.hook";

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/index.ts`


!!!ts
export { default as Container } from "./Container.astro";
export * from "./container.props";
export * from "./container.tokens";
export * from "./container.hook";

!!!

---

---

## drawer.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.client.ts`


!!!ts
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

!!!

---

---

## dropdown-menu.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.client.ts`


!!!ts
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

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/index.ts`


!!!ts
export { default as Flex } from "./Flex.astro";
export * from "./flex.props";
export * from "./flex.tokens";
export * from "./flex.hook";

!!!

---

---

## frame.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.ts`


!!!ts

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/index.ts`


!!!ts
// design/surfaces/components/frame/index.ts
export { default as Frame } from "./Frame.astro";
export * from "./frame.props";
export * from "./frame.tokens";
export * from "./frame.hook";

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/index.ts`


!!!ts
export { default as Grid } from "./Grid.astro";
export * from "./grid.props";
export * from "./grid.tokens";
export * from "./grid.hook";

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/index.ts`


!!!ts
export { default as Inline } from "./Inline.astro";
export * from "./inline.props";
export * from "./inline.tokens";
export * from "./inline.hook";

!!!

---

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/index.ts`


!!!ts
export { default as Label } from "./Label.astro";
export * from "./label.hook";
export * from "./label.props";
export * from "./label.tokens";
!!!

---

---

## list.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/list.client.ts`


!!!ts
// design/data/list/list.client.ts

import { persistAndDispatch } from "~/data/data.utils";

/**
 * Client-side selection manager for <List selectable />.
 *
 * READING SELECTION STATE
 * ─────────────────────────────────────────────────────────────────
 * On a button click:
 *   const selected = JSON.parse(list.dataset.selected ?? "[]");
 *
 * Reactively:
 *   list.addEventListener("list:selectionchange", e => {
 *     const { selected, all, none } = e.detail;
 *   });
 *
 * FORM PARTICIPATION
 * ─────────────────────────────────────────────────────────────────
 * Selection checkboxes render as <input name="selected" value="0" />.
 * Submit a form containing the list → POST body has selected=0&selected=2.
 *
 * NOTE: to-do checkboxes (from item.checkState) are not wired here.
 * They are per-item state, not bulk selection state.
 */

function initSelectableList(list: HTMLElement): void {
  list.dataset.selected = "[]";

  list.addEventListener("change", e => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.closest("[data-selection-cb]"))  return;

    const boxes = [
      ...list.querySelectorAll<HTMLInputElement>("[data-selection-cb] input"),
    ];

    const selected = boxes
      .map((cb, i) => cb.checked ? i : -1)
      .filter(i => i !== -1);

    persistAndDispatch(list, selected, boxes.length, "list:selectionchange");
  });
}

document
  .querySelectorAll<HTMLElement>("[data-selectable].list")
  .forEach(initSelectableList);
!!!

---

---

## modal.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/modal/modal.client.ts`


!!!ts
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

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/panel/index.ts`


!!!ts
// design/surfaces/components/panel/index.ts
export { default as Panel } from "./Panel.astro";
export * from "./panel.props";
export * from "./panel.tokens";
export * from "./panel.hook";

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/paper/index.ts`


!!!ts
export * from "./paper.props";
export * from "./paper.tokens";

!!!

---

## popover.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/popover/popover.client.ts`


!!!ts
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

export const popover = {
  close: (id: string) => {
    const panel = document.getElementById(id) as HTMLElement & { hidePopover?: () => void } | null;
    panel?.hidePopover?.();
  },
};

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/section/index.ts`


!!!ts
// design/surfaces/components/section/index.ts
export { default as Section } from "./Section.astro";
export * from "./section.props";
export * from "./section.tokens";
export * from "./section.hook";

!!!

---

## sheet.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/sheet/sheet.client.ts`


!!!ts
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

!!!

---

## table.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/table.client.ts`


!!!ts
// design/data/table/table.client.ts

import { persistAndDispatch }  from "~/data/data.utils";

/**
 * Client-side selection and sort manager for <Table />.
 *
 * READING SELECTION STATE
 * ─────────────────────────────────────────────────────────────────
 * On a button click:
 *   const selected = JSON.parse(wrapper.dataset.selected ?? "[]");
 *
 * Reactively:
 *   wrapper.addEventListener("table:selectionchange", e => {
 *     const { selected, all, none } = e.detail;
 *   });
 *
 * FORM PARTICIPATION
 * ─────────────────────────────────────────────────────────────────
 * Row checkboxes render as <input name="selected" value="0" />.
 * Submit a form containing the table → POST body has selected=0&selected=2.
 */

// ── Selection ──────────────────────────────────────────────────

function getRowBoxes(table: HTMLTableElement): HTMLInputElement[] {
  return [
    ...table.querySelectorAll<HTMLInputElement>(
      "tbody [data-selection-cb] input",
    ),
  ];
}

function syncSelectAll(
  selectAll: HTMLInputElement,
  boxes:     HTMLInputElement[],
): void {
  const n = boxes.filter(cb => cb.checked).length;
  selectAll.checked       = boxes.length > 0 && n === boxes.length;
  selectAll.indeterminate = n > 0 && n < boxes.length;
}

function buildSelected(boxes: HTMLInputElement[]): number[] {
  return boxes
    .map((cb, i) => {
      if (!cb.checked) return -1;
      const row = cb.closest<HTMLTableRowElement>("tr");
      return row?.dataset.rowIndex !== undefined
        ? Number(row.dataset.rowIndex)
        : i;
    })
    .filter(i => i !== -1);
}

function initSelectableTable(table: HTMLTableElement): void {
  const wrapper   = table.closest<HTMLElement>("[data-selectable]");
  const selectAll = table.querySelector<HTMLInputElement>(
    "thead [data-selection-cb] input",
  );

  if (!wrapper || !selectAll) return;

  wrapper.dataset.selected = "[]";

  selectAll.addEventListener("change", () => {
    const boxes = getRowBoxes(table);
    boxes.forEach(cb => { cb.checked = selectAll.checked; });
    syncSelectAll(selectAll, boxes);
    persistAndDispatch(wrapper, buildSelected(boxes), boxes.length, "table:selectionchange");
  });

  table.querySelector("tbody")?.addEventListener("change", e => {
    const target = e.target;
    if (!(target instanceof HTMLInputElement)) return;
    if (!target.closest("[data-selection-cb]"))  return;

    const boxes = getRowBoxes(table);
    syncSelectAll(selectAll, boxes);
    persistAndDispatch(wrapper, buildSelected(boxes), boxes.length, "table:selectionchange");
  });
}

document
  .querySelectorAll<HTMLTableElement>("[data-selectable] .table")
  .forEach(initSelectableTable);

// ── Sort ────────────────────────────────────────────────────────

interface SortDetail {
  key:       string;
  direction: "asc" | "desc";
}

function initSortableTable(table: HTMLTableElement): void {
  const wrapper = table.closest<HTMLElement>(".data");
  if (!wrapper) return;

  table.addEventListener("click", e => {
    const btn = (e.target as Element).closest<HTMLButtonElement>(".table__sort-btn");
    if (!btn) return;

    const th = btn.closest<HTMLTableCellElement>("th[data-key]");
    if (!th) return;

    const key       = th.dataset.key!;
    const current   = th.getAttribute("aria-sort");
    const direction: "asc" | "desc" = current === "ascending" ? "desc" : "asc";

    table.querySelectorAll<HTMLElement>("th[data-key]").forEach(h => {
      h.setAttribute("aria-sort", "none");
    });
    th.setAttribute("aria-sort", direction === "asc" ? "ascending" : "descending");

    wrapper.dispatchEvent(
      new CustomEvent<SortDetail>("table:sortchange", {
        bubbles:    true,
        cancelable: false,
        detail: { key, direction },
      }),
    );
  });
}

document
  .querySelectorAll<HTMLTableElement>(".table--sortable")
  .forEach(initSortableTable);
!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/tile/index.ts`


!!!ts
export * from "./tile.props";
export * from "./tile.tokens";

!!!

---

## toast.client.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/toast/toast.client.ts`


!!!ts
// design/feedback/components/toast/toast.client.ts
//
// Programmatic toast API. Dynamically creates and manages toast elements in a
// fixed viewport region without requiring any SSR markup.
//
// Usage:
//   import { toast } from "@/design/feedback/components/toast/toast.client";
//   toast.success("Saved successfully");
//   toast.error("Something went wrong", { title: "Error" });
//   toast.show({ message: "Hello", color: "info", duration: 6000 });

import { resolveColorChannels }           from "~/shared/primitives.tokens";
import { TOAST_DEFAULTS, TOAST_SIZE_MAP } from "./toast.tokens";
import type { ToastColor, ToastVariant, ToastPosition } from "./toast.tokens";

export interface ToastOptions {
  message:      string;
  title?:       string;
  color?:       ToastColor;
  variant?:     ToastVariant;
  duration?:    number;
  dismissible?: boolean;
  position?:    ToastPosition;
}

// ── Region management ──────────────────────────────────────────────────────

function getOrCreateRegion(position: ToastPosition): HTMLElement {
  const sel = `[data-toast-region][data-position="${position}"]`;
  const existing = document.querySelector<HTMLElement>(sel);
  if (existing) return existing;

  const region = document.createElement("div");
  region.setAttribute("data-toast-region", "");
  region.setAttribute("data-position", position);
  region.setAttribute("aria-live", "polite");
  region.setAttribute("aria-relevant", "additions");
  region.setAttribute("aria-atomic", "false");
  document.body.appendChild(region);
  return region;
}

// ── Toast element builder ──────────────────────────────────────────────────

const X_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

function buildToastEl(opts: Required<Omit<ToastOptions, "position">>): HTMLElement {
  const { message, title, color, variant, dismissible } = opts;
  const sizeMap    = TOAST_SIZE_MAP[TOAST_DEFAULTS.size];
  const colorStyle = resolveColorChannels(color, "feedback");
  const isAlert    = color === "danger" || color === "warning";

  const el = document.createElement("div");
  el.className = [
    "feedback",
    "toast",
    `feedback--${variant}`,
    `feedback--${color}`,
    `feedback--${TOAST_DEFAULTS.size}`,
    dismissible ? "toast--dismissible" : "",
  ].filter(Boolean).join(" ");

  el.setAttribute("role", isAlert ? "alert" : "status");
  el.style.cssText = [
    `--toast--font-size:${sizeMap.fontSize}`,
    `--toast--padding:${sizeMap.p}`,
    ...colorStyle,
  ].join(";");

  const body = document.createElement("div");
  body.className = "toast__body";

  if (title) {
    const titleEl = document.createElement("div");
    titleEl.className = "toast__title";
    titleEl.textContent = title;
    body.appendChild(titleEl);
  }

  const msg = document.createElement("span");
  msg.textContent = message;
  body.appendChild(msg);
  el.appendChild(body);

  if (dismissible) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toast__dismiss";
    btn.setAttribute("aria-label", "Dismiss");
    btn.innerHTML = X_ICON;
    btn.addEventListener("click", () => dismissEl(el));
    el.appendChild(btn);
  }

  return el;
}

// ── Dismiss with exit animation ────────────────────────────────────────────

function dismissEl(el: HTMLElement): void {
  el.style.transition = "opacity 180ms ease, transform 180ms ease";
  el.style.opacity    = "0";
  el.style.transform  = "scale(0.95)";
  setTimeout(() => el.remove(), 180);
}

// ── Public show function ───────────────────────────────────────────────────

function show(opts: ToastOptions): () => void {
  const color       = opts.color       ?? TOAST_DEFAULTS.color;
  const variant     = opts.variant     ?? TOAST_DEFAULTS.variant;
  const duration    = opts.duration    ?? TOAST_DEFAULTS.duration;
  const dismissible = opts.dismissible ?? TOAST_DEFAULTS.dismissible;
  const position    = opts.position    ?? TOAST_DEFAULTS.position;

  const region = getOrCreateRegion(position);
  const el     = buildToastEl({ message: opts.message, title: opts.title ?? "", color, variant, duration, dismissible });

  region.appendChild(el);

  let timer: ReturnType<typeof setTimeout> | undefined;
  if (duration > 0) {
    timer = setTimeout(() => dismissEl(el), duration);
  }

  return () => {
    if (timer !== undefined) clearTimeout(timer);
    dismissEl(el);
  };
}

// ── Controller ─────────────────────────────────────────────────────────────

type ShorthandOpts = Omit<ToastOptions, "message" | "color">;

export const toast = {
  show,
  success: (message: string, opts?: ShorthandOpts) => show({ ...opts, message, color: "success" }),
  error:   (message: string, opts?: ShorthandOpts) => show({ ...opts, message, color: "danger" }),
  warning: (message: string, opts?: ShorthandOpts) => show({ ...opts, message, color: "warning" }),
  info:    (message: string, opts?: ShorthandOpts) => show({ ...opts, message, color: "info" }),
  neutral: (message: string, opts?: ShorthandOpts) => show({ ...opts, message, color: "neutral" }),
};

!!!

---

## PLANNING.md


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tree-view/PLANNING.md`


!!!
# TreeView Planning & Design Decisions

The `TreeView` component is a hierarchical list, commonly used for file explorers or nested navigation. Because of strict ARIA guidelines regarding keyboard navigation (Arrow keys to expand/collapse/traverse), it requires some upfront decisions.

Take your time thinking about these! When you're ready, just let me know which options you prefer.

---

---

## 1. Selection Model

What is the primary use case for this TreeView?

- **Option A: Navigation (Single-Select)**
  Acts like a standard file explorer. You click a folder to expand it, or click a file to navigate to a new page or select that specific item. Only one item is "active" at a time.
  
- **Option B: Checkboxes (Multi-Select)**
  Acts like a complex form input. Every item has a checkbox. If you check a "Parent" folder, it automatically checks all the children inside it. If you uncheck one child, the Parent goes into an "indeterminate" state (a little dash instead of a check).

---

## 2. Composition Pattern

How do you want developers to write the code for this component? *(Note: We can also support both, like we did with the `Menu` component!)*

- **Option A: Fully Data-Driven (Recursive)**
  You pass in a massive array of nested objects. The component recursively builds the entire tree for you.
  !!!astro
  <TreeView items={[{ id: 'docs', label: 'Docs', children: [{ id: 'readme', label: 'Readme.md' }] }]} />
  !!!
  *Pros:* Very fast to write.<br>
  *Cons:* Hard to customize individual nodes (e.g., if you want a specific button next to just one folder).

- **Option B: Slot-Driven Composition**
  You manually write out the nested structure using components.
  !!!astro
  <TreeView>
    <TreeItem label="Documents">
      <TreeItem label="Taxes.pdf" />
      <TreeItem label="Resumes" />
    </TreeItem>
  </TreeView>
  !!!
  *Pros:* Infinite flexibility. Easy to add custom icons or badges to specific items.<br>
  *Cons:* Takes more code to write out deeply nested structures.

---

## 3. Data Loading (Optional Consideration)

Do you need to support **Lazy Loading**? 
Meaning, when a user clicks the "+" to expand a folder, it makes a network request to fetch the children before rendering them. Or will all the data always be available upfront? 

*(Recommendation: Assume static/upfront data for Version 1, and add lazy loading later if needed).*

!!!

---

## index.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/well/index.ts`


!!!ts
// design/surfaces/components/well/index.ts
export { default as Well } from "./Well.astro";
export * from "./well.props";
export * from "./well.tokens";
export * from "./well.hook";

!!!

---

