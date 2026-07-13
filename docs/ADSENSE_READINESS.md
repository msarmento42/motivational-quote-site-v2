# AdSense Readiness Checklist

Use this checklist before requesting or re-requesting AdSense review for motivational-quote.org.

## Required Site Checks

- `https://motivational-quote.org/ads.txt` returns HTTP 200.
- `ads.txt` contains `google.com, pub-6175161566333696, DIRECT, f08c47fec0942fa0`.
- `https://motivational-quote.org/sitemap.xml` returns HTTP 200.
- The sitemap includes `/quote-sources.html`.
- The homepage links to `quote-sources.html`.
- Core trust pages are present: `about.html`, `contact.html`, `privacy.html`, `editorial-standards.html`, `quote-sources.html`.
- Static validation passes.
- The post-deploy smoke check passes with `node scripts/check-adsense-readiness.mjs`.

## AdSense Console Flow

1. In AdSense, open **Sites**.
2. Click `motivational-quote.org`.
3. If `Ads.txt status` is not `Authorized`, click **Check for updates**.
4. Leave the site in review if AdSense already says `Getting ready`.
5. If Google returns a concrete issue, patch that issue and rerun the smoke check before requesting review again.

## Vercel Deployment Notes

- Vercel project: `motivational-quote`.
- Production domain: `motivational-quote.org`.
- Manual production deploy fallback:

```bash
npx vercel@latest --prod --yes --token "$VERCEL_TOKEN" --name motivational-quote
```

Keep Vercel tokens and pulled environment files out of git.
