import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { readFileSync, writeFileSync } from "fs";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { allPublicRoutes, allIndexableRoutes } from "./client/src/config/routes";
import { blogPosts } from "./client/src/data/blog-posts";
import { writeBuildArtifacts } from "./scripts/build-artifacts";
import { fillContactTokens, assertNoHardcodedContact } from "./scripts/contact-tokens";
import { servePayments } from "./server/payments-node.js";

export default defineConfig(async ({ command, mode }) => {
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

  // Contact details come from client/src/config/site.ts only. index.html and
  // llms.txt can't import it, so they carry %CONTACT_*% tokens filled here —
  // identically in dev and build, so neither can drift.
  const llmsSource = path.resolve(repoRoot, "client/public/llms.txt");
  plugins.push({
    name: "poorvam-contact-tokens",
    transformIndexHtml: {
      order: "pre",
      handler: (html, ctx) => fillContactTokens(html, ctx.filename),
    },
    configureServer(server) {
      server.middlewares.use("/llms.txt", (_req, res) => {
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.end(fillContactTokens(readFileSync(llmsSource, "utf8"), llmsSource));
      });
    },
    closeBundle() {
      if (command !== "build") return;
      const llmsOut = path.resolve(distDir, "llms.txt");
      writeFileSync(llmsOut, fillContactTokens(readFileSync(llmsOut, "utf8"), llmsOut), "utf8");
    },
  });

  if (command === "serve") {
    // Serve the Razorpay payments API from the dev server itself, on the same
    // origin as the site. One process for `npm run dev`, no proxy, and the
    // exact handler server.js and the Lambda use — so dev cannot drift from
    // prod. The secret is read from the repo-root .env here and never
    // reaches the client bundle (only VITE_* keys do).
    Object.assign(process.env, loadEnv(mode, repoRoot, ["RAZORPAY_", "PAYMENTS_"]));
    plugins.push({
      name: "poorvam-payments-dev-api",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          servePayments(req, res).then((handled) => {
            if (!handled) next();
          }, next);
        });
      },
    });
  }

  if (command === "build") {
    // Fail before bundling if a number was pasted in by hand again.
    assertNoHardcodedContact(repoRoot);

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
    // .env lives at the repo root (where .gitignore expects it), not in
    // client/, which is Vite's default envDir because `root` is client/.
    envDir: repoRoot,
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
