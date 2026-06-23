/**
 * @file Base property definitions for the nav component family.
 * @module design/nav
 *
 * This file defines the `NavProps` interface, which establishes the shared
 * visual and behavioral API contract for all navigation controls (Menu,
 * Tabs, Pagination, etc.).
 *
 * **Architecture Note:**
 * This interface intentionally DOES NOT include data props like `items`.
 * Data shape is strictly component-specific. `NavProps` only handles the
 * visual tokens (`size`, `variant`, `color`, `radius`) and shared state (`activeId`).
 */
import type { BaseComponentProps } from "~/shared/base.props";
import type { NavSize, NavVariant, NavColor, NavRadius } from "./nav.tokens";

/**
 * Shared props for all navigation controls in the `nav` category.
 *
 * Component-specific data structures (like `items`) belong in the
 * specific component props (e.g., MenuProps, TabsProps).
 */
export interface NavProps extends BaseComponentProps {
  /** Overall size tier of the control. */
  size?: NavSize;

  /** Visual treatment of the control. */
  variant?: NavVariant;

  /** Color role for the control's interactive and active states. */
  color?: NavColor;

  /** Border-radius of the control or its active indicator. */
  radius?: NavRadius;

  /**
   * Layout orientation of the navigation control.
   * @default "horizontal"
   */
  orientation?: "horizontal" | "vertical";

  /**
   * The identifier of the currently active navigation item.
   * Compared against individual item IDs or hrefs to determine `aria-current` or `aria-selected`.
   */
  activeId?: string;
}