#!/usr/bin/env node
// Local dev server that mimics Netlify _redirects rewrite rules
const http = require("http");
const fs   = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = 4200;

const REWRITES = {
  "/features":    "/pages/features.html",
  "/pricing":     "/pages/pricing.html",
  "/about":       "/pages/about.html",
  "/demo":        "/pages/demo.html",
  "/contact":     "/pages/contact.html",
  "/privacy":     "/pages/privacy.html",
  "/cookie":      "/pages/cookie.html",
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".svg":  "image/svg+xml",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".mp4":  "video/mp4",
  ".woff2":"font/woff2",
  ".ico":  "image/x-icon",
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || "application/octet-stream";
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { "Content-Type": mime });
    res.end(data);
  } catch {
    // 404 → serve index.html with 404 status
    try {
      const data = fs.readFileSync(path.join(ROOT, "index.html"));
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch {
      res.writeHead(404); res.end("Not found");
    }
  }
}

http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0].replace(/\/+$/, "") || "/";

  // Apply rewrite rules
  const rewrite = REWRITES[urlPath];
  if (rewrite) {
    return serveFile(res, path.join(ROOT, rewrite));
  }

  // Root → index.html
  if (urlPath === "/") {
    return serveFile(res, path.join(ROOT, "index.html"));
  }

  // Direct file
  serveFile(res, path.join(ROOT, urlPath));
}).listen(PORT, () => {
  console.log(`\n  ✓ aiQlik dev server running at http://localhost:${PORT}\n`);
  console.log("  Routes:");
  Object.entries(REWRITES).forEach(([k,v]) => console.log(`    ${k.padEnd(12)} → ${v}`));
  console.log();
});
