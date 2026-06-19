# Color System — Overview

How color moves from raw palette through semantic tokens into
component CSS. Four files cover the full system:

| File | Covers |
|---|---|
| **color-overview.md** (this file) | Orientation, three-layer diagram, quick reference |
| **color-roles.md** | The 7 steps per role, what each means, neutral, adding roles |
| **color-typescript.md** | `primitives.tokens.ts` additions, `resolveColorChannels`, hook wiring |
| **color-css.md** | Variant CSS rules, step × variant matrix, semantic state CSS |

---

## The three layers

```
color-vars.css        --cyan-15              raw oklch step, no meaning
       │
tokens-color.css      --primary--base        semantic role + step name
       │                                     theme-aware (light/dark)
       │
hook writes           --control--color-base  component channel
       │              (7 channels per color prop)
       │
component CSS         var(--control--color-base)   ← the only thing CSS touches
```

Component CSS never references `--primary--base` directly.
The hook translates role → channels so CSS stays decoupled from
which role is active.

---

## Color roles

Six roles, available as a `color` prop on any component that uses
`COLOR_DIM` and `resolveColorChannels`:

| Role | Source palette | Typical use |
|---|---|---|
| `primary` | cyan | Main actions, primary buttons, links |
| `secondary` | purple | Secondary actions, alternative emphasis |
| `accent` | lime | Highlights, badges, decorative tags |
| `danger` | red | Destructive actions, errors, alerts |
| `warning` | orange | Caution, pending, degraded states |
| `success` | lime (darker steps) | Confirmation, completion, positive feedback |
| `neutral` | slate (surface tokens) | Muted controls, ghost elements |

→ See **color-roles.md** for the 7 steps each role exposes and what they mean.

---

## How a color prop flows through the system

```
<Button color="primary" variant="soft">

1. hook destructures color = "primary"
2. resolveTokens emits class:  button--primary   (modifier, no CSS var)
3. resolveColorChannels writes:
     --control--color-subtle: var(--primary--subtle)
     --control--color-muted:  var(--primary--muted)
     --control--color-base:   var(--primary--base)
     --control--color-vivid:  var(--primary--vivid)
     --control--color-deep:   var(--primary--deep)
     --control--color-border: var(--primary--border)
     --control--color-text:   var(--primary--text)
4. CSS .control--soft reads --control--color-subtle for bg
                             --control--color-text   for fg

swap to color="danger" → same CSS rule, different channel values
```

→ See **color-typescript.md** for the full hook implementation.
→ See **color-css.md** for the variant CSS rules.

---

## Quick reference — which step for what

| Want to... | Use |
|---|---|
| Fill a solid button | `--{cat}--color-base` bg, `--text--on-color` text |
| Hover a solid button | `--{cat}--color-vivid` bg |
| Press a solid button | `--{cat}--color-deep` bg |
| Fill a soft/tinted element | `--{cat}--color-subtle` bg |
| Hover a soft element | `--{cat}--color-muted` bg |
| Border an outlined element | `--{cat}--color-border` |
| Text on neutral background | `--{cat}--color-text` |
| Text on colored background | `--text--on-color` (not a role step) |
| State-driven (no prop) | `--danger--border`, `--success--base` etc. directly |