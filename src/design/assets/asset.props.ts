/**
 * AssetProps
 * 
 * Handles binary media loading, fallbacks, and rendering behaviors.
 * 
 * @prop src - Source URL of the asset.
 * @prop alt - Accessibility description for screen readers.
 * @prop fallbackSrc - A secondary URL to load if the primary `src` fails.
 * @prop fallbackElement - THOUGHT: A React node rendered *during* loading or upon failure. Much more flexible than `fallbackSrc` because you can pass a `<Skeleton />` or a `<Spinner />` component.
 * @prop loading - Native lazy vs eager loading behavior.
 * @prop fit - CSS object-fit property (cover, contain, fill).
 * @prop position - CSS object-position (e.g., "center top").
 * @prop ratio - Forces a specific aspect ratio, preventing layout shifts as images load.
 * @prop onLoad - Callback fired on successful media load.
 * @prop onError - Callback fired on media failure.
 * @prop crossOrigin - CORS settings for fetching external media.
 */
import type { BaseComponentProps } from "~/shared/base.props";

export interface AssetProps extends BaseComponentProps {
  src:              string;
  alt:              string;
  fallbackSrc?:     string;
  fallbackElement?: unknown;
  load?:            "lazy" | "eager";
  fit?:             "cover" | "contain" | "fill" | "none";
  position?:        string;
  ratio?:           number;
  onLoad?:          (e: Event) => void;
  onError?:         (e: Event) => void;
  crossOrigin?:     "anonymous" | "use-credentials";
}
