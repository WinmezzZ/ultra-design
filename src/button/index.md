# Button

This is an example component.

```jsx
import { Button, ConfigProvider } from 'ultra-design';

export default () => (
  <ConfigProvider theme="light">
    <Button>Button</Button>
    <div className="dark">
      <Button>Dark Button</Button>
    </div>
  </ConfigProvider>
);
```
