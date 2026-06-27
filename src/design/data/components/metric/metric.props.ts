import type { DataProps } from "~/data/data.props";
import type { IconProps } from "~/shared/icon.props";

export interface MetricProps extends DataProps, IconProps {
  /** The primary numeric or string value. */
  value?: string | number;
  /** The main label or title for the metric. */
  label?: string;
  /** A longer description or prose text (e.g. "3/4 people agree with this longer thing"). */
  description?: string;
  /** A trend value (e.g. "12%", "-5") */
  trend?: string | number;
  /** Trend direction to drive color/icon. */
  trendDirection?: "up" | "down" | "neutral";
}

declare module "~/shared/visuals" {
  interface VisualRegistry {
    Metric: true;
  }
}
