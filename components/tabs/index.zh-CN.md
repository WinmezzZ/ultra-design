---
nav:
  title: Components
  path: /components
group:
  title: Data Display
  order: 3
---

# Tabs 选项卡

## 基本用法

```tsx
import React from 'react';
import { Tabs, Button } from 'ultra-design';

export default () => {
  return (
    <div>
      <Tabs defaultValue="a">
        <Tabs.Item label="声明式" value="a">
          <p>
            React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据变动时 React
            能高效更新并渲染合适的组件。
          </p>
          <p>以声明式编写 UI，可以让你的代码更加可靠，且方便调试。</p>
        </Tabs.Item>
        <Tabs.Item label="组件化" value="b">
          <p>构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。</p>
          <p>由于组件逻辑使用 JavaScript 编写而非模板，因此你可以轻松地在应用中传递数据，并保持状态与 DOM 分离。</p>
        </Tabs.Item>
        <Tabs.Item label="跨平台" value="c">
          <p>无论你现在使用什么技术栈，在无需重写现有代码的前提下，通过引入 React 来开发新功能。</p>
          <p>React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。</p>
        </Tabs.Item>
      </Tabs>
    </div>
  );
};
```

## API

#### Select

<API hideTitle src="./tabs.tsx" />

#### Select.Option

<API hideTitle src="./tabs-item.tsx" />
