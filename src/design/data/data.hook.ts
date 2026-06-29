// design/data/data.hook.ts

import type { DataProps }                  from "./data.props";
import { DATA_TOKENS }                     from "./data.tokens";
import { resolveTokens }                   from "~/shared/tokens";
import { resolveColorRole, useBaseCompose } from "~/shared/base.hook";

/**
 * Hook: `useData`
 *
 * Shared resolution logic for all data category components.
 * Table, List, Feed, Stat, Metric — all delegate here first,
 * then layer their own classes and attrs on top of the result.
 *
 * WHAT THIS HOOK RESOLVES
 * ─────────────────────────────────────────────────────────────────
 * Token dimensions
 *   variant → modifier class (.data--outlined, .data--soft, etc.)
 *   size    → --data--size channel + modifier class (.data--compact, etc.)
 *
 * Color role channels (via resolveColorRole, not resolveTokens —
 * COLOR_ROLE values are null, so resolveTokens skips them)
 *   color     → --data--color--{subtle|muted|base|vivid|deep|border|text}
 *   bg        → --data--bg--{subtle|muted|base|vivid|deep|border|text}
 *   highlight → --data--highlight--{subtle|muted|base|vivid|deep|border|text}
 *
 * Visual modifier classes
 *   striped  → .data--striped  (component CSS applies to its own rows/items)
 *   bordered → .data--bordered (component CSS applies to its own cells/items)
 *
 * Data attributes (CSS state hooks + ARIA signals)
 *   loading     → data-loading="true"
 *   empty       → data-empty="" | data-empty="message"
 *   interactive → data-interactive="true"
 *   selectable  → data-selectable="true"
 *   scrollable  → data-scrollable="true"
 *
 * WHY style IS CONSUMED HERE
 * ─────────────────────────────────────────────────────────────────
 * For Table (and other two-element components), the consumer's inline
 * `style` prop must land on the outer wrapper <div>, not the inner
 * semantic element. This is important for:
 *
 *   max-height   → creates the scroll container for sticky header
 *   height       → same
 *   width        → constrains the wrapper, not the table
 *
 * By consuming `style` here and merging it into dataStyle, the wrapper
 * receives it. If a component genuinely needs to forward `style` to its
 * inner element instead, it can re-destructure it from `rest` before
 * calling useData — but this is rarely needed.
 */
export function useData(props: DataProps) {
  const {
    color,
    bg,
    highlight,
    variant,
    size,
    caption,
    loading,
    empty,
    striped,
    bordered,
    interactive,
    selectable,
    scrollable,
    class: className,
    style: consumerStyle,  // goes on the wrapper; see note above
    v:        _v,
    testId:   _testId,
    ...base
  } = props;

  // ── Token dimensions ────────────────────────────────────────
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    DATA_TOKENS,
    { variant, size },
    "data",
  );

  // ── Color role channels ─────────────────────────────────────
  const colorStyle: string[] = [
    ...(color     ? resolveColorRole(color,     "data--color")     : []),
    ...(highlight ? resolveColorRole(highlight, "data--highlight") : []),
  ];

  // ── Empty state ─────────────────────────────────────────────
  const emptyAttr =
    empty === true              ? ""
    : typeof empty === "string" ? empty
    : undefined;

  // ── Compose ─────────────────────────────────────────────────
  const { className: cls, style, attrs, rest: restAttrs } = useBaseCompose(
    {
      className: [
        "data",
        ...tokenClasses,
        striped  && "data--striped",
        bordered && "data--bordered",
        className,
      ],
      style: [
        consumerStyle,   // consumer inline styles first — lowest specificity
        ...tokenStyle,
        ...colorStyle,
      ],
      attrs: {
        // data-loading is emitted by useBaseCompose from base?.loading
        ...(emptyAttr !== undefined ? { "data-empty":       emptyAttr } : {}),
        ...(interactive             ? { "data-interactive": "true"    } : {}),
        ...(selectable              ? { "data-selectable":  "true"    } : {}),
        ...(scrollable              ? { "data-scrollable":  "true"    } : {}),
      },
    },
    bg !== undefined ? { bg, ...base } : base,
  );

  return {
    dataClass: cls,
    dataStyle: style || undefined,
    dataAttrs: attrs,
    caption,
    rest: restAttrs,
  };
}