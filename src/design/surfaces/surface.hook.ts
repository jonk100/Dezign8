// design/surfaces/surface.hook.ts

import type { SurfaceProps }                      from "./surface.props";
import { SURFACE_TOKENS }                         from "./surface.tokens";
import { resolveTokens }                          from "~/shared/tokens";
import { resolveColorRole, useBaseCompose,
         composeClass, composeStyle }             from "~/shared/base.hook";

/**
 * Hook: `useSurface`
 *
 * Shared resolution logic for all surface category components.
 * Returns a named attribute bag; component hooks destructure this
 * and layer their own classes, attrs, and token overrides on top.
 *
 * WHAT THIS RESOLVES
 * ─────────────────────────────────────────────────────────────────
 * Token dimensions (via resolveTokens):
 *   layer   → .surface--layer-{n} modifier class (class-only)
 *   padding → --surface--padding channel
 *   radius  → --surface--radius channel
 *
 * Color role channels (via resolveColorRole):
 *   color → --surface--color--{subtle|muted|base|vivid|deep|border|text}
 *
 * Boolean modifiers (direct class emission):
 *   outlined → .surface--outlined (overrides layer border via CSS order)
 *   glass    → .surface--glass    (overrides layer bg via CSS order)
 *
 * Explicit overrides (inline style — beats any class):
 *   shadow → --surface--shadow (when provided; overrides layer default)
 *   blur   → --surface--blur   (when glass=true)
 *   style  → consumer inline styles, merged last
 *
 * RETURN SHAPE
 * ─────────────────────────────────────────────────────────────────
 * {
 *   surfaceClass  — composed class string for the root element
 *   surfaceStyle  — composed style string with CSS channel vars
 *   surfaceAttrs  — data-* attributes from useBaseCompose
 *   rest          — remaining props safe to spread on the root element
 * }
 */
export function useSurface(props: SurfaceProps) {
  const {
    variant,
    layer: propsLayer,
    outlined: propsOutlined,
    glass: propsGlass,
    blur     = "12px",
    shadow,
    padding  = "md",
    radius   = "md",
    color,
    class:    className,
    style:    consumerStyle,
    v:        _v,
    testId:   _testId,
    loading:  _loading,
    ...base
  } = props;

  let layer = propsLayer ?? "0";
  let outlined = propsOutlined ?? false;
  let glass = propsGlass ?? false;

  if (variant) {
    switch (variant) {
      case "plain":    layer = "0"; break;
      case "soft":     layer = "1"; break;
      case "elevated": layer = "3"; break;
      case "outlined": layer = "0"; outlined = true; break;
      case "glass":    glass = true; break;
    }
  }

  // Token dimensions → CSS vars + modifier classes
  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    SURFACE_TOKENS,
    { layer, padding, radius },
    "surface",
  );

  // Color role → seven CSS channel vars
  const colorVars = color ? resolveColorRole(color, "surface--color") : [];

  // When color is set, apply it visually based on variant:
  //   outlined / outlined+layer → tint the border
  //   everything else (soft, plain, layer defaults) → tint the background
  // Inline style beats the layer class rules, which is what we want.
  const colorBgOverride     = color && !outlined ? `--surface--bg: var(--surface--color--subtle)`   : null;
  const colorBorderOverride = color              ? `--surface--border: var(--surface--color--border)` : null;

  // Explicit overrides written as inline vars — beat the layer class rules.
  // shadow: consumer wants a different elevation than the layer default.
  // blur:   only written when glass is active.
  const shadowOverride = shadow ? `--surface--shadow: ${shadow}` : null;
  const blurVar        = glass  ? `--surface--blur: ${blur}`     : null;

  const { className: cls, style, attrs, rest: restAttrs, spacing } = useBaseCompose(
    {
      className: [
        "surface",
        ...tokenClasses,
        outlined  && "surface--outlined",
        glass     && "surface--glass",
        className,
      ],
      style: [
        ...tokenStyle,
        ...colorVars,
        colorBgOverride,
        colorBorderOverride,
        shadowOverride,
        blurVar,
        consumerStyle,
      ],
    },
    base,
  );

  return {
    surfaceClass: cls,
    surfaceStyle: style,
    surfaceAttrs: attrs,
    rest: restAttrs,
    spacing,
  };
}
