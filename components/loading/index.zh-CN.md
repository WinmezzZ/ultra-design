---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  order: 4
---

# Loading 加载中

## 基本使用

```tsx
import React from 'react';
import { Loading, Button } from 'ultra-design';

export default () => {
  return <Loading />;
};
```

## loading 文案

```tsx
import React from 'react';
import { Loading } from 'ultra-design';

export default () => {
  return <Loading message="加载中..." />;
};
```

## 填充父元素

填充至整个父亲元素上，覆盖其他子元素。

**提示：此属性会给父元素设置上 postion: relative ，如有影响，请移除**

```tsx
import React from 'react';
import { Loading, Button } from 'ultra-design';

export default () => {
  return (
    <>
      <p>This is some children</p>
      <p>This is some children</p>
      <Loading fill />
    </>
  );
};
```

## 遮罩

显示 Loading 遮罩，需配合 `fill` 属性来

```tsx
import React from 'react';
import { Loading } from 'ultra-design';

export default () => {
  return (
    <>
      <p>This is some children</p>
      <p>This is some children</p>
      <Loading fill mask />
    </>
  );
};
```

## 全屏 Loading

将 `Loading` 显示到 body 元素上

```tsx
import React from 'react';
import { Loading, Button } from 'ultra-design';

export default () => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>全屏 Loading</Button>
      {show && <Loading fullScreen onClick={() => setShow(false)} />}
    </>
  );
};
```

## 自定义 Loading icon 图标

```tsx
import React from 'react';
import { Loading, Button } from 'ultra-design';

export default () => {
  return (
    <>
      <p>This is some children</p>
      <p>This is some children</p>
      <Loading fill mask icon={<span style={{ fontSize: 30 }}>--</span>} />
    </>
  );
};
```

## 使用 JS api 方式调用

`loading` `api` 默认使用 `fullScreen` 全屏模式

```tsx
import React from 'react';
import { loading, Button } from 'ultra-design';

// 全局配置
loading.config({ message: '加载中...' });

export default () => {
  const showLoading = () => {
    loading();
    setTimeout(() => {
      loading.clear();
    }, 2000);
  };
  return <Button onClick={showLoading}>打开 Loading</Button>;
};
```

<API src="loading.tsx" />

#### loading api 方法

- loading.config: `(config: LoadingProps) => void;`

- loading.clear: `() => void;`
