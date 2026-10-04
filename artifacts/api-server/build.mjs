import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node20',
  outfile: 'dist/index.js',
  format: 'cjs',
  external: ['*'],
  packages: 'external',
  banner: {
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`
  }
});

console.log('Build done');
