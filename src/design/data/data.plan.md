# Category: Data - planning

`table` ------ is `table-header` separate? `table-body`, `table-footer`, `table-row`, `table-cell`, `table-head` ??

charts -> `bar-chart`, `line-chart`, `pie-chart`, `sparkline`
lists -> `list`, `description-list`, `key-value-list`, `timeline`, `feed`
items -> `event`, `key-value`, `metric`, `result-item`, `stat`,

BentoGrid - layout or here? i think remove
BentoCell - surface or here? i think remove

another way to think of it is these should all be props you could pass "data" to.

<Table data=> makes sense. check.
`<BarChart data=>` any chart will work. check.
<List data=items> ya i think so. 
<Item data=.....just the item.....?> - maybe item doesn't belong here. we'd feed items to the other ones as data.or maybe we're feeding item the data itself and then passing multiple items. i dunno - your thoughts?

does that make sense to you? is it valid? better?

## Props

### Brainstorming

color = primary/secondary/etc

    for table, the visible cell borders are primary color
    for list & desc-list, same but like a separator
    timeline, feed it affects the separator between an event/item and maybe the overall border
    keyvalue, stat, metric, sparkline, event, bento it affects text color

bg = same choices, different shades - effects the bg-color

highlight = same, affects the color of another part of the component if they have a highlihght section

### Organizing

**Color-role props** (your example — the mechanism is `--data--color`, `--data--bg`, `--data--highlight` channels):

| Prop        | Table            | List/DescList       | Timeline/Feed                 | KV/Stat/Metric/Sparkline/Bento |
| ----------- | ---------------- | ------------------- | ----------------------------- | ------------------------------ |
| `color`     | cell borders     | separators          | item separator + outer border | text accent                    |
| `bg`        | row tint         | item tint           | section bg                    | card/cell bg                   |
| `highlight` | highlighted rows | pinned/active items | current event                 | emphasis value                 |

**Container treatment** — same story as forms `variant`. Every data component has some wrapper:
- `"plain"` — no decoration
- `"outlined"` — border
- `"soft"` — subtle filled bg
- `"elevated"` — shadow

This is orthogonal to `color`: `variant="outlined" color="danger"` → red border; `variant="soft" color="success"` → green tint.

**Scale/density** — `size?: "compact" | "comfortable" | "spacious"` drives `--data--density`, a spacing unit consumed proportionally. Tabular components use it for row height/padding. Stat/Metric use it for number scale. Charts use it for bar width or chart height. Not every component uses every channel — that's fine, unused channels are just ignored.

**State props** (behavior booleans, not token dimensions):
- `loading?: boolean` — skeleton/spinner
- `empty?: boolean | string` — no-data state; string overrides default empty message

**Visual modifiers** (broadly applicable boolean token dimensions, class-only):
- `striped?: boolean` — alternating row/item backgrounds (Table, List, KV*, DescList, Feed)
- `bordered?: boolean` — explicit grid lines beyond the container itself (Table cells, KV rows)

**Accessible metadata:**
- `caption?: string` — `<caption>` for table, `aria-label` for charts, heading for lists

---

## What I'd add that you didn't mention

**`interactive?: boolean`** — about 6/15 components have hoverable/clickable rows (Table, List, ResultItem, Bento, Feed items, Timeline events). Drives `cursor: pointer` and hover state via `.data--interactive`. Component-level CSS picks this up on its own children.

**`selectable?: boolean`** — Table rows, List items, Bento cells. Drives checkbox rendering and selection state. Probably category-level because the *wiring* is identical even if the visuals differ.

**`scrollable?: boolean`** — Table (horizontal), List/Feed (vertical overflow). Drives `overflow: auto` on the right axis via component CSS reading `data-scrollable`.

---

## Where I'd draw the line

Things I'd *not* put at category level:

- `columns` / `rows` — Table-only
- `value` / `trend` / `format` — Stat/Metric/Sparkline sub-family
- `data` arrays — Chart sub-family  
- `items` arrays — Timeline/Feed/Event sub-family
- `orientation` — only Timeline/Feed genuinely use it; promote if List/KV also needs it

---

## Draft DataProps shape

```ts
interface DataProps extends BaseComponentProps {
  // Color channels → --data--color-*, --data--bg-*, --data--highlight-*
  color?:     ColorRole;
  bg?:        ColorRole;
  highlight?: ColorRole;

  // Container decoration (same role as forms variant)
  variant?: "plain" | "outlined" | "soft" | "elevated";

  // Scale
  size?: "compact" | "comfortable" | "spacious";

  // Accessible metadata
  caption?: string;

  // State
  loading?: boolean;
  empty?:   boolean | string;

  // Visual modifiers (class-only token dimensions)
  striped?:  boolean;
  bordered?: boolean;

  // Behavior
  interactive?: boolean;
  selectable?:  boolean;
  scrollable?:  boolean;
}
```

That's ~14 category-level props compared to forms' ~8 — defensible because the category is larger (15 vs ~10 components) and the color surface is richer.

Does `interactive` / `selectable` / `scrollable` feel right to you, or are those component-level in your mind?