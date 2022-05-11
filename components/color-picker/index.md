---
nav:
  title: Components
  path: /components
group:
  title: Form
  order: 5
---

# ColorPicker

## Basic Usage

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

## show opacity

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

## color format

use `rgb` color instead of `hex`

```jsx
import React from 'react';
import { ColorPicker, Button, ConfigProvider } from 'ultra-design';

export default () => {
  const [rgb, setRgb] = React.useState('rgb(41, 104, 34)');
  return (
    <div>
      <ColorPicker colorFormat="RGB" value={rgb} onChange={value => setRgb(value)}>
        <ConfigProvider theme={{ style: { primaryColor: rgb } }}>
          <Button type="primary">{rgb}</Button>
        </ConfigProvider>
      </ColorPicker>
    </div>
  );
};
```

<API src="./index.ts" />
