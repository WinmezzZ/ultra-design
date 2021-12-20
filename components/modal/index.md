---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 1
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
      <Modal visible={visible} title="标题" onClose={() => setVisible(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Modal>
    </div>
  );
};
```

## center

```tsx
import React from 'react';
import { Button, Modal } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Centered Modal</Button>
      <Modal
        conformButton={undefined}
        cancelButton={undefined}
        center
        visible={visible}
        title="标题"
        onClose={() => setVisible(false)}
      >
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Modal>
    </div>
  );
};
```

<API src="index.ts" />
