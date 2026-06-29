# Aggregated PROPS Files

## alert-dialog.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.props.ts`


!!!ts
import type { OverlaysProps } from "../../overlays.props";
import type { IconProps } from "~/shared/icon.props";

export interface AlertDialogProps extends OverlaysProps, IconProps {
  id:           string;
  title:        string;
  description?: string;
  closeOnEsc?:  boolean;
}

!!!

---

## alert.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/alert.props.ts`


!!!ts
// design/feedback/components/alert/alert.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { AlertColor, AlertRadius, AlertVariant } from "./alert.tokens";

import type { IconProps } from "~/shared/icon.props";

export interface AlertProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "pulse" | "placement">, IconProps {
  /** Visual treatment. @default "soft" */
  variant?: AlertVariant;

  /** Color role. @default "neutral" */
  color?: AlertColor;

  /** Border radius. @default "md" */
  radius?: AlertRadius;
  dismissible?: boolean;

  /**
   * `aria-label` for the dismiss button. Only used when `dismissible=true`.
   * @default "Dismiss"
   */
  dismissLabel?: string;
}

!!!

---

## audio.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.props.ts`


!!!ts
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

!!!

---

## avatar-group.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/avatar-group.props.ts`


!!!ts

!!!

---

## avatar.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/avatar.props.ts`


!!!ts
// design/assets/components/avatar/avatar.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { AvatarSize, AvatarRadius, AvatarStatus } from "./avatar.tokens";

export interface AvatarProps extends BaseComponentProps {
  /** Image URL. Omit to show initials or icon fallback. */
  src?:      string;
  /** Alt text for the image. Pass name for accessibility. */
  alt?:      string;
  /** 1–2 character initials shown when `src` is absent or fails. */
  initials?: string;
  /** Avatar size. @default 'md' */
  size?:     AvatarSize;
  /** Border radius. @default 'full' */
  radius?:   AvatarRadius;
  /** Online/offline/away/busy status dot. */
  status?:   AvatarStatus;
}

!!!

---

## backdrop.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/backdrop.props.ts`


!!!ts

!!!

---

## badge.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/badge.props.ts`


!!!ts
// design/feedback/badge/badge.props.ts

/**
 * @file Prop interface for the Badge component.
 * @module design/feedback/badge
 *
 * {@link BadgeProps} extends {@link FeedbackProps} with badge-specific props.
 *
 * **Inheritance chain:**
 * !!!
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps        size, variant, color, radius, pulse, placement
 *        ↑
 * BadgeProps           count, max, dot
 * !!!
 *
 * **Three rendering modes:**
 * 1. **Count badge** — `count` prop provided. Displays a number, capped by `max`.
 * 2. **Label badge** — No `count` prop, no `dot`. Renders the default slot.
 * 3. **Dot badge**   — `dot={true}`. Renders as a small circle with no content.
 *
 * @see {@link FeedbackProps}  in `feedback/feedback.props.ts`
 * @see {@link BADGE_DEFAULTS} in `feedback/badge/badge.tokens.ts`
 * @see {@link useBadge}       in `feedback/badge/badge.hook.ts`
 */

import type { FeedbackProps } from "../../feedback.props";

/**
 * Props for the `<Badge>` component.
 *
 * @example
 * !!!astro
 * <!-- Count badge (notification style) -->
 * <Badge count={12} />
 *
 * <!-- Capped count -->
 * <Badge count={150} max={99} />  <!-- renders "99+" -->
 *
 * <!-- Dot indicator -->
 * <Badge dot color="success" />
 *
 * <!-- Label badge (slot content) -->
 * <Badge variant="soft" color="info">Beta</Badge>
 *
 * <!-- Overlaid on a button -->
 * <div style="position: relative; display: inline-flex;">
 *   <Button>Messages</Button>
 *   <Badge count={3} placement="top-end" />
 * </div>
 * !!!
 */
import type { IconProps } from "~/shared/icon.props";

export interface BadgeProps extends FeedbackProps, IconProps {
  /**
   * Numeric count to display.
   *
   * When provided, the badge renders the number (capped by `max`).
   * When omitted, the default slot is rendered as label content.
   */
  count?: number;

  /**
   * Maximum count value before capping with `"+"`.
   *
   * When `count > max`, the badge displays `"${max}+"`.
   *
   * @default `99`
   * @example count=150, max=99 → "99+"
   * @example count=5,   max=99 → "5"
   */
  max?: number;

  /**
   * Renders the badge as a small filled circle with no visible content.
   *
   * When `true`, `count` and slot content are both ignored.
   * Useful as a presence/status indicator.
   *
   * @default `false`
   */
  dot?: boolean;

  /**
   * Renders the badge as a small circle or square containing only an icon.
   * Hides the count and slot content.
   */
  iconOnly?: boolean;
}

!!!

---

## banner.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/banner.props.ts`


!!!ts
// design/feedback/components/banner/banner.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { BannerColor, BannerRadius, BannerVariant } from "./banner.tokens";

import type { IconProps } from "~/shared/icon.props";

export interface BannerProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "size" | "pulse" | "placement">, IconProps {
  /** Visual treatment. @default "soft" */
  variant?: BannerVariant;

  /** Color role. @default "neutral" */
  color?: BannerColor;

  /** Border radius. @default "none" */
  radius?: BannerRadius;

  /**
   * Sticks the banner to the top of the viewport.
   * Emits `.banner--sticky` and `position: sticky; top: 0` via data attribute.
   * @default false
   */
  sticky?: boolean;

  /**
   * Adds a dismiss button.
   * @default false
   */
  dismissible?: boolean;

  /**
   * `aria-label` for the dismiss button. Only used when `dismissible=true`.
   * @default "Dismiss"
   */
  dismissLabel?: string;
}

!!!

---

## box.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/box.props.ts`


!!!ts
// design/layout/box/box.props.ts

import type { LayoutProps } from "~l/layout.props";
import type { BoxTag, BoxRadius } from "./box.tokens";

/**
 * Interface: `BoxProps`
 * 
 * Box is the fundamental layout primitive.
 * 
 * SPACING PROPS CHAIN:
 * `BoxProps` extends `LayoutProps`, which in turn extends `SpacingProps`.
 * This means every Box accepts a complete suite of spacing shorthand attributes
 * like `p` (padding), `px` (padding-x), `mt` (margin-top), etc., alongside
 * flex/grid controls like `gap`, `align`, and `justify`.
 */
export interface BoxProps extends LayoutProps {
  /** 
   * The semantic HTML element to render the box as.
   * Useful for accessibility and document outlining (e.g. 'section', 'article').
   * @default 'div' 
   */
  as?:     BoxTag;
  
  /** 
   * Visual border radius. 
   * Taps into the `RADIUS_DIM` token scale.
   */
  radius?: BoxRadius;
}
!!!

---

## breadcrumbs.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/breadcrumbs.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";
import type { SvgName } from "~/shared/icons";

export interface BreadcrumbItemData {
  /** Unique ID */
  id: string;
  /** Visible label text */
  label: string;
  /** URL to navigate to. If omitted, renders as text (usually for the current page) */
  href?: string;
  /** Whether this is the active/current page */
  active?: boolean;
  /** Optional icon to display next to the label */
  icon?: SvgName;
}

export interface BreadcrumbsProps extends NavProps {
  /** Array of items to automatically generate breadcrumbs */
  items?: BreadcrumbItemData[];
  /** Optional icon to use as a separator instead of standard text */
  separatorIcon?: SvgName;
  /** Text to use as separator. Defaults to '/' */
  separatorText?: string;
}

!!!

---

## item/b-item.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/item/b-item.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";
import type { IconProps } from "~/shared/icon.props";

export interface BreadcrumbItemProps extends HTMLAttributes<"a" | "span">, IconProps {
  /** If true, this item represents the current page. Renders as a span if no href is provided. */
  active?: boolean;
  /** URL to navigate to */
  href?: string;
  /** Whether this is the final item in the list (used to suppress the separator) */
  isLast?: boolean;
}

!!!

---

## button-group.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/button-group.props.ts`


!!!ts

!!!

---

## button.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/button.props.ts`


!!!ts
// design/triggers/button/button.props.ts

import type { TriggerProps } from "../../trigger.props";
import type { ButtonType, ButtonTarget } from "./button.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Button: true;
  }
}

import type { IconProps } from "~/shared/icon.props";

export type ButtonBaseProps = TriggerProps & IconProps & {
  /** HTML button type. @default 'button' */
  type?:      ButtonType;
  /** Renders as <a> when set. */
  href?:      string;
  /** Anchor target. Only used with href. */
  target?:    ButtonTarget;
  /** Anchor rel. Auto-set to 'noopener noreferrer' when target='_blank'. */
  rel?:       string;
  /** Square icon-only button — removes inline padding, forces aspect-ratio 1. @default false */
  iconOnly?:  boolean;
  /** Expands to fill container width. @default false */
  fullWidth?: boolean;
};

export type ButtonProps = ButtonBaseProps & (
  | { iconOnly?: false | undefined; "aria-label"?: string }
  | { iconOnly: true; "aria-label": string }
);
!!!

---

## caption.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/caption.props.ts`


!!!ts
import type { TypographyProps } from "../../typography.props";
import type { CaptionTag } from "./caption.tokens";

/**
 * Props for the Caption component.
 *
 * Extends {@link TypographyProps} with caption-specific options for
 * structure and placement.
 *
 * @see {@link useCaption} in `caption.hook.ts`
 */
export interface CaptionProps extends TypographyProps {
  /** The HTML tag to render. Defaults to `figcaption`. */
  as?: CaptionTag;
  /** An optional lead-in label, e.g., "Figure 1". */
  label?: string;
  /** An optional credit/attribution line. For rich content, use the `credit` slot. */
  credit?: string;
  /** If true, renders the caption as an overlay on a positioned parent. */
  overlay?: boolean;
  /** If true, adds a decorative left border accent. */
  rule?: boolean;
}
!!!

---

## card.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/card.props.ts`


!!!ts
// design/surfaces/components/card/card.props.ts

import type { SurfaceProps } from "../../surface.props";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Card: true;
  }
}

export type CardTag = "div" | "article" | "section" | "li";

export interface CardProps extends SurfaceProps {
  /** HTML element to render as. @default "div" */
  as?: CardTag;

  /**
   * Renders the card as an <a> and treats the whole surface as a link.
   * Mutually exclusive with interactive/selectable.
   */
  href?: string;

  /** Anchor target. Only used with href. */
  target?: "_self" | "_blank" | "_parent" | "_top";

  /** Anchor rel. Defaults to "noopener noreferrer" when target="_blank". */
  rel?: string;

  /**
   * Adds hover/focus styles and pointer cursor.
   * Use when the card has a client-side action but is not a link.
   * @default false
   */
  interactive?: boolean;

  /**
   * Makes the card a toggle — adds role="button" and aria-pressed.
   * Implies interactive behavior.
   * @default false
   */
  selectable?: boolean;

  /**
   * Pressed/selected state. Only meaningful when selectable=true.
   * @default false
   */
  selected?: boolean;

  /**
   * Disables interaction. Sets aria-disabled, tabindex=-1, and pointer-events: none.
   * @default false
   */
  disabled?: boolean;
}

!!!

---

## carousel.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/carousel.props.ts`


!!!ts

!!!

---

## center.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/center.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { CenterDirection } from "./center.tokens";

export interface CenterProps extends LayoutProps {
  /** 
   * Axis along which to center the content.
   * @default "both"
   */
  direction?: CenterDirection;
}

!!!

---

## checkbox.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/checkbox.props.ts`


!!!ts
// design/forms/checkbox/checkbox.props.ts

/**
 * @file Prop interface for the Checkbox component.
 * @module design/forms/checkbox
 *
 * {@link CheckboxProps} extends {@link FormProps} with checkbox-specific props.
 *
 * **Key design decision — `checkState` over `checked + indeterminate`:**
 * A single `checkState?: CheckState` prop replaces the two-boolean pattern.
 * The three values are mutually exclusive by type, eliminating the footgun
 * of `checked={true} indeterminate={true}` being simultaneously valid.
 *
 * @see {@link FormProps}        in `forms/forms.props.ts`
 * @see {@link CheckState}       in `forms/checkbox/checkbox.tokens.ts`
 * @see {@link CHECKBOX_DEFAULTS} in `forms/checkbox/checkbox.tokens.ts`
 * @see {@link useCheckbox}      in `forms/checkbox/checkbox.hook.ts`
 */

import type { FormProps }                from "~f/forms.props";
import type { CheckState, LabelPosition } from "./checkbox.tokens";

/**
 * Props for the `<Checkbox>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic uncontrolled -->
 * <Checkbox name="agree">I accept the terms</Checkbox>
 *
 * <!-- Controlled: checked -->
 * <Checkbox name="newsletter" value="subscribed" checkState="checked">
 *   Subscribe
 * </Checkbox>
 *
 * <!-- Select-all pattern -->
 * <Checkbox name="all" checkState={allSelected ? "checked" : noneSelected ? "unchecked" : "indeterminate"}>
 *   Select all
 * </Checkbox>
 *
 * <!-- Selectable chip -->
 * <Checkbox name="tag" value="ts" variant="outlined">TypeScript</Checkbox>
 * !!!
 */
export type CheckboxProps = FormProps & {
  id?: string;
  checkState?: CheckState;
  value?: string;
  labelPosition?: LabelPosition;
};
!!!

---

## chip.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/chip.props.ts`


!!!ts
// design/feedback/components/chip/chip.props.ts

import type { FeedbackProps } from "../../feedback.props";

export interface ChipProps extends FeedbackProps {
  /**
   * Defines the HTML element used for the chip.
   * Defaults to `"button"` to allow for interactivity.
   * @default `"button"`
   */
  as?: any; // To allow arbitrary HTML tags, though usually it's "button" or "a"
}

!!!

---

## code.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/code.props.ts`


!!!ts
// design/typography/components/code/code.props.ts
import type { TypographyProps } from "../../typography.props";

export type CodeTag = "code" | "span" | "kbd";
export type PreTag = "pre" | "div";

export interface CodeProps extends TypographyProps {
  as?: CodeTag;
  /** Whether this is a standalone code block or inline code. */
  block?: boolean;
}

export interface PreProps extends TypographyProps {
  as?: PreTag;
}

!!!

---

## color-picker.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/color-picker.props.ts`


!!!ts

!!!

---

## columns.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/columns.props.ts`


!!!ts

!!!

---

## combobox.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/combobox.props.ts`


!!!ts
// design/forms/combobox/combobox.props.ts

/**
 * @file Prop types for the Combobox component.
 * @module design/forms/combobox
 *
 * Combobox shares {@link SelectOption} with Select — the same option shape
 * (value, label, disabled) applies to both. Importing from Select's props
 * file crosses a component boundary, so {@link SelectOption} is re-exported
 * here under a local alias for clean import paths.
 *
 * @see {@link FormProps}          in `forms/forms.props.ts`           — parent
 * @see {@link SelectOption}       in `forms/select/select.props.ts`   — re-exported
 * @see {@link COMBOBOX_DEFAULTS}  in `forms/combobox/combobox.tokens.ts`
 * @see {@link useCombobox}        in `forms/combobox/combobox.hook.ts`
 */

import type { FormProps }    from "~f/forms.props";
import type { SelectOption } from "../select/select.props";

// ─── RE-EXPORT ────────────────────────────────────────────────────────────────

/**
 * A selectable option in the Combobox dropdown.
 * Re-exported from {@link SelectOption} for local import convenience.
 *
 * @see {@link SelectOption} in `forms/select/select.props.ts`
 */
export type ComboboxOption = SelectOption;

// ─── PROPS ────────────────────────────────────────────────────────────────────

/**
 * Props for the `<Combobox>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic -->
 * <Combobox
 *   name="country"
 *   placeholder="Select a country…"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 * />
 *
 * <!-- Controlled (pre-selected value) -->
 * <Combobox name="role" value="editor" options={roles} />
 *
 * <!-- Inside a Field -->
 * <Field id="country">
 *   <Label slot="label" for="country">Country</Label>
 *   <Combobox
 *     id="country"
 *     name="country"
 *     options={countries}
 *     aria-describedby="country-hint"
 *   />
 *   <span slot="hint" id="country-hint">Start typing to filter.</span>
 * </Field>
 * !!!
 */
export type ComboboxProps = FormProps & {
  id?: string;
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  caseSensitive?: boolean;
};

!!!

---

## command-palette.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/command-palette.props.ts`


!!!ts

!!!

---

## container.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/container.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { ContainerMaxWidth, ContainerTag } from "./container.tokens";

export interface ContainerProps extends LayoutProps {
  /** 
   * Maximum width of the container.
   * @default "lg"
   */
  maxWidth?: ContainerMaxWidth;
  
  /** HTML tag to render as. @default "div" */
  as?: ContainerTag;
}

!!!

---

## context-menu.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/context-menu.props.ts`


!!!ts

!!!

---

## cropper.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/cropper.props.ts`


!!!ts

!!!

---

## date-picker.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/date-picker/date-picker.props.ts`


!!!ts

!!!

---

## dot.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/dot/dot.props.ts`


!!!ts
// design/feedback/components/dot/dot.props.ts
import type { FeedbackProps } from "../../feedback.props";

export interface DotProps extends FeedbackProps {
  // Dot has no new behavioral props beyond what FeedbackProps provides,
  // but maps specifically to size, variant, color, pulse, and placement.
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Dot: true;
  }
}

!!!

---

## drawer.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.props.ts`


!!!ts
import type { BaseComponentProps } from "~/shared/base.props";
import type { DrawerPlacement, DrawerSize } from "./drawer.tokens";

export interface DrawerProps extends BaseComponentProps {
  id:               string;
  title?:           string;
  placement?:       DrawerPlacement;
  size?:            DrawerSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?:      boolean;
}

!!!

---

## dropdown-menu.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.props.ts`


!!!ts
import type { OverlaysProps } from "../../overlays.props";

export interface DropdownMenuProps extends OverlaysProps {
  id: string;
}

export interface DropdownItemProps {
  href?: string;
  icon?: string;
  popovertarget?: string;
  disabled?: boolean;
}

!!!

---

## empty-state.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/empty-state/empty-state.props.ts`


!!!ts
import type { FeedbackProps } from "../../feedback.props";
import type { IconProps } from "~/shared/icon.props";

export interface EmptyStateProps extends FeedbackProps, IconProps {
  title?: string;
  description?: string;
}

!!!

---

## feed.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/feed/feed.props.ts`


!!!ts
import type { DataProps } from "~/data/data.props";

export interface FeedItem {
  id?: string | number;
  /** The primary title/content of the feed event. */
  title: string;
  /** Date or time associated with the event. */
  timestamp?: string | Date;
  /** Longer description or body text. */
  description?: string;
  /** Optional icon or avatar to display on the timeline node. */
  icon?: any; // any node/string for Astro
  /** Link URL for the item. */
  href?: string;
}

