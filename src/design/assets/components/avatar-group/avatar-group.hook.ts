import { resolveTokens } from "~/shared/tokens";
import { AVATAR_GROUP_TOKENS } from "./avatar-group.tokens";
import type { AvatarGroupProps } from "./avatar-group.props";

export function useAvatarGroup(props: AvatarGroupProps) {
  const { size, spacing = "sm", class: className, ...rest } = props;

  const resolved = resolveTokens(
    AVATAR_GROUP_TOKENS,
    { spacing },
    "avatar-group"
  );

  let styles = resolved.style.join("; ");
  
  // If size is provided, we pass it down to children by setting the same CSS 
  // variable that Avatar reads (--avatar--size).
  if (size) {
    if (styles) styles += "; ";
    styles += `--avatar--size: var(--avatar--size-${size})`;
  }

  return {
    props: rest,
    styles,
    className: ["dz-avatar-group", ...resolved.classes, className].filter(Boolean).join(" "),
  };
}
