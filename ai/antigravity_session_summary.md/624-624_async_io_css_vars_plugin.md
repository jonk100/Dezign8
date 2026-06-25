# Async I/O Refactor for check-css-vars Plugin

## Key Decisions
- Refactored `plugins/check-css-vars.ts` to use asynchronous filesystem operations (`fs.promises`).
- Replaced synchronous `readdirSync` and `readFileSync` with their asynchronous counterparts to prevent blocking the Vite dev server's event loop during hot module replacement (HMR).
- Used `Promise.all` to concurrently walk directories and read CSS files.
- Investigated and dismissed static analysis warnings regarding synchronous I/O in `plugins/tokens.ts` as false positives, given the microscopic and bounded nature of the token import tree.
- Investigated static analysis warnings regarding untested code and DRY violations in `src/design/typography/typography.tokens.ts`, concluding they were false positives stemming from the highly structured nature of the design token architecture.

## Modified Files
- `plugins/check-css-vars.ts`