export interface FeedProps extends DataProps {
  /** The events to display in the feed. */
  data?: FeedItem[];
  /** Layout orientation. */
  orientation?: "vertical" | "horizontal";
  /** Whether items are grouped visually. */
  grouped?: boolean;
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Feed: true;
  }
}

!!!

---

## field.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/field/field.props.ts`


!!!ts
// design/forms/field/field.props.ts

/**
 * @file Prop interface for the Field component.
 * @module design/forms/field
 *
 * {@link FieldProps} extends {@link BaseComponentProps} directly —
 * NOT {@link FormProps} — because Field is a structural wrapper, not a
 * form control. It never renders a native form element.
 *
 * **Responsibility split between Field props and control props:**
 *
 * | Concern            | Where it lives        | Why                              |
 * |--------------------|-----------------------|----------------------------------|
 * | `invalid` (ARIA)   | Control (`InputProps`) | Goes on the native `<input>`     |
 * | `invalid` (visual) | `FieldProps`          | Drives CSS on the wrapper group  |
 * | `required` (ARIA)  | Control (`InputProps`) | Goes on the native `<input>`     |
 * | `required` (visual)| `FieldProps`          | Drives CSS; forwarded to Label   |
 * | `aria-describedby` | Consumer (manual)     | Astro slots can't wire this auto |
 * | hint/error IDs     | Field (via `id` prop) | Field generates `{id}-hint` etc. |
 *
 * **`id` prop and accessibility wiring:**
 * Passing an `id` to Field enables the recommended accessibility pattern:
 *
 * !!!astro
 * <Field id="email" invalid={!isValid} required>
 *   <Label slot="label" for="email" required>Email</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     invalid={!isValid}
 *     aria-describedby="email-hint email-error"
 *   />
 *   <span slot="hint"    id="email-hint">We'll never share it.</span>
 *   <span slot="error"   id="email-error">Enter a valid email.</span>
 * </Field>
 * !!!
 *
 * Field renders `id="{id}-hint"` and `id="{id}-error"` on its own hint/error
 * wrapper elements. The consumer passes `aria-describedby` to the control
 * directly, referencing those IDs.
 *
 * @see {@link BaseComponentProps} in `shared/base.props.ts`  — parent interface
 * @see {@link useField}           in `forms/field/field.hook.ts`
 * @see `forms/field/Field.astro`  — slot structure and id derivation
 */

import type { BaseComponentProps } from "~/shared/base.props";
import type { IconProps } from "~/shared/icon.props";

/**
 * Props for the `<Field>` component.
 *
 * @example
 * !!!astro
 * <!-- Minimal — no wiring -->
 * <Field>
 *   <Label slot="label">Username</Label>
 *   <Input name="username" />
 * </Field>
 *
 * <!-- Full accessibility wiring -->
 * <Field id="email" invalid={!emailValid} required>
 *   <Label slot="label" for="email" required>Email address</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     invalid={!emailValid}
 *     required
 *     aria-describedby="email-hint email-error"
 *   />
 *   <span slot="hint" id="email-hint">We'll never share your email.</span>
 *   <span slot="error" id="email-error">Enter a valid email address.</span>
 * </Field>
 * !!!
 */
export interface FieldProps extends BaseComponentProps, IconProps {
  /**
   * Base identifier for this field group.
   *
   * When provided, Field derives stable IDs for its hint and error wrappers:
   * - Hint wrapper: `id="{id}-hint"`
   * - Error wrapper: `id="{id}-error"`
   * - Success wrapper: `id="{id}-success"`
   *
   * Pass the same value as the `id` on the control in the default slot,
   * and reference `"{id}-hint"` / `"{id}-error"` in `aria-describedby`
   * on the control.
   */
  id?: string;

  /**
   * Whether this field group is in an invalid/error state.
   *
   * Adds `data-invalid` to the Field wrapper and applies the
   * `field--invalid` modifier class. CSS uses this to:
   * - Show the error slot area with danger colors
   * - Apply a subtle error highlight to the control wrapper
   *
   * @remarks
   * This mirrors the `invalid` prop on the control (Input, Select, etc.)
   * inside the field. Both should be set to the same value — the control's
   * `invalid` handles ARIA (`aria-invalid="true"`) while Field's `invalid`
   * handles the surrounding group styling.
   *
   * @default false
   */
  invalid?: boolean;

  /**
   * Whether this field group is required.
   *
   * Adds `data-required` to the Field wrapper. CSS can use this to style
   * the field group as a whole. Field passes this information to consumers
   * via context — the consumer is still responsible for passing `required`
   * to both the control (for native validation) and the Label (for the
   * visual asterisk indicator).
   *
   * @default false
   */
  required?: boolean;
}
!!!

---

## file-preview.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/file-preview/file-preview.props.ts`


!!!ts
// design/assets/components/file-preview/file-preview.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { FilePreviewSize, FilePreviewRadius, FilePreviewLayout } from "./file-preview.tokens";

export interface FilePreviewProps extends BaseComponentProps {
  /** File name, including extension (e.g. "report.pdf"). */
  name:     string;
  /** Image URL. When provided, renders a thumbnail instead of the type icon. */
  src?:     string;
  /** Human-readable file size string (e.g. "2.4 MB"). */
  fileSize?: string;
  /** Card (vertical stack) or strip (horizontal row). @default 'card' */
  layout?:  FilePreviewLayout;
  /** Component size. @default 'md' */
  size?:    FilePreviewSize;
  /** Border radius. @default 'md' */
  radius?:  FilePreviewRadius;
  /** Marks the file as removable — renders a dismiss button. */
  removable?: boolean;
  /** Called when the dismiss button is clicked. */
  onRemove?:  string;
}

!!!

---

## file-upload.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/file-upload/file-upload.props.ts`


!!!ts

!!!

---

## flex.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/flex.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { FlexDirection, FlexWrap, FlexTag } from "./flex.tokens";

export interface FlexProps extends LayoutProps {
  /** Flex direction. @default "row" */
  direction?: FlexDirection;
  
  /** Flex wrap behavior. @default "nowrap" */
  wrap?: FlexWrap;
  
  /** HTML tag to render as. @default "div" */
  as?: FlexTag;
}

!!!

---

## footer.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/footer/footer.props.ts`


!!!ts
// design/layout/components/footer/footer.props.ts

/**
 * FooterProps
 *
 * Extends the full `LayoutProps` chain (which itself extends `SpacingProps`),
 * meaning every spacing shorthand (`p`, `px`, `py`, `pt` … `ml`), flex controls
 * (`gap`, `align`, `justify`), and base component props (`class`, `bg`, etc.)
 * are available on `<Footer>` without re-declaration.
 *
 * Footer introduces no props beyond those it inherits. Its semantic role is
 * fixed (`<footer>`) and it carries no behavioural variants (unlike Header's
 * `sticky`). Rich internal layouts are achieved by composing Box children
 * inside its named slots rather than via additional footer-level props.
 *
 * Named slots consumed by Footer.astro:
 *   - `start`   — left-hand content area (copyright notice, brand mark).
 *   - default   — center content area (nav links, social icons).
 *   - `end`     — right-hand content area (legal links, locale picker).
 */

import type { LayoutProps } from "~l/layout.props";

export interface FooterProps extends LayoutProps {}

!!!

---

## frame.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.props.ts`


!!!ts
// design/surfaces/components/frame/frame.props.ts
import type { SurfaceProps } from "../../surface.props";

export type FrameTag = "div" | "figure" | "picture" | "span";

export interface FrameProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: FrameTag;

  /**
   * Aspect ratio of the frame.
   * Can be a fraction (e.g., "16/9", "4/3") or a single number (e.g., "1").
   * @default "auto"
   */
  ratio?: string;

  /**
   * Prevents content from overflowing the frame boundaries.
   * Useful when rounding corners of media content.
   * @default true
   */
  clip?: boolean;
}

!!!

---

## gallery-item.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery-item/gallery-item.props.ts`


!!!ts

!!!

---

## gallery.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery/gallery.props.ts`


!!!ts

!!!

---

## grid.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/grid.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { GridColumns, GridFit, GridTag } from "./grid.tokens";

export interface GridProps extends LayoutProps {
  /** Number of grid columns. */
  columns?: GridColumns;
  fit?: GridFit;
  /** HTML tag to render as. @default "div" */
  as?: GridTag;
}

!!!

---

## header.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/header/header.props.ts`


!!!ts
// design/layout/components/header/header.props.ts

/**
 * HeaderProps
 *
 * Extends the full `LayoutProps` chain (which itself extends `SpacingProps`),
 * meaning every spacing shorthand (`p`, `px`, `py`, `pt` … `ml`), flex controls
 * (`gap`, `align`, `justify`), and base component props (`class`, `bg`, etc.)
 * are available on `<Header>` without re-declaration.
 *
 * Header-specific additions:
 *   - `sticky`  — toggles sticky positioning via a CSS class modifier.
 *
 * Named slots consumed by Header.astro:
 *   - `start`   — left-hand content area (logo, wordmark, hamburger menu).
 *   - default   — center content area (primary nav, search bar).
 *   - `end`     — right-hand content area (CTA, user avatar, icon cluster).
 */

import type { LayoutProps } from "~l/layout.props";

export interface HeaderProps extends LayoutProps {
  /**
   * When `true`, renders the header with `position: sticky; top: 0` so it
   * stays visible as the user scrolls.
   *
   * Implemented via the `header--sticky` BEM modifier class. Z-index is
   * provided automatically via `--z--sticky` when the modifier is active.
   *
   * @default false
   */
  sticky?: boolean;
}

!!!

---

## heading.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/heading/heading.props.ts`


!!!ts
// design/typography/heading/heading.props.ts
import type { TypographyProps } from "../../typography.props";
import type { HeadingLevel, HeadingWeight } from "./heading.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    h1: true; h2: true; h3: true; h4: true; h5: true; h6: true;
  }
}

import type { IconProps } from "~/shared/icon.props";

export interface HeadingProps extends TypographyProps, IconProps {
  /**
   * Semantic heading level — controls the rendered element (h1–h6).
   * Choose based on document structure, not visual size.
   * Use the `size` prop to control appearance independently.
   * @default 2
   */
  level?:  HeadingLevel;

  /** Narrowed to semibold, bold, or black. @default inherited from CSS */
  weight?: HeadingWeight;

  // clamp, truncate, fontStyle intentionally not re-declared here
}
!!!

---

## icon.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/icon/icon.props.ts`


!!!ts
// design/assets/components/icon/icon.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { IconSize, IconColor } from "./icon.tokens";
import type { SvgName } from "~/shared/icons";

export interface IconProps extends BaseComponentProps {
  /**
   * The name of the SVG icon to render.
   * Must match a valid key in `src/design/shared/icons/index.ts`.
   */
  name: SvgName;

  /**
   * The size of the icon. Maps to `--icon-size-*` CSS properties.
   * @default "md"
   */
  size?: IconSize;
  color?: IconColor;
}

!!!

---

## image.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/image/image.props.ts`


!!!ts
// design/assets/image/image.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { SpacingProps }       from "~/shared/spacing.props";
import type { ImageRadius, ImageRatio, ImageFit } from "./image.tokens";

export interface ImageProps extends BaseComponentProps, SpacingProps {
  /** Image source URL. */
  src:       string;
  /** Alt text. Pass empty string for decorative images. */
  alt:       string;
  /** Aspect ratio preset. */
  ratio?:    ImageRatio;
  /** object-fit behaviour. @default 'cover' */
  fit?:      ImageFit;
  /** Native loading strategy. @default 'lazy' */
  imgLoading?:  "lazy" | "eager";
  /** Border radius. */
  radius?:   ImageRadius;
  /** Intrinsic width. */
  width?:    number | string;
  /** Intrinsic height. 
   * accepts a number or a string with a unit (e.g., "100px").
   */
  height?:   number | string;
}
!!!

---

## indent.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/indent/indent.props.ts`


!!!ts
/**
 * src/design/typography/components/indent/indent.props.ts
 * 
 * Props for the Indent component.
 * 
 * @see indent.hook.ts   — resolves props to { Tag, props, type, size }
 * @see typography.hook.ts — resolves props to { typographyAttributes }
 * @see base.props.ts    — base component props
 * @see typography.props.ts - typography-specific props, extends BaseComponentProps
 * @see indent.css       — indent-specific styles
 * @see typography.css   — shared typography styles
 */
import type { TypographyProps } from '~/typography/typography.props';
import type { IndentSize } from './indent.tokens';

export type IndentType = 'ui' | 'code' | 'prose';

export interface IndentProps extends TypographyProps {
  prose?: IndentSize;
  ui?: IndentSize;
  code?: IndentSize;
}
!!!

---

## indicator.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/indicator/indicator.props.ts`


!!!ts

!!!

---

## inline.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/inline.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { InlineTag } from "./inline.tokens";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */


export interface InlineProps extends LayoutProps {
  /** HTML tag to render as. @default "span" */
  as?: InlineTag;
}

!!!

---

## input-group.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input-group/input-group.props.ts`


!!!ts

!!!

---

## input.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input/input.props.ts`


!!!ts
// design/forms/input/input.props.ts

/**
 * @file Prop interface for the Input component.
 * @module design/forms/input
 *
 * {@link InputProps} extends {@link FormProps} with the props unique to a
 * single-line text input. All token dimensions, ARIA/behavior props, and
 * base component props are inherited — only Input-specific additions live here.
 *
 * **Full prop inheritance chain:**
 * !!!
 * BaseComponentProps       class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FormProps                size, variant, color, radius,
 *        ↑                 disabled, required, invalid, name, fullWidth
 * InputProps               id, type, value, placeholder, readonly,
 *                          minLength, maxLength, pattern, autocomplete
 * !!!
 *
 * **Slot props (not declared here — handled by Input.astro):**
 * - `start` slot — leading content: icon, flag, currency prefix, area code
 * - `end` slot   — trailing content: reveal-password toggle, clear button, unit
 *
 * These are Astro named slots, not TypeScript props. They cannot be typed
 * in `InputProps` — document them in `Input.astro`'s component comment.
 *
 * **What is intentionally NOT in InputProps:**
 * - `onChange` — server-rendered Astro components handle change events via
 *   native browser events or framework-specific progressive enhancement.
 *   A client-side `onChange` prop is out of scope for the server-rendered layer.
 * - `step`, `min`, `max` — valid on `type="number"` only. Passed through
 *   `rest` as plain HTML attributes. No explicit declaration needed.
 * - `accept` — valid on `type="file"` only, and file is excluded from
 *   {@link INPUT_TYPES}.
 *
 * @see {@link FormProps}       in `forms/forms.props.ts`       — parent interface
 * @see {@link InputType}       in `forms/input/input.tokens.ts` — allowed type values
 * @see {@link INPUT_DEFAULTS}  in `forms/input/input.tokens.ts` — default values
 * @see {@link useInput}        in `forms/input/input.hook.ts`   — runtime resolution
 *
 * @todo If a `label` slot is desired directly on Input (bypassing Field),
 *   add `label?: string` here as a shorthand — hook renders it as a
 *   `<label>` inside the wrapper. Not recommended: prefer the {@link Field}
 *   + {@link Label} composition for full accessibility control.
 */

import type { FormProps }   from "~/forms/forms.props";
import type { InputType }   from "./input.tokens";

/**
 * Props for the `<Input>` component.
 *
 * Extends {@link FormProps} which extends {@link BaseComponentProps}.
 * All inherited props are available without redeclaration.
 *
 * @example
 * !!!astro
 * <!-- Minimal: type defaults to "text", size to "md", variant to "outlined" -->
 * <Input name="first-name" placeholder="First name" />
 *
 * <!-- Full example inside a Field -->
 * <Field id="email" invalid={!emailValid}>
 *   <Label slot="label" for="email" required>Email address</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     value={emailValue}
 *     size="lg"
 *     variant="outlined"
 *     color="primary"
 *     invalid={!emailValid}
 *     aria-describedby="email-error"
 *     fullWidth
 *   >
 *     <span slot="start">✉</span>
 *   </Input>
 *   <span slot="error" id="email-error">Enter a valid email address.</span>
 * </Field>
 * !!!
 *
 * @see {@link FormProps}      — inherited token dimensions and behavior props
 * @see {@link INPUT_DEFAULTS} — which props have defaults and what they are
 * @see {@link useInput}       — hook that resolves these props to HTML attributes
 */
import type { IconProps } from "~/shared/icon.props";

export type InputProps = FormProps & IconProps & {
  id?: string;
  type?: InputType;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autocomplete?: string;
};
!!!

---

## kbd.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/kbd/kbd.props.ts`


!!!ts
// design/typography/components/kbd/kbd.props.ts
import type { TypographyProps } from "../../typography.props";

import type { IconProps } from "~/shared/icon.props";

export interface KbdProps extends TypographyProps, IconProps {}

!!!

---

## label.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/label.props.ts`


!!!ts
// design/typography/label/label.props.ts

/**
 * @file Prop interface for the Label component.
 * @module design/typography/label
 *
 * {@link LabelProps} extends {@link TypographyProps} and narrows two
 * dimensions (size → fixed scale, weight → limited range) while adding
 * the two props unique to a `<label>` element: `for` and `required`.
 *
 * **`for` is not aliased to `htmlFor`:**
 * Astro templates use native HTML attribute names, not React camelCase.
 * The prop is named `for` (valid in TypeScript interface definitions even
 * though `for` is a reserved keyword) and passes through to the rendered
 * `<label for="…">` attribute without aliasing. When destructuring in the
 * hook, use `const { "for": _for, ... }` if needed, or let it flow through
 * `rest` naturally.
 *
 * **`required` is visual-only:**
 * `required` on Label renders a visible `*` indicator beside the label text
 * (as an `aria-hidden` span). It does NOT set `aria-required` — that belongs
 * on the form control (Input, Select, etc.). The indicator is for sighted
 * users; screen readers get requirement information from the control's own
 * ARIA attributes.
 *
 * @see {@link TypographyProps}  in `typography/typography.props.ts` — parent
 * @see {@link LabelSize}        in `typography/label/label.tokens.ts`
 * @see {@link LabelWeight}      in `typography/label/label.tokens.ts`
 * @see {@link LABEL_DEFAULTS}   in `typography/label/label.tokens.ts`
 * @see {@link useLabel}         in `typography/label/label.hook.ts`
 */

import type { TypographyProps } from "../../typography.props";
import type { LabelSize, LabelWeight } from "./label.tokens";

/**
 * Props for the `<Label>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic -->
 * <Label for="email">Email address</Label>
 *
 * <!-- Required field indicator -->
 * <Label for="email" required>Email address</Label>
 *
 * <!-- Custom size and weight -->
 * <Label for="search" size="xs" weight="normal" color="secondary">
 *   Search query
 * </Label>
 *
 * <!-- Inside a Field -->
 * <Field id="email">
 *   <Label slot="label" for="email" required>Email</Label>
 *   <Input id="email" name="email" required />
 * </Field>
 * !!!
 *
 * @see {@link TypographyProps} — inherited typography dimensions
 * @see {@link useLabel}        — resolves these props at runtime
 */
