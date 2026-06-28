import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async ({ command }) => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ];

  // Add prerendering for SSG (static HTML for crawlers). Gate on the Vite
  // `command` (reliable during `vite build`) rather than process.env.NODE_ENV,
  // which is not guaranteed to be "production" when this config is evaluated.
  if (command === "build") {
    try {
      const { default: prerender } = await import("@prerenderer/rollup-plugin");
      // Puppeteer (real headless Chromium) — JSDOM cannot execute the Vite
      // ESM bundle, so it produced empty #root shells for every route.
      const { default: PuppeteerRenderer } = await import("@prerenderer/renderer-puppeteer");
      plugins.push(
        prerender({
          routes: [
            "/",
            "/child-development",
            "/therapeutic-enrichment",
            "/electronic-city-phase-1",
            "/electronic-city-phase-2",
            "/about",
            "/contact",
            "/service-packages",
            "/faq",
            "/speech-therapy-for-autism-bangalore",
            "/occupational-therapy-for-children-bangalore",
            "/speech-therapy-for-speech-delay-bangalore",
            "/aba-therapy-for-children-bangalore",
            "/special-education-for-children-bangalore",
            "/speech-therapy-electronic-city",
            "/child-therapy-hsr-layout-bangalore",
            "/parent-counselling",
            "/blog",
            "/speech-therapy-btm-layout-bangalore",
            "/speech-therapy-koramangala-bangalore",
            "/speech-therapy-whitefield-bangalore",
            "/speech-therapy-marathahalli-bangalore",
            "/blog/speech-therapy-for-autism-guide",
            "/blog/10-signs-child-needs-speech-therapy",
            "/blog/occupational-therapy-sensory-processing",
            "/blog/what-is-aba-therapy-guide",
            "/blog/why-early-intervention-matters",
            "/blog/speech-therapy-2-year-olds-bangalore",
            "/blog/occupational-therapy-autism-bangalore",
          ],
          renderer: new PuppeteerRenderer({
            launchOptions: {
              headless: true,
              args: ["--no-sandbox", "--disable-setuid-sandbox"],
            },
            // Wait until React has mounted, rendered the route, and SeoHead has
            // set the document title — signalled via window event in main.tsx.
            renderAfterDocumentEvent: "prerender-ready",
            timeout: 30000,
          }),
          postProcess(renderedRoute: { html: string }) {
            // Remove noscript block from prerendered pages since content is now in the DOM
            renderedRoute.html = renderedRoute.html.replace(
              /<noscript>[\s\S]*?<\/noscript>/g,
              ''
            );
            return renderedRoute;
          },
        }) as any,
      );
    } catch (err) {
      // Fail loudly: a silent skip here ships an SPA shell that serves the
      // homepage HTML for every route, which destroys per-page SEO/AEO.
      console.error("Prerender plugin failed to load — SSG is required for SEO.", err);
      throw err;
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "wouter"],
            ui: ["@radix-ui/react-tooltip", "@radix-ui/react-accordion", "@radix-ui/react-toast"],
          },
        },
      },
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
