/**
 * Screen / Page Component
 * - represents a full viewport-sized area or page-level container.
 * 
 * =======================================================================
 *   
 *   Screen
 *   └── Container
 *       └── Section
 *           └── Stack
 *               └── Content
 * 
 *========================================================================
 *
 * @example
 * <Screen>
 *   <Stack align="center" justify="center">
 *     <H>Settings</H>
 *     <Button>Save</Button>
 *   </Stack>
 * </Screen>
 * 
 * <style>
 * .screen {
 *   min-height: 100vh;
 *   display: flex;
 * }
 * </style>
 * 
 * =======================================================================
 * 
 * Common responsibilities:
 * - min-heigh: 100vh or 100svh
 * - page background
 * - page padding
 * - centering page content
 * - handling sticky footers
 * - handling mobile viewport quirks
 * 
 * =======================================================================
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
// const headerHeight = "var(--header--height)";
// const footerHeight = "var(--footer--height)";

import type { LayoutProps } from "~/layout/layout.props";
import type { PageHeight, ScreenTag, OverflowOptions, PageCentered } from "./screen.tokens";
import { LAYOUT_TOKENS } from "../../layout.tokens";
import { composeTokens } from "~/shared/tokens";

export const SCREEN_TOKENS = composeTokens(LAYOUT_TOKENS, {});


export interface ScreenProps extends LayoutProps {
  as?:       ScreenTag;
  /** HTML tag to render as. @default "div" */
  height:    PageHeight;
  overflow?: OverflowOptions;
  centered?: PageCentered;
}