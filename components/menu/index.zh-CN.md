---
nav:
  title: 组件
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
    <Menu style={{ width: 200, borderRight: '1px solid #ccc' }} defaultSelectedKey="submenu1" onClick={handleClick}>
      <Menu.SubMenu key="submenu1">SubMenu1</Menu.SubMenu>
      <Menu.SubMenu key="submenu2">SubMenu2</Menu.SubMenu>
      <Menu.SubMenu key="submenu3">SubMenu3</Menu.SubMenu>
    </Menu>
  );
};
```

## 水平展示

```tsx
import React from 'react';
import { Menu } from 'ultra-design';

export default () => {
  const handleClick = (key: string) => {
    console.log(key);
  };
  return (
    <div style={{ height: 60, boxShadow: '0 8px 24px -2px rgb(0 0 0 / 5%)' }}>
      <Menu style={{ height: '100%' }} horizontal defaultSelectedKey="home" onClick={handleClick}>
        <Menu.SubMenu key="home">Home</Menu.SubMenu>
        <Menu.SubMenu key="detail">Detail</Menu.SubMenu>
        <Menu.SubMenu key="about">About</Menu.SubMenu>
        <Menu.SubMenu key="contact">Contact</Menu.SubMenu>
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
