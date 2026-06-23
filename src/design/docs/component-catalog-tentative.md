# Component Catalog

> **Work in progress.** Categories, components, and props are all subject to
> change as we build. This is a planning reference, not a contract. Components
> may move between categories, props may be renamed or dropped, and new
> components will be added. The `as` prop is decided per component — only
> listed where it's expected to be exposed.

11 categories. Props listed are the primary ones that define each component's
behaviour — not exhaustive, and not final.

---

## layout

Structural components that control flow, spacing, and page-level positioning.
These rarely have visible backgrounds of their own — they dictate where things
go, not how surfaces look.

**Shared props:** `gap`, `align`, `justify`, `padding`

| Component     | Purpose                                                                                 | Key props                                      |
| ------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `Box`         | Generic block wrapper for one-off spacing, border, and layout needs.                    | `padding`, `margin`, `radius`, `border`, `as`  |
| `Stack`       | Vertical flex column with consistent gap between children.                              | `gap`, `align`, `as`                           |
| `Inline`      | Horizontal wrapping flex row. Children flow inline and wrap when needed.                | `gap`, `align`, `justify`                      |
| `Flex`        | Full flexbox control — direction, wrap, alignment. Use when Stack/Inline aren't enough. | `direction`, `wrap`, `gap`, `align`, `justify` |
| `Grid`        | CSS grid layout with configurable columns and rows.                                     | `cols`, `rows`, `gap`, `align`, `justify`      |
| `Columns`     | Equal-width multi-column layout with responsive collapse.                               | `cols`, `gap`, `collapseAt`                    |
| `Center`      | Centers its child horizontally and/or vertically.                                       | `axis` (`x`, `y`, `both`)                      |
| `Container`   | Constrains max-width and adds horizontal padding for page content regions.              | `size` (`sm`→`full`), `padding`                |
| `Spacer`      | Empty element that pushes siblings apart — fills flex space or adds fixed height.       | `size`, `axis`                                 |
| `AspectRatio` | Locks its child to a fixed aspect ratio regardless of container width.                  | `ratio`                                        |
| `Separator`   | Horizontal or vertical visual divider.                                                  | `orientation`, `decorative`                    |
| `Screen`      | Outermost page wrapper. Full viewport height, sets base background.                     | `padding`                                      |
| `Header`      | Top-level page header. Sticky or fixed positioning, base elevation.                     | `sticky`, `transparent`, `border`              |
| `Footer`      | Page footer. Typically sits below the main content flow.                                | `border`                                       |

---

## surfaces

Visual containers that provide background, elevation, shape, and depth.
About how a region *looks*, not how it *flows*.

**Shared props:** `variant`, `radius`, `padding`, `border`, `shadow`, `blur`, `theme`

| Component | Purpose                                                                                    | Key props                                                                                                            |
| --------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `Paper`   | Flat, flexible surface container. The canvas — no prescribed structure.                    | `variant`, `radius`, `padding`, `shadow`, `fullWidth`, `as`                                                          |
| `Card`    | Structured content surface with optional media, header, body, and footer slots.            | `variant`, `radius`, `padding`, `shadow`, `href`, `interactive`, `selectable`, `selected`, `disabled`, `orientation` |
| `Panel`   | Elevated surface for secondary content regions — sidebars, info blocks, grouped settings.  | `variant`, `radius`, `padding`, `shadow`, `border`                                                                   |
| `Well`    | Inset/sunken surface. Visually recessed — good for inputs, code, or embedded content.      | `variant`, `padding`, `radius`                                                                                       |
| `Tile`    | Compact surface for dense grids or lists. Minimal padding, often interactive.              | `variant`, `radius`, `href`, `interactive`, `selected`                                                               |
| `Frame`   | Decorative border or visual boundary around content without changing layout.               | `variant`, `radius`, `border`, `padding`                                                                             |
| `Section` | Semantic surface with heading and content area. Handles vertical rhythm for page sections. | `padding`, `gap`, `as`                                                                                               |

---

## typography

