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
