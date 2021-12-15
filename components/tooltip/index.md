---
nav:
  title: Components
  path: /components
group:
  title: Basic
---

## Tooltip

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design'

export default () => {
  return (
    <div>
      <Tooltip title="哈哈">
        <Button>Hover Me</Button>
      </Tooltip>

      <Tooltip title="哈哈" trigger="click">
        <Button>Click Me</Button>
      </Tooltip>
    </div>
  )
}

```

<API src="index.ts" />

