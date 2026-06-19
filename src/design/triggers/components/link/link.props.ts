// design/typography/link/link.props.ts

import type { TypographyProps } from "~ty/typography.props";
import type { LinkUnderline } from "./link.tokens";

/**
 * Interface: `LinkProps`
 * 
 * Defines the API for the Link component.
 * Because links are primarily textual, this interface extends `TypographyProps`,
 * allowing you to use sizes, weights, families, and colors directly on the link.
 */
export interface LinkProps extends TypographyProps {
  /** 
   * The destination URL for the link.
   * Required for semantic navigation.
   */
  href:        string;
  
  /** 
   * Specifies where to open the linked document.
   * @example "_blank" (new tab), "_self" (same frame)
   */
  target?:     string;
  
  /** 
   * Specifies the relationship between the current document and the linked document.
   * Automatically defaults to 'noopener noreferrer' when `target` is '_blank' or `external` is true
   * to prevent security vulnerabilities (reverse tabnabbing).
   */
  rel?:        string;
  
  /** 
   * Shorthand boolean to designate an external link.
   * When true, this automatically applies `target="_blank"` and `rel="noopener noreferrer"`.
   */
  external?:   boolean;
  
  /** 
   * Controls when the underline appears.
   * - `always`: Underline is constantly visible.
   * - `hover`: Underline only appears on mouse over or focus.
   * - `never`: No underline is shown.
   * 
   * @default "hover"
   */
  underline?:  LinkUnderline;
}