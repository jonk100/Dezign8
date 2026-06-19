Right — so size is component-scoped because a Button's `sm` and a Chip's `sm` are genuinely different values. The category doesn't own size; each component does. This makes size parallel to color in terms of how it's resolved: one prop, multiple channels, handled outside `resolveTokens` via a lookup.

The pattern:

```
size="sm" on Button
      │
      ├─ class:  button--sm              (modifier, via resolveTokens)
      ├─ style:  --button--fs:      var(--label--sm)
      │          --button--padding: var(--space-in--xs)
      │          --button--height:  var(--size-06)
      │
      ▼
button.css reads those three channels directly — no size branching in CSS
```

```ts
// button/button.tokens.ts
export const BUTTON_SIZE_MAP = {
  xs: { fs: "var(--label--xs)", padding: "var(--space-in--2xs)", height: "var(--size-05)" },
  sm: { fs: "var(--label--sm)", padding: "var(--space-in--xs)",  height: "var(--size-06)" },
  md: { fs: "var(--label--md)", padding: "var(--space-in--sm)",  height: "var(--size-07)" },
  lg: { fs: "var(--label--lg)", padding: "var(--space-in--md)",  height: "var(--size-08)" },
  xl: { fs: "var(--label--xl)", padding: "var(--space-in--lg)",  height: "var(--size-09)" },
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZE_MAP;

export function resolveButtonSize(size: ButtonSize): string[] {
  const { fs, padding, height } = BUTTON_SIZE_MAP[size];
  return [
    `--button--fs: ${fs}`,
    `--button--padding: ${padding}`,
    `--button--height: ${height}`,
  ];
}
```

```ts
// button/button.hook.ts
export function useButton(props: ButtonProps) {
  const {
    size    = BUTTON_DEFAULTS.size,
    type    = BUTTON_DEFAULTS.type,
    iconOnly  = BUTTON_DEFAULTS.iconOnly,
    fullWidth = BUTTON_DEFAULTS.fullWidth,
    href, target, rel,
    ...controlProps
  } = props;

  // size: modifier class emitted via resolveTokens (null values = class only)
  // color + variant + radius: handled by useControl
  const { controlClass, controlStyle, controlAttrs, disabled, loading, rest }
    = useControl({ ...controlProps });

  // size channels: component-scoped, written directly
  const sizeStyle = resolveButtonSize(size);

  return {
    Tag: Boolean(href) ? "a" : "button",
    props: {
      class: composeClass(
        controlClass,
        "button",
        `button--${size}`,          // modifier class for CSS hook if needed
        iconOnly  && "button--icon-only",
        fullWidth && "button--full-width",
      ),
      style: composeStyle(controlStyle, ...sizeStyle),
      ...controlAttrs, ...rest,
      // ... aria, href, etc.
    },
  };
}
```

```css
/* button.css — reads its own three size channels, no branching */
.button,
[data-visual="button"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size:      var(--button--fs);
  padding-block:  var(--button--padding);
  padding-inline: calc(var(--button--padding) * 2.5);
  min-height:     var(--button--height);
  gap:            calc(var(--button--padding) * 0.75);
  border-radius:  var(--control--radius);  /* still category-scoped */
  white-space: nowrap;
  cursor: pointer;
  text-decoration: none;
  transition:
    background-color var(--transition--fast),
    border-color     var(--transition--fast),
    box-shadow       var(--transition--base),
    transform        var(--transition--fast);
}

.button--icon-only {
  padding-inline: var(--button--padding);
  aspect-ratio: 1;
}

.button--full-width {
  width: 100%;
}
```

The split is clean:

```
useControl writes:   --control--radius         (category, shared across button/chip/checkbox)
                     --control--color-*        (category, variant rules read these)
                     .control--solid           (category modifier)
                     .control--primary         (category modifier)

useButton writes:    --button--fs              (component, only button.css reads)
                     --button--padding         (component, only button.css reads)
                     --button--height          (component, only button.css reads)
                     .button--sm               (component modifier)
```

Each component that has `size` gets its own `SIZE_MAP` and `resolveSizeChannels` helper in its `tokens.ts`. Chip's sm is a different set of values from Button's sm — that's the point. The values are component decisions, not category decisions.