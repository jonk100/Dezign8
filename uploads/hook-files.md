# Aggregated HOOK Files

## alert-dialog.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.hook.ts`


!!!ts
import type { AlertDialogProps } from "./alert-dialog.props";
import { ALERT_DIALOG_DEFAULTS } from "./alert-dialog.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useAlertDialog(props: AlertDialogProps) {
  const {
    id,
    title,
    description,
    closeOnEsc = ALERT_DIALOG_DEFAULTS.closeOnEsc,
    icon,
    ...overlayProps } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? ALERT_DIALOG_DEFAULTS.size,
    variant: overlayProps.variant ?? ALERT_DIALOG_DEFAULTS.variant,
    ...overlayProps
  });

  return {
    dialogProps: {
      id,
      class:               composeClass(overlayClass, "alert-dialog"),
      style:               overlayStyle,
      ...overlayAttrs,
      ...rest,
      role:                "alertdialog" as const,
      "aria-modal":        "true" as const,
      "aria-labelledby":   `${id}-title`,
      "aria-describedby":  description ? `${id}-desc` : undefined,
      "data-close-esc":    closeOnEsc ? "true" : "false",
    },
    title,
    titleId:       `${id}-title`,
    description,
    descriptionId: description ? `${id}-desc` : undefined,
  };
}

!!!

---

## alert.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/alert.hook.ts`


!!!ts
// design/feedback/components/alert/alert.hook.ts

import { useFeedback }                    from "../../feedback.hook";
import { composeClass, composeStyle }     from "~sh/base.hook";
import { ALERT_DEFAULTS, ALERT_SIZE_MAP } from "./alert.tokens";
import type { AlertSize }                 from "./alert.tokens";
import type { AlertProps }                from "./alert.props";

export function useAlert(props: AlertProps) {
  const {
    size         = ALERT_DEFAULTS.size,
    variant      = ALERT_DEFAULTS.variant,
    color        = ALERT_DEFAULTS.color,
    radius       = ALERT_DEFAULTS.radius,
    dismissible  = false,
    dismissLabel = "Dismiss",
    icon,
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, size: size as AlertSize, ...feedbackProps });

  const sizeMap = ALERT_SIZE_MAP[size as AlertSize];

  const alertStyle = [
    `--alert--font-size: ${sizeMap.fontSize}`,
    `--alert--padding: ${sizeMap.p}`,
    `--alert--gap: ${sizeMap.gap}`,
  ];

  return {
    props: {
      class: composeClass(feedbackClass, "alert", dismissible && "alert--dismissible"),
      style: composeStyle(feedbackStyle, ...alertStyle) || undefined,
      role:  color === "danger" || color === "warning" ? ("alert" as const) : ("status" as const),
      ...feedbackAttrs,
      ...rest,
    },
    dismissible,
    dismissLabel,
  };
}

!!!

---

## audio.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.hook.ts`


!!!ts
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

!!!

---

## avatar-group.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/avatar-group.hook.ts`


!!!ts

!!!

---

## avatar.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/avatar.hook.ts`


!!!ts
// design/assets/components/avatar/avatar.hook.ts

import type { AvatarProps } from "./avatar.props";
import { AVATAR_TOKENS, AVATAR_DEFAULTS } from "./avatar.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useAvatar(props: AvatarProps) {
  const {
    src,
    alt       = "",
    initials,
    size      = AVATAR_DEFAULTS.size,
    radius    = AVATAR_DEFAULTS.radius,
    status,
    class:    className,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    AVATAR_TOKENS,
    { size, radius, status },
    "avatar",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "avatar",
        src      && "avatar--image",
        initials && !src && "avatar--initials",
        !src && !initials && "avatar--icon",
        status   && "avatar--has-status",
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle],
    },
    base,
  );

  return {
    src,
    alt,
    initials: initials ? initials.slice(0, 2).toUpperCase() : undefined,
    status,
    props: {
      class: cls,
      style,
      "aria-label": alt || initials || undefined,
      ...attrs,
      ...rest,
    },
  };
}

!!!

---

## backdrop.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/backdrop.hook.ts`


!!!ts

!!!

---

## badge.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/badge.hook.ts`


!!!ts
// design/feedback/badge/badge.hook.ts

/**
 * @file Component hook for the Badge component.
 * @module design/feedback/badge
 *
 * {@link useBadge} translates {@link BadgeProps} into the props that
 * `Badge.astro` needs, including the computed display string for count badges.
 *
 * **Rendering mode resolution:**
 * !!!
 * dot=true            → mode "dot"   (empty circle, no content)
 * count !== undefined → mode "count" (number, possibly capped)
 * default             → mode "label" (renders default slot)
 * !!!
 *
 * **Count capping:**
 * `displayCount = count > max ? "${max}+" : String(count)`
 *
 * @see {@link useFeedback}    in `feedback/feedback.hook.ts`
 * @see {@link BadgeProps}     in `feedback/badge/badge.props.ts`
 * @see {@link BADGE_DEFAULTS} in `feedback/badge/badge.tokens.ts`
 */

import type { BadgeProps }  from "./badge.props";
import { BADGE_DEFAULTS }   from "./badge.tokens";
import { useFeedback }      from "../../feedback.hook";
import { composeClass }     from "~/shared/base.hook";

export type BadgeMode = "dot" | "count" | "label" | "icon";

/**
 * Resolves {@link BadgeProps} into the props `Badge.astro` spreads.
 *
 * @returns `{ Tag, props, mode, displayCount }`
 *
 * @example
 * !!!astro
 * const { Tag, props, mode, displayCount } = useBadge(Astro.props as BadgeProps);
 * !!!
 */
export function useBadge(props: BadgeProps) {
  const {
    count,
    max       = BADGE_DEFAULTS.max,
    dot       = BADGE_DEFAULTS.dot,
    icon,
    iconOnly  = false,
    ...feedbackProps
  } = props;

  // ── Rendering mode ──────────────────────────────────────────────────────
  const mode: BadgeMode =
    dot              ? "dot"
    : iconOnly       ? "icon"
    : count !== undefined ? "count"
    : "label";

  // ── Count display string ────────────────────────────────────────────────
  const displayCount: string | undefined =
    mode === "count"
      ? count! > max
        ? `${max}+`
        : String(count)
      : undefined;

  // ── useFeedback with badge-opinionated defaults ─────────────────────────
  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant: BADGE_DEFAULTS.variant,
    color:   BADGE_DEFAULTS.color,
    size:    BADGE_DEFAULTS.size,
    radius:  BADGE_DEFAULTS.radius,
    ...feedbackProps,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "badge",
        dot && "badge--dot",
        iconOnly && "badge--icon-only",
      ),
      style:               feedbackStyle,
      "aria-label":        mode === "dot" ? (feedbackProps["aria-label"] as string | undefined) : undefined,
      "aria-hidden":       mode === "dot" && !feedbackProps["aria-label"] ? "true" as const : undefined,
      ...feedbackAttrs,
      ...rest,
    },
    mode,
    displayCount,
  };
}

!!!

---

## banner.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/banner.hook.ts`


!!!ts
// design/feedback/components/banner/banner.hook.ts

import { useFeedback }     from "../../feedback.hook";
import { composeClass }    from "~sh/base.hook";
import { BANNER_DEFAULTS } from "./banner.tokens";
import type { BannerProps } from "./banner.props";

export function useBanner(props: BannerProps) {
  const {
    variant      = BANNER_DEFAULTS.variant,
    color        = BANNER_DEFAULTS.color,
    radius       = BANNER_DEFAULTS.radius,
    sticky       = false,
    dismissible  = false,
    dismissLabel = "Dismiss",
    "aria-label": ariaLabel = "Page notification",
    icon,
    ...feedbackProps
  } = props as BannerProps & { "aria-label"?: string };

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, ...feedbackProps });

  return {
    props: {
      class:        composeClass(feedbackClass, "banner", sticky && "banner--sticky", dismissible && "banner--dismissible"),
      style:        feedbackStyle || undefined,
      role:         "region" as const,
      "aria-label": ariaLabel,
      ...feedbackAttrs,
      ...rest,
    },
    dismissible,
    dismissLabel,
  };
}

!!!

---

## box.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/box.hook.ts`


!!!ts
// design/layout/box/box.hook.ts

import type { BoxProps } from "./box.props";
import { BOX_TOKENS, BOX_DEFAULTS } from "./box.tokens";
import { useLayout } from "~l/layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

/**
 * Hook: `useBox`
 * 
 * Prepares properties, classes, and styles for the Box component.
 * 
 * Box delegates all of its structural concerns (like padding, margin, flex, 
 * and gaps) to the `useLayout` hook. This maintains a clean spacing chain
 * where `BoxProps` -> `LayoutProps` -> `SpacingProps`.
 * 
 * It handles Box-specific visuals like `border-radius` on top of the layout base.
 * 
 * @param {BoxProps} props - The combined layout, spacing, and box properties.
 * @returns An object containing the dynamic `Tag` and the merged HTML `props`.
 */
export function useBox(props: BoxProps) {
  const {
    as: Tag = BOX_DEFAULTS.as,
    radius,
    ...layoutProps
  } = props;

  // Delegate structural dimensions and spacing (m, p, pt, gap, etc.) to the layout hook
  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);

  // Resolve box-specific visual tokens (like radius)
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    BOX_TOKENS,
    { radius },
    "box",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "box", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
!!!

---

## breadcrumbs.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/breadcrumbs.hook.ts`


!!!ts
import { useNav } from "../../nav.hook";
import type { BreadcrumbsProps } from "./breadcrumbs.props";

const BREADCRUMBS_DEFAULTS = {
  size: "md",
  variant: "ghost"
} as const;

export function useBreadcrumbs(props: BreadcrumbsProps) {
  const { 
    items, 
    separatorIcon,
    separatorText = "/",
    size = BREADCRUMBS_DEFAULTS.size,
    variant = BREADCRUMBS_DEFAULTS.variant,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps } = useNav({ size, variant, ...navProps });

  return {
    breadcrumbsProps: {
      "aria-label": "Breadcrumb",
      ...resolvedNavProps,
      class: ["breadcrumbs", resolvedNavProps.class].filter(Boolean).join(" ")
    },
    items,
    separatorIcon,
    separatorText
  };
}

!!!

---

## item/b-item.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/item/b-item.hook.ts`


!!!ts
import type { BreadcrumbItemProps } from "./b-item.props";

export function useBreadcrumbItem(props: BreadcrumbItemProps) {
  const { active, href, isLast, class: className, icon, ...rest } = props;

  // Use <a> if href is present, otherwise use <span> (typical for the active/current page)
  const Tag = href ? "a" : "span";

  return {
    Tag,
    isLast,
    itemProps: {
      href,
      "aria-current": active ? "page" : undefined,
      class: ["nav__item", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}

!!!

---

## button-group.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/button-group.hook.ts`


!!!ts

!!!

---

## button.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/button.hook.ts`


!!!ts
// design/triggers/button/button.hook.ts

import type { ButtonProps } from "./button.props";
import { BUTTON_DEFAULTS, resolveButtonSize } from "./button.tokens";
import { useTrigger } from "../../trigger.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

 
export function useButton(props: ButtonProps) {
  const {
    type      = BUTTON_DEFAULTS.type,
    href,
    target,
    rel,
    icon,
    iconOnly  = BUTTON_DEFAULTS.iconOnly,
    fullWidth = BUTTON_DEFAULTS.fullWidth,
    ...triggerProps
  } = props;
 
  const { Tag, triggerClass, triggerStyle, triggerAttrs, rest, size }
    = useTrigger({
      ...triggerProps,
      type,
      ...(href   !== undefined ? { href }   : {}),
      ...(target !== undefined ? { target } : {}),
      ...(rel    !== undefined ? { rel }    : {}),
    });
    
  const sizeStyle = resolveButtonSize(size);

  return {
    Tag,
    props: {
      class: composeClass(
        triggerClass,
        "button",
        `button--${size}`,
        iconOnly  && "button--icon-only",
        fullWidth && "button--full-width",
      ),
      style: composeStyle(
        triggerStyle,
        ...sizeStyle,
      ),
      ...triggerAttrs,
      ...rest,
    },
  };
}
 

!!!

---

## caption.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/caption.hook.ts`


!!!ts
/**
 * A hook that processes props for the Caption component and returns
 * attributes for rendering.
 *
 * @param props - The props for the Caption component.
 * @returns An object with the `Tag` to render, the `props` for the tag,
 *          and the resolved `label` and `credit` strings.
 */
import { useTypography } from "../../typography.hook";
import type { CaptionProps } from "./caption.props";
import { CAPTION_DEFAULTS } from "./caption.tokens";
import { composeClass } from "~/shared/base.hook";

export function useCaption(props: CaptionProps) {
  const {
    as = CAPTION_DEFAULTS.as,
    label,
    credit,
    overlay = CAPTION_DEFAULTS.overlay,
    rule = CAPTION_DEFAULTS.rule,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    ...typographyProps,
    // Pre-compose caption-specific classes before passing to useTypography
    class: composeClass(
      "caption",
      overlay && "caption--overlay",
      rule && "caption--rule",
      typographyProps.class,
    ),
  });

  return {
    Tag: as,
    props: typographyAttributes,
    label,
    credit,
  };
}
!!!

---

## card.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/card.hook.ts`


!!!ts
// design/surfaces/components/card/card.hook.ts

import type { CardProps }                    from "./card.props";
import { CARD_DEFAULTS }                     from "./card.tokens";
import { useSurface }                        from "../../surface.hook";
import { composeClass }                      from "~/shared/base.hook";

export function useCard(props: CardProps) {
  const {
    as: Tag      = CARD_DEFAULTS.as,
    layer        = CARD_DEFAULTS.layer,
    outlined     = CARD_DEFAULTS.outlined,
    href,
    target,
    rel,
    interactive  = CARD_DEFAULTS.interactive,
    selectable   = CARD_DEFAULTS.selectable,
    selected     = CARD_DEFAULTS.selected,
    disabled     = CARD_DEFAULTS.disabled,
    ...surfaceProps
  } = props;

  const isLink        = Boolean(href);
  const isToggle      = !isLink && selectable;
  const isInteractive = !isLink && (interactive || selectable);
  const isDisabled    = !isLink && disabled;

  const resolvedRel = isLink
    ? (rel ?? (target === "_blank" ? "noopener noreferrer" : undefined))
    : undefined;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    outlined,
    ...surfaceProps,
    disabled: isDisabled,
  });

  return {
    Tag: isLink ? "a" : Tag,
    props: {
      class: composeClass(
        surfaceClass,
        "card",
        isInteractive && "card--interactive",
        isToggle      && "card--selectable",
        isDisabled    && "card--disabled",
        selected      && "card--selected",
      ),
      style:           surfaceStyle,
      ...surfaceAttrs,
      ...rest,
      // link attrs
      href:            isLink ? href   : undefined,
      target:          isLink ? target : undefined,
      rel:             resolvedRel,
      // interaction attrs
      role:            isToggle      ? "button"        : undefined,
      tabindex:        isInteractive ? (isDisabled ? -1 : 0) : undefined,
      "aria-pressed":  isToggle      ? String(selected) : undefined,
      // data attr mirrors aria-pressed for clean CSS targeting
      "data-selected": isToggle      ? String(selected) : undefined,
    },
  };
}

!!!

---

## carousel.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/carousel.hook.ts`


!!!ts

!!!

---

## center.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/center.hook.ts`


!!!ts
import type { CenterProps } from "./center.props";
import { CENTER_TOKENS, CENTER_DEFAULTS } from "./center.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useCenter(props: CenterProps) {
  const {
    direction = CENTER_DEFAULTS.direction,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    CENTER_TOKENS,
    {},
    "center",
  );

  return {
    Tag: "div",
    props: {
      class: composeClass(layoutClass, "center", `center--${direction}`, ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

## checkbox.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/checkbox.hook.ts`


!!!ts
// design/forms/checkbox/checkbox.hook.ts

/**
 * @file Component hook for the Checkbox component.
 * @module design/forms/checkbox
 *
 * {@link useCheckbox} translates {@link CheckboxProps} — including the
 * three-state {@link CheckState} — into the native input attributes and
 * wrapper props that `Checkbox.astro` needs.
 *
 * **CheckState translation:**
 * !!!
 * "checked"       → checked attribute present, data-indeterminate absent
 * "unchecked"     → checked attribute absent,  data-indeterminate absent
 * "indeterminate" → checked attribute absent,  data-indeterminate present
 * undefined       → same as "unchecked"
 * !!!
 * The `data-indeterminate` attribute is read by the script in `Checkbox.astro`
 * which sets `.indeterminate = true` on the DOM node after render.
 *
 * @see {@link useForm}          in `forms/forms.hook.ts`
 * @see {@link CheckboxProps}    in `forms/checkbox/checkbox.props.ts`
 * @see {@link CHECKBOX_DEFAULTS} in `forms/checkbox/checkbox.tokens.ts`
 * @see `forms/checkbox/Checkbox.astro`
 */

import type { CheckboxProps } from "./checkbox.props";
import { CHECKBOX_DEFAULTS }  from "./checkbox.tokens";
import { useForm }            from "~/forms/forms.hook";
import { composeClass }       from "~/shared/base.hook";

/**
 * Resolves {@link CheckboxProps} into wrapper and input attribute objects.
 *
 * @param props - Full `CheckboxProps`.
 *
 * @returns `{ Tag: "label", props, inputAttrs }`
 *
 * @example
 * !!!astro
 * const { Tag, props, inputAttrs } = useCheckbox(Astro.props as CheckboxProps);
 * !!!
 */
export function useCheckbox(props: CheckboxProps) {
  const {
    id,
    name,
    value,
    checkState    = CHECKBOX_DEFAULTS.checkState,
    labelPosition = CHECKBOX_DEFAULTS.labelPosition,
    ...formProps
  } = props;

  // ── Derive native states from the union ──────────────────────────────────
  const isChecked       = checkState === "checked";
  const isIndeterminate = checkState === "indeterminate";
  // "unchecked" and undefined → neither flag is set

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        variant: "ghost",   // override category default for traditional look
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  return {
    Tag: "label" as const,
    props: {
      class: composeClass(formClass, "checkbox", `checkbox--${labelPosition}`),
      style: formStyle,
      ...formAttrs,
      ...rest,
    },
    inputAttrs: {
      type:                 "checkbox" as const,
      id,
      name,
      value,
      // Absent when false — HTML boolean attrs are truthy by presence
      checked:              isChecked       || undefined,
      // Presence of this attribute triggers the indeterminate script
      "data-indeterminate": isIndeterminate ? "" as const : undefined,
      disabled:             disabled  || undefined,
      required:             required  || undefined,
      "aria-required":      required  ? "true" as const : undefined,
      "aria-invalid":       invalid   ? "true" as const : undefined,
    },
  };
}
!!!

---

## chip.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/chip.hook.ts`


!!!ts
// design/feedback/components/chip/chip.hook.ts

import type { ChipProps } from "./chip.props";
import { CHIP_DEFAULTS } from "./chip.tokens";
import { useFeedback } from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useChip(props: ChipProps) {
  const {
    as: Tag = "button",
    variant = CHIP_DEFAULTS.variant,
    color   = CHIP_DEFAULTS.color,
    size    = CHIP_DEFAULTS.size,
    radius  = CHIP_DEFAULTS.radius,
    ...rest
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest: remaining } = useFeedback({
    variant,
    color,
    size,
    radius,
    ...rest,
  });

  return {
    Tag,
    props: {
      class: composeClass(
        feedbackClass,
        "chip",
      ),
      style: composeStyle(feedbackStyle),
      ...feedbackAttrs,
      ...remaining,
    },
  };
}

!!!

---

## code.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/code.hook.ts`


!!!ts
// design/typography/components/code/code.hook.ts
import type { CodeProps, PreProps } from "./code.props";
import { CODE_DEFAULTS, PRE_DEFAULTS } from "./code.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass }  from "~/shared/base.hook";

export function useCode(props: CodeProps) {
  const {
    as: Tag = "code",
    fam     = CODE_DEFAULTS.fam,
    block   = false,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    fam,
    ...typographyProps,
  });

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "code", block ? "code--block" : "code--inline"),
    },
  };
}

export function usePre(props: PreProps) {
  const {
    as: Tag = "pre",
    fam     = PRE_DEFAULTS.fam,
    size    = PRE_DEFAULTS.size,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    fam,
    size,
    ...typographyProps,
  });

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "pre"),
    },
  };
}

!!!

---

## color-picker.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/color-picker.hook.ts`


!!!ts

!!!

---

## columns.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/columns.hook.ts`


!!!ts

!!!

---

## combobox.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/combobox.hook.ts`


!!!ts
// design/forms/combobox/combobox.hook.ts

/**
 * @file Component hook for the Combobox component.
 * @module design/forms/combobox
 *
 * {@link useCombobox} prepares the three attribute objects and computed data
 * that `Combobox.astro` needs to render the full combobox structure:
 *
 * !!!
 * <div class="form combobox …" data-combobox>      ← wrapper
 *   <input type="text" role="combobox" … />         ← visible filter input
 *   <input type="hidden" name="…" value="…" />      ← form submission input
 *   <ul role="listbox" id="{listboxId}">             ← custom dropdown
 *     <li role="option" id="{listboxId}-{i}">…</li>
 *   </ul>
 * </div>
 * !!!
 *
 * **Two-input pattern:**
 * The text input handles display and filtering; the hidden input handles form
 * submission. Their values differ: text input shows the selected option's
 * `label`, hidden input holds the `value`. The JS controller keeps both in sync.
 *
 * **`listboxId` generation:**
 * If an `id` prop is provided, the listbox gets `id="{id}-listbox"` for a
 * stable, predictable ID. Without an `id` prop, a random suffix is generated
 * server-side via `crypto.randomUUID()`. This ensures the `aria-controls`
 * reference is always valid while avoiding a hard `id` requirement.
 *
 * **`displayValue`:**
 * The initial text shown in the filter input. On SSR, this is the matching
 * option's `label` when `value` is set, or an empty string. The JS controller
 * updates it as the user selects options.
 *
 * @see {@link useForm}          in `forms/forms.hook.ts`
 * @see {@link ComboboxProps}    in `forms/combobox/combobox.props.ts`
 * @see {@link COMBOBOX_DEFAULTS} in `forms/combobox/combobox.tokens.ts`
 * @see `forms/combobox/Combobox.astro` — renders the full structure
 */

import type { ComboboxProps } from "./combobox.props";
import { COMBOBOX_DEFAULTS }                  from "./combobox.tokens";
import { useForm }                            from "~f/forms.hook";
import { composeClass }                       from "~/shared/base.hook";

