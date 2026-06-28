import eslint from 'vite-plugin-eslint';
import path from 'node:path';

// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import { tokensPlugin } from "./plugins/tokens"
import { checkCssVarsPlugin } from "./plugins/check-css-vars";
import { propsPlugin } from "./plugins/props";
import { rehypeHeadingLevel } from "./src/plugins/rehype-heading-level.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      // rehypePlugins: [rehypeHeadingLevel]
    }),
  ],
  vite: {
    plugins: [
      // Token generatiom
      tokensPlugin(),
      checkCssVarsPlugin(),
      propsPlugin(),
      // eslint()
    ],
    resolve: {
      alias: {
        "~": path.resolve("./src/design"),
        "@": path.resolve("./src"),
        "~sh": path.resolve("./src/design/shared"),
        "~st": path.resolve("./src/design/styles"),
        "~l": path.resolve("./src/design/layout"),
        "~ty": path.resolve("./src/design/typography"),
        "~tr": path.resolve("./src/design/triggers"),
        "~a": path.resolve("./src/design/assets"),
        "~f": path.resolve("./src/design/forms"),
        "~fb": path.resolve("./src/design/feedback"),
        "~su": path.resolve("./src/design/surfaces"),
        "~da": path.resolve("./src/design/data"),
        "~o": path.resolve("./src/design/overlays"),
        "~n": path.resolve("./src/design/nav"),
        "@layout": path.resolve("./src/design/layout"),
        "@typography": path.resolve("./src/design/typography"),
        "@triggers": path.resolve("./src/design/triggers"),
        "@assets": path.resolve("./src/design/assets"),
        "@forms": path.resolve("./src/design/forms"),
        "@feedback": path.resolve("./src/design/feedback"),
        "@surfaces": path.resolve("./src/design/surfaces"),
        "@data": path.resolve("./src/design/data"),
        "@overlays": path.resolve("./src/design/overlays"),
        "@nav": path.resolve("./src/design/nav"),
        "~/assets_/": path.resolve("./src/design/assets/components/"),
        "~/data_/": path.resolve("./src/design/data/components/"),
        "~/feedback_/": path.resolve("./src/design/feedback/components/"),
        "~/forms_/": path.resolve("./src/design/forms/components/"),
        "~/layout_/": path.resolve("./src/design/layout/components/"),
        "~/nav_/": path.resolve("./src/design/nav/components/"),
        "~/overlays_/": path.resolve("./src/design/overlays/components/"),
        "~/shared_/": path.resolve("./src/design/shared/components/"),
        "~/surfaces_/": path.resolve("./src/design/surfaces/components/"),
        "~/triggers_/": path.resolve("./src/design/triggers/components/"),
        "~/typography_/": path.resolve("./src/design/typography/components/"),
      },
    }
  }
});
