---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 1
---

# Modal

## Basic Usage

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

## Modal Position

```tsx
import React from 'react';
import { Button, Modal } from 'ultra-design';

export default () => {
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible1(true)}>Top 0</Button>
      <Button onClick={() => setVisible2(true)}>Centered</Button>
      <Modal top={0} visible={visible1} title="标题" onClose={() => setVisible1(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Modal>
      <Modal center visible={visible2} title="标题" onClose={() => setVisible2(false)}>
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

## Hide Some Parts

```tsx
import React from 'react';
import { Button, Modal } from 'ultra-design';

export default () => {
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [visible4, setVisible4] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible1(true)}>Hide Close Icon</Button>
      <Button onClick={() => setVisible2(true)}>Hide Cancel Button</Button>
      <Button onClick={() => setVisible3(true)}>Hide Footer</Button>
      <Button onClick={() => setVisible4(true)}>Body Only</Button>
      <Modal hideClose visible={visible1} title="标题" onClose={() => setVisible1(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Modal>
      <Modal cancelButton={null} visible={visible2} title="标题" onClose={() => setVisible2(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Modal>
      <Modal
        confirmButton={null}
        cancelButton={null}
        visible={visible3}
        title="标题"
        onClose={() => setVisible3(false)}
      >
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Modal>
      <Modal confirmButton={null} cancelButton={null} hideClose visible={visible4} onClose={() => setVisible4(false)}>
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

## Attention

- When `confirmButton` and `cancelButton` are both set to `undefined`, the entire bottom component will be hidden

- The `top` attribute defaults to 10vh, but if you set the center attribute, the default value of top will be cancelled, but you can still set the value of the `top` attribute manually