import type { IconProps } from "~/shared/icon.props";

export interface LabelProps extends TypographyProps, IconProps {
  /**
   * The `id` of the form control this label is associated with.
   *
   * Sets the native `for` attribute on the rendered `<label>` element,
   * creating an accessible association between the label text and its
   * control. Clicking the label focuses the control.
   *
   * @remarks
   * Not required when Label is a child of a `<label>`-wrapping component
   * (Checkbox, Radio), since those components use `<label>` as their root
   * element and the association is implicit. Use `for` when Label is used
   * with Input, Select, or other controls that render a separate element.
   *
   * @example `for="email"` — associates with `<input id="email">`
   */
  for?: string;

  /**
   * Whether to show the required field indicator (`*`) beside the label text.
   *
   * When `true`, renders `<span class="label__required" aria-hidden="true">*</span>`
   * after the label content. The `aria-hidden` attribute hides the asterisk
   * from screen readers — screen readers get required-field information from
   * `aria-required="true"` on the control, not from a visual symbol.
   *
   * @remarks
   * Set `required` on both Label (for the visual indicator) AND on the
   * control (for native browser validation and `aria-required`).
   *
   * @default false
   */
  required?: boolean;

  /**
   * Font size — uses the fixed scale ({@link TEXT_SIZE_FIXED}), not the
   * responsive scale ({@link TEXT_SIZE}) used by Text and Heading.
   *
   * @default `"sm"` — applied by {@link useLabel}
   */
  size?: LabelSize;

  /**
   * Font weight — narrowed from the full typography weight range.
   * `"bold"` and `"black"` are excluded.
   *
   * @default `"medium"` — applied by {@link useLabel}
   */
  weight?: LabelWeight;
}
!!!

---

## lightbox.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/lightbox/lightbox.props.ts`


!!!ts

!!!

---

## link.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/link/link.props.ts`


!!!ts
// design/typography/link/link.props.ts

import type { TypographyProps } from "~ty/typography.props";
import type { LinkUnderline } from "./link.tokens";

import type { IconProps } from "~/shared/icon.props";

/**
 * Interface: `LinkProps`
 * 
 * Defines the API for the Link component.
 * Because links are primarily textual, this interface extends `TypographyProps`,
 * allowing you to use sizes, weights, families, and colors directly on the link.
 */
export interface LinkProps extends TypographyProps, IconProps {
  /**
   * The destination URL for the link.
   * When omitted, renders as a placeholder link (no navigation).
   */
  href?:       string;
  
  /** 
   * Specifies where to open the linked document.
   * @example "_blank" (new tab), "_self" (same frame)
   */
  target?:     string;
  
  /** 
   * Specifies the relationship between the current document and the linked document.
   * Automatically defaults to 'noopener noreferrer' when `target` is '_blank' or `external` is true
   * to prevent security vulnerabilities (reverse tabnabbing).
   */
  rel?:        string;
  
  /** 
   * Shorthand boolean to designate an external link.
   * When true, this automatically applies `target="_blank"` and `rel="noopener noreferrer"`.
   */
  external?:   boolean;
  
  /** 
   * Controls when the underline appears.
   * - `always`: Underline is constantly visible.
   * - `hover`: Underline only appears on mouse over or focus.
   * - `never`: No underline is shown.
   * 
   * @default "hover"
   */
  underline?:  LinkUnderline;
}
!!!

---

## item/list-item.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/item/list-item.props.ts`


!!!ts
import type { BaseComponentProps } from "~/shared/base.props";
import type { IconProps } from "~/shared/icon.props";

export interface ListItemProps extends BaseComponentProps, IconProps {
  /** Visual check state for a to-do/checklist pattern */
  checkState?: "checked" | "unchecked" | "indeterminate";
  
  /** URL to navigate to, turning the item into a link */
  href?: string;
  
  /** Secondary description text */
  description?: string;
  
  /** Optional badge text or count */
  badge?: string | number;
  
  /** Mutes the item visually */
  disabled?: boolean;
}

!!!

---

## list.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/list.props.ts`


!!!ts
// design/data/list/list.props.ts

import type { DataProps }                        from "~/data/data.props";
import type { ListItem, ListOrientation }        from "./list.tokens";

/**
 * Props for the `<List>` component.
 *
 * Extends {@link DataProps} which extends {@link BaseComponentProps}.
 * All inherited data category props are available without redeclaration:
 * color, bg, highlight, variant, size, caption, loading, empty,
 * striped, bordered, interactive, selectable, scrollable.
 *
 * **Two rendering modes:**
 *
 * Data-driven — List owns all rendering:
 * !!!astro
 * <List data={items} caption="Tasks" />
 * !!!
 *
 * Compound — consumer controls item structure via the `items` slot:
 * !!!astro
 * <List caption="Tasks">
 *   <li slot="items" class="list__item">Custom item</li>
 * </List>
 * !!!
 *
 * **What is intentionally NOT in ListProps:**
 * - Per-item event handlers — selection is managed externally via
 *   `list:selectionchange` on the root element (same pattern as Table)
 * - `bullet` style — controlled via CSS on the consumer side or via
 *   the `class` prop; too many edge cases to enumerate as a prop
 *
 * @see {@link DataProps}      in `data/data.props.ts`        — parent interface
 * @see {@link ListItem}       in `data/list/list.tokens.ts`  — item shape
 * @see {@link LIST_DEFAULTS}  in `data/list/list.tokens.ts`  — default values
 * @see {@link useList}        in `data/list/list.hook.ts`    — runtime resolution
 */
export interface ListProps extends DataProps {

  // ─── DATA-DRIVEN MODE ──────────────────────────────────────

  /**
   * Items to render. Each object is one `<li>`.
   *
   * Provide `checkState` on items for a checklist/to-do pattern.
   * Provide `children` on items for nested sub-lists.
   * Provide `href` on items for a link list.
   *
   * When omitted, List renders only what is provided via the `items` slot
   * (compound mode).
   *
   * @see {@link ListItem} for the full item shape
   */
  data?: ListItem[];

  // ─── LAYOUT ────────────────────────────────────────────────

  /**
   * Renders as `<ol>` (ordered / numbered) instead of `<ul>`.
   *
   * Applies to the root list and all nested child lists.
   * List markers are browser-default for `<ol>` — override in CSS
   * via `list-style-type` on `.list` if custom numbering is needed.
   *
   * @default false
   */
  ordered?: boolean;

  /**
   * Layout axis for list items.
   *
   * - `"vertical"`   — stacked (default). Standard list behaviour.
   * - `"horizontal"` — side-by-side. Use for tag groups, chip lists,
   *                    inline option sets. Adds `flex-wrap: wrap` so
   *                    items reflow when the container is narrow.
   *
   * Adds modifier class `.list--vertical` or `.list--horizontal`.
   *
   * @default `"vertical"` — applied by {@link useList}
   */
  orientation?: ListOrientation;
}
!!!

---

## item/m-item.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/item/m-item.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";
import type { IconProps } from "~/shared/icon.props";

export interface MenuItemProps extends HTMLAttributes<"a" | "button">, IconProps {
  /** Optional ID for the item */
  id?: string | undefined;
  /** If provided, renders as an `<a>` tag, otherwise a `<button>` */
  href?: string | undefined;
  /** Whether the item is currently active/selected */
  active?: boolean | undefined;
  /** Whether the item is disabled */
  disabled?: boolean | undefined;
}

!!!

---

## menu.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/menu.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";
import type { SvgName }  from "~/shared/icons";

/**
 * Data structure for a single menu item when using the data-driven approach.
 */
export interface MenuItemData {
  /** Unique identifier, used for active state matching */
  id: string;
  /** Text to display */
  label: string;
  /** If provided, renders as an `<a>` tag */
  href?: string;
  /** Optional icon to render before the label */
  icon?: SvgName;
  /** If true, the item is not interactive */
  disabled?: boolean;
  /** Nested children (rendered if indentChildren is true) */
  children?: MenuItemData[];
}

export interface MenuProps extends NavProps {
  /**
   * Data-driven array of menu items.
   * If omitted, you must provide `<MenuItem>` components as children.
   */
  items?: MenuItemData[];

  /**
   * If true, nested items (children) are indented.
   * @default true
   */
  indentChildren?: boolean;
}

!!!

---

## metric.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/metric/metric.props.ts`


!!!ts
import type { DataProps } from "~/data/data.props";
import type { IconProps } from "~/shared/icon.props";

export interface MetricProps extends DataProps, IconProps {
  /** The primary numeric or string value. */
  value?: string | number;
  /** The main label or title for the metric. */
  label?: string;
  /** A longer description or prose text (e.g. "3/4 people agree with this longer thing"). */
  description?: string;
  /** A trend value (e.g. "12%", "-5") */
  trend?: string | number;
  /** Trend direction to drive color/icon. */
  trendDirection?: "up" | "down" | "neutral";
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Metric: true;
  }
}

!!!

---

## modal.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/modal/modal.props.ts`


!!!ts
import type { OverlaysProps } from "../../overlays.props";

export interface ModalProps extends OverlaysProps {
  id:               string;
  title?:           string;
  closeOnBackdrop?: boolean;
  closeOnEsc?:      boolean;
}

!!!

---

## multiselect.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/multiselect/multiselect.props.ts`


!!!ts

!!!

---

## brand/brand.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/brand/brand.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";

export interface NavbarBrandProps extends HTMLAttributes<"div"> {}

!!!

---

## content/content.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/content/content.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";

export interface NavbarContentProps extends HTMLAttributes<"div"> {
  /** If true, this content block will be hidden on mobile screens and moved into the hamburger menu */
  hideOnMobile?: boolean;
}

!!!

---

## navbar.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/navbar.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";

export interface NavbarProps extends NavProps {
  /** If true, the navbar sticks to the top of the viewport when scrolling */
  sticky?: boolean;
  /** If true, applies a glassmorphism blur effect to the background */
  glass?: boolean;
  /** Custom max-width for the internal container (e.g., "1200px" or "100%") */
  maxWidth?: string;
}

!!!

---

## number-input.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/number-input/number-input.props.ts`


!!!ts

!!!

---

## pagination.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/pagination/pagination.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";

export interface PaginationProps extends Omit<NavProps, "activeId"> {
  /** The current active page number (1-indexed). */
  currentPage: number;
  
  /** The total number of pages available. */
  totalPages: number;
  
  /** Number of sibling pages to show on each side of the current page. @default 1 */
  siblingCount?: number;
  
  /** Whether to show the previous/next arrow controls. @default true */
  showControls?: boolean;
  
  /** Base URL path to build pagination links. e.g. "/blog/page/" -> "/blog/page/2" */
  baseUrl?: string;
  
  /** Optional override for generating URLs based on page number. Takes precedence over baseUrl. */
  getPageUrl?: (page: number) => string;
}

!!!

---

## panel.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/panel/panel.props.ts`


!!!ts
// design/surfaces/components/panel/panel.props.ts
import type { SurfaceProps } from "../../surface.props";

export type PanelTag = "div" | "aside" | "section" | "details";

export interface PanelProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: PanelTag;
}

!!!

---

## paper.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/paper/paper.props.ts`


!!!ts
// design/surfaces/components/paper/paper.props.ts

import type { SurfaceProps } from "../../surface.props";
import type { PaperGap }     from "./paper.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Paper: true;
  }
}

export type PaperTag = "div" | "section" | "article" | "aside" | "main" | "li";

export interface PaperProps extends SurfaceProps {
  /** HTML element to render as. @default "div" */
  as?: PaperTag;

  /**
   * Stack children vertically using flexbox.
   * Enables gap between children; does nothing otherwise.
   * @default false
   */
  stack?: boolean;

  /**
   * Gap between stacked children. Only meaningful when stack=true.
   * @default "md"
   */
  gap?: PaperGap;

  /**
   * Expand to fill container width.
   * @default false
   */
  fullWidth?: boolean;
}

!!!

---

## popover.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/popover/popover.props.ts`


!!!ts
import type { BaseComponentProps } from "~/shared/base.props";
import type { PopoverPlacement, PopoverRadius } from "./popover.tokens";

export interface PopoverProps extends BaseComponentProps {
  id:          string;
  placement?:  PopoverPlacement;
  radius?:     PopoverRadius;
}

!!!

---

## portal.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/portal/portal.props.ts`


!!!ts

!!!

---

## progress.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/progress/progress.props.ts`


!!!ts
// design/feedback/progress/progress.props.ts

/**
 * @file Prop interface for the Progress component.
 * @module design/feedback/progress
 *
 * {@link ProgressProps} extends {@link FeedbackProps} with props for
 * displaying completion state across four display types.
 *
 * **Inheritance chain:**
 * !!!
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps        size, variant, color, radius, pulse, placement
 *        ↑
 * ProgressProps        value, max, type, showValue, indeterminate
 * !!!
 *
 * **Fill computation:**
 * The hook computes `fillPercent = clamp(value / max, 0, 1) * 100` and
 * writes it as `--progress--fill: X%`. CSS reads it as:
 *   - `width` for `bar`
 *   - `stroke-dashoffset` for `ring`
 *   - Display text for `number` and `percent`
 *
 * **Label:**
 * Progress has no `label` prop — use the default slot to provide a label
 * or descriptive text above or below the indicator. Consumer owns markup.
 *
 * @see {@link PROGRESS_DEFAULTS} in `feedback/progress/progress.tokens.ts`
 * @see {@link useProgress}       in `feedback/progress/progress.hook.ts`
 */

import type { FeedbackProps } from "../../feedback.props";
import type { ProgressType }  from "./progress.tokens";

/**
 * Props for the `<Progress>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic bar (60% complete) -->
 * <Progress value={60} />
 *
 * <!-- Ring with value shown -->
 * <Progress value={3} max={10} type="ring" showValue />
 *
 * <!-- Large number display -->
 * <Progress value={6} max={10} type="number" />  <!-- → "6/10" -->
 *
 * <!-- Percentage display -->
 * <Progress value={84} type="percent" />  <!-- → "84%" -->
 *
 * <!-- Indeterminate (loading, unknown progress) -->
 * <Progress indeterminate />
 *
 * <!-- With a label slot -->
 * <Progress value={45} color="success">
 *   <span>Upload progress</span>
 * </Progress>
 * !!!
 */
export interface ProgressProps extends FeedbackProps {
  /**
   * Current progress value. Should be between `0` and `max`.
   * When undefined and `indeterminate` is false, renders an empty track.
   */
  value?: number;

  /**
   * Maximum value. The fill percentage is computed as `value / max`.
   * @default `100`
   */
  max?: number;

  /**
   * Display style for the progress indicator.
   *
   * - `bar`     — Horizontal track with a fill div. Classic progress bar.
   * - `ring`    — Circular SVG stroke. Radial / donut progress.
   * - `number`  — Large display-font numeral: `"{value}/{max}"`. No track rendered.
   * - `percent` — Large display-font percentage: `"{fillPercent}%"`. No track rendered.
   *
   * @default `"bar"`
   */
  type?: ProgressType;

  /**
   * Renders the computed percentage value alongside `bar` or `ring` types.
   * Has no effect on `number` or `percent` types (they are already numeric).
   *
   * @default `false`
   */
  showValue?: boolean;

  /**
   * Indeterminate state — progress is active but amount is unknown.
   *
   * When true:
   * - `bar`: shows an animated shimmer sweep across the track.
   * - `ring`: shows an animated rotating arc.
   * - `number`/`percent`: shows `"—"`.
   *
   * @default `false`
   */
  indeterminate?: boolean;
}

!!!

---

## alert-dialog.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.props.ts`


!!!ts
import type { OverlaysProps } from "../../overlays.props";
import type { IconProps } from "~/shared/icon.props";

export interface AlertDialogProps extends OverlaysProps, IconProps {
  id:           string;
  title:        string;
  description?: string;
  closeOnEsc?:  boolean;
}

!!!

---

---

## alert.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/alert.props.ts`


!!!ts
// design/feedback/components/alert/alert.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { AlertColor, AlertRadius, AlertVariant } from "./alert.tokens";

import type { IconProps } from "~/shared/icon.props";

export interface AlertProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "pulse" | "placement">, IconProps {
  /** Visual treatment. @default "soft" */
  variant?: AlertVariant;

  /** Color role. @default "neutral" */
  color?: AlertColor;

  /** Border radius. @default "md" */
  radius?: AlertRadius;
  dismissible?: boolean;

  /**
   * `aria-label` for the dismiss button. Only used when `dismissible=true`.
   * @default "Dismiss"
   */
  dismissLabel?: string;
}

!!!

---

---

## audio.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.props.ts`


!!!ts
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

!!!

---

---

## avatar-group.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/avatar-group.props.ts`


!!!ts

!!!

---

---

## avatar.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/avatar.props.ts`


!!!ts
// design/assets/components/avatar/avatar.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { AvatarSize, AvatarRadius, AvatarStatus } from "./avatar.tokens";

export interface AvatarProps extends BaseComponentProps {
  /** Image URL. Omit to show initials or icon fallback. */
  src?:      string;
  /** Alt text for the image. Pass name for accessibility. */
  alt?:      string;
  /** 1–2 character initials shown when `src` is absent or fails. */
  initials?: string;
  /** Avatar size. @default 'md' */
  size?:     AvatarSize;
  /** Border radius. @default 'full' */
  radius?:   AvatarRadius;
  /** Online/offline/away/busy status dot. */
  status?:   AvatarStatus;
}

!!!

---

---

## backdrop.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/backdrop.props.ts`


!!!ts

!!!

---

---

## badge.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/badge.props.ts`


!!!ts
// design/feedback/badge/badge.props.ts

/**
 * @file Prop interface for the Badge component.
 * @module design/feedback/badge
 *
 * {@link BadgeProps} extends {@link FeedbackProps} with badge-specific props.
 *
 * **Inheritance chain:**
 * !!!
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps        size, variant, color, radius, pulse, placement
 *        ↑
 * BadgeProps           count, max, dot
 * !!!
 *
 * **Three rendering modes:**
 * 1. **Count badge** — `count` prop provided. Displays a number, capped by `max`.
 * 2. **Label badge** — No `count` prop, no `dot`. Renders the default slot.
 * 3. **Dot badge**   — `dot={true}`. Renders as a small circle with no content.
 *
 * @see {@link FeedbackProps}  in `feedback/feedback.props.ts`
 * @see {@link BADGE_DEFAULTS} in `feedback/badge/badge.tokens.ts`
 * @see {@link useBadge}       in `feedback/badge/badge.hook.ts`
 */

import type { FeedbackProps } from "../../feedback.props";

