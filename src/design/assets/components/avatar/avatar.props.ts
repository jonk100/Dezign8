// design/assets/components/avatar/avatar.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { AvatarSize, AvatarRadius, AvatarStatus } from "./avatar.tokens";

export interface AvatarProps extends BaseComponentProps {
  /** Image URL. Omit to show initials or icon fallback. */
  src?:      string;
  /** Alt text for the image. Pass name for accessibility. */
  alt?:      string;
  /** 1–2 character initials shown when `src` is absent or fails. */
  initials?: string;
  /** Avatar size. @default 'md' */
  size?:     AvatarSize;
  /** Border radius. @default 'full' */
  radius?:   AvatarRadius;
  /** Online/offline/away/busy status dot. */
  status?:   AvatarStatus;
}
