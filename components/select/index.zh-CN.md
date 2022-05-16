---
nav:
  title: 组件
  path: /components
group:
  title: Form 表单
  order: 5
---

## Select 选择框

```tsx
import React from 'react';
import { Select } from 'ultra-design';

export default () => {
  return (
    <div>
      <Select style={{ width: 200 }} placeholder="请选择...">
        <Select.Option disabled>JavaScript</Select.Option>
        <Select.Option>Java</Select.Option>
        <Select.Option>PHP</Select.Option>
        <Select.Option disabled>Python</Select.Option>
        <Select.Option>Ruby</Select.Option>
        <Select.Option disabled>Dart </Select.Option>
        <Select.Option disabled>C#</Select.Option>
        <Select.Option>C++</Select.Option>
        <Select.Option>Go</Select.Option>
        <Select.Option disabled>Rust</Select.Option>
      </Select>
    </div>
  );
};
```

## 受控 & 非受控

1. 对于 **受控组件**, 你应该提供 `value` 和 `onChange` input 属性
2. For **非受控组件**, 你可以通过 `ref` 获取 `value`

```jsx
import React from 'react';
import { Select } from 'ultra-design';

export default () => {
  const [value, setValue] = React.useState('2');
  const selectRef = React.useRef(null);

  const handleControlledChange = value => {
    setValue(value);
    console.log(value);
  };

  const handleUnControlledChange = () => {
    console.log(selectRef.current.value);
  };

  return (
    <div>
      <Select value={value} onChange={handleControlledChange} placeholder="Controlled">
        <Select.Option value="1" label="三国演义" />
        <Select.Option value="2" label="红楼梦" />
        <Select.Option value="3" label="西游记" />
        <Select.Option value="4" label="水浒传" />
      </Select>
      <hr />
      <Select ref={selectRef} defaultValue="1" onChange={handleUnControlledChange} placeholder="Uncontrolled">
        <Select.Option value="1" label="三国演义" />
        <Select.Option value="2" label="红楼梦" />
        <Select.Option value="3" label="西游记" />
        <Select.Option value="4" label="水浒传" />
      </Select>
    </div>
  );
};
```

## 搜索过滤

```tsx
import React from 'react';
import { Select } from 'ultra-design';

export default () => {
  return (
    <div>
      <Select filterable style={{ width: 200 }} placeholder="请输入...">
        <Select.Option disabled>JavaScript</Select.Option>
        <Select.Option>Java</Select.Option>
        <Select.Option>PHP</Select.Option>
        <Select.Option disabled>Python</Select.Option>
        <Select.Option>Ruby</Select.Option>
        <Select.Option disabled>Dart </Select.Option>
        <Select.Option disabled>C#</Select.Option>
        <Select.Option>C++</Select.Option>
        <Select.Option>Go</Select.Option>
        <Select.Option disabled>Rust</Select.Option>
      </Select>
    </div>
  );
};
```

## API

#### Select

<API hideTitle src="./select.tsx" />

#### Select.Option

<API hideTitle src="./option.tsx" />
