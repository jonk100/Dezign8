// design/assets/components/file-preview/file-preview.props.ts

import type { BaseComponentProps } from "~/shared/base.props";
import type { FilePreviewSize, FilePreviewRadius, FilePreviewLayout } from "./file-preview.tokens";

export interface FilePreviewProps extends BaseComponentProps {
  /** File name, including extension (e.g. "report.pdf"). */
  name:     string;
  /** Image URL. When provided, renders a thumbnail instead of the type icon. */
  src?:     string;
  /** Human-readable file size string (e.g. "2.4 MB"). */
  fileSize?: string;
  /** Card (vertical stack) or strip (horizontal row). @default 'card' */
  layout?:  FilePreviewLayout;
  /** Component size. @default 'md' */
  size?:    FilePreviewSize;
  /** Border radius. @default 'md' */
  radius?:  FilePreviewRadius;
  /** Marks the file as removable — renders a dismiss button. */
  removable?: boolean;
  /** Called when the dismiss button is clicked. */
  onRemove?:  string;
}
