/**
 * Production server for Poorvam Care (Replit Autoscale)
 *
 * Handles:
 *  1. 301 redirects for legacy / renamed URLs (avoids GSC 404s)
 *  2. Static file serving from dist/public
 *  3. SPA fallback — any unknown path returns index.html (200) so
 *     React/Wouter can handle client-side routing
 *  4. Razorpay payments API (/api/create-order, /api/verify-payment) via
 *     server/payments-node.js — see server/payments.js for the contract
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { servePayments } from "./server/payments-node.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist", "public");
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// 301 redirect map  (legacy URL → new canonical URL)
// ---------------------------------------------------------------------------
const REDIRECTS = {
  // Old slug variants Google crawled
  "/occupational-therapy-for-children-bangalore":  "/occupational-therapy",
  "/occupational-therapy-for-children-bangalore/": "/occupational-therapy",
  "/speech-therapy-for-speech-delay-bangalore":    "/speech-therapy",
  "/speech-therapy-for-speech-delay-bangalore/":   "/speech-therapy",

  // Old HTTrack-mirrored static HTML paths (from main branch)
  "/speechAndLanguage.html":          "/speech-therapy",
  "/occupationalTherapy.html":        "/occupational-therapy",
  "/developmentalEducation.html":     "/special-education",
  "/socialSkillsGroupTraining.html":  "/therapeutic-enrichment",
  "/therapy.html":                    "/child-development",
  "/about.html":                      "/about",
  "/contact.html":                    "/contact",
  "/blog.html":                       "/blog",
  "/team.html":                       "/about",
  "/booking.html":                    "/contact",
  "/gallery.html":                    "/about",
  "/index-2.html":                    "/",

  // Trailing-slash normalisation for SPA routes
  "/speech-therapy/":                 "/speech-therapy",
  "/occupational-therapy/":           "/occupational-therapy",
  "/aba-therapy/":                    "/aba-therapy",
  "/special-education/":              "/special-education",
  "/parent-counselling/":             "/parent-counselling",
  "/therapeutic-enrichment/":         "/therapeutic-enrichment",
  "/teletherapy/":                    "/teletherapy",
  "/electronic-city-phase-1/":        "/electronic-city-phase-1",
  "/electronic-city-phase-2/":        "/electronic-city-phase-2",
  "/blog/":                           "/blog",
  "/child-development/":              "/child-development",
  "/hearing-center/":                 "/hearing-center",
  "/about/":                          "/about",
  "/contact/":                        "/contact",
};

// ---------------------------------------------------------------------------
// MIME types
// ---------------------------------------------------------------------------
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".mjs":  "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".txt":  "text/plain",
  ".xml":  "application/xml",
};

// ---------------------------------------------------------------------------
// Server
// ---------------------------------------------------------------------------
const server = http.createServer(async (req, res) => {
  const urlPath = req.url.split("?")[0]; // strip query string for routing

  // 0. Payments API (Razorpay order + signature verification). Checked first
  //    so /api/* can never fall through to the SPA shell as a 200 HTML page.
  //    Needs RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET in the environment
  //    (Replit Secrets, or `node --env-file=.env server.js` locally).
  if (await servePayments(req, res)) return;

  // 1. 301 redirects
  if (REDIRECTS[urlPath]) {
    res.writeHead(301, { Location: REDIRECTS[urlPath] });
    res.end();
    return;
  }

  // 2. Try to serve a real static file
  const filePath = path.join(DIST, urlPath);

  // Prevent directory traversal
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const mime = MIME[ext] || "application/octet-stream";

      // Long-lived cache for hashed assets, short for HTML
      const isHashed = /\.[a-f0-9]{8,}\.(js|css)$/.test(filePath);
      const cacheControl = isHashed
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600";

      res.writeHead(200, {
        "Content-Type": mime,
        "Cache-Control": cacheControl,
        "X-Content-Type-Options": "nosniff",
      });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    // 3. SPA fallback — serve index.html for all unrecognised paths
    const indexPath = path.join(DIST, "index.html");
    fs.readFile(indexPath, (err2, data) => {
      if (err2) {
        res.writeHead(500);
        res.end("Server error: build output not found. Run `npm run build` first.");
        return;
      }
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Poorvam Care server running on port ${PORT}`);
});
