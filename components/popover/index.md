---
nav:
  title: Components
  path: /components
group:
  title: Basic
---

# Popover

## basic usage

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover content="哈哈">
      <Button>Click Me</Button>
    </Popover>
  );
};
```

## trigger

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div>
      <Popover content="哈哈">
        <Button>Click Me</Button>
      </Popover>
      <Popover content="哈哈" trigger="hover">
        <Button>Hover Me</Button>
      </Popover>
    </div>
  );
};
```

## placement

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div className="tooltip-pisition" style={{ width: 400, height: 200 }}>
      <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
        <Popover placement="topLeft" content="哈哈">
          <Button>TL</Button>
        </Popover>
        <Popover placement="top" content="哈哈">
          <Button>Top</Button>
        </Popover>
        <Popover placement="topRight" content="哈哈">
          <Button>TR</Button>
        </Popover>
      </div>
      <div style={{ width: 70, float: 'left' }}>
        <Popover placement="leftTop" content="哈哈">
          <Button>LT</Button>
        </Popover>
        <Popover placement="left" content="哈哈">
          <Button>Left</Button>
        </Popover>
        <Popover placement="leftBottom" content="哈哈">
          <Button>LB</Button>
        </Popover>
      </div>
      <div style={{ width: 70, marginLeft: 304 }}>
        <Popover placement="rightTop" content="哈哈">
          <Button>RT</Button>
        </Popover>
        <Popover placement="right" content="哈哈">
          <Button>Right</Button>
        </Popover>
        <Popover placement="rightBottom" content="哈哈">
          <Button>RB</Button>
        </Popover>
      </div>
      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover placement="bottomLeft" content="哈哈">
          <Button>BL</Button>
        </Popover>
        <Popover placement="bottom" content="哈哈">
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" content="哈哈">
          <Button>BR</Button>
        </Popover>
      </div>
    </div>
  );
};
```

## default visible

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div>
      <Popover defaultVisible content="哈哈">
        <Button>Click Me</Button>
      </Popover>
    </div>
  );
};
```

## custon visible behavior

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Popover
        visible={visible}
        onVisibleChange={v => setVisible(v)}
        content={
          <div>
            <h4>This is a content</h4>
            <Button size="mini" onClick={() => setVisible(false)}>
              Close
            </Button>
          </div>
        }
      >
        <Button>Close</Button>
      </Popover>
    </div>
  );
};
```

## hide arrow

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover showArrow={false} content="哈哈">
      <Button>Click Me</Button>
    </Popover>
  );
};
```

## layer offset

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover offset={40} content="哈哈">
      <Button>Click Me</Button>
    </Popover>
  );
};
```

## Set scroll container

By default, the `Popover` popover position will only scroll with the `body`, but if the `Popover` trigger is inside the inner scroll element, the popover will not scroll with the inner scroll element. You can fix this by setting `getLayerContainer` to be the render parent of the popover

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div style={{ height: 200, width: 200, overflow: 'auto', position: 'relative' }}>
      <div style={{ height: 170 }}></div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: 240 }}>
        <Popover defaultVisible getLayerContainer={trigger => trigger.parentNode as HTMLElement} content="哈哈">
          <Button>Click Me</Button>
        </Popover>
        <div style={{ width: 40 }}></div>
      </div>
      <div style={{ height: 500 }}></div>
    </div>
  );
};
```

<API src="index.ts" />
