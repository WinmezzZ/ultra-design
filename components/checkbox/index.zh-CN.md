---
nav:
  title: 组件
  path: /components
group:
  title: Form 表单
  order: 5
---

# Checkbox 复选框

## 基本使用

```tsx
import React from 'react';
import { Checkbox } from 'ultra-design';

export default () => {
  return (
    <div>
      <Checkbox>Beijing</Checkbox>
    </div>
  );
};
```

## checkbox 组

```tsx
import React from 'react';
import { Checkbox } from 'ultra-design';

export default () => {
  return (
    <Checkbox.Group value={['a']}>
      <Checkbox value="a">Beijing</Checkbox>
      <Checkbox value="b">Shanghai</Checkbox>
      <Checkbox value="c">Hangzhou</Checkbox>
    </Checkbox.Group>
  );
};
```

## 禁用

```tsx
import React from 'react';
import { Checkbox } from 'ultra-design';

export default () => {
  return (
    <div>
      <Checkbox disabled>Beijing</Checkbox>
      <Checkbox disabled checked>
        Shanghai
      </Checkbox>
    </div>
  );
};
```

## API

#### Checkbox

<API hideTitle src="./checkbox.tsx" />

#### Checkbox.Group

<API hideTitle src="./checkbox-group.tsx" />
