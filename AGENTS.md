# AGENTS.md

This repo is managed by AGIOS. Any implementation agent, including Codex,
Claude Code, Kimi Code, Gemini CLI, Copilot, or a free builder, must follow the
same GitHub issue contract and control-plane policy.

## Operating Model

Before acting:

1. Fetch and read `msarmento42/agios-control/CODEX_BRIEFING.md`.
2. Read the relevant GitHub issue and verify the AGIOS issue contract.
3. If you need durable cross-provider context, read `msarmento42/vault/AGENTS.md`
   and `msarmento42/vault/projects/subscription-first-ai-os.md`.
4. Implement only within the issue's `Allowed paths`.
5. Open a PR with `Closes #<issue-number>`, verification, and handoff notes.

`agios:ready-for-codex` is the compatibility label for the free-builder
implementation queue. `agios:escalate-codex` is the premium rescue lane.

## Never Do

- Push directly to `master`.
- Implement malformed or ambiguous issues.
- Touch `.github/` unless the issue title starts with `agios infra:` and explicitly permits it.
- Touch `.agios/` unless explicitly permitted.
- Touch `*.env*`.
- Change generated lockfiles unless explicitly permitted.
- Add work outside the issue's `Allowed paths`.

## Repo-Specific Rules

- Public income/content site; changes go live on merge.
- Static quote/content site; avoid changing SEO-critical files unless explicitly scoped.
- Keep changes tightly scoped.
- Build verification is required before PR when feasible.

## Enforcement

- Scope check validates PR body and changed files against the linked issue.
- Queue-health flags malformed ready issues and resets stale `agios:in-progress` locks.
- Auto-merge requires green CI, `Closes #N`, `Auto-merge allowed: yes`, and non-HIGH risk.
