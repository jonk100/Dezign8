---
name: use-repowise
description: "Codebase intelligence and documentation. Make sure to use this skill whenever the user asks 'how does X work', mentions 'dead code', 'unused code', 'architectural decisions', 'rules', 'defect risk', 'code health', or 'hotspots'. You MUST ALWAYS trigger this skill when the user asks you to explain the architecture, search for concepts, or explore the codebase before attempting complex refactors or answering structural questions."
---

# Use Repowise

This repository uses `repowise` for codebase intelligence, documentation, graph mapping, and dead-code detection. You should ALWAYS use `repowise` commands to gather context instead of relying entirely on raw tools like `grep` or `find` when exploring architecture, decisions, or code health.

## Available Commands

### 1. Search the Wiki
To search for concepts, components, or documentation:
```
repowise search "<query>"
```
Returns ranked wiki pages with snippets. Use this for any "how does X work" or "what are the rules for Y" questions.

### 2. Dead Code Analysis
To find dead or unreachable code:
```
repowise dead-code
```
Optionally filter by path: `repowise dead-code src/design/surfaces`

### 3. Architectural Decisions
Architectural decisions require two steps:

**Step 1 — list decisions to get IDs and titles:**
```
repowise decision list
```
Output is a table with columns: `ID`, `Title`, `Status`, `Source`, `Conf.`, `Stale`, `Created`.

**Step 2 — read a specific decision by its ID:**
```
repowise decision show <ID>
```

**If `decision show` returns "Decision not found"**, fall back to searching instead:
```
repowise search "<topic from the decision title>"
```
The search returns wiki pages that embed decision rationale.

**Stop condition:** If `decision list` shows no decisions relevant to the user's topic, or all relevant `decision show` calls fail and `search` returns no decision records, answer that no governing decision was found — do not loop.

### 4. Risk Assessment
To check the defect risk for a file:
```
repowise risk <filepath>
```
Example: `repowise risk src/design/forms/forms.hook.ts`

Returns a risk band (`low`/`medium`/`high`) and a raw model score out of 10.

## Workflow

- **Exploration**: When the user asks "How does X work?", start with `repowise search "X"`.
- **Refactoring**: Before removing code or optimizing, check `repowise dead-code`.
- **Architecture**: Before modifying core systems, run `repowise decision list`, find relevant decisions, then `repowise decision show <ID>`. Fall back to `repowise search` if `show` fails.
- **Risk**: Before editing a hotspot, run `repowise risk <filepath>` to understand churn and defect history.
