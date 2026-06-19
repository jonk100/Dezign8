# TENTATIVE WORK IN PROGRESS - CATEGORY SPLIT FOR COMPONENTS

Do not ues this file as a source of truth when creating categories, components, or anything else. This is open for discussion.

=============================================================================================================================

## Tentative Categories

**1. Layout & Surfaces (Containers that dictate flow and background)**
*Props: as, padding, gap, align, justify, radius, variant (flat/elevated)*
`Box`, `Flex`, `Grid`, `Stack`, `Inline`, `Center`, `Container`, `Columns`, `Screen`, `Spacer`, `AspectRatio`
`Card`, `Paper`, `Panel`, `Tile`, `Well`, `Frame`, `Section`, `Separator`

**2. Typography & Semantics (Text nodes and inline wrappers)**
*Props: size, weight, color, align, as, leading*
`Text`, `Heading`, `Caption`, `Prose`, `Quote`, `Kbd`, `Code`, `VisuallyHidden`

**3. Forms & Data Entry (Interactive data capture)**
*Props: name, value, disabled, required, invalid, placeholder, onChange*
`Input`, `Textarea`, `NumberInput`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `RangeSlider`, `ColorPicker`, `TimePicker`, `DatePicker`
`Select`, `Combobox`, `Multiselect`, `Search`, `FileUpload`
`Field`, `Label`, `InputGroup`

**4. Buttons, Links & Actions (Direct user triggers)**
*Props: variant, size, disabled, href, loading, onClick*
`Button`, `ButtonGroup`, `Link`, `SkipLink`, `SegmentedControl`, `ThemeToggle`, `CommandPalette`

**5. Overlays, Modals & Floating UI (Out-of-flow z-index layer)**
*Props: isOpen, onClose, trigger, placement, overlay*
`Modal`, `AlertDialog`, `Drawer`, `Sheet`, `Lightbox`, `Backdrop`, `Portal`
`Popover`, `Tooltip`, `Menu`, `DropdownMenu`, `ContextMenu`

**6. Feedback & Status (Visual communication & loading)**
*Props: variant (success/warning/error), loading, dismissible*
`Alert`, `Banner`, `Toast`, `ToastRegion`
`Badge`, `Chip`, `Tag`, `Dot`, `Indicator`
`Spinner`, `Skeleton`, `Progress`, `EmptyState`

**7. Navigation & Chronology (Wayfinding and sequence)**
*Props: items, activeItem, href, direction*
`Navbar`, `Header`, `Footer`, `Toolbar`
`Tabs`, `Breadcrumbs`, `Pagination`, `Stepper`
`Timeline`, `Feed`, `Event`, `TreeView`

**8. Data Display & Visualization (Information arrays and metrics)**
*Props: data, columns, title, value*
`Table`, `List`, `DescriptionList`, `KeyValue`, `KeyValueList`, `ResultItem`
`Stat`, `Metric`, `BarChart`, `PieChart`, `Sparkline`
`BentoGrid`, `BentoCell`

**9. Media & Assets (Rich media and graphics)**
*Props: src, alt, width, height, fallback*
`Image`, `Video`, `Audio`, `Icon`, `Avatar`, `AvatarGroup`
`Carousel`, `Gallery`, `GalleryItem`, `FilePreview`, `Cropper`, `Waveform`

**10. Motion & Animation (Orchestration wrappers)**
*Props: delay, duration, easing, trigger*
`M`, `Alternating`, `Staggered`, `Wave`, `Counter`

This is a much cleaner reduction from 17 down to 10 solid, prop-aligned categories. I will structure the response directly addressing this new consolidated grouping.By focusing strictly on **shared props, architectural behavior, and how data is passed**, we can collapse the previous 17 conceptual categories down into **10 highly actionable, prop-aligned component families.**

This makes maintaining the library much easier, as components in the same family will often import the same TypeScript interfaces (e.g., `interface FloatingProps` or `interface FormFieldProps`).

Here is the newly consolidated architecture:

---

### 1. Layout & Surfaces (The CSS Flow Family)

**Shared Props:** `as` (polymorphic element), `gap`, `padding`/`m`, `justify`, `align`, `radius`, `elevation`.
**Behavior:** These dictate where things sit on the screen, manage CSS grid/flex structures, and provide physical boundaries (borders/backgrounds). They rarely manage interactive state.

* **Primitives:** `Box`, `Flex`, `Grid`, `Stack`, `Inline`, `Center`, `Container`, `Columns`, `Screen`, `Spacer`, `AspectRatio`, `Separator`
* **Surfaces:** `Card`, `Paper`, `Panel`, `Tile`, `Well`, `Frame`, `Section`

### 2. Typography & Semantics (The Text Family)

**Shared Props:** `size`, `weight`, `color` (text tokens), `align`, `leading` (line-height), `truncate`.
**Behavior:** Components that wrap raw strings, format text, or enforce vertical reading rhythm.

