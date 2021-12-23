---
nav:
  title: Components
  path: /components
group:
  title: Form
---

## Select

```tsx
import React from 'react';
import { Select } from 'ultra-design';

export default () => {
  return (
    <div>
      <Select defaultValue="三国演义" style={{ width: 200 }}>
        <Select.Option>三国演义</Select.Option>
        <Select.Option>西游记</Select.Option>
        <Select.Option>红楼梦</Select.Option>
        <Select.Option>水浒传</Select.Option>
      </Select>
    </div>
  );
};
```
