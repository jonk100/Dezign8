# Aggregated TOKENS Files

## alert-dialog.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.tokens.ts`


!!!ts
export { OVERLAY_TOKENS } from "../../overlays.tokens";
export type { OverlaySize, OverlayVariant, OverlayRadius } from "../../overlays.tokens";

export const ALERT_DIALOG_DEFAULTS = {
  size:      "sm"       as const,
  variant:   "centered" as const,
  // AlertDialog requires an explicit button choice — no backdrop dismiss, no Esc by default
  closeOnEsc: false,
} as const;

!!!

---

## alert.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/alert.tokens.ts`


!!!ts
// design/feedback/components/alert/alert.tokens.ts

import { FEEDBACK_TOKENS }                                     from "../../feedback.tokens";
import { SPACE }                                               from "~/shared/primitives.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant,
              FeedbackSize }                                   from "../../feedback.tokens";

export { FEEDBACK_TOKENS as ALERT_TOKENS };
export type { FeedbackColor as AlertColor, FeedbackVariant as AlertVariant,
              FeedbackRadius as AlertRadius, FeedbackSize as AlertSize };

export const ALERT_DEFAULTS = {
  variant: "soft"    as FeedbackVariant,
  color:   "neutral" as FeedbackColor,
  radius:  "md"      as FeedbackRadius,
  size:    "md"      as FeedbackSize,
} as const;

const {
  "2xs": xxs,
  "2xl": xxl,
} = SPACE;

xxs === SPACE["2xs"];
xxl === SPACE["2xl"];

export const ALERT_SIZE_MAP: Record<FeedbackSize, { fontSize: string; p: string; gap: string }> = {
  "2xs": { fontSize: "var(--fsf--xs)",  p: xxs, gap: SPACE["2xs"] },
  xs: { fontSize: "var(--fs--2xs)", p: SPACE.xs, gap: SPACE.xs },
  sm: { fontSize: "var(--fs--xs)",  p: SPACE.sm, gap: SPACE.xs },
  md: { fontSize: "var(--fs--sm)",  p: SPACE.md, gap: SPACE.sm },
  lg: { fontSize: "var(--fs--md)",  p: SPACE.md, gap: SPACE.sm },
  xl: { fontSize: "var(--fs--lg)",  p: SPACE.md, gap: SPACE.md },
  "2xl": { fontSize: "var(--fs--xl)", p: xxl, gap: SPACE.md },
};


!!!

---

## audio.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.tokens.ts`


!!!ts
// design/assets/audio/audio.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM, SPACE, COLOR_DIM } from "~/shared/primitives.tokens";

const AUDIO_SIZE = scale({
  sm: null,
  md: null,
  lg: null,
});

// Visual chrome treatment — mirrors trigger/feedback variant vocabulary.
// solid    → filled bg at color-base, on-color text
// soft     → subtle tinted bg, color-border border (default)
// outlined → transparent bg, visible border
// ghost    → no border, no bg — bare controls only
const AUDIO_VARIANT = scale({
  solid:    null,
  soft:     null,
  outlined: null,
  ghost:    null,
});

// Layout mode — controls arrangement, not color.
// default → stacked rows (controls / seek / secondary)
// minimal → hide volume + rate row
// compact → single-row layout
const AUDIO_LAYOUT = scale({
  default: null,
  minimal: null,
  compact: null,
});

export const AUDIO_TOKENS = defineTokens({
  radius:  RADIUS_DIM,
  padding: dimension("padding", SPACE),
  size:    dimension("size",    AUDIO_SIZE,    { modifier: true }),
  variant: dimension("variant", AUDIO_VARIANT, { modifier: true }),
  layout:  dimension("layout",  AUDIO_LAYOUT,  { modifier: true }),
  color:   COLOR_DIM,
});

export type AudioSize    = keyof typeof AUDIO_TOKENS.size.values;
export type AudioVariant = keyof typeof AUDIO_TOKENS.variant.values;
export type AudioLayout  = keyof typeof AUDIO_TOKENS.layout.values;
export type AudioColor   = keyof typeof AUDIO_TOKENS.color.values;
export type AudioRadius  = keyof typeof AUDIO_TOKENS.radius.values;

export const AUDIO_DEFAULTS = {
  size:    "md"      as AudioSize,
  variant: "soft"    as AudioVariant,
  layout:  "default" as AudioLayout,
  color:   "primary" as AudioColor,
  preload: "metadata" as const,
} as const;

!!!

---

## avatar-group.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/avatar-group.tokens.ts`


!!!ts

!!!

---

## avatar.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/avatar.tokens.ts`


!!!ts
// design/assets/components/avatar/avatar.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * Avatar token spec.
 *
 * prop       channel                CSS property
 * ─────────────────────────────────────────────────────────────────
 * size     → --avatar--size        width + height
 * radius   → --avatar--radius      border-radius
 * status   → (modifier class only) [data-status] drives dot color
 */

const AVATAR_SIZE = scale({
  "2xs": "var(--avatar--size-2xs, 1.25rem)",
  xs:    "var(--avatar--size-xs,  1.5rem)",
  sm:    "var(--avatar--size-sm,  2rem)",
  md:    "var(--avatar--size-md,  2.5rem)",
  lg:    "var(--avatar--size-lg,  3rem)",
  xl:    "var(--avatar--size-xl,  3.75rem)",
  "2xl": "var(--avatar--size-2xl, 5rem)",
});

const AVATAR_STATUS = scale({
  online:  null,
  offline: null,
  away:    null,
  busy:    null,
});

export const AVATAR_TOKENS = defineTokens({
  size:   dimension("size",   AVATAR_SIZE),
  radius: RADIUS_DIM,
  status: dimension("status", AVATAR_STATUS, { modifier: true }),
});

export type AvatarSize   = keyof typeof AVATAR_TOKENS.size.values;
export type AvatarRadius = keyof typeof AVATAR_TOKENS.radius.values;
export type AvatarStatus = keyof typeof AVATAR_TOKENS.status.values;

export const AVATAR_DEFAULTS = {
  size:   "md"    as AvatarSize,
  radius: "full"  as AvatarRadius,
} as const;

!!!

---

## backdrop.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/backdrop.tokens.ts`


!!!ts

!!!

---

## badge.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/badge.tokens.ts`


!!!ts
// design/feedback/badge/badge.tokens.ts

/**
 * @file Token spec and defaults for the Badge component.
 * @module design/feedback/badge
 *
 * Badge re-uses the full {@link FEEDBACK_TOKENS} spec unchanged.
 * Defaults are opinionated for the most common use case: a small solid
 * danger notification count overlaid on another element.
 *
 * Component-specific size mapping (see badge.css):
 *   xs  → 14px diameter (dot mode), 10px font, minimal padding
 *   sm  → 18px min-height, 11px font          ← default
 *   md  → 22px min-height, 12px font
 *   lg  → 26px min-height, 14px font
 *   xl  → 32px min-height, 16px font
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useBadge}        in `feedback/badge/badge.hook.ts`
 */

export { FEEDBACK_TOKENS as BADGE_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as BadgeSize,
  FeedbackVariant as BadgeVariant,
  FeedbackColor   as BadgeColor,
  FeedbackRadius  as BadgeRadius,
} from "../../feedback.tokens";

/**
 * Opinionated defaults for the Badge component.
 *
 * These are applied in {@link useBadge} when props are omitted, overriding
 * the category-level defaults from {@link useFeedback}.
 */
export const BADGE_DEFAULTS = {
  variant: "solid",
  color:   "danger",   // most common: notification count
  size:    "sm",
  radius:  "full",     // pill shape
  max:     99,
  dot:     false,
} as const;

!!!

---

## banner.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/banner.tokens.ts`


!!!ts
// design/feedback/components/banner/banner.tokens.ts

import { FEEDBACK_TOKENS } from "../../feedback.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant } from "../../feedback.tokens";

export { FEEDBACK_TOKENS as BANNER_TOKENS };
export type { FeedbackColor as BannerColor, FeedbackVariant as BannerVariant, FeedbackRadius as BannerRadius };

export const BANNER_DEFAULTS = {
  variant: "soft"    as FeedbackVariant,
  color:   "neutral" as FeedbackColor,
  radius:  "none"    as FeedbackRadius,
} as const;

!!!

---

## box.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/box.tokens.ts`


!!!ts
// design/layout/box/box.tokens.ts

/**
 * Box Token Spec
 *
 * Box re-exports the full layout spec.
 * Box adds radius — a dimension the layout category doesn't have —
 * since Box is specifically a visual container, not just a flow primitive.
 */

import { composeTokens } from "~sh/tokens";
import { LAYOUT_TOKENS } from "~l/layout.tokens";
import { RADIUS_DIM } from "~sh/primitives.tokens";

/**
 * Merges general Layout tokens (gap, align, justify) with Box-specific
 * visual dimensions like border radius.
 */
export const BOX_TOKENS = composeTokens(LAYOUT_TOKENS, {
  radius: RADIUS_DIM,
});

export type { LayoutGap as BoxGap, LayoutAlign as BoxAlign, LayoutJustify as BoxJustify }
  from "~l/layout.tokens";

/** Valid values for border radius. */
export type BoxRadius = keyof typeof BOX_TOKENS.radius.values;

/** Supported HTML tags for the Box component polymorphism. */
export type BoxTag =
  | "div" | "section" | "article" | "aside"
  | "main" | "nav" | "header" | "footer"
  | "ul" | "ol" | "figure" | "form" | "span";

export const BOX_DEFAULTS = {
  as: "div" as BoxTag,
} as const;
!!!

---

## breadcrumbs.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/breadcrumbs.tokens.ts`


!!!ts
export { NAV_TOKENS as BREADCRUMBS_TOKENS } from "../../nav.tokens";

!!!

---

## button-group.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/button-group.tokens.ts`


!!!ts

!!!

---

## button.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/button.tokens.ts`


!!!ts
// design/triggers/button/button.tokens.ts

export { TRIGGER_TOKENS as BUTTON_TOKENS } from "../../trigger.tokens";
export type { TriggerVariant as ButtonVariant, TriggerColor as ButtonColor, TriggerRadius as ButtonRadius }
  from "../../trigger.tokens";

/* ─── SIZE MAP ───────────────────────────────────────────── */
// p  = padding-block
// pi = padding-inline
// fs = font-size
// h  = min-height

export const BUTTON_SIZE_MAP = {
  "2xs": { p: "var(--space-in--3xs)", pi: "var(--space-in--2xs)",  fs: "var(--fs--3xs)", h: "var(--ui-height--2xs)" },
  xs: { p: "var(--space-in--2xs)", pi: "var(--space-in--xs)",  fs: "var(--fs--2xs)", h: "var(--ui-height--xs)" },
  sm: { p: "var(--space-in--xs)",  pi: "var(--space-in--sm)",  fs: "var(--fs--xs)", h:  "var(--ui-height--sm)" },
  md: { p: "var(--space-in--md)",  pi: "var(--space-in--md)",  fs: "var(--fs--sm)", h:  "var(--ui-height--md)" },
  lg: { p: "var(--space-in--md)",  pi: "var(--space-in--lg)",  fs: "var(--fs--md)", h: "var(--ui-height--lg)" },
  xl: { p: "var(--space-in--lg)",  pi: "var(--space-in--xl)",  fs: "var(--fs--lg)", h: "var(--ui-height--xl)" },
  "2xl": { p: "var(--space-in--lg)",  pi: "var(--space-in--2xl)",  fs: "var(--fs--xl)", h: "var(--ui-height--2xl)" },
  
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_MAP;

export function resolveButtonSize(size: ButtonSize): string[] {
  const { p, pi, fs, h } = BUTTON_SIZE_MAP[size];
  return [
    `--button--p: ${p}`,
    `--button--pi: ${pi}`,
    `--button--fs: ${fs}`,
    `--button--h: ${h}`,
  ];
}

if (process.env.NODE_ENV === "development") {
  const assert = (cond: boolean, msg: string) => { if (!cond) throw new Error(`resolveButtonSize: ${msg}`); };
  const _md = resolveButtonSize("md");
  assert(_md.length === 4, "4 channels per size");
  assert(_md.every(s => s.startsWith("--button--")), "all channels are button-scoped");
  const _keys = ["p", "pi", "fs", "h"] as const;
  assert(_keys.every((k, i) => (_md[i] ?? "").startsWith(`--button--${k}:`)), "channels in order: p, pi, fs, h");
}

/* ─── CONSTANTS ──────────────────────────────────────────── */

export const BUTTON_TYPES   = ["button", "submit", "reset"] as const;
export const BUTTON_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;

export type ButtonType   = typeof BUTTON_TYPES[number];
export type ButtonTarget = typeof BUTTON_TARGETS[number];

/* ─── DEFAULTS ───────────────────────────────────────────── */

export const BUTTON_DEFAULTS = {
  size:      "md"      as ButtonSize,
  type:      "button"  as ButtonType,
  iconOnly:  false,
  fullWidth: false,
} as const;
!!!

---

## caption.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/caption.tokens.ts`


!!!ts
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
!!!

---

## card.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/card.tokens.ts`


!!!ts
// design/surfaces/components/card/card.tokens.ts

/**
 * Card re-exports the full surface spec unchanged.
 * Card's unique features (href, interactive, selectable, selected, disabled)
 * are behavioral props — not token dimensions — so no composeTokens needed.
 */
export { SURFACE_TOKENS as CARD_TOKENS } from "../../surface.tokens";
export type {
  SurfaceLayer   as CardLayer,
  SurfacePadding as CardPadding,
  SurfaceRadius  as CardRadius,
  ColorRole      as CardColor,
} from "../../surface.tokens";

import type { CardTag } from "./card.props";
import type { SurfaceLayer } from "../../surface.tokens";

export const CARD_DEFAULTS = {
  as:          "div"  as CardTag,
  layer:       "2"    as SurfaceLayer,  // card tier
  outlined:    true,                    // cards default to outlined; layer-3 border + explicit override
  padding:     "md"   as const,
  radius:      "md"   as const,
  interactive: false,
  selectable:  false,
  selected:    false,
  disabled:    false,
} as const;

!!!

---

## carousel.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/carousel.tokens.ts`


!!!ts

!!!

---

## center.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/center.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const CENTER_TOKENS = composeTokens(LAYOUT_TOKENS, {});
export type CenterDirection = "x" | "y" | "both";

export const CENTER_DEFAULTS = {
  direction: "both" as CenterDirection,
} as const;

!!!

---

## checkbox.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/checkbox.tokens.ts`


!!!ts
// design/forms/checkbox/checkbox.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Checkbox component.
 * @module design/forms/checkbox
 *
 * Checkbox introduces no new token dimensions and follows the re-export pattern.
 *
 * @remarks
 * **Three-state check model via {@link CheckState}:**
 * Rather than separate `checked: boolean` and `indeterminate: boolean` props
 * (which can conflict when both are `true`), Checkbox uses a single
 * `checkState` prop typed as `"checked" | "unchecked" | "indeterminate"`.
 * This makes the three states mutually exclusive by type and maps cleanly
 * to the select-all checkbox pattern:
 *
 * !!!ts
 * const state: CheckState =
 *   allSelected  ? "checked"       :
 *   noneSelected ? "unchecked"     :
 *                  "indeterminate";
 * !!!
 *
 * `undefined` and `"unchecked"` are treated identically in {@link useCheckbox}.
 *
 * **Default variant is `"ghost"`** — traditional checkbox appearance with no
 * border/background on the wrapper. Pass `variant="outlined"` or `variant="soft"`
 * for a bordered/filled "selectable chip" style.
 *
 * **`labelPosition` is not a token dimension** — it emits a class modifier
 * directly in {@link useCheckbox}.
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts`
 * @see {@link CheckboxProps}  in `forms/checkbox/checkbox.props.ts`
 * @see {@link useCheckbox}    in `forms/checkbox/checkbox.hook.ts`
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export { FORM_TOKENS as CHECKBOX_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type CheckboxSize    = FormSize;
/** @see {@link FormVariant} */
export type CheckboxVariant = FormVariant;
/** @see {@link FormColor} */
export type CheckboxColor   = FormColor;
/** @see {@link FormRadius} */
export type CheckboxRadius  = FormRadius;

// ─── CHECK STATE ──────────────────────────────────────────────────────────────

/**
 * The three mutually exclusive visual states of a checkbox.
 *
 * Replaces the separate `checked: boolean` and `indeterminate: boolean` props
 * that could otherwise conflict when both are `true`.
 *
 * | Value             | Native mapping                                        |
 * |-------------------|-------------------------------------------------------|
 * | `"checked"`       | `checked` attribute present on `<input>`              |
 * | `"unchecked"`     | `checked` attribute absent (default)                  |
 * | `"indeterminate"` | `checked` absent + `.indeterminate = true` via script |
 *
 * `undefined` is treated identically to `"unchecked"` in {@link useCheckbox}.
 *
 * @example
 * !!!ts
 * // Driven by a select-all parent:
 * const checkState: CheckState =
 *   selected.length === options.length ? "checked"       :
 *   selected.length === 0             ? "unchecked"     :
 *                                       "indeterminate";
 *
 * <Checkbox name="all" checkState={checkState}>Select all</Checkbox>
 * !!!
 */
export const CHECK_STATES = ["checked", "unchecked", "indeterminate"] as const;

/** Valid values for the `checkState` prop. */
export type CheckState = typeof CHECK_STATES[number];

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

/**
 * Valid positions for the label slot relative to the indicator.
 * CSS reorders visually via flex-direction — DOM order never changes.
 */
export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;

/** Valid values for the `labelPosition` prop. */
export type LabelPosition = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Checkbox component.
 *
 * `variant` is not declared here — its default (`"ghost"`) is applied
 * inline in {@link useCheckbox} before delegating to {@link useForm}.
 *
 * @see {@link useCheckbox}
 */
export const CHECKBOX_DEFAULTS = {
  checkState:    "unchecked" as CheckState,
  labelPosition: "end"       as LabelPosition,
} as const;
!!!

---

## chip.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/chip.tokens.ts`


!!!ts
// design/feedback/components/chip/chip.tokens.ts

export { FEEDBACK_TOKENS as CHIP_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as ChipSize,
  FeedbackVariant as ChipVariant,
  FeedbackColor   as ChipColor,
  FeedbackRadius  as ChipRadius,
} from "../../feedback.tokens";

export const CHIP_DEFAULTS = {
  variant: "outlined",
  color:   "neutral",
  size:    "md",
  radius:  "full",
} as const;

!!!

---

## code.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/code.tokens.ts`


!!!ts
// design/typography/components/code/code.tokens.ts
import type { TypeSize, TypeFamily } from "../../typography.tokens";

export const CODE_DEFAULTS = {
  fam: "mono" as TypeFamily,
} as const;

export const PRE_DEFAULTS = {
  fam: "mono" as TypeFamily,
  size: "sm" as TypeSize,
} as const;

!!!

---

## color-picker.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/color-picker.tokens.ts`


!!!ts

!!!

---

## columns.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/columns.tokens.ts`


!!!ts

!!!

---

## combobox.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/combobox.tokens.ts`


!!!ts
// design/forms/combobox/combobox.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Combobox component.
 * @module design/forms/combobox
 *
 * Combobox introduces no new token dimensions and re-exports {@link FORM_TOKENS}.
 *
 * @remarks
 * **Combobox vs Select:**
 * Select renders a native `<select>` element — the OS/browser controls the
 * dropdown appearance. Combobox renders a text `<input>` + a custom
 * `<ul role="listbox">` dropdown, giving full CSS control over the option
 * list. The trade-off: Combobox requires a client-side JS controller for
 * filtering, keyboard navigation, and selection.
 *
 * **Two-input pattern:**
 * Combobox renders two `<input>` elements:
 * 1. `<input type="text">` (visible) — for display and filtering
 * 2. `<input type="hidden">` — submits the selected option's `value` to the form
 *
 * This separation means the displayed label (e.g. "United States") and the
 * submitted value (e.g. `"us"`) can differ, which is the standard combobox
 * behaviour.
 *
 * **Single-select only:**
 * Multi-select (tag/chip input) is a distinct component with significantly
 * different UX and DOM structure. Combobox is single-select.
 *
 * @see {@link FORM_TOKENS}      in `forms/forms.tokens.ts`
 * @see {@link ComboboxProps}    in `forms/combobox/combobox.props.ts`
 * @see {@link useCombobox}      in `forms/combobox/combobox.hook.ts`
 * @see {@link ComboboxOption}   in `forms/combobox/combobox.props.ts` — shared option type
 *
 * @todo Multi-select (tag input) when needed. New component, new folder —
 *   this file stays unchanged.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Combobox token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as COMBOBOX_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type ComboboxSize    = FormSize;
/** @see {@link FormVariant} */
export type ComboboxVariant = FormVariant;
/** @see {@link FormColor} */
export type ComboboxColor   = FormColor;
/** @see {@link FormRadius} */
export type ComboboxRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Combobox component.
 *
 * @see {@link useCombobox} in `forms/combobox/combobox.hook.ts`
 */
export const COMBOBOX_DEFAULTS = {
  /** Combobox typically fills its container. */
  fullWidth: true,
} as const;

!!!

---

## command-palette.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/command-palette.tokens.ts`


!!!ts

!!!

---

## container.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/container.tokens.ts`


!!!ts
import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const CONTAINER_SIZE = scale({
  sm: "var(--container--sm)",
  md: "var(--container--md)",
  lg: "var(--container--lg)",
  xl: "var(--container--xl)",
  "2xl": "var(--container--2xl)",
  full: "var(--container--full)",
});

export const CONTAINER_TOKENS = composeTokens(LAYOUT_TOKENS, {
  maxWidth: dimension("max-width", CONTAINER_SIZE),
});
export type ContainerMaxWidth = keyof typeof CONTAINER_TOKENS.maxWidth.values;

export type ContainerTag = "div" | "section" | "article" | "aside" | "main" | "header" | "footer";

export const CONTAINER_DEFAULTS = {
  as: "div" as ContainerTag,
  maxWidth: "lg" as ContainerMaxWidth,
} as const;

!!!

---

## context-menu.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/context-menu.tokens.ts`


!!!ts

!!!

---

## cropper.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/cropper.tokens.ts`


!!!ts

!!!

---

## date-picker.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/date-picker/date-picker.tokens.ts`


!!!ts

!!!

---

## dot.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/dot/dot.tokens.ts`


!!!ts
// design/feedback/components/dot/dot.tokens.ts
export { FEEDBACK_TOKENS as DOT_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as DotSize,
  FeedbackVariant as DotVariant,
  FeedbackColor   as DotColor,
  FeedbackRadius  as DotRadius,
} from "../../feedback.tokens";

export const DOT_DEFAULTS = {
  variant: "solid" as const,
  color:   "neutral" as const,
  size:    "md" as const,
  radius:  "full" as const,
} as const;

!!!

---

## drawer.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.tokens.ts`


!!!ts
import { defineTokens, scale, dimension } from "~/shared/tokens";

const DRAWER_PLACEMENT = scale({
  start:  null,
  end:    null,
  top:    null,
  bottom: null,
});

const DRAWER_SIZE = scale({
  sm:   null,
  md:   null,
  lg:   null,
  full: null,
});

export const DRAWER_TOKENS = defineTokens({
  placement: dimension("placement", DRAWER_PLACEMENT, { modifier: "placement" }),
  size:      dimension("size",      DRAWER_SIZE,      { modifier: "size" }),
});

export const DRAWER_DEFAULTS = {
  placement:       "end",
  size:            "md",
  closeOnBackdrop: true,
  closeOnEsc:      true,
} as const;

export type DrawerPlacement = keyof typeof DRAWER_TOKENS.placement.values;
export type DrawerSize      = keyof typeof DRAWER_TOKENS.size.values;

!!!

---

## dropdown-menu.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.tokens.ts`


!!!ts
export const DROPDOWN_MENU_DEFAULTS = {
  size: "md" as const,
  variant: "default" as const,
  radius: "md" as const,
};

!!!

---

## empty-state.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/empty-state/empty-state.tokens.ts`


!!!ts
export const EMPTY_STATE_DEFAULTS = {
  size: "md",
  variant: "soft",
  color: "neutral",
  radius: "md",
} as const;

!!!

---

## feed.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/feed/feed.tokens.ts`


!!!ts
import { composeTokens, dimension, scale } from "~/shared/tokens";
import { DATA_TOKENS } from "~/data/data.tokens";

export const FEED_DEFAULTS = {
  orientation: "vertical" as "vertical" | "horizontal",
} as const;

export const FEED_TOKENS = composeTokens(DATA_TOKENS, {
  orientation: dimension("orientation", scale({ vertical: null, horizontal: null }), { modifier: true }),
});

!!!

---

## field.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/field/field.tokens.ts`


!!!ts
// design/forms/field/field.tokens.ts

/**
 * @file Token spec and defaults for the Field component.
 * @module design/forms/field
 *
 * Field introduces no token dimensions of its own. It is a structural
 * wrapper — its job is spatial layout (stacking label, control, hint,
 * error, success) and accessibility id wiring, not visual styling.
 *
 * This file re-exports {@link FORM_TOKENS} to maintain a consistent
 * import path across the component quadruplet (tokens → props → hook → astro).
 * If Field ever needs a dimension (e.g. a `gap` prop to control spacing
 * between label and control), this file is the only change point.
 *
 * @remarks
 * **What Field is NOT:**
 * Field is not a form control. It does not extend {@link FormProps} because
 * it never renders an `<input>`, `<select>`, or `<textarea>`. Its `invalid`
 * and `required` props are state-communication props (they add `data-*`
 * attributes that CSS and the Astro template respond to) rather than
 * ARIA props that belong on a native form element.
 *
 * **Accessibility wiring:**
 * Field accepts an `id` prop and uses it to generate stable IDs for its
 * hint and error wrapper elements (`{id}-hint`, `{id}-error`). The consumer
 * is responsible for passing the same `id` to the control inside the default
 * slot and setting `aria-describedby="{id}-hint {id}-error"` on it.
 * Field cannot wire this automatically because Astro slots do not support
 * passing runtime values into slotted content at render time.
 *
 * @see {@link FieldProps}  in `forms/field/field.props.ts`  — prop surface
 * @see {@link useField}    in `forms/field/field.hook.ts`   — runtime logic
 * @see `forms/field/Field.astro`                             — slot structure
 *
 * @todo If a `gap` prop is needed to control spacing between field sections,
 *   add `gap: GAP` to a `composeTokens(FORM_TOKENS, { gap: GAP })` here
 *   and update {@link useField} to resolve it.
 */

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Field token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as FIELD_TOKENS } from "~f/forms.tokens";
!!!

