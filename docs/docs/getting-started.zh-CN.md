---
nav:
  title: 文档
  order: 1
title: Getting Start 快速上手
order: 1
---

# Getting Start 快速上手

## 1、安装

```bash
# 使用 npm
npm i ultra-design --save
```

```bash
# 使用 yarn
yarn add ultra-design
```

## 2、使用

```tsx | pure
import ReactDOM from 'react-dom';
import { Button } from 'ultra-design';

const App = () => {
  return (
    <div>
      <Button>按钮</Button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

由于 Ultra Design 使用 [emotion.js](https://emotion.sh/docs/@emotion/react) 作为 CSS in JS 的方案，因此无需单独引入 CSS 文件，引入组件的同时也会自动加载对应的样式文件。

## 3、按需加载

ultra-design 默认支持基于 ES modules 的 tree shaking，对于 js 部分，直接引入 `import { Button } from 'ultra-design'` 就会有按需加载的效果。

## 4、CDN 方式引入

> 不推荐直接使用已构建文件，这样会全量引入所有组件，无法实现按需加载。

```html
<head>
  <script src="https://unpkg.com/browse/ultra-design@latest/dist/index.js"></script>
</head>
<body>
  <script type="text/babel">
    const { Button } = UltraDesign;
    ReactDOM.render(
      <div>
        <Button>Button</Button>
      </div>,
      document.getElementById('root'),
    );
  </script>
</body>
```

#### 国际化

如果同时需要使用国际化的特性，还需引入语言相关的 cdn

```html
<head>
  <script src="https://unpkg.com/browse/ultra-design@latest/dist/index.js"></script>
  <script src="https://unpkg.com/browse/ultra-design@latest/dist/with-locale.js"></script>
</head>
<body>
  <script type="text/babel">
    const { Button, ConfigProvider } = UltraDesign;
    const { zh_CN } = UltraLocale;

    ReactDOM.render(
      <ConfigProvider locale={zh_CN}>
        <Button>Button</Button>
      </ConfigProvider>,
      document.getElementById('root'),
    );
  </script>
</body>
```
