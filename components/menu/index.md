---
nav:
  title: Components
  path: /components
group:
  title: Navigation
---

# Menu

## Basic Usage

```jsx
import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'ultra-design';

export default () => {
  const handleClick = key => {
    console.log(key);
  };
  return (
    <div>
      <Menu onClick={handleClick}>
        <Menu.SubMenu key="123">123</Menu.SubMenu>
        <Menu.SubMenu key="456">456</Menu.SubMenu>
        <Menu.SubMenu disabled key="789">
          789
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
```

## API

#### Menu

<API hideTitle src="./menu.tsx" />

#### Menu.SubMenu

<API hideTitle src="./sub-menu.tsx" />