/**
 * Resolves {@link ComboboxProps} into the full set of attributes and data
 * needed by `Combobox.astro`.
 *
 * @param props - Full `ComboboxProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`.
 *
 * **`props`** — Wrapper `<div>` attributes (form classes, CSS channels, data attrs).
 *
 * **`inputAttrs`** — Visible text `<input>` attributes:
 * - `role="combobox"`, `aria-expanded="false"` (initial), `aria-autocomplete="list"`
 * - `aria-controls="{listboxId}"` — links input to the listbox
 * - `autocomplete="off"` — suppresses browser autocomplete
 *
 * **`hiddenAttrs`** — Hidden `<input type="hidden">` attributes:
 * - `name` — the form field name (goes here, not on the text input)
 * - `value` — the selected option's value (empty string when unselected)
 *
 * **`listboxAttrs`** — `<ul>` listbox attributes:
 * - `id="{listboxId}"`, `role="listbox"`, `hidden` (initial state)
 *
 * **`options`** — The raw options array for `Combobox.astro` to map over,
 * with `selected: boolean` and `id` string added per option.
 *
 * **`displayValue`** — Initial text for the filter input. The selected
 * option's `label` when `value` is set; `""` otherwise.
 *
 * **`listboxId`** — The generated listbox element ID. Exposed so
 * `Combobox.astro` can assign it to the `<ul>` directly.
 *
 * @example
 * !!!astro
 * ---
 * const { Tag, props, inputAttrs, hiddenAttrs, listboxAttrs, options, listboxId }
 *   = useCombobox(Astro.props as ComboboxProps);
 * ---
 * <Tag {...props}>
 *   <input class="combobox__control" {...inputAttrs} />
 *   <input {...hiddenAttrs} />
 *   <ul class="combobox__listbox" {...listboxAttrs}>
 *     {options.map(opt => (
 *       <li class="combobox__option" role="option"
 *           id={`${listboxId}-${opt.value}`}
 *           data-value={opt.value}
 *           aria-selected={opt.selected ? "true" : "false"}
 *           aria-disabled={opt.disabled ? "true" : undefined}>
 *         {opt.label}
 *       </li>
 *     ))}
 *   </ul>
 * </Tag>
 * !!!
 */
export function useCombobox(props: ComboboxProps) {
  const {
    id,
    name,
    value,
    options,
    placeholder,
    caseSensitive = false,
    ...formProps
  } = props;

  // ── Generate stable listbox ID ───────────────────────────────────────────
  //
  // Predictable when id is provided; random suffix when not.
  // crypto.randomUUID() is available in Node 15+ (Astro requires Node 18+).
  const listboxId = id
    ? `${id}-listbox`
    : `combobox-${crypto.randomUUID().slice(0, 8)}-listbox`;

  // ── Delegate to useForm ──────────────────────────────────────────────────
  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        fullWidth: COMBOBOX_DEFAULTS.fullWidth,
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  // ── Resolve initial display value ────────────────────────────────────────
  //
  // The text input shows the label of the selected option, not its value.
  const selectedOption = value
    ? options.find(o => o.value === value)
    : undefined;
  const displayValue = selectedOption?.label ?? "";

  // ── Resolve options with selection state ────────────────────────────────
  const resolvedOptions = options.map(opt => ({
    ...opt,
    selected: opt.value === value,
  }));

  // ── Wrapper attrs ────────────────────────────────────────────────────────
  const wrapperProps = {
    class: composeClass(formClass, "combobox"),
    style: formStyle,
    ...formAttrs,
    "data-combobox": "",
    ...(caseSensitive && { "data-case-sensitive": "" }),
    ...rest,
  };

  // ── Visible text input ───────────────────────────────────────────────────
  //
  // No `name` — the hidden input submits the value.
  // `autocomplete="off"` prevents browser history overlapping the listbox.
  const inputAttrs = {
    type:                    "text" as const,
    id,
    value:                   displayValue || undefined,
    placeholder:             placeholder  ?? undefined,
    role:                    "combobox"   as const,
    "aria-expanded":         "false"      as const,  // JS updates this on open/close
    "aria-autocomplete":     "list"       as const,
    "aria-controls":         listboxId,
    "aria-activedescendant": "",          // JS updates on keyboard navigation
    autoComplete:            "off",
    disabled:                disabled     || undefined,
    required:                required     || undefined,
    "aria-required":         required     ? "true" as const : undefined,
    "aria-invalid":          invalid      ? "true" as const : undefined,
  };

  // ── Hidden submission input ──────────────────────────────────────────────
  //
  // Carries the actual option `value` for form submission.
  // The text input is display-only and has no `name`.
  const hiddenAttrs = {
    type:  "hidden" as const,
    name,
    value: value ?? "",
  };

  // ── Listbox attrs ────────────────────────────────────────────────────────
  const listboxAttrs = {
    id:       listboxId,
    role:     "listbox" as const,
    hidden:   true,                      // JS removes `hidden` on open
  };

  return {
    Tag: "div" as const,
    props:           wrapperProps,
    inputAttrs,
    hiddenAttrs,
    listboxAttrs,
    options:         resolvedOptions,
    listboxId,       // also exposed for option id generation in Combobox.astro
    displayValue,
  };
}

!!!

---

## command-palette.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/command-palette.hook.ts`


!!!ts

!!!

---

## container.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/container.hook.ts`


!!!ts
import type { ContainerProps } from "./container.props";
import { CONTAINER_TOKENS, CONTAINER_DEFAULTS } from "./container.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useContainer(props: ContainerProps) {
  const {
    as: Tag = CONTAINER_DEFAULTS.as,
    maxWidth = CONTAINER_DEFAULTS.maxWidth,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    CONTAINER_TOKENS,
    { maxWidth },
    "container",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "container", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

## context-menu.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/context-menu.hook.ts`


!!!ts

!!!

---

## cropper.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/cropper.hook.ts`


!!!ts

!!!

---

## date-picker.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/date-picker/date-picker.hook.ts`


!!!ts

!!!

---

## dot.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/dot/dot.hook.ts`


!!!ts
// design/feedback/components/dot/dot.hook.ts
import type { DotProps } from "./dot.props";
import { DOT_DEFAULTS } from "./dot.tokens";
import { useFeedback } from "../../feedback.hook";
import { composeClass } from "~/shared/base.hook";

export function useDot(props: DotProps) {
  const {
    variant = DOT_DEFAULTS.variant,
    color   = DOT_DEFAULTS.color,
    size    = DOT_DEFAULTS.size,
    radius  = DOT_DEFAULTS.radius,
    ...restProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant,
    color,
    size,
    radius,
    ...restProps,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(feedbackClass, "dot"),
      style: feedbackStyle,
      "aria-hidden": "true" as const,
      ...feedbackAttrs,
      ...rest,
    },
  };
}

!!!

---

## drawer.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.hook.ts`


!!!ts
import type { DrawerProps } from "./drawer.props";
import { DRAWER_TOKENS, DRAWER_DEFAULTS } from "./drawer.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useDrawer(props: DrawerProps) {
  const {
    id,
    title,
    placement       = DRAWER_DEFAULTS.placement,
    size            = DRAWER_DEFAULTS.size,
    closeOnBackdrop = DRAWER_DEFAULTS.closeOnBackdrop,
    closeOnEsc      = DRAWER_DEFAULTS.closeOnEsc,
    class: className,
    ...base
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    DRAWER_TOKENS, { placement, size }, "drawer",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose({
    className: ["drawer", ...tokenClasses, className],
    style:     tokenStyle,
  }, base);

  const titleId = title ? `${id}-title` : undefined;

  return {
    dialogProps: {
      id,
      class:                 cls,
      style:                 style || undefined,
      ...attrs,
      ...rest,
      "aria-labelledby":     titleId,
      "data-close-backdrop": closeOnBackdrop ? "true" : "false",
      "data-close-esc":      closeOnEsc      ? "true" : "false",
    },
    title,
    titleId,
  };
}

!!!

---

## dropdown-menu.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.hook.ts`


!!!ts
import type { DropdownMenuProps } from "./dropdown-menu.props";
import { DROPDOWN_MENU_DEFAULTS } from "./dropdown-menu.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useDropdownMenu(props: DropdownMenuProps) {
  const {
    id,
    ...overlayProps 
  } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? DROPDOWN_MENU_DEFAULTS.size,
    variant: overlayProps.variant ?? DROPDOWN_MENU_DEFAULTS.variant,
    radius:  overlayProps.radius ?? DROPDOWN_MENU_DEFAULTS.radius,
    ...overlayProps
  });

  return {
    popoverProps: {
      id,
      popover: "auto",
      class:   composeClass(overlayClass, "dropdown-menu"),
      style:   overlayStyle,
      ...overlayAttrs,
      ...rest,
    }
  };
}

!!!

---

## empty-state.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/empty-state/empty-state.hook.ts`


!!!ts
import { useFeedback } from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";
import { EMPTY_STATE_DEFAULTS } from "./empty-state.tokens";
import type { EmptyStateProps } from "./empty-state.props";

export function useEmptyState(props: EmptyStateProps) {
  const {
    size = EMPTY_STATE_DEFAULTS.size,
    variant = EMPTY_STATE_DEFAULTS.variant,
    color = EMPTY_STATE_DEFAULTS.color,
    radius = EMPTY_STATE_DEFAULTS.radius,
    title,
    description,
    icon,
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    size, variant, color, radius, ...feedbackProps
  });

  return {
    props: {
      class: composeClass(feedbackClass, "empty-state"),
      style: composeStyle(feedbackStyle),
      ...feedbackAttrs,
      ...rest,
    },
    title,
    description,
  };
}

!!!

---

## feed.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/feed/feed.hook.ts`


!!!ts
import type { FeedProps } from "./feed.props";
import { FEED_TOKENS, FEED_DEFAULTS } from "./feed.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useFeed(props: FeedProps) {
  const {
    data,
    orientation = FEED_DEFAULTS.orientation,
    grouped,
    ...dataProps
  } = props;

  const { dataClass, dataStyle, dataAttrs, caption, rest } = useData(dataProps);

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FEED_TOKENS,
    { orientation },
    "feed"
  );

  const cls = composeClass(
    dataClass,
    "feed",
    ...tokenClasses,
    grouped && "feed--grouped"
  );
  
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag: "ul" as const,
    data,
    caption,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}

!!!

---

## field.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/field/field.hook.ts`


!!!ts
// design/forms/field/field.hook.ts

/**
 * @file Component hook for the Field component.
 * @module design/forms/field
 *
 * {@link useField} is intentionally minimal. Field is a structural wrapper
 * with no token resolution — it has no dimensions to resolve, no CSS channels
 * to write, and no color system to wire. Its hook applies state modifier
 * classes and data attributes, then returns the wrapper props and the `id`
 * for the Astro template to use when generating hint/error element IDs.
 *
 * @remarks
 * **Why this hook exists at all:**
 * Even for a trivial component, the hook provides a consistent interface for
 * the Astro template and keeps the class/attribute logic out of the template.
 * It also handles `testId` → `data-testid` via {@link useBaseCompose}.
 *
 * **`id` in the return value:**
 * `id` is returned separately (alongside `{ Tag, props }`) so `Field.astro`
 * can generate `id="{id}-hint"`, `id="{id}-error"`, `id="{id}-success"` on
 * its own rendered slot wrappers. The `id` is NOT in `props` — it does not
 * go on the outer `<div>` wrapper, since the IDs that matter are on the
 * inner elements, and putting the bare `id` on the wrapper could cause
 * `<label for="email">` to associate with the Field div rather than the
 * control inside it.
 *
 * @see {@link FieldProps} in `forms/field/field.props.ts` — input type
 * @see `forms/field/Field.astro`                           — consumes this hook
 * @see `forms/field/field.css`                             — reads field modifier classes
 */

import type { FieldProps } from "./field.props";
import { useBaseCompose }  from "~/shared/base.hook";

/**
 * Resolves {@link FieldProps} into wrapper props for the Field container.
 *
 * @param props - Full `FieldProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`. Field is a generic structural container.
 *
 * **`id`** — The raw `id` prop value (or `undefined`). Used by `Field.astro`
 * to generate `id="{id}-hint"`, `id="{id}-error"`, `id="{id}-success"` on
 * slot wrapper elements. NOT spread onto the outer wrapper div.
 *
 * **`props`** — Attributes for the outer `<div>` wrapper:
 * - `class` — `"field"` plus state modifiers (`field--invalid`, `field--required`)
 * - `data-invalid`  — present when `invalid={true}` (CSS hook)
 * - `data-required` — present when `required={true}` (CSS hook)
 * - `data-testid`   — from `testId` prop via {@link useBaseCompose}
 *
 * @example
 * !!!astro
 * ---
 * // Field.astro
 * const { Tag, id, props } = useField(Astro.props as FieldProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("label") && <div class="field__label"><slot name="label" /></div>}
 *   <div class="field__control"><slot /></div>
 *   {Astro.slots.has("hint") && (
 *     <p class="field__hint" id={id ? `${id}-hint` : undefined}>
 *       <slot name="hint" />
 *     </p>
 *   )}
 * </Tag>
 * !!!
 */
export function useField(props: FieldProps) {
  const {
    id,
    invalid  = false,
    required = false,
    icon,
    class: className,
    ...rest
  } = props;

  // ── Data attributes for CSS state rules ──────────────────────────────────
  const stateAttrs: Record<string, string> = {};
  if (invalid)  stateAttrs["data-invalid"]  = "";
  if (required) stateAttrs["data-required"] = "";

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "field",
        invalid  && "field--invalid",
        required && "field--required",
        className,
      ],
      style: [],
    },
    props,
  );

  return {
    Tag: "div" as const,
    // id is returned separately — it goes on hint/error elements, not the wrapper
    id,
    icon,
    props: {
      class: cls,
      style: style || undefined,
      ...attrs,
      ...stateAttrs,
      ...rest,
    },
  };
}
!!!

---

## file-preview.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/file-preview/file-preview.hook.ts`


!!!ts
// design/assets/components/file-preview/file-preview.hook.ts

import type { FilePreviewProps } from "./file-preview.props";
import { FILE_PREVIEW_TOKENS, FILE_PREVIEW_DEFAULTS, FILE_TYPE_MAP } from "./file-preview.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

function getExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : "";
}

export function useFilePreview(props: FilePreviewProps) {
  const {
    name,
    src,
    fileSize,
    layout    = FILE_PREVIEW_DEFAULTS.layout,
    size      = FILE_PREVIEW_DEFAULTS.size,
    radius    = FILE_PREVIEW_DEFAULTS.radius,
    removable = false,
    onRemove,
    class:    className,
    ...base } = props;

  const ext     = getExtension(name);
  const typeInfo = FILE_TYPE_MAP[ext];

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FILE_PREVIEW_TOKENS,
    { size, radius, layout },
    "file-preview",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "file-preview",
        typeInfo?.color,
        removable && "file-preview--removable",
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle],
    },
    base,
  );

  return {
    name,
    src,
    ext,
    label:    (typeInfo?.label ?? ext.toUpperCase()) || "FILE",
    fileSize,
    removable,
    onRemove,
    props: {
      class: cls,
      style,
      ...attrs,
      ...rest,
    },
  };
}

!!!

---

## file-upload.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/file-upload/file-upload.hook.ts`


!!!ts

!!!

---

## flex.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/flex.hook.ts`


!!!ts
import type { FlexProps } from "./flex.props";
import { FLEX_TOKENS, FLEX_DEFAULTS } from "./flex.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useFlex(props: FlexProps) {
  const {
    as: Tag = FLEX_DEFAULTS.as,
    direction = FLEX_DEFAULTS.direction,
    wrap = FLEX_DEFAULTS.wrap,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FLEX_TOKENS,
    { direction, wrap },
    "flex",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "flex", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

## footer.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/footer/footer.hook.ts`


!!!ts
// design/layout/components/footer/footer.hook.ts

/**
 * useFooter
 *
 * Prepares the resolved Tag, class list, and inline styles for the Footer
 * component. Mirrors the `useHeader` pattern exactly — delegate to `useLayout`,
 * then layer the footer-specific class on top.
 *
 * Responsibility split:
 *   useLayout  — resolves spacing (px/py/p/m/…), gap, align, justify into
 *                CSS channels and the `layout` base class.
 *   useFooter  — applies FOOTER_DEFAULTS when props are omitted and appends
 *                the `footer` class.
 *
 * The footer tag is always the semantic `<footer>` element. There is no `as`
 * prop — the semantic role is the point of using this component over Box.
 *
 * Default prop merging strategy:
 *   Destructuring defaults ensure user-supplied values always win. Omitting a
 *   prop triggers the FOOTER_DEFAULTS value; passing it explicitly overrides.
 */

import type { FooterProps } from "./footer.props";
import { FOOTER_DEFAULTS } from "./footer.tokens";
import { useLayout } from "~l/layout.hook";
import { composeClass, composeStyle } from "~sh/base.hook";

/**
 * Resolves `FooterProps` into a `{ Tag, props }` object ready for spread onto
 * the root element in Footer.astro.
 *
 * @param props - All props passed to the `<Footer>` component.
 * @returns `Tag` — always `"footer"`.
 * @returns `props` — merged class, style, data attributes, and any unknown
 *          pass-through props forwarded from the consumer.
 *
 * @example Minimal — all defaults apply:
 *   useFooter({})
 *   // class: "layout footer"
 *   // style: "--layout--px: var(--space-in--lg); --layout--align: center; --layout--justify: space-between"
 *
 * @example Custom py and column layout:
 *   useFooter({ py: "xl", align: "start", justify: "start" })
 *   // class: "layout footer"
 *   // style: "--layout--px: var(--space-in--lg); --layout--py: var(--space-in--xl); …"
 */
export function useFooter(props: FooterProps) {
  const {
    px      = FOOTER_DEFAULTS.px,
    align   = FOOTER_DEFAULTS.align,
    justify = FOOTER_DEFAULTS.justify,
    ...rest
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest: remaining } = useLayout({
    px,
    align,
    justify,
    ...rest,
  });

  return {
    Tag: "footer" as const,
    props: {
      class: composeClass(layoutClass, "footer"),
      style: composeStyle(layoutStyle),
      ...layoutAttrs,
      ...remaining,
    },
  };
}

!!!

---

## frame.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.hook.ts`


!!!ts
// design/surfaces/components/frame/frame.hook.ts
import type { FrameProps }      from "./frame.props";
import { FRAME_DEFAULTS }       from "./frame.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass,
         composeStyle }         from "~/shared/base.hook";

export function useFrame(props: FrameProps) {
  const {
    as: Tag = "div",
    ratio,
    clip    = true,
    layer   = FRAME_DEFAULTS.layer,
    padding = FRAME_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
  });

  const ratioStyle = ratio ? `--frame--ratio: ${ratio}` : null;

  return {
    Tag,
    props: {
      class: composeClass(surfaceClass, "frame", clip && "frame--clipped"),
      style: composeStyle(surfaceStyle, ratioStyle),
      ...surfaceAttrs,
      ...rest,
    },
  };
}

!!!

---

## gallery-item.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery-item/gallery-item.hook.ts`


!!!ts

!!!

---

## gallery.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery/gallery.hook.ts`


!!!ts

!!!

---

## grid.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/grid.hook.ts`


!!!ts
import type { GridProps } from "./grid.props";
import { GRID_TOKENS, GRID_DEFAULTS } from "./grid.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useGrid(props: GridProps) {
  const {
    as: Tag = GRID_DEFAULTS.as,
    fit,
    columns,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    GRID_TOKENS,
    { fit, columns: fit? undefined : columns },
    "grid",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "grid", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

## header.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/header/header.hook.ts`


!!!ts
// design/layout/components/header/header.hook.ts

/**
 * useHeader
 *
 * Prepares the resolved Tag, class list, and inline styles for the Header
 * component. Follows the same hook contract as every other layout component:
 * delegate structural concerns to `useLayout`, then layer component-specific
 * concerns on top.
 *
 * Responsibility split:
 *   useLayout  — resolves spacing (px/py/p/m/…), gap, align, justify into
 *                CSS channels and the `layout` base class.
 *   useHeader  — applies HEADER_DEFAULTS when props are omitted, appends
 *                the `header` class, and conditionally adds `header--sticky`.
 *
 * The header tag is always the semantic `<header>` element. Unlike Box, there
 * is no `as` prop because the semantic role is the entire point of this component.
 *
 * Default prop merging strategy:
 *   Props are destructured with default values, so user-supplied values always
 *   win. Explicitly passing `px={undefined}` does NOT reset to the default
 *   (TypeScript prevents it for typed props); omitting the prop entirely triggers
 *   the default.
 */

import type { HeaderProps } from "./header.props";
import { HEADER_DEFAULTS } from "./header.tokens";
import { useLayout } from "~l/layout.hook";
import { composeClass, composeStyle } from "~sh/base.hook";

/**
 * Resolves `HeaderProps` into a `{ Tag, props }` object ready for spread onto
 * the root element in Header.astro.
 *
 * @param props - All props passed to the `<Header>` component.
 * @returns `Tag` — always `"header"`.
 * @returns `props` — merged class, style, data attributes, and any unknown
 *          pass-through props forwarded from the consumer.
 *
 * @example Minimal — all defaults apply:
 *   useHeader({})
 *   // class: "layout header"
 *   // style: "--layout--px: var(--space-in--lg); --layout--align: center; --layout--justify: space-between"
 *
 * @example Sticky + custom padding override:
 *   useHeader({ sticky: true, px: "xl" })
 *   // class: "layout header header--sticky"
 *   // style: "--layout--px: var(--space-in--xl); …"
 */
export function useHeader(props: HeaderProps) {
  const {
    sticky = false,
    // Apply opinionated defaults; user value takes priority via destructuring default
    px      = HEADER_DEFAULTS.px,
    align   = HEADER_DEFAULTS.align,
    justify = HEADER_DEFAULTS.justify,
    ...rest
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest: remaining } = useLayout({
    px,
    align,
    justify,
    ...rest,
  });

  return {
    Tag: "header" as const,
    props: {
      class: composeClass(
        layoutClass,
        "header",
        sticky && "header--sticky",
      ),
      style: composeStyle(layoutStyle),
      ...layoutAttrs,
      ...remaining,
    },
  };
}

!!!

---

## heading.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/heading/heading.hook.ts`


!!!ts
// design/typography/heading/heading.hook.ts

import type { HeadingProps } from "./heading.props";
import { HEADING_DEFAULTS } from "./heading.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

/**
 * Heading-specific wrapper around `useTypography`.
 *
 * Handles only what's unique to headings — semantic `level` and the `h`/
 * `h--{level}` class modifiers — then delegates all token resolution
 * (size, weight, color, etc.) to `useTypography`. This keeps a single
 * implementation of `resolveTokens` + `useBaseCompose` across the whole
 * typography family instead of duplicating it per component.
 *
 * `HeadingProps.weight` is narrowed to `HeadingWeight` at the type level
 * (via interface extension in heading.props.ts), so any `weight` reaching
 * this function — and passed through to `useTypography` — is already
 * guaranteed valid for headings. No runtime re-validation or separate
 * token spec is needed here.
 *
 * @param props - Heading props: `level` plus the inherited (and
 *                narrowed) typography token props.
 *
 * @returns Tag   - The semantic element tag, `"h1"`–`"h6"`, derived from `level`.
 * @returns props - `class`, `style`, and forwarded attrs ready to spread
 *                  onto the rendered heading element.
 *
 * @example
 *   const { Tag, props } = useHeading({ level: 1, weight: "bold" });
 *   <Tag {...props}>Page Title</Tag>
 */
export function useHeading(props: HeadingProps) {
  const {
    level = HEADING_DEFAULTS.level,
    icon,
    class: className,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    ...typographyProps,
    class: composeClass("h", `h--${level}`, className),
  });

  return {
    Tag:   `h${level}` as const,
    props: typographyAttributes,
  };
}


!!!

---

## alert-dialog.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.hook.ts`


