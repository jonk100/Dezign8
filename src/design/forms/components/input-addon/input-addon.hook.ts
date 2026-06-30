import type { InputAddonProps } from "./input-addon.props";

export function useInputAddon(props: InputAddonProps) {
  const { class: className, ...rest } = props;

  return {
    props: rest,
    className: ["dz-input-addon", className].filter(Boolean).join(" "),
  };
}
