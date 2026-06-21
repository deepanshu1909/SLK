import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

const SITES_DIR = path.resolve(process.cwd(), "Client_LPGen/sites");

const RESERVED = new Set([
  "dashboard",
  "login",
  "api",
  "assets",
  "src",
  "dist",
  "@vite",
  "@react-refresh",
  "@fs",
  "node_modules",
]);

function serveClientLp(reqUrl: string | undefined, sitesDir: string): string | null {
  const url = (reqUrl ?? "").split("?")[0].split("#")[0];
  const match = url.match(/^\/([a-z0-9][a-z0-9-]*)\/?$/i);
  if (!match) return null;

  const slug = match[1].toLowerCase();
  if (RESERVED.has(slug)) return null;

  const htmlPath = path.join(sitesDir, slug, "index.html");
  return fs.existsSync(htmlPath) ? htmlPath : null;
}

function copySitesToDist() {
  if (!fs.existsSync(SITES_DIR)) return;

  const distDir = path.resolve(process.cwd(), "dist");
  for (const slug of fs.readdirSync(SITES_DIR)) {
    const src = path.join(SITES_DIR, slug, "index.html");
    if (!fs.existsSync(src)) continue;
    const destDir = path.join(distDir, slug);
    fs.mkdirSync(destDir, { recursive: true });
    fs.copyFileSync(src, path.join(destDir, "index.html"));
  }
}

function clientLandingPagesPlugin(): Plugin {
  const middleware = (
    req: { url?: string },
    res: { setHeader: (k: string, v: string) => void; end: (b: string) => void },
    next: () => void
  ) => {
    const htmlPath = serveClientLp(req.url, SITES_DIR);
    if (!htmlPath) return next();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(fs.readFileSync(htmlPath, "utf-8"));
  };

  return {
    name: "client-landing-pages",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
    closeBundle() {
      copySitesToDist();
    },
  };
}

export { clientLandingPagesPlugin, SITES_DIR };
