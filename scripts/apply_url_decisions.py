#!/usr/bin/env python3
"""Apply the reviewed URL manifest to the production static site.

This intentionally does not redirect removed pages. The only redirect is the
same-topic root/blog duplicate explicitly approved by the manifest.
"""

from __future__ import annotations

import html
import json
import re
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "data/url-decisions.json"
SITE = "https://motivational-quote.org"
MERGE_MARKER = "<!-- consolidated-from-blog-overcoming-procrastination -->"


def public_path(relative: str) -> str:
    """Return the public clean URL for a repository HTML path."""
    if relative == "index.html":
        return "/"
    if relative in ("blog/index.html", "blog.html"):
        return "/blog/"
    return "/" + relative.removesuffix(".html")


def public_url(relative: str) -> str:
    return SITE + public_path(relative)


def records() -> list[dict]:
    data = json.loads(MANIFEST.read_text())
    rows = data["public_url_inventory"]
    counts = {name: sum(r["public_url_disposition"] == name for r in rows) for name in ("keep", "rewrite", "remove", "consolidate-to")}
    assert counts == {"keep": 16, "rewrite": 15, "remove": 258, "consolidate-to": 1}, counts
    return rows


def title(path: Path) -> str:
    text = path.read_text()
    match = re.search(r"<h1[^>]*>(.*?)</h1>", text, re.I | re.S) or re.search(r"<title[^>]*>(.*?)</title>", text, re.I | re.S)
    return html.unescape(re.sub(r"<[^>]+>", "", match.group(1))).strip() if match else path.stem.replace("-", " ").title()


def merge_duplicate() -> None:
    destination = ROOT / "overcoming-procrastination.html"
    source = ROOT / "blog/overcoming-procrastination.html"
    current = destination.read_text()
    if MERGE_MARKER in current:
        return
    assert source.exists(), "Duplicate source is required for first deterministic application"
    source_text = source.read_text()
    start = source_text.index("<h2>The Real Reason You Procrastinate</h2>")
    end = source_text.index('<div class="beehiiv-cta-section">', start)
    unique = source_text[start:end].strip()
    insertion = f"\n      {MERGE_MARKER}\n      {unique}\n\n      "
    anchor = "<h2>Practical Advice</h2>"
    assert anchor in current
    destination.write_text(current.replace(anchor, insertion + anchor, 1))


def local_target(page: Path, href: str) -> str | None:
    if not href or href.startswith(("#", "mailto:", "tel:", "javascript:", "data:")):
        return None
    split = urlsplit(href)
    if split.netloc and split.netloc != "motivational-quote.org":
        return None
    raw = split.path
    if not raw:
        return None
    if raw.startswith("/"):
        relative = raw.lstrip("/")
    else:
        relative = (page.parent.relative_to(ROOT) / raw).as_posix()
    parts: list[str] = []
    for part in relative.split("/"):
        if part in ("", "."):
            continue
        if part == "..":
            if parts:
                parts.pop()
        else:
            parts.append(part)
    normalized = "/".join(parts)
    if not normalized:
        return "index.html"
    if normalized.endswith("/"):
        return normalized + "index.html"
    if "." not in Path(normalized).name:
        return normalized + ".html"
    return normalized


def clean_links(page: Path, removed: set[str], redirects: dict[str, str]) -> None:
    text = page.read_text()

    def replace(match: re.Match) -> str:
        before, quote, href, after, body = match.groups()
        target = local_target(page, href)
        if target in redirects:
            destination = redirects[target]
            prefix = "../" if page.parent != ROOT else ""
            return f"<a{before}href={quote}{prefix}{destination}{quote}{after}>{body}</a>"
        if target in removed:
            return body
        return match.group(0)

    text = re.sub(r"<a([^>]*?)href=([\"'])(.*?)\2([^>]*)>(.*?)</a>", replace, text, flags=re.I | re.S)
    page.write_text(text)


def ensure_canonical(page: Path) -> None:
    relative = page.relative_to(ROOT).as_posix()
    canonical = public_url(relative)
    text = page.read_text()
    tag = f'<link rel="canonical" href="{canonical}" />'
    existing = re.compile(r'<link\b(?=[^>]*\brel=["\']canonical["\'])[^>]*>', re.I)
    if existing.search(text):
        text = existing.sub(tag, text, count=1)
    else:
        assert "</head>" in text
        text = text.replace("</head>", f"  {tag}\n</head>", 1)
    page.write_text(text)


def collection_page(path: str, heading: str, description: str, articles: list[Path]) -> None:
    canonical = public_path(path)
    depth = "../" if "/" in path else ""
    items = "\n".join(f'        <li><a href="{public_path(p.relative_to(ROOT).as_posix())}">{html.escape(title(p))}</a></li>' for p in articles)
    schema_items = [{"@type": "Article", "headline": title(p), "url": public_url(p.relative_to(ROOT).as_posix())} for p in articles]
    schema = json.dumps({"@context": "https://schema.org", "@type": "CollectionPage", "name": heading, "url": SITE + canonical, "mainEntity": schema_items}, ensure_ascii=False)
    content = f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{html.escape(heading)} | Motivational-Quote.org</title>
  <meta name="description" content="{html.escape(description, quote=True)}" />
  <meta name="robots" content="index,follow" />
  <link rel="canonical" href="{SITE}{canonical}" />
  <link rel="stylesheet" href="{depth}style.css" />
  <script type="application/ld+json">{schema}</script>
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6175161566333696" crossorigin="anonymous"></script>
</head>
<body>
  <header><nav class="navbar"><a href="/" class="brand">Motivational Quotes</a><ul class="nav-links"><li><a href="/">Home</a></li><li><a href="/blog/">Blog</a></li><li><a href="/about">About</a></li><li><a href="/editorial-standards">Editorial Standards</a></li></ul></nav></header>
  <main><section class="content topic-hub"><h1>{html.escape(heading)}</h1><p>{html.escape(description)}</p><ul class="post-list topic-list">
{items}
      </ul></section></main>
  <footer><p>&copy; <span id="year"></span> Motivational Quotes. All rights reserved.</p></footer>
  <script>document.getElementById('year').textContent = new Date().getFullYear();</script>
  <script src="{depth}analytics.js"></script>
