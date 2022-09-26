import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  splitting: true,
  treeshake: true,
  format: ['cjs', 'esm'],
  external: ['bun'],
  dts: true
});
