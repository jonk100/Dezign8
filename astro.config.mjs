// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import { tokensPlugin } from "./plugins/tokens"
import { checkCssVarsPlugin } from "./plugins/check-css-vars";

import { rehypeHeadingLevel } from "./src/plugins/rehype-heading-level.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx({
      rehypePlugins: [rehypeHeadingLevel]
    }),
  ],
  vite: {
    plugins: [
      tokensPlugin(),
      checkCssVarsPlugin()
    ],
  },
});