/**
 * Props for the `<Badge>` component.
 *
 * @example
 * !!!astro
 * <!-- Count badge (notification style) -->
 * <Badge count={12} />
 *
 * <!-- Capped count -->
 * <Badge count={150} max={99} />  <!-- renders "99+" -->
 *
 * <!-- Dot indicator -->
 * <Badge dot color="success" />
 *
 * <!-- Label badge (slot content) -->
 * <Badge variant="soft" color="info">Beta</Badge>
 *
 * <!-- Overlaid on a button -->
 * <div style="position: relative; display: inline-flex;">
 *   <Button>Messages</Button>
 *   <Badge count={3} placement="top-end" />
 * </div>
 * !!!
 */
import type { IconProps } from "~/shared/icon.props";

export interface BadgeProps extends FeedbackProps, IconProps {
  /**
   * Numeric count to display.
   *
   * When provided, the badge renders the number (capped by `max`).
   * When omitted, the default slot is rendered as label content.
   */
  count?: number;

  /**
   * Maximum count value before capping with `"+"`.
   *
   * When `count > max`, the badge displays `"${max}+"`.
   *
   * @default `99`
   * @example count=150, max=99 → "99+"
   * @example count=5,   max=99 → "5"
   */
  max?: number;

  /**
   * Renders the badge as a small filled circle with no visible content.
   *
   * When `true`, `count` and slot content are both ignored.
   * Useful as a presence/status indicator.
   *
   * @default `false`
   */
  dot?: boolean;

  /**
   * Renders the badge as a small circle or square containing only an icon.
   * Hides the count and slot content.
   */
  iconOnly?: boolean;
}

!!!

---

---

## banner.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/banner.props.ts`


!!!ts
// design/feedback/components/banner/banner.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { BannerColor, BannerRadius, BannerVariant } from "./banner.tokens";

import type { IconProps } from "~/shared/icon.props";

export interface BannerProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "size" | "pulse" | "placement">, IconProps {
  /** Visual treatment. @default "soft" */
  variant?: BannerVariant;

  /** Color role. @default "neutral" */
  color?: BannerColor;

  /** Border radius. @default "none" */
  radius?: BannerRadius;

  /**
   * Sticks the banner to the top of the viewport.
   * Emits `.banner--sticky` and `position: sticky; top: 0` via data attribute.
   * @default false
   */
  sticky?: boolean;

  /**
   * Adds a dismiss button.
   * @default false
   */
  dismissible?: boolean;

  /**
   * `aria-label` for the dismiss button. Only used when `dismissible=true`.
   * @default "Dismiss"
   */
  dismissLabel?: string;
}

!!!

---

---

## box.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/box.props.ts`


!!!ts
// design/layout/box/box.props.ts

import type { LayoutProps } from "~l/layout.props";
import type { BoxTag, BoxRadius } from "./box.tokens";

/**
 * Interface: `BoxProps`
 * 
 * Box is the fundamental layout primitive.
 * 
 * SPACING PROPS CHAIN:
 * `BoxProps` extends `LayoutProps`, which in turn extends `SpacingProps`.
 * This means every Box accepts a complete suite of spacing shorthand attributes
 * like `p` (padding), `px` (padding-x), `mt` (margin-top), etc., alongside
 * flex/grid controls like `gap`, `align`, and `justify`.
 */
export interface BoxProps extends LayoutProps {
  /** 
   * The semantic HTML element to render the box as.
   * Useful for accessibility and document outlining (e.g. 'section', 'article').
   * @default 'div' 
   */
  as?:     BoxTag;
  
  /** 
   * Visual border radius. 
   * Taps into the `RADIUS_DIM` token scale.
   */
  radius?: BoxRadius;
}
!!!

---

---

## breadcrumbs.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/breadcrumbs.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";
import type { SvgName } from "~/shared/icons";

export interface BreadcrumbItemData {
  /** Unique ID */
  id: string;
  /** Visible label text */
  label: string;
  /** URL to navigate to. If omitted, renders as text (usually for the current page) */
  href?: string;
  /** Whether this is the active/current page */
  active?: boolean;
  /** Optional icon to display next to the label */
  icon?: SvgName;
}

export interface BreadcrumbsProps extends NavProps {
  /** Array of items to automatically generate breadcrumbs */
  items?: BreadcrumbItemData[];
  /** Optional icon to use as a separator instead of standard text */
  separatorIcon?: SvgName;
  /** Text to use as separator. Defaults to '/' */
  separatorText?: string;
}

!!!

---

---

## item/b-item.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/item/b-item.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";
import type { IconProps } from "~/shared/icon.props";

export interface BreadcrumbItemProps extends HTMLAttributes<"a" | "span">, IconProps {
  /** If true, this item represents the current page. Renders as a span if no href is provided. */
  active?: boolean;
  /** URL to navigate to */
  href?: string;
  /** Whether this is the final item in the list (used to suppress the separator) */
  isLast?: boolean;
}

!!!

---

---

## button-group.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/button-group.props.ts`


!!!ts

!!!

---

---

## button.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/button.props.ts`


!!!ts
// design/triggers/button/button.props.ts

import type { TriggerProps } from "../../trigger.props";
import type { ButtonType, ButtonTarget } from "./button.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Button: true;
  }
}

import type { IconProps } from "~/shared/icon.props";

export type ButtonBaseProps = TriggerProps & IconProps & {
  /** HTML button type. @default 'button' */
  type?:      ButtonType;
  /** Renders as <a> when set. */
  href?:      string;
  /** Anchor target. Only used with href. */
  target?:    ButtonTarget;
  /** Anchor rel. Auto-set to 'noopener noreferrer' when target='_blank'. */
  rel?:       string;
  /** Square icon-only button — removes inline padding, forces aspect-ratio 1. @default false */
  iconOnly?:  boolean;
  /** Expands to fill container width. @default false */
  fullWidth?: boolean;
};

export type ButtonProps = ButtonBaseProps & (
  | { iconOnly?: false | undefined; "aria-label"?: string }
  | { iconOnly: true; "aria-label": string }
);
!!!

---

---

## caption.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/caption.props.ts`


!!!ts
import type { TypographyProps } from "../../typography.props";
import type { CaptionTag } from "./caption.tokens";

/**
 * Props for the Caption component.
 *
 * Extends {@link TypographyProps} with caption-specific options for
 * structure and placement.
 *
 * @see {@link useCaption} in `caption.hook.ts`
 */
export interface CaptionProps extends TypographyProps {
  /** The HTML tag to render. Defaults to `figcaption`. */
  as?: CaptionTag;
  /** An optional lead-in label, e.g., "Figure 1". */
  label?: string;
  /** An optional credit/attribution line. For rich content, use the `credit` slot. */
  credit?: string;
  /** If true, renders the caption as an overlay on a positioned parent. */
  overlay?: boolean;
  /** If true, adds a decorative left border accent. */
  rule?: boolean;
}
!!!

---

---

## card.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/card.props.ts`


!!!ts
// design/surfaces/components/card/card.props.ts

import type { SurfaceProps } from "../../surface.props";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Card: true;
  }
}

export type CardTag = "div" | "article" | "section" | "li";

export interface CardProps extends SurfaceProps {
  /** HTML element to render as. @default "div" */
  as?: CardTag;

  /**
   * Renders the card as an <a> and treats the whole surface as a link.
   * Mutually exclusive with interactive/selectable.
   */
  href?: string;

  /** Anchor target. Only used with href. */
  target?: "_self" | "_blank" | "_parent" | "_top";

  /** Anchor rel. Defaults to "noopener noreferrer" when target="_blank". */
  rel?: string;

  /**
   * Adds hover/focus styles and pointer cursor.
   * Use when the card has a client-side action but is not a link.
   * @default false
   */
  interactive?: boolean;

  /**
   * Makes the card a toggle — adds role="button" and aria-pressed.
   * Implies interactive behavior.
   * @default false
   */
  selectable?: boolean;

  /**
   * Pressed/selected state. Only meaningful when selectable=true.
   * @default false
   */
  selected?: boolean;

  /**
   * Disables interaction. Sets aria-disabled, tabindex=-1, and pointer-events: none.
   * @default false
   */
  disabled?: boolean;
}

!!!

---

---

## carousel.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/carousel.props.ts`


!!!ts

!!!

---

---

## center.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/center.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { CenterDirection } from "./center.tokens";

export interface CenterProps extends LayoutProps {
  /** 
   * Axis along which to center the content.
   * @default "both"
   */
  direction?: CenterDirection;
}

!!!

---

---

## checkbox.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/checkbox.props.ts`


!!!ts
// design/forms/checkbox/checkbox.props.ts

/**
 * @file Prop interface for the Checkbox component.
 * @module design/forms/checkbox
 *
 * {@link CheckboxProps} extends {@link FormProps} with checkbox-specific props.
 *
 * **Key design decision — `checkState` over `checked + indeterminate`:**
 * A single `checkState?: CheckState` prop replaces the two-boolean pattern.
 * The three values are mutually exclusive by type, eliminating the footgun
 * of `checked={true} indeterminate={true}` being simultaneously valid.
 *
 * @see {@link FormProps}        in `forms/forms.props.ts`
 * @see {@link CheckState}       in `forms/checkbox/checkbox.tokens.ts`
 * @see {@link CHECKBOX_DEFAULTS} in `forms/checkbox/checkbox.tokens.ts`
 * @see {@link useCheckbox}      in `forms/checkbox/checkbox.hook.ts`
 */

import type { FormProps }                from "~f/forms.props";
import type { CheckState, LabelPosition } from "./checkbox.tokens";

/**
 * Props for the `<Checkbox>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic uncontrolled -->
 * <Checkbox name="agree">I accept the terms</Checkbox>
 *
 * <!-- Controlled: checked -->
 * <Checkbox name="newsletter" value="subscribed" checkState="checked">
 *   Subscribe
 * </Checkbox>
 *
 * <!-- Select-all pattern -->
 * <Checkbox name="all" checkState={allSelected ? "checked" : noneSelected ? "unchecked" : "indeterminate"}>
 *   Select all
 * </Checkbox>
 *
 * <!-- Selectable chip -->
 * <Checkbox name="tag" value="ts" variant="outlined">TypeScript</Checkbox>
 * !!!
 */
export type CheckboxProps = FormProps & {
  id?: string;
  checkState?: CheckState;
  value?: string;
  labelPosition?: LabelPosition;
};
!!!

---

---

## chip.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/chip.props.ts`


!!!ts
// design/feedback/components/chip/chip.props.ts

import type { FeedbackProps } from "../../feedback.props";

export interface ChipProps extends FeedbackProps {
  /**
   * Defines the HTML element used for the chip.
   * Defaults to `"button"` to allow for interactivity.
   * @default `"button"`
   */
  as?: any; // To allow arbitrary HTML tags, though usually it's "button" or "a"
}

!!!

---

---

## code.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/code.props.ts`


!!!ts
// design/typography/components/code/code.props.ts
import type { TypographyProps } from "../../typography.props";

export type CodeTag = "code" | "span" | "kbd";
export type PreTag = "pre" | "div";

export interface CodeProps extends TypographyProps {
  as?: CodeTag;
  /** Whether this is a standalone code block or inline code. */
  block?: boolean;
}

export interface PreProps extends TypographyProps {
  as?: PreTag;
}

!!!

---

---

## color-picker.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/color-picker.props.ts`


!!!ts

!!!

---

---

## columns.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/columns.props.ts`


!!!ts

!!!

---

---

## combobox.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/combobox.props.ts`


!!!ts
// design/forms/combobox/combobox.props.ts

/**
 * @file Prop types for the Combobox component.
 * @module design/forms/combobox
 *
 * Combobox shares {@link SelectOption} with Select — the same option shape
 * (value, label, disabled) applies to both. Importing from Select's props
 * file crosses a component boundary, so {@link SelectOption} is re-exported
 * here under a local alias for clean import paths.
 *
 * @see {@link FormProps}          in `forms/forms.props.ts`           — parent
 * @see {@link SelectOption}       in `forms/select/select.props.ts`   — re-exported
 * @see {@link COMBOBOX_DEFAULTS}  in `forms/combobox/combobox.tokens.ts`
 * @see {@link useCombobox}        in `forms/combobox/combobox.hook.ts`
 */

import type { FormProps }    from "~f/forms.props";
import type { SelectOption } from "../select/select.props";

// ─── RE-EXPORT ────────────────────────────────────────────────────────────────

/**
 * A selectable option in the Combobox dropdown.
 * Re-exported from {@link SelectOption} for local import convenience.
 *
 * @see {@link SelectOption} in `forms/select/select.props.ts`
 */
export type ComboboxOption = SelectOption;

// ─── PROPS ────────────────────────────────────────────────────────────────────

/**
 * Props for the `<Combobox>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic -->
 * <Combobox
 *   name="country"
 *   placeholder="Select a country…"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 * />
 *
 * <!-- Controlled (pre-selected value) -->
 * <Combobox name="role" value="editor" options={roles} />
 *
 * <!-- Inside a Field -->
 * <Field id="country">
 *   <Label slot="label" for="country">Country</Label>
 *   <Combobox
 *     id="country"
 *     name="country"
 *     options={countries}
 *     aria-describedby="country-hint"
 *   />
 *   <span slot="hint" id="country-hint">Start typing to filter.</span>
 * </Field>
 * !!!
 */
export type ComboboxProps = FormProps & {
  id?: string;
  options: ComboboxOption[];
  value?: string;
  placeholder?: string;
  caseSensitive?: boolean;
};

!!!

---

---

## command-palette.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/command-palette.props.ts`


!!!ts

!!!

---

---

## container.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/container.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { ContainerMaxWidth, ContainerTag } from "./container.tokens";

export interface ContainerProps extends LayoutProps {
  /** 
   * Maximum width of the container.
   * @default "lg"
   */
  maxWidth?: ContainerMaxWidth;
  
  /** HTML tag to render as. @default "div" */
  as?: ContainerTag;
}

!!!

---

---

## context-menu.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/context-menu.props.ts`


!!!ts

!!!

---

---

## cropper.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/cropper.props.ts`


!!!ts

!!!

---

---

## date-picker.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/date-picker/date-picker.props.ts`


!!!ts

!!!

---

---

## dot.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/dot/dot.props.ts`


!!!ts
// design/feedback/components/dot/dot.props.ts
import type { FeedbackProps } from "../../feedback.props";

export interface DotProps extends FeedbackProps {
  // Dot has no new behavioral props beyond what FeedbackProps provides,
  // but maps specifically to size, variant, color, pulse, and placement.
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Dot: true;
  }
}

!!!

---

---

## drawer.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.props.ts`


!!!ts
import type { BaseComponentProps } from "~/shared/base.props";
import type { DrawerPlacement, DrawerSize } from "./drawer.tokens";

export interface DrawerProps extends BaseComponentProps {
  id:               string;
  title?:           string;
  placement?:       DrawerPlacement;
  size?:            DrawerSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?:      boolean;
}

!!!

---

---

## dropdown-menu.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.props.ts`


!!!ts
import type { OverlaysProps } from "../../overlays.props";

export interface DropdownMenuProps extends OverlaysProps {
  id: string;
}

export interface DropdownItemProps {
  href?: string;
  icon?: string;
  popovertarget?: string;
  disabled?: boolean;
}

!!!

---

---

## empty-state.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/empty-state/empty-state.props.ts`


!!!ts
import type { FeedbackProps } from "../../feedback.props";
import type { IconProps } from "~/shared/icon.props";

export interface EmptyStateProps extends FeedbackProps, IconProps {
  title?: string;
  description?: string;
}

!!!

---

---

## feed.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/feed/feed.props.ts`


!!!ts
import type { DataProps } from "~/data/data.props";

export interface FeedItem {
  id?: string | number;
  /** The primary title/content of the feed event. */
  title: string;
  /** Date or time associated with the event. */
  timestamp?: string | Date;
  /** Longer description or body text. */
  description?: string;
  /** Optional icon or avatar to display on the timeline node. */
  icon?: any; // any node/string for Astro
  /** Link URL for the item. */
  href?: string;
}

export interface FeedProps extends DataProps {
  /** The events to display in the feed. */
  data?: FeedItem[];
  /** Layout orientation. */
  orientation?: "vertical" | "horizontal";
  /** Whether items are grouped visually. */
  grouped?: boolean;
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Feed: true;
  }
}

!!!

---

---

## field.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/field/field.props.ts`


!!!ts
// design/forms/field/field.props.ts

/**
 * @file Prop interface for the Field component.
 * @module design/forms/field
 *
 * {@link FieldProps} extends {@link BaseComponentProps} directly —
 * NOT {@link FormProps} — because Field is a structural wrapper, not a
 * form control. It never renders a native form element.
 *
 * **Responsibility split between Field props and control props:**
 *
 * | Concern            | Where it lives        | Why                              |
 * |--------------------|-----------------------|----------------------------------|
 * | `invalid` (ARIA)   | Control (`InputProps`) | Goes on the native `<input>`     |
 * | `invalid` (visual) | `FieldProps`          | Drives CSS on the wrapper group  |
 * | `required` (ARIA)  | Control (`InputProps`) | Goes on the native `<input>`     |
 * | `required` (visual)| `FieldProps`          | Drives CSS; forwarded to Label   |
 * | `aria-describedby` | Consumer (manual)     | Astro slots can't wire this auto |
 * | hint/error IDs     | Field (via `id` prop) | Field generates `{id}-hint` etc. |
 *
 * **`id` prop and accessibility wiring:**
 * Passing an `id` to Field enables the recommended accessibility pattern:
 *
 * !!!astro
 * <Field id="email" invalid={!isValid} required>
 *   <Label slot="label" for="email" required>Email</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     invalid={!isValid}
 *     aria-describedby="email-hint email-error"
 *   />
 *   <span slot="hint"    id="email-hint">We'll never share it.</span>
 *   <span slot="error"   id="email-error">Enter a valid email.</span>
 * </Field>
 * !!!
 *
 * Field renders `id="{id}-hint"` and `id="{id}-error"` on its own hint/error
 * wrapper elements. The consumer passes `aria-describedby` to the control
 * directly, referencing those IDs.
 *
 * @see {@link BaseComponentProps} in `shared/base.props.ts`  — parent interface
 * @see {@link useField}           in `forms/field/field.hook.ts`
 * @see `forms/field/Field.astro`  — slot structure and id derivation
 */

import type { BaseComponentProps } from "~/shared/base.props";
import type { IconProps } from "~/shared/icon.props";

/**
 * Props for the `<Field>` component.
 *
 * @example
 * !!!astro
 * <!-- Minimal — no wiring -->
 * <Field>
 *   <Label slot="label">Username</Label>
 *   <Input name="username" />
 * </Field>
 *
 * <!-- Full accessibility wiring -->
 * <Field id="email" invalid={!emailValid} required>
 *   <Label slot="label" for="email" required>Email address</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     invalid={!emailValid}
 *     required
 *     aria-describedby="email-hint email-error"
 *   />
 *   <span slot="hint" id="email-hint">We'll never share your email.</span>
 *   <span slot="error" id="email-error">Enter a valid email address.</span>
 * </Field>
 * !!!
 */