Text components and inline content wrappers. Shared token vocabulary: size,
weight, family, color, leading, tracking.

**Shared props:** `size`, `weight`, `family`, `color`, `leading`, `tracking`

| Component | Purpose                                                                                      | Key props                                                                   |
| --------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `Heading` | Semantic h1–h6 with decoupled visual size. `level` drives the DOM; `size` drives appearance. | `level`, `size`, `weight`, `family`, `color`, `balance`                     |
| `Text`    | Body copy — paragraphs, captions, list items, any flowing prose.                             | `size`, `weight`, `color`, `leading`, `truncate`, `italic`, `balance`, `as` |
| `Quote`   | Block quotation with optional attribution.                                                   | `size`, `color`, `cite`                                                     |
| `Label`   | Form field label. Associates with a control via `for`.                                       | `for`, `required`, `size`, `weight`, `uppercase`                            |

| `Caption`        | Small supporting text. Semantically subordinate — image captions, metadata, fine print. | `size`, `color`, `as`       |
| `--------------` | L-------------------------------------------------------------------------------------. | `-------------------------` |
| `Code`           | Inline or block code display. Monospace family.                                         | `block`, `language`, `size` |
| `Kbd`            | Keyboard shortcut or key name display. Styled to look like a physical key.              | `size`                      |
| `VisuallyHidden` | Hides content visually while keeping it accessible to screen readers.                   | —                           |

---

## triggers

Components whose primary purpose is to initiate an action, submit data,
or navigate the user.

**Shared props:** `variant`, `size`, `color`, `disabled`, `loading`

| Component     | Purpose                                                                 | Key props                                                                                  |
| ------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `Button`      | Primary action trigger. Renders as `<button>` or `<a>` based on `href`. | `variant`, `size`, `color`, `disabled`, `loading`, `href`, `iconOnly`, `fullWidth`, `type` |
| `ThemeToggle` | Switches between light, dark, or system color schemes.                  | `defaultTheme`, `onChange`                                                                 |
| `Link`        | Styled inline anchor for navigation, not actions.                       | `href`, `target`, `size`, `color`, `underline`                                             |

| `ButtonGroup`      | Groups related buttons with shared borders and consistent sizing.                                | `size`, `variant`, `attached`                       |
| `----------------` | A----------------------------------------------------------------------------------------------. | `-------------------------------------------------` |
| `SegmentedControl` | Horizontally grouped set of mutually exclusive option buttons.                                   | `value`, `onChange`, `options`, `size`, `fullWidth` |
| `CommandPalette`   | Global keyboard-driven command and search interface. Renders in a portal, triggered by shortcut. | `isOpen`, `onClose`, `commands`, `placeholder`      |

---

## forms

Interactive data capture components. Share accessibility conventions:
`aria-invalid`, `aria-describedby`, `name`, `value`, `disabled`, `required`.

**Shared props:** `name`, `value`, `disabled`, `required`, `invalid`, `onChange`

| Component     | Purpose                                                                     | Key props                                                      |
| ------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `Input`       | Single-line text input.                                                     | `type`, `placeholder`, `value`, `size`, `invalid`, `readOnly`  |
| `Field`       | Wrapper binding a label, control, hint, and error into one accessible unit. | `label`, `hint`, `error`, `required`, `htmlFor`                |
| `Checkbox`    | Single boolean checkbox with label.                                         | `checked`, `defaultChecked`, `indeterminate`, `value`, `label` |
| `Select`      | Dropdown for selecting one option from a list.                              | `value`, `options`, `placeholder`, `size`, `invalid`           |
| `Radio`       | Single radio button. Used inside `RadioGroup`.                              | `value`, `label`, `checked`                                    |
| `Multiselect` | Select that allows choosing multiple options.                               | `value` (array), `options`, `placeholder`, `size`              |

