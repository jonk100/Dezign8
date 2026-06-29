# Aggregated CSS Files

## alert-dialog.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.css`


!!!css
/* alert-dialog.css — minimal; shared chrome lives in overlays.css */

.alert-dialog__icon {
  font-size: var(--icon--size-xl, 24px);
  color: var(--feedback--color-text, currentColor);
  margin-bottom: var(--space-in--xs);
}

.alert-dialog__description {
  margin:      0;
  font-size:   var(--fsf--sm);
  color:       var(--text--secondary);
  line-height: var(--leading--md);
}

!!!

---

## alert.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/alert.css`


!!!css
/* design/feedback/components/alert/alert.css */

/**
 * Alert component — block-level status message box.
 *
 * Imports feedback.css for variant + color channel rules.
 * Overrides the inline-flex pill layout with a block stack.
 *
 * Layout regions:
 *   .alert__icon    — optional leading icon slot
 *   .alert__body    — stacked title + description content
 *   .alert__title   — optional heading above the description
 *   .alert__actions — optional trailing actions (links, buttons)
 *   .alert__dismiss — dismiss button (only when alert--dismissible)
 */

/* ─── Layout override ─────────────────────────────────────────────────────── */

.alert {
  display:        flex;
  align-items:    flex-start;
  gap:            var(--alert--gap, var(--space-in--sm));
  padding:              var(--alert--p, var(--alert--padding));
  padding-inline:       var(--alert--px, var(--alert--p, var(--alert--padding)));
  padding-block:        var(--alert--py, var(--alert--p, var(--alert--padding)));
  padding-block-start:  var(--alert--pt, var(--alert--py, var(--alert--p, var(--alert--padding))));
  padding-block-end:    var(--alert--pb, var(--alert--py, var(--alert--p, var(--alert--padding))));
  padding-inline-start: var(--alert--pl, var(--alert--px, var(--alert--p, var(--alert--padding))));
  padding-inline-end:   var(--alert--pr, var(--alert--px, var(--alert--p, var(--alert--padding))));
  white-space:    normal;
  width:          100%;
  line-height:    var(--leading--normal);
  font-size:      var(--alert--font-size);
}



/* ─── Icon slot ───────────────────────────────────────────────────────────── */

.alert__icon {
  flex-shrink: 0;
  width:       1.25em;
  height:      1.25em;
  margin-top:  0.125em; /* optical alignment with first line of text */
  color:       var(--feedback--color-text);
}

/* ─── Body ────────────────────────────────────────────────────────────────── */

.alert__body {
  flex:    1;
  display: flex;
  flex-direction: column;
  gap:     var(--space-in--2xs);
}

.alert__body > * {
  margin: 0;
}

.alert__title {
  font-weight: var(--weight--semibold);
  font-size:   var(--fsf--sm);
  color:       var(--feedback--color-text);
}

/* ─── Actions slot ────────────────────────────────────────────────────────── */

.alert__body > .alert__actions {
  display:   flex;
  gap:       var(--space-in--sm);
  flex-wrap: wrap;
  margin-top: var(--space-in--xs);
}

/* ─── Dismiss button ──────────────────────────────────────────────────────── */

.alert__dismiss {
  flex-shrink:  0;
  margin-top:   0;
  margin-left:  auto;
  padding:      var(--space-in--2xs);
  border:       none;
  background:   transparent;
  cursor:       pointer;
  color:        var(--feedback--color-text);
  border-radius: var(--radius--sm);
  display:      none;
  align-items:  center;
  justify-content: center;
  opacity:      0.7;
  transition:   opacity 150ms ease, background-color 150ms ease;
}

.alert--dismissible .alert__dismiss {
  display: flex;
}

.alert__dismiss:hover {
  opacity: 1;
  background-color: var(--feedback--color-muted);
}

.alert__dismiss:focus-visible {
  outline:        2px solid var(--feedback--color-border);
  outline-offset: 1px;
  opacity:        1;
}


!!!

---

## audio.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.css`


!!!css
/* audio.css — custom audio player */

/*
 * CSS channels written by useAudio:
 *   --audio--radius              border-radius
 *   --audio--color-subtle        bg for soft variant
 *   --audio--color-muted         hover bg for soft
 *   --audio--color-base          play button fill; solid variant bg
 *   --audio--color-vivid         play button hover
 *   --audio--color-deep          play button active
 *   --audio--color-border        border for outlined/soft variants
 *   --audio--color-text          text on non-solid backgrounds
 */

.audio {
  display:          flex;
  flex-direction:   column;
  gap:              var(--space-in--xs);
  border-radius:    var(--audio--radius, var(--radius--md));
  padding:          var(--audio--padding, var(--space-in--sm));
  color:            var(--text--primary);
  font-size:        var(--fsf--sm);
  width:            100%;
  border:           1px solid transparent;
  transition:       background-color 150ms ease, border-color 150ms ease;
}

/* ── variant: chrome treatment ───────────────────────────── */

.audio--soft {
  background-color: var(--audio--color-subtle);
  border-color:     var(--audio--color-border);
}

.audio--outlined {
  background-color: transparent;
  border-color:     var(--audio--color-border);
}

.audio--solid {
  background-color: var(--audio--color-base);
  border-color:     var(--audio--color-base);
  color:            var(--text--on-color);
}

/* play button inverts on solid — container is already the accent color */
.audio--solid .audio__play-btn {
  background: rgba(0, 0, 0, 0.2);
}
.audio--solid .audio__play-btn:hover  { background: rgba(0, 0, 0, 0.3); }
.audio--solid .audio__play-btn:active { background: rgba(0, 0, 0, 0.4); }

.audio--ghost {
  background-color: transparent;
  border-color:     transparent;
}

/* ── size scale vars (read by sub-elements below) ────────── */

.audio {
  --audio--btn-size:    2.25rem;
  --audio--thumb-size:  14px;
  --audio--track-h:     4px;
  --audio--vol-w:       72px;
}

/* ── size modifiers ──────────────────────────────────────── */

.audio--sm {
  font-size:            var(--fsf--xs);
  gap:                  var(--space-in--2xs);
  padding:              var(--space-in--xs);
  --audio--btn-size:    1.75rem;
  --audio--thumb-size:  10px;
  --audio--track-h:     3px;
  --audio--vol-w:       56px;
}

.audio--sm .audio__controls { gap: var(--space-in--2xs); }

.audio--lg {
  font-size:            var(--fsf--md);
  gap:                  var(--space-in--sm);
  padding:              var(--space-in--md);
  --audio--btn-size:    2.75rem;
  --audio--thumb-size:  18px;
  --audio--track-h:     5px;
  --audio--vol-w:       96px;
}

/* ── layout: compact — single row ───────────────────────── */

.audio--layout-compact {
  flex-direction: row;
  align-items:    center;
}

.audio--layout-compact .audio__seek-row,
.audio--layout-compact .audio__time {
  flex: 1;
}

/* ── layout: minimal — hide secondary row ────────────────── */

.audio--layout-minimal .audio__secondary {
  display: none;
}

/* ── top row: controls + time ────────────────────────────── */

.audio__controls {
  display:     flex;
  align-items: center;
  gap:         var(--space-in--xs);
}

.audio__play-btn {
  display:         flex;
  align-items:     center;
  justify-content: center;
  width:           var(--audio--btn-size);
  height:          var(--audio--btn-size);
  border-radius:   50%;
  border:          none;
  background:      var(--audio--color-base);
  color:           var(--text--on-color);
  cursor:          pointer;
  flex-shrink:     0;
  transition:      background 0.15s;
}

.audio__play-btn:hover  { background: var(--audio--color-vivid); }
.audio__play-btn:active { background: var(--audio--color-deep);  }

.audio__play-btn .icon {
  display:        flex;
  align-items:    center;
  pointer-events: none;
}

.audio__time {
  margin-left:  auto;
  white-space:  nowrap;
  color:        var(--text--muted);
  font-variant-numeric: tabular-nums;
}

/* ── seek bar ────────────────────────────────────────────── */

.audio__seek-row {
  display: flex;
  align-items: center;
  gap: var(--space-in--xs);
}

.audio__seek {
  flex:              1;
  -webkit-appearance: none;
  appearance:        none;
  height:            var(--audio--track-h);
  border-radius:     var(--radius--full);
  background:        var(--border--subtle);
  cursor:            pointer;
  outline:           none;
}

.audio__seek::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance:         none;
  width:              var(--audio--thumb-size);
  height:             var(--audio--thumb-size);
  border-radius:      50%;
  background:         var(--audio--color-base);
  cursor:             pointer;
  transition:         transform 0.1s;
}

.audio__seek::-webkit-slider-thumb:hover {
  transform: scale(1.25);
}

.audio__seek::-moz-range-thumb {
  width:        var(--audio--thumb-size);
  height:       var(--audio--thumb-size);
  border-radius: 50%;
  background:   var(--primary--base);
  border:       none;
  cursor:       pointer;
}

/* progress fill via inline linear-gradient set by JS */

/* ── bottom row: volume + rate ───────────────────────────── */

.audio__secondary {
  display:     flex;
  align-items: center;
  gap:         var(--space-in--sm);
  flex-wrap:   wrap;
}

.audio__volume,
.audio__rate {
  display:     flex;
  align-items: center;
  gap:         var(--space-in--2xs);
  color:       var(--text--muted);
}

.audio__volume-slider,
.audio__rate-select {
  -webkit-appearance: none;
  appearance:         none;
  cursor:             pointer;
  background:         var(--border--subtle);
  border-radius:      var(--radius--full);
}

.audio__volume-slider {
  width:  var(--audio--vol-w);
  height: var(--audio--track-h);
}

.audio__volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance:         none;
  width:              var(--audio--thumb-size);
  height:             var(--audio--thumb-size);
  border-radius:      50%;
  background:         var(--audio--color-base);
  cursor:             pointer;
}

.audio__volume-slider::-moz-range-thumb {
  width:         var(--audio--thumb-size);
  height:        var(--audio--thumb-size);
  border-radius: 50%;
  background:    var(--primary--base);
  border:        none;
  cursor:        pointer;
}

.audio__rate-select {
  background:  var(--bg--3);
  border:      1px solid var(--border--subtle);
  border-radius: var(--radius--sm);
  color:       var(--text--primary);
  font-size:   var(--fsf--xs);
  padding:     0.1rem 0.25rem;
}

/* ── intercom badge ──────────────────────────────────────── */

.audio__intercom-badge {
  font-size:    var(--fsf--xs);
  color:        var(--warning--text);
  background:   var(--warning--subtle);
  border:       1px solid var(--warning--border);
  border-radius: var(--radius--full);
  padding:      0.1rem 0.5rem;
  margin-left:  auto;
}

/* ── redact indicator ────────────────────────────────────── */

.audio__seek-row[data-redact] .audio__seek {
  /* JS overlays the fill; just ensure no browser-default fill fights it */
  background: transparent;
}

!!!

---

## avatar-group.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/avatar-group.css`


!!!css

!!!

---

## avatar.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/avatar.css`


!!!css
.avatar {
  position: relative;
  display:  inline-flex;
  align-items: center;
  justify-content: center;
  width:  var(--avatar--size);
  height: var(--avatar--size);
  border-radius: var(--avatar--radius);
  overflow: hidden;
  background-color: var(--bg--3);
  color: var(--text--secondary);
  font-size: calc(var(--avatar--size) * 0.38);
  font-weight: var(--weight--medium, 500);
  letter-spacing: 0.02em;
  user-select: none;
  flex-shrink: 0;
}

/* ── Image mode ──────────────────────────────────────────────────── */

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── Icon fallback ───────────────────────────────────────────────── */

.avatar--icon svg {
  width: 55%;
  height: 55%;
  opacity: 0.5;
}

/* ── Status dot ──────────────────────────────────────────────────── */

.avatar--has-status::after {
  content: "";
  position: absolute;
  bottom: 6%;
  right: 6%;
  width:  calc(var(--avatar--size) * 0.265);
  height: calc(var(--avatar--size) * 0.265);
  border-radius: var(--radius--full);
  border: 2px solid var(--bg--1);
  background-color: var(--border--default);
}

.avatar--online::after  { background-color: var(--success--base); }
.avatar--offline::after { background-color: var(--border--default); }
.avatar--away::after    { background-color: var(--warning--base); }
.avatar--busy::after    { background-color: var(--danger--base); }

!!!

---

## backdrop.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/backdrop.css`


!!!css

!!!

---

## badge.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/badge.css`


!!!css
/* design/feedback/badge/badge.css */

/**
 * Badge component styles.
 *
 * This file handles the badge-specific size map and dot mode.
 * Variant, color, and placement styles all live in feedback.css.
 *
 * Size map (modifier classes written by useBadge via useFeedback):
 *   .feedback--xs  → compact (dot-friendly)
 *   .feedback--sm  → standard count badge (default)
 *   .feedback--md  → larger count / label badge
 *   .feedback--lg  → prominent label badge
 *   .feedback--xl  → large display badge
 *
 * Token channels written by badge-specific size rules:
 *   --badge--font-size   → font-size of the badge text
 *   --badge--padding-x   → inline padding
 *   --badge--padding-y   → block padding
 *   --badge--min-width   → minimum width (keeps count badges circular at low nums)
 *   --badge--height      → min-height / line-height anchor
 */

/* ─── Base Badge layout ──────────────────────────────────────────────────── */

.badge {
  display:        inline-flex;
  align-items:    center;
  justify-content: center;
  gap:            0.25em;
  font-size:      var(--badge--font-size);
  font-weight:    var(--weight--semibold);
  padding-block:  var(--badge--padding-y);
  padding-inline: var(--badge--padding-x);
  min-width:      var(--badge--min-width);
  min-height:     var(--badge--height);
  text-align:     center;
  border:         2px solid var(--feedback--color-muted);
}

.badge--icon-only {
  padding-inline: var(--badge--padding-y);
  aspect-ratio: 1;
}

.feedback.badge {
  --feedback--radius: var(--radius--md);

}

/* ─── Size map ───────────────────────────────────────────────────────────── */

.feedback--xs.badge {
  --badge--font-size:  var(--fsf--xs);
  --badge--padding-y:  calc(var(--space-in--xs) / 2.5);
  --badge--padding-x:  calc(var(--space-in--xs) / 1.5);
  --badge--min-width:  calc(var(--icon--size-xs) * 1.5);
  --badge--height:     var(--icon--size-2xs);
}

.feedback--sm.badge {
  --badge--font-size:  var(--fsf--sm);
  --badge--padding-y:  calc(var(--space-in--sm) / 2.5);
  --badge--padding-x:  calc(var(--space-in--sm) / 1.5);
  --badge--min-width:   calc(var(--icon--size-sm) * 1.5);
  --badge--height:     var(--icon--size-xs);
}

.feedback--md.badge {
  --badge--font-size:  var(--fsf--md);
  --badge--padding-y:  calc(var(--space-in--md) / 2.5);
  --badge--padding-x:  calc(var(--space-in--md) / 1.5);
  --badge--min-width:  calc(var(--icon--size-md) * 1.75);
  --badge--height:     var(--icon--size-sm);
}

.feedback--lg.badge {
  --badge--font-size:  var(--fsf--lg);
  --badge--padding-y:  calc(var(--space-in--lg) / 2.5);
  --badge--padding-x:  calc(var(--space-in--lg) / 1.25);
  --badge--min-width:  calc(var(--icon--size-lg) * 1.5);
  --badge--height:     var(--icon--size-md);
}

.feedback--xl.badge {
  --badge--font-size:  var(--fsf--lg);
  --badge--padding-y:  calc(var(--space-in--xl) / 2.5);
  --badge--padding-x:  calc(var(--space-in--xl) / 1.25);
  --badge--min-width:  calc(var(--icon--size-xl) * 1.5);
  --badge--height:     calc(var(--icon--size-lg) / 1.25);
}

/* ─── Dot mode ───────────────────────────────────────────────────────────── */



.badge--dot {
  padding:    0;
  min-width:  var(--badge--dot-size);
  min-height: var(--badge--dot-size);
  width:      var(--badge--dot-size);
  height:     var(--badge--dot-size);
}

/* Size map for dot mode */
.feedback--xs.badge--dot { --badge--dot-size: calc(var(--icon--size-xs) / 2); }
.feedback--sm.badge--dot { --badge--dot-size: calc(var(--icon--size-sm) / 1.5); }
.feedback--md.badge--dot { --badge--dot-size: var(--icon--size-md);  }
.feedback--lg.badge--dot { --badge--dot-size: var(--icon--size-lg); }
.feedback--xl.badge--dot { --badge--dot-size: var(--icon--size-xl); }
!!!

---

## banner.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/banner.css`


!!!css
/* design/feedback/components/banner/banner.css */

/**
 * Banner component — full-width page/section announcement strip.
 *
 * Imports feedback.css for variant + color channel rules.
 * Overrides inline-flex pill layout with a full-width row.
 *
 * Layout regions:
 *   .banner__content  — main message text (default slot)
 *   .banner__actions  — optional CTA links/buttons (named slot)
 *   .banner__dismiss  — dismiss button (only when banner--dismissible)
 */

/* ─── Layout override ─────────────────────────────────────────────────────── */

.banner {
  display:         flex;
  align-items:     center;
  justify-content: center;
  gap:             var(--space-in--sm);
  padding-block:   var(--space-in--sm);
  padding-inline:  var(--space-in--md);
  white-space:     normal;
  width:           100%;
  font-size:       var(--fsf--sm);
  line-height:     var(--leading--normal);
  text-align:      center;
}

/* ─── Content ─────────────────────────────────────────────────────────────── */

.banner__content {
  flex: 1;
  min-width: 0;
}

/* Fix for MDX wrapping text nodes in <p> tags, which adds unwanted vertical margins */
.banner__content > p {
  margin: 0;
  display: inline;
}

/* ─── Actions slot ────────────────────────────────────────────────────────── */

.banner__actions {
  display:    flex;
  gap:        var(--space-in--xs);
  flex-shrink: 0;
}

/* ─── Sticky ──────────────────────────────────────────────────────────────── */

.banner--sticky {
  position: sticky;
  top:      0;
  z-index:  var(--z--sticky, 100);
}

/* ─── Dismiss button ──────────────────────────────────────────────────────── */

.banner__dismiss {
  flex-shrink:     0;
  margin-left:     var(--space-in--xs);
  padding:         var(--space-in--2xs);
  border:          none;
  background:      transparent;
  cursor:          pointer;
  color:           var(--feedback--color-text);
  border-radius:   var(--radius--sm);
  display:         none;
  align-items:     center;
  justify-content: center;
  opacity:         0.7;
  transition:      opacity 150ms ease, background-color 150ms ease;
}

.banner--dismissible .banner__dismiss {
  display: flex;
}

.banner__dismiss:hover {
  opacity:          1;
  background-color: var(--feedback--color-muted);
}

.banner__dismiss:focus-visible {
  outline:        2px solid var(--feedback--color-border);
  outline-offset: 1px;
  opacity:        1;
}

@media (prefers-reduced-motion: reduce) {
  .banner__dismiss {
    transition: none;
  }
}

!!!

---

## box.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/box.css`


!!!css
/* ============================================================
   box.css
   ─────────────────────────────────────────────────────────────
   Visual styles specifically for the Box component.
   
   The Box component combines the `.layout` class with `.box`.
   The .layout class manages all spacing (margins, padding) through
   cascading CSS variables. This file focuses only on the visual
   shell of the container (background, radius, etc.).
   ============================================================ */

.box {
  /* Box specific dimension: border-radius */
  border-radius: var(--box--radius);
  
  /* Layout can pass down a background property */
  background: var(--bg--subtle, transparent);
  
  /* Flexbox fallback context if gap/align/justify are used.
     Ideally layout.css handles layout mechanisms, but setting flex
     safely enables those alignment properties when present. */
  display: flex;
  flex-direction: column; /* Common default for standard stacking boxes */
  gap: var(--layout--gap);
  align-items: var(--layout--align);
  justify-content: var(--layout--justify);
}

/* If a box explicitly wants to be inline-flex or grid, that might require
   modifiers, but flex-column handles 90% of basic block stacking. */

!!!

---

## breadcrumbs.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/breadcrumbs.css`


!!!css
.breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
}

.breadcrumbs__separator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text--muted);
  user-select: none;
}

.breadcrumbs__separator svg {
  width: inherit;
  height: inherit;
}

!!!

---

## button-group.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/button-group.css`


!!!css

!!!

---

## button.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/button.css`


!!!css
/* ============================================================
   button.css
   ─────────────────────────────────────────────────────────────
   Spatial styles for the Button component.
   Visual styles (color, variant, focus, states) come from
   triggers.css via the .trigger class.

   Reads --button--* channels written by resolveButtonSize.
   ============================================================ */


.button,
[data-visual="button"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--button--p) * 0.75);
  padding-block:  var(--button--p);
  padding-inline: var(--button--pi);
  min-height:     var(--button--h);
  font-size:      var(--button--fs);
  font-weight:    var(--weight--medium);
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  user-select: none;
}

/* ─── MODIFIERS ───────────────────────────────────────────── */

.button--icon-only {
  padding-inline: var(--button--p);
  aspect-ratio: 1;
}

.button--full-width {
  width: 100%;
  justify-content: center;
}

/* ─── REDUCED MOTION ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
  .button:active {
    transform: none;
  }
}

.button.trigger--solid {
  border: 1px solid var(--border--default);
}

.button.trigger--primary {
  border: 2px solid var(--border--strong);
}

.button.trigger--solid:hover:not([data-disabled]):not([data-loading]) {
  border-color: var(--border--strong);
}

.trigger--solid:active:not([data-disabled]):not([data-loading]) {
  
}
!!!

---

## caption.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/caption.css`


!!!css
/**
 * Styles for the Caption component.
 *
 * The base `.caption` rule sets defaults for a standard, readable caption
 * placed below media. It uses `--label--*` tokens for a fixed, UI-like
 * text size, which is appropriate for captions.
 *
 * The credit and label sub-elements are styled directly, as their
 * appearance is not prop-driven.
 */

.caption {
  --typography--size: var(--label--lg); /* default: 14.4px fixed */
  --typography--color: var(--text--muted);
  --typography--leading: var(--leading--snug);
  max-inline-size: 60ch;
}

.caption__label {
  font-weight: var(--weight--semibold);
  color: var(--text--primary);
  margin-inline-end: 0.5em;
}

.caption__credit {
  display: block;
  font-size: var(--label--sm); /* 11.2px fixed */
  margin-block-start: var(--space-out--2xs);
}

/* ─── VARIANTS ─────────────────────────────────────────────────────────────── */

/**
 * Overlay variant.
 * Positions the caption at the bottom of its positioned parent, with a
 * gradient scrim for legibility over media.
 */
.caption--overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: var(--space-in--lg) var(--space-in--md) var(--space-in--sm);
  background: linear-gradient(to top, var(--overlay--scrim), transparent);
  color: white;
  max-inline-size: none; /* Overlays should span the full width */
}

.caption--overlay .caption__label {
  color: white;
}

.caption--overlay .caption__credit {
  color: white;
  opacity: 0.8;
}

/**
 * Rule variant.
 * Adds a decorative left border for an editorial feel.
 */
.caption--rule {
  border-inline-start: var(--border--medium) solid var(--border--strong);
  padding-inline-start: var(--space-in--sm);
}
!!!

---

## card.css


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/card.css`


!!!css
/* ============================================================
   card.css
   ─────────────────────────────────────────────────────────────
   Card-specific styles. Visual chrome from surface.css.

   MODIFIER CLASSES
   ──────────────────────────────────────────────────────────────
   .card--interactive   Hover lift + cursor pointer
   .card--selectable    Toggle affordance; combines with aria-pressed
   .card--selected      Pressed/active state
   .card--disabled      Prevents interaction; dims the card

   SLOTS
   ──────────────────────────────────────────────────────────────
   .card__media         Leading image/video region; no padding
   .card__body          Main content; inherits surface padding
   .card__footer        Trailing actions/metadata
   ============================================================ */

/* ─── BASE ───────────────────────────────────────────────────── */

.card {
  display: flex;
  flex-direction: column;
}

/* ─── SLOT REGIONS ───────────────────────────────────────────── */

.card__media {
  overflow:      hidden;
  border-radius: var(--surface--radius, var(--radius--md)) var(--surface--radius, var(--radius--md)) 0 0;
  flex-shrink:   0;
}

.card__media img,
.card__media video {
  display: block;
  width:   100%;
  height:  100%;
  object-fit: cover;
}

.card__body {
  flex: 1;
  padding: var(--surface--padding, var(--space-in--md));
}

.card__footer {
  padding: var(--surface--padding, var(--space-in--md));
  padding-top: 0;
  border-top: 1px solid var(--bg--border, var(--border--subtle));
}

/* ─── INTERACTIVE ────────────────────────────────────────────── */

.card--interactive {
  cursor: pointer;
  transition: transform 80ms ease, box-shadow 80ms ease;
  text-decoration: none;
  color: inherit;
}

.card--interactive:hover:not(.card--disabled) {
  transform:  translateY(-2px);
  box-shadow: var(--shadow--md);
}

.card--interactive:active:not(.card--disabled) {
  transform:  translateY(0);
  box-shadow: none;
}

/* ─── SELECTABLE ─────────────────────────────────────────────── */

.card--selected {
  border-color: var(--bg--border, var(--border--strong));
  background-color: var(--bg--subtle, transparent);
}

/* ─── DISABLED ───────────────────────────────────────────────── */

.card--disabled {
  opacity:        0.5;
  cursor:         not-allowed;
  pointer-events: none;
}

/* ─── REDUCED MOTION ─────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .card--interactive {
    transition: none;
  }
  .card--interactive:hover:not(.card--disabled) {
    transform: none;
  }
}

!!!

---

## carousel.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/carousel.css`


!!!css

!!!

---

## center.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/center.css`


!!!css
.center {
  display: flex;
}

.center--x {
  justify-content: center;
}

.center--y {
  align-items: center;
}

.center--both {
  justify-content: center;
  align-items: center;
}

!!!

---

## checkbox.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/checkbox.css`


