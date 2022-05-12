---
nav:
  title: 组件
  path: /components
group:
  title: Form 表单
  order: 5
---

# ColorPicker 取色器

## 基本用法

```tsx
import React from 'react';
import { ColorPicker } from 'ultra-design';

export default () => {
  return (
    <div>
      <ColorPicker />
    </div>
  );
};
```

## 显示透明度模块

```tsx
import React from 'react';
import { ColorPicker } from 'ultra-design';

export default () => {
  return (
    <div>
      <ColorPicker showOpacity />
    </div>
  );
};
```

## 颜色格式

使用 `rgb` 颜色 代替 `hex`

```jsx
import React from 'react';
import { ColorPicker, Button } from 'ultra-design';

export default () => {
  const [rgb, setRgb] = React.useState('rgb(41, 104, 34)');
  return (
    <div>
      <ColorPicker colorFormat="RGB" value={rgb} onChange={value => setRgb(value)}>
        <Button style={{ backgroundColor: rgb, color: '#fff' }}>{rgb}</Button>
      </ColorPicker>
    </div>
  );
};
```

<API src="./index.ts" />
