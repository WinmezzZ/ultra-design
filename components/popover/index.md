---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 1
---

# Popover

## nest with tooltip

Popover component can nested use with tooltip component together. Of course, it can also nest itself.

```tsx
import React from 'react';
import { Button, Tooltip, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover
      defaultVisible
      content={
        <ul>
          <li>正文1</li>
          <li>正文2</li>
        </ul>
      }
      placement="top"
    >
      <Tooltip title="哈哈" defaultVisible>
        <Button>Hover Me and Click Me</Button>
      </Tooltip>
    </Popover>
  );
};
```

<API src="index.ts" />
