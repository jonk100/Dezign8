# 2026/06/24 — Icons and Input Fixes

## Key Decisions & Work Performed

- **Generated SVGs & Icon Registry Updates**:
  Designed and saved 12 new SVG icons (`tabs`, `stepper`, `pagination`, `navbar`, `breadcrumbs`, `header`, `footer`, `heading`, `label`, `quote`, `field`, `flex`) and successfully executed `npm run auto:icons` to compile them into the central registry.
- **Documentation Frontmatter**:
  Updated the frontmatter across 12 `.mdx` component documentation files to properly associate each page with its newly generated `icon: [name]` for rendering.
- **Input Global Focus Fix**:
  Discovered that `global.css` was erroneously leaking a `:focus-visible` `box-shadow` into native form controls (`<input>`, `<select>`, etc.), causing a compressed inner border. Overrode this on `.input__control`, `.select__control`, `.combobox__control`, and `.search__control` by asserting `box-shadow: none`.
- **Chrome Autofill Suppression**:
  Addressed the native Chrome `-webkit-autofill` behavior which forcibly altered input backgrounds to yellow/white and text colors to black, creating a visual clash against the dark mode transparent wrapper boxes. Implemented the standard 5000-second CSS transition hack on `background-color` alongside `-webkit-text-fill-color` inheritance for all impacted text controls.

## New Files
- `src/design/shared/icons/tabs.svg`
- `src/design/shared/icons/stepper.svg`
- `src/design/shared/icons/pagination.svg`
- `src/design/shared/icons/navbar.svg`
- `src/design/shared/icons/breadcrumbs.svg`
- `src/design/shared/icons/header.svg`
- `src/design/shared/icons/footer.svg`
- `src/design/shared/icons/heading.svg`
- `src/design/shared/icons/label.svg`
- `src/design/shared/icons/quote.svg`
- `src/design/shared/icons/field.svg`
- `src/design/shared/icons/flex.svg`

## Updated Files
- `src/design/shared/icons/index.ts`
- `src/design/forms/components/input/input.css`
- `src/design/forms/components/select/select.css`
- `src/design/forms/components/search/search.css`
- `src/design/forms/components/combobox/combobox.css`
- `src/content/docs/layout/footer.mdx`
- `src/content/docs/layout/header.mdx`
- `src/content/docs/layout/flex.mdx`
- `src/content/docs/nav/breadcrumbs.mdx`
- `src/content/docs/nav/navbar.mdx`
- `src/content/docs/nav/pagination.mdx`
- `src/content/docs/nav/stepper.mdx`
- `src/content/docs/nav/tabs.mdx`
- `src/content/docs/typography/heading.mdx`
- `src/content/docs/typography/label.mdx`
- `src/content/docs/typography/quote.mdx`
- `src/content/docs/forms/field.mdx`