| `InputGroup`  | Wraps an input with prepended/appended elements — icons, buttons, text. | `prepend`, `append`                                           |
| `-----------` | M---------------------------------------------------------------------. | `-----------------------------------------------------------` |
| `NumberInput` | Numeric input with increment/decrement stepper buttons.                 | `value`, `min`, `max`, `step`, `size`                         |
| `RadioGroup`  | Manages a set of Radio buttons as a single controlled group.            | `value`, `defaultValue`, `onChange`, `orientation`            |
| `Switch`      | Toggle switch for binary on/off state.                                  | `checked`, `defaultChecked`, `onChange`, `size`, `label`      |
| `Slider`      | Single-value range slider.                                              | `value`, `min`, `max`, `step`, `size`, `orientation`          |
| `RangeSlider` | Dual-handle slider for selecting a value range.                         | `value` (`[min, max]`), `min`, `max`, `step`                  |
| `Combobox`    | Text input that filters and suggests options as you type.               | `value`, `options`, `onInputChange`, `placeholder`, `size`    |
| `Search`      | Search input with clear button and optional debounce.                   | `value`, `onSearch`, `debounce`, `placeholder`, `size`        |
| `DatePicker`  | Calendar UI for selecting a date or date range.                         | `value`, `onChange`, `min`, `max`, `mode` (`single`, `range`) |
| `TimePicker`  | Input UI for selecting a time value.                                    | `value`, `onChange`, `format` (`12h`, `24h`)                  |
| `ColorPicker` | Color selection with swatch grid and value input.                       | `value`, `onChange`, `format`, `swatches`                     |
| `FileUpload`  | File input with drag-and-drop zone and file list.                       | `accept`, `multiple`, `maxSize`, `onChange`                   |

---

## overlay

Out-of-flow components rendered above the page in a portal. Share
focus-trap, Escape-key, and scroll-lock behaviour.

**Shared props:** `isOpen`, `onClose`

| Component      | Purpose                                                                   | Key props                                                                   |
| -------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `Modal`        | Centered dialog overlay for complex content or decisions.                 | `isOpen`, `onClose`, `size`, `closeOnOverlay`                               |
| `AlertDialog`  | Blocking modal for critical confirmations requiring explicit user action. | `isOpen`, `onClose`, `onConfirm`, `confirmLabel`, `cancelLabel`             |
| `Drawer`       | Panel that slides in from a screen edge.                                  | `isOpen`, `onClose`, `placement` (`left`, `right`, `top`, `bottom`), `size` |
| `Sheet`        | Full-height bottom sheet, primarily for mobile.                           | `isOpen`, `onClose`, `snapPoints`, `defaultSnap`                            |
| `Lightbox`     | Fullscreen media viewer with item navigation.                             | `isOpen`, `onClose`, `items`, `activeIndex`                                 |
| `Backdrop`     | Semi-transparent scrim behind modal overlays. Dims the page.              | `isOpen`, `onClick`, `blur`                                                 |
| `Portal`       | Renders children into a separate DOM node. No visual output.              | `target`                                                                    |
| `Popover`      | Small floating panel anchored to a trigger element.                       | `trigger`, `placement`, `isOpen`, `onClose`, `sideOffset`                   |
| `Tooltip`      | Brief floating label on hover or focus.                                   | `label`, `placement`, `delay`, `sideOffset`                                 |
| `DropdownMenu` | Trigger + floating list of actions or links.                              | `trigger`, `items`, `placement`, `onSelect`                                 |
| `ContextMenu`  | Right-click/long-press menu with contextual actions.                      | `items`, `onSelect`                                                         |

---

## feedback

Visual communication of system status, async states, and supplementary
metadata. Mostly presentational.

**Shared props:** `variant` (`info`, `success`, `warning`, `danger`), `size`

