#!/usr/bin/env python3
"""AGIOS scope check — validates changed files against .agios/scope.json"""
import json, sys, fnmatch, argparse

parser = argparse.ArgumentParser()
parser.add_argument("--changed", required=True, help="Space-separated list of changed files")
parser.add_argument("--scope", required=True, help="Path to scope.json")
args = parser.parse_args()

with open(args.scope) as f:
    scope = json.load(f)

changed = [f.strip() for f in args.changed.split() if f.strip()]
blocked = scope.get("blocked_paths", [])
max_files = scope.get("max_files_changed", 50)

failures = []

if len(changed) > max_files:
    failures.append(f"Too many files changed: {len(changed)} > {max_files}")

for path in changed:
    for pattern in blocked:
        if fnmatch.fnmatch(path, pattern):
            failures.append(f"BLOCKED: {path} matches blocked pattern '{pattern}'")

if failures:
    print("SCOPE CHECK FAILED:")
    for f in failures:
        print(f"  {f}")
    sys.exit(1)

print(f"Scope check passed. {len(changed)} file(s) changed.")
