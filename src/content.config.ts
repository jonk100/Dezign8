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
    
    
    // References for cross-functional alignment
    links: z.object({
      figma: z.url().optional(),
      source: z.url().optional(),
    }).optional()
  })
});

export const collections = { docs };