export interface FieldProps extends BaseComponentProps, IconProps {
  /**
   * Base identifier for this field group.
   *
   * When provided, Field derives stable IDs for its hint and error wrappers:
   * - Hint wrapper: `id="{id}-hint"`
   * - Error wrapper: `id="{id}-error"`
   * - Success wrapper: `id="{id}-success"`
   *
   * Pass the same value as the `id` on the control in the default slot,
   * and reference `"{id}-hint"` / `"{id}-error"` in `aria-describedby`
   * on the control.
   */
  id?: string;

  /**
   * Whether this field group is in an invalid/error state.
   *
   * Adds `data-invalid` to the Field wrapper and applies the
   * `field--invalid` modifier class. CSS uses this to:
   * - Show the error slot area with danger colors
   * - Apply a subtle error highlight to the control wrapper
   *
   * @remarks
   * This mirrors the `invalid` prop on the control (Input, Select, etc.)
   * inside the field. Both should be set to the same value — the control's
   * `invalid` handles ARIA (`aria-invalid="true"`) while Field's `invalid`
   * handles the surrounding group styling.
   *
   * @default false
   */
  invalid?: boolean;

  /**
   * Whether this field group is required.
   *
   * Adds `data-required` to the Field wrapper. CSS can use this to style
   * the field group as a whole. Field passes this information to consumers
   * via context — the consumer is still responsible for passing `required`
   * to both the control (for native validation) and the Label (for the
   * visual asterisk indicator).
   *
   * @default false
   */
  required?: boolean;
}
!!!

---

---

## file-preview.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/file-preview/file-preview.props.ts`


!!!ts
// design/assets/components/file-preview/file-preview.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { FilePreviewSize, FilePreviewRadius, FilePreviewLayout } from "./file-preview.tokens";

export interface FilePreviewProps extends BaseComponentProps {
  /** File name, including extension (e.g. "report.pdf"). */
  name:     string;
  /** Image URL. When provided, renders a thumbnail instead of the type icon. */
  src?:     string;
  /** Human-readable file size string (e.g. "2.4 MB"). */
  fileSize?: string;
  /** Card (vertical stack) or strip (horizontal row). @default 'card' */
  layout?:  FilePreviewLayout;
  /** Component size. @default 'md' */
  size?:    FilePreviewSize;
  /** Border radius. @default 'md' */
  radius?:  FilePreviewRadius;
  /** Marks the file as removable — renders a dismiss button. */
  removable?: boolean;
  /** Called when the dismiss button is clicked. */
  onRemove?:  string;
}

!!!

---

---

## file-upload.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/file-upload/file-upload.props.ts`


!!!ts

!!!

---

---

## flex.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/flex.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { FlexDirection, FlexWrap, FlexTag } from "./flex.tokens";

export interface FlexProps extends LayoutProps {
  /** Flex direction. @default "row" */
  direction?: FlexDirection;
  
  /** Flex wrap behavior. @default "nowrap" */
  wrap?: FlexWrap;
  
  /** HTML tag to render as. @default "div" */
  as?: FlexTag;
}

!!!

---

---

## footer.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/footer/footer.props.ts`


!!!ts
// design/layout/components/footer/footer.props.ts

/**
 * FooterProps
 *
 * Extends the full `LayoutProps` chain (which itself extends `SpacingProps`),
 * meaning every spacing shorthand (`p`, `px`, `py`, `pt` … `ml`), flex controls
 * (`gap`, `align`, `justify`), and base component props (`class`, `bg`, etc.)
 * are available on `<Footer>` without re-declaration.
 *
 * Footer introduces no props beyond those it inherits. Its semantic role is
 * fixed (`<footer>`) and it carries no behavioural variants (unlike Header's
 * `sticky`). Rich internal layouts are achieved by composing Box children
 * inside its named slots rather than via additional footer-level props.
 *
 * Named slots consumed by Footer.astro:
 *   - `start`   — left-hand content area (copyright notice, brand mark).
 *   - default   — center content area (nav links, social icons).
 *   - `end`     — right-hand content area (legal links, locale picker).
 */

import type { LayoutProps } from "~l/layout.props";

export interface FooterProps extends LayoutProps {}

!!!

---

---

## frame.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.props.ts`


!!!ts
// design/surfaces/components/frame/frame.props.ts
import type { SurfaceProps } from "../../surface.props";

export type FrameTag = "div" | "figure" | "picture" | "span";

export interface FrameProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: FrameTag;

  /**
   * Aspect ratio of the frame.
   * Can be a fraction (e.g., "16/9", "4/3") or a single number (e.g., "1").
   * @default "auto"
   */
  ratio?: string;

  /**
   * Prevents content from overflowing the frame boundaries.
   * Useful when rounding corners of media content.
   * @default true
   */
  clip?: boolean;
}

!!!

---

---

## gallery-item.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery-item/gallery-item.props.ts`


!!!ts

!!!

---

---

## gallery.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery/gallery.props.ts`


!!!ts

!!!

---

---

## grid.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/grid.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { GridColumns, GridFit, GridTag } from "./grid.tokens";

export interface GridProps extends LayoutProps {
  /** Number of grid columns. */
  columns?: GridColumns;
  fit?: GridFit;
  /** HTML tag to render as. @default "div" */
  as?: GridTag;
}

!!!

---

---

## header.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/header/header.props.ts`


!!!ts
// design/layout/components/header/header.props.ts

/**
 * HeaderProps
 *
 * Extends the full `LayoutProps` chain (which itself extends `SpacingProps`),
 * meaning every spacing shorthand (`p`, `px`, `py`, `pt` … `ml`), flex controls
 * (`gap`, `align`, `justify`), and base component props (`class`, `bg`, etc.)
 * are available on `<Header>` without re-declaration.
 *
 * Header-specific additions:
 *   - `sticky`  — toggles sticky positioning via a CSS class modifier.
 *
 * Named slots consumed by Header.astro:
 *   - `start`   — left-hand content area (logo, wordmark, hamburger menu).
 *   - default   — center content area (primary nav, search bar).
 *   - `end`     — right-hand content area (CTA, user avatar, icon cluster).
 */

import type { LayoutProps } from "~l/layout.props";

export interface HeaderProps extends LayoutProps {
  /**
   * When `true`, renders the header with `position: sticky; top: 0` so it
   * stays visible as the user scrolls.
   *
   * Implemented via the `header--sticky` BEM modifier class. Z-index is
   * provided automatically via `--z--sticky` when the modifier is active.
   *
   * @default false
   */
  sticky?: boolean;
}

!!!

---

---

## heading.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/heading/heading.props.ts`


!!!ts
// design/typography/heading/heading.props.ts
import type { TypographyProps } from "../../typography.props";
import type { HeadingLevel, HeadingWeight } from "./heading.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    h1: true; h2: true; h3: true; h4: true; h5: true; h6: true;
  }
}

import type { IconProps } from "~/shared/icon.props";

export interface HeadingProps extends TypographyProps, IconProps {
  /**
   * Semantic heading level — controls the rendered element (h1–h6).
   * Choose based on document structure, not visual size.
   * Use the `size` prop to control appearance independently.
   * @default 2
   */
  level?:  HeadingLevel;

  /** Narrowed to semibold, bold, or black. @default inherited from CSS */
  weight?: HeadingWeight;

  // clamp, truncate, fontStyle intentionally not re-declared here
}
!!!

---

---

## icon.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/icon/icon.props.ts`


!!!ts
// design/assets/components/icon/icon.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { IconSize, IconColor } from "./icon.tokens";
import type { SvgName } from "~/shared/icons";

export interface IconProps extends BaseComponentProps {
  /**
   * The name of the SVG icon to render.
   * Must match a valid key in `src/design/shared/icons/index.ts`.
   */
  name: SvgName;

  /**
   * The size of the icon. Maps to `--icon-size-*` CSS properties.
   * @default "md"
   */
  size?: IconSize;
  color?: IconColor;
}

!!!

---

---

## image.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/image/image.props.ts`


!!!ts
// design/assets/image/image.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { SpacingProps }       from "~/shared/spacing.props";
import type { ImageRadius, ImageRatio, ImageFit } from "./image.tokens";

export interface ImageProps extends BaseComponentProps, SpacingProps {
  /** Image source URL. */
  src:       string;
  /** Alt text. Pass empty string for decorative images. */
  alt:       string;
  /** Aspect ratio preset. */
  ratio?:    ImageRatio;
  /** object-fit behaviour. @default 'cover' */
  fit?:      ImageFit;
  /** Native loading strategy. @default 'lazy' */
  imgLoading?:  "lazy" | "eager";
  /** Border radius. */
  radius?:   ImageRadius;
  /** Intrinsic width. */
  width?:    number | string;
  /** Intrinsic height. 
   * accepts a number or a string with a unit (e.g., "100px").
   */
  height?:   number | string;
}
!!!

---

---

## indent.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/indent/indent.props.ts`


!!!ts
/**
 * src/design/typography/components/indent/indent.props.ts
 * 
 * Props for the Indent component.
 * 
 * @see indent.hook.ts   — resolves props to { Tag, props, type, size }
 * @see typography.hook.ts — resolves props to { typographyAttributes }
 * @see base.props.ts    — base component props
 * @see typography.props.ts - typography-specific props, extends BaseComponentProps
 * @see indent.css       — indent-specific styles
 * @see typography.css   — shared typography styles
 */
import type { TypographyProps } from '~/typography/typography.props';
import type { IndentSize } from './indent.tokens';

export type IndentType = 'ui' | 'code' | 'prose';

export interface IndentProps extends TypographyProps {
  prose?: IndentSize;
  ui?: IndentSize;
  code?: IndentSize;
}
!!!

---

---

## indicator.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/indicator/indicator.props.ts`


!!!ts

!!!

---

---

## inline.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/inline.props.ts`


!!!ts
import type { LayoutProps } from "../../layout.props";
import type { InlineTag } from "./inline.tokens";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */


export interface InlineProps extends LayoutProps {
  /** HTML tag to render as. @default "span" */
  as?: InlineTag;
}

!!!

---

---

## input-group.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input-group/input-group.props.ts`


!!!ts

!!!

---

---

## input.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input/input.props.ts`


!!!ts
// design/forms/input/input.props.ts

/**
 * @file Prop interface for the Input component.
 * @module design/forms/input
 *
 * {@link InputProps} extends {@link FormProps} with the props unique to a
 * single-line text input. All token dimensions, ARIA/behavior props, and
 * base component props are inherited — only Input-specific additions live here.
 *
 * **Full prop inheritance chain:**
 * !!!
 * BaseComponentProps       class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FormProps                size, variant, color, radius,
 *        ↑                 disabled, required, invalid, name, fullWidth
 * InputProps               id, type, value, placeholder, readonly,
 *                          minLength, maxLength, pattern, autocomplete
 * !!!
 *
 * **Slot props (not declared here — handled by Input.astro):**
 * - `start` slot — leading content: icon, flag, currency prefix, area code
 * - `end` slot   — trailing content: reveal-password toggle, clear button, unit
 *
 * These are Astro named slots, not TypeScript props. They cannot be typed
 * in `InputProps` — document them in `Input.astro`'s component comment.
 *
 * **What is intentionally NOT in InputProps:**
 * - `onChange` — server-rendered Astro components handle change events via
 *   native browser events or framework-specific progressive enhancement.
 *   A client-side `onChange` prop is out of scope for the server-rendered layer.
 * - `step`, `min`, `max` — valid on `type="number"` only. Passed through
 *   `rest` as plain HTML attributes. No explicit declaration needed.
 * - `accept` — valid on `type="file"` only, and file is excluded from
 *   {@link INPUT_TYPES}.
 *
 * @see {@link FormProps}       in `forms/forms.props.ts`       — parent interface
 * @see {@link InputType}       in `forms/input/input.tokens.ts` — allowed type values
 * @see {@link INPUT_DEFAULTS}  in `forms/input/input.tokens.ts` — default values
 * @see {@link useInput}        in `forms/input/input.hook.ts`   — runtime resolution
 *
 * @todo If a `label` slot is desired directly on Input (bypassing Field),
 *   add `label?: string` here as a shorthand — hook renders it as a
 *   `<label>` inside the wrapper. Not recommended: prefer the {@link Field}
 *   + {@link Label} composition for full accessibility control.
 */

import type { FormProps }   from "~/forms/forms.props";
import type { InputType }   from "./input.tokens";

/**
 * Props for the `<Input>` component.
 *
 * Extends {@link FormProps} which extends {@link BaseComponentProps}.
 * All inherited props are available without redeclaration.
 *
 * @example
 * !!!astro
 * <!-- Minimal: type defaults to "text", size to "md", variant to "outlined" -->
 * <Input name="first-name" placeholder="First name" />
 *
 * <!-- Full example inside a Field -->
 * <Field id="email" invalid={!emailValid}>
 *   <Label slot="label" for="email" required>Email address</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     value={emailValue}
 *     size="lg"
 *     variant="outlined"
 *     color="primary"
 *     invalid={!emailValid}
 *     aria-describedby="email-error"
 *     fullWidth
 *   >
 *     <span slot="start">✉</span>
 *   </Input>
 *   <span slot="error" id="email-error">Enter a valid email address.</span>
 * </Field>
 * !!!
 *
 * @see {@link FormProps}      — inherited token dimensions and behavior props
 * @see {@link INPUT_DEFAULTS} — which props have defaults and what they are
 * @see {@link useInput}       — hook that resolves these props to HTML attributes
 */
import type { IconProps } from "~/shared/icon.props";

export type InputProps = FormProps & IconProps & {
  id?: string;
  type?: InputType;
  value?: string;
  placeholder?: string;
  readonly?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  autocomplete?: string;
};
!!!

---

---

## kbd.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/kbd/kbd.props.ts`


!!!ts
// design/typography/components/kbd/kbd.props.ts
import type { TypographyProps } from "../../typography.props";

import type { IconProps } from "~/shared/icon.props";

export interface KbdProps extends TypographyProps, IconProps {}

!!!

---

---

## label.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/label.props.ts`


!!!ts
// design/typography/label/label.props.ts

/**
 * @file Prop interface for the Label component.
 * @module design/typography/label
 *
 * {@link LabelProps} extends {@link TypographyProps} and narrows two
 * dimensions (size → fixed scale, weight → limited range) while adding
 * the two props unique to a `<label>` element: `for` and `required`.
 *
 * **`for` is not aliased to `htmlFor`:**
 * Astro templates use native HTML attribute names, not React camelCase.
 * The prop is named `for` (valid in TypeScript interface definitions even
 * though `for` is a reserved keyword) and passes through to the rendered
 * `<label for="…">` attribute without aliasing. When destructuring in the
 * hook, use `const { "for": _for, ... }` if needed, or let it flow through
 * `rest` naturally.
 *
 * **`required` is visual-only:**
 * `required` on Label renders a visible `*` indicator beside the label text
 * (as an `aria-hidden` span). It does NOT set `aria-required` — that belongs
 * on the form control (Input, Select, etc.). The indicator is for sighted
 * users; screen readers get requirement information from the control's own
 * ARIA attributes.
 *
 * @see {@link TypographyProps}  in `typography/typography.props.ts` — parent
 * @see {@link LabelSize}        in `typography/label/label.tokens.ts`
 * @see {@link LabelWeight}      in `typography/label/label.tokens.ts`
 * @see {@link LABEL_DEFAULTS}   in `typography/label/label.tokens.ts`
 * @see {@link useLabel}         in `typography/label/label.hook.ts`
 */

import type { TypographyProps } from "../../typography.props";
import type { LabelSize, LabelWeight } from "./label.tokens";

/**
 * Props for the `<Label>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic -->
 * <Label for="email">Email address</Label>
 *
 * <!-- Required field indicator -->
 * <Label for="email" required>Email address</Label>
 *
 * <!-- Custom size and weight -->
 * <Label for="search" size="xs" weight="normal" color="secondary">
 *   Search query
 * </Label>
 *
 * <!-- Inside a Field -->
 * <Field id="email">
 *   <Label slot="label" for="email" required>Email</Label>
 *   <Input id="email" name="email" required />
 * </Field>
 * !!!
 *
 * @see {@link TypographyProps} — inherited typography dimensions
 * @see {@link useLabel}        — resolves these props at runtime
 */
import type { IconProps } from "~/shared/icon.props";

export interface LabelProps extends TypographyProps, IconProps {
  /**
   * The `id` of the form control this label is associated with.
   *
   * Sets the native `for` attribute on the rendered `<label>` element,
   * creating an accessible association between the label text and its
   * control. Clicking the label focuses the control.
   *
   * @remarks
   * Not required when Label is a child of a `<label>`-wrapping component
   * (Checkbox, Radio), since those components use `<label>` as their root
   * element and the association is implicit. Use `for` when Label is used
   * with Input, Select, or other controls that render a separate element.
   *
   * @example `for="email"` — associates with `<input id="email">`
   */
  for?: string;

  /**
   * Whether to show the required field indicator (`*`) beside the label text.
   *
   * When `true`, renders `<span class="label__required" aria-hidden="true">*</span>`
   * after the label content. The `aria-hidden` attribute hides the asterisk
   * from screen readers — screen readers get required-field information from
   * `aria-required="true"` on the control, not from a visual symbol.
   *
   * @remarks
   * Set `required` on both Label (for the visual indicator) AND on the
   * control (for native browser validation and `aria-required`).
   *
   * @default false
   */
  required?: boolean;

  /**
   * Font size — uses the fixed scale ({@link TEXT_SIZE_FIXED}), not the
   * responsive scale ({@link TEXT_SIZE}) used by Text and Heading.
   *
   * @default `"sm"` — applied by {@link useLabel}
   */
  size?: LabelSize;

  /**
   * Font weight — narrowed from the full typography weight range.
   * `"bold"` and `"black"` are excluded.
   *
   * @default `"medium"` — applied by {@link useLabel}
   */
  weight?: LabelWeight;
}
!!!

---

---

## lightbox.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/lightbox/lightbox.props.ts`


!!!ts

!!!

---

---

## link.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/link/link.props.ts`


!!!ts
// design/typography/link/link.props.ts

import type { TypographyProps } from "~ty/typography.props";
import type { LinkUnderline } from "./link.tokens";

import type { IconProps } from "~/shared/icon.props";

/**
 * Interface: `LinkProps`
 * 
 * Defines the API for the Link component.
 * Because links are primarily textual, this interface extends `TypographyProps`,
 * allowing you to use sizes, weights, families, and colors directly on the link.
 */
export interface LinkProps extends TypographyProps, IconProps {
  /**
   * The destination URL for the link.
   * When omitted, renders as a placeholder link (no navigation).
   */
  href?:       string;
  
  /** 
   * Specifies where to open the linked document.
   * @example "_blank" (new tab), "_self" (same frame)
   */
  target?:     string;
  
  /** 
   * Specifies the relationship between the current document and the linked document.
   * Automatically defaults to 'noopener noreferrer' when `target` is '_blank' or `external` is true
   * to prevent security vulnerabilities (reverse tabnabbing).
   */
  rel?:        string;
  