!!!ts
import type { AlertDialogProps } from "./alert-dialog.props";
import { ALERT_DIALOG_DEFAULTS } from "./alert-dialog.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useAlertDialog(props: AlertDialogProps) {
  const {
    id,
    title,
    description,
    closeOnEsc = ALERT_DIALOG_DEFAULTS.closeOnEsc,
    icon,
    ...overlayProps } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? ALERT_DIALOG_DEFAULTS.size,
    variant: overlayProps.variant ?? ALERT_DIALOG_DEFAULTS.variant,
    ...overlayProps
  });

  return {
    dialogProps: {
      id,
      class:               composeClass(overlayClass, "alert-dialog"),
      style:               overlayStyle,
      ...overlayAttrs,
      ...rest,
      role:                "alertdialog" as const,
      "aria-modal":        "true" as const,
      "aria-labelledby":   `${id}-title`,
      "aria-describedby":  description ? `${id}-desc` : undefined,
      "data-close-esc":    closeOnEsc ? "true" : "false",
    },
    title,
    titleId:       `${id}-title`,
    description,
    descriptionId: description ? `${id}-desc` : undefined,
  };
}

!!!

---

---

## alert.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/alert.hook.ts`


!!!ts
// design/feedback/components/alert/alert.hook.ts

import { useFeedback }                    from "../../feedback.hook";
import { composeClass, composeStyle }     from "~sh/base.hook";
import { ALERT_DEFAULTS, ALERT_SIZE_MAP } from "./alert.tokens";
import type { AlertSize }                 from "./alert.tokens";
import type { AlertProps }                from "./alert.props";

export function useAlert(props: AlertProps) {
  const {
    size         = ALERT_DEFAULTS.size,
    variant      = ALERT_DEFAULTS.variant,
    color        = ALERT_DEFAULTS.color,
    radius       = ALERT_DEFAULTS.radius,
    dismissible  = false,
    dismissLabel = "Dismiss",
    icon,
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, size: size as AlertSize, ...feedbackProps });

  const sizeMap = ALERT_SIZE_MAP[size as AlertSize];

  const alertStyle = [
    `--alert--font-size: ${sizeMap.fontSize}`,
    `--alert--padding: ${sizeMap.p}`,
    `--alert--gap: ${sizeMap.gap}`,
  ];

  return {
    props: {
      class: composeClass(feedbackClass, "alert", dismissible && "alert--dismissible"),
      style: composeStyle(feedbackStyle, ...alertStyle) || undefined,
      role:  color === "danger" || color === "warning" ? ("alert" as const) : ("status" as const),
      ...feedbackAttrs,
      ...rest,
    },
    dismissible,
    dismissLabel,
  };
}

!!!

---

---

## audio.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.hook.ts`


!!!ts
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

!!!

---

---

## avatar-group.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/avatar-group.hook.ts`


!!!ts

!!!

---

---

## avatar.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/avatar.hook.ts`


!!!ts
// design/assets/components/avatar/avatar.hook.ts

import type { AvatarProps } from "./avatar.props";
import { AVATAR_TOKENS, AVATAR_DEFAULTS } from "./avatar.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useAvatar(props: AvatarProps) {
  const {
    src,
    alt       = "",
    initials,
    size      = AVATAR_DEFAULTS.size,
    radius    = AVATAR_DEFAULTS.radius,
    status,
    class:    className,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    AVATAR_TOKENS,
    { size, radius, status },
    "avatar",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "avatar",
        src      && "avatar--image",
        initials && !src && "avatar--initials",
        !src && !initials && "avatar--icon",
        status   && "avatar--has-status",
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle],
    },
    base,
  );

  return {
    src,
    alt,
    initials: initials ? initials.slice(0, 2).toUpperCase() : undefined,
    status,
    props: {
      class: cls,
      style,
      "aria-label": alt || initials || undefined,
      ...attrs,
      ...rest,
    },
  };
}

!!!

---

---

## backdrop.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/backdrop.hook.ts`


!!!ts

!!!

---

---

## badge.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/badge.hook.ts`


!!!ts
// design/feedback/badge/badge.hook.ts

/**
 * @file Component hook for the Badge component.
 * @module design/feedback/badge
 *
 * {@link useBadge} translates {@link BadgeProps} into the props that
 * `Badge.astro` needs, including the computed display string for count badges.
 *
 * **Rendering mode resolution:**
 * !!!
 * dot=true            → mode "dot"   (empty circle, no content)
 * count !== undefined → mode "count" (number, possibly capped)
 * default             → mode "label" (renders default slot)
 * !!!
 *
 * **Count capping:**
 * `displayCount = count > max ? "${max}+" : String(count)`
 *
 * @see {@link useFeedback}    in `feedback/feedback.hook.ts`
 * @see {@link BadgeProps}     in `feedback/badge/badge.props.ts`
 * @see {@link BADGE_DEFAULTS} in `feedback/badge/badge.tokens.ts`
 */

import type { BadgeProps }  from "./badge.props";
import { BADGE_DEFAULTS }   from "./badge.tokens";
import { useFeedback }      from "../../feedback.hook";
import { composeClass }     from "~/shared/base.hook";

export type BadgeMode = "dot" | "count" | "label" | "icon";

/**
 * Resolves {@link BadgeProps} into the props `Badge.astro` spreads.
 *
 * @returns `{ Tag, props, mode, displayCount }`
 *
 * @example
 * !!!astro
 * const { Tag, props, mode, displayCount } = useBadge(Astro.props as BadgeProps);
 * !!!
 */
export function useBadge(props: BadgeProps) {
  const {
    count,
    max       = BADGE_DEFAULTS.max,
    dot       = BADGE_DEFAULTS.dot,
    icon,
    iconOnly  = false,
    ...feedbackProps
  } = props;

  // ── Rendering mode ──────────────────────────────────────────────────────
  const mode: BadgeMode =
    dot              ? "dot"
    : iconOnly       ? "icon"
    : count !== undefined ? "count"
    : "label";

  // ── Count display string ────────────────────────────────────────────────
  const displayCount: string | undefined =
    mode === "count"
      ? count! > max
        ? `${max}+`
        : String(count)
      : undefined;

  // ── useFeedback with badge-opinionated defaults ─────────────────────────
  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant: BADGE_DEFAULTS.variant,
    color:   BADGE_DEFAULTS.color,
    size:    BADGE_DEFAULTS.size,
    radius:  BADGE_DEFAULTS.radius,
    ...feedbackProps,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "badge",
        dot && "badge--dot",
        iconOnly && "badge--icon-only",
      ),
      style:               feedbackStyle,
      "aria-label":        mode === "dot" ? (feedbackProps["aria-label"] as string | undefined) : undefined,
      "aria-hidden":       mode === "dot" && !feedbackProps["aria-label"] ? "true" as const : undefined,
      ...feedbackAttrs,
      ...rest,
    },
    mode,
    displayCount,
  };
}

!!!

---

---

## banner.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/banner.hook.ts`


!!!ts
// design/feedback/components/banner/banner.hook.ts

import { useFeedback }     from "../../feedback.hook";
import { composeClass }    from "~sh/base.hook";
import { BANNER_DEFAULTS } from "./banner.tokens";
import type { BannerProps } from "./banner.props";

export function useBanner(props: BannerProps) {
  const {
    variant      = BANNER_DEFAULTS.variant,
    color        = BANNER_DEFAULTS.color,
    radius       = BANNER_DEFAULTS.radius,
    sticky       = false,
    dismissible  = false,
    dismissLabel = "Dismiss",
    "aria-label": ariaLabel = "Page notification",
    icon,
    ...feedbackProps
  } = props as BannerProps & { "aria-label"?: string };

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, ...feedbackProps });

  return {
    props: {
      class:        composeClass(feedbackClass, "banner", sticky && "banner--sticky", dismissible && "banner--dismissible"),
      style:        feedbackStyle || undefined,
      role:         "region" as const,
      "aria-label": ariaLabel,
      ...feedbackAttrs,
      ...rest,
    },
    dismissible,
    dismissLabel,
  };
}

!!!

---

---

## box.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/box.hook.ts`


!!!ts
// design/layout/box/box.hook.ts

import type { BoxProps } from "./box.props";
import { BOX_TOKENS, BOX_DEFAULTS } from "./box.tokens";
import { useLayout } from "~l/layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

/**
 * Hook: `useBox`
 * 
 * Prepares properties, classes, and styles for the Box component.
 * 
 * Box delegates all of its structural concerns (like padding, margin, flex, 
 * and gaps) to the `useLayout` hook. This maintains a clean spacing chain
 * where `BoxProps` -> `LayoutProps` -> `SpacingProps`.
 * 
 * It handles Box-specific visuals like `border-radius` on top of the layout base.
 * 
 * @param {BoxProps} props - The combined layout, spacing, and box properties.
 * @returns An object containing the dynamic `Tag` and the merged HTML `props`.
 */
export function useBox(props: BoxProps) {
  const {
    as: Tag = BOX_DEFAULTS.as,
    radius,
    ...layoutProps
  } = props;

  // Delegate structural dimensions and spacing (m, p, pt, gap, etc.) to the layout hook
  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);

  // Resolve box-specific visual tokens (like radius)
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    BOX_TOKENS,
    { radius },
    "box",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "box", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}
!!!

---

---

## breadcrumbs.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/breadcrumbs.hook.ts`


!!!ts
import { useNav } from "../../nav.hook";
import type { BreadcrumbsProps } from "./breadcrumbs.props";

const BREADCRUMBS_DEFAULTS = {
  size: "md",
  variant: "ghost"
} as const;

export function useBreadcrumbs(props: BreadcrumbsProps) {
  const { 
    items, 
    separatorIcon,
    separatorText = "/",
    size = BREADCRUMBS_DEFAULTS.size,
    variant = BREADCRUMBS_DEFAULTS.variant,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps } = useNav({ size, variant, ...navProps });

  return {
    breadcrumbsProps: {
      "aria-label": "Breadcrumb",
      ...resolvedNavProps,
      class: ["breadcrumbs", resolvedNavProps.class].filter(Boolean).join(" ")
    },
    items,
    separatorIcon,
    separatorText
  };
}

!!!

---

---

## item/b-item.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/item/b-item.hook.ts`


!!!ts
import type { BreadcrumbItemProps } from "./b-item.props";

export function useBreadcrumbItem(props: BreadcrumbItemProps) {
  const { active, href, isLast, class: className, icon, ...rest } = props;

  // Use <a> if href is present, otherwise use <span> (typical for the active/current page)
  const Tag = href ? "a" : "span";

  return {
    Tag,
    isLast,
    itemProps: {
      href,
      "aria-current": active ? "page" : undefined,
      class: ["nav__item", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}

!!!

---

---

## button-group.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/button-group.hook.ts`


!!!ts

!!!

---

---

## button.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/button.hook.ts`


!!!ts
// design/triggers/button/button.hook.ts

import type { ButtonProps } from "./button.props";
import { BUTTON_DEFAULTS, resolveButtonSize } from "./button.tokens";
import { useTrigger } from "../../trigger.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

 
export function useButton(props: ButtonProps) {
  const {
    type      = BUTTON_DEFAULTS.type,
    href,
    target,
    rel,
    icon,
    iconOnly  = BUTTON_DEFAULTS.iconOnly,
    fullWidth = BUTTON_DEFAULTS.fullWidth,
    ...triggerProps
  } = props;
 
  const { Tag, triggerClass, triggerStyle, triggerAttrs, rest, size }
    = useTrigger({
      ...triggerProps,
      type,
      ...(href   !== undefined ? { href }   : {}),
      ...(target !== undefined ? { target } : {}),
      ...(rel    !== undefined ? { rel }    : {}),
    });
    
  const sizeStyle = resolveButtonSize(size);

  return {
    Tag,
    props: {
      class: composeClass(
        triggerClass,
        "button",
        `button--${size}`,
        iconOnly  && "button--icon-only",
        fullWidth && "button--full-width",
      ),
      style: composeStyle(
        triggerStyle,
        ...sizeStyle,
      ),
      ...triggerAttrs,
      ...rest,
    },
  };
}
 

!!!

---

---

## caption.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/caption.hook.ts`


!!!ts
/**
 * A hook that processes props for the Caption component and returns
 * attributes for rendering.
 *
 * @param props - The props for the Caption component.
 * @returns An object with the `Tag` to render, the `props` for the tag,
 *          and the resolved `label` and `credit` strings.
 */
import { useTypography } from "../../typography.hook";
import type { CaptionProps } from "./caption.props";
import { CAPTION_DEFAULTS } from "./caption.tokens";
import { composeClass } from "~/shared/base.hook";

export function useCaption(props: CaptionProps) {
  const {
    as = CAPTION_DEFAULTS.as,
    label,
    credit,
    overlay = CAPTION_DEFAULTS.overlay,
    rule = CAPTION_DEFAULTS.rule,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    ...typographyProps,
    // Pre-compose caption-specific classes before passing to useTypography
    class: composeClass(
      "caption",
      overlay && "caption--overlay",
      rule && "caption--rule",
      typographyProps.class,
    ),
  });

  return {
    Tag: as,
    props: typographyAttributes,
    label,
    credit,
  };
}
!!!

---

---

## card.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/card.hook.ts`


!!!ts
// design/surfaces/components/card/card.hook.ts

import type { CardProps }                    from "./card.props";
import { CARD_DEFAULTS }                     from "./card.tokens";
import { useSurface }                        from "../../surface.hook";
import { composeClass }                      from "~/shared/base.hook";

export function useCard(props: CardProps) {
  const {
    as: Tag      = CARD_DEFAULTS.as,
    layer        = CARD_DEFAULTS.layer,
    outlined     = CARD_DEFAULTS.outlined,
    href,
    target,
    rel,
    interactive  = CARD_DEFAULTS.interactive,
    selectable   = CARD_DEFAULTS.selectable,
    selected     = CARD_DEFAULTS.selected,
    disabled     = CARD_DEFAULTS.disabled,
    ...surfaceProps
  } = props;

  const isLink        = Boolean(href);
  const isToggle      = !isLink && selectable;
  const isInteractive = !isLink && (interactive || selectable);
  const isDisabled    = !isLink && disabled;

  const resolvedRel = isLink
    ? (rel ?? (target === "_blank" ? "noopener noreferrer" : undefined))
    : undefined;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    outlined,
    ...surfaceProps,
    disabled: isDisabled,
  });

  return {
    Tag: isLink ? "a" : Tag,
    props: {
      class: composeClass(
        surfaceClass,
        "card",
        isInteractive && "card--interactive",
        isToggle      && "card--selectable",
        isDisabled    && "card--disabled",
        selected      && "card--selected",
      ),
      style:           surfaceStyle,
      ...surfaceAttrs,
      ...rest,
      // link attrs
      href:            isLink ? href   : undefined,
      target:          isLink ? target : undefined,
      rel:             resolvedRel,
      // interaction attrs
      role:            isToggle      ? "button"        : undefined,
      tabindex:        isInteractive ? (isDisabled ? -1 : 0) : undefined,
      "aria-pressed":  isToggle      ? String(selected) : undefined,
      // data attr mirrors aria-pressed for clean CSS targeting
      "data-selected": isToggle      ? String(selected) : undefined,
    },
  };
}

!!!

---

---

## carousel.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/carousel.hook.ts`


!!!ts

!!!

---

---

## center.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/center.hook.ts`


!!!ts
import type { CenterProps } from "./center.props";
import { CENTER_TOKENS, CENTER_DEFAULTS } from "./center.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useCenter(props: CenterProps) {
  const {
    direction = CENTER_DEFAULTS.direction,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    CENTER_TOKENS,
    {},
    "center",
  );

  return {
    Tag: "div",
    props: {
      class: composeClass(layoutClass, "center", `center--${direction}`, ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

---

## checkbox.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/checkbox.hook.ts`


!!!ts
// design/forms/checkbox/checkbox.hook.ts

/**
 * @file Component hook for the Checkbox component.
 * @module design/forms/checkbox
 *
 * {@link useCheckbox} translates {@link CheckboxProps} — including the
 * three-state {@link CheckState} — into the native input attributes and
 * wrapper props that `Checkbox.astro` needs.
 *
 * **CheckState translation:**
 * !!!
 * "checked"       → checked attribute present, data-indeterminate absent
 * "unchecked"     → checked attribute absent,  data-indeterminate absent
 * "indeterminate" → checked attribute absent,  data-indeterminate present
 * undefined       → same as "unchecked"
 * !!!
 * The `data-indeterminate` attribute is read by the script in `Checkbox.astro`
 * which sets `.indeterminate = true` on the DOM node after render.
 *
 * @see {@link useForm}          in `forms/forms.hook.ts`
 * @see {@link CheckboxProps}    in `forms/checkbox/checkbox.props.ts`
 * @see {@link CHECKBOX_DEFAULTS} in `forms/checkbox/checkbox.tokens.ts`
 * @see `forms/checkbox/Checkbox.astro`
 */

import type { CheckboxProps } from "./checkbox.props";
import { CHECKBOX_DEFAULTS }  from "./checkbox.tokens";
import { useForm }            from "~/forms/forms.hook";
import { composeClass }       from "~/shared/base.hook";

/**
 * Resolves {@link CheckboxProps} into wrapper and input attribute objects.
 *
 * @param props - Full `CheckboxProps`.
 *
 * @returns `{ Tag: "label", props, inputAttrs }`
 *
 * @example
 * !!!astro
 * const { Tag, props, inputAttrs } = useCheckbox(Astro.props as CheckboxProps);
 * !!!
 */
export function useCheckbox(props: CheckboxProps) {
  const {
    id,
    name,
    value,
    checkState    = CHECKBOX_DEFAULTS.checkState,
    labelPosition = CHECKBOX_DEFAULTS.labelPosition,
    ...formProps
  } = props;

  // ── Derive native states from the union ──────────────────────────────────
  const isChecked       = checkState === "checked";
  const isIndeterminate = checkState === "indeterminate";
  // "unchecked" and undefined → neither flag is set

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        variant: "ghost",   // override category default for traditional look
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  return {
    Tag: "label" as const,
    props: {
      class: composeClass(formClass, "checkbox", `checkbox--${labelPosition}`),
      style: formStyle,
      ...formAttrs,
      ...rest,
    },
    inputAttrs: {
      type:                 "checkbox" as const,
      id,
      name,
      value,
      // Absent when false — HTML boolean attrs are truthy by presence
      checked:              isChecked       || undefined,
      // Presence of this attribute triggers the indeterminate script
      "data-indeterminate": isIndeterminate ? "" as const : undefined,
      disabled:             disabled  || undefined,
      required:             required  || undefined,
      "aria-required":      required  ? "true" as const : undefined,
      "aria-invalid":       invalid   ? "true" as const : undefined,
    },
  };
}
!!!

---

---

## chip.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/chip.hook.ts`


!!!ts
// design/feedback/components/chip/chip.hook.ts

import type { ChipProps } from "./chip.props";
import { CHIP_DEFAULTS } from "./chip.tokens";
import { useFeedback } from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useChip(props: ChipProps) {
  const {
    as: Tag = "button",
    variant = CHIP_DEFAULTS.variant,
    color   = CHIP_DEFAULTS.color,
    size    = CHIP_DEFAULTS.size,
    radius  = CHIP_DEFAULTS.radius,
    ...rest
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest: remaining } = useFeedback({
    variant,
    color,
    size,
    radius,
    ...rest,
  });

  return {
    Tag,
    props: {
      class: composeClass(
        feedbackClass,
        "chip",
      ),
      style: composeStyle(feedbackStyle),
      ...feedbackAttrs,
      ...remaining,
    },
  };
}

!!!

---

---

## code.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/code.hook.ts`


!!!ts
// design/typography/components/code/code.hook.ts
import type { CodeProps, PreProps } from "./code.props";
import { CODE_DEFAULTS, PRE_DEFAULTS } from "./code.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass }  from "~/shared/base.hook";

export function useCode(props: CodeProps) {
  const {
    as: Tag = "code",
    fam     = CODE_DEFAULTS.fam,
    block   = false,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    fam,
    ...typographyProps,
  });

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "code", block ? "code--block" : "code--inline"),
    },
  };
}

export function usePre(props: PreProps) {
  const {
    as: Tag = "pre",
    fam     = PRE_DEFAULTS.fam,
    size    = PRE_DEFAULTS.size,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    fam,
    size,
    ...typographyProps,
  });

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "pre"),
    },
  };
}

!!!

---

---

## color-picker.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/color-picker.hook.ts`


!!!ts

!!!

---

---

## columns.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/columns.hook.ts`


!!!ts

!!!

---

---

## combobox.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/combobox.hook.ts`


!!!ts
// design/forms/combobox/combobox.hook.ts

/**
 * @file Component hook for the Combobox component.
 * @module design/forms/combobox
 *
 * {@link useCombobox} prepares the three attribute objects and computed data
 * that `Combobox.astro` needs to render the full combobox structure:
 *
 * !!!
 * <div class="form combobox …" data-combobox>      ← wrapper
 *   <input type="text" role="combobox" … />         ← visible filter input
 *   <input type="hidden" name="…" value="…" />      ← form submission input
 *   <ul role="listbox" id="{listboxId}">             ← custom dropdown
 *     <li role="option" id="{listboxId}-{i}">…</li>
 *   </ul>
 * </div>
 * !!!
 *
 * **Two-input pattern:**
 * The text input handles display and filtering; the hidden input handles form
 * submission. Their values differ: text input shows the selected option's
 * `label`, hidden input holds the `value`. The JS controller keeps both in sync.
 *
 * **`listboxId` generation:**
 * If an `id` prop is provided, the listbox gets `id="{id}-listbox"` for a
 * stable, predictable ID. Without an `id` prop, a random suffix is generated
 * server-side via `crypto.randomUUID()`. This ensures the `aria-controls`
 * reference is always valid while avoiding a hard `id` requirement.
 *
 * **`displayValue`:**
 * The initial text shown in the filter input. On SSR, this is the matching
 * option's `label` when `value` is set, or an empty string. The JS controller
 * updates it as the user selects options.
 *
 * @see {@link useForm}          in `forms/forms.hook.ts`
 * @see {@link ComboboxProps}    in `forms/combobox/combobox.props.ts`
 * @see {@link COMBOBOX_DEFAULTS} in `forms/combobox/combobox.tokens.ts`
 * @see `forms/combobox/Combobox.astro` — renders the full structure
 */

import type { ComboboxProps } from "./combobox.props";
import { COMBOBOX_DEFAULTS }                  from "./combobox.tokens";
import { useForm }                            from "~f/forms.hook";
import { composeClass }                       from "~/shared/base.hook";

/**
 * Resolves {@link ComboboxProps} into the full set of attributes and data
 * needed by `Combobox.astro`.
 *
 * @param props - Full `ComboboxProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`.
 *
 * **`props`** — Wrapper `<div>` attributes (form classes, CSS channels, data attrs).
 *
 * **`inputAttrs`** — Visible text `<input>` attributes:
 * - `role="combobox"`, `aria-expanded="false"` (initial), `aria-autocomplete="list"`
 * - `aria-controls="{listboxId}"` — links input to the listbox
 * - `autocomplete="off"` — suppresses browser autocomplete
 *
 * **`hiddenAttrs`** — Hidden `<input type="hidden">` attributes:
 * - `name` — the form field name (goes here, not on the text input)
 * - `value` — the selected option's value (empty string when unselected)
 *
 * **`listboxAttrs`** — `<ul>` listbox attributes:
 * - `id="{listboxId}"`, `role="listbox"`, `hidden` (initial state)
 *
 * **`options`** — The raw options array for `Combobox.astro` to map over,
 * with `selected: boolean` and `id` string added per option.
 *
 * **`displayValue`** — Initial text for the filter input. The selected
 * option's `label` when `value` is set; `""` otherwise.
 *
 * **`listboxId`** — The generated listbox element ID. Exposed so
 * `Combobox.astro` can assign it to the `<ul>` directly.
 *
 * @example
 * !!!astro
 * ---
 * const { Tag, props, inputAttrs, hiddenAttrs, listboxAttrs, options, listboxId }
 *   = useCombobox(Astro.props as ComboboxProps);
 * ---
 * <Tag {...props}>
 *   <input class="combobox__control" {...inputAttrs} />
 *   <input {...hiddenAttrs} />
 *   <ul class="combobox__listbox" {...listboxAttrs}>
 *     {options.map(opt => (
 *       <li class="combobox__option" role="option"
 *           id={`${listboxId}-${opt.value}`}
 *           data-value={opt.value}
 *           aria-selected={opt.selected ? "true" : "false"}
 *           aria-disabled={opt.disabled ? "true" : undefined}>
 *         {opt.label}
 *       </li>
 *     ))}
 *   </ul>
 * </Tag>
 * !!!
 */
