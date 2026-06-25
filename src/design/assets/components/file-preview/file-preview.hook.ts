// design/assets/components/file-preview/file-preview.hook.ts

import type { FilePreviewProps } from "./file-preview.props";
import { FILE_PREVIEW_TOKENS, FILE_PREVIEW_DEFAULTS, FILE_TYPE_MAP } from "./file-preview.tokens";
import { resolveTokens } from "~/shared/tokens";
import { useBaseCompose } from "~/shared/base.hook";

function getExtension(name: string): string {
  const dot = name.lastIndexOf(".");
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : "";
}

export function useFilePreview(props: FilePreviewProps) {
  const {
    name,
    src,
    fileSize,
    layout    = FILE_PREVIEW_DEFAULTS.layout,
    size      = FILE_PREVIEW_DEFAULTS.size,
    radius    = FILE_PREVIEW_DEFAULTS.radius,
    removable = false,
    onRemove,
    class:    className,
    ...base } = props;

  const ext     = getExtension(name);
  const typeInfo = FILE_TYPE_MAP[ext];

  const { style: tokenStyle, classes: tokenClasses } = resolveTokens(
    FILE_PREVIEW_TOKENS,
    { size, radius, layout },
    "file-preview",
  );

  const { className: cls, style, attrs, rest } = useBaseCompose(
    {
      className: [
        "file-preview",
        typeInfo?.color,
        removable && "file-preview--removable",
        ...tokenClasses,
        className,
      ],
      style: [...tokenStyle],
    },
    base,
  );

  return {
    name,
    src,
    ext,
    label:    (typeInfo?.label ?? ext.toUpperCase()) || "FILE",
    fileSize,
    removable,
    onRemove,
    props: {
      class: cls,
      style,
      ...attrs,
      ...rest,
    },
  };
}