  /** 
   * Shorthand boolean to designate an external link.
   * When true, this automatically applies `target="_blank"` and `rel="noopener noreferrer"`.
   */
  external?:   boolean;
  
  /** 
   * Controls when the underline appears.
   * - `always`: Underline is constantly visible.
   * - `hover`: Underline only appears on mouse over or focus.
   * - `never`: No underline is shown.
   * 
   * @default "hover"
   */
  underline?:  LinkUnderline;
}
!!!

---

---

## item/list-item.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/item/list-item.props.ts`


!!!ts
import type { BaseComponentProps } from "~/shared/base.props";
import type { IconProps } from "~/shared/icon.props";

export interface ListItemProps extends BaseComponentProps, IconProps {
  /** Visual check state for a to-do/checklist pattern */
  checkState?: "checked" | "unchecked" | "indeterminate";
  
  /** URL to navigate to, turning the item into a link */
  href?: string;
  
  /** Secondary description text */
  description?: string;
  
  /** Optional badge text or count */
  badge?: string | number;
  
  /** Mutes the item visually */
  disabled?: boolean;
}

!!!

---

---

## list.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/list.props.ts`


!!!ts
// design/data/list/list.props.ts

import type { DataProps }                        from "~/data/data.props";
import type { ListItem, ListOrientation }        from "./list.tokens";

/**
 * Props for the `<List>` component.
 *
 * Extends {@link DataProps} which extends {@link BaseComponentProps}.
 * All inherited data category props are available without redeclaration:
 * color, bg, highlight, variant, size, caption, loading, empty,
 * striped, bordered, interactive, selectable, scrollable.
 *
 * **Two rendering modes:**
 *
 * Data-driven — List owns all rendering:
 * !!!astro
 * <List data={items} caption="Tasks" />
 * !!!
 *
 * Compound — consumer controls item structure via the `items` slot:
 * !!!astro
 * <List caption="Tasks">
 *   <li slot="items" class="list__item">Custom item</li>
 * </List>
 * !!!
 *
 * **What is intentionally NOT in ListProps:**
 * - Per-item event handlers — selection is managed externally via
 *   `list:selectionchange` on the root element (same pattern as Table)
 * - `bullet` style — controlled via CSS on the consumer side or via
 *   the `class` prop; too many edge cases to enumerate as a prop
 *
 * @see {@link DataProps}      in `data/data.props.ts`        — parent interface
 * @see {@link ListItem}       in `data/list/list.tokens.ts`  — item shape
 * @see {@link LIST_DEFAULTS}  in `data/list/list.tokens.ts`  — default values
 * @see {@link useList}        in `data/list/list.hook.ts`    — runtime resolution
 */
export interface ListProps extends DataProps {

  // ─── DATA-DRIVEN MODE ──────────────────────────────────────

  /**
   * Items to render. Each object is one `<li>`.
   *
   * Provide `checkState` on items for a checklist/to-do pattern.
   * Provide `children` on items for nested sub-lists.
   * Provide `href` on items for a link list.
   *
   * When omitted, List renders only what is provided via the `items` slot
   * (compound mode).
   *
   * @see {@link ListItem} for the full item shape
   */
  data?: ListItem[];

  // ─── LAYOUT ────────────────────────────────────────────────

  /**
   * Renders as `<ol>` (ordered / numbered) instead of `<ul>`.
   *
   * Applies to the root list and all nested child lists.
   * List markers are browser-default for `<ol>` — override in CSS
   * via `list-style-type` on `.list` if custom numbering is needed.
   *
   * @default false
   */
  ordered?: boolean;

  /**
   * Layout axis for list items.
   *
   * - `"vertical"`   — stacked (default). Standard list behaviour.
   * - `"horizontal"` — side-by-side. Use for tag groups, chip lists,
   *                    inline option sets. Adds `flex-wrap: wrap` so
   *                    items reflow when the container is narrow.
   *
   * Adds modifier class `.list--vertical` or `.list--horizontal`.
   *
   * @default `"vertical"` — applied by {@link useList}
   */
  orientation?: ListOrientation;
}
!!!

---

---

## item/m-item.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/item/m-item.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";
import type { IconProps } from "~/shared/icon.props";

export interface MenuItemProps extends HTMLAttributes<"a" | "button">, IconProps {
  /** Optional ID for the item */
  id?: string | undefined;
  /** If provided, renders as an `<a>` tag, otherwise a `<button>` */
  href?: string | undefined;
  /** Whether the item is currently active/selected */
  active?: boolean | undefined;
  /** Whether the item is disabled */
  disabled?: boolean | undefined;
}

!!!

---

---

## menu.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/menu.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";
import type { SvgName }  from "~/shared/icons";

/**
 * Data structure for a single menu item when using the data-driven approach.
 */
export interface MenuItemData {
  /** Unique identifier, used for active state matching */
  id: string;
  /** Text to display */
  label: string;
  /** If provided, renders as an `<a>` tag */
  href?: string;
  /** Optional icon to render before the label */
  icon?: SvgName;
  /** If true, the item is not interactive */
  disabled?: boolean;
  /** Nested children (rendered if indentChildren is true) */
  children?: MenuItemData[];
}

export interface MenuProps extends NavProps {
  /**
   * Data-driven array of menu items.
   * If omitted, you must provide `<MenuItem>` components as children.
   */
  items?: MenuItemData[];

  /**
   * If true, nested items (children) are indented.
   * @default true
   */
  indentChildren?: boolean;
}

!!!

---

---

## metric.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/metric/metric.props.ts`


!!!ts
import type { DataProps } from "~/data/data.props";
import type { IconProps } from "~/shared/icon.props";

export interface MetricProps extends DataProps, IconProps {
  /** The primary numeric or string value. */
  value?: string | number;
  /** The main label or title for the metric. */
  label?: string;
  /** A longer description or prose text (e.g. "3/4 people agree with this longer thing"). */
  description?: string;
  /** A trend value (e.g. "12%", "-5") */
  trend?: string | number;
  /** Trend direction to drive color/icon. */
  trendDirection?: "up" | "down" | "neutral";
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Metric: true;
  }
}

!!!

---

---

## modal.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/modal/modal.props.ts`


!!!ts
import type { OverlaysProps } from "../../overlays.props";

export interface ModalProps extends OverlaysProps {
  id:               string;
  title?:           string;
  closeOnBackdrop?: boolean;
  closeOnEsc?:      boolean;
}

!!!

---

---

## multiselect.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/multiselect/multiselect.props.ts`


!!!ts

!!!

---

---

## brand/brand.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/brand/brand.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";

export interface NavbarBrandProps extends HTMLAttributes<"div"> {}

!!!

---

---

## content/content.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/content/content.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";

export interface NavbarContentProps extends HTMLAttributes<"div"> {
  /** If true, this content block will be hidden on mobile screens and moved into the hamburger menu */
  hideOnMobile?: boolean;
}

!!!

---

---

## navbar.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/navbar.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";

export interface NavbarProps extends NavProps {
  /** If true, the navbar sticks to the top of the viewport when scrolling */
  sticky?: boolean;
  /** If true, applies a glassmorphism blur effect to the background */
  glass?: boolean;
  /** Custom max-width for the internal container (e.g., "1200px" or "100%") */
  maxWidth?: string;
}

!!!

---

---

## number-input.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/number-input/number-input.props.ts`


!!!ts

!!!

---

---

## pagination.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/pagination/pagination.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";

export interface PaginationProps extends Omit<NavProps, "activeId"> {
  /** The current active page number (1-indexed). */
  currentPage: number;
  
  /** The total number of pages available. */
  totalPages: number;
  
  /** Number of sibling pages to show on each side of the current page. @default 1 */
  siblingCount?: number;
  
  /** Whether to show the previous/next arrow controls. @default true */
  showControls?: boolean;
  
  /** Base URL path to build pagination links. e.g. "/blog/page/" -> "/blog/page/2" */
  baseUrl?: string;
  
  /** Optional override for generating URLs based on page number. Takes precedence over baseUrl. */
  getPageUrl?: (page: number) => string;
}

!!!

---

---

## panel.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/panel/panel.props.ts`


!!!ts
// design/surfaces/components/panel/panel.props.ts
import type { SurfaceProps } from "../../surface.props";

export type PanelTag = "div" | "aside" | "section" | "details";

export interface PanelProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: PanelTag;
}

!!!

---

---

## paper.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/paper/paper.props.ts`


!!!ts
// design/surfaces/components/paper/paper.props.ts

import type { SurfaceProps } from "../../surface.props";
import type { PaperGap }     from "./paper.tokens";

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Paper: true;
  }
}

export type PaperTag = "div" | "section" | "article" | "aside" | "main" | "li";

export interface PaperProps extends SurfaceProps {
  /** HTML element to render as. @default "div" */
  as?: PaperTag;

  /**
   * Stack children vertically using flexbox.
   * Enables gap between children; does nothing otherwise.
   * @default false
   */
  stack?: boolean;

  /**
   * Gap between stacked children. Only meaningful when stack=true.
   * @default "md"
   */
  gap?: PaperGap;

  /**
   * Expand to fill container width.
   * @default false
   */
  fullWidth?: boolean;
}

!!!

---

---

## popover.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/popover/popover.props.ts`


!!!ts
import type { BaseComponentProps } from "~/shared/base.props";
import type { PopoverPlacement, PopoverRadius } from "./popover.tokens";

export interface PopoverProps extends BaseComponentProps {
  id:          string;
  placement?:  PopoverPlacement;
  radius?:     PopoverRadius;
}

!!!

---

---

## portal.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/portal/portal.props.ts`


!!!ts

!!!

---

---

## progress.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/progress/progress.props.ts`


!!!ts
// design/feedback/progress/progress.props.ts

/**
 * @file Prop interface for the Progress component.
 * @module design/feedback/progress
 *
 * {@link ProgressProps} extends {@link FeedbackProps} with props for
 * displaying completion state across four display types.
 *
 * **Inheritance chain:**
 * !!!
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps        size, variant, color, radius, pulse, placement
 *        ↑
 * ProgressProps        value, max, type, showValue, indeterminate
 * !!!
 *
 * **Fill computation:**
 * The hook computes `fillPercent = clamp(value / max, 0, 1) * 100` and
 * writes it as `--progress--fill: X%`. CSS reads it as:
 *   - `width` for `bar`
 *   - `stroke-dashoffset` for `ring`
 *   - Display text for `number` and `percent`
 *
 * **Label:**
 * Progress has no `label` prop — use the default slot to provide a label
 * or descriptive text above or below the indicator. Consumer owns markup.
 *
 * @see {@link PROGRESS_DEFAULTS} in `feedback/progress/progress.tokens.ts`
 * @see {@link useProgress}       in `feedback/progress/progress.hook.ts`
 */

import type { FeedbackProps } from "../../feedback.props";
import type { ProgressType }  from "./progress.tokens";

/**
 * Props for the `<Progress>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic bar (60% complete) -->
 * <Progress value={60} />
 *
 * <!-- Ring with value shown -->
 * <Progress value={3} max={10} type="ring" showValue />
 *
 * <!-- Large number display -->
 * <Progress value={6} max={10} type="number" />  <!-- → "6/10" -->
 *
 * <!-- Percentage display -->
 * <Progress value={84} type="percent" />  <!-- → "84%" -->
 *
 * <!-- Indeterminate (loading, unknown progress) -->
 * <Progress indeterminate />
 *
 * <!-- With a label slot -->
 * <Progress value={45} color="success">
 *   <span>Upload progress</span>
 * </Progress>
 * !!!
 */
export interface ProgressProps extends FeedbackProps {
  /**
   * Current progress value. Should be between `0` and `max`.
   * When undefined and `indeterminate` is false, renders an empty track.
   */
  value?: number;

  /**
   * Maximum value. The fill percentage is computed as `value / max`.
   * @default `100`
   */
  max?: number;

  /**
   * Display style for the progress indicator.
   *
   * - `bar`     — Horizontal track with a fill div. Classic progress bar.
   * - `ring`    — Circular SVG stroke. Radial / donut progress.
   * - `number`  — Large display-font numeral: `"{value}/{max}"`. No track rendered.
   * - `percent` — Large display-font percentage: `"{fillPercent}%"`. No track rendered.
   *
   * @default `"bar"`
   */
  type?: ProgressType;

  /**
   * Renders the computed percentage value alongside `bar` or `ring` types.
   * Has no effect on `number` or `percent` types (they are already numeric).
   *
   * @default `false`
   */
  showValue?: boolean;

  /**
   * Indeterminate state — progress is active but amount is unknown.
   *
   * When true:
   * - `bar`: shows an animated shimmer sweep across the track.
   * - `ring`: shows an animated rotating arc.
   * - `number`/`percent`: shows `"—"`.
   *
   * @default `false`
   */
  indeterminate?: boolean;
}

!!!

---

---

## prose.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/prose/prose.props.ts`


!!!ts
// design/typography/components/prose/prose.props.ts
import type { TypographyProps } from "../../typography.props";

export type ProseTag = "div" | "article" | "main" | "section";

export interface ProseProps extends TypographyProps {
  /**
   * HTML element to render.
   * @default "article"
   */
  as?: ProseTag;
}

!!!

---

## quote.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/quote/quote.props.ts`


!!!ts
// design/typography/quote/quote.props.ts
import type { TypographyProps } from "../../typography.props";
import type { QuoteType } from "./quote.tokens";

export interface QuoteProps extends TypographyProps {
  /**
   * The semantic and visual type of quote.
   * - `block`: Standard blockquote (default)
   * - `pull`: Prominent, larger text for pull quotes
   * - `inline`: Inline quote using the `<q>` tag
   * @default 'block'
   */
  type?: QuoteType;
  cite?: string;
}

!!!

---

## radio-group.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio-group/radio-group.props.ts`


!!!ts
// design/forms/components/radio-group/radio-group.props.ts

/**
 * @file Prop types for the RadioGroup component.
 * @module design/forms/radio-group
 *
 * @see {@link RadioGroupTokens}  in `radio-group.tokens.ts`
 * @see {@link useRadioGroup}     in `radio-group.hook.ts`
 */

import type { RadioGroupLayout } from "./radio-group.tokens";

export type RadioGroupProps = {
  /** Shared name for all child Radio inputs. Propagated via Web Component. */
  name?:   string;
  /** Text for the `<legend>` element. Screen readers announce this as the group label. */
  legend?: string;
  /** Stack children vertically (default) or horizontally. */
  layout?: RadioGroupLayout;
  class?:  string;
  style?:  string;
};

!!!

---

## radio.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio/radio.props.ts`


!!!ts
// design/forms/radio/radio.props.ts

/**
 * @file Prop interface for the Radio component.
 * @module design/forms/radio
 *
 * {@link RadioProps} extends {@link FormProps} with radio-specific props.
 * The component renders as a `<label>` wrapping a hidden `<input type="radio">`,
 * a circular custom indicator, and an optional label slot.
 *
 * **Inheritance chain:**
 * !!!
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FormProps            size, variant, color, radius,
 *        ↑             disabled, required, invalid, name, fullWidth
 * RadioProps           id, value, checked, labelPosition
 * !!!
 *
 * **Grouping:**
 * Radio buttons in the same group share the same `name` attribute. The browser
 * enforces mutual exclusivity (only one with a given `name` can be checked).
 * Pass the same `name` to all `Radio` instances in a group:
 *
 * !!!astro
 * <Radio name="theme" value="light" checked>Light</Radio>
 * <Radio name="theme" value="dark">Dark</Radio>
 * <Radio name="theme" value="system">System</Radio>
 * !!!
 *
 * **No `indeterminate`:**
 * Radio buttons do not have an indeterminate state — they are always
 * either selected or not. Unlike checkboxes, there is no in-between.
 *
 * @see {@link FormProps}      in `forms/forms.props.ts`        — parent interface
 * @see {@link LabelPosition}  in `forms/radio/radio.tokens.ts`
 * @see {@link RADIO_DEFAULTS} in `forms/radio/radio.tokens.ts`
 * @see {@link useRadio}       in `forms/radio/radio.hook.ts`
 */

import type { FormProps }    from "~f/forms.props";
import type { LabelPosition } from "./radio.tokens";

/**
 * Props for the `<Radio>` component.
 *
 * @example
 * !!!astro
 * <!-- A radio group — same name, different values -->
 * <Radio name="plan" value="free" checked>Free</Radio>
 * <Radio name="plan" value="pro">Pro</Radio>
 * <Radio name="plan" value="enterprise">Enterprise</Radio>
 *
 * <!-- Card-style radio with outlined wrapper -->
 * <Radio name="plan" value="pro" variant="outlined" color="primary">
 *   Pro — $12/month
 * </Radio>
 *
 * <!-- Label on the left -->
 * <Radio name="agree" value="yes" labelPosition="start">Yes</Radio>
 * !!!
 *
 * @see {@link FormProps}  — inherited token dimensions and behavior props
 * @see {@link useRadio}   — resolves these props at runtime
 */
export type RadioProps = FormProps & {
  id?: string;
  value?: string;
  checked?: boolean;
  labelPosition?: LabelPosition;
};
!!!

---

## range-slider.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/range-slider/range-slider.props.ts`


!!!ts

!!!

---

## screen.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/screen/screen.props.ts`


!!!ts
/**
 * Screen / Page Component
 * - represents a full viewport-sized area or page-level container.
 * 
 * =======================================================================
 *   
 *   Screen
 *   └── Container
 *       └── Section
 *           └── Stack
 *               └── Content
 * 
 *========================================================================
 *
 * @example
 * <Screen>
 *   <Stack align="center" justify="center">
 *     <H>Settings</H>
 *     <Button>Save</Button>
 *   </Stack>
 * </Screen>
 * 
 * <style>
 * .screen {
 *   min-height: 100vh;
 *   display: flex;
 * }
 * </style>
 * 
 * =======================================================================
 * 
 * Common responsibilities:
 * - min-heigh: 100vh or 100svh
 * - page background
 * - page padding
 * - centering page content
 * - handling sticky footers
 * - handling mobile viewport quirks
 * 
 * =======================================================================
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
// const headerHeight = "var(--header--height)";
// const footerHeight = "var(--footer--height)";

import type { LayoutProps } from "~/layout/layout.props";
import type { PageHeight, ScreenTag, OverflowOptions, PageCentered } from "./screen.tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";
import { composeTokens } from "~/shared/tokens";

export const SCREEN_TOKENS = composeTokens(LAYOUT_TOKENS, {});


export interface ScreenProps extends LayoutProps {
  as?:       ScreenTag;
  /** HTML tag to render as. @default "div" */
  height:    PageHeight;
  overflow?: OverflowOptions;
  centered?: PageCentered;
}
!!!

---

## search.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/search/search.props.ts`


!!!ts
// design/forms/search/search.props.ts

