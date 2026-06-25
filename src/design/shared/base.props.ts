// design/shared/base.props.ts

import type { Visual }       from "./visuals";
import type { ColorRole }    from "./primitives.tokens";
import type { SpacingProps } from "./spacing.props";
import type { MotionProp }   from "./motion/motion.types";

export interface BaseComponentProps extends SpacingProps {
  class?:    string;
  style?:    string;
  id?:       string;
  bg?:       ColorRole;
  disabled?: boolean;
  /**
   * Motion prop. Drives enter, exit, and idle animations on any component.
   *
   * Syntax: `{phase}:{name}[/{duration}[/{delay}]][,…][ …]`
   *
   * @example
   * motion="enter:slideUp/200/0"
   * motion="enter:slideUp/200/0 exit:fadeOut/200/0"
   * motion="enter:slideUp/200/0 exit:shakeOut/150/0,slideLeft/200/50"
   * motion="idle:shakeInfinite/800"
   *
   * @see motion.types.ts  — full animation name registry
   * @see motion.css       — keyframes
   */
  motion?:  MotionProp;
  /**
   * Whether the component is in a loading state.
   * Emits `data-loading="true"` on the root element via useBaseCompose.
   * Each component implements its own loading UI — typically <Skeleton />.
   * Badge, Button, Avatar etc. can render a skeleton shape of themselves.
   */
  loading?: boolean;
  testId?:  string;
  v?:       Visual;
  [key: string]: unknown;
}