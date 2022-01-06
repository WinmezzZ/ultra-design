---
nav:
  title: Components
  path: /components
group:
  title: Navigation
---

# Menu

## Basic Usage

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'ultra-design';

export default () => {
  return (
    <div>
      <Menu>
        <Menu.SubMenu key="123">123</Menu.SubMenu>
      </Menu>
    </div>
  );
};
```

<API src="./index.ts" />
