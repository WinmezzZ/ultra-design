---
nav:
  title: 组件
  path: /components
group:
  title: 导航
  order: 1
---

# Dropdown 下拉框

## basic usage

```tsx
import React from 'react';
import { Button, Dropdown } from 'ultra-design';

export default () => {
  return (
    <Dropdown
      content={
        <div>
          <Button>Click Me</Button>
          <br />
          <Button>Click Me</Button>
          <br />
          <Button>Click Me</Button>
          <br />
          <Button>Click Me</Button>
          <br />
          <Button>Click Me</Button>
          <br />
          <Button>Click Me</Button>
          <br />
        </div>
      }
    >
      <Button>Click Me</Button>
    </Dropdown>
  );
};
```

<API src="index.ts" />