---

## file-preview.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/file-preview/file-preview.tokens.ts`


!!!ts
// design/assets/components/file-preview/file-preview.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * FilePreview token spec.
 *
 * prop      channel                    CSS property
 * ─────────────────────────────────────────────────────────────────
 * size    → --file-preview--size       controls icon + card width
 * radius  → --file-preview--radius     border-radius
 * layout  → (modifier class only)      card vs strip
 */

const FILE_PREVIEW_SIZE = scale({
  xs: "var(--file-preview--size-xs, 4rem)",
  sm: "var(--file-preview--size-sm, 5rem)",
  md: "var(--file-preview--size-md, 7rem)",
  lg: "var(--file-preview--size-lg, 9rem)",
  xl: "var(--file-preview--size-xl, 12rem)",
});

const FILE_PREVIEW_LAYOUT = scale({
  card:  null,
  strip: null,
});

export const FILE_PREVIEW_TOKENS = defineTokens({
  size:   dimension("size",   FILE_PREVIEW_SIZE),
  radius: RADIUS_DIM,
  layout: dimension("layout", FILE_PREVIEW_LAYOUT, { modifier: true }),
});

export type FilePreviewSize   = keyof typeof FILE_PREVIEW_TOKENS.size.values;
export type FilePreviewRadius = keyof typeof FILE_PREVIEW_TOKENS.radius.values;
export type FilePreviewLayout = keyof typeof FILE_PREVIEW_TOKENS.layout.values;

export const FILE_PREVIEW_DEFAULTS = {
  size:   "md"   as FilePreviewSize,
  radius: "md"   as FilePreviewRadius,
  layout: "card" as FilePreviewLayout,
} as const;

/** Maps common extensions to a human-readable category label and accent color class. */
export const FILE_TYPE_MAP: Record<string, { label: string; color: string }> = {
  // Images
  jpg:  { label: "JPG",  color: "file-preview--type-image" },
  jpeg: { label: "JPEG", color: "file-preview--type-image" },
  png:  { label: "PNG",  color: "file-preview--type-image" },
  gif:  { label: "GIF",  color: "file-preview--type-image" },
  webp: { label: "WEBP", color: "file-preview--type-image" },
  svg:  { label: "SVG",  color: "file-preview--type-image" },
  avif: { label: "AVIF", color: "file-preview--type-image" },
  // Documents
  pdf:  { label: "PDF",  color: "file-preview--type-doc" },
  doc:  { label: "DOC",  color: "file-preview--type-doc" },
  docx: { label: "DOCX", color: "file-preview--type-doc" },
  txt:  { label: "TXT",  color: "file-preview--type-doc" },
  md:   { label: "MD",   color: "file-preview--type-doc" },
  // Spreadsheets
  xls:  { label: "XLS",  color: "file-preview--type-sheet" },
  xlsx: { label: "XLSX", color: "file-preview--type-sheet" },
  csv:  { label: "CSV",  color: "file-preview--type-sheet" },
  // Code
  js:   { label: "JS",   color: "file-preview--type-code" },
  ts:   { label: "TS",   color: "file-preview--type-code" },
  jsx:  { label: "JSX",  color: "file-preview--type-code" },
  tsx:  { label: "TSX",  color: "file-preview--type-code" },
  html: { label: "HTML", color: "file-preview--type-code" },
  css:  { label: "CSS",  color: "file-preview--type-code" },
  json: { label: "JSON", color: "file-preview--type-code" },
  // Audio / Video
  mp3:  { label: "MP3",  color: "file-preview--type-media" },
  wav:  { label: "WAV",  color: "file-preview--type-media" },
  mp4:  { label: "MP4",  color: "file-preview--type-media" },
  mov:  { label: "MOV",  color: "file-preview--type-media" },
  // Archives
  zip:  { label: "ZIP",  color: "file-preview--type-archive" },
  gz:   { label: "GZ",   color: "file-preview--type-archive" },
  tar:  { label: "TAR",  color: "file-preview--type-archive" },
};

!!!

---

## file-upload.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/file-upload/file-upload.tokens.ts`


!!!ts

!!!

---

## flex.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/flex.tokens.ts`


!!!ts
import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const FLEX_DIRECTION = scale({
  row: "row",
  col: "column",
  "row-rev": "row-reverse",
  "col-rev": "column-reverse",
});

export const FLEX_WRAP = scale({
  nowrap: "nowrap",
  wrap: "wrap",
  "wrap-rev": "wrap-reverse",
});

export const FLEX_TOKENS = composeTokens(LAYOUT_TOKENS, {
  direction: dimension("direction", FLEX_DIRECTION),
  wrap: dimension("wrap", FLEX_WRAP),
});
export type FlexDirection = keyof typeof FLEX_TOKENS.direction.values;
export type FlexWrap = keyof typeof FLEX_TOKENS.wrap.values;

export type FlexTag = "div" | "ul" | "ol" | "nav" | "header" | "footer" | "section" | "article" | "aside" | "main" | "form";

export const FLEX_DEFAULTS = {
  as: "div" as FlexTag,
  direction: "row" as FlexDirection,
  wrap: "nowrap" as FlexWrap,
} as const;

!!!

---

## footer.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/footer/footer.tokens.ts`


!!!ts
// design/layout/components/footer/footer.tokens.ts

/**
 * Footer Token Spec
 *
 * Footer re-exports the full layout spec unchanged. Like Header, it introduces
 * no new token dimensions — its opinionated defaults are expressed as default
 * values in FOOTER_DEFAULTS (applied by the hook) and CSS fallbacks in
 * footer.css (for purely visual concerns like background and border).
 *
 * The footer is intentionally minimal: it is a semantic landmark and a visual
 * container, nothing more. Any richer layout (multi-column link grids, etc.)
 * is composed with Box children inside the footer's slots, not via footer props.
 */

import { LAYOUT_TOKENS } from "~l/layout.tokens";
import type { Space } from "~sh/primitives.tokens";

export { LAYOUT_TOKENS as FOOTER_TOKENS };

export type {
  LayoutGap     as FooterGap,
  LayoutAlign   as FooterAlign,
  LayoutJustify as FooterJustify,
} from "~l/layout.tokens";

/**
 * Opinionated prop defaults applied by `useFooter` when the consumer omits a
 * value. All are overridable by passing the prop explicitly.
 *
 * @property px      - Horizontal padding. Matches HEADER_DEFAULTS.px so that
 *                     footer and header content align on the same column edge.
 * @property align   - Cross-axis alignment. Centers children vertically in the
 *                     row (relevant when footer is used as a single-row bar).
 * @property justify - Main-axis alignment. `between` mirrors the header default,
 *                     appropriate for copyright-left / links-right layouts.
 */
export const FOOTER_DEFAULTS = {
  px:      "lg"      as Space,
  align:   "center"  as const,
  justify: "between" as const,
} as const;

!!!

---

## frame.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.tokens.ts`


!!!ts
// design/surfaces/components/frame/frame.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const FRAME_DEFAULTS = {
  layer:   "0"    as SurfaceLayer, // default to no lift, just bounds
  padding: "none" as SurfacePadding, // default to no padding to fit media exactly
} as const;

!!!

---

## gallery-item.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery-item/gallery-item.tokens.ts`


!!!ts

!!!

---

## gallery.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery/gallery.tokens.ts`


!!!ts

!!!

---

## grid.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/grid.tokens.ts`


!!!ts
import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

/**
 * Grid columns. Works like CSS grid-template-columns.
 * @example
 *   <Grid columns="repeat(auto-fit, minmax(10rem, 1fr))">
 *     <span>…</span>
 *   </Grid>
 */
export const GRID_COLUMNS = scale({
  1: "repeat(1, minmax(0, 1fr))",
  2: "repeat(2, minmax(0, 1fr))",
  3: "repeat(3, minmax(0, 1fr))",
  4: "repeat(4, minmax(0, 1fr))",
  5: "repeat(5, minmax(0, 1fr))",
  6: "repeat(6, minmax(0, 1fr))",
  7: "repeat(7, minmax(0, 1fr))",
  8: "repeat(8, minmax(0, 1fr))",
  9: "repeat(9, minmax(0, 1fr))",
  10: "repeat(10, minmax(0, 1fr))",
  11: "repeat(11, minmax(0, 1fr))",
  12: "repeat(12, minmax(0, 1fr))",
});

// Add below GRID_COLUMNS
export const GRID_FIT = scale({
  xs: "repeat(auto-fit, minmax(10rem, 1fr))",
  sm: "repeat(auto-fit, minmax(14rem, 1fr))",
  md: "repeat(auto-fit, minmax(18rem, 1fr))",
  lg: "repeat(auto-fit, minmax(22rem, 1fr))",
  xl: "repeat(auto-fit, minmax(26rem, 1fr))",
});

export const GRID_TOKENS = composeTokens(LAYOUT_TOKENS, {
  columns: dimension("columns", GRID_COLUMNS),
  fit:     dimension("columns", GRID_FIT)
});
export type GridColumns = keyof typeof GRID_TOKENS.columns.values;
export type GridFit     = keyof typeof GRID_TOKENS.fit.values;

export type GridTag = "div" | "section" | "article" | "aside" | "main" | "ul" | "ol" | "form";

export const GRID_DEFAULTS = {
  as: "div" as GridTag,
} as const;

!!!

---

## header.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/header/header.tokens.ts`


!!!ts
// design/layout/components/header/header.tokens.ts

/**
 * Header Token Spec
 *
 * Header re-exports the full layout spec (gap, align, justify) unchanged.
 * It adds no new token dimensions — the header's opinionated defaults live
 * in HEADER_DEFAULTS as default values on existing LayoutProps, not as new
 * token dimensions.
 *
 * Visual defaults (background, min-height, bottom border) are expressed as
 * CSS fallback values in header.css so that the CSS file is the single source
 * of truth for "looks good out of the box" styling.
 */

import { LAYOUT_TOKENS } from "~l/layout.tokens";
import type { Space } from "~sh/primitives.tokens";

export { LAYOUT_TOKENS as HEADER_TOKENS };

export type {
  LayoutGap     as HeaderGap,
  LayoutAlign   as HeaderAlign,
  LayoutJustify as HeaderJustify,
} from "~l/layout.tokens";

/**
 * Opinionated prop defaults applied by `useHeader` when the consumer does not
 * explicitly set a value. Every key maps to an existing LayoutProp / SpacingProp.
 *
 * Overriding any of these is fully supported — pass the prop explicitly to the
 * `<Header>` component and the default is discarded.
 *
 * @property px      - Horizontal padding. Keeps content off the viewport edge.
 * @property align   - Cross-axis alignment. Centers children vertically.
 * @property justify - Main-axis alignment. Pushes start/end slots to opposite edges,
 *                     which is the correct default for logo-left / actions-right layouts.
 */
export const HEADER_DEFAULTS = {
  px:      "lg"      as Space,
  align:   "center"  as const,
  justify: "between" as const,
} as const;

!!!

---

## heading.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/heading/heading.tokens.ts`


!!!ts
// design/typography/heading/heading.tokens.ts

/**
 * Heading token spec.
 *
 * Extends the typography spec with one narrowed dimension:
 *
 * weight → narrowed to ["semibold", "bold", "black"]
 * Headings should always read as headings.
 * weight="normal" or weight="medium" are intentional
 * TypeScript errors at authoring time.
 *
 * All other dimensions are inherited from TYPOGRAPHY_TOKENS unchanged.
 * size, leading, and tracking have no defaults here — CSS fallbacks
 * per heading level (.h--1 through .h--6) handle appropriate defaults.
 *
 * Not exposed on HeadingProps (dropped intentionally):
 * clamp, truncate, fontStyle
 */
import { composeTokens, pickValues } from "~/shared/tokens";
import { TYPOGRAPHY_TOKENS } from "../../typography.tokens";
import { WEIGHT_DIM } from "~/shared/primitives.tokens";

export const HEADING_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
  weight: pickValues(WEIGHT_DIM, ["semibold", "bold", "black"] as const),
});

export type HeadingWeight = keyof typeof HEADING_TOKENS.weight.values;

export const HEADING_DEFAULTS = {
  level: 2,
} as const;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTag   = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
!!!

---

## icon.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/icon/icon.tokens.ts`


!!!ts
// design/assets/components/icon/icon.tokens.ts

/**
 * @file Token spec and defaults for the Icon component.
 * @module design/assets/icon
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { ICON_COLOR_DIM } from "~/shared/primitives.tokens";

// ─── SIZE ────────────────────────────────────────────────────────────────────
//
// Sizes map directly to the --icon--size-* CSS variables defined in tokens.css
//
// 2xs -> var(--icon--size-2xs)
// xs  -> var(--icon--size-xs)
// sm  -> var(--icon--size-sm)
// md  -> var(--icon--size-md)
// lg  -> var(--icon--size-lg)
// xl  -> var(--icon--size-xl)
// 2xl -> var(--icon--size-2xl)

const ICON_SIZE = scale({
  "2xs": null,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  "2xl": null,
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const ICON_TOKENS = defineTokens({
  size: dimension("size", ICON_SIZE, { modifier: true }),
  color: ICON_COLOR_DIM,
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type IconSize = keyof typeof ICON_TOKENS.size.values;
export type IconColor = keyof typeof ICON_TOKENS.color.values;

/**
 * Opinionated defaults for the Icon component.
 */
export const ICON_DEFAULTS = {
  size: "md",
} as const;

!!!

---

## image.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/image/image.tokens.ts`


!!!ts
// design/assets/image/image.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * Image token spec.
 *
 * prop     channel              CSS property
 * ────────────────────────────────────────────────────────────
 * radius → --image--radius    border-radius
 * ratio  → --image--ratio     aspect-ratio  (via .image--ratio)
 * fit    → --image--fit       object-fit
 *
 * loading is a native HTML attribute — passed through directly,
 * not a token dimension.
 */

const RATIO = scale({
  square:    "1 / 1",
  landscape: "4 / 3",
  video:     "16 / 9",
  portrait:  "3 / 4",
  wide:      "21 / 9",
});

const FIT = scale({
  cover:   "cover",
  contain: "contain",
  fill:    "fill",
  none:    "none",
});

export const IMAGE_TOKENS = defineTokens({
  radius: RADIUS_DIM,
  ratio:  dimension("ratio", RATIO),
  fit:    dimension("fit",   FIT),
});

export type ImageRadius  = keyof typeof IMAGE_TOKENS.radius.values;
export type ImageRatio   = keyof typeof IMAGE_TOKENS.ratio.values;
export type ImageFit     = keyof typeof IMAGE_TOKENS.fit.values;

export const IMAGE_DEFAULTS = {
  fit:     "cover"  as ImageFit,
  loading: "lazy"   as const,
} as const;
!!!

---

## indent.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/indent/indent.tokens.ts`


!!!ts
/**
 * src/design/typography/components/indent/indent.tokens.ts
 */
export const INDENT_SIZES = ['ng', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export type IndentSize = typeof INDENT_SIZES[number];

export const INDENT_PROSE_TOKENS: Record<IndentSize, string> = {
  ng: '-1em',
  xs: '1em',
  sm: '1.5em',
  md: '2em',
  lg: '3em',
  xl: '4em',
};

export const INDENT_CODE_TOKENS: Record<IndentSize, string> = {
  ng: '-1ch',
  xs: '1ch',
  sm: '2ch',
  md: '3ch',
  lg: '4ch',
  xl: '5ch',
};

export const INDENT_UI_TOKENS: Record<IndentSize, string> = {
  ng: '-2ch',
  xs: '1ch',
  sm: '2ch',
  md: '4ch',
  lg: '6ch',
  xl: '8ch',
};

!!!

---

## indicator.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/indicator/indicator.tokens.ts`


!!!ts

!!!

---

## inline.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/inline.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */

export const INLINE_TOKENS = composeTokens(LAYOUT_TOKENS, {});

export type InlineGap = keyof typeof INLINE_TOKENS.gap.values;
export type InlineTag = "div" | "span" | "ul" | "ol" | "nav";

export const INLINE_DEFAULTS = {
  as: "span" as InlineTag,
  gap: "md" as InlineGap,
} as const;

!!!

---

## input-group.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input-group/input-group.tokens.ts`


!!!ts

!!!

---

## input.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input/input.tokens.ts`


!!!ts
// design/forms/input/input.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Input component.
 * @module design/forms/input
 *
 * Input introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec unchanged. This file therefore follows the
 * **re-export pattern**: it aliases the category spec and types, adds
 * Input-specific constant lists ({@link INPUT_TYPES}), and declares
 * the component defaults ({@link INPUT_DEFAULTS}).
 *
 * **Why this file exists even though it adds nothing to the spec:**
 * Consistent import paths across the component quadruplet (`tokens`,
 * `props`, `hook`, `*.astro`) mean no file ever has to reach up into
 * the category to import defaults or types. If Input later needs a new
 * dimension (e.g. a `prefix`/`suffix` layout mode), this file is the
 * only change point — no import churn elsewhere.
 *
 * **Architecture position:**
 * !!!
 * forms/forms.tokens.ts      FORM_TOKENS, FormSize, FormVariant, …
 *        ↑  re-export
 * forms/input/input.tokens.ts   INPUT_TOKENS (alias), INPUT_TYPES,
 *                                INPUT_DEFAULTS
 *        ↑  import types
 * forms/input/input.props.ts
 * forms/input/input.hook.ts
 * !!!
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts` — source spec
 * @see {@link InputProps}     in `forms/input/input.props.ts` — prop surface
 * @see {@link useInput}       in `forms/input/input.hook.ts` — runtime resolution
 * @see {@link INPUT_DEFAULTS} — default values applied when props are omitted
 *
 * @todo If Input ever needs a dimension not in FORM_TOKENS (e.g. `resize`
 *   for a multiline mode, or a layout dimension for prefix/suffix slots),
 *   switch from re-export to `composeTokens(FORM_TOKENS, { … })` here.
 *   No other files change except `input.hook.ts` (which would call
 *   `resolveTokens` on `INPUT_TOKENS` directly instead of delegating
 *   entirely to {@link useForm}).
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~/forms/forms.tokens";

// ─── SPEC ────────────────────────────────────────────────────────────────────

/**
 * Input token spec — re-exports {@link FORM_TOKENS} under a component-scoped
 * alias. The `INPUT_TOKENS` name is used by {@link useInput} in case a future
 * extension is needed (swap re-export for `composeTokens` without touch
 * anywhere else).
 *
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts` — the actual spec object
 */
export { FORM_TOKENS as INPUT_TOKENS } from "~/forms/forms.tokens";

// ─── TYPE ALIASES ────────────────────────────────────────────────────────────
// Re-export category types under Input-specific names.
// Consumers of InputProps import from here, not from forms.tokens.ts directly.

/** @see {@link FormSize} */
export type InputSize    = FormSize;
/** @see {@link FormVariant} */
export type InputVariant = FormVariant;
/** @see {@link FormColor} */
export type InputColor   = FormColor;
/** @see {@link FormRadius} */
export type InputRadius  = FormRadius;

// ─── COMPONENT CONSTANTS ─────────────────────────────────────────────────────

/**
 * The set of `type` values that `<Input>` supports.
 *
 * @remarks
 * This list covers text-entry input types only. Specialised types that
 * require distinct component behaviour — or are better served by a
 * dedicated component — are intentionally excluded:
 *
 * | Excluded type       | Recommended component          |
 * |---------------------|-------------------------------|
 * | `date`              | `DatePicker`                  |
 * | `time`              | `TimePicker`                  |
 * | `datetime-local`    | `DatePicker` (with time)      |
 * | `color`             | `ColorPicker`                 |
 * | `file`              | `FileUpload`                  |
 * | `range`             | `Slider`                      |
 * | `checkbox`          | `Checkbox`                    |
 * | `radio`             | `Radio`                       |
 * | `hidden`            | Use a plain `<input>` element |
 * | `button` / `submit` | `Button`                      |
 *
 * @see {@link InputType} — the union derived from this array
 *
 * @todo Add `"month"` and `"week"` if native date pickers are wanted
 *   before dedicated picker components are built. CSS-only, no other changes.
 */
export const INPUT_TYPES = [
  "text",
  "email",
  "password",
  "tel",
  "url",
  "number",
  "search",
] as const;

/**
 * Valid `type` attribute values for the Input component.
 * Derived from {@link INPUT_TYPES} — never hand-written.
 */
export type InputType = typeof INPUT_TYPES[number];

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Input component.
 *
 * Only props **specific to Input** that differ from the category defaults
 * (which live inline in {@link useForm}) are declared here. There is no
 * point duplicating `size: "md"` or `variant: "outlined"` — those are
 * already applied by the category hook.
 *
 * Applied in {@link useInput} via destructuring defaults:
 * !!!ts
 * const { type = INPUT_DEFAULTS.type, fullWidth = INPUT_DEFAULTS.fullWidth, … } = props;
 * !!!
 * so consumer-supplied values always win.
 *
 * @see {@link useInput} in `forms/input/input.hook.ts` — where these are consumed
 */
export const INPUT_DEFAULTS = {
  /** Native `type` attribute. `"text"` covers the broadest single-line use. */
  type:      "text"  as InputType,
  /** Whether the input stretches to fill its container's inline axis. */
  fullWidth: false,
} as const;
!!!

---

## kbd.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/kbd/kbd.tokens.ts`


!!!ts
// design/typography/components/kbd/kbd.tokens.ts
import type { TypeSize, TypeFamily } from "../../typography.tokens";

export const KBD_DEFAULTS = {
  size: "xs"   as TypeSize,
  fam:  "mono" as TypeFamily,
} as const;

!!!

---

## label.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/label.tokens.ts`


!!!ts
// design/typography/label/label.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Label component.
 * @module design/typography/label
 *
 * Label uses `composeTokens` to extend {@link TYPOGRAPHY_TOKENS} with two
 * overrides: a fixed (non-responsive) size scale and a narrowed weight range.
 *
 * **Why a fixed size scale:**
 * Typography components like Text and Heading use {@link TEXT_SIZE} —
 * a responsive scale where values may use `clamp()` to grow with the
 * viewport. Labels sit inside form fields and must NOT reflow; a label
 * that grows with the viewport would break tightly composed field layouts.
 * {@link TEXT_SIZE_FIXED} uses `--fsf--*` variables whose values are
 * absolute (px or rem without clamp) and are defined independently of
 * the responsive type scale.
 *
 * **Why `resolveTokens` must be called directly:**
 * Unlike Heading (which delegates to `useTypography`), Label cannot delegate
 * and achieve the fixed scale. `useTypography` calls
 * `resolveTokens(TYPOGRAPHY_TOKENS, ...)`, which would write
 * `var(--fs--sm)` (responsive) for `size="sm"`. Label needs
 * `var(--fsf--sm)` (fixed). Calling `resolveTokens(LABEL_TOKENS, ...)`
 * directly in `useLabel` writes the correct fixed value.
 *
 * This is Pattern B from the architecture: extended/modified tokens require
 * calling `resolveTokens` directly rather than delegating to the category hook.
 *
 * @see {@link TYPOGRAPHY_TOKENS} in `typography/typography.tokens.ts` — base spec
 * @see {@link TEXT_SIZE_FIXED}   in `shared/primitives.tokens.ts`     — fixed scale
 * @see {@link useLabel}          in `typography/label/label.hook.ts`  — resolves directly
 * @see {@link LabelProps}        in `typography/label/label.props.ts`
 *
 * @todo If the responsive Text component ever needs an `inline` variant that
 *   behaves like a label (fixed size, tight spacing), consider whether
 *   TEXT_SIZE_FIXED belongs in the component or should be promoted to a
 *   shared Label-like base. For now: YAGNI.
 */

import { composeTokens, dimension, pickValues } from "~/shared/tokens";
import { TYPOGRAPHY_TOKENS }                    from "../../typography.tokens";
import { TEXT_SIZE_FIXED, WEIGHT_DIM }          from "~/shared/primitives.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Label token spec.
 *
 * Extends {@link TYPOGRAPHY_TOKENS} with two overrides:
 *
 * **`size`** — replaced with a narrowed slice of {@link TEXT_SIZE_FIXED}.
 * Labels rarely need sizes above `xl`; the full `2xl`–`4xl` range of the
 * fixed scale is excluded.
 *
 * **`weight`** — narrowed to `normal | medium | semibold`.
 * Labels should never be `bold` (too heavy for a field label); `black` is
 * also excluded. Medium or semibold are the typical label weights.
 *
 * All other dimensions (color, align, leading, tracking, fam, transform, etc.)
 * are inherited from {@link TYPOGRAPHY_TOKENS} unchanged.
 *
 * @remarks
 * The `size` override uses `dimension("size", TEXT_SIZE_FIXED)` with the same
 * channel key `"size"`, so `resolveTokens` still writes `--typography--size`.
 * The difference is that the resolved VALUE comes from `--fsf--*` (fixed)
 * rather than `--fs--*` (responsive). `typography.css` reads the channel the
 * same way regardless of which scale provided the value.
 */
export const LABEL_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
  size: pickValues(
    dimension("size", TEXT_SIZE_FIXED),
    ["2xs", "xs", "sm", "md", "lg", "xl"] as const,
  ),
  weight: pickValues(WEIGHT_DIM, ["normal", "medium", "semibold"] as const),
});

