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
  return (
    <div>
      <Input placeholder="Basic usage" />
    </div>
  );
}
```

## Clearable
```tsx
import React from 'react';
import { Input } from 'ultra-design';

export default () => {
  return (
    <div>
      <Input clearable />
    </div>
  )
};
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

## Controlled & Uncontrolled
1. For **Controlled component**, you should provide `value` and `onChange` both into input props.
2. For **Uncontrolled component**, you can get input value by `ref` props.

```tsx
import React from 'react';
import { Input } from 'ultra-design';

export default () => {
  const [value, setValue] = React.useState('')
  const inputRef = React.useRef<HTMLInputElement>('')

  const handleChange = (e) => {
    setValue(e.target.value)
    console.log(e.target.value)
  }
  
  const handleBlur = () => {
    console.log(inputRef.current.value)
  }

  return (
    <div>
      <Input value={value} onChange={handleChange} placeholder="Controlled" />
      <hr />
      <Input ref={inputRef} onBlur={handleBlur} placeholder="Uncontrolled" />
    </div>
  )
};
```

<API src="./index.ts" />

## FAQ

### Why I get Warning: `A component is changing an uncontrolled input of type text to be controlled` when I using controlled component?

  We didn't initialize val with a value, so val's initial value was undefined. This caused the first rendered input to look like this: `<input value=undefined/>`, so React decided it was an uncontrolled component.
  
  So we can do like this:
  
  ```js
  const [val, setVal] = useState('');
```