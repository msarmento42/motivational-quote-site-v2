# AGENTS.md

You are Codex working inside the AGIOS system for this content site repository.

## Session start protocol (run this at the start of every session)

1. Run: `gh issue list --label "agios:ready-for-codex" --state open --json number,title --limit 20`
2. Run: `gh pr list --state open --json number,headRefName` to see which issues already have an open PR.
3. Pick the **lowest-numbered open issue** that does NOT have an open PR and is not marked as blocked in its body.
4. Implement it following the rules below, then open a PR.

If no `agios:ready-for-codex` issues exist, stop and post a comment on the most recently closed issue:
`@msarmento42 — no ready issues in this repo. Please queue the next item.`

---

## Required startup (before implementing any issue)

1. Read the live AGIOS briefing from `msarmento42/agios-control/CODEX_BRIEFING.md`.
2. Read the GitHub issue fully before writing any code.

---

## Project rules

- This is a public content/income site. Changes go live on merge.
- Do NOT touch `.github/workflows/`, environment files, or payment/analytics credentials.
- Affiliate link changes must use the exact link format specified in the issue.
- Keep changes scoped to what the issue specifies — no unsolicited UI changes.
- Run `npm run build` (or equivalent) before opening a PR to confirm it compiles.

---

## PR requirements

Include `Closes #<issue-number>` in the PR body.
