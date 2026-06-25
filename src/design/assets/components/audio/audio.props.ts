// design/assets/audio/audio.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { AudioSize, AudioVariant, AudioLayout, AudioColor, AudioRadius } from "./audio.tokens";

export interface AudioProps extends BaseComponentProps {
  /** Audio source URL. */
  src: string;
  /** Accessible label for the player. */
  label?: string;
  /** Native preload hint. @default 'metadata' */
  preload?: "none" | "metadata" | "auto";
  /** Autoplay on load (requires muted on most browsers). */
  autoPlay?: boolean;
  /** Loop playback. */
  loop?: boolean;
  /** Start muted. */
  muted?: boolean;
  /** Initial volume 0–1. @default 1 */
  volume?: number;
  /** Initial playback rate. @default 1 */
  playbackRate?: number;
  /** Size preset. @default 'md' */
  size?: AudioSize;
  /** Visual chrome treatment. @default 'soft' */
  variant?: AudioVariant;
  /** Layout mode — controls row arrangement. @default 'default' */
  layout?: AudioLayout;
  /** Color role for play button and seek accent. @default 'primary' */
  color?: AudioColor;
  /** Border radius. */
  radius?: AudioRadius;

  /**
   * Time ranges (seconds) to silence with a censor beep.
   * e.g. [[4.5, 7.2], [12.0, 13.5]]
   */
  redactSegments?: [number, number][];

  /**
   * Apply a lo-fi telephone/intercom filter (low-pass + slight distortion).
   */
  intercomMode?: boolean;

  /**
   * When true, pitch stays constant as playback rate changes (native
   * HTMLMediaElement.preservesPitch, defaults to true in browsers — this
   * prop lets you explicitly set it to false for the "chipmunk" effect).
   * @default true
   */
  preservePitch?: boolean;
}
