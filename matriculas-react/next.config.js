"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const repoRoot = path_1.default.join(__dirname, "..");
// `localhost` costuma alinhar melhor IPv4/IPv6 que `127.0.0.1` no proxy do Next.
// Se o Next rodar dentro do Docker, use MATRICULAS_API_ORIGIN=http://host.docker.internal:3000
const matriculasApiOrigin = process.env.MATRICULAS_API_ORIGIN ?? "http://localhost:3000";
const nextConfig = {
    outputFileTracingRoot: repoRoot,
    turbopack: {
        root: repoRoot,
    },
    async rewrites() {
        const root = matriculasApiOrigin.replace(/\/$/, "");
        return [{ source: "/api/:path*", destination: `${root}/api/:path*` }];
    },
};
exports.default = nextConfig;
//# sourceMappingURL=next.config.js.map