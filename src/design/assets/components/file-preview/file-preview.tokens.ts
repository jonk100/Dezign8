// design/assets/components/file-preview/file-preview.tokens.ts

import { defineTokens, dimension, scale } from "~/shared/tokens";
import { RADIUS_DIM } from "~/shared/primitives.tokens";

/**
 * FilePreview token spec.
 *
 * prop      channel                    CSS property
 * ─────────────────────────────────────────────────────────────────
 * size    → --file-preview--size       controls icon + card width
 * radius  → --file-preview--radius     border-radius
 * layout  → (modifier class only)      card vs strip
 */

const FILE_PREVIEW_SIZE = scale({
  xs: "var(--file-preview--size-xs, 4rem)",
  sm: "var(--file-preview--size-sm, 5rem)",
  md: "var(--file-preview--size-md, 7rem)",
  lg: "var(--file-preview--size-lg, 9rem)",
  xl: "var(--file-preview--size-xl, 12rem)",
});

const FILE_PREVIEW_LAYOUT = scale({
  card:  null,
  strip: null,
});

export const FILE_PREVIEW_TOKENS = defineTokens({
  size:   dimension("size",   FILE_PREVIEW_SIZE),
  radius: RADIUS_DIM,
  layout: dimension("layout", FILE_PREVIEW_LAYOUT, { modifier: true }),
});

export type FilePreviewSize   = keyof typeof FILE_PREVIEW_TOKENS.size.values;
export type FilePreviewRadius = keyof typeof FILE_PREVIEW_TOKENS.radius.values;
export type FilePreviewLayout = keyof typeof FILE_PREVIEW_TOKENS.layout.values;

export const FILE_PREVIEW_DEFAULTS = {
  size:   "md"   as FilePreviewSize,
  radius: "md"   as FilePreviewRadius,
  layout: "card" as FilePreviewLayout,
} as const;

/** Maps common extensions to a human-readable category label and accent color class. */
export const FILE_TYPE_MAP: Record<string, { label: string; color: string }> = {
  // Images
  jpg:  { label: "JPG",  color: "file-preview--type-image" },
  jpeg: { label: "JPEG", color: "file-preview--type-image" },
  png:  { label: "PNG",  color: "file-preview--type-image" },
  gif:  { label: "GIF",  color: "file-preview--type-image" },
  webp: { label: "WEBP", color: "file-preview--type-image" },
  svg:  { label: "SVG",  color: "file-preview--type-image" },
  avif: { label: "AVIF", color: "file-preview--type-image" },
  // Documents
  pdf:  { label: "PDF",  color: "file-preview--type-doc" },
  doc:  { label: "DOC",  color: "file-preview--type-doc" },
  docx: { label: "DOCX", color: "file-preview--type-doc" },
  txt:  { label: "TXT",  color: "file-preview--type-doc" },
  md:   { label: "MD",   color: "file-preview--type-doc" },
  // Spreadsheets
  xls:  { label: "XLS",  color: "file-preview--type-sheet" },
  xlsx: { label: "XLSX", color: "file-preview--type-sheet" },
  csv:  { label: "CSV",  color: "file-preview--type-sheet" },
  // Code
  js:   { label: "JS",   color: "file-preview--type-code" },
  ts:   { label: "TS",   color: "file-preview--type-code" },
  jsx:  { label: "JSX",  color: "file-preview--type-code" },
  tsx:  { label: "TSX",  color: "file-preview--type-code" },
  html: { label: "HTML", color: "file-preview--type-code" },
  css:  { label: "CSS",  color: "file-preview--type-code" },
  json: { label: "JSON", color: "file-preview--type-code" },
  // Audio / Video
  mp3:  { label: "MP3",  color: "file-preview--type-media" },
  wav:  { label: "WAV",  color: "file-preview--type-media" },
  mp4:  { label: "MP4",  color: "file-preview--type-media" },
  mov:  { label: "MOV",  color: "file-preview--type-media" },
  // Archives
  zip:  { label: "ZIP",  color: "file-preview--type-archive" },
  gz:   { label: "GZ",   color: "file-preview--type-archive" },
  tar:  { label: "TAR",  color: "file-preview--type-archive" },
};
