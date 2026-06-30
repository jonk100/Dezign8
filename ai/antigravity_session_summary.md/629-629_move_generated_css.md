# Move Generated CSS

## Decisions
- **Relocated Output**: Modified the `dezign8-tokens` Vite plugin (in `src/design/.config/plugins/tokens.ts`) to output `tokens.generated.css` directly into `src/design/styles/` instead of the outer `src/styles/` directory.
- **Updated Imports**: Updated `src/design/styles/global.css` to import the generated file from its new localized location (`@import "./tokens.generated.css"`).
- **Updated Verifiers**: Updated the `check-css-vars` plugin to scan for the generated file in its new location.
- **Portability**: This ensures that 100% of the build artifacts directly related to the design system are contained within the `src/design` folder boundary, making the folder completely self-sufficient and portable.