export function useCombobox(props: ComboboxProps) {
  const {
    id,
    name,
    value,
    options,
    placeholder,
    caseSensitive = false,
    ...formProps
  } = props;

  // ── Generate stable listbox ID ───────────────────────────────────────────
  //
  // Predictable when id is provided; random suffix when not.
  // crypto.randomUUID() is available in Node 15+ (Astro requires Node 18+).
  const listboxId = id
    ? `${id}-listbox`
    : `combobox-${crypto.randomUUID().slice(0, 8)}-listbox`;

  // ── Delegate to useForm ──────────────────────────────────────────────────
  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        fullWidth: COMBOBOX_DEFAULTS.fullWidth,
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  // ── Resolve initial display value ────────────────────────────────────────
  //
  // The text input shows the label of the selected option, not its value.
  const selectedOption = value
    ? options.find(o => o.value === value)
    : undefined;
  const displayValue = selectedOption?.label ?? "";

  // ── Resolve options with selection state ────────────────────────────────
  const resolvedOptions = options.map(opt => ({
    ...opt,
    selected: opt.value === value,
  }));

  // ── Wrapper attrs ────────────────────────────────────────────────────────
  const wrapperProps = {
    class: composeClass(formClass, "combobox"),
    style: formStyle,
    ...formAttrs,
    "data-combobox": "",
    ...(caseSensitive && { "data-case-sensitive": "" }),
    ...rest,
  };

  // ── Visible text input ───────────────────────────────────────────────────
  //
  // No `name` — the hidden input submits the value.
  // `autocomplete="off"` prevents browser history overlapping the listbox.
  const inputAttrs = {
    type:                    "text" as const,
    id,
    value:                   displayValue || undefined,
    placeholder:             placeholder  ?? undefined,
    role:                    "combobox"   as const,
    "aria-expanded":         "false"      as const,  // JS updates this on open/close
    "aria-autocomplete":     "list"       as const,
    "aria-controls":         listboxId,
    "aria-activedescendant": "",          // JS updates on keyboard navigation
    autoComplete:            "off",
    disabled:                disabled     || undefined,
    required:                required     || undefined,
    "aria-required":         required     ? "true" as const : undefined,
    "aria-invalid":          invalid      ? "true" as const : undefined,
  };

  // ── Hidden submission input ──────────────────────────────────────────────
  //
  // Carries the actual option `value` for form submission.
  // The text input is display-only and has no `name`.
  const hiddenAttrs = {
    type:  "hidden" as const,
    name,
    value: value ?? "",
  };

  // ── Listbox attrs ────────────────────────────────────────────────────────
  const listboxAttrs = {
    id:       listboxId,
    role:     "listbox" as const,
    hidden:   true,                      // JS removes `hidden` on open
  };

  return {
    Tag: "div" as const,
    props:           wrapperProps,
    inputAttrs,
    hiddenAttrs,
    listboxAttrs,
    options:         resolvedOptions,
    listboxId,       // also exposed for option id generation in Combobox.astro
    displayValue,
  };
}

!!!

---

---

## command-palette.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/command-palette.hook.ts`


!!!ts

!!!

---

---

## container.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/container.hook.ts`


!!!ts
import type { ContainerProps } from "./container.props";
import { CONTAINER_TOKENS, CONTAINER_DEFAULTS } from "./container.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useContainer(props: ContainerProps) {
  const {
    as: Tag = CONTAINER_DEFAULTS.as,
    maxWidth = CONTAINER_DEFAULTS.maxWidth,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    CONTAINER_TOKENS,
    { maxWidth },
    "container",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "container", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

---

## context-menu.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/context-menu.hook.ts`


!!!ts

!!!

---

---

## cropper.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/cropper.hook.ts`


!!!ts

!!!

---

---

## date-picker.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/date-picker/date-picker.hook.ts`


!!!ts

!!!

---

---

## dot.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/dot/dot.hook.ts`


!!!ts
// design/feedback/components/dot/dot.hook.ts
import type { DotProps } from "./dot.props";
import { DOT_DEFAULTS } from "./dot.tokens";
import { useFeedback } from "../../feedback.hook";
import { composeClass } from "~/shared/base.hook";

export function useDot(props: DotProps) {
  const {
    variant = DOT_DEFAULTS.variant,
    color   = DOT_DEFAULTS.color,
    size    = DOT_DEFAULTS.size,
    radius  = DOT_DEFAULTS.radius,
    ...restProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant,
    color,
    size,
    radius,
    ...restProps,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(feedbackClass, "dot"),
      style: feedbackStyle,
      "aria-hidden": "true" as const,
      ...feedbackAttrs,
      ...rest,
    },
  };
}

!!!

---

---

## drawer.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.hook.ts`


!!!ts
import type { DrawerProps } from "./drawer.props";
import { DRAWER_TOKENS, DRAWER_DEFAULTS } from "./drawer.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useDrawer(props: DrawerProps) {
  const {
    id,
    title,
    placement       = DRAWER_DEFAULTS.placement,
    size            = DRAWER_DEFAULTS.size,
    closeOnBackdrop = DRAWER_DEFAULTS.closeOnBackdrop,
    closeOnEsc      = DRAWER_DEFAULTS.closeOnEsc,
    class: className,
    ...base
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    DRAWER_TOKENS, { placement, size }, "drawer",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose({
    className: ["drawer", ...tokenClasses, className],
    style:     tokenStyle,
  }, base);

  const titleId = title ? `${id}-title` : undefined;

  return {
    dialogProps: {
      id,
      class:                 cls,
      style:                 style || undefined,
      ...attrs,
      ...rest,
      "aria-labelledby":     titleId,
      "data-close-backdrop": closeOnBackdrop ? "true" : "false",
      "data-close-esc":      closeOnEsc      ? "true" : "false",
    },
    title,
    titleId,
  };
}

!!!

---

---

## dropdown-menu.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.hook.ts`


!!!ts
import type { DropdownMenuProps } from "./dropdown-menu.props";
import { DROPDOWN_MENU_DEFAULTS } from "./dropdown-menu.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useDropdownMenu(props: DropdownMenuProps) {
  const {
    id,
    ...overlayProps 
  } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? DROPDOWN_MENU_DEFAULTS.size,
    variant: overlayProps.variant ?? DROPDOWN_MENU_DEFAULTS.variant,
    radius:  overlayProps.radius ?? DROPDOWN_MENU_DEFAULTS.radius,
    ...overlayProps
  });

  return {
    popoverProps: {
      id,
      popover: "auto",
      class:   composeClass(overlayClass, "dropdown-menu"),
      style:   overlayStyle,
      ...overlayAttrs,
      ...rest,
    }
  };
}

!!!

---

---

## empty-state.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/empty-state/empty-state.hook.ts`


!!!ts
import { useFeedback } from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";
import { EMPTY_STATE_DEFAULTS } from "./empty-state.tokens";
import type { EmptyStateProps } from "./empty-state.props";

export function useEmptyState(props: EmptyStateProps) {
  const {
    size = EMPTY_STATE_DEFAULTS.size,
    variant = EMPTY_STATE_DEFAULTS.variant,
    color = EMPTY_STATE_DEFAULTS.color,
    radius = EMPTY_STATE_DEFAULTS.radius,
    title,
    description,
    icon,
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    size, variant, color, radius, ...feedbackProps
  });

  return {
    props: {
      class: composeClass(feedbackClass, "empty-state"),
      style: composeStyle(feedbackStyle),
      ...feedbackAttrs,
      ...rest,
    },
    title,
    description,
  };
}

!!!

---

---

## feed.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/feed/feed.hook.ts`


!!!ts
import type { FeedProps } from "./feed.props";
import { FEED_TOKENS, FEED_DEFAULTS } from "./feed.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useFeed(props: FeedProps) {
  const {
    data,
    orientation = FEED_DEFAULTS.orientation,
    grouped,
    ...dataProps
  } = props;

  const { dataClass, dataStyle, dataAttrs, caption, rest } = useData(dataProps);

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FEED_TOKENS,
    { orientation },
    "feed"
  );

  const cls = composeClass(
    dataClass,
    "feed",
    ...tokenClasses,
    grouped && "feed--grouped"
  );
  
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag: "ul" as const,
    data,
    caption,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}

!!!

---

---

## field.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/field/field.hook.ts`


!!!ts
// design/forms/field/field.hook.ts

/**
 * @file Component hook for the Field component.
 * @module design/forms/field
 *
 * {@link useField} is intentionally minimal. Field is a structural wrapper
 * with no token resolution — it has no dimensions to resolve, no CSS channels
 * to write, and no color system to wire. Its hook applies state modifier
 * classes and data attributes, then returns the wrapper props and the `id`
 * for the Astro template to use when generating hint/error element IDs.
 *
 * @remarks
 * **Why this hook exists at all:**
 * Even for a trivial component, the hook provides a consistent interface for
 * the Astro template and keeps the class/attribute logic out of the template.
 * It also handles `testId` → `data-testid` via {@link useBaseCompose}.
 *
 * **`id` in the return value:**
 * `id` is returned separately (alongside `{ Tag, props }`) so `Field.astro`
 * can generate `id="{id}-hint"`, `id="{id}-error"`, `id="{id}-success"` on
 * its own rendered slot wrappers. The `id` is NOT in `props` — it does not
 * go on the outer `<div>` wrapper, since the IDs that matter are on the
 * inner elements, and putting the bare `id` on the wrapper could cause
 * `<label for="email">` to associate with the Field div rather than the
 * control inside it.
 *
 * @see {@link FieldProps} in `forms/field/field.props.ts` — input type
 * @see `forms/field/Field.astro`                           — consumes this hook
 * @see `forms/field/field.css`                             — reads field modifier classes
 */

import type { FieldProps } from "./field.props";
import { useBaseCompose }  from "~/shared/base.hook";

/**
 * Resolves {@link FieldProps} into wrapper props for the Field container.
 *
 * @param props - Full `FieldProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`. Field is a generic structural container.
 *
 * **`id`** — The raw `id` prop value (or `undefined`). Used by `Field.astro`
 * to generate `id="{id}-hint"`, `id="{id}-error"`, `id="{id}-success"` on
 * slot wrapper elements. NOT spread onto the outer wrapper div.
 *
 * **`props`** — Attributes for the outer `<div>` wrapper:
 * - `class` — `"field"` plus state modifiers (`field--invalid`, `field--required`)
 * - `data-invalid`  — present when `invalid={true}` (CSS hook)
 * - `data-required` — present when `required={true}` (CSS hook)
 * - `data-testid`   — from `testId` prop via {@link useBaseCompose}
 *
 * @example
 * !!!astro
 * ---
 * // Field.astro
 * const { Tag, id, props } = useField(Astro.props as FieldProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("label") && <div class="field__label"><slot name="label" /></div>}
 *   <div class="field__control"><slot /></div>
 *   {Astro.slots.has("hint") && (
 *     <p class="field__hint" id={id ? `${id}-hint` : undefined}>
 *       <slot name="hint" />
 *     </p>
 *   )}
 * </Tag>
 * !!!
 */
export function useField(props: FieldProps) {
  const {
    id,
    invalid  = false,
    required = false,
    icon,
    class: className,
    ...rest
  } = props;

  // ── Data attributes for CSS state rules ──────────────────────────────────
  const stateAttrs: Record<string, string> = {};
  if (invalid)  stateAttrs["data-invalid"]  = "";
  if (required) stateAttrs["data-required"] = "";

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "field",
        invalid  && "field--invalid",
        required && "field--required",
        className,
      ],
      style: [],
    },
    props,
  );

  return {
    Tag: "div" as const,
    // id is returned separately — it goes on hint/error elements, not the wrapper
    id,
    icon,
    props: {
      class: cls,
      style: style || undefined,
      ...attrs,
      ...stateAttrs,
      ...rest,
    },
  };
}
!!!

---

---

## file-preview.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/file-preview/file-preview.hook.ts`


!!!ts
// design/assets/components/file-preview/file-preview.hook.ts

import type { FilePreviewProps } from "./file-preview.props";
import { FILE_PREVIEW_TOKENS, FILE_PREVIEW_DEFAULTS, FILE_TYPE_MAP } from "./file-preview.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

function getExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : "";
}

export function useFilePreview(props: FilePreviewProps) {
  const {
    name,
    src,
    fileSize,
    layout    = FILE_PREVIEW_DEFAULTS.layout,
    size      = FILE_PREVIEW_DEFAULTS.size,
    radius    = FILE_PREVIEW_DEFAULTS.radius,
    removable = false,
    onRemove,
    class:    className,
    ...base } = props;

  const ext     = getExtension(name);
  const typeInfo = FILE_TYPE_MAP[ext];

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FILE_PREVIEW_TOKENS,
    { size, radius, layout },
    "file-preview",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "file-preview",
        typeInfo?.color,
        removable && "file-preview--removable",
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle],
    },
    base,
  );

  return {
    name,
    src,
    ext,
    label:    (typeInfo?.label ?? ext.toUpperCase()) || "FILE",
    fileSize,
    removable,
    onRemove,
    props: {
      class: cls,
      style,
      ...attrs,
      ...rest,
    },
  };
}

!!!

---

---

## file-upload.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/file-upload/file-upload.hook.ts`


!!!ts

!!!

---

---

## flex.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/flex.hook.ts`


!!!ts
import type { FlexProps } from "./flex.props";
import { FLEX_TOKENS, FLEX_DEFAULTS } from "./flex.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useFlex(props: FlexProps) {
  const {
    as: Tag = FLEX_DEFAULTS.as,
    direction = FLEX_DEFAULTS.direction,
    wrap = FLEX_DEFAULTS.wrap,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FLEX_TOKENS,
    { direction, wrap },
    "flex",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "flex", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

---

## footer.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/footer/footer.hook.ts`


!!!ts
// design/layout/components/footer/footer.hook.ts

/**
 * useFooter
 *
 * Prepares the resolved Tag, class list, and inline styles for the Footer
 * component. Mirrors the `useHeader` pattern exactly — delegate to `useLayout`,
 * then layer the footer-specific class on top.
 *
 * Responsibility split:
 *   useLayout  — resolves spacing (px/py/p/m/…), gap, align, justify into
 *                CSS channels and the `layout` base class.
 *   useFooter  — applies FOOTER_DEFAULTS when props are omitted and appends
 *                the `footer` class.
 *
 * The footer tag is always the semantic `<footer>` element. There is no `as`
 * prop — the semantic role is the point of using this component over Box.
 *
 * Default prop merging strategy:
 *   Destructuring defaults ensure user-supplied values always win. Omitting a
 *   prop triggers the FOOTER_DEFAULTS value; passing it explicitly overrides.
 */

import type { FooterProps } from "./footer.props";
import { FOOTER_DEFAULTS } from "./footer.tokens";
import { useLayout } from "~l/layout.hook";
import { composeClass, composeStyle } from "~sh/base.hook";

/**
 * Resolves `FooterProps` into a `{ Tag, props }` object ready for spread onto
 * the root element in Footer.astro.
 *
 * @param props - All props passed to the `<Footer>` component.
 * @returns `Tag` — always `"footer"`.
 * @returns `props` — merged class, style, data attributes, and any unknown
 *          pass-through props forwarded from the consumer.
 *
 * @example Minimal — all defaults apply:
 *   useFooter({})
 *   // class: "layout footer"
 *   // style: "--layout--px: var(--space-in--lg); --layout--align: center; --layout--justify: space-between"
 *
 * @example Custom py and column layout:
 *   useFooter({ py: "xl", align: "start", justify: "start" })
 *   // class: "layout footer"
 *   // style: "--layout--px: var(--space-in--lg); --layout--py: var(--space-in--xl); …"
 */
export function useFooter(props: FooterProps) {
  const {
    px      = FOOTER_DEFAULTS.px,
    align   = FOOTER_DEFAULTS.align,
    justify = FOOTER_DEFAULTS.justify,
    ...rest
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest: remaining } = useLayout({
    px,
    align,
    justify,
    ...rest,
  });

  return {
    Tag: "footer" as const,
    props: {
      class: composeClass(layoutClass, "footer"),
      style: composeStyle(layoutStyle),
      ...layoutAttrs,
      ...remaining,
    },
  };
}

!!!

---

---

## frame.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.hook.ts`


!!!ts
// design/surfaces/components/frame/frame.hook.ts
import type { FrameProps }      from "./frame.props";
import { FRAME_DEFAULTS }       from "./frame.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass,
         composeStyle }         from "~/shared/base.hook";

export function useFrame(props: FrameProps) {
  const {
    as: Tag = "div",
    ratio,
    clip    = true,
    layer   = FRAME_DEFAULTS.layer,
    padding = FRAME_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
  });

  const ratioStyle = ratio ? `--frame--ratio: ${ratio}` : null;

  return {
    Tag,
    props: {
      class: composeClass(surfaceClass, "frame", clip && "frame--clipped"),
      style: composeStyle(surfaceStyle, ratioStyle),
      ...surfaceAttrs,
      ...rest,
    },
  };
}

!!!

---

---

## gallery-item.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery-item/gallery-item.hook.ts`


!!!ts

!!!

---

---

## gallery.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery/gallery.hook.ts`


!!!ts

!!!

---

---

## grid.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/grid.hook.ts`


!!!ts
import type { GridProps } from "./grid.props";
import { GRID_TOKENS, GRID_DEFAULTS } from "./grid.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useGrid(props: GridProps) {
  const {
    as: Tag = GRID_DEFAULTS.as,
    fit,
    columns,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    GRID_TOKENS,
    { fit, columns: fit? undefined : columns },
    "grid",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "grid", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

---

## header.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/header/header.hook.ts`


!!!ts
// design/layout/components/header/header.hook.ts

/**
 * useHeader
 *
 * Prepares the resolved Tag, class list, and inline styles for the Header
 * component. Follows the same hook contract as every other layout component:
 * delegate structural concerns to `useLayout`, then layer component-specific
 * concerns on top.
 *
 * Responsibility split:
 *   useLayout  — resolves spacing (px/py/p/m/…), gap, align, justify into
 *                CSS channels and the `layout` base class.
 *   useHeader  — applies HEADER_DEFAULTS when props are omitted, appends
 *                the `header` class, and conditionally adds `header--sticky`.
 *
 * The header tag is always the semantic `<header>` element. Unlike Box, there
 * is no `as` prop because the semantic role is the entire point of this component.
 *
 * Default prop merging strategy:
 *   Props are destructured with default values, so user-supplied values always
 *   win. Explicitly passing `px={undefined}` does NOT reset to the default
 *   (TypeScript prevents it for typed props); omitting the prop entirely triggers
 *   the default.
 */

import type { HeaderProps } from "./header.props";
import { HEADER_DEFAULTS } from "./header.tokens";
import { useLayout } from "~l/layout.hook";
import { composeClass, composeStyle } from "~sh/base.hook";

/**
 * Resolves `HeaderProps` into a `{ Tag, props }` object ready for spread onto
 * the root element in Header.astro.
 *
 * @param props - All props passed to the `<Header>` component.
 * @returns `Tag` — always `"header"`.
 * @returns `props` — merged class, style, data attributes, and any unknown
 *          pass-through props forwarded from the consumer.
 *
 * @example Minimal — all defaults apply:
 *   useHeader({})
 *   // class: "layout header"
 *   // style: "--layout--px: var(--space-in--lg); --layout--align: center; --layout--justify: space-between"
 *
 * @example Sticky + custom padding override:
 *   useHeader({ sticky: true, px: "xl" })
 *   // class: "layout header header--sticky"
 *   // style: "--layout--px: var(--space-in--xl); …"
 */
export function useHeader(props: HeaderProps) {
  const {
    sticky = false,
    // Apply opinionated defaults; user value takes priority via destructuring default
    px      = HEADER_DEFAULTS.px,
    align   = HEADER_DEFAULTS.align,
    justify = HEADER_DEFAULTS.justify,
    ...rest
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest: remaining } = useLayout({
    px,
    align,
    justify,
    ...rest,
  });

  return {
    Tag: "header" as const,
    props: {
      class: composeClass(
        layoutClass,
        "header",
        sticky && "header--sticky",
      ),
      style: composeStyle(layoutStyle),
      ...layoutAttrs,
      ...remaining,
    },
  };
}

!!!

---

---

## heading.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/heading/heading.hook.ts`


!!!ts
// design/typography/heading/heading.hook.ts

import type { HeadingProps } from "./heading.props";
import { HEADING_DEFAULTS } from "./heading.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

/**
 * Heading-specific wrapper around `useTypography`.
 *
 * Handles only what's unique to headings — semantic `level` and the `h`/
 * `h--{level}` class modifiers — then delegates all token resolution
 * (size, weight, color, etc.) to `useTypography`. This keeps a single
 * implementation of `resolveTokens` + `useBaseCompose` across the whole
 * typography family instead of duplicating it per component.
 *
 * `HeadingProps.weight` is narrowed to `HeadingWeight` at the type level
 * (via interface extension in heading.props.ts), so any `weight` reaching
 * this function — and passed through to `useTypography` — is already
 * guaranteed valid for headings. No runtime re-validation or separate
 * token spec is needed here.
 *
 * @param props - Heading props: `level` plus the inherited (and
 *                narrowed) typography token props.
 *
 * @returns Tag   - The semantic element tag, `"h1"`–`"h6"`, derived from `level`.
 * @returns props - `class`, `style`, and forwarded attrs ready to spread
 *                  onto the rendered heading element.
 *
 * @example
 *   const { Tag, props } = useHeading({ level: 1, weight: "bold" });
 *   <Tag {...props}>Page Title</Tag>
 */
export function useHeading(props: HeadingProps) {
  const {
    level = HEADING_DEFAULTS.level,
    icon,
    class: className,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    ...typographyProps,
    class: composeClass("h", `h--${level}`, className),
  });

  return {
    Tag:   `h${level}` as const,
    props: typographyAttributes,
  };
}


!!!

---

---

## icon.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/icon/icon.hook.ts`


!!!ts
// design/assets/components/icon/icon.hook.ts

import type { IconProps } from "./icon.props";
import { ICON_DEFAULTS, ICON_TOKENS } from "./icon.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useIcon(props: IconProps) {
  const {
    color,
    name,
    size = ICON_DEFAULTS.size,
    class: className,
    ...base } = props;

  const { 
    style: tokenStyle, 
    classes: tokenClasses 
  } = resolveTokens(
    ICON_TOKENS, 
    { size, color },
    "icon"
  );

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: ["icon", ...tokenClasses, className],
      style: tokenStyle,
    },
    base,
  );

  return {
    name,
    props: { class: cls, style: style || undefined, ...attrs, ...rest },
  };
}

!!!

---

## image.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/image/image.hook.ts`


!!!ts
// design/assets/image/image.hook.ts

