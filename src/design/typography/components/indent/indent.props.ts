/**
 * src/design/typography/components/indent/indent.props.ts
 * 
 * Props for the Indent component.
 * 
 * @see indent.hook.ts   — resolves props to { Tag, props, type, size }
 * @see typography.hook.ts — resolves props to { typographyAttributes }
 * @see base.props.ts    — base component props
 * @see typography.props.ts - typography-specific props, extends BaseComponentProps
 * @see indent.css       — indent-specific styles
 * @see typography.css   — shared typography styles
 */
import type { TypographyProps } from '~/typography/typography.props';
import type { IndentSize } from './indent.tokens';

export type IndentType = 'ui' | 'code' | 'prose';

export interface IndentProps extends TypographyProps {
  prose?: IndentSize;
  ui?: IndentSize;
  code?: IndentSize;
}