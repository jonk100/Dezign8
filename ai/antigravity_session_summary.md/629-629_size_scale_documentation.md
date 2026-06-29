# Size Scale Documentation — Session Summary

## Date Range
2026/06/29 to 2026/06/29

## Context & Key Decisions
The user requested a documentation page detailing how the unified size scale works in our design system, including a robust schema that separates system specifications from standard component reference pages.

1. **Content Config & Robust Schema (`src/content.config.ts`)**:
   We added a new `system` content collection inside `./src/content/system` with a custom, robust schema:
   * `title`: Title of the specification.
   * `description`: Actionable description.
   * `category`: Subsystem domains (`Tokens`, `Architecture`, `Motion`, `Color`).
   * `status`: Maturity lifecycle (`draft`, `experimental`, `stable`, `deprecated`).
   * `version`: Version reference.
   * `updated`: Date last updated.

2. **Custom Routing (`src/pages/docs/system/[...slug].astro`)**:
   We created a new dynamic router under `/docs/system/[slug]` to fetch and render documents from the new `system` content collection, utilizing the shared `DocsLayout` to maintain design system consistency.

3. **Unified Size Scale Guide (`src/content/system/size-scale.mdx`)**:
   We wrote a comprehensive guide detailing:
   * The 12-step unified scale (`3xs` to `6xl`).
   * The distinction between fluid font sizes (`fs--*`) and fixed/structural control font sizes (`fsf--*` / `label--*`).
   * Declarative mapping and coordination via component size maps.
   * Centralized resolution using `resolveComponentSizes`.

## New Files
- `src/pages/docs/system/[...slug].astro`
- `src/content/system/size-scale.mdx`
- `ai/antigravity_session_summary.md/629-629_size_scale_documentation.md`

## Updated Files
- `src/content.config.ts`
- `ai/agent_decision_log.md`