// ─── DERIVED TYPES ────────────────────────────────────────────────────────────

/**
 * Valid font-size values for Label — a fixed-scale subset.
 * Derived from {@link LABEL_TOKENS} — never hand-written.
 * @default `"sm"` — applied by {@link useLabel}
 */
export type LabelSize = keyof typeof LABEL_TOKENS.size.values;

/**
 * Valid font-weight values for Label — narrower than the full typography spec.
 * Derived from {@link LABEL_TOKENS} — never hand-written.
 * `"bold"` and `"black"` are intentionally excluded (too heavy for labels).
 * @default `"medium"` — applied by {@link useLabel}
 */
export type LabelWeight = keyof typeof LABEL_TOKENS.weight.values;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Label component.
 *
 * `"sm"` at the fixed scale maps to `--fsf--sm` — a compact, readable size
 * appropriate for field labels in most form contexts.
 *
 * @see {@link useLabel} in `typography/label/label.hook.ts`
 */
export const LABEL_DEFAULTS = {
  size:   "sm"     as LabelSize,
  weight: "medium" as LabelWeight,
} as const;
!!!

---

## lightbox.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/lightbox/lightbox.tokens.ts`


!!!ts

!!!

---

## link.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/link/link.tokens.ts`


!!!ts
// design/typography/link/link.tokens.ts

export { TYPOGRAPHY_TOKENS as LINK_TOKENS } from "~ty/typography.tokens";

/**
 * Link scales inherit from typography sizes and variants since links
 * are text-based components.
 */
export type {
  TypeSize       as LinkSize,
  TypeWeight     as LinkWeight,
  TypeColor      as LinkColor,
  TypeFamily     as LinkFamily,
} from "~ty/typography.tokens";

/**
 * Array of valid underline behaviors for Link.
 * Used for runtime validation or mapping over possible variants.
 */
export const LINK_UNDERLINE = ["always", "hover", "never"] as const;

/**
 * Type: `LinkUnderline`
 * Represents the timing and visibility of the text underline.
 * Derived from the `LINK_UNDERLINE` array.
 */
export type LinkUnderline = typeof LINK_UNDERLINE[number];

/**
 * Default fallback values for the Link component properties.
 */
export const LINK_DEFAULTS = {
  /** Links only show underline on hover by default. */
  underline: "hover" as LinkUnderline,
} as const;
!!!

---

## list.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/list.tokens.ts`


!!!ts
// design/data/list/list.tokens.ts

/**
 * TOKEN SPEC, TYPES, AND DEFAULTS FOR THE LIST COMPONENT
 * ─────────────────────────────────────────────────────────────
 * List adds one token dimension on top of DataProps:
 *
 *   orientation  →  .list--vertical | .list--horizontal  (class-only)
 *
 * All color channels, density, variant, and state tokens are inherited
 * from DataProps and resolved by useData. LIST_TOKENS is only passed
 * to resolveTokens for the orientation dimension.
 *
 * LISTITEM
 * ─────────────────────────────────────────────────────────────
 * The shape of a data-driven list item. Mirrors the use cases:
 *
 *   label + icon          → feature/bullet list
 *   label + checkState    → to-do / checklist
 *   label + href          → link list
 *   label + description   → contact / settings item
 *   label + badge         → notification / count list
 *   label + children      → nested sub-list (recursive)
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import type { CheckState }               from "~/forms/components/checkbox/checkbox.tokens";
import type { SvgName } from "~/shared/icons";

export type { CheckState };

// ─── LIST-ONLY SCALES ─────────────────────────────────────────

/**
 * Layout axis for list items.
 * Class-only — drives `flex-direction` in list.css.
 *
 * - `vertical`   — stacked top-to-bottom (default)
 * - `horizontal` — side-by-side; use for tag lists, chip groups
 */
const LIST_ORIENTATION = scale({
  vertical:   null,
  horizontal: null,
});

// ─── TOKEN SPEC ───────────────────────────────────────────────

export const LIST_TOKENS = defineTokens({
  orientation: dimension("orientation", LIST_ORIENTATION, { modifier: true }),
});

// ─── LIST ITEM SHAPE ──────────────────────────────────────────

/**
 * A single item in a data-driven list.
 *
 * All fields except `label` are optional — List renders what is present:
 *   icon        → leading icon (from the project's icon registry)
 *   checkState  → renders a Checkbox; drives the to-do / checklist pattern
 *   href        → wraps the item content in an <a> element
 *   description → second line of text beneath the label
 *   badge       → trailing count or label (right-aligned)
 *   disabled    → mutes the item and prevents interaction
 *   children    → nested sub-list rendered as a child <ul>/<ol>
 *
 * @example
 * !!!ts
 * const tasks: ListItem[] = [
 *   { label: "Buy milk",       checkState: "checked"   },
 *   { label: "Write tests",    checkState: "unchecked" },
 *   { label: "Deploy staging", checkState: "unchecked", disabled: true },
 * ];
 *
 * const links: ListItem[] = [
 *   { label: "Documentation", href: "/docs", icon: "book"  },
 *   { label: "GitHub",        href: "https://github.com", icon: "github" },
 * ];
 *
 * const nested: ListItem[] = [
 *   { label: "Frontend", children: [
 *     { label: "React" },
 *     { label: "Astro" },
 *   ]},
 * ];
 * !!!
 */
export interface ListItem {
  /** Primary text. Always required. */
  label: string;

  /**
   * Icon name from the project icon registry.
   * Rendered as a leading icon before the label.
   */
  icon?: SvgName;

  /**
   * Check state for to-do / checklist items.
   * When present, the item renders a `<Checkbox>` instead of a bullet.
   * Reuses the forms category's `CheckState` union directly.
   *
   * @see CheckState — `"checked" | "unchecked" | "indeterminate"`
   */
  checkState?: CheckState;

  /**
   * When provided, the item content is wrapped in an `<a>` element.
   * List item becomes a link; `interactive` is implied for that item.
   */
  href?: string;

  /** Secondary line of text beneath the label. */
  description?: string;

  /**
   * Trailing badge — a count or short label aligned to the right edge.
   * Numbers render as-is; strings are truncated if they exceed badge width.
   */
  badge?: string | number;

  /**
   * Mutes the item visually and prevents pointer interaction.
   * Does not affect the item's position or layout.
   */
  disabled?: boolean;

  /**
   * Nested list items rendered as a child `<ul>` (or `<ol>` if the
   * parent List has `ordered`). Supports arbitrary depth.
   */
  children?: ListItem[];
}

// ─── DERIVED TYPES ────────────────────────────────────────────

export type ListOrientation = keyof typeof LIST_ORIENTATION;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const LIST_DEFAULTS = {
  ordered:     false,
  orientation: "vertical" as ListOrientation,
} as const satisfies {
  ordered:     boolean;
  orientation: ListOrientation;
};
!!!

---

## menu.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/menu.tokens.ts`


!!!ts
export { NAV_TOKENS as MENU_TOKENS } from "../../nav.tokens";
export type { NavSize as MenuSize, NavVariant as MenuVariant } from "../../nav.tokens";

!!!

---

## metric.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/metric/metric.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { DATA_TOKENS } from "~/data/data.tokens";
import type { DataSize } from "~/data/data.tokens";

export const METRIC_DEFAULTS = {
  size: "comfortable" as DataSize,
} as const;

export const METRIC_TOKENS = composeTokens(DATA_TOKENS, {});

!!!

---

## modal.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/modal/modal.tokens.ts`


!!!ts
export { OVERLAY_TOKENS } from "../../overlays.tokens";
export type { OverlaySize, OverlayVariant, OverlayRadius } from "../../overlays.tokens";

export const MODAL_DEFAULTS = {
  size:            "md"      as const,
  variant:         "default" as const,
  closeOnBackdrop: true,
  closeOnEsc:      true,
} as const;

!!!

---

## multiselect.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/multiselect/multiselect.tokens.ts`


!!!ts

!!!

---

## navbar.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/navbar.tokens.ts`


!!!ts
export { NAV_TOKENS as NAVBAR_TOKENS } from "../../nav.tokens";

!!!

---

## number-input.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/number-input/number-input.tokens.ts`


!!!ts

!!!

---

## pagination.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/pagination/pagination.tokens.ts`


!!!ts
export { NAV_TOKENS as PAGINATION_TOKENS } from "../../nav.tokens";
export type { NavSize as PaginationSize, NavVariant as PaginationVariant } from "../../nav.tokens";

!!!

---

## panel.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/panel/panel.tokens.ts`


!!!ts
// design/surfaces/components/panel/panel.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const PANEL_DEFAULTS = {
  layer:   "3"  as SurfaceLayer, // tile/panel tier
  padding: "md" as SurfacePadding,
} as const;

!!!

---

## paper.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/paper/paper.tokens.ts`


!!!ts
// design/surfaces/components/paper/paper.tokens.ts

import { composeTokens, dimension }  from "~/shared/tokens";
import { SURFACE_TOKENS }            from "../../surface.tokens";
import { SPACE }                     from "~/shared/primitives.tokens";
import type { PaperTag }             from "./paper.props";
import type { SurfaceLayer }         from "../../surface.tokens";

/**
 * Paper adds one dimension on top of SURFACE_TOKENS:
 *
 *   gap → --paper--gap   Controls flex gap when stack=true.
 *
 * scope: "paper" pins the channel to --paper--gap so it never
 * collides with --surface--gap if another surface adds one later.
 */
export const PAPER_TOKENS = composeTokens(SURFACE_TOKENS, {
  gap: dimension("gap", SPACE, { scope: "paper" }),
});

export type PaperGap = keyof typeof PAPER_TOKENS.gap.values;

export const PAPER_DEFAULTS = {
  as:        "div"   as PaperTag,
  layer:     "1"     as SurfaceLayer,   // frame/paper tier
  padding:   "md"    as const,
  radius:    "md"    as const,
  stack:     false,
  gap:       "md"    as PaperGap,
  fullWidth: false,
} as const;

!!!

---

## popover.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/popover/popover.tokens.ts`


!!!ts
import { defineTokens, scale, dimension } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

const POPOVER_PLACEMENT = scale({
  bottom:       null,
  "bottom-start": null,
  "bottom-end":   null,
  top:          null,
  "top-start":    null,
  "top-end":      null,
});

export const POPOVER_TOKENS = defineTokens({
  placement: dimension("placement", POPOVER_PLACEMENT, { modifier: true }),
  radius:    RADIUS_DIM,
});

export const POPOVER_DEFAULTS = {
  placement: "bottom",
} as const;

export type PopoverPlacement = keyof typeof POPOVER_TOKENS.placement.values;
export type PopoverRadius    = keyof typeof POPOVER_TOKENS.radius.values;

!!!

---

## portal.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/portal/portal.tokens.ts`


!!!ts

!!!

---

## progress.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/progress/progress.tokens.ts`


!!!ts
// design/feedback/progress/progress.tokens.ts

/**
 * @file Token spec and defaults for the Progress component.
 * @module design/feedback/progress
 *
 * Progress extends {@link FEEDBACK_TOKENS} with a `type` dimension that
 * selects the rendering strategy: bar, ring, number, or percent.
 *
 * The `type` dimension is scoped to `"progress"` so it emits
 * `progress--bar` (not `feedback--bar`) — these are component-internal
 * modifier classes, not shared category classes.
 *
 * **Size map (bar track height):**
 *   xs  → 2px track
 *   sm  → 4px track
 *   md  → 6px track  ← default
 *   lg  → 10px track
 *   xl  → 16px track
 *
 * **Size map (ring diameter):**
 *   xs  → 24px
 *   sm  → 32px
 *   md  → 40px  ← default
 *   lg  → 56px
 *   xl  → 80px
 *
 * **Size map (number/percent font):**
 *   xs  → --fsf--xl  (display, compact)
 *   sm  → --fsf--2xl
 *   md  → --fsf--3xl ← default
 *   lg  → --fsf--4xl
 *   xl  → clamp(3rem, 8vw, 5rem) (hero)
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useProgress}     in `feedback/progress/progress.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FEEDBACK_TOKENS }                 from "../../feedback.tokens";

// ─── PROGRESS TYPE ───────────────────────────────────────────────────────────

const PROGRESS_TYPE = scale({
  bar:     null,   // horizontal track + fill div
  ring:    null,   // SVG circle track + stroke
  number:  null,   // large display numeral: "6/10"
  percent: null,   // large display numeral: "84%"
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const PROGRESS_TOKENS = composeTokens(FEEDBACK_TOKENS, {
  type: dimension("type", PROGRESS_TYPE, { modifier: true, scope: "progress" }),
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type ProgressType = keyof typeof PROGRESS_TOKENS.type.values;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

export const PROGRESS_DEFAULTS = {
  variant:       "soft",
  color:         "primary",
  size:          "md",
  radius:        "full",
  type:          "bar",
  max:           100,
  showValue:     false,
  indeterminate: false,
} as const;

!!!

---

## prose.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/prose/prose.tokens.ts`


!!!ts
// design/typography/components/prose/prose.tokens.ts
import type { TypeSize, TypeWeight, TypeColor, TypeLeading } from "../../typography.tokens";

export const PROSE_DEFAULTS = {
  size:    "base"    as TypeSize,
  weight:  "regular" as TypeWeight,
  color:   "base"    as TypeColor,
  leading: "relaxed" as TypeLeading, // Great for reading long-form content
} as const;

!!!

---

## quote.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/quote/quote.tokens.ts`


!!!ts
// design/typography/quote/quote.tokens.ts

export { TYPOGRAPHY_TOKENS as QUOTE_TOKENS } from "../../typography.tokens";

export type {
  TypeSize       as QuoteSize,
  TypeWeight     as QuoteWeight,
  TypeColor      as QuoteColor,
  TypeAlign      as QuoteAlign,
  TypeLeading    as QuoteLeading,
  TypeTracking   as QuoteTracking,
  TypeFamily     as QuoteFamily,
  TypeTransform  as QuoteTransform,
  TypeWrap       as QuoteWrap,
  TypeDecoration as QuoteDecoration,
  TypeStyle      as QuoteStyle,
} from "../../typography.tokens";

export const QUOTE_DEFAULTS = {
  type: "block",
} as const;

export type QuoteType = "block" | "pull" | "inline";
export type QuoteTag = "blockquote" | "q";

!!!

---

## radio-group.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio-group/radio-group.tokens.ts`


!!!ts
// design/forms/components/radio-group/radio-group.tokens.ts

/**
 * @file Token spec and defaults for the RadioGroup component.
 * @module design/forms/radio-group
 *
 * RadioGroup is a structural wrapper, not a form control. It uses no form token
 * dimensions — its only token is the layout direction.
 *
 * @see {@link RadioGroupProps}  in `radio-group.props.ts`
 * @see {@link useRadioGroup}    in `radio-group.hook.ts`
 */

// ─── LAYOUT SCALE ─────────────────────────────────────────────────────────────

export const LAYOUT_VALUES = ["vertical", "horizontal"] as const;
export type  RadioGroupLayout = typeof LAYOUT_VALUES[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const RADIO_GROUP_DEFAULTS = {
  layout: "vertical" as RadioGroupLayout,
} as const;

!!!

---

## radio.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio/radio.tokens.ts`


!!!ts
// design/forms/radio/radio.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Radio component.
 * @module design/forms/radio
 *
 * Radio introduces no new token dimensions and follows the re-export pattern.
 *
 * @remarks
 * **No RadioGroup yet.**
 * In a full implementation, a `RadioGroup` component would own the `name`
 * attribute and the selected `value`, with individual `Radio` components
 * serving as the visual options. For now, `Radio` is a standalone component
 * — consumers manage grouping manually by sharing the same `name` across
 * instances. A `RadioGroup` can be added as a sibling component later
 * without changing this file.
 *
 * **Default variant is `"ghost"`**, not `"outlined"`.
 * Same reasoning as {@link CHECKBOX_DEFAULTS}: the traditional radio button
 * has no border or background on the wrapper. `variant="outlined"` produces
 * a bordered "option card" style.
 *
 * **`labelPosition` is not a token dimension.**
 * Emitted as a direct class modifier in {@link useRadio}.
 * Shared concept with {@link CheckboxProps.labelPosition} — both use the
 * same `LabelPosition` type, declared locally in each component to avoid
 * cross-component imports. If a third component needs it, promote to
 * `forms.tokens.ts`.
 *
 * @see {@link FORM_TOKENS}  in `forms/forms.tokens.ts` — source spec
 * @see {@link RadioProps}   in `forms/radio/radio.props.ts`
 * @see {@link useRadio}     in `forms/radio/radio.hook.ts`
 * @see `forms/radio/radio.css` — circular indicator styles, layout modifiers
 *
 * @todo Add `RadioGroup` component in `forms/radio-group/` when needed.
 *   RadioGroup would own `name`, `value` (selected option), and `onChange`.
 *   Individual `Radio` components inside a RadioGroup would receive their
 *   `name` and `checked` state via HTML (or a client-side group manager).
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Radio token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as RADIO_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type RadioSize    = FormSize;
/** @see {@link FormVariant} */
export type RadioVariant = FormVariant;
/** @see {@link FormColor} */
export type RadioColor   = FormColor;
/** @see {@link FormRadius} */
export type RadioRadius  = FormRadius;

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

/**
 * Valid positions for the label slot relative to the radio indicator circle.
 *
 * Declared locally (same values as in `checkbox.tokens.ts`) to avoid
 * cross-component imports. If a third component needs this, promote to
 * `forms.tokens.ts`.
 *
 * @remarks
 * - `"end"`    — `(●) Label` — circle left, label right (default)
 * - `"start"`  — `Label (●)` — label left, circle right
 * - `"top"`    — Label above circle
 * - `"bottom"` — circle above label
 *
 * CSS uses `flex-direction` / `order` for visual reordering.
 * DOM order is always: `hidden input → indicator → label slot`.
 */
export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;

/** Valid values for the `labelPosition` prop. */
export type LabelPosition = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Radio component.
 *
 * `variant` defaults to `"ghost"` and is applied inline in {@link useRadio}
 * before delegating to {@link useForm}, not declared here.
 *
 * @see {@link useRadio} — where `variant: "ghost"` is the default
 */
export const RADIO_DEFAULTS = {
  /** Label appears to the right of the indicator circle. */
  labelPosition: "end" as LabelPosition,
} as const;
!!!

---

## range-slider.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/range-slider/range-slider.tokens.ts`


!!!ts

!!!

---

## screen.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/screen/screen.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";


/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */

export const SCREEN_TOKENS = composeTokens(LAYOUT_TOKENS, {});

export type ScreenTag = "div" | "section" | "article" | "main" | "section" | "span";
export type PageHeight = "full" | "90vh" | "auto";
export type OverflowOptions = "auto" | "hidden" | "scroll" | "visible";
export type PageCentered = "all" | "none" | "x" | "y";

export type ScreenGap = keyof typeof SCREEN_TOKENS.gap.values;

export const SCREEN_DEFAULTS = {
  as: "div" as ScreenTag,
  height: "full" as PageHeight,
  overflow: "auto" as OverflowOptions,
  centered: "none" as PageCentered,
  gap: "md" as ScreenGap,
} as const;
!!!

---

## search.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/search/search.tokens.ts`


!!!ts
// design/forms/search/search.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Search component.
 * @module design/forms/search
 *
 * Search introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec and re-exports it under a component alias.
 *
 * @remarks
 * **Search vs Input:**
 * Search is not a wrapper around Input — sibling components cannot import
 * from each other. Both call {@link useForm} directly and follow the same
 * wrapper/control split pattern. The differences are:
 * - Default `type` is `"search"`
 * - A clear button is built into the component (JS-driven, auto-hides)
 * - A `loading` prop shows a spinner in the trailing position
 * - Escape key clears the input (handled by the component script)
 *
 * All structural and visual token logic is identical to Input.
 *
 * **`loading` is not a token dimension.**
 * It emits a class modifier (`search--loading`) and a `data-loading`
 * attribute directly in {@link useSearch}, same as `disabled`/`invalid`.
 * CSS drives the spinner visibility; no CSS custom property is needed.
 *
 * @see {@link FORM_TOKENS}   in `forms/forms.tokens.ts`
 * @see {@link SearchProps}   in `forms/search/search.props.ts`
 * @see {@link useSearch}     in `forms/search/search.hook.ts`
 *
 * @todo Add `shortcut?: string` prop (e.g. `"/"` or `"⌘K"`) as a display-only
 *   badge in the end position. A pure display concern — no token dimension needed,
 *   just a conditional render in `Search.astro` when the prop is set.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Search token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as SEARCH_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type SearchSize    = FormSize;
/** @see {@link FormVariant} */
export type SearchVariant = FormVariant;
/** @see {@link FormColor} */
export type SearchColor   = FormColor;
/** @see {@link FormRadius} */
export type SearchRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Search component.
 *
 * `fullWidth` defaults to `true` for Search — a search input almost always
 * spans the full width of its container. Override with `fullWidth={false}`
 * for inline or constrained-width contexts.
 *
 * @see {@link useSearch} in `forms/search/search.hook.ts`
 */
export const SEARCH_DEFAULTS = {
  fullWidth: true,
  loading:   false,
} as const;

!!!

---

## section.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/section/section.tokens.ts`


!!!ts
// design/surfaces/components/section/section.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const SECTION_DEFAULTS = {
  layer:   "0"    as SurfaceLayer,
  padding: "none" as SurfacePadding, // Sections often span edge-to-edge
} as const;

!!!

---

## segmented-control.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/segmented-control/segmented-control.tokens.ts`


!!!ts

!!!

---

## select.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/select/select.tokens.ts`


