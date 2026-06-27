// design/triggers/components/skip-link/skip-link.hook.ts
import type { SkipLinkProps } from "./skip-link.props";
import { SKIP_LINK_DEFAULTS } from "./skip-link.tokens";
import { useTrigger } from "../../trigger.hook";
import { composeClass } from "~/shared/base.hook";

export function useSkipLink(props: SkipLinkProps) {
  const {
    target = SKIP_LINK_DEFAULTS.target,
    label  = SKIP_LINK_DEFAULTS.label,
    class: className,
    ...restProps
  } = props;

  const hashTarget = target.startsWith("#") ? target : `#${target}`;

  const { triggerClass, triggerStyle, triggerAttrs, rest } = useTrigger({
    href: hashTarget,
    class: composeClass("skip-link", className),
    ...restProps,
  });

  return {
    Tag: "a" as const,
    label,
    props: {
      class: triggerClass,
      style: triggerStyle,
      ...triggerAttrs,
      ...rest,
    },
  };
}
