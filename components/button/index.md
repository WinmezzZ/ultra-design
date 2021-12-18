---
nav:
  title: Components
  path: /components
group:
  title: Basic
---

# Button

## button type

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
  </div>
);
```

## button size

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button size="mini">Mini</Button>
    <Button size="small">Small</Button>
    <Button size="middle">Middle</Button>
    <Button size="large">Lage</Button>
    <Button size="larger">Lager</Button>
  </div>
);
```

<API src="./index.ts" />
