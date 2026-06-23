// design/shared/base.hook.ts

import type { BaseComponentProps } from "./base.props";
import type { ColorRole }          from "./primitives.tokens";

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
    ...(base?.v       ? { "data-visual":  base.v }      : {}),
    ...(base?.testId  ? { "data-testid":  base.testId } : {}),
    // loading is in BaseComponentProps — emitted universally so every
    // component gets [data-loading] CSS targeting for free.
    // Each component's Astro template handles the visual loading state.
    ...(base?.loading ? { "data-loading": "true" }      : {}),
    ...options.attrs,
  };
  return { className, style, attrs };
}

/**
 * Resolves a color role into a full set of CSS custom property assignments
 * scoped to a given channel prefix.
 *
 * Usage:
 *   ...resolveColorRole("primary", "data--color")
 *
 * Emits:
 *   --data--color--subtle: var(--primary--subtle)
 *   --data--color--muted:  var(--primary--muted)
 *   --data--color--base:   var(--primary--base)
 *   --data--color--vivid:  var(--primary--vivid)
 *   --data--color--deep:   var(--primary--deep)
 *   --data--color--border: var(--primary--border)
 *   --data--color--text:   var(--primary--text)
 * 
 * Component CSS then reads whichever shade is semantically appropriate:
 *   border-color:     var(--data--color--border)
 *   background-color: var(--data--color--subtle)
 *   color:            var(--data--color--text)
 *
 * Roles without vivid/deep defined (success, danger, warning, info currently)
 * produce empty var() references — CSS ignores them safely.
 */
export function resolveColorRole(role: ColorRole, channel: string): string[] {
  return [
    `--${channel}--subtle: var(--${role}--subtle)`,
    `--${channel}--muted:  var(--${role}--muted)`,
    `--${channel}--base:   var(--${role}--base)`,
    `--${channel}--vivid:  var(--${role}--vivid)`,
    `--${channel}--deep:   var(--${role}--deep)`,
    `--${channel}--border: var(--${role}--border)`,
    `--${channel}--text:   var(--${role}--text)`,
  ];
}