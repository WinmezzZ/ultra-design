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
  return (
    <Dropdown content={ <div>
        <Button>Click Me</Button><br/>
        <Button>Click Me</Button><br/>
        <Button>Click Me</Button><br/>
        <Button>Click Me</Button><br/>
        <Button>Click Me</Button><br/>
        <Button>Click Me</Button><br/>
      </div>}>
        <Button>Click Me</Button>
    </Dropdown>
  );
};
```

<API src="index.ts" />
