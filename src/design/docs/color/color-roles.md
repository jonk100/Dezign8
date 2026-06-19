# Color System — Roles & Steps

→ See **color-overview.md** for orientation.

---

## The 7 steps per role

Every role exposes the same 7 named steps in `tokens-color.css`.
They're designed as a set — not interchangeable, each with a specific job.

```
subtle   ░░░░░░░░░░  Very light tint. Background for soft/tinted elements.
muted    ▒▒▒▒▒▒▒▒▒▒  Soft tint. Hover background on soft variants.
base     ██████████  The color. Solid fills, active borders.
vivid    ██████████▌ Slightly brighter/deeper. Hover on solid elements.
deep     ████████▓▓  Dark shade. Pressed states, heavy emphasis.
border   ▓▓▓▓▓▓      Between muted and base. Outlined borders.
text     ████         Readable foreground on neutral backgrounds.
```

### `subtle`
The lightest tint. Used as the background of soft, tinted elements —
badge fills, chip backgrounds, tag surfaces, alert backgrounds. Should
barely read as colored in light mode; in dark mode it's a
color-mixed surface against the dark bg.

### `muted`
One step richer than subtle. The hover state for elements that
use `subtle` as their base background. Also works as a "selected"
background when you want more presence than subtle.

### `base`
The color itself. Used for solid fills (buttons, progress bars, toggles)
and as the active state of outlined borders. In light mode this is
typically a mid-range palette step; in dark mode it shifts slightly
brighter to maintain presence against dark surfaces.

### `vivid`
The hover target for solid elements. Slightly deeper or more
saturated than `base`. On accent colors (primary/secondary/accent)
this is a true step up; on semantic colors (danger/warning/success)
where there's less range, this often aliases to `base`.

### `deep`
The pressed/active state. Also works as foreground text color on
light neutral backgrounds (e.g. a link that uses the primary color).
Not for use as a background in dark mode — it's too dark.

### `border`
Calibrated specifically for borders — slightly more vivid than
`subtle`, enough to read against the nearest background surface.
Used by outlined and dashed variants.

### `text`
For role-colored text on a neutral background: links, labels,
inline highlights, icon fills. Always readable at the category's
target WCAG contrast ratio. Not the same as `--text--on-color`
(which is for text on top of a solid colored background).

---

## Role definitions

### Accent roles (primary, secondary, accent)

Have a full vivid step distinct from base. Designed for interactive
UI chrome where hover state needs to feel noticeably different.

```
primary   → cyan palette   — main CTA, links, selected states
secondary → purple palette — alternative actions, secondary nav
accent    → lime palette   — decorative highlights, tags, badges
```

### Semantic roles (danger, warning, success)

Vivid and deep alias to each other since the semantic palettes
have less range to work with. These roles communicate status more
than interaction, so hover/press distinctions matter less.

```
danger  → red palette    — destructive, error, critical
warning → orange palette — caution, pending, degraded
success → lime palette (deeper steps) — complete, confirmed, positive
```

### Neutral role

Doesn't map to a palette — maps to the surface and border token
system instead. A neutral solid button uses `--border--strong` as
its background, a neutral outlined button uses `--border--default`
for its border. Reads as grey/muted, stays on-theme in both
light and dark automatically.

```ts
neutral: {
  subtle: "var(--bg--3)",
  muted:  "var(--bg--4)",
  base:   "var(--border--strong)",
  vivid:  "var(--border--strong)",
  deep:   "var(--text--secondary)",
  border: "var(--border--default)",
  text:   "var(--text--secondary)",
}
```

---

## `--text--on-color`

A special token — not a role step. It's the text color for content
rendered ON a solid colored background (a solid button's label,
white text on a filled badge). Defined in `tokens-color.css` as
near-black slate in both themes.

```css
--text--on-color: var(--slate-30);
```

**Note:** This works for most accent roles at their `base` step, but
spot-check `danger` and `warning` in dark mode — their `base` steps
are mid-range colors, and `--slate-30` text on them may not reach
4.5:1 contrast. If needed, override per-role in `tokens-color.css`.

---

## Adding a new color role

1. Add to `COLOR_ROLE` scale in `primitives.tokens.ts`:
   ```ts
   info: null,
   ```

2. Add its 7 steps to `COLOR_STEPS`:
   ```ts
   info: {
     subtle: "var(--info--subtle)",
     muted:  "var(--info--muted)",
     base:   "var(--info--base)",
     vivid:  "var(--info--base)",      // alias if no distinct vivid
     deep:   "var(--info--text)",
     border: "var(--info--border)",
     text:   "var(--info--text)",
   },
   ```

3. Confirm `--info--{subtle,muted,base,vivid,deep,border,text}` exist
   in `tokens-color.css` for **both** light and dark themes.

4. Done — every component using `COLOR_DIM` + `resolveColorChannels`
   now accepts `color="info"`. No component files change.