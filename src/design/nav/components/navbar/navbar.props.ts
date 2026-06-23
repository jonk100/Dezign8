import type { NavProps } from "../../nav.props";

export interface NavbarProps extends NavProps {
  /** If true, the navbar sticks to the top of the viewport when scrolling */
  sticky?: boolean;
  /** If true, applies a glassmorphism blur effect to the background */
  glass?: boolean;
  /** Custom max-width for the internal container (e.g., "1200px" or "100%") */
  maxWidth?: string;
}