| Component     | Purpose                                                           | Key props                                                  |
| ------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- |
| `Alert`       | Inline alert for important messages. Persistent in the page flow. | `variant`, `title`, `dismissible`, `onDismiss`, `icon`     |
| `Banner`      | Full-width strip for announcements or system-wide notices.        | `variant`, `dismissible`, `onDismiss`                      |
| `Toast`       | Single transient notification. Auto-dismisses after a duration.   | `variant`, `title`, `description`, `duration`, `onDismiss` |
| `ToastRegion` | Portal container that manages stacking and positioning of Toasts. | `placement`, `maxToasts`                                   |
| `Badge`       | Small count or label — standalone or overlaid on another element. | `variant`, `size`, `count`, `max`                          |
| `Chip`        | Compact inline element for a value with optional remove action.   | `variant`, `size`, `onRemove`, `icon`                      |
| `Tag`         | Non-interactive category or metadata label.                       | `variant`, `size`, `color`                                 |
| `Dot`         | Tiny colored circle for presence or status indication.            | `variant`, `size`, `pulse`                                 |
| `Indicator`   | Wraps an element and overlays a Badge or Dot in a corner.         | `count`, `variant`, `placement`, `offset`                  |
| `Spinner`     | Circular indeterminate loading animation.                         | `size`, `color`, `label`                                   |
| `Skeleton`    | Placeholder shimmer block mimicking content shape while loading.  | `width`, `height`, `radius`, `lines`, `animate`            |
| `Progress`    | Linear bar indicating task completion.                            | `value`, `max`, `size`, `variant`, `label`                 |
| `EmptyState`  | Placeholder when a list or region has no content.                 | `title`, `description`, `icon`, `action`                   |

---

## nav

Wayfinding and navigation components. Handle active state, item arrays,
and sequential progression.

**Shared props:** `items`, `orientation`

| Component     | Purpose                                                              | Key props                                                   |
| ------------- | -------------------------------------------------------------------- | ----------------------------------------------------------- |
| `Navbar`      | Primary navigation bar containing logo, links, and actions.          | `items`, `logo`, `actions`, `sticky`                        |
| `Menu`        | Generic menu of items with actions attached.                         | `trigger`, `isOpen`, `onClose`, `placement`                 |
| `Toolbar`     | Horizontal bar of grouped actions, filters, or controls.             | `gap`, `align`                                              |
| `Breadcrumbs` | Trail of links showing the current page's location in the hierarchy. | `items`, `separator`, `maxItems`                            |
| `Tabs`        | Tabbed interface for switching between content panels.               | `items`, `value`, `onChange`, `orientation`, `variant`      |
| `Pagination`  | Controls for navigating between pages of content.                    | `page`, `totalPages`, `onChange`, `siblings`, `boundaries`  |
| `Stepper`     | Step indicator for multi-step flows.                                 | `steps`, `activeStep`, `onChange`, `orientation`, `variant` |
| `TreeView`    | Collapsible hierarchical tree for navigating nested structures.      | `nodes`, `expanded`, `selected`, `onExpand`, `onSelect`     |

---

## data

Read-only information display and visualization. Takes structured data
and renders it in organized formats.

**Shared props:** `data`, `label`, `value`

bar-chart, bento, description-list, event, feed, key-value, key-value-list, line-chart, metric, pie-chart, result-item, sparkline, stat, table, timeline, 
bento-grid/cell?

| Component         | Purpose                                                                 | Key props                                             |
| ----------------- | ----------------------------------------------------------------------- | ----------------------------------------------------- |
| `Table`           | Tabular data with rows and columns. Optional sorting and selection.     | `columns`, `data`, `sortable`, `selectable`, `onSort` |
| `List`            | Styled ordered or unordered list.                                       | `items`, `gap`, `marker`, `as`                        |
| `DescriptionList` | Term/description pairs in a semantic `<dl>`.                            | `items`, `orientation`, `columns`                     |
| `KeyValue`        | Single label/value pair displayed inline or stacked.                    | `label`, `value`, `orientation`                       |
| `KeyValueList`    | Multiple KeyValue rows in a compact layout.                             | `items`, `orientation`, `columns`                     |
| `ResultItem`      | A single search or list result — thumbnail, title, description.         | `title`, `description`, `href`, `thumbnail`, `meta`   |
| `Stat`            | Single numeric metric with label.                                       | `label`, `value`, `unit`, `size`                      |
| `Metric`          | Metric with value, label, trend indicator, and optional comparison.     | `label`, `value`, `trend`, `trendValue`, `unit`       |
| `BarChart`        | Vertical or horizontal bar chart.                                       | `data`, `orientation`, `color`, `label`, `height`     |
| `PieChart`        | Pie or donut chart with optional legend.                                | `data`, `variant` (`pie`, `donut`), `size`            |
| `Sparkline`       | Tiny inline trend line for embedding in tables or cards.                | `data`, `color`, `width`, `height`                    |
| `BentoGrid`       | Asymmetric grid layout for mixed-size content blocks.                   | `cols`, `gap`                                         |
| `BentoCell`       | Individual cell inside a BentoGrid with configurable span.              | `colSpan`, `rowSpan`, `variant`                       |
| `Timeline`        | Chronological list of events along an axis.                             | `items`, `orientation`, `variant`                     |
| `Feed`            | Vertically scrollable stream of content items.                          | `items`, `gap`, `loadMore`, `loading`                 |
| `Event`           | Single event card with date, title, description, and optional location. | `title`, `date`, `description`, `location`, `href`    |

