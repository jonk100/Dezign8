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
