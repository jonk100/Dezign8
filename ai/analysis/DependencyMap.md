# Dependency Map Analysis

This document outlines the dependency structure within the `dezign8` application's `src/design` directory.

## Most Depended Upon Components
These are the files that are most frequently imported by other components across the system. 

- **`~/shared/tokens`**: 45 dependents
- **`~/shared/base.hook`**: 45 dependents
- **`~/shared/primitives.tokens`**: 14 dependents
- **`~/shared/base.props`**: 10 dependents
- **`~/shared/icons`**: 10 dependents
- **`../../surface.tokens`**: 9 dependents
- **`../../surface.props`**: 7 dependents
- **`../../typography.tokens`**: 7 dependents
- **`../../typography.props`**: 7 dependents
- **`../../typography.hook`**: 7 dependents

## Leaf Components
These components or files have no dependencies of their own. They represent the "ends" of the dependency tree.

*(Showing a sample of leaf components. Many components are currently stubbed out without logic.)*

- `/assets/components/avatar/avatar.tokens.ts`
- `/assets/components/icon/icon.tokens.ts`
- `/assets/components/logo/logo.tokens.ts`
- `/data/components/accordion/accordion.tokens.ts`
- `/data/components/badge/badge.tokens.ts`
- `/data/components/card/card.tokens.ts`
- `/data/components/table/table.tokens.ts`
- `/feedback/components/alert/alert.tokens.ts`
- `/feedback/components/progress/progress.tokens.ts`
- `/forms/components/input/input.tokens.ts`
- `/layout/components/box/box.tokens.ts`
- `/nav/components/link/link.tokens.ts`
- `/surfaces/components/paper/paper.tokens.ts`
- `/typography/components/text/text.tokens.ts`
- *(And many more uninitialized or token-only files)*

## Potential Architectural Bottlenecks
Files with a very high "in-degree" (number of components depending on them) can become bottlenecks. Changes to these files risk cascading effects across the entire application.

- **`~/shared/tokens`**: 45 incoming dependencies
- **`~/shared/base.hook`**: 45 incoming dependencies
- **`~/shared/primitives.tokens`**: 14 incoming dependencies
- **`~/shared/base.props`**: 10 incoming dependencies
- **`~/shared/icons`**: 10 incoming dependencies

> [!WARNING]
> Any changes to `~/shared/tokens` or `~/shared/base.hook` will likely require extensive regression testing, as they are imported by nearly every active component in the system.
