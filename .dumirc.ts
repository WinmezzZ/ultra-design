import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: ' ',
    logo: false,
  },
  // mako: {},
  apiParser: {},
  resolve: {
    entryFile: './src/index.ts',
  },
});
