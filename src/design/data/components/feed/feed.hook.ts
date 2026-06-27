import type { FeedProps } from "./feed.props";
import { FEED_TOKENS, FEED_DEFAULTS } from "./feed.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useData } from "~/data/data.hook";
import { composeClass, composeStyle } from "~/shared/base.hook";

export function useFeed(props: FeedProps) {
  const {
    data,
    orientation = FEED_DEFAULTS.orientation,
    grouped,
    ...dataProps
  } = props;

  const { dataClass, dataStyle, dataAttrs, caption, rest } = useData(dataProps);

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FEED_TOKENS,
    { orientation },
    "feed"
  );

  const cls = composeClass(
    dataClass,
    "feed",
    ...tokenClasses,
    grouped && "feed--grouped"
  );
  
  const style = composeStyle(dataStyle, ...tokenStyle) || undefined;

  return {
    Tag: "ul" as const,
    data,
    caption,
    props: {
      class: cls,
      style,
      ...dataAttrs,
      ...rest,
    },
  };
}
