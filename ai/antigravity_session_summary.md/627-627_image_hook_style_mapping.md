# Map CSS lengths in ImageProps to inline styles

**Date:** 2026/06/27

## Overview
Updated `src/design/assets/components/image/image.hook.ts` to correctly handle `width` and `height` properties based on their type. 

## Key Decisions
- The `ImageProps` already defined `width` and `height` as accepting both numbers and strings (e.g. `50%`, `100px`). However, standard HTML `<img>` elements ignore strings with CSS units in their native `width` and `height` attributes.
- Wrote `isCssValue` and `isHtmlValue` helper functions inside the hook.
- When string properties contain CSS units (e.g. `"50%"`), they are now injected directly into the `style` array so they correctly override the default CSS sizing.
- Purely numeric properties (e.g. `200` or `"200"`) remain passed down as standard HTML attributes for intrinsic layout sizing.

## Updated Files
- `src/design/assets/components/image/image.hook.ts`
