---
nav:
  title: Components
  path: /components
group:
  title: 其他
  order: 10
---

# Divider 分割线

## 基本用法

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

## 分割线文字内容

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

## 垂直分割线

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
