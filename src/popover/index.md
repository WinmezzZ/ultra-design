<!-- # Tooltip

This is an example component.

#### 类型 -->

```jsx
import { Button, Popover } from 'ultra-design';

export default () => (
  <div>
    <Popover
      content={
        <div>
          <h4>This is title</h4>
          <p>This is content</p>
        </div>
      }
    >
      <Button variant="solid">Button</Button>
    </Popover>
  </div>
);
```
