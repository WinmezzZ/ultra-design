---
nav:
  title: Components
  path: /components
group:
  title: 导航
---

# Menu 菜单

## 基本使用

```tsx
import React from 'react';
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
