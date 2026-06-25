# Component Composition Opportunities

This is an exhaustive list of opportunities where raw HTML tags are currently used internally within `dezign8` components, and where they could potentially be replaced by other Design System components (e.g., using `<H>` instead of `<h2>`, or `<Button>` instead of `<button>`).

> [!WARNING]
> **Architectural Note:** `CLAUDE.md` specifies that "Categories don't import from sibling categories". Taking advantage of many of these opportunities would require cross-category imports (e.g., `overlays` importing from `typography` or `triggers`), which currently violates the strict dependency rules. These are presented as *options* for consideration if the architectural rules are ever adjusted.

---

### Overlays (`src/design/overlays`)

**`Modal.astro`**
- **Title (`<h2>`)**: Replace with `<H level={2}>` or `<Heading>`.
- **Close Button (`<button>`)**: Replace with `<Button variant="icon">` or `<Button variant="ghost">`. 

**`AlertDialog.astro`**
- **Title (`<h2>`)**: Replace with `<H level={2}>` or `<Heading>`.
- **Description (`<p>`)**: Replace with `<Text>` or `<Prose>`.

---

### Feedback (`src/design/feedback`)

**`Alert.astro`**
- **Dismiss Button (`<button>`)**: Replace with `<Button variant="icon">`.
- **Dismiss Icon (`<path>`)**: Replace inline SVG with `<Icon name="x">` (similar to how Modal uses Icon).

**`Banner.astro`**
- **Dismiss Button (`<button>`)**: Replace with `<Button variant="icon">`.
- **Dismiss Icon (`<path>`)**: Replace inline SVG with `<Icon name="x">`.

---

### Data (`src/design/data`)

**`List.astro`**
- **List Links (`<a>`)**: When `item.href` is used, replace the raw `<a>` wrapper with `<Link>`.
- **Caption (`<p>`)**: Replace the `<p class="list__caption">` with `<Caption>` or `<Text>`.

**`Table.astro`**
- **Sort Buttons (`<button>`)**: Replace the `<button class="table__sort-btn">` column headers with `<Button variant="ghost">`.

---

### Forms (`src/design/forms`)

**`Field.astro`**
- **Hint Message (`<p>`)**: Replace with `<Caption>` or `<Text size="sm">`.
- **Error Message (`<p>`)**: Replace with `<Caption>` or `<Text size="sm">`.
- **Success Message (`<p>`)**: Replace with `<Caption>` or `<Text size="sm">`.

**`Checkbox.astro` & `Radio.astro`**
- **Label Wrapper (`<label>`)**: While these components use `<label>` functionally to wrap inputs, they could compose `<Label>` from Typography to inherit standard label sizing and weight, though wrapping behavior would need to be tested.

---

### Navigation (`src/design/nav`)

**`Pagination.astro`**
- **Page Links (`<a>`)**: Replaces standard `<a>` tags with `<Link>`.
- **Next/Prev Buttons (`<a>` / `<button>`)**: Replace with `<Button>` or `<Link>`.

**`Menu/MenuItem.astro`**
- **Interactive elements (`<a>` or `<button>`)**: Replace with `<Link>` or `<Button variant="ghost">`.

**`Navbar.astro`**
- **Toggle Button (`<button>`)**: Replace with `<Button variant="icon">`.

---

### Assets (`src/design/assets`)

**`Audio.astro`**
- **Play Button (`<button>`)**: Replace with `<Button variant="icon">`.
- **Volume/Rate (`<label>`)**: Replace with `<Label>`.

**`FilePreview.astro`**
- **Dismiss Button (`<button>`)**: Replace with `<Button variant="icon">`.
- **Dismiss Icon (`<path>`)**: Replace inline SVG with `<Icon name="x">`.

---

### Surfaces (`src/design/surfaces`)

**`Card.astro` & `Tile.astro`**
- **Interactive Wrapper (`<a>`)**: When `href` is passed, these components render as a raw `<a>`. While you wouldn't necessarily want `<Link>` styling, you could compose behavior using an underlying abstract link primitive if one exists.

######################################################
## CHAT'S OPINION ####################################
######################################################

In general, this is a good analysis, but I'd split these into three categories:

