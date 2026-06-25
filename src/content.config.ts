import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    // Core details
    title: z.string().describe("The name of the component or documentation page."),
    description: z.string().describe("A brief, actionable description of what the component does or when to use it."),
    
    // Categorization for automated sidebars and grouping
    category: z.enum([
      'Layout', 
      'Surfaces', 
      'Triggers', 
      'Forms', 
      'Overlays', 
      'Nav', 
      'Feedback', 
      'Assets', 
      'Data', 
      'Typography', 
      'Core'
    ]).optional().describe("The design system category this component belongs to."),
    
    // Lifecycle management to set developer expectations
    status: z.enum(['draft', 'experimental', 'stable', 'deprecated']).default('draft'),
    version: z.string().optional().describe("The version of the library where this was introduced."),
    
    
    // Icon from the design system icon registry (kebab-case SVG name)
    icon: z.string().optional(),

    // References for cross-functional alignment
    links: z.object({
      figma: z.url().optional(),
      source: z.url().optional(),
    }).optional()
  })
});

const components = defineCollection({
  schema: z.object({
    name: z.string(),
    category: z.string(),
    subcategory: z.string().optional(),
    slots: z.array(z.string()).default([]),
    responsive: z.boolean().default(false),
    themeable: z.boolean().default(false),
    examples: z.array(z.string()).default([]),
    notes: z.array(z.string()).default([]),
    anatomy: z.array(z.string()).default([]),
    patterns: z.array(z.string()).default([]),
    version: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    aliases: z.array(z.string()).default([]),
    variants: z.array(z.string()).default([]),
    sizes: z.array(z.string()).default([]),
    status: z.enum([
      'draft',
      'experimental',
      'stable',
      'deprecated',
    ]),
    props: z.object({
      own: z.array(z.string()).default([]),
      inherited: z.array(z.string()).default([]),
      aria: z.array(z.string()).default([]),
    }),
    relationships: z.object({
      parents: z.array(z.string()).default([]),
      children: z.array(z.string()).default([]),
      peers: z.array(z.string()).default([]),
      alternatives: z.array(z.string()).default([]),
    }),
    tokens: z.object({
      typography: z.array(z.string()).default([]),
      spacing: z.array(z.string()).default([]),
      color: z.array(z.string()).default([]),
      radius: z.array(z.string()).default([]),
      shadow: z.array(z.string()).default([]),
      animation: z.array(z.string()).default([]),
    }),
    css: z.object({
      variables: z.array(z.string()).default([]),
      classes: z.array(z.string()).default([]),
    }),
    accessibility: z.object({
      keyboard: z.boolean().default(false),
      focusVisible: z.boolean().default(false),
      screenReader: z.boolean().default(false),
      roles: z.array(z.string()).default([]),
      patterns: z.array(z.string()).default([]),
    }),
    files: z.object({
      component: z.string(),
      styles: z.string().optional(),
      types: z.string().optional(),
      config: z.string().optional(),
    }),
    documentation: z.object({
      docs: z.string().optional(),
      figma: z.string().url().optional(),
      storybook: z.string().optional(),
    }),
    search: z.object({
      keywords: z.array(z.string()).default([]),
      intents: z.array(z.string()).default([]),
    }),
    maintenance: z.object({
      author: z.string().optional(),
      created: z.string(),
      updated: z.string(),
    }),
    usage: z.object({
      recommended: z.boolean().default(false),
      public: z.boolean().default(true),
      deprecated: z.boolean().default(false),
    }),
    exports: z.object({
      components: z.array(z.string()).default([]),
      types: z.array(z.string()).default([]),
      utilities: z.array(z.string()).default([]),
    }),

  }),
});

const categories = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    props: z.array(z.string()).default([]),
    children: z.array(z.string()).default([]),
    patterns: z.array(z.string()).default([]),
    tokens: z.array(z.string()).default([]),
    examples: z.array(z.string()).default([]),
    links: z.object({
      docs: z.string().optional(),
    }).optional(),
  }),
});

export const collections = { docs, components, categories };
