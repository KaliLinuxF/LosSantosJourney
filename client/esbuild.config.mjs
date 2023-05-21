import * as esbuild from 'esbuild'

esbuild.build({
    entryPoints: ['index.ts'],
    inject: ['../shared/index.ts'],
    bundle: true,
    platform: 'node',
    target: 'node14',
    outfile: '../dist/client/index.js',
    minify: true
  }).catch(() => process.exit(1));