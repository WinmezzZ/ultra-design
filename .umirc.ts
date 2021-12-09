import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  title: 'ultra-ui',
  favicon: 'https://cdn.hyyar.com/favicon.ico',
  logo: 'https://cdn.hyyar.com/logo.jpg',
  outputPath: 'docs-dist',
  mode: 'site',
  resolve: {
    includes: ['docs', 'components'],
  },
  alias: {
    'ultra-ui': path.resolve(__dirname, 'components')
  },
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/WinmezzZ/ultra-ui',
    },
  ],
  // more config: https://d.umijs.org/config
});