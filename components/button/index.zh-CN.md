---
nav:
  title: Components
  path: /components
group:
  title: 基本组件
  order: 0
---

# Button 按钮

## 按钮类型

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button type="primary">基本</Button>
    <Button>默认</Button>
    <Button type="dashed">虚线</Button>
    <Button type="text">文本</Button>
  </div>
);
```

## 按钮尺寸

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button size="mini">超小</Button>
    <Button size="small">小</Button>
    <Button size="middle">中等</Button>
    <Button size="large">大</Button>
    <Button size="larger">超大</Button>
  </div>
);
```

## 禁用

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button type="primary" disabled>
      不可用
    </Button>
    <Button disabled>不可用</Button>
    <Button type="dashed" disabled>
      不可用
    </Button>
    <Button type="text" disabled>
      不可用
    </Button>
  </div>
);
```

## 加载中

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => {
  const [loading, setLoading] = React.useState(false);

  const clickHandler = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      <Button type="primary" loading>
        加载中...
      </Button>
      <Button loading>加载中...</Button>
      <Button type="dashed" loading>
        加载中...
      </Button>
      <Button type="text" loading>
        加载中...
      </Button>
      <Button type="primary" onClick={clickHandler} loading={loading}>
        点击我
      </Button>
    </div>
  );
};
```

<API src="./index.ts" />
