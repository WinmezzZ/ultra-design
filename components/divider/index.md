---
nav:
  title: Components
  path: /components
group:
  title: Other
  order: 10
---

# Divider

## basic usage

```tsx
import React from 'react';
import { Divider } from 'ultra-design';

export default () => {
  return (
    <>
      <span>Some text</span>
      <Divider />
      <span>Some text</span>
    </>
  );
};
```

## with children

```tsx
import React from 'react';
import { Divider } from 'ultra-design';

export default () => {
  return (
    <>
      <Divider>Text</Divider>
    </>
  );
};
```

## vertical

```tsx
import React from 'react';
import { Divider } from 'ultra-design';

export default () => {
  return (
    <>
      <span>Some text</span>
      <Divider vertical />
      <span>Some text</span>
    </>
  );
};
```

<API src="index.ts" />
