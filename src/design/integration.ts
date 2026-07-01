import type { AstroIntegration } from "astro";
import { tokensPlugin } from "./.config/plugins/tokens";
import { checkCssVarsPlugin } from "./.config/plugins/check-css-vars";
import { propsPlugin } from "./.config/plugins/props";
import { designAliases } from "./.config/vite-aliases";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// propsPlugin generates docs specific to the dezign8 app itself (a props
// report written into its own content collection) — only run it when this
// package is the app being developed, not when installed as a dependency.
const isExternalConsumer = fileURLToPath(import.meta.url).includes(
  `${path.sep}node_modules${path.sep}`,
);

export function dezign8(): AstroIntegration {
  return {
    name: "dezign8",
    hooks: {
      "astro:config:setup": ({ updateConfig, config, logger }) => {
        // 1. Inject the Vite plugins and aliases automatically
        const plugins = [tokensPlugin(), checkCssVarsPlugin()];
        if (!isExternalConsumer) {
          plugins.push(propsPlugin());
        }

        updateConfig({
          vite: {
            plugins,
            resolve: {
              alias: designAliases
            }
          }
        });

        // 2. Check if tsconfig.json is wired up, and if not, warn the user
        try {
          const tsconfigPath = new URL("tsconfig.json", config.root);
          if (fs.existsSync(tsconfigPath)) {
            const content = fs.readFileSync(tsconfigPath, "utf-8");

            if (!content.includes("tsconfig.paths.json")) {
              const suggestedPath = isExternalConsumer
                ? "dezign8/.config/tsconfig.paths.json"
                : "./src/design/.config/tsconfig.paths.json";
              logger.warn(
                `Your tsconfig.json does not extend the design system paths.\n` +
                `To fix editor imports, add "${suggestedPath}" to the "extends" array in your tsconfig.json.`
              );
            }
          }
        } catch (e) {
          // Ignore file read errors
        }
      }
    }
  };
}

export default dezign8;