!!!css
/* ============================================================
   checkbox.css
   ─────────────────────────────────────────────────────────────
   Checkbox-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <label class="form checkbox checkbox--end …">  ← wrapper (<label>)
       <input class="checkbox__control" />            ← hidden native input
       <span class="checkbox__indicator" />           ← custom visual square
       <span class="checkbox__label">…</span>         ← label slot content
     </label>

   INDICATOR STATE MACHINE
   ──────────────────────────────────────────────────────────────
   State is driven by native CSS pseudo-classes on .checkbox__control
   via the general sibling combinator (~). This requires the control
   to precede the indicator in the DOM — that order never changes
   regardless of the labelPosition modifier class.

   States:
     default      →  bordered square, transparent fill
     :hover       →  border shifts to role color
     :checked     →  filled with role color, white checkmark
     :indeterminate → filled with role color, white dash
     :focus-visible → role-colored glow ring on indicator
     :disabled    →  handled by forms.css on wrapper [data-disabled]

   LABEL POSITION
   ──────────────────────────────────────────────────────────────
   DOM order is always: hidden input → indicator → label.
   CSS reorders visually via flex-direction / order.
   This keeps the ~ sibling combinator functional for all states.

   SIZING
   ──────────────────────────────────────────────────────────────
   The indicator square is proportional to --form--size (≈ 0.45×).
   The checkmark is drawn with a CSS border-based pseudo-element.
   ============================================================ */

/* ─── WRAPPER ─────────────────────────────────────────────── */

.checkbox {
  /* Natural height — not a min-block-size field like Input/Select */
  min-block-size: unset;

  /* Tighter padding than form inputs — just enough for click-area */
  padding: calc(var(--form--size, 2.5rem) * 0.15);
  gap:     calc(var(--form--size, 2.5rem) * 0.3);

  /* Inline by default (indicator + label side by side) */
  flex-direction: row;
  align-items: center;

  /* Full label area is clickable */
  cursor:      pointer;
  user-select: none;
}

/* ─── HIDDEN NATIVE INPUT ─────────────────────────────────── */
/* Visually hidden but accessible — still part of the tab order
   and triggers native :checked / :focus-visible / :indeterminate */

.checkbox__control {
  position:       absolute;
  opacity:        0;
  width:          0;
  height:         0;
  pointer-events: none;
  margin:         0;
}

/* ─── CUSTOM INDICATOR ────────────────────────────────────── */

.checkbox__indicator {
  flex-shrink: 0;

  /* Proportional to the form size tier */
  width:  calc(var(--form--size, 2.5rem) * 0.45);
  height: calc(var(--form--size, 2.5rem) * 0.45);

  display:         grid;
  place-items:     center;

  border:        2px solid var(--border--strong, var(--border--default));
  border-radius: var(--form--radius, var(--radius--sm));
  background:    transparent;

  transition:
    background-color var(--transition--fast, 150ms ease),
    border-color     var(--transition--fast, 150ms ease);
}

/* Checkmark drawn as a rotated L-shape border */
.checkbox__indicator::after {
  content: "";
  display: block;

  /* Proportions give a clean tick at all sizes */
  width:  30%;
  height: 55%;

  border:       2px solid transparent;
  border-top:   none;
  border-left:  none;
  transform:    rotate(45deg) translateY(-10%);

  opacity:    0;
  transition: opacity var(--transition--fast, 150ms ease);
}

/* ─── HOVER (unchecked) ───────────────────────────────────── */

.checkbox:hover:not([data-disabled]) .checkbox__indicator {
  border-color: var(--form--color-border, var(--primary--border));
}

/* ─── CHECKED ─────────────────────────────────────────────── */

.checkbox__control:checked ~ .checkbox__indicator {
  background-color: var(--form--color-base, var(--primary--base));
  border-color:     var(--form--color-base, var(--primary--base));
}

.checkbox__control:checked ~ .checkbox__indicator::after {
  border-color: var(--text--on-color, #fff);
  opacity:      1;
}

/* ─── INDETERMINATE ───────────────────────────────────────── */
/* Same fill as checked; the dash replaces the checkmark shape */

.checkbox__control:indeterminate ~ .checkbox__indicator {
  background-color: var(--form--color-base, var(--primary--base));
  border-color:     var(--form--color-base, var(--primary--base));
}

/* Override checkmark with a horizontal dash */
.checkbox__control:indeterminate ~ .checkbox__indicator::after {
  width:        55%;
  height:       2px;
  border:       none;
  background:   var(--text--on-color, #fff);
  transform:    none;
  opacity:      1;
}

/* ─── FOCUS ───────────────────────────────────────────────── */
/* Focus ring on the indicator (not the wrapper) — matches the
   convention of focused form controls showing the glow on the
   actual interactive element */

.checkbox__control:focus-visible ~ .checkbox__indicator {
  outline: none;
  box-shadow: 0 0 0 3px
    color-mix(in oklch, var(--form--color-base, var(--primary--base)) 30%, transparent);
}

/* ─── LABEL TEXT ─────────────────────────────────────────── */

.checkbox__label {
  font-size:   calc(var(--form--size, 2.5rem) * 0.35);
  line-height: 1.4;
  color:       inherit;
}

/* ─── LABEL POSITION MODIFIERS ───────────────────────────── */
/* DOM order never changes. CSS reorders visually only. */

/* end (default) — [■] Label */
.checkbox--end {
  flex-direction: row;
}

/* start — Label [■] */
.checkbox--start {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

/* top — Label above indicator */
.checkbox--top {
  flex-direction: column-reverse;
  align-items: center;
}

/* bottom — indicator above label */
.checkbox--bottom {
  flex-direction: column;
  align-items: center;
}

/* ─── INVALID STATE ───────────────────────────────────────── */
/* Danger border on the indicator (supplements wrapper border from forms.css) */

.checkbox[data-invalid] .checkbox__indicator {
  border-color: var(--danger--border);
}

/* ─── DISABLED STATE ──────────────────────────────────────── */
/* forms.css handles opacity + pointer-events on [data-disabled].
   Cursor is specific to checkbox (pointer → default). */

.checkbox[data-disabled] {
  cursor: default;
}

/* ─── REDUCED MOTION ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .checkbox__indicator,
  .checkbox__indicator::after {
    transition: none;
  }
}
!!!

---

## chip.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/chip.css`


!!!css
/* ============================================================
   chip.css
   ─────────────────────────────────────────────────────────────
   Visual styles for the Chip component.
   
   Inherits `--feedback--color-*` and `--feedback--radius` from
   the `useFeedback` hook base classes (`.feedback--[variant]`).
   ============================================================ */

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: var(--feedback--radius);
  font-family: var(--family--sans);
  font-weight: var(--weight--medium);
  line-height: var(--leading--none);
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--transition--fast) background-color, var(--transition--fast) border-color;
  background-color: transparent;
  color: inherit; /* Rely on feedback variants to set correct color */
  outline: none;
}

/* Reset default button appearance */
button.chip {
  appearance: none;
  border-width: 1px; /* Let variants override */
}

.chip:hover {
  /* Slightly darken or lighten based on variant by adjusting opacity or using a different token.
     Here we just add a small brightness filter or rely on the variant's border-color if outlined. */
  filter: brightness(0.95);
}

.chip:active {
  filter: brightness(0.9);
}

.chip:focus-visible {
  box-shadow: 0 0 0 2px var(--bg--1), 0 0 0 4px var(--feedback--color-border);
}

/* ─── SIZE MAPPING ────────────────────────────────────────── */

/* XS: micro chip */
.feedback--xs.chip {
  font-size: var(--label--xs);
  padding: var(--space-in--3xs) var(--space-in--2xs);
  min-block-size: var(--ui-height--2xs);
  gap: var(--space-in--3xs);
}

/* SM: small chip */
.feedback--sm.chip {
  font-size: var(--label--sm);
  padding: var(--space-in--2xs) var(--space-in--xs);
  min-block-size: var(--ui-height--xs);
  gap: var(--space-in--3xs);
}

/* MD (default): standard chip */
.feedback--md.chip {
  font-size: var(--label--md);
  padding: var(--space-in--xs) var(--space-in--sm);
  min-block-size: var(--ui-height--sm);
  gap: var(--space-in--2xs);
}

/* LG: large chip */
.feedback--lg.chip {
  font-size: var(--label--lg);
  padding: var(--space-in--sm) var(--space-in--md);
  min-block-size: var(--ui-height--md);
  gap: var(--space-in--xs);
}

/* XL: hero chip */
.feedback--xl.chip {
  font-size: var(--label--xl);
  padding: var(--space-in--md) var(--space-in--lg);
  min-block-size: var(--ui-height--lg);
  gap: var(--space-in--sm);
}

!!!

---

## code.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/code.css`


!!!css
/* design/typography/components/code/code.css */
.code,
.pre {
  font-size: var(--fs--lg);
  font-family: var(--mono);
  --typography--tracking: var(--tracking--wider);
}
.pre {
  background: var(--bg--4); /* Dark theme by default for code blocks */
  color: var(--text--inverse);
  padding: var(--space-in--lg);
  /* padding-block-start: var(--space-in--3xl); */
  /* padding-inline-end: var(--space-in--xl); */
  border-radius: var(--radius--xs);
  overflow-x: auto;
  margin-bottom: var(--space-out--md);
  /* line-height: var(--leading--snug); */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.code.code--inline {
  white-space:   nowrap;
  text-wrap:     nowrap;
  background:    var(--bg--4);
  color:         var(--warning--text);
  padding:       var(--space-in--3xs) var(--space-in--md);
  font-size:     var(--fs--sm);
  border-radius: var(--radius--xs);
  border:        1px solid var(--border--subtle);
  font-weight:   var(--weight--medium);
}

/* ─── Copy button (injected by mountCopyButtons) ──────── */

.pre-wrapper {
  position: relative;
}

.pre-copy-btn {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  padding: var(--space-in--2xs) var(--space-in--sm);
  font-size: var(--fs--xs);
  font-family: var(--family--sans);
  font-weight: var(--weight--medium);
  color: var(--text--tertiary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius--sm);
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  /* line-height: 1; */
}

.pre-copy-btn:hover {
  color: var(--text--primary);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
}

.pre-copy-btn[data-copied] {
  color: var(--success--text);
}

/* ─── If code is inside a pre block, reset the inline styles ── */
.pre > .code--inline,
.code--block {
  white-space: pre-wrap;
  word-break: break-word;
  background: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
  border: none;
  font-weight: inherit;
}


!!!

---

## color-picker.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/color-picker.css`


!!!css

!!!

---

## columns.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/columns.css`


!!!css

!!!

---

## combobox.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/combobox.css`


!!!css
/* ============================================================
   combobox.css
   ─────────────────────────────────────────────────────────────
   Combobox-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <div class="form combobox …" data-combobox>
       <input class="combobox__control" role="combobox" />  ← text input
       <input type="hidden" … />                             ← submission value
       <div class="combobox__arrow">▾</div>                  ← dropdown indicator
       <ul class="combobox__listbox" role="listbox" hidden>  ← custom dropdown
         <li class="combobox__option" role="option">…</li>
       </ul>
     </div>

   POSITIONING
   ──────────────────────────────────────────────────────────────
   The listbox is absolutely positioned below the wrapper.
   The wrapper needs position: relative (added via .combobox below).
   z-index: --z--dropdown ensures the listbox floats above other content.

   OPTION STATES
   ──────────────────────────────────────────────────────────────
   .combobox__option--active → keyboard-highlighted option (JS-managed)
   [aria-selected="true"]    → currently selected option
   [aria-disabled="true"]    → disabled option (not selectable)
   [hidden]                  → filtered out (JS toggles per option)
   ============================================================ */

/* ─── WRAPPER ─────────────────────────────────────────────── */

.combobox {
  position: relative; /* Anchors the absolutely-positioned listbox */
  cursor:   text;
}

/* ─── VISIBLE TEXT CONTROL ─────────────────────────────────── */

.combobox__control {
  flex: 1;
  min-inline-size: 0;

  background:  transparent;
  border:      none;
  outline:     none;
  color:       inherit;
  font-size:   inherit;
  font-family: inherit;
  line-height: inherit;
  padding:     0;
  margin:      0;

  appearance:         none;
  -webkit-appearance: none;
}

.combobox__control::placeholder {
  color:   var(--text--tertiary, var(--text--secondary));
  opacity: 1;
}

.combobox__control:focus,
.combobox__control:focus-visible {
  outline: none;
  box-shadow: none;
}

/* Suppress Chrome autofill background and text color changes */
.combobox__control:-webkit-autofill,
.combobox__control:-webkit-autofill:hover,
.combobox__control:-webkit-autofill:focus,
.combobox__control:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: var(--text--primary);
}

/* ─── DROPDOWN ARROW ───────────────────────────────────────── */

.combobox__arrow {
  display:        flex;
  align-items:    center;
  flex-shrink:    0;
  color:          var(--text--secondary);
  pointer-events: none;

  transition: transform var(--transition--fast, 150ms ease),
              color     var(--transition--fast, 150ms ease);
}

/* Arrow rotates when listbox is open */
.combobox[aria-expanded="true"] .combobox__arrow,
.combobox:has(.combobox__listbox:not([hidden])) .combobox__arrow {
  transform: rotate(180deg);
  color:     var(--form--color-text, var(--primary--text));
}

/* ─── LISTBOX DROPDOWN ─────────────────────────────────────── */

.combobox__listbox {
  position:   absolute;
  inset-inline: 0;
  top:        calc(100% + 4px);
  z-index:    var(--z--dropdown, 200);

  max-block-size: 18rem;
  overflow-y:     auto;
  overscroll-behavior: contain;

  /* Visual: same layer as popover/dropdown (Layer 4) */
  background-color: var(--bg--4, #fff);
  border:           1px solid var(--border--default);
  border-radius:    var(--form--radius, var(--radius--md));
  box-shadow:       var(--shadow--md);

  list-style: none;
  margin:     0;
  padding:    var(--space-in--xs, 0.25rem) 0;
}

/* Hidden listbox — `hidden` attribute; JS removes it on open */
.combobox__listbox[hidden] {
  display: none;
}

/* ─── OPTIONS ──────────────────────────────────────────────── */

.combobox__option {
  display:     flex;
  align-items: center;
  padding-block:  calc(var(--form--size, 2.5rem) * 0.2);
  padding-inline: calc(var(--form--size, 2.5rem) * 0.4);

  font-size:   calc(var(--form--size, 2.5rem) * 0.35);
  line-height: 1.4;
  color:       var(--text--primary);
  cursor:      pointer;

  transition: background-color var(--transition--fast, 100ms ease);
}

/* Keyboard-active option (JS adds/removes this class) */
.combobox__option--active {
  background-color: var(--form--color-subtle, var(--primary--subtle));
  color:            var(--form--color-text,   var(--primary--text));
}

/* Selected option — already chosen */
.combobox__option[aria-selected="true"] {
  background-color: var(--form--color-subtle, var(--primary--subtle));
  color:            var(--form--color-text,   var(--primary--text));
  font-weight:      500;
}

/* Selected + active — keyboard is on the already-selected item */
.combobox__option--active[aria-selected="true"] {
  background-color: var(--form--color-muted, var(--primary--muted));
}

/* Disabled option */
.combobox__option[aria-disabled="true"] {
  color:          var(--text--tertiary, var(--text--secondary));
  cursor:         not-allowed;
  pointer-events: none;
}

/* Filtered out (JS sets hidden attribute per option) */
.combobox__option[hidden] {
  display: none;
}

/* Empty state — shown when no options match the filter */
.combobox__empty {
  padding-block:  calc(var(--form--size, 2.5rem) * 0.3);
  padding-inline: calc(var(--form--size, 2.5rem) * 0.4);
  font-size:      calc(var(--form--size, 2.5rem) * 0.35);
  color:          var(--text--secondary);
  font-style:     italic;
  display:        none; /* JS shows this when all options are filtered out */
}

.combobox__empty--visible {
  display: block;
}

/* ─── REDUCED MOTION ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .combobox__arrow { transition: none; }
}

!!!

---

## command-palette.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/command-palette.css`


!!!css

!!!

---

## container.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/container.css`


!!!css
.container {
  width: 100%;
  margin-inline: auto;
  max-width: var(--container--max-width, var(--container--lg));
}

!!!

---

## context-menu.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/context-menu.css`


!!!css

!!!

---

## cropper.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/cropper.css`


!!!css

!!!

---

## alert-dialog.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/alert-dialog/alert-dialog.css`


!!!css
/* alert-dialog.css — minimal; shared chrome lives in overlays.css */

.alert-dialog__icon {
  font-size: var(--icon--size-xl, 24px);
  color: var(--feedback--color-text, currentColor);
  margin-bottom: var(--space-in--xs);
}

.alert-dialog__description {
  margin:      0;
  font-size:   var(--fsf--sm);
  color:       var(--text--secondary);
  line-height: var(--leading--md);
}

!!!

---

---

## alert.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/alert/alert.css`


!!!css
/* design/feedback/components/alert/alert.css */

/**
 * Alert component — block-level status message box.
 *
 * Imports feedback.css for variant + color channel rules.
 * Overrides the inline-flex pill layout with a block stack.
 *
 * Layout regions:
 *   .alert__icon    — optional leading icon slot
 *   .alert__body    — stacked title + description content
 *   .alert__title   — optional heading above the description
 *   .alert__actions — optional trailing actions (links, buttons)
 *   .alert__dismiss — dismiss button (only when alert--dismissible)
 */

/* ─── Layout override ─────────────────────────────────────────────────────── */

.alert {
  display:        flex;
  align-items:    flex-start;
  gap:            var(--alert--gap, var(--space-in--sm));
  padding:              var(--alert--p, var(--alert--padding));
  padding-inline:       var(--alert--px, var(--alert--p, var(--alert--padding)));
  padding-block:        var(--alert--py, var(--alert--p, var(--alert--padding)));
  padding-block-start:  var(--alert--pt, var(--alert--py, var(--alert--p, var(--alert--padding))));
  padding-block-end:    var(--alert--pb, var(--alert--py, var(--alert--p, var(--alert--padding))));
  padding-inline-start: var(--alert--pl, var(--alert--px, var(--alert--p, var(--alert--padding))));
  padding-inline-end:   var(--alert--pr, var(--alert--px, var(--alert--p, var(--alert--padding))));
  white-space:    normal;
  width:          100%;
  line-height:    var(--leading--normal);
  font-size:      var(--alert--font-size);
}



/* ─── Icon slot ───────────────────────────────────────────────────────────── */

.alert__icon {
  flex-shrink: 0;
  width:       1.25em;
  height:      1.25em;
  margin-top:  0.125em; /* optical alignment with first line of text */
  color:       var(--feedback--color-text);
}

/* ─── Body ────────────────────────────────────────────────────────────────── */

.alert__body {
  flex:    1;
  display: flex;
  flex-direction: column;
  gap:     var(--space-in--2xs);
}

.alert__body > * {
  margin: 0;
}

.alert__title {
  font-weight: var(--weight--semibold);
  font-size:   var(--fsf--sm);
  color:       var(--feedback--color-text);
}

/* ─── Actions slot ────────────────────────────────────────────────────────── */

.alert__body > .alert__actions {
  display:   flex;
  gap:       var(--space-in--sm);
  flex-wrap: wrap;
  margin-top: var(--space-in--xs);
}

/* ─── Dismiss button ──────────────────────────────────────────────────────── */

.alert__dismiss {
  flex-shrink:  0;
  margin-top:   0;
  margin-left:  auto;
  padding:      var(--space-in--2xs);
  border:       none;
  background:   transparent;
  cursor:       pointer;
  color:        var(--feedback--color-text);
  border-radius: var(--radius--sm);
  display:      none;
  align-items:  center;
  justify-content: center;
  opacity:      0.7;
  transition:   opacity 150ms ease, background-color 150ms ease;
}

.alert--dismissible .alert__dismiss {
  display: flex;
}

.alert__dismiss:hover {
  opacity: 1;
  background-color: var(--feedback--color-muted);
}

.alert__dismiss:focus-visible {
  outline:        2px solid var(--feedback--color-border);
  outline-offset: 1px;
  opacity:        1;
}


!!!

---

---

## audio.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/audio/audio.css`


!!!css
/* audio.css — custom audio player */

/*
 * CSS channels written by useAudio:
 *   --audio--radius              border-radius
 *   --audio--color-subtle        bg for soft variant
 *   --audio--color-muted         hover bg for soft
 *   --audio--color-base          play button fill; solid variant bg
 *   --audio--color-vivid         play button hover
 *   --audio--color-deep          play button active
 *   --audio--color-border        border for outlined/soft variants
 *   --audio--color-text          text on non-solid backgrounds
 */

.audio {
  display:          flex;
  flex-direction:   column;
  gap:              var(--space-in--xs);
  border-radius:    var(--audio--radius, var(--radius--md));
  padding:          var(--audio--padding, var(--space-in--sm));
  color:            var(--text--primary);
  font-size:        var(--fsf--sm);
  width:            100%;
  border:           1px solid transparent;
  transition:       background-color 150ms ease, border-color 150ms ease;
}

/* ── variant: chrome treatment ───────────────────────────── */

.audio--soft {
  background-color: var(--audio--color-subtle);
  border-color:     var(--audio--color-border);
}

.audio--outlined {
  background-color: transparent;
  border-color:     var(--audio--color-border);
}

.audio--solid {
  background-color: var(--audio--color-base);
  border-color:     var(--audio--color-base);
  color:            var(--text--on-color);
}

/* play button inverts on solid — container is already the accent color */
.audio--solid .audio__play-btn {
  background: rgba(0, 0, 0, 0.2);
}
.audio--solid .audio__play-btn:hover  { background: rgba(0, 0, 0, 0.3); }
.audio--solid .audio__play-btn:active { background: rgba(0, 0, 0, 0.4); }

.audio--ghost {
  background-color: transparent;
  border-color:     transparent;
}

/* ── size scale vars (read by sub-elements below) ────────── */

.audio {
  --audio--btn-size:    2.25rem;
  --audio--thumb-size:  14px;
  --audio--track-h:     4px;
  --audio--vol-w:       72px;
}

/* ── size modifiers ──────────────────────────────────────── */

.audio--sm {
  font-size:            var(--fsf--xs);
  gap:                  var(--space-in--2xs);
  padding:              var(--space-in--xs);
  --audio--btn-size:    1.75rem;
  --audio--thumb-size:  10px;
  --audio--track-h:     3px;
  --audio--vol-w:       56px;
}

.audio--sm .audio__controls { gap: var(--space-in--2xs); }

.audio--lg {
  font-size:            var(--fsf--md);
  gap:                  var(--space-in--sm);
  padding:              var(--space-in--md);
  --audio--btn-size:    2.75rem;
  --audio--thumb-size:  18px;
  --audio--track-h:     5px;
  --audio--vol-w:       96px;
}

/* ── layout: compact — single row ───────────────────────── */

.audio--layout-compact {
  flex-direction: row;
  align-items:    center;
}

.audio--layout-compact .audio__seek-row,
.audio--layout-compact .audio__time {
  flex: 1;
}

/* ── layout: minimal — hide secondary row ────────────────── */

.audio--layout-minimal .audio__secondary {
  display: none;
}

/* ── top row: controls + time ────────────────────────────── */

.audio__controls {
  display:     flex;
  align-items: center;
  gap:         var(--space-in--xs);
}

.audio__play-btn {
  display:         flex;
  align-items:     center;
  justify-content: center;
  width:           var(--audio--btn-size);
  height:          var(--audio--btn-size);
  border-radius:   50%;
  border:          none;
  background:      var(--audio--color-base);
  color:           var(--text--on-color);
  cursor:          pointer;
  flex-shrink:     0;
  transition:      background 0.15s;
}

.audio__play-btn:hover  { background: var(--audio--color-vivid); }
.audio__play-btn:active { background: var(--audio--color-deep);  }

.audio__play-btn .icon {
  display:        flex;
  align-items:    center;
  pointer-events: none;
}

.audio__time {
  margin-left:  auto;
  white-space:  nowrap;
  color:        var(--text--muted);
  font-variant-numeric: tabular-nums;
}

/* ── seek bar ────────────────────────────────────────────── */

.audio__seek-row {
  display: flex;
  align-items: center;
  gap: var(--space-in--xs);
}

.audio__seek {
  flex:              1;
  -webkit-appearance: none;
  appearance:        none;
  height:            var(--audio--track-h);
  border-radius:     var(--radius--full);
  background:        var(--border--subtle);
  cursor:            pointer;
  outline:           none;
}

.audio__seek::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance:         none;
  width:              var(--audio--thumb-size);
  height:             var(--audio--thumb-size);
  border-radius:      50%;
  background:         var(--audio--color-base);
  cursor:             pointer;
  transition:         transform 0.1s;
}

.audio__seek::-webkit-slider-thumb:hover {
  transform: scale(1.25);
}

.audio__seek::-moz-range-thumb {
  width:        var(--audio--thumb-size);
  height:       var(--audio--thumb-size);
  border-radius: 50%;
  background:   var(--primary--base);
  border:       none;
  cursor:       pointer;
}

/* progress fill via inline linear-gradient set by JS */

/* ── bottom row: volume + rate ───────────────────────────── */

.audio__secondary {
  display:     flex;
  align-items: center;
  gap:         var(--space-in--sm);
  flex-wrap:   wrap;
}

.audio__volume,
.audio__rate {
  display:     flex;
  align-items: center;
  gap:         var(--space-in--2xs);
  color:       var(--text--muted);
}

.audio__volume-slider,
.audio__rate-select {
  -webkit-appearance: none;
  appearance:         none;
  cursor:             pointer;
  background:         var(--border--subtle);
  border-radius:      var(--radius--full);
}

.audio__volume-slider {
  width:  var(--audio--vol-w);
  height: var(--audio--track-h);
}

.audio__volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance:         none;
  width:              var(--audio--thumb-size);
  height:             var(--audio--thumb-size);
  border-radius:      50%;
  background:         var(--audio--color-base);
  cursor:             pointer;
}

.audio__volume-slider::-moz-range-thumb {
  width:         var(--audio--thumb-size);
  height:        var(--audio--thumb-size);
  border-radius: 50%;
  background:    var(--primary--base);
  border:        none;
  cursor:        pointer;
}

