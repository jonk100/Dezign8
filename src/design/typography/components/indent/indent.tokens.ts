/**
 * src/design/typography/components/indent/indent.tokens.ts
 */
export const INDENT_SIZES = ['ng', 'xs', 'sm', 'md', 'lg', 'xl'] as const;
export type IndentSize = typeof INDENT_SIZES[number];

export const INDENT_PROSE_TOKENS: Record<IndentSize, string> = {
  ng: '-1em',
  xs: '1em',
  sm: '1.5em',
  md: '2em',
  lg: '3em',
  xl: '4em',
};

export const INDENT_CODE_TOKENS: Record<IndentSize, string> = {
  ng: '-1ch',
  xs: '1ch',
  sm: '2ch',
  md: '3ch',
  lg: '4ch',
  xl: '5ch',
};

export const INDENT_UI_TOKENS: Record<IndentSize, string> = {
  ng: '-2ch',
  xs: '1ch',
  sm: '2ch',
  md: '4ch',
  lg: '6ch',
  xl: '8ch',
};