!!!ts
// design/forms/select/select.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Select component.
 * @module design/forms/select
 *
 * Select introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec unchanged and follows the **re-export pattern**.
 *
 * @remarks
 * **Single component, two modes:**
 * `Select` handles both single-value and multi-value selection via a
 * discriminated union on the `multiple` prop (see {@link SelectProps}).
 * There is no separate `Multiselect` component. The token spec is
 * identical for both modes — only the native `multiple` attribute and
 * the `value` type differ. This is the one component in the forms
 * category whose props file exports a union type rather than a plain
 * interface.
 *
 * **Options as props, not slots:**
 * Unlike `Input`, `Select` must render `<option>` elements itself.
 * Native `<select>` only accepts `<option>` and `<optgroup>` as children;
 * Astro named slots cannot be placed inside it. Options are therefore
 * passed as a structured prop (`options: SelectOption[]`) and the hook
 * returns a `resolvedOptions` array (with `selected: boolean` computed)
 * for `Select.astro` to map over.
 *
 * **Architecture position:**
 * !!!
 * forms/forms.tokens.ts        FORM_TOKENS, FormSize, FormVariant, …
 *        ↑  re-export
 * forms/select/select.tokens.ts   SELECT_TOKENS (alias), SELECT_DEFAULTS
 *        ↑
 * forms/select/select.props.ts    SelectOption, SelectProps (union)
 * forms/select/select.hook.ts     useSelect
 * !!!
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts`         — source spec
 * @see {@link SelectProps}    in `forms/select/select.props.ts`  — prop surface
 * @see {@link useSelect}      in `forms/select/select.hook.ts`   — runtime resolution
 * @see {@link SELECT_DEFAULTS} — default values applied when props are omitted
 *
 * @todo Add `optgroup` support: extend {@link SelectOption} to allow
 *   `SelectOptionGroup = { label: string; options: SelectOption[] }`,
 *   update the `options` prop type in {@link SelectProps} to
 *   `Array<SelectOption | SelectOptionGroup>`, and update the rendering
 *   in `Select.astro`. The hook needs no change — group detection
 *   and `<optgroup>` rendering is a template concern.
 *
 * @todo If Select ever needs a new dimension (e.g. `rows` for a visible
 *   count on native `<select size="N">`, which is distinct from the token
 *   `size` dimension), switch to `composeTokens(FORM_TOKENS, { … })`.
 *   The native `size` attribute conflict must be handled carefully —
 *   use a different prop name (e.g. `visibleRows`) to avoid collision
 *   with the token `size` dimension.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~/forms/forms.tokens";

// ─── SPEC ────────────────────────────────────────────────────────────────────

/**
 * Select token spec — re-exports {@link FORM_TOKENS} under a component-scoped
 * alias. Provides a stable import path so future extension via `composeTokens`
 * only requires changing this file.
 *
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts` — the actual spec object
 */
export { FORM_TOKENS as SELECT_TOKENS } from "~/forms/forms.tokens";

// ─── TYPE ALIASES ────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type SelectSize    = FormSize;
/** @see {@link FormVariant} */
export type SelectVariant = FormVariant;
/** @see {@link FormColor} */
export type SelectColor   = FormColor;
/** @see {@link FormRadius} */
export type SelectRadius  = FormRadius;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Select component.
 *
 * Only props specific to Select that differ from the category defaults
 * (applied inline by {@link useForm}) are declared here.
 *
 * Note: `options` and `value` have no defaults — `options` is required,
 * and `value` being absent represents the uncontrolled/no-selection state.
 *
 * @see {@link useSelect} in `forms/select/select.hook.ts` — where these are consumed
 */
export const SELECT_DEFAULTS = {
  /** Whether the select stretches to fill its container's inline axis. */
  fullWidth: false,
} as const;
!!!

---

## separator.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/separator/separator.tokens.ts`


!!!ts
/**
 * @file Token spec, constants, and defaults for the Separator component.
 */

import { dimension, scale } from "~sh/tokens";

// ─── SCALES ───────────────────────────────────────────────────────────────────

export const ORIENTATION = scale({ horizontal: null, vertical: null });
export const VARIANT = scale({ solid: null, dashed: null });
export const STRENGTH = scale({ subtle: null, default: null, strong: null });

// ─── DIMENSIONS ───────────────────────────────────────────────────────────────

export const ORIENTATION_DIM = dimension("orientation", ORIENTATION, {
  modifier: true,
});
export const VARIANT_DIM = dimension("variant", VARIANT, { modifier: "variant" });
export const STRENGTH_DIM = dimension("strength", STRENGTH, { modifier: "strength" });

// ─── DERIVED TYPES ────────────────────────────────────────────────────────────

export type SeparatorOrientation = keyof typeof ORIENTATION;
export type SeparatorVariant = keyof typeof VARIANT;
export type SeparatorStrength = keyof typeof STRENGTH;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const SEPARATOR_DEFAULTS = {
  orientation: "horizontal" as SeparatorOrientation,
  variant: "solid" as SeparatorVariant,
  strength: "default" as SeparatorStrength,
} as const;
!!!

---

## sheet.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/sheet/sheet.tokens.ts`


!!!ts
export const SHEET_DEFAULTS = {
  side: "left" as const,
  size: "md" as const,
  variant: "default" as const,
};

!!!

---

## skeleton.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/skeleton/skeleton.tokens.ts`


!!!ts
// design/feedback/skeleton/skeleton.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM }                     from "~/shared/primitives.tokens";

// ─── VARIANTS ─────────────────────────────────────────────────
//
// Class-only — each drives shape/size defaults in skeleton.css.
// Width, height, and aspect-ratio can always be overridden via props.
//
//   text    — single text line. Use lines prop for a multi-line block.
//   heading — wider, taller than text. For title placeholders.
//   avatar  — square that CSS forces into a circle via border-radius: 50%.
//   button  — medium pill shape. For CTA placeholders.
//   image   — rectangle driven by aspect-ratio prop. For media placeholders.
//   block   — no default size. Fully controlled by width + height props.

const SKELETON_VARIANT = scale({
  text:    null,
  heading: null,
  avatar:  null,
  button:  null,
  image:   null,
  block:   null,
});

// ─── SPEC ─────────────────────────────────────────────────────

export const SKELETON_TOKENS = defineTokens({
  variant: dimension("variant", SKELETON_VARIANT, { modifier: true }),
  // radius overrides the per-variant default from skeleton.css.
  // Useful when a skeleton needs to match the shape it replaces
  // (e.g. a card image with rounded corners → radius="lg").
  radius:  RADIUS_DIM,
});

// ─── DERIVED TYPES ────────────────────────────────────────────

export type SkeletonVariant = keyof typeof SKELETON_VARIANT;
export type SkeletonRadius  = keyof typeof SKELETON_TOKENS.radius.values;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const SKELETON_DEFAULTS = {
  variant:  "block"  as SkeletonVariant,
  lines:    1,
  animated: true,
} as const;
!!!

---

## skip-link.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/skip-link/skip-link.tokens.ts`


!!!ts
// design/triggers/components/skip-link/skip-link.tokens.ts
export const SKIP_LINK_DEFAULTS = {
  target: "main",
  label:  "Skip to content",
} as const;

!!!

---

## slider.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/slider/slider.tokens.ts`


!!!ts

!!!

---

## spacer.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/spacer/spacer.tokens.ts`


!!!ts
/**
 * @file Token spec, constants, and defaults for the Spacer component.
 */

export type SpacerTag = "div" | "span";

export const SPACER_DEFAULTS = {
  as: "div" as SpacerTag,
} as const;
!!!

---

## spinner.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/spinner/spinner.tokens.ts`


!!!ts
// design/feedback/spinner/spinner.tokens.ts

/**
 * @file Token spec and defaults for the Spinner component.
 * @module design/feedback/spinner
 *
 * Spinner extends {@link FEEDBACK_TOKENS} with two dimensions:
 *   - `speed`     — animation duration (slow/normal/fast)
 *   - `direction` — rotation direction (clockwise/counterclockwise)
 *
 * Both are scoped to `"spinner"` so their modifier classes are
 * `spinner--slow`, `spinner--fast`, etc. (not `feedback--slow`).
 *
 * Size map (spinner diameter + SVG stroke-width):
 *   xs  → 14px / stroke 2
 *   sm  → 18px / stroke 2.5
 *   md  → 24px / stroke 2.5  ← default
 *   lg  → 32px / stroke 3
 *   xl  → 48px / stroke 3.5
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useSpinner}      in `feedback/spinner/spinner.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FEEDBACK_TOKENS }                 from "../../feedback.tokens";

// ─── SPEED ───────────────────────────────────────────────────────────────────

const SPINNER_SPEED = scale({
  slow:   null,   // 1.4s
  normal: null,   // 0.8s (default)
  fast:   null,   // 0.4s
});

// ─── DIRECTION ───────────────────────────────────────────────────────────────

const SPINNER_DIRECTION = scale({
  clockwise:        null,   // default
  counterclockwise: null,   // animation-direction: reverse
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const SPINNER_TOKENS = composeTokens(FEEDBACK_TOKENS, {
  speed:     dimension("speed",     SPINNER_SPEED,     { modifier: true, scope: "spinner" }),
  direction: dimension("direction", SPINNER_DIRECTION, { modifier: true, scope: "spinner" }),
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type SpinnerSpeed     = keyof typeof SPINNER_TOKENS.speed.values;
export type SpinnerDirection = keyof typeof SPINNER_TOKENS.direction.values;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

export const SPINNER_DEFAULTS = {
  variant:   "ghost",          // no bg/border — spinner stands alone
  color:     "primary",
  size:      "md",
  radius:    "full",
  speed:     "normal",
  direction: "clockwise",
  label:     "Loading",
} as const;

!!!

---

## stack.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/stack/stack.tokens.ts`


!!!ts
/**
 * Stack token definitions.
 */

import { dimension } from "~/shared/tokens";
import { SPACE } from "~/shared/primitives.tokens";

export const STACK_TOKENS = {
  gap: dimension("gap", SPACE, { scope: "stack" }),
};

export type StackGap = keyof typeof STACK_TOKENS.gap.values;

export type StackTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "main"
  | "nav";

export const STACK_DEFAULTS = {
  as: "div" as StackTag,
  gap: "md" as StackGap,
} as const;
!!!

---

## stat.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/stat/stat.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { DATA_TOKENS } from "../../data.tokens";
import type { DataSize } from "../../data.tokens";

export const STAT_DEFAULTS = {
  size: "comfortable" as DataSize,
} as const;

export const STAT_TOKENS = composeTokens(DATA_TOKENS, {});
!!!

---

## stepper.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/stepper.tokens.ts`


!!!ts
export { NAV_TOKENS as STEPPER_TOKENS } from "../../nav.tokens";

!!!

---

## switch.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/switch/switch.tokens.ts`


!!!ts
// design/forms/components/switch/switch.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Switch component.
 * @module design/forms/switch
 *
 * Switch introduces no new token dimensions — it re-exports FORM_TOKENS
 * and adds its own defaults and constants.
 *
 * Default `variant` is `"ghost"` (applied inline in {@link useSwitch}) for the
 * traditional label-only appearance. Pass `variant="outlined"` or `variant="soft"`
 * for a bordered "selectable card" style.
 *
 * @see {@link FORM_TOKENS}   in `forms/forms.tokens.ts`
 * @see {@link SwitchProps}   in `forms/switch/switch.props.ts`
 * @see {@link useSwitch}     in `forms/switch/switch.hook.ts`
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export { FORM_TOKENS as SWITCH_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

export type SwitchSize    = FormSize;
export type SwitchVariant = FormVariant;
export type SwitchColor   = FormColor;
export type SwitchRadius  = FormRadius;

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;
export type  LabelPosition   = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const SWITCH_DEFAULTS = {
  labelPosition: "end" as LabelPosition,
} as const;

!!!

---

## table.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/table.tokens.ts`


!!!ts
// design/data/table/table.tokens.ts

/**
 * TABLE TOKEN SPEC
 * ─────────────────────────────────────────────────────────────────────────────
 * Table adds one token dimension on top of what DataProps/useData already covers:
 *
 *   layout  → --table-layout   CSS table-layout property (auto | fixed)
 *             + modifier class (.table--auto | .table--fixed)
 *
 * All color channels, density, variant, and state tokens are inherited from
 * the data category and resolved by useData. TABLE_TOKENS is only passed to
 * resolveTokens for table-specific dimensions.
 *
 * DATA-DRIVEN MODE TYPES
 * ─────────────────────────────────────────────────────────────────────────────
 * ColumnDef    Column configuration for <Table data={rows} columns={cols} />
 * RowData      A single row record — open Record shape
 * TableSort    Current sort state { key, direction }
 * TableAlign   Column text alignment (start | center | end)
 *
 * For rich cell content (badges, actions, nested components) use compound
 * mode instead: <TableBody><TableRow><TableCell>...</TableCell></TableRow></TableBody>
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";

// ─── TABLE-ONLY SCALES ────────────────────────────────────────

/**
 * CSS table-layout algorithm.
 *
 *   auto   Browser sizes columns from content — flexible but slower to render.
 *          Good for variable content where you want columns to self-size.
 *
 *   fixed  Columns sized from first row / explicit widths — faster to render.
 *          Required for sticky columns and reliable column widths.
 *          Use when column count and widths are known ahead of time.
 */
const TABLE_LAYOUT_SCALE = scale({
  auto:  "auto",
  fixed: "fixed",
});

/**
 * Column text alignment. Applied per column via ColumnDef.align.
 * Not a component-level token dimension — used within ColumnDef only.
 */
const TABLE_ALIGN_SCALE = scale({
  start:  null,
  center: null,
  end:    null,
});

// ─── TOKEN SPEC ───────────────────────────────────────────────

export const TABLE_TOKENS = defineTokens({
  /**
   * CSS table-layout algorithm.
   * Sets --table-layout channel + modifier class (.table--auto | .table--fixed).
   */
  layout: dimension("layout", TABLE_LAYOUT_SCALE, { modifier: true }),
});

// ─── DATA-DRIVEN MODE TYPES ───────────────────────────────────

/** A single row record. Values are unknown — format() in ColumnDef handles display. */
export type RowData = Record<string, unknown>;

/**
 * Column definition for data-driven mode.
 *
 * @example
 * const columns: ColumnDef[] = [
 *   { key: "name",   heading: "Name",   width: "200px" },
 *   { key: "status", heading: "Status", align: "center" },
 *   { key: "amount", heading: "Amount", align: "end",
 *     format: (v) => `$${Number(v).toFixed(2)}` },
 * ]
 */
export interface ColumnDef {
  /** Property key on the row record. Must match a key in RowData. */
  key: string;

  /** Text shown in the column header (<th>). */
  heading: string;

  /**
   * Text alignment for all cells in this column.
   * Defaults to "start". Use "end" for numeric columns.
   */
  align?: TableAlign;

  /**
   * Explicit CSS column width.
   * Any valid CSS length: "200px" | "20ch" | "15%" | "auto"
   * Requires layout="fixed" on the Table to be respected reliably.
   */
  width?: string;

  /**
   * Whether this column is sortable. Overrides the table-level sortable prop.
   * Set false to disable sorting on a specific column when sortable is true globally.
   */
  sortable?: boolean;

  /**
   * String transformation applied to the cell value before rendering.
   * For rich content (badges, icons, nested components) use compound mode instead.
   *
   * @param value - The raw value from the row record at this column's key
   * @param row   - The full row record, for multi-field formatting
   * @returns     - The string to render in the cell
   */
  format?: (value: unknown, row: RowData) => string;
}

/**
 * Current sort state. Consumers manage this externally and pass it back
 * to Table — Table only renders the visual sort indicators.
 *
 * @example
 * let sort: TableSort = { key: "name", direction: "asc" };
 */
export interface TableSort {
  key:       string;
  direction: "asc" | "desc";
}

// ─── DERIVED TYPES ────────────────────────────────────────────

export type TableLayout = keyof typeof TABLE_LAYOUT_SCALE;
export type TableAlign  = keyof typeof TABLE_ALIGN_SCALE;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const TABLE_DEFAULTS = {
  layout:       "auto",
  stickyHeader: false,
  sortable:     false,
} as const satisfies {
  layout:       TableLayout;
  stickyHeader: boolean;
  sortable:     boolean;
};
!!!

---

## tabs.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/tabs.tokens.ts`


!!!ts
export { NAV_TOKENS as TABS_TOKENS } from "../../nav.tokens";
export type { NavSize as TabsSize, NavVariant as TabsVariant } from "../../nav.tokens";

!!!

---

## tag.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/tag/tag.tokens.ts`


!!!ts
// design/feedback/components/tag/tag.tokens.ts

export { FEEDBACK_TOKENS as TAG_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as TagSize,
  FeedbackVariant as TagVariant,
  FeedbackColor   as TagColor,
  FeedbackRadius  as TagRadius,
} from "../../feedback.tokens";

export const TAG_DEFAULTS = {
  variant: "soft",
  color:   "neutral",
  size:    "md",
  radius:  "sm",
} as const;

!!!

---

## text.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/text/text.tokens.ts`


!!!ts
// design/typography/text/text.tokens.ts

/**
 * Text re-exports the full typography spec unchanged.
 * Text has no additional dimensions and no narrowed values —
 * it exposes the complete typography vocabulary as-is.
 */
export { TYPOGRAPHY_TOKENS as TEXT_TOKENS } from "../../typography.tokens";

export type {
  TypeSize       as TextSize,
  TypeWeight     as TextWeight,
  TypeColor      as TextColor,
  TypeAlign      as TextAlign,
  TypeLeading    as TextLeading,
  TypeTracking   as TextTracking,
  TypeFamily     as TextFamily,
  TypeTransform  as TextTransform,
  TypeWrap       as TextWrap,
  TypeDecoration as TextDecoration,
  TypeStyle      as TextStyle,
} from "../../typography.tokens";

export const TEXT_DEFAULTS = {
  as: "p",
} as const;
!!!

---

## textarea.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/textarea/textarea.tokens.ts`


!!!ts
// design/forms/components/textarea/textarea.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Textarea component.
 * @module design/forms/textarea
 *
 * Textarea extends FORM_TOKENS with a `resize` dimension scoped to "textarea"
 * so only `textarea.css` reads `--textarea--resize`. All other form token
 * dimensions are inherited unchanged.
 *
 * @see {@link FORM_TOKENS}     in `forms/forms.tokens.ts`
 * @see {@link TextareaProps}   in `forms/textarea/textarea.props.ts`
 * @see {@link useTextarea}     in `forms/textarea/textarea.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FORM_TOKENS } from "~f/forms.tokens";
import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── RESIZE SCALE ─────────────────────────────────────────────────────────────

const RESIZE = scale({
  none:     "none",
  vertical: "vertical",
  both:     "both",
});

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export const TEXTAREA_TOKENS = composeTokens(FORM_TOKENS, {
  // scope: "textarea" — only textarea.css reads --textarea--resize
  resize: dimension("resize", RESIZE, { scope: "textarea" }),
});

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

export type TextareaResize  = keyof typeof TEXTAREA_TOKENS.resize.values;
export type TextareaSize    = FormSize;
export type TextareaVariant = FormVariant;
export type TextareaColor   = FormColor;
export type TextareaRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const TEXTAREA_DEFAULTS = {
  resize: "vertical" as TextareaResize,
  rows:   3,
} as const;

!!!

---

## theme-toggle.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/theme-toggle/theme-toggle.tokens.ts`


!!!ts
// design/triggers/components/theme-toggle/theme-toggle.tokens.ts

/**
 * ThemeToggle tokens & defaults.
 *
 * The toggle is a thin wrapper around Button so it re-exports the button
 * tokens as-is. The THEME_TOGGLE_DEFAULTS object provides opinionated
 * defaults that make the toggle look good with zero props.
 *
 * localStorage key and data-attribute name are also defined here so the
 * client script and the SSR detection in Head.astro stay in sync.
 */

export { BUTTON_SIZE_MAP as THEME_TOGGLE_SIZE_MAP } from "~tr/components/button/button.tokens";

/* ─── THEME CONSTANTS ─────────────────────────────────────── */

/** localStorage key used to persist the user preference. */
export const THEME_STORAGE_KEY = "theme" as const;

/** Value stored / read from localStorage and set on <html data-theme>. */
export type Theme = "light" | "dark";

/* ─── COMPONENT DEFAULTS ──────────────────────────────────── */

export const THEME_TOGGLE_DEFAULTS = {
  variant:  "ghost"   as const,
  color:    "neutral" as const,
  size:     "md"      as const,
  iconOnly: true,
} as const;

!!!

---

## tile.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/tile/tile.tokens.ts`


!!!ts
// design/surfaces/components/tile/tile.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const TILE_DEFAULTS = {
  layer:   "3"  as SurfaceLayer, // tile/panel tier
  padding: "md" as SurfacePadding,
} as const;

!!!

---

## time-picker.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/time-picker/time-picker.tokens.ts`


!!!ts

!!!

---

## toast.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/toast/toast.tokens.ts`


!!!ts
// design/feedback/components/toast/toast.tokens.ts

import { FEEDBACK_TOKENS }                                     from "../../feedback.tokens";
import { SPACE }                                               from "~/shared/primitives.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant,
              FeedbackSize }                                   from "../../feedback.tokens";

export { FEEDBACK_TOKENS as TOAST_TOKENS };
export type { FeedbackColor as ToastColor, FeedbackVariant as ToastVariant,
              FeedbackRadius as ToastRadius, FeedbackSize as ToastSize };

export type ToastPosition =
  | "top-start" | "top-center" | "top-end"
  | "bottom-start" | "bottom-center" | "bottom-end";

export const TOAST_DEFAULTS = {
  variant:     "soft"         as FeedbackVariant,
  color:       "neutral"      as FeedbackColor,
  radius:      "md"           as FeedbackRadius,
  size:        "md"           as FeedbackSize,
  duration:    4000,
  dismissible: true,
  position:    "bottom-end"   as ToastPosition,
} as const;

const {
  "2xs": xxs,
  "2xl": xxl,
} = SPACE;

export const TOAST_SIZE_MAP: Record<FeedbackSize, { fontSize: string; p: string }> = {
  "2xs": { fontSize: "var(--fsf--xs)",  p: xxs },
  xs:   { fontSize: "var(--fsf--xs)",   p: SPACE.xs },
  sm:   { fontSize: "var(--fsf--sm)",   p: SPACE.sm },
  md:   { fontSize: "var(--fsf--sm)",   p: SPACE.md },
  lg:   { fontSize: "var(--fsf--md)",   p: SPACE.md },
  xl:   { fontSize: "var(--fsf--lg)",   p: SPACE.md },
  "2xl": { fontSize: "var(--fsf--xl)", p: xxl },
};

!!!

---

## alert-dialog.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.tokens.ts`


!!!ts
export { OVERLAY_TOKENS } from "../../overlays.tokens";
export type { OverlaySize, OverlayVariant, OverlayRadius } from "../../overlays.tokens";

export const ALERT_DIALOG_DEFAULTS = {
  size:      "sm"       as const,
  variant:   "centered" as const,
  // AlertDialog requires an explicit button choice — no backdrop dismiss, no Esc by default
  closeOnEsc: false,
} as const;

!!!

---

---

## alert.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/alert.tokens.ts`


!!!ts
// design/feedback/components/alert/alert.tokens.ts

import { FEEDBACK_TOKENS }                                     from "../../feedback.tokens";
import { SPACE }                                               from "~/shared/primitives.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant,
              FeedbackSize }                                   from "../../feedback.tokens";

export { FEEDBACK_TOKENS as ALERT_TOKENS };
export type { FeedbackColor as AlertColor, FeedbackVariant as AlertVariant,
              FeedbackRadius as AlertRadius, FeedbackSize as AlertSize };

export const ALERT_DEFAULTS = {
  variant: "soft"    as FeedbackVariant,
  color:   "neutral" as FeedbackColor,
  radius:  "md"      as FeedbackRadius,
  size:    "md"      as FeedbackSize,
} as const;

const {
  "2xs": xxs,
  "2xl": xxl,
} = SPACE;

xxs === SPACE["2xs"];
xxl === SPACE["2xl"];

export const ALERT_SIZE_MAP: Record<FeedbackSize, { fontSize: string; p: string; gap: string }> = {
  "2xs": { fontSize: "var(--fsf--xs)",  p: xxs, gap: SPACE["2xs"] },
  xs: { fontSize: "var(--fs--2xs)", p: SPACE.xs, gap: SPACE.xs },
  sm: { fontSize: "var(--fs--xs)",  p: SPACE.sm, gap: SPACE.xs },
  md: { fontSize: "var(--fs--sm)",  p: SPACE.md, gap: SPACE.sm },
  lg: { fontSize: "var(--fs--md)",  p: SPACE.md, gap: SPACE.sm },
  xl: { fontSize: "var(--fs--lg)",  p: SPACE.md, gap: SPACE.md },
  "2xl": { fontSize: "var(--fs--xl)", p: xxl, gap: SPACE.md },
};


