# S3 + CloudFront Configuration for Poorvam Care

## Overview
poorvamcare.in is a React SPA (Vite + prerendering) hosted on S3 behind CloudFront.
This document captures the infra configuration needed to fix Google Search Console 404 errors.

---

## 1. CloudFront Function (Viewer Request)

Deploy `infra/cloudfront-redirects.js` as a CloudFront Function attached to the
distribution's Viewer Request event.

Handles:
- `/occupationalTherapy.html` and other legacy .html paths → 301 to `/`
- Trailing slash URLs → 301 to non-trailing version
- Clean SPA URLs → rewrite to prerendered `/{path}/index.html`

**Apply via AWS Console:**
1. CloudFront → Functions → Create function
2. Name: `poorvam-care-redirects`
3. Runtime: cloudfront-js-2.0
4. Code: paste contents of `infra/cloudfront-redirects.js`
5. Publish function
6. Go to distribution → Behaviors → Edit default behavior
7. Function associations → Viewer request → Select the function
8. Save

---

## 2. S3 Website Hosting Redirect Rules (alternative to CloudFront Function)

If you prefer managing redirects in S3 rather than CloudFront, add these
routing rules in the S3 bucket → Properties → Static website hosting →
Redirection rules:

```xml
<RoutingRules>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>occupationalTherapy.html</KeyPrefixEquals>
    </Condition>
    <Redirect>
      <Protocol>https</Protocol>
      <HostName>poorvamcare.in</HostName>
      <ReplaceKeyWith></ReplaceKeyWith>
      <HttpRedirectCode>301</HttpRedirectCode>
    </Redirect>
  </RoutingRule>
  <RoutingRule>
    <Condition>
      <KeyPrefixEquals>occupationaltherapy.html</KeyPrefixEquals>
    </Condition>
    <Redirect>
      <Protocol>https</Protocol>
      <HostName>poorvamcare.in</HostName>
      <ReplaceKeyWith></ReplaceKeyWith>
      <HttpRedirectCode>301</HttpRedirectCode>
    </Redirect>
  </RoutingRule>
</RoutingRules>
```

---

## 3. CloudFront Error Pages

In CloudFront distribution → Error pages, configure:

| HTTP error code | Response page path | HTTP response code | TTL |
|---|---|---|---|
| 403 | /index.html | 200 | 0 |
| 404 | /index.html | 200 | 0 |

This ensures unknown SPA routes still serve the React app (which then handles
the route or shows the 404 page component).

> **Note:** Setting 404 → 200 is required for SPA routing, but also means Google
> no longer sees a 404 status for genuinely missing URLs. The `NotFound` React
> component should include a `<meta name="robots" content="noindex">` tag to
> avoid soft-404 indexing issues.

---

## 4. Post-Deploy Checklist

After deploying this PR and applying infra changes:

- [ ] Invalidate CloudFront cache: `aws cloudfront create-invalidation --distribution-id <ID> --paths "/*"`
- [ ] Test each new page loads:
  - https://poorvamcare.in/parent-counselling
  - https://poorvamcare.in/speech-therapy-btm-layout-bangalore
  - https://poorvamcare.in/speech-therapy-marathahalli-bangalore
  - https://poorvamcare.in/blog/speech-therapy-for-autism-guide
  - https://poorvamcare.in/blog/occupational-therapy-sensory-processing
- [ ] Test trailing slash redirect: `curl -I https://poorvamcare.in/occupational-therapy-for-children-bangalore/`
  → expect `HTTP/2 301` with `location: https://poorvamcare.in/occupational-therapy-for-children-bangalore`
- [ ] Test legacy URL redirect: `curl -I https://poorvamcare.in/occupationalTherapy.html`
  → expect `HTTP/2 301` with `location: https://poorvamcare.in/`
- [ ] Google Search Console → Sitemaps → Resubmit `sitemap.xml`
- [ ] Google Search Console → URL Inspection → Request indexing for each new URL
- [ ] Google Search Console → Page Indexing → verify 404 count drops over the next 7–14 days
- [ ] Rich Results Test on homepage: https://search.google.com/test/rich-results?url=https%3A%2F%2Fpoorvamcare.in
