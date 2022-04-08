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
    });
  };
  return <Button onClick={showToast}>Not autoclose</Button>;
};
```

## Toast message type

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

## clear toast with javascript api

```tsx
import React from 'react';
import { Toast, Button } from 'ultra-design';

export default () => {
  const showToast = () => {
    Toast({
      content: 'I will not be closed!',
      duration: 0,
      hideClose: true,
    });
  };
  const clearToast = () => {
    Toast.clear();
  };
  return (
    <>
      <Button onClick={showToast}>Alert a Toast</Button>
      <Button onClick={clearToast}>Click me to clear Toast</Button>
    </>
  );
};
```

## API

`Toast(content: string, duration?: number, onClose?: () => void)`

| param    | description                                | type         | default |
| -------- | ------------------------------------------ | ------------ | ------- |
| content  | Toast content                              | `string`     | `--`    |
| duration | leave duration                             | `number`     | `2000`  |
| onClose  | will be triggered when the toast is closed | `() => void` | `--`    |

`Toast(options: ToastOptions)`

<API src="toast-internal.tsx" hideTitle />

#### Toast method

- Toast.info: `(content: React.ReactNode, duration?: number, onClose?: OnClose) => void;`

- Toast.success: `(content: React.ReactNode, duration?: number, onClose?: OnClose) => void;`

- Toast.warning: `(content: React.ReactNode, duration?: number, onClose?: OnClose) => void;`

- Toast.error: `(content: React.ReactNode, duration?: number, onClose?: OnClose) => void;`

- Toast.clear: `() => void;`