/**
 * @file Prop interface for the Search component.
 * @module design/forms/search
 *
 * {@link SearchProps} extends {@link FormProps} with search-specific props.
 * Structurally mirrors {@link InputProps} but with different defaults and
 * the `loading` prop.
 *
 * @see {@link FormProps}       in `forms/forms.props.ts`           — parent
 * @see {@link SEARCH_DEFAULTS} in `forms/search/search.tokens.ts`
 * @see {@link useSearch}       in `forms/search/search.hook.ts`
 */

import type { FormProps } from "~f/forms.props";

/**
 * Props for the `<Search>` component.
 *
 * @example
 * !!!astro
 * <!-- Basic full-width search -->
 * <Search name="q" placeholder="Search…" />
 *
 * <!-- With initial value -->
 * <Search name="q" value={searchQuery} placeholder="Search products…" />
 *
 * <!-- Async loading state -->
 * <Search name="q" loading={isSearching} placeholder="Search…" />
 *
 * <!-- Inline / constrained width -->
 * <Search name="q" fullWidth={false} size="sm" placeholder="Filter…" />
 *
 * <!-- With leading icon in start slot -->
 * <Search name="q" placeholder="Search…">
 *   <Icon slot="start" name="search" />
 * </Search>
 * !!!
 */
export type SearchProps = FormProps & {
  id?: string;
  value?: string;
  placeholder?: string;
  loading?: boolean;
  readonly?: boolean;
  maxLength?: number;
  autocomplete?: string;
};

!!!

---

## section.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/section/section.props.ts`


!!!ts
// design/surfaces/components/section/section.props.ts
import type { SurfaceProps } from "../../surface.props";

export type SectionTag = "section" | "div" | "article" | "main" | "header" | "footer";

export interface SectionProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "section"
   */
  as?: SectionTag;
}

!!!

---

## segmented-control.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/segmented-control/segmented-control.props.ts`


!!!ts

!!!

---

## select.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/select/select.props.ts`


!!!ts
// design/forms/select/select.props.ts

/**
 * @file Prop types for the Select component.
 * @module design/forms/select
 *
 * This file exports three public surfaces:
 * - {@link SelectOption}         — shape of a single item in the options list
 * - {@link ResolvedSelectOption} — option with `selected` computed; used by `Select.astro`
 * - {@link SelectProps}          — discriminated union for single vs multi-select
 *
 * **Discriminated union:**
 * `SelectProps` is a union of two interfaces, discriminated by `multiple`:
 *
 * !!!
 * multiple?: false  →  SelectSingleProps  →  value?: string
 * multiple:  true   →  SelectMultiProps   →  value?: string[]
 * !!!
 *
 * This gives callers precise type checking: passing `value={["a", "b"]}`
 * on a single select is a TypeScript error. The union collapses to a
 * single component and a single hook — no `Multiselect` file exists.
 *
 * **Why the internal shapes are not exported:**
 * `SelectSingleProps` and `SelectMultiProps` are implementation details.
 * Consumers use `SelectProps` exclusively. Exposing the internals would
 * allow coupling to one branch of the union, making future changes harder.
 *
 * **Options as props:**
 * `<option>` elements must be children of `<select>` in the DOM. Because
 * Astro slots cannot be placed inside a `<select>` element, options are
 * passed as `SelectOption[]` and `Select.astro` renders them by mapping
 * over the `resolvedOptions` returned by {@link useSelect}.
 *
 * @see {@link FormProps}      in `forms/forms.props.ts`         — parent interface
 * @see {@link useSelect}      in `forms/select/select.hook.ts`  — resolves these props
 * @see {@link SELECT_DEFAULTS} in `forms/select/select.tokens.ts`
 *
 * @todo Add `SelectOptionGroup` type for `<optgroup>` support:
 *   !!!ts
 *   export interface SelectOptionGroup {
 *     label:    string;
 *     options:  SelectOption[];
 *     disabled?: boolean;
 *   }
 *   !!!
 *   Then change the `options` prop to
 *   `Array<SelectOption | SelectOptionGroup>`. The hook stays unchanged;
 *   `Select.astro` checks `"options" in item` to decide whether to render
 *   an `<optgroup>` or a plain `<option>`.
 */

import type { FormProps } from "~/forms/forms.props";

// ─── OPTION TYPES ─────────────────────────────────────────────────────────────

/**
 * A single selectable option within a {@link SelectProps.options} list.
 *
 * Rendered as a native `<option>` element by `Select.astro`. The `value`
 * is what gets submitted with the form; `label` is what the user sees.
 *
 * @example
 * !!!ts
 * const countries: SelectOption[] = [
 *   { value: "us", label: "United States" },
 *   { value: "uk", label: "United Kingdom" },
 *   { value: "ca", label: "Canada", disabled: true },
 * ];
 * !!!
 */
export interface SelectOption {
  /** The value submitted with the form on selection. Must be unique in the list. */
  value:     string;
  /** The human-readable text displayed in the dropdown. */
  label:     string;
  /** When `true`, the option is visible but not selectable. @default false */
  disabled?: boolean;
}

/**
 * A {@link SelectOption} with `selected` resolved against the current value.
 *
 * Returned as part of {@link useSelect}'s output. `Select.astro` maps over
 * this array to render `<option selected>` on the correct item(s) without
 * having to re-derive selection state in the template.
 *
 * @remarks
 * The `selected` field is `true` when:
 * - Single select: `option.value === props.value`
 * - Multi select: `props.value.includes(option.value)`
 *
 * @see {@link useSelect} — where `selected` is computed
 */
export type ResolvedSelectOption = SelectOption & {
  /**
   * Whether this option is currently selected, derived from the
   * component's `value` prop by {@link useSelect}.
   */
  selected: boolean;
};

// ─── INTERNAL UNION BRANCHES ─────────────────────────────────────────────────
// Not exported — consumers use SelectProps (the union). These are internal
// to allow TypeScript to narrow value type by the multiple discriminant.

/**
 * Shared props for both select modes.
 * Not exported — use {@link SelectProps}.
 */
import type { IconProps } from "~/shared/icon.props";

type SelectBaseProps = FormProps & IconProps & {
  options: SelectOption[];
  placeholder?: string;
  id?: string;
};

/**
 * Props for single-selection mode. `multiple` is absent or `false`.
 * Not exported — use {@link SelectProps}.
 */
type SelectSingleProps = SelectBaseProps & {
  /**
   * Absent or explicitly `false` selects single-value mode.
   * Renders a standard `<select>` element.
   */
  multiple?: false;

  /**
   * The currently selected value.
   *
   * Must be one of the `value` strings in the `options` array for the
   * correct `<option>` to receive the `selected` attribute. When
   * `undefined`, no option is pre-selected (the browser shows the first
   * option or the `placeholder` if provided).
   */
  value?: string;
};

/**
 * Props for multi-selection mode. `multiple` must be exactly `true`.
 * Not exported — use {@link SelectProps}.
 */
type SelectMultiProps = SelectBaseProps & {
  /**
   * `true` enables multi-selection mode.
   * Renders `<select multiple>` — the user can select multiple options
   * via Shift+click or Ctrl/Cmd+click.
   *
   * @remarks
   * Native `<select multiple>` renders as a scrollable list box, not a
   * dropdown. Styling it consistently across browsers requires CSS reset
   * (`appearance: none`) plus custom height/scroll rules in `select.css`.
   * For a more controlled multi-select dropdown UX, prefer a future
   * `Combobox` component with `multiple` support.
   */
  multiple: true;

  /**
   * The currently selected values — an array of option value strings.
   *
   * Every string in this array that matches an option's `value` will
   * receive `selected` on its `<option>` element. An empty array or
   * `undefined` means nothing is selected.
   */
  value?: string[];
};

// ─── PUBLIC UNION TYPE ───────────────────────────────────────────────────────

/**
 * Props for the `<Select>` component.
 *
 * A discriminated union on `multiple`. TypeScript narrows the `value`
 * type automatically based on which branch is active:
 *
 * !!!ts
 * // Single-select — value is string | undefined
 * <Select name="country" options={countries} value="us" />
 *
 * // Multi-select — value is string[] | undefined
 * <Select name="tags" options={tags} multiple value={["ts", "astro"]} />
 *
 * // Type error — array value on single select
 * <Select name="x" options={[]} value={["a", "b"]} />
 * //                             ^^^^^^^^^^^^^^^^^ TS error
 * !!!
 *
 * @see {@link SelectSingleProps} — single-select branch (internal)
 * @see {@link SelectMultiProps}  — multi-select branch (internal)
 * @see {@link SelectOption}      — shape of each option in `options`
 * @see {@link useSelect}         — resolves these props at runtime
 */
export type SelectProps = SelectSingleProps | SelectMultiProps;
!!!

---

## separator.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/separator/separator.props.ts`


!!!ts
import type { BaseComponentProps } from "~sh/base.props";
import type {
  SeparatorOrientation,
  SeparatorStrength,
  SeparatorVariant,
} from "./separator.tokens";

/**
 * Props for the Separator component.
 */
export interface SeparatorProps extends BaseComponentProps {
  /** The orientation of the separator. Defaults to `horizontal`. */
  orientation?: SeparatorOrientation;

  /** The visual style of the line. Defaults to `solid`. */
  variant?: SeparatorVariant;

  /** The color intensity of the line, mapping to border tokens. Defaults to `default`. */
  strength?: SeparatorStrength;
}
!!!

---

## sheet.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/sheet/sheet.props.ts`


!!!ts
import type { OverlaysProps } from "../../overlays.props";

export type SheetSide = "left" | "right" | "top" | "bottom";

export interface SheetProps extends OverlaysProps {
  id: string;
  side?: SheetSide;
  title?: string;
}

!!!

---

## skeleton.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/skeleton/skeleton.props.ts`


!!!ts
// design/feedback/skeleton/skeleton.props.ts

import type { BaseComponentProps }            from "~/shared/base.props";
import type { SkeletonVariant, SkeletonRadius } from "./skeleton.tokens";

export interface SkeletonProps extends BaseComponentProps {
  /**
   * The shape preset.
   *
   * - `text`    — single text line (~1em tall). Use `lines` for a block.
   * - `heading` — taller, narrower width. For title placeholders.
   * - `avatar`  — circular. Diameter set by `height` (default 2.5rem).
   * - `button`  — pill shape. For CTA placeholders.
   * - `image`   — rectangle with `ratio` aspect-ratio. For media.
   * - `block`   — no default size. Set `width` + `height` explicitly.
   *
   * @default "block"
   */
  variant?: SkeletonVariant;

  /**
   * Number of text lines to render.
   * Only applies to `variant="text"`. Renders stacked lines with the
   * last one at 65% width — a realistic paragraph placeholder.
   *
   * @default 1
   */
  lines?: number;

  /**
   * Explicit CSS width. Overrides the variant's default.
   * Any valid CSS length: `"200px"` | `"100%"` | `"12rem"`.
   */
  width?: string;

  /**
   * Explicit CSS height. Overrides the variant's default.
   * Any valid CSS length. For `avatar`, this also sets the width
   * (avatar is always square before border-radius rounds it).
   */
  height?: string;

  /**
   * CSS aspect-ratio for `variant="image"`.
   * @example "16/9" | "4/3" | "1/1"
   * @default "16/9"
   */
  ratio?: string;

  /**
   * Border radius. Overrides the per-variant default.
   * Useful when the skeleton must match the shape it replaces.
   * `avatar` ignores this — it is always a circle.
   */
  radius?: SkeletonRadius;

  /**
   * Whether the shimmer animation runs.
   * Set to `false` to show a static placeholder (e.g. in tests,
   * or when reduced-motion is handled at a higher level).
   *
   * @default true
   */
  animated?: boolean;
}
!!!

---

## skip-link.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/skip-link/skip-link.props.ts`


!!!ts
// design/triggers/components/skip-link/skip-link.props.ts
import type { TriggerProps } from "../../trigger.props";

export interface SkipLinkProps extends TriggerProps {
  /**
   * The ID of the target element to focus when clicked (e.g. "main" or "#main").
   * @default "main"
   */
  target?: string;
  
  /**
   * Text label to display.
   * @default "Skip to content"
   */
  label?: string;
}

!!!

---

## slider.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/slider/slider.props.ts`


!!!ts

!!!

---

## spacer.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/spacer/spacer.props.ts`


!!!ts
import type { BaseComponentProps } from "~sh/base.props";
import type { SpacerTag } from "./spacer.tokens";

/**
 * Props for the Spacer component.
 */
export interface SpacerProps extends BaseComponentProps {
  /** The HTML tag to render. Defaults to `div`. */
  as?: SpacerTag;
}
!!!

---

## spinner.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/spinner/spinner.props.ts`


!!!ts
// design/feedback/spinner/spinner.props.ts

/**
 * @file Prop interface for the Spinner component.
 * @module design/feedback/spinner
 *
 * {@link SpinnerProps} extends {@link FeedbackProps} with spinner-specific
 * props for animation control and accessible labelling.
 *
 * **Inheritance chain:**
 * !!!
 * BaseComponentProps   class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * FeedbackProps        size, variant, color, radius, pulse, placement
 *        ↑
 * SpinnerProps         speed, direction, icon, label
 * !!!
 *
 * **Icon system:**
 * The `icon` prop is ready to accept an icon name from `shared/icons` once
 * that system is in place. Until then, the component renders its built-in
 * SVG arc. The prop type will be narrowed to `IconName` from the generated
 * icon type file once available.
 *
 * **Positioning:**
 * Spinner has no `position` prop. Place the spinner inside a
 * `position: relative` wrapper to overlay it. A dedicated `<LoadingOverlay>`
 * component will handle the overlay pattern in a future iteration.
 *
 * @see {@link SPINNER_DEFAULTS} in `feedback/spinner/spinner.tokens.ts`
 * @see {@link useSpinner}       in `feedback/spinner/spinner.hook.ts`
 */

import type { FeedbackProps }             from "../../feedback.props";
import type { SpinnerSpeed, SpinnerDirection } from "./spinner.tokens";
import type { SvgName }                        from "~/shared/icons/index";
import type { ColorRole } from "~/shared/primitives.tokens";

/**
 * Props for the `<Spinner>` component.
 *
 * @example
 * !!!astro
 * <!-- Default spinner -->
 * <Spinner />
 *
 * <!-- Slow large spinner -->
 * <Spinner size="lg" speed="slow" />
 *
 * <!-- Fast counter-clockwise (e.g. unwinding) -->
 * <Spinner speed="fast" direction="counterclockwise" />
 *
 * <!-- Danger color (e.g. cancelling) -->
 * <Spinner color="danger" label="Cancelling…" />
 *
 * <!-- Inline with text -->
 * <span style="display: inline-flex; gap: 0.5rem; align-items: center;">
 *   <Spinner size="sm" />
 *   Saving…
 * </span>
 * !!!
 */
export interface SpinnerProps extends Omit<FeedbackProps, "color"> {
  /**
   * Color of the spinner.
   * 
   * Accepts any standard semantic `ColorRole` (primary, danger, etc).
   * For a spinner that sits inside a button or text block, use `"inherit"`
   * so it automatically matches the surrounding text color.
   * 
   * @default `"primary"`
   */
  color?: ColorRole | "inherit";

  /**
   * Rotation speed of the spinner arc.
   *
   * - `slow`   — 1.4s per revolution. Gentle, low-urgency loading.
   * - `normal` — 0.8s per revolution. Default.
   * - `fast`   — 0.4s per revolution. High-urgency operations.
   *
   * @default `"normal"`
   */
  speed?: SpinnerSpeed;

  /**
   * Rotation direction.
   *
   * - `clockwise`        — Standard spinner direction. Default.
   * - `counterclockwise` — Reversed rotation. Useful for "unwinding" states.
   *
   * @default `"clockwise"`
   */
  direction?: SpinnerDirection;

  /**
   * Icon from the Dezign8 icon registry (`shared/icons`).
   *
   * Accepts any `SvgName` key from the generated registry. The SVG component
   * is rendered inside the spinner and rotates on the same animation.
   *
   * Three spinner variants are available out of the box:
   * - `"spinner"`       — single arc (default)
   * - `"spinner-two"`   — dual-arc with opacity contrast
   * - `"spinner-three"` — triple arc
   *
   * Any other icon in the registry can be used for creative loading states.
   *
   * @default `"spinner"`
   */
  icon?: SvgName;

  /**
   * Accessible label announced by screen readers.
   *
   * Rendered as a visually-hidden `<span>` inside the spinner element.
   * The SVG arc is `aria-hidden` so only this label is read aloud.
   *
   * @default `"Loading"`
   */
  label?: string;
}

!!!

---

## stack.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/stack/stack.props.ts`


!!!ts
import type { BaseComponentProps } from "~sh/base.props";
import type { StackGap, StackTag } from "./stack.tokens";
import type { LayoutAlign, LayoutJustify } from "~/layout/layout.tokens";

export interface StackProps extends BaseComponentProps {
  /** HTML tag to render as. @default "div" */
  as?: StackTag;

  /** Spacing between stacked children. @default "md" */
  gap?: StackGap;

  align?: LayoutAlign;

  justify?: LayoutJustify;
}
!!!

---

## stat.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/stat/stat.props.ts`


!!!ts
import type { DataProps } from "~/data/data.props";
import type { IconProps } from "~/shared/icon.props";

export interface StatProps extends DataProps, IconProps {
  /** The primary numeric value to display. */
  value?: string | number;
  /** The descriptive label for the stat. */
  label?: string;
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Stat: true;
  }
}

!!!

---

## step/step.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/step/step.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";
import type { StepState } from "../stepper.props";

export interface StepProps extends HTMLAttributes<"div" | "a" | "button"> {
  /** The state of the step */
  state: StepState;
  /** Primary label */
  label?: string;
  /** Optional secondary description */
  description?: string;
  /** Indicates if this is the last step (hides the connecting line) */
  isLast?: boolean;
  /** URL to navigate to, if the step is a link */
  href?: string;
  /** If true and no href is provided, renders as a button. Otherwise a div. */
  interactive?: boolean;
  /** The step number or icon to display inside the indicator circle */
  stepNumber?: number | string;
}

!!!

---

## stepper.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/stepper.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";

export type StepState = "complete" | "current" | "incomplete";

export interface StepperItemData {
  id: string;
  label: string;
  description?: string;
  state?: StepState;
}

export interface StepperProps extends NavProps {
  /** Array of step data for auto-generation */
  items?: StepperItemData[];
  /** Orientation of the stepper */
  orientation?: "horizontal" | "vertical";
  /** If data-driven, which step index is currently active (0-indexed). Auto-calculates states. */
  currentStepIndex?: number;
}

!!!

---

## switch.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/switch/switch.props.ts`


!!!ts
// design/forms/components/switch/switch.props.ts

/**
 * @file Prop types for the Switch component.
 * @module design/forms/switch
 *
 * @see {@link SwitchTokens}  in `switch.tokens.ts`
 * @see {@link useSwitch}     in `switch.hook.ts`
 */

import type { FormProps }    from "~f/forms.props";
import type { LabelPosition } from "./switch.tokens";

