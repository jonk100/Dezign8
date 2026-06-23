// design/data/list/list.hook.ts

import type { ListProps }             from "./list.props";
import { LIST_TOKENS, LIST_DEFAULTS } from "./list.tokens";
import { resolveTokens }              from "~/shared/tokens";
import { useData }                    from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

/**
 * Resolves `ListProps` into a `{ Tag, props }` object plus `data` for
 * the Astro template to render list items.
 *
 * RESPONSIBILITY SPLIT
 * ─────────────────────────────────────────────────────────────
 * useData    — color channels, density, variant, all shared modifiers
 *              (striped, bordered, interactive, selectable, scrollable),
 *              state attributes (data-loading, data-empty, etc.),
 *              and base attrs (data-visual, data-testid).
 *
 * useList    — orientation token, `ordered` → Tag, surfaces `data`
 *              for the Astro template.
 *
 * SINGLE-ELEMENT PATTERN
 * ─────────────────────────────────────────────────────────────
 * Unlike Table, List does not need a wrapper div — `overflow: auto`
 * works on `<ul>/<ol>` (they are block elements). The `.data` class,
 * CSS channels, and state attrs all land on the root list element.
 *
 * @returns Tag      — `"ul"` or `"ol"` based on `ordered`.
 * @returns props    — spread onto the root element: class, style, data-attrs.
 * @returns data     — `ListItem[] | undefined` for the Astro template.
 * @returns ordered  — pass to nested `<List>` components so children inherit.
 *
 * @example
 *   const { Tag, props, data, ordered } = useList(Astro.props as ListProps);
 */
export function useList(props: ListProps) {
  const {
    data,
    ordered     = LIST_DEFAULTS.ordered,
    orientation = LIST_DEFAULTS.orientation,
    ...dataProps
  } = props;

  // ── Category resolution ─────────────────────────────────────
  const { dataClass, dataStyle, dataAttrs, caption, rest } = useData(dataProps);

  // ── List-specific token resolution ──────────────────────────
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    LIST_TOKENS,
    { orientation },
    "list",
  );

  // ── Compose ─────────────────────────────────────────────────
  const cls   = composeClass(dataClass, "list", ...tokenClasses);
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag:     (ordered ? "ol" : "ul") as "ul" | "ol",
    data,
    ordered,
    caption,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}