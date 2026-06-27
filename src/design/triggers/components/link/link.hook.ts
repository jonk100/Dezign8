// design/typography/link/link.hook.ts

import type { LinkProps } from "./link.props";
import { LINK_DEFAULTS } from "./link.tokens";
import { useTypography } from "~ty/typography.hook";
import { composeClass } from "~sh/base.hook";

/**
 * Hook: `useLink`
 * 
 * Prepares the properties, CSS classes, and HTML attributes for a Link component.
 * Links inherit from the Typography system as they are visually similar to text.
 * 
 * Handles the logic for:
 * - Setting `target="_blank"` and `rel="noopener noreferrer"` securely when `ext` is true.
 * - Applying typography attributes seamlessly.
 * - Generating class names for underline behavior (`always`, `hover`, `never`).
 * 
 * @param {LinkProps} props - The link properties, extending typography options.
 * @returns An object containing the HTML Tag (`a`) and resolved attributes (`props`).
 */
export function useLink(props: LinkProps) {
  const {
    href,
    target,
    rel,
    external    = false,
    underline   = LINK_DEFAULTS.underline,
    icon,
    class: className,
    ...typographyProps
  } = props;

  // Resolve target and rel for secure external linking
  const resolvedTarget = external ? "_blank" : target;
  const resolvedRel    = external || target === "_blank"
    ? (rel ?? "noopener noreferrer")
    : rel;

  // Process typography attributes alongside link-specific classes
  const { typographyAttributes } = useTypography({
    ...typographyProps,
    class: composeClass("link", `link--underline-${underline}`, className),
  });

  return {
    Tag: "a" as const,
    props: {
      ...typographyAttributes,
      href,
      target: resolvedTarget,
      rel:    resolvedRel,
    },
  };
}