import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { build as esbuild } from "esbuild";
import esbuildPluginPino from "esbuild-plugin-pino";
import { rm } from "node:fs/promises";

// Plugins (e.g. esbuild-plugin-pino) may use require
globalThis.require = createRequire(import.meta.url);

const artifactDir = path.dirname(fileURLToPath(import.meta.url));

// === FIX FOR @workspace/* ===
const workspacePlugin = {
  name: 'workspace-alias',
  setup(build) {
    build.onResolve({ filter: /^@workspace\// }, (args) => {
      const name = args.path.replace('@workspace/', '');
      return {
        path: path.resolve(artifactDir, `../../lib/${name}/src/index.ts`),
      };
    });
  },
};

async function buildAll() {
  const distDir = path.resolve(artifactDir, "dist");
  await rm(distDir, { recursive: true, force: true });

  await esbuild({
    entryPoints: [path.resolve(artifactDir, "src/index.ts")],
    platform: "node",
    bundle: true,
    format: "esm",
    outdir: distDir,
    outExtension: { ".js": ".mjs" },
    logLevel: "info",
    external: [
      "node:*",
      "*node:*",
      "sharp",
      "better-sqlite3",
      "sqlite3",
      "canvas",
      "esbuild",
      "argon2",
      "fsevents",
      "pino",
      "pino-pretty",
      "thread-stream",
      "sonic-boom",
      "farmhash",
      "bufferutil",
      "utf-8-validate",
      "zstd",
      "snappy",
      "lz4",
      "kerberos",
      "cpu-features",
      "aws-crt",
      "aws-crt/*",
      "isolated-vm",
      "zeromq",
      "buffer-crc32",
      "google-gax",
      "@google-cloud/*",
      "koffi",
      "commonjs",
      "mock-aws-s3",
      "nock",
      "msw",
      "sodium-native",
      "pprof",
      "lightningcss",
      "lightningcss/*",
      "puppeteer",
      "puppeteer-core",
      "@sparticuz/*",
      "playwright",
      "playwright-core",
      "aws-sdk",
      "@aws-sdk/*",
      "electron",
    ],
    plugins: [
      workspacePlugin,
      esbuildPluginPino({ transports: ["pino-pretty"] }),
    ],
    banner: {
      js: `import { createRequire as __createRequire__ } from 'node:module'; import path as __path__ from 'node:path'; import { fileURLToPath as __fileURLToPath__ } from 'node:url'; const require = __createRequire__(import.meta.url); const __filename = __fileURLToPath__(import.meta.url); const __dirname = __path__.dirname(__filename);`,
    },
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
