# AWS Amplify Hosting Setup for Poorvam Care

poorvamcare.in is hosted on **AWS Amplify**, which handles SPA routing,
redirects, and SSL natively — no CloudFront Function or S3 website config needed.

---

## How Amplify handles the GSC 404 issues

Unlike plain S3, Amplify:
- Automatically serves `index.html` for unknown paths (SPA rewrite) when the
  catch-all rule below is configured.
- Supports 301/302 redirects via a simple JSON config in the console.
- Handles HTTPS/SSL automatically.

This means **we do NOT need** a CloudFront Function. Everything is configured
via Amplify console or by committing `customHttp.yml` / redirect JSON to the repo.

---

## Step 1 — Apply redirects via Amplify Console

The redirect rules are in `infra/amplify-redirects.json`.

**To apply:**

1. Open AWS Amplify Console → Your poorvamcare.in app
2. Left sidebar → **Rewrites and redirects**
3. Click **Edit** → toggle to **JSON** view
4. Paste the entire contents of `infra/amplify-redirects.json`
5. Click **Save**

Amplify applies the rules immediately — no redeploy needed.

### What the rules do (evaluated top to bottom, first match wins)

| # | Source | Target | Status | Purpose |
|---|---|---|---|---|
| 1–6 | `/*.html` (legacy paths) | `/` | 301 | Kill zombie indexed URLs (`occupationalTherapy.html`, etc.) |
| 7 | `/occupational-therapy-for-children-bangalore/` | non-trailing version | 301 | Fix the specific GSC-flagged duplicate |
| 8 | `</^\\/(.+)\\/$/>` | `/$1` | 301 | Strip any other trailing slash |
| 9 | catch-all regex | `/index.html` | 200 | SPA fallback — React handles unknown routes |

---

## Step 2 — Verify redirects are live

After saving in the Amplify console, test from your terminal:

```bash
# Trailing slash → 301 to non-trailing
curl -I https://poorvamcare.in/occupational-therapy-for-children-bangalore/
# Expect: HTTP/2 301, location: .../occupational-therapy-for-children-bangalore

# Legacy .html → 301 to home
curl -I https://poorvamcare.in/occupationalTherapy.html
# Expect: HTTP/2 301, location: https://poorvamcare.in/

# New page → 200
curl -I https://poorvamcare.in/parent-counselling
# Expect: HTTP/2 200
```

---

## Step 3 — Post-deploy actions

Once this PR is merged and Amplify builds the new pages:

- [ ] Confirm redirects JSON is saved in Amplify console
- [ ] Test each new page loads (200):
  - https://poorvamcare.in/parent-counselling
  - https://poorvamcare.in/speech-therapy-btm-layout-bangalore
  - https://poorvamcare.in/speech-therapy-marathahalli-bangalore
  - https://poorvamcare.in/blog/speech-therapy-for-autism-guide
  - https://poorvamcare.in/blog/occupational-therapy-sensory-processing
- [ ] Test existing pages that were 404-ing also load:
  - https://poorvamcare.in/speech-therapy-for-speech-delay-bangalore
  - https://poorvamcare.in/occupational-therapy-for-children-bangalore
- [ ] Google Search Console → Sitemaps → Resubmit `sitemap.xml`
- [ ] Google Search Console → URL Inspection → Request indexing for each new URL
- [ ] Google Search Console → Page Indexing → confirm 404 count drops over 7–14 days
- [ ] Rich Results Test: https://search.google.com/test/rich-results?url=https%3A%2F%2Fpoorvamcare.in

---

## Why the client-side `useRedirects()` hook still exists

The hook in `client/src/App.tsx` is a **client-side fallback** in case:
- Someone clicks an internal link that points to a trailing-slash URL
- React Router navigates to a legacy path during a SPA session

It performs a `history.replaceState` redirect (silent URL update, no page reload).
Server-side 301s from Amplify are the primary mechanism — the hook just keeps
the URL bar clean within an already-loaded session.
