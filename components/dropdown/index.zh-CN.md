---
nav:
  title: Components
  path: /components
group:
  title: Navigation
  order: 1
---

# Dropdown 下拉框

## 基本用法

```tsx
import React from 'react';
import { Button, Dropdown } from 'ultra-design';

export default () => {
  const Li = () => <li style={{ padding: 8 }}>这是一些文本...</li>;
  return (
    <Dropdown
      content={
        <ol style={{ padding: '0 10px', margin: 0 }}>
          {new Array(8).fill(null).map((_, i) => (
            <Li key={i} />
          ))}
        </ol>
      }
    >
      <Button>移入我</Button>
    </Dropdown>
  );
};
```

## Dropdown Item

```tsx
import React from 'react';
import { Button, Dropdown } from 'ultra-design';

export default () => {
  return (
    <Dropdown
      content={
        <>
          <Dropdown.Title>动态语言</Dropdown.Title>
          <Dropdown.Item>JavaScript</Dropdown.Item>
          <Dropdown.Item>PHP</Dropdown.Item>
          <Dropdown.Item>Python</Dropdown.Item>
          <Dropdown.Item>Ruby</Dropdown.Item>
          <Dropdown.Title>静态语言</Dropdown.Title>
          <Dropdown.Item>Go</Dropdown.Item>
          <Dropdown.Item>Rust</Dropdown.Item>
          <Dropdown.Item>Java</Dropdown.Item>
          <Dropdown.Item>.NET Core</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Other</Dropdown.Item>
        </>
      }
    >
      <Button>Item</Button>
    </Dropdown>
  );
};
```

<API hideTitle src="./dropdown.tsx" />