.audio__rate-select {
  background:  var(--bg--3);
  border:      1px solid var(--border--subtle);
  border-radius: var(--radius--sm);
  color:       var(--text--primary);
  font-size:   var(--fsf--xs);
  padding:     0.1rem 0.25rem;
}

/* ── intercom badge ──────────────────────────────────────── */

.audio__intercom-badge {
  font-size:    var(--fsf--xs);
  color:        var(--warning--text);
  background:   var(--warning--subtle);
  border:       1px solid var(--warning--border);
  border-radius: var(--radius--full);
  padding:      0.1rem 0.5rem;
  margin-left:  auto;
}

/* ── redact indicator ────────────────────────────────────── */

.audio__seek-row[data-redact] .audio__seek {
  /* JS overlays the fill; just ensure no browser-default fill fights it */
  background: transparent;
}

!!!

---

---

## avatar-group.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar-group/avatar-group.css`


!!!css

!!!

---

---

## avatar.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/avatar/avatar.css`


!!!css
.avatar {
  position: relative;
  display:  inline-flex;
  align-items: center;
  justify-content: center;
  width:  var(--avatar--size);
  height: var(--avatar--size);
  border-radius: var(--avatar--radius);
  overflow: hidden;
  background-color: var(--bg--3);
  color: var(--text--secondary);
  font-size: calc(var(--avatar--size) * 0.38);
  font-weight: var(--weight--medium, 500);
  letter-spacing: 0.02em;
  user-select: none;
  flex-shrink: 0;
}

/* ── Image mode ──────────────────────────────────────────────────── */

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* ── Icon fallback ───────────────────────────────────────────────── */

.avatar--icon svg {
  width: 55%;
  height: 55%;
  opacity: 0.5;
}

/* ── Status dot ──────────────────────────────────────────────────── */

.avatar--has-status::after {
  content: "";
  position: absolute;
  bottom: 6%;
  right: 6%;
  width:  calc(var(--avatar--size) * 0.265);
  height: calc(var(--avatar--size) * 0.265);
  border-radius: var(--radius--full);
  border: 2px solid var(--bg--1);
  background-color: var(--border--default);
}

.avatar--online::after  { background-color: var(--success--base); }
.avatar--offline::after { background-color: var(--border--default); }
.avatar--away::after    { background-color: var(--warning--base); }
.avatar--busy::after    { background-color: var(--danger--base); }

!!!

---

---

## backdrop.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/backdrop/backdrop.css`


!!!css

!!!

---

---

## badge.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/badge/badge.css`


!!!css
/* design/feedback/badge/badge.css */

/**
 * Badge component styles.
 *
 * This file handles the badge-specific size map and dot mode.
 * Variant, color, and placement styles all live in feedback.css.
 *
 * Size map (modifier classes written by useBadge via useFeedback):
 *   .feedback--xs  → compact (dot-friendly)
 *   .feedback--sm  → standard count badge (default)
 *   .feedback--md  → larger count / label badge
 *   .feedback--lg  → prominent label badge
 *   .feedback--xl  → large display badge
 *
 * Token channels written by badge-specific size rules:
 *   --badge--font-size   → font-size of the badge text
 *   --badge--padding-x   → inline padding
 *   --badge--padding-y   → block padding
 *   --badge--min-width   → minimum width (keeps count badges circular at low nums)
 *   --badge--height      → min-height / line-height anchor
 */

/* ─── Base Badge layout ──────────────────────────────────────────────────── */

.badge {
  display:        inline-flex;
  align-items:    center;
  justify-content: center;
  gap:            0.25em;
  font-size:      var(--badge--font-size);
  font-weight:    var(--weight--semibold);
  padding-block:  var(--badge--padding-y);
  padding-inline: var(--badge--padding-x);
  min-width:      var(--badge--min-width);
  min-height:     var(--badge--height);
  text-align:     center;
  border:         2px solid var(--feedback--color-muted);
}

.badge--icon-only {
  padding-inline: var(--badge--padding-y);
  aspect-ratio: 1;
}

.feedback.badge {
  --feedback--radius: var(--radius--md);

}

/* ─── Size map ───────────────────────────────────────────────────────────── */

.feedback--xs.badge {
  --badge--font-size:  var(--fsf--xs);
  --badge--padding-y:  calc(var(--space-in--xs) / 2.5);
  --badge--padding-x:  calc(var(--space-in--xs) / 1.5);
  --badge--min-width:  calc(var(--icon--size-xs) * 1.5);
  --badge--height:     var(--icon--size-2xs);
}

.feedback--sm.badge {
  --badge--font-size:  var(--fsf--sm);
  --badge--padding-y:  calc(var(--space-in--sm) / 2.5);
  --badge--padding-x:  calc(var(--space-in--sm) / 1.5);
  --badge--min-width:   calc(var(--icon--size-sm) * 1.5);
  --badge--height:     var(--icon--size-xs);
}

.feedback--md.badge {
  --badge--font-size:  var(--fsf--md);
  --badge--padding-y:  calc(var(--space-in--md) / 2.5);
  --badge--padding-x:  calc(var(--space-in--md) / 1.5);
  --badge--min-width:  calc(var(--icon--size-md) * 1.75);
  --badge--height:     var(--icon--size-sm);
}

.feedback--lg.badge {
  --badge--font-size:  var(--fsf--lg);
  --badge--padding-y:  calc(var(--space-in--lg) / 2.5);
  --badge--padding-x:  calc(var(--space-in--lg) / 1.25);
  --badge--min-width:  calc(var(--icon--size-lg) * 1.5);
  --badge--height:     var(--icon--size-md);
}

.feedback--xl.badge {
  --badge--font-size:  var(--fsf--lg);
  --badge--padding-y:  calc(var(--space-in--xl) / 2.5);
  --badge--padding-x:  calc(var(--space-in--xl) / 1.25);
  --badge--min-width:  calc(var(--icon--size-xl) * 1.5);
  --badge--height:     calc(var(--icon--size-lg) / 1.25);
}

/* ─── Dot mode ───────────────────────────────────────────────────────────── */



.badge--dot {
  padding:    0;
  min-width:  var(--badge--dot-size);
  min-height: var(--badge--dot-size);
  width:      var(--badge--dot-size);
  height:     var(--badge--dot-size);
}

/* Size map for dot mode */
.feedback--xs.badge--dot { --badge--dot-size: calc(var(--icon--size-xs) / 2); }
.feedback--sm.badge--dot { --badge--dot-size: calc(var(--icon--size-sm) / 1.5); }
.feedback--md.badge--dot { --badge--dot-size: var(--icon--size-md);  }
.feedback--lg.badge--dot { --badge--dot-size: var(--icon--size-lg); }
.feedback--xl.badge--dot { --badge--dot-size: var(--icon--size-xl); }
!!!

---

---

## banner.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/banner/banner.css`


!!!css
/* design/feedback/components/banner/banner.css */

/**
 * Banner component — full-width page/section announcement strip.
 *
 * Imports feedback.css for variant + color channel rules.
 * Overrides inline-flex pill layout with a full-width row.
 *
 * Layout regions:
 *   .banner__content  — main message text (default slot)
 *   .banner__actions  — optional CTA links/buttons (named slot)
 *   .banner__dismiss  — dismiss button (only when banner--dismissible)
 */

/* ─── Layout override ─────────────────────────────────────────────────────── */

.banner {
  display:         flex;
  align-items:     center;
  justify-content: center;
  gap:             var(--space-in--sm);
  padding-block:   var(--space-in--sm);
  padding-inline:  var(--space-in--md);
  white-space:     normal;
  width:           100%;
  font-size:       var(--fsf--sm);
  line-height:     var(--leading--normal);
  text-align:      center;
}

/* ─── Content ─────────────────────────────────────────────────────────────── */

.banner__content {
  flex: 1;
  min-width: 0;
}

/* Fix for MDX wrapping text nodes in <p> tags, which adds unwanted vertical margins */
.banner__content > p {
  margin: 0;
  display: inline;
}

/* ─── Actions slot ────────────────────────────────────────────────────────── */

.banner__actions {
  display:    flex;
  gap:        var(--space-in--xs);
  flex-shrink: 0;
}

/* ─── Sticky ──────────────────────────────────────────────────────────────── */

.banner--sticky {
  position: sticky;
  top:      0;
  z-index:  var(--z--sticky, 100);
}

/* ─── Dismiss button ──────────────────────────────────────────────────────── */

.banner__dismiss {
  flex-shrink:     0;
  margin-left:     var(--space-in--xs);
  padding:         var(--space-in--2xs);
  border:          none;
  background:      transparent;
  cursor:          pointer;
  color:           var(--feedback--color-text);
  border-radius:   var(--radius--sm);
  display:         none;
  align-items:     center;
  justify-content: center;
  opacity:         0.7;
  transition:      opacity 150ms ease, background-color 150ms ease;
}

.banner--dismissible .banner__dismiss {
  display: flex;
}

.banner__dismiss:hover {
  opacity:          1;
  background-color: var(--feedback--color-muted);
}

.banner__dismiss:focus-visible {
  outline:        2px solid var(--feedback--color-border);
  outline-offset: 1px;
  opacity:        1;
}

@media (prefers-reduced-motion: reduce) {
  .banner__dismiss {
    transition: none;
  }
}

!!!

---

---

## box.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/box/box.css`


!!!css
/* ============================================================
   box.css
   ─────────────────────────────────────────────────────────────
   Visual styles specifically for the Box component.
   
   The Box component combines the `.layout` class with `.box`.
   The .layout class manages all spacing (margins, padding) through
   cascading CSS variables. This file focuses only on the visual
   shell of the container (background, radius, etc.).
   ============================================================ */

.box {
  /* Box specific dimension: border-radius */
  border-radius: var(--box--radius);
  
  /* Layout can pass down a background property */
  background: var(--bg--subtle, transparent);
  
  /* Flexbox fallback context if gap/align/justify are used.
     Ideally layout.css handles layout mechanisms, but setting flex
     safely enables those alignment properties when present. */
  display: flex;
  flex-direction: column; /* Common default for standard stacking boxes */
  gap: var(--layout--gap);
  align-items: var(--layout--align);
  justify-content: var(--layout--justify);
}

/* If a box explicitly wants to be inline-flex or grid, that might require
   modifiers, but flex-column handles 90% of basic block stacking. */

!!!

---

---

## breadcrumbs.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/breadcrumbs/breadcrumbs.css`


!!!css
.breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
}

.breadcrumbs__separator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--text--muted);
  user-select: none;
}

.breadcrumbs__separator svg {
  width: inherit;
  height: inherit;
}

!!!

---

---

## button-group.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button-group/button-group.css`


!!!css

!!!

---

---

## button.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/button/button.css`


!!!css
/* ============================================================
   button.css
   ─────────────────────────────────────────────────────────────
   Spatial styles for the Button component.
   Visual styles (color, variant, focus, states) come from
   triggers.css via the .trigger class.

   Reads --button--* channels written by resolveButtonSize.
   ============================================================ */


.button,
[data-visual="button"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--button--p) * 0.75);
  padding-block:  var(--button--p);
  padding-inline: var(--button--pi);
  min-height:     var(--button--h);
  font-size:      var(--button--fs);
  font-weight:    var(--weight--medium);
  line-height: 1;
  white-space: nowrap;
  text-decoration: none;
  user-select: none;
}

/* ─── MODIFIERS ───────────────────────────────────────────── */

.button--icon-only {
  padding-inline: var(--button--p);
  aspect-ratio: 1;
}

.button--full-width {
  width: 100%;
  justify-content: center;
}

/* ─── REDUCED MOTION ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;
  }
  .button:active {
    transform: none;
  }
}

.button.trigger--solid {
  border: 1px solid var(--border--default);
}

.button.trigger--primary {
  border: 2px solid var(--border--strong);
}

.button.trigger--solid:hover:not([data-disabled]):not([data-loading]) {
  border-color: var(--border--strong);
}

.trigger--solid:active:not([data-disabled]):not([data-loading]) {
  
}
!!!

---

---

## caption.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/caption/caption.css`


!!!css
/**
 * Styles for the Caption component.
 *
 * The base `.caption` rule sets defaults for a standard, readable caption
 * placed below media. It uses `--label--*` tokens for a fixed, UI-like
 * text size, which is appropriate for captions.
 *
 * The credit and label sub-elements are styled directly, as their
 * appearance is not prop-driven.
 */

.caption {
  --typography--size: var(--label--lg); /* default: 14.4px fixed */
  --typography--color: var(--text--muted);
  --typography--leading: var(--leading--snug);
  max-inline-size: 60ch;
}

.caption__label {
  font-weight: var(--weight--semibold);
  color: var(--text--primary);
  margin-inline-end: 0.5em;
}

.caption__credit {
  display: block;
  font-size: var(--label--sm); /* 11.2px fixed */
  margin-block-start: var(--space-out--2xs);
}

/* ─── VARIANTS ─────────────────────────────────────────────────────────────── */

/**
 * Overlay variant.
 * Positions the caption at the bottom of its positioned parent, with a
 * gradient scrim for legibility over media.
 */
.caption--overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: var(--space-in--lg) var(--space-in--md) var(--space-in--sm);
  background: linear-gradient(to top, var(--overlay--scrim), transparent);
  color: white;
  max-inline-size: none; /* Overlays should span the full width */
}

.caption--overlay .caption__label {
  color: white;
}

.caption--overlay .caption__credit {
  color: white;
  opacity: 0.8;
}

/**
 * Rule variant.
 * Adds a decorative left border for an editorial feel.
 */
.caption--rule {
  border-inline-start: var(--border--medium) solid var(--border--strong);
  padding-inline-start: var(--space-in--sm);
}
!!!

---

---

## card.css


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/card/card.css`


!!!css
/* ============================================================
   card.css
   ─────────────────────────────────────────────────────────────
   Card-specific styles. Visual chrome from surface.css.

   MODIFIER CLASSES
   ──────────────────────────────────────────────────────────────
   .card--interactive   Hover lift + cursor pointer
   .card--selectable    Toggle affordance; combines with aria-pressed
   .card--selected      Pressed/active state
   .card--disabled      Prevents interaction; dims the card

   SLOTS
   ──────────────────────────────────────────────────────────────
   .card__media         Leading image/video region; no padding
   .card__body          Main content; inherits surface padding
   .card__footer        Trailing actions/metadata
   ============================================================ */

/* ─── BASE ───────────────────────────────────────────────────── */

.card {
  display: flex;
  flex-direction: column;
}

/* ─── SLOT REGIONS ───────────────────────────────────────────── */

.card__media {
  overflow:      hidden;
  border-radius: var(--surface--radius, var(--radius--md)) var(--surface--radius, var(--radius--md)) 0 0;
  flex-shrink:   0;
}

.card__media img,
.card__media video {
  display: block;
  width:   100%;
  height:  100%;
  object-fit: cover;
}

.card__body {
  flex: 1;
  padding: var(--surface--padding, var(--space-in--md));
}

.card__footer {
  padding: var(--surface--padding, var(--space-in--md));
  padding-top: 0;
  border-top: 1px solid var(--bg--border, var(--border--subtle));
}

/* ─── INTERACTIVE ────────────────────────────────────────────── */

.card--interactive {
  cursor: pointer;
  transition: transform 80ms ease, box-shadow 80ms ease;
  text-decoration: none;
  color: inherit;
}

.card--interactive:hover:not(.card--disabled) {
  transform:  translateY(-2px);
  box-shadow: var(--shadow--md);
}

.card--interactive:active:not(.card--disabled) {
  transform:  translateY(0);
  box-shadow: none;
}

/* ─── SELECTABLE ─────────────────────────────────────────────── */

.card--selected {
  border-color: var(--bg--border, var(--border--strong));
  background-color: var(--bg--subtle, transparent);
}

/* ─── DISABLED ───────────────────────────────────────────────── */

.card--disabled {
  opacity:        0.5;
  cursor:         not-allowed;
  pointer-events: none;
}

/* ─── REDUCED MOTION ─────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .card--interactive {
    transition: none;
  }
  .card--interactive:hover:not(.card--disabled) {
    transform: none;
  }
}

!!!

---

---

## carousel.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/carousel/carousel.css`


!!!css

!!!

---

---

## center.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/center/center.css`


!!!css
.center {
  display: flex;
}

.center--x {
  justify-content: center;
}

.center--y {
  align-items: center;
}

.center--both {
  justify-content: center;
  align-items: center;
}

!!!

---

---

## checkbox.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/checkbox/checkbox.css`


!!!css
/* ============================================================
   checkbox.css
   ─────────────────────────────────────────────────────────────
   Checkbox-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <label class="form checkbox checkbox--end …">  ← wrapper (<label>)
       <input class="checkbox__control" />            ← hidden native input
       <span class="checkbox__indicator" />           ← custom visual square
       <span class="checkbox__label">…</span>         ← label slot content
     </label>

   INDICATOR STATE MACHINE
   ──────────────────────────────────────────────────────────────
   State is driven by native CSS pseudo-classes on .checkbox__control
   via the general sibling combinator (~). This requires the control
   to precede the indicator in the DOM — that order never changes
   regardless of the labelPosition modifier class.

   States:
     default      →  bordered square, transparent fill
     :hover       →  border shifts to role color
     :checked     →  filled with role color, white checkmark
     :indeterminate → filled with role color, white dash
     :focus-visible → role-colored glow ring on indicator
     :disabled    →  handled by forms.css on wrapper [data-disabled]

   LABEL POSITION
   ──────────────────────────────────────────────────────────────
   DOM order is always: hidden input → indicator → label.
   CSS reorders visually via flex-direction / order.
   This keeps the ~ sibling combinator functional for all states.

   SIZING
   ──────────────────────────────────────────────────────────────
   The indicator square is proportional to --form--size (≈ 0.45×).
   The checkmark is drawn with a CSS border-based pseudo-element.
   ============================================================ */

/* ─── WRAPPER ─────────────────────────────────────────────── */

.checkbox {
  /* Natural height — not a min-block-size field like Input/Select */
  min-block-size: unset;

  /* Tighter padding than form inputs — just enough for click-area */
  padding: calc(var(--form--size, 2.5rem) * 0.15);
  gap:     calc(var(--form--size, 2.5rem) * 0.3);

  /* Inline by default (indicator + label side by side) */
  flex-direction: row;
  align-items: center;

  /* Full label area is clickable */
  cursor:      pointer;
  user-select: none;
}

/* ─── HIDDEN NATIVE INPUT ─────────────────────────────────── */
/* Visually hidden but accessible — still part of the tab order
   and triggers native :checked / :focus-visible / :indeterminate */

.checkbox__control {
  position:       absolute;
  opacity:        0;
  width:          0;
  height:         0;
  pointer-events: none;
  margin:         0;
}

/* ─── CUSTOM INDICATOR ────────────────────────────────────── */

.checkbox__indicator {
  flex-shrink: 0;

  /* Proportional to the form size tier */
  width:  calc(var(--form--size, 2.5rem) * 0.45);
  height: calc(var(--form--size, 2.5rem) * 0.45);

  display:         grid;
  place-items:     center;

  border:        2px solid var(--border--strong, var(--border--default));
  border-radius: var(--form--radius, var(--radius--sm));
  background:    transparent;

  transition:
    background-color var(--transition--fast, 150ms ease),
    border-color     var(--transition--fast, 150ms ease);
}

/* Checkmark drawn as a rotated L-shape border */
.checkbox__indicator::after {
  content: "";
  display: block;

  /* Proportions give a clean tick at all sizes */
  width:  30%;
  height: 55%;

  border:       2px solid transparent;
  border-top:   none;
  border-left:  none;
  transform:    rotate(45deg) translateY(-10%);

  opacity:    0;
  transition: opacity var(--transition--fast, 150ms ease);
}

/* ─── HOVER (unchecked) ───────────────────────────────────── */

.checkbox:hover:not([data-disabled]) .checkbox__indicator {
  border-color: var(--form--color-border, var(--primary--border));
}

/* ─── CHECKED ─────────────────────────────────────────────── */

.checkbox__control:checked ~ .checkbox__indicator {
  background-color: var(--form--color-base, var(--primary--base));
  border-color:     var(--form--color-base, var(--primary--base));
}

.checkbox__control:checked ~ .checkbox__indicator::after {
  border-color: var(--text--on-color, #fff);
  opacity:      1;
}

/* ─── INDETERMINATE ───────────────────────────────────────── */
/* Same fill as checked; the dash replaces the checkmark shape */

.checkbox__control:indeterminate ~ .checkbox__indicator {
  background-color: var(--form--color-base, var(--primary--base));
  border-color:     var(--form--color-base, var(--primary--base));
}

/* Override checkmark with a horizontal dash */
.checkbox__control:indeterminate ~ .checkbox__indicator::after {
  width:        55%;
  height:       2px;
  border:       none;
  background:   var(--text--on-color, #fff);
  transform:    none;
  opacity:      1;
}

/* ─── FOCUS ───────────────────────────────────────────────── */
/* Focus ring on the indicator (not the wrapper) — matches the
   convention of focused form controls showing the glow on the
   actual interactive element */

.checkbox__control:focus-visible ~ .checkbox__indicator {
  outline: none;
  box-shadow: 0 0 0 3px
    color-mix(in oklch, var(--form--color-base, var(--primary--base)) 30%, transparent);
}

/* ─── LABEL TEXT ─────────────────────────────────────────── */

.checkbox__label {
  font-size:   calc(var(--form--size, 2.5rem) * 0.35);
  line-height: 1.4;
  color:       inherit;
}

/* ─── LABEL POSITION MODIFIERS ───────────────────────────── */
/* DOM order never changes. CSS reorders visually only. */

/* end (default) — [■] Label */
.checkbox--end {
  flex-direction: row;
}

/* start — Label [■] */
.checkbox--start {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

/* top — Label above indicator */
.checkbox--top {
  flex-direction: column-reverse;
  align-items: center;
}

/* bottom — indicator above label */
.checkbox--bottom {
  flex-direction: column;
  align-items: center;
}

/* ─── INVALID STATE ───────────────────────────────────────── */
/* Danger border on the indicator (supplements wrapper border from forms.css) */

.checkbox[data-invalid] .checkbox__indicator {
  border-color: var(--danger--border);
}

/* ─── DISABLED STATE ──────────────────────────────────────── */
/* forms.css handles opacity + pointer-events on [data-disabled].
   Cursor is specific to checkbox (pointer → default). */

.checkbox[data-disabled] {
  cursor: default;
}

/* ─── REDUCED MOTION ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .checkbox__indicator,
  .checkbox__indicator::after {
    transition: none;
  }
}
!!!

---

---

## chip.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/chip/chip.css`


!!!css
/* ============================================================
   chip.css
   ─────────────────────────────────────────────────────────────
   Visual styles for the Chip component.
   
   Inherits `--feedback--color-*` and `--feedback--radius` from
   the `useFeedback` hook base classes (`.feedback--[variant]`).
   ============================================================ */

.chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: var(--feedback--radius);
  font-family: var(--family--sans);
  font-weight: var(--weight--medium);
  line-height: var(--leading--none);
  border: 1px solid transparent;
  cursor: pointer;
  transition: var(--transition--fast) background-color, var(--transition--fast) border-color;
  background-color: transparent;
  color: inherit; /* Rely on feedback variants to set correct color */
  outline: none;
}

/* Reset default button appearance */
button.chip {
  appearance: none;
  border-width: 1px; /* Let variants override */
}

.chip:hover {
  /* Slightly darken or lighten based on variant by adjusting opacity or using a different token.
     Here we just add a small brightness filter or rely on the variant's border-color if outlined. */
  filter: brightness(0.95);
}

.chip:active {
  filter: brightness(0.9);
}

.chip:focus-visible {
  box-shadow: 0 0 0 2px var(--bg--1), 0 0 0 4px var(--feedback--color-border);
}

/* ─── SIZE MAPPING ────────────────────────────────────────── */

/* XS: micro chip */
.feedback--xs.chip {
  font-size: var(--label--xs);
  padding: var(--space-in--3xs) var(--space-in--2xs);
  min-block-size: var(--ui-height--2xs);
  gap: var(--space-in--3xs);
}

/* SM: small chip */
.feedback--sm.chip {
  font-size: var(--label--sm);
  padding: var(--space-in--2xs) var(--space-in--xs);
  min-block-size: var(--ui-height--xs);
  gap: var(--space-in--3xs);
}

/* MD (default): standard chip */
.feedback--md.chip {
  font-size: var(--label--md);
  padding: var(--space-in--xs) var(--space-in--sm);
  min-block-size: var(--ui-height--sm);
  gap: var(--space-in--2xs);
}

/* LG: large chip */
.feedback--lg.chip {
  font-size: var(--label--lg);
  padding: var(--space-in--sm) var(--space-in--md);
  min-block-size: var(--ui-height--md);
  gap: var(--space-in--xs);
}

/* XL: hero chip */
.feedback--xl.chip {
  font-size: var(--label--xl);
  padding: var(--space-in--md) var(--space-in--lg);
  min-block-size: var(--ui-height--lg);
  gap: var(--space-in--sm);
}

!!!

---

---

## code.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/code/code.css`


!!!css
/* design/typography/components/code/code.css */
.code,
.pre {
  font-size: var(--fs--lg);
  font-family: var(--mono);
  --typography--tracking: var(--tracking--wider);
}
.pre {
  background: var(--bg--4); /* Dark theme by default for code blocks */
  color: var(--text--inverse);
  padding: var(--space-in--lg);
  /* padding-block-start: var(--space-in--3xl); */
  /* padding-inline-end: var(--space-in--xl); */
  border-radius: var(--radius--xs);
  overflow-x: auto;
  margin-bottom: var(--space-out--md);
  /* line-height: var(--leading--snug); */
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
}

.code.code--inline {
  white-space:   nowrap;
  text-wrap:     nowrap;
  background:    var(--bg--4);
  color:         var(--warning--text);
  padding:       var(--space-in--3xs) var(--space-in--md);
  font-size:     var(--fs--sm);
  border-radius: var(--radius--xs);
  border:        1px solid var(--border--subtle);
  font-weight:   var(--weight--medium);
}

/* ─── Copy button (injected by mountCopyButtons) ──────── */

.pre-wrapper {
  position: relative;
}

.pre-copy-btn {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  padding: var(--space-in--2xs) var(--space-in--sm);
  font-size: var(--fs--xs);
  font-family: var(--family--sans);
  font-weight: var(--weight--medium);
  color: var(--text--tertiary);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius--sm);
  cursor: pointer;
  transition: color 0.15s, background 0.15s, border-color 0.15s;
  /* line-height: 1; */
}

.pre-copy-btn:hover {
  color: var(--text--primary);
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.15);
}

