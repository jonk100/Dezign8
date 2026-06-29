# Aggregated ASTRO Files

## AlertDialog.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/AlertDialog.astro`

### Frontmatter

!!!astro
---
import type { AlertDialogProps } from "./alert-dialog.props";
import { useAlertDialog } from "./alert-dialog.hook";
import Text from "~/typography/components/text/Text.astro";
import Prose from "~/typography/components/prose/Prose.astro";
import Icon from "~/assets/components/icon/Icon.astro";import "../../overlays.css";
import "./alert-dialog.css";

const { dialogProps, title, titleId, description, descriptionId } = useAlertDialog(Astro.props as AlertDialogProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<dialog {...dialogProps}>
  <div class="alert-dialog__header">
    {icon && (
      <div class="alert-dialog__icon" aria-hidden="true">
        <Icon name={icon} />
      </div>
    )}
    <h2 id={titleId} class="alert-dialog__title">{title}</h2>
  </div>

  {description && (
    <div class="alert-dialog__body">
      <Text id={descriptionId} class="alert-dialog__description">{description}</Text>
    </div>
  )}

  {!description && Astro.slots.has("default") && (
    <div class="alert-dialog__body">
      <Prose size="sm">
        <slot />
      </Prose>
    </div>
  )}

  <div class="alert-dialog__footer">
    <slot name="actions" />
  </div>
</dialog>
!!!

### Scripts

!!!ts
import { initAlertDialogs } from "./alert-dialog.client";
  initAlertDialogs();
  document.addEventListener("astro:after-swap", initAlertDialogs);
!!!

---

## Alert.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/Alert.astro`

### Frontmatter

!!!astro
---
/**
 * Alert
 *
 * Inline block-level status message. Supports optional icon, title, body
 * content, and action links/buttons via named slots. Can be dismissed
 * client-side when `dismissible` is set.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="feedback alert [modifiers]" role="alert|status" style="…">
 *   <div class="alert__icon">…</div>       ← icon slot, when present
 *   <div class="alert__body">
 *     <div class="alert__title">…</div>    ← title slot, when present
 *     <slot />                             ← default: message content
 *     <div class="alert__actions">…</div>  ← actions slot, when present
 *   </div>
 *   <button class="alert__dismiss">…</button>  ← when dismissible=true
 * </div>
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Main message body text
 *   icon      Leading status icon (16–20px SVG recommended)
 *   title     Bold heading above the message body
 *   actions   Trailing links or action buttons
 *
 * ARIA
 * ─────────────────────────────────────────────────────────────────────────────
 *   role="alert"  — for color="danger" | "warning" (assertive live region)
 *   role="status" — for color="info" | "success" | "neutral" (polite)
 *
 * @example Basic
 * !!!astro
 * <Alert color="danger">Your session has expired. Please sign in again.</Alert>
 * !!!
 *
 * @example With icon and title
 * !!!astro
 * <Alert color="success" variant="soft">
 *   <svg slot="icon" aria-hidden="true">…</svg>
 *   <Fragment slot="title">Saved successfully</Fragment>
 *   Your changes have been applied.
 * </Alert>
 * !!!
 *
 * @example Dismissible with action
 * !!!astro
 * <Alert color="info" dismissible>
 *   New features are available.
 *   <a slot="actions" href="/changelog">See what's new</a>
 * </Alert>
 * !!!
 *
 * @see alert.hook.ts   — useAlert: resolves props to { props, dismissible, dismissLabel }
 * @see alert.props.ts  — AlertProps: full prop reference
 * @see alert.tokens.ts — ALERT_TOKENS, ALERT_DEFAULTS
 * @see alert.css       — layout regions and dismiss button styles
 * @see ../feedback.css — variant + color channel rules
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADJUSTING PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * COLOR + VARIANT
 *   color      [../feedback.css]  --feedback--color-* channels
 *              @example color="danger"  → red tones, role="alert"
 *   variant    [../feedback.css]  .feedback--{variant}
 *              @example variant="solid" → filled background
 *
 * SHAPE
 *   radius     [../feedback.css]  --feedback--radius → border-radius
 *              @default "md" — slightly rounded corner box
 *
 * DISMISSIBLE
 *   dismissible   [./alert.css]   .alert--dismissible → shows dismiss button
 *   dismissLabel  Passed as aria-label to the dismiss <button>
 *
 * SLOTS
 *   icon       [./alert.css]  .alert__icon — leading 1.25em icon region
 *   title      [./alert.css]  .alert__title — semibold heading above body
 *   actions    [./alert.css]  .alert__actions — row of links/buttons
 */

import type { AlertProps } from "./alert.props";
import { useAlert }        from "./alert.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "../../feedback.css";
import "./alert.css";

const { props, dismissible, dismissLabel } = useAlert(Astro.props as AlertProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<div {...props}>
  {(icon || Astro.slots.has("icon")) && (
    <div class="alert__icon" aria-hidden="true">
      {icon ? <Icon name={icon} /> : <slot name="icon" />}
    </div>
  )}
  <div class="alert__body">
    {Astro.slots.has("title") && (
      <div class="alert__title"><slot name="title" /></div>
    )}
    <slot />
    {Astro.slots.has("actions") && (
      <div class="alert__actions"><slot name="actions" /></div>
    )}
  </div>
  {dismissible && (
    <button class="alert__dismiss" type="button" aria-label={dismissLabel} data-dismiss>
      <Icon name="x" size="sm" />
    </button>
  )}
</div>
!!!

### Scripts

!!!ts
import { mountMotionDismiss } from "~/shared/motion/motion.dismiss";
  mountMotionDismiss();
!!!

---

## AlertDialog.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/AlertDialog.astro`

### Frontmatter

!!!astro
---
import type { AlertDialogProps } from "./alert-dialog.props";
import { useAlertDialog } from "./alert-dialog.hook";
import Text from "~/typography/components/text/Text.astro";
import Prose from "~/typography/components/prose/Prose.astro";
import Icon from "~/assets/components/icon/Icon.astro";import "../../overlays.css";
import "./alert-dialog.css";

const { dialogProps, title, titleId, description, descriptionId } = useAlertDialog(Astro.props as AlertDialogProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<dialog {...dialogProps}>
  <div class="alert-dialog__header">
    {icon && (
      <div class="alert-dialog__icon" aria-hidden="true">
        <Icon name={icon} />
      </div>
    )}
    <h2 id={titleId} class="alert-dialog__title">{title}</h2>
  </div>

  {description && (
    <div class="alert-dialog__body">
      <Text id={descriptionId} class="alert-dialog__description">{description}</Text>
    </div>
  )}

  {!description && Astro.slots.has("default") && (
    <div class="alert-dialog__body">
      <Prose size="sm">
        <slot />
      </Prose>
    </div>
  )}

  <div class="alert-dialog__footer">
    <slot name="actions" />
  </div>
</dialog>
!!!

### Scripts

!!!ts
import { initAlertDialogs } from "./alert-dialog.client";
  initAlertDialogs();
  document.addEventListener("astro:after-swap", initAlertDialogs);
!!!

---

---

## Alert.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/Alert.astro`

### Frontmatter

!!!astro
---
/**
 * Alert
 *
 * Inline block-level status message. Supports optional icon, title, body
 * content, and action links/buttons via named slots. Can be dismissed
 * client-side when `dismissible` is set.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="feedback alert [modifiers]" role="alert|status" style="…">
 *   <div class="alert__icon">…</div>       ← icon slot, when present
 *   <div class="alert__body">
 *     <div class="alert__title">…</div>    ← title slot, when present
 *     <slot />                             ← default: message content
 *     <div class="alert__actions">…</div>  ← actions slot, when present
 *   </div>
 *   <button class="alert__dismiss">…</button>  ← when dismissible=true
 * </div>
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Main message body text
 *   icon      Leading status icon (16–20px SVG recommended)
 *   title     Bold heading above the message body
 *   actions   Trailing links or action buttons
 *
 * ARIA
 * ─────────────────────────────────────────────────────────────────────────────
 *   role="alert"  — for color="danger" | "warning" (assertive live region)
 *   role="status" — for color="info" | "success" | "neutral" (polite)
 *
 * @example Basic
 * !!!astro
 * <Alert color="danger">Your session has expired. Please sign in again.</Alert>
 * !!!
 *
 * @example With icon and title
 * !!!astro
 * <Alert color="success" variant="soft">
 *   <svg slot="icon" aria-hidden="true">…</svg>
 *   <Fragment slot="title">Saved successfully</Fragment>
 *   Your changes have been applied.
 * </Alert>
 * !!!
 *
 * @example Dismissible with action
 * !!!astro
 * <Alert color="info" dismissible>
 *   New features are available.
 *   <a slot="actions" href="/changelog">See what's new</a>
 * </Alert>
 * !!!
 *
 * @see alert.hook.ts   — useAlert: resolves props to { props, dismissible, dismissLabel }
 * @see alert.props.ts  — AlertProps: full prop reference
 * @see alert.tokens.ts — ALERT_TOKENS, ALERT_DEFAULTS
 * @see alert.css       — layout regions and dismiss button styles
 * @see ../feedback.css — variant + color channel rules
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADJUSTING PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * COLOR + VARIANT
 *   color      [../feedback.css]  --feedback--color-* channels
 *              @example color="danger"  → red tones, role="alert"
 *   variant    [../feedback.css]  .feedback--{variant}
 *              @example variant="solid" → filled background
 *
 * SHAPE
 *   radius     [../feedback.css]  --feedback--radius → border-radius
 *              @default "md" — slightly rounded corner box
 *
 * DISMISSIBLE
 *   dismissible   [./alert.css]   .alert--dismissible → shows dismiss button
 *   dismissLabel  Passed as aria-label to the dismiss <button>
 *
 * SLOTS
 *   icon       [./alert.css]  .alert__icon — leading 1.25em icon region
 *   title      [./alert.css]  .alert__title — semibold heading above body
 *   actions    [./alert.css]  .alert__actions — row of links/buttons
 */

import type { AlertProps } from "./alert.props";
import { useAlert }        from "./alert.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "../../feedback.css";
import "./alert.css";

const { props, dismissible, dismissLabel } = useAlert(Astro.props as AlertProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<div {...props}>
  {(icon || Astro.slots.has("icon")) && (
    <div class="alert__icon" aria-hidden="true">
      {icon ? <Icon name={icon} /> : <slot name="icon" />}
    </div>
  )}
  <div class="alert__body">
    {Astro.slots.has("title") && (
      <div class="alert__title"><slot name="title" /></div>
    )}
    <slot />
    {Astro.slots.has("actions") && (
      <div class="alert__actions"><slot name="actions" /></div>
    )}
  </div>
  {dismissible && (
    <button class="alert__dismiss" type="button" aria-label={dismissLabel} data-dismiss>
      <Icon name="x" size="sm" />
    </button>
  )}
</div>
!!!

### Scripts

!!!ts
import { mountMotionDismiss } from "~/shared/motion/motion.dismiss";
  mountMotionDismiss();
!!!

---

---

## Audio.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/Audio.astro`

### Frontmatter

!!!astro
---
import type { AudioProps } from "./audio.props";
import { useAudio } from "./audio.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "./audio.css";

const { containerProps, audioProps } = useAudio(Astro.props as AudioProps);

const isIntercom = containerProps["data-intercom"] === "true";
---
!!!

### Template

!!!astro
<div {...containerProps}>
  {/* Hidden native element — source of truth for playback state */}
  <audio class="audio__native" {...audioProps} style="display:none"></audio>

  {/* Controls row */}
  <div class="audio__controls">
    <button class="audio__play-btn" type="button" aria-label="Play" data-audio-play>
      <span class="audio__icon-play"  aria-hidden="true"><Icon name="play"  size="sm" /></span>
      <span class="audio__icon-pause" aria-hidden="true" style="display:none"><Icon name="pause" size="sm" /></span>
    </button>

    <span class="audio__time" data-audio-time>0:00 / 0:00</span>

    {isIntercom && <span class="audio__intercom-badge">INTERCOM</span>}
  </div>

  {/* Seek bar */}
  <div class="audio__seek-row">
    <input
      type="range"
      class="audio__seek"
      min="0" max="100" step="0.1" value="0"
      aria-label="Seek"
      data-audio-seek
    />
  </div>

  {/* Volume + rate */}
  <div class="audio__secondary">
    <label class="audio__volume">
      <Icon name="zap" size="xs" />
      <input
        type="range"
        class="audio__volume-slider"
        min="0" max="1" step="0.05" value="1"
        aria-label="Volume"
        data-audio-volume
      />
    </label>

    <label class="audio__rate">
      <Icon name="jog-forward" size="xs" />
      <select class="audio__rate-select" aria-label="Playback speed" data-audio-rate>
        <option value="0.5">0.5×</option>
        <option value="0.75">0.75×</option>
        <option value="1" selected>1×</option>
        <option value="1.25">1.25×</option>
        <option value="1.5">1.5×</option>
        <option value="2">2×</option>
      </select>
    </label>
  </div>
</div>
!!!

### Scripts

!!!ts
import { initAllPlayers } from "./audio.client";

  initAllPlayers();
  document.addEventListener("astro:after-swap", initAllPlayers);
!!!

---

## AvatarGroup.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/AvatarGroup.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Avatar.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/Avatar.astro`

### Frontmatter

!!!astro
---
import type { AvatarProps } from "./avatar.props";
import { useAvatar } from "./avatar.hook";
import "./avatar.css";

type Props = AvatarProps;

const { src, alt, initials, status: _status, props } = useAvatar(Astro.props as AvatarProps);
---
!!!

### Template

!!!astro
<span {...props}>
  {src ? (
    <img src={src} alt={alt} loading="lazy" />
  ) : initials ? (
    <span aria-hidden="true">{initials}</span>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  )}
</span>
!!!

---

## Backdrop.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/Backdrop.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Badge.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/Badge.astro`

### Frontmatter

!!!astro
---
/**
 * Badge
 *
 * A small indicator rendered as a pill, count, or dot. Renders inline or
 * as an absolute overlay on a `position: relative` parent via `placement`.
 *
 * THREE RENDERING MODES
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Count badge  — `count` prop provided. Renders a number (capped by `max`).
 * 2. Label badge  — No `count`, no `dot`. Renders the default slot.
 * 3. Dot badge    — `dot={true}`. Renders an empty circle, no content.
 *
 * STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────
 *   <span class="feedback badge [badge--dot]" [data-placement]>
 *     {count mode}  → displayCount string  (e.g. "12" or "99+")
 *     {label mode}  → <slot />
 *     {dot mode}    → (nothing)
 *   </span>
 *
 * PLACEMENT / OVERLAY
 * ─────────────────────────────────────────────────────────────────────────
 * When `placement` is set the badge is `position: absolute`. The parent
 * must have `position: relative` (or any non-static position).
 *
 * @example
 * <!-- Count badge -->
 * <Badge count={5} />
 *
 * @example
 * <!-- Capped count -->
 * <Badge count={200} max={99} />  <!-- → "99+" -->
 *
 * @example
 * <!-- Dot / presence indicator -->
 * <Badge dot color="success" />
 *
 * @example
 * <!-- Label badge (slot) -->
 * <Badge variant="soft" color="info">Beta</Badge>
 *
 * @example
 * <!-- Overlaid on a parent element -->
 * <div style="position: relative; display: inline-flex;">
 *   <Button>Messages</Button>
 *   <Badge count={3} placement="top-end" />
 * </div>
 *
 * @see badge.hook.ts   — resolves props to { Tag, props, mode, displayCount }
 * @see badge.props.ts  — full prop type reference
 * @see badge.css       — size map, dot mode styles
 * @see feedback.css    — shared variant and placement rules
 */

import type { BadgeProps } from "./badge.props";
import { useBadge }        from "./badge.hook";
import Icon from "~/assets/components/icon/Icon.astro";import "../../feedback.css";
import "./badge.css";

type Props = BadgeProps;

const { Tag, props, mode, displayCount } = useBadge(Astro.props as BadgeProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...props as Record<string, unknown>}>
  {icon && <Icon name={icon} />}
  {mode === "count" && displayCount}
  {mode === "label" && <slot />}
  {/* dot mode — no content */}
</Tag>
!!!

---

## Banner.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/Banner.astro`

### Frontmatter

!!!astro
---
/**
 * Banner
 *
 * Full-width page-level announcement strip. Typically placed at the top of
 * a page or layout region. Supports a message, optional action links, and
 * optional dismiss. Can be made sticky to the viewport top.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="feedback banner [modifiers]" role="region" aria-label="…" style="…">
 *   <div class="banner__content">…</div>      ← default slot
 *   <div class="banner__actions">…</div>      ← actions slot, when present
 *   <button class="banner__dismiss">…</button> ← when dismissible=true
 * </div>
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Announcement message text (short, single-line preferred)
 *   actions   CTA links or buttons placed after the message
 *
 * ARIA
 * ─────────────────────────────────────────────────────────────────────────────
 *   role="region" + aria-label — landmark-level; consumers should override
 *   aria-label via the prop if the default "Page notification" isn't specific.
 *
 * @example Simple announcement
 * !!!astro
 * <Banner color="info">We'll be performing maintenance on Saturday at 2 AM UTC.</Banner>
 * !!!
 *
 * @example With action and dismiss
 * !!!astro
 * <Banner color="warning" dismissible>
 *   Your plan is expiring in 3 days.
 *   <a slot="actions" href="/billing">Upgrade now</a>
 * </Banner>
 * !!!
 *
 * @example Sticky banner
 * !!!astro
 * <Banner color="primary" variant="solid" sticky aria-label="Promotional offer">
 *   🎉 Get 20% off — use code LAUNCH20 at checkout.
 * </Banner>
 * !!!
 *
 * @see banner.hook.ts   — useBanner: resolves props to { props, dismissible, dismissLabel }
 * @see banner.props.ts  — BannerProps: full prop reference
 * @see banner.tokens.ts — BANNER_TOKENS, BANNER_DEFAULTS
 * @see banner.css       — layout, sticky, dismiss button styles
 * @see ../feedback.css  — variant + color channel rules
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADJUSTING PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * COLOR + VARIANT
 *   color      [../feedback.css]  --feedback--color-* channels
 *   variant    [../feedback.css]  .feedback--{variant}
 *              @default "soft" — light tinted strip
 *
 * SHAPE
 *   radius     [../feedback.css]  --feedback--radius
 *              @default "none" — edge-to-edge, no rounding
 *
 * BEHAVIOR
 *   sticky        [./banner.css]  .banner--sticky → position:sticky; top:0
 *   dismissible   [./banner.css]  .banner--dismissible → shows dismiss button
 *   dismissLabel  Passed as aria-label to the dismiss <button>
 *
 * LANDMARK
 *   aria-label    Forwarded to the root element. Override the default
 *                 "Page notification" when banner purpose is specific.
 *
 * SLOTS
 *   actions    [./banner.css]  .banner__actions — CTA area after content
 */

import type { BannerProps } from "./banner.props";
import { useBanner }        from "./banner.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "../../feedback.css";
import "./banner.css";

const { props, dismissible, dismissLabel } = useBanner(Astro.props as BannerProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<div {...props}>
  {icon && <Icon name={icon} />}
  <div class="banner__content"><slot /></div>
  {Astro.slots.has("actions") && (
    <div class="banner__actions"><slot name="actions" /></div>
  )}
  {dismissible && (
    <button class="banner__dismiss" type="button" aria-label={dismissLabel} data-dismiss>
      <Icon name="x" size="sm" />
    </button>
  )}
</div>
!!!

### Scripts

!!!ts
import { mountMotionDismiss } from "~/shared/motion/motion.dismiss";
  mountMotionDismiss();
!!!

---

## Box.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/Box.astro`

### Frontmatter

!!!astro
---
/**
 * Box Component
 * 
 * The fundamental layout container. Box leverages the `useLayout` hook to
 * consume a rich set of structural properties.
 * 
 * By extending `LayoutProps` (and thereby `SpacingProps`), the Box exposes
 * the entire spacing shorthand chain. You can pass properties like:
 * - `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl` for padding.
 * - `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml` for margin.
 * - `gap`, `align`, `justify` for flex/grid flow.
 * 
 * It also applies container-specific styles such as `radius`.
 * 
 * @example
 * !!!astro
 * <Box as="section" p="xl" bg="--color--surface" radius="md">
 *   <Box p="md" gap="sm">Content goes here</Box>
 * </Box>
 * !!!
 */
import type { BoxProps } from "./box.props";
import { useBox } from "./box.hook";
import "../../layout.css";
import "./box.css";

type Props = BoxProps;

const { Tag, props: boxProps } = useBox(Astro.props);
---
!!!

### Template

!!!astro
<Tag {...boxProps}>
  <slot />
</Tag>
!!!

---

## Breadcrumbs.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/Breadcrumbs.astro`

### Frontmatter

!!!astro
---
/**
 * Breadcrumbs
 *
 * A trail of links representing the user's location within the site hierarchy.
 *
 * @example
 * <Breadcrumbs items={[{ id: "home", label: "Home", href: "/" }, { id: "products", label: "Products", active: true }]} />
 */
import { useBreadcrumbs }       from "./breadcrumbs.hook";
import type { BreadcrumbsProps } from "./breadcrumbs.props";
import BreadcrumbItem           from "./item/BreadcrumbItem.astro";
import "../../nav.css";
import "./breadcrumbs.css";
import Icon from "~/assets/components/icon/Icon.astro";

export type Props = BreadcrumbsProps;

const { breadcrumbsProps, items, separatorIcon, separatorText } = useBreadcrumbs(Astro.props as BreadcrumbsProps);
---
!!!

### Template

!!!astro
<nav {...breadcrumbsProps}>
  <ol class="breadcrumbs__list">
    {items ? (
      items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <BreadcrumbItem
            {...(item.href ? { href: item.href } : {})}
            active={item.active || isLast}
            isLast={isLast}
            {...(item.icon !== undefined ? { icon: item.icon } : {})}
          >
            {item.label}
            
            <span slot="separator" class="breadcrumbs__separator" aria-hidden="true">
              {separatorIcon ? (
                <Icon name={separatorIcon} />
              ) : (
                separatorText
              )}
            </span>
          </BreadcrumbItem>
        );
      })
    ) : (
      <slot />
    )}
  </ol>
</nav>
!!!

---

## item/BreadcrumbItem.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/item/BreadcrumbItem.astro`

### Frontmatter

!!!astro
---
/**
 * BreadcrumbItem
 *
 * An individual item in a `<Breadcrumbs>` list.
 *
 * @see {@link ./Breadcrumbs.astro}
 */
import { useBreadcrumbItem } from "./b-item.hook";
import type { BreadcrumbItemProps } from "./b-item.props";
import Icon from "~/assets/components/icon/Icon.astro";

export type Props = BreadcrumbItemProps;

const { Tag, isLast, itemProps } = useBreadcrumbItem(Astro.props as BreadcrumbItemProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<li class="breadcrumbs__item-wrapper">
  <Tag {...itemProps}>
    {icon && <Icon name={icon} />}
    <slot />
  </Tag>
  {!isLast && (
    <slot name="separator" />
  )}
</li>
!!!

---

## ButtonGroup.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/ButtonGroup.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Button.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/Button.astro`

### Frontmatter

!!!astro
---
import type { ButtonProps } from "./button.props";
import { useButton } from "./button.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "../../trigger.css";
import "./button.css";

const { Tag, props } = useButton(Astro.props as ButtonProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...props}>
  {icon && <Icon name={icon} />}
  <slot />
</Tag>
!!!

---

## Caption.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/Caption.astro`

### Frontmatter

!!!astro
---
/**
 * Caption
 *
 * A typography component for supplementary text, typically used with images,
 * tables, or figures. Defaults to a semantic `<figcaption>` element.
 *
 * @example Basic caption
 * !!!astro
 * <figure>
 *   <img src="..." alt="..." />
 *   <Caption>A description of the image content.</Caption>
 * </figure>
 * !!!
 *
 * @example With label and credit
 * !!!astro
 * <Caption label="Figure 1." credit="Photo: Jane Doe">
 *   The component supports a lead-in label and an attribution credit line.
 * </Caption>
 * !!!
 *
 * @example Overlay on an image
 * !!!astro
 * <figure style="position: relative;">
 *   <img src="..." alt="..." />
 *   <Caption overlay>This caption will overlay the bottom of the image.</Caption>
 * </figure>
 * !!!
 *
 * @see caption.hook.ts
 * @see caption.props.ts
 * @see caption.tokens.ts
 * @see caption.css
 */
import type { CaptionProps } from "./caption.props";
import { useCaption } from "./caption.hook";
import "./caption.css";

interface Props extends CaptionProps {};

const { Tag, props, label, credit } = useCaption(Astro.props);
---
!!!

### Template

!!!astro
<Tag {...props}>
  {label && <span class="caption__label">{label}</span>}
  <slot />
  {Astro.slots.has("credit")
    ? <small class="caption__credit"><slot name="credit" /></small>
    : credit && <small class="caption__credit">{credit}</small>
  }
</Tag>
!!!

---

## Card.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/Card.astro`

### Frontmatter

!!!astro
---
/**
 * Card
 *
 * Bounded content container. Supports a media region, body, and footer
 * via named slots, plus link, interactive, and selectable behaviors.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="surface card [modifiers]" style="…CSS vars…" [aria-*]>
 *   <div class="card__media">…</div>     ← media slot, when present
 *   <div class="card__body">…</div>      ← default slot
 *   <div class="card__footer">…</div>    ← footer slot, when present
 * </div>
 *
 * When href is set, the root renders as <a>.
 * When selectable is set, role="button" + aria-pressed are added.
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Main body content — rendered inside .card__body
 *   media     Leading image/video — rendered inside .card__media (no padding)
 *   footer    Trailing actions or metadata — rendered inside .card__footer
 *
 * @example Simple content card
 * !!!astro
 * <Card variant="outlined">
 *   <Heading level={3}>Title</Heading>
 *   <Text>Description here.</Text>
 * </Card>
 * !!!
 *
 * @example Media card
 * !!!astro
 * <Card variant="elevated" color="primary">
 *   <Image slot="media" src={cover} alt="" ratio="16/9" />
 *   <Heading level={3}>Title</Heading>
 * </Card>
 * !!!
 *
 * @example Linked card
 * !!!astro
 * <Card href="/posts/123" variant="outlined" interactive>
 *   <Text>Read this post →</Text>
 * </Card>
 * !!!
 *
 * @example Selectable card (toggle)
 * !!!astro
 * <Card selectable selected={isActive} color="primary">
 *   <Text>Option A</Text>
 * </Card>
 * !!!
 *
 * @see card.hook.ts   — useCard: resolves props to { Tag, props }
 * @see card.props.ts  — CardProps: full prop reference
 * @see card.tokens.ts — CARD_TOKENS, CARD_DEFAULTS
 * @see card.css       — interaction, slot, and modifier styles
 * @see surface.css    — visual chrome (variants, color channels)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADJUSTING PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * VARIANT
 *   variant     [../surface.css]  .surface--{variant} — background, border, shadow
 *               @example variant="elevated" → lifts card on hover
 *
 * SPACING & SHAPE
 *   padding     [../surface.css]  --surface--padding → .card__body and .card__footer
 *   radius      [../surface.css]  --surface--radius → all corners; .card__media
 *               clips to top corners only
 *
 * COLOR
 *   color       [../surface.css]  --surface--color--* channels
 *               [./card.css]      .card--selected uses --surface--color--border/subtle
 *               @example color="danger" → red border on selected state
 *
 * BEHAVIOR
 *   interactive [./card.css]      .card--interactive — hover lift + pointer cursor
 *   selectable  [./card.css]      .card--selectable + aria-pressed
 *   selected    [./card.css]      .card--selected — tinted bg + strong border
 *   disabled    [./card.css]      .card--disabled — dimmed + no pointer events
 *
 * SLOTS
 *   media       [./card.css]      .card__media — overflow hidden, top radius clip
 *               Adjust aspect-ratio of media content here if needed
 *   footer      [./card.css]      .card__footer — top border + no top padding
 */

import type { CardProps } from "./card.props";
import { useCard }        from "./card.hook";
import "../../surface.css";
import "./card.css";

const { Tag, props } = useCard(Astro.props as CardProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  {Astro.slots.has("media") && (
    <div class="card__media"><slot name="media" /></div>
  )}
  <div class="card__body"><slot /></div>
  {Astro.slots.has("footer") && (
    <div class="card__footer"><slot name="footer" /></div>
  )}
</Tag>
!!!

---

## Carousel.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/Carousel.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Center.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/Center.astro`

### Frontmatter

!!!astro
---
import type { CenterProps } from "./center.props";
import { useCenter } from "./center.hook";
import "./center.css";

const { Tag, props } = useCenter(Astro.props as CenterProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## Checkbox.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/Checkbox.astro`

### Frontmatter

!!!astro
---
/**
 * Checkbox
 *
 * A boolean toggle rendered as a custom styled indicator square with an
 * optional label slot. The root element is a `<label>` that wraps both
 * the hidden native `<input type="checkbox">` and the custom indicator,
 * so the entire component area is clickable with no `for`/`id` wiring needed.
 *
 * STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────
 *   <label class="form checkbox …">
 *     <input class="checkbox__control" type="checkbox" />   ← hidden
 *     <span  class="checkbox__indicator" aria-hidden />     ← custom visual
 *     <span  class="checkbox__label"><slot /></span>        ← label content
 *   </label>
 *
 * DOM order is always: hidden input → indicator → label slot.
 * The `labelPosition` prop changes VISUAL order via CSS flex-direction.
 * This keeps the CSS ~ sibling combinator functional for state rules.
 *
 * VARIANTS
 * ─────────────────────────────────────────────────────────────────────────
 * Default variant is `"ghost"` (no wrapper border — traditional checkbox).
 * Pass `variant="outlined"` or `variant="soft"` for a bordered/filled
 * "selectable chip" where the entire label+indicator has visual chrome.
 *
 * INDETERMINATE
 * ─────────────────────────────────────────────────────────────────────────
 * Indeterminate is a DOM property, not an HTML attribute — it cannot be set
 * via server-rendered HTML. The hook adds `data-indeterminate` to the input
 * when `indeterminate={true}`. The <script> below reads `[data-indeterminate]`
 * and sets `.indeterminate = true` on those nodes after paint.
 *
 * The script is always bundled with this component (Astro deduplicates it to
 * one execution per page). It is a no-op when no `[data-indeterminate]`
 * elements exist. The `data-indeterminate` attribute IS the on/off switch.
 *
 * @slots
 *   default — Label content displayed next to the indicator.
 *             Can contain rich content (icons, emphasis, etc.).
 *             Avoid placing interactive elements (links, buttons) inside
 *             the label — they will also trigger the checkbox on click,
 *             which is a known browser behaviour for <label>-wrapped inputs.
 *
 * @example
 * <!-- Basic -->
 * <Checkbox name="agree">I accept the terms and conditions</Checkbox>
 *
 * @example
 * <!-- Controlled (checked on SSR render) -->
 * <Checkbox name="newsletter" checked value="subscribed">
 *   Receive updates
 * </Checkbox>
 *
 * @example
 * <!-- Indeterminate parent in a select-all pattern -->
 * <Checkbox name="select-all" indeterminate>Select all</Checkbox>
 *
 * @example
 * <!-- Chip/pill style (bordered wrapper) -->
 * <Checkbox name="tag" value="ts" variant="outlined" color="primary">
 *   TypeScript
 * </Checkbox>
 *
 * @example
 * <!-- Label to the left of the indicator -->
 * <Checkbox name="visible" labelPosition="start">Show in menu</Checkbox>
 *
 * @see checkbox.hook.ts  — resolves props to { Tag, props, inputAttrs }
 * @see checkbox.props.ts — full prop type reference
 * @see checkbox.css      — indicator styles, layout modifiers
 * @see forms.css         — shared variant and state styles
 */

import type { CheckboxProps } from "./checkbox.props";
import { useCheckbox }        from "./checkbox.hook";
import "~f/forms.css";
import "./checkbox.css";

const { Tag, props, inputAttrs } = useCheckbox(Astro.props as CheckboxProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  <input class="checkbox__control" {...inputAttrs} />
  <span class="checkbox__indicator" aria-hidden="true"></span>
  {Astro.slots.has("default") && (
    <span class="checkbox__label">
      <slot />
    </span>
  )}
</Tag>

<!--
  Indeterminate script — sets the .indeterminate DOM property on any
  <input> with [data-indeterminate]. Runs once per page (Astro deduplicates
  this script across all Checkbox instances). No-op when attribute is absent.
-->
!!!

### Scripts

!!!ts
document.querySelectorAll<HTMLInputElement>("[data-indeterminate]").forEach(el => {
    el.indeterminate = true;
  });
!!!

---

## Chip.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/Chip.astro`

### Frontmatter

!!!astro
---
import type { ChipProps } from "./chip.props";
import { useChip } from "./chip.hook";
import "../../feedback.css";
import "./chip.css";

type Props = ChipProps;

const { Tag: ChipElement, props: chipProps } = useChip(Astro.props);
---
!!!

### Template

!!!astro
<ChipElement {...chipProps}>
  <slot />
</ChipElement>
!!!

---

## Code.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/Code.astro`

### Frontmatter

!!!astro
---
import type { CodeProps } from "./code.props";
import { useCode }        from "./code.hook";
import "../../typography.css";
import "./code.css";

const { Tag, props } = useCode(Astro.props as CodeProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## Pre.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/Pre.astro`

### Frontmatter

!!!astro
---
import type { PreProps } from "./code.props";
import { usePre }        from "./code.hook";
import "../../typography.css";
import "./code.css";

const { Tag, props } = usePre(Astro.props as PreProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## ColorPicker.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/ColorPicker.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Columns.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/Columns.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Combobox.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/Combobox.astro`

### Frontmatter

!!!astro
---
/**
 * Combobox
 *
 * An accessible autocomplete combobox with a text filter input and a custom
 * `<ul role="listbox">` dropdown. All options are rendered server-side;
 * the JS controller filters them client-side without a network round-trip.
 *
 * STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────
 *   <div class="form combobox …" data-combobox>
 *     <input type="text"   class="combobox__control" role="combobox" … />
 *     <input type="hidden" name="{name}" value="{selectedValue}" />
 *     <div class="combobox__arrow">▾</div>
 *     <ul class="combobox__listbox" role="listbox" hidden>
 *       <li class="combobox__option" role="option" … />…</li>
 *       <li class="combobox__empty" …>No results</li>
 *     </ul>
 *   </div>
 *
 * WHY TWO INPUTS
 * ─────────────────────────────────────────────────────────────────────────
 * The visible `<input type="text">` is for display and filtering. It has no
 * `name` attribute and its value (the option label) is not submitted.
 * The hidden `<input type="hidden">` carries `name` and the selected option's
 * `value` (which may differ from the label) for form submission.
 *
 * ACCESSIBILITY
 * ─────────────────────────────────────────────────────────────────────────
 * The combobox pattern uses ARIA 1.2 practices:
 *   - Input: role="combobox", aria-expanded, aria-autocomplete="list",
 *            aria-controls="{listboxId}", aria-activedescendant
 *   - Listbox: role="listbox", id="{listboxId}"
 *   - Options: role="option", id="{listboxId}-{value}", aria-selected
 *
 * KEYBOARD INTERACTIONS (JS controller)
 * ─────────────────────────────────────────────────────────────────────────
 *   Type          → filters options; opens listbox if matches exist
 *   ↓ ArrowDown   → opens listbox; moves highlight to next visible option
 *   ↑ ArrowUp     → moves highlight to previous visible option
 *   Enter         → selects highlighted option
 *   Escape        → closes listbox; resets text to selected option's label
 *   Tab           → closes listbox
 *   Click option  → selects option
 *   Click outside → closes listbox
 *
 * @example
 * !!!astro
 * <Combobox
 *   name="country"
 *   placeholder="Select a country…"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *   ]}
 * />
 * !!!
 *
 * @see combobox.hook.ts  — resolves props to the full return shape
 * @see combobox.props.ts — full prop type reference
 * @see combobox.css      — listbox, option, and arrow styles
 * @see forms.css         — shared variant and state styles
 */

import type { ComboboxProps } from "./combobox.props";
import { useCombobox }        from "./combobox.hook";
import "~f/forms.css";
import "./combobox.css";

const { Tag, props, inputAttrs, hiddenAttrs, listboxAttrs, options, listboxId }
  = useCombobox(Astro.props as ComboboxProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  <input class="combobox__control" {...inputAttrs} />
  <input {...hiddenAttrs} />

  <div class="combobox__arrow" aria-hidden="true">▾</div>

  <ul class="combobox__listbox" {...listboxAttrs}>
    {options.map((opt) => (
      <li
        class="combobox__option"
        role="option"
        id={`${listboxId}-${opt.value}`}
        data-value={opt.value}
        aria-selected={opt.selected ? "true" : "false"}
        aria-disabled={opt.disabled ? "true" : undefined}
      >
        {opt.label}
      </li>
    ))}
    <li class="combobox__empty" aria-live="polite">No results</li>
  </ul>
</Tag>

<!--
  Combobox controller script.
  Runs once per page (Astro deduplicates). Initialises a ComboboxController
  instance for each [data-combobox] element found in the DOM.

  STATE MANAGED BY JS (not SSR):
  - aria-expanded on the text input
  - aria-activedescendant on the text input (tracks keyboard-highlighted option)
  - hidden attribute on the listbox (open/close)
  - hidden attribute on individual options (filter results)
  - combobox__option--active class (keyboard highlight)
  - combobox__empty visibility
  - hidden input value (selected option value)
  - text input value (selected option label)
-->
!!!

### Scripts

!!!ts
class ComboboxController {
    private wrapper:   HTMLElement;
    private input:     HTMLInputElement;
    private hidden:    HTMLInputElement;
    private listbox:   HTMLElement;
    private opts:      HTMLElement[];
    private empty:     HTMLElement | null;
    private active:    HTMLElement | null = null;
    private selected:  HTMLElement | null = null;
    private caseSensitive: boolean;

    constructor(wrapper: HTMLElement) {
      this.wrapper  = wrapper;
      this.input    = wrapper.querySelector<HTMLInputElement>(".combobox__control")!;
      this.hidden   = wrapper.querySelector<HTMLInputElement>('input[type="hidden"]')!;
      this.listbox  = wrapper.querySelector<HTMLElement>(".combobox__listbox")!;
      this.opts     = Array.from(wrapper.querySelectorAll<HTMLElement>(".combobox__option"));
      this.empty    = wrapper.querySelector<HTMLElement>(".combobox__empty");
      this.caseSensitive = wrapper.hasAttribute("data-case-sensitive");

      this.#bind();
      this.#initSelected();
    }

    // ── Initialisation ─────────────────────────────────────────────────────

    #initSelected() {
      // Find the option that matches the hidden input's initial value (from SSR)
      const initialValue = this.hidden.value;
      if (initialValue) {
        const match = this.opts.find(o => o.dataset.value === initialValue);
        if (match) {
          this.selected = match;
          match.setAttribute("aria-selected", "true");
          // Text input is already populated by the hook (displayValue from SSR)
        }
      }
    }

    // ── Event binding ──────────────────────────────────────────────────────

    #bind() {
      this.input.addEventListener("input",   () => this.#onInput());
      this.input.addEventListener("keydown", (e) => this.#onKeydown(e));
      this.input.addEventListener("focus",   () => this.#open());

      // mousedown (not click) prevents input from losing focus before selection
      this.listbox.addEventListener("mousedown", (e) => {
        const opt = (e.target as HTMLElement).closest<HTMLElement>(".combobox__option");
        if (opt && opt.getAttribute("aria-disabled") !== "true") {
          e.preventDefault(); // keep input focused
          this.#select(opt);
        }
      });

      // Close on click outside
      document.addEventListener("click", (e) => {
        if (!this.wrapper.contains(e.target as Node)) this.#close();
      });
    }

    // ── Input handler ──────────────────────────────────────────────────────

    #onInput() {
      const raw   = this.input.value;
      const query = this.caseSensitive ? raw : raw.toLowerCase();
      let   count = 0;

      this.opts.forEach(opt => {
        const label = this.caseSensitive
          ? (opt.textContent ?? "")
          : (opt.textContent ?? "").toLowerCase();
        const match = label.includes(query);
        opt.hidden  = !match;
        if (match) count++;
      });

      // Empty state visibility
      if (this.empty) {
        this.empty.classList.toggle("combobox__empty--visible", count === 0);
      }

      this.#clearActive();
      count > 0 ? this.#open() : this.#close();
    }

    // ── Keyboard handler ───────────────────────────────────────────────────

    #onKeydown(e: KeyboardEvent) {
      const isOpen = !this.listbox.hidden;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) this.#open();
          this.#moveActive(1);
          break;

        case "ArrowUp":
          e.preventDefault();
          this.#moveActive(-1);
          break;

        case "Enter":
          if (isOpen && this.active) {
            e.preventDefault();
            this.#select(this.active);
          }
          break;

        case "Escape":
          if (isOpen) {
            e.preventDefault();
            this.#close();
            // Reset text to the currently selected option's label
            this.input.value = this.selected
              ? (this.selected.textContent ?? "").trim()
              : "";
            // Restore all options (un-filter)
            this.opts.forEach(o => { o.hidden = false; });
          }
          break;

        case "Tab":
          this.#close();
          break;
      }
    }

    // ── Listbox open/close ─────────────────────────────────────────────────

    #open() {
      this.listbox.hidden = false;
      this.input.setAttribute("aria-expanded", "true");
    }

    #close() {
      this.listbox.hidden = true;
      this.input.setAttribute("aria-expanded", "false");
      this.#clearActive();
    }

    // ── Keyboard navigation ────────────────────────────────────────────────

    #moveActive(dir: 1 | -1) {
      const visible = this.opts.filter(o => !o.hidden && o.getAttribute("aria-disabled") !== "true");
      if (!visible.length) return;

      const idx  = this.active ? visible.indexOf(this.active) : -1;
      const next = visible.at((idx + dir + visible.length) % visible.length)!;
      this.#setActive(next);
    }

    #setActive(opt: HTMLElement | null) {
      if (this.active) {
        this.active.classList.remove("combobox__option--active");
        this.active.removeAttribute("aria-selected");
        // Restore aria-selected for the actually-selected item
        if (this.active === this.selected) {
          this.active.setAttribute("aria-selected", "true");
        } else {
          this.active.setAttribute("aria-selected", "false");
        }
      }

      this.active = opt;

      if (opt) {
        opt.classList.add("combobox__option--active");
        opt.setAttribute("aria-selected", "true");
        opt.scrollIntoView({ block: "nearest" });
        this.input.setAttribute("aria-activedescendant", opt.id);
      } else {
        this.input.removeAttribute("aria-activedescendant");
      }
    }

    #clearActive() {
      this.#setActive(null);
    }

    // ── Selection ──────────────────────────────────────────────────────────

    #select(opt: HTMLElement) {
      // Deselect previous
      if (this.selected) {
        this.selected.setAttribute("aria-selected", "false");
      }

      this.selected = opt;
      opt.setAttribute("aria-selected", "true");

      // Update both inputs
      this.input.value  = (opt.textContent ?? "").trim();
      this.hidden.value = opt.dataset.value ?? "";

      // Dispatch change so external listeners (e.g. reactive frameworks) hear it
      this.hidden.dispatchEvent(new Event("change", { bubbles: true }));

      // Restore all options visibility for next open
      this.opts.forEach(o => { o.hidden = false; });
      if (this.empty) {
        this.empty.classList.remove("combobox__empty--visible");
      }

      this.#close();
    }
  }

  // Initialise all combobox instances on the page
  document
    .querySelectorAll<HTMLElement>("[data-combobox]")
    .forEach(el => new ComboboxController(el));
