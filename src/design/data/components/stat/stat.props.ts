import type { DataProps } from "~/data/data.props";
import type { IconProps } from "~/shared/icon.props";

export interface StatProps extends DataProps, IconProps {
  /** The primary numeric value to display. */
  value?: string | number;
  /** The descriptive label for the stat. */
  label?: string;
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Stat: true;
  }
}