.pre-copy-btn[data-copied] {
  color: var(--success--text);
}

/* ─── If code is inside a pre block, reset the inline styles ── */
.pre > .code--inline,
.code--block {
  white-space: pre-wrap;
  word-break: break-word;
  background: transparent;
  color: inherit;
  padding: 0;
  border-radius: 0;
  border: none;
  font-weight: inherit;
}


!!!

---

---

## color-picker.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/color-picker/color-picker.css`


!!!css

!!!

---

---

## columns.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/columns/columns.css`


!!!css

!!!

---

---

## combobox.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/combobox/combobox.css`


!!!css
/* ============================================================
   combobox.css
   ─────────────────────────────────────────────────────────────
   Combobox-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <div class="form combobox …" data-combobox>
       <input class="combobox__control" role="combobox" />  ← text input
       <input type="hidden" … />                             ← submission value
       <div class="combobox__arrow">▾</div>                  ← dropdown indicator
       <ul class="combobox__listbox" role="listbox" hidden>  ← custom dropdown
         <li class="combobox__option" role="option">…</li>
       </ul>
     </div>

   POSITIONING
   ──────────────────────────────────────────────────────────────
   The listbox is absolutely positioned below the wrapper.
   The wrapper needs position: relative (added via .combobox below).
   z-index: --z--dropdown ensures the listbox floats above other content.

   OPTION STATES
   ──────────────────────────────────────────────────────────────
   .combobox__option--active → keyboard-highlighted option (JS-managed)
   [aria-selected="true"]    → currently selected option
   [aria-disabled="true"]    → disabled option (not selectable)
   [hidden]                  → filtered out (JS toggles per option)
   ============================================================ */

/* ─── WRAPPER ─────────────────────────────────────────────── */

.combobox {
  position: relative; /* Anchors the absolutely-positioned listbox */
  cursor:   text;
}

/* ─── VISIBLE TEXT CONTROL ─────────────────────────────────── */

.combobox__control {
  flex: 1;
  min-inline-size: 0;

  background:  transparent;
  border:      none;
  outline:     none;
  color:       inherit;
  font-size:   inherit;
  font-family: inherit;
  line-height: inherit;
  padding:     0;
  margin:      0;

  appearance:         none;
  -webkit-appearance: none;
}

.combobox__control::placeholder {
  color:   var(--text--tertiary, var(--text--secondary));
  opacity: 1;
}

.combobox__control:focus,
.combobox__control:focus-visible {
  outline: none;
  box-shadow: none;
}

/* Suppress Chrome autofill background and text color changes */
.combobox__control:-webkit-autofill,
.combobox__control:-webkit-autofill:hover,
.combobox__control:-webkit-autofill:focus,
.combobox__control:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: var(--text--primary);
}

/* ─── DROPDOWN ARROW ───────────────────────────────────────── */

.combobox__arrow {
  display:        flex;
  align-items:    center;
  flex-shrink:    0;
  color:          var(--text--secondary);
  pointer-events: none;

  transition: transform var(--transition--fast, 150ms ease),
              color     var(--transition--fast, 150ms ease);
}

/* Arrow rotates when listbox is open */
.combobox[aria-expanded="true"] .combobox__arrow,
.combobox:has(.combobox__listbox:not([hidden])) .combobox__arrow {
  transform: rotate(180deg);
  color:     var(--form--color-text, var(--primary--text));
}

/* ─── LISTBOX DROPDOWN ─────────────────────────────────────── */

.combobox__listbox {
  position:   absolute;
  inset-inline: 0;
  top:        calc(100% + 4px);
  z-index:    var(--z--dropdown, 200);

  max-block-size: 18rem;
  overflow-y:     auto;
  overscroll-behavior: contain;

  /* Visual: same layer as popover/dropdown (Layer 4) */
  background-color: var(--bg--4, #fff);
  border:           1px solid var(--border--default);
  border-radius:    var(--form--radius, var(--radius--md));
  box-shadow:       var(--shadow--md);

  list-style: none;
  margin:     0;
  padding:    var(--space-in--xs, 0.25rem) 0;
}

/* Hidden listbox — `hidden` attribute; JS removes it on open */
.combobox__listbox[hidden] {
  display: none;
}

/* ─── OPTIONS ──────────────────────────────────────────────── */

.combobox__option {
  display:     flex;
  align-items: center;
  padding-block:  calc(var(--form--size, 2.5rem) * 0.2);
  padding-inline: calc(var(--form--size, 2.5rem) * 0.4);

  font-size:   calc(var(--form--size, 2.5rem) * 0.35);
  line-height: 1.4;
  color:       var(--text--primary);
  cursor:      pointer;

  transition: background-color var(--transition--fast, 100ms ease);
}

/* Keyboard-active option (JS adds/removes this class) */
.combobox__option--active {
  background-color: var(--form--color-subtle, var(--primary--subtle));
  color:            var(--form--color-text,   var(--primary--text));
}

/* Selected option — already chosen */
.combobox__option[aria-selected="true"] {
  background-color: var(--form--color-subtle, var(--primary--subtle));
  color:            var(--form--color-text,   var(--primary--text));
  font-weight:      500;
}

/* Selected + active — keyboard is on the already-selected item */
.combobox__option--active[aria-selected="true"] {
  background-color: var(--form--color-muted, var(--primary--muted));
}

/* Disabled option */
.combobox__option[aria-disabled="true"] {
  color:          var(--text--tertiary, var(--text--secondary));
  cursor:         not-allowed;
  pointer-events: none;
}

/* Filtered out (JS sets hidden attribute per option) */
.combobox__option[hidden] {
  display: none;
}

/* Empty state — shown when no options match the filter */
.combobox__empty {
  padding-block:  calc(var(--form--size, 2.5rem) * 0.3);
  padding-inline: calc(var(--form--size, 2.5rem) * 0.4);
  font-size:      calc(var(--form--size, 2.5rem) * 0.35);
  color:          var(--text--secondary);
  font-style:     italic;
  display:        none; /* JS shows this when all options are filtered out */
}

.combobox__empty--visible {
  display: block;
}

/* ─── REDUCED MOTION ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .combobox__arrow { transition: none; }
}

!!!

---

---

## command-palette.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/command-palette/command-palette.css`


!!!css

!!!

---

---

## container.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/container/container.css`


!!!css
.container {
  width: 100%;
  margin-inline: auto;
  max-width: var(--container--max-width, var(--container--lg));
}

!!!

---

---

## context-menu.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/context-menu/context-menu.css`


!!!css

!!!

---

---

## cropper.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/cropper/cropper.css`


!!!css

!!!

---

---

## date-picker.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/date-picker/date-picker.css`


!!!css

!!!

---

## dot.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/dot/dot.css`


!!!css
/* design/feedback/dot/dot.css */

.dot {
  padding:    0;
  min-width:  var(--dot--size);
  min-height: var(--dot--size);
  width:      var(--dot--size);
  height:     var(--dot--size);
}

/* Size map for dot */
.feedback--xs.dot { --dot--size: calc(var(--icon--size-xs) / 2); }
.feedback--sm.dot { --dot--size: calc(var(--icon--size-sm) / 1.5); }
.feedback--md.dot { --dot--size: var(--icon--size-md); }
.feedback--lg.dot { --dot--size: var(--icon--size-lg); }
.feedback--xl.dot { --dot--size: var(--icon--size-xl); }

!!!

---

## drawer.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/drawer/drawer.css`


!!!css
/* ============================================================
   drawer.css
   ─────────────────────────────────────────────────────────────
   Slide-in panel using native <dialog showModal()>.
   Placement modifier classes position and animate the panel;
   size modifier classes set --drawer--cross-size which the
   placement classes consume for width (side) or height (sheet).
   ============================================================ */

/* ── reset dialog defaults ─────────────────────────────────── */

.drawer {
  margin:     0;
  padding:    0;
  border:     none;
  outline:    none;
  max-width:  none;
  max-height: none;
  overflow:   visible;
}

/* ── card chrome ───────────────────────────────────────────── */

.drawer {
  display:          flex;
  flex-direction:   column;
  background-color: var(--bg--2);
  color:            var(--text--primary);
  box-shadow:       var(--shadow--xl);
}

/* ── backdrop ──────────────────────────────────────────────── */

.drawer::backdrop {
  background-color: var(--bg--5-glass);
  backdrop-filter:  blur(var(--blur--sm));
}

/* ── open/close transitions ────────────────────────────────── */

.drawer {
  transition:
    transform var(--transition--base) allow-discrete,
    opacity   var(--transition--base) allow-discrete,
    display   var(--transition--base) allow-discrete;
}

.drawer::backdrop {
  transition:
    opacity var(--transition--base) allow-discrete,
    display var(--transition--base) allow-discrete;
}

@starting-style {
  .drawer--placement-end[open]    { transform: translateX(100%);  opacity: 0; }
  .drawer--placement-start[open]  { transform: translateX(-100%); opacity: 0; }
  .drawer--placement-top[open]    { transform: translateY(-100%); opacity: 0; }
  .drawer--placement-bottom[open] { transform: translateY(100%);  opacity: 0; }

  .drawer[open]::backdrop { opacity: 0; }
}

/* ── size modifiers — set --drawer--cross-size ─────────────── */

.drawer--size-sm { --drawer--cross-size: min(280px, 90dvw); }
.drawer--size-md { --drawer--cross-size: min(360px, 90dvw); }
.drawer--size-lg { --drawer--cross-size: min(480px, 90dvw); }

/* ── placement modifiers ────────────────────────────────────── */

.drawer--placement-end {
  width:         var(--drawer--cross-size, min(360px, 90dvw));
  height:        100dvh;
  margin-left:   auto;
  border-left:   1px solid var(--border--default);
  border-radius: var(--radius--lg) 0 0 var(--radius--lg);
}

.drawer--placement-start {
  width:         var(--drawer--cross-size, min(360px, 90dvw));
  height:        100dvh;
  margin-right:  auto;
  border-right:  1px solid var(--border--default);
  border-radius: 0 var(--radius--lg) var(--radius--lg) 0;
}

.drawer--placement-bottom {
  width:         100dvw;
  height:        var(--drawer--cross-size, min(360px, 90dvh));
  margin-top:    auto;
  border-top:    1px solid var(--border--default);
  border-radius: var(--radius--lg) var(--radius--lg) 0 0;
}

.drawer--placement-top {
  width:          100dvw;
  height:         var(--drawer--cross-size, min(360px, 90dvh));
  margin-bottom:  auto;
  border-bottom:  1px solid var(--border--default);
  border-radius:  0 0 var(--radius--lg) var(--radius--lg);
}

/* full size — override comes after placement to win on border-radius */
.drawer--size-full {
  --drawer--cross-size: 100%;
  border-radius:        0;
  border:               none;
}

/* ── inner layout ───────────────────────────────────────────── */

.drawer__header {
  display:         flex;
  align-items:     center;
  justify-content: space-between;
  gap:             var(--space-in--sm);
  padding:         var(--space-in--md) var(--space-in--lg);
  border-bottom:   1px solid var(--border--subtle);
  flex-shrink:     0;
}

.drawer__title {
  font-size:   var(--fsf--md);
  font-weight: var(--weight--semibold);
  color:       var(--text--primary);
  margin:      0;
}

.drawer__close-btn {
  display:         flex;
  align-items:     center;
  justify-content: center;
  width:           2rem;
  height:          2rem;
  border-radius:   var(--radius--md);
  border:          none;
  background:      transparent;
  color:           var(--text--muted);
  cursor:          pointer;
  flex-shrink:     0;
  transition:      background-color 120ms ease, color 120ms ease;
}

.drawer__close-btn:hover {
  background-color: var(--bg--3);
  color:            var(--text--primary);
}

.drawer__body {
  flex:       1;
  padding:    var(--space-in--lg);
  overflow-y: auto;
}

.drawer__footer {
  display:         flex;
  align-items:     center;
  justify-content: flex-end;
  gap:             var(--space-in--sm);
  padding:         var(--space-in--md) var(--space-in--lg);
  border-top:      1px solid var(--border--subtle);
  flex-shrink:     0;
}

!!!

---

## dropdown-menu.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/dropdown-menu/dropdown-menu.css`


!!!css
/* dropdown-menu.css */
.dropdown-menu {
  margin: 0; /* Reset popover margin */
  padding: var(--space-in--xs);
  display: flex;
  flex-direction: column;
  background: var(--bg--0, #fff);
  border: 1px solid var(--border--subtle);
  border-radius: var(--radius--md);
  box-shadow: var(--shadow--md);
  color: var(--text--primary);
  min-width: 200px;
  
  /* Popover hidden by default */
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 150ms ease, transform 150ms ease;
}

.dropdown-menu:popover-open {
  opacity: 1;
  transform: translateY(0);
}

/* Reset backdrop (we usually don't want a dark backdrop for dropdowns) */
.dropdown-menu::backdrop {
  background: transparent;
}

/* Dropdown Items */
.dropdown-menu__item {
  display: flex;
  align-items: center;
  gap: var(--space-in--sm);
  padding: var(--space-in--sm) var(--space-in--md);
  border: none;
  background: transparent;
  color: var(--text--primary);
  font-size: var(--text--sm);
  font-family: inherit;
  text-align: left;
  text-decoration: none;
  border-radius: var(--radius--sm);
  cursor: pointer;
  width: 100%;
  transition: background-color 100ms ease, color 100ms ease;
}

.dropdown-menu__item:hover,
.dropdown-menu__item:focus-visible {
  background: var(--bg--2);
  outline: none;
}

.dropdown-menu__item:active {
  background: var(--bg--3);
}

.dropdown-menu__item[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.dropdown-menu__item-icon {
  color: var(--text--muted);
  flex-shrink: 0;
}

.dropdown-menu__item-label {
  flex: 1;
}

.dropdown-menu__item-chevron {
  color: var(--text--muted);
  flex-shrink: 0;
  margin-left: auto;
}

!!!

---

## empty-state.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/empty-state/empty-state.css`


!!!css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-in--xl);
  gap: var(--space-in--sm);
  border: 2px dashed var(--border--subtle);
}

.empty-state__icon {
  font-size: var(--icon--size-xl);
  color: var(--feedback--color-text);
  opacity: 0.5;
  margin-bottom: var(--space-in--xs);
}

.empty-state__title {
  font-weight: var(--weight--semibold);
  font-size: var(--fsf--lg);
  color: var(--feedback--color-text);
}

.empty-state__description {
  color: var(--text--secondary);
  max-width: 400px;
}

.empty-state__actions {
  margin-top: var(--space-in--md);
}

!!!

---

## feed.css


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/feed/feed.css`


!!!css
.feed {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
}

.feed--horizontal {
  flex-direction: row;
}

.feed__item {
  position: relative;
  display: flex;
  gap: var(--space-in--md);
  padding-bottom: var(--space-in--lg);
}

.feed__item:last-child {
  padding-bottom: 0;
}

.feed--horizontal .feed__item {
  flex-direction: column;
  padding-bottom: 0;
  padding-right: var(--space-in--lg);
  gap: var(--space-in--sm);
}

.feed--horizontal .feed__item:last-child {
  padding-right: 0;
}

/* Timeline connector */
.feed__node-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 2rem;
}

.feed--horizontal .feed__node-container {
  flex-direction: row;
  min-height: 2rem;
  justify-content: flex-start;
}

.feed__line {
  position: absolute;
  top: 2rem;
  bottom: -0.5rem;
  width: 2px;
  background-color: var(--data--color--border, var(--border--subtle));
}

.feed__item:last-child .feed__line {
  display: none;
}

.feed--horizontal .feed__line {
  top: auto;
  bottom: auto;
  left: 2rem;
  right: -0.5rem;
  width: auto;
  height: 2px;
}

.feed__node {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius--full);
  background-color: var(--bg--subtle, var(--surface--1));
  color: var(--data--color--text, var(--text--default));
  border: 2px solid var(--surface--0); /* cut out the line behind it */
}

.feed__content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-top: 0.125rem;
  flex: 1;
}

.feed--horizontal .feed__content {
  padding-top: 0;
}

.feed__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-in--sm);
}

.feed__title {
  font-size: var(--fs--sm);
  font-weight: 500;
  color: var(--text--default);
}

.feed__timestamp {
  font-size: var(--fs--xs);
  color: var(--text--muted);
  white-space: nowrap;
}

.feed__description {
  font-size: var(--fs--sm);
  color: var(--text--muted);
  line-height: 1.5;
}

/* Link support */
.feed__link {
  text-decoration: none;
  color: inherit;
  display: contents;
}

.feed__link:hover .feed__title {
  color: var(--data--color--vivid, var(--primary--vivid));
  text-decoration: underline;
}

.feed[data-loading] .feed__content {
  opacity: 0.7;
}

!!!

---

## field.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/field/field.css`


!!!css
/* ============================================================
   field.css
   ─────────────────────────────────────────────────────────────
   Layout styles for the Field wrapper. Field stacks its slots
   vertically with consistent spacing and provides text styles
   for hint, error, and success messages.

   Field has no --form--* channels — it reads no CSS custom
   properties from useField. All spacing uses the shared
   space scale directly.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <div class="field">
       <div class="field__label">  ← label slot wrapper
       <div class="field__control">← default slot (control)
       <p   class="field__hint">   ← hint slot wrapper
       <p   class="field__error">  ← error slot wrapper
       <p   class="field__success">← success slot wrapper
     </div>

   Slot wrappers are only rendered when the slot has content
   (Astro.slots.has() guard in Field.astro), so spacing between
   sections is natural — no empty gaps when a slot is unused.
   ============================================================ */

/* ─── WRAPPER ─────────────────────────────────────────────── */

.field {
  display:        flex;
  flex-direction: column;
  gap:            var(--space-in--sm);

  /* Natural inline size — fills container; control inside
     manages its own width via fullWidth or fixed sizing */
  width: 100%;
}

/* ─── LABEL SECTION ───────────────────────────────────────── */

.field__label {
  /* Label component handles its own typography.
     This wrapper just provides a consistent slot anchor. */
  display: block;
}

/* ─── CONTROL SECTION ─────────────────────────────────────── */

.field__control {
  /* Passes through the control's own width/display.
     position: relative allows absolute-positioned slot
     add-ons (like character counters) to anchor here. */
  position: relative;
  display:  block;
}

/* ─── HINT TEXT ───────────────────────────────────────────── */

.field__hint {
  font-size:   var(--fsf--xs, 0.75rem);
  color:       var(--text--secondary);
  line-height: 1.4;
  margin:      0;
}

/* ─── ERROR TEXT ──────────────────────────────────────────── */

.field__error {
  font-size:   var(--fsf--xs, 0.75rem);
  color:       var(--danger--text);
  line-height: 1.4;
  margin:      0;
}

/* ─── SUCCESS TEXT ────────────────────────────────────────── */

.field__success {
  font-size:   var(--fsf--xs, 0.75rem);
  color:       var(--success--text);
  line-height: 1.4;
  margin:      0;
}

/* ─── INVALID STATE ───────────────────────────────────────── */
/* data-invalid on the wrapper enables descendant-based styling
   for cases where the error text needs emphasis beyond color */

.field[data-invalid] .field__hint {
  /* Suppress hint when an error is shown — both slots can be
     present simultaneously; this visually deprioritises the hint */
  color: var(--text--tertiary, var(--text--secondary));
}

/* ─── REQUIRED STATE ──────────────────────────────────────── */
/* data-required is available for future styling needs.
   No visual rule is applied here — the Label component handles
   the required asterisk indicator independently. */
!!!

---

## file-preview.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/file-preview/file-preview.css`


!!!css
.file-preview {
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: var(--file-preview--radius);
  border: 1px solid var(--border--default);
  background-color: var(--bg--2);
  width: var(--file-preview--size);
  overflow: hidden;
  cursor: default;
}

/* ── Strip layout ────────────────────────────────────────────────── */

.file-preview--strip {
  flex-direction: row;
  width: auto;
  min-width: 0;
  padding: 0.5rem 0.75rem;
  gap: 0.75rem;
}

/* ── Thumbnail or type icon ──────────────────────────────────────── */

.file-preview__thumb {
  width: 100%;
  aspect-ratio: 1;
  border-radius: calc(var(--file-preview--radius) - 2px);
  object-fit: cover;
  display: block;
}

.file-preview--strip .file-preview__thumb {
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
}

.file-preview__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border-radius: calc(var(--file-preview--radius) - 2px);
  background-color: var(--bg--3);
  font-size: calc(var(--file-preview--size) * 0.18);
  font-weight: var(--weight--bold, 700);
  letter-spacing: 0.03em;
  color: var(--text--muted);
}

.file-preview--strip .file-preview__icon {
  width: 2.5rem;
  height: 2.5rem;
  flex-shrink: 0;
  font-size: 0.6rem;
}

/* ── Type accent colors ──────────────────────────────────────────── */

.file-preview--type-image .file-preview__icon  { background-color: var(--info--subtle);    color: var(--info--text); }
.file-preview--type-doc .file-preview__icon    { background-color: var(--danger--subtle);  color: var(--danger--text); }
.file-preview--type-sheet .file-preview__icon  { background-color: var(--success--subtle); color: var(--success--text); }
.file-preview--type-code .file-preview__icon   { background-color: var(--accent--subtle);  color: var(--accent--text); }
.file-preview--type-media .file-preview__icon  { background-color: var(--warning--subtle); color: var(--warning--text); }
.file-preview--type-archive .file-preview__icon{ background-color: var(--bg--4);           color: var(--text--secondary); }

/* ── Meta ────────────────────────────────────────────────────────── */

.file-preview__meta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
  min-width: 0;
  width: 100%;
}

.file-preview--strip .file-preview__meta {
  align-items: flex-start;
  flex: 1;
}

