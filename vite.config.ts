import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { allPublicRoutes, allIndexableRoutes } from "./client/src/config/routes";
import { blogPosts } from "./client/src/data/blog-posts";
import { writeBuildArtifacts } from "./scripts/build-artifacts";

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
  // Every route comes from the registry, so the prerender list, the sitemap and
  // the Amplify rewrites can never disagree with each other again.
  const blogSlugs = blogPosts.map((p) => p.slug);
  const routes = allPublicRoutes(blogSlugs);
  const sitemapRoutes = allIndexableRoutes(blogSlugs);
  const repoRoot = import.meta.dirname;
  const distDir = path.resolve(repoRoot, "dist/public");

  if (command === "build") {
    // Runs after the prerenderer has written its output, so the generated
    // sitemap is not clobbered by the public/ directory copy.
    plugins.push({
      name: "poorvam-build-artifacts",
      closeBundle() {
        writeBuildArtifacts(routes, sitemapRoutes, repoRoot, distDir);
      },
    });

    try {
      const { default: prerender } = await import("@prerenderer/rollup-plugin");
      // Puppeteer (real headless Chromium) — JSDOM cannot execute the Vite
      // ESM bundle, so it produced empty #root shells for every route.
      const { default: PuppeteerRenderer } = await import("@prerenderer/renderer-puppeteer");
      plugins.push(
        prerender({
          routes: routes.map((r) => r.path),
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
