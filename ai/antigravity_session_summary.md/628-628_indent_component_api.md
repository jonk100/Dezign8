# Session Summary: Indent Component API

## Date
2026/06/28 to 2026/06/28

## Key decisions
- **Indent API pattern**: The `Indent` component has been refactored to accept contextual props (`prose`, `ui`, `code`) instead of separate `type` and `size` props. This matches the user's requested API.
- **Mutual Exclusivity Enforcement**: A runtime check was implemented in `indent.hook.ts` to ensure only one of the three context props (`prose`, `ui`, `code`) can be passed. If more than one is passed, it throws a clear runtime error.
- **Tokens**: `indent.tokens.ts` was added to declare three separate sets of token mappings for sizes `ng` to `xl` across the three contexts (`prose`, `ui`, `code`), applying ems, chs, etc.
- **Hook + CSS Integration**: `indent.hook.ts` parses the prop, finds the corresponding token value, and sets an inline `--indent-size: <value>` custom property on the `<Tag>`. `indent.css` reads this using `padding-left: var(--indent-size)`.
- **Astro Component**: `Indent.astro` leverages `useIndent` to merge the typography attributes with the resolved `class` and `style` dynamically, propagating any `typographyAttributes` automatically without explicit mapping.
