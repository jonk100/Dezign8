# Encapsulate Design Config

## Decisions
- **Encapsulate Design Configuration**: Moved `tsconfig.paths.json` and the `plugins` folder into `src/design/.config/` so that the entire design system and its required build configuration can be ported as a single drop-in directory to any other Astro project.
- **Dynamic Vite Aliases**: Created `src/design/.config/vite-aliases.ts` to export the path aliases dynamically using `import.meta.url`. This ensures that the Vite aliases resolve correctly relative to the `src/design` directory regardless of where it is mounted in the target project.
- **Update TSConfig BaseUrl**: Changed the `baseUrl` in `src/design/.config/tsconfig.paths.json` from `.` to `../../..` to correctly resolve from the root of the project it is placed in, and updated the root `tsconfig.json` to extend this new path.
- **Update Astro Config**: Updated the root `astro.config.mjs` to import plugins and aliases from the encapsulated `.config` location instead of the root directory.
