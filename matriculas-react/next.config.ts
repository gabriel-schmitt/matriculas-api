import type { NextConfig } from "next";
import path from "path";

const repoRoot = path.join(__dirname, "..");

/** Proxy da API em `app/api/[...path]/route.ts` (server); evita depender de rewrites + Turbopack. */
const nextConfig: NextConfig = {
  outputFileTracingRoot: repoRoot,
  turbopack: {
    root: repoRoot,
  },
};

export default nextConfig;
