import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'ultra-design',
  favicon: 'https://cdn.hyyar.com/favicon.ico',
  logo: 'https://cdn.hyyar.com/logo.jpg',
  outputPath: 'docs-dist',
  mode: 'site',
  resolve: {
    includes: ['docs', 'components'],
  },
  alias: {
    'ultra-design': path.resolve(__dirname, 'components')
  },
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/WinmezzZ/ultra-design',
    },
  ],
  // more config: https://d.umijs.org/config
});