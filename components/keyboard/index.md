---
nav:
  title: Components
  path: /components
group:
  title: Data Display
  order: 3
---

# Keyboard

## Basic Usage

```tsx
import React from 'react';
import { Keyboard } from 'ultra-design';

export default () => {
  return (
    <div>
      <Keyboard>C</Keyboard>
    </div>
  );
};
```

## Modifiers

```tsx
import React from 'react';
import { Keyboard } from 'ultra-design';

export default () => {
  return (
    <div>
      <Keyboard command style={{ marginRight: 10 }} />
      <Keyboard shift style={{ marginRight: 10 }} />
      <Keyboard option style={{ marginRight: 10 }} />
      <Keyboard ctrl style={{ marginRight: 10 }} />
    </div>
  );
};
```

## Combination

```tsx
import React from 'react';
import { Keyboard } from 'ultra-design';

export default () => {
  return (
    <div>
      <Keyboard command style={{ marginRight: 10 }}>
        C
      </Keyboard>
      <Keyboard shift style={{ marginRight: 10 }}>
        E
      </Keyboard>
      <Keyboard ctrl option style={{ marginRight: 10 }}>
        D
      </Keyboard>
    </div>
  );
};
```

<API src="./index.ts" />
