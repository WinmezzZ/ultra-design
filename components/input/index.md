---
nav:
  title: Components
  path: /components
group:
  title: Form
---

# Input

## Basic Usage

```tsx
import React, { useEffect, useRef, useState } from 'react';
import { Input } from 'ultra-design';

export default () => {
  const [value, setValue] = useState()

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    console.log(value)
  }, [value])

  return (
          <div>
            <Input value={value} onChange={handleChange} defaultValue="3"></Input>
          </div>
  );
}
```

## Clearable
```tsx
import React from 'react';
import { Input } from 'ultra-design';

export default () => (
  <div>
    <Input clearable />
  </div>
);
```

## Disabled
```tsx
import React from 'react';
import { Input } from 'ultra-design';

export default () => (
  <div>
    <Input disabled />
  </div>
);
```

<API src="./index.ts" />