1. Strong composition opportunities (I'd probably do it)
2. Situational composition (depends on implementation)
3. Leave the raw HTML alone

The biggest mistake design systems make is chasing 100% component purity. Not every `<button>` should become a `<Button>`, and not every `<h2>` should become an `<H>`.

---

## Definitely Compose

These are places where the design system should be the single source of truth.

### Modal

```astro
<h2>
```

→ `H`

Good candidate.

Modal titles should inherit typography tokens automatically. Otherwise every overlay starts inventing its own heading styles.

---

### AlertDialog

```astro
<h2>
<p>
```

→ `H`
→ `Text`

Also good.

Alert dialogs are presentation-heavy UI.

---

### Alert / Banner

```astro
<path>
```

→ `Icon`

Very good candidate.

An icon system prevents:

* duplicated SVGs
* inconsistent stroke widths
* inconsistent sizing
* multiple X icons that look different

This is one of the highest-value refactors in the list.

---

### List

```astro
<a>
```

→ `Link`

Good.

Navigation behavior should come from one place.

---

### Pagination

```astro
<a>
```

→ `Link`

Good.

Pagination is navigation.

---

### MenuItem

```astro
<a>
<button>
```

→ Link/Button primitives

Very good.

Menus tend to explode into inconsistent states if they don't share interaction primitives.

---

### Navbar Toggle

```astro
<button>
```

→ Button variant="icon"

Good.

---

### Audio Labels

```astro
<label>
```

→ Label

Good.

Labels are typography.

---

## Maybe Compose

These depend on whether the design system component adds behavior or merely styling.

---

### Modal Close Button

```astro
<button>
```

→ Button

Maybe.

A modal close button is often:

```html
<button
  aria-label="Close"
  class="modal__close"
>
```

If your Button component introduces:

* spacing
* focus rings
* padding
* variants
* extra DOM

then it may actually make the modal harder to control.

I'd only do this if Button is extremely lightweight.

---

### Alert/Banner Dismiss Buttons

Same answer.

Could go either way.

---

### Table Sort Buttons

This is one I'd be cautious with.

A table sort header is not conceptually a button component.

It's a table control.

Often:

```html
<th>
  <button>
```

has very different styling requirements from a normal UI button.

I'd probably leave it raw.

---

### FilePreview Dismiss

Same as modal close button.

Could compose.

Not required.

---

### Card / Tile Links

This is where people often over-abstract.

Current:

```astro
<a class="card">
```

Replacing with:

```astro
<Link>
```

often creates problems because cards are not links in the visual sense.

They're cards that happen to navigate.

I would only compose:

```ts
LinkPrimitive
```

not your styled Link component.

---

## Probably Leave Alone

These are semantic HTML elements whose primary purpose is functionality.

---

### Field Messages

```astro
<p>
```

for:

* hint
* error
* success

I would probably leave them alone.

Reason:

These aren't body text.

They're form metadata.

If you later need:

```css
.field__message
.field__error
.field__success
```

you don't want to fight a Text component.

---

### Checkbox / Radio Labels

```astro
<label>
```

Keep the label.

Maybe import typography tokens.

Don't wrap a Label component around it.

Form controls are already among the most fragile components in a design system.

I'd favor:

```css
.checkbox__label
{
  font-size: var(--font-size-label);
}
```

rather than nesting another abstraction.

---

## What's Missing

The report is looking at tags.

I'd actually look for something higher-value:

### Repeated spacing patterns

Example:

```astro
<div class="stack">
```

appearing everywhere.

Those are usually better composition targets than headings.

---

### Repeated icon SVGs

Highest ROI.

---

### Repeated interactive states

Example:

```css
:hover
:focus-visible
:active
```

duplicated across components.

Huge win if unified.

---

### Repeated ARIA patterns

Example:

```astro
aria-expanded
aria-controls
aria-labelledby
```

These are often better extracted into primitives than typography.

---

If this were my design system, I'd prioritize in roughly this order:

1. Icon → highest value
2. Link → high value
3. Heading/Text → high value
4. Menu/Button primitives → medium value
5. Card/Tile link abstraction → low value
6. Form message typography → low value
7. Checkbox/Radio label composition → probably skip entirely

The report identifies valid opportunities, but several of them are examples of "same HTML tag" rather than "same responsibility." The latter is usually the better signal for composition.