!!!

---

## CommandPalette.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/CommandPalette.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Container.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/Container.astro`

### Frontmatter

!!!astro
---
import type { ContainerProps } from "./container.props";
import { useContainer } from "./container.hook";
import "./container.css";

const { Tag, props } = useContainer(Astro.props as ContainerProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## ContextMenu.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/ContextMenu.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Cropper.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/Cropper.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## DatePicker.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/date-picker/DatePicker.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Dot.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/dot/Dot.astro`

### Frontmatter

!!!astro
---
/**
 * Dot
 *
 * A tiny status or presence indicator dot.
 *
 * @example
 * <!-- Standard red/error status dot -->
 * <Dot color="danger" />
 *
 * @example
 * <!-- Pulsing green/online dot -->
 * <Dot color="success" pulse />
 *
 * @example
 * <!-- Outlined dot -->
 * <Dot variant="outlined" color="primary" />
 */
import type { DotProps } from "./dot.props";
import { useDot }        from "./dot.hook";
import "../../feedback.css";
import "./dot.css";

type Props = DotProps;

const { Tag, props } = useDot(Astro.props as DotProps);
---
!!!

### Template

!!!astro
<Tag {...props as Record<string, unknown>} />
!!!

---

## Drawer.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/Drawer.astro`

### Frontmatter

!!!astro
---
import type { DrawerProps } from "./drawer.props";
import { useDrawer } from "./drawer.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import H from "~/typography/components/heading/H.astro";
import "./drawer.css";

const { dialogProps, title, titleId } = useDrawer(Astro.props as DrawerProps);
---
!!!

### Template

!!!astro
<dialog {...dialogProps}>
  <div class="drawer__header">
    {title && <H level={3} id={titleId} class="drawer__title">{title}</H>}
    <button
      class="drawer__close-btn"
      type="button"
      aria-label="Close"
      data-drawer-close={dialogProps.id}
    >
      <Icon name="x" size="sm" />
    </button>
  </div>

  <div class="drawer__body">
    <slot />
  </div>

  {Astro.slots.has("footer") && (
    <div class="drawer__footer">
      <slot name="footer" />
    </div>
  )}
</dialog>
!!!

### Scripts

!!!ts
import { initDrawers } from "./drawer.client";
  initDrawers();
  document.addEventListener("astro:after-swap", initDrawers);
!!!

---

## DropdownItem.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/DropdownItem.astro`

### Frontmatter

!!!astro
---
import type { DropdownItemProps } from "./dropdown-menu.props";
import Icon from "~/assets/components/icon/Icon.astro";
import type { SvgName } from "~/shared/icons";

const { href, icon, popovertarget, disabled } = Astro.props as DropdownItemProps;

const Tag = href ? "a" : "button";
const tagProps = {
  class: "dropdown-menu__item",
  ...(href         ? { href }         : {}),
  ...(popovertarget ? { popovertarget } : {}),
  ...(disabled     ? { disabled }     : {}),
  ...(!href        ? { type: "button" as const } : {}),
};
---
!!!

### Template

!!!astro
<Tag {...tagProps}>
  {icon && <Icon name={icon as SvgName} size="sm" class="dropdown-menu__item-icon" />}
  <span class="dropdown-menu__item-label"><slot /></span>
  {popovertarget && <Icon name="chevron-right" size="sm" class="dropdown-menu__item-chevron" />}
</Tag>
!!!

---

## DropdownMenu.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/DropdownMenu.astro`

### Frontmatter

!!!astro
---
import type { DropdownMenuProps } from "./dropdown-menu.props";
import { useDropdownMenu } from "./dropdown-menu.hook";
import "../../overlays.css";
import "./dropdown-menu.css";

const { popoverProps } = useDropdownMenu(Astro.props as DropdownMenuProps);
---
!!!

### Template

!!!astro
<div {...popoverProps}>
  <slot />
</div>
!!!

### Scripts

!!!ts
import { initDropdownMenus } from "./dropdown-menu.client";
  initDropdownMenus();
  document.addEventListener("astro:after-swap", initDropdownMenus);
!!!

---

## EmptyState.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/empty-state/EmptyState.astro`

### Frontmatter

!!!astro
---
import type { EmptyStateProps } from "./empty-state.props";
import { useEmptyState } from "./empty-state.hook";
import Icon from "~/assets/components/icon/Icon.astro";import "../../feedback.css";
import "./empty-state.css";

const { props, title, description } = useEmptyState(Astro.props as EmptyStateProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<div {...props}>
  {(icon || Astro.slots.has("icon")) && (
    <div class="empty-state__icon">
      {icon ? <Icon name={icon} /> : <slot name="icon" />}
    </div>
  )}
  {title && <div class="empty-state__title">{title}</div>}
  {(description || Astro.slots.has("default")) && (
    <div class="empty-state__description">
      {description ? description : <slot />}
    </div>
  )}
  {Astro.slots.has("actions") && (
    <div class="empty-state__actions">
      <slot name="actions" />
    </div>
  )}
</div>
!!!

---

## Feed.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/feed/Feed.astro`

### Frontmatter

!!!astro
---
/**
 * Feed
 *
 * Renders an activity feed / timeline with connected nodes.
 *
 * @example
 * !!!astro
 * <Feed data={[
 *   { title: "Commit pushed", timestamp: "2m ago", description: "Fix bug" },
 *   { title: "PR opened", timestamp: "10m ago" }
 * ]} />
 * !!!
 */
import type { FeedProps } from "./feed.props";
import { useFeed } from "./feed.hook";
import Link from "~/triggers_/link/Link.astro";
import Skeleton from "~/shared/components/skeleton/Skeleton.astro";
import "~/shared/components/skeleton/skeleton.css";
import "../../data.css";
import "./feed.css";

const { Tag, props, data, caption } = useFeed(Astro.props as FeedProps);

const isLoading = "data-loading" in props;
const isEmpty = Array.isArray(data) && data.length === 0;
const emptyMsg =
  typeof Astro.props.empty === "string" ? Astro.props.empty : "No activity";
const skeletonCount = 3;

// Format timestamp if it's a Date
const formatTime = (ts: string | Date | undefined) => {
  if (!ts) return null;
  if (ts instanceof Date) return ts.toLocaleDateString();
  return ts;
};
---
!!!

### Template

!!!astro
<Tag {...props}>
  {caption && <p class="feed__caption">{caption}</p>}

  {
    isLoading ? (
      Array.from({ length: skeletonCount }).map(() => (
        <li class="feed__item" aria-hidden="true">
          <div class="feed__node-container">
            <div class="feed__node">
              <Skeleton variant="avatar" style="width:100%;height:100%" />
            </div>
            <div class="feed__line" />
          </div>
          <div class="feed__content">
            <Skeleton variant="text" lines={1} />
            <Skeleton variant="text" lines={2} />
          </div>
        </li>
      ))
    ) : isEmpty ? (
      <li class="feed__item">
        {Astro.slots.has("empty") ? (
          <slot name="empty" />
        ) : (
          <span class="data__empty">{emptyMsg}</span>
        )}
      </li>
    ) : (
      data?.map((item) => {
        const content = (
          <>
            <div class="feed__header">
              <span class="feed__title">{item.title}</span>
              {item.timestamp && (
                <span class="feed__timestamp">
                  {formatTime(item.timestamp)}
                </span>
              )}
            </div>
            {item.description && (
              <span class="feed__description">{item.description}</span>
            )}
          </>
        );

        return (
          <li class="feed__item">
            <div class="feed__node-container" aria-hidden="true">
              <div class="feed__node">
                {item.icon ? (
                  item.icon
                ) : (
                  <div style="width:8px;height:8px;border-radius:50%;background:currentColor" />
                )}
              </div>
              <div class="feed__line" />
            </div>
            <div class="feed__content">
              {item.href ? (
                <Link href={item.href} class="feed__link">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          </li>
        );
      })
    )
  }
</Tag>
!!!

---

## Field.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/field/Field.astro`

### Frontmatter

!!!astro
---
/**
 * Field
 *
 * Accessibility wrapper that binds a Label, a form control, and
 * optional hint/error/success messages into one accessible unit.
 *
 * Field is structural — it renders no form elements of its own. All
 * interactive semantics live in the slotted control (Input, Select, etc.).
 *
 * ACCESSIBILITY WIRING
 * ─────────────────────────────────────────────────────────────────────────
 * Field cannot automatically wire `aria-describedby` because Astro named
 * slots do not support passing runtime values into slotted content. The
 * consumer connects the pieces manually using the `id` prop as a base:
 *
 *   Field renders:
 *     <p id="{id}-hint">   ← hint slot wrapper
 *     <p id="{id}-error">  ← error slot wrapper
 *
 *   Consumer provides:
 *     <Input aria-describedby="{id}-hint {id}-error" />
 *     <Label for="{id}" />   (or for the control's own id)
 *
 * @slots
 *   label   — The field label. Use <Label for="controlId" required?> here.
 *             Rendered above the control with no additional spacing.
 *
 *   default — The form control (Input, Select, Checkbox, Radio, etc.).
 *             Rendered between the label and the hint/error sections.
 *
 *   hint    — Helper text. Shown below the control in secondary color.
 *             Always rendered when the slot has content, regardless of
 *             invalid state (though invalid dims the hint; see field.css).
 *
 *   error   — Validation error message. Rendered with danger color and
 *             role="alert" so screen readers announce it on appearance.
 *             Should be conditionally rendered by the consumer — only
 *             put content here when invalid is true.
 *
 *   success — Confirmation message. Rendered with success color.
 *             Mutually exclusive with error in practice (only one state
 *             is active at a time), but both can technically be slotted.
 *
 * @example
 * <!-- Minimal — no id wiring -->
 * <Field>
 *   <Label slot="label">First name</Label>
 *   <Input name="first" />
 * </Field>
 *
 * @example
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
 *     fullWidth
 *   />
 *   <span slot="hint" id="email-hint">We'll never share your email.</span>
 *   {!emailValid && (
 *     <span slot="error" id="email-error">Enter a valid email address.</span>
 *   )}
 * </Field>
 *
 * @see field.hook.ts  — resolves props to { Tag, id, props }
 * @see field.props.ts — full prop reference
 * @see field.css      — section spacing and message text styles
 */

import type { FieldProps } from "./field.props";
import { useField }        from "./field.hook";
import Icon from "~/assets/components/icon/Icon.astro";import "./field.css";

const { Tag, id, icon, props } = useField(Astro.props as FieldProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  {Astro.slots.has("label") && (
    <div class="field__label">
      {icon && <Icon name={icon} />}
      <slot name="label" />
    </div>
  )}

  <div class="field__control">
    <slot />
  </div>

  {Astro.slots.has("hint") && (
    <p class="field__hint" id={id ? `${id}-hint` : undefined}>
      <slot name="hint" />
    </p>
  )}

  {Astro.slots.has("error") && (
    <p class="field__error" id={id ? `${id}-error` : undefined} role="alert">
      <slot name="error" />
    </p>
  )}

  {Astro.slots.has("success") && (
    <p class="field__success" id={id ? `${id}-success` : undefined}>
      <slot name="success" />
    </p>
  )}
</Tag>
!!!

---

## FilePreview.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/file-preview/FilePreview.astro`

### Frontmatter

!!!astro
---
import type { FilePreviewProps } from "./file-preview.props";
import { useFilePreview } from "./file-preview.hook";
import "./file-preview.css";

type Props = FilePreviewProps;

const { name, src, ext: _ext, label, fileSize, removable, onRemove, props } =
  useFilePreview(Astro.props as FilePreviewProps);
---
!!!

### Template

!!!astro
<div {...props}>
  {src ? (
    <img class="file-preview__thumb" src={src} alt={name} loading="lazy" />
  ) : (
    <div class="file-preview__icon" aria-hidden="true">{label}</div>
  )}

  <div class="file-preview__meta">
    <span class="file-preview__name" title={name}>{name}</span>
    {fileSize && <span class="file-preview__size">{fileSize}</span>}
  </div>

  {removable && (
    <button
      class="file-preview__remove"
      type="button"
      aria-label={`Remove ${name}`}
      onclick={onRemove}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
        <path d="M1 1l8 8M9 1l-8 8" />
      </svg>
    </button>
  )}
</div>
!!!

---

## FileUpload.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/file-upload/FileUpload.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Flex.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/Flex.astro`

### Frontmatter

!!!astro
---
import type { FlexProps } from "./flex.props";
import { useFlex } from "./flex.hook";
import "./flex.css";

const { Tag, props } = useFlex(Astro.props as FlexProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## Footer.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/footer/Footer.astro`

### Frontmatter

!!!astro
---
/**
 * Footer Component
 *
 * The site-wide page footer. Renders as a semantic `<footer>` element with an
 * opinionated default layout (row, space-between, centered children) and
 * `--bg--1` background — no props required for a presentable result.
 *
 * Inherits the full `LayoutProps` + `SpacingProps` chain, so all spacing
 * shorthands (`px`, `py`, `p`, `m`, …) and flex controls (`gap`, `align`,
 * `justify`) are available as props.
 *
 * Named slots:
 *   `start`   — left side: copyright notice, brand mark.
 *   (default) — center: nav links, social icons, or other stretch content.
 *   `end`     — right side: legal links, locale picker, back-to-top.
 *
 * @example Minimal (all defaults apply)
 * !!!astro
 * <Footer>
 *   <span slot="start">© 2026 Acme Co.</span>
 *   <NavLinks />
 *   <LegalLinks slot="end" />
 * </Footer>
 * !!!
 *
 * @example Custom vertical padding and background
 * !!!astro
 * <Footer py="xl" bg="var(--bg--0)">
 *   <span slot="start">© 2026 Acme Co.</span>
 * </Footer>
 * !!!
 */
import type { FooterProps } from "./footer.props";
import { useFooter } from "./footer.hook";
import "./footer.css";

type Props = FooterProps;

const { Tag, props: footerProps } = useFooter(Astro.props);
---
!!!

### Template

!!!astro
<Tag {...footerProps}>
  <slot name="start" />
  <slot />
  <slot name="end" />
</Tag>
!!!

---

## Frame.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/Frame.astro`

### Frontmatter

!!!astro
---
/**
 * Frame
 *
 * Aspect-ratio bounded media container. Inherits surface properties.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="surface frame [modifiers]" style="…CSS vars…">
 *   <slot />
 * </div>
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Content (usually an image or video)
 *
 * @example
 * !!!astro
 * <Frame ratio="16/9" radius="md">
 *   <img src="/cover.jpg" alt="" />
 * </Frame>
 * !!!
 *
 * @see frame.hook.ts   — useFrame: resolves props to { Tag, props }
 * @see frame.props.ts  — FrameProps: full prop reference
 * @see surface.css     — visual chrome
 * @see frame.css       — aspect ratio and clipping
 */

import type { FrameProps } from "./frame.props";
import { useFrame }        from "./frame.hook";
import "../../surface.css";
import "./frame.css";

const { Tag, props } = useFrame(Astro.props as FrameProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## GalleryItem.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery-item/GalleryItem.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Gallery.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery/Gallery.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Grid.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/Grid.astro`

### Frontmatter

!!!astro
---
import type { GridProps } from "./grid.props";
import { useGrid } from "./grid.hook";
import "./grid.css";

const { Tag, props } = useGrid(Astro.props as GridProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## Header.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/header/Header.astro`

### Frontmatter

!!!astro
---
/**
 * Header Component
 *
 * The site-wide page header. Renders as a semantic `<header>` element with an
 * opinionated default layout (row, space-between, centered children) and
 * `--bg--1` background — no props required for a presentable result.
 *
 * Inherits the full `LayoutProps` + `SpacingProps` chain, so all spacing
 * shorthands (`px`, `py`, `p`, `m`, …) and flex controls (`gap`, `align`,
 * `justify`) are available as props.
 *
 * Named slots:
 *   `start`   — left side: logo, wordmark, hamburger menu.
 *   (default) — center: primary nav, search, or other stretch content.
 *   `end`     — right side: CTA buttons, user avatar, icon cluster.
 *
 * @example Minimal (all defaults apply)
 * !!!astro
 * <Header>
 *   <Logo slot="start" />
 *   <Nav />
 *   <UserMenu slot="end" />
 * </Header>
 * !!!
 *
 * @example Sticky header with custom horizontal padding
 * !!!astro
 * <Header sticky px="xl">
 *   <Logo slot="start" />
 *   <UserMenu slot="end" />
 * </Header>
 * !!!
 */
import type { HeaderProps } from "./header.props";
import { useHeader } from "./header.hook";
import "./header.css";

type Props = HeaderProps;

const { Tag, props: headerProps } = useHeader(Astro.props);
---
!!!

### Template

!!!astro
<Tag {...headerProps}>
  <slot name="start" />
  <slot />
  <slot name="end" />
</Tag>
!!!

---

## H.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/heading/H.astro`

### Frontmatter

!!!astro
---
import type { HeadingProps } from "./heading.props";
import { useHeading } from "./heading.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "../../typography.css";
import "./heading.css";

const { Tag, props } = useHeading(Astro.props as HeadingProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...props}>
  {icon && <Icon name={icon} />}
  <slot />
</Tag>
!!!

---

## Icon.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/icon/Icon.astro`

### Frontmatter

!!!astro
---
/**
 * A wrapper for Astro's SVGComponent with an icon registry and generated types
 * 
 * @example
 * !!!astro
 * <Icon name="home" />
 * !!!
 * 
 */
import type { IconProps } from "./icon.props";
import { useIcon } from "./icon.hook";
import { icons } from "~/shared/icons";
import "./icon.css";

type Props = IconProps;

const { name, props: iconProps } = useIcon(Astro.props);

// Retrieve the corresponding SVG component from the registry
const SvgIcon = (icons as Record<string, typeof icons[keyof typeof icons]>)[name];

if (!SvgIcon) {
  throw new Error(`Icon "${name}" not found in the registry. Did you forget to add it to src/design/shared/icons?`);
}
---
!!!

### Template

!!!astro
<span {...iconProps}>
  <SvgIcon />
</span>
!!!

---

## Image.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/image/Image.astro`

### Frontmatter

!!!astro
---
import type { ImageProps } from "./image.props";
import { useImage } from "./image.hook";
import "./image.css";

type Props = ImageProps;

const { props } = useImage(Astro.props as Props);
---
!!!

### Template

!!!astro
<img {...props} />
!!!

---

## Indent.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/indent/Indent.astro`

### Frontmatter

!!!astro
---
/**
 * src/design/typography/components/indent/Indent.astro
 * 
 * A component that adds a left-indent to the text content.
 * 
 * @example
 * !!!astro
 * <Indent prose="md"><Text>Press the button</Text></Indent>
 * !!!
 * 
 * @see indent.hook.ts   — resolves props to { Tag, props, type }
 * @see typography.hook.ts — resolves props to { typographyAttributes }
 * @see base.props.ts    — base component props
 * @see typography.props.ts - typography-specific props, extends BaseComponentProps
 * @see indent.props.ts  — full prop type reference extending TypographyProps
 * @see typography.css   — shared typography styles
 * @see indent.css       — indent-specific styles
 */
import type { IndentProps } from './indent.props';
import { useIndent } from './indent.hook';
import "~/typography/typography.css";
import "./indent.css";

type Props = IndentProps;

const { Tag, props } = useIndent(Astro.props as IndentProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  <slot />
</Tag>
!!!

---

## Indicator.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/indicator/Indicator.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Inline.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/Inline.astro`

### Frontmatter

!!!astro
---
import type { InlineProps } from "./inline.props";
import { useInline } from "./inline.hook";
import "./inline.css";

const { Tag, props } = useInline(Astro.props as InlineProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## InputGroup.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input-group/InputGroup.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Input.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input/Input.astro`

### Frontmatter

!!!astro
---
/**
 * Input
 *
 * Single-line text input with optional leading/trailing slot content.
 * The visual border and background belong to the wrapper element;
 * the inner <input> is transparent and inherits all visual properties.
 *
 * @slots
 *   start — Leading content inside the field boundary.
 *           Common uses: search icon, flag + dial code, currency symbol.
 *           Non-interactive content; pointer-events are suppressed.
 *           For interactive content (e.g. a country-code selector), set
 *           pointer-events: auto on the slotted element directly.
 *
 *   end   — Trailing content inside the field boundary.
 *           Common uses: password-reveal button, clear button, character count.
 *           Interactive elements (buttons, links) inside this slot receive
 *           pointer-events automatically via input.css.
 *
 * @example
 * <!-- Basic text input -->
 * <Input name="username" placeholder="Username" />
 *
 * @example
 * <!-- Password with reveal toggle (end slot) -->
 * <Input id="password" name="password" type="password" required>
 *   <button slot="end" type="button" aria-label="Show password">👁</button>
 * </Input>
 *
 * @example
 * <!-- Search input with leading icon (start slot) -->
 * <Input name="q" type="search" placeholder="Search…" size="lg" fullWidth>
 *   <Icon slot="start" name="search" />
 * </Input>
 *
 * @example
 * <!-- Inside a Field for full accessibility wiring -->
 * <Field id="email" invalid={!isValid}>
 *   <Label slot="label" for="email" required>Email</Label>
 *   <Input
 *     id="email"
 *     name="email"
 *     type="email"
 *     invalid={!isValid}
 *     aria-describedby="email-error"
 *     fullWidth
 *   />
 *   <span slot="error" id="email-error">Enter a valid email address.</span>
 * </Field>
 *
 * @see input.hook.ts  — resolves props to { Tag, props, inputAttrs }
 * @see input.props.ts — full prop type reference
 * @see input.css      — inner control and slot styles
 * @see forms.css      — shared variant and state styles
 */

import type { InputProps } from "./input.props";
import { useInput }        from "./input.hook";
import Icon from "~/assets/components/icon/Icon.astro";import "../../forms.css";
import "./input.css";

const { Tag, props, inputAttrs } = useInput(Astro.props as InputProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...props}>
  {(icon || Astro.slots.has("start")) && (
    <div class="input__start">
      {icon ? <Icon name={icon} /> : <slot name="start" />}
    </div>
  )}

  <input class="input__control" {...inputAttrs} />

  {Astro.slots.has("end") && (
    <div class="input__end">
      <slot name="end" />
    </div>
  )}
</Tag>
!!!

---

## Kbd.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/kbd/Kbd.astro`

### Frontmatter

!!!astro
---
import type { KbdProps } from "./kbd.props";
import { useKbd } from "./kbd.hook";
import Icon from "~/assets/components/icon/Icon.astro";import "./kbd.css";

const { props } = useKbd(Astro.props as KbdProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<kbd {...props}>
  {icon && <Icon name={icon} />}
  <slot />
</kbd>
!!!

---

## Label.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/Label.astro`

### Frontmatter

!!!astro
---
/**
 * Label
 *
 * A typographically styled `<label>` element using the fixed font-size
 * scale. Sits in the `typography` category alongside Text and Heading,
 * but lives in `forms/field/` and `forms/` contexts.
 *
 * SCALE DIFFERENCE FROM TEXT / HEADING
 * ─────────────────────────────────────────────────────────────────────────
 * Text and Heading use TEXT_SIZE (responsive — may use clamp()).
 * Label uses TEXT_SIZE_FIXED (fixed px/rem — never reflows with viewport).
 * This is enforced at the token level: LABEL_TOKENS overrides the `size`
 * dimension to use --fsf--* variables. The CSS channel (--typography--size)
 * is the same; only the value source differs.
 *
 * REQUIRED INDICATOR
 * ─────────────────────────────────────────────────────────────────────────
 * When `required={true}`, an aria-hidden asterisk is rendered after the
 * label text. Screen readers skip it (they read `aria-required` on the
 * control). Sighted users see the red * as a visual convention.
 *
 * `required` on Label is visual-only. Always also set `required` on the
 * control (Input, Select, etc.) for native validation and ARIA semantics.
 *
 * @slots
 *   default — The label text. Can include inline markup (em, strong, etc.)
 *             but avoid interactive elements — they create confusing focus
 *             behaviour inside a <label>.
 *
 * @example
 * <!-- Basic — clicking focuses the associated control -->
 * <Label for="email">Email address</Label>
 *
 * @example
 * <!-- Required field indicator -->
 * <Label for="password" required>Password</Label>
 * <!-- Renders: Password <span aria-hidden="true">*</span> -->
 *
 * @example
 * <!-- Custom size / weight -->
 * <Label for="bio" size="xs" weight="normal" color="secondary">
 *   Short bio (optional)
 * </Label>
 *
 * @example
 * <!-- Inside a Field — use the label slot -->
 * <Field id="email">
 *   <Label slot="label" for="email" required>Email</Label>
 *   <Input id="email" name="email" required />
 * </Field>
 *
 * @see label.hook.ts  — resolves props to { Tag, props, required }
 * @see label.props.ts — full prop type reference
 * @see label.tokens.ts — LABEL_TOKENS with fixed size scale
 * @see label.css      — cursor and required indicator styles
 * @see typography.css — base typography styles (both files are imported)
 */

import type { LabelProps } from "./label.props";
import { useLabel }        from "./label.hook";
import Icon from "~/assets/components/icon/Icon.astro";import "../../typography.css";
import "./label.css";

const { Tag, props, required } = useLabel(Astro.props as LabelProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...props}>
  {icon && <Icon name={icon} />}
  <slot />
  {required && (
    <span class="label__required" aria-hidden="true">*</span>
  )}
</Tag>
!!!

---

## Lightbox.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/lightbox/Lightbox.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Link.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/link/Link.astro`

### Frontmatter

!!!astro
---
/**
 * Link Component
 * 
 * An interactive navigational element extending the Typography interface.
 * Used for inline text links, external references, and semantic navigation.
 * 
 * Supports:
 * - All typography tokens (size, weight, family, color)
 * - Safe external linking (`external` prop)
 * - Underline behaviors (`always`, `hover`, `never`)
 * 
 * @example
 * !!!astro
 * <Link href="/about" color="primary">About Us</Link>
 * <Link href="https://google.com" external underline="always">Google</Link>
 * !!!
 */

import type { LinkProps } from "./link.props";
import { useLink } from "./link.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "./link.css";

type Props = LinkProps;

const { Tag, props: linkProps } = useLink(Astro.props);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...linkProps}>
  {icon && <Icon name={icon} />}
  <slot />
</Tag>
!!!

---

## List.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/List.astro`

### Frontmatter

!!!astro
---
/**
 * List
 *
 * Renders a collection of items as a `<ul>` or `<ol>`. Supports two modes:
 *
 *   Data-driven  Pass `data` and List handles all rendering — icons,
 *                descriptions, badges, checkboxes, links, nested lists.
 *
 *   Compound     Use the `items` slot for full structural control.
 *                All data category props still apply to the root element.
 *
 * HTML STRUCTURE (data-driven)
 * ─────────────────────────────────────────────────────────────────────────────
 * <ul class="data list [modifiers]" [data-attrs]>
 *   <li class="list__item">
 *     <span class="list__icon">…</span>       optional
 *     <span class="list__content">
 *       <span class="list__label">…</span>
 *       <span class="list__description">…</span>   optional
 *     </span>
 *     <span class="list__badge">…</span>      optional
 *   </li>
 *   <li class="list__item">
 *     …
 *     <ul class="list list__nested">…</ul>    when item.children is set
 *   </li>
 * </ul>
 *
 * When item.href is set: item content is wrapped in <a class="list__link">.
 * When item.checkState is set: a <Checkbox> renders before the content.
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   items   Replaces data-driven <li> rendering. Use for fully custom items.
 *   empty   Replaces the default empty state message.
 *
 * @example Data-driven to-do list
 * !!!astro
 * <List
 *   data={tasks}
 *   caption="Sprint tasks"
 *   color="primary"
 *   bordered
 *   interactive
 * />
 * !!!
 *
 * @example Link list
 * !!!astro
 * <List
 *   data={[
 *     { label: "Docs",   href: "/docs",   icon: "book"   },
 *     { label: "GitHub", href: "/github", icon: "github" },
 *   ]}
 *   color="primary"
 * />
 * !!!
 *
 * @example Nested list
 * !!!astro
 * <List data={[
 *   { label: "Frontend", children: [
 *     { label: "React" },
 *     { label: "Astro" },
 *   ]},
 * ]} />
 * !!!
 *
 * @example Compound mode
 * !!!astro
 * <List color="primary" bordered>
 *   <li slot="items" class="list__item">
 *     <span class="list__label">Custom item</span>
 *   </li>
 * </List>
 * !!!
 *
 * @see list.hook.ts    — useList: resolves props to Tag + props
 * @see list.props.ts   — ListProps: full prop reference
 * @see list.tokens.ts  — LIST_TOKENS, ListItem, LIST_DEFAULTS
 * @see list.css        — list-specific styles
 * @see data.css        — shared data category styles
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADJUSTING PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * COLOR CHANNELS
 *   color       [./list.css]  var(--data--color--*) in item separators,
 *                             hover bg, icon color, link hover
 *               @example color="primary" → cyan separators + hover
 *
 *   bg          [./list.css]  var(--bg--*) in striped item backgrounds
 *               @example bg="neutral"  → subtle grey stripe
 *
 *   highlight   [./list.css]  var(--data--highlight--*) on .list__item--highlighted
 *               @example highlight="warning" → amber left-border accent
 *
 * CONTAINER
 *   variant     [./data.css]  plain | outlined | soft | elevated — on root
 *   size        [./list.css]  calc(var(--data--size) * N) on item padding/gap
 *               @example size="compact" → --data--size: var(--space-in--xs)
 *
 * METADATA
 *   caption     [./List.astro] renders as <p class="list__caption"> above list.
 *               Style the caption in list.css under .list__caption.
 *
 * STATE
 *   loading     [./list.css]  .list[data-loading] .list__label etc — skeleton pulse
 *               Change animation timing or colours here.
 *
 *   empty       [./list.css]  .data__empty — adjust padding/colour there
 *               [./List.astro] change default message string
 *               Use the empty slot for rich custom empty states.
 *
 * VISUAL MODIFIERS
 *   striped     [./list.css]  .data--striped .list__item:nth-child(even)
 *               Shade: var(--bg--subtle). Adjust shade or selector.
 *
 *   bordered    [./list.css]  .data--bordered .list__item + .list__item
 *               Colour: var(--data--color--border). Adjust here.
 *
 * BEHAVIOR
 *   interactive [./list.css]  .list[data-interactive] .list__item
 *               Add hover bg, cursor, transition here.
 *
 *   selectable  [./list.css]  .list[data-selectable] — checkbox column
 *               [./List.astro] component owns selection state via dataset.selected
 *               (JSON array) and list:selectionchange event (list.client.ts).
 *
 *   scrollable  [./list.css]  overrides data.css with overflow-y: auto
 *               Set max-block-size on the list or a parent to constrain height.
 *
 * LAYOUT
 *   ordered     [./List.astro] switches tag to <ol> — no CSS to adjust.
 *               Override list-style-type on .list in consumer CSS for custom markers.
 *
 *   orientation [./list.css]  .list--horizontal → flex-wrap: wrap
 *               Adjust gap in .list--horizontal for spacing between chips/tags.
 */

import type { ListProps } from "./list.props";
import { useList }        from "./list.hook";
import Checkbox           from "~/forms/components/checkbox/Checkbox.astro";
import Link               from "~/triggers/components/link/Link.astro";
import Icon from "~/assets/components/icon/Icon.astro";import "~/data/data.css";
import "./list.css";

type Props = ListProps;

const { Tag, props, data, ordered, caption } = useList(Astro.props as ListProps);

const isLoading = Boolean(Astro.props.loading);
const isEmpty   = Array.isArray(data) && data.length === 0;
const emptyMsg  = typeof Astro.props.empty === "string"
  ? Astro.props.empty
  : "No items";

const skeletonCount = 4;
---
!!!

### Template

!!!astro
<Tag {...props}>

  {/* ── Caption ───────────────────────────────────────────── */}
  {caption && <p class="list__caption">{caption}</p>}

  {/* ── Items: slot wins over data-driven ─────────────────── */}
  {Astro.slots.has("items")
    ? <slot name="items" />
    : isLoading
      ? Array.from({ length: skeletonCount }).map(() => (
          <li class="list__item" aria-hidden="true">
            <span class="list__content">
              <span class="list__label">&nbsp;</span>
            </span>
          </li>
        ))
      : isEmpty
        ? (
          <li class="list__item">
            {Astro.slots.has("empty")
              ? <slot name="empty" />
              : <span class="data__empty">{emptyMsg}</span>
            }
          </li>
        )
        : data?.map(item => (
          <li class:list={[
            "list__item",
            item.disabled    && "list__item--disabled",
          ]}>
            {/* Checkbox for checklist items */}
            {item.checkState !== undefined && (
              <Checkbox
                data-selection-cb
                checkState={item.checkState}
                disabled={item.disabled}
                aria-label={item.label}
                variant="ghost"
              />
            )}

            {/* Leading icon (only when no checkbox) */}
            {item.icon && item.checkState === undefined && (
              <span class="list__icon" aria-hidden="true">
                <Icon name={item.icon} />
              </span>
            )}

            {/* Content — wrapped in <a> when href is set */}
            {item.href
              ? (
                <Link class="list__link" href={item.href}>
                  <span class="list__content">
                    <span class="list__label">{item.label}</span>
                    {item.description && (
                      <span class="list__description">{item.description}</span>
                    )}
                  </span>
                  {item.badge !== undefined && (
                    <span class="list__badge">{item.badge}</span>
                  )}
                </Link>
              )
              : (
                <>
                  <span class="list__content">
                    <span class="list__label">{item.label}</span>
                    {item.description && (
                      <span class="list__description">{item.description}</span>
                    )}
                  </span>
                  {item.badge !== undefined && (
                    <span class="list__badge">{item.badge}</span>
                  )}
                </>
              )
            }

            {/* Nested sub-list */}
            {item.children && item.children.length > 0 && (
              <Astro.self
                data={item.children}
                ordered={ordered}
                class="list__nested"
              />
            )}
          </li>
        ))
  }

</Tag>
!!!

### Scripts

!!!ts
import "./list.client.ts";
!!!

---

## item/ListItem.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/item/ListItem.astro`

### Frontmatter

!!!astro
---
import type { ListItemProps } from "./list-item.props";
import { useListItem } from "./list-item.hook";
import Checkbox from "~/forms/components/checkbox/Checkbox.astro";
import Link from "~/triggers/components/link/Link.astro";
import Icon from "~/assets/components/icon/Icon.astro";
type Props = ListItemProps;

const { Tag, props, checkState, href, description, badge, disabled, icon } = useListItem(Astro.props);
---
!!!

### Template

!!!astro
<Tag {...props}>
  {checkState !== undefined && (
    <Checkbox
      data-selection-cb
      checkState={checkState}
      disabled={disabled}
      variant="ghost"
    />
  )}

  {icon && checkState === undefined && (
    <span class="list__icon" aria-hidden="true">
      <Icon name={icon} />
    </span>
  )}

  {href ? (
    <Link class="list__link" href={href}>
      <span class="list__content">
        <span class="list__label"><slot /></span>
        {description && <span class="list__description">{description}</span>}
      </span>
      {badge !== undefined && <span class="list__badge">{badge}</span>}
    </Link>
  ) : (
    <>
      <span class="list__content">
        <span class="list__label"><slot /></span>
        {description && <span class="list__description">{description}</span>}
      </span>
      {badge !== undefined && <span class="list__badge">{badge}</span>}
    </>
  )}
</Tag>
!!!

---

## Menu.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/Menu.astro`

### Frontmatter

!!!astro
---
/**
 * Menu
 *
 * A flexible, accessible navigation list that supports both data-driven
 * rendering and manual slot composition. Useful for sidebars, dropdowns,
 * or simple vertical/horizontal lists of links.
 *
 * COMPOSITION OPTIONS
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Data-Driven: Pass an array of `items` to automatically generate the list.
 * 2. Slot-Driven: Omit `items` and manually compose `<MenuItem>` components inside.
 *
 * @example
 * <!-- Data-Driven -->
 * <Menu 
 *   variant="soft"
 *   items={[
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'about', label: 'About', href: '/about' }
 *   ]} 
 * />
 *
 * @example
 * <!-- Slot-Driven -->
 * <Menu variant="ghost">
 *   <MenuItem href="/">Home</MenuItem>
 *   <MenuItem href="/about" active>About</MenuItem>
 * </Menu>
 *
 * @see menu.props.ts — full prop type reference
 * @see menu.hook.ts  — logic for token resolution and class composition
 */
import { useMenu } from "./menu.hook";
import type { MenuProps } from "./menu.props";
import MenuItem from "./item/MenuItem.astro";
import "../../nav.css";
import "./menu.css";

type Props = MenuProps;

const { menuProps, items, activeId } = useMenu(Astro.props);
---
!!!

### Template

!!!astro
<nav {...menuProps} aria-label="Menu">
  <ul class="menu__list">
    {items ? (
      items.map((item) => (
        <>
          <MenuItem 
            id={item.id}
            href={item.href}
            {...(item.icon !== undefined ? { icon: item.icon } : {})}
            disabled={item.disabled}
            active={activeId === item.id || activeId === item.href}
          >
            {item.label}
          </MenuItem>
          {item.children && item.children.length > 0 && (
            <li>
              <ul class="menu__list">
                {item.children.map((child) => (
                  <MenuItem 
                    id={child.id}
                    href={child.href}
                    {...(child.icon !== undefined ? { icon: child.icon } : {})}
                    disabled={child.disabled}
                    active={activeId === child.id || activeId === child.href}
                  >
                    {child.label}
                  </MenuItem>
                ))}
              </ul>
            </li>
          )}
        </>
      ))
    ) : (
      <slot />
    )}
  </ul>
</nav>
!!!

---

## item/MenuItem.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/item/MenuItem.astro`

### Frontmatter

!!!astro
---
/**
 * MenuItem
 *
 * An individual interactive item within a `<Menu>`. Automatically renders as
 * an `<a>` tag if an `href` is provided, otherwise falls back to a `<button>`.
 *
 * FEATURES
 * ─────────────────────────────────────────────────────────────────────────
 * - Icon Support: Pass an `icon` name from the registry (e.g. `icon="home"`).
 * - Polymorphic: Seamlessly switches between anchor link and button.
 * - Accessible: Manages `aria-current` for links and `aria-selected` for buttons.
 *
 * @example
 * <MenuItem href="/dashboard" icon="home" active>
 *   Dashboard
 * </MenuItem>
 *
 * @see Menu.astro — the parent container
 */
import { useMenuItem }        from "./m-item.hook";
import type { MenuItemProps } from "./m-item.props";
import Icon from "~/assets/components/icon/Icon.astro";import "./m-item.css";

export type Props = MenuItemProps;

const { Tag, menuItemProps } = useMenuItem(Astro.props as MenuItemProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<li class="menu__item-wrapper">
  <Tag {...menuItemProps}>
    {icon && (
      <span class="menu__icon" aria-hidden="true">
        <Icon name={icon} />
      </span>
    )}
    <span class="menu__item-label"><slot /></span>
  </Tag>
</li>
!!!

---

## Metric.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/metric/Metric.astro`

### Frontmatter

!!!astro
---
/**
 * Metric
 *
 * Renders a complex metric card with value, label, trend, and description.
 *
 * @example
 * !!!astro
 * <Metric value="84%" label="Engagement" description="Up from last week" trend="12%" trendDirection="up" variant="elevated" />
 * !!!
 */
import type { MetricProps } from "./metric.props";
import { useMetric } from "./metric.hook";
import Skeleton from "~/shared/components/skeleton/Skeleton.astro";
import Icon from "~/assets/components/icon/Icon.astro";import "~/shared/components/skeleton/skeleton.css";
import "../../data.css";
import "./metric.css";

const { Tag, props, value, label, description, trend, trendDirection } = useMetric(Astro.props as MetricProps);
const { icon } = Astro.props;
const isLoading = "data-loading" in props;
---
!!!

### Template

!!!astro
<Tag {...props}>
  {isLoading ? (
    <>
      <div class="metric__header">
        <Skeleton variant="text" lines={1} style="width: 40%" />
      </div>
      <div class="metric__value-group" style="margin-top: 0.5rem">
        <Skeleton variant="text" lines={1} style="height:2em; width:3em" />
      </div>
      <div class="metric__description" style="margin-top: 0.5rem">
        <Skeleton variant="text" lines={2} />
      </div>
    </>
  ) : (
    <>
      <div class="metric__header">
        {Astro.slots.has("label") ? (
          <div class="metric__label"><slot name="label" /></div>
        ) : label ? (
          <div class="metric__label">{label}</div>
        ) : null}
        
        {(icon || Astro.slots.has("icon")) && (
          <div class="metric__icon">
            {icon ? <Icon name={icon} /> : <slot name="icon" />}
          </div>
        )}
      </div>

      <div class="metric__value-group">
        {Astro.slots.has("value") ? (
          <div class="metric__value"><slot name="value" /></div>
        ) : value !== undefined ? (
          <div class="metric__value">{value}</div>
        ) : null}

        {trend && (
          <div class={`metric__trend metric__trend--${trendDirection || "neutral"}`}>
            {trendDirection === "up" && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>}
            {trendDirection === "down" && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2V10M6 10L2 6M6 10L10 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>}
            {trendDirection === "neutral" && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>}
            <span>{trend}</span>
          </div>
        )}
      </div>

      {Astro.slots.has("description") ? (
        <div class="metric__description"><slot name="description" /></div>
      ) : description ? (
        <div class="metric__description">{description}</div>
      ) : null}
    </>
  )}
</Tag>
!!!

---

## Modal.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/modal/Modal.astro`

### Frontmatter

!!!astro
---
import type { ModalProps } from "./modal.props";
import { useModal } from "./modal.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import Prose from "~/typography/components/prose/Prose.astro";
import H from "~/typography/components/heading/H.astro";
import "../../overlays.css";
import "./modal.css";

const { dialogProps, title, titleId } = useModal(Astro.props as ModalProps);
---
!!!

### Template

!!!astro
<dialog {...dialogProps}>
  <div class="modal__header">
    {title && <H level={3} id={titleId} class="modal__title">{title}</H>}
    <button
      class="modal__close-btn"
      type="button"
      aria-label="Close"
      data-modal-close={dialogProps.id}
    >
      <Icon name="x" size="sm" />
    </button>
  </div>

  <div class="modal__body">
    <Prose>
      <slot />
    </Prose>
  </div>

  {Astro.slots.has("actions") && (
    <div class="modal__footer">
      <slot name="actions" />
    </div>
  )}
</dialog>
!!!

### Scripts

!!!ts
import { initModals } from "./modal.client";
  initModals();
  document.addEventListener("astro:after-swap", initModals);
!!!

---

## Multiselect.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/multiselect/Multiselect.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Navbar.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/Navbar.astro`

### Frontmatter

!!!astro
---
/**
 * Navbar
 *
 * Top-level navigation bar. Handles responsive hamburger menu logic via Web Component.
 */
import { useNavbar } from "./navbar.hook";
import type { NavbarProps } from "./navbar.props";
import { icons } from "~/shared/icons";
import "../../nav.css";
import "./navbar.css";

export type Props = NavbarProps;

const { navbarProps, containerStyle } = useNavbar(Astro.props as NavbarProps);
const MenuIcon = icons.menu;
---
!!!

### Template

!!!astro
<dezign8-navbar {...navbarProps}>
  <div class="navbar__container" style={containerStyle}>
    <slot name="brand" />
    
    <slot />
    
    <button class="navbar__toggle" aria-label="Toggle navigation" aria-expanded="false">
      <MenuIcon width={undefined} height={undefined} />
    </button>
  </div>
</dezign8-navbar>
!!!

### Scripts

!!!ts
class Dezign8Navbar extends HTMLElement {
    connectedCallback() {
      const toggleBtn = this.querySelector('.navbar__toggle');
      if (!toggleBtn) return;
      
      let isOpen = false;
      
      toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        this.setAttribute('data-menu-open', isOpen.toString());
        toggleBtn.setAttribute('aria-expanded', isOpen.toString());
      });
    }
  }

  if (!customElements.get('dezign8-navbar')) {
    customElements.define('dezign8-navbar', Dezign8Navbar);
  }
!!!

---

## brand/NavbarBrand.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/brand/NavbarBrand.astro`

### Frontmatter

!!!astro
---
/**
 * NavbarBrand
 *
 * Container for the site logo, title, or primary branding element.
 */
import { useNavbarBrand } from "./brand.hook";
import type { NavbarBrandProps } from "./brand.props";

export type Props = NavbarBrandProps;

const { brandProps } = useNavbarBrand(Astro.props as NavbarBrandProps);
---
!!!

### Template

!!!astro
<div {...brandProps}>
  <slot />
</div>
!!!

---

## content/NavbarContent.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/content/NavbarContent.astro`

### Frontmatter

!!!astro
---
/**
 * NavbarContent
 *
 * Container for links, search bars, and actions inside a `<Navbar>`.
 * By default, it hides its content on mobile so it can be revealed by the hamburger menu.
 */
import { useNavbarContent } from "./content.hook";
import type { NavbarContentProps } from "./content.props";

export type Props = NavbarContentProps;

const { contentProps } = useNavbarContent(Astro.props as NavbarContentProps);
---
!!!

### Template

!!!astro
<div {...contentProps}>
  <slot />
</div>
!!!

---

## NumberInput.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/number-input/NumberInput.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Pagination.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/pagination/Pagination.astro`

### Frontmatter

!!!astro
---
/**
 * Pagination
 *
 * A smart, data-driven pagination control that automatically calculates page
 * ranges, inserts ellipses, and manages the disabled states of previous/next
 * controls based on the current page and total pages.
 *
 * ROUTING / URL GENERATION
 * ─────────────────────────────────────────────────────────────────────────
 * The component generates standard `<a>` tags for SEO and accessibility.
 * You can control how URLs are generated in two ways:
 * 1. `baseUrl`: Appends the page number (e.g. `baseUrl="/blog"` -> `/blog/2`)
 * 2. `getPageUrl`: A custom function `(page) => string` for full control.
 *
 * @example
 * <Pagination 
 *   currentPage={3} 
 *   totalPages={10} 
 *   baseUrl="/posts/page" 
 * />
 *
 * @see pagination.props.ts — full prop type reference
 * @see pagination.hook.ts  — logic for page range and ellipsis calculation
 */
import { usePagination } from "./pagination.hook";
import type { PaginationProps } from "./pagination.props";
import Link from "~/triggers/components/link/Link.astro";
import { icons } from "~/shared/icons";
import "../../nav.css";
import "./pagination.css";


const { 
  paginationProps, 
  pages, 
  currentPage, 
  totalPages, 
  showControls, 
  generateUrl 
} = usePagination(Astro.props as PaginationProps);

const ChevronLeft = icons['chevron-left'];
const ChevronRight = icons['chevron-right'];

const prevDisabled = currentPage <= 1;
const nextDisabled = currentPage >= totalPages;
---
!!!

### Template

!!!astro
<nav {...paginationProps} aria-label="Pagination">
  <ul class="nav__list">
    {showControls && (
      <li>
        <Link
          class="nav__item pagination__control"
          aria-label="Previous page"
          {...(!prevDisabled ? { href: generateUrl(currentPage - 1) } : {})}
          {...(prevDisabled  ? { "aria-disabled": "true" }           : {})}
          {...(prevDisabled  ? { tabindex: -1 }                      : {})}
        >
          <ChevronLeft style="width: 1.25em; height: 1.25em;" aria-hidden="true" />
        </Link>
      </li>
    )}

    {pages.map((page) => {
      if (page === '...') {
        return (
          <li>
            <span class="pagination__ellipsis" aria-hidden="true">&hellip;</span>
          </li>
        );
      }

      const pageNum = page as number;
      const isCurrent = pageNum === currentPage;

      return (
        <li>
          <Link
            class="nav__item"
            aria-label={`Page ${pageNum}`}
            {...(!isCurrent ? { href: generateUrl(pageNum) } : {})}
            {...(isCurrent  ? { "aria-current": "page" }    : {})}
          >
            {pageNum}
          </Link>
        </li>
      );
    })}

    {showControls && (
      <li>
        <Link
          class="nav__item pagination__control"
          aria-label="Next page"
          {...(!nextDisabled ? { href: generateUrl(currentPage + 1) } : {})}
          {...(nextDisabled  ? { "aria-disabled": "true" }            : {})}
          {...(nextDisabled  ? { tabindex: -1 }                       : {})}
        >
          <ChevronRight style="width: 1.25em; height: 1.25em;" aria-hidden="true" />
        </Link>
      </li>
    )}
  </ul>
</nav>
!!!

---

## Panel.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/panel/Panel.astro`

### Frontmatter

!!!astro
---
/**
 * Panel
 *
 * Visual container foundation for expandable or collapsible content areas.
 * Inherits surface properties.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="surface panel [modifiers]" style="…CSS vars…">
 *   <slot />
 * </div>
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Content
 *
 * @example
 * !!!astro
 * <Panel padding="md">
 *   <Text>Panel content.</Text>
 * </Panel>
 * !!!
 *
 * @see panel.hook.ts   — usePanel: resolves props to { Tag, props }
 * @see panel.props.ts  — PanelProps: full prop reference
 * @see surface.css     — visual chrome
 */

import type { PanelProps } from "./panel.props";
import { usePanel }        from "./panel.hook";
import "../../surface.css";
import "./panel.css";

const { Tag, props } = usePanel(Astro.props as PanelProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## Paper.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/paper/Paper.astro`

### Frontmatter

!!!astro
---
/**
 * Paper
 *
 * Generic content surface. A box that can be styled as plain, outlined,
 * soft, elevated, or glass — and optionally stacks its children with gap.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="surface paper [modifiers]" style="…CSS vars…">
 *   <slot />
 * </div>
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Content
 *
 * @example Plain paper
 * !!!astro
 * <Paper>Content here</Paper>
 * !!!
 *
 * @example Outlined stacking container
 * !!!astro
 * <Paper variant="outlined" stack gap="lg">
 *   <Heading level={3}>Title</Heading>
 *   <Text>Body copy here.</Text>
 * </Paper>
 * !!!
 *
 * @example Elevated glass panel
 * !!!astro
 * <Paper variant="glass" radius="xl" blur="20px" />
 * !!!
 *
 * @see paper.hook.ts   — usePaper: resolves props to { Tag, props }
 * @see paper.props.ts  — PaperProps: full prop reference
 * @see paper.tokens.ts — PAPER_TOKENS, PAPER_DEFAULTS
 * @see paper.css       — layout modifiers (stack, full-width)
 * @see surface.css     — visual chrome (variants, color channels)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADJUSTING PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * VARIANT
 *   variant     [../surface.css]  .surface--{variant} — background, border, shadow
 *               @example variant="elevated" → box-shadow: var(--surface--shadow)
 *
 * SPACING
 *   padding     [../surface.css]  --surface--padding → padding on .surface
 *               @example padding="lg" → spacious inner whitespace
 *
 *   gap         [./paper.css]     --paper--gap → flex gap when stack=true
 *               @example gap="sm" → tight stacked children
 *
 * SHAPE
 *   radius      [../surface.css]  --surface--radius → border-radius on .surface
 *
 * COLOR
 *   color       [../surface.css]  --surface--color--* channels
 *               @example color="primary" → tinted border + subtle bg
 *
 * GLASS
 *   blur        [../surface.css]  --surface--blur → backdrop-filter blur
 *               Only meaningful with variant="glass"
 *
 * LAYOUT
 *   stack       [./paper.css]     .paper--stack → display flex + column
 *   fullWidth   [./paper.css]     .paper--full-width → width 100%
 */

import type { PaperProps } from "./paper.props";
import { usePaper }        from "./paper.hook";
import "../../surface.css";
import "./paper.css";

const { Tag, props } = usePaper(Astro.props as PaperProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## Popover.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/popover/Popover.astro`

### Frontmatter

!!!astro
---
import type { PopoverProps } from "./popover.props";
import { usePopover } from "./popover.hook";
import "./popover.css";

const { id, hostProps, panelProps } = usePopover(Astro.props as PopoverProps);
---
!!!

### Template

!!!astro
<span {...hostProps}>
  <span data-popover-trigger>
    <slot name="trigger" />
  </span>
  <div id={id} popover="auto" {...panelProps}>
    <slot />
  </div>
</span>
!!!

### Scripts

!!!ts
import { initPopovers } from "./popover.client";
  initPopovers();
  document.addEventListener("astro:after-swap", initPopovers);
!!!

---

## Portal.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/portal/Portal.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Progress.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/progress/Progress.astro`

### Frontmatter

!!!astro
---
/**
 * Progress
 *
 * Displays the completion state of a task across four visual types:
 * bar, ring, number, and percent.
 *
 * STRUCTURE varies by type:
 * ─────────────────────────────────────────────────────────────────────────
 *   bar     <div class="feedback progress progress--bar" role="progressbar">
 *             [slot (label)]
 *             <div class="progress__track">
 *               <div class="progress__fill" />
 *             </div>
 *             [span.progress__value when showValue]
 *           </div>
 *
 *   ring    <div class="feedback progress progress--ring" role="progressbar">
 *             [slot (label)]
 *             <svg class="progress__ring" viewBox="0 0 36 36">
 *               <circle class="progress__track" />
 *               <circle class="progress__fill" />
 *             </svg>
 *             [span.progress__value when showValue]
 *           </div>
 *
 *   number  <div class="feedback progress progress--number" role="progressbar">
 *             [slot (label)]
 *             <span class="progress__number">
 *               {value}<span class="progress__denom">/{max}</span>
 *             </span>
 *           </div>
 *
 *   percent <div class="feedback progress progress--percent" role="progressbar">
 *             [slot (label)]
 *             <span class="progress__number">{fillPercent}%</span>
 *           </div>
 *
 * @example
 * <!-- Default bar -->
 * <Progress value={60} />
 *
 * @example
 * <!-- Ring with shown value -->
 * <Progress value={3} max={10} type="ring" showValue />
 *
 * @example
 * <!-- Large number display -->
 * <Progress value={6} max={10} type="number" size="lg" />
 *
 * @example
 * <!-- Percent display -->
 * <Progress value={84} type="percent" color="success" />
 *
 * @example
 * <!-- Indeterminate (loading) -->
 * <Progress indeterminate />
 *
 * @example
 * <!-- With label slot -->
 * <Progress value={45} color="success">
 *   Upload progress
 * </Progress>
 *
 * @see progress.hook.ts   — resolves props + computes fill, ring geometry
 * @see progress.props.ts  — full prop type reference
 * @see progress.css       — size maps, type-specific styles, indeterminate animation
 * @see feedback.css       — shared variant and color rules
 */

import type { ProgressProps } from "./progress.props";
import { useProgress }        from "./progress.hook";
import "../../feedback.css";
import "./progress.css";

type Props = ProgressProps;

const {
  Tag,
  props,
  type,
  fillPercent,
  displayPercent,
  showValue,
  indeterminate,
  ringAttrs,
} = useProgress(Astro.props as ProgressProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  {/* ── Optional label slot ────────────────────────────────────── */}
  {Astro.slots.has("default") && (
    <div class="progress__label">
      <slot />
    </div>
  )}

  {/* ── Bar type ──────────────────────────────────────────────── */}
  {type === "bar" && (
    <div class="progress__track">
      <div class="progress__fill" />
    </div>
  )}

  {/* ── Ring type ─────────────────────────────────────────────── */}
  {type === "ring" && (
    <svg
      class="progress__ring"
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      <circle
        class="progress__track"
        cx="18" cy="18" r="15.9155"
        stroke-width="2.5"
      />
      <circle
        class="progress__fill"
        cx="18" cy="18" r="15.9155"
        stroke-width="2.5"
        stroke-dasharray={ringAttrs.circumference}
        stroke-dashoffset={ringAttrs.offset}
        stroke-linecap="round"
        transform="rotate(-90 18 18)"
      />
    </svg>
  )}

  {/* ── Number type  (e.g. "6/10") ────────────────────────────── */}
  {type === "number" && (
    <span class="progress__number" aria-hidden="true">
      {indeterminate
        ? "—"
        : <>{Astro.props.value ?? 0}<span class="progress__denom">/{Astro.props.max ?? 100}</span></>
      }
    </span>
  )}

  {/* ── Percent type  (e.g. "84%") ────────────────────────────── */}
  {type === "percent" && (
    <span class="progress__number" aria-hidden="true">
      {indeterminate ? "—" : `${fillPercent}%`}
    </span>
  )}

  {/* ── Optional computed value label (bar + ring only) ─────────── */}
  {showValue && (type === "bar" || type === "ring") && (
    <span class="progress__value">
      {displayPercent}
    </span>
  )}
</Tag>
!!!

---

## Prose.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/prose/Prose.astro`

### Frontmatter

!!!astro
---
/**
 * Prose
 *
 * A typography container that applies standard, beautiful styling to raw
 * HTML and Markdown content (e.g. from MDX files). It uses descendant selectors
 * to format headings, paragraphs, lists, blockquotes, and code blocks
 * according to the design system tokens.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <article class="typography prose [modifiers]" style="…CSS vars…">
 *   <slot /> <!-- Raw HTML/Markdown -->
 * </article>
 *
 * @example
 * !!!astro
 * <Prose size="base">
 *   <h1>Welcome</h1>
 *   <p>This is standard markdown.</p>
 * </Prose>
 * !!!
 *
 * @see prose.hook.ts   — useProse: resolves props to { Tag, props }
 * @see prose.props.ts  — ProseProps: full prop reference
 * @see prose.css       — descendant selectors for raw html tags
 */

import type { ProseProps } from "./prose.props";
import { useProse }        from "./prose.hook";
import "../../typography.css";
import "../heading/heading.css";
import "../code/code.css";
import "../quote/quote.css";
import "~/triggers/components/link/link.css";
import "./prose.css";

const { Tag, props } = useProse(Astro.props as ProseProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## Quote.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/quote/Quote.astro`

### Frontmatter

!!!astro
---
import type { QuoteProps } from "./quote.props";
import { useQuote } from "./quote.hook";
import "../../typography.css";
import "./quote.css";

const { Tag, props } = useQuote(Astro.props as QuoteProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## RadioGroup.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio-group/RadioGroup.astro`

### Frontmatter

!!!astro
---
/**
 * RadioGroup
 *
 * Semantic wrapper for a group of Radio buttons. Renders a `<fieldset>` +
 * `<legend>` for accessibility, and a `dezign8-radio-group` Web Component
 * that propagates the `name` prop to all child radio inputs.
 *
 * NAME PROPAGATION
 * ─────────────────────────────────────────────────────────────────────────
 * Pass `name` once to RadioGroup instead of on every Radio. The Web Component
 * sets the `name` attribute on all descendent `<input type="radio">` elements
 * after the page loads. Without JS, each Radio still needs its own `name`.
 *
 * @example
 * <!-- Vertical group (default) -->
 * <RadioGroup name="plan" legend="Payment Plan">
 *   <Radio value="free">Free</Radio>
 *   <Radio value="pro">Pro</Radio>
 *   <Radio value="enterprise">Enterprise</Radio>
 * </RadioGroup>
 *
 * @example
 * <!-- Horizontal option cards -->
 * <RadioGroup name="size" legend="Size" layout="horizontal">
 *   <Radio value="sm" variant="outlined">S</Radio>
 *   <Radio value="md" variant="outlined" checked>M</Radio>
 *   <Radio value="lg" variant="outlined">L</Radio>
 * </RadioGroup>
 *
 * @see radio-group.hook.ts  — resolves props to { groupProps, legend }
 * @see radio-group.props.ts — full prop type reference
 * @see radio-group.css      — fieldset reset and layout styles
 */

import type { RadioGroupProps } from "./radio-group.props";
import { useRadioGroup }        from "./radio-group.hook";
import "./radio-group.css";

const { groupProps, legend } = useRadioGroup(Astro.props as RadioGroupProps);
---
!!!

### Template

!!!astro
<dezign8-radio-group {...groupProps}>
  <fieldset class="radio-group__fieldset">
    {legend && <legend class="radio-group__legend">{legend}</legend>}
    <div class="radio-group__options">
      <slot />
    </div>
  </fieldset>
</dezign8-radio-group>
!!!

### Scripts

!!!ts
class Dezign8RadioGroup extends HTMLElement {
    connectedCallback() {
      const name = this.dataset.name;
      if (!name) return;
      this.querySelectorAll('input[type="radio"]')
        .forEach(input => input.setAttribute('name', name));
    }
  }

  if (!customElements.get('dezign8-radio-group')) {
    customElements.define('dezign8-radio-group', Dezign8RadioGroup);
  }
!!!

---

## Radio.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio/Radio.astro`

### Frontmatter

!!!astro
---
/**
 * Radio
 *
 * A single radio button with an optional label slot. Radio buttons in the
 * same group share the same `name` attribute — the browser enforces mutual
 * exclusivity automatically.
 *
 * STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────
 *   <label class="form radio …">
 *     <input class="radio__control" type="radio" />  ← hidden native input
 *     <span  class="radio__indicator" aria-hidden />  ← custom circle
 *     <span  class="radio__label"><slot /></span>     ← label content
 *   </label>
 *
 * DOM order is always: hidden input → indicator → label slot.
 * `labelPosition` changes VISUAL order via CSS flex-direction only.
 * This keeps the CSS ~ sibling combinator functional for state rules.
 *
 * GROUPING
 * ─────────────────────────────────────────────────────────────────────────
 * Pass the same `name` to all Radio instances in a group. Each should have
 * a distinct `value`. Pass `checked` to the initially-selected option.
 *
 * VARIANTS
 * ─────────────────────────────────────────────────────────────────────────
 * Default variant is `"ghost"` — traditional radio appearance with no
 * wrapper border. Pass `variant="outlined"` or `variant="soft"` for a
 * bordered "option card" style.
 *
 * @slots
 *   default — Label content displayed next to the indicator circle.
 *             Avoid interactive elements (links, buttons) inside the label —
 *             they will also trigger the radio on click, which is native
 *             <label>-wrapping behaviour.
 *
 * @example
 * <!-- Radio group — same name, different values -->
 * <Radio name="plan" value="free" checked>Free</Radio>
 * <Radio name="plan" value="pro">Pro</Radio>
 * <Radio name="plan" value="enterprise">Enterprise</Radio>
 *
 * @example
 * <!-- Option card style -->
 * <Radio name="plan" value="pro" variant="outlined" color="primary">
 *   Pro — $12/month
 * </Radio>
 *
 * @example
 * <!-- Label to the left -->
 * <Radio name="side" value="left" labelPosition="start">Left</Radio>
 *
 * @see radio.hook.ts  — resolves props to { Tag, props, inputAttrs }
 * @see radio.props.ts — full prop type reference
 * @see radio.css      — circular indicator styles, layout modifiers
 * @see forms.css      — shared variant and state styles
 */

import type { RadioProps } from "./radio.props";
import { useRadio } from "./radio.hook";
import "~/forms/forms.css";
import "./radio.css";

const { Tag, props, inputAttrs } = useRadio(Astro.props as RadioProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  <input class="radio__control" {...inputAttrs} />
  <span class="radio__indicator" aria-hidden="true"></span>
  {
    Astro.slots.has("default") && (
      <span class="radio__label">
        <slot />
      </span>
    )
  }
</Tag>
!!!

---

## RangeSlider.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/range-slider/RangeSlider.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Screen.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/screen/Screen.astro`

### Frontmatter

!!!astro
---
import type { ScreenProps } from "./screen.props";
import { useScreen } from "./screen.hook";

import "./screen.css";

const { Tag, props } = useScreen(Astro.props as ScreenProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  <slot />
</Tag>
!!!

---

## Search.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/search/Search.astro`

### Frontmatter

!!!astro
---
/**
 * Search
 *
 * A search input with built-in clear button, loading state, and
 * Escape-to-clear keyboard behaviour. Defaults to full-width.
 *
 * BUILT-IN BEHAVIOURS (client-side script)
 * ─────────────────────────────────────────────────────────────────────────
 * The component includes a deduped script that:
 * - Shows the clear button when the input has a value
 * - Hides the clear button when the input is empty
 * - Clears the input and dispatches an `input` event when clear is clicked
 * - Clears the input on Escape (if the input has a value)
 *
 * Dispatching a synthetic `input` event on clear means any `input` event
 * listener on the search field receives the cleared state correctly.
 *
 * LOADING STATE
 * ─────────────────────────────────────────────────────────────────────────
 * `loading={true}` renders `data-loading` on the wrapper. CSS swaps the
 * clear button for a spinning indicator. The input becomes non-interactive
 * while loading.
 *
 * @slots
 *   start — Leading content (icon, flag, etc.). Typically a search icon.
 *           pointer-events suppressed; clicks pass through to the input.
 *
 *   end   — Trailing content after the clear button. Use for keyboard
 *           shortcut badges (e.g. ⌘K), scope selectors, or search filters.
 *
 * @example
 * <!-- Basic -->
 * <Search name="q" placeholder="Search…" />
 *
 * @example
 * <!-- With icon -->
 * <Search name="q" placeholder="Search products…">
 *   <Icon slot="start" name="search" size="sm" />
 * </Search>
 *
 * @example
 * <!-- Async loading -->
 * <Search name="q" value={query} loading={isLoading} placeholder="Search…" />
 *
 * @example
 * <!-- Inline, narrow -->
 * <Search name="filter" fullWidth={false} size="sm" placeholder="Filter…" />
 *
 * @see search.hook.ts  — resolves props to { Tag, props, inputAttrs }
 * @see search.props.ts — full prop type reference
 * @see search.css      — clear button, spinner, slot styles
 * @see forms.css       — shared variant and state styles
 */

import type { SearchProps } from "./search.props";
import { useSearch }        from "./search.hook";
import "~f/forms.css";
import "./search.css";

const { Tag, props, inputAttrs } = useSearch(Astro.props as SearchProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  {Astro.slots.has("start") && (
    <div class="search__start">
      <slot name="start" />
    </div>
  )}

  <input class="search__control" {...inputAttrs} />

  <!--
    Clear button — always in DOM, hidden until input has value.
    The script below manages the hidden attribute.
    Hidden while loading (CSS swaps it for the spinner).
  -->
  <button
    class="search__clear"
    type="button"
    aria-label="Clear search"
    hidden
  >
    ×
  </button>

  <!-- Loading spinner — shown via CSS when data-loading is on wrapper -->
  <div class="search__spinner" aria-hidden="true"></div>

  {Astro.slots.has("end") && (
    <div class="search__end">
      <slot name="end" />
    </div>
  )}
</Tag>

<!--
  Search controller script.
  Runs once per page (Astro deduplicates). Queries all [data-search]
  wrappers and wires up clear button + Escape behaviour for each.
-->
!!!

### Scripts

!!!ts
function initSearch(wrapper: HTMLElement) {
    const input = wrapper.querySelector<HTMLInputElement>(".search__control");
    const clear = wrapper.querySelector<HTMLButtonElement>(".search__clear");
    if (!input || !clear) return;

    const sync = () => {
      // Show clear only when the input has a value and is not loading
      clear.hidden = !input.value || wrapper.hasAttribute("data-loading");
    };

    // Show/hide clear button as the user types
    input.addEventListener("input", sync);

    // Clear button: empty the field and re-focus
    clear.addEventListener("click", () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    });

    // Escape: clear the field if it has a value
    input.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape" && input.value) {
        e.preventDefault();
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });

    // Sync initial state (e.g. when value prop was set on SSR)
    sync();
  }

  document
    .querySelectorAll<HTMLElement>("[data-search]")
    .forEach(initSearch);
!!!

---

## Section.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/section/Section.astro`

### Frontmatter

!!!astro
---
/**
 * Section
 *
 * Page-level content division. Inherits surface properties.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <section class="surface section [modifiers]" style="…CSS vars…">
 *   <slot />
 * </section>
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Content
 *
 * @example
 * !!!astro
 * <Section padding="lg">
 *   <Heading level={2}>Introduction</Heading>
 * </Section>
 * !!!
 *
 * @see section.hook.ts   — useSection: resolves props to { Tag, props }
 * @see section.props.ts  — SectionProps: full prop reference
 * @see surface.css       — visual chrome
 */

import type { SectionProps } from "./section.props";
import { useSection }        from "./section.hook";
import "../../surface.css";
import "./section.css";

const { Tag, props } = useSection(Astro.props as SectionProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

## SegmentedControl.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/segmented-control/SegmentedControl.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Select.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/select/Select.astro`

### Frontmatter

!!!astro
---
/**
 * Select
 *
 * Native select control supporting both single and multi-value selection,
 * discriminated by the `multiple` prop.
 *
 * The visual wrapper is a div that owns the border, background, and radius.
 * The inner <select> is reset to transparent with appearance: none, and a
 * custom arrow takes the place of the browser-default dropdown indicator.
 *
 * NOTE: The <option> list is styled by the OS/browser regardless of CSS.
 *       For a fully customised dropdown with styled options, a future
 *       Combobox component using [role="listbox"] would be required.
 *
 * @slots
 *   start — Leading content inside the field boundary (e.g. an icon or flag).
 *           pointer-events are suppressed so clicks pass through to the
 *           <select> element beneath.
 *
 *   arrow — Replace the default ▾ arrow indicator with custom content.
 *           Useful for an Icon component or a custom SVG chevron.
 *           Receives pointer-events: none from select.css.
 *
 * @example
 * <!-- Single select with placeholder -->
 * <Select
 *   name="country"
 *   placeholder="Select a country…"
 *   options={[
 *     { value: "us", label: "United States" },
 *     { value: "uk", label: "United Kingdom" },
 *     { value: "ca", label: "Canada" },
 *   ]}
 * />
 *
 * @example
 * <!-- Controlled single select -->
 * <Select
 *   name="role"
 *   value="editor"
 *   options={roles}
 *   size="lg"
 *   variant="soft"
 *   color="primary"
 * />
 *
 * @example
 * <!-- Multi-select — note multiple={true} and value as array -->
 * <Select
 *   name="tags"
 *   multiple
 *   value={["ts", "astro"]}
 *   options={tags}
 *   fullWidth
 * />
 *
 * @example
 * <!-- With custom arrow icon -->
 * <Select name="sort" options={sortOptions}>
 *   <Icon slot="arrow" name="chevron-down" size="sm" />
 * </Select>
 *
 * @example
 * <!-- Inside a Field for accessibility wiring -->
 * <Field id="role" invalid={!isValid}>
 *   <Label slot="label" for="role" required>Role</Label>
 *   <Select
 *     id="role"
 *     name="role"
 *     options={roles}
 *     invalid={!isValid}
 *     aria-describedby="role-error"
 *     fullWidth
 *   />
 *   <span slot="error" id="role-error">Please select a role.</span>
 * </Field>
 *
 * @see select.hook.ts  — resolves props to { Tag, props, selectAttrs, resolvedOptions, placeholder }
 * @see select.props.ts — full prop type reference including SelectOption
 * @see select.css      — native control reset and custom arrow styles
 * @see forms.css       — shared variant and state styles
 */

import type { SelectProps } from "./select.props";
import { useSelect } from "./select.hook";
import Icon from "~/assets/components/icon/Icon.astro";import "~/forms/forms.css";
import "./select.css";

const { Tag, props, selectAttrs, resolvedOptions, placeholder } = useSelect(
  Astro.props as SelectProps,
);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...props}>
  {
    (icon || Astro.slots.has("start")) && (
      <div class="select__start">
        {icon ? <Icon name={icon} /> : <slot name="start" />}
      </div>
    )
  }

  <select class="select__control" {...selectAttrs}>
    {
      placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )
    }
    {
      resolvedOptions.map((opt) => (
        <option
          value={opt.value}
          selected={opt.selected || undefined}
          disabled={opt.disabled || undefined}
        >
          {opt.label}
        </option>
      ))
    }
  </select>

  <div class="select__arrow" aria-hidden="true">
    <slot name="arrow">▾</slot>
  </div>
</Tag>
!!!

---

## Separator.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/separator/Separator.astro`

### Frontmatter

!!!astro
---
/**
 * Separator
 *
 * A component to visually and semantically separate content. It can be
 * horizontal or vertical, and can optionally contain a label.
 *
 * @example A simple horizontal line
 * !!!astro
 * <Separator />
 * !!!
 *
 * @example A vertical line between elements
 * !!!astro
 * <Flex>
 *   <p>Left</p>
 *   <Separator orientation="vertical" />
 *   <p>Right</p>
 * </Flex>
 * !!!
 *
 * @example With a centered label
 * !!!astro
 * <Separator>or</Separator>
 * !!!
 *
 * @see separator.hook.ts
 * @see separator.props.ts
 */
import { useSeparator } from "./separator.hook";
import type { SeparatorProps } from "./separator.props";
import "./separator.css";

interface Props extends SeparatorProps {}

const hasContent = Astro.slots.has("default");
const { Tag, props: tagProps } = useSeparator({ ...Astro.props, hasContent });
---
!!!

### Template

!!!astro
<Tag {...tagProps}>
  {hasContent && <span class="separator__label"><slot /></span>}
</Tag>
!!!

---

## Sheet.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/sheet/Sheet.astro`

### Frontmatter

!!!astro
---
import type { SheetProps } from "./sheet.props";
import { useSheet } from "./sheet.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "../../overlays.css";
import "./sheet.css";

const { dialogProps, title, titleId } = useSheet(Astro.props as SheetProps);
---
!!!

### Template

!!!astro
<dialog {...dialogProps}>
  <div class="sheet__header">
    {title && <h3 id={titleId} class="sheet__title">{title}</h3>}
    <button
      class="sheet__close-btn"
      type="button"
      aria-label="Close"
      data-sheet-close={dialogProps.id}
    >
      <Icon name="x" size="sm" />
    </button>
  </div>

  <div class="sheet__body">
    <slot />
  </div>

  {Astro.slots.has("actions") && (
    <div class="sheet__footer">
      <slot name="actions" />
    </div>
  )}
</dialog>
!!!

### Scripts

!!!ts
import { initSheets } from "./sheet.client";
  initSheets();
  document.addEventListener("astro:after-swap", initSheets);
!!!

---

## Skeleton.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/skeleton/Skeleton.astro`

### Frontmatter

!!!astro
---
/**
 * Skeleton
 *
 * A loading placeholder that signals content is on its way.
 * Purely visual — aria-hidden and role="presentation" so screen
 * readers skip it entirely.
 *
 * @example Single shapes
 * !!!astro
 * <Skeleton variant="avatar" />
 * <Skeleton variant="heading" />
 * <Skeleton variant="button" />
 * <Skeleton variant="image" ratio="16/9" />
 * <Skeleton variant="text" />
 * !!!
 *
 * @example Multi-line text block
 * !!!astro
 * <Skeleton variant="text" lines={3} />
 * !!!
 *
 * @example Explicit size
 * !!!astro
 * <Skeleton width="200px" height="1em" />
 * <Skeleton variant="avatar" height="4rem" />
 * !!!
 *
 * @example Custom radius
 * !!!astro
 * <!-- Match a card image with rounded corners -->
 * <Skeleton variant="image" ratio="4/3" radius="lg" />
 * !!!
 *
 * @example Static (no animation)
 * !!!astro
 * <Skeleton variant="text" animated={false} />
 * !!!
 *
 * @example Composing a card skeleton
 * !!!astro
 * <div style="display: flex; gap: 1rem; align-items: center;">
 *   <Skeleton variant="avatar" />
 *   <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
 *     <Skeleton variant="heading" />
 *     <Skeleton variant="text" lines={2} />
 *   </div>
 * </div>
 * !!!
 *
 * REPLACING TABLE / LIST INLINE SKELETONS
 * ─────────────────────────────────────────────────────────────────────────────
 * Table and List currently have inline skeleton CSS. On the cleanup pass,
 * replace their loading state renders with <Skeleton /> instances:
 *
 * Table skeleton cell:
 * !!!astro
 * <td><Skeleton /></td>
 * !!!
 *
 * List skeleton item:
 * !!!astro
 * <li class="list__item">
 *   <Skeleton variant="text" />
 * </li>
 * !!!
 *
 * @see skeleton.hook.ts    — useSkeleton
 * @see skeleton.props.ts   — SkeletonProps
 * @see skeleton.tokens.ts  — SKELETON_TOKENS, variants, defaults
 * @see skeleton.css        — shimmer animation, variant shapes
 */

import type { SkeletonProps } from "./skeleton.props";
import { useSkeleton }        from "./skeleton.hook";
import "./skeleton.css";

type Props = SkeletonProps;

const { variant, lines, props } = useSkeleton(Astro.props as SkeletonProps);
---
!!!

### Template

!!!astro
{variant === "text" && lines > 1
  ? (
    <div {...props} class:list={[props.class, "skeleton--multi"]}>
      {Array.from({ length: lines }).map((_, i) => (
        <span class:list={[
          "skeleton__line",
          i === lines - 1 && "skeleton__line--last",
        ]} />
      ))}
    </div>
  )
  : <div {...props} />
}
!!!

---

## SkipLink.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/skip-link/SkipLink.astro`

### Frontmatter

!!!astro
---
/**
 * SkipLink
 *
 * An accessible skip link that allows keyboard users to bypass navigation
 * and jump directly to the main content. Visually hidden by default,
 * transitions to the top of the viewport when focused.
 *
 * @example
 * <!-- Jump to #main-content -->
 * <SkipLink target="main-content" />
 */
import type { SkipLinkProps } from "./skip-link.props";
import { useSkipLink }        from "./skip-link.hook";
import "../../trigger.css";
import "./skip-link.css";

type Props = SkipLinkProps;

const { Tag, props, label } = useSkipLink(Astro.props as SkipLinkProps);
---
!!!

### Template

!!!astro
<Tag {...props as Record<string, unknown>}>{label}</Tag>
!!!

---

## Slider.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/slider/Slider.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Spacer.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/spacer/Spacer.astro`

### Frontmatter

!!!astro
---
/**
 * Spacer
 *
 * A layout component that fills all available space within a Flex container.
 * It's a simple, prop-less component for creating space between elements.
 *
 * @example Pushing elements apart in a header
 * !!!astro
 * <Flex>
 *   <Logo />
 *   <Spacer />
 *   <Navigation />
 * </Flex>
 * !!!
 *
 * @see spacer.hook.ts
 */
import { useSpacer } from "./spacer.hook";
import type { SpacerProps } from "./spacer.props";
import "./spacer.css";

const { Tag, props } = useSpacer(Astro.props as SpacerProps);
---
!!!

### Template

!!!astro
<Tag {...props} />
!!!

---

## Spinner.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/spinner/Spinner.astro`

### Frontmatter

!!!astro
---
/**
 * Spinner
 *
 * A rotating loading indicator with configurable speed, direction, size,
 * and color. Renders as an accessible `role="status"` element with a
 * visually-hidden label for screen readers.
 *
 * STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────
 *   <span class="feedback spinner spinner--{speed} spinner--{direction}"
 *         role="status">
 *     <svg class="spinner__arc" aria-hidden="true">…</svg>  ← or icon
 *     <span class="sr-only">{label}</span>                  ← screen reader text
 *   </span>
 *
 * POSITIONING
 * ─────────────────────────────────────────────────────────────────────────
 * Spinner renders inline. To overlay it on another component:
 *   <div style="position: relative; display: inline-flex;">
 *     <Button disabled>Save</Button>
 *     <span style="position: absolute; inset: 0; display: grid; place-items: center;">
 *       <Spinner size="sm" />
 *     </span>
 *   </div>
 * A dedicated <LoadingOverlay> component will provide this pattern.
 *
 * @example
 * <!-- Default -->
 * <Spinner />
 *
 * @example
 * <!-- Large, slow -->
 * <Spinner size="lg" speed="slow" />
 *
 * @example
 * <!-- Danger color, fast -->
 * <Spinner color="danger" speed="fast" label="Cancelling…" />
 *
 * @example
 * <!-- Counter-clockwise -->
 * <Spinner direction="counterclockwise" />
 *
 * @example
 * <!-- Inline with text -->
 * <span style="display: inline-flex; gap: 0.5rem; align-items: center;">
 *   <Spinner size="sm" />
 *   Saving…
 * </span>
 *
 * @see spinner.hook.ts   — resolves props to { Tag, props, label, icon }
 * @see spinner.props.ts  — full prop type reference
 * @see spinner.css       — size map, spin keyframe, speed/direction modifiers
 * @see feedback.css      — shared variant and color rules
 */

import type { SpinnerProps } from "./spinner.props";
import { useSpinner }        from "./spinner.hook";
import "../../feedback.css";
import "./spinner.css";

type Props = SpinnerProps;

const { Tag, props, label, IconComponent } = useSpinner(Astro.props as SpinnerProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  {/* ── Icon from registry (default: "spinner" arc) ──────────── */}
  <IconComponent
    class="spinner__arc"
    aria-hidden="true"
    width={undefined}
    height={undefined}
  />

  {/* ── Screen reader label ────────────────────────────────────── */}
  <span class="sr-only">{label}</span>
</Tag>
!!!

---

## Stack.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/stack/Stack.astro`

### Frontmatter

!!!astro
---
import type { StackProps } from "./stack.props";
import { useStack } from "./stack.hook";

import "./stack.css";

const { Tag, props } = useStack(Astro.props as StackProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  <slot />
</Tag>
!!!

---

## Stat.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/stat/Stat.astro`

### Frontmatter

!!!astro
---
/**
 * Stat
 *
 * Renders a single statistic (value and label).
 *
 * @example
 * !!!astro
 * <Stat value="24k" label="Total Users" color="primary" />
 * !!!
 */
import type { StatProps } from "./stat.props";
import { useStat } from "./stat.hook";
import Skeleton from "~/shared/components/skeleton/Skeleton.astro";
import Icon from "~/assets/components/icon/Icon.astro";import "~/shared/components/skeleton/skeleton.css";
import Label from "~/typography/components/label/Label.astro";
import Stack from "~/layout/components/stack/Stack.astro";
import Text from "~/typography/components/text/Text.astro";
import Box from "~/layout/components/box/Box.astro";
import "../../data.css";
import "./stat.css";

const { Tag, props, value, label } = useStat(Astro.props as StatProps);
const { icon } = Astro.props;
const isLoading = "data-loading" in props;
---
!!!

### Template

!!!astro
<Tag {...props}>
  {isLoading ? (
    <>
      <Skeleton variant="text" lines={1} style="height:2em; width:3em" />
      <Skeleton variant="text" lines={1} style="width:5em" />
    </>
  ) : (
    <Box class="stat">
      {(icon || Astro.slots.has("icon")) && (
        <div class="stat__icon">
          {icon ? <Icon name={icon} /> : <slot name="icon" />}
        </div>
      )}
      {Astro.slots.has("value") ? (
        <Text size="xl" class="stat__value">
          <slot name="value" />
        </Text>
      ) : value !== undefined ? (
        <Text size="xl" color="primary" class="stat__value">
          {value}
        </Text>
      ) : (
        <Text><slot /></Text>
      )}
      
      {Astro.slots.has("label") ? (
        <Label class="stat__label">
          <slot name="label" />
        </Label>
      ) : label ? (
        <Label class="stat__label">
          {label}
        </Label>
      ) : null}
    </Box>
  )}
</Tag>
!!!

---

## Stepper.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/Stepper.astro`

### Frontmatter

!!!astro
---
/**
 * Stepper
 *
 * A visual progress indicator for sequential steps.
 *
 * @example
 * <Stepper items={[{ id: "1", label: "Cart" }, { id: "2", label: "Shipping" }]} currentStepIndex={1} />
 */
import { useStepper } from "./stepper.hook";
import type { StepperProps } from "./stepper.props";
import Step from "./step/Step.astro";
import "../../nav.css";
import "./stepper.css";

export type Props = StepperProps;

const { stepperProps, items, currentStepIndex } = useStepper(Astro.props as StepperProps);
---
!!!

### Template

!!!astro
<nav {...stepperProps}>
  <ol class="stepper__list">
    {items ? (
      items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        let state = item.state;
        if (!state) {
          if (index < currentStepIndex) state = "complete";
          else if (index === currentStepIndex) state = "current";
          else state = "incomplete";
        }

        return (
          <Step
            state={state}
            label={item.label}
            {...(item.description !== undefined ? { description: item.description } : {})}
            isLast={isLast}
            stepNumber={index + 1}
          />
        );
      })
    ) : (
      <slot />
    )}
  </ol>
</nav>
!!!

---

## step/Step.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/step/Step.astro`

### Frontmatter

!!!astro
---
/**
 * Step
 *
 * An individual step within a `<Stepper>`. Handles its own complete/current/incomplete
 * states and renders the connecting lines via CSS pseudo-elements.
 *
 * @see Stepper.astro
 */
import { useStep } from "./step.hook";
import type { StepProps } from "./step.props";
import { icons } from "~/shared/icons";
import "./step.css";

export type Props = StepProps;

const { Tag, label, description, stepNumber, stepProps } = useStep(Astro.props as StepProps);
const CheckIcon = icons.check;
---
!!!

### Template

!!!astro
<li {...stepProps as Record<string, unknown>}>
  <Tag class="stepper__step-content">
    <span class="stepper__indicator" aria-hidden="true">
      {stepProps["data-state"] === "complete" ? (
        <CheckIcon width={16} height={16} />
      ) : (
        <slot name="indicator">{stepNumber}</slot>
      )}
    </span>
    
    {(label || description) && (
      <span class="stepper__text">
        {label && <span class="stepper__label">{label}</span>}
        {description && <span class="stepper__description">{description}</span>}
      </span>
    )}
  </Tag>
</li>
!!!

---

## Switch.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/switch/Switch.astro`

### Frontmatter

!!!astro
---
/**
 * Switch
 *
 * Toggle switch for binary on/off state. Rendered as a styled
 * `<input type="checkbox" role="switch">` inside a `<label>`.
 *
 * STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────
 *   <label class="form switch …">
 *     <input class="switch__control" type="checkbox" role="switch" />
 *     <span  class="switch__track"   aria-hidden>
 *       <span class="switch__thumb"></span>
 *     </span>
 *     <span  class="switch__label"><slot /></span>
 *   </label>
 *
 * DOM order is fixed: hidden input → track → label slot.
 * `labelPosition` changes VISUAL order via CSS flex-direction only.
 * This keeps the ~ sibling combinator state rules functional.
 *
 * @example
 * <!-- Basic on/off toggle -->
 * <Switch name="notifications">Enable notifications</Switch>
 *
 * @example
 * <!-- Pre-checked with custom color -->
 * <Switch name="dark-mode" checked color="primary">Dark mode</Switch>
 *
 * @example
 * <!-- Label to the left -->
 * <Switch name="autosave" labelPosition="start">Autosave</Switch>
 *
 * @see switch.hook.ts  — resolves props to { Tag, props, inputAttrs }
 * @see switch.props.ts — full prop type reference
 * @see switch.css      — track, thumb, and layout styles
 * @see forms.css       — shared variant and state styles
 */

import type { SwitchProps } from "./switch.props";
import { useSwitch }        from "./switch.hook";
import "~/forms/forms.css";
import "./switch.css";

const { Tag, props, inputAttrs } = useSwitch(Astro.props as SwitchProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  <input class="switch__control" {...inputAttrs} />
  <span class="switch__track" aria-hidden="true">
    <span class="switch__thumb"></span>
  </span>
  {Astro.slots.has("default") && (
    <span class="switch__label">
      <slot />
    </span>
  )}
</Tag>
!!!

---

## Table.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/Table.astro`

### Frontmatter

!!!astro
---
/**
 * Table
 *
 * Renders tabular data with full support for two modes:
 *
 *   Data-driven  Pass `data` + `columns` and Table handles all rendering.
 *                Add `sortable`, `stickyHeader`, `striped` etc. as needed.
 *
 *   Compound     Use <TableHead>, <TableBody>, <TableFoot>, <TableRow>,
 *                <TableCell> via named slots for full structural control.
 *                Data category props (color, variant, size, etc.) still apply.
 *
 *   Mixed        Pass `data` + `columns` for the body while slotting a
 *                custom <TableFoot> — the slot wins for its section.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div  class="data [modifiers]" style="…CSS vars…" [data-attrs]>
 *   <table class="table [modifiers]" [id] [aria-*]>
 *     <caption>…</caption>            ← when caption prop is set
 *     <thead>…</thead>                ← data-driven or head slot
 *     <tbody>…</tbody>                ← data-driven, skeleton, empty, or body slot
 *     <tfoot>…</tfoot>                ← foot slot only
 *   </table>
 * </div>
 *
 * Why the wrapper div — overflow:auto on <table> is ignored by all browsers.
 * The wrapper receives .data and state attributes; <table> receives .table.
 * CSS vars set on the wrapper cascade into the table and all descendants.
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   head    Replaces data-driven <thead>. Use <TableHead> + <TableRow> + <TableCell as="th">.
 *   body    Replaces data-driven <tbody>. Use <TableBody> + <TableRow> + <TableCell>.
 *   foot    Appends a <tfoot>. Use <TableFoot> + <TableRow> + <TableCell>.
 *   empty   Replaces the default empty state message.
 *
 * @example Data-driven
 * !!!astro
 * <Table
 *   data={rows}
 *   columns={[
 *     { key: "name",   heading: "Name",   width: "200px" },
 *     { key: "status", heading: "Status", align: "center" },
 *     { key: "amount", heading: "Amount", align: "end",
 *       format: (v) => `$${Number(v).toFixed(2)}` },
 *   ]}
 *   caption="Q3 Sales by Region"
 *   color="primary"
 *   variant="outlined"
 *   striped
 *   sortable
 *   sort={{ key: "amount", direction: "desc" }}
 *   stickyHeader
 *   scrollable
 *   layout="fixed"
 * />
 * !!!
 *
 * @example Compound mode
 * !!!astro
 * <Table caption="Team members" color="primary" striped interactive>
 *   <TableHead slot="head">
 *     <TableRow><TableCell as="th">Name</TableCell><TableCell as="th">Role</TableCell></TableRow>
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
 *
 * @example Loading state
 * !!!astro
 * <Table columns={cols} loading caption="Sales data" />
 * !!!
 *
 * @example Empty state
 * !!!astro
 * <Table data={[]} columns={cols} empty="No results match your filters" caption="Search results" />
 * !!!
 *
 * @see table.hook.ts   — useTable: resolves props to wrapperProps + tableProps
 * @see table.props.ts  — TableProps: full prop reference
 * @see table.tokens.ts — TABLE_TOKENS, ColumnDef, TableSort, TABLE_DEFAULTS
 * @see table.css       — table-specific styles
 * @see data.css        — shared data category styles (variants, states)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADJUSTING PROPS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * COLOR CHANNELS
 *   color       [./table.css]  var(--data--color--*) in thead border,
 *                              hover bg, sort indicators, bordered cells
 *               @example color="danger" → red header border + hover tint
 *
 *   bg          [./table.css]  var(--bg--*) in thead bg, striped rows
 *               @example bg="primary"  → tinted header + even rows
 *
 *   highlight   [./table.css]  var(--data--highlight--*) on tr[data-highlighted]
 *               @example highlight="warning" → amber left-border + subtle bg
 *
 * CONTAINER
 *   variant     [./data.css]   plain | outlined | soft | elevated — on wrapper div
 *               Override here if table needs different container treatment.
 *
 *   size        [./table.css]  calc(var(--data--size) * N) on th/td padding
 *               @example size="compact" → --data--size: var(--space-xs)
 *
 * METADATA
 *   caption     [./Table.astro] renders as <caption> inside <table> — no CSS to adjust.
 *               Always provide one when no visible heading precedes the table.
 *
 * STATE
 *   loading     [./table.css]  .data[data-loading] .table tbody td::after
 *               Change skeleton gradient colours or animation timing here.
 *
 *   empty       [./table.css]  .table__empty-cell  .data__empty
 *               [./Table.astro] change default message ("No data available")
 *               Use the empty slot for rich custom empty states.
 *
 * VISUAL MODIFIERS
 *   striped     [./table.css]  .data--striped .table tbody tr:nth-child(even)
 *               Shade: var(--bg--subtle). Adjust shade or selector here.
 *
 *   bordered    [./table.css]  .data--bordered .table th, .data--bordered .table td
 *               Colour: var(--data--color--border). Adjust here.
 *
 * BEHAVIOR
 *   interactive [./table.css]  .data[data-interactive] .table tbody tr
 *               Add hover background, cursor, focus ring here.
 *
 *   selectable  [./table.css]  .data[data-selectable] first th/td — checkbox col
 *               [./Table.astro] component owns selection state via dataset.selected
 *               (JSON array) and table:selectionchange event (list.client.ts).
 *
 *   scrollable  [./data.css]   overflow-x: auto on .data[data-scrollable]
 *               Pair with max-inline-size on the wrapper or a parent element.
 *               Combine with layout="fixed" + stickyHeader for best results.
 *
 * DATA-DRIVEN
 *   data        [./Table.astro] RowData[] — no CSS to adjust.
 *   columns     [./Table.astro] ColumnDef[] — column.width applied as inline style on <th>.
 *               column.align applied as data-align attribute on <th> and <td>.
 *
 *   layout      [./table.css]  var(--table--layout, auto) on .table
 *               .table--fixed adds overflow-wrap: break-word for long cell values.
 *
 *   stickyHeader[./table.css]  .table--sticky-header thead th
 *               Background: var(--bg--subtle). Adjust z-index if
 *               inside a stacking context with other sticky elements.
 *
 *   sortable    [./table.css]  .table--sortable th[data-key] — cursor + hover
 *               Sort icons: th[aria-sort]::after content. Replace with
 *               SVG data-URI for custom icons.
 *
 *   sort        [./Table.astro] sets aria-sort attribute on <th> — CSS handles rest.
 */

import Checkbox from "~/forms/components/checkbox/Checkbox.astro";
import type { TableProps } from "./table.props";
import { useTable }        from "./table.hook";
import "@data/data.css";
import "./table.css";


const {
  wrapperProps,
  tableProps,
  caption,
  columns,
  data,
  sort,
  sortable,
} = useTable(Astro.props as TableProps);

const isLoading   = Boolean(Astro.props.loading);
const isSelectable = Boolean(Astro.props.selectable);
const isEmpty     = Array.isArray(data) && data.length === 0;
const emptyMsg    = typeof Astro.props.empty === "string"
  ? Astro.props.empty
  : "No data available";

// Skeleton dimensions — add 1 col for checkbox when selectable
const skeletonRows = 5;
const skeletonCols = (columns?.length ?? 4) + (isSelectable ? 1 : 0);
---
!!!

### Template

!!!astro
<div {...wrapperProps}>
  <table {...tableProps}>
    {Astro.slots.has("default") ? <slot /> : (
      <>
        {/* ── Caption ─────────────────────────────────────────── */}
        {caption && <caption>{caption}</caption>}

        {/* ── Head: slot wins over data-driven ────────────────── */}
        {Astro.slots.has("head")
          ? <slot name="head" />
          : columns && columns.length > 0 && (
            <thead>
              <tr>
                {isSelectable && (
                  <th class="table__checkbox-col" scope="col">
                    <!-- in Table.astro, replacing the bare inputs -->
                    <Checkbox
                      data-selection-cb
                      checkState="unchecked"
                      aria-label="Select all rows"
                      variant="ghost"
                    />
                  </th>
                )}
                {columns.map(col => {
                  const colSortable = col.sortable ?? sortable;
                  const isActive    = sort?.key === col.key;
                  const ariaSort    = isActive
                    ? sort!.direction === "asc" ? "ascending" : "descending"
                    : colSortable ? "none" : undefined;

                  return (
                    <th
                      data-key={colSortable ? col.key : undefined}
                      aria-sort={ariaSort}
                      data-align={col.align}
                      style={col.width ? `width: ${col.width}` : undefined}
                      scope="col"
                    >
                      {colSortable
                        ? <button class="table__sort-btn" type="button">{col.heading}</button>
                        : col.heading
                      }
                    </th>
                  );
                })}
              </tr>
            </thead>
          )
        }

        {/* ── Body: slot → loading → empty → data-driven ──────── */}
        {Astro.slots.has("body")
          ? <slot name="body" />
          : isLoading
            ? (
              <tbody aria-busy="true" aria-label="Loading">
                {Array.from({ length: skeletonRows }).map(() => (
                  <tr>
                    {Array.from({ length: skeletonCols }).map(() => (
                      <td aria-hidden="true">&nbsp;</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            )
            : isEmpty
              ? (
                <tbody>
                  <tr>
                    <td class="table__empty-cell" colspan={(columns?.length ?? 1) + (isSelectable ? 1 : 0)}>
                      {Astro.slots.has("empty")
                        ? <slot name="empty" />
                        : <span class="data__empty">{emptyMsg}</span>
                      }
                    </td>
                  </tr>
                </tbody>
              )
              : data && columns && data.length > 0 && (
                <tbody>
                  {data.map((row, i) => (
                    <tr
                      data-row-index={i}
                      data-highlighted={row._highlighted ? "" : undefined}
                    >
                      {isSelectable && (
                        <td class="table__checkbox-col" data-selection-cb>
                          <input type="checkbox" class="table__checkbox" name="selected" value={i} aria-label="Select row" />
                        </td>
                      )}
                      {columns.map(col => (
                        <td data-align={col.align}>
                          {col.format
                            ? col.format(row[col.key], row)
                            : String(row[col.key] ?? "")
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )
        }

        {/* ── Foot ────────────────────────────────────────────── */}
        {Astro.slots.has("foot") && <slot name="foot" />}
      </>
    )}
  </table>
</div>
!!!

### Scripts

!!!ts
import "./table.client.ts";
!!!

---

## parts/TableBody.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/parts/TableBody.astro`

### Frontmatter

!!!astro
---
/**
 * TableBody
 *
 * Renders a `<tbody>` element inside a compound-mode `<Table>`.
 * Pass via the `body` slot on `<Table>`:
 *
 * !!!astro
 * <Table caption="Sales">
 *   <TableBody slot="body">
 *     {rows.map(row => (
 *       <TableRow>
 *         <TableCell>{row.name}</TableCell>
 *         <TableCell align="end">{row.amount}</TableCell>
 *       </TableRow>
 *     ))}
 *   </TableBody>
 * </Table>
 * !!!
 *
 * @see TableRow  — for individual rows
 * @see TableCell — for individual cells
 */

import type { TableBodyProps } from "../table-parts.props";

type Props = TableBodyProps;
---
!!!

### Template

!!!astro
<tbody {...Astro.props}>
  <slot />
</tbody>
!!!

---

## parts/TableCell.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/parts/TableCell.astro`

### Frontmatter

!!!astro
---
/**
 * TableCell
 *
 * Renders a `<td>` or `<th>` element. The `as` prop switches the element;
 * everything else is identical.
 *
 * !!!astro
 * <!-- Data cell (default) -->
 * <TableCell>Value</TableCell>
 *
 * <!-- Header cell -->
 * <TableCell as="th" scope="col">Column Name</TableCell>
 *
 * <!-- Numeric column — right-aligned -->
 * <TableCell align="end">$1,234.56</TableCell>
 *
 * <!-- Fixed-width column (requires layout="fixed" on parent Table) -->
 * <TableCell as="th" scope="col" width="200px">Name</TableCell>
 *
 * <!-- Spanning cells -->
 * <TableCell colspan={2}>Merged</TableCell>
 * <TableCell rowspan={3}>Tall cell</TableCell>
 * !!!
 *
 * ALIGNMENT
 * ─────────────────────────────────────────────────────────────────────────────
 * `align` is applied as `data-align` — table.css maps it to `text-align`.
 * Default alignment is `start` (no attribute needed).
 * Use `align="end"` for numeric/currency columns.
 *
 * ACCESSIBILITY
 * ─────────────────────────────────────────────────────────────────────────────
 * Always provide `scope` on `<th>` elements:
 * - `scope="col"` for column headers in `<thead>`
 * - `scope="row"` for row headers in the first cell of a `<tbody>` row
 *
 * @see TableRow  — the parent row element
 * @see TableHead — for thead context
 */

import type { TableCellProps } from "../table-parts.props";



const {
  as: Tag = "td",
  align,
  width,
  colspan,
  rowspan,
  scope,
  ...rest
} = Astro.props as TableCellProps;
---
!!!

### Template

!!!astro
<Tag
  data-align={align}
  style={width ? `width: ${width}` : undefined}
  colspan={colspan}
  rowspan={rowspan}
  scope={scope}
  {...rest}
>
  <slot />
</Tag>
!!!

---

## parts/TableFoot.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/parts/TableFoot.astro`

### Frontmatter

!!!astro
---
/**
 * TableFoot
 *
 * Renders a `<tfoot>` element inside a `<Table>`.
 * Pass via the `foot` slot — works in both data-driven and compound mode:
 *
 * !!!astro
 * <Table data={rows} columns={cols} caption="Sales">
 *   <TableFoot slot="foot">
 *     <TableRow>
 *       <TableCell>Total</TableCell>
 *       <TableCell align="end">{total}</TableCell>
 *     </TableRow>
 *   </TableFoot>
 * </Table>
 * !!!
 *
 * table.css applies `font-weight: medium` and a top border to tfoot cells.
 * Override in table.css under `.table tfoot td` if needed.
 *
 * @see TableRow  — for rows inside tfoot
 * @see TableCell — for cells inside tfoot
 */

import type { TableFootProps } from "../table-parts.props";

type Props = TableFootProps;
---
!!!

### Template

!!!astro
<tfoot {...Astro.props}>
  <slot />
</tfoot>
!!!

---

## parts/TableHead.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/parts/TableHead.astro`

### Frontmatter

!!!astro
---
/**
 * TableHead
 *
 * Renders a `<thead>` element inside a compound-mode `<Table>`.
 * Pass via the `head` slot on `<Table>`:
 *
 * !!!astro
 * <Table caption="Sales">
 *   <TableHead slot="head">
 *     <TableRow>
 *       <TableCell as="th" scope="col">Name</TableCell>
 *       <TableCell as="th" scope="col" align="end">Amount</TableCell>
 *     </TableRow>
 *   </TableHead>
 * </Table>
 * !!!
 *
 * All visual styling (background, border-bottom, font-weight) is applied
 * by table.css via the inherited `.table` context — no props required.
 *
 * @see TableRow   — for the row inside thead
 * @see TableCell  — use `as="th"` + `scope="col"` for header cells
 */

import type { TableHeadProps } from "../table-parts.props";

type Props = TableHeadProps;
---
!!!

### Template

!!!astro
<thead {...Astro.props}>
  <slot />
</thead>
!!!

---

## parts/TableRow.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/parts/TableRow.astro`

### Frontmatter

!!!astro
---
/**
 * TableRow
 *
 * Renders a `<tr>` element. Works inside `<TableHead>`, `<TableBody>`,
 * and `<TableFoot>`.
 *
 * !!!astro
 * <TableRow>
 *   <TableCell>Value</TableCell>
 * </TableRow>
 *
 * <!-- Highlighted row -->
 * <TableRow highlighted>
 *   <TableCell>Pinned item</TableCell>
 * </TableRow>
 * !!!
 *
 * HIGHLIGHTED ROWS
 * ─────────────────────────────────────────────────────────────────────────────
 * `highlighted` renders `data-highlighted=""` on the `<tr>`. table.css
 * applies `--data--highlight--*` channels to these rows — a left border
 * accent and subtle background tint using the parent Table's `highlight` prop.
 *
 * In data-driven mode, add `_highlighted: true` to the RowData record
 * instead — Table.astro handles the attribute automatically.
 *
 * INTERACTIVE / SELECTABLE
 * ─────────────────────────────────────────────────────────────────────────────
 * Hover and cursor styles for interactive rows are applied by table.css via
 * `[data-interactive]` on the wrapper — no prop needed on TableRow itself.
 *
 * @see TableCell — for cells inside this row
 */

import type { TableRowProps } from "../table-parts.props";

type Props = TableRowProps;

const { highlighted, ...rest } = Astro.props as TableRowProps;
---
!!!

### Template

!!!astro
<tr
  data-highlighted={highlighted ? "" : undefined}
  {...rest}
>
  <slot />
</tr>
!!!

---

## Tabs.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/Tabs.astro`

### Frontmatter

!!!astro
---
/**
 * Tabs
 *
 * A row of interactive tab controls. It renders the `role="tablist"` container
 * and the individual `role="tab"` buttons.
 *
 * COMPOSITION OPTIONS
 * ─────────────────────────────────────────────────────────────────────────
 * 1. Data-Driven: Pass an array of `items` to automatically generate the tabs.
 * 2. Slot-Driven: Omit `items` and manually compose `<Tab>` components inside.
 *
 * USE CASES
 * ─────────────────────────────────────────────────────────────────────────
 * - Visual Navigation: Use by itself (without a `<TabGroup>`) if clicking a
 *   tab should behave like a normal link and trigger a full page reload.
 * - Interactive: Wrap inside a `<TabGroup>` Web Component alongside 
 *   `<TabPanel>` components to swap content instantly via JavaScript.
 *
 * @example
 * <TabGroup>
 *   <Tabs items={[{ id: "1", label: "One" }]} />
 *   <TabPanel id="1">Content</TabPanel>
 * </TabGroup>
 *
 * @see tabs.props.ts — full prop type reference
 * @see TabGroup.astro — the Web Component wrapper for interactivity
 */
import { useTabs } from "./tabs.hook";
import type { TabsProps } from "./tabs.props";
import Tab from "./tab/Tab.astro";
import "../../nav.css";
import "./tabs.css";

type Props = TabsProps;

const { tabsProps, items, activeId } = useTabs(Astro.props);
---
!!!

### Template

!!!astro
<div {...tabsProps as Record<string, unknown>}>
  {items ? (
    items.map(item => (
      <Tab
        id={item.id}
        {...(item.disabled !== undefined ? { disabled: item.disabled } : {})}
        {...((activeId ? activeId === item.id : item.active) !== undefined ? { active: activeId ? activeId === item.id : item.active } : {})}
        {...(item.href ? { href: item.href } : {})}
        {...(item.icon ? { icon: item.icon } : {})}
      >
        {item.label}
      </Tab>
    ))
  ) : (
    <slot />
  )}
</div>
!!!

---

## group/TabGroup.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/group/TabGroup.astro`

### Frontmatter

!!!astro
---
/**
 * TabGroup (Web Component Wrapper)
 *
 * An interactive container for Tabs and TabPanels. It renders a `<dezign8-tabs>` 
 * custom element that orchestrates state between the tab buttons and the content panels
 * without requiring a full page reload or framework-specific state (like React/Vue).
 *
 * ARCHITECTURE
 * ─────────────────────────────────────────────────────────────────────────
 * This component runs a lightweight vanilla JavaScript class that:
 * 1. Automatically links `role="tab"` elements to `role="tabpanel"` elements.
 * 2. Handles mouse clicks to swap active states.
 * 3. Provides full keyboard accessibility (Arrow keys to cycle tabs).
 *
 * @example
 * <TabGroup defaultActiveId="specs">
 *   <Tabs items={[{ id: "overview", label: "Overview" }, { id: "specs", label: "Specs" }]} />
 *   <TabPanel id="overview">Overview content</TabPanel>
 *   <TabPanel id="specs">Specs content</TabPanel>
 * </TabGroup>
 *
 * @see Tabs.astro     — renders the `role="tablist"` and tabs.
 * @see TabPanel.astro — renders the `role="tabpanel"` content blocks.
 */
import type { TabGroupProps } from "./t-group.props";

export type Props = TabGroupProps;

const { defaultActiveId, class: className, ...rest } = Astro.props;
---
!!!

### Template

!!!astro
<dezign8-tabs data-default={defaultActiveId} class={className} {...rest}>
  <slot />
</dezign8-tabs>
!!!

### Scripts

!!!ts
class Dezign8Tabs extends HTMLElement {
    connectedCallback() {
      const tablist = this.querySelector('[role="tablist"]');
      if (!tablist) return;
      
      const tabs = Array.from(this.querySelectorAll('[role="tab"]')) as HTMLElement[];
      const panels = Array.from(this.querySelectorAll('[role="tabpanel"]')) as HTMLElement[];
      
      let activeId = this.dataset.default as string | null | undefined;
      
      // If no default, use the first tab
      if (!activeId && tabs.length > 0) {
        activeId = tabs[0]!.getAttribute('data-tab-id') || tabs[0]!.id.replace(/^tab-/, '');
      }
      
      const activateTab = (id: string | null | undefined) => {
        if (!id) return;
        
        // Update Tabs
        tabs.forEach(tab => {
          const tabId = tab.getAttribute('data-tab-id') || tab.id.replace(/^tab-/, '');
          const isSelected = tabId === id;
          tab.setAttribute('aria-selected', isSelected.toString());
          tab.tabIndex = isSelected ? 0 : -1;
        });
        
        // Update Panels
        panels.forEach(panel => {
          const panelFor = panel.getAttribute('data-panel-for') || panel.id.replace(/^panel-/, '');
          const isActive = panelFor === id;
          if (isActive) {
            panel.setAttribute('data-active', 'true');
          } else {
            panel.removeAttribute('data-active');
          }
        });
      };
      
      // Initial activation
      activateTab(activeId);
      
      // Click handlers
      tablist.addEventListener('click', (e) => {
        const target = e.target as Element;
        const tab = target.closest('[role="tab"]') as HTMLElement;
        if (!tab || tab.hasAttribute('disabled')) return;
        activateTab(tab.getAttribute('data-tab-id') || tab.id.replace(/^tab-/, ''));
      });
      
      // Keyboard handlers (Arrow keys)
      tablist.addEventListener('keydown', (e) => {
        const event = e as KeyboardEvent;
        const currentTab = event.target as HTMLElement;
        if (currentTab.getAttribute('role') !== 'tab') return;
        
        const orientation = tablist.getAttribute('aria-orientation') || 'horizontal';
        
        let dir = 0;
        if (orientation === 'horizontal') {
          if (event.key === 'ArrowLeft') dir = -1;
          if (event.key === 'ArrowRight') dir = 1;
        } else {
          if (event.key === 'ArrowUp') dir = -1;
          if (event.key === 'ArrowDown') dir = 1;
        }
        
        if (dir !== 0) {
          event.preventDefault();
          const enabledTabs = tabs.filter(t => !t.hasAttribute('disabled'));
          const index = enabledTabs.indexOf(currentTab);
          if (index !== -1) {
            let nextIndex = index + dir;
            if (nextIndex < 0) nextIndex = enabledTabs.length - 1;
            if (nextIndex >= enabledTabs.length) nextIndex = 0;
            const nextTab = enabledTabs[nextIndex]!;
            nextTab.focus();
            // Automatically activate on focus (standard tab behavior)
            activateTab(nextTab.getAttribute('data-tab-id') || nextTab.id.replace(/^tab-/, ''));
          }
        }
      });
    }
  }

  if (!customElements.get('dezign8-tabs')) {
    customElements.define('dezign8-tabs', Dezign8Tabs);
  }
!!!

---

## panel/TabPanel.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/panel/TabPanel.astro`

### Frontmatter

!!!astro
---
/**
 * TabPanel
 *
 * The content container associated with a specific `<Tab>`. This component
 * visually hides itself unless its `data-active` attribute is set to `"true"`.
 *
 * ACCESSIBILITY
 * ─────────────────────────────────────────────────────────────────────────
 * Automatically manages `role="tabpanel"` and `aria-labelledby`.
 * The `id` prop must exactly match the `id` of the `<Tab>` that controls it.
 *
 * @example
 * <TabPanel id="specs" active>
 *   Here are the product specifications...
 * </TabPanel>
 *
 * @see TabGroup.astro — the Web Component wrapper that toggles panel visibility
 */
import { useTabPanel }        from "./t-panel.hook";
import type { TabPanelProps } from "./t-panel.props";
import "./t-panel.css";

export type Props = TabPanelProps;

const { tabPanelProps } = useTabPanel(Astro.props as TabPanelProps);
---
!!!

### Template

!!!astro
<div {...tabPanelProps as Record<string, unknown>}>
  <slot />
</div>
!!!

---

## tab/Tab.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/tab/Tab.astro`

### Frontmatter

!!!astro
---
/**
 * Tab
 *
 * An individual interactive tab button. Must be placed inside a `<Tabs>` container
 * or a valid `role="tablist"` element.
 *
 * ACCESSIBILITY
 * ─────────────────────────────────────────────────────────────────────────
 * Automatically manages `role="tab"`, `aria-selected`, `aria-controls`, and `tabindex`.
 * The `id` prop must match the `id` of the `<TabPanel>` it controls.
 *
 * @example
 * <Tab id="specs" active>Specifications</Tab>
 *
 * @see Tabs.astro     — the parent container
 * @see TabGroup.astro — the Web Component wrapper for interactivity
 */
import { useTab } from "./tab.hook";
import type { TabProps } from "./tab.props";
import Icon from "~/assets/components/icon/Icon.astro";
export type Props = TabProps;

const { Tag, tabProps } = useTab(Astro.props as TabProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...tabProps}>
  {icon && <Icon name={icon} />}
  <slot />
</Tag>
!!!

---

## Tag.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/tag/Tag.astro`

### Frontmatter

!!!astro
---
import type { TagProps } from "./tag.props";
import { useTag } from "./tag.hook";
import Icon from "~/assets/components/icon/Icon.astro";import "../../feedback.css";
import "./tag.css";

type Props = TagProps;

const { Tag: TagElement, props: tagProps } = useTag(Astro.props);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<TagElement {...tagProps}>
  {icon && <Icon name={icon} />}
  <slot />
</TagElement>
!!!

---

## Text.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/text/Text.astro`

### Frontmatter

!!!astro
---
import type { TextProps } from "./text.props";
import { useText } from "./text.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "../../typography.css";
import "./text.css";

const { Tag, props } = useText(Astro.props as TextProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<Tag {...props}>
  {icon && <Icon name={icon} />}
  <slot />
</Tag>
!!!

---

## Textarea.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/textarea/Textarea.astro`

### Frontmatter

!!!astro
---
/**
 * Textarea
 *
 * Multi-line text input. Follows the same wrapper+control pattern as Input:
 * the outer `<div>` owns visual chrome; the inner `<textarea>` is transparent.
 *
 * RESIZE
 * ─────────────────────────────────────────────────────────────────────────
 * Controlled via the `resize` prop: `"none"` | `"vertical"` (default) | `"both"`.
 * Horizontal-only resize is omitted — uncommon and often undesirable in layouts.
 *
 * @example
 * <!-- Basic -->
 * <Textarea name="bio" placeholder="Tell us about yourself" />
 *
 * @example
 * <!-- Pre-filled, no resize -->
 * <Textarea name="notes" value="Some existing notes" resize="none" rows={5} />
 *
 * @example
 * <!-- Inside a Field -->
 * <Field id="bio">
 *   <Label slot="label" for="bio">Bio</Label>
 *   <Textarea id="bio" name="bio" maxLength={500} fullWidth />
 * </Field>
 *
 * @see textarea.hook.ts  — resolves props to { Tag, props, textareaAttrs, value }
 * @see textarea.props.ts — full prop type reference
 * @see textarea.css      — inner control and wrapper overrides
 * @see forms.css         — shared variant and state styles
 */

import type { TextareaProps } from "./textarea.props";
import { useTextarea }        from "./textarea.hook";
import "~/forms/forms.css";
import "./textarea.css";

const { Tag, props, textareaAttrs, value } = useTextarea(Astro.props as TextareaProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  <textarea class="textarea__control" {...textareaAttrs}>{value}</textarea>
</Tag>
!!!

---

## ThemeToggle.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/theme-toggle/ThemeToggle.astro`

### Frontmatter

!!!astro
---
/**
 * ThemeToggle Component
 *
 * An icon button that toggles between light and dark colour themes.
 * Wraps the existing `Button` component so all trigger-level props
 * (`variant`, `color`, `size`, `radius`) work out of the box.
 *
 * Behaviour (client-side):
 *   1. On click, reads the current `data-theme` on `<html>`.
 *   2. Flips it between `"dark"` ↔ removed (light).
 *   3. Persists the choice to `localStorage("theme")`.
 *
 * The initial theme is resolved synchronously by the inline script in
 * `Head.astro` (prevents FOUC), so this component only needs to handle
 * the toggle action.
 *
 * Default SVG icons (sun / moon) are baked in. Override them later by
 * swapping the SVGs inside this file or by slotting your own icon
 * component once Dezign8 supports an icon system.
 *
 * @example Minimal — ghost icon button with neutral colour
 * !!!astro
 * <ThemeToggle />
 * !!!
 *
 * @example Small outlined toggle
 * !!!astro
 * <ThemeToggle variant="outlined" size="sm" />
 * !!!
 *
 * @example Inside a Header
 * !!!astro
 * <Header>
 *   <Logo slot="start" />
 *   <ThemeToggle slot="end" />
 * </Header>
 * !!!
 */
import type { ThemeToggleProps } from "./theme-toggle.props";
import { useThemeToggle } from "./theme-toggle.hook";
import "../../trigger.css";
import "../button/button.css";
import "./theme-toggle.css";

type Props = ThemeToggleProps;

const { Tag, props } = useThemeToggle(Astro.props as ThemeToggleProps);
---
!!!

### Template

!!!astro
<Tag {...props}>
  {/* ── Sun icon (visible in light mode) ──────────────────── */}
  <svg
    class="theme-toggle__icon theme-toggle__icon--sun"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1"  x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1"  y1="12" x2="3"  y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78"  x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22" />
  </svg>

  {/* ── Moon icon (visible in dark mode) ──────────────────── */}
  <svg
    class="theme-toggle__icon theme-toggle__icon--moon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
</Tag>

{/* ── Client-side toggle behaviour ────────────────────────── */}
!!!

### Scripts

!!!ts
function initThemeToggles() {
    const STORAGE_KEY = "theme";

    document.querySelectorAll<HTMLElement>(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const root = document.documentElement;
        const isDark = root.getAttribute("data-theme") === "dark";

        if (isDark) {
          root.removeAttribute("data-theme");
          localStorage.setItem(STORAGE_KEY, "light");
        } else {
          root.setAttribute("data-theme", "dark");
          localStorage.setItem(STORAGE_KEY, "dark");
        }
      });
    });
  }

  // Run immediately — Astro scripts are deferred by default
  initThemeToggles();

  // Re-initialise after Astro client-side navigation (View Transitions)
  document.addEventListener("astro:after-swap", initThemeToggles);
!!!

---

## Tile.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/tile/Tile.astro`

### Frontmatter

!!!astro
---
/**
 * Tile
 *
 * Small interactive grid item. Inherits surface properties and supports
 * interactive and selectable states natively.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="surface tile [modifiers]" style="…CSS vars…" [aria-*]>
 *   <slot />
 * </div>
 *
 * When href is set, the root renders as <a>.
 * When selectable is set, role="button" + aria-pressed are added.
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Content
 *
 * @example
 * !!!astro
 * <Tile interactive href="/dashboard">
 *   <Text>Dashboard</Text>
 * </Tile>
 * !!!
 *
 * @see tile.hook.ts   — useTile: resolves props to { Tag, props }
 * @see tile.props.ts  — TileProps: full prop reference
 * @see surface.css    — visual chrome (variants, color channels)
 * @see tile.css       — interaction states
 */

import type { TileProps } from "./tile.props";
import { useTile }        from "./tile.hook";
import "../../surface.css";
import "./tile.css";

const { Tag, props } = useTile(Astro.props as TileProps);
---
!!!

### Template

!!!astro
<Tag {...props as Record<string, unknown>}><slot /></Tag>
!!!

---

## TimePicker.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/time-picker/TimePicker.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Toast.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/toast/Toast.astro`

### Frontmatter

!!!astro
---
import type { ToastProps } from "./toast.props";
import { useToast }        from "./toast.hook";
import Icon from "~/assets/components/icon/Icon.astro";
import "../../feedback.css";
import "./toast.css";

const { props, title, dismissible, dismissLabel } = useToast(Astro.props as ToastProps);
const { icon } = Astro.props;
---
!!!

### Template

!!!astro
<div {...props}>
  {(icon || Astro.slots.has("icon")) && (
    <div class="toast__icon" aria-hidden="true">
      {icon ? <Icon name={icon} /> : <slot name="icon" />}
    </div>
  )}
  <div class="toast__body">
    {title && <div class="toast__title">{title}</div>}
    <slot />
  </div>
  {dismissible && (
    <button class="toast__dismiss" type="button" aria-label={dismissLabel} data-dismiss>
      <Icon name="x" size="sm" />
    </button>
  )}
</div>
!!!

### Scripts

!!!ts
import { mountMotionDismiss } from "~/shared/motion/motion.dismiss";
  mountMotionDismiss();
!!!

---

## Toolbar.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/toolbar/Toolbar.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Tooltip.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/tooltip/Tooltip.astro`

### Frontmatter

!!!astro
---
import type { TooltipProps } from "./tooltip.props";
import { useTooltip } from "./tooltip.hook";
import "./tooltip.css";

const { wrapperProps, content } = useTooltip(Astro.props as TooltipProps);
---
!!!

### Template

!!!astro
<span {...wrapperProps}><slot /><span class="tooltip__content" role="tooltip">{content}</span></span>
!!!

---

## TreeView.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tree-view/TreeView.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Video.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/video/Video.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## VisuallyHidden.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/visually-hidden/VisuallyHidden.astro`

### Frontmatter

!!!astro
---
/**
 * VisuallyHidden
 *
 * Hides children visually while keeping them accessible to assistive
 * technology (screen readers).
 *
 * @example
 * !!!astro
 * <button>
 *   <Icon name="search" />
 *   <VisuallyHidden>Search site</VisuallyHidden>
 * </button>
 * !!!
 */
import type { VisuallyHiddenProps } from "./visually-hidden.props";
import { useVisuallyHidden } from "./visually-hidden.hook";
import "./visually-hidden.css";

type Props = VisuallyHiddenProps;

const { Tag, props } = useVisuallyHidden(Astro.props as VisuallyHiddenProps);
---
!!!

### Template

!!!astro
<Tag {...props as Record<string, unknown>}><slot /></Tag>
!!!

---

## Waveform.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/waveform/Waveform.astro`

### Frontmatter

!!!astro
---

---
!!!

### Template

!!!astro

!!!

---

## Well.astro component


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/well/Well.astro`

### Frontmatter

!!!astro
---
/**
 * Well
 *
 * Inset content container with a sunken appearance relative to its context.
 * Inherits surface properties.
 *
 * HTML STRUCTURE
 * ─────────────────────────────────────────────────────────────────────────────
 * <div class="surface well [modifiers]" style="…CSS vars…">
 *   <slot />
 * </div>
 *
 * SLOTS
 * ─────────────────────────────────────────────────────────────────────────────
 *   default   Content
 *
 * @example
 * !!!astro
 * <Well padding="md">
 *   <Text>This content sits inside a recessed well area.</Text>
 * </Well>
 * !!!
 *
 * @see well.hook.ts   — useWell: resolves props to { Tag, props }
 * @see well.props.ts  — WellProps: full prop reference
 * @see surface.css    — visual chrome (handles layer="inset" automatically)
 */

import type { WellProps } from "./well.props";
import { useWell }        from "./well.hook";
import "../../surface.css";
import "./well.css";

const { Tag, props } = useWell(Astro.props as WellProps);
---
!!!

### Template

!!!astro
<Tag {...props}><slot /></Tag>
!!!

---

