# Button

This is an example component.

#### 类型

```jsx
import { Button, ConfigProvider } from 'ultra-design';

export default () => (
  <div className="flex items-center gap-4">
    <Button variant="solid">Button</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="light">Light</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="link">Link</Button>
  </div>
);
```

#### 禁用

```jsx
import { Button, ConfigProvider } from 'ultra-design';

export default () => (
  <div className="flex items-center gap-4">
    <Button disabled variant="solid">
      Button
    </Button>
    <Button disabled variant="outline">
      Outline
    </Button>
    <Button disabled variant="light">
      Light
    </Button>
    <Button disabled variant="ghost">
      Ghost
    </Button>
    <Button disabled variant="link">
      Link
    </Button>
  </div>
);
```

#### 颜色

```jsx
import { Button } from 'ultra-design';

export default () => (
  <div className="flex items-center gap-4">
    <Button color="primary" variant="solid">
      Primary
    </Button>
    <Button color="danger" variant="solid">
      Danger
    </Button>
    <Button color="success" variant="solid">
      Success
    </Button>
    <Button color="warning" variant="solid">
      Warning
    </Button>
    <Button color="info" variant="solid">
      Info
    </Button>
  </div>
);
```

#### 大小

```jsx
import { Button } from 'ultra-design';

export default () => (
  <div className="flex items-center gap-4">
    <Button size="xs" variant="solid">
      Xs
    </Button>
    <Button size="sm" variant="solid">
      Small
    </Button>
    <Button size="md" variant="solid">
      Medium
    </Button>
    <Button size="lg" variant="solid">
      Large
    </Button>
    <Button size="xl" variant="solid">
      Xl
    </Button>
  </div>
);
```

<API id="Button"></API>
