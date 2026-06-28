/**
 * src/design/typography/components/indent/indent.hook.ts
 */
import { useTypography } from '~/typography/typography.hook';
import type { IndentProps, IndentType } from './indent.props';
import { type IndentSize, INDENT_CODE_TOKENS, INDENT_PROSE_TOKENS, INDENT_UI_TOKENS } from './indent.tokens';

export function useIndent(props: IndentProps) {
  const { prose, ui, code, ...rest } = props;

  const entries = Object.entries({
    prose,
    ui,
    code,
  }).filter(([, value]) => value !== undefined);

  if (entries.length > 1) {
    throw new Error("Indent accepts only one of: prose, ui, or code.");
  }

  const [type = "prose", size = "md"] = entries[0] ?? [];

  let indentValue = '';
  if (type === 'prose') {
    indentValue = INDENT_PROSE_TOKENS[size as IndentSize];
  } else if (type === 'code') {
    indentValue = INDENT_CODE_TOKENS[size as IndentSize];
  } else if (type === 'ui') {
    indentValue = INDENT_UI_TOKENS[size as IndentSize];
  }

  const { typographyAttributes } = useTypography(rest);
  const { class: cls, style, ...restAttrs } = typographyAttributes as any;

  // Final class
  const finalClass = [cls, 'indent'].filter(Boolean).join(' ');

  // Final style
  let finalStyle = `--indent-size: ${indentValue}`;
  if (typeof style === 'string') {
    finalStyle = `${style}; ${finalStyle}`;
  } else if (Array.isArray(style)) {
    finalStyle = `${style.filter(Boolean).join(';')}; ${finalStyle}`;
  } else if (style && typeof style === 'object') {
    // Highly unlikely since base.hook.ts usually uses string/array of strings
    finalStyle = `${Object.entries(style).map(([k, v]) => `${k}: ${v}`).join(';')}; ${finalStyle}`;
  }

  return {
    Tag: 'div',
    props: {
      ...restAttrs,
      class: finalClass,
      style: finalStyle,
      'data-indent-type': type,
      'data-indent-size': size,
    },
    indentValue,
    type: type as IndentType,
    size: size as IndentSize
  };
}
