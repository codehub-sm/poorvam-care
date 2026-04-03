import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig(async () => {
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

  // Add prerendering in production builds for SSG (static HTML for crawlers)
  if (process.env.NODE_ENV === "production") {
    try {
      const { default: prerender } = await import("@prerenderer/rollup-plugin");
      const { default: JSDOMRenderer } = await import("@prerenderer/renderer-jsdom");
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
          ],
          renderer: new JSDOMRenderer(),
          rendererOptions: {
            renderAfterTime: 5000,
          },
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
    } catch {
      console.warn("Prerender plugin not available, skipping SSG");
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
