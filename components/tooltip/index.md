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

