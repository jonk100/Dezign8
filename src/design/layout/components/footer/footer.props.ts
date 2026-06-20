// design/layout/components/footer/footer.props.ts

/**
 * FooterProps
 *
 * Extends the full `LayoutProps` chain (which itself extends `SpacingProps`),
 * meaning every spacing shorthand (`p`, `px`, `py`, `pt` … `ml`), flex controls
 * (`gap`, `align`, `justify`), and base component props (`class`, `bg`, etc.)
 * are available on `<Footer>` without re-declaration.
 *
 * Footer introduces no props beyond those it inherits. Its semantic role is
 * fixed (`<footer>`) and it carries no behavioural variants (unlike Header's
 * `sticky`). Rich internal layouts are achieved by composing Box children
 * inside its named slots rather than via additional footer-level props.
 *
 * Named slots consumed by Footer.astro:
 *   - `start`   — left-hand content area (copyright notice, brand mark).
 *   - default   — center content area (nav links, social icons).
 *   - `end`     — right-hand content area (legal links, locale picker).
 */

import type { LayoutProps } from "~l/layout.props";

export interface FooterProps extends LayoutProps {}
