# Fix tokens.ts plugin import

Fixed a broken import path in `src/design/.config/plugins/tokens.ts` where it was incorrectly referencing `../src/design/shared/primitives.definitions` instead of `../../shared/primitives.definitions`.

## Proposed Changes

### Configuration
- Fixed import path in `tokens.ts`

#### [MODIFY] [tokens.ts](file:///home/jk/Code/dezign8/src/design/.config/plugins/tokens.ts)
