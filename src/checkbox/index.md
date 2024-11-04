# Checkbox

This is an example component.

```jsx title="基本用法"
import { Checkbox } from 'ultra-design';

export default () => (
  <div>
    <Checkbox defaultChecked>Checkbox</Checkbox>
  </div>
);
```

#### 禁用

```jsx
import { Checkbox } from 'ultra-design';

export default () => (
  <div>
    <Checkbox disabled>Checkbox</Checkbox>
    <Checkbox defaultChecked disabled>
      Checkbox
    </Checkbox>
  </div>
);
```

#### CheckboxGroup 组

```jsx
import { CheckboxGroup, Checkbox } from 'ultra-design';

export default () => (
  <div>
    <CheckboxGroup defaultValue={['1']}>
      <Checkbox value="1">Checkbox1</Checkbox>
      <Checkbox value="2">Checkbox2</Checkbox>
    </CheckboxGroup>
  </div>
);
```

#### orientation 方向

```jsx
import { CheckboxGroup, Checkbox } from 'ultra-design';

export default () => (
  <div>
    <CheckboxGroup orientation="horizontal">
      <Checkbox value="1">Checkbox1</Checkbox>
      <Checkbox value="2">Checkbox2</Checkbox>
    </CheckboxGroup>
  </div>
);
```
