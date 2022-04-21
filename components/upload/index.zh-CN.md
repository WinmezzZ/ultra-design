---
nav:
  title: 组件
  path: /components
group:
  title: Data Display
  order: 3
---

# Upload 键盘

## 基本使用

```tsx
import React from 'react';
import { Upload } from 'ultra-design';

export default () => {
  return (
    <div>
      <Upload>C</Upload>
    </div>
  );
};
```

## 修饰符

```tsx
import React from 'react';
import { Upload } from 'ultra-design';

export default () => {
  return (
    <div>
      <Upload command style={{ marginRight: 10 }} />
      <Upload shift style={{ marginRight: 10 }} />
      <Upload option style={{ marginRight: 10 }} />
      <Upload ctrl style={{ marginRight: 10 }} />
    </div>
  );
};
```

## 组合键

```tsx
import React from 'react';
import { Upload } from 'ultra-design';

export default () => {
  return (
    <div>
      <Upload command style={{ marginRight: 10 }}>
        C
      </Upload>
      <Upload shift style={{ marginRight: 10 }}>
        E
      </Upload>
      <Upload ctrl option style={{ marginRight: 10 }}>
        D
      </Upload>
    </div>
  );
};
```

<API src="./index.ts" />
