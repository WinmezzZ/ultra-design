---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 1
---

# Drawer

## Basic Usage

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)}>Click Me</Button>
      <Drawer visible={visible} title="标题" onClose={() => setVisible(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
    </div>
  );
};
```

## Drawer Position

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const [visible1, setVisible1] = React.useState(false);
  const [visible2, setVisible2] = React.useState(false);
  const [visible3, setVisible3] = React.useState(false);
  const [visible4, setVisible4] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible1(true)}>Right</Button>
      <Button onClick={() => setVisible2(true)}>Left</Button>
      <Button onClick={() => setVisible3(true)}>Top</Button>
      <Button onClick={() => setVisible4(true)}>Bottom</Button>
      <Drawer visible={visible1} title="Right" onClose={() => setVisible1(false)}>
        Content
      </Drawer>
      <Drawer visible={visible2} placement="left" title="Left" onClose={() => setVisible2(false)}>
        Content
      </Drawer>
      <Drawer visible={visible3} placement="top" title="Top" onClose={() => setVisible3(false)}>
        Content
      </Drawer>
      <Drawer visible={visible4} placement="bottom" title="Bottom" onClose={() => setVisible4(false)}>
        Content
      </Drawer>
    </div>
  );
};
```

## Hide Some Parts

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

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
      <Drawer hideClose visible={visible1} title="标题" onClose={() => setVisible1(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
      <Drawer cancelButton={null} visible={visible2} title="标题" onClose={() => setVisible2(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
      <Drawer
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
      </Drawer>
      <Drawer confirmButton={null} cancelButton={null} hideClose visible={visible4} onClose={() => setVisible4(false)}>
        <ul>
          <li>this is a text</li>
          <li>this is a text</li>
          <li>this is a text</li>
        </ul>
      </Drawer>
    </div>
  );
};
```

## confirm drawer

return false in `onOk` or `onCancel` will stop closing event, support `Promise`

```tsx
import React from 'react';
import { Button, Drawer } from 'ultra-design';

export default () => {
  const showConfirm = () => {
    Drawer.confirm({
      content: '2333',
      onOk: () => {
        return false;
      },
    });
  };
  return (
    <div>
      <Button onClick={showConfirm}>open conform</Button>
    </div>
  );
};
```

<API src="drawer.tsx" />

## Attention

- When `confirmButton` and `cancelButton` are both set to `undefined`, the entire bottom component will be hidden

- The `top` attribute defaults to 10vh, but if you set the center attribute, the default value of top will be cancelled, but you can still set the value of the `top` attribute manually
