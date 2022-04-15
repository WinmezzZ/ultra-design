---
nav:
  title: Components
  path: /components
group:
  title: Navigation
  order: 1
---

# Dropdown

## basic usage

```tsx
import React from 'react';
import { Button, Dropdown } from 'ultra-design';

export default () => {
  const li = <li style={{ padding: 8 }}>This is some text...</li>;
  return (
    <Dropdown content={<ol style={{ padding: '0 10px', margin: 0 }}>{new Array(8).fill(li)}</ol>}>
      <Button>Click Me</Button>
    </Dropdown>
  );
};
```

## DropdownItem

```tsx
import React from 'react';
import { Button, Dropdown } from 'ultra-design';

export default () => {
  return (
    <Dropdown
      content={
        <>
          <Dropdown.DropdownItem>JavaScript</Dropdown.DropdownItem>
          <Dropdown.Divider />
          <Dropdown.DropdownItem>PHP</Dropdown.DropdownItem>
          <Dropdown.DropdownItem>Go</Dropdown.DropdownItem>
          <Dropdown.DropdownItem>Python</Dropdown.DropdownItem>
          <Dropdown.DropdownItem>Ruby</Dropdown.DropdownItem>
          <Dropdown.DropdownItem>Rust</Dropdown.DropdownItem>
        </>
      }
    >
      <Button>DropdownItem</Button>
    </Dropdown>
  );
};
```

<API hideTitle src="./dropdown.tsx" />
