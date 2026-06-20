import { BaseComponentProps } from "~/shared/base.props";
import { Space } from "~/shared/primitives.tokens";
import { SpacingProps } from "~/shared/spacing.props";

export interface ListProps<T> extends BaseComponentProps, SpacingProps {
  items:        T[];
  /** Some safety with string | Promise<string>, find a better type later */
  renderItem:   (item: T, index: number) => string | Promise<string>;
  gap?:         Space; 
  as?:          ListTag;
}

export type ListTag = "ul" | "ol";