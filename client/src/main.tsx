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

// The "prerender-ready" signal for Puppeteer is dispatched by PrerenderReady
// in App.tsx, inside the Suspense boundary — dispatching here raced the lazy
// page chunks and could snapshot a page-less shell.