!!!

---

---

## audio.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.tokens.ts`


!!!ts
// design/assets/audio/audio.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM, SPACE, COLOR_DIM } from "~/shared/primitives.tokens";

const AUDIO_SIZE = scale({
  sm: null,
  md: null,
  lg: null,
});

// Visual chrome treatment — mirrors trigger/feedback variant vocabulary.
// solid    → filled bg at color-base, on-color text
// soft     → subtle tinted bg, color-border border (default)
// outlined → transparent bg, visible border
// ghost    → no border, no bg — bare controls only
const AUDIO_VARIANT = scale({
  solid:    null,
  soft:     null,
  outlined: null,
  ghost:    null,
});

// Layout mode — controls arrangement, not color.
// default → stacked rows (controls / seek / secondary)
// minimal → hide volume + rate row
// compact → single-row layout
const AUDIO_LAYOUT = scale({
  default: null,
  minimal: null,
  compact: null,
});

export const AUDIO_TOKENS = defineTokens({
  radius:  RADIUS_DIM,
  padding: dimension("padding", SPACE),
  size:    dimension("size",    AUDIO_SIZE,    { modifier: true }),
  variant: dimension("variant", AUDIO_VARIANT, { modifier: true }),
  layout:  dimension("layout",  AUDIO_LAYOUT,  { modifier: true }),
  color:   COLOR_DIM,
});

export type AudioSize    = keyof typeof AUDIO_TOKENS.size.values;
export type AudioVariant = keyof typeof AUDIO_TOKENS.variant.values;
export type AudioLayout  = keyof typeof AUDIO_TOKENS.layout.values;
export type AudioColor   = keyof typeof AUDIO_TOKENS.color.values;
export type AudioRadius  = keyof typeof AUDIO_TOKENS.radius.values;

export const AUDIO_DEFAULTS = {
  size:    "md"      as AudioSize,
  variant: "soft"    as AudioVariant,
  layout:  "default" as AudioLayout,
  color:   "primary" as AudioColor,
  preload: "metadata" as const,
} as const;

!!!

---

---

## avatar-group.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/avatar-group.tokens.ts`


!!!ts

!!!

---

---

## avatar.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/avatar.tokens.ts`


!!!ts
// design/assets/components/avatar/avatar.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * Avatar token spec.
 *
 * prop       channel                CSS property
 * ─────────────────────────────────────────────────────────────────
 * size     → --avatar--size        width + height
 * radius   → --avatar--radius      border-radius
 * status   → (modifier class only) [data-status] drives dot color
 */

const AVATAR_SIZE = scale({
  "2xs": "var(--avatar--size-2xs, 1.25rem)",
  xs:    "var(--avatar--size-xs,  1.5rem)",
  sm:    "var(--avatar--size-sm,  2rem)",
  md:    "var(--avatar--size-md,  2.5rem)",
  lg:    "var(--avatar--size-lg,  3rem)",
  xl:    "var(--avatar--size-xl,  3.75rem)",
  "2xl": "var(--avatar--size-2xl, 5rem)",
});

const AVATAR_STATUS = scale({
  online:  null,
  offline: null,
  away:    null,
  busy:    null,
});

export const AVATAR_TOKENS = defineTokens({
  size:   dimension("size",   AVATAR_SIZE),
  radius: RADIUS_DIM,
  status: dimension("status", AVATAR_STATUS, { modifier: true }),
});

export type AvatarSize   = keyof typeof AVATAR_TOKENS.size.values;
export type AvatarRadius = keyof typeof AVATAR_TOKENS.radius.values;
export type AvatarStatus = keyof typeof AVATAR_TOKENS.status.values;

export const AVATAR_DEFAULTS = {
  size:   "md"    as AvatarSize,
  radius: "full"  as AvatarRadius,
} as const;

!!!

---

---

## backdrop.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/backdrop.tokens.ts`


!!!ts

!!!

---

---

## badge.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/badge.tokens.ts`


!!!ts
// design/feedback/badge/badge.tokens.ts

/**
 * @file Token spec and defaults for the Badge component.
 * @module design/feedback/badge
 *
 * Badge re-uses the full {@link FEEDBACK_TOKENS} spec unchanged.
 * Defaults are opinionated for the most common use case: a small solid
 * danger notification count overlaid on another element.
 *
 * Component-specific size mapping (see badge.css):
 *   xs  → 14px diameter (dot mode), 10px font, minimal padding
 *   sm  → 18px min-height, 11px font          ← default
 *   md  → 22px min-height, 12px font
 *   lg  → 26px min-height, 14px font
 *   xl  → 32px min-height, 16px font
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useBadge}        in `feedback/badge/badge.hook.ts`
 */

export { FEEDBACK_TOKENS as BADGE_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as BadgeSize,
  FeedbackVariant as BadgeVariant,
  FeedbackColor   as BadgeColor,
  FeedbackRadius  as BadgeRadius,
} from "../../feedback.tokens";

/**
 * Opinionated defaults for the Badge component.
 *
 * These are applied in {@link useBadge} when props are omitted, overriding
 * the category-level defaults from {@link useFeedback}.
 */
export const BADGE_DEFAULTS = {
  variant: "solid",
  color:   "danger",   // most common: notification count
  size:    "sm",
  radius:  "full",     // pill shape
  max:     99,
  dot:     false,
} as const;

!!!

---

---

## banner.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/banner.tokens.ts`


!!!ts
// design/feedback/components/banner/banner.tokens.ts

import { FEEDBACK_TOKENS } from "../../feedback.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant } from "../../feedback.tokens";

export { FEEDBACK_TOKENS as BANNER_TOKENS };
export type { FeedbackColor as BannerColor, FeedbackVariant as BannerVariant, FeedbackRadius as BannerRadius };

export const BANNER_DEFAULTS = {
  variant: "soft"    as FeedbackVariant,
  color:   "neutral" as FeedbackColor,
  radius:  "none"    as FeedbackRadius,
} as const;

!!!

---

---

## box.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/box.tokens.ts`


!!!ts
// design/layout/box/box.tokens.ts

/**
 * Box Token Spec
 *
 * Box re-exports the full layout spec.
 * Box adds radius — a dimension the layout category doesn't have —
 * since Box is specifically a visual container, not just a flow primitive.
 */

import { composeTokens } from "~sh/tokens";
import { LAYOUT_TOKENS } from "~l/layout.tokens";
import { RADIUS_DIM } from "~sh/primitives.tokens";

/**
 * Merges general Layout tokens (gap, align, justify) with Box-specific
 * visual dimensions like border radius.
 */
export const BOX_TOKENS = composeTokens(LAYOUT_TOKENS, {
  radius: RADIUS_DIM,
});

export type { LayoutGap as BoxGap, LayoutAlign as BoxAlign, LayoutJustify as BoxJustify }
  from "~l/layout.tokens";

/** Valid values for border radius. */
export type BoxRadius = keyof typeof BOX_TOKENS.radius.values;

/** Supported HTML tags for the Box component polymorphism. */
export type BoxTag =
  | "div" | "section" | "article" | "aside"
  | "main" | "nav" | "header" | "footer"
  | "ul" | "ol" | "figure" | "form" | "span";

export const BOX_DEFAULTS = {
  as: "div" as BoxTag,
} as const;
!!!

---

---

## breadcrumbs.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/breadcrumbs.tokens.ts`


!!!ts
export { NAV_TOKENS as BREADCRUMBS_TOKENS } from "../../nav.tokens";

!!!

---

---

## button-group.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/button-group.tokens.ts`


!!!ts

!!!

---

---

## button.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/button.tokens.ts`


!!!ts
// design/triggers/button/button.tokens.ts

export { TRIGGER_TOKENS as BUTTON_TOKENS } from "../../trigger.tokens";
export type { TriggerVariant as ButtonVariant, TriggerColor as ButtonColor, TriggerRadius as ButtonRadius }
  from "../../trigger.tokens";

/* ─── SIZE MAP ───────────────────────────────────────────── */
// p  = padding-block
// pi = padding-inline
// fs = font-size
// h  = min-height

export const BUTTON_SIZE_MAP = {
  "2xs": { p: "var(--space-in--3xs)", pi: "var(--space-in--2xs)",  fs: "var(--fs--3xs)", h: "var(--ui-height--2xs)" },
  xs: { p: "var(--space-in--2xs)", pi: "var(--space-in--xs)",  fs: "var(--fs--2xs)", h: "var(--ui-height--xs)" },
  sm: { p: "var(--space-in--xs)",  pi: "var(--space-in--sm)",  fs: "var(--fs--xs)", h:  "var(--ui-height--sm)" },
  md: { p: "var(--space-in--md)",  pi: "var(--space-in--md)",  fs: "var(--fs--sm)", h:  "var(--ui-height--md)" },
  lg: { p: "var(--space-in--md)",  pi: "var(--space-in--lg)",  fs: "var(--fs--md)", h: "var(--ui-height--lg)" },
  xl: { p: "var(--space-in--lg)",  pi: "var(--space-in--xl)",  fs: "var(--fs--lg)", h: "var(--ui-height--xl)" },
  "2xl": { p: "var(--space-in--lg)",  pi: "var(--space-in--2xl)",  fs: "var(--fs--xl)", h: "var(--ui-height--2xl)" },
  
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_MAP;

export function resolveButtonSize(size: ButtonSize): string[] {
  const { p, pi, fs, h } = BUTTON_SIZE_MAP[size];
  return [
    `--button--p: ${p}`,
    `--button--pi: ${pi}`,
    `--button--fs: ${fs}`,
    `--button--h: ${h}`,
  ];
}

if (process.env.NODE_ENV === "development") {
  const assert = (cond: boolean, msg: string) => { if (!cond) throw new Error(`resolveButtonSize: ${msg}`); };
  const _md = resolveButtonSize("md");
  assert(_md.length === 4, "4 channels per size");
  assert(_md.every(s => s.startsWith("--button--")), "all channels are button-scoped");
  const _keys = ["p", "pi", "fs", "h"] as const;
  assert(_keys.every((k, i) => (_md[i] ?? "").startsWith(`--button--${k}:`)), "channels in order: p, pi, fs, h");
}

/* ─── CONSTANTS ──────────────────────────────────────────── */

export const BUTTON_TYPES   = ["button", "submit", "reset"] as const;
export const BUTTON_TARGETS = ["_self", "_blank", "_parent", "_top"] as const;

export type ButtonType   = typeof BUTTON_TYPES[number];
export type ButtonTarget = typeof BUTTON_TARGETS[number];

/* ─── DEFAULTS ───────────────────────────────────────────── */

export const BUTTON_DEFAULTS = {
  size:      "md"      as ButtonSize,
  type:      "button"  as ButtonType,
  iconOnly:  false,
  fullWidth: false,
} as const;
!!!

---

---

## caption.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/caption.tokens.ts`


!!!ts
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
!!!

---

---

## card.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/card.tokens.ts`


!!!ts
// design/surfaces/components/card/card.tokens.ts

/**
 * Card re-exports the full surface spec unchanged.
 * Card's unique features (href, interactive, selectable, selected, disabled)
 * are behavioral props — not token dimensions — so no composeTokens needed.
 */
export { SURFACE_TOKENS as CARD_TOKENS } from "../../surface.tokens";
export type {
  SurfaceLayer   as CardLayer,
  SurfacePadding as CardPadding,
  SurfaceRadius  as CardRadius,
  ColorRole      as CardColor,
} from "../../surface.tokens";

import type { CardTag } from "./card.props";
import type { SurfaceLayer } from "../../surface.tokens";

export const CARD_DEFAULTS = {
  as:          "div"  as CardTag,
  layer:       "2"    as SurfaceLayer,  // card tier
  outlined:    true,                    // cards default to outlined; layer-3 border + explicit override
  padding:     "md"   as const,
  radius:      "md"   as const,
  interactive: false,
  selectable:  false,
  selected:    false,
  disabled:    false,
} as const;

!!!

---

---

## carousel.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/carousel.tokens.ts`


!!!ts

!!!

---

---

## center.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/center.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const CENTER_TOKENS = composeTokens(LAYOUT_TOKENS, {});
export type CenterDirection = "x" | "y" | "both";

export const CENTER_DEFAULTS = {
  direction: "both" as CenterDirection,
} as const;

!!!

---

---

## checkbox.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/checkbox.tokens.ts`


!!!ts
// design/forms/checkbox/checkbox.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Checkbox component.
 * @module design/forms/checkbox
 *
 * Checkbox introduces no new token dimensions and follows the re-export pattern.
 *
 * @remarks
 * **Three-state check model via {@link CheckState}:**
 * Rather than separate `checked: boolean` and `indeterminate: boolean` props
 * (which can conflict when both are `true`), Checkbox uses a single
 * `checkState` prop typed as `"checked" | "unchecked" | "indeterminate"`.
 * This makes the three states mutually exclusive by type and maps cleanly
 * to the select-all checkbox pattern:
 *
 * !!!ts
 * const state: CheckState =
 *   allSelected  ? "checked"       :
 *   noneSelected ? "unchecked"     :
 *                  "indeterminate";
 * !!!
 *
 * `undefined` and `"unchecked"` are treated identically in {@link useCheckbox}.
 *
 * **Default variant is `"ghost"`** — traditional checkbox appearance with no
 * border/background on the wrapper. Pass `variant="outlined"` or `variant="soft"`
 * for a bordered/filled "selectable chip" style.
 *
 * **`labelPosition` is not a token dimension** — it emits a class modifier
 * directly in {@link useCheckbox}.
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts`
 * @see {@link CheckboxProps}  in `forms/checkbox/checkbox.props.ts`
 * @see {@link useCheckbox}    in `forms/checkbox/checkbox.hook.ts`
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export { FORM_TOKENS as CHECKBOX_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type CheckboxSize    = FormSize;
/** @see {@link FormVariant} */
export type CheckboxVariant = FormVariant;
/** @see {@link FormColor} */
export type CheckboxColor   = FormColor;
/** @see {@link FormRadius} */
export type CheckboxRadius  = FormRadius;

// ─── CHECK STATE ──────────────────────────────────────────────────────────────

/**
 * The three mutually exclusive visual states of a checkbox.
 *
 * Replaces the separate `checked: boolean` and `indeterminate: boolean` props
 * that could otherwise conflict when both are `true`.
 *
 * | Value             | Native mapping                                        |
 * |-------------------|-------------------------------------------------------|
 * | `"checked"`       | `checked` attribute present on `<input>`              |
 * | `"unchecked"`     | `checked` attribute absent (default)                  |
 * | `"indeterminate"` | `checked` absent + `.indeterminate = true` via script |
 *
 * `undefined` is treated identically to `"unchecked"` in {@link useCheckbox}.
 *
 * @example
 * !!!ts
 * // Driven by a select-all parent:
 * const checkState: CheckState =
 *   selected.length === options.length ? "checked"       :
 *   selected.length === 0             ? "unchecked"     :
 *                                       "indeterminate";
 *
 * <Checkbox name="all" checkState={checkState}>Select all</Checkbox>
 * !!!
 */
export const CHECK_STATES = ["checked", "unchecked", "indeterminate"] as const;

/** Valid values for the `checkState` prop. */
export type CheckState = typeof CHECK_STATES[number];

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

/**
 * Valid positions for the label slot relative to the indicator.
 * CSS reorders visually via flex-direction — DOM order never changes.
 */
export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;

/** Valid values for the `labelPosition` prop. */
export type LabelPosition = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Checkbox component.
 *
 * `variant` is not declared here — its default (`"ghost"`) is applied
 * inline in {@link useCheckbox} before delegating to {@link useForm}.
 *
 * @see {@link useCheckbox}
 */
export const CHECKBOX_DEFAULTS = {
  checkState:    "unchecked" as CheckState,
  labelPosition: "end"       as LabelPosition,
} as const;
!!!

---

---

## chip.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/chip.tokens.ts`


!!!ts
// design/feedback/components/chip/chip.tokens.ts

export { FEEDBACK_TOKENS as CHIP_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as ChipSize,
  FeedbackVariant as ChipVariant,
  FeedbackColor   as ChipColor,
  FeedbackRadius  as ChipRadius,
} from "../../feedback.tokens";

export const CHIP_DEFAULTS = {
  variant: "outlined",
  color:   "neutral",
  size:    "md",
  radius:  "full",
} as const;

!!!

---

---

## code.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/code.tokens.ts`


!!!ts
// design/typography/components/code/code.tokens.ts
import type { TypeSize, TypeFamily } from "../../typography.tokens";

export const CODE_DEFAULTS = {
  fam: "mono" as TypeFamily,
} as const;

export const PRE_DEFAULTS = {
  fam: "mono" as TypeFamily,
  size: "sm" as TypeSize,
} as const;

!!!

---

---

## color-picker.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/color-picker.tokens.ts`


!!!ts

!!!

---

---

## columns.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/columns.tokens.ts`


!!!ts

!!!

---

---

## combobox.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/combobox.tokens.ts`


!!!ts
// design/forms/combobox/combobox.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Combobox component.
 * @module design/forms/combobox
 *
 * Combobox introduces no new token dimensions and re-exports {@link FORM_TOKENS}.
 *
 * @remarks
 * **Combobox vs Select:**
 * Select renders a native `<select>` element — the OS/browser controls the
 * dropdown appearance. Combobox renders a text `<input>` + a custom
 * `<ul role="listbox">` dropdown, giving full CSS control over the option
 * list. The trade-off: Combobox requires a client-side JS controller for
 * filtering, keyboard navigation, and selection.
 *
 * **Two-input pattern:**
 * Combobox renders two `<input>` elements:
 * 1. `<input type="text">` (visible) — for display and filtering
 * 2. `<input type="hidden">` — submits the selected option's `value` to the form
 *
 * This separation means the displayed label (e.g. "United States") and the
 * submitted value (e.g. `"us"`) can differ, which is the standard combobox
 * behaviour.
 *
 * **Single-select only:**
 * Multi-select (tag/chip input) is a distinct component with significantly
 * different UX and DOM structure. Combobox is single-select.
 *
 * @see {@link FORM_TOKENS}      in `forms/forms.tokens.ts`
 * @see {@link ComboboxProps}    in `forms/combobox/combobox.props.ts`
 * @see {@link useCombobox}      in `forms/combobox/combobox.hook.ts`
 * @see {@link ComboboxOption}   in `forms/combobox/combobox.props.ts` — shared option type
 *
 * @todo Multi-select (tag input) when needed. New component, new folder —
 *   this file stays unchanged.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Combobox token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as COMBOBOX_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type ComboboxSize    = FormSize;
/** @see {@link FormVariant} */
export type ComboboxVariant = FormVariant;
/** @see {@link FormColor} */
export type ComboboxColor   = FormColor;
/** @see {@link FormRadius} */
export type ComboboxRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Combobox component.
 *
 * @see {@link useCombobox} in `forms/combobox/combobox.hook.ts`
 */
export const COMBOBOX_DEFAULTS = {
  /** Combobox typically fills its container. */
  fullWidth: true,
} as const;

!!!

---

---

## command-palette.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/command-palette.tokens.ts`


!!!ts

!!!

---

---

## container.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/container.tokens.ts`


!!!ts
import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const CONTAINER_SIZE = scale({
  sm: "var(--container--sm)",
  md: "var(--container--md)",
  lg: "var(--container--lg)",
  xl: "var(--container--xl)",
  "2xl": "var(--container--2xl)",
  full: "var(--container--full)",
});

export const CONTAINER_TOKENS = composeTokens(LAYOUT_TOKENS, {
  maxWidth: dimension("max-width", CONTAINER_SIZE),
});
export type ContainerMaxWidth = keyof typeof CONTAINER_TOKENS.maxWidth.values;

export type ContainerTag = "div" | "section" | "article" | "aside" | "main" | "header" | "footer";

export const CONTAINER_DEFAULTS = {
  as: "div" as ContainerTag,
  maxWidth: "lg" as ContainerMaxWidth,
} as const;

!!!

---

---

## context-menu.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/context-menu.tokens.ts`


!!!ts

!!!

---

---

## cropper.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/cropper.tokens.ts`


!!!ts

!!!

---

---

## date-picker.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/date-picker/date-picker.tokens.ts`


!!!ts

!!!

---

---

## dot.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/dot/dot.tokens.ts`


!!!ts
// design/feedback/components/dot/dot.tokens.ts
export { FEEDBACK_TOKENS as DOT_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as DotSize,
  FeedbackVariant as DotVariant,
  FeedbackColor   as DotColor,
  FeedbackRadius  as DotRadius,
} from "../../feedback.tokens";

export const DOT_DEFAULTS = {
  variant: "solid" as const,
  color:   "neutral" as const,
  size:    "md" as const,
  radius:  "full" as const,
} as const;

!!!

---

---

## drawer.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.tokens.ts`


!!!ts
import { defineTokens, scale, dimension } from "~/shared/tokens";

const DRAWER_PLACEMENT = scale({
  start:  null,
  end:    null,
  top:    null,
  bottom: null,
});

const DRAWER_SIZE = scale({
  sm:   null,
  md:   null,
  lg:   null,
  full: null,
});

export const DRAWER_TOKENS = defineTokens({
  placement: dimension("placement", DRAWER_PLACEMENT, { modifier: "placement" }),
  size:      dimension("size",      DRAWER_SIZE,      { modifier: "size" }),
});

export const DRAWER_DEFAULTS = {
  placement:       "end",
  size:            "md",
  closeOnBackdrop: true,
  closeOnEsc:      true,
} as const;

export type DrawerPlacement = keyof typeof DRAWER_TOKENS.placement.values;
export type DrawerSize      = keyof typeof DRAWER_TOKENS.size.values;

!!!

---

---

## dropdown-menu.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.tokens.ts`


!!!ts
export const DROPDOWN_MENU_DEFAULTS = {
  size: "md" as const,
  variant: "default" as const,
  radius: "md" as const,
};

!!!

---

---

## empty-state.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/empty-state/empty-state.tokens.ts`


!!!ts
export const EMPTY_STATE_DEFAULTS = {
  size: "md",
  variant: "soft",
  color: "neutral",
  radius: "md",
} as const;

!!!

---

---

## feed.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/feed/feed.tokens.ts`


!!!ts
import { composeTokens, dimension, scale } from "~/shared/tokens";
import { DATA_TOKENS } from "~/data/data.tokens";

export const FEED_DEFAULTS = {
  orientation: "vertical" as "vertical" | "horizontal",
} as const;

export const FEED_TOKENS = composeTokens(DATA_TOKENS, {
  orientation: dimension("orientation", scale({ vertical: null, horizontal: null }), { modifier: true }),
});

!!!

---

---

## field.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/field/field.tokens.ts`


!!!ts
// design/forms/field/field.tokens.ts

/**
 * @file Token spec and defaults for the Field component.
 * @module design/forms/field
 *
 * Field introduces no token dimensions of its own. It is a structural
 * wrapper — its job is spatial layout (stacking label, control, hint,
 * error, success) and accessibility id wiring, not visual styling.
 *
 * This file re-exports {@link FORM_TOKENS} to maintain a consistent
 * import path across the component quadruplet (tokens → props → hook → astro).
 * If Field ever needs a dimension (e.g. a `gap` prop to control spacing
 * between label and control), this file is the only change point.
 *
 * @remarks
 * **What Field is NOT:**
 * Field is not a form control. It does not extend {@link FormProps} because
 * it never renders an `<input>`, `<select>`, or `<textarea>`. Its `invalid`
 * and `required` props are state-communication props (they add `data-*`
 * attributes that CSS and the Astro template respond to) rather than
 * ARIA props that belong on a native form element.
 *
 * **Accessibility wiring:**
 * Field accepts an `id` prop and uses it to generate stable IDs for its
 * hint and error wrapper elements (`{id}-hint`, `{id}-error`). The consumer
 * is responsible for passing the same `id` to the control inside the default
 * slot and setting `aria-describedby="{id}-hint {id}-error"` on it.
 * Field cannot wire this automatically because Astro slots do not support
 * passing runtime values into slotted content at render time.
 *
 * @see {@link FieldProps}  in `forms/field/field.props.ts`  — prop surface
 * @see {@link useField}    in `forms/field/field.hook.ts`   — runtime logic
 * @see `forms/field/Field.astro`                             — slot structure
 *
 * @todo If a `gap` prop is needed to control spacing between field sections,
 *   add `gap: GAP` to a `composeTokens(FORM_TOKENS, { gap: GAP })` here
 *   and update {@link useField} to resolve it.
 */

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Field token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as FIELD_TOKENS } from "~f/forms.tokens";
!!!

