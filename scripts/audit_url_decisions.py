#!/usr/bin/env python3
"""Build a deterministic, review-only URL decision manifest for MQ."""

from __future__ import annotations

import hashlib
import json
import re
import sys
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[1]
JSON_OUT = ROOT / "data/url-decisions.json"
MD_OUT = ROOT / "docs/URL_DECISION_AUDIT.md"
BASE = "https://motivational-quote.org"
TRUST_FILES = {
    "about.html", "contact.html", "privacy.html", "terms.html",
    "editorial-policy.html", "editorial-standards.html", "quote-sources.html",
}
UTILITY_FILES = {"index.html", "blog.html", "resources.html", "subscribe.html", "404.html"}
NON_PUBLIC_HTML_PREFIXES = ("templates/", "replit_snapshot/")
NON_CONTENT_PREFIXES = ("category-",)
AFFILIATE_HOST_MARKERS = ("amazon.", "amzn.to", "shareasale", "impact.com", "partnerstack", "clickbank")
PREFERRED_SALVAGE_PATHS = (
    "quotes-for-starting-a-new-job.html",
    "overcoming-procrastination.html",
    "blog/atomic-habits-key-lessons.html",
    "blog/deep-work-strategies.html",
    "blog/how-to-stop-overthinking.html",
    "blog/the-negativity-bias.html",
    "blog/the-planning-fallacy.html",
    "blog/cognitive-dissonance.html",
    "blog/decision-fatigue.html",
    "blog/gratitude-practice.html",
    "blog/resilience-building.html",
    "blog/how-to-build-a-morning-routine.html",
    "blog/learned-optimism.html",
    "blog/lessons-from-stoic-philosophers.html",
    "blog/ikigai-finding-purpose.html",
)
TOPICS = {
    "focus": {"focus", "deep", "attention", "distraction", "concentration"},
    "habits": {"habit", "habits", "routine", "routines", "rituals", "consistency"},
    "growth": {"growth", "mindset", "improvement", "mastery", "progress"},
    "motivation": {"motivation", "motivated", "goals", "purpose", "confidence", "grit"},
    "mindfulness": {"mindful", "mindfulness", "meditation", "gratitude", "journaling"},
    "resilience": {"resilience", "failure", "fear", "uncertainty", "anxiety", "recovery"},
    "learning": {"learning", "reading", "practice", "recall", "expert"},
    "productivity": {"productivity", "productive", "procrastination", "work", "energy"},
}


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.title_depth = 0
        self.paragraph_depth = 0
        self.title_parts: list[str] = []
        self.visible_parts: list[str] = []
        self.paragraph_parts: list[str] = []
        self.paragraphs: list[str] = []
        self.description = ""
        self.canonical = ""
        self.robots = ""
        self.links: list[tuple[str, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = {key.lower(): (value or "") for key, value in attrs}
        if tag in {"script", "style", "noscript", "svg"}:
            self.skip += 1
        if tag == "title":
            self.title_depth += 1
        if tag == "p":
            self.paragraph_depth += 1
            self.paragraph_parts = []
        if tag == "meta":
            name = data.get("name", "").lower()
            if name == "description":
                self.description = clean(data.get("content", ""))
            elif name == "robots":
                self.robots = data.get("content", "").lower()
        if tag == "link" and "canonical" in data.get("rel", "").lower().split():
            self.canonical = data.get("href", "")
        if tag == "a" and data.get("href"):
            self.links.append((data["href"], data.get("rel", "").lower()))

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "noscript", "svg"} and self.skip:
            self.skip -= 1
        if tag == "title" and self.title_depth:
            self.title_depth -= 1
        if tag == "p" and self.paragraph_depth:
            paragraph = clean(" ".join(self.paragraph_parts))
            if len(paragraph.split()) >= 12:
                self.paragraphs.append(paragraph)
            self.paragraph_depth -= 1
            self.paragraph_parts = []

    def handle_data(self, data: str) -> None:
        if self.skip:
            return
        value = clean(data)
        if not value:
            return
        self.visible_parts.append(value)
        if self.title_depth:
            self.title_parts.append(value)
        if self.paragraph_depth:
            self.paragraph_parts.append(value)


def path_to_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return "/"
    if relative == "blog/index.html":
        return "/blog/"
    return "/" + relative


def sitemap_urls() -> set[str]:
    tree = ET.parse(ROOT / "sitemap.xml")
    return {urlparse(node.text or "").path or "/" for node in tree.findall(".//{*}loc")}


def page_record(path: Path, in_sitemap: set[str]) -> tuple[dict, list[str]]:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8", errors="replace"))
    url_path = path_to_url(path)
    internal = 0
    credible = 0
    sponsored = 0
    for href, rel in parser.links:
        absolute = urljoin(BASE + url_path, href)
        host = urlparse(absolute).netloc.lower()
        is_sponsored = "sponsored" in rel.split()
        if is_sponsored:
            sponsored += 1
        if host in {"", "motivational-quote.org", "www.motivational-quote.org"}:
            internal += 1
        elif not is_sponsored and not any(marker in host for marker in AFFILIATE_HOST_MARKERS):
            credible += 1
    visible = clean(" ".join(parser.visible_parts))
    lowered = visible.lower()
    indexable = "noindex" not in parser.robots and path.name != "404.html"
    relative = path.relative_to(ROOT).as_posix()
    kind = "editorial"
    if path.name in TRUST_FILES and path.parent == ROOT:
        kind = "trust"
    elif path.name in UTILITY_FILES or path.name.startswith(NON_CONTENT_PREFIXES) or relative == "blog/index.html":
        kind = "utility"
    record = {
        "path": relative,
        "url": url_path,
        "title": clean(" ".join(parser.title_parts)),
        "description": parser.description,
        "canonical": parser.canonical,
        "indexable": indexable,
        "page_kind": kind,
        "visible_word_count": len(re.findall(r"\b[\w'-]+\b", visible)),
        "internal_link_count": internal,
        "credible_external_source_count": credible,
        "sponsored_link_count": sponsored,
        "page_level_disclosure": any(term in lowered for term in ("affiliate disclosure", "may earn a commission", "affiliate links")),
        "sitemap_presence": url_path in in_sitemap,
        "repeated_paragraph_count": 0,
        "repeated_paragraph_hashes": [],
        "public_url_disposition": None,
        "consolidate_to": None,
        "disposition_basis": "",
        "proposed_requires_editorial_review": kind == "editorial" and indexable,
    }
    return record, parser.paragraphs


def stem(record: dict) -> str:
    return Path(record["path"]).stem


def main() -> int:
    all_html_paths = sorted(p for p in ROOT.rglob("*.html") if ".git" not in p.parts)
    html_paths = [
        path for path in all_html_paths
        if not path.relative_to(ROOT).as_posix().startswith(NON_PUBLIC_HTML_PREFIXES)
    ]
    repository_files = [
        {
            "path": path.relative_to(ROOT).as_posix(),
            "repository_file_disposition": "retain-as-repository-artifact",
            "disposition_basis": "Template or development snapshot; retain as a repository file but exclude from public URL decisions.",
        }
        for path in all_html_paths if path not in html_paths
    ]
    sitemap = sitemap_urls()
    records: list[dict] = []
    page_paragraphs: dict[str, list[str]] = {}
    paragraph_pages: defaultdict[str, set[str]] = defaultdict(set)
    for path in html_paths:
        record, paragraphs = page_record(path, sitemap)
        records.append(record)
        page_paragraphs[record["path"]] = paragraphs
        for paragraph in set(paragraphs):
            paragraph_pages[clean(paragraph).lower()].add(record["path"])

    repeated = {text: pages for text, pages in paragraph_pages.items() if len(pages) > 1}
    for record in records:
        hits = sorted(
            hashlib.sha256(text.encode()).hexdigest()[:12]
            for text in set(clean(p).lower() for p in page_paragraphs[record["path"]])
            if text in repeated
        )
        record["repeated_paragraph_count"] = len(hits)
        record["repeated_paragraph_hashes"] = hits

    editorial = [r for r in records if r["indexable"] and r["page_kind"] == "editorial"]
    editorial_by_path = {record["path"]: record for record in editorial}
    assert len(PREFERRED_SALVAGE_PATHS) == 15
    assert len(set(PREFERRED_SALVAGE_PATHS)) == 15
    missing_preferred = sorted(set(PREFERRED_SALVAGE_PATHS) - set(editorial_by_path))
    assert not missing_preferred, f"Preferred salvage paths must exist and be indexable editorial pages: {missing_preferred}"
    salvage = [editorial_by_path[path] for path in PREFERRED_SALVAGE_PATHS]
    salvage_paths = set(PREFERRED_SALVAGE_PATHS)

    by_stem: defaultdict[str, list[dict]] = defaultdict(list)
    for record in editorial:
        by_stem[stem(record)].append(record)
    duplicate_groups = [sorted((r["path"] for r in group)) for group in by_stem.values() if len(group) > 1]

    for record in records:
        if not record["indexable"]:
            record["disposition_basis"] = "Non-indexable/404 inventory entry; no production action proposed."
        elif record["page_kind"] in {"trust", "utility"}:
            record["public_url_disposition"] = "keep"
            record["disposition_basis"] = "Deterministic trust/utility-page rule."
        elif record["path"] in salvage_paths:
            record["public_url_disposition"] = "rewrite"
            record["disposition_basis"] = "Explicit preferred editorial salvage candidate; rewrite still requires human review."
        else:
            candidates = [r for r in by_stem[stem(record)] if r["path"] in salvage_paths]
            if candidates:
                destination = sorted(candidates, key=lambda r: r["path"])[0]
                record["public_url_disposition"] = "consolidate-to"
                record["consolidate_to"] = destination["url"]
                record["disposition_basis"] = "Same-slug root/blog duplicate proposed to consolidate into the explicitly preferred salvage destination; human review required."
            else:
                record["public_url_disposition"] = "remove"
                record["disposition_basis"] = "Outside capped salvage set; proposed removal requires human review."

    title_prefixes: defaultdict[str, list[str]] = defaultdict(list)
    for record in editorial:
        title = re.sub(r"\s*\|.*$", "", record["title"]).lower()
        prefix = " ".join(re.findall(r"[a-z]+", title)[:2])
        if prefix:
            title_prefixes[prefix].append(record["path"])
    manufactured = [
        {"prefix": prefix, "count": len(paths), "paths": sorted(paths)}
        for prefix, paths in sorted(title_prefixes.items()) if len(paths) >= 3
    ]

    clusters = []
    for topic, keywords in sorted(TOPICS.items()):
        members = []
        for record in editorial:
            tokens = set(re.findall(r"[a-z]+", (record["title"] + " " + stem(record).replace("-", " ")).lower()))
            if tokens & keywords:
                members.append(record["path"])
        if len(members) >= 2:
            clusters.append({"topic": topic, "count": len(members), "paths": sorted(members)})

    decisions = Counter(r["public_url_disposition"] or "not-applicable" for r in records)
    url_map = {r["url"]: r for r in records}
    assert len(records) == len(html_paths) == len({r["path"] for r in records})
    assert len(records) == len({r["url"] for r in records}), "Every public URL must appear exactly once"
    assert len(all_html_paths) == len(records) + len(repository_files)
    assert not {r["path"] for r in records} & {r["path"] for r in repository_files}
    assert {r["path"] for r in repository_files} == {
        "templates/post.html", "replit_snapshot/2026-01-29/client/index.html"
    }
    assert all(r["public_url_disposition"] == "keep" for r in records if r["path"] in {
        "editorial-standards.html", "quote-sources.html", "subscribe.html"
    })
    assert len(salvage) <= 15
    assert all(r["public_url_disposition"] in {"keep", "rewrite", "consolidate-to", "remove"} for r in editorial)
    assert sum(decisions.values()) == len(records)
    for record in records:
        if record["public_url_disposition"] == "consolidate-to":
            assert record["consolidate_to"] in url_map
            assert url_map[record["consolidate_to"]]["public_url_disposition"] in {"keep", "rewrite"}
            assert stem(record) == stem(url_map[record["consolidate_to"]]), "Consolidations must be intent-equivalent same-slug duplicates"

    stop_loss = {
        "day_30": "After approved consolidation ships: stop new publishing if Search Console has <50 organic impressions across salvage pages OR analytics has <10 organic sessions; validate indexing and tracking before further investment.",
        "day_60": "Pause all editorial spending if salvage pages have <200 cumulative organic impressions, <10 organic clicks, OR zero affiliate outbound clicks; allow only technical fixes.",
        "day_90": "Exit the content-site strategy (retain only utility/trust pages or sell/park the domain) if salvage pages have <500 cumulative organic impressions, <25 organic clicks, and $0 verified revenue.",
    }
    manifest = {
        "schema_version": 2,
        "scope": "review-only public URL dispositions plus separate repository-file inventory; no production mutation",
        "determinism_note": "Derived only from repository files with sorted traversal; no timestamps or network input.",
        "summary": {
            "public_html_files": len(records),
            "repository_only_html_files": len(repository_files),
            "indexable_editorial_urls": len(editorial),
            "salvage_editorial_urls": len(salvage),
            "decision_counts": dict(sorted(decisions.items())),
            "root_blog_duplicate_groups": len(duplicate_groups),
            "manufactured_prefix_families": len(manufactured),
            "cannibalization_clusters": len(clusters),
            "pages_with_repeated_paragraphs": sum(r["repeated_paragraph_count"] > 0 for r in records),
        },
        "stop_loss_criteria": stop_loss,
        "root_blog_duplicates": duplicate_groups,
        "manufactured_title_prefix_families": manufactured,
        "intent_cannibalization_clusters": clusters,
        "public_url_inventory": records,
        "repository_file_inventory": repository_files,
    }
    JSON_OUT.parent.mkdir(parents=True, exist_ok=True)
    MD_OUT.parent.mkdir(parents=True, exist_ok=True)
    JSON_OUT.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    lines = [
        "# MQ URL Decision Audit", "",
        "> Review-only proposed classifications. No HTML, sitemap, redirect, analytics, AdSense, or affiliate destination was changed.", "",
        "## Portfolio summary", "",
        f"- Public HTML files inventoried exactly once: **{len(records)}**",
        f"- Repository-only HTML files excluded from URL decisions: **{len(repository_files)}**",
        f"- Indexable editorial URLs classified: **{len(editorial)}**",
        f"- Editorial salvage candidates (cap 15): **{len(salvage)}**",
        f"- Decisions: {', '.join(f'`{k}` {v}' for k, v in sorted(decisions.items()))}",
        f"- Root/blog duplicate groups: **{len(duplicate_groups)}**",
        f"- Manufactured title-prefix families: **{len(manufactured)}**",
        f"- Intent-cannibalization clusters: **{len(clusters)}**",
        f"- Pages carrying repeated paragraphs: **{manifest['summary']['pages_with_repeated_paragraphs']}**", "",
        "## Editorial salvage set", "",
        "These 15 explicitly preferred pages are proposed rewrite candidates, not authorization to mutate production.", "",
    ]
    for record in sorted(salvage, key=lambda r: r["path"]):
        lines.append(f"- `{record['url']}` — {record['visible_word_count']} words; {record['credible_external_source_count']} credible sources; {record['repeated_paragraph_count']} repeated paragraphs")
    lines += ["", "## Duplicate and manufactured families", ""]
    lines.append(f"Root/blog duplicate groups: `{json.dumps(duplicate_groups, ensure_ascii=False)}`")
    lines.append("")
    for family in manufactured:
        lines.append(f"- `{family['prefix']}` — {family['count']} pages")
    lines += ["", "## Likely intent cannibalization", ""]
    for cluster in clusters:
        lines.append(f"- **{cluster['topic']}** — {cluster['count']} pages")
    lines += ["", "## 30/60/90-day stop-loss thresholds", ""]
    for label, criterion in stop_loss.items():
        lines.append(f"- **{label.replace('_', ' ').title()}:** {criterion}")
    lines += ["", "## Repository-only files", "", "These files are inventoried separately and receive no public URL disposition.", ""]
    for record in repository_files:
        lines.append(f"- `{record['path']}` — `{record['repository_file_disposition']}`")
    lines += ["", "## Public URL disposition inventory", "", "| URL | Kind | Indexable | Disposition | Destination | Words | Sources | Repeated ¶ | Sitemap |", "|---|---|---:|---|---|---:|---:|---:|---:|"]
    for record in records:
        values = dict(record)
        values["destination"] = record["consolidate_to"] or "—"
        values["disposition"] = record["public_url_disposition"] or "not-applicable"
        lines.append("| {url} | {page_kind} | {indexable} | {disposition} | {destination} | {visible_word_count} | {credible_external_source_count} | {repeated_paragraph_count} | {sitemap_presence} |".format(**values))
    MD_OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Audited {len(records)} public HTML files and {len(repository_files)} repository-only HTML files; {len(editorial)} indexable editorial URLs; {len(salvage)} salvage candidates.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
