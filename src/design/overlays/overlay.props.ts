/**
 * OverlayProps
 * 
 * Manages portals, z-index, accessibility, and interaction outside the normal DOM flow.
 * 
 * @prop isOpen - Controlled state dictating visibility.
 * @prop defaultOpen - Uncontrolled initial visibility.
 * @prop onClose - Callback fired when the overlay attempts to close.
 * @prop onOpen - Callback fired when the overlay opens.
 * @prop closeOnEsc - Determines if hitting the Escape key triggers onClose.
 * @prop closeOnOutsideClick - Determines if clicking the background triggers onClose.
 * @prop trapFocus - THOUGHT: Essential for accessibility. Prevents keyboard navigation from leaving the overlay, forcing users to interact or close it before continuing.
 * @prop blockScroll - THOUGHT: Prevents the underlying `body` from scrolling while the modal is open, which stops frustrating double-scrollbars.
 * @prop transition - Preset entrance/exit animations (e.g., slide-up, fade).
 * @prop hasBackdrop - Whether to render a dimming scrim behind the component.
 * @prop portalTarget - Specific DOM node to portal into. THOUGHT: Defaults to document.body, but crucial to expose if you are building inside an iframe or a Shadow DOM environment where `document.body` is isolated.
 */
import type { BaseComponentProps } from "~/shared/base.props";

type OverlayAnimation = "fade" | "slide-up" | "slide-down" | "scale";

export interface OverlayProps extends BaseComponentProps {
  isOpen:              boolean;
  defaultOpen?:        boolean;
  onClose?:            () => void;
  onOpen?:             () => void;
  closeOnEsc?:         boolean;
  closeOnOutsideClick?: boolean;
  trapFocus?:          boolean;
  blockScroll?:        boolean;
  transition?:         OverlayAnimation;
  hasBackdrop?:        boolean;
  portalTarget?:       HTMLElement;
}
