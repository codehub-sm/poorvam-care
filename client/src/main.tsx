import { createRoot } from "react-dom/client";
import App from "./App";
import { initAnalytics } from "./lib/analytics";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/outfit";
import "./index.css";

// No-op until VITE_GA4_MEASUREMENT_ID is set, and skipped under Puppeteer so
// the prerender pass does not register ~29 phantom pageviews per build.
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);

// Remove static SEO content once React has mounted
document.getElementById("static-content")?.remove();

// Signal the prerenderer (Puppeteer) that the route has rendered and SeoHead's
// effects have set the title/meta, so it can snapshot the final DOM. Harmless
// no-op in a normal browser. Two RAFs flush React's commit + passive effects.
requestAnimationFrame(() =>
  requestAnimationFrame(() =>
    setTimeout(() => document.dispatchEvent(new Event("prerender-ready")), 0),
  ),
);
