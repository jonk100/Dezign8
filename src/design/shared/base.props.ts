// design/shared/base.props.ts

import type { Visual } from "./visuals";

export interface BaseComponentProps {
  class?: string;
  style?: string;
  id?: string;
  bg?: string;
  animation?: string;
  testId?: string;
  v?: Visual;
  [key: string]: unknown;
}