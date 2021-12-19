---
nav:
  title: Components
  path: /components
group:
  title: Basic
---

# Modal

## basic usage

```tsx
import React from 'react';
import { Button, Modal } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Click Me</Button>
      <Modal visible={visible} onClose={() => setVisible(false)}>
        <h1>2333</h1>
      </Modal>
    </div>
  );
};
```

<API src="index.ts" />
