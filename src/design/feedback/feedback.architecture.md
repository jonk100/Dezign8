# Feedback Components Architecture

## Overview
The `feedback` module provides a unified set of components for communicating status, progress, and context to the user. This includes badges, tags, chips, spinners, progress bars, and alerts.

## Token Architecture
The visual and spatial properties of feedback components are governed by `feedback.tokens.ts`. 

- **Size (`FEEDBACK_SIZE`)**: Defines physical dimensions. Unlike structural sizes, feedback sizes are modifier-class only (`null` values) and map to component-specific spatial channels in their respective stylesheets (e.g., `sm` on a badge adjusts font-size and padding, while `sm` on a spinner adjusts diameter).
- **Variant (`VARIANT_DIM`)**: Defines visual treatments (solid, soft, outlined, ghost, dashed). This dimension is shared with forms and triggers to maintain system-wide consistency.
- **Color (`COLOR_DIM`)**: Links to the global color roles (primary, secondary, danger, etc.).
- **Radius (`RADIUS_DIM`)**: Controls the border-radius (defaulting to pill shapes).

## Architectural Decisions
- **Shared Variants**: The `variant` scale is extracted to `primitives.tokens.ts` (as `VARIANT_DIM`) and shared with `forms` to prevent DRY violations, as the conceptual visual treatments (solid, soft, outlined, ghost, dashed) mean the exact same thing across different interaction components.
- **Null Scale Values**: We use `null` in `scale()` definitions for `size` and `variant` to ensure that `resolveTokens` emits a modifier class (e.g. `feedback--solid`) rather than a CSS variable, leaving the specific physical mapping up to the component's CSS.
