# poorvamcare.in

Static site for Poorvam Care, in the same design system as poorvamhearing.com. No framework and no runtime dependencies: `node build.mjs` renders `src/pages/**/*.mjs` into `dist/`.

## Work on it

```sh
npm install                 # dev tools only (puppeteer-core for screenshots and checks)
node build.mjs              # strict build → dist/, sitemap, robots, llms.txt, deploy/amplify-redirects.json
npm run serve               # http://localhost:8092
node tools/shot.mjs /tmp/shots / /about        # phone + desktop screenshots, cut into chunks
npm run check:overflow      # every page at 390px: no sideways scroll, no JS errors
npm run check:booking       # booking sheet dry run, all lead sinks stubbed
npm run parity              # every URL from the 2026-10 live baseline still serves and keeps what it ranked on
```

- **Facts** live once in `src/site.mjs` (phone, centres, hours, therapies, lead sinks). A value that isn't known is `null`; the build lists them.
- **Pages** are one module each. `path` is the public URL (`/online/india`); the file lands at `dist/online/india/index.html`.
- **The build fails** on a title over 65 characters, a description outside 110–165, anything other than one H1, duplicate titles or descriptions, a broken internal link or anchor, a relative or trailing-slash link, a missing asset, TODO, any rupee figure, or an exclamation mark.
- **Retired URLs** go in `src/redirects.mjs` (one hop, closest-intent page).
- **Writing a page**: read `migration/briefs/PAGE_BRIEF.md` and `migration/briefs/DESIGN_RULES.md`.

## Leads

The booking sheet (`assets/js/site.js`) posts every request to three sinks in parallel: Theraflow (`/api/public/enquiry/poorvam`), the Leads Google Sheet (Apps Script in `infra/apps-script/`, same column contract as before) and Web3Forms email. Any one landing counts as sent; if none land, the parent gets a pre-filled WhatsApp link.

## Deploy (Amplify app `dchw0t2q9sis8`, production branch `main-new`)

1. Build settings come from `amplify.yml` (`node build.mjs`, artifacts from `dist`). Delete any build spec saved in the console.
2. Rewrites and redirects are generated into `deploy/amplify-redirects.json`. Sync them after every build that adds, removes or renames a page:
   `aws amplify update-app --app-id dchw0t2q9sis8 --custom-rules file://deploy/amplify-redirects.json`
   The last rule turns unknown paths into a real 404; the old SPA catch-all must not come back.
3. Response headers come from `customHttp.yml`.
