---
nav:
  title: Components
  path: /components
group:
  title: Feedback
  order: 1
---

# Popover

## basic usage

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover
      content={
        <ul>
          <li>正文1</li>
          <li>正文2</li>
        </ul>
      }
    >
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
      <Popover
        content={
          <ul>
            <li>正文1</li>
            <li>正文2</li>
          </ul>
        }
      >
        <Button>Click Me</Button>
      </Popover>
      <Popover
        content={
          <ul>
            <li>正文1</li>
            <li>正文2</li>
          </ul>
        }
        trigger="hover"
      >
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

const content = (
  <ul>
    <li>正文1</li>
    <li>正文2</li>
  </ul>
);

export default () => {
  return (
    <div className="tooltip-pisition" style={{ width: 400, height: 200 }}>
      <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
        <Popover placement="topLeft" content={content}>
          <Button>TL</Button>
        </Popover>
        <Popover placement="top" content={content}>
          <Button>Top</Button>
        </Popover>
        <Popover placement="topRight" content={content}>
          <Button>TR</Button>
        </Popover>
      </div>
      <div style={{ width: 70, float: 'left' }}>
        <Popover
          placement="leftTop"
          content={
            <ul>
              <li>正文1</li>
              <li>正文2</li>
            </ul>
          }
        >
          <Button>LT</Button>
        </Popover>
        <Popover
          placement="left"
          content={
            <ul>
              <li>正文1</li>
              <li>正文2</li>
            </ul>
          }
        >
          <Button>Left</Button>
        </Popover>
        <Popover placement="leftBottom" content={content}>
          <Button>LB</Button>
        </Popover>
      </div>
      <div style={{ width: 70, marginLeft: 304 }}>
        <Popover placement="rightTop" content={content}>
          <Button>RT</Button>
        </Popover>
        <Popover placement="right" content={content}>
          <Button>Right</Button>
        </Popover>
        <Popover placement="rightBottom" content={content}>
          <Button>RB</Button>
        </Popover>
      </div>
      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
        <Popover placement="bottomLeft" content={content}>
          <Button>BL</Button>
        </Popover>
        <Popover placement="bottom" content={content}>
          <Button>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" content={content}>
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
      <Popover
        defaultVisible
        content={
          <ul>
            <li>正文1</li>
            <li>正文2</li>
          </ul>
        }
      >
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
    <Popover
      showArrow={false}
      content={
        <ul>
          <li>正文1</li>
          <li>正文2</li>
        </ul>
      }
    >
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
    <Popover
      offset={40}
      content={
        <ul>
          <li>正文1</li>
          <li>正文2</li>
        </ul>
      }
    >
      <Button>Click Me</Button>
    </Popover>
  );
};
```

<!-- ## Set scroll container

By default, the `Popover` popover position will only scroll with the `body`, but if the `Popover` trigger is inside the inner scroll element, the popover will not scroll with the inner scroll element. You can fix this by setting `getLayerContainer` to be the render parent of the popover

```tsx
import React from 'react';
import { Button, Popover } from 'ultra-design';

export default () => {
  return (
    <div style={{ height: 200, width: 200, overflow: 'auto', position: 'relative' }}>
      <div style={{ height: 170 }}></div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: 240 }}>
        <Popover
          defaultVisible
          getLayerContainer={trigger => trigger?.parentNode as HTMLElement}
          content={
            <ul>
              <li>正文1</li>
              <li>正文2</li>
            </ul>
          }
        >
          <Button>Click Me</Button>
        </Popover>
        <div style={{ width: 40 }}></div>
      </div>
      <div style={{ height: 500 }}></div>
    </div>
  );
};
``` -->

<!-- ## nest with tooltip

Popover component can nested use with tooltip component together. Of course, it can also nest itself.

```tsx
import React from 'react';
import { Button, Tooltip, Popover } from 'ultra-design';

export default () => {
  return (
    <Popover
      content={
        <ul>
          <li>正文1</li>
          <li>正文2</li>
        </ul>
      }
      placement="top"
    >
      <Tooltip title="哈哈">
        <Button>Hover Me and Click Me</Button>
      </Tooltip>
    </Popover>
  );
};
``` -->

<API src="index.ts" />
