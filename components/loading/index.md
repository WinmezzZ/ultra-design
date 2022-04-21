---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 4
---

# Loading

## basic usage

```tsx
import React from 'react';
import { Loading } from 'ultra-design';

export default () => {
  return (
    <>
      <p>This is some children</p>
      <p>This is some children</p>
      <Loading />
    </>
  );
};
```

## loading message

```tsx
import React from 'react';
import { Loading } from 'ultra-design';

export default () => {
  return <Loading message="Loading..." />;
};
```

## fill parent

Fills the entire parent element and cover on other child elements.

**tips: relative attribute will be set to the parent element. If it affect other style, please remove it**

```tsx
import React from 'react';
import { Loading } from 'ultra-design';

export default () => {
  return (
    <>
      <p>This is some children</p>
      <p>This is some children</p>
      <Loading fill />
    </>
  );
};
```

## mask

show loading mask, it needs to be used with `fill` property

```tsx
import React from 'react';
import { Loading } from 'ultra-design';

export default () => {
  return (
    <>
      <p>This is some children</p>
      <p>This is some children</p>
      <Loading fill mask />
    </>
  );
};
```

## fullScreen

show `Loading` to `body`

```tsx
import React from 'react';
import { Loading, Button } from 'ultra-design';

export default () => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <Button onClick={() => setShow(true)}>FullScreen</Button>
      {show && <Loading fullScreen onClick={() => setShow(false)} />}
    </>
  );
};
```

## costom loading icon

```tsx
import React from 'react';
import { Loading, Button } from 'ultra-design';

export default () => {
  return (
    <>
      <p>This is some children</p>
      <p>This is some children</p>
      <Loading fill mask icon={<span style={{ fontSize: 30 }}>--</span>} />
    </>
  );
};
```

## using javascript api

loading api use `fullScreen` mode as default

```tsx
import React from 'react';
import { loading, Button } from 'ultra-design';

// global config
loading.config({ message: 'Loading...' });

export default () => {
  const showLoading = () => {
    loading();
    setTimeout(() => {
      loading.clear();
    }, 2000);
  };
  return <Button onClick={showLoading}>Open Loading</Button>;
};
```

<API src="loading.tsx" />

#### loading api method

- loading.config: `(config: LoadingProps) => void;`

- loading.clear: `() => void;`
