// design/shared/base.hook.ts

import type { BaseComponentProps } from "./base.props";

export type ClassToken = string | false | null | undefined;
export type StyleToken = string | false | null | undefined;

export interface BaseComposeOptions {
  className?: ClassToken[];
  style?:     StyleToken[];
  attrs?:     Record<string, unknown>;
}

export function composeClass(...parts: ClassToken[]): string {
  return parts.filter(Boolean).join(" ");
}

export function composeStyle(...parts: StyleToken[]): string {
  return parts.filter(Boolean).join("; ");
}

export function useBaseCompose(
  options: BaseComposeOptions,
  base?: BaseComponentProps,
) {
  const className = composeClass(...(options.className ?? []));
  const style     = composeStyle(...(options.style ?? []));
  const attrs: Record<string, unknown> = {
    ...(base?.v        ? { "data-visual":  base.v }       : {}),
    ...(base?.testId   ? { "data-testid":  base.testId }  : {}),
    ...options.attrs,
  };
  return { className, style, attrs };
}