</body>
</html>
'''
    (ROOT / path).write_text(content)


def write_collections(salvage: list[Path]) -> None:
    groups = {
        "category-productivity-focus.html": ["atomic-habits", "decision-fatigue", "deep-work", "morning-routine", "planning-fallacy", "procrastination"],
        "category-mindset-resilience.html": ["cognitive-dissonance", "overthinking", "learned-optimism", "resilience", "negativity-bias", "stoic"],
        "category-wellbeing-mindfulness.html": ["gratitude"],
        "category-purpose-growth.html": ["ikigai", "new-job"],
    }
    descriptions = {
        "category-productivity-focus.html": ("Productivity and Focus", "Practical guides for habits, focused work, planning, and overcoming procrastination."),
        "category-mindset-resilience.html": ("Mindset and Resilience", "Evidence-aware guides for clearer thinking, optimism, resilience, and emotional steadiness."),
        "category-wellbeing-mindfulness.html": ("Wellbeing and Mindfulness", "Practical ways to build gratitude and make space for everyday wellbeing."),
        "category-purpose-growth.html": ("Purpose and Personal Growth", "Thoughtful guides for purpose, transitions, and sustainable personal growth."),
    }
    assigned: dict[str, list[Path]] = {key: [] for key in groups}
    for article in salvage:
        slug = article.stem
        matches = [key for key, needles in groups.items() if any(needle in slug for needle in needles)]
        assert len(matches) == 1, (article, matches)
        assigned[matches[0]].append(article)
    for path, articles in assigned.items():
        heading, description = descriptions[path]
        collection_page(path, heading, description, sorted(articles))
    collection_page("blog/index.html", "Motivation and Personal Growth Articles", "Browse the focused editorial library on habits, resilience, purposeful work, and wellbeing.", sorted(salvage))
    collection_page("blog.html", "Motivation and Personal Growth Blog", "A focused collection of practical guides selected for usefulness, clarity, and distinct search intent.", sorted(salvage))


def rewrite_home(salvage: list[Path]) -> None:
    page = ROOT / "index.html"
    text = page.read_text()
    text = re.sub(
        r'The <a href="blog/">full motivation blog</a> includes more than 200 additional guides,\s*organized around habits, focus, resilience, confidence, stress, and long-term growth\.',
        'The <a href="blog/">focused motivation blog</a> collects our strongest practical guides on habits, focus, resilience, wellbeing, and purposeful growth.',
        text,
    )
    links = "\n".join(f'      <li><a href="{public_path(p.relative_to(ROOT).as_posix())}">{html.escape(title(p))}</a></li>' for p in sorted(salvage))
    section = f'''  <section class="content">
    <h2>Browse the Focused Editorial Library</h2>
    <p>Start with one of these retained guides, or browse by <a href="/category-productivity-focus">productivity</a>, <a href="/category-mindset-resilience">mindset and resilience</a>, <a href="/category-wellbeing-mindfulness">wellbeing</a>, or <a href="/category-purpose-growth">purpose and growth</a>.</p>
    <ul class="post-list">
{links}
    </ul>
    <p>Browse the <a href="blog/">complete focused library</a> for all retained guides.</p>
  </section>'''
    pattern = re.compile(r'  <section class="content">\s*<h2>Browse by Topic</h2>.*?</section>', re.S)
    assert pattern.search(text), "Home topic section not found"
    page.write_text(pattern.sub(section, text, count=1))


def write_sitemap(retained: list[str]) -> None:
    locations = []
    for path in retained:
        locations.append(public_url(path))
    urls = [f"  <url><loc>{location}</loc></url>" for location in sorted(locations)]
    (ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "\n".join(urls) + "\n</urlset>\n")


def write_vercel() -> None:
    config = {"cleanUrls": True, "redirects": [{"source": "/blog/overcoming-procrastination", "destination": "/overcoming-procrastination", "permanent": True}], "rewrites": [{"source": "/editorial-policy", "destination": "/editorial-standards"}]}
    (ROOT / "vercel.json").write_text(json.dumps(config, indent=2) + "\n")


def main() -> None:
    rows = records()
    by_disposition = {name: [r for r in rows if r["public_url_disposition"] == name] for name in ("keep", "rewrite", "remove", "consolidate-to")}
    merge_duplicate()
    removed = {r["path"] for r in by_disposition["remove"]}
    redirects = {r["path"]: r["consolidate_to"].lstrip("/") for r in by_disposition["consolidate-to"]}
    retained = sorted(r["path"] for r in by_disposition["keep"] + by_disposition["rewrite"])
    salvage = [ROOT / r["path"] for r in by_disposition["rewrite"]]
    write_collections(salvage)
    rewrite_home(salvage)
    for path in [ROOT / p for p in retained]:
        ensure_canonical(path)
    for path in [ROOT / p for p in retained] + [ROOT / "404.html"]:
        clean_links(path, removed, redirects)
    for path in sorted(removed | set(redirects)):
        candidate = ROOT / path
        if candidate.exists():
            candidate.unlink()
    write_sitemap(retained)
    write_vercel()
    print(f"Applied manifest: deleted {len(removed)} removed pages and {len(redirects)} consolidated duplicate; retained {len(retained)} indexable pages.")


if __name__ == "__main__":
    main()
