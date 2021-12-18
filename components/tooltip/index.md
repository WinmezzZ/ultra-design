---
nav:
  title: Components
  path: /components
group:
  title: Basic
---

## Tooltip

**basic usage:**

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <Tooltip title="哈哈">
      <Button>Hover Me</Button>
    </Tooltip>
  );
};
```

**trigger:**

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <div>
      <Tooltip title="哈哈">
        <Button>Hover Me</Button>
      </Tooltip>

      <Tooltip title="哈哈" trigger="click">
        <Button>Click Me</Button>
      </Tooltip>
    </div>
  );
};
```

**placement:**

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <div className="tooltip-pisition" style={{ width: 400, height: 200 }}>
      <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
        <Tooltip placement="topLeft" title="哈哈">
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement="top" title="哈哈">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement="topRight" title="哈哈">
          <Button>TR</Button>
        </Tooltip>
      </div>
      <div style={{ width: 70, float: 'left' }}>
        <Tooltip placement="leftTop" title="哈哈">
          <Button>LT</Button>
        </Tooltip>
        <Tooltip placement="left" title="哈哈">
          <Button>Left</Button>
        </Tooltip>
        <Tooltip placement="leftBottom" title="哈哈">
          <Button>LB</Button>
        </Tooltip>
      </div>
      <div style={{ width: 70, marginLeft: 304 }}>
        <Tooltip placement="rightTop" title="哈哈">
          <Button>RT</Button>
        </Tooltip>
        <Tooltip placement="right" title="哈哈">
          <Button>Right</Button>
        </Tooltip>
        <Tooltip placement="rightBottom" title="哈哈">
          <Button>RB</Button>
        </Tooltip>
      </div>
      <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
        <Tooltip placement="bottomLeft" title="哈哈">
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" title="哈哈">
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" title="哈哈">
          <Button>BR</Button>
        </Tooltip>
      </div>
    </div>
  );
};
```

**default visible:**

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <div>
      <Tooltip defaultVisible title="哈哈" trigger="click">
        <Button>Click Me</Button>
      </Tooltip>
    </div>
  );
};
```

**custon visible behavior:**

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Tooltip
        visible={visible}
        onVisibleChange={v => setVisible(v)}
        title={
          <div>
            <h4>This is a title</h4>
            <Button size="mini" onClick={() => setVisible(false)}>
              Close
            </Button>
          </div>
        }
        trigger="click"
      >
        <Button>Click Me</Button>
      </Tooltip>
    </div>
  );
};
```

**hide arrow:**

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <Tooltip showArrow={false} title="哈哈">
      <Button>Hover Me</Button>
    </Tooltip>
  );
};
```

**layer offset:**

```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design';

export default () => {
  return (
    <Tooltip offset={40} title="哈哈">
      <Button>Hover Me</Button>
    </Tooltip>
  );
};
```

<API src="index.ts" />;
