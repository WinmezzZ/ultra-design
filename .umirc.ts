import { defineConfig, IConfig } from 'dumi';
import path from 'path';

const config: IConfig = {
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
  extraBabelPresets: [
    ['@umijs/deps/compiled/babel/preset-react', { runtime: 'automatic', importSource: '@emotion/react' }]
  ],
  extraBabelPlugins: ['@emotion/babel-plugin'],
  ssr: {},
  styles: [
    `
      button+button {
        margin-left: 10px;
      }

      .tooltip-pisition button {
        width: 70px;
        margin-left: 10px;
        margin-top: 10px;
      }
    `
  ]
  // more config: https://d.umijs.org/config
}

export default defineConfig(config);