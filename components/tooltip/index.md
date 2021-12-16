---
nav:
  title: Components
  path: /components
group:
  title: Basic
---

## Tooltip

<!-- **basic usage:**
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
        Click Me
      </Tooltip>
    </div>
  )
}

``` -->

**custon visible behavior:**
```tsx
import React from 'react';
import { Button, Tooltip } from 'ultra-design'

export default () => {
  const [visible, setVisible] = React.useState(false)
  return (
    <div>
      <Tooltip visible={visible} title={
        <div style={{ width: 200}}>
          <h2>23333</h2>
          <Button onClick={() => setVisible(false)}>Close</Button>
        </div>
      } trigger="click">
        <Button onClick={() => setVisible(!visible)}>Click Me</Button>
      </Tooltip>
    </div>
  )
}

```

<API src="index.ts" />

