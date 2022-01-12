---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 1
---

# Tooltip

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <div style={{ height: 200, width: 200, overflow: 'auto', position: 'relative' }}>
      <div style={{ height: 170 }}></div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: 240 }}>
        <Tooltip
          defaultVisible
          trigger="click"
          getLayerContainer={trigger => trigger?.parentNode as HTMLElement}
          title="哈哈"
        >
          <Button>Click Me</Button>
        </Tooltip>
        <div style={{ width: 40 }}></div>
      </div>
      <div style={{ height: 500 }}></div>
    </div>
  );
};
```

<API src="index.ts" />
