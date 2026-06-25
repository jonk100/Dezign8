// design/surfaces/components/tile/tile.hook.ts
import type { TileProps }       from "./tile.props";
import { TILE_DEFAULTS }        from "./tile.tokens";
import { useSurface }           from "../../surface.hook";
import { composeClass }         from "~/shared/base.hook";

export function useTile(props: TileProps) {
  const {
    as: passedTag,
    href,
    interactive = false,
    selectable  = false,
    selected    = false,
    disabled    = false,
    layer       = TILE_DEFAULTS.layer,
    padding     = TILE_DEFAULTS.padding,
    ...surfaceProps
  } = props;

  const isLink        = Boolean(href);
  const isToggle      = !isLink && selectable;
  const isInteractive = !isLink && (interactive || selectable);
  const isDisabled    = !isLink && disabled;

  // Determine element tag
  let Tag = passedTag ?? "div";
  if (isLink) {
    Tag = "a";
  } else if (isToggle && !passedTag) {
    Tag = "button";
  }

  const { surfaceClass, surfaceStyle, surfaceAttrs, rest } = useSurface({
    layer,
    padding,
    ...surfaceProps,
    disabled: isDisabled,
  });

  return {
    Tag,
    props: {
      class: composeClass(
        surfaceClass,
        "tile",
        isLink        && "tile--interactive",
        isInteractive && "tile--interactive",
        selectable    && "tile--selectable",
        selected      && "tile--selected",
        isDisabled    && "tile--disabled",
      ),
      style: surfaceStyle,
      ...surfaceAttrs,
      href,
      role:           isToggle ? ("button" as const) : undefined,
      tabindex:       isInteractive ? (isDisabled ? -1 : 0) : undefined,
      "aria-pressed": isToggle ? String(selected) : undefined,
      ...rest,
    },
  };
}
