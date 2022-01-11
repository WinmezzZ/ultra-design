---
title: Getting Start 快速上手
order: 1
---

# Getting Start 快速上手

## 1、安装 Ultra Design

```bash
# 使用 npm
npm i ultra-design --save
```

```bash
# 使用 yarn
yarn add ultra-design
```

## 2、使用组件

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
<script src="https://unpkg.com/browse/ultra-design@latest/dist/index.js"></script>
```
