import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/outfit";
import "./index.css";

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
