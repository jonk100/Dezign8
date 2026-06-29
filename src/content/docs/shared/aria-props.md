---
title: ARIA Props
description: Global accessibility properties available on all components to build semantically rich UI.
category: Core
status: stable
---

# ARIA Props (`AriaProps`)

Accessibility is a core priority of the design system. Every component inherits standard ARIA properties through [aria.props.ts](file:///home/jk/Code/dezign8/src/design/shared/aria.props.ts) extending `BaseComponentProps`.

These attributes flow directly to the root element when using `useBaseCompose`, allowing consumers to override or add semantic meaning for assistive technologies (AT).

## Labelling & Description

These props allow you to set accessible names, descriptions, or roles for elements.

| Property | Type | Description |
|---|---|---|
| `aria-label` | `string` | Defines a string value that labels the current element. Use when no visual label text is present. |
| `aria-labelledby` | `string` | Identifies the element (or elements) that labels the current element. Space-separated ID references. |
| `aria-describedby` | `string` | Identifies the element (or elements) that describes the current element. Space-separated ID references. |
| `aria-description` | `string` | Defines a string value that describes the current element (newer AT support). |
| `aria-details` | `string` | Identifies the element that provides detailed information about this element. Single ID reference. |
| `aria-roledescription` | `string` | Defines a human-readable, author-localized description for the role of an element. |

## Relationships & State

Manage connections between control elements and target containers, or visibility states.

| Property | Type | Description |
|---|---|---|
| `aria-keyshortcuts` | `string` | Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. |
| `aria-hidden` | `boolean \| "false" \| "true"` | Indicates whether the element is exposed to an accessibility API (hidden from screen readers). |
| `aria-current` | `boolean \| "false" \| "true" \| "page" \| "step" \| "location" \| "date" \| "time"` | Indicates the element that represents the current item within a container or set of related elements. |
| `aria-controls` | `string` | Identifies the element (or elements) whose contents or presence are controlled by the current element. |
| `aria-owns` | `string` | Identifies the element (or elements) that are children of the current element in the accessibility tree. |
| `aria-flowto` | `string` | Identifies the next element (or elements) in an alternate reading order of content. |

## Live Regions

Inform assistive technologies when parts of the page update dynamically.

| Property | Type | Description |
|---|---|---|
| `aria-live` | `"off" \| "polite" \| "assertive"` | Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect. |
| `aria-atomic` | `boolean \| "false" \| "true"` | Indicates whether assistive technologies will announce the entire changed region or only the modified part. |
| `aria-relevant` | `string` | Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified. |

## Automatic Aria Handling in `useBaseCompose`

In addition to passing consumer-defined ARIA props, `useBaseCompose` automatically manages some ARIA attributes dynamically based on component state:

* **Loading State:** When `loading={true}` is set, the hook automatically emits `aria-busy="true"` alongside `data-loading="true"`.
* **Disabled State:** When `disabled={true}` is set, the hook automatically emits `aria-disabled="true"` alongside `data-disabled=""`.