.file-preview__name {
  font-size: var(--fsf--xs, 0.75rem);
  color: var(--text--primary);
  font-weight: var(--weight--medium, 500);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.file-preview__size {
  font-size: var(--fsf--2xs, 0.625rem);
  color: var(--text--muted);
}

/* ── Dismiss button ──────────────────────────────────────────────── */

.file-preview__remove {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: var(--radius--full);
  background-color: var(--bg--4);
  border: none;
  cursor: pointer;
  color: var(--text--secondary);
  padding: 0;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.15s ease, background-color 0.15s ease;
}

.file-preview:hover .file-preview__remove,
.file-preview:focus-within .file-preview__remove {
  opacity: 1;
}

.file-preview__remove:hover {
  background-color: var(--danger--subtle);
  color: var(--danger--text);
}

.file-preview__remove:focus-visible {
  outline: 2px solid var(--primary--border);
  outline-offset: 1px;
}

.file-preview--strip .file-preview__remove {
  position: static;
  opacity: 1;
  margin-left: auto;
  flex-shrink: 0;
}

!!!

---

## file-upload.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/file-upload/file-upload.css`


!!!css

!!!

---

## flex.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/flex/flex.css`


!!!css
.flex {
  display: flex;
  flex-direction: var(--flex--direction, row);
  flex-wrap: var(--flex--wrap, nowrap);
}

!!!

---

## footer.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/footer/footer.css`


!!!css
/* ============================================================
   footer.css
   ─────────────────────────────────────────────────────────────
   Visual styles for the Footer component.

   The Footer combines the `.layout` class (spacing channels) with
   `.footer` (this file) for the footer-specific visual shell.

   DEFAULT VISUAL CONTRACT
   ────────────────────────
   The footer looks presentable with zero props passed:
   - --bg--1 background  (same elevation as the header, consistent page frame)
   - min-block-size: 3.5rem  (~56px — a compact but comfortable footer bar)
   - full viewport width
   - a subtle top border to lift it visually off the page body
   - horizontal padding from the FOOTER_DEFAULTS.px applied via useLayout

   All defaults are overridable via explicit props or the `bg` pass-through.

   UNLIKE HEADER
   ────────────────
   Footer has no sticky modifier — sticky footers are an anti-pattern on most
   sites and are better achieved with CSS grid / min-height layout on the page
   body (push footer to bottom without locking it to viewport).
   ============================================================ */

.footer {
  /* Sizing — full width, minimum comfortable height */
  width: 100%;
  min-block-size: 3.5rem;

  /* Background: prefer the consumer-set channel, fall back to layer-1 elevation */
  background: var(--bg--subtle, var(--bg--1));

  /* Hairline top border mirrors the header's bottom border, framing the page */
  border-block-start: 1px solid var(--border--subtle, var(--border--default));

  /* Flex row so start / default / end slots line up horizontally */
  display: flex;
  flex-direction: row;
  align-items: var(--layout--align, center);
  justify-content: var(--layout--justify, space-between);
  gap: var(--layout--gap);
}

!!!

---

## frame.css


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/frame/frame.css`


!!!css
/* design/surfaces/components/frame/frame.css */
.frame {
  display: block;
  position: relative;
  aspect-ratio: var(--frame--ratio, auto);
}

.frame--clipped {
  overflow: hidden;
}

/* Ensure images inside a frame fill it properly by default */
.frame > img,
.frame > video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

!!!

---

## gallery-item.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery-item/gallery-item.css`


!!!css

!!!

---

## gallery.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/gallery/gallery.css`


!!!css

!!!

---

## grid.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/grid/grid.css`


!!!css
.grid {
  display: grid;
  grid-template-columns: var(--grid--columns, none);
  gap: var(--grid--gap, var(--space-in--md));
}


!!!

---

## header.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/header/header.css`


!!!css
/* ============================================================
   header.css
   ─────────────────────────────────────────────────────────────
   Visual styles for the Header component.

   The Header combines the `.layout` class (which handles all
   spacing and flex alignment via CSS channels) with `.header`
   (this file), which handles the header-specific shell.

   DEFAULT VISUAL CONTRACT
   ────────────────────────
   The header looks presentable with zero props passed:
   - --bg--1 background  (nav / sidebar elevation, one step above page canvas)
   - min-block-size: 4rem  (~64px — standard header height)
   - full viewport width
   - a subtle bottom border to lift it visually off the page body
   - horizontal padding from the HEADER_DEFAULTS.px applied via useLayout

   All of these are overridable by the consumer via explicit props or
   the `bg` pass-through on LayoutProps.

   STICKY MODIFIER
   ────────────────
   `.header--sticky` activates sticky positioning and applies --z--sticky
   so the header always sits above dropdowns and other raised content.
   ============================================================ */

.header {
  width: 100%;
  min-block-size: 4rem;

  /* Background: prefer the consumer-set channel, fall back to layer-1 elevation */
  background: var(--bg--subtle, var(--bg--1));

  /* Hairline bottom border to visually separate header from page body */
  border-block-end: 1px solid var(--border--subtle, var(--border--default));

  /* Flex row so start / default / end slots line up horizontally.
     align and justify are driven by --layout--align / --layout--justify channels
     set by useHeader's defaults (center / space-between). */
  display: flex;
  flex-direction: row;
  align-items: var(--layout--align, center);
  justify-content: var(--layout--justify, space-between);
  gap: var(--layout--gap);
}

/* ── Sticky modifier ─────────────────────────────────────── */

.header--sticky {
  position: sticky;
  top: 0;
  z-index: var(--z--sticky);
}

!!!

---

## heading.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/heading/heading.css`


!!!css
/* ============================================================
   heading.css
   ─────────────────────────────────────────────────────────────
   Heading-specific styles for the H component.

   H always carries both "typography" and "h" class names.
   All typographic values flow through --typography--* channels
   declared inline by useHeading and consumed by typography.css.

   This file only adds heading-specific concerns on top of
   the shared typography baseline.

   LEVEL DEFAULTS
   ──────────────
   Each level sets size, weight, leading, and tracking fallbacks
   so that unset props produce appropriate heading defaults.
   Passing any of these props explicitly overrides the fallback.

   Leading: 
    --leading--tight = ~1.25
    --leading--snug = ~1.375
    --leading--normal = ~1.5
    --leading--relaxed = ~1.625
    --leading--loose = ~2
  Tracking:
    --tracking--tight = ~0.025em
    --tracking--normal = ~0.05em
    --tracking--wide = ~0.1em
    --tracking--wider = ~0.25em
    --tracking--caps = ~0.1em
  
   ============================================================ */

/* ─── LEVEL DEFAULTS ──────────────────────────────────────── */

.h {
  display: inline-flex;
  align-items: center;
}

.h--1,
[data-visual="h1"] {
  --typography--size:    var(--fs--4xl);
  --typography--weight:  var(--weight--bold);
  --typography--leading: var(--leading--snug);
  --typography--tracking:var(--tracking--tight);
}

.h--2,
[data-visual="h2"] {
  --typography--size:    var(--fs--3xl);
  --typography--weight:  var(--weight--bold);
  --typography--leading: var(--leading--snug);
  --typography--tracking:var(--tracking--normal);
}

.h--3,
[data-visual="h3"] {
  --typography--size:    var(--fs--2xl);
  --typography--weight:  var(--weight--semibold);
  --typography--leading: var(--leading--normal);
  --typography--tracking:var(--tracking--normal);
}

.h--4,
[data-visual="h4"] {
  --typography--size:    var(--fs--xl);
  --typography--weight:  var(--weight--semibold);
  --typography--leading: var(--leading--normal);
  --typography--tracking:var(--tracking--normal);
}

.h--5,
[data-visual="h5"] {
  --typography--size:    var(--fs--lg);
  --typography--weight:  var(--weight--medium);
  --typography--leading: var(--leading--loose);
  --typography--tracking:var(--tracking--wide);
}

.h--6,
[data-visual="h6"] {
  --typography--size:    var(--fs--md);
  --typography--weight:  var(--weight--medium);
  --typography--leading: var(--leading--loosel);
  --typography--tracking:var(--tracking--wide);
}
!!!

---

## icon.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/icon/icon.css`


!!!css
/* ============================================================
   icon.css
   ─────────────────────────────────────────────────────────────
   Visual styles for the Icon component.
   ============================================================ */

.icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
  color: var(--icon--color, inherit);
}

/* Ensure SVG matches the container size perfectly */
.icon svg {
  display: block;
  width: 100%;
  height: 100%;
  stroke: currentColor;
}

/* ─── SIZE MAPPING ────────────────────────────────────────── */
/* These sizes map directly from the tokens to width/height */

.icon--2xs {
  width: var(--icon--size-2xs);
  height: var(--icon--size-2xs);
}

.icon--xs {
  width: var(--icon--size-xs);
  height: var(--icon--size-xs);
}

.icon--sm {
  width: var(--icon--size-sm);
  height: var(--icon--size-sm);
}

.icon--md {
  width: var(--icon--size-md);
  height: var(--icon--size-md);
}

.icon--lg {
  width: var(--icon--size-lg);
  height: var(--icon--size-lg);
}

.icon--xl {
  width: var(--icon--size-xl);
  height: var(--icon--size-xl);
}

.icon--2xl {
  width: var(--icon--size-2xl);
  height: var(--icon--size-2xl);
}

!!!

---

## image.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/image/image.css`


!!!css
.image {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: var(--image--radius);
  object-fit: var(--image--fit);

  padding-inline:       var(--image--px, var(--image--p));
  padding-block:        var(--image--py, var(--image--p));
  padding-block-start:  var(--image--pt, var(--image--py, var(--image--p)));
  padding-block-end:    var(--image--pb, var(--image--py, var(--image--p)));
  padding-inline-start: var(--image--pl, var(--image--px, var(--image--p)));
  padding-inline-end:   var(--image--pr, var(--image--px, var(--image--p)));

  margin-inline:        var(--image--mx, var(--image--m));
  margin-block:         var(--image--my, var(--image--m));
  margin-block-start:   var(--image--mt, var(--image--my, var(--image--m)));
  margin-block-end:     var(--image--mb, var(--image--my, var(--image--m)));
  margin-inline-start:  var(--image--ml, var(--image--mx, var(--image--m)));
  margin-inline-end:    var(--image--mr, var(--image--mx, var(--image--m)));
}

.image--ratio {
  aspect-ratio: var(--image--ratio);
  width: 100%;
}



!!!

---

## indent.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/indent/indent.css`


!!!css
/**
 * src/design/typography/components/indent/indent.css
 */
.indent {
  --indent--size: 0;
  text-indent: var(--indent--size);
}

!!!

---

## indicator.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/indicator/indicator.css`


!!!css

!!!

---

## inline.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/inline/inline.css`


!!!css
.inline {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  vertical-align: middle;
  gap: var(--inline--gap);
  /* Trick to prevent the inline elements from breaking onto a new line independently */
  white-space: nowrap;
}

.inline > * {
  /* Restore normal wrapping for child elements that might contain long text */
  white-space: normal;
}



!!!

---

## input-group.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input-group/input-group.css`


!!!css

!!!

---

## input.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/input/input.css`


!!!css
/* ============================================================
   input.css
   ─────────────────────────────────────────────────────────────
   Input-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
   The Input component renders a two-element structure:

     <div class="form input form--outlined …">  ← visual container
       <div class="input__start">…</div>         ← start slot (optional)
       <input class="input__control" />           ← semantic control
       <div class="input__end">…</div>            ← end slot (optional)
     </div>

   The wrapper (.input) owns all visual chrome — border, background,
   border-radius — via the shared .form variant rules in forms.css.
   The inner .input__control is transparent and has no border; it
   inherits font-size, color, and padding from the wrapper.

   WHY THE INNER INPUT IS TRANSPARENT
   ──────────────────────────────────────────────────────────────
   The start and end slots must appear INSIDE the visual border.
   If the <input> had its own border, icons would sit outside it.
   Instead, the wrapper div is the "visible field" and the <input>
   fills the remaining space as a transparent, borderless element.
   ============================================================ */

/* ─── WRAPPER ──────────────────────────────────────────────── */

.input {
  /* Cursor hint — clicking anywhere in the wrapper focuses the input */
  cursor: text;
}

/* ─── INNER CONTROL ────────────────────────────────────────── */

.input__control {
  /* Fill remaining horizontal space after slots */
  flex: 1;
  min-inline-size: 0; /* prevents flex children from overflowing */

  /* Inherit all visual properties from wrapper — the control is invisible */
  background:  transparent;
  border:      none;
  outline:     none;
  color:       inherit;
  font-size:   inherit;
  font-family: inherit;
  line-height: inherit;

  /* Remove all browser-default padding and margin */
  padding: 0;
  margin:  0;

  /* Suppress native appearance on iOS/Safari */
  appearance:         none;
  -webkit-appearance: none;
}

/* Placeholder text — muted, not a substitute for a label */
.input__control::placeholder {
  color:   var(--text--tertiary, var(--text--secondary));
  opacity: 1; /* Firefox sets opacity < 1 on placeholders by default */
}

/* Suppress the native focus ring — focus is shown on the wrapper via :focus-within */
.input__control:focus,
.input__control:focus-visible {
  outline: none;
  box-shadow: none;
}

/* Suppress Chrome autofill background and text color changes */
.input__control:-webkit-autofill,
.input__control:-webkit-autofill:hover,
.input__control:-webkit-autofill:focus,
.input__control:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: var(--text--primary);
}

/* Number input — hide browser spinner arrows */
.input__control[type="number"]::-webkit-inner-spin-button,
.input__control[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.input__control[type="number"] {
  -moz-appearance: textfield;
}

/* Search input — hide native clear button (we provide our own via end slot) */
.input__control[type="search"]::-webkit-search-cancel-button,
.input__control[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none;
}

/* Password input — hide native reveal button on Edge/IE */
.input__control[type="password"]::-ms-reveal {
  display: none;
}

/* ─── START / END SLOTS ────────────────────────────────────── */

.input__start,
.input__end {
  display:     flex;
  align-items: center;
  flex-shrink: 0;

  /* Muted color by default; components inside can override */
  color: var(--text--secondary);

  /* Prevent the slot from intercepting clicks meant for the input */
  pointer-events: none;
}

/* Re-enable pointer events on interactive elements inside slots
   (e.g. a password-reveal button, a clear button) */
.input__end button,
.input__end a,
.input__start button,
.input__start a {
  pointer-events: auto;
  cursor: pointer;
}

/* ─── READONLY STATE ───────────────────────────────────────── */
/* Distinct from disabled: the field is focusable, its value is
   submitted, but the user cannot edit it. */

.input:has(.input__control[readonly]) {
  cursor: default;
}

.input__control[readonly]::placeholder {
  /* Readonly fields typically don't have placeholder text, but if set,
     show it at the same muted level */
  color: var(--text--tertiary, var(--text--secondary));
}
!!!

---

## kbd.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/kbd/kbd.css`


!!!css
/* design/typography/components/kbd/kbd.css */
.kbd {
  display: inline-flex;
  align-items: center;
  gap: 0.25em;
  font-family: var(--mono);
  font-size: var(--fs--xs);
  line-height: 1;
  padding: var(--space-in--3xs) var(--space-in--sm);
  background: var(--bg--2);
  border: 1px solid var(--border--subtle);
  border-bottom-width: 2px;
  border-radius: var(--radius--xs);
  color: var(--text--secondary);
  white-space: nowrap;
}

!!!

---

## label.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/label/label.css`


!!!css
/* ============================================================
   label.css
   ─────────────────────────────────────────────────────────────
   Label-specific styles. Imported alongside typography.css.

   Label inherits all typography.css rules via the .typography
   class. This file adds only what is unique to Label:
   - Cursor affordance (clicking a label focuses its control)
   - Required indicator asterisk styling

   The fixed-size scale is handled at the token level
   (LABEL_TOKENS overrides size to use --fsf--* variables),
   not in CSS. typography.css reads var(--typography--size)
   and gets a fixed value when Label sets the channel.
   ============================================================ */

/* ─── WRAPPER ─────────────────────────────────────────────── */

.label {
  /* Signals to the user that clicking focuses the associated control */
  cursor: pointer;

  /* Display inline-flex so the asterisk sits flush next to the text */
  display: inline-flex;
  align-items: baseline;
  gap: 0.2em;
  letter-spacing: 0.05em;

  text-transform: uppercase;
  font-family: var(--family--sans);
  font-weight: var(--weight--semibold);
  color: var(--text--muted);
  font-size: var(--fsf--xl);
}

/* Standalone label (no associated control) should not show pointer */
.label:not([for]) {
  cursor: default;
}

/* ─── REQUIRED INDICATOR ──────────────────────────────────── */

.label__required {
  /* Danger-colored asterisk beside the label text */
  color:       var(--danger--text);
  font-weight: inherit;

  /* Slightly smaller than the label text to sit as a superscript-like marker */
  font-size: 0.85em;
  line-height: 1;

  /* aria-hidden="true" is set in Label.astro — screen readers skip this.
     Sighted users see the asterisk; screen readers hear aria-required on
     the control. */
  user-select: none;
}
!!!

---

## lightbox.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/lightbox/lightbox.css`


!!!css

!!!

---

## link.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/link/link.css`


!!!css
/* ============================================================
   link.css
   ─────────────────────────────────────────────────────────────
   Visual styles for the Link component.
   Since Link extends Typography, most base styling (font, color)
   is handled by the typography system. Here we manage the
   interactive behaviors and underline states.
   ============================================================ */

.link {
  display: inline-flex;
  align-items: center;
  gap: 0.375em;
  text-decoration: none;
  cursor: pointer;
  /* Smooth transition for color changes on hover, assuming typography handles the initial color */
  transition:
    color var(--transition--fast, 0.2s ease),
    text-decoration-color var(--transition--fast, 0.2s ease);
}

/* ─── UNDERLINE VARIANTS ──────────────────────────────────── */

.link--underline-always {
  text-decoration: underline;
  text-underline-offset: 0.2em; /* Gives breathing room to the text */
}

.link--underline-hover:hover,
.link--underline-hover:focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.link--underline-never {
  text-decoration: none !important;
}

/* ─── FOCUS OUTLINE ───────────────────────────────────────── */

.link:focus-visible {
  outline: 2px solid var(--color--focus, currentColor);
  outline-offset: 2px;
  border-radius: 2px; /* Small radius for a softer focus ring */
}

!!!

---

## list.css


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/list/list.css`


!!!css
/* ============================================================
   list.css
   ─────────────────────────────────────────────────────────────
   Styles for the List component.

   HTML STRUCTURE (data-driven)
   ──────────────────────────────────────────────────────────────
   <ul class="data list [list--vertical] [data-modifiers]">
     <li class="list__item [list__item--disabled]">
       <!-- optional: checkbox -->
       <span class="list__icon" aria-hidden="true">…</span>
       <span class="list__content">
         <span class="list__label">…</span>
         <span class="list__description">…</span>   <!-- optional -->
       </span>
       <span class="list__badge">…</span>            <!-- optional -->
     </li>
     <!-- nested -->
     <li class="list__item">
       …
       <ul class="list list__nested">…</ul>
     </li>
   </ul>

   When item has href: item content is wrapped in <a class="list__link">.
   When item has checkState: <Checkbox> replaces the icon position.

   CHANNEL MAP
   ──────────────────────────────────────────────────────────────
   Set on root by useData:
     --data--size              Density (item padding / gap)
     --data--color--*          Accent: separators, hover, text highlights
     --data--bg--*             Background tint: container, striped items
     --data--highlight--*      Highlighted / active item accent

   MODIFIER CLASSES — root (.list)
   ──────────────────────────────────────────────────────────────
   Variants (data.css):  .data--outlined  .data--soft  .data--elevated
   Layout:               .list--vertical  .list--horizontal
   Visual:               .data--striped   .data--bordered

   DATA ATTRIBUTES
   ──────────────────────────────────────────────────────────────
   [data-loading]       Skeleton shimmer on items
   [data-interactive]   Hover + pointer on items
   [data-selectable]    Checkbox column on items
   [data-scrollable]    overflow-y: auto (list scrolls vertically)

   ADJUSTING PROPS
   ──────────────────────────────────────────────────────────────
   color       [./list.css]  var(--data--color--*) in separators, hover, links
   bg          [./list.css]  var(--data--bg--*) in striped items, container tint
   highlight   [./list.css]  var(--data--highlight--*) on .list__item--highlighted
   variant     [./data.css]  plain | outlined | soft | elevated — on .list root
   size        [./list.css]  calc(var(--data--size) * N) on item padding/gap
   caption     [./List.astro] renders as <p class="list__caption"> above list
   loading     [./list.css]  .list[data-loading] .list__item skeleton shimmer
   empty       [./list.css]  .data__empty — adjust in list.css or data.css
   striped     [./list.css]  .data--striped .list__item:nth-child(even)
   bordered    [./list.css]  .data--bordered .list__item + .list__item
   interactive [./list.css]  .list[data-interactive] .list__item
   selectable  [./list.css]  .list[data-selectable] — checkbox column
   scrollable  [./data.css]  overflow-y: auto (list scrolls vertically)
   ordered     [./List.astro] switches tag to <ol> — no CSS to adjust
   orientation [./list.css]  .list--horizontal flex-direction/wrap
   ============================================================ */

/* ─── RESET ─────────────────────────────────────────────────── */

.list {
  list-style: none;
  margin:     0;
  padding:    0;
}

/* ─── ORIENTATION ───────────────────────────────────────────── */

.list--vertical {
  display: flex;
  flex-direction: column;
}

.list--horizontal {
  display:   flex;
  flex-wrap: wrap;
  gap:       calc(var(--data--size, var(--space-in--sm)) * 0.75);
}

/* ─── ITEMS ─────────────────────────────────────────────────── */

.list__item {
  display:     flex;
  align-items: center;
  gap:         calc(var(--data--size, var(--space-in--sm)) * 0.75);
  padding:     calc(var(--data--size, var(--space-in--sm)) * 0.75)
               calc(var(--data--size, var(--space-in--sm)) * 1);
  box-sizing:  border-box;
}

.list__item--disabled {
  opacity:        var(--opacity--disabled, 0.42);
  pointer-events: none;
}

/* ─── ITEM CONTENT ──────────────────────────────────────────── */

.list__content {
  display:    flex;
  flex:       1;
  flex-direction: column;
  gap:        calc(var(--data--size, var(--space-in--sm)) * 0.2);
  min-width:  0; /* allow text to truncate */
}

.list__label {
  font-size:   calc(var(--data--size, var(--space-in--sm)) * 0.875);
  line-height: var(--leading--snug);
  color:       var(--text--primary);
}

.list__description {
  font-size:  calc(var(--data--size, var(--space-in--sm)) * 0.75);
  color:      var(--text--secondary);
  line-height: var(--leading--snug);
}

/* ─── ICON ───────────────────────────────────────────────────── */

.list__icon {
  flex-shrink:  0;
  color:        var(--data--color--base, var(--text--secondary));
  width:        calc(var(--data--size, var(--space-in--sm)) * 1);
  height:       calc(var(--data--size, var(--space-in--sm)) * 1);
  display:      flex;
  align-items:  center;
  justify-content: center;
}

/* ─── BADGE ──────────────────────────────────────────────────── */

.list__badge {
  flex-shrink:     0;
  margin-inline-start: auto;
  font-size:       calc(var(--data--size, var(--space-in--sm)) * 0.7);
  font-weight:     var(--weight--medium);
  color:           var(--text--secondary);
  background:      var(--data--color--subtle, var(--bg--2));
  padding-block:   calc(var(--data--size, var(--space-in--sm)) * 0.15);
  padding-inline:  calc(var(--data--size, var(--space-in--sm)) * 0.45);
  border-radius:   var(--radius--full);
  line-height:     1;
}

/* ─── LINK ITEMS ─────────────────────────────────────────────── */

.list__link {
  display:     flex;
  align-items: center;
  gap:         inherit;
  flex:        1;
  text-decoration: none;
  color:       inherit;
}

.list__link:hover {
  color: var(--data--color--text, var(--primary--text));
}

/* ─── NESTED LIST ────────────────────────────────────────────── */

.list__nested {
  padding-inline-start: calc(var(--data--size, var(--space-in--sm)) * 1.5);
  width: 100%;
}

/* ─── STRIPED ────────────────────────────────────────────────── */

.data--striped .list__item:nth-child(even) {
  background-color: var(--bg--subtle, var(--bg--2));
}

/* ─── BORDERED ───────────────────────────────────────────────── */

.data--bordered .list__item + .list__item {
  border-top: 1px solid var(--data--color--border, var(--border--default));
}

/* ─── HIGHLIGHTED ITEMS ──────────────────────────────────────── */

.list__item--highlighted {
  background-color:       var(--data--highlight--subtle);
  border-inline-start:    3px solid var(--data--highlight--base);
  padding-inline-start:   calc(var(--data--size, var(--space-in--sm)) * 1 - 3px);
}

/* ─── INTERACTIVE ────────────────────────────────────────────── */

.list[data-interactive] .list__item {
  cursor:     pointer;
  transition: background-color var(--transition--fast, 150ms ease);
}

.list[data-interactive] .list__item:hover:not(.list__item--disabled) {
  background-color: var(--data--color--subtle, var(--bg--2));
}

/* ─── SELECTABLE ─────────────────────────────────────────────── */

.list[data-selectable] .list__item {
  cursor: pointer;
}

/* ─── SCROLLABLE ─────────────────────────────────────────────── */
/* List scrolls vertically — override data.css overflow: auto axis */

.list[data-scrollable] {
  overflow-x: visible;
  overflow-y: auto;
}

/* ─── LOADING SKELETON ───────────────────────────────────────── */

.list[data-loading] .list__item {
  pointer-events: none;
}

.list[data-loading] .list__label,
.list[data-loading] .list__description,
.list[data-loading] .list__badge,
.list[data-loading] .list__icon {
  position:   relative;
  overflow:   hidden;
  color:      transparent;
  background: var(--bg--2);
  border-radius: var(--radius--sm);
  animation:  list--skeleton 1.5s ease-in-out infinite;
}

@keyframes list--skeleton {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1;   }
}

/* ─── REDUCED MOTION ─────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .list[data-loading] .list__label,
  .list[data-loading] .list__description,
  .list[data-loading] .list__badge,
  .list[data-loading] .list__icon {
    animation: none;
  }

  .list[data-interactive] .list__item {
    transition: none;
  }
}
!!!

---

## item/m-item.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/item/m-item.css`


!!!css
.menu__item-wrapper {
  display: block;
}

.menu__item-wrapper .nav__item {
  width: 100%;
  justify-content: flex-start;
  text-align: left;
}

.menu__icon {
  flex-shrink: 0;
  width: 1.25em;
  height: 1.25em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.menu__icon svg {
  width: 100%;
  height: 100%;
}

!!!

---

## menu.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/menu/menu.css`


!!!css
.menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: fit-content;
}

.menu__list {
  display: flex;
  flex-direction: column;
  gap: inherit;
  margin: 0;
  padding: 0;
  list-style: none;
}

.menu--indent .menu__list .menu__list {
  padding-inline-start: 1.5rem;
  margin-top: 0.25rem;
}



!!!

---

## metric.css


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/metric/metric.css`


!!!css
.metric {
  display: flex;
  flex-direction: column;
  gap: calc(var(--data--size) * 0.5);
  padding: var(--data--size); /* usually metrics are cards, padding them makes sense */
}

.metric__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-in--md);
}

.metric__label {
  font-size: var(--fs--sm);
  font-weight: 500;
  color: var(--text--default);
}

.metric__value-group {
  display: flex;
  align-items: baseline;
  gap: var(--space-in--sm);
}

.metric__value {
  font-size: calc(var(--data--size) * 2);
  line-height: 1;
  font-weight: 600;
  color: var(--data--color--text, var(--text--default));
  letter-spacing: -0.01em;
}

.metric__trend {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--fs--sm);
  font-weight: 500;
}

.metric__trend--up {
  color: var(--success--text);
}

.metric__trend--down {
  color: var(--danger--text);
}

.metric__trend--neutral {
  color: var(--text--muted);
}

.metric__description {
  font-size: var(--fs--sm);
  color: var(--text--muted);
  line-height: 1.5;
}

.metric[data-loading] .metric__header,
.metric[data-loading] .metric__value-group,
.metric[data-loading] .metric__description {
  opacity: 0.7; /* handled visually by skeleton */
}

!!!

---

## modal.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/modal/modal.css`


!!!css
/* modal.css — reads from overlays.css shared rules */
/* Component-specific overrides live here; shared chrome is in overlays.css */

/* Modal-only: visible scroll on tall body content */
.modal .modal__body {
  overscroll-behavior: contain;
}

!!!

---

## multiselect.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/multiselect/multiselect.css`


!!!css

!!!

---

## navbar.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/navbar/navbar.css`


!!!css
.navbar {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: var(--bg--1);
  border-bottom: 1px solid var(--border--default);
  z-index: 40;
}

.navbar[data-sticky="true"] {
  position: sticky;
  top: 0;
}

.navbar[data-glass="true"] {
  background-color: var(--bg--1-glass);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.navbar__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem;
  min-height: 4rem;
}

/* Base structural flex classes for content */
.navbar__brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.navbar__content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Responsive Hamburger Toggle */
.navbar__toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text--primary);
}

.navbar__toggle svg {
  width: 1.5rem;
  height: 1.5rem;
}

@media (max-width: 768px) {
  .navbar__toggle {
    display: flex;
  }
  
  /* Hide non-mobile content on small screens by default */
  .navbar__content[data-hide-on-mobile="true"] {
    display: none;
  }
  
  /* When the wrapper indicates menu is open, show it as a vertical stack */
  dezign8-navbar[data-menu-open="true"] .navbar__content[data-hide-on-mobile="true"] {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg--2);
    border-bottom: 1px solid var(--border--default);
    padding: 1rem;
    align-items: flex-start;
  }
}

!!!

---

## number-input.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/number-input/number-input.css`


!!!css

!!!

---

## pagination.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/pagination/pagination.css`