export type SwitchProps = FormProps & {
  id?:           string;
  name?:         string;
  value?:        string;
  checked?:      boolean;
  labelPosition?: LabelPosition;
};

!!!

---

## table-parts.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/table-parts.props.ts`


!!!ts
// design/data/table/parts/table-parts.props.ts

/**
 * Prop types for Table compound-mode parts.
 *
 * Parts are thin semantic wrappers — no tokens, no hooks, no CSS of
 * their own. They render the correct HTML element and inherit all
 * visual behaviour from the `.table` context set by the parent `<Table>`.
 *
 * All parts extend BaseComponentProps, which provides `class`, `style`,
 * `id`, `bg`, `animation`, `testId`, `v`, and HTML passthrough via
 * the index signature.
 */

import type { BaseComponentProps } from "~/shared/base.props";
import type { TableAlign } from "./table.tokens";

// ─── HEAD / BODY / FOOT ───────────────────────────────────────
// No additional props — just HTML passthrough.

export type TableHeadProps = BaseComponentProps;
export type TableBodyProps = BaseComponentProps;
export type TableFootProps = BaseComponentProps;

// ─── ROW ──────────────────────────────────────────────────────

export interface TableRowProps extends BaseComponentProps {
  /**
   * Marks this row as highlighted.
   * Renders `data-highlighted=""` on the `<tr>`.
   * table.css applies `--data--highlight--*` channels to highlighted rows.
   */
  highlighted?: boolean;
}

// ─── CELL ─────────────────────────────────────────────────────

/** The HTML element a TableCell renders as. */
export type TableCellTag = "td" | "th";

export interface TableCellProps extends BaseComponentProps {
  /**
   * The HTML element to render.
   * Use `"th"` for header cells inside `<TableHead>`.
   * @default "td"
   */
  as?: TableCellTag;

  /**
   * Text alignment for this cell.
   * Applied as `data-align` — table.css maps it to `text-align`.
   * Use `"end"` for numeric columns.
   */
  align?: TableAlign;

  /**
   * Explicit column width. Applied as an inline `width` style.
   * Only meaningful on `<th>` elements with `layout="fixed"` on the parent Table.
   * Accepts any CSS length: `"200px"` | `"20ch"` | `"15%"` | `"auto"`.
   */
  width?: string;

  /**
   * Number of columns this cell spans.
   * Maps to the native `colspan` HTML attribute.
   */
  colspan?: number;

  /**
   * Number of rows this cell spans.
   * Maps to the native `rowspan` HTML attribute.
   */
  rowspan?: number;

  /**
   * Defines the cells a `<th>` is a header for.
   * Only meaningful when `as="th"`. Provide this for accessibility.
   *
   * - `"col"`      — header for cells in the same column (most common for thead)
   * - `"row"`      — header for cells in the same row (use for row headers)
   * - `"colgroup"` — header for a group of columns
   * - `"rowgroup"` — header for a group of rows
   */
  scope?: "col" | "row" | "colgroup" | "rowgroup";
}

!!!

---

## table.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/table.props.ts`


!!!ts
// design/data/table/table.props.ts
/**
 * @file Prop interface for the Table component.
 * @module design/data/table
 *
 * {@link TableProps} extends {@link DataProps} with props specific to
 * tabular data. All shared data category props (color channels, density,
 * variant, states, modifiers) are inherited — only Table additions live here.
 *___________________________________________________________________________
 *==============================================================================
 * **Full prop inheritance chain:**
 *
 * !!!
 * BaseComponentProps    class, v, testId, bg, animation, …HTML passthrough
 *        ↑
 * DataProps             color, bg, highlight, variant, size,
 *        ↑              caption, loading, empty,
 *        ↑              striped, bordered,
 *        ↑              interactive, selectable, scrollable
 * TableProps            data, columns, layout,
 *                       stickyHeader, sortable, sort
 * !!!
 *____________________________________________________________________________
 *==============================================================================
 * Table has ** two rendering modes: **
 *
 * 1. Data-driven — Table owns the full render:
 * !!!astro
 * <Table data={rows} columns={cols} caption="Q3 Sales" />
 * !!!
 * 2. Compound — developer controls structure via parts:
 * !!!astro
 * <Table caption="Q3 Sales" striped color="primary">
 *   <TableHead slot="head">…</TableHead>
 *   <TableBody slot="body">…</TableBody>
 * </Table>
 * !!!
 * - Both modes can be mixed: pass `data` and `columns` for the body rows
 * while using a slot for a custom `<TableFoot>`.
 *____________________________________________________________________________
 *==============================================================================
 * ** Slots ** (not declared here — handled by Table.astro):
 *
 * - `head`    — replaces the generated `<thead>` entirely
 * - `body`    — replaces the generated `<tbody>` entirely
 * - `foot`    — appends or replaces `<tfoot>`
 * - `empty`   — replaces the default empty state UI (overrides `empty` prop)
 * - `loading` — replaces the default skeleton UI (overrides `loading` prop)
 *____________________________________________________________________________
 *==============================================================================
 * *** Intentionally NOT in TableProps: ***
 *
 * - `onSort` — sort state changes are consumer-managed. In Astro SSR, handle
 *   via URL search params + server re-render. For client-side, add a `<script>`
 *   or island. Table only reads `sort` to render indicators, never writes it.
 * - `selectedRows` — selection state is consumer-managed. Table renders
 *   checkboxes when `selectable` is true, but tracks nothing internally.
 *   Wire selection via a client script or Astro island.
 * - `stickyColumn` — deferred. Requires `layout="fixed"` + explicit column
 *   widths + per-column `position: sticky` + `left` offsets. Complex enough
 *   to warrant its own implementation pass. Use `scrollable` in the meantime.
 * - `pagination` — out of scope at the component level. Compose `<Table>`
 *   with a `<Pagination>` component in the nav category.
 * _______________________________________________________________________________
 *===================================================================================
 * @see {@link DataProps}       in `data/data.props.ts`         — parent interface
 * @see {@link ColumnDef}       in `data/table/table.tokens.ts` — column config shape
 * @see {@link TableSort}       in `data/table/table.tokens.ts` — sort state shape
 * @see {@link TABLE_DEFAULTS}  in `data/table/table.tokens.ts` — default values
 * @see {@link useTable}        in `data/table/table.hook.ts`   — runtime resolution
 */

import type { DataProps } from "~/data/data.props";
import type {
  ColumnDef,
  RowData,
  TableLayout,
  TableSort,
} from "./table.tokens";

/**
 * Props for the `<Table>` component.
 *
 * Extends {@link DataProps} which extends {@link BaseComponentProps}.
 * All inherited props are available without redeclaration.
 *
 * @example Minimal data-driven
 * !!!astro
 * <Table data={rows} columns={cols} caption="Q3 Sales by Region" />
 * !!!
 *
 * @example Full data-driven
 * !!!astro
 * <Table
 *   data={rows}
 *   columns={cols}
 *   caption="Q3 Sales by Region"
 *   color="primary"
 *   variant="outlined"
 *   size="comfortable"
 *   striped
 *   sortable
 *   sort={{ key: "revenue", direction: "desc" }}
 *   stickyHeader
 *   scrollable
 *   layout="fixed"
 *   loading={isFetching}
 *   empty="No results match your filters"
 * />
 * !!!
 *
 * @example Compound mode
 * !!!astro
 * <Table caption="Team members" color="primary" striped interactive>
 *   <TableHead slot="head">
 *     <TableRow>
 *       <TableCell as="th">Name</TableCell>
 *       <TableCell as="th">Role</TableCell>
 *     </TableRow>
 *   </TableHead>
 *   <TableBody slot="body">
 *     {members.map(m => (
 *       <TableRow>
 *         <TableCell>{m.name}</TableCell>
 *         <TableCell>{m.role}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * !!!
 */
export interface TableProps extends DataProps {
  // ─── DATA-DRIVEN MODE ──────────────────────────────────────

  /**
   * Row records to render. Each object is one `<tr>`.
   *
   * Values are typed as `unknown` — use `ColumnDef.format()` to
   * transform values before display, or use compound mode for
   * rich cell content (badges, links, nested components).
   *
   * When omitted, Table renders only what is provided via slots
   * (compound mode). Providing both `data` and a `body` slot
   * is valid — the slot takes precedence for that section.
   */
  data?: RowData[];

  /**
   * Column definitions. Controls header labels, alignment, widths,
   * per-column sort, and optional value formatting.
   *
   * Required when `data` is provided. If `columns` is omitted with
   * `data` present, Table falls back to rendering raw Object.keys()
   * of the first row as column headers with no formatting.
   *
   * @see {@link ColumnDef} for the full shape and field docs
   */
  columns?: ColumnDef[];

  // ─── LAYOUT ────────────────────────────────────────────────

  /**
   * CSS `table-layout` algorithm.
   *
   * - `"auto"`  — browser sizes columns from content. Flexible but
   *               slower to paint for large tables. Default.
   * - `"fixed"` — columns sized from first row or explicit `width`
   *               values in `ColumnDef`. Faster, required for
   *               reliable column widths and `scrollable` tables.
   *
   * @default `"auto"` — applied by {@link useTable}
   */
  layout?: TableLayout;

  // ─── BEHAVIOUR ─────────────────────────────────────────────

  /**
   * Pins the `<thead>` to the top of the scroll container.
   *
   * Only meaningful when `scrollable` is also true and a constrained
   * height is set on the component or its parent — without a scroll
   * container, sticky has no effect.
   *
   * Requires `layout="fixed"` for consistent column alignment between
   * the sticky header and the scrolling body.
   *
   * @default false
   */
  stickyHeader?: boolean;

  /**
   * Whether columns can be sorted by clicking their header cell.
   *
   * Enables sort indicators on all `<th>` elements whose `ColumnDef`
   * does not explicitly set `sortable: false`. To enable sorting on
   * specific columns only, leave this false and set `sortable: true`
   * per column in `ColumnDef`.
   *
   * Table renders sort indicators but does not manage sort state.
   * Provide `sort` to show the current sort direction, and handle
   * sort changes on the consumer side.
   *
   * @default false
   */
  sortable?: boolean;

  /**
   * Current sort state — which column is sorted and in which direction.
   *
   * Table reads this to render the active sort indicator (▲ / ▼) on
   * the matching column header. Providing `sort` without `sortable`
   * still renders the indicator — useful for server-sorted tables
   * where the UI just needs to reflect the current state.
   *
   * Sort state is always consumer-managed:
   * - SSR: derive from URL search params, pass here, re-render on change
   * - Client: manage with a `<script>` or island, pass as a reactive prop
   *
   * @see {@link TableSort} for the shape: `{ key: string, direction: "asc" | "desc" }`
   */
  sort?: TableSort;
}

!!!

---

## group/t-group.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/group/t-group.props.ts`


!!!ts
export interface TabGroupProps {
  /** The ID of the initially active tab. Optional, defaults to the first tab. */
  defaultActiveId?: string;
  class?: string;
}

!!!

---

## panel/t-panel.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/panel/t-panel.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";

export interface TabPanelProps extends HTMLAttributes<"div"> {
  /** The unique ID of the panel, must match the Tab it is controlled by */
  id: string;
  /** Whether the panel is currently visible */
  active?: boolean;
}

!!!

---

## tab/tab.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/tab/tab.props.ts`


!!!ts
import type { HTMLAttributes } from "astro/types";
import type { IconProps } from "~/shared/icon.props";

export interface TabProps extends HTMLAttributes<"button" | "a">, IconProps {
  /** The unique ID of the tab, must match the TabPanel it controls */
  id: string;
  /** Whether the tab is currently active (mostly for uncontrolled setups) */
  active?: boolean;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** URL to navigate to, turning the tab into a link */
  href?: string;
}

!!!

---

## tabs.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/tabs.props.ts`


!!!ts
import type { NavProps } from "../../nav.props";
import type { SvgName } from "~/shared/icons";

export interface TabData {
  /** Unique ID for the tab, must match the TabPanel it controls */
  id: string;
  /** Text label for the tab */
  label: string;
  /** If true, tab is not selectable */
  disabled?: boolean;
  /** URL to navigate to, turning the tab into a link */
  href?: string;
  /** Whether the tab is currently active (mostly for uncontrolled setups) */
  active?: boolean;
  /** Leading icon for the tab */
  icon?: SvgName;
}

export interface TabsProps extends NavProps {
  /** Array of tab data. Optional if using the slot pattern manually. */
  items?: TabData[];
  
  /** If true, the tabs will flex to evenly fill the available width. */
  fitted?: boolean;
}

!!!

---

## tag.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/tag/tag.props.ts`


!!!ts
// design/feedback/components/tag/tag.props.ts

import type { FeedbackProps } from "../../feedback.props";

import type { IconProps } from "~/shared/icon.props";

export interface TagProps extends FeedbackProps, IconProps {
  /**
   * Renders a square tag containing only an icon.
   */
  iconOnly?: boolean;
}

!!!

---

## text.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/text/text.props.ts`


!!!ts
// design/typography/text/text.props.ts
import type { TypographyProps } from "~ty/typography.props";

export type TextTag =
  | "p" | "span" | "div" | "li"
  | "strong" | "em" | "del" | "ins" | "mark" | "small"
  | "figcaption" | "cite" | "legend"
  | "dt" | "dd" | "address";

import type { IconProps } from "~/shared/icon.props";

export interface TextProps extends TypographyProps, IconProps {
  /** HTML element to render as. @default 'p' */
  as?: TextTag;
}
!!!

---

## textarea.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/textarea/textarea.props.ts`


!!!ts
// design/forms/components/textarea/textarea.props.ts

/**
 * @file Prop types for the Textarea component.
 * @module design/forms/textarea
 *
 * @see {@link TextareaTokens}  in `textarea.tokens.ts`
 * @see {@link useTextarea}     in `textarea.hook.ts`
 */

import type { FormProps }      from "~f/forms.props";
import type { TextareaResize } from "./textarea.tokens";

export type TextareaProps = FormProps & {
  id?:           string;
  value?:        string;
  placeholder?:  string;
  readonly?:     boolean;
  rows?:         number;
  minLength?:    number;
  maxLength?:    number;
  resize?:       TextareaResize;
  autocomplete?: string;
  wrap?:         "soft" | "hard" | "off";
};

!!!

---

## theme-toggle.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/theme-toggle/theme-toggle.props.ts`


!!!ts
// design/triggers/components/theme-toggle/theme-toggle.props.ts

/**
 * ThemeToggleProps
 *
 * Extends `ButtonProps` so that every trigger-level prop (`variant`, `color`,
 * `size`, `radius`) and button-level prop (`iconOnly`, `fullWidth`) is
 * available. The toggle introduces no additional props — its behaviour
 * (read/write `data-theme` + `localStorage`) is fully internal.
 *
 * Reasonable defaults are applied by `THEME_TOGGLE_DEFAULTS` in the tokens
 * file so the component looks good with zero props:
 *   - `variant: "ghost"`    — blends into any header or toolbar
 *   - `iconOnly: true`      — square icon button (sun / moon)
 *   - `size: "md"`          — standard trigger size
 *   - `color: "neutral"`    — works on any background
 *
 * @example Minimal
 * !!!astro
 * <ThemeToggle />
 * !!!
 *
 * @example Outlined, small
 * !!!astro
 * <ThemeToggle variant="outlined" size="sm" />
 * !!!
 */

import type { ButtonProps } from "~tr/components/button/button.props";

export type ThemeToggleProps = ButtonProps;

!!!

---

## tile.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/tile/tile.props.ts`


!!!ts
// design/surfaces/components/tile/tile.props.ts
import type { SurfaceProps } from "../../surface.props";

export type TileTag = "div" | "a" | "button" | "article" | "li";

export interface TileProps extends SurfaceProps {
  /**
   * Base element. Automatically upgraded to 'a' if href is provided,
   * or 'button' if selectable but no href.
   * @default "div"
   */
  as?: TileTag;

  /**
   * If provided, renders the tile as an anchor tag.
   */
  href?: string;

  /**
   * Makes the tile interactive (hover styles, cursor pointer).
   * Implicitly true if href or selectable is set.
   * @default false
   */
  interactive?: boolean;

  /**
   * Enables selection state toggle behavior.
   * Adds role="button" and aria-pressed.
   * @default false
   */
  selectable?: boolean;

  /**
   * Current selection state.
   * @default false
   */
  selected?: boolean;

  /**
   * Disables interaction and dims the tile.
   * @default false
   */
  disabled?: boolean;
}

!!!

---

## time-picker.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/time-picker/time-picker.props.ts`


!!!ts

!!!

---

## toast.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/toast/toast.props.ts`


!!!ts
// design/feedback/components/toast/toast.props.ts

import type { FeedbackProps } from "../../feedback.props";
import type { ToastColor, ToastRadius, ToastVariant } from "./toast.tokens";

import type { IconProps } from "~/shared/icon.props";

export interface ToastProps extends Omit<FeedbackProps, "color" | "variant" | "radius" | "pulse" | "placement">, IconProps {
  /** Visual treatment. @default "soft" */
  variant?: ToastVariant;

  /** Color role. @default "neutral" */
  color?: ToastColor;

  /** Border radius. @default "md" */
  radius?: ToastRadius;

  /** Optional bold heading above the message body. */
  title?: string;

  /** Show a dismiss button. @default true */
  dismissible?: boolean;

  /** `aria-label` for the dismiss button. @default "Dismiss" */
  dismissLabel?: string;
}

!!!

---

## toolbar.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/toolbar/toolbar.props.ts`


!!!ts

!!!

---

## tooltip.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/tooltip/tooltip.props.ts`


!!!ts
import type { BaseComponentProps } from "~/shared/base.props";
import type { TooltipPlacement, TooltipRadius } from "./tooltip.tokens";

export interface TooltipProps extends BaseComponentProps {
  content:    string;
  placement?: TooltipPlacement;
  radius?:    TooltipRadius;
}

!!!

---

## tree-view.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tree-view/tree-view.props.ts`


!!!ts

!!!

---

## video.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/video/video.props.ts`


!!!ts

!!!

---

## visually-hidden.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/visually-hidden/visually-hidden.props.ts`


!!!ts
// design/typography/components/visually-hidden/visually-hidden.props.ts
import type { BaseComponentProps } from "~/shared/base.props";

export type VisuallyHiddenTag = "span" | "div";

export interface VisuallyHiddenProps extends BaseComponentProps {
  /**
   * HTML element to render as.
   * @default "span"
   */
  as?: VisuallyHiddenTag;
}

!!!

---

## waveform.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/waveform/waveform.props.ts`


!!!ts

!!!

---

## well.props.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/well/well.props.ts`


!!!ts
// design/surfaces/components/well/well.props.ts
import type { SurfaceProps } from "../../surface.props";

export type WellTag = "div" | "article" | "section" | "aside" | "span";

export interface WellProps extends SurfaceProps {
  /**
   * HTML element to render.
   * @default "div"
   */
  as?: WellTag;
}

!!!

---

