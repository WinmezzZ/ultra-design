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
import { Button, Tooltip } from 'ultra-design'

export default () => {
  return (
    <Tooltip title="哈哈">
      <Button>Hover Me</Button>
    </Tooltip>
  )
}

```

**trigger:**
```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design'

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
  )
}

```

**placement:**
```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design'

export default () => {
  return (
    <div className="btn-margin-right-bottom" style={{ width: 400, height: 200 }}>
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

      <div style={{ width: 70, float: 'right' }}>
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
      {
      //   <div>
      //   <Tooltip placement="bottom" title="哈哈">
      //     <Button>Bottom</Button>
      //   </Tooltip>
      // </div>
      }
    </div>
  )
}

```

**default visible:**
```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design'

export default () => {
  return (
    <div>
      <Tooltip defaultVisible title="哈哈" trigger="click">
        <Button>Click Me</Button>
      </Tooltip>
    </div>
  )
}

```

**custon visible behavior:**
```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <Tooltip visible={visible} onVisibleChange={v => setVisible(v)} title={
        <div>
          <h4>This is a title</h4>
          <Button size="mini" onClick={() => setVisible(false)}>Close</Button>
        </div>
      } trigger="click">
        <Button>Click Me</Button>
      </Tooltip>
    </div>
  )
}

```

<API src="index.ts" />

