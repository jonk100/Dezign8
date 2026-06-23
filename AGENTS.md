# Global Agent Instructions

These instructions must be followed by all AI agents operating in this repository.

## "Update the decision log"
When the user asks to "update the decision log", you must perform the following actions:
1. **Determine the exact date range** of the current conversation/session by examining the timestamps of the user's initial requests and your most recent edits (e.g. `2026/06/20 to 2026/06/21`).
2. **Determine a brief descriptive title** for the session (e.g. `layout_feedback_components`).
3. **Create a session summary file**: Write a detailed markdown summary of all key decisions, architectural changes, and new/modified files from the session. Place this file in `ai/antigravity_session_summary.md/` with the format `[start_date_without_year]-[end_date_without_year]_[title].md` (e.g., `620-621_layout_feedback_components.md`).
4. **Update the main decision log**: Prepend a new section to the top of `ai/agent_decision_log.md` (right under the dashed lines of the header). This section must contain:
    - The date range and agent name: `## YYYY/MM/DD to YYYY/MM/DD - Antigravity session`
    - A markdown link pointing to the newly created session summary file.
    - A `### New files` block containing a list of all newly created files.
    - A `### Updated files` block containing a list of all modified files.

Always ensure the dates accurately reflect the timeline of the actual code changes and decisions, not just the timestamp of the prompt asking to create the log.