import type { ImageProps } from "./image.props";
import { IMAGE_TOKENS, IMAGE_DEFAULTS } from "./image.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";
import { resolveSpacingStyles } from "~/shared/spacing.props";

export function useImage(props: ImageProps) {
  const {
    src,
    alt,
    ratio,
    fit          = IMAGE_DEFAULTS.fit,
    imgLoading   = IMAGE_DEFAULTS.loading,
    radius,
    width,
    height,
    class: className,
    v:      _v,
    p, px, py, pt, pr, pb, pl,
    m, mx, my, mt, mr, mb, ml,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    IMAGE_TOKENS,
    { radius, ratio, fit },
    "image",
  );

  const spacingStyle = resolveSpacingStyles(
    { p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml },
    "image",
  );

  const isCssValue = (val: string | number | undefined) => typeof val === "string" && Number.isNaN(Number(val));
  const isHtmlValue = (val: string | number | undefined) => typeof val === "number" || (typeof val === "string" && !Number.isNaN(Number(val)));

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "image",
        ratio     && "image--ratio",
        ...tokenClasses,
        className,
      ],
      style: [
        ...tokenStyle,
        ...spacingStyle,
        isCssValue(width) ? `width: ${width}` : undefined,
        isCssValue(height) ? `height: ${height}` : undefined,
      ],
    },
    base,
  );

  return {
    props: {
      class:   cls,
      style,
      ...attrs,
      ...rest,
      src,
      alt,
      loading: imgLoading,
      width:   isHtmlValue(width) ? width : undefined,
      height:  isHtmlValue(height) ? height : undefined,
    },
  };
}
!!!

---

## indent.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/indent/indent.hook.ts`


!!!ts
/**
 * src/design/typography/components/indent/indent.hook.ts
 */
import { useTypography } from '~/typography/typography.hook';
import type { IndentProps, IndentType } from './indent.props';
import { type IndentSize, INDENT_CODE_TOKENS, INDENT_PROSE_TOKENS, INDENT_UI_TOKENS } from './indent.tokens';

export function useIndent(props: IndentProps) {
  const { prose, ui, code, ...rest } = props;

  const entries = Object.entries({
    prose,
    ui,
    code,
  }).filter(([, value]) => value !== undefined);

  if (entries.length > 1) {
    throw new Error("Indent accepts only one of: prose, ui, or code.");
  }

  const [type = "prose", size = "md"] = entries[0] ?? [];

  let indentValue = '';
  if (type === 'prose') {
    indentValue = INDENT_PROSE_TOKENS[size as IndentSize];
  } else if (type === 'code') {
    indentValue = INDENT_CODE_TOKENS[size as IndentSize];
  } else if (type === 'ui') {
    indentValue = INDENT_UI_TOKENS[size as IndentSize];
  }

  const { typographyAttributes } = useTypography(rest);
  const { class: cls, style, ...restAttrs } = typographyAttributes as any;

  // Final class
  const finalClass = [cls, 'indent'].filter(Boolean).join(' ');

  // Final style
  let finalStyle = `--indent--size: ${indentValue}`;
  if (typeof style === 'string') {
    finalStyle = `${style}; ${finalStyle}`;
  } else if (Array.isArray(style)) {
    finalStyle = `${style.filter(Boolean).join(';')}; ${finalStyle}`;
  } else if (style && typeof style === 'object') {
    // Highly unlikely since base.hook.ts usually uses string/array of strings
    finalStyle = `${Object.entries(style).map(([k, v]) => `${k}: ${v}`).join(';')}; ${finalStyle}`;
  }

  return {
    Tag: 'div',
    props: {
      ...restAttrs,
      class: finalClass,
      style: finalStyle,
      'data-indent-type': type,
      'data-indent-size': size,
    },
    indentValue,
    type: type as IndentType,
    size: size as IndentSize
  };
}

!!!

---

## indicator.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/indicator/indicator.hook.ts`


!!!ts

!!!

---

## inline.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/inline.hook.ts`


!!!ts
import type { InlineProps } from "./inline.props";
import { INLINE_TOKENS, INLINE_DEFAULTS } from "./inline.tokens";
import { useLayout } from "../../layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */

/**
 * @todo compare with ../header/header.hook.ts
 * layout props handled right? i dunno im tired
 */
export function useInline(props: InlineProps) {
  const {
    as: Tag = INLINE_DEFAULTS.as,
    gap = INLINE_DEFAULTS.gap,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    INLINE_TOKENS,
    { gap },
    "inline",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "inline", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

## input-group.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input-group/input-group.hook.ts`


!!!ts

!!!

---

## input.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input/input.hook.ts`


!!!ts
// design/forms/input/input.hook.ts

/**
 * @file Component hook for the Input component.
 * @module design/forms/input
 *
 * {@link useInput} resolves {@link InputProps} into the two attribute
 * objects that `Input.astro` needs: one for the outer wrapper `<div>`
 * (visual container with border, background, and radius) and one for
 * the inner `<input>` element (semantic control with ARIA and native attrs).
 *
 * **Departure from standard `{ Tag, props }` shape:**
 * Most component hooks in this system return `{ Tag, props }` — a single
 * element ready to spread. Input cannot follow this pattern because it
 * renders two elements that need distinct attribute sets:
 *
 * !!!
 * <div  class="form input form--outlined …"  ← wrapper: visual chrome
 *       style="--form--size: …"
 *       data-disabled data-invalid>
 *   <slot name="start" />                     ← start slot (icon, prefix)
 *   <input type="text" id="…" name="…"       ← inner control: semantic
 *          aria-invalid="true"
 *          disabled />
 *   <slot name="end" />                       ← end slot (toggle, suffix)
 * </div>
 * !!!
 *
 * The hook therefore returns:
 * - `{ Tag, props }` — wrapper `<div>` with form classes, CSS channels,
 *   data attributes, and any unknown HTML passthrough
 * - `{ inputAttrs }` — inner `<input>` with type, value, id, name,
 *   native disabled/required, and ARIA attributes
 *
 * **ARIA responsibility:**
 * `formAttrs` from {@link useForm} includes both `data-*` and `aria-*`
 * attributes. Spreading `formAttrs` onto the wrapper `<div>` means
 * `aria-invalid` / `aria-disabled` appear on a non-form element — this is
 * benign (screen readers ignore them there) but redundant. The ARIA attrs
 * are re-emitted on `inputAttrs` where they actually matter for
 * accessibility. See the `@todo` below for a future cleanup path.
 *
 * **`id` and `name` routing:**
 * `id` and `name` must appear on the `<input>` element, not on the wrapper,
 * because `<label for="…">` matches the id of the actual control. Both are
 * therefore destructured in this hook before calling {@link useForm} so they
 * never end up in `rest`.
 *
 * @see {@link useForm}       in `forms/forms.hook.ts` — category hook delegated to
 * @see {@link InputProps}    in `forms/input/input.props.ts` — input type
 * @see {@link INPUT_DEFAULTS} in `forms/input/input.tokens.ts` — default values
 * @see `forms/input/Input.astro` — consumes this hook's return value
 * @see `forms/input/input.css` — reads `--form--*` channels emitted here
 *
 * @todo Refine {@link useForm} to return `formDataAttrs` and `formAriaAttrs`
 *   separately (instead of a merged `formAttrs`). This would let Input spread
 *   only `formDataAttrs` onto the wrapper and route `formAriaAttrs` cleanly to
 *   `inputAttrs`, eliminating the benign-but-redundant ARIA duplication.
 *   Touch points: `forms.hook.ts` (split return), all component hooks that
 *   currently spread `formAttrs` (each pulls from the right key).
 */

import type { InputProps }                  from "./input.props";
import { INPUT_DEFAULTS }                   from "./input.tokens";
import { useForm }                          from "~/forms/forms.hook";
import { composeClass }                     from "~/shared/base.hook";

/**
 * Resolves {@link InputProps} into attributes for the wrapper element
 * and the inner `<input>` element.
 *
 * @param props - Full `InputProps` for this `<Input>` instance.
 *
 * @returns An object with three members:
 *
 * **`Tag`** — Always `"div"`. The visual container. Spread `props` onto it.
 *
 * **`props`** — Attributes for the wrapper `<div>`:
 * - `class` — `"form input form--outlined form--primary …"` (token modifiers)
 * - `style` — `"--form--size: …; --form--radius: …; --form--color-base: …;"`
 * - `data-disabled`, `data-invalid` — CSS state hooks
 * - `aria-*` — ARIA passthrough from formAttrs (benign on wrapper; see hook docs)
 * - Unknown HTML attrs from consumer (forwarded via `rest`)
 *
 * **`inputAttrs`** — Attributes for the inner `<input>`:
 * - `id`, `name`, `type`, `value`, `placeholder`
 * - `readOnly`, `minLength`, `maxLength`, `pattern`, `autoComplete`
 * - `disabled`, `required` — native HTML attributes
 * - `aria-disabled`, `aria-required`, `aria-invalid` — ARIA attributes
 *
 * @example
 * !!!astro
 * ---
 * // Input.astro
 * import type { InputProps } from "./input.props";
 * import { useInput } from "./input.hook";
 * import "./input.css";
 * import "../forms.css";
 *
 * const { Tag, props, inputAttrs } = useInput(Astro.props as InputProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("start") && (
 *     <div class="input__start"><slot name="start" /></div>
 *   )}
 *   <input class="input__control" {...inputAttrs} />
 *   {Astro.slots.has("end") && (
 *     <div class="input__end"><slot name="end" /></div>
 *   )}
 * </Tag>
 * !!!
 *
 * @see {@link useForm} — handles token resolution and shared ARIA attrs
 */
export function useInput(props: InputProps) {
  // ── Destructure Input-specific props ─────────────────────────────────────
  //
  // `id` and `name` are pulled here (before useForm) so they are routed
  // to inputAttrs rather than landing in rest → wrapperProps.
  //
  // `name` is declared on FormProps; `id` is declared on InputProps.
  // Destructuring them here removes them from the object passed to useForm.
  const {
    id,
    name,
    type          = INPUT_DEFAULTS.type,
    value,
    placeholder,
    readonly,
    minLength,
    maxLength,
    pattern,
    autocomplete,
    icon,
    ...formProps
  } = props;

  // ── Delegate shared resolution to useForm ────────────────────────────────
  //
  // useForm resolves: size, variant, color, radius → CSS channels + classes
  //                   disabled, required, invalid  → formAttrs (data-* + aria-*)
  //                   fullWidth                    → form--full-width class
  //
  // `id` and `name` are not in formProps (destructured above), so they will
  // not appear in `rest`. All other unknown consumer props flow through rest.
  const {
    formClass, formStyle, formAttrs,
    disabled, required, invalid,
    rest,
  // FormProps cast is safe: InputProps is a FormProps; we only removed
  // optional props that InputProps added or re-declared.
  } = useForm(formProps as Parameters<typeof useForm>[0]);

  // ── Assemble wrapper props ────────────────────────────────────────────────
  //
  // The wrapper <div> is the visual container. It receives:
  // - Form token classes and inline CSS channel vars
  // - data-* attributes for CSS state rules (.input[data-disabled] etc.)
  // - aria-* from formAttrs (benign duplication — see @todo in file header)
  // - Any remaining unknown HTML attrs from the consumer via rest
  const wrapperProps = {
    class: composeClass(formClass, "input"),
    style: formStyle,
    ...formAttrs,
    ...rest,
  };

  // ── Assemble inner input attrs ────────────────────────────────────────────
  //
  // The <input> element receives all semantic, functional, and ARIA attrs.
  // Native `disabled` and `required` are added here (not in useForm) because
  // they are element-specific — only valid on native form elements.
  //
  // `undefined` values are intentionally used instead of omission because
  // Astro/JSX spreads skip undefined attribute values automatically.
  // This avoids the exactOptionalPropertyTypes conditional-spreading issue.
  const inputAttrs = {
    id,
    name,
    type,
    value:        value       ?? undefined,
    placeholder:  placeholder ?? undefined,
    readOnly:     readonly    || undefined,
    minLength:    minLength,
    maxLength:    maxLength,
    pattern:      pattern,
    autoComplete: autocomplete,
    // Native HTML attributes — element-specific, added here not in useForm
    disabled:     disabled    || undefined,
    required:     required    || undefined,
    // ARIA attributes on the actual control (semantically correct location)
    "aria-required": required ? "true" as const : undefined,
    "aria-invalid":  invalid  ? "true" as const : undefined,
  };

  return {
    Tag: "div" as const,
    props:      wrapperProps,
    inputAttrs: inputAttrs,
  };
}
!!!

---

## kbd.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/kbd/kbd.hook.ts`


!!!ts
// design/typography/components/kbd/kbd.hook.ts
import type { KbdProps } from "./kbd.props";
import { KBD_DEFAULTS } from "./kbd.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

export function useKbd(props: KbdProps) {
  const {
    size = KBD_DEFAULTS.size,
    fam  = KBD_DEFAULTS.fam,
    icon,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({ size, fam, ...typographyProps });

  return {
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "kbd"),
    },
  };
}

!!!

---

## label.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/label.hook.ts`


!!!ts
// design/typography/label/label.hook.ts

/**
 * @file Component hook for the Label component.
 * @module design/typography/label
 *
 * {@link useLabel} resolves {@link LabelProps} using Pattern B — it calls
 * `resolveTokens(LABEL_TOKENS, ...)` directly rather than delegating to
 * {@link useTypography}. This is required because {@link LABEL_TOKENS}
 * overrides the `size` dimension to use {@link TEXT_SIZE_FIXED} (fixed scale)
 * instead of the {@link TEXT_SIZE} (responsive scale) that `useTypography`
 * and `TYPOGRAPHY_TOKENS` use.
 *
 * If Label delegated to `useTypography`, the call chain would be:
 * !!!
 * useLabel → useTypography → resolveTokens(TYPOGRAPHY_TOKENS, ...)
 *                                                ↑
 *                              uses TEXT_SIZE (responsive --fs--sm)
 *                              NOT TEXT_SIZE_FIXED (fixed --fsf--sm)
 * !!!
 *
 * By calling `resolveTokens(LABEL_TOKENS, ...)` directly, the correct
 * fixed-scale value is written to `--typography--size`.
 *
 * **`for` passthrough:**
 * The `for` prop (naming a reserved keyword is valid in TypeScript interfaces
 * and object destructuring) is destructured and re-applied to the element
 * explicitly so TypeScript doesn't complain about it in `rest`. In Astro
 * templates, `for` is the correct attribute name — no `htmlFor` aliasing.
 *
 * **`required` return value:**
 * `required` is returned separately (not in `props`) so `Label.astro` can
 * conditionally render the `aria-hidden` asterisk span without accessing
 * `Astro.props` directly in the template.
 *
 * @see {@link LABEL_TOKENS}   in `typography/label/label.tokens.ts` — spec
 * @see {@link useTypography}  in `typography/typography.hook.ts`     — NOT called
 * @see {@link useBaseCompose} in `shared/base.hook.ts`               — class/style
 * @see `typography/label/Label.astro` — consumes this hook
 */

import type { LabelProps }  from "./label.props";
import { LABEL_TOKENS, LABEL_DEFAULTS } from "./label.tokens";
import { resolveTokens }   from "~/shared/tokens";
import { useBaseCompose }  from "~/shared/base.hook";

/**
 * Resolves {@link LabelProps} into element attributes and a `required` flag.
 *
 * @param props - Full `LabelProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"label"`.
 *
 * **`props`** — Attributes for the `<label>` element:
 * - `class` — `"typography label"` plus token modifier classes
 * - `style` — `"--typography--size: var(--fsf--sm); …"` (fixed-scale channels)
 * - `for`   — the associated control's id (when provided)
 *
 * **`required`** — `true` when the field is required. `Label.astro` uses
 * this to conditionally render the `aria-hidden` asterisk indicator.
 *
 * @example
 * !!!astro
 * ---
 * // Label.astro
 * const { Tag, props, required } = useLabel(Astro.props as LabelProps);
 * ---
 * <Tag {...props}>
 *   <slot />
 *   {required && <span class="label__required" aria-hidden="true">*</span>}
 * </Tag>
 * !!!
 */
export function useLabel(props: LabelProps) {
  const {
    // Label-specific props
    for: htmlFor,
    required = false,
    icon,
    // Typography token props — with label-specific defaults
    size     = LABEL_DEFAULTS.size,
    weight   = LABEL_DEFAULTS.weight,
    // Remaining typography props (no label-specific defaults)
    color,
    align,
    leading,
    tracking,
    fam,
    transform,
    wrap,
    decoration,
    fontStyle,
    clamp,
    truncate = false,
    // Base props
    class: className,
    v:        _v,
    testId:   _testId,
    bg,
    ...base
  } = props;

  // ── Token resolution ─────────────────────────────────────────────────────
  //
  // LABEL_TOKENS overrides the `size` dimension to use TEXT_SIZE_FIXED.
  // resolveTokens writes --typography--size: var(--fsf--sm) (fixed),
  // not var(--fs--sm) (responsive). Same channel key, different value.
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    LABEL_TOKENS,
    { size, weight, color, align, leading, tracking, fam, transform, wrap, decoration, style: fontStyle },
    "typography",
  );

  const { className: cls, style, attrs, rest: restAttrs } = useBaseCompose(
    {
      className: [
        "typography",
        "label",
        ...tokenClasses,
        clamp    != null && "typography--clamped",
        truncate          && "typography--truncate",
        className,
      ],
      style: [
        ...tokenStyle,
        clamp != null && `--typography--clamp: ${clamp}`,
        bg            && `--typography--bg: ${bg}`,
      ],
    },
    base,
  );

  return {
    Tag: "label" as const,
    props: {
      class: cls,
      style,
      ...attrs,
      ...restAttrs,
      // `for` is explicitly re-applied after rest so it's not shadowed.
      // In Astro (HTML attribute mode), `for` is correct — no `htmlFor`.
      for: htmlFor,
    },
    // Returned separately for Label.astro's conditional asterisk rendering
    required,
  };
}
!!!

---

## lightbox.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/lightbox/lightbox.hook.ts`


!!!ts

!!!

---

## link.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/link/link.hook.ts`


!!!ts
// design/typography/link/link.hook.ts

import type { LinkProps } from "./link.props";
import { LINK_DEFAULTS } from "./link.tokens";
import { useTypography } from "~ty/typography.hook";
import { composeClass } from "~sh/base.hook";

/**
 * Hook: `useLink`
 * 
 * Prepares the properties, CSS classes, and HTML attributes for a Link component.
 * Links inherit from the Typography system as they are visually similar to text.
 * 
 * Handles the logic for:
 * - Setting `target="_blank"` and `rel="noopener noreferrer"` securely when `ext` is true.
 * - Applying typography attributes seamlessly.
 * - Generating class names for underline behavior (`always`, `hover`, `never`).
 * 
 * @param {LinkProps} props - The link properties, extending typography options.
 * @returns An object containing the HTML Tag (`a`) and resolved attributes (`props`).
 */
export function useLink(props: LinkProps) {
  const {
    href,
    target,
    rel,
    external    = false,
    underline   = LINK_DEFAULTS.underline,
    icon,
    class: className,
    ...typographyProps
  } = props;

  // Resolve target and rel for secure external linking
  const resolvedTarget = external ? "_blank" : target;
  const resolvedRel    = external || target === "_blank"
    ? (rel ?? "noopener noreferrer")
    : rel;

  // Process typography attributes alongside link-specific classes
  const { typographyAttributes } = useTypography({
    ...typographyProps,
    class: composeClass("link", `link--underline-${underline}`, className),
  });

  return {
    Tag: "a" as const,
    props: {
      ...typographyAttributes,
      href,
      target: resolvedTarget,
      rel:    resolvedRel,
    },
  };
}
!!!

---

## item/list-item.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/item/list-item.hook.ts`


!!!ts
import type { ListItemProps } from "./list-item.props";
import { useBaseCompose } from "~/shared/base.hook";

export function useListItem(props: ListItemProps) {
  const {
    checkState,
    href,
    description,
    badge,
    disabled = false,
    icon,
    class: className,
    ...rest
  } = props;

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "list__item",
        disabled && "list__item--disabled",
        className,
      ],
      style: [],
    },
    props
  );

  return {
    Tag: "li" as const,
    checkState,
    href,
    description,
    badge,
    disabled,
    icon,
    props: {
      class: cls,
      style: style || undefined,
      ...attrs,
      ...rest,
    },
  };
}

!!!

---

## list.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/list.hook.ts`


!!!ts
// design/data/list/list.hook.ts

import type { ListProps }             from "./list.props";
import { LIST_TOKENS, LIST_DEFAULTS } from "./list.tokens";
import { resolveTokens }              from "~/shared/tokens";
import { useData }                    from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

/**
 * Resolves `ListProps` into a `{ Tag, props }` object plus `data` for
 * the Astro template to render list items.
 *
 * RESPONSIBILITY SPLIT
 * ─────────────────────────────────────────────────────────────
 * useData    — color channels, density, variant, all shared modifiers
 *              (striped, bordered, interactive, selectable, scrollable),
 *              state attributes (data-loading, data-empty, etc.),
 *              and base attrs (data-visual, data-testid).
 *
 * useList    — orientation token, `ordered` → Tag, surfaces `data`
 *              for the Astro template.
 *
 * SINGLE-ELEMENT PATTERN
 * ─────────────────────────────────────────────────────────────
 * Unlike Table, List does not need a wrapper div — `overflow: auto`
 * works on `<ul>/<ol>` (they are block elements). The `.data` class,
 * CSS channels, and state attrs all land on the root list element.
 *
 * @returns Tag      — `"ul"` or `"ol"` based on `ordered`.
 * @returns props    — spread onto the root element: class, style, data-attrs.
 * @returns data     — `ListItem[] | undefined` for the Astro template.
 * @returns ordered  — pass to nested `<List>` components so children inherit.
 *
 * @example
 *   const { Tag, props, data, ordered } = useList(Astro.props as ListProps);
 */
export function useList(props: ListProps) {
  const {
    data,
    ordered     = LIST_DEFAULTS.ordered,
    orientation = LIST_DEFAULTS.orientation,
    ...dataProps
  } = props;

  // ── Category resolution ─────────────────────────────────────
  const { dataClass, dataStyle, dataAttrs, caption, rest } = useData(dataProps);

  // ── List-specific token resolution ──────────────────────────
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    LIST_TOKENS,
    { orientation },
    "list",
  );

  // ── Compose ─────────────────────────────────────────────────
  const cls   = composeClass(dataClass, "list", ...tokenClasses);
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag:     (ordered ? "ol" : "ul") as "ul" | "ol",
    data,
    ordered,
    caption,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}
!!!

---

## item/m-item.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/item/m-item.hook.ts`


!!!ts
import type { MenuItemProps } from "./m-item.props";

export function useMenuItem(props: MenuItemProps) {
  const { id, href, icon, active, disabled, class: className, ...rest } = props;

  const Tag = href ? "a" : "button";
  const typeAttr = href ? {} : { type: "button" };

  return {
    Tag,
    menuItemProps: {
      id,
      href,
      disabled,
      "aria-current": active && href ? "page" : undefined,
      "aria-selected": active && !href ? "true" : undefined,
      class: ["nav__item", className].filter(Boolean).join(" "),
      ...typeAttr,
      ...rest
    }
  };
}

!!!

---

## menu.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/menu.hook.ts`


!!!ts
import { useNav } from "../../nav.hook";
import type { MenuProps } from "./menu.props";

