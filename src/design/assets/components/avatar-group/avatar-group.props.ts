import type { BaseComponentProps } from "~/shared/base.props";
import type { AvatarGroupSpacing } from "./avatar-group.tokens";
import type { FlexProps } from "~/layout/components/flex/flex.props";

export type AvatarSizeString = "3xs" | "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

export interface AvatarGroupProps extends BaseComponentProps, Omit<FlexProps, "gap"> {
  /** Size passed down to all avatars via CSS custom property. */
  size?: AvatarSizeString;

  /** Negative spacing between avatars. @default "sm" */
  spacing?: AvatarGroupSpacing;
}