* `Text`, `Heading`, `Caption`, `Prose`, `Quote`, `Code`, `Kbd`, `VisuallyHidden`

### 3. Forms & Data Entry (The Input Family)

**Shared Props:** `name`, `value`, `disabled`, `required`, `invalid` / `error`, `onChange`, `placeholder`.
**Behavior:** Anything that captures user data, from simple native inputs to complex autocomplete engines. They share accessibility requirements for `aria-invalid` and `aria-describedby`.

* **Wrappers:** `Field`, `Label`, `InputGroup`
* **Standard:** `Input`, `Textarea`, `NumberInput`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Slider`, `RangeSlider`
* **Complex/Data-Driven:** `Select`, `Combobox`, `Multiselect`, `Search`, `TimePicker`, `DatePicker`, `ColorPicker`, `FileUpload`

### 4. Actions & Triggers (The Button Family)

**Shared Props:** `variant` (primary, secondary, ghost), `size`, `disabled`, `loading`, `href` (polymorphic link vs button behavior), `onClick`.
**Behavior:** Elements designed strictly to trigger an action, submit a form, or navigate the user.

* `Button`, `ButtonGroup`, `Link`, `SkipLink`, `SegmentedControl`, `ThemeToggle`, `CommandPalette`

### 5. Modals & Floating UI (The Z-Index Family)

**Shared Props:** `isOpen`, `onClose`, `triggerId`, `placement` (top, bottom, left, right), `sideOffset`, `overlay` (boolean).
**Behavior:** Out-of-flow components rendered into portals. They share complex logic for trapping focus, closing on "Escape", and calculating screen collisions (preventing menus from clipping off-screen).

* **Modals:** `Modal`, `AlertDialog`, `Drawer`, `Sheet`, `Lightbox`, `Backdrop`, `Portal`
* **Anchored:** `Popover`, `Tooltip`, `Menu`, `DropdownMenu`, `ContextMenu`

### 6. Feedback & Status (The State Family)

**Shared Props:** `variant` (success, info, warning, error), `size`, `dismissible`, `loading` (boolean).
**Behavior:** Visual cues that communicate system status to the user. These range from persistent inline chips to transient toast notifications and async loading states.

* **Transient:** `Alert`, `Banner`, `Toast`, `ToastRegion`
* **Metadata:** `Badge`, `Chip`, `Tag`, `Dot`, `Indicator`
* **Async/Loading:** `Spinner`, `Skeleton`, `Progress`, `EmptyState`

### 7. Navigation & Chronology (The Wayfinding Family)

**Shared Props:** `items` (array of link objects), `activePath`, `orientation` (horizontal/vertical).
**Behavior:** Components that define structural pathways. They share logic for iterating over arrays of links, highlighting the active state based on the URL, and stepping through sequences.

* **Macro Nav:** `Navbar`, `Header`, `Footer`, `Toolbar`
* **Micro Nav:** `Breadcrumbs`, `Tabs`, `Pagination`, `Stepper`, `TreeView`
* **Sequential:** `Timeline`, `Feed`, `Event`

### 8. Data Display & Visualization (The Data Array Family)

**Shared Props:** `data` (JSON array/objects), `columns`, `label`, `value`, `trend`.
**Behavior:** Components designed strictly to take arrays of data and render them into organized, comparative formats (lists, tables, charts).

* **Tabular/List:** `Table`, `List`, `DescriptionList`, `KeyValue`, `KeyValueList`, `ResultItem`
* **Metrics:** `Stat`, `Metric`, `BarChart`, `PieChart`, `Sparkline`
* **Bento:** `BentoGrid`, `BentoCell`

### 9. Media & Assets (The Visual Family)

**Shared Props:** `src`, `alt`, `aspectRatio`, `fallback`, `controls` (boolean).
**Behavior:** Components that manage binary files, fallback UI (when an image fails to load), and spatial media coordination.

* **Images & Graphics:** `Image`, `Icon`, `Avatar`, `AvatarGroup`
* **Rich Media:** `Video`, `Audio`, `Waveform`, `FilePreview`
* **Galleries:** `Carousel`, `Gallery`, `GalleryItem`, `Cropper`

### 10. Motion & Animation (The Orchestration Family)

**Shared Props:** `delayMs`, `duration`, `easing`, `trigger` (mount, scroll, hover).
**Behavior:** Framework-level abstractions that don't output their own HTML, but instead wrap other components to apply mounting/unmounting transitions or continuous CSS animations.

* `M`, `Alternating`, `Staggered`, `Wave`, `Counter`

---

### Why this structure works for development:

If you build your project this way, you can create a `types/` folder and write shared definitions. For example, almost everything in **Category 6 (Feedback & Status)** can share a single `StatusVariant` type, ensuring your Alerts, Badges, and Toasts all accept the exact same `"success" | "warning" | "error"` props. Everything in **Category 5 (Floating UI)** can share a single `useFloating()` hook to handle click-outside and escape-key behavior.