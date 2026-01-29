import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  // Use import.meta.url for better compatibility with bundlers
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const distPath = path.resolve(__dirname, "public");

  console.log(`[Production] Looking for static files in: ${distPath}`);
  
  if (!fs.existsSync(distPath)) {
    console.error(`[Production] ERROR: Build directory not found at ${distPath}`);
    console.error(`[Production] Current directory: ${process.cwd()}`);
    console.error(`[Production] __dirname: ${__dirname}`);
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  console.log(`[Production] Build directory found, serving static files`);
  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  try {
    console.log(`[Production] Starting production server...`);
    console.log(`[Production] Node version: ${process.version}`);
    console.log(`[Production] PORT environment variable: ${process.env.PORT || 'not set (using default 5000)'}`);
    await runApp(serveStatic);
  } catch (error) {
    console.error(`[Production] Failed to start server:`, error);
    process.exit(1);
  }
})();
