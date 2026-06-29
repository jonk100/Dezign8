import eslint from 'vite-plugin-eslint';
import path from 'node:path';

// @ts-check
import mdx from '@astrojs/mdx';
import { defineConfig } from 'astro/config';
import dezign8 from './src/design/integration.ts';
import { rehypeHeadingLevel } from "./src/plugins/rehype-heading-level.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    dezign8(),
    mdx({
      rehypePlugins: [rehypeHeadingLevel]
    }),
  ]
});