---

---

## file-preview.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/file-preview/file-preview.tokens.ts`


!!!ts
// design/assets/components/file-preview/file-preview.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * FilePreview token spec.
 *
 * prop      channel                    CSS property
 * ─────────────────────────────────────────────────────────────────
 * size    → --file-preview--size       controls icon + card width
 * radius  → --file-preview--radius     border-radius
 * layout  → (modifier class only)      card vs strip
 */

const FILE_PREVIEW_SIZE = scale({
  xs: "var(--file-preview--size-xs, 4rem)",
  sm: "var(--file-preview--size-sm, 5rem)",
  md: "var(--file-preview--size-md, 7rem)",
  lg: "var(--file-preview--size-lg, 9rem)",
  xl: "var(--file-preview--size-xl, 12rem)",
});

const FILE_PREVIEW_LAYOUT = scale({
  card:  null,
  strip: null,
});

export const FILE_PREVIEW_TOKENS = defineTokens({
  size:   dimension("size",   FILE_PREVIEW_SIZE),
  radius: RADIUS_DIM,
  layout: dimension("layout", FILE_PREVIEW_LAYOUT, { modifier: true }),
});

export type FilePreviewSize   = keyof typeof FILE_PREVIEW_TOKENS.size.values;
export type FilePreviewRadius = keyof typeof FILE_PREVIEW_TOKENS.radius.values;
export type FilePreviewLayout = keyof typeof FILE_PREVIEW_TOKENS.layout.values;

export const FILE_PREVIEW_DEFAULTS = {
  size:   "md"   as FilePreviewSize,
  radius: "md"   as FilePreviewRadius,
  layout: "card" as FilePreviewLayout,
} as const;

/** Maps common extensions to a human-readable category label and accent color class. */
export const FILE_TYPE_MAP: Record<string, { label: string; color: string }> = {
  // Images
  jpg:  { label: "JPG",  color: "file-preview--type-image" },
  jpeg: { label: "JPEG", color: "file-preview--type-image" },
  png:  { label: "PNG",  color: "file-preview--type-image" },
  gif:  { label: "GIF",  color: "file-preview--type-image" },
  webp: { label: "WEBP", color: "file-preview--type-image" },
  svg:  { label: "SVG",  color: "file-preview--type-image" },
  avif: { label: "AVIF", color: "file-preview--type-image" },
  // Documents
  pdf:  { label: "PDF",  color: "file-preview--type-doc" },
  doc:  { label: "DOC",  color: "file-preview--type-doc" },
  docx: { label: "DOCX", color: "file-preview--type-doc" },
  txt:  { label: "TXT",  color: "file-preview--type-doc" },
  md:   { label: "MD",   color: "file-preview--type-doc" },
  // Spreadsheets
  xls:  { label: "XLS",  color: "file-preview--type-sheet" },
  xlsx: { label: "XLSX", color: "file-preview--type-sheet" },
  csv:  { label: "CSV",  color: "file-preview--type-sheet" },
  // Code
  js:   { label: "JS",   color: "file-preview--type-code" },
  ts:   { label: "TS",   color: "file-preview--type-code" },
  jsx:  { label: "JSX",  color: "file-preview--type-code" },
  tsx:  { label: "TSX",  color: "file-preview--type-code" },
  html: { label: "HTML", color: "file-preview--type-code" },
  css:  { label: "CSS",  color: "file-preview--type-code" },
  json: { label: "JSON", color: "file-preview--type-code" },
  // Audio / Video
  mp3:  { label: "MP3",  color: "file-preview--type-media" },
  wav:  { label: "WAV",  color: "file-preview--type-media" },
  mp4:  { label: "MP4",  color: "file-preview--type-media" },
  mov:  { label: "MOV",  color: "file-preview--type-media" },
  // Archives
  zip:  { label: "ZIP",  color: "file-preview--type-archive" },
  gz:   { label: "GZ",   color: "file-preview--type-archive" },
  tar:  { label: "TAR",  color: "file-preview--type-archive" },
};

!!!

---

---

## file-upload.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/file-upload/file-upload.tokens.ts`


!!!ts

!!!

---

---

## flex.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/flex.tokens.ts`


!!!ts
import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

export const FLEX_DIRECTION = scale({
  row: "row",
  col: "column",
  "row-rev": "row-reverse",
  "col-rev": "column-reverse",
});

export const FLEX_WRAP = scale({
  nowrap: "nowrap",
  wrap: "wrap",
  "wrap-rev": "wrap-reverse",
});

export const FLEX_TOKENS = composeTokens(LAYOUT_TOKENS, {
  direction: dimension("direction", FLEX_DIRECTION),
  wrap: dimension("wrap", FLEX_WRAP),
});
export type FlexDirection = keyof typeof FLEX_TOKENS.direction.values;
export type FlexWrap = keyof typeof FLEX_TOKENS.wrap.values;

export type FlexTag = "div" | "ul" | "ol" | "nav" | "header" | "footer" | "section" | "article" | "aside" | "main" | "form";

export const FLEX_DEFAULTS = {
  as: "div" as FlexTag,
  direction: "row" as FlexDirection,
  wrap: "nowrap" as FlexWrap,
} as const;

!!!

---

---

## footer.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/footer/footer.tokens.ts`


!!!ts
// design/layout/components/footer/footer.tokens.ts

/**
 * Footer Token Spec
 *
 * Footer re-exports the full layout spec unchanged. Like Header, it introduces
 * no new token dimensions — its opinionated defaults are expressed as default
 * values in FOOTER_DEFAULTS (applied by the hook) and CSS fallbacks in
 * footer.css (for purely visual concerns like background and border).
 *
 * The footer is intentionally minimal: it is a semantic landmark and a visual
 * container, nothing more. Any richer layout (multi-column link grids, etc.)
 * is composed with Box children inside the footer's slots, not via footer props.
 */

import { LAYOUT_TOKENS } from "~l/layout.tokens";
import type { Space } from "~sh/primitives.tokens";

export { LAYOUT_TOKENS as FOOTER_TOKENS };

export type {
  LayoutGap     as FooterGap,
  LayoutAlign   as FooterAlign,
  LayoutJustify as FooterJustify,
} from "~l/layout.tokens";

/**
 * Opinionated prop defaults applied by `useFooter` when the consumer omits a
 * value. All are overridable by passing the prop explicitly.
 *
 * @property px      - Horizontal padding. Matches HEADER_DEFAULTS.px so that
 *                     footer and header content align on the same column edge.
 * @property align   - Cross-axis alignment. Centers children vertically in the
 *                     row (relevant when footer is used as a single-row bar).
 * @property justify - Main-axis alignment. `between` mirrors the header default,
 *                     appropriate for copyright-left / links-right layouts.
 */
export const FOOTER_DEFAULTS = {
  px:      "lg"      as Space,
  align:   "center"  as const,
  justify: "between" as const,
} as const;

!!!

---

---

## frame.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.tokens.ts`


!!!ts
// design/surfaces/components/frame/frame.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const FRAME_DEFAULTS = {
  layer:   "0"    as SurfaceLayer, // default to no lift, just bounds
  padding: "none" as SurfacePadding, // default to no padding to fit media exactly
} as const;

!!!

---

---

## gallery-item.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery-item/gallery-item.tokens.ts`


!!!ts

!!!

---

---

## gallery.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery/gallery.tokens.ts`


!!!ts

!!!

---

---

## grid.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/grid.tokens.ts`


!!!ts
import { composeTokens, dimension, scale } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

/**
 * Grid columns. Works like CSS grid-template-columns.
 * @example
 *   <Grid columns="repeat(auto-fit, minmax(10rem, 1fr))">
 *     <span>…</span>
 *   </Grid>
 */
export const GRID_COLUMNS = scale({
  1: "repeat(1, minmax(0, 1fr))",
  2: "repeat(2, minmax(0, 1fr))",
  3: "repeat(3, minmax(0, 1fr))",
  4: "repeat(4, minmax(0, 1fr))",
  5: "repeat(5, minmax(0, 1fr))",
  6: "repeat(6, minmax(0, 1fr))",
  7: "repeat(7, minmax(0, 1fr))",
  8: "repeat(8, minmax(0, 1fr))",
  9: "repeat(9, minmax(0, 1fr))",
  10: "repeat(10, minmax(0, 1fr))",
  11: "repeat(11, minmax(0, 1fr))",
  12: "repeat(12, minmax(0, 1fr))",
});

// Add below GRID_COLUMNS
export const GRID_FIT = scale({
  xs: "repeat(auto-fit, minmax(10rem, 1fr))",
  sm: "repeat(auto-fit, minmax(14rem, 1fr))",
  md: "repeat(auto-fit, minmax(18rem, 1fr))",
  lg: "repeat(auto-fit, minmax(22rem, 1fr))",
  xl: "repeat(auto-fit, minmax(26rem, 1fr))",
});

export const GRID_TOKENS = composeTokens(LAYOUT_TOKENS, {
  columns: dimension("columns", GRID_COLUMNS),
  fit:     dimension("columns", GRID_FIT)
});
export type GridColumns = keyof typeof GRID_TOKENS.columns.values;
export type GridFit     = keyof typeof GRID_TOKENS.fit.values;

export type GridTag = "div" | "section" | "article" | "aside" | "main" | "ul" | "ol" | "form";

export const GRID_DEFAULTS = {
  as: "div" as GridTag,
} as const;

!!!

---

---

## header.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/header/header.tokens.ts`


!!!ts
// design/layout/components/header/header.tokens.ts

/**
 * Header Token Spec
 *
 * Header re-exports the full layout spec (gap, align, justify) unchanged.
 * It adds no new token dimensions — the header's opinionated defaults live
 * in HEADER_DEFAULTS as default values on existing LayoutProps, not as new
 * token dimensions.
 *
 * Visual defaults (background, min-height, bottom border) are expressed as
 * CSS fallback values in header.css so that the CSS file is the single source
 * of truth for "looks good out of the box" styling.
 */

import { LAYOUT_TOKENS } from "~l/layout.tokens";
import type { Space } from "~sh/primitives.tokens";

export { LAYOUT_TOKENS as HEADER_TOKENS };

export type {
  LayoutGap     as HeaderGap,
  LayoutAlign   as HeaderAlign,
  LayoutJustify as HeaderJustify,
} from "~l/layout.tokens";

/**
 * Opinionated prop defaults applied by `useHeader` when the consumer does not
 * explicitly set a value. Every key maps to an existing LayoutProp / SpacingProp.
 *
 * Overriding any of these is fully supported — pass the prop explicitly to the
 * `<Header>` component and the default is discarded.
 *
 * @property px      - Horizontal padding. Keeps content off the viewport edge.
 * @property align   - Cross-axis alignment. Centers children vertically.
 * @property justify - Main-axis alignment. Pushes start/end slots to opposite edges,
 *                     which is the correct default for logo-left / actions-right layouts.
 */
export const HEADER_DEFAULTS = {
  px:      "lg"      as Space,
  align:   "center"  as const,
  justify: "between" as const,
} as const;

!!!

---

---

## heading.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/heading/heading.tokens.ts`


!!!ts
// design/typography/heading/heading.tokens.ts

/**
 * Heading token spec.
 *
 * Extends the typography spec with one narrowed dimension:
 *
 * weight → narrowed to ["semibold", "bold", "black"]
 * Headings should always read as headings.
 * weight="normal" or weight="medium" are intentional
 * TypeScript errors at authoring time.
 *
 * All other dimensions are inherited from TYPOGRAPHY_TOKENS unchanged.
 * size, leading, and tracking have no defaults here — CSS fallbacks
 * per heading level (.h--1 through .h--6) handle appropriate defaults.
 *
 * Not exposed on HeadingProps (dropped intentionally):
 * clamp, truncate, fontStyle
 */
import { composeTokens, pickValues } from "~/shared/tokens";
import { TYPOGRAPHY_TOKENS } from "../../typography.tokens";
import { WEIGHT_DIM } from "~/shared/primitives.tokens";

export const HEADING_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
  weight: pickValues(WEIGHT_DIM, ["semibold", "bold", "black"] as const),
});

export type HeadingWeight = keyof typeof HEADING_TOKENS.weight.values;

export const HEADING_DEFAULTS = {
  level: 2,
} as const;

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type HeadingTag   = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
!!!

---

---

## icon.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/icon/icon.tokens.ts`


!!!ts
// design/assets/components/icon/icon.tokens.ts

/**
 * @file Token spec and defaults for the Icon component.
 * @module design/assets/icon
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { ICON_COLOR_DIM } from "~/shared/primitives.tokens";

// ─── SIZE ────────────────────────────────────────────────────────────────────
//
// Sizes map directly to the --icon--size-* CSS variables defined in tokens.css
//
// 2xs -> var(--icon--size-2xs)
// xs  -> var(--icon--size-xs)
// sm  -> var(--icon--size-sm)
// md  -> var(--icon--size-md)
// lg  -> var(--icon--size-lg)
// xl  -> var(--icon--size-xl)
// 2xl -> var(--icon--size-2xl)

const ICON_SIZE = scale({
  "2xs": null,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
  "2xl": null,
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const ICON_TOKENS = defineTokens({
  size: dimension("size", ICON_SIZE, { modifier: true }),
  color: ICON_COLOR_DIM,
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type IconSize = keyof typeof ICON_TOKENS.size.values;
export type IconColor = keyof typeof ICON_TOKENS.color.values;

/**
 * Opinionated defaults for the Icon component.
 */
export const ICON_DEFAULTS = {
  size: "md",
} as const;

!!!

---

---

## image.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/image/image.tokens.ts`


!!!ts
// design/assets/image/image.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * Image token spec.
 *
 * prop     channel              CSS property
 * ────────────────────────────────────────────────────────────
 * radius → --image--radius    border-radius
 * ratio  → --image--ratio     aspect-ratio  (via .image--ratio)
 * fit    → --image--fit       object-fit
 *
 * loading is a native HTML attribute — passed through directly,
 * not a token dimension.
 */

const RATIO = scale({
  square:    "1 / 1",
  landscape: "4 / 3",
  video:     "16 / 9",
  portrait:  "3 / 4",
  wide:      "21 / 9",
});

const FIT = scale({
  cover:   "cover",
  contain: "contain",
  fill:    "fill",
  none:    "none",
});

export const IMAGE_TOKENS = defineTokens({
  radius: RADIUS_DIM,
  ratio:  dimension("ratio", RATIO),
  fit:    dimension("fit",   FIT),
});

export type ImageRadius  = keyof typeof IMAGE_TOKENS.radius.values;
export type ImageRatio   = keyof typeof IMAGE_TOKENS.ratio.values;
export type ImageFit     = keyof typeof IMAGE_TOKENS.fit.values;

export const IMAGE_DEFAULTS = {
  fit:     "cover"  as ImageFit,
  loading: "lazy"   as const,
} as const;
!!!

---

---

## indent.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/indent/indent.tokens.ts`


!!!ts
/**
 * src/design/typography/components/indent/indent.tokens.ts
 */
export const INDENT_SIZES = ['ng', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export type IndentSize = typeof INDENT_SIZES[number];

export const INDENT_PROSE_TOKENS: Record<IndentSize, string> = {
  ng: '-1em',
  xs: '1em',
  sm: '1.5em',
  md: '2em',
  lg: '3em',
  xl: '4em',
};

export const INDENT_CODE_TOKENS: Record<IndentSize, string> = {
  ng: '-1ch',
  xs: '1ch',
  sm: '2ch',
  md: '3ch',
  lg: '4ch',
  xl: '5ch',
};

export const INDENT_UI_TOKENS: Record<IndentSize, string> = {
  ng: '-2ch',
  xs: '1ch',
  sm: '2ch',
  md: '4ch',
  lg: '6ch',
  xl: '8ch',
};

!!!

---

---

## indicator.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/indicator/indicator.tokens.ts`


!!!ts

!!!

---

---

## inline.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/inline.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */

export const INLINE_TOKENS = composeTokens(LAYOUT_TOKENS, {});

export type InlineGap = keyof typeof INLINE_TOKENS.gap.values;
export type InlineTag = "div" | "span" | "ul" | "ol" | "nav";

export const INLINE_DEFAULTS = {
  as: "span" as InlineTag,
  gap: "md" as InlineGap,
} as const;

!!!

---

---

## input-group.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input-group/input-group.tokens.ts`


!!!ts

!!!

---

---

## input.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input/input.tokens.ts`


!!!ts
// design/forms/input/input.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Input component.
 * @module design/forms/input
 *
 * Input introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec unchanged. This file therefore follows the
 * **re-export pattern**: it aliases the category spec and types, adds
 * Input-specific constant lists ({@link INPUT_TYPES}), and declares
 * the component defaults ({@link INPUT_DEFAULTS}).
 *
 * **Why this file exists even though it adds nothing to the spec:**
 * Consistent import paths across the component quadruplet (`tokens`,
 * `props`, `hook`, `*.astro`) mean no file ever has to reach up into
 * the category to import defaults or types. If Input later needs a new
 * dimension (e.g. a `prefix`/`suffix` layout mode), this file is the
 * only change point — no import churn elsewhere.
 *
 * **Architecture position:**
 * !!!
 * forms/forms.tokens.ts      FORM_TOKENS, FormSize, FormVariant, …
 *        ↑  re-export
 * forms/input/input.tokens.ts   INPUT_TOKENS (alias), INPUT_TYPES,
 *                                INPUT_DEFAULTS
 *        ↑  import types
 * forms/input/input.props.ts
 * forms/input/input.hook.ts
 * !!!
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts` — source spec
 * @see {@link InputProps}     in `forms/input/input.props.ts` — prop surface
 * @see {@link useInput}       in `forms/input/input.hook.ts` — runtime resolution
 * @see {@link INPUT_DEFAULTS} — default values applied when props are omitted
 *
 * @todo If Input ever needs a dimension not in FORM_TOKENS (e.g. `resize`
 *   for a multiline mode, or a layout dimension for prefix/suffix slots),
 *   switch from re-export to `composeTokens(FORM_TOKENS, { … })` here.
 *   No other files change except `input.hook.ts` (which would call
 *   `resolveTokens` on `INPUT_TOKENS` directly instead of delegating
 *   entirely to {@link useForm}).
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~/forms/forms.tokens";

// ─── SPEC ────────────────────────────────────────────────────────────────────

/**
 * Input token spec — re-exports {@link FORM_TOKENS} under a component-scoped
 * alias. The `INPUT_TOKENS` name is used by {@link useInput} in case a future
 * extension is needed (swap re-export for `composeTokens` without touch
 * anywhere else).
 *
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts` — the actual spec object
 */
export { FORM_TOKENS as INPUT_TOKENS } from "~/forms/forms.tokens";

// ─── TYPE ALIASES ────────────────────────────────────────────────────────────
// Re-export category types under Input-specific names.
// Consumers of InputProps import from here, not from forms.tokens.ts directly.

/** @see {@link FormSize} */
export type InputSize    = FormSize;
/** @see {@link FormVariant} */
export type InputVariant = FormVariant;
/** @see {@link FormColor} */
export type InputColor   = FormColor;
/** @see {@link FormRadius} */
export type InputRadius  = FormRadius;

// ─── COMPONENT CONSTANTS ─────────────────────────────────────────────────────

/**
 * The set of `type` values that `<Input>` supports.
 *
 * @remarks
 * This list covers text-entry input types only. Specialised types that
 * require distinct component behaviour — or are better served by a
 * dedicated component — are intentionally excluded:
 *
 * | Excluded type       | Recommended component          |
 * |---------------------|-------------------------------|
 * | `date`              | `DatePicker`                  |
 * | `time`              | `TimePicker`                  |
 * | `datetime-local`    | `DatePicker` (with time)      |
 * | `color`             | `ColorPicker`                 |
 * | `file`              | `FileUpload`                  |
 * | `range`             | `Slider`                      |
 * | `checkbox`          | `Checkbox`                    |
 * | `radio`             | `Radio`                       |
 * | `hidden`            | Use a plain `<input>` element |
 * | `button` / `submit` | `Button`                      |
 *
 * @see {@link InputType} — the union derived from this array
 *
 * @todo Add `"month"` and `"week"` if native date pickers are wanted
 *   before dedicated picker components are built. CSS-only, no other changes.
 */
export const INPUT_TYPES = [
  "text",
  "email",
  "password",
  "tel",
  "url",
  "number",
  "search",
] as const;

/**
 * Valid `type` attribute values for the Input component.
 * Derived from {@link INPUT_TYPES} — never hand-written.
 */
export type InputType = typeof INPUT_TYPES[number];

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Input component.
 *
 * Only props **specific to Input** that differ from the category defaults
 * (which live inline in {@link useForm}) are declared here. There is no
 * point duplicating `size: "md"` or `variant: "outlined"` — those are
 * already applied by the category hook.
 *
 * Applied in {@link useInput} via destructuring defaults:
 * !!!ts
 * const { type = INPUT_DEFAULTS.type, fullWidth = INPUT_DEFAULTS.fullWidth, … } = props;
 * !!!
 * so consumer-supplied values always win.
 *
 * @see {@link useInput} in `forms/input/input.hook.ts` — where these are consumed
 */
export const INPUT_DEFAULTS = {
  /** Native `type` attribute. `"text"` covers the broadest single-line use. */
  type:      "text"  as InputType,
  /** Whether the input stretches to fill its container's inline axis. */
  fullWidth: false,
} as const;
!!!

---

---

## kbd.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/kbd/kbd.tokens.ts`


!!!ts
// design/typography/components/kbd/kbd.tokens.ts
import type { TypeSize, TypeFamily } from "../../typography.tokens";

export const KBD_DEFAULTS = {
  size: "xs"   as TypeSize,
  fam:  "mono" as TypeFamily,
} as const;

!!!

---

---

## label.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/label.tokens.ts`


!!!ts
// design/typography/label/label.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Label component.
 * @module design/typography/label
 *
 * Label uses `composeTokens` to extend {@link TYPOGRAPHY_TOKENS} with two
 * overrides: a fixed (non-responsive) size scale and a narrowed weight range.
 *
 * **Why a fixed size scale:**
 * Typography components like Text and Heading use {@link TEXT_SIZE} —
 * a responsive scale where values may use `clamp()` to grow with the
 * viewport. Labels sit inside form fields and must NOT reflow; a label
 * that grows with the viewport would break tightly composed field layouts.
 * {@link TEXT_SIZE_FIXED} uses `--fsf--*` variables whose values are
 * absolute (px or rem without clamp) and are defined independently of
 * the responsive type scale.
 *
 * **Why `resolveTokens` must be called directly:**
 * Unlike Heading (which delegates to `useTypography`), Label cannot delegate
 * and achieve the fixed scale. `useTypography` calls
 * `resolveTokens(TYPOGRAPHY_TOKENS, ...)`, which would write
 * `var(--fs--sm)` (responsive) for `size="sm"`. Label needs
 * `var(--fsf--sm)` (fixed). Calling `resolveTokens(LABEL_TOKENS, ...)`
 * directly in `useLabel` writes the correct fixed value.
 *
 * This is Pattern B from the architecture: extended/modified tokens require
 * calling `resolveTokens` directly rather than delegating to the category hook.
 *
 * @see {@link TYPOGRAPHY_TOKENS} in `typography/typography.tokens.ts` — base spec
 * @see {@link TEXT_SIZE_FIXED}   in `shared/primitives.tokens.ts`     — fixed scale
 * @see {@link useLabel}          in `typography/label/label.hook.ts`  — resolves directly
 * @see {@link LabelProps}        in `typography/label/label.props.ts`
 *
 * @todo If the responsive Text component ever needs an `inline` variant that
 *   behaves like a label (fixed size, tight spacing), consider whether
 *   TEXT_SIZE_FIXED belongs in the component or should be promoted to a
 *   shared Label-like base. For now: YAGNI.
 */

import { composeTokens, dimension, pickValues } from "~/shared/tokens";
import { TYPOGRAPHY_TOKENS }                    from "../../typography.tokens";
import { TEXT_SIZE_FIXED, WEIGHT_DIM }          from "~/shared/primitives.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Label token spec.
 *
 * Extends {@link TYPOGRAPHY_TOKENS} with two overrides:
 *
 * **`size`** — replaced with a narrowed slice of {@link TEXT_SIZE_FIXED}.
 * Labels rarely need sizes above `xl`; the full `2xl`–`4xl` range of the
 * fixed scale is excluded.
 *
 * **`weight`** — narrowed to `normal | medium | semibold`.
 * Labels should never be `bold` (too heavy for a field label); `black` is
 * also excluded. Medium or semibold are the typical label weights.
 *
 * All other dimensions (color, align, leading, tracking, fam, transform, etc.)
 * are inherited from {@link TYPOGRAPHY_TOKENS} unchanged.
 *
 * @remarks
 * The `size` override uses `dimension("size", TEXT_SIZE_FIXED)` with the same
 * channel key `"size"`, so `resolveTokens` still writes `--typography--size`.
 * The difference is that the resolved VALUE comes from `--fsf--*` (fixed)
 * rather than `--fs--*` (responsive). `typography.css` reads the channel the
 * same way regardless of which scale provided the value.
 */
export const LABEL_TOKENS = composeTokens(TYPOGRAPHY_TOKENS, {
  size: pickValues(
    dimension("size", TEXT_SIZE_FIXED),
    ["2xs", "xs", "sm", "md", "lg", "xl"] as const,
  ),
  weight: pickValues(WEIGHT_DIM, ["normal", "medium", "semibold"] as const),
});

// ─── DERIVED TYPES ────────────────────────────────────────────────────────────

/**
 * Valid font-size values for Label — a fixed-scale subset.
 * Derived from {@link LABEL_TOKENS} — never hand-written.
 * @default `"sm"` — applied by {@link useLabel}
 */
export type LabelSize = keyof typeof LABEL_TOKENS.size.values;

/**
 * Valid font-weight values for Label — narrower than the full typography spec.
 * Derived from {@link LABEL_TOKENS} — never hand-written.
 * `"bold"` and `"black"` are intentionally excluded (too heavy for labels).
 * @default `"medium"` — applied by {@link useLabel}
 */
export type LabelWeight = keyof typeof LABEL_TOKENS.weight.values;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Label component.
 *
 * `"sm"` at the fixed scale maps to `--fsf--sm` — a compact, readable size
 * appropriate for field labels in most form contexts.
 *
 * @see {@link useLabel} in `typography/label/label.hook.ts`
 */
export const LABEL_DEFAULTS = {
  size:   "sm"     as LabelSize,
  weight: "medium" as LabelWeight,
} as const;
!!!

---

---

## lightbox.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/lightbox/lightbox.tokens.ts`


!!!ts

!!!

---

---

## link.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/link/link.tokens.ts`


!!!ts
// design/typography/link/link.tokens.ts

export { TYPOGRAPHY_TOKENS as LINK_TOKENS } from "~ty/typography.tokens";

/**
 * Link scales inherit from typography sizes and variants since links
 * are text-based components.
 */
export type {
  TypeSize       as LinkSize,
  TypeWeight     as LinkWeight,
  TypeColor      as LinkColor,
  TypeFamily     as LinkFamily,
} from "~ty/typography.tokens";

/**
 * Array of valid underline behaviors for Link.
 * Used for runtime validation or mapping over possible variants.
 */
export const LINK_UNDERLINE = ["always", "hover", "never"] as const;

/**
 * Type: `LinkUnderline`
 * Represents the timing and visibility of the text underline.
 * Derived from the `LINK_UNDERLINE` array.
 */
export type LinkUnderline = typeof LINK_UNDERLINE[number];

/**
 * Default fallback values for the Link component properties.
 */
export const LINK_DEFAULTS = {
  /** Links only show underline on hover by default. */
  underline: "hover" as LinkUnderline,
} as const;
!!!

---

---

## list.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/list.tokens.ts`


!!!ts
// design/data/list/list.tokens.ts

/**
 * TOKEN SPEC, TYPES, AND DEFAULTS FOR THE LIST COMPONENT
 * ─────────────────────────────────────────────────────────────
 * List adds one token dimension on top of DataProps:
 *
 *   orientation  →  .list--vertical | .list--horizontal  (class-only)
 *
 * All color channels, density, variant, and state tokens are inherited
 * from DataProps and resolved by useData. LIST_TOKENS is only passed
 * to resolveTokens for the orientation dimension.
 *
 * LISTITEM
 * ─────────────────────────────────────────────────────────────
 * The shape of a data-driven list item. Mirrors the use cases:
 *
 *   label + icon          → feature/bullet list
 *   label + checkState    → to-do / checklist
 *   label + href          → link list
 *   label + description   → contact / settings item
 *   label + badge         → notification / count list
 *   label + children      → nested sub-list (recursive)
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";
import type { CheckState }               from "~/forms/components/checkbox/checkbox.tokens";
import type { SvgName } from "~/shared/icons";

export type { CheckState };

// ─── LIST-ONLY SCALES ─────────────────────────────────────────

/**
 * Layout axis for list items.
 * Class-only — drives `flex-direction` in list.css.
 *
 * - `vertical`   — stacked top-to-bottom (default)
 * - `horizontal` — side-by-side; use for tag lists, chip groups
 */
const LIST_ORIENTATION = scale({
  vertical:   null,
  horizontal: null,
});

// ─── TOKEN SPEC ───────────────────────────────────────────────

export const LIST_TOKENS = defineTokens({
  orientation: dimension("orientation", LIST_ORIENTATION, { modifier: true }),
});

// ─── LIST ITEM SHAPE ──────────────────────────────────────────

/**
 * A single item in a data-driven list.
 *
 * All fields except `label` are optional — List renders what is present:
 *   icon        → leading icon (from the project's icon registry)
 *   checkState  → renders a Checkbox; drives the to-do / checklist pattern
 *   href        → wraps the item content in an <a> element
 *   description → second line of text beneath the label
 *   badge       → trailing count or label (right-aligned)
 *   disabled    → mutes the item and prevents interaction
 *   children    → nested sub-list rendered as a child <ul>/<ol>
 *
 * @example
 * !!!ts
 * const tasks: ListItem[] = [
 *   { label: "Buy milk",       checkState: "checked"   },
 *   { label: "Write tests",    checkState: "unchecked" },
 *   { label: "Deploy staging", checkState: "unchecked", disabled: true },
 * ];
 *
 * const links: ListItem[] = [
 *   { label: "Documentation", href: "/docs", icon: "book"  },
 *   { label: "GitHub",        href: "https://github.com", icon: "github" },
 * ];
 *
 * const nested: ListItem[] = [
 *   { label: "Frontend", children: [
 *     { label: "React" },
 *     { label: "Astro" },
 *   ]},
 * ];
 * !!!
 */
export interface ListItem {
  /** Primary text. Always required. */
  label: string;

  /**
   * Icon name from the project icon registry.
   * Rendered as a leading icon before the label.
   */
  icon?: SvgName;

  /**
   * Check state for to-do / checklist items.
   * When present, the item renders a `<Checkbox>` instead of a bullet.
   * Reuses the forms category's `CheckState` union directly.
   *
   * @see CheckState — `"checked" | "unchecked" | "indeterminate"`
   */
  checkState?: CheckState;

  /**
   * When provided, the item content is wrapped in an `<a>` element.
   * List item becomes a link; `interactive` is implied for that item.
   */
  href?: string;

  /** Secondary line of text beneath the label. */
  description?: string;

  /**
   * Trailing badge — a count or short label aligned to the right edge.
   * Numbers render as-is; strings are truncated if they exceed badge width.
   */
  badge?: string | number;

  /**
   * Mutes the item visually and prevents pointer interaction.
   * Does not affect the item's position or layout.
   */
  disabled?: boolean;

  /**
   * Nested list items rendered as a child `<ul>` (or `<ol>` if the
   * parent List has `ordered`). Supports arbitrary depth.
   */
  children?: ListItem[];
}

// ─── DERIVED TYPES ────────────────────────────────────────────

export type ListOrientation = keyof typeof LIST_ORIENTATION;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const LIST_DEFAULTS = {
  ordered:     false,
  orientation: "vertical" as ListOrientation,
} as const satisfies {
  ordered:     boolean;
  orientation: ListOrientation;
};
!!!

---

---

## menu.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/menu.tokens.ts`


!!!ts
export { NAV_TOKENS as MENU_TOKENS } from "../../nav.tokens";
export type { NavSize as MenuSize, NavVariant as MenuVariant } from "../../nav.tokens";

!!!

---

---

## metric.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/metric/metric.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { DATA_TOKENS } from "~/data/data.tokens";
import type { DataSize } from "~/data/data.tokens";

export const METRIC_DEFAULTS = {
  size: "comfortable" as DataSize,
} as const;

export const METRIC_TOKENS = composeTokens(DATA_TOKENS, {});

!!!

---

---

## modal.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/modal/modal.tokens.ts`


!!!ts
export { OVERLAY_TOKENS } from "../../overlays.tokens";
export type { OverlaySize, OverlayVariant, OverlayRadius } from "../../overlays.tokens";

export const MODAL_DEFAULTS = {
  size:            "md"      as const,
  variant:         "default" as const,
  closeOnBackdrop: true,
  closeOnEsc:      true,
} as const;

!!!

---

---

## multiselect.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/multiselect/multiselect.tokens.ts`


!!!ts

!!!

---

---

## navbar.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/navbar.tokens.ts`


!!!ts
export { NAV_TOKENS as NAVBAR_TOKENS } from "../../nav.tokens";

!!!

---

---

## number-input.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/number-input/number-input.tokens.ts`


!!!ts

!!!

---

---

## pagination.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/pagination/pagination.tokens.ts`


!!!ts
export { NAV_TOKENS as PAGINATION_TOKENS } from "../../nav.tokens";
export type { NavSize as PaginationSize, NavVariant as PaginationVariant } from "../../nav.tokens";

!!!

---

---

## panel.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/panel/panel.tokens.ts`


!!!ts
// design/surfaces/components/panel/panel.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const PANEL_DEFAULTS = {
  layer:   "3"  as SurfaceLayer, // tile/panel tier
  padding: "md" as SurfacePadding,
} as const;

