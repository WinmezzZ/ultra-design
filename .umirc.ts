import { defineConfig } from 'dumi';
import path from 'path';

const config = {
  title: 'ultra-design',
  favicon: 'https://cdn.hyyar.com/favicon.ico',
  logo: 'https://cdn.hyyar.com/logo.jpg',
  outputPath: 'docs-dist',
  mode: 'site',
  theme: {
    '@c-primary': '#13c2c2'
  },
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
  styles: [
    `
      button+button {
        margin-left: 10px;
      }

      .__dumi-default-previewer button {
        margin-bottom: 5px;
      }

      .tooltip-pisition button {
        width: 70px;
        margin-left: 10px;
        margin-top: 10px;
      }

      ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }
      
      li {
        margin: 0;
        padding: 0;
        list-style: none;
      }

      [class*="ultra-layout-"] {
        text-align: center;
      }
    `
  ],
  apiParser: {
    propFilter: {
      skipNodeModules: true,
      // skipPropsWithName: ['title'],
      skipPropsWithoutDoc: true,
    },
  },
  mfsu: {
    
  }
  
  // more config: https://d.umijs.org/config
}

export default defineConfig(config);