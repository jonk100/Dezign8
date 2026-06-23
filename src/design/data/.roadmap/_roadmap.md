# data roadmap

## implemented
- table (with full parts: head, body, foot, row, cell)
- list
- feed
- stat
- metric

## deferred — extensions?
- bar-chart, line-chart, pie-chart, sparkline  (needs charting library decision)
- description-list                              (list covers it for now)
- key-value-list                               (list covers it for now)  
- timeline                                     (feed covers it for now)

---

## Conversations:

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

Proposed structure:

```sh
data/
├── data.props.ts
├── data.tokens.ts
├── data.hook.ts
├── data.css
│
├── table/
│   ├── Table.astro
│   └── parts/  (TableHead, TableBody, TableFoot, TableRow, TableCell)
│
├── charts/
│   ├── bar-chart/
│   ├── line-chart/
│   ├── pie-chart/
│   └── sparkline/
│
├── lists/
│   ├── list/
│   ├── description-list/
│   ├── key-value-list/  (KeyValue lives here as a part)
│   ├── timeline/        (TimelineEvent lives here as a part)
│   └── feed/            (FeedItem lives here as a part)
│
└── metrics/             ← rename from "items", only the standalone ones
    ├── stat/
    └── metric/
```



..." it just seems like a lot of nesting. it almost feels like this is an extension of the design system that we'd worry about later. like make table, list, feed, stat and metric inside data and then develope a data extension separately"

Yes, exactly. That's the right call — YAGNI in action.

**Build now:**
```
data/
├── data.props.ts
├── data.tokens.ts
├── data.hook.ts
├── data.css
├── table/
├── list/
├── feed/
├── stat/
└── metric/
```

**Later, as a separate extension when actually needed:**
```
data-viz/       ← or just data/charts/ when the time comes
  bar-chart/
  line-chart/
  pie-chart/
  sparkline/

data/           ← additions to the core
  description-list/
  key-value-list/
  timeline/
```

---