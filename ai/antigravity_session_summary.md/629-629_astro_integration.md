# Zero-Config Astro Integration

## Decisions
- **Astro Integration**: Created an Astro integration at `src/design/integration.ts` that completely encapsulates the Vite plugin wiring and path alias setup. 
- **Automatic Configuration**: This integration injects the necessary Vite configuration (tokens plugin, css vars checker, props plugin, and aliases) directly into the Astro pipeline.
- **TSConfig Linting**: Added a warning to the integration that runs during the build if the user's `tsconfig.json` is missing the required path extends statement, guiding them exactly on what to paste.
- **Simplified Setup**: The user only needs to import `dezign8()` in their `astro.config.mjs` instead of manually configuring Vite, vastly reducing the boilerplate required to port the design system.
