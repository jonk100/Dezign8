# Design System Rules

What we know so far. These reflect decisions we've made and patterns
that have proven out. As components get built, some will need revisiting —
that's expected. The import direction rules are the most load-bearing;
everything else is a strong preference based on what's worked.

---

## Import direction

The one area with hard constraints. Violating this creates circular
dependencies and makes the system unpredictable.

```
vars.css / tokens.css
  ↑
shared/primitives.tokens.ts
  ↑
<category>.tokens.ts
  ↑
<category>.props.ts   <category>.hook.ts   <category>.css
  ↑                         ↑
<component>.tokens.ts
  ↑
<component>.props.ts  <component>.hook.ts  <component>.css
  ↑
<Component>.astro
```

- Lower layers don't import from higher layers.
- `shared/` imports nothing from any category or component.
- A category doesn't import from a sibling category.
- A component doesn't import from a sibling component.
- `.css` files import nothing — they only read CSS custom properties.
- `primitives.tokens.ts` imports from `tokens.ts` only.

---

## `shared/tokens.ts`

- Engine functions only: `scale`, `dimension`, `defineTokens`,
  `composeTokens`, `pickValues`, `resolveTokens`.
- No values, no CSS variable references, no component knowledge.
- Changes only to fix the engine or add a new engine primitive.

---

## `shared/primitives.tokens.ts`

- Shared value scales live here. If two categories need the same
  scale, it belongs here rather than being duplicated.
- A value map is authored once. Categories reference it by importing
  the dimension — they don't retype the values.
- Dimensions only used by one category belong in that category's
  `tokens.ts`, not here.
- Imports from `tokens.ts` only.

---

## `<category>.tokens.ts`

- Assembles the category spec from primitives and any category-only
  dimensions (e.g. `variant`).
- No defaults — those belong in component `tokens.ts`.
- No runtime logic — pure data.

---

## `<component>.tokens.ts`

- Exists for every component, even if it only re-exports the category.
  Keeps import paths consistent and insulates against future changes.
- Holds the component's defaults and any component-only constant lists.
- Derived types that come from the spec are exported from here.
- Three common shapes: re-export, extend, narrow — but components
  can do other things as needed (lookup tables, size maps, etc.).

---

## `<component>.props.ts`

- Types only. No runtime values.
- Prefer deriving scale types from the token spec rather than
  hand-writing unions — derived types can't drift from the spec.
- Boolean props, structural props (`as`, `level`, `href`), and
  behaviour props go here. They're not token dimensions.

---

## `<component>.hook.ts`

- Returns `{ Tag, props }` (or a named attributes object for category hooks).
- No rendering, no JSX, no Astro APIs.
- Defaults applied by destructuring.
- The hook is where prop values become CSS channels and class modifiers.
  How exactly that happens will vary by component — `resolveTokens`,
  direct helpers like `resolveColorChannels`, lookup tables, or a
  mix. Use whatever produces the clearest output for that component.

---

## `<component>.css`

- Reads CSS custom property channels written by the hook.
- Prefer going through a channel rather than referencing token names
  or raw scale values directly — channels are what the hook controls.
- Modifier classes select rules. CSS variables supply values within them.
- If CSS is branching on a prop value, that variance probably belongs
  in the hook instead.

---

## Channel naming

- Channels follow `--{prefix}--{key}` where prefix is whatever CSS
  namespace reads the channel.
- Category-scoped when the shared category stylesheet reads it.
- Component-scoped when only that component's own stylesheet reads it.
- The right prefix and naming will usually be obvious from which CSS
  file actually needs the value.

---

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Scale constant | SCREAMING_SNAKE | `SPACE`, `TEXT_SIZE` |
| Dimension constant | SCREAMING_SNAKE | `GAP`, `WEIGHT_DIM` |
| Token spec | SCREAMING_SNAKE + `_TOKENS` | `CONTROL_TOKENS` |
| Defaults object | SCREAMING_SNAKE + `_DEFAULTS` | `BUTTON_DEFAULTS` |
| Derived type | PascalCase | `GapScale`, `HeadingWeight` |
| CSS channel | `--{prefix}--{key}` | `--typography--size` |
| CSS class base | category or component name | `.control`, `.button` |
| CSS modifier | `{base}--{value}` | `.control--solid`, `.h--balance` |

---

## What we've moved away from

- `consts.ts` — merged into `tokens.ts`
- `maps.ts` — replaced by `primitives.tokens.ts` + `resolveTokens`
- Hand-written union types that duplicate what's in the spec
- `cssVar` string literals baked into dimension definitions
- Logic in `.astro` files