const MENU_DEFAULTS = {
  variant: "soft",
  orientation: "vertical",
  indentChildren: true
} as const;

export function useMenu(props: MenuProps) {
  const { 
    items, 
    indentChildren = MENU_DEFAULTS.indentChildren,
    variant = MENU_DEFAULTS.variant,
    orientation = MENU_DEFAULTS.orientation,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps, activeId } = useNav({ variant, orientation, ...navProps });

  const menuClass = [
    "menu",
    resolvedNavProps.class,
    indentChildren ? "menu--indent" : ""
  ].filter(Boolean).join(" ");

  return {
    menuProps: {
      ...resolvedNavProps,
      class: menuClass
    },
    items,
    activeId
  };
}

!!!

---

## metric.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/metric/metric.hook.ts`


!!!ts
import type { MetricProps } from "./metric.props";
import { METRIC_TOKENS, METRIC_DEFAULTS } from "./metric.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useMetric(props: MetricProps) {
  const {
    value,
    label,
    description,
    trend,
    trendDirection,
    size = METRIC_DEFAULTS.size,
    icon,
    ...dataProps
  } = props;

  const { dataClass, dataStyle, dataAttrs, rest } = useData({ size, ...dataProps });

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    METRIC_TOKENS,
    {},
    "metric"
  );

  const cls = composeClass(dataClass, "metric", ...tokenClasses);
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag: "div" as const,
    value,
    label,
    description,
    trend,
    trendDirection,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}

!!!

---

## modal.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/modal/modal.hook.ts`


!!!ts
import type { ModalProps } from "./modal.props";
import { MODAL_DEFAULTS } from "./modal.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useModal(props: ModalProps) {
  const {
    id,
    title,
    closeOnBackdrop = MODAL_DEFAULTS.closeOnBackdrop,
    closeOnEsc      = MODAL_DEFAULTS.closeOnEsc,
    ...overlayProps } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? MODAL_DEFAULTS.size,
    variant: overlayProps.variant ?? MODAL_DEFAULTS.variant,
    ...overlayProps
  });

  return {
    dialogProps: {
      id,
      class:              composeClass(overlayClass, "modal"),
      style:              overlayStyle,
      ...overlayAttrs,
      ...rest,
      "aria-labelledby":  title ? `${id}-title` : undefined,
      "data-close-backdrop": closeOnBackdrop ? "true" : "false",
      "data-close-esc":      closeOnEsc      ? "true" : "false",
    },
    title,
    titleId: title ? `${id}-title` : undefined,
  };
}

!!!

---

## multiselect.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/multiselect/multiselect.hook.ts`


!!!ts

!!!

---

## brand/brand.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/brand/brand.hook.ts`


!!!ts
import type { NavbarBrandProps } from "./brand.props";

export function useNavbarBrand(props: NavbarBrandProps) {
  const { class: className, ...rest } = props;

  return {
    brandProps: {
      class: ["navbar__brand", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}

!!!

---

## content/content.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/content/content.hook.ts`


!!!ts
import type { NavbarContentProps } from "./content.props";

export function useNavbarContent(props: NavbarContentProps) {
  const { hideOnMobile = true, class: className, ...rest } = props;

  return {
    contentProps: {
      "data-hide-on-mobile": hideOnMobile ? "true" : undefined,
      class: ["navbar__content", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}

!!!

---

## navbar.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/navbar.hook.ts`


!!!ts
import { useNav } from "../../nav.hook";
import type { NavbarProps } from "./navbar.props";

const NAVBAR_DEFAULTS = {
  size: "md",
  variant: "ghost"
} as const;

export function useNavbar(props: NavbarProps) {
  const { 
    sticky = false,
    glass = true,
    maxWidth = "1280px",
    class: className,
    size = NAVBAR_DEFAULTS.size,
    variant = NAVBAR_DEFAULTS.variant,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps } = useNav({ size, variant, ...navProps });

  const containerStyle = maxWidth ? `max-width: ${maxWidth};` : undefined;

  return {
    maxWidth,
    containerStyle,
    navbarProps: {
      "data-sticky": sticky ? "true" : undefined,
      "data-glass": glass ? "true" : undefined,
      ...resolvedNavProps,
      class: ["navbar", resolvedNavProps.class, className].filter(Boolean).join(" ")
    }
  };
}

!!!

---

## number-input.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/number-input/number-input.hook.ts`


!!!ts

!!!

---

## pagination.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/pagination/pagination.hook.ts`


!!!ts
import { useNav } from "../../nav.hook";
import type { NavProps } from "../../nav.props";
import type { PaginationProps } from "./pagination.props";

const PAGINATION_DEFAULTS = {
  variant: "ghost",
  orientation: "horizontal",
  siblingCount: 1,
  showControls: true
} as const;

export function usePagination(props: PaginationProps) {
  const { 
    currentPage,
    totalPages,
    siblingCount = PAGINATION_DEFAULTS.siblingCount,
    showControls = PAGINATION_DEFAULTS.showControls,
    baseUrl,
    getPageUrl,
    variant = PAGINATION_DEFAULTS.variant,
    orientation = PAGINATION_DEFAULTS.orientation,
    ...navProps 
  } = props;
  
  const activeId = String(currentPage);

  // Note: We cast to NavProps here because PaginationProps omits 'activeId',
  // which causes TS to lose the explicit type shape during the rest spread.
  // This satisfies strict mode without needing a generic useNav signature.
  const { navProps: resolvedNavProps } = useNav({ variant, orientation, ...navProps, activeId } as NavProps);

  const paginationClass = [
    "pagination",
    resolvedNavProps.class
  ].filter(Boolean).join(" ");

  // Generate URL for a given page number
  const generateUrl = (page: number) => {
    if (getPageUrl) return getPageUrl(page);
    if (baseUrl) return `${baseUrl.replace(/\/$/, '')}/${page}`;
    return `#page-${page}`; // fallback for purely visual dev
  };

  // Compute pagination range with ellipses
  const generateRange = () => {
    // Total pages we want to show without ellipses is siblingCount * 2 + 3 (first, last, current)
    const totalPageNumbers = siblingCount + 5; 
    
    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    
    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 2;
    
    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    // No left ellipsis, right ellipsis
    if (!showLeftEllipsis && showRightEllipsis) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    // Left ellipsis, no right ellipsis
    if (showLeftEllipsis && !showRightEllipsis) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
      return [firstPageIndex, '...', ...rightRange];
    }

    // Both ellipses
    if (showLeftEllipsis && showRightEllipsis) {
      let middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => leftSiblingIndex + i);
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex];
    }

    return [];
  };

  return {
    paginationProps: {
      ...resolvedNavProps,
      class: paginationClass
    },
    pages: generateRange(),
    currentPage,
    totalPages,
    showControls,
    generateUrl
  };
}

!!!

---

## panel.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/panel/panel.hook.ts`


!!!ts
// design/surfaces/components/panel/panel.hook.ts
import type { PanelProps }      from "./panel.props";
import { PANEL_DEFAULTS }       from "./panel.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass }         from "~/shared/base.hook";

export function usePanel(props: PanelProps) {
  const {
    as: Tag = "div",
    layer   = PANEL_DEFAULTS.layer,
    padding = PANEL_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
  });

  return {
    Tag,
    props: {
      class: composeClass(surfaceClass, "panel"),
      style: surfaceStyle,
      ...surfaceAttrs,
      ...rest,
    },
  };
}

!!!

---

## paper.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/paper/paper.hook.ts`


!!!ts
// design/surfaces/components/paper/paper.hook.ts

import type { PaperProps }                   from "./paper.props";
import { PAPER_TOKENS, PAPER_DEFAULTS }      from "./paper.tokens";
import { useSurface }                        from "../../surface.hook";
import { resolveTokens }                     from "~/shared/tokens";
import { composeClass, composeStyle }        from "~/shared/base.hook";

export function usePaper(props: PaperProps) {
  const {
    as: Tag   = PAPER_DEFAULTS.as,
    layer      = PAPER_DEFAULTS.layer,
    stack      = PAPER_DEFAULTS.stack,
    gap        = PAPER_DEFAULTS.gap,
    fullWidth  = PAPER_DEFAULTS.fullWidth,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    ...surfaceProps,
  });

  // gap is paper-scoped and only emitted when stack=true
  const { style: gapStyle } = resolveTokens(
    PAPER_TOKENS,
    { gap: stack ? gap : undefined },
    "surface",
  );

  return {
    Tag,
    props: {
      class: composeClass(
        surfaceClass,
        "paper",
        stack     && "paper--stack",
        fullWidth && "paper--full-width",
      ),
      style: composeStyle(surfaceStyle, ...gapStyle),
      ...surfaceAttrs,
      ...rest,
    },
  };
}

!!!

---

## popover.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/popover/popover.hook.ts`


!!!ts
import type { PopoverProps } from "./popover.props";
import { POPOVER_TOKENS, POPOVER_DEFAULTS } from "./popover.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function usePopover(props: PopoverProps) {
  const {
    id,
    placement = POPOVER_DEFAULTS.placement,
    radius,
    class: className,
    ...base
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    POPOVER_TOKENS, { placement, radius }, "popover",
  );

  const { className: panelCls, style, attrs, rest } = useBaseCompose({
    className: ["popover__panel", ...tokenClasses, className],
    style:     tokenStyle,
  }, base);

  return {
    id,
    hostProps: {
      class:                "popover",
      "data-popover-host":  "",
      "data-placement":     placement,
    },
    panelProps: {
      class: panelCls,
      style: style || undefined,
      ...attrs,
      ...rest,
    },
  };
}

!!!

---

## portal.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/portal/portal.hook.ts`


!!!ts

!!!

---

## progress.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/progress/progress.hook.ts`


!!!ts
// design/feedback/progress/progress.hook.ts

/**
 * @file Component hook for the Progress component.
 * @module design/feedback/progress
 *
 * {@link useProgress} translates {@link ProgressProps} into the props and
 * computed values that `Progress.astro` needs.
 *
 * **Key computations:**
 * - `fillPercent` — clamped 0–100, written as `--progress--fill` inline style.
 * - `displayValue` — string shown by `showValue` (e.g. `"84%"`) or for
 *   `number`/`percent` type display.
 * - `ARIA attributes` — `role="progressbar"`, `aria-valuenow`, `aria-valuemax`,
 *   `aria-valuemin`, `aria-label`, `aria-busy` (indeterminate).
 *
 * **Ring geometry:**
 * For `type="ring"` the hook also computes `strokeDasharray` and
 * `strokeDashoffset` based on the ring circumference so the SVG fill
 * animates correctly. Both are written as inline style vars.
 *
 * @see {@link useFeedback}      in `feedback/feedback.hook.ts`
 * @see {@link ProgressProps}    in `feedback/progress/progress.props.ts`
 * @see {@link PROGRESS_DEFAULTS} in `feedback/progress/progress.tokens.ts`
 */

import type { ProgressProps }  from "./progress.props";
import { PROGRESS_DEFAULTS }   from "./progress.tokens";
import { PROGRESS_TOKENS }     from "./progress.tokens";
import { useFeedback }         from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";
import { resolveTokens }       from "~/shared/tokens";

// Ring geometry constants
// The SVG viewBox is 0 0 36 36; circle is centered at 18,18 with r=15.9
const RING_RADIUS        = 15.9155; // matches typical ring SVG
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS; // ≈ 100

/**
 * Resolves {@link ProgressProps} into everything `Progress.astro` needs.
 *
 * @returns `{ Tag, props, type, fillPercent, displayValue, indeterminate, ringAttrs }`
 */
export function useProgress(props: ProgressProps) {
  const {
    value,
    max           = PROGRESS_DEFAULTS.max,
    type          = PROGRESS_DEFAULTS.type,
    showValue     = PROGRESS_DEFAULTS.showValue,
    indeterminate = PROGRESS_DEFAULTS.indeterminate,
    ...feedbackProps
  } = props;

  // ── Fill computation ────────────────────────────────────────────────────
  const rawFraction   = value !== undefined ? Math.min(Math.max(value / max, 0), 1) : 0;
  const fillPercent   = Math.round(rawFraction * 100);

  // ── Display value strings ───────────────────────────────────────────────
  const displayPercent = indeterminate ? "—" : `${fillPercent}%`;
  const displayNumber  = indeterminate ? "—" : `${value ?? 0}/${max}`;
  const displayValue   = type === "number" ? displayNumber : displayPercent;

  // ── Ring SVG attributes ─────────────────────────────────────────────────
  // strokeDashoffset controls how much of the circumference is "filled"
  const ringOffset = indeterminate
    ? RING_CIRCUMFERENCE * 0.75                         // leave 25% arc for animation
    : RING_CIRCUMFERENCE * (1 - rawFraction);

  const ringAttrs = {
    circumference: RING_CIRCUMFERENCE,
    offset:        ringOffset,
  };

  // ── Token resolution (type modifier) ────────────────────────────────────
  const { classes: typeClasses } = resolveTokens(
    PROGRESS_TOKENS,
    { type },
    "feedback",   // scope "progress" on the type dimension makes it "progress--bar"
  );

  // ── useFeedback with progress-opinionated defaults ──────────────────────
  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant: PROGRESS_DEFAULTS.variant,
    color:   PROGRESS_DEFAULTS.color,
    size:    PROGRESS_DEFAULTS.size,
    radius:  PROGRESS_DEFAULTS.radius,
    ...feedbackProps,
  });

  // ── ARIA ────────────────────────────────────────────────────────────────
  const ariaAttrs: Record<string, string | number | undefined> = {
    role:             "progressbar",
    "aria-valuemin":  0,
    "aria-valuemax":  max,
    "aria-valuenow":  indeterminate ? undefined : value,
    "aria-busy":      indeterminate ? "true" : undefined,
  };

  return {
    Tag: "div" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "progress",
        ...typeClasses,                                 // "progress--bar", "progress--ring" etc.
        indeterminate && "progress--indeterminate",
      ),
      style: composeStyle(
        feedbackStyle,
        `--progress--fill: ${fillPercent}%`,
        `--progress--offset: ${ringOffset}`,
        `--progress--circumference: ${RING_CIRCUMFERENCE}`,
      ),
      ...ariaAttrs,
      ...feedbackAttrs,
      ...rest,
    },
    type,
    fillPercent,
    displayValue,
    displayPercent,
    displayNumber,
    showValue,
    indeterminate,
    ringAttrs,
  };
}

!!!

---

## prose.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/prose/prose.hook.ts`


!!!ts
// design/typography/components/prose/prose.hook.ts
import type { ProseProps }      from "./prose.props";
import { PROSE_DEFAULTS }       from "./prose.tokens";
import { useTypography }        from "../../typography.hook";
import { composeClass }         from "~/shared/base.hook";

export function useProse(props: ProseProps) {
  const {
    as: Tag = "article",
    size    = PROSE_DEFAULTS.size,
    weight  = PROSE_DEFAULTS.weight,
    color   = PROSE_DEFAULTS.color,
    leading = PROSE_DEFAULTS.leading,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography({
    size,
    weight,
    color,
    leading,
    ...typographyProps,
  });

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "typography--cascade prose"),
    },
  };
}

!!!

---

## quote.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/quote/quote.hook.ts`


!!!ts
// design/typography/quote/quote.hook.ts
import type { QuoteProps } from "./quote.props";
import { QUOTE_DEFAULTS, type QuoteTag } from "./quote.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

export function useQuote(props: QuoteProps) {
  const {
    type = QUOTE_DEFAULTS.type,
    class: className,
    ...rest
  } = props;

  const Tag: QuoteTag = type === "inline" ? "q" : "blockquote";


  const { typographyAttributes } = useTypography({
    ...rest,
    class: composeClass("quote", `quote--${type}`, className),
  });

  return {
    Tag,
    props: typographyAttributes,
  };
}

!!!

---

## radio-group.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio-group/radio-group.hook.ts`


!!!ts
// design/forms/components/radio-group/radio-group.hook.ts

/**
 * @file Component hook for the RadioGroup component.
 * @module design/forms/radio-group
 *
 * {@link useRadioGroup} resolves {@link RadioGroupProps} into the props spread
 * onto `<dezign8-radio-group>`. The `name` prop is forwarded as `data-name` so
 * the Web Component can propagate it to child `<input type="radio">` elements
 * after the page loads.
 *
 * @see {@link RadioGroupProps}        in `radio-group.props.ts`
 * @see {@link RADIO_GROUP_DEFAULTS}   in `radio-group.tokens.ts`
 */

import type { RadioGroupProps }  from "./radio-group.props";
import { RADIO_GROUP_DEFAULTS }  from "./radio-group.tokens";
import { composeClass }          from "~/shared/base.hook";

export function useRadioGroup(props: RadioGroupProps) {
  const {
    name,
    legend,
    layout   = RADIO_GROUP_DEFAULTS.layout,
    class:     className,
    style,
    ...rest
  } = props;

  return {
    groupProps: {
      class: composeClass("radio-group", `radio-group--${layout}`, className),
      style,
      ...(name ? { "data-name": name } : {}),
      ...rest,
    },
    legend,
  };
}

!!!

---

## radio.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio/radio.hook.ts`


!!!ts
// design/forms/radio/radio.hook.ts

/**
 * @file Component hook for the Radio component.
 * @module design/forms/radio
 *
 * {@link useRadio} resolves {@link RadioProps} into the attribute objects
 * that `Radio.astro` needs. Mirrors {@link useCheckbox} exactly except:
 * - No `indeterminate` prop (radio buttons have no indeterminate state)
 * - The returned `inputAttrs.type` is `"radio"`
 *
 * @see {@link useCheckbox} in `forms/checkbox/checkbox.hook.ts` — parallel hook
 * @see {@link useForm}     in `forms/forms.hook.ts`             — delegated to
 * @see {@link RadioProps}  in `forms/radio/radio.props.ts`      — input type
 * @see {@link RADIO_DEFAULTS} in `forms/radio/radio.tokens.ts`
 * @see `forms/radio/Radio.astro` — consumes this hook's return value
 * @see `forms/radio/radio.css`   — circular indicator styles, layout modifiers
 */

import type { RadioProps }  from "./radio.props";
import { RADIO_DEFAULTS }   from "./radio.tokens";
import { useForm }          from "~f/forms.hook";
import { composeClass }     from "~/shared/base.hook";

/**
 * Resolves {@link RadioProps} into wrapper and input attribute objects.
 *
 * @param props - Full `RadioProps` for this `<Radio>` instance.
 *
 * @returns
 *
 * **`Tag`** — Always `"label"`. Clicking anywhere in the component selects
 * the radio, including the label text, without needing `for`/`id` wiring.
 *
 * **`props`** — Attributes for the `<label>` wrapper (same shape as Checkbox).
 *
 * **`inputAttrs`** — Attributes for the inner `<input type="radio">`.
 * No `data-indeterminate` — radio buttons do not have an indeterminate state.
 *
 * @example
 * !!!astro
 * ---
 * // Radio.astro
 * const { Tag, props, inputAttrs } = useRadio(Astro.props as RadioProps);
 * ---
 * <Tag {...props}>
 *   <input class="radio__control" {...inputAttrs} />
 *   <span class="radio__indicator" aria-hidden="true"></span>
 *   {Astro.slots.has("default") && (
 *     <span class="radio__label"><slot /></span>
 *   )}
 * </Tag>
 * !!!
 *
 * @see {@link useForm} — handles token resolution and shared ARIA attrs
 */
export function useRadio(props: RadioProps) {
  const {
    id,
    name,
    value,
    checked,
    labelPosition = RADIO_DEFAULTS.labelPosition,
    ...formProps
  } = props;

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        variant: "ghost",  // default: no wrapper border (traditional radio look)
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  const wrapperProps = {
    class: composeClass(
      formClass,
      "radio",
      `radio--${labelPosition}`,
    ),
    style: formStyle,
    ...formAttrs,
    ...rest,
  };

  const inputAttrs = {
    type:            "radio" as const,
    id,
    name,
    value,
    checked:         checked  || undefined,
    disabled:        disabled || undefined,
    required:        required || undefined,
    "aria-required": required ? "true" as const : undefined,
    "aria-invalid":  invalid  ? "true" as const : undefined,
  };

  return {
    Tag: "label" as const,
    props:      wrapperProps,
    inputAttrs,
  };
}
!!!

---

## range-slider.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/range-slider/range-slider.hook.ts`


!!!ts

!!!

---

## screen.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/screen/screen.hook.ts`


!!!ts
import type { ScreenProps } from "./screen.props";
import { SCREEN_TOKENS, SCREEN_DEFAULTS } from "./screen.tokens";
import { useLayout } from "~/layout/layout.hook";
import { resolveTokens } from "~/shared/tokens";
import { composeClass, composeStyle } from "~/shared/base.hook";

/**
 * - LayoutProps: Gap, Align, Justify
 * - SpacingProps: p, px, py, pt, pr, pb, pl, m, mx, my, mt, mr, mb, ml
 *
 * @example
 * <Inline gap="2xl">     
 * <!--==============BECOMES===========-->
 *      <span style="--inline--gap: var(--space-in--2xl)">
 */

/**
 * @todo compare with ../header/header.hook.ts
 * layout props handled right? i dunno im tired
 */
export function useScreen(props: ScreenProps) {
  const {
    as: Tag = SCREEN_DEFAULTS.as,
    gap = SCREEN_DEFAULTS.gap,
    height = SCREEN_DEFAULTS.height,
    overflow = SCREEN_DEFAULTS.overflow,
    centered = SCREEN_DEFAULTS.centered,
    ...layoutProps
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest } = useLayout(layoutProps);
  
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SCREEN_TOKENS,
    { gap },
    "screen",
  );

  return {
    Tag,
    props: {
      class: composeClass(layoutClass, "screen", ...tokenClasses),
      style: composeStyle(layoutStyle, ...tokenStyle),
      ...layoutAttrs,
      ...rest,
    },
  };
}

!!!

---

## search.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/search/search.hook.ts`


!!!ts
// design/forms/search/search.hook.ts

/**
 * @file Component hook for the Search component.
 * @module design/forms/search
 *
 * {@link useSearch} mirrors the {@link useInput} pattern — it delegates shared
 * token/ARIA resolution to {@link useForm} and returns two attribute objects
 * for the wrapper `<div>` and the inner `<input type="search">`.
 *
 * **Differences from Input:**
 * - Default `type` is `"search"` (not configurable — this is Search)
 * - `loading` prop adds `search--loading` class + `data-loading` attribute
 * - `data-search` attribute on wrapper enables the client-side JS controller
 *   (clear button, Escape-to-clear) defined in `Search.astro`
 *
 * **No cross-component import:**
 * Search cannot import from Input (sibling components must not import from
 * each other per the architecture rules). Both resolve through {@link useForm}.
 * The duplicate logic between Input and Search hooks is intentional and minimal.
 *
 * @see {@link useForm}       in `forms/forms.hook.ts`            — delegated to
 * @see {@link SearchProps}   in `forms/search/search.props.ts`   — input type
 * @see {@link SEARCH_DEFAULTS} in `forms/search/search.tokens.ts`
 * @see `forms/search/Search.astro` — consumes this hook's return value
 */

import type { SearchProps } from "./search.props";
import { SEARCH_DEFAULTS }  from "./search.tokens";
import { useForm }          from "~f/forms.hook";
import { composeClass }     from "~/shared/base.hook";