!!!css
.pagination {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.pagination .nav__list {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.pagination .nav__item {
  min-width: 2.25em; /* Create more square hit targets for numbers */
  text-align: center;
  justify-content: center;
}

/* Controls (arrows) need slightly less min-width usually */
.pagination__control.nav__item {
  min-width: unset;
}

.pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.5em;
  color: var(--text--muted);
  pointer-events: none;
  user-select: none;
}

!!!

---

## panel.css


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/panel/panel.css`


!!!css
/* design/surfaces/components/panel/panel.css */
.panel {
  display: block;
  /* Basic visual shell for expandable/collapsible areas */
}

!!!

---

## paper.css


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/paper/paper.css`


!!!css
/* ============================================================
   paper.css
   ─────────────────────────────────────────────────────────────
   Paper-specific layout. Visual chrome comes from surface.css.

   CHANNEL MAP
   ──────────────────────────────────────────────────────────────
   --paper--gap     Written when stack=true. Controls flex gap.
                    Undefined when stack=false — no channel written.

   MODIFIER CLASSES
   ──────────────────────────────────────────────────────────────
   .paper--stack        Vertical flex container with gap
   .paper--full-width   Fills container inline axis
   ============================================================ */

.paper {
  display: block;
}

.paper--stack {
  display:        flex;
  flex-direction: column;
  gap:            var(--paper--gap);
}

.paper--full-width {
  width: 100%;
}

!!!

---

## popover.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/popover/popover.css`


!!!css
/* ============================================================
   popover.css
   ─────────────────────────────────────────────────────────────
   Non-modal floating panel using the HTML Popover API.
   The panel element uses popover="auto" — the browser handles
   top-layer promotion, light dismiss, and Escape-to-close.
   JS positions it via getBoundingClientRect() on the toggle event.
   ============================================================ */

/* ── host wrapper ──────────────────────────────────────────── */

.popover {
  position:    relative;
  display:     inline-flex;
  align-items: stretch;
}

/* ── panel ─────────────────────────────────────────────────── */

.popover__panel {
  /* override UA [popover] defaults so JS top/left drive placement */
  position: fixed;
  inset:    auto;
  margin:   0;

  padding:          var(--space-in--sm) var(--space-in--md);
  background-color: var(--bg--2);
  border:           1px solid var(--border--default);
  border-radius:    var(--popover--radius, var(--radius--lg));
  box-shadow:       var(--shadow--lg);
  color:            var(--text--primary);
  min-width:        10rem;
}

/* ── entry animation ────────────────────────────────────────── */

.popover__panel {
  transition:
    opacity   120ms ease allow-discrete,
    transform 120ms ease allow-discrete,
    display   120ms ease allow-discrete;
}

.popover__panel:popover-open {
  opacity:   1;
  transform: none;
}

@starting-style {
  .popover__panel:popover-open {
    opacity:   0;
    transform: scale(0.97) translateY(-4px);
  }
}

!!!

---

## portal.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/portal/portal.css`


!!!css

!!!

---

## progress.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/progress/progress.css`


!!!css
/* design/feedback/progress/progress.css */

/**
 * Progress component styles.
 *
 * This file owns:
 *   1. Base .progress layout (flex column, gap between label/track/value)
 *   2. Type-specific structures (bar, ring, number, percent)
 *   3. Size maps for each type
 *   4. Fill animation (bar and ring)
 *   5. Indeterminate shimmer (bar) and rotating arc (ring)
 *   6. Reduced-motion overrides
 *
 * CSS custom properties written by useProgress + feedback.css:
 *   --progress--fill           fill percentage (0–100%)
 *   --progress--offset         ring stroke-dashoffset value
 *   --progress--circumference  ring full stroke-dasharray value
 *   --feedback--color-subtle   track background
 *   --feedback--color-base     fill color
 *   --feedback--color-text     number/percent text color
 */

/* ─── Base Progress ──────────────────────────────────────────────────────── */

.progress {
  display:        flex;
  flex-direction: column;
  gap:            0.5em;
  width:          100%;
  /* Override feedback base — progress is block, not inline-flex */
  border:         none;
  border-radius:  0;
  background:     transparent;
}

.progress__label {
  font-size:   var(--fsf--sm, 12px);
  font-weight: var(--weight--medium, 500);
  color:       var(--text--secondary);
}

.progress__value {
  font-size:  var(--fsf--sm, 12px);
  font-weight: var(--weight--semibold, 600);
  color:      var(--feedback--color-text);
  text-align: right;
}

/* ─── Bar type ───────────────────────────────────────────────────────────── */

.progress--bar .progress__track {
  width:            100%;
  height:           var(--progress--track-height, 6px);
  border-radius:    var(--feedback--radius, var(--radius--full));
  background-color: var(--feedback--color-subtle);
  overflow:         hidden;
  position:         relative;
}

.progress--bar .progress__fill {
  height:           100%;
  width:            var(--progress--fill, 0%);
  border-radius:    inherit;
  background-color: var(--feedback--color-base);
  transition:       width 400ms ease;
}

/* Bar size map — track height */
.feedback--xs.progress--bar .progress__track  { --progress--track-height: 2px;  }
.feedback--sm.progress--bar .progress__track  { --progress--track-height: 4px;  }
.feedback--md.progress--bar .progress__track  { --progress--track-height: 6px;  }
.feedback--lg.progress--bar .progress__track  { --progress--track-height: 10px; }
.feedback--xl.progress--bar .progress__track  { --progress--track-height: 16px; }

/* Bar indeterminate — shimmer sweep */
.progress--bar.progress--indeterminate .progress__fill {
  width:      40%;
  animation:  progress-shimmer 1.4s ease-in-out infinite;
}

@keyframes progress-shimmer {
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}

/* ─── Ring type ──────────────────────────────────────────────────────────── */

.progress--ring {
  width:  fit-content;
  align-items: center;
}

.progress__ring {
  display:     block;
  width:       var(--progress--ring-size, 40px);
  height:      var(--progress--ring-size, 40px);
  flex-shrink: 0;
}

.progress__track {
  stroke:       var(--feedback--color-subtle);
  fill:         none;
}

.progress__ring .progress__fill {
  stroke:           var(--feedback--color-base);
  fill:             none;
  transition:       stroke-dashoffset 400ms ease;
}

/* Ring size map */
.feedback--xs.progress--ring .progress__ring { --progress--ring-size: 24px; }
.feedback--sm.progress--ring .progress__ring { --progress--ring-size: 32px; }
.feedback--md.progress--ring .progress__ring { --progress--ring-size: 40px; }
.feedback--lg.progress--ring .progress__ring { --progress--ring-size: 56px; }
.feedback--xl.progress--ring .progress__ring { --progress--ring-size: 80px; }

/* Ring indeterminate — rotating arc */
.progress--ring.progress--indeterminate .progress__ring {
  animation: progress-ring-spin 1.4s linear infinite;
}

@keyframes progress-ring-spin {
  to { transform: rotate(360deg); }
}

/* ─── Number + Percent types ─────────────────────────────────────────────── */

.progress--number,
.progress--percent {
  width:        fit-content;
  align-items:  center;
  border:       none;
  background:   transparent;
}

.progress__number {
  font-size:   var(--progress--number-size, var(--fsf--3xl, 24px));
  font-weight: var(--weight--bold, 700);
  font-variant-numeric: tabular-nums;
  line-height: 1;
  color:       var(--feedback--color-base);
}

.progress__denom {
  font-size:   0.6em;
  font-weight: var(--weight--medium, 500);
  color:       var(--text--secondary);
  margin-left: 0.1em;
}

/* Number/Percent size map */
.feedback--xs.progress--number .progress__number,
.feedback--xs.progress--percent .progress__number { --progress--number-size: var(--fsf--xl,  18px); }

.feedback--sm.progress--number .progress__number,
.feedback--sm.progress--percent .progress__number { --progress--number-size: var(--fsf--2xl, 20px); }

.feedback--md.progress--number .progress__number,
.feedback--md.progress--percent .progress__number { --progress--number-size: var(--fsf--3xl, 24px); }

.feedback--lg.progress--number .progress__number,
.feedback--lg.progress--percent .progress__number { --progress--number-size: var(--fsf--4xl, 28px); }

.feedback--xl.progress--number .progress__number,
.feedback--xl.progress--percent .progress__number { --progress--number-size: clamp(2.5rem, 8vw, 4.5rem); }

/* ─── Reduced motion ──────────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .progress--bar .progress__fill,
  .progress__ring .progress__fill {
    transition: none;
  }

  .progress--bar.progress--indeterminate .progress__fill {
    animation: none;
    width:     50%;
    opacity:   0.6;
  }

  .progress--ring.progress--indeterminate .progress__ring {
    animation: none;
    opacity:   0.6;
  }
}

!!!

---

## prose.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/prose/prose.css`


!!!css
/* ============================================================
   prose.css
   ─────────────────────────────────────────────────────────────
   Prose wraps raw HTML/MDX — inner elements have no component
   classes, so descendant selectors apply design-system defaults.

   Split into two concerns:
   1. Prose-context spacing/layout (--prose--* channels, margins)
   2. Raw-element channel defaults — sets --typography--* on bare
      tags the same way heading.css/link.css/quote.css do for
      their classed counterparts. Only prose-appropriate overrides
      go here; standalone component defaults are not duplicated.

   Component CSS files (heading.css, link.css, code.css, quote.css)
   are imported by Prose.astro so their class rules are available
   if MDX ever emits classed elements.
   ============================================================ */

.prose {
  /* ─── PROSE CHANNELS ──────────────────────────────────────── */
  --prose--max-width:         65ch;
  --prose--gap:               var(--space-in--md);
  --prose--gap-heading:       var(--space-in--lg);
  --prose--gap-heading-after: var(--space-in--xl);
  --prose--indent:            var(--space-in--xl);
  --prose--font:               var(--fs--md);
}

/* ─── READING WIDTH ───────────────────────────────────────── */

.prose > p,
.prose > ul,
.prose > ol {
  max-width: var(--prose--max-width);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * HEADINGS  (mirrors heading.css defaults; scoped to prose context)
 * Raw h1–h6 from MDX get no .h--N class, so we apply the same channel values.
 * ─────────────────────────────────────────────────────────────────────────── */

.prose :is(h1, h2, h3, h4, h5, h6) {
  --typography--color:   var(--text--subtle);
  --typography--leading: var(--leading--tight);
  --typography--tracking: var(--tracking--tight);
  margin-block-start: var(--prose--gap-heading);
  margin-block-end:   var(--prose--gap-heading-after);
}

.prose > :is(h1, h2, h3, h4, h5, h6):first-child {
  margin-block-start: 0;
}

/* .prose h1 {
  --typography--size:    var(--fs--4xl);
  --typography--weight:  var(--weight--bold);
  --typography--leading: var(--leading--snug);
}

.prose h2 {
  --typography--size:    var(--fs--3xl);
  --typography--weight:  var(--weight--bold);
  --typography--leading: var(--leading--snug);
  border-block-end:  1px solid var(--border--subtle);
  padding-block-end: 0.3em;
}

.prose h3 {
  --typography--size:    var(--fs--2xl);
  --typography--weight:  var(--weight--semibold);
  --typography--leading: var(--leading--normal);
}

.prose h4 {
  --typography--size:    var(--fs--xl);
  --typography--weight:  var(--weight--semibold);
  --typography--leading: var(--leading--snug);
  --typography--tracking: var(--tracking--normal);
}

.prose h5 {
  --typography--size:    var(--fs--lg);
  --typography--weight:  var(--weight--semibold);
  --typography--leading: var(--leading--snug);
  --typography--tracking: var(--tracking--normal);
}

.prose h6 {
  --typography--size:    var(--fs--md);
  --typography--weight:  var(--weight--semibold);
  --typography--leading: var(--leading--normal);
  --typography--tracking: var(--tracking--normal);
} */

/* ─────────────────────────────────────────────────────────────────────────────
 * PARAGRAPHS
 * ─────────────────────────────────────────────────────────────────────────── */

.prose p {
  margin-block-start: 0;
  margin-block-end:   var(--prose--gap);
  /* line-height:        var(--leading--normal); */
  font-size:          var(--prose--font);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * LINKS  (mirrors link.css defaults for unstyled <a> tags in MDX)
 * ─────────────────────────────────────────────────────────────────────────── */

.prose a:not(.link) {
  --typography--color:  var(--primary--base);
  --typography--weight: var(--weight--medium);
  text-decoration: none;
  cursor: pointer;
  transition:
    color var(--transition--fast, 0.2s ease),
    text-decoration-color var(--transition--fast, 0.2s ease);
}

.prose a:not(.link):hover,
.prose a:not(.link):focus-visible {
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.prose a:not(.link):focus-visible {
  outline: 2px solid var(--color--focus, currentColor);
  outline-offset: 2px;
  border-radius: 2px;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * LISTS
 * ─────────────────────────────────────────────────────────────────────────── */

.prose :is(ul, ol) {
  margin-block-start:   0;
  margin-block-end:     var(--prose--gap);
  padding-inline-start: var(--prose--indent);
  font-size:            var(--prose--font, var(--fs--sm));
}

.prose li {
  margin-block-end: var(--space-in--sm);
}

.prose li > p {
  margin-block-end: var(--space-in--sm);
}

.prose ul > li { list-style-type: disc; }
.prose ol > li { list-style-type: decimal; }

/* ─────────────────────────────────────────────────────────────────────────────
 * BLOCKQUOTES  (mirrors quote.css .quote--block for unstyled <blockquote>)
 * ─────────────────────────────────────────────────────────────────────────── */

.prose blockquote:not(.quote) {
  --typography--color: var(--text--secondary, inherit);
  --typography--style: italic;
  padding:             var(--space-in--xl) var(--space-in--xl) var(--space-in--xl) var(--space-in--xl);
  border-inline-start: 4px solid var(--border--default);
  background:          var(--bg--2);
  border-radius:       0 var(--radius--md) var(--radius--md) 0;
  margin-block:        var(--prose--gap);
}

.prose blockquote:not(.quote) > p:last-child {
  margin-block-end: 0;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * TABLES
 * ─────────────────────────────────────────────────────────────────────────── */

.prose table {
  width:           100%;
  border-collapse: collapse;
  margin-block:    var(--prose--gap);
  --typography--size: var(--fs--sm);
}

.prose :is(th, td) {
  text-align:       start;
  padding:          var(--space-in--lg) var(--space-in--md);
  border-block-end: 1px solid var(--border--subtle);
  vertical-align:   top;
}

.prose th {
  background:              var(--bg--2);
  --typography--weight:    var(--weight--semibold);
  --typography--color:     var(--text--secondary);
  --typography--transform: uppercase;
  --typography--tracking:  var(--tracking--wide);
  --typography--size:      var(--fs--xs);
}

.prose tr:last-child td {
  border-block-end: none;
}

.prose tbody tr:hover {
  background: var(--bg--2);
}

/* ─────────────────────────────────────────────────────────────────────────────
 * MEDIA
 * ─────────────────────────────────────────────────────────────────────────── */

.prose :is(img, video) {
  max-width:     100%;
  height:        auto;
  border-radius: var(--radius--md);
  margin-block:  var(--image--m, var(--image--my, var(--image--mb, var(--image--mt))));
  box-shadow:    var(--shadow--sm);
}

.prose hr {
  border:             none;
  border-block-start: 1px solid var(--border--subtle);
  margin-block:       var(--prose--gap-heading);
}

!!!

---

## quote.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/quote/quote.css`


!!!css
/* ============================================================
   quote.css
   ─────────────────────────────────────────────────────────────
   Fallback variables for Quote components.
   ============================================================ */

.quote {
  /* All quotes render italic by default */
  --typography--style: italic;
}

/* ─── MODIFIERS ───────────────────────────────────────────── */

.quote--block {
  /* Standard quotes are slightly subdued and have visual boundaries */
  --typography--color: var(--text--layer-2);
  padding:             var(--space-out--sm) var(--space-out--md);
  border-inline-start: 4px solid var(--border--primary);
  background:          var(--bg--2-glass);
  border-radius:       0 var(--radius--xs) var(--radius--xs) 0;
  width:               100%;
}

.quote--block > :last-child {
  margin-block-end: 0;
}

.quote--pull {
  /* Pull quotes are prominent and stand out */
  --typography--size: var(--fs--xl);
  --typography--weight: var(--weight--medium);
  --typography--color: var(--text--secondary);
  --typography--align: center;
  --typography--wrap: balance;
  --typography--style: oblique;
  padding:             var(--space-out--sm) var(--space-out--md);
  background: var(--bg--1-glass);
}

.quote--pull > :last-child {
  margin-block-end: 0;
}

.quote--inline {
  --typography--style: oblique;
  --typography--color: var(--neutral--text);
}

!!!

---

## radio-group.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio-group/radio-group.css`


!!!css
/* ============================================================
   radio-group.css
   ─────────────────────────────────────────────────────────────
   RadioGroup-specific styles.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <dezign8-radio-group class="radio-group radio-group--vertical">
       <fieldset class="radio-group__fieldset">
         <legend class="radio-group__legend">Group label</legend>
         <div class="radio-group__options">
           <slot />
         </div>
       </fieldset>
     </dezign8-radio-group>

   Custom elements are inline by default — reset to block.
   ============================================================ */

dezign8-radio-group {
  display: block;
}

/* ─── FIELDSET RESET ────────────────────────────────────────── */

.radio-group__fieldset {
  border:           none;
  padding:          0;
  margin:           0;
  /* Fieldset has a browser-default min-inline-size that breaks flex layouts */
  min-inline-size:  0;
}

/* ─── LEGEND ────────────────────────────────────────────────── */

.radio-group__legend {
  display:          block;
  font-size:        var(--text--sm, 0.875rem);
  font-weight:      var(--font-weight--medium, 500);
  color:            var(--text--secondary);
  padding:          0;
  margin-block-end: var(--space--2, 0.5rem);
}

/* ─── OPTIONS CONTAINER ─────────────────────────────────────── */

.radio-group__options {
  display:        flex;
  flex-direction: column;
  gap:            var(--space--2, 0.5rem);
}

/* ─── LAYOUT MODIFIER ───────────────────────────────────────── */

.radio-group--horizontal .radio-group__options {
  flex-direction: row;
  flex-wrap:      wrap;
  gap:            var(--space--4, 1rem);
}

!!!

---

## radio.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/radio/radio.css`


!!!css
/* ============================================================
   radio.css
   ─────────────────────────────────────────────────────────────
   Radio-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <label class="form radio radio--end …">    ← wrapper (<label>)
       <input class="radio__control" />           ← hidden native input
       <span  class="radio__indicator" />         ← custom visual circle
       <span  class="radio__label">…</span>       ← label slot content
     </label>

   DIFFERENCES FROM CHECKBOX
   ──────────────────────────────────────────────────────────────
   - Indicator is a circle (border-radius: 50%)
   - Selected state shows a filled inner dot, not a checkmark
   - No indeterminate state — radio buttons are always on or off
   - Indicator radius is always 50% regardless of --form--radius
     (the wrapper's radius still reads --form--radius for chip style)

   All other patterns (sizing, label position, focus, disabled) are
   identical to checkbox.css.
   ============================================================ */

/* ─── WRAPPER ─────────────────────────────────────────────── */

.radio {
  min-block-size: unset;
  padding:        calc(var(--form--size, 2.5rem) * 0.15);
  gap:            calc(var(--form--size, 2.5rem) * 0.3);
  flex-direction: row;
  align-items:    center;
  cursor:         pointer;
  user-select:    none;
}

/* ─── HIDDEN NATIVE INPUT ─────────────────────────────────── */

.radio__control {
  position:       absolute;
  opacity:        0;
  width:          0;
  height:         0;
  pointer-events: none;
  margin:         0;
}

/* ─── CUSTOM INDICATOR ────────────────────────────────────── */

.radio__indicator {
  flex-shrink: 0;

  width:  calc(var(--form--size, 2.5rem) * 0.45);
  height: calc(var(--form--size, 2.5rem) * 0.45);

  display:         grid;
  place-items:     center;

  /* Always a circle — radio is always circular regardless of --form--radius */
  border-radius: 50%;
  border:        2px solid var(--border--strong, var(--border--default));
  background:    transparent;

  transition:
    background-color var(--transition--fast, 150ms ease),
    border-color     var(--transition--fast, 150ms ease);
}

/* Inner dot — initially invisible */
.radio__indicator::after {
  content: "";
  display: block;

  /* Proportional inner dot */
  width:         45%;
  height:        45%;
  border-radius: 50%;
  background:    transparent;

  transition:
    background-color var(--transition--fast, 150ms ease),
    transform        var(--transition--fast, 150ms ease);

  transform: scale(0);
}

/* ─── HOVER (unselected) ──────────────────────────────────── */

.radio:hover:not([data-disabled]) .radio__indicator {
  border-color: var(--form--color-border, var(--primary--border));
}

/* ─── SELECTED ────────────────────────────────────────────── */

.radio__control:checked ~ .radio__indicator {
  background-color: var(--form--color-base, var(--primary--base));
  border-color:     var(--form--color-base, var(--primary--base));
}

.radio__control:checked ~ .radio__indicator::after {
  background-color: var(--text--on-color, #fff);
  transform:        scale(1);
}

/* ─── FOCUS ───────────────────────────────────────────────── */

.radio__control:focus-visible ~ .radio__indicator {
  outline: none;
  box-shadow: 0 0 0 3px
    color-mix(in oklch, var(--form--color-base, var(--primary--base)) 30%, transparent);
}

/* ─── LABEL TEXT ─────────────────────────────────────────── */

.radio__label {
  font-size:   calc(var(--form--size, 2.5rem) * 0.35);
  line-height: 1.4;
  color:       inherit;
}

/* ─── LABEL POSITION MODIFIERS ───────────────────────────── */
/* Identical logic to checkbox — DOM order never changes */

.radio--end    { flex-direction: row; }
.radio--start  { flex-direction: row-reverse; justify-content: flex-end; }
.radio--top    { flex-direction: column-reverse; align-items: center; }
.radio--bottom { flex-direction: column; align-items: center; }

/* ─── INVALID STATE ───────────────────────────────────────── */

.radio[data-invalid] .radio__indicator {
  border-color: var(--danger--border);
}

/* ─── DISABLED STATE ──────────────────────────────────────── */

.radio[data-disabled] {
  cursor: default;
}

/* ─── REDUCED MOTION ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .radio__indicator,
  .radio__indicator::after {
    transition: none;
  }
}
!!!

---

## range-slider.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/range-slider/range-slider.css`


!!!css

!!!

---

## screen.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/screen/screen.css`


!!!css
/* design/layout/components/screen/screen.css */
.screen {
  display: flex;
  flex-direction: column;
  gap: var(--screen--gap);
  min-height: var(--screen--height);
  overflow: var(--screen--overflow);
  align-items: center;
  justify-content: center;
}

.screen.screen--centered-x {
  justify-content: center;
}

.screen.screen--centered-y {
  align-items: center;
}

!!!

---

## search.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/search/search.css`


!!!css
/* ============================================================
   search.css
   ─────────────────────────────────────────────────────────────
   Search-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <div class="form search …" data-search>
       <div class="search__start">…</div>   ← start slot (optional)
       <input class="search__control" />     ← text input
       <button class="search__clear" />      ← clear button (JS-controlled)
       <div class="search__spinner" />       ← loading spinner (CSS)
       <div class="search__end">…</div>      ← end slot (optional)
     </div>

   CLEAR BUTTON
   ──────────────────────────────────────────────────────────────
   The clear button is always rendered in the DOM but starts hidden
   via the HTML `hidden` attribute. The Search.astro script removes
   `hidden` when the input has a value, and restores it when empty.

   The loading state hides the clear button and shows the spinner
   instead — both occupy the same trailing position.

   SPINNER
   ──────────────────────────────────────────────────────────────
   A CSS-only spinner driven by data-loading on the wrapper.
   Uses a rotating border trick with the role's color.
   ============================================================ */

/* ─── WRAPPER ─────────────────────────────────────────────── */

.search {
  cursor: text;
}

/* ─── INNER CONTROL ────────────────────────────────────────── */

.search__control {
  flex: 1;
  min-inline-size: 0;

  background:  transparent;
  border:      none;
  outline:     none;
  color:       inherit;
  font-size:   inherit;
  font-family: inherit;
  line-height: inherit;
  padding:     0;
  margin:      0;

  appearance:         none;
  -webkit-appearance: none;
}

.search__control::placeholder {
  color:   var(--text--tertiary, var(--text--secondary));
  opacity: 1;
}

.search__control:focus,
.search__control:focus-visible {
  outline: none;
  box-shadow: none;
}

/* Suppress Chrome autofill background and text color changes */
.search__control:-webkit-autofill,
.search__control:-webkit-autofill:hover,
.search__control:-webkit-autofill:focus,
.search__control:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: var(--text--primary);
}

/* Remove native search chrome (cancel button, decoration) */
.search__control::-webkit-search-cancel-button,
.search__control::-webkit-search-decoration,
.search__control::-webkit-search-results-button,
.search__control::-webkit-search-results-decoration {
  -webkit-appearance: none;
  display: none;
}

/* ─── SLOTS ────────────────────────────────────────────────── */

.search__start,
.search__end {
  display:        flex;
  align-items:    center;
  flex-shrink:    0;
  color:          var(--text--secondary);
  pointer-events: none;
}

.search__end button,
.search__end a,
.search__start button,
.search__start a {
  pointer-events: auto;
  cursor:         pointer;
}

/* ─── CLEAR BUTTON ─────────────────────────────────────────── */

.search__clear {
  display:          flex;
  align-items:      center;
  justify-content:  center;
  flex-shrink:      0;

  /* Size: proportional to form size tier */
  width:  calc(var(--form--size, 2.5rem) * 0.5);
  height: calc(var(--form--size, 2.5rem) * 0.5);

  background:    transparent;
  border:        none;
  border-radius: 50%;
  color:         var(--text--secondary);
  cursor:        pointer;
  padding:       0;
  line-height:   1;

  transition:
    color            var(--transition--fast, 150ms),
    background-color var(--transition--fast, 150ms);
}

.search__clear:hover {
  color:            var(--text--primary);
  background-color: var(--bg--2, #f4f4f5);
}

.search__clear:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--form--color-border, var(--primary--border));
}

/* Hidden by default (HTML hidden attr); JS removes it when input has value */
.search__clear[hidden] {
  display: none;
}

/* Hide clear button while loading — spinner takes its place */
.search[data-loading] .search__clear {
  display: none;
}

/* ─── LOADING SPINNER ──────────────────────────────────────── */

.search__spinner {
  display:        none; /* Shown only when data-loading is present */
  flex-shrink:    0;
  width:          calc(var(--form--size, 2.5rem) * 0.4);
  height:         calc(var(--form--size, 2.5rem) * 0.4);
  border:         2px solid var(--border--default);
  border-top-color: var(--form--color-base, var(--primary--base));
  border-radius:  50%;
  animation:      search-spin 600ms linear infinite;
}

.search[data-loading] .search__spinner {
  display: block;
}

@keyframes search-spin {
  to { transform: rotate(360deg); }
}

/* ─── LOADING STATE ────────────────────────────────────────── */

.search[data-loading] .search__control {
  pointer-events: none;
}

/* ─── REDUCED MOTION ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .search__spinner {
    animation: none;
    border-top-color: var(--form--color-base, var(--primary--base));
    opacity: 0.6;
  }
}

!!!

---

## section.css


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/section/section.css`


!!!css
/* design/surfaces/components/section/section.css */
.section {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: var(--space-out--xl) auto;
  margin: 0 auto;
  background-color: var(--bg--1-glass);
  min-height: 100vh;
}

!!!

---

## segmented-control.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/segmented-control/segmented-control.css`


!!!css

!!!

---

## select.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/select/select.css`


!!!css
/* ============================================================
   select.css
   ─────────────────────────────────────────────────────────────
   Select-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
   The Select component renders:

     <div class="form select form--outlined …">  ← visual container
       <div class="select__start">…</div>          ← start slot (optional)
       <select class="select__control">…</select>  ← semantic control
       <div class="select__arrow" aria-hidden>▾</div> ← custom arrow
     </div>

   Same wrapper-is-the-field pattern as Input. The <select> is reset
   to transparent with appearance: none so the wrapper's variant
   styling shows through. The custom arrow replaces the browser default.

   MULTIPLE SELECT
   ──────────────────────────────────────────────────────────────
   <select multiple> renders as a scrollable list box, not a
   dropdown. Height is determined by the number of options and the
   control's --form--size. The arrow is hidden in multiple mode.

   BROWSER NOTES
   ──────────────────────────────────────────────────────────────
   appearance: none removes the native dropdown arrow across all
   browsers. The select's internal option list is still styled
   by the OS/browser — this is a known limitation of native selects.
   For a fully styled dropdown, a future Combobox component using
   <div> + [role="listbox"] would be needed.
   ============================================================ */

/* ─── WRAPPER ──────────────────────────────────────────────── */

.select {
  cursor: pointer;
}

/* ─── NATIVE SELECT CONTROL ────────────────────────────────── */

.select__control {
  /* Fill remaining space after start slot and before arrow */
  flex: 1;
  min-inline-size: 0;

  /* Reset to transparent — wrapper provides the visual chrome */
  appearance:         none;
  -webkit-appearance: none;
  background:         transparent;
  border:             none;
  outline:            none;

  /* Inherit from wrapper (set by forms.css compound size rules) */
  color:       inherit;
  font-size:   inherit;
  font-family: inherit;
  line-height: inherit;

  padding: 0;
  margin:  0;
  cursor:  inherit;
}

/* Suppress the native focus ring — shown on wrapper via :focus-within */
.select__control:focus,
.select__control:focus-visible {
  outline: none;
  box-shadow: none;
}

/* Placeholder option (value="", disabled) */
.select__control option[value=""][disabled] {
  color: var(--text--tertiary, var(--text--secondary));
}

/* ─── CUSTOM ARROW ─────────────────────────────────────────── */

.select__arrow {
  display:        flex;
  align-items:    center;
  flex-shrink:    0;
  color:          var(--text--secondary);
  pointer-events: none; /* clicks pass through to the <select> below */

  transition: color var(--transition--fast, 150ms ease),
              transform var(--transition--fast, 150ms ease);
}

/* Arrow takes the role's color when the field has focus */
.select:focus-within .select__arrow {
  color: var(--form--color-text, var(--primary--text));
}

/* Disabled state — arrow fades with the control */
.select[data-disabled] .select__arrow {
  color: var(--text--tertiary, var(--text--secondary));
}

/* ─── START SLOT ───────────────────────────────────────────── */

.select__start {
  display:        flex;
  align-items:    center;
  flex-shrink:    0;
  color:          var(--text--secondary);
  pointer-events: none;
}

/* ─── MULTIPLE SELECT ──────────────────────────────────────── */
/* <select multiple> is a list box, not a dropdown.
   Override the single-select height constraint. */

.select:has(.select__control[multiple]) {
  block-size: auto;
  min-block-size: calc(var(--form--size, 2.5rem) * 3);
  align-items: flex-start;
  padding-block: calc(var(--form--size, 2.5rem) * 0.25);
}

/* Hide the dropdown arrow — it has no meaning in list-box mode */
.select:has(.select__control[multiple]) .select__arrow {
  display: none;
}

.select__control[multiple] {
  /* Let the list box breathe */
  padding-block: calc(var(--form--size, 2.5rem) * 0.1);
}

/* ─── READONLY STATE ───────────────────────────────────────── */

.select:has(.select__control[disabled]) {
  cursor: not-allowed;
}
!!!

---

## separator.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/separator/separator.css`


!!!css
/**
 * Styles for the Separator component.
 *
 * When it has no content, it's a simple `hr` element.
 * When it has content (a label), it becomes a flex container with
 * pseudo-elements creating the lines on either side of the label.
 */

.separator {
  border: 0;
  margin: 0;
  flex-shrink: 0;
}

/* ─── ORIENTATION ──────────────────────────────────────────────────────────── */

.separator--horizontal {
  width: 100%;
  height: var(--border--thin);
  margin-block: var(--space-out--md);
}

.separator--vertical {
  height: 100%;
  width: var(--border--thin);
  margin-inline: var(--space-out--md);
}

/* ─── STRENGTH (COLOR) ─────────────────────────────────────────────────────── */

.separator--strength-subtle {
  background-color: var(--separator--color);
}
.separator--strength-default {
  background-color: var(--separator--color);
}
.separator--strength-strong {
  background-color: var(--separator--color);
}

/* ─── VARIANT (STYLE) ──────────────────────────────────────────────────────── */

.separator--variant-dashed {
  background: none;
}
.separator--horizontal.separator--variant-dashed {
  border-top: var(--border--thin) dashed var(--separator--color);
}
.separator--vertical.separator--variant-dashed {
  border-left: var(--border--thin) dashed var(--separator--color);
}

/* ─── WITH LABEL ───────────────────────────────────────────────────────────── */

.separator[role="separator"] {
  display: flex;
  align-items: center;
  text-align: center;
  background: none; /* The pseudo-elements handle the line */
}

.separator[role="separator"]::before,
.separator[role="separator"]::after {
  content: "";
  flex-grow: 1;
  border-bottom: var(--border--thin) var(--separator--variant, solid)
    var(--separator--color);
}

.separator__label {
  flex-shrink: 0;
  padding-inline: var(--space-in--sm);
  font-size: var(--label--sm);
  color: var(--text--muted);
}

!!!

---

## sheet.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/sheet/sheet.css`


!!!css
/* sheet.css */
dialog.sheet {
  margin: 0;
  position: fixed;
  display: flex;
  flex-direction: column;
  background: var(--bg--0, #fff);
  border: none;
  box-shadow: var(--shadow--lg);
  color: var(--text--primary);
  max-width: 100%;
  max-height: 100%;
  transition: transform 300ms cubic-bezier(0.32, 0.72, 0, 1), left 300ms ease, right 300ms ease, top 300ms ease, bottom 300ms ease;
}

/* Base dimensions */
dialog.sheet[data-side="left"],
dialog.sheet[data-side="right"] {
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 400px;
}
dialog.sheet[data-side="top"],
dialog.sheet[data-side="bottom"] {
  left: 0;
  right: 0;
  width: 100vw;
  height: 400px;
}

/* Anchoring & Initial Off-screen Transform */
dialog.sheet[data-side="left"] {
  left: 0;
  right: auto;
  border-right: 1px solid var(--border--subtle);
  transform: translateX(-100%);
}
dialog.sheet[data-side="right"] {
  right: 0;
  left: auto;
  border-left: 1px solid var(--border--subtle);
  transform: translateX(100%);
}
dialog.sheet[data-side="top"] {
  top: 0;
  bottom: auto;
  border-bottom: 1px solid var(--border--subtle);
  transform: translateY(-100%);
}
dialog.sheet[data-side="bottom"] {
  bottom: 0;
  top: auto;
  border-top: 1px solid var(--border--subtle);
  transform: translateY(100%);
}

/* Open State */
dialog.sheet[data-state="open"] {
  transform: translate(0, 0);
}

/* Backdrop */
dialog.sheet::backdrop {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 300ms ease;
}
dialog.sheet[data-state="open"]::backdrop {
  opacity: 1;
}

/* Hide native dialog display until showModal is called */
dialog.sheet:not([open]) {
  display: none;
}

/* Layout */
.sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-in--md);
  border-bottom: 1px solid var(--border--subtle);
}
.sheet__title {
  margin: 0;
  font-size: var(--text--lg);
  font-weight: 600;
}
.sheet__close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text--muted);
  padding: var(--space-in--xs);
  border-radius: var(--radius--sm);
}
.sheet__close-btn:hover {
  background: var(--bg--2);
  color: var(--text--primary);
}
.sheet__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-in--md);
}
.sheet__footer {
  padding: var(--space-in--md);
  border-top: 1px solid var(--border--subtle);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-in--sm);
}

