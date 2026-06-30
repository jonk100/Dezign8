# Avatar and Input Group Implementation

## Overview
Implemented three new design system components:
1. `AvatarGroup`: A layout container for grouping `Avatar` components with overlapping effects and spacing.
2. `InputGroup`: A layout container for visually joining form fields (`Input`, `Select`, `Button`) without internal borders and radii.
3. `InputAddon`: A static text box used as a prefix or suffix within an `InputGroup`.

## Architectural Decisions
- **AvatarGroup Overflow**: Since Astro slots are opaque on the server, we adopted the Mantine pattern where `AvatarGroup` acts as a pure layout wrapper, and the consumer is responsible for appending an overflow indicator like `<Avatar initials="+3" />`.
- **Flex Component**: Refactored `AvatarGroup` and `InputGroup` to use the design system's existing `Flex` component instead of raw `div` tags.
- **CSS Variable Checks**: Strict CSS variable checking was satisfied by properly defining component-level tokens using `defineTokens` and `dimension` utilities, and mapping them correctly in CSS.
- **Input Group Connected Mode**: Implemented a CSS-based connected mode similar to `ButtonGroup`, using `margin-inline-start: -1px` to collapse adjacent borders.
