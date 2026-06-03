# CLAUDE.md — motivational-quote-site-v2 (project-specific)

Extends global AGIOS CLAUDE.md in agios-control. Read that first.

## Project context
- **URL:** motivational-quote.org
- **Type:** Content/quote site (income site — ads)
- **Stack:** Static HTML, CSS, JavaScript (no framework)
- **Deploy:** GitHub Pages or Netlify (check deployment settings)

## What this site does
Motivational quotes, articles, and daily inspiration content.
Revenue: display ads (Google AdSense or similar).

## Key files
- `index.html` — homepage with quote generator
- `app.js` — quote generator logic and UI interactions
- `style.css` — global styles
- `blog.html` — blog listing page
- `ads.txt` — ads.txt for ad network verification (do not modify)
- `data/` — quote data files

## Success metrics to track
- Organic sessions per week
- Pages per session
- Ad revenue per 1,000 sessions (RPM)
- Total article count

## What Claude should prioritize for this project
1. New motivational/self-improvement article pages
2. SEO improvements (meta tags, structured data)
3. Internal linking between related articles
4. Site performance (image optimization, page speed)

## Notes
- No build step — this is raw HTML/CSS/JS
- Do NOT add npm, webpack, React, or any build toolchain
- Existing article URLs must never change (SEO equity)
- ads.txt is sacred — never modify it
