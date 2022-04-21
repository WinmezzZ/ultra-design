---
nav:
  title: Components
  path: /components
group:
  title: Basic
  order: 0
---

# Button

## button type

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button type="primary">Primary</Button>
    <Button>Default</Button>
    <Button type="dashed">Dashed</Button>
    <Button type="text">Text</Button>
    <Button type="pure">Pure</Button>
  </div>
);
```

## button status

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button status="success">Success</Button>
    <Button status="warning">Warning</Button>
    <Button status="error">Error</Button>
  </div>
);
```

## button size

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button size="mini">Mini</Button>
    <Button size="small">Small</Button>
    <Button size="middle">Middle</Button>
    <Button size="large">Lage</Button>
    <Button size="larger">Lager</Button>
  </div>
);
```

## button size

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button size="mini">Mini</Button>
    <Button size="small">Small</Button>
    <Button size="middle">Middle</Button>
    <Button size="large">Lage</Button>
    <Button size="larger">Lager</Button>
  </div>
);
```

## disabled

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => (
  <div>
    <Button type="primary" disabled>
      Disabled
    </Button>
    <Button disabled>Disabled</Button>
    <Button type="dashed" disabled>
      Disabled
    </Button>
    <Button type="text" disabled>
      Disabled
    </Button>
  </div>
);
```

## loading

```tsx
import React from 'react';
import { Button } from 'ultra-design';

export default () => {
  const [loading, setLoading] = React.useState(false);

  const clickHandler = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <div>
      <Button type="primary" loading>
        Loading...
      </Button>
      <Button loading>Loading...</Button>
      <Button type="dashed" loading>
        Loading...
      </Button>
      <Button type="text" loading>
        Loading...
      </Button>
      <Button type="primary" onClick={clickHandler} loading={loading}>
        Click Me
      </Button>
    </div>
  );
};
```

<API src="./index.ts" />
