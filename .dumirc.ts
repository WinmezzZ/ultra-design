import { defineConfig } from 'dumi';
import path from 'path';


export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: 'ultra-design',
  },
  resolve: {
    docDirs: ['docs', 'src']
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
});
