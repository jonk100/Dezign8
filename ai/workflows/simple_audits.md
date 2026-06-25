Could you methodically, at the pace that's required, analyze the entire design system and identify:

- duplicate component logic
- shared prop patterns
- opportunities for common type definitions
- inconsistent variant naming
- inconsistent size naming
- design token violations
- accessibility issues

Then organize those findings grouped by severity and put them in a markdown document with the header ## Section 1 - Consistency Audit?  

Then, can you list recommended courses of action on the codebase moving forward:
  1. Immediate fixes (< 1 hour)
  2. Short-term improvements (< 1 day)
  3. Medium-term refactors (< 1 week)
  4. Long-term architectural improvements

And rank each by impact and risk? Put these under ## Section 2 - Scoped Roadmap


then can you:
## section 3: accessibility
Review every component for:
- missing labels
- keyboard navigation issues
- aria opportunities
- heading hierarchy problems

then:
## 4. CSS Review
Find:
- duplicated selectors
- repeated declarations
- utility classes that should be tokens
- styles that could be moved into shared utilities
