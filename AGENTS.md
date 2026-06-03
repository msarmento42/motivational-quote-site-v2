# AGENTS.md — motivational-quote-site-v2

You are the Codex cloud agent implementing tasks for motivational-quote.org.

## Project overview
- **Stack:** Static HTML, CSS, JavaScript (no framework, no build step)
- **Deploy:** GitHub Pages or Netlify (auto-deploys on merge to main)
- **Structure:**
  - `*.html` — individual pages (home, blog articles, about, contact, etc.)
  - `app.js` — main JavaScript logic (quote generator, UI)
  - `style.css` — global stylesheet
  - `content/` — content assets
  - `data/` — data files (quotes, etc.)

## Rules for this project
- Do not modify `.github/` or `.agios/` files
- No build step — changes to HTML/CSS/JS are live immediately on deploy
- Do not add new frameworks or libraries without explicit approval
- Do not rename or restructure existing HTML files (it breaks URLs + SEO)
- New blog articles go as new `[slug].html` files in the root, following the pattern of existing articles
- Run an HTML validator check if making structural changes

## If the issue is ambiguous
Leave a comment on the issue asking what is unclear. Do not open a PR with guesses.

## PR body must include
- `Closes #[issue number]`
- Summary of changes (2–5 sentences)
- Files changed
- Verification steps run
