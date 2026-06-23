// design/surfaces/components/tile/tile.props.ts
import type { SurfaceProps } from "../../surface.props";

export type TileTag = "div" | "a" | "button" | "article" | "li";

export interface TileProps extends SurfaceProps {
  /**
   * Base element. Automatically upgraded to 'a' if href is provided,
   * or 'button' if selectable but no href.
   * @default "div"
   */
  as?: TileTag;

  /**
   * If provided, renders the tile as an anchor tag.
   */
  href?: string;

  /**
   * Makes the tile interactive (hover styles, cursor pointer).
   * Implicitly true if href or selectable is set.
   * @default false
   */
  interactive?: boolean;

  /**
   * Enables selection state toggle behavior.
   * Adds role="button" and aria-pressed.
   * @default false
   */
  selectable?: boolean;

  /**
   * Current selection state.
   * @default false
   */
  selected?: boolean;

  /**
   * Disables interaction and dims the tile.
   * @default false
   */
  disabled?: boolean;
}
