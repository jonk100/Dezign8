---
title: Spacing Props
description: Global spacing shorthand properties for margins and paddings available on all components.
category: Core
status: stable
---

# Spacing Props (`SpacingProps`)

Spacing properties are a set of 14 global shorthand properties for applying padding and margin. They are defined in [spacing.props.ts](file:///home/jk/Code/dezign8/src/design/shared/spacing.props.ts) and are available on all components by extending `BaseComponentProps`.

These properties are automatically intercepted, resolved, and applied by the `useBaseCompose` hook, generating component-scoped CSS variables (e.g., `--layout--p: var(--space-md)`) rather than leaking as raw HTML attributes.

## Padding Properties

Padding properties map to padding CSS variables with your component's scope prefix (e.g., `--layout--p`, `--image--px`).

| Property | Description | Equivalent CSS Variable |
|---|---|---|
| `p` | Padding on all sides | `--{prefix}--p` |
| `px` | Padding on the inline axis (left & right) | `--{prefix}--px` |
| `py` | Padding on the block axis (top & bottom) | `--{prefix}--py` |
| `pt` | Padding top (block-start) | `--{prefix}--pt` |
| `pr` | Padding right (inline-end) | `--{prefix}--pr` |
| `pb` | Padding bottom (block-end) | `--{prefix}--pb` |
| `pl` | Padding left (inline-start) | `--{prefix}--pl` |

## Margin Properties

Margin properties map to margin CSS variables with your component's scope prefix (e.g., `--layout--m`, `--image--mx`).

| Property | Description | Equivalent CSS Variable |
|---|---|---|
| `m` | Margin on all sides | `--{prefix}--m` |
| `mx` | Margin on the inline axis (left & right) | `--{prefix}--mx` |
| `my` | Margin on the block axis (top & bottom) | `--{prefix}--my` |
| `mt` | Margin top (block-start) | `--{prefix}--mt` |
| `mr` | Margin right (inline-end) | `--{prefix}--mr` |
| `mb` | Margin bottom (block-end) | `--{prefix}--mb` |
| `ml` | Margin left (inline-start) | `--{prefix}--ml` |

## Spacing Token Scale

Each property accepts a single spacing token (e.g., `sm`, `md`, `lg`), a space-separated set of tokens (e.g., `md xl`), or a raw CSS length value (e.g., `12px`, `2rem`).

Spacing tokens map to design system scale variables under the hood:
* **Padding:** Maps to internal `--space-in--*` (or `--space--*`) tokens.
* **Margin:** Maps to internal `--space-out--*` tokens.

**Example usage:**
```astro
<Box p="md" mt="lg" />
<Image p="sm" m="xl" />
```

## How It Works Under The Hood

When you call `useBaseCompose` in your component's hook, it automatically:
1. Destructures the spacing properties from the incoming `base` props.
2. Infers the component prefix from the first CSS class (or uses the explicit `prefix` option).
3. Resolves the tokens into CSS custom properties using `resolveSpacingStyles`.
4. Appends the resulting variables to the inline `style` attribute.
5. Excludes these keys from the returned `rest` object to prevent them from leaking into the DOM as invalid HTML attributes.
