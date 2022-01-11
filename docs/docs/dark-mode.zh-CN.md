---
title: Dark Mode 暗黑模式
order: 2
---

# Dark Mode 暗黑模式

## 全局暗黑模式

默认全部使用明亮颜色，Ultra Design 同时支持暗黑模式

通过导出的 `ConfigProvider` 组件，嵌套在根组件上，提供其 `theme` 属性，传入 `mode: 'dark'` 即可指定为暗黑模式

```jsx | pure
import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider, Button } from 'ultra-design';

// 根组件
const App = () => {
  return <div>...</div>;
};

ReactDOM.render(
  <ConfigProvider theme={{ mode: 'dark' }}>
    <App />
  </ConfigProvider>,
  document.getElementById('root'),
);
```

## 局部暗黑模式

有时候只是想修改部分组合为暗黑模式，你可以将 `ConfigProvider` 嵌套在任意的组件外，而不是 root 组件。

```jsx | pure
import { ConfigProvider, Button } from 'ultra-design';

const Container = () => {
  return (
    <ConfigProvider theme={{ mode: 'dark' }}>
      <div>
        <Button>我是黑色</Button>
      </div>
    </ConfigProvider>
  );
};
```

## 修改默认颜色

可能你会认为默认的黑色不是很符合你的胃口，你可以尝试 [修改默认颜色](./customize-theme.md) 以定制你需要的样式
