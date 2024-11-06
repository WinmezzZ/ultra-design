<!-- # Tooltip

This is an example component.

#### 类型 -->

```jsx
import { Button, Tooltip } from 'ultra-design';

export default () => (
  <div>
    <Tooltip content="Tooltip" placement="top">
      <Button variant="solid">Button</Button>
    </Tooltip>
    <Tooltip content="Tooltip" placement="right">
      <Button variant="solid">Button</Button>
    </Tooltip>
    <Tooltip content="Tooltip" placement="bottom">
      <Button variant="solid">Button</Button>
    </Tooltip>
    <Tooltip content="Tooltip">
      <Button variant="solid">Button</Button>
    </Tooltip>
  </div>
);
```
