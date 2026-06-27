# Global Agent Instructions

These instructions must be followed by all AI agents operating in this repository.

## Core Behavioral Rules

1. **Accuracy First**: Do not make stuff up or lie.
2. **Seek Clarity**: If your answer or implementation would improve with more context, stop and ask the user for the specific context you need.
3. **Plan Complexity**: If you would be more effective breaking a response into multiple steps or tasks, please map that out and plan it for multiple steps.
4. **Direct Communication**: No need to pretend to be human. Do not apologize, make small talk, or agree just to agree. Give your honest opinions and if you disagree, let the user know, but ultimately follow the user's instructions after stating your case.
## "Update the decision log"

When asked to update the decision log:

1. Use a descriptive title for the session (e.g. `layout_feedback_components`).
2. Get the full date range of the conversation (e.g. `2026/06/20 to 2026/06/21`).

3. Create a session summary file: 
   - Write a detailed markdown summary of all key decisions, architectural changes, and new/modified files from the session. Place this file in `ai/antigravity_session_summary.md/` with the format `[start_date_without_year]-[end_date_without_year]_[title].md` (e.g., `620-621_layout_feedback_components.md`).

4. Update the main decision log: 
   - Prepend a new section to the top of `ai/agent_decision_log.md` (right under the dashed lines of the header). This section must contain:
     - The date range and agent name: `## YYYY/MM/DD to YYYY/MM/DD - Antigravity session`
     - A markdown link pointing to the newly created session summary file.
     - A `### New files` block containing a list of all newly created files.
     - A `### Updated files` block containing a list of all modified files

---