!!!

---

---

## paper.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/paper/paper.tokens.ts`


!!!ts
// design/surfaces/components/paper/paper.tokens.ts

import { composeTokens, dimension }  from "~/shared/tokens";
import { SURFACE_TOKENS }            from "../../surface.tokens";
import { SPACE }                     from "~/shared/primitives.tokens";
import type { PaperTag }             from "./paper.props";
import type { SurfaceLayer }         from "../../surface.tokens";

/**
 * Paper adds one dimension on top of SURFACE_TOKENS:
 *
 *   gap → --paper--gap   Controls flex gap when stack=true.
 *
 * scope: "paper" pins the channel to --paper--gap so it never
 * collides with --surface--gap if another surface adds one later.
 */
export const PAPER_TOKENS = composeTokens(SURFACE_TOKENS, {
  gap: dimension("gap", SPACE, { scope: "paper" }),
});

export type PaperGap = keyof typeof PAPER_TOKENS.gap.values;

export const PAPER_DEFAULTS = {
  as:        "div"   as PaperTag,
  layer:     "1"     as SurfaceLayer,   // frame/paper tier
  padding:   "md"    as const,
  radius:    "md"    as const,
  stack:     false,
  gap:       "md"    as PaperGap,
  fullWidth: false,
} as const;

!!!

---

---

## popover.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/popover/popover.tokens.ts`


!!!ts
import { defineTokens, scale, dimension } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

const POPOVER_PLACEMENT = scale({
  bottom:       null,
  "bottom-start": null,
  "bottom-end":   null,
  top:          null,
  "top-start":    null,
  "top-end":      null,
});

export const POPOVER_TOKENS = defineTokens({
  placement: dimension("placement", POPOVER_PLACEMENT, { modifier: true }),
  radius:    RADIUS_DIM,
});

export const POPOVER_DEFAULTS = {
  placement: "bottom",
} as const;

export type PopoverPlacement = keyof typeof POPOVER_TOKENS.placement.values;
export type PopoverRadius    = keyof typeof POPOVER_TOKENS.radius.values;

!!!

---

---

## portal.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/portal/portal.tokens.ts`


!!!ts

!!!

---

---

## progress.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/progress/progress.tokens.ts`


!!!ts
// design/feedback/progress/progress.tokens.ts

/**
 * @file Token spec and defaults for the Progress component.
 * @module design/feedback/progress
 *
 * Progress extends {@link FEEDBACK_TOKENS} with a `type` dimension that
 * selects the rendering strategy: bar, ring, number, or percent.
 *
 * The `type` dimension is scoped to `"progress"` so it emits
 * `progress--bar` (not `feedback--bar`) — these are component-internal
 * modifier classes, not shared category classes.
 *
 * **Size map (bar track height):**
 *   xs  → 2px track
 *   sm  → 4px track
 *   md  → 6px track  ← default
 *   lg  → 10px track
 *   xl  → 16px track
 *
 * **Size map (ring diameter):**
 *   xs  → 24px
 *   sm  → 32px
 *   md  → 40px  ← default
 *   lg  → 56px
 *   xl  → 80px
 *
 * **Size map (number/percent font):**
 *   xs  → --fsf--xl  (display, compact)
 *   sm  → --fsf--2xl
 *   md  → --fsf--3xl ← default
 *   lg  → --fsf--4xl
 *   xl  → clamp(3rem, 8vw, 5rem) (hero)
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useProgress}     in `feedback/progress/progress.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FEEDBACK_TOKENS }                 from "../../feedback.tokens";

// ─── PROGRESS TYPE ───────────────────────────────────────────────────────────

const PROGRESS_TYPE = scale({
  bar:     null,   // horizontal track + fill div
  ring:    null,   // SVG circle track + stroke
  number:  null,   // large display numeral: "6/10"
  percent: null,   // large display numeral: "84%"
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const PROGRESS_TOKENS = composeTokens(FEEDBACK_TOKENS, {
  type: dimension("type", PROGRESS_TYPE, { modifier: true, scope: "progress" }),
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type ProgressType = keyof typeof PROGRESS_TOKENS.type.values;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

export const PROGRESS_DEFAULTS = {
  variant:       "soft",
  color:         "primary",
  size:          "md",
  radius:        "full",
  type:          "bar",
  max:           100,
  showValue:     false,
  indeterminate: false,
} as const;

!!!

---

---

## prose.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/prose/prose.tokens.ts`


!!!ts
// design/typography/components/prose/prose.tokens.ts
import type { TypeSize, TypeWeight, TypeColor, TypeLeading } from "../../typography.tokens";

export const PROSE_DEFAULTS = {
  size:    "base"    as TypeSize,
  weight:  "regular" as TypeWeight,
  color:   "base"    as TypeColor,
  leading: "relaxed" as TypeLeading, // Great for reading long-form content
} as const;

!!!

---

---

## quote.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/quote/quote.tokens.ts`


!!!ts
// design/typography/quote/quote.tokens.ts

export { TYPOGRAPHY_TOKENS as QUOTE_TOKENS } from "../../typography.tokens";

export type {
  TypeSize       as QuoteSize,
  TypeWeight     as QuoteWeight,
  TypeColor      as QuoteColor,
  TypeAlign      as QuoteAlign,
  TypeLeading    as QuoteLeading,
  TypeTracking   as QuoteTracking,
  TypeFamily     as QuoteFamily,
  TypeTransform  as QuoteTransform,
  TypeWrap       as QuoteWrap,
  TypeDecoration as QuoteDecoration,
  TypeStyle      as QuoteStyle,
} from "../../typography.tokens";

export const QUOTE_DEFAULTS = {
  type: "block",
} as const;

export type QuoteType = "block" | "pull" | "inline";
export type QuoteTag = "blockquote" | "q";

!!!

---

---

## radio-group.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio-group/radio-group.tokens.ts`


!!!ts
// design/forms/components/radio-group/radio-group.tokens.ts

/**
 * @file Token spec and defaults for the RadioGroup component.
 * @module design/forms/radio-group
 *
 * RadioGroup is a structural wrapper, not a form control. It uses no form token
 * dimensions — its only token is the layout direction.
 *
 * @see {@link RadioGroupProps}  in `radio-group.props.ts`
 * @see {@link useRadioGroup}    in `radio-group.hook.ts`
 */

// ─── LAYOUT SCALE ─────────────────────────────────────────────────────────────

