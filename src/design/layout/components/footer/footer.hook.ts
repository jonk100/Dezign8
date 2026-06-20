// design/layout/components/footer/footer.hook.ts

/**
 * useFooter
 *
 * Prepares the resolved Tag, class list, and inline styles for the Footer
 * component. Mirrors the `useHeader` pattern exactly — delegate to `useLayout`,
 * then layer the footer-specific class on top.
 *
 * Responsibility split:
 *   useLayout  — resolves spacing (px/py/p/m/…), gap, align, justify into
 *                CSS channels and the `layout` base class.
 *   useFooter  — applies FOOTER_DEFAULTS when props are omitted and appends
 *                the `footer` class.
 *
 * The footer tag is always the semantic `<footer>` element. There is no `as`
 * prop — the semantic role is the point of using this component over Box.
 *
 * Default prop merging strategy:
 *   Destructuring defaults ensure user-supplied values always win. Omitting a
 *   prop triggers the FOOTER_DEFAULTS value; passing it explicitly overrides.
 */

import type { FooterProps } from "./footer.props";
import { FOOTER_DEFAULTS } from "./footer.tokens";
import { useLayout } from "~l/layout.hook";
import { composeClass, composeStyle } from "~sh/base.hook";

/**
 * Resolves `FooterProps` into a `{ Tag, props }` object ready for spread onto
 * the root element in Footer.astro.
 *
 * @param props - All props passed to the `<Footer>` component.
 * @returns `Tag` — always `"footer"`.
 * @returns `props` — merged class, style, data attributes, and any unknown
 *          pass-through props forwarded from the consumer.
 *
 * @example Minimal — all defaults apply:
 *   useFooter({})
 *   // class: "layout footer"
 *   // style: "--layout--px: var(--space-in--lg); --layout--align: center; --layout--justify: space-between"
 *
 * @example Custom py and column layout:
 *   useFooter({ py: "xl", align: "start", justify: "start" })
 *   // class: "layout footer"
 *   // style: "--layout--px: var(--space-in--lg); --layout--py: var(--space-in--xl); …"
 */
export function useFooter(props: FooterProps) {
  const {
    px      = FOOTER_DEFAULTS.px,
    align   = FOOTER_DEFAULTS.align,
    justify = FOOTER_DEFAULTS.justify,
    ...rest
  } = props;

  const { layoutClass, layoutStyle, layoutAttrs, rest: remaining } = useLayout({
    px,
    align,
    justify,
    ...rest,
  });

  return {
    Tag: "footer" as const,
    props: {
      class: composeClass(layoutClass, "footer"),
      style: composeStyle(layoutStyle),
      ...layoutAttrs,
      ...remaining,
    },
  };
}
