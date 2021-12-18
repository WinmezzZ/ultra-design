---
nav:
  title: Components
  path: /components
group:
  title: 基本组件
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
    <Button size="mini">mini</Button>
    <Button size="small">小</Button>
    <Button size="middle">中等</Button>
    <Button size="large">大</Button>
    <Button size="larger">超大</Button>
  </div>
);
```

## 加载中

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button type="primary" loading>
      加载中...
    </Button>
  </div>
);
```

<API src="./index.ts" />
