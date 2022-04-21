---
nav:
  title: Components
  path: /components
group:
  title: Form
  order: 5
---

# Checkbox

## basic usage

```tsx
import React from 'react';
import { Checkbox } from 'ultra-design';

export default () => {
  return (
    <div>
      <Checkbox>北京</Checkbox>
    </div>
  );
};
```

## checkbox group

```tsx
import React from 'react';
import { Checkbox } from 'ultra-design';

export default () => {
  return (
    <Checkbox.Group value={['a']}>
      <Checkbox value="a">北京</Checkbox>
      <Checkbox value="b">上海</Checkbox>
      <Checkbox value="c">杭州</Checkbox>
    </Checkbox.Group>
  );
};
```

## disabled

```tsx
import React from 'react';
import { Checkbox } from 'ultra-design';

export default () => {
  return (
    <div>
      <Checkbox disabled>北京</Checkbox>
      <Checkbox disabled checked>
        上海
      </Checkbox>
    </div>
  );
};
```

## API

#### Checkbox

<API hideTitle src="./checkbox.tsx" />

#### Checkbox.Group

<API hideTitle src="./checkbox-group.tsx" />
