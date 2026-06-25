// design/assets/components/avatar/avatar.hook.ts

import type { AvatarProps } from "./avatar.props";
import { AVATAR_TOKENS, AVATAR_DEFAULTS } from "./avatar.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

export function useAvatar(props: AvatarProps) {
  const {
    src,
    alt       = "",
    initials,
    size      = AVATAR_DEFAULTS.size,
    radius    = AVATAR_DEFAULTS.radius,
    status,
    class:    className,
    ...base } = props;

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    AVATAR_TOKENS,
    { size, radius, status },
    "avatar",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "avatar",
        src      && "avatar--image",
        initials && !src && "avatar--initials",
        !src && !initials && "avatar--icon",
        status   && "avatar--has-status",
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle],
    },
    base,
  );

  return {
    src,
    alt,
    initials: initials ? initials.slice(0, 2).toUpperCase() : undefined,
    status,
    props: {
      class: cls,
      style,
      "aria-label": alt || initials || undefined,
      ...attrs,
      ...rest,
    },
  };
}