export const LAYOUT_VALUES = ["vertical", "horizontal"] as const;
export type  RadioGroupLayout = typeof LAYOUT_VALUES[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const RADIO_GROUP_DEFAULTS = {
  layout: "vertical" as RadioGroupLayout,
} as const;

!!!

---

---

## radio.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio/radio.tokens.ts`


!!!ts
// design/forms/radio/radio.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Radio component.
 * @module design/forms/radio
 *
 * Radio introduces no new token dimensions and follows the re-export pattern.
 *
 * @remarks
 * **No RadioGroup yet.**
 * In a full implementation, a `RadioGroup` component would own the `name`
 * attribute and the selected `value`, with individual `Radio` components
 * serving as the visual options. For now, `Radio` is a standalone component
 * — consumers manage grouping manually by sharing the same `name` across
 * instances. A `RadioGroup` can be added as a sibling component later
 * without changing this file.
 *
 * **Default variant is `"ghost"`**, not `"outlined"`.
 * Same reasoning as {@link CHECKBOX_DEFAULTS}: the traditional radio button
 * has no border or background on the wrapper. `variant="outlined"` produces
 * a bordered "option card" style.
 *
 * **`labelPosition` is not a token dimension.**
 * Emitted as a direct class modifier in {@link useRadio}.
 * Shared concept with {@link CheckboxProps.labelPosition} — both use the
 * same `LabelPosition` type, declared locally in each component to avoid
 * cross-component imports. If a third component needs it, promote to
 * `forms.tokens.ts`.
 *
 * @see {@link FORM_TOKENS}  in `forms/forms.tokens.ts` — source spec
 * @see {@link RadioProps}   in `forms/radio/radio.props.ts`
 * @see {@link useRadio}     in `forms/radio/radio.hook.ts`
 * @see `forms/radio/radio.css` — circular indicator styles, layout modifiers
 *
 * @todo Add `RadioGroup` component in `forms/radio-group/` when needed.
 *   RadioGroup would own `name`, `value` (selected option), and `onChange`.
 *   Individual `Radio` components inside a RadioGroup would receive their
 *   `name` and `checked` state via HTML (or a client-side group manager).
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Radio token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as RADIO_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type RadioSize    = FormSize;
/** @see {@link FormVariant} */
export type RadioVariant = FormVariant;
/** @see {@link FormColor} */
export type RadioColor   = FormColor;
/** @see {@link FormRadius} */
export type RadioRadius  = FormRadius;

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

/**
 * Valid positions for the label slot relative to the radio indicator circle.
 *
 * Declared locally (same values as in `checkbox.tokens.ts`) to avoid
 * cross-component imports. If a third component needs this, promote to
 * `forms.tokens.ts`.
 *
 * @remarks
 * - `"end"`    — `(●) Label` — circle left, label right (default)
 * - `"start"`  — `Label (●)` — label left, circle right
 * - `"top"`    — Label above circle
 * - `"bottom"` — circle above label
 *
 * CSS uses `flex-direction` / `order` for visual reordering.
 * DOM order is always: `hidden input → indicator → label slot`.
 */
export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;

/** Valid values for the `labelPosition` prop. */
export type LabelPosition = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Radio component.
 *
 * `variant` defaults to `"ghost"` and is applied inline in {@link useRadio}
 * before delegating to {@link useForm}, not declared here.
 *
 * @see {@link useRadio} — where `variant: "ghost"` is the default
 */
export const RADIO_DEFAULTS = {
  /** Label appears to the right of the indicator circle. */
  labelPosition: "end" as LabelPosition,
} as const;
!!!

---

---

## range-slider.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/range-slider/range-slider.tokens.ts`


!!!ts

!!!

---

---

## screen.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/screen/screen.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";


/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */

export const SCREEN_TOKENS = composeTokens(LAYOUT_TOKENS, {});

export type ScreenTag = "div" | "section" | "article" | "main" | "section" | "span";
export type PageHeight = "full" | "90vh" | "auto";
export type OverflowOptions = "auto" | "hidden" | "scroll" | "visible";
export type PageCentered = "all" | "none" | "x" | "y";

export type ScreenGap = keyof typeof SCREEN_TOKENS.gap.values;

export const SCREEN_DEFAULTS = {
  as: "div" as ScreenTag,
  height: "full" as PageHeight,
  overflow: "auto" as OverflowOptions,
  centered: "none" as PageCentered,
  gap: "md" as ScreenGap,
} as const;
!!!

---

---

## search.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/search/search.tokens.ts`


!!!ts
// design/forms/search/search.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Search component.
 * @module design/forms/search
 *
 * Search introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec and re-exports it under a component alias.
 *
 * @remarks
 * **Search vs Input:**
 * Search is not a wrapper around Input — sibling components cannot import
 * from each other. Both call {@link useForm} directly and follow the same
 * wrapper/control split pattern. The differences are:
 * - Default `type` is `"search"`
 * - A clear button is built into the component (JS-driven, auto-hides)
 * - A `loading` prop shows a spinner in the trailing position
 * - Escape key clears the input (handled by the component script)
 *
 * All structural and visual token logic is identical to Input.
 *
 * **`loading` is not a token dimension.**
 * It emits a class modifier (`search--loading`) and a `data-loading`
 * attribute directly in {@link useSearch}, same as `disabled`/`invalid`.
 * CSS drives the spinner visibility; no CSS custom property is needed.
 *
 * @see {@link FORM_TOKENS}   in `forms/forms.tokens.ts`
 * @see {@link SearchProps}   in `forms/search/search.props.ts`
 * @see {@link useSearch}     in `forms/search/search.hook.ts`
 *
 * @todo Add `shortcut?: string` prop (e.g. `"/"` or `"⌘K"`) as a display-only
 *   badge in the end position. A pure display concern — no token dimension needed,
 *   just a conditional render in `Search.astro` when the prop is set.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

/**
 * Search token spec — re-exports {@link FORM_TOKENS} under a component alias.
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts`
 */
export { FORM_TOKENS as SEARCH_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type SearchSize    = FormSize;
/** @see {@link FormVariant} */
export type SearchVariant = FormVariant;
/** @see {@link FormColor} */
export type SearchColor   = FormColor;
/** @see {@link FormRadius} */
export type SearchRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Search component.
 *
 * `fullWidth` defaults to `true` for Search — a search input almost always
 * spans the full width of its container. Override with `fullWidth={false}`
 * for inline or constrained-width contexts.
 *
 * @see {@link useSearch} in `forms/search/search.hook.ts`
 */
export const SEARCH_DEFAULTS = {
  fullWidth: true,
  loading:   false,
} as const;

!!!

---

---

## section.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/section/section.tokens.ts`


!!!ts
// design/surfaces/components/section/section.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const SECTION_DEFAULTS = {
  layer:   "0"    as SurfaceLayer,
  padding: "none" as SurfacePadding, // Sections often span edge-to-edge
} as const;

!!!

---

---

## segmented-control.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/segmented-control/segmented-control.tokens.ts`


!!!ts

!!!

---

---

## select.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/select/select.tokens.ts`


!!!ts
// design/forms/select/select.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Select component.
 * @module design/forms/select
 *
 * Select introduces no new token dimensions — it inherits the full
 * {@link FORM_TOKENS} spec unchanged and follows the **re-export pattern**.
 *
 * @remarks
 * **Single component, two modes:**
 * `Select` handles both single-value and multi-value selection via a
 * discriminated union on the `multiple` prop (see {@link SelectProps}).
 * There is no separate `Multiselect` component. The token spec is
 * identical for both modes — only the native `multiple` attribute and
 * the `value` type differ. This is the one component in the forms
 * category whose props file exports a union type rather than a plain
 * interface.
 *
 * **Options as props, not slots:**
 * Unlike `Input`, `Select` must render `<option>` elements itself.
 * Native `<select>` only accepts `<option>` and `<optgroup>` as children;
 * Astro named slots cannot be placed inside it. Options are therefore
 * passed as a structured prop (`options: SelectOption[]`) and the hook
 * returns a `resolvedOptions` array (with `selected: boolean` computed)
 * for `Select.astro` to map over.
 *
 * **Architecture position:**
 * !!!
 * forms/forms.tokens.ts        FORM_TOKENS, FormSize, FormVariant, …
 *        ↑  re-export
 * forms/select/select.tokens.ts   SELECT_TOKENS (alias), SELECT_DEFAULTS
 *        ↑
 * forms/select/select.props.ts    SelectOption, SelectProps (union)
 * forms/select/select.hook.ts     useSelect
 * !!!
 *
 * @see {@link FORM_TOKENS}    in `forms/forms.tokens.ts`         — source spec
 * @see {@link SelectProps}    in `forms/select/select.props.ts`  — prop surface
 * @see {@link useSelect}      in `forms/select/select.hook.ts`   — runtime resolution
 * @see {@link SELECT_DEFAULTS} — default values applied when props are omitted
 *
 * @todo Add `optgroup` support: extend {@link SelectOption} to allow
 *   `SelectOptionGroup = { label: string; options: SelectOption[] }`,
 *   update the `options` prop type in {@link SelectProps} to
 *   `Array<SelectOption | SelectOptionGroup>`, and update the rendering
 *   in `Select.astro`. The hook needs no change — group detection
 *   and `<optgroup>` rendering is a template concern.
 *
 * @todo If Select ever needs a new dimension (e.g. `rows` for a visible
 *   count on native `<select size="N">`, which is distinct from the token
 *   `size` dimension), switch to `composeTokens(FORM_TOKENS, { … })`.
 *   The native `size` attribute conflict must be handled carefully —
 *   use a different prop name (e.g. `visibleRows`) to avoid collision
 *   with the token `size` dimension.
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~/forms/forms.tokens";

// ─── SPEC ────────────────────────────────────────────────────────────────────

/**
 * Select token spec — re-exports {@link FORM_TOKENS} under a component-scoped
 * alias. Provides a stable import path so future extension via `composeTokens`
 * only requires changing this file.
 *
 * @see {@link FORM_TOKENS} in `forms/forms.tokens.ts` — the actual spec object
 */
export { FORM_TOKENS as SELECT_TOKENS } from "~/forms/forms.tokens";

// ─── TYPE ALIASES ────────────────────────────────────────────────────────────

/** @see {@link FormSize} */
export type SelectSize    = FormSize;
/** @see {@link FormVariant} */
export type SelectVariant = FormVariant;
/** @see {@link FormColor} */
export type SelectColor   = FormColor;
/** @see {@link FormRadius} */
export type SelectRadius  = FormRadius;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

/**
 * Default prop values for the Select component.
 *
 * Only props specific to Select that differ from the category defaults
 * (applied inline by {@link useForm}) are declared here.
 *
 * Note: `options` and `value` have no defaults — `options` is required,
 * and `value` being absent represents the uncontrolled/no-selection state.
 *
 * @see {@link useSelect} in `forms/select/select.hook.ts` — where these are consumed
 */
export const SELECT_DEFAULTS = {
  /** Whether the select stretches to fill its container's inline axis. */
  fullWidth: false,
} as const;
!!!

---

---

## separator.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/separator/separator.tokens.ts`


!!!ts
/**
 * @file Token spec, constants, and defaults for the Separator component.
 */

import { dimension, scale } from "~sh/tokens";

// ─── SCALES ───────────────────────────────────────────────────────────────────

export const ORIENTATION = scale({ horizontal: null, vertical: null });
export const VARIANT = scale({ solid: null, dashed: null });
export const STRENGTH = scale({ subtle: null, default: null, strong: null });

// ─── DIMENSIONS ───────────────────────────────────────────────────────────────

export const ORIENTATION_DIM = dimension("orientation", ORIENTATION, {
  modifier: true,
});
export const VARIANT_DIM = dimension("variant", VARIANT, { modifier: "variant" });
export const STRENGTH_DIM = dimension("strength", STRENGTH, { modifier: "strength" });

// ─── DERIVED TYPES ────────────────────────────────────────────────────────────

export type SeparatorOrientation = keyof typeof ORIENTATION;
export type SeparatorVariant = keyof typeof VARIANT;
export type SeparatorStrength = keyof typeof STRENGTH;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const SEPARATOR_DEFAULTS = {
  orientation: "horizontal" as SeparatorOrientation,
  variant: "solid" as SeparatorVariant,
  strength: "default" as SeparatorStrength,
} as const;
!!!

---

---

## sheet.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/sheet/sheet.tokens.ts`


!!!ts
export const SHEET_DEFAULTS = {
  side: "left" as const,
  size: "md" as const,
  variant: "default" as const,
};

!!!

---

---

## skeleton.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/skeleton/skeleton.tokens.ts`


!!!ts
// design/feedback/skeleton/skeleton.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM }                     from "~/shared/primitives.tokens";

// ─── VARIANTS ─────────────────────────────────────────────────
//
// Class-only — each drives shape/size defaults in skeleton.css.
// Width, height, and aspect-ratio can always be overridden via props.
//
//   text    — single text line. Use lines prop for a multi-line block.
//   heading — wider, taller than text. For title placeholders.
//   avatar  — square that CSS forces into a circle via border-radius: 50%.
//   button  — medium pill shape. For CTA placeholders.
//   image   — rectangle driven by aspect-ratio prop. For media placeholders.
//   block   — no default size. Fully controlled by width + height props.

const SKELETON_VARIANT = scale({
  text:    null,
  heading: null,
  avatar:  null,
  button:  null,
  image:   null,
  block:   null,
});

// ─── SPEC ─────────────────────────────────────────────────────

export const SKELETON_TOKENS = defineTokens({
  variant: dimension("variant", SKELETON_VARIANT, { modifier: true }),
  // radius overrides the per-variant default from skeleton.css.
  // Useful when a skeleton needs to match the shape it replaces
  // (e.g. a card image with rounded corners → radius="lg").
  radius:  RADIUS_DIM,
});

// ─── DERIVED TYPES ────────────────────────────────────────────

export type SkeletonVariant = keyof typeof SKELETON_VARIANT;
export type SkeletonRadius  = keyof typeof SKELETON_TOKENS.radius.values;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const SKELETON_DEFAULTS = {
  variant:  "block"  as SkeletonVariant,
  lines:    1,
  animated: true,
} as const;
!!!

---

---

## skip-link.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/skip-link/skip-link.tokens.ts`


!!!ts
// design/triggers/components/skip-link/skip-link.tokens.ts
export const SKIP_LINK_DEFAULTS = {
  target: "main",
  label:  "Skip to content",
} as const;

!!!

---

---

## slider.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/slider/slider.tokens.ts`


!!!ts

!!!

---

---

## spacer.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/spacer/spacer.tokens.ts`


!!!ts
/**
 * @file Token spec, constants, and defaults for the Spacer component.
 */

export type SpacerTag = "div" | "span";

export const SPACER_DEFAULTS = {
  as: "div" as SpacerTag,
} as const;
!!!

---

---

## spinner.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/spinner/spinner.tokens.ts`


!!!ts
// design/feedback/spinner/spinner.tokens.ts

/**
 * @file Token spec and defaults for the Spinner component.
 * @module design/feedback/spinner
 *
 * Spinner extends {@link FEEDBACK_TOKENS} with two dimensions:
 *   - `speed`     — animation duration (slow/normal/fast)
 *   - `direction` — rotation direction (clockwise/counterclockwise)
 *
 * Both are scoped to `"spinner"` so their modifier classes are
 * `spinner--slow`, `spinner--fast`, etc. (not `feedback--slow`).
 *
 * Size map (spinner diameter + SVG stroke-width):
 *   xs  → 14px / stroke 2
 *   sm  → 18px / stroke 2.5
 *   md  → 24px / stroke 2.5  ← default
 *   lg  → 32px / stroke 3
 *   xl  → 48px / stroke 3.5
 *
 * @see {@link FEEDBACK_TOKENS} in `feedback/feedback.tokens.ts`
 * @see {@link useSpinner}      in `feedback/spinner/spinner.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FEEDBACK_TOKENS }                 from "../../feedback.tokens";

// ─── SPEED ───────────────────────────────────────────────────────────────────

const SPINNER_SPEED = scale({
  slow:   null,   // 1.4s
  normal: null,   // 0.8s (default)
  fast:   null,   // 0.4s
});

// ─── DIRECTION ───────────────────────────────────────────────────────────────

const SPINNER_DIRECTION = scale({
  clockwise:        null,   // default
  counterclockwise: null,   // animation-direction: reverse
});

// ─── SPEC ────────────────────────────────────────────────────────────────────

export const SPINNER_TOKENS = composeTokens(FEEDBACK_TOKENS, {
  speed:     dimension("speed",     SPINNER_SPEED,     { modifier: true, scope: "spinner" }),
  direction: dimension("direction", SPINNER_DIRECTION, { modifier: true, scope: "spinner" }),
});

// ─── DERIVED TYPES ───────────────────────────────────────────────────────────

export type SpinnerSpeed     = keyof typeof SPINNER_TOKENS.speed.values;
export type SpinnerDirection = keyof typeof SPINNER_TOKENS.direction.values;

// ─── DEFAULTS ────────────────────────────────────────────────────────────────

export const SPINNER_DEFAULTS = {
  variant:   "ghost",          // no bg/border — spinner stands alone
  color:     "primary",
  size:      "md",
  radius:    "full",
  speed:     "normal",
  direction: "clockwise",
  label:     "Loading",
} as const;

!!!

---

---

## stack.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/stack/stack.tokens.ts`


!!!ts
/**
 * Stack token definitions.
 */

import { dimension } from "~/shared/tokens";
import { SPACE } from "~/shared/primitives.tokens";

export const STACK_TOKENS = {
  gap: dimension("gap", SPACE, { scope: "stack" }),
};

export type StackGap = keyof typeof STACK_TOKENS.gap.values;

export type StackTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "main"
  | "nav";

export const STACK_DEFAULTS = {
  as: "div" as StackTag,
  gap: "md" as StackGap,
} as const;
!!!

---

---

## stat.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/stat/stat.tokens.ts`


!!!ts
import { composeTokens } from "~/shared/tokens";
import { DATA_TOKENS } from "../../data.tokens";
import type { DataSize } from "../../data.tokens";

export const STAT_DEFAULTS = {
  size: "comfortable" as DataSize,
} as const;

export const STAT_TOKENS = composeTokens(DATA_TOKENS, {});
!!!

---

---

## stepper.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/stepper.tokens.ts`


!!!ts
export { NAV_TOKENS as STEPPER_TOKENS } from "../../nav.tokens";

!!!

---

---

## switch.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/switch/switch.tokens.ts`


!!!ts
// design/forms/components/switch/switch.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Switch component.
 * @module design/forms/switch
 *
 * Switch introduces no new token dimensions — it re-exports FORM_TOKENS
 * and adds its own defaults and constants.
 *
 * Default `variant` is `"ghost"` (applied inline in {@link useSwitch}) for the
 * traditional label-only appearance. Pass `variant="outlined"` or `variant="soft"`
 * for a bordered "selectable card" style.
 *
 * @see {@link FORM_TOKENS}   in `forms/forms.tokens.ts`
 * @see {@link SwitchProps}   in `forms/switch/switch.props.ts`
 * @see {@link useSwitch}     in `forms/switch/switch.hook.ts`
 */

import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export { FORM_TOKENS as SWITCH_TOKENS } from "~f/forms.tokens";

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

export type SwitchSize    = FormSize;
export type SwitchVariant = FormVariant;
export type SwitchColor   = FormColor;
export type SwitchRadius  = FormRadius;

// ─── LABEL POSITION ───────────────────────────────────────────────────────────

export const LABEL_POSITIONS = ["end", "start", "top", "bottom"] as const;
export type  LabelPosition   = typeof LABEL_POSITIONS[number];

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const SWITCH_DEFAULTS = {
  labelPosition: "end" as LabelPosition,
} as const;

!!!

---

---

## table.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/table.tokens.ts`


!!!ts
// design/data/table/table.tokens.ts

/**
 * TABLE TOKEN SPEC
 * ─────────────────────────────────────────────────────────────────────────────
 * Table adds one token dimension on top of what DataProps/useData already covers:
 *
 *   layout  → --table-layout   CSS table-layout property (auto | fixed)
 *             + modifier class (.table--auto | .table--fixed)
 *
 * All color channels, density, variant, and state tokens are inherited from
 * the data category and resolved by useData. TABLE_TOKENS is only passed to
 * resolveTokens for table-specific dimensions.
 *
 * DATA-DRIVEN MODE TYPES
 * ─────────────────────────────────────────────────────────────────────────────
 * ColumnDef    Column configuration for <Table data={rows} columns={cols} />
 * RowData      A single row record — open Record shape
 * TableSort    Current sort state { key, direction }
 * TableAlign   Column text alignment (start | center | end)
 *
 * For rich cell content (badges, actions, nested components) use compound
 * mode instead: <TableBody><TableRow><TableCell>...</TableCell></TableRow></TableBody>
 */

import { defineTokens, dimension, scale } from "~/shared/tokens";

// ─── TABLE-ONLY SCALES ────────────────────────────────────────

/**
 * CSS table-layout algorithm.
 *
 *   auto   Browser sizes columns from content — flexible but slower to render.
 *          Good for variable content where you want columns to self-size.
 *
 *   fixed  Columns sized from first row / explicit widths — faster to render.
 *          Required for sticky columns and reliable column widths.
 *          Use when column count and widths are known ahead of time.
 */
const TABLE_LAYOUT_SCALE = scale({
  auto:  "auto",
  fixed: "fixed",
});

/**
 * Column text alignment. Applied per column via ColumnDef.align.
 * Not a component-level token dimension — used within ColumnDef only.
 */
const TABLE_ALIGN_SCALE = scale({
  start:  null,
  center: null,
  end:    null,
});

// ─── TOKEN SPEC ───────────────────────────────────────────────

export const TABLE_TOKENS = defineTokens({
  /**
   * CSS table-layout algorithm.
   * Sets --table-layout channel + modifier class (.table--auto | .table--fixed).
   */
  layout: dimension("layout", TABLE_LAYOUT_SCALE, { modifier: true }),
});

// ─── DATA-DRIVEN MODE TYPES ───────────────────────────────────

/** A single row record. Values are unknown — format() in ColumnDef handles display. */
export type RowData = Record<string, unknown>;

/**
 * Column definition for data-driven mode.
 *
 * @example
 * const columns: ColumnDef[] = [
 *   { key: "name",   heading: "Name",   width: "200px" },
 *   { key: "status", heading: "Status", align: "center" },
 *   { key: "amount", heading: "Amount", align: "end",
 *     format: (v) => `$${Number(v).toFixed(2)}` },
 * ]
 */
export interface ColumnDef {
  /** Property key on the row record. Must match a key in RowData. */
  key: string;

  /** Text shown in the column header (<th>). */
  heading: string;

  /**
   * Text alignment for all cells in this column.
   * Defaults to "start". Use "end" for numeric columns.
   */
  align?: TableAlign;

  /**
   * Explicit CSS column width.
   * Any valid CSS length: "200px" | "20ch" | "15%" | "auto"
   * Requires layout="fixed" on the Table to be respected reliably.
   */
  width?: string;

  /**
   * Whether this column is sortable. Overrides the table-level sortable prop.
   * Set false to disable sorting on a specific column when sortable is true globally.
   */
  sortable?: boolean;

  /**
   * String transformation applied to the cell value before rendering.
   * For rich content (badges, icons, nested components) use compound mode instead.
   *
   * @param value - The raw value from the row record at this column's key
   * @param row   - The full row record, for multi-field formatting
   * @returns     - The string to render in the cell
   */
  format?: (value: unknown, row: RowData) => string;
}

/**
 * Current sort state. Consumers manage this externally and pass it back
 * to Table — Table only renders the visual sort indicators.
 *
 * @example
 * let sort: TableSort = { key: "name", direction: "asc" };
 */
export interface TableSort {
  key:       string;
  direction: "asc" | "desc";
}

// ─── DERIVED TYPES ────────────────────────────────────────────

export type TableLayout = keyof typeof TABLE_LAYOUT_SCALE;
export type TableAlign  = keyof typeof TABLE_ALIGN_SCALE;

// ─── DEFAULTS ─────────────────────────────────────────────────

export const TABLE_DEFAULTS = {
  layout:       "auto",
  stickyHeader: false,
  sortable:     false,
} as const satisfies {
  layout:       TableLayout;
  stickyHeader: boolean;
  sortable:     boolean;
};
!!!

---

---

## tabs.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/tabs.tokens.ts`


!!!ts
export { NAV_TOKENS as TABS_TOKENS } from "../../nav.tokens";
export type { NavSize as TabsSize, NavVariant as TabsVariant } from "../../nav.tokens";

!!!

---

---

## tag.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/tag/tag.tokens.ts`


!!!ts
// design/feedback/components/tag/tag.tokens.ts

export { FEEDBACK_TOKENS as TAG_TOKENS } from "../../feedback.tokens";
export type {
  FeedbackSize    as TagSize,
  FeedbackVariant as TagVariant,
  FeedbackColor   as TagColor,
  FeedbackRadius  as TagRadius,
} from "../../feedback.tokens";

export const TAG_DEFAULTS = {
  variant: "soft",
  color:   "neutral",
  size:    "md",
  radius:  "sm",
} as const;

!!!

---

---

## text.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/text/text.tokens.ts`


!!!ts
// design/typography/text/text.tokens.ts

/**
 * Text re-exports the full typography spec unchanged.
 * Text has no additional dimensions and no narrowed values —
 * it exposes the complete typography vocabulary as-is.
 */
export { TYPOGRAPHY_TOKENS as TEXT_TOKENS } from "../../typography.tokens";

export type {
  TypeSize       as TextSize,
  TypeWeight     as TextWeight,
  TypeColor      as TextColor,
  TypeAlign      as TextAlign,
  TypeLeading    as TextLeading,
  TypeTracking   as TextTracking,
  TypeFamily     as TextFamily,
  TypeTransform  as TextTransform,
  TypeWrap       as TextWrap,
  TypeDecoration as TextDecoration,
  TypeStyle      as TextStyle,
} from "../../typography.tokens";

export const TEXT_DEFAULTS = {
  as: "p",
} as const;
!!!

---

---

## textarea.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/textarea/textarea.tokens.ts`


!!!ts
// design/forms/components/textarea/textarea.tokens.ts

/**
 * @file Token spec, constants, and defaults for the Textarea component.
 * @module design/forms/textarea
 *
 * Textarea extends FORM_TOKENS with a `resize` dimension scoped to "textarea"
 * so only `textarea.css` reads `--textarea--resize`. All other form token
 * dimensions are inherited unchanged.
 *
 * @see {@link FORM_TOKENS}     in `forms/forms.tokens.ts`
 * @see {@link TextareaProps}   in `forms/textarea/textarea.props.ts`
 * @see {@link useTextarea}     in `forms/textarea/textarea.hook.ts`
 */

import { composeTokens, dimension, scale } from "~/shared/tokens";
import { FORM_TOKENS } from "~f/forms.tokens";
import type { FormSize, FormVariant, FormColor, FormRadius } from "~f/forms.tokens";

// ─── RESIZE SCALE ─────────────────────────────────────────────────────────────

const RESIZE = scale({
  none:     "none",
  vertical: "vertical",
  both:     "both",
});

// ─── SPEC ─────────────────────────────────────────────────────────────────────

export const TEXTAREA_TOKENS = composeTokens(FORM_TOKENS, {
  // scope: "textarea" — only textarea.css reads --textarea--resize
  resize: dimension("resize", RESIZE, { scope: "textarea" }),
});

// ─── TYPE ALIASES ─────────────────────────────────────────────────────────────

export type TextareaResize  = keyof typeof TEXTAREA_TOKENS.resize.values;
export type TextareaSize    = FormSize;
export type TextareaVariant = FormVariant;
export type TextareaColor   = FormColor;
export type TextareaRadius  = FormRadius;

// ─── DEFAULTS ─────────────────────────────────────────────────────────────────

export const TEXTAREA_DEFAULTS = {
  resize: "vertical" as TextareaResize,
  rows:   3,
} as const;

!!!

---

---

## theme-toggle.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/theme-toggle/theme-toggle.tokens.ts`


!!!ts
// design/triggers/components/theme-toggle/theme-toggle.tokens.ts

/**
 * ThemeToggle tokens & defaults.
 *
 * The toggle is a thin wrapper around Button so it re-exports the button
 * tokens as-is. The THEME_TOGGLE_DEFAULTS object provides opinionated
 * defaults that make the toggle look good with zero props.
 *
 * localStorage key and data-attribute name are also defined here so the
 * client script and the SSR detection in Head.astro stay in sync.
 */

export { BUTTON_SIZE_MAP as THEME_TOGGLE_SIZE_MAP } from "~tr/components/button/button.tokens";

/* ─── THEME CONSTANTS ─────────────────────────────────────── */

/** localStorage key used to persist the user preference. */
export const THEME_STORAGE_KEY = "theme" as const;

/** Value stored / read from localStorage and set on <html data-theme>. */
export type Theme = "light" | "dark";

/* ─── COMPONENT DEFAULTS ──────────────────────────────────── */

export const THEME_TOGGLE_DEFAULTS = {
  variant:  "ghost"   as const,
  color:    "neutral" as const,
  size:     "md"      as const,
  iconOnly: true,
} as const;

!!!

---

---

## tile.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/tile/tile.tokens.ts`


!!!ts
// design/surfaces/components/tile/tile.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const TILE_DEFAULTS = {
  layer:   "3"  as SurfaceLayer, // tile/panel tier
  padding: "md" as SurfacePadding,
} as const;

!!!

---

---

## time-picker.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/time-picker/time-picker.tokens.ts`


!!!ts

!!!

---

---

## toast.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/toast/toast.tokens.ts`


!!!ts
// design/feedback/components/toast/toast.tokens.ts

import { FEEDBACK_TOKENS }                                     from "../../feedback.tokens";
import { SPACE }                                               from "~/shared/primitives.tokens";
import type { FeedbackColor, FeedbackRadius, FeedbackVariant,
              FeedbackSize }                                   from "../../feedback.tokens";

export { FEEDBACK_TOKENS as TOAST_TOKENS };
export type { FeedbackColor as ToastColor, FeedbackVariant as ToastVariant,
              FeedbackRadius as ToastRadius, FeedbackSize as ToastSize };

export type ToastPosition =
  | "top-start" | "top-center" | "top-end"
  | "bottom-start" | "bottom-center" | "bottom-end";

export const TOAST_DEFAULTS = {
  variant:     "soft"         as FeedbackVariant,
  color:       "neutral"      as FeedbackColor,
  radius:      "md"           as FeedbackRadius,
  size:        "md"           as FeedbackSize,
  duration:    4000,
  dismissible: true,
  position:    "bottom-end"   as ToastPosition,
} as const;

const {
  "2xs": xxs,
  "2xl": xxl,
} = SPACE;

export const TOAST_SIZE_MAP: Record<FeedbackSize, { fontSize: string; p: string }> = {
  "2xs": { fontSize: "var(--fsf--xs)",  p: xxs },
  xs:   { fontSize: "var(--fsf--xs)",   p: SPACE.xs },
  sm:   { fontSize: "var(--fsf--sm)",   p: SPACE.sm },
  md:   { fontSize: "var(--fsf--sm)",   p: SPACE.md },
  lg:   { fontSize: "var(--fsf--md)",   p: SPACE.md },
  xl:   { fontSize: "var(--fsf--lg)",   p: SPACE.md },
  "2xl": { fontSize: "var(--fsf--xl)", p: xxl },
};

!!!

---

---

## toolbar.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/toolbar/toolbar.tokens.ts`


!!!ts

!!!

---

## tooltip.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/tooltip/tooltip.tokens.ts`


!!!ts
import { defineTokens, scale, dimension } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

const TOOLTIP_PLACEMENT = scale({
  top:    null,
  bottom: null,
  left:   null,
  right:  null,
});

export const TOOLTIP_TOKENS = defineTokens({
  placement: dimension("placement", TOOLTIP_PLACEMENT, { modifier: true }),
  radius:    RADIUS_DIM,
});

export const TOOLTIP_DEFAULTS = {
  placement: "top" as const,
} as const;

export type TooltipPlacement = keyof typeof TOOLTIP_TOKENS.placement.values;
export type TooltipRadius    = keyof typeof TOOLTIP_TOKENS.radius.values;

!!!

---

## tree-view.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tree-view/tree-view.tokens.ts`


!!!ts

!!!

---

## video.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/video/video.tokens.ts`


!!!ts

!!!

---

## visually-hidden.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/visually-hidden/visually-hidden.tokens.ts`


!!!ts
// design/typography/components/visually-hidden/visually-hidden.tokens.ts
import type { VisuallyHiddenTag } from "./visually-hidden.props";

export const VISUALLY_HIDDEN_DEFAULTS = {
  as: "span" as VisuallyHiddenTag,
} as const;

!!!

---

## waveform.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/waveform/waveform.tokens.ts`


!!!ts

!!!

---

## well.tokens.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/well/well.tokens.ts`


!!!ts
// design/surfaces/components/well/well.tokens.ts
import type { SurfaceLayer, SurfacePadding } from "../../surface.tokens";

export const WELL_DEFAULTS = {
  layer:   "inset" as SurfaceLayer,
  padding: "md"    as SurfacePadding,
} as const;

!!!

---