/**
 * Resolves {@link SearchProps} into wrapper and input attribute objects.
 *
 * @param props - Full `SearchProps`.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`. Wrapper owns the visual chrome.
 *
 * **`props`** — Attributes for the outer `<div>`:
 * - `class` — form classes + `"search"` + loading modifier
 * - `style` — CSS channel declarations
 * - `data-search` — enables the JS controller in `Search.astro`
 * - `data-loading` — present when `loading={true}` (CSS spinner hook)
 *
 * **`inputAttrs`** — Attributes for the inner `<input type="search">`:
 * - `type` — always `"search"`
 * - `id`, `name`, `value`, `placeholder`, `maxLength`, `autoComplete`
 * - `readOnly`, `disabled`, `required` — native HTML attributes
 * - `aria-*` — ARIA attributes
 *
 * @example
 * !!!astro
 * ---
 * const { Tag, props, inputAttrs } = useSearch(Astro.props as SearchProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("start") && <div class="search__start"><slot name="start" /></div>}
 *   <input class="search__control" {...inputAttrs} />
 *   <button class="search__clear" type="button" aria-label="Clear search" hidden>×</button>
 *   {Astro.slots.has("end") && <div class="search__end"><slot name="end" /></div>}
 * </Tag>
 * !!!
 */
export function useSearch(props: SearchProps) {
  const {
    id,
    name,
    value,
    placeholder,
    loading      = SEARCH_DEFAULTS.loading,
    readonly,
    maxLength,
    autocomplete,
    ...formProps
  } = props;

  // Apply search-specific default: fullWidth = true
  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        fullWidth: SEARCH_DEFAULTS.fullWidth,
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  const wrapperProps = {
    class: composeClass(
      formClass,
      "search",
      loading && "search--loading",
    ),
    style:          formStyle,
    ...formAttrs,
    // JS controller anchor — the Search.astro script queries [data-search]
    "data-search":  "",
    // Present when loading — CSS shows spinner, hides clear button
    ...(loading && { "data-loading": "" }),
    ...rest,
  };

  const inputAttrs = {
    type:            "search" as const,
    id,
    name,
    value:           value        ?? undefined,
    placeholder:     placeholder  ?? undefined,
    readOnly:        readonly     || undefined,
    maxLength,
    autoComplete:    autocomplete ?? "off", // prevent browser history dropdown
    disabled:        disabled     || undefined,
    required:        required     || undefined,
    "aria-required": required     ? "true" as const : undefined,
    "aria-invalid":  invalid      ? "true" as const : undefined,
  };

  return {
    Tag: "div" as const,
    props:      wrapperProps,
    inputAttrs,
  };
}

!!!

---

## section.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/section/section.hook.ts`


!!!ts
// design/surfaces/components/section/section.hook.ts
import type { SectionProps }    from "./section.props";
import { SECTION_DEFAULTS }     from "./section.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass }         from "~/shared/base.hook";

export function useSection(props: SectionProps) {
  const {
    as: Tag = "section",
    layer   = SECTION_DEFAULTS.layer,
    padding = SECTION_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
  });

  return {
    Tag,
    props: {
      class: composeClass(surfaceClass, "section"),
      style: surfaceStyle,
      ...surfaceAttrs,
      ...rest,
    },
  };
}

!!!

---

## segmented-control.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/segmented-control/segmented-control.hook.ts`


!!!ts

!!!

---

## select.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/select/select.hook.ts`


!!!ts
// design/forms/select/select.hook.ts

/**
 * @file Component hook for the Select component.
 * @module design/forms/select
 *
 * {@link useSelect} resolves {@link SelectProps} (a discriminated union) into
 * the attribute objects and computed data that `Select.astro` needs to render
 * a fully accessible, token-resolved select control.
 *
 * **Return shape — three members:**
 *
 * !!!
 * { Tag, props }       ← wrapper <div>: visual container with border, bg, radius
 * { selectAttrs }      ← inner <select>: id, name, multiple, disabled, ARIA attrs
 * { resolvedOptions }  ← options array with .selected computed; map in Select.astro
 * { placeholder }      ← forwarded through so Select.astro decides when to render it
 * !!!
 *
 * **Wrapper architecture (same as Input):**
 * The `<select>` element lives inside a wrapper `<div>` that carries the
 * visual chrome (border, background, radius, CSS channels). The wrapper
 * enables a custom dropdown-arrow slot (`::after` pseudo or an icon `<div>`)
 * alongside the native `<select>`. With `appearance: none` on the select,
 * the arrow is fully customisable via CSS or a slot.
 *
 * **Handling the discriminated union:**
 * `SelectProps` is `SelectSingleProps | SelectMultiProps`. TypeScript cannot
 * cleanly destructure a union type, so this hook uses an internal cast for
 * the shared property access. The PUBLIC function signature remains correctly
 * typed — callers still get full union type checking at the call site.
 *
 * **`value` → `<option selected>` mapping:**
 * Native `<select>` has no `value` attribute. Selected state is expressed
 * via the `selected` attribute on individual `<option>` elements. The hook
 * computes `selected: boolean` for each option and returns them as
 * {@link ResolvedSelectOption}[]. `Select.astro` maps over this array and
 * sets `selected={opt.selected}` on each rendered `<option>`.
 *
 * **`value` is never in `selectAttrs`:**
 * As a consequence of the above, `value` (string or string[]) is consumed
 * by this hook to compute `resolvedOptions` but is never passed to the
 * `<select>` element's attributes.
 *
 * @see {@link useForm}            in `forms/forms.hook.ts`          — delegated to
 * @see {@link SelectProps}        in `forms/select/select.props.ts` — input type
 * @see {@link ResolvedSelectOption} in `forms/select/select.props.ts`
 * @see {@link SELECT_DEFAULTS}    in `forms/select/select.tokens.ts`
 * @see `forms/select/Select.astro` — consumes this hook's return value
 * @see `forms/select/select.css`   — reads `--form--*` channels emitted here
 *
 * @todo Mirror the Input hook's `@todo` re: separating `formDataAttrs` from
 *   `formAriaAttrs` in {@link useForm}. Once that refactor lands, update
 *   this hook to spread only `formDataAttrs` on the wrapper and route
 *   `formAriaAttrs` to `selectAttrs`.
 *
 * @todo When `SelectOptionGroup` is added (see select.props.ts @todo),
 *   update the `resolvedOptions` computation to handle both flat options
 *   and option groups. The return type would become
 *   `Array<ResolvedSelectOption | ResolvedSelectOptionGroup>`.
 */

import type { SelectProps, SelectOption, ResolvedSelectOption } from "./select.props";
import { useForm }    from "~/forms/forms.hook";
import { composeClass } from "~/shared/base.hook";

// ─── INTERNAL HELPERS ────────────────────────────────────────────────────────

/**
 * Internal base shape used for destructuring {@link SelectProps}.
 *
 * Because `SelectProps` is a discriminated union, TypeScript cannot directly
 * destructure it. This type represents the shared structure of both branches
 * for the purposes of the internal cast. The public API ({@link useSelect}'s
 * parameter) is still correctly typed as `SelectProps`.
 *
 * @internal
 */
type SelectInternalBase = {
  id?:          string;
  name?:        string;
  options:      SelectOption[];
  placeholder?: string;
  multiple?:    boolean;
  value?:       string | string[];
  [key: string]: unknown;
};

/**
 * Computes `selected: boolean` for each option given the current value.
 *
 * @param options   - The full options array from props.
 * @param value     - Current value: `string` (single), `string[]` (multi), or `undefined`.
 * @param isMulti   - Whether the select is in multi-selection mode.
 *
 * @internal
 */
function resolveOptions(
  options:  SelectOption[],
  value:    string | string[] | undefined,
  isMulti:  boolean,
): ResolvedSelectOption[] {
  return options.map(opt => ({
    ...opt,
    selected: isMulti
      ? Array.isArray(value) && value.includes(opt.value)
      : opt.value === value,
  }));
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

/**
 * Resolves {@link SelectProps} into the wrapper props, select element
 * attributes, resolved options list, and placeholder string that
 * `Select.astro` needs.
 *
 * @param props - Full `SelectProps` (either single or multi branch).
 *   TypeScript narrows the `value` type based on the `multiple` discriminant.
 *
 * @returns
 *
 * **`Tag`** — Always `"div"`. Spread `props` onto the wrapper element.
 *
 * **`props`** — Attributes for the outer wrapper `<div>`:
 * - `class` — `"form select form--outlined …"` (token modifiers)
 * - `style` — `"--form--size: …; --form--radius: …; --form--color-base: …;"`
 * - `data-disabled`, `data-invalid` — CSS state hooks
 * - `aria-*` — from `formAttrs` (benign on wrapper; see hook docs `@todo`)
 *
 * **`selectAttrs`** — Attributes for the inner `<select>`:
 * - `id`, `name`
 * - `multiple` — present and `true` in multi mode, absent in single mode
 * - `disabled`, `required` — native HTML attributes
 * - `aria-disabled`, `aria-required`, `aria-invalid`
 *
 * **`resolvedOptions`** — `SelectOption[]` with `selected: boolean` added.
 * Map over this in `Select.astro` to render `<option>` elements.
 *
 * **`placeholder`** — The placeholder string, or `undefined` if not set.
 * `Select.astro` prepends `<option value="" disabled>{placeholder}</option>`
 * when this is truthy.
 *
 * @example
 * !!!astro
 * ---
 * // Select.astro
 * import type { SelectProps } from "./select.props";
 * import { useSelect } from "./select.hook";
 * import "./select.css";
 * import "../forms.css";
 *
 * const { Tag, props, selectAttrs, resolvedOptions, placeholder }
 *   = useSelect(Astro.props as SelectProps);
 * ---
 * <Tag {...props}>
 *   {Astro.slots.has("start") && (
 *     <div class="select__start"><slot name="start" /></div>
 *   )}
 *   <select {...selectAttrs}>
 *     {placeholder && (
 *       <option value="" disabled>{placeholder}</option>
 *     )}
 *     {resolvedOptions.map(opt => (
 *       <option
 *         value={opt.value}
 *         selected={opt.selected || undefined}
 *         disabled={opt.disabled || undefined}
 *       >
 *         {opt.label}
 *       </option>
 *     ))}
 *   </select>
 *   <div class="select__arrow" aria-hidden="true">▾</div>
 * </Tag>
 * !!!
 *
 * @see {@link useForm}             — handles token resolution and shared ARIA
 * @see {@link resolveOptions}      — computes `.selected` per option
 * @see {@link ResolvedSelectOption} — type of items in `resolvedOptions`
 */
export function useSelect(props: SelectProps) {
  // ── Determine mode and raw value ────────────────────────────────────────
  //
  // Read `multiple` and `value` before destructuring to preserve union narrowing.
  // After the isMulti check, TypeScript knows which branch of the union is active.
  const isMulti  = props.multiple === true;
  const rawValue = props.value as string | string[] | undefined;

  // ── Destructure shared props via internal cast ───────────────────────────
  //
  // SelectProps is a discriminated union — TypeScript cannot cleanly destructure
  // it directly. We cast to the internal base shape for destructuring only.
  // The PUBLIC parameter is still typed as SelectProps; this cast is internal.
  //
  // `id`, `name`, `options`, `placeholder` are pulled before useForm so:
  //   - id, name   → routed to selectAttrs (must be on the <select>, not wrapper)
  //   - options    → consumed here for resolvedOptions (never goes to useForm)
  //   - placeholder → forwarded in return (consumed by Select.astro)
  //   - multiple   → consumed here (becomes selectAttrs.multiple)
  //   - value      → consumed here (drives resolvedOptions)
  const {
    id,
    name,
    options,
    placeholder,
    multiple:  _multiple,   // consumed above as isMulti; discard from formProps
    value:     _value,      // consumed above as rawValue; discard from formProps
    icon,
    ...formProps
  } = props as unknown as SelectInternalBase;

  // ── Delegate shared resolution to useForm ────────────────────────────────
  const {
    formClass, formStyle, formAttrs,
    disabled, required, invalid,
    rest,
  } = useForm(formProps as unknown as Parameters<typeof useForm>[0]);

  // ── Resolve options with selected state ─────────────────────────────────
  //
  // Each option gets `selected: boolean` added. Select.astro maps this
  // array and sets `selected={opt.selected || undefined}` on each <option>.
  // Using `|| undefined` ensures the `selected` attribute is absent (not
  // `selected="false"`) when the option is not selected.
  const resolvedOptions = resolveOptions(options, rawValue, isMulti);

  // ── Wrapper props ────────────────────────────────────────────────────────
  //
  // Same pattern as Input: the wrapper <div> carries the visual chrome.
  // formAttrs includes data-* (CSS state) and aria-* (benign on wrapper).
  const wrapperProps = {
    class: composeClass(formClass, "select"),
    style: formStyle,
    ...formAttrs,
    ...rest,
  };

  // ── Select element attrs ─────────────────────────────────────────────────
  //
  // The inner <select> receives semantic, functional, and ARIA attributes.
  // `value` is intentionally absent — selected state is on <option> elements.
  // `multiple` uses `|| undefined` so the attribute is absent on single-select.
  const selectAttrs = {
    id,
    name,
    multiple:        isMulti   || undefined,
    disabled:        disabled  || undefined,
    required:        required  || undefined,
    "aria-required": required  ? "true" as const : undefined,
    "aria-invalid":  invalid   ? "true" as const : undefined,
  };

  return {
    Tag:             "div" as const,
    props:           wrapperProps,
    selectAttrs,
    resolvedOptions,
    placeholder,
  };
}
!!!

---

## separator.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/separator/separator.hook.ts`


!!!ts
import { useBaseCompose } from "~sh/base.hook";
import { defineTokens, resolveTokens } from "~sh/tokens";
import type { SeparatorProps } from "./separator.props";
import {
  ORIENTATION_DIM,
  SEPARATOR_DEFAULTS,
  STRENGTH_DIM,
  VARIANT_DIM,
} from "./separator.tokens";

const SEPARATOR_TOKENS = defineTokens({
  orientation: ORIENTATION_DIM,
  variant: VARIANT_DIM,
  strength: STRENGTH_DIM,
});

/**
 * A hook that processes props for the Separator component.
 */
export function useSeparator(
  props: SeparatorProps & { hasContent?: boolean },
) {
  const {
    orientation = SEPARATOR_DEFAULTS.orientation,
    variant = SEPARATOR_DEFAULTS.variant,
    strength = SEPARATOR_DEFAULTS.strength,
    hasContent = false,
    class: className,
    ...rest
  } = props;

  const Tag = hasContent ? "div" : "hr";

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SEPARATOR_TOKENS,
    { orientation, variant, strength },
    "separator",
  );

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: ["separator", ...tokenClasses, className],
      style: [
        ...tokenStyle,
        `--separator--color: var(--border--${strength})`,
        hasContent ? `--separator--variant: ${variant}` : false,
      ],
    },
    props,
  );

  return {
    Tag,
    props: {
      class: cls,
      style: style || undefined,
      role: hasContent ? ("separator" as const) : undefined,
      "aria-orientation": (orientation === "vertical" ? "vertical" : "horizontal") as "vertical" | "horizontal",
      ...attrs,
      ...rest,
    },
  };
}
!!!

---

## sheet.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/sheet/sheet.hook.ts`


!!!ts
import type { SheetProps } from "./sheet.props";
import { SHEET_DEFAULTS } from "./sheet.tokens";
import { useOverlays } from "../../overlays.hook";
import { composeClass } from "~/shared/base.hook";

export function useSheet(props: SheetProps) {
  const {
    id,
    title,
    side = SHEET_DEFAULTS.side,
    ...overlayProps 
  } = props;

  const { overlayClass, overlayStyle, overlayAttrs, rest } = useOverlays({
    size:    overlayProps.size ?? SHEET_DEFAULTS.size,
    variant: overlayProps.variant ?? SHEET_DEFAULTS.variant,
    ...overlayProps
  });

  return {
    dialogProps: {
      id,
      class:              composeClass(overlayClass, "sheet"),
      style:              overlayStyle,
      ...overlayAttrs,
      ...rest,
      "aria-labelledby":  title ? `${id}-title` : undefined,
      "data-side":        side,
    },
    title,
    titleId: title ? `${id}-title` : undefined,
  };
}

!!!

---

## skeleton.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/skeleton/skeleton.hook.ts`


!!!ts
// design/feedback/skeleton/skeleton.hook.ts

import type { SkeletonProps }              from "./skeleton.props";
import { SKELETON_TOKENS, SKELETON_DEFAULTS } from "./skeleton.tokens";
import { resolveTokens }                   from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useSkeleton(props: SkeletonProps) {
  const {
    variant  = SKELETON_DEFAULTS.variant,
    lines    = SKELETON_DEFAULTS.lines,
    animated = SKELETON_DEFAULTS.animated,
    width,
    height,
    ratio,
    radius,
    class: className,
    // ponytail: spacing props (p/px…/m/mx…) will leak to DOM if passed. Fix: rename
    // to ...base, pass to useBaseCompose, use returned rest+spacing. See feedback.hook.ts.
    // Tracked: /todo.md
    ...rest
  } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SKELETON_TOKENS,
    { variant, radius },
    "skeleton",
  );

  // Inline style — width, height, ratio are raw CSS, not token channels
  const inlineStyle = [
    width  && `width: ${width}`,
    height && `height: ${height}`,
    // avatar uses height for both axes
    variant === "avatar" && height && `width: ${height}`,
    ratio  && `aspect-ratio: ${ratio}`,
  ].filter(Boolean).join("; ");

  const { className: cls, style, attrs } = useBaseCompose(
    {
      className: [
        "skeleton",
        ...tokenClasses,
        !animated && "skeleton--static",
        className,
      ],
      style: [
        ...tokenStyle,
        inlineStyle,
      ],
    },
    props,
  );

  return {
    variant,
    lines:   variant === "text" ? Math.max(1, lines) : 1,
    props: {
      class:           cls,
      style:           style || undefined,
      "aria-hidden":   "true" as const,
      role:            "presentation" as const,
      ...attrs,
      ...rest,
    },
  };
}
!!!

---

## skip-link.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/skip-link/skip-link.hook.ts`


!!!ts
// design/triggers/components/skip-link/skip-link.hook.ts
import type { SkipLinkProps } from "./skip-link.props";
import { SKIP_LINK_DEFAULTS } from "./skip-link.tokens";
import { useTrigger } from "../../trigger.hook";
import { composeClass } from "~/shared/base.hook";

export function useSkipLink(props: SkipLinkProps) {
  const {
    target = SKIP_LINK_DEFAULTS.target,
    label  = SKIP_LINK_DEFAULTS.label,
    class: className,
    ...restProps
  } = props;

  const hashTarget = target.startsWith("#") ? target : `#${target}`;

  const { triggerClass, triggerStyle, triggerAttrs, rest } = useTrigger({
    href: hashTarget,
    class: composeClass("skip-link", className),
    ...restProps,
  });

  return {
    Tag: "a" as const,
    label,
    props: {
      class: triggerClass,
      style: triggerStyle,
      ...triggerAttrs,
      ...rest,
    },
  };
}

!!!

---

## slider.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/slider/slider.hook.ts`


!!!ts

!!!

---

## spacer.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/spacer/spacer.hook.ts`


!!!ts
import { useBaseCompose } from "~sh/base.hook";
import type { SpacerProps } from "./spacer.props";
import { SPACER_DEFAULTS } from "./spacer.tokens";

/**
 * A hook that processes props for the Spacer component.
 *
 * @param props The props for the Spacer component.
 * @returns An object with the `Tag` to render and the `props` for the tag.
 */
export function useSpacer(props: SpacerProps) {
  const { as: Tag = SPACER_DEFAULTS.as, class: className, ...rest } = props;

  const { className: cls, style, attrs } = useBaseCompose(
    { className: ["spacer", className] },
    props,
  );

  return {
    Tag,
    props: { class: cls, style: style || undefined, ...attrs, ...rest },
  };
}
!!!

---

## spinner.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/spinner/spinner.hook.ts`


!!!ts
// design/feedback/spinner/spinner.hook.ts

/**
 * @file Component hook for the Spinner component.
 * @module design/feedback/spinner
 *
 * {@link useSpinner} translates {@link SpinnerProps} into the props that
 * `Spinner.astro` needs, including the resolved speed/direction modifier
 * classes written to the spinner element directly.
 *
 * @see {@link useFeedback}      in `feedback/feedback.hook.ts`
 * @see {@link SpinnerProps}     in `feedback/spinner/spinner.props.ts`
 * @see {@link SPINNER_DEFAULTS} in `feedback/spinner/spinner.tokens.ts`
 */

import type { SpinnerProps } from "./spinner.props";
import { SPINNER_DEFAULTS }  from "./spinner.tokens";
import { SPINNER_TOKENS }    from "./spinner.tokens";
import { useFeedback }       from "../../feedback.hook";
import { composeClass }      from "~/shared/base.hook";
import { resolveTokens }     from "~/shared/tokens";
import { icons }             from "~/shared/icons/index";

/**
 * Resolves {@link SpinnerProps} into the props `Spinner.astro` spreads.
 *
 * @returns `{ Tag, props, label, hasIcon, icon }`
 *
 * @example
 * !!!astro
 * const { Tag, props, label, hasIcon, icon } = useSpinner(Astro.props as SpinnerProps);
 * !!!
 */
export function useSpinner(props: SpinnerProps) {
  const {
    speed     = SPINNER_DEFAULTS.speed,
    direction = SPINNER_DEFAULTS.direction,
    icon      = "spinner",
    label     = SPINNER_DEFAULTS.label,
    color     = SPINNER_DEFAULTS.color,
    ...feedbackProps
  } = props;

  // ── Resolve the icon SVG component from the registry ───────────────────
  const IconComponent = icons[icon];

  // ── Resolve speed + direction modifier classes ──────────────────────────
  // These are scoped to "spinner" in the token spec, so they produce
  // "spinner--slow", "spinner--fast", "spinner--counterclockwise".
  const { classes: motionClasses } = resolveTokens(
    SPINNER_TOKENS,
    { speed, direction },
    "spinner",
  );

  // ── useFeedback with spinner-opinionated defaults ───────────────────────
  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } = useFeedback({
    variant: SPINNER_DEFAULTS.variant,
    color:   color === "inherit" ? "neutral" : color,
    size:    SPINNER_DEFAULTS.size,
    radius:  SPINNER_DEFAULTS.radius,
    ...feedbackProps,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "spinner",
        color === "inherit" && "spinner--inherit",
        ...motionClasses,        // spinner--fast, spinner--counterclockwise, etc.
      ),
      style:      feedbackStyle,
      role:       "status" as const,
      ...feedbackAttrs,
      ...rest,
    },
    label,
    IconComponent,
  };
}

!!!

---

## stack.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/stack/stack.hook.ts`


!!!ts
import { composeClass, composeStyle } from "~sh/base.hook";
import { resolveTokens } from "~/shared/tokens";

import type { StackProps } from "./stack.props";
import { STACK_DEFAULTS, STACK_TOKENS } from "./stack.tokens";

export function useStack(props: StackProps) {
  const {
    as: Tag = STACK_DEFAULTS.as,
    gap = STACK_DEFAULTS.gap,
    align,
    justify,
    class: className,
    ...rest
  } = props;

  const { style } = resolveTokens(
    STACK_TOKENS,
    { gap },
    "stack",
  );

  return {
    Tag,
    props: {
      class: composeClass(
        "stack",
        align && `stack--align-${align}`,
        justify && `stack--justify-${justify}`,
        className,
      ),
      style: composeStyle(...style),
      ...rest,
    },
  };
}
!!!

---

## stat.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/stat/stat.hook.ts`


