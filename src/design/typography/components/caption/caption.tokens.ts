/**
 * @file Token spec, constants, and defaults for the Caption component.
 * @module design/typography/caption
 *
 * Caption is a typography component that re-exports the base typography spec
 * and adds its own behavioral and structural props. It does not add or
 * narrow any token dimensions, so it can delegate directly to `useTypography`.
 *
 * Its default size is set via CSS to use the fixed `--label--*` scale for
 * UI-like text rendering, but consumers can override this with the `size`
 * prop to use the fluid `--fs--*` scale if needed.
 *
 * @see {@link TYPOGRAPHY_TOKENS} in `typography/typography.tokens.ts`
 * @see {@link useCaption}        in `typography/caption/caption.hook.ts`
 * @see {@link CaptionProps}      in `typography/caption/caption.props.ts`
 */

import type { TextTag } from "../text/text.props";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export { TYPOGRAPHY_TOKENS as CAPTION_TOKENS } from "../../typography.tokens";

// ─── DERIVED TYPES ────────────────────────────────────────────────────────────

export type {
  TypeAlign as CaptionAlign,
  TypeColor as CaptionColor,
  TypeFamily as CaptionFamily,
  TypeLeading as CaptionLeading,
  TypeSize as CaptionSize,
  TypeTracking as CaptionTracking,
  TypeTransform as CaptionTransform,
  TypeWeight as CaptionWeight,
  TypeWrap as CaptionWrap,
} from "../../typography.tokens";

export type CaptionTag = TextTag | "figcaption";

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const CAPTION_DEFAULTS = {
  as: "figcaption" as CaptionTag,
  overlay: false,
  rule: false,
} as const;