!!!

---

## skeleton.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/skeleton/skeleton.css`


!!!css
/* ============================================================
   skeleton.css
   ─────────────────────────────────────────────────────────────
   Loading placeholder animation shared across all data and
   feedback components. Import this file in any component that
   renders a <Skeleton />.

   The shimmer animation is defined once here. Components that
   previously had inline skeleton CSS (Table, List) should import
   this file and use <Skeleton /> instead.

   SHIMMER
   ──────────────────────────────────────────────────────────────
   A gradient sweep from right to left across the element.
   Uses semantic surface tokens so it adapts to light/dark mode
   automatically with no extra rules.

   STRUCTURE (single shape)
   ──────────────────────────────────────────────────────────────
   <div class="skeleton skeleton--avatar" />

   STRUCTURE (text lines)
   ──────────────────────────────────────────────────────────────
   <div class="skeleton skeleton--text skeleton--multi">
     <span class="skeleton__line" />
     <span class="skeleton__line" />
     <span class="skeleton__line skeleton__line--last" />
   </div>
   ============================================================ */

/* ─── ANIMATION ─────────────────────────────────────────────── */

@keyframes skeleton--shimmer {
  from { background-position: 200% 0; }
  to   { background-position: -200% 0; }
}

/* ─── BASE ───────────────────────────────────────────────────── */

.skeleton {
  display:    block;
  background: linear-gradient(
    90deg,
    var(--bg--2) 25%,
    var(--bg--3) 50%,
    var(--bg--2) 75%
  );
  background-size: 200% 100%;
  animation:  skeleton--shimmer 1.5s ease-in-out infinite;
  border-radius: var(--skeleton--radius, var(--radius--sm));
}

/* Multi-line text container */
.skeleton--multi {
  display:        flex;
  flex-direction: column;
  gap:            0.5em;
  /* Container itself has no shimmer — lines do */
  background:     none;
  animation:      none;
}

/* ─── LINES ──────────────────────────────────────────────────── */

.skeleton__line {
  display:    block;
  height:     1em;
  width:      100%;
  background: linear-gradient(
    90deg,
    var(--bg--2) 25%,
    var(--bg--3) 50%,
    var(--bg--2) 75%
  );
  background-size: 200% 100%;
  animation:  skeleton--shimmer 1.5s ease-in-out infinite;
  border-radius: var(--skeleton--radius, var(--radius--sm));
}

.skeleton__line--last {
  width: 65%;
}

/* ─── VARIANTS ───────────────────────────────────────────────── */

.skeleton--text {
  height:        1em;
  width:         100%;
  border-radius: var(--skeleton--radius, var(--radius--sm));
}

.skeleton--heading {
  height:        1.5em;
  width:         60%;
  border-radius: var(--skeleton--radius, var(--radius--sm));
}

.skeleton--avatar {
  width:         2.5rem;
  height:        2.5rem;
  border-radius: 50%;   /* always circle — radius prop has no effect */
  flex-shrink:   0;
}

.skeleton--button {
  height:        2.5rem;
  width:         6rem;
  border-radius: var(--skeleton--radius, var(--radius--md));
}

.skeleton--image {
  width:         100%;
  aspect-ratio:  16 / 9;  /* overridden by ratio prop inline style */
  border-radius: var(--skeleton--radius, var(--radius--sm));
}

.skeleton--block {
  /* No defaults — fully controlled by width + height props */
}

/* ─── STATIC (no animation) ──────────────────────────────────── */

.skeleton--static,
.skeleton--static .skeleton__line {
  animation:       none;
  background-image: none;
  background-color: var(--bg--2);
}

/* ─── REDUCED MOTION ─────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .skeleton,
  .skeleton__line {
    animation:        none;
    background-image: none;
    background-color: var(--bg--2);
  }
}
!!!

---

## skip-link.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/skip-link/skip-link.css`


!!!css
/* design/triggers/components/skip-link/skip-link.css */

.skip-link {
  position: absolute;
  top: -9999px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  padding: var(--space-in--md, 0.75rem 1.5rem);
  text-decoration: none;
  font-weight: var(--weight--semibold, 600);
  box-shadow: var(--shadow--md);
  box-sizing: border-box;
}

.skip-link:focus,
.skip-link:focus-visible {
  top: 1rem;
}

!!!

---

## slider.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/slider/slider.css`


!!!css

!!!

---

## spacer.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/spacer/spacer.css`


!!!css
/**
 * Styles for the Spacer component.
 *
 * The spacer is designed to work in both Flex and Grid contexts to fill
 * available space.
 */
.spacer {
  flex: 1 1 0%;
  justify-self: stretch;
  align-self: stretch;
}
!!!

---

## spinner.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/spinner/spinner.css`


!!!css
/* design/feedback/spinner/spinner.css */

/**
 * Spinner component styles.
 *
 * This file owns:
 *   1. Base .spinner layout and size variables
 *   2. Size map for diameter + SVG stroke-width
 *   3. Spin animation (@keyframes spin)
 *   4. Speed modifier classes (slow, normal, fast)
 *   5. Direction modifier (counterclockwise)
 *   6. Reduced-motion override (opacity pulse)
 *
 * The .spinner element inherits color from .feedback--ghost (currentColor),
 * so the SVG arc stroke picks up --feedback--color-text automatically.
 *
 * Custom properties:
 *   --spinner--size         diameter of the SVG arc element
 *   --spinner--stroke       stroke-width for the arc (set on SVG via CSS)
 */

/* ─── Base Spinner ───────────────────────────────────────────────────────── */

.spinner {
  /* Override feedback base for inline spinner */
  display:  inline-flex;
  padding:  0;
  border:   none;
  /* Animation applied to the whole element — SVG rotates with it */
  animation: spin var(--spinner--duration, 0.8s) linear infinite;
}

.spinner svg {
  display:    block;
  width:      var(--spinner--size);
  height:     var(--spinner--size);
  color:      var(--feedback--color-base);
  flex-shrink: 0;
}

/* ─── Spin keyframe ──────────────────────────────────────────────────────── */

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── Speed modifiers ────────────────────────────────────────────────────── */

.spinner--slow   { --spinner--duration: 1.4s; }
/* .spinner--normal is the default (0.8s set on .spinner above) */
.spinner--fast   { --spinner--duration: 0.4s; }

/* ─── Direction modifier ─────────────────────────────────────────────────── */

.spinner--counterclockwise {
  animation-direction: reverse;
}

/* ─── Size map ───────────────────────────────────────────────────────────── */

.spinner--inherit {
  color: inherit !important;
}

.feedback--2xs.spinner { --spinner--size: var(--icon--size-2xs); }
.feedback--xs.spinner { --spinner--size: var(--icon--size-xs); }
.feedback--sm.spinner { --spinner--size: var(--icon--size-sm); }
.feedback--md.spinner { --spinner--size: var(--icon--size-md); }
.feedback--lg.spinner { --spinner--size: var(--icon--size-lg); }
.feedback--xl.spinner { --spinner--size: var(--icon--size-xl); }
.feedback--2xl.spinner { --spinner--size: var(--icon--size-2xl); } 

/* ─── sr-only (visually hidden but accessible) ───────────────────────────── */

.sr-only {
  position:   absolute;
  width:      1px;
  height:     1px;
  padding:    0;
  margin:     -1px;
  overflow:   hidden;
  clip:       rect(0, 0, 0, 0);
  white-space: nowrap;
  border:     0;
}

/* ─── Reduced motion ──────────────────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .spinner {
    animation: spinner-pulse 1.5s ease-in-out infinite;
  }

  @keyframes spinner-pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }
}

!!!

---

## stack.css


**Full path:** `/home/jk/Code/dezign8/src/design/layout/components/stack/stack.css`


!!!css
.stack {
  display: flex;
  flex-direction: column;
  gap: var(--stack--gap);
}

.stack--align-start   { align-items: flex-start; }
.stack--align-center  { align-items: center; }
.stack--align-end     { align-items: flex-end; }
.stack--align-stretch { align-items: stretch; }

.stack--justify-start   { justify-content: flex-start; }
.stack--justify-center  { justify-content: center; }
.stack--justify-end     { justify-content: flex-end; }
.stack--justify-between { justify-content: space-between; }

.stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--stack--gap);
  margin-block: calc(var(--stack--gap) * -1);
  margin-inline: auto;
}
!!!

---

## stat.css


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/stat/stat.css`


!!!css
.stat {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  
  /* gap: calc(var(--data--size) * 1.25); */
  /* padding: auto var(--space-in--md); */
}

.stat__value {
  font-size: calc(var(--data--size) * 7.5);
  line-height: 1;
  font-weight: var(--weight--black);
  color: var(--data--color--text);
  font-family: var(--family--sans);
  letter-spacing: calc(var(--tracking--loose) * 2);
  line-height: var(--leading--none);
  margin-left: 0.25em;
  
}

.stat__label {
  font-size: var(--fs--xs);
  color: var(--text--muted);
  margin-left: var(--space-in--md);
}

.stat[data-loading] .stat__value,
.stat[data-loading] .stat__label {
  opacity: 0.7; /* skeleton handles the visual */
}

!!!

---

## step/step.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/step/step.css`


!!!css
.stepper__step-wrapper {
  display: flex;
  position: relative;
  flex: 1;
}

/* Horizontal lines */
.stepper[data-orientation="horizontal"] .stepper__step-wrapper:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 1rem; /* Center of the 2rem indicator */
  left: 2.5rem;
  right: 0.5rem;
  height: 2px;
  background-color: var(--border--default, #e5e7eb);
  z-index: 0;
}

/* Vertical lines */
.stepper[data-orientation="vertical"] .stepper__step-wrapper:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 2.5rem;
  bottom: 0.5rem;
  left: 1rem; /* Center of the 2rem indicator */
  width: 2px;
  background-color: var(--border--default, #e5e7eb);
  z-index: 0;
}

/* Colored line for completed steps */
.stepper__step-wrapper[data-state="complete"]::after {
  background-color: var(--nav--color-base, currentColor) !important;
}

/* The actual clickable/content area */
.stepper__step-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
  text-decoration: none;
  color: inherit;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.stepper[data-orientation="horizontal"] .stepper__step-content {
  flex-direction: row;
  padding-right: 1rem;
}

.stepper[data-orientation="vertical"] .stepper__step-content {
  padding-bottom: 2rem;
}

