#!/usr/bin/env python3
"""Fail closed when the pruned production URL tree diverges from its manifest."""

from __future__ import annotations

import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
SITE = "https://motivational-quote.org"
MANIFEST = json.loads((ROOT / "data/url-decisions.json").read_text())
ROWS = MANIFEST["public_url_inventory"]


def fail(message: str) -> None:
    print(f"ERROR: {message}", file=sys.stderr)
    raise SystemExit(1)


def normalize(page: Path, raw_url: str) -> Path | None:
    split = urlsplit(raw_url)
    if split.scheme and split.scheme not in ("http", "https"):
        return None
    if split.netloc and split.netloc != "motivational-quote.org":
        return None
    raw = unquote(split.path)
    if not raw:
        return page
    if raw.startswith("/"):
        candidate = ROOT / raw.lstrip("/")
    else:
        candidate = page.parent / raw
    if raw.endswith("/"):
        candidate /= "index.html"
    elif not candidate.suffix:
        html_candidate = candidate.with_suffix(".html")
        candidate = html_candidate if html_candidate.exists() else candidate / "index.html"
    try:
        candidate.resolve().relative_to(ROOT.resolve())
    except ValueError:
        fail(f"{page.relative_to(ROOT)} links outside repository: {raw_url}")
    return candidate.resolve()


def expected_canonical(path: str) -> str:
    if path == "index.html":
        return SITE + "/"
    if path == "blog/index.html":
        return SITE + "/blog/"
    return SITE + "/" + path


def main() -> None:
    counts = {name: sum(r["public_url_disposition"] == name for r in ROWS) for name in ("keep", "rewrite", "remove", "consolidate-to")}
    expected_counts = {"keep": 16, "rewrite": 15, "remove": 258, "consolidate-to": 1}
    if counts != expected_counts:
        fail(f"manifest counts changed: {counts}")

    retained = {r["path"] for r in ROWS if r["public_url_disposition"] in ("keep", "rewrite")}
    removed = {r["path"] for r in ROWS if r["public_url_disposition"] == "remove"}
    consolidated = {r["path"]: r["consolidate_to"].lstrip("/") for r in ROWS if r["public_url_disposition"] == "consolidate-to"}
    if len(retained) != 31:
        fail(f"expected 31 retained indexable URLs, got {len(retained)}")
    missing = sorted(path for path in retained if not (ROOT / path).is_file())
    lingering = sorted(path for path in removed | set(consolidated) if (ROOT / path).exists())
    if missing:
        fail(f"retained files missing: {missing}")
    if lingering:
        fail(f"removed/consolidated files still present: {lingering}")
    for protected in ("editorial-standards.html", "quote-sources.html", "subscribe.html", "templates/post.html", "replit_snapshot/2026-01-29/client/index.html"):
        if not (ROOT / protected).is_file():
            fail(f"protected file missing: {protected}")

    public_html = {p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*.html") if not p.relative_to(ROOT).as_posix().startswith(("replit_snapshot/", "templates/"))}
    expected_public = retained | {"404.html"}
    if public_html != expected_public:
        fail(f"public HTML inventory mismatch; unexpected={sorted(public_html - expected_public)}, missing={sorted(expected_public - public_html)}")

    for relative in sorted(expected_public):
        page = ROOT / relative
        text = page.read_text()
        if relative in retained:
            canonicals = []
            for tag in re.findall(r"<link\b[^>]*>", text, re.I):
                rel = re.search(r"\brel=[\"']([^\"']+)", tag, re.I)
                href = re.search(r"\bhref=[\"']([^\"']+)", tag, re.I)
                if rel and href and "canonical" in rel.group(1).lower().split():
                    canonicals.append(href.group(1))
            if canonicals != [expected_canonical(relative)]:
                fail(f"{relative} canonical mismatch: {canonicals}")
        for raw in re.findall(r'(?:href|src)=["\']([^"\']+)', text, re.I):
            # Legacy 404 shell asks the host for its conventional favicon; the
            # manifest contract does not authorize changing that non-indexable page.
            if relative == "404.html" and urlsplit(raw).path == "/favicon.ico":
                continue
            target = normalize(page, raw)
            if target is not None and not target.exists():
                fail(f"broken internal reference in {relative}: {raw}")
            if target is not None:
                try:
                    target_relative = target.relative_to(ROOT.resolve()).as_posix()
                except ValueError:
                    continue
                if target_relative in removed or target_relative in consolidated:
                    fail(f"{relative} still links to retired URL {target_relative}")

    destination = ROOT / "overcoming-procrastination.html"
    merged = destination.read_text()
    for evidence in ("consolidated-from-blog-overcoming-procrastination", "The Real Reason You Procrastinate", "Implementation Intentions", "Self-Compassion: The Missing Element"):
        if evidence not in merged:
            fail(f"consolidated procrastination article lacks: {evidence}")

    config = json.loads((ROOT / "vercel.json").read_text())
    redirects = config.get("redirects", [])
    expected_redirect = {"source": "/blog/overcoming-procrastination.html", "destination": "/overcoming-procrastination.html", "permanent": True}
    if redirects != [expected_redirect]:
        fail(f"redirect policy must contain only the approved duplicate: {redirects}")

    tree = ET.parse(ROOT / "sitemap.xml")
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locations = [node.text for node in tree.findall("sm:url/sm:loc", namespace)]
    expected_locations = sorted(expected_canonical(path) for path in retained)
    if locations != expected_locations:
        fail(f"sitemap mismatch: expected {len(expected_locations)} retained URLs, got {len(locations)}")
    if len(locations) != len(set(locations)):
        fail("sitemap contains duplicate URLs")

    print("Verified production URL tree: 31 retained/indexable URLs, 258 removals, 1 exact redirect, recursive links/canonicals/sitemap valid.")


if __name__ == "__main__":
    main()
