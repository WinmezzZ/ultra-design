---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 4
---

# Toast

## basic usage

```tsx
import React from 'react';
import { Toast, Button } from 'ultra-design';

export default () => {
  const showToast = () => {
    Toast('Hello!');
  };
  return <Button onClick={showToast}>Show Toast</Button>;
};
```

## durtation

set durtation to 0 to always show

```tsx
import React from 'react';
import { Toast, Button } from 'ultra-design';

export default () => {
  const showToast = () => {
    Toast({
      content: 'Hello!',
      duration: 0,
      hideClose: true,
    });
  };
  return <Button onClick={showToast}>Not autoclose</Button>;
};
```

## toast message type

```jsx
import React from 'react';
import { Toast, Button } from 'ultra-design';

const info = () => {
  Toast.info('This is a info toast');
};
const success = () => {
  Toast.success('This is a success toast');
};
const error = () => {
  Toast.error('This is an error toast');
};
const warning = () => {
  Toast.warning('This is a warning toast');
};

export default () => {
  const showToast = type => {};
  return (
    <>
      <Button type="primary" onClick={info}>
        Info
      </Button>
      <Button status="success" onClick={success}>
        Success
      </Button>
      <Button status="error" onClick={error}>
        Error
      </Button>
      <Button status="warning" onClick={warning}>
        Warning
      </Button>
    </>
  );
};
```

<API src="index.ts" />
