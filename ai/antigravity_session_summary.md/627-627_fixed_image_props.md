# Fixed ImageProps in Image Component

**Date:** 2026/06/27

## Overview
Added the `type Props = ImageProps;` definition to `src/design/assets/components/image/Image.astro`.

## Key Decisions
- The `Image` component was missing its `Props` type export, which caused the Astro Language Server to default to standard `img` HTML attributes.
- By adding `type Props = ImageProps;`, the editor now properly provides autocomplete for custom properties like `fit`, and correctly types `height` to accept both strings (e.g. `"50%"`) and numbers.

## Updated Files
- `src/design/assets/components/image/Image.astro`
