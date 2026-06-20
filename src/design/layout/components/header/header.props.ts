// design/layout/components/header/header.props.ts

/**
 * HeaderProps
 *
 * Extends the full `LayoutProps` chain (which itself extends `SpacingProps`),
 * meaning every spacing shorthand (`p`, `px`, `py`, `pt` … `ml`), flex controls
 * (`gap`, `align`, `justify`), and base component props (`class`, `bg`, etc.)
 * are available on `<Header>` without re-declaration.
 *
 * Header-specific additions:
 *   - `sticky`  — toggles sticky positioning via a CSS class modifier.
 *
 * Named slots consumed by Header.astro:
 *   - `start`   — left-hand content area (logo, wordmark, hamburger menu).
 *   - default   — center content area (primary nav, search bar).
 *   - `end`     — right-hand content area (CTA, user avatar, icon cluster).
 */

import type { LayoutProps } from "~l/layout.props";

export interface HeaderProps extends LayoutProps {
  /**
   * When `true`, renders the header with `position: sticky; top: 0` so it
   * stays visible as the user scrolls.
   *
   * Implemented via the `header--sticky` BEM modifier class. Z-index is
   * provided automatically via `--z--sticky` when the modifier is active.
   *
   * @default false
   */
  sticky?: boolean;
}
