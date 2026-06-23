// design/shared/base.props.ts

import type { Visual }    from "./visuals";
import type { ColorRole } from "./primitives.tokens";

export interface BaseComponentProps {
  class?:     string;
  style?:     string;
  id?:        string;
  bg?:        ColorRole;
  // ponytail: string for now; narrow to Animation scale when Motion category is built
  animation?: string;
  /**
   * Whether the component is in a loading state.
   * Emits `data-loading="true"` on the root element via useBaseCompose.
   * Each component implements its own loading UI — typically <Skeleton />.
   * Badge, Button, Avatar etc. can render a skeleton shape of themselves.
   */
  loading?:   boolean;
  testId?:    string;
  v?:         Visual;
  [key: string]: unknown;
}