.stepper__indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
  border: 2px solid var(--border--default, #e5e7eb);
  background-color: var(--bg--default, #fff);
  color: var(--text--muted, #6b7280);
  transition: all 0.2s ease;
}

.stepper__step-wrapper[data-state="current"] .stepper__indicator {
  border-color: var(--nav--color-base, currentColor);
  color: var(--nav--color-base, currentColor);
}

.stepper__step-wrapper[data-state="complete"] .stepper__indicator {
  background-color: var(--nav--color-base, currentColor);
  border-color: var(--nav--color-base, currentColor);
  color: var(--bg--default, #fff);
}

.stepper__text {
  display: flex;
  flex-direction: column;
  padding-top: 0.25rem;
}

.stepper__label {
  font-weight: 600;
  color: var(--text--default, #111827);
}

.stepper__step-wrapper[data-state="incomplete"] .stepper__label {
  color: var(--text--muted, #6b7280);
}

.stepper__description {
  font-size: 0.875rem;
  color: var(--text--muted, #6b7280);
  margin-top: 0.125rem;
}

!!!

---

## stepper.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/stepper/stepper.css`


!!!css
.stepper__list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.stepper[data-orientation="horizontal"] .stepper__list {
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
}

.stepper[data-orientation="vertical"] .stepper__list {
  flex-direction: column;
  align-items: flex-start;
}

!!!

---

## switch.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/switch/switch.css`


!!!css
/* ============================================================
   switch.css
   ─────────────────────────────────────────────────────────────
   Switch-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
     <label class="form switch …">
       <input class="switch__control" type="checkbox" role="switch" />
       <span  class="switch__track"   aria-hidden="true">
         <span class="switch__thumb"></span>
       </span>
       <span  class="switch__label"><slot /></span>
     </label>

   DOM order is always: hidden input → track → label slot.
   Visual order changes via flex-direction for labelPosition modifiers.
   The ~ sibling combinator in state rules depends on this DOM order.

   SIZING
   ──────────────────────────────────────────────────────────────
   Track and thumb are proportional to --form--size:
     track width  = size × 1.1
     track height = size × 0.6
     thumb size   = size × 0.44
     gap          = size × 0.06

   Checked travel = track_w − thumb_size − (2 × gap)
                  = (1.1 − 0.44 − 0.12) × size = 0.54 × size
   ============================================================ */

/* ─── WRAPPER ──────────────────────────────────────────────── */

.switch {
  /* Natural height, not a fixed control height */
  min-block-size: unset;
  cursor: pointer;
  user-select: none;
}

/* ─── HIDDEN NATIVE INPUT ───────────────────────────────────── */

.switch__control {
  position: absolute;
  opacity: 0;
  inline-size: 0;
  block-size: 0;
  pointer-events: none;
}

/* ─── TRACK ──────────────────────────────────────────────────── */

.switch__track {
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;

  inline-size: calc(var(--form--size, 2.5rem) * 1.1);
  block-size: calc(var(--form--size, 2.5rem) * 0.6);
  border-radius: 9999px;

  background-color: var(--border--default);
  transition: background-color var(--transition--fast, 150ms ease);
}

/* ─── THUMB ──────────────────────────────────────────────────── */

.switch__thumb {
  position: absolute;
  inset-inline-start: calc(var(--form--size, 2.5rem) * 0.06);

  inline-size: calc(var(--form--size, 2.5rem) * 0.44);
  block-size: calc(var(--form--size, 2.5rem) * 0.44);
  border-radius: 9999px;

  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  transition: transform var(--transition--fast, 150ms ease);
}

/* ─── CHECKED STATE ──────────────────────────────────────────── */

.switch__control:checked~.switch__track {
  background-color: var(--form--color-base, var(--primary--base));
}

/* travel = (1.1 − 0.44 − 0.12) × --form--size = 0.54 × --form--size */
.switch__control:checked~.switch__track .switch__thumb {
  transform: translateX(calc(var(--form--size, 2.5rem) * 0.54));
}

/* ─── FOCUS VISIBLE ─────────────────────────────────────────── */

.switch__control:focus-visible~.switch__track {
  outline: 2px solid var(--form--color-base, var(--primary--base));
  outline-offset: 2px;
}

/* ─── LABEL ──────────────────────────────────────────────────── */

.switch__label {
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

/* ─── LABEL POSITION MODIFIERS ───────────────────────────────── */

.switch--start {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.switch--top {
  flex-direction: column-reverse;
}

.switch--bottom {
  flex-direction: column;
}

/* ─── REDUCED MOTION ────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {

  .switch__track,
  .switch__thumb {
    transition: none;
  }
}
!!!

---

## table.css


**Full path:** `/home/jk/Code/dezign8/src/design/data/components/table/table.css`


!!!css
/* ============================================================
   table.css
   ─────────────────────────────────────────────────────────────
   Styles for the Table component.

   HTML STRUCTURE
   ──────────────────────────────────────────────────────────────
   <div  class="data [data-modifiers]">   ← wrapperProps (table.css + data.css)
     <table class="table [table-modifiers]">   ← tableProps
       <caption>…</caption>
       <thead><tr><th>…</th></tr></thead>
       <tbody><tr><td>…</td></tr></tbody>
     </table>
   </div>

   CSS custom properties are set on the wrapper div and cascade
   down into the table and all its descendants automatically.

   CHANNEL MAP
   ──────────────────────────────────────────────────────────────
   Set on wrapper by useData → useTable:
     --data--size              Density (cell padding / row height)
     --data--color--*          Primary accent: borders, separators, hover
     --data--bg--*             Background tint: header, striped rows
     --data--highlight--*      Highlighted row accent

   Set on wrapper by resolveTokens(TABLE_TOKENS):
     --table--layout           CSS table-layout value (consumed by .table)

   MODIFIER CLASSES — wrapper (.data)
   ──────────────────────────────────────────────────────────────
   Variants (data.css):  .data--outlined  .data--soft  .data--elevated
   Visual:               .data--striped   .data--bordered

   MODIFIER CLASSES — table (.table)
   ──────────────────────────────────────────────────────────────
   Layout:    .table--auto       .table--fixed
   Behaviour: .table--sticky-header  .table--sortable

   DATA ATTRIBUTES — wrapper
   ──────────────────────────────────────────────────────────────
   [data-loading]       Skeleton shimmer on tbody cells
   [data-scrollable]    overflow-x: auto on wrapper (data.css)
   [data-interactive]   Hover + pointer on tbody rows
   [data-selectable]    Checkbox column reserved in first cell

   ADJUSTING PROPS
   ──────────────────────────────────────────────────────────────
   color       [./table.css]  var(--data--color--*) in thead border,
                              hover bg, sort indicators, bordered cells
               @example color="danger" → red header border + hover

   bg          [./table.css]  var(--data--bg--*) in header bg, striped rows
               @example bg="primary"  → tinted even rows + header

   highlight   [./table.css]  var(--data--highlight--*) on tr[data-highlighted]
               @example highlight="warning" → amber pinned-row accent

   variant     [./data.css]   plain | outlined | soft | elevated — wrapper
               Override specific variant rules here if table needs
               different treatment (e.g. no border-radius on wrapper).

   size        [./table.css]  calc(var(--data--size) * N) on th/td padding
               @example size="compact" → --data--size: var(--space-xs)

   caption     [./Table.astro] renders as <caption> — no CSS to adjust.
               Screen readers announce it; always provide one.

   loading     [./table.css]  .data[data-loading] .table tbody td::after
               Change skeleton shimmer colours or animation here.

   empty       [./table.css]  .table__empty-cell   .data__empty
               [./Table.astro] change default message string

   striped     [./table.css]  .data--striped .table tbody tr:nth-child(even)
               Shade: var(--data--bg--subtle). Adjust shade or selector.

   bordered    [./table.css]  .data--bordered .table th, .data--bordered .table td
               Colour: var(--data--color--border).

   interactive [./table.css]  .data[data-interactive] .table tbody tr
               Add hover background, transition, cursor here.

   selectable  [./table.css]  .data[data-selectable] first th/td — checkbox col
               [./Table.astro] selection state is consumer-managed.

   scrollable  [./data.css]   overflow-x: auto on .data[data-scrollable]
               Pair with an explicit max-inline-size on the wrapper or parent.

   data        [./Table.astro] RowData[] — no CSS to adjust.
   columns     [./Table.astro] ColumnDef[] — widths applied as inline style on th.
   layout      [./table.css]  var(--table--layout, auto) on .table
               @example layout="fixed" → table-layout: fixed + overflow-wrap

   stickyHeader[./table.css]  .table--sticky-header thead th
               Background: var(--data--bg--subtle). Adjust z-index if
               table is inside a stacking context with other sticky elements.

   sortable    [./table.css]  .table--sortable th[data-key] — cursor, hover
               Sort icons: th[aria-sort="ascending" | "descending"]::after
               @example change ::after content to SVG data-URI for custom icons

   sort        [./Table.astro] sets aria-sort attribute — CSS above handles rest.
   ============================================================ */

/* ─── BASE TABLE ───────────────────────────────────────────── */

.table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  table-layout: var(--table--layout, auto);
}

/* ─── CELLS ────────────────────────────────────────────────── */

.table th,
.table td {
  padding-block: calc(var(--data--size, var(--space-in--2xs)) * 1);
  padding-inline: calc(var(--data--size, var(--space-in--sm)) * 1.5);
  text-align: start;
  vertical-align: middle;
}

/* ─── COLUMN ALIGNMENT ─────────────────────────────────────── */
/* Applied via data-align attribute on th/td in Table.astro.   */

.table [data-align="center"] {
  text-align: center;
}
.table [data-align="end"] {
  text-align: end;
}

/* ─── THEAD ────────────────────────────────────────────────── */

.table thead th {
  font-weight: var(--weight--semibold, 600);
  color: var(--text--secondary);
  white-space: nowrap;
  background-color: var(--bg--subtle, transparent);
  border-bottom: 2px solid var(--data--color--border, var(--border--default));
}

/* ─── TBODY ROWS ───────────────────────────────────────────── */

.table tbody tr + tr {
  border-top: 1px solid var(--border--subtle, var(--border--default));
}

/* ─── TFOOT ────────────────────────────────────────────────── */

.table tfoot td {
  font-weight: var(--weight--medium, 500);
  border-top: 2px solid var(--data--color--border, var(--border--default));
  color: var(--text--secondary);
}

/* ─── LAYOUT MODIFIER ──────────────────────────────────────── */

.table--fixed {
  /* table-layout is driven by var(--table--layout) set in wrapperProps.
     This class adds complementary styles for fixed-layout tables. */
  overflow-wrap: break-word; /* prevent long words from overflowing fixed-width cells */
}

/* ─── STICKY HEADER ─────────────────────────────────────────── */
/*
   Requires: scrollable={true} + explicit height on wrapper or parent.
   The box-shadow replaces the border-bottom since position:sticky
   lifts the element out of normal flow and the border collapses.
*/

.table--sticky-header thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: var(--bg--subtle, var(--surface--1, #fff));
  border-bottom: none;
  box-shadow: 0 2px 0 var(--data--color--border, var(--border--default));
}

/* ─── SORTABLE ──────────────────────────────────────────────── */

.table--sortable th[data-key] {
  cursor: pointer;
  user-select: none;
}

.table--sortable th[data-key]:hover {
  background-color: var(--data--color--subtle, var(--surface--2));
  color: var(--data--color--text, var(--text--primary));
}

/* Sort direction indicator — pure CSS via aria-sort.           */
/* To use custom icons: replace content with an SVG data-URI.  */

.table--sortable th[data-key]::after {
  content: " ↕";
  opacity: 0.35;
  font-size: 0.8em;
  margin-inline-start: 0.25em;
}

.table--sortable th[aria-sort="ascending"]::after {
  content: " ↑";
  opacity: 1;
  color: var(--data--color--base, currentColor);
}

.table--sortable th[aria-sort="descending"]::after {
  content: " ↓";
  opacity: 1;
  color: var(--data--color--base, currentColor);
}

/* ─── STRIPED ───────────────────────────────────────────────── */
/* .data--striped is on the wrapper; .table is the descendant.  */

.data--striped .table tbody tr:nth-child(even) {
  background-color: var(--bg--subtle, var(--surface--2));
}

/* ─── BORDERED ──────────────────────────────────────────────── */

.data--bordered .table th,
.data--bordered .table td {
  border: 1px solid var(--data--color--border, var(--border--default));
}

/* ─── HIGHLIGHTED ROWS ──────────────────────────────────────── */
/*
   Apply data-highlighted on <tr> in compound mode, or add a
   _highlighted: true key to a RowData record in data-driven mode.
*/

.table tbody tr[data-highlighted] {
  background-color: var(--data--highlight--subtle);
  border-inline-start: 3px solid var(--data--highlight--base);
}

/* ─── INTERACTIVE ROWS ──────────────────────────────────────── */

.data[data-interactive] .table tbody tr {
  cursor: pointer;
  transition: background-color var(--transition--fast, 150ms ease);
}

.data[data-interactive] .table tbody tr:hover {
  background-color: var(--data--color--subtle, var(--surface--2));
}

/* ─── SELECTABLE ROWS ───────────────────────────────────────── */
/*
   Reserves the first column for a checkbox control.
   Checkbox rendering and selection state are consumer-managed —
   this only provides the layout and cursor affordance.
*/

.data[data-selectable] .table tbody tr {
  cursor: pointer;
}

.data[data-selectable] .table th:first-child,
.data[data-selectable] .table td:first-child {
  width: 3rem;
  padding-inline: calc(var(--data--size, var(--space-in--sm)) * 0.75);
  text-align: center;
}

/* ─── LOADING SKELETON ──────────────────────────────────────── */
/*
   Skeleton shimmer on tbody cells. The cell text is hidden via
   color: transparent; the ::after pseudo-element creates the bar.
   Header (thead) stays visible during loading — shows column labels.
*/

.data[data-loading] .table tbody td {
  position: relative;
  overflow: hidden;
  color: transparent !important;
  border-color: transparent !important;
  user-select: none;
}

.data[data-loading] .table tbody td::after {
  content: "";
  position: absolute;
  inset-block: calc(var(--data--size, var(--space-in--sm)) * 0.5);
  inset-inline: calc(var(--data--size, var(--space-in--sm)) * 0.75);
  border-radius: var(--radius--sm, 4px);
  background: linear-gradient(
    90deg,
    var(--surface--2) 25%,
    var(--surface--3) 50%,
    var(--surface--2) 75%
  );
  background-size: 200% 100%;
  animation: table--skeleton 1.5s ease-in-out infinite;
}

@keyframes table--skeleton {
  from {
    background-position: 200% 0;
  }
  to {
    background-position: -200% 0;
  }
}

/* ─── EMPTY STATE ───────────────────────────────────────────── */

.table__empty-cell {
  text-align: center;
  border-top: none !important;
  padding-block: calc(var(--data--size, var(--space-in--sm)) * 3) !important;
}

/* ─── REDUCED MOTION ────────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .data[data-loading] .table tbody td::after {
    animation: none;
    background: var(--surface--2);
  }

  .data[data-interactive] .table tbody tr {
    transition: none;
  }
}

.component-table-wrapper {
  margin: 2rem 0 3rem 0;
  overflow-x: auto;
}
.component-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg--1);
  border: 1px solid var(--border--default);
  border-radius: var(--radius--md, 0.5rem);

  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}
.component-table th, .component-table td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border--subtle);
  text-align: left;
  vertical-align: top;
}
.component-table th {
  background: var(--bg--2);
  font-weight: var(--weight--semibold, 600);
  color: var(--text--layer-1);
  font-size: var(--fs--sm, 0.875rem);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.component-table tr:last-child td {
  border-bottom: none;
}
.clickable-row {
  cursor: pointer;
  transition: background-color 0.15s;
}
.clickable-row:hover {
  background-color: var(--bg--2, #f9fafb);
}
.component-link {
  color: var(--primary--text, #3b82f6);
  text-decoration: none;
  font-weight: var(--weight--medium, 500);
}
.clickable-row:hover .component-link {
  text-decoration: underline;
}
!!!

---

## panel/t-panel.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/panel/t-panel.css`


!!!css
.tab-panel {
  display: none;
  padding: 1rem 0;
  animation: tabFadeIn 0.2s ease;
}

.tab-panel[data-active="true"] {
  display: block;
}

@keyframes tabFadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

!!!

---

## tabs.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tabs/tabs.css`


!!!css
.tabs {
  display: flex;
  position: relative;
}

/* Ensure the underlined variant has a full-width bottom border */
.tabs.nav--underlined {
  border-bottom: 1px solid var(--border--default, #e5e7eb);
}

.tabs.nav--underlined .nav__item {
  margin-bottom: -1px; /* Overlap the border to merge with active tab indicator */
}

/* Fitted tabs stretch to fill space */
.tabs--fitted .nav__item {
  flex: 1;
}

/* Web Component wrapper */
dezign8-tabs {
  display: block;
}



!!!

---

## tag.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/tag/tag.css`


!!!css
/* ============================================================
   tag.css
   ─────────────────────────────────────────────────────────────
   Visual styles for the Tag component.
   
   Inherits `--feedback--color-*` and `--feedback--radius` from
   the `useFeedback` hook base classes (`.feedback--[variant]`).
   ============================================================ */

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: var(--feedback--radius);
  font-family: var(--family--sans);
  font-weight: var(--weight--medium);
  line-height: var(--leading--none);
}

.tag--icon-only {
  aspect-ratio: 1;
  padding-inline: 0;
}

/* ─── SIZE MAPPING ────────────────────────────────────────── */

/* XS: micro label */
.feedback--xs.tag {
  font-size: var(--label--xs);
  padding: var(--space-in--3xs) var(--space-in--2xs);
  min-block-size: var(--ui-height--2xs);
  gap: var(--space-in--3xs);
}

/* SM: small tag */
.feedback--sm.tag {
  font-size: var(--label--sm);
  padding: var(--space-in--2xs) var(--space-in--xs);
  min-block-size: var(--ui-height--xs);
  gap: var(--space-in--3xs);
}

/* MD (default): standard tag */
.feedback--md.tag {
  font-size: var(--label--md);
  padding: var(--space-in--xs) var(--space-in--sm);
  min-block-size: var(--ui-height--sm);
  gap: var(--space-in--2xs);
}

/* LG: large tag */
.feedback--lg.tag {
  font-size: var(--label--lg);
  padding: var(--space-in--sm) var(--space-in--md);
  min-block-size: var(--ui-height--md);
  gap: var(--space-in--xs);
}

/* XL: hero tag */
.feedback--xl.tag {
  font-size: var(--label--xl);
  padding: var(--space-in--md) var(--space-in--lg);
  min-block-size: var(--ui-height--lg);
  gap: var(--space-in--sm);
}

!!!

---

## text.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/text/text.css`


!!!css
/* design/typography/components/text/text.css */

.text--has-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.375em;
}

!!!

---

## textarea.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/textarea/textarea.css`


!!!css
/* ============================================================
   textarea.css
   ─────────────────────────────────────────────────────────────
   Textarea-specific styles. Imported alongside forms.css.

   STRUCTURE
   ──────────────────────────────────────────────────────────────
   The Textarea component renders a two-element structure:

     <div class="form textarea form--outlined …">  ← visual container
       <textarea class="textarea__control" />        ← semantic control
     </div>

   The wrapper (.textarea) owns visual chrome — border, background,
   border-radius — via the shared .form variant rules in forms.css.
   The inner .textarea__control is transparent; it handles its own
   internal padding, font, and resize behaviour.

   CHANNEL MAP
   ──────────────────────────────────────────────────────────────
   Written by useTextarea (not resolveTokens):
     --textarea--resize   CSS resize value (none | vertical | both)
   ============================================================ */

/* ─── WRAPPER ──────────────────────────────────────────────── */

.textarea {
  /* Height adapts to textarea content, not a fixed control height */
  min-block-size: unset;

  /* Align inner textarea to top for multi-line content */
  align-items: flex-start;

  /* Remove wrapper padding — inner textarea handles its own spacing */
  padding: 0;

  /* Clip the inner textarea to the wrapper's border-radius */
  overflow: hidden;

  cursor: text;
}

/* ─── INNER CONTROL ────────────────────────────────────────── */

.textarea__control {
  /* Fill remaining space */
  flex: 1;
  inline-size: 100%;

  /* Inherit all visual properties from wrapper */
  background:  transparent;
  border:      none;
  outline:     none;
  color:       inherit;
  font-size:   inherit;
  font-family: inherit;
  line-height: 1.5;

  /* Internal text spacing */
  padding-block:  calc(var(--form--size, 2.5rem) * 0.2);
  padding-inline: calc(var(--form--size, 2.5rem) * 0.3);
  margin: 0;

  /* Resize direction from token */
  resize: var(--textarea--resize, vertical);
}

.textarea__control::placeholder {
  color:   var(--text--tertiary, var(--text--secondary));
  opacity: 1;
}

/* Suppress native focus ring — focus is shown on wrapper via :focus-within */
.textarea__control:focus,
.textarea__control:focus-visible {
  outline:    none;
  box-shadow: none;
}

/* Suppress Chrome autofill background override */
.textarea__control:-webkit-autofill,
.textarea__control:-webkit-autofill:focus {
  transition: background-color 5000s ease-in-out 0s;
  -webkit-text-fill-color: var(--text--primary);
}

/* ─── READONLY STATE ───────────────────────────────────────── */

.textarea:has(.textarea__control[readonly]) {
  cursor: default;
}

!!!

---

## theme-toggle.css


**Full path:** `/home/jk/Code/dezign8/src/design/triggers/components/theme-toggle/theme-toggle.css`


!!!css
/* ============================================================
   theme-toggle.css
   ─────────────────────────────────────────────────────────────
   Styles for the ThemeToggle component.

   The component inherits all visual styles from .trigger and
   .button — this file handles only icon presentation, smooth
   icon crossfade, and the rotating transition between states.

   STATE MODEL
   ────────────
   `[data-theme="dark"]` on <html>  →  show moon, hide sun
   absence of data-theme (light)    →  show sun, hide moon

   The icons crossfade + rotate via CSS transitions so the swap
   feels alive. prefers-reduced-motion disables the rotation.
   ============================================================ */

/* ─── Icon container ──────────────────────────────────────── */

.theme-toggle {
  position: relative;
  overflow: hidden;
}

/* ─── Shared icon base ────────────────────────────────────── */

.theme-toggle__icon {
  width: 1.25em;
  height: 1.25em;
  transition:
    opacity   var(--transition--base),
    transform var(--transition--base);
}

/* ─── Light mode: sun visible, moon hidden ────────────────── */

.theme-toggle__icon--sun {
  opacity: 1;
  transform: rotate(0deg);
}

.theme-toggle__icon--moon {
  opacity: 0;
  transform: rotate(-90deg);
  position: absolute;
  inset: 0;
  margin: auto;
}

/* ─── Dark mode: moon visible, sun hidden ─────────────────── */

:root[data-theme="dark"] .theme-toggle__icon--sun {
  opacity: 0;
  transform: rotate(90deg);
}

:root[data-theme="dark"] .theme-toggle__icon--moon {
  opacity: 1;
  transform: rotate(0deg);
}

/* ─── Reduced motion ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .theme-toggle__icon {
    transition: opacity var(--transition--fast);
    transform: none !important;
  }
}

!!!

---

## tile.css


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/tile/tile.css`


!!!css
/* design/surfaces/components/tile/tile.css */
.tile {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background-color 0.2s ease;
}

.tile--interactive:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow--md);
  cursor: pointer;
}

.tile--interactive:active {
  transform: translateY(0);
}

.tile--selectable:hover {
  border-color: var(--bg--border, var(--border--strong));
}

.tile--selected {
  border-color: var(--bg--base, var(--primary--base));
  background-color: var(--bg--subtle, var(--primary--subtle));
}

.tile--disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

!!!

---

## time-picker.css


**Full path:** `/home/jk/Code/dezign8/src/design/forms/components/time-picker/time-picker.css`


!!!css

!!!

---

## toast.css


**Full path:** `/home/jk/Code/dezign8/src/design/feedback/components/toast/toast.css`


!!!css
/* design/feedback/components/toast/toast.css */

/*
 * Toast component — transient notification box.
 *
 * Imports feedback.css for variant + color channel rules.
 * Overrides the inline-flex pill layout from feedback base.
 *
 * Layout regions:
 *   .toast__icon    — optional leading icon slot
 *   .toast__body    — stacked title + message content
 *   .toast__title   — optional semibold heading
 *   .toast__dismiss — dismiss button (only when toast--dismissible)
 *
 * Container:
 *   [data-toast-region] — fixed viewport stack, created by toast.client.ts
 */

/* ─── Toast layout ────────────────────────────────────────────────────────── */

.toast {
  display:        flex;
  align-items:    flex-start;
  gap:            var(--space-in--sm);
  padding:              var(--toast--p, var(--toast--padding));
  padding-inline:       var(--toast--px, var(--toast--p, var(--toast--padding)));
  padding-block:        var(--toast--py, var(--toast--p, var(--toast--padding)));
  padding-block-start:  var(--toast--pt, var(--toast--py, var(--toast--p, var(--toast--padding))));
  padding-block-end:    var(--toast--pb, var(--toast--py, var(--toast--p, var(--toast--padding))));
  padding-inline-start: var(--toast--pl, var(--toast--px, var(--toast--p, var(--toast--padding))));
  padding-inline-end:   var(--toast--pr, var(--toast--px, var(--toast--p, var(--toast--padding))));
  white-space:    normal;
  line-height:    var(--leading--normal);
  font-size:      var(--toast--font-size);
  width:          min(360px, calc(100vw - 2rem));
  box-shadow:     var(--shadow--md);
  pointer-events: all;
}

/* ─── Entry animation ─────────────────────────────────────────────────────── */

@keyframes toast-in {
  from { opacity: 0; transform: translateY(0.375rem) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.toast {
  animation: toast-in 180ms var(--ease--spring, cubic-bezier(0.34, 1.56, 0.64, 1)) both;
}

/* ─── Icon slot ───────────────────────────────────────────────────────────── */

.toast__icon {
  flex-shrink: 0;
  width:       1.25em;
  height:      1.25em;
  margin-top:  0.125em;
  color:       var(--feedback--color-text);
}

/* ─── Body ────────────────────────────────────────────────────────────────── */

.toast__body {
  flex:    1;
  display: flex;
  flex-direction: column;
  gap:     var(--space-in--2xs);
}

.toast__title {
  font-weight: var(--weight--semibold);
  font-size:   var(--fsf--sm);
  color:       var(--feedback--color-text);
}

/* ─── Dismiss button ──────────────────────────────────────────────────────── */

.toast__dismiss {
  flex-shrink:  0;
  margin-left:  auto;
  padding:      var(--space-in--2xs);
  border:       none;
  background:   transparent;
  cursor:       pointer;
  color:        var(--feedback--color-text);
  border-radius: var(--radius--sm);
  display:      none;
  align-items:  center;
  justify-content: center;
  opacity:      0.7;
  transition:   opacity 150ms ease, background-color 150ms ease;
}

.toast--dismissible .toast__dismiss {
  display: flex;
}

.toast__dismiss:hover {
  opacity: 1;
  background-color: var(--feedback--color-muted);
}

.toast__dismiss:focus-visible {
  outline:        2px solid var(--feedback--color-border);
  outline-offset: 1px;
  opacity:        1;
}

/* ─── Toast region (viewport stack) ──────────────────────────────────────── */

[data-toast-region] {
  position:       fixed;
  z-index:        9000;
  display:        flex;
  flex-direction: column;
  gap:            var(--space-in--sm);
  padding:        var(--space-in--md);
  pointer-events: none;
  /* bottom-end default — overridden per data-position below */
  bottom: 0;
  right:  0;
  align-items: flex-end;
}

[data-toast-region][data-position="top-start"]     { top: 0; left: 0;   bottom: auto; right: auto; align-items: flex-start; }
[data-toast-region][data-position="top-center"]    { top: 0; left: 50%; bottom: auto; right: auto; transform: translateX(-50%); align-items: center; }
[data-toast-region][data-position="top-end"]       { top: 0; right: 0;  bottom: auto; left: auto;  align-items: flex-end; }
[data-toast-region][data-position="bottom-start"]  { bottom: 0; left: 0;  top: auto; right: auto; align-items: flex-start; }
[data-toast-region][data-position="bottom-center"] { bottom: 0; left: 50%; top: auto; right: auto; transform: translateX(-50%); align-items: center; }
[data-toast-region][data-position="bottom-end"]    { bottom: 0; right: 0; top: auto; left: auto;  align-items: flex-end; }

!!!

---

## toolbar.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/toolbar/toolbar.css`


!!!css

!!!

---

## tooltip.css


**Full path:** `/home/jk/Code/dezign8/src/design/overlays/components/tooltip/tooltip.css`


!!!css
/*
 * CSS channels written by tooltip.hook:
 *   --tooltip--radius   border-radius of the bubble (from radius prop)
 */

.tooltip {
  position:    relative;
  display:     inline-flex;
  align-items: center;
}

.tooltip__content {
  position:         absolute;
  z-index:          var(--z--tooltip);

  font-size:        var(--text--sm);
  font-weight:      500;
  line-height:      1.4;
  white-space:      nowrap;

  background-color: var(--bg--5, #334155);
  color:            var(--text--layer-1, #f8fafc);
  border-radius:    var(--tooltip--radius, var(--radius--md));
  padding:          var(--space-in--xs) var(--space-in--sm);
  box-shadow:       var(--shadow--md, 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1));
  border:           1px solid var(--border--subtle, rgba(255, 255, 255, 0.1));

  opacity:          0;
  visibility:       hidden;
  pointer-events:   none;
  transition:       opacity 150ms cubic-bezier(0.16, 1, 0.3, 1), 
                    transform 150ms cubic-bezier(0.16, 1, 0.3, 1), 
                    visibility 0s linear 150ms;
}

/* ── placement ───────────────────────────────────────────── */

.tooltip--top .tooltip__content {
  bottom:    calc(100% + 0.5rem);
  left:      50%;
  transform: translate(-50%, 4px) scale(0.96);
}

.tooltip--bottom .tooltip__content {
  top:       calc(100% + 0.5rem);
  left:      50%;
  transform: translate(-50%, -4px) scale(0.96);
}

.tooltip--left .tooltip__content {
  right:     calc(100% + 0.5rem);
  top:       50%;
  transform: translate(4px, -50%) scale(0.96);
}

.tooltip--right .tooltip__content {
  left:      calc(100% + 0.5rem);
  top:       50%;
  transform: translate(-4px, -50%) scale(0.96);
}

/* ── show ────────────────────────────────────────────────── */

.tooltip:hover .tooltip__content,
.tooltip:focus-within .tooltip__content {
  opacity:          1;
  visibility:       visible;
  transition-delay: 0s;
}

.tooltip--top:hover .tooltip__content,
.tooltip--top:focus-within .tooltip__content {
  transform: translate(-50%, 0) scale(1);
}

.tooltip--bottom:hover .tooltip__content,
.tooltip--bottom:focus-within .tooltip__content {
  transform: translate(-50%, 0) scale(1);
}

.tooltip--left:hover .tooltip__content,
.tooltip--left:focus-within .tooltip__content {
  transform: translate(0, -50%) scale(1);
}

.tooltip--right:hover .tooltip__content,
.tooltip--right:focus-within .tooltip__content {
  transform: translate(0, -50%) scale(1);
}

!!!

---

## tree-view.css


**Full path:** `/home/jk/Code/dezign8/src/design/nav/components/tree-view/tree-view.css`


!!!css

!!!

---

## video.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/video/video.css`


!!!css

!!!

---

## visually-hidden.css


**Full path:** `/home/jk/Code/dezign8/src/design/typography/components/visually-hidden/visually-hidden.css`


!!!css
/* design/typography/components/visually-hidden/visually-hidden.css */

.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}

!!!

---

## waveform.css


**Full path:** `/home/jk/Code/dezign8/src/design/assets/components/waveform/waveform.css`


!!!css

!!!

---

## well.css


**Full path:** `/home/jk/Code/dezign8/src/design/surfaces/components/well/well.css`


!!!css
/* design/surfaces/components/well/well.css */
.well {
  display: block;
}

!!!

---

