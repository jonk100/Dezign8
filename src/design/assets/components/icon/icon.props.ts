// design/assets/components/icon/icon.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { IconSize } from "./icon.tokens";
import type { SvgName } from "~/design/shared/icons";

export interface IconProps extends BaseComponentProps {
  /**
   * The name of the SVG icon to render.
   * Must match a valid key in `src/design/shared/icons/index.ts`.
   */
  name: SvgName;

  /**
   * The size of the icon. Maps to `--icon--size-*` CSS properties.
   * @default "md"
   */
  size?: IconSize;
}