!!!ts
import type { StatProps } from "./stat.props";
import { STAT_TOKENS, STAT_DEFAULTS } from "./stat.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useStat(props: StatProps) {
  const {
    value,
    label,
    icon,
    size = STAT_DEFAULTS.size,
    ...dataProps
  } = props;

  const { dataClass, dataStyle, dataAttrs, rest } = useData({ size, ...dataProps });

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    STAT_TOKENS,
    {},
    "stat"
  );

  const cls = composeClass(dataClass, "stat", ...tokenClasses);
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag: "div" as const,
    value,
    label,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}

!!!

---

## step/step.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/step/step.hook.ts`


!!!ts
import type { StepProps } from "./step.props";

export function useStep(props: StepProps) {
  const { 
    state, 
    label, 
    description, 
    isLast, 
    href, 
    interactive,
    stepNumber,
    class: className, 
    ...rest 
  } = props;

  let Tag: any = "div";
  if (href) Tag = "a";
  else if (interactive) Tag = "button";

  const typeAttr = Tag === "button" ? { type: "button" } : {};

  return {
    Tag,
    isLast,
    label,
    description,
    stepNumber,
    stepProps: {
      href,
      "data-state": state,
      "aria-current": state === "current" ? "step" : undefined,
      class: ["stepper__step-wrapper", className].filter(Boolean).join(" "),
      ...typeAttr,
      ...rest
    }
  };
}

!!!

---

## stepper.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/stepper.hook.ts`


!!!ts
import { useNav } from "../../nav.hook";
import type { StepperProps } from "./stepper.props";

const STEPPER_DEFAULTS = {
  size: "md",
  variant: "soft"
} as const;

export function useStepper(props: StepperProps) {
  const { 
    items, 
    orientation = "horizontal",
    currentStepIndex = 0,
    size = STEPPER_DEFAULTS.size,
    variant = STEPPER_DEFAULTS.variant,
    ...navProps 
  } = props;

  const { navProps: resolvedNavProps } = useNav({ size, variant, ...navProps });

  return {
    stepperProps: {
      "aria-label": "Progress",
      "data-orientation": orientation,
      ...resolvedNavProps,
      class: ["stepper", resolvedNavProps.class].filter(Boolean).join(" ")
    },
    items,
    orientation,
    currentStepIndex
  };
}

!!!

---

## switch.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/switch/switch.hook.ts`


!!!ts
// design/forms/components/switch/switch.hook.ts

/**
 * @file Component hook for the Switch component.
 * @module design/forms/switch
 *
 * {@link useSwitch} resolves {@link SwitchProps} into wrapper and input
 * attribute objects. Pattern mirrors {@link useCheckbox}: the `<label>`
 * is the root element; the hidden native `<input type="checkbox">` carries
 * the semantic state via `role="switch"`.
 *
 * @see {@link useForm}         in `forms/forms.hook.ts`
 * @see {@link SwitchProps}     in `forms/switch/switch.props.ts`
 * @see {@link SWITCH_DEFAULTS} in `forms/switch/switch.tokens.ts`
 */

import type { SwitchProps } from "./switch.props";
import { SWITCH_DEFAULTS }  from "./switch.tokens";
import { useForm }          from "~/forms/forms.hook";
import { composeClass }     from "~/shared/base.hook";

export function useSwitch(props: SwitchProps) {
  const {
    id,
    name,
    value,
    checked,
    labelPosition = SWITCH_DEFAULTS.labelPosition,
    ...formProps
  } = props;

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm({
        variant: "ghost",
        ...formProps,
      } as Parameters<typeof useForm>[0]);

  return {
    Tag: "label" as const,
    props: {
      class: composeClass(formClass, "switch", `switch--${labelPosition}`),
      style: formStyle,
      ...formAttrs,
      ...rest,
    },
    inputAttrs: {
      type:            "checkbox" as const,
      role:            "switch"   as const,
      id,
      name,
      value,
      checked:         checked   || undefined,
      disabled:        disabled  || undefined,
      required:        required  || undefined,
      "aria-required": required  ? "true" as const : undefined,
      "aria-invalid":  invalid   ? "true" as const : undefined,
    },
  };
}

!!!

---

## table.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/table.hook.ts`


!!!ts
// design/data/table/table.hook.ts
/**
 * Resolves `TableProps` into two prop objects for the two-element
 * structure Table.astro renders:
 *
 *   <div  {...wrapperProps}>   ← .data root: variants, CSS vars, state attrs
 *     <table {...tableProps}>  ← .table: structure, layout, sort, sticky
 *       …
 *     </table>
 *   </div>
 *
 * WHY A WRAPPER DIV
 * ─────────────────────────────────────────────────────────────────
 * `overflow: auto` on a `<table>` element is ignored by all browsers —
 * the spec does not allow overflow on table elements. Horizontal scroll
 * requires a block container wrapping the table. The wrapper div is that
 * container, and it also carries the `.data` class so category-level CSS
 * (variants, color channels, state attributes) targets the correct element.
 *
 * CSS custom properties set on the wrapper cascade into the table and all
 * its descendants, so `var(--data--color--border)` in thead th still works.
 *
 * RESPONSIBILITY SPLIT
 * ─────────────────────────────────────────────────────────────────
 * useData     — color channels, density, variant, all shared modifiers
 *               (striped, bordered), state attrs (data-loading, data-empty,
 *               data-interactive, data-selectable, data-scrollable),
 *               and base attrs (data-visual, data-testid). Produces
 *               dataClass, dataStyle, dataAttrs, caption, and rest.
 *
 * useTable    — table-specific token (layout), appends .table and
 *               modifier classes (sticky-header, sortable), and
 *               surfaces columns, data, sort, sortable for the template.
 *
 * RETURN SHAPE
 * ─────────────────────────────────────────────────────────────────
 * wrapperProps  Spread onto the outer <div>:
 *               class = "data [modifier classes]"
 *               style = CSS var channels (cascade down to <table>)
 *               data-* = state and visual registry attrs
 *
 * tableProps    Spread onto the inner <table>:
 *               class = "table [table modifier classes]"
 *               rest  = HTML passthrough (id, aria-*, tabindex, …)
 *               Note: id and aria-* belong on the semantic <table>,
 *               not the neutral wrapper div.
 *
 * caption       Render as first child of <table>:
 *               <caption>{caption}</caption>
 *
 * columns       ColumnDef[] | undefined — drives <thead> and cell
 *               alignment, width, sort indicators. Undefined = compound mode.
 *
 * data          RowData[] | undefined — drives <tbody> rows.
 *               Provided without columns = empty <tbody> (intentional).
 *
 * sort          TableSort | undefined — current sort state for indicators.
 * sortable      boolean — resolved with TABLE_DEFAULTS.
 *               Per-column resolution: col.sortable ?? sortable.
 *
 * @example Minimal
 *   useTable({ data: rows, columns: cols, caption: "Q3 Sales" })
 *   // wrapperProps.class: "data"
 *   // tableProps.class:   "table"
 *   // caption:            "Q3 Sales"
 *
 * @example Full
 *   useTable({ color: "primary", variant: "outlined", striped: true,
 *              layout: "fixed", stickyHeader: true, sortable: true,
 *              sort: { key: "revenue", direction: "desc" },
 *              scrollable: true, id: "revenue-table" })
 *   // wrapperProps.class:           "data data--outlined data--striped"
 *   // wrapperProps.style:           "--data--color--base: var(--primary--base); …"
 *   // wrapperProps["data-scrollable"]: "true"
 *   // tableProps.class:             "table table--fixed table--sticky-header table--sortable"
 *   // tableProps.id:                "revenue-table"
 */
import type { TableProps } from "./table.props";
import { TABLE_TOKENS, TABLE_DEFAULTS } from "./table.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!``
// ___________________________________________________________
export function useTable(props: TableProps) {
  const {
    data,
    columns,
    layout,
    stickyHeader = TABLE_DEFAULTS.stickyHeader,
    sortable = TABLE_DEFAULTS.sortable,
    sort,
    ...dataProps
  } = props;

  // ── Category resolution ─────────────────────────────────────
  const { dataClass, dataStyle, dataAttrs, caption, rest } = useData(dataProps);

  // ── Table-specific token resolution ─────────────────────────
  // layout is skipped when undefined — CSS fallback var(--table--layout, auto).
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    TABLE_TOKENS,
    { layout },
    "table",
  );

  // ── Compose ─────────────────────────────────────────────────
  const wrapperClass = dataClass; // "data" + data modifier classes

  const tableClass = composeClass(
    "table",
    ...tokenClasses,
    stickyHeader && "table--sticky-header",
    sortable && "table--sortable",
  );

  // CSS vars on the wrapper cascade into the table and all descendants.
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    caption,
    columns,
    data,
    sort,
    sortable,
    wrapperProps: {
      class: wrapperClass,
      style,
      ...dataAttrs, // data-loading, data-scrollable, data-visual, data-testid, etc.
    },
    tableProps: {
      class: tableClass,
      ...rest, // id, aria-*, tabindex, and other HTML passthrough
    },
  };
}

!!!

---

## panel/t-panel.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/panel/t-panel.hook.ts`


!!!ts
import type { TabPanelProps } from "./t-panel.props";

export function useTabPanel(props: TabPanelProps) {
  const { id, active, class: className, ...rest } = props;

  return {
    tabPanelProps: {
      role: "tabpanel" as const,
      id: `panel-${id}`,
      "data-panel-for": id,
      "aria-labelledby": `tab-${id}`,
      "data-active": active ? "true" : undefined,
      class: ["tab-panel", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}

!!!

---

## tab/tab.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/tab/tab.hook.ts`


!!!ts
import type { TabProps } from "./tab.props";

export function useTab(props: TabProps) {
  const { id, active, disabled, href, icon, class: className, ...rest } = props;

  const Tag = href ? "a" : "button";

  return {
    Tag,
    icon,
    tabProps: {
      id: `tab-${id}`,
      href,
      "aria-controls": `panel-${id}`,
      "role": "tab",
      "aria-selected": active ? "true" : "false",
      "tabindex": active ? 0 : -1,
      "data-active": active ? "true" : undefined,
      disabled,
      class: ["nav__item", className].filter(Boolean).join(" "),
      ...rest
    }
  };
}

!!!

---

## tabs.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/tabs.hook.ts`


!!!ts
import { useNav } from "../../nav.hook";
import type { NavProps } from "../../nav.props";
import type { TabsProps } from "./tabs.props";

const TABS_DEFAULTS = {
  variant: "underlined",
  orientation: "horizontal"
} as const;

export function useTabs(props: TabsProps) {
  const { 
    items, 
    fitted,
    variant = TABS_DEFAULTS.variant,
    orientation = TABS_DEFAULTS.orientation,
    ...navProps 
  } = props;

  // Derive the initially active tab if not explicitly set
  const activeId = navProps.activeId || (items && items.length > 0 ? items[0]?.id : undefined);

  // Note: We cast to NavProps here because the rest spread (...navProps) 
  // causes TS to lose the explicit type shape, particularly around activeId.
  // This cast bridges the gap for strict mode compatibility.
  const { navProps: resolvedNavProps, activeId: finalActiveId } = useNav({ variant, orientation, ...navProps, activeId } as NavProps);

  const tabsClass = [
    "tabs",
    resolvedNavProps.class,
    fitted ? "tabs--fitted" : ""
  ].filter(Boolean).join(" ");

  return {
    tabsProps: {
      ...resolvedNavProps,
      class: tabsClass,
      role: "tablist" as const,
      "aria-orientation": orientation
    },
    items,
    activeId: finalActiveId
  };
}

!!!

---

## tag.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/tag/tag.hook.ts`


!!!ts
// design/feedback/components/tag/tag.hook.ts

import type { TagProps } from "./tag.props";
import { TAG_DEFAULTS } from "./tag.tokens";
import { useFeedback } from "../../feedback.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useTag(props: TagProps) {
  const {
    variant = TAG_DEFAULTS.variant,
    color   = TAG_DEFAULTS.color,
    size    = TAG_DEFAULTS.size,
    radius  = TAG_DEFAULTS.radius,
    icon,
    iconOnly = false,
    ...rest
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest: remaining } = useFeedback({
    variant,
    color,
    size,
    radius,
    ...rest,
  });

  return {
    Tag: "span" as const,
    props: {
      class: composeClass(
        feedbackClass,
        "tag",
        iconOnly && "tag--icon-only",
      ),
      style: composeStyle(feedbackStyle),
      ...feedbackAttrs,
      ...remaining,
    },
  };
}

!!!

---

## text.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/text/text.hook.ts`


!!!ts
// design/typography/text/text.hook.ts
import type { TextProps } from "./text.props";
import { TEXT_DEFAULTS } from "./text.tokens";
import { useTypography } from "../../typography.hook";
import { composeClass } from "~/shared/base.hook";

export function useText(props: TextProps) {
  const {
    as: Tag = TEXT_DEFAULTS.as,
    icon,
    ...typographyProps
  } = props;

  const { typographyAttributes } = useTypography(typographyProps);

  return {
    Tag,
    props: {
      ...typographyAttributes,
      class: composeClass(typographyAttributes.class, "text", icon ? "text--has-icon" : undefined),
    },
  };
}
!!!

---

## textarea.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/textarea/textarea.hook.ts`


!!!ts
// design/forms/components/textarea/textarea.hook.ts

/**
 * @file Component hook for the Textarea component.
 * @module design/forms/textarea
 *
 * {@link useTextarea} resolves {@link TextareaProps} into two attribute sets:
 * one for the outer wrapper `<div>` (visual chrome) and one for the inner
 * `<textarea>` element (semantic control). Follows the same two-element
 * pattern as {@link useInput}.
 *
 * The resize channel (`--textarea--resize`) is emitted directly on the wrapper
 * style string rather than via resolveTokens, because the full TEXTAREA_TOKENS
 * spec is a superset of FORM_TOKENS — resolving both would call resolveTokens
 * twice. The form dimensions are resolved by {@link useForm}; resize is appended
 * as a single extra CSS variable.
 *
 * @see {@link useForm}           in `forms/forms.hook.ts`
 * @see {@link TextareaProps}     in `forms/textarea/textarea.props.ts`
 * @see {@link TEXTAREA_DEFAULTS} in `forms/textarea/textarea.tokens.ts`
 */

import type { TextareaProps } from "./textarea.props";
import { TEXTAREA_DEFAULTS }  from "./textarea.tokens";
import { useForm }            from "~/forms/forms.hook";
import { composeClass }       from "~/shared/base.hook";

export function useTextarea(props: TextareaProps) {
  const {
    id,
    name,
    value,
    placeholder,
    readonly,
    rows         = TEXTAREA_DEFAULTS.rows,
    resize       = TEXTAREA_DEFAULTS.resize,
    minLength,
    maxLength,
    autocomplete,
    wrap,
    ...formProps
  } = props;

  const { formClass, formStyle, formAttrs, disabled, required, invalid, rest }
    = useForm(formProps as Parameters<typeof useForm>[0]);

  return {
    Tag: "div" as const,
    props: {
      class: composeClass(formClass, "textarea"),
      style: [formStyle, `--textarea--resize: ${resize}`].filter(Boolean).join("; "),
      ...formAttrs,
      ...rest,
    },
    textareaAttrs: {
      id,
      name,
      placeholder,
      rows,
      minLength,
      maxLength,
      autoComplete: autocomplete,
      wrap,
      readOnly:        readonly  || undefined,
      disabled:        disabled  || undefined,
      required:        required  || undefined,
      "aria-required": required  ? "true" as const : undefined,
      "aria-invalid":  invalid   ? "true" as const : undefined,
    },
    value,
  };
}

!!!

---

## theme-toggle.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/theme-toggle/theme-toggle.hook.ts`


!!!ts
// design/triggers/components/theme-toggle/theme-toggle.hook.ts

/**
 * useThemeToggle
 *
 * Thin layer over `useButton`. The only thing this hook does beyond what
 * `useButton` already provides is merge THEME_TOGGLE_DEFAULTS so the
 * component renders as a ghost icon-only button when no props are passed,
 * and append the `theme-toggle` class for CSS targeting.
 *
 * Client-side toggling behaviour lives entirely in the `<script>` tag
 * inside ThemeToggle.astro — hooks are SSR-only in Astro, so runtime DOM
 * mutation does not belong here.
 *
 * Responsibility split:
 *   useButton  → resolves Tag, trigger classes, size channels, a11y attrs.
 *   useThemeToggle → merges opinionated defaults, appends component class.
 */

import type { ThemeToggleProps } from "./theme-toggle.props";
import { THEME_TOGGLE_DEFAULTS } from "./theme-toggle.tokens";
import { useButton } from "~tr/components/button/button.hook";
import { composeClass } from "~sh/base.hook";

/**
 * Resolves `ThemeToggleProps` into a `{ Tag, props }` object ready for
 * spread onto the root element in ThemeToggle.astro.
 *
 * @param props - All props passed to the `<ThemeToggle>` component.
 * @returns `Tag` — always `"button"` (no href variant for a theme toggle).
 * @returns `props` — merged class, style, data attributes.
 *
 * @example Minimal:
 *   useThemeToggle({})
 *   // class: "trigger button button--md button--icon-only theme-toggle"
 *   // variant: ghost, color: neutral
 */
export function useThemeToggle(props: ThemeToggleProps) {
  const {
    variant  = THEME_TOGGLE_DEFAULTS.variant,
    color    = THEME_TOGGLE_DEFAULTS.color,
    size     = THEME_TOGGLE_DEFAULTS.size,
    iconOnly = THEME_TOGGLE_DEFAULTS.iconOnly,
    ...rest
  } = props;

  const { Tag, props: buttonProps } = useButton({
    variant,
    color,
    size,
    iconOnly,
    type: "button",
    ...rest,
  } as ThemeToggleProps);

  return {
    Tag,
    props: {
      ...buttonProps,
      class: composeClass(buttonProps.class, "theme-toggle"),
      "aria-label": "Toggle color theme",
    },
  };
}

!!!

---

## tile.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/tile/tile.hook.ts`


!!!ts
// design/surfaces/components/tile/tile.hook.ts
import type { TileProps }       from "./tile.props";
import { TILE_DEFAULTS }        from "./tile.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass }         from "~/shared/base.hook";

export function useTile(props: TileProps) {
  const {
    as: passedTag,
    href,
    interactive = false,
    selectable  = false,
    selected    = false,
    disabled    = false,
    layer       = TILE_DEFAULTS.layer,
    padding     = TILE_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const isLink        = Boolean(href);
  const isToggle      = !isLink && selectable;
  const isInteractive = !isLink && (interactive || selectable);
  const isDisabled    = !isLink && disabled;

  // Determine element tag
  let Tag = passedTag ?? "div";
  if (isLink) {
    Tag = "a";
  } else if (isToggle && !passedTag) {
    Tag = "button";
  }

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
    disabled: isDisabled,
  });

  return {
    Tag,
    props: {
      class: composeClass(
        surfaceClass,
        "tile",
        isLink        && "tile--interactive",
        isInteractive && "tile--interactive",
        selectable    && "tile--selectable",
        selected      && "tile--selected",
        isDisabled    && "tile--disabled",
      ),
      style: surfaceStyle,
      ...surfaceAttrs,
      href,
      role:           isToggle ? ("button" as const) : undefined,
      tabindex:       isInteractive ? (isDisabled ? -1 : 0) : undefined,
      "aria-pressed": isToggle ? String(selected) : undefined,
      ...rest,
    },
  };
}

!!!

---

## time-picker.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/time-picker/time-picker.hook.ts`


!!!ts

!!!

---

## toast.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/toast/toast.hook.ts`


!!!ts
// design/feedback/components/toast/toast.hook.ts

import { useFeedback }                    from "../../feedback.hook";
import { composeClass, composeStyle }     from "~sh/base.hook";
import { TOAST_DEFAULTS, TOAST_SIZE_MAP } from "./toast.tokens";
import type { ToastSize }                 from "./toast.tokens";
import type { ToastProps }                from "./toast.props";

export function useToast(props: ToastProps) {
  const {
    size         = TOAST_DEFAULTS.size,
    variant      = TOAST_DEFAULTS.variant,
    color        = TOAST_DEFAULTS.color,
    radius       = TOAST_DEFAULTS.radius,
    dismissible  = TOAST_DEFAULTS.dismissible,
    dismissLabel = "Dismiss",
    title,
    icon,
    ...feedbackProps
  } = props;

  const { feedbackClass, feedbackStyle, feedbackAttrs, rest } =
    useFeedback({ variant, color, radius, size: size as ToastSize, ...feedbackProps });

  const sizeMap = TOAST_SIZE_MAP[size as ToastSize];

  const toastStyle = [
    `--toast--font-size: ${sizeMap.fontSize}`,
    `--toast--padding: ${sizeMap.p}`,
  ];

  return {
    props: {
      class: composeClass(feedbackClass, "toast", dismissible && "toast--dismissible"),
      style: composeStyle(feedbackStyle, ...toastStyle) || undefined,
      role:  color === "danger" || color === "warning" ? ("alert" as const) : ("status" as const),
      ...feedbackAttrs,
      ...rest,
    },
    title,
    dismissible,
    dismissLabel,
  };
}

!!!

---

## toolbar.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/toolbar/toolbar.hook.ts`


!!!ts

!!!

---

## tooltip.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/tooltip/tooltip.hook.ts`


!!!ts
import type { TooltipProps } from "./tooltip.props";
import { TOOLTIP_TOKENS, TOOLTIP_DEFAULTS } from "./tooltip.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useTooltip(props: TooltipProps) {
  const {
    content,
    placement = TOOLTIP_DEFAULTS.placement,
    radius,
    class: className,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    TOOLTIP_TOKENS, { placement, radius }, "tooltip",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose({
    className: ["tooltip", ...tokenClasses, className],
    style:     tokenStyle,
  }, base);

  return {
    wrapperProps: {
      class: cls,
      style,
      ...attrs,
      ...rest,
    },
    content,
  };
}

!!!

---

## tree-view.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tree-view/tree-view.hook.ts`


!!!ts

!!!

---

## video.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/video/video.hook.ts`


!!!ts

!!!

---

## visually-hidden.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/visually-hidden/visually-hidden.hook.ts`


!!!ts
// design/typography/components/visually-hidden/visually-hidden.hook.ts
import type { VisuallyHiddenProps } from "./visually-hidden.props";
import { VISUALLY_HIDDEN_DEFAULTS } from "./visually-hidden.tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useVisuallyHidden(props: VisuallyHiddenProps) {
  const {
    as: Tag = VISUALLY_HIDDEN_DEFAULTS.as,
    class: className,
    style,
    ...base
  } = props;

  const { className: cls, style: stl, attrs, rest } = useBaseCompose(
    {
      className: ["visually-hidden", className],
      style: [style],
    },
    base,
  );

  return {
    Tag,
    props: {
      class: cls,
      style: stl,
      ...attrs,
      ...rest,
    },
  };
}

!!!

---

## waveform.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/waveform/waveform.hook.ts`


!!!ts

!!!

---

## well.hook.ts


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/well/well.hook.ts`


!!!ts
// design/surfaces/components/well/well.hook.ts
import type { WellProps }       from "./well.props";
import { WELL_DEFAULTS }        from "./well.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass }         from "~/shared/base.hook";

export function useWell(props: WellProps) {
  const {
    as: Tag = "div",
    layer   = WELL_DEFAULTS.layer,
    padding = WELL_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
  });

  return {
    Tag,
    props: {
      class: composeClass(surfaceClass, "well"),
      style: surfaceStyle,
      ...surfaceAttrs,
      ...rest,
    },
  };
}

!!!

---

