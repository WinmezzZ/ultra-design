---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 1
---

# Drawer

## Basic Usage

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

## Drawer Position

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
        Right
      </Button>
      <Button type="primary" onClick={() => setVisible2(true)}>
        Left
      </Button>
      <Button type="primary" onClick={() => setVisible3(true)}>
        Top
      </Button>
      <Button type="primary" onClick={() => setVisible4(true)}>
        Bottom
      </Button>
      <Drawer visible={visible1} title="Right" onClose={() => setVisible1(false)}>
        Content
      </Drawer>
      <Drawer visible={visible2} placement="left" title="Left" onClose={() => setVisible2(false)}>
        Content
      </Drawer>
      <Drawer visible={visible3} placement="top" title="Top" onClose={() => setVisible3(false)}>
        Content
      </Drawer>
      <Drawer visible={visible4} placement="bottom" title="Bottom" onClose={() => setVisible4(false)}>
        Content
      </Drawer>
    </div>
  );
};
```

<API src="drawer.tsx" />