---

## assets

Rich media and binary content. Manages src, fallback UI, aspect ratio,
and media-specific controls.

**Shared props:** `src`, `alt`, `width`, `height`, `fallback`

| Component     | Purpose                                                                  | Key props                                                         |
| ------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `Image`       | Optimized image with lazy loading, aspect ratio, and fallback.           | `src`, `alt`, `ratio`, `fit`, `loading`, `radius`                 |
| `Icon`        | SVG icon wrapper with size and color props.                              | `name`, `size`, `color`, `label`                                  |
| `Avatar`      | User avatar — image with initial fallback and optional status indicator. | `src`, `name`, `size`, `shape`, `status`                          |
| `AvatarGroup` | Overlapping stack of Avatars with overflow count.                        | `avatars`, `max`, `size`, `spacing`                               |
| `Video`       | HTML5 video player with styled controls.                                 | `src`, `poster`, `controls`, `autoPlay`, `loop`, `muted`, `ratio` |
| `Audio`       | HTML5 audio player with styled controls.                                 | `src`, `controls`, `autoPlay`, `loop`                             |
| `Waveform`    | Visual waveform for audio tracks.                                        | `data`, `color`, `height`, `progress`, `onSeek`                   |
| `FilePreview` | Thumbnail preview of an uploaded or linked file.                         | `file`, `size`, `removable`, `onRemove`                           |
| `Carousel`    | Horizontally paged slider with navigation controls.                      | `items`, `autoPlay`, `interval`, `loop`, `showDots`, `showArrows` |
| `Gallery`     | Responsive image grid with optional lightbox.                            | `items`, `cols`, `gap`, `lightbox`                                |
| `GalleryItem` | Single item inside a Gallery — image with caption.                       | `src`, `alt`, `caption`, `href`                                   |
| `Cropper`     | Image cropping UI with handles, zoom, and preview.                       | `src`, `aspectRatio`, `onCrop`, `minWidth`, `minHeight`           |

---

## motion

Animation orchestration wrappers. These don't output their own visible HTML —
they wrap other components to apply entrance, exit, or continuous animations.

**Shared props:** `duration`, `delay`, `easing`, `trigger` (`mount`, `scroll`, `hover`, `manual`)

| Component     | Purpose                                                                    | Key props                                             |
| ------------- | -------------------------------------------------------------------------- | ----------------------------------------------------- |
| `M`           | Generic motion wrapper. Applies a named animation to its child on trigger. | `animation`, `trigger`, `duration`, `delay`, `easing` |
| `Alternating` | Applies alternating left/right entrance to a list of children.             | `direction`, `gap`, `duration`, `delay`               |
| `Staggered`   | Cascading entrance animation — each child delayed after the last.          | `stagger`, `animation`, `trigger`                     |
| `Wave`        | Continuous wave or shimmer animation.                                      | `speed`, `color`, `direction`                         |
| `Counter`     | Animates a number from one value to another. Used in Stat and Metric.      | `from`, `to`, `duration`, `format`, `easing`          |