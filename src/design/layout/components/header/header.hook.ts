// design/layout/components/header/header.hook.ts

/**
 * useHeader
 *
 * Prepares the resolved Tag, class list, and inline styles for the Header
 * component. Follows the same hook contract as every other layout component:
 * delegate structural concerns to `useLayout`, then layer component-specific
 * concerns on top.
 *
 * Responsibility split:
 *   useLayout  — resolves spacing (px/py/p/m/…), gap, align, justify into
 *                CSS channels and the `layout` base class.
 *   useHeader  — applies HEADER_DEFAULTS when props are omitted, appends
 *                the `header` class, and conditionally adds `header--sticky`.
 *
 * The header tag is always the semantic `<header>` element. Unlike Box, there
 * is no `as` prop because the semantic role is the entire point of this component.
 *
 * Default prop merging strategy:
 *   Props are destructured with default values, so user-supplied values always
 *   win. Explicitly passing `px={undefined}` does NOT reset to the default
 *   (TypeScript prevents it for typed props); omitting the prop entirely triggers
 *   the default.
 */

import type { HeaderProps } from "./header.props";
import { HEADER_DEFAULTS } from "./header.tokens";
import { useLayout } from "~l/layout.hook";
import { composeClass, composeStyle } from "~sh/base.hook";

/**
 * Resolves `HeaderProps` into a `{ Tag, props }` object ready for spread onto
 * the root element in Header.astro.
 *
 * @param props - All props passed to the `<Header>` component.
 * @returns `Tag` — always `"header"`.
 * @returns `props` — merged class, style, data attributes, and any unknown
 *          pass-through props forwarded from the consumer.
 *
 * @example Minimal — all defaults apply:
 *   useHeader({})
 *   // class: "layout header"
 *   // style: "--layout--px: var(--space-in--lg); --layout--align: center; --layout--justify: space-between"
 *
 * @example Sticky + custom padding override:
 *   useHeader({ sticky: true, px: "xl" })
 *   // class: "layout header header--sticky"
 *   // style: "--layout--px: var(--space-in--xl); …"
 */
export function useHeader(props: HeaderProps) {
  const {
    sticky = false,
    // Apply opinionated defaults; user value takes priority via destructuring default
    px      = HEADER_DEFAULTS.px,
    align   = HEADER_DEFAULTS.align,
    justify = HEADER_DEFAULTS.justify,
    ...rest
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest: remaining } = useLayout({
    px,
    align,
    justify,
    ...rest,
  });

  return {
    Tag: "header" as const,
    props: {
      class: composeClass(
        layoutClass,
        "header",
        sticky && "header--sticky",
      ),
      style: composeStyle(layoutStyle),
      ...layoutAttrs,
      ...remaining,
    },
  };
}
