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
  const handleClick = (key: string) => {
    console.log(key);
  };
  return (
    <Menu style={{ width: 200, borderRight: '1px solid #ccc' }} defaultSelectedKey="123" onClick={handleClick}>
      <Menu.SubMenu key="123">123</Menu.SubMenu>
      <Menu.SubMenu key="456">456</Menu.SubMenu>
      <Menu.SubMenu disabled key="789">
        789
      </Menu.SubMenu>
    </Menu>
  );
};
```

## API

#### Menu

<API hideTitle src="./menu.tsx" />

#### Menu.SubMenu

<API hideTitle src="./sub-menu.tsx" />
