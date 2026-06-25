// design/assets/audio/audio.hook.ts

import type { AudioProps } from "./audio.props";
import { AUDIO_TOKENS, AUDIO_DEFAULTS } from "./audio.tokens";
import { resolveTokens } from "~/shared/tokens";
import { resolveColorChannels } from "~/shared/primitives.tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useAudio(props: AudioProps) {
  const {
    src,
    label,
    preload        = AUDIO_DEFAULTS.preload,
    autoPlay,
    loop,
    muted,
    volume         = 1,
    playbackRate   = 1,
    size           = AUDIO_DEFAULTS.size,
    variant        = AUDIO_DEFAULTS.variant,
    layout         = AUDIO_DEFAULTS.layout,
    color          = AUDIO_DEFAULTS.color,
    radius,
    redactSegments,
    intercomMode,
    preservePitch  = true,
    class: className,
    v:     _v,
    m,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    AUDIO_TOKENS,
    { size, variant, layout, color, radius },
    "audio",
  );

  const colorStyle = resolveColorChannels(color, "audio");

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "audio",
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle, ...colorStyle],
    },
    base,
  );

  return {
    containerProps: {
      class: cls,
      style,
      ...attrs,
      ...rest,
      role:       "group" as const,
      "aria-label": label ?? "Audio player",
      // data- attrs carry config to the client script
      "data-src":             src,
      "data-volume":          String(volume),
      "data-playback-rate":   String(playbackRate),
      "data-preserve-pitch":  String(preservePitch),
      "data-intercom":        intercomMode ? "true" : undefined,
      "data-redact":          redactSegments?.length
                                ? JSON.stringify(redactSegments)
                                : undefined,
    },
    audioProps: {
      src,
      preload,
      autoplay: autoPlay || undefined,
      loop:     loop     || undefined,
      muted:    muted    || undefined,
    },
  };
}
