---
nav:
  title: 组件
  path: /components
group:
  title: 反馈
  order: 1
---

# Drawer 抽屉

## 基本使用

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible(true)}>
        Click Me
      </Button>
      <Drawer visible={visible} title="标题" onClose={() => setVisible(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
    </div>
  );
};
```

## 抽屉位置

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [visible4, setVisible4] = React.useState(false);
  return (
    <div>
      <Button type="primary" onClick={() => setVisible1(true)}>
        右边
      </Button>
      <Button type="primary" onClick={() => setVisible2(true)}>
        左边
      </Button>
      <Button type="primary" onClick={() => setVisible3(true)}>
        上面
      </Button>
      <Button type="primary" onClick={() => setVisible4(true)}>
        下面
      </Button>
      <Drawer visible={visible1} title="右边" onClose={() => setVisible1(false)}>
        内容
      </Drawer>
      <Drawer visible={visible2} placement="left" title="左边" onClose={() => setVisible2(false)}>
        内容
      </Drawer>
      <Drawer visible={visible3} placement="top" title="上面" onClose={() => setVisible3(false)}>
        内容
      </Drawer>
      <Drawer visible={visible4} placement="bottom" title="下面" onClose={() => setVisible4(false)}>
        内容
      </Drawer>
    </div>
  );
};
```

<API src="drawer.tsx" />
