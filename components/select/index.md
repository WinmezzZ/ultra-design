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
        <Select.Option disabled>红楼梦</Select.Option>
        <Select.Option>水浒传</Select.Option>
      </Select>
    </div>
  );
};
```

## Controlled & Uncontrolled
1. For **Controlled component**, you should provide `value` and `onChange` both into input props.
2. For **Uncontrolled component**, you can get input value by `ref` props.

```tsx
import React from 'react';
import { Select } from 'ultra-design';

export default () => {
  const [value, setValue] = React.useState('2')
  const selectRef = React.useRef(null)

  const handleControlledChange = (value) => {
    setValue(value)
    console.log(value)
  }
  
  const handleUnControlledChange = () => {
    console.log(selectRef.current.value)
  }

  return (
    <div>
      <Select value={value} onChange={handleControlledChange} placeholder="Controlled">
        <Select.Option value="1" label="三国演义" />
        <Select.Option value="2" label="红楼梦" />
        <Select.Option value="3" label="西游记" />
        <Select.Option value="4" label="水浒传" />
      </Select>
      <hr />
      <Select ref={selectRef} defaultValue="三国演义" onChange={handleUnControlledChange} placeholder="Uncontrolled">
        <Select.Option value="1" label="三国演义" />
        <Select.Option value="2" label="红楼梦" />
        <Select.Option value="3" label="西游记" />
        <Select.Option value="4" label="水浒传" />
      </Select>
    </div>
  )
};
```

<API src="./index.ts" />
