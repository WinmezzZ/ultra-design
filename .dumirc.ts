import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'ultra-design',
  },
  // mako